'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { updateProfile, awardXp, updateStreak } from '@/lib/gamification';
import { useAuth } from '@/components/AuthProvider';
import { useTheme } from '@/components/ThemeProvider';
import { setLang, getLang, t, type Lang } from '@/lib/i18n';
import './place-intro.css';

interface Props {
  [k: string]: unknown;
  onComplete: () => void;
}

// 首次登录 · 欢迎来到动物城（改造自旧功能引导，视觉对齐 PlaceIntro）。
// 保留原有门控（profile.onboardingComplete）+ XP + streak 奖励逻辑。
const PLACE_IDS = [
  { icon: '📚', id: 'library',  kr: '도서관' },
  { icon: '🎓', id: 'classroom', kr: '교실' },
  { icon: '🦉', id: 'study',    kr: '자습실' },
  { icon: '📻', id: 'radio',    kr: '라디오' },
  { icon: '🗣️', id: 'plaza',    kr: '광장' },
  { icon: '📓', id: 'diary',    kr: '일기' },
];

const LANGS: { code: Lang; label: string; sub: string; flag: string }[] = [
  { code: 'zh', label: '简体中文', sub: '中文界面', flag: '🇨🇳' },
  { code: 'en', label: 'English', sub: 'English UI', flag: '🇬🇧' },
];

export default function Onboarding({ onComplete }: Props) {
  const router = useRouter();
  const { refreshUser } = useAuth();
  const { theme } = useTheme();
  const [step, setStep] = useState(0);
  const [lang, setLangState] = useState<Lang>(() => getLang());

  const chooseLang = useCallback((code: Lang) => {
    setLang(code);
    setLangState(code);
  }, []);

  const finish = useCallback(async () => {
    try { await updateProfile({ onboardingComplete: true }); } catch { /* not critical */ }
    try { await fetch('/api/auth/onboarding', { method: 'POST' }); } catch { /* not critical */ }
    // 刷新内存 user，使 user.onboardingCompleted 变 true，否则 daily 会反复重弹
    try { await refreshUser(); } catch { /* not critical */ }
    try { await awardXp(10); } catch { /* not critical */ }
    try { await updateStreak(); } catch { /* not critical */ }
    onComplete();
    router.replace('/daily');
  }, [onComplete, router, refreshUser]);

  const isLast = step === 2;

  return (
    <div
      className={`place-intro${theme === 'dark' ? ' pi-dark' : ''}`}
      style={{ '--pi-accent': 'oklch(64% 0.17 12)', '--pi-accent-soft': 'oklch(92% 0.05 12)' } as React.CSSProperties}
    >
      <div className="pi-card">
        {step === 0 ? (
          <>
            <div className="pi-emoji" aria-hidden>🌏</div>
            <h2 className="pi-title">언어를 선택하세요</h2>
            <p className="pi-title-zh">{t('lang.choose_prompt', lang)}</p>
            <div className="pi-langs">
              {LANGS.map((l) => (
                <button
                  type="button"
                  key={l.code}
                  className={`pi-lang${lang === l.code ? ' on' : ''}`}
                  onClick={() => chooseLang(l.code)}
                  aria-pressed={lang === l.code}
                >
                  <span className="pi-lang-flag" aria-hidden>{l.flag}</span>
                  <span className="pi-lang-label">{l.label}</span>
                  <span className="pi-lang-sub">{l.sub}</span>
                </button>
              ))}
            </div>
          </>
        ) : step === 1 ? (
          <>
            <div className="pi-emoji" aria-hidden>🐰</div>
            <h2 className="pi-title">동물 도시에 온 걸 환영해요!</h2>
            <p className="pi-title-zh">{t('onboard.welcomeTitle', lang)}</p>
            <div className="pi-body">
              <p>
                <b>여긴 토리랑 친구들이 사는 동네예요.</b>
                <span className="pi-zh">{t('onboard.welcomeP1', lang)}</span>
              </p>
              <p>
                <b>사실 동물 도시는 여러분이 배우는 한국이에요.</b>
                <span className="pi-zh">{t('onboard.welcomeP2', lang)}</span>
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="pi-emoji" aria-hidden>🗺️</div>
            <h2 className="pi-title">어디부터 가 볼까요?</h2>
            <p className="pi-title-zh">{t('onboard.placesTitle', lang)}</p>
            <div className="pi-places">
              {PLACE_IDS.map((p) => (
                <div className="pi-place" key={p.id}>
                  <span className="pi-place-ico" aria-hidden>{p.icon}</span>
                  <span className="pi-place-name">{t(`onboard.place.${p.id}.name`, lang)}<span className="kr">{p.kr}</span></span>
                  <span className="pi-place-desc">{t(`onboard.place.${p.id}.desc`, lang)}</span>
                </div>
              ))}
            </div>
            <div className="pi-note">🥕 천천히 해요, 토리가 기다릴게요 · {t('onboard.note', lang)}</div>
          </>
        )}

        <div className="pi-dots" aria-hidden>
          <span className={`pi-dot${step === 0 ? ' on' : ''}`} />
          <span className={`pi-dot${step === 1 ? ' on' : ''}`} />
          <span className={`pi-dot${step === 2 ? ' on' : ''}`} />
        </div>

        <div className="pi-nav">
          {step > 0 && (
            <button type="button" className="pi-prev" onClick={() => setStep(step - 1)}>
              이전
            </button>
          )}
          <button
            type="button"
            className="pi-next"
            onClick={() => (isLast ? finish() : setStep(step + 1))}
          >
            {isLast ? `동물 도시 시작하기 · ${t('onboard.start', lang)}` : `다음 · ${t('onboard.next', lang)}`}
          </button>
        </div>
      </div>
    </div>
  );
}
