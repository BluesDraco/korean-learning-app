'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { X, Delete } from 'lucide-react';

// ═══════════════════════════════════════════════════════════════
// Hangul Composition Engine (Unicode 0xAC00 + ci*588 + vi*28 + fi)
// ═══════════════════════════════════════════════════════════════

const CHOSEONG = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const JUNGSEONG = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const JONGSEONG = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

const CONSONANT_SET = new Set(CHOSEONG);
const VOWEL_SET = new Set(JUNGSEONG);

// Compound finals that can be formed by adding a consonant to an existing final
const FINAL_COMPOUNDS: Record<string, Record<string, string>> = {
  'ㄱ': { 'ㅅ': 'ㄳ' },
  'ㄴ': { 'ㅈ': 'ㄵ', 'ㅎ': 'ㄶ' },
  'ㄹ': { 'ㄱ': 'ㄺ', 'ㅁ': 'ㄻ', 'ㅂ': 'ㄼ', 'ㅅ': 'ㄽ', 'ㅌ': 'ㄾ', 'ㅍ': 'ㄿ', 'ㅎ': 'ㅀ' },
  'ㅂ': { 'ㅅ': 'ㅄ' },
};

// Compound vowels that can be formed by adding a vowel to an existing vowel
const VOWEL_COMPOUNDS: Record<string, Record<string, string>> = {
  'ㅗ': { 'ㅏ': 'ㅘ', 'ㅐ': 'ㅙ', 'ㅣ': 'ㅚ' },
  'ㅜ': { 'ㅓ': 'ㅝ', 'ㅔ': 'ㅞ', 'ㅣ': 'ㅟ' },
  'ㅡ': { 'ㅣ': 'ㅢ' },
};

function isConsonant(j: string) { return CONSONANT_SET.has(j); }
function isVowel(j: string) { return VOWEL_SET.has(j); }

function buildSyllable(initial: string, vowel: string, final: string): string {
  const ci = CHOSEONG.indexOf(initial);
  const vi = JUNGSEONG.indexOf(vowel);
  const fi = JONGSEONG.indexOf(final);
  if (ci < 0 || vi < 0 || fi < 0) return initial + vowel + final;
  return String.fromCharCode(0xAC00 + ci * 21 * 28 + vi * 28 + fi);
}

function composeBuffer(buffer: string[]): string {
  const result: string[] = [];
  let i = 0;

  while (i < buffer.length) {
    // Need at least an initial consonant to start a syllable
    if (!isConsonant(buffer[i])) {
      // Lone vowel: use ㅇ as initial
      let vowel = buffer[i];
      i++;
      if (i < buffer.length && isVowel(buffer[i])) {
        const c = VOWEL_COMPOUNDS[vowel]?.[buffer[i]];
        if (c) { vowel = c; i++; }
      }
      let final = '';
      if (i < buffer.length && isConsonant(buffer[i])) {
        final = buffer[i]; i++;
        if (i < buffer.length && isConsonant(buffer[i])) {
          const fc = FINAL_COMPOUNDS[final]?.[buffer[i]];
          if (fc) { final = fc; i++; }
        }
      }
      result.push(buildSyllable('ㅇ', vowel, final));
      continue;
    }

    const initial = buffer[i];
    i++;

    // Need a vowel next
    if (i >= buffer.length || !isVowel(buffer[i])) {
      result.push(initial); // lone consonant, keep as jamo
      continue;
    }

    let vowel = buffer[i];
    i++;

    // Check for compound vowel
    if (i < buffer.length && isVowel(buffer[i])) {
      const c = VOWEL_COMPOUNDS[vowel]?.[buffer[i]];
      if (c) { vowel = c; i++; }
    }

    // Check for final consonant(s)
    let final = '';
    if (i < buffer.length && isConsonant(buffer[i])) {
      final = buffer[i];
      i++;
      if (i < buffer.length && isConsonant(buffer[i])) {
        const fc = FINAL_COMPOUNDS[final]?.[buffer[i]];
        if (fc) { final = fc; i++; }
      }
    }

    result.push(buildSyllable(initial, vowel, final));
  }

  return result.join('');
}

