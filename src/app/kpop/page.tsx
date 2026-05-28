'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Music, Search, BookOpen, Hash } from 'lucide-react';
import { kpopSongs } from '@/data/kpopSongs';
import type { KpopSong } from '@/types';

const LEVEL_CONFIG: Record<string, { label: string; color: string }> = {
  beginner: { label: '初级', color: 'var(--mint-soft)' },
  intermediate: { label: '中级', color: 'var(--peach-soft)' },
};

function uniqueKoreanWords(lyrics: KpopSong['lyrics']): number {
  const all = lyrics
    .filter((l) => /[가-힣]/.test(l.korean))
    .flatMap((l) => l.korean.split(/[\s,.'"!?\-…]+/))
    .filter((w) => /[가-힣]/.test(w) && w.length > 1);
  return new Set(all).size;
}

export default function KpopPage() {
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState<string>('all');

  const allArtists = useMemo(() => {
    const set = new Set(kpopSongs.map((s) => s.artist));
    return Array.from(set);
  }, []);

  const filtered = useMemo(() => {
    return kpopSongs.filter((s) => {
      if (levelFilter !== 'all' && s.level !== levelFilter) return false;
      if (search) {
        const q = search.toLowerCase();
        return (
          s.title.toLowerCase().includes(q) ||
          s.artist.toLowerCase().includes(q) ||
          s.tags.some((t) => t.includes(q))
        );
      }
      return true;
    });
  }, [search, levelFilter]);

  const totalWords = kpopSongs.reduce((s, song) => s + uniqueKoreanWords(song.lyrics), 0);
  const totalLines = kpopSongs.reduce((s, song) => s + song.lyrics.length, 0);

  return (
    <div className="py-4 space-y-6">
      {/* Hero */}
      <div
        className="relative rounded-3xl overflow-hidden p-6 md:p-8"
        style={{
          background: 'linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #533483 100%)',
        }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-4 right-8 text-6xl">🎵</div>
          <div className="absolute bottom-6 left-6 text-5xl">🎤</div>
          <div className="absolute top-10 left-1/3 text-4xl">✨</div>
        </div>
        <div className="relative z-10 flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <span className="text-3xl">🎧</span>
              <h1 className="text-2xl md:text-3xl font-bold text-white" style={{ fontFamily: "'ZCOOL KuaiLe', cursive" }}>
                KPOP 学韩语
              </h1>
            </div>
            <p className="text-sm text-white/70 max-w-md">
              用你最爱的歌曲学韩语。逐句拆解歌词，学单词，练发音，追星顺便把韩语拿下。
            </p>
            <div className="flex items-center gap-4 text-white/60 text-xs">
              <span className="flex items-center gap-1"><Music size={13} />{kpopSongs.length} 首歌</span>
              <span className="flex items-center gap-1"><BookOpen size={13} />{totalWords}+ 词汇</span>
              <span className="flex items-center gap-1"><Hash size={13} />{totalLines} 句歌词</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            {allArtists.map((artist) => {
              const song = kpopSongs.find((s) => s.artist === artist)!;
              return (
                <button
                  key={artist}
                  onClick={() => setSearch(artist)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-white/10 text-white/80 hover:bg-white/20 transition-colors"
                >
                  {song.artistEmoji} {artist}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-xs">
          <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-muted)]" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="搜索歌名或歌手..."
            className="w-full bg-[var(--bg-input)] border border-[var(--border-color)] rounded-xl py-2.5 pl-9 pr-4 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors"
          />
        </div>
        <div className="flex gap-2">
          {[
            { value: 'all', label: '全部' },
            { value: 'beginner', label: '初级' },
            { value: 'intermediate', label: '中级' },
          ].map((opt) => (
            <button
              key={opt.value}
              onClick={() => setLevelFilter(opt.value)}
              className={`px-3 py-2 rounded-xl text-xs font-medium transition-all ${
                levelFilter === opt.value
                  ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] border border-[var(--pink-primary)]/20'
                  : 'bg-[var(--bg-card)] text-[var(--text-secondary)] border border-[var(--border-color)] hover:border-[var(--pink-pale)]'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      {/* Song Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filtered.map((song) => {
          const wordCount = uniqueKoreanWords(song.lyrics);
          const level = LEVEL_CONFIG[song.level];
          return (
            <Link
              key={song.id}
              href={`/kpop/${song.id}`}
              className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[var(--pink-pale)] hover:shadow-lg transition-all"
            >
              {/* Thumbnail area */}
              <div
                className="relative h-36 flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${song.color}44 0%, ${song.color}22 40%, var(--bg-card) 100%)` }}
              >
                {/* Music note pattern */}
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 left-3 text-3xl transform rotate-12">♪</div>
                  <div className="absolute top-6 right-4 text-4xl transform -rotate-6">♫</div>
                  <div className="absolute bottom-2 left-6 text-2xl">♪</div>
                </div>
                <span className="relative text-6xl drop-shadow-lg group-hover:scale-110 transition-transform">
                  {song.artistEmoji}
                </span>
              </div>
              <div className="p-4 space-y-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span
                      className="text-[11px] px-1.5 py-0.5 rounded-md font-medium"
                      style={{ backgroundColor: level.color + '20', color: level.color }}
                    >
                      {level.label}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">{song.year}</span>
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] truncate">{song.title}</h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-0.5">{song.artistEmoji} {song.artist}</p>
                </div>
                <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)]">
                  <span className="flex items-center gap-1"><BookOpen size={11} />{wordCount} 生词</span>
                  <span className="flex items-center gap-1"><Hash size={11} />{song.lyrics.length} 句</span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {song.tags.map((tag) => (
                    <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--bg-input)] text-[var(--text-muted)]">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <div className="text-center py-20 space-y-3">
          <span className="text-5xl">🎵</span>
          <p className="text-[var(--text-secondary)] text-sm">没有找到匹配的歌曲</p>
        </div>
      )}
    </div>
  );
}
