'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import {
  GraduationCap, ArrowRight, ArrowLeft, Check, X, Loader2, Sparkles,
  Star, Zap, BookOpen, Lightbulb, Volume2, Trophy, Lock, ChevronRight,
  Play, Award, Mic, Headphones, Edit3, Target,
} from 'lucide-react';
import { db } from '@/lib/db';
import { getProfile, updateStreak, awardXp, XP_REWARDS, addStudyMinutes, updateProfile } from '@/lib/gamification';
import { learningUnits, TOTAL_UNITS } from '@/data/learningUnits';
import { grammarPoints } from '@/data/grammar';
import { emitXpFlyout, emitStreakMilestone } from '@/components/XpOverlay';
import { KoreanInput } from '@/components/KoreanKeyboard';
import { speak } from '@/lib/tts';
import type { Word, UserProfile } from '@/types';
import type { LearningUnit } from '@/data/learningUnits';

type PagePhase = 'select' | 'vocab' | 'grammar' | 'dictation' | 'listening' | 'test' | 'complete';

interface TestQuestion {
  question: string;
  options: string[];
  correct: number;
  type: 'vocab-ko' | 'vocab-zh' | 'grammar-usage' | 'grammar-form' | 'spelling' | 'listening' | 'comprehensive';
  audioText?: string; // for listening/spelling questions
}

