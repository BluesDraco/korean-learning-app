'use client';

import { useState, useEffect, useCallback, useMemo, useRef, Suspense } from 'react';
import { useSmartBack } from '@/lib/useSmartBack';
import { useRouter, useSearchParams } from 'next/navigation';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { PROGRESSIVE_STAGES, type ProgressiveLetter } from '@/data/phonetics-progressive';
import { unlockAudioContext } from '@/lib/tts';
import { playPhoneticAudio } from '@/lib/audio/phoneticsPlayer';
import {
  getDueMistakes,
  getDueSrsItems,
  markMistakePassed,
  updatePhoneticSrs,
} from '@/lib/phonetics/srs';
import type { PhoneticMistake, PhoneticSrsItem } from '@/types';
import { playSuccess, playError, playComplete } from '@/lib/soundManager';
import FlashCard from '@/components/phonetics/step/FlashCard';
import { iconBtn } from '@/components/phonetics/step/shared';
import { useAuth } from '@/components/AuthProvider';
import { Clock3, Target } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import '@/components/phonetics/step/step-rail.css';

type Mode = 'mistakes' | 'srs';

function flatLetters(): Array<ProgressiveLetter & { stage: number }> {
  const out: Array<ProgressiveLetter & { stage: number }> = [];
  for (const s of PROGRESSIVE_STAGES) {
    for (const l of s.letters) out.push({ ...l, stage: s.id });
  }
  return out;
}

