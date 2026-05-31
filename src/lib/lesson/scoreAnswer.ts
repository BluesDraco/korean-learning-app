import type { LessonCard, AnswerResult } from './types';
import type { DailyWord, DailySentence, DailyGrammar, DailyDictation } from '@/data/thirtyDayCourse';

/** Score a user's answer for a lesson card. Returns quality 0-5 for SM-2. */
export function scoreAnswer(
  card: LessonCard,
  selectedOption: number | null,
  revealed: boolean,
  outputText?: string,
): AnswerResult {
  switch (card.type) {
    case 'word-intro':
    case 'sentence-intro':
    case 'grammar-intro': {
      // Intro cards: reveal = user acknowledged seeing the answer
      // Quality: 4 if they revealed it (passive), 5 if they felt confident enough to skip (not applicable here)
      const quality = revealed ? 3 : 1;
      return { correct: true, quality, detail: revealed ? '已查看' : '未查看' };
    }

    case 'listen-choice': {
      if (selectedOption === null) {
        return { correct: false, quality: 0, detail: '未作答' };
      }
      const correct = selectedOption === card.correctOption;
      const quality = correct ? 5 : 1;
      return {
        correct,
        quality,
        detail: correct ? '选择正确' : `选择了错误选项`,
      };
    }

    case 'output': {
      const d = card.data as { prompt: string; hint: string; exampleAnswer: string };
      if (!outputText || outputText.trim().length < 2) {
        return { correct: false, quality: 0, detail: '未提交输出' };
      }
      // Heuristic: check if the output contains key Korean characters
      const hasKorean = /[가-힣]/.test(outputText);
      const len = outputText.trim().length;
      if (hasKorean && len > 5) {
        return { correct: true, quality: 4, detail: `已输出 ${len} 个字符` };
      }
      if (hasKorean) {
        return { correct: true, quality: 3, detail: `已输出 ${len} 个字符` };
      }
      return { correct: false, quality: 1, detail: '输出内容较少' };
    }

    default:
      return { correct: false, quality: 0, detail: '未知卡片类型' };
  }
}
