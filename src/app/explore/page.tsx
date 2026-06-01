import Link from 'next/link';
import {
  Compass, Music, Radio, BookImage, Lightbulb, Tv,
  ChevronRight, Sparkles,
} from 'lucide-react';

const featuredItems = [
  {
    label: 'KPOP歌词跟唱',
    desc: '用喜欢的歌，一句一句学韩语。听歌、看歌词、逐句跟唱、录音对比。',
    href: '/korea/kpop',
    icon: Music,
    color: 'var(--pink-primary)',
  },
  {
    label: '韩娱热帖',
    desc: '像刷帖子一样看韩娱热点，每帖逐句看懂韩语原文。',
    href: '/korea/kpop/news',
    icon: Radio,
    color: 'var(--purple-soft)',
  },
];

const exploreGrid = [
  {
    label: 'Tori绘本馆',
    desc: '韩语绘本故事，边看边学',
    href: '/learn/picture-books',
    icon: BookImage,
    color: 'var(--mint-soft)',
  },
  {
    label: '韩国小知识',
    desc: '文化、美食、旅行',
    href: '/knowledge',
    icon: Lightbulb,
    color: 'var(--peach-soft)',
  },
  {
    label: '韩剧表达',
    desc: '经典韩剧台词学韩语',
    href: '/korea/drama',
    icon: Tv,
    color: 'var(--purple-soft)',
  },
];

export default function ExplorePage() {
  return (
    <div className="py-4 space-y-5">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">探索</h1>
        <p className="text-xs text-[var(--text-muted)] mt-1">用感兴趣的内容学韩语</p>
      </div>

      {/* Featured cards */}
      <div className="space-y-3">
        {featuredItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="block bg-[var(--bg-card)] border-2 border-[var(--border-color)] rounded-3xl p-5 hover:border-[var(--border-hover)] transition-all group"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0" style={{ backgroundColor: `${item.color}15` }}>
                <item.icon size={28} style={{ color: item.color }} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-lg font-bold text-[var(--text-primary)]">{item.label}</p>
                <p className="text-xs text-[var(--text-muted)] mt-0.5">{item.desc}</p>
              </div>
              <ChevronRight size={20} className="text-[var(--text-muted)] group-hover:translate-x-0.5 transition-transform" />
            </div>
          </Link>
        ))}
      </div>

      {/* Explore grid */}
      <div>
        <h2 className="text-xs font-medium text-[var(--text-muted)] uppercase tracking-wider mb-2 px-1">更多发现</h2>
        <div className="grid grid-cols-3 gap-2.5">
          {exploreGrid.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-4 text-center hover:border-[var(--border-hover)] transition-colors group"
            >
              <div className="w-12 h-12 rounded-2xl flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: `${item.color}15` }}>
                <item.icon size={24} style={{ color: item.color }} />
              </div>
              <p className="text-sm font-medium text-[var(--text-primary)]">{item.label}</p>
              <p className="text-[10px] text-[var(--text-muted)] mt-0.5">{item.desc}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[var(--bg-input)] rounded-2xl p-4 text-center">
        <Sparkles size={16} className="text-[var(--pink-primary)] mx-auto mb-1" />
        <p className="text-xs text-[var(--text-secondary)]">
          更多内容正在添加中，包括更多KPOP歌曲、热帖和韩剧台词。
        </p>
      </div>
    </div>
  );
}
