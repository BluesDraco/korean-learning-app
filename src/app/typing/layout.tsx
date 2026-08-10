import type { Metadata } from 'next';
import { bilingualOg, practiceHubJsonLd, SITE_URL } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

const metadataZh: Metadata = {
  title: '韩语打字练习 · 韩文键位与输入训练',
  description: '韩语打字练习：从两只手键位入门，到单词、句子、段落训练，配置实时纠错，快速掌握韩文输入法。',
  alternates: { canonical: '/typing' },
  openGraph: {
    title: '韩语打字练习 · 韩文键位与输入训练',
    description: '韩语键位入门 + 单词/句子/段落练习，快速掌握韩文输入法',
    url: `${SITE_URL}/typing`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语打字练习 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return bilingualOg(metadataZh, lang);
}

export const dynamic = 'force-dynamic';

const JSON_LD = practiceHubJsonLd({
  slug: 'typing',
  name: '韩语打字练习',
  description: '韩语键位入门 + 单词/句子/段落练习，快速掌握韩文输入法',
  crumbLabel: '韩语打字练习',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      {children}
    </>
  );
}
