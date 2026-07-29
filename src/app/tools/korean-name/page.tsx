import type { Metadata } from 'next';
import Link from 'next/link';
import { toolMetadata, toolJsonLd } from '@/lib/seo';
import { SURNAMES, NAMES } from '@/data/tools/korean-names';
import { getServerLang } from '@/lib/server/lang';
import { t } from '@/lib/i18n';
import KoreanNameClient from './KoreanNameClient';

const TOOL = {
  slug: 'korean-name',
  name: '韩语名字生成器',
  tagline: '起个有寓意的韩文名',
  description:
    '免费在线韩语名字生成器，从 100+ 名字库中挑选。所有名字标注来源（韩国常见现代名 / AI 创作名）与含义，让用户知道"为什么取这个"。支持按性别、风格筛选，可用于韩语昵称、K-pop 应援、留学韩国、追星 idol 起名。',
  nameEn: 'Korean Name Generator',
  taglineEn: 'Find a meaningful Korean name',
  descriptionEn:
    'Free online Korean name generator: pick from 100+ names with meanings, romanization, and origin labels. Filter by gender and style. Great for Korean nicknames, K-pop fan accounts, studying abroad in Korea, or character naming.',
  keywords: [
    '韩语名字生成器',
    '韩国名字',
    '韩文起名',
    '韩语昵称',
    'Korean name generator',
    '韩国常见名字',
    'K-pop 应援名',
    '韩国姓氏 Top 20',
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return toolMetadata(TOOL, lang);
}

// 提取 20 个高频名做 SEO 静态列举
const TOP_NAMES = NAMES.slice(0, 30);

export default async function Page() {
  const lang = await getServerLang();
  const jsonLd = toolJsonLd(TOOL, lang);
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="sr-only" aria-hidden="true">
        <nav aria-label={t('a11y.breadcrumb', lang)}>
          <Link href="/">首页</Link> ›{' '}
          <Link href="/tools">免费韩语工具</Link> ›{' '}
          <span>韩语名字生成器</span>
        </nav>
        <h1>韩语名字生成器 · 有寓意的韩文名（100+ 名字库）</h1>
        <p>
          免费在线韩语名字生成器。所有名字标注来源分类：韩国常见现代名（源自韩国大法院历年新生儿姓名 Top 榜）、
          AI 创作名（采用真实韩国名字常用字组合，寓意美好发音自然，明确标注为 AI 创作）。
          每个名字附汉字、罗马音、含义、来源说明——让用户知道&quot;为什么取这个&quot;。
        </p>
        <h2>韩国姓氏 Top 20（2015 年人口普查）</h2>
        <p>
          {SURNAMES.map((s) => `${s.hangul}(${s.hanja} ${s.percentage}%)`).join('、')}。
          金李朴三大姓合计占韩国人口 44.6%。姓+名传统排列，1 姓 + 1-2 字名最常见。
        </p>
        <h2>韩国取名文化</h2>
        <p>
          韩国名字通常由汉字构成（虽然 1970 年代后韩文名也逐渐普及）。
          汉字名讲究&quot;돌림자&quot;（辈分字）——同族同辈的兄弟姊妹共用一个汉字。
          现代命名倾向于避免太&quot;老气&quot;的字，改用发音优雅、含义美好的字（如&quot;敏&quot;&quot;智&quot;&quot;瑞&quot;&quot;夏&quot;等）。
          纯韩语名字（如&quot;별&quot;/星、&quot;가온&quot;/中心）近年重新流行。
        </p>
        <h2>K-pop idol 常见名字分析</h2>
        <ul>
          <li>BTS 智旻（지민）：智+旻，"聪明如秋日晴空"</li>
          <li>NCT 在玹（재현）：在+賢，"存于贤德"</li>
          <li>TWICE 娜琏（나연）：娜+妍，"娜姿美丽"</li>
          <li>BLACKPINK 智秀（지수）：智+秀，"智慧秀丽"</li>
          <li>NewJeans 敏智（민지）：敏+智，"聪敏智慧"</li>
        </ul>
        <h2>高频名字示例</h2>
        <ul>
          {TOP_NAMES.map((n) => (
            <li key={n.hangul}>
              <strong>{n.hangul}</strong> ({n.roman})
              {n.hanja && <span> · {n.hanja}</span>}
              <span> — {n.meaning}（{n.reason}）</span>
            </li>
          ))}
        </ul>
        <h2>使用场景</h2>
        <ul>
          <li>韩语学习：给自己起个韩文名做课堂昵称。</li>
          <li>K-pop 追星：给 fan account、fansite 起韩文名。</li>
          <li>留学 / 韩国工作：办韩国手机卡、外国人登录证时需要英文/韩文名对照。</li>
          <li>写小说、剧本：给韩国角色起真实感的名字。</li>
        </ul>
        <h2>数据来源声明</h2>
        <p>
          本工具名字库分两类明确标注：
          （1）韩国常见现代名——来源于韩国大法院家庭关系登录处公布的新生儿人气姓名统计（2000-2020s），全为韩国实际登记名字；
          （2）AI 创作名——采用真实韩国名字常用字组合，选取寓意美好、发音自然的字词，会明确标注为 AI 创作不冒充实名。
        </p>
      </div>
      <KoreanNameClient />
    </>
  );
}
