import type { Metadata } from 'next';

// 本站绝对地址：env 驱动，支持国内 .com / 海外 .cn 双部署。
// 未设 env 时回落 torikorean.com（国内默认）。上线海外站只需在 .env.overseas 填 NEXT_PUBLIC_SITE_URL。
export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || 'https://torikorean.com').replace(/\/$/, '');

// 对侧站点地址（可选）：国内站可填海外 .cn，海外站可填国内 .com，用于跨域名 hreflang 互指。
// 未设则不输出跨域 hreflang（安全降级，避免单边声明被 Google 忽略）。
export const ALT_SITE_URL = (process.env.NEXT_PUBLIC_ALT_SITE_URL || '').replace(/\/$/, '');

const BASE = SITE_URL;

export function readingArticleMetadata(a: {
  id: string;
  title: string;
  titleKo: string;
  level: string;
  emoji: string;
  learningGoals: string[];
  estimatedMinutes: number;
}): Metadata {
  const url = `${BASE}/reading/${a.id}`;
  const description = `${a.titleKo}｜${a.learningGoals[0] ?? '韩语分级阅读'}｜韩语 ${a.level} 级 · ${a.estimatedMinutes} 分钟阅读`;
  const image = `${BASE}/tori-og-v2.webp`;
  return {
    title: `${a.title} · 韩语${a.level}分级阅读`,
    description,
    alternates: { canonical: `/reading/${a.id}` },
    openGraph: {
      type: 'article',
      title: `${a.title} · 韩语${a.level}分级阅读`,
      description,
      url,
      locale: 'zh_CN',
      siteName: '兔莉的韩语日记',
      images: [{ url: image, width: 1200, height: 630, alt: a.title }],
    },
    twitter: {
      card: 'summary_large_image',
      title: a.title,
      description,
      images: [image],
    },
  };
}

export function readingArticleJsonLd(a: {
  id: string;
  title: string;
  titleKo: string;
  level: string;
  estimatedMinutes: number;
  topic?: string;
  learningGoals: string[];
}) {
  const url = `${BASE}/reading/${a.id}`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: a.title,
        alternateName: a.titleKo,
        url,
        inLanguage: 'ko',
        learningResourceType: 'Article',
        educationalLevel: a.level,
        teaches: a.learningGoals,
        timeRequired: `PT${a.estimatedMinutes}M`,
        isPartOf: { '@id': `${BASE}/#website` },
        publisher: { '@id': `${BASE}/#org` },
        about: a.topic,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: BASE },
          { '@type': 'ListItem', position: 2, name: '韩语分级阅读', item: `${BASE}/reading` },
          { '@type': 'ListItem', position: 3, name: a.title, item: url },
        ],
      },
    ],
  };
}

