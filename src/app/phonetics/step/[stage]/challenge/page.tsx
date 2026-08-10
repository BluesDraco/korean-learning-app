'use client';

import { useState, useEffect, useMemo, useCallback, useRef, use } from 'react';
import { useSmartBack } from '@/lib/useSmartBack';
import { useRouter } from 'next/navigation';
import { ArrowLeft, X, Volume2 } from 'lucide-react';
import {
  getStage, TENSE_PAIRS, buildSyllableQuestion, slotPlaySyllable, HOMOPHONE_GROUPS, homophoneKey, confusableNameKey,
  type ProgressiveLetter, type SyllableQuestion,
} from '@/data/phonetics-progressive';
import { unlockAudioContext } from '@/lib/tts';
import { playPhoneticAudio } from '@/lib/audio/phoneticsPlayer';
import { recordPhoneticStep } from '@/lib/lesson/recordPhoneticStep';
import { recordPhoneticMistake } from '@/lib/phonetics/srs';
import { playSuccess, playError, playComplete } from '@/lib/soundManager';
import ComboBadge from '@/components/phonetics/step/ComboBadge';
import { iconBtn } from '@/components/phonetics/step/shared';
import StageErrorFallback from '@/components/phonetics/step/StageErrorFallback';
import { StepRail } from '@/components/phonetics/step/StepRail';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const TOTAL_Q = 10;

type QType = 'letter' | 'confusedPair' | 'consonant' | 'tense' | 'syllable';

interface LetterQ {
  type: 'letter';
  audioSyl: string;
  correct: string;
  options: string[];
}
interface ConfusedPairQ {
  type: 'confusedPair';
  audioSyl: string;       // 听 target 的 syllable
  correct: string;        // target.jamo
  options: string[];      // [target, target.confused] 2 选 1
  tip: string;            // target.confused.tip
  tipEn?: string;
}
interface ConsonantQ {
  type: 'consonant';
  audioSyl: string;
  correct: string;
  options: string[];
}
interface TenseQ {
  type: 'tense';
  audios: [string, string];
  correct: string;
  options: string[];
}
interface SyllableQ {
  type: 'syllable';
  data: SyllableQuestion;
}
type Question = LetterQ | ConfusedPairQ | ConsonantQ | TenseQ | SyllableQ;

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

// 按 stage 决定本次挑战的可用题型池
function questionTypesOfStage(stageId: number): QType[] {
  if (stageId === 3) return ['letter', 'confusedPair', 'consonant', 'syllable'];
  if (stageId === 4) return ['letter', 'confusedPair', 'tense', 'syllable'];
  return ['letter', 'confusedPair', 'syllable'];
}

function buildLetter(pool: ProgressiveLetter[]): LetterQ {
  const target = pool[Math.floor(Math.random() * pool.length)];
  const targetGroup = homophoneKey(target.jamo);
  const targetNameGroup = confusableNameKey(target.jamo);
  const wrongs: string[] = [];
  for (const cand of shuffle(pool)) {
    if (wrongs.length >= 3) break;
    if (cand.jamo === target.jamo) continue;
    if (homophoneKey(cand.jamo) === targetGroup) continue;
    if (confusableNameKey(cand.jamo) === targetNameGroup) continue;
    if (wrongs.some((w) => homophoneKey(w) === homophoneKey(cand.jamo))) continue;
    if (wrongs.some((w) => confusableNameKey(w) === confusableNameKey(cand.jamo))) continue;
    wrongs.push(cand.jamo);
  }
  return { type: 'letter', audioSyl: target.syllable, correct: target.jamo, options: shuffle([target.jamo, ...wrongs]) };
}

// 易混对辨听：从 target.confused 取干扰字母，2 选 1，专攻中国学习者的盲区
// 找不到合法干扰项时退化为 4 选 1 letter 题，避免出现两个相同选项
// 同音字对（如 ㅚ vs ㅙ 都读 [we]）听力无法区分，必须排除
function buildConfusedPair(pool: ProgressiveLetter[]): ConfusedPairQ | LetterQ {
  const withConfused = pool.filter((l) =>
    l.confused?.jamo &&
    l.confused.jamo !== l.jamo &&
    homophoneKey(l.confused.jamo) !== homophoneKey(l.jamo) &&
    pool.some((p) => p.jamo === l.confused.jamo)
  );
  if (withConfused.length === 0) return buildLetter(pool);
  const target = withConfused[Math.floor(Math.random() * withConfused.length)];
  const wrong = target.confused.jamo;
  return {
    type: 'confusedPair',
    audioSyl: target.syllable,
    correct: target.jamo,
    options: shuffle([target.jamo, wrong]),
    tip: target.confused.tip ?? '',
    tipEn: target.confused.tipEn,
  };
}

