'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, BookOpen, ChevronDown, ChevronUp, Lightbulb } from 'lucide-react';
import { useState } from 'react';
import { knowledgeCategories } from '@/data/knowledge';

export default function KnowledgeCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const category = knowledgeCategories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="py-6 text-center">
        <p className="text-slate-400">分类不存在</p>
        <Link href="/knowledge" className="text-blue-400 text-sm mt-4 block">返回知识库</Link>
      </div>
    );
  }

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="text-slate-400 hover:text-white transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-2xl">{category.emoji}</span>
            <h1 className="text-xl font-bold text-white">{category.name}</h1>
          </div>
          <p className="text-slate-400 text-sm">
            {category.nameKo} · {category.words.length} 个单词
          </p>
        </div>
      </div>

      <p className="text-sm text-slate-500">{category.description}</p>

      {/* Word Cards */}
      <div className="space-y-3">
        {category.words.map((word) => {
          const isExpanded = expandedId === word.id;
          return (
            <div
              key={word.id}
              className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden transition-colors hover:border-slate-700"
            >
              {/* Main row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : word.id)}
                className="w-full flex items-center gap-4 p-4 text-left"
              >
                {/* Emoji illustration */}
                <div className="w-14 h-14 rounded-xl bg-slate-800 flex items-center justify-center text-3xl shrink-0">
                  {word.emoji}
                </div>

                {/* Word info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-white font-semibold text-lg">{word.word}</span>
                    <span className="text-xs bg-slate-800 text-slate-400 px-2 py-0.5 rounded">
                      {word.partOfSpeech}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-sm text-slate-500">{word.pronunciation}</span>
                    <span className="text-sm text-slate-300">— {word.meaning}</span>
                  </div>
                </div>

                {/* Expand icon */}
                {isExpanded
                  ? <ChevronUp size={18} className="text-slate-500 shrink-0" />
                  : <ChevronDown size={18} className="text-slate-500 shrink-0" />
                }
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-slate-800 pt-3 space-y-3 animate-fade-in">
                  {/* Example */}
                  <div className="bg-slate-800 rounded-lg p-3">
                    <p className="text-xs text-slate-500 mb-1">例句</p>
                    <p className="text-sm text-white">{word.example}</p>
                    <p className="text-xs text-slate-400 mt-1">{word.exampleZh}</p>
                  </div>

                  {/* Usage note */}
                  {word.note && (
                    <div className="flex items-start gap-2 bg-amber-500/5 border border-amber-500/10 rounded-lg p-3">
                      <Lightbulb size={14} className="text-amber-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-amber-400 font-medium mb-0.5">用法提示</p>
                        <p className="text-xs text-slate-400">{word.note}</p>
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
