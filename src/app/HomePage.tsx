'use client';

import Link from 'next/link';
import Image from 'next/image';
import {
  Sparkles, AudioLines, BookHeart, GraduationCap, Layers, FileCheck2, Library,
  Route, MonitorSmartphone, Volume2, TrendingUp,
} from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

// SEO 落地页 · 仅未登录访客访问 / 时看得到；已登录用户被 page.tsx 跳到 /daily
// 全屏沉浸（fixed inset:0），与 /auth 登录页同一套视觉语言（auth.css）
// 自包含 --au-* token，明暗靠 [data-theme="dark"] 覆盖

const FEATURES = [
  { Icon: AudioLines,    tone: 'pink',   titleKey: 'home.feat_phonetics', descKey: 'home.feat_phonetics_desc', href: '/phonetics' },
  { Icon: BookHeart,     tone: 'peach',  titleKey: 'home.feat_diary',     descKey: 'home.feat_diary_desc',     href: '/diary' },
  { Icon: GraduationCap, tone: 'mint',   titleKey: 'home.feat_grammar',   descKey: 'home.feat_grammar_desc',   href: '/grammar' },
  { Icon: Layers,        tone: 'purple', titleKey: 'home.feat_themes',    descKey: 'home.feat_themes_desc',    href: '/vocabulary/library?tab=themes' },
  { Icon: FileCheck2,    tone: 'gold',   titleKey: 'home.feat_topik',     descKey: 'home.feat_topik_desc',     href: '/topik' },
  { Icon: Library,       tone: 'pink',   titleKey: 'home.feat_reading',   descKey: 'home.feat_reading_desc',   href: '/reading' },
] as const;

const HIGHLIGHTS = [
  { Icon: Route,             textKey: 'home.hl_path' },
  { Icon: MonitorSmartphone, textKey: 'home.hl_device' },
  { Icon: Volume2,           textKey: 'home.hl_audio' },
  { Icon: TrendingUp,        textKey: 'home.hl_progress' },
] as const;

