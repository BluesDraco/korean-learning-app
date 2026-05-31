import type { DailyCourse, DailySentence } from '@/data/thirtyDayCourse';
import type { LessonCard } from './types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function adjustOutputHint(course: DailyCourse, difficulty: number): { prompt: string; hint: string; exampleAnswer: string } {
  const o = course.output;
  switch (difficulty) {
    case 1: return { prompt: o.prompt, hint: `使用 ${o.hint}（新手引导：${o.exampleAnswer}）`, exampleAnswer: o.exampleAnswer };
    case 2: return { prompt: o.prompt, hint: `使用 ${o.hint}`, exampleAnswer: o.exampleAnswer };
    case 3: return { prompt: o.prompt, hint: `关键词提示: ${o.hint.slice(0, 20)}...`, exampleAnswer: o.exampleAnswer };
    case 4: return { prompt: o.prompt, hint: '请独立完成，尽量不依赖提示', exampleAnswer: o.exampleAnswer };
    case 5: return { prompt: `${o.prompt}（自由发挥，可结合已学内容）`, hint: '自由输出练习', exampleAnswer: o.exampleAnswer };
    default: return { prompt: o.prompt, hint: o.hint, exampleAnswer: o.exampleAnswer };
  }
}

/** Split a Korean word into stem + detached particles */
function splitKoreanWord(word: string): string[] {
  const particles = [
    '께서', '에서', '에게', '한테', '부터', '까지', '처럼', '보다',
    '이랑', '하고', '으로', '이라', '세요', '네요', '입니다',
    '습니다', 'ㅂ니다', '니다',
    '은', '는', '이', '가', '을', '를', '에', '도', '만', '의',
    '와', '과', '랑', '로', '고', '서', '다', '어', '요', '야',
    '지', '죠', '네', '여', '아', '게',
  ].sort((a, b) => b.length - a.length);

  const detached: string[] = [];
  let stem = word;

  let changed = true;
  while (changed && stem.length > 1) {
    changed = false;
    for (const p of particles) {
      if (stem.endsWith(p) && stem.length > p.length) {
        detached.unshift(p);
        stem = stem.slice(0, -p.length);
        changed = true;
        break;
      }
    }
  }

  return stem ? [stem, ...detached] : detached;
}

/** Split Korean sentence into stem+particle chunks */
function splitKoreanChunks(korean: string): string[] {
  const cleaned = korean.replace(/[.!?~!?,，。！？]/g, '').trim();
  const words = cleaned.split(/\s+/).filter(Boolean);
  const chunks: string[] = [];
  for (const word of words) {
    chunks.push(...splitKoreanWord(word));
  }
  return chunks.filter(Boolean);
}

/** Split Chinese sentence into individual characters (for 韩翻中 exercise) */
function splitChineseChunks(chinese: string): string[] {
  const cleaned = chinese.replace(/[\s,，。！？!?\.]/g, '').trim();
  return [...cleaned];
}

/** Split a sentence into Korean chunks and Chinese chunks for sentence reorder */
function sentenceToChunks(s: DailySentence): { ko: string[]; zh: string[] } {
  return {
    ko: splitKoreanChunks(s.korean),
    zh: splitChineseChunks(s.chinese),
  };
}

export function generateAbilities(course: DailyCourse): string[] {
  const abilities: string[] = [];
  if (course.words.length > 0) {
    abilities.push(`听懂并说出 "${course.words[0].korean}"（${course.words[0].chinese}）`);
  }
  if (course.sentences.length > 0) {
    abilities.push(`用韩语表达 "${course.sentences[0].chinese}"`);
  }
  if (course.words.length > 3) {
    abilities.push(`认识 ${course.words.length} 个新单词`);
  }
  if (course.sentences.length > 1) {
    abilities.push(`掌握 ${course.sentences.length} 个实用句型`);
  }
  if (course.grammar.name) {
    abilities.push(`理解 "${course.grammar.name}" 语法`);
  }
  return abilities.slice(0, 5);
}

/** Build a lesson card deck: introduce → practice → produce */
export function buildLessonCards(course: DailyCourse, outputDifficulty: number = 2): LessonCard[] {
  const cards: LessonCard[] = [];
  const words = course.words;
  const sentences = course.sentences;

  // 1. Word intro batch 1 (first half)
  const midWord = Math.ceil(words.length / 2);
  for (let i = 0; i < midWord; i++) {
    cards.push({ type: 'word-intro', data: words[i], speakText: words[i].korean, masteryKey: `word-${i}` });
  }

  // 2. Grammar intro
  cards.push({ type: 'grammar-intro', data: course.grammar, speakText: course.grammar.example, masteryKey: 'grammar-0' });

  // 3. Word intro batch 2
  for (let i = midWord; i < words.length; i++) {
    cards.push({ type: 'word-intro', data: words[i], speakText: words[i].korean, masteryKey: `word-${i}` });
  }

  // 4. Sentence intro + speak-repeat (all sentences)
  for (let i = 0; i < sentences.length; i++) {
    cards.push({ type: 'sentence-intro', data: sentences[i], speakText: sentences[i].korean, masteryKey: `sentence-${i}` });
    cards.push({ type: 'speak-repeat', data: sentences[i], speakText: sentences[i].korean, masteryKey: `sentence-repeat-${i}` });
  }

  // 5. Sentence reorder practice — both directions for each sentence
  for (let i = 0; i < sentences.length; i++) {
    const s = sentences[i];
    const chunks = sentenceToChunks(s);

    // 中翻韩：看中文 → 排列韩文词组
    cards.push({
      type: 'match-pairs',
      data: s,
      speakText: s.korean,
      masteryKey: `reorder-zh2ko-${i}`,
      matchDirection: 'zh-to-ko',
      matchChunks: shuffle([...chunks.ko]),
      matchCorrectOrder: [...chunks.ko],
      maxRetries: 2,
    });

    // 韩翻中：看韩文 → 排列中文词组
    cards.push({
      type: 'match-pairs',
      data: s,
      speakText: s.korean,
      masteryKey: `reorder-ko2zh-${i}`,
      matchDirection: 'ko-to-zh',
      matchChunks: shuffle([...chunks.zh]),
      matchCorrectOrder: [...chunks.zh],
      maxRetries: 2,
    });
  }

  // 6. Output
  const adjustedOutput = adjustOutputHint(course, outputDifficulty);
  cards.push({ type: 'output', data: adjustedOutput as any, masteryKey: 'output-0' });

  return cards;
}
