// 段落复述素材聚合 · 不改原数据,从主题对话 + 阅读文章切段。
// 主题对话:每个 dialogue 即一段(天生成段);阅读文章:每 3-4 句切一段。
// keyPoints 供 /api/ai/retell-judge 判"内容完整度",规则化从中文抽取。

export interface RetellSentence { ko: string; zh: string; }
export interface RetellPassage {
  [k: string]: unknown;
  id: string;
  source: 'dialogue' | 'reading';
  title: string;
  level?: string;
  sentences: RetellSentence[];
  keyPoints: string[];
  fullKo: string;
}

export type RetellSource = 'dialogue' | 'reading';

/** 中文句 → 要点短语(去尾标点,截断到 ~18 字,规则化) */
function toKeyPoint(zh: string): string {
  const t = zh.trim().replace(/[。！？、,，.!?…]+$/g, '');
  return t.length > 18 ? t.slice(0, 18) + '…' : t;
}

/** 从若干中文句提炼 2-5 条要点 · 太多则均匀抽样 */
function deriveKeyPoints(zhList: string[]): string[] {
  const cleaned = zhList.map(toKeyPoint).filter(Boolean);
  if (cleaned.length <= 5) return cleaned;
  const step = cleaned.length / 5;
  const picked: string[] = [];
  for (let i = 0; i < 5; i++) picked.push(cleaned[Math.floor(i * step)]);
  return picked;
}

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

async function buildDialoguePassages(): Promise<RetellPassage[]> {
  const { getAllThemes } = await import('@/data/vocabulary');
  const themes = await getAllThemes();
  const out: RetellPassage[] = [];
  for (const theme of themes) {
    for (const [di, dlg] of (theme.dialogues ?? []).entries()) {
      const sentences: RetellSentence[] = dlg.turns
        .filter(t => t.korean?.trim())
        .map(t => ({ ko: t.korean.trim(), zh: t.chinese?.trim() ?? '' }));
      if (sentences.length < 2) continue; // 太短不成段
      out.push({
        id: `dlg-${theme.id}-${di}`,
        source: 'dialogue',
        title: dlg.title || theme.name,
        level: theme.difficulty,
        sentences,
        keyPoints: deriveKeyPoints(sentences.map(s => s.zh)),
        fullKo: sentences.map(s => s.ko).join(' '),
      });
    }
  }
  return out;
}

async function buildReadingPassages(level?: string): Promise<RetellPassage[]> {
  const { readingArticles } = await import('@/data/reading-new');
  const out: RetellPassage[] = [];
  const CHUNK = 4;
  for (const article of readingArticles) {
    if (article.hidden) continue;
    if (level && article.level !== level) continue;
    const sents = (article.sentences ?? []).filter(s => s.ko?.trim());
    for (let i = 0; i < sents.length; i += CHUNK) {
      const chunk = sents.slice(i, i + CHUNK);
      if (chunk.length < 2) continue;
      const sentences: RetellSentence[] = chunk.map(s => ({ ko: s.ko.trim(), zh: s.zh?.trim() ?? '' }));
      out.push({
        id: `rd-${article.id}-${i}`,
        source: 'reading',
        title: `${article.title} · 第 ${Math.floor(i / CHUNK) + 1} 段`,
        level: article.level,
        sentences,
        keyPoints: deriveKeyPoints(sentences.map(s => s.zh)),
        fullKo: sentences.map(s => s.ko).join(' '),
      });
    }
  }
  return out;
}

/** 按来源加载段落 · reading 可按等级过滤 */
export async function loadRetellPassages(opts: { source: RetellSource; level?: string }): Promise<RetellPassage[]> {
  const list = opts.source === 'dialogue'
    ? await buildDialoguePassages()
    : await buildReadingPassages(opts.level);
  return shuffle(list);
}
