'use client';

// Actions de la fiche produit : quantité + panier + WhatsApp contextualisé.
// Parcours simple : choisir la quantité → ajouter au panier OU commander
// directement sur WhatsApp avec un message pré-rempli (nom, réf, quantité).

import { useState } from 'react';
import type { Product } from '@/data/products';
import { useCartActions } from '@/lib/cart-context';
import { waLink } from '@/lib/site';
import Link from 'next/link';

export function ProductActions({ product }: { product: Product }) {
  const { add } = useCartActions();
  const [qty, setQty] = useState(1);
  const [added, setAdded] = useState(false);

  const whatsappMessage = `Bonjour BDS Équipements, je suis intéressé par : ${product.name} (réf. ${product.sku}) — quantité : ${qty}. Est-ce disponible ?`;

  if (product.stockStatus === 'out_of_stock') {
    return (
      <p className="rounded-lg bg-danger/10 px-4 py-3 text-sm font-semibold text-danger">
        Produit momentanément indisponible — contactez-nous pour connaître le délai de réapprovisionnement.
      </p>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center gap-3">
        <span id="qty-label" className="text-sm font-semibold text-muted">
          Quantité
        </span>
        <div className="flex items-center rounded-full border border-line" role="group" aria-labelledby="qty-label">
          <button
            type="button"
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="h-10 w-10 rounded-l-full text-lg font-bold text-navy transition-colors duration-150 hover:bg-cream"
            aria-label="Diminuer la quantité"
          >
            −
          </button>
          <span className="w-10 text-center font-bold" aria-live="polite">{qty}</span>
          <button
            type="button"
            onClick={() => setQty((q) => Math.min(99, q + 1))}
            className="h-10 w-10 rounded-r-full text-lg font-bold text-navy transition-colors duration-150 hover:bg-cream"
            aria-label="Augmenter la quantité"
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col gap-2 sm:flex-row">
        {!product.priceOnRequest && (
          <button
            type="button"
            onClick={() => {
              add(product.id, qty);
              setAdded(true);
              setTimeout(() => setAdded(false), 1800);
            }}
            className="flex-1 rounded-full bg-brand px-6 py-3 text-center font-bold text-navy shadow-btn transition-[background-color,box-shadow,transform] duration-200 ease-smooth hover:bg-brand-dark hover:shadow-btn-hover active:scale-[0.98]"
          >
            {added ? '✓ Ajouté au panier' : 'Ajouter au panier'}
          </button>
        )}
        <a
          href={waLink(whatsappMessage)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 rounded-full bg-success px-6 py-3 text-center font-bold text-white shadow-btn transition-[opacity,box-shadow,transform] duration-200 ease-smooth hover:opacity-90 active:scale-[0.98]"
        >
          Commander sur WhatsApp
        </a>
      </div>

      {added && (
        <p className="text-sm font-medium text-success">
          Article ajouté —{' '}
          <Link href="/panier" className="underline">
            voir le panier
          </Link>{' '}
          ou continuez vos achats.
        </p>
      )}
    </div>
  );
}
