import Link from 'next/link';
import { Hero } from '@/components/hero';
import { ProductCard } from '@/components/product-card';
import { CategoryCard } from '@/components/category-card';
import { DeliveryIcon } from '@/components/delivery-icon';
import { AdviceIcon, CheckShieldIcon, StoreIcon } from '@/components/icons';
import { categories } from '@/data/categories';
import { products } from '@/data/products';
import { site, waLink } from '@/lib/site';

const featured = [
  'lampadaire-6-boules',
  'porte-bois-fonce',
  'lavabo-vasque-couleur',
  'lambris-marbre',
  'applique-double-faisceau',
  'carreau-60x60-beige',
  'robinet-evier',
  'chambre-a-coucher',
]
  .map((id) => products.find((p) => p.id === id))
  .filter((p) => p !== undefined);

const benefits = [
  {
    title: 'Produits en stock à Dakar',
    text: 'Ce que vous voyez sur le site est disponible dans notre magasin de Diamalaye.',
    Icon: StoreIcon,
  },
  {
    title: 'Livraison à Dakar et environs',
    text: 'Nous livrons vos matériaux et équipements — délais confirmés à la commande.',
    Icon: DeliveryIcon,
  },
  {
    title: 'Conseil avant achat',
    text: 'Notre équipe vous aide à choisir le bon produit pour votre projet.',
    Icon: AdviceIcon,
  },
  {
    title: 'Commande assistée WhatsApp',
    text: 'Composez votre panier, envoyez-le sur WhatsApp, on s’occupe du reste.',
    Icon: CheckShieldIcon,
  },
];

export default function Home() {
  return (
    <div>
      <Hero />

      {/* Catégories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
            Nos <span className="text-brand-ink">catégories</span>
          </h2>
          <Link href="/boutique" className="text-sm font-bold text-royal hover:underline">
            Tout voir →
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* Produits populaires */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              Produits <span className="text-brand-ink">populaires</span>
            </h2>
            <Link href="/boutique" className="text-sm font-bold text-royal hover:underline">
              Toute la boutique →
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map(({ title, text, Icon }) => (
            <li key={title} className="rounded-card border border-line bg-white p-5">
              <Icon className="h-8 w-8 text-brand" />
              <p className="mt-3 font-bold text-navy">{title}</p>
              <p className="mt-1 text-sm text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Bloc devis / WhatsApp */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="rounded-card bg-navy px-6 py-10 text-center text-white sm:px-12">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Un projet ? Un chantier ? <span className="text-sun">Parlons-en.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Envoyez-nous votre liste de matériaux : nous préparons votre devis et
            organisons la livraison à Dakar.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={waLink('Bonjour BDS Équipements, voici ma liste de matériaux pour un devis :')}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-success px-7 py-3.5 font-bold text-white hover:opacity-90"
            >
              Devis sur WhatsApp
            </a>
            <a
              href={`tel:${site.phones[0].replace(/\s/g, '')}`}
              className="rounded-full border-2 border-white/40 px-7 py-3.5 font-bold hover:border-sun hover:text-sun"
            >
              Appeler le {site.phones[0]}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
