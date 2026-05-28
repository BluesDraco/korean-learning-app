import { notFound } from 'next/navigation';
import { ARTICLES, getArticleHtml, getArticleMeta, getArticlesByCategory } from '@/lib/koreaArticles';
import Link from 'next/link';

export function generateStaticParams() {
  return getArticlesByCategory('culture').map((a) => ({ slug: a.slug }));
}

export default async function CultureArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getArticleMeta(slug);
  if (!meta || meta.category !== 'culture') notFound();

  const html = getArticleHtml(slug);
  if (!html) notFound();

  const relatedArticles = getArticlesByCategory('culture').filter((a) => a.slug !== slug);

  return <ArticleContent html={html} meta={meta} relatedArticles={relatedArticles} />;
}

// Shared inline article renderer
function ArticleContent({
  html,
  meta,
  relatedArticles,
}: {
  html: string;
  meta: ReturnType<typeof getArticleMeta>;
  relatedArticles: ReturnType<typeof getArticlesByCategory>;
}) {
  return (
    <div className="py-4 max-w-[780px] mx-auto">
      {/* Breadcrumb */}
      <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)] mb-6">
        <Link href="/korea/culture" className="hover:text-[var(--text-primary)] transition-colors">🇰🇷 韩国文化</Link>
        <span className="text-[var(--text-placeholder)]">›</span>
        <span className="text-[var(--text-secondary)]">{meta?.title}</span>
      </div>

      {/* Rendered article */}
      <div
        className="korea-article"
        dangerouslySetInnerHTML={{ __html: html }}
      />

      {/* Related articles — only if there are any */}
      {relatedArticles && relatedArticles.length > 0 && (
        <div className="mt-10 pt-8 border-t border-[var(--border-color)]">
          <h3 className="text-sm font-bold text-[var(--text-primary)] mb-4">📖 更多文化文章</h3>
          <div className="grid grid-cols-2 gap-3">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/korea/culture/${a.slug}`}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 hover:border-[var(--pink-pale)] transition-colors"
              >
                <div className="text-xs font-medium text-[var(--text-primary)] line-clamp-1">{a.title}</div>
                <div className="text-[11px] text-[var(--text-muted)] mt-0.5 line-clamp-1">{a.subtitle}</div>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
