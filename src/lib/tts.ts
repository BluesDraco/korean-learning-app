let audioCtx: AudioContext | null = null;
let currentSource: AudioBufferSourceNode | null = null;
let currentAudio: HTMLAudioElement | null = null;

function getCtx(): AudioContext {
  if (!audioCtx) audioCtx = new AudioContext();
  return audioCtx;
}

export function cancelSpeech() {
  if (currentSource) {
    try { currentSource.stop(); } catch { /* already stopped */ }
    currentSource = null;
  }
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.onended = null;
    currentAudio.src = '';
    currentAudio = null;
  }
  window.speechSynthesis?.cancel();
}

export async function speak(text: string, rate: number = 1.0) {
  if (typeof window === 'undefined') return;
  if (!text) return;

  cancelSpeech();

  try {
    await speakViaEdge(text, rate);
  } catch {
    try {
      await speakViaBaidu(text, rate);
    } catch {
      await fallbackSpeak(text, rate);
    }
  }
}

async function speakViaEdge(text: string, rate: number): Promise<void> {
  const pct = Math.round((rate - 1) * 100);
  const rateStr = pct >= 0 ? `+${pct}%` : `${pct}%`;
  const ssml = `<speak xmlns="http://www.w3.org/2001/10/synthesis" xmlns:mstts="http://www.w3.org/2001/mstts" version="1.0" xml:lang="ko-KR">
    <voice name="ko-KR-SunHiNeural">
      <prosody rate="${rateStr}" pitch="0%">
        ${escXml(text)}
      </prosody>
    </voice>
  </speak>`;

  const ws = new WebSocket(
    'wss://speech.platform.bing.com/consumer/speech/synthesize/readaloud?TrustedClientToken=6A5AA1D4EAFF4E9FB37E23D68491D6F4'
  );

  const ctx = getCtx();
  const chunks: Uint8Array[] = [];

  await new Promise<void>((resolve, reject) => {
    const timer = setTimeout(() => { ws.close(); reject(new Error('timeout')); }, 15000);

    ws.onopen = () => {
      const cfg = [
        `X-RequestId:${crypto.randomUUID()}`,
        'Content-Type:application/ssml+xml',
        `X-Timestamp:${new Date().toISOString()}`,
        'Path:ssml',
        'X-OutputFormat:raw-24khz-16bit-mono-pcm',
      ].join('\r\n');
      ws.send(cfg);
      ws.send(ssml);
    };

    ws.onmessage = (evt) => {
      if (typeof evt.data === 'string') {
        if (evt.data.includes('turn.end')) {
          clearTimeout(timer);
          ws.close();
          // Wait for audio playback to finish before resolving
          playPcm24k(ctx, chunks).then(resolve);
        }
      } else if (evt.data instanceof ArrayBuffer) {
        const raw = new Uint8Array(evt.data);
        const marker = new TextEncoder().encode('Path:audio\r\n');
        const idx = indexOfBytes(raw, marker);
        if (idx >= 0) {
          chunks.push(raw.slice(idx + marker.length));
        }
      }
    };

    ws.onerror = () => { clearTimeout(timer); ws.close(); reject(new Error('Edge unreachable')); };
    ws.onclose = () => { clearTimeout(timer); if (chunks.length === 0) reject(new Error('no data')); };
  });
}

function playPcm24k(ctx: AudioContext, chunks: Uint8Array[]): Promise<void> {
  const totalLen = chunks.reduce((s, c) => s + c.length, 0);
  const buf = new ArrayBuffer(totalLen);
  const view = new Uint8Array(buf);
  let off = 0;
  for (const c of chunks) { view.set(c, off); off += c.length; }

  const samples = totalLen / 2;
  const audioBuf = ctx.createBuffer(1, samples, 24000);
  const chan = audioBuf.getChannelData(0);
  const dv = new DataView(buf);
  for (let i = 0; i < samples; i++) {
    chan[i] = dv.getInt16(i * 2, true) / 32768;
  }

  return new Promise<void>((resolve) => {
    const src = ctx.createBufferSource();
    src.buffer = audioBuf;
    src.connect(ctx.destination);
    currentSource = src;
    src.onended = () => {
      currentSource = null;
      resolve();
    };
    src.start();
  });
}

async function speakViaBaidu(text: string, rate: number): Promise<void> {
  const res = await fetch('/api/tts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, rate: String(rate) }),
  });
  if (!res.ok) throw new Error('Baidu failed');
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);

  await new Promise<void>((resolve, reject) => {
    const audio = new Audio(url);
    currentAudio = audio;
    audio.onended = () => {
      URL.revokeObjectURL(url);
      currentAudio = null;
      resolve();
    };
    audio.onerror = () => {
      URL.revokeObjectURL(url);
      currentAudio = null;
      reject(new Error('audio playback failed'));
    };
    audio.play().catch((e) => {
      if (e.name === 'AbortError') {
        URL.revokeObjectURL(url);
        currentAudio = null;
        resolve(); // cancelled, not a real error
      } else {
        reject(e);
      }
    });
  });
}

async function fallbackSpeak(text: string, rate: number): Promise<void> {
  return new Promise<void>((resolve) => {
    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();
    const koVoice = voices.find((v) => v.lang.startsWith('ko')) || null;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = rate;
    u.pitch = 1;
    u.volume = 1;
    if (koVoice) u.voice = koVoice;
    u.onend = () => resolve();
    u.onerror = () => resolve(); // cancelled = resolve silently
    window.speechSynthesis.speak(u);
  });
}

function escXml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function indexOfBytes(haystack: Uint8Array, needle: Uint8Array): number {
  outer: for (let i = 0; i <= haystack.length - needle.length; i++) {
    for (let j = 0; j < needle.length; j++) {
      if (haystack[i + j] !== needle[j]) continue outer;
    }
    return i;
  }
  return -1;
}
