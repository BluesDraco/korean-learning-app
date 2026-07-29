import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { knowledgeArticles, getKnowledgeArticle } from '@/data/reading-knowledge';
import { getArticleLearning } from '@/data/articleLearning';
import { readingArticles } from '@/data/reading-new';
import KnowledgeReaderClient from './KnowledgeReaderClient';
import type { SidebarArticle } from '../../_components/LibrarySidebar';
import { SITE_URL } from '@/lib/seo';

// 侧栏只需这几个字段。在 server 侧摘取，避免 27k 行文章全库进 client bundle。
const sidebarArticles: SidebarArticle[] = readingArticles.map((a) => ({
  id: a.id, title: a.title, level: a.level, topic: a.topic, hidden: a.hidden,
}));

export function generateStaticParams() {
  return knowledgeArticles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const a = getKnowledgeArticle(slug);
  if (!a) return {};
  const desc = a.subtitle.replace(/^[^—]*—\s*/, '');
  return {
    title: `${a.title} · 韩国小知识 · 兔莉的韩语日记`,
    description: desc,
    alternates: { canonical: `/reading/knowledge/${a.slug}` },
    openGraph: {
      title: `${a.title} · 韩国小知识`,
      description: desc,
      url: `${SITE_URL}/reading/knowledge/${a.slug}`,
      type: 'article',
      locale: 'zh_CN',
      siteName: '兔莉的韩语日记',
      images: [{ url: `${SITE_URL}${a.bannerImage}`, width: 1200, height: 630, alt: a.title }],
    },
  };
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getKnowledgeArticle(slug);
  if (!article) notFound();

  const learning = getArticleLearning(slug);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: article.title,
    inLanguage: 'zh-CN',
    author: { '@type': 'Organization', name: '兔莉的韩语日记' },
    image: `${SITE_URL}${article.bannerImage}`,
    url: `${SITE_URL}/reading/knowledge/${article.slug}`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {/* SEO shell：供爬虫索引的静态摘要，视觉隐藏 */}
      <div className="sr-only" aria-hidden="true">
        <h1>{article.title}</h1>
        <p>{article.subtitle}</p>
      </div>
      <KnowledgeReaderClient key={article.slug} article={article} learning={learning} sidebarArticles={sidebarArticles} />
    </>
  );
}
