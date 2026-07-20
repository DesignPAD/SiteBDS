// Coordonnées officielles BDS Equipements — source unique pour tout le site.
export const site = {
  name: 'BDS Équipements',
  tagline: 'Équipez votre maison sans vous ruiner',
  description:
    'Quincaillerie à Dakar : matériaux de construction, sanitaire, luminaires, portes, revêtements et équipement maison.',
  address: 'Diamalaye 2 Lot 73, Dakar, Sénégal',
  phones: ['+221 77 365 69 67', '+221 77 680 84 03', '+221 33 820 65 88'],
  whatsapp: '221773656967',
  whatsappSecondary: '221776808403',
  url: 'https://www.bdsequipements.com',
} as const;

export function waLink(message: string, number: string = site.whatsapp): string {
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
