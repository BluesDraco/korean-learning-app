import type { Metadata } from 'next';
import { bilingualOg, SITE_URL } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';
import RadioHomeClient from './RadioHomeClient';

const metadataZh: Metadata = {
  title: '동물 도시 라디오 · 动物城电台',
  description: '动物城电台：兔莉的早安问候、动物城新闻、熊的睡前故事，实时字幕边听边学韩语。',
  alternates: { canonical: '/radio' },
  openGraph: {
    title: '동물 도시 라디오 · 动物城电台',
    description: '兔莉的早安问候、动物城新闻、熊的睡前故事，实时字幕边听边学韩语',
    url: `${SITE_URL}/radio`,
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

export default function RadioHomePage() {
  return <RadioHomeClient />;
}
