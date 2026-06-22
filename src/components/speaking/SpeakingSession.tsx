'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Mic, MicOff, ChevronRight, Trophy, Volume2 } from 'lucide-react';
import { KoreanSpeechRecognizer, isSpeechRecognitionSupported } from '@/lib/audio/speechRecognition';
import { normalizeKorean } from '@/lib/koreanDiff';
import { speak } from '@/lib/tts';
import { awardXp } from '@/lib/gamification';
import { db } from '@/lib/db';
import { calculateSRS } from '@/lib/srs';

export interface SpeakingItem {
  korean: string;
  meaning: string;
  type: 'word' | 'sentence';
}

interface SpeakingSessionProps {
  items: SpeakingItem[];
  onExit: () => void;
  exitLabel?: string;
}

interface JudgeResult {
  result: 'correct' | 'acceptable' | 'wrong';
  score: number;
  correctAnswer: string;
  alternativeAnswers: string[];
  errorReason: string | null;
  tip: string | null;
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

function fallbackJudge(spoken: string, target: string): JudgeResult {
  const sim = getSimilarity(spoken, target);
  const result = sim >= 0.85 ? 'correct' : sim >= 0.6 ? 'acceptable' : 'wrong';
  return {
    result,
    score: Math.round(sim * 100),
    correctAnswer: target,
    alternativeAnswers: [],
    errorReason: null,
    tip: null,
  };
}

const RESULT_CONFIG = {
  correct:    { label: '正确', color: '#3aafa9', bg: '#eaf8f5', emoji: '✅' },
  acceptable: { label: '接近', color: '#e8a87c', bg: '#fff6ee', emoji: '⚠️' },
  wrong:      { label: '错误', color: '#e04a6a', bg: '#fff0f4', emoji: '❌' },
};

export function SpeakingSession({ items, onExit, exitLabel = '返回配置' }: SpeakingSessionProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'prompt' | 'listening' | 'judging' | 'result'>('prompt');
  const [interim, setInterim] = useState('');
  const [finalText, setFinalText] = useState('');
  const [judgeResult, setJudgeResult] = useState<JudgeResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [acceptableCount, setAcceptableCount] = useState(0);
  const [xpTotal, setXpTotal] = useState(0);
  const [done, setDone] = useState(false);
  const recognizerRef = useRef<KoreanSpeechRecognizer | null>(null);
  const [supported] = useState(() => isSpeechRecognitionSupported());

  const current = items[index];

  useEffect(() => {
    return () => { recognizerRef.current?.abort(); };
  }, []);

  useEffect(() => {
    setPhase('prompt');
    setInterim('');
    setFinalText('');
    setJudgeResult(null);
    setError(null);
    recognizerRef.current?.abort();
  }, [index]);

  const judgeSpoken = useCallback(async (spoken: string, item: SpeakingItem) => {
    setPhase('judging');
    let jr: JudgeResult;
    try {
      const res = await fetch('/api/ai/speaking-judge', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ spoken, target: item.korean, meaning: item.meaning, type: item.type }),
      });
      if (!res.ok) throw new Error(`${res.status}`);
      jr = await res.json();
    } catch {
      jr = fallbackJudge(spoken, item.korean);
    }

    setJudgeResult(jr);
    setPhase('result');

    if (jr.result === 'correct') {
      setCorrectCount(c => c + 1);
      awardXp(10).catch(() => {});
      setXpTotal(x => x + 10);
    } else if (jr.result === 'acceptable') {
      setAcceptableCount(c => c + 1);
      awardXp(4).catch(() => {});
      setXpTotal(x => x + 4);
    }

