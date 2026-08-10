'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff } from 'lucide-react';
import { useMicRecorder } from '@/lib/audio/useMicRecorder';
import { playCorrectSound, playWrongSound } from '@/lib/audio/sfx';
import { normalizeKorean } from '@/lib/koreanDiff';
import { awardXp, updateStreak } from '@/lib/gamification';
import { PracticeFeedbackCard } from '@/components/practice/PracticeFeedbackCard';
import { db } from '@/lib/db';
import { calculateSRS } from '@/lib/srs';
import { useIsDesktop } from '@/lib/useIsMobile';
import { useAuth } from '@/components/AuthProvider';
import { pushSpeakingHistory } from '@/lib/practice/aggregate';
import { OriginBadge } from '@/components/practice/OriginBadge';
import type { OriginKind } from '@/components/practice/OriginBadge';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { getGuestId } from '@/lib/guestId';
import { saveProgress, loadProgress, clearProgress, TTL_FLASHCARD } from '@/lib/progress-storage';

function itemsPosKey(prefix: string, uid: string, items: { korean: string }[]): string {
  let h = 0;
  const s = items.map(i => i.korean).join('|');
  for (let i = 0; i < s.length; i++) h = ((h << 5) - h + s.charCodeAt(i)) | 0;
  return `${prefix}:${uid}:${items.length}:${h.toString(36)}`;
}

export interface SpeakingItem {
  [k: string]: unknown;
  korean: string;
  meaning: string;
  type: 'word' | 'sentence';
  alternatives?: string[];
  origin?: OriginKind;
  originLabel?: string;
}

interface SpeakingSessionProps {
  [k: string]: unknown;
  items: SpeakingItem[];
  /** 通知外部当前进度 */
  onProgress?: (current: number, total: number) => void;
  /** 完成时的结算屏 · 必须传 */
  renderDone: (stats: { correct: number; acceptable: number; total: number; xp: number; onRetry: () => void }) => React.ReactNode;
  /** 通知外部会话结束 */
  onFinished?: () => void;
}

interface JudgeResult {
  [k: string]: unknown;
  result: 'correct' | 'acceptable' | 'wrong';
  score: number;
  correctAnswer: string;
  alternativeAnswers: string[];
  errorReason: string | null;
  tip: string | null;
  grammar: string | null;
}

function getSimilarity(a: string, b: string): number {
  const na = normalizeKorean(a);
  const nb = normalizeKorean(b);
  if (na === nb) return 1;
  if (!na || !nb) return 0;
  const maxLen = Math.max(na.length, nb.length);
  const dp: number[][] = Array.from({ length: na.length + 1 }, (_, i) =>
    Array.from({ length: nb.length + 1 }, (_, j) => (i === 0 ? j : j === 0 ? i : 0))
  );
  for (let i = 1; i <= na.length; i++) {
    for (let j = 1; j <= nb.length; j++) {
      dp[i][j] = na[i - 1] === nb[j - 1]
        ? dp[i - 1][j - 1]
        : 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
    }
  }
  return 1 - dp[na.length][nb.length] / maxLen;
}

function fallbackJudge(spoken: string, target: string, alternatives: string[] = []): JudgeResult {
  const candidates = [target, ...alternatives];
  const sim = Math.max(...candidates.map(c => getSimilarity(spoken, c)));
  const result = sim >= 0.85 ? 'correct' : sim >= 0.6 ? 'acceptable' : 'wrong';
  return { result, score: Math.round(sim * 100), correctAnswer: target, alternativeAnswers: alternatives, errorReason: null, tip: null, grammar: null };
}

const SPEAKING_KEYFRAMES = `
  @keyframes pulse { 0%,100%{transform:scale(1);box-shadow:0 0 0 0 rgba(255,127,168,.4)}50%{transform:scale(1.05);box-shadow:0 0 0 10px rgba(255,127,168,0)} }
  @keyframes spin { to{transform:rotate(360deg)} }
  @keyframes sp-bounce { 0%,80%,100%{transform:scale(.5);opacity:.4} 40%{transform:scale(1);opacity:1} }
  @keyframes sp-pop { 0%{transform:scale(.96)} 60%{transform:scale(1.015)} 100%{transform:scale(1)} }
`;

