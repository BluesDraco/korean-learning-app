// Static audio registry — maps Korean text to pre-generated audio files.
// Covers: 40音 phonetics only (real human recordings for the phonetics page).
// All vocabulary/sentence pronunciation is handled by Edge-TTS (sunhi voice).

type AudioEntry = {
  url: string;
  slowUrl?: string;
  // 预生成时烘焙进文件的语速（如 0.75）。播放时按 用户rate/baseRate 设 playbackRate 补偿，
  // 使语速设置对静态词汇音频仍生效。40音真人录音不设此字段 → 原速播放，不变速。
  baseRate?: number;
};

export type { AudioEntry };

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

// 词汇/例句预生成音频索引（public/audio/vocab/vocab-index.json）。
// 客户端启动时异步加载一次并注册，使 speak() 命中静态文件、绕开实时 TTS。
// 失败静默：index 缺失只是回落实时 TTS，不影响功能。
const VOCAB_BASE_RATE = 0.75; // 与 scripts/gen-vocab-audio.mjs 的 -25% 一致
let vocabIndexLoaded = false;
export async function loadVocabAudioIndex(): Promise<void> {
  if (vocabIndexLoaded || typeof window === 'undefined') return;
  vocabIndexLoaded = true;
  try {
    const res = await fetch('/audio/vocab/vocab-index.json');
    if (!res.ok) return;
    const map = (await res.json()) as Record<string, string>;
    for (const [text, url] of Object.entries(map)) {
      // 已有 40 音真人录音优先，不被词汇文件覆盖
      if (registry.has(text.trim())) continue;
      registry.set(text.trim(), { url, baseRate: VOCAB_BASE_RATE });
    }
  } catch { /* 加载失败回落实时 TTS */ }
}

// ── 40音 phonetics (real human recordings, 47 entries) ──
// 范围：仅四十音核心字母。拼字示例 / 连读规则例句 / 综合拼读 / 合成器 / 练习题
// 全部走 Edge-TTS（sunhi 声），不在此注册。
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
  // Batchim demo words (b-01 ~ b-07)
  '박': { url: '/audio/phonetics/b-01.mp3' },
  '산': { url: '/audio/phonetics/b-02.mp3' },
  '옷': { url: '/audio/phonetics/b-03.mp3' },
  '말': { url: '/audio/phonetics/b-04.mp3' },
  '밤': { url: '/audio/phonetics/b-05.mp3' },
  '밥': { url: '/audio/phonetics/b-06.mp3' },
  '강': { url: '/audio/phonetics/b-07.mp3' },
});
