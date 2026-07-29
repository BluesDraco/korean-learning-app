'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, Users, Plus, MessageCircle } from 'lucide-react';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/gamification';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import type { BuddyRelation } from '@/types';

export default function BuddySquarePage() {
  const { user, loading: authLoading } = useAuth();
  const { lang } = useLang();
  const [loading, setLoading] = useState(true);
  const [buddies, setBuddies] = useState<BuddyRelation[]>([]);
  const [buddyProfiles, setBuddyProfiles] = useState<Record<string, { nickname: string; streak: number }>>({});
  const [myId, setMyId] = useState('');

  useEffect(() => {
    (async () => {
      const profile = await getProfile();
      if (!profile) { setLoading(false); return; }
      setMyId(profile.id);

      const rels = await db.buddyRelations
        .filter((r) =>
          (r.userAId === profile.id || r.userBId === profile.id) && r.status === 'active'
        );

      setBuddies(rels);

      // Fetch profiles of buddies (simplified - just show what we can)
      for (const r of rels) {
        const bid = r.userAId === profile.id ? r.userBId : r.userAId;
        try {
          const bp = await db.userProfiles.filter((p) => p.id === bid);
          if (bp.length > 0) {
            setBuddyProfiles((prev) => ({
              ...prev,
              [bid]: { nickname: bp[0].nickname || '학습자', streak: bp[0].streak || 0 },
            }));
          }
        } catch { /* ignore */ }
      }

      setLoading(false);
    })().catch(() => setLoading(false));
  }, []);

  if (authLoading || loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!user) {
    return (
      <div className="py-4 max-w-lg md:max-w-none mx-auto text-center space-y-4 px-4">
        <span className="text-5xl block">🐰</span>
        <p className="text-base font-semibold text-[var(--text-primary)]">{t('buddy.login_required', lang)}</p>
        <p className="text-sm text-[var(--text-muted)]">{t('buddy.login_sub', lang)}</p>
        <Link href="/auth/login?redirect=/buddy" className="inline-block px-6 py-2.5 rounded-xl text-sm font-semibold text-white" style={{ background: 'var(--color-pink-base)' }}>{t('buddy.login_cta', lang)}</Link>
      </div>
    );
  }

  return (
    <div className="py-4 max-w-lg md:max-w-none mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-5xl">🐰</span>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">{t('buddy.hub_title', lang)}</h1>
        <p className="text-sm text-[var(--text-secondary)]">{t('buddy.hub_max', lang)}</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          href="/buddy/invite"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--pink-primary)] text-white rounded-xl font-medium text-sm hover:opacity-90"
        >
          <Plus size={18} /> {t('buddy.start', lang)}
        </Link>
      </div>

      {/* My Buddies */}
      {!loading && buddies.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-[var(--text-secondary)]">{t('buddy.my_buddies', lang)}</h2>
          {buddies.map((r) => {
            const bid = myId === r.userAId ? r.userBId : r.userAId;
            const bp = buddyProfiles[bid] || { nickname: '학습자', streak: 0 };
            return (
              <Link
                key={r.id}
                href={`/buddy/${r.id}`}
                className="flex items-center gap-4 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 hover:border-[var(--pink-pale)] transition-colors"
              >
                <span className="text-3xl">🐰</span>
                <div className="flex-1">
                  <p className="text-sm font-bold text-[var(--text-primary)]">{bp.nickname}</p>
                  <p className="text-xs text-[var(--text-muted)]">{t('buddy.streak_days', lang, { n: bp.streak })} {bp.streak > 0 ? '🔥' : '🌙'}</p>
                </div>
                <MessageCircle size={18} className="text-[var(--text-muted)]" />
              </Link>
            );
          })}
        </div>
      )}

      {!loading && buddies.length === 0 && (
        <div className="text-center py-12 space-y-4">
          <Users size={48} className="text-[var(--text-placeholder)] mx-auto" />
          <p className="text-sm text-[var(--text-muted)]">{t('buddy.empty_1', lang)}<br />{t('buddy.empty_2', lang)}</p>
        </div>
      )}

      {loading && (
        <div className="flex items-center justify-center py-16">
          <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
        </div>
      )}
    </div>
  );
}
