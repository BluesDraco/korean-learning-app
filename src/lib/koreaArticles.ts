import fs from 'fs';
import path from 'path';

export interface ArticleMeta {
  slug: string;
  category: 'culture' | 'food' | 'travel';
  folder: '문화' | '여행' | '음식';
  filename: string;
  title: string;
  subtitle: string;
  tag: string;
  readTime: string;
  color: string; // primary accent color
  bannerImage: string; // e.g. '/images/banners/convenience-store.webp'
}

export const ARTICLES: ArticleMeta[] = [
  // ── 文化 (5) ──
  {
    slug: 'convenience-store', category: 'culture', folder: '문화',
    filename: '文化模块_01_韩国便利店完全指南.html',
    title: '韩国便利店完全指南', subtitle: '편의점 — 不只是一家店，是韩国人的生活方式',
    tag: '🇰🇷 韩国文化 · 生活方式', readTime: '约10分钟读完', color: '#FF8FAB',
    bannerImage: '/images/banners/convenience-store.webp',
  },
  {
    slug: 'seoul-cafe', category: 'culture', folder: '문화',
    filename: '文化模块_02_首尔咖啡文化.html',
    title: '首尔咖啡文化', subtitle: '커피 문화 — 人均每天2.3杯的咖啡之国',
    tag: '🇰🇷 韩国文化 · 生活方式', readTime: '约10分钟读完', color: '#C9B8E8',
    bannerImage: '/images/banners/seoul-cafe.webp',
  },
  {
    slug: 'greeting-culture', category: 'culture', folder: '문화',
    filename: '文化模块_03_韩国人的打招呼文化.html',
    title: '韩国人的打招呼文化', subtitle: '인사 문화 — 一个"안녕하세요"背后藏着多少学问',
    tag: '🇰🇷 韩国文化 · 礼仪', readTime: '约10分钟读完', color: '#A8D8D0',
    bannerImage: '/images/banners/greeting-culture.webp',
  },
  {
    slug: 'korean-holidays', category: 'culture', folder: '문화',
    filename: '文化模块_04_韩国节日完全手册.html',
    title: '韩国节日完全手册', subtitle: '명절과 기념일 — 从春节到Pepero Day，一年都在过节',
    tag: '🇰🇷 韩国文化 · 节日', readTime: '约10分钟读完', color: '#FF8FAB',
    bannerImage: '/images/banners/korean-holidays.webp',
  },
  {
    slug: 'kdrama-culture', category: 'culture', folder: '문화',
    filename: '文化模块_05_韩剧里的文化密码.html',
    title: '韩剧里的文化密码', subtitle: '드라마 속 문화 — 看懂这些细节，才算真正看懂韩剧',
    tag: '🇰🇷 韩国文化 · 韩剧', readTime: '约10分钟读完', color: '#C9B8E8',
    bannerImage: '/images/banners/kdrama-culture.webp',
  },

  // ── 美食 (5) ──
  {
    slug: 'kbbq-guide', category: 'food', folder: '음식',
    filename: '美食模块_01_韩国烤肉完全指南.html',
    title: '韩国烤肉完全指南', subtitle: '고기 — 从点单到吃法，一篇搞懂',
    tag: '🇰🇷 韩国美食 · 烤肉', readTime: '约10分钟读完', color: '#FF8FAB',
    bannerImage: '/images/banners/kbbq-guide.webp',
  },
  {
    slug: 'street-food', category: 'food', folder: '음식',
    filename: '美食模块_02_街头小吃地图.html',
    title: '街头小吃地图', subtitle: '길거리 음식 — 明洞、南大门、广藏市场，边走边吃',
    tag: '🇰🇷 韩国美食 · 小吃', readTime: '约10分钟读完', color: '#FFE4A0',
    bannerImage: '/images/banners/street-food.webp',
  },
  {
    slug: 'korean-soup', category: 'food', folder: '음식',
    filename: '美食模块_03_韩国人为什么这么爱喝汤.html',
    title: '韩国人为什么这么爱喝汤', subtitle: '국과 찌개 — 一碗汤的哲学',
    tag: '🇰🇷 韩国美食 · 汤文化', readTime: '约10分钟读完', color: '#A8D8D0',
    bannerImage: '/images/banners/korean-soup.webp',
  },
  {
    slug: 'kdrama-ordering', category: 'food', folder: '음식',
    filename: '美食模块_04_跟着韩剧学点餐.html',
    title: '跟着韩剧学点餐', subtitle: '드라마 속 주문 — 韩剧里出镜率最高的那些食物',
    tag: '🇰🇷 韩国美食 · 点餐', readTime: '约10分钟读完', color: '#FF8FAB',
    bannerImage: '/images/banners/kdrama-ordering.webp',
  },
  {
    slug: 'korean-spicy', category: 'food', folder: '음식',
    filename: '美食模块_05_韩国辣文化.html',
    title: '韩国辣文化', subtitle: '매운맛 — 韩国人对辣的执着',
    tag: '🇰🇷 韩国美食 · 辣', readTime: '约10分钟读完', color: '#FF6B6B',
    bannerImage: '/images/banners/korean-spicy.webp',
  },

  // ── 旅行 (5) ──
  {
    slug: 'seoul-districts', category: 'travel', folder: '여행',
    filename: '旅行模块_01_首尔街区性格图鉴.html',
    title: '首尔街区性格图鉴', subtitle: '서울 동네 — 每个区都有它的灵魂',
    tag: '🇰🇷 韩国旅行 · 首尔', readTime: '约10分钟读完', color: '#A8D8D0',
    bannerImage: '/images/banners/seoul-districts.webp',
  },
  {
    slug: 'seoul-subway', category: 'travel', folder: '여행',
    filename: '旅行模块_02_首尔地铁完全攻略.html',
    title: '首尔地铁完全攻略', subtitle: '지하철 — 世界上最复杂的地铁系统之一',
    tag: '🇰🇷 韩国旅行 · 交通', readTime: '约10分钟读完', color: '#C9B8E8',
    bannerImage: '/images/banners/seoul-subway.webp',
  },
  {
    slug: 'korea-taboos', category: 'travel', folder: '여행',
    filename: '旅行模块_03_去韩国之前必须知道的文化禁忌.html',
    title: '去韩国之前必须知道的文化禁忌', subtitle: '금기사항 — 这些事千万不能做',
    tag: '🇰🇷 韩国旅行 · 禁忌', readTime: '约10分钟读完', color: '#FF8FAB',
    bannerImage: '/images/banners/korea-taboos.webp',
  },
  {
    slug: 'seoul-25-places', category: 'travel', folder: '여행',
    filename: '旅行模块_04_首尔必去25个地方.html',
    title: '首尔必去25个地方', subtitle: '서울 명소 — 本地人推荐的清单',
    tag: '🇰🇷 韩国旅行 · 景点', readTime: '约10分钟读完', color: '#FFE4A0',
    bannerImage: '/images/banners/seoul-25-places.webp',
  },
  {
    slug: 'korea-shopping', category: 'travel', folder: '여행',
    filename: '旅行模块_05_韩国购物完全指南.html',
    title: '韩国购物完全指南', subtitle: '쇼핑 — 明洞、弘大、江南、免税店全攻略',
    tag: '🇰🇷 韩国旅行 · 购物', readTime: '约10分钟读完', color: '#FF8FAB',
    bannerImage: '/images/banners/korea-shopping.webp',
  },
];

