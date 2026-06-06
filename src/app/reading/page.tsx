'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BookOpen, Sparkles, Clock, Target, ChevronRight,
  Hash, Bookmark, TrendingUp,
} from 'lucide-react';
import { readingArticles, getTodayArticle, levelLabel, levelColor } from '@/data/reading-new';
import { db } from '@/lib/db';
import type { Article, UserArticleProgress } from '@/types';

const levelOrder: Article['level'][] = ['A0', 'A1', 'A2', 'B1', 'TOPIK'];

export default function ReadingPage() {
  const router = useRouter();
  const [filterLevel, setFilterLevel] = useState<Article['level'] | 'all'>('all');
  const [filterTopic, setFilterTopic] = useState<string | null>(null);
  const [progress, setProgress] = useState<Map<string, UserArticleProgress>>(new Map());
  const [totalRead, setTotalRead] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const all = await db.userArticleProgress.toArray();
        const map = new Map<string, UserArticleProgress>();
        for (const p of all) map.set(p.articleId, p);
        setProgress(map);
        setTotalRead(all.filter((p) => p.status === 'completed').length);
      } catch {}
    })();
  }, []);

  const todayArticle = getTodayArticle();

  let filtered = filterLevel === 'all' ? readingArticles : readingArticles.filter((a) => a.level === filterLevel);
  if (filterTopic) filtered = filtered.filter((a) => a.topic === filterTopic);

  const uniqueTopics = [...new Set(readingArticles.map((a) => a.topic))];

  // Stats
  const totalSentences = readingArticles.reduce((sum, a) => sum + a.sentences.length, 0);
  const savedCount = [...progress.values()].reduce((sum, p) => sum + p.savedSentenceIds.length + p.savedWordIds.length, 0);

  return (
    <div className="py-4 space-y-5 max-w-2xl mx-auto md:max-w-3xl">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          <BookOpen size={22} className="text-[var(--mint-soft)]" />
          文章阅读
        </h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">
          分级输入 · 句子点读 · 词句沉淀 · 理解检测 · 轻输出
        </p>
      </div>

      {/* Stats bar */}
      {totalRead > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center justify-around">
          <div className="text-center">
            <p className="text-lg font-extrabold text-[var(--mint-soft)]">{totalRead}</p>
            <p className="text-[10px] text-[var(--text-muted)]">已读文章</p>
          </div>
          <div className="w-px h-8 bg-[var(--border-color)]" />
          <div className="text-center">
            <p className="text-lg font-extrabold text-[var(--pink-primary)]">{totalSentences}</p>
            <p className="text-[10px] text-[var(--text-muted)]">可读句子</p>
          </div>
          <div className="w-px h-8 bg-[var(--border-color)]" />
          <div className="text-center">
            <p className="text-lg font-extrabold text-[var(--purple-soft)]">{savedCount || 0}</p>
            <p className="text-[10px] text-[var(--text-muted)]">收藏词句</p>
          </div>
        </div>
      )}

      {/* Today's reading */}
      <div className="bg-gradient-to-br from-[var(--mint-soft)]/10 to-[var(--pink-primary)]/10 border-2 border-[var(--mint-soft)]/20 rounded-3xl p-6 space-y-4">
        <div className="flex items-center gap-2">
          <Sparkles size={20} className="text-[var(--mint-soft)]" />
          <span className="text-sm font-bold text-[var(--text-primary)]">今日阅读</span>
          <span className="text-[10px] text-[var(--text-muted)] ml-auto">~{todayArticle.estimatedMinutes} 分钟</span>
        </div>

        <div>
          <h2 className="text-lg font-bold text-[var(--text-primary)]">
            {todayArticle.emoji} {todayArticle.title}
          </h2>
          <p className="text-xs text-[var(--text-secondary)] mt-1">{todayArticle.titleKo}</p>
        </div>

        <div className="space-y-1.5">
          <p className="text-xs text-[var(--text-muted)]">你会学到：</p>
          {todayArticle.learningGoals.map((g, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-[var(--text-secondary)]">
              <Target size={12} className="text-[var(--mint-soft)] shrink-0" />
              {g}
            </div>
          ))}
        </div>

        <button
          onClick={() => router.push(`/reading/${todayArticle.id}`)}
          className="w-full py-3.5 bg-[var(--mint-soft)] text-white rounded-2xl font-bold text-sm active:scale-[0.97] transition-all"
        >
          开始阅读
        </button>
      </div>

      {/* Level filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        <button
          onClick={() => { setFilterLevel('all'); setFilterTopic(null); }}
          className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
            filterLevel === 'all' && !filterTopic
              ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium'
              : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
          }`}
        >
          全部
        </button>
        {levelOrder.map((level) => {
          const count = readingArticles.filter((a) => a.level === level).length;
          return (
            <button
              key={level}
              onClick={() => { setFilterLevel(filterLevel === level ? 'all' : level); setFilterTopic(null); }}
              className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                filterLevel === level
                  ? `${levelColor[level]} font-medium ring-1 ring-[var(--pink-pale)]`
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
              }`}
            >
              {levelLabel[level]} · {count}
            </button>
          );
        })}
      </div>

      {/* Topic chips */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {uniqueTopics.map((topic) => (
          <button
            key={topic}
            onClick={() => setFilterTopic(filterTopic === topic ? null : topic)}
            className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors shrink-0 ${
              filterTopic === topic
                ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)] font-medium'
                : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
            }`}
          >
            <Hash size={10} className="inline mr-1" />
            {topic}
          </button>
        ))}
      </div>

      {/* Article cards */}
      <div>
        <p className="text-sm font-bold text-[var(--text-primary)] mb-3">
          {filterTopic ? `${filterTopic} · ` : ''}{filtered.length} 篇文章
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {filtered.map((article) => {
            const pro = progress.get(article.id);
            const isRead = pro?.status === 'completed';
            return (
              <button
                key={article.id}
                onClick={() => router.push(`/reading/${article.id}`)}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-left hover:border-[var(--mint-soft)]/30 hover:-translate-y-0.5 transition-all duration-200 group"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="w-12 h-12 rounded-xl bg-[var(--mint-soft)]/10 flex items-center justify-center text-2xl">
                    {article.emoji}
                  </div>
                  <div className="flex items-center gap-1.5">
                    {isRead && (
                      <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]">
                        已读
                      </span>
                    )}
                    <span className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${levelColor[article.level]}`}>
                      {levelLabel[article.level]}
                    </span>
                  </div>
                </div>
                <h3 className="font-semibold text-[var(--text-primary)] text-sm mb-1">{article.title}</h3>
                <p className="text-xs text-[var(--text-muted)] mb-2">{article.titleKo}</p>
                <p className="text-xs text-[var(--text-secondary)] line-clamp-2 mb-3">
                  {article.learningGoals.slice(0, 2).join(' · ')}
                </p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-[10px] text-[var(--text-muted)]">
                    <span className="flex items-center gap-0.5"><Clock size={10} />{article.estimatedMinutes}分钟</span>
                    <span>{article.sentences.length}句</span>
                  </div>
                  <ChevronRight size={14} className="text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            );
          })}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-16">
            <BookOpen size={40} className="text-[var(--text-placeholder)] mx-auto mb-3" />
            <p className="text-[var(--text-secondary)] text-sm">这个等级的文章正在准备中</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">你可以先读 A0 入门文章</p>
          </div>
        )}
      </div>

      {/* Progress summary */}
      {totalRead > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center gap-3">
          <div className="p-2.5 rounded-xl bg-[var(--mint-soft)]/10">
            <TrendingUp size={20} className="text-[var(--mint-soft)]" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-bold text-[var(--text-primary)]">阅读能力进度</p>
            <p className="text-xs text-[var(--text-muted)]">
              已读 {totalRead} 篇 · 收藏 {savedCount} 项 · {readingArticles.length} 篇待探索
            </p>
          </div>
          {progress.size > 0 && (
            <button
              onClick={() => { setFilterLevel('all'); setFilterTopic(null); }}
              className="text-xs text-[var(--pink-primary)] hover:underline shrink-0"
            >
              继续阅读
            </button>
          )}
        </div>
      )}

      {/* Collection section */}
      {savedCount > 0 && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
          <div className="flex items-center gap-2 mb-3">
            <Bookmark size={16} className="text-[var(--purple-soft)]" />
            <span className="text-sm font-bold text-[var(--text-primary)]">我的收藏</span>
          </div>
          <p className="text-xs text-[var(--text-secondary)]">
            {savedCount} 个收藏词句正在帮你积累真实表达
          </p>
        </div>
      )}

      {/* Bottom tip */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <p className="text-sm font-bold text-[var(--text-primary)] mb-1">阅读建议</p>
        <p className="text-xs text-[var(--text-muted)]">
          每篇文章 3-5 分钟。先看核心词预热，一句一句读，遇到不认识的词点一下就能看解释。读完做 3 道题巩固，最后用句型说一句自己的话——这才是完整的阅读训练。
        </p>
      </div>
    </div>
  );
}