function decomposeSyllable(syl: string): string[] {
  const code = syl.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7AF) return [syl];

  const offset = code - 0xAC00;
  const fi = offset % 28;
  const vi = ((offset - fi) / 28) % 21;
  const ci = ((offset - fi) / 28 - vi) / 21;

  const parts: string[] = [];
  parts.push(CHOSEONG[ci]);

  // Expand compound vowels back to individual jamo
  const vowel = JUNGSEONG[vi];
  const vowelParts: Record<string, string[]> = {
    'ㅘ': ['ㅗ','ㅏ'], 'ㅙ': ['ㅗ','ㅐ'], 'ㅚ': ['ㅗ','ㅣ'],
    'ㅝ': ['ㅜ','ㅓ'], 'ㅞ': ['ㅜ','ㅔ'], 'ㅟ': ['ㅜ','ㅣ'],
    'ㅢ': ['ㅡ','ㅣ'],
  };
  if (vowelParts[vowel]) {
    parts.push(...vowelParts[vowel]);
  } else {
    parts.push(vowel);
  }

  if (fi > 0) {
    const final = JONGSEONG[fi];
    const finalParts: Record<string, string[]> = {
      'ㄳ': ['ㄱ','ㅅ'], 'ㄵ': ['ㄴ','ㅈ'], 'ㄶ': ['ㄴ','ㅎ'],
      'ㄺ': ['ㄹ','ㄱ'], 'ㄻ': ['ㄹ','ㅁ'], 'ㄼ': ['ㄹ','ㅂ'],
      'ㄽ': ['ㄹ','ㅅ'], 'ㄾ': ['ㄹ','ㅌ'], 'ㄿ': ['ㄹ','ㅍ'],
      'ㅀ': ['ㄹ','ㅎ'], 'ㅄ': ['ㅂ','ㅅ'],
    };
    if (finalParts[final]) {
      parts.push(...finalParts[final]);
    } else {
      parts.push(final);
    }
  }

  return parts;
}

// Decompose a full string back to jamo array
function decomposeFull(text: string): string[] {
  const result: string[] = [];
  for (const ch of text) {
    result.push(...decomposeSyllable(ch));
  }
  return result;
}

// ═══════════════════════════════════════════════════════════════
// Keyboard Layout (2-beolsik)
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
    { label: '⇧', type: 'shift', flex: 1.3 },
    { label: 'ㅋ' },
    { label: 'ㅌ' },
    { label: 'ㅊ' },
    { label: 'ㅍ' },
    { label: 'ㅠ' },
    { label: 'ㅜ' },
    { label: 'ㅡ' },
    { label: '⌫', type: 'backspace', flex: 1.3 },
  ],
];

interface KoreanKeyboardProps {
  value: string;
  onChange: (value: string) => void;
  visible: boolean;
  onClose: () => void;
}

