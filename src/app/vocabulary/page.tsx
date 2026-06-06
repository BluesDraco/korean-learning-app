'use client';

import { useEffect, useState, useCallback, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import {
  BookOpen, Clock, ArrowRight, Library, Bookmark,
  Sparkles, Target, TrendingUp, MessageSquare, Trash2, Volume2,
} from 'lucide-react';
import { db } from '@/lib/db';
import { ThemesSection } from '@/components/vocabulary/ThemesSection';
import { BooksSection } from '@/components/vocabulary/BooksSection';
import { VocabularySession } from '@/components/vocabulary/VocabularySession';
import { speak, speakWord } from '@/lib/tts';
import type { Word, MasteryLevel } from '@/types';

interface SavedSentence {
  id: string;
  userId?: string;
  korean: string;
  chinese: string;
  source?: string;
  sourceType?: string;
  clipId?: string;
  createdAt?: number;
}

const masteryColor: Record<MasteryLevel, string> = {
  new: 'bg-slate-500',
  learning: 'bg-yellow-400',
  reviewing: 'bg-blue-400',
  mastered: 'bg-emerald-400',
};

function VocabularyContent() {
  const searchParams = useSearchParams();
  const urlTab = searchParams.get('tab');
  const [allWords, setAllWords] = useState<Word[]>([]);
  const [loading, setLoading] = useState(true);
  const [showSession, setShowSession] = useState(false);
  const [tab, setTab] = useState<'home' | 'library' | 'books' | 'sentences'>(
    urlTab === 'sentences' ? 'sentences' : 'home'
  );
  const [sentences, setSentences] = useState<SavedSentence[]>([]);
  const [sentencesLoading, setSentencesLoading] = useState(false);

  const loadWords = useCallback(async () => {
    setLoading(true);
    const list = await db.words.orderBy('createdAt').reverse().toArray();
    setAllWords(list);
    setLoading(false);
  }, []);

  useEffect(() => { loadWords(); }, [loadWords]);

  useEffect(() => {
    if (tab !== 'sentences') return;
    setSentencesLoading(true);
    db.sentences.orderBy('createdAt').reverse().toArray()
      .then((list) => { setSentences(list as SavedSentence[]); setSentencesLoading(false); })
      .catch(() => setSentencesLoading(false));
  }, [tab]);

  // Stats
  const stats = useMemo(() => {
    const now = Date.now();
    const dueReview = allWords.filter((w) => w.nextReview <= now && w.mastery !== 'mastered').length;
    const mastered = allWords.filter((w) => w.mastery === 'mastered').length;
    const learning = allWords.filter((w) => w.mastery === 'learning' || w.mastery === 'reviewing').length;
    const difficult = allWords.filter((w) => w.mastery === 'new' && w.srsLevel > 0 && w.easeFactor < 2.0).length;
    const newWords = allWords.filter((w) => w.mastery === 'new').length;
    return { dueReview, mastered, learning, difficult, newWords, total: allWords.length };
  }, [allWords]);

  const progressPct = stats.total > 0 ? Math.round((stats.mastered / stats.total) * 100) : 0;

  if (showSession) {
    return (
      <VocabularySession
        words={allWords}
        onClose={() => { setShowSession(false); loadWords(); }}
      />
    );
  }

  // ── Library tab ──
  if (tab === 'library') {
    return (
      <div className="py-4 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setTab('home')} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">← 返回</button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">全部词库</h1>
        </div>
        <Link href="/vocabulary/library" className="block bg-gradient-to-r from-[var(--pink-primary)]/10 to-[var(--purple-soft)]/10 border border-[var(--pink-pale)] rounded-2xl p-4 hover:border-[var(--pink-primary)]/30 transition-all group">
          <div className="flex items-center gap-3">
            <Library size={28} className="text-[var(--pink-primary)]" />
            <div className="flex-1">
              <p className="text-sm font-bold text-[var(--text-primary)]">词库</p>
              <p className="text-xs text-[var(--text-secondary)]">主题词包 · 分级词表 · 延世教材 · 情景词典</p>
            </div>
            <ArrowRight size={18} className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform" />
          </div>
        </Link>
        {/* Show all words with search/filter — simplified from original */}
        <p className="text-sm text-[var(--text-muted)] mt-4">
          共 {allWords.length} 个单词 ·
          已掌握 {stats.mastered} · 学习中 {stats.learning} · 新词 {stats.newWords}
        </p>
        <div className="space-y-2 mt-3">
          {allWords.slice(0, 50).map((w) => (
            <div key={w.id} className="flex items-center justify-between bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-3">
              <div>
                <span className="font-medium text-[var(--text-primary)]">{w.word}</span>
                <span className="text-xs text-[var(--text-muted)] ml-2">{w.meaning}</span>
              </div>
              <span className={`w-2 h-2 rounded-full ${masteryColor[w.mastery]}`} />
            </div>
          ))}
          {allWords.length > 50 && (
            <p className="text-center text-xs text-[var(--text-muted)] py-4">
              还有 {allWords.length - 50} 个单词...
            </p>
          )}
        </div>
      </div>
    );
  }

  // ── Books tab ──
  if (tab === 'books') {
    return (
      <div className="py-4 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setTab('home')} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">← 返回</button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">我的单词本</h1>
        </div>
        <BooksSection />
      </div>
    );
  }

  // ── Sentences tab ──
  if (tab === 'sentences') {
    const handleDeleteSentence = async (id: string) => {
      await db.sentences.delete(id);
      setSentences((prev) => prev.filter((s) => s.id !== id));
    };

    return (
      <div className="py-4 space-y-4">
        <div className="flex items-center gap-3">
          <button onClick={() => setTab('home')} className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)]">← 返回</button>
          <h1 className="text-xl font-bold text-[var(--text-primary)]">我的句子</h1>
        </div>

        {sentencesLoading ? (
          <div className="flex items-center justify-center py-20">
            <div className="w-8 h-8 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
          </div>
        ) : sentences.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
            <div className="w-20 h-20 rounded-2xl bg-[var(--bg-input)]/60 flex items-center justify-center mb-5">
              <MessageSquare size={36} className="text-[var(--text-placeholder)]" />
            </div>
            <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">还没有保存句子</h2>
            <p className="text-sm text-[var(--text-muted)] max-w-xs mb-6">
              在内容拆解、影子跟读或阅读中保存句子，会出现在这里
            </p>
            <Link href="/ai/analyze" className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white font-medium">
              去拆解韩语句子 <ArrowRight size={14} />
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-[var(--text-muted)]">共 {sentences.length} 条句子</p>
            {sentences.map((s) => (
              <div
                key={s.id}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 space-y-2"
              >
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[15px] font-bold text-[var(--text-primary)] leading-relaxed flex-1" style={{ fontFamily: "system-ui, sans-serif" }}>
                    {s.korean}
                  </p>
                  <div className="flex items-center gap-1 shrink-0">
                    <button
                      onClick={() => speakWord(s.korean, 0.75)}
                      className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                      title="听发音"
                    >
                      <Volume2 size={14} />
                    </button>
                    <button
                      onClick={() => handleDeleteSentence(s.id)}
                      className="p-1.5 rounded-lg hover:bg-red-50 text-[var(--text-muted)] hover:text-red-500 transition-colors"
                      title="删除"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
                <p className="text-sm text-[var(--text-secondary)]">{s.chinese}</p>
                <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
                  {s.sourceType && (
                    <span className="px-1.5 py-0.5 rounded bg-[var(--bg-input)]">
                      {s.sourceType === 'analysis' ? '内容拆解' :
                       s.sourceType === 'shadowing' ? '影子跟读' :
                       s.sourceType === 'reading' ? '阅读' : s.sourceType}
                    </span>
                  )}
                  {s.createdAt && (
                    <span>{new Date(s.createdAt).toLocaleDateString('zh-CN')}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ═══════════════════════════════════════════════════════════════
  //  Home tab — "Today's Task" view
  // ═══════════════════════════════════════════════════════════════
  return (
    <div className="py-4 space-y-5 max-w-2xl mx-auto md:max-w-3xl">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <BookOpen size={22} className="text-[var(--pink-primary)]" />
            词汇学习
          </h1>
          {!loading && allWords.length > 0 && (
            <div className="flex items-center gap-3 mt-1.5 text-xs text-[var(--text-muted)]">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-[var(--pink-primary)]" />待复习 {stats.dueReview}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-emerald-400" />已掌握 {stats.mastered}</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-yellow-400" />学习中 {stats.learning}</span>
            </div>
          )}
        </div>
        <Link href="/review" className="flex items-center gap-1.5 text-xs px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--pink-primary)] transition-colors">
          <Clock size={14} />
          自由复习
        </Link>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-8 h-8 border-2 border-slate-600 border-t-blue-400 rounded-full animate-spin" />
        </div>
      ) : allWords.length === 0 ? (
        /* Empty state */
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="w-20 h-20 rounded-2xl bg-[var(--bg-input)]/60 flex items-center justify-center mb-5">
            <BookOpen size={36} className="text-[var(--text-placeholder)]" />
          </div>
          <h2 className="text-lg font-semibold text-[var(--text-primary)] mb-2">还没有单词</h2>
          <p className="text-sm text-[var(--text-muted)] max-w-xs mb-6">从场景词包或课程开始你的韩语学习之旅</p>
          <Link href="/vocabulary/library" className="flex items-center gap-2 text-sm px-5 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white font-medium">
            浏览词库 <ArrowRight size={14} />
          </Link>
        </div>
      ) : (
        <>
          {/* Today's Task Card */}
          <div className="bg-gradient-to-br from-[var(--pink-primary)]/10 to-[var(--purple-soft)]/10 border-2 border-[var(--pink-pale)] rounded-3xl p-6 space-y-4">
            <div className="flex items-center gap-2">
              <Target size={20} className="text-[var(--pink-primary)]" />
              <span className="text-sm font-bold text-[var(--text-primary)]">今日词汇任务</span>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="bg-[var(--bg-card)]/80 rounded-2xl p-3 text-center">
                <p className="text-2xl font-extrabold text-[var(--pink-primary)]">{stats.dueReview}</p>
                <p className="text-[10px] text-[var(--text-muted)]">待复习</p>
              </div>
              <div className="bg-[var(--bg-card)]/80 rounded-2xl p-3 text-center">
                <p className="text-2xl font-extrabold text-[var(--purple-soft)]">{Math.min(stats.newWords, 5)}</p>
                <p className="text-[10px] text-[var(--text-muted)]">推荐新词</p>
              </div>
              <div className="bg-[var(--bg-card)]/80 rounded-2xl p-3 text-center">
                <p className="text-2xl font-extrabold text-[var(--text-muted)]">~3</p>
                <p className="text-[10px] text-[var(--text-muted)]">分钟</p>
              </div>
            </div>

            <button
              onClick={() => setShowSession(true)}
              disabled={stats.dueReview === 0 && stats.newWords === 0}
              className="w-full py-3.5 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-all disabled:opacity-40"
            >
              {stats.dueReview === 0 && stats.newWords === 0 ? '暂无待复习词汇' : '开始今日词汇练习'}
            </button>
          </div>

          {/* Progress */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <TrendingUp size={16} className="text-[var(--mint-soft)]" />
              <span className="text-sm font-bold text-[var(--text-primary)]">我的词汇进度</span>
            </div>
            <div className="flex justify-between text-xs text-[var(--text-muted)] mb-1.5">
              <span>已掌握 {stats.mastered}</span>
              <span>学习中 {stats.learning}</span>
              <span>易错 {stats.difficult}</span>
            </div>
            <div className="w-full bg-[var(--bg-input)] rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[var(--mint-soft)] to-[var(--pink-primary)] transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <p className="text-[10px] text-[var(--text-muted)] mt-1.5">{progressPct}% 掌握率</p>
          </div>

          {/* Scene Packs */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Sparkles size={16} className="text-[var(--peach-soft)]" />
                <span className="text-sm font-bold text-[var(--text-primary)]">场景词包</span>
              </div>
              <Link href="/vocabulary/library" className="text-xs text-[var(--pink-primary)] hover:underline">
                查看全部
              </Link>
            </div>
            <ThemesSection />
          </div>

          {/* Bottom links */}
          <div className="flex gap-3">
            <button
              onClick={() => setTab('library')}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Library size={16} />
              全部词库
            </button>
            <button
              onClick={() => setTab('books')}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <Bookmark size={16} />
              我的单词本
            </button>
            <button
              onClick={() => setTab('sentences')}
              className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <MessageSquare size={16} />
              我的句子
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function VocabularyPage() {
  return (
    <Suspense>
      <VocabularyContent />
    </Suspense>
  );
}
