'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { ArrowLeft, RotateCcw, ChevronRight, Play, Trophy, Zap, Clock, Crosshair, Keyboard } from 'lucide-react';
import Link from 'next/link';
import { typingLevels, type TypingText } from '@/data/typingLevels';

// ═══════════════════════════════════════════════════════════════
// Hangul decomposition engine (same as KoreanKeyboard)
// ═══════════════════════════════════════════════════════════════
const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

function decomposeSyl(syl: string): string[] {
  const code = syl.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7AF) return [syl];
  const offset = code - 0xAC00;
  const fi = offset % 28;
  const vi = ((offset - fi) / 28) % 21;
  const ci = ((offset - fi) / 28 - vi) / 21;
  const parts: string[] = [CHO[ci]];
  const j = JUNG[vi];
  const vp: Record<string, string[]> = {
    'ㅘ':['ㅗ','ㅏ'], 'ㅙ':['ㅗ','ㅐ'], 'ㅚ':['ㅗ','ㅣ'],
    'ㅝ':['ㅜ','ㅓ'], 'ㅞ':['ㅜ','ㅔ'], 'ㅟ':['ㅜ','ㅣ'], 'ㅢ':['ㅡ','ㅣ'],
  };
  parts.push(...(vp[j] || [j]));
  if (fi > 0) {
    const f = JONG[fi];
    const fp: Record<string, string[]> = {
      'ㄳ':['ㄱ','ㅅ'], 'ㄵ':['ㄴ','ㅈ'], 'ㄶ':['ㄴ','ㅎ'],
      'ㄺ':['ㄹ','ㄱ'], 'ㄻ':['ㄹ','ㅁ'], 'ㄼ':['ㄹ','ㅂ'],
      'ㄽ':['ㄹ','ㅅ'], 'ㄾ':['ㄹ','ㅌ'], 'ㄿ':['ㄹ','ㅍ'], 'ㅀ':['ㄹ','ㅎ'], 'ㅄ':['ㅂ','ㅅ'],
    };
    parts.push(...(fp[f] || [f]));
  }
  return parts;
}

function decomposeFull(text: string): string[] {
  const out: string[] = [];
  for (const ch of text) out.push(...decomposeSyl(ch));
  return out;
}

// ═══════════════════════════════════════════════════════════════
// QWERTY → Jamo mapping
// ═══════════════════════════════════════════════════════════════
const QWERTY_TO_JAMO: Record<string, { base: string; shift?: string }> = {
  q: { base: 'ㅂ', shift: 'ㅃ' }, w: { base: 'ㅈ', shift: 'ㅉ' },
  e: { base: 'ㄷ', shift: 'ㄸ' }, r: { base: 'ㄱ', shift: 'ㄲ' },
  t: { base: 'ㅅ', shift: 'ㅆ' }, y: { base: 'ㅛ' },
  u: { base: 'ㅕ' }, i: { base: 'ㅑ' },
  o: { base: 'ㅐ', shift: 'ㅒ' }, p: { base: 'ㅔ', shift: 'ㅖ' },
  a: { base: 'ㅁ' }, s: { base: 'ㄴ' }, d: { base: 'ㅇ' },
  f: { base: 'ㄹ' }, g: { base: 'ㅎ' }, h: { base: 'ㅗ' },
  j: { base: 'ㅓ' }, k: { base: 'ㅏ' }, l: { base: 'ㅣ' },
  z: { base: 'ㅋ' }, x: { base: 'ㅌ' }, c: { base: 'ㅊ' },
  v: { base: 'ㅍ' }, b: { base: 'ㅠ' }, n: { base: 'ㅜ' },
  m: { base: 'ㅡ' },
};

const JAMO_TO_QWERTY: Record<string, string> = {};
for (const [qKey, m] of Object.entries(QWERTY_TO_JAMO)) {
  JAMO_TO_QWERTY[m.base] = qKey;
  if (m.shift) JAMO_TO_QWERTY[m.shift] = qKey;
}

// Virtual keyboard layout
const KEYBOARD_ROWS = [
  ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ'],
  ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
  ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ'],
];

// ═══════════════════════════════════════════════════════════════
// Typing Page
// ═══════════════════════════════════════════════════════════════
type Phase = 'idle' | 'typing' | 'done';

