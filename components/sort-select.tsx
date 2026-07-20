'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export function SortSelect() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const current = searchParams.get('tri') ?? 'pertinence';

  return (
    <label className="flex items-center gap-2 text-sm text-muted">
      Trier :
      <select
        value={current}
        onChange={(e) => {
          const params = new URLSearchParams(searchParams.toString());
          if (e.target.value === 'pertinence') params.delete('tri');
          else params.set('tri', e.target.value);
          router.push(`${pathname}?${params.toString()}`);
        }}
        className="rounded-full border border-line bg-white px-3 py-1.5 font-semibold text-ink"
      >
        <option value="pertinence">Pertinence</option>
        <option value="prix-asc">Prix croissant</option>
        <option value="prix-desc">Prix décroissant</option>
      </select>
    </label>
  );
}
