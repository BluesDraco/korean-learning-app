import { TravelSection } from '@/components/korea/TravelSection';
import { getArticlesByCategory } from '@/lib/koreaArticles';
import Link from 'next/link';

export default function TravelPage() {
  const articles = getArticlesByCategory('travel');

  return (
    <div className="py-4 space-y-8">
      <div>
        <div className="mb-4">
          <h1 className="text-xl font-bold text-[var(--text-primary)]">✈️ 韩国旅行</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            探索韩国热门城市，学实用的旅行韩语
          </p>
        </div>
        <TravelSection />
      </div>

      {/* Article list */}
      <div>
        <h2 className="text-lg font-bold text-[var(--text-primary)] mb-4">📖 深度文章</h2>
        <div className="grid gap-3">
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={`/korea/travel/${a.slug}`}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 hover:border-[var(--pink-pale)] hover:shadow-sm transition-all group"
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-[10px] px-1.5 py-0.5 rounded-md font-medium" style={{ backgroundColor: a.color + '18', color: a.color }}>
                      {a.tag}
                    </span>
                    <span className="text-[10px] text-[var(--text-muted)]">{a.readTime}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] group-hover:text-[var(--pink-primary)] transition-colors">
                    {a.title}
                  </h3>
                  <p className="text-xs text-[var(--text-muted)] mt-1 line-clamp-1">{a.subtitle}</p>
                </div>
                <span className="text-lg shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">→</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
