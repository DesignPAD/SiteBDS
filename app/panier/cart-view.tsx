'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useMemo, useState, useTransition } from 'react';
import { buildWhatsappOrder } from '@/app/actions/order';
import { useCart } from '@/lib/cart-context';
import { formatFCFA } from '@/lib/format';

/** Vue allégée du catalogue : uniquement ce que le panier affiche.
 *  Les descriptions et caractéristiques restent côté serveur. */
export type CartCatalogItem = {
  id: string;
  slug: string;
  sku: string;
  name: string;
  price: number;
  salePrice: number | null;
  priceOnRequest: boolean;
  image: { src: string; alt: string };
};

export function CartView({ catalog }: { catalog: CartCatalogItem[] }) {
  const { items, setQty, remove, clear } = useCart();
  const [error, setError] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();

  const byId = useMemo(() => new Map(catalog.map((p) => [p.id, p])), [catalog]);

  const lines = useMemo(
    () =>
      items
        .map((item) => {
          const product = byId.get(item.id);
          return product ? { item, product } : null;
        })
        .filter((l) => l !== null),
    [items, byId],
  );

  const total = useMemo(
    () =>
      lines.reduce((sum, { item, product }) => {
        if (product.priceOnRequest) return sum;
        return sum + (product.salePrice ?? product.price) * item.qty;
      }, 0),
    [lines],
  );

  const hasOnRequest = lines.some(({ product }) => product.priceOnRequest);

  const order = () => {
    setError(null);
    // On ouvre l'onglet DANS le geste utilisateur (sinon bloqué par le
    // navigateur car window.open arriverait après l'await). On le redirige
    // une fois que le serveur a validé et recalculé la commande.
    const win = window.open('', '_blank', 'noopener,noreferrer');
    startTransition(async () => {
      const result = await buildWhatsappOrder(items.map(({ id, qty }) => ({ id, qty })));
      if (result.ok) {
        if (win) win.location.href = result.whatsappUrl;
        else window.location.href = result.whatsappUrl;
      } else {
        win?.close();
        setError(result.error);
      }
    });
  };

  return (
    <div className="mx-auto max-w-4xl px-5 py-10 sm:px-6 sm:py-14">
      <h1 className="text-3xl font-extrabold text-navy">Votre panier</h1>

      {lines.length === 0 ? (
        <div className="mt-8 rounded-card border border-line bg-white p-10 text-center shadow-card sm:p-14">
          <p className="text-lg font-bold text-navy">Votre panier est vide</p>
          <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
            Parcourez la boutique et ajoutez vos produits — la commande se
            termine simplement sur WhatsApp.
          </p>
          <Link
            href="/boutique"
            className="mt-6 inline-block rounded-full bg-brand px-7 py-3 font-bold text-navy shadow-btn transition-[background-color,box-shadow,transform] duration-200 ease-smooth hover:bg-brand-dark hover:shadow-btn-hover active:scale-[0.98]"
          >
            Voir la boutique
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-line rounded-card border border-line bg-white shadow-card">
            {lines.map(({ item, product }) => (
              <li key={item.id} className="flex items-center gap-4 p-4">
                <Link
                  href={`/produit/${product.slug}`}
                  prefetch={false}
                  className="block h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-cream"
                >
                  <Image
                    src={product.image.src}
                    alt={product.image.alt}
                    width={80}
                    height={80}
                    sizes="80px"
                    className="h-full w-full object-cover"
                  />
                </Link>
                <div className="min-w-0 flex-1">
                  <Link
                    href={`/produit/${product.slug}`}
                    prefetch={false}
                    className="font-bold text-ink transition-colors duration-200 hover:text-brand-ink"
                  >
                    {product.name}
                  </Link>
                  <p className="text-xs text-muted">Réf. {product.sku}</p>
                  <p className="tnum mt-1 text-sm font-semibold text-navy">
                    {product.priceOnRequest
                      ? 'Prix sur demande'
                      : formatFCFA(product.salePrice ?? product.price)}
                  </p>
                </div>
                <div className="flex items-center rounded-full border border-line">
                  <button
                    type="button"
                    onClick={() => setQty(item.id, item.qty - 1)}
                    className="h-9 w-9 rounded-l-full font-bold text-navy transition-colors duration-150 hover:bg-cream"
                    aria-label={`Diminuer la quantité de ${product.name}`}
                  >
                    −
                  </button>
                  <span className="tnum w-8 text-center text-sm font-bold">{item.qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(item.id, item.qty + 1)}
                    className="h-9 w-9 rounded-r-full font-bold text-navy transition-colors duration-150 hover:bg-cream"
                    aria-label={`Augmenter la quantité de ${product.name}`}
                  >
                    +
                  </button>
                </div>
                <p className="tnum hidden w-28 text-right text-sm font-bold text-navy sm:block">
                  {product.priceOnRequest
                    ? '—'
                    : formatFCFA((product.salePrice ?? product.price) * item.qty)}
                </p>
                <button
                  type="button"
                  onClick={() => remove(item.id)}
                  className="p-2 text-muted transition-colors duration-150 hover:text-danger"
                  aria-label={`Retirer ${product.name} du panier`}
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-card border border-line bg-white p-6 shadow-card">
            <div className="flex items-center justify-between text-lg">
              <p className="font-bold text-ink">Total estimé</p>
              <p className="tnum font-extrabold text-navy">{formatFCFA(total)}</p>
            </div>
            {hasOnRequest && (
              <p className="mt-1 text-xs text-muted">
                * Hors articles « prix sur demande » — nous vous confirmerons leur prix.
              </p>
            )}
            <p className="mt-2 text-xs leading-relaxed text-muted">
              Le total est vérifié et confirmé par notre équipe à la commande,
              avec la disponibilité et les frais de livraison éventuels.
            </p>

            {error && (
              <p className="mt-3 rounded-lg bg-danger/10 px-4 py-2 text-sm font-semibold text-danger">
                {error}
              </p>
            )}

            <div className="mt-5 flex flex-col gap-2 sm:flex-row">
              <button
                type="button"
                onClick={order}
                disabled={pending}
                className="flex-1 rounded-full bg-success px-6 py-3.5 font-bold text-white shadow-btn transition-[opacity,box-shadow,transform] duration-200 ease-smooth hover:opacity-90 active:scale-[0.98] disabled:opacity-50"
              >
                {pending ? 'Préparation…' : 'Commander sur WhatsApp'}
              </button>
              <Link
                href="/boutique"
                className="rounded-full border border-navy px-6 py-3 text-center font-bold text-navy transition-colors duration-200 ease-smooth hover:bg-navy hover:text-white active:scale-[0.98]"
              >
                Continuer mes achats
              </Link>
            </div>
            <button
              type="button"
              onClick={clear}
              className="mt-3 text-xs font-semibold text-muted underline transition-colors duration-150 hover:text-danger"
            >
              Vider le panier
            </button>

            {/* Étapes — rassurer sur le parcours */}
            <ol className="mt-6 grid gap-2 border-t border-line pt-4 text-xs text-muted sm:grid-cols-3">
              <li><strong className="text-ink">1. Envoyez</strong> — votre panier part sur WhatsApp, déjà rédigé.</li>
              <li><strong className="text-ink">2. On confirme</strong> — disponibilité, total exact et délai.</li>
              <li><strong className="text-ink">3. Livraison</strong> — à Dakar et environs, ou retrait au magasin.</li>
            </ol>
          </div>
        </>
      )}
    </div>
  );
}
