import { notFound } from 'next/navigation';
import { getArticleHtml, getArticleMeta, getArticlesByCategory } from '@/lib/koreaArticles';
import Link from 'next/link';
import ArticleContent from '@/components/ArticleContent';

export function generateStaticParams() {
  return getArticlesByCategory('food').map((a) => ({ slug: a.slug }));
}

export default async function FoodArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getArticleMeta(slug);
  if (!meta || meta.category !== 'food') notFound();

  const html = getArticleHtml(slug);
  if (!html) notFound();

  const relatedArticles = getArticlesByCategory('food').filter((a) => a.slug !== slug);

  return (
    <div className="py-4 mx-auto">
      <div className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] mb-6">
        <Link href="/korea/food" className="hover:text-[var(--text-primary)] transition-colors">🇰🇷 韩国美食</Link>
        <span className="text-[var(--text-placeholder)]">›</span>
        <span className="text-[var(--text-secondary)]">{meta?.title}</span>
      </div>

      <ArticleContent html={html} basePath="/korea/food" />

      {relatedArticles.length > 0 && (
        <div className="mt-10 pt-8 border-t border-[var(--border-color)]">
          <h3 className="text-base font-bold text-[var(--text-primary)] mb-4">🍖 更多美食文章</h3>
          <div className="grid grid-cols-2 gap-3">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/korea/food/${a.slug}`}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--pink-pale)] transition-colors"
              >
                <div className="text-sm font-medium text-[var(--text-primary)] line-clamp-1">{a.title}</div>
                <div className="text-xs text-[var(--text-muted)] mt-0.5 line-clamp-1">{a.subtitle}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
