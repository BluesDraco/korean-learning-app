'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { ThemesSection } from '@/components/vocabulary/ThemesSection';

export default function ThemesPage() {
  return (
    <div className="py-4 space-y-6">
      <div>
        <Link href="/vocabulary/library" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} />
          返回词库
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          🐰 主题词包
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          学一个场景，拿走一套够用的词。토리陪你开口说韩语！
        </p>
      </div>
      <ThemesSection />
    </div>
  );
}