const CSS = `
.tk-lp2 {
  --au-bg: oklch(97% 0.018 75);
  --au-aside-1: oklch(94% 0.045 70);
  --au-aside-2: oklch(90% 0.06 45);
  --au-surface: oklch(99.5% 0.006 75);
  --au-ink-1: oklch(28% 0.02 55);
  --au-ink-2: oklch(46% 0.02 55);
  --au-ink-3: oklch(60% 0.02 55);
  --au-ink-4: oklch(72% 0.018 55);
  --au-border: oklch(89% 0.02 60);
  --au-pink: oklch(66% 0.15 12);
  --au-pink-deep: oklch(56% 0.15 8);
  --au-pink-soft: oklch(93% 0.05 12);
  --au-serif: 'Fraunces', 'Noto Serif SC', Georgia, serif;

  --tone-pink:   linear-gradient(150deg, #ff9dbb, #ff7fa8);
  --tone-peach:  linear-gradient(150deg, #ffb38f, #ff9166);
  --tone-mint:   linear-gradient(150deg, #8fd6c2, #5eb89f);
  --tone-purple: linear-gradient(150deg, #c3a6f0, #a97fe0);
  --tone-gold:   linear-gradient(150deg, #f5c86b, #eab24a);

  /* 海拔系统：环境光 + 主光 + 接触阴影三层，暖色调偏 */
  --elev-1:
    0 0.5px 1px oklch(50% 0.08 40 / 0.05),
    0 4px 10px -6px oklch(50% 0.09 40 / 0.12),
    0 12px 28px -14px oklch(50% 0.1 40 / 0.16);
  --elev-2:
    0 1px 2px oklch(50% 0.08 40 / 0.06),
    0 8px 20px -10px oklch(50% 0.09 40 / 0.16),
    0 28px 56px -18px oklch(50% 0.1 40 / 0.22);
  --elev-3:
    0 2px 4px oklch(50% 0.08 40 / 0.08),
    0 14px 30px -12px oklch(50% 0.1 40 / 0.2),
    0 34px 64px -20px oklch(50% 0.11 40 / 0.28);
  --sheen: inset 0 1px 0 oklch(100% 0 0 / 0.6);

  position: fixed;
  inset: 0;
  z-index: 40;
  overflow: auto;
  padding: clamp(20px, 4vw, 56px) clamp(16px, 4vw, 40px)
           max(48px, env(safe-area-inset-bottom));
  padding-top: max(clamp(20px, 4vw, 56px), env(safe-area-inset-top));
  color: var(--au-ink-1);
  font-family: 'Pretendard', 'Noto Sans SC', system-ui, sans-serif;
  background:
    radial-gradient(80% 60% at 12% 8%, var(--au-aside-1), transparent 60%),
    radial-gradient(70% 70% at 92% 96%, var(--au-aside-2), transparent 55%),
    var(--au-bg);
  -webkit-font-smoothing: antialiased;
}

[data-theme="dark"] .tk-lp2 {
  --au-bg: oklch(20% 0.016 60);
  --au-aside-1: oklch(26% 0.03 40);
  --au-aside-2: oklch(22% 0.035 20);
  --au-surface: oklch(24% 0.016 60);
  --au-ink-1: oklch(94% 0.015 75);
  --au-ink-2: oklch(76% 0.015 60);
  --au-ink-3: oklch(60% 0.014 60);
  --au-ink-4: oklch(48% 0.012 60);
  --au-border: oklch(94% 0.015 75 / 0.14);
  --au-pink: oklch(72% 0.14 10);
  --au-pink-deep: oklch(80% 0.13 12);
  --au-pink-soft: oklch(40% 0.08 10 / 0.35);
  --sheen: inset 0 1px 0 oklch(100% 0 0 / 0.08);
}

.tk-lp2-inner { max-width: 1080px; margin: 0 auto; }

.tk-lp2-topbrand {
  display: flex;
  align-items: baseline;
  gap: 10px;
  font-family: var(--au-serif);
  margin-bottom: clamp(24px, 4vw, 44px);
}
.tk-lp2-topbrand .en {
  font-size: 26px; font-weight: 900; letter-spacing: -0.02em;
  color: var(--au-pink-deep);
}
.tk-lp2-topbrand .kr { font-size: 15px; font-weight: 600; color: var(--au-ink-3); }

/* Hero 悬浮卡 */
.tk-lp2-hero {
  background: var(--au-surface);
  border: 1px solid var(--au-border);
  border-radius: 28px;
  overflow: hidden;
  box-shadow: var(--sheen), var(--elev-3);
  display: grid;
  grid-template-columns: 0.92fr 1.08fr;
  align-items: stretch;
}
.tk-lp2-hero-fig {
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 22px;
  padding: clamp(32px, 4vw, 52px);
  background:
    radial-gradient(130% 80% at 20% 12%, var(--au-aside-1), transparent 62%),
    radial-gradient(120% 90% at 88% 92%, var(--au-aside-2), transparent 55%),
    var(--au-aside-1);
}
.tk-lp2-hero-fig::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, oklch(100% 0 0 / 0.35), transparent 40%);
  pointer-events: none;
}
[data-theme="dark"] .tk-lp2-hero-fig::after {
  background: linear-gradient(180deg, oklch(100% 0 0 / 0.06), transparent 40%);
}
.tk-lp2-fig-frame {
  position: relative;
  overflow: hidden;
  width: clamp(150px, 18vw, 210px);
  aspect-ratio: 1;
  border-radius: 32px;
  background: linear-gradient(155deg, var(--au-aside-2), var(--au-pink-soft));
  box-shadow:
    inset 0 2px 3px oklch(100% 0 0 / 0.6),
    inset 0 -8px 20px -8px oklch(50% 0.1 40 / 0.25),
    0 6px 12px -6px oklch(50% 0.1 40 / 0.24),
    0 22px 44px -12px oklch(50% 0.12 40 / 0.34);
  animation: tk-lp2-float 4s ease-in-out infinite;
}
[data-theme="dark"] .tk-lp2-fig-frame {
  background: linear-gradient(155deg, oklch(32% 0.04 30), oklch(28% 0.05 10));
  box-shadow:
    inset 0 1px 0 oklch(100% 0 0 / 0.1),
    0 22px 46px -12px oklch(0% 0 0 / 0.5);
}
.tk-lp2-fig-frame img { width: 100%; height: 100%; object-fit: cover; display: block; }
.tk-lp2-fig-tag {
  position: relative;
  z-index: 1;
  padding: 8px 18px;
  background: oklch(100% 0 0 / 0.72);
  border-radius: 999px;
  font-size: 12.5px; font-weight: 700;
  color: var(--au-pink-deep);
  letter-spacing: 0.04em;
  backdrop-filter: blur(6px);
}
[data-theme="dark"] .tk-lp2-fig-tag { background: oklch(30% 0.02 40 / 0.7); }

.tk-lp2-hero-text {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: clamp(36px, 4.5vw, 64px);
}
.tk-lp2-eyebrow {
  font-family: var(--au-serif);
  font-size: 14px; font-weight: 600; letter-spacing: 0.04em;
  color: var(--au-pink-deep);
  margin: 0 0 14px;
}
.tk-lp2-h1 {
  font-family: var(--au-serif);
  font-size: clamp(32px, 4vw, 48px);
  font-weight: 700; line-height: 1.18; letter-spacing: -0.01em;
  color: var(--au-ink-1);
  margin: 0 0 18px;
}
.tk-lp2-tagline {
  font-size: clamp(15px, 1.6vw, 18px);
  line-height: 1.7; color: var(--au-ink-2);
  margin: 0 0 6px; max-width: 40ch;
}
.tk-lp2-sub { font-size: 13.5px; color: var(--au-ink-3); margin: 0 0 30px; }
.tk-lp2-cta-row { display: flex; gap: 12px; flex-wrap: wrap; }
.tk-lp2-cta-primary {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 14px 30px; font-size: 15.5px; font-weight: 700;
  color: #fff; background: var(--au-pink);
  border-radius: 999px; text-decoration: none;
  box-shadow:
    inset 0 1px 0 oklch(100% 0 0 / 0.3),
    0 10px 26px -4px oklch(66% 0.15 12 / 0.4),
    0 4px 10px -4px oklch(56% 0.15 8 / 0.3);
  transition: filter 0.15s ease, transform 0.1s ease;
}
[data-theme="dark"] .tk-lp2-cta-primary { color: oklch(24% 0.02 40); }
.tk-lp2-cta-primary:hover { filter: brightness(1.05); transform: translateY(-1px); }
.tk-lp2-cta-primary:active { transform: scale(0.985); }
.tk-lp2-cta-secondary {
  display: inline-flex; align-items: center; gap: 6px;
  padding: 14px 30px; font-size: 15.5px; font-weight: 700;
  color: var(--au-pink-deep); background: var(--au-pink-soft);
  border: 1px solid var(--au-border);
  border-radius: 999px; text-decoration: none;
  transition: filter 0.15s ease;
}
.tk-lp2-cta-secondary:hover { filter: brightness(0.98); }

.tk-lp2-sectitle {
  font-family: var(--au-serif);
  font-size: clamp(20px, 2.2vw, 26px);
  font-weight: 700; letter-spacing: -0.01em;
  text-align: center; color: var(--au-ink-1);
  margin: clamp(44px, 6vw, 64px) 0 6px;
}
.tk-lp2-secsub { text-align: center; font-size: 14px; color: var(--au-ink-3); margin: 0 0 clamp(24px, 3vw, 36px); }
.tk-lp2-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 18px; }
.tk-lp2-card {
  display: block;
  padding: 26px 24px;
  border-radius: 20px;
  background: linear-gradient(180deg, oklch(100% 0.004 75), var(--au-surface));
  border: 1px solid var(--au-border);
  text-decoration: none; color: inherit;
  box-shadow: var(--sheen), var(--elev-1);
  transition: transform 0.2s cubic-bezier(0.25,1,0.5,1), box-shadow 0.2s cubic-bezier(0.25,1,0.5,1), border-color 0.2s ease;
}
[data-theme="dark"] .tk-lp2-card { background: var(--au-surface); }
.tk-lp2-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--sheen), var(--elev-2);
  border-color: var(--au-pink-soft);
}
.tk-lp2-card-icon {
  width: 52px; height: 52px;
  display: flex; align-items: center; justify-content: center;
  border-radius: 16px; margin-bottom: 16px; color: #fff;
  box-shadow:
    inset 0 1px 0 oklch(100% 0 0 / 0.55),
    inset 0 -3px 8px -2px oklch(30% 0.1 30 / 0.25),
    0 6px 14px -4px oklch(50% 0.12 30 / 0.32);
  transition: transform 0.2s cubic-bezier(0.25,1,0.5,1);
}
.tk-lp2-card:hover .tk-lp2-card-icon { transform: translateY(-2px) scale(1.04); }
.tk-lp2-card-icon svg { width: 26px; height: 26px; }
.tk-lp2-card-icon.tone-pink   { background: var(--tone-pink); }
.tk-lp2-card-icon.tone-peach  { background: var(--tone-peach); }
.tk-lp2-card-icon.tone-mint   { background: var(--tone-mint); }
.tk-lp2-card-icon.tone-purple { background: var(--tone-purple); }
.tk-lp2-card-icon.tone-gold   { background: var(--tone-gold); }
.tk-lp2-card-title { font-size: 17px; font-weight: 700; margin: 0 0 8px; color: var(--au-ink-1); }
.tk-lp2-card-desc { font-size: 13px; line-height: 1.6; color: var(--au-ink-3); margin: 0; }

.tk-lp2-highlights {
  margin-top: clamp(24px, 3vw, 36px);
  padding: clamp(28px, 3.5vw, 40px);
  border-radius: 24px;
  background:
    radial-gradient(120% 100% at 15% 0%, var(--au-aside-1), transparent 60%),
    var(--au-pink-soft);
  border: 1px solid var(--au-border);
  box-shadow: var(--sheen), var(--elev-2);
}
.tk-lp2-highlights h3 {
  font-family: var(--au-serif);
  font-size: 20px; font-weight: 700; text-align: center;
  color: var(--au-ink-1); margin: 0 0 24px;
}
.tk-lp2-hl-list { display: grid; grid-template-columns: repeat(4, 1fr); gap: 22px; }
.tk-lp2-hl { display: flex; flex-direction: column; align-items: center; text-align: center; gap: 10px; }
.tk-lp2-hl-icon {
  width: 44px; height: 44px;
  display: inline-flex; align-items: center; justify-content: center;
  border-radius: 14px;
  background: linear-gradient(180deg, oklch(100% 0 0 / 0.92), oklch(100% 0 0 / 0.72));
  color: var(--au-pink-deep);
  box-shadow:
    inset 0 1px 0 oklch(100% 0 0 / 0.8),
    0 4px 12px -4px oklch(50% 0.1 40 / 0.28);
}
[data-theme="dark"] .tk-lp2-hl-icon {
  background: linear-gradient(180deg, oklch(40% 0.02 40 / 0.6), oklch(34% 0.02 40 / 0.4));
}
.tk-lp2-hl-text { font-size: 13px; line-height: 1.55; color: var(--au-ink-2); white-space: pre-line; }

.tk-lp2-foot { text-align: center; padding: clamp(40px, 5vw, 60px) 0 8px; }
.tk-lp2-foot p { font-size: 14px; color: var(--au-ink-3); margin: 0 0 18px; }
.tk-lp2-foot-cta {
  display: inline-flex; align-items: center; gap: 8px;
  padding: 15px 42px; font-size: 15px; font-weight: 700;
  color: #fff; background: var(--au-pink);
  border-radius: 999px; text-decoration: none;
  box-shadow:
    inset 0 1px 0 oklch(100% 0 0 / 0.3),
    0 10px 26px -4px oklch(66% 0.15 12 / 0.4),
    0 4px 10px -4px oklch(56% 0.15 8 / 0.3);
  transition: filter 0.15s ease, transform 0.1s ease;
}
[data-theme="dark"] .tk-lp2-foot-cta { color: oklch(24% 0.02 40); }
.tk-lp2-foot-cta:hover { filter: brightness(1.05); transform: translateY(-1px); }
.tk-lp2-foot-cta:active { transform: translateY(0); }

@keyframes tk-lp2-float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-9px); }
}

@media (max-width: 820px) {
  .tk-lp2-hero { grid-template-columns: 1fr; }
  .tk-lp2-hero-fig { padding: 30px 22px 22px; gap: 14px; }
  .tk-lp2-fig-frame { width: clamp(122px, 34vw, 160px); border-radius: 26px; }
  .tk-lp2-fig-tag { font-size: 12px; padding: 7px 16px; }
  .tk-lp2-hero-text { padding: 24px 22px 30px; text-align: center; align-items: center; }
  .tk-lp2-eyebrow { font-size: 13px; margin-bottom: 10px; }
  .tk-lp2-h1 { font-size: clamp(25px, 6.6vw, 31px); margin-bottom: 13px; }
  .tk-lp2-tagline { text-align: center; font-size: 14px; }
  .tk-lp2-sub { font-size: 12.5px; margin-bottom: 22px; }
  .tk-lp2-cta-row { justify-content: center; flex-wrap: nowrap; gap: 9px; }
  .tk-lp2-cta-primary,
  .tk-lp2-cta-secondary { padding: 12px 20px; font-size: 13.5px; white-space: nowrap; }

  .tk-lp2-sectitle { font-size: 23px; }
  .tk-lp2-secsub { font-size: 15px; }

  /* 手机端：单列 + 左图右文横向卡 */
  .tk-lp2-grid { grid-template-columns: 1fr; gap: 12px; }
  .tk-lp2-card {
    display: grid;
    grid-template-columns: auto 1fr;
    align-items: center;
    column-gap: 16px;
    padding: 18px 20px;
  }
  .tk-lp2-card-icon {
    grid-row: 1 / 3;
    width: 56px; height: 56px; border-radius: 18px;
    margin-bottom: 0;
  }
  .tk-lp2-card-icon svg { width: 28px; height: 28px; }
  .tk-lp2-card:hover { transform: none; }
  .tk-lp2-card:active { transform: scale(0.99); }
  .tk-lp2-card-title { font-size: 16.5px; margin-bottom: 3px; align-self: end; }
  .tk-lp2-card-desc { font-size: 13px; align-self: start; }

  .tk-lp2-highlights h3 { font-size: 21px; }
  .tk-lp2-hl-list { grid-template-columns: 1fr 1fr; gap: 22px 16px; }
  .tk-lp2-hl-icon { width: 54px; height: 54px; border-radius: 16px; }
  .tk-lp2-hl-text { font-size: 14px; }

  .tk-lp2-foot p { font-size: 15px; }
  .tk-lp2-foot-cta { font-size: 16px; padding: 16px 44px; }
}
@media (prefers-reduced-motion: reduce) {
  .tk-lp2-fig-frame { animation: none; }
}
.tk-lp2-beian {
  margin-top: 32px;
  padding-bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  text-align: center;
}
.tk-lp2-beian a {
  color: #89756e;
  font-size: 12px;
  text-decoration: none;
  letter-spacing: 0.02em;
}
.tk-lp2-beian a:hover { text-decoration: underline; }
`;

