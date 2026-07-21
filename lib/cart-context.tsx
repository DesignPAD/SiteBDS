'use client';

// Panier côté client : ne stocke QUE des identifiants et quantités.
// Les prix et totaux affichés sont dérivés du catalogue, et la commande
// finale est recalculée côté serveur (app/actions/order.ts).
//
// Perf : le contexte est scindé en deux.
//  - CartActionsContext : référence STABLE (jamais recréée) → les composants
//    qui ne font qu'écrire (boutons « Ajouter au panier ») ne se re-rendent
//    jamais quand le panier change.
//  - CartStateContext : change à chaque mutation → seuls les composants qui
//    lisent le panier (badge de l'en-tête, page panier) se re-rendent.

import { createContext, useContext, useEffect, useMemo, useReducer } from 'react';

export type CartItem = { id: string; qty: number };

type CartState = { items: CartItem[]; loaded: boolean };

type CartAction =
  | { type: 'load'; items: CartItem[] }
  | { type: 'add'; id: string; qty: number }
  | { type: 'setQty'; id: string; qty: number }
  | { type: 'remove'; id: string }
  | { type: 'clear' };

const STORAGE_KEY = 'bds_cart_v1';
const MAX_QTY = 99;

function clampQty(qty: number): number {
  return Math.max(1, Math.min(MAX_QTY, Math.floor(qty)));
}

function reducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'load':
      return { items: action.items, loaded: true };
    case 'add': {
      const existing = state.items.find((i) => i.id === action.id);
      const items = existing
        ? state.items.map((i) =>
            i.id === action.id ? { ...i, qty: clampQty(i.qty + action.qty) } : i,
          )
        : [...state.items, { id: action.id, qty: clampQty(action.qty) }];
      return { ...state, items };
    }
    case 'setQty':
      return {
        ...state,
        items: state.items.map((i) =>
          i.id === action.id ? { ...i, qty: clampQty(action.qty) } : i,
        ),
      };
    case 'remove':
      return { ...state, items: state.items.filter((i) => i.id !== action.id) };
    case 'clear':
      return { ...state, items: [] };
  }
}

type CartActions = {
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

type CartStateValue = { items: CartItem[]; count: number };

const CartActionsContext = createContext<CartActions | null>(null);
const CartStateContext = createContext<CartStateValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { items: [], loaded: false });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      const parsed: unknown = raw ? JSON.parse(raw) : [];
      const items: CartItem[] = Array.isArray(parsed)
        ? parsed
            .filter(
              (i): i is CartItem =>
                typeof i === 'object' && i !== null &&
                typeof (i as CartItem).id === 'string' &&
                typeof (i as CartItem).qty === 'number',
            )
            .map((i) => ({ id: i.id, qty: clampQty(i.qty) }))
        : [];
      dispatch({ type: 'load', items });
    } catch {
      dispatch({ type: 'load', items: [] });
    }
  }, []);

  useEffect(() => {
    if (!state.loaded) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // stockage indisponible : le panier reste en mémoire
    }
  }, [state.items, state.loaded]);

  // `dispatch` est stable : ces actions ne sont créées qu'une seule fois.
  const actions = useMemo<CartActions>(
    () => ({
      add: (id, qty = 1) => dispatch({ type: 'add', id, qty }),
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [],
  );

  const value = useMemo<CartStateValue>(
    () => ({
      items: state.items,
      count: state.items.reduce((sum, i) => sum + i.qty, 0),
    }),
    [state.items],
  );

  return (
    <CartActionsContext.Provider value={actions}>
      <CartStateContext.Provider value={value}>{children}</CartStateContext.Provider>
    </CartActionsContext.Provider>
  );
}

/** Écriture seule — ne provoque aucun re-rendu quand le panier change. */
export function useCartActions(): CartActions {
  const ctx = useContext(CartActionsContext);
  if (!ctx) throw new Error('useCartActions doit être utilisé dans <CartProvider>');
  return ctx;
}

/** Lecture du panier — re-rend le composant à chaque mutation. */
export function useCart(): CartStateValue & CartActions {
  const state = useContext(CartStateContext);
  const actions = useContext(CartActionsContext);
  if (!state || !actions) throw new Error('useCart doit être utilisé dans <CartProvider>');
  return { ...state, ...actions };
}
