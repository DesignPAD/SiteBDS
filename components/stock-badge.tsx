import type { StockStatus } from '@/data/products';

const config: Record<StockStatus, { label: string; className: string }> = {
  in_stock: { label: 'En stock', className: 'bg-success/10 text-success' },
  low_stock: { label: 'Stock limité', className: 'bg-sun/20 text-brand-dark' },
  out_of_stock: { label: 'Rupture', className: 'bg-danger/10 text-danger' },
};

export function StockBadge({ status }: { status: StockStatus }) {
  const { label, className } = config[status];
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-1 text-[11px] font-semibold tracking-wide ${className}`}
    >
      {label}
    </span>
  );
}
