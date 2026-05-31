'use client';

import { useState, useMemo } from 'react';
import { Search, X, Flame, Volume2, BookmarkPlus, BookmarkCheck } from 'lucide-react';
import { idioms, slangs, loanwords } from '@/data/expressions';
import { speak } from '@/lib/tts';
import { db } from '@/lib/db';

type SubTab = 'idioms' | 'slang' | 'loanword';

export function ExpressionsSection() {
  const [subTab, setSubTab] = useState<SubTab>('idioms');
  const [search, setSearch] = useState('');

  const [addedExprIds, setAddedExprIds] = useState<Set<string>>(new Set());
  const [addingExprId, setAddingExprId] = useState<string | null>(null);

  const handleSaveExpr = async (exprId: string, expression: string, meaning: string, example: string, exampleZh: string) => {
    setAddingExprId(exprId);
    const exists = await db.words.where('word').equals(expression).first();
    if (!exists) {
      await db.words.put({
        id: crypto.randomUUID(),
        word: expression,
        pronunciation: '',
        meaning,
        partOfSpeech: 'expression',
        examples: [{ text: example, translation: exampleZh, source: 'manual' as const }],
        mastery: 'new',
        srsLevel: 0,
        easeFactor: 2.5,
        interval: 0,
        createdAt: Date.now(),
        lastReviewed: null,
        nextReview: Date.now(),
      });
    }
    setAddedExprIds((prev) => new Set(prev).add(exprId));
    setAddingExprId(null);
  };

  const filteredIdioms = useMemo(() => {
    if (!search.trim()) return idioms;
    const q = search.toLowerCase();
    return idioms.filter((i) => i.expression.includes(q) || i.literalMeaning.includes(q) || i.actualMeaning.includes(q) || i.chineseEquivalent.includes(q));
  }, [search]);

  const filteredSlangs = useMemo(() => {
    if (!search.trim()) return slangs;
    const q = search.toLowerCase();
    return slangs.filter((s) => s.expression.includes(q) || s.meaning.includes(q) || s.usage.includes(q));
  }, [search]);

  const filteredLoanwords = useMemo(() => {
    if (!search.trim()) return loanwords;
    const q = search.toLowerCase();
    return loanwords.filter((l) => l.expression.includes(q) || l.original.includes(q) || l.meaning.includes(q));
  }, [search]);

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="搜索表达..."
          className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)]"
        />
        {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={14} className="text-[var(--text-muted)]" /></button>}
      </div>

      <div className="flex bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-1 gap-1">
        {([
          { k: 'idioms' as const, l: '惯用语' },
          { k: 'slang' as const, l: '网络用语' },
          { k: 'loanword' as const, l: '外来词' },
        ]).map((t) => (
          <button key={t.k} onClick={() => setSubTab(t.k)}
            className={`flex-1 text-sm py-2 rounded-lg transition-colors ${subTab === t.k ? 'bg-[var(--pink-primary)] text-white font-medium' : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'}`}
          >{t.l}</button>
        ))}
      </div>

      {subTab === 'idioms' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredIdioms.map((item) => {
            const isAdded = addedExprIds.has(item.id);
            const isAdding = addingExprId === item.id;
            return (
            <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--pink-pale)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[var(--text-primary)]">{item.expression}</h4>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSaveExpr(item.id, item.expression, item.actualMeaning, item.example, item.exampleZh)}
                    disabled={isAdding}
                    className={`p-1 rounded-lg transition-colors ${
                      isAdded ? 'text-[var(--mint-soft)] bg-[var(--mint-soft)]/10' : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-input)]'
                    }`}
                    title={isAdded ? '已添加' : '加入单词本'}
                  >
                    {isAdded ? <BookmarkCheck size={14} /> : <BookmarkPlus size={14} />}
                  </button>
                  <button onClick={() => speak(item.expression, 0.7)} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)]"><Volume2 size={14} /></button>
                </div>
              </div>
              <div className="bg-[var(--bg-input)] rounded-lg p-2.5 mb-2 text-sm">
                <span className="text-[var(--text-muted)]">字面: </span>{item.literalMeaning}
                <span className="text-[var(--pink-primary)] mx-2">→</span>
                <span className="font-medium">{item.actualMeaning}</span>
              </div>
              <p className="text-xs text-[var(--text-placeholder)]">{item.example}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.exampleZh}</p>
            </div>
            );
          })}
        </div>
      )}

      {subTab === 'slang' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredSlangs.map((item) => {
            const isAdded = addedExprIds.has(item.id);
            const isAdding = addingExprId === item.id;
            return (
            <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--purple-soft)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[var(--text-primary)]">{item.expression}</h4>
                  <span className="flex">{Array.from({ length: item.hotLevel }, (_, i) => <Flame key={i} size={11} className="text-[var(--pink-primary)] fill-[var(--pink-primary)]" />)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSaveExpr(item.id, item.expression, item.meaning, item.example, item.exampleZh)}
                    disabled={isAdding}
                    className={`p-1 rounded-lg transition-colors ${
                      isAdded ? 'text-[var(--mint-soft)] bg-[var(--mint-soft)]/10' : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-input)]'
                    }`}
                    title={isAdded ? '已添加' : '加入单词本'}
                  >
                    {isAdded ? <BookmarkCheck size={14} /> : <BookmarkPlus size={14} />}
                  </button>
                  <button onClick={() => speak(item.expression, 0.7)} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)]"><Volume2 size={14} /></button>
                </div>
              </div>
              <p className="text-sm text-[var(--text-primary)] mb-1.5">{item.meaning}</p>
              <p className="text-xs text-[var(--text-secondary)] mb-2">{item.usage}</p>
              <p className="text-xs text-[var(--text-placeholder)]">{item.example}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.exampleZh}</p>
            </div>
            );
          })}
        </div>
      )}

      {subTab === 'loanword' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredLoanwords.map((item) => {
            const isAdded = addedExprIds.has(item.id);
            const isAdding = addingExprId === item.id;
            return (
            <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--blue-soft)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[var(--text-primary)]">{item.expression}</h4>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleSaveExpr(item.id, item.expression, item.meaning, item.example, item.exampleZh)}
                    disabled={isAdding}
                    className={`p-1 rounded-lg transition-colors ${
                      isAdded ? 'text-[var(--mint-soft)] bg-[var(--mint-soft)]/10' : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-input)]'
                    }`}
                    title={isAdded ? '已添加' : '加入单词本'}
                  >
                    {isAdded ? <BookmarkCheck size={14} /> : <BookmarkPlus size={14} />}
                  </button>
                  <button onClick={() => speak(item.expression, 0.7)} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)]"><Volume2 size={14} /></button>
                </div>
              </div>
              <div className="text-sm mb-2"><span className="text-[var(--text-muted)]">{item.original}</span><span className="mx-2">→</span><span className="font-medium">{item.meaning}</span></div>
              <p className="text-xs text-[var(--text-placeholder)]">{item.example}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.exampleZh}</p>
            </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
