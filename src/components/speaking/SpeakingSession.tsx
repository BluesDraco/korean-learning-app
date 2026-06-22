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

type ItemResult = 'correct' | 'close' | 'wrong' | null;

function getSimilarity(a: string, b: string): number {
  const na = normalizeKorean(a);
  const nb = normalizeKorean(b);
  if (na === nb) return 1;
  if (!na || !nb) return 0;
  const maxLen = Math.max(na.length, nb.length);
  // Levenshtein distance
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

function getResult(similarity: number): ItemResult {
  if (similarity >= 0.85) return 'correct';
  if (similarity >= 0.6) return 'close';
  return 'wrong';
}

const RESULT_CONFIG = {
  correct: { label: '正确', color: '#3aafa9', bg: '#eaf8f5', emoji: '✅' },
  close:   { label: '接近', color: '#e8a87c', bg: '#fff6ee', emoji: '⚠️' },
  wrong:   { label: '错误', color: '#e04a6a', bg: '#fff0f4', emoji: '❌' },
};

export function SpeakingSession({ items, onExit, exitLabel = '返回配置' }: SpeakingSessionProps) {
  const [index, setIndex] = useState(0);
  const [phase, setPhase] = useState<'prompt' | 'listening' | 'result'>('prompt');
  const [interim, setInterim] = useState('');
  const [finalText, setFinalText] = useState('');
  const [result, setResult] = useState<ItemResult>(null);
  const [similarity, setSimilarity] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [closeCount, setCloseCount] = useState(0);
  const [xpTotal, setXpTotal] = useState(0);
  const [done, setDone] = useState(false);
  const recognizerRef = useRef<KoreanSpeechRecognizer | null>(null);
  const [supported] = useState(() => isSpeechRecognitionSupported());

  const current = items[index];

  // cleanup on unmount
  useEffect(() => {
    return () => { recognizerRef.current?.abort(); };
  }, []);

  // reset state when moving to next item
  useEffect(() => {
    setPhase('prompt');
    setInterim('');
    setFinalText('');
    setResult(null);
    setSimilarity(0);
    setError(null);
    recognizerRef.current?.abort();
  }, [index]);

  const startListening = useCallback(() => {
    if (!supported) {
      setError('当前浏览器不支持语音识别，请使用 Chrome 浏览器。');
      return;
    }
    setError(null);
    setInterim('');
    setFinalText('');
    setPhase('listening');

    const recognizer = new KoreanSpeechRecognizer();
    recognizerRef.current = recognizer;

    recognizer
      .onInterim(t => setInterim(t))
      .onFinal(t => {
        setFinalText(t);
        setInterim('');
        const sim = getSimilarity(t, current.korean);
        const res = getResult(sim);
        setSimilarity(sim);
        setResult(res);
        setPhase('result');

        if (res === 'correct') {
          setCorrectCount(c => c + 1);
          awardXp(10).catch(() => {});
          setXpTotal(x => x + 10);
        } else if (res === 'close') {
          setCloseCount(c => c + 1);
          awardXp(4).catch(() => {});
          setXpTotal(x => x + 4);
        }

        // write to SRS
        const quality = res === 'correct' ? 4 : res === 'close' ? 2 : 1;
        const wordId = `speaking-${current.korean}`;
        db.words.get(wordId).then(existing => {
          const srsResult = calculateSRS(
            quality,
            existing?.srsLevel ?? 0,
            existing?.easeFactor ?? 2.5,
            existing?.interval ?? 1,
          );
          db.words.put({
            id: wordId,
            word: current.korean,
            pronunciation: '',
            meaning: current.meaning,
            partOfSpeech: '',
            examples: [],
            source: 'speaking',
            sourceDetail: current.type,
            mastery: res === 'correct' ? 'learning' : 'new',
            ...srsResult,
            createdAt: existing?.createdAt ?? Date.now(),
            lastReviewed: Date.now(),
          }).catch(() => {});
        }).catch(() => {});
      })
      .onError(reason => {
        setPhase('prompt');
        recognizerRef.current = null;
        if (reason === 'denied') {
          setError('麦克风权限被拒绝，请在浏览器设置中允许麦克风。');
        } else if (reason === 'not-supported') {
          setError('当前浏览器不支持语音识别，请使用 Chrome 浏览器。');
        } else {
          setError('识别失败，请再试一次。');
        }
      });

    recognizer.start();
  }, [current, supported]);

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

  function handlePlayAnswer() {
    speak(current.korean);
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
            {correctCount} 正确 · {closeCount} 接近 · {total - correctCount - closeCount} 错误
          </p>
        </div>
        <div style={{ background: '#eaf8f5', borderRadius: 14, padding: '10px 20px' }}>
          <span style={{ fontSize: 13, color: '#3aafa9', fontWeight: 700 }}>+{xpTotal} XP 已获得</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 340, marginTop: 8 }}>
          <button
            onClick={() => { setIndex(0); setCorrectCount(0); setCloseCount(0); setXpTotal(0); setDone(false); setPhase('prompt'); setFinalText(''); setResult(null); setSimilarity(0); setInterim(''); setError(null); }}
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

  const resultCfg = result ? RESULT_CONFIG[result] : null;

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
        {current.type === 'word' && (
          <span style={{ fontSize: 11, color: '#89756e', background: '#f5ede8', borderRadius: 99, padding: '3px 10px' }}>单词</span>
        )}
        {current.type === 'sentence' && (
          <span style={{ fontSize: 11, color: '#89756e', background: '#f5ede8', borderRadius: 99, padding: '3px 10px' }}>句子</span>
        )}
      </div>

      {/* Mic area */}
      {phase === 'prompt' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          {error && (
            <p style={{ fontSize: 13, color: '#e04a6a', textAlign: 'center', margin: 0 }}>{error}</p>
          )}
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

      {phase === 'listening' && (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <button
            onClick={stopListening}
            style={{
              width: 80, height: 80, borderRadius: '50%',
              background: '#ff7fa8',
              border: 'none', cursor: 'pointer',
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

      {phase === 'result' && resultCfg && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {/* Result badge */}
          <div style={{ background: resultCfg.bg, borderRadius: 16, padding: '16px 20px', display: 'flex', flexDirection: 'column', gap: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <span style={{ fontSize: 20 }}>{resultCfg.emoji}</span>
              <span style={{ fontSize: 15, fontWeight: 800, color: resultCfg.color }}>{resultCfg.label}</span>
              <span style={{ fontSize: 12, color: '#89756e', marginLeft: 'auto' }}>{Math.round(similarity * 100)}% 匹配</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#89756e', flexShrink: 0 }}>你说的：</span>
                <span style={{ fontSize: 15, color: '#241917', fontWeight: 600 }}>{finalText || '（未识别）'}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 12, color: '#89756e', flexShrink: 0 }}>正确答案：</span>
                <span style={{ fontSize: 15, color: resultCfg.color, fontWeight: 700 }}>{current.korean}</span>
                <button
                  onClick={handlePlayAnswer}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 2, flexShrink: 0 }}
                >
                  <Volume2 size={15} style={{ color: '#89756e' }} />
                </button>
              </div>
            </div>
          </div>

          {/* Next button */}
          <button
            onClick={handleNext}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '13px 0', borderRadius: 14, background: '#aee3d8', color: '#241917', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            {index + 1 >= items.length ? '查看结果' : '下一题'}
            <ChevronRight size={16} />
          </button>

          {/* Retry same item */}
          <button
            onClick={() => { setPhase('prompt'); setFinalText(''); setResult(null); setInterim(''); }}
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
      `}</style>
    </div>
  );
}
