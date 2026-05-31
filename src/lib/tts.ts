let currentAudio: HTMLAudioElement | null = null;

const TTS_SPEED_KEY = 'tts-speed';

export function getSpeechRate(): number {
  if (typeof window === 'undefined') return 0.8;
  try {
    const v = localStorage.getItem(TTS_SPEED_KEY);
    return v ? parseFloat(v) : 0.8;
  } catch {
    return 0.8;
  }
}

export function setSpeechRate(rate: number): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(TTS_SPEED_KEY, String(rate));
  } catch { /* ignore */ }
}

export function cancelSpeech() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.onended = null;
    currentAudio.src = '';
    currentAudio = null;
  }
  window.speechSynthesis?.cancel();
}

function cleanText(text: string): string {
  return text
    .replace(/🔊/g, '')
    .replace(/[●◉○◈◇◆▸►▻]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

export async function speak(text: string, explicitRate?: number, onEnd?: () => void) {
  const rate = explicitRate ?? getSpeechRate();
  if (typeof window === 'undefined') {
    onEnd?.();
    return;
  }
  const cleaned = cleanText(text);
  if (!cleaned) {
    onEnd?.();
    return;
  }

  cancelSpeech();

  // Qwen3-TTS (阿里云 — best Korean pronunciation)
  try {
    await speakViaQwen(cleaned, rate);
    onEnd?.();
    return;
  } catch {
    // fall through to browser speechSynthesis
  }

  // Browser speechSynthesis fallback
  try {
    await speakViaBrowser(cleaned, rate);
  } catch {
    // both failed, give up silently
  }
  onEnd?.();
}

async function speakViaBrowser(text: string, rate: number): Promise<void> {
  const synth = window.speechSynthesis;
  if (!synth) throw new Error('speechSynthesis not available');

  // Chrome needs a kick to start
  synth.cancel();

  await new Promise<void>((resolve) => {
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'ko-KR';
    utter.rate = rate;
    utter.onend = () => resolve();
    utter.onerror = () => resolve(); // don't reject — it's a best-effort fallback
    synth.speak(utter);
  });
}

async function speakViaQwen(text: string, rate: number): Promise<void> {
  const res = await fetch('/api/tts/qwen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text, speechRate: rate }),
  });
  if (!res.ok) throw new Error('Qwen failed');
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
      reject(new Error('playback failed'));
    };
    audio.play().catch((e) => {
      if (e.name === 'AbortError') {
        URL.revokeObjectURL(url);
        currentAudio = null;
        resolve();
      } else {
        reject(e);
      }
    });
  });
}

