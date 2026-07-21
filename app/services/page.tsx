import type { Metadata } from 'next';
import { site, waLink } from '@/lib/site';
import { DeliveryIcon } from '@/components/delivery-icon';
import { AdviceIcon, CheckShieldIcon, QuoteIcon } from '@/components/icons';

export const metadata: Metadata = {
  title: 'Services — Livraison, conseil et devis',
  description:
    'Les services BDS Équipements à Dakar : livraison, conseil avant achat, commande assistée et devis pour particuliers, artisans et chantiers.',
  alternates: { canonical: '/services' },
};

const services = [
  {
    Icon: DeliveryIcon,
    title: 'Livraison à Dakar et environs',
    text: 'Nous livrons vos matériaux et équipements. Le délai et le coût sont confirmés au moment de la commande, selon votre quartier et le volume.',
  },
  {
    Icon: AdviceIcon,
    title: 'Conseil avant achat',
    text: 'Un doute sur un produit, une dimension, une compatibilité ? Notre équipe vous conseille au magasin, au téléphone ou sur WhatsApp.',
  },
  {
    Icon: QuoteIcon,
    title: 'Devis pour chantiers et entreprises',
    text: 'Envoyez votre liste de matériaux : nous préparons un devis avec les quantités, les prix et la livraison.',
  },
  {
    Icon: CheckShieldIcon,
    title: 'Commande assistée',
    text: 'Composez votre panier sur le site puis envoyez-le sur WhatsApp : nous confirmons chaque article, le total exact et la livraison.',
  },
];

export default function ServicesPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 sm:px-6 py-10">
      <h1 className="text-3xl font-extrabold text-navy">Nos services</h1>
      <p className="mt-2 max-w-2xl text-muted">
        Du choix du produit à la livraison chez vous : nous accompagnons
        particuliers, artisans et entreprises à chaque étape.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {services.map(({ Icon, title, text }) => (
          <div
            key={title}
            className="rounded-card border border-line bg-white p-6 shadow-card transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover"
          >
            <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-brand/10 text-brand-ink">
              <Icon className="h-6 w-6" />
            </span>
            <h2 className="mt-4 text-lg font-extrabold text-navy">{title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 rounded-card bg-navy p-8 text-center text-white">
        <h2 className="text-xl font-extrabold">Besoin d’un service maintenant ?</h2>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <a
            href={waLink('Bonjour BDS Équipements, j’ai besoin d’un service :')}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-success px-6 py-3 font-bold hover:opacity-90"
          >
            WhatsApp
          </a>
          <a
            href={`tel:${site.phones[0].replace(/\s/g, '')}`}
            className="rounded-full border-2 border-white/40 px-6 py-3 font-bold hover:border-sun hover:text-sun"
          >
            {site.phones[0]}
          </a>
        </div>
      </div>
    </div>
  );
}
