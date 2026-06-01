import Link from 'next/link';
import {
  Wrench, Sparkles, Search, Mic, Pencil, RefreshCw,
  FileText, Languages, Keyboard, PenLine, MessageSquare,
  ChevronRight,
} from 'lucide-react';

const featuredTool = {
  label: '内容拆解',
  desc: '输入任意韩语句子，AI 帮你逐词拆解、分析语法、翻译中文',
  href: '/ai',
  icon: Sparkles,
  color: 'var(--pink-primary)',
};

const toolGrid = [
  { label: '查词翻译', desc: '韩语字典查词', href: '/dictionary', icon: Search, color: 'var(--purple-soft)' },
  { label: '发音跟读', desc: '录音对比标准音', href: '/pronunciation', icon: Mic, color: 'var(--pink-primary)' },
  { label: '听写练习', desc: '听韩语写出来', href: '/dictation', icon: Pencil, color: 'var(--peach-soft)' },
  { label: '闪卡复习', desc: 'SRS间隔复习', href: '/review', icon: RefreshCw, color: 'var(--mint-soft)' },
  { label: '文章拆解', desc: '韩语文章分析', href: '/reading', icon: FileText, color: 'var(--purple-soft)' },
  { label: '语法解释', desc: '句型分析和例句', href: '/grammar', icon: Languages, color: 'var(--pink-primary)' },
  { label: '韩文打字', desc: '韩文键盘练习', href: '/typing', icon: Keyboard, color: 'var(--peach-soft)' },
  { label: '写作练习', desc: '韩语写作输出', href: '/writing', icon: PenLine, color: 'var(--mint-soft)' },
  { label: 'AI场景陪练', desc: '情景对话练习', href: '/ai/chat', icon: MessageSquare, color: 'var(--purple-soft)' },
];

export default function ToolsPage() {
  return (
    <div className="py-4 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">工具</h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">我现在要用什么工具学习？</p>
      </div>

      {/* Featured tool */}
      <Link
        href={featuredTool.href}
        className="block bg-[var(--bg-card)] border-2 border-[var(--pink-primary)]/20 rounded-3xl p-6 hover:border-[var(--pink-primary)]/40 transition-all group"
      >
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${featuredTool.color}15` }}>
            <featuredTool.icon size={28} style={{ color: featuredTool.color }} />
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-lg font-bold text-[var(--text-primary)]">{featuredTool.label}</p>
            <p className="text-xs text-[var(--text-muted)] mt-0.5">{featuredTool.desc}</p>
          </div>
          <ChevronRight size={20} className="text-[var(--pink-primary)] group-hover:translate-x-0.5 transition-transform" />
        </div>
      </Link>

      {/* Tool grid */}
      <div className="grid grid-cols-3 gap-2.5">
        {toolGrid.map((tool) => (
          <Link
            key={tool.href}
            href={tool.href}
            className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-3.5 text-center hover:border-[var(--border-hover)] transition-colors group"
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${tool.color}15` }}>
              <tool.icon size={20} style={{ color: tool.color }} />
            </div>
            <p className="text-xs font-medium text-[var(--text-primary)]">{tool.label}</p>
            <p className="text-[10px] text-[var(--text-muted)] mt-0.5 leading-tight">{tool.desc}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
