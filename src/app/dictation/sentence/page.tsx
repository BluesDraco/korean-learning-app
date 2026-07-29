'use client';

import { DictationSubShell } from '@/components/practice/DictationSubShell';
import type { DictationItem } from '@/components/dictation/DictationSession';
import { buildMixedPool, buildSystemSentencePool } from '@/lib/practice/userPool';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import { dailyCacheKey } from '@/lib/dailyCacheKey';

async function buildItems(uid: string, force = false, count = 8): Promise<DictationItem[]> {
  const key = dailyCacheKey(`dictation-sentence:${count}`, uid);
  if (!force) {
    let stored: DictationItem[] | null = null;
    try { stored = JSON.parse(localStorage.getItem(key) ?? 'null'); } catch { console.warn('[dictation] corrupted cache, regenerating'); }
    if (stored && Array.isArray(stored) && stored.length > 0) return stored;
  }

  const systemPool = await buildSystemSentencePool();
  const mixed = await buildMixedPool(count, systemPool, 'sentence', Math.min(2, count));
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

export default function DictationSentencePage() {
  const { lang } = useLang();
  return (
    <DictationSubShell
      submodeKey="sentence"
      eyebrow="02 · Sentence"
      kr="문장 받아쓰기"
      en="Sentence"
      intro={t('dict.sentence_intro', lang)}
      buildItems={buildItems}
      regenerable
      sourceable
      defaultContentFilter="sentence"
    />
  );
}
