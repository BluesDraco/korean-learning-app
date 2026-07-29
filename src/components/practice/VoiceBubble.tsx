'use client';

// 可回放语音条气泡。音频本体存本地 IDB(按消息 id)，此组件挂载时取出播放。
// 换设备/清缓存导致音频缺失时优雅降级：播放键置灰，仅提示"语音"。转写文字由外层照常显示。

import { useCallback, useEffect, useRef, useState } from 'react';
import { Play, Pause } from 'lucide-react';
import { getVoiceURL } from '@/lib/audio/voiceStore';
import { unlockAudioContext } from '@/lib/tts';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';
import './voiceBubble.css';

// 假波形：固定一组高度，纯视觉，不做真实频谱分析
const BARS = [0.4, 0.7, 1, 0.6, 0.85, 0.5, 0.9, 0.65, 1, 0.55, 0.75, 0.45];

export function VoiceBubble({ msgId, durationMs }: { msgId: string; durationMs: number }) {
  const { lang } = useLang();
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true); // IDB 取音频中，未决前禁用避免空点
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    let revoked = '';
    let alive = true;
    getVoiceURL(msgId).then((u) => {
      if (!alive) { if (u) URL.revokeObjectURL(u); return; }
      if (u) { setUrl(u); revoked = u; }
      setLoading(false);
    });
    return () => { alive = false; if (revoked) URL.revokeObjectURL(revoked); };
  }, [msgId]);

  const toggle = useCallback(() => {
    if (!url) return;
    unlockAudioContext();
    const el = audioRef.current;
    if (!el) return;
    if (playing) { el.pause(); return; }
    el.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  }, [url, playing]);

  const missing = !loading && !url;
  const secs = Math.max(1, Math.round(durationMs / 1000));

  return (
    <button
      type="button"
      className="vbubble"
      onClick={toggle}
      disabled={loading || missing}
      data-missing={missing}
      aria-label={playing ? t('voice.pause', lang) : t('voice.play', lang)}
    >
      {playing
        ? <Pause size={15} strokeWidth={2.4} />
        : <Play size={15} strokeWidth={2.4} opacity={missing ? 0.4 : 1} />}
      <span className="vbubble-wave" data-playing={playing}>
        {BARS.map((h, i) => (
          <span key={i} className="vbubble-bar" style={{ height: `${Math.round(h * 100)}%`, animationDelay: `${i * 0.08}s` }} />
        ))}
      </span>
      <span className="vbubble-dur">{secs}&quot;</span>
      {url && (
        <audio
          ref={audioRef}
          src={url}
          onEnded={() => setPlaying(false)}
          onPause={() => setPlaying(false)}
          preload="metadata"
        />
      )}
    </button>
  );
}
