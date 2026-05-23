'use client';

import Link from 'next/link';
import { Palette, Landmark, MapPin, UtensilsCrossed, ArrowRight } from 'lucide-react';

const sections = [
  {
    href: '/korea/culture',
    icon: Palette,
    title: '文化',
    titleKo: '문화',
    description: '韩服、节日、K-POP、礼仪等韩国传统文化与现代文化',
    emoji: '👘',
    color: 'bg-[var(--pink-primary)]/10 text-[var(--pink-primary)]',
  },
  {
    href: '/korea/history',
    icon: Landmark,
    title: '历史',
    titleKo: '역사',
    description: '从古朝鲜到大韩民国，纵览韩国悠久历史',
    emoji: '🏛️',
    color: 'bg-[var(--purple-soft)]/10 text-[var(--purple-soft)]',
  },
  {
    href: '/korea/travel',
    icon: MapPin,
    title: '旅行',
    titleKo: '여행',
    description: '首尔、釜山、济州岛、庆州等热门旅行目的地',
    emoji: '🏙️',
    color: 'bg-[var(--mint-soft)]/10 text-[var(--mint-soft)]',
  },
  {
    href: '/korea/food',
    icon: UtensilsCrossed,
    title: '美食',
    titleKo: '음식',
    description: '烤肉、拌饭、炸鸡、泡菜等地道韩国料理',
    emoji: '🥩',
    color: 'bg-[var(--color-highlight)]/10 text-[var(--peach-soft)]',
  },
];

export default function KoreaPage() {
  return (
    <div className="py-4 space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)]">韩国文化</h1>
        <p className="text-[var(--text-secondary)] text-sm mt-1">
          了解韩国的文化、历史、旅行和美食，在语境中学习韩语
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {sections.map((section) => {
          const IconComponent = section.icon;
          return (
            <Link
              key={section.href}
              href={section.href}
              className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-6 hover:border-[var(--pink-primary)]/40 hover:bg-[var(--bg-input)]/50 transition-all group"
            >
              <div className="flex items-start gap-4">
                <div
                  className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 ${section.color}`}
                >
                  <IconComponent size={28} />
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="text-lg font-bold text-[var(--text-primary)] group-hover:text-[var(--pink-primary)] transition-colors">
                    {section.emoji} {section.title}
                  </h2>
                  <p className="text-sm text-[var(--text-muted)] mt-0.5">{section.titleKo}</p>
                  <p className="text-sm text-[var(--text-secondary)] mt-2 leading-relaxed line-clamp-2">
                    {section.description}
                  </p>
                </div>
                <div className="text-[var(--text-muted)] group-hover:text-[var(--pink-primary)] transition-colors shrink-0 self-center">
                  <ArrowRight size={20} />
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
