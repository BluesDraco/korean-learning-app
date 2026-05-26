'use client';

import { useState, useMemo } from 'react';
import { Volume2 } from 'lucide-react';
import { foodItems } from '@/data/korea';

const categoryTabs = [
  { value: 'all', label: '全部' },
  { value: 'main', label: '主菜' },
  { value: 'soup', label: '汤类' },
  { value: 'snack', label: '小吃' },
  { value: 'side', label: '配菜' },
  { value: 'drink', label: '饮品' },
  { value: 'dessert', label: '甜点' },
] as const;

const categoryMap: Record<string, string> = {
  main: '主菜', soup: '汤类', snack: '小吃', side: '配菜', drink: '饮品', dessert: '甜点',
};

function speakKorean(text: string) {
  window.speechSynthesis.cancel();
  const utterance = new SpeechSynthesisUtterance(text);
  utterance.lang = 'ko-KR';
  utterance.rate = 0.8;
  window.speechSynthesis.speak(utterance);
}

export function FoodSection() {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const filtered = useMemo(() => {
    if (activeCategory === 'all') return foodItems;
    return foodItems.filter((item) => item.category === activeCategory);
  }, [activeCategory]);

  return (
    <div className="space-y-3">
      <div className="flex gap-2 overflow-x-auto pb-1">
        {categoryTabs.map((tab) => {
          const isActive = activeCategory === tab.value;
          return (
            <button
              key={tab.value}
              onClick={() => setActiveCategory(tab.value)}
              className={`text-sm px-3.5 py-2 rounded-lg whitespace-nowrap transition-colors shrink-0 ${
                isActive
                  ? 'bg-[var(--bg-accent)] text-[var(--text-primary)] font-medium ring-1 ring-[var(--pink-pale)]'
                  : 'bg-[var(--bg-card)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-input)]'
              }`}
            >
              {tab.label}
            </button>
          );
        })}
      </div>

      <p className="text-xs text-[var(--text-muted)]">
        共 {filtered.length} 种美食
        {activeCategory !== 'all' && ` / 分类: ${categoryMap[activeCategory] || activeCategory}`}
      </p>

      {filtered.length === 0 ? (
        <div className="text-center py-16">
          <span className="text-4xl block mb-3">🍽️</span>
          <p className="text-[var(--text-secondary)] text-sm">该分类下暂无美食</p>
        </div>
      ) : (
        <div className="space-y-4">
          {filtered.map((food) => (
            <div key={food.id} className="bg-[var(--bg-card)] border border-[var(--border-color)] rounded-2xl p-5 space-y-3">
              <div className="flex items-start gap-3">
                <span className="text-4xl shrink-0">{food.emoji}</span>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <h2 className="text-lg font-bold text-[var(--text-primary)]">{food.name}</h2>
                    <span className="text-sm text-[var(--text-muted)]">{food.nameKo}</span>
                    <span className="text-[14px] px-2 py-0.5 rounded-full bg-[var(--bg-accent)] text-[var(--text-secondary)]">
                      {categoryMap[food.category] || food.category}
                    </span>
                  </div>
                  <p className="text-sm text-[var(--text-secondary)] mt-1.5 leading-relaxed">{food.description}</p>
                </div>
              </div>
              {food.ingredients.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {food.ingredients.map((ingredient) => (
                    <span key={ingredient} className="text-[14px] px-2 py-1 rounded-lg bg-[var(--bg-card-hover)] text-[var(--text-secondary)] border border-[var(--border-color)]">
                      {ingredient}
                    </span>
                  ))}
                </div>
              )}
              {food.phrases.length > 0 && (
                <div>
                  <h4 className="text-xs font-medium text-[var(--text-muted)] mb-2">实用短句</h4>
                  <div className="space-y-2">
                    {food.phrases.map((phrase, idx) => (
                      <div key={idx} className="flex items-center gap-3 bg-[var(--bg-input)] rounded-xl px-3 py-2.5">
                        <div className="flex-1 min-w-0">
                          <p className="text-sm text-[var(--text-primary)] font-medium">{phrase.ko}</p>
                          <p className="text-xs text-[var(--text-secondary)] mt-0.5">{phrase.zh}</p>
                        </div>
                        <button
                          onClick={() => speakKorean(phrase.ko)}
                          className="p-1.5 rounded-lg bg-[var(--bg-card)] hover:bg-[var(--bg-accent)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors shrink-0"
                          title="听发音"
                        >
                          <Volume2 size={16} />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
