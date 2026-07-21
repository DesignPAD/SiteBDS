import { site } from '@/lib/site';

/** Insère un bloc JSON-LD (données structurées SEO). */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Données de configuration, pas d'entrée utilisateur : injection sûre.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function LocalBusinessJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'HardwareStore',
        name: site.name,
        description: site.description,
        image: `${site.url}/brand/logo-bds.jpg`,
        url: site.url,
        telephone: site.phones[0].replace(/\s/g, ''),
        priceRange: 'XOF',
        address: {
          '@type': 'PostalAddress',
          streetAddress: 'Diamalaye 2 Lot 73',
          addressLocality: 'Dakar',
          addressCountry: 'SN',
        },
        areaServed: 'Dakar, Sénégal',
      }}
    />
  );
}
