'use client';

import { useState } from 'react';
import { ChevronDown, ChevronUp, BookOpen, Clock } from 'lucide-react';
import { historyPeriods } from '@/data/korea';

export function HistorySection() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  return (
    <div className="space-y-0">
      {historyPeriods.map((period, index) => {
        const isExpanded = expandedId === period.id;
        const isLast = index === historyPeriods.length - 1;
        return (
          <div key={period.id} className="relative flex gap-4">
            <div className="flex flex-col items-center shrink-0">
              <div className="w-3 h-3 rounded-full bg-[var(--pink-primary)] border-2 border-white shadow-sm z-10" />
              {!isLast && <div className="w-0.5 flex-1 bg-[var(--border-default)]" />}
            </div>
            <div className="flex-1 pb-6">
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] border-l-2 border-l-[var(--pink-primary)] rounded-2xl overflow-hidden transition-colors hover:border-l-[var(--pink-primary)] hover:border-[var(--pink-pale)]">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : period.id)}
                  className="w-full flex items-center gap-4 p-4 text-left"
                >
                  <span className="text-3xl shrink-0">{period.emoji}</span>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="font-bold text-[var(--text-primary)]">{period.name}</h3>
                      <span className="text-sm text-[var(--text-muted)]">{period.nameKo}</span>
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <Clock size={12} className="text-[var(--text-placeholder)]" />
                      <span className="text-xs text-[var(--text-muted)]">{period.years}</span>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mt-1.5 line-clamp-2 leading-relaxed">
                      {period.description}
                    </p>
                  </div>
                  <span className="text-[var(--text-placeholder)] shrink-0">
                    {isExpanded ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                  </span>
                </button>
                {isExpanded && (
                  <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-3">
                    <div className="bg-[var(--bg-input)] rounded-xl p-3">
                      <p className="text-sm text-[var(--text-primary)] leading-relaxed">{period.description}</p>
                    </div>
                    <div>
                      <h4 className="text-xs font-medium text-[var(--text-muted)] mb-2">重要事件</h4>
                      <ul className="space-y-1.5">
                        {period.keyEvents.map((event) => (
                          <li key={event} className="flex items-start gap-2 text-sm text-[var(--text-primary)]">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-[var(--pink-primary)] shrink-0" />
                            {event}
                          </li>
                        ))}
                      </ul>
                    </div>
                    {period.relatedWords && period.relatedWords.length > 0 && (
                      <div>
                        <h4 className="text-xs font-medium text-[var(--text-muted)] mb-2 flex items-center gap-1.5">
                          <BookOpen size={14} /> 相关词汇
                        </h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {period.relatedWords.map((rw) => (
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
            </div>
          </div>
        );
      })}
    </div>
  );
}
