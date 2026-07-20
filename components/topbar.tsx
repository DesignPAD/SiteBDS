import { site, waLink } from '@/lib/site';

export function Topbar() {
  return (
    <div className="bg-navy text-white text-xs sm:text-sm">
      <div className="mx-auto max-w-7xl px-4 py-2 flex flex-wrap items-center justify-between gap-x-4 gap-y-1">
        <p className="font-medium">
          🚚 Livraison à Dakar et environs — commande assistée par WhatsApp
        </p>
        <p className="flex items-center gap-4">
          <a href={`tel:${site.phones[0].replace(/\s/g, '')}`} className="hover:text-sun">
            📞 {site.phones[0]}
          </a>
          <a
            href={waLink('Bonjour BDS Équipements, j’ai besoin d’un renseignement.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-sun font-semibold"
          >
            WhatsApp
          </a>
        </p>
      </div>
    </div>
  );
}
