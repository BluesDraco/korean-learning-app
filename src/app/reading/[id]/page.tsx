import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readingArticles } from '@/data/reading-new';
import { readingArticleMetadata, readingArticleJsonLd } from '@/lib/seo';
import ArticleReaderClient from './ArticleReaderClient';

export function generateStaticParams() {
  return readingArticles.map((a) => ({ id: a.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = readingArticles.find((a) => a.id === id);
  if (!article) return {};
  return readingArticleMetadata(article);
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = readingArticles.find((a) => a.id === id);
  if (!article) notFound();

  const jsonLd = readingArticleJsonLd(article);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* SEO shell: 供爬虫索引的静态摘要，视觉隐藏 */}
      <div className="sr-only" aria-hidden="true">
        <h1>{article.title} · {article.titleKo}</h1>
        <p>韩语 {article.level} 级 · {article.topic} · 约 {article.estimatedMinutes} 分钟</p>
        <h2>学习目标</h2>
        <ul>
          {article.learningGoals.map((g, i) => <li key={i}>{g}</li>)}
        </ul>
        {article.coreWords.length > 0 && (
          <>
            <h2>核心词汇</h2>
            <ul>
              {article.coreWords.map((w) => (
                <li key={w.word}>{w.word} — {w.meaning}</li>
              ))}
            </ul>
          </>
        )}
        {article.sentences.length > 0 && (
          <>
            <h2>文章正文（摘录）</h2>
            {article.sentences.slice(0, 6).map((s) => (
              <p key={s.id}>{s.ko}｜{s.zh}</p>
            ))}
          </>
        )}
      </div>
      <ArticleReaderClient key={article.id} article={article} />
    </>
  );
}
