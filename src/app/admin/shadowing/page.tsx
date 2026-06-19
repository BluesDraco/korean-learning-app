'use client';

import { useEffect, useState } from 'react';

interface ClipRow {
  id: string;
  title: string;
  speaker: string;
  sourceType: string;
  youtubeId: string;
  difficulty: string;
  isPremium: boolean;
  isPublished: boolean;
  sortOrder: number;
  segmentCount?: number;
  durationLabel: string;
  createdAt: number;
}

interface FormData {
  title: string;
  speaker: string;
  description: string;
  sourceType: string;
  youtubeId: string;
  coverUrl: string;
  durationMs: number;
  difficulty: string;
  tags: string;
  isPremium: boolean;
  isPublished: boolean;
  sortOrder: number;
}

interface SegmentRow {
  id: string;
  segIndex: number;
  startMs: number;
  endMs: number;
  korean: string;
  chinese: string;
  shadowingTip: string;
}

const EMPTY_FORM: FormData = {
  title: '', speaker: '', description: '',
  sourceType: 'youtube', youtubeId: '', coverUrl: '',
  durationMs: 0, difficulty: 'A2', tags: '',
  isPremium: true, isPublished: false, sortOrder: 0,
};

function msToTime(ms: number) {
  const s = Math.floor(ms / 1000);
  return String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
}

