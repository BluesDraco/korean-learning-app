'use client';

import { useState, useMemo, useCallback } from 'react';
import { Shuffle, Copy, Check, Info } from 'lucide-react';
import { PageHeader, Section, Card, Button } from '@/components/ui';
import { useToast } from '@/hooks/useToast';
import { useLang } from '@/components/LangProvider';
import { t, type Lang } from '@/lib/i18n';
import {
  SURNAMES,
  NAMES,
  getSourceLabel,
  getGenderLabel,
  getStyleLabel,
  type KoreanName,
  type KoreanSurname,
  type Gender,
  type NameStyle,
  type NameSource,
} from '@/data/tools/korean-names';

interface Candidate {
  surname: KoreanSurname;
  name: KoreanName;
}

const GENDER_OPTIONS: { value: Gender | 'ANY'; label: string }[] = [
  { value: 'ANY', label: 'tools.kn_any' },
  { value: 'F', label: 'tools.kn_female' },
  { value: 'M', label: 'tools.kn_male' },
  { value: 'U', label: 'tools.kn_neutral' },
];

const STYLE_OPTIONS: { value: NameStyle | 'ANY'; label: string }[] = [
  { value: 'ANY', label: 'tools.kn_any' },
  { value: 'modern', label: 'tools.kn_modern' },
  { value: 'classic', label: 'tools.kn_classic' },
  { value: 'idol', label: 'tools.kn_idol' },
  { value: 'literary', label: 'tools.kn_literary' },
];

const SOURCE_OPTIONS: { value: NameSource | 'ANY'; label: string; hint: string }[] = [
  { value: 'ANY', label: 'tools.kn_src_any', hint: 'tools.kn_src_any_hint' },
  { value: 'common', label: 'tools.kn_src_common', hint: 'tools.kn_src_common_hint' },
  { value: 'created', label: 'tools.kn_src_created', hint: 'tools.kn_src_created_hint' },
];

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function sourceTone(source: NameSource): { bg: string; fg: string; border: string } {
  if (source === 'common') return { bg: 'var(--color-pink-soft, #fff0f5)', fg: 'var(--color-pink-strong)', border: 'var(--color-pink-base)' };
  return { bg: 'var(--color-mint-soft)', fg: 'var(--color-mint-strong)', border: 'var(--color-mint-base)' };
}

