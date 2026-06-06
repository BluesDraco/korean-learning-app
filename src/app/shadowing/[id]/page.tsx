'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Loader2, Eye, EyeOff, Upload, Bookmark, BookmarkCheck, Film,
} from 'lucide-react';
import { db } from '@/lib/db';
import { tokenizeKorean, romanize, lookupWord, type TokenInfo } from '@/lib/dictionary';
import { parseSrt } from '@/lib/srt';
import { VideoPlayer, type VideoPlayerHandle } from '@/components/VideoPlayer';
import { SubtitlePanel } from '@/components/SubtitlePanel';
import { SpeedSelector } from '@/components/SpeedSelector';
import { ShadowingBar } from '@/components/ShadowingBar';
import { WordCard, type WordCardData } from '@/components/WordCard';
import { getCharDiff } from '@/lib/koreanDiff';
import { AudioRecorder, isRecordingSupported, revokeRecording } from '@/lib/audio/recorder';
import { useAuth } from '@/components/AuthProvider';
import { useFeedback } from '@/hooks/useFeedback';
import type { StudyVideo, StudySubtitle, Word } from '@/types';

type SubtitleMode = 'bilingual' | 'korean' | 'chinese' | 'hidden';
const MODE_LABELS: Record<SubtitleMode, string> = { bilingual: '韩中', korean: '韩', chinese: '中', hidden: '隐藏' };
const MODE_CYCLE: SubtitleMode[] = ['bilingual', 'korean', 'chinese', 'hidden'];

const PROGRESS_KEY = 'shadowing_progress';