export function diaryDayMetadata(d: {
  level: 'beginner' | 'intermediate' | 'advanced';
  day: number;
  title: string;
  subtitle: string;
}): Metadata {
  const url = `${BASE}/diary/${d.level}/${d.day}`;
  const levelLabel = d.level === 'beginner' ? '入门' : d.level === 'intermediate' ? '进阶' : '高级';
  const description = `${d.subtitle}｜兔莉的韩语日记 Day ${d.day}｜${levelLabel}级场景化韩语跟读`;
  const image = `${BASE}/tori-og-v2.webp`;
  return {
    title: `Day ${d.day} · ${d.title}｜韩语日记`,
    description,
    alternates: { canonical: `/diary/${d.level}/${d.day}` },
    openGraph: {
      type: 'article',
      title: `Day ${d.day} · ${d.title}`,
      description,
      url,
      locale: 'zh_CN',
      siteName: '兔莉的韩语日记',
      images: [{ url: image, width: 1200, height: 630, alt: `Day ${d.day} · ${d.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title: `Day ${d.day} · ${d.title}`,
      description,
      images: [image],
    },
  };
}

function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

const LEVEL_LABEL_CN: Record<'beginner' | 'intermediate' | 'advanced', string> = {
  beginner: '初级',
  intermediate: '中级',
  advanced: '高级',
};

export function grammarLibraryMetadata(gp: {
  id: string;
  title: string;
  pattern: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topik: string;
  category: string;
  usage: string;
  explanation: string;
}): Metadata {
  const url = `${BASE}/grammar/library/${gp.id}`;
  const image = `${BASE}/tori-og-v2.webp`;
  const levelLabel = LEVEL_LABEL_CN[gp.level];
  const title = `${gp.pattern} · ${gp.title}｜韩语${levelLabel}语法`;
  const description = stripHtml(`${gp.usage}｜${gp.explanation}`).slice(0, 150);
  return {
    title,
    description,
    alternates: { canonical: `/grammar/library/${gp.id}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      locale: 'zh_CN',
      siteName: '兔莉的韩语日记',
      images: [{ url: image, width: 1200, height: 630, alt: `${gp.pattern} · ${gp.title}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function grammarLibraryJsonLd(gp: {
  id: string;
  title: string;
  pattern: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  topik: string;
  category: string;
  usage: string;
  explanation: string;
}) {
  const url = `${BASE}/grammar/library/${gp.id}`;
  const levelLabel = LEVEL_LABEL_CN[gp.level];
  const description = stripHtml(`${gp.usage}｜${gp.explanation}`).slice(0, 240);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: `${gp.pattern} · ${gp.title}`,
        alternateName: gp.pattern,
        description,
        url,
        inLanguage: 'zh-CN',
        learningResourceType: 'Reference',
        educationalLevel: `${levelLabel}｜${gp.topik}`,
        teaches: gp.title,
        about: gp.category,
        isPartOf: { '@id': `${BASE}/#website` },
        publisher: { '@id': `${BASE}/#org` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: BASE },
          { '@type': 'ListItem', position: 2, name: '韩语语法', item: `${BASE}/grammar` },
          { '@type': 'ListItem', position: 3, name: '语法库', item: `${BASE}/grammar?tab=library` },
          { '@type': 'ListItem', position: 4, name: `${gp.pattern} · ${gp.title}`, item: url },
        ],
      },
    ],
  };
}

export function diaryDayJsonLd(d: {
  level: 'beginner' | 'intermediate' | 'advanced';
  day: number;
  title: string;
  subtitle: string;
  estimatedMin: number;
}) {
  const url = `${BASE}/diary/${d.level}/${d.day}`;
  const levelLabel = d.level === 'beginner' ? '入门' : d.level === 'intermediate' ? '进阶' : '高级';
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: `Day ${d.day} · ${d.title}`,
        alternateName: d.subtitle,
        url,
        inLanguage: 'ko',
        learningResourceType: 'Course',
        educationalLevel: levelLabel,
        timeRequired: `PT${d.estimatedMin}M`,
        isPartOf: { '@id': `${BASE}/#website` },
        publisher: { '@id': `${BASE}/#org` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: BASE },
          { '@type': 'ListItem', position: 2, name: '韩语日记', item: `${BASE}/diary` },
          { '@type': 'ListItem', position: 3, name: `Day ${d.day}`, item: url },
        ],
      },
    ],
  };
}

// ═════════════ 词汇 SEO ═════════════

const TOPIK_LEVEL_LABEL: Record<number, string> = {
  1: 'TOPIK 1级 · 入门',
  2: 'TOPIK 2级 · 基础',
  3: 'TOPIK 3级 · 进阶',
  4: 'TOPIK 4级 · 中级',
  5: 'TOPIK 5级 · 高级',
  6: 'TOPIK 6级 · 精通',
};

export function vocabularyThemeMetadata(theme: {
  id: string;
  name: string;
  category: string;
  description?: string;
  wordIds: string[];
  dialogues?: unknown[];
  pitfalls?: unknown[];
  sentences: unknown[];
}): Metadata {
  const url = `${BASE}/vocabulary/themes/${theme.id}`;
  const image = `${BASE}/tori-og-v2.webp`;
  const dCount = theme.dialogues?.length ?? 0;
  const pCount = theme.pitfalls?.length ?? 0;
  const sCount = theme.sentences.length;
  const title = `${theme.name} · 韩语主题词包｜${theme.wordIds.length}词${dCount > 0 ? `+${dCount}对话` : ''}${pCount > 0 ? `+${pCount}雷区` : ''}`;
  const description = stripHtml(
    `${theme.description ?? theme.name}｜${theme.wordIds.length}个高频韩语词汇${dCount > 0 ? `、${dCount}段实景对话` : ''}${pCount > 0 ? `、${pCount}个使用雷区` : ''}${sCount > 0 ? `、${sCount}个场景句型` : ''}。零基础学韩语场景表达。`
  ).slice(0, 150);
  return {
    title,
    description,
    alternates: { canonical: `/vocabulary/themes/${theme.id}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      locale: 'zh_CN',
      siteName: '兔莉的韩语日记',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function vocabularyThemeJsonLd(theme: {
  id: string;
  name: string;
  category: string;
  description?: string;
  wordIds: string[];
}) {
  const url = `${BASE}/vocabulary/themes/${theme.id}`;
  const description = stripHtml(theme.description ?? theme.name).slice(0, 240);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: `${theme.name} · 韩语主题词包`,
        description,
        url,
        inLanguage: 'zh-CN',
        learningResourceType: 'Vocabulary',
        teaches: theme.name,
        about: theme.category,
        educationalUse: 'Vocabulary Learning',
        isPartOf: { '@id': `${BASE}/#website` },
        publisher: { '@id': `${BASE}/#org` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: BASE },
          { '@type': 'ListItem', position: 2, name: '韩语词汇', item: `${BASE}/vocabulary` },
          { '@type': 'ListItem', position: 3, name: '主题词包', item: `${BASE}/vocabulary/library?tab=themes` },
          { '@type': 'ListItem', position: 4, name: theme.name, item: url },
        ],
      },
    ],
  };
}

