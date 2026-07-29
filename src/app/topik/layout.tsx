import type { Metadata } from 'next';
import { SITE_URL, hubMetadata } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';
import Link from 'next/link';
import { topikQuestionTypes } from '@/data/topikQuestionTypes';

const metadataZh: Metadata = {
  title: 'TOPIK 备考 · 真题模拟题在线训练',
  description: 'TOPIK 韩国语能力考试备考：听力、阅读、写作题库，覆盖TOPIK I/II 各级，配详细解析与错题回顾。',
  alternates: { canonical: '/topik' },
  openGraph: {
    title: 'TOPIK 备考 · 真题模拟题在线训练',
    description: 'TOPIK 韩国语能力考试备考：听力/阅读/写作题库，覆盖TOPIK I/II 各级',
    url: `${SITE_URL}/topik`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: 'TOPIK 备考 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return lang === 'en' ? (hubMetadata('/topik', 'en') ?? metadataZh) : metadataZh;
}

// /en rewrite 复用 /grammar 等裸路径的渲染缓存，若被 prerender 会固化成构建时语言(zh)。
// 强制每请求执行 generateMetadata 读取 proxy 注入的 x-tori-lang，保证 /en 出英文 metadata。
export const dynamic = 'force-dynamic';



function SeoShell() {
  return (
    <nav className="sr-only" aria-hidden="true">
      <h2>TOPIK 题型全览 · 全部 {topikQuestionTypes.length} 种题型</h2>
      <ul>
        {topikQuestionTypes.map((t) => (
          <li key={t.key}>
            <Link href={`/topik/type/${t.key}`}>
              {t.labelZh}（{t.labelKo}）· TOPIK {t.level === 'beginner' ? 'I' : 'II'} · {t.section === 'listening' ? '听力' : '阅读'} · {t.officialNo}
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
