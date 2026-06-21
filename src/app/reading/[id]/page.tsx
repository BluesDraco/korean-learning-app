'use client';

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
import type { ArticleQuestion, ArticleWord } from '@/types';

type Step = 'goals' | 'vocab' | 'reading' | 'key_sentence' | 'quiz' | 'output' | 'settlement';

function hasBatchim(word: string): boolean {
  if (!word) return false;
  const lastChar = word[word.length - 1];
  const code = lastChar.charCodeAt(0);
  if (code < 0xAC00 || code > 0xD7A3) return false;
  return (code - 0xAC00) % 28 !== 0;
}

function resolveParticle(template: string, word: string): string {
  const batchim = hasBatchim(word);
  return template
    .replace('___', word)
    .replace('을/를', batchim ? '을' : '를')
    .replace('은/는', batchim ? '은' : '는')
    .replace('이/가', batchim ? '이' : '가');
}

export default function ArticleReaderPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  const article = readingArticles.find((a) => a.id === articleId);

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
  const [sentenceToast, setSentenceToast] = useState(false);
  const [outputDone, setOutputDone] = useState(false);
  const [selectedWord, setSelectedWord] = useState<ArticleWord | null>(null);
  const [activeHighlight, setActiveHighlight] = useState<string | null>(null);
  const sentenceRefs = useRef<Record<string, HTMLDivElement | null>>({});
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

  const handleFullTextClick = (sId: string) => {
    setActiveHighlight(sId);
    if (!revealedZh.has(sId)) toggleRevealZh(sId);
    setTimeout(() => {
      sentenceRefs.current[sId]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }, 50);
  };

  const toggleSaveSentence = async (sId: string) => {
    const wasSaved = savedSentences.has(sId);
    setSavedSentences((prev) => {
      const next = new Set(prev);
      if (next.has(sId)) next.delete(sId); else next.add(sId);
      return next;
    });
    feedbackClick();
    if (!wasSaved) { feedbackSuccess('已收藏句子'); setSentenceToast(true); setTimeout(() => setSentenceToast(false), 3000); }
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
              id: crypto.randomUUID(),
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
      {sentenceToast && (
        <div style={{ position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)', background: '#201815', color: '#fff', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 700, zIndex: 300, whiteSpace: 'nowrap', display: 'flex', alignItems: 'center', gap: 8 }}>
          已收藏句子
          <a href="/vocabulary?tab=sentences" style={{ color: '#aee3d8', fontSize: 12, fontWeight: 700, textDecoration: 'none' }}>查看 →</a>
        </div>
      )}
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
            </div>
          </div>

          <div className="flex gap-2">
            <button onClick={() => setStep('goals')} className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl font-medium text-sm">
              返回
            </button>
            <button
              onClick={() => setStep('reading')}
              className="flex-[2] flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
            >
              开始阅读 <ChevronRight size={18} />
            </button>
          </div>
        </div>
      )}

      {/* ── Step: Reading ── */}
      {step === 'reading' && (
        <div className="animate-fade-in space-y-4">
          {/* Progress bar */}
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <div className="flex-1 bg-[var(--bg-input)] rounded-full h-1.5">
              <div className="bg-[var(--mint-soft)] h-1.5 rounded-full transition-all"
                style={{ width: `${total > 0 ? (readCount / total) * 100 : 0}%` }} />
            </div>
            <span className="shrink-0 tabular-nums">已理解 {readCount} / {total} 句</span>
          </div>

          {/* Desktop: two-col; Mobile: single col */}
          <div className="md:grid md:grid-cols-[45%_55%] md:gap-6 md:items-start">

            {/* ── 左栏：文章正文 ── */}
            <div className="md:sticky md:top-20 mb-4 md:mb-0">
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
                {/* 文章头 */}
                <div className="px-5 pt-5 pb-4 border-b border-[var(--border-color)]">
                  <div className="flex items-center gap-3 mb-1">
                    <span className="text-2xl">{article.emoji}</span>
                    <div>
                      <h2 className="text-base font-bold text-[var(--text-primary)] leading-tight">{article.title}</h2>
                      <p className="text-xs text-[var(--text-muted)] mt-0.5">{article.titleKo}</p>
                    </div>
                  </div>
                </div>
                {/* 正文段落 */}
                <div className="px-5 py-4 space-y-0.5">
                  {article.sentences.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => handleFullTextClick(s.id)}
                      style={{
                        display: 'block',
                        width: '100%',
                        textAlign: 'left',
                        padding: '4px 8px',
                        borderRadius: 8,
                        fontSize: 16,
                        lineHeight: '1.85',
                        color: 'var(--text-primary)',
                        background: activeHighlight === s.id
                          ? 'rgba(168,216,208,0.13)'
                          : revealedZh.has(s.id)
                            ? 'var(--bg-input)'
                            : 'transparent',
                        transition: 'background 0.2s',
                        position: 'relative',
                        paddingRight: 20,
                      }}
                    >
                      {s.ko}
                      {revealedZh.has(s.id) && (
                        <span style={{
                          position: 'absolute', right: 6, top: '50%', transform: 'translateY(-50%)',
                          width: 6, height: 6, borderRadius: '50%',
                          background: 'var(--mint-soft)', display: 'inline-block',
                        }} />
                      )}
                    </button>
                  ))}
                </div>
                {/* 正文提示 */}
                <div className="px-5 pb-4 flex items-center gap-1.5">
                  <Lightbulb size={12} className="text-[var(--peach-soft)] shrink-0" />
                  <p className="text-[11px] text-[var(--text-muted)]">点击正文句子，在下方查看详细拆解</p>
                </div>
              </div>
            </div>

            {/* ── 右栏：逐句拆解 ── */}
            <div className="space-y-4">
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
                <div className="px-4 py-3 border-b border-[var(--border-color)] flex items-center gap-2">
                  <BookOpen size={14} className="text-[var(--mint-soft)]" />
                  <span className="text-sm font-bold text-[var(--text-primary)]">逐句拆解</span>
                  <span className="text-xs text-[var(--text-muted)] ml-auto">点击句子展开翻译</span>
                </div>
                <div className="divide-y divide-[var(--border-color)]">
                  {article.sentences.map((s, idx) => (
                    <div
                      key={s.id}
                      ref={(el) => { sentenceRefs.current[s.id] = el; }}
                      style={{
                        borderLeft: revealedZh.has(s.id) ? '3px solid var(--mint-soft)' : '3px solid transparent',
                        transition: 'border-color 0.2s',
                        background: activeHighlight === s.id ? 'var(--bg-input)' : undefined,
                      }}
                    >
                      {/* 句子行 */}
                      <div className="flex items-center gap-2 px-4 py-3">
                        <span style={{
                          width: 22, height: 22, borderRadius: '50%', flexShrink: 0,
                          background: revealedZh.has(s.id) ? 'var(--mint-soft)' : 'var(--bg-input)',
                          color: revealedZh.has(s.id) ? '#fff' : 'var(--text-muted)',
                          display: 'flex', alignItems: 'center', justifyContent: 'center',
                          fontSize: 10, fontWeight: 700, transition: 'all 0.2s',
                        }}>
                          {idx + 1}
                        </span>
                        <button
                          onClick={() => toggleRevealZh(s.id)}
                          className="flex-1 text-left text-sm leading-relaxed text-[var(--text-primary)]"
                        >
                          {s.ko}
                        </button>
                        <div className="flex items-center gap-0.5 shrink-0">
                          <button
                            onClick={() => speakSentence(s.id, s.ko)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              speakingId === s.id ? 'text-[var(--mint-soft)]' : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                            }`}
                          >
                            <Volume2 size={13} />
                          </button>
                          <button
                            onClick={() => toggleSaveSentence(s.id)}
                            className={`p-1.5 rounded-lg transition-colors ${
                              savedSentences.has(s.id) ? 'text-[var(--peach-soft)]' : 'text-[var(--text-muted)] hover:text-[var(--peach-soft)]'
                            }`}
                          >
                            <Bookmark size={13} fill={savedSentences.has(s.id) ? 'currentColor' : 'none'} />
                          </button>
                        </div>
                      </div>

                      {/* 展开：中文 + chips + 注音 */}
                      {revealedZh.has(s.id) && (
                        <div className="px-4 pb-3 pl-10 space-y-2 animate-fade-in">
                          <p className="text-sm text-[var(--text-secondary)] bg-[var(--bg-input)] rounded-lg px-3 py-2">
                            {s.zh}
                          </p>
                          {s.words.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {s.words.map((w) => (
                                <button
                                  key={w.word}
                                  onClick={() => setSelectedWord(w)}
                                  className={`text-xs px-2 py-1 rounded-full border transition-colors ${
                                    savedWords.has(w.word)
                                      ? 'bg-[var(--peach-soft)]/10 border-[var(--peach-soft)]/30 text-[var(--peach-soft)]'
                                      : 'bg-[var(--bg-input)] border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--text-placeholder)]'
                                  }`}
                                >
                                  {w.word} <span className="opacity-60">{w.meaning}</span>
                                </button>
                              ))}
                            </div>
                          )}
                          {s.pronunciation && (
                            <p className="text-xs text-[var(--text-muted)] font-mono">[{s.pronunciation}]</p>
                          )}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* 导航按钮 */}
              <div className="flex gap-2">
                <button onClick={() => {
                    if (revealedZh.size > 0) {
                      db.userArticleProgress.update(article.id, {
                        readSentenceIds: [...revealedZh],
                        updatedAt: Date.now(),
                      }).catch(() => {});
                    }
                    setStep('vocab');
                  }} className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-primary)] rounded-2xl font-medium text-sm">
                  返回词汇
                </button>
                <button
                  onClick={() => {
                    if (revealedZh.size > 0) {
                      db.userArticleProgress.update(article.id, {
                        readSentenceIds: [...revealedZh],
                        updatedAt: Date.now(),
                      }).catch(() => {});
                    }
                    setStep('key_sentence');
                  }}
                  className="flex-[2] flex items-center justify-center gap-2 py-3 bg-gradient-to-r from-[var(--mint-soft)] to-[var(--purple-soft)] text-white rounded-2xl font-bold text-sm"
                >
                  看重点句型 <ChevronRight size={18} />
                </button>
              </div>
            </div>
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
                setSelectedWord(null);
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
      {/* ── Word detail bottom drawer ── */}
      {selectedWord && (
        <>
          {/* Backdrop */}
          <div
            onClick={() => setSelectedWord(null)}
            style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.35)', zIndex: 200 }}
          />
          {/* Drawer */}
          <div style={{
            position: 'fixed', bottom: 0, left: 0, right: 0, zIndex: 201,
            background: 'var(--bg-card)', borderRadius: '20px 20px 0 0',
            padding: '20px 20px calc(env(safe-area-inset-bottom, 0px) + 20px)',
            boxShadow: '0 -4px 24px rgba(0,0,0,0.12)',
          }}>
            {/* Handle */}
            <div style={{ width: 36, height: 4, borderRadius: 2, background: 'var(--border-color)', margin: '0 auto 16px' }} />
            {/* Close */}
            <button
              onClick={() => setSelectedWord(null)}
              style={{ position: 'absolute', top: 16, right: 16, padding: 4, color: 'var(--text-muted)' }}
            >
              <X size={20} />
            </button>
            {/* Word */}
            <p style={{ fontSize: 28, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 2 }}>
              {selectedWord.word}
            </p>
            {selectedWord.pronunciation && (
              <p style={{ fontSize: 14, color: 'var(--text-muted)', fontFamily: 'monospace', marginBottom: 8 }}>
                [{selectedWord.pronunciation}]
              </p>
            )}
            <p style={{ fontSize: 16, color: 'var(--text-secondary)', marginBottom: 20 }}>
              {selectedWord.meaning}
            </p>
            {/* Actions */}
            <div style={{ display: 'flex', gap: 10 }}>
              <button
                onClick={() => speakWord(selectedWord.word)}
                style={{
                  flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '11px 0', borderRadius: 14, border: '1px solid var(--border-color)',
                  background: 'var(--bg-input)', fontSize: 14, color: 'var(--text-primary)', fontWeight: 600,
                }}
              >
                <Volume2 size={16} /> 朗读
              </button>
              <button
                onClick={() => { toggleSaveWord(selectedWord.word); setSelectedWord(null); }}
                style={{
                  flex: 2, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                  padding: '11px 0', borderRadius: 14, border: 'none',
                  background: savedWords.has(selectedWord.word) ? 'var(--peach-soft)' : 'var(--ink)',
                  color: '#fff', fontSize: 14, fontWeight: 700,
                }}
              >
                <Bookmark size={16} fill={savedWords.has(selectedWord.word) ? '#fff' : 'none'} />
                {savedWords.has(selectedWord.word) ? '已加入单词本' : '加入单词本'}
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
