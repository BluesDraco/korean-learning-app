'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, ImageOff, CheckCircle2, AlertTriangle, Upload, BookImage } from 'lucide-react';

interface TopicImage {
  topic: string;
  file: string;
  url: string;
  exists: boolean;
}

interface StoryCover {
  id: string;
  title: string;
  titleKo: string;
  emoji: string;
  level: string;
  forbidden: boolean;
  url: string;
  exists: boolean;
}

export default function ReadingImagesPage() {
  const [topics, setTopics] = useState<TopicImage[]>([]);
  const [total, setTotal] = useState(0);
  const [withImg, setWithImg] = useState(0);
  const [stories, setStories] = useState<StoryCover[]>([]);
  const [storyTotal, setStoryTotal] = useState(0);
  const [storyWithImg, setStoryWithImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const [preview, setPreview] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);
  // 记录当前要上传的目标：{ kind: 'topic'|'story', key }
  const target = useRef<{ kind: 'topic' | 'story'; key: string } | null>(null);

  const loadTopics = () =>
    fetch('/api/admin/reading-images')
      .then((r) => r.json())
      .then((data) => {
        if (data.topics) {
          setTopics(data.topics);
          setTotal(data.total ?? 0);
          setWithImg(data.withImg ?? 0);
        } else setError('加载失败');
      });

  const loadStories = () =>
    fetch('/api/admin/reading-covers')
      .then((r) => r.json())
      .then((data) => {
        if (data.stories) {
          setStories(data.stories);
          setStoryTotal(data.total ?? 0);
          setStoryWithImg(data.withImg ?? 0);
        }
      });

  useEffect(() => {
    Promise.all([loadTopics(), loadStories()])
      .catch(() => setError('加载失败'))
      .finally(() => setLoading(false));
  }, []);

  const pickFile = (kind: 'topic' | 'story', key: string) => {
    target.current = { kind, key };
    fileRef.current?.click();
  };

  const onFileChosen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    const tgt = target.current;
    if (!file || !tgt) return;
    setBusy(tgt.key);
    try {
      const fd = new FormData();
      fd.append('file', file);
      if (tgt.kind === 'topic') {
        fd.append('topic', tgt.key);
        const res = await fetch('/api/admin/reading-images', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) { alert(data.error || '上传失败'); return; }
        setPreview((p) => ({ ...p, [tgt.key]: data.previewUrl }));
        await loadTopics();
      } else {
        fd.append('id', tgt.key);
        const res = await fetch('/api/admin/reading-covers', { method: 'POST', body: fd });
        const data = await res.json();
        if (!res.ok) { alert(data.error || '上传失败'); return; }
        setPreview((p) => ({ ...p, [tgt.key]: data.previewUrl }));
        await loadStories();
      }
      setNotice('图片已保存到本地。需要重新部署才能在线上生效。');
    } catch {
      alert('上传失败');
    } finally {
      setBusy(null);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="animate-spin text-[var(--pink-primary)]" size={28} />
      </div>
    );
  }
  if (error) return <p className="text-red-400 py-10 text-center">{error}</p>;

  return (
    <div>
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onFileChosen} />

      {notice && (
        <div className="mb-5 rounded-lg border border-[var(--pink-primary)] bg-[var(--bg-soft)] px-4 py-3 text-sm text-[var(--text-primary)] flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[var(--pink-primary)] shrink-0" />
          {notice}
        </div>
      )}

      {/* ── 主题图（横版 16:9）── */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <ImageOff size={20} className="text-[var(--pink-primary)]" />
          阅读文章主题图
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          6 个主题各一张横版封面（16:9），同主题下主打大卡与今日推荐共用。服务端自动压缩并裁成 1200×675 webp，覆盖同名图。
          缺图时走 CSS 纯色兜底。
          <span className="text-[var(--pink-primary)]">上传后需重新部署才在线上生效。</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        {[
          { label: '主题数', value: total, cls: 'text-[var(--text-primary)]' },
          { label: '已配图', value: `${withImg}/${total}`, cls: 'text-emerald-500' },
          { label: '待配图', value: total - withImg, cls: 'text-[var(--text-muted)]' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
            <p className={`text-2xl font-semibold ${s.cls}`}>{s.value}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
        {topics.map((t) => {
          const isBusy = busy === t.topic;
          const src = preview[t.topic] ?? (t.exists ? t.url : '');
          const showImg = !!preview[t.topic] || t.exists;
          return (
            <div key={t.topic} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-3">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-semibold text-[var(--text-primary)]">{t.topic}</span>
                {t.exists ? (
                  <CheckCircle2 size={15} className="text-emerald-500" />
                ) : (
                  <AlertTriangle size={15} className="text-amber-500" />
                )}
              </div>
              <div
                className="relative w-full overflow-hidden rounded-md border border-[var(--border-color)] bg-[var(--bg-soft)]"
                style={{ aspectRatio: '16 / 9' }}
              >
                {showImg && src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={t.topic} loading="lazy" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-[var(--text-muted)]">
                    <AlertTriangle size={18} className="text-amber-500" />
                    <span className="text-[11px]">未配图（走纯色兜底）</span>
                  </div>
                )}
                {isBusy && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" size={20} />
                  </div>
                )}
              </div>
              <button
                onClick={() => pickFile('topic', t.topic)}
                disabled={isBusy}
                className="mt-2 w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-input)] hover:text-[var(--pink-primary)] transition-colors disabled:opacity-40"
              >
                <Upload size={13} /> {t.exists ? '替换图片' : '上传图片'}
              </button>
            </div>
          );
        })}
      </div>

      {/* ── 故事集封面（纵版 3:4）── */}
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <BookImage size={20} className="text-[var(--pink-primary)]" />
          故事集封面
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          每个故事一张竖版封面（3:4），显示在故事书架上。无论你上传什么比例，服务端都会统一裁成 600×800 webp。
          缺图时走 CSS 色块 + emoji 兜底。
          <span className="text-[var(--pink-primary)]">上传后需重新部署才在线上生效。</span>
        </p>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-5">
        {[
          { label: '故事数', value: storyTotal, cls: 'text-[var(--text-primary)]' },
          { label: '已配图', value: `${storyWithImg}/${storyTotal}`, cls: 'text-emerald-500' },
          { label: '待配图', value: storyTotal - storyWithImg, cls: 'text-[var(--text-muted)]' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
            <p className={`text-2xl font-semibold ${s.cls}`}>{s.value}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {stories.map((s) => {
          const isBusy = busy === s.id;
          const src = preview[s.id] ?? (s.exists ? s.url : '');
          const showImg = !!preview[s.id] || s.exists;
          return (
            <div key={s.id} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-3">
              <div className="flex items-center justify-between mb-2 gap-1">
                <span className="text-xs font-semibold text-[var(--text-primary)] truncate">
                  {s.forbidden && '🕯️ '}{s.title}
                </span>
                {s.exists ? (
                  <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                ) : (
                  <AlertTriangle size={14} className="text-amber-500 shrink-0" />
                )}
              </div>
              <div
                className="relative w-full overflow-hidden rounded-md border border-[var(--border-color)] bg-[var(--bg-soft)]"
                style={{ aspectRatio: '3 / 4' }}
              >
                {showImg && src ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={src} alt={s.title} loading="lazy" className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-[var(--text-muted)]">
                    <span className="text-3xl">{s.emoji}</span>
                    <span className="text-[10px]">未配图</span>
                  </div>
                )}
                {isBusy && (
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <Loader2 className="animate-spin text-white" size={20} />
                  </div>
                )}
              </div>
              <button
                onClick={() => pickFile('story', s.id)}
                disabled={isBusy}
                className="mt-2 w-full flex items-center justify-center gap-1.5 px-2 py-1.5 rounded text-xs text-[var(--text-secondary)] hover:bg-[var(--bg-input)] hover:text-[var(--pink-primary)] transition-colors disabled:opacity-40"
              >
                <Upload size={13} /> {s.exists ? '替换' : '上传'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
