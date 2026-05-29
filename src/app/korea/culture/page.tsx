import { getArticlesByCategory } from '@/lib/koreaArticles';
import Link from 'next/link';

export default function CulturePage() {
  const articles = getArticlesByCategory('culture');

  return (
    <div className="py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">👘 韩国文化</h1>
        <p className="text-[var(--text-secondary)] text-base mt-1">
          从传统韩服到现代K-POP，了解丰富多彩的韩国文化
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {articles.map((a) => (
          <Link
            key={a.slug}
            href={`/korea/culture/${a.slug}`}
            className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <div className="h-40 relative overflow-hidden">
              <img
                src={a.bannerImage}
                alt={a.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>

            <div className="px-5 py-3">
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
