import type { Metadata } from 'next';
import { SITE_URL, hubMetadata } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';

const metadataZh: Metadata = {
  title: '韩语40音教程 · 元音辅音收音发音表',
  description: '韩语40音系统教学：21个元音+19个辅音+收音，配真人录音、书写笔顺、拼读练习，适合零基础入门。',
  alternates: { canonical: '/phonetics' },
  openGraph: {
    title: '韩语40音教程 · 元音辅音收音发音表',
    description: '韩语40音系统教学：21个元音+19个辅音+收音，配真人录音、书写笔顺、拼读练习',
    url: `${SITE_URL}/phonetics`,
    type: 'website',
    locale: 'zh_CN',
    siteName: '兔莉的韩语日记',
    images: [{ url: '/tori-og-v2.webp', width: 1200, height: 630, alt: '韩语40音教程 · 兔莉的韩语日记' }],
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return lang === 'en' ? (hubMetadata('/phonetics', 'en') ?? metadataZh) : metadataZh;
}

// /en rewrite 复用 /grammar 等裸路径的渲染缓存，若被 prerender 会固化成构建时语言(zh)。
// 强制每请求执行 generateMetadata 读取 proxy 注入的 x-tori-lang，保证 /en 出英文 metadata。
export const dynamic = 'force-dynamic';


const howToJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name: '如何学习韩语40音',
  description: '零基础学韩语40音的三步系统方法：元音入门 → 辅音掌握 → 收音进阶。',
  totalTime: 'P14D',
  inLanguage: 'zh-CN',
  image: `${SITE_URL}/tori-og-v2.webp`,
  supply: [
    { '@type': 'HowToSupply', name: '真人韩语发音录音' },
    { '@type': 'HowToSupply', name: '书写笔顺示范' },
    { '@type': 'HowToSupply', name: '拼读练习题' },
  ],
  step: [
    {
      '@type': 'HowToStep',
      position: 1,
      name: '掌握 21 个元音',
      text: '先学 10 个基本元音（ㅏ ㅑ ㅓ ㅕ ㅗ ㅛ ㅜ ㅠ ㅡ ㅣ），再学 11 个复合元音（ㅐ ㅒ ㅔ ㅖ ㅘ ㅙ ㅚ ㅝ ㅞ ㅟ ㅢ）。每个元音配真人录音反复听读，注意 ㅓ/ㅗ、ㅐ/ㅔ 这几组易混音。',
      url: `${SITE_URL}/phonetics#vowel`,
    },
    {
      '@type': 'HowToStep',
      position: 2,
      name: '掌握 19 个辅音',
      text: '按松音 → 送气音 → 紧音的顺序学：ㄱ/ㅋ/ㄲ、ㄷ/ㅌ/ㄸ、ㅂ/ㅍ/ㅃ、ㅈ/ㅊ/ㅉ、ㅅ/ㅆ 这几组三兄弟发音差别最难，需要对照录音多练。',
      url: `${SITE_URL}/phonetics#consonant`,
    },
    {
      '@type': 'HowToStep',
      position: 3,
      name: '学习收音（받침）和连读规则',
      text: '27 种收音只有 7 种代表音（ㄱ ㄴ ㄷ ㄹ ㅁ ㅂ ㅇ），先记 7 代表音再记归并规则。之后攻 7 大连读规则：连音、鼻音化、流音化、硬音化、送气化、口盖音化、ㅎ 脱落。',
      url: `${SITE_URL}/phonetics#batchim`,
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
      {children}
    </>
  );
}
