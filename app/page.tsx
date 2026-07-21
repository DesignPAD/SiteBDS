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
      <section className="cv-auto mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
            Nos <span className="text-brand-ink">catégories</span>
          </h2>
          <Link
            href="/boutique"
            className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-royal transition-colors duration-200 hover:text-navy"
          >
            Tout voir
            <span
              aria-hidden
              className="transition-transform duration-200 ease-smooth group-hover:translate-x-0.5"
            >
              →
            </span>
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <CategoryCard key={c.id} category={c} />
          ))}
        </div>
      </section>

      {/* Produits populaires */}
      <section className="cv-auto border-y border-line bg-white py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-end justify-between gap-4 sm:mb-10">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              Produits <span className="text-brand-ink">populaires</span>
            </h2>
            <Link
              href="/boutique"
              className="group inline-flex shrink-0 items-center gap-1.5 text-sm font-bold text-royal transition-colors duration-200 hover:text-navy"
            >
              Toute la boutique
              <span
                aria-hidden
                className="transition-transform duration-200 ease-smooth group-hover:translate-x-0.5"
              >
                →
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* Bénéfices */}
      <section className="cv-auto mx-auto max-w-7xl px-5 py-16 sm:px-6 sm:py-20 lg:px-8">
        <ul className="grid gap-5 sm:grid-cols-2 sm:gap-6 lg:grid-cols-4">
          {benefits.map(({ title, text, Icon }) => (
            <li
              key={title}
              className="rounded-card border border-line bg-white p-6 shadow-card transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover"
            >
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand-ink">
                <Icon className="h-6 w-6" />
              </span>
              <p className="mt-4 font-bold text-navy">{title}</p>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{text}</p>
            </li>
          ))}
        </ul>
      </section>

      {/* Bloc devis / WhatsApp */}
      <section className="cv-auto mx-auto max-w-7xl px-5 pb-16 sm:px-6 sm:pb-20 lg:px-8">
        <div className="rounded-card bg-navy px-6 py-12 text-center text-white sm:px-12 sm:py-16">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Un projet ? Un chantier ? <span className="text-sun">Parlons-en.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl leading-relaxed text-white/75">
            Envoyez-nous votre liste de matériaux : nous préparons votre devis et
            organisons la livraison à Dakar.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href={waLink('Bonjour BDS Équipements, voici ma liste de matériaux pour un devis :')}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full bg-success px-7 py-3.5 font-bold text-white shadow-btn transition-[opacity,transform] duration-200 ease-smooth hover:opacity-90 active:scale-[0.98]"
            >
              Devis sur WhatsApp
            </a>
            <a
              href={`tel:${site.phones[0].replace(/\s/g, '')}`}
              className="rounded-full border border-white/30 px-7 py-3.5 font-bold transition-colors duration-200 ease-smooth hover:border-sun hover:bg-white/5 hover:text-sun active:scale-[0.98]"
            >
              Appeler le {site.phones[0]}
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
