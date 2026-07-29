'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, ImageOff, CheckCircle2, Upload, Trash2, Plus } from 'lucide-react';

interface StoredImage { url: string; w: number; h: number }
interface BlogPostImages {
  slug: string;
  titleKo: string;
  titleZh: string;
  category: string;
  unlockDay: number;
  isFeatured: boolean;
  authorId: string;
  authorName: string;
  authorEmoji: string;
  images: StoredImage[];
}

export default function BlogImagesPage() {
  const [posts, setPosts] = useState<BlogPostImages[]>([]);
  const [total, setTotal] = useState(0);
  const [withImg, setWithImg] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  const fileRef = useRef<HTMLInputElement>(null);
  const targetSlug = useRef<string | null>(null);

  const load = () => {
    fetch('/api/admin/blog-images')
      .then((r) => r.json())
      .then((data) => {
        if (data.posts) {
          setPosts(data.posts);
          setTotal(data.total ?? 0);
          setWithImg(data.withImg ?? 0);
        } else setError('加载失败');
      })
      .catch(() => setError('加载失败'))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const pickFile = (slug: string) => {
    targetSlug.current = slug;
    fileRef.current?.click();
  };

  const onFileChosen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    const slug = targetSlug.current;
    if (!file || !slug) return;
    setBusy(slug);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('slug', slug);
      const res = await fetch('/api/admin/blog-images', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) { alert(data.error || '上传失败'); return; }
      setNotice('图片已保存到本地。需要重新部署才能在线上生效。');
      load();
    } catch {
      alert('上传失败');
    } finally {
      setBusy(null);
    }
  };

  const deleteImage = async (slug: string, url: string) => {
    if (!confirm('删除这张图？')) return;
    setBusy(slug);
    try {
      const res = await fetch('/api/admin/blog-images', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug, url }),
      });
      const data = await res.json();
      if (!res.ok) { alert(data.error || '删除失败'); return; }
      setNotice('已删除。需要重新部署才能在线上生效。');
      load();
    } catch {
      alert('删除失败');
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

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <ImageOff size={20} className="text-[var(--pink-primary)]" />
          动物城博客图片
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          给 NPC 帖子配图。第一张图=列表封面，全部图=详情页画廊。服务端自动压缩、保留原图比例（超出 4:5~1.91:1 才裁）。
          不配图的帖子保持渐变+emoji 兜底封面。
          <span className="text-[var(--pink-primary)]">上传后需重新部署才在线上生效。</span>
        </p>
      </div>

      {notice && (
        <div className="mb-5 rounded-lg border border-[var(--pink-primary)] bg-[var(--bg-soft)] px-4 py-3 text-sm text-[var(--text-primary)] flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[var(--pink-primary)] shrink-0" />
          {notice}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
        {[
          { label: '帖子总数', value: total, cls: 'text-[var(--text-primary)]' },
          { label: '已配图', value: `${withImg}/${total}`, cls: 'text-emerald-500' },
          { label: '待配图', value: total - withImg, cls: 'text-[var(--text-muted)]' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
            <p className={`text-2xl font-semibold ${s.cls}`}>{s.value}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {posts.map((p) => {
          const isBusy = busy === p.slug;
          return (
            <div key={p.slug} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-3">
              <div className="flex items-start justify-between gap-2 mb-2.5">
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-semibold text-[var(--pink-primary)]">Day {p.unlockDay}</span>
                    <span className="text-xs text-[var(--text-muted)]">{p.authorEmoji} {p.authorName}</span>
                    {p.isFeatured && <span className="text-[10px] text-amber-500">★精选</span>}
                  </div>
                  <p className="text-sm font-medium text-[var(--text-primary)] truncate mt-0.5" title={p.titleKo}>{p.titleKo}</p>
                  <p className="text-[11px] text-[var(--text-muted)] truncate">{p.titleZh} · {p.category}</p>
                </div>
                {p.images.length > 0 && (
                  <span className="shrink-0 text-[10px] px-1.5 py-0.5 rounded bg-[var(--bg-soft)] text-emerald-500">{p.images.length} 图</span>
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {p.images.map((im, i) => (
                  <div key={im.url} className="relative group" style={{ width: 72 }}>
                    <div className="relative w-full overflow-hidden rounded-md border border-[var(--border-color)] bg-[var(--bg-soft)]" style={{ aspectRatio: `${im.w} / ${im.h}` }}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={im.url} alt={`${p.slug}-${i}`} loading="lazy" className="w-full h-full object-cover" />
                      {i === 0 && (
                        <span className="absolute top-0.5 left-0.5 text-[8px] px-1 rounded bg-black/55 text-white">封面</span>
                      )}
                    </div>
                    <button
                      onClick={() => deleteImage(p.slug, im.url)}
                      disabled={isBusy}
                      className="mt-1 w-full flex items-center justify-center gap-1 px-1 py-0.5 rounded text-[10px] text-[var(--text-secondary)] hover:bg-red-500/10 hover:text-red-400 transition-colors disabled:opacity-40"
                    >
                      <Trash2 size={10} /> 删
                    </button>
                  </div>
                ))}

                <div style={{ width: 72 }}>
                  <button
                    onClick={() => pickFile(p.slug)}
                    disabled={isBusy || p.images.length >= 10}
                    className="w-full aspect-square flex flex-col items-center justify-center gap-1 rounded-md border border-dashed border-[var(--border-color)] text-[var(--text-muted)] hover:border-[var(--pink-primary)] hover:text-[var(--pink-primary)] transition-colors disabled:opacity-40"
                    title={p.images.length >= 10 ? '最多 10 张' : '添加图片'}
                  >
                    {isBusy ? <Loader2 size={16} className="animate-spin" /> : <Plus size={18} />}
                    <span className="text-[9px]">{p.images.length ? '加图' : '上传'}</span>
                  </button>
                  <span className="mt-1 w-full flex items-center justify-center gap-1 text-[10px] text-transparent select-none">
                    <Upload size={10} /> .
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
