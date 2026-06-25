import fs from 'fs';
import path from 'path';
import { ARTICLES, type ArticleMeta } from '@/data/articleMeta';

export type { ArticleMeta };

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

  // Strip global selectors only — keep ALL other CSS intact
  styles = styles.replace(/^\s*\*\s*\{[^}]*\}\s*/gm, '');
  styles = styles.replace(/body\s*\{[^}]*\}/g, '');

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
    /* ── Hero banner image overlay (app-injected) ── */
    .korea-article-body .hero { position: relative; overflow: hidden; }
    .korea-article-body .hero .hero-banner { position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover; z-index: -1; }
    .korea-article-body .hero::before { content: ''; position: absolute; inset: 0; z-index: 0; background: linear-gradient(180deg, rgba(0,0,0,.35) 0%, rgba(0,0,0,.55) 100%); pointer-events: none; }
    .korea-article-body .hero > *:not(.hero-banner) { position: relative; z-index: 1; }

    /* ── Container: prevent overflow ── */
    .korea-article-body .container { max-width: 100% !important; }

    /* ── Interactive: phrase speak button ── */
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

    /* ── Interactive: add button ── */
    .korea-article-body .add-btn { cursor: pointer; transition: all .15s; }
    .korea-article-body .add-btn:hover { transform: scale(1.15); }
    .korea-article-body .add-btn.saved {
      background: linear-gradient(135deg, #A8D8D0, #81C784) !important;
      box-shadow: 0 2px 8px rgba(168,216,208,.5) !important;
    }

    /* ── Toast ── */
    .korea-article-body .ka-toast {
      position: fixed; bottom: 24px; left: 50%; transform: translateX(-50%);
      background: #333; color: #fff; font-size: 15px; padding: 12px 24px;
      border-radius: 24px; z-index: 9999; opacity: 0; transition: opacity .3s;
      pointer-events: none; box-shadow: 0 4px 20px rgba(0,0,0,.3);
      font-family: -apple-system, "PingFang SC", "Microsoft YaHei", sans-serif;
    }
    .korea-article-body .ka-toast.show { opacity: 1; }

    /* ── Mobile: ensure minimum readable size ── */
    @media (max-width: 640px) {
      .korea-article-body { font-size: 17px; }
      .korea-article-body .hero { padding-left: 20px; padding-right: 20px; }
      .korea-article-body .hero h1 { font-size: 28px; color: #fff; text-shadow: 0 2px 12px rgba(0,0,0,.4); }
      .korea-article-body .hero h1 span { font-size: 16px; color: rgba(255,255,255,.85); }
      .korea-article-body .hero-tag { color: #fff; background: rgba(255,255,255,.25); border-radius: 20px; }
      .korea-article-body .hero-meta { color: rgba(255,255,255,.75); }
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
