import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2 shrink-0" aria-label="BDS Équipements — Accueil">
      <span
        aria-hidden
        className="grid h-9 w-9 place-items-center rounded-lg bg-navy text-sun font-extrabold text-lg"
      >
        B
      </span>
      <span className="leading-tight">
        <span className="block font-extrabold text-navy text-base sm:text-lg">
          BDS Équipements
        </span>
        <span className="block text-[0.65rem] sm:text-xs text-muted">
          Quincaillerie — Dakar
        </span>
      </span>
    </Link>
  );
}
