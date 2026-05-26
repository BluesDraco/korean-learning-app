'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { Search, Volume2, BookmarkPlus, ChevronDown, ExternalLink, Loader2 } from 'lucide-react';
import { speak } from '@/lib/tts';
import { db } from '@/lib/db';

interface DictMeaning { sense: string; zh: string; ko: string; }

interface SearchResult {
  w: string; h: string; p: string; d: string; pt: string[];
}

interface DictEntry {
  w: string; h: string; p: string; d: string; kd: string;
  m: DictMeaning[]; pt: string[];
}

export default function DictionaryPage() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [detail, setDetail] = useState<DictEntry | null>(null);
  const [detailLoading, setDetailLoading] = useState(false);
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
  }, [query]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') doSearch(1);
  };

  const fetchDetail = async (word: string) => {
    if (expanded === word) { setExpanded(null); setDetail(null); return; }
    setExpanded(word);
    setDetailLoading(true);
    try {
      const res = await fetch(`/api/dict/word/${encodeURIComponent(word)}`);
      if (res.ok) setDetail(await res.json());
      else setDetail(null);
    } finally {
      setDetailLoading(false);
    }
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

  const totalPages = Math.ceil(total / 20);

  return (
    <div className="max-w-3xl mx-auto py-4 space-y-4">
      {/* Header */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'Nunito', sans-serif" }}>
          📖 韩语字典
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          收录 85,000+ 词条，来自国立国语院韩国语基础词典
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
      <div className="space-y-2">
        {results.map((r) => (
          <div key={r.w} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden transition-all">
            {/* Summary row */}
            <button
              onClick={() => fetchDetail(r.w)}
              className="w-full flex items-center justify-between px-4 py-3 text-left hover:bg-[var(--bg-soft)] transition-colors"
            >
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <span className="text-base font-bold text-[var(--text-primary)] ko-body">{r.w}</span>
                  {r.h && <span className="text-xs text-[var(--text-muted)]">〔{r.h}〕</span>}
                  <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-soft)] text-[var(--text-muted)]">
                    {r.p.replace(/[⭐]/g, '').trim()}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-0.5 truncate">{r.d}</p>
              </div>
              <ChevronDown
                size={18}
                className={`text-[var(--text-muted)] shrink-0 ml-2 transition-transform ${expanded === r.w ? 'rotate-180' : ''}`}
              />
            </button>

            {/* Expanded detail */}
            {expanded === r.w && (
              <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3">
                {detailLoading ? (
                  <div className="flex items-center justify-center py-4">
                    <Loader2 size={20} className="animate-spin text-[var(--pink-primary)]" />
                  </div>
                ) : detail ? (
                  <div className="space-y-3">
                    {/* Word header */}
                    <div className="flex items-center gap-3">
                      <span className="text-xl font-bold text-[var(--text-primary)] ko-body">{detail.w}</span>
                      {detail.h && <span className="text-sm text-[var(--text-muted)]">〔{detail.h}〕</span>}
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">
                        {detail.p.replace(/[⭐]/g, '').trim()}
                      </span>
                      {/* TTS */}
                      <button
                        onClick={(e) => handleSpeak(detail.w, e)}
                        className="p-1.5 rounded-lg hover:bg-[var(--bg-soft)] text-[var(--pink-primary)] transition-colors"
                      >
                        <Volume2 size={16} />
                      </button>
                    </div>

                    {/* Meanings */}
                    {detail.m && detail.m.length > 0 && detail.m[0].zh !== '' && (
                      <div>
                        <h4 className="text-xs font-semibold text-[var(--text-muted)] mb-1.5">释义</h4>
                        <ul className="space-y-1.5">
                          {detail.m.map((m, i) => (
                            <li key={i} className="flex items-start gap-2 text-sm">
                              {m.sense && (
                                <span className="text-[var(--pink-primary)] font-bold text-xs mt-0.5 shrink-0">{m.sense}.</span>
                              )}
                              <span className="text-[var(--text-secondary)]">{m.zh}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {/* Korean definition */}
                    {detail.kd && detail.kd.length > 5 && (
                      <div>
                        <h4 className="text-xs font-semibold text-[var(--text-muted)] mb-1">韩国语解释</h4>
                        <p className="text-sm text-[var(--text-secondary)] ko-body">{detail.kd}</p>
                      </div>
                    )}

                    {/* Sentence patterns */}
                    {detail.pt && detail.pt.length > 0 && (
                      <div>
                        <h4 className="text-xs font-semibold text-[var(--text-muted)] mb-1">句型</h4>
                        <div className="flex flex-wrap gap-1.5">
                          {detail.pt.map((p, i) => (
                            <span key={i} className="text-xs px-2 py-1 rounded-lg bg-[var(--bg-soft)] text-[var(--text-primary)] ko-body font-medium">
                              {p}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Actions */}
                    <div className="flex items-center gap-2 pt-2 border-t border-[var(--border-color)]">
                      <button
                        onClick={(e) => handleAddWord(r, e)}
                        className={`flex items-center gap-1.5 text-xs px-4 py-2 rounded-lg font-medium transition-all ${
                          addedWord === r.w
                            ? 'bg-emerald-50 text-emerald-500'
                            : 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20'
                        }`}
                      >
                        <BookmarkPlus size={14} />
                        {addedWord === r.w ? '已加入' : '加入单词本'}
                      </button>
                      <a
                        href={`https://krdict.korean.go.kr/chn/dicSearch/search?nation=chn&nationCode=6&searchWord=${encodeURIComponent(detail.w)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 text-xs px-3 py-2 rounded-lg text-[var(--text-muted)] hover:bg-[var(--bg-soft)] transition-colors"
                      >
                        <ExternalLink size={12} />
                        在 KRDict 查看
                      </a>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-[var(--text-muted)] py-2">未找到详细释义</p>
                )}
              </div>
            )}
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

      {/* Attribution */}
      <div className="text-center pt-6 pb-8">
        <p className="text-[10px] text-[var(--text-muted)]">
          数据来源：국립국어원 한국어기초사전 (CC BY-SA 2.0 KR) · 通过 yomitan-ko-dic 项目转换
        </p>
      </div>
    </div>
  );
}
