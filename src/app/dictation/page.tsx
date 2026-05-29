'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Volume2, Check, X, ArrowRight, Loader2, RotateCcw, Sparkles, Star, Trophy, Mic, Eye, Pen, Keyboard, Headphones, Calendar } from 'lucide-react';
import { db } from '@/lib/db';
import { awardXp, XP_REWARDS, updateStreak } from '@/lib/gamification';
import { KoreanKeyboard } from '@/components/KoreanKeyboard';
import { HandwritingPad } from '@/components/HandwritingPad';
import { dictationWordPacks, type DictationWord } from '@/data/dictationWords';
import { dictationSentences, type DictationSentence } from '@/data/dictationSentences';
import { speak } from '@/lib/tts';
import type { Word } from '@/types';

type Mode = 'word' | 'sentence' | 'daily';
type WordSource = 'builtin' | 'mywords';
type InputMode = 'type' | 'handwrite';

// Daily challenge helpers
const DAILY_KEY = 'dictation-daily';

interface DailyState {
  date: string;           // YYYY-MM-DD
  wordIds: string[];      // 10 word ids
  sentenceIds: string[];  // 2 sentence ids
  currentIdx: number;     // current question index (0-11)
  answers: { correct: boolean }[];
}

function getDailyState(): DailyState | null {
  try {
    const raw = localStorage.getItem(DAILY_KEY);
    if (!raw) return null;
    const state = JSON.parse(raw) as DailyState;
    if (state.date !== new Date().toISOString().slice(0, 10)) return null;
    return state;
  } catch { return null; }
}

function saveDailyState(state: DailyState) {
  localStorage.setItem(DAILY_KEY, JSON.stringify(state));
}

function generateDaily(): DailyState {
  const allWords = dictationWordPacks.flatMap((p) => p.words);
  const shuffled = [...allWords].sort(() => Math.random() - 0.5);
  const wordIds = shuffled.slice(0, 10).map((w) => w.id);
  const sShuffled = [...dictationSentences].sort(() => Math.random() - 0.5);
  const sentenceIds = sShuffled.slice(0, 2).map((s) => s.id);
  return {
    date: new Date().toISOString().slice(0, 10),
    wordIds, sentenceIds,
    currentIdx: 0,
    answers: [],
  };
}

// Build a lookup map for all built-in words
const allBuiltinWords = new Map<string, DictationWord>();
dictationWordPacks.forEach((p) => p.words.forEach((w) => allBuiltinWords.set(w.id, w)));

