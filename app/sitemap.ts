import type { MetadataRoute } from 'next';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { site } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const url = (path: string) => `${site.url}${path}`;

  const staticPages: MetadataRoute.Sitemap = [
    { url: url('/'), lastModified: now, changeFrequency: 'weekly', priority: 1 },
    { url: url('/boutique'), lastModified: now, changeFrequency: 'weekly', priority: 0.9 },
    { url: url('/services'), lastModified: now, changeFrequency: 'monthly', priority: 0.6 },
    { url: url('/a-propos'), lastModified: now, changeFrequency: 'yearly', priority: 0.4 },
    { url: url('/contact'), lastModified: now, changeFrequency: 'yearly', priority: 0.5 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: url(`/boutique?categorie=${c.id}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.7,
  }));

  const productPages: MetadataRoute.Sitemap = products.map((p) => ({
    url: url(`/produit/${p.slug}`),
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [...staticPages, ...categoryPages, ...productPages];
}
