'use client';

import Link from 'next/link';
import { Mic, Clock, ChevronRight } from 'lucide-react';
import { talks } from '@/data/tedxTalks';
import type { TedxTalk } from '@/data/tedxTalks';
import { MobilePageHero } from '@/components/mobile/MobilePageHero';

const levelLabel: Record<TedxTalk['level'], string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
};

const levelColor: Record<TedxTalk['level'], string> = {
  beginner: '#81b5a1',
  intermediate: '#e8a87c',
  advanced: '#e47a94',
};

function fmtTime(s: number) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, '0')}`;
}

export default function TedxListPage() {
  return (
    <div className="py-4 space-y-4 max-w-2xl mx-auto md:max-w-3xl">
      <MobilePageHero
        title="TEDx / 세바시"
        description="用TEDx和세바시韩语演讲练习影子跟读，提升听力和口语"
        variant="green"
        icon="🎤"
      />

      <div className="space-y-3">
        {talks.map((talk) => (
          <Link
            key={talk.id}
            href={`/tedx/${talk.id}`}
            className="flex items-center gap-4 rounded-[20px] bg-white border border-[#efe4d8] px-4 py-4 shadow-[0_4px_14px_rgba(92,64,38,0.05)] active:scale-[0.98] transition-all"
          >
            <div
              className="w-12 h-12 rounded-[16px] flex items-center justify-center shrink-0 text-white text-lg font-black"
              style={{ background: `linear-gradient(135deg, ${levelColor[talk.level]}, ${levelColor[talk.level]}dd)` }}
            >
              <Mic size={22} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-[14px] font-bold text-[#2f2a26] truncate">{talk.title}</p>
              <p className="text-[11px] text-[#8c8177] mt-0.5">
                {talk.speaker} · {talk.event}
              </p>
              <div className="flex items-center gap-2 mt-1.5">
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full"
                  style={{ backgroundColor: `${levelColor[talk.level]}18`, color: levelColor[talk.level] }}
                >
                  {levelLabel[talk.level]}
                </span>
                <span className="text-[10px] text-[#8c8177] flex items-center gap-1">
                  <Clock size={10} /> {fmtTime(talk.durationSec)}
                </span>
                <span className="text-[10px] text-[#8c8177]">{talk.subtitleCount} 句</span>
                {talk.hasChineseSub && (
                  <span className="text-[10px] text-[#81b5a1] font-medium">中韩字幕</span>
                )}
              </div>
            </div>
            <ChevronRight size={18} className="text-[#d4ccc4] shrink-0" />
          </Link>
        ))}
      </div>

      <div className="text-center text-[11px] text-[#8c8177] pt-2">
        音频托管于腾讯云COS · 无需翻墙即可练习
      </div>
    </div>
  );
}
