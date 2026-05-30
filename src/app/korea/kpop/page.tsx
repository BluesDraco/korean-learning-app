'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, BookOpen, Hash, Newspaper } from 'lucide-react';
import { kpopSongs } from '@/data/kpopSongs';
import type { KpopSong } from '@/types';

const LEVEL_CONFIG: Record<string, { label: string; color: string }> = {
  beginner: { label: '初级', color: '#A8D8D0' },
  intermediate: { label: '中级', color: '#FFE4A0' },
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

  return (
    <div className="py-6 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">🎤 韩语歌</h1>
        <p className="text-[var(--text-secondary)] text-base mt-1">
          跟着KPOP学韩语 — 逐句拆解歌词，学单词，练发音
        </p>
      </div>

      {/* Two modules */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Module 1: Song stats */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center text-2xl shrink-0">
            🎵
          </div>
          <div>
            <div className="text-lg font-bold text-[var(--text-primary)]">{kpopSongs.length} 首歌曲</div>
            <div className="text-sm text-[var(--text-muted)]">{totalWords}+ 韩语词汇等你学</div>
          </div>
        </div>

        {/* Module 2: News link */}
        <Link
          href="/korea/kpop/news"
          className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 flex items-center gap-4 hover:border-[var(--pink-pale)] hover:shadow-md transition-all group"
        >
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-rose-400 to-orange-400 flex items-center justify-center text-2xl shrink-0">
            📰
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--pink-primary)] transition-colors">
              KPOP 热点资讯
            </div>
            <div className="text-sm text-[var(--text-muted)]">最新KPOP动态，边追星边学韩语</div>
          </div>
          <Newspaper size={20} className="text-[var(--text-muted)] group-hover:text-[var(--pink-primary)] transition-colors shrink-0" />
        </Link>
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
        <div className="flex gap-1.5 flex-wrap">
          {allArtists.map((artist) => {
            const song = kpopSongs.find((s) => s.artist === artist)!;
            return (
              <button
                key={artist}
                onClick={() => setSearch(search === artist ? '' : artist)}
                className={`px-2.5 py-1.5 rounded-lg text-xs transition-all ${
                  search === artist
                    ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] font-medium'
                    : 'text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-card-hover)]'
                }`}
              >
                {song.artistEmoji} {artist}
              </button>
            );
          })}
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
              href={`/korea/kpop/${song.id}`}
              className="group bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:border-[var(--pink-pale)] hover:shadow-lg hover:-translate-y-0.5 transition-all"
            >
              <div
                className="relative h-36 flex items-center justify-center overflow-hidden"
                style={{ background: `linear-gradient(135deg, ${song.color}44, ${song.color}22, var(--bg-card))` }}
              >
                <div className="absolute inset-0 opacity-10">
                  <div className="absolute top-2 left-3 text-3xl rotate-12">♪</div>
                  <div className="absolute top-6 right-4 text-4xl -rotate-6">♫</div>
                  <div className="absolute bottom-2 left-6 text-2xl">♪</div>
                </div>
                <span className="relative text-6xl group-hover:scale-110 transition-transform">
                  {song.artistEmoji}
                </span>
              </div>
              <div className="p-4">
                <div className="flex items-center gap-2 mb-1.5">
                  <span
                    className="text-[11px] px-1.5 py-0.5 rounded font-medium"
                    style={{ backgroundColor: level.color + '30', color: level.color }}
                  >
                    {level.label}
                  </span>
                  <span className="text-[11px] text-[var(--text-muted)]">{song.year}</span>
                </div>
                <h3 className="text-sm font-bold text-[var(--text-primary)] truncate">{song.title}</h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">{song.artistEmoji} {song.artist}</p>
                <div className="flex items-center gap-3 text-[11px] text-[var(--text-muted)] mt-2">
                  <span className="flex items-center gap-1"><BookOpen size={11} />{wordCount} 词</span>
                  <span className="flex items-center gap-1"><Hash size={11} />{song.lyrics.length} 句</span>
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
