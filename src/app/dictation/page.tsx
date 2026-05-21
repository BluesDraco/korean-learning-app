'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { Volume2, Check, X, ArrowRight, Loader2, RotateCcw } from 'lucide-react';
import { db } from '@/lib/db';
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
  const inputRef = useRef<HTMLInputElement>(null);

  const loadWords = useCallback(async () => {
    const allWords = await db.words.orderBy('createdAt').reverse().limit(20).toArray();
    setWords(allWords.sort(() => Math.random() - 0.5));
    setLoading(false);
  }, []);

  useEffect(() => { loadWords(); }, [loadWords]);

  useEffect(() => {
    if (!loading && words.length > 0) {
      speakKorean(words[currentIdx].word);
      inputRef.current?.focus();
    }
  }, [currentIdx, loading, words]);

  const handleSubmit = () => {
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

  const handleNext = () => {
    if (currentIdx + 1 >= words.length) {
      setComplete(true);
    } else {
      setCurrentIdx(currentIdx + 1);
      setUserInput('');
      setSubmitted(false);
      setError('');
    }
  };

  const handleRestart = () => {
    setWords((prev) => [...prev].sort(() => Math.random() - 0.5));
    setCurrentIdx(0);
    setUserInput('');
    setSubmitted(false);
    setError('');
    setStats({ correct: 0, total: 0 });
    setComplete(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-slate-400" />
      </div>
    );
  }

  if (complete) {
    const accuracy = stats.total > 0 ? Math.round((stats.correct / stats.total) * 100) : 0;
    return (
      <div className="py-6 max-w-lg mx-auto">
        <div className="text-center py-16 space-y-6">
          <div className="w-20 h-20 rounded-full bg-purple-500/10 flex items-center justify-center mx-auto">
            <Volume2 size={36} className="text-purple-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">听写完成!</h1>
            <p className="text-slate-400 mt-2">
              正确 {stats.correct} / {stats.total}
            </p>
            <p className="text-lg font-medium text-purple-400 mt-1">{accuracy}% 正确率</p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={handleRestart}
              className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
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
          <Volume2 size={48} className="text-slate-600 mx-auto" />
          <h1 className="text-xl font-bold text-white">没有可听写的单词</h1>
          <p className="text-slate-400 text-sm">先去导入视频学习单词吧</p>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIdx];

  return (
    <div className="py-6 max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">听写练习</h1>
        <p className="text-slate-400 text-sm mt-1">听发音，输入韩语单词</p>
      </div>

      {/* Progress */}
      <div className="flex items-center justify-between text-sm">
        <span className="text-slate-500">{currentIdx + 1} / {words.length}</span>
        <span className="text-slate-500">
          正确: <span className="text-emerald-400">{stats.correct}</span> / {stats.total}
        </span>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-800 rounded-full h-1.5">
        <div
          className="bg-purple-500 h-1.5 rounded-full transition-all"
          style={{ width: `${((currentIdx + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* Audio play button */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 text-center space-y-6">
        <button
          onClick={() => speakKorean(currentWord.word)}
          className="w-24 h-24 rounded-full bg-purple-500/10 hover:bg-purple-500/20 flex items-center justify-center mx-auto transition-colors"
        >
          <Volume2 size={40} className="text-purple-400" />
        </button>

        <p className="text-slate-400 text-sm">点击播放发音，输入你听到的韩语</p>

        {/* Input */}
        <div className="flex gap-3">
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
            className="flex-1 bg-slate-800 border border-slate-700 rounded-xl py-3 px-4 text-white text-center text-lg placeholder:text-slate-500 focus:outline-none focus:border-purple-500"
          />
        </div>

        {submitted && (
          <div className={`p-3 rounded-xl ${error ? 'bg-red-500/10' : 'bg-emerald-500/10'}`}>
            {error ? (
              <div className="flex items-center justify-center gap-2 text-red-400">
                <X size={18} />
                <span>{error}</span>
              </div>
            ) : (
              <div className="flex items-center justify-center gap-2 text-emerald-400">
                <Check size={18} />
                <span>正确!</span>
              </div>
            )}
            {submitted && (
              <p className="text-slate-400 text-sm mt-2">{currentWord.meaning}</p>
            )}
          </div>
        )}

        {!submitted ? (
          <button
            onClick={handleSubmit}
            disabled={!userInput.trim()}
            className="px-8 py-3 bg-purple-600 hover:bg-purple-500 disabled:bg-slate-700 disabled:text-slate-500 text-white rounded-xl transition-colors text-sm font-medium"
          >
            确认
          </button>
        ) : (
          <button
            onClick={handleNext}
            className="flex items-center justify-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors text-sm font-medium mx-auto"
          >
            下一题
            <ArrowRight size={16} />
          </button>
        )}

        {/* Keyboard shortcuts hint */}
        <p className="text-xs text-slate-600">Enter 确认 · Enter 下一题</p>
      </div>
    </div>
  );
}
