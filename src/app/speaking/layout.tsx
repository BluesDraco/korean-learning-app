import type { Metadata } from 'next';
import { practiceHubJsonLd, SITE_URL, hubMetadata } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

const metadataZh: Metadata = {
  title: '韩语口语练习 · 开口说韩语',
  description: '韩语口语练习：看中文说韩语、跟读复述、段落复述，AI 打分并给出更自然的说法，全平台可用，练出开口能力。',
  alternates: { canonical: '/speaking' },
  openGraph: {
    title: '韩语口语练习 · 开口说韩语',
    description: '看中文说韩语、跟读复述、段落复述，AI 打分与纠正，练出开口能力',
    url: `${SITE_URL}/speaking`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语口语练习 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return lang === 'en' ? (hubMetadata('/speaking', 'en') ?? metadataZh) : metadataZh;
}

// /en rewrite 复用 /grammar 等裸路径的渲染缓存，若被 prerender 会固化成构建时语言(zh)。
// 强制每请求执行 generateMetadata 读取 proxy 注入的 x-tori-lang，保证 /en 出英文 metadata。
export const dynamic = 'force-dynamic';


const JSON_LD = practiceHubJsonLd({
  slug: 'speaking',
  name: '韩语口语练习',
  description: '看中文说韩语、跟读复述、段落复述，AI 打分与纠正',
  crumbLabel: '韩语口语练习',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      {children}
    </>
  );
}
