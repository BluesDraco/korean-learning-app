'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import {
  X, Square, Play, Pause, ChevronLeft,
  RotateCcw, AlertTriangle, Volume2,
  BookmarkPlus, Check,
} from 'lucide-react';
import type { KpopTrack } from '@/types/kpop';
import { playClick, playSuccess, playComplete, playRecordStart, playRecordStop } from '@/lib/soundManager';
import { useToast } from '@/hooks/useToast';
import { useAuth } from '@/components/AuthProvider';
import { db } from '@/lib/db';
import { AudioRecorder } from '@/lib/audio/recorder';
import { SegmentPlayer } from '@/lib/kpop/audioSegmentPlayer';
import {
  initSongProgress, loadSongProgress, markLinePracticed,
  saveLineRecording, getLineRecording, deleteLineRecording,
  deleteRecordingFromServer, fetchLineRecordingFromServer,
} from '@/lib/kpop/progress';


interface Props {
  song: KpopTrack;
  startIndex: number;
  onClose: () => void;
  audioType?: 'kpop' | 'tedx';
  audioUrl?: string;
}

type Phase = 'listen' | 'record' | 'review';

export default function SingingMode({ song, startIndex, onClose, audioType = 'kpop', audioUrl }: Props) {
  const audioPrefix = audioType === 'tedx' ? 'audio/tedx' : 'audio/kpop';
  const [lineIndex, setLineIndex] = useState(startIndex);
  const [phase, setPhase] = useState<Phase>('listen');
  const [showRoman, setShowRoman] = useState(true);
  const [slowMode, setSlowMode] = useState(false);
  const [loopMode, setLoopMode] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [micError, setMicError] = useState<string | null>(null);
  const [completedIndices, setCompletedIndices] = useState<number[]>([]);

  const { showToast } = useToast();
  const { user } = useAuth();
  const recorderRef = useRef<AudioRecorder | null>(null);
  const playerRef = useRef<HTMLAudioElement | null>(null);
  const segmentPlayerRef = useRef<SegmentPlayer | null>(null);
  const [songPlaying, setSongPlaying] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [audioStatus, setAudioStatus] = useState<'loading' | 'ready' | 'error'>('loading');

  const isAdmin = user?.role === 'admin';
  const [calibrating, setCalibrating] = useState(false);
  const [localOffset, setLocalOffset] = useState(song.timingOffsetMs ?? 0);

  useEffect(() => {
    setLocalOffset(song.timingOffsetMs ?? 0);
  }, [song.id, song.timingOffsetMs]);

  const saveCalibration = useCallback(async () => {
    try {
      await fetch('/api/kpop/calibration', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ songId: song.id, timingOffsetMs: localOffset, timingVerified: true }),
      });
      song.timingOffsetMs = localOffset;
      song.timingVerified = true;
      song.timingSource = 'manual';
      showToast(`偏移已保存: ${localOffset > 0 ? '+' : ''}${(localOffset / 1000).toFixed(1)}s`, 'success');
    } catch {
      showToast('保存失败', 'error');
    }
  }, [song, localOffset, showToast]);

  const line = song.lyrics[lineIndex];
  const totalLines = song.lyrics.length;
  const isCompleted = completedIndices.includes(lineIndex);

  useEffect(() => {
    const init = async () => {
      const p = user
        ? (await loadSongProgress(song.id)) ?? initSongProgress(song.id, song.lyrics.length)
        : initSongProgress(song.id, song.lyrics.length);
      setCompletedIndices(p.completedLineIndices);

      if (user) {
        const serverRec = await fetchLineRecordingFromServer(song.id, lineIndex).catch(() => null);
        if (serverRec) {
          setRecordingUrl(serverRec.blobUrl);
          return;
        }
      }
      const rec = getLineRecording(song.id, lineIndex);
      if (rec) setRecordingUrl(rec.blobUrl);
    };
    init();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [song.id]);

  useEffect(() => {
    const load = async () => {
      if (user) {
        const serverRec = await fetchLineRecordingFromServer(song.id, lineIndex).catch(() => null);
        if (serverRec) {
          setRecordingUrl(serverRec.blobUrl);
          setPhase('listen');
          setMicError(null);
          setUploadError(null);
          return;
        }
      }
      const rec = getLineRecording(song.id, lineIndex);
      setRecordingUrl(rec?.blobUrl ?? null);
      setPhase('listen');
      setMicError(null);
      setUploadError(null);
    };
    load();
  }, [lineIndex, song.id, user]);

  useEffect(() => {
    return () => {
      recorderRef.current?.cancel();
      if (playerRef.current) {
        playerRef.current.pause();
      }
      segmentPlayerRef.current?.destroy();
      segmentPlayerRef.current = null;
    };
  }, []);

  const startRecording = useCallback(async () => {
    setMicError(null);
    const recorder = new AudioRecorder(30000);
    const { error } = await recorder.start();
    if (error) {
      setMicError(error);
      return;
    }
    recorderRef.current = recorder;
    setIsRecording(true);
    playRecordStart();
  }, []);

  const stopRecording = useCallback(async () => {
    if (!recorderRef.current) return;
    const result = await recorderRef.current.stop();
    setIsRecording(false);
    if (!result) return;

    const rec = await saveLineRecording(song.id, lineIndex, result.blob, result.durationMs);
    setRecordingUrl(rec.blobUrl);
    const uploaded = rec._uploaded;
    if (!uploaded) {
      setUploadError('录音已保存到本地，云端同步失败');
    } else {
      setUploadError(null);
    }

    setPhase('review');
    playRecordStop();
  }, [song.id, lineIndex]);

  const playMyRecording = useCallback(() => {
    if (!recordingUrl || isPlaying) return;
    const audio = new Audio(recordingUrl);
    playerRef.current = audio;
    audio.onended = () => setIsPlaying(false);
    audio.onerror = () => setIsPlaying(false);
    setIsPlaying(true);
    audio.play().catch(() => setIsPlaying(false));
  }, [recordingUrl, isPlaying]);

  const stopPlayback = useCallback(() => {
    if (playerRef.current) {
      playerRef.current.pause();
      playerRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  }, []);

  const markComplete = useCallback(async () => {
    await markLinePracticed(song.id, lineIndex);
    setCompletedIndices((prev) => prev.includes(lineIndex) ? prev : [...prev, lineIndex]);

    playSuccess();
    if (lineIndex >= totalLines - 1) {
      playComplete();
      showToast('已完成这首歌的跟唱练习', 'success');
    } else {
      showToast('已完成这一句', 'success');
      setLineIndex(lineIndex + 1);
    }
  }, [song.id, lineIndex, totalLines, showToast]);

  const [sentenceSaved, setSentenceSaved] = useState(false);
  const saveSentence = useCallback(async () => {
    if (sentenceSaved) return;
    try {
      await db.sentences.put({
        id: `kpop-${song.id}-line-${lineIndex}`,
        userId: user?.id,
        korean: line.korean,
        chinese: line.chinese || '',
        source: `${song.title} - ${song.artist}`,
        sourceType: 'kpop',
        sourceId: song.id,
        createdAt: Date.now(),
      });
      setSentenceSaved(true);
      showToast('已保存到我的资料库', 'success');
    } catch { /* ignore duplicates */ }
  }, [song.id, lineIndex, user?.id, line.korean, line.chinese, song.title, song.artist, sentenceSaved, showToast]);

  useEffect(() => { setSentenceSaved(false); }, [lineIndex]);

  const reRecord = useCallback(() => {
    deleteLineRecording(song.id, lineIndex);
    deleteRecordingFromServer(song.id, lineIndex).catch(() => {});
    setRecordingUrl(null);
    setPhase('listen');
  }, [song.id, lineIndex]);

  const goPrev = useCallback(() => {
    if (lineIndex > 0) { playClick(); setLineIndex(lineIndex - 1); }
  }, [lineIndex]);

  const goNext = useCallback(() => {
    if (lineIndex < totalLines - 1) { playClick(); setLineIndex(lineIndex + 1); }
  }, [lineIndex, totalLines]);

  const getSegmentPlayer = useCallback(async () => {
    if (!segmentPlayerRef.current) {
      const src = audioUrl ?? song.audioUrl ?? `https://torikorean-1436752408.cos.ap-hongkong.myqcloud.com/${audioPrefix}/${song.id}.webm`;
      const sp = new SegmentPlayer({
        onStateChange: (s) => {
          if (s === 'playing') setSongPlaying(true);
          else if (s === 'ready') setAudioStatus('ready');
          else if (s === 'error') setAudioStatus('error');
          else if (s === 'loading') setAudioStatus('loading');
        },
        onError: (err) => {
          setAudioStatus('error');
          showToast('音频加载失败，请刷新重试', 'error');
        },
      });
      await sp.load(src);
      segmentPlayerRef.current = sp;
    }
    return segmentPlayerRef.current;
  }, [song.id, song.audioUrl, audioUrl, audioPrefix]);

  useEffect(() => {
    getSegmentPlayer();
  }, []);

  useEffect(() => {
    const sp = segmentPlayerRef.current;
    return () => {
      if (sp) {
        sp.destroy();
        segmentPlayerRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    segmentPlayerRef.current?.setPlaybackRate(slowMode ? 0.75 : 1.0);
  }, [slowMode]);

  const effectiveStartMs = line.startMs + (song.timingOffsetMs ?? 0);
  const effectiveEndMs = (line.endMs ?? line.startMs + 5000) + (song.timingOffsetMs ?? 0);

  const playOriginalSegment = useCallback(async () => {
    const sp = await getSegmentPlayer();
    if (sp.state !== 'ready') {
      showToast('音频未就绪，请稍后重试', 'error');
      return;
    }
    try {
      sp.playSegment(effectiveStartMs, effectiveEndMs, loopMode, slowMode);
      setSongPlaying(true);
    } catch {
      showToast('播放失败', 'error');
    }
    playClick();
  }, [getSegmentPlayer, effectiveStartMs, effectiveEndMs, loopMode, slowMode, showToast]);

  const pauseOriginal = useCallback(() => {
    segmentPlayerRef.current?.stop();
    setSongPlaying(false);
  }, []);

  if (!line) return null;

  return (
    <div className="fixed inset-0 bg-[var(--bg-page)] z-50 flex flex-col" onClick={onClose}>
      {/* Header */}
      <div className="flex items-center gap-3 px-4 py-3 shrink-0 bg-[var(--bg-card)] border-b border-[var(--border-color)]/50" onClick={(e) => e.stopPropagation()}>
        <button onClick={onClose} className="p-2 -ml-2 min-w-[44px] min-h-[44px] flex items-center justify-center rounded-full bg-[var(--bg-input)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--pink-primary)]/10 transition-colors">
          <X size={20} />
        </button>
        <div className="flex-1 min-w-0">
          <p className="text-[14px] font-black text-[var(--text-primary)] truncate">{song.title}</p>
          <p className="text-[11px] text-[var(--text-muted)] font-bold">
            第 {lineIndex + 1} / {totalLines} 句
            {line.section ? ` · ${line.section}` : ''}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {completedIndices.length > 0 && (
            <span className="text-[11px] text-[var(--mint-soft)] font-black">
              {completedIndices.length}/{totalLines}
            </span>
          )}
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-1 bg-[var(--bg-input)] shrink-0">
        <div
          className="h-full bg-gradient-to-r from-[var(--mint-soft)] to-[var(--pink-primary)] transition-all duration-300"
          style={{ width: `${(completedIndices.length / totalLines) * 100}%` }}
        />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col items-center justify-center px-4 overflow-y-auto py-6" onClick={(e) => e.stopPropagation()}>
        {/* Dark practice card — matching demo */}
        <div className="rounded-[32px] p-5 bg-[var(--text-primary)] text-white w-full max-w-lg shadow-[0_20px_50px_rgba(32,24,21,0.18)]">
          {/* Section label */}
          {line.section && (
            <span className="inline-block text-[11px] font-black uppercase tracking-widest px-3 py-1 rounded-full bg-white/10 text-white/80 mb-3">
              {line.section}
            </span>
          )}

          {/* Audio status */}
          {audioStatus === 'loading' && (
            <p className="text-[11px] text-white/40 mb-3 font-bold">音频加载中...</p>
          )}
          {audioStatus === 'error' && (
            <p className="text-[11px] text-red-300 flex items-center gap-1 mb-3 font-bold">
              <AlertTriangle size={12} /> 音频不可用
            </p>
          )}

          {/* Lyrics card */}
          <div className="rounded-3xl p-4 bg-white/10 border border-white/10">
            <p className="text-[20px] font-black leading-[1.35] select-none">
              {line.korean}
            </p>

            {showRoman && line.pronunciation && (
              <p className="text-[13px] text-white/50 mt-2 select-none font-light tracking-wide">
                {line.pronunciation}
              </p>
            )}

            {line.chinese && (
              <p className="text-[13px] text-white/70 mt-2 font-bold">
                {line.chinese}
              </p>
            )}

            {line.keywords && line.keywords.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-white/10">
                {line.keywords.map((kw, ki) => (
                  <button
                    key={ki}
                    onClick={async () => {
                      try {
                        await db.words.put({
                          id: `kpop-${song.id}-${lineIndex}-${kw.korean}`,
                          word: kw.korean,
                          meaning: kw.meaning,
                          pronunciation: '',
                          partOfSpeech: '',
                          examples: [],
                          mastery: 'new' as const,
                          srsLevel: 0,
                          nextReview: Date.now(),
                          easeFactor: 2.5,
                          interval: 0,
                          createdAt: Date.now(),
                          lastReviewed: null,
                          source: `${song.title} - ${song.artist}`,
                          sourceDetail: 'KPOP跟唱',
                        });
                        showToast(`已保存: ${kw.korean}`, 'success');
                      } catch { /* duplicate */ }
                    }}
                    className="px-2.5 py-1 rounded-full text-[11px] bg-white/10 text-white/70 hover:bg-white/20 hover:text-white transition-colors font-bold"
                  >
                    {kw.korean} <span className="text-white/30">·</span> {kw.meaning}
                  </button>
                ))}
              </div>
            )}

            {line.expressionNote && (
              <p className="text-[11px] text-white/60 italic leading-relaxed mt-2 pt-2 border-t border-white/10">
                {line.expressionNote}
              </p>
            )}
          </div>

          {/* Mic error */}
          {micError && (
            <div className="flex items-center gap-2 bg-amber-50 border border-amber-200 rounded-xl px-4 py-2.5 text-amber-700 text-xs mt-3">
              <AlertTriangle size={14} />
              {micError}
            </div>
          )}

          {/* Phase: listen */}
          {phase === 'listen' && !isRecording && (
            <div className="flex flex-col items-center gap-3 mt-4">
              <div className="grid grid-cols-3 gap-2 w-full">
                <button
                  onClick={songPlaying ? pauseOriginal : playOriginalSegment}
                  disabled={audioStatus !== 'ready'}
                  className="h-[38px] rounded-full bg-white/12 text-white text-[12px] font-black active:scale-95 transition-all disabled:opacity-30"
                >
                  {audioStatus === 'loading' ? '加载中' : songPlaying ? '暂停' : '听这一句'}
                </button>
                <button
                  onClick={() => setLoopMode(!loopMode)}
                  className={`h-[38px] rounded-full text-[12px] font-black active:scale-95 transition-all ${
                    loopMode
                      ? 'bg-white/20 text-white'
                      : 'bg-white/12 text-white'
                  }`}
                >
                  {loopMode ? '循环中' : '循环'}
                </button>
                <button
                  onClick={() => setSlowMode(!slowMode)}
                  className={`h-[38px] rounded-full text-[12px] font-black active:scale-95 transition-all ${
                    slowMode
                      ? 'bg-white/20 text-white'
                      : 'bg-white/12 text-white'
                  }`}
                >
                  {slowMode ? '慢速 0.75x' : '慢速'}
                </button>
              </div>

              <button
                onClick={() => setShowRoman(!showRoman)}
                className={`text-[11px] font-black px-3 py-1.5 rounded-full transition-all ${
                  showRoman
                    ? 'bg-white/12 text-white'
                    : 'bg-white/8 text-white/40'
                }`}
              >
                罗马音
              </button>

              {/* Admin calibration */}
              {isAdmin && (
                <div className="flex flex-col items-center gap-2 border border-dashed border-[var(--peach-soft)]/40 rounded-xl p-3 bg-[var(--peach-soft)]/5 w-full">
                  <button
                    onClick={() => setCalibrating(!calibrating)}
                    className="text-[10px] font-black text-[var(--peach-soft)] px-2 py-0.5 rounded-full bg-[var(--peach-soft)]/10"
                  >
                    {calibrating ? '关闭校准' : '校准时间轴'}
                  </button>
                  {calibrating && (
                    <>
                      <p className="text-[10px] text-[var(--text-muted)]">
                        偏移: {localOffset > 0 ? '+' : ''}{(localOffset / 1000).toFixed(1)}s
                        {song.timingVerified && ' (已校准)'}
                      </p>
                      <div className="flex items-center gap-2">
                        <button onClick={() => setLocalOffset((o) => o - 100)} className="px-3 py-1.5 rounded-full text-xs font-black bg-[var(--bg-input)] text-[var(--text-secondary)] active:scale-95 transition-all">-0.1s</button>
                        <button onClick={() => setLocalOffset(0)} className="text-[10px] text-[var(--text-muted)] font-bold">归零</button>
                        <button onClick={() => setLocalOffset((o) => o + 100)} className="px-3 py-1.5 rounded-full text-xs font-black bg-[var(--bg-input)] text-[var(--text-secondary)] active:scale-95 transition-all">+0.1s</button>
                      </div>
                      <div className="flex items-center gap-2">
                        <button onClick={saveCalibration} className="px-3 py-1 rounded-full text-[10px] font-black bg-[var(--mint-soft)] text-white active:scale-95 transition-all">保存校准</button>
                        <button onClick={() => { setCalibrating(false); setLocalOffset(song.timingOffsetMs ?? 0); }} className="px-3 py-1 rounded-full text-[10px] text-[var(--text-muted)] font-bold">取消</button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Record button */}
          {phase === 'listen' && !isRecording && (
            <button
              onClick={startRecording}
              className="flex items-center justify-center w-full h-[46px] rounded-2xl bg-white/15 text-white font-black text-[14px] mt-4 active:scale-[0.98] transition-all border border-white/10"
            >
              跟唱录音
            </button>
          )}

          {/* Recording in progress */}
          {isRecording && (
            <div className="flex flex-col items-center gap-3 mt-4">
              <div className="flex items-center gap-2 animate-pulse">
                <span className="w-3 h-3 rounded-full bg-red-400" />
                <span className="text-[14px] font-black text-red-300">录音中...</span>
              </div>
              <button
                onClick={stopRecording}
                className="flex items-center gap-2 px-6 py-3 rounded-full bg-red-500 text-white font-black text-[14px] hover:bg-red-600 active:scale-95 transition-all"
              >
                <Square size={18} />
                停止录音
              </button>
            </div>
          )}

          {/* Phase: review */}
          {phase === 'review' && recordingUrl && (
            <div className="flex flex-col items-center gap-4 mt-4">
              <p className="text-[12px] text-white/50 font-black">你的录音</p>
              {uploadError && (
                <div className="flex items-center gap-1.5 bg-amber-50 border border-amber-200 rounded-lg px-3 py-1.5 text-[10px] text-amber-700 w-full">
                  <AlertTriangle size={12} />
                  {uploadError}
                </div>
              )}
              <div className="flex items-center gap-3">
                <button
                  onClick={playMyRecording}
                  disabled={isPlaying}
                  className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/15 text-white font-black text-[14px] border border-white/10 hover:bg-white/25 disabled:opacity-50 active:scale-95 transition-all"
                >
                  {isPlaying ? <Pause size={18} /> : <Play size={18} />}
                  {isPlaying ? '播放中...' : '播放我的录音'}
                </button>
                {isPlaying && (
                  <button onClick={stopPlayback} className="p-3 rounded-full bg-white/12 text-white hover:bg-white/20">
                    <Square size={16} />
                  </button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={songPlaying ? pauseOriginal : playOriginalSegment}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white/80 text-[12px] font-black hover:bg-white/20 transition-all"
                >
                  <Volume2 size={14} />
                  {songPlaying ? '暂停原唱' : '对比原唱'}
                </button>
                <button
                  onClick={reRecord}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full bg-white/10 text-white/80 text-[12px] font-black hover:bg-white/20 transition-all"
                >
                  <RotateCcw size={14} />
                  重录
                </button>
              </div>
              <button
                onClick={saveSentence}
                disabled={sentenceSaved}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full text-[12px] font-black transition-all ${
                  sentenceSaved
                    ? 'bg-white/10 text-white/50'
                    : 'bg-white/10 text-white/80 hover:bg-white/20'
                }`}
              >
                {sentenceSaved ? <Check size={14} /> : <BookmarkPlus size={14} />}
                {sentenceSaved ? '已保存到资料库' : '保存句子'}
              </button>
              <button
                onClick={markComplete}
                className="flex items-center justify-center w-full h-[44px] rounded-2xl bg-white text-[var(--text-primary)] font-black text-[14px] active:scale-[0.98] transition-all mt-2 shadow-[0_8px_18px_rgba(0,0,0,0.15)]"
              >
                {isCompleted ? '已标记完成' : '标记完成'}
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="flex items-center justify-between px-6 py-4 shrink-0 bg-[var(--bg-card)] border-t border-[var(--border-color)]/50" onClick={(e) => e.stopPropagation()}>
        <button
          onClick={goPrev}
          disabled={lineIndex === 0}
          className="flex items-center gap-1 px-4 py-2.5 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] text-[13px] font-black disabled:opacity-30 hover:bg-[var(--border-color)] transition-all"
        >
          <ChevronLeft size={18} />
          上一句
        </button>

        <span className="text-[12px] text-[var(--text-muted)] font-bold tabular-nums">
          {lineIndex + 1} / {totalLines}
        </span>

        <button
          onClick={goNext}
          disabled={lineIndex === totalLines - 1}
          className="flex items-center justify-center px-5 h-[44px] rounded-2xl bg-[var(--text-primary)] text-white text-[13px] font-black shadow-[0_8px_18px_rgba(32,24,21,0.16)] disabled:opacity-30 disabled:shadow-none active:scale-[0.98] transition-all"
        >
          下一句
        </button>
      </div>
    </div>
  );
}
