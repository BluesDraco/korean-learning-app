'use client';

import { useEffect, useState } from 'react';
import { Bookmark, BookmarkCheck } from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

interface Props {
  [k: string]: unknown;
  korean: string;
  chinese?: string;
  /** db.sentences 的 source_id，如 'seoul-<unitId>' */
  sourceId: string;
  sourceTitle?: string;
}

/** 例句「收藏到我的句子」按钮，写入 db.sentences（与词汇列表页同一张表 / 同一 source_type）。 */
export function SentenceBookmarkButton({ korean, chinese, sourceId, sourceTitle }: Props) {
  const { lang } = useLang();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const all = await db.sentences.where('korean').equals(korean).toArray();
        const mine = all.find((s) => !s.userId || s.userId === user?.id);
        if (!cancelled && mine) setSaved(true);
      } catch { /* ignore */ }
    })();
    return () => { cancelled = true; };
  }, [korean, user?.id]);

  const handleToggle = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      const all = await db.sentences.where('korean').equals(korean).toArray();
      const mine = all.find((s) => !s.userId || s.userId === user?.id);
      if (mine) {
        if (mine.id) await db.sentences.delete(mine.id);
        setSaved(false);
      } else {
        await db.sentences.add({
          id: crypto.randomUUID(),
          userId: user?.id,
          korean,
          chinese,
          source_type: 'vocabulary',
          source_id: sourceId,
          source_title: sourceTitle,
          created_at: Date.now(),
        });
        setSaved(true);
      }
    } catch { /* ignore */ }
  };

  const label = t(saved ? 'vocab.fc_remove_sentence' : 'vocab.fc_save_sentence', lang);
  return (
    <button
      onClick={handleToggle}
      className="shrink-0 p-1.5 -m-0.5 rounded-lg"
      style={{ color: saved ? 'var(--color-mint-strong)' : 'var(--fc-example-zh)' }}
      aria-label={label}
      title={label}
    >
      {saved ? <BookmarkCheck size={13} /> : <Bookmark size={13} />}
    </button>
  );
}
