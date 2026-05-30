'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Loader2, Download, ArrowRight } from 'lucide-react';
import { db } from '@/lib/db';
import type { StickerPack } from '@/types';

const SEED_PACKS: StickerPack[] = [
  {
    id: 'tori-daily',
    name: '托里日常',
    description: '托里的日常生活，学习韩语必备表情包',
    coverImage: '/stickers/tori-daily/cover.png',
    publishedAt: Date.now(),
    isActive: true,
  },
  {
    id: 'tori-study',
    name: '托里学习',
    description: '学习中的托里，加油打气超可爱',
    coverImage: '/stickers/tori-study/cover.png',
    publishedAt: Date.now() - 86400000,
    isActive: true,
  },
  {
    id: 'tori-korean',
    name: '托里韩语',
    description: '韩语学习专属表情，每个都有韩文配音',
    coverImage: '/stickers/tori-korean/cover.png',
    publishedAt: Date.now() - 172800000,
    isActive: true,
  },
];

export default function StickersPage() {
  const [packs, setPacks] = useState<StickerPack[]>([]);
  const [downloads, setDownloads] = useState<Record<string, number>>({});
  const [loading, setLoading] = useState(true);
  const [imgErrors, setImgErrors] = useState<Set<string>>(new Set());

  useEffect(() => {
    (async () => {
      // Seed sticker packs if none exist
      const existing = await db.stickerPacks.toArray();
      if (existing.length === 0) {
        for (const p of SEED_PACKS) {
          await db.stickerPacks.add(p);
        }
        setPacks(SEED_PACKS);
      } else {
        setPacks(existing);
      }

      // Load download counts
      const allDownloads = await db.stickerDownloads.toArray();
      const counts: Record<string, number> = {};
      for (const d of allDownloads) {
        counts[d.packId] = (counts[d.packId] || 0) + 1;
      }
      setDownloads(counts);
      setLoading(false);
    })();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  return (
    <div className="py-4 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="text-center space-y-2">
        <span className="text-6xl">🐰</span>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">托里表情包，拿走不谢</h1>
        <p className="text-sm text-[var(--text-secondary)]">可爱托里陪你学韩语</p>
      </div>

      {/* Sticker pack grid */}
      <div className="grid grid-cols-2 gap-4">
        {packs.filter((p) => p.isActive).map((pack) => (
          <Link
            key={pack.id}
            href={`/tori/stickers/${pack.id}`}
            className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:scale-105 hover:shadow-lg transition-all"
          >
            <div className="aspect-square bg-gradient-to-br from-[#FFFDF9] to-[#FFD4E0]/20 flex items-center justify-center relative">
              <Image
                src={pack.coverImage}
                alt={pack.name}
                fill
                className="object-cover"
                onError={() => setImgErrors(prev => new Set(prev).add(pack.id))}
              />
              {imgErrors.has(pack.id) && <div className="absolute inset-0 bg-gradient-to-br from-[#FFFDF9] to-[#FFD4E0]/20" />}
            </div>
            <div className="p-3 space-y-1">
              <h3 className="text-sm font-bold text-[var(--text-primary)]">{pack.name}</h3>
              <p className="text-xs text-[var(--text-muted)] line-clamp-1">{pack.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-xs text-[var(--text-muted)] flex items-center gap-1">
                  <Download size={11} /> {downloads[pack.id] || 0}
                </span>
                <ArrowRight size={14} className="text-[var(--text-muted)] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Background decoration */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <span className="absolute top-10 right-10 text-8xl opacity-5 rotate-12">🐰</span>
        <span className="absolute bottom-20 left-10 text-7xl opacity-5 -rotate-6">✨</span>
        <span className="absolute top-1/2 left-1/3 text-6xl opacity-5">💕</span>
      </div>
    </div>
  );
}
