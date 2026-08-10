'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Eye, EyeOff, ArrowRight, RotateCcw, Trophy, Sparkles, BookOpen } from 'lucide-react';
import { speak, speakWord } from '@/lib/tts';
import { emitXpFlyout } from '@/components/XpOverlay';
import { db } from '@/lib/db';
import Link from 'next/link';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface ReadingWord {
  [k: string]: unknown;
  korean: string;
  pronunciation: string;
  meaning: string;
}

interface ProgressiveStep {
  [k: string]: unknown;
  id: string;
  title: string;
  titleKo: string;
  emoji: string;
  description: string;
}

export default function ReadingPractice({ words, step }: { words: ReadingWord[]; step: ProgressiveStep }) {
  const { lang } = useLang();
  const [revealed, setRevealed] = useState<Set<number>>(new Set());
  const [mode, setMode] = useState<'browse' | 'practice'>('browse');
  const [practiceIdx, setPracticeIdx] = useState(0);
  const [practiceCorrect, setPracticeCorrect] = useState(0);
  const [practiceTotal, setPracticeTotal] = useState(0);
  const [practiceComplete, setPracticeComplete] = useState(false);
  const [xpAwarded, setXpAwarded] = useState(false);
  const [wordsAdded, setWordsAdded] = useState(0);
  const addedRef = useRef(false);

  // Auto-add words to vocabulary on completion
  useEffect(() => {
    if (!practiceComplete || addedRef.current) return;
    const passThreshold = practiceCorrect >= Math.ceil(words.length * 0.6);
    if (!passThreshold) return;
    addedRef.current = true;
    (async () => {
      const now = Date.now();
      let count = 0;
      for (const w of words) {
        const exists = await db.words.where('word').equals(w.korean).first();
        if (!exists) {
          await db.words.put({
            id: crypto.randomUUID(),
            word: w.korean,
            pronunciation: w.pronunciation,
            meaning: w.meaning,
            partOfSpeech: t('vocab.pos_word', lang),
            examples: [],
            source: 'reading',
            sourceDetail: t('vocab.source_reading', lang),
            mastery: 'new',
            srsLevel: 0,
            easeFactor: 2.5,
            interval: 0,
            nextReview: now,
            correctCount: 0,
            wrongCount: 0,
            createdAt: now,
            lastReviewed: null,
          });
          count++;
        }
      }
      setWordsAdded(count);
    })();
  }, [practiceComplete, practiceCorrect, words]);

  const toggleReveal = (idx: number) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(idx)) next.delete(idx); else next.add(idx);
      return next;
    });
  };

  const startPractice = () => {
    setMode('practice');
    setPracticeIdx(0);
    setPracticeCorrect(0);
    setPracticeTotal(0);
    setPracticeComplete(false);
    setXpAwarded(false);
  };

  const handleSelfEval = (gotIt: boolean) => {
    if (gotIt) setPracticeCorrect((p) => p + 1);
    setPracticeTotal((p) => p + 1);

    if (practiceIdx + 1 >= words.length) {
      setPracticeComplete(true);
      if (practiceCorrect + (gotIt ? 1 : 0) >= Math.ceil(words.length * 0.6) && !xpAwarded) {
        emitXpFlyout(15);
        setXpAwarded(true);
      }
    } else {
      setPracticeIdx((p) => p + 1);
    }
  };

  const syllableCount = (text: string) => text.length;

  return (
    <div className="space-y-6">
      {/* Step header */}
      <div className="text-center">
        <div className="text-5xl mb-3">{step.emoji}</div>
        <h2 className="text-xl font-bold text-[var(--text-primary)]">
          {step.title} <span className="text-[var(--text-muted)] text-base font-normal">({step.titleKo})</span>
        </h2>
        <p className="text-sm text-[var(--text-secondary)] mt-1 max-w-md mx-auto">
          {step.description}
        </p>
        <div className="text-xs text-[var(--text-muted)] mt-2">
          {t('rprac.word_count', lang, { n: words.length })}
        </div>
      </div>

      {/* Browse mode: word grid */}
      {mode === 'browse' && (
        <>
          {/* Difficulty sections */}
          {[1, 2, 3].map((sylCount) => {
            const sectionWords = words.filter((w) => {
              const count = syllableCount(w.korean);
              if (sylCount === 3) return count >= 3;
              return count === sylCount;
            });
            if (sectionWords.length === 0) return null;
            return (
              <div key={sylCount}>
                <h3 className="text-xs font-medium text-[var(--text-muted)] mb-2 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink-primary)]" />
                  {sylCount === 1 ? t('rprac.syl_1', lang) : sylCount === 2 ? t('rprac.syl_2', lang) : t('rprac.syl_3', lang)}
                  <span className="text-[var(--text-placeholder)]">{t('rprac.count', lang, { n: sectionWords.length })}</span>
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {sectionWords.map((w, _i) => {
                    const globalIdx = words.indexOf(w);
                    const isRevealed = revealed.has(globalIdx);
                    return (
                      <div
                        key={globalIdx}
                        className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 transition-all hover:border-[var(--border-hover)]"
                      >
                        <div className="text-center space-y-3">
                          <button
                            onClick={() => speakWord(w.korean)}
                            className="text-2xl font-extrabold text-[var(--text-primary)] hover:text-[var(--pink-primary)] transition-colors"
                            style={{ fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" }}
                            title={t('rprac.tap_to_hear', lang)}
                          >
                            {w.korean}
                          </button>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => speakWord(w.korean)}
                              className="p-1.5 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                              title={t('rprac.listen', lang)}
                            >
                              <Volume2 size={14} />
                            </button>
                            <button
                              onClick={() => toggleReveal(globalIdx)}
                              className="p-1.5 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                              title={isRevealed ? t('rprac.hide_meaning', lang) : t('rprac.show_meaning', lang)}
                            >
                              {isRevealed ? <EyeOff size={14} /> : <Eye size={14} />}
                            </button>
                          </div>
                          {isRevealed && (
                            <div className="animate-fade-in space-y-1 pt-2 border-t border-[var(--border-color)]">
                              <p className="text-xs text-[var(--text-muted)]">[{w.pronunciation}]</p>
                              <p className="text-sm font-medium text-[var(--text-primary)]">{w.meaning}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}

          {/* Start practice button */}
          <button
            onClick={startPractice}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-colors transition-opacity transition-shadow font-bold text-sm hover:shadow-lg hover:shadow-[var(--pink-primary)]/25 active:scale-[0.98]"
          >
            {t('rprac.start', lang)}
            <ArrowRight size={18} />
          </button>

          <p className="text-xs text-center text-[var(--text-muted)]">
            {t('rprac.start_hint', lang)}
          </p>
        </>
      )}

      {/* Practice mode: flashcard */}
      {mode === 'practice' && !practiceComplete && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <button
              onClick={() => setMode('browse')}
              className="text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              ← {t('rprac.back_browse', lang)}
            </button>
            <span className="text-sm font-medium text-[var(--text-primary)]">
              {t('rprac.flashcard_progress', lang, { current: practiceIdx + 1, total: words.length })}
            </span>
            <span className="text-xs text-[var(--text-muted)]">{t('rprac.correct', lang, { n: practiceCorrect })}</span>
          </div>

          <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
            <div
              className="bg-[var(--pink-primary)] h-1.5 rounded-full transition-all"
              style={{ width: `${((practiceIdx + 1) / words.length) * 100}%` }}
            />
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 space-y-8 text-center">
            {/* Instruction */}
            <p className="text-sm text-[var(--text-secondary)]">
              {t('rprac.instruction', lang)}
            </p>

            {/* The word */}
            <div className="py-6">
              <span
                className="text-5xl font-extrabold text-[var(--text-primary)]"
                style={{ fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" }}
              >
                {words[practiceIdx].korean}
              </span>
            </div>

            {/* Listen button */}
            <button
              onClick={() => speakWord(words[practiceIdx].korean)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--pink-primary)]/10 border-2 border-[var(--pink-primary)]/30 rounded-3xl hover:bg-[var(--pink-primary)]/20 transition-colors"
            >
              <Volume2 size={24} className="text-[var(--pink-primary)]" />
              <span className="text-sm font-bold text-[var(--pink-primary)]">{t('rprac.listen_correct', lang)}</span>
            </button>

            {/* Meaning reveal */}
            <div className="bg-[var(--bg-input)] rounded-2xl p-4">
              <p className="text-xs text-[var(--text-muted)] mb-1">{t('rprac.meaning', lang)}</p>
              <p className="text-base font-medium text-[var(--text-primary)]">{words[practiceIdx].meaning}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">[{words[practiceIdx].pronunciation}]</p>
            </div>

            {/* Self evaluation */}
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-3">{t('rprac.did_you_get_it', lang)}</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => handleSelfEval(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-[var(--mint-soft)]/15 border border-[var(--mint-soft)]/30 text-[var(--text-primary)] rounded-2xl text-sm font-bold hover:bg-[var(--mint-soft)]/25 transition-colors active:scale-95"
                >
                  {t('rprac.got_it', lang)} ✓
                </button>
                <button
                  onClick={() => handleSelfEval(false)}
                  className="flex items-center gap-2 px-6 py-3 bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-secondary)] rounded-2xl text-sm font-medium hover:bg-[var(--bg-accent)] transition-colors active:scale-95"
                >
                  {t('rprac.not_yet', lang)}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Practice complete */}
      {mode === 'practice' && practiceComplete && (
        <div className="py-6 text-center space-y-6">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--purple-soft)]/20 to-[var(--pink-primary)]/20 flex items-center justify-center mx-auto border-2 border-[var(--purple-soft)]/30">
            {practiceCorrect >= Math.ceil(words.length * 0.6) ? (
              <Trophy size={36} className="text-[var(--peach-soft)]" />
            ) : (
              <RotateCcw size={36} className="text-[var(--text-muted)]" />
            )}
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">
              {practiceCorrect >= Math.ceil(words.length * 0.6)
                ? t('rprac.complete_title', lang)
                : t('rprac.retry_title', lang)}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              {t('rprac.self_eval', lang, { correct: practiceCorrect, total: practiceTotal, pct: Math.round((practiceCorrect / practiceTotal) * 100) })}
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              {t('rprac.now_recognize', lang, { n: words.length })}
            </p>
          </div>

          {practiceCorrect >= Math.ceil(words.length * 0.6) && (
            <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-3 space-y-2">
              <div className="flex items-center gap-2 justify-center">
                <Sparkles size={16} className="text-[var(--mint-soft)]" />
                <span className="text-sm text-[var(--text-primary)]">+15 XP</span>
              </div>
              {wordsAdded > 0 && (
                <div className="flex items-center gap-2 justify-center">
                  <BookOpen size={14} className="text-[var(--mint-soft)]" />
                  <span className="text-xs text-[var(--text-secondary)]">
                    {t('rprac.added_words', lang, { n: wordsAdded })}
                    <Link href="/vocabulary" className="text-[var(--mint-soft)] underline mx-1">{t('rprac.my_vocab', lang)}</Link>
                  </span>
                </div>
              )}
            </div>
          )}

          <div className="flex gap-3 justify-center">
            <button
              onClick={startPractice}
              className="flex items-center gap-2 px-5 py-3 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
            >
              <RotateCcw size={16} />
              {t('rprac.practice_again', lang)}
            </button>
            <button
              onClick={() => setMode('browse')}
              className="flex items-center gap-2 px-5 py-3 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
            >
              {t('rprac.back_browse', lang)}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
