'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import {
  ArrowLeft, Volume2, ChevronUp, ChevronDown, Play, Pause,
  Mic, Square, CheckCircle2, ChevronLeft, ChevronRight,
  BookOpen, Sparkles,
} from 'lucide-react';
import { articles, levelLabel, levelColor } from '@/data/articles';
import type { Article } from '@/data/articles';

// ── TTS with proper lifecycle ───────────────────────────────────────

function useSpeaker() {
  const speakingRef = useRef(false);
  const queueRef = useRef<string[]>([]);
  const onEndRef = useRef<(() => void) | null>(null);
  const rateRef = useRef(0.85);

  const speak = useCallback((text: string, rate = 0.85) => {
    const synth = window.speechSynthesis;
    // Only cancel if currently speaking
    if (speakingRef.current) {
      synth.cancel();
    }

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = rate;
    utterance.pitch = 1;

    // Try to find a Korean voice
    const voices = synth.getVoices();
    const koVoice = voices.find((v) => v.lang.startsWith('ko'));
    if (koVoice) utterance.voice = koVoice;

    utterance.onstart = () => { speakingRef.current = true; };
    utterance.onend = () => {
      speakingRef.current = false;
      onEndRef.current?.();
    };
    utterance.onerror = () => {
      speakingRef.current = false;
    };

    synth.speak(utterance);
  }, []);

  const stop = useCallback(() => {
    window.speechSynthesis.cancel();
    speakingRef.current = false;
  }, []);

  const isSpeaking = useCallback(() => speakingRef.current, []);

  const setOnEnd = useCallback((cb: (() => void) | null) => {
    onEndRef.current = cb;
  }, []);

  return { speak, stop, isSpeaking, setOnEnd };
}

// ── Main Page ───────────────────────────────────────────────────────

