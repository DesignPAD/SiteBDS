// Formulaire de recherche — fonctionne sans JavaScript (GET /boutique?q=…).
// Factorise les variantes bureau et mobile de l'en-tête.

export function SearchForm({
  id,
  placeholder = 'Que recherchez-vous ?',
  className = '',
  size = 'md',
}: {
  id: string;
  placeholder?: string;
  className?: string;
  size?: 'sm' | 'md';
}) {
  const input =
    size === 'md'
      ? 'rounded-l-full border border-line bg-cream px-5 py-2.5 text-sm focus:border-brand'
      : 'rounded-l-full border border-line bg-cream px-4 py-2 text-sm focus:border-brand';
  const button = size === 'md' ? 'rounded-r-full bg-navy px-5 text-white hover:bg-navy-light' : 'rounded-r-full bg-navy px-4 text-white hover:bg-navy-light';
  const iconSize = size === 'md' ? 18 : 16;

  return (
    <form action="/boutique" className={className} role="search">
      <label htmlFor={id} className="sr-only">
        Rechercher un produit
      </label>
      <div className="flex w-full">
        <input id={id} name="q" type="search" placeholder={placeholder} className={`w-full ${input}`} />
        <button type="submit" className={button} aria-label="Rechercher">
          <svg width={iconSize} height={iconSize} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.5" y2="16.5" />
          </svg>
        </button>
      </div>
    </form>
  );
}
