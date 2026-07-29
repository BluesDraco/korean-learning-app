import type { Metadata } from 'next';
import { bilingualOg, SITE_URL } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';
import InterviewListClient from './InterviewListClient';

const metadataZh: Metadata = {
  title: '여우의 인터뷰 카페 · 狐狸的访谈咖啡馆',
  description: '深夜访谈电台：留学、职场、社会、文化，真实的韩国故事，实时字幕边听边学高级韩语。',
  alternates: { canonical: '/radio/interview' },
  openGraph: {
    title: '여우의 인터뷰 카페 · 狐狸的访谈咖啡馆',
    description: '深夜访谈电台，真实的韩国故事，实时字幕边听边学高级韩语',
    url: `${SITE_URL}/radio/interview`,
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

export default function InterviewListPage() {
  return <InterviewListClient />;
}
