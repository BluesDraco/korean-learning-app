'use client';

import Link from 'next/link';
import { useState, useEffect } from 'react';
import { Sparkles, Search, Mic, Pencil, RefreshCw, FileText, Languages, Keyboard, PenLine, MessageSquare, Dumbbell } from 'lucide-react';
import { MobilePageHero } from '@/components/mobile/MobilePageHero';
import { ToriPrimaryButton } from '@/components/mobile/ToriPrimaryButton';
import { ToriSectionHeader } from '@/components/mobile/ToriSectionHeader';
import { ToriIconCard } from '@/components/mobile/ToriIconCard';
import { DesktopToolsPage } from '@/components/desktop/DesktopToolsPage';

const toolGrid = [
  { label: '查词翻译', desc: '点词释义', href: '/dictionary', icon: Search, color: '#b49ccf' },
  { label: '发音跟读', desc: '标准对比', href: '/pronunciation', icon: Mic, color: '#e47a94' },
  { label: '听写练习', desc: '听音默写', href: '/dictation', icon: Pencil, color: '#e8a87c' },
  { label: '闪卡复习', desc: '快速复习', href: '/review', icon: RefreshCw, color: '#81b5a1' },
  { label: '文章拆解', desc: '翻译拆句', href: '/reading', icon: FileText, color: '#b49ccf' },
  { label: '语法解释', desc: '例句讲透', href: '/grammar', icon: Languages, color: '#e47a94' },
  { label: '韩文打字', desc: '键盘入门', href: '/typing', icon: Keyboard, color: '#e8a87c' },
  { label: '写作练习', desc: '短句改写', href: '/writing', icon: PenLine, color: '#81b5a1' },
  { label: 'AI 场景陪练', desc: '情景开口', href: '/ai/chat', icon: MessageSquare, color: '#b49ccf' },
];

export default function ToolsPage() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 1024);
    const onResize = () => setIsDesktop(window.innerWidth >= 1024);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isDesktop) return <DesktopToolsPage />;

  return (
    <div className="py-4 space-y-5 max-w-2xl mx-auto md:max-w-3xl">
      <MobilePageHero
        title="工具"
        description="把你看到的韩文，变成可以学的内容。"
        variant="green"
      />

      {/* Featured cards */}
      <div className="space-y-2.5">
        {/* Content breakdown */}
        <div className="rounded-[28px] bg-gradient-to-br from-[#ffe4ec] to-[#fff4dc] p-5 shadow-[0_8px_24px_rgba(92,64,38,0.06)]">
          <div className="relative z-10">
            <p className="text-[17px] font-bold text-[#2f2a26]">内容拆解</p>
            <p className="text-[13px] text-[#8c8177] mt-1 leading-relaxed">粘贴一句韩语，Tori 帮你翻译、拆词、解释句子。</p>
            <div className="mt-3">
              <Link href="/ai/analyze">
                <ToriPrimaryButton>开始拆解</ToriPrimaryButton>
              </Link>
            </div>
          </div>
        </div>

        {/* Shadowing */}
        <div className="rounded-[28px] bg-gradient-to-br from-[#e0f0ff] to-[#f0e8ff] p-5 shadow-[0_8px_24px_rgba(92,64,38,0.06)]">
          <div className="relative z-10">
            <p className="text-[17px] font-bold text-[#2f2a26]">影音跟读</p>
            <p className="text-[13px] text-[#8c8177] mt-1 leading-relaxed">跟着原声逐句模仿，录音对比，提升发音和语调。</p>
            <div className="mt-3">
              <Link href="/shadowing">
                <ToriPrimaryButton>开始跟读</ToriPrimaryButton>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Tool grid */}
      <div>
        <ToriSectionHeader title="全部工具" className="mb-2.5" />
        <div className="grid grid-cols-3 gap-2.5">
          {toolGrid.map((tool) => (
            <ToriIconCard
              key={tool.href}
              icon={<tool.icon size={20} style={{ color: tool.color }} />}
              label={tool.label}
              desc={tool.desc}
              href={tool.href}
            />
          ))}
        </div>
      </div>

    </div>
  );
}
