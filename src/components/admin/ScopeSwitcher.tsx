'use client';

import type { AdminScope } from '@/types/admin';

const OPTIONS: { key: AdminScope; label: string }[] = [
  { key: 'domestic', label: '🇨🇳 国内' },
  { key: 'overseas', label: '🌏 海外' },
  { key: 'combined', label: '🔀 综合' },
];

export function ScopeSwitcher({ scope, onChange }: { scope: AdminScope; onChange: (s: AdminScope) => void }) {
  return (
    <div className="flex gap-1 bg-[var(--bg-input)] rounded-lg p-0.5">
      {OPTIONS.map((o) => (
        <button
          key={o.key}
          onClick={() => onChange(o.key)}
          className={`px-3 py-1.5 text-xs rounded-md transition-colors ${
            scope === o.key ? 'bg-[var(--bg-card)] text-[var(--pink-primary)] font-semibold shadow-sm' : 'text-[var(--text-muted)]'
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

// 海外站不可达时的降级警告条
export function PeerErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-lg px-4 py-2.5 text-xs bg-amber-50 border border-amber-200 text-amber-700 flex items-center gap-2">
      <span>⚠️</span>
      <span>{message}——当前仅显示可用站点数据。</span>
    </div>
  );
}
