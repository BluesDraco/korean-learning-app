'use client';

import { DictationSubShell } from '@/components/practice/DictationSubShell';
import type { DictationItem } from '@/components/dictation/DictationSession';
import { buildMixedPool, buildSystemWordPool } from '@/lib/practice/userPool';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { dailyCacheKey } from '@/lib/dailyCacheKey';

async function buildItems(uid: string, force = false, count = 12): Promise<DictationItem[]> {
  const key = dailyCacheKey(`dictation-word:${count}`, uid);
  if (!force) {
    let stored: DictationItem[] | null = null;
    try { stored = JSON.parse(localStorage.getItem(key) ?? 'null'); } catch { console.warn('[dictation] corrupted cache, regenerating'); }
    if (stored && Array.isArray(stored) && stored.length > 0) return stored;
  }

  const systemPool = await buildSystemWordPool();
  const mixed = await buildMixedPool(count, systemPool, 'word', Math.min(3, count));
  const items: DictationItem[] = mixed.map(m => ({
    korean: m.korean,
    meaning: m.meaning,
    type: m.type,
    tricky: m.tricky,
    grammarPoint: m.grammarPoint,
    origin: m.origin,
    originLabel: m.originLabel,
  }));

  try { localStorage.setItem(key, JSON.stringify(items)); } catch { /* ignore */ }
  return items;
}

export default function DictationWordPage() {
  const { lang } = useLang();
  return (
    <DictationSubShell
      submodeKey="word"
      eyebrow="01 · Word"
      kr="단어 받아쓰기"
      en="Word"
      intro={t('dict.word_intro', lang)}
      buildItems={buildItems}
      regenerable
      sourceable
      defaultContentFilter="word"
    />
  );
}
