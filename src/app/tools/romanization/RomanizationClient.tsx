'use client';

import { useState, useCallback } from 'react';
import { ArrowLeftRight, Copy, Check, Trash2 } from 'lucide-react';
import { PageHeader, Section, Card, Button } from '@/components/ui';
import { romanize } from '@/lib/dictionary';
import { romanToHangul } from '@/lib/romanToHangul';
import { useToast } from '@/hooks/useToast';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

type Direction = 'k2r' | 'r2k';

const EXAMPLES: { direction: Direction; input: string; hint: string }[] = [
  { direction: 'k2r', input: '안녕하세요', hint: 'tools.rm_ex_hello' },
  { direction: 'k2r', input: '감사합니다', hint: 'tools.rm_ex_thanks' },
  { direction: 'k2r', input: '사랑해', hint: 'tools.rm_ex_loveyou' },
  { direction: 'k2r', input: '서울', hint: 'tools.rm_ex_seoul' },
  { direction: 'k2r', input: '김치', hint: 'tools.rm_ex_kimchi' },
  { direction: 'k2r', input: '오빠', hint: 'tools.rm_ex_oppa' },
  { direction: 'r2k', input: 'annyeong', hint: 'tools.rm_ex_hello' },
  { direction: 'r2k', input: 'saranghae', hint: 'tools.rm_ex_loveyou' },
  { direction: 'r2k', input: 'gimchi', hint: 'tools.rm_ex_kimchi' },
  { direction: 'r2k', input: 'busan', hint: 'tools.rm_ex_busan' },
];

