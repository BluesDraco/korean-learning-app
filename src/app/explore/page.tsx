'use client';

import { useState, useEffect } from 'react';
import { BookImage, Lightbulb, Tv } from 'lucide-react';
import { MobilePageHero } from '@/components/mobile/MobilePageHero';
import { ToriHeroCard } from '@/components/mobile/ToriHeroCard';
import { ToriIconCard } from '@/components/mobile/ToriIconCard';
import { ToriFeedCard } from '@/components/mobile/ToriFeedCard';
import { ToriSectionHeader } from '@/components/mobile/ToriSectionHeader';
import { DesktopExplorePage } from '@/components/desktop/DesktopExplorePage';

export default function ExplorePage() {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    setIsDesktop(window.innerWidth >= 768);
    const onResize = () => setIsDesktop(window.innerWidth >= 768);
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  if (isDesktop) return <DesktopExplorePage />;

  return (
    <div className="py-4 max-w-2xl mx-auto md:max-w-3xl space-y-5">
      <MobilePageHero
        title="探索"
        description="用喜欢的内容学韩语。"
        variant="pink"
      />

      {/* Desktop: two-column layout */}
      <div className="space-y-5">

        {/* KPOP singing — temporarily closed */}
        <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-[#ffe4ec] to-[#fff0bd] p-5 border border-[var(--border-color)] opacity-70">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[12px] font-black text-[var(--text-primary)]">KPOP歌词跟唱</span>
            <span className="h-[22px] px-2.5 rounded-full bg-[#201815]/10 text-[10px] font-black text-[#201815]">暂时关闭</span>
          </div>
          <p className="text-[13px] text-[var(--text-secondary)] leading-relaxed mb-3">该功能正在优化升级，稍后上线，敬请期待。</p>
          <div className="h-9 px-4 rounded-full bg-[var(--text-muted)]/20 text-[var(--text-muted)] text-[13px] font-black inline-flex items-center cursor-not-allowed">
            即将上线
          </div>
        </div>

        {/* Hot posts — big entrance */}
        <ToriHeroCard
          label="韩娱热帖"
          desc="刷热点，顺便看懂韩语。每帖逐句拆解。"
          href="/korea/kpop/news"
          actionLabel="看今日热帖"
          gradient="from-[#eee7ff] to-[#e6f3ff]"
          ctaVariant="pill"
        />

        {/* Recommended feed */}
        <div>
          <ToriSectionHeader title="今日推荐" className="mb-2.5" />
          <div className="space-y-2">
            <ToriFeedCard
              label="推荐歌曲"
              desc="KPOP跟唱即将上线"
              href="/korea/kpop/news"
            />
            <ToriFeedCard
              label="今日热帖"
              desc="IVE 回归新闻热帖"
              href="/korea/kpop/news"
            />
            <ToriFeedCard
              label="今日绘本"
              desc="토리와 첫 만남"
              href="/learn/picture-books"
            />
            <ToriFeedCard
              label="今日韩剧表达"
              desc="《眼泪女王》经典台词"
              href="/korea/drama"
            />
          </div>
        </div>

        {/* Interest grid */}
        <div>
          <ToriSectionHeader title="按兴趣探索" className="mb-2.5" />
          <div className="grid grid-cols-2 gap-2.5">
            <ToriIconCard
              icon={<BookImage size={20} className="text-[#81b5a1]" />}
              label="Tori绘本馆"
              desc="韩语绘本故事"
              href="/learn/picture-books"
            />
            <ToriIconCard
              icon={<Lightbulb size={20} className="text-[#e8a87c]" />}
              label="韩国小知识"
              desc="文化·美食·旅行"
              href="/knowledge"
            />
            <ToriIconCard
              icon={<Tv size={20} className="text-[#b49ccf]" />}
              label="韩剧表达"
              desc="经典台词学韩语"
              href="/korea/drama"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