function buildConsonant(consonants: ProgressiveLetter[]): ConsonantQ {
  const pool = consonants.filter((c) => c.jamo !== 'ㅇ');
  const target = pool[Math.floor(Math.random() * pool.length)];
  const targetNameGroup = confusableNameKey(target.jamo);
  const audioSyl = slotPlaySyllable('cho', target.jamo);
  const wrongs: string[] = [];
  for (const c of shuffle(pool)) {
    if (wrongs.length >= 3) break;
    if (c.jamo === target.jamo || wrongs.includes(c.jamo)) continue;
    if (confusableNameKey(c.jamo) === targetNameGroup) continue;
    if (wrongs.some((w) => confusableNameKey(w) === confusableNameKey(c.jamo))) continue;
    wrongs.push(c.jamo);
  }
  return { type: 'consonant', audioSyl, correct: target.jamo, options: shuffle([target.jamo, ...wrongs]) };
}

function buildTense(letters: ProgressiveLetter[]): TenseQ {
  const pool = TENSE_PAIRS.filter((p) => letters.some((l) => l.jamo === p.tense));
  const pair = pool[Math.floor(Math.random() * pool.length)];
  const audios: [string, string] = Math.random() < 0.5
    ? [pair.tenseSyl, pair.aspiratedSyl]
    : [pair.aspiratedSyl, pair.tenseSyl];
  return { type: 'tense', audios, correct: pair.tense, options: shuffle([pair.tense, pair.aspirated]) };
}

function buildQuestionOfType(t: QType, stageId: number, letters: ProgressiveLetter[]): Question {
  if (t === 'consonant') return buildConsonant(letters);
  if (t === 'tense') return buildTense(letters);
  if (t === 'confusedPair') return buildConfusedPair(letters);
  if (t === 'syllable') return { type: 'syllable', data: buildSyllableQuestion(stageId, letters) };
  return buildLetter(letters);
}

/**
 * 生成本次挑战的 10 题题型序列：先保证每种题型至少出现 1 次，剩下随机补满，再洗牌。
 */
function buildQuestionTypePlan(stageId: number): QType[] {
  const pool = questionTypesOfStage(stageId);
  const plan: QType[] = [...pool];
  while (plan.length < TOTAL_Q) {
    plan.push(pool[Math.floor(Math.random() * pool.length)]);
  }
  // 洗牌
  for (let i = plan.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [plan[i], plan[j]] = [plan[j], plan[i]];
  }
  return plan;
}

function calcStars(right: number): number {
  if (right >= 9) return 3;
  if (right >= 7) return 2;
  if (right >= 5) return 1;
  return 0;
}

const CHALLENGE_CSS = `
  .ph-ds-challenge { max-width: 640px; }
  .ph-chal-card { padding: 0; }
  .ph-chal-hero { padding: 28px 24px 24px; background: linear-gradient(160deg, var(--color-pink-soft) 0%, var(--color-surface-1) 60%); }
  .ph-chal-content { padding: 24px 22px 28px; }
  @media (min-width: 1024px) and (max-width: 1399px) { .ph-ds-challenge { max-width: 960px; } }
  /* 双栏仅在 ≥1400px 桌面启用；iPad 横屏保持单栏 */
  @media (min-width: 1400px) {
    .ph-ds-challenge { max-width: 1080px; }
    .ph-chal-card { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: 0; min-height: 620px; overflow: hidden; }
    .ph-chal-hero { padding: 48px 36px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; text-align: center; }
    .ph-chal-content { padding: 36px 32px; display: flex; flex-direction: column; overflow-y: auto; -webkit-overflow-scrolling: touch; }
  }
  @keyframes phChalPulse { 0% { transform: scale(1); opacity: .6; } 100% { transform: scale(1.8); opacity: 0; } }
  @keyframes phChalShake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }
`;

