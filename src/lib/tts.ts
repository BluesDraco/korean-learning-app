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

  // Qwen3-TTS (阿里云 — best Korean pronunciation)
  try {
    await speakViaQwen(text);
    onEnd?.();
    return;
  } catch {
    onEnd?.();
  }
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

