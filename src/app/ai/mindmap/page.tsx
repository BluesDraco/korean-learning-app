'use client';

import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Sparkles, ChevronRight } from 'lucide-react';

interface MindmapCategory {
  emoji: string;
  label: string;
  color: string;
  bg: string;
  scenarios: { id: string; emoji: string; nameZh: string; nameKo: string; level: string }[];
}

const mindmap: MindmapCategory[] = [
  {
    emoji: '🍽️',
    label: '餐饮',
    color: 'var(--peach-soft)',
    bg: 'bg-[var(--peach-soft)]/8 border-[var(--peach-soft)]/20',
    scenarios: [
      { id: 'restaurant', emoji: '🍽️', nameZh: '餐厅点餐', nameKo: '식당 주문', level: '初级' },
      { id: 'cafe', emoji: '☕', nameZh: '咖啡厅', nameKo: '카페', level: '初级' },
    ],
  },
  {
    emoji: '🛍️',
    label: '购物',
    color: 'var(--pink-primary)',
    bg: 'bg-[var(--pink-primary)]/8 border-[var(--pink-primary)]/20',
    scenarios: [
      { id: 'convenience', emoji: '🏪', nameZh: '便利店购物', nameKo: '편의점', level: '初级' },
      { id: 'shopping', emoji: '🛍️', nameZh: '购物砍价', nameKo: '쇼핑 흥정', level: '中级' },
    ],
  },
  {
    emoji: '🚇',
    label: '出行',
    color: 'var(--blue-soft)',
    bg: 'bg-[var(--blue-soft)]/10 border-[var(--blue-soft)]/25',
    scenarios: [
      { id: 'subway', emoji: '🚇', nameZh: '地铁', nameKo: '지하철', level: '中级' },
      { id: 'directions', emoji: '🗺️', nameZh: '问路', nameKo: '길 찾기', level: '初级' },
    ],
  },
  {
    emoji: '🏥',
    label: '医疗',
    color: 'var(--mint-soft)',
    bg: 'bg-[var(--mint-soft)]/10 border-[var(--mint-soft)]/20',
    scenarios: [
      { id: 'hospital', emoji: '🏥', nameZh: '医院', nameKo: '병원', level: '中级' },
    ],
  },
  {
    emoji: '🎤',
    label: '娱乐',
    color: 'var(--purple-soft)',
    bg: 'bg-[var(--purple-soft)]/10 border-[var(--purple-soft)]/20',
    scenarios: [
      { id: 'fanmeeting', emoji: '🌟', nameZh: '追星见面会', nameKo: '팬미팅', level: '高级' },
    ],
  },
];

const levelColor: Record<string, string> = {
  '初级': 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]',
  '中级': 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]',
  '高级': 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]',
};

