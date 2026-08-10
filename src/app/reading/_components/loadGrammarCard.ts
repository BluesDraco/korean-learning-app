import type { GrammarCard } from '@/types';

// 273 节语法课分散在 30 个 part 文件，按需动态 import（与 grammar/page.tsx 同款惰性加载）
const partLoaders: Record<string, () => Promise<Record<string, unknown>>> = {
  p1: () => import('@/data/grammar-cards-p1'), p2: () => import('@/data/grammar-cards-p2'),
  p3: () => import('@/data/grammar-cards-p3'), p4: () => import('@/data/grammar-cards-p4'),
  p5: () => import('@/data/grammar-cards-p5'), p6: () => import('@/data/grammar-cards-p6'),
  p7: () => import('@/data/grammar-cards-p7'), p8: () => import('@/data/grammar-cards-p8'),
  p9: () => import('@/data/grammar-cards-p9'), p10: () => import('@/data/grammar-cards-p10'),
  p11: () => import('@/data/grammar-cards-p11'), p12: () => import('@/data/grammar-cards-p12'),
  p13: () => import('@/data/grammar-cards-p13'), p14: () => import('@/data/grammar-cards-p14'),
  p15: () => import('@/data/grammar-cards-p15'), p16: () => import('@/data/grammar-cards-p16'),
  p17: () => import('@/data/grammar-cards-p17'), p18: () => import('@/data/grammar-cards-p18'),
  p19: () => import('@/data/grammar-cards-p19'), p20: () => import('@/data/grammar-cards-p20'),
  p21: () => import('@/data/grammar-cards-p21'), p22: () => import('@/data/grammar-cards-p22'),
  p23: () => import('@/data/grammar-cards-p23'), p24: () => import('@/data/grammar-cards-p24'),
  p25: () => import('@/data/grammar-cards-p25'), p26: () => import('@/data/grammar-cards-p26'),
  p27: () => import('@/data/grammar-cards-p27'), p28: () => import('@/data/grammar-cards-p28'),
  p29: () => import('@/data/grammar-cards-p29'), p30: () => import('@/data/grammar-cards-p30'),
};

const partCache: Record<string, GrammarCard[]> = {};

async function loadPartCards(part: string): Promise<GrammarCard[]> {
  if (partCache[part]) return partCache[part];
  const loader = partLoaders[part];
  if (!loader) return [];
  try {
    const mod = await loader();
    const key = Object.keys(mod).find((k) => Array.isArray(mod[k]))!;
    if (!key) return [];
    partCache[part] = mod[key] as GrammarCard[];
    return partCache[part];
  } catch {
    return [];
  }
}

// 按 cardId 顺序加载多张语法课卡（缺失或加载失败的跳过），保持传入顺序
export async function loadGrammarCards(cardIds: string[]): Promise<GrammarCard[]> {
  const out: GrammarCard[] = [];
  for (const id of cardIds) {
    const m = id.match(/^card-(p\d+)-/);
    if (!m) continue;
    const cards = await loadPartCards(m[1]);
    const found = cards.find((c) => c.id === id);
    if (found) out.push(found);
  }
  return out;
}
