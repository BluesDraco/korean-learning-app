'use client';

import { useState, useMemo } from 'react';
import { Search, X, Flame, Volume2 } from 'lucide-react';
import { idioms, slangs, loanwords } from '@/data/expressions';
import type { Idiom, Slang, Loanword } from '@/data/expressions';
import { speak } from '@/lib/tts';


const tagColors: Record<string, string> = {
  '身体': 'bg-red-500/10 text-red-500', '食物': 'bg-orange-500/10 text-orange-500',
  '情感': 'bg-pink-500/10 text-pink-500', '动作': 'bg-emerald-500/10 text-emerald-500',
  '生活': 'bg-purple-500/10 text-purple-500', '性格': 'bg-rose-500/10 text-rose-500',
  '社交': 'bg-blue-500/10 text-blue-500',
};

const moodColors: Record<string, string> = {
  '调侃': 'bg-orange-500/10 text-orange-500', '感叹': 'bg-purple-500/10 text-purple-500',
  '撒娇': 'bg-pink-500/10 text-pink-500', '惊讶': 'bg-red-500/10 text-red-500',
  '吐槽': 'bg-emerald-500/10 text-emerald-500', '可爱': 'bg-pink-500/10 text-pink-500',
};

type SubTab = 'idioms' | 'slang' | 'loanword';

export function ExpressionsSection() {
  const [subTab, setSubTab] = useState<SubTab>('idioms');
  const [search, setSearch] = useState('');

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
          {filteredIdioms.map((item) => (
            <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--pink-pale)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[var(--text-primary)]">{item.expression}</h4>
                <button onClick={() => speak(item.expression, 0.7)} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)]"><Volume2 size={14} /></button>
              </div>
              <div className="bg-[var(--bg-input)] rounded-lg p-2.5 mb-2 text-sm">
                <span className="text-[var(--text-muted)]">字面: </span>{item.literalMeaning}
                <span className="text-[var(--pink-primary)] mx-2">→</span>
                <span className="font-medium">{item.actualMeaning}</span>
              </div>
              <p className="text-xs text-[var(--text-placeholder)]">{item.example}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.exampleZh}</p>
            </div>
          ))}
        </div>
      )}

      {subTab === 'slang' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredSlangs.map((item) => (
            <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--purple-soft)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <h4 className="font-bold text-[var(--text-primary)]">{item.expression}</h4>
                  <span className="flex">{Array.from({ length: item.hotLevel }, (_, i) => <Flame key={i} size={11} className="text-[var(--pink-primary)] fill-[var(--pink-primary)]" />)}</span>
                </div>
                <button onClick={() => speak(item.expression, 0.7)} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)]"><Volume2 size={14} /></button>
              </div>
              <p className="text-sm text-[var(--text-primary)] mb-1.5">{item.meaning}</p>
              <p className="text-xs text-[var(--text-secondary)] mb-2">{item.usage}</p>
              <p className="text-xs text-[var(--text-placeholder)]">{item.example}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.exampleZh}</p>
            </div>
          ))}
        </div>
      )}

      {subTab === 'loanword' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredLoanwords.map((item) => (
            <div key={item.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-4 hover:border-[var(--blue-soft)] transition-colors">
              <div className="flex items-center justify-between mb-2">
                <h4 className="font-bold text-[var(--text-primary)]">{item.expression}</h4>
                <button onClick={() => speak(item.expression, 0.7)} className="p-1 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)]"><Volume2 size={14} /></button>
              </div>
              <div className="text-sm mb-2"><span className="text-[var(--text-muted)]">{item.original}</span><span className="mx-2">→</span><span className="font-medium">{item.meaning}</span></div>
              <p className="text-xs text-[var(--text-placeholder)]">{item.example}</p>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.exampleZh}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