export default function KoreanNameClient() {
  const { lang } = useLang();
  const [gender, setGender] = useState<Gender | 'ANY'>('ANY');
  const [style, setStyle] = useState<NameStyle | 'ANY'>('ANY');
  const [source, setSource] = useState<NameSource | 'ANY'>('ANY');
  const [candidates, setCandidates] = useState<Candidate[]>([]);
  const [copiedIdx, setCopiedIdx] = useState<number | null>(null);
  const { showToast } = useToast();

  const filtered = useMemo(() => {
    return NAMES.filter((n) => {
      if (gender !== 'ANY' && n.gender !== gender && n.gender !== 'U') return false;
      if (style !== 'ANY' && !n.style.includes(style)) return false;
      if (source !== 'ANY' && n.source !== source) return false;
      return true;
    });
  }, [gender, style, source]);

  const generate = useCallback(() => {
    if (filtered.length === 0) {
      showToast(t('tools.kn_no_match', lang), 'info');
      return;
    }
    const picked: Candidate[] = [];
    const usedNames = new Set<string>();
    const targetCount = Math.min(5, filtered.length);
    let attempts = 0;
    while (picked.length < targetCount && attempts < 50) {
      const name = pickRandom(filtered);
      if (usedNames.has(name.hangul)) { attempts++; continue; }
      usedNames.add(name.hangul);
      picked.push({ surname: pickRandom(SURNAMES), name });
      attempts++;
    }
    setCandidates(picked);
  }, [filtered, showToast, lang]);

  const copyName = useCallback(async (idx: number, c: Candidate) => {
    const text = `${c.surname.hangul}${c.name.hangul} (${c.surname.roman} ${c.name.roman})`;
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIdx(idx);
      showToast(t('tools.copied', lang), 'success');
      setTimeout(() => setCopiedIdx(null), 1500);
    } catch {
      showToast(t('tools.copy_failed', lang), 'info');
    }
  }, [showToast, lang]);

  return (
    <div className="py-4 max-w-2xl md:max-w-3xl mx-auto">
      <PageHeader
        eyebrow="도구"
        title={t('tools.kn_title', lang)}
        subtitle={t('tools.kn_subtitle', lang)}
        tone="pink"
      />

      {/* Filters */}
      <Section title={t('tools.kn_filters', lang)} spacing="normal">
        <Card padding="md">
          <div style={{ display: 'grid', gap: 12 }}>
            <Filter label={t('tools.kn_gender', lang)} options={GENDER_OPTIONS} value={gender} onChange={setGender} lang={lang} />
            <Filter label={t('tools.kn_style', lang)} options={STYLE_OPTIONS} value={style} onChange={setStyle} lang={lang} />
            <Filter label={t('tools.kn_source', lang)} options={SOURCE_OPTIONS} value={source} onChange={setSource} withHint lang={lang} />
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 12, gap: 8 }}>
            <span style={{ fontSize: 12, color: 'var(--color-ink-3)' }}>
              {t('tools.kn_match_count', lang, { n: filtered.length })}
            </span>
            <Button
              variant="primary"
              tone="pink"
              size="md"
              onClick={generate}
              icon={<Shuffle size={16} strokeWidth={1.75} />}
            >
              {candidates.length ? t('tools.kn_reroll', lang) : t('tools.kn_generate', lang)}
            </Button>
          </div>
        </Card>
      </Section>

      {/* Results */}
      {candidates.length > 0 && (
        <Section title={t('tools.kn_results', lang)} spacing="normal">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {candidates.map((c, idx) => {
              const tone = sourceTone(c.name.source);
              return (
                <Card key={`${c.surname.hangul}-${c.name.hangul}-${idx}`} padding="md">
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12 }}>
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
                        <span style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-ink-1)' }}>
                          {c.surname.hangul}{c.name.hangul}
                        </span>
                        <span style={{ fontSize: 14, color: 'var(--color-ink-3)', fontFamily: 'ui-monospace, monospace' }}>
                          {c.surname.roman} {c.name.roman}
                        </span>
                      </div>
                      <div style={{ marginTop: 6, fontSize: 13, color: 'var(--color-ink-2)' }}>
                        <span style={{ fontWeight: 700 }}>{c.surname.hanja}{c.name.hanja || ''}</span>
                        {c.name.hanja && <span style={{ color: 'var(--color-ink-3)' }}>（{c.name.meaning}）</span>}
                      </div>
                      <div style={{ marginTop: 8, display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                        <span
                          style={{
                            fontSize: 11, padding: '3px 8px', borderRadius: 999,
                            background: tone.bg, color: tone.fg,
                            border: `1px solid ${tone.border}`, fontWeight: 700,
                          }}
                        >
                          {getSourceLabel(c.name.source)}
                        </span>
                        <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 999, background: 'var(--color-surface-2)', color: 'var(--color-ink-3)' }}>
                          {getGenderLabel(c.name.gender)}
                        </span>
                        {c.name.era && (
                          <span style={{ fontSize: 11, padding: '3px 8px', borderRadius: 999, background: 'var(--color-surface-2)', color: 'var(--color-ink-3)' }}>
                            {c.name.era}
                          </span>
                        )}
                        {c.name.style.map((s) => (
                          <span key={s} style={{ fontSize: 11, padding: '3px 8px', borderRadius: 999, background: 'var(--color-surface-2)', color: 'var(--color-ink-3)' }}>
                            {getStyleLabel(s)}
                          </span>
                        ))}
                      </div>
                      <p style={{ marginTop: 10, fontSize: 13, color: 'var(--color-ink-3)', lineHeight: 1.6, display: 'flex', gap: 6 }}>
                        <Info size={14} strokeWidth={1.75} style={{ marginTop: 2, flexShrink: 0 }} />
                        <span>{c.name.reason}</span>
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => copyName(idx, c)}
                      aria-label={t('tools.copy', lang)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        padding: '6px 10px', borderRadius: 8,
                        border: '1px solid var(--color-line)',
                        background: 'var(--color-surface-1)',
                        color: 'var(--color-ink-2)',
                        fontSize: 12, cursor: 'pointer', flexShrink: 0,
                      }}
                    >
                      {copiedIdx === idx ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={1.75} />}
                      {copiedIdx === idx ? t('tools.copied', lang) : t('tools.copy', lang)}
                    </button>
                  </div>
                </Card>
              );
            })}
          </div>
        </Section>
      )}

      {/* Data source note */}
      <Section title={t('tools.kn_about', lang)} spacing="normal">
        <Card padding="md">
          <div style={{ display: 'grid', gap: 10, fontSize: 13, lineHeight: 1.7, color: 'var(--color-ink-2)' }}>
            <p style={{ margin: 0 }}>
              <strong style={{ color: 'var(--color-pink-strong)' }}>{t('tools.kn_src_common', lang)}</strong>{t('tools.kn_about_common', lang)}
            </p>
            <p style={{ margin: 0 }}
              dangerouslySetInnerHTML={{ __html: `<strong style="color:var(--color-mint-strong)">${t('tools.kn_src_created', lang)}</strong>${t('tools.kn_about_created', lang)}` }}
            />
          </div>
        </Card>
      </Section>
    </div>
  );
}

function Filter<T extends string>({
  label,
  options,
  value,
  onChange,
  withHint,
  lang,
}: {
  label: string;
  options: { value: T; label: string; hint?: string }[];
  value: T;
  onChange: (v: T) => void;
  withHint?: boolean;
  lang: Lang;
}) {
  return (
    <div>
      <div style={{ fontSize: 12, color: 'var(--color-ink-3)', marginBottom: 6, fontWeight: 700 }}>{label}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
        {options.map((opt) => {
          const active = opt.value === value;
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              aria-pressed={active}
              style={{
                padding: '6px 12px',
                borderRadius: 999,
                border: '1px solid var(--color-line)',
                background: active ? 'var(--color-ink-1)' : 'var(--color-surface-1)',
                color: active ? '#fff' : 'var(--color-ink-1)',
                fontSize: 13,
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
              }}
            >
              {t(opt.label, lang)}
              {withHint && opt.hint && (
                <span style={{ fontSize: 10, fontWeight: 400, opacity: 0.7 }}>· {t(opt.hint, lang, { n: NAMES.length })}</span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
