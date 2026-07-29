'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

// 手机端"如何切换韩语系统键盘"就地展开引导 · 默写/打字/写作共用
const GUIDE: { os: string; steps: string[] }[] = [
  { os: 'iPhone', steps: ['prac.kb_iphone_1', 'prac.kb_iphone_2', 'prac.kb_iphone_3', 'prac.kb_iphone_4'] },
  { os: 'prac.kb_android_label', steps: ['prac.kb_android_1', 'prac.kb_android_2', 'prac.kb_android_3', 'prac.kb_android_4'] },
];

export function KeyboardHint({ text }: { text?: string }) {
  const { lang } = useLang();
  const [open, setOpen] = useState(false);
  const textVal = text || t('prac.kb_default', lang);
  return (
    <div style={{ margin: '2px 0 0' }}>
      <button
        type="button"
        onClick={() => setOpen(o => !o)}
        aria-expanded={open}
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 4,
          background: 'none', border: 'none', padding: 0, cursor: 'pointer',
          fontSize: 11, color: 'var(--hr-ink-3)', fontFamily: 'var(--hr-sans)',
        }}
      >
        <span>{textVal}</span>
        <span style={{ color: 'var(--hr-pink-strong)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: 2 }}>
          {t('prac.kb_how', lang)}
          <ChevronDown size={12} style={{ transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .2s var(--hr-ease)' }} />
        </span>
      </button>
      {open && (
        <div style={{
          marginTop: 8, display: 'flex', flexDirection: 'column', gap: 12,
          background: 'var(--hr-surface-3)', border: '1px dashed var(--hr-border-2)',
          borderRadius: 12, padding: '12px 14px',
        }}>
          {GUIDE.map(g => (
            <div key={g.os}>
              <p style={{ fontFamily: 'var(--hr-mono)', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--hr-ink-3)', fontWeight: 700, margin: '0 0 6px' }}>{t(g.os, lang)}</p>
              <ol style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 4 }}>
                {g.steps.map((s, i) => (
                  <li key={i} style={{ display: 'flex', gap: 8, fontSize: 12, color: 'var(--hr-ink-2)', lineHeight: 1.5 }}>
                    <span style={{ flexShrink: 0, width: 16, height: 16, borderRadius: '50%', background: 'var(--hr-surface-2)', border: '1px solid var(--hr-border-2)', fontSize: 9, fontWeight: 700, color: 'var(--hr-ink-3)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginTop: 1 }}>{i + 1}</span>
                    <span>{t(s, lang)}</span>
                  </li>
                ))}
              </ol>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
