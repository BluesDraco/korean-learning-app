import { getArticlesByCategory } from '@/lib/koreaArticles';
import Link from 'next/link';

const ILLUSTRATIONS: Record<string, string> = {
  'seoul-districts': '🏙️',
  'seoul-subway': '🚇',
  'korea-taboos': '⚠️',
  'seoul-25-places': '🗺️',
  'korea-shopping': '🛍️',
};

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
            <div
              className="h-40 flex items-center justify-center text-6xl relative"
              style={{
                background: `linear-gradient(160deg, ${a.color}22, ${a.color}44, ${a.color}18)`,
              }}
            >
              <span className="transform group-hover:scale-110 transition-transform duration-300">
                {ILLUSTRATIONS[a.slug] || '✈️'}
              </span>
              <div
                className="absolute top-3 left-3 text-xs font-bold px-2.5 py-1 rounded-full"
                style={{ backgroundColor: a.color + '30', color: a.color }}
              >
                {a.tag}
              </div>
            </div>

            <div className="p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-xs text-[var(--text-muted)]">{a.readTime}</span>
              </div>
              <h3 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--pink-primary)] transition-colors leading-snug">
                {a.title}
              </h3>
              <p className="text-sm text-[var(--text-muted)] mt-2 line-clamp-2 leading-relaxed">
                {a.subtitle}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
