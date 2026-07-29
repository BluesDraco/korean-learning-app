// 40 音播放工具 —— 把 PhoneticLetter 解析成「真人录音映射」并播放。
// 优先 audioRegistry（真人 MP3），未命中才回落 TTS。两个 phonetics 页面共用同一份。

import { getStaticAudio } from '@/lib/audio/audioRegistry';
import { speak } from '@/lib/tts';
import type { PhoneticLetter } from '@/data/phonetics';

// 字母名（命中 audioRegistry c-01~c-19.mp3 真人录音）
export const CONSONANT_DEMO: Record<string, string> = {
  'ㄱ': '기역', 'ㄴ': '니은', 'ㄷ': '디귿', 'ㄹ': '리을', 'ㅁ': '미음',
  'ㅂ': '비읍', 'ㅅ': '시옷', 'ㅈ': '지읒', 'ㅊ': '치읓',
  'ㅋ': '키읔', 'ㅌ': '티읕', 'ㅍ': '피읖', 'ㅎ': '히읗',
  'ㄲ': '쌍기역', 'ㄸ': '쌍디귿', 'ㅃ': '쌍비읍', 'ㅆ': '쌍시옷', 'ㅉ': '쌍지읒',
  // ㅇ 不在此表，回退 letter.name（이응）→ c-08.mp3
};

// batchim 示范音节（命中 audioRegistry b-01~b-07.mp3 真人录音）
export const BATCHIM_DEMO: Record<string, string> = {
  'ㄱ': '박', 'ㄴ': '산', 'ㄷ': '옷', 'ㄹ': '말', 'ㅁ': '밤',
  'ㅂ': '밥', 'ㅇ': '강',
};

export function getSpeakText(letter: PhoneticLetter): string {
  if (letter.type === 'vowel') return letter.name;
  if (letter.type === 'consonant' || letter.type === 'double') {
    const jamo = letter.letter.split('/')[0];
    return CONSONANT_DEMO[jamo] ?? letter.name;
  }
  if (letter.type === 'batchim') {
    const jamo = letter.letter.split('/')[0];
    return BATCHIM_DEMO[jamo] ?? CONSONANT_DEMO[jamo] ?? letter.name;
  }
  return letter.name;
}

/** 优先真人 MP3；未命中或加载失败回落 speakWord。新播放抢占上一个，避免叠播。
 *  用「同 text + 50ms 窗口」同步去抖代替 setTimeout —— 避免 setTimeout 打断 iOS 手势栈。 */
let currentAudio: HTMLAudioElement | null = null;
// 去抖状态：普通播放与字面播放独立，避免连音/字面切换被误判
let lastNormalText = '';
let lastNormalAt = 0;
let lastLiteralText = '';
let lastLiteralAt = 0;
// URL → Audio 元素池：40音固定 45 个文件，反复播放场景下复用元素避免重新解码
const audioPool = new Map<string, HTMLAudioElement>();

function getOrCreateAudio(url: string): HTMLAudioElement {
  let audio = audioPool.get(url);
  if (audio) {
    // Safari/iOS 在未加载时设 currentTime 会抛 InvalidStateError，忽略即可
    try { audio.currentTime = 0; } catch { /* ignore */ }
    return audio;
  }
  audio = new Audio(url);
  audio.preload = 'auto';
  audioPool.set(url, audio);
  return audio;
}

// batchim 示范音节 + 字母名 → 直接 URL（不经过 registry，不走 TTS，确保真人录音）
const DIRECT_URL: Record<string, string> = {
  // 收音示范音节
  '박': '/audio/phonetics/b-01.mp3', '산': '/audio/phonetics/b-02.mp3',
  '옷': '/audio/phonetics/b-03.mp3', '말': '/audio/phonetics/b-04.mp3',
  '밤': '/audio/phonetics/b-05.mp3', '밥': '/audio/phonetics/b-06.mp3',
  '강': '/audio/phonetics/b-07.mp3',
  // 辅音字母名（stage 5 letter page 用）
  '기역': '/audio/phonetics/c-01.mp3', '니은': '/audio/phonetics/c-02.mp3',
  '디귿': '/audio/phonetics/c-03.mp3', '리을': '/audio/phonetics/c-04.mp3',
  '미음': '/audio/phonetics/c-05.mp3', '비읍': '/audio/phonetics/c-06.mp3',
  '이응': '/audio/phonetics/c-08.mp3',
};

// 双收音示范词 → 标准发音映射。TTS 可能按字面误读（如 삶→살），回退前转为标准读音。
const CLUSTER_TTS_MAP: Record<string, string> = {
  '넋': '넉', '몫': '목', '넋두리': '넉뚜리',
  '앉다': '안따', '얹다': '언따', '앉히다': '안치다',
  '많다': '만타', '괜찮다': '괜찬타', '끊다': '끈타',
  '닭': '닥', '흙': '흑', '읽다': '익따',
  '삶': '삼', '젊다': '점따', '닮다': '담따',
  '넓다': '널따', '짧다': '짤따', '얇다': '얄따', '여덟': '여덜',
  '외곬': '외골',
  '핥다': '할따', '훑다': '훌따',
  '싫다': '실타', '뚫다': '뚤타', '앓다': '알타',
  '읊다': '읍따',
  '값': '갑', '없다': '업따', '가엾다': '가엽따',
  // 例外板块：ㄼ→ㅂ / ㄺ→ㄹ 反常读法
  '밟다': '밥따', '넓적하다': '넙쩌카다', '넓둥글다': '넙뚱글다', '넓죽하다': '넙쭈카다',
  '읽고': '일꼬', '맑게': '말께', '묽고': '물꼬',
};

