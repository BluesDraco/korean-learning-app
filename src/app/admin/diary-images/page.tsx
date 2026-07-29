'use client';

import { useEffect, useRef, useState } from 'react';
import { Loader2, ImageOff, CheckCircle2, AlertTriangle, MinusCircle, Upload } from 'lucide-react';
import type { ToriImageKind } from '@/types/tori-diary';

interface ImgSlot {
  url: string | null;
  fileExists: boolean;
}
interface DayImages {
  day: number;
  title: string | null;
  exists: boolean;
  hero: ImgSlot;
  scene: ImgSlot;
}
interface LevelImages {
  level: string;
  label: string;
  days: DayImages[];
}

type Status = 'ok' | 'missing' | 'unwired';
function statusOf(slot: ImgSlot): Status {
  if (!slot.url) return 'unwired';
  return slot.fileExists ? 'ok' : 'missing';
}

export default function DiaryImagesPage() {
  const [levels, setLevels] = useState<LevelImages[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [busy, setBusy] = useState<string | null>(null);
  const [notice, setNotice] = useState('');
  // 本地预览覆盖：上传成功后用带时间戳的 url 立即刷新缩略图（破 next/image 缓存）
  const [preview, setPreview] = useState<Record<string, string>>({});
  const fileRef = useRef<HTMLInputElement>(null);
  const targetRef = useRef<{ level: string; day: number; kind: ToriImageKind } | null>(null);

  const load = () => {
    fetch('/api/admin/diary-images')
      .then((r) => r.json())
      .then((data) => {
        if (data.levels) setLevels(data.levels);
        else setError('加载失败');
      })
      .catch(() => setError('加载失败'))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const pickFile = (level: string, day: number, kind: ToriImageKind) => {
    targetRef.current = { level, day, kind };
    fileRef.current?.click();
  };

  const onFileChosen = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = '';
    const t = targetRef.current;
    if (!file || !t) return;
    const key = `${t.level}-${t.day}-${t.kind}`;
    setBusy(key);
    try {
      const fd = new FormData();
      fd.append('file', file);
      fd.append('level', t.level);
      fd.append('day', String(t.day));
      fd.append('kind', t.kind);
      const res = await fetch('/api/admin/diary-images', { method: 'POST', body: fd });
      const data = await res.json();
      if (!res.ok) { alert(data.error || '上传失败'); return; }
      setPreview((p) => ({ ...p, [key]: data.previewUrl }));
      setNotice('图片已保存到本地。需要重新部署才能在线上生效。');
      load();
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

  const all = levels.flatMap((l) => l.days.filter((d) => d.exists));
  const heroOk = all.filter((d) => statusOf(d.hero) === 'ok').length;
  const sceneOk = all.filter((d) => statusOf(d.scene) === 'ok').length;
  const missing = all.filter((d) => statusOf(d.hero) === 'missing' || statusOf(d.scene) === 'missing').length;
  const unwired = all.filter((d) => statusOf(d.hero) === 'unwired' || statusOf(d.scene) === 'unwired').length;

  const Slot = ({ level, day, kind, slot, ratio, w }: {
    level: string; day: number; kind: ToriImageKind; slot: ImgSlot; ratio: string; w?: number;
  }) => {
    const key = `${level}-${day}-${kind}`;
    const st = statusOf(slot);
    const isBusy = busy === key;
    const src = preview[key] ?? slot.url ?? '';
    const showImg = !!preview[key] || st === 'ok';
    return (
      <div style={w ? { width: w, flexShrink: 0 } : { flex: 1, minWidth: 0 }}>
        <div
          className="relative w-full overflow-hidden rounded-md border border-[var(--border-color)] bg-[var(--bg-soft)]"
          style={{ aspectRatio: ratio }}
        >
          {showImg && src ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={src} alt={kind} loading="lazy" className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center gap-1 text-[var(--text-muted)]">
              {st === 'missing' ? <AlertTriangle size={16} className="text-amber-500" /> : <MinusCircle size={14} />}
              <span className="text-[9px]">{st === 'missing' ? '文件缺失' : '未接线'}</span>
            </div>
          )}
          {isBusy && (
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
              <Loader2 className="animate-spin text-white" size={18} />
            </div>
          )}
        </div>
        <button
          onClick={() => pickFile(level, day, kind)}
          disabled={isBusy}
          className="mt-1 w-full flex items-center justify-center gap-1 px-1.5 py-0.5 rounded text-[10px] text-[var(--text-secondary)] hover:bg-[var(--bg-input)] hover:text-[var(--pink-primary)] transition-colors disabled:opacity-40"
          title={`上传替换${kind === 'hero' ? '横板' : '竖板'}`}
        >
          <Upload size={11} /> {kind === 'hero' ? '横' : '竖'}
        </button>
      </div>
    );
  };

  return (
    <div>
      <input ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" className="hidden" onChange={onFileChosen} />

      <div className="mb-6">
        <h1 className="text-xl font-semibold text-[var(--text-primary)] flex items-center gap-2">
          <ImageOff size={20} className="text-[var(--pink-primary)]" />
          日记图片总览
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-1">
          每天 hero(横 16:9)+ scene(竖 9:16)。点「横/竖」上传替换，服务端自动压缩并裁成正确比例，覆盖同名图。
          <span className="text-[var(--pink-primary)]">上传后需重新部署才在线上生效。</span>
        </p>
      </div>

      {notice && (
        <div className="mb-5 rounded-lg border border-[var(--pink-primary)] bg-[var(--bg-soft)] px-4 py-3 text-sm text-[var(--text-primary)] flex items-center gap-2">
          <CheckCircle2 size={16} className="text-[var(--pink-primary)] shrink-0" />
          {notice}
        </div>
      )}

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
        {[
          { label: 'hero 已配图', value: `${heroOk}/${all.length}`, cls: 'text-emerald-500' },
          { label: 'scene 已配图', value: `${sceneOk}/${all.length}`, cls: 'text-emerald-500' },
          { label: '文件缺失', value: missing, cls: 'text-amber-500' },
          { label: '未接线', value: unwired, cls: 'text-[var(--text-muted)]' },
        ].map((s) => (
          <div key={s.label} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-4">
            <p className={`text-2xl font-semibold ${s.cls}`}>{s.value}</p>
            <p className="text-xs text-[var(--text-muted)] mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      {levels.map((lv) => (
        <section key={lv.level} className="mb-10">
          <h2 className="text-sm font-semibold text-[var(--text-secondary)] mb-3 flex items-center gap-2">
            {lv.label}
            <span className="text-xs font-normal text-[var(--text-muted)]">({lv.level})</span>
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {lv.days.map((d) => {
              const bothOk = d.exists && statusOf(d.hero) === 'ok' && statusOf(d.scene) === 'ok';
              return (
                <div key={d.day} className="rounded-lg border border-[var(--border-color)] bg-[var(--bg-card)] p-2.5">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-[var(--text-primary)]">Day {d.day}</span>
                    {!d.exists ? (
                      <span className="text-[10px] text-[var(--text-muted)]">无数据</span>
                    ) : bothOk ? (
                      <CheckCircle2 size={14} className="text-emerald-500" />
                    ) : (
                      <AlertTriangle size={14} className="text-amber-500" />
                    )}
                  </div>
                  <div className="flex gap-2">
                    <Slot level={lv.level} day={d.day} kind="hero" slot={d.hero} ratio="16 / 9" />
                    <Slot level={lv.level} day={d.day} kind="scene" slot={d.scene} ratio="9 / 16" w={44} />
                  </div>
                  {d.title && (
                    <p className="mt-2 text-[10px] text-[var(--text-muted)] truncate" title={d.title}>{d.title}</p>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
}
