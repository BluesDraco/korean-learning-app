'use client';

import { useState, useRef, useCallback, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';
import { speak, speakChinese, cancelSpeech } from '@/lib/tts';

interface WordItem {
  korean: string;
  chinese: string;
}

interface Props {
  words: WordItem[];
  extraBottom?: number;
}

export function WordAudioPlayer({ words, extraBottom = 0 }: Props) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [phase, setPhase] = useState<'korean' | 'chinese' | 'idle'>('idle');

  const idxRef = useRef(0);
  const playingRef = useRef(false);
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

  const playWord = useCallback((idx: number) => {
    if (!playingRef.current) return;
    const list = wordsRef.current;
    if (idx >= list.length) {
      // loop back
      idxRef.current = 0;
      setCurrentIdx(0);
      safeTimeout(() => playWord(0), 500);
      return;
    }
    const w = list[idx];
    setCurrentIdx(idx);
    idxRef.current = idx;

    setPhase('korean');

    let koreanDone = false;
    const koreanTimeout = safeTimeout(() => {
      if (!koreanDone && playingRef.current) {
        koreanDone = true;
        afterKorean();
      }
    }, 8000);

    const afterKorean = () => {
      if (!playingRef.current) return;
      safeTimeout(() => {
        if (!playingRef.current) return;
        setPhase('chinese');

        let chineseDone = false;
        const chineseTimeout = safeTimeout(() => {
          if (!chineseDone && playingRef.current) {
            chineseDone = true;
            afterChinese();
          }
        }, 8000);

        const afterChinese = () => {
          if (!playingRef.current) return;
          safeTimeout(() => {
            if (!playingRef.current) return;
            playWord(idx + 1);
          }, 700);
        };

        speakChinese(w.chinese, 0.85, () => {
          if (!chineseDone) {
            chineseDone = true;
            clearTimeout(chineseTimeout);
            afterChinese();
          }
        });
      }, 350);
    };

    speak(w.korean, 0.85, () => {
      if (!koreanDone) {
        koreanDone = true;
        clearTimeout(koreanTimeout);
        afterKorean();
      }
    });
  }, [safeTimeout]);

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

  const skipBack = useCallback(() => {
    cancelSpeech();
    const prev = Math.max(0, idxRef.current - 1);
    idxRef.current = prev;
    setCurrentIdx(prev);
    if (playingRef.current) playWord(prev);
  }, [playWord]);

  const skipForward = useCallback(() => {
    cancelSpeech();
    const next = (idxRef.current + 1) % words.length;
    idxRef.current = next;
    setCurrentIdx(next);
    if (playingRef.current) playWord(next);
  }, [playWord, words.length]);

  useEffect(() => {
    const ids = timeoutIdsRef.current;
    return () => {
      mountedRef.current = false;
      cancelSpeech();
      ids.forEach(clearTimeout);
      ids.clear();
    };
  }, []);

  if (words.length === 0) return null;

  const currentWord = words[currentIdx] || words[0];

  return (
    <div
      className="fixed left-0 right-0 z-[90] px-4 md:pl-[220px] md:pr-6"
      style={{ bottom: `calc(56px + env(safe-area-inset-bottom, 0px) + ${extraBottom}px)` }}
    >
      <div
        className="flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lg shadow-black/10"
        style={{ background: 'linear-gradient(135deg, #fff0f5 0%, #eaf8f5 100%)', border: '1px solid #f5dce6' }}
      >
        {/* Word info */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <span className="text-[15px] font-bold text-[var(--text-primary)] truncate">{currentWord.korean}</span>
            {phase !== 'idle' && (
              <span
                className="text-[10px] font-semibold px-1.5 py-0.5 rounded-full shrink-0"
                style={{
                  background: phase === 'korean' ? 'rgba(255,127,168,0.15)' : 'rgba(174,227,216,0.3)',
                  color: phase === 'korean' ? 'var(--pink-primary)' : '#3aafa9',
                }}
              >
                {phase === 'korean' ? 'KR' : 'ZH'}
              </span>
            )}
          </div>
          <p className="text-xs text-[var(--text-secondary)] truncate mt-0.5">{currentWord.chinese}</p>
        </div>

        {/* Counter */}
        <span className="text-[11px] text-[var(--text-muted)] tabular-nums shrink-0">
          {currentIdx + 1}/{words.length}
        </span>

        {/* Controls */}
        <div className="flex items-center gap-1 shrink-0">
          <button
            onClick={skipBack}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 transition-colors"
          >
            <SkipBack size={15} />
          </button>

          <button
            onClick={isPlaying ? pause : start}
            className="w-10 h-10 flex items-center justify-center rounded-full text-white transition-opacity hover:opacity-90 active:scale-95"
            style={{ background: 'var(--pink-primary)' }}
          >
            {isPlaying
              ? <Pause size={17} />
              : <Play size={17} style={{ marginLeft: '2px' }} />
            }
          </button>

          <button
            onClick={skipForward}
            className="w-8 h-8 flex items-center justify-center rounded-full text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-black/5 transition-colors"
          >
            <SkipForward size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
