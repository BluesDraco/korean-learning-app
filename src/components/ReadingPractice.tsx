'use client';

import { useState, useRef, useEffect } from 'react';
import { Volume2, Eye, EyeOff, ArrowRight, RotateCcw, Trophy, Sparkles, BookOpen } from 'lucide-react';
import { speak, speakWord } from '@/lib/tts';
import { emitXpFlyout } from '@/components/XpOverlay';
import { db } from '@/lib/db';
import Link from 'next/link';

interface ReadingWord {
  korean: string;
  pronunciation: string;
  meaning: string;
}

interface ProgressiveStep {
  id: string;
  title: string;
  titleKo: string;
  emoji: string;
  description: string;
}

export default function ReadingPractice({ words, step }: { words: ReadingWord[]; step: ProgressiveStep }) {
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
            partOfSpeech: '单词',
            examples: [],
            source: 'phonetics',
            sourceDetail: '四十音综合拼读',
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
          {words.length} 个单词
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
                  {sylCount === 1 ? '单音节' : sylCount === 2 ? '双音节' : '多音节'}
                  <span className="text-[var(--text-placeholder)]">({sectionWords.length}个)</span>
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
                            onClick={() => speakWord(w.korean, 0.7)}
                            className="text-2xl font-extrabold text-[var(--text-primary)] hover:text-[var(--pink-primary)] transition-colors"
                            style={{ fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" }}
                            title="点击听发音"
                          >
                            {w.korean}
                          </button>
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => speakWord(w.korean, 0.7)}
                              className="p-1.5 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                              title="听发音"
                            >
                              <Volume2 size={14} />
                            </button>
                            <button
                              onClick={() => toggleReveal(globalIdx)}
                              className="p-1.5 rounded-lg hover:bg-[var(--bg-accent)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                              title={isRevealed ? '隐藏含义' : '显示含义'}
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
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-all font-bold text-sm hover:shadow-lg hover:shadow-[var(--pink-primary)]/25 active:scale-[0.98]"
          >
            开始拼读练习（闪卡模式）
            <ArrowRight size={18} />
          </button>

          <p className="text-xs text-center text-[var(--text-muted)]">
            先浏览单词熟悉发音，然后进入闪卡模式：看到词 → 自己尝试读 → 听发音验证 → 自评
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
              ← 返回浏览
            </button>
            <span className="text-sm font-medium text-[var(--text-primary)]">
              闪卡 {practiceIdx + 1}/{words.length}
            </span>
            <span className="text-xs text-[var(--text-muted)]">正确: {practiceCorrect}</span>
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
              先试着读出这个词，然后点下面的按钮听正确发音
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
              onClick={() => speakWord(words[practiceIdx].korean, 0.7)}
              className="inline-flex items-center gap-2 px-8 py-4 bg-[var(--pink-primary)]/10 border-2 border-[var(--pink-primary)]/30 rounded-3xl hover:bg-[var(--pink-primary)]/20 transition-colors"
            >
              <Volume2 size={24} className="text-[var(--pink-primary)]" />
              <span className="text-sm font-bold text-[var(--pink-primary)]">听正确发音</span>
            </button>

            {/* Meaning reveal */}
            <div className="bg-[var(--bg-input)] rounded-2xl p-4">
              <p className="text-xs text-[var(--text-muted)] mb-1">含义</p>
              <p className="text-base font-medium text-[var(--text-primary)]">{words[practiceIdx].meaning}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">[{words[practiceIdx].pronunciation}]</p>
            </div>

            {/* Self evaluation */}
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-3">你读对了吗？</p>
              <div className="flex gap-3 justify-center">
                <button
                  onClick={() => handleSelfEval(true)}
                  className="flex items-center gap-2 px-6 py-3 bg-[var(--mint-soft)]/15 border border-[var(--mint-soft)]/30 text-[var(--text-primary)] rounded-2xl text-sm font-bold hover:bg-[var(--mint-soft)]/25 transition-colors active:scale-95"
                >
                  读对了 ✓
                </button>
                <button
                  onClick={() => handleSelfEval(false)}
                  className="flex items-center gap-2 px-6 py-3 bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-secondary)] rounded-2xl text-sm font-medium hover:bg-[var(--bg-accent)] transition-colors active:scale-95"
                >
                  还不太准
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
                ? '拼读练习完成！'
                : '再练一次？'}
            </h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              自评正确 {practiceCorrect}/{practiceTotal}
              （{Math.round((practiceCorrect / practiceTotal) * 100)}%）
            </p>
            <p className="text-xs text-[var(--text-muted)] mt-2">
              现在你已经能认出 {words.length} 个韩文单词了！
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
                    已将 {wordsAdded} 个新单词加入
                    <Link href="/vocabulary" className="text-[var(--mint-soft)] underline mx-1">我的词库</Link>
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
              重新练习
            </button>
            <button
              onClick={() => setMode('browse')}
              className="flex items-center gap-2 px-5 py-3 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
            >
              返回浏览
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
