'use client';

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Music, Loader2, AlertTriangle, Clock } from 'lucide-react';

function KpopCreateContent() {
  const searchParams = useSearchParams();
  const [url, setUrl] = useState(searchParams.get('url') || '');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async () => {
    if (!url.trim() || submitting) return;
    setSubmitting(true);
    try {
      const res = await fetch('/api/kpop/import', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: url.trim() }),
      });
      if (!res.ok) {
        const err = await res.json().catch(() => ({ error: '请求失败' }));
        throw new Error(err.error || '请求失败');
      }
      setSubmitted(true);
    } catch (e: any) {
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-4 space-y-5">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-[13px]">
        <Link href="/korea/kpop" className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors flex items-center gap-1 font-bold">
          <ArrowLeft size={14} />返回
        </Link>
        <span className="text-[var(--text-muted)]/40">/</span>
        <span className="text-[var(--text-secondary)] font-bold">提交想练的歌曲</span>
      </div>

      <h1 className="text-[20px] font-black text-[var(--text-primary)]">提交想练的歌曲</h1>
      <p className="text-[14px] text-[var(--text-secondary)] leading-relaxed">
        粘贴歌曲或公开视频链接，Tori 会尝试整理成逐句跟唱材料。
      </p>

      {!submitted ? (
        <div className="space-y-4">
          {/* URL input */}
          <div>
            <label className="text-[12px] font-black text-[var(--text-primary)] mb-1.5 block">歌曲链接</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... 或 B站链接"
              className="w-full bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl px-4 py-3 text-[14px] text-[var(--text-primary)] placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--pink-primary)] transition-colors shadow-[0_2px_8px_rgba(78,52,46,0.04)]"
            />
            <p className="text-[11px] text-[var(--text-muted)] mt-1.5 font-bold">支持 YouTube、B站等公开视频链接</p>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!url.trim() || submitting}
            className="w-full flex items-center justify-center gap-2 h-12 rounded-full bg-[var(--text-primary)] text-white text-[14px] font-black disabled:opacity-40 active:scale-95 transition-all shadow-[0_14px_28px_rgba(32,24,21,0.18)]"
          >
            {submitting ? (
              <><Loader2 size={16} className="animate-spin" />正在记录需求...</>
            ) : (
              <><Music size={16} />加入内测候补</>
            )}
          </button>

          {/* Info */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[30px] p-4 space-y-3 shadow-[0_6px_20px_rgba(78,52,46,0.05)]">
            <h3 className="text-[14px] font-black text-[var(--text-primary)]">计划中的功能</h3>
            <ul className="space-y-2 text-[12px] text-[var(--text-secondary)]">
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                自动识别歌曲信息（标题、歌手、封面）
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                自动匹配歌词和时间轴
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                生成逐句跟唱卡片
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
                上线后将优先处理候补列表中的歌曲
              </li>
            </ul>
          </div>

          {/* Failure note */}
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[30px] p-4 shadow-[0_6px_20px_rgba(78,52,46,0.05)]">
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] font-black text-[var(--text-primary)] mb-0.5">部分链接可能无法识别</p>
                <p className="text-[11px] text-[var(--text-muted)]">
                  如果无法识别，可以先练 Tori 已整理好的精选歌曲。
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Post-submit state */
        <div className="space-y-4">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-[30px] p-6 text-center space-y-3 shadow-[0_16px_42px_rgba(78,52,46,0.10)]">
            <div className="w-14 h-14 rounded-2xl bg-[var(--mint-soft)]/15 flex items-center justify-center mx-auto">
              <Clock size={24} className="text-[var(--mint-soft)]" />
            </div>
            <h2 className="text-[16px] font-black text-[var(--text-primary)]">已记录你的需求</h2>
            <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed">
              链接生成跟唱材料功能正在开发中，已记录你的歌曲链接。功能上线后我们会优先处理。
            </p>
            <p className="text-[11px] text-[var(--text-muted)] font-bold">当前可以先练习 Tori 已整理好的精选歌曲。</p>
          </div>

          <Link
            href="/korea/kpop"
            className="w-full flex items-center justify-center h-12 rounded-full bg-[var(--text-primary)] text-white text-[14px] font-black active:scale-95 transition-all shadow-[0_14px_28px_rgba(32,24,21,0.18)]"
          >
            返回 KPOP 首页
          </Link>

          <button
            onClick={() => { setSubmitted(false); setUrl(''); }}
            className="w-full h-11 text-[13px] text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors font-bold"
          >
            再生成一首
          </button>
        </div>
      )}
    </div>
  );
}

export default function KpopCreatePage() {
  return (
    <Suspense>
      <KpopCreateContent />
    </Suspense>
  );
}