export default function ChallengePage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageStr } = use(params);
  const stageId = parseInt(stageStr, 10) || 1;
  const stage = getStage(stageId);
  const router = useRouter();
  const smartBack = useSmartBack('/phonetics');
  const { user } = useAuth();
  const { lang } = useLang();

  const letters = useMemo(() => stage?.letters ?? [], [stage]);
  const typePlan = useMemo(() => buildQuestionTypePlan(stageId), [stageId]);

  const [qNum, setQNum] = useState(1);
  const [q, setQ] = useState<Question | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [combo, setCombo] = useState(0);
  const [right, setRight] = useState(0);
  const [wrong, setWrong] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [showExitConfirm, setShowExitConfirm] = useState(false);

  // Exit dialog: Escape to close + body scroll lock
  useEffect(() => {
    if (!showExitConfirm) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setShowExitConfirm(false); };
    window.addEventListener('keydown', onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = prev;
    };
  }, [showExitConfirm]);

  const rightRef = useRef(0);
  const wrongRef = useRef(0);
  const startRef = useRef(Date.now());
  const elapsedRef = useRef(0);
  const finishedRef = useRef(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const initRef = useRef(false);

  const clearTimer = useCallback(() => {
    if (timerRef.current) { clearTimeout(timerRef.current); timerRef.current = null; }
  }, []);

  useEffect(() => () => {
    clearTimer();
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
  }, [clearTimer]);

  useEffect(() => {
    if (initRef.current) return;
    if (letters.length > 0) {
      initRef.current = true;
      setQ(buildQuestionOfType(typePlan[0], stageId, letters));
    }
  }, [letters, typePlan, stageId]);

  useEffect(() => {
    const t = setInterval(() => {
      const sec = Math.floor((Date.now() - startRef.current) / 1000);
      elapsedRef.current = sec;
      setElapsed(sec);
    }, 1000);
    return () => clearInterval(t);
  }, []);

  const playSyl = useCallback((syl: string) => {
    clearTimer();
    unlockAudioContext();
    playPhoneticAudio(syl);
  }, [clearTimer]);

  const playTenseSequence = useCallback((audios: [string, string]) => {
    unlockAudioContext();
    clearTimer();
    playPhoneticAudio(audios[0]);
    timerRef.current = setTimeout(() => playPhoneticAudio(audios[1]), 800);
  }, [clearTimer]);

  const playMain = useCallback(() => {
    if (!q) return;
    if (q.type === 'tense') playTenseSequence(q.audios);
    else if (q.type === 'syllable') playSyl(q.data.syllable);
    else playSyl(q.audioSyl);
  }, [q, playSyl, playTenseSequence]);

  // 自动播放（严格模式下 effect 会跑两次，用 ref 保证每个 q 只播一次）
  const playedQRef = useRef<Question | null>(null);
  useEffect(() => {
    if (q && playedQRef.current !== q) {
      playedQRef.current = q;
      unlockAudioContext();
      if (q.type === 'tense') playTenseSequence(q.audios);
      else if (q.type === 'syllable') playPhoneticAudio(q.data.syllable);
      else playPhoneticAudio(q.audioSyl);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [q]);

  const handlePick = (opt: string) => {
    if (!q || picked || revealed) return;
    setPicked(opt);
    const isSyl = q.type === 'syllable';
    const correctAns = isSyl ? q.data.correctRoman : q.correct;
    const correct = opt === correctAns;
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
      if (isSyl) {
        // syllable 题：错题本写真 jamo，从选项里反查
        const wrongOpt = q.data.options.find((o) => o.roman === opt);
        if (wrongOpt) {
          recordPhoneticMistake(q.data.targetJamo, wrongOpt.jamo, stageId, user?.id).catch((e) => { console.error('phonetics/challenge: recordPhoneticMistake failed (syllable)', e); });
        }
      } else {
        recordPhoneticMistake(q.correct, opt, stageId, user?.id).catch((e) => { console.error('phonetics/challenge: recordPhoneticMistake failed (jamo)', e); });
      }
      // 1.5s 后允许重试（不泄题、不出下一题按钮）
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      retryTimerRef.current = setTimeout(() => { setPicked(null); }, 1500);
    }
  };

  const finishAndGoResult = useCallback(async () => {
    if (finishedRef.current) return;
    finishedRef.current = true;
    playComplete();
    const stars = calcStars(rightRef.current);
    try {
      await recordPhoneticStep(stageId, 'stage_complete', {
        correctCount: rightRef.current,
        wrongCount: wrongRef.current,
        studyMinutes: 3,
      });
    } catch (e) { console.error('phonetics/challenge: recordPhoneticStep failed — stage completion progress may not be saved', e); }
    const params = new URLSearchParams({
      stars: String(stars),
      right: String(rightRef.current),
      wrong: String(wrongRef.current),
      elapsed: String(elapsedRef.current),
    });
    router.push(`/phonetics/step/${stageId}/result?${params.toString()}`);
  }, [router, stageId]);

  const handleNext = () => {
    if (qNum >= TOTAL_Q) {
      finishAndGoResult();
      return;
    }
    const nextIdx = qNum; // qNum 1-based，nextIdx 即 0-based 的下一题
    setPicked(null);
    setRevealed(false);
    setQNum((n) => n + 1);
    setQ(buildQuestionOfType(typePlan[nextIdx], stageId, letters));
  };

  const handleReveal = () => {
    if (retryTimerRef.current) { clearTimeout(retryTimerRef.current); retryTimerRef.current = null; }
    setRevealed(true);
  };

  if (!stage) return <StageErrorFallback msg={t('phonetics.challenge_stage_not_found', lang)} />;
  if (letters.length === 0) return <StageErrorFallback msg={t('phonetics.challenge_stage_locked', lang)} />;
  if (!q) return <div style={{ padding: 24 }}>{t('phonetics.challenge_loading', lang)}</div>;

  const answered = picked !== null;
  const isSyllable = q.type === 'syllable';
  const currentCorrect = isSyllable ? q.data.correctRoman : q.correct;
  const currentOptions: Array<{ value: string; jamo?: string }> = isSyllable
    ? q.data.options.map((o) => ({ value: o.roman, jamo: o.jamo }))
    : q.options.map((o) => ({ value: o }));
  const isCorrect = answered && picked === currentCorrect;
  const isWrong = answered && !isCorrect;
  const showAnswer = isCorrect || revealed;
  const elapsedM = Math.floor(elapsed / 60);
  const elapsedS = elapsed % 60;

  const promptText =
    q.type === 'confusedPair' ? t('phonetics.challenge_prompt_confused_pair', lang) :
    q.type === 'consonant' ? t('phonetics.challenge_prompt_consonant', lang) :
    q.type === 'tense' ? t('phonetics.challenge_prompt_tense', lang) :
    q.type === 'syllable' ? t('phonetics.challenge_prompt_syllable', lang) :
    t('phonetics.challenge_prompt_letter', lang);

  const optionFontSize = isSyllable ? 22 : 40;

  return (
    <div className="sr-shell">
    <div className="sr-main">
    <div className="ph-ds-challenge" style={{ margin: '0 auto', padding: '0 16px 96px' }}>
      <style>{CHALLENGE_CSS}</style>

      <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '16px 0', flexWrap: 'wrap' }}>
        <button onClick={() => setShowExitConfirm(true)} aria-label={t('phonetics.challenge_exit_aria', lang)} style={iconBtn}><ArrowLeft size={16} /></button>
        <div style={{ flex: 1, height: 6, background: 'var(--color-surface-4)', borderRadius: 3, overflow: 'hidden', minWidth: 120 }}>
          <div style={{
            height: '100%', width: `${(qNum / TOTAL_Q) * 100}%`,
            background: 'linear-gradient(90deg, var(--color-pink-base), var(--color-peach-base))',
            borderRadius: 3, transition: 'width .5s ease',
          }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{
            fontFamily: 'ui-monospace, monospace', fontSize: 12, fontWeight: 700,
            color: 'var(--color-ink-3)',
            background: 'var(--color-surface-3)',
            padding: '6px 12px', borderRadius: 999, whiteSpace: 'nowrap',
          }}>⏱ {elapsedM}:{String(elapsedS).padStart(2, '0')}</div>
          <ComboBadge combo={combo} />
        </div>
      </div>

      <div className="ph-chal-card" style={{
        background: 'var(--color-surface-2)',
        border: '1px solid var(--color-border-2)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: '0 4px 20px rgba(58,46,41,.06)',
        position: 'relative', overflow: 'hidden',
      }}>
        <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 4, background: 'linear-gradient(90deg, var(--color-pink-base), var(--color-peach-base), var(--color-purple-base))', zIndex: 1 }} />

        <div className="ph-chal-hero">
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'var(--color-pink-strong)' }}>
            ◆ Stage {stageId} · {t('phonetics.challenge_hero_kicker', lang, { cur: qNum, total: TOTAL_Q })}
          </div>
          <div style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 22, color: 'var(--color-ink-1)' }}>
            {t('phonetics.challenge_hero_title_1', lang)}<em style={{ fontStyle: 'italic', color: 'var(--color-pink-strong)' }}>{t('phonetics.challenge_hero_title_2', lang)}</em>
          </div>
          <div style={{ fontSize: 13, color: 'var(--color-ink-2)', maxWidth: 320 }}>{promptText}</div>

          {q.type === 'syllable' ? (
            <ChallengeSyllableVisual q={q.data} onPlay={playMain} />
          ) : (
            <div style={{ position: 'relative', display: 'inline-block', marginTop: 4 }}>
              <button onClick={playMain} aria-label={t('phonetics.challenge_play_audio_aria', lang)} style={audioBtn}>
                <Volume2 size={42} />
              </button>
              <span aria-hidden style={{ position: 'absolute', inset: 0, borderRadius: '50%', border: '2px solid var(--color-pink-base)', pointerEvents: 'none', animation: 'phChalPulse 2s cubic-bezier(.16,1,.3,1) infinite' }} />
            </div>
          )}

          {q.type === 'tense' && (
            <div style={{ fontSize: 12, color: 'var(--color-ink-3)' }}>{t('phonetics.challenge_tense_hint', lang)}</div>
          )}

          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, minmax(0, 1fr))', gap: 8,
            marginTop: 4, padding: '10px 12px',
            background: 'var(--color-surface-2)',
            border: '1px solid var(--color-border-1)',
            borderRadius: 12, minWidth: 240,
          }}>
            <Stat val={`${right}`} label={t('phonetics.challenge_stat_correct', lang)} color="var(--color-mint-strong)" />
            <Stat val={`${wrong}`} label={t('phonetics.challenge_stat_wrong', lang)} color="var(--color-status-danger)" />
            <Stat val={`${qNum}/${TOTAL_Q}`} label={t('phonetics.challenge_stat_progress', lang)} color="var(--color-ink-1)" />
          </div>
        </div>{/* /ph-chal-hero */}

        <div className="ph-chal-content">
          <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginBottom: 14 }}>
            {t('phonetics.challenge_choose_answer', lang)}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 12 }}>
            {currentOptions.map((opt) => {
              const isOptCorrect = opt.value === currentCorrect;
              const isPicked = picked === opt.value;
              let bg = 'var(--color-surface-2)';
              let border = '2px solid var(--color-border-2)';
              let animation: string | undefined;
              if (answered || revealed) {
                // 答对/揭晓：正确选项变绿；答错：仅用户点的选项变红抖动
                if (showAnswer && isOptCorrect) { bg = 'var(--color-mint-soft)'; border = '2px solid var(--color-status-success)'; }
                else if (isWrong && isPicked) {
                  bg = 'var(--color-pink-soft)';
                  border = '2px solid var(--color-status-danger)';
                  animation = 'phChalShake .4s ease';
                }
              }
              return (
                <button key={`${opt.value}-${opt.jamo ?? ''}`} onClick={() => handlePick(opt.value)} disabled={answered || revealed} style={{
                  fontWeight: 700, fontSize: optionFontSize, textAlign: 'center',
                  padding: '22px 8px', background: bg, border, borderRadius: 14,
                  color: 'var(--color-ink-1)', cursor: (answered || revealed) ? 'default' : 'pointer',
                  transition: 'all .2s',
                  fontFamily: isSyllable ? 'ui-monospace, monospace' : undefined,
                  animation,
                }}>
                  {opt.value}
                </button>
              );
            })}
          </div>

          {showAnswer && (
            <div style={{
              marginTop: 18,
              background: isCorrect ? 'var(--color-mint-soft)' : 'var(--color-pink-soft)',
              border: `1px solid ${isCorrect ? 'var(--color-status-success)' : 'var(--color-status-danger)'}`,
              borderRadius: 14, padding: '14px 18px',
            }}>
              <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 10, fontWeight: 700, letterSpacing: '.18em', textTransform: 'uppercase', color: isCorrect ? 'var(--color-mint-strong)' : 'var(--color-status-danger)', marginBottom: 6 }}>
                {isCorrect ? t('phonetics.challenge_correct_badge', lang) : t('phonetics.challenge_answer_is', lang, { answer: currentCorrect })}
              </div>
              {q.type === 'confusedPair' && q.tip && (
                <div style={{ marginTop: 8, fontSize: 12, color: 'var(--color-ink-3)', lineHeight: 1.55 }}>
                  💡 {lang === 'en' ? q.tipEn ?? q.tip : q.tip}
                </div>
              )}
              {isSyllable && (
                <div style={{ marginTop: 10, fontSize: 12.5, color: 'var(--color-ink-2)', lineHeight: 1.6 }}>
                  🔍 <b>{q.data.syllable}</b> = <b>{q.data.cho}</b>({q.data.choRoman || '∅'}) + <b>{q.data.jung}</b>({q.data.jungRoman})
                  {' = '}<b style={{ color: 'var(--color-pink-strong)' }}>{q.data.correctRoman}</b>
                </div>
              )}
              <button onClick={handleNext} style={{
                marginTop: 12, width: '100%', padding: '12px 24px',
                fontSize: 15, fontWeight: 500, borderRadius: 12, border: 'none',
                cursor: 'pointer', background: 'var(--color-pink-base)', color: '#fff',
                boxShadow: '0 4px 14px rgba(255,127,168,.3)',
              }}>
                {qNum >= TOTAL_Q ? t('phonetics.challenge_view_result', lang) : t('phonetics.challenge_next', lang)}
              </button>
            </div>
          )}

          {isWrong && !revealed && (
            <button onClick={handleReveal} style={{
              marginTop: 14, width: '100%', padding: '10px 18px',
              fontSize: 13, fontWeight: 600, borderRadius: 12,
              border: '1px solid var(--color-border-2)',
              background: 'var(--color-surface-2)', color: 'var(--color-ink-2)',
              cursor: 'pointer',
            }}>{t('phonetics.challenge_dont_know', lang)}</button>
          )}
        </div>{/* /ph-chal-content */}
      </div>

      <div style={{ position: 'fixed', top: 12, right: 12, zIndex: 60 }}>
        <button onClick={() => setShowExitConfirm(true)} aria-label={t('phonetics.challenge_exit_aria', lang)} style={{ ...iconBtn, background: 'var(--color-surface-2)', boxShadow: '0 2px 8px rgba(36,25,23,.1)' }}><X size={18} /></button>
      </div>

      {showExitConfirm && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
          <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.35)' }} onClick={() => setShowExitConfirm(false)} />
          <div style={{ position: 'relative', background: 'var(--color-surface-2)', borderRadius: 20, padding: 28, maxWidth: 320, width: '100%', textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,.15)' }}>
            <p style={{ fontSize: 16, fontWeight: 700, color: 'var(--color-ink-1)', marginBottom: 8 }}>{t('phonetics.challenge_exit_confirm_title', lang)}</p>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', marginBottom: 20 }}>{t('phonetics.challenge_exit_confirm_desc', lang)}</p>
            <div style={{ display: 'flex', gap: 10 }}>
              <button onClick={() => setShowExitConfirm(false)} style={{ flex: 1, padding: '10px 0', borderRadius: 999, border: '1px solid var(--color-border-2)', background: 'transparent', color: 'var(--color-ink-2)', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{t('phonetics.challenge_exit_confirm_stay', lang)}</button>
              <button onClick={smartBack} style={{ flex: 1, padding: '10px 0', borderRadius: 999, border: 'none', background: 'var(--color-pink-base)', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>{t('phonetics.challenge_exit_confirm_leave', lang)}</button>
            </div>
          </div>
        </div>
      )}
    </div>
    </div>
    <StepRail stageId={stageId} current="challenge" />
    </div>
  );
}

function ChallengeSyllableVisual({ q, onPlay }: { q: SyllableQuestion; onPlay: () => void }) {
  const { lang } = useLang();
  const playSlot = (slot: 'cho' | 'jung', jamo: string) => {
    unlockAudioContext();
    playPhoneticAudio(slotPlaySyllable(slot, jamo));
  };
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'center', gap: 12, flexWrap: 'wrap', marginTop: 4 }}>
      <div style={visualPiece}>
        <div style={visualBlock('rgba(255,127,168,.5)', 'rgba(255,127,168,.08)')}>{q.cho}</div>
        <span style={visualLabel}>{t('phonetics.challenge_label_consonant', lang)} · {q.choRoman || '∅'}</span>
        <button type="button" style={visualMiniPlay} aria-label={t('phonetics.challenge_play_consonant_aria', lang, { jamo: q.cho })} onClick={() => playSlot('cho', q.cho)}>▶</button>
      </div>
      <span style={visualOp}>＋</span>
      <div style={visualPiece}>
        <div style={visualBlock('rgba(174,227,216,.6)', 'rgba(174,227,216,.18)')}>{q.jung}</div>
        <span style={visualLabel}>{t('phonetics.challenge_label_vowel', lang)} · {q.jungRoman}</span>
        <button type="button" style={visualMiniPlay} aria-label={t('phonetics.challenge_play_vowel_aria', lang, { jamo: q.jung })} onClick={() => playSlot('jung', q.jung)}>▶</button>
      </div>
      <span style={visualOp}>＝</span>
      <div style={visualPiece}>
        <button
          type="button"
          onClick={onPlay}
          aria-label={t('phonetics.challenge_play_syllable_aria', lang, { syl: q.syllable })}
          style={visualResult}
        >{q.syllable}</button>
        <span style={visualLabel}>{t('phonetics.challenge_label_composed', lang)} · {q.correctRoman}</span>
        <button type="button" style={visualMiniPlayResult} aria-label={t('phonetics.challenge_play_composed_aria', lang, { syl: q.syllable })} onClick={onPlay}>▶</button>
      </div>
    </div>
  );
}

