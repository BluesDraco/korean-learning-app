'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import {
  Music, Play, Pause, Save, ChevronLeft, ChevronRight,
  CheckCircle, List, Edit2, X, Check, Radio, Stamp,
} from 'lucide-react';
import { kpopSongs } from '@/data/kpopSongs';
import { SegmentPlayer } from '@/lib/kpop/audioSegmentPlayer';

// ── Types ─────────────────────────────────────────────────────────────────────

interface CalibrationRecord {
  songId: string;
  timingOffsetMs: number;
  timingVerified: boolean;
  timingSource: string;
}

interface LineCalibration {
  songId: string;
  lineIndex: number;
  startOffsetMs: number;
  endOffsetMs: number;
  updatedAt: number;
}

interface LyricsOverride {
  songId: string;
  lineIndex: number;
  korean: string;
  chinese: string;
  updatedAt: number;
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function fmtMs(ms: number) {
  const s = ms / 1000;
  const m = Math.floor(s / 60);
  const sec = (s % 60).toFixed(2).padStart(5, '0');
  return `${m}:${sec}`;
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function KpopCalibrationPage() {
  const [calibrations, setCalibrations] = useState<Record<string, CalibrationRecord>>({});
  const [lineCals, setLineCals] = useState<Record<string, Record<number, LineCalibration>>>({});
  const [lyricsOverrides, setLyricsOverrides] = useState<Record<string, Record<number, LyricsOverride>>>({});
  const [selectedSongId, setSelectedSongId] = useState(kpopSongs[0]?.id ?? '');
  const [offset, setOffset] = useState(0);
  const [inputOffset, setInputOffset] = useState('0');
  const [playing, setPlaying] = useState(false);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [lineIdx, setLineIdx] = useState(0);
  const [audioStatus, setAudioStatus] = useState<'idle' | 'loading' | 'ready' | 'error'>('idle');
  const [savingLineIdx, setSavingLineIdx] = useState<number | null>(null);
  const [showLineCal, setShowLineCal] = useState(false);
  const [currentTimeMs, setCurrentTimeMs] = useState(0);

  // ── Lyrics editing ──
  const [editingLineIdx, setEditingLineIdx] = useState<number | null>(null);
  const [editKorean, setEditKorean] = useState('');
  const [editChinese, setEditChinese] = useState('');
  const [savingLyricsIdx, setSavingLyricsIdx] = useState<number | null>(null);

  // ── Live-mark mode ──
  // In this mode: full song plays; each SPACE keypress stamps currentTime as
  // the startMs for the current line and advances to the next line.
  const [markMode, setMarkMode] = useState(false);
  const [markLineIdx, setMarkLineIdx] = useState(0);
  const [markedTimes, setMarkedTimes] = useState<number[]>([]); // absolute ms per line
  const [savingMarks, setSavingMarks] = useState(false);
  const [markSaved, setMarkSaved] = useState(false);
  const markModeRef = useRef(false);
  markModeRef.current = markMode;

  const spRef = useRef<SegmentPlayer | null>(null);
  const rafRef = useRef<number | null>(null);
  const lineListRef = useRef<HTMLDivElement | null>(null);

  const song = kpopSongs.find((s) => s.id === selectedSongId);
  const audioUrl = song
    ? `https://torikorean-1436752408.cos.ap-hongkong.myqcloud.com/audio/kpop/${song.videoId}.webm`
    : '';
  const currentLineCals = lineCals[selectedSongId] ?? {};
  const currentOverrides = lyricsOverrides[selectedSongId] ?? {};

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const getEffectiveLyrics = (idx: number) => {
    const orig = song?.lyrics[idx];
    if (!orig) return { korean: '', chinese: '' };
    const ov = currentOverrides[idx];
    return { korean: ov?.korean ?? orig.korean, chinese: ov?.chinese ?? orig.chinese };
  };

  const getEffectiveTiming = useCallback((idx: number) => {
    const l = song?.lyrics[idx];
    if (!l) return { startMs: 0, endMs: 0 };
    const cal = currentLineCals[idx];
    return {
      startMs: l.start * 1000 + offset + (cal?.startOffsetMs ?? 0),
      endMs: l.end * 1000 + offset + (cal?.endOffsetMs ?? 0),
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song, offset, currentLineCals]);

  // ── Data loading ─────────────────────────────────────────────────────────────

  useEffect(() => {
    fetch('/api/kpop/calibration')
      .then((r) => r.json())
      .then((rows: CalibrationRecord[]) => {
        const map: Record<string, CalibrationRecord> = {};
        rows.forEach((r) => { map[r.songId] = r; });
        setCalibrations(map);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    if (!selectedSongId) return;
    fetch(`/api/kpop/calibration/line?songId=${selectedSongId}`)
      .then((r) => r.json())
      .then((rows: LineCalibration[]) => {
        setLineCals((prev) => {
          const map: Record<number, LineCalibration> = {};
          rows.forEach((r) => { map[r.lineIndex] = r; });
          return { ...prev, [selectedSongId]: map };
        });
      })
      .catch(() => {});

    fetch(`/api/kpop/lyrics-override?songId=${selectedSongId}`)
      .then((r) => r.json())
      .then((rows: LyricsOverride[]) => {
        setLyricsOverrides((prev) => {
          const map: Record<number, LyricsOverride> = {};
          rows.forEach((r) => { map[r.lineIndex] = r; });
          return { ...prev, [selectedSongId]: map };
        });
      })
      .catch(() => {});
  }, [selectedSongId]);

  // ── Audio init ───────────────────────────────────────────────────────────────

  useEffect(() => {
    if (!audioUrl) return;
    setAudioStatus('loading');
    setPlaying(false);
    setLineIdx(0);
    setEditingLineIdx(null);
    setMarkMode(false);

    const sp = new SegmentPlayer({
      onStateChange: (s) => {
        if (s === 'ready') setAudioStatus('ready');
        if (s === 'error') setAudioStatus('error');
        setPlaying(s === 'playing');
      },
    });
    spRef.current = sp;
    sp.load(audioUrl).catch(() => setAudioStatus('error'));

    const existing = calibrations[selectedSongId];
    const ms = existing?.timingOffsetMs ?? 0;
    setOffset(ms);
    setInputOffset(String(ms));

    return () => {
      sp.destroy();
      spRef.current = null;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedSongId, audioUrl]);

  // ── RAF for current time display ─────────────────────────────────────────────

  useEffect(() => {
    const tick = () => {
      setCurrentTimeMs(spRef.current?.currentTimeMs ?? 0);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current); };
  }, []);

  // ── Auto-scroll line list in mark mode ───────────────────────────────────────

  useEffect(() => {
    if (!markMode) return;
    const el = lineListRef.current?.querySelector(`[data-mark-idx="${markLineIdx}"]`);
    el?.scrollIntoView({ block: 'center', behavior: 'smooth' });
  }, [markLineIdx, markMode]);

  // ── Space key handler for mark mode ──────────────────────────────────────────

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (!markModeRef.current) return;
      if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        stampCurrentLine();
      }
      if (e.key === 'Escape') {
        exitMarkMode();
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ── Mark mode actions ─────────────────────────────────────────────────────────

  const enterMarkMode = useCallback(() => {
    const sp = spRef.current;
    if (!sp || audioStatus !== 'ready' || !song) return;
    setMarkMode(true);
    setMarkLineIdx(0);
    setMarkedTimes([]);
    setMarkSaved(false);
    sp.playFrom(0);
  }, [audioStatus, song]);

  const exitMarkMode = useCallback(() => {
    setMarkMode(false);
    spRef.current?.stop();
  }, []);

  const stampCurrentLine = useCallback(() => {
    const sp = spRef.current;
    if (!sp || !song) return;
    const t = sp.currentTimeMs;
    setMarkedTimes((prev) => {
      const next = [...prev];
      next[markLineIdx] = t;
      return next;
    });
    setMarkLineIdx((i) => Math.min(i + 1, song.lyrics.length - 1));
  }, [markLineIdx, song]);

  const undoLastMark = useCallback(() => {
    setMarkLineIdx((i) => Math.max(0, i - 1));
    setMarkedTimes((prev) => {
      const next = [...prev];
      next.splice(Math.max(0, prev.length - 1), 1);
      return next;
    });
  }, []);

  // Save marked timestamps: convert absolute → offset relative to original startMs
  const saveMarkedTimes = useCallback(async () => {
    if (!song || markedTimes.length === 0) return;
    setSavingMarks(true);
    try {
      const promises = markedTimes.map((absMs, i) => {
        if (absMs == null) return Promise.resolve();
        const orig = song.lyrics[i];
        if (!orig) return Promise.resolve();
        const origStartMs = orig.start * 1000;
        // end = next line's start - 200ms, or orig end if last line
        const nextOrigStart = song.lyrics[i + 1]
          ? song.lyrics[i + 1].start * 1000
          : orig.end * 1000;
        const newEndMs = nextOrigStart - 200;
        const startOffsetMs = absMs - origStartMs;
        const endOffsetMs = newEndMs - orig.end * 1000;
        return fetch('/api/kpop/calibration/line', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            songId: selectedSongId,
            lineIndex: i,
            startOffsetMs,
            endOffsetMs,
          }),
        });
      });
      await Promise.all(promises);

      // Reload line cals
      const rows: LineCalibration[] = await fetch(
        `/api/kpop/calibration/line?songId=${selectedSongId}`
      ).then((r) => r.json());
      setLineCals((prev) => {
        const map: Record<number, LineCalibration> = {};
        rows.forEach((r) => { map[r.lineIndex] = r; });
        return { ...prev, [selectedSongId]: map };
      });

      setMarkSaved(true);
      setTimeout(() => setMarkSaved(false), 3000);
    } finally {
      setSavingMarks(false);
    }
  }, [song, markedTimes, selectedSongId]);

  // ── Single-line actions ───────────────────────────────────────────────────────

  const line = song?.lyrics[lineIdx];

  const playLine = useCallback(() => {
    const sp = spRef.current;
    if (!sp || !line) return;
    if (playing) { sp.stop(); return; }
    const { startMs, endMs } = getEffectiveTiming(lineIdx);
    sp.playSegment(startMs, endMs, false, false);
  }, [playing, line, lineIdx, getEffectiveTiming]);

  const applyOffset = (ms: number) => {
    setOffset(ms);
    setInputOffset(String(ms));
    setSaved(false);
  };

  const saveCalibration = async () => {
    if (!song) return;
    setSaving(true);
    try {
      await fetch('/api/kpop/calibration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId: song.id, timingOffsetMs: offset, timingVerified: true }),
      });
      setCalibrations((prev) => ({
        ...prev,
        [song.id]: { songId: song.id, timingOffsetMs: offset, timingVerified: true, timingSource: 'manual' },
      }));
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    } finally {
      setSaving(false);
    }
  };

  const saveLineCalibration = async (idx: number, cal: LineCalibration) => {
    setSavingLineIdx(idx);
    try {
      await fetch('/api/kpop/calibration/line', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          songId: selectedSongId,
          lineIndex: idx,
          startOffsetMs: cal.startOffsetMs,
          endOffsetMs: cal.endOffsetMs,
        }),
      });
      setLineCals((prev) => ({
        ...prev,
        [selectedSongId]: { ...prev[selectedSongId], [idx]: cal },
      }));
    } finally {
      setSavingLineIdx(null);
    }
  };

  // ── Lyrics editing ────────────────────────────────────────────────────────────

  const startEditLyrics = (idx: number) => {
    const { korean, chinese } = getEffectiveLyrics(idx);
    setEditingLineIdx(idx);
    setEditKorean(korean);
    setEditChinese(chinese);
  };

  const cancelEditLyrics = () => { setEditingLineIdx(null); setEditKorean(''); setEditChinese(''); };

  const saveLyricsOverride = async (idx: number) => {
    setSavingLyricsIdx(idx);
    try {
      await fetch('/api/kpop/lyrics-override', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId: selectedSongId, lineIndex: idx, korean: editKorean, chinese: editChinese }),
      });
      const override: LyricsOverride = {
        songId: selectedSongId, lineIndex: idx,
        korean: editKorean, chinese: editChinese, updatedAt: Date.now(),
      };
      setLyricsOverrides((prev) => ({
        ...prev, [selectedSongId]: { ...prev[selectedSongId], [idx]: override },
      }));
      setEditingLineIdx(null);
    } finally {
      setSavingLyricsIdx(null);
    }
  };

  const deleteLyricsOverride = async (idx: number) => {
    try {
      await fetch(`/api/kpop/lyrics-override?songId=${selectedSongId}&lineIndex=${idx}`, { method: 'DELETE' });
      setLyricsOverrides((prev) => {
        const next = { ...prev[selectedSongId] };
        delete next[idx];
        return { ...prev, [selectedSongId]: next };
      });
    } catch {}
  };

  const verifiedCount = Object.values(calibrations).filter((c) => c.timingVerified).length;

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
            <Music size={22} className="text-[var(--pink-primary)]" />
            KPOP 时间轴校准
          </h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            实时标记模式：播放歌曲，在每句歌词开始时按空格键自动打点 · 也支持全局偏移 + 逐句微调
          </p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-[var(--pink-primary)]">{verifiedCount}</p>
          <p className="text-xs text-[var(--text-muted)]">已校准 / {kpopSongs.length} 首</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
        {/* Song list */}
        <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
          <div className="px-4 py-3 border-b border-[var(--border-color)]">
            <p className="text-sm font-semibold text-[var(--text-primary)]">歌曲列表</p>
          </div>
          <div className="overflow-y-auto max-h-[600px]">
            {kpopSongs.map((s) => {
              const cal = calibrations[s.id];
              const lineCalCount = Object.keys(lineCals[s.id] ?? {}).length;
              const overrideCount = Object.keys(lyricsOverrides[s.id] ?? {}).length;
              const isSelected = s.id === selectedSongId;
              return (
                <button
                  key={s.id}
                  onClick={() => { if (!markMode) setSelectedSongId(s.id); }}
                  className={`w-full text-left px-4 py-3 border-b border-[var(--border-color)] last:border-0 transition-colors flex items-center gap-3 ${
                    isSelected ? 'bg-[var(--pink-pale)]/30' : 'hover:bg-[var(--bg-soft)]'
                  } ${markMode ? 'opacity-40 pointer-events-none' : ''}`}
                >
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium truncate ${isSelected ? 'text-[var(--pink-primary)]' : 'text-[var(--text-primary)]'}`}>
                      {s.title}
                    </p>
                    <p className="text-xs text-[var(--text-muted)] truncate">{s.artist}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-1">
                    {cal?.timingVerified && (
                      <span className={`text-xs font-mono ${cal.timingOffsetMs !== 0 ? 'text-green-600' : 'text-blue-500'}`}>
                        {lineCalCount > 0 ? `${lineCalCount}句` : `${cal.timingOffsetMs > 0 ? '+' : ''}${cal.timingOffsetMs}ms`}
                      </span>
                    )}
                    {overrideCount > 0 && (
                      <span className="text-xs text-orange-500 font-medium">{overrideCount}改</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Right panel */}
        <div className="space-y-4">
          {song ? (
            <>
              {/* Song info + audio status */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">{song.title}</h2>
                    <p className="text-sm text-[var(--text-muted)]">{song.artist} · {song.lyrics.length} 句歌词</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-[var(--text-muted)]">{fmtMs(currentTimeMs)}</span>
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${
                      audioStatus === 'ready' ? 'bg-green-100 text-green-700' :
                      audioStatus === 'loading' ? 'bg-yellow-100 text-yellow-700' :
                      audioStatus === 'error' ? 'bg-red-100 text-red-700' :
                      'bg-gray-100 text-gray-500'
                    }`}>
                      {audioStatus === 'ready' ? '音频就绪' :
                       audioStatus === 'loading' ? '加载中...' :
                       audioStatus === 'error' ? '音频缺失' : '未加载'}
                    </span>
                  </div>
                </div>
              </div>

              {/* ── LIVE MARK MODE PANEL ── */}
              <div className={`rounded-2xl border-2 overflow-hidden transition-colors ${
                markMode
                  ? 'border-[var(--pink-primary)] bg-[var(--pink-pale)]/10'
                  : 'border-[var(--border-color)] bg-[var(--bg-card)]'
              }`}>
                <div className="px-5 py-4 border-b border-[var(--border-color)] flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Radio size={16} className={markMode ? 'text-[var(--pink-primary)] animate-pulse' : 'text-[var(--text-muted)]'} />
                    <p className="text-sm font-semibold text-[var(--text-primary)]">
                      实时标记模式
                      {markMode && <span className="ml-2 text-xs font-normal text-[var(--pink-primary)]">进行中 — 按 Space 打点 · Esc 退出</span>}
                    </p>
                  </div>
                  {!markMode ? (
                    <button
                      onClick={enterMarkMode}
                      disabled={audioStatus !== 'ready'}
                      className="flex items-center gap-1.5 px-4 py-2 rounded-xl bg-[var(--pink-primary)] text-white text-sm font-bold hover:opacity-90 disabled:opacity-40 transition-all"
                    >
                      <Play size={14} />
                      开始标记
                    </button>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={undoLastMark}
                        disabled={markLineIdx === 0}
                        className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30"
                      >
                        ← 撤销
                      </button>
                      <button
                        onClick={exitMarkMode}
                        className="px-3 py-1.5 rounded-xl border border-red-200 bg-red-50 text-red-500 text-xs hover:bg-red-100"
                      >
                        <X size={12} className="inline mr-1" />
                        退出
                      </button>
                    </div>
                  )}
                </div>

                {markMode ? (
                  <div className="p-5 space-y-4">
                    {/* Current line to stamp */}
                    <div className="bg-[var(--pink-primary)]/10 rounded-xl p-4 border border-[var(--pink-primary)]/30">
                      <p className="text-xs text-[var(--pink-primary)] font-semibold mb-1">
                        第 {markLineIdx + 1} / {song.lyrics.length} 句 — 听到这句开始时按空格 ▾
                      </p>
                      <p className="text-xl font-bold text-[var(--text-primary)]">
                        {getEffectiveLyrics(markLineIdx).korean}
                      </p>
                      <p className="text-sm text-[var(--text-muted)] mt-0.5">
                        {getEffectiveLyrics(markLineIdx).chinese}
                      </p>
                      <p className="text-xs font-mono text-[var(--text-muted)]/60 mt-2">
                        原始: {fmtMs(song.lyrics[markLineIdx].start * 1000)} →
                        已标记: {markedTimes[markLineIdx] != null ? fmtMs(markedTimes[markLineIdx]) : '—'}
                      </p>
                    </div>

                    {/* Stamp button (touch-friendly) */}
                    <button
                      onClick={stampCurrentLine}
                      className="w-full h-16 rounded-xl bg-[var(--pink-primary)] text-white text-lg font-bold flex items-center justify-center gap-3 active:scale-[0.98] transition-transform shadow-md"
                    >
                      <Stamp size={22} />
                      打点（Space）
                    </button>

                    {/* Progress */}
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-[var(--bg-soft)] rounded-full overflow-hidden">
                        <div
                          className="h-full bg-[var(--pink-primary)] rounded-full transition-all"
                          style={{ width: `${(markedTimes.length / song.lyrics.length) * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono text-[var(--text-muted)]">
                        {markedTimes.length} / {song.lyrics.length}
                      </span>
                    </div>

                    {/* Line preview list */}
                    <div ref={lineListRef} className="overflow-y-auto max-h-48 space-y-1 rounded-xl border border-[var(--border-color)] p-2">
                      {song.lyrics.map((l, i) => (
                        <div
                          key={i}
                          data-mark-idx={i}
                          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs transition-colors ${
                            i === markLineIdx
                              ? 'bg-[var(--pink-primary)] text-white'
                              : markedTimes[i] != null
                              ? 'bg-green-50 text-green-700'
                              : 'text-[var(--text-muted)]'
                          }`}
                        >
                          <span className="font-mono w-10 shrink-0">
                            {markedTimes[i] != null ? fmtMs(markedTimes[i]) : `${i + 1}.`}
                          </span>
                          <span className="truncate">{getEffectiveLyrics(i).korean}</span>
                        </div>
                      ))}
                    </div>

                    {/* Save marks */}
                    {markedTimes.length > 0 && (
                      <button
                        onClick={saveMarkedTimes}
                        disabled={savingMarks}
                        className={`w-full py-3 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
                          markSaved
                            ? 'bg-green-500 text-white'
                            : 'bg-[var(--text-primary)] text-white hover:opacity-90'
                        } disabled:opacity-50`}
                      >
                        {markSaved ? <CheckCircle size={16} /> : <Save size={16} />}
                        {savingMarks ? '保存中...' : markSaved
                          ? `已保存 ${markedTimes.length} 句时间戳`
                          : `保存 ${markedTimes.length} 句打点`}
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="px-5 py-4 text-xs text-[var(--text-muted)] space-y-1">
                    <p>① 点击「开始标记」，歌曲从头播放</p>
                    <p>② 听到每句歌词开始时，按 <kbd className="px-1.5 py-0.5 rounded bg-[var(--bg-soft)] border border-[var(--border-color)] font-mono text-[11px]">Space</kbd> 打点</p>
                    <p>③ 打完所有句子后，点「保存打点」覆盖旧时间戳</p>
                    <p className="text-[var(--text-muted)]/60">打错了可以按「撤销」退回上一句重打</p>
                  </div>
                )}
              </div>

              {/* Single-line player */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-4">
                <p className="text-sm font-semibold text-[var(--text-primary)]">逐句试听</p>

                {line && (
                  <div className="bg-[var(--bg-soft)] rounded-xl p-4 space-y-1">
                    {(() => {
                      const { korean, chinese } = getEffectiveLyrics(lineIdx);
                      const hasOverride = !!currentOverrides[lineIdx];
                      return (
                        <>
                          <p className="text-xl font-bold text-[var(--text-primary)]">
                            {korean}
                            {hasOverride && <span className="ml-2 text-xs font-normal text-orange-500">已修改</span>}
                          </p>
                          <p className="text-sm text-[var(--text-muted)]">{chinese}</p>
                        </>
                      );
                    })()}
                    {(() => {
                      const { startMs, endMs } = getEffectiveTiming(lineIdx);
                      const hasLineCal = currentLineCals[lineIdx];
                      return (
                        <p className="text-xs text-[var(--text-muted)]/60 font-mono mt-2">
                          原始: {fmtMs(line.start * 1000)} – {fmtMs(line.end * 1000)}
                          {offset !== 0 && (
                            <span className="ml-2 text-[var(--pink-primary)]">
                              偏移后: {fmtMs(line.start * 1000 + offset)} – {fmtMs(line.end * 1000 + offset)}
                            </span>
                          )}
                          {hasLineCal && (
                            <span className="ml-2 text-blue-500">
                              最终: {fmtMs(startMs)} – {fmtMs(endMs)}
                            </span>
                          )}
                        </p>
                      );
                    })()}
                  </div>
                )}

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setLineIdx((i) => Math.max(0, i - 1))}
                    disabled={lineIdx === 0}
                    className="p-2 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={playLine}
                    disabled={audioStatus !== 'ready' || markMode}
                    className={`flex-1 flex items-center justify-center gap-2 h-11 rounded-xl font-medium text-sm transition-all ${
                      playing
                        ? 'bg-[var(--pink-primary)] text-white'
                        : 'bg-[var(--bg-soft)] border border-[var(--border-color)] text-[var(--text-primary)] hover:border-[var(--pink-primary)]/40'
                    } disabled:opacity-40`}
                  >
                    {playing ? <Pause size={16} /> : <Play size={16} />}
                    {playing ? '停止' : `播放第 ${lineIdx + 1} 句`}
                  </button>
                  <button
                    onClick={() => setLineIdx((i) => Math.min(song.lyrics.length - 1, i + 1))}
                    disabled={lineIdx === song.lyrics.length - 1}
                    className="p-2 rounded-xl border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </div>
                <p className="text-xs text-[var(--text-muted)] text-center">
                  第 {lineIdx + 1} / {song.lyrics.length} 句
                </p>
              </div>

              {/* Global offset */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-4">
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">全局偏移（毫秒）</p>
                  <p className="text-xs text-[var(--text-muted)] mt-0.5">整首歌统一偏早/偏晚时使用，实时标记后通常不需要</p>
                </div>
                <div className="flex items-center gap-3">
                  <button onClick={() => applyOffset(offset - 500)} className="px-3 py-2 rounded-xl bg-[var(--bg-soft)] border border-[var(--border-color)] text-sm font-mono hover:border-[var(--pink-primary)]/40 transition-colors">-500</button>
                  <button onClick={() => applyOffset(offset - 100)} className="px-3 py-2 rounded-xl bg-[var(--bg-soft)] border border-[var(--border-color)] text-sm font-mono hover:border-[var(--pink-primary)]/40 transition-colors">-100</button>
                  <input
                    type="number"
                    value={inputOffset}
                    onChange={(e) => {
                      setInputOffset(e.target.value);
                      const n = parseInt(e.target.value);
                      if (!isNaN(n)) { setOffset(n); setSaved(false); }
                    }}
                    className="flex-1 text-center text-xl font-bold font-mono bg-[var(--bg-soft)] border-2 border-[var(--pink-primary)]/30 rounded-xl py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--pink-primary)]"
                  />
                  <button onClick={() => applyOffset(offset + 100)} className="px-3 py-2 rounded-xl bg-[var(--bg-soft)] border border-[var(--border-color)] text-sm font-mono hover:border-[var(--pink-primary)]/40 transition-colors">+100</button>
                  <button onClick={() => applyOffset(offset + 500)} className="px-3 py-2 rounded-xl bg-[var(--bg-soft)] border border-[var(--border-color)] text-sm font-mono hover:border-[var(--pink-primary)]/40 transition-colors">+500</button>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => applyOffset(0)} className="flex-1 py-2 rounded-xl bg-[var(--bg-soft)] border border-[var(--border-color)] text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
                    重置为 0
                  </button>
                  <button
                    onClick={saveCalibration}
                    disabled={saving}
                    className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-xl text-sm font-bold transition-all ${
                      saved ? 'bg-green-500 text-white' : 'bg-[var(--text-primary)] text-white hover:opacity-90'
                    } disabled:opacity-50`}
                  >
                    {saved ? <CheckCircle size={16} /> : <Save size={16} />}
                    {saving ? '保存中...' : saved ? '已保存' : '保存全局偏移'}
                  </button>
                </div>
              </div>

              {/* Per-line fine-tune + lyrics editing */}
              <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
                <button
                  onClick={() => setShowLineCal(!showLineCal)}
                  className="w-full px-5 py-4 border-b border-[var(--border-color)] flex items-center gap-2 hover:bg-[var(--bg-soft)] transition-colors text-left"
                >
                  <List size={16} className="text-blue-500 shrink-0" />
                  <p className="text-sm font-semibold text-[var(--text-primary)]">
                    逐句微调 & 歌词编辑
                    <span className="text-xs font-normal text-[var(--text-muted)] ml-1">
                      ({Object.keys(currentLineCals).length} 句时间校准 / {Object.keys(currentOverrides).length} 句歌词修改)
                    </span>
                  </p>
                  <span className="ml-auto text-[var(--text-muted)] text-xs">{showLineCal ? '收起' : '展开'}</span>
                </button>

                {showLineCal && (
                  <>
                    <div className="overflow-y-auto max-h-[600px]">
                      {song.lyrics.map((l, i) => {
                        const cal = currentLineCals[i];
                        const isCurrentLine = i === lineIdx;
                        const isEditing = editingLineIdx === i;
                        const hasOverride = !!currentOverrides[i];
                        const { korean, chinese } = getEffectiveLyrics(i);
                        return (
                          <div key={i} className={`border-b border-[var(--border-color)] last:border-0 ${isCurrentLine ? 'bg-[var(--pink-pale)]/10' : ''}`}>
                            <div className="px-5 py-3 flex items-start gap-3">
                              <button
                                onClick={() => setLineIdx(i)}
                                className={`shrink-0 w-8 h-8 rounded-lg text-xs font-bold flex items-center justify-center mt-0.5 ${
                                  isCurrentLine ? 'bg-[var(--pink-primary)] text-white' : 'bg-[var(--bg-soft)] text-[var(--text-muted)]'
                                }`}
                              >
                                {i + 1}
                              </button>
                              <div className="flex-1 min-w-0">
                                {isEditing ? (
                                  <div className="space-y-2 mb-2">
                                    <div>
                                      <label className="text-[10px] text-[var(--text-muted)] mb-1 block">韩文</label>
                                      <textarea
                                        value={editKorean}
                                        onChange={(e) => setEditKorean(e.target.value)}
                                        rows={2}
                                        className="w-full text-sm font-medium bg-white border border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-primary)] focus:outline-none focus:border-[var(--pink-primary)] resize-none"
                                        autoFocus
                                      />
                                    </div>
                                    <div>
                                      <label className="text-[10px] text-[var(--text-muted)] mb-1 block">中文</label>
                                      <textarea
                                        value={editChinese}
                                        onChange={(e) => setEditChinese(e.target.value)}
                                        rows={2}
                                        className="w-full text-xs bg-white border border-[var(--border-color)] rounded-lg px-3 py-2 text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] resize-none"
                                      />
                                    </div>
                                    <div className="flex gap-2">
                                      <button
                                        onClick={() => saveLyricsOverride(i)}
                                        disabled={savingLyricsIdx === i}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-green-500 text-white text-xs font-medium hover:bg-green-600 disabled:opacity-50"
                                      >
                                        <Check size={12} />
                                        {savingLyricsIdx === i ? '保存中...' : '保存歌词'}
                                      </button>
                                      <button
                                        onClick={cancelEditLyrics}
                                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-[var(--bg-soft)] border border-[var(--border-color)] text-xs text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                                      >
                                        <X size={12} />
                                        取消
                                      </button>
                                      {hasOverride && (
                                        <button
                                          onClick={() => { deleteLyricsOverride(i); cancelEditLyrics(); }}
                                          className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-red-50 border border-red-200 text-xs text-red-500 hover:bg-red-100 ml-auto"
                                        >
                                          <X size={12} />恢复原文
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                ) : (
                                  <div className="flex items-start justify-between gap-2">
                                    <div className="flex-1 min-w-0">
                                      <p className={`text-sm font-medium truncate ${hasOverride ? 'text-orange-600' : 'text-[var(--text-primary)]'}`}>{korean}</p>
                                      <p className="text-xs text-[var(--text-muted)] truncate mt-0.5">{chinese}</p>
                                    </div>
                                    <button
                                      onClick={() => startEditLyrics(i)}
                                      className={`shrink-0 p-1.5 rounded-lg transition-colors ${
                                        hasOverride
                                          ? 'bg-orange-50 border border-orange-200 text-orange-500 hover:bg-orange-100'
                                          : 'bg-[var(--bg-soft)] border border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:border-[var(--pink-primary)]/40'
                                      }`}
                                    >
                                      <Edit2 size={12} />
                                    </button>
                                  </div>
                                )}

                                {/* Fine-tune timing controls */}
                                {!isEditing && (
                                  <div className="flex items-center gap-2 mt-2">
                                    <div className="flex items-center gap-1">
                                      <span className="text-[10px] text-[var(--text-muted)]">起:</span>
                                      <button onClick={() => {
                                        const ex = currentLineCals[i];
                                        const nc: LineCalibration = { songId: selectedSongId, lineIndex: i, startOffsetMs: (ex?.startOffsetMs ?? 0) - 100, endOffsetMs: ex?.endOffsetMs ?? 0, updatedAt: Date.now() };
                                        setLineCals((prev) => ({ ...prev, [selectedSongId]: { ...prev[selectedSongId], [i]: nc } }));
                                      }} className="w-6 h-6 rounded bg-red-50 border border-red-200 text-red-500 text-xs flex items-center justify-center hover:bg-red-100">-</button>
                                      <span className="text-xs font-mono text-blue-600 w-14 text-center">{cal?.startOffsetMs ?? 0}ms</span>
                                      <button onClick={() => {
                                        const ex = currentLineCals[i];
                                        const nc: LineCalibration = { songId: selectedSongId, lineIndex: i, startOffsetMs: (ex?.startOffsetMs ?? 0) + 100, endOffsetMs: ex?.endOffsetMs ?? 0, updatedAt: Date.now() };
                                        setLineCals((prev) => ({ ...prev, [selectedSongId]: { ...prev[selectedSongId], [i]: nc } }));
                                      }} className="w-6 h-6 rounded bg-green-50 border border-green-200 text-green-500 text-xs flex items-center justify-center hover:bg-green-100">+</button>
                                    </div>
                                    <div className="flex items-center gap-1">
                                      <span className="text-[10px] text-[var(--text-muted)]">止:</span>
                                      <button onClick={() => {
                                        const ex = currentLineCals[i];
                                        const nc: LineCalibration = { songId: selectedSongId, lineIndex: i, startOffsetMs: ex?.startOffsetMs ?? 0, endOffsetMs: (ex?.endOffsetMs ?? 0) - 100, updatedAt: Date.now() };
                                        setLineCals((prev) => ({ ...prev, [selectedSongId]: { ...prev[selectedSongId], [i]: nc } }));
                                      }} className="w-6 h-6 rounded bg-red-50 border border-red-200 text-red-500 text-xs flex items-center justify-center hover:bg-red-100">-</button>
                                      <span className="text-xs font-mono text-blue-600 w-14 text-center">{cal?.endOffsetMs ?? 0}ms</span>
                                      <button onClick={() => {
                                        const ex = currentLineCals[i];
                                        const nc: LineCalibration = { songId: selectedSongId, lineIndex: i, startOffsetMs: ex?.startOffsetMs ?? 0, endOffsetMs: (ex?.endOffsetMs ?? 0) + 100, updatedAt: Date.now() };
                                        setLineCals((prev) => ({ ...prev, [selectedSongId]: { ...prev[selectedSongId], [i]: nc } }));
                                      }} className="w-6 h-6 rounded bg-green-50 border border-green-200 text-green-500 text-xs flex items-center justify-center hover:bg-green-100">+</button>
                                    </div>
                                    <button
                                      onClick={() => saveLineCalibration(i, {
                                        songId: selectedSongId, lineIndex: i,
                                        startOffsetMs: currentLineCals[i]?.startOffsetMs ?? 0,
                                        endOffsetMs: currentLineCals[i]?.endOffsetMs ?? 0,
                                        updatedAt: Date.now(),
                                      })}
                                      disabled={savingLineIdx === i}
                                      className="ml-auto shrink-0 px-2 py-1 rounded-lg bg-blue-50 border border-blue-200 text-blue-600 text-[10px] font-medium hover:bg-blue-100 disabled:opacity-50"
                                    >
                                      {savingLineIdx === i ? '...' : '保存'}
                                    </button>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                    <div className="px-5 py-3 bg-[var(--bg-soft)] border-t border-[var(--border-color)]">
                      <p className="text-xs text-[var(--text-muted)]">
                        逐句微调用于在实时标记后修正个别句子的精细偏差（±100ms 步进）。编辑图标修改歌词文本。
                      </p>
                    </div>
                  </>
                )}
              </div>
            </>
          ) : (
            <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-12 text-center text-[var(--text-muted)]">
              请从左侧选择一首歌曲
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
