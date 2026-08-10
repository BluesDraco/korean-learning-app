import type { Metadata } from 'next';
import { bilingualOg, practiceHubJsonLd, SITE_URL } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

const metadataZh: Metadata = {
  title: '韩语复习闪卡 · 间隔重复记忆',
  description: '韩语复习：基于遗忘曲线的闪卡系统，每日推送到期词汇与错题，让韩语记忆更牢固。',
  alternates: { canonical: '/review' },
  openGraph: {
    title: '韩语复习闪卡 · 间隔重复记忆',
    description: '基于遗忘曲线的闪卡系统，每日推送到期词汇与错题',
    url: `${SITE_URL}/review`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语复习闪卡 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return bilingualOg(metadataZh, lang);
}

export const dynamic = 'force-dynamic';

const JSON_LD = practiceHubJsonLd({
  slug: 'review',
  name: '韩语复习闪卡',
  description: '基于遗忘曲线的闪卡系统，每日推送到期词汇与错题',
  crumbLabel: '韩语复习闪卡',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      {children}
    </>
  );
}
