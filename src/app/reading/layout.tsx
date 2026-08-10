import type { Metadata } from 'next';
import { SITE_URL, hubMetadata } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';
import Link from 'next/link';
import { readingArticles } from '@/data/reading-new';

const metadataZh: Metadata = {
  title: '韩语分级阅读 · A1到C2韩语文章',
  description: '韩语分级阅读：从A1入门到C2高阶共40+篇原创文章，配单词注解、语法讲解、听力音频，全面提升韩语阅读理解。',
  alternates: { canonical: '/reading' },
  openGraph: {
    title: '韩语分级阅读 · A1到C2韩语文章',
    description: '韩语分级阅读：A1到C2共40+篇文章，配注解、语法讲解和听力音频',
    url: `${SITE_URL}/reading`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语分级阅读 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return lang === 'en' ? (hubMetadata('/reading', 'en') ?? metadataZh) : metadataZh;
}

// /en rewrite 复用 /grammar 等裸路径的渲染缓存，若被 prerender 会固化成构建时语言(zh)。
// 强制每请求执行 generateMetadata 读取 proxy 注入的 x-tori-lang，保证 /en 出英文 metadata。
export const dynamic = 'force-dynamic';



// SEO shell：服务端渲染的文章索引，供爬虫发现全部 40 篇详情页。视觉隐藏。
function SeoShell() {
  return (
    <nav className="sr-only" aria-hidden="true">
      <h2>韩语分级阅读文章目录</h2>
      <ul>
        {readingArticles.filter((a) => !a.hidden && a.topic !== '금서').map((a) => (
          <li key={a.id}>
            <Link href={`/reading/${a.id}`}>
              {a.title}（{a.titleKo}）· 韩语 {a.level} 级 · {a.topic}
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
