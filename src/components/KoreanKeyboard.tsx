'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { createPortal } from 'react-dom';
import { X, Delete } from 'lucide-react';
import { useIsMobile } from '@/lib/useIsMobile';

// ═══════════════════════════════════════════════════════════════
// Hangul Composition Engine
// Unicode: 0xAC00 + choseong*588 + jungseong*28 + jongseong
// ═══════════════════════════════════════════════════════════════

const CHO = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const CHO_SET = new Set(CHO);
const JUNG_SET = new Set(JUNG);

// Compound finals: prevFinal + newConsonant → compound
const FC: Record<string, Record<string, string>> = {
  'ㄱ': { 'ㅅ': 'ㄳ' },
  'ㄴ': { 'ㅈ': 'ㄵ', 'ㅎ': 'ㄶ' },
  'ㄹ': { 'ㄱ': 'ㄺ', 'ㅁ': 'ㄻ', 'ㅂ': 'ㄼ', 'ㅅ': 'ㄽ', 'ㅌ': 'ㄾ', 'ㅍ': 'ㄿ', 'ㅎ': 'ㅀ' },
  'ㅂ': { 'ㅅ': 'ㅄ' },
};

// Compound vowels: prevVowel + newVowel → compound
const VC: Record<string, Record<string, string>> = {
  'ㅗ': { 'ㅏ': 'ㅘ', 'ㅐ': 'ㅙ', 'ㅣ': 'ㅚ' },
  'ㅜ': { 'ㅓ': 'ㅝ', 'ㅔ': 'ㅞ', 'ㅣ': 'ㅟ' },
  'ㅡ': { 'ㅣ': 'ㅢ' },
};

function isC(j: string) { return CHO_SET.has(j); }
function isV(j: string) { return JUNG_SET.has(j); }

function buildSyl(cho: string, jung: string, jong: string): string {
  const ci = CHO.indexOf(cho);
  const vi = JUNG.indexOf(jung);
  const fi = JONG.indexOf(jong);
  if (ci < 0 || vi < 0 || fi < 0) return cho + jung + jong;
  return String.fromCharCode(0xAC00 + ci * 588 + vi * 28 + fi);
}

// Compose jamo buffer → display string (Hangul + pending jamo)
function composeBuffer(buf: string[]): string {
  const out: string[] = [];
  let i = 0;

  while (i < buf.length) {
    // ── Vowel-first: keep as raw jamo UNLESS a consonant follows ──
    if (isV(buf[i])) {
      let vowel = buf[i];
      i++;
      // Try compound vowel
      if (i < buf.length && isV(buf[i])) {
        const c = VC[vowel]?.[buf[i]];
        if (c) { vowel = c; i++; }
      }
      // Only compose into full syllable if a consonant follows
      if (i < buf.length && isC(buf[i])) {
        let maybeFinal = buf[i];
        let nextI = i + 1;
        if (nextI < buf.length && isC(buf[nextI])) {
          const fc = FC[maybeFinal]?.[buf[nextI]];
          if (fc) { maybeFinal = fc; nextI++; }
        }
        // Only commit as final if next char is NOT a vowel
        if (nextI >= buf.length || !isV(buf[nextI])) {
          out.push(buildSyl('ㅇ', vowel, maybeFinal));
          i = nextI;
        } else {
          out.push(vowel);
        }
      } else {
        // No consonant after vowel → keep as raw jamo
        out.push(vowel);
      }
      continue;
    }

    // ── Consonant-first (normal syllable) ──
    const cho = buf[i];
    i++;

    // Lone consonant at end → keep as raw jamo
    if (i >= buf.length || !isV(buf[i])) {
      out.push(cho);
      continue;
    }

    let jung = buf[i];
    i++;

    // Try compound vowel
    if (i < buf.length && isV(buf[i])) {
      const c = VC[jung]?.[buf[i]];
      if (c) { jung = c; i++; }
    }

    // Try final consonant(s) — only commit if no vowel follows
    let jong = '';
    if (i < buf.length && isC(buf[i])) {
      let maybeJong = buf[i];
      let nextI = i + 1;
      if (nextI < buf.length && isC(buf[nextI])) {
        const fc = FC[maybeJong]?.[buf[nextI]];
        if (fc) { maybeJong = fc; nextI++; }
      }
      // Only commit as final if next char is NOT a vowel
      if (nextI >= buf.length || !isV(buf[nextI])) {
        jong = maybeJong;
        i = nextI;
      }
    }

    out.push(buildSyl(cho, jung, jong));
  }

  return out.join('');
}

