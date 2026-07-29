'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const SEEN_KEY = 'tori-day1-invite-shown';

// 完成 beginner Day1 后弹一次的「晒成就 + 邀请」卡片。
// 品牌视觉对标会员中心：暖奶油 --au-* token + Fraunces 衬线 + 三层海拔阴影 + 粉色 CTA，支持暗色。
export function DiaryDay1InvitePopup({ onClose }: { onClose: () => void }) {
  const router = useRouter();
  const { lang } = useLang();
  const [leaving, setLeaving] = useState(false);

  const close = () => {
    setLeaving(true);
    setTimeout(onClose, 220);
  };

  const goInvite = () => {
    try { localStorage.setItem(SEEN_KEY, '1'); } catch { /* ignore */ }
    router.push('/invite/activity');
  };

  return (
    <div
      className="d1i-scope"
      onClick={close}
      style={{
        position: 'fixed', inset: 0, zIndex: 300,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: 20, background: 'oklch(20% 0.02 60 / 0.5)', backdropFilter: 'blur(4px)',
        animation: leaving ? 'd1i-fade-out 0.2s ease forwards' : 'd1i-fade 0.28s ease',
      }}
    >
      <style dangerouslySetInnerHTML={{ __html: D1I_CSS }} />
      <div
        className="d1i-card"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: leaving ? 'd1i-pop-out 0.2s ease forwards' : 'd1i-pop 0.4s cubic-bezier(0.34,1.56,0.64,1)' }}
      >
        <button className="d1i-close" onClick={close} aria-label={t('diary.d1pop.close_aria', lang)}>✕</button>

        <div className="d1i-figure">
          <Image src="/images/tori-hero-wave.webp" alt={t('diary.d1pop.hero_alt', lang)} fill sizes="120px" style={{ objectFit: 'contain' }} />
        </div>

        <span className="d1i-eyebrow">{t('diary.d1pop.eyebrow', lang)}</span>
        <h2 className="d1i-title">{t('diary.d1pop.title_1', lang)}<br />{t('diary.d1pop.title_2', lang)}</h2>
        <p className="d1i-desc">
          {t('diary.d1pop.desc_1', lang)}<b>{t('diary.d1pop.desc_b1', lang)}</b>{t('diary.d1pop.desc_2', lang)}<b>{t('diary.d1pop.desc_b2', lang)}</b>{t('diary.d1pop.desc_3', lang)}
        </p>

        <button className="d1i-cta" onClick={goInvite}>{t('diary.d1pop.cta', lang)}</button>
        <button className="d1i-later" onClick={close}>{t('diary.d1pop.later', lang)}</button>
      </div>
    </div>
  );
}

const D1I_CSS = `
.d1i-scope {
  --au-surface: oklch(99.5% 0.006 75);
  --au-ink-1: oklch(28% 0.02 55);
  --au-ink-2: oklch(46% 0.02 55);
  --au-ink-3: oklch(60% 0.02 55);
  --au-line: oklch(88% 0.02 70);
  --au-pink: oklch(72% 0.14 8);
  --au-pink-deep: oklch(60% 0.16 10);
  --au-pink-soft: oklch(90% 0.06 10);
  --au-serif: 'Fraunces', 'Noto Serif SC', Georgia, serif;
}
[data-theme="dark"] .d1i-scope {
  --au-surface: oklch(24% 0.016 60);
  --au-ink-1: oklch(94% 0.015 75);
  --au-ink-2: oklch(76% 0.02 75);
  --au-ink-3: oklch(62% 0.02 75);
  --au-line: oklch(34% 0.02 60);
  --au-pink: oklch(78% 0.13 10);
  --au-pink-deep: oklch(80% 0.13 12);
  --au-pink-soft: oklch(40% 0.08 10 / 0.35);
}
.d1i-card {
  position: relative; width: 100%; max-width: 340px;
  background: var(--au-surface); color: var(--au-ink-1);
  border: 1px solid var(--au-line); border-radius: 26px;
  padding: 30px 26px 24px; text-align: center;
  font-family: 'Pretendard', 'Noto Sans SC', system-ui, sans-serif;
  box-shadow: 0 4px 8px oklch(50% 0.07 40 / 0.1), 0 24px 56px oklch(50% 0.07 40 / 0.2), inset 0 1px 0 oklch(100% 0 0 / 0.7);
}
[data-theme="dark"] .d1i-card { box-shadow: 0 24px 56px oklch(0% 0 0 / 0.45); }
.d1i-close {
  position: absolute; top: 14px; right: 16px;
  width: 30px; height: 30px; border-radius: 999px; border: none;
  background: oklch(50% 0.05 40 / 0.07); color: var(--au-ink-3);
  font-size: 14px; cursor: pointer; line-height: 1;
}
.d1i-close:hover { background: oklch(50% 0.05 40 / 0.13); }
.d1i-figure { position: relative; width: 120px; height: 120px; margin: 0 auto 6px; }
.d1i-eyebrow {
  display: inline-block; font-size: 13px; font-weight: 600;
  color: var(--au-pink-deep); background: var(--au-pink-soft);
  padding: 6px 15px; border-radius: 999px; margin-bottom: 14px;
}
.d1i-title { font-family: var(--au-serif); font-size: 22px; font-weight: 700; line-height: 1.35; margin: 0 0 12px; }
.d1i-desc { font-size: 14px; line-height: 1.7; color: var(--au-ink-2); margin: 0 0 22px; }
.d1i-desc b { color: var(--au-pink-deep); font-weight: 700; }
.d1i-cta {
  width: 100%; padding: 14px; border: none; border-radius: 999px;
  font-size: 15.5px; font-weight: 700; cursor: pointer; color: #fff;
  background: linear-gradient(150deg, #ff9dbb, #ff7fa8);
  box-shadow: 0 6px 16px oklch(70% 0.14 10 / 0.32);
  transition: transform 0.18s;
}
.d1i-cta:hover { transform: translateY(-1px); }
.d1i-later {
  width: 100%; padding: 11px; margin-top: 8px; border: none; background: none;
  font-size: 13.5px; color: var(--au-ink-3); cursor: pointer;
}
@keyframes d1i-fade { from { opacity: 0 } to { opacity: 1 } }
@keyframes d1i-fade-out { from { opacity: 1 } to { opacity: 0 } }
@keyframes d1i-pop { from { opacity: 0; transform: scale(0.92) translateY(10px) } to { opacity: 1; transform: scale(1) translateY(0) } }
@keyframes d1i-pop-out { from { opacity: 1; transform: scale(1) } to { opacity: 0; transform: scale(0.96) } }
`;

export { SEEN_KEY as DAY1_INVITE_SEEN_KEY };
