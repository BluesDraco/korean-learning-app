'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Volume2, Check, X, ArrowRight, Loader2, RotateCcw, Sparkles, Star, Trophy, Pencil, Mic, Eye } from 'lucide-react';
import { db } from '@/lib/db';
import { awardXp, XP_REWARDS, updateStreak } from '@/lib/gamification';
import { KoreanKeyboard } from '@/components/KoreanKeyboard';
import type { Word } from '@/types';

type Mode = 'listen' | 'write';

function speakKorean(text: string, rate = 0.8) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = rate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

export default function DictationPage() {
  const [mode, setMode] = useState<Mode>('listen');
  const [words, setWords] = useState<Word[]>([]);
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
  const inputRef = useRef<HTMLInputElement>(null);

  const loadWords = useCallback(async () => {
    const allWords = await db.words.orderBy('createdAt').reverse().limit(20).toArray();
    setWords(allWords.sort(() => Math.random() - 0.5));
    setLoading(false);
  }, []);

  useEffect(() => { loadWords(); }, [loadWords]);

  const resetRound = useCallback(() => {
    setUserInput('');
    setSubmitted(false);
    setError('');
    setHasListened(false);
    setKeyboardVisible(false);
  }, []);

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    setSubmitted(true);
    setKeyboardVisible(false);

    const currentWord = words[currentIdx];
    // Normalize: trim whitespace, compare
    const isCorrect = userInput.trim() === currentWord.word;

    setStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      setError('');
      const { leveledUp: didLevelUp, newLevel: lvl } = await awardXp(XP_REWARDS.dictationCorrect);
      setEarnedXp((prev) => prev + XP_REWARDS.dictationCorrect);
      if (didLevelUp) {
        setLeveledUp(true);
        setNewLevel(lvl);
      }
      setXpGainAmount(XP_REWARDS.dictationCorrect);
      setShowXpGain(true);
      setTimeout(() => setShowXpGain(false), 2000);
    } else {
      setError(`正确答案: ${currentWord.word}`);
    }

    db.dictationRecords.put({
      id: crypto.randomUUID(),
      wordId: currentWord.id,
      date: Date.now(),
      correct: isCorrect,
      userInput: userInput.trim(),
    });
  };

  const handleNext = async () => {
    if (currentIdx + 1 >= words.length) {
      await updateStreak();
      setComplete(true);
    } else {
      setCurrentIdx(currentIdx + 1);
      resetRound();
    }
  };

  const handleRestart = () => {
    setWords((prev) => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    resetRound();
    setStats({ correct: 0, total: 0 });
    setComplete(false);
    setEarnedXp(0);
    setLeveledUp(false);
    setShowXpGain(false);
  };

  const handleModeSwitch = (newMode: Mode) => {
    setMode(newMode);
    resetRound();
  };

  // Focus input when mode changes or new word
  useEffect(() => {
    if (!submitted && !loading && words.length > 0) {
      inputRef.current?.focus();
    }
  }, [currentIdx, submitted, loading, words.length, mode]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (complete) {
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    return (
      <div className="py-6 max-w-lg mx-auto">
        <div className="text-center py-16 space-y-6">
          <div className="w-20 h-20 rounded-full bg-[var(--purple-soft)]/15 flex items-center justify-center mx-auto">
            <Trophy size={36} className="text-[var(--peach-soft)]" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">
              {mode === 'listen' ? '听写' : '默写'}完成!
            </h1>
            <p className="text-[var(--text-secondary)] mt-2">
              正确 {stats.correct} / {stats.total}
            </p>
            <p className="text-lg font-medium text-[var(--purple-soft)] mt-1">{accuracy}% 正确率</p>
          </div>

          {leveledUp && (
            <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-4 animate-fade-in">
              <p className="text-[var(--peach-soft)] font-bold text-lg animate-bounce">
                升级了! 达到等级 {newLevel}
              </p>
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
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--pink-primary)] text-white rounded-xl transition-colors text-sm font-medium hover:opacity-90"
            >
              <RotateCcw size={16} />
              再来一轮
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (words.length === 0) {
    return (
      <div className="py-6 max-w-lg mx-auto">
        <div className="text-center py-16 space-y-6">
          <Volume2 size={48} className="text-[var(--text-placeholder)] mx-auto" />
          <h1 className="text-xl font-bold text-[var(--text-primary)]">没有可练习的单词</h1>
          <p className="text-[var(--text-secondary)] text-sm">先去导入视频学习单词吧</p>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIdx];

  return (
    <div className="py-6 max-w-lg mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">单词练习</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">
            {mode === 'listen' ? '听发音，输入韩语单词' : '看释义，默写韩语单词'}
          </p>
        </div>
      </div>

      {/* Mode tabs */}
      <div className="flex bg-[var(--bg-input)] rounded-xl p-1 gap-1">
        <button
          onClick={() => handleModeSwitch('listen')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            mode === 'listen'
              ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] shadow-sm'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
          }`}
        >
          <Mic size={16} />
          听写模式
        </button>
        <button
          onClick={() => handleModeSwitch('write')}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${
            mode === 'write'
              ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] shadow-sm'
              : 'text-[var(--text-muted)] hover:text-[var(--text-secondary)]'
          }`}
        >
          <Pencil size={16} />
          默写模式
        </button>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-[var(--text-muted)]">{currentIdx + 1} / {words.length}</span>
        <span className="text-[var(--text-muted)]">
          正确: <span className="text-[var(--mint-soft)]">{stats.correct}</span> / {stats.total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5">
        <div
          className="bg-purple-500 h-1.5 rounded-full transition-all"
          style={{ width: `${((currentIdx + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* Main card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 text-center space-y-6">
        {/* Mode: Listen — audio play button */}
        {mode === 'listen' && (
          <button
            onClick={() => { speakKorean(currentWord.word); setHasListened(true); }}
            className={`w-24 h-24 rounded-full flex items-center justify-center mx-auto transition-all relative ${
              hasListened
                ? 'bg-[var(--mint-soft)]/10 hover:bg-[var(--mint-soft)]/20'
                : 'bg-[var(--pink-primary)]/10 hover:bg-[var(--pink-primary)]/20 animate-pulse-glow'
            }`}
          >
            <Volume2 size={40} className={hasListened ? 'text-[var(--mint-soft)]' : 'text-[var(--pink-primary)]'} />
            {!hasListened && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[var(--pink-primary)] text-white text-[13px] rounded-full flex items-center justify-center animate-bounce-in">
                1
              </span>
            )}
          </button>
        )}

        {/* Mode: Write — show meaning */}
        {mode === 'write' && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-sm text-[var(--text-muted)] mb-2">请写出对应的韩语单词</p>
              <p className="text-3xl font-bold text-[var(--text-primary)]">{currentWord.meaning}</p>
              <p className="text-xs text-[var(--text-muted)] mt-1">{currentWord.partOfSpeech}</p>
            </div>
            {/* Hint: show pronunciation on demand */}
            <button
              onClick={() => speakKorean(currentWord.word)}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--bg-input)] text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--pink-pale)]/20 transition-colors"
            >
              <Eye size={14} />
              听发音提示
            </button>
          </div>
        )}

        <p className="text-[var(--text-secondary)] text-sm">
          {mode === 'listen'
            ? (hasListened ? '点击可重复播放，输入你听到的韩语' : '👆 点击按钮听发音')
            : '用韩文键盘输入正确的韩语单词'
          }
        </p>

        {/* Input area */}
        <div className="space-y-2">
          <div className="flex gap-3 relative">
            <input
              ref={inputRef}
              type="text"
              value={userInput}
              onChange={(e) => setUserInput(e.target.value)}
              onFocus={() => setKeyboardVisible(true)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !submitted) handleSubmit();
                if (e.key === 'Enter' && submitted) handleNext();
              }}
              disabled={submitted}
              placeholder={mode === 'listen' ? '输入韩语...' : '默写单词...'}
              className="flex-1 bg-[var(--bg-input)] border border-[var(--pink-pale)] rounded-xl py-3 px-4 text-[var(--text-primary)] text-center text-lg placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500"
            />
            <button
              type="button"
              onClick={() => setKeyboardVisible(!keyboardVisible)}
              className={`self-stretch px-3 rounded-xl transition-colors text-sm font-medium ${
                keyboardVisible
                  ? 'bg-[var(--pink-primary)]/20 text-[var(--pink-primary)]'
                  : 'bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--pink-pale)]/20'
              }`}
              title="韩文键盘"
            >
              한
            </button>
          </div>
        </div>

        {/* XP gain sparkle indicator */}
        {showXpGain && (
          <div className="animate-fade-in flex items-center justify-center gap-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-xl py-2 px-4">
            <Sparkles size={16} className="text-[var(--peach-soft)]" />
            <span className="text-[var(--peach-soft)] font-bold text-sm">+{xpGainAmount} XP</span>
          </div>
        )}

        {submitted && (
          <div className={`p-3 rounded-xl ${error ? 'bg-red-500/10' : 'bg-[var(--mint-soft)]/15'}`}>
            {error ? (
              <div className="flex items-center justify-center gap-2 text-red-400">
                <X size={18} />
                <span>{error}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-[var(--mint-soft)]">
                <Check size={18} />
                <span>正确!</span>
              </div>
            )}
            <p className="text-[var(--text-secondary)] text-sm mt-2">
              含义: {currentWord.meaning}
              {currentWord.pronunciation && (
                <span className="text-[var(--text-muted)] ml-2">[{currentWord.pronunciation}]</span>
              )}
            </p>
          </div>
        )}

        {leveledUp && (
          <div className="bg-gradient-to-r from-yellow-500/10 to-orange-500/10 border border-yellow-500/20 rounded-2xl p-3 animate-fade-in">
            <p className="text-[var(--peach-soft)] font-bold text-sm animate-bounce">
              升级了! 达到等级 {newLevel}
            </p>
          </div>
        )}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!userInput.trim() || (mode === 'listen' && !hasListened)}
            className="px-8 py-3 bg-[var(--purple-soft)] hover:bg-[var(--purple-soft)] disabled:bg-[var(--bg-accent)] disabled:text-[var(--text-muted)] text-white rounded-xl transition-colors text-sm font-medium"
          >
            {mode === 'listen' && !hasListened ? '请先点击播放' : '确认'}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-[var(--pink-primary)] text-white rounded-xl transition-colors text-sm font-medium mx-auto hover:opacity-90"
          >
            下一题
            <ArrowRight size={16} />
          </button>
        )}

        {/* Keyboard shortcut hint */}
        <p className="text-xs text-[var(--text-placeholder)]">Enter 确认 · Enter 下一题</p>
      </div>

      {/* Running XP counter */}
      {earnedXp > 0 && (
        <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
          <Sparkles size={14} className="text-yellow-500" />
          <span>本轮获得 <span className="text-[var(--peach-soft)] font-medium">{earnedXp} XP</span></span>
        </div>
      )}

      {/* Virtual Korean keyboard */}
      <KoreanKeyboard
        value={userInput}
        onChange={(val) => {
          setUserInput(val);
          if (mode === 'write') setHasListened(true); // don't block submission in write mode
        }}
        visible={keyboardVisible}
        onClose={() => setKeyboardVisible(false)}
      />
    </div>
  );
}
