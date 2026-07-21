import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/data/categories';

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/boutique?categorie=${category.id}`}
      className="group overflow-hidden rounded-card border border-line bg-white transition hover:shadow-lg"
    >
      {category.image && (
        <div className="aspect-square overflow-hidden bg-cream">
          <Image
            src={category.image}
            alt=""
            width={300}
            height={300}
            sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
            className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <p className="p-3 text-center text-sm font-bold text-ink group-hover:text-brand">
        {category.name}
      </p>
    </Link>
  );
}
