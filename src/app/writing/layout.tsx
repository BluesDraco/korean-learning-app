import type { Metadata } from 'next';
import { bilingualOg, practiceHubJsonLd, SITE_URL } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

const metadataZh: Metadata = {
  title: '韩语写作练习 · 从造句到短文',
  description: '韩语写作训练：分级题目从造句到短文，配范文对照与语法讲解，逐步提升韩语书面表达能力。',
  alternates: { canonical: '/writing' },
  openGraph: {
    title: '韩语写作练习 · 从造句到短文',
    description: '分级写作题目从造句到短文，配范文对照与语法讲解',
    url: `${SITE_URL}/writing`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语写作练习 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return bilingualOg(metadataZh, lang);
}

export const dynamic = 'force-dynamic';

const JSON_LD = practiceHubJsonLd({
  slug: 'writing',
  name: '韩语写作练习',
  description: '分级写作题目从造句到短文，配范文对照与语法讲解',
  crumbLabel: '韩语写作练习',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      {children}
    </>
  );
}
