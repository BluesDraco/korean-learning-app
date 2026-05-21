'use client';

import { useEffect, useState, useCallback, Suspense } from 'react';
import { BookOpen, Check, X, Loader2, ArrowLeft, Star } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { db } from '@/lib/db';
import { calculateSRS, QUALITY_LABELS } from '@/lib/srs';
import type { Word, ReviewSession } from '@/types';

function ReviewContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const videoId = searchParams.get('videoId');

  const [words, setWords] = useState<Word[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [complete, setComplete] = useState(false);
  const [sessionStats, setSessionStats] = useState({ reviewed: 0, passed: 0, startTime: 0 });

  const loadWords = useCallback(async () => {
    const now = Date.now();
    let dueWords: Word[];
    if (videoId) {
      dueWords = await db.words.where('sourceVideoId').equals(videoId).toArray();
    } else {
      dueWords = await db.words.where('nextReview').belowOrEqual(now).sortBy('nextReview');
      if (dueWords.length === 0) {
        dueWords = await db.words.where('mastery').anyOf('new', 'learning', 'reviewing').limit(10).toArray();
      }
    }
    setWords(dueWords);
    if (dueWords.length === 0) {
      setComplete(true);
    }
    setSessionStats({ reviewed: 0, passed: 0, startTime: Date.now() });
    setLoading(false);
  }, [videoId]);

  useEffect(() => { loadWords(); }, [loadWords]);

  const handleAnswer = async (quality: number) => {
    if (!showAnswer) {
      setShowAnswer(true);
      return;
    }

    const word = words[currentIdx];
    const result = calculateSRS(quality, word.srsLevel, word.easeFactor, word.interval);

    const newMastery = result.srsLevel >= 5 ? 'mastered' : result.srsLevel >= 3 ? 'reviewing' : 'learning';

    await db.words.update(word.id, {
      srsLevel: result.srsLevel,
      easeFactor: result.easeFactor,
      interval: result.interval,
      nextReview: result.nextReview,
      lastReviewed: Date.now(),
      mastery: newMastery as Word['mastery'],
    });

    const passed = quality >= 3;
    setSessionStats((prev) => ({
      ...prev,
      reviewed: prev.reviewed + 1,
      passed: prev.passed + (passed ? 1 : 0),
    }));

    if (currentIdx + 1 >= words.length) {
      await db.reviewSessions.put({
        id: crypto.randomUUID(),
        date: Date.now(),
        wordsReviewed: sessionStats.reviewed + 1,
        wordsPassed: sessionStats.passed + (passed ? 1 : 0),
        duration: Math.round((Date.now() - sessionStats.startTime) / 1000),
      });
      setComplete(true);
    } else {
      setCurrentIdx(currentIdx + 1);
      setShowAnswer(false);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-slate-400" />
      </div>
    );
  }

  if (complete) {
    const accuracy = sessionStats.reviewed > 0 ? Math.round((sessionStats.passed / sessionStats.reviewed) * 100) : 0;
    return (
      <div className="py-6 max-w-lg mx-auto">
        <div className="text-center py-16 space-y-6">
          <div className="w-20 h-20 rounded-full bg-emerald-500/10 flex items-center justify-center mx-auto">
            <Star size={36} className="text-emerald-400" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-white">复习完成!</h1>
            <p className="text-slate-400 mt-2">
              复习了 {sessionStats.reviewed} 个单词，通过 {sessionStats.passed} 个
            </p>
            <p className="text-lg font-medium text-emerald-400 mt-1">{accuracy}% 正确率</p>
          </div>
          <div className="flex gap-3 justify-center">
            <button
              onClick={() => loadWords()}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
            >
              再来一轮
            </button>
            <button
              onClick={() => router.push('/')}
              className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium rounded-lg transition-colors"
            >
              返回首页
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
          <BookOpen size={48} className="text-slate-600 mx-auto" />
          <div>
            <h1 className="text-xl font-bold text-white">没有待复习的单词</h1>
            <p className="text-slate-400 text-sm mt-2">去学习新单词吧</p>
          </div>
          <button
            onClick={() => router.push('/videos')}
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium rounded-lg transition-colors"
          >
            导入视频
          </button>
        </div>
      </div>
    );
  }

  const currentWord = words[currentIdx];

  return (
    <div className="py-6 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-white">
          <ArrowLeft size={20} />
        </button>
        <span className="text-sm text-slate-500">
          {currentIdx + 1} / {words.length}
        </span>
        {/* Placeholder for alignment */}
        <div className="w-5" />
      </div>

      {/* Progress bar */}
      <div className="w-full bg-slate-800 rounded-full h-1.5">
        <div
          className="bg-blue-500 h-1.5 rounded-full transition-all"
          style={{ width: `${((currentIdx + 1) / words.length) * 100}%` }}
        />
      </div>

      {/* Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8 space-y-6">
        <div className="text-center">
          <p className="text-xs text-slate-500 mb-1">
            {currentWord.partOfSpeech} · {currentWord.pronunciation}
          </p>
          <h2 className="text-3xl font-bold text-white mb-4">{currentWord.word}</h2>

          {!showAnswer ? (
            <button
              onClick={() => setShowAnswer(true)}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl transition-colors text-sm font-medium"
            >
              显示答案
            </button>
          ) : (
            <div className="space-y-3 animate-fade-in">
              <div className="bg-slate-800 rounded-xl p-4">
                <p className="text-white text-lg font-medium">{currentWord.meaning}</p>
                {currentWord.examples.length > 0 && (
                  <div className="mt-3 space-y-2">
                    {currentWord.examples.slice(0, 2).map((ex, i) => (
                      <div key={i} className="text-left">
                        <p className="text-sm text-slate-300">{ex.text}</p>
                        <p className="text-xs text-slate-500">{ex.translation}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Quality buttons */}
              <div className="grid grid-cols-3 gap-2 pt-2">
                {[0, 1, 2, 3, 4, 5].map((q) => (
                  <button
                    key={q}
                    onClick={() => handleAnswer(q)}
                    className={`px-2 py-2.5 rounded-xl text-xs font-medium transition-colors ${
                      q < 3
                        ? 'bg-red-500/10 hover:bg-red-500/20 text-red-400'
                        : q < 4
                          ? 'bg-yellow-500/10 hover:bg-yellow-500/20 text-yellow-400'
                          : 'bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400'
                    }`}
                  >
                    {QUALITY_LABELS[q]}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Session stats */}
      {sessionStats.reviewed > 0 && (
        <div className="flex items-center justify-center gap-4 text-xs text-slate-500">
          <span>已复习: {sessionStats.reviewed}</span>
          <span>通过: {sessionStats.passed}</span>
        </div>
      )}
    </div>
  );
}

export default function ReviewPage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-slate-400" />
      </div>
    }>
      <ReviewContent />
    </Suspense>
  );
}
