import Link from 'next/link';
import {
  GraduationCap, Grid3X3, FileText, Mic,
  BookOpen, PenLine, ChevronRight, Lightbulb, Sparkles,
} from 'lucide-react';

const templates = [
  {
    label: '30天入门模板',
    desc: '不知道怎么开始？用30天建立学习节奏，可自由跳过和调整',
    href: '/course',
    icon: GraduationCap,
    color: 'var(--pink-primary)',
    featured: true,
  },
  {
    label: '韩文字母入门',
    desc: '从韩文字母开始，系统认识拼读规则和发音方法',
    href: '/phonetics',
    icon: Grid3X3,
    color: 'var(--purple-soft)',
  },
  {
    label: 'TOPIK备考模板',
    desc: '按等级整理高频词汇、语法、真题练习',
    href: '/topik',
    icon: FileText,
    color: 'var(--peach-soft)',
  },
  {
    label: '发音入门模板',
    desc: '从元音辅音到连音变音，阶梯式发音训练',
    href: '/pronunciation',
    icon: Mic,
    color: 'var(--mint-soft)',
  },
  {
    label: '阅读入门模板',
    desc: '从短句到文章，逐步提升韩语阅读理解能力',
    href: '/reading',
    icon: BookOpen,
    color: 'var(--pink-primary)',
  },
  {
    label: '写作入门模板',
    desc: '从造句到段落，循序渐进练习韩语写作',
    href: '/writing',
    icon: PenLine,
    color: 'var(--purple-soft)',
  },
];

export default function LearningPage() {
  return (
    <div className="py-4 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">自学模板中心</h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">不知道怎么开始？可以先选一个模板建立学习节奏。</p>
      </div>

      {/* Tip */}
      <div className="flex items-start gap-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3">
        <Lightbulb size={16} className="text-[var(--peach-soft)] shrink-0 mt-0.5" />
        <p className="text-xs text-[var(--text-secondary)]">
          这些模板不是固定课程，你可以自由跳过、调整、替换内容。选一个方向开始就好。
        </p>
      </div>

      {/* Template cards */}
      <div className="space-y-3">
        {templates.map((tpl) => (
          <Link
            key={tpl.href}
            href={tpl.href}
            className={`flex items-center gap-4 rounded-2xl p-4 border transition-all group ${
              tpl.featured
                ? 'bg-[var(--pink-primary)]/5 border-[var(--pink-primary)]/20 hover:border-[var(--pink-primary)]/40'
                : 'bg-[var(--bg-card)] border-[var(--border-color)] hover:border-[var(--border-hover)]'
            }`}
          >
            <div className="w-12 h-12 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${tpl.color}15` }}>
              <tpl.icon size={24} style={{ color: tpl.color }} />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-bold text-[var(--text-primary)]">{tpl.label}</p>
                {tpl.featured && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">推荐</span>
                )}
              </div>
              <p className="text-xs text-[var(--text-muted)] mt-0.5">{tpl.desc}</p>
            </div>
            <ChevronRight size={16} className="text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform" />
          </Link>
        ))}
      </div>

      {/* Bottom note */}
      <div className="bg-[var(--bg-input)] rounded-2xl p-4 text-center">
        <Sparkles size={16} className="text-[var(--pink-primary)] mx-auto mb-1" />
        <p className="text-xs text-[var(--text-secondary)]">
          每个模板包含对应的工具入口和内容推荐，你可以在模板中选择需要的部分使用。
        </p>
      </div>
    </div>
  );
}
