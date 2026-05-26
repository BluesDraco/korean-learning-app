'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { HistorySection } from '@/components/korea/HistorySection';

export default function HistoryPage() {
  return (
    <div className="py-4 space-y-3">
      <div>
        <Link href="/korea" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} /> 返回韩国
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">韩国历史</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          从檀君建国到汉江奇迹，纵览韩国数千年历史
        </p>
      </div>
      <HistorySection />
    </div>
  );
}