export default function ShadowingPlayerPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const playerRef = useRef<VideoPlayerHandle>(null);
  const { user } = useAuth();
  const { click: feedbackClick, success: feedbackSuccess, error: feedbackError } = useFeedback();

  const [video, setVideo] = useState<StudyVideo | null>(null);
  const [subtitles, setSubtitles] = useState<StudySubtitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [subtitleMode, setSubtitleMode] = useState<SubtitleMode>('bilingual');
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loopIndex, setLoopIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [studyStartTime] = useState(Date.now());

  // Word card
  const [wordData, setWordData] = useState<WordCardData | null>(null);
  const [wordLoading, setWordLoading] = useState(false);

  // Shadowing — recording state machine: idle → recording → recorded
  const [recordState, setRecordState] = useState<'idle' | 'recording' | 'recorded'>('idle');
  const [shadowingTarget, setShadowingTarget] = useState<StudySubtitle | null>(null);
  const [shadowingFeedback, setShadowingFeedback] = useState<{
    userDiff: { char: string; status: 'correct' | 'wrong' | 'extra' | 'missing' }[];
    correctDiff: { char: string; status: 'correct' | 'wrong' | 'extra' | 'missing' }[];
    notes: string[];
    transcript: string;
  } | null>(null);
  const [recordedAudioUrl, setRecordedAudioUrl] = useState<string | null>(null);
  const [isPlayingRecording, setIsPlayingRecording] = useState(false);
  const recognitionRef = useRef<any>(null);
  const recorderRef = useRef<AudioRecorder | null>(null);
  const audioPlaybackRef = useRef<HTMLAudioElement | null>(null);

  // Saved state
  const [savedSentences, setSavedSentences] = useState<Set<number>>(new Set());
  const [completedSegments, setCompletedSegments] = useState<Set<number>>(new Set());

  // SRT upload
  const [showSrtUpload, setShowSrtUpload] = useState(false);
  const [srtUploading, setSrtUploading] = useState(false);

  // Timer ref for subtitle sync
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(0);
  const playStartWallRef = useRef(0);
  const playBaseTimeRef = useRef(0);

  // Load video + subtitles + progress
  useEffect(() => {
    (async () => {
      try {
        const v = await db.studyVideos.get(id);
        if (!v) { setLoadError('视频未找到，可能已被删除'); setLoading(false); return; }
        setVideo(v);

        const subs = await db.studySubtitles.where('videoId').equals(id).sortBy('index');
        setSubtitles(subs);
        if (subs.length === 0) setShowSrtUpload(true);

        // Restore progress from localStorage
        try {
          const raw = localStorage.getItem(`${PROGRESS_KEY}_${id}`);
          if (raw) {
            const prog = JSON.parse(raw);
            if (prog.completedIndices) setCompletedSegments(new Set(prog.completedIndices));
            if (prog.savedSentenceIndices) setSavedSentences(new Set(prog.savedSentenceIndices));
          }
        } catch {}
      } catch {
        setLoadError('加载失败，请检查网络连接后重试');
      } finally {
        setLoading(false);
      }
    })();
  }, [id, router]);

  // Persist progress
  const persistProgress = useCallback((completed: Set<number>, saved: Set<number>) => {
    try {
      localStorage.setItem(`${PROGRESS_KEY}_${id}`, JSON.stringify({
        clipId: id,
        completedIndices: [...completed],
        savedSentenceIndices: [...saved],
        updatedAt: Date.now(),
      }));
    } catch {}
  }, [id]);

  // Timer for subtitle sync
  useEffect(() => {
    if (isPlaying) {
      playStartWallRef.current = performance.now();
      playBaseTimeRef.current = elapsedRef.current;

      timerRef.current = setInterval(() => {
        const elapsed = playBaseTimeRef.current + (performance.now() - playStartWallRef.current) / 1000;
        elapsedRef.current = elapsed;

        const idx = subtitles.findIndex(
          (s) => elapsed >= s.start && elapsed < s.end
        );
        setActiveIndex((prev) => (idx !== prev ? idx : prev));

        if (loopIndex !== null && loopIndex < subtitles.length) {
          const loopSub = subtitles[loopIndex];
          if (elapsed >= loopSub.end) {
            elapsedRef.current = loopSub.start;
            playBaseTimeRef.current = loopSub.start;
            playStartWallRef.current = performance.now();
            playerRef.current?.seekTo(loopSub.start);
          }
        }
      }, 100);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [isPlaying, subtitles, loopIndex]);

  // Save study log on unmount
  const videoRef = useRef(video);
  videoRef.current = video;

  useEffect(() => {
    return () => {
      const currentVideo = videoRef.current;
      const duration = Math.round((Date.now() - studyStartTime) / 1000);
      if (duration > 5 && currentVideo) {
        db.videoStudyLogs.put({
          id: crypto.randomUUID(),
          videoId: currentVideo.id,
          date: Date.now(),
          durationSec: duration,
          wordsAdded: [],
          sentencesLooped: 0,
        }).catch(() => {});
        fetch('/api/track/study', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'shadowing', details: `影子跟读: ${currentVideo.title}`, xpEarned: 0 }),
        }).catch(() => {});
        db.studyVideos.update(currentVideo.id, { lastStudiedAt: Date.now() });
      }
      // Cleanup recording resources
      if (recordedAudioUrl) revokeRecording(recordedAudioUrl);
      if (audioPlaybackRef.current) {
        audioPlaybackRef.current.pause();
        audioPlaybackRef.current = null;
      }
    };
  }, [studyStartTime]);

  // ── Handlers ──────────────────────────────────────

  const handleSubtitleClick = (index: number) => {
    feedbackClick();
    const sub = subtitles[index];
    if (!sub) return;
    setActiveIndex(index);
    elapsedRef.current = sub.start;
    playerRef.current?.seekTo(sub.start);
  };

  const handleWordClick = async (token: TokenInfo) => {
    if (!token.isKoreanWord) return;
    feedbackClick();
    setWordLoading(true);
    setWordData(null);

    const lookupText = token.dictionaryForm || token.text;
    const existing = await db.words.where('word').equals(lookupText).first();

    try {
      let result;
      try {
        const res = await fetch('/api/shadowing/word-lookup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ word: token.text }),
        });
        if (res.ok) {
          result = await res.json();
        } else {
          throw new Error('API failed');
        }
      } catch {
        result = await lookupWord(token.text);
      }

      setWordData({
        originalText: token.text,
        dictionaryForm: result.dictionaryForm || lookupText,
        conjugation: result.conjugation || token.conjugation || '未知',
        pronunciation: result.pronunciation || '',
        meaning: result.meaning || '',
        partOfSpeech: result.partOfSpeech || '未知',
        example: result.example || { text: '', translation: '' },
        alreadySaved: !!existing,
      });
    } catch {
      setWordData({
        originalText: token.text,
        dictionaryForm: lookupText,
        conjugation: token.conjugation || '未知',
        pronunciation: '',
        meaning: '查询失败，请重试',
        partOfSpeech: '未知',
        example: { text: '', translation: '' },
        alreadySaved: !!existing,
      });
    } finally {
      setWordLoading(false);
    }
  };

  const handleAddWord = async () => {
    if (!wordData || !video || wordData.alreadySaved) return;
    feedbackClick();
    const newWord: Word = {
      id: crypto.randomUUID(),
      word: wordData.dictionaryForm,
      pronunciation: wordData.pronunciation,
      meaning: wordData.meaning,
      partOfSpeech: wordData.partOfSpeech,
      examples: [{ text: wordData.example.text, translation: wordData.example.translation, source: 'video' as const }],
      mastery: 'new',
      srsLevel: 0,
      easeFactor: 2.5,
      interval: 0,
      createdAt: Date.now(),
      lastReviewed: null,
      nextReview: Date.now(),
    };
    await db.words.put(newWord);
    setWordData((prev) => prev ? { ...prev, alreadySaved: true } : null);
    feedbackSuccess('已加入单词本');
  };

  const handleLoopClick = (index: number) => {
    feedbackClick();
    if (loopIndex === index) {
      setLoopIndex(null);
      setShadowingTarget(null);
      setRecordState('idle');
      setShadowingFeedback(null);
      if (recordedAudioUrl) { revokeRecording(recordedAudioUrl); setRecordedAudioUrl(null); }
      return;
    }
    setLoopIndex(index);
    const sub = subtitles[index];
    if (sub) {
      elapsedRef.current = sub.start;
      playerRef.current?.seekTo(sub.start);
      setIsPlaying(true);
      setShadowingTarget(sub);
      setRecordState('idle');
      setShadowingFeedback(null);
      if (recordedAudioUrl) { revokeRecording(recordedAudioUrl); setRecordedAudioUrl(null); }
    }
  };

  const handleListen = () => {
    feedbackClick();
    if (!shadowingTarget) return;
    // Stop any playback
    if (audioPlaybackRef.current) { audioPlaybackRef.current.pause(); setIsPlayingRecording(false); }
    elapsedRef.current = shadowingTarget.start;
    playerRef.current?.seekTo(shadowingTarget.start);
    setIsPlaying(true);
  };

  const handleRecord = async () => {
    feedbackClick();

    if (recordState === 'recording') {
      // Stop recording
      const recResult = await recorderRef.current?.stop();
      recognitionRef.current?.stop();

      if (recResult) {
        setRecordedAudioUrl(recResult.url);
      }
      setRecordState('recorded');
      return;
    }

    if (recordState === 'recorded') {
      // Retry: clear previous recording
      if (recordedAudioUrl) { revokeRecording(recordedAudioUrl); setRecordedAudioUrl(null); }
      if (audioPlaybackRef.current) { audioPlaybackRef.current.pause(); setIsPlayingRecording(false); }
      setShadowingFeedback(null);
    }

    // Start recording: AudioRecorder + SpeechRecognition simultaneously
    if (!isRecordingSupported()) {
      feedbackError('此浏览器不支持录音');
      return;
    }

    // Start AudioRecorder
    const recorder = new AudioRecorder(15000);
    recorderRef.current = recorder;
    const startResult = await recorder.start();
    if (startResult.error) {
      feedbackError(startResult.error);
      return;
    }

    // Start SpeechRecognition for transcript comparison
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      try {
        const recognition = new SpeechRecognition();
        recognition.lang = 'ko-KR';
        recognition.interimResults = false;
        recognition.maxAlternatives = 1;
        recognitionRef.current = recognition;

        recognition.onresult = (event: any) => {
          const transcript = event.results[0][0].transcript.trim();
          if (shadowingTarget) {
            const diff = getCharDiff(transcript, shadowingTarget.text);
            setShadowingFeedback({ ...diff, transcript });
          }
        };

        recognition.onerror = () => {};
        recognition.onend = () => {};
        recognition.start();
      } catch {}
    }

    setRecordState('recording');
  };

  const handlePlayRecording = () => {
    if (!recordedAudioUrl) return;
    if (isPlayingRecording) {
      audioPlaybackRef.current?.pause();
      setIsPlayingRecording(false);
      return;
    }

    // Pause video if playing
    if (isPlaying) {
      playerRef.current?.pauseVideo();
      setIsPlaying(false);
    }

    const audio = audioPlaybackRef.current || new Audio(recordedAudioUrl);
    audioPlaybackRef.current = audio;
    audio.onended = () => setIsPlayingRecording(false);
    audio.onerror = () => { setIsPlayingRecording(false); feedbackError('播放失败'); };
    audio.play().catch(() => feedbackError('播放失败'));
    setIsPlayingRecording(true);
  };

  const handleSaveSentence = async () => {
    if (!shadowingTarget || !video) return;

    if (!user) {
      feedbackError('请先登录');
      return;
    }

    feedbackClick();
    const idx = subtitles.findIndex((s) => s.id === shadowingTarget.id);
    const isSaved = savedSentences.has(idx);

    setSavedSentences((prev) => {
      const next = new Set(prev);
      if (isSaved) next.delete(idx); else next.add(idx);
      persistProgress(completedSegments, next);
      return next;
    });

    if (!isSaved) {
      try {
        await db.sentences.put({
          id: crypto.randomUUID(),
          userId: user.id,
          korean: shadowingTarget.text,
          chinese: shadowingTarget.textZh,
          sourceType: 'shadowing',
          sourceId: video.id,
          sourceTitle: video.title,
          startTime: shadowingTarget.start,
          endTime: shadowingTarget.end,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        feedbackSuccess('已保存句子');
      } catch {
        feedbackError('保存失败');
      }
    }
  };

  const handleSaveRecording = async () => {
    if (!recordedAudioUrl || !shadowingTarget || !video) return;

    if (!user) {
      feedbackError('请先登录');
      return;
    }

    feedbackClick();
    try {
      // Fetch the blob from the URL and convert to base64 for localStorage persistence
      const response = await fetch(recordedAudioUrl);
      const blob = await response.blob();
      const reader = new FileReader();
      const base64 = await new Promise<string>((resolve) => {
        reader.onloadend = () => resolve(reader.result as string);
        reader.readAsDataURL(blob);
      });

      await db.recordings.put({
        id: crypto.randomUUID(),
        userId: user.id,
        type: 'shadowing',
        sourceId: video.id,
        sourceType: 'shadowing',
        lineId: shadowingTarget.id,
        korean: shadowingTarget.text,
        audioUrl: '',
        audioData: base64,
        durationMs: 0,
        createdAt: Date.now(),
        updatedAt: Date.now(),
      });
      feedbackSuccess('录音已保存');
    } catch {
      feedbackError('保存录音失败');
    }
  };

  const handleShadowingNext = () => {
    feedbackClick();
    if (loopIndex === null) return;

    // Mark current as completed
    setCompletedSegments((prev) => {
      const next = new Set(prev);
      next.add(loopIndex);
      persistProgress(next, savedSentences);
      return next;
    });

    const nextIdx = loopIndex + 1;
    setShadowingFeedback(null);
    setRecordState('idle');
    if (recordedAudioUrl) { revokeRecording(recordedAudioUrl); setRecordedAudioUrl(null); }
    if (audioPlaybackRef.current) { audioPlaybackRef.current.pause(); setIsPlayingRecording(false); }

    if (nextIdx < subtitles.length) {
      const sub = subtitles[nextIdx];
      handleLoopClick(nextIdx);
      setShadowingTarget(sub);
    } else {
      setLoopIndex(null);
      setShadowingTarget(null);
      feedbackSuccess('全部完成!');
    }
  };

  const handleExitShadowing = () => {
    setShadowingTarget(null);
    setLoopIndex(null);
    setIsPlaying(false);
    setShadowingFeedback(null);
    setRecordState('idle');
    if (recordedAudioUrl) { revokeRecording(recordedAudioUrl); setRecordedAudioUrl(null); }
    if (audioPlaybackRef.current) { audioPlaybackRef.current.pause(); setIsPlayingRecording(false); }
  };

  const handleSrtUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !video) return;
    setSrtUploading(true);
    try {
      const text = await file.text();
      const entries = parseSrt(text);

      const subsToSave: StudySubtitle[] = [];
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        let textZh = '';

        try {
          const res = await fetch('/api/shadowing/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: entry.text }),
          });
          if (res.ok) {
            const data = await res.json();
            textZh = data.translation;
          }
        } catch {}

        const tokens = tokenizeKorean(entry.text);

        subsToSave.push({
          id: crypto.randomUUID(),
          videoId: video.id,
          index: i,
          start: entry.start,
          end: entry.end,
          text: entry.text,
          textZh,
          tokens: JSON.stringify(tokens),
        });
      }

      await db.studySubtitles.bulkPut(subsToSave);
      await db.studyVideos.update(video.id, { subtitleSource: 'manual' });
      setSubtitles(subsToSave);
      setShowSrtUpload(false);
    } catch (err) {
      console.error('SRT upload failed:', err);
    } finally {
      setSrtUploading(false);
    }
  };

  const handlePlayToggle = () => {
    feedbackClick();
    if (isPlaying) {
      playerRef.current?.pauseVideo();
    } else {
      playerRef.current?.playVideo();
      if (activeIndex >= 0 && subtitles[activeIndex]) {
        elapsedRef.current = subtitles[activeIndex].start;
      } else {
        elapsedRef.current = 0;
      }
    }
    setIsPlaying(!isPlaying);
  };

  // ── Render ──────────────────────────────────────

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 size={32} className="animate-spin text-[var(--text-secondary)]" />
      </div>
    );
  }

  if (loadError || !video) {
    return (
      <div className="flex flex-col items-center justify-center py-32 px-4 space-y-4">
        <Film size={48} className="text-[var(--text-muted)]/40" />
        <p className="text-sm text-[var(--text-secondary)]">{loadError || '视频未找到'}</p>
        <Link href="/shadowing" className="text-sm font-bold text-[var(--pink-primary)] hover:underline">返回影子跟读首页</Link>
      </div>
    );
  }

  const savedSentenceCount = savedSentences.size;
  const completedCount = completedSegments.size;

  return (
    <div className="flex flex-col h-[calc(100dvh-4rem)]">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 shrink-0">
        <Link href="/shadowing" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold text-[var(--text-primary)] truncate">{video.title}</h1>
          {subtitles.length > 0 && (
            <p className="text-[11px] text-[var(--text-muted)]">
              {completedCount}/{subtitles.length} 句已完成
              {savedSentenceCount > 0 && ` · ${savedSentenceCount} 句已保存`}
            </p>
          )}
        </div>
      </div>

      {/* Video player */}
      <div className="shrink-0 px-2 max-h-[45vh] md:max-h-none">
        <VideoPlayer ref={playerRef} embedUrl={video.platform === 'bilibili'
          ? `https://player.bilibili.com/player.html?bvid=${video.platformId}&page=1&high_quality=1&autoplay=0`
          : `https://www.youtube.com/embed/${video.platformId}?enablejsapi=1&controls=1&modestbranding=1&rel=0`
        } platform={video.platform} />
      </div>

      {/* Subtitle timeline */}
      {subtitles.length > 0 && (
        <div className="shrink-0 px-4">
          <div className="flex items-end gap-[2px] h-8 w-full">
            {(() => {
              const totalEnd = subtitles[subtitles.length - 1]?.end || 1;
              return subtitles.map((sub, i) => {
                const width = Math.max(((sub.end - sub.start) / totalEnd) * 100, 0.3);
                const isActive = activeIndex === i;
                const isLooping = loopIndex === i;
                const isCompleted = completedSegments.has(i);
                return (
                  <div
                    key={sub.id}
                    className={`h-full rounded-[1px] cursor-pointer transition-colors hover:opacity-80 ${
                      isLooping
                        ? 'bg-[var(--peach-soft)]'
                        : isCompleted
                          ? 'bg-[var(--mint-soft)]/70'
                          : isActive
                            ? 'bg-[var(--pink-primary)]'
                            : 'bg-[var(--border-default)]'
                    }`}
                    style={{ width: `${width}%` }}
                    onClick={() => handleSubtitleClick(i)}
                    title={`${formatSrt(sub.start)} ${sub.text.slice(0, 30)}`}
                  />
                );
              });
            })()}
          </div>
          <div className="flex justify-between text-[10px] text-[var(--text-muted)] mt-1">
            <span>{formatSrt(0)}</span>
            <span>{formatSrt(subtitles[subtitles.length - 1]?.end || 0)}</span>
          </div>
        </div>
      )}

      {/* Toolbar */}
      <div className="flex items-center gap-2 px-4 py-2 shrink-0 flex-wrap">
        <button
          onClick={handlePlayToggle}
          className="text-xs px-3 py-1.5 rounded-lg bg-[var(--pink-primary)] text-[var(--text-primary)] font-medium hover:opacity-90 transition-opacity"
        >
          {isPlaying ? '暂停同步' : '开始学习'}
        </button>

        <button
          onClick={() => setSubtitleMode(MODE_CYCLE[(MODE_CYCLE.indexOf(subtitleMode) + 1) % MODE_CYCLE.length])}
          className={`text-xs px-2.5 py-1.5 rounded-lg transition-colors ${
            subtitleMode === 'hidden'
              ? 'bg-[var(--bg-input)] text-[var(--text-muted)]'
              : 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]'
          } flex items-center gap-1.5 hover:opacity-80`}
        >
          {subtitleMode === 'hidden' ? <EyeOff size={12} /> : <Eye size={12} />}
          {MODE_LABELS[subtitleMode]}
        </button>

        <SpeedSelector current={playbackRate} onSelect={(r) => {
          setPlaybackRate(r);
          playerRef.current?.setPlaybackRate(r);
        }} platform={video.platform} />

        <div className="flex-1" />

        {subtitles.length === 0 && (
          <button
            onClick={() => setShowSrtUpload(true)}
            className="text-xs px-2.5 py-1.5 rounded-lg bg-[var(--peach-soft)]/15 text-[var(--peach-soft)] flex items-center gap-1.5 font-medium hover:opacity-80"
          >
            <Upload size={12} />
            上传SRT字幕
          </button>
        )}
      </div>

      {/* Subtitle area */}
      <div className="flex-1 overflow-y-auto px-2 pb-4">
        <SubtitlePanel
          subtitles={subtitles}
          activeIndex={activeIndex}
          subtitleMode={subtitleMode}
          onSubtitleClick={handleSubtitleClick}
          onWordClick={handleWordClick}
          onLoopClick={handleLoopClick}
          loopIndex={loopIndex}
        />
      </div>

      {/* Shadowing bar */}
      {shadowingTarget && (
        <div className="shrink-0">
          <ShadowingBar
            korean={shadowingTarget.text}
            pronunciation={(() => {
              try { return romanize(shadowingTarget.text); } catch { return ''; }
            })()}
            chinese={shadowingTarget.textZh}
            recordState={recordState}
            recordedAudioUrl={recordedAudioUrl}
            isPlayingRecording={isPlayingRecording}
            isSentenceSaved={savedSentences.has(subtitles.findIndex((s) => s.id === shadowingTarget.id))}
            isAuthenticated={!!user}
            onListen={handleListen}
            onRecord={handleRecord}
            onPlayRecording={handlePlayRecording}
            onSaveSentence={handleSaveSentence}
            onSaveRecording={handleSaveRecording}
            onNext={handleShadowingNext}
            onExit={handleExitShadowing}
            feedback={shadowingFeedback}
          />
        </div>
      )}

      {/* SRT upload modal */}
      {showSrtUpload && (
        <div className="fixed inset-0 z-50 flex items-center justify-center" onClick={() => setShowSrtUpload(false)}>
          <div className="absolute inset-0 bg-black/60" />
          <div className="relative bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 w-80 mx-4" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-[var(--text-primary)] mb-2">导入SRT字幕</h3>
            <p className="text-xs text-[var(--text-secondary)] mb-4">
              支持标准SRT格式。双语SRT请将韩文放第一行，中文放第二行。
            </p>
            <label className="block w-full py-3 px-4 rounded-xl bg-[var(--bg-input)] border-2 border-dashed border-[var(--border-color)] text-center cursor-pointer hover:border-[var(--pink-primary)] transition-colors">
              {srtUploading ? (
                <span className="flex items-center justify-center gap-2 text-sm text-[var(--text-secondary)]">
                  <Loader2 size={16} className="animate-spin" />
                  导入中...
                </span>
              ) : (
                <span className="text-sm text-[var(--text-secondary)]">点击选择SRT文件</span>
              )}
              <input type="file" accept=".srt,.vtt" onChange={handleSrtUpload} className="hidden" disabled={srtUploading} />
            </label>
          </div>
        </div>
      )}

      {/* Word card modal */}
      <WordCard
        data={wordData}
        loading={wordLoading}
        onClose={() => setWordData(null)}
        onAdd={handleAddWord}
      />
    </div>
  );
}

function formatSrt(sec: number): string {
  const m = Math.floor(sec / 60);
  const s = Math.floor(sec % 60);
  return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
