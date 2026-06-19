'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { YonseiSection } from '@/components/vocabulary/YonseiSection';

export default function YonseiBooksPage() {
  return (
    <div className="py-4 space-y-5">
      <div className="flex items-center gap-3">
        <Link href="/vocabulary/library" className="text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-2xl font-bold text-[var(--text-primary)] section-header">教材词汇</h1>
          <p className="text-sm text-[var(--text-secondary)] mt-1">延世・首尔韩国语官方教材同步词汇，按单元学习</p>
        </div>
      </div>
      <YonseiSection />
    </div>
  );
}
