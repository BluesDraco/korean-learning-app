'use client';

// 手动点麦录音 + 服务端 ASR hook。
// 点麦开始录音 → 再点停止 → 转 16k WAV → POST /api/asr/aliyun 拿识别文本。
// 复用现成资产：AudioRecorder(权限/iOS timeslice/微信兜底)、encodeToWav16kMono、unlockAudioContext。
// 不用 VAD —— 由用户手动控制起止。

import { useCallback, useEffect, useRef, useState } from 'react';
import { AudioRecorder, revokeRecording, parseErrorKey } from './recorder';
import { encodeToWav16kMono } from './webmToWav';
import { unlockAudioContext } from '@/lib/tts';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export type MicState = 'idle' | 'recording' | 'recognizing';

// meta 携带原始音频（16k WAV）与时长，供"可回放语音条"存本地 IDB；只做转文字的调用方可忽略。
export interface MicResultMeta {
  wav: Blob;
  durationMs: number;
}

interface UseMicRecorderOpts {
  onResult: (text: string, meta?: MicResultMeta) => void;
  onError: (msg: string) => void;
  maxMs?: number;
  minMs?: number;          // 低于此时长视为误触（点一下即松开），走 tooShortMsg
  tooShortMsg?: string;    // 录音过短提示（i18n 文案由调用方传入）
}

export interface UseMicRecorder {
  state: MicState;
  start: () => Promise<void>;
  stop: () => Promise<void>;
  cancel: () => void;
}

export function useMicRecorder({ onResult, onError, maxMs = 15000, minMs = 0, tooShortMsg }: UseMicRecorderOpts): UseMicRecorder {
  const [state, setState] = useState<MicState>('idle');
  const recorderRef = useRef<AudioRecorder | null>(null);
  const abortRef = useRef<AbortController | null>(null);
  const stateRef = useRef<MicState>('idle');
  const pendingStopRef = useRef(false);
  const startSeqRef = useRef(0);
  const optsRef = useRef({ onResult, onError, minMs, tooShortMsg });
  optsRef.current = { onResult, onError, minMs, tooShortMsg };
  const { lang } = useLang();

  const setBoth = useCallback((s: MicState) => {
    stateRef.current = s;
    setState(s);
  }, []);

  const start = useCallback(async () => {
    if (stateRef.current !== 'idle') return;
    const seq = ++startSeqRef.current;
    pendingStopRef.current = false;
    // iOS 音频解锁必须在用户手势同步栈内
    unlockAudioContext();
    const recorder = new AudioRecorder(maxMs);
    recorderRef.current = recorder;
    const res = await recorder.start();
    // 期间若发起了新的 start（代次变了），本次作废
    if (seq !== startSeqRef.current) { recorder.cancel(); return; }
    if (res.error) {
      recorderRef.current = null;
      pendingStopRef.current = false;
      const parsed = parseErrorKey(res.error);
      optsRef.current.onError(t(parsed.key, lang, parsed.params));
      return;
    }
    setBoth('recording');
    // 快速点按：start 异步期间已松手 → 立即停止
    if (pendingStopRef.current) { pendingStopRef.current = false; void stopRef.current(); }
  }, [maxMs, setBoth]);

  // stop 引用 ref，避免 start/stop 相互依赖导致的 useCallback 循环
  const stopRef = useRef<() => Promise<void>>(async () => {});

  const stop = useCallback(async () => {
    // start() 仍在异步启动中（还没到 recording）→ 标记待停止，交给 start 收尾
    if (stateRef.current === 'idle' && recorderRef.current) { pendingStopRef.current = true; return; }
    const recorder = recorderRef.current;
    if (!recorder || stateRef.current !== 'recording') return;
    setBoth('recognizing');
    let recording;
    try {
      recording = await recorder.stop();
    } catch {
      recording = null;
    }
    recorderRef.current = null;
    if (!recording || recording.blob.size === 0) {
      setBoth('idle');
      optsRef.current.onError(t('audio.no_sound', lang));
      return;
    }
    // 误触保护：点一下即松开（时长过短）不发起识别
    if (optsRef.current.minMs > 0 && recording.durationMs < optsRef.current.minMs) {
      revokeRecording(recording.url);
      setBoth('idle');
      optsRef.current.onError(optsRef.current.tooShortMsg || t('audio.too_short', lang));
      return;
    }

    let wav: Blob;
    try {
      wav = await encodeToWav16kMono(recording.blob);
    } catch {
      revokeRecording(recording.url);
      setBoth('idle');
      optsRef.current.onError(t('audio.process_failed', lang));
      return;
    }
    revokeRecording(recording.url);

    const controller = new AbortController();
    abortRef.current = controller;
    try {
      const resp = await fetch('/api/asr/aliyun', {
        method: 'POST',
        headers: { 'Content-Type': 'audio/wav' },
        body: wav,
        signal: controller.signal,
      });
      if (resp.status === 429) {
        setBoth('idle');
        optsRef.current.onError(t('audio.quota_exhausted', lang));
        return;
      }
      if (!resp.ok) throw new Error(String(resp.status));
      const data = await resp.json();
      const text = (data.text || '').trim();
      if (!text) {
        setBoth('idle');
        optsRef.current.onError(t('audio.recognition_failed', lang));
        return;
      }
      setBoth('idle');
      optsRef.current.onResult(text, { wav, durationMs: recording.durationMs });
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return;
      setBoth('idle');
      optsRef.current.onError(t('audio.recognition_network_error', lang));
    } finally {
      if (abortRef.current === controller) abortRef.current = null;
    }
  }, [setBoth]);
  stopRef.current = stop;

  const cancel = useCallback(() => {
    startSeqRef.current++;      // 作废进行中的 start
    pendingStopRef.current = false;
    recorderRef.current?.cancel();
    recorderRef.current = null;
    abortRef.current?.abort();
    abortRef.current = null;
    setBoth('idle');
  }, [setBoth]);

  useEffect(() => {
    return () => {
      startSeqRef.current++; // 作废进行中的 start，避免卸载后 setState
      recorderRef.current?.cancel();
      recorderRef.current = null;
      abortRef.current?.abort();
      abortRef.current = null;
    };
  }, []);

  return { state, start, stop, cancel };
}
