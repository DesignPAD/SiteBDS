import Image from 'next/image';
import Link from 'next/link';

export function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 shrink-0">
      <Image
        src="/brand/logo-bds.jpg"
        alt=""
        width={66}
        height={44}
        priority
        className="h-11 w-auto rounded-lg"
      />
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
