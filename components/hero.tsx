import Image from 'next/image';
import Link from 'next/link';
import { waLink } from '@/lib/site';

// Hero immersif. Composant serveur : aucune animation JS, tout est en CSS
// (voir globals.css) — compositing GPU 60 fps, et le contenu LCP peint sans
// attendre l'hydratation. Respecte prefers-reduced-motion.
export function Hero() {
  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden text-white">
      {/* Préchargement du fond (React 19 remonte ces <link> dans <head>) pour un LCP rapide. */}
      <link
        rel="preload"
        as="image"
        href="/brand/background-hero-mobile.webp"
        media="(max-width: 767px)"
        fetchPriority="high"
      />
      <link
        rel="preload"
        as="image"
        href="/brand/background-hero.webp"
        media="(min-width: 768px)"
        fetchPriority="high"
      />
      {/* Fond : collage produits (background-image CSS) avec zoom lent (Ken Burns) */}
      <div aria-hidden className="bds-hero-bg bds-kenburns absolute inset-0 -z-20" />

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

      <div className="mx-auto grid w-full max-w-7xl items-center gap-10 px-5 py-16 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8 lg:py-20">
        {/* Panneau texte : voile navy 70% + léger flou uniquement derrière le contenu */}
        {/* Voile navy assez opaque pour la lisibilité ; le flou (coûteux sur GPU
            mobile → retarde le LCP) n'est activé qu'à partir de md. */}
        <div className="rounded-card bg-[#0B1730]/80 p-7 sm:p-9 md:bg-[#0B1730]/70 md:backdrop-blur-[5px]">
          <p className="mb-3 inline-block rounded-full bg-sun/20 px-3 py-1 text-sm font-semibold text-sun">
            Quincaillerie &amp; équipement maison — Dakar
          </p>
          <h1 className="bds-fade-in text-4xl font-extrabold leading-[1.08] sm:text-5xl">
            Équipez votre maison <span className="text-sun">sans vous ruiner</span>
          </h1>
          <p className="mt-5 max-w-lg leading-relaxed text-white/75 sm:text-lg">
            Matériaux de construction, sanitaire, luminaires, portes et
            revêtements — aux prix officiels du magasin, livrés chez vous à
            Dakar.
          </p>
          <div className="bds-rise mt-8 flex flex-wrap gap-3">
            <Link
              href="/boutique"
              className="rounded-full bg-brand px-7 py-3.5 font-bold text-navy shadow-btn transition-[background-color,box-shadow,transform] duration-200 ease-smooth hover:bg-brand-dark hover:shadow-btn-hover active:scale-[0.98]"
            >
              Voir le catalogue
            </Link>
            <a
              href={waLink('Bonjour BDS Équipements, je souhaite demander un devis.')}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full border border-white/30 px-7 py-3.5 font-bold text-white transition-colors duration-200 ease-smooth hover:border-sun hover:bg-white/5 hover:text-sun active:scale-[0.98]"
            >
              Demander un devis
            </a>
          </div>
        </div>

        {/* Produit vedette : halo bleu doux + flottement léger */}
        <div className="relative">
          <div
            aria-hidden
            className="bds-glow absolute -inset-10 -z-10"
            style={{
              background:
                'radial-gradient(closest-side, rgba(56,116,255,.35), rgba(251,192,45,.12) 55%, transparent 75%)',
            }}
          />
          <div className="bds-float overflow-hidden rounded-card shadow-2xl shadow-black/40 ring-1 ring-white/15">
            <Image
              src="/brand/chambre-hero.jpg"
              alt="Chambre à coucher complète disponible chez BDS Équipements"
              width={1080}
              height={715}
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
