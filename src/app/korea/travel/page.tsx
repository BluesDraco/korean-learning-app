import { getArticlesByCategory } from '@/lib/koreaArticles';
import Image from 'next/image';
import Link from 'next/link';

export default function TravelPage() {
  const articles = getArticlesByCategory('travel');

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">✈️ 韩国旅行</h1>
        <p className="text-[var(--text-secondary)] text-base mt-1">
          探索韩国热门城市，学实用的旅行韩语
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/korea/travel/${a.slug}`}
            className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="h-40 relative overflow-hidden">
              <Image
                src={a.bannerImage}
                alt={a.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              />
            </div>

            <div className="px-5 py-3">
              <h3 className="font-semibold text-[var(--text-primary)] mb-1">{a.title}</h3>
              <span className="text-xs text-[var(--text-muted)]">{a.readTime}</span>
              <p className="text-sm text-[var(--text-muted)] mt-1.5 line-clamp-2 leading-relaxed">
                {a.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
