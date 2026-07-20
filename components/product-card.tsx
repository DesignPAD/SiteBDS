import Image from 'next/image';
import Link from 'next/link';
import { getCategory } from '@/data/categories';
import type { Product } from '@/data/products';
import { AddToCartButton } from './add-to-cart-button';
import { Price } from './price';
import { StockBadge } from './stock-badge';

export function ProductCard({ product }: { product: Product }) {
  const category = getCategory(product.categoryId);
  const image = product.images[0];

  return (
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-white transition hover:shadow-lg">
      {product.salePrice != null && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-danger px-2.5 py-1 text-xs font-bold text-white">
          En promo
        </span>
      )}
      <Link
        href={`/produit/${product.slug}`}
        className="block aspect-square overflow-hidden bg-cream"
        aria-label={product.name}
      >
        <Image
          src={image.src}
          alt={image.alt}
          width={480}
          height={480}
          className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-4">
        <div className="flex items-center justify-between gap-2">
          {category && (
            <span className="rounded bg-cream px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-muted">
              {category.name}
            </span>
          )}
          <StockBadge status={product.stockStatus} />
        </div>
        <h3 className="font-bold leading-snug text-ink">
          <Link href={`/produit/${product.slug}`} className="hover:text-brand">
            {product.name}
          </Link>
        </h3>
        <p className="text-xs text-muted">{product.shortDescription}</p>
        <div className="mt-auto flex items-center justify-between gap-2 pt-2">
          <Price product={product} />
          {product.priceOnRequest ? (
            <Link
              href={`/produit/${product.slug}`}
              className="rounded-full border-2 border-navy px-4 py-1.5 text-sm font-bold text-navy hover:bg-navy hover:text-white"
            >
              Demander
            </Link>
          ) : (
            <AddToCartButton
              productId={product.id}
              disabled={product.stockStatus === 'out_of_stock'}
            />
          )}
        </div>
      </div>
    </article>
  );
}
