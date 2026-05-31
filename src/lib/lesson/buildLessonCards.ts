import type { DailyCourse } from '@/data/thirtyDayCourse';
import type { LessonCard } from './types';

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

/** Get output hint difficulty based on overall progress level (1-5). */
function adjustOutputHint(course: DailyCourse, difficulty: number): { prompt: string; hint: string; exampleAnswer: string } {
  const o = course.output;
  switch (difficulty) {
    case 1: // Most help
      return {
        prompt: o.prompt,
        hint: `使用 ${o.hint}（新手引导：${o.exampleAnswer}）`,
        exampleAnswer: o.exampleAnswer,
      };
    case 2:
      return {
        prompt: o.prompt,
        hint: `使用 ${o.hint}`,
        exampleAnswer: o.exampleAnswer,
      };
    case 3:
      return {
        prompt: o.prompt,
        hint: `关键词提示: ${o.hint.slice(0, 20)}...`,
        exampleAnswer: o.exampleAnswer,
      };
    case 4:
      return {
        prompt: o.prompt,
        hint: '请独立完成，尽量不依赖提示',
        exampleAnswer: o.exampleAnswer,
      };
    case 5: // Least help — open-ended
      return {
        prompt: `${o.prompt}（自由发挥，可结合已学内容）`,
        hint: '自由输出练习',
        exampleAnswer: o.exampleAnswer,
      };
    default:
      return { prompt: o.prompt, hint: o.hint, exampleAnswer: o.exampleAnswer };
  }
}

/** Build a lesson card deck from a day's course data. */
export function buildLessonCards(course: DailyCourse, outputDifficulty: number = 2): LessonCard[] {
  const cards: LessonCard[] = [];

  // Word intro cards
  course.words.forEach((w, i) => {
    cards.push({ type: 'word-intro', data: w, speakText: w.korean, masteryKey: `word-${i}` });
  });

  // Grammar intro card
  cards.push({ type: 'grammar-intro', data: course.grammar, speakText: course.grammar.example, masteryKey: 'grammar-0' });

  // Sentence intro cards
  course.sentences.forEach((s, i) => {
    cards.push({ type: 'sentence-intro', data: s, speakText: s.korean, masteryKey: `sentence-${i}` });
  });

  // Listen-choice cards (from dictations)
  const allChinese = course.words.map((w) => w.chinese).concat(
    course.sentences.map((s) => s.chinese),
  );

  course.dictations.forEach((d, i) => {
    const correct = d.chinese;
    const pool = allChinese.filter((c) => c !== correct);
    const distractors = shuffle(pool).slice(0, 3);
    const options = shuffle([correct, ...distractors]);
    const correctOption = options.indexOf(correct);

    cards.push({
      type: 'listen-choice',
      data: d,
      speakText: d.korean,
      masteryKey: `dictation-${i}`,
      options,
      correctOption,
    });
  });

  // Output card — difficulty adjusted
  const adjustedOutput = adjustOutputHint(course, outputDifficulty);
  cards.push({ type: 'output', data: adjustedOutput as any, masteryKey: 'output-0' });

  return cards;
}
