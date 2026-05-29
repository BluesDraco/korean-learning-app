let audioEl: HTMLAudioElement | null = null;

const TTS_BASE = 'https://fanyi.sogou.com/reventondc/tts';

export function speak(text: string, rate: number = 1.0) {
  if (typeof window === 'undefined') return;
  if (!text) return;

  if (audioEl) {
    audioEl.pause();
    audioEl = null;
  }

  const url = `${TTS_BASE}?text=${encodeURIComponent(text)}&lang=ko-KR`;
  const audio = new Audio(url);
  audioEl = audio;
  audio.playbackRate = rate;

  audio.play().catch(() => {
    fallbackViaApi(text, rate);
  });

  audio.onended = () => { audioEl = null; };
  audio.onerror = () => {
    audioEl = null;
    fallbackViaApi(text, rate);
  };
}

async function fallbackViaApi(text: string, rate: number) {
  try {
    const res = await fetch('/api/tts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text, rate: String(rate) }),
    });
    if (!res.ok) throw new Error('API failed');
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const audio = new Audio(url);
    audioEl = audio;
    audio.playbackRate = rate;
    audio.play();
    audio.onended = () => { URL.revokeObjectURL(url); audioEl = null; };
  } catch {
    window.speechSynthesis.cancel();
    const voices = window.speechSynthesis.getVoices();
    const koVoice = voices.find((v) => v.lang.startsWith('ko')) || null;
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = rate;
    u.pitch = 1;
    u.volume = 1;
    if (koVoice) u.voice = koVoice;
    window.speechSynthesis.speak(u);
  }
}
