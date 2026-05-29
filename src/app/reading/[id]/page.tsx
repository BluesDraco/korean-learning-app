'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Volume2, Play, Square, Mic, ChevronLeft, ChevronRight,
  BookOpen, CheckCircle2, Gauge,
} from 'lucide-react';
import { articles, levelLabel, levelColor } from '@/data/articles';
import { speak, cancelSpeech } from '@/lib/tts';
import type { Article } from '@/data/articles';

export default function ArticleReaderPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;
  const article = articles.find((a) => a.id === articleId);

  const [currentIdx, setCurrentIdx] = useState(0);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [readSet, setReadSet] = useState<Set<number>>(new Set());
  const [speed, setSpeed] = useState(0.75);
  const autoAbortRef = useRef(false);
  const sentenceRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const detailRef = useRef<HTMLDivElement>(null);

  // Recording
  const [recording, setRecording] = useState(false);
  const [recordings, setRecordings] = useState<Record<number, string>>({});
  const [playingRec, setPlayingRec] = useState<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);

  const total = article?.sentences.length ?? 0;

  // ── Speak single sentence ──
  const speakSentence = useCallback(async (idx: number) => {
    if (!article) return;
    // Interrupt auto-play if running
    if (autoPlaying) {
      autoAbortRef.current = true;
      setAutoPlaying(false);
    }
    setCurrentIdx(idx);
    setIsSpeaking(true);
    setReadSet((prev) => new Set(prev).add(idx));

    try {
      await speak(article.sentences[idx].ko, speed);
    } catch { /* tts error */ }
    setIsSpeaking(false);
  }, [article, speed, autoPlaying]);

  // ── Auto-play: per-sentence for tracking, Edge TTS is fast enough to feel continuous ──
  const startAutoPlay = useCallback(async () => {
    if (!article || autoPlaying) return;
    setAutoPlaying(true);
    autoAbortRef.current = false;
    setIsSpeaking(true);

    // Mark all as read upfront
    setReadSet(new Set(article.sentences.map((_, i) => i)));

    for (let i = 0; i < article.sentences.length; i++) {
      if (autoAbortRef.current) break;

      setCurrentIdx(i);
      sentenceRefs.current[i]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      detailRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

      try {
        await speak(article.sentences[i].ko, speed);
      } catch {
        break;
      }
    }

    setIsSpeaking(false);
    setAutoPlaying(false);
  }, [article, autoPlaying, speed]);

  const stopAutoPlay = useCallback(() => {
    autoAbortRef.current = true;
    cancelSpeech();
    setAutoPlaying(false);
    setIsSpeaking(false);
  }, []);

  // ── Recording ──
  const startRecording = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm';
      const rec = new MediaRecorder(stream, { mimeType: mime });
      mediaRecorderRef.current = rec;
      chunksRef.current = [];

      rec.ondataavailable = (e) => { if (e.data.size > 0) chunksRef.current.push(e.data); };
      rec.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: rec.mimeType });
        const url = URL.createObjectURL(blob);
        setRecordings((prev) => {
          const next = { ...prev };
          if (next[currentIdx]) URL.revokeObjectURL(next[currentIdx]);
          next[currentIdx] = url;
          return next;
        });
        stream.getTracks().forEach((t) => t.stop());
      };
      rec.start();
      setRecording(true);
    } catch {
      alert('无法访问麦克风');
    }
  }, [currentIdx]);

  const stopRecording = useCallback(() => {
    mediaRecorderRef.current?.stop();
    setRecording(false);
  }, []);

  const playRecording = useCallback((idx: number) => {
    const url = recordings[idx];
    if (!url) return;
    if (playingRec === idx) {
      setPlayingRec(null);
      return;
    }
    const audio = new Audio(url);
    audio.onended = () => setPlayingRec(null);
    audio.onplay = () => setPlayingRec(idx);
    audio.play();
  }, [recordings, playingRec]);

  useEffect(() => {
    return () => { cancelSpeech(); };
  }, []);

  if (!article) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--text-secondary)]">文章未找到</p>
        <button onClick={() => router.push('/reading')} className="mt-3 text-sm text-[var(--pink-primary)] hover:underline">
          返回文章列表
        </button>
      </div>
    );
  }

  const current = article.sentences[currentIdx];

  return (
    <div className="py-4 space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.push('/reading')} className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={16} /> 文章列表
        </button>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[article.level]}`}>
          {levelLabel[article.level]}
        </span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-xl bg-[var(--pink-primary)]/10 flex items-center justify-center text-2xl shrink-0">
          {article.emoji}
        </div>
        <div>
          <h1 className="text-lg font-bold text-[var(--text-primary)]">{article.title}</h1>
          <p className="text-xs text-[var(--text-muted)]">{article.titleKo} · {article.category} · {article.sentences.length} 句</p>
        </div>
      </div>

      {/* ── Playback controls ── */}
      <div className="flex gap-2 items-center">
        <button
          onClick={autoPlaying ? stopAutoPlay : startAutoPlay}
          className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium transition-colors ${
            autoPlaying
              ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
              : 'border border-[var(--pink-primary)]/25 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/5'
          }`}
        >
          {autoPlaying ? (
            <><Square size={14} /> 停止</>
          ) : (
            <><Play size={14} /> 全文朗读</>
          )}
        </button>
        <button
          onClick={() => speakSentence(currentIdx)}
          disabled={isSpeaking}
          className="flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-[var(--border-color)] text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)] transition-colors disabled:opacity-50"
        >
          <Volume2 size={14} /> 读当前句
        </button>

        {/* Speed slider */}
        <div className="hidden sm:flex items-center gap-1.5 shrink-0">
          <Gauge size={14} className="text-[var(--text-muted)]" />
          <input
            type="range"
            min="0.5"
            max="1"
            step="0.05"
            value={speed}
            onChange={(e) => setSpeed(parseFloat(e.target.value))}
            className="w-16 h-1 accent-[var(--pink-primary)] cursor-pointer"
          />
          <span className="text-xs text-[var(--text-muted)] w-8 text-right">{speed}x</span>
        </div>
      </div>

      {/* Speed slider — always visible on mobile */}
      <div className="sm:hidden flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <Gauge size={13} />
        <span>语速</span>
        <input
          type="range"
          min="0.5"
          max="1"
          step="0.05"
          value={speed}
          onChange={(e) => setSpeed(parseFloat(e.target.value))}
          className="flex-1 h-1 accent-[var(--pink-primary)]"
        />
        <span className="w-8 text-right">{speed}x</span>
      </div>

      {/* Progress */}
      <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
        <div className="flex-1 bg-[var(--bg-input)] rounded-full h-1">
          <div
            className="bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] h-1 rounded-full transition-all"
            style={{ width: `${total > 0 ? (readSet.size / total) * 100 : 0}%` }}
          />
        </div>
        <span>{readSet.size}/{total}</span>
      </div>

      {/* ── Full text ── */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
        <div className="text-lg leading-[2.2] text-[var(--text-primary)]">
          {article.sentences.map((s, idx) => (
            <span
              key={idx}
              ref={(el) => { sentenceRefs.current[idx] = el; }}
              onClick={() => {
                if (autoPlaying) {
                  autoAbortRef.current = true;
                  setAutoPlaying(false);
                }
                speakSentence(idx);
              }}
              className={`cursor-pointer rounded px-1 py-0.5 transition-all duration-200 ${
                idx === currentIdx
                  ? 'bg-[var(--pink-primary)]/20 text-[var(--pink-primary)] font-medium ring-1 ring-[var(--pink-primary)]/30'
                  : readSet.has(idx)
                    ? 'text-[var(--text-primary)] hover:bg-[var(--pink-pale)]/20'
                    : 'text-[var(--text-secondary)] hover:bg-[var(--pink-pale)]/10'
              }`}
            >
              {s.ko}
            </span>
          ))}
        </div>
      </div>

      {/* ── Detail panel ── */}
      <div
        ref={detailRef}
        className="bg-[var(--bg-card)] border-2 border-[var(--pink-primary)]/20 rounded-2xl p-5 space-y-4 transition-all"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen size={16} className="text-[var(--pink-primary)]" />
            <span className="text-sm font-bold text-[var(--text-primary)]">精读 · 第 {currentIdx + 1}/{total} 句</span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={() => {
                const prev = Math.max(0, currentIdx - 1);
                setCurrentIdx(prev);
                sentenceRefs.current[prev]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              disabled={currentIdx === 0}
              className="p-1.5 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)] disabled:opacity-30"
            >
              <ChevronLeft size={16} />
            </button>
            <span className="text-xs text-[var(--text-muted)]">{currentIdx + 1}/{total}</span>
            <button
              onClick={() => {
                const next = Math.min(total - 1, currentIdx + 1);
                setCurrentIdx(next);
                sentenceRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              disabled={currentIdx >= total - 1}
              className="p-1.5 rounded-lg hover:bg-[var(--bg-input)] text-[var(--text-muted)] disabled:opacity-30"
            >
              <ChevronRight size={16} />
            </button>
          </div>
        </div>

        {/* Korean + pronunciation */}
        <div>
          <p className="text-xl font-bold text-[var(--text-primary)] leading-relaxed">
            {current.ko}
          </p>
          <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">
            {current.pronunciation}
          </p>
        </div>

        {/* Translation */}
        <div className="bg-[var(--bg-input)] rounded-xl p-4">
          <p className="text-xs text-[var(--text-muted)] mb-1">翻译</p>
          <p className="text-sm text-[var(--text-primary)] leading-relaxed">{current.zh}</p>
        </div>

        {/* Grammar */}
        {current.grammar && (
          <div className="flex items-start gap-2 bg-[var(--purple-soft)]/5 rounded-xl p-3">
            <BookOpen size={14} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
            <div>
              <p className="text-xs text-[var(--text-muted)] mb-0.5">语法</p>
              <p className="text-xs text-[var(--text-primary)]">{current.grammar}</p>
            </div>
          </div>
        )}

        {/* Vocab tags */}
        <div className="flex flex-wrap gap-1.5">
          {current.vocab.map((v) => (
            <span key={v.word} className="text-xs px-2.5 py-1 rounded-full bg-[var(--purple-soft)]/8 border border-[var(--purple-soft)]/15">
              <span className="font-medium text-[var(--text-primary)]">{v.word}</span>
              <span className="ml-1 text-[var(--text-muted)]">{v.meaning}</span>
            </span>
          ))}
        </div>

        {/* Action buttons */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={() => speakSentence(currentIdx)}
            className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] text-xs font-medium hover:bg-[var(--pink-primary)]/20"
          >
            <Volume2 size={13} /> 朗读此句
          </button>
          {!recording ? (
            <button
              onClick={startRecording}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg border border-[var(--border-color)] text-xs text-[var(--text-muted)] hover:text-[var(--pink-primary)] hover:border-[var(--pink-primary)]/30"
            >
              <Mic size={13} /> 跟读录音
            </button>
          ) : (
            <button
              onClick={stopRecording}
              className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-red-500/10 border border-red-500/20 text-red-500 text-xs animate-pulse"
            >
              <Square size={13} /> 停止录音
            </button>
          )}
          {recordings[currentIdx] && (
            <button
              onClick={() => playRecording(currentIdx)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-lg border text-xs ${
                playingRec === currentIdx
                  ? 'bg-[var(--pink-primary)]/10 border-[var(--pink-primary)]/30 text-[var(--pink-primary)]'
                  : 'border-[var(--border-color)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              {playingRec === currentIdx ? '⏸ 暂停' : '▶ 回放'}
            </button>
          )}
        </div>
      </div>

      {/* Completion */}
      {readSet.size >= total && total > 0 && (
        <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-4 text-center">
          <CheckCircle2 size={20} className="text-[var(--mint-soft)] mx-auto mb-1" />
          <p className="text-sm font-medium text-[var(--mint-soft)]">你已读完所有句子!</p>
        </div>
      )}
    </div>
  );
}
