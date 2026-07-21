'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart-context';

export function AddToCartButton({
  productId,
  qty = 1,
  className = '',
  disabled = false,
}: {
  productId: string;
  qty?: number;
  className?: string;
  disabled?: boolean;
}) {
  const { add } = useCart();
  const [added, setAdded] = useState(false);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => {
        add(productId, qty);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
      className={`rounded-full bg-brand px-4 py-2 text-sm font-bold text-navy shadow-btn transition-[background-color,box-shadow,transform] duration-200 ease-smooth hover:bg-brand-dark hover:shadow-btn-hover active:scale-[0.98] disabled:opacity-40 disabled:shadow-none ${className}`}
    >
      {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
    </button>
  );
}
