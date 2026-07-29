import type { Metadata } from 'next';
import { bilingualOg, SITE_URL } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';
import BlogListClient from './BlogListClient';

const metadataZh: Metadata = {
  title: '兔莉的博客 · 首尔日记 · 文化 · 俗语',
  description: '兔莉的韩语博客：首尔日记、文化笔记、韩语俗语，边读边点词学韩语。',
  alternates: { canonical: '/blog' },
  openGraph: {
    title: '兔莉的博客 · 首尔日记 · 文化 · 俗语',
    description: '首尔日记、文化笔记、韩语俗语，边读边点词学韩语',
    url: `${SITE_URL}/blog`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return bilingualOg(metadataZh, lang);
}

export const dynamic = 'force-dynamic';

export default function BlogListPage() {
  return <BlogListClient />;
}