// Decompose a Hangul syllable → jamo array
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
    'ㅘ': ['ㅗ','ㅏ'], 'ㅙ': ['ㅗ','ㅐ'], 'ㅚ': ['ㅗ','ㅣ'],
    'ㅝ': ['ㅜ','ㅓ'], 'ㅞ': ['ㅜ','ㅔ'], 'ㅟ': ['ㅜ','ㅣ'],
    'ㅢ': ['ㅡ','ㅣ'],
  };
  parts.push(...(vp[j] || [j]));

  if (fi > 0) {
    const f = JONG[fi];
    const fp: Record<string, string[]> = {
      'ㄳ': ['ㄱ','ㅅ'], 'ㄵ': ['ㄴ','ㅈ'], 'ㄶ': ['ㄴ','ㅎ'],
      'ㄺ': ['ㄹ','ㄱ'], 'ㄻ': ['ㄹ','ㅁ'], 'ㄼ': ['ㄹ','ㅂ'],
      'ㄽ': ['ㄹ','ㅅ'], 'ㄾ': ['ㄹ','ㅌ'], 'ㄿ': ['ㄹ','ㅍ'],
      'ㅀ': ['ㄹ','ㅎ'], 'ㅄ': ['ㅂ','ㅅ'],
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
// QWERTY → Korean Jamo mapping (Dubeolsik)
// ═══════════════════════════════════════════════════════════════

const QWERTY_TO_JAMO: Record<string, { base: string; shift?: string }> = {
  q: { base: 'ㅂ', shift: 'ㅃ' },
  w: { base: 'ㅈ', shift: 'ㅉ' },
  e: { base: 'ㄷ', shift: 'ㄸ' },
  r: { base: 'ㄱ', shift: 'ㄲ' },
  t: { base: 'ㅅ', shift: 'ㅆ' },
  y: { base: 'ㅛ' },
  u: { base: 'ㅕ' },
  i: { base: 'ㅑ' },
  o: { base: 'ㅐ', shift: 'ㅒ' },
  p: { base: 'ㅔ', shift: 'ㅖ' },
  a: { base: 'ㅁ' },
  s: { base: 'ㄴ' },
  d: { base: 'ㅇ' },
  f: { base: 'ㄹ' },
  g: { base: 'ㅎ' },
  h: { base: 'ㅗ' },
  j: { base: 'ㅓ' },
  k: { base: 'ㅏ' },
  l: { base: 'ㅣ' },
  z: { base: 'ㅋ' },
  x: { base: 'ㅌ' },
  c: { base: 'ㅊ' },
  v: { base: 'ㅍ' },
  b: { base: 'ㅠ' },
  n: { base: 'ㅜ' },
  m: { base: 'ㅡ' },
};

// Reverse: jamo → qwerty key
const JAMO_TO_QWERTY: Record<string, string> = {};
for (const [qKey, m] of Object.entries(QWERTY_TO_JAMO)) {
  JAMO_TO_QWERTY[m.base] = qKey;
  if (m.shift) JAMO_TO_QWERTY[m.shift] = qKey;
}

// ═══════════════════════════════════════════════════════════════
// Keyboard Layout (standard 2-beolsik)
// ═══════════════════════════════════════════════════════════════

interface KeyDef {
  label: string;
  shiftLabel?: string;
  type?: 'shift' | 'backspace' | 'space' | 'done';
  flex?: number;
}

const ROWS: KeyDef[][] = [
  [
    { label: 'ㅂ', shiftLabel: 'ㅃ' },
    { label: 'ㅈ', shiftLabel: 'ㅉ' },
    { label: 'ㄷ', shiftLabel: 'ㄸ' },
    { label: 'ㄱ', shiftLabel: 'ㄲ' },
    { label: 'ㅅ', shiftLabel: 'ㅆ' },
    { label: 'ㅛ' },
    { label: 'ㅕ' },
    { label: 'ㅑ' },
    { label: 'ㅐ', shiftLabel: 'ㅒ' },
    { label: 'ㅔ', shiftLabel: 'ㅖ' },
  ],
  [
    { label: 'ㅁ' },
    { label: 'ㄴ' },
    { label: 'ㅇ' },
    { label: 'ㄹ' },
    { label: 'ㅎ' },
    { label: 'ㅗ' },
    { label: 'ㅓ' },
    { label: 'ㅏ' },
    { label: 'ㅣ' },
  ],
  [
    { label: '⇧', type: 'shift', flex: 1.4 },
    { label: 'ㅋ' },
    { label: 'ㅌ' },
    { label: 'ㅊ' },
    { label: 'ㅍ' },
    { label: 'ㅠ' },
    { label: 'ㅜ' },
    { label: 'ㅡ' },
    { label: '⌫', type: 'backspace', flex: 1.4 },
  ],
];

interface KoreanKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onClose: () => void;
  onSend?: (text: string) => void;
}

export function KoreanKeyboard({ value, onChange, visible, onClose, onSend }: KoreanKeyboardProps) {
  const isMobile = useIsMobile();
  const [shift, setShift] = useState(false);
  const [buffer, setBuffer] = useState<string[]>([]);
  const [mounted, setMounted] = useState(false);
  const [activeKeys, setActiveKeys] = useState<Set<string>>(new Set());
  const [animState, setAnimState] = useState<'entering' | 'visible' | 'exiting'>('entering');
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backspaceRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const exitTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const onChangeRef = useRef(onChange);
  onChangeRef.current = onChange;
  const bufferRef = useRef(buffer);
  bufferRef.current = buffer;

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!visible) return;
    setAnimState('entering');
    const raf = requestAnimationFrame(() => {
      requestAnimationFrame(() => setAnimState('visible'));
    });
    return () => cancelAnimationFrame(raf);
  }, [visible]);

  const animateOut = useCallback(() => {
    setAnimState('exiting');
    if (exitTimerRef.current) clearTimeout(exitTimerRef.current);
    exitTimerRef.current = setTimeout(() => {
      onClose();
    }, 200);
  }, [onClose]);

  useEffect(() => {
    return () => { if (exitTimerRef.current) clearTimeout(exitTimerRef.current); };
  }, []);

  // Sync buffer when value changes externally (paste, keyboard close/reopen)
  useEffect(() => {
    if (!visible) return;
    const fromBuffer = composeBuffer(bufferRef.current);
    if (fromBuffer === value) return;
    setBuffer(decomposeFull(value));
  }, [visible, value]);

  // Sync buffer changes → parent onChange
  useEffect(() => {
    if (!visible) return;
    onChangeRef.current(composeBuffer(buffer));
  }, [buffer, visible]);

  const addJamo = useCallback((jamo: string) => {
    setBuffer(prev => [...prev, jamo]);
  }, []);

  const doBackspace = useCallback(() => {
    setBuffer(prev => prev.length === 0 ? prev : prev.slice(0, -1));
  }, []);

  const handleKey = useCallback((key: KeyDef) => {
    if (key.type === 'shift') {
      setShift(s => !s);
      return;
    }

    setShift(false);

    if (key.type === 'backspace') {
      doBackspace();
      return;
    }

    if (key.type === 'space') {
      setBuffer(prev => [...prev, ' ']);
      return;
    }

    if (key.type === 'done') {
      animateOut();
      return;
    }

    const jamo = (shift && key.shiftLabel) ? key.shiftLabel : key.label;
    addJamo(jamo);
  }, [shift, animateOut, addJamo, doBackspace]);

  // ── Physical keyboard sync ───────────────────────────────
  useEffect(() => {
    if (!visible) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const qKey = e.key.toLowerCase();

      // Shift
      if (qKey === 'shift') {
        setShift(true);
        setActiveKeys(prev => new Set(prev).add('⇧'));
        return;
      }

      // Backspace
      if (qKey === 'backspace') {
        e.preventDefault();
        doBackspace();
        setActiveKeys(prev => new Set(prev).add('⌫'));
        return;
      }

      // Space
      if (qKey === ' ') {
        e.preventDefault();
        setBuffer(prev => [...prev, ' ']);
        return;
      }

      // QWERTY → Jamo mapping
      const mapping = QWERTY_TO_JAMO[qKey];
      if (mapping) {
        e.preventDefault();
        const jamo = (e.shiftKey && mapping.shift) ? mapping.shift : mapping.base;
        addJamo(jamo);
        setActiveKeys(prev => new Set(prev).add(jamo));
      }
    };

    const onKeyUp = (e: KeyboardEvent) => {
      const qKey = e.key.toLowerCase();

      if (qKey === 'shift') {
        setShift(false);
        setActiveKeys(prev => {
          const next = new Set(prev);
          next.delete('⇧');
          return next;
        });
        return;
      }

      if (qKey === 'backspace') {
        setActiveKeys(prev => {
          const next = new Set(prev);
          next.delete('⌫');
          return next;
        });
        return;
      }

      const mapping = QWERTY_TO_JAMO[qKey];
      if (mapping) {
        const jamo = (e.shiftKey && mapping.shift) ? mapping.shift : mapping.base;
        setActiveKeys(prev => {
          const next = new Set(prev);
          next.delete(jamo);
          return next;
        });
      }
    };

    document.addEventListener('keydown', onKeyDown);
    document.addEventListener('keyup', onKeyUp);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.removeEventListener('keyup', onKeyUp);
    };
  }, [visible, addJamo, doBackspace]);

  // Long-press backspace for continuous deletion
  const startRepeat = useCallback(() => {
    longPressRef.current = setTimeout(() => {
      backspaceRef.current = setInterval(() => {
        setBuffer(prev => {
          if (prev.length === 0) {
            if (backspaceRef.current) { clearInterval(backspaceRef.current); backspaceRef.current = null; }
            return prev;
          }
          return prev.slice(0, -1);
        });
      }, 100);
    }, 400);
  }, []);

  const stopRepeat = useCallback(() => {
    if (longPressRef.current) { clearTimeout(longPressRef.current); longPressRef.current = null; }
    if (backspaceRef.current) { clearInterval(backspaceRef.current); backspaceRef.current = null; }
  }, []);

  useEffect(() => {
    return () => { stopRepeat(); };
  }, [stopRepeat]);

  const composed = useMemo(() => composeBuffer(buffer), [buffer]);
  const showRawJamo = buffer.length > 0 && composed !== buffer.join('');

  const handleSend = useCallback(() => {
    const text = composeBuffer(buffer);
    if (!text.trim()) return;
    onSend?.(text);
    animateOut();
  }, [buffer, onSend, animateOut]);

  if (!visible || !mounted) return null;

  // ── Layout constants ──────────────────────────────────────────
  // Mobile: full-width sheet anchored to bottom (above BottomTabBar)
  // Desktop (md+): centred panel max 560px, sitting above the sidebar gap
  //   Sidebar is 112px wide; we shift right by half that so the keyboard
  //   visually centres over the main content rail.
  const keyH = isMobile ? 'h-[46px] min-h-[46px]' : 'h-[40px] min-h-[40px]';
  const keyTextSize = isMobile ? 'text-[15px]' : 'text-[13px]';
  const hintTextSize = isMobile ? 'text-[9px]' : 'text-[8px]';

  return createPortal(
    <>
      {/* Backdrop (desktop only) — clicking outside closes the keyboard */}
      {!isMobile && (
        <div
          className="fixed inset-0 z-[199]"
          onClick={animateOut}
        />
      )}

      <div
        className={[
          'fixed z-[200]',
          isMobile
            // Mobile: full width, above BottomTabBar (56px) + safe area
            ? 'left-0 right-0'
            // Desktop: centred panel, max 560px, shifts right to clear sidebar
            : 'left-1/2 -translate-x-1/2 w-full max-w-[560px]',
        ].join(' ')}
        style={{
          bottom: isMobile
            ? 'calc(56px + env(safe-area-inset-bottom, 0px))'
            : '24px',
          // Cap height so keyboard never overflows on small screens
          maxHeight: isMobile ? 'calc(100dvh - 56px - env(safe-area-inset-bottom, 0px) - 8px)' : undefined,
          overflowY: isMobile ? 'auto' : undefined,
          // Desktop: nudge right by half the sidebar width so keyboard sits
          // over the main content column rather than the sidebar
          marginLeft: isMobile ? undefined : 'calc(var(--desktop-sidebar) / 2)',
          transform: isMobile
            ? animState === 'visible' ? 'translateY(0)' : 'translateY(110%)'
            : animState === 'visible'
              ? 'translateX(-50%) translateY(0) scale(1)'
              : 'translateX(-50%) translateY(20px) scale(0.97)',
          opacity: isMobile ? 1 : animState === 'visible' ? 1 : 0,
          transition: 'transform 200ms ease-out, opacity 180ms ease-out',
        }}
      >
        <div className={isMobile ? 'px-0 w-full' : 'px-3 w-full'}>
          {/* Preview bar */}
          <div
            className="flex items-center gap-2 px-3 py-2 bg-[var(--bg-card)] border-t border-x border-[var(--border-color)]"
            style={{ borderRadius: isMobile ? '16px 16px 0 0' : '16px 16px 0 0' }}
          >
            <div className="flex-1 min-h-[26px] flex items-center gap-2">
              <span className={`${isMobile ? 'text-base' : 'text-sm'} font-bold text-gray-900 dark:text-gray-100`}>
                {composed || <span className="text-gray-400 dark:text-gray-500 font-normal text-xs">输入韩文...</span>}
              </span>
              {showRawJamo && (
                <span className="text-[11px] text-gray-400 dark:text-gray-500 font-mono">{buffer.join(' ')}</span>
              )}
            </div>
            <button
              onClick={animateOut}
              className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] rounded-lg transition-colors"
            >
              <X size={16} />
            </button>
          </div>

          {/* Key area */}
          <div
            className="bg-[var(--bg-soft)] border border-[var(--border-color)] px-2 pt-2"
            style={{ borderRadius: '0 0 16px 16px', paddingBottom: '10px' }}
          >
            {ROWS.map((row, ri) => (
              <div key={ri} className="flex justify-center gap-[5px] mb-[5px]">
                {row.map((key, ki) => {
                  const resolvedLabel = key.type
                    ? key.label
                    : (shift && key.shiftLabel) ? key.shiftLabel : key.label;
                  const flex = key.flex || 1;

                  const isActive = activeKeys.has(key.label) || (shift && key.shiftLabel && activeKeys.has(key.shiftLabel));

                  let bg = 'bg-white dark:bg-[var(--bg-card)]';
                  if (isActive) bg = 'bg-[var(--pink-primary)]/25 ring-2 ring-[var(--pink-primary)]/50 scale-95';
                  else if (key.type === 'shift') bg = shift
                    ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
                    : 'bg-[#ddd]/60';
                  else if (key.type === 'backspace') bg = 'bg-[#ddd]/60';

                  return (
                    <button
                      key={`${ri}-${ki}`}
                      type="button"
                      onClick={() => handleKey(key)}
                      onMouseDown={(e) => { e.preventDefault(); if (key.type === 'backspace') startRepeat(); }}
                      onMouseUp={key.type === 'backspace' ? stopRepeat : undefined}
                      onMouseLeave={key.type === 'backspace' ? stopRepeat : undefined}
                      onTouchStart={(e) => { e.preventDefault(); if (key.type === 'backspace') startRepeat(); }}
                      onTouchEnd={(e) => { e.preventDefault(); if (key.type === 'backspace') { stopRepeat(); } else { handleKey(key); } }}
                      className={`${bg} ${keyH} flex items-center justify-center rounded-[8px] font-medium
                        text-[var(--text-primary)] shadow-[0_1px_2px_rgba(0,0,0,.15)]
                        active:scale-[0.92] active:brightness-90
                        transition-all duration-75 select-none`}
                      style={{ flex }}
                    >
                      {key.type === 'backspace' ? (
                        <Delete size={isMobile ? 17 : 15} />
                      ) : key.type === 'shift' ? (
                        <span className={isMobile ? 'text-sm' : 'text-xs'}>{resolvedLabel}</span>
                      ) : (
                        <span className="flex flex-col items-center leading-tight">
                          <span className={keyTextSize}>{resolvedLabel}</span>
                          {!isMobile && (
                            <span className={`${hintTextSize} text-[var(--text-muted)]/50 font-normal mt-px`}>
                              {JAMO_TO_QWERTY[resolvedLabel]?.toUpperCase() || ''}
                            </span>
                          )}
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            ))}

            {/* Bottom row: space + send/done */}
            <div className="flex gap-[5px] mt-[2px]">
              <button
                type="button"
                onClick={() => handleKey({ label: '', type: 'space', flex: 1 })}
                onMouseDown={(e) => e.preventDefault()}
                onTouchStart={(e) => e.preventDefault()}
                onTouchEnd={(e) => { e.preventDefault(); handleKey({ label: '', type: 'space', flex: 1 }); }}
                className={`bg-white dark:bg-[var(--bg-card)] flex items-center justify-center ${keyH} rounded-[8px] text-xs font-medium text-[var(--text-muted)] shadow-[0_1px_2px_rgba(0,0,0,.15)] active:scale-[0.96] transition-all select-none`}
                style={{ flex: 5 }}
              >
                空格
              </button>
              {onSend ? (
                <button
                  type="button"
                  onClick={handleSend}
                  onMouseDown={(e) => e.preventDefault()}
                  onTouchStart={(e) => e.preventDefault()}
                  onTouchEnd={(e) => { e.preventDefault(); handleSend(); }}
                  className={`bg-[var(--pink-primary)] flex items-center justify-center ${keyH} rounded-[8px] text-sm font-bold text-white shadow-[0_1px_2px_rgba(0,0,0,.15)] active:scale-[0.96] transition-all select-none`}
                  style={{ flex: 2 }}
                >
                  发送
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => handleKey({ label: '', type: 'done', flex: 1 })}
                  onMouseDown={(e) => e.preventDefault()}
                  onTouchStart={(e) => e.preventDefault()}
                  onTouchEnd={(e) => { e.preventDefault(); handleKey({ label: '', type: 'done', flex: 1 }); }}
                  className={`bg-[var(--pink-primary)] flex items-center justify-center ${keyH} rounded-[8px] text-sm font-bold text-white shadow-[0_1px_2px_rgba(0,0,0,.15)] active:scale-[0.96] transition-all select-none`}
                  style={{ flex: 2 }}
                >
                  完成
                </button>
              )}
            </div>

            {isMobile && <div className="pb-safe" />}
          </div>
        </div>
      </div>
    </>
  , document.body);
}

// ═══════════════════════════════════════════════════════════════
// KoreanInput: convenience wrapper (input + keyboard toggle)
// ═══════════════════════════════════════════════════════════════

interface KoreanInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  id?: string;
  autoFocus?: boolean;
}

export function KoreanInput({ value, onChange, placeholder, className = '', id, autoFocus }: KoreanInputProps) {
  const [showKeyboard, setShowKeyboard] = useState(false);

  return (
    <>
      <div className="relative">
        <input
          id={id}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          autoFocus={autoFocus}
          inputMode="text"
          className={`input-standard w-full pr-10 ${className}`}
        />
        <button
          type="button"
          onClick={() => setShowKeyboard(!showKeyboard)}
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors text-xs font-medium ${
            showKeyboard
              ? 'bg-[var(--pink-primary)]/20 text-[var(--pink-primary)]'
              : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--pink-pale)]/30'
          }`}
          title="韩文键盘"
        >
          한
        </button>
      </div>
      <KoreanKeyboard
        value={value}
        onChange={onChange}
        visible={showKeyboard}
        onClose={() => setShowKeyboard(false)}
      />
    </>
  );
}
