'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  GraduationCap, ArrowRight, ArrowLeft, Check, X, Loader2, Sparkles,
  Star, Zap, BookOpen, Lightbulb, Volume2, Trophy, Lock, ChevronRight,
  Play, Award,
} from 'lucide-react';
import { db } from '@/lib/db';
import { getProfile, updateStreak, awardXp, XP_REWARDS, addStudyMinutes, updateProfile } from '@/lib/gamification';
import { learningUnits, TOTAL_UNITS } from '@/data/learningUnits';
import { grammarPoints } from '@/data/grammar';
import { emitXpFlyout, emitStreakMilestone } from '@/components/XpOverlay';
import type { Word, UserProfile } from '@/types';
import type { LearningUnit } from '@/data/learningUnits';

type PagePhase = 'select' | 'intro' | 'vocab' | 'grammar' | 'quiz' | 'complete';

export default function LearnPage() {
  const [phase, setPhase] = useState<PagePhase>('select');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<LearningUnit | null>(null);
  const [vocabIdx, setVocabIdx] = useState(0);
  const [grammarExpanded, setGrammarExpanded] = useState(false);
  const [quizIdx, setQuizIdx] = useState(0);
  const [quizAnswer, setQuizAnswer] = useState<number | null>(null);
  const [quizCorrect, setQuizCorrect] = useState(0);
  const [lessonXp, setLessonXp] = useState(0);
  const [leveledUp, setLeveledUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [quizQuestions, setQuizQuestions] = useState<{
    question: string;
    options: string[];
    correct: number;
  }[]>([]);

  useEffect(() => {
    getProfile().then((p) => {
      setProfile(p);
      setLoading(false);
    });
  }, []);

  const startUnit = useCallback(async (unit: LearningUnit) => {
    setSelectedUnit(unit);
    // Save words to DB if not already present
    const existingWords = await db.words.toArray();
    const existingSet = new Set(existingWords.map((w) => w.word));

    for (const kw of unit.words) {
      if (!existingSet.has(kw.word)) {
        const newWord: Word = {
          id: crypto.randomUUID(),
          word: kw.word,
          pronunciation: kw.pronunciation,
          meaning: kw.meaning,
          partOfSpeech: kw.partOfSpeech,
          examples: kw.example ? [{ text: kw.example, translation: kw.exampleZh, source: 'dictionary' }] : [],
          mastery: 'new',
          srsLevel: 0,
          easeFactor: 2.5,
          interval: 0,
          createdAt: Date.now(),
          lastReviewed: null,
          nextReview: Date.now(),
        };
        await db.words.put(newWord);
        const { leveledUp, newLevel: nl } = await awardXp(XP_REWARDS.wordLearned);
        setLessonXp((prev) => prev + XP_REWARDS.wordLearned);
        if (leveledUp) { setLeveledUp(true); setNewLevel(nl); }
      }
    }

    // Generate quiz questions
    const grammar = grammarPoints.find((g) => g.id === unit.grammarId) || grammarPoints[0];

    // Helper: build 4-option shuffled quiz item, returns {options, correctIndex}
    function buildQuizItem(correctText: string, distractors: string[]): { options: string[]; correct: number } {
      const items: { text: string; isCorrect: boolean }[] = [
        { text: correctText, isCorrect: true },
        ...distractors.slice(0, 3).map((t) => ({ text: t, isCorrect: false })),
      ];
      const shuffled = shuffleArray(items);
      const idx = shuffled.findIndex((item) => item.isCorrect);
      return {
        options: shuffled.map((item) => item.text),
        correct: idx >= 0 ? idx : 0,
      };
    }

    // Q1: word meaning (word[0])
    const q1 = buildQuizItem(unit.words[0].meaning, [
      unit.words[1]?.meaning || '香蕉',
      unit.words[2]?.meaning || '跑步',
      unit.words[3]?.meaning || '红色',
    ]);

    // Q2: pronunciation (word[1])
    const q2 = buildQuizItem(unit.words[1].pronunciation, [
      unit.words[0].pronunciation,
      unit.words[3]?.pronunciation || 'sagwa',
      unit.words[4]?.pronunciation || 'haksaeng',
    ]);

    // Q3: grammar usage — match pattern to its description
    const otherGrammars = shuffleArray(grammarPoints.filter((g) => g.id !== grammar.id));
    const q3 = buildQuizItem(grammar.usage, otherGrammars.slice(0, 3).map((g) => g.usage));

    const questions = [
      {
        question: `"${unit.words[0].word}" 的中文意思是？`,
        options: q1.options,
        correct: q1.correct,
      },
      {
        question: `"${unit.words[1].word}" 的发音是？`,
        options: q2.options,
        correct: q2.correct,
      },
      {
        question: `"${grammar.pattern}" 的用法是？`,
        options: q3.options,
        correct: q3.correct,
      },
    ];
    setQuizQuestions(questions);
    setPhase('intro');
  }, []);

  const handleQuizAnswer = (idx: number) => {
    setQuizAnswer(idx);
    const correct = idx === quizQuestions[quizIdx].correct;
    if (correct) setQuizCorrect((prev) => prev + 1);
  };

  const handleQuizNext = async () => {
    if (quizIdx + 1 >= quizQuestions.length) {
      const streakResult = await updateStreak();
      if (streakResult.isMilestone) { emitStreakMilestone(streakResult.milestone); }
      await addStudyMinutes(10);
      const { leveledUp: didLevelUp, newLevel: nl } = await awardXp(XP_REWARDS.dailyLessonComplete);
      setLessonXp((prev) => prev + XP_REWARDS.dailyLessonComplete);
      if (didLevelUp) { setLeveledUp(true); setNewLevel(nl); window.dispatchEvent(new CustomEvent('level-up', { detail: { level: nl } })); }
      emitXpFlyout(XP_REWARDS.dailyLessonComplete);

      // Advance to next unit
      if (selectedUnit && profile && selectedUnit.id >= profile.currentUnit) {
        const nextUnit = selectedUnit.id + 1;
        await updateProfile({ currentUnit: Math.min(nextUnit, TOTAL_UNITS) });
        setProfile((prev) => prev ? { ...prev, currentUnit: Math.min(nextUnit, TOTAL_UNITS) } : prev);
      }

      fetch('/api/track/study', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'learn_word', details: `学习单元: ${selectedUnit?.title || 'unknown'}`, xpEarned: lessonXp + XP_REWARDS.dailyLessonComplete }) }).catch(() => {});
      setPhase('complete');
    } else {
      setQuizIdx(quizIdx + 1);
      setQuizAnswer(null);
    }
  };

  // ============ LOADING ============
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!profile) return null;

  const grammar = selectedUnit ? grammarPoints.find((g) => g.id === selectedUnit.grammarId) || grammarPoints[0] : null;

  // ============ UNIT SELECTION ============
  if (phase === 'select') {
    return (
      <div className="py-4 space-y-4">
        <div className="flex items-center gap-2 text-xs text-[var(--text-placeholder)] mb-1">
          <span className="animate-float">📚</span>
          <span className="animate-float">🎀</span>
          <span className="text-[13px] ml-1">单元制学习 · 循序渐进</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">每日学习</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            共 {TOTAL_UNITS} 个单元 · 当前进度: 第 {profile.currentUnit} 单元
          </p>
        </div>

        {/* Progress overview */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs text-[var(--text-secondary)]">学习进度</span>
            <span className="text-xs text-[var(--text-muted)]">{profile.currentUnit - 1}/{TOTAL_UNITS} 已完成</span>
          </div>
          <div className="w-full bg-[var(--bg-input)] rounded-full h-2">
            <div
              className="h-2 rounded-full bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] transition-all"
              style={{ width: `${((profile.currentUnit - 1) / TOTAL_UNITS) * 100}%` }}
            />
          </div>
        </div>

        {/* Unit Grid */}
        <div>
          <h2 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-3">选择单元</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {learningUnits.map((unit) => {
              const isCompleted = unit.id < profile.currentUnit;
              const isCurrent = unit.id === profile.currentUnit;
              const isLocked = unit.id > profile.currentUnit;

              return (
                <button
                  key={unit.id}
                  onClick={() => !isLocked && startUnit(unit)}
                  disabled={isLocked}
                  className={`text-left rounded-2xl p-4 border transition-all ${
                    isLocked
                      ? 'bg-[var(--bg-input)] border-[var(--border-color)] opacity-50 cursor-not-allowed'
                      : isCurrent
                        ? 'bg-gradient-to-br from-[var(--purple-soft)]/10 to-[var(--pink-primary)]/10 border-[var(--purple-soft)]/30 hover:border-[var(--purple-soft)]/50 hover:shadow-md cursor-pointer'
                        : isCompleted
                          ? 'bg-[var(--mint-soft)]/5 border-[var(--mint-soft)]/20 hover:border-[var(--mint-soft)]/40 cursor-pointer'
                          : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--border-hover)] cursor-pointer'
                  }`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-lg">{unit.emoji}</span>
                      <div>
                        <div className="text-sm font-medium text-[var(--text-primary)]">
                          Unit {unit.id}
                        </div>
                        <div className="text-[13px] text-[var(--text-muted)]">
                          {unit.level === 'beginner' ? '初级' : unit.level === 'intermediate' ? '中级' : '高级'}
                        </div>
                      </div>
                    </div>
                    {isCompleted && <Check size={18} className="text-[var(--mint-soft)] shrink-0" />}
                    {isCurrent && <Play size={18} className="text-[var(--purple-soft)] shrink-0" />}
                    {isLocked && <Lock size={16} className="text-[var(--text-placeholder)] shrink-0" />}
                  </div>
                  <div className="text-xs text-[var(--text-primary)] font-medium mb-0.5">{unit.title}</div>
                  <div className="text-[13px] text-[var(--text-muted)]">{unit.titleKo}</div>
                  <div className="text-[13px] text-[var(--text-secondary)] mt-1 line-clamp-1">{unit.description}</div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Quick jump to current unit */}
        <div className="flex justify-center">
          <button
            onClick={() => {
              const currentUnit = learningUnits.find((u) => u.id === profile.currentUnit);
              if (currentUnit) startUnit(currentUnit);
            }}
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] hover:from-[var(--purple-soft)] hover:to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-all text-base font-medium shadow-lg shadow-[var(--purple-soft)]/20 active:scale-95"
          >
            继续学习第 {profile.currentUnit} 单元
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  if (!selectedUnit || !grammar) return null;
  const { words } = selectedUnit;

  // ============ INTRO PHASE ============
  if (phase === 'intro') {
    return (
      <div className="py-6 max-w-2xl mx-auto">
        <div className="text-center py-8 space-y-6">
          <button
            onClick={() => setPhase('select')}
            className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
          >
            <ArrowLeft size={20} />
          </button>

          <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[var(--purple-soft)]/20 to-[var(--pink-primary)]/20 flex items-center justify-center mx-auto border border-[var(--purple-soft)]/20">
            <span className="text-4xl">{selectedUnit.emoji}</span>
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">
              Unit {selectedUnit.id}: {selectedUnit.title}
            </h1>
            <p className="text-[var(--text-secondary)] mt-1">{selectedUnit.titleKo}</p>
            <p className="text-[var(--text-muted)] text-sm mt-2">{selectedUnit.description}</p>
          </div>

          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 text-left space-y-3">
            <div className="flex items-center gap-3">
              <BookOpen size={18} className="text-[var(--pink-primary)]" />
              <span className="text-sm text-[var(--text-primary)]">学习 {words.length} 个新单词</span>
            </div>
            <div className="flex items-center gap-3">
              <Lightbulb size={18} className="text-[var(--peach-soft)]" />
              <span className="text-sm text-[var(--text-primary)]">掌握 1 个语法点: {grammar.title}</span>
            </div>
            <div className="flex items-center gap-3">
              <Award size={18} className="text-[var(--purple-soft)]" />
              <span className="text-sm text-[var(--text-primary)]">完成小测验获得 XP 奖励</span>
            </div>
          </div>

          {/* Word preview */}
          <div className="space-y-2">
            <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider text-left">本单元词汇</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {words.map((w, i) => (
                <span key={i} className="inline-flex items-center gap-1 px-3 py-1.5 bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl text-xs">
                  <span>{w.emoji}</span>
                  <span className="text-[var(--text-primary)] font-medium">{w.word}</span>
                  <span className="text-[var(--text-muted)]">{w.meaning}</span>
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setPhase('vocab')}
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] hover:from-[var(--purple-soft)] hover:to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-all text-base font-medium mx-auto shadow-lg shadow-[var(--purple-soft)]/20 active:scale-95"
          >
            开始学习
            <ArrowRight size={18} />
          </button>
        </div>
      </div>
    );
  }

  // ============ VOCAB PHASE ============
  if (phase === 'vocab') {
    const currentWord = words[vocabIdx];
    return (
      <div className="py-6 max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => setPhase('intro')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm text-[var(--text-muted)]">单词 {vocabIdx + 1}/{words.length}</span>
          <button
            onClick={() => { setVocabIdx(0); setPhase('grammar'); }}
            className="text-xs text-[var(--pink-primary)] hover:text-[var(--pink-primary)]"
          >
            跳过
          </button>
        </div>

        <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
          <div
            className="bg-[var(--purple-soft)] h-1.5 rounded-full transition-all"
            style={{ width: `${((vocabIdx + 1) / words.length) * 100}%` }}
          />
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 text-center space-y-6">
          <div className="text-6xl">{currentWord.emoji}</div>
          <div>
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-2">{currentWord.word}</h2>
            <p className="text-[var(--text-secondary)] text-lg">{currentWord.pronunciation}</p>
          </div>
          <div className="bg-[var(--bg-input)] rounded-2xl p-5">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-accent)] text-[var(--text-primary)]">
                {currentWord.partOfSpeech}
              </span>
            </div>
            <p className="text-[var(--text-primary)] text-xl font-medium">{currentWord.meaning}</p>
            {currentWord.note && (
              <div className="flex items-start gap-2 mt-3 bg-[var(--peach-soft)]/10 rounded-xl p-3 text-left">
                <Lightbulb size={16} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                <p className="text-[var(--text-primary)] text-sm">{currentWord.note}</p>
              </div>
            )}
          </div>

          {currentWord.example && (
            <div className="space-y-2 text-left">
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider">例句</p>
              <div className="bg-[var(--bg-input)] rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <p className="text-[var(--text-primary)] text-sm">{currentWord.example}</p>
                  <button
                    onClick={() => speakKorean(currentWord.example)}
                    className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                    title="听例句发音"
                  >
                    <Volume2 size={14} />
                  </button>
                </div>
                <p className="text-[var(--text-secondary)] text-xs mt-1">{currentWord.exampleZh}</p>
              </div>
            </div>
          )}

          <button
            onClick={() => speakKorean(currentWord.word)}
            className="p-3 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Volume2 size={20} />
          </button>
        </div>

        <button
          onClick={() => {
            if (vocabIdx + 1 >= words.length) {
              setVocabIdx(0);
              setPhase('grammar');
            } else {
              setVocabIdx(vocabIdx + 1);
            }
          }}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--purple-soft)] hover:bg-[var(--purple-soft)] text-[var(--text-primary)] rounded-2xl transition-colors font-medium active:scale-95"
        >
          {vocabIdx + 1 >= words.length ? '进入语法' : '下一个'}
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  // ============ GRAMMAR PHASE ============
  if (phase === 'grammar') {
    return (
      <div className="py-6 max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <button onClick={() => { setPhase('vocab'); setVocabIdx(words.length - 1); }} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={20} />
          </button>
          <span className="text-xs px-3 py-1 rounded-full bg-[var(--peach-soft)]/10 text-[var(--peach-soft)] font-medium">
            {grammar.level === 'beginner' ? '初级' : grammar.level === 'intermediate' ? '中级' : '高级'}
          </span>
          <button onClick={() => { setQuizIdx(0); setQuizAnswer(null); setQuizCorrect(0); setPhase('quiz'); }} className="text-xs text-[var(--pink-primary)] hover:text-[var(--pink-primary)]">
            跳过
          </button>
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 space-y-5">
          <div className="flex items-center gap-3">
            <Lightbulb size={24} className="text-[var(--peach-soft)]" />
            <span className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">语法点</span>
          </div>

          <div>
            <h2 className="text-xl font-bold text-[var(--text-primary)]">{grammar.title}</h2>
            <div className="inline-flex mt-2 px-3 py-1 rounded-lg bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] text-sm font-mono">
              {grammar.pattern}
            </div>
          </div>

          <div className="space-y-3">
            <div className="bg-[var(--bg-input)] rounded-xl p-4">
              <p className="text-xs text-[var(--text-secondary)] mb-1">用法</p>
              <p className="text-sm text-[var(--text-primary)]">{grammar.usage}</p>
            </div>

            <div className="bg-[var(--bg-input)] rounded-xl p-4">
              <p className="text-xs text-[var(--text-secondary)] mb-1">接续方式</p>
              <p className="text-sm text-[var(--text-primary)]">{grammar.conjugation}</p>
            </div>

            <button
              onClick={() => setGrammarExpanded(!grammarExpanded)}
              className="w-full text-left"
            >
              <div className="bg-[var(--bg-input)] rounded-xl p-4">
                <p className="text-xs text-[var(--text-secondary)] mb-2">详细解释</p>
                <p className={`text-sm text-[var(--text-primary)] ${grammarExpanded ? '' : 'line-clamp-2'}`}>
                  {grammar.explanation}
                </p>
                {!grammarExpanded && (
                  <p className="text-xs text-[var(--pink-primary)] mt-2">点击展开完整内容</p>
                )}
              </div>
            </button>
          </div>

          <div className="space-y-2">
            <p className="text-xs text-[var(--text-secondary)] uppercase tracking-wider">例句</p>
            {grammar.examples.map((ex, i) => (
              <div key={i} className="bg-[var(--bg-input)] rounded-xl p-4">
                <div className="flex items-start gap-2">
                  <p className="text-[var(--text-primary)] text-sm">{ex.ko}</p>
                  <button
                    onClick={() => speakKorean(ex.ko)}
                    className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                    title="听例句发音"
                  >
                    <Volume2 size={14} />
                  </button>
                </div>
                <p className="text-[var(--text-secondary)] text-xs mt-1">{ex.zh}</p>
              </div>
            ))}
          </div>

          {grammar.similarPatterns && grammar.similarPatterns.length > 0 && (
            <div className="bg-[var(--color-danger)]/5 border border-[var(--color-danger)]/10 rounded-xl p-4">
              <p className="text-xs text-[var(--color-danger)] mb-2">易混淆语法</p>
              <p className="text-sm text-[var(--text-primary)]">{grammar.similarPatterns.join(' · ')}</p>
              {grammar.difference && (
                <p className="text-xs text-[var(--text-secondary)] mt-1">{grammar.difference}</p>
              )}
            </div>
          )}
        </div>

        <button
          onClick={() => { setQuizIdx(0); setQuizAnswer(null); setQuizCorrect(0); setPhase('quiz'); }}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-colors font-medium active:scale-95"
        >
          开始测验
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  // ============ QUIZ PHASE ============
  if (phase === 'quiz') {
    const currentQ = quizQuestions[quizIdx];
    if (!currentQ) return null;
    return (
      <div className="py-6 max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--text-primary)]">测验 {quizIdx + 1}/{quizQuestions.length}</span>
          <span className="text-xs text-[var(--text-muted)]">正确: {quizCorrect}</span>
        </div>

        <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
          <div
            className="bg-[var(--pink-primary)] h-1.5 rounded-full transition-all"
            style={{ width: `${((quizIdx + 1) / quizQuestions.length) * 100}%` }}
          />
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 space-y-6">
          <h2 className="text-lg font-bold text-[var(--text-primary)] text-center">{currentQ.question}</h2>

          <div className="space-y-3">
            {currentQ.options.map((opt, i) => {
              let btnStyle = 'bg-[var(--bg-input)] border border-[var(--border-color)] hover:border-[var(--border-hover)]';
              if (quizAnswer !== null) {
                if (i === currentQ.correct) {
                  btnStyle = 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]';
                } else if (i === quizAnswer && i !== currentQ.correct) {
                  btnStyle = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50 text-[var(--color-danger)]';
                } else {
                  btnStyle = 'bg-[var(--bg-input)] border-[var(--border-color)] opacity-50';
                }
              }
              return (
                <button
                  key={i}
                  onClick={() => quizAnswer === null && handleQuizAnswer(i)}
                  disabled={quizAnswer !== null}
                  className={`w-full p-4 rounded-xl text-left text-sm transition-all ${btnStyle}`}
                >
                  <span className="text-[var(--text-primary)]">{opt}</span>
                  {quizAnswer !== null && i === currentQ.correct && (
                    <Check size={16} className="text-[var(--mint-soft)] inline ml-2" />
                  )}
                  {quizAnswer !== null && i === quizAnswer && i !== currentQ.correct && (
                    <X size={16} className="text-[var(--color-danger)] inline ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {quizAnswer !== null && (
            <button
              onClick={handleQuizNext}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-colors font-medium active:scale-95"
            >
              {quizIdx + 1 >= quizQuestions.length ? '完成' : '下一题'}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ============ COMPLETE PHASE ============
  if (phase === 'complete') {
    const score = quizQuestions.length > 0 ? Math.round((quizCorrect / quizQuestions.length) * 100) : 100;
    const nextUnitId = selectedUnit.id + 1;
    const hasNextUnit = nextUnitId <= TOTAL_UNITS;
    const nextUnit = hasNextUnit ? learningUnits.find((u) => u.id === nextUnitId) : null;

    return (
      <div className="py-6 max-w-2xl mx-auto">
        <div className="text-center py-12 space-y-6">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--purple-soft)]/20 to-[var(--pink-primary)]/20 flex items-center justify-center mx-auto border-2 border-[var(--purple-soft)]/30 relative">
            <Trophy size={40} className="text-[var(--peach-soft)]" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">
              Unit {selectedUnit.id} 完成!
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              测验正确率: <span className={score >= 66 ? 'text-[var(--mint-soft)]' : 'text-[var(--peach-soft)]'}>{score}%</span>
            </p>
          </div>

          {leveledUp && (
            <div className="bg-gradient-to-r from-[var(--peach-soft)]/10 to-[var(--peach-soft)]/10 border border-[var(--peach-soft)]/20 rounded-2xl p-4 animate-fade-in">
              <p className="text-[var(--peach-soft)] font-bold text-lg animate-bounce">
                升级了! 达到等级 {newLevel}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
              <Sparkles size={20} className="text-[var(--peach-soft)] mx-auto mb-2" />
              <div className="text-xl font-bold text-[var(--text-primary)]">{lessonXp}</div>
              <div className="text-xs text-[var(--text-secondary)]">获得 XP</div>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
              <Star size={20} className="text-[var(--purple-soft)] mx-auto mb-2" />
              <div className="text-xl font-bold text-[var(--text-primary)]">{words.length}</div>
              <div className="text-xs text-[var(--text-secondary)]">新单词</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center pt-4 flex-wrap">
            <Link
              href="/review"
              className="flex items-center gap-2 px-6 py-3 bg-[var(--peach-soft)] hover:bg-[#FF9A80] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
            >
              开始复习
              <ArrowRight size={16} />
            </Link>
            {hasNextUnit && nextUnit && (
              <button
                onClick={() => {
                  setLessonXp(0);
                  setLeveledUp(false);
                  setQuizIdx(0);
                  setQuizAnswer(null);
                  setQuizCorrect(0);
                  setVocabIdx(0);
                  startUnit(nextUnit);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
              >
                下一单元: {nextUnit.emoji} {nextUnit.title}
                <ArrowRight size={16} />
              </button>
            )}
            <button
              onClick={() => {
                setLessonXp(0);
                setLeveledUp(false);
                setQuizIdx(0);
                setQuizAnswer(null);
                setQuizCorrect(0);
                setVocabIdx(0);
                setSelectedUnit(null);
                setPhase('select');
              }}
              className="flex items-center gap-2 px-6 py-3 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
            >
              返回单元列表
            </button>
          </div>
        </div>
      </div>
    );
  }

  return null;
}

function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

function shuffleArray<T>(arr: T[]): T[] {
  const shuffled = [...arr];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}