export function KoreanKeyboard({ value, onChange, visible, onClose }: KoreanKeyboardProps) {
  const [shift, setShift] = useState(false);
  const [buffer, setBuffer] = useState<string[]>([]);
  const longPressRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const backspaceIntervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Sync buffer from external value changes (e.g., pasting)
  useEffect(() => {
    setBuffer(decomposeFull(value));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Only on mount — after that we own the state

  const emit = useCallback((newBuffer: string[]) => {
    setBuffer(newBuffer);
    const composed = composeBuffer(newBuffer);
    onChange(composed);
  }, [onChange]);

  const handleKey = useCallback((key: KeyDef) => {
    setShift(false);

    if (key.type === 'shift') {
      setShift(s => !s);
      return;
    }

    if (key.type === 'backspace') {
      setBuffer(prev => {
        if (prev.length === 0) return prev;
        const next = [...prev];
        next.pop();
        const composed = composeBuffer(next);
        onChange(composed);
        return next;
      });
      return;
    }

    if (key.type === 'space') {
      setBuffer(prev => {
        const next = [...prev, ' '];
        onChange(composeBuffer(next));
        return next;
      });
      return;
    }

    if (key.type === 'done') {
      onClose();
      return;
    }

    // It's a jamo key
    const jamo = (shift && key.shiftLabel) ? key.shiftLabel : key.label;
    setBuffer(prev => {
      const next = [...prev, jamo];
      const composed = composeBuffer(next);
      onChange(composed);
      return next;
    });
  }, [shift, onChange, onClose]);

  // Long press backspace: clear buffer
  const startBackspaceRepeat = useCallback(() => {
    longPressRef.current = setTimeout(() => {
      backspaceIntervalRef.current = setInterval(() => {
        setBuffer(prev => {
          if (prev.length === 0) {
            if (backspaceIntervalRef.current) {
              clearInterval(backspaceIntervalRef.current);
              backspaceIntervalRef.current = null;
            }
            return prev;
          }
          const next = [...prev];
          next.pop();
          const composed = composeBuffer(next);
          onChange(composed);
          return next;
        });
      }, 60);
    }, 400);
  }, [onChange]);

  const stopBackspaceRepeat = useCallback(() => {
    if (longPressRef.current) { clearTimeout(longPressRef.current); longPressRef.current = null; }
    if (backspaceIntervalRef.current) { clearInterval(backspaceIntervalRef.current); backspaceIntervalRef.current = null; }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (longPressRef.current) clearTimeout(longPressRef.current);
      if (backspaceIntervalRef.current) clearInterval(backspaceIntervalRef.current);
    };
  }, []);

  if (!visible) return null;

  const preview = composeBuffer(buffer);

  return (
    <div className="fixed inset-x-0 bottom-0 z-[200] animate-slide-up-drawer">
      {/* Preview bar */}
      <div className="flex items-center gap-3 px-4 py-2.5 bg-[var(--bg-card)] border-t border-[var(--border-color)]">
        <div className="flex-1 min-h-[28px] flex items-center">
          <span className="text-lg font-bold text-[var(--text-primary)]">
            {preview || <span className="text-[var(--text-muted)] font-normal text-sm">输入韩文...</span>}
          </span>
          {preview !== value && preview !== '' && (
            <span className="text-xs text-[var(--text-muted)] ml-2">({buffer.join('')})</span>
          )}
        </div>
        <button
          onClick={onClose}
          className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)] rounded-lg transition-colors"
        >
          <X size={18} />
        </button>
      </div>

      {/* Key rows */}
      <div className="bg-[var(--bg-soft)] border-t border-[var(--border-color)] px-1.5 pt-1.5 pb-1">
        {ROWS.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-1 mb-1">
            {row.map((key, ki) => {
              const label = key.type
                ? key.label
                : (shift && key.shiftLabel) ? key.shiftLabel : key.label;
              const flex = key.flex || 1;

              let bgClass = 'bg-[var(--bg-card)]';
              if (key.type === 'shift') bgClass = shift ? 'bg-[var(--pink-primary)]/20 text-[var(--pink-primary)]' : 'bg-[var(--bg-muted)]';
              if (key.type === 'backspace') bgClass = 'bg-[var(--bg-muted)]';
              if (key.type === 'space' || key.type === 'done') bgClass = 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]';

              return (
                <button
                  key={`${ri}-${ki}`}
                  onClick={() => handleKey(key)}
                  onMouseDown={key.type === 'backspace' ? startBackspaceRepeat : undefined}
                  onMouseUp={key.type === 'backspace' ? stopBackspaceRepeat : undefined}
                  onMouseLeave={key.type === 'backspace' ? stopBackspaceRepeat : undefined}
                  onTouchStart={key.type === 'backspace' ? startBackspaceRepeat : undefined}
                  onTouchEnd={key.type === 'backspace' ? stopBackspaceRepeat : undefined}
                  className={`${bgClass} flex items-center justify-center py-3 rounded-xl text-base font-medium
                    text-[var(--text-primary)] shadow-sm
                    active:scale-95 active:bg-[var(--pink-pale)]/30
                    transition-all duration-75 select-none
                    hover:bg-[var(--bg-card-hover)]`}
                  style={{ flex }}
                >
                  {key.type === 'backspace' ? (
                    <Delete size={18} />
                  ) : (
                    <span>{label}</span>
                  )}
                </button>
              );
            })}
          </div>
        ))}

        {/* Bottom row: space + done */}
        <div className="flex gap-1 justify-center">
          <button
            onClick={() => handleKey({ label: '', type: 'space', flex: 4 })}
            className="bg-[var(--bg-card)] flex items-center justify-center py-2.5 rounded-xl text-sm font-medium text-[var(--text-muted)] shadow-sm active:scale-95 transition-all select-none"
            style={{ flex: 4 }}
          >
            Space
          </button>
          <button
            onClick={() => handleKey({ label: '', type: 'done', flex: 1.5 })}
            className="bg-[var(--pink-primary)] flex items-center justify-center py-2.5 rounded-xl text-sm font-bold text-white shadow-sm active:scale-95 transition-all select-none"
            style={{ flex: 1.5 }}
          >
            Done
          </button>
        </div>

        {/* Safe area padding for mobile */}
        <div className="pb-safe" />
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════
// Higher-level component: KoreanInput (input + keyboard toggle)
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
          className={`absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-lg transition-colors text-sm ${
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
