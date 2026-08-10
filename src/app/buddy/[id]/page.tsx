'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Heart, Loader2 } from 'lucide-react';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/gamification';
import { useToast } from '@/hooks/useToast';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import type { BuddyRelation, UserProfile } from '@/types';

export default function BuddyDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { lang } = useLang();
  const { showToast } = useToast();
  const [loading, setLoading] = useState(true);
  const [relation, setRelation] = useState<BuddyRelation | null>(null);
  const [myProfile, setMyProfile] = useState<UserProfile | null>(null);
  const [buddyProfile, setBuddyProfile] = useState<UserProfile | null>(null);
  const [cheered, setCheered] = useState(false);
  const [cheeredToday, setCheeredToday] = useState(false);
  const [myWordCount, setMyWordCount] = useState(0);

  useEffect(() => {
    (async () => {
      try {
        const rel = await db.buddyRelations.get(id);
        if (!rel) { setLoading(false); return; }
        setRelation(rel);

        const me = await getProfile();
        setMyProfile(me);
        db.words.count().then(setMyWordCount).catch(() => {});

        // Try to get buddy profile (simplified - in production, use a proper API)
        const bid = me?.id === rel.userAId ? rel.userBId : rel.userAId;
        try {
          const bps = await db.userProfiles.toArray();
          const bp = bps.find((p) => p.id === bid);
          if (bp) setBuddyProfile(bp);
        } catch { /* ignore */ }

        // Check if already cheered today
        const today = new Date().toISOString().slice(0, 10);
        const cheerId = `buddy-cheer-${today}-${rel.id}`;
        const cheers = await db.studyLogs.filter(
          (l) => l.action === 'buddy_cheer' && l.id === cheerId
        );
        setCheeredToday(cheers.length > 0);
      } catch { /* ignore */ } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  const handleCheer = async () => {
    if (!relation || cheeredToday) return;
    setCheered(true);
    setCheeredToday(true);
    // Record cheer in the study_logs schema
    const today = new Date().toISOString().slice(0, 10);
    await db.studyLogs.add({
      id: `buddy-cheer-${today}-${relation.id}`,
      action: 'buddy_cheer',
      details: relation.id,
      xpEarned: 0,
      createdAt: Date.now(),
    } as any).catch(() => { console.error('buddy cheer log failed'); showToast('Failed to send cheer', 'error'); });
    setTimeout(() => setCheered(false), 2000);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!relation) {
    return (
      <div className="py-16 text-center space-y-4">
        <span className="text-5xl">🐰</span>
        <h1 className="text-lg font-bold text-[var(--text-primary)]">{t('buddy.not_found', lang)}</h1>
        <Link href="/buddy" className="text-sm text-[var(--pink-primary)]">{t('buddy.back_square', lang)}</Link>
      </div>
    );
  }

  const buddyName = buddyProfile?.nickname || '학습자';
  const buddyStreak = buddyProfile?.streak || 0;

  return (
    <div className="py-4 max-w-lg md:max-w-none mx-auto space-y-6">
      <div className="flex items-center gap-3">
        <Link href="/buddy" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-[var(--text-primary)]">{t('buddy.detail_title', lang)}</h1>
      </div>

      {/* Two buddies */}
      <div className="flex items-center gap-6 justify-center">
        {/* Me */}
        <div className="text-center space-y-2">
          <span className="text-5xl">🐰</span>
          <p className="text-sm font-bold text-[var(--text-primary)]">{myProfile?.nickname || '나'}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {(myProfile?.streak || 0) > 0 ? '🔥' : '🌙'} {t('buddy.days', lang, { n: myProfile?.streak || 0 })}
          </p>
        </div>

        <span className="text-2xl text-[var(--pink-primary)]">💕</span>

        {/* Buddy */}
        <div className="text-center space-y-2">
          <span className="text-5xl">🐰</span>
          <p className="text-sm font-bold text-[var(--text-primary)]">{buddyName}</p>
          <p className="text-xs text-[var(--text-muted)]">
            {buddyStreak > 0 ? '🔥' : '🌙'} {t('buddy.days', lang, { n: buddyStreak })}
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center">
          <p className="text-xs text-[var(--text-muted)]">{t('buddy.my_words', lang)}</p>
          <p className="text-lg font-bold text-[var(--text-primary)]">{myWordCount}</p>
        </div>
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center">
          <p className="text-xs text-[var(--text-muted)]">{t('buddy.buddy_xp', lang)}</p>
          <p className="text-lg font-bold text-[var(--text-primary)]">{buddyProfile?.xp ?? 0}</p>
        </div>
      </div>

      {/* Cheer button */}
      <button
        onClick={handleCheer}
        disabled={cheeredToday}
        className={`w-full flex items-center justify-center gap-2 py-4 rounded-2xl font-medium transition-all ${
          cheered
            ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] scale-95'
            : cheeredToday
              ? 'bg-[var(--bg-input)] text-[var(--text-muted)] cursor-not-allowed'
              : 'bg-[var(--pink-primary)] text-white hover:opacity-90'
        }`}
      >
        <Heart size={20} className={cheered ? 'fill-current' : ''} />
        {cheered ? t('buddy.cheer_sent', lang) : cheeredToday ? t('buddy.cheered_today', lang) : t('buddy.cheer', lang)}
      </button>

      <p className="text-xs text-[var(--text-muted)] text-center">
        {t('buddy.cheer_once', lang)}
      </p>
    </div>
  );
}
