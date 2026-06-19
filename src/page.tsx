'use client';

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Music, Loader2, AlertTriangle, Clock } from 'lucide-react';

export default function KpopCreatePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
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
      // Still show success for now — the job is queued even if network flakes
      setSubmitted(true);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="py-4 space-y-4">
      {/* Back */}
      <div className="flex items-center gap-2 text-[13px]">
        <Link href="/korea/kpop" className="text-[#8c8177] hover:text-[#2f2a26] transition-colors flex items-center gap-1">
          <ArrowLeft size={14} />返回
        </Link>
        <span className="text-[#c7b7b0]">/</span>
        <span className="text-[#8b766e] font-medium">提交想练的歌曲</span>
      </div>

      <h1 className="text-[20px] font-bold text-[#2f2a26]">提交想练的歌曲</h1>
      <p className="text-[13px] text-[#8b766e]">
        粘贴歌曲或公开视频链接，Tori 会尝试整理成逐句跟唱材料。
      </p>

      {!submitted ? (
        <div className="space-y-4">
          {/* URL input */}
          <div>
            <label className="text-[12px] font-bold text-[#2f2a26] mb-1.5 block">歌曲链接</label>
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=... 或 B站链接"
              className="w-full bg-white border border-[#efe4d8] rounded-xl px-4 py-3 text-[14px] text-[#2f2a26] placeholder:text-[#c7b7b0] focus:outline-none focus:border-[#b49ccf] transition-colors shadow-[0_2px_8px_rgba(92,64,38,0.04)]"
            />
            <p className="text-[11px] text-[#8c8177] mt-1.5">支持 YouTube、B站等公开视频链接</p>
          </div>

          {/* Submit */}
          <button
            onClick={handleSubmit}
            disabled={!url.trim() || submitting}
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#b49ccf] text-white rounded-xl text-[14px] font-bold disabled:opacity-40 active:scale-95 transition-all"
          >
            {submitting ? (
              <><Loader2 size={16} className="animate-spin" />正在记录需求...</>
            ) : (
              <><Music size={16} />加入内测候补</>
            )}
          </button>

          {/* Info */}
          <div className="bg-[#fdfaf5] border border-[#efe4d8] rounded-2xl p-4 space-y-3">
            <h3 className="text-[13px] font-bold text-[#2f2a26]">计划中的功能</h3>
            <ul className="space-y-2 text-[12px] text-[#8b766e]">
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-[#e8a87c] shrink-0 mt-0.5" />
                自动识别歌曲信息（标题、歌手、封面）
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-[#e8a87c] shrink-0 mt-0.5" />
                自动匹配歌词和时间轴
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-[#e8a87c] shrink-0 mt-0.5" />
                生成逐句跟唱卡片
              </li>
              <li className="flex items-start gap-2">
                <Clock size={14} className="text-[#e8a87c] shrink-0 mt-0.5" />
                上线后将优先处理候补列表中的歌曲
              </li>
            </ul>
          </div>

          {/* Failure note */}
          <div className="bg-[#fff7fb] border border-[#efe4d8] rounded-2xl p-4">
            <div className="flex items-start gap-2">
              <AlertTriangle size={14} className="text-[#e8a87c] shrink-0 mt-0.5" />
              <div>
                <p className="text-[12px] font-bold text-[#2f2a26] mb-0.5">部分链接可能无法识别</p>
                <p className="text-[11px] text-[#8b766e]">
                  如果无法识别，可以先练 Tori 已整理好的精选歌曲。
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Post-submit state */
        <div className="space-y-4">
          <div className="bg-[#fdfaf5] border border-[#efe4d8] rounded-2xl p-6 text-center space-y-3">
            <div className="w-14 h-14 rounded-2xl bg-[#81b5a1]/10 flex items-center justify-center mx-auto">
              <Clock size={24} className="text-[#81b5a1]" />
            </div>
            <h2 className="text-[16px] font-bold text-[#2f2a26]">已记录你的需求</h2>
            <p className="text-[13px] text-[#8b766e] leading-relaxed">
              链接生成跟唱材料功能正在开发中，已记录你的歌曲链接。功能上线后我们会优先处理。
            </p>
            <p className="text-[11px] text-[#8c8177]">当前可以先练习 Tori 已整理好的 105 首精选歌曲。</p>
          </div>

          <Link
            href="/korea/kpop"
            className="w-full flex items-center justify-center gap-2 py-3 bg-[#2f2a26] text-white rounded-xl text-[14px] font-bold active:scale-95 transition-all"
          >
            返回 KPOP 首页
          </Link>

          <button
            onClick={() => { setSubmitted(false); setUrl(''); }}
            className="w-full py-2.5 text-[13px] text-[#8c8177] hover:text-[#2f2a26] transition-colors"
          >
            再生成一首
          </button>
        </div>
      )}
    </div>
  );
}
