'use client';

import { useEffect, useState } from 'react';
import { X, Check, ChevronRight } from 'lucide-react';
import { db } from '@/lib/db';
import { getAllThemes } from '@/data/vocabulary';
import { loadYonseiIndex, loadSeoulIndex, loadVitaminIndex, type UnitMeta } from '@/lib/dataLoader';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';
import {
  type PracticeSourceConfig, type SourceKind, type ContentFilter,
  SENTENCE_CAPABLE,
} from '@/lib/practice/sourceBuilder';

interface SourceMeta { kind: SourceKind; label: string; icon: string; hint: string; }

const SYSTEM_SOURCES: SourceMeta[] = [
  { kind: 'smart',      label: 'prac.src_smart',      icon: '⭐', hint: 'prac.src_smart_hint' },
  { kind: 'topik',      label: 'prac.src_topik',      icon: '🎯', hint: 'prac.src_topik_hint' },
  { kind: 'theme',      label: 'prac.src_theme',      icon: '🗂️', hint: 'prac.src_theme_hint' },
  { kind: 'textbook',   label: 'prac.src_textbook',   icon: '🎓', hint: 'prac.src_textbook_hint' },
  { kind: 'expression', label: 'prac.src_expression', icon: '💬', hint: 'prac.src_expression_hint' },
  { kind: 'builtin',    label: 'prac.src_builtin',    icon: '📚', hint: 'prac.src_builtin_hint' },
];
const MY_SOURCES: SourceMeta[] = [
  { kind: 'mistake',     label: 'prac.src_mistake',     icon: '🧠', hint: 'prac.src_mistake_hint' },
  { kind: 'wordbook',    label: 'prac.src_wordbook',    icon: '📖', hint: 'prac.src_wordbook_hint' },
  { kind: 'my-sentence', label: 'prac.src_my_sentence', icon: '📌', hint: 'prac.src_my_sentence_hint' },
];

const CONTENT_FILTERS: { key: ContentFilter; label: string }[] = [
  { key: 'both', label: 'prac.filter_both' },
  { key: 'word', label: 'prac.filter_word' },
  { key: 'sentence', label: 'prac.filter_sentence' },
];

function sourceSummary(config: PracticeSourceConfig, lang: Lang): string {
  switch (config.kind) {
    case 'smart': return t('prac.src_smart', lang);
    case 'topik': return config.topik ? t('prac.src_topik_level', lang, { n: config.topik.level }) : t('prac.src_topik', lang);
    case 'theme': return config.theme?.name ?? t('prac.src_theme', lang);
    case 'textbook': return config.textbook?.unitName ?? t('prac.src_textbook', lang);
    case 'expression': return config.expression?.type === 'idiom' ? t('prac.src_idiom', lang) : config.expression?.type === 'slang' ? t('prac.src_slang', lang) : config.expression?.type === 'loanword' ? t('prac.src_loanword', lang) : t('prac.src_expression', lang);
    case 'builtin': return config.builtin ? ({ beginner: t('prac.src_beginner_daily', lang), intermediate: t('prac.src_intermediate_life', lang), advanced: t('prac.src_advanced', lang) }[config.builtin.packId]) : t('prac.src_builtin', lang);
    case 'wordbook': return config.wordbook?.name ?? t('prac.src_wordbook', lang);
    case 'my-sentence': return t('prac.src_my_sentence', lang);
    case 'mistake': return t('prac.src_mistake', lang);
  }
}

interface SourcePickerProps {
  [k: string]: unknown;
  config: PracticeSourceConfig;
  onChange: (c: PracticeSourceConfig) => void;
  tone?: 'mint' | 'peach' | 'purple' | 'pink';
}

