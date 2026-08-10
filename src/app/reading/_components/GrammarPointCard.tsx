'use client';

import { Volume2, Puzzle, AlertTriangle, ChevronRight } from 'lucide-react';
import type { GrammarCard, ConnectionRule } from '@/types';
import { t, type Lang, enVal } from '@/lib/i18n';

// 重点句型页：单个关联语法课卡片（从 273 节语法课 GrammarCard 摘取核心分段，逐张揭示时淡入）
export default function GrammarPointCard({ card, onSpeak, lang }: {
  card: GrammarCard; onSpeak: (text: string) => void; lang: Lang;
}) {
  const structNoteLines = card.structureNote ? card.structureNote.split('\n').filter(Boolean) : [];
  const rulesNoteLines = card.rulesNote ? card.rulesNote.split('\n').filter(Boolean) : [];
  const rules = (card.connectionRules || [])
    .filter((r): r is ConnectionRule => typeof r === 'object' && r.type === 'rule')
    .slice(0, 4);
  return (
    <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 animate-fade-in">

      <div className="flex items-start gap-3 mb-3">
        <div className="shrink-0 w-9 h-9 rounded-xl bg-[var(--mint-soft)]/15 flex items-center justify-center">
          <Puzzle size={17} className="text-[var(--mint-soft)]" />
        </div>
        <div className="min-w-0">
          <div className="inline-block px-2.5 py-1 rounded-lg bg-[var(--mint-soft)]/12 text-[var(--mint-soft)] text-sm font-black mb-1" style={{ fontFamily: "'Pretendard', sans-serif" }}>
            {card.title}
          </div>
          <p className="text-xs text-[var(--text-muted)]">{enVal(card, 'whatItDoes', lang)}</p>
        </div>
      </div>

      {card.whatItDoesBody && (
        <div className="gp-sec">
          <p className="gp-sec-h">{t('reading.gp_usage', lang)}</p>
          <p className="text-sm text-[var(--text-secondary)] leading-relaxed whitespace-pre-line">{enVal(card, 'whatItDoesBody', lang)}</p>
        </div>
      )}

      {structNoteLines.length > 0 && (
        <div className="gp-sec">
          <p className="gp-sec-h">{t('reading.gp_attach', lang)}</p>
          <div className="flex flex-col gap-1.5">
            {structNoteLines.map((s, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-[var(--bg-input)] border border-[var(--border-color)] text-sm text-[var(--text-primary)]" style={{ fontFamily: "'Pretendard', sans-serif" }}>
                {s}
              </span>
            ))}
          </div>
        </div>
      )}

      {rules.length > 0 && (
        <div className="gp-sec">
          <p className="gp-sec-h">{t('reading.gp_rules', lang)}</p>
          <div className="space-y-1.5">
            {rules.map((r, i) => (
              <div key={i} className="text-xs leading-relaxed">
                <span className="text-[var(--text-secondary)]">{r.text}</span>
                {r.examples && <span className="text-[var(--mint-soft)] ml-1.5" style={{ fontFamily: "'Pretendard', sans-serif" }}>{r.examples}</span>}
              </div>
            ))}
          </div>
        </div>
      )}

      {card.structures?.length > 0 && (
        <div className="gp-sec">
          <p className="gp-sec-h">{t('reading.gp_examples', lang)}</p>
          <div className="space-y-1.5">
            {card.structures.slice(0, 3).map((ex, i) => (
              <div key={i} className="flex items-start gap-2 bg-[var(--bg-input)] rounded-xl px-3 py-2">
                <button onClick={() => onSpeak(ex.ko)} className="shrink-0 mt-0.5 text-[var(--text-muted)] hover:text-[var(--mint-soft)] transition-colors" aria-label={t('reading.speak', lang)}>
                  <Volume2 size={13} />
                </button>
                <div className="min-w-0">
                  <p className="text-sm text-[var(--text-primary)]" style={{ fontFamily: "'Pretendard', sans-serif" }}>{ex.ko}</p>
                  {ex.zh && <p className="text-xs text-[var(--text-muted)] mt-0.5">{ex.zh}</p>}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {rulesNoteLines.length > 0 && (
        <div className="gp-sec">
          <p className="gp-sec-h">{t('reading.gp_tips', lang)}</p>
          <ul className="text-xs text-[var(--text-secondary)] leading-relaxed space-y-1 list-disc pl-4">
            {rulesNoteLines.map((s, i) => <li key={i}>{s}</li>)}
          </ul>
        </div>
      )}

      {card.mistakes?.length > 0 && (
        <div className="gp-sec">
          <p className="gp-sec-h flex items-center gap-1.5"><AlertTriangle size={12} className="text-[var(--peach-soft)]" /> {t('reading.gp_mistakes', lang)}</p>
          <div className="rounded-xl border border-[var(--peach-soft)]/30 bg-[var(--peach-soft)]/8 p-3">
            {card.mistakes.slice(0, 2).map((m, i) => (
              <div key={i} className="text-xs leading-relaxed mb-2 last:mb-0">
                <div>
                  <span className="line-through text-[var(--text-muted)]" style={{ fontFamily: "'Pretendard', sans-serif" }}>{m.wrong}</span>
                  <span className="mx-1.5 text-[var(--text-muted)]">→</span>
                  <span className="font-bold text-[var(--mint-soft)]" style={{ fontFamily: "'Pretendard', sans-serif" }}>{m.correct}</span>
                </div>
                <p className="text-[var(--text-muted)] mt-0.5">{m.note}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      <a href={`/grammar?card=${card.id}`} className="inline-flex items-center gap-1 text-xs font-bold text-[var(--mint-soft)] mt-1 hover:underline">
        {t('reading.gp_full_lesson', lang)} <ChevronRight size={13} />
      </a>
    </div>
  );
}
