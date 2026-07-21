import type { Metadata } from 'next';
import Link from 'next/link';
import { Suspense } from 'react';
import { ProductCard } from '@/components/product-card';
import { SortSelect } from '@/components/sort-select';
import { categories, getCategory } from '@/data/categories';
import { products } from '@/data/products';

type SearchParams = Promise<{ categorie?: string; q?: string; tri?: string }>;

export async function generateMetadata({
  searchParams,
}: {
  searchParams: SearchParams;
}): Promise<Metadata> {
  const { categorie, q } = await searchParams;
  const cat = categorie ? getCategory(categorie) : undefined;
  const title = cat ? `${cat.name} — Boutique` : 'Boutique — Catalogue par catégories';
  const description =
    cat?.description ??
    'Tout le catalogue BDS Équipements : luminaires, carrelage, revêtements, sanitaire, robinetterie, portes et décoration. Prix officiels en F CFA.';
  // Canonique : une page catégorie propre pointe vers elle-même ; les recherches
  // et tris pointent vers la boutique de base pour éviter le contenu dupliqué.
  const canonical = cat && !q ? `/boutique?categorie=${cat.id}` : '/boutique';
  return { title, description, alternates: { canonical } };
}

export default async function BoutiquePage({ searchParams }: { searchParams: SearchParams }) {
  const { categorie, q, tri } = await searchParams;
  const activeCategory = categorie ? getCategory(categorie) : undefined;
  const query = q?.trim().toLowerCase() ?? '';

  let list = products.filter((p) => {
    if (activeCategory && p.categoryId !== activeCategory.id) return false;
    if (query) {
      const haystack = `${p.name} ${p.sku} ${p.brand ?? ''} ${p.shortDescription}`.toLowerCase();
      if (!haystack.includes(query)) return false;
    }
    return true;
  });

  if (tri === 'prix-asc') {
    list = [...list].sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
  } else if (tri === 'prix-desc') {
    list = [...list].sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
  }

  const chipParams = (categoryId?: string) => {
    const params = new URLSearchParams();
    if (categoryId) params.set('categorie', categoryId);
    if (q) params.set('q', q);
    if (tri) params.set('tri', tri);
    const s = params.toString();
    return s ? `?${s}` : '';
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-8">
      {/* Breadcrumbs */}
      <nav aria-label="Fil d’Ariane" className="mb-4 text-sm text-muted">
        <ol className="flex flex-wrap gap-1">
          <li>
            <Link href="/" className="hover:text-brand">Accueil</Link>
            <span aria-hidden> / </span>
          </li>
          <li>
            {activeCategory ? (
              <>
                <Link href="/boutique" className="hover:text-brand">Boutique</Link>
                <span aria-hidden> / </span>
              </>
            ) : (
              <span className="font-semibold text-ink">Boutique</span>
            )}
          </li>
          {activeCategory && (
            <li className="font-semibold text-ink">{activeCategory.name}</li>
          )}
        </ol>
      </nav>

      <h1 className="text-3xl font-extrabold text-navy">
        {activeCategory ? activeCategory.name : 'Boutique'}
      </h1>
      <p className="mt-1 text-muted">
        {activeCategory?.description ??
          'Tous nos produits, aux prix officiels du magasin.'}
        {query && (
          <>
            {' '}— résultats pour « <strong className="text-ink">{q}</strong> »
          </>
        )}
      </p>

      {/* Filtres catégories */}
      <div className="mt-6 flex flex-wrap gap-2">
        <Link
          href={`/boutique${chipParams()}`}
          aria-current={!activeCategory ? 'true' : undefined}
          className={`rounded-full px-4 py-2 text-sm font-bold transition ${
            !activeCategory
              ? 'bg-navy text-white'
              : 'border border-line bg-white text-ink hover:border-navy'
          }`}
        >
          Tous
        </Link>
        {categories.map((c) => (
          <Link
            key={c.id}
            href={`/boutique${chipParams(c.id)}`}
            aria-current={activeCategory?.id === c.id ? 'true' : undefined}
            className={`rounded-full px-4 py-2 text-sm font-bold transition ${
              activeCategory?.id === c.id
                ? 'bg-navy text-white'
                : 'border border-line bg-white text-ink hover:border-navy'
            }`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {/* Compteur + tri */}
      <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-semibold text-muted">
          {list.length} produit{list.length > 1 ? 's' : ''}
        </p>
        <Suspense>
          <SortSelect />
        </Suspense>
      </div>

      {/* Grille ou état vide */}
      {/* Titre de niveau 2 pour conserver la hiérarchie h1 → h2 → h3 (cartes produit). */}
      <h2 className="sr-only">Résultats</h2>
      {list.length > 0 ? (
        <div className="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {list.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      ) : (
        <div className="mt-10 rounded-card border border-line bg-white p-10 text-center">
          <p className="text-lg font-bold text-navy">Aucun produit trouvé</p>
          <p className="mt-2 text-sm text-muted">
            Essayez un autre mot-clé ou une autre catégorie — ou contactez-nous,
            nous avons beaucoup plus de produits en magasin.
          </p>
          <Link
            href="/boutique"
            className="mt-4 inline-block rounded-full bg-brand px-6 py-2.5 font-bold text-navy hover:bg-brand-dark"
          >
            Voir tous les produits
          </Link>
        </div>
      )}
    </div>
  );
}
