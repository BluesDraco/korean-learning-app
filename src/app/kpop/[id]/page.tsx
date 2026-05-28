'use client';

import { useState, useMemo, useRef, useEffect, useCallback, forwardRef } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Music, BookOpen, Hash, Volume2, Eye, EyeOff,
  Languages, Play, ChevronDown, Pause,
} from 'lucide-react';
import { kpopSongs } from '@/data/kpopSongs';
import type { KpopSong, KpopLyricLine } from '@/types';

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

function speakKorean(text: string) {
  if (typeof window === 'undefined') return;
  window.speechSynthesis.cancel();
  const u = new SpeechSynthesisUtterance(text);
  u.lang = 'ko-KR';
  u.rate = 0.75;
  u.pitch = 1;
  window.speechSynthesis.speak(u);
}

function groupBySection(lyrics: KpopLyricLine[]): { section: string; lines: KpopLyricLine[]; startLineIdx: number }[] {
  const groups: { section: string; lines: KpopLyricLine[]; startLineIdx: number }[] = [];
  let currentSection = '';
  let currentLines: KpopLyricLine[] = [];
  let startIdx = 0;

  for (let i = 0; i < lyrics.length; i++) {
    const line = lyrics[i];
    if (line.section && line.section !== currentSection) {
      if (currentLines.length > 0) {
        groups.push({ section: currentSection, lines: currentLines, startLineIdx: startIdx });
      }
      currentSection = line.section;
      currentLines = [line];
      startIdx = i;
    } else {
      currentLines.push(line);
    }
  }
  if (currentLines.length > 0) {
    groups.push({ section: currentSection || '', lines: currentLines, startLineIdx: startIdx });
  }
  return groups;
}

// YouTube iFrame API type declarations
declare global {
  interface Window {
    onYouTubeIframeAPIReady: (() => void) | null;
    YT: {
      Player: new (el: string | HTMLElement, cfg: {
        events?: { onReady?: (e: { target: YTPlayer }) => void; onStateChange?: (e: { data: number }) => void };
        videoId?: string;
        playerVars?: Record<string, number | string>;
      }) => YTPlayer;
      PlayerState: { PLAYING: number; PAUSED: number; ENDED: number };
    } | null;
  }
}

interface YTPlayer {
  getCurrentTime: () => number;
  getPlayerState: () => number;
  playVideo: () => void;
  pauseVideo: () => void;
  seekTo: (sec: number, allowSeekAhead: boolean) => void;
  destroy: () => void;
}

