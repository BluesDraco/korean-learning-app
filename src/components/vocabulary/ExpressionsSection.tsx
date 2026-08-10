'use client';

import { useState, useRef, useMemo, useEffect } from 'react';
import { Search, X, Volume2, BookmarkPlus, BookmarkCheck, AlertTriangle, Loader2, SearchX } from 'lucide-react';
import { idioms, slangs, loanwords } from '@/data/expressions';
import { romanize } from '@/lib/dictionary';
import { speak } from '@/lib/tts';
import { TappableText } from '@/components/TappableText';
import { AddToBookSheet } from '@/components/vocabulary/AddToBookSheet';

type SubTab = 'idioms' | 'slang' | 'loanword';

interface SheetTarget {
  id: string;
  korean: string;
  meaning: string;
  example: string;
  exampleZh: string;
}

export function ExpressionsSection() {
  const { user } = useAuth();
  const { lang } = useLang();
  const [subTab, setSubTab] = useState<SubTab>('idioms');
  const [search, setSearch] = useState('');
  const [addedExprIds, setAddedExprIds] = useState<Set<string>>(new Set());
  const [sheetTarget, setSheetTarget] = useState<SheetTarget | null>(null);

  const filteredIdioms = useMemo(() => {
    const list = filter === 'all' ? idioms : idioms.filter(i => i.tags.includes(filter));
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(i =>
      i.expression.includes(q) || i.literalMeaning.includes(q) ||
      i.actualMeaning.includes(q) || i.chineseEquivalent.includes(q)
    );
  }, [search, filter]);

  const filteredSlangs = useMemo(() => {
    const list = filter === 'all' ? slangs : slangs.filter(s => s.mood === filter);
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(s =>
      s.expression.includes(q) || s.meaning.includes(q) || s.usage.includes(q) ||
      (s.formalAlternative?.includes(q) ?? false)
    );
  }, [search, filter]);

  const filteredLoanwords = useMemo(() => {
    const list = filter === 'all' ? loanwords : loanwords.filter(l => l.origin === filter);
    if (!search.trim()) return list;
    const q = search.toLowerCase();
    return list.filter(l => l.expression.includes(q) || l.original.includes(q) || l.meaning.includes(q));
  }, [search, filter]);

  const tabs = [
    { k: 'idioms'   as const, l: t('vocab.ex_tab_idiom', lang), count: idioms.length },
    { k: 'slang'    as const, l: t('vocab.ex_tab_slang', lang), count: slangs.length },
    { k: 'loanword' as const, l: t('vocab.ex_tab_loan', lang),  count: loanwords.length },
  ];

  const handleSheetClose = () => {
    if (sheetTarget) setAddedExprIds(prev => new Set(prev).add(sheetTarget.id));
    setSheetTarget(null);
  };

  return (
    <div className="space-y-4">
      {/* Search */}
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-ink-3)]" />
        <input
          type="search" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder={t('vocab.ex_search_ph', lang)}
          className="w-full bg-[var(--color-surface-2)] border border-[var(--color-border-1)] rounded-xl py-2.5 pl-10 pr-10 text-sm text-[var(--color-ink-1)] placeholder:text-[var(--color-ink-3)] focus:outline-none focus:border-[var(--color-pink-strong)]"
        />
        {search && (
          <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2">
            <X size={14} className="text-[var(--color-ink-3)]" />
          </button>
        )}
      </div>

      {/* Sub-tabs with counts */}
      <div className="flex bg-[var(--color-surface-2)] border border-[var(--color-border-1)] rounded-xl p-1 gap-1">
        {tabs.map((tab) => (
          <button
            key={tab.k}
            onClick={() => setSubTab(tab.k)}
            className={`flex-1 text-sm py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 ${
              subTab === tab.k ? 'bg-[var(--color-pink-strong)] text-white font-medium' : 'text-[var(--color-ink-2)] hover:text-[var(--color-ink-1)]'
            }`}
          >
            {tab.l}
            <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded-full ${
              subTab === tab.k ? 'bg-white/20 text-white' : 'bg-[var(--color-surface-3)] text-[var(--color-ink-3)]'
            }`}>
              {tab.count}
            </span>
          </button>
        ))}
      </div>

      {/* 惯用语 */}
      {subTab === 'idioms' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredIdioms.map((item) => {
            const isAdded = addedExprIds.has(item.id);
            return (
            <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--pink-pale)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[var(--text-primary)]">{item.expression}</h4>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => !isAdded && setSheetTarget({ id: item.id, korean: item.expression, meaning: item.actualMeaning, example: item.example, exampleZh: item.exampleZh })}
                    className={`p-1 rounded-lg transition-colors ${isAdded ? 'text-[var(--mint-soft)] bg-[var(--mint-soft)]/10' : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-input)]'}`}
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
              <TappableText text={item.example} className="text-xs text-[var(--text-placeholder)]" source="表达用法" />
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.exampleZh}</p>
            </div>
            );
          })}
        </div>
      )}

      {/* 网络用语 */}
      {subTab === 'slang' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredSlangs.map((item) => {
            const isAdded = addedExprIds.has(item.id);
            return (
            <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--purple-soft)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[var(--text-primary)]">{item.expression}</h4>
                  <span className="flex">{Array.from({ length: item.hotLevel }, (_, i) => <Flame key={i} size={11} className="text-[var(--pink-primary)] fill-[var(--pink-primary)]" />)}</span>
                </div>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => !isAdded && setSheetTarget({ id: item.id, korean: item.expression, meaning: item.meaning, example: item.example, exampleZh: item.exampleZh })}
                    className={`p-1 rounded-lg transition-colors ${isAdded ? 'text-[var(--mint-soft)] bg-[var(--mint-soft)]/10' : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-input)]'}`}
                    title={isAdded ? '已添加' : '加入单词本'}
                  >
                    {isAdded ? <BookmarkCheck size={14} /> : <BookmarkPlus size={14} />}
                  </button>
                  <button onClick={() => speak(item.expression, 0.7)} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)]"><Volume2 size={14} /></button>
                </div>
              </div>
              <p className="text-sm text-[var(--text-primary)] mb-1.5">{item.meaning}</p>
              <p className="text-xs text-[var(--text-secondary)] mb-2">{item.usage}</p>
              <TappableText text={item.example} className="text-xs text-[var(--text-placeholder)]" source="表达用法" />
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.exampleZh}</p>
            </div>
            );
          })}
        </div>
      )}

      {/* 外来词 */}
      {subTab === 'loanword' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredLoanwords.map((item) => {
            const isAdded = addedExprIds.has(item.id);
            return (
            <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--blue-soft)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[var(--text-primary)]">{item.expression}</h4>
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => !isAdded && setSheetTarget({ id: item.id, korean: item.expression, meaning: item.meaning, example: item.example, exampleZh: item.exampleZh })}
                    className={`p-1 rounded-lg transition-colors ${isAdded ? 'text-[var(--mint-soft)] bg-[var(--mint-soft)]/10' : 'text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-input)]'}`}
                    title={isAdded ? '已添加' : '加入单词本'}
                  >
                    {isAdded ? <BookmarkCheck size={14} /> : <BookmarkPlus size={14} />}
                  </button>
                  <button onClick={() => speak(item.expression, 0.7)} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)]"><Volume2 size={14} /></button>
                </div>
              </div>
              <div className="text-sm mb-2"><span className="text-[var(--text-muted)]">{item.original}</span><span className="mx-2">→</span><span className="font-medium">{item.meaning}</span></div>
              <TappableText text={item.example} className="text-xs text-[var(--text-placeholder)]" source="表达用法" />
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.exampleZh}</p>
            </div>
            );
          })}
        </div>
      )}

      {sheetTarget && (
        <AddToBookSheet
          word={{ korean: sheetTarget.korean, pronunciation: '', meaning: sheetTarget.meaning, partOfSpeech: 'expression', examples: [{ text: sheetTarget.example, translation: sheetTarget.exampleZh }] }}
          onClose={handleSheetClose}
        />
      )}
    </div>
  );
}
