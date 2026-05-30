'use client';

import { useState, useMemo } from 'react';
import { Search, X, Volume2, ChevronDown, ChevronUp } from 'lucide-react';
import { vocabularyEntries } from '@/data/vocabulary/entries';
import { speak } from '@/lib/tts';


export function ScenesSection() {
  const [search, setSearch] = useState('');
  const [sceneFilter, setSceneFilter] = useState('全部');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const allSceneTags = useMemo(() => {
    const tags = new Set<string>();
    vocabularyEntries.forEach((e) => e.tags.forEach((t) => tags.add(t)));
    return ['全部', ...Array.from(tags).sort()];
  }, []);

  const results = useMemo(() => {
    let r = vocabularyEntries;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      r = r.filter((e) => e.korean.includes(q) || e.romanization.toLowerCase().includes(q) || e.meanings.some((m) => m.chinese.includes(q)) || e.tags.some((t) => t.toLowerCase().includes(q)));
    }
    if (sceneFilter !== '全部') r = r.filter((e) => e.tags.includes(sceneFilter));
    return r;
  }, [search, sceneFilter]);

  return (
    <div className="space-y-3">
      <div className="relative">
        <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
        <input type="text" value={search} onChange={(e) => setSearch(e.target.value)}
          placeholder="输入中文、韩文或场景…"
          className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl py-2.5 pl-10 pr-10 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)]"
        />
        {search && <button onClick={() => setSearch('')} className="absolute right-3 top-1/2 -translate-y-1/2"><X size={14} className="text-[var(--text-muted)]" /></button>}
      </div>

      <div className="flex gap-1.5 overflow-x-auto pb-1">
        {allSceneTags.map((tag) => (
          <button key={tag} onClick={() => setSceneFilter(tag)}
            className={`shrink-0 text-xs px-3 py-1.5 rounded-full transition-colors ${sceneFilter === tag ? 'bg-[var(--pink-primary)] text-white' : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)]'}`}
          >{tag}</button>
        ))}
      </div>

      <div className="space-y-2">
        {results.map((entry) => {
          const isExpanded = expandedId === entry.id;
          return (
            <div key={entry.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden">
              <button onClick={() => setExpandedId(isExpanded ? null : entry.id)}
                className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--bg-card-hover)]"
              >
                <span className="text-lg shrink-0">{entry.emoji}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[var(--text-primary)] text-sm">{entry.korean}</span>
                    <span className="text-xs text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-1.5 py-0.5 rounded">[{entry.romanization}]</span>
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-secondary)]">{entry.partOfSpeech}</span>
                  </div>
                  <div className="text-xs text-[var(--text-secondary)] mt-1">{entry.meanings.map((m) => m.chinese).join('；')}</div>
                </div>
                <span onClick={(e) => { e.stopPropagation(); speak(entry.korean, 0.75); }}
                  className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] cursor-pointer inline-flex"
                ><Volume2 size={14} /></span>
                {isExpanded ? <ChevronUp size={16} className="text-[var(--text-muted)]" /> : <ChevronDown size={16} className="text-[var(--text-muted)]" />}
              </button>
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-2">
                  {entry.examples.map((ex, i) => (
                    <div key={i} className="bg-[var(--bg-input)] rounded-lg p-3">
                      <p className="text-sm text-[var(--text-primary)]">{ex.korean}</p>
                      <p className="text-xs text-[var(--text-secondary)] mt-0.5">{ex.chinese}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
