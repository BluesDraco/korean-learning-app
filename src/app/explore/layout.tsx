import type { Metadata } from 'next';
import { bilingualOg, SITE_URL } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

const metadataZh: Metadata = {
  title: '韩语学习探索 · 主题内容与场景',
  description: '按主题探索韩语学习内容：日常场景、旅行、职场、文化，找到适合当下的学习入口。',
  alternates: { canonical: '/explore' },
  openGraph: {
    title: '韩语学习探索 · 主题内容与场景',
    description: '按主题探索韩语学习内容：日常场景、旅行、职场、文化',
    url: `${SITE_URL}/explore`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语学习探索 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return bilingualOg(metadataZh, lang);
}

export const dynamic = 'force-dynamic';

export const revalidate = 300;

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
