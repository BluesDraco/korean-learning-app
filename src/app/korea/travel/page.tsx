'use client';

import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { TravelSection } from '@/components/korea/TravelSection';

export default function TravelPage() {
  return (
    <div className="py-4 space-y-3">
      <div>
        <Link href="/korea" className="inline-flex items-center gap-1.5 text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)] mb-3">
          <ArrowLeft size={16} /> 返回韩国
        </Link>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">韩国旅行</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          探索韩国热门城市，学实用的旅行韩语
        </p>
      </div>
      <TravelSection />
    </div>
  );
}
