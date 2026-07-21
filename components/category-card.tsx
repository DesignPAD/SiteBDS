import Image from 'next/image';
import Link from 'next/link';
import type { Category } from '@/data/categories';

export function CategoryCard({ category }: { category: Category }) {
  return (
    <Link
      href={`/boutique?categorie=${category.id}`}
      className="group overflow-hidden rounded-card border border-line bg-white shadow-card transition-[transform,box-shadow] duration-300 ease-smooth hover:-translate-y-1 hover:shadow-card-hover"
    >
      {category.image && (
        <div className="aspect-square overflow-hidden bg-cream">
          <Image
            src={category.image}
            alt=""
            width={300}
            height={300}
            sizes="(min-width: 1024px) 18vw, (min-width: 640px) 30vw, 45vw"
            className="h-full w-full object-cover transition-transform duration-700 ease-smooth group-hover:scale-[1.04]"
          />
        </div>
      )}
      <p className="p-4 text-center text-sm font-bold text-ink transition-colors duration-200 group-hover:text-brand-ink">
        {category.name}
      </p>
    </Link>
  );
}
