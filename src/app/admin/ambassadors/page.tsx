'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { ArrowLeft, Star, Loader2, RefreshCw, X } from 'lucide-react';
import { db } from '@/lib/db';
import type { UserProfile } from '@/types';

export default function AdminAmbassadorsPage() {
  const [ambassadors, setAmbassadors] = useState<UserProfile[]>([]);
  const [loading, setLoading] = useState(true);
  const [scanning, setScanning] = useState(false);

  const loadAmbassadors = async () => {
    const all = await db.userProfiles.filter((p) => p.isAmbassador === true);
    setAmbassadors(all);
    setLoading(false);
  };

  useEffect(() => { loadAmbassadors(); }, []);

  const handleScan = async () => {
    setScanning(true);
    const allProfiles = await db.userProfiles.toArray();

    for (const profile of allProfiles) {
      if (profile.isAmbassador) continue;

      // Check conditions
      let conditions = 0;
      const reasons: string[] = [];

      if (profile.longestStreak >= 30) { conditions++; reasons.push('连续打卡超过30天'); }

      // Check content corrections (simulated - count from study logs)
      const corrections = await db.studyLogs.filter(
        (l) => l.action === 'content_correction_accepted' && l.videoId === profile.id
      );
      if (corrections.length >= 3) { conditions++; reasons.push('内容纠错被采纳3次以上'); }

      // Check books + reviews
      const books = await db.studyLogs.filter(
        (l) => l.action === 'picture_book_complete' && l.videoId === profile.id
      );
      const words = await db.words.toArray(); // simplified - check user's words
      const reviewed = words.filter((w) => w.lastReviewed).length;
      if (books.length >= 3 && reviewed >= 300) { conditions++; reasons.push('绘本阅读3本且复习300词'); }

      if (conditions >= 2) {
        await db.userProfiles.update(profile.id, {
          isAmbassador: true,
          ambassadorSince: Date.now(),
          ambassadorReason: reasons.join('; '),
        } satisfies Partial<UserProfile>);
      }
    }

    await loadAmbassadors();
    setScanning(false);
  };

  const handleRevoke = async (profileId: string) => {
    await db.userProfiles.update(profileId, {
      isAmbassador: false,
      ambassadorSince: null,
      ambassadorReason: null,
    } satisfies Partial<UserProfile>);
    setAmbassadors((prev) => prev.filter((a) => a.id !== profileId));
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  return (
    <div className="py-4 max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={20} />
          </Link>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">学习大使</h1>
          <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]">
            {ambassadors.length} 位
          </span>
        </div>
        <button
          onClick={handleScan}
          disabled={scanning}
          className="flex items-center gap-2 px-4 py-2 bg-[var(--purple-soft)] text-white rounded-xl text-sm font-medium hover:opacity-90 disabled:opacity-50"
        >
          {scanning ? <Loader2 size={16} className="animate-spin" /> : <RefreshCw size={16} />}
          {scanning ? '扫描中...' : '扫描大使'}
        </button>
      </div>

      <p className="text-sm text-[var(--text-secondary)]">
        满足以下任意两条自动获得：连续打卡30天+、内容纠错被采纳3次+、绘本3本+且复习300词+
      </p>

      {/* Ambassador list */}
      <div className="space-y-3">
        {ambassadors.map((a) => (
          <div
            key={a.id}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center gap-4"
          >
            <Star size={24} className="text-[var(--peach-soft)] fill-current shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-[var(--text-primary)]">{a.nickname}</p>
              <p className="text-xs text-[var(--text-muted)]">
                获得时间：{a.ambassadorSince ? new Date(a.ambassadorSince).toLocaleDateString('zh-CN') : '-'}
              </p>
              <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                {a.ambassadorReason || '-'}
              </p>
            </div>
            <div className="text-right text-xs text-[var(--text-muted)] space-y-0.5">
              <p>等级 {a.level}</p>
              <p>XP {a.xp}</p>
              <p>连签 {a.longestStreak}天</p>
            </div>
            <button
              onClick={() => handleRevoke(a.id)}
              className="text-[var(--text-muted)] hover:text-red-400 p-1"
              title="撤销大使"
            >
              <X size={16} />
            </button>
          </div>
        ))}

        {ambassadors.length === 0 && (
          <div className="text-center py-16 space-y-4">
            <Star size={48} className="text-[var(--text-placeholder)] mx-auto" />
            <p className="text-sm text-[var(--text-muted)]">还没有学习大使</p>
            <p className="text-xs text-[var(--text-muted)]">点击"扫描大使"自动检测</p>
          </div>
        )}
      </div>
    </div>
  );
}