export function vocabularyLevelMetadata(l: {
  level: number;
  totalCount: number;
}): Metadata {
  const url = `${BASE}/vocabulary/levels/${l.level}`;
  const image = `${BASE}/tori-og-v2.webp`;
  const levelLabel = TOPIK_LEVEL_LABEL[l.level] ?? `TOPIK ${l.level}级`;
  const title = `${levelLabel}词汇表｜${l.totalCount}词｜韩语等级考试必背`;
  const description = `${levelLabel}核心词汇 ${l.totalCount} 个，覆盖 TOPIK ${l.level <= 2 ? 'I' : 'II'} 考试高频词。含发音、词性、例句、场景标签，边学边练。`;
  return {
    title,
    description,
    alternates: { canonical: `/vocabulary/levels/${l.level}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      locale: 'zh_CN',
      siteName: '兔莉的韩语日记',
      images: [{ url: image, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function vocabularyLevelJsonLd(l: {
  level: number;
  totalCount: number;
}) {
  const url = `${BASE}/vocabulary/levels/${l.level}`;
  const levelLabel = TOPIK_LEVEL_LABEL[l.level] ?? `TOPIK ${l.level}级`;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: `${levelLabel}词汇表`,
        description: `${levelLabel}核心词汇 ${l.totalCount} 个，覆盖 TOPIK ${l.level <= 2 ? 'I' : 'II'} 考试高频词。`,
        url,
        inLanguage: 'zh-CN',
        learningResourceType: 'Vocabulary',
        educationalLevel: levelLabel,
        educationalUse: 'Vocabulary Learning',
        isPartOf: { '@id': `${BASE}/#website` },
        publisher: { '@id': `${BASE}/#org` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: BASE },
          { '@type': 'ListItem', position: 2, name: '韩语词汇', item: `${BASE}/vocabulary` },
          { '@type': 'ListItem', position: 3, name: 'TOPIK 词表', item: `${BASE}/vocabulary/library?tab=levels` },
          { '@type': 'ListItem', position: 4, name: levelLabel, item: url },
        ],
      },
    ],
  };
}

// ═════════════ 工具页 SEO ═════════════

