import type { Metadata } from 'next';
import { SITE_URL, hubMetadata } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';
import Link from 'next/link';
import { themePacks, levelWordLists } from '@/data/vocabulary/vocab-data';

const metadataZh: Metadata = {
  title: '韩语单词学习 · 主题词包与分级词库',
  description: '韩语单词学习：TOPIK 分级词库、主题词包（日常/职场/旅行）、教材配套词单，闪卡+间隔重复科学记忆。',
  alternates: { canonical: '/vocabulary' },
  openGraph: {
    title: '韩语单词学习 · 主题词包与分级词库',
    description: 'TOPIK 分级词库 + 主题词包 + 教材配套词单，闪卡+间隔重复记忆',
    url: `${SITE_URL}/vocabulary`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语单词学习 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return lang === 'en' ? (hubMetadata('/vocabulary', 'en') ?? metadataZh) : metadataZh;
}

// /en rewrite 复用 /grammar 等裸路径的渲染缓存，若被 prerender 会固化成构建时语言(zh)。
// 强制每请求执行 generateMetadata 读取 proxy 注入的 x-tori-lang，保证 /en 出英文 metadata。
export const dynamic = 'force-dynamic';



function SeoShell() {
  return (
    <nav className="sr-only" aria-hidden="true">
      <h2>韩语主题词包 · 全部 {themePacks.length} 个场景</h2>
      <ul>
        {themePacks.map((t) => (
          <li key={t.id}>
            <Link href={`/vocabulary/themes/${t.id}`}>
              {t.name} · {t.category} · {t.wordIds.length}词
            </Link>
          </li>
        ))}
      </ul>
      <h2>TOPIK 分级词表 · {levelWordLists.length} 级</h2>
      <ul>
        {levelWordLists.map((l) => (
          <li key={l.level}>
            <Link href={`/vocabulary/levels/${l.level}`}>
              TOPIK {l.level}级词汇表 · 核心 {l.totalCount} 词
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <SeoShell />
      {children}
    </>
  );
}