export default function AdminShadowingPage() {
  const [clips, setClips] = useState<ClipRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<FormData>(EMPTY_FORM);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<string | null>(null);
  const [selectedClip, setSelectedClip] = useState<ClipRow | null>(null);
  const [segments, setSegments] = useState<SegmentRow[]>([]);
  const [segLoading, setSegLoading] = useState(false);
  const [segJson, setSegJson] = useState('');
  const [importingSegs, setImportingSegs] = useState(false);

  // URL extract state
  const [extractUrl, setExtractUrl] = useState('');
  const [extractLoading, setExtractLoading] = useState(false);
  const [extractError, setExtractError] = useState<string | null>(null);
  const [extractSuccess, setExtractSuccess] = useState<string | null>(null);

  function showToast(msg: string) { setToast(msg); setTimeout(() => setToast(null), 2500); }

  async function handleExtract() {
    if (!extractUrl.trim() || extractLoading) return;
    setExtractLoading(true);
    setExtractError(null);
    setExtractSuccess(null);
    try {
      const res = await fetch('/api/shadowing/extract', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: extractUrl.trim() }),
      });
      const data = await res.json();
      if (data.clipId) {
        setExtractSuccess((data.cached ? '命中缓存' : '提取成功') + `：${data.title ?? data.clipId}（${data.segmentCount} 句）`);
        setExtractUrl('');
        loadClips();
      } else {
        setExtractError(data.error ?? '提取失败，请重试');
      }
    } catch {
      setExtractError('网络错误，请重试');
    }
    setExtractLoading(false);
  }

  async function loadClips() {
    setLoading(true);
    try {
      const r = await fetch('/api/shadowing/clips?_admin=1');
      const data = await r.json();
      setClips(data.clips ?? []);
    } catch { showToast('加载失败'); }
    setLoading(false);
  }

  useEffect(() => { loadClips(); }, []);

  async function handleSave() {
    if (!form.title || !form.youtubeId) { showToast('标题和 YouTube ID 必填'); return; }
    setSaving(true);
    try {
      const body = {
        title: form.title, speaker: form.speaker, description: form.description,
        sourceType: form.sourceType, youtubeId: form.youtubeId, coverUrl: form.coverUrl,
        durationMs: Number(form.durationMs), difficulty: form.difficulty,
        tags: form.tags.split(',').map(t => t.trim()).filter(Boolean),
        isPremium: form.isPremium, isPublished: form.isPublished, sortOrder: Number(form.sortOrder),
      };
      const r = await fetch('/api/shadowing/clips', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
      const data = await r.json();
      if (data.ok) { showToast('创建成功 ' + data.id); setShowForm(false); setForm(EMPTY_FORM); loadClips(); }
      else showToast('失败: ' + (data.error ?? ''));
    } catch (e) { showToast('网络错误'); }
    setSaving(false);
  }

  async function togglePublish(clip: ClipRow) {
    try {
      await fetch('/api/shadowing/clips/' + clip.id, {
        method: 'PATCH', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isPublished: !clip.isPublished }),
      });
      showToast(clip.isPublished ? '已下线' : '已上线');
      loadClips();
    } catch { showToast('操作失败'); }
  }

  async function loadSegments(clipId: string) {
    setSegLoading(true);
    try {
      const r = await fetch('/api/shadowing/clips/' + clipId + '?_admin=1');
      const data = await r.json();
      setSegments(data.clip?.segments ?? []);
    } catch {}
    setSegLoading(false);
  }

  function handleSelectClip(clip: ClipRow) {
    setSelectedClip(clip);
    setSegJson('');
    loadSegments(clip.id);
  }

  async function handleImportSegments() {
    if (!selectedClip || !segJson.trim()) return;
    setImportingSegs(true);
    try {
      const segs = JSON.parse(segJson);
      if (!Array.isArray(segs)) throw new Error('必须是数组');
      const r = await fetch('/api/shadowing/segments', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ clipId: selectedClip.id, segments: segs }),
      });
      const data = await r.json();
      if (data.ok) { showToast('导入成功 ' + (data.count ?? '') + ' 句'); setSegJson(''); loadSegments(selectedClip.id); loadClips(); }
      else showToast('失败: ' + (data.error ?? ''));
    } catch (e: any) { showToast('JSON 格式错误: ' + e.message); }
    setImportingSegs(false);
  }

  return (
    <div className="p-6 max-w-5xl">
      {toast && (
        <div className="fixed top-4 right-4 z-50 bg-[var(--text-primary)] text-white text-sm font-bold px-4 py-2.5 rounded-xl shadow-lg">{toast}</div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-black text-[var(--text-primary)]">影子跟读管理</h1>
          <p className="text-sm text-[var(--text-muted)] mt-1">管理影子跟读片段和字幕内容</p>
        </div>
        <button onClick={() => { setShowForm(true); setForm(EMPTY_FORM); }} className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[var(--pink-primary)] text-white text-sm font-bold hover:opacity-90 transition-opacity">
          + 新增片段
        </button>
      </div>

      {/* URL extract */}
      <div className="mb-6 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
        <div className="text-xs font-bold text-[var(--text-muted)] mb-2">通过 YouTube URL 自动提取字幕</div>
        <div className="flex gap-2">
          <input
            value={extractUrl}
            onChange={e => setExtractUrl(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleExtract()}
            placeholder="粘贴 YouTube 链接..."
            disabled={extractLoading}
            className="flex-1 px-3 py-2 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--pink-primary)] disabled:opacity-50 font-mono"
          />
          <button
            onClick={handleExtract}
            disabled={extractLoading || !extractUrl.trim()}
            className="px-4 py-2 text-sm font-bold rounded-xl bg-[var(--pink-primary)] text-white disabled:opacity-40 hover:opacity-90 transition-opacity whitespace-nowrap"
          >
            {extractLoading ? '提取中...' : '提取'}
          </button>
        </div>
        {extractLoading && <div className="text-xs text-[var(--text-muted)] mt-2">正在提取字幕并翻译，约需 30-60 秒…</div>}
        {extractError && <div className="text-xs text-red-500 font-bold mt-2">{extractError}</div>}
        {extractSuccess && <div className="text-xs text-emerald-600 font-bold mt-2">✓ {extractSuccess}</div>}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: clip list */}
        <div>
          <h2 className="text-base font-bold text-[var(--text-primary)] mb-3">片段列表 ({clips.length})</h2>
          {loading ? (
            <div className="text-sm text-[var(--text-muted)] py-8 text-center">加载中...</div>
          ) : clips.length === 0 ? (
            <div className="text-sm text-[var(--text-muted)] py-8 text-center border border-dashed border-[var(--border-color)] rounded-xl">暂无片段，点击右上角新增</div>
          ) : (
            <div className="space-y-2">
              {clips.map(clip => (
                <div key={clip.id} onClick={() => handleSelectClip(clip)} className={`p-4 rounded-xl border cursor-pointer transition-all ${selectedClip?.id === clip.id ? 'border-[var(--pink-primary)] bg-[var(--bg-soft)]' : 'border-[var(--border-color)] bg-[var(--bg-card)] hover:border-[var(--pink-primary)]/50'}`}>
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex-1 min-w-0">
                      <div className="font-bold text-sm text-[var(--text-primary)] truncate">{clip.title}</div>
                      {clip.speaker && <div className="text-xs text-[#f0799b] font-semibold mt-0.5">{clip.speaker}</div>}
                      <div className="flex gap-1.5 mt-1.5 flex-wrap">
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)]">{clip.difficulty}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)]">{clip.sourceType}</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)]">{clip.segmentCount ?? 0} 句</span>
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)]">{clip.durationLabel}</span>
                      </div>
                    </div>
                    <div className="flex flex-col gap-1.5 items-end">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${clip.isPublished ? 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' : 'bg-[var(--bg-input)] text-[var(--text-muted)]'}`}>
                        {clip.isPublished ? '已上线' : '未上线'}
                      </span>
                      <button onClick={e => { e.stopPropagation(); togglePublish(clip); }} className={`text-[10px] font-bold px-2 py-1 rounded-lg border transition-colors ${clip.isPublished ? 'border-red-200 text-red-500 hover:bg-red-50' : 'border-emerald-200 text-emerald-600 hover:bg-emerald-50'}`}>
                        {clip.isPublished ? '下线' : '上线'}
                      </button>
                    </div>
                  </div>
                  <div className="text-[10px] text-[var(--text-muted)] mt-1.5 font-mono">{clip.youtubeId}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right: segment editor */}
        <div>
          {selectedClip ? (
            <div>
              <h2 className="text-base font-bold text-[var(--text-primary)] mb-1">{selectedClip.title}</h2>
              <p className="text-xs text-[var(--text-muted)] mb-3">字幕句子管理（{segments.length} 句）</p>

              {/* Import JSON */}
              <div className="mb-4 p-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
                <div className="text-xs font-bold text-[var(--text-muted)] mb-2">批量导入字幕 JSON</div>
                <div className="text-xs text-[var(--text-muted)] mb-2 leading-relaxed">
                  格式：{'[{"segIndex":1,"startMs":1000,"endMs":3000,"korean":"안녕하세요","chinese":"你好","shadowingTip":"注意连音"}]'}
                </div>
                <textarea
                  value={segJson}
                  onChange={e => setSegJson(e.target.value)}
                  placeholder="粘贴 JSON 数组..."
                  className="w-full h-28 text-xs p-3 rounded-lg border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] font-mono resize-none focus:outline-none focus:border-[var(--pink-primary)]"
                />
                <button onClick={handleImportSegments} disabled={importingSegs || !segJson.trim()} className="mt-2 px-4 py-2 text-xs font-bold rounded-lg bg-[var(--pink-primary)] text-white disabled:opacity-50 hover:opacity-90 transition-opacity">
                  {importingSegs ? '导入中...' : '导入字幕'}
                </button>
              </div>

              {/* Existing segments */}
              {segLoading ? (
                <div className="text-xs text-[var(--text-muted)] text-center py-4">加载中...</div>
              ) : segments.length === 0 ? (
                <div className="text-xs text-[var(--text-muted)] text-center py-4 border border-dashed border-[var(--border-color)] rounded-xl">暂无字幕，请导入</div>
              ) : (
                <div className="space-y-2 max-h-[400px] overflow-y-auto">
                  {segments.map(seg => (
                    <div key={seg.id} className="p-3 rounded-xl border border-[var(--border-color)] bg-[var(--bg-card)]">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-[10px] font-bold text-[var(--text-muted)]">#{seg.segIndex}</span>
                        <span className="text-[10px] text-[var(--text-muted)] font-mono">{msToTime(seg.startMs)} – {msToTime(seg.endMs)}</span>
                      </div>
                      <div className="text-sm font-bold text-[var(--text-primary)]">{seg.korean}</div>
                      {seg.chinese && <div className="text-xs text-[var(--text-muted)] mt-0.5">{seg.chinese}</div>}
                      {seg.shadowingTip && <div className="text-[10px] text-[#4e746d] mt-0.5">💡 {seg.shadowingTip}</div>}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center justify-center h-48 border border-dashed border-[var(--border-color)] rounded-xl text-sm text-[var(--text-muted)]">
              点击左侧片段查看字幕
            </div>
          )}
        </div>
      </div>

      {/* New clip form modal */}
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/40" onClick={() => setShowForm(false)}>
          <div className="relative w-full max-w-lg bg-[var(--bg-card)] rounded-t-3xl sm:rounded-2xl p-6 shadow-2xl max-h-[90vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
            <div className="flex items-center justify-between mb-5">
              <h3 className="text-lg font-black text-[var(--text-primary)]">新增片段</h3>
              <button onClick={() => setShowForm(false)} className="w-8 h-8 rounded-full bg-[var(--bg-input)] text-[var(--text-muted)] flex items-center justify-center text-sm">✕</button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="text-xs font-bold text-[var(--text-muted)] block mb-1">YouTube ID <span className="text-red-400">*</span></label>
                <input value={form.youtubeId} onChange={e => setForm(f => ({ ...f, youtubeId: e.target.value }))} placeholder="如 WvX4hDBkFiE" className="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--pink-primary)] font-mono" />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-muted)] block mb-1">标题 <span className="text-red-400">*</span></label>
                <input value={form.title} onChange={e => setForm(f => ({ ...f, title: e.target.value }))} className="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--pink-primary)]" />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[var(--text-muted)] block mb-1">说话人</label>
                  <input value={form.speaker} onChange={e => setForm(f => ({ ...f, speaker: e.target.value }))} className="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none focus:border-[var(--pink-primary)]" />
                </div>
                <div>
                  <label className="text-xs font-bold text-[var(--text-muted)] block mb-1">难度</label>
                  <select value={form.difficulty} onChange={e => setForm(f => ({ ...f, difficulty: e.target.value }))} className="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none">
                    <option value="A1">A1 入门</option>
                    <option value="A2">A2 初级</option>
                    <option value="B1">B1 中级</option>
                    <option value="B2">B2 高级</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-bold text-[var(--text-muted)] block mb-1">类型</label>
                  <select value={form.sourceType} onChange={e => setForm(f => ({ ...f, sourceType: e.target.value }))} className="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none">
                    {['youtube','drama','variety','vlog','kpop','tedx','news'].map(t => <option key={t} value={t}>{t}</option>)}
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-[var(--text-muted)] block mb-1">时长(ms)</label>
                  <input type="number" value={form.durationMs} onChange={e => setForm(f => ({ ...f, durationMs: Number(e.target.value) }))} className="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none" />
                </div>
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-muted)] block mb-1">简介</label>
                <textarea value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} rows={2} className="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none resize-none" />
              </div>
              <div>
                <label className="text-xs font-bold text-[var(--text-muted)] block mb-1">标签（逗号分隔）</label>
                <input value={form.tags} onChange={e => setForm(f => ({ ...f, tags: e.target.value }))} placeholder="如 自然语速,日常场景" className="w-full px-3 py-2.5 text-sm rounded-xl border border-[var(--border-color)] bg-[var(--bg-input)] text-[var(--text-primary)] focus:outline-none" />
              </div>
              <div className="flex items-center gap-6">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isPremium} onChange={e => setForm(f => ({ ...f, isPremium: e.target.checked }))} className="w-4 h-4 rounded" />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">会员专属</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" checked={form.isPublished} onChange={e => setForm(f => ({ ...f, isPublished: e.target.checked }))} className="w-4 h-4 rounded" />
                  <span className="text-sm font-semibold text-[var(--text-primary)]">立即上线</span>
                </label>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button onClick={() => setShowForm(false)} className="h-11 rounded-xl border border-[var(--border-color)] text-sm font-bold text-[var(--text-muted)] hover:bg-[var(--bg-input)] transition-colors">取消</button>
              <button onClick={handleSave} disabled={saving} className="h-11 rounded-xl bg-[var(--pink-primary)] text-white text-sm font-bold disabled:opacity-50 hover:opacity-90 transition-opacity">
                {saving ? '保存中...' : '创建片段'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
