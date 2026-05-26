'use client';

import { useEffect, useState, useRef, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Loader2, Eye, EyeOff, Upload, Plus, Check,
} from 'lucide-react';
import { db } from '@/lib/db';
import { tokenizeKorean, romanize, lookupWord, type TokenInfo } from '@/lib/dictionary';
import { parseSrt } from '@/lib/srt';
import { VideoPlayer, type VideoPlayerHandle } from '@/components/VideoPlayer';
import { SubtitlePanel } from '@/components/SubtitlePanel';
import { SpeedSelector } from '@/components/SpeedSelector';
import { ShadowingBar } from '@/components/ShadowingBar';
import { WordCard, type WordCardData } from '@/components/WordCard';
import type { StudyVideo, StudySubtitle, StudyLog, Word } from '@/types';

type SubtitleMode = 'bilingual' | 'korean' | 'chinese' | 'hidden';
const MODE_LABELS: Record<SubtitleMode, string> = { bilingual: '韩中', korean: '韩', chinese: '中', hidden: '隐藏' };
const MODE_CYCLE: SubtitleMode[] = ['bilingual', 'korean', 'chinese', 'hidden'];

export default function ShadowingPlayerPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const playerRef = useRef<VideoPlayerHandle>(null);

  const [video, setVideo] = useState<StudyVideo | null>(null);
  const [subtitles, setSubtitles] = useState<StudySubtitle[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [subtitleMode, setSubtitleMode] = useState<SubtitleMode>('bilingual');
  const [playbackRate, setPlaybackRate] = useState(1);
  const [loopIndex, setLoopIndex] = useState<number | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [studyStartTime] = useState(Date.now());

  // Word card
  const [wordData, setWordData] = useState<WordCardData | null>(null);
  const [wordLoading, setWordLoading] = useState(false);

  // Shadowing
  const [isRecording, setIsRecording] = useState(false);
  const [shadowingTarget, setShadowingTarget] = useState<StudySubtitle | null>(null);

  // SRT upload
  const [showSrtUpload, setShowSrtUpload] = useState(false);
  const [srtUploading, setSrtUploading] = useState(false);

  // Timer ref for subtitle sync
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const elapsedRef = useRef(0); // track elapsed seconds

  // Load video + subtitles
  useEffect(() => {
    (async () => {
      const v = await db.studyVideos.get(id);
      if (!v) { router.push('/shadowing'); return; }
      setVideo(v);

      const subs = await db.studySubtitles.where('videoId').equals(id).sortBy('index');
      setSubtitles(subs);
      if (subs.length === 0) setShowSrtUpload(true);

      setLoading(false);
    })();
  }, [id, router]);

  // Timer for subtitle sync
  useEffect(() => {
    if (isPlaying) {
      timerRef.current = setInterval(() => {
        elapsedRef.current += 0.1;
        // Find matching subtitle
        const idx = subtitles.findIndex(
          (s) => elapsedRef.current >= s.start && elapsedRef.current < s.end
        );
        setActiveIndex((prev) => (idx !== prev ? idx : prev));

        // Loop mode: restart sentence
        if (loopIndex !== null && loopIndex < subtitles.length) {
          const loopSub = subtitles[loopIndex];
          if (elapsedRef.current >= loopSub.end) {
            elapsedRef.current = loopSub.start;
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
  useEffect(() => {
    return () => {
      const duration = Math.round((Date.now() - studyStartTime) / 1000);
      if (duration > 5 && video) {
        db.studyLogs.put({
          id: crypto.randomUUID(),
          videoId: video.id,
          date: Date.now(),
          durationSec: duration,
          wordsAdded: [],
          sentencesLooped: 0,
        }).catch(() => {});
        // Update lastStudiedAt
        db.studyVideos.update(video.id, { lastStudiedAt: Date.now() });
      }
    };
  }, []);

  // ── Handlers ──────────────────────────────────────

  const handleSubtitleClick = (index: number) => {
    const sub = subtitles[index];
    if (!sub) return;
    setActiveIndex(index);
    elapsedRef.current = sub.start;
    playerRef.current?.seekTo(sub.start);
  };

  const handleWordClick = async (token: TokenInfo, _subIdx: number) => {
    if (!token.isKoreanWord) return;
    setWordLoading(true);
    setWordData(null);

    const lookupText = token.dictionaryForm || token.text;
    const existing = await db.words.where('word').equals(lookupText).first();

    try {
      // Try DeepSeek API first, fallback to local lookup
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
  };

  const handleLoopClick = (index: number) => {
    if (loopIndex === index) {
      setLoopIndex(null);
      setShadowingTarget(null);
      return;
    }
    setLoopIndex(index);
    const sub = subtitles[index];
    if (sub) {
      elapsedRef.current = sub.start;
      playerRef.current?.seekTo(sub.start);
      setIsPlaying(true);
    }
  };

  const handleStartShadowing = () => {
    if (loopIndex === null || !subtitles[loopIndex]) return;
    setShadowingTarget(subtitles[loopIndex]);
  };

  const handleListen = () => {
    if (!shadowingTarget) return;
    elapsedRef.current = shadowingTarget.start;
    playerRef.current?.seekTo(shadowingTarget.start);
    setIsPlaying(true);
  };

  const handleRecord = async () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setIsRecording(true);
      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];
      mediaRecorder.ondataavailable = (e) => chunks.push(e.data);
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach((t) => t.stop());
        // Recording saved — comparison will be v2
      };
      mediaRecorder.start();
      setTimeout(() => mediaRecorder.stop(), 5000); // 5 second recording
    } catch {
      // Microphone access denied
    }
  };

  const handleShadowingNext = () => {
    if (loopIndex === null) return;
    const nextIdx = loopIndex + 1;
    if (nextIdx < subtitles.length) {
      handleLoopClick(nextIdx);
      setShadowingTarget(subtitles[nextIdx]);
    } else {
      setLoopIndex(null);
      setShadowingTarget(null);
    }
  };

  const handleExitShadowing = () => {
    setShadowingTarget(null);
  };

  const handleSrtUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !video) return;
    setSrtUploading(true);
    try {
      const text = await file.text();
      const entries = parseSrt(text);

      // Translate each line
      const subsToSave: StudySubtitle[] = [];
      for (let i = 0; i < entries.length; i++) {
        const entry = entries[i];
        let textZh = '';

        // Try batch translate via API route
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
        } catch {
          textZh = ''; // Will try later or manually
        }

        // Tokenize
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
    if (isPlaying) {
      playerRef.current?.pauseVideo();
    } else {
      playerRef.current?.playVideo();
      // Reset timer to match current active subtitle
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

  if (!video) return null;

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)]">
      {/* Top bar */}
      <div className="flex items-center gap-3 px-4 py-3 shrink-0">
        <Link href="/shadowing" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-sm font-bold text-[var(--text-primary)] truncate">{video.title}</h1>
        </div>
      </div>

      {/* Video player */}
      <div className="shrink-0 px-2">
        <VideoPlayer ref={playerRef} embedUrl={video.platform === 'bilibili'
          ? `https://player.bilibili.com/player.html?bvid=${video.platformId}&page=1&high_quality=1&autoplay=0`
          : `https://www.youtube.com/embed/${video.platformId}?enablejsapi=1&controls=1&modestbranding=1&rel=0`
        } platform={video.platform} />
      </div>

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
              try {
                return romanize(shadowingTarget.text);
              } catch { return ''; }
            })()}
            chinese={shadowingTarget.textZh}
            isRecording={isRecording}
            onListen={handleListen}
            onRecord={handleRecord}
            onNext={handleShadowingNext}
            onExit={handleExitShadowing}
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
