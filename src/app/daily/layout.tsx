import type { Metadata } from 'next';
import { SITE_URL, hubMetadata } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';
import Link from 'next/link';
import { grammarPoints } from '@/data/grammar';

const metadataZh: Metadata = {
  title: '韩语语法系统课 · 从基础到进阶',
  description: '韩语语法课程：初级到高级完整体系，每课包含语法规则、例句、易错点和练习，循序渐进掌握韩语表达。',
  alternates: { canonical: '/grammar' },
  openGraph: {
    title: '韩语语法系统课 · 从基础到进阶',
    description: '韩语语法完整课程：规则+例句+易错点+练习，循序渐进掌握韩语表达',
    url: `${SITE_URL}/grammar`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语语法系统课 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return lang === 'en' ? (hubMetadata('/grammar', 'en') ?? metadataZh) : metadataZh;
}

// /en rewrite 复用 /grammar 等裸路径的渲染缓存，若被 prerender 会固化成构建时语言(zh)。
// 强制每请求执行 generateMetadata 读取 proxy 注入的 x-tori-lang，保证 /en 出英文 metadata。
export const dynamic = 'force-dynamic';



function SeoShell() {
  return (
    <nav className="sr-only" aria-hidden="true">
      <h1>韩语语法系统课 · 从基础到进阶</h1>
      <h2>韩语语法库 · 全部 {grammarPoints.length} 个语法点</h2>
      <ul>
        {grammarPoints.map((gp) => (
          <li key={gp.id}>
            <Link href={`/grammar/library/${gp.id}`}>
              {gp.title}（{gp.pattern}）· {gp.topik} · {gp.usage}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}

const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '如何系统学习韩语语法',
  description: '零基础到 TOPIK 高级的韩语语法学习方法：先助词，再语尾，最后句型。',
  totalTime: 'P90D',
  inLanguage: 'zh-CN',
  image: `${SITE_URL}/tori-og-v2.webp`,
  supply: [
    { '@type': 'HowToSupply', name: '语法规则卡片' },
    { '@type': 'HowToSupply', name: '例句 + 中韩对照' },
    { '@type': 'HowToSupply', name: '易错点提示' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '打通核心助词',
      text: '先掌握主格助词 이/가、话题助词 은/는、宾格助词 을/를、时间地点助词 에/에서、共同助词 하고/와/과。这 5 组决定句子基本骨架，是判断韩语语感的第一道门槛。',
      url: `${SITE_URL}/grammar?part=p1`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '掌握基本语尾变化',
      text: '学格式体（-ㅂ니다/습니다）和非格式体（-아요/어요）两大终结语尾，配合时态变化（过去 -았/었, 未来 -겠/-을 거예요）。这一步过了就能写出正确的完整句。',
      url: `${SITE_URL}/grammar?part=p2`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '扩展常用句型和连接语尾',
      text: '进入 -고, -지만, -아서/어서, -(으)면 等连接语尾，学 -고 싶다, -아/어 주다, -(으)ㄹ 수 있다 等高频句型。到这一步能写出复合长句，TOPIK II 也基本能应对。',
      url: `${SITE_URL}/grammar?part=p3`,
    },
  ],
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToJsonLd) }}
      />
      <SeoShell />
      {children}
    </>
  );
}
