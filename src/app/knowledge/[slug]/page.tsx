'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ChevronDown, ChevronUp, Lightbulb, Volume2, Languages } from 'lucide-react';
import { useState } from 'react';
import { knowledgeCategories } from '@/data/knowledge';

function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

export default function KnowledgeCategoryPage() {
  const { slug } = useParams<{ slug: string }>();
  const router = useRouter();
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const category = knowledgeCategories.find((c) => c.slug === slug);

  if (!category) {
    return (
      <div className="py-6 text-center">
        <p className="text-[var(--text-secondary)]">分类不存在</p>
        <Link href="/knowledge" className="text-[var(--pink-primary)] text-sm mt-4 block">返回知识库</Link>
      </div>
    );
  }

  return (
    <div className="py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
          <ArrowLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-2">
            <span className="text-3xl">{category.emoji}</span>
            <h1 className="text-2xl font-bold text-[var(--text-primary)]">{category.name}</h1>
            <span className="text-[var(--text-muted)] text-sm">{category.nameKo}</span>
          </div>
          <p className="text-[var(--text-secondary)] text-sm mt-1">{category.description} · {category.words.length} 个单词</p>
        </div>
      </div>

      {/* Word Cards */}
      <div className="space-y-3">
        {category.words.map((word) => {
          const isExpanded = expandedId === word.id;
          return (
            <div
              key={word.id}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden transition-all hover:border-[var(--pink-pale)] hover:shadow-[var(--pink-primary)]/10"
            >
              {/* Main row */}
              <button
                onClick={() => setExpandedId(isExpanded ? null : word.id)}
                className="w-full flex items-center gap-4 p-5 text-left"
              >
                {/* Emoji illustration */}
                <div className="w-16 h-16 rounded-2xl bg-[var(--bg-input)] flex items-center justify-center text-4xl shrink-0">
                  {word.emoji}
                </div>

                {/* Word info */}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-[var(--text-primary)] font-bold text-xl">{word.word}</span>
                    <span className="flex items-center gap-1 text-sm text-[var(--pink-primary)] bg-[var(--pink-primary)]/10 px-2 py-0.5 rounded-lg">
                      <Languages size={12} />
                      {word.pronunciation}
                    </span>
                    <span className="text-xs bg-[var(--bg-input)] text-[var(--text-secondary)] px-2 py-1 rounded-lg">
                      {word.partOfSpeech}
                    </span>
                  </div>
                  <div className="text-[var(--text-primary)] mt-1.5 text-base">{word.meaning}</div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={(e) => { e.stopPropagation(); speakKorean(word.word); }}
                    className="p-2 rounded-xl bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
                    title="听发音"
                  >
                    <Volume2 size={16} />
                  </button>
                  {isExpanded
                    ? <ChevronUp size={18} className="text-[var(--text-muted)]" />
                    : <ChevronDown size={18} className="text-[var(--text-muted)]" />
                  }
                </div>
              </button>

              {/* Expanded detail */}
              {isExpanded && (
                <div className="px-5 pb-5 border-t border-[var(--border-color)] pt-4 space-y-3 animate-fade-in">
                  {/* Example */}
                  <div className="bg-[var(--bg-input)] rounded-2xl p-4">
                    <p className="text-xs text-[var(--text-muted)] mb-2 uppercase tracking-wider">例句</p>
                    <div className="flex items-start gap-2">
                      <p className="text-base text-[var(--text-primary)] leading-relaxed">{word.example}</p>
                      <button
                        onClick={(e) => { e.stopPropagation(); speakKorean(word.example); }}
                        className="p-1 rounded-lg bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                        title="听例句发音"
                      >
                        <Volume2 size={14} />
                      </button>
                    </div>
                    <p className="text-sm text-[var(--text-secondary)] mt-1.5">{word.exampleZh}</p>
                  </div>

                  {/* Usage note */}
                  {word.note && (
                    <div className="flex items-start gap-3 bg-[var(--color-highlight)]/10 border border-[var(--color-highlight)]/15 rounded-2xl p-4">
                      <Lightbulb size={16} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                      <div>
                        <p className="text-xs text-[var(--peach-soft)] font-medium mb-1">用法提示</p>
                        <p className="text-sm text-[var(--text-secondary)] leading-relaxed">{word.note}</p>
                      </div>
                    </div>
                  )}

                  {/* Quick info bar */}
                  <div className="flex items-center gap-4 text-xs text-[var(--text-placeholder)]">
                    <span>韩语: {word.word}</span>
                    <span>罗马音: {word.pronunciation}</span>
                    <span>词性: {word.partOfSpeech}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
