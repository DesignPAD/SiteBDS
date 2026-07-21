'use client';

// Dernier filet de sécurité : capture les erreurs survenant dans le layout racine
// lui-même (où error.tsx ne s'applique pas). Doit rendre ses propres <html>/<body>.

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="fr">
      <body
        style={{
          fontFamily: 'system-ui, sans-serif',
          display: 'flex',
          minHeight: '100vh',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '1rem',
          padding: '2rem',
          textAlign: 'center',
          color: '#1c2436',
          background: '#faf8f4',
        }}
      >
        <h1 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#16233b' }}>
          Une erreur est survenue
        </h1>
        <p style={{ color: '#5b6474' }}>
          Désolé, une erreur inattendue s’est produite. Veuillez réessayer.
        </p>
        <button
          type="button"
          onClick={reset}
          style={{
            borderRadius: '9999px',
            background: '#ff8f00',
            color: '#fff',
            fontWeight: 700,
            padding: '0.75rem 1.5rem',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Réessayer
        </button>
      </body>
    </html>
  );
}
