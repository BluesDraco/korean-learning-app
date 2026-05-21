'use client';

import { useState } from 'react';
import { FileText, ChevronDown, ChevronUp, AlertCircle, BookOpen } from 'lucide-react';
import { grammarPoints, type GrammarPoint } from '@/data/grammar';

const levelConfig = {
  beginner: { label: '初级', color: 'bg-emerald-500/10 text-emerald-400', topik: 'TOPIK 1-2' },
  intermediate: { label: '中级', color: 'bg-blue-500/10 text-blue-400', topik: 'TOPIK 3-4' },
  advanced: { label: '高级', color: 'bg-purple-500/10 text-purple-400', topik: 'TOPIK 5-6' },
};

export default function GrammarPage() {
  const [activeLevel, setActiveLevel] = useState<GrammarPoint['level'] | 'all'>('all');
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const filtered = activeLevel === 'all'
    ? grammarPoints
    : grammarPoints.filter((g) => g.level === activeLevel);

  const levels: Array<{ value: GrammarPoint['level'] | 'all'; label: string }> = [
    { value: 'all', label: '全部' },
    { value: 'beginner', label: '初级' },
    { value: 'intermediate', label: '中级' },
    { value: 'advanced', label: '高级' },
  ];

  return (
    <div className="py-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">语法库</h1>
        <p className="text-slate-400 text-sm mt-1">按 TOPIK 等级学习韩语语法，理解用法和对比</p>
      </div>

      {/* Level filter */}
      <div className="flex gap-2 overflow-x-auto pb-1">
        {levels.map((lv) => (
          <button
            key={lv.value}
            onClick={() => { setActiveLevel(lv.value); setExpandedId(null); }}
            className={`text-sm px-4 py-2 rounded-lg whitespace-nowrap transition-colors ${
              activeLevel === lv.value
                ? 'bg-blue-600 text-white font-medium'
                : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {lv.label}
          </button>
        ))}
      </div>

      <p className="text-xs text-slate-500">共 {filtered.length} 个语法点</p>

      {/* Grammar list */}
      <div className="space-y-3">
        {filtered.map((grammar) => {
          const isExpanded = expandedId === grammar.id;
          const lv = levelConfig[grammar.level];
          return (
            <div
              key={grammar.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden"
            >
              <button
                onClick={() => setExpandedId(isExpanded ? null : grammar.id)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                {/* Pattern badge */}
                <div className="bg-blue-600/15 text-blue-400 border border-blue-500/20 rounded-lg px-3 py-2 font-mono text-sm font-semibold whitespace-nowrap shrink-0">
                  {grammar.pattern}
                </div>

                {/* Title & brief */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-medium">{grammar.title}</span>
                    <span className={`text-xs px-1.5 py-0.5 rounded ${lv.color}`}>{grammar.topik}</span>
                  </div>
                  <p className="text-sm text-slate-400 mt-0.5 line-clamp-1">{grammar.usage}</p>
                </div>

                {isExpanded
                  ? <ChevronUp size={18} className="text-slate-500 shrink-0" />
                  : <ChevronDown size={18} className="text-slate-500 shrink-0" />
                }
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-slate-800 pt-3 space-y-3 animate-fade-in">
                  {/* Explanation */}
                  <div className="bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">详细解释</p>
                    <p className="text-sm text-slate-200">{grammar.explanation}</p>
                  </div>

                  {/* Conjugation */}
                  <div className="bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">接续方式</p>
                    <p className="text-sm text-slate-200 whitespace-pre-line">{grammar.conjugation}</p>
                  </div>

                  {/* Examples */}
                  <div className="space-y-2">
                    <p className="text-xs text-slate-500">例句</p>
                    {grammar.examples.map((ex, i) => (
                      <div key={i} className="bg-slate-800 rounded-lg p-3">
                        <p className="text-sm text-white">{ex.ko}</p>
                        <p className="text-xs text-slate-400 mt-1">{ex.zh}</p>
                      </div>
                    ))}
                  </div>

                  {/* Similar patterns */}
                  {grammar.similarPatterns && grammar.similarPatterns.length > 0 && (
                    <div className="flex items-start gap-2 bg-amber-500/5 border border-amber-500/10 rounded-lg p-3">
                      <AlertCircle size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-amber-400 font-medium mb-1">
                          易混淆：{grammar.similarPatterns.join(' / ')}
                        </p>
                        {grammar.difference && (
                          <p className="text-xs text-slate-400">{grammar.difference}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
