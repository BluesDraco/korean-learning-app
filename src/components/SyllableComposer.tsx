'use client';

import { useState, useCallback } from 'react';
import { Volume2, Shuffle, X, Sparkles } from 'lucide-react';
import { speakWord } from '@/lib/tts';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const INITIALS = [
  { letter: 'ㄱ', name: '기역', rom: 'g' },
  { letter: 'ㄲ', name: '쌍기역', rom: 'kk' },
  { letter: 'ㄴ', name: '니은', rom: 'n' },
  { letter: 'ㄷ', name: '디귿', rom: 'd' },
  { letter: 'ㄸ', name: '쌍디귿', rom: 'tt' },
  { letter: 'ㄹ', name: '리을', rom: 'r/l' },
  { letter: 'ㅁ', name: '미음', rom: 'm' },
  { letter: 'ㅂ', name: '비읍', rom: 'b' },
  { letter: 'ㅃ', name: '쌍비읍', rom: 'pp' },
  { letter: 'ㅅ', name: '시옷', rom: 's' },
  { letter: 'ㅆ', name: '쌍시옷', rom: 'ss' },
  { letter: 'ㅇ', name: '이응', rom: '' },
  { letter: 'ㅈ', name: '지읒', rom: 'j' },
  { letter: 'ㅉ', name: '쌍지읒', rom: 'jj' },
  { letter: 'ㅊ', name: '치읓', rom: 'ch' },
  { letter: 'ㅋ', name: '키읔', rom: 'k' },
  { letter: 'ㅌ', name: '티읕', rom: 't' },
  { letter: 'ㅍ', name: '피읖', rom: 'p' },
  { letter: 'ㅎ', name: '히읗', rom: 'h' },
];

const VOWELS = [
  { letter: 'ㅏ', name: '아', rom: 'a' },
  { letter: 'ㅐ', name: '애', rom: 'ae' },
  { letter: 'ㅑ', name: '야', rom: 'ya' },
  { letter: 'ㅒ', name: '얘', rom: 'yae' },
  { letter: 'ㅓ', name: '어', rom: 'eo' },
  { letter: 'ㅔ', name: '에', rom: 'e' },
  { letter: 'ㅕ', name: '여', rom: 'yeo' },
  { letter: 'ㅖ', name: '예', rom: 'ye' },
  { letter: 'ㅗ', name: '오', rom: 'o' },
  { letter: 'ㅘ', name: '와', rom: 'wa' },
  { letter: 'ㅙ', name: '왜', rom: 'wae' },
  { letter: 'ㅚ', name: '외', rom: 'oe' },
  { letter: 'ㅛ', name: '요', rom: 'yo' },
  { letter: 'ㅜ', name: '우', rom: 'u' },
  { letter: 'ㅝ', name: '워', rom: 'wo' },
  { letter: 'ㅞ', name: '웨', rom: 'we' },
  { letter: 'ㅟ', name: '위', rom: 'wi' },
  { letter: 'ㅠ', name: '유', rom: 'yu' },
  { letter: 'ㅡ', name: '으', rom: 'eu' },
  { letter: 'ㅢ', name: '의', rom: 'ui' },
  { letter: 'ㅣ', name: '이', rom: 'i' },
];

