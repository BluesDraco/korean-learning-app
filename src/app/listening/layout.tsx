import type { Metadata } from 'next';
import { practiceHubJsonLd, SITE_URL, hubMetadata } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

const metadataZh: Metadata = {
  title: '韩语听力训练 · 分级听力练习',
  description: '韩语听力训练：分级音频、场景对话、逐句精听与整段泛听，配文本对照，全面提升韩语听力理解。',
  alternates: { canonical: '/listening' },
  openGraph: {
    title: '韩语听力训练 · 分级听力练习',
    description: '分级音频、场景对话、逐句精听与整段泛听，全面提升韩语听力',
    url: `${SITE_URL}/listening`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语听力训练 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return lang === 'en' ? (hubMetadata('/listening', 'en') ?? metadataZh) : metadataZh;
}

// /en rewrite 复用 /grammar 等裸路径的渲染缓存，若被 prerender 会固化成构建时语言(zh)。
// 强制每请求执行 generateMetadata 读取 proxy 注入的 x-tori-lang，保证 /en 出英文 metadata。
export const dynamic = 'force-dynamic';


const JSON_LD = practiceHubJsonLd({
  slug: 'listening',
  name: '韩语听力训练',
  description: '分级音频、场景对话、逐句精听与整段泛听，配文本对照',
  crumbLabel: '韩语听力训练',
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      {children}
    </>
  );
}
