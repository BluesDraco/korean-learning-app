'use client';

import { useState, useRef, useCallback, useEffect, useMemo } from 'react';
import { ArrowLeft, RotateCcw, ChevronRight, Play, Trophy, Zap, Clock, Crosshair, Keyboard } from 'lucide-react';
import Link from 'next/link';
import { typingLevels, type TypingText } from '@/data/typingLevels';

// Hangul decomposition
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

// Split text into sentences (by Korean/English sentence-ending punctuation)
function splitSentences(text: string): string[] {
  const parts = text.split(/(?<=[.!?])\s*/);
  return parts.filter(Boolean);
}

// QWERTY → Jamo
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

const KEYBOARD_ROWS = [
  ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ'],
  ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
  ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ'],
];

type Phase = 'idle' | 'typing' | 'sentenceDone' | 'done';

export default function TypingPage() {
  const [levelId, setLevelId] = useState(1);
  const [textIdx, setTextIdx] = useState(0);
  const [sentenceIdx, setSentenceIdx] = useState(0);
  const [phase, setPhase] = useState<Phase>('idle');
  const [cursorPos, setCursorPos] = useState(0);
  const [errors, setErrors] = useState(0);
  const [totalKeystrokes, setTotalKeystrokes] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [recentError, setRecentError] = useState(false);
  const [timeLimit] = useState(300);

  const level = typingLevels[levelId - 1];
  const text: TypingText | undefined = level?.texts[textIdx];

  // Split into sentences
  const sentences = useMemo(() => (text ? splitSentences(text.text) : []), [text]);
  const currentSentence = sentences[sentenceIdx] || '';
  const targetJamo = useMemo(() => decomposeFull(currentSentence), [currentSentence]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const errorTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoAdvTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const cursorPosRef = useRef(cursorPos);
  const targetJamoRef = useRef(targetJamo);
  const phaseRef = useRef(phase);
  cursorPosRef.current = cursorPos;
  targetJamoRef.current = targetJamo;
  phaseRef.current = phase;

  const startTimeRef = useRef(0);

  // Timer
  useEffect(() => {
    if (phase === 'typing') {
      timerRef.current = setInterval(() => {
        setElapsed((Date.now() - startTimeRef.current) / 1000);
      }, 200);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phase]);

  // Level 5 time limit
  useEffect(() => {
    if (levelId === 5 && (phase === 'typing' || phase === 'sentenceDone') && elapsed >= timeLimit) {
      setPhase('done');
    }
  }, [levelId, phase, elapsed, timeLimit]);

  // Auto-advance to next sentence
  useEffect(() => {
    if (phase === 'sentenceDone') {
      autoAdvTimerRef.current = setTimeout(() => {
        if (sentenceIdx + 1 < sentences.length) {
          setSentenceIdx((prev) => prev + 1);
          setCursorPos(0);
          setPhase('typing');
        } else {
          setPhase('done');
        }
      }, 1000);
    }
    return () => { if (autoAdvTimerRef.current) clearTimeout(autoAdvTimerRef.current); };
  }, [phase, sentenceIdx, sentences.length]);

  // Keyboard listener
  useEffect(() => {
    if (phase !== 'typing') return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const qKey = e.key.toLowerCase();
      const mapping = QWERTY_TO_JAMO[qKey];
      if (!mapping) return;

      e.preventDefault();
      const typed = (e.shiftKey && mapping.shift) ? mapping.shift : mapping.base;
      const jamo = targetJamoRef.current;
      const pos = cursorPosRef.current;
      const expected = jamo[pos];

      setTotalKeystrokes((prev) => prev + 1);

      if (typed === expected) {
        setCursorPos((prev) => {
          const next = prev + 1;
          if (next >= jamo.length) {
            setPhase('sentenceDone');
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
  }, [phase]);

  const start = useCallback(() => {
    setCursorPos(0);
    setErrors(0);
    setTotalKeystrokes(0);
    setSentenceIdx(0);
    startTimeRef.current = Date.now();
    setElapsed(0);
    setPhase('typing');
  }, []);

  const reset = useCallback(() => {
    setPhase('idle');
    setCursorPos(0);
    setErrors(0);
    setTotalKeystrokes(0);
    setSentenceIdx(0);
    setElapsed(0);
  }, []);

  const nextText = useCallback(() => {
    if (level && textIdx + 1 < level.texts.length) {
      setTextIdx((prev) => prev + 1);
      setSentenceIdx(0);
      reset();
    }
  }, [level, textIdx, reset]);

  const prevText = useCallback(() => {
    if (textIdx > 0) {
      setTextIdx((prev) => prev - 1);
      setSentenceIdx(0);
      reset();
    }
  }, [textIdx, reset]);

  // Stats (per sentence)
  const accuracy = totalKeystrokes > 0 ? Math.round(((totalKeystrokes - errors) / totalKeystrokes) * 100) : 100;
  const cpm = elapsed > 0 ? Math.round((cursorPos / elapsed) * 60) : 0;

  // Jamo display
  const displayChars = useMemo(() => {
    if (!currentSentence || targetJamo.length === 0) return [];
    const chars: { char: string; status: 'done' | 'current' | 'pending' | 'error' }[] = [];
    let jamoIdx = 0;
    for (const ch of currentSentence) {
      const parts = decomposeSyl(ch);
      for (let pi = 0; pi < parts.length; pi++) {
        let status: 'done' | 'current' | 'pending' | 'error' = 'pending';
        if (jamoIdx < cursorPos) status = 'done';
        else if (jamoIdx === cursorPos) status = recentError ? 'error' : 'current';
        chars.push({ char: parts[pi], status });
        jamoIdx++;
      }
    }
    return chars;
  }, [currentSentence, cursorPos, recentError, targetJamo.length]);

  const nextJamo = targetJamo[cursorPos] || '';
  const nextQwerty = JAMO_TO_QWERTY[nextJamo]?.toUpperCase() || '';

  return (
    <div className="py-4 space-y-4 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Keyboard size={20} className="text-[var(--pink-primary)]" />
            打字练习
          </h1>
          <p className="text-xs text-[var(--text-muted)] mt-0.5">韩文盲打训练 · 逐句练习，键盘始终可见</p>
        </div>
      </div>

      {/* Level tabs */}
      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {typingLevels.map((lv) => (
          <button
            key={lv.id}
            onClick={() => { setLevelId(lv.id); setTextIdx(0); reset(); }}
            className={`text-sm px-4 py-2.5 rounded-xl whitespace-nowrap transition-all shrink-0 ${
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
          <span className="text-sm text-[var(--text-muted)]">{level.description}</span>
          <div className="flex-1" />
          <button onClick={prevText} disabled={textIdx === 0} className="text-sm px-3 py-1.5 rounded-lg bg-[var(--bg-input)] text-[var(--text-muted)] disabled:opacity-30 hover:text-[var(--text-primary)] transition-colors">
            上一题
          </button>
          <span className="text-sm text-[var(--text-muted)]">{textIdx + 1}/{level.texts.length}</span>
          <button onClick={nextText} disabled={textIdx >= level.texts.length - 1} className="text-sm px-3 py-1.5 rounded-lg bg-[var(--bg-input)] text-[var(--text-muted)] disabled:opacity-30 hover:text-[var(--text-primary)] transition-colors">
            下一题
          </button>
        </div>
      )}

      {/* Main typing area */}
      {text && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 md:p-6 space-y-5">
          {/* Sentence progress */}
          {sentences.length > 1 && (
            <div className="flex items-center gap-1.5">
              {sentences.map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full flex-1 transition-all ${
                    i < sentenceIdx ? 'bg-[var(--mint-soft)]' :
                    i === sentenceIdx ? 'bg-[var(--pink-primary)]' :
                    'bg-[var(--border-color)]'
                  }`}
                />
              ))}
              <span className="text-xs text-[var(--text-muted)] ml-2 shrink-0">{sentenceIdx + 1}/{sentences.length}</span>
            </div>
          )}

          {/* Target text: label + sentence reference */}
          <div>
            <p className="text-xs text-[var(--text-muted)] mb-1">{text.label}</p>
            {/* Full text with current sentence highlighted */}
            {sentences.length > 1 ? (
              <div className="text-base text-[var(--text-primary)] leading-relaxed font-[var(--font-korean)]">
                {sentences.map((s, i) => (
                  <span key={i} className={i === sentenceIdx ? 'text-[var(--pink-primary)] font-bold' : 'text-[var(--text-muted)]/60'}>
                    {s}{i < sentences.length - 1 ? ' ' : ''}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-base text-[var(--text-primary)] font-medium font-[var(--font-korean)]">{currentSentence}</p>
            )}
            {text.chinese && (
              <p className="text-sm text-[var(--text-muted)] mt-1">{text.chinese}</p>
            )}
          </div>

          {/* Jamo decomposition display */}
          <div className="bg-[var(--bg-input)] rounded-xl p-4 md:p-6 min-h-[80px] flex items-center justify-center">
            {currentSentence ? (
              <div className="text-3xl md:text-4xl font-bold text-center leading-relaxed tracking-wide font-[var(--font-korean)] flex flex-wrap justify-center gap-x-[2px]">
                {displayChars.map((dc, i) => (
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
                ))}
              </div>
            ) : (
              <p className="text-[var(--text-muted)] text-sm">加载中...</p>
            )}
          </div>

          {/* Phase: idle */}
          {phase === 'idle' && (
            <button
              onClick={start}
              className="w-full py-4 rounded-xl bg-[var(--pink-primary)] text-white font-bold text-base hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-lg shadow-[var(--pink-primary)]/25"
            >
              <Play size={20} /> 开始练习
            </button>
          )}

          {/* Phase: typing / sentenceDone — stats bar */}
          {(phase === 'typing' || phase === 'sentenceDone') && (
            <div className="flex items-center gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                <Clock size={15} />
                {levelId === 5 ? `${Math.max(0, timeLimit - Math.floor(elapsed))}s` : `${Math.floor(elapsed)}s`}
              </span>
              <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                <Zap size={15} /> {cpm} 字/分
              </span>
              <span className="flex items-center gap-1.5 text-[var(--text-muted)]">
                <Crosshair size={15} /> {accuracy}%
              </span>
              <div className="flex-1" />
              <span className="text-[var(--text-muted)]">{cursorPos}/{targetJamo.length}</span>
              <button onClick={reset} className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
                <RotateCcw size={16} />
              </button>
            </div>
          )}

          {/* Phase: done */}
          {phase === 'done' && (
            <div className="space-y-4">
              <div className="text-center">
                <Trophy size={44} className="mx-auto text-[var(--peach-soft)] mb-2" />
                <p className="text-lg font-bold text-[var(--text-primary)]">
                  {accuracy >= 95 ? '完美！' : accuracy >= 80 ? '不错！' : '继续加油！'}
                </p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-[var(--bg-input)] rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[var(--pink-primary)]">{cpm}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">字/分</div>
                </div>
                <div className="bg-[var(--bg-input)] rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[var(--mint-soft)]">{accuracy}%</div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">准确率</div>
                </div>
                <div className="bg-[var(--bg-input)] rounded-xl p-3 text-center">
                  <div className="text-xl font-bold text-[var(--peach-soft)]">{errors}</div>
                  <div className="text-xs text-[var(--text-muted)] mt-0.5">错误数</div>
                </div>
              </div>
              <div className="flex gap-3">
                <button onClick={start} className="flex-1 py-3 rounded-xl bg-[var(--pink-primary)] text-white font-medium hover:opacity-90 flex items-center justify-center gap-2">
                  <RotateCcw size={17} /> 重新练习
                </button>
                {level && textIdx + 1 < level.texts.length && (
                  <button onClick={nextText} className="flex-1 py-3 rounded-xl bg-[var(--bg-input)] text-[var(--text-primary)] font-medium hover:bg-[var(--bg-accent)] flex items-center justify-center gap-2">
                    下一题 <ChevronRight size={17} />
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Virtual keyboard — always visible, auto-stick to bottom */}
      <div className="sticky bottom-2 bg-[var(--bg-card)] rounded-2xl p-4 border border-[var(--border-color)] shadow-lg z-10">
        {KEYBOARD_ROWS.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-1 mb-1 last:mb-0">
            {ri === 2 && <div className="w-8" />}
            {row.map((jamo) => {
              const isNext = jamo === nextJamo;
              const qKey = JAMO_TO_QWERTY[jamo];
              return (
                <div
                  key={jamo}
                  className={`flex flex-col items-center justify-center w-11 h-11 rounded-lg text-sm transition-all ${
                    isNext
                      ? 'bg-[var(--pink-primary)]/25 ring-2 ring-[var(--pink-primary)]/50 scale-110 text-[var(--pink-primary)]'
                      : 'bg-[var(--bg-input)] text-[var(--text-muted)]/70'
                  }`}
                >
                  <span className="leading-tight font-bold">{jamo}</span>
                  <span className="text-[10px] leading-tight opacity-50">{qKey?.toUpperCase() || ''}</span>
                </div>
              );
            })}
            {ri === 2 && <div className="w-8" />}
          </div>
        ))}
        {nextJamo && phase === 'typing' && (
          <div className="text-center mt-2">
            <span className="text-sm text-[var(--text-muted)]">
              下一个: <span className="text-[var(--pink-primary)] font-bold">{nextJamo}</span>
              {nextQwerty && <span className="text-[var(--text-muted)]"> (按 <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] text-xs">{nextQwerty}</kbd>)</span>}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
