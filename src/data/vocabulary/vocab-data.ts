import type { WordEntry, ThemePack, LevelWordList } from '@/types';
import { vocabularyEntries } from './entries';
import { intermediateEntries } from './entries-intermediate';
import { advancedEntries } from './entries-advanced';
import { topikEntries } from './entries-topik';
import { topikNewEntries1a } from './entries-topik-new';
import { topikNewEntries1b } from './entries-topik-new-1b';
import { topikNewEntries1c } from './entries-topik-new-1c';
import { topikNewEntries1d } from './entries-topik-new-1d';
import { topikNewEntries2 } from './entries-topik-new-2';
import { topikNewEntries2b } from './entries-topik-new-2b';
import { topikNewEntries1e } from './entries-topik-1e';
import { topikNewEntries2c } from './entries-topik-2c';
import { topikNewEntries3 } from './entries-topik-3';
import { topikNewEntries4 } from './entries-topik-4';
import { topikNewEntries5 } from './entries-topik-5';
import { topikNewEntries6 } from './entries-topik-6';
import { topikNewEntries4b } from './entries-topik-4b';
import { topikNewEntries5b } from './entries-topik-5b';
import { topikNewEntries6b } from './entries-topik-6b';
import { topikNewEntries1f } from './entries-topik-1f';
import { topikNewEntries2d } from './entries-topik-2d';
import { topikNewEntries3b } from './entries-topik-3b';
import { topikNewEntries4c } from './entries-topik-4c';
import { topikNewEntries5c } from './entries-topik-5c';
import { topikNewEntries6c } from './entries-topik-6c';
import { topikNewEntries5d } from './entries-topik-5d';
import { topikNewEntries6d } from './entries-topik-6d';
import { topikTextbook1Entries } from './entries-topik-textbook-1';
import { topikTextbook2Entries } from './entries-topik-textbook-2';
import { topikTextbook3Entries } from './entries-topik-textbook-3';
import { topikTextbook4Entries } from './entries-topik-textbook-4';
import { topikTextbook5Entries } from './entries-topik-textbook-5';
import { topikTextbook6Entries } from './entries-topik-textbook-6';
import { themePacks } from './themes';
import { levelWordLists } from './levels';

// Merge all entry sources, deduplicate by korean text (topik entries take priority)
const _seen = new Set<string>();
export const allEntries: WordEntry[] = [];
// Full id→entry map across ALL sources (including deduped-out entries) for fallback lookups
export const allEntriesById = new Map<string, WordEntry>();
for (const e of [...topikEntries, ...topikNewEntries1a, ...topikNewEntries1b, ...topikNewEntries1c, ...topikNewEntries1d, ...topikNewEntries1e, ...topikNewEntries1f, ...topikNewEntries2, ...topikNewEntries2b, ...topikNewEntries2c, ...topikNewEntries2d, ...topikNewEntries3, ...topikNewEntries3b, ...topikNewEntries4, ...topikNewEntries4b, ...topikNewEntries4c, ...topikNewEntries5, ...topikNewEntries5b, ...topikNewEntries5c, ...topikNewEntries5d, ...topikNewEntries6, ...topikNewEntries6b, ...topikNewEntries6c, ...topikNewEntries6d, ...topikTextbook1Entries, ...topikTextbook2Entries, ...topikTextbook3Entries, ...topikTextbook4Entries, ...topikTextbook5Entries, ...topikTextbook6Entries, ...vocabularyEntries, ...intermediateEntries, ...advancedEntries]) {

  allEntriesById.set(e.id, e);
  if (!_seen.has(e.korean)) {
    _seen.add(e.korean);
    allEntries.push(e);
  }
}

export { themePacks, levelWordLists };
