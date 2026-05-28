import Link from 'next/link';
import { ExternalLink } from 'lucide-react';
import { NewsClient } from './NewsClient';

export default function KpopNewsPage() {
  return (
    <div className="py-6">
      <div className="flex items-center gap-3 mb-2">
        <Link href="/korea/kpop" className="text-sm text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors">
          🎤 韩语歌
        </Link>
        <span className="text-[var(--text-placeholder)] text-sm">›</span>
        <span className="text-sm text-[var(--text-secondary)]">热点资讯</span>
      </div>

      <div className="mb-6">
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">📰 KPOP 热点资讯</h1>
        <p className="text-[var(--text-secondary)] text-base mt-1">
          AI每日自动抓取B站和微博KPOP内容，智能整理成帖
        </p>
      </div>

      {/* External platform quick links */}
      <div className="flex items-center gap-3 mb-8 flex-wrap">
        <span className="text-xs text-[var(--text-muted)]">直达平台：</span>
        {[
          { name: 'B站KPOP', emoji: '📺', url: 'https://search.bilibili.com/all?keyword=KPOP&order=pubdate' },
          { name: '微博KPOP', emoji: '🔴', url: 'https://s.weibo.com/weibo?q=KPOP' },
          { name: 'Melon', emoji: '🍈', url: 'https://www.melon.com/chart/' },
          { name: '豆瓣韩娱', emoji: '💬', url: 'https://www.douban.com/group/explore?tag=KPOP' },
        ].map((p) => (
          <a
            key={p.name}
            href={p.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--pink-primary)] hover:border-[var(--pink-pale)] transition-colors"
          >
            <span>{p.emoji}</span>
            {p.name}
            <ExternalLink size={11} />
          </a>
        ))}
      </div>

      {/* AI Generated posts */}
      <NewsClient />
    </div>
  );
}
