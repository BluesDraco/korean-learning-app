'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Volume2, ChevronUp, ChevronDown, Play, Pause,
  Mic, Square, CheckCircle2, BookOpen, ChevronLeft, ChevronRight,
} from 'lucide-react';
import { articles, levelLabel, levelColor } from '@/data/articles';
import type { Article } from '@/data/articles';

function speakKorean(text: string, rate = 0.75) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = rate;
  window.speechSynthesis.speak(utterance);
}

export default function ArticleReaderPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;

  const article = articles.find((a) => a.id === articleId);

  const [currentSentence, setCurrentSentence] = useState(0);
  const [showTranslation, setShowTranslation] = useState<Record<number, boolean>>({});
  const [readSentences, setReadSentences] = useState<Set<number>>(new Set());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoPlay, setAutoPlay] = useState(false);

  // Recording
  const [recordingIdx, setRecordingIdx] = useState<number | null>(null);
  const [recordings, setRecordings] = useState<Record<number, string>>({});
  const [playingRecording, setPlayingRecording] = useState<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingAudioRef = useRef<HTMLAudioElement | null>(null);

  const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (!article) return;
    sentenceRefs.current = sentenceRefs.current.slice(0, article.sentences.length);
  }, [article]);

  const totalSentences = article?.sentences.length ?? 0;

  const handleSpeak = useCallback((text: string, idx: number) => {
    setIsSpeaking(true);
    setCurrentSentence(idx);
    const newRead = new Set(readSentences);
    newRead.add(idx);
    setReadSentences(newRead);
    speakKorean(text);
    // Estimate speech duration
    setTimeout(() => setIsSpeaking(false), Math.max(text.length * 80, 1200));
  }, [readSentences]);

  const toggleTranslation = useCallback((idx: number) => {
    setShowTranslation((prev) => ({ ...prev, [idx]: !prev[idx] }));
  }, []);

  // ── Recording ─────────────────────────────────────────────────
  const startRecording = useCallback(async (idx: number) => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = MediaRecorder.isTypeSupported('audio/webm;codecs=opus') ? 'audio/webm;codecs=opus' : 'audio/webm';
      const recorder = new MediaRecorder(stream, { mimeType: mime });
      mediaRecorderRef.current = recorder;
      audioChunksRef.current = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) audioChunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(audioChunksRef.current, { type: recorder.mimeType });
        const url = URL.createObjectURL(blob);
        setRecordings((prev) => {
          const next = { ...prev };
          if (next[idx]) URL.revokeObjectURL(next[idx]);
          next[idx] = url;
          return next;
        });
        stream.getTracks().forEach((t) => t.stop());
      };

      recorder.start();
      setRecordingIdx(idx);
    } catch {
      alert('无法访问麦克风，请检查浏览器权限设置');
    }
  }, []);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
      mediaRecorderRef.current.stop();
    }
    setRecordingIdx(null);
  }, []);

  const toggleRecordingPlayback = useCallback((idx: number) => {
    if (!recordings[idx]) return;
    const audio = recordingAudioRef.current;
    if (audio && playingRecording === idx) {
      audio.pause();
      return;
    }
    const a = new Audio(recordings[idx]);
    recordingAudioRef.current = a;
    a.onended = () => setPlayingRecording(null);
    a.onplay = () => setPlayingRecording(idx);
    a.onpause = () => setPlayingRecording(null);
    a.play();
  }, [recordings, playingRecording]);

  // ── Auto-play ─────────────────────────────────────────────────
  const handleAutoPlayAll = useCallback(() => {
    if (!article || isSpeaking) return;
    setAutoPlay(true);
    let idx = 0;
    const playNext = () => {
      if (idx >= article.sentences.length) {
        setAutoPlay(false);
        return;
      }
      setCurrentSentence(idx);
      const newRead = new Set(readSentences);
      newRead.add(idx);
      setReadSentences(newRead);
      speakKorean(article.sentences[idx].ko);
      const duration = Math.max(article.sentences[idx].ko.length * 80, 1500);
      idx++;
      setTimeout(playNext, duration + 600);
    };
    playNext();
  }, [article, isSpeaking, readSentences]);

  if (!article) {
    return (
      <div className="py-20 text-center">
        <p className="text-[var(--text-secondary)]">文章未找到</p>
        <button
          onClick={() => router.push('/reading')}
          className="mt-3 text-sm text-[var(--pink-primary)] hover:underline"
        >
          返回文章列表
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 space-y-4">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => router.push('/reading')}
          className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
        >
          <ArrowLeft size={16} />
          文章列表
        </button>
        <div className="flex items-center gap-2">
          <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[article.level]}`}>
            {levelLabel[article.level]}
          </span>
        </div>
      </div>

      {/* Article header */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="w-14 h-14 rounded-2xl bg-[var(--pink-primary)]/10 flex items-center justify-center text-3xl shrink-0">
            {article.emoji}
          </div>
          <div className="min-w-0">
            <h1 className="text-xl font-bold text-[var(--text-primary)]">{article.title}</h1>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">{article.titleKo}</p>
            <div className="flex items-center gap-3 mt-2">
              <span className="text-xs text-[var(--text-muted)]">{article.category}</span>
              <span className="text-xs text-[var(--text-muted)]">{article.sentences.length} 句</span>
              <span className="text-xs text-[var(--text-muted)]">
                已读 {readSentences.size}/{totalSentences}
              </span>
            </div>
            {/* Progress bar */}
            <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5 mt-3">
              <div
                className="bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] h-1.5 rounded-full transition-all duration-500"
                style={{ width: `${totalSentences > 0 ? (readSentences.size / totalSentences) * 100 : 0}%` }}
              />
            </div>
          </div>
        </div>

        {/* Auto-play button */}
        <button
          onClick={handleAutoPlayAll}
          disabled={autoPlay || isSpeaking}
          className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-xl border border-[var(--pink-primary)]/20 text-sm text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/5 transition-colors disabled:opacity-50"
        >
          {autoPlay ? (
            <>{/* spinner */}<span className="w-4 h-4 border-2 border-[var(--pink-primary)]/30 border-t-[var(--pink-primary)] rounded-full animate-spin" />自动播放中...</>
          ) : (
            <><Play size={16} />连续播放全文</>
          )}
        </button>
      </div>

      {/* Sentence list */}
      <div className="space-y-3">
        {article.sentences.map((sentence, idx) => {
          const isCurrent = currentSentence === idx;
          const isTranslated = showTranslation[idx];
          const isRead = readSentences.has(idx);
          const isRec = recordingIdx === idx;
          const isRecPlaying = playingRecording === idx;
          const hasRecording = recordings[idx] != null;

          return (
            <div
              key={idx}
              ref={(el) => { sentenceRefs.current[idx] = el; }}
              className={`bg-[var(--bg-card)] border rounded-2xl p-4 transition-all duration-300 ${
                isCurrent
                  ? 'border-[var(--pink-primary)]/40 shadow-lg shadow-[var(--pink-primary)]/5'
                  : 'border-[var(--border-color)] hover:border-[var(--pink-pale)]'
              }`}
            >
              {/* Korean text */}
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1 min-w-0">
                  <p className="text-lg font-medium text-[var(--text-primary)] leading-relaxed">
                    {sentence.ko}
                  </p>
                  <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">
                    {sentence.pronunciation}
                  </p>
                </div>
                <div className="flex items-center gap-1 shrink-0">
                  {isRead && (
                    <span className="text-xs text-[var(--mint-soft)] shrink-0">
                      <CheckCircle2 size={14} />
                    </span>
                  )}
                  <button
                    onClick={() => handleSpeak(sentence.ko, idx)}
                    className={`p-2 rounded-xl transition-colors ${
                      isCurrent && isSpeaking
                        ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
                        : 'hover:bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                    title="朗读此句"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>
              </div>

              {/* Translation toggle */}
              <button
                onClick={() => toggleTranslation(idx)}
                className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] mt-2 transition-colors"
              >
                {isTranslated ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {isTranslated ? '隐藏翻译' : '显示翻译'}
              </button>

              {isTranslated && (
                <div className="mt-2 p-3 rounded-xl bg-[var(--bg-input)] animate-slide-up">
                  <p className="text-sm text-[var(--text-primary)] leading-relaxed">{sentence.zh}</p>
                </div>
              )}

              {/* Vocab tags */}
              <div className="flex flex-wrap gap-1.5 mt-3">
                {sentence.vocab.map((v) => (
                  <span
                    key={v.word}
                    className="text-xs px-2 py-0.5 rounded-full bg-[var(--purple-soft)]/8 border border-[var(--purple-soft)]/15 text-[var(--text-secondary)]"
                  >
                    <span className="font-medium text-[var(--text-primary)]">{v.word}</span>
                    <span className="ml-1 text-[var(--text-muted)]">{v.meaning}</span>
                  </span>
                ))}
              </div>

              {/* Recording controls */}
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--border-color)]">
                {!isRec ? (
                  <button
                    onClick={() => startRecording(idx)}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--pink-primary)]/30 text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors"
                    title="跟读录音"
                  >
                    <Mic size={13} />
                    跟读
                  </button>
                ) : (
                  <button
                    onClick={stopRecording}
                    className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 text-[var(--color-danger)] animate-pulse"
                  >
                    <Square size={13} />
                    停止录音
                  </button>
                )}

                {hasRecording && (
                  <button
                    onClick={() => toggleRecordingPlayback(idx)}
                    className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border transition-colors ${
                      isRecPlaying
                        ? 'bg-[var(--pink-primary)]/10 border-[var(--pink-primary)]/30 text-[var(--pink-primary)]'
                        : 'border-[var(--border-color)] hover:border-[var(--pink-pale)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {isRecPlaying ? <Pause size={13} /> : <Play size={13} />}
                    {isRecPlaying ? '播放中' : '回放'}
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-center gap-4 py-2">
        <button
          onClick={() => {
            const prev = Math.max(0, currentSentence - 1);
            setCurrentSentence(prev);
            sentenceRefs.current[prev]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          disabled={currentSentence === 0}
          className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={20} />
        </button>
        <span className="text-xs text-[var(--text-muted)]">
          {currentSentence + 1} / {totalSentences}
        </span>
        <button
          onClick={() => {
            const next = Math.min(totalSentences - 1, currentSentence + 1);
            setCurrentSentence(next);
            handleSpeak(article.sentences[next].ko, next);
            sentenceRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          disabled={currentSentence >= totalSentences - 1}
          className="p-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Completion banner */}
      {readSentences.size >= totalSentences && totalSentences > 0 && (
        <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-4 text-center">
          <p className="text-sm font-medium text-[var(--mint-soft)]">
            你已读完所有句子!
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">
            已标记为已读，这些词汇将有助于你的复习
          </p>
        </div>
      )}
    </div>
  );
}
