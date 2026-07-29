import type { Metadata } from 'next';
import { bilingualOg, SITE_URL } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

export const revalidate = 120;

const metadataZh: Metadata = {
  title: '韩国专题｜文化 · 美食 · 旅行 · 影视',
  description: '一站式看懂韩国：韩国文化、美食、旅行、K-Drama 韩剧。每个专题配学韩语所需的场景表达。',
  alternates: { canonical: '/korea' },
  openGraph: {
    title: '韩国专题｜文化 · 美食 · 旅行 · 影视',
    description: '一站式看懂韩国：文化、美食、旅行、K-Drama 韩剧，配韩语场景表达',
    url: `${SITE_URL}/korea`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩国专题 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return bilingualOg(metadataZh, lang);
}

export const dynamic = 'force-dynamic';

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'CollectionPage',
      name: '韩国专题',
      description: '韩国文化 / 美食 / 旅行 / 影视一站式聚合入口',
      url: `${SITE_URL}/korea`,
      inLanguage: 'zh-CN',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      publisher: { '@id': `${SITE_URL}/#org` },
      about: ['韩剧'],
      mainEntity: {
        '@type': 'ItemList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '韩剧', url: `${SITE_URL}/korea/drama` },
        ],
      },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${SITE_URL}` },
        { '@type': 'ListItem', position: 2, name: '韩国专题', item: `${SITE_URL}/korea` },
      ],
    },
  ],
};

// 让爬虫一跳能索引到全部子专题详情（韩国小知识已迁入 /reading/knowledge，旧计数保留）
const ARTICLE_COUNT = { culture: 5, food: 5, travel: 5 };

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      {/* SeoShell 视觉隐藏 · 每子专题走各自 layout 已含详情索引，这里保留 hub 摘要 */}
      <div className="sr-only" aria-hidden="true">
        <h2>韩国专题 · 4 大板块</h2>
        <ul>
          <li>韩国文化 · {ARTICLE_COUNT.culture} 篇</li>
          <li>韩国美食 · {ARTICLE_COUNT.food} 篇</li>
          <li>韩国旅行 · {ARTICLE_COUNT.travel} 篇</li>
          <li>韩剧专题</li>
        </ul>
      </div>
      {children}
    </>
  );
}
