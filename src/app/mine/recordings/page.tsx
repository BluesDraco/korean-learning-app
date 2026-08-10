'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Mic, Play, Trash2, Volume2 } from 'lucide-react';
import { db } from '@/lib/db';
import { useAuth } from '@/components/AuthProvider';
import { speak } from '@/lib/tts';

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

type SrcCat = 'all' | 'diary' | 'reading' | 'phonetics' | 'speaking' | 'other';

function categoryOf(sourceType?: string): Exclude<SrcCat, 'all'> {
  if (sourceType === 'tori-diary') return 'diary';
  if (sourceType === 'reading') return 'reading';
  if (sourceType === 'phonetics') return 'phonetics';
  if (sourceType?.startsWith('speaking')) return 'speaking';
  return 'other';
}

function RecordingCard({ rec, onDelete }: { rec: Recording; onDelete: (id: string) => void }) {
  const { lang } = useLang();
  const [url, setUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const objectUrlRef = useRef<string | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      // 旧记录：base64 直接可播；新记录：本地 IndexedDB 取 objectURL
      if (rec.audioData) {
        if (alive) { setUrl(rec.audioData); setLoading(false); }
        return;
      }
      const u = await getVoiceURL(rec.id);
      if (!alive) { if (u) URL.revokeObjectURL(u); return; }
      objectUrlRef.current = u;
      setUrl(u);
      setLoading(false);
    })();
    return () => {
      alive = false;
      if (audioRef.current) { try { audioRef.current.pause(); } catch { /* ignore */ } audioRef.current = null; }
      if (objectUrlRef.current) { URL.revokeObjectURL(objectUrlRef.current); objectUrlRef.current = null; }
    };
  }, [rec.id, rec.audioData]);

  const togglePlay = () => {
    if (!url) return;
    if (audioRef.current && playing) { audioRef.current.pause(); return; }
    if (!audioRef.current) {
      const audio = new Audio(url);
      audioRef.current = audio;
      audio.onended = () => setPlaying(false);
      audio.onerror = () => setPlaying(false);
      audio.onpause = () => setPlaying(false);
    }
    audioRef.current.play().then(() => setPlaying(true)).catch(() => setPlaying(false));
  };

  const missing = !loading && !url;
  const srcLabel = t(`mine.recordings_src_${categoryOf(rec.sourceType)}`, lang);
  const hasStd = rec.korean || rec.text;

  return (
    <Card variant="default" padding="md">
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 12, marginBottom: 10 }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <span style={{ fontSize: 10, fontWeight: 600, padding: '2px 8px', borderRadius: 'var(--radius-sm)', background: 'var(--color-surface-3)', color: 'var(--color-ink-3)' }}>
            {srcLabel}
          </span>
          {hasStd && (
            <p style={{ fontSize: 14, fontWeight: 700, color: 'var(--color-ink-1)', margin: '8px 0 0', lineHeight: 1.5 }}>
              {rec.korean || rec.text}
            </p>
          )}
          {rec.textZh && <p style={{ fontSize: 12, color: 'var(--color-ink-3)', margin: '2px 0 0' }}>{rec.textZh}</p>}
        </div>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {hasStd && (
          <button
            onClick={() => speak(rec.korean || rec.text || '')}
            title={t('mine.recordings_hear_standard', lang)}
            aria-label={t('mine.recordings_hear_standard', lang)}
            style={{ minWidth: 44, minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)', background: 'transparent', border: 'none', color: 'var(--color-ink-4)', cursor: 'pointer' }}
          >
            <Volume2 size={14} />
          </button>
        )}
        {missing ? (
          <span style={{ fontSize: 11, color: 'var(--color-ink-4)', fontStyle: 'italic' }}>{t('mine.recordings_audio_missing', lang)}</span>
        ) : (
          <button
            onClick={togglePlay}
            disabled={loading}
            style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 4, fontSize: 11, fontWeight: 600, padding: '10px 14px', minHeight: 44, borderRadius: 'var(--radius-pill)', background: playing ? 'var(--color-pink-soft)' : 'var(--color-surface-3)', color: playing ? 'var(--color-pink-strong)' : 'var(--color-ink-2)', border: 'none', cursor: loading ? 'default' : 'pointer', opacity: loading ? 0.5 : 1 }}
          >
            {playing ? <Pause size={12} /> : <Play size={12} />}
            {playing ? t('mine.recordings_playing', lang) : t('mine.recordings_play', lang)}
          </button>
        )}
        <button
          onClick={() => onDelete(rec.id)}
          title={t('mine.recordings_delete', lang)}
          aria-label={t('mine.recordings_delete', lang)}
          style={{ minWidth: 44, minHeight: 44, display: 'inline-flex', alignItems: 'center', justifyContent: 'center', borderRadius: 'var(--radius-sm)', background: 'transparent', border: 'none', color: 'var(--color-ink-4)', cursor: 'pointer' }}
        >
          <Trash2 size={12} />
        </button>
        {rec.createdAt && (
          <span style={{ fontSize: 10, color: 'var(--color-ink-4)', marginLeft: 'auto' }}>{fmtDate(rec.createdAt, lang)}</span>
        )}
      </div>
    </Card>
  );
}

