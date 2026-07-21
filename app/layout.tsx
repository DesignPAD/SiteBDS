import type { Metadata } from 'next';
import { Manrope } from 'next/font/google';
import './globals.css';
import { Footer } from '@/components/footer';
import { Header } from '@/components/header';
import { Topbar } from '@/components/topbar';
import { CartProvider } from '@/lib/cart-context';
import { LocalBusinessJsonLd } from '@/components/json-ld';
import { site } from '@/lib/site';

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Quincaillerie à Dakar | ${site.tagline}`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    siteName: site.name,
    locale: 'fr_SN',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`${manrope.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col">
        <LocalBusinessJsonLd />
        <a
          href="#contenu"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-navy focus:px-4 focus:py-2 focus:font-bold focus:text-white"
        >
          Aller au contenu
        </a>
        <CartProvider>
          <Topbar />
          <Header />
          <main id="contenu" className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
