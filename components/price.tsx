import type { Product } from '@/data/products';
import { formatFCFA } from '@/lib/format';

export function Price({ product, size = 'md' }: { product: Product; size?: 'md' | 'lg' }) {
  const cls = size === 'lg' ? 'text-2xl' : 'text-base';
  if (product.priceOnRequest) {
    return <p className={`${cls} font-bold text-royal`}>Prix sur demande</p>;
  }
  if (product.salePrice != null) {
    return (
      <p className={`${cls} font-bold text-brand-ink`}>
        <s className="mr-2 font-medium text-muted">{formatFCFA(product.price)}</s>
        {formatFCFA(product.salePrice)}
      </p>
    );
  }
  return <p className={`${cls} font-bold text-navy`}>{formatFCFA(product.price)}</p>;
}
