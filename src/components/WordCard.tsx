'use client';

import { Plus, Check, Loader2 } from 'lucide-react';

export interface WordCardData {
  originalText: string;
  dictionaryForm: string;
  conjugation: string;
  pronunciation: string;
  meaning: string;
  partOfSpeech: string;
  example: { text: string; translation: string };
  alreadySaved: boolean;
}

interface WordCardProps {
  data: WordCardData | null;
  loading: boolean;
  onClose: () => void;
  onAdd: () => void;
}

export function WordCard({ data, loading, onClose, onAdd }: WordCardProps) {
  if (!data && !loading) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-t-2xl md:rounded-2xl p-5 w-full md:w-96 max-h-[80vh] overflow-y-auto mx-0 md:mx-4 animate-slide-up"
        onClick={(e) => e.stopPropagation()}
      >
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <Loader2 size={28} className="animate-spin text-[var(--text-secondary)]" />
          </div>
        ) : data ? (
          <>
            <div className="flex items-start justify-between mb-1">
              <div>
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-2xl font-bold text-[var(--text-primary)]">{data.dictionaryForm}</span>
                  {data.dictionaryForm !== data.originalText && (
                    <span className="text-xs bg-[var(--bg-input)] text-[var(--text-secondary)] px-2 py-0.5 rounded-full">
                      ← {data.originalText}
                    </span>
                  )}
                </div>
                {data.pronunciation && (
                  <span className="text-sm text-[var(--text-secondary)]">{data.pronunciation}</span>
                )}
              </div>
              <button onClick={onClose} className="text-[var(--text-muted)] hover:text-[var(--text-primary)] text-xl leading-none">&times;</button>
            </div>

            <div className="flex items-center gap-2 mt-2 mb-3">
              <span className="text-xs bg-[var(--bg-input)] text-[var(--text-secondary)] px-2 py-0.5 rounded">
                {data.partOfSpeech}
              </span>
              <span className="text-xs bg-[var(--bg-input)] text-[var(--text-secondary)] px-2 py-0.5 rounded">
                {data.conjugation}
              </span>
            </div>

            <div className="bg-[var(--bg-input)] rounded-xl p-3 mb-3">
              <p className="text-xs text-[var(--text-secondary)] font-medium mb-1">释义</p>
              <p className="text-[var(--text-primary)] text-sm">{data.meaning}</p>
            </div>

            {data.example.text && (
              <div className="space-y-2 mb-4">
                <p className="text-xs text-[var(--text-muted)] font-medium">例句</p>
                <div className="bg-[var(--bg-input)] rounded-lg p-3">
                  <p className="text-sm text-[var(--text-primary)]">{data.example.text}</p>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{data.example.translation}</p>
                </div>
              </div>
            )}

            <button
              onClick={onAdd}
              disabled={data.alreadySaved}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                data.alreadySaved
                  ? 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)] cursor-default'
                  : 'bg-[var(--pink-primary)] hover:bg-[var(--pink-primary)] text-[var(--text-primary)]'
              }`}
            >
              {data.alreadySaved ? (
                <>
                  <Check size={16} />
                  已加入词汇本
                </>
              ) : (
                <>
                  <Plus size={16} />
                  加入词汇本
                </>
              )}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
