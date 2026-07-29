import type { Metadata } from 'next';
import Link from 'next/link';
import { toolMetadata, toolJsonLd } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';
import { t } from '@/lib/i18n';
import RomanizationClient from './RomanizationClient';

const TOOL = {
  slug: 'romanization',
  name: '韩语罗马音互转',
  tagline: '韩文↔罗马音一键转换',
  description:
    '免费在线韩语罗马音转换工具，支持韩文与罗马音双向互转。采用官方 Revised Romanization 规则，覆盖 19 初声 21 中声 27 终声，输入即转，一键复制。适用于学韩语、K-pop 歌词标注、韩国地名护照拼写、TOPIK 备考。',
  nameEn: 'Korean Romanization Converter',
  taglineEn: 'Hangul ↔ Romaja — bidirectional, instant',
  descriptionEn:
    'Free online Korean romanization tool. Bidirectional conversion between Hangul and Revised Romanization. Covers 19 initials, 21 medials, and 27 finals. For K-pop lyrics, Korean travel, TOPIK prep, and learning Hangul pronunciation.',
  keywords: [
    '韩语罗马音',
    '罗马音转韩文',
    '韩文转罗马音',
    'Korean romanization',
    'Revised Romanization',
    '韩语拼音',
    '韩文注音',
    'K-pop 歌词罗马音',
  ],
};

export async function generateMetadata(): Promise<Metadata> {
  const lang = await getServerLang();
  return toolMetadata(TOOL, lang);
}

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
          <span>韩语罗马音互转</span>
        </nav>
        <h1>韩语罗马音互转 · 免费在线转换工具</h1>
        <p>
          韩文与罗马音双向转换：支持韩文（한글）→ 罗马音（Romanization），或反向从罗马拼音生成韩文音节。
          采用韩国文化体育观光部官方 Revised Romanization of Korean（2000 年版）规则，覆盖 19 个初声、21 个中声、27 个终声。
        </p>
        <h2>使用场景</h2>
        <ul>
          <li>看不懂韩文？把韩语单词、歌词、店名转成罗马拼音方便拼读。</li>
          <li>K-pop 追星：翻译 idol 名字、歌词副歌、专辑名的官方罗马音写法。</li>
          <li>韩国旅行：地铁站名、餐厅名、护照韩文姓名的罗马字标注。</li>
          <li>TOPIK 备考：识别课本单词的标准发音标注。</li>
          <li>韩剧字幕整理：把演员台词的罗马音转回韩文原文。</li>
        </ul>
        <h2>Revised Romanization 常见对照</h2>
        <p>
          初声：ㄱ=g，ㄲ=kk，ㄴ=n，ㄷ=d，ㄸ=tt，ㄹ=r，ㅁ=m，ㅂ=b，ㅃ=pp，ㅅ=s，ㅆ=ss，ㅇ=∅，ㅈ=j，ㅉ=jj，ㅊ=ch，ㅋ=k，ㅌ=t，ㅍ=p，ㅎ=h。
        </p>
        <p>
          中声：ㅏ=a，ㅐ=ae，ㅑ=ya，ㅒ=yae，ㅓ=eo，ㅔ=e，ㅕ=yeo，ㅖ=ye，ㅗ=o，ㅘ=wa，ㅙ=wae，ㅚ=oe，ㅛ=yo，ㅜ=u，ㅝ=wo，ㅞ=we，ㅟ=wi，ㅠ=yu，ㅡ=eu，ㅢ=ui，ㅣ=i。
        </p>
        <p>
          终声：ㄱ=k，ㄴ=n，ㄷ=t，ㄹ=l，ㅁ=m，ㅂ=p，ㅇ=ng。ㅅ/ㅆ/ㅈ/ㅊ/ㅌ 收音都读作 t，ㅋ 读 k，ㅍ 读 p。
        </p>
        <h2>常见示例</h2>
        <ul>
          <li>안녕하세요 → annyeonghaseyo（你好）</li>
          <li>감사합니다 → gamsahamnida（谢谢）</li>
          <li>사랑해 → saranghae（我爱你）</li>
          <li>서울 → seoul（首尔）</li>
          <li>부산 → busan（釜山）</li>
          <li>김치 → gimchi（泡菜）</li>
        </ul>
        <h2>常见误读</h2>
        <p>
          ㅓ 不是 &quot;o&quot; 而是 &quot;eo&quot;（对应嘴形张大 &quot;喔&quot; 音）。
          ㅡ 不是 &quot;u&quot; 而是 &quot;eu&quot;（对应嘴唇不动的中央音）。
          ㅐ 与 ㅔ 在现代口语几乎同音，但书面上分别为 &quot;ae&quot; 与 &quot;e&quot;。
        </p>
        <h2>音变处理说明</h2>
        <p>
          本工具做&quot;字面&quot;级罗马音转换（一对一 jamo 映射），不模拟激音化、连音、鼻音化等实际发音音变。
          例如 &quot;국물&quot; 字面为 gukmul，实际发音为 gungmul（口→喔→喔化 ㄱ→ㅇ）。学发音时请以韩语原文对照真人音频为准。
        </p>
        <h2>反向转换须知</h2>
        <p>
          从罗马音反向生成韩文时，若拼写不含辅音，会自动补 ㅇ 作为默音初声（例：a → 아）。
          输入采用最长优先匹配（yeo 优先于 y+e+o）。因音变不可逆，反向结果为&quot;字面&quot;韩文，
          可能与原始韩文用词不同（如 gungmul 反推为 궁물 而非 국물）。
        </p>
      </div>
      <RomanizationClient />
    </>
  );
}
