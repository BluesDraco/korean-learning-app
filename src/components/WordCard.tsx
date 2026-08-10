'use client';

import { useState } from 'react';
import { Plus, Check, Loader2 } from 'lucide-react';
import { HighlightedExample } from '@/components/vocabulary/HighlightedExample';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

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
  onAdd: () => Promise<void> | void;
}

export function WordCard({ data, loading, onClose, onAdd }: WordCardProps) {
  const { lang } = useLang();
  const [adding, setAdding] = useState(false);

  if (!data && !loading) return null;

  const handleAdd = async () => {
    if (adding || data?.alreadySaved) return;
    setAdding(true);
    try {
      await onAdd();
    } finally {
      setAdding(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center" style={{ paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))' }} onClick={onClose}>
      <div className="absolute inset-0 bg-black/70" />
      <div
        className="relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-t-2xl md:rounded-2xl p-5 pb-[calc(20px+env(safe-area-inset-bottom,0px))] md:pb-5 w-full md:w-96 max-h-[80dvh] overflow-y-auto mx-0 md:mx-4 animate-slide-up"
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
              <p className="text-xs text-[var(--text-secondary)] font-medium mb-1">{t('wcard.meaning', lang)}</p>
              <p className="text-[var(--text-primary)] text-sm">{data.meaning}</p>
            </div>

            {data.example.text && (
              <div className="space-y-2 mb-4">
                <p className="text-xs text-[var(--text-muted)] font-medium">{t('wcard.example', lang)}</p>
                <div className="bg-[var(--bg-input)] rounded-lg p-3">
                  <HighlightedExample text={data.example.text} word={data.dictionaryForm} className="text-sm text-[var(--text-primary)]" />
                  <p className="text-xs text-[var(--text-secondary)] mt-1">{data.example.translation}</p>
                </div>
              </div>
            )}

            <button
              onClick={handleAdd}
              disabled={data.alreadySaved || adding}
              className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                data.alreadySaved
                  ? 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)] cursor-default'
                  : adding
                  ? 'bg-[var(--pink-primary)]/60 text-white cursor-not-allowed'
                  : 'bg-[var(--pink-primary)] hover:opacity-90 text-white'
              }`}
            >
              {data.alreadySaved ? (
                <><Check size={16} />{t('wcard.saved', lang)}</>
              ) : adding ? (
                <><Loader2 size={16} className="animate-spin" />{t('wcard.adding', lang)}</>
              ) : (
                <><Plus size={16} />{t('wcard.add', lang)}</>
              )}
            </button>
          </>
        ) : null}
      </div>
    </div>
  );
}
