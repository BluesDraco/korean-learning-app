'use client';

import { useState, useCallback } from 'react';
import { Volume2, Shuffle, X, ArrowRight, Sparkles } from 'lucide-react';
import { speak } from '@/lib/tts';

const INITIALS = [
  { letter: 'ㄱ', name: '기역', rom: 'g' },
  { letter: 'ㄴ', name: '니은', rom: 'n' },
  { letter: 'ㄷ', name: '디귿', rom: 'd' },
  { letter: 'ㄹ', name: '리을', rom: 'r/l' },
  { letter: 'ㅁ', name: '미음', rom: 'm' },
  { letter: 'ㅂ', name: '비읍', rom: 'b' },
  { letter: 'ㅅ', name: '시옷', rom: 's' },
  { letter: 'ㅇ', name: '이응', rom: '(无声)' },
  { letter: 'ㅈ', name: '지읒', rom: 'j' },
  { letter: 'ㅊ', name: '치읓', rom: 'ch' },
  { letter: 'ㅋ', name: '키읔', rom: 'k' },
  { letter: 'ㅌ', name: '티읕', rom: 't' },
  { letter: 'ㅍ', name: '피읖', rom: 'p' },
  { letter: 'ㅎ', name: '히읗', rom: 'h' },
];

const VOWELS = [
  { letter: 'ㅏ', name: '아', rom: 'a' },
  { letter: 'ㅑ', name: '야', rom: 'ya' },
  { letter: 'ㅓ', name: '어', rom: 'eo' },
  { letter: 'ㅕ', name: '여', rom: 'yeo' },
  { letter: 'ㅗ', name: '오', rom: 'o' },
  { letter: 'ㅛ', name: '요', rom: 'yo' },
  { letter: 'ㅜ', name: '우', rom: 'u' },
  { letter: 'ㅠ', name: '유', rom: 'yu' },
  { letter: 'ㅡ', name: '으', rom: 'eu' },
  { letter: 'ㅣ', name: '이', rom: 'i' },
];

const FINALS = [
  { letter: '(无)', name: '无收音', rom: '' },
  { letter: 'ㄱ', name: 'ㄱ收音', rom: 'k' },
  { letter: 'ㄴ', name: 'ㄴ收音', rom: 'n' },
  { letter: 'ㄷ', name: 'ㄷ收音', rom: 't' },
  { letter: 'ㄹ', name: 'ㄹ收音', rom: 'l' },
  { letter: 'ㅁ', name: 'ㅁ收音', rom: 'm' },
  { letter: 'ㅂ', name: 'ㅂ收音', rom: 'p' },
  { letter: 'ㅇ', name: 'ㅇ收音', rom: 'ng' },
];

function composeSyllable(cho: string, jung: string, jong: string): string {
  const choMap: Record<string, number> = {
    'ㄱ': 0, 'ㄲ': 1, 'ㄴ': 2, 'ㄷ': 3, 'ㄸ': 4, 'ㄹ': 5,
    'ㅁ': 6, 'ㅂ': 7, 'ㅃ': 8, 'ㅅ': 9, 'ㅆ': 10, 'ㅇ': 11,
    'ㅈ': 12, 'ㅉ': 13, 'ㅊ': 14, 'ㅋ': 15, 'ㅌ': 16, 'ㅍ': 17, 'ㅎ': 18,
  };

  const jungMap: Record<string, number> = {
    'ㅏ': 0, 'ㅐ': 1, 'ㅑ': 2, 'ㅒ': 3, 'ㅓ': 4, 'ㅔ': 5,
    'ㅕ': 6, 'ㅖ': 7, 'ㅗ': 8, 'ㅘ': 9, 'ㅙ': 10, 'ㅚ': 11,
    'ㅛ': 12, 'ㅜ': 13, 'ㅝ': 14, 'ㅞ': 15, 'ㅟ': 16, 'ㅠ': 17,
    'ㅡ': 18, 'ㅢ': 19, 'ㅣ': 20,
  };

  const jongMap: Record<string, number> = {
    '': 0, 'ㄱ': 1, 'ㄲ': 2, 'ㄳ': 3, 'ㄴ': 4, 'ㄵ': 5, 'ㄶ': 6,
    'ㄷ': 7, 'ㄹ': 8, 'ㄺ': 9, 'ㄻ': 10, 'ㄼ': 11, 'ㄽ': 12, 'ㄾ': 13, 'ㄿ': 14, 'ㅀ': 15,
    'ㅁ': 16, 'ㅂ': 17, 'ㅄ': 18, 'ㅅ': 19, 'ㅆ': 20, 'ㅇ': 21, 'ㅈ': 22,
    'ㅊ': 23, 'ㅋ': 24, 'ㅌ': 25, 'ㅍ': 26, 'ㅎ': 27,
  };

  const choIdx = choMap[cho] ?? 11;
  const jungIdx = jungMap[jung] ?? 0;
  const jongIdx = jongMap[jong] ?? 0;

  return String.fromCodePoint(0xAC00 + choIdx * 588 + jungIdx * 28 + jongIdx);
}

