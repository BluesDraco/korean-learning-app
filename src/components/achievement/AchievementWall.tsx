'use client';

import { useEffect, useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import UserAvatar from '@/components/UserAvatar';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { ACHIEVEMENTS, CATEGORY_META, CATEGORY_ORDER } from '@/data/achievements';
import { checkAchievements } from '@/lib/achievements/check';
import type { AchievementCategory, AchievementDef, AchievementProgress, AchievementRarity } from '@/types';
import { AchievementCard } from './AchievementCard';
import '@/app/achievement/achievement.css';

type Filter = 'all' | AchievementCategory;

function ProgressRing({ pct, size = 46 }: { pct: number; size?: number }) {
  const r = size / 2 - 4;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - pct / 100);
  return (
    <div className="ach-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-border-2)" strokeWidth={5} />
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-pink-strong)" strokeWidth={5} strokeLinecap="round" strokeDasharray={circ} strokeDashoffset={offset} />
      </svg>
      <div className="ach-ring-txt">{pct}%</div>
    </div>
  );
}

export function AchievementWall({ layout }: { layout: 'mobile' | 'desktop' }) {
  const { user } = useAuth();
  const { lang } = useLang();
  const router = useRouter();
  const [progMap, setProgMap] = useState<Record<string, AchievementProgress>>({});
  const [summary, setSummary] = useState({ unlockedCount: 0, level: 1, longestStreak: 0 });
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    let alive = true;
    (async () => {
      const res = await checkAchievements(user.id).catch(() => null);
      if (!alive) return;
      if (res) {
        setProgMap(Object.fromEntries(res.list.map((p) => [p.id, p])));
        setSummary({ unlockedCount: res.unlockedCount, level: res.level, longestStreak: res.longestStreak });
      }
      setLoading(false);
    })();
    return () => { alive = false; };
  }, [user]);

  const total = ACHIEVEMENTS.length;
  const unlockedCount = summary.unlockedCount;
  const pct = total > 0 ? Math.round((unlockedCount / total) * 100) : 0;

  // 稀有度收藏统计（桌面 rail）
  const rarityStats = useMemo(() => {
    const stat: Record<AchievementRarity, { got: number; total: number }> = {
      common: { got: 0, total: 0 }, rare: { got: 0, total: 0 }, epic: { got: 0, total: 0 }, legend: { got: 0, total: 0 },
    };
    for (const def of ACHIEVEMENTS) {
      stat[def.rarity].total++;
      if (progMap[def.id]?.unlocked) stat[def.rarity].got++;
    }
    return stat;
  }, [progMap]);

  // 最接近解锁的下一个成就（桌面 rail nudge）
  const nextUp = useMemo(() => {
    let best: { def: AchievementDef; prog: AchievementProgress; ratio: number } | null = null;
    for (const def of ACHIEVEMENTS) {
      const p = progMap[def.id];
      if (!p || p.unlocked || def.goal <= 1) continue;
      const ratio = p.current / def.goal;
      if (ratio > 0 && (!best || ratio > best.ratio)) best = { def, prog: p, ratio };
    }
    return best;
  }, [progMap]);


  const filters: { key: Filter; label: string }[] = [
    { key: 'all', label: t('achieve.filter_all', lang) },
    ...CATEGORY_ORDER.map((c) => ({ key: c, label: `${CATEGORY_META[c].emoji} ${CATEGORY_META[c].title}` })),
  ];

  const visibleCats = filter === 'all' ? CATEGORY_ORDER : [filter];

  const avatarBlock = (
    <div className="ach-avatar">
      <div className="ach-avatar-inner">
        {user?.avatarUrl
          ? <UserAvatar avatarUrl={user.avatarUrl} name={user.nickname || user.username} size={layout === 'desktop' ? 92 : 72} />
          : <span className="ach-avatar-fallback">{(user?.nickname || user?.username || '兔').charAt(0)}</span>}
      </div>
    </div>
  );

  const overviewBlock = (
    <div className={`ach-overview ${layout === 'desktop' ? 'ach-desk-overview' : ''}`}>
      <div className={`ach-ov-card ${layout === 'desktop' ? 'ach-desk-ov-card' : ''}`}>
        <ProgressRing pct={pct} size={layout === 'desktop' ? 56 : 46} />
        <div className="ach-ov-label">{t('achieve.unlocked_count', lang, { n: unlockedCount, total })}</div>
      </div>
      <div className={`ach-ov-card ${layout === 'desktop' ? 'ach-desk-ov-card' : ''}`}>
        <div className="ach-ov-num gold">Lv.{summary.level}</div>
        <div className="ach-ov-label">{t('achieve.current_level', lang)}</div>
      </div>
      <div className={`ach-ov-card ${layout === 'desktop' ? 'ach-desk-ov-card' : ''}`}>
        <div className="ach-ov-num pink">{summary.longestStreak}<small>{t('achieve.day_unit', lang)}</small></div>
        <div className="ach-ov-label">{t('achieve.streak_label', lang)}</div>
      </div>
    </div>
  );

  const filtersBlock = (
    <div className="ach-filters">
      {filters.map((f) => (
        <button key={f.key} className={`ach-chip ${filter === f.key ? 'active' : ''}`} onClick={() => setFilter(f.key)}>
          {f.label}
        </button>
      ))}
    </div>
  );

  const groupsBlock = visibleCats.map((cat) => {
    const defs = ACHIEVEMENTS.filter((a) => a.category === cat);
    const got = defs.filter((d) => progMap[d.id]?.unlocked).length;
    const meta = CATEGORY_META[cat];
    return (
      <div className="ach-group" key={cat}>
        <div className="ach-group-head">
          <span className="ach-group-emoji">{meta.emoji}</span>
          <span className="ach-group-title">{meta.title}</span>
          <span className="ach-group-ko">{meta.titleKo}</span>
          <span className="ach-group-count">{got} / {defs.length}</span>
        </div>
        <div className="ach-grid">
          {defs.map((def) => (
            <AchievementCard
              key={def.id}
              def={def}
              prog={progMap[def.id] ?? { id: def.id, unlocked: false, current: 0, goal: def.goal }}
            />
          ))}
        </div>
      </div>
    );
  });

  if (!user) {
    return (
      <div style={{ textAlign: 'center', padding: '64px 20px' }}>
        <div style={{ fontSize: 56, marginBottom: 12 }}>🐰</div>
        <p style={{ fontSize: 15, color: 'var(--color-ink-2)', marginBottom: 18 }}>{t('achieve.login_prompt', lang)}</p>
        <button onClick={() => router.push('/auth/login?redirect=/achievement')} style={{ padding: '10px 24px', borderRadius: 999, background: 'var(--color-pink-base)', color: '#fff', border: 'none', fontSize: 14, fontWeight: 700, cursor: 'pointer' }}>{t('achieve.go_login', lang)}</button>
      </div>
    );
  }

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: '80px 0' }}>
        <div style={{ width: 28, height: 28, borderRadius: '50%', border: '3px solid var(--color-pink-base)', borderTopColor: 'transparent', animation: 'tori-spin .7s linear infinite' }} />
      </div>
    );
  }

  // ── 桌面版：横向英雄 + 双栏 ──
  if (layout === 'desktop') {
    return (
      <div className="ach-wall">
        <div className="ach-hero ach-desk-hero">
          <div className="ach-desk-hero-left">
            {avatarBlock}
            <div>
              <div className="ach-hero-eyebrow">MY ACHIEVEMENTS</div>
              <div className="ach-hero-title">{t('achieve.my_achievements', lang)}</div>
              <div className="ach-hero-ko">{'토리와 함께 걸어온 길 · '}{t('achieve.subtitle', lang)}</div>
            </div>
          </div>
          {overviewBlock}
        </div>

        <div className="ach-cols">
          <div>
            {filtersBlock}
            {groupsBlock}
          </div>
          <aside className="ach-rail">
            {nextUp && (
              <div className="ach-nextup">
                <div className="ach-nextup-icon">{nextUp.def.icon}</div>
                <div className="ach-nextup-t">{t('achieve.next_unlock', lang, { title: nextUp.def.title })}</div>
                <div className="ach-nextup-d">{t('achieve.next_unlock_detail', lang, { diff: nextUp.def.goal - nextUp.prog.current })}</div>
                <div className="ach-prog-bar"><div className="ach-prog-fill" style={{ width: `${Math.round(nextUp.ratio * 100)}%` }} /></div>
                <div className="ach-prog-txt" style={{ textAlign: 'left', marginTop: 7 }}>{nextUp.prog.current} / {nextUp.def.goal}</div>
              </div>
            )}
            <div className="ach-rail-card">
              <div className="ach-rail-h">{t('achieve.rarity_collection', lang)}</div>
              {(['common', 'rare', 'epic', 'legend'] as AchievementRarity[]).map((r) => (
                <div className="ach-leg" key={r}>
                  <span className={`ach-leg-dot ${r}`} />
                  {t(`achieve.rarity_${r}`, lang)}
                  <span className="ach-leg-count">{rarityStats[r].got} / {rarityStats[r].total}</span>
                </div>
              ))}
            </div>
            <div className="ach-rail-card" style={{ textAlign: 'center' }}>
              <div style={{ fontSize: 34, marginBottom: 8 }}>🐰</div>
              <div className="ach-note" style={{ margin: 0 }} dangerouslySetInnerHTML={{ __html: t('achieve.desktop_note', lang) }} />
            </div>
          </aside>
        </div>
      </div>
    );
  }

  // ── 移动版 ──
  return (
    <div className="ach-wall">
      <div className="ach-hero">
        {avatarBlock}
        <div className="ach-hero-eyebrow">MY ACHIEVEMENTS</div>
        <div className="ach-hero-title">{t('achieve.my_achievements', lang)}</div>
        <div className="ach-hero-ko">{'토리와 함께 · '}{t('achieve.subtitle', lang)}</div>
        {overviewBlock}
      </div>
      {filtersBlock}
      {groupsBlock}
      <p className="ach-note">{t('achieve.mobile_note', lang)}</p>
    </div>
  );
}
