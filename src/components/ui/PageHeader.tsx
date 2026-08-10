'use client';

import type { ReactNode } from 'react';
import { ArrowLeft } from 'lucide-react';
import { ToriCardMascot, type ToriPose } from '@/components/mobile/ToriCardMascot';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

type Tone = 'neutral' | 'pink' | 'mint' | 'peach' | 'purple';

export interface PageHeaderProps {
  [k: string]: unknown;
  /** Small label above title, e.g. "오늘" */
  eyebrow?: string;
  title: string;
  subtitle?: string;
  /** Show Tori mascot at right side */
  mascot?: ToriPose | 'none';
  tone?: Tone;
  /** Right-aligned action slot (button etc.) */
  actions?: ReactNode;
  /** When true, no gradient background — just a typography header */
  flat?: boolean;
  /** When provided, show a back arrow (←) at the left that calls this */
  onBack?: () => void;
}

function BackBtn({ onBack }: { onBack: () => void }) {
  const { lang } = useLang();
  return (
    <button
      onClick={onBack}
      aria-label={t('ui.ph_back', lang)}
      style={{
        flexShrink: 0, width: 38, height: 38, borderRadius: 12,
        border: '1px solid var(--color-border-1)', background: 'var(--color-surface-1)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        color: 'var(--color-ink-2)', cursor: 'pointer', marginRight: 12,
      }}
    >
      <ArrowLeft size={18} />
    </button>
  );
}

const TONE_GRADIENT: Record<Tone, string> = {
  neutral: 'linear-gradient(135deg, var(--color-surface-2), var(--hero-grad-end-neutral))',
  pink:    'linear-gradient(135deg, var(--color-pink-soft), var(--hero-grad-end-pink))',
  mint:    'linear-gradient(135deg, var(--color-mint-soft), var(--hero-grad-end-mint))',
  peach:   'linear-gradient(135deg, var(--color-peach-soft), var(--hero-grad-end-peach))',
  purple:  'linear-gradient(135deg, var(--color-purple-soft), var(--hero-grad-end-purple))',
};

const TONE_EYEBROW_COLOR: Record<Tone, string> = {
  neutral: 'var(--color-ink-3)',
  pink:    'var(--color-pink-strong)',
  mint:    'var(--color-mint-strong)',
  peach:   'var(--color-peach-strong)',
  purple:  'var(--color-purple-strong)',
};

export function PageHeader({
  eyebrow,
  title,
  subtitle,
  mascot = 'none',
  tone = 'neutral',
  actions,
  flat = false,
  onBack,
}: PageHeaderProps) {
  if (flat) {
    return (
      <header style={{ marginBottom: 24 }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 16 }}>
          <div style={{ minWidth: 0 }}>
            {eyebrow && (
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                  color: TONE_EYEBROW_COLOR[tone],
                  marginBottom: 6,
                  textTransform: 'uppercase',
                }}
              >
                {eyebrow}
              </p>
            )}
            <h1 style={{ fontSize: 28, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0, lineHeight: 1.15 }}>
              {title}
            </h1>
            {subtitle && (
              <p style={{ fontSize: 14, color: 'var(--color-ink-3)', marginTop: 4, lineHeight: 1.5 }}>
                {subtitle}
              </p>
            )}
          </div>
          {actions && <div style={{ flexShrink: 0 }}>{actions}</div>}
        </div>
      </header>
    );
  }

  return (
    <header
      style={{
        position: 'relative',
        background: TONE_GRADIENT[tone],
        border: '1px solid var(--color-border-1)',
        borderRadius: 'var(--radius-xl)',
        padding: '22px 24px',
        marginBottom: 24,
        boxShadow: 'var(--shadow-sm)',
        overflow: 'hidden',
      }}
    >
      <div style={{ display: 'flex', alignItems: onBack ? 'center' : 'flex-end', justifyContent: onBack ? 'flex-start' : 'space-between', gap: onBack ? 0 : 16, position: 'relative', zIndex: 1 }}>
        {onBack && <BackBtn onBack={onBack} />}
        <div style={{ minWidth: 0, paddingRight: mascot !== 'none' ? 80 : 0 }}>
          {eyebrow && (
            <p
              style={{
                fontSize: 12,
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: TONE_EYEBROW_COLOR[tone],
                marginBottom: 6,
                textTransform: 'uppercase',
              }}
            >
              {eyebrow}
            </p>
          )}
          <h1 style={{ fontSize: 26, fontWeight: 800, color: 'var(--color-ink-1)', margin: 0, lineHeight: 1.15 }}>
            {title}
          </h1>
          {subtitle && (
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', marginTop: 4, lineHeight: 1.5 }}>
              {subtitle}
            </p>
          )}
          {actions && <div style={{ marginTop: 14 }}>{actions}</div>}
        </div>
      </div>
      {mascot !== 'none' && <ToriCardMascot pose={mascot} size="md" />}
    </header>
  );
}
