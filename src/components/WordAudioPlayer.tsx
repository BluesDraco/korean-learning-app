'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Repeat, Volume2, ChevronUp, ChevronDown } from 'lucide-react';
import { speak, cancelSpeech } from '@/lib/tts';

interface WordItem {
  korean: string;
  chinese: string;
}

interface Props {
  words: WordItem[];
}

export function WordAudioPlayer({ words }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isLooping, setIsLooping] = useState(true);
  const [speed, setSpeed] = useState(0.85);
  const [collapsed, setCollapsed] = useState(false);
  const [phase, setPhase] = useState<'chinese' | 'korean' | 'idle'>('idle');

  const idxRef = useRef(0);
  const playingRef = useRef(false);
  const loopingRef = useRef(true);
  const speedRef = useRef(0.85);
  const wordsRef = useRef(words);
  wordsRef.current = words;
  const timeoutIdsRef = useRef<Set<ReturnType<typeof setTimeout>>>(new Set());
  const mountedRef = useRef(true);

  const safeTimeout = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(() => {
      timeoutIdsRef.current.delete(id);
      if (!mountedRef.current) return;
      fn();
    }, ms);
    timeoutIdsRef.current.add(id);
    return id;
  }, []);

  const speakLocal = useCallback((text: string, lang: string, rate: number, onEnd: () => void) => {
    if (lang === 'ko-KR') {
      speak(text, rate, onEnd);
    } else {
      // Chinese — use browser TTS directly (Azure only does Korean)
      cancelSpeech();
      const u = new SpeechSynthesisUtterance(text);
      u.lang = 'zh-CN';
      u.rate = rate;
      u.pitch = 1;
      u.onend = onEnd;
      u.onerror = onEnd;
      window.speechSynthesis.speak(u);
    }
  }, []);

  const playWord = useCallback((idx: number) => {
    if (!playingRef.current) return;
    const w = wordsRef.current[idx];
    if (!w) {
      if (loopingRef.current) {
        setCurrentIdx(0);
        idxRef.current = 0;
        safeTimeout(() => playWord(0), 500);
      } else {
        setIsPlaying(false);
        playingRef.current = false;
        setPhase('idle');
      }
      return;
    }

    setCurrentIdx(idx);
    idxRef.current = idx;

    setPhase('chinese');
    speakLocal(w.chinese, 'zh-CN', speedRef.current, () => {
      if (!playingRef.current) return;
      safeTimeout(() => {
        if (!playingRef.current) return;
        setPhase('korean');
        speakLocal(w.korean, 'ko-KR', speedRef.current, () => {
          if (!playingRef.current) return;
          safeTimeout(() => {
            if (!playingRef.current) return;
            playWord(idx + 1);
          }, 800);
        });
      }, 400);
    });
  }, [safeTimeout, speakLocal]);

  const start = useCallback(() => {
    cancelSpeech();
    playingRef.current = true;
    setIsPlaying(true);
    playWord(idxRef.current);
  }, [playWord]);

  const pause = useCallback(() => {
    cancelSpeech();
    playingRef.current = false;
    setIsPlaying(false);
    setPhase('idle');
  }, []);

  const togglePlay = useCallback(() => {
    if (isPlaying) {
      pause();
    } else {
      start();
    }
  }, [isPlaying, start, pause]);

  const skipBack = useCallback(() => {
    cancelSpeech();
    const prev = Math.max(0, idxRef.current - 1);
    idxRef.current = prev;
    setCurrentIdx(prev);
    if (playingRef.current) {
      playWord(prev);
    }
  }, [playWord]);

  const skipForward = useCallback(() => {
    cancelSpeech();
    const next = (idxRef.current + 1) % words.length;
    idxRef.current = next;
    setCurrentIdx(next);
    if (playingRef.current) {
      playWord(next);
    }
  }, [playWord, words.length]);

  const toggleLoop = useCallback(() => {
    setIsLooping((prev) => {
      loopingRef.current = !prev;
      return !prev;
    });
  }, []);

  const changeSpeed = useCallback((delta: number) => {
    setSpeed((prev) => {
      const next = Math.max(0.5, Math.min(1.5, prev + delta));
      speedRef.current = next;
      return next;
    });
    // Restart current word with new speed
    if (playingRef.current) {
      cancelSpeech();
      playWord(idxRef.current);
    }
  }, [playWord]);

  // Cleanup on unmount
  useEffect(() => {
    const ids = timeoutIdsRef.current;
    return () => {
      mountedRef.current = false;
      cancelSpeech();
      ids.forEach((id) => clearTimeout(id));
      ids.clear();
    };
  }, []);

  if (words.length === 0) return null;

  const currentWord = words[currentIdx] || words[0];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[150]">
      <div className="pl-0 md:pl-52 px-3 md:px-5 lg:px-8 w-full max-w-[1280px] mx-auto">
        <div className={`bg-[var(--bg-card)] border border-[var(--border-color)] ${collapsed ? 'rounded-2xl' : 'rounded-t-2xl'} shadow-xl shadow-black/10 transition-all`}>
          {/* Header bar */}
          <div className="flex items-center gap-3 px-4 py-2.5">
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
            >
              {collapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
            </button>

            <Volume2 size={16} className="text-[var(--pink-primary)] shrink-0" />
            <span className="text-sm font-medium text-[var(--text-primary)]">听单词</span>

            {!collapsed && (
              <span className="text-xs text-[var(--text-muted)]">
                {currentIdx + 1} / {words.length}
              </span>
            )}

            <div className="flex-1" />

            {!collapsed && (
              <>
                {/* Speed */}
                <div className="flex items-center gap-1 text-xs">
                  <button
                    onClick={() => changeSpeed(-0.1)}
                    className="px-1.5 py-0.5 rounded-md bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    -
                  </button>
                  <span className="text-[var(--text-muted)] w-9 text-center tabular-nums">
                    {speed.toFixed(2)}x
                  </span>
                  <button
                    onClick={() => changeSpeed(0.1)}
                    className="px-1.5 py-0.5 rounded-md bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    +
                  </button>
                </div>

                {/* Loop toggle */}
                <button
                  onClick={toggleLoop}
                  className={`p-1.5 rounded-lg transition-colors ${
                    isLooping
                      ? 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
                      : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                  }`}
                  title={isLooping ? '循环播放中' : '单次播放'}
                >
                  <Repeat size={15} />
                </button>
              </>
            )}

            {/* Transport controls */}
            <button
              onClick={skipBack}
              className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              title="上一首"
            >
              <SkipBack size={16} />
            </button>

            <button
              onClick={togglePlay}
              className="p-1.5 rounded-full bg-[var(--pink-primary)] text-white hover:opacity-90 transition-opacity"
            >
              {isPlaying ? <Pause size={16} /> : <Play size={16} className="ml-0.5" />}
            </button>

            <button
              onClick={skipForward}
              className="p-1.5 text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
              title="下一首"
            >
              <SkipForward size={16} />
            </button>
          </div>

          {/* Expanded info */}
          {!collapsed && (
            <div className="px-4 pb-3 space-y-1">
              {/* Current word display */}
              <div className="flex items-center gap-3 bg-[var(--bg-input)]/60 rounded-xl px-4 py-3">
                <div className="flex-1 min-w-0 text-center">
                  <p className="text-lg font-bold text-[var(--text-primary)]">
                    {currentWord.korean}
                  </p>
                  <p className="text-sm text-[var(--text-secondary)] mt-0.5">
                    {currentWord.chinese}
                  </p>
                </div>
                {phase !== 'idle' && (
                  <span className={`text-xs px-2 py-1 rounded-full shrink-0 ${
                    phase === 'chinese'
                      ? 'bg-[var(--peach-soft)]/15 text-[var(--peach-soft)]'
                      : 'bg-[var(--pink-primary)]/15 text-[var(--pink-primary)]'
                  }`}>
                    {phase === 'chinese' ? '🇨🇳 中文' : '🇰🇷 韩语'}
                  </span>
                )}
              </div>

              {/* Progress dots */}
              <div className="flex justify-center gap-1 pt-1 flex-wrap">
                {words.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      cancelSpeech();
                      idxRef.current = i;
                      setCurrentIdx(i);
                      if (playingRef.current) playWord(i);
                    }}
                    className={`w-1.5 h-1.5 rounded-full transition-all ${
                      i === currentIdx
                        ? 'bg-[var(--pink-primary)] w-3'
                        : 'bg-[var(--border-color)] hover:bg-[var(--text-muted)]'
                    }`}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
