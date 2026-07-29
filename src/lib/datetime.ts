// 按 UI 语言本地化日期/相对时间。取代各页 inline 的中文格式化。
import type { Lang } from './i18n';
import { t } from './i18n';

/** 相对时间：刚刚 / N分钟前 / N小时前 / N天前，超过 30 天回落到短日期。 */
export function timeAgo(ts: number, lang: Lang): string {
  const mins = Math.floor((Date.now() - ts) / 60000);
  if (mins < 1) return t('time.just_now', lang);
  if (mins < 60) return t('time.min_ago', lang, { n: mins });
  const hours = Math.floor(mins / 60);
  if (hours < 24) return t('time.hr_ago', lang, { n: hours });
  const days = Math.floor(hours / 24);
  if (days < 30) return t('time.day_ago', lang, { n: days });
  return fmtShortDate(ts, lang);
}

/** 完整日期：2026年7月22日 / Jul 22, 2026。 */
export function fmtDate(ts: number, lang: Lang): string {
  const d = new Date(ts);
  if (lang === 'en') return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  return t('time.date_format', lang, { year: d.getFullYear(), month: d.getMonth() + 1, day: d.getDate() });
}

/** 短日期：7/22 (zh) / Jul 22 (en)。 */
export function fmtShortDate(ts: number, lang: Lang): string {
  const d = new Date(ts);
  if (lang === 'en') return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  return `${d.getMonth() + 1}/${d.getDate()}`;
}
