'use client';

import { useState, useMemo, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Music, BookOpen, Hash, Volume2, Eye, EyeOff,
  Languages, Gauge, Play, Loader2,
} from 'lucide-react';
import { kpopSongs } from '@/data/kpopSongs';
import type { KpopSong } from '@/types';

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

export default function KpopSongPage() {
  const { id } = useParams<{ id: string }>();
  const song = useMemo(() => kpopSongs.find((s) => s.id === id), [id]);

  const [showTranslation, setShowTranslation] = useState(true);
  const [showPronunciation, setShowPronunciation] = useState(true);
  const [expandedVocab, setExpandedVocab] = useState(false);

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

  return (
    <div className="py-4 space-y-5 max-w-2xl mx-auto">
      {/* Back nav */}
      <Link
        href="/kpop"
        className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
      >
        <ArrowLeft size={16} />
        返回曲库
      </Link>

      {/* MV Player */}
      <div className="relative rounded-2xl overflow-hidden bg-black aspect-video shadow-lg">
        <iframe
          src={`https://www.youtube.com/embed/${song.videoId}?autoplay=0&rel=0&modestbranding=1`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          title={song.title}
        />
      </div>

      {/* Song info card */}
      <div
        className="rounded-2xl p-5 border"
        style={{
          background: `linear-gradient(135deg, ${song.color}15 0%, var(--bg-card) 50%)`,
          borderColor: `${song.color}33`,
        }}
      >
        <div className="flex items-start justify-between gap-4 flex-wrap">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="text-2xl">{song.artistEmoji}</span>
              <div>
                <h1 className="text-xl font-bold text-[var(--text-primary)]">{song.title}</h1>
                <p className="text-sm text-[var(--text-secondary)]">{song.artist} · {song.album} · {song.year}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-1.5">
              {song.tags.map((tag) => (
                <span key={tag} className="text-[11px] px-2 py-0.5 rounded-lg bg-[var(--bg-input)] text-[var(--text-muted)]">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <div
            className="px-3 py-2 rounded-xl text-center"
            style={{ backgroundColor: level.color + '18' }}
          >
            <div className="text-sm font-bold" style={{ color: level.color }}>{level.label}</div>
            <div className="text-[11px] text-[var(--text-muted)]">难度</div>
          </div>
        </div>
      </div>

      {/* Stats row */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: '韩语词汇', value: vocabWords.length, icon: BookOpen, color: 'var(--pink-primary)' },
          { label: '歌词行数', value: song.lyrics.length, icon: Hash, color: 'var(--purple-soft)' },
          { label: '发行年份', value: song.year, icon: Music, color: 'var(--mint-soft)' },
        ].map(({ label, value, icon: Icon, color }) => (
          <div key={label} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-xl p-3 text-center">
            <Icon size={15} className="mx-auto mb-1" style={{ color }} />
            <div className="text-lg font-bold text-[var(--text-primary)]">{value}</div>
            <div className="text-[11px] text-[var(--text-muted)]">{label}</div>
          </div>
        ))}
      </div>

      {/* Toolbar */}
      <div className="flex items-center gap-2 flex-wrap">
        <button
          onClick={() => setShowTranslation(!showTranslation)}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
            showTranslation
              ? 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]'
              : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
          }`}
        >
          {showTranslation ? <Eye size={13} /> : <EyeOff size={13} />}
          中文翻译
        </button>
        <button
          onClick={() => setShowPronunciation(!showPronunciation)}
          className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg transition-colors ${
            showPronunciation
              ? 'bg-[var(--blue-soft)]/10 text-[var(--blue-soft)]'
              : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
          }`}
        >
          <Languages size={13} />
          罗马音
        </button>
        <button
          onClick={() => speakKorean(song.lyrics.map((l) => l.korean).join(' '))}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20 transition-colors"
        >
          <Play size={13} />
          连续朗读
        </button>
      </div>

      {/* Lyrics section */}
      <div className="space-y-0">
        {song.lyrics.map((line, i) => (
          <div
            key={i}
            className={`group flex items-start gap-3 px-4 py-3 transition-colors ${
              i % 2 === 0 ? 'bg-[var(--bg-card)]/50' : ''
            } rounded-xl`}
          >
            {/* Line number */}
            <span className="text-[11px] text-[var(--text-placeholder)] mt-0.5 shrink-0 w-5 text-right">
              {i + 1}
            </span>

            <div className="flex-1 min-w-0 space-y-0.5">
              {/* Korean + TTS button */}
              <div className="flex items-center gap-2">
                <p className="text-base font-bold text-[var(--text-primary)] leading-relaxed">
                  {line.korean}
                </p>
                <button
                  onClick={(e) => { e.stopPropagation(); speakKorean(line.korean); }}
                  className="shrink-0 w-7 h-7 rounded-full flex items-center justify-center hover:bg-[var(--pink-primary)]/10 text-[var(--text-muted)] hover:text-[var(--pink-primary)] active:scale-90 transition-all opacity-0 group-hover:opacity-100"
                  title="朗读"
                >
                  <Volume2 size={13} />
                </button>
              </div>

              {/* Pronunciation */}
              {showPronunciation && (
                <p className="text-xs text-[var(--text-muted)]">
                  [{line.pronunciation}]
                </p>
              )}

              {/* Translation */}
              {showTranslation && (
                <p className="text-sm text-[var(--text-secondary)]">
                  {line.chinese}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Vocab section */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
        <button
          onClick={() => setExpandedVocab(!expandedVocab)}
          className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-[var(--bg-card-hover)] transition-colors"
        >
          <div className="flex items-center gap-2">
            <BookOpen size={17} className="text-[var(--pink-primary)]" />
            <span className="text-sm font-medium text-[var(--text-primary)]">
              本曲词汇 ({vocabWords.length})
            </span>
          </div>
          <span className="text-xs text-[var(--text-muted)]">
            {expandedVocab ? '收起' : '展开'}
          </span>
        </button>
        {expandedVocab && (
          <div className="px-5 pb-4 border-t border-[var(--border-color)]">
            <div className="pt-3 flex flex-wrap gap-2">
              {vocabWords.map((word) => (
                <span
                  key={word}
                  className="px-3 py-1.5 rounded-xl bg-[var(--bg-input)] text-sm text-[var(--text-primary)] font-medium hover:bg-[var(--pink-primary)]/10 hover:text-[var(--pink-primary)] cursor-pointer transition-colors"
                  onClick={() => speakKorean(word)}
                  title="点击发音"
                >
                  {word}
                </span>
              ))}
            </div>
            <p className="text-[11px] text-[var(--text-muted)] mt-3">
              点击单词可听发音。建议逐句学习后将生词加入你的
              <Link href="/vocabulary" className="text-[var(--pink-primary)] hover:underline ml-0.5">单词本</Link>
              进行SRS复习。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
