'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Volume2, Check, X, ArrowRight, Loader2, RotateCcw, Sparkles, Star, Trophy } from 'lucide-react';
import { db } from '@/lib/db';
import { awardXp, XP_REWARDS, updateStreak } from '@/lib/gamification';
import type { Word } from '@/types';

function speakKorean(text: string, rate = 0.8) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = rate;
  utterance.pitch = 1;
  window.speechSynthesis.speak(utterance);
}

export default function DictationPage() {
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
  const inputRef = useRef<HTMLInputElement>(null);

  const loadWords = useCallback(async () => {
    const allWords = await db.words.orderBy('createdAt').reverse().limit(20).toArray();
    setWords(allWords.sort(() => Math.random() - 0.5));
    setLoading(false);
  }, []);

  const [hasListened, setHasListened] = useState(false);

  useEffect(() => { loadWords(); }, [loadWords]);

  const handleSubmit = async () => {
    if (!userInput.trim()) return;
    setSubmitted(true);

    const currentWord = words[currentIdx];
    const isCorrect = userInput.trim() === currentWord.word;

    setStats((prev) => ({
      correct: prev.correct + (isCorrect ? 1 : 0),
      total: prev.total + 1,
    }));

    if (isCorrect) {
      setError('');
      // Award XP for correct dictation answer
      const { leveledUp: didLevelUp, newLevel: lvl } = await awardXp(XP_REWARDS.dictationCorrect);
      setEarnedXp((prev) => prev + XP_REWARDS.dictationCorrect);
      if (didLevelUp) {
        setLeveledUp(true);
        setNewLevel(lvl);
      }
      // Show sparkle XP gain indicator
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
      setUserInput('');
      setSubmitted(false);
      setError('');
      setHasListened(false);
    }
  };

  const handleRestart = () => {
    setWords((prev) => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setUserInput('');
    setSubmitted(false);
    setError('');
    setHasListened(false);
    setStats({ correct: 0, total: 0 });
    setComplete(false);
    setEarnedXp(0);
    setLeveledUp(false);
    setShowXpGain(false);
  };

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
            <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">听写完成!</h1>
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
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-[var(--text-primary)] text-sm font-medium rounded-lg transition-colors"
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
          <h1 className="text-xl font-bold text-[var(--text-primary)]">没有可听写的单词</h1>
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
          <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">听写练习</h1>
          <p className="text-[var(--text-secondary)] text-sm mt-1">听发音，输入韩语单词</p>
        </div>
        <img src="/images/tori-poses/tori-pose-08.png" alt="" className="w-9 h-9 object-contain hidden sm:block" />
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

      {/* Audio play button */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 text-center space-y-6">
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

        <p className="text-[var(--text-secondary)] text-sm">
          {hasListened ? '点击可重复播放，输入你听到的韩语' : '👆 点击按钮听发音'}
        </p>

        {/* Input */}
        <div className="flex gap-3 relative">
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={(e) => setUserInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !submitted) handleSubmit();
              if (e.key === 'Enter' && submitted) handleNext();
            }}
            disabled={submitted}
            placeholder="输入韩语..."
            className="flex-1 bg-[var(--bg-input)] border border-[var(--pink-pale)] rounded-xl py-3 px-4 text-[var(--text-primary)] text-center text-lg placeholder:text-[var(--text-muted)] focus:outline-none focus:border-purple-500"
          />
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
            {submitted && (
              <p className="text-[var(--text-secondary)] text-sm mt-2">{currentWord.meaning}</p>
            )}
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
            disabled={!userInput.trim() || !hasListened}
            className="px-8 py-3 bg-[var(--purple-soft)] hover:bg-[var(--purple-soft)] disabled:bg-[var(--bg-accent)] disabled:text-[var(--text-muted)] text-white rounded-xl transition-colors text-sm font-medium"
          >
            {!hasListened ? '请先点击播放' : '确认'}
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-[var(--text-primary)] rounded-xl transition-colors text-sm font-medium mx-auto"
          >
            下一题
            <ArrowRight size={16} />
          </button>
        )}

        {/* Keyboard shortcuts hint */}
        <p className="text-xs text-[var(--text-placeholder)]">Enter 确认 · Enter 下一题</p>
      </div>

      {/* Running XP counter */}
      {earnedXp > 0 && (
        <div className="flex items-center justify-center gap-2 text-sm text-[var(--text-muted)]">
          <Sparkles size={14} className="text-yellow-500" />
          <span>本轮获得 <span className="text-[var(--peach-soft)] font-medium">{earnedXp} XP</span></span>
        </div>
      )}
    </div>
  );
}