export default function RomanizationClient() {
  const { lang } = useLang();
  const [direction, setDirection] = useState<Direction>('k2r');
  const [input, setInput] = useState('');
  const [copied, setCopied] = useState(false);
  const { showToast } = useToast();

  const output = direction === 'k2r' ? romanize(input) : romanToHangul(input);

  const swap = useCallback(() => {
    setDirection((d) => (d === 'k2r' ? 'r2k' : 'k2r'));
    setInput(output);
  }, [output]);

  const copyResult = useCallback(async () => {
    if (!output) return;
    try {
      await navigator.clipboard.writeText(output);
      setCopied(true);
      showToast(t('tools.copied', lang), 'success');
      setTimeout(() => setCopied(false), 1500);
    } catch {
      showToast(t('tools.copy_failed', lang), 'info');
    }
  }, [output, showToast, lang]);

  const clear = useCallback(() => setInput(''), []);

  const inputLabel = direction === 'k2r' ? t('tools.rm_label_hangul', lang) : t('tools.rm_label_roman', lang);
  const outputLabel = direction === 'k2r' ? t('tools.rm_out_roman', lang) : t('tools.rm_out_hangul', lang);
  const placeholder = direction === 'k2r' ? t('tools.rm_ph_hangul', lang) : t('tools.rm_ph_roman', lang);

  return (
    <div className="py-4 max-w-2xl md:max-w-3xl mx-auto">
      <PageHeader
        eyebrow="도구"
        title={t('tools.rm_title', lang)}
        subtitle={t('tools.rm_subtitle', lang)}
        tone="pink"
      />

      {/* Direction toggle */}
      <Section spacing="normal">
        <Card padding="md">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
            <div style={{ display: 'flex', gap: 8 }}>
              <button
                type="button"
                onClick={() => setDirection('k2r')}
                aria-pressed={direction === 'k2r'}
                style={{
                  padding: '8px 14px',
                  borderRadius: 999,
                  border: '1px solid var(--color-line)',
                  background: direction === 'k2r' ? 'var(--color-ink-1)' : 'transparent',
                  color: direction === 'k2r' ? '#fff' : 'var(--color-ink-1)',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {t('tools.rm_k2r', lang)}
              </button>
              <button
                type="button"
                onClick={() => setDirection('r2k')}
                aria-pressed={direction === 'r2k'}
                style={{
                  padding: '8px 14px',
                  borderRadius: 999,
                  border: '1px solid var(--color-line)',
                  background: direction === 'r2k' ? 'var(--color-ink-1)' : 'transparent',
                  color: direction === 'r2k' ? '#fff' : 'var(--color-ink-1)',
                  fontSize: 13,
                  fontWeight: 700,
                  cursor: 'pointer',
                }}
              >
                {t('tools.rm_r2k', lang)}
              </button>
            </div>
            <button
              type="button"
              onClick={swap}
              aria-label={t('tools.rm_swap_dir', lang)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 4,
                padding: '6px 10px',
                borderRadius: 8,
                border: '1px solid var(--color-line)',
                background: 'var(--color-surface-1)',
                color: 'var(--color-ink-2)',
                fontSize: 12,
                cursor: 'pointer',
              }}
            >
              <ArrowLeftRight size={14} strokeWidth={1.75} /> {t('tools.rm_swap', lang)}
            </button>
          </div>
        </Card>
      </Section>

      {/* Input */}
      <Section title={inputLabel} spacing="normal">
        <Card padding="md">
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={placeholder}
            rows={4}
            style={{
              width: '100%',
              padding: 12,
              fontSize: 18,
              lineHeight: 1.6,
              border: '1px solid var(--color-line)',
              borderRadius: 10,
              background: 'var(--color-surface-2)',
              color: 'var(--color-ink-1)',
              resize: 'vertical',
              fontFamily: direction === 'k2r' ? 'inherit' : 'ui-monospace, monospace',
              outline: 'none',
            }}
          />
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <button
              type="button"
              onClick={clear}
              disabled={!input}
              style={{
                display: 'inline-flex', alignItems: 'center', gap: 4,
                padding: '6px 10px',
                borderRadius: 8,
                border: 'none',
                background: 'transparent',
                color: input ? 'var(--color-ink-3)' : 'var(--color-ink-4)',
                fontSize: 12,
                cursor: input ? 'pointer' : 'default',
              }}
            >
              <Trash2 size={14} strokeWidth={1.75} /> {t('tools.rm_clear', lang)}
            </button>
          </div>
        </Card>
      </Section>

      {/* Output */}
      <Section title={outputLabel} spacing="normal">
        <Card padding="md">
          <div
            style={{
              minHeight: 80,
              padding: 12,
              fontSize: 20,
              lineHeight: 1.6,
              border: '1px dashed var(--color-line)',
              borderRadius: 10,
              background: 'var(--color-surface-2)',
              color: 'var(--color-ink-1)',
              fontFamily: direction === 'k2r' ? 'ui-monospace, monospace' : 'inherit',
              wordBreak: 'break-word',
              whiteSpace: 'pre-wrap',
            }}
          >
            {output || <span style={{ color: 'var(--color-ink-4)', fontSize: 14 }}>{t('tools.rm_result_hint', lang)}</span>}
          </div>
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 8 }}>
            <Button
              variant="primary"
              tone="black"
              size="sm"
              onClick={copyResult}
              disabled={!output}
              icon={copied ? <Check size={14} strokeWidth={2} /> : <Copy size={14} strokeWidth={1.75} />}
            >
              {copied ? t('tools.copied', lang) : t('tools.copy', lang)}
            </Button>
          </div>
        </Card>
      </Section>

      {/* Examples */}
      <Section title={t('tools.rm_examples', lang)} spacing="normal">
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>
          {EXAMPLES.filter((ex) => ex.direction === direction).map((ex) => (
            <button
              key={ex.input}
              type="button"
              onClick={() => setInput(ex.input)}
              style={{
                padding: '8px 12px',
                borderRadius: 999,
                border: '1px solid var(--color-line)',
                background: 'var(--color-surface-1)',
                color: 'var(--color-ink-1)',
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              <span style={{ fontWeight: 700 }}>{ex.input}</span>
              <span style={{ color: 'var(--color-ink-3)', marginLeft: 6, fontSize: 12 }}>{t(ex.hint, lang)}</span>
            </button>
          ))}
        </div>
      </Section>

      {/* Rules explainer */}
      <Section title={t('tools.rm_ref_title', lang)} spacing="normal">
        <Card padding="md">
          <div style={{ display: 'grid', gap: 10, fontSize: 13, lineHeight: 1.7, color: 'var(--color-ink-2)' }}>
            <p style={{ margin: 0 }}>
              <strong>{t('tools.rm_initial', lang)}</strong>：ㄱ=g ㄲ=kk ㄴ=n ㄷ=d ㄸ=tt ㄹ=r ㅁ=m ㅂ=b ㅃ=pp ㅅ=s ㅆ=ss ㅇ=∅ ㅈ=j ㅉ=jj ㅊ=ch ㅋ=k ㅌ=t ㅍ=p ㅎ=h
            </p>
            <p style={{ margin: 0 }}>
              <strong>{t('tools.rm_medial', lang)}</strong>：ㅏ=a ㅐ=ae ㅑ=ya ㅒ=yae ㅓ=eo ㅔ=e ㅕ=yeo ㅖ=ye ㅗ=o ㅘ=wa ㅙ=wae ㅚ=oe ㅛ=yo ㅜ=u ㅝ=wo ㅞ=we ㅟ=wi ㅠ=yu ㅡ=eu ㅢ=ui ㅣ=i
            </p>
            <p style={{ margin: 0 }}>
              <strong>{t('tools.rm_final', lang)}</strong>：ㄱ=k ㄴ=n ㄷ=t ㄹ=l ㅁ=m ㅂ=p ㅇ=ng{t('tools.rm_final_note', lang)}
            </p>
            <p style={{ margin: '4px 0 0', color: 'var(--color-ink-3)', fontSize: 12 }}>
              {t('tools.rm_ref_footer', lang)}
            </p>
          </div>
        </Card>
      </Section>
    </div>
  );
}