export default function HomePage() {
  const { lang } = useLang();
  return (
    <div className="tk-lp2">
      <style dangerouslySetInnerHTML={{ __html: CSS }} />
      <div className="tk-lp2-inner">

        {/* 顶部品牌 */}
        <div className="tk-lp2-topbrand">
          <span className="en">Tori</span>
          <span className="kr">토리네 한국어</span>
        </div>

        {/* Hero 悬浮卡 */}
        <div className="tk-lp2-hero">
          <div className="tk-lp2-hero-fig">
            <div className="tk-lp2-fig-frame">
              <Image
                src="/images/tori-hero-wave.webp"
                alt={t('home.hero_alt', lang)}
                width={240}
                height={240}
                priority
              />
            </div>
            <span className="tk-lp2-fig-tag">{t('home.hero_tag', lang)}</span>
          </div>
          <div className="tk-lp2-hero-text">
            <p className="tk-lp2-eyebrow">토리의 한국어 일기</p>
            <h1 className="tk-lp2-h1">{t('home.hero_title', lang)}</h1>
            <p className="tk-lp2-tagline">
              {t('home.hero_tagline', lang)}
            </p>
            <p className="tk-lp2-sub">{t('home.hero_sub', lang)}</p>
            <div className="tk-lp2-cta-row">
              <Link href="/daily" className="tk-lp2-cta-primary">
                <Sparkles size={16} /> {t('home.cta_start', lang)}
              </Link>
              <Link href="/auth/register" className="tk-lp2-cta-secondary">
                {t('home.cta_register', lang)}
              </Link>
            </div>
          </div>
        </div>

        {/* 功能卡片 */}
        <h2 className="tk-lp2-sectitle">{t('home.features_title', lang)}</h2>
        <p className="tk-lp2-secsub">{t('home.features_sub', lang)}</p>
        <div className="tk-lp2-grid">
          {FEATURES.map((f) => (
            <Link key={f.titleKey} href={f.href} className="tk-lp2-card">
              <div className={`tk-lp2-card-icon tone-${f.tone}`}>
                <f.Icon size={26} strokeWidth={2} />
              </div>
              <h3 className="tk-lp2-card-title">{t(f.titleKey, lang)}</h3>
              <p className="tk-lp2-card-desc">{t(f.descKey, lang)}</p>
            </Link>
          ))}
        </div>

        {/* 亮点 */}
        <div className="tk-lp2-highlights">
          <h3>{t('home.highlights_title', lang)}</h3>
          <div className="tk-lp2-hl-list">
            {HIGHLIGHTS.map((h) => (
              <div key={h.textKey} className="tk-lp2-hl">
                <span className="tk-lp2-hl-icon">
                  <h.Icon size={24} strokeWidth={2.2} />
                </span>
                <span className="tk-lp2-hl-text">{t(h.textKey, lang)}</span>
              </div>
            ))}
          </div>
        </div>

        {/* 底部 CTA */}
        <div className="tk-lp2-foot">
          <p>{t('home.foot_note', lang)}</p>
          <Link href="/daily" className="tk-lp2-foot-cta">
            {t('home.foot_cta', lang)}
          </Link>
        </div>

        {/* 备案号（工信部要求：首页可点击跳转 beian.miit.gov.cn） */}
        <footer className="tk-lp2-beian">
          <a href="https://beian.miit.gov.cn/" target="_blank" rel="noreferrer">
            沪ICP备2026035653号
          </a>
        </footer>

      </div>
    </div>
  );
}
