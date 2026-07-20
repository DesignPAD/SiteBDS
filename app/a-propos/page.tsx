import type { Metadata } from 'next';
import Link from 'next/link';
import { site } from '@/lib/site';

export const metadata: Metadata = {
  title: 'À propos',
  description:
    'BDS Équipements, quincaillerie et expo-vente à Diamalaye, Dakar : matériaux de construction tous genres, sanitaire, luminaires et équipement maison.',
};

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-3xl font-extrabold text-navy">À propos de {site.name}</h1>
      <p className="mt-2 text-lg italic text-brand font-semibold">« {site.tagline} »</p>

      <div className="mt-6 space-y-4 text-muted leading-relaxed">
        <p>
          {site.name} est une quincaillerie et expo-vente installée à Diamalaye,
          Dakar. Nous vendons des matériaux de construction tous genres ainsi que
          de l’équipement pour la maison : sanitaire et robinetterie, luminaires,
          portes, carrelage et revêtements, mobilier et décoration.
        </p>
        <p>
          Notre promesse est simple : des produits de qualité aux prix du
          magasin, sans surprise. Les prix affichés sur ce site sont les prix
          officiels pratiqués en boutique.
        </p>
        <p>
          Nous servons les particuliers qui équipent leur maison, les artisans
          qui cherchent vite le bon produit, et les entreprises qui ont besoin
          de devis et de livraisons pour leurs chantiers.
        </p>
      </div>

      <div className="mt-8 rounded-card border border-line bg-white p-6">
        <h2 className="font-extrabold text-navy">Nous trouver</h2>
        <p className="mt-2 text-sm text-muted">📍 {site.address}</p>
        <p className="mt-1 text-sm text-muted">
          📞 {site.phones.join(' · ')}
        </p>
      </div>

      <Link
        href="/boutique"
        className="mt-8 inline-block rounded-full bg-brand px-7 py-3 font-bold text-white hover:bg-brand-dark"
      >
        Découvrir la boutique
      </Link>
    </div>
  );
}
