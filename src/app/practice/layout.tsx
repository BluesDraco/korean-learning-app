import type { Metadata } from 'next';
import { bilingualOg, SITE_URL } from '@/lib/seo';
import Link from 'next/link';
import { sceneLocations } from '@/data/sceneLocations';
import { ErrorBoundary } from '@/components/ErrorBoundary';
import { getServerLang } from '@/lib/server/lang';

const metadataZh: Metadata = {
  title: '韩语场景练习｜35 个真实场景 · AI 对话 · 免费在线',
  description:
    '兔莉动物城韩语场景练习：机场、便利店、咖啡馆、宿舍、地铁、烤肉店、医院、市场等 35 个真实生活场景，每个场景配核心词汇 + 常用表达 + AI 语音对话陪练。',
  alternates: { canonical: '/practice' },
  openGraph: {
    title: '韩语场景练习｜35 个真实场景 · AI 对话',
    description: '机场、便利店、咖啡馆、宿舍、地铁、烤肉店、医院……35 个真实生活场景配 AI 语音陪练。',
    url: `${SITE_URL}/practice`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '兔莉动物城韩语场景练习' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '韩语场景练习｜35 个真实场景 · AI 对话',
    description: '机场、便利店、咖啡馆、宿舍……35 个真实生活场景配 AI 语音陪练。',
    images: ['/tori-og-v2.webp'],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return bilingualOg(metadataZh, lang);
}

export const dynamic = 'force-dynamic';

const DISTRICT_LABEL: Record<string, string> = {
  transit: '交通枢纽',
  life: '生活日常',
  campus: '校园',
  service: '服务民生',
  culture: '文化娱乐',
  predator: '猎食者区',
  city: '街市',
  shadow: '暗巷',
};

const JSON_LD = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'LearningResource',
      name: '兔莉动物城韩语场景练习',
      description: '35 个真实生活场景（机场、便利店、咖啡馆、宿舍、烤肉店等），每个场景配核心词汇、常用表达与 AI 语音对话。',
      url: `${SITE_URL}/practice`,
      inLanguage: 'zh-CN',
      teaches: 'Korean language conversation practice',
      learningResourceType: 'Interactive Resource',
      educationalLevel: 'Beginner to Intermediate',
      isAccessibleForFree: true,
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${SITE_URL}` },
        { '@type': 'ListItem', position: 2, name: '韩语场景练习', item: `${SITE_URL}/practice` },
      ],
    },
  ],
};

function SeoShell() {
  const byDistrict = new Map<string, typeof sceneLocations>();
  for (const s of sceneLocations) {
    const list = byDistrict.get(s.districtId) ?? [];
    list.push(s);
    byDistrict.set(s.districtId, list);
  }

  return (
    <nav className="sr-only" aria-hidden="true">
      <h1>兔莉动物城韩语场景练习｜35 个真实场景 · AI 语音对话</h1>
      <p>
        走进兔莉动物城，用韩语点咖啡、办手机卡、看病、买烤肉、和店员讲价——
        {sceneLocations.length} 个真实场景配核心词汇、常用表达与 AI 语音陪练，
        零基础也能开口说韩语。
      </p>
      {Array.from(byDistrict.entries()).map(([district, scenes]) => (
        <section key={district}>
          <h2>{DISTRICT_LABEL[district] ?? district} · {scenes.length} 个场景</h2>
          <ul>
            {scenes.map((s) => (
              <li key={s.slug}>
                <Link href={`/practice/${s.slug}`}>
                  {s.cn} · {s.ko} — {s.desc}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </nav>
  );
}

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <SeoShell />
      <ErrorBoundary>{children}</ErrorBoundary>
    </>
  );
}