export default function SyllableComposer() {
  const [cho, setCho] = useState<string | null>(null);
  const [jung, setJung] = useState<string | null>(null);
  const [jong, setJong] = useState<string>('');

  const syllable = cho && jung ? composeSyllable(cho, jung, jong) : null;

  const randomize = useCallback(() => {
    setCho(INITIALS[Math.floor(Math.random() * INITIALS.length)].letter);
    setJung(VOWELS[Math.floor(Math.random() * VOWELS.length)].letter);
    setJong(FINALS[Math.floor(Math.random() * FINALS.length)].letter);
  }, []);

  const reset = () => {
    setCho(null);
    setJung(null);
    setJong('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-lg font-bold text-[var(--text-primary)] flex items-center justify-center gap-2">
          <Sparkles size={18} className="text-[var(--peach-soft)]" />
          音节拼装器
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          选择初声 + 中声 + 终声，直观理解韩文方块字的组合原理
        </p>
      </div>

      {/* Composition display */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 space-y-5">
        {/* Visual formula */}
        <div className="flex items-center justify-center gap-3 flex-wrap">
          {/* Initial */}
          <div className={`w-20 h-20 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all ${
            cho
              ? 'border-[var(--pink-primary)] bg-[var(--pink-primary)]/5'
              : 'border-[var(--border-color)] bg-[var(--bg-input)]'
          }`}>
            {cho ? (
              <span className="text-2xl font-bold text-[var(--text-primary)]">{cho}</span>
            ) : (
              <span className="text-xs text-[var(--text-muted)]">初声</span>
            )}
          </div>

          <span className="text-[var(--text-muted)] text-lg">+</span>

          {/* Medial */}
          <div className={`w-20 h-20 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all ${
            jung
              ? 'border-[var(--purple-soft)] bg-[var(--purple-soft)]/5'
              : 'border-[var(--border-color)] bg-[var(--bg-input)]'
          }`}>
            {jung ? (
              <span className="text-2xl font-bold text-[var(--text-primary)]">{jung}</span>
            ) : (
              <span className="text-xs text-[var(--text-muted)]">中声</span>
            )}
          </div>

          <span className="text-[var(--text-muted)] text-lg">+</span>

          {/* Final */}
          <div className={`w-20 h-20 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all ${
            jong && jong !== '(无)'
              ? 'border-[var(--mint-soft)] bg-[var(--mint-soft)]/5'
              : jong === '(无)'
                ? 'border-[var(--border-color)] bg-[var(--bg-card-hover)]'
                : 'border-[var(--border-color)] bg-[var(--bg-input)]'
          }`}>
            {jong ? (
              <span className="text-2xl font-bold text-[var(--text-primary)]">{jong}</span>
            ) : (
              <span className="text-xs text-[var(--text-muted)]">终声</span>
            )}
          </div>

          <span className="text-[var(--text-muted)] text-lg">=</span>

          {/* Result */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--pink-primary)]/10 to-[var(--purple-soft)]/10 border-2 border-[var(--pink-primary)]/30 flex flex-col items-center justify-center gap-1">
            {syllable ? (
              <>
                <span className="text-3xl font-extrabold text-[var(--text-primary)]">{syllable}</span>
                <button
                  onClick={() => speak(syllable, 0.7)}
                  className="p-1 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                  title="听发音"
                >
                  <Volume2 size={14} />
                </button>
              </>
            ) : (
              <span className="text-xs text-[var(--text-muted)]">?</span>
            )}
          </div>
        </div>

        {/* Sound description */}
        {syllable && cho && jung && (
          <div className="text-center text-sm text-[var(--text-secondary)] bg-[var(--bg-input)] rounded-xl py-2 px-4">
            {cho === 'ㅇ' ? '初声ㅇ不发音' : `${cho}(${INITIALS.find(i => i.letter === cho)?.rom})`}
            {' + '}
            {jung}({VOWELS.find(v => v.letter === jung)?.rom})
            {jong && jong !== '(无)' ? ` + ${jong}(收音)` : ''}
            {' → '}
            <span className="font-bold text-[var(--text-primary)]">
              [{syllable}]
            </span>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 justify-center">
          <button
            onClick={randomize}
            className="flex items-center gap-1.5 px-4 py-2 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-xl text-sm font-medium transition-colors"
          >
            <Shuffle size={14} />
            随机组合
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-4 py-2 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-xl text-sm font-medium transition-colors"
          >
            <X size={14} />
            清空
          </button>
        </div>
      </div>

      {/* Selection panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Initial consonants */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
          <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--pink-primary)]" />
            初声 (초성)
          </h3>
          <div className="flex flex-wrap gap-2">
            {INITIALS.map((item) => (
              <button
                key={item.letter}
                onClick={() => setCho(item.letter)}
                className={`px-3 py-2 rounded-xl text-lg font-bold transition-all ${
                  cho === item.letter
                    ? 'bg-[var(--pink-primary)] text-white shadow-md shadow-[var(--pink-primary)]/30 scale-110'
                    : 'bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)]'
                }`}
                title={`${item.name} [${item.rom}]`}
              >
                {item.letter}
              </button>
            ))}
          </div>
        </div>

        {/* Medial vowels */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
          <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--purple-soft)]" />
            中声 (중성)
          </h3>
          <div className="flex flex-wrap gap-2">
            {VOWELS.map((item) => (
              <button
                key={item.letter}
                onClick={() => setJung(item.letter)}
                className={`px-3 py-2 rounded-xl text-lg font-bold transition-all ${
                  jung === item.letter
                    ? 'bg-[var(--purple-soft)] text-white shadow-md shadow-[var(--purple-soft)]/30 scale-110'
                    : 'bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)]'
                }`}
                title={`${item.name} [${item.rom}]`}
              >
                {item.letter}
              </button>
            ))}
          </div>
        </div>

        {/* Final consonants */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
          <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--mint-soft)]" />
            终声 (종성/받침)
          </h3>
          <div className="flex flex-wrap gap-2">
            {FINALS.map((item) => (
              <button
                key={item.letter}
                onClick={() => setJong(item.letter === '(无)' ? '' : item.letter)}
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                  (item.letter === '(无)' && jong === '') || jong === item.letter
                    ? 'bg-[var(--mint-soft)] text-white shadow-md shadow-[var(--mint-soft)]/30 scale-110'
                    : 'bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)]'
                }`}
                title={item.name}
              >
                {item.letter}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Common syllables examples */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3 flex items-center gap-2">
          <span>💡</span> 常用音节示例
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { syl: '가', breakdown: 'ㄱ+ㅏ', meaning: '常见音节' },
            { syl: '는', breakdown: 'ㄴ+ㅡ+ㄴ', meaning: '은/는 助词' },
            { syl: '한', breakdown: 'ㅎ+ㅏ+ㄴ', meaning: '韩(国)' },
            { syl: '국', breakdown: 'ㄱ+ㅜ+ㄱ', meaning: '国' },
            { syl: '어', breakdown: 'ㅇ+ㅓ', meaning: '语/鱼' },
            { syl: '요', breakdown: 'ㅇ+ㅛ', meaning: '敬语词尾' },
            { syl: '세', breakdown: 'ㅅ+ㅔ', meaning: '世/三' },
            { syl: '입', breakdown: 'ㅇ+ㅣ+ㅂ', meaning: '嘴/入口' },
          ].map((item) => (
            <button
              key={item.syl}
              onClick={() => speak(item.syl, 0.7)}
              className="flex items-center gap-2 p-2.5 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] rounded-xl transition-colors text-left group"
            >
              <span className="text-xl font-bold text-[var(--text-primary)]">{item.syl}</span>
              <div className="min-w-0">
                <div className="text-[11px] text-[var(--text-muted)]">{item.breakdown}</div>
                <div className="text-[11px] text-[var(--text-secondary)]">{item.meaning}</div>
              </div>
              <Volume2 size={12} className="text-[var(--text-muted)] opacity-0 group-hover:opacity-100 transition-opacity ml-auto shrink-0" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
