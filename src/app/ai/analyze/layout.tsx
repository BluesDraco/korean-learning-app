import type { Metadata } from 'next';
import { bilingualOg, SITE_URL } from '@/lib/seo';
import Link from 'next/link';
import { getServerLang } from '@/lib/server/lang';
import { t } from '@/lib/i18n';

const metadataZh: Metadata = {
  title: 'AI 韩语句子拆解｜逐词分析·语法·罗马音·翻译',
  description:
    '免费在线韩语句子分析工具，粘贴任意韩文句子（或中文），AI 自动拆解词汇、助词、语法点、罗马音与翻译，并给出学习建议。支持 K-pop 歌词、韩剧台词、TOPIK 阅读练习。',
  keywords: [
    'AI 韩语拆解',
    '韩语句子分析',
    '韩文翻译',
    '韩语语法分析',
    '韩语学习工具',
    'K-pop 歌词拆解',
    '韩剧台词翻译',
    'TOPIK 阅读',
  ],
  alternates: { canonical: '/ai/analyze' },
  openGraph: {
    title: 'AI 韩语句子拆解｜逐词分析·语法·罗马音',
    description: '免费在线韩语句子分析工具，粘贴韩文即得逐词拆解 + 语法讲解 + 翻译。',
    url: `${SITE_URL}/ai/analyze`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: 'AI 韩语句子拆解' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI 韩语句子拆解｜逐词分析·语法·罗马音',
    description: '粘贴韩文即得逐词拆解 + 语法讲解 + 翻译。',
    images: ['/tori-og-v2.webp'],
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
      '@type': 'SoftwareApplication',
      name: 'AI 韩语句子拆解',
      description:
        '粘贴任意韩语句子，AI 自动拆解词汇、语法、助词、罗马音与翻译。支持 K-pop 歌词、韩剧台词、TOPIK 阅读、日常对话。',
      url: `${SITE_URL}/ai/analyze`,
      applicationCategory: 'EducationalApplication',
      operatingSystem: 'Web',
      inLanguage: 'zh-CN',
      isAccessibleForFree: true,
      offers: { '@type': 'Offer', price: '0', priceCurrency: 'CNY' },
      publisher: { '@id': `${SITE_URL}/#org` },
    },
    {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: '首页', item: `${SITE_URL}` },
        { '@type': 'ListItem', position: 2, name: '免费韩语工具', item: `${SITE_URL}/tools` },
        { '@type': 'ListItem', position: 3, name: 'AI 韩语句子拆解', item: `${SITE_URL}/ai/analyze` },
      ],
    },
  ],
};

export default async function Layout({ children }: { children: React.ReactNode }) {
  const lang = await getServerLang();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }}
      />
      <div className="sr-only" aria-hidden="true">
        <nav aria-label={t('a11y.breadcrumb', lang)}>
          <Link href="/">首页</Link> › <Link href="/tools">免费韩语工具</Link> › <span>AI 韩语句子拆解</span>
        </nav>
        <h1>AI 韩语句子拆解｜逐词分析、语法讲解、罗马音、翻译</h1>
        <p>
          兔莉 AI 韩语拆解工具，粘贴任意韩语句子（或中文），几秒钟内拿到：
          全句翻译、逐词释义（含罗马音、词性、例句）、助词说明、语法点讲解、句子结构图。
          支持 K-pop 歌词、韩剧台词、TOPIK 真题、日常对话四大高频场景。
        </p>
        <h2>使用场景</h2>
        <ul>
          <li>看韩剧遇到不认识的台词，粘进来看整句怎么拆。</li>
          <li>K-pop 歌词逐句学：BTS、NewJeans、IVE、aespa 歌词都能拆。</li>
          <li>TOPIK 阅读长句啃不动：结构图 + 词汇 + 语法一次给齐。</li>
          <li>写韩语作文：中文粘进来，看有几种韩语说法，配语境提示。</li>
          <li>日常聊天：一句敬语/半语搞不清语气，让 AI 说人话。</li>
        </ul>
        <h2>拆解能包含什么</h2>
        <ul>
          <li>全句翻译（含直译对照，明白每个成分怎么来的）</li>
          <li>逐词释义：韩文、罗马音、词性、常见搭配、例句</li>
          <li>助词说明：은/는、이/가、을/를、에/에서 等的语义与位置</li>
          <li>语法点讲解：句型模式、变形规则、易错点、级别标签（TOPIK I / II）</li>
          <li>句子结构：主语/谓语/宾语/修饰的角色标注</li>
          <li>深度模式：话题·语气·场景 + 难度理由 + 文化注解 + 小测验</li>
        </ul>
        <h2>与其它工具的关系</h2>
        <p>
          本工具是 <Link href="/tools">兔莉韩语工具箱</Link> 的一部分，与
          <Link href="/tools/romanization">韩语罗马音互转</Link>、
          <Link href="/tools/keyboard">在线韩语键盘</Link>、
          <Link href="/tools/korean-name">韩语名字生成器</Link>、
          <Link href="/phonetics">韩语40音教程</Link> 组成完整的免费韩语学习矩阵。
        </p>
      </div>
      {children}
    </>
  );
}
