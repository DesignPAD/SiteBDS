import Image from 'next/image';
import Link from 'next/link';
import { categories } from '@/data/categories';
import { site, waLink } from '@/lib/site';

export function Footer() {
  return (
    <footer className="mt-16 bg-navy text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Image
            src="/brand/logo-bds.png"
            alt="Logo BDS Équipements"
            width={140}
            height={93}
            className="w-32 rounded-lg"
          />
          <p className="mt-3 text-lg font-extrabold">
            BDS <span className="text-sun">Équipements</span>
          </p>
          <p className="mt-1 text-sm italic text-white/80">« {site.tagline} »</p>
          <p className="mt-3 text-sm text-white/70">
            Matériaux de construction tous genres, sanitaire, luminaires, portes,
            revêtements et équipement maison. Expo-vente à Dakar.
          </p>
        </div>

        <div>
          <p className="font-bold mb-3 text-sun">Catégories</p>
          <ul className="space-y-2 text-sm text-white/80">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`/boutique?categorie=${c.id}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-bold mb-3 text-sun">Navigation</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li><Link href="/boutique" className="hover:text-white">Boutique</Link></li>
            <li><Link href="/services" className="hover:text-white">Services</Link></li>
            <li><Link href="/a-propos" className="hover:text-white">À propos</Link></li>
            <li><Link href="/contact" className="hover:text-white">Contact</Link></li>
            <li><Link href="/panier" className="hover:text-white">Panier</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-bold mb-3 text-sun">Nous contacter</p>
          <ul className="space-y-2 text-sm text-white/80">
            <li>📍 {site.address}</li>
            {site.phones.map((p) => (
              <li key={p}>
                📞 <a href={`tel:${p.replace(/\s/g, '')}`} className="hover:text-white">{p}</a>
              </li>
            ))}
            <li>
              <a
                href={waLink('Bonjour BDS Équipements !')}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-1 rounded-full bg-success px-4 py-2 font-semibold text-white"
              >
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">
        © {new Date().getFullYear()} {site.name} — Tous droits réservés
      </div>
    </footer>
  );
}
