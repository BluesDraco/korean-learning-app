import type { Metadata } from 'next';
import { bilingualOg, practiceHubJsonLd, SITE_URL } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

const metadataZh: Metadata = {
  title: '韩语听写练习 · 强化拼写与听辨',
  description: '韩语听写训练：从单词到句子，配真人发音，实时纠错，一次性练拼写、听力、语法三项。',
  alternates: { canonical: '/dictation' },
  openGraph: {
    title: '韩语听写练习 · 强化拼写与听辨',
    description: '单词到句子听写训练，配真人发音+实时纠错',
    url: `${SITE_URL}/dictation`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语听写练习 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return bilingualOg(metadataZh, lang);
}

export const dynamic = 'force-dynamic';

const JSON_LD = practiceHubJsonLd({
  slug: 'dictation',
  name: '韩语听写练习',
  description: '单词到句子听写训练，配真人发音与实时纠错',
  crumbLabel: '韩语听写练习',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      {children}
    </>
  );
}
