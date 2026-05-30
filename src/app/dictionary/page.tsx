'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Search, Volume2, BookmarkPlus, ExternalLink, Loader2 } from 'lucide-react';
import { speak } from '@/lib/tts';
import { db } from '@/lib/db';

interface DictMeaning { sense: string; zh: string; ko: string; }

interface SearchResult {
  w: string; h: string; p: string; d: string; m: DictMeaning[]; pt: string[];
}

export default function DictionaryPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [addedWord, setAddedWord] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const doSearch = useCallback(async (p = 1) => {
    if (!query.trim()) { setResults([]); setTotal(0); return; }
    setLoading(true);
    try {
      const res = await fetch(`/api/dict?q=${encodeURIComponent(query)}&page=${p}&size=20`);
      const data = await res.json();
      setResults(data.results);
      setTotal(data.total);
      setPage(p);
    } finally {
      setLoading(false);
    }
  }, [query]);

  useEffect(() => {
    const t = setTimeout(() => { if (query.trim()) doSearch(1); }, 300);
    return () => clearTimeout(t);
  }, [query, doSearch]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') doSearch(1);
  };

  const handleSpeak = (word: string, e: React.MouseEvent) => {
    e.stopPropagation();
    speak(word);
  };

  const handleAddWord = async (entry: SearchResult, e: React.MouseEvent) => {
    e.stopPropagation();
    await db.words.put({
      id: `dict-${entry.w}`,
      word: entry.w,
      pronunciation: '',
      meaning: entry.d,
      partOfSpeech: entry.p,
      examples: [],
      sourceEntryId: entry.w,
      mastery: 'new' as const,
      srsLevel: 0,
      nextReview: Date.now(),
      easeFactor: 2.5,
      interval: 0,
      createdAt: Date.now(),
      lastReviewed: null,
    });
    setAddedWord(entry.w);
    setTimeout(() => setAddedWord(null), 2000);
  };

  const cleanPos = (p: string) => (p || '').replace(/[⭐]/g, '').trim() || '';
  const totalPages = Math.ceil(total / 20);

  return (
    <div className="max-w-2xl mx-auto py-4 space-y-4">
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}>
          📖 韩语字典
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          收录 44,000+ 词条，来自国立国语院韩国语基础词典
        </p>
      </div>

      {/* Search bar */}
      <div className="relative">
        <div className="flex items-center bg-[var(--bg-card)] border-2 border-[var(--border-color)] focus-within:border-[var(--pink-primary)] rounded-2xl px-4 py-3 transition-colors shadow-sm">
          <Search size={18} className="text-[var(--text-muted)] mr-2 shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="搜索韩文或中文..."
            className="flex-1 bg-transparent text-sm outline-none text-[var(--text-primary)] placeholder:text-[var(--text-placeholder)]"
            autoFocus
          />
          {loading && <Loader2 size={18} className="animate-spin text-[var(--pink-primary)] shrink-0" />}
        </div>
      </div>

      {/* Results count */}
      {query.trim() && !loading && (
        <p className="text-xs text-[var(--text-muted)]">
          {total > 0 ? `找到 ${total} 个结果` : '未找到匹配词条'}
        </p>
      )}

      {/* Results list */}
      <div className="space-y-3">
        {results.map((r) => (
          <div key={r.w} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl px-4 py-3">
            {/* Word header row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <span className="text-lg font-bold text-[var(--text-primary)] ko-body">{r.w}</span>
                {r.h && <span className="text-xs text-[var(--text-muted)]">〔{r.h}〕</span>}
                {cleanPos(r.p) && (
                  <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-soft)] text-[var(--text-muted)] shrink-0">
                    {cleanPos(r.p)}
                  </span>
                )}
              </div>
              <button
                onClick={(e) => handleSpeak(r.w, e)}
                className="p-1.5 rounded-lg hover:bg-[var(--bg-soft)] text-[var(--pink-primary)] transition-colors shrink-0"
                title="听发音"
              >
                <Volume2 size={16} />
              </button>
            </div>

            {/* Meanings — inline, no expand needed */}
            {r.m && r.m.length > 0 && r.m[0].zh ? (
              <ul className="space-y-1 mb-2">
                {r.m.slice(0, 6).map((m, i) => (
                  <li key={i} className="flex items-start gap-1.5 text-sm">
                    {m.sense && (
                      <span className="text-[var(--pink-primary)] font-bold text-xs mt-0.5 shrink-0 w-4">{m.sense}.</span>
                    )}
                    <span className="text-[var(--text-secondary)]">{m.zh}</span>
                  </li>
                ))}
                {r.m.length > 6 && (
                  <li className="text-xs text-[var(--text-muted)] pl-5">...共 {r.m.length} 个释义</li>
                )}
              </ul>
            ) : (
              <p className="text-sm text-[var(--text-secondary)] mb-2">{r.d}</p>
            )}

            {/* Sentence patterns */}
            {r.pt && r.pt.length > 0 && (
              <div className="flex flex-wrap gap-1 mb-2">
                {r.pt.slice(0, 4).map((p, i) => (
                  <span key={i} className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-soft)] text-[var(--text-primary)] ko-body">
                    {p}
                  </span>
                ))}
              </div>
            )}

            {/* Action buttons */}
            <div className="flex items-center gap-2 pt-1 border-t border-[var(--border-color)]">
              <button
                onClick={(e) => handleAddWord(r, e)}
                className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg font-medium transition-all ${
                  addedWord === r.w
                    ? 'bg-emerald-50 text-emerald-500'
                    : 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20'
                }`}
              >
                <BookmarkPlus size={13} />
                {addedWord === r.w ? '已加入' : '加入单词本'}
              </button>
              <a
                href={`https://krdict.korean.go.kr/chn/dicSearch/search?nation=chn&nationCode=6&searchWord=${encodeURIComponent(r.w)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-xs px-2 py-1.5 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-soft)] transition-colors"
              >
                <ExternalLink size={11} />
                KRDict
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-3 pt-2">
          <button
            onClick={() => doSearch(Math.max(1, page - 1))}
            disabled={page === 1}
            className="px-4 py-2 text-xs rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] disabled:opacity-30 hover:border-[var(--pink-primary)] transition-colors"
          >
            上一页
          </button>
          <span className="text-xs text-[var(--text-muted)]">{page} / {totalPages}</span>
          <button
            onClick={() => doSearch(page + 1)}
            disabled={page >= totalPages}
            className="px-4 py-2 text-xs rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] disabled:opacity-30 hover:border-[var(--pink-primary)] transition-colors"
          >
            下一页
          </button>
        </div>
      )}

      {/* Empty state */}
      {!query.trim() && !loading && (
        <div className="text-center py-12">
          <Search size={40} className="mx-auto text-[var(--text-muted)]/30 mb-3" />
          <p className="text-sm text-[var(--text-muted)]">输入韩文或中文开始搜索</p>
        </div>
      )}

      {/* Attribution */}
      <div className="text-center pt-6 pb-8">
        <p className="text-[10px] text-[var(--text-muted)]">
          数据来源：국립국어원 한국어기초사전 (CC BY-SA 2.0 KR) · 通过 yomitan-ko-dic 项目转换
        </p>
      </div>
    </div>
  );
}
