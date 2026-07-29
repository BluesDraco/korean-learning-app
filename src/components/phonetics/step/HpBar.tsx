'use client';
import React from 'react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export default function HpBar({ hp, max = 5 }: { hp: number; max?: number }) {
  const { lang } = useLang();
  return (
    <div style={{ display: 'flex', gap: 4 }} aria-label={t('hpbar.hp', lang, { hp, max })}>
      {Array.from({ length: max }).map((_, i) => {
        const lost = i >= hp;
        return (
          <span
            key={i}
            style={{
              fontSize: 18,
              color: lost ? 'var(--color-border-2)' : 'var(--color-status-danger)',
              transform: lost ? 'scale(.85)' : 'scale(1)',
              transition: 'all .3s ease',
            }}
          >♥</span>
        );
      })}
    </div>
  );
}
