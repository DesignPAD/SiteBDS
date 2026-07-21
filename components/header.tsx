'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { categories } from '@/data/categories';
import { useCart } from '@/lib/cart-context';
import { site, waLink } from '@/lib/site';
import { Logo } from './logo';
import { SearchForm } from './search-form';

const navLinks = [
  { href: '/boutique', label: 'Boutique' },
  { href: '/services', label: 'Services' },
  { href: '/a-propos', label: 'À propos' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count } = useCart();
  const pathname = usePathname();
  const drawerRef = useRef<HTMLDivElement>(null);
  const openerRef = useRef<HTMLButtonElement>(null);

  // Drawer mobile : verrou du défilement, fermeture au clavier (Échap), piège de
  // focus (Tab reste dans le panneau) et restitution du focus à la fermeture.
  useEffect(() => {
    if (!open) return;
    const opener = openerRef.current;
    const focusables = () =>
      Array.from(
        drawerRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input, [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false);
        return;
      }
      if (e.key === 'Tab') {
        const items = focusables();
        if (items.length === 0) return;
        const first = items[0];
        const last = items[items.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', onKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
      opener?.focus();
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-3 sm:gap-6">
        <button
          ref={openerRef}
          type="button"
          onClick={() => setOpen(true)}
          className="lg:hidden p-2 -ml-2 text-navy"
          aria-label="Ouvrir le menu"
          aria-expanded={open}
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="6" x2="20" y2="6" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="18" x2="20" y2="18" />
          </svg>
        </button>

        <Logo />

        {/* Recherche bureau */}
        <SearchForm
          id="site-search"
          placeholder="Que recherchez-vous ? (nom, référence…)"
          className="hidden md:flex flex-1 max-w-xl"
        />

        <nav className="hidden lg:flex items-center gap-5 text-sm font-semibold text-navy ml-auto">
          {navLinks.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? 'page' : undefined}
                className={active ? 'text-brand-ink' : 'hover:text-brand'}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 ml-auto lg:ml-0">
          <a
            href={waLink('Bonjour BDS Équipements, j’ai une question sur un produit.')}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden sm:grid h-10 w-10 place-items-center rounded-full bg-success/10 text-success hover:bg-success/20"
            aria-label="Nous écrire sur WhatsApp"
            title="WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5.1-1.3A10 10 0 1 0 12 2Zm0 18.2c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3 .8.8-2.9-.2-.3A8.2 8.2 0 1 1 12 20.2Zm4.5-6.1c-.2-.1-1.5-.7-1.7-.8-.2-.1-.4-.1-.6.1-.2.2-.6.8-.8 1-.1.2-.3.2-.5.1a6.7 6.7 0 0 1-3.3-2.9c-.3-.4 0-.5.1-.7l.4-.5c.1-.2.1-.3.2-.5v-.5c0-.1-.5-1.4-.8-1.9-.2-.5-.4-.4-.6-.4h-.5c-.2 0-.5.1-.7.3-.2.3-.9.9-.9 2.2s.9 2.5 1.1 2.7c.1.2 1.8 2.8 4.4 3.9.6.3 1.1.4 1.5.6.6.2 1.2.2 1.6.1.5-.1 1.5-.6 1.7-1.2.2-.6.2-1.1.2-1.2 0-.1-.2-.2-.4-.3Z" />
            </svg>
          </a>
          <Link
            href="/panier"
            className="relative grid h-10 w-10 place-items-center rounded-full bg-cream text-navy hover:bg-sand/40"
            aria-label={`Panier, ${count} article${count > 1 ? 's' : ''}`}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="8" cy="21" r="1" />
              <circle cx="19" cy="21" r="1" />
              <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12" />
            </svg>
            {count > 0 && (
              <span className="absolute -top-1 -right-1 grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-[0.65rem] font-bold text-navy">
                {count}
              </span>
            )}
          </Link>
        </div>
      </div>

      {/* Recherche mobile */}
      <SearchForm id="site-search-mobile" size="sm" className="md:hidden px-4 pb-3" />

      {/* Drawer catégories mobile */}
      {open && (
        <div className="fixed inset-0 z-50 lg:hidden" role="dialog" aria-modal="true" aria-label="Menu">
          <button
            type="button"
            className="absolute inset-0 bg-navy/60"
            aria-label="Fermer le menu"
            onClick={() => setOpen(false)}
          />
          <div ref={drawerRef} className="absolute inset-y-0 left-0 w-80 max-w-[85%] bg-white p-6 overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <p className="text-lg font-extrabold text-navy">Nos catégories</p>
              <button
                type="button"
                onClick={() => setOpen(false)}
                className="p-2 text-navy"
                aria-label="Fermer"
              >
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-1">
              {categories.map((c) => (
                <Link
                  key={c.id}
                  href={`/boutique?categorie=${c.id}`}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-3 text-base font-semibold text-ink hover:bg-cream"
                >
                  {c.name}
                </Link>
              ))}
            </nav>
            <hr className="my-4 border-line" />
            <nav className="flex flex-col gap-1">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-lg px-3 py-2.5 text-sm font-medium text-muted hover:bg-cream"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
            <a
              href={waLink('Bonjour BDS Équipements !')}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 block rounded-full bg-success px-4 py-3 text-center text-sm font-bold text-white"
            >
              Écrire sur WhatsApp — {site.phones[0]}
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