export default function MindmapPage() {
  const router = useRouter();

  return (
    <div className="py-4 space-y-5">
      {/* Header */}
      <div>
        <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} />
          返回首页
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">情景导图</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          日常场景对话分类导图，点击任意节点即可开始练习
        </p>
      </div>

      {/* Mind Map */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-3xl p-5 md:p-8 overflow-x-auto">
        <div className="flex flex-col items-center min-w-[600px]">
          {/* ── Center / Root Node ── */}
          <div className="relative mb-6">
            <div className="bg-gradient-to-br from-[var(--pink-primary)] to-[var(--purple-soft)] text-white rounded-2xl px-6 py-4 shadow-lg shadow-[var(--pink-primary)]/15 text-center">
              <div className="text-2xl mb-1">🗣️</div>
              <p className="font-bold text-sm">日常场景对话</p>
              <p className="text-xs opacity-75">8个实用场景</p>
            </div>
          </div>

          {/* ── Connecting Line (Root → Categories) ── */}
          <svg className="w-full h-8 mb-1" preserveAspectRatio="none" viewBox="0 0 800 30">
            <line x1="400" y1="0" x2="400" y2="15" stroke="var(--border-color)" strokeWidth="2" />
            <line x1="60" y1="15" x2="740" y2="15" stroke="var(--border-color)" strokeWidth="2" />
            {[0, 1, 2, 3, 4].map((i) => (
              <line key={i} x1={80 + i * 170} y1="15" x2={80 + i * 170} y2="30" stroke="var(--border-color)" strokeWidth="2" />
            ))}
          </svg>

          {/* ── Categories Row ── */}
          <div className="flex justify-center gap-3 md:gap-5 w-full flex-wrap md:flex-nowrap">
            {mindmap.map((cat) => (
              <div key={cat.label} className="flex flex-col items-center flex-1 min-w-[100px] max-w-[160px]">
                {/* Category node */}
                <div
                  className={`rounded-2xl p-3 text-center border-2 ${cat.bg} w-full`}
                  style={{ borderColor: cat.color + '30' }}
                >
                  <span className="text-2xl block mb-0.5">{cat.emoji}</span>
                  <span className="text-sm font-bold" style={{ color: cat.color }}>{cat.label}</span>
                </div>

                {/* Connecting lines */}
                <svg className="w-full h-6" preserveAspectRatio="none" viewBox="0 0 140 24">
                  <line x1="70" y1="0" x2="70" y2="12" stroke="var(--border-color)" strokeWidth="1.5" />
                  {cat.scenarios.length === 2 && (
                    <>
                      <line x1="70" y1="12" x2="20" y2="12" stroke="var(--border-color)" strokeWidth="1.5" />
                      <line x1="70" y1="12" x2="120" y2="12" stroke="var(--border-color)" strokeWidth="1.5" />
                      <line x1="20" y1="12" x2="20" y2="24" stroke="var(--border-color)" strokeWidth="1.5" />
                      <line x1="120" y1="12" x2="120" y2="24" stroke="var(--border-color)" strokeWidth="1.5" />
                    </>
                  )}
                  {cat.scenarios.length === 1 && (
                    <line x1="70" y1="12" x2="70" y2="24" stroke="var(--border-color)" strokeWidth="1.5" />
                  )}
                </svg>

                {/* Scenario leaves */}
                <div className="flex gap-2 w-full justify-center">
                  {cat.scenarios.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => router.push(`/ai/chat`)}
                      className="flex-1 bg-[var(--bg-input)] hover:bg-[var(--bg-accent)] border border-[var(--border-color)] hover:border-[var(--pink-primary)]/30 rounded-xl p-2.5 text-center transition-all hover:-translate-y-0.5 hover:shadow-sm"
                    >
                      <span className="text-lg block">{s.emoji}</span>
                      <p className="text-xs font-medium text-[var(--text-primary)] mt-0.5">{s.nameZh}</p>
                      <p className="text-[14px] text-[var(--text-muted)]">{s.nameKo}</p>
                      <span className={`inline-block text-[14px] px-1.5 py-0.5 rounded-full mt-1 ${levelColor[s.level]}`}>
                        {s.level}
                      </span>
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <Sparkles size={16} className="text-[var(--pink-primary)]" />
          <span className="text-sm font-medium text-[var(--text-primary)]">导图说明</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-[var(--text-secondary)]">
          <div className="flex items-start gap-2">
            <div className="w-3 h-3 rounded-full bg-gradient-to-br from-[var(--pink-primary)] to-[var(--purple-soft)] shrink-0 mt-0.5" />
            <span>中心节点：所有场景对话的主题入口</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-3 h-3 rounded-full bg-[var(--peach-soft)]/30 border border-[var(--peach-soft)]/30 shrink-0 mt-0.5" />
            <span>分类节点：按生活场景归类分组</span>
          </div>
          <div className="flex items-start gap-2">
            <div className="w-3 h-3 rounded bg-[var(--bg-input)] border border-[var(--border-color)] shrink-0 mt-0.5" />
            <span>场景卡片：点击即可进入对话练习</span>
          </div>
          <div className="flex items-start gap-2">
            <ChevronRight size={14} className="text-[var(--text-muted)] shrink-0 mt-0.5" />
            <span>8个场景覆盖购物、餐饮、出行、医疗、娱乐五大类</span>
          </div>
        </div>
      </div>
    </div>
  );
}
