'use client';

// Hero animé — Framer Motion.
// Performance : uniquement transform et opacity (compositées GPU, 60 fps),
// aucune animation de layout. Les animations sont désactivées si l'utilisateur
// préfère réduire les mouvements (prefers-reduced-motion).

import { motion, useReducedMotion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { waLink } from '@/lib/site';

export function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative isolate flex min-h-[88vh] items-center overflow-hidden text-white">
      {/* Sans JavaScript, les états initiaux (opacity:0) resteraient figés :
          on force l'état final pour que le titre et les CTA restent visibles. */}
      <noscript>
        <style>{`[data-motion-fallback]{opacity:1 !important;transform:none !important}`}</style>
      </noscript>
      {/* Fond : collage produits avec zoom lent (Ken Burns) */}
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-20"
        initial={{ scale: 1 }}
        animate={reduceMotion ? {} : { scale: 1.05 }}
        transition={{
          duration: 8,
          ease: 'easeInOut',
          repeat: Infinity,
          repeatType: 'reverse',
        }}
        style={{ willChange: 'transform' }}
      >
        <Image
          src="/brand/background-hero.jpg"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

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
          <motion.h1
            data-motion-fallback
            className="text-3xl font-extrabold leading-tight sm:text-5xl"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.9, ease: 'easeOut' }}
          >
            Équipez votre maison <span className="text-sun">sans vous ruiner</span>
          </motion.h1>
          <p className="mt-4 max-w-lg text-white/80">
            Matériaux de construction, sanitaire, luminaires, portes et
            revêtements — aux prix officiels du magasin, livrés chez vous à
            Dakar.
          </p>
          <motion.div
            data-motion-fallback
            className="mt-8 flex flex-wrap gap-3"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35, ease: 'easeOut' }}
          >
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
          </motion.div>
        </div>

        {/* Produit vedette : halo bleu doux + flottement léger */}
        <div className="relative">
          <motion.div
            aria-hidden
            className="absolute -inset-10 -z-10"
            style={{
              background:
                'radial-gradient(closest-side, rgba(56,116,255,.35), rgba(251,192,45,.12) 55%, transparent 75%)',
              willChange: 'opacity',
            }}
            animate={reduceMotion ? {} : { opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="overflow-hidden rounded-card shadow-2xl shadow-black/40 ring-1 ring-white/15"
            animate={reduceMotion ? {} : { y: [0, -6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ willChange: 'transform' }}
          >
            <Image
              src="/brand/chambre-hero.jpg"
              alt="Chambre à coucher complète disponible chez BDS Équipements"
              width={1080}
              height={715}
              priority
              className="h-full w-full object-cover"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
