import type { Metadata } from 'next';
import { bilingualOg, SITE_URL } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

const metadataZh: Metadata = {
  title: '韩语学习中心 · 课程与训练入口',
  description: '兔莉的韩语学习中心：40音、语法、词汇、听说读写各板块入口，快速定位当前学习目标。',
  alternates: { canonical: '/learning' },
  openGraph: {
    title: '韩语学习中心 · 课程与训练入口',
    description: '40音、语法、词汇、听说读写各板块入口，快速定位学习目标',
    url: `${SITE_URL}/learning`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语学习中心 · 兔莉的韩语日记' }],
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