    const quality = jr.result === 'correct' ? 4 : jr.result === 'acceptable' ? 2 : 1;
    const wordId = `speaking-${item.korean}`;
    db.words.get(wordId).then(existing => {
      const srsResult = calculateSRS(
        quality,
        existing?.srsLevel ?? 0,
        existing?.easeFactor ?? 2.5,
        existing?.interval ?? 1,
      );
      db.words.put({
        id: wordId,
        word: item.korean,
        pronunciation: '',
        meaning: item.meaning,
        partOfSpeech: '',
        examples: [],
        source: 'speaking',
        sourceDetail: item.type,
        mastery: jr.result === 'correct' ? 'learning' : 'new',
        ...srsResult,
        createdAt: existing?.createdAt ?? Date.now(),
        lastReviewed: Date.now(),
      }).catch(() => {});
    }).catch(() => {});
  }, []);

  const startListening = useCallback(() => {
    if (!supported) {
      setError('当前浏览器不支持语音识别，请使用 Chrome 浏览器。');
      return;
    }
    setError(null);
    setInterim('');
    setFinalText('');
    setJudgeResult(null);
    setPhase('listening');

    const recognizer = new KoreanSpeechRecognizer();
    recognizerRef.current = recognizer;

    recognizer
      .onInterim(t => setInterim(t))
      .onFinal(t => {
        setFinalText(t);
        setInterim('');
        judgeSpoken(t, current);
      })
      .onError(reason => {
        setPhase('prompt');
        recognizerRef.current = null;
        if (reason === 'denied') {
          setError('麦克风权限被拒绝，请在浏览器设置中允许麦克风。');
        } else if (reason === 'not-supported') {
          setError('当前浏览器不支持语音识别，请使用 Chrome 浏览器。');
        } else if (reason === 'network') {
          setError('网络异常导致识别失败，请检查网络后重试。');
        } else {
          setError('未能识别到语音，请重新说一次。');
        }
      });

    recognizer.start();
  }, [current, supported, judgeSpoken]);

  const stopListening = useCallback(() => {
    recognizerRef.current?.stop();
  }, []);

  function handleNext() {
    if (index + 1 >= items.length) {
      setDone(true);
    } else {
      setIndex(i => i + 1);
    }
  }

  function handleRetry() {
    setPhase('prompt');
    setFinalText('');
    setJudgeResult(null);
    setInterim('');
  }

  function handleRestart() {
    setIndex(0);
    setCorrectCount(0);
    setAcceptableCount(0);
    setXpTotal(0);
    setDone(false);
    setPhase('prompt');
    setFinalText('');
    setJudgeResult(null);
    setInterim('');
    setError(null);
  }

  // ── Done screen ──
  if (done) {
    const total = items.length;
    const pct = Math.round((correctCount / total) * 100);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 20, padding: '0 20px' }}>
        <div style={{ background: '#fff0f5', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Trophy size={36} style={{ color: '#ff7fa8' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 28, fontWeight: 900, color: '#241917', margin: 0 }}>{pct}%</p>
          <p style={{ fontSize: 14, color: '#89756e', marginTop: 4 }}>
            {correctCount} 正确 · {acceptableCount} 接近 · {total - correctCount - acceptableCount} 错误
          </p>
        </div>
        <div style={{ background: '#eaf8f5', borderRadius: 14, padding: '10px 20px' }}>
          <span style={{ fontSize: 13, color: '#3aafa9', fontWeight: 700 }}>+{xpTotal} XP 已获得</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 340, marginTop: 8 }}>
          <button
            onClick={handleRestart}
            style={{ padding: '13px 0', borderRadius: 14, background: '#241917', color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            再来一轮
          </button>
          <button
            onClick={onExit}
            style={{ padding: '13px 0', borderRadius: 14, background: '#f5ede8', color: '#5a4640', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            {exitLabel}
          </button>
        </div>
      </div>
    );
  }

  const cfg = judgeResult ? RESULT_CONFIG[judgeResult.result] : null;

  // ── Session screen ──
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 20 }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 6, background: '#eee0d8', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(index / items.length) * 100}%`, background: '#aee3d8', borderRadius: 999, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontSize: 12, color: '#89756e', whiteSpace: 'nowrap' }}>{index + 1} / {items.length}</span>
      </div>

      {/* Prompt card */}
      <div style={{ background: 'white', borderRadius: 20, border: '1px solid #eee0d8', padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <p style={{ fontSize: 13, color: '#89756e', margin: 0 }}>用韩语说出下面的意思</p>
        <p style={{ fontSize: 32, fontWeight: 900, color: '#241917', margin: 0, textAlign: 'center', lineHeight: 1.3 }}>
          {current.meaning}
        </p>
        <span style={{ fontSize: 11, color: '#89756e', background: '#f5ede8', borderRadius: 99, padding: '3px 10px' }}>
          {current.type === 'word' ? '单词' : '句子'}
        </span>
      </div>

      {/* Prompt phase */}
      {phase === 'prompt' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          {error && <p style={{ fontSize: 13, color: '#e04a6a', textAlign: 'center', margin: 0 }}>{error}</p>}
          {!supported && (
            <p style={{ fontSize: 13, color: '#e04a6a', textAlign: 'center', margin: 0 }}>
              当前浏览器不支持语音识别，请使用 Chrome 浏览器。
            </p>
          )}
          <button
            onClick={startListening}
            disabled={!supported}
            style={{
              width: 80, height: 80, borderRadius: '50%',
              background: supported ? '#aee3d8' : '#eee0d8',
              border: 'none', cursor: supported ? 'pointer' : 'not-allowed',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              transition: 'transform 0.1s',
            }}
          >
            <Mic size={32} style={{ color: supported ? '#241917' : '#89756e' }} />
          </button>
          <p style={{ fontSize: 13, color: '#89756e', margin: 0 }}>点击麦克风开始说话</p>
        </div>
      )}

      {/* Listening phase */}
      {phase === 'listening' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <button
            onClick={stopListening}
            style={{
              width: 80, height: 80, borderRadius: '50%',
              background: '#ff7fa8', border: 'none', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              animation: 'pulse 1.2s infinite',
            }}
          >
            <MicOff size={32} style={{ color: 'white' }} />
          </button>
          <p style={{ fontSize: 13, color: '#89756e', margin: 0 }}>正在听...点击停止</p>
          {interim && (
            <p style={{ fontSize: 16, color: '#241917', fontWeight: 600, margin: 0, textAlign: 'center' }}>{interim}</p>
          )}
        </div>
      )}

      {/* Judging phase */}
      {phase === 'judging' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12, padding: '20px 0' }}>
          <div style={{ width: 40, height: 40, borderRadius: '50%', border: '3px solid #aee3d8', borderTopColor: '#3aafa9', animation: 'spin 0.8s linear infinite' }} />
          <p style={{ fontSize: 13, color: '#89756e', margin: 0 }}>AI 正在评估...</p>
          {finalText && (
            <p style={{ fontSize: 15, color: '#241917', fontWeight: 600, margin: 0, textAlign: 'center' }}>「{finalText}」</p>
          )}
        </div>
      )}

      {/* Result phase */}
      {phase === 'result' && cfg && judgeResult && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Result badge */}
          <div style={{ background: cfg.bg, borderRadius: 16, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>{cfg.emoji}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: cfg.color }}>{cfg.label}</span>
              <span style={{ fontSize: 12, color: '#89756e', marginLeft: 'auto' }}>{judgeResult.score}分</span>
            </div>

            {/* 你说的 */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#89756e', flexShrink: 0 }}>你说的：</span>
              <span style={{ fontSize: 15, color: '#241917', fontWeight: 600 }}>{finalText || '（未识别）'}</span>
            </div>

            {/* 标准答案 */}
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
              <span style={{ fontSize: 12, color: '#89756e', flexShrink: 0 }}>标准答案：</span>
              <span style={{ fontSize: 15, color: cfg.color, fontWeight: 700 }}>{judgeResult.correctAnswer}</span>
              <button
                onClick={() => speak(judgeResult.correctAnswer)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, flexShrink: 0 }}
              >
                <Volume2 size={15} style={{ color: '#89756e' }} />
              </button>
            </div>

            {/* 其他说法 */}
            {judgeResult.alternativeAnswers.length > 0 && (
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#89756e', flexShrink: 0, paddingTop: 2 }}>其他说法：</span>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                  {judgeResult.alternativeAnswers.map((alt, i) => (
                    <button
                      key={i}
                      onClick={() => speak(alt)}
                      style={{
                        display: 'flex', alignItems: 'center', gap: 4,
                        background: 'rgba(0,0,0,0.05)', border: 'none', borderRadius: 99,
                        padding: '3px 10px', cursor: 'pointer', fontSize: 13, color: '#241917', fontWeight: 600,
                      }}
                    >
                      {alt}
                      <Volume2 size={12} style={{ color: '#89756e' }} />
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* 错误原因 */}
            {judgeResult.errorReason && (
              <div style={{ background: 'rgba(224,74,106,0.08)', borderRadius: 10, padding: '8px 12px' }}>
                <p style={{ fontSize: 12, color: '#e04a6a', margin: 0, lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700 }}>错误原因：</span>{judgeResult.errorReason}
                </p>
              </div>
            )}

            {/* 小提示 */}
            {judgeResult.tip && (
              <div style={{ background: 'rgba(58,175,169,0.08)', borderRadius: 10, padding: '8px 12px' }}>
                <p style={{ fontSize: 12, color: '#3aafa9', margin: 0, lineHeight: 1.6 }}>
                  <span style={{ fontWeight: 700 }}>小提示：</span>{judgeResult.tip}
                </p>
              </div>
            )}
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '13px 0', borderRadius: 14, background: '#aee3d8', color: '#241917', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            {index + 1 >= items.length ? '查看结果' : '下一题'}
            <ChevronRight size={16} />
          </button>

          {/* Retry */}
          <button
            onClick={handleRetry}
            style={{ padding: '10px 0', borderRadius: 14, background: 'transparent', color: '#89756e', fontSize: 13, fontWeight: 600, border: '1px solid #eee0d8', cursor: 'pointer' }}
          >
            再说一次
          </button>
        </div>
      )}

      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 0 0 rgba(255,127,168,0.4); }
          50% { transform: scale(1.05); box-shadow: 0 0 0 10px rgba(255,127,168,0); }
        }
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
