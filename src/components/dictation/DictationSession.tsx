'use client';

import { useState, useEffect, useRef } from 'react';
import { ChevronRight, Trophy } from 'lucide-react';
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

interface DictationSessionProps {
  items: DictationItem[];
  onExit: () => void;
  exitLabel?: string;
}

export function DictationSession({ items, onExit, exitLabel = '返回配置' }: DictationSessionProps) {
  const SESSION_KEY = `dictation-session-${items.map(i => i.korean).join(',').slice(0, 40)}`;

  const [index, setIndex] = useState(() => {
    if (typeof window === 'undefined') return 0;
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
  const [xpTotal, setXpTotal] = useState(0);
  const [correctCount, setCorrectCount] = useState(0);
  const [done, setDone] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const isDesktop = useIsDesktop();

  useEffect(() => {
    if (done) { try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ } return; }
    try { sessionStorage.setItem(SESSION_KEY, JSON.stringify({ idx: index, total: items.length })); } catch { /* ignore */ }
  }, [index, done]);

  const current = items[index];

  function resetForItem() {
    setInput('');
    setSubmitted(false);
  }

  useEffect(() => {
    if (!current) return;
    resetForItem();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

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
    }
  }

  function handleKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      if (!submitted) handleSubmit();
      else handleNext();
    }
  }

  // ── Done screen ──
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 400, marginTop: 8 }}>
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

  // ── Desktop layout ──
  if (isDesktop) {
    return (
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.5fr', gap: 24, paddingBottom: 24 }}>
        {/* Progress bar — full width */}
        <div style={{ gridColumn: '1 / -1', display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ flex: 1, height: 6, background: '#eee0d8', borderRadius: 999, overflow: 'hidden' }}>
            <div style={{ height: '100%', width: `${(index / items.length) * 100}%`, background: '#ff7fa8', borderRadius: 999, transition: 'width 0.3s' }} />
          </div>
          <span style={{ fontSize: 12, color: '#89756e', whiteSpace: 'nowrap' }}>{index + 1} / {items.length}</span>
        </div>

        {/* Left — prompt card */}
        <div className="desktop-card" style={{ padding: 32, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 16, minHeight: 280 }}>
          <p style={{ fontSize: 13, color: '#89756e', margin: 0 }}>用韩语写出下面的意思</p>
          <p style={{ fontSize: 40, fontWeight: 900, color: '#241917', margin: 0, textAlign: 'center', lineHeight: 1.3 }}>
            {current.meaning}
          </p>
          <span style={{ fontSize: 12, color: '#89756e', background: '#f5ede8', borderRadius: 99, padding: '4px 12px' }}>
            {current.type === 'word' ? '单词' : '句子'}
          </span>
          {submitted && (
            <div style={{ marginTop: 8, width: '100%', borderTop: '1px solid #eee0d8', paddingTop: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <p style={{ fontSize: 12, color: '#89756e', margin: 0 }}>正确答案</p>
              <p style={{ fontSize: 24, fontWeight: 800, color: '#3aafa9', margin: 0, textAlign: 'center' }}>{current.korean}</p>
            </div>
          )}
        </div>

        {/* Right — input / feedback */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          {!submitted ? (
            <>
              <input
                ref={inputRef}
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="输入韩语..."
                style={{
                  width: '100%', padding: '16px 18px', borderRadius: 14,
                  border: '2px solid #eee0d8', fontSize: 22, color: '#241917',
                  outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
                  background: 'white', transition: 'border-color 0.15s',
                }}
                onFocus={e => (e.target.style.borderColor = '#ff7fa8')}
                onBlur={e => (e.target.style.borderColor = '#eee0d8')}
              />
              <p style={{ fontSize: 12, color: '#89756e', margin: 0 }}>使用实体键盘输入韩语，按键高亮显示如下</p>
              <KoreanKeyboardDisplay value={input} />
              <button
                onClick={handleSubmit}
                disabled={!input.trim()}
                style={{
                  padding: '14px 0', borderRadius: 14,
                  background: input.trim() ? '#241917' : '#eee0d8',
                  color: input.trim() ? '#fff' : '#89756e',
                  fontSize: 15, fontWeight: 700, border: 'none', cursor: input.trim() ? 'pointer' : 'not-allowed',
                  transition: 'background 0.15s',
                }}
              >
                提交
              </button>
            </>
          ) : (
            <>
              <DiffFeedback userInput={normalizeKorean(input)} correct={normalizeKorean(current.korean)} />
              <button
                onClick={handleNext}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6, padding: '14px 0', borderRadius: 14, background: '#ff7fa8', color: '#fff', fontSize: 15, fontWeight: 700, border: 'none', cursor: 'pointer' }}
              >
                {index + 1 >= items.length ? '查看结果' : '下一题'}
                <ChevronRight size={16} />
              </button>
            </>
          )}
        </div>
      </div>
    );
  }

  // ── Mobile layout ──
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
      <div style={{ background: 'white', borderRadius: 20, border: '1px solid #eee0d8', padding: '32px 20px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
        <p style={{ fontSize: 13, color: '#89756e', margin: 0 }}>用韩语写出下面的意思</p>
        <p style={{ fontSize: 32, fontWeight: 900, color: '#241917', margin: 0, textAlign: 'center', lineHeight: 1.3 }}>
          {current.meaning}
        </p>
        <span style={{ fontSize: 11, color: '#89756e', background: '#f5ede8', borderRadius: 99, padding: '3px 10px' }}>
          {current.type === 'word' ? '单词' : '句子'}
        </span>
      </div>

      {/* Input */}
      {!submitted ? (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <input
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="输入韩语..."
            style={{
              width: '100%', padding: '14px 16px', borderRadius: 14,
              border: '2px solid #eee0d8', fontSize: 18, color: '#241917',
              outline: 'none', fontFamily: 'inherit', boxSizing: 'border-box',
              background: 'white',
            }}
          />
          <p style={{ fontSize: 12, color: '#89756e', textAlign: 'center', margin: 0 }}>
            请切换系统键盘为韩语后输入
          </p>
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
