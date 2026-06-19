'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useTheme } from '@/components/ThemeProvider';
import { speak, cancelSpeech } from '@/lib/tts';
import { LyricLine } from '@/components/kpop/LyricLine';
import { OffsetPanel } from '@/components/kpop/OffsetPanel';
import { WordTapSheet } from '@/components/WordTapSheet';
import type { LocalLyricLine } from '@/types/kpop';

const LIGHT_C = { ink: '#241917', muted: '#89756e', line: '#eee0d8', pink: '#ff7fa8', pinkSoft: '#fff0f5', bg: '#fffbf7', card: '#fff', black: '#201815' };
const DARK_C  = { ink: '#F0E8FF', muted: '#B8A8C8', line: '#3A3060', pink: '#ff7fa8', pinkSoft: '#2D2848', bg: '#1E1B2E', card: '#282440', black: '#3A3060' };

type Stage = 'import' | 'naming' | 'generating' | 'player';
const SPEEDS = [0.5, 0.75, 1.0, 1.25];
const GEN_STEPS = ['正在解析歌曲信息…', '正在生成歌词时间轴…', '正在提取学习词汇…', '整理完成，准备播放'];

export default function LocalKaraokePage() {
  const { user, loading: authLoading } = useAuth();
  const { theme } = useTheme();
  const C = theme === 'dark' ? DARK_C : LIGHT_C;

  const [stage, setStage] = useState<Stage>('import');
  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [audioUrl, setAudioUrl] = useState('');
  const [lyrics, setLyrics] = useState<LocalLyricLine[]>([]);
  const [genStep, setGenStep] = useState(0);
  const [genError, setGenError] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentMs, setCurrentMs] = useState(0);
  const [duration, setDuration] = useState(0);
  const [speedIdx, setSpeedIdx] = useState(2);
  const [offsetMs, setOffsetMs] = useState(0);
  const [showOffset, setShowOffset] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [abLoop, setAbLoop] = useState<{ start: number; end: number } | null>(null);
  const [wordTap, setWordTap] = useState<string | null>(null);
  const [showRomanization, setShowRomanization] = useState(true);
  const [showChinese, setShowChinese] = useState(true);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingBlob, setRecordingBlob] = useState<Blob | null>(null);
  const [playingRecording, setPlayingRecording] = useState(false);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const lineRefs = useRef<(HTMLDivElement | null)[]>([]);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordingChunksRef = useRef<Blob[]>([]);
  const recordingAudioRef = useRef<HTMLAudioElement | null>(null);
  const urlRef = useRef<string>('');
  const isGeneratingRef = useRef(false);

  useEffect(() => {
    return () => {
      if (urlRef.current) URL.revokeObjectURL(urlRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const stopInterval = useCallback(() => {
    if (intervalRef.current) { clearInterval(intervalRef.current); intervalRef.current = null; }
  }, []);

  const startInterval = useCallback(() => {
    stopInterval();
    intervalRef.current = setInterval(() => {
      const audio = audioRef.current;
      if (!audio) return;
      const ms = audio.currentTime * 1000;
      setCurrentMs(ms);
      setAbLoop((loop) => {
        if (loop && ms >= loop.end) { audio.currentTime = loop.start / 1000; }
        return loop;
      });
      setLyrics((lyr) => {
        setOffsetMs((off) => {
          const adjusted = ms - off;
          const idx = lyr.findIndex((l) => adjusted >= l.startMs && adjusted < l.endMs);
          setActiveIdx(idx);
          if (idx >= 0 && lineRefs.current[idx]) {
            lineRefs.current[idx]!.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }
          return off;
        });
        return lyr;
      });
    }, 200);
  }, [stopInterval]);

  const handleFileSelect = (file: File) => {
    if (file.size > 100 * 1024 * 1024) { alert('文件不能超过 100MB'); return; }
    setAudioFile(file);
    setSongName(file.name.replace(/\.[^.]+$/, '').replace(/[-_]/g, ' '));
    setStage('naming');
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFileSelect(file);
  };

  const handleGenerate = async () => {
    if (!audioFile || !songName.trim() || isGeneratingRef.current) return;
    isGeneratingRef.current = true;
    setGenError('');
    setStage('generating');
    setGenStep(0);
    const stepTimer = setInterval(() => setGenStep((s) => Math.min(s + 1, GEN_STEPS.length - 2)), 1800);
    try {
      const url = URL.createObjectURL(audioFile);
      urlRef.current = url;
      const dur = await new Promise<number>((resolve) => {
        const a = new Audio(url);
        a.addEventListener('loadedmetadata', () => resolve(a.duration), { once: true });
        a.addEventListener('error', () => resolve(240), { once: true });
        setTimeout(() => resolve(240), 5000);
      });
      const res = await fetch('/api/kpop/generate-lyrics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songName: songName.trim(), artistName: artistName.trim(), estimatedDurationSec: Math.round(dur) }),
      });
      clearInterval(stepTimer);
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: '生成失败，请重试' }));
        setGenError(err.error || '生成失败，请重试');
        setStage('naming');
        isGeneratingRef.current = false;
        return;
      }
      const data = await res.json();
      setGenStep(GEN_STEPS.length - 1);
      await new Promise((r) => setTimeout(r, 600));
      setLyrics(data.lyrics);
      setAudioUrl(url);
      setDuration(dur * 1000);
      setStage('player');
    } catch {
      clearInterval(stepTimer);
      setGenError('网络异常，请重试');
      setStage('naming');
    }
    isGeneratingRef.current = false;
  };

  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (isPlaying) { audio.pause(); stopInterval(); setIsPlaying(false); }
    else { audio.play(); startInterval(); setIsPlaying(true); }
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const audio = audioRef.current;
    if (!audio) return;
    const ms = Number(e.target.value);
    audio.currentTime = ms / 1000;
    setCurrentMs(ms);
  };

  const handleSpeedCycle = () => {
    const next = (speedIdx + 1) % SPEEDS.length;
    setSpeedIdx(next);
    if (audioRef.current) audioRef.current.playbackRate = SPEEDS[next];
  };

  const handleJump = (idx: number) => {
    const audio = audioRef.current;
    if (!audio || !lyrics[idx]) return;
    audio.currentTime = lyrics[idx].startMs / 1000;
    setCurrentMs(lyrics[idx].startMs);
    if (!isPlaying) { audio.play(); startInterval(); setIsPlaying(true); }
  };

  const handleABLoop = (idx: number) => {
    const line = lyrics[idx];
    if (!line) return;
    setAbLoop((prev) => prev && prev.start === line.startMs ? null : { start: line.startMs, end: line.endMs });
    handleJump(idx);
  };

  const handleTTS = (text: string) => { cancelSpeech(); speak(text); };

  const handleBack = () => {
    cancelSpeech();
    stopInterval();
    audioRef.current?.pause();
    setIsPlaying(false); setAbLoop(null); setActiveIdx(-1); setCurrentMs(0); setOffsetMs(0);
    setStage('import'); setAudioFile(null); setSongName(''); setArtistName(''); setLyrics([]);
    setAudioUrl('');
    if (urlRef.current) { URL.revokeObjectURL(urlRef.current); urlRef.current = ''; }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mimeType = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/mp4';
      const mr = new MediaRecorder(stream, { mimeType });
      recordingChunksRef.current = [];
      mr.ondataavailable = (e) => { if (e.data.size > 0) recordingChunksRef.current.push(e.data); };
      mr.onstop = () => { setRecordingBlob(new Blob(recordingChunksRef.current, { type: mimeType })); stream.getTracks().forEach((t) => t.stop()); };
      mr.start();
      mediaRecorderRef.current = mr;
      setIsRecording(true);
      setRecordingBlob(null);
    } catch { alert('无法获取麦克风权限'); }
  };

  const stopRecording = () => { mediaRecorderRef.current?.stop(); setIsRecording(false); };

  const playRecording = () => {
    if (!recordingBlob || playingRecording) return;
    const url = URL.createObjectURL(recordingBlob);
    const a = new Audio(url);
    recordingAudioRef.current = a;
    setPlayingRecording(true);
    a.play();
    a.onended = () => { setPlayingRecording(false); URL.revokeObjectURL(url); };
  };

  const fmt = (ms: number) => {
    const s = Math.floor(ms / 1000);
    return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  };

  if (authLoading) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", alignItems: "center", justifyContent: "center" }}>
      <div style={{ color: C.muted, fontSize: 15 }}>加载中…</div>
    </div>
  );

  if (!user) return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24, gap: 16 }}>
      <div style={{ fontSize: 48 }}>🎤</div>
      <div style={{ fontSize: 20, fontWeight: 900, color: C.ink }}>登录后使用跟唱功能</div>
      <div style={{ fontSize: 14, color: C.muted }}>导入你的歌曲，跟着歌词唱</div>
      <a href="/auth/login" style={{ background: "#ff7fa8", color: "#fff", borderRadius: 99, padding: "14px 36px", fontWeight: 900, fontSize: 15, textDecoration: "none" }}>去登录</a>
    </div>
  );

  if (stage === "import") return (
    <div style={{ minHeight: "100vh", background: C.bg, padding: "24px 16px 120px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <button onClick={() => window.history.back()} style={{ background: "transparent", border: "none", color: C.muted, fontSize: 14, cursor: "pointer", padding: "8px 0", marginBottom: 8 }}>← 返回</button>
        <div style={{ fontSize: 26, fontWeight: 900, color: C.ink, marginBottom: 6 }}>🎤 本地跟唱</div>
        <div style={{ fontSize: 14, color: C.muted, marginBottom: 28 }}>导入本地音乐文件，AI 生成歌词时间轴</div>
        <div onDrop={handleDrop} onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }} onDragLeave={() => setIsDragging(false)} onClick={() => (document.getElementById("audio-file-input") as HTMLInputElement)?.click()} style={{ border: `2px dashed ${isDragging ? "#ff7fa8" : C.line}`, borderRadius: 24, padding: "48px 24px", textAlign: "center", cursor: "pointer", background: isDragging ? "rgba(255,127,168,0.06)" : C.card, transition: "all 0.2s", boxShadow: "0 4px 20px rgba(78,52,46,0.07)" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>🎵</div>
          <div style={{ fontSize: 16, fontWeight: 900, color: C.ink, marginBottom: 6 }}>点击或拖拽导入音频</div>
          <div style={{ fontSize: 13, color: C.muted }}>支持 MP3、M4A、WAV、FLAC · 最大 100MB</div>
        </div>
        <input id="audio-file-input" type="file" accept="audio/*" style={{ display: "none" }} onChange={(e) => { const f = e.target.files?.[0]; if (f) handleFileSelect(f); }} />
      </div>
    </div>
  );

  if (stage === "naming") return (
    <div style={{ minHeight: "100vh", background: C.bg, padding: "24px 16px 120px", display: "flex", flexDirection: "column", alignItems: "center" }}>
      <div style={{ width: "100%", maxWidth: 480 }}>
        <button onClick={() => setStage("import")} style={{ background: "transparent", border: "none", color: C.muted, fontSize: 14, cursor: "pointer", padding: "8px 0", marginBottom: 8 }}>← 重新选择</button>
        <div style={{ fontSize: 26, fontWeight: 900, color: C.ink, marginBottom: 6 }}>确认歌曲信息</div>
        <div style={{ fontSize: 14, color: C.muted, marginBottom: 28 }}>信息越准确，生成的歌词越精确</div>
        <div style={{ background: C.card, borderRadius: 20, padding: 24, boxShadow: "0 4px 20px rgba(78,52,46,0.07)", marginBottom: 16 }}>
          <div style={{ fontSize: 13, color: C.muted, marginBottom: 6 }}>已选文件</div>
          <div style={{ fontSize: 15, fontWeight: 700, color: C.ink, marginBottom: 20 }}>🎵 {audioFile?.name}</div>
          <div style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 6 }}>歌曲名称 *</div>
            <input value={songName} onChange={(e) => setSongName(e.target.value)} placeholder="例：Dynamite" style={{ width: "100%", border: `1.5px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", fontSize: 15, background: C.bg, color: C.ink, outline: "none", boxSizing: "border-box" }} />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: C.ink, marginBottom: 6 }}>歌手 / 组合（选填）</div>
            <input value={artistName} onChange={(e) => setArtistName(e.target.value)} placeholder="例：BTS" style={{ width: "100%", border: `1.5px solid ${C.line}`, borderRadius: 12, padding: "12px 14px", fontSize: 15, background: C.bg, color: C.ink, outline: "none", boxSizing: "border-box" }} />
          </div>
        </div>
        {genError && <div style={{ color: "#e05c5c", fontSize: 14, marginBottom: 12, padding: "10px 14px", background: "rgba(224,92,92,0.08)", borderRadius: 10 }}>{genError}</div>}
        <button onClick={handleGenerate} disabled={!songName.trim()} style={{ width: "100%", background: songName.trim() ? "#ff7fa8" : C.line, color: songName.trim() ? "#fff" : C.muted, border: "none", borderRadius: 99, padding: "16px 0", fontSize: 16, fontWeight: 900, cursor: songName.trim() ? "pointer" : "not-allowed", transition: "all 0.2s" }}>
          ✨ 生成歌词时间轴
        </button>
      </div>
    </div>
  );

  if (stage === "generating") return (
    <div style={{ minHeight: "100vh", background: C.bg, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: 24 }}>
      <div style={{ fontSize: 56, marginBottom: 24, animation: "spin 2s linear infinite" }}>🎵</div>
      <div style={{ fontSize: 18, fontWeight: 900, color: C.ink, marginBottom: 10 }}>{songName}</div>
      <div style={{ fontSize: 14, color: "#ff7fa8", marginBottom: 32 }}>{GEN_STEPS[genStep]}</div>
      <div style={{ display: "flex", gap: 8 }}>
        {GEN_STEPS.map((_, i) => (
          <div key={i} style={{ width: i === genStep ? 20 : 8, height: 8, borderRadius: 4, background: i <= genStep ? "#ff7fa8" : C.line, transition: "all 0.3s" }} />
        ))}
      </div>
      <style dangerouslySetInnerHTML={{ __html: "@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }" }} />
    </div>
  );

  const pastBoundary = activeIdx >= 0 ? activeIdx : lyrics.findIndex((l) => currentMs - offsetMs < l.startMs);

  return (
    <div style={{ minHeight: "100vh", background: C.bg, paddingBottom: "calc(136px + env(safe-area-inset-bottom, 0px))" }}>
      <div style={{ position: "sticky", top: 0, zIndex: 70, background: C.bg, borderBottom: `1px solid ${C.line}`, padding: "0 16px", height: 52, display: "flex", alignItems: "center", gap: 10 }}>
        <button onClick={handleBack} style={{ background: "transparent", border: "none", color: C.muted, fontSize: 14, cursor: "pointer", padding: "4px 0", flexShrink: 0 }}>← 返回</button>
        <div style={{ flex: 1, fontSize: 15, fontWeight: 900, color: C.ink, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{songName}{artistName ? ` · ${artistName}` : ""}</div>
        <button onClick={() => setShowOffset(true)} style={{ background: "transparent", border: `1px solid ${C.line}`, borderRadius: 10, padding: "5px 10px", fontSize: 12, color: C.muted, cursor: "pointer", flexShrink: 0 }}>⏱ 校准</button>
      </div>
      <div style={{ position: "sticky", top: 52, zIndex: 69, background: C.bg, padding: "12px 16px", borderBottom: `1px solid ${C.line}` }}>
        <audio ref={audioRef} src={audioUrl} onEnded={() => { stopInterval(); setIsPlaying(false); }} onLoadedMetadata={(e) => setDuration((e.target as HTMLAudioElement).duration * 1000)} />
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
          <span style={{ fontSize: 12, color: C.muted, flexShrink: 0 }}>{fmt(currentMs)}</span>
          <input type="range" min={0} max={duration || 1} value={currentMs} onChange={handleSeek} style={{ flex: 1, accentColor: "#ff7fa8" }} />
          <span style={{ fontSize: 12, color: C.muted, flexShrink: 0 }}>{fmt(duration)}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <button onClick={handleSpeedCycle} style={{ background: C.card, border: `1px solid ${C.line}`, borderRadius: 10, padding: "7px 14px", fontSize: 12, fontWeight: 700, color: C.ink, cursor: "pointer" }}>{SPEEDS[speedIdx]}x</button>
          <button onClick={handlePlayPause} style={{ width: 48, height: 48, borderRadius: 99, background: "#ff7fa8", border: "none", fontSize: 20, cursor: "pointer", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center" }}>{isPlaying ? "⏸" : "▶"}</button>
          <button onClick={() => setShowRomanization((v) => !v)} style={{ background: showRomanization ? "rgba(255,127,168,0.12)" : C.card, border: `1px solid ${showRomanization ? "rgba(255,127,168,0.3)" : C.line}`, borderRadius: 10, padding: "7px 10px", fontSize: 12, fontWeight: 700, color: showRomanization ? "#ff7fa8" : C.muted, cursor: "pointer" }}>拼</button>
          <button onClick={() => setShowChinese((v) => !v)} style={{ background: showChinese ? "rgba(255,127,168,0.12)" : C.card, border: `1px solid ${showChinese ? "rgba(255,127,168,0.3)" : C.line}`, borderRadius: 10, padding: "7px 10px", fontSize: 12, fontWeight: 700, color: showChinese ? "#ff7fa8" : C.muted, cursor: "pointer" }}>译</button>
          {abLoop && <button onClick={() => setAbLoop(null)} style={{ background: "rgba(255,127,168,0.12)", border: "1px solid rgba(255,127,168,0.3)", borderRadius: 10, padding: "7px 10px", fontSize: 12, fontWeight: 700, color: "#ff7fa8", cursor: "pointer" }}>🔁 取消</button>}
        </div>
      </div>
      <div style={{ padding: "12px 16px", display: "flex", flexDirection: "column", gap: 8 }}>
        {lyrics.map((line, i) => (
          <div key={i} ref={(el) => { lineRefs.current[i] = el; }}>
            <LyricLine line={line} index={i} isActive={i === activeIdx} isPast={pastBoundary > 0 && i < pastBoundary && i !== activeIdx} showRomanization={showRomanization} showChinese={showChinese} C={C} onABLoop={handleABLoop} onTTS={handleTTS} onWordTap={(w) => setWordTap(w)} onJump={handleJump} />
          </div>
        ))}
        {lyrics.length === 0 && <div style={{ textAlign: "center", color: C.muted, fontSize: 14, padding: "40px 0" }}>暂无歌词</div>}
      </div>
      <div style={{ position: "fixed", bottom: "calc(56px + env(safe-area-inset-bottom, 0px))", left: 0, right: 0, background: C.card, borderTop: `1px solid ${C.line}`, padding: "12px 16px", zIndex: 60, display: "flex", gap: 10, alignItems: "center" }} className="md:left-[108px] md:!bottom-0">
        {!isRecording && !recordingBlob && (
          <button onClick={startRecording} style={{ flex: 1, background: "#ff7fa8", border: "none", borderRadius: 99, padding: "14px 0", fontSize: 14, fontWeight: 900, color: "#fff", cursor: "pointer" }}>🎙 开始录音</button>
        )}
        {isRecording && (
          <button onClick={stopRecording} style={{ flex: 1, background: "#e05c5c", border: "none", borderRadius: 99, padding: "14px 0", fontSize: 14, fontWeight: 900, color: "#fff", cursor: "pointer" }}>⏹ 停止录音</button>
        )}
        {recordingBlob && !isRecording && (
          <>
            <button onClick={playRecording} disabled={playingRecording} style={{ flex: 1, background: playingRecording ? C.line : C.pinkSoft, border: `1px solid rgba(255,127,168,0.3)`, borderRadius: 99, padding: "14px 0", fontSize: 14, fontWeight: 900, color: "#ff7fa8", cursor: playingRecording ? "not-allowed" : "pointer" }}>{playingRecording ? "▶ 播放中…" : "▶ 回放录音"}</button>
            <button onClick={() => { if (activeIdx >= 0) handleTTS(lyrics[activeIdx].korean); }} style={{ flex: 1, background: C.card, border: `1px solid ${C.line}`, borderRadius: 99, padding: "14px 0", fontSize: 14, fontWeight: 900, color: C.ink, cursor: "pointer" }}>🔊 TTS 对比</button>
            <button onClick={() => setRecordingBlob(null)} style={{ width: 44, height: 44, borderRadius: 99, background: C.card, border: `1px solid ${C.line}`, fontSize: 16, cursor: "pointer", color: C.muted, display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          </>
        )}
      </div>
      {showOffset && <OffsetPanel offsetMs={offsetMs} onChange={setOffsetMs} onClose={() => setShowOffset(false)} C={C} />}
      {wordTap && <WordTapSheet surface={wordTap} source="kpop-local" onClose={() => setWordTap(null)} />}
    </div>
  );
}
