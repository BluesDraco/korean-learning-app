'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Volume2, RotateCcw, ChevronRight, Trophy } from 'lucide-react';
import { speak } from '@/lib/tts';
import { awardXp } from '@/lib/gamification';
import { useIsDesktop } from '@/lib/useIsMobile';
import { DiffFeedback } from './DiffFeedback';
import { KoreanKeyboardDisplay } from './KoreanKeyboardDisplay';
import { db } from '@/lib/db';
import { normalizeKorean } from '@/lib/koreanDiff';

export interface DictationItem {
  korean: string;
  meaning: string;
  type: 'word' | 'sentence';
}

interface DifficultyConfig {
  speed: number;
  maxPlays: number;
  showHint: boolean;
}

const DIFFICULTY_CONFIG: Record<string, DifficultyConfig> = {
  beginner:     { speed: 0.8,  maxPlays: 3, showHint: true },
  intermediate: { speed: 0.75, maxPlays: 2, showHint: false },
  advanced:     { speed: 0.7,  maxPlays: 1, showHint: false },
};

interface DictationSessionProps {
  items: DictationItem[];
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  onExit: () => void;
  exitLabel?: string;
}

export function DictationSession({ items, difficulty, onExit, exitLabel = '返回配置' }: DictationSessionProps) {
  const config = DIFFICULTY_CONFIG[difficulty];
  const SESSION_KEY = `dictation-session-${items.map(i => i.korean).join(',').slice(0, 40)}`;

  const [index, setIndex] = useState(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (saved) {
        const { idx, total } = JSON.parse(saved) as { idx: number; total: number };
        if (total === items.length && idx > 0 && idx < items.length) return idx;
      }
    } catch { /* ignore */ }
    return 0;
  });
  const [input, setInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [playsLeft, setPlaysLeft] = useState(config.maxPlays);
  const [xpTotal, setXpTotal] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDesktop = useIsDesktop();

  // persist index
  useEffect(() => {
    if (done) { try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ } return; }
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ idx: index, total: items.length })); } catch { /* ignore */ }
  }, [index, done]);

  const current = items[index];

  const playAudio = useCallback(() => {
    if (playsLeft <= 0 || !current) return;
    speak(current.korean, config.speed);
    setPlaysLeft(p => p - 1);
  }, [current, playsLeft, config.speed]);

  function resetForItem() {
    setInput('');
    setSubmitted(false);
    setPlaysLeft(config.maxPlays);
  }

  useEffect(() => {
    if (!current) return;
    resetForItem();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, config]);

  function handleSubmit() {
    if (!input.trim() || submitted) return;
    const isCorrect = normalizeKorean(input) === normalizeKorean(current.korean);
    setSubmitted(true);
    if (isCorrect) {
      setCorrectCount(c => c + 1);
      awardXp(8).catch(() => {});
      setXpTotal(x => x + 8);
    }
    db.dictationRecords.add({
      id: `dict-${Date.now()}-${Math.random().toString(36).slice(2)}`,
      wordId: current.korean,
      meaning: current.meaning,
      date: Date.now(),
      correct: isCorrect,
      userInput: input.trim(),
    }).catch(() => {});
  }

  function handleNext() {
    if (index + 1 >= items.length) {
      setDone(true);
    } else {
      setIndex(i => i + 1);
      const nextItem = items[index + 1];
      if (nextItem) speak(nextItem.korean, config.speed);
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      if (!submitted) handleSubmit();
      else handleNext();
    }
  }

  if (done) {
    const pct = Math.round((correctCount / items.length) * 100);
    return (
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '60vh', gap: 20, padding: '0 20px' }}>
        <div style={{ background: '#fff0f5', borderRadius: '50%', width: 80, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Trophy size={36} style={{ color: '#ff7fa8' }} />
        </div>
        <div style={{ textAlign: 'center' }}>
          <p style={{ fontSize: 28, fontWeight: 900, color: '#241917', margin: 0 }}>{pct}%</p>
          <p style={{ fontSize: 14, color: '#89756e', marginTop: 4 }}>{correctCount} / {items.length} 题正确</p>
        </div>
        <div style={{ background: '#eaf8f5', borderRadius: 14, padding: '10px 20px' }}>
          <span style={{ fontSize: 13, color: '#3aafa9', fontWeight: 700 }}>+{xpTotal} XP 已获得</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 340, marginTop: 8 }}>
          <button
            onClick={() => { setIndex(0); setCorrectCount(0); setXpTotal(0); setDone(false); resetForItem(); }}
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

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, paddingBottom: 20 }}>
      {/* Progress bar */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ flex: 1, height: 6, background: '#eee0d8', borderRadius: 999, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${(index / items.length) * 100}%`, background: '#ff7fa8', borderRadius: 999, transition: 'width 0.3s' }} />
        </div>
        <span style={{ fontSize: 12, color: '#89756e', whiteSpace: 'nowrap' }}>{index + 1} / {items.length}</span>
      </div>

      {/* Card */}
      <div style={{ background: 'white', borderRadius: 20, border: '1px solid #eee0d8', padding: '24px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
        {config.showHint && (
          <div style={{ background: '#fff0f5', borderRadius: 10, padding: '6px 14px' }}>
            <span style={{ fontSize: 14, color: '#ff7fa8', fontWeight: 600 }}>{current.meaning}</span>
          </div>
        )}
        <button
          onClick={playAudio}
          disabled={playsLeft <= 0}
          style={{
            width: 72, height: 72, borderRadius: '50%',
            background: playsLeft > 0 ? '#ff7fa8' : '#eee0d8',
            border: 'none', cursor: playsLeft > 0 ? 'pointer' : 'not-allowed',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            transition: 'background 0.2s',
          }}
        >
          <Volume2 size={30} style={{ color: 'white' }} />
        </button>
        <div style={{ display: 'flex', gap: 6 }}>
          {Array.from({ length: config.maxPlays }).map((_, i) => (
            <div key={i} style={{ width: 8, height: 8, borderRadius: '50%', background: i < playsLeft ? '#ff7fa8' : '#eee0d8', transition: 'background 0.2s' }} />
          ))}
        </div>
        {submitted && (
          <button
            onClick={() => speak(current.korean, config.speed)}
            style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 13, color: '#89756e', background: 'transparent', border: '1px solid #eee0d8', borderRadius: 10, padding: '6px 12px', cursor: 'pointer' }}
          >
            <RotateCcw size={13} />
            再听一遍
          </button>
        )}
      </div>

      {/* Input */}
      {!submitted ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入你听到的韩语..."
            style={{
              width: '100%', padding: '14px 16px', borderRadius: 14,
              border: '2px solid #eee0d8', fontSize: 18, color: '#241917',
              outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
              background: 'white',
            }}
          />
          <p style={{ fontSize: 12, color: '#89756e', textAlign: 'center', margin: 0 }}>
            {isDesktop ? '使用实体键盘输入韩语，按键高亮显示如下' : '请切换系统键盘为韩语后输入'}
          </p>
          {isDesktop && <KoreanKeyboardDisplay value={input} />}
          <button
            onClick={handleSubmit}
            disabled={!input.trim()}
            style={{
              padding: '13px 0', borderRadius: 14,
              background: input.trim() ? '#241917' : '#eee0d8',
              color: input.trim() ? '#fff' : '#89756e',
              fontSize: 14, fontWeight: 700, border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
            }}
          >
            提交
          </button>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <DiffFeedback userInput={normalizeKorean(input)} correct={normalizeKorean(current.korean)} />
          <button
            onClick={handleNext}
            style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '13px 0', borderRadius: 14, background: '#ff7fa8', color: '#fff', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >
            {index + 1 >= items.length ? '查看结果' : '下一题'}
            <ChevronRight size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
