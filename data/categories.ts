export type Category = {
  id: string;
  slug: string;
  name: string;
  description: string;
  image?: string;
};

export const categories: Category[] = [
  {
    id: 'luminaires',
    slug: 'luminaires',
    name: 'Luminaires',
    description: 'Appliques LED, lampadaires, lampes de table, veilleuses et lustres.',
    image: '/products/lampadaire_6_boules.jpeg',
  },
  {
    id: 'revetements',
    slug: 'carrelage-revetements',
    name: 'Carrelage & Revêtements',
    description: 'Carreaux, lambris PVC, papier peint et revêtements adhésifs.',
    image: '/products/lambris_marbre.jpeg',
  },
  {
    id: 'sanitaire',
    slug: 'sanitaire-robinetterie',
    name: 'Sanitaire & Robinetterie',
    description: 'Lavabos vasques, robinets évier, cuisine et lavabo.',
    image: '/products/lavabo_vasque_blanche.jpeg',
  },
  {
    id: 'portes',
    slug: 'portes',
    name: 'Portes',
    description: 'Portes intérieures modernes, finitions bois, gris et blanc.',
    image: '/products/porte_bois_fonce.jpeg',
  },
  {
    id: 'deco',
    slug: 'deco-maison',
    name: 'Déco & Maison',
    description: 'Miroirs, vases, descentes de lit et chambres à coucher complètes.',
    image: '/products/chambre_a_coucher.jpeg',
  },
];

export function getCategory(id: string): Category | undefined {
  return categories.find((c) => c.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((c) => c.slug === slug);
}
