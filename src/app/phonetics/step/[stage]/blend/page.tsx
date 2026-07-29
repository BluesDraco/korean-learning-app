'use client';

import { useState, useEffect, useMemo, useCallback, useRef, use } from 'react';
import { useSmartBack } from '@/lib/useSmartBack';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import {
  getStage, buildSyllableQuestion, slotPlaySyllable,
  PROGRESSIVE_STAGES,
  type SyllableQuestion, type SyllableOption, type ProgressiveStroke,
} from '@/data/phonetics-progressive';
import { unlockAudioContext } from '@/lib/tts';
import { playPhoneticAudio } from '@/lib/audio/phoneticsPlayer';
import { recordPhoneticStep } from '@/lib/lesson/recordPhoneticStep';
import { recordPhoneticMistake } from '@/lib/phonetics/srs';
import { playSuccess, playError, playComplete } from '@/lib/soundManager';
import { iconBtn } from '@/components/phonetics/step/shared';
import StageErrorFallback from '@/components/phonetics/step/StageErrorFallback';
import StrokeCanvas from '@/components/phonetics/step/StrokeCanvas';
import { StepRail } from '@/components/phonetics/step/StepRail';
import { composeSyllableStrokes } from '@/lib/phonetics/composeSyllableStrokes';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

// 按 stage 顺序找第一个匹配的字母的书写笔画。
function findLetterStrokes(jamo: string): ProgressiveStroke[] {
  if (!jamo) return [];
  for (const stage of PROGRESSIVE_STAGES) {
    const found = stage.letters.find((l) => l.jamo === jamo && l.strokes.length > 0);
    if (found) return found.strokes;
  }
  return [];
}

type Phase = 'quiz' | 'write';

const TOTAL_Q = 10;
const COVERAGE_PASS = 20;          // 覆盖率通过线（%）——手机窄屏描写余量小，从 35% 降到 20%
const WRONG_RETRY_DELAY_MS = 1500; // 答错后多久清掉选择允许重试

