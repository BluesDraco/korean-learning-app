'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { CultureSection } from '@/components/korea/CultureSection';

export default function CulturePage() {
  return (
    <div className="py-4 space-y-3">
      <div>
        <Link href="/korea" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} /> 返回韩国
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">韩国文化</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          从传统韩服到现代K-POP，了解丰富多彩的韩国文化
        </p>
      </div>
      <CultureSection />
    </div>
  );
}
