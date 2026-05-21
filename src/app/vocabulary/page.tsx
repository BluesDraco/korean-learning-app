'use client';

import { useEffect, useState, useCallback } from 'react';
import { Search, Trash2, Filter, X } from 'lucide-react';
import { db } from '@/lib/db';
import type { Word, MasteryLevel } from '@/types';

const masteryLabel: Record<MasteryLevel, string> = {
  new: '新词', learning: '学习中', reviewing: '复习中', mastered: '已掌握',
};
const masteryColor: Record<MasteryLevel, string> = {
  new: 'bg-slate-600', learning: 'bg-yellow-500/80', reviewing: 'bg-blue-500/80', mastered: 'bg-emerald-500/80',
};

export default function VocabularyPage() {
  const [words, setWords] = useState<Word[]>([]);
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState<MasteryLevel | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const loadWords = useCallback(async () => {
    let query = db.words.orderBy('createdAt');
    if (filter !== 'all') {
      query = db.words.where('mastery').equals(filter);
    }
    const list = await query.reverse().toArray();
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      setWords(list.filter((w) => w.word.includes(q) || w.meaning.includes(q)));
    } else {
      setWords(list);
    }
  }, [search, filter]);

  useEffect(() => { loadWords(); }, [loadWords]);

  const handleDelete = async (id: string) => {
    await db.words.delete(id);
    await loadWords();
  };

  const filterOptions: { value: MasteryLevel | 'all'; label: string }[] = [
    { value: 'all', label: '全部' },
    { value: 'new', label: '新词' },
    { value: 'learning', label: '学习中' },
    { value: 'reviewing', label: '复习中' },
    { value: 'mastered', label: '已掌握' },
  ];

  return (
    <div className="py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">单词本</h1>
        <p className="text-slate-400 text-sm mt-1">共 {words.length} 个单词</p>
      </div>

      {/* Search & Filter */}
      <div className="flex gap-3">
        <div className="flex-1 relative">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索韩语或中文..."
            className="w-full bg-slate-900 border border-slate-800 rounded-lg py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:outline-none focus:border-blue-500"
          />
          {search && (
            <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-white">
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Filter pills */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {filterOptions.map((opt) => (
          <button
            key={opt.value}
            onClick={() => setFilter(opt.value)}
            className={`text-xs px-3 py-1.5 rounded-full whitespace-nowrap transition-colors ${
              filter === opt.value
                ? 'bg-blue-600 text-white'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      {/* Word List */}
      {words.length === 0 ? (
        <div className="text-center py-16">
          <Search size={48} className="text-slate-600 mx-auto mb-4" />
          <p className="text-slate-500">
            {search ? '没有找到匹配的单词' : '还没有单词，去视频里挖掘吧'}
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {words.map((word) => (
            <div key={word.id} className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
              <button
                onClick={() => setExpandedId(expandedId === word.id ? null : word.id)}
                className="w-full flex items-center justify-between p-4 text-left hover:bg-slate-800/50 transition-colors"
              >
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-white font-medium">{word.word}</span>
                    <span className="text-slate-500 text-xs">{word.pronunciation}</span>
                  </div>
                  <div className="text-slate-400 text-sm mt-0.5 line-clamp-1">{word.meaning}</div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-slate-600">{word.partOfSpeech}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${masteryColor[word.mastery]}`}>
                      {masteryLabel[word.mastery]}
                    </span>
                    {word.srsLevel > 0 && (
                      <span className="text-xs text-slate-600">SR {word.srsLevel}</span>
                    )}
                  </div>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(word.id); }}
                  className="text-slate-600 hover:text-red-400 transition-colors ml-3"
                >
                  <Trash2 size={14} />
                </button>
              </button>
              {expandedId === word.id && (
                <div className="px-4 pb-4 border-t border-slate-800 pt-3 space-y-2">
                  {word.examples.map((ex, i) => (
                    <div key={i} className="bg-slate-800 rounded-lg p-3">
                      <p className="text-sm text-white">{ex.text}</p>
                      <p className="text-xs text-slate-400 mt-1">{ex.translation}</p>
                    </div>
                  ))}
                  <div className="flex items-center gap-4 text-xs text-slate-500 pt-1">
                    <span>间隔: {word.interval < 1 ? `${Math.round(word.interval * 1440)}分钟` : `${word.interval}天`}</span>
                    <span>下次复习: {new Date(word.nextReview).toLocaleDateString('zh-CN')}</span>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
