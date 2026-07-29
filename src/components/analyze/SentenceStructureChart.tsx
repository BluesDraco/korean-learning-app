'use client';

import { t } from '@/lib/i18n';
import { useLang } from '@/components/LangProvider';

type Role = '主语' | '谓语' | '宾语' | '修饰';
export interface StructureItem { role: Role; text: string; meaning: string }

const ROLE_COLOR: Record<Role, { ink: string; key: string }> = {
  '主语': { ink: 'var(--color-pink-strong)',  key: 'analyze.structure.subject' },
  '谓语': { ink: 'var(--color-mint-strong)',  key: 'analyze.structure.predicate' },
  '宾语': { ink: 'var(--color-ink-2, #5a5350)', key: 'analyze.structure.object' },
  '修饰': { ink: 'var(--color-ink-3)',        key: 'analyze.structure.modifier' },
};

// v2 · 极简版：无背景，只用角色标签色区分
export function SentenceStructureChart({ items }: { items?: StructureItem[] }) {
  const { lang } = useLang();
  if (!items || items.length === 0) return null;
  return (
    <div>
      <div className="az2-card-head">
        <h3>{t('analyze.structure_title', lang)}</h3>
      </div>
      <div
        style={{
          padding: '12px 14px',
          background: 'var(--color-surface-1)',
          border: '1px solid var(--color-border-1)',
          borderRadius: 6,
        }}
      >
        {items.map((it, i) => {
          const s = ROLE_COLOR[it.role] ?? ROLE_COLOR['修饰'];
          return (
            <div
              key={i}
              style={{
                display: 'grid',
                gridTemplateColumns: '60px 1fr',
                gap: 12,
                alignItems: 'baseline',
                padding: '5px 0',
              }}
            >
              <span
                style={{
                  fontFamily: 'ui-monospace, "SF Mono", Menlo, Consolas, monospace',
                  fontSize: 10, fontWeight: 500,
                  color: s.ink,
                  letterSpacing: '.08em', textTransform: 'uppercase',
                  textAlign: 'right',
                }}
              >
                {t(s.key, lang)}
              </span>
              <div style={{ minWidth: 0 }}>
                <div
                  style={{
                    fontFamily: "'Noto Sans KR', 'Malgun Gothic', sans-serif",
                    fontSize: 14,
                    fontWeight: 500,
                    color: 'var(--color-ink-1)',
                    wordBreak: 'keep-all',
                    overflowWrap: 'normal',
                    lineHeight: 1.4,
                  }}
                >
                  {it.text}
                </div>
                {it.meaning && (
                  <div
                    style={{
                      fontSize: 11,
                      color: 'var(--color-ink-3)',
                      wordBreak: 'break-word',
                      marginTop: 1,
                    }}
                  >
                    {it.meaning}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
