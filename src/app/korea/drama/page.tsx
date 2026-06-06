import { Tv, Sparkles } from 'lucide-react';

const sampleExpressions = [
  { ko: '진짜요?', zh: '真的吗？', drama: '来自多部韩剧高频台词', scene: '惊讶/确认' },
  { ko: '가지 마', zh: '别走', drama: '常见于情感场景', scene: '挽留/不舍' },
  { ko: '괜찮아요?', zh: '你没事吧？', drama: '关心/询问', scene: '日常问候' },
  { ko: '수고했어요', zh: '辛苦了', drama: '职场/日常高频', scene: '致谢/道别' },
  { ko: '사랑해', zh: '我爱你', drama: '告白场景必备', scene: '爱情/告白' },
  { ko: '화이팅!', zh: '加油！', drama: '鼓励/打气', scene: '任何激励场景' },
];

export default function DramaPage() {
  return (
    <div className="py-4 space-y-5 max-w-lg mx-auto">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">韩剧表达</h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">从经典韩剧台词中学地道韩语表达</p>
      </div>

      {/* Sample expressions */}
      <div>
        <h2 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 px-1">经典表达预览</h2>
        <div className="space-y-2">
          {sampleExpressions.map((item) => (
            <div key={item.ko} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--purple-soft)]/10 flex items-center justify-center shrink-0">
                <Tv size={18} style={{ color: 'var(--purple-soft)' }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-bold text-[var(--text-primary)]">{item.ko}</p>
                <p className="text-xs text-[var(--text-muted)]">{item.zh} · {item.scene}</p>
              </div>
              <span className="text-[10px] text-[var(--text-placeholder)]">{item.drama}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-[var(--bg-input)] rounded-2xl p-4 text-center">
        <Sparkles size={16} className="text-[var(--pink-primary)] mx-auto mb-1" />
        <p className="text-xs text-[var(--text-secondary)]">更多韩剧台词和场景分类持续更新中。</p>
      </div>
    </div>
  );
}
