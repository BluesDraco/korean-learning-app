// Static audio registry — maps Korean text to pre-generated audio files.
// Covers: 40音 phonetics only (real human recordings for the phonetics page).
// All vocabulary/sentence pronunciation is handled by Edge-TTS (sunhi voice).

type AudioEntry = {
  url: string;
  slowUrl?: string;
};

const registry = new Map<string, AudioEntry>();

export function registerAudio(key: string, entry: AudioEntry): void {
  registry.set(key.trim(), entry);
}

export function registerMany(entries: Record<string, AudioEntry>): void {
  for (const [k, v] of Object.entries(entries)) {
    registry.set(k.trim(), v);
  }
}

export function getStaticAudio(text: string): AudioEntry | null {
  return registry.get(text.trim()) || null;
}

export function hasStaticAudio(text: string): boolean {
  return registry.has(text.trim());
}

// ── 40音 phonetics (real human recordings) ──
registerMany({
  '아': { url: '/audio/phonetics/v-01.mp3' },
  '야': { url: '/audio/phonetics/v-02.mp3' },
  '어': { url: '/audio/phonetics/v-03.mp3' },
  '여': { url: '/audio/phonetics/v-04.mp3' },
  '오': { url: '/audio/phonetics/v-05.mp3' },
  '요': { url: '/audio/phonetics/v-06.mp3' },
  '우': { url: '/audio/phonetics/v-07.mp3' },
  '유': { url: '/audio/phonetics/v-08.mp3' },
  '으': { url: '/audio/phonetics/v-09.mp3' },
  '이': { url: '/audio/phonetics/v-10.mp3' },
  '애': { url: '/audio/phonetics/v-11.mp3' },
  '얘': { url: '/audio/phonetics/v-12.mp3' },
  '에': { url: '/audio/phonetics/v-13.mp3' },
  '예': { url: '/audio/phonetics/v-14.mp3' },
  '와': { url: '/audio/phonetics/v-15.mp3' },
  '왜': { url: '/audio/phonetics/v-16.mp3' },
  '외': { url: '/audio/phonetics/v-17.mp3' },
  '워': { url: '/audio/phonetics/v-18.mp3' },
  '웨': { url: '/audio/phonetics/v-19.mp3' },
  '위': { url: '/audio/phonetics/v-20.mp3' },
  '의': { url: '/audio/phonetics/v-21.mp3' },
  // Consonant names (for alphabet display)
  '기역': { url: '/audio/phonetics/c-01.mp3' },
  '니은': { url: '/audio/phonetics/c-02.mp3' },
  '디귿': { url: '/audio/phonetics/c-03.mp3' },
  '리을': { url: '/audio/phonetics/c-04.mp3' },
  '미음': { url: '/audio/phonetics/c-05.mp3' },
  '비읍': { url: '/audio/phonetics/c-06.mp3' },
  '시옷': { url: '/audio/phonetics/c-07.mp3' },
  '이응': { url: '/audio/phonetics/c-08.mp3' },
  '지읒': { url: '/audio/phonetics/c-09.mp3' },
  '치읓': { url: '/audio/phonetics/c-10.mp3' },
  '키읔': { url: '/audio/phonetics/c-11.mp3' },
  '티읕': { url: '/audio/phonetics/c-12.mp3' },
  '피읖': { url: '/audio/phonetics/c-13.mp3' },
  '히읗': { url: '/audio/phonetics/c-14.mp3' },
  '쌍기역': { url: '/audio/phonetics/c-15.mp3' },
  '쌍디귿': { url: '/audio/phonetics/c-16.mp3' },
  '쌍비읍': { url: '/audio/phonetics/c-17.mp3' },
  '쌍시옷': { url: '/audio/phonetics/c-18.mp3' },
  '쌍지읒': { url: '/audio/phonetics/c-19.mp3' },
  // Consonant demo syllables (phonetics page uses CONSONANT_DEMO mapping)
  '차': { url: '/audio/phonetics/c-10.mp3' },
  '카': { url: '/audio/phonetics/c-11.mp3' },
  '타': { url: '/audio/phonetics/c-12.mp3' },
  '파': { url: '/audio/phonetics/c-13.mp3' },
  '까': { url: '/audio/phonetics/c-15.mp3' },
  '따': { url: '/audio/phonetics/c-16.mp3' },
  '빠': { url: '/audio/phonetics/c-17.mp3' },
  '싸': { url: '/audio/phonetics/c-18.mp3' },
  '짜': { url: '/audio/phonetics/c-19.mp3' },
});