export default function ArticleReaderPage() {
  const router = useRouter();
  const params = useParams();
  const articleId = params.id as string;

  const article = articles.find((a) => a.id === articleId);
  const speaker = useSpeaker();

  const [currentSentence, setCurrentSentence] = useState(0);
  const [showTranslation, setShowTranslation] = useState<Record<number, boolean>>({});
  const [readSentences, setReadSentences] = useState<Set<number>>(new Set());
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [autoPlaying, setAutoPlaying] = useState(false);
  const [showFullTranslation, setShowFullTranslation] = useState(false);
  const autoPlayIdxRef = useRef(0);

  // Recording
  const [recordingIdx, setRecordingIdx] = useState<number | null>(null);
  const [recordings, setRecordings] = useState<Record<number, string>>({});
  const [playingRecording, setPlayingRecording] = useState<number | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  const recordingAudioRef = useRef<HTMLAudioElement | null>(null);
  const sentenceRefs = useRef<(HTMLDivElement | null)[]>([]);

  const totalSentences = article?.sentences.length ?? 0;

  // Pre-load voices
  useEffect(() => {
    window.speechSynthesis.getVoices();
    const onVoices = () => window.speechSynthesis.getVoices();
    window.speechSynthesis.onvoiceschanged = onVoices;
    return () => { window.speechSynthesis.onvoiceschanged = null; };
  }, []);

  // ── Speak a single sentence ───────────────────────────────────
  const handleSpeak = useCallback((text: string, idx: number) => {
    setIsSpeaking(true);
    setCurrentSentence(idx);
    const newRead = new Set(readSentences);
    newRead.add(idx);
    setReadSentences(newRead);

    speaker.setOnEnd(() => setIsSpeaking(false));
    speaker.speak(text);
  }, [readSentences, speaker]);

  // ── Auto-play all ─────────────────────────────────────────────
  const handleAutoPlayAll = useCallback(() => {
    if (!article || isSpeaking || autoPlaying) return;

    const synth = window.speechSynthesis;
    synth.cancel();
    setAutoPlaying(true);
    autoPlayIdxRef.current = 0;

    const playSentence = (idx: number) => {
      if (idx >= article.sentences.length) {
        setAutoPlaying(false);
        setIsSpeaking(false);
        return;
      }

      setCurrentSentence(idx);
      setIsSpeaking(true);
      const newRead = new Set(readSentences);
      // Can't access latest readSentences here, use functional set
      setReadSentences((prev) => {
        const ns = new Set(prev);
        ns.add(idx);
        return ns;
      });

      const utterance = new SpeechSynthesisUtterance(article.sentences[idx].ko);
      utterance.lang = 'ko-KR';
      utterance.rate = 0.85;
      utterance.pitch = 1;
      const voices = synth.getVoices();
      const koVoice = voices.find((v) => v.lang.startsWith('ko'));
      if (koVoice) utterance.voice = koVoice;

      utterance.onstart = () => { setIsSpeaking(true); };
      utterance.onend = () => {
        playSentence(idx + 1);
      };
      utterance.onerror = () => {
        setIsSpeaking(false);
        setAutoPlaying(false);
      };

      synth.speak(utterance);
      autoPlayIdxRef.current = idx;
    };

    playSentence(0);
  }, [article, isSpeaking, autoPlaying, readSentences]);

  const stopAutoPlay = useCallback(() => {
    window.speechSynthesis.cancel();
    setAutoPlaying(false);
    setIsSpeaking(false);
  }, []);

  // ── Speak full article ────────────────────────────────────────
  const handleSpeakFull = useCallback(() => {
    if (!article) return;
    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      return;
    }
    setIsSpeaking(true);
    speaker.setOnEnd(() => setIsSpeaking(false));
    speaker.speak(article.fullText);
  }, [article, isSpeaking, speaker]);

  // ── Translation toggle ────────────────────────────────────────
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

  // ── Cleanup on unmount ────────────────────────────────────────
  useEffect(() => {
    return () => { window.speechSynthesis.cancel(); };
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

  return (
    <div className="min-h-screen py-4 space-y-5">
      {/* Top bar */}
      <div className="flex items-center justify-between">
        <button onClick={() => router.push('/reading')} className="flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={16} />
          文章列表
        </button>
        <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${levelColor[article.level]}`}>
          {levelLabel[article.level]}
        </span>
      </div>

      {/* Article header */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
        <div className="flex items-start gap-3 mb-4">
          <div className="w-14 h-14 rounded-2xl bg-[var(--pink-primary)]/10 flex items-center justify-center text-3xl shrink-0">
            {article.emoji}
          </div>
          <div>
            <h1 className="text-xl font-bold text-[var(--text-primary)]">{article.title}</h1>
            <p className="text-sm text-[var(--text-muted)] mt-0.5">{article.titleKo}</p>
            <div className="flex items-center gap-3 mt-1.5">
              <span className="text-xs text-[var(--text-muted)]">{article.category}</span>
              <span className="text-xs text-[var(--text-muted)]">{article.sentences.length} 句</span>
            </div>
          </div>
        </div>

        {/* ── Full Article Text ── */}
        <div className="relative">
          <div className="bg-[var(--bg-input)] rounded-xl p-4 leading-loose text-[15px] text-[var(--text-primary)] whitespace-pre-line">
            {article.fullText}
          </div>

          {/* Translation toggle + display */}
          <button
            onClick={() => setShowFullTranslation(!showFullTranslation)}
            className="mt-3 flex items-center gap-1.5 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] transition-colors"
          >
            {showFullTranslation ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
            {showFullTranslation ? '收起中文翻译' : '显示中文翻译'}
          </button>

          {showFullTranslation && (
            <div className="mt-2 p-4 rounded-xl bg-[var(--purple-soft)]/5 border border-[var(--purple-soft)]/10 leading-loose text-sm text-[var(--text-secondary)] animate-slide-up">
              {article.fullTextZh}
            </div>
          )}

          <button
            onClick={handleSpeakFull}
            className={`mt-3 flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
              isSpeaking
                ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
                : 'border border-[var(--pink-primary)]/25 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/5'
            }`}
          >
            {isSpeaking ? <Pause size={15} /> : <Volume2 size={15} />}
            {isSpeaking ? '停止' : '朗读全文'}
          </button>
        </div>

        {/* Progress bar */}
        <div className="w-full bg-[var(--bg-input)] rounded-full h-1.5 mt-4">
          <div
            className="bg-gradient-to-r from-[var(--pink-primary)] to-[var(--purple-soft)] h-1.5 rounded-full transition-all duration-500"
            style={{ width: `${totalSentences > 0 ? (readSentences.size / totalSentences) * 100 : 0}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-[var(--text-muted)]">
          <span>逐句精读进度</span>
          <span>{readSentences.size}/{totalSentences} 句已读</span>
        </div>
      </div>

      {/* Auto-play button */}
      <button
        onClick={autoPlaying ? stopAutoPlay : handleAutoPlayAll}
        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-[var(--pink-primary)]/20 text-sm font-medium text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/5 transition-colors"
      >
        {autoPlaying ? (
          <><span className="w-4 h-4 border-2 border-[var(--pink-primary)]/30 border-t-[var(--pink-primary)] rounded-full animate-spin" />逐句播放中 (点击停止)</>
        ) : (
          <><Play size={16} />逐句连续播放</>
        )}
      </button>

      {/* ── Sentence-by-sentence breakdown ── */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-[var(--pink-primary)]" />
          <h2 className="text-sm font-bold text-[var(--text-primary)]">逐句精读</h2>
        </div>

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
                    : isRead
                      ? 'border-[var(--border-color)] border-l-[var(--mint-soft)]/50 border-l-2'
                      : 'border-[var(--border-color)] hover:border-[var(--pink-pale)]'
                }`}
              >
                {/* Sentence number + Korean */}
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <span className={`text-xs font-mono shrink-0 mt-1 w-6 h-6 rounded-full flex items-center justify-center ${
                      isRead ? 'bg-[var(--mint-soft)]/15 text-[var(--mint-soft)]' : 'bg-[var(--bg-input)] text-[var(--text-muted)]'
                    }`}>
                      {isRead ? '✓' : idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="text-base font-medium text-[var(--text-primary)] leading-relaxed">
                        {sentence.ko}
                      </p>
                      <p className="text-xs text-[var(--text-muted)] mt-1 font-mono">
                        {sentence.pronunciation}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleSpeak(sentence.ko, idx)}
                    className={`p-2 rounded-xl shrink-0 transition-colors ${
                      isCurrent && isSpeaking
                        ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
                        : 'hover:bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                    }`}
                    title="朗读此句"
                  >
                    <Volume2 size={16} />
                  </button>
                </div>

                {/* Translation toggle */}
                <button
                  onClick={() => toggleTranslation(idx)}
                  className="flex items-center gap-1 text-xs text-[var(--text-muted)] hover:text-[var(--text-secondary)] mt-2 transition-colors"
                >
                  {isTranslated ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                  {isTranslated ? '收起翻译' : '显示翻译'}
                </button>

                {isTranslated && (
                  <div className="mt-2 p-3 rounded-xl bg-[var(--bg-input)] animate-slide-up space-y-2">
                    <p className="text-sm text-[var(--text-primary)] leading-relaxed">{sentence.zh}</p>
                    {sentence.grammar && (
                      <div className="flex items-start gap-1.5 pt-2 border-t border-[var(--border-color)]">
                        <BookOpen size={12} className="text-[var(--purple-soft)] shrink-0 mt-0.5" />
                        <p className="text-xs text-[var(--text-secondary)]">{sentence.grammar}</p>
                      </div>
                    )}
                  </div>
                )}

                {/* Vocab tags */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {sentence.vocab.map((v) => (
                    <span key={v.word} className="text-xs px-2 py-0.5 rounded-full bg-[var(--purple-soft)]/8 border border-[var(--purple-soft)]/15 text-[var(--text-secondary)]">
                      <span className="font-medium text-[var(--text-primary)]">{v.word}</span>
                      <span className="ml-1 text-[var(--text-muted)]">{v.meaning}</span>
                    </span>
                  ))}
                </div>

                {/* Recording controls */}
                <div className="flex items-center gap-2 mt-3 pt-3 border-t border-[var(--border-color)]">
                  {!isRec ? (
                    <button onClick={() => startRecording(idx)} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[var(--border-color)] hover:border-[var(--pink-primary)]/30 text-[var(--text-muted)] hover:text-[var(--pink-primary)] transition-colors">
                      <Mic size={13} />跟读
                    </button>
                  ) : (
                    <button onClick={stopRecording} className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-[var(--color-danger)]/10 border border-[var(--color-danger)]/20 text-[var(--color-danger)] animate-pulse">
                      <Square size={13} />停止录音
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
      </div>

      {/* Bottom navigation */}
      <div className="flex items-center justify-between py-2">
        <button
          onClick={() => {
            const prev = Math.max(0, currentSentence - 1);
            setCurrentSentence(prev);
            sentenceRefs.current[prev]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          disabled={currentSentence === 0}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
        >
          <ChevronLeft size={16} />上一句
        </button>
        <span className="text-xs text-[var(--text-muted)]">{currentSentence + 1} / {totalSentences}</span>
        <button
          onClick={() => {
            const next = Math.min(totalSentences - 1, currentSentence + 1);
            setCurrentSentence(next);
            handleSpeak(article.sentences[next].ko, next);
            sentenceRefs.current[next]?.scrollIntoView({ behavior: 'smooth', block: 'center' });
          }}
          disabled={currentSentence >= totalSentences - 1}
          className="flex items-center gap-1 px-3 py-2 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] disabled:opacity-30 transition-colors"
        >
          下一句<ChevronRight size={16} />
        </button>
      </div>

      {/* Completion banner */}
      {readSentences.size >= totalSentences && totalSentences > 0 && (
        <div className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-4 text-center">
          <CheckCircle2 size={20} className="text-[var(--mint-soft)] mx-auto mb-1" />
          <p className="text-sm font-medium text-[var(--mint-soft)]">你已读完所有句子!</p>
          <p className="text-xs text-[var(--text-secondary)] mt-1">这些词汇加入到你的复习列表中</p>
        </div>
      )}
    </div>
  );
}
