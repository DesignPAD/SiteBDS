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
    <article className="group relative flex flex-col overflow-hidden rounded-card border border-line bg-white shadow-card transition-[transform,box-shadow,border-color] duration-300 ease-smooth hover:-translate-y-1 hover:border-line/60 hover:shadow-card-hover">
      {product.salePrice != null && (
        <span className="absolute right-3 top-3 z-10 rounded-full bg-danger px-2.5 py-1 text-[11px] font-semibold tracking-wide text-white shadow-btn">
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
          sizes="(min-width: 1024px) 22vw, (min-width: 640px) 45vw, 90vw"
          className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
        />
      </Link>
      <div className="flex flex-1 flex-col gap-2 p-5">
        <div className="flex items-center justify-between gap-2">
          {category && (
            <span className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
              {category.name}
            </span>
          )}
          <StockBadge status={product.stockStatus} />
        </div>
        <h3 className="text-[0.9375rem] font-bold leading-snug text-ink">
          <Link
            href={`/produit/${product.slug}`}
            className="transition-colors duration-200 hover:text-brand-ink"
          >
            {product.name}
          </Link>
        </h3>
        <p className="text-[0.8125rem] leading-relaxed text-muted">{product.shortDescription}</p>
        <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
          <Price product={product} />
          {product.priceOnRequest ? (
            <Link
              href={`/produit/${product.slug}`}
              className="rounded-full border border-navy px-4 py-2 text-sm font-bold text-navy transition-colors duration-200 ease-smooth hover:bg-navy hover:text-white active:scale-[0.98]"
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
