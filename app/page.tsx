import Image from 'next/image';
import Link from 'next/link';
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
    title: 'Produits en stock à Dakar',
    text: 'Ce que vous voyez sur le site est disponible dans notre magasin de Diamalaye.',
    icon: '🏪',
  },
  {
    title: 'Livraison à Dakar et environs',
    text: 'Nous livrons vos matériaux et équipements — délais confirmés à la commande.',
    icon: '🚚',
  },
  {
    title: 'Conseil avant achat',
    text: 'Notre équipe vous aide à choisir le bon produit pour votre projet.',
    icon: '💬',
  },
  {
    title: 'Commande assistée WhatsApp',
    text: 'Composez votre panier, envoyez-le sur WhatsApp, on s’occupe du reste.',
    icon: '✅',
  },
];

export default function Home() {
  return (
    <div>
      {/* Hero — une seule promesse, collage produits en fond immersif */}
      <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden text-white">
        {/* Fond : collage produits (l'image n'est pas retouchée, uniquement des calques CSS) */}
        <Image
          src="/brand/background-hero.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="-z-20 object-cover"
        />
        {/* Dégradé gauche → droite : lisible à gauche, collage révélé à droite */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'linear-gradient(to right, rgba(11,23,48,.80) 0%, rgba(11,23,48,.45) 50%, rgba(11,23,48,.15) 100%)',
          }}
        />
        {/* Vignette douce + fondu bas de section */}
        <div
          aria-hidden
          className="absolute inset-0 -z-10"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 55%, rgba(4,10,24,.30) 100%), linear-gradient(to bottom, transparent 72%, rgba(11,23,48,.65) 100%)',
          }}
        />

        <div className="mx-auto grid w-full max-w-7xl items-center gap-8 px-4 py-16 lg:grid-cols-2 lg:py-20">
          {/* Panneau texte : voile navy 70% + léger flou uniquement derrière le contenu */}
          <div className="rounded-card bg-[#0B1730]/70 p-7 backdrop-blur-[5px] sm:p-9">
            <p className="mb-3 inline-block rounded-full bg-sun/20 px-3 py-1 text-sm font-semibold text-sun">
              Quincaillerie & équipement maison — Dakar
            </p>
            <h1 className="text-3xl font-extrabold leading-tight sm:text-5xl">
              Équipez votre maison{' '}
              <span className="text-sun">sans vous ruiner</span>
            </h1>
            <p className="mt-4 max-w-lg text-white/80">
              Matériaux de construction, sanitaire, luminaires, portes et
              revêtements — aux prix officiels du magasin, livrés chez vous à
              Dakar.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href="/boutique"
                className="rounded-full bg-brand px-7 py-3.5 font-bold text-white transition hover:bg-brand-dark"
              >
                Voir le catalogue
              </Link>
              <a
                href={waLink('Bonjour BDS Équipements, je souhaite demander un devis.')}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full border-2 border-white/40 px-7 py-3.5 font-bold text-white transition hover:border-sun hover:text-sun"
              >
                Demander un devis
              </a>
            </div>
          </div>

          {/* Produit vedette : halo lumineux radial doux derrière la carte */}
          <div className="relative">
            <div
              aria-hidden
              className="absolute -inset-10 -z-10"
              style={{
                background:
                  'radial-gradient(closest-side, rgba(251,192,45,.28), rgba(56,116,255,.10) 60%, transparent 75%)',
              }}
            />
            <div className="overflow-hidden rounded-card shadow-2xl shadow-black/40 ring-1 ring-white/15">
              <Image
                src="/brand/chambre-hero.png"
                alt="Chambre à coucher complète disponible chez BDS Équipements"
                width={1080}
                height={715}
                priority
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Catégories */}
      <section className="mx-auto max-w-7xl px-4 py-12">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">
            Nos <span className="text-brand">catégories</span>
          </h2>
          <Link href="/boutique" className="text-sm font-bold text-royal hover:underline">
            Tout voir →
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
