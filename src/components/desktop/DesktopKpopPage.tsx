'use client';

import { useState, useEffect, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { getAllTracks } from '@/data/kpopTracks';
import { getAllSongProgress } from '@/lib/kpop/progress';
import type { KpopTrack } from '@/types/kpop';

export function DesktopKpopPage() {
  const router = useRouter();
  const [progressMap, setProgressMap] = useState<Record<string, number>>({});
  const tracks = useMemo(() => getAllTracks(), []);

  useEffect(() => {
    try {
      const prog = getAllSongProgress();
      const map: Record<string, number> = {};
      for (const p of prog) {
        map[p.songId] = p.totalLines > 0 ? Math.round((p.practicedLines / p.totalLines) * 100) : 0;
      }
      setProgressMap(map);
    } catch { /* ignore */ }
  }, []);

  const continueTrack = useMemo(() => {
    const entries = Object.entries(progressMap).filter(([, pct]) => pct > 0 && pct < 100);
    if (entries.length === 0) return null;
    const id = entries[0][0];
    return tracks.find((t) => t.id === id) || null;
  }, [progressMap, tracks]);

  return (
    <div style={{ animation: 'fade-in .18s ease-out' }}>
      {/* Hero */}
      <div className="desktop-hero kpop">
        <span className="desktop-label">KPOP 歌词跟唱</span>
        <h2>听原唱，一句一句学歌词</h2>
        <p>听原唱，逐句拆解歌词，跟唱录音对比发音。</p>
        <div className="desktop-btnrow">
          {continueTrack && (
            <button
              className="desktop-btn black"
              onClick={() => router.push(`/korea/kpop/${continueTrack.id}`)}
            >
              {'继续 ' + continueTrack.title}
            </button>
          )}
          <button
            className="desktop-btn white"
            onClick={() => router.push('/korea/kpop')}
          >
            浏览全部歌曲
          </button>
        </div>
      </div>

      {/* Song list + Submit card */}
      <div className="desktop-grid-2" style={{ marginTop: 16 }}>
        <div>
          <div className="desktop-section">
            <h2>精选歌曲</h2>
            <span>已整理</span>
          </div>
          <div className="desktop-song-list">
            {tracks.slice(0, 6).map((track) => (
              <SongItem
                key={track.id}
                track={track}
                progress={progressMap[track.id] || 0}
                onClick={() => router.push(`/korea/kpop/${track.id}`)}
              />
            ))}
          </div>
        </div>
        <div>
          <div className="desktop-section">
            <h2>提交想练的歌</h2>
            <span>Beta</span>
          </div>
          <div className="desktop-card">
            <h3>想练哪首歌？</h3>
            <p>内容团队持续更新歌曲库。现有 {tracks.length} 首可学习歌曲，涵盖 BLACKPINK、BTS、aespa 等热门艺人。</p>
            <div className="desktop-btnrow">
              <button className="desktop-btn black" onClick={() => router.push('/korea/kpop')}>
                浏览全部歌曲
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function SongItem({ track, progress, onClick }: { track: KpopTrack; progress: number; onClick: () => void }) {
  const levelLabel = track.level === 'beginner' ? '入门' : '中级';
  const isContinue = progress > 0 && progress < 100;
  const isDone = progress >= 100;

  return (
    <div className="desktop-song" onClick={onClick}>
      <div className={`desktop-cover${track.level !== 'beginner' ? ' dark' : ''}`} />
      <div className="desktop-item-main">
        <h3>{track.title}</h3>
        <p>{track.artist} · {levelLabel} · {track.lyrics?.length || 0} 句</p>
        <div className="desktop-pills">
          <span>原唱音频</span>
          <span>可跟唱</span>
        </div>
      </div>
      {isDone ? (
        <span className="desktop-status-pill" style={{ background: 'var(--color-mint-soft)', color: 'var(--color-mint-strong)' }}>已完成</span>
      ) : isContinue ? (
        <span className="desktop-status-pill" style={{ background: 'var(--color-pink-soft)', color: 'var(--color-pink-strong)' }}>继续</span>
      ) : (
        <span className="desktop-status-pill">打开</span>
      )}
    </div>
  );
}