export default function KpopSongPage() {
  const { id } = useParams<{ id: string }>();
  const song = useMemo(() => kpopSongs.find((s) => s.id === id), [id]);

  const [showTranslation, setShowTranslation] = useState(true);
  const [showPronunciation, setShowPronunciation] = useState(true);
  const [expandedVocab, setExpandedVocab] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set());
  const [activeLineIdx, setActiveLineIdx] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const playerRef = useRef<YTPlayer | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const lineRefs = useRef<Map<number, HTMLDivElement>>(new Map());
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);

  // Set iframe src + init YouTube player when iframe loads
  useEffect(() => {
    if (!song) return;

    const iframe = iframeRef.current;
    if (!iframe) return;

    let cancelled = false;

    const apiReady = (cb: () => void) => {
      if (window.YT?.Player) { cb(); return; }
      if (!document.getElementById('yt-iframe-api')) {
        const tag = document.createElement('script');
        tag.id = 'yt-iframe-api';
        tag.src = 'https://www.youtube.com/iframe_api';
        document.getElementsByTagName('script')[0]?.parentNode?.insertBefore(tag, document.getElementsByTagName('script')[0]);
      }
      const prev = window.onYouTubeIframeAPIReady;
      window.onYouTubeIframeAPIReady = () => { if (prev) prev(); cb(); };
    };

    const createPlayer = () => {
      if (cancelled || playerRef.current) return;
      try {
        playerRef.current = new window.YT!.Player(iframe, {
          events: {
            onReady: () => { /* ready */ },
            onStateChange: (e: { data: number }) => {
              setIsPlaying(e.data === window.YT!.PlayerState.PLAYING);
            },
          },
        });
      } catch {
        setTimeout(createPlayer, 500);
      }
    };

    const onIframeLoad = () => {
      if (cancelled) return;
      apiReady(createPlayer);
    };

    // Set src (triggers load)
    iframe.src = `https://www.youtube.com/embed/${song.videoId}?autoplay=0&rel=0&modestbranding=1&enablejsapi=1&origin=${encodeURIComponent(window.location.origin)}`;
    iframe.addEventListener('load', onIframeLoad);

    return () => {
      cancelled = true;
      iframe.removeEventListener('load', onIframeLoad);
      cancelAnimationFrame(rafRef.current);
      if (playerRef.current) {
        playerRef.current.destroy();
        playerRef.current = null;
      }
    };
  }, [song]);

  // Poll player currentTime → match active line
  useEffect(() => {
    if (!song) return;

    const poll = () => {
      try {
        const player = playerRef.current;
        if (!player || typeof player.getCurrentTime !== 'function') {
          rafRef.current = requestAnimationFrame(poll);
          return;
        }

        const state = player.getPlayerState();
        if (state !== window.YT?.PlayerState?.PLAYING) {
          rafRef.current = requestAnimationFrame(poll);
          return;
        }

        const t = player.getCurrentTime();
        let found = -1;

        for (let i = 0; i < song.lyrics.length; i++) {
          const line = song.lyrics[i];
          if (t >= line.start && t < line.end) {
            found = i;
            break;
          }
        }

        if (found === -1 && song.lyrics.length > 0) {
          const last = song.lyrics[song.lyrics.length - 1];
          if (t >= last.end) {
            found = song.lyrics.length - 1;
          }
        }

        setActiveLineIdx((prev) => (prev !== found ? found : prev));
      } catch {
        // Player not ready yet
      }
      rafRef.current = requestAnimationFrame(poll);
    };

    rafRef.current = requestAnimationFrame(poll);
    return () => cancelAnimationFrame(rafRef.current);
  }, [song]);

  // Auto-scroll active line into view — smooth, keep it centered
  useEffect(() => {
    if (activeLineIdx === null) return;
    const el = lineRefs.current.get(activeLineIdx);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [activeLineIdx]);

  // Toggle section collapse
  const toggleSection = useCallback((section: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(section)) next.delete(section);
      else next.add(section);
      return next;
    });
  }, []);

  // Skip to a specific timestamp when clicking a lyric line
  const seekTo = useCallback((seconds: number) => {
    const player = playerRef.current;
    if (player && typeof player.seekTo === 'function' && typeof player.playVideo === 'function') {
      player.seekTo(seconds, true);
      player.playVideo();
    }
  }, []);

  if (!song) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center space-y-3">
          <span className="text-5xl">🎵</span>
          <p className="text-[var(--text-secondary)]">未找到该歌曲</p>
          <Link href="/kpop" className="text-sm text-[var(--pink-primary)] hover:underline">返回曲库</Link>
        </div>
      </div>
    );
  }

  const level = LEVEL_CONFIG[song.level];
  const vocabWords = uniqueKoreanWords(song.lyrics);
  const groups = groupBySection(song.lyrics);

  // Left column content
  const leftColumn = (
    <div className="space-y-4">
      {/* MV with YouTube iframe */}
      <div className="relative rounded-2xl overflow-hidden bg-black shadow-lg" style={{ aspectRatio: '16/9' }}>
        <iframe
          ref={iframeRef}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          title={song.title}
        />
      </div>

      {/* Song info */}
      <div
        className="rounded-2xl p-4 border"
        style={{
          background: `linear-gradient(135deg, ${song.color}15 0%, var(--bg-card) 50%)`,
          borderColor: `${song.color}33`,
        }}
      >
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xl">{song.artistEmoji}</span>
          <div>
            <h1 className="text-lg font-bold text-[var(--text-primary)]">{song.title}</h1>
            <p className="text-xs text-[var(--text-secondary)]">{song.artist} · {song.album} · {song.year}</p>
          </div>
        </div>
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
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        {[
          { label: '韩语词', value: vocabWords.length, color: 'var(--pink-primary)' },
          { label: '歌词句', value: song.lyrics.length, color: 'var(--purple-soft)' },
          { label: '段落', value: groups.length, color: 'var(--mint-soft)' },
        ].map(({ label, value, color }) => (
          <div key={label} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-2.5 text-center">
            <div className="text-base font-bold" style={{ color }}>{value}</div>
            <div className="text-[10px] text-[var(--text-muted)]">{label}</div>
          </div>
        ))}
      </div>

      {/* Controls */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className={`flex items-center gap-1 text-[11px] px-2 py-1.5 rounded-lg transition-colors ${
            showTranslation ? 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]' : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
          }`}
        >
          {showTranslation ? <Eye size={12} /> : <EyeOff size={12} />}
          译文
        </button>
        <button
          onClick={() => setShowPronunciation(!showPronunciation)}
          className={`flex items-center gap-1 text-[11px] px-2 py-1.5 rounded-lg transition-colors ${
            showPronunciation ? 'bg-[var(--blue-soft)]/10 text-[var(--blue-soft)]' : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
          }`}
        >
          <Languages size={12} />
          罗马音
        </button>
        <button
          onClick={() => speakKorean(song.lyrics.map((l) => l.korean).join(' '))}
          className="flex items-center gap-1 text-[11px] px-2 py-1.5 rounded-lg bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors"
        >
          <Play size={12} />
          全文朗读
        </button>
        <button
          onClick={() => setExpandedVocab(!expandedVocab)}
          className="flex items-center gap-1 text-[11px] px-2 py-1.5 rounded-lg bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
        >
          <BookOpen size={12} />
          {vocabWords.length}词
        </button>
      </div>

      {/* Vocab expandable */}
      {expandedVocab && (
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 max-h-40 overflow-y-auto">
          <div className="flex flex-wrap gap-1.5">
            {vocabWords.map((word) => (
              <span
                key={word}
                className="px-2 py-1 rounded-lg bg-[var(--bg-input)] text-xs text-[var(--text-primary)] font-medium hover:bg-[var(--pink-primary)]/10 hover:text-[var(--pink-primary)] cursor-pointer transition-colors"
                onClick={() => speakKorean(word)}
                title="点击发音"
              >
                {word}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  );

  return (
    <div className="py-4 space-y-4">
      {/* Back nav */}
      <Link
        href="/kpop"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
      >
        <ArrowLeft size={16} />
        返回曲库
      </Link>

      {/* Two-column on desktop, single column on mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-[40%_1fr] gap-5 items-start">
        {/* Left — sticky on desktop, first item on mobile */}
        <div className="lg:sticky lg:top-[60px]">{leftColumn}</div>

        {/* Right — lyrics with sync */}
        <div ref={scrollContainerRef} className="space-y-1">
          {groups.length === 0 ? (
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
              {song.lyrics.map((line, i) => (
                <LyricLine
                  key={i}
                  index={i}
                  line={line}
                  showPronunciation={showPronunciation}
                  showTranslation={showTranslation}
                  isActive={activeLineIdx === i}
                  onSeek={() => seekTo(line.start)}
                  ref={(el) => { if (el) lineRefs.current.set(i, el); }}
                />
              ))}
            </div>
          ) : (
            groups.map((group, gi) => {
              const sectionKey = group.section || `section-${gi}`;
              const isExpanded = !expandedSections.has(sectionKey);

              return (
                <div
                  key={gi}
                  className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden"
                >
                  {/* Section header */}
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
                  {isExpanded && group.lines.map((line, i) => {
                    const globalIdx = group.startLineIdx + i;
                    return (
                      <LyricLine
                        key={globalIdx}
                        index={globalIdx}
                        line={line}
                        showPronunciation={showPronunciation}
                        showTranslation={showTranslation}
                        isActive={activeLineIdx === globalIdx}
                        onSeek={() => seekTo(line.start)}
                        ref={(el) => { if (el) lineRefs.current.set(globalIdx, el); }}
                      />
                    );
                  })}
                </div>
              );
            })
          )}

          {/* Sync indicator */}
          {isPlaying && activeLineIdx !== null && (
            <div className="text-center py-2">
              <span className="inline-flex items-center gap-1.5 text-[10px] text-[var(--pink-primary)] bg-[var(--pink-primary)]/5 px-2.5 py-1 rounded-full">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--pink-primary)] animate-pulse" />
                实时同步中
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ── Single lyric line ──────────────────────────────────────────

const LyricLine = forwardRef<HTMLDivElement, {
  index: number;
  line: KpopLyricLine;
  showPronunciation: boolean;
  showTranslation: boolean;
  isActive: boolean;
  onSeek: () => void;
}>(function LyricLine({ index, line, showPronunciation, showTranslation, isActive, onSeek }, ref) {
  return (
    <div
      ref={ref}
      onClick={onSeek}
      className={`flex items-start gap-2.5 px-3.5 py-2 transition-all border-b border-[var(--border-color)]/30 last:border-b-0 group cursor-pointer ${
        isActive
          ? 'bg-[var(--pink-primary)]/10 border-l-[3px] border-l-[var(--pink-primary)]'
          : 'hover:bg-[var(--bg-card-hover)]/50 border-l-[3px] border-l-transparent'
      }`}
    >
      {/* Timestamp */}
      <button
        onClick={(e) => { e.stopPropagation(); onSeek(); }}
        className="text-[10px] text-[var(--text-placeholder)] mt-[3px] shrink-0 w-10 text-right tabular-nums hover:text-[var(--pink-primary)] transition-colors"
        title="点击跳转"
      >
        {formatTime(line.start)}
      </button>
      <div className="flex-1 min-w-0">
        {/* Korean */}
        <div className="flex items-center gap-1.5">
          <p className={`text-sm leading-snug transition-colors ${
            isActive ? 'font-bold text-[var(--pink-primary)]' : 'font-semibold text-[var(--text-primary)]'
          }`}>
            {line.korean}
          </p>
          <button
            onClick={(e) => { e.stopPropagation(); speakKorean(line.korean); }}
            className="shrink-0 w-6 h-6 rounded-full flex items-center justify-center hover:bg-[var(--pink-primary)]/10 text-[var(--text-muted)] hover:text-[var(--pink-primary)] active:scale-90 transition-all opacity-0 group-hover:opacity-100"
            title="朗读"
          >
            <Volume2 size={12} />
          </button>
        </div>

        {/* Pronunciation */}
        {showPronunciation && (
          <p className="text-[11px] text-[var(--text-muted)] leading-tight mt-0.5">
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
});

function formatTime(seconds: number): string {
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}
