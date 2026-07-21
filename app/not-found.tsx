import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page introuvable',
  robots: { index: false },
};

export default function NotFound() {
  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <p className="text-6xl font-extrabold text-brand-ink">404</p>
      <h1 className="mt-4 text-2xl font-extrabold text-navy">Page introuvable</h1>
      <p className="mt-2 text-muted">
        La page que vous cherchez n’existe pas ou a été déplacée.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link
          href="/"
          className="rounded-full bg-brand px-6 py-3 font-bold text-navy transition hover:bg-brand-dark"
        >
          Retour à l’accueil
        </Link>
        <Link
          href="/boutique"
          className="rounded-full border-2 border-navy px-6 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
        >
          Voir la boutique
        </Link>
      </div>
    </div>
  );
}