export function toolMetadata(t: {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  keywords?: string[];
  nameEn?: string;
  taglineEn?: string;
  descriptionEn?: string;
}, lang?: UiLang): Metadata {
  const isEn = lang === 'en';
  const url = `${BASE}/tools/${t.slug}`;
  const image = `${BASE}/tori-og-v2.webp`;
  const title = isEn && t.nameEn && t.taglineEn
    ? `${t.nameEn} — ${t.taglineEn} | Free Online Tool`
    : `${t.name}｜${t.tagline}｜免费在线工具`;
  const description = stripHtml(isEn && t.descriptionEn ? t.descriptionEn : t.description).slice(0, 150);
  return {
    title,
    description,
    keywords: isEn ? (t.keywords?.filter(k => /[a-zA-Z]/.test(k.charAt(0))) ?? t.keywords) : t.keywords,
    alternates: { canonical: `/tools/${t.slug}` },
    openGraph: {
      type: 'website',
      title,
      description,
      url,
      locale: isEn ? 'en_US' : 'zh_CN',
      siteName: SITE_NAME[isEn ? 'en' : 'zh'],
      images: [{ url: image, width: 1200, height: 630, alt: isEn && t.nameEn ? t.nameEn : t.name }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function toolJsonLd(t: {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  nameEn?: string;
  descriptionEn?: string;
}, lang?: UiLang) {
  const url = `${BASE}/tools/${t.slug}`;
  const isEn = lang === 'en';
  const name = isEn && t.nameEn ? t.nameEn : t.name;
  const desc = (isEn && t.descriptionEn ? t.descriptionEn : t.description);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'SoftwareApplication',
        name,
        description: stripHtml(desc).slice(0, 240),
        url,
        applicationCategory: 'EducationalApplication',
        operatingSystem: 'Web',
        inLanguage: isEn ? 'en-US' : 'zh-CN',
        isAccessibleForFree: true,
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: isEn ? 'USD' : 'CNY',
        },
        publisher: { '@id': `${BASE}/#org` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: isEn ? 'Home' : '首页', item: BASE },
          { '@type': 'ListItem', position: 2, name: isEn ? 'Free Korean Tools' : '免费韩语工具', item: `${BASE}/tools` },
          { '@type': 'ListItem', position: 3, name, item: url },
        ],
      },
    ],
  };
}

// ═════════════ 练习 Hub JSON-LD（listening/writing/dictation/typing/review） ═════════════

export function practiceHubJsonLd(h: {
  slug: string;
  name: string;
  description: string;
  crumbLabel?: string;
}) {
  const url = `${BASE}/${h.slug}`;
  const crumb = h.crumbLabel ?? h.name;
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: h.name,
        description: stripHtml(h.description).slice(0, 240),
        url,
        inLanguage: 'zh-CN',
        learningResourceType: 'Interactive Resource',
        educationalUse: 'Practice',
        isAccessibleForFree: true,
        isPartOf: { '@id': `${BASE}/#website` },
        publisher: { '@id': `${BASE}/#org` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: BASE },
          { '@type': 'ListItem', position: 2, name: crumb, item: url },
        ],
      },
    ],
  };
}

// ═════════════ TOPIK 题型 SEO ═════════════

const TOPIK_SECTION_LABEL = { listening: '听力', reading: '阅读' } as const;
const TOPIK_LEVEL_BAND: Record<'beginner' | 'intermediate' | 'advanced', 'I' | 'II'> = {
  beginner: 'I',
  intermediate: 'II',
  advanced: 'II',
};

export function topikTypeMetadata(t: {
  key: string;
  labelZh: string;
  labelKo: string;
  section: 'listening' | 'reading';
  level: 'beginner' | 'intermediate' | 'advanced';
  officialNo: string;
  desc: string;
  tip: string;
}): Metadata {
  const url = `${BASE}/topik/type/${t.key}`;
  const image = `${BASE}/tori-og-v2.webp`;
  const band = TOPIK_LEVEL_BAND[t.level];
  const sec = TOPIK_SECTION_LABEL[t.section];
  const title = `${t.labelZh}｜TOPIK ${band} · ${sec} · ${t.officialNo}｜韩语等级考试题型讲解`;
  const description = stripHtml(`${t.desc}｜解题技巧：${t.tip}`).slice(0, 150);
  return {
    title,
    description,
    alternates: { canonical: `/topik/type/${t.key}` },
    openGraph: {
      type: 'article',
      title,
      description,
      url,
      locale: 'zh_CN',
      siteName: '兔莉的韩语日记',
      images: [{ url: image, width: 1200, height: 630, alt: `${t.labelZh} · TOPIK ${band} ${sec}` }],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [image],
    },
  };
}

export function topikTypeJsonLd(t: {
  key: string;
  labelZh: string;
  labelKo: string;
  section: 'listening' | 'reading';
  level: 'beginner' | 'intermediate' | 'advanced';
  officialNo: string;
  desc: string;
  tip: string;
}) {
  const url = `${BASE}/topik/type/${t.key}`;
  const band = TOPIK_LEVEL_BAND[t.level];
  const sec = TOPIK_SECTION_LABEL[t.section];
  const description = stripHtml(`${t.desc}｜${t.tip}`).slice(0, 240);
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'LearningResource',
        name: `${t.labelZh}｜TOPIK ${band} ${sec}`,
        alternateName: t.labelKo,
        description,
        url,
        inLanguage: 'zh-CN',
        learningResourceType: 'Reference',
        educationalLevel: `TOPIK ${band}｜${sec}`,
        teaches: t.labelZh,
        about: 'TOPIK 韩语能力考试',
        isPartOf: { '@id': `${BASE}/#website` },
        publisher: { '@id': `${BASE}/#org` },
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: '首页', item: BASE },
          { '@type': 'ListItem', position: 2, name: 'TOPIK 韩语考试', item: `${BASE}/topik` },
          { '@type': 'ListItem', position: 3, name: `TOPIK ${band} ${sec}`, item: `${BASE}/topik` },
          { '@type': 'ListItem', position: 4, name: t.labelZh, item: url },
        ],
      },
    ],
  };
}