/** 触发按钮 · 显示当前题源,点击打开选源浮层 */
export function SourcePicker({ config, onChange, tone = 'mint' }: SourcePickerProps) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 8, maxWidth: 420, width: '100%',
          justifyContent: 'space-between', padding: '12px 16px', borderRadius: 14,
          background: 'var(--hr-surface-2)', border: '1.5px solid var(--hr-border-2)',
          cursor: 'pointer', fontFamily: 'var(--hr-sans)',
        }}
      >
        <span style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'flex-start', gap: 2, minWidth: 0 }}>
          <span style={{ fontSize: 10.5, color: 'var(--hr-ink-3)', letterSpacing: '.1em', textTransform: 'uppercase' }}>{t('prac.src_current_label', lang)}</span>
          <span style={{ fontSize: 14, fontWeight: 700, color: 'var(--hr-ink-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', maxWidth: 300 }}>
            {sourceSummary(config, lang)}
            <span style={{ fontWeight: 500, color: 'var(--hr-ink-3)', marginLeft: 6 }}>
              · {(() => { const f = CONTENT_FILTERS.find(f => f.key === config.contentFilter); return f ? t(f.label, lang) : ''; })()}
            </span>
          </span>
        </span>
        <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--hr-mint-strong)', flexShrink: 0 }}>{t('prac.src_change', lang)}</span>
      </button>
      {open && <SourceSheet config={config} onChange={onChange} tone={tone} onClose={() => setOpen(false)} />}
    </>
  );
}

