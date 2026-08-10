'use client';

import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

type Spacing = 'tight' | 'normal' | 'loose';

export interface SectionProps {
  [k: string]: unknown;
  title?: string;
  subtitle?: string;
  action?: { label: string; href: string };
  spacing?: Spacing;
  children: ReactNode;
}

const HEAD_GAP: Record<Spacing, number> = {
  tight: 10,
  normal: 14,
  loose: 18,
};

const SECTION_GAP: Record<Spacing, number> = {
  tight: 20,
  normal: 28,
  loose: 36,
};

export function Section({ title, subtitle, action, spacing = 'normal', children }: SectionProps) {
  return (
    <section style={{ marginBottom: SECTION_GAP[spacing] }}>
      {(title || action) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 12,
            marginBottom: HEAD_GAP[spacing],
          }}
        >
          <div style={{ minWidth: 0 }}>
            {title && (
              <h2
                style={{
                  fontSize: 16,
                  fontWeight: 800,
                  color: 'var(--color-ink-1)',
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {title}
              </h2>
            )}
            {subtitle && (
              <p
                style={{
                  fontSize: 12,
                  color: 'var(--color-ink-3)',
                  marginTop: 2,
                  lineHeight: 1.5,
                }}
              >
                {subtitle}
              </p>
            )}
          </div>
          {action && (
            <Link
              href={action.href}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 2,
                fontSize: 12,
                fontWeight: 700,
                color: 'var(--color-pink-strong)',
                textDecoration: 'none',
                flexShrink: 0,
              }}
            >
              {action.label}
              <ChevronRight size={14} />
            </Link>
          )}
        </div>
      )}
      {children}
    </section>
  );
}
