'use client';

import { DictationSubShell } from '@/components/practice/DictationSubShell';
import type { DictationItem } from '@/components/dictation/DictationSession';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

const normKey = (s: string) => s.trim().replace(/\s+/g, '').replace(/[.,?!。？！]/g, '');

async function buildItems(uid: string): Promise<DictationItem[]> {
  const [{ db }, { dictationWordPacks }, { dictationSentences }] = await Promise.all([
    import('@/lib/db'),
    import('@/data/dictationWords'),
    import('@/data/dictationSentences'),
  ]);
  const trickyMap = new Map<string, string>();
  for (const p of dictationWordPacks) {
    for (const w of p.words) {
      if (w.tricky) trickyMap.set(normKey(w.korean), w.tricky);
    }
  }
  const grammarMap = new Map<string, string>();
  for (const s of dictationSentences) {
    if (s.grammarPoint) grammarMap.set(normKey(s.korean), s.grammarPoint);
  }

  const cutoff = Date.now() - 90 * 86400_000;
  const wrong = await db.dictationRecords.filter(r => !r.correct && r.userId === uid && r.date >= cutoff);
  const grouped = new Map<string, { count: number; meaning: string; lastAt: number; type?: string }>();
  for (const r of wrong) {
    const cur = grouped.get(r.wordId) ?? { count: 0, meaning: r.meaning || '', lastAt: 0 };
    cur.count += 1;
    if (!cur.meaning && r.meaning) cur.meaning = r.meaning;
    if (r.type && r.date >= cur.lastAt) cur.type = r.type;
    cur.lastAt = Math.max(cur.lastAt, r.date);
    grouped.set(r.wordId, cur);
  }
  const sorted = Array.from(grouped.entries())
    .sort((a, b) => b[1].count - a[1].count)
    .slice(0, 15);
  return sorted.map(([korean, v]) => {
    const type: 'word' | 'sentence' = (v.type as 'word' | 'sentence') || (korean.length <= 6 ? 'word' : 'sentence');
    const key = normKey(korean);
    return {
      korean,
      meaning: v.meaning || korean,
      type,
      tricky: type === 'word' ? trickyMap.get(key) : undefined,
      grammarPoint: type === 'sentence' ? grammarMap.get(key) : undefined,
      origin: 'mistake' as const,
    };
  });
}

export default function DictationMistakesPage() {
  const { lang } = useLang();
  return (
    <DictationSubShell
      submodeKey="mistakes"
      eyebrow="03 · Mistakes"
      kr="오답 노트"
      en="Mistakes"
      intro={t('dict.mistakes_intro', lang)}
      emptyMessage={t('dict.mistakes_empty', lang)}
      buildItems={buildItems}
    />
  );
}
