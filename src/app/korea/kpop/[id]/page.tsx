'use client';

import { useState, useMemo } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, BookOpen, Hash, Volume2, Eye, EyeOff,
  Languages, Play, ChevronDown, ExternalLink, Search,
} from 'lucide-react';
import { kpopSongs } from '@/data/kpopSongs';
import type { KpopSong, KpopLyricLine } from '@/types';
import { speak } from '@/lib/tts';

const LEVEL_CONFIG: Record<string, { label: string; color: string }> = {
  beginner: { label: '初级', color: 'var(--mint-soft)' },
  intermediate: { label: '中级', color: 'var(--peach-soft)' },
};

function uniqueKoreanWords(lyrics: KpopSong['lyrics']): string[] {
  const all = lyrics
    .filter((l) => /[가-힣]/.test(l.korean))
    .flatMap((l) => l.korean.split(/[\s,.'"!?\-…]+/))
    .filter((w) => /[가-힣]/.test(w) && w.length > 1);
  return Array.from(new Set(all));
}

function groupBySection(lyrics: KpopLyricLine[]): { section: string; lines: KpopLyricLine[] }[] {
  const groups: { section: string; lines: KpopLyricLine[] }[] = [];
  let currentSection = '';
  let currentLines: KpopLyricLine[] = [];

  for (const line of lyrics) {
    if (line.section && line.section !== currentSection) {
      if (currentLines.length > 0) {
        groups.push({ section: currentSection, lines: currentLines });
      }
      currentSection = line.section;
      currentLines = [line];
    } else {
      currentLines.push(line);
    }
  }
  if (currentLines.length > 0) {
    groups.push({ section: currentSection || '', lines: currentLines });
  }
  return groups;
}

export default function KpopSongPage() {
  const { id } = useParams<{ id: string }>();
  const song = useMemo(() => kpopSongs.find((s) => s.id === id), [id]);

  const [showTranslation, setShowTranslation] = useState(true);
  const [showPronunciation, setShowPronunciation] = useState(true);
  const [expandedVocab, setExpandedVocab] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  };

  if (!song) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center space-y-3">
          <span className="text-5xl">🎵</span>
          <p className="text-[var(--text-secondary)]">未找到该歌曲</p>
          <Link href="/korea/kpop" className="text-sm text-[var(--pink-primary)] hover:underline">韩语歌跟唱</Link>
        </div>
      </div>
    );
  }

  const level = LEVEL_CONFIG[song.level];
  const vocabWords = uniqueKoreanWords(song.lyrics);
  const groups = groupBySection(song.lyrics);
  const thumbnailUrl = `https://img.youtube.com/vi/${song.videoId}/hqdefault.jpg`;

  return (
    <div className="py-4 space-y-5 max-w-2xl mx-auto">
      {/* Back nav */}
      <Link
        href="/korea/kpop"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
      >
        <ArrowLeft size={16} />
        韩语歌跟唱
      </Link>

      {/* Song hero card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
        {/* Cover image */}
        <div className="relative h-48 bg-black/40 overflow-hidden">
          <img
            src={thumbnailUrl}
            alt={song.title}
            className="w-full h-full object-cover opacity-80"
            onError={(e) => {
              // Hide broken image, show gradient fallback
              (e.target as HTMLImageElement).style.display = 'none';
            }}
          />
          <div
            className="absolute inset-0"
            style={{
              background: `linear-gradient(to top, var(--bg-card) 0%, transparent 60%, ${song.color}33 100%)`,
            }}
          />
          {/* Song title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">{song.artistEmoji}</span>
              <h1 className="text-xl font-bold text-white">{song.title}</h1>
            </div>
            <p className="text-sm text-white/70">{song.artist} · {song.album} · {song.year}</p>
          </div>
        </div>

        {/* Song meta + stats */}
        <div className="p-4 space-y-3">
          {/* Tags */}
          <div className="flex flex-wrap gap-1.5">
            {song.tags.map((tag) => (
              <span key={tag} className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--bg-input)] text-[var(--text-muted)]">
                {tag}
              </span>
            ))}
            <span
              className="text-[10px] px-1.5 py-0.5 rounded-md font-medium"
              style={{ backgroundColor: level.color + '18', color: level.color }}
            >
              {level.label}
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[var(--bg-input)] text-[var(--text-muted)]">
              {song.lyricsKind === 'full' ? '完整歌词' : '精选歌词'}
            </span>
          </div>

          {/* Stats row */}
          <div className="grid grid-cols-3 gap-2">
            {[
              { label: '韩语词', value: vocabWords.length, color: 'var(--pink-primary)' },
              { label: '歌词句', value: song.lyrics.length, color: 'var(--purple-soft)' },
              { label: '段落', value: groups.length, color: 'var(--mint-soft)' },
            ].map(({ label, value, color }) => (
              <div key={label} className="bg-[var(--bg-input)]/50 rounded-xl p-2.5 text-center">
                <div className="text-base font-bold" style={{ color }}>{value}</div>
                <div className="text-[10px] text-[var(--text-muted)]">{label}</div>
              </div>
            ))}
          </div>

          {/* External search links */}
          <div className="flex items-center gap-2">
            <a
              href={`https://search.bilibili.com/all?keyword=${encodeURIComponent(song.artist + ' ' + song.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors"
            >
              <Search size={12} />
              B站搜索MV
            </a>
            <a
              href={`https://music.163.com/#/search/m/?s=${encodeURIComponent(song.artist + ' ' + song.title)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              <ExternalLink size={12} />
              网易云
            </a>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className={`flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg transition-colors ${
            showTranslation ? 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]' : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
          }`}
        >
          {showTranslation ? <Eye size={12} /> : <EyeOff size={12} />}
          译文
        </button>
        <button
          onClick={() => setShowPronunciation(!showPronunciation)}
          className={`flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg transition-colors ${
            showPronunciation ? 'bg-[var(--blue-soft)]/10 text-[var(--blue-soft)]' : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
          }`}
        >
          <Languages size={12} />
          罗马音
        </button>
        <button
          onClick={() => speak(song.lyrics.map((l) => l.korean).join(' '), 0.75)}
          className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors"
        >
          <Play size={12} />
          全文朗读
        </button>
        <button
          onClick={() => setExpandedVocab(!expandedVocab)}
          className="flex items-center gap-1 text-[11px] px-2.5 py-1.5 rounded-lg bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <BookOpen size={12} />
          {vocabWords.length} 词
        </button>
      </div>

      {/* Vocab panel */}
      {expandedVocab && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 max-h-44 overflow-y-auto">
          <div className="flex flex-wrap gap-1.5">
            {vocabWords.map((word) => (
              <span
                key={word}
                className="px-2 py-1 rounded-lg bg-[var(--bg-input)] text-xs text-[var(--text-primary)] font-medium hover:bg-[var(--pink-primary)]/10 hover:text-[var(--pink-primary)] cursor-pointer transition-colors"
                onClick={() => speak(word, 0.75)}
                title="点击发音"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Lyrics */}
      <div className="space-y-1">
        {song.lyrics.length === 0 ? (
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-8 text-center">
            <p className="text-sm text-[var(--text-muted)]">暂无歌词</p>
          </div>
        ) : groups.length <= 1 ? (
          // Flat list — no section headers
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
            {song.lyrics.map((line, i) => (
              <LyricLine
                key={i}
                index={i}
                line={line}
                showPronunciation={showPronunciation}
                showTranslation={showTranslation}
              />
            ))}
          </div>
        ) : (
          // Sectioned list
          groups.map((group, gi) => {
            const sectionKey = group.section || `section-${gi}`;
            const isExpanded = !expandedSections.has(sectionKey);

            return (
              <div
                key={gi}
                className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden"
              >
                {group.section && (
                  <button
                    onClick={() => toggleSection(sectionKey)}
                    className="w-full flex items-center gap-2 px-4 py-2.5 text-left hover:bg-[var(--bg-card-hover)] transition-colors sticky top-0 bg-[var(--bg-card)] z-10 border-b border-[var(--border-color)]"
                  >
                    <span
                      className="text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-md"
                      style={{ backgroundColor: song.color + '18', color: song.color }}
                    >
                      {group.section}
                    </span>
                    <span className="text-[11px] text-[var(--text-muted)]">{group.lines.length}句</span>
                    <ChevronDown
                      size={14}
                      className={`ml-auto text-[var(--text-muted)] transition-transform ${isExpanded ? '' : '-rotate-90'}`}
                    />
                  </button>
                )}
                {isExpanded && group.lines.map((line, i) => (
                  <LyricLine
                    key={i}
                    index={i + 1}
                    line={line}
                    showPronunciation={showPronunciation}
                    showTranslation={showTranslation}
                  />
                ))}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}

// ── Single lyric line ──────────────────────────────────────────

function LyricLine({
  index,
  line,
  showPronunciation,
  showTranslation,
}: {
  index: number;
  line: KpopLyricLine;
  showPronunciation: boolean;
  showTranslation: boolean;
}) {
  return (
    <div className="flex items-start gap-2.5 px-3.5 py-2 hover:bg-[var(--bg-card-hover)]/50 transition-colors border-b border-[var(--border-color)]/30 last:border-b-0 group">
      {/* Line number */}
      <span className="text-[10px] text-[var(--text-placeholder)] mt-[3px] shrink-0 w-5 text-right tabular-nums select-none">
        {index}
      </span>
      <div className="flex-1 min-w-0">
        {/* Korean */}
        <div className="flex items-center gap-1.5">
          <p className="text-sm font-semibold text-[var(--text-primary)] leading-snug">
            {line.korean}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); speak(line.korean, 0.75); }}
            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center hover:bg-[var(--pink-primary)]/10 text-[var(--text-muted)] hover:text-[var(--pink-primary)] active:scale-90 transition-all opacity-0 group-hover:opacity-100"
            title="朗读本句"
          >
            <Volume2 size={12} />
          </button>
        </div>

        {/* Pronunciation */}
        {showPronunciation && (
          <p className="text-[11px] text-[var(--text-muted)] leading-tight mt-0.5 select-none">
            {line.pronunciation}
          </p>
        )}

        {/* Translation */}
        {showTranslation && line.chinese && (
          <p className="text-xs text-[var(--text-secondary)] leading-tight mt-0.5">
            {line.chinese}
          </p>
        )}
      </div>
    </div>
  );
}
