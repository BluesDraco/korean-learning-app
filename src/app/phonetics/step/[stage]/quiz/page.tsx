'use client';

import { useState, useEffect, useCallback, useMemo, useRef, use } from 'react';
import { useRouter } from 'next/navigation';
import { useSmartBack } from '@/lib/useSmartBack';
import { ArrowLeft, Volume2 } from 'lucide-react';
import { getStage, HOMOPHONE_GROUPS, homophoneKey, type ProgressiveLetter } from '@/data/phonetics-progressive';
import { unlockAudioContext } from '@/lib/tts';
import { playPhoneticAudio, preloadPhoneticAudio } from '@/lib/audio/phoneticsPlayer';
import { recordPhoneticStep } from '@/lib/lesson/recordPhoneticStep';
import { recordPhoneticMistake } from '@/lib/phonetics/srs';
import { playSuccess, playError, playComplete } from '@/lib/soundManager';
import ComboBadge from '@/components/phonetics/step/ComboBadge';
import QuizFeedback from '@/components/phonetics/step/QuizFeedback';
import { iconBtn } from '@/components/phonetics/step/shared';
import { StepRail } from '@/components/phonetics/step/StepRail';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const TOTAL_Q = 10;

interface Question {
  target: ProgressiveLetter;
  options: ProgressiveLetter[];
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function buildQuestion(pool: ProgressiveLetter[]): Question {
  const target = pool[Math.floor(Math.random() * pool.length)];
  const targetGroup = homophoneKey(target.jamo);
  const wrongs: ProgressiveLetter[] = [];
  for (const cand of shuffle(pool)) {
    if (wrongs.length >= 3) break;
    if (cand.jamo === target.jamo) continue;
    if (homophoneKey(cand.jamo) === targetGroup) continue; // 排除同音字
    if (wrongs.some((w) => w.jamo === cand.jamo)) continue;
    if (wrongs.some((w) => homophoneKey(w.jamo) === homophoneKey(cand.jamo))) continue; // 干扰项之间也不同音
    wrongs.push(cand);
  }
  return { target, options: shuffle([target, ...wrongs]) };
}

const QUIZ_CSS = `
  .ph-ds-quiz { max-width: 560px; padding-bottom: calc(220px + env(safe-area-inset-bottom, 0px)); }
  .ph-quiz-card { padding: 0; }
  .ph-quiz-hero { padding: 28px 24px 24px; background: linear-gradient(160deg, var(--color-pink-soft) 0%, var(--color-surface-1) 60%); display: flex; flex-direction: column; align-items: center; }
  .ph-quiz-content { padding: 24px 22px 28px; }
  .ph-quiz-feedback-side { display: none; }
  @media (min-width: 1024px) and (max-width: 1399px) { .ph-ds-quiz { max-width: 960px; } }
  /* 双栏仅在 ≥1400px 桌面启用；iPad 横屏保持单栏 */
  @media (min-width: 1400px) {
    .ph-ds-quiz { max-width: 1080px; padding-bottom: 60px; }
    .ph-quiz-card { display: grid; grid-template-columns: 1fr 1fr; gap: 0; min-height: 600px; overflow: hidden; }
    .ph-quiz-hero { padding: 48px 36px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; }
    .ph-quiz-content { padding: 36px 32px; display: flex; flex-direction: column; overflow-y: auto; -webkit-overflow-scrolling: touch; }
    .ph-quiz-feedback-side { display: block; }
    .ph-quiz-feedback-fixed { display: none; }
  }
  @keyframes phQuizPulseRing { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(1.8); opacity: 0; } }
  @keyframes phQuizShake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
`;

export default function QuizPage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageStr } = use(params);
  const stageId = parseInt(stageStr, 10) || 1;
  const stage = getStage(stageId);
  const router = useRouter();
  const smartBack = useSmartBack('/phonetics');
  const { user } = useAuth();
  const { lang } = useLang();

  const pool = useMemo(() => stage?.letters ?? [], [stage]);

  const [qNum, setQNum] = useState(1);
  const [q, setQ] = useState<Question | null>(null);
  const initRef = useRef(false);
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [combo, setCombo] = useState(0);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const rightRef = useRef(0);
  const wrongRef = useRef(0);
  const [elapsed, setElapsed] = useState(0);
  const startRef = useRef(Date.now());
  const recordedRef = useRef(false);

  useEffect(() => {
    if (initRef.current) return;
    if (pool.length > 0) {
      initRef.current = true;
      setQ(buildQuestion(pool));
      // 只预热前几个，避免进页面就并发下载整池 MP3（弱网带宽尖峰）。
      // 其余音节在 playPhoneticAudio 首次播放时按需创建 Audio（内部有 audioPool 缓存）。
      for (const l of pool.slice(0, 4)) preloadPhoneticAudio(l.syllable);
    }
  }, [pool]);

  useEffect(() => {
    const timer = setInterval(() => setElapsed(Math.floor((Date.now() - startRef.current) / 1000)), 1000);
    return () => clearInterval(timer);
  }, []);

  // 自动播放当前题（严格模式下 effect 会跑两次，用 ref 保证每个 q 只播一次）
  const playedQRef = useRef<Question | null>(null);
  useEffect(() => {
    if (q && playedQRef.current !== q) {
      playedQRef.current = q;
      unlockAudioContext();
      playPhoneticAudio(q.target.syllable);
    }
  }, [q]);

  const replay = useCallback((rate = 1) => {
    if (!q) return;
    unlockAudioContext();
    playPhoneticAudio(q.target.syllable, rate);
  }, [q]);

  const handlePick = (opt: ProgressiveLetter) => {
    if (!q || picked || revealed) return;
    setPicked(opt.jamo);
    const correct = opt.jamo === q.target.jamo;
    if (correct) {
      playSuccess();
      rightRef.current += 1;
      setRight(rightRef.current);
      setCombo((c) => c + 1);
    } else {
      playError();
      wrongRef.current += 1;
      setWrong(wrongRef.current);
      setCombo(0);
      recordPhoneticMistake(q.target.jamo, opt.jamo, stageId, user?.id).catch(() => { /* ignore */ });
      // 答错 1.5s 后重置选择，让用户继续猜（不扣血、不给答案）
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      retryTimerRef.current = setTimeout(() => { setPicked(null); }, 1500);
    }
  };

  const handleReveal = () => {
    if (retryTimerRef.current) { clearTimeout(retryTimerRef.current); retryTimerRef.current = null; }
    setRevealed(true);
  };

  useEffect(() => () => {
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
  }, []);

  const finishSession = useCallback(async (passed: boolean) => {
    if (recordedRef.current) return;
    recordedRef.current = true;
    if (passed) {
      playComplete();
      try {
        await recordPhoneticStep(stageId, 'quiz', {
          correctCount: rightRef.current,
          wrongCount: wrongRef.current,
          studyMinutes: 2,
        });
      } catch { /* ignore */ }
    }
    router.push(`/phonetics/step/${stageId}/blend`);
  }, [router, stageId]);

  const handleNext = () => {
    if (qNum >= TOTAL_Q) {
      finishSession(true);
      return;
    }
    setPicked(null);
    setRevealed(false);
    setQNum((n) => n + 1);
    setQ(buildQuestion(pool));
  };

  if (!stage) return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{t('phonetics.stage_not_found', lang)}</p>
      <button onClick={() => router.push('/phonetics')} style={{ color: 'var(--color-pink-strong)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>{t('phonetics.back_to_phonetics', lang)}</button>
    </div>
  );
  if (pool.length === 0) return (
    <div style={{ padding: 24, display: 'flex', flexDirection: 'column', gap: 12, alignItems: 'flex-start' }}>
      <p style={{ color: 'var(--text-muted)', fontSize: 14 }}>{t('phonetics.stage_not_open', lang)}</p>
      <button onClick={() => router.push('/phonetics')} style={{ color: 'var(--color-pink-strong)', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>{t('phonetics.back_to_phonetics', lang)}</button>
    </div>
  );
  if (!q) return <div style={{ padding: 24 }}>{t('phonetics.loading', lang)}</div>;

  const answered = picked !== null;
  const isRight = picked === q.target.jamo;
  const isWrongPicked = answered && !isRight;
  const showAnswer = isRight || revealed;
  const elapsedM = Math.floor(elapsed / 60);
  const elapsedS = elapsed % 60;
  const timeOver = elapsed > 20 && !answered;

  return (
    <div className="sr-shell">
    <div className="sr-main">
    <div className="ph-ds-quiz" style={{ margin: '0 auto', padding: '0 16px' }}>
      <style>{QUIZ_CSS}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0', flexWrap: 'wrap' }}>
        <button onClick={smartBack} aria-label={t('phonetics.stepquiz_exit', lang)} style={iconBtn}><ArrowLeft size={16} /></button>
        <div style={{ flex: 1, height: 6, background: 'var(--color-surface-4)', borderRadius: 3, overflow: 'hidden', position: 'relative', minWidth: 120 }}>
          <div style={{
            height: '100%', width: `${(qNum / TOTAL_Q) * 100}%`,
            background: 'linear-gradient(90deg, var(--color-pink-base), var(--color-peach-base))',
            borderRadius: 3, transition: 'width .5s ease',
          }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            fontFamily: 'ui-monospace, monospace', fontSize: 12, fontWeight: 700,
            color: timeOver ? 'var(--color-status-danger)' : 'var(--color-ink-3)',
            background: timeOver ? 'var(--color-pink-soft)' : 'var(--color-surface-3)',
            padding: '6px 12px', borderRadius: 999, whiteSpace: 'nowrap',
          }}>⏱ {elapsedM}:{String(elapsedS).padStart(2, '0')}</div>
          <ComboBadge combo={combo} />
        </div>
      </div>

      <div className="ph-quiz-card" style={{
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border-2)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 4px 20px rgba(58,46,41,.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--color-pink-base), var(--color-peach-base), var(--color-purple-base))', zIndex: 1 }} />

        <div className="ph-quiz-hero">
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--color-pink-strong)', textAlign: 'center' }}>
            ◆ Stage {stageId} · {t('phonetics.stepquiz_question_counter', lang, { n: qNum, total: TOTAL_Q })}
          </div>
          <div style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 22, color: 'var(--color-ink-1)', textAlign: 'center' }}>
            {t('phonetics.stepquiz_title_prefix', lang)}<em style={{ fontStyle: 'italic', color: 'var(--color-pink-strong)' }}>{t('phonetics.stepquiz_title_em', lang)}</em>
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-ink-2)', textAlign: 'center', maxWidth: 320 }}>
            {t('phonetics.stepquiz_subtitle', lang)}
          </div>

          <div style={{
            position: 'relative',
            width: 112, height: 112,
            marginTop: 8,
            flexShrink: 0,
          }}>
            <button
              onClick={() => replay()}
              aria-label={t('phonetics.stepquiz_play_audio', lang)}
              style={{
                width: '100%', height: '100%', borderRadius: '50%', border: 'none',
                background: 'linear-gradient(135deg, var(--color-pink-base), var(--color-peach-base))',
                color: '#fff', cursor: 'pointer',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: '0 6px 20px rgba(255,127,168,.3)',
                padding: 0,
              }}
            ><Volume2 size={42} /></button>
            <span aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid var(--color-pink-base)', pointerEvents: 'none', animation: 'phQuizPulseRing 2s cubic-bezier(.16,1,.3,1) infinite' }} />
          </div>

          {answered && (
            <div style={{
              fontFamily: "'Noto Sans KR', sans-serif",
              fontSize: 36, fontWeight: 800,
              color: 'var(--color-ink-1)',
              marginTop: 4, textAlign: 'center',
            }}>
              {q.target.syllable}
            </div>
          )}

          <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
            <button onClick={() => replay(1)} style={replayBtn}>{t('phonetics.quiz_relisten_button', lang)}</button>
            <button onClick={() => replay(0.5)} style={replayBtn}>{t('phonetics.stepquiz_slow_listen', lang)}</button>
          </div>
        </div>{/* /ph-quiz-hero */}

        <div className="ph-quiz-content">
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: 12 }}>
            {t('phonetics.stepquiz_pick_correct', lang)}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
            {q.options.map((opt) => {
              const isCorrect = opt.jamo === q.target.jamo;
              const isPicked = picked === opt.jamo;
              let bg = 'var(--color-surface-2)';
              let border = '2px solid var(--color-border-2)';
              let animation: string | undefined;
              if (answered || revealed) {
                // 答对/揭晓：正确选项变绿；答错：仅用户点的选项变红抖动，不暴露答案（除非揭晓）
                if (showAnswer && isCorrect) { bg = 'var(--color-mint-soft)'; border = '2px solid var(--color-status-success)'; }
                else if (isWrongPicked && isPicked) {
                  bg = 'var(--color-pink-soft)';
                  border = '2px solid var(--color-status-danger)';
                  animation = 'phQuizShake .4s ease';
                }
              }
              return (
                <button
                  key={`${qNum}-${opt.jamo}`}
                  onClick={() => handlePick(opt)}
                  disabled={answered}
                  style={{
                    fontWeight: 700, fontSize: 42, textAlign: 'center',
                    padding: '24px 16px', background: bg, border, borderRadius: 16,
                    cursor: answered ? 'default' : 'pointer',
                    color: 'var(--color-ink-1)', position: 'relative',
                    transition: 'all .2s ease',
                    animation,
                  }}
                >
                  {opt.jamo}
                </button>
              );
            })}
          </div>

          <div className="ph-quiz-feedback-side" style={{
            marginTop: 18, padding: 16,
            background: showAnswer ? 'var(--color-mint-soft)' : 'var(--color-surface-3)',
            border: `1px solid ${showAnswer ? 'var(--color-status-success)' : 'var(--color-border-1)'}`,
            borderRadius: 14, minHeight: 120,
          }}>
            <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '.05em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: 10 }}>
              {t('phonetics.stepquiz_feedback_label', lang)}
            </div>
            {showAnswer ? (
              <QuizFeedback
                target={q.target}
                isRight={isRight}
                buttonLabel={qNum >= TOTAL_Q ? t('phonetics.stepquiz_finish_to_blend', lang) : t('phonetics.stepquiz_next_question', lang)}
                onNext={handleNext}
                size="compact"
              />
            ) : isWrongPicked ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                <div style={{ fontSize: 13, color: 'var(--color-ink-3)', lineHeight: 1.6 }}>
                  {t('phonetics.stepquiz_wrong_hint', lang)}
                </div>
                <button onClick={handleReveal} style={revealBtn}>{t('phonetics.stepquiz_reveal_answer', lang)}</button>
              </div>
            ) : (
              <div style={{ fontSize: 13, color: 'var(--color-ink-3)', lineHeight: 1.6 }}>
                {t('phonetics.stepquiz_idle_hint', lang)}
              </div>
            )}
          </div>

          <div className="ph-quiz-feedback-side" style={{
            marginTop: 12,
            background: 'var(--color-surface-1)',
            border: '1px solid var(--color-border-1)',
            borderRadius: 12, padding: 14,
            display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10,
          }}>
            {[
              { k: t('phonetics.stepquiz_stat_qnum', lang), v: `${qNum}/${TOTAL_Q}`, c: 'var(--color-ink-1)' },
              { k: t('phonetics.stepquiz_stat_right', lang), v: String(right), c: 'var(--color-mint-strong)' },
              { k: t('phonetics.stepquiz_stat_wrong', lang), v: String(wrong), c: 'var(--color-status-danger)' },
              { k: t('phonetics.stepquiz_stat_time', lang), v: `${elapsedM}:${String(elapsedS).padStart(2, '0')}`, c: 'var(--color-ink-1)' },
            ].map((s) => (
              <div key={s.k} style={{ textAlign: 'center' }}>
                <div style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 18, color: s.c, lineHeight: 1 }}>{s.v}</div>
                <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginTop: 4 }}>{s.k}</div>
              </div>
            ))}
          </div>
        </div>{/* /ph-quiz-content */}
      </div>

      {showAnswer && (
        <div className="ph-quiz-feedback-fixed" style={{
          position: 'fixed', left: 0, right: 0,
          bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))',
          background: 'var(--color-surface-2)',
          borderTop: '3px solid var(--color-status-success)',
          boxShadow: '0 -8px 30px rgba(58,46,41,.1)',
          padding: '18px 20px',
          maxWidth: 560, margin: '0 auto',
          zIndex: 70,
        }}>
          <QuizFeedback
            target={q.target}
            isRight={isRight}
            buttonLabel={qNum >= TOTAL_Q ? t('phonetics.stepquiz_finish_to_blend', lang) : t('phonetics.stepquiz_next_question', lang)}
            onNext={handleNext}
            size="full"
          />
        </div>
      )}

      {isWrongPicked && !revealed && (
        <div className="ph-quiz-feedback-fixed" style={{
          position: 'fixed', left: 0, right: 0,
          bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))',
          background: 'var(--color-surface-2)',
          borderTop: '3px solid var(--color-status-danger)',
          boxShadow: '0 -8px 30px rgba(58,46,41,.1)',
          padding: '14px 20px',
          maxWidth: 560, margin: '0 auto',
          zIndex: 70,
          display: 'flex', alignItems: 'center', gap: 12,
        }}>
          <div style={{ flex: 1, fontSize: 13, color: 'var(--color-ink-3)' }}>{t('phonetics.stepquiz_wrong_bar_hint', lang)}</div>
          <button onClick={handleReveal} style={revealBtn}>{t('phonetics.stepquiz_dont_know', lang)}</button>
        </div>
      )}
    </div>
    </div>
    <StepRail stageId={stageId} current="quiz" />
    </div>
  );
}

const replayBtn: React.CSSProperties = {
  padding: '12px 16px', minHeight: 44, fontSize: 12, fontFamily: 'ui-monospace, monospace',
  border: '1px solid var(--color-border-2)', borderRadius: 999,
  background: 'var(--color-surface-2)', color: 'var(--color-ink-3)',
  cursor: 'pointer',
};

const revealBtn: React.CSSProperties = {
  padding: '12px 20px', minHeight: 44, fontSize: 13, fontWeight: 600,
  border: '1px solid var(--color-border-2)', borderRadius: 999,
  background: 'var(--color-surface-2)', color: 'var(--color-ink-2)',
  cursor: 'pointer', whiteSpace: 'nowrap',
};
