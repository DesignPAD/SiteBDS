import type { Metadata } from 'next';
import { LocationIcon } from '@/components/location-icon';
import { PhoneIcon } from '@/components/phone-icon';
import { AdviceIcon } from '@/components/icons';
import { site, waLink } from '@/lib/site';

export const metadata: Metadata = {
  title: 'Contact',
  description:
    'Contactez BDS Équipements à Dakar : WhatsApp, téléphone ou visite au magasin de Diamalaye. Réponse rapide pour vos commandes et devis.',
  alternates: { canonical: '/contact' },
};

export default function ContactPage() {
  return (
    <div className="mx-auto max-w-3xl px-5 sm:px-6 py-10">
      <h1 className="text-3xl font-extrabold text-navy">Contactez-nous</h1>
      <p className="mt-2 text-muted">
        Le plus rapide : WhatsApp. Nous répondons aussi au téléphone et au
        magasin.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <a
          href={waLink('Bonjour BDS Équipements !')}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-card border border-line bg-white p-6 shadow-card transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover"
        >
          <div className="flex items-center gap-2">
            <AdviceIcon className="h-6 w-6 text-sun" />
            <p className="font-extrabold text-navy">WhatsApp (recommandé)</p>
          </div>
          <p className="mt-1 text-sm text-muted">{site.phones[0]}</p>
          <p className="text-sm text-muted">{site.phones[1]}</p>
        </a>
        <div className="rounded-card border border-line bg-white p-6">
          <div className="flex items-center gap-2">
            <PhoneIcon className="h-6 w-6 text-sun" />
            <p className="font-extrabold text-navy">Téléphone</p>
          </div>
          {site.phones.map((p) => (
            <p key={p} className="mt-1 text-sm">
              <a href={`tel:${p.replace(/\s/g, '')}`} className="text-royal hover:underline">
                {p}
              </a>
            </p>
          ))}
        </div>
        <div className="rounded-card border border-line bg-white p-6 sm:col-span-2">
          <div className="flex items-center gap-2">
            <LocationIcon className="h-6 w-6 text-sun" />
            <p className="font-extrabold text-navy">Le magasin</p>
          </div>
          <p className="mt-1 text-sm text-muted">{site.address}</p>
          <p className="mt-2 text-sm text-muted">
            Expo-vente : matériaux de construction, sanitaire, luminaires,
            salon, lit, table, jardin.
          </p>
        </div>
      </div>
    </div>
  );
}
