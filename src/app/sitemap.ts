import type { MetadataRoute } from 'next';
import { readingArticles } from '@/data/reading-new';
import { grammarPoints } from '@/data/grammar';
import { themePacks, levelWordLists } from '@/data/vocabulary/vocab-data';
import { topikQuestionTypes } from '@/data/topikQuestionTypes';
import { knowledgeArticles } from '@/data/reading-knowledge';
import { days as diaryDays } from '@/data/diary';
import { SITE_URL } from '@/lib/seo';

const BASE = SITE_URL;

// 有英文 UI 的框架页（en.ts 全量就绪）——这些页在 sitemap 里声明 zh/en 双语 alternates。
// 内容详情页正文仍是中文，不列入，避免误导 Google=英文内容。
const BILINGUAL_PATHS = new Set(['', '/phonetics', '/grammar', '/topik', '/reading', '/vocabulary', '/diary', '/listening', '/speaking', '/tools']);

function altLangs(path: string): { languages: Record<string, string> } | undefined {
  if (!BILINGUAL_PATHS.has(path)) return undefined;
  return { languages: { 'zh-CN': `${BASE}${path || '/'}`, en: `${BASE}/en${path}`, 'x-default': `${BASE}${path || '/'}` } };
}

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: Array<{ path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }> = [
    { path: '', priority: 1.0, changeFrequency: 'weekly' },
    { path: '/phonetics', priority: 0.9, changeFrequency: 'monthly' },
    { path: '/grammar', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/topik', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/diary', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/reading', priority: 0.9, changeFrequency: 'weekly' },
    { path: '/vocabulary', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/speaking', priority: 0.8, changeFrequency: 'weekly' },
    { path: '/writing', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/dictation', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/typing', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/practice', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/review', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/learning', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/knowledge', priority: 0.7, changeFrequency: 'weekly' },
    { path: '/explore', priority: 0.6, changeFrequency: 'weekly' },
    { path: '/tori', priority: 0.6, changeFrequency: 'monthly' },
    { path: '/tools', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools/romanization', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools/keyboard', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/tools/korean-name', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/ai/analyze', priority: 0.7, changeFrequency: 'monthly' },
    { path: '/korea/drama', priority: 0.8, changeFrequency: 'monthly' },
  ];

  const staticEntries = staticPages.map((p) => ({
    url: `${BASE}${p.path || '/'}`,
    lastModified: now,
    changeFrequency: p.changeFrequency,
    priority: p.priority,
    ...(altLangs(p.path) ? { alternates: altLangs(p.path) } : {}),
  }));

  // 双语框架页的 /en 版本，作为独立可爬 URL 收录
  const enEntries = staticPages
    .filter((p) => BILINGUAL_PATHS.has(p.path))
    .map((p) => ({
      url: `${BASE}/en${p.path}`,
      lastModified: now,
      changeFrequency: p.changeFrequency,
      priority: p.priority,
      alternates: altLangs(p.path),
    }));

  const readingEntries = readingArticles.filter((a) => !a.hidden && a.topic !== '금서').map((a) => ({
    url: `${BASE}/reading/${a.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const grammarLibraryEntries = grammarPoints.map((gp) => ({
    url: `${BASE}/grammar/library/${gp.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const vocabularyThemeEntries = themePacks.map((t) => ({
    url: `${BASE}/vocabulary/themes/${t.id}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const vocabularyLevelEntries = levelWordLists.map((l) => ({
    url: `${BASE}/vocabulary/levels/${l.level}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const topikTypeEntries = topikQuestionTypes.map((t) => ({
    url: `${BASE}/topik/type/${t.key}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const knowledgeEntries = knowledgeArticles.map((a) => ({
    url: `${BASE}/reading/knowledge/${a.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const diaryEntries = diaryDays.map((d) => ({
    url: `${BASE}/diary/${d.level}/${d.day}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticEntries, ...enEntries, ...readingEntries, ...grammarLibraryEntries, ...vocabularyThemeEntries, ...vocabularyLevelEntries, ...topikTypeEntries, ...knowledgeEntries, ...diaryEntries];
}
