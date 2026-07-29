'use client';

import type { AchievementDef, AchievementProgress } from '@/types';
import { RARITY_META } from '@/data/achievements';
import { fmtShortDate } from '@/lib/datetime';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const NEW_WINDOW_MS = 3 * 86400000; // 3 天内解锁标 NEW

export function AchievementCard({
  def,
  prog,
}: {
  def: AchievementDef;
  prog: AchievementProgress;
}) {
  const { lang } = useLang();
  const rarity = def.rarity;
  const isNew = prog.unlocked && prog.achievedAt != null && Date.now() - prog.achievedAt < NEW_WINDOW_MS;
  const pct = def.goal > 1 ? Math.min(100, Math.round((prog.current / def.goal) * 100)) : 0;

  return (
    <div className={`ach-card r-${rarity} ${prog.unlocked ? 'unlocked' : 'locked'}`}>
      {isNew && <span className="ach-new">NEW</span>}
      <span className="ach-rarity-tag">{RARITY_META[rarity].label}</span>
      <div className="ach-icon-wrap">
        <div className="ach-icon-ring" />
        <div className="ach-icon">{def.icon}</div>
      </div>
      <div className="ach-title">{def.title}</div>
      <div className="ach-ko">{def.titleKo}</div>

      {prog.unlocked ? (
        <>
          <div className="ach-sub">{def.subtitle}</div>
          {prog.achievedAt != null && (
            <div className="ach-date">{fmtShortDate(prog.achievedAt, lang)} {t('achieve.unlocked_suffix', lang)}</div>
          )}
        </>
      ) : (
        <div className="ach-prog">
          {def.goal > 1 ? (
            <>
              <div className="ach-prog-bar"><div className="ach-prog-fill" style={{ width: `${pct}%` }} /></div>
              <div className="ach-prog-txt">{prog.current} / {def.goal}</div>
            </>
          ) : (
            <div className="ach-prog-txt">{def.hint || t('achieve.keep_going', lang)}</div>
          )}
        </div>
      )}
    </div>
  );
}
