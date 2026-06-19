'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Loader2, Users, Plus, MessageCircle } from 'lucide-react';
import { db } from '@/lib/db';
import { getProfile } from '@/lib/gamification';
import type { BuddyRelation } from '@/types';

export default function BuddySquarePage() {
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
          const bp = await db.userProfiles.filter((p) => p.id.includes(bid.slice(0, 8)));
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

  return (
    <div className="py-4 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-5xl">🐰</span>
        <h1 className="text-xl font-bold text-[var(--text-primary)]">找个一起学习的朋友吧</h1>
        <p className="text-sm text-[var(--text-secondary)]">每个用户最多 3 个搭子</p>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <Link
          href="/buddy/invite"
          className="flex-1 flex items-center justify-center gap-2 py-3 bg-[var(--pink-primary)] text-white rounded-xl font-medium text-sm hover:opacity-90"
        >
          <Plus size={18} /> 发起搭子
        </Link>
      </div>

      {/* My Buddies */}
      {!loading && buddies.length > 0 && (
        <div className="space-y-3">
          <h2 className="text-sm font-medium text-[var(--text-secondary)]">我的搭子</h2>
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
                  <p className="text-xs text-[var(--text-muted)]">连续 {bp.streak} 天 {bp.streak > 0 ? '🔥' : '🌙'}</p>
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
          <p className="text-sm text-[var(--text-muted)]">还没有搭子<br />发起邀请，和朋友一起学韩语吧</p>
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
