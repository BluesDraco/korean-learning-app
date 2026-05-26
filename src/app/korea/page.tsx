'use client';

import { useState } from 'react';
import { Palette, Landmark, MapPin, UtensilsCrossed } from 'lucide-react';
import { CultureSection } from '@/components/korea/CultureSection';
import { HistorySection } from '@/components/korea/HistorySection';
import { TravelSection } from '@/components/korea/TravelSection';
import { FoodSection } from '@/components/korea/FoodSection';

const tabs = [
  { key: 'culture', label: '文化', icon: Palette, emoji: '👘', desc: '韩服、节日、K-POP、礼仪等' },
  { key: 'history', label: '历史', icon: Landmark, emoji: '🏛️', desc: '从古朝鲜到大韩民国' },
  { key: 'travel', label: '旅行', icon: MapPin, emoji: '✈️', desc: '首尔、釜山、济州岛等' },
  { key: 'food', label: '美食', icon: UtensilsCrossed, emoji: '🍖', desc: '街头小吃到宫廷料理' },
] as const;

type TabKey = (typeof tabs)[number]['key'];

export default function KoreaPage() {
  const [tab, setTab] = useState<TabKey>('culture');

  return (
    <div className="py-4 space-y-5">
      <div>
        <h1 className="text-2xl font-bold text-[var(--text-primary)] flex items-center gap-2">
          🇰🇷 韩国
        </h1>
        <p className="text-sm text-[var(--text-secondary)] mt-1">
          了解韩国文化、历史、美食与旅行，边看边学韩语
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto border-b border-[var(--border-color)]">
        {tabs.map((t) => {
          const Icon = t.icon;
          const isActive = tab === t.key;
          return (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 whitespace-nowrap transition-all ${
                isActive
                  ? 'border-[var(--pink-primary)] text-[var(--pink-primary)]'
                  : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)]'
              }`}
            >
              <Icon size={16} />
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Brand card for active tab */}
      <div className="bg-gradient-to-r from-[var(--pink-primary)]/10 to-[var(--purple-soft)]/10 border border-[var(--pink-pale)] rounded-2xl p-4 flex items-center gap-3">
        <span className="text-3xl">{tabs.find((t) => t.key === tab)!.emoji}</span>
        <div>
          <p className="text-sm font-bold text-[var(--text-primary)]">
            {tabs.find((t) => t.key === tab)!.label}
          </p>
          <p className="text-xs text-[var(--text-secondary)] mt-0.5">
            {tabs.find((t) => t.key === tab)!.desc}
          </p>
        </div>
      </div>

      {/* Tab content */}
      <div>
        {tab === 'culture' && <CultureSection />}
        {tab === 'history' && <HistorySection />}
        {tab === 'travel' && <TravelSection />}
        {tab === 'food' && <FoodSection />}
      </div>
    </div>
  );
}
