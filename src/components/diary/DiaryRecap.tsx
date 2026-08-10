'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import type { ToriDay } from '@/types/tori-diary';
import { Home } from 'lucide-react';
import { sfxPop } from '@/lib/sfx';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  day: ToriDay;
  onComplete: () => void;
}

const PALETTE_BG: Record<string, string> = {
  pink: 'linear-gradient(135deg, #ffe4ee, #fff8fb)',
  mint: 'linear-gradient(135deg, #e3f5f0, #f4fbf8)',
  yellow: 'linear-gradient(135deg, #fdf4e3, #fffaf0)',
  cream: 'linear-gradient(135deg, #f5edd9, #fcf7ec)',
  gold: 'linear-gradient(135deg, #e9d3a4, #fdf4e3)',
  peach: 'linear-gradient(135deg, #ffefe6, #fff7f1)',
  purple: 'linear-gradient(135deg, #efe7ff, #f7f3ff)',
};

// 场景首次出现 Day → 解锁提示
const DAY_SCENES: Record<number, { ko: string; cn: string; en: string; icon: string }[]> = {
  3:  [{ ko: '인공공항', cn: '仁爪机场', en: 'Injaw Airport', icon: '✈️' }],
  4:  [{ ko: '한빛 기숙사', cn: '宿舍', en: 'Dormitory', icon: '🏠' }],
  5:  [{ ko: '문화공원', cn: '文化公园', en: 'Culture Park', icon: '🌳' }],
  6:  [{ ko: 'LUMI PAW', cn: '偶像团体', en: 'Idol Group', icon: '🌟' }],
  7:  [{ ko: '지하철역', cn: '地铁站', en: 'Subway Station', icon: '🚇' }],
  9:  [{ ko: 'CU 편의점', cn: 'CU便利店', en: 'CU Convenience Store', icon: '🏪' }],
  10: [{ ko: '학교 식당', cn: '食堂', en: 'Cafeteria', icon: '🍽️' }],
  11: [{ ko: '다이소', cn: '日用品店', en: 'Daiso', icon: '🧴' }],
  12: [{ ko: '문구점', cn: '文具店', en: 'Stationery Shop', icon: '✏️' }],
  13: [{ ko: '약국', cn: '药店', en: 'Pharmacy', icon: '💊' }],
  14: [{ ko: '하루 카페', cn: '咖啡馆', en: 'Cafe', icon: '☕' }],
  16: [{ ko: '부동산', cn: '房产中介', en: 'Real Estate Office', icon: '🔑' }],
  18: [{ ko: '수민은행', cn: '兽民银行', en: 'Sumin Bank', icon: '🏦' }],
  19: [{ ko: '병원', cn: '医院', en: 'Hospital', icon: '🏥' }],
  23: [{ ko: '홍공거리', cn: '弘爪街', en: 'Honggong Street', icon: '🌃' }],
  26: [{ ko: '중앙공원', cn: '中央公园', en: 'Central Park', icon: '🌲' }],
  27: [{ ko: '고기집', cn: '烤肉店', en: 'BBQ Restaurant', icon: '🥩' }],
  28: [{ ko: '생카카페', cn: '签售会', en: 'Fan Meet Cafe', icon: '💫' }],
  30: [{ ko: '시험장', cn: '考试大厅', en: 'Exam Hall', icon: '📝' }],
};

