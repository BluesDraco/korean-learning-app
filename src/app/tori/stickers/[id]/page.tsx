'use client';

import { useEffect, useState, useMemo } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Download, Loader2 } from 'lucide-react';
import { db } from '@/lib/db';
import type { StickerPack, Sticker, StickerDownload } from '@/types';

// Seed stickers for each pack
const SEED_STICKERS: Record<string, { captionZh: string; captionKo: string }[]> = {
  'tori-daily': [
    { captionZh: '早安', captionKo: '좋은 아침' },
    { captionZh: '吃饭啦', captionKo: '밥 먹자' },
    { captionZh: '开心', captionKo: '신나' },
    { captionZh: '困了', captionKo: '졸려' },
    { captionZh: '晚安', captionKo: '잘 자' },
    { captionZh: '加油', captionKo: '화이팅' },
  ],
  'tori-study': [
    { captionZh: '学习中', captionKo: '공부 중' },
    { captionZh: '太难了', captionKo: '너무 어려워' },
    { captionZh: '学会了', captionKo: '이해했어' },
    { captionZh: '考试加油', captionKo: '시험 화이팅' },
    { captionZh: '记不住', captionKo: '외우기 힘들어' },
    { captionZh: '满分', captionKo: '만점' },
  ],
  'tori-korean': [
    { captionZh: '你好', captionKo: '안녕하세요' },
    { captionZh: '谢谢', captionKo: '감사합니다' },
    { captionZh: '对不起', captionKo: '미안해요' },
    { captionZh: '我爱你', captionKo: '사랑해요' },
    { captionZh: '好可爱', captionKo: '귀여워' },
    { captionZh: '大发', captionKo: '대박' },
  ],
};

export default function StickerDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const [pack, setPack] = useState<StickerPack | null>(null);
  const [stickers, setStickers] = useState<Sticker[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloading, setDownloading] = useState(false);

  useEffect(() => {
    (async () => {
      const p = await db.stickerPacks.get(id);
      if (!p) { setLoading(false); return; }
      setPack(p);

      // Load or seed stickers
      let s = await db.stickers.filter((s) => s.packId === id);
      if (s.length === 0 && SEED_STICKERS[id]) {
        const seed = SEED_STICKERS[id];
        for (let i = 0; i < seed.length; i++) {
          const sticker: Sticker = {
            id: `${id}-${i}`,
            packId: id,
            imageUrl: `/stickers/${id}/${i + 1}.png`,
            captionZh: seed[i].captionZh,
            captionKo: seed[i].captionKo,
            sortOrder: i,
          };
          await db.stickers.add(sticker);
        }
        s = await db.stickers.filter((s) => s.packId === id);
      }
      setStickers(s.sort((a, b) => a.sortOrder - b.sortOrder));
      setLoading(false);
    })();
  }, [id]);

  const handleDownload = async () => {
    if (!pack) return;
    setDownloading(true);
    try {
      // Record download
      const dl: StickerDownload = {
        id: crypto.randomUUID(),
        packId: pack.id,
        userId: null,
        downloadedAt: Date.now(),
      };
      await db.stickerDownloads.add(dl);
      // Simulate a brief loading state
      await new Promise((r) => setTimeout(r, 800));
      alert('表情包下载功能即将上线！图片文件准备好后即可下载ZIP');
    } catch { /* ignore */ }
    setDownloading(false);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (!pack) {
    return (
      <div className="py-16 text-center">
        <span className="text-6xl">🐰</span>
        <h1 className="text-lg font-bold text-[var(--text-primary)] mt-4">套装不存在</h1>
      </div>
    );
  }

  return (
    <div className="py-4 max-w-lg mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center gap-3">
        <Link href="/tori/stickers" className="text-[var(--text-muted)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-lg font-bold text-[var(--text-primary)]">{pack.name}</h1>
          <p className="text-xs text-[var(--text-muted)]">{pack.description}</p>
        </div>
      </div>

      {/* Sticker grid */}
      <div className="grid grid-cols-3 gap-3">
        {stickers.map((s) => (
          <div
            key={s.id}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center space-y-2 hover:scale-105 transition-transform"
          >
            <span className="text-4xl">
              {['🐰', '🌟', '✨', '💕', '📚', '🎓', '💪', '🌸'][s.sortOrder % 8]}
            </span>
            <p className="text-xs font-medium text-[var(--text-primary)]">{s.captionKo}</p>
            <p className="text-xs text-[var(--text-muted)]">{s.captionZh}</p>
          </div>
        ))}
      </div>

      {/* Download button */}
      <button
        onClick={handleDownload}
        disabled={downloading}
        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[var(--pink-primary)] text-white rounded-2xl font-medium hover:opacity-90 disabled:opacity-50 transition-opacity"
      >
        {downloading ? (
          <Loader2 size={18} className="animate-spin" />
        ) : (
          <Download size={18} />
        )}
        {downloading ? '准备中...' : `打包下载 (${stickers.length}张)`}
      </button>
    </div>
  );
}
