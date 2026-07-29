import type { Metadata } from 'next';
import { bilingualOg } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

export const revalidate = 120;

// /learn 目前仅承载 /learn/picture-books；父层不做爬虫入口（noindex），子路径独立索引
const metadataZh: Metadata = {
  title: '兔莉学习入口',
  description: '兔莉韩语绘本与延伸学习内容入口。',
  alternates: { canonical: '/learn' },
  robots: { index: false, follow: true },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return bilingualOg(metadataZh, lang);
}

export const dynamic = 'force-dynamic';

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