// ═════════════ 多语言 hreflang（海外版核心） ═════════════
// 只有「UI 框架页」（界面文案 en.ts 全量就绪）才挂 en hreflang。
// 内容详情页正文仍是中文，不能声明 en，否则误导 Google=英文内容 反被降权。

export type UiLang = 'zh' | 'en';

/** 将静态 Metadata 的 locale/siteName 跟随 lang 切换。title/description 不变（内容页正文仍为中文）。 */
export function bilingualOg(meta: Metadata, lang: UiLang): Metadata {
  const isEn = lang === 'en';
  return {
    ...meta,
    openGraph: meta.openGraph ? {
      ...(meta.openGraph as Record<string, unknown>),
      locale: isEn ? 'en_US' : 'zh_CN',
      siteName: SITE_NAME[lang],
    } : void 0,
  } as Metadata;
}

/**
 * 给一条裸路径生成 hreflang alternates。
 * @param path 裸路径，如 '/grammar'（'' = 首页）
 * @param bilingual 该页是否有英文 UI（框架页 true，内容详情页 false）
 */
export function hreflangFor(path: string, bilingual: boolean, lang?: UiLang): NonNullable<Metadata['alternates']> {
  const clean = path === '/' ? '' : path.replace(/\/$/, '');
  const zhUrl = `${SITE_URL}${clean || '/'}`;
  if (!bilingual) {
    // 单语页：canonical 指自己，不声明 en
    return { canonical: clean || '/' };
  }
  const enUrl = `${SITE_URL}/en${clean}`;
  const languages: Record<string, string> = {
    'zh-CN': zhUrl,
    en: enUrl,
    'x-default': zhUrl,
  };
  // 跨域名互指：对侧站点存在时，把对侧同路径也声明进去（Google 据此关联地区版本）
  if (ALT_SITE_URL) {
    languages['zh-Hans'] = `${ALT_SITE_URL}${clean || '/'}`;
  }
  // canonical 跟当前语言走：英文页自指 /en/xxx，中文页指裸路径
  const canonical = lang === 'en' ? (clean ? `/en${clean}` : '/en') : (clean || '/');
  return { canonical, languages };
}

// ═════════════ 全站框架页双语文案（首页 + 各 hub） ═════════════
// 英文用真实搜索词，非中文直译。key = 裸路径。

interface PageCopy {
  title: { zh: string; en: string };
  description: { zh: string; en: string };
}

export const SITE_NAME = { zh: '兔莉的韩语日记', en: "Tori's Korean Diary" };

export const HOME_COPY: PageCopy = {
  title: {
    zh: '兔莉的韩语日记 · 在线学韩语｜40音·语法·TOPIK·日记',
    en: "Learn Korean Online Free — Hangul, Grammar, TOPIK Prep | Tori's Korean Diary",
  },
  description: {
    zh: '系统学韩语：40音发音、语法课程、TOPIK 备考、每日韩语日记跟读、韩语阅读、听力训练。零基础到进阶一站式学习。',
    en: 'Learn Korean from zero: Hangul alphabet, grammar lessons, TOPIK practice tests, daily reading & listening, shadowing diaries. A complete free Korean learning app.',
  },
};

export const HOME_KEYWORDS_EN = [
  'learn Korean online', 'learn Korean free', 'Korean for beginners',
  'Hangul alphabet', 'learn Hangul', 'Korean grammar lessons',
  'TOPIK practice test', 'TOPIK prep', 'Korean vocabulary',
  'Korean reading practice', 'Korean listening practice', 'study Korean',
];

