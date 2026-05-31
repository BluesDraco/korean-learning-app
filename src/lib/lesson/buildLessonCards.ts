import type { DailyCourse, DailySentence } from '@/data/thirtyDayCourse';
import type { LessonCard, GoalData, AbilitySummary } from './types';

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

/** Split Korean sentence into meaningful chunks for match-pairs */
function sentenceToChunks(s: DailySentence): { ko: string[]; zh: string[] } {
  // Split by particle/word boundaries
  const koParts = s.korean.replace(/[.!?~]/g, '').split(/\s+/).filter(Boolean);
  const zhParts = s.chinese.split(/\s+/).filter(Boolean);
  // If word counts don't match, fall back to pairing by common delimiters
  if (koParts.length === zhParts.length) {
    return { ko: koParts, zh: zhParts };
  }
  // Simple 2-part split as fallback
  const koHalf = Math.ceil(s.korean.length / 2);
  const zhHalf = Math.ceil(s.chinese.length / 2);
  return {
    ko: [s.korean.slice(0, koHalf), s.korean.slice(koHalf)],
    zh: [s.chinese.slice(0, zhHalf), s.chinese.slice(zhHalf)],
  };
}

function generateAbilities(course: DailyCourse): string[] {
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

/** Build a lesson card deck: introduce → practice → produce → review */
export function buildLessonCards(course: DailyCourse, outputDifficulty: number = 2): LessonCard[] {
  const cards: LessonCard[] = [];
  const words = course.words;
  const sentences = course.sentences;
  const dictations = course.dictations;
  const allChinese = words.map((w) => w.chinese).concat(sentences.map((s) => s.chinese));

  // 1. Goal card
  const abilities = generateAbilities(course);
  cards.push({
    type: 'goal',
    data: { day: course.day, title: course.title, emoji: course.emoji, goals: abilities } as GoalData,
  });

  // 2. Word intro batch 1 (first half)
  const midWord = Math.ceil(words.length / 2);
  for (let i = 0; i < midWord; i++) {
    cards.push({ type: 'word-intro', data: words[i], speakText: words[i].korean, masteryKey: `word-${i}` });
  }

  // 3. Grammar intro
  cards.push({ type: 'grammar-intro', data: course.grammar, speakText: course.grammar.example, masteryKey: 'grammar-0' });

  // 4. Word intro batch 2
  for (let i = midWord; i < words.length; i++) {
    cards.push({ type: 'word-intro', data: words[i], speakText: words[i].korean, masteryKey: `word-${i}` });
  }

  // 5. Listen-choice for first few dictation words (practice recognition)
  const lcCount = Math.min(3, dictations.length);
  for (let i = 0; i < lcCount; i++) {
    const d = dictations[i];
    const correct = d.chinese;
    const pool = allChinese.filter((c) => c !== correct);
    const distractors = shuffle(pool).slice(0, 3);
    const options = shuffle([correct, ...distractors]);
    cards.push({
      type: 'listen-choice', data: d, speakText: d.korean, masteryKey: `dictation-${i}`,
      options, correctOption: options.indexOf(correct), maxRetries: 2,
    });
  }

  // 6. Sentence intro + speak-repeat
  for (let i = 0; i < Math.min(2, sentences.length); i++) {
    cards.push({ type: 'sentence-intro', data: sentences[i], speakText: sentences[i].korean, masteryKey: `sentence-${i}` });
    cards.push({ type: 'speak-repeat', data: sentences[i], speakText: sentences[i].korean, masteryKey: `sentence-repeat-${i}` });
  }

  // 7. Match-pairs (韩中词组配对)
  if (sentences.length > 0) {
    const s = sentences[0];
    const chunks = sentenceToChunks(s);
    cards.push({
      type: 'match-pairs',
      data: s,
      speakText: s.korean,
      masteryKey: 'match-pairs-0',
      koreanChunks: chunks.ko,
      chineseChunks: chunks.zh,
      maxRetries: 2,
    });
  }

  // 8. Remaining listen-choice dictations
  for (let i = lcCount; i < dictations.length; i++) {
    const d = dictations[i];
    const correct = d.chinese;
    const pool = allChinese.filter((c) => c !== correct);
    const distractors = shuffle(pool).slice(0, 3);
    const options = shuffle([correct, ...distractors]);
    cards.push({
      type: 'listen-choice', data: d, speakText: d.korean, masteryKey: `dictation-${i}`,
      options, correctOption: options.indexOf(correct), maxRetries: 2,
    });
  }

  // 9. Remaining sentences
  for (let i = 2; i < sentences.length; i++) {
    cards.push({ type: 'sentence-intro', data: sentences[i], speakText: sentences[i].korean, masteryKey: `sentence-${i}` });
  }

  // 10. Output
  const adjustedOutput = adjustOutputHint(course, outputDifficulty);
  cards.push({ type: 'output', data: adjustedOutput as any, masteryKey: 'output-0' });

  // 11. Summary
  cards.push({
    type: 'summary',
    data: {
      day: course.day, title: course.title, emoji: course.emoji,
      abilities,
      wordCount: words.length,
      sentenceCount: sentences.length,
    } as AbilitySummary,
  });

  return cards;
}
