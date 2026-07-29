import type { Metadata } from 'next';
import Link from 'next/link';
import { toolMetadata, toolJsonLd } from '@/lib/seo';
import { getServerLang } from '@/lib/server/lang';
import { t } from '@/lib/i18n';
import KeyboardClient from './KeyboardClient';

const TOOL = {
  slug: 'keyboard',
  name: '在线韩语键盘',
  tagline: '免安装打韩文',
  description:
    '免费在线韩语键盘（두벌식 Dubeolsik 标准布局），无需切换系统输入法即可打韩文。支持 QWERTY 物理键盘输入、点击虚拟键盘、Shift 输入激音/紧音、复合元音自动合成、一键复制。适用于查韩文单词、发消息、留言、学习韩文书写。',
  nameEn: 'Online Korean Keyboard',
  taglineEn: 'Type Korean without installing anything',
  descriptionEn:
    'Free online Korean keyboard with the standard Dubeolsik layout. Type Hangul on a QWERTY keyboard — no IME installation needed. Supports Shift for double consonants, automatic syllable composition, and one-click copy.',
  keywords: [
    '在线韩语键盘',
    '韩语输入法',
    '免安装韩语键盘',
    'Korean keyboard online',
    'Dubeolsik',
    '두벌식',
    '韩文打字',
    'K-pop 韩文输入',
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
          <span>在线韩语键盘</span>
        </nav>
        <h1>在线韩语键盘 · 免费韩文输入器（두벌식 Dubeolsik）</h1>
        <p>
          免安装、免切换系统输入法的免费在线韩语键盘，采用韩国官方 두벌식（Dubeolsik，两分式）标准布局。
          支持 QWERTY 物理键盘直接输入，也可点击屏幕虚拟键盘。输入自动合成 Hangul 音节（초성 + 중성 + 종성）。
        </p>
        <h2>什么是 Dubeolsik（두벌식）</h2>
        <p>
          Dubeolsik 是韩国目前使用最广的键盘布局（占 99% 以上），韩国政府 1969 年定为国家标准。
          左手区放辅音（ㅂㅈㄷㄱㅅ / ㅁㄴㅇㄹㅎ / ㅋㅌㅊㅍ），右手区放元音（ㅛㅕㅑㅐㅔ / ㅗㅓㅏㅣ / ㅠㅜㅡ）。
          按 Shift 可输入激音（쌍자음）：ㅃㅉㄸㄲㅆ 与 ㅒㅖ。
        </p>
        <h2>QWERTY 键位对照</h2>
        <p>
          辅音行 Q=ㅂ W=ㅈ E=ㄷ R=ㄱ T=ㅅ；A=ㅁ S=ㄴ D=ㅇ F=ㄹ G=ㅎ；Z=ㅋ X=ㅌ C=ㅊ V=ㅍ。
          元音行 Y=ㅛ U=ㅕ I=ㅑ O=ㅐ P=ㅔ；H=ㅗ J=ㅓ K=ㅏ L=ㅣ；B=ㅠ N=ㅜ M=ㅡ。
          Shift+Q=ㅃ Shift+W=ㅉ Shift+E=ㄸ Shift+R=ㄲ Shift+T=ㅆ Shift+O=ㅒ Shift+P=ㅖ。
        </p>
        <h2>常用韩语短句</h2>
        <ul>
          <li>안녕하세요 — 你好</li>
          <li>감사합니다 — 谢谢</li>
          <li>죄송합니다 — 对不起</li>
          <li>사랑해요 — 我爱你</li>
          <li>맛있어요 — 好吃</li>
          <li>화이팅 — 加油</li>
          <li>오빠 — 哥哥/欧巴</li>
          <li>언니 — 姐姐</li>
          <li>알겠습니다 — 我知道了</li>
          <li>괜찮아요 — 没关系</li>
        </ul>
        <h2>使用场景</h2>
        <ul>
          <li>暂时打韩文：查字典、写留言、发消息，不用切换系统输入法。</li>
          <li>不会韩语键位：直接用中文键盘查看 QWERTY 对照。</li>
          <li>韩语学习：练习拼写、认识 Hangul 音节合成规律。</li>
          <li>K-pop 追星：给 idol 写韩文留言、评论、DM。</li>
        </ul>
        <h2>Windows / macOS / iPhone 添加韩语输入法</h2>
        <p>
          Windows 11：设置 → 时间和语言 → 语言和区域 → 添加语言 → 韩语 → 微软 IME。
          macOS：系统设置 → 键盘 → 输入源 → + → 韩语 → 2-Set Korean。
          iPhone：设置 → 通用 → 键盘 → 添加新键盘 → 韩文。
          Android：系统设置 → 语言和输入法 → 韩语键盘。
        </p>
      </div>
      <KeyboardClient />
    </>
  );
}
