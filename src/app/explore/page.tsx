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
