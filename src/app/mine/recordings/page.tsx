'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mic, Play, Trash2, Volume2 } from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { speak } from '@/lib/tts';
import { useIsDesktop } from '@/lib/useIsMobile';
import { PageHeader, Section, Card } from '@/components/ui';

interface Recording {
  id: string;
  userId?: string;
  type?: string;
  korean?: string;
  text?: string;
  textZh?: string;
  source?: string;
  sourceType?: string;
  sourceId?: string;
  lineId?: string;
  audioDataUrl?: string;
  audioData?: string;
  audioUrl?: string;
  duration?: number;
  durationMs?: number;
  createdAt?: number;
}

export default function MineRecordingsPage() {
  const { user } = useAuth();
  const isDesktop = useIsDesktop();
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState<string | null>(null);
  const [audioEl, setAudioEl] = useState<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    db.recordings.orderBy('createdAt').reverse().limit(200).toArray()
      .then((rows) => setRecordings(rows as Recording[]))
      .catch(() => setRecordings([]))
      .finally(() => setLoading(false));
  }, [user]);

  const handlePlay = async (recording: Recording) => {
    if (audioEl) { audioEl.pause(); setPlaying(null); }
    let src: string | null = recording.audioDataUrl || recording.audioData || null;
    if (!src && recording.sourceType === 'kpop' && recording.sourceId && recording.lineId != null) {
      src = `/api/kpop/recording?download=1&songId=${encodeURIComponent(recording.sourceId)}&lineIndex=${encodeURIComponent(recording.lineId)}`;
    }
    if (!src) return;
    const audio = new Audio(src);
    audio.onended = () => setPlaying(null);
    audio.onerror = () => setPlaying(null);
    audio.play().catch(() => setPlaying(null));
    setAudioEl(audio);
    setPlaying(recording.id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('删除这条录音？')) return;
    if (audioEl && playing === id) { audioEl.pause(); setPlaying(null); }
    await db.recordings.delete(id).catch(() => {});
    setRecordings((prev) => prev.filter((r) => r.id !== id));
  };

  const typeLabel = (type?: string) => {
    switch (type) {
      case 'shadowing': return '影子跟读';
      case 'kpop': return 'KPOP 跟唱';
      case 'pronunciation': return '发音练习';
      default: return type || '录音';
    }
  };

  const containerCls = isDesktop ? 'py-4 max-w-5xl mx-auto' : 'py-4 max-w-2xl mx-auto';

  return (
    <div className={containerCls}>
      <Link
        href="/mine"
        style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 13, color: 'var(--color-ink-2)', textDecoration: 'none',
          marginBottom: 14,
        }}
      >
        <ArrowLeft size={14} />
        返回我的
      </Link>

      <PageHeader
        eyebrow="MY RECORDINGS"
        title="我的录音"
        subtitle={!loading && recordings.length > 0 ? `共 ${recordings.length} 条录音` : '影子跟读 · KPOP 跟唱 · 发音练习汇总'}
        tone="mint"
        flat
      />

      {loading ? (
        <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
          <div
            style={{
              width: 24, height: 24, borderRadius: '50%',
              border: '2px solid var(--color-pink-base)', borderTopColor: 'transparent',
              animation: 'tori-spin 0.7s linear infinite',
              margin: '0 auto',
            }}
          />
        </Card>
      ) : recordings.length === 0 ? (
        <Card variant="hero" tone="mint" padding="lg">
          <div style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 64, height: 64, borderRadius: 'var(--radius-lg)',
                background: 'var(--color-surface-2)', color: 'var(--color-mint-strong)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                margin: '0 auto 14px',
              }}
              aria-hidden
            >
              <Mic size={28} strokeWidth={1.75} />
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: '0 0 6px' }}>
              这里会展示你的录音
            </h2>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: 0, lineHeight: 1.6 }}>
              在影子跟读、KPOP 跟唱和发音练习中录制的音频，会出现在这里
            </p>
          </div>
        </Card>
      ) : (
        <Section spacing="normal">
          <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 10 }}>
            {recordings.map((rec) => (
              <Card key={rec.id} variant="default" padding="md">
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <span
                      style={{
                        fontSize: 10, fontWeight: 600,
                        padding: '2px 8px', borderRadius: 'var(--radius-sm)',
                        background: 'var(--color-surface-3)', color: 'var(--color-ink-3)',
                      }}
                    >
                      {typeLabel(rec.type)}
                    </span>
                    {(rec.korean || rec.text) && (
                      <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: '8px 0 0', lineHeight: 1.5 }}>
                        {rec.korean || rec.text}
                      </p>
                    )}
                    {rec.textZh && (
                      <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>{rec.textZh}</p>
                    )}
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {(rec.korean || rec.text) && (
                    <button
                      onClick={() => speak(rec.korean || rec.text || '', 0.8)}
                      title="听标准发音"
                      style={{
                        padding: 6, borderRadius: 'var(--radius-sm)',
                        background: 'transparent', border: 'none',
                        color: 'var(--color-ink-4)', cursor: 'pointer',
                      }}
                    >
                      <Volume2 size={14} />
                    </button>
                  )}
                  {(rec.audioDataUrl || rec.audioData || (rec.sourceType === 'kpop' && rec.sourceId)) && (
                    <button
                      onClick={() => handlePlay(rec)}
                      style={{
                        display: 'inline-flex', alignItems: 'center', gap: 4,
                        fontSize: 11, fontWeight: 600,
                        padding: '6px 12px', borderRadius: 'var(--radius-pill)',
                        background: playing === rec.id ? 'var(--color-pink-soft)' : 'var(--color-surface-3)',
                        color: playing === rec.id ? 'var(--color-pink-strong)' : 'var(--color-ink-2)',
                        border: 'none', cursor: 'pointer',
                      }}
                    >
                      <Play size={12} />
                      {playing === rec.id ? '播放中' : '播放'}
                    </button>
                  )}
                  <button
                    onClick={() => handleDelete(rec.id)}
                    title="删除"
                    style={{
                      padding: 6, borderRadius: 'var(--radius-sm)',
                      background: 'transparent', border: 'none',
                      color: 'var(--color-ink-4)', cursor: 'pointer',
                    }}
                  >
                    <Trash2 size={12} />
                  </button>
                  {rec.createdAt && (
                    <span style={{ fontSize: 10, color: 'var(--color-ink-4)', marginLeft: 'auto' }}>
                      {new Date(rec.createdAt).toLocaleDateString('zh-CN')}
                    </span>
                  )}
                </div>
              </Card>
            ))}
          </div>
        </Section>
      )}
    </div>
  );
}
