import type { Metadata } from 'next';
import { bilingualOg, SITE_URL } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

// 覆盖父层 /learn 的 noindex：绘本列表是公开学习内容，允许爬虫索引
const metadataZh: Metadata = {
  title: '韩语绘本馆｜可爱插画 + 分级韩文故事',
  description: '兔莉韩语绘本馆：分级韩文绘本故事，配可爱插画与逐句朗读跟读。零基础可以看图学韩语，点词查词，句型自然习得。',
  alternates: { canonical: '/learn/picture-books' },
  robots: { index: true, follow: true },
  openGraph: {
    title: '韩语绘本馆｜可爱插画 + 分级韩文故事',
    description: '分级韩文绘本故事，配插画与逐句朗读跟读，点词查词，零基础看图学韩语',
    url: `${SITE_URL}/learn/picture-books`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语绘本馆 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return bilingualOg(metadataZh, lang);
}

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
