'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp, Lightbulb, Volume2 } from 'lucide-react';
import { useState } from 'react';
import { knowledgeCategories } from '@/data/knowledge';
import { speak, speakWord } from '@/lib/tts';
import { TappableText } from '@/components/TappableText';

export default function KnowledgeCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const category = knowledgeCategories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="py-6 text-center">
        <p className="text-[var(--text-secondary)]">分类不存在</p>
        <Link href="/vocabulary/library?tab=themes" className="text-[var(--pink-primary)] text-sm mt-4 block">返回词库</Link>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-4">
      {/* Header */}
      <div>
        <Link href="/vocabulary/library?tab=themes" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} />
          返回词库
        </Link>
        <div className="flex items-center gap-3">
          <span className="text-4xl">{category.emoji}</span>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-[var(--text-primary)]">{category.name}</h1>
              <span className="text-sm text-[var(--text-muted)]">{category.nameKo}</span>
            </div>
            <p className="text-sm text-[var(--text-secondary)] mt-0.5">{category.description} · {category.words.length} 个单词</p>
          </div>
        </div>
      </div>

      {/* Word list */}
      <div className="space-y-2">
        {category.words.map((word) => {
          const isExpanded = expandedId === word.id;
          return (
            <div
              key={word.id}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl overflow-hidden"
            >
              {/* Main row */}
              <div className="w-full flex items-center gap-3 p-3 text-left hover:bg-[var(--bg-card-hover)] transition-colors">
                <button
                  onClick={() => setExpandedId(isExpanded ? null : word.id)}
                  className="flex-1 flex items-center gap-3 min-w-0 text-left"
                >
                  <span className="text-xl shrink-0">{word.emoji}</span>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-sm text-[var(--text-primary)]">{word.word}</span>
                      <span className="text-xs text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-1.5 py-0.5 rounded">
                        [{word.pronunciation}]
                      </span>
                      <span className="text-xs px-1.5 py-0.5 rounded bg-[var(--bg-accent)] text-[var(--text-secondary)]">
                        {word.partOfSpeech}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] mt-0.5">{word.meaning}</p>
                  </div>
                </button>
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); speakWord(word.word, 0.8); }}
                    className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                    title="听发音"
                  >
                    <Volume2 size={14} />
                  </button>
                  <button onClick={() => setExpandedId(isExpanded ? null : word.id)}>
                    {isExpanded
                      ? <ChevronUp size={16} className="text-[var(--text-muted)]" />
                      : <ChevronDown size={16} className="text-[var(--text-muted)]" />
                    }
                  </button>
                </div>
              </div>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-4 pb-4 border-t border-[var(--border-color)] pt-3 space-y-3 animate-slide-up">
                  {/* Example */}
                  <div className="bg-[var(--bg-input)] rounded-lg p-3 flex items-start gap-2">
                    <div className="flex-1 min-w-0">
                      <p className="text-[10px] text-[var(--text-muted)] mb-1.5 uppercase tracking-wider">例句</p>
                      <TappableText text={word.example} className="text-sm text-[var(--text-primary)]" source="基础词汇" />
                      <p className="text-xs text-[var(--text-secondary)] mt-1">{word.exampleZh}</p>
                    </div>
                    <button
                      onClick={() => speak(word.example, 0.8)}
                      className="p-1.5 rounded-lg hover:bg-[var(--bg-card-hover)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors shrink-0"
                      title="听例句"
                    >
                      <Volume2 size={14} />
                    </button>
                  </div>

                  {/* Usage note */}
                  {word.note && (
                    <div className="flex items-start gap-3 rounded-lg p-3 bg-[var(--peach-soft)]/8 border border-[var(--peach-soft)]/15">
                      <Lightbulb size={14} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-[10px] text-[var(--peach-soft)] font-medium mb-0.5">用法提示</p>
                        <p className="text-xs text-[var(--text-secondary)] leading-relaxed">{word.note}</p>
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
