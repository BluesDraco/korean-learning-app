'use client';

// 实时语音对话状态机。
// idle → listening → thinking → speaking → listening（循环），用户开口可打断（barge-in）。
// 复用现有资产：/api/asr/aliyun（ASR）、/api/ai/realtime-chat（流式）、tts.ts 的 speakViaMinimax/cancelSpeech/unlockAudioContext。

import { useCallback, useEffect, useRef, useState } from 'react';
import type { MicVAD } from '@ricky0123/vad-web';
import { floatToWav } from './webmToWav';
import { speakViaMinimax, cancelSpeech, unlockAudioContext } from '@/lib/tts';
import { precheckRecordingEnv } from './recorder';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

export type VoiceState = 'idle' | 'loading' | 'listening' | 'thinking' | 'speaking';

export interface VoiceTurnMsg {
  [k: string]: unknown;
  role: 'ai' | 'user';
  content: string;
}

export interface VoiceMeta {
  [k: string]: unknown;
  feedback?: {
    natural?: string; grammarError?: string;
    wrongPart?: string; correctPart?: string;
    betterWay?: string; betterWayZh?: string;
  };
  newWords?: { ko: string; zh: string; partOfSpeech?: string }[];
  taskCompleted?: boolean;
}

interface UseRealtimeVoiceOptions {
  [k: string]: unknown;
  systemHint: string;
  getRate?: () => number;
  // 兔莉音色：每次播放前实时读取，用户中途切换下一句即生效
  getVoice?: () => 'male' | 'female';
  // 用户一句识别完成：带上此刻的对话历史（不含这句），供外部并行发起纠错链路(/api/ai/chat)
  onUserFinal?: (text: string, context: VoiceTurnMsg[]) => void;
  onError?: (msg: string) => void;
}

// 按句切分：句末标点或换行触发一句。返回 [完整句子数组, 剩余未成句]
function splitSentences(buf: string): { sentences: string[]; rest: string } {
  const sentences: string[] = [];
  let rest = buf;
  const re = /[.!?。！？…\n]+/g;
  let m: RegExpExecArray | null;
  let lastIdx = 0;
  while ((m = re.exec(buf)) !== null) {
    const end = m.index + m[0].length;
    const s = buf.slice(lastIdx, end).trim();
    if (s) sentences.push(s);
    lastIdx = end;
  }
  rest = buf.slice(lastIdx);
  return { sentences, rest };
}

// VAD 模块懒加载缓存：动态 import 首次要下载/解析 JS chunk（~并触发 WASM/模型预取）。
// overlay 打开时先 prewarm 一次，点 orb 时模块已就绪，省掉这段等待。
type VadModule = typeof import('@ricky0123/vad-web');
let vadModulePromise: Promise<VadModule> | null = null;
function loadVadModule(): Promise<VadModule> {
  if (!vadModulePromise) vadModulePromise = import('@ricky0123/vad-web');
  return vadModulePromise;
}