export function DiaryRecap({ day, onComplete }: Props) {
  const { lang } = useLang();
  const router = useRouter();
  const smartBack = useSmartBack('/diary');
  const sceneUrl = day.recap?.sceneImageUrl;
  const [sceneImgError, setSceneImgError] = useState(false);
  const [stamped, setStamped] = useState(false);
  const [redirecting, setRedirecting] = useState(false);
  const completedRef = useRef(false);
  const unmountedRef = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => () => { unmountedRef.current = true; }, []);

  // 等当天贴纸在 /api/progress 出现（最多 ~3s），再跳到动物城
  const gotoAnimalCity = async () => {
    if (redirecting) return;
    setRedirecting(true);
    for (let i = 0; i < 6; i++) {
      try {
        const res = await fetch('/api/progress', { credentials: 'same-origin', cache: 'no-store' });
        const data = await res.json();
        if (Array.isArray(data?.collectedDays) && data.collectedDays.includes(day.day)) break;
      } catch { /* ignore */ }
      if (unmountedRef.current) return;
      await new Promise((r) => setTimeout(r, 500));
    }
    if (unmountedRef.current) return;
    window.location.href = '/animal-city.html';
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setStamped(true);
      if (!completedRef.current) {
        completedRef.current = true;
        onCompleteRef.current();
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [day.day]);

  return (
    <>
      <div className="diary-anim-fade-up" style={{ textAlign: 'center' }}>
        <div style={{ marginBottom: 18 }}>
          <span className="diary-tag" style={{ background: 'var(--diary-stamp-red)', color: '#fff' }}>
            {t('diary.recap.tag', lang)}
          </span>
        </div>

        <h2 className="diary-h2 diary-handwriting-zh" style={{ marginBottom: 8 }}>
          {day.recap.praise}
        </h2>

        <p className="diary-handwriting-zh diary-text-soft" style={{ fontSize: 'var(--diary-text-md)', marginBottom: 30 }}>
          {t('diary.recap.dayDone', lang, { n: day.day })}
        </p>

        <div
          className={stamped ? 'diary-anim-stamp' : ''}
          style={{
            position: 'relative',
            width: '100%',
            maxWidth: 270,
            aspectRatio: '9 / 16',
            margin: '0 auto 32px',
            borderRadius: 'var(--diary-r-md)',
            overflow: 'hidden',
            background: PALETTE_BG.cream,
            border: '1.5px solid var(--diary-gold)',
            boxShadow: '0 16px 36px -14px rgba(58, 42, 30, 0.4)',
            opacity: stamped ? 1 : 0,
          }}
        >
          {sceneUrl && !sceneImgError ? (
            <img
              src={sceneUrl}
              alt={day.title}
              loading="eager"
              decoding="async"
              fetchPriority="high"
              onError={() => setSceneImgError(true)}
              style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
            />
          ) : (
            <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <div style={{ fontSize: 96, opacity: 0.5, lineHeight: 1 }}>🐰</div>
            </div>
          )}
          <div style={{
            position: 'absolute', right: 10, bottom: 10, padding: '8px 12px',
            background: 'rgba(252, 247, 236, 0.94)', border: '1.5px solid var(--diary-gold)',
            borderRadius: 'var(--diary-r-sm)', backdropFilter: 'blur(4px)',
            boxShadow: '0 4px 10px -3px rgba(58, 42, 30, 0.25)', maxWidth: '78%',
          }}>
            <div className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-sm)', fontWeight: 700, color: 'var(--diary-ink)', lineHeight: 1.3 }}>
              {day.title}
            </div>
            <div className="diary-handwriting-zh" style={{ fontSize: 11, color: 'var(--diary-ink-soft)', lineHeight: 1.4, marginTop: 2 }}>
              {day.subtitle}
            </div>
          </div>
        </div>

        {/* 新场景解锁 */}
        {(() => { const newScenes = DAY_SCENES[day.day] ?? []; if (newScenes.length === 0) return null; return (
          <div style={{
            textAlign: 'left', maxWidth: 460, margin: '0 auto 28px',
            background: 'var(--color-mint-soft)',
            border: '1.5px solid var(--color-mint-base)', borderRadius: 'var(--diary-r-md)',
            padding: '16px 18px',
          }}>
            <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--color-mint-strong)', marginBottom: 10, letterSpacing: '0.06em' }}>
              {t('diary.recap.newSceneUnlocked', lang)}
            </div>
            {newScenes.map((s, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: i < newScenes.length - 1 ? 8 : 0 }}>
                <span style={{ fontSize: 22 }}>{s.icon}</span>
                <div>
                  <div style={{ fontSize: 14, fontWeight: 700, color: 'var(--diary-ink)' }}>{s.ko}</div>
                  <div style={{ fontSize: 12, color: 'var(--diary-ink-soft)' }}>{lang === 'en' ? s.en : s.cn}</div>
                </div>
              </div>
            ))}
            <div style={{ marginTop: 12 }}>
              <button
                className="diary-btn"
                onClick={() => {
                  sfxPop();
                  if (newScenes[0].cn === '偶像团体') { window.location.href = '/lumi-paw.html'; return; }
                  gotoAnimalCity();
                }}
                disabled={redirecting}
                style={{
                  width: '100%', background: 'var(--color-mint-strong)', color: '#fff',
                  fontSize: 14, height: 40, fontWeight: 600,
                  border: 'none', boxShadow: '0 2px 8px rgba(129,199,132,.3)',
                  opacity: redirecting ? 0.7 : 1,
                }}
              >
                {redirecting ? t('diary.recap.preparing', lang) : (newScenes[0].cn === '偶像团体' ? t('diary.recap.gotoLumiPaw', lang) : t('diary.recap.gotoAnimalCity', lang))}
              </button>
            </div>
          </div>
        ); })()}

        <div className="diary-card-paper" style={{
          textAlign: 'left', background: 'var(--diary-paper)',
          borderLeft: '3px solid var(--diary-stamp-red)', padding: '14px 18px',
          marginBottom: 28, maxWidth: 460, marginLeft: 'auto', marginRight: 'auto',
        }}>
          <span className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-xs)', color: 'var(--diary-stamp-red)', fontWeight: 700, letterSpacing: '0.06em' }}>
            {t('diary.recap.tomorrow', lang)}
          </span>
          <p className="diary-handwriting-zh" style={{ fontSize: 'var(--diary-text-md)', color: 'var(--diary-ink)', marginTop: 6, lineHeight: 1.7 }}>
            {day.recap.preview}
          </p>
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button
            className="diary-btn"
            onClick={() => { sfxPop(); window.location.href = '/sticker.html'; }}
            style={{
              flex: 1, maxWidth: 180,
              background: 'transparent',
              color: 'var(--diary-ink-soft)',
              border: '1px solid var(--diary-line)',
              boxShadow: 'none',
              fontSize: 14, height: 48,
            }}
          >
            {t('diary.recap.stickerCollection', lang)}
          </button>
          <button
            className="diary-btn"
            onClick={() => {
              sfxPop();
              if (!completedRef.current) { completedRef.current = true; onCompleteRef.current(); }
              smartBack();
            }}
            style={{
              flex: 1, maxWidth: 200,
              background: 'var(--diary-grad-accent)', color: '#fff',
              fontSize: 15, height: 48, fontWeight: 600,
              boxShadow: '0 4px 16px rgba(255,127,168,.32)',
            }}
          >
            <Home size={14} /> {t('diary.recap.backToDiary', lang)}
          </button>
        </div>
      </div>

    </>
  );
}
