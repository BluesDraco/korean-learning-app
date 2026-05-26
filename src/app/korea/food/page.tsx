'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { FoodSection } from '@/components/korea/FoodSection';

export default function FoodPage() {
  return (
    <div className="py-4 space-y-3">
      <div>
        <Link href="/korea" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} /> 返回韩国
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">韩国美食</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          从街头小吃到宫廷料理，探索韩国饮食文化
        </p>
      </div>
      <FoodSection />
    </div>
  );
}
