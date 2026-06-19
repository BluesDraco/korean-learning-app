'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import type { ShadowingSegment, ShadowingToken, ShadowingPlayMode } from '@/types/shadowing';
import { ytPlay, ytPause, ytSeekTo, ytSetRate } from '@/lib/shadowing/youtube';
import { detectMimeType } from '@/lib/audio/recorder';

const PLAYER_ID = 'yt-player';

interface UsePlayerOptions {
  segments: ShadowingSegment[];
  clipId: string;
}

export function useShadowingPlayer({ segments, clipId }: UsePlayerOptions) {
  const [playMode, setPlayMode] = useState<ShadowingPlayMode>('free');
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [speed, setSpeed] = useState<0.75 | 1.0 | 1.25>(1.0);
  const [recordState, setRecordState] = useState<'idle' | 'recording' | 'recorded'>('idle');
  const [recordedUrl, setRecordedUrl] = useState<string | null>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const [selectedToken, setSelectedToken] = useState<ShadowingToken | null>(null);
  const [currentTime, setCurrentTime] = useState(0);

  const loopingRef = useRef(false);
  const speedRef = useRef<0.75 | 1.0 | 1.25>(1.0);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const recordingAudioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => { loopingRef.current = isLooping; }, [isLooping]);
  useEffect(() => { speedRef.current = speed; }, [speed]);

  const activeIdxRef = useRef(0);
  useEffect(() => { activeIdxRef.current = activeIdx; }, [activeIdx]);

  const handleTimeUpdate = useCallback((secs: number) => {
    setCurrentTime(secs);
    const ms = secs * 1000;
    if (loopingRef.current) {
      // A-B loop: seek back to startMs when we pass endMs
      const seg = segments[activeIdxRef.current];
      if (seg && ms >= seg.endMs) {
        ytSeekTo(PLAYER_ID, seg.startMs / 1000);
      }
      return;
    }
    setActiveIdx(prev => {
      for (let i = 0; i < segments.length; i++) {
        if (ms >= segments[i].startMs && ms < segments[i].endMs) return i;
      }
      return prev;
    });
  }, [segments]);

  const handleStateChange = useCallback((state: number) => {
    setIsPlaying(state === 1);
    if (state === 0) { setIsLooping(false); loopingRef.current = false; }
  }, []);

  const goToSegment = useCallback((idx: number) => {
    const clamped = Math.max(0, Math.min(idx, segments.length - 1));
    setActiveIdx(clamped);
    if (segments[clamped]) ytSeekTo(PLAYER_ID, segments[clamped].startMs / 1000);
  }, [segments]);

  const prevSentence = useCallback(() => {
    setIsLooping(false); loopingRef.current = false;
    goToSegment(activeIdxRef.current - 1);
    setPlayMode('listen');
    ytPause(PLAYER_ID);
  }, [goToSegment]);

  const nextSentence = useCallback(() => {
    setIsLooping(false); loopingRef.current = false;
    goToSegment(activeIdxRef.current + 1);
    setPlayMode('listen');
    ytPause(PLAYER_ID);
  }, [goToSegment]);

  const selectSegment = useCallback((idx: number) => {
    setIsLooping(false); loopingRef.current = false;
    setPlayMode('listen');
    setActiveIdx(idx);
    ytPause(PLAYER_ID);
    if (segments[idx]) ytSeekTo(PLAYER_ID, segments[idx].startMs / 1000);
  }, [segments]);

  const playOriginal = useCallback((slow = false) => {
    const seg = segments[activeIdxRef.current];
    if (!seg) return;
    const rate = slow ? 0.75 : speedRef.current;
    ytSetRate(PLAYER_ID, rate);
    ytSeekTo(PLAYER_ID, seg.startMs / 1000);
    ytPlay(PLAYER_ID);
  }, [segments]);

  const toggleLoop = useCallback(() => {
    const next = !loopingRef.current;
    loopingRef.current = next;
    setIsLooping(next);
    if (next) {
      const seg = segments[activeIdxRef.current];
      if (seg) { ytSeekTo(PLAYER_ID, seg.startMs / 1000); ytPlay(PLAYER_ID); }
    } else {
      ytPause(PLAYER_ID);
    }
  }, [segments]);

  const toggleFreePlay = useCallback(() => {
    if (isPlaying) { ytPause(PLAYER_ID); setPlayMode('listen'); }
    else { ytPlay(PLAYER_ID); setPlayMode('free'); }
  }, [isPlaying]);

  const cycleSpeed = useCallback(() => {
    const next = speed === 1.0 ? 0.75 : speed === 0.75 ? 1.25 : 1.0;
    setSpeed(next); speedRef.current = next; ytSetRate(PLAYER_ID, next);
  }, [speed]);

  const mountedRef = useRef(true);
  const streamRef = useRef<MediaStream | null>(null);
  useEffect(() => { return () => { mountedRef.current = false; }; }, []);

  const startRecord = useCallback(async () => {
    ytPause(PLAYER_ID);
    setPlayMode('record');
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      if (!mountedRef.current) { stream.getTracks().forEach(t => t.stop()); return; }
      streamRef.current = stream;
      chunksRef.current = [];
      const mimeType = detectMimeType();
      const mr = mimeType ? new MediaRecorder(stream, { mimeType }) : new MediaRecorder(stream);
      mediaRecorderRef.current = mr;
      mr.ondataavailable = e => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      mr.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        streamRef.current = null;
        const blob = new Blob(chunksRef.current, { type: mr.mimeType || 'audio/webm' });
        const url = URL.createObjectURL(blob);
        if (!mountedRef.current) { URL.revokeObjectURL(url); return; }
        setRecordedUrl(url);
        setRecordState('recorded');
        setPlayMode('listen');
      };
      mr.start();
      setRecordState('recording');
    } catch {
      if (!mountedRef.current) return;
      setPlayMode('listen');
      setRecordState('idle');
    }
  }, []);

  const stopRecord = useCallback((onStopped?: () => void) => {
    if (onStopped && mediaRecorderRef.current) {
      const mr = mediaRecorderRef.current;
      const original = mr.onstop;
      mr.onstop = (e) => {
        if (original) (original as (e: Event) => void)(e);
        onStopped();
      };
    }
    mediaRecorderRef.current?.stop();
  }, []);

  const handleRecord = useCallback(async () => {
    if (recordState === 'recording') { stopRecord(); return; }
    setRecordedUrl(prev => { if (prev) URL.revokeObjectURL(prev); return null; });
    setRecordState('idle');
    await startRecord();
  }, [recordState, startRecord, stopRecord]);

  const playRecording = useCallback(() => {
    if (!recordedUrl) return;
    if (isPlayingRecording) {
      recordingAudioRef.current?.pause();
      setIsPlayingRecording(false);
      return;
    }
    if (recordingAudioRef.current) {
      recordingAudioRef.current.onended = null;
      recordingAudioRef.current.pause();
    }
    const audio = new Audio(recordedUrl);
    recordingAudioRef.current = audio;
    audio.onended = () => setIsPlayingRecording(false);
    audio.play().catch(() => setIsPlayingRecording(false));
    setIsPlayingRecording(true);
  }, [recordedUrl, isPlayingRecording]);

  const openToken = useCallback((token: ShadowingToken) => {
    ytPause(PLAYER_ID); setSelectedToken(token); setPlayMode('analyze');
  }, []);

  const closeToken = useCallback(() => {
    setSelectedToken(null); setPlayMode('listen');
  }, []);

  useEffect(() => {
    return () => {
      recordingAudioRef.current?.pause();
      if (mediaRecorderRef.current?.state === 'recording') {
        mediaRecorderRef.current.stop();
      }
      streamRef.current?.getTracks().forEach(t => t.stop());
    };
  }, []);

  const hasRestoredRef = useRef(false);

  useEffect(() => {
    if (!clipId) return;
    try {
      const saved = localStorage.getItem('shadowing_progress_' + clipId);
      if (saved) {
        const p = JSON.parse(saved);
        if (typeof p.lastSegIndex === 'number') setActiveIdx(p.lastSegIndex);
      }
    } catch {}
    hasRestoredRef.current = true;
  }, [clipId]);

  useEffect(() => {
    if (!clipId || segments.length === 0) return;
    // skip the first fire caused by progress restore
    if (!hasRestoredRef.current) return;
    try {
      const existing = localStorage.getItem('shadowing_progress_' + clipId);
      const prev = existing ? JSON.parse(existing) : {};
      const completedSegs: number[] = prev.completedSegs ?? [];
      if (!completedSegs.includes(activeIdx)) completedSegs.push(activeIdx);
      localStorage.setItem('shadowing_progress_' + clipId, JSON.stringify({
        ...prev, lastSegIndex: activeIdx, completedSegs,
        lastStudiedAt: Date.now(),
        status: completedSegs.length >= segments.length ? 'completed' : 'in_progress',
      }));
    } catch {}
  }, [activeIdx, clipId, segments.length]);

  return {
    playMode, activeIdx, isPlaying, isLooping, speed, currentTime,
    recordState, recordedUrl, isPlayingRecording, selectedToken,
    handleTimeUpdate, handleStateChange,
    selectSegment, prevSentence, nextSentence, goToSegment,
    playOriginal, toggleLoop, toggleFreePlay, cycleSpeed,
    handleRecord, stopRecord, playRecording, openToken, closeToken,
    setPlayMode, PLAYER_ID,
  };
}