const ARTICLES_DIR = path.join(process.cwd(), 'src/data/korea-articles');

export function getArticleHtml(slug: string): string | null {
  const article = ARTICLES.find((a) => a.slug === slug);
  if (!article) return null;

  const filePath = path.join(ARTICLES_DIR, article.folder, article.filename);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, 'utf-8');

  // Extract <style>...</style>
  const styleMatch = raw.match(/<style>([\s\S]*?)<\/style>/);
  let styles = styleMatch ? styleMatch[1] : '';

  // Strip global selectors
  styles = styles.replace(/^\s*\*\s*\{[^}]*\}\s*/gm, '');
  styles = styles.replace(/body\s*\{[^}]*\}/g, '.korea-article-body {}');

  // Strip ALL font-size and line-height to prevent tiny text
  styles = styles.replace(/font-size\s*:\s*[^;!]+[!;]/gi, '');
  styles = styles.replace(/line-height\s*:\s*[^;!]+[!;]/gi, '');

  // Scope remaining CSS (colors, padding, borders, etc.)
  styles = `.korea-article { ${styles} }`;

  // Extract <body> content, stripping the CF challenge script
  const bodyMatch = raw.match(/<body>([\s\S]*?)<\/body>/);
  let body = bodyMatch ? bodyMatch[1] : raw;
  body = body.replace(/<script>\(function[\s\S]*?<\/script>/g, '');

  // Replace next-btn hrefs: match "下一篇：XXX →" to article slugs
  const titleToSlug = new Map(ARTICLES.map((a) => [a.title, a.slug]));
  const titleToCategory = new Map(ARTICLES.map((a) => [a.title, a.category]));
  body = body.replace(/<a class="next-btn" href="#">下一篇：([^→]+) →<\/a>/g, (_, title: string) => {
    const t = title.trim();
    const s = titleToSlug.get(t);
    const c = titleToCategory.get(t);
    if (s && c) {
      return `<a class="next-btn" href="/korea/${c}/${s}">下一篇：${t} →</a>`;
    }
    return `<a class="next-btn" href="/korea">探索更多韩国文化内容 →</a>`;
  });

  // Replace next-tag divs: match article titles and turn into links
  body = body.replace(/<div class="next-tag">([^<]+)<\/div>/g, (_: string, text: string) => {
    // text may have emoji prefix like "🍜 韩国街头小吃地图"
    const cleaned = text.replace(/^[\p{Emoji}\s]+/u, '').trim();
    const s = titleToSlug.get(cleaned);
    const c = titleToCategory.get(cleaned);
    if (s && c) {
      return `<a class="next-tag" href="/korea/${c}/${s}">${text}</a>`;
    }
    return `<span class="next-tag">${text}</span>`;
  });

  // Lazy-load all images (except hero banner which is above the fold)
  body = body.replace(/<img /g, '<img loading="lazy" ');

  // Inject banner image into hero section (intentionally NOT lazy-loaded)
  if (article.bannerImage) {
    body = body.replace(
      /(<div class="hero"[^>]*>)/,
      `$1<img src="${article.bannerImage}" alt="${article.title}" class="hero-banner" />`
    );
  }

  // Add sound icon to phrase items that don't have one
  body = body.replace(
    /(<div class="phrase-ko">[^<]*<\/div>)/g,
    '$1<span class="phrase-speak" title="听发音">🔊</span>'
  );

  const overrides = `
    .korea-article-body {
      font-size: 18px;
      line-height: 2;
    }
    .korea-article-body .container {
      max-width: 100% !important;
      padding: 28px 0 64px;
    }

    .korea-article-body .hero { padding: 72px 40px 64px; position: relative; overflow: hidden; }
    .korea-article-body .hero .hero-banner { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; }
    .korea-article-body .hero::before { content: ''; position: absolute; inset: 0; z-index: 0; background: linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.55) 100%); pointer-events: none; }
    .korea-article-body .hero > *:not(.hero-banner) { position: relative; z-index: 1; }
    .korea-article-body .hero h1 { font-size: 38px; line-height: 1.35; color: #fff; text-shadow: 0 2px 12px rgba(0,0,0,.4); }
    .korea-article-body .hero h1 span { font-size: 18px; color: rgba(255,255,255,.85); }
    .korea-article-body .hero-tag { font-size: 14px; padding: 6px 20px; color: #fff; background: rgba(255,255,255,.15); backdrop-filter: blur(4px); border-radius: 20px; }
    .korea-article-body .hero-meta { color: rgba(255,255,255,.75); }

    .korea-article-body .breadcrumb { font-size: 15px; }
    .korea-article-body .intro-card { padding: 32px 32px; }
    .korea-article-body .tori-bubble { font-size: 18px; line-height: 2; }
    .korea-article-body .tori-name { font-size: 14px; }
    .korea-article-body .hero-meta { font-size: 16px; }

    .korea-article-body .section-title { font-size: 26px; margin: 56px 0 30px; }
    .korea-article-body .section-title .st-icon { width: 46px; height: 46px; font-size: 23px; }
    .korea-article-body .section-title .st-sub { font-size: 16px; }

    /* Make ALL text content at least 16px */
    .korea-article-body p,
    .korea-article-body li,
    .korea-article-body .brand-desc,
    .korea-article-body .must-desc,
    .korea-article-body .must-tip,
    .korea-article-body .brand-must,
    .korea-article-body .step-desc-text,
    .korea-article-body .step-title-text,
    .korea-article-body .korean-phrase,
    .korea-article-body .time-desc,
    .korea-article-body .time-title,
    .korea-article-body .tc-a,
    .korea-article-body .tc-q,
    .korea-article-body .highlight,
    .korea-article-body .notice-box,
    .korea-article-body .culture-card p,
    .korea-article-body .scene-card p,
    .korea-article-body .ending-sub,
    .korea-article-body .level-desc,
    .korea-article-body .next-tag,
    .korea-article-body .next-btn,
    .korea-article-body .compare-table th,
    .korea-article-body .compare-table td,
    .korea-article-body .brand-name-zh,
    .korea-article-body .phrase-ro,
    .korea-article-body .phrase-scene,
    .korea-article-body .ks-sub,
    .korea-article-body .tc-tag,
    .korea-article-body .time-label,
    .korea-article-body .vocab-chip {
      font-size: 16px;
      line-height: 1.95;
    }

    .korea-article-body .tori-bubble p,
    .korea-article-body .intro-card p { font-size: 18px; }

    .korea-article-body .culture-card,
    .korea-article-body .scene-card { padding: 28px 30px; font-size: 18px; }
    .korea-article-body .culture-card h3,
    .korea-article-body .scene-card h3 { font-size: 19px; }

    .korea-article-body .phrase-ko { font-size: 20px; font-weight: 700; }
    .korea-article-body .phrase-zh { font-size: 16px; }

    .korea-article-body .brand-name-ko { font-size: 21px; }
    .korea-article-body .must-name-ko { font-size: 18px; }
    .korea-article-body .must-name-zh { font-size: 15px; }
    .korea-article-body .ks-title { font-size: 19px; }

    .korea-article-body .ending-title { font-size: 21px; }

    .korea-article-body .brand-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); gap: 18px; }
    .korea-article-body .brand-card { padding: 26px 22px; }
    .korea-article-body .brand-emoji { font-size: 44px; }
    .korea-article-body .brand-tag { font-size: 13px; }

    .korea-article-body .must-buy-grid { gap: 18px; }
    .korea-article-body .must-card { padding: 24px; }
    .korea-article-body .must-icon { font-size: 38px; }

    .korea-article-body .highlight { padding: 18px 22px; }
    .korea-article-body .notice-box { padding: 22px 24px; }

    .korea-article-body .food-steps { padding: 28px 30px; }
    .korea-article-body .food-steps h3 { font-size: 18px; }

    .korea-article-body .time-grid { gap: 16px; }
    .korea-article-body .time-card { padding: 22px 18px; }
    .korea-article-body .time-emoji { font-size: 34px; }

    .korea-article-body .korean-section { padding: 38px 32px; }
    .korea-article-body .trivia-grid { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); gap: 18px; }
    .korea-article-body .trivia-card { padding: 22px 24px; }

    .korea-article-body .compare-table th,
    .korea-article-body .compare-table td { padding: 15px 20px; }

    .korea-article-body .vocab-chip { padding: 8px 20px; }
    .korea-article-body .vocab-row { gap: 10px; }

    .korea-article-body .ending-card { padding: 38px 32px; }
    .korea-article-body .ending-tori { font-size: 58px; }
    .korea-article-body .next-btn { padding: 13px 34px; }

    .korea-article-body .level-card { padding: 24px 28px; }

    .korea-article-body .bow-grid { grid-template-columns: repeat(auto-fill, minmax(220px, 1fr)); }
    .korea-article-body .vs-grid { grid-template-columns: repeat(auto-fill, minmax(320px, 1fr)); }

    .korea-article-body .divider { font-size: 24px; margin: 40px 0; }

    /* Interactive: phrase speak button */
    .korea-article-body .phrase-speak {
      display: inline-flex; align-items: center; justify-content: center;
      width: 32px; height: 32px; border-radius: 50%;
      background: rgba(255,143,171,.12); cursor: pointer;
      font-size: 16px; margin-left: 10px; vertical-align: middle;
      transition: all .15s; user-select: none; flex-shrink: 0;
    }
    .korea-article-body .phrase-speak:hover { background: rgba(255,143,171,.25); transform: scale(1.1); }
    .korea-article-body .phrase-speak.speaking { background: #FF8FAB; animation: pulse-speak .6s infinite; }
    @keyframes pulse-speak { 0%,100% { box-shadow: 0 0 0 0 rgba(255,143,171,.4); } 50% { box-shadow: 0 0 0 8px rgba(255,143,171,0); } }

    /* Interactive: add button states */
    .korea-article-body .add-btn {
      cursor: pointer; transition: all .15s;
    }
    .korea-article-body .add-btn:hover { transform: scale(1.15); }
    .korea-article-body .add-btn.saved {
      background: linear-gradient(135deg, #A8D8D0, #81C784) !important;
      box-shadow: 0 2px 8px rgba(168,216,208,.5) !important;
    }

    /* Toast */
    .korea-article-body .ka-toast {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: #333; color: #fff; font-size: 15px; padding: 12px 24px;
      border-radius: 24px; z-index: 9999; opacity: 0; transition: opacity .3s;
      pointer-events: none; box-shadow: 0 4px 20px rgba(0,0,0,.3);
      font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
    }
    .korea-article-body .ka-toast.show { opacity: 1; }

    @media (max-width: 640px) {
      .korea-article-body { font-size: 17px; }
      .korea-article-body .hero { padding: 48px 20px 40px; position: relative; overflow: hidden; }
      .korea-article-body .hero .hero-banner { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; }
      .korea-article-body .hero::before { content: ''; position: absolute; inset: 0; z-index: 0; background: linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.55) 100%); pointer-events: none; }
      .korea-article-body .hero > *:not(.hero-banner) { position: relative; z-index: 1; }
      .korea-article-body .hero h1 { font-size: 28px; color: #fff; text-shadow: 0 2px 12px rgba(0,0,0,.4); }
      .korea-article-body .hero h1 span { font-size: 16px; color: rgba(255,255,255,.85); }
      .korea-article-body .hero-tag { color: #fff; background: rgba(255,255,255,.15); backdrop-filter: blur(4px); border-radius: 20px; }
      .korea-article-body .hero-meta { color: rgba(255,255,255,.75); }
      .korea-article-body .container { padding: 20px 0 40px; }
      .korea-article-body .section-title { font-size: 21px; }
      .korea-article-body p,
      .korea-article-body .brand-desc,
      .korea-article-body .must-desc,
      .korea-article-body .culture-card p,
      .korea-article-body .scene-card p { font-size: 15px; }
      .korea-article-body .culture-card,
      .korea-article-body .scene-card { padding: 20px 22px; }
    }
  `;

  return `<style>${styles} ${overrides}</style><div class="korea-article-body">${body}</div>`;
}

export function getArticleMeta(slug: string): ArticleMeta | null {
  return ARTICLES.find((a) => a.slug === slug) ?? null;
}

export function getArticlesByCategory(category: ArticleMeta['category']): ArticleMeta[] {
  return ARTICLES.filter((a) => a.category === category);
}