export function useRealtimeVoice(opts: UseRealtimeVoiceOptions) {
  const [state, setState] = useState<VoiceState>('idle');
  const [messages, setMessages] = useState<VoiceTurnMsg[]>([]);
  const { lang } = useLang();

  const vadRef = useRef<MicVAD | null>(null);
  // turnSeq：每次开口/打断/新一轮 +1，异步回调据此作废过期结果
  const turnSeqRef = useRef(0);
  const chatAbortRef = useRef<AbortController | null>(null);
  const contextRef = useRef<VoiceTurnMsg[]>([]);
  const stateRef = useRef<VoiceState>('idle');
  const optsRef = useRef(opts);
  optsRef.current = opts;

  const setBoth = useCallback((s: VoiceState) => {
    stateRef.current = s;
    setState(s);
  }, []);

  // TTS 句子队列：逐句串行播放，被打断时清空
  const speakQueueRef = useRef<string[]>([]);
  const speakingRef = useRef(false);
  // 麦克风是否已被暂停（兔莉说话期间）。用于任何路径的自愈恢复，防死锁。
  const micPausedRef = useRef(false);

  // 暂停麦克风：iOS 上麦克风占用音频会话(playAndRecord)会让外放静音/切听筒。
  // 兔莉说话期间彻底关麦（库的 pause 会 track.stop()），让音频会话回到纯播放态。
  // 代价：说话期间无法 barge-in 打断（用户已确认优先保声音）。
  const pauseMic = useCallback(async () => {
    if (micPausedRef.current || !vadRef.current) return;
    micPausedRef.current = true;
    try { await vadRef.current.pause(); } catch { /* ignore */ }
  }, []);

  // 恢复麦克风监听（库的 start 会重新 getUserMedia）。任何路径结束都应调用以自愈。
  const resumeMic = useCallback(async () => {
    if (!micPausedRef.current || !vadRef.current) return;
    micPausedRef.current = false;
    try { await vadRef.current.start(); } catch { /* ignore */ }
  }, []);

  const drainSpeakQueue = useCallback(async (seq: number) => {
    if (speakingRef.current) return;
    speakingRef.current = true;
    await pauseMic();
    const rate = optsRef.current.getRate?.();
    while (speakQueueRef.current.length > 0) {
      if (seq !== turnSeqRef.current) break;
      const sentence = speakQueueRef.current.shift()!;
      const voice = optsRef.current.getVoice?.();
      await new Promise<void>((resolve) => speakViaMinimax(sentence, rate, resolve, voice));
    }
    speakingRef.current = false;
    // 仅当本轮仍有效时恢复（打断/停止走各自路径恢复，避免重复）
    if (seq === turnSeqRef.current) await resumeMic();
  }, [pauseMic, resumeMic]);

  // 打断：作废当前轮，停 TTS、abort chat、清队列
  const interrupt = useCallback(() => {
    turnSeqRef.current++;
    cancelSpeech();
    chatAbortRef.current?.abort();
    chatAbortRef.current = null;
    speakQueueRef.current = [];
    speakingRef.current = false;
  }, []);

  const runTurn = useCallback(async (audio: Float32Array) => {
    const seq = ++turnSeqRef.current;
    setBoth('thinking');

    // 1. VAD 输出已是 16k mono Float32，直接编码 WAV
    const wav = floatToWav(audio, 16000);

    // 2. ASR
    let userText = '';
    try {
      const res = await fetch('/api/asr/aliyun', {
        method: 'POST',
        headers: { 'Content-Type': 'audio/wav' },
        body: wav,
      });
      if (res.status === 429) {
        optsRef.current.onError?.(t('audio.quota_exhausted', lang));
        if (seq === turnSeqRef.current) setBoth('listening');
        return;
      }
      if (!res.ok) throw new Error('asr failed');
      const data = await res.json();
      userText = (data.text || '').trim();
    } catch {
      optsRef.current.onError?.(t('audio.not_clear', lang));
      if (seq === turnSeqRef.current) setBoth('listening');
      return;
    }
    if (seq !== turnSeqRef.current) return; // 被打断
    if (!userText) {
      setBoth('listening');
      return;
    }

    // 先记历史（用于纠错链路的 context），再 push 这句
    const ctxBefore = contextRef.current.slice();
    setMessages((prev) => [...prev, { role: 'user', content: userText }]);
    contextRef.current = [...contextRef.current, { role: 'user', content: userText }];

    // 3. 双链路：realtime-chat 流式吐纯韩语（低延迟播出）；纠错/新词/任务由 onUserFinal 里并行调 /api/ai/chat 拿。
    //    两次调用独立：feedback 只评价用户这句（与 AI 回什么无关），不冲突。
    optsRef.current.onUserFinal?.(userText, ctxBefore);

    const controller = new AbortController();
    chatAbortRef.current = controller;
    let replyText = '';
    let spokenUpto = 0;     // 已入队 TTS 的位置
    let firstSpoken = false;
    setMessages((prev) => [...prev, { role: 'ai', content: '' }]);

    const flushSentences = (final: boolean) => {
      const pending = replyText.slice(spokenUpto);
      const { sentences, rest } = splitSentences(pending);
      const toSpeak = [...sentences];
      if (final && rest.trim()) toSpeak.push(rest.trim());
      if (toSpeak.length > 0) {
        if (!firstSpoken) { firstSpoken = true; setBoth('speaking'); }
        speakQueueRef.current.push(...toSpeak);
        spokenUpto = final ? replyText.length : replyText.length - rest.length;
        drainSpeakQueue(seq);
      }
    };

    try {
      const res = await fetch('/api/ai/realtime-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemHint: optsRef.current.systemHint,
          context: contextRef.current.slice(0, -1),
          userMessage: userText,
        }),
        signal: controller.signal,
      });
      if (res.status === 429) {
        optsRef.current.onError?.(t('audio.quota_exhausted', lang));
        if (seq === turnSeqRef.current) setBoth('listening');
        return;
      }
      if (!res.ok || !res.body) throw new Error('chat failed');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let sseBuf = '';
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        if (seq !== turnSeqRef.current) { reader.cancel().catch(() => {}); return; }
        sseBuf += decoder.decode(value, { stream: true });
        const lines = sseBuf.split('\n');
        sseBuf = lines.pop() || '';
        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed.startsWith('data:')) continue;
          const payload = trimmed.slice(5).trim();
          if (payload === '[DONE]') continue;
          try {
            const delta: string = JSON.parse(payload).choices?.[0]?.delta?.content ?? '';
            if (!delta) continue;
            replyText += delta;
            const shown = replyText;
            setMessages((prev) => {
              const next = [...prev];
              for (let i = next.length - 1; i >= 0; i--) {
                if (next[i].role === 'ai') { next[i] = { ...next[i], content: shown }; break; }
              }
              return next;
            });
            flushSentences(false);
          } catch { /* 非 JSON 行，忽略 */ }
        }
      }
      if (seq === turnSeqRef.current) flushSentences(true);
    } catch (err) {
      if (err instanceof Error && err.name === 'AbortError') return; // 打断，静默
      optsRef.current.onError?.(t('audio.ai_failed', lang));
      if (seq === turnSeqRef.current) setBoth('listening');
      return;
    } finally {
      if (chatAbortRef.current === controller) chatAbortRef.current = null;
    }

    if (seq !== turnSeqRef.current) return;
    const finalReply = replyText.trim();
    if (finalReply) {
      contextRef.current = [...contextRef.current, { role: 'ai', content: finalReply }];
    }

    // 等队列播完再回到 listening
    while (speakingRef.current || speakQueueRef.current.length > 0) {
      if (seq !== turnSeqRef.current) return;
      await new Promise((r) => setTimeout(r, 120));
    }
    if (seq === turnSeqRef.current) setBoth('listening');
  }, [drainSpeakQueue, setBoth]);

  const start = useCallback(async () => {
    if (vadRef.current || stateRef.current !== 'idle') return;
    // 前置预检：非 https / 微信国产壳(录音无解) / 无 mediaDevices —— 拦在申请麦克风前，别让用户白折腾。
    const pre = precheckRecordingEnv();
    if (pre) {
      optsRef.current.onError?.(t(pre, lang));
      return;
    }
    // iOS 音频解锁必须在用户手势同步栈内——start 由按钮 onClick 直接调用
    unlockAudioContext();
    setBoth('loading');
    try {
      const { MicVAD } = await loadVadModule();
      const vad = await MicVAD.new({
        baseAssetPath: '/vad/',
        onnxWASMBasePath: '/vad/',
        model: 'legacy',
        // getStream 默认已开 echoCancellation/noiseSuppression/autoGainControl（见库实现）。
        // 但浏览器 AEC 对外放/蓝牙的兔莉自身 TTS 消不干净，残留声易被默认灵敏阈值(0.3)
        // 当成用户开口触发自我打断。上调阈值 + 最短语音时长，让残留回声不易过线，
        // 同时真实开口仍能打断（barge-in 保留）。
        positiveSpeechThreshold: 0.6,
        negativeSpeechThreshold: 0.4,
        minSpeechMs: 500,
        ortConfig: (ort) => {
          ort.env.logLevel = 'error';
        },
        onSpeechStart: () => {
          // 用户开口：AI 正在说就打断
          if (stateRef.current === 'speaking' || stateRef.current === 'thinking') {
            interrupt();
          }
          setBoth('listening');
        },
        onSpeechEnd: (audio) => { void runTurn(audio); },
      });
      vadRef.current = vad;
      vad.start();
      setBoth('listening');
    } catch (err) {
      console.error('[useRealtimeVoice] VAD init failed', err);
      const name = (err as { name?: string })?.name || '';
      let msg: string;
      if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        msg = t('audio.mic_permission_denied', lang);
      } else if (name === 'NotFoundError' || name === 'DevicesNotFoundError') {
        msg = t('audio.mic_not_found', lang);
      } else if (name === 'NotReadableError' || name === 'TrackStartError') {
        msg = t('audio.mic_busy', lang);
      } else {
        // 未分类错误：附上真实 err.name/message 供线上诊断（临时，定位后可精简）
        const detail = name || (err as { message?: string })?.message || 'unknown';
        msg = `${t('audio.mic_init_failed', lang)}（${detail}）`;
      }
      optsRef.current.onError?.(msg);
      setBoth('idle');
    }
  }, [interrupt, runTurn, setBoth]);

  const stop = useCallback(() => {
    interrupt(); // turnSeq++ / cancelSpeech / abort / 清队列
    micPausedRef.current = false; // VAD 即将销毁，重置暂停标记防下次 start 残留
    if (vadRef.current) {
      vadRef.current.destroy().catch(() => {});
      vadRef.current = null;
    }
    setBoth('idle');
  }, [interrupt, setBoth]);

  // 卸载清理：这些 ref 是可变值容器（非 DOM 节点），cleanup 里取最新值正是所需——
  // 作废当前轮、中止当前请求、销毁当前 VAD 实例。
  useEffect(() => {
    return () => {
      // eslint-disable-next-line react-hooks/exhaustive-deps
      turnSeqRef.current++;
      cancelSpeech();
      chatAbortRef.current?.abort();
      vadRef.current?.destroy().catch(() => {});
      vadRef.current = null;
    };
  }, []);

  // 预热：overlay 打开时调用，提前下载/解析 VAD 模块 chunk（~最重的一步）。
  // 不申请麦克风、不 new VAD（那需在点击手势内做），只把模块加载做掉。
  const prewarm = useCallback(() => {
    loadVadModule().catch(() => { vadModulePromise = null; });
  }, []);

  return { state, messages, start, stop, prewarm };
}