export default function MineRecordingsPage() {
  const { lang } = useLang();
  const { user } = useAuth();
  const router = useRouter();
  const isDesktop = useIsDesktop();
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);
  const [cat, setCat] = useState<SrcCat>('all');

  const load = useCallback(() => {
    setLoading(true);
    setLoadError(false);
    db.recordings.orderBy('createdAt').reverse().limit(200).toArray()
      .then((rows) => setRecordings(rows as Recording[]))
      .catch(() => setLoadError(true))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    db.recordings.orderBy('createdAt').reverse().toArray()
      .then((rows) => setRecordings(rows as Recording[]))
      .catch(() => setRecordings([]))
      .finally(() => setLoading(false));
  }, [user]);

  const handlePlay = async (recording: Recording) => {
    if (audioEl) { audioEl.pause(); setPlaying(null); }

    // Resolve audio source: base64 data, data URL, or server download URL
    let src: string | null =
      recording.audioDataUrl ||
      recording.audioData ||
      null;

    // KPOP recordings: fetch from server if no local data
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
    await db.recordings.delete(id);
    setRecordings((prev) => prev.filter((r) => r.id !== id));
  };

  const cats: { key: SrcCat; label: string }[] = [
    { key: 'all', label: t('mine.recordings_src_all', lang) },
    { key: 'diary', label: t('mine.recordings_src_diary', lang) },
    { key: 'reading', label: t('mine.recordings_src_reading', lang) },
    { key: 'phonetics', label: t('mine.recordings_src_phonetics', lang) },
    { key: 'speaking', label: t('mine.recordings_src_speaking', lang) },
  ];

  const counts = recordings.reduce<Record<string, number>>((acc, r) => {
    const c = categoryOf(r.sourceType);
    acc[c] = (acc[c] || 0) + 1;
    return acc;
  }, {});

  const filtered = cat === 'all' ? recordings : recordings.filter((r) => categoryOf(r.sourceType) === cat);

  const containerCls = 'mine-stage';

  return (
    <div className="mine-scope mine-bg">
    <div className={containerCls}>
      <button
        onClick={() => router.push('/mine')}
        className="mine-back"
      >
        <ArrowLeft size={14} />
        {t('mine.back', lang)}
      </button>

      <PageHeader
        eyebrow="MY RECORDINGS"
        title={t('mine.recordings_title', lang)}
        subtitle={!loading && recordings.length > 0 ? t('mine.recordings_count', lang, { n: recordings.length }) : t('mine.recordings_subtitle', lang)}
        tone="mint"
        flat
      />

      {loading ? (
        <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
          <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid var(--color-pink-base)', borderTopColor: 'transparent', animation: 'tori-spin 0.7s linear infinite', margin: '0 auto' }} />
        </Card>
      ) : loadError ? (
        <Card variant="hero" tone="mint" padding="lg">
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: 14, color: 'var(--color-ink-3)', marginBottom: 12 }}>{t('mine.common_load_error', lang)}</p>
            <button onClick={load} style={{ fontSize: 13, color: 'var(--color-pink-base)', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer' }}>{t('mine.common_retry', lang)}</button>
          </div>
          <h2 className="text-[16px] font-bold text-[#2f2a26] mb-2">这里会展示你的录音</h2>
          <p className="text-[13px] text-[#8b766e] max-w-xs leading-relaxed">
            在影子跟读、KPOP 跟唱和发音练习中录制的音频，会出现在这里
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          <p className="text-[12px] text-[#8c8177]">共 {recordings.length} 条录音</p>
          {recordings.map((rec) => (
            <div
              key={rec.id}
              className="bg-white border border-[#efe4d8] rounded-[18px] p-4 shadow-[0_2px_8px_rgba(92,64,38,0.03)]"
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div className="flex-1 min-w-0">
                  <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-md bg-[#f5f0ea] text-[#8c8177]">
                    {typeLabel(rec.type)}
                  </span>
                  {(rec.korean || rec.text) && (
                    <p className="text-[14px] font-bold text-[#2f2a26] mt-1.5 leading-relaxed">
                      {rec.korean || rec.text}
                    </p>
                  )}
                  {rec.textZh && (
                    <p className="text-[12px] text-[#8b766e] mt-0.5">{rec.textZh}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {(rec.korean || rec.text) && (
                  <button
                    onClick={() => speak(rec.korean || rec.text || '', 0.8)}
                    className="p-1.5 rounded-xl text-[#c7b7b0] hover:text-[#e47a94] hover:bg-[#f5f0ea] transition-colors"
                    title="听发音"
                  >
                    <Volume2 size={14} />
                  </button>
                )}
                {(rec.audioDataUrl || rec.audioData || (rec.sourceType === 'kpop' && rec.sourceId)) && (
                  <button
                    onClick={() => handlePlay(rec)}
                    className={`inline-flex items-center gap-1.5 text-[11px] font-medium px-3 py-1.5 rounded-xl transition-all ${
                      playing === rec.id
                        ? 'bg-[#e47a94]/15 text-[#e47a94]'
                        : 'bg-[#f5f0ea] text-[#8c8177] hover:bg-[#efe4d8] active:scale-95'
                    }`}
                  >
                    <Play size={12} />
                    {playing === rec.id ? '播放中' : '播放'}
                  </button>
                )}
                <button
                  onClick={() => handleDelete(rec.id)}
                  className="inline-flex items-center gap-1 text-[11px] px-2 py-1.5 rounded-xl text-[#c7b7b0] hover:text-red-400 hover:bg-red-50 transition-colors"
                >
                  <Trash2 size={12} />
                </button>
                {rec.createdAt && (
                  <span className="text-[10px] text-[#c7b7b0] ml-auto">
                    {new Date(rec.createdAt).toLocaleDateString('zh-CN')}
                  </span>
                )}
              </div>
            </div>
            <h2 style={{ fontSize: 16, fontWeight: 800, color: 'var(--color-ink-1)', margin: '0 0 6px' }}>{t('mine.recordings_empty_title', lang)}</h2>
            <p style={{ fontSize: 13, color: 'var(--color-ink-3)', margin: 0, lineHeight: 1.6 }}>{t('mine.recordings_empty_desc', lang)}</p>
          </div>
        </Card>
      ) : (
        <Section spacing="normal">
          {/* 来源分类 Tab */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 14, flexWrap: 'wrap' }}>
            {cats.map((c) => {
              const active = cat === c.key;
              const n = c.key === 'all' ? recordings.length : (counts[c.key] || 0);
              return (
                <button
                  key={c.key}
                  onClick={() => setCat(c.key)}
                  style={{ padding: '6px 14px', borderRadius: 999, fontSize: 12.5, fontWeight: 700, border: '1px solid', borderColor: active ? 'var(--color-mint-strong)' : 'var(--color-border-2)', background: active ? 'var(--color-mint-strong)' : 'var(--color-surface-2)', color: active ? '#fff' : 'var(--color-ink-2)', cursor: 'pointer' }}
                >
                  {c.label} {n > 0 && <span style={{ opacity: 0.7 }}>({n})</span>}
                </button>
              );
            })}
          </div>

          {filtered.length === 0 ? (
            <Card variant="default" padding="lg" style={{ textAlign: 'center' }}>
              <p style={{ fontSize: 14, color: 'var(--color-ink-3)', margin: 0 }}>{t('mine.recordings_filter_empty', lang)}</p>
            </Card>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: isDesktop ? '1fr 1fr' : '1fr', gap: 10 }}>
              {filtered.map((rec) => (
                <RecordingCard key={rec.id} rec={rec} onDelete={handleDelete} />
              ))}
            </div>
          )}
        </Section>
      )}
    </div>
    </div>
  );
}
