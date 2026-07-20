'use client';

// Panier côté client : ne stocke QUE des identifiants et quantités.
// Les prix et totaux affichés sont dérivés du catalogue, et la commande
// finale est recalculée côté serveur (app/actions/order.ts).

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

type CartContextValue = {
  items: CartItem[];
  count: number;
  add: (id: string, qty?: number) => void;
  setQty: (id: string, qty: number) => void;
  remove: (id: string) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

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

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      count: state.items.reduce((sum, i) => sum + i.qty, 0),
      add: (id, qty = 1) => dispatch({ type: 'add', id, qty }),
      setQty: (id, qty) => dispatch({ type: 'setQty', id, qty }),
      remove: (id) => dispatch({ type: 'remove', id }),
      clear: () => dispatch({ type: 'clear' }),
    }),
    [state.items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart doit être utilisé dans <CartProvider>');
  return ctx;
}
