'use client';

import { useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Search, X, Volume2, Play, Loader2, Sparkles,
  ChevronDown, ChevronUp, BookOpen, Hash, Smile,
} from 'lucide-react';
import { vocabularyEntries } from '@/data/vocabulary/entries';
import { db } from '@/lib/db';
import type { WordEntry } from '@/types';

function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = 0.75;
  window.speechSynthesis.speak(u);
}

export default function DictionaryPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [sceneFilter, setSceneFilter] = useState<string>('全部');
  const [emotionFilter, setEmotionFilter] = useState<string>('全部');
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [masteredSet, setMasteredSet] = useState<Set<string>>(new Set());
  const [addingId, setAddingId] = useState<string | null>(null);
  const [addedIds, setAddedIds] = useState<Set<string>>(new Set());
  const [addingAll, setAddingAll] = useState(false);
  const [addedCount, setAddedCount] = useState(0);

  // Collect all unique scene tags
  const allSceneTags = useMemo(() => {
    const tags = new Set<string>();
    vocabularyEntries.forEach((e) => e.tags.forEach((t) => tags.add(t)));
    return ['全部', ...Array.from(tags).sort()];
  }, []);

  // Collect all unique emotion tags
  const allEmotionTags = useMemo(() => {
    const tags = new Set<string>();
    vocabularyEntries.forEach((e) => e.emotionTags.forEach((t) => tags.add(t)));
    return ['全部', ...Array.from(tags).sort()];
  }, []);

  // Load mastery state
  useEffect(() => {
    (async () => {
      const allUserWords = await db.words.toArray();
      const mSet = new Set(allUserWords.filter((w) => w.mastery === 'mastered').map((w) => w.word));
      setMasteredSet(mSet);
    })();
  }, []);

  // Filter results
  const results = useMemo(() => {
    let r = vocabularyEntries;

    if (searchQuery.trim()) {
      const q = searchQuery.trim().toLowerCase();
      r = r.filter(
        (e) =>
          e.korean.includes(q) ||
          e.romanization.toLowerCase().includes(q) ||
          e.baseForm.includes(q) ||
          e.meanings.some((m) => m.chinese.includes(q)) ||
          e.tags.some((t) => t.toLowerCase().includes(q)) ||
          e.examples.some((ex) => ex.chinese.includes(q) || ex.korean.includes(q))
      );
    }

    if (sceneFilter !== '全部') {
      r = r.filter((e) => e.tags.includes(sceneFilter));
    }

    if (emotionFilter !== '全部') {
      r = r.filter((e) => e.emotionTags.includes(emotionFilter));
    }

    return r;
  }, [searchQuery, sceneFilter, emotionFilter]);

  const handleAddOne = async (entry: WordEntry) => {
    setAddingId(entry.id);
    const exists = await db.words.where('word').equals(entry.korean).first();
    if (!exists) {
      await db.words.put({
        id: crypto.randomUUID(),
        word: entry.korean,
        pronunciation: entry.romanization,
        meaning: entry.meanings[0]?.chinese || '',
        partOfSpeech: entry.partOfSpeech,
        examples: entry.examples.map((ex) => ({
          text: ex.korean,
          translation: ex.chinese,
          source: 'dictionary' as const,
        })),
        sourceEntryId: entry.id,
        mastery: 'new',
        srsLevel: 0,
        easeFactor: 2.5,
        interval: 0,
        createdAt: Date.now(),
        lastReviewed: null,
        nextReview: Date.now(),
      });
    }
    setAddedIds((prev) => new Set(prev).add(entry.id));
    setAddingId(null);
  };

  const handleAddAll = async () => {
    setAddingAll(true);
    let count = 0;
    for (const entry of results) {
      const exists = await db.words.where('word').equals(entry.korean).first();
      if (!exists) {
        await db.words.put({
          id: crypto.randomUUID(),
          word: entry.korean,
          pronunciation: entry.romanization,
          meaning: entry.meanings[0]?.chinese || '',
          partOfSpeech: entry.partOfSpeech,
          examples: entry.examples.map((ex) => ({
            text: ex.korean,
            translation: ex.chinese,
            source: 'dictionary' as const,
          })),
          sourceEntryId: entry.id,
          mastery: 'new',
          srsLevel: 0,
          easeFactor: 2.5,
          interval: 0,
          createdAt: Date.now(),
          lastReviewed: null,
          nextReview: Date.now(),
        });
        count++;
      }
    }
    setAddedCount(count);
    setAddingAll(false);
  };

  return (
    <div className="py-4 space-y-5 pb-24">
      {/* Header */}
      <div>
        <Link href="/vocabulary" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} />
          返回词库
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          📖 情景词典
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          中文搜韩语，场景找单词，情绪查表达。精准匹配用法和语境。
        </p>
      </div>

      {/* Search bar */}
      <div className="relative">
        <Search
          size={18}
          className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none"
        />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="输入中文、韩文或场景… 例：好吃、餐厅、카페"
          className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl pl-10 pr-10 py-2.5 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)]/50 focus:ring-1 focus:ring-[var(--pink-primary)]/25 transition-colors"
        />
        {searchQuery && (
          <button
            onClick={() => setSearchQuery('')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Scene tag filter */}
      <div>
        <div className="flex items-center gap-1.5 mb-2">
          <Hash size={13} className="text-[var(--pink-primary)]" />
          <span className="text-xs font-medium text-[var(--text-muted)]">场景筛选</span>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-1">
          {allSceneTags.map((tag) => (
            <button
              key={tag}
              onClick={() => setSceneFilter(tag)}
              className={`shrink-0 text-xs px-3 py-1.5 rounded-full transition-colors ${
                sceneFilter === tag
                  ? 'bg-[var(--pink-primary)] text-white'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--pink-primary)]/30'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Emotion tag filter — only show if there are emotion tags */}
      {allEmotionTags.length > 1 && (
        <div>
          <div className="flex items-center gap-1.5 mb-2">
            <Smile size={13} className="text-[var(--purple-soft)]" />
            <span className="text-xs font-medium text-[var(--text-muted)]">情绪筛选</span>
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {allEmotionTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setEmotionFilter(tag)}
                className={`shrink-0 text-xs px-3 py-1.5 rounded-full transition-colors ${
                  emotionFilter === tag
                    ? 'bg-[var(--purple-soft)] text-white'
                    : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:border-[var(--purple-soft)]/30'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Result count */}
      {(searchQuery || sceneFilter !== '全部' || emotionFilter !== '全部') && (
        <p className="text-xs text-[var(--text-muted)]">
          共 {results.length} 个词条
          {searchQuery && ` · 搜索: "${searchQuery}"`}
          {sceneFilter !== '全部' && ` · 场景: ${sceneFilter}`}
          {emotionFilter !== '全部' && ` · 情绪: ${emotionFilter}`}
        </p>
      )}

      {/* Word list */}
      <div className="space-y-2">
        {results.map((entry) => {
          const isExpanded = expandedId === entry.id;
          const isMastered = masteredSet.has(entry.korean);
          const isAdded = addedIds.has(entry.id);

          return (
            <div
              key={entry.id}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
              >
                <span className="text-lg shrink-0">{entry.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[var(--text-primary)] text-sm">{entry.korean}</span>
                    <span className="text-xs text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-1.5 py-0.5 rounded">
                      [{entry.romanization}]
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-secondary)]">
                      {entry.partOfSpeech}
                    </span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-muted)]">
                      TOPIK {entry.level}级
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex gap-0.5">
                      {Array.from({ length: entry.frequency }).map((_, i) => (
                        <span key={i} className="text-[14px] text-[var(--peach-soft)]">★</span>
                      ))}
                    </div>
                    {entry.meanings.map((m, i) => (
                      <span key={i} className="text-xs text-[var(--text-secondary)]">
                        {m.chinese}{i < entry.meanings.length - 1 ? '；' : ''}
                      </span>
                    ))}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1.5">
                    {entry.tags.slice(0, 3).map((t) => (
                      <span key={t} className="text-[13px] px-1.5 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)]">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex items-center gap-1.5 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); speakKorean(entry.korean); }}
                    className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                  >
                    <Volume2 size={14} />
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleAddOne(entry); }}
                    disabled={addingId === entry.id || isAdded || isMastered}
                    className="p-1.5 rounded-lg hover:bg-[var(--mint-soft)]/10 text-[var(--text-muted)] hover:text-[var(--mint-soft)] disabled:opacity-40 transition-colors"
                    title={isMastered ? '已掌握' : isAdded ? '已添加' : '加入复习'}
                  >
                    {addingId === entry.id ? (
                      <Loader2 size={14} className="animate-spin" />
                    ) : isMastered || isAdded ? (
                      <Sparkles size={14} className="text-[var(--mint-soft)]" />
                    ) : (
                      <Play size={14} />
                    )}
                  </button>
                  {isExpanded ? <ChevronUp size={16} className="text-[var(--text-muted)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-3 animate-slide-up">
                  {/* Meanings with nuance/register */}
                  {entry.meanings.map((m, i) => (
                    <div key={i} className="bg-[var(--bg-input)] rounded-lg p-3">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        <span className="text-xs font-medium bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] px-1.5 py-0.5 rounded">
                          {m.nuance}
                        </span>
                        <span className="text-xs bg-[var(--bg-accent)] text-[var(--text-secondary)] px-1.5 py-0.5 rounded">
                          {m.register}
                        </span>
                      </div>
                      <p className="text-sm text-[var(--text-primary)]">{m.chinese}</p>
                    </div>
                  ))}

                  {/* Examples */}
                  {entry.examples.map((ex, i) => (
                    <div key={i} className="bg-[var(--bg-input)] rounded-lg p-3 flex items-start gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-[var(--text-primary)]">{ex.korean}</p>
                        <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.chinese}</p>
                        {ex.scene && (
                          <span className="inline-block text-[13px] text-[var(--text-muted)] mt-1 bg-[var(--bg-card)] px-1.5 py-0.5 rounded">
                            {ex.scene}
                          </span>
                        )}
                      </div>
                      <button
                        onClick={() => speakKorean(ex.korean)}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                  ))}

                  {/* Emotion tags */}
                  {entry.emotionTags.length > 0 && (
                    <div className="flex flex-wrap gap-1.5">
                      {entry.emotionTags.map((t) => (
                        <span key={t} className="text-xs px-2 py-0.5 rounded-full bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]">
                          {t}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {results.length === 0 && (
        <div className="text-center py-16">
          <BookOpen size={40} className="text-[var(--text-muted)] mx-auto mb-3 opacity-40" />
          <p className="text-sm text-[var(--text-secondary)]">没有找到匹配的词条</p>
          <p className="text-xs text-[var(--text-muted)] mt-1">尝试其他关键词或调整筛选条件</p>
        </div>
      )}

      {/* Bottom action bar */}
      {results.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 p-4 bg-[var(--bg-primary)] border-t border-[var(--border-color)]">
          <div className="max-w-2xl mx-auto flex items-center gap-3">
            <div className="flex-1">
              <p className="text-sm font-medium text-[var(--text-primary)]">
                {addedCount > 0
                  ? `已添加 ${addedCount} 个新词到复习队列`
                  : `${results.length} 个词条 · 筛选结果`}
              </p>
            </div>
            <button
              onClick={handleAddAll}
              disabled={addingAll || addedCount > 0}
              className="flex items-center gap-2 px-5 py-2.5 bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] disabled:bg-[var(--bg-accent)] disabled:text-[var(--text-muted)] text-white rounded-xl text-sm font-medium transition-colors shrink-0"
            >
              {addingAll ? (
                <Loader2 size={16} className="animate-spin" />
              ) : addedCount > 0 ? (
                <Sparkles size={16} />
              ) : (
                <Play size={16} />
              )}
              {addedCount > 0 ? '已加入复习' : '全部加入复习'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
