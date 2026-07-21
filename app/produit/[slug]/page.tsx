import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { Price } from '@/components/price';
import { ProductActions } from '@/components/product-actions';
import { ProductCard } from '@/components/product-card';
import { StockBadge } from '@/components/stock-badge';
import { JsonLd } from '@/components/json-ld';
import { getCategory } from '@/data/categories';
import { getProduct, getProductsByCategory, products } from '@/data/products';
import { site } from '@/lib/site';

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

// Le catalogue est entièrement connu à la compilation : toute autre référence
// doit renvoyer un vrai 404 (sinon Next répond 200 sur une page « introuvable »,
// ce que Google pénalise comme « soft 404 »).
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) return {};
  return {
    title: product.name,
    description: `${product.shortDescription} Réf. ${product.sku} — disponible chez ${site.name}, Dakar.`,
    alternates: { canonical: `/produit/${product.slug}` },
    openGraph: {
      type: 'website',
      title: product.name,
      images: [{ url: product.images[0].src, alt: product.images[0].alt }],
    },
  };
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProduct(slug);
  if (!product) notFound();

  const category = getCategory(product.categoryId);
  const similar = getProductsByCategory(product.categoryId)
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    ...(product.brand ? { brand: { '@type': 'Brand', name: product.brand } } : {}),
    image: `${site.url}${product.images[0].src}`,
    description: product.shortDescription,
    ...(product.priceOnRequest
      ? {}
      : {
          offers: {
            '@type': 'Offer',
            price: product.salePrice ?? product.price,
            priceCurrency: 'XOF',
            url: `${site.url}/produit/${product.slug}`,
            availability:
              product.stockStatus === 'out_of_stock'
                ? 'https://schema.org/OutOfStock'
                : 'https://schema.org/InStock',
          },
        }),
  };

  const breadcrumbJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Accueil', item: site.url },
      { '@type': 'ListItem', position: 2, name: 'Boutique', item: `${site.url}/boutique` },
      ...(category
        ? [
            {
              '@type': 'ListItem',
              position: 3,
              name: category.name,
              item: `${site.url}/boutique?categorie=${category.id}`,
            },
          ]
        : []),
      {
        '@type': 'ListItem',
        position: category ? 4 : 3,
        name: product.name,
        item: `${site.url}/produit/${product.slug}`,
      },
    ],
  };

  return (
    <div className="mx-auto max-w-7xl px-5 py-10 sm:px-6 sm:py-14 lg:px-8">
      <JsonLd data={productJsonLd} />
      <JsonLd data={breadcrumbJsonLd} />

      {/* Breadcrumbs */}
      <nav aria-label="Fil d’Ariane" className="mb-6 text-sm text-muted">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-brand">Accueil</Link>
            <span aria-hidden> / </span>
          </li>
          <li>
            <Link href="/boutique" className="hover:text-brand">Boutique</Link>
            <span aria-hidden> / </span>
          </li>
          {category && (
            <li>
              <Link href={`/boutique?categorie=${category.id}`} className="hover:text-brand">
                {category.name}
              </Link>
              <span aria-hidden> / </span>
            </li>
          )}
          <li className="font-semibold text-ink">{product.name}</li>
        </ol>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
        {/* Galerie */}
        <div className="overflow-hidden rounded-card border border-line bg-white shadow-card">
          <Image
            src={product.images[0].src}
            alt={product.images[0].alt}
            width={800}
            height={800}
            priority
            sizes="(min-width: 1024px) 45vw, 100vw"
            className="h-full w-full object-cover"
          />
        </div>

        {/* Infos */}
        <div>
          <div className="flex flex-wrap items-center gap-2">
            {category && (
              <span className="rounded-full bg-cream px-2.5 py-1 text-[11px] font-semibold uppercase tracking-wide text-muted">
                {category.name}
              </span>
            )}
            <StockBadge status={product.stockStatus} />
          </div>
          <h1 className="mt-4 text-3xl font-extrabold text-navy sm:text-4xl">{product.name}</h1>
          <p className="mt-1 text-sm text-muted">
            Réf. {product.sku}
            {product.brand && <> · Marque : {product.brand}</>}
          </p>
          <div className="mt-4">
            <Price product={product} size="lg" />
          </div>
          <p className="mt-4 text-muted">{product.shortDescription}</p>

          <div className="mt-6">
            <ProductActions product={product} />
          </div>

          {/* Livraison — parcours commande → livraison */}
          <div className="mt-6 space-y-2 rounded-card border border-line bg-white p-5 text-sm shadow-card">
            <p className="font-bold text-navy">Comment ça se passe ?</p>
            <ol className="list-decimal space-y-1 pl-5 text-muted">
              <li>Ajoutez au panier ou écrivez-nous sur WhatsApp.</li>
              <li>Nous confirmons la disponibilité, le total et le délai.</li>
              <li>Livraison à Dakar et environs, ou retrait au magasin ({site.address}).</li>
            </ol>
          </div>
        </div>
      </div>

      {/* Description + specs */}
      <div className="mt-10 grid gap-6 lg:grid-cols-2">
        <section className="rounded-card border border-line bg-white p-6 shadow-card sm:p-7">
          <h2 className="text-lg font-extrabold text-navy">Description</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted">{product.description}</p>
        </section>
        <section className="rounded-card border border-line bg-white p-6 shadow-card sm:p-7">
          <h2 className="text-lg font-extrabold text-navy">Caractéristiques</h2>
          <dl className="mt-3 divide-y divide-line text-sm">
            {Object.entries(product.specifications).map(([key, value]) => (
              <div key={key} className="flex justify-between gap-4 py-2">
                <dt className="font-semibold text-ink">{key}</dt>
                <dd className="text-right text-muted">{value}</dd>
              </div>
            ))}
            <div className="flex justify-between gap-4 py-2">
              <dt className="font-semibold text-ink">Référence</dt>
              <dd className="text-right text-muted">{product.sku}</dd>
            </div>
          </dl>
        </section>
      </div>

      {/* Produits similaires */}
      {similar.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-extrabold text-navy">
            Produits <span className="text-brand-ink">similaires</span>
          </h2>
          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {similar.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
