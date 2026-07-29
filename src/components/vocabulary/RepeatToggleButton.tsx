'use client';

import { useState } from 'react';
import { Repeat } from 'lucide-react';
import { getSpeakRepeat, setSpeakRepeat } from '@/lib/tts';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const CYCLE = [1, 2, 3, 5];

/** 卡片左上角小按钮：点击循环切换闪卡自动朗读遍数（1→2→3→5），即点即存 localStorage。 */
export function RepeatToggleButton() {
  const { lang } = useLang();
  const [n, setN] = useState(() => getSpeakRepeat());

  const cycle = (e: React.MouseEvent) => {
    e.stopPropagation();
    const idx = CYCLE.indexOf(n);
    const next = CYCLE[(idx + 1) % CYCLE.length] ?? 1;
    setSpeakRepeat(next);
    setN(next);
  };

  return (
    <button
      onClick={cycle}
      className="h-8 px-2.5 rounded-full flex items-center gap-1 text-[11px] font-bold"
      style={{ border: '1px solid var(--fc-audio-border)', color: 'var(--fc-audio-color)' }}
      title={`${t('settings.tts_repeat', lang)} · ${t('settings.tts_repeat_n', lang, { n })}`}
    >
      <Repeat size={12} />
      ×{n}
    </button>
  );
}