export default function TypingPage() {
  const [levelId, setLevelId] = useState(1);
  const [textIdx, setTextIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [cursorPos, setCursorPos] = useState(0); // position in jamo array
  const [errors, setErrors] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [startTime, setStartTime] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [recentError, setRecentError] = useState(false);
  const [timeLimit] = useState(300); // 5 min for level 5

  const level = typingLevels[levelId - 1];
  const text: TypingText | undefined = level?.texts[textIdx];
  const targetJamo = useMemo(() => text ? decomposeFull(text.text) : [], [text]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Timer
  useEffect(() => {
    if (phase === 'typing') {
      timerRef.current = setInterval(() => {
        setElapsed((Date.now() - startTime) / 1000);
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase, startTime]);

  // Level 5 time limit
  useEffect(() => {
    if (levelId === 5 && phase === 'typing' && elapsed >= timeLimit) {
      setPhase('done');
    }
  }, [levelId, phase, elapsed, timeLimit]);

  // Keyboard listener
  useEffect(() => {
    if (phase !== 'typing') return;

    const onKeyDown = (e: KeyboardEvent) => {
      const qKey = e.key.toLowerCase();
      const mapping = QWERTY_TO_JAMO[qKey];
      if (!mapping) return;

      e.preventDefault();
      const typed = (e.shiftKey && mapping.shift) ? mapping.shift : mapping.base;
      const expected = targetJamo[cursorPos];

      setTotalKeystrokes((prev) => prev + 1);

      if (typed === expected) {
        setCursorPos((prev) => {
          const next = prev + 1;
          if (next >= targetJamo.length) {
            setPhase('done');
          }
          return next;
        });
        setRecentError(false);
      } else {
        setErrors((prev) => prev + 1);
        setRecentError(true);
        if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
        errorTimerRef.current = setTimeout(() => setRecentError(false), 300);
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [phase, cursorPos, targetJamo]);

  // Cleanup
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      if (errorTimerRef.current) clearTimeout(errorTimerRef.current);
    };
  }, []);

  const start = useCallback(() => {
    setCursorPos(0);
    setErrors(0);
    setTotalKeystrokes(0);
    setStartTime(Date.now());
    setElapsed(0);
    setPhase('typing');
  }, []);

  const reset = useCallback(() => {
    setPhase('idle');
    setCursorPos(0);
    setErrors(0);
    setTotalKeystrokes(0);
    setElapsed(0);
  }, []);

  const nextText = useCallback(() => {
    if (level && textIdx + 1 < level.texts.length) {
      setTextIdx((prev) => prev + 1);
      reset();
    }
  }, [level, textIdx, reset]);

  const prevText = useCallback(() => {
    if (textIdx > 0) {
      setTextIdx((prev) => prev - 1);
      reset();
    }
  }, [textIdx, reset]);

  // Stats
  const accuracy = totalKeystrokes > 0 ? Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100) : 100;
  const cpm = elapsed > 0 ? Math.round((cursorPos / elapsed) * 60) : 0;
  const wpm = Math.round(cpm / 5);

  // Next key highlight
  const nextJamo = targetJamo[cursorPos] || '';
  const nextQwerty = JAMO_TO_QWERTY[nextJamo]?.toUpperCase() || '';

  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Keyboard size={20} className="text-[var(--pink-primary)]" />
            打字练习
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">韩文盲打训练 · TOPIK 机考准备</p>
        </div>
      </div>

      {/* Level tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {typingLevels.map((lv) => (
          <button
            key={lv.id}
            onClick={() => { setLevelId(lv.id); setTextIdx(0); reset(); }}
            className={`text-xs px-3.5 py-2 rounded-xl whitespace-nowrap transition-all shrink-0 ${
              levelId === lv.id
                ? 'bg-[var(--pink-primary)] text-white shadow-lg shadow-[var(--pink-primary)]/25'
                : 'bg-[var(--bg-input)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            Lv{lv.id} {lv.name}
          </button>
        ))}
      </div>

      {/* Text selector */}
      {level && (
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs text-[var(--text-muted)]">{level.description}</span>
          <div className="flex-1" />
          <button onClick={prevText} disabled={textIdx === 0} className="text-xs px-2 py-1 rounded-lg bg-[var(--bg-input)] text-[var(--text-muted)] disabled:opacity-30 hover:text-[var(--text-primary)] transition-colors">
            上一题
          </button>
          <span className="text-xs text-[var(--text-muted)]">{textIdx + 1}/{level.texts.length}</span>
          <button onClick={nextText} disabled={textIdx >= level.texts.length - 1} className="text-xs px-2 py-1 rounded-lg bg-[var(--bg-input)] text-[var(--text-muted)] disabled:opacity-30 hover:text-[var(--text-primary)] transition-colors">
            下一题
          </button>
        </div>
      )}

      {/* Main typing area */}
      {text && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 space-y-4">
          {/* Target text display */}
          <div className="text-center">
            <p className="text-xs text-[var(--text-muted)] mb-2">{text.label}</p>
            <div className="text-2xl font-bold text-[var(--text-primary)] leading-relaxed tracking-wide font-[var(--font-korean)]">
              {targetJamo.length > 0 && (() => {
                // Group jamo back into syllables for display
                const displayChars: { char: string; status: 'done' | 'current' | 'pending' | 'error' }[] = [];
                let jamoIdx = 0;
                for (const ch of text.text) {
                  const parts = decomposeSyl(ch);
                  for (let pi = 0; pi < parts.length; pi++) {
                    let status: 'done' | 'current' | 'pending' | 'error' = 'pending';
                    if (jamoIdx < cursorPos) status = 'done';
                    else if (jamoIdx === cursorPos) status = recentError ? 'error' : 'current';
                    displayChars.push({ char: parts[pi], status });
                    jamoIdx++;
                  }
                }
                return displayChars.map((dc, i) => (
                  <span
                    key={i}
                    className={`transition-colors duration-100 ${
                      dc.status === 'done' ? 'text-[var(--mint-soft)]' :
                      dc.status === 'current' ? 'text-[var(--pink-primary)] border-b-2 border-[var(--pink-primary)]' :
                      dc.status === 'error' ? 'text-red-400 border-b-2 border-red-400' :
                      'text-[var(--text-muted)]/50'
                    }`}
                  >
                    {dc.char}
                  </span>
                ));
              })()}
            </div>
          </div>

          {/* Virtual keyboard preview */}
          <div className="bg-[var(--bg-soft)] rounded-xl p-2.5 border border-[var(--border-color)]/60">
            {KEYBOARD_ROWS.map((row, ri) => (
              <div key={ri} className="flex justify-center gap-0.5 mb-0.5 last:mb-0">
                {ri === 2 && <div className="w-6" />} {/* shift key space */}
                {row.map((jamo) => {
                  const isNext = jamo === nextJamo;
                  const qKey = JAMO_TO_QWERTY[jamo];
                  return (
                    <div
                      key={jamo}
                      className={`flex flex-col items-center justify-center w-8 h-8 rounded-md text-xs transition-all ${
                        isNext
                          ? 'bg-[var(--pink-primary)]/25 ring-1 ring-[var(--pink-primary)]/50 scale-110 text-[var(--pink-primary)]'
                          : 'bg-[var(--bg-card)] text-[var(--text-muted)]/70'
                      }`}
                    >
                      <span className="leading-tight font-medium">{jamo}</span>
                      <span className="text-[8px] leading-tight opacity-50">{qKey?.toUpperCase() || ''}</span>
                    </div>
                  );
                })}
                {ri === 2 && <div className="w-6" />}
              </div>
            ))}
            {/* Next key hint */}
            {nextJamo && (
              <div className="text-center mt-2">
                <span className="text-[11px] text-[var(--text-muted)]">
                  下一个: <span className="text-[var(--pink-primary)] font-bold">{nextJamo}</span>
                  {nextQwerty && <span className="text-[var(--text-muted)]"> (按 <kbd className="px-1 py-0.5 rounded bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] text-[10px]">{nextQwerty}</kbd>)</span>}
                </span>
              </div>
            )}
          </div>

          {/* Phase: idle → start button */}
          {phase === 'idle' && (
            <button
              onClick={start}
              className="w-full py-3.5 rounded-xl bg-[var(--pink-primary)] text-white font-bold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-[var(--pink-primary)]/25"
            >
              <Play size={17} />
              开始练习
            </button>
          )}

          {/* Phase: typing → stats bar */}
          {phase === 'typing' && (
            <div className="flex items-center gap-4 text-xs">
              <span className="flex items-center gap-1 text-[var(--text-muted)]">
                <Clock size={13} />
                {levelId === 5
                  ? `${Math.max(0, timeLimit - Math.floor(elapsed))}s`
                  : `${Math.floor(elapsed)}s`}
              </span>
              <span className="flex items-center gap-1 text-[var(--text-muted)]">
                <Zap size={13} />
                {cpm} 字/分
              </span>
              <span className="flex items-center gap-1 text-[var(--text-muted)]">
                <Crosshair size={13} />
                {accuracy}%
              </span>
              <div className="flex-1" />
              <span className="text-[var(--text-muted)]">
                {cursorPos}/{targetJamo.length}
              </span>
              <button onClick={reset} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                <RotateCcw size={14} />
              </button>
            </div>
          )}

          {/* Phase: done → results */}
          {phase === 'done' && (
            <div className="space-y-4">
              <div className="text-center">
                <Trophy size={40} className="mx-auto text-[var(--peach-soft)] mb-2" />
                <p className="text-lg font-bold text-[var(--text-primary)]">
                  {accuracy >= 95 ? '完美！🎉' : accuracy >= 80 ? '不错！👍' : '继续加油！💪'}
                </p>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[var(--bg-input)] rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[var(--pink-primary)]">{wpm}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">WPM (字/分)</div>
                </div>
                <div className="bg-[var(--bg-input)] rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[var(--mint-soft)]">{accuracy}%</div>
                  <div className="text-[10px] text-[var(--text-muted)]">准确率</div>
                </div>
                <div className="bg-[var(--bg-input)] rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[var(--peach-soft)]">{errors}</div>
                  <div className="text-[10px] text-[var(--text-muted)]">错误数</div>
                </div>
              </div>

              <div className="flex gap-2">
                <button onClick={start} className="flex-1 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white font-medium text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-1.5">
                  <RotateCcw size={15} /> 重新练习
                </button>
                {level && textIdx + 1 < level.texts.length && (
                  <button onClick={nextText} className="flex-1 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-primary)] font-medium text-sm hover:bg-[var(--bg-accent)] transition-colors flex items-center justify-center gap-1.5">
                    下一题 <ChevronRight size={15} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