const FINALS = [
  { letter: '없음', rom: '' },
  { letter: 'ㄱ', rom: 'k' },
  { letter: 'ㄴ', rom: 'n' },
  { letter: 'ㄷ', rom: 't' },
  { letter: 'ㄹ', rom: 'l' },
  { letter: 'ㅁ', rom: 'm' },
  { letter: 'ㅂ', rom: 'p' },
  { letter: 'ㅇ', rom: 'ng' },
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
  const { lang } = useLang();
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
          {t('phonetics.composer_title', lang)}
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          {t('phonetics.composer_subtitle', lang)}
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
              <span className="text-xs text-[var(--text-muted)]">{t('phonetics.composer_initial', lang)}</span>
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
              <span className="text-xs text-[var(--text-muted)]">{t('phonetics.composer_medial', lang)}</span>
            )}
          </div>

          <span className="text-[var(--text-muted)] text-lg">+</span>

          {/* Final */}
          <div className={`w-20 h-20 rounded-2xl border-2 border-dashed flex items-center justify-center transition-all ${
            jong && jong !== '없음'
              ? 'border-[var(--mint-soft)] bg-[var(--mint-soft)]/5'
              : jong === '없음'
                ? 'border-[var(--border-color)] bg-[var(--bg-card-hover)]'
                : 'border-[var(--border-color)] bg-[var(--bg-input)]'
          }`}>
            {jong ? (
              <span className="text-2xl font-bold text-[var(--text-primary)]">{jong}</span>
            ) : (
              <span className="text-xs text-[var(--text-muted)]">{t('phonetics.composer_final', lang)}</span>
            )}
          </div>

          <span className="text-[var(--text-muted)] text-lg">=</span>

          {/* Result */}
          <div className="w-24 h-24 rounded-2xl bg-gradient-to-br from-[var(--pink-primary)]/10 to-[var(--purple-soft)]/10 border-2 border-[var(--pink-primary)]/30 flex flex-col items-center justify-center gap-1">
            {syllable ? (
              <>
                <span className="text-3xl font-extrabold text-[var(--text-primary)]">{syllable}</span>
                <button
                  onClick={() => speakWord(syllable)}
                  className="p-1 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                  title={t('phonetics.composer_hear_sound', lang)}
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
            {cho === 'ㅇ' ? t('phonetics.composer_initial_silent', lang) : `${cho}(${INITIALS.find(i => i.letter === cho)?.rom})`}
            {' + '}
            {jung}({VOWELS.find(v => v.letter === jung)?.rom})
            {jong ? ` + ${jong}(${t('phonetics.composer_batchim_suffix', lang)})` : ''}
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
            {t('phonetics.composer_randomize', lang)}
          </button>
          <button
            onClick={reset}
            className="flex items-center gap-1.5 px-4 py-2 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-xl text-sm font-medium transition-colors"
          >
            <X size={14} />
            {t('phonetics.composer_clear', lang)}
          </button>
        </div>
      </div>

      {/* Selection panels */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Initial consonants */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
          <h3 className="text-sm font-medium text-[var(--text-primary)] mb-3 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-[var(--pink-primary)]" />
            {t('phonetics.composer_initial', lang)} (초성)
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
            {t('phonetics.composer_medial', lang)} (중성)
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
            {t('phonetics.composer_final', lang)} (종성/받침)
          </h3>
          <div className="flex flex-wrap gap-2">
            {FINALS.map((item) => (
              <button
                key={item.letter}
                onClick={() => setJong(item.letter === '없음' ? '' : item.letter)}
                className={`px-3 py-2 rounded-xl text-sm font-bold transition-all ${
                  (item.letter === '없음' && jong === '') || jong === item.letter
                    ? 'bg-[var(--mint-soft)] text-white shadow-md shadow-[var(--mint-soft)]/30 scale-110'
                    : 'bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)]'
                }`}
                title={item.letter === '없음' ? t('phonetics.composer_final_none', lang) : `${item.letter}${t('phonetics.composer_batchim_suffix', lang)}`}
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
          <span>💡</span> {t('phonetics.composer_examples_title', lang)}
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {[
            { syl: '가', breakdown: 'ㄱ+ㅏ', meaning: t('phonetics.composer_ex_ga', lang) },
            { syl: '는', breakdown: 'ㄴ+ㅡ+ㄴ', meaning: t('phonetics.composer_ex_neun', lang) },
            { syl: '한', breakdown: 'ㅎ+ㅏ+ㄴ', meaning: t('phonetics.composer_ex_han', lang) },
            { syl: '국', breakdown: 'ㄱ+ㅜ+ㄱ', meaning: t('phonetics.composer_ex_guk', lang) },
            { syl: '어', breakdown: 'ㅇ+ㅓ', meaning: t('phonetics.composer_ex_eo', lang) },
            { syl: '요', breakdown: 'ㅇ+ㅛ', meaning: t('phonetics.composer_ex_yo', lang) },
            { syl: '세', breakdown: 'ㅅ+ㅔ', meaning: t('phonetics.composer_ex_se', lang) },
            { syl: '입', breakdown: 'ㅇ+ㅣ+ㅂ', meaning: t('phonetics.composer_ex_ip', lang) },
          ].map((item) => (
            <button
              key={item.syl}
              onClick={() => speakWord(item.syl)}
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
