import { notFound } from 'next/navigation';
import { getArticleHtml, getArticleMeta, getArticlesByCategory } from '@/lib/koreaArticles';
import { getArticleLearning } from '@/data/articleLearning';
import Link from 'next/link';
import ArticleContent from '@/components/ArticleContent';
import ArticleLearningModules from '@/components/ArticleLearningModules';

export function generateStaticParams() {
  return getArticlesByCategory('culture').map((a) => ({ slug: a.slug }));
}

export default async function CultureArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const meta = getArticleMeta(slug);
  if (!meta || meta.category !== 'culture') notFound();

  const html = getArticleHtml(slug);
  if (!html) notFound();

  const learning = getArticleLearning(slug);
  const relatedArticles = getArticlesByCategory('culture').filter((a) => a.slug !== slug);

  return (
    <div className="py-4 mx-auto">
      <div className="flex items-center gap-1.5 text-sm text-[var(--text-muted)] mb-6">
        <Link href="/korea/culture" className="hover:text-[var(--text-primary)] transition-colors">🇰🇷 韩国文化</Link>
        <span className="text-[var(--text-placeholder)]">›</span>
        <span className="text-[var(--text-secondary)]">{meta?.title}</span>
      </div>

      <ArticleContent html={html} basePath="/korea/culture" />

      {learning && <ArticleLearningModules data={learning} />}

      {relatedArticles.length > 0 && (
        <div className="mt-10 pt-8 border-t border-[var(--border-color)]">
          <h3 className="text-base font-bold text-[var(--text-primary)] mb-4">📖 更多文化文章</h3>
          <div className="grid grid-cols-2 gap-3">
            {relatedArticles.map((a) => (
              <Link
                key={a.slug}
                href={`/korea/culture/${a.slug}`}
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