function _playNow(text: string, rate: number): void {
  if (currentAudio) {
    try { currentAudio.pause(); } catch { /* ignore */ }
    currentAudio = null;
  }
  // 双收音词孤立播放时 TTS 常按字面误读（如 삶→살），转换为标准读音再交给 TTS
  const ttsText = CLUSTER_TTS_MAP[text] || text;
  const url = DIRECT_URL[text] || getStaticAudio(text)?.url;
  if (url) {
    const audio = getOrCreateAudio(url);
    audio.playbackRate = rate;
    currentAudio = audio;
    audio.onended = () => { if (currentAudio === audio) currentAudio = null; };
    audio.onerror = () => {
      if (currentAudio !== audio) return;
      currentAudio = null;
      console.error('[phonetics] real-audio load failed, fallback TTS (policy violation):', text, url);
      speak(ttsText, rate < 1 ? rate : 0.85).catch(e => console.error('[phonetics] TTS fallback also failed:', e));
    };
    const playPromise = audio.play();
    if (playPromise && typeof playPromise.then === 'function') {
      playPromise.catch((err: DOMException) => {
        if (currentAudio !== audio) return;
        if (err && err.name === 'AbortError') { currentAudio = null; return; }
        currentAudio = null;
        console.error('[phonetics] play rejected, fallback TTS (policy violation):', text, err?.name);
        speak(ttsText, rate < 1 ? rate : 0.85).catch(e => console.error('[phonetics] TTS fallback also failed:', e));
      });
    }
    return;
  }
  // 组合音节（가/나/다 等）→ 直接走 TTS，双收音词已转为标准读音
  speak(ttsText, rate < 1 ? rate : 0.85).catch(e => console.error('[phonetics] TTS speakWord failed:', e));
}

export function playPhoneticAudio(text: string, rate = 1.0): void {
  if (!text) return;
  const now = Date.now();
  // 同 text 20ms 内忽略重复调用（仅拦截 React strict mode 双 mount，不影响用户手动点击）
  if (text === lastNormalText && now - lastNormalAt < 20) return;
  lastNormalText = text;
  lastNormalAt = now;
  _playNow(text, rate);
}

/** 预加载音频文件（不播放）。用户进入 quiz/blend 前预热，避免首次点击等待下载。 */
export function preloadPhoneticAudio(text: string): void {
  if (!text || typeof window === 'undefined') return;
  const url = DIRECT_URL[text] || getStaticAudio(text)?.url;
  if (!url) return;
  if (audioPool.has(url)) return;
  const audio = new Audio(url);
  audio.preload = 'auto';
  audioPool.set(url, audio);
}

/** 字面读音播放：音节日声读。NLS 自带韩语音变引擎，literal 标记只能跳过客户端 normalize，
 *  阻止不了 NLS 自己用自然连音读出。真正有效的做法是把音间拆开加空格，让 NLS 逐音节朗读。 */
export function playPhoneticAudioLiteral(text: string, rate = 0.9): void {
  if (typeof window === 'undefined') return;
  if (!text) return;
  const now = Date.now();
  if (text === lastLiteralText && now - lastLiteralAt < 50) return;
  lastLiteralText = text;
  lastLiteralAt = now;
  if (currentAudio) {
    try { currentAudio.pause(); } catch { /* ignore */ }
    currentAudio = null;
  }
  // 已有空格/标点的词组（如 "맛 없다"）→ 只在韩语音节间插入空格
  const spaced = text.replace(/([가-힣])([가-힣])/g, '$1 $2');
  import('@/lib/tts').then(({ speak }) => {
    speak(spaced, rate, undefined, undefined, true).catch(() => { /* ignore */ });
  });
}

// batchim 任意 jamo → 所属代表音的归类（教学上同系发音相同）
const BATCHIM_GROUP: Record<string, string> = {
  // ㄱ 系 → 박
  'ㄱ': 'ㄱ', 'ㄲ': 'ㄱ', 'ㅋ': 'ㄱ',
  // ㄴ 系 → 산
  'ㄴ': 'ㄴ',
  // ㄷ 系 → 옷
  'ㄷ': 'ㄷ', 'ㅅ': 'ㄷ', 'ㅆ': 'ㄷ', 'ㅈ': 'ㄷ', 'ㅊ': 'ㄷ', 'ㅌ': 'ㄷ', 'ㅎ': 'ㄷ',
  // ㄹ 系 → 말
  'ㄹ': 'ㄹ',
  // ㅁ 系 → 밤
  'ㅁ': 'ㅁ',
  // ㅂ 系 → 밥
  'ㅂ': 'ㅂ', 'ㅍ': 'ㅂ',
  // ㅇ → 강
  'ㅇ': 'ㅇ',
};

/** 给一个 jamo，归类到代表音，播对应 batchim 真人示范音节。 */
export function playBatchimJamo(jamo: string): void {
  const rep = BATCHIM_GROUP[jamo] ?? jamo;
  const word = BATCHIM_DEMO[rep] ?? jamo;
  playPhoneticAudio(word);
}
