'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import {
  ArrowLeft, Volume2, Mic, MicOff, Play,
  ChevronRight, Sparkles, Zap, RotateCcw, AlertTriangle
} from 'lucide-react';
import type { PronunciationItem } from '@/types';
import { AudioRecorder, isRecordingSupported, revokeRecording } from '@/lib/audio/recorder';
import { globalPlayer } from '@/lib/audio/player';
import { speak, cancelSpeech } from '@/lib/tts';
import { db } from '@/lib/db';
import { awardXp, XP_REWARDS } from '@/lib/gamification';
import { playClick, playSuccess, playComplete } from '@/lib/soundManager';

interface Props {
  items: PronunciationItem[];
  onClose: () => void;
}

type StepType = 'target' | 'listen' | 'segments' | 'record' | 'compare' | 'settlement';

function StepBadge({ label }: { label: string }) {
  return (
    <span className="text-[11px] px-2.5 py-1 rounded-full font-medium bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">
      {label}
    </span>
  );
}

function PlayBtn({
  onClick,
  size = 22,
  label,
  isPlaying,
}: {
  onClick: () => void;
  size?: number;
  label?: string;
  isPlaying: boolean;
}) {
  return (
    <button
      onClick={onClick}
      disabled={isPlaying}
      className={`p-4 rounded-2xl transition-all ${
        isPlaying
          ? 'bg-[var(--pink-primary)]/20 text-[var(--pink-primary)] animate-pulse'
          : 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20'
      }`}
    >
      <Volume2 size={size} />
      {label && <span className="block text-xs mt-1">{label}</span>}
    </button>
  );
}

