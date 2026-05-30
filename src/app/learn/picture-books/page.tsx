'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, Sparkles } from 'lucide-react';
import { pictureBooks } from '@/data/pictureBooks';

export default function PictureBooksPage() {
  return (
    <div className="py-4 space-y-6">
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
        <h2 className="text-sm font-medium text-[var(--text-secondary)] uppercase tracking-wider mb-4">
          绘本列表
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {pictureBooks.map((book) => (
            <div
              key={book.id}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl overflow-hidden hover:shadow-lg transition-shadow group"
            >
              {/* Cover image */}
              <Link
                href={`/learn/picture-books/${book.id}`}
                className="block relative overflow-hidden"
                style={{ aspectRatio: '3/4' }}
              >
                {book.coverImage ? (
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, 33vw"
                  />
                ) : (
                  <div
                    className="w-full h-full flex items-center justify-center"
                    style={{ background: `linear-gradient(135deg, ${book.color}30, ${book.color}10)` }}
                  >
                    <span className="text-6xl">{book.emoji}</span>
                  </div>
                )}
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center">
                  <span className="px-6 py-2.5 bg-white/90 text-[var(--pink-primary)] font-bold rounded-full opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0 shadow-lg text-sm">
                    开始阅读
                  </span>
                </div>
              </Link>

              {/* Info */}
              <div className="p-4 space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-bold text-[var(--text-primary)]">{book.title}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${
                    book.level === 'beginner'
                      ? 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]'
                      : 'bg-[var(--peach-soft)]/10 text-[var(--peach-soft)]'
                  }`}>
                    {book.level === 'beginner' ? '初级' : '中级'}
                  </span>
                </div>
                <p className="text-sm text-[var(--text-secondary)] line-clamp-2">{book.description}</p>
                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-[var(--text-muted)]">{book.pages.length} 页</span>
                  <Link
                    href={`/learn/picture-books/${book.id}`}
                    className="flex items-center gap-1 text-sm font-medium text-[var(--pink-primary)] hover:gap-2 transition-all"
                  >
                    开始阅读
                    <Sparkles size={14} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Coming soon */}
      <div className="text-center py-8">
        <p className="text-xs text-[var(--text-muted)]">
          更多绘本故事即将上线...
        </p>
      </div>
    </div>
  );
}