export default function LearnPage() {
  const [phase, setPhase] = useState<PagePhase>('select');
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedUnit, setSelectedUnit] = useState<LearningUnit | null>(null);

  // Vocab phase
  const [vocabIdx, setVocabIdx] = useState(0);

  // Grammar phase
  const [grammarExpanded, setGrammarExpanded] = useState(false);
  const [grammarCheckIdx, setGrammarCheckIdx] = useState(0);
  const [grammarCheckAnswer, setGrammarCheckAnswer] = useState<number | null>(null);

  // Dictation phase
  const [dictationWords, setDictationWords] = useState<{ word: string; meaning: string }[]>([]);
  const [dictationIdx, setDictationIdx] = useState(0);
  const [dictationInput, setDictationInput] = useState('');
  const [dictationResult, setDictationResult] = useState<'idle' | 'correct' | 'incorrect'>('idle');
  const [dictationCorrect, setDictationCorrect] = useState(0);

  // Listening phase
  const [listeningIdx, setListeningIdx] = useState(0);
  const [listeningAnswer, setListeningAnswer] = useState<number | null>(null);
  const [listeningCorrect, setListeningCorrect] = useState(0);

  // Test phase
  const [testQuestions, setTestQuestions] = useState<TestQuestion[]>([]);
  const [testIdx, setTestIdx] = useState(0);
  const [testAnswer, setTestAnswer] = useState<number | null>(null);
  const [testCorrect, setTestCorrect] = useState(0);

  // Completion
  const [lessonXp, setLessonXp] = useState(0);
  const [leveledUp, setLeveledUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);

  useEffect(() => {
    getProfile().then((p) => {
      setProfile(p);
      setLoading(false);
    });
  }, []);

  // ── Generate test questions ──
  const generateTest = useCallback((unit: LearningUnit) => {
    const grammar = grammarPoints.find((g) => g.id === unit.grammarId) || grammarPoints[0];
    const allGrammar = grammarPoints;
    const questions: TestQuestion[] = [];
    const w = unit.words;
    const s = unit.listeningSentences || [];

    function shuffle<T>(arr: T[]): T[] {
      const a = [...arr];
      for (let i = a.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [a[i], a[j]] = [a[j], a[i]];
      }
      return a;
    }

    function buildOptions(correctText: string, pool: string[], count: number): [string[], number] {
      const others = shuffle(pool.filter((p) => p !== correctText)).slice(0, count);
      const items = shuffle([correctText, ...others]);
      return [items, items.indexOf(correctText)];
    }

    // Q1-4: 看韩文选中文 (vocab-ko, 4 questions)
    const vocabKoPool = shuffle([...w]);
    for (let i = 0; i < 4; i++) {
      const word = vocabKoPool[i % vocabKoPool.length];
      const [options, correct] = buildOptions(word.meaning, w.map((x) => x.meaning), 3);
      questions.push({ type: 'vocab-ko', question: `"${word.word}" 的中文意思是？`, options, correct });
    }

    // Q5-7: 看中文选韩文 (vocab-zh, 3 questions)
    const vocabZhPool = shuffle([...w]);
    for (let i = 0; i < 3; i++) {
      const word = vocabZhPool[i % vocabZhPool.length];
      const [options, correct] = buildOptions(word.word, w.map((x) => x.word), 3);
      questions.push({ type: 'vocab-zh', question: `"${word.meaning}" 的韩文是？`, options, correct });
    }

    // Q8-10: 选正确语法用法 (grammar-usage, 3 questions)
    const otherG = shuffle(allGrammar.filter((g) => g.id !== grammar.id));
    const [opt1, c1] = buildOptions(grammar.usage, otherG.slice(0, 3).map((g) => g.usage), 3);
    questions.push({ type: 'grammar-usage', question: `"${grammar.pattern}" 的正确用法是？`, options: opt1, correct: c1 });
    const [opt2, c2] = buildOptions(
      grammar.examples[0]?.ko || grammar.pattern,
      otherG.slice(1, 4).map((g) => g.examples[0]?.ko || g.pattern),
      3
    );
    questions.push({ type: 'grammar-usage', question: `以下哪个例句正确使用了 "${grammar.title}"？`, options: opt2, correct: c2 });
    const [opt3, c3] = buildOptions(grammar.title, otherG.slice(2, 5).map((g) => g.title), 3);
    questions.push({ type: 'grammar-usage', question: `以下哪项是 "${grammar.pattern}" 对应的语法名称？`, options: opt3, correct: c3 });

    // Q11-12: 选正确接续/变形 (grammar-form, 2 questions)
    const conjunctions = [
      { q: `${w[0]?.word || '가다'} + ${grammar.pattern} 的正确连接是？`, a: grammar.conjugation },
    ];
    for (const cq of conjunctions) {
      const fakeConj = shuffle(otherG.slice(0, 3).map((g) => g.conjugation));
      const [opts, ci] = buildOptions(cq.a, fakeConj, 3);
      questions.push({ type: 'grammar-form', question: cq.q, options: opts, correct: ci });
    }
    // Second grammar-form question: pick correct conjugation
    if (w.length >= 2) {
      const [opts2, ci2] = buildOptions(
        grammar.conjugation,
        shuffle(otherG.filter((g) => g.conjugation !== grammar.conjugation)).slice(0, 3).map((g) => g.conjugation),
        3
      );
      questions.push({ type: 'grammar-form', question: '以下哪个是正确的接续方式？', options: opts2, correct: ci2 });
    } else {
      questions.push({ type: 'grammar-form', question: grammar.conjugation ? `"${grammar.conjugation}" 属于哪种接续？` : '以下哪个是正确的韩语表达？', options: shuffle([...(otherG.slice(0, 3).map(g => g.pattern)), grammar.pattern]), correct: 3 });
    }

    // Q13-15: 选正确拼写 (spelling, 3 questions) — show pronunciation, pick correct hangul
    const spellPool = shuffle([...w]);
    for (let i = 0; i < 3; i++) {
      const word = spellPool[i];
      // Generate fake spellings by slightly modifying the word
      const fake1 = word.word.slice(0, -1) + (word.word.length > 0 ? String.fromCharCode(word.word.charCodeAt(word.word.length - 1) + 1) : '');
      const fake2 = word.word.length > 1 ? word.word.slice(0, -2) + word.word.slice(-1) + word.word.slice(-2, -1) : word.word + 'ㅏ';
      const fake3 = word.pronunciation;
      const [opts, ci] = buildOptions(word.word, [fake1, fake2, fake3].filter((f) => f !== word.word), 3);
      questions.push({
        type: 'spelling',
        question: `听发音，选择正确的韩文拼写（${word.meaning}）`,
        options: opts,
        correct: ci,
        audioText: word.word,
      });
    }

    // Q16-18: 听短句选翻译 (listening, 3 questions)
    if (s.length >= 3) {
      const sPool = shuffle([...s]);
      for (let i = 0; i < 3; i++) {
        const sent = sPool[i];
        const otherSentences = shuffle(s.filter((x) => x.chinese !== sent.chinese)).slice(0, 3);
        const [opts, ci] = buildOptions(sent.chinese, otherSentences.map((x) => x.chinese), 3);
        if (opts.length < 4) {
          const [opts2, ci2] = buildOptions(sent.chinese, ['他今天很高兴', '明天会下雨', '我喜欢吃泡菜', '学校在医院旁边'].filter((x) => x !== sent.chinese), 3);
          questions.push({ type: 'listening', question: '听短句，选择正确的中文翻译', options: opts2, correct: ci2, audioText: sent.korean });
        } else {
          questions.push({ type: 'listening', question: '听短句，选择正确的中文翻译', options: opts, correct: ci, audioText: sent.korean });
        }
      }
    } else {
      // Fallback: use vocab words
      for (let i = 0; i < 3; i++) {
        const word = w[i % w.length];
        questions.push({
          type: 'listening',
          question: `听短句，选择正确的中文翻译`,
          options: shuffle([word.exampleZh, w[(i + 1) % w.length].exampleZh, w[(i + 2) % w.length].exampleZh, '今天天气很好']),
          correct: 0,
          audioText: word.example,
        });
      }
    }

    // Q19-20: 综合判断 (comprehensive, 2 questions)
    questions.push({
      type: 'comprehensive',
      question: `以下哪个句子中"${w[0]?.word || ''}"的用法是正确的？`,
      options: shuffle([
        w[0]?.example || '...',
        w[1]?.example.replace(w[1]?.word, w[0]?.word || '') || '...',
        (w[2]?.example || '...').replace(w[2]?.word || '', w[0]?.word || ''),
        w[3]?.example || '...',
      ]),
      correct: 0,
    });
    questions.push({
      type: 'comprehensive',
      question: `"${s[0]?.korean || w[0]?.example || '...'}" 的正确翻译是？`,
      options: shuffle([
        s[0]?.chinese || w[0]?.exampleZh,
        s[1]?.chinese || w[1]?.exampleZh,
        s[2]?.chinese || w[2]?.exampleZh || '今天很高兴',
        w[3]?.exampleZh || '谢谢你的帮助',
      ]),
      correct: 0,
    });

    return shuffle(questions);
  }, []);

  // ── Start Unit ──
  const startUnit = useCallback(async (unit: LearningUnit) => {
    setSelectedUnit(unit);
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

    // Prepare dictation words (5 random)
    const shuffled = [...unit.words].sort(() => Math.random() - 0.5).slice(0, 5);
    setDictationWords(shuffled.map((w) => ({ word: w.word, meaning: w.meaning })));
    setDictationIdx(0);
    setDictationInput('');
    setDictationResult('idle');
    setDictationCorrect(0);

    // Prepare listening
    setListeningIdx(0);
    setListeningAnswer(null);
    setListeningCorrect(0);

    // Generate test
    setTestQuestions(generateTest(unit));
    setTestIdx(0);
    setTestAnswer(null);
    setTestCorrect(0);

    setPhase('vocab');
  }, [generateTest]);

  // ── Phase handlers ──

  const finishUnit = useCallback(async () => {
    const streakResult = await updateStreak();
    if (streakResult.isMilestone) { emitStreakMilestone(streakResult.milestone); }
    await addStudyMinutes(15);
    const { leveledUp: didLevelUp, newLevel: nl } = await awardXp(XP_REWARDS.dailyLessonComplete);
    setLessonXp((prev) => prev + XP_REWARDS.dailyLessonComplete);
    if (didLevelUp) { setLeveledUp(true); setNewLevel(nl); window.dispatchEvent(new CustomEvent('level-up', { detail: { level: nl } })); }
    emitXpFlyout(XP_REWARDS.dailyLessonComplete);

    if (selectedUnit && profile && selectedUnit.id >= profile.currentUnit) {
      const nextUnit = selectedUnit.id + 1;
      await updateProfile({ currentUnit: Math.min(nextUnit, TOTAL_UNITS) });
      setProfile((prev) => prev ? { ...prev, currentUnit: Math.min(nextUnit, TOTAL_UNITS) } : prev);
    }

    fetch('/api/track/study', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'learn_unit', details: `完成单元: ${selectedUnit?.title || 'unknown'}`, xpEarned: lessonXp + XP_REWARDS.dailyLessonComplete }) }).catch(() => {});
    setPhase('complete');
  }, [selectedUnit, profile, lessonXp]);

  const handleDictationCheck = () => {
    const current = dictationWords[dictationIdx];
    if (!current) return;
    const isCorrect = dictationInput.trim() === current.word;
    setDictationResult(isCorrect ? 'correct' : 'incorrect');
    if (isCorrect) setDictationCorrect((p) => p + 1);
  };

  const handleDictationNext = () => {
    if (dictationIdx + 1 >= dictationWords.length) {
      setPhase('listening');
    } else {
      setDictationIdx((p) => p + 1);
      setDictationInput('');
      setDictationResult('idle');
    }
  };

  const handleListeningAnswer = (idx: number) => {
    setListeningAnswer(idx);
    const sent = selectedUnit?.listeningSentences?.[listeningIdx];
    if (sent && idx === 0) setListeningCorrect((p) => p + 1); // options[0] is always correct
  };

  const handleListeningNext = () => {
    if (listeningIdx + 1 >= (selectedUnit?.listeningSentences?.length || 0)) {
      setPhase('test');
    } else {
      setListeningIdx((p) => p + 1);
      setListeningAnswer(null);
    }
  };

  const handleTestAnswer = (idx: number) => {
    setTestAnswer(idx);
    if (idx === testQuestions[testIdx]?.correct) setTestCorrect((p) => p + 1);
  };

  const handleTestNext = () => {
    if (testIdx + 1 >= testQuestions.length) {
      finishUnit();
    } else {
      setTestIdx((p) => p + 1);
      setTestAnswer(null);
    }
  };

  // ── Loading ──
  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }
  if (!profile) return null;

  // ═══════════════════════════════════════════════════
  // PHASE: SELECT
  // ═══════════════════════════════════════════════════
  if (phase === 'select') {
    return (
      <div className="py-4 space-y-4">
        <div className="flex items-center gap-2 text-xs text-[var(--text-placeholder)] mb-1">
          <span className="animate-float">📚</span>
          <span className="animate-float">🎀</span>
          <span className="text-[13px] ml-1">词汇 · 语法 · 默写 · 听力 · 测试</span>
        </div>

        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">每日学习</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            共 {TOTAL_UNITS} 单元 · 当前进度: 第 {profile.currentUnit} 单元
          </p>
        </div>

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
                        <div className="text-sm font-medium text-[var(--text-primary)]">Unit {unit.id}</div>
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

  if (!selectedUnit) return null;
  const grammar = grammarPoints.find((g) => g.id === selectedUnit.grammarId) || grammarPoints[0];
  const { words } = selectedUnit;
  const sents = selectedUnit.listeningSentences || [];

  // ═══════════════════════════════════════════════════
  // PHASE: VOCAB
  // ═══════════════════════════════════════════════════
  if (phase === 'vocab') {
    const currentWord = words[vocabIdx];
    return (
      <div className="py-6 max-w-2xl mx-auto space-y-4">
        {/* Step indicator */}
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          {['词汇', '语法', '默写', '听力', '测试'].map((label, i) => (
            <span key={i} className={`flex items-center gap-1 ${i === 0 ? 'text-[var(--pink-primary)] font-medium' : ''}`}>
              {i > 0 && <span className="text-[var(--text-placeholder)]">→</span>}
              {label}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={() => { setVocabIdx(0); setPhase('select'); }} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm text-[var(--text-muted)]">单词 {vocabIdx + 1}/{words.length}</span>
          <button onClick={() => { setVocabIdx(0); setPhase('grammar'); }} className="text-xs text-[var(--pink-primary)]">
            跳过
          </button>
        </div>

        <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
          <div className="bg-[var(--purple-soft)] h-1.5 rounded-full transition-all" style={{ width: `${((vocabIdx + 1) / words.length) * 100}%` }} />
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 text-center space-y-5">
          <div className="text-6xl">{currentWord.emoji}</div>
          <div>
            <h2 className="text-4xl font-bold text-[var(--text-primary)] mb-2">{currentWord.word}</h2>
            <p className="text-[var(--text-secondary)] text-lg">{currentWord.pronunciation}</p>
          </div>
          <div className="bg-[var(--bg-input)] rounded-2xl p-5">
            <div className="flex items-center justify-center gap-2 mb-2">
              <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-accent)] text-[var(--text-primary)]">{currentWord.partOfSpeech}</span>
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
                    onClick={() => speak(currentWord.example)}
                    className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                  >
                    <Volume2 size={14} />
                  </button>
                </div>
                <p className="text-[var(--text-secondary)] text-xs mt-1">{currentWord.exampleZh}</p>
              </div>
            </div>
          )}

          <button
            onClick={() => speak(currentWord.word)}
            className="p-3 rounded-full bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
          >
            <Volume2 size={22} />
          </button>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => { if (vocabIdx > 0) setVocabIdx(vocabIdx - 1); }}
            className="flex-1 py-3 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl text-[var(--text-primary)] font-medium text-sm"
          >
            上一个
          </button>
          <button
            onClick={() => {
              if (vocabIdx + 1 >= words.length) { setVocabIdx(0); setPhase('grammar'); }
              else setVocabIdx(vocabIdx + 1);
            }}
            className="flex-1 py-3.5 bg-[var(--purple-soft)] text-[var(--text-primary)] rounded-2xl font-medium text-sm active:scale-95"
          >
            {vocabIdx + 1 >= words.length ? '进入语法' : '下一个'}
            <ArrowRight size={16} className="inline ml-1" />
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════
  // PHASE: GRAMMAR
  // ═══════════════════════════════════════════════════
  if (phase === 'grammar') {
    const grammarChecks = [
      { question: `"${grammar.pattern}" 的用法是？`, options: [
        grammar.usage,
        grammarPoints.filter((g) => g.id !== grammar.id).slice(0, 1)[0]?.usage || '表示过去时',
        grammarPoints.filter((g) => g.id !== grammar.id).slice(1, 2)[0]?.usage || '表示将来时',
      ], correct: 0 },
      {
        question: `以下哪个例子正确使用了"${grammar.title}"？`,
        options: [
          grammar.examples[0]?.ko || '',
          grammarPoints.filter((g) => g.id !== grammar.id).slice(0, 1)[0]?.examples[0]?.ko || '먹었어요',
          grammar.examples[1]?.ko || grammar.examples[0]?.ko || '',
        ],
        correct: 0,
      },
    ];

    return (
      <div className="py-6 max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          {['词汇', '语法', '默写', '听力', '测试'].map((label, i) => (
            <span key={i} className={`flex items-center gap-1 ${i === 1 ? 'text-[var(--pink-primary)] font-medium' : ''}`}>
              {i > 0 && <span className="text-[var(--text-placeholder)]">→</span>}
              {label}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={() => { setPhase('vocab'); setVocabIdx(words.length - 1); }} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={20} />
          </button>
          <span className="text-xs px-3 py-1 rounded-full bg-[var(--peach-soft)]/10 text-[var(--peach-soft)] font-medium">
            {grammar.level === 'beginner' ? '初级' : grammar.level === 'intermediate' ? '中级' : '高级'}
          </span>
          <button onClick={() => { setDictationIdx(0); setDictationInput(''); setDictationResult('idle'); setDictationCorrect(0); setPhase('dictation'); }} className="text-xs text-[var(--pink-primary)]">
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
            <button onClick={() => setGrammarExpanded(!grammarExpanded)} className="w-full text-left">
              <div className="bg-[var(--bg-input)] rounded-xl p-4">
                <p className="text-xs text-[var(--text-secondary)] mb-2">详细解释</p>
                <p className={`text-sm text-[var(--text-primary)] ${grammarExpanded ? '' : 'line-clamp-2'}`}>
                  {grammar.explanation}
                </p>
                {!grammarExpanded && <p className="text-xs text-[var(--pink-primary)] mt-2">点击展开完整内容</p>}
              </div>
            </button>
          </div>

          {/* Grammar check questions */}
          <div className="space-y-3 border-t border-[var(--border-color)] pt-4">
            <p className="text-xs font-medium text-[var(--text-secondary)] flex items-center gap-1.5">
              <Target size={14} /> 即时检测
            </p>
            {grammarChecks.map((gc, qi) => (
              <div key={qi} className="bg-[var(--bg-input)] rounded-xl p-4 space-y-3">
                <p className="text-sm font-medium text-[var(--text-primary)]">{gc.question}</p>
                <div className="space-y-2">
                  {gc.options.map((opt, oi) => {
                    const isChosen = grammarCheckIdx === qi && grammarCheckAnswer !== null;
                    let btnStyle = 'bg-white dark:bg-[var(--bg-card)] border border-[var(--border-color)]';
                    if (isChosen) {
                      if (oi === gc.correct) btnStyle = 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]';
                      else if (oi === grammarCheckAnswer) btnStyle = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50 text-[var(--color-danger)]';
                      else btnStyle += ' opacity-50';
                    }
                    return (
                      <button
                        key={oi}
                        onClick={() => { if (!isChosen) { setGrammarCheckIdx(qi); setGrammarCheckAnswer(oi); } }}
                        disabled={isChosen}
                        className={`w-full p-3 rounded-lg text-left text-sm transition-all ${btnStyle}`}
                      >
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {grammar.similarPatterns && grammar.similarPatterns.length > 0 && (
            <div className="bg-[var(--color-danger)]/5 border border-[var(--color-danger)]/10 rounded-xl p-4">
              <p className="text-xs text-[var(--color-danger)] mb-2">易混淆语法</p>
              <p className="text-sm text-[var(--text-primary)]">{grammar.similarPatterns.join(' · ')}</p>
            </div>
          )}
        </div>

        <button
          onClick={() => { setDictationIdx(0); setDictationInput(''); setDictationResult('idle'); setDictationCorrect(0); setPhase('dictation'); }}
          className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl font-medium text-sm active:scale-95"
        >
          进入默写
          <ArrowRight size={18} />
        </button>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════
  // PHASE: DICTATION
  // ═══════════════════════════════════════════════════
  if (phase === 'dictation') {
    const current = dictationWords[dictationIdx];
    return (
      <div className="py-6 max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          {['词汇', '语法', '默写', '听力', '测试'].map((label, i) => (
            <span key={i} className={`flex items-center gap-1 ${i === 2 ? 'text-[var(--pink-primary)] font-medium' : ''}`}>
              {i > 0 && <span className="text-[var(--text-placeholder)]">→</span>}
              {label}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={() => setPhase('grammar')} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm text-[var(--text-muted)]">默写 {dictationIdx + 1}/{dictationWords.length}</span>
          <button onClick={() => setPhase('listening')} className="text-xs text-[var(--pink-primary)]">跳过</button>
        </div>

        <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
          <div className="bg-[var(--peach-soft)] h-1.5 rounded-full transition-all" style={{ width: `${((dictationIdx + 1) / dictationWords.length) * 100}%` }} />
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Mic size={24} className="text-[var(--pink-primary)]" />
            <span className="text-sm text-[var(--text-secondary)]">听发音，输入韩文</span>
          </div>

          <p className="text-lg text-[var(--text-muted)]">意思：{current.meaning}</p>

          <button
            onClick={() => speak(current.word)}
            className="mx-auto flex items-center gap-2 px-6 py-4 bg-[var(--pink-primary)]/10 border border-[var(--pink-primary)]/20 rounded-2xl text-[var(--pink-primary)] font-bold text-lg hover:bg-[var(--pink-primary)]/20 transition-colors"
          >
            <Volume2 size={24} /> 点击听发音
          </button>

          <div>
            <KoreanInput
              value={dictationInput}
              onChange={setDictationInput}
              placeholder="输入你听到的韩文..."
              autoFocus
            />
          </div>

          {dictationResult === 'idle' && (
            <button
              onClick={handleDictationCheck}
              disabled={!dictationInput.trim()}
              className="w-full py-3 bg-[var(--purple-soft)] text-[var(--text-primary)] rounded-2xl font-medium text-sm disabled:opacity-40"
            >
              检查
            </button>
          )}

          {dictationResult === 'correct' && (
            <div className="space-y-3">
              <p className="text-[var(--mint-soft)] font-bold flex items-center justify-center gap-1">
                <Check size={20} /> 正确！
              </p>
              <button onClick={handleDictationNext} className="w-full py-3 bg-[var(--mint-soft)] text-[var(--text-primary)] rounded-2xl font-medium text-sm">
                {dictationIdx + 1 >= dictationWords.length ? '进入听力' : '下一题'}
                <ArrowRight size={16} className="inline ml-1" />
              </button>
            </div>
          )}

          {dictationResult === 'incorrect' && (
            <div className="space-y-3">
              <p className="text-[var(--color-danger)] font-bold flex items-center justify-center gap-1">
                <X size={20} /> 正确答案：{current.word}
              </p>
              <button onClick={handleDictationNext} className="w-full py-3 bg-[var(--peach-soft)] text-[var(--text-primary)] rounded-2xl font-medium text-sm">
                {dictationIdx + 1 >= dictationWords.length ? '进入听力' : '下一题'}
                <ArrowRight size={16} className="inline ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════
  // PHASE: LISTENING
  // ═══════════════════════════════════════════════════
  if (phase === 'listening') {
    const currentSent = sents[listeningIdx];
    if (!currentSent) return null;

    // Build options: correct answer + 3 distractors
    const buildListeningOptions = () => {
      const correct = currentSent.chinese;
      const others = (selectedUnit?.listeningSentences || [])
        .filter((s) => s.chinese !== correct)
        .slice(0, 3)
        .map((s) => s.chinese);
      while (others.length < 3) others.push('他今天很高兴', '明天会下雨', '我喜欢吃泡菜');
      const items = [correct, ...others.slice(0, 3)].sort(() => Math.random() - 0.5);
      return { options: items, correctIdx: items.indexOf(correct) };
    };

    const { options: listeningOptions, correctIdx } = buildListeningOptions();

    return (
      <div className="py-6 max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          {['词汇', '语法', '默写', '听力', '测试'].map((label, i) => (
            <span key={i} className={`flex items-center gap-1 ${i === 3 ? 'text-[var(--pink-primary)] font-medium' : ''}`}>
              {i > 0 && <span className="text-[var(--text-placeholder)]">→</span>}
              {label}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <button onClick={() => { setDictationIdx(dictationWords.length - 1); setDictationInput(''); setDictationResult('idle'); setPhase('dictation'); }} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={20} />
          </button>
          <span className="text-sm text-[var(--text-muted)]">听力 {listeningIdx + 1}/{sents.length}</span>
          <button onClick={() => setPhase('test')} className="text-xs text-[var(--pink-primary)]">跳过</button>
        </div>

        <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
          <div className="bg-[var(--mint-soft)] h-1.5 rounded-full transition-all" style={{ width: `${((listeningIdx + 1) / sents.length) * 100}%` }} />
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 text-center space-y-6">
          <div className="flex items-center justify-center gap-3">
            <Headphones size={24} className="text-[var(--mint-soft)]" />
            <span className="text-sm text-[var(--text-secondary)]">听短句，选翻译</span>
          </div>

          <button
            onClick={() => speak(currentSent.korean)}
            className="mx-auto flex items-center gap-3 px-8 py-5 bg-[var(--mint-soft)]/10 border-2 border-[var(--mint-soft)]/30 rounded-2xl text-[var(--mint-soft)] font-bold text-lg hover:bg-[var(--mint-soft)]/20 transition-colors"
          >
            <Volume2 size={28} /> 点击播放
          </button>

          <p className="text-xs text-[var(--text-muted)]">可以多次点击播放</p>

          <div className="space-y-3">
            {listeningOptions.map((opt, i) => {
              let btnStyle = 'bg-[var(--bg-input)] border border-[var(--border-color)] hover:border-[var(--border-hover)]';
              if (listeningAnswer !== null) {
                if (i === correctIdx) btnStyle = 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)]/50';
                else if (i === listeningAnswer && i !== correctIdx) btnStyle = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50';
                else btnStyle += ' opacity-50';
              }
              return (
                <button
                  key={i}
                  onClick={() => listeningAnswer === null && handleListeningAnswer(i)}
                  disabled={listeningAnswer !== null}
                  className={`w-full p-4 rounded-xl text-sm transition-all ${btnStyle}`}
                >
                  <span className="text-[var(--text-primary)]">{opt}</span>
                  {listeningAnswer !== null && i === correctIdx && <Check size={16} className="text-[var(--mint-soft)] inline ml-2" />}
                  {listeningAnswer !== null && i === listeningAnswer && i !== correctIdx && <X size={16} className="text-[var(--color-danger)] inline ml-2" />}
                </button>
              );
            })}
          </div>

          {listeningAnswer !== null && (
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-1">原文：{currentSent.korean}</p>
              <button onClick={handleListeningNext} className="w-full py-3 bg-[var(--mint-soft)] text-[var(--text-primary)] rounded-2xl font-medium text-sm">
                {listeningIdx + 1 >= sents.length ? '开始测试' : '下一句'}
                <ArrowRight size={16} className="inline ml-1" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════
  // PHASE: TEST (20 questions)
  // ═══════════════════════════════════════════════════
  if (phase === 'test') {
    const currentQ = testQuestions[testIdx];
    if (!currentQ) return null;

    return (
      <div className="py-6 max-w-2xl mx-auto space-y-4">
        <div className="flex items-center gap-1.5 text-xs text-[var(--text-muted)]">
          {['词汇', '语法', '默写', '听力', '测试'].map((label, i) => (
            <span key={i} className={`flex items-center gap-1 ${i === 4 ? 'text-[var(--pink-primary)] font-medium' : ''}`}>
              {i > 0 && <span className="text-[var(--text-placeholder)]">→</span>}
              {label}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-[var(--text-primary)]">测试 {testIdx + 1}/{testQuestions.length}</span>
          <div className="flex items-center gap-3 text-xs text-[var(--text-muted)]">
            <span className="flex items-center gap-1"><Check size={12} className="text-[var(--mint-soft)]" />{testCorrect}</span>
            <span className="flex items-center gap-1"><X size={12} className="text-[var(--color-danger)]" />{testIdx - testCorrect}</span>
          </div>
        </div>

        <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
          <div
            className="bg-[var(--pink-primary)] h-1.5 rounded-full transition-all"
            style={{ width: `${((testIdx + 1) / testQuestions.length) * 100}%` }}
          />
        </div>

        {/* Question type badge */}
        <div className="flex items-center gap-2">
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--bg-accent)] text-[var(--text-muted)]">
            {currentQ.type === 'vocab-ko' ? '词汇·韩→中' :
             currentQ.type === 'vocab-zh' ? '词汇·中→韩' :
             currentQ.type === 'grammar-usage' ? '语法·用法' :
             currentQ.type === 'grammar-form' ? '语法·变形' :
             currentQ.type === 'spelling' ? '拼写' :
             currentQ.type === 'listening' ? '听力' : '综合'}
          </span>
          {currentQ.audioText && (
            <button
              onClick={() => speak(currentQ.audioText!)}
              className="flex items-center gap-1 px-2 py-1 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] text-xs"
            >
              <Volume2 size={12} /> 播放
            </button>
          )}
        </div>

        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-6 space-y-5">
          <h2 className="text-lg font-bold text-[var(--text-primary)]">{currentQ.question}</h2>

          <div className="space-y-3">
            {currentQ.options.map((opt, i) => {
              let btnStyle = 'bg-[var(--bg-input)] border border-[var(--border-color)] hover:border-[var(--border-hover)]';
              if (testAnswer !== null) {
                if (i === currentQ.correct) btnStyle = 'bg-[var(--mint-soft)]/15 border-[var(--mint-soft)]/50 text-[var(--mint-soft)]';
                else if (i === testAnswer && i !== currentQ.correct) btnStyle = 'bg-[var(--color-danger)]/10 border-[var(--color-danger)]/50 text-[var(--color-danger)]';
                else btnStyle += ' opacity-50';
              }
              return (
                <button
                  key={i}
                  onClick={() => testAnswer === null && handleTestAnswer(i)}
                  disabled={testAnswer !== null}
                  className={`w-full p-4 rounded-xl text-left text-sm transition-all ${btnStyle}`}
                >
                  <span className="text-[var(--text-primary)]">{opt}</span>
                  {testAnswer !== null && i === currentQ.correct && <Check size={16} className="text-[var(--mint-soft)] inline ml-2" />}
                  {testAnswer !== null && i === testAnswer && i !== currentQ.correct && <X size={16} className="text-[var(--color-danger)] inline ml-2" />}
                </button>
              );
            })}
          </div>

          {testAnswer !== null && (
            <button
              onClick={handleTestNext}
              className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl font-medium text-sm active:scale-95"
            >
              {testIdx + 1 >= testQuestions.length ? '查看结果' : '下一题'}
              <ArrowRight size={18} />
            </button>
          )}
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════════════
  // PHASE: COMPLETE
  // ═══════════════════════════════════════════════════
  if (phase === 'complete') {
    const totalQ = testQuestions.length;
    const score = totalQ > 0 ? Math.round((testCorrect / totalQ) * 100) : 0;
    const nextUnitId = selectedUnit.id + 1;
    const hasNextUnit = nextUnitId <= TOTAL_UNITS;
    const nextUnit = hasNextUnit ? learningUnits.find((u) => u.id === nextUnitId) : null;

    return (
      <div className="py-6 max-w-2xl mx-auto">
        <div className="text-center py-8 space-y-5">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[var(--purple-soft)]/20 to-[var(--pink-primary)]/20 flex items-center justify-center mx-auto border-2 border-[var(--purple-soft)]/30 relative">
            <Trophy size={40} className="text-[var(--peach-soft)]" />
          </div>

          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">
              Unit {selectedUnit.id} 完成!
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              测验正确率: <span className={score >= 60 ? 'text-[var(--mint-soft)] font-bold' : 'text-[var(--peach-soft)] font-bold'}>{score}%</span>（{testCorrect}/{totalQ}）
            </p>
          </div>

          {leveledUp && (
            <div className="bg-gradient-to-r from-[var(--peach-soft)]/10 to-[var(--peach-soft)]/10 border border-[var(--peach-soft)]/20 rounded-2xl p-4 animate-fade-in">
              <p className="text-[var(--peach-soft)] font-bold text-lg animate-bounce">
                升级了! 达到等级 {newLevel}
              </p>
            </div>
          )}

          {/* Stats grid */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3">
              <Sparkles size={18} className="text-[var(--peach-soft)] mx-auto mb-1" />
              <div className="text-lg font-bold text-[var(--text-primary)]">{lessonXp}</div>
              <div className="text-xs text-[var(--text-secondary)]">获得XP</div>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3">
              <BookOpen size={18} className="text-[var(--purple-soft)] mx-auto mb-1" />
              <div className="text-lg font-bold text-[var(--text-primary)]">{words.length}</div>
              <div className="text-xs text-[var(--text-secondary)]">新单词</div>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3">
              <Edit3 size={18} className="text-[var(--mint-soft)] mx-auto mb-1" />
              <div className="text-lg font-bold text-[var(--text-primary)]">{dictationCorrect}/{dictationWords.length}</div>
              <div className="text-xs text-[var(--text-secondary)]">默写</div>
            </div>
          </div>

          <div className="flex gap-3 justify-center pt-2 flex-wrap">
            <Link
              href="/review"
              className="flex items-center gap-2 px-6 py-3 bg-[var(--peach-soft)] hover:bg-[#FF9A80] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
            >
              开始复习 <ArrowRight size={16} />
            </Link>
            {hasNextUnit && nextUnit && (
              <button
                onClick={() => {
                  setLessonXp(0); setLeveledUp(false);
                  setTestIdx(0); setTestAnswer(null); setTestCorrect(0);
                  setVocabIdx(0); setDictationIdx(0); setDictationInput(''); setDictationResult('idle'); setDictationCorrect(0);
                  setListeningIdx(0); setListeningAnswer(null); setListeningCorrect(0);
                  startUnit(nextUnit);
                }}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] text-[var(--text-primary)] rounded-2xl transition-colors text-sm font-medium"
              >
                下一单元: {nextUnit.emoji} {nextUnit.title} <ArrowRight size={16} />
              </button>
            )}
            <button
              onClick={() => {
                setLessonXp(0); setLeveledUp(false);
                setTestIdx(0); setTestAnswer(null); setTestCorrect(0);
                setVocabIdx(0); setDictationIdx(0); setDictationInput(''); setDictationResult('idle'); setDictationCorrect(0);
                setListeningIdx(0); setListeningAnswer(null); setListeningCorrect(0);
                setSelectedUnit(null); setPhase('select');
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