function SourceSheet({ config, onChange, tone, onClose }: SourcePickerProps & { onClose: () => void }) {
  const { lang } = useLang();
  const [themes, setThemes] = useState<{ id: string; name: string; emoji: string }[]>([]);
  const [books, setBooks] = useState<{ id: string; name: string; count: number }[]>([]);
  const [units, setUnits] = useState<Record<'yonsei' | 'seoul' | 'vitamin', UnitMeta[]>>({ yonsei: [], seoul: [], vitamin: [] });
  const accent = `var(--hr-${tone}-strong)`;
  const accentBg = `var(--hr-${tone}-soft)`;

  useEffect(() => {
    getAllThemes().then(ts => setThemes(ts.map(th => ({ id: th.id, name: th.name, emoji: th.emoji })))).catch(e => console.error('[SourcePicker] load themes failed', e));
    db.wordBooks.toArray().then(bs => setBooks(bs.map(b => ({ id: b.id, name: b.name, count: b.wordIds.length })))).catch(e => console.error('[SourcePicker] load wordBooks failed', e));
    Promise.all([loadYonseiIndex(), loadSeoulIndex(), loadVitaminIndex()])
      .then(([y, s, v]) => setUnits({ yonsei: y, seoul: s, vitamin: v }))
      .catch(e => console.error('[SourcePicker] load textbook indexes failed', e));
  }, []);

  const set = (patch: Partial<PracticeSourceConfig>) => onChange({ ...config, ...patch });
  const pickKind = (kind: SourceKind) => {
    // 切到纯词源时,若当前筛选是"仅句子",回退到"词+句"
    const nextFilter: ContentFilter = !SENTENCE_CAPABLE.has(kind) && config.contentFilter === 'sentence' ? 'both' : config.contentFilter;
    set({ kind, contentFilter: nextFilter });
  };

  const chipStyle = (active: boolean): React.CSSProperties => ({
    padding: '8px 14px', borderRadius: 10, fontSize: 13, fontWeight: 600, border: 'none', cursor: 'pointer',
    background: active ? accent : 'var(--hr-surface-3)', color: active ? '#fff' : 'var(--hr-ink-2)',
  });

  return (
    <div
      style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}
      onClick={onClose}
    >
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,.35)' }} />
      <div
        onClick={e => e.stopPropagation()}
        style={{
          position: 'relative', width: '100%', maxWidth: 480, maxHeight: '82vh', display: 'flex', flexDirection: 'column',
          background: 'var(--hr-surface-1)', borderTopLeftRadius: 24, borderTopRightRadius: 24,
          borderTop: '1px solid var(--hr-border-1)',
          paddingBottom: 'calc(56px + env(safe-area-inset-bottom, 0px))',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 20px 12px', flexShrink: 0 }}>
          <h3 style={{ fontSize: 16, fontWeight: 800, color: 'var(--hr-ink-1)', margin: 0, fontFamily: 'var(--hr-sans)' }}>{t('prac.src_dialog_title', lang)}</h3>
          <button onClick={onClose} aria-label={t('prac.src_close', lang)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--hr-ink-3)' }}><X size={20} /></button>
        </div>

        {/* 内容筛选 */}
        <div style={{ padding: '0 20px 12px', display: 'flex', gap: 8, flexShrink: 0 }}>
          {CONTENT_FILTERS.map(f => {
            const disabled = f.key === 'sentence' && !SENTENCE_CAPABLE.has(config.kind);
            return (
              <button
                key={f.key}
                disabled={disabled}
                onClick={() => set({ contentFilter: f.key })}
                style={{
                  flex: 1, padding: '9px 0', borderRadius: 10, fontSize: 13, fontWeight: 700, border: 'none',
                  cursor: disabled ? 'not-allowed' : 'pointer', opacity: disabled ? 0.4 : 1,
                  background: config.contentFilter === f.key ? accent : 'var(--hr-surface-3)',
                  color: config.contentFilter === f.key ? '#fff' : 'var(--hr-ink-2)',
                }}
              >{t(f.label, lang)}</button>
            );
          })}
        </div>

        <div style={{ overflowY: 'auto', padding: '4px 20px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
          <SourceGroup title={t('prac.src_group_system', lang)} sources={SYSTEM_SOURCES} kind={config.kind} onPick={pickKind} accent={accent} accentBg={accentBg} lang={lang} />

          {/* 展开面板 · 按当前来源渲染 */}
          {config.kind === 'topik' && (
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', padding: '4px 0 8px' }}>
              {[1, 2, 3, 4, 5, 6].map(lv => (
                <button key={lv} onClick={() => set({ topik: { level: lv } })} style={chipStyle(config.topik?.level === lv)}>{t('prac.src_level_n', lang, { n: lv })}</button>
              ))}
            </div>
          )}
          {config.kind === 'theme' && (
            <ScrollList>
              {themes.map(th => (
                <RowBtn key={th.id} active={config.theme?.id === th.id} accent={accent} accentBg={accentBg}
                  onClick={() => set({ theme: { id: th.id, name: th.name } })} label={`${th.emoji} ${th.name}`} />
              ))}
            </ScrollList>
          )}
          {config.kind === 'textbook' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '4px 0 8px' }}>
              <div style={{ display: 'flex', gap: 8 }}>
                {(['yonsei', 'seoul', 'vitamin'] as const).map(s => (
                  <button key={s} onClick={() => set({ textbook: { series: s, unitId: '', unitName: '' } })} style={chipStyle(config.textbook?.series === s)}>
                    {t(s === 'yonsei' ? 'prac.src_tb_yonsei' : s === 'seoul' ? 'prac.src_tb_seoul' : 'prac.src_tb_vitamin', lang)}
                  </button>
                ))}
              </div>
              {config.textbook?.series && (
                <ScrollList>
                  {units[config.textbook.series].map(u => (
                    <RowBtn key={u.id} active={config.textbook?.unitId === u.id} accent={accent} accentBg={accentBg}
                      onClick={() => set({ textbook: { series: config.textbook!.series, unitId: u.id, unitName: `${u.bookTitle} · ${u.title}` } })}
                      label={t('prac.src_unit_label', lang, { book: u.bookTitle, num: u.unitNumber, title: u.title })} sub={t('prac.src_word_count', lang, { n: u.wordCount })} />
                  ))}
                </ScrollList>
              )}
            </div>
          )}
          {config.kind === 'expression' && (
            <div style={{ display: 'flex', gap: 8, padding: '4px 0 8px' }}>
              {(['idiom', 'slang', 'loanword'] as const).map(ex => (
                <button key={ex} onClick={() => set({ expression: { type: ex } })} style={chipStyle(config.expression?.type === ex)}>
                  {t(ex === 'idiom' ? 'prac.src_exp_idiom' : ex === 'slang' ? 'prac.src_exp_slang' : 'prac.src_exp_loanword', lang)}
                </button>
              ))}
            </div>
          )}
          {config.kind === 'builtin' && (
            <div style={{ display: 'flex', gap: 8, padding: '4px 0 8px' }}>
              {(['beginner', 'intermediate', 'advanced'] as const).map(p => (
                <button key={p} onClick={() => set({ builtin: { packId: p } })} style={chipStyle(config.builtin?.packId === p)}>
                  {t(p === 'beginner' ? 'prac.src_builtin_beginner' : p === 'intermediate' ? 'prac.src_builtin_intermediate' : 'prac.src_builtin_advanced', lang)}
                </button>
              ))}
            </div>
          )}

          <SourceGroup title={t('prac.src_group_mine', lang)} sources={MY_SOURCES} kind={config.kind} onPick={pickKind} accent={accent} accentBg={accentBg} lang={lang} />
          {config.kind === 'wordbook' && (
            <ScrollList>
              {books.length === 0
                ? <p style={{ fontSize: 13, color: 'var(--hr-ink-3)', textAlign: 'center', padding: '12px 0' }}>{t('prac.src_no_wordbook', lang)}</p>
                : books.map(b => (
                  <RowBtn key={b.id} active={config.wordbook?.id === b.id} accent={accent} accentBg={accentBg}
                    onClick={() => set({ wordbook: { id: b.id, name: b.name } })} label={b.name} sub={t('prac.src_word_count', lang, { n: b.count })} />
                ))}
            </ScrollList>
          )}
        </div>

        <div style={{ padding: '10px 20px 4px', flexShrink: 0, borderTop: '1px solid var(--hr-border-1)' }}>
          <button
            onClick={onClose}
            style={{ width: '100%', padding: '13px 0', borderRadius: 14, background: 'var(--hr-ink-1)', color: 'var(--hr-surface-1)', fontSize: 14, fontWeight: 700, border: 'none', cursor: 'pointer' }}
          >{t('prac.src_done', lang)}</button>
        </div>
      </div>
    </div>
  );
}

