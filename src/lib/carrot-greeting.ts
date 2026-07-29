// 勇气胡萝卜问候语 — CarrotHelper + CarrotPanel 共享
import { t } from './i18n';
import type { Lang } from './i18n';

export interface CarrotProgressLike {
  completedDays: number;
  sentencesCount: number;
  recordingsCount: number;
}

export function pickGreeting(dayNum: number, lang: Lang, p?: CarrotProgressLike): string {
  if (dayNum === 1) {
    return t('carrot.greeting_day1', lang);
  }
  if (!p) {
    return t('carrot.greeting_return', lang);
  }
  if (p.completedDays > 0 && dayNum > p.completedDays + 3) {
    return t('carrot.greeting_gone_days', lang, { n: dayNum - p.completedDays });
  }
  if (dayNum >= 5 && dayNum <= 7 && p.sentencesCount > 0) {
    return t('carrot.greeting_week1_sentences', lang, { n: p.sentencesCount });
  }
  if (dayNum >= 8 && dayNum <= 14) {
    return t('carrot.greeting_week2', lang);
  }
  return t('carrot.greeting_default', lang);
}
