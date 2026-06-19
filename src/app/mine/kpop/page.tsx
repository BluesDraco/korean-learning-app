'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Music, ArrowRight } from 'lucide-react';
import { db } from '@/lib/db';
import { getTrackById } from '@/data/kpopTracks';

interface KpopProgress {
  id: string;
  songId: string;
  userId?: string;
  practicedLines?: number[];
  completedLines?: number[];
  updatedAt?: number;
}

export default function MineKpopPage() {
  const [progress, setProgress] = useState<KpopProgress[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    db.kpopProgress.toArray()
      .then((rows) => setProgress(rows as KpopProgress[]))
      .catch(() => setProgress([]))
      .finally(() => setLoading(false));
  }, []);

  const entries = progress
    .filter((p) => {
      const practiced = p.practicedLines?.length || 0;
      const completed = p.completedLines?.length || 0;
      return practiced > 0 || completed > 0;
    })
    .map((p) => {
      const track = getTrackById(p.songId);
      return {
        ...p,
        title: track?.title ?? p.songId,
        artist: track?.artist ?? '',
        practicedCount: p.practicedLines?.length || 0,
        completedCount: p.completedLines?.length || 0,
        totalLines: track?.lyrics?.length || 0,
      };
    });

  return (
    <div className="py-4 space-y-4">
      <div className="flex items-center gap-2 text-[13px]">
        <Link href="/mine" className="text-[#8c8177] hover:text-[#2f2a26] transition-colors flex items-center gap-1">
          <ArrowLeft size={14} />返回
        </Link>
        <span className="text-[#c7b7b0]">/</span>
        <span className="text-[#8b766e] font-medium">我的跟唱</span>
      </div>

      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-6 h-6 border-2 border-[#f0ebe3] border-t-[#e47a94] rounded-full animate-spin" />
        </div>
      ) : entries.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
          <div className="w-16 h-16 rounded-2xl bg-[#fbf7f0] flex items-center justify-center mb-4">
            <Music size={28} className="text-[#d4ccc4]" />
          </div>
          <h2 className="text-[16px] font-bold text-[#2f2a26] mb-2">这里会展示你的跟唱进度</h2>
          <p className="text-[13px] text-[#8b766e] max-w-xs leading-relaxed mb-6">
            在 KPOP 跟唱中练习的歌曲和进度，会出现在这里
          </p>
          <div
            className="inline-flex items-center gap-1.5 text-[13px] px-4 py-2 bg-[#c7b7b0] text-white rounded-xl font-medium cursor-not-allowed opacity-50"
          >
            跟唱优化中
          </div>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-[12px] text-[#8c8177]">{entries.length} 首歌曲有练习记录</p>
          {entries.map((entry) => (
            <div
              key={entry.id}
              className="flex items-center gap-3 rounded-[18px] bg-white border border-[#efe4d8] px-4 py-3.5 shadow-[0_2px_8px_rgba(92,64,38,0.03)] opacity-60"
            >
              <div className="w-10 h-10 rounded-[14px] bg-[#fbf7f0] flex items-center justify-center shrink-0">
                <Music size={18} className="text-[#e47a94]" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-[14px] font-medium text-[#2f2a26]">
                  {entry.artist} — {entry.title}
                </p>
                <p className="text-[11px] text-[#8c8177] mt-0.5">
                  已练习 {entry.practicedCount} 行{entry.totalLines > 0 ? ` / 共 ${entry.totalLines} 行` : ''}
                </p>
              </div>
              <span className="text-[#c7b7b0] text-sm">{'>'}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
