'use client';

// Frontière d'erreur au niveau des routes. Capture les erreurs de rendu et
// propose de réessayer sans recharger toute l'application.

import { useEffect } from 'react';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Journalisé côté client sans données personnelles.
    console.error(error);
  }, [error]);

  return (
    <div className="mx-auto flex max-w-lg flex-col items-center px-4 py-24 text-center">
      <h1 className="text-2xl font-extrabold text-navy">Une erreur est survenue</h1>
      <p className="mt-2 text-muted">
        Désolé, quelque chose n’a pas fonctionné. Vous pouvez réessayer ou
        revenir à l’accueil.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <button
          type="button"
          onClick={reset}
          className="rounded-full bg-brand px-6 py-3 font-bold text-white transition hover:bg-brand-dark"
        >
          Réessayer
        </button>
        <Link
          href="/"
          className="rounded-full border-2 border-navy px-6 py-3 font-bold text-navy transition hover:bg-navy hover:text-white"
        >
          Retour à l’accueil
        </Link>
      </div>
    </div>
  );
}
