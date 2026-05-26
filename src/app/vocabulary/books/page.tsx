'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { BooksSection } from '@/components/vocabulary/BooksSection';

export default function WordBooksPage() {
  return (
    <div className="py-4 space-y-4">
      <div className="flex items-center gap-4">
        <Link href="/vocabulary" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">自定义单词本</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">整理你的专属单词集，按主题自由归类</p>
        </div>
      </div>
      <BooksSection />
    </div>
  );
}
