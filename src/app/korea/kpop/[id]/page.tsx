'use client';

import { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  BookOpen, ChevronDown,
  Mic, Play, Pause,
} from 'lucide-react';
import { kpopSongs } from '@/data/kpopSongs';
import type { KpopLine } from '@/types/kpop';
import SingingMode from '@/components/kpop/SingingMode';
import { getSongProgress, loadSongProgress } from '@/lib/kpop/progress';
import { getTrackById } from '@/data/kpopTracks';
import { SegmentPlayer } from '@/lib/kpop/audioSegmentPlayer';
import { db } from '@/lib/db';

// ── Demo-exact design tokens ──
const C = {
  ink: '#241917',
  muted: '#89756e',
  line: '#eee0d8',
  lineRow: 'rgba(239,224,217,0.76)',
  linePlayer: 'rgba(239,224,217,0.9)',
  pink: '#ff7fa8',
  pinkText: '#f0799b',
  pinkSoft: '#fff0f5',
  mint: '#aee3d8',
  mintText: '#4e746d',
  mintBg: '#eaf8f5',
  black: '#201815',
  white: '#fff',
  inputBg: '#fff8f4',
  disabledBg: '#f5ece7',
  disabledText: '#b1a099',
  tagText: '#7a665f',
  rowLabel: '#a08f87',
  roman: '#6a5750',
  chinese: '#7e6b64',
  btnLight: '#6b5851',
  btnDarkText: '#5a4640',
  barBg: '#eadcd5',
  shadow: '0 16px 42px rgba(78,52,46,.10)',
  shadow2: '0 28px 72px rgba(78,52,46,.18)',
  shadowActive: '0 18px 48px rgba(255,127,168,.16)',
  shadowPlayBtn: '0 12px 26px rgba(32,24,21,.18)',
  shadowAudioPill: '0 10px 22px rgba(32,24,21,.14)',
};

const LEVEL_CONFIG: Record<string, { label: string }> = {
  beginner: { label: '入门' },
  intermediate: { label: '中级' },
  advanced: { label: '高级' },
};

