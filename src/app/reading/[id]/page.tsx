import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { readingArticles } from '@/data/reading-new';
import { readingArticleMetadata, readingArticleJsonLd } from '@/lib/seo';
import ArticleReaderClient from './ArticleReaderClient';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Volume2, ChevronRight, Check, Sparkles,
  Trophy, BookOpen, Target, Lightbulb, Bookmark, Star, X,
} from 'lucide-react';
import { readingArticles, levelLabel, levelColor } from '@/data/reading-new';
import { speak, speakWord, cancelSpeech } from '@/lib/tts';
import { db, ensureFavoritesBook } from '@/lib/db';
import { awardXp, addStudyMinutes } from '@/lib/gamification';
import { useFeedback } from '@/hooks/useFeedback';
import type { ArticleQuestion } from '@/types';

type Step = 'goals' | 'vocab' | 'reading' | 'key_sentence' | 'quiz' | 'output' | 'settlement';

function hasBatchim(word: string): boolean {
  if (!word) return false;
  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return false;
  return (code - 0xAC00) % 28 !== 0;
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
  const { id } = await params;
  const article = readingArticles.find((a) => a.id === id);
  if (!article) return {};
  return readingArticleMetadata(article);
}

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const article = readingArticles.find((a) => a.id === id);
  if (!article) notFound();

  const [step, setStep] = useState<Step>('goals');
  const [revealedZh, setRevealedZh] = useState<Set<string>>(new Set());
  const [savedSentences, setSavedSentences] = useState<Set<string>>(new Set());
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswers, setQuizAnswers] = useState<Record<string, string>>({});
  const [quizRevealed, setQuizRevealed] = useState<Record<string, boolean>>({});
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [outputValue, setOutputValue] = useState('');
  const [outputDone, setOutputDone] = useState(false);
  const completedRef = useRef(false);
  const { success: feedbackSuccess, complete: feedbackComplete, click: feedbackClick } = useFeedback();

  const SESSION_KEY = `reading-progress-${articleId}`;

  // restore session progress on mount
  useEffect(() => {
    try {
      const saved = sessionStorage.getItem(SESSION_KEY);
      if (!saved) return;
      const { s, qi, qa, qr, qc } = JSON.parse(saved) as { s: Step; qi: number; qa: Record<string, string>; qr: Record<string, boolean>; qc: number };
      if (s && s !== 'goals' && s !== 'settlement') {
        setStep(s);
        setQuizIdx(qi ?? 0);
        setQuizAnswers(qa ?? {});
        setQuizRevealed(qr ?? {});
        setQuizCorrect(qc ?? 0);
      }
    } catch { /* ignore */ }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // persist step progress
  useEffect(() => {
    if (step === 'settlement') { try { sessionStorage.removeItem(SESSION_KEY); } catch { /* ignore */ } return; }
    try {
      sessionStorage.setItem(SESSION_KEY, JSON.stringify({ s: step, qi: quizIdx, qa: quizAnswers, qr: quizRevealed, qc: quizCorrect }));
    } catch { /* ignore */ }
  }, [step, quizIdx, quizAnswers, quizRevealed, quizCorrect]);

  useEffect(() => {
    if (!article || completedRef.current) return;
    // Record view event
    (async () => {
      try {
        const now = Date.now();
        await db.articleLearningEvents.put({
          id: crypto.randomUUID(), articleId: article.id,
          action: 'view_article', createdAt: now,
        });
        const existing = await db.userArticleProgress.get(article.id);
        if (!existing) {
          await db.userArticleProgress.put({
            id: article.id, articleId: article.id,
            status: 'reading', readSentenceIds: [],
            savedSentenceIds: [], savedWordIds: [],
            lastReadAt: now, createdAt: now, updatedAt: now,
          });
        } else {
          await db.userArticleProgress.update(article.id, {
            status: existing.status === 'completed' ? 'completed' : 'reading',
            lastReadAt: now, updatedAt: now,
          });
        }
      } catch {}
    })();
    return () => { cancelSpeech(); };
  }, [article]);

  // Auto-skip steps that have no data
  useEffect(() => {
    if (step === 'key_sentence' && article && !article.keySentence) {
      setStep('quiz');
    }
    if (step === 'output' && article && !article.outputTask) {
      handleComplete();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [step, article]);

  if (!article) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--text-secondary)]">文章未找到</p>
        <button onClick={() => router.push('/reading')} className="mt-3 text-sm text-[var(--pink-primary)] hover:underline">
          返回文章列表
        </button>
      </div>
    );
  }

  const speakSentence = async (sId: string, text: string) => {
    cancelSpeech();
    setSpeakingId(sId);
    try { await speak(text, 0.75); } catch {}
    setSpeakingId(null);
  };

  const toggleRevealZh = (sId: string) => {
    setRevealedZh((prev) => {
      const next = new Set(prev);
      if (next.has(sId)) next.delete(sId); else next.add(sId);
      return next;
    });
    db.articleLearningEvents.put({
      id: crypto.randomUUID(), articleId: article.id, sentenceId: sId,
      action: 'reveal_translation', createdAt: Date.now(),
    }).catch(() => {});
  };

  const toggleSaveSentence = async (sId: string) => {
    const wasSaved = savedSentences.has(sId);
    setSavedSentences((prev) => {
      const next = new Set(prev);
      if (next.has(sId)) next.delete(sId); else next.add(sId);
      return next;
    });
    feedbackClick();
    if (!wasSaved) feedbackSuccess('已收藏句子');
    try {
      const p = await db.userArticleProgress.get(article.id);
      const ids = new Set(p?.savedSentenceIds || []);
      if (ids.has(sId)) ids.delete(sId); else ids.add(sId);
      await db.userArticleProgress.update(article.id, {
        savedSentenceIds: [...ids], updatedAt: Date.now(),
      });
      // 同步写入 db.sentences，方便"我的句子"页面展示
      if (!wasSaved) {
        const sentence = article.sentences.find((s) => s.id === sId);
        if (sentence) {
          const existing = await db.sentences.where('korean').equals(sentence.ko).first().catch(() => null);
          if (!existing) {
            await db.sentences.add({
              korean: sentence.ko,
              chinese: sentence.zh ?? '',
              source_type: 'reading',
              source_id: article.id,
              source_title: article.title,
              created_at: new Date().toISOString(),
            });
          }
        }
      }
    } catch {}
  };

  const toggleSaveWord = async (word: string) => {
    const wasSaved = savedWords.has(word);
    setSavedWords((prev) => {
      const next = new Set(prev);
      if (next.has(word)) next.delete(word); else next.add(word);
      return next;
    });
    feedbackClick();
    if (!wasSaved) feedbackSuccess('已加入单词本');
    try {
      const p = await db.userArticleProgress.get(article.id);
      const ids = new Set(p?.savedWordIds || []);
      if (ids.has(word)) ids.delete(word); else ids.add(word);
      await db.userArticleProgress.update(article.id, {
        savedWordIds: [...ids], updatedAt: Date.now(),
      });
      // Also add to vocabulary
      const wordInfo = article.coreWords.find((w) => w.word === word)
        || article.sentences.flatMap((s) => s.words).find((w) => w.word === word);
      if (wordInfo) {
        const exists = await db.words.where('word').equals(word).first();
        let wordId: string;
        if (!exists) {
          wordId = crypto.randomUUID();
          await db.words.put({
            id: wordId, word: wordInfo.word,
            pronunciation: wordInfo.pronunciation || '', meaning: wordInfo.meaning,
            partOfSpeech: '单词', examples: [], source: 'reading',
            sourceDetail: article.title, mastery: 'new', srsLevel: 0,
            easeFactor: 2.5, interval: 0, nextReview: Date.now(),
            correctCount: 0, wrongCount: 0, createdAt: Date.now(), lastReviewed: null,
          });
        } else {
          wordId = exists.id;
        }
        // 加入收藏夹单词本
        if (!wasSaved) {
          const bookId = await ensureFavoritesBook();
          const book = await db.wordBooks.get(bookId);
          if (book && !book.wordIds.includes(wordId)) {
            await db.wordBooks.update(bookId, { wordIds: [...book.wordIds, wordId], updatedAt: Date.now() });
          }
        }
      }
    } catch {}
  };

  const handleQuizAnswer = (q: ArticleQuestion, answer: string) => {
    setQuizAnswers((prev) => ({ ...prev, [q.id]: answer }));
    if (answer === (q.options?.[q.answer] ?? '')) setQuizCorrect((prev) => prev + 1);
    setQuizRevealed((prev) => ({ ...prev, [q.id]: true }));
    db.articleLearningEvents.put({
      id: crypto.randomUUID(), articleId: article.id,
      action: 'answer_question', payload: { questionId: q.id, answer, correct: answer === (q.options?.[q.answer] ?? '') },
      createdAt: Date.now(),
    }).catch(() => {});
  };

  const handleOutputSubmit = () => {
    if (!outputValue.trim()) return;
    setOutputDone(true);
    db.articleLearningEvents.put({
      id: crypto.randomUUID(), articleId: article.id,
      action: 'complete_output', payload: { answer: outputValue },
      createdAt: Date.now(),
    }).catch(() => {});
  };

  const handleComplete = async () => {
    try {
      const now = Date.now();
      const score = article.questions.length > 0
        ? Math.round((quizCorrect / article.questions.length) * 100) : 0;
      await db.userArticleProgress.update(article.id, {
        status: 'completed', quizScore: score,
        outputAnswer: outputValue || undefined,
        completedAt: now, updatedAt: now,
      });
      await db.articleLearningEvents.put({
        id: crypto.randomUUID(), articleId: article.id,
        action: 'complete_article', payload: { quizScore: score },
        createdAt: now,
      });
      awardXp(10);
      addStudyMinutes(article.estimatedMinutes);
    } catch {}
    feedbackComplete('阅读完成!');
    setStep('settlement');
  };

  const progressPct = (() => {
    const steps: Step[] = ['goals', 'vocab', 'reading', 'key_sentence', 'quiz', 'output', 'settlement'];
    return ((steps.indexOf(step)) / (steps.length - 1)) * 100;
  })();

  const total = article.sentences.length;
  const readCount = revealedZh.size;

  return (
    <div className="py-4 space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button onClick={() => {
          if (step !== 'goals' && !confirm('确定退出？当前进度不会保存')) return;
          router.push('/reading');
        }} className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={16} /> 文章列表
        </button>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[article.level]}`}>
          {levelLabel[article.level]} · {article.estimatedMinutes}分钟
        </span>
      </div>

      {/* Step progress */}
      <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
        <div className="bg-[var(--mint-soft)] h-1.5 rounded-full transition-all" style={{ width: `${progressPct}%` }} />
      </div>

      {/* ── Step: Goals ── */}
      {step === 'goals' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl bg-[var(--mint-soft)]/10 flex items-center justify-center text-3xl">
                {article.emoji}
              </div>
              <div>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">{article.title}</h1>
                <p className="text-sm text-[var(--text-muted)]">{article.titleKo}</p>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs text-[var(--text-muted)] flex items-center gap-1.5">
                <Target size={14} className="text-[var(--mint-soft)]" />
                这篇文章你会学会：
              </p>
              {article.learningGoals.map((g, i) => (
                <div key={i} className="flex items-center gap-2 text-sm text-[var(--text-secondary)] bg-[var(--bg-input)] rounded-xl p-3">
                  <span className="w-6 h-6 rounded-lg bg-[var(--mint-soft)]/15 text-[var(--mint-soft)] flex items-center justify-center text-xs font-bold">
                    {i + 1}
                  </span>
                  {g}
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={() => setStep('vocab')}
            className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-all"
          >
            开始预习词汇 <ChevronRight size={18} />
          </button>
        </div>
      )}

      {/* ── Step: Vocab ── */}
      {step === 'vocab' && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
            <p className="text-sm font-bold text-[var(--text-primary)] mb-1 flex items-center gap-2">
              <BookOpen size={16} className="text-[var(--mint-soft)]" />
              核心词汇 · 读前预热
            </p>
            <p className="text-xs text-[var(--text-muted)] mb-4">
              先认识这 {article.coreWords.length} 个词，阅读时会轻松很多
            </p>

            <div className="space-y-2">
              {article.coreWords.map((w) => (
                <div key={w.word} className="flex items-center gap-3 bg-[var(--bg-input)] rounded-xl p-3">
                  <button
                    onClick={() => { cancelSpeech(); setSpeakingId(`vocab-${w.word}`); speakWord(w.word).finally(() => setSpeakingId(null)); }}
                    className={`p-2 rounded-lg transition-colors ${
                      speakingId === `vocab-${w.word}`
                        ? 'bg-[var(--mint-soft)]/20 text-[var(--mint-soft)]'
                        : 'hover:bg-[var(--bg-accent)] text-[var(--text-muted)]'
                    }`}
                  >
                    <Volume2 size={16} />
                  </button>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-[var(--text-primary)]">{w.word}</p>
                    {w.pronunciation && (
                      <p className="text-xs text-[var(--text-muted)] font-mono">[{w.pronunciation}]</p>
                    )}
                  </div>
                  <span className="text-xs text-[var(--text-secondary)]">{w.meaning}</span>
                  <button
                    onClick={() => toggleSaveWord(w.word)}
                    className={`p-1.5 rounded-lg transition-colors ${
                      savedWords.has(w.word) ? 'text-[var(--peach-soft)]' : 'text-[var(--text-muted)] hover:text-[var(--peach-soft)]'
                    }`}
                  >
                    <Bookmark size={14} fill={savedWords.has(w.word) ? 'currentColor' : 'none'} />
                  </button>
                </div>
              ))}
            </ul>
          </>
        )}
        {article.sentences.length > 0 && (
          <>
            <h2>文章正文（摘录）</h2>
            {article.sentences.slice(0, 6).map((s) => (
              <p key={s.id}>{s.ko}｜{s.zh}</p>
            ))}
          </div>

          {/* Tip */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 flex items-start gap-2">
            <Lightbulb size={14} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
            <p className="text-xs text-[var(--text-muted)]">
              点击韩语句子可以查看中文翻译。点小喇叭听发音，点书签收藏句子。
            </p>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setStep('vocab')} className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl font-medium text-sm">
              返回词汇
            </button>
            <button
              onClick={() => setStep('key_sentence')}
              className="flex-[2] flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
            >
              看重点句型 <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step: Key Sentence ── auto-skip if no data */}
      {step === 'key_sentence' && !article.keySentence && (
        <div className="py-8 text-center">
          <p className="text-sm text-[var(--text-muted)] mb-4">暂无重点句型</p>
          <button
            onClick={() => setStep('quiz')}
            className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
          >
            继续做理解检测 <ChevronRight size={18} />
          </button>
        </div>
      )}
      {step === 'key_sentence' && article.keySentence && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-[var(--bg-card)] border-2 border-[var(--mint-soft)]/20 rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Star size={18} className="text-[var(--peach-soft)]" />
              <span className="text-sm font-bold text-[var(--text-primary)]">重点句型</span>
            </div>

            <div>
              <p className="text-xl font-bold text-[var(--text-primary)] leading-relaxed">
                {article.keySentence.ko}
              </p>
              <p className="text-sm text-[var(--text-secondary)] mt-2">{article.keySentence.zh}</p>
            </div>

            <div className="bg-[var(--bg-input)] rounded-xl p-4">
              <p className="text-xs text-[var(--text-muted)] mb-1">语法解析</p>
              <p className="text-sm text-[var(--text-secondary)] leading-relaxed">
                {article.keySentence.grammarNote}
              </p>
            </div>

            <button
              onClick={() => speakSentence('key', article.keySentence!.ko)}
              className={`flex items-center gap-2 text-sm transition-colors ${
                speakingId === 'key' ? 'text-[var(--mint-soft)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Volume2 size={16} />
              {speakingId === 'key' ? '正在播放...' : '再听一遍'}
            </button>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setStep('reading')} className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl font-medium text-sm">
              返回阅读
            </button>
            <button
              onClick={() => setStep('quiz')}
              className="flex-[2] flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
            >
              做理解检测 <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step: Quiz ── */}
      {step === 'quiz' && article.questions.length === 0 && (
        <div className="py-8 text-center space-y-4 animate-fade-in">
          <p className="text-sm text-[var(--text-muted)]">暂无理解检测题</p>
          <button
            onClick={() => setStep('output')}
            className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
          >
            继续输出练习 <ChevronRight size={18} />
          </button>
        </div>
      )}
      {step === 'quiz' && article.questions.length > 0 && (
        <div className="space-y-4 animate-fade-in">
          <div className="flex items-center justify-between text-sm">
            <span className="font-bold text-[var(--text-primary)]">理解检测</span>
            <span className="text-[var(--text-muted)]">{quizIdx + 1}/{article.questions.length}</span>
          </div>

          <div className="w-full bg-[var(--bg-input)] rounded-full h-1">
            <div className="bg-[var(--mint-soft)] h-1 rounded-full transition-all"
              style={{ width: `${((quizIdx + 1) / article.questions.length) * 100}%` }} />
          </div>

          {article.questions.map((q, i) => (
            <div key={q.id} className={i === quizIdx ? '' : 'hidden'}>
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)]">
                    {q.type === 'main_idea' ? '主旨' : q.type === 'vocab' ? '词汇' : q.type === 'grammar' ? '语法' : '细节'}
                  </span>
                  <p className="text-sm font-bold text-[var(--text-primary)]">{q.prompt}</p>
                </div>

                <div className="space-y-2">
                  {q.options?.map((opt) => {
                    const isAnswered = quizAnswers[q.id];
                    const isSelected = isAnswered === opt;
                    const isCorrect = opt === (q.options?.[q.answer] ?? '');
                    let btnClass = 'bg-[var(--bg-input)] border border-[var(--border-color)] hover:border-[var(--border-hover)]';
                    if (isAnswered && quizRevealed[q.id]) {
                      if (isCorrect) btnClass = 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]';
                      else if (isSelected) btnClass = 'bg-red-500/10 border-red-500/50 text-red-500';
                      else btnClass = 'bg-[var(--bg-input)] border-[var(--border-color)] opacity-50';
                    }
                    return (
                      <button
                        key={opt}
                        onClick={() => { if (!quizAnswers[q.id]) handleQuizAnswer(q, opt); }}
                        disabled={!!quizAnswers[q.id]}
                        className={`w-full p-3.5 rounded-xl text-left text-sm transition-all ${btnClass} flex items-center justify-between`}
                      >
                        <span>{opt}</span>
                        {isAnswered && quizRevealed[q.id] && isCorrect && <Check size={16} className="text-[var(--mint-soft)]" />}
                        {isAnswered && quizRevealed[q.id] && isSelected && !isCorrect && <X size={16} className="text-red-500" />}
                      </button>
                    );
                  })}
                </div>

                {quizAnswers[q.id] && quizRevealed[q.id] && (
                  <div className="bg-[var(--bg-input)] rounded-xl p-3 animate-fade-in">
                    <p className="text-xs text-[var(--text-muted)] mb-0.5">解释</p>
                    <p className="text-xs text-[var(--text-secondary)]">{q.explanation}</p>
                  </div>
                )}
              </div>

              {quizAnswers[q.id] && quizRevealed[q.id] && (
                <button
                  onClick={() => {
                    if (quizIdx + 1 >= article.questions.length) setStep('output');
                    else setQuizIdx((prev) => prev + 1);
                  }}
                  className="w-full mt-3 flex items-center justify-center gap-2 py-3.5 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
                >
                  {quizIdx + 1 >= article.questions.length ? '进入输出练习' : '下一题'}
                  <ChevronRight size={18} />
                </button>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ── Step: Output ── auto-skip if no data */}
      {step === 'output' && !article.outputTask && (
        <div className="py-8 text-center">
          <p className="text-sm text-[var(--text-muted)] mb-4">暂无输出练习</p>
          <button
            onClick={handleComplete}
            className="flex items-center justify-center gap-2 mx-auto px-6 py-3 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
          >
            完成阅读 <Trophy size={18} />
          </button>
        </div>
      )}
      {step === 'output' && article.outputTask && (
        <div className="space-y-4 animate-fade-in">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles size={18} className="text-[var(--peach-soft)]" />
              <span className="text-sm font-bold text-[var(--text-primary)]">输出练习</span>
            </div>

            <p className="text-sm text-[var(--text-secondary)]">
              用今天学的句型完成一句话
            </p>

            <div className="bg-[var(--bg-input)] rounded-xl p-4">
              <p className="text-sm text-[var(--text-muted)] mb-3">句型模板</p>
              <p className="text-lg font-bold text-[var(--text-primary)] mb-3">{article.outputTask.template}</p>
              {article.outputTask.example && (
                <p className="text-xs text-[var(--text-muted)] mb-3">例：{article.outputTask.example}</p>
              )}

              {article.outputTask.slots && (
                <div className="flex flex-wrap gap-2 mb-4">
                  {article.outputTask.slots.map((slot) => (
                    <button
                      key={slot}
                      onClick={() => setOutputValue((prev) => prev ? '' : resolveParticle(article.outputTask!.template, slot))}
                      className={`text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                        outputValue.includes(slot)
                          ? 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]'
                          : 'bg-[var(--bg-card)] border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              )}

              <input
                type="text"
                value={outputValue}
                onChange={(e) => setOutputValue(e.target.value)}
                onFocus={(e) => setTimeout(() => e.target.scrollIntoView({ behavior: 'smooth', block: 'center' }), 300)}
                placeholder="用句型写一句韩语……"
                className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-3 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)] focus:outline-none focus:border-[var(--mint-soft)]/50"
              />
            </div>

            {outputDone && (
              <div className="bg-[var(--mint-soft)]/15 border border-[var(--mint-soft)]/30 rounded-xl p-4 text-center animate-fade-in">
                <Check size={18} className="text-[var(--mint-soft)] mx-auto mb-1.5" />
                <p className="text-sm font-medium text-[var(--mint-soft)]">已提交</p>
                <p className="text-base font-bold text-[var(--text-primary)] mt-1">{outputValue}</p>
              </div>
            )}
          </div>

          {!outputDone ? (
            <button
              onClick={handleOutputSubmit}
              disabled={!outputValue.trim()}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm disabled:opacity-50 active:scale-[0.97] transition-all"
            >
              确认输出 <ChevronRight size={18} />
            </button>
          ) : (
            <button
              onClick={handleComplete}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-all"
            >
              完成输出 <Trophy size={18} />
            </button>
          )}
        </div>
      )}

      {/* ── Step: Settlement ── */}
      {step === 'settlement' && (
        <div className="py-6 space-y-6 animate-fade-in text-center">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[var(--mint-soft)]/20 to-[var(--purple-soft)]/20 flex items-center justify-center mx-auto border-2 border-[var(--mint-soft)]/30">
            <Trophy size={36} className="text-[var(--peach-soft)]" />
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">阅读完成！</h2>
            <p className="text-sm text-[var(--text-secondary)] mt-1">
              你读完了《{article.title}》
            </p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">核心词汇</span>
              <span className="text-[var(--text-primary)] font-bold">{article.coreWords.length} 个</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">阅读理解</span>
              <span className="text-[var(--text-primary)] font-bold">
                {quizCorrect}/{article.questions.length} 正确
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--text-muted)]">收藏句子</span>
              <span className="text-[var(--text-primary)] font-bold">{savedSentences.size} 句</span>
            </div>
            {outputValue && (
              <div className="flex justify-between">
                <span className="text-[var(--text-muted)]">你的句子</span>
                <span className="text-[var(--mint-soft)] font-bold text-xs max-w-[200px] truncate">{outputValue}</span>
              </div>
            )}
          </div>

          <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-3">
            <div className="flex items-center gap-2 justify-center">
              <Sparkles size={16} className="text-[var(--mint-soft)]" />
              <span className="text-sm text-[var(--text-primary)]">+10 XP</span>
            </div>
          </div>

          <div className="space-y-2">
            <button
              onClick={() => router.push('/reading')}
              className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-all"
            >
              继续阅读更多文章 <BookOpen size={18} />
            </button>
            <button
              onClick={() => {
                setRevealedZh(new Set());
                setQuizIdx(0);
                setQuizAnswers({});
                setQuizRevealed({});
                setQuizCorrect(0);
                setOutputValue('');
                setOutputDone(false);
                setStep('goals');
              }}
              className="w-full py-3 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl font-medium text-sm"
            >
              重读这篇文章
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
