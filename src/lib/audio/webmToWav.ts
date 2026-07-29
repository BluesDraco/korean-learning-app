// 客户端：录音 blob (webm/mp4/wav) → wav 16k mono PCM。
// 用浏览器原生 AudioContext 解码 + OfflineAudioContext 重采样，无第三方依赖。

'use client';

export async function encodeToWav16kMono(blob: Blob): Promise<Blob> {
  const arr = await blob.arrayBuffer();
  // Safari 老版用 webkitAudioContext
  const Ctor: typeof AudioContext =
    (window as unknown as { AudioContext?: typeof AudioContext; webkitAudioContext?: typeof AudioContext })
      .AudioContext ||
    (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
  const ctx = new Ctor();
  const decoded = await ctx.decodeAudioData(arr.slice(0));
  // 重采样：用 OfflineAudioContext 1ch / 16000Hz
  const targetRate = 16000;
  const frames = Math.max(1, Math.ceil(decoded.duration * targetRate));
  const OAC = (window as unknown as { OfflineAudioContext?: typeof OfflineAudioContext; webkitOfflineAudioContext?: typeof OfflineAudioContext }).OfflineAudioContext ||
    (window as unknown as { webkitOfflineAudioContext: typeof OfflineAudioContext }).webkitOfflineAudioContext;
  const offline = new OAC(1, frames, targetRate);
  const src = offline.createBufferSource();
  src.buffer = decoded;
  src.connect(offline.destination);
  src.start();
  const rendered = await offline.startRendering();
  ctx.close().catch(() => {});
  const samples = rendered.getChannelData(0);
  return floatToWav(samples, targetRate);
}

// VAD (@ricky0123/vad-web) 的 onSpeechEnd 已输出 16k mono Float32Array，直接编码即可，无需重采样。
export function floatToWav(samples: Float32Array, sampleRate: number): Blob {
  const numChannels = 1;
  const bitsPerSample = 16;
  const byteRate = (sampleRate * numChannels * bitsPerSample) / 8;
  const blockAlign = (numChannels * bitsPerSample) / 8;
  const dataLen = samples.length * 2;
  const buffer = new ArrayBuffer(44 + dataLen);
  const view = new DataView(buffer);
  // RIFF header
  writeStr(view, 0, 'RIFF');
  view.setUint32(4, 36 + dataLen, true);
  writeStr(view, 8, 'WAVE');
  // fmt chunk
  writeStr(view, 12, 'fmt ');
  view.setUint32(16, 16, true);          // PCM chunk size
  view.setUint16(20, 1, true);           // format = PCM
  view.setUint16(22, numChannels, true);
  view.setUint32(24, sampleRate, true);
  view.setUint32(28, byteRate, true);
  view.setUint16(32, blockAlign, true);
  view.setUint16(34, bitsPerSample, true);
  // data chunk
  writeStr(view, 36, 'data');
  view.setUint32(40, dataLen, true);
  // PCM samples
  let offset = 44;
  for (let i = 0; i < samples.length; i++) {
    const s = Math.max(-1, Math.min(1, samples[i]));
    view.setInt16(offset, s < 0 ? s * 0x8000 : s * 0x7fff, true);
    offset += 2;
  }
  return new Blob([buffer], { type: 'audio/wav' });
}

function writeStr(view: DataView, offset: number, str: string) {
  for (let i = 0; i < str.length; i++) view.setUint8(offset + i, str.charCodeAt(i));
}
