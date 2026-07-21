import type { Metadata } from 'next';
import { products } from '@/data/products';
import { CartView, type CartCatalogItem } from './cart-view';

export const metadata: Metadata = {
  title: 'Votre panier',
  // Un panier est propre à chaque visiteur : aucun intérêt à l'indexer.
  robots: { index: false, follow: true },
};

export default function CartPage() {
  // On ne transmet au client que les champs nécessaires à l'affichage du
  // panier. Les descriptions et caractéristiques (le gros du catalogue)
  // restent côté serveur et ne sont plus embarquées dans le bundle JS.
  const catalog: CartCatalogItem[] = products.map((p) => ({
    id: p.id,
    slug: p.slug,
    sku: p.sku,
    name: p.name,
    price: p.price,
    salePrice: p.salePrice ?? null,
    priceOnRequest: p.priceOnRequest ?? false,
    image: { src: p.images[0].src, alt: p.images[0].alt },
  }));

  return <CartView catalog={catalog} />;
}
