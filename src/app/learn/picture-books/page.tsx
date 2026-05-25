'use client';

import Link from 'next/link';
import { ArrowLeft, BookOpen, Sparkles } from 'lucide-react';
import { pictureBooks } from '@/data/pictureBooks';

export default function PictureBooksPage() {
  return (
    <div className="py-4 space-y-4">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/learn" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">绘本学习</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">通过可爱的绘本故事，轻松入门韩语</p>
        </div>
      </div>

      {/* Why picture books */}
      <div className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-2xl">📖</span>
          <span className="text-sm font-medium text-[var(--text-primary)]">为什么选择绘本学习？</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          {[
            { emoji: '🎯', title: '简单重复', desc: '每页1-2句，句型反复出现，自然习得' },
            { emoji: '🖼️', title: '图文并茂', desc: '插图辅助理解，无需查词典也能看懂' },
            { emoji: '🔊', title: '有声朗读', desc: '点击即可听到标准韩语发音' },
          ].map((item) => (
            <div key={item.title} className="bg-[var(--bg-input)] rounded-xl p-3 text-center">
              <span className="text-2xl block mb-1">{item.emoji}</span>
              <div className="text-sm font-medium text-[var(--text-primary)]">{item.title}</div>
              <div className="text-xs text-[var(--text-secondary)] mt-0.5">{item.desc}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Book list */}
      <div>
        <h2 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-3">
          绘本列表
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {pictureBooks.map((book) => (
            <Link
              key={book.id}
              href={`/learn/picture-books/${book.id}`}
              className="card-washi group block"
              style={{ '--washi-color': book.color } as React.CSSProperties}
            >
              <div className="p-5">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-2xl flex items-center justify-center shrink-0 overflow-hidden"
                    style={{ backgroundColor: `${book.color}20` }}
                  >
                    <img src="/images/tori-poses/tori-pose-11.png" alt={book.title} className="w-12 h-12 object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-[var(--text-primary)]">{book.title}</h3>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]">
                        {book.level === 'beginner' ? '初级' : '中级'}
                      </span>
                    </div>
                    <p className="text-xs text-[var(--text-secondary)] line-clamp-2">{book.description}</p>
                    <div className="flex items-center gap-3 mt-3">
                      <span className="text-xs text-[var(--text-muted)]">
                        {book.pages.length} 页
                      </span>
                      <span className="flex items-center gap-1 text-xs font-medium text-[var(--pink-primary)] group-hover:translate-x-1 transition-transform">
                        开始阅读
                        <Sparkles size={12} />
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Coming soon hint */}
      <div className="text-center py-8">
        <p className="text-xs text-[var(--text-muted)]">
          更多绘本故事即将上线...
        </p>
      </div>
    </div>
  );
}