const BLEND_CSS = `
  @media (min-width: 1024px) { .ph-syl { max-width: 1080px !important; } }

  .sl-topbar { display: flex; align-items: center; gap: 16px; margin-bottom: 24px; padding: 0 4px; }
  .sl-progress { flex: 1; height: 8px; background: var(--color-border-1); border-radius: 4px; overflow: hidden; }
  .sl-progress-fill { height: 100%; background: linear-gradient(90deg, var(--color-pink-base), var(--color-pink-strong)); border-radius: 4px; transition: width .5s cubic-bezier(.25,1,.5,1); }
  .sl-combo { background: #fff4dc; border: 1px solid #f0d878; border-radius: 20px; padding: 4px 12px;
    font-size: 12px; font-weight: 700; color: #8a6a20; display: flex; align-items: center; gap: 4px; white-space: nowrap; }
  .sl-combo.zero { opacity: .35; }
  [data-theme="dark"] .sl-combo { background: #3d3020; border-color: #6b5828; color: #d4b96a; }

  .sl-card { background: var(--color-surface-2); border: 1px solid var(--color-border-2);
    border-radius: 20px; padding: clamp(20px, 4vw, 36px) clamp(16px, 4vw, 32px); box-shadow: 0 4px 20px rgba(58,46,41,.06);
    position: relative; overflow: hidden; min-height: 520px; }
  .sl-card::before { content: ''; position: absolute; top: 0; left: 0; right: 0; height: 4px;
    background: linear-gradient(90deg, var(--color-pink-base), var(--color-peach-base), var(--color-purple-base)); }

  .sl-prompt { text-align: center; font-size: 14px; color: var(--color-ink-3); margin-bottom: 28px; }

  .sl-visual { display: flex; align-items: flex-start; justify-content: center; gap: 18px; flex-wrap: wrap;
    margin-bottom: 28px; }
  .sl-piece { display: flex; flex-direction: column; align-items: center; gap: 6px; flex-shrink: 0; }
  .sl-block { width: clamp(64px, 20vw, 100px); height: clamp(64px, 20vw, 100px); border-radius: 16px; display: grid; place-items: center;
    background: var(--color-surface-1); border: 2px solid var(--color-border-2);
    font-weight: 800; font-size: clamp(32px, 8vw, 48px); color: var(--color-ink-1); position: relative;
    font-family: 'Noto Sans KR', sans-serif; line-height: 1; }
  .sl-block-label { font-family: ui-monospace, monospace; font-size: 11px;
    color: var(--color-ink-3); white-space: nowrap; }
  .sl-mini-play { width: 28px; height: 28px; border-radius: 50%; border: none;
    background: var(--color-surface-2); color: var(--color-pink-strong);
    cursor: pointer; display: inline-flex; align-items: center; justify-content: center;
    box-shadow: 0 2px 6px rgba(58,46,41,.08); transition: all .2s; }
  .sl-mini-play:hover { background: var(--color-pink-soft); transform: translateY(-1px); }
  .sl-mini-play.result { background: linear-gradient(135deg, var(--color-mint-strong), var(--color-mint-base)); color: #fff; }
  .sl-op { font-size: clamp(20px, 5vw, 28px); color: var(--color-ink-3); font-weight: 300; align-self: center; margin-top: clamp(24px, 8vw, 38px); }
  .sl-result { width: clamp(88px, 26vw, 120px); height: clamp(88px, 26vw, 120px); border-radius: 18px; display: grid; place-items: center;
    font-weight: 800; font-size: clamp(40px, 10vw, 56px); color: #fff;
    background: linear-gradient(135deg, var(--color-mint-strong), var(--color-mint-base));
    border: none; cursor: pointer;
    box-shadow: 0 6px 20px rgba(126,201,184,.45); transition: transform .25s;
    animation: slResultPop .5s cubic-bezier(.16,1,.3,1);
    font-family: 'Noto Sans KR', sans-serif; line-height: 1; }
  .sl-result:hover { transform: scale(1.06); }
  @keyframes slResultPop { 0% { transform: scale(0); opacity: 0; } 60% { transform: scale(1.15); } 100% { transform: scale(1); opacity: 1; } }

  .sl-options { display: grid; grid-template-columns: repeat(4, 1fr); gap: 12px; margin-bottom: 24px; }
  @media (max-width: 640px) { .sl-options { grid-template-columns: 1fr 1fr; } }
  .sl-opt { background: var(--color-surface-2); border: 2px solid var(--color-border-2);
    border-radius: 14px; padding: 20px 8px; cursor: pointer; transition: all .2s;
    font-family: ui-monospace, monospace; font-size: 20px; font-weight: 600;
    color: var(--color-ink-1); text-align: center; }
  .sl-opt:hover:not(:disabled) { border-color: var(--color-pink-base);
    background: var(--color-pink-soft); transform: translateY(-2px); }
  .sl-opt.correct { border-color: var(--color-mint-strong); background: var(--color-mint-soft); }
  .sl-opt.wrong { border-color: var(--color-pink-strong); background: var(--color-pink-soft);
    animation: slShake .4s ease; }
  .sl-opt:disabled { cursor: default; }
  @keyframes slShake { 0%,100% { transform: translateX(0); } 25% { transform: translateX(-8px); } 75% { transform: translateX(8px); } }

  .sl-break { background: var(--color-mint-soft); border: 1px solid var(--color-mint-base);
    border-radius: 14px; padding: 16px 18px; display: flex; align-items: flex-start; gap: 14px;
    transition: all .25s; }
  .sl-break.wrong { background: var(--color-pink-soft); border-color: var(--color-pink-strong); }
  .sl-break-tag { font-size: 12px; font-weight: 700; color: var(--color-mint-strong);
    white-space: nowrap; flex-shrink: 0; }
  .sl-break.wrong .sl-break-tag { color: var(--color-pink-strong); }
  .sl-break-body { font-size: 14px; color: var(--color-ink-1); line-height: 1.65; flex: 1; }
  .sl-break-body .sl-syl { font-weight: 800; font-size: 18px; color: var(--color-ink-1);
    font-family: 'Noto Sans KR', sans-serif; }
  .sl-break-body .sl-jamo { font-weight: 800; font-family: 'Noto Sans KR', sans-serif;
    color: var(--color-ink-1); }
  .sl-break-body .sl-rom { color: var(--color-pink-strong); font-weight: 600;
    font-family: ui-monospace, monospace; }
  .sl-break-body .sl-rom-big { font-size: 20px; font-weight: 800; }
  .sl-break-body .sl-hint { display: block; color: var(--color-ink-3); font-size: 12px; margin-top: 4px; }

  .sl-next { margin-top: 20px; width: 100%; padding: 14px 24px;
    font-size: 15px; font-weight: 600; border-radius: 12px; border: none;
    cursor: pointer; background: var(--color-pink-base); color: #fff;
    box-shadow: 0 4px 14px rgba(255,127,168,.3); transition: all .2s; }
  .sl-next:hover { transform: translateY(-1px); box-shadow: 0 6px 18px rgba(255,127,168,.4); }
  .sl-next:disabled { background: var(--color-border-2); color: var(--color-ink-3);
    box-shadow: none; cursor: not-allowed; transform: none; }

  .sl-write-head { text-align: center; margin-bottom: 18px; }
  .sl-write-title { font-size: 15px; font-weight: 700; color: var(--color-ink-1); margin-bottom: 4px; }
  .sl-write-sub { font-size: 12px; color: var(--color-ink-3); font-family: ui-monospace, monospace; }
  .sl-write-anim { display: flex; justify-content: center; margin-bottom: 14px; }
  .sl-write-progress { text-align: center; font-size: 12px; color: var(--color-ink-3);
    font-family: ui-monospace, monospace; margin-top: 10px; }

  .sl-compose { display: flex; align-items: center; justify-content: center; gap: 14px;
    padding: 14px 24px;
    background: linear-gradient(135deg, rgba(255,127,168,0.08), rgba(174,227,216,0.10));
    border: 1px solid rgba(255,127,168,0.18);
    border-radius: 18px;
    box-shadow: 0 4px 16px rgba(255,127,168,0.08);
  }
  .sl-compose-piece, .sl-compose-op, .sl-compose-result {
    opacity: 0; transform: translateY(6px) scale(.85);
    animation: slPiecePop .5s cubic-bezier(.16,1,.3,1) forwards;
    line-height: 1;
  }
  .sl-compose-piece {
    font-family: 'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif;
    font-size: 38px; font-weight: 700; color: var(--color-ink-1);
  }
  .sl-compose-op {
    font-size: 20px; color: var(--color-ink-3); font-weight: 300;
  }
  .sl-compose-result {
    font-family: 'Noto Sans KR','Apple SD Gothic Neo','Malgun Gothic',sans-serif;
    font-size: 60px; font-weight: 800;
    color: var(--color-ink-1);
  }
  @keyframes slPiecePop {
    0% { opacity: 0; transform: translateY(8px) scale(.7); }
    70% { opacity: 1; transform: translateY(-2px) scale(1.1); }
    100% { opacity: 1; transform: translateY(0) scale(1); }
  }
`;