// 各 hub 框架页的双语标题/描述。key = 裸路径。未列入的页面不挂 en。
export const HUB_COPY: Record<string, PageCopy> = {
  '/phonetics': {
    title: { zh: '韩语40音发音表', en: 'Korean Alphabet (Hangul) — Learn All 40 Letters with Audio' },
    description: {
      zh: '韩语40音发音表，真人录音，元音辅音收音一次学会。',
      en: 'Master the Korean alphabet (Hangul): all 40 vowels and consonants with native audio, stroke order, and pronunciation practice.',
    },
  },
  '/grammar': {
    title: { zh: '韩语语法课程', en: 'Korean Grammar Lessons — From Beginner to Advanced' },
    description: {
      zh: '系统韩语语法课程，从入门到高级，例句+练习+易错点。',
      en: 'Learn Korean grammar step by step: 200+ grammar points with examples, exercises, and common mistakes, from beginner to TOPIK advanced.',
    },
  },
  '/topik': {
    title: { zh: 'TOPIK 韩语能力考试备考', en: 'TOPIK Practice Tests — Free Korean Proficiency Exam Prep' },
    description: {
      zh: 'TOPIK I / II 听力阅读题型讲解与模拟练习，附解题技巧。',
      en: 'Free TOPIK practice tests for TOPIK I & II: listening and reading questions with explanations and test-taking strategies.',
    },
  },
  '/reading': {
    title: { zh: '韩语分级阅读', en: 'Korean Reading Practice — Graded Articles by Level' },
    description: {
      zh: '按等级划分的韩语阅读文章，点词查词、跟读、测验一体。',
      en: 'Graded Korean reading practice: leveled articles with tap-to-translate, shadowing audio, and comprehension quizzes.',
    },
  },
  '/vocabulary': {
    title: { zh: '韩语单词主题词包', en: 'Korean Vocabulary — Themed Word Lists & TOPIK Words' },
    description: {
      zh: '主题词包 + TOPIK 分级词表，含发音、例句、场景对话。',
      en: 'Learn Korean vocabulary by theme and TOPIK level: pronunciation, example sentences, and real-life dialogues.',
    },
  },
  '/diary': {
    title: { zh: '兔莉的韩语日记 · 每日跟读', en: "Tori's Korean Diary — Daily Story-Based Korean Practice" },
    description: {
      zh: '跟着兔莉的留学故事，每天一篇场景化韩语日记跟读。',
      en: 'Learn Korean through a daily story: follow Tori\'s study-abroad diary with scene-based shadowing, grammar, and vocabulary.',
    },
  },
  '/listening': {
    title: { zh: '韩语听力训练', en: 'Korean Listening Practice — Train Your Ear' },
    description: {
      zh: '分级韩语听力训练，边听边学。',
      en: 'Improve your Korean listening with graded audio exercises and interactive transcripts.',
    },
  },
  '/speaking': {
    title: { zh: '韩语口语练习', en: 'Korean Speaking Practice — Shadowing & AI Conversation' },
    description: {
      zh: '韩语口语跟读与 AI 对话练习。',
      en: 'Practice speaking Korean with shadowing exercises and AI-powered conversation partners.',
    },
  },
  '/tools': {
    title: { zh: '免费韩语工具箱', en: 'Free Korean Tools — Romanizer, Keyboard, Name Generator' },
    description: {
      zh: '韩语罗马音转换、韩文键盘、韩语名字生成等免费工具。',
      en: 'Free Korean tools: Romanization converter, online Korean keyboard, and Korean name generator.',
    },
  },
  '/typing': {
    title: { zh: '韩语打字练习', en: 'Korean Typing Practice — Master Hangul Keyboard' },
    description: {
      zh: '在线韩语打字练习，熟悉韩文键盘布局，提升打字速度。',
      en: 'Practice Korean typing online: learn the Hangul keyboard layout and improve your typing speed.',
    },
  },
  '/dictation': {
    title: { zh: '韩语听写练习', en: 'Korean Dictation Practice — Train Your Ear & Spelling' },
    description: {
      zh: '韩语听写训练，边听边写，提升听力和拼写能力。',
      en: 'Korean dictation exercises: listen and type to improve your listening and Hangul spelling.',
    },
  },
  '/writing': {
    title: { zh: '韩语写作练习', en: 'Korean Writing Practice — Compose with Confidence' },
    description: {
      zh: '在线韩语写作练习，AI 批改，提升书面表达。',
      en: 'Practice Korean writing online with AI feedback to improve your written expression.',
    },
  },
  '/review': {
    title: { zh: '韩语复习中心', en: 'Korean Review Center — Spaced Repetition Pract