let currentAudio: HTMLAudioElement | null = null;

export function cancelSpeech() {
  if (currentAudio) {
    currentAudio.pause();
    currentAudio.onended = null;
    currentAudio.src = '';
    currentAudio = null;
  }
  window.speechSynthesis?.cancel();
}

export async function speak(text: string, rate: number = 1.0, onEnd?: () => void) {
  if (typeof window === 'undefined') {
    onEnd?.();
    return;
  }
  if (!text) {
    onEnd?.();
    return;
  }

  cancelSpeech();

  // 1. Qwen3-TTS (阿里云 — best Korean pronunciation)
  try {
    await speakViaQwen(text);
    onEnd?.();
    return;
  } catch { /* fall through */ }

  // 2. Baidu TTS
  try {
    await speakViaBaidu(text, rate);
    onEnd?.();
    return;
  } catch { /* fall through */ }

  // 3. Browser speechSynthesis (last resort)
  await fallbackSpeak(text, rate);
  onEnd?.();
}

async function speakViaQwen(text: string): Promise<void> {
  const res = await fetch('/api/tts/qwen', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text }),
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
    u.onerror = () => resolve();
    window.speechSynthesis.speak(u);
  });
}
