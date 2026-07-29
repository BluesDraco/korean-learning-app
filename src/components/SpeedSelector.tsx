'use client';

import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const SPEEDS = [0.5, 0.75, 1, 1.25, 1.5, 2] as const;

interface SpeedSelectorProps {
  current: number;
  onSelect: (speed: number) => void;
  platform: 'bilibili' | 'youtube';
}

export function SpeedSelector({ current, onSelect, platform }: SpeedSelectorProps) {
  const { lang } = useLang();
  const isBilibili = platform === 'bilibili';

  return (
    <div className="flex items-center gap-1 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-1">
      {SPEEDS.map((s) => {
        const isActive = current === s;
        return (
          <button
            key={s}
            onClick={() => !isBilibili && onSelect(s)}
            disabled={isBilibili}
            className={`relative px-2.5 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isBilibili
                ? 'opacity-30 cursor-not-allowed'
                : isActive
                  ? 'bg-[var(--pink-primary)] text-[var(--text-primary)]'
                  : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
            }`}
          >
            {s}x
          </button>
        );
      })}
      {isBilibili && (
        <span className="text-[10px] text-[var(--text-muted)] ml-1">{t('speed.bilibiliHint', lang)}</span>
      )}
    </div>
  );
}