function fmtTimestamp(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function KpopSongPage() {
  const { id } = useParams<{ id: string }>();
  const track = useMemo(() => getTrackById(id), [id]);
  const oldSong = useMemo(() => kpopSongs.find((s) => s.id === id), [id]);

  const [selectedLineIndex, setSelectedLineIndex] = useState<number | null>(null);
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);
  const [showSingingMode, setShowSingingMode] = useState(false);
  const [singStartIndex, setSingStartIndex] = useState(0);
  const [timingOffset, setTimingOffset] = useState<number | null>(null);
  const [lineCalibrations, setLineCalibrations] = useState<Record<number, { startOffsetMs: number; endOffsetMs: number }>>({});
  const [lyricsOverrides, setLyricsOverrides] = useState<Record<number, { korean: string; chinese: string }>>({});
  const [savedWords, setSavedWords] = useState<Set<string>>(new Set());
  const [wordToast, setWordToast] = useState<string | null>(null);

  function showWordToast(msg: string) { setWordToast(msg); setTimeout(() => setWordToast(null), 2000); }

  async function handleSaveWord(e: React.MouseEvent, word: string, meaning: string) {
    e.stopPropagation();
    if (savedWords.has(word)) { showWordToast('已保存'); return; }
    try {
      await db.words.add({
        id: 'kpop-' + word + '-' + Date.now(),
        word, pronunciation: '', meaning,
        partOfSpeech: '', examples: [], mastery: 'new' as const,
        srsLevel: 0, nextReview: Date.now(), easeFactor: 2.5, interval: 1,
        createdAt: Date.now(), lastReviewed: null,
      });
      setSavedWords(prev => new Set([...prev, word]));
      showWordToast('已保存到词库');
    } catch { showWordToast('保存失败'); }
  }

  // Full song player
  const [segmentStatus, setSegmentStatus] = useState<'loading' | 'ready' | 'unavailable'>('loading');
  const [isFullPlaying, setIsFullPlaying] = useState(false);
  const [fullCurrentTime, setFullCurrentTime] = useState(0);
  const [fullDuration, setFullDuration] = useState(0);
  const [playError, setPlayError] = useState<string | null>(null);
  const [slowMode, setSlowMode] = useState(false);
  const segmentPlayerRef = useRef<SegmentPlayer | null>(null);

  const rafRef = useRef<number | null>(null);
  const lineCardRefs = useRef<Map<number, HTMLElement>>(new Map());

  const lyrics = track?.lyrics ?? [];
  const totalLines = lyrics.length;

  // Init progress + calibration
  useEffect(() => {
    (async () => {
      const p = (await loadSongProgress(id)) ?? getSongProgress(id);
      if (p) setCompletedIndices(p.completedLineIndices);
    })();
    fetch(`/api/kpop/calibration?songId=${id}`)
      .then((r) => r.ok ? r.json() : null)
      .then((data) => { if (data?.timingOffsetMs != null) setTimingOffset(data.timingOffsetMs); })
      .catch(() => {});
    fetch(`/api/kpop/calibration/line?songId=${id}`)
      .then((r) => r.ok ? r.json() : [])
      .then((rows: Array<{ lineIndex: number; startOffsetMs: number; endOffsetMs: number }>) => {
        const map: Record<number, { startOffsetMs: number; endOffsetMs: number }> = {};
        rows.forEach((r) => { map[r.lineIndex] = { startOffsetMs: r.startOffsetMs, endOffsetMs: r.endOffsetMs }; });
        setLineCalibrations(map);
      })
      .catch(() => {});
    fetch(`/api/kpop/lyrics-override?songId=${id}`)
      .then((r) => r.ok ? r.json() : [])
      .then((rows: Array<{ lineIndex: number; korean: string; chinese: string }>) => {
        const map: Record<number, { korean: string; chinese: string }> = {};
        rows.forEach((r) => { map[r.lineIndex] = { korean: r.korean, chinese: r.chinese }; });
        setLyricsOverrides(map);
      })
      .catch(() => {});
  }, [id]);

  // Init SegmentPlayer only — handles both full and per-line playback
  useEffect(() => {
    if (!track?.audioUrl) return;
    setSegmentStatus('loading');
    setPlayError(null);
    const sp = new SegmentPlayer({
      onError: () => {
        setSegmentStatus('unavailable');
        setPlayError('此歌曲暂无音频');
      },
    });
    segmentPlayerRef.current = sp;
    sp.load(track.audioUrl).then(() => {
      if (sp.state === 'ready') {
        setSegmentStatus('ready');
        setPlayError(null);
      } else {
        setSegmentStatus('unavailable');
        setPlayError('此歌曲暂无音频');
      }
    }).catch(() => {
      setSegmentStatus('unavailable');
      setPlayError('此歌曲暂无音频');
    });
    // Set initial duration from last line's endMs
    if (track.lyrics.length > 0) {
      const lastLine = track.lyrics[track.lyrics.length - 1];
      setFullDuration((lastLine.endMs + (timingOffset ?? 0)) / 1000);
    }
    return () => { sp.destroy(); segmentPlayerRef.current = null; setSegmentStatus('loading'); };
  }, [track?.audioUrl]);

  // Sync slow mode
  useEffect(() => {
    segmentPlayerRef.current?.setPlaybackRate(slowMode ? 0.75 : 1.0);
  }, [slowMode]);

  // Scroll to active line
  useEffect(() => {
    if (selectedLineIndex !== null) {
      const el = lineCardRefs.current.get(selectedLineIndex);
      if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }, [selectedLineIndex]);

  // ── Playback ──

  const stopAll = useCallback(() => {
    if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
    segmentPlayerRef.current?.stop();
    setIsFullPlaying(false);
  }, []);

  // Full song playback via SegmentPlayer (plays 0 → end via very large endMs)
  const toggleFullPlay = useCallback(() => {
    const sp = segmentPlayerRef.current;
    if (!sp || !(segmentStatus === 'ready')) return;
    if (sp.isPlaying) {
      sp.stop();
      setIsFullPlaying(false);
      if (rafRef.current) { cancelAnimationFrame(rafRef.current); rafRef.current = null; }
      return;
    }
    setPlayError(null);
    // Play from 0 to a time far beyond the actual song length (audio ends naturally)
    sp.playSegment(0, 9999999, false, slowMode);
    setIsFullPlaying(true);
    // Start time-tracking RAF using actual audio currentTime
    const offset = timingOffset ?? 0;
    const tick = () => {
      if (!sp.isPlaying) { setIsFullPlaying(false); rafRef.current = null; return; }
      const elapsed = sp.currentTimeMs / 1000;
      setFullCurrentTime(elapsed);
      // Sync line using corrected timings (global offset + per-line calibration)
      const t = sp.currentTimeMs - offset;
      const idx = lyrics.findIndex((l, i) => {
        const correctedStart = l.startMs + (lineCalibrations[i]?.startOffsetMs ?? 0);
        const nextL = lyrics[i + 1];
        const correctedNextStart = nextL ? nextL.startMs + (lineCalibrations[i + 1]?.startOffsetMs ?? 0) : Infinity;
        return t >= correctedStart && t < correctedNextStart;
      });
      if (idx >= 0 && idx !== selectedLineIndex) setSelectedLineIndex(idx);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
  }, [slowMode, timingOffset, lyrics, selectedLineIndex, lineCalibrations]);

  const playLineOriginal = useCallback((lineIdx: number) => {
    const line = lyrics[lineIdx];
    if (!line) return;
    stopAll();
    setSelectedLineIndex(lineIdx);

    // Priority 1: per-line audio file
    if (line.lineAudioUrl) {
      new Audio(line.lineAudioUrl).play().catch(() => {});
      return;
    }

    // Priority 2: segment player from full audio
    const sp = segmentPlayerRef.current;
    if (!sp || !(segmentStatus === 'ready')) return;
    const offset = timingOffset ?? 0;
    const lineCal = lineCalibrations[lineIdx];
    const startMs = line.startMs + offset + (lineCal?.startOffsetMs ?? 0);
    const endMs = line.endMs + offset + (lineCal?.endOffsetMs ?? 0);
    sp.playSegment(startMs, endMs, false, slowMode);
  }, [lyrics, stopAll, timingOffset, slowMode, lineCalibrations, segmentStatus]);

  const playLineSpoken = useCallback((lineIdx: number) => {
    const sp = segmentPlayerRef.current;
    if (!sp || !(segmentStatus === 'ready')) return;
    const line = lyrics[lineIdx];
    if (!line) return;
    if (line.spokenAudioUrl) {
      // Play actual spoken audio if available
      stopAll();
      new Audio(line.spokenAudioUrl).play().catch(() => {});
      return;
    }
    // No spoken audio available — do nothing (button will show "读音暂缺")
  }, [lyrics, stopAll, (segmentStatus === 'ready')]);

  const goPrevLine = useCallback(() => {
    setSelectedLineIndex((prev) => {
      if (prev === null) return totalLines - 1;
      return Math.max(0, prev - 1);
    });
  }, [totalLines]);

  const goNextLine = useCallback(() => {
    setSelectedLineIndex((prev) => {
      if (prev === null) return 0;
      return Math.min(totalLines - 1, prev + 1);
    });
  }, [totalLines]);

  const openSingingMode = useCallback(() => {
    stopAll();
    setSingStartIndex(selectedLineIndex ?? 0);
    setShowSingingMode(true);
  }, [stopAll, selectedLineIndex]);

  // ── Not found ──
  if (!track) {
    return (
      <div className="flex items-center justify-center py-32">
        <div className="text-center space-y-3">
          <MusicIcon size={40} />
          <p className="text-[#89756e] text-[14px] font-bold">未找到该歌曲</p>
          <Link href="/korea/kpop" className="text-[13px] text-[#f0799b] hover:underline font-bold">返回 KPOP 歌词跟唱</Link>
        </div>
      </div>
    );
  }

  const level = LEVEL_CONFIG[track.level] ?? LEVEL_CONFIG.beginner;
  const thumbnailUrl = track.coverUrl || (oldSong ? `https://img.youtube.com/vi/${oldSong.videoId}/hqdefault.jpg` : '');
  const totalDurationSec = lyrics.length > 0 ? Math.max(...lyrics.map((l) => l.endMs)) / 1000 : 0;
  const progressPct = fullDuration > 0 ? (fullCurrentTime / fullDuration) * 100 : 0;

  return (
    <div style={{ paddingBottom: '100px' }}>
      {/* Word save toast */}
      {wordToast && (
        <div style={{ position: 'fixed', top: 60, left: '50%', transform: 'translateX(-50%)', background: '#201815', color: '#fff', borderRadius: 999, padding: '9px 20px', fontSize: 13, fontWeight: 700, zIndex: 300, whiteSpace: 'nowrap', boxShadow: '0 28px 72px rgba(78,52,46,.18)' }}>
          {wordToast}
        </div>
      )}
      {/* ── Back bar — matches demo exactly ── */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <Link
            href="/korea/kpop"
            style={{
              width: '38px', height: '38px', borderRadius: '16px',
              background: C.white, border: `1px solid ${C.line}`,
              boxShadow: '0 8px 20px rgba(78,52,46,.06)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '22px', color: '#4d3933', textDecoration: 'none',
            }}
          >
            ‹
          </Link>
          <div>
            <div style={{ fontSize: '17px', fontWeight: 1000, color: C.ink, lineHeight: 1.2 }}>{track.title}</div>
            <div style={{ marginTop: '2px', fontSize: '12px', color: C.muted, fontWeight: 800 }}>
              {track.artist} · 原唱音频 + 正常读音
            </div>
          </div>
        </div>
        {timingOffset != null ? (
          <span style={{
            display: 'inline-flex', alignItems: 'center', height: '30px', padding: '0 11px',
            borderRadius: '999px', background: C.pinkSoft, color: C.pinkText,
            fontSize: '11px', fontWeight: 1000, border: '1px solid rgba(255,127,168,.16)',
          }}>
            歌词已校准
          </span>
        ) : (
          <span style={{
            display: 'inline-flex', alignItems: 'center', height: '30px', padding: '0 11px',
            borderRadius: '999px', background: C.inputBg, color: C.muted,
            fontSize: '11px', fontWeight: 1000, border: `1px solid ${C.line}`,
          }}>
            歌词待校准
          </span>
        )}
      </div>

      {/* ── Song head card — matches demo exactly ── */}
      <div style={{
        borderRadius: '32px', overflow: 'hidden', background: C.white,
        border: `1px solid ${C.line}`, boxShadow: C.shadow2, marginBottom: '14px',
      }}>
        {/* Cover with pseudo-element equivalents */}
        <div style={{
          height: '142px', position: 'relative', overflow: 'hidden',
          background: 'radial-gradient(circle at 24% 26%, rgba(255,255,255,.42), transparent 24%), linear-gradient(135deg, #201815 0%, #4d3934 44%, #ff8daf 128%)',
        }}>
          {thumbnailUrl && (
            <img
              src={thumbnailUrl} alt={track.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.55, position: 'absolute', inset: 0 }}
              onError={(e) => { (e.target as HTMLImageElement).style.display = 'none'; }}
            />
          )}
          {/* :before equivalent — translucent circle */}
          <div style={{
            position: 'absolute', left: '26px', bottom: '-34px',
            width: '118px', height: '118px', borderRadius: '50%',
            background: 'rgba(255,255,255,.19)',
            border: '18px solid rgba(255,255,255,.23)',
            boxShadow: 'inset 0 0 0 16px rgba(32,24,21,.16)',
          }} />
          {/* :after equivalent — title text */}
          <div style={{
            position: 'absolute', right: '20px', bottom: '18px',
            color: 'rgba(255,255,255,.92)', fontSize: '26px',
            fontWeight: 1000, letterSpacing: '-1px',
          }}>
            {track.title}
          </div>
        </div>

        {/* Song info */}
        <div style={{ padding: '18px' }}>
          <h1 style={{ margin: 0, fontSize: '25px', lineHeight: 1.1, letterSpacing: '-.6px', fontWeight: 1000, color: C.ink }}>
            {track.title}
          </h1>
          <p style={{ margin: '7px 0 0', color: C.muted, fontSize: '13px' }}>
            {track.artist} · {level.label}偏中级 · {totalLines} 句 · {fmtTimestamp(totalDurationSec)}
          </p>

          {/* Tags */}
          <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginTop: '12px' }}>
            {['整首播放', '逐句原唱', '正常读音', '可保存'].map((tag) => (
              <span key={tag} style={{
                display: 'inline-flex', alignItems: 'center', height: '25px', padding: '0 8px',
                borderRadius: '999px', background: C.inputBg, border: `1px solid ${C.line}`,
                color: C.tagText, fontSize: '10px', fontWeight: 1000,
              }}>{tag}</span>
            ))}
          </div>

          {/* Full player */}
          <div style={{
            marginTop: '16px', borderRadius: '24px', padding: '14px',
            background: C.inputBg, border: `1px solid ${C.linePlayer}`,
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={toggleFullPlay}
                disabled={!(segmentStatus === 'ready')}
                style={{
                  width: '44px', height: '44px', border: 'none', borderRadius: '50%',
                  background: C.black, color: C.white, fontSize: '16px',
                  boxShadow: C.shadowPlayBtn, cursor: (segmentStatus === 'ready') ? 'pointer' : 'default',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  opacity: (segmentStatus === 'ready') ? 1 : 0.35,
                }}
              >
                {!(segmentStatus === 'ready') ? '…' : isFullPlaying ? <Pause size={16} /> : <Play size={16} style={{ marginLeft: '2px' }} />}
              </button>
              <div style={{ flex: 1, minWidth: 0 }}>
                <strong style={{ display: 'block', fontSize: '14px', color: C.ink }}>
                  {segmentStatus === 'loading' ? '音频加载中…' : segmentStatus === 'unavailable' ? '暂无音频' : isFullPlaying ? '正在播放' : '播放整首歌'}
                </strong>
                <span style={{ display: 'block', marginTop: '4px', color: C.muted, fontSize: '11px', fontWeight: 800 }}>
                  {fmtTimestamp(fullCurrentTime)} / {fmtTimestamp(fullDuration || totalDurationSec)}
                  {selectedLineIndex !== null ? ` · 当前第 ${selectedLineIndex + 1} 句` : ''}
                </span>
                {playError && (
                  <span style={{ display: 'block', marginTop: '2px', color: '#e88080', fontSize: '10px', fontWeight: 800 }}>{playError}</span>
                )}
              </div>
              <button
                onClick={() => setSlowMode(!slowMode)}
                style={{
                  height: '34px', border: `1px solid ${C.line}`, borderRadius: '999px',
                  padding: '0 11px', background: C.white, color: C.btnDarkText,
                  fontSize: '12px', fontWeight: 900, cursor: 'pointer',
                }}
              >
                {slowMode ? '0.75x' : '1.0x'}
              </button>
            </div>
            {/* Progress bar — draggable */}
            <input
              type="range"
              min={0}
              max={fullDuration || totalDurationSec || 100}
              step={0.5}
              value={fullCurrentTime}
              onChange={(e) => {
                const t = parseFloat(e.target.value);
                setFullCurrentTime(t);
                const sp = segmentPlayerRef.current;
                if (sp && isFullPlaying) sp.seekToMs(t * 1000);
              }}
              style={{
                width: '100%', height: '8px', borderRadius: '999px',
                appearance: 'none', WebkitAppearance: 'none',
                background: `linear-gradient(90deg, ${C.mint} ${Math.min(100, progressPct)}%, ${C.barBg} ${Math.min(100, progressPct)}%)`,
                cursor: 'pointer', marginTop: '12px', outline: 'none', border: 'none',
              }}
            />
          </div>
        </div>
      </div>

      {/* ── Section header — matches demo exactly ── */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', margin: '22px 2px 12px' }}>
        <h2 style={{ margin: 0, fontSize: '18px', letterSpacing: '-.3px', fontWeight: 1000, color: C.ink }}>
          逐句歌词学习卡
        </h2>
        <span style={{ fontSize: '12px', color: C.pinkText, fontWeight: 1000 }}>原唱 / 读音 / 中文</span>
      </div>

      {/* ── Line cards — matches demo exactly ── */}
      {lyrics.length === 0 ? (
        <div style={{
          borderRadius: '30px', background: C.white, border: `1px solid ${C.line}`,
          padding: '48px', textAlign: 'center', boxShadow: C.shadow,
        }}>
          <p style={{ fontSize: '14px', fontWeight: 800, color: C.muted }}>暂无歌词</p>
        </div>
      ) : (
        <div>
          {lyrics.map((line, i) => {
            const isActive = selectedLineIndex === i;
            const isCompleted = completedIndices.includes(i);
            const ov = lyricsOverrides[i];
            const displayKorean = ov?.korean ?? line.korean;
            const displayChinese = ov?.chinese ?? line.chinese;

            return (
              <article
                key={i}
                ref={(el) => { if (el) lineCardRefs.current.set(i, el); }}
                onClick={() => setSelectedLineIndex(i)}
                style={{
                  borderRadius: '30px', background: C.white,
                  border: isActive ? '1px solid rgba(255,127,168,.40)' : `1px solid ${C.line}`,
                  boxShadow: isActive ? C.shadowActive : C.shadow,
                  marginBottom: '12px', overflow: 'hidden', cursor: 'pointer',
                  transition: 'box-shadow 0.2s, border-color 0.2s',
                }}
              >
                {/* Line top */}
                <div style={{
                  display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                  gap: '10px', padding: '13px 15px 0',
                }}>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', height: '26px',
                    padding: '0 10px', borderRadius: '999px', background: C.black,
                    color: C.white, fontSize: '11px', fontWeight: 1000,
                  }}>
                    {String(i + 1).padStart(2, '0')} / {totalLines}{line.section ? ` · ${line.section}` : ''}
                  </span>
                  <span style={{
                    display: 'inline-flex', alignItems: 'center', height: '26px',
                    padding: '0 10px', borderRadius: '999px', fontSize: '11px', fontWeight: 1000,
                    ...(isCompleted
                      ? { background: C.mintBg, color: C.mintText }
                      : isActive
                        ? { background: C.pinkSoft, color: C.pinkText }
                        : { background: C.inputBg, color: C.muted }
                    ),
                  }}>
                    {isCompleted ? '已练习' : isActive ? '正在学习' : '未开始'}
                  </span>
                </div>

                {/* Line content */}
                <div style={{ padding: '14px 15px 15px' }}>
                  {/* Row 1: Korean + 原唱 */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px',
                    alignItems: 'start', padding: '12px 0',
                    borderBottom: `1px solid ${C.lineRow}`,
                  }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: C.pink, flexShrink: 0 }} />
                        <span style={{ color: C.rowLabel, fontSize: '11px', fontWeight: 1000 }}>韩文歌词</span>
                      </div>
                      <p style={{
                        fontSize: '20px', lineHeight: 1.38, fontWeight: 1000,
                        letterSpacing: '-.35px', color: C.ink, margin: 0, wordBreak: 'keep-all',
                      }}>
                        {displayKorean}
                      </p>
                    </div>
                    <button
                      onClick={(e) => { e.stopPropagation(); playLineOriginal(i); }}
                      disabled={!(segmentStatus === 'ready')}
                      style={{
                        height: '36px', minWidth: '58px', border: 'none', borderRadius: '999px',
                        background: C.black, color: C.white, fontSize: '12px', fontWeight: 1000,
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                        gap: '5px', cursor: (segmentStatus === 'ready') ? 'pointer' : 'default',
                        boxShadow: C.shadowAudioPill, opacity: (segmentStatus === 'ready') ? 1 : 0.35,
                      }}
                    >
                      🔊 原唱
                    </button>
                  </div>

                  {/* Row 2: Roman + 读音 */}
                  {line.pronunciation && (
                    <div style={{
                      display: 'grid', gridTemplateColumns: '1fr auto', gap: '12px',
                      alignItems: 'start', padding: '12px 0',
                      borderBottom: `1px solid ${C.lineRow}`,
                    }}>
                      <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
                          <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: '#68c7b8', flexShrink: 0 }} />
                          <span style={{ color: C.rowLabel, fontSize: '11px', fontWeight: 1000 }}>罗马音 / 正常读法</span>
                        </div>
                        <p style={{
                          fontSize: '14px', lineHeight: 1.52, color: C.roman,
                          fontWeight: 800, margin: 0,
                        }}>
                          {line.pronunciation}
                        </p>
                      </div>
                      {line.spokenAudioUrl && (
                      <button
                        onClick={(e) => { e.stopPropagation(); playLineSpoken(i); }}
                        style={{
                          height: '36px', minWidth: '58px', border: 'rgba(255,127,168,.18)',
                          borderRadius: '999px', background: C.pinkSoft, color: C.pinkText,
                          fontSize: '12px', fontWeight: 1000, cursor: 'pointer',
                          display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                          gap: '5px',
                        }}
                      >
                        🔈 读音
                      </button>
                      )}
                    </div>
                  )}

                  {/* Row 3: Chinese */}
                  {displayChinese && (
                    <div style={{
                      padding: '12px 0',
                      borderBottom: line.keywords && line.keywords.length > 0 ? `1px solid ${C.lineRow}` : 'none',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '7px', marginBottom: '6px' }}>
                        <span style={{ width: '7px', height: '7px', borderRadius: '50%', background: C.pink, flexShrink: 0 }} />
                        <span style={{ color: C.rowLabel, fontSize: '11px', fontWeight: 1000 }}>中文意思</span>
                      </div>
                      <p style={{ fontSize: '14px', lineHeight: 1.58, color: C.chinese, margin: 0 }}>
                        {displayChinese}
                      </p>
                    </div>
                  )}

                  {/* Keywords strip */}
                  {line.keywords && line.keywords.length > 0 && (
                    <div style={{ display: 'flex', gap: '7px', flexWrap: 'wrap', marginTop: '12px' }}>
                      {line.keywords.map((kw, ki) => (
                        <span key={ki} style={{
                          display: 'inline-flex', alignItems: 'center', height: '26px',
                          padding: '0 9px', borderRadius: '999px', background: C.inputBg,
                          border: `1px solid ${C.line}`, color: C.btnLight,
                          fontSize: '11px', fontWeight: 900,
                        }}>
                          {kw.korean}：{kw.meaning}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Expression note */}
                  {line.expressionNote && (
                    <p style={{
                      fontSize: '11px', color: C.muted, opacity: 0.6,
                      fontStyle: 'italic', lineHeight: 1.6, marginTop: '8px', marginBottom: 0,
                    }}>
                      {line.expressionNote}
                    </p>
                  )}

                  {/* Action buttons */}
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '13px',
                  }}>
                    <SaveSentenceButton
                      songId={track.id} lineIndex={i}
                      korean={displayKorean} chinese={displayChinese}
                      title={track.title} artist={track.artist}
                    />
                    <button
                      onClick={(e) => handleSaveWord(e, displayKorean, displayChinese)}
                      style={{
                        height: '40px', borderRadius: '999px', cursor: 'pointer',
                        background: savedWords.has(displayKorean) ? '#eaf8f5' : C.white,
                        color: savedWords.has(displayKorean) ? '#4e746d' : C.btnDarkText,
                        border: `1px solid ${savedWords.has(displayKorean) ? '#aee3d8' : C.line}`,
                        fontSize: '12px', fontWeight: 1000,
                      }}
                    >
                      {savedWords.has(displayKorean) ? '✓ 已保存' : '保存单词'}
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* ── Learning section ── */}
      {oldSong?.learning && <KpopLearningSection learning={oldSong.learning} color={track.color} />}

      {/* ── Bottom fixed bar — matches demo exactly ── */}
      <div style={{
        position: 'fixed', left: 0, right: 0, bottom: 'calc(56px + env(safe-area-inset-bottom, 0px))', height: '88px',
        padding: '12px 18px 16px',
        background: 'rgba(255,255,255,.92)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderTop: `1px solid ${C.line}`,
        zIndex: 20,
      }}>
        <div style={{
          height: '100%', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px',
          maxWidth: '430px', margin: '0 auto',
        }}>
          <button
            onClick={goPrevLine}
            style={{
              border: `1px solid ${C.line}`, borderRadius: '20px',
              background: C.inputBg, color: C.btnLight,
              fontSize: '12px', fontWeight: 1000, cursor: 'pointer',
            }}
          >
            上一句
          </button>
          <button
            onClick={openSingingMode}
            style={{
              border: 'none', borderRadius: '20px',
              background: C.black, color: C.white,
              fontSize: '12px', fontWeight: 1000, cursor: 'pointer',
            }}
          >
            跟唱录音
          </button>
          <button
            onClick={goNextLine}
            style={{
              border: `1px solid ${C.line}`, borderRadius: '20px',
              background: C.inputBg, color: C.btnLight,
              fontSize: '12px', fontWeight: 1000, cursor: 'pointer',
            }}
          >
            下一句
          </button>
        </div>
      </div>

      {/* ── SingingMode overlay ── */}
      {showSingingMode && (
        <SingingMode
          song={timingOffset != null ? { ...track, timingOffsetMs: timingOffset, timingVerified: true } : track}
          startIndex={singStartIndex}
          audioUrl={track.audioUrl}
          onClose={async () => {
            setShowSingingMode(false);
            const p = (await loadSongProgress(id)) ?? getSongProgress(id);
            if (p) setCompletedIndices(p.completedLineIndices);
          }}
        />
      )}
    </div>
  );
}

// ── Save sentence button (with state) ──
function SaveSentenceButton({ songId, lineIndex, korean, chinese, title, artist }: {
  songId: string; lineIndex: number; korean: string; chinese: string; title: string; artist: string;
}) {
  const [saved, setSaved] = useState(false);

  const save = useCallback(async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (saved) return;
    try {
      const { db } = await import('@/lib/db');
      await db.sentences.put({
        id: `kpop-${songId}-line-${lineIndex}`,
        korean,
        chinese,
        source: `${title} - ${artist}`,
        sourceType: 'kpop',
        sourceId: songId,
        createdAt: Date.now(),
      });
      setSaved(true);
    } catch { /* duplicate */ }
  }, [songId, lineIndex, korean, chinese, title, artist, saved]);

  return (
    <button
      onClick={save}
      disabled={saved}
      style={{
        height: '40px', borderRadius: '999px', cursor: saved ? 'default' : 'pointer',
        fontSize: '12px', fontWeight: 1000,
        background: saved ? C.inputBg : C.black,
        color: saved ? C.muted : C.white,
        border: saved ? `1px solid ${C.line}` : `1px solid ${C.black}`,
        opacity: saved ? 0.4 : 1,
      }}
    >
      {saved ? '已保存' : '保存句子'}
    </button>
  );
}

// ── Music icon ──
function MusicIcon({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'rgba(137,117,110,0.3)' }}>
      <path d="M9 18V5l12-2v13" /><circle cx="6" cy="18" r="3" /><circle cx="18" cy="16" r="3" />
    </svg>
  );
}

// ── Learning section ──
function KpopLearningSection({ learning, color }: { learning: import('@/types').KpopLearning; color: string }) {
  const [expanded, setExpanded] = useState(true);
  return (
    <div style={{
      background: C.white, border: `1px solid ${C.line}`,
      borderRadius: '30px', overflow: 'hidden',
      boxShadow: '0 6px 20px rgba(78,52,46,0.05)', marginTop: '16px',
    }}>
      <button
        onClick={() => setExpanded(!expanded)}
        style={{
          width: '100%', display: 'flex', alignItems: 'center', gap: '8px',
          padding: '16px 20px', background: 'none', border: 'none',
          cursor: 'pointer', font: 'inherit',
        }}
      >
        <BookOpen size={16} style={{ color: C.pinkText }} />
        <span style={{ fontWeight: 1000, color: C.ink, fontSize: '15px' }}>这首歌学什么？</span>
        <ChevronDown size={16} style={{
          marginLeft: 'auto', color: 'rgba(137,117,110,0.3)',
          transform: expanded ? '' : 'rotate(-90deg)', transition: 'transform 0.2s',
        }} />
      </button>
      {expanded && (
        <div style={{ padding: '0 20px 20px' }}>
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 1000, color: C.muted, marginBottom: '8px' }}>高频词</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              {learning.highFreqWords.map((w) => (
                <div key={w.korean} style={{
                  background: C.inputBg, borderRadius: '16px', padding: '12px',
                  border: `1px solid rgba(239,224,217,.5)`,
                }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 1000, color: C.ink, marginBottom: '2px' }}>{w.korean}</div>
                  <div style={{ fontSize: '10px', color: C.muted }}>{w.pronunciation}</div>
                  <div style={{ fontSize: '12px', color: '#7e6b64', marginTop: '2px' }}>{w.chinese}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(137,117,110,0.5)', marginTop: '4px', fontStyle: 'italic' }}>"{w.source}"</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 1000, color: C.muted, marginBottom: '8px' }}>情绪表达</h4>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
              {learning.emotionExpressions.map((e) => (
                <div key={e.korean} style={{
                  background: C.inputBg, borderRadius: '16px', padding: '12px',
                  border: `1px solid rgba(239,224,217,.5)`,
                }}>
                  <div style={{ fontSize: '0.875rem', fontWeight: 1000, color: C.ink, marginBottom: '2px' }}>{e.korean}</div>
                  <div style={{ fontSize: '10px', color: C.muted }}>{e.pronunciation}</div>
                  <div style={{ fontSize: '12px', color: '#7e6b64', marginTop: '2px' }}>{e.chinese}</div>
                  <div style={{ fontSize: '10px', color: 'rgba(137,117,110,0.5)', marginTop: '4px' }}>{e.context}</div>
                </div>
              ))}
            </div>
          </div>
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{ fontSize: '11px', fontWeight: 1000, color: C.muted, marginBottom: '8px' }}>语法结构</h4>
            <div style={{
              background: C.inputBg, borderRadius: '16px', padding: '16px',
              border: `1px solid rgba(239,224,217,.5)`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{
                  fontSize: '12px', fontWeight: 1000, padding: '4px 10px',
                  borderRadius: '999px', color: C.white, background: color,
                }}>{learning.grammarPoint.name}</span>
                <span style={{ fontSize: '11px', color: C.muted, fontFamily: 'monospace', fontWeight: 800 }}>{learning.grammarPoint.pattern}</span>
              </div>
              <p style={{ fontSize: '12px', color: '#7e6b64', marginTop: '8px' }}>{learning.grammarPoint.explanation}</p>
              <div style={{
                background: C.white, borderRadius: '12px', padding: '12px',
                border: `1px solid rgba(239,224,217,.5)`, marginTop: '8px',
              }}>
                <p style={{ fontSize: '0.875rem', fontWeight: 1000, color: C.ink, margin: 0 }}>{learning.grammarPoint.example}</p>
                <p style={{ fontSize: '11px', color: '#7e6b64', marginTop: '2px' }}>{learning.grammarPoint.exampleZh}</p>
              </div>
            </div>
          </div>
          <div>
            <h4 style={{ fontSize: '11px', fontWeight: 1000, color: C.muted, marginBottom: '8px' }}>日常可用表达</h4>
            <div style={{
              background: `linear-gradient(to right, rgba(255,127,168,.05), rgba(174,227,216,.1))`,
              borderRadius: '16px', padding: '16px', border: `1px solid ${C.line}`,
            }}>
              <div style={{ fontSize: '1rem', fontWeight: 1000, color: C.ink, marginBottom: '4px' }}>{learning.dailyExpression.korean}</div>
              <div style={{ fontSize: '11px', color: C.muted, marginBottom: '4px' }}>{learning.dailyExpression.pronunciation}</div>
              <div style={{ fontSize: '0.875rem', color: '#7e6b64', marginBottom: '8px' }}>{learning.dailyExpression.chinese}</div>
              <div style={{ fontSize: '11px', color: C.muted, lineHeight: 1.6 }}>
                <span style={{ opacity: 0.5 }}>用法：</span>{learning.dailyExpression.usage}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
