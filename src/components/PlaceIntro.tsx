'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { PLACES } from '@/data/places';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { MODE_KEY, type BroadcastMode } from '@/lib/radioLocal';
import './place-intro.css';

// 动物城「场所」首次进入指引 —— 全站共用一套视觉，内容来自 src/data/places.ts。
// 靠场所的 accent 换主题色（--pi-accent）；localStorage 门控每场所只弹一次。
// reopenSignal：父级递增此值可从菜单「再看一次介绍」重新打开（不清 flag）。
// onModePick：电台专用——步骤标 modePicker 时渲染 live/free 选择，关闭时回传所选模式。
export default function PlaceIntro({
  place,
  dark,
  reopenSignal = 0,
  onModePick,
}: {
  place: string;
  /** 不传则挂载时自动读全局 data-theme；页面有自己的明暗切换（如 /reading）才需显式传 */
  dark?: boolean;
  reopenSignal?: number;
  onModePick?: (mode: BroadcastMode) => void;
}) {
  const { lang } = useLang();
  const cfg = PLACES[place];
  const seenKey = `place_intro_${place}_seen`;

  const [show, setShow] = useState(false);
  const [step, setStep] = useState(0);
  const [autoDark, setAutoDark] = useState(false);
  const [mode, setMode] = useState<BroadcastMode>('free');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      if (!localStorage.getItem(seenKey)) setShow(true);
    } catch {
      /* localStorage 不可用则不弹 */
    }
    if (dark === undefined && typeof document !== 'undefined') {
      setAutoDark(document.documentElement.getAttribute('data-theme') === 'dark');
    }
  }, [seenKey, dark]);

  const isDark = dark ?? autoDark;

  useEffect(() => {
    if (reopenSignal > 0) {
      setStep(0);
      setShow(true);
    }
  }, [reopenSignal]);

  if (!cfg || !show || !mounted) return null;

  const steps = cfg.steps;
  const s = steps[step];
  const isLast = step === steps.length - 1;

  // 是否含模式选择步骤（电台）：关闭时要落 MODE_KEY + 回传
  const hasModePicker = steps.some((st) => st.modePicker);

  const close = () => {
    try {
      localStorage.setItem(seenKey, '1');
      if (hasModePicker) localStorage.setItem(MODE_KEY, mode);
    } catch {
      /* 忽略 */
    }
    if (hasModePicker) onModePick?.(mode);
    setShow(false);
  };

  return createPortal(
    <div
      className={`place-intro${isDark ? ' pi-dark' : ''}`}
      style={{ '--pi-accent': cfg.accent, '--pi-accent-soft': cfg.accentSoft } as React.CSSProperties}
      onClick={close}
    >
      <div className="pi-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="pi-skip" onClick={close}>
          {t('pi.skip', lang)}
        </button>

        <div className="pi-emoji" aria-hidden>{s.emoji}</div>
        <h2 className="pi-title">{s.titleKo}</h2>
        <p className="pi-title-zh">{lang === 'en' ? (s.titleZhEn ?? s.titleZh) : s.titleZh}</p>

        {s.intro && (
          <div className="pi-body">
            {s.intro.map((p, i) => (
              <p key={i}>
                <b>{p.ko}</b>
                <span className="pi-zh">{lang === 'en' ? (p.zhEn ?? p.zh) : p.zh}</span>
              </p>
            ))}
          </div>
        )}

        {s.features && (
          <div className="pi-features">
            {s.features.map((f, i) => (
              <div className="pi-feature" key={i}>
                <span className="pi-feature-ico" aria-hidden>{f.icon}</span>
                <span className="pi-feature-txt">
                  <b>{f.ko}</b>
                  <span className="pi-zh">{lang === 'en' ? (f.zhEn ?? f.zh) : f.zh}</span>
                </span>
              </div>
            ))}
          </div>
        )}

        {s.note && <div className="pi-note">{lang === 'en' ? (s.noteEn ?? s.note) : s.note}</div>}

        {s.modePicker && (
          <div className="pi-modes">
            <button
              type="button"
              className={`pi-mode${mode === 'live' ? ' on' : ''}`}
              onClick={() => setMode('live')}
            >
              <span className="pi-mode-name">🔴 실시간 편성</span>
              <span className="pi-mode-desc">방송 시간에 맞춰 하나씩 열려요</span>
              <span className="pi-mode-desc-zh">{t('radio.modeLiveDescZh', lang)}</span>
            </button>
            <button
              type="button"
              className={`pi-mode${mode === 'free' ? ' on' : ''}`}
              onClick={() => setMode('free')}
            >
              <span className="pi-mode-name">🎶 자유 청취</span>
              <span className="pi-mode-desc">오늘 방송, 언제든 골라 들어요</span>
              <span className="pi-mode-desc-zh">{t('radio.modeFreeDescZh', lang)}</span>
            </button>
          </div>
        )}

        {steps.length > 1 && (
          <div className="pi-dots" aria-hidden>
            {steps.map((_, i) => (
              <span key={i} className={`pi-dot${i === step ? ' on' : ''}`} />
            ))}
          </div>
        )}

        <div className="pi-nav">
          {step > 0 && (
            <button type="button" className="pi-prev" onClick={() => setStep((v) => v - 1)}>
              {t('pi.prev', lang)}
            </button>
          )}
          <button
            type="button"
            className="pi-next"
            onClick={() => (isLast ? close() : setStep((v) => v + 1))}
          >
            {isLast ? t('pi.done', lang) : t('pi.next', lang)}
          </button>
        </div>
      </div>
    </div>,
    document.body,
  );
}