export function PronunciationSession({ items, onClose }: Props) {
  const [itemIdx, setItemIdx] = useState(0);
  const [step, setStep] = useState<StepType>('target');
  const [slowMode, setSlowMode] = useState(false);
  const [recorder] = useState(() => new AudioRecorder(10000));
  const [recording, setRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const [micError, setMicError] = useState<string | null>(null);
  const [completedItems, setCompletedItems] = useState(0);
  const [totalAttempts, setTotalAttempts] = useState(0);
  const [playerState, setPlayerState] = useState<string>('idle');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const cleanupRef = useRef<string | null>(null);

  const item = items[itemIdx];

  // All hooks must be called unconditionally (before any early return)
  useEffect(() => {
    globalPlayer.setStateChange(setPlayerState);
    return () => { globalPlayer.stop(); cancelSpeech(); };
  }, []);

  useEffect(() => {
    return () => {
      if (cleanupRef.current) {
        revokeRecording(cleanupRef.current);
        cleanupRef.current = null;
      }
    };
  }, [itemIdx]);

  const rate = slowMode ? 0.6 : 0.85;
  const currentItemId = item?.id ?? '';

  const playStandard = useCallback(() => {
    if (!item) return;
    cancelSpeech();
    setIsSpeaking(true);
    speak(item.textKo, rate, () => setIsSpeaking(false));
  }, [item, rate]);

  const playSegment = useCallback((text: string) => {
    cancelSpeech(); setIsSpeaking(true); speak(text, rate, () => setIsSpeaking(false));
  }, [rate]);

  const startRecording = useCallback(async () => {
    setMicError(null);
    if (!isRecordingSupported()) {
      setMicError('此浏览器不支持录音');
      return;
    }
    const result = await recorder.start();
    if (result.error) {
      setMicError(result.error);
      return;
    }
    playClick();
    setRecording(true);
  }, [recorder]);

  const stopRecording = useCallback(async () => {
    const result = await recorder.stop();
    setRecording(false);
    playSuccess();
    if (result && item) {
      if (cleanupRef.current) revokeRecording(cleanupRef.current);
      setRecordingUrl(result.url);
      cleanupRef.current = result.url;
      setTotalAttempts((p) => p + 1);
      globalPlayer.stop();

      try {
        await db.pronunciationAttempts.put({
          id: crypto.randomUUID(),
          itemId: currentItemId,
          durationMs: result.durationMs,
          createdAt: Date.now(),
        });
        // Save practiced word to SRS vocabulary
        if (item.textKo) {
          const words = item.textKo.replace(/[.!?。！？,，]/g, '').split(/\s+/).filter(Boolean);
          for (const w of words) {
            db.words.put({
              id: `pron-${currentItemId}-${w}`,
              word: w,
              pronunciation: item.romanization || '',
              meaning: item.textZh || '',
              partOfSpeech: '',
              examples: [],
              source: 'pronunciation',
              sourceDetail: item.type,
              mastery: 'new' as const,
              srsLevel: 0,
              nextReview: Date.now(),
              easeFactor: 2.5,
              interval: 1,
              createdAt: Date.now(),
              lastReviewed: null,
            }).catch(() => {});
          }
        }
        await awardXp(XP_REWARDS.wordReviewed);
      } catch (_e) {}
    }
  }, [recorder, item, currentItemId]);

  const playRecording = useCallback(() => {
    if (recordingUrl) globalPlayer.play(recordingUrl, 1);
  }, [recordingUrl]);

  const goPrevStep = useCallback(() => {
    if (!item) return;
    const seq: StepType[] = item.segments?.length
      ? ['target', 'segments', 'record', 'compare']
      : ['target', 'record', 'compare'];
    const idx = seq.indexOf(step);
    if (idx > 0) {
      const prevStep = seq[idx - 1];
      if (prevStep === 'compare') {
        setStep('record');
      } else {
        setStep(prevStep);
      }
    } else if (itemIdx > 0) {
      const prevItem = items[itemIdx - 1];
      setItemIdx(itemIdx - 1);
      setStep(prevItem.segments?.length ? 'segments' : 'target');
      setRecordingUrl(null);
      setMicError(null);
      setSlowMode(false);
    }
  }, [step, itemIdx, items, item]);

  const goNextStep = useCallback(() => {
    if (!item) return;
    const goNext = () => {
      if (itemIdx + 1 < items.length) {
        setItemIdx(itemIdx + 1);
        setStep('target');
        setRecordingUrl(null);
        setMicError(null);
        setSlowMode(false);
      } else {
        setCompletedItems(items.length);
        setStep('settlement');
      }
    };

    const seq: StepType[] = item.segments?.length
      ? ['target', 'segments', 'record', 'compare']
      : ['target', 'record', 'compare'];

    const idx = seq.indexOf(step);
    if (idx >= 0 && idx < seq.length - 1) {
      // skip compare if no recording and coming from record via skip
      const nextStep = seq[idx + 1];
      if (nextStep === 'compare' && !recordingUrl) {
        goNext();
      } else {
        setStep(nextStep);
      }
    } else {
      goNext();
    }
  }, [step, itemIdx, items.length, item, recordingUrl]);

  const handleReRecord = useCallback(() => {
    setRecordingUrl(null);
    setMicError(null);
    setStep('record');
  }, []);

  const handleRestart = useCallback(() => {
    setItemIdx(0);
    setStep('target');
    setSlowMode(false);
    setRecordingUrl(null);
    setMicError(null);
    setCompletedItems(0);
    setTotalAttempts(0);
  }, []);

  const isPlaying = isSpeaking || playerState === 'playing' || playerState === 'loading';

  useEffect(() => {
    if (step === 'settlement') playComplete();
  }, [step]);

  // Early returns happen AFTER all hooks
  if (!item) {
    return (
      <div className="py-12 max-w-lg mx-auto text-center space-y-4">
        <div className="text-5xl">📭</div>
        <h2 className="text-lg font-bold text-[var(--text-primary)]">暂无发音练习内容</h2>
        <p className="text-sm text-[var(--text-muted)]">请先添加一些发音练习项目</p>
        <button onClick={onClose} className="px-6 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white text-sm font-medium">
          返回
        </button>
      </div>
    );
  }

  // ═══════════════════════════════════════════
  // SETTLEMENT
  // ═══════════════════════════════════════════
  if (step === 'settlement') {
    return (
      <div className="py-4 max-w-lg mx-auto space-y-6 text-center">
        <div className="text-6xl">🐰</div>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)]">发音练习完成!</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">
            完成了 {completedItems} 个内容，开口练习 {totalAttempts} 次
          </p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <Zap size={20} className="text-[var(--peach-soft)] mx-auto mb-1" />
            <div className="text-xl font-bold text-[var(--text-primary)]">{totalAttempts}</div>
            <div className="text-xs text-[var(--text-muted)]">开口次数</div>
          </div>
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
            <Sparkles size={20} className="text-[var(--mint-soft)] mx-auto mb-1" />
            <div className="text-xl font-bold text-[var(--text-primary)]">{completedItems}</div>
            <div className="text-xs text-[var(--text-muted)]">练习内容</div>
          </div>
        </div>

        {items.slice(0, completedItems).map((it) => (
          <div key={it.id} className="bg-[var(--mint-soft)]/10 border border-[var(--mint-soft)]/20 rounded-2xl p-4 text-left">
            <p className="text-sm font-bold text-[var(--text-primary)]">{it.textKo}</p>
            <p className="text-xs text-[var(--text-muted)]">{it.textZh}</p>
            <p className="text-[10px] text-[var(--mint-soft)] mt-1">已练习</p>
          </div>
        ))}

        <div className="flex gap-3">
          <button onClick={onClose} className="flex-1 py-3 rounded-xl bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] font-medium text-sm">
            返回发音页
          </button>
          <button onClick={handleRestart} className="flex-1 py-3 rounded-xl bg-[var(--pink-primary)] text-white font-medium text-sm">
            再来一轮
          </button>
        </div>
      </div>
    );
  }

  // ═══════════════════════════════════════════
  // PRACTICE STEPS
  // ═══════════════════════════════════════════
  const stepNames: Record<StepType, string> = {
    target: '了解目标', listen: '听标准音', segments: '分段练习',
    record: '开口录音', compare: '回放对比', settlement: '',
  };

  const currentItem = items[itemIdx];
  const currentSeq = currentItem?.segments?.length
    ? ['target', 'segments', 'record', 'compare']
    : ['target', 'record', 'compare'];
  const totalSteps = items.reduce((sum, it) => sum + (it.segments?.length ? 4 : 3), 0);
  const doneSteps = items.slice(0, itemIdx).reduce((sum, it) => sum + (it.segments?.length ? 4 : 3), 0);
  const stepIdx = currentSeq.indexOf(step);
  const progress = ((doneSteps + (stepIdx >= 0 ? stepIdx : 0)) / totalSteps) * 100;

  return (
    <div className="py-4 max-w-lg mx-auto space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1">
          <button onClick={() => {
            if (step !== 'target' && !confirm('确定退出？当前进度不会保存')) return;
            onClose();
          }} className="p-1 text-[var(--text-muted)] hover:text-[var(--text-primary)]">
            <ArrowLeft size={20} />
          </button>
          {(itemIdx > 0 || step !== 'target') && (
            <button onClick={goPrevStep} className="text-xs px-2 py-1 rounded-lg bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
              上一步
            </button>
          )}
        </div>
        <div className="flex flex-col items-center">
          <span className="text-xs font-medium text-[var(--text-primary)]">{stepNames[step]}</span>
          <span className="text-[10px] text-[var(--text-muted)]">{itemIdx + 1} / {items.length}</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-[var(--text-muted)]">
          <Mic size={12} />{totalAttempts}
        </div>
      </div>

      {/* Progress bar */}
      <div className="w-full bg-[var(--border-color)]/40 rounded-full h-1.5 overflow-hidden">
        <div className="h-full rounded-full bg-gradient-to-r from-[var(--mint-soft)] to-[var(--pink-primary)] transition-all duration-500 ease-out"
          style={{ width: `${progress}%` }} />
      </div>

      {/* Card */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-8 min-h-[460px] flex flex-col items-center justify-center text-center space-y-5">
        {/* ── TARGET ── */}
        {step === 'target' && (
          <>
            <StepBadge label="今日目标" />
            <div className="text-4xl">{item.type === 'sound' ? '🔤' : item.type === 'word' ? '📝' : '💬'}</div>
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">{item.textKo}</h2>
            {item.textZh && <p className="text-sm text-[var(--text-muted)]">{item.textZh}</p>}
            {item.focus.length > 0 && (
              <div className="flex flex-wrap gap-1.5 justify-center">
                {item.focus.map((f) => (
                  <span key={f} className="text-[10px] px-2 py-0.5 rounded-full bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]">{f}</span>
                ))}
              </div>
            )}
            {item.tips && (
              <div className="bg-[var(--bg-input)] rounded-2xl p-4 text-left space-y-1 w-full">
                {item.tips.map((t, i) => (
                  <p key={i} className="text-xs text-[var(--text-secondary)]">💡 {t}</p>
                ))}
              </div>
            )}
            <button onClick={goNextStep} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
              开始练习
            </button>
          </>
        )}

        {/* ── SEGMENTS ── */}
        {step === 'segments' && item.segments && (
          <>
            <StepBadge label="分段练习" />
            <p className="text-xs text-[var(--text-muted)]">点击每个音听发音，注意区别</p>
            <div className={`w-full ${item.segments.length <= 3 ? 'flex flex-wrap gap-3 justify-center' : 'space-y-2'}`}>
              {item.segments.map((seg, i) => (
                item.segments!.length <= 3 ? (
                  <button
                    key={i}
                    onClick={() => playSegment(seg.text)}
                    className="flex flex-col items-center gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] hover:border-[var(--pink-primary)]/50 hover:bg-[var(--pink-primary)]/5 active:scale-95 rounded-2xl px-6 py-5 transition-all min-w-[90px] shadow-sm"
                  >
                    <span className="text-4xl font-bold text-[var(--text-primary)]" style={{ fontFamily: "'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif" }}>{seg.text}</span>
                    {seg.hint && <span className="text-[10px] text-[var(--text-muted)] text-center">{seg.hint}</span>}
                    <Volume2 size={16} className="text-[var(--pink-primary)]" />
                  </button>
                ) : (
                  <div key={i} className="flex items-center justify-between bg-[var(--bg-input)] rounded-xl px-4 py-3">
                    <div className="text-left">
                      <span className="text-lg font-bold text-[var(--text-primary)]">{seg.text}</span>
                      {seg.hint && <span className="text-xs text-[var(--text-muted)] ml-2">{seg.hint}</span>}
                    </div>
                    <button
                      onClick={() => playSegment(seg.text)}
                      className="p-2 rounded-xl text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/10 transition-colors"
                    >
                      <Volume2 size={18} />
                    </button>
                  </div>
                )
              ))}
            </div>
            <button onClick={goNextStep} className="w-full py-3 bg-[var(--pink-primary)] text-white rounded-2xl font-bold text-sm">
              准备好了，录音
            </button>
          </>
        )}

        {/* ── RECORD ── */}
        {step === 'record' && (
          <>
            <StepBadge label="开口录音" />
            <p className="text-sm text-[var(--text-primary)] font-bold">轮到你了</p>
            <h2 className="text-2xl font-extrabold text-[var(--text-primary)]">{item.textKo}</h2>

            {!recording ? (
              <button
                onClick={startRecording}
                className="p-6 rounded-full bg-[var(--pink-primary)] text-white hover:opacity-90 transition-all active:scale-95"
              >
                <Mic size={32} />
              </button>
            ) : (
              <button
                onClick={stopRecording}
                className="p-6 rounded-full bg-[var(--color-danger)] text-white animate-pulse active:scale-95 transition-all"
              >
                <MicOff size={32} />
              </button>
            )}
            <p className="text-xs text-[var(--text-muted)]">
              {recording ? '正在听你说... 再点一次结束' : '点击开始录音'}
            </p>

            {micError && (
              <div className="flex items-center gap-2 text-xs text-[var(--peach-soft)] bg-[var(--peach-soft)]/10 rounded-xl px-3 py-2">
                <AlertTriangle size={14} />
                {micError}
              </div>
            )}

            {!recording && (
              <div className="flex gap-3 w-full">
                <button
                  onClick={goNextStep}
                  className="flex-1 py-3 rounded-2xl font-medium text-sm bg-[var(--bg-input)] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                >
                  跳过
                </button>
                <button
                  onClick={goNextStep}
                  disabled={!recordingUrl}
                  className={`flex-1 py-3 rounded-2xl font-bold text-sm transition-colors ${
                    recordingUrl
                      ? 'bg-[var(--pink-primary)] text-white'
                      : 'bg-[var(--bg-input)] text-[var(--text-muted)] opacity-50'
                  }`}
                >
                  {recordingUrl ? '听我的录音' : '请先录音'}
                </button>
              </div>
            )}

            {recording && (
              <p className="text-[10px] text-[var(--text-muted)]">最长 10 秒，说完请手动结束</p>
            )}
          </>
        )}

        {/* ── COMPARE ── */}
        {step === 'compare' && (
          <>
            <StepBadge label="回放对比" />
            <p className="text-xs text-[var(--text-muted)]">听听你的发音，和标准音对比</p>

            <div className="grid grid-cols-2 gap-4 w-full">
              {/* Standard */}
              <div className="bg-[var(--bg-input)] rounded-2xl p-5 text-center space-y-3">
                <p className="text-xs text-[var(--text-muted)]">标准音</p>
                <h3 className="text-lg font-bold text-[var(--text-primary)]">{item.textKo}</h3>
                <button onClick={playStandard} className="p-3 rounded-xl bg-[var(--mint-soft)]/10 text-[var(--mint-soft)] hover:bg-[var(--mint-soft)]/20 transition-colors">
                  <Play size={22} />
                </button>
              </div>
              {/* Mine */}
              <div className="bg-[var(--bg-input)] rounded-2xl p-5 text-center space-y-3">
                <p className="text-xs text-[var(--text-muted)]">我的录音</p>
                <h3 className="text-lg font-bold text-[var(--pink-primary)]">{item.textKo}</h3>
                <button
                  onClick={playRecording}
                  disabled={!recordingUrl || isPlaying}
                  className={`p-3 rounded-xl transition-colors ${
                    recordingUrl
                      ? 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)] hover:bg-[var(--pink-primary)]/20'
                      : 'bg-[var(--bg-card)] text-[var(--text-muted)]'
                  }`}
                >
                  <Play size={22} />
                </button>
              </div>
            </div>

            {/* Tips reminder */}
            {item.tips && (
              <div className="bg-[var(--pink-pale)]/10 border border-[var(--pink-primary)]/10 rounded-2xl p-4 text-left w-full">
                <p className="text-xs font-bold text-[var(--text-primary)] mb-1">重点检查</p>
                {item.tips.map((t, i) => (
                  <p key={i} className="text-xs text-[var(--text-secondary)]">• {t}</p>
                ))}
              </div>
            )}

            <div className="flex gap-3 w-full">
              <button onClick={handleReRecord} className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[var(--bg-input)] text-[var(--text-secondary)] font-medium text-sm hover:text-[var(--text-primary)] transition-colors">
                <RotateCcw size={14} />
                再读一次
              </button>
              <button onClick={goNextStep} className="flex-1 flex items-center justify-center gap-1.5 py-3 rounded-xl bg-[var(--pink-primary)] text-white font-medium text-sm">
                {itemIdx + 1 >= items.length ? '完成练习' : '下一题'}
                <ChevronRight size={16} />
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
