// Common utility types with index signatures to allow extra properties.
// Usage: replace inline types like { ko: string; zh: string } with KoZh, etc.

/** { ko: string; zh: string } with index signature — allows zhEn, meaningEn, etc. */
export interface KoZh { ko: string; zh: string; [k: string]: unknown; }

/** { zh: string; correct: boolean } with index signature */
export interface ZhChoice { zh: string; correct: boolean; [k: string]: unknown; }

/** { ko: string; cn: string } with index signature */
export interface KoCn { ko: string; cn: string; [k: string]: unknown; }

/** { ko: string; zh: string; correct: boolean } with index signature */
export interface KoZhChoice { ko: string; zh: string; correct: boolean; [k: string]: unknown; }

/** { text: string; correct: boolean } with index signature */
export interface TextChoice { text: string; correct: boolean; [k: string]: unknown; }

/** { ko: string; zh: string; highlight?: string; note?: string } with index signature */
export interface KoZhHighlight { ko: string; zh: string; highlight?: string; note?: string; [k: string]: unknown; }

/** { ko?: string; zh?: string; text?: string; correct: boolean } with index signature */
export interface ChoiceOption { ko?: string; zh?: string; text?: string; correct: boolean; [k: string]: unknown; }

/** { text: string; role?: string; note?: string; meaning?: string; partOfSpeech?: string } with index signature */
export interface BreakdownItem { text: string; role?: string; note?: string; meaning?: string; partOfSpeech?: string; [k: string]: unknown; }

/** { text: string; hint?: string } with index signature */
export interface SegmentHint { text: string; hint?: string; [k: string]: unknown; }

/** { ko: string; ro?: string; zh: string } with index signature */
export interface KoRoZh { ko: string; ro?: string; zh: string; [k: string]: unknown; }

/** { ko: string; cn: string; diff: string } with index signature */
export interface KoCnDiff { ko: string; cn: string; diff: string; [k: string]: unknown; }

/** { label: string; text: string } with index signature */
export interface LabelText { label: string; text: string; [k: string]: unknown; }

/** { speaker: string; ko: string; zh: string } with index signature */
export interface SpeakerKoZh { speaker: string; ko: string; zh: string; [k: string]: unknown; }

/** { num: number; text: string } with index signature */
export interface NumText { num: number; text: string; [k: string]: unknown; }

/** { zh: string; ko: string; note: string } with index signature (conceptCompare) */
export interface ZhKoNote { zh: string; ko: string; note: string; [k: string]: unknown; }

/** { ko: string; zh: string; grammarNote: string } with index signature */
export interface KoZhGrammarNote { ko: string; zh: string; grammarNote: string; [k: string]: unknown; }

/** { zh: string; en: string } with index signature */
export interface ZhEn { zh: string; en: string; [k: string]: unknown; }

/** { tag: string; q: string; a: string } with index signature */
export interface TagQA { tag: string; q: string; a: string; [k: string]: unknown; }

/** { ko: string; zh?: string; tokens: { text: string; role: 'subject' | 'object' | 'verb' | 'place' | 'time' | 'plain' }[] } with index signature */
export interface GrammarStructureEntry { ko: string; zh?: string; tokens: { text: string; role: 'subject' | 'object' | 'verb' | 'place' | 'time' | 'plain'; [k: string]: unknown }[]; [k: string]: unknown; }
