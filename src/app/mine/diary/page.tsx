'use client';

import Link from 'next/link';
import { ArrowLeft, PenLine } from 'lucide-react';

export default function MineDiaryPage() {
  return (
    <div className="py-4 space-y-4">
      <div className="flex items-center gap-2 text-[13px]">
        <Link href="/mine" className="text-[#8c8177] hover:text-[#2f2a26] transition-colors flex items-center gap-1">
          <ArrowLeft size={14} />返回
        </Link>
        <span className="text-[#c7b7b0]">/</span>
        <span className="text-[#8b766e] font-medium">我的日记</span>
      </div>

      <div className="flex flex-col items-center justify-center py-20 px-4 text-center">
        <div className="w-16 h-16 rounded-2xl bg-[#fbf7f0] flex items-center justify-center mb-4">
          <PenLine size={28} className="text-[#d4ccc4]" />
        </div>
        <h2 className="text-[16px] font-bold text-[#2f2a26] mb-2">这里会展示你的学习日记</h2>
        <p className="text-[13px] text-[#8b766e] max-w-xs leading-relaxed">
          你的学习日记和心得，会在正式版中展示
        </p>
      </div>
    </div>
  );
}