function SourceGroup({ title, sources, kind, onPick, accent, accentBg, lang }: {
  title: string; sources: SourceMeta[]; kind: SourceKind; onPick: (k: SourceKind) => void; accent: string; accentBg: string; lang: Lang;
}) {
  return (
    <div>
      <p style={{ fontSize: 10.5, fontWeight: 700, color: 'var(--hr-ink-3)', letterSpacing: '.1em', textTransform: 'uppercase', margin: '4px 0 8px' }}>{title}</p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
        {sources.map(s => {
          const active = kind === s.kind;
          return (
            <button
              key={s.kind}
              onClick={() => onPick(s.kind)}
              style={{
                display: 'flex', flexDirection: 'column', gap: 3, padding: '11px 12px', borderRadius: 12, textAlign: 'left',
                background: active ? accentBg : 'var(--hr-surface-2)',
                border: `1.5px solid ${active ? accent : 'var(--hr-border-2)'}`,
                cursor: 'pointer', position: 'relative',
              }}
            >
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--hr-ink-1)' }}>{s.icon} {t(s.label, lang)}</span>
              <span style={{ fontSize: 10.5, color: 'var(--hr-ink-3)', lineHeight: 1.4 }}>{t(s.hint, lang)}</span>
              {active && <Check size={13} style={{ position: 'absolute', top: 10, right: 10, color: accent }} />}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function ScrollList({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, maxHeight: 220, overflowY: 'auto', flexShrink: 0, borderRadius: 12, border: '1px solid var(--hr-border-1)', padding: 8 }}>
      {children}
    </div>
  );
}

function RowBtn({ active, onClick, label, sub, accent, accentBg }: {
  active: boolean; onClick: () => void; label: string; sub?: string; accent: string; accentBg: string;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8, padding: '9px 12px', borderRadius: 10,
        background: active ? accentBg : 'transparent', border: 'none', cursor: 'pointer', textAlign: 'left',
      }}
    >
      <span style={{ fontSize: 13, color: 'var(--hr-ink-1)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{label}</span>
      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4, flexShrink: 0 }}>
        {sub && <span style={{ fontSize: 11, color: 'var(--hr-ink-3)' }}>{sub}</span>}
        {active ? <Check size={13} style={{ color: accent }} /> : <ChevronRight size={13} style={{ color: 'var(--hr-ink-4)' }} />}
      </span>
    </button>
  );
}