export default function DictationPage() {
  const [mode, setMode] = useState<Mode>('word');
  const [wordSource, setWordSource] = useState<WordSource>('builtin');
  const [packId, setPackId] = useState('beginner');
  const [sentenceLevel, setSentenceLevel] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');

  // Game state
  const [words, setWords] = useState<DictationWord[]>([]);
  const [sentences, setSentences] = useState<DictationSentence[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [userInput, setUserInput] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ correct: 0, total: 0 });
  const [complete, setComplete] = useState(false);
  const [error, setError] = useState('');
  const [earnedXp, setEarnedXp] = useState(0);
  const [showXpGain, setShowXpGain] = useState(false);
  const [xpGainAmount, setXpGainAmount] = useState(0);
  const [leveledUp, setLeveledUp] = useState(false);
  const [newLevel, setNewLevel] = useState(0);
  const [hasListened, setHasListened] = useState(false);
  const [keyboardVisible, setKeyboardVisible] = useState(false);
  const [inputMode, setInputMode] = useState<InputMode>('type');
  const [dailyState, setDailyState] = useState<DailyState | null>(null);
  const [dailyDone, setDailyDone] = useState(false);
  const [speed, setSpeed] = useState(1.0);
  const inputRef = useRef<HTMLInputElement>(null);

  // Load word dictation data
  const loadWords = useCallback(async () => {
    setLoading(true);
    if (wordSource === 'mywords') {
      const allWords = await db.words.orderBy('createdAt').reverse().limit(20).toArray();
      setWords(allWords.map((w: Word) => ({
        id: w.id, korean: w.word, meaning: w.meaning, pronunciation: w.pronunciation || '',
      })).sort(() => Math.random() - 0.5));
    } else {
      const pack = dictationWordPacks.find((p) => p.id === packId);
      setWords(pack ? [...pack.words].sort(() => Math.random() - 0.5) : []);
    }
    setLoading(false);
  }, [wordSource, packId]);

  // Load sentence data
  const loadSentences = useCallback(() => {
    const filtered = dictationSentences.filter((s) => s.level === sentenceLevel);
    setSentences([...filtered].sort(() => Math.random() - 0.5));
    setLoading(false);
  }, [sentenceLevel]);

  // Load daily challenge
  const loadDaily = useCallback(() => {
    const existing = getDailyState();
    if (existing && existing.currentIdx >= existing.wordIds.length + existing.sentenceIds.length) {
      setDailyDone(true);
      return;
    }
    setDailyState(existing || generateDaily());
    setLoading(false);
  }, []);

  // Initial load
  useEffect(() => {
    if (mode === 'word') loadWords();
    else if (mode === 'sentence') loadSentences();
    else loadDaily();
  }, [mode, loadWords, loadSentences, loadDaily]);

  const resetRound = useCallback(() => {
    setUserInput('');
    setSubmitted(false);
    setError('');
    setHasListened(false);
    setKeyboardVisible(false);
  }, []);

  // Get current item
  const currentItem = useMemo(() => {
    if (mode === 'word') return words[currentIdx] || null;
    if (mode === 'sentence') return sentences[currentIdx] || null;
    if (mode === 'daily' && dailyState) {
      const idx = dailyState.currentIdx;
      if (idx < dailyState.wordIds.length) {
        return allBuiltinWords.get(dailyState.wordIds[idx]) || null;
      }
      const sIdx = idx - dailyState.wordIds.length;
      return dictationSentences.find((s) => s.id === dailyState.sentenceIds[sIdx]) || null;
    }
    return null;
  }, [mode, words, sentences, currentIdx, dailyState]);

  const isWord = useCallback((item: any): item is DictationWord & { chinese?: undefined } => {
    return item && 'meaning' in item && !('chinese' in item);
  }, []);

  const handleSubmit = async () => {
    if (!userInput.trim() || !currentItem) return;
    setSubmitted(true);
    setKeyboardVisible(false);

    const correctAnswer = isWord(currentItem) ? currentItem.korean : (currentItem as DictationSentence).korean;
    const isCorrect = userInput.trim() === correctAnswer;

    setStats((prev) => ({ correct: prev.correct + (isCorrect ? 1 : 0), total: prev.total + 1 }));

    if (isCorrect) {
      setError('');
      const { leveledUp: didLevelUp, newLevel: lvl } = await awardXp(XP_REWARDS.dictationCorrect);
      setEarnedXp((prev) => prev + XP_REWARDS.dictationCorrect);
      if (didLevelUp) { setLeveledUp(true); setNewLevel(lvl); }
      setXpGainAmount(XP_REWARDS.dictationCorrect);
      setShowXpGain(true);
      setTimeout(() => setShowXpGain(false), 2000);
    } else {
      setError(`正确答案: ${correctAnswer}`);
    }

    // Daily: save answer
    if (mode === 'daily' && dailyState) {
      const updated = { ...dailyState, answers: [...dailyState.answers, { correct: isCorrect }] };
      setDailyState(updated);
      saveDailyState(updated);
    }
  };

  const handleNext = async () => {
    const total = mode === 'word' ? words.length : mode === 'sentence' ? sentences.length : (dailyState ? dailyState.wordIds.length + dailyState.sentenceIds.length : 0);

    if (currentIdx + 1 >= total) {
      await updateStreak();
      fetch('/api/track/study', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ action: 'dictation', details: `听写: ${stats.correct}/${stats.total}`, xpEarned: earnedXp }) }).catch(() => {});
      if (mode === 'daily' && dailyState) {
        const final = { ...dailyState, currentIdx: currentIdx + 1 };
        saveDailyState(final);
        setDailyDone(true);
      }
      setComplete(true);
    } else {
      if (mode === 'daily' && dailyState) {
        const updated = { ...dailyState, currentIdx: dailyState.currentIdx + 1 };
        setDailyState(updated);
        saveDailyState(updated);
      }
      setCurrentIdx((prev) => prev + 1);
      resetRound();
    }
  };

  const handleRestart = () => {
    resetRound();
    setStats({ correct: 0, total: 0 });
    setCurrentIdx(0);
    setComplete(false);
    setEarnedXp(0);
    setLeveledUp(false);
    setShowXpGain(false);
    if (mode === 'word') loadWords();
    else if (mode === 'sentence') loadSentences();
    else {
      const fresh = generateDaily();
      setDailyState(fresh);
      saveDailyState(fresh);
      setDailyDone(false);
    }
  };

  // Focus input
  useEffect(() => {
    if (!submitted && !loading && currentItem && inputMode === 'type') {
      inputRef.current?.focus();
    }
  }, [currentIdx, submitted, loading, currentItem, inputMode]);

  // Auto-speak for listen mode
  useEffect(() => {
    if (!submitted && !loading && currentItem && mode !== 'sentence') {
      const text = isWord(currentItem) ? currentItem.korean : (currentItem as DictationSentence).korean;
      speak(text, speed);
      setHasListened(true);
    }
  }, [currentIdx, mode, submitted, loading]);

  // Completion screen
  if ((complete || dailyDone) && !loading) {
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    return (
      <div className="py-6 max-w-lg mx-auto">
        <div className="text-center py-16 space-y-6">
          <Trophy size={56} className="mx-auto text-[var(--peach-soft)]" />
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">
              {mode === 'daily' ? '今日挑战完成!' : '练习完成!'}
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">正确 {stats.correct} / {stats.total}</p>
            <p className="text-lg font-medium text-[var(--purple-soft)] mt-1">{accuracy}% 正确率</p>
          </div>
          {leveledUp && (
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4">
              <p className="text-[var(--peach-soft)] font-bold text-lg">升级了! 达到等级 {newLevel}</p>
            </div>
          )}
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
              <Sparkles size={20} className="text-[var(--peach-soft)] mx-auto mb-2" />
              <div className="text-xl font-bold text-[var(--text-primary)]">{earnedXp}</div>
              <div className="text-xs text-[var(--text-secondary)]">获得 XP</div>
            </div>
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
              <Star size={20} className="text-[var(--purple-soft)] mx-auto mb-2" />
              <div className="text-xl font-bold text-[var(--text-primary)]">{stats.correct}</div>
              <div className="text-xs text-[var(--text-secondary)]">答对题数</div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            {mode === 'daily' && dailyDone ? (
              <p className="text-sm text-[var(--text-muted)]">明天再来挑战吧!</p>
            ) : (
              <button onClick={handleRestart} className="flex items-center gap-2 px-5 py-2.5 bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium hover:opacity-90">
                <RotateCcw size={16} /> 再来一轮
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  const total = mode === 'word' ? words.length : mode === 'sentence' ? sentences.length : (dailyState ? dailyState.wordIds.length + dailyState.sentenceIds.length : 0);

  if (!currentItem || total === 0) {
    return (
      <div className="py-6 max-w-lg mx-auto">
        <div className="text-center py-16 space-y-6">
          <Volume2 size={48} className="text-[var(--text-placeholder)] mx-auto" />
          <h1 className="text-xl font-bold text-[var(--text-primary)]">没有可练习的内容</h1>
          <p className="text-[var(--text-secondary)] text-sm">
            {mode === 'word' && wordSource === 'mywords' ? '先去添加单词到词库吧' : '换个词库试试'}
          </p>
        </div>
      </div>
    );
  }

  const currentKorean = isWord(currentItem) ? currentItem.korean : (currentItem as DictationSentence).korean;
  const currentMeaning = isWord(currentItem) ? currentItem.meaning : (currentItem as DictationSentence).chinese;
  const currentPronunciation = isWord(currentItem) ? currentItem.pronunciation : undefined;
  const currentTag = isWord(currentItem) ? undefined : (currentItem as DictationSentence).tag;

  return (
    <div className="py-4 max-w-lg mx-auto space-y-4">
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">听写练习</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">听发音，写出对应内容</p>
      </div>

      {/* Mode tabs */}
      <div className="flex bg-[var(--bg-input)] rounded-xl p-1 gap-1">
        {([
          { k: 'word' as Mode, label: '单词听写', icon: Mic, desc: '听发音写单词' },
          { k: 'sentence' as Mode, label: '句子听写', icon: Headphones, desc: '听完整句子' },
          { k: 'daily' as Mode, label: '每日挑战', icon: Calendar, desc: '每日10词+2句' },
        ]).map((m) => (
          <button key={m.k} onClick={() => { setMode(m.k); setCurrentIdx(0); resetRound(); setStats({ correct: 0, total: 0 }); setComplete(false); setEarnedXp(0); }}
            className={`flex-1 flex flex-col items-center py-2.5 rounded-lg text-xs transition-all ${
              mode === m.k ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] shadow-sm' : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
            }`}
          >
            <m.icon size={18} />
            <span className="mt-0.5 font-medium">{m.label}</span>
          </button>
        ))}
      </div>

      {/* Word source / level selector */}
      {mode === 'word' && (
        <div className="space-y-2">
          <div className="flex bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-1 gap-1">
            <button onClick={() => setWordSource('builtin')}
              className={`flex-1 text-sm py-2 rounded-lg transition-colors ${wordSource === 'builtin' ? 'bg-[var(--pink-primary)] text-white font-medium' : 'text-[var(--text-secondary)]'}`}
            >内置词库</button>
            <button onClick={() => setWordSource('mywords')}
              className={`flex-1 text-sm py-2 rounded-lg transition-colors ${wordSource === 'mywords' ? 'bg-[var(--pink-primary)] text-white font-medium' : 'text-[var(--text-secondary)]'}`}
            >我的单词</button>
          </div>
          {wordSource === 'builtin' && (
            <div className="flex gap-1.5">
              {dictationWordPacks.map((p) => (
                <button key={p.id} onClick={() => { setPackId(p.id); loadWords(); setCurrentIdx(0); resetRound(); }}
                  className={`flex-1 text-xs py-2 rounded-lg transition-colors ${packId === p.id ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium ring-1 ring-[var(--pink-pale)]' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)]'}`}
                >
                  {p.emoji} {p.name}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {mode === 'sentence' && (
        <div className="flex gap-1.5">
          {(['beginner', 'intermediate', 'advanced'] as const).map((lv) => (
            <button key={lv} onClick={() => { setSentenceLevel(lv); loadSentences(); setCurrentIdx(0); resetRound(); }}
              className={`flex-1 text-xs py-2 rounded-lg transition-colors ${sentenceLevel === lv ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium ring-1 ring-[var(--pink-pale)]' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-muted)]'}`}
            >
              {lv === 'beginner' ? '🌱 初级' : lv === 'intermediate' ? '🌿 中级' : '🌳 高级'}
            </button>
          ))}
        </div>
      )}

      {mode === 'daily' && dailyState && (
        <div className="text-xs text-[var(--text-muted)] text-center">
          共 {dailyState.wordIds.length + dailyState.sentenceIds.length} 题 · 前10题单词 + 后2题句子
        </div>
      )}

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--text-muted)]">{currentIdx + 1} / {total}</span>
        <span className="text-[var(--text-muted)]">正确: <span className="text-[var(--mint-soft)]">{stats.correct}</span> / {stats.total}</span>
      </div>

      <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
        <div className="bg-purple-500 h-1.5 rounded-full transition-all" style={{ width: `${((currentIdx + 1) / total) * 100}%` }} />
      </div>

      {/* Main card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 text-center space-y-5">
        {/* Play button */}
        <button
          onClick={() => { speak(currentKorean, speed); setHasListened(true); }}
          className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto transition-all ${
            hasListened ? 'bg-[var(--mint-soft)]/10 hover:bg-[var(--mint-soft)]/20' : 'bg-[var(--pink-primary)]/10 hover:bg-[var(--pink-primary)]/20'
          }`}
        >
          <Volume2 size={36} className={hasListened ? 'text-[var(--mint-soft)]' : 'text-[var(--pink-primary)]'} />
        </button>

        <p className="text-sm text-[var(--text-muted)]">
          {hasListened ? '点击可重复播放' : '👆 点击按钮听发音'} · 输入你听到的内容
        </p>

        {/* Speed slider */}
        <div className="flex items-center gap-3 max-w-[240px] mx-auto">
          <span className="text-xs text-[var(--text-muted)] shrink-0">0.5x</span>
          <input
            type="range" min="0.5" max="1.0" step="0.1" value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="flex-1 h-1.5 rounded-full appearance-none bg-[var(--bg-input)] cursor-pointer
              [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4
              [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[var(--pink-primary)]"
          />
          <span className="text-xs text-[var(--text-muted)] shrink-0">1x</span>
          <span className="text-xs font-medium text-[var(--pink-primary)] w-9 text-right">{speed.toFixed(1)}x</span>
        </div>

        {/* Hint: meaning shown in sentence mode or after submission */}
        {mode === 'sentence' && (
          <div className="flex items-center gap-2 justify-center">
            {currentTag && <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">{currentTag}</span>}
            <span className="text-sm text-[var(--text-secondary)]">{currentMeaning}</span>
            {currentPronunciation && <span className="text-xs text-[var(--text-muted)]">[{currentPronunciation}]</span>}
          </div>
        )}

        {/* Input mode toggle */}
        <div className="flex bg-[var(--bg-input)] rounded-xl p-1 gap-1 max-w-[200px] mx-auto">
          <button onClick={() => { setInputMode('type'); setKeyboardVisible(true); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
              inputMode === 'type' ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] shadow-sm' : 'text-[var(--text-muted)]'
            }`}
          ><Keyboard size={14} /> 打字</button>
          <button onClick={() => { setInputMode('handwrite'); setKeyboardVisible(false); }}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg text-xs font-medium transition-all ${
              inputMode === 'handwrite' ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] shadow-sm' : 'text-[var(--text-muted)]'
            }`}
          ><Pen size={14} /> 手写</button>
        </div>

        {/* Input area */}
        <div className="space-y-2">
          {inputMode === 'type' ? (
            <div className="flex gap-2 relative">
              <input
                ref={inputRef} type="text" value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
                onFocus={() => setKeyboardVisible(true)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && !submitted) handleSubmit();
                  if (e.key === 'Enter' && submitted) handleNext();
                }}
                disabled={submitted}
                placeholder={mode === 'sentence' ? '输入韩语句子...' : '输入韩语...'}
                className="flex-1 bg-[var(--bg-input)] border border-[var(--pink-pale)] rounded-xl py-3 px-4 text-[var(--text-primary)] text-center text-lg placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500"
              />
              <button onClick={() => setKeyboardVisible(!keyboardVisible)}
                className={`self-stretch px-3 rounded-xl text-sm font-medium transition-colors ${keyboardVisible ? 'bg-[var(--pink-primary)]/20 text-[var(--pink-primary)]' : 'bg-[var(--bg-input)] text-[var(--text-muted)]'}`}
              >한</button>
            </div>
          ) : (
            <HandwritingPad onInsert={(text) => { setUserInput(text); setHasListened(true); setInputMode('type'); }} onCancel={() => setInputMode('type')} />
          )}
        </div>

        {showXpGain && (
          <div className="flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl py-2 px-4">
            <Sparkles size={16} className="text-[var(--peach-soft)]" />
            <span className="text-[var(--peach-soft)] font-bold text-sm">+{xpGainAmount} XP</span>
          </div>
        )}

        {submitted && (
          <div className={`p-3 rounded-xl ${error ? 'bg-red-500/10' : 'bg-[var(--mint-soft)]/15'}`}>
            {error ? (
              <div className="space-y-1">
                <div className="flex items-center justify-center gap-2 text-red-400"><X size={18} /><span>答错了</span></div>
                <p className="text-[var(--text-primary)] font-bold text-lg">{error.replace('正确答案: ', '')}</p>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-[var(--mint-soft)]"><Check size={18} /><span>正确!</span></div>
            )}
            <p className="text-[var(--text-secondary)] text-sm mt-1.5">{currentMeaning}</p>
          </div>
        )}

        {leveledUp && (
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-3">
            <p className="text-[var(--peach-soft)] font-bold text-sm">升级了! 达到等级 {newLevel}</p>
          </div>
        )}

        {!submitted ? (
          <button onClick={handleSubmit} disabled={!userInput.trim()}
            className="px-8 py-3 bg-[var(--purple-soft)] hover:opacity-90 disabled:bg-[var(--bg-accent)] disabled:text-[var(--text-muted)] text-white rounded-xl text-sm font-medium transition-colors"
          >确认</button>
        ) : (
          <button onClick={handleNext}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-[var(--pink-primary)] text-white rounded-xl text-sm font-medium mx-auto hover:opacity-90"
          >下一题 <ArrowRight size={16} /></button>
        )}

        <p className="text-xs text-[var(--text-placeholder)]">Enter 确认 · Enter 下一题</p>
      </div>

      {earnedXp > 0 && (
        <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
          <Sparkles size={14} className="text-yellow-500" />
          <span>本轮获得 <span className="text-[var(--peach-soft)] font-medium">{earnedXp} XP</span></span>
        </div>
      )}

      <KoreanKeyboard value={userInput} onChange={(val) => { setUserInput(val); setHasListened(true); }}
        visible={keyboardVisible} onClose={() => setKeyboardVisible(false)} />
    </div>
  );
}
