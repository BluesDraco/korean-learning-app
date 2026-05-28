import Link from 'next/link';
import { ExternalLink, BookOpen } from 'lucide-react';
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
          AI每日整理 · 聚合B站、微博等平台最新KPOP动态
        </p>
      </div>

      {/* Bilibili embed + external platform links */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5 mb-8">
        {/* Bilibili iframe */}
        <div className="lg:col-span-2 bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden">
          <div className="px-5 py-3 border-b border-[var(--border-color)] flex items-center gap-2">
            <span className="text-lg">📺</span>
            <span className="text-sm font-bold text-[var(--text-primary)]">B站 KPOP 热门视频</span>
            <span className="text-[10px] text-[var(--text-muted)] ml-auto">内嵌浏览</span>
          </div>
          <iframe
            src="https://search.bilibili.com/all?keyword=KPOP%E6%9C%80%E6%96%B0&order=pubdate"
            className="w-full h-[500px] border-0"
            title="Bilibili KPOP"
            sandbox="allow-scripts allow-same-origin allow-popups"
            loading="lazy"
          />
        </div>

        {/* External platform links */}
        <div className="space-y-3">
          <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5">
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-3">🔗 外部平台</h3>
            <div className="space-y-2">
              {[
                { name: '微博 KPOP超话', emoji: '🔴', url: 'https://weibo.com/newlogin?tabtype=search&url=https%3A%2F%2Fs.weibo.com%2Fweibo%3Fq%3DKPOP' },
                { name: 'B站 KPOP排行', emoji: '📊', url: 'https://www.bilibili.com/v/popular/rank/music' },
                { name: 'Melon 实时榜', emoji: '🍈', url: 'https://www.melon.com/chart/' },
                { name: 'YouTube KPOP', emoji: '▶️', url: 'https://www.youtube.com/results?search_query=KPOP+official+MV' },
                { name: '豆瓣韩娱小组', emoji: '💬', url: 'https://www.douban.com/search?q=KPOP' },
              ].map((p) => (
                <a
                  key={p.name}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 text-sm text-[var(--text-secondary)] hover:text-[var(--pink-primary)] hover:bg-[var(--bg-card-hover)] rounded-lg px-3 py-2 transition-colors"
                >
                  <span>{p.emoji}</span>
                  <span className="flex-1">{p.name}</span>
                  <ExternalLink size={13} className="text-[var(--text-muted)]" />
                </a>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-pink-50 dark:from-purple-950/20 dark:to-pink-950/20 border border-[var(--border-color)] rounded-2xl p-5">
            <h3 className="text-sm font-bold text-[var(--text-primary)] mb-2">🤖 AI 每日整理</h3>
            <p className="text-xs text-[var(--text-muted)] leading-relaxed">
              AI自动聚合多平台KPOP热点，提取韩语关键词汇。每24小时自动刷新一次，也可手动触发。
            </p>
          </div>
        </div>
      </div>

      {/* AI Generated Daily News */}
      <NewsClient />
    </div>
  );
}