const visualPiece: React.CSSProperties = {
  display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, flexShrink: 0,
};
const visualBlock = (border: string, bg: string): React.CSSProperties => ({
  width: 'clamp(52px, 18vw, 76px)', height: 'clamp(52px, 18vw, 76px)', borderRadius: 14, display: 'grid', placeItems: 'center',
  background: bg, border: `2px solid ${border}`,
  fontWeight: 800, fontSize: 36, color: 'var(--color-ink-1)',
  fontFamily: '"Noto Sans KR", sans-serif', lineHeight: 1,
});
const visualLabel: React.CSSProperties = {
  fontFamily: 'ui-monospace, monospace', fontSize: 10, color: 'var(--color-ink-3)', whiteSpace: 'nowrap',
};
const visualMiniPlay: React.CSSProperties = {
  minWidth: 44, minHeight: 44, width: 44, height: 44, borderRadius: '50%', border: 'none',
  background: 'var(--color-surface-2)', color: 'var(--color-pink-strong)',
  cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  fontSize: 12, boxShadow: '0 2px 5px rgba(58,46,41,.08)',
};
const visualMiniPlayResult: React.CSSProperties = {
  ...visualMiniPlay,
  background: 'linear-gradient(135deg, var(--color-mint-strong), var(--color-mint-base))',
  color: '#fff',
};
const visualOp: React.CSSProperties = {
  fontSize: 22, color: 'var(--color-ink-3)', fontWeight: 300,
  alignSelf: 'center', marginTop: 30,
};
const visualResult: React.CSSProperties = {
  width: 'clamp(64px, 22vw, 92px)', height: 'clamp(64px, 22vw, 92px)', borderRadius: 16, display: 'grid', placeItems: 'center',
  fontWeight: 800, fontSize: 44, color: '#fff',
  background: 'linear-gradient(135deg, var(--color-mint-strong), var(--color-mint-base))',
  border: 'none', cursor: 'pointer',
  boxShadow: '0 6px 18px rgba(126,201,184,.45)',
  fontFamily: '"Noto Sans KR", sans-serif', lineHeight: 1,
};

function Stat({ val, label, color }: { val: string; label: string; color: string }) {
  return (
    <div style={{ textAlign: 'center' }}>
      <div style={{ fontFamily: 'serif', fontWeight: 700, fontSize: 18, color, lineHeight: 1 }}>{val}</div>
      <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 9, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--color-ink-3)', marginTop: 4 }}>{label}</div>
    </div>
  );
}

const audioBtn: React.CSSProperties = {
  width: 112, height: 112, borderRadius: '50%', border: 'none',
  background: 'linear-gradient(135deg, var(--color-pink-base), var(--color-peach-base))',
  color: '#fff', cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
  boxShadow: '0 6px 20px rgba(255,127,168,.3)',
  position: 'relative',
};