export default function BlendPage({ params }: { params: Promise<{ stage: string }> }) {
  const { stage: stageStr } = use(params);
  const stageId = parseInt(stageStr, 10) || 1;
  const stage = getStage(stageId);
  const router = useRouter();
  const smartBack = useSmartBack('/phonetics');
  const { user } = useAuth();
  const { lang } = useLang();

  const letters = useMemo(() => stage?.letters ?? [], [stage]);

  const [qNum, setQNum] = useState(1);
  const [q, setQ] = useState<SyllableQuestion | null>(null);
  const [picked, setPicked] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [combo, setCombo] = useState(0);
  const [phase, setPhase] = useState<Phase>('quiz');
  const [coveragePct, setCoveragePct] = useState(0);
  const rightRef = useRef(0);
  const wrongRef = useRef(0);
  const recordedRef = useRef(false);
  const initRef = useRef(false);
  const retryTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pickPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoPlayTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoPlayedForRef = useRef<string | null>(null);

  const composedStrokes = useMemo<ProgressiveStroke[]>(() => {
    if (!q) return [];
    const choS = findLetterStrokes(q.cho);
    const jungS = findLetterStrokes(q.jung);
    if (choS.length === 0 || jungS.length === 0) return [];
    return composeSyllableStrokes(choS, jungS, [], q.layout);
  }, [q]);

  useEffect(() => {
    if (initRef.current) return;
    if (letters.length > 0) {
      initRef.current = true;
      setQ(buildSyllableQuestion(stageId, letters));
    }
  }, [letters, stageId]);

  const playMain = useCallback(() => {
    if (!q) return;
    unlockAudioContext();
    playPhoneticAudio(q.syllable);
  }, [q]);

  const playSlot = useCallback((slot: 'cho' | 'jung', jamo: string) => {
    unlockAudioContext();
    playPhoneticAudio(slotPlaySyllable(slot, jamo));
  }, []);

  const handlePick = (opt: SyllableOption) => {
    if (!q || picked || revealed) return;
    setPicked(opt.roman);
    const correct = opt.roman === q.correctRoman;
    if (correct) {
      playSuccess();
      rightRef.current += 1;
      setCombo((c) => c + 1);
    } else {
      playError();
      wrongRef.current += 1;
      setCombo(0);
      recordPhoneticMistake(q.targetJamo, opt.jamo, stageId, user?.id).catch(() => { /* ignore */ });
      if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
      retryTimerRef.current = setTimeout(() => { setPicked(null); }, WRONG_RETRY_DELAY_MS);
    }
    if (pickPlayTimerRef.current) clearTimeout(pickPlayTimerRef.current);
    pickPlayTimerRef.current = setTimeout(() => {
      unlockAudioContext();
      playPhoneticAudio(q.syllable);
    }, 350);
  };

  // 新题渲染时自动播一次绿色音节
  useEffect(() => {
    if (!q || phase !== 'quiz') return;
    if (autoPlayedForRef.current === q.syllable + ':' + qNum) return;
    autoPlayedForRef.current = q.syllable + ':' + qNum;
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    autoPlayTimerRef.current = setTimeout(() => {
      unlockAudioContext();
      playPhoneticAudio(q.syllable);
    }, 300);
    return () => {
      if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    };
  }, [q, qNum, phase]);

  useEffect(() => () => {
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    if (pickPlayTimerRef.current) clearTimeout(pickPlayTimerRef.current);
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
  }, []);

  const enterWritePhase = () => {
    setCoveragePct(0);
    setPhase('write');
  };

  const handleReveal = () => {
    if (retryTimerRef.current) { clearTimeout(retryTimerRef.current); retryTimerRef.current = null; }
    setRevealed(true);
  };

  const handleNext = async () => {
    if (qNum >= TOTAL_Q) {
      if (!recordedRef.current) {
        recordedRef.current = true;
        playComplete();
        try {
          await recordPhoneticStep(stageId, 'blend', {
            correctCount: rightRef.current,
            wrongCount: wrongRef.current,
            studyMinutes: 2,
          });
        } catch { /* ignore */ }
      }
      router.push(`/phonetics/step/${stageId}/challenge`);
      return;
    }
    if (pickPlayTimerRef.current) clearTimeout(pickPlayTimerRef.current);
    if (autoPlayTimerRef.current) clearTimeout(autoPlayTimerRef.current);
    if (retryTimerRef.current) clearTimeout(retryTimerRef.current);
    setPicked(null);
    setRevealed(false);
    setPhase('quiz');
    setCoveragePct(0);
    setQNum((n) => n + 1);
    setQ(buildSyllableQuestion(stageId, letters));
  };

  if (!stage) return <StageErrorFallback msg={t('phonetics.blend_stage_not_found', lang)} />;
  if (letters.length === 0) return <StageErrorFallback msg={t('phonetics.blend_stage_locked', lang)} />;
  if (!q) return <div style={{ padding: 24 }}>{t('phonetics.blend_loading', lang)}</div>;

  const isCorrect = picked !== null && picked === q.correctRoman;
  const isWrong = picked !== null && !isCorrect;
  const showAnswer = isCorrect || revealed;
  const progressPct = (qNum / TOTAL_Q) * 100;

  const layoutHint = q.layout === 'vertical'
    ? t('phonetics.blend_layout_hint_vertical', lang)
    : t('phonetics.blend_layout_hint_horizontal', lang);

  return (
    <div className="sr-shell">
    <div className="sr-main">
    <div className="ph-syl" style={{
      margin: '0 auto', padding: '0 28px 96px', maxWidth: 640,
    }}>
      <style>{BLEND_CSS}</style>

      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '16px 0' }}>
        <button onClick={smartBack} aria-label={t('phonetics.blend_back_aria', lang)} style={iconBtn}><ArrowLeft size={18} /></button>
        <div style={{ fontFamily: 'ui-monospace, monospace', fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', color: 'var(--color-ink-3)' }}>
          Stage {stageId} · {t('phonetics.blend_topbar_tag', lang)}
        </div>
        <div style={{ width: 44 }} />
      </div>

      <div className="sl-card">
        <div className="sl-topbar">
          <div className="sl-progress">
            <div className="sl-progress-fill" style={{ width: `${progressPct}%` }} />
          </div>
          <div className={`sl-combo${combo === 0 ? ' zero' : ''}`}>🔥 x{combo}</div>
        </div>

        {phase === 'quiz' && (
        <>
        <div className="sl-prompt">
          {qNum} / {TOTAL_Q} · {t('phonetics.blend_prompt_1', lang)}<b style={{ color: 'var(--color-mint-strong)' }}>{t('phonetics.blend_prompt_block', lang)}</b>{t('phonetics.blend_prompt_2', lang)}
        </div>

        <div className="sl-visual">
          <div className="sl-piece">
            <div className="sl-block" style={{ borderColor: 'rgba(255,127,168,.5)', background: 'rgba(255,127,168,.08)' }}>
              {q.cho}
            </div>
            <span className="sl-block-label">{t('phonetics.blend_label_consonant', lang)} · {q.choRoman || '∅'}</span>
            <button type="button" className="sl-mini-play" aria-label={t('phonetics.blend_play_consonant_aria', lang, { jamo: q.cho })} onClick={() => playSlot('cho', q.cho)}>▶</button>
          </div>
          <div className="sl-op">＋</div>
          <div className="sl-piece">
            <div className="sl-block" style={{ borderColor: 'rgba(174,227,216,.6)', background: 'rgba(174,227,216,.18)' }}>
              {q.jung}
            </div>
            <span className="sl-block-label">{t('phonetics.blend_label_vowel', lang)} · {q.jungRoman}</span>
            <button type="button" className="sl-mini-play" aria-label={t('phonetics.blend_play_vowel_aria', lang, { jamo: q.jung })} onClick={() => playSlot('jung', q.jung)}>▶</button>
          </div>
          <div className="sl-op">＝</div>
          <div className="sl-piece">
            <button
              type="button"
              key={q.syllable}
              onClick={playMain}
              aria-label={t('phonetics.blend_play_syllable_aria', lang, { syl: q.syllable })}
              className="sl-result"
            >{q.syllable}</button>
            <span className="sl-block-label">{t('phonetics.blend_tap_to_hear', lang)}</span>
            <button type="button" className="sl-mini-play result" aria-label={t('phonetics.blend_play_composed_aria', lang, { syl: q.syllable })} onClick={playMain}>▶</button>
          </div>
        </div>

        <div className="sl-options">
          {q.options.map((opt) => {
            const isOptCorrect = opt.roman === q.correctRoman;
            const isPicked = picked === opt.roman;
            let cls = 'sl-opt';
            if (picked || revealed) {
              // 答对/揭晓：正确选项变绿；答错：只让用户选的那个抖动变红
              if (showAnswer && isOptCorrect) cls += ' correct';
              else if (isWrong && isPicked) cls += ' wrong';
            }
            return (
              <button
                key={`${opt.roman}-${opt.jamo}`}
                onClick={() => handlePick(opt)}
                disabled={!!picked || revealed}
                className={cls}
              >
                {opt.roman}
              </button>
            );
          })}
        </div>

        {showAnswer && (
          <div className="sl-break">
            <span className="sl-break-tag">🔍 {t('phonetics.blend_breakdown_tag', lang)}</span>
            <div className="sl-break-body">
              <span className="sl-syl">{q.syllable}</span>
              {' '}{t('phonetics.blend_breakdown_eq_consonant', lang)}{' '}
              <span className="sl-jamo">{q.cho}</span>
              <span className="sl-rom">({q.choRoman || '∅'})</span>
              {' '}{t('phonetics.blend_breakdown_plus_vowel', lang)}{' '}
              <span className="sl-jamo">{q.jung}</span>
              <span className="sl-rom">({q.jungRoman})</span>
              {' = '}
              <span className="sl-rom sl-rom-big">{q.correctRoman}</span>
              <span className="sl-hint">{layoutHint}</span>
            </div>
          </div>
        )}

        {isWrong && !revealed && (
          <button
            onClick={handleReveal}
            style={{
              marginTop: 12, width: '100%', padding: '10px 18px',
              fontSize: 13, fontWeight: 600, borderRadius: 12,
              border: '1px solid var(--color-border-2)',
              background: 'var(--color-surface-2)', color: 'var(--color-ink-2)',
              cursor: 'pointer',
            }}
          >{t('phonetics.blend_dont_know', lang)}</button>
        )}

        {showAnswer && (
          composedStrokes.length > 0 && isCorrect ? (
            <button className="sl-next" onClick={enterWritePhase}>
              {t('phonetics.blend_next_step_write', lang)} <span style={{ fontFamily: "'Noto Sans KR', sans-serif" }}>{q.syllable}</span> →
            </button>
          ) : (
            <button className="sl-next" onClick={handleNext}>
              {qNum >= TOTAL_Q ? t('phonetics.blend_done_to_challenge', lang) : t('phonetics.blend_next_q', lang, { cur: qNum, total: TOTAL_Q })}
            </button>
          )
        )}
        </>
        )}

        {phase === 'write' && (
        <>
        <div className="sl-write-head">
          <div className="sl-write-title">
            {t('phonetics.blend_write_title', lang)} <span style={{ fontFamily: "'Noto Sans KR', sans-serif", fontSize: 22 }}>{q.syllable}</span>
            <button
              type="button"
              className="sl-mini-play result"
              aria-label={t('phonetics.blend_play_syllable_aria', lang, { syl: q.syllable })}
              onClick={playMain}
              style={{ marginLeft: 10, verticalAlign: 'middle' }}
            >▶</button>
          </div>
          <div className="sl-write-sub">
            {q.cho} ({q.choRoman || '∅'}) + {q.jung} ({q.jungRoman}) = {q.correctRoman}
          </div>
        </div>
        <div className="sl-write-anim">
          <div key={q.syllable} className="sl-compose">
            <span className="sl-compose-piece" style={{ animationDelay: '0s' }}>{q.cho}</span>
            <span className="sl-compose-op" style={{ animationDelay: '0.15s' }}>+</span>
            <span className="sl-compose-piece" style={{ animationDelay: '0.3s' }}>{q.jung}</span>
            <span className="sl-compose-op" style={{ animationDelay: '0.45s' }}>=</span>
            <span
              className="sl-compose-result"
              style={{ animationDelay: '0.6s' }}
            >{q.syllable}</span>
          </div>
        </div>
        <StrokeCanvas
          key={`${q.syllable}-canvas`}
          targetStrokeCount={composedStrokes.length}
          ghostChar={q.syllable}
          idealStrokes={composedStrokes}
          onCoverageChange={setCoveragePct}
          coverageThresholdPx={40}
          hideStrokeCounter
          hideToolbar
        />
        <div className="sl-write-progress">
          {t('phonetics.blend_write_progress', lang, { pct: coveragePct, pass: COVERAGE_PASS })}
        </div>
        <button
          className="sl-next"
          onClick={handleNext}
          disabled={coveragePct < COVERAGE_PASS}
        >
          {coveragePct < COVERAGE_PASS
            ? t('phonetics.blend_write_continue', lang, { pct: coveragePct, pass: COVERAGE_PASS })
            : (qNum >= TOTAL_Q ? t('phonetics.blend_done_to_challenge', lang) : t('phonetics.blend_next_q', lang, { cur: qNum, total: TOTAL_Q }))}
        </button>
        {coveragePct < COVERAGE_PASS && (
          <button
            onClick={handleNext}
            style={{
              marginTop: 10, width: '100%', padding: '10px 24px',
              fontSize: 13, fontWeight: 500, borderRadius: 12,
              border: '1px solid var(--color-border-2)',
              background: 'var(--color-surface-2)',
              color: 'var(--color-ink-3)', cursor: 'pointer',
            }}
          >
            {t('phonetics.blend_skip_write', lang)}
          </button>
        )}
        </>
        )}
      </div>
    </div>
    </div>
    <StepRail stageId={stageId} current="blend" />
    </div>
  );
}
