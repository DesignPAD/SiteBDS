export default function Loading() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-16" role="status" aria-label="Chargement">
      <div className="h-8 w-48 animate-pulse rounded bg-line" />
      <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="overflow-hidden rounded-card border border-line bg-white">
            <div className="aspect-square animate-pulse bg-line" />
            <div className="space-y-2 p-4">
              <div className="h-3 w-1/2 animate-pulse rounded bg-line" />
              <div className="h-4 w-3/4 animate-pulse rounded bg-line" />
              <div className="h-6 w-1/3 animate-pulse rounded bg-line" />
            </div>
          </div>
        ))}
      </div>
      <span className="sr-only">Chargement du contenu…</span>
    </div>
  );
}
