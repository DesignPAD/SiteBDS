import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/hero';
import { ProductCard } from '@/components/product-card';
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
    title: 'Produits en stock Ã  Dakar',
    text: 'Ce que vous voyez sur le site est disponible dans notre magasin de Diamalaye.',
    icon: 'ðŸª',
  },
  {
    title: 'Livraison Ã  Dakar et environs',
    text: 'Nous livrons vos matÃ©riaux et Ã©quipements â€” dÃ©lais confirmÃ©s Ã  la commande.',
    icon: 'ðŸšš',
  },
  {
    title: 'Conseil avant achat',
    text: 'Notre Ã©quipe vous aide Ã  choisir le bon produit pour votre projet.',
    icon: 'ðŸ’¬',
  },
  {
    title: 'Commande assistÃ©e WhatsApp',
    text: 'Composez votre panier, envoyez-le sur WhatsApp, on sâ€™occupe du reste.',
    icon: 'âœ…',
  },
];

export default function Home() {
  return (
    <div>
      <Hero />

      {/* CatÃ©gories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
            Nos <span className="text-brand">catÃ©gories</span>
          </h2>
          <Link href="/boutique" className="text-sm font-bold text-royal hover:underline">
            Tout voir â†’
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {categories.map((c) => (
            <Link
              key={c.id}
              href={`/boutique?categorie=${c.id}`}
              className="group overflow-hidden rounded-card border border-line bg-white transition hover:shadow-lg"
            >
              {c.image && (
                <div className="aspect-square overflow-hidden bg-cream">
                  <Image
                    src={c.image}
                    alt={c.name}
                    width={300}
                    height={300}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                  />
                </div>
              )}
              <p className="p-3 text-center text-sm font-bold text-ink group-hover:text-brand">
                {c.name}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Produits populaires */}
      <section className="bg-white py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="mb-6 flex items-end justify-between">
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
              Produits <span className="text-brand">populaires</span>
            </h2>
            <Link href="/boutique" className="text-sm font-bold text-royal hover:underline">
              Toute la boutique â†’
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* BÃ©nÃ©fices */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {benefits.map((b) => (
            <div key={b.title} className="rounded-card border border-line bg-white p-5">
              <p className="text-2xl" aria-hidden>{b.icon}</p>
              <p className="mt-2 font-bold text-navy">{b.title}</p>
              <p className="mt-1 text-sm text-muted">{b.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Bloc devis / WhatsApp */}
      <section className="mx-auto max-w-7xl px-4 pb-4">
        <div className="rounded-card bg-navy px-6 py-10 text-center text-white sm:px-12">
          <h2 className="text-2xl font-extrabold sm:text-3xl">
            Un projet ? Un chantier ? <span className="text-sun">Parlons-en.</span>
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-white/80">
            Envoyez-nous votre liste de matÃ©riaux : nous prÃ©parons votre devis et
            organisons la livraison Ã  Dakar.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <a
              href={waLink('Bonjour BDS Ã‰quipements, voici ma liste de matÃ©riaux pour un devis :')}
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