export function SpeakingSession({ items, onProgress, renderDone, onFinished }: SpeakingSessionProps) {
  const { user } = useAuth();
  const { lang } = useLang();
  const posKey = itemsPosKey('speaking-say-pos', user?.id ?? 'guest', items);
  const [index, setIndex] = useState(() => {
    const saved = loadProgress<{ idx: number; total: number }>(posKey);
    if (saved && saved.total === items.length && saved.idx > 0 && saved.idx < items.length) return saved.idx;
    return 0;
  });
  const [phase, setPhase] = useState<'prompt' | 'recording' | 'recognizing' | 'judging' | 'result'>('prompt');
  const [finalText, setFinalText] = useState('');
  const [judgeResult, setJudgeResult] = useState<JudgeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [acceptableCount, setAcceptableCount] = useState(0);
  const [xpTotal, setXpTotal] = useState(0);
  const [done, setDone] = useState(false);
  const isDesktop = useIsDesktop();
  // 已经计分过的题号,retry 不重复发 XP / 加计数
  const scoredIndicesRef = useRef<Set<number>>(new Set());
  // 当前题/题号的最新引用 · 供 ASR 异步回调取值
  const currentRef = useRef({ item: items[0], index: 0 });

  useEffect(() => {
    onProgress?.(index + 1, items.length);
  }, [index, items.length, onProgress]);

  useEffect(() => {
    if (done) { clearProgress(posKey); return; }
    saveProgress(posKey, { idx: index, total: items.length }, TTL_FLASHCARD);
  }, [index, done, posKey, items.length]);

  const current = items[index];
  currentRef.current = { item: current, index };

  const judgeSpoken = useCallback(async (spoken: string, item: SpeakingItem, idxForScore: number) => {
    if (!normalizeKorean(spoken)) {
      setPhase('prompt');
      setError(t('sp.asr_fail', lang));
      return;
    }
    setFinalText(spoken);
    setPhase('judging');
    let jr: JudgeResult;
    const alternatives = item.alternatives ?? [];
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000);
      const res = await fetch('/api/ai/speaking-judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spoken, target: item.korean, meaning: item.meaning, type: item.type, alternatives }),
        signal: controller.signal,
      });
      clearTimeout(timeoutId);
      if (!res.ok) throw new Error(`${res.status}`);
      jr = await res.json();
    } catch {
      jr = fallbackJudge(spoken, item.korean, alternatives);
    }

    setJudgeResult(jr);
    setPhase('result');
    // 答对/一般给正反馈音,错给克制音 · 与打字体验一致
    if (jr.result === 'wrong') playWrongSound(); else playCorrectSound();

    // 同题重试不重复计分/发 XP
    const alreadyScored = scoredIndicesRef.current.has(idxForScore);
    if (!alreadyScored) {
      if (jr.result === 'correct') {
        setCorrectCount(c => c + 1);
        awardXp(10).catch(e => console.error('[speaking] awardXp (correct) failed', e));
        setXpTotal(x => x + 10);
        scoredIndicesRef.current.add(idxForScore);
      } else if (jr.result === 'acceptable') {
        setAcceptableCount(c => c + 1);
        awardXp(4).catch(e => console.error('[speaking] awardXp (acceptable) failed', e));
        setXpTotal(x => x + 4);
        scoredIndicesRef.current.add(idxForScore);
      }
      // wrong 不加入 scored,允许 retry 后答对再计分
    }

    const quality = jr.result === 'correct' ? 4 : jr.result === 'acceptable' ? 2 : 1;
    const wordId = `speaking-${item.korean}`;
    db.words.get(wordId).then(existing => {
      const srsResult = calculateSRS(quality, existing?.srsLevel ?? 0, existing?.easeFactor ?? 2.5, existing?.interval ?? 1);
      db.words.put({
        id: wordId, word: item.korean, pronunciation: '', meaning: item.meaning,
        partOfSpeech: '', examples: [], source: 'speaking', sourceDetail: item.type,
        mastery: jr.result === 'correct' ? 'learning' : 'new',
        ...srsResult, createdAt: existing?.createdAt ?? Date.now(), lastReviewed: Date.now(),
      }).catch(e => console.error('[speaking] db.words.put failed', e));
    }).catch(e => console.error('[speaking] db.words.get failed', e));

    // 所有答题（对/错）都写入共享错题本，保持练习历史完整
    // correct 字段区分正误，错题可在默写「错题重练」集中攻克
    const isCorrect = jr.result !== 'wrong';
    db.dictationRecords.add({
      id: `speak-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      userId: user?.id || getGuestId(),
      wordId: item.korean,
      meaning: item.meaning,
      date: Date.now(),
      correct: isCorrect,
      userInput: normalizeKorean(spoken),
    }).catch(e => console.error('[speaking] dictationRecords.add failed', e));
  }, [user?.id, lang]);

  const mic = useMicRecorder({
    onResult: (text) => {
      const { item, index: idx } = currentRef.current;
      judgeSpoken(text, item, idx);
    },
    onError: (msg) => { setPhase('prompt'); setError(msg); },
  });

  const startListening = useCallback(() => {
    setError(null);
    setFinalText('');
    setJudgeResult(null);
    setPhase('recording');
    mic.start();
  }, [mic]);

  const stopListening = useCallback(() => {
    setPhase('recognizing');
    mic.stop();
  }, [mic]);

  // 切题时重置 · 取消在途录音/识别
  useEffect(() => {
    setPhase('prompt');
    setFinalText('');
    setJudgeResult(null);
    setError(null);
    mic.cancel();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  function handleNext() {
    if (index + 1 >= items.length) {
      pushSpeakingHistory(user?.id || getGuestId(), correctCount + acceptableCount, items.length);
      updateStreak().catch(e => console.error('[speaking] updateStreak failed', e));
      setDone(true);
      onFinished?.();
    }
    else setIndex(i => i + 1);
  }

  function handleRetry() {
    setFinalText('');
    setJudgeResult(null);
    // 直接开麦,避免多一次点击
    startListening();
  }

  function handleSkip() {
    // 跳过 = 不计分/不写 SRS,视作未过(wrong),不推高命中率
    mic.cancel();
    setFinalText(t('sp.skipped', lang));
    setError(null);
    setJudgeResult({
      result: 'wrong',
      score: 0,
      correctAnswer: current.korean,
      alternativeAnswers: current.alternatives ?? [],
      errorReason: null,
      tip: t('sp.skip_tip', lang),
      grammar: null,
    });
    setPhase('result');
  }

  function handleRestart() {
    mic.cancel();
    scoredIndicesRef.current.clear();
    setIndex(0); setCorrectCount(0); setAcceptableCount(0); setXpTotal(0);
    setDone(false); setPhase('prompt'); setFinalText(''); setJudgeResult(null);
    setError(null);
  }

  // ── Done screen · 完全由外层 renderDone 掌控 ──
  if (done) {
    return <>{renderDone({
      correct: correctCount,
      acceptable: acceptableCount,
      total: items.length,
      xp: xpTotal,
      onRetry: handleRestart,
    })}</>;
  }

  const originBadge = <OriginBadge origin={current.origin} label={current.originLabel} />;

  // ── Result feedback block (shared between mobile and desktop) ──
  const resultBlock = judgeResult && (
    <div style={{ animation: 'sp-pop .32s var(--hr-ease)' }}>
      <PracticeFeedbackCard
        verdict={judgeResult.result}
        score={judgeResult.score}
        yourValue={finalText}
        yourLabel={t('sp.your_words', lang)}
        target={judgeResult.correctAnswer}
        alternatives={judgeResult.alternativeAnswers}
        reason={judgeResult.errorReason}
        tip={judgeResult.tip}
        grammar={judgeResult.grammar}
        onNext={handleNext}
        nextLabel={index + 1 >= items.length ? t('sp.view_result', lang) : t('sp.next_q', lang)}
        onRetry={handleRetry}
        retryLabel={t('sp.say_again', lang)}
        ttsEnabled
      />
      {judgeResult.result === 'wrong' && (
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 10, background: 'var(--hr-surface-3)', border: '1px solid var(--hr-border-2)', borderRadius: 999, padding: '5px 12px' }}>
          <span style={{ fontSize: 13 }} aria-hidden>🧠</span>
          <span style={{ fontSize: 12, color: 'var(--hr-ink-2)', fontWeight: 600 }}>{t('sp.added_to_mistakes_dict', lang)}</span>
        </div>
      )}
    </div>
  );

  // ── Mic interaction block (shared between mobile and desktop) ──
  const micBlock = (
    <>
      {phase === 'prompt' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 24 }}>
          {error && <p style={{ fontSize: 13, color: 'var(--hr-pink-strong)', textAlign: 'center', margin: 0 }}>{error}</p>}
          <button onClick={startListening} style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--hr-mint-base)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'transform 0.1s', boxShadow: '0 8px 24px rgba(125,198,179,.35)' }}>
            <Mic size={34} style={{ color: 'var(--hr-surface-1)' }} />
          </button>
          <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: 0 }}>{t('sp.tap_mic_speak', lang)}</p>
          <button
            onClick={handleSkip}
            style={{
              marginTop: 4, background: 'transparent', border: 'none', cursor: 'pointer',
              color: 'var(--hr-ink-3)', fontSize: 12, textDecoration: 'underline',
              textDecorationStyle: 'dashed', textUnderlineOffset: 3, padding: '4px 8px',
            }}
          >
            {t('sp.view_answer_skip', lang)}
          </button>
        </div>
      )}
      {phase === 'recording' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: 24 }}>
          <button onClick={stopListening} style={{ width: 88, height: 88, borderRadius: '50%', background: 'var(--hr-pink-strong)', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', animation: 'pulse 1.2s infinite', boxShadow: '0 8px 24px rgba(229,90,135,.35)' }}>
            <MicOff size={34} style={{ color: 'var(--hr-surface-1)' }} />
          </button>
          <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', margin: 0 }}>{t('sp.recording_stop', lang)}</p>
        </div>
      )}
      {(phase === 'recognizing' || phase === 'judging') && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14, padding: '34px 24px' }}>
          <div style={{ display: 'flex', gap: 7, alignItems: 'center' }} aria-hidden>
            {[0, 1, 2].map(i => (
              <span key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: 'var(--hr-mint-base)', animation: `sp-bounce 1.2s ${i * 0.16}s infinite ease-in-out` }} />
            ))}
          </div>
          <p style={{ fontSize: 13, color: 'var(--hr-ink-2)', margin: 0, fontWeight: 600 }}>
            {phase === 'recognizing' ? t('sp.tori_listening', lang) : t('sp.tori_reviewing', lang)}
          </p>
          {phase === 'judging' && finalText && <p style={{ fontFamily: 'var(--hr-hangul)', fontSize: 15, color: 'var(--hr-ink-1)', fontWeight: 600, margin: 0, textAlign: 'center' }}>「{finalText}」</p>}
        </div>
      )}
    </>
  );

  // ── Desktop layout ──
  if (isDesktop) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20, paddingBottom: 24, maxWidth: 720, margin: '0 auto' }}>
        {/* Prompt 卡 · 中文题干 · padding-top 加大避让徽章 */}
        <div style={{
          background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
          borderRadius: 16, padding: '36px 32px 28px', display: 'flex', flexDirection: 'column',
          alignItems: 'center', gap: 12, boxShadow: 'var(--hr-shadow-sm)',
          position: 'relative',
        }}>
          {originBadge}
          <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: 'var(--hr-ink-3)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0 }}>{t('sp.say_in_korean', lang)}</p>
          <p style={{ fontSize: 36, fontWeight: 800, color: 'var(--hr-ink-1)', margin: 0, textAlign: 'center', lineHeight: 1.3, letterSpacing: '-.01em' }}>{current.meaning}</p>
          <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: 'var(--hr-ink-3)', background: 'var(--hr-surface-3)', border: '1px solid var(--hr-border-2)', borderRadius: 99, padding: '3px 12px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
            {current.type === 'word' ? 'Word' : 'Sentence'}
          </span>
        </div>

        {/* 答题区 · 反馈展开时取代 mic 区 */}
        {phase === 'result' && resultBlock ? resultBlock : (
          <div style={{
            background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
            borderRadius: 16, display: 'flex', flexDirection: 'column', alignItems: 'stretch',
            justifyContent: 'center', minHeight: 220, boxShadow: 'var(--hr-shadow-sm)', overflow: 'hidden',
          }}>
            {micBlock}
          </div>
        )}

        <style>{SPEAKING_KEYFRAMES}</style>
      </div>
    );
  }

  // ── Mobile layout ──
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 20 }}>
      <div style={{ background: 'var(--hr-surface-2)', borderRadius: 16, border: '1.5px solid var(--hr-border-2)', padding: '38px 20px 28px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, boxShadow: 'var(--hr-shadow-sm)', position: 'relative' }}>
        {originBadge}
        <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10.5, color: 'var(--hr-ink-3)', letterSpacing: '.14em', textTransform: 'uppercase', margin: 0 }}>{t('sp.say_in_korean', lang)}</p>
        <p style={{ fontSize: 32, fontWeight: 800, color: 'var(--hr-ink-1)', margin: 0, textAlign: 'center', lineHeight: 1.3, letterSpacing: '-.01em' }}>{current.meaning}</p>
        <span style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, color: 'var(--hr-ink-3)', background: 'var(--hr-surface-3)', border: '1px solid var(--hr-border-2)', borderRadius: 99, padding: '3px 10px', letterSpacing: '.14em', textTransform: 'uppercase' }}>
          {current.type === 'word' ? 'Word' : 'Sentence'}
        </span>
      </div>

      {/* 反馈展开时取代 mic 区,不共存 */}
      {phase === 'result' && resultBlock ? resultBlock : micBlock}

      <style>{SPEAKING_KEYFRAMES}</style>
    </div>
  );
}