function PracticeInner() {
  const { lang } = useLang();
  const { user } = useAuth();
  const params = useSearchParams();
  const router = useRouter();
  const smartBack = useSmartBack('/phonetics');
  const mode = (params.get('mode') === 'srs' ? 'srs' : 'mistakes') as Mode;
  const [loading, setLoading] = useState(true);
  const [mistakeQueue, setMistakeQueue] = useState<PhoneticMistake[]>([]);
  const [srsQueue, setSrsQueue] = useState<PhoneticSrsItem[]>([]);
  const consecutiveRef = useRef<Map<string, number>>(new Map());
  const all = flatLetters();

  useEffect(() => {
    let alive = true;
    (async () => {
      if (mode === 'mistakes') {
        const items = await getDueMistakes(user?.id);
        // 每条错题重复 2 次，错开排列（确保两次出现不相邻）
        const interleaved: PhoneticMistake[] = [];
        for (let i = 0; i < items.length; i++) interleaved.push(items[i]);
        for (let i = 0; i < items.length; i++) interleaved.push(items[i]);
        // 第二轮 Fisher-Yates 洗牌
        const second = interleaved.slice(items.length);
        for (let i = second.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          [second[i], second[j]] = [second[j], second[i]];
        }
        const final = [...interleaved.slice(0, items.length), ...second];
        if (alive) setMistakeQueue(final);
      } else {
        const items = await getDueSrsItems(20, user?.id);
        if (alive) setSrsQueue(items);
      }
      if (alive) setLoading(false);
    })();
    return () => { alive = false; };
  }, [mode]);

  // ─── 错题模式 ───
  const [mIdx, setMIdx] = useState(0);
  const [mPicked, setMPicked] = useState<string | null>(null);

  const mCurrent = mistakeQueue[mIdx];
  const mTarget = mCurrent ? all.find((l) => l.jamo === mCurrent.targetJamo) : null;
  const mWrong = mCurrent ? all.find((l) => l.jamo === mCurrent.wrongJamo) : null;
  // 锁定到 mCurrent.id：同一道题选项不变，避免点错后干扰项跳变
  const mOptions = useMemo(() => {
    if (!mTarget || !mWrong) return [] as Array<ProgressiveLetter & { stage: number }>;
    // 干扰项限制：同 stage（target 所属阶段），避免拿到未学过的字母
    // 例如：错题在 stage 2 的 ㅐ vs ㅔ，干扰项只能从 stage 2 的复合元音里抽
    const stageScoped = all.filter((l) => l.stage === mTarget.stage && l.jamo !== mTarget.jamo && l.jamo !== mWrong.jamo);
    const shuffled = [...stageScoped].sort(() => Math.random() - 0.5);
    const pool = [mTarget, mWrong, shuffled[0], shuffled[1]].filter((x): x is ProgressiveLetter & { stage: number } => !!x);
    return [...pool].sort(() => Math.random() - 0.5);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mCurrent?.id]);

  const onPlayMistake = useCallback(() => {
    if (!mTarget) return;
    unlockAudioContext();
    playPhoneticAudio(mTarget.syllable);
  }, [mTarget]);

  // 自动播放新题：仅当 target 切换时播一次，避免 onPlayMistake 函数引用变化引发重复
  const lastPlayedTargetRef = useRef<string | null>(null);
  useEffect(() => {
    if (mode !== 'mistakes' || !mTarget) return;
    const key = mTarget.syllable;
    if (lastPlayedTargetRef.current === key) return;
    lastPlayedTargetRef.current = key;
    setMPicked(null);
    onPlayMistake();
  }, [mode, mTarget, onPlayMistake]);

  const handleMistakePick = async (jamo: string) => {
    if (!mCurrent || mPicked) return;
    setMPicked(jamo);
    const correct = jamo === mCurrent.targetJamo;
    if (correct) playSuccess(); else playError();
    const key = mCurrent.id;
    const cur = consecutiveRef.current.get(key) ?? 0;
    const next = correct ? cur + 1 : 0;
    consecutiveRef.current.set(key, next);
    if (correct) await markMistakePassed(mCurrent.id, next, user?.id);
  };

  const handleMistakeNext = () => {
    if (mIdx + 1 >= mistakeQueue.length) {
      playComplete();
      router.push('/phonetics');
      return;
    }
    setMIdx(mIdx + 1);
    setMPicked(null);
  };

  // ─── SRS 模式 ───
  const [sIdx, setSIdx] = useState(0);
  const sCurrent = srsQueue[sIdx];
  const sLetter = sCurrent ? all.find((l) => l.jamo === sCurrent.jamo) : null;

  const handleSrsRate = async (quality: 0 | 3 | 5) => {
    if (!sCurrent) return;
    await updatePhoneticSrs(sCurrent.jamo, quality, user?.id);
    if (sIdx + 1 >= srsQueue.length) {
      playComplete();
      router.push('/phonetics');
      return;
    }
    setSIdx(sIdx + 1);
  };

  // ─── 渲染 ───

  const queue = mode === 'mistakes' ? mistakeQueue : srsQueue;
  const queueIdx = mode === 'mistakes' ? mIdx : sIdx;
  const queueTotal = queue.length;
  const donePct = queueTotal > 0 ? Math.round((queueIdx / queueTotal) * 100) : 0;

  return (
    <div className="sr-shell">
    <div className="sr-main">
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '0 16px 96px' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
        <button onClick={smartBack} aria-label={t('phonetics.review_exit_aria', lang)} style={iconBtn}><ArrowLeft size={18} /></button>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--color-ink-3)' }}>
          {mode === 'mistakes' ? t('phonetics.review_mode_mistakes', lang) : t('phonetics.review_mode_srs', lang)}
        </div>
        <div style={{ width: 44 }} />
      </div>

      {loading ? (
        <div style={{ textAlign: 'center', padding: 48, color: 'var(--color-ink-3)' }}>{t('phonetics.review_loading', lang)}</div>
      ) : mode === 'mistakes' ? (
        mistakeQueue.length === 0 ? (
          <EmptyState text={t('phonetics.review_empty_mistakes', lang)} />
        ) : !mTarget ? <EmptyState text={t('phonetics.review_bad_mistake_data', lang)} /> : (
          <div>
            <ProgressBar cur={mIdx + 1} total={mistakeQueue.length} />
            <div style={{ textAlign: 'center', marginBottom: 16, fontSize: 13, color: 'var(--color-ink-3)' }}>
              {t('phonetics.review_mistake_recap_1', lang)} <b style={{ color: 'var(--color-status-danger)' }}>{mCurrent.targetJamo}</b> {t('phonetics.review_mistake_recap_2', lang)} <b style={{ color: 'var(--color-ink-1)' }}>{mCurrent.wrongJamo}</b> {t('phonetics.review_mistake_recap_3', lang, { n: mCurrent.wrongCount })}
            </div>

            <div style={{ marginBottom: 24, textAlign: 'center' }}>
              <button onClick={onPlayMistake} aria-label={t('phonetics.review_play_audio_aria', lang)} style={{
                width: 88, height: 88, borderRadius: '50%', border: 'none',
                background: 'linear-gradient(135deg, var(--color-pink-base), var(--color-peach-base))',
                color: '#fff', cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(255,127,168,.3)',
              }}><Volume2 size={32} /></button>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, maxWidth: 420, margin: '0 auto' }}>
              {mOptions.map((opt) => {
                const isCorrect = opt.jamo === mCurrent.targetJamo;
                const isPicked = mPicked === opt.jamo;
                let bg = 'var(--color-surface-2)';
                let border = '2px solid var(--color-border-2)';
                if (mPicked) {
                  if (isCorrect) { bg = 'var(--color-mint-soft)'; border = '2px solid var(--color-status-success)'; }
                  else if (isPicked) { bg = 'var(--color-pink-soft)'; border = '2px solid var(--color-status-danger)'; }
                }
                return (
                  <button key={opt.jamo} onClick={() => handleMistakePick(opt.jamo)} disabled={!!mPicked} style={{
                    fontWeight: 700, fontSize: 42, padding: '20px 16px',
                    background: bg, border, borderRadius: 16,
                    color: 'var(--color-ink-1)',
                    cursor: mPicked ? 'default' : 'pointer',
                    transition: 'all .2s',
                  }}>{opt.jamo}</button>
                );
              })}
            </div>

            {mPicked && (
              <div style={{ marginTop: 20, textAlign: 'center' }}>
                <button onClick={handleMistakeNext} style={{
                  padding: '12px 24px', fontSize: 15, fontWeight: 500,
                  borderRadius: 12, border: 'none', cursor: 'pointer',
                  background: 'var(--color-pink-base)', color: '#fff',
                }}>{mIdx + 1 >= mistakeQueue.length ? t('phonetics.review_done_to_overview', lang) : t('phonetics.review_next', lang)}</button>
              </div>
            )}
          </div>
        )
      ) : (
        srsQueue.length === 0 ? (
          <EmptyState text={t('phonetics.review_empty_srs', lang)} />
        ) : !sLetter ? <EmptyState text={t('phonetics.review_bad_letter_data', lang)} /> : (
          <div>
            <ProgressBar cur={sIdx + 1} total={srsQueue.length} />
            <FlashCard letter={sLetter} stage={sCurrent.stage} onRate={handleSrsRate} />
          </div>
        )
      )}
    </div>
    </div>

    {/* ── 桌面专属右栏（复习速览，非 stage 流程） ── */}
    <aside className="sr-rail" aria-label={t('phonetics.review_rail_aria', lang)}>
      <div className="sr-card">
        <div className="sr-card-title"><Clock3 size={13} className="sr-ico" /> {t('phonetics.review_rail_this_session', lang)}</div>
        <div className="sr-ring-wrap" style={{ marginTop: 4 }}>
          <div className="sr-ring">
            <svg width="76" height="76" viewBox="0 0 76 76">
              <circle className="sr-ring-track" cx="38" cy="38" r="32" fill="none" strokeWidth="6" />
              <circle className="sr-ring-fill" cx="38" cy="38" r="32" fill="none" strokeWidth="6"
                strokeDasharray={2 * Math.PI * 32} strokeDashoffset={2 * Math.PI * 32 * (1 - donePct / 100)} />
            </svg>
            <div className="sr-ring-num">{donePct}%</div>
          </div>
          <div className="sr-ring-meta">
            {queueTotal > 0 ? <>{t('phonetics.review_ring_done', lang)} <b>{Math.min(queueIdx + 1, queueTotal)}</b> / {queueTotal}<br />{mode === 'mistakes' ? t('phonetics.review_ring_unit_mistakes', lang) : t('phonetics.review_ring_unit_srs', lang)}</> : t('phonetics.review_ring_empty', lang)}
          </div>
        </div>
      </div>

      <div className="sr-card">
        <div className="sr-card-title"><Target size={13} className="sr-ico" /> {t('phonetics.review_switch_mode', lang)}</div>
        <div className="sr-mode-tabs">
          <button className={`sr-mode-tab${mode === 'mistakes' ? ' active' : ''}`}
            onClick={() => { if (mode !== 'mistakes') router.push('/phonetics/step/practice?mode=mistakes'); }}>
            {t('phonetics.review_mode_mistakes', lang)}<span className="sr-mode-en">Mistakes</span>
          </button>
          <button className={`sr-mode-tab${mode === 'srs' ? ' active' : ''}`}
            onClick={() => { if (mode !== 'srs') router.push('/phonetics/step/practice?mode=srs'); }}>
            {t('phonetics.review_mode_srs', lang)}<span className="sr-mode-en">Review</span>
          </button>
        </div>
      </div>
    </aside>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  const { lang } = useLang();
  const smartBack = useSmartBack('/phonetics');
  return (
    <div style={{
      background: 'var(--color-surface-2)',
      border: '1px solid var(--color-border-1)',
      borderRadius: 'var(--radius-md)',
      padding: 32, textAlign: 'center',
      color: 'var(--color-ink-3)', fontSize: 14, lineHeight: 1.6,
    }}>
      {text}
      <div style={{ marginTop: 16 }}>
        <button onClick={smartBack} style={{
          display: 'inline-block', padding: '10px 20px',
          background: 'var(--color-pink-base)', color: '#fff',
          borderRadius: 10, textDecoration: 'none', fontSize: 14, fontWeight: 500,
        }}>{t('phonetics.review_back_to_overview', lang)}</button>
      </div>
    </div>
  );
}

function ProgressBar({ cur, total }: { cur: number; total: number }) {
  const { lang } = useLang();
  return (
    <div style={{ marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11, color: 'var(--color-ink-3)', fontFamily: 'ui-monospace, monospace', marginBottom: 6 }}>
        <span>{t('phonetics.review_progress', lang, { cur, total })}</span>
      </div>
      <div style={{ height: 6, background: 'var(--color-surface-4)', borderRadius: 3, overflow: 'hidden' }}>
        <div style={{
          height: '100%', width: `${(cur / total) * 100}%`,
          background: 'linear-gradient(90deg, var(--color-pink-base), var(--color-peach-base))',
          transition: 'width .4s ease',
        }} />
      </div>
    </div>
  );
}

export default function PracticePage() {
  const { lang } = useLang();
  return (
    <Suspense fallback={<div style={{ padding: 24 }}>{t('phonetics.review_loading', lang)}</div>}>
      <PracticeInner />
    </Suspense>
  );
}
