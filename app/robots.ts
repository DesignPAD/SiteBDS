import type { MetadataRoute } from 'next';
import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      // Le panier est propre à chaque visiteur : pas d'intérêt à l'indexer.
      disallow: ['/panier'],
    },
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
