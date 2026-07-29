import type { Metadata } from 'next';
import { SITE_URL, hubMetadata } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

const metadataZh: Metadata = {
  title: '韩语日记跟读 · 场景化每日学习',
  description: '兔莉的韩语日记：30天场景化跟读，从见面、点餐、坐地铁到旅行、职场，每天一篇日记学会实用韩语表达。',
  alternates: { canonical: '/diary' },
  openGraph: {
    title: '韩语日记跟读 · 场景化每日学习',
    description: '30天场景化跟读，每天一篇日记学会实用韩语表达',
    url: `${SITE_URL}/diary`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语日记跟读 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return lang === 'en' ? (hubMetadata('/diary', 'en') ?? metadataZh) : metadataZh;
}

// /en rewrite 复用 /grammar 等裸路径的渲染缓存，若被 prerender 会固化成构建时语言(zh)。
// 强制每请求执行 generateMetadata 读取 proxy 注入的 x-tori-lang，保证 /en 出英文 metadata。
export const dynamic = 'force-dynamic';


export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
