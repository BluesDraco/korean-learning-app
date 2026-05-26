'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { LevelsSection } from '@/components/vocabulary/LevelsSection';

export default function LevelsPage() {
  return (
    <div className="py-4 space-y-6">
      <div>
        <Link href="/vocabulary/library" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} />
          返回词库
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          📊 TOPIK 分级词表
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          系统打通词汇盲区，逐级攻克 TOPIK 考试词汇
        </p>
      </div>
      <LevelsSection />
    </div>
  );
}
