// 阿里云百炼 · 实时语音识别（Paraformer 多语种，支持韩语）
// 前端 VAD 录完一整句 → POST 16k mono 16-bit PCM 的 WAV。这里剥 WAV 头拿裸 PCM，
// 走百炼 WebSocket 流式：run-task → 分片推 PCM → finish-task → 收 result-generated / task-finished。
// 一次性识别封装成 Promise，对上层保持「一句话识别」同款签名。
//
// 为什么换：原 NLS「一句话识别」appkey 绑的是中文模型，韩语音频被按中文解码成乱码
// （实测 안녕하세요… → "你觉得恐怖为谁啊？"）。Paraformer-realtime-v2 用 DASHSCOPE_API_KEY，
// 同电台账号，实测一字不差识别韩语。

import crypto from 'crypto';

const DASHSCOPE_API_KEY = process.env.DASHSCOPE_API_KEY;
const WS_URL = 'wss://dashscope.aliyuncs.com/api-ws/v1/inference/';
const MODEL = 'paraformer-realtime-v2';

export interface RecognizeOptions {
  [k: string]: unknown;
  /** 兼容旧签名，当前实现只吃裸 PCM，format 仅用于剥 WAV 头判断。默认 wav。 */
  format?: string;
  /** 默认 16000 */
  sampleRate?: number;
}

// 剥掉标准 44 字节 WAV 头，拿裸 PCM。非 wav 则原样返回。
function stripWavHeader(buf: Buffer): Buffer {
  if (buf.length > 44 && buf.toString('ascii', 0, 4) === 'RIFF' && buf.toString('ascii', 8, 12) === 'WAVE') {
    // 找 "data" chunk（多数是固定 44，但稳妥起见扫一下）
    let offset = 12;
    while (offset + 8 <= buf.length) {
      const id = buf.toString('ascii', offset, offset + 4);
      const size = buf.readUInt32LE(offset + 4);
      if (id === 'data') return buf.subarray(offset + 8, offset + 8 + size);
      offset += 8 + size;
    }
    return buf.subarray(44); // 兜底
  }
  return buf;
}

export async function recognize(audio: Buffer, opts: RecognizeOptions = {}): Promise<string> {
  if (!DASHSCOPE_API_KEY) throw new Error('DASHSCOPE_API_KEY not configured');
  const sampleRate = opts.sampleRate || 16000;
  const format = opts.format || 'wav';
  const pcm = format === 'wav' ? stripWavHeader(audio) : audio;
  if (pcm.length === 0) return '';

  return await new Promise<string>((resolve, reject) => {
    const ws = new WebSocket(WS_URL, {
      headers: {
        Authorization: `bearer ${DASHSCOPE_API_KEY}`,
        'X-DashScope-DataInspection': 'enable',
      },
    } as unknown as string);

    const taskId = crypto.randomUUID().replace(/-/g, '');
    const finalized: string[] = [];  // 已定稿句子（sentence_end=true）
    let current = '';                // 进行中这句（sentence_end=false 的最新态）
    let result = '';
    let settled = false;

    const done = (err?: Error) => {
      if (settled) return;
      settled = true;
      try { ws.close(); } catch { /* ignore */ }
      if (err) reject(err);
      else resolve(result.trim());
    };

    const timer = setTimeout(() => done(new Error('ASR timeout')), 15_000);

    ws.onopen = () => {
      ws.send(JSON.stringify({
        header: { action: 'run-task', task_id: taskId, streaming: 'duplex' },
        payload: {
          task_group: 'audio', task: 'asr', function: 'recognition', model: MODEL,
          parameters: { format: 'pcm', sample_rate: sampleRate, language_hints: ['ko'] },
          input: {},
        },
      }));
    };

    ws.onmessage = (e: MessageEvent) => {
      if (typeof e.data !== 'string') return; // 只处理下行 JSON 事件
      let msg: { header?: { event?: string; error_message?: string }; payload?: { output?: { sentence?: { text?: string; sentence_end?: boolean } } } };
      try { msg = JSON.parse(e.data); } catch { return; }
      const ev = msg.header?.event;
      if (ev === 'task-started') {
        const CHUNK = 3200; // 100ms @16k mono 16-bit
        for (let i = 0; i < pcm.length; i += CHUNK) {
          ws.send(pcm.subarray(i, i + CHUNK));
        }
        ws.send(JSON.stringify({
          header: { action: 'finish-task', task_id: taskId, streaming: 'duplex' },
          payload: { input: {} },
        }));
      } else if (ev === 'result-generated') {
        // Paraformer 流式：每个 result-generated 带一句的当前态。sentence_end=false 是中间态
        // （text 会随识别推进反复变化），=true 才是这句终稿。说多句时每句各来一个 end=true。
        // 若只做 result=text 覆盖，多句时前面的句子会被后面覆盖丢失。故按句累积：
        // finalized 存已定稿的句子，current 存进行中这句，最终结果 = finalized + current。
        const sentence = msg.payload?.output?.sentence;
        const text = sentence?.text;
        if (text) {
          if (sentence?.sentence_end) {
            finalized.push(text);
            current = '';
          } else {
            current = text;
          }
          result = [...finalized, current].filter(Boolean).join(' ');
        }
      } else if (ev === 'task-finished') {
        clearTimeout(timer);
        done();
      } else if (ev === 'task-failed') {
        clearTimeout(timer);
        done(new Error(`ASR failed: ${msg.header?.error_message || 'unknown'}`));
      }
    };

    ws.onerror = () => { clearTimeout(timer); done(new Error('ASR websocket error')); };
    // task-finished 已 settled，此处为 no-op；未 settled 说明连接在识别完成前异常关闭：
    // 有部分结果就返回部分，全空则 reject（让上层给"识别失败/没听清"提示，而非静默当空）
    ws.onclose = () => {
      clearTimeout(timer);
      if (result.trim()) done();
      else done(new Error('ASR connection closed before result'));
    };
  });
}
