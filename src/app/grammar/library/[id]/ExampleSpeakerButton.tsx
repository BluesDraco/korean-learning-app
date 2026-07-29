'use client';

import { useState } from 'react';
import { Volume2, Loader2 } from 'lucide-react';
import { speak } from '@/lib/tts';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

/** 语法库详情例句喇叭 — SSR 页里的小客户端交互岛，点击朗读韩语例句。 */
export function ExampleSpeakerButton({ text }: { text: string }) {
  const { lang } = useLang();
  const [playing, setPlaying] = useState(false);

  const onPlay = async () => {
    if (playing) return;
    setPlaying(true);
    try { await speak(text); } catch { /* ignore */ }
    finally { setPlaying(false); }
  };

  return (
    <button type="button" onClick={onPlay} disabled={playing} className="gl-ko-speak" aria-label={t('glib.speak_example', lang)}>
      {playing
        ? <Loader2 size={15} className="gl-spin" />
        : <Volume2 size={15} />}
    </button>
  );
}
