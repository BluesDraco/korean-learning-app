'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen } from 'lucide-react';
import { cultureItems } from '@/data/korea';

export function CultureSection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-3">
      {cultureItems.map((item) => {
        const isExpanded = expandedId === item.id;
        return (
          <div
            key={item.id}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden transition-colors hover:border-[var(--pink-pale)]"
          >
            <button
              onClick={() => setExpandedId(isExpanded ? null : item.id)}
              className="w-full flex items-center gap-4 p-4 text-left"
            >
              <span className="text-4xl shrink-0">{item.emoji}</span>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <h3 className="font-bold text-[var(--text-primary)]">{item.title}</h3>
                  <span className="text-sm text-[var(--text-muted)]">{item.titleKo}</span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] mt-1 line-clamp-2 leading-relaxed">
                  {item.description}
                </p>
                <div className="flex flex-wrap gap-1.5 mt-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="text-[14px] px-2 py-0.5 rounded-full bg-[var(--bg-accent)] text-[var(--text-secondary)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <span className="text-[var(--text-placeholder)] shrink-0">
                {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>
            {isExpanded && (
              <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-3">
                <div className="bg-[var(--bg-input)] rounded-xl p-3">
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">{item.description}</p>
                </div>
                {(item.updatedAt || item.source) && (
                  <div className="flex items-center gap-3 text-[14px] text-[var(--text-muted)]">
                    {item.updatedAt && <span>更新: {item.updatedAt}</span>}
                    {item.source && <span>来源: {item.source}</span>}
                  </div>
                )}
                {item.relatedWords && item.relatedWords.length > 0 && (
                  <div>
                    <h4 className="text-xs font-medium text-[var(--text-muted)] mb-2 flex items-center gap-1.5">
                      <BookOpen size={14} /> 相关词汇
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {item.relatedWords.map((rw) => (
                        <div key={rw.word} className="flex items-center justify-between bg-[var(--bg-card-hover)] rounded-lg px-3 py-2">
                          <span className="text-sm text-[var(--text-primary)] font-medium">{rw.word}</span>
                          <span className="text-xs text-[var(--text-secondary)]">{rw.meaning}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
