// 韩娱热帖爬虫 — 抓取原文全文 (Naver News)
// 服务器执行: node scripts/crawl-hot-posts.mjs

import { writeFileSync } from 'fs';

const DATA_FILE = 'src/data/kpopHotPosts.ts';
const MAX_POSTS = 20;
const CONCURRENCY = 3;

// ── HTML 解码 ──────────────────────────────────────────────────
function decodeHTMLEntities(text) {
  return text
    .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&apos;/g, "'")
    .replace(/&nbsp;/g, ' ').replace(/&middot;/g, '·')
    .replace(/&#x([0-9a-fA-F]+);/g, (_, n) => String.fromCodePoint(parseInt(n, 16)))
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(parseInt(n)))
    .replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
}

// ── HTML → 纯文本 ──────────────────────────────────────────────
function htmlToText(html) {
  let text = html
    .replace(/<script[^>]*>[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[^>]*>[\s\S]*?<\/style>/gi, ' ')
    .replace(/<nav[^>]*>[\s\S]*?<\/nav>/gi, ' ')
    .replace(/<header[^>]*>[\s\S]*?<\/header>/gi, ' ')
    .replace(/<footer[^>]*>[\s\S]*?<\/footer>/gi, ' ')
    .replace(/<aside[^>]*>[\s\S]*?<\/aside>/gi, ' ')
    .replace(/<noscript[^>]*>[\s\S]*?<\/noscript>/gi, ' ');
  text = text.replace(/<br\s*\/?>/gi, '\n');
  text = text.replace(/<[^>]+>/g, ' ');
  text = decodeHTMLEntities(text);
  text = text.replace(/[\t\r]+/g, ' ');
  text = text.replace(/ {2,}/g, ' ');
  text = text.replace(/\n{3,}/g, '\n\n').trim();
  return text;
}

// ── 从 Naver 文章页提取正文 ─────────────────────────────────────
function extractArticleBody(html) {
  // 先找 <article> 标签
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) return htmlToText(articleMatch[1]);

  // 找 id="dic_body" 或 class 含 article_body / newsct_body
  const bodyPatterns = [
    /<div[^>]*id="dic_body"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*id="newsct_body"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class="[^"]*article_body[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*id="articleBody"[^>]*>([\s\S]*?)<\/div>/i,
    /<div[^>]*class="[^"]*news_body[^"]*"[^>]*>([\s\S]*?)<\/div>/i,
  ];
  for (const re of bodyPatterns) {
    const m = html.match(re);
    if (m) return htmlToText(m[1]);
  }
  return '';
}

function extractArticleTitle(html) {
  const m = html.match(/<title>([^<]+)<\/title>/);
  if (m) {
    let title = decodeHTMLEntities(m[1]);
    // 去掉末尾的网站名后缀 (e.g. " - 동아일보")
    title = title.replace(/\s*[-|]\s*\S+$/, '').trim();
    return title;
  }
  return '';
}

// ── 韩语句子提取 ──────────────────────────────────────────────
function extractKoreanSentences(text) {
  if (!text) return [];

  // Split on Korean sentence endings: 다. 요. 까? 니다. 니? etc.
  // Use lookbehind to keep the ending character with the sentence
  const endings = /(?<=[.!?~…])\s+(?=[가-힣"A-Z])|(?<=다\.|요\.|까\?|니다\.|니까\.|는데\.|군요\.|네요\.|더라\.|랍니다\.|습니다\.|습니까\.|는가\?|는지\.|더니\.)\s+/g;
  const parts = text.split(endings);

  const result = [];
  for (const part of parts) {
    const trimmed = part.replace(/\s+/g, ' ').trim();
    if (/[가-힣]/.test(trimmed) && trimmed.length >= 10 && trimmed.length <= 100) {
      // Filter navigation/footer text
      const lower = trimmed.toLowerCase();
      if (/(구독|로그인|회원가입|공지사항|이용약관|개인정보|저작권|무단전재|배포금지|기사제보|광고문의)/.test(lower)) continue;
      result.push(trimmed);
    }
  }

  // If we got too few sentences, try splitting long ones further by commas/parentheses
  if (result.length < 4) {
    const subResult = [];
    for (const s of result) {
      if (s.length > 60) {
        const subs = s.split(/(?<=[,，、])\s*/);
        for (const sub of subs) {
          const st = sub.trim();
          if (/[가-힣]/.test(st) && st.length >= 8 && st.length <= 100) {
            subResult.push(st);
          }
        }
      } else {
        subResult.push(s);
      }
    }
    return [...new Set(subResult)].slice(0, 12);
  }

  return [...new Set(result)].slice(0, 12);
}

// ── 简单韩文分词 ──────────────────────────────────────────────
function tokenizeKorean(sentence) {
  const raw = sentence.split(/\s+/);
  const tokens = [];
  for (const chunk of raw) {
    const clean = chunk.replace(/^[^\w가-힣]+|[^\w가-힣]+$/g, '');
    if (clean.length > 0) tokens.push(clean);
  }
  return tokens.slice(0, 25);
}

// ── Naver News 搜索 ───────────────────────────────────────────
const SEARCH_KEYWORDS = [
  '아이돌 컴백', '걸그룹 신곡', '보이그룹 신곡', 'KPOP 컴백',
  '아이돌 콘서트', '아이돌 팬미팅', '걸그룹 컴백', '보이그룹 컴백',
  '아이돌 데뷔', '아이돌 신인', '아이돌 음악방송', '아이돌 무대',
  '아이돌 뮤비', '아이돌 앨범', '아이돌 티저', '아이돌 공개',
  '아이돌 예능', '아이돌 화보', '아이돌 패션', '아이돌 논란',
  'BTS', '뉴진스', '에스파', '아이브', '블랙핑크', '세븐틴',
  'NCT 컴백', '트와이스', '르세라핌', '스트레이키즈',
  '엔하이픈', '제로베이스원', '라이즈',
  '연예계 소식', '가요계', '엔터테인먼트',
];

async function searchNaverNews(keyword) {
  try {
    const url = `https://search.naver.com/search.naver?where=news&query=${encodeURIComponent(keyword)}&sm=tab_opt&sort=1`;
    const resp = await fetch(url, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36' },
      signal: AbortSignal.timeout(15000),
    });
    const html = await resp.text();
    const urlMatches = html.match(/https?:\/\/n\.news\.naver\.com\/mnews\/article\/\d+\/\d+\?sid=\d+/g) || [];
    return [...new Set(urlMatches)];
  } catch (e) {
    console.error(`  Naver search [${keyword}] 失败:`, e.message);
    return [];
  }
}

// ── 抓取 Naver 文章 ────────────────────────────────────────────
async function fetchArticle(articleUrl) {
  try {
    const resp = await fetch(articleUrl, {
      headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.0.0 Safari/537.36' },
      signal: AbortSignal.timeout(15000),
    });
    const html = await resp.text();
    const title = extractArticleTitle(html);
    const body = extractArticleBody(html);
    const sourceName = extractSourceName(html);
    const publishedAt = extractPublishedAt(html);
    const imageUrl = extractImageUrl(html);
    return { title, body, url: articleUrl, sourceName, publishedAt, imageUrl };
  } catch (e) {
    return { title: '', body: '', url: articleUrl, sourceName: '네이버뉴스', publishedAt: null, imageUrl: '', error: e.message };
  }
}

// ── 分类推断 ──────────────────────────────────────────────────
const ARTIST_LIST = [
  'IVE', '아이브', 'NewJeans', '뉴진스', 'BTS', '방탄소년단', 'BLACKPINK', '블랙핑크',
  'aespa', '에스파', 'TWICE', '트와이스', 'Stray Kids', '스트레이키즈', 'TXT', '투바투',
  'ENHYPEN', '엔하이픈', 'SEVENTEEN', '세븐틴', 'LE SSERAFIM', '르세라핌',
  '(G)I-DLE', '아이들', 'ITZY', '있지', 'Red Velvet', '레드벨벳', 'NCT', '엔시티',
  'ATEEZ', '에이티즈', 'ZEROBASEONE', '제로베이스원', 'RIIZE', '라이즈', 'ILLIT', '아일릿',
  'BABYMONSTER', '베이비몬스터', 'BOYNEXTDOOR', 'TWS', 'QWER', 'KISS OF LIFE',
  'GD', '지드래곤', 'IU', '아이유', '태연', 'TAEYEON', '제니', 'JENNIE', '리사', 'LISA',
  '로제', 'ROSÉ', '지수', 'JISOO', '정국', 'Jung Kook', '지민', 'Jimin',
  '뷔', 'V', '진', 'Jin', 'RM', '알엠', '슈가', 'SUGA', '제이홉', 'J-Hope',
  '카리나', '윈터', 'Karina', 'Winter', '원영', '장원영', '안유진',
  '마크', 'Mark', 'NCT', '샤이니', 'SHINee', '엑소', 'EXO',
];

function inferCategory(title, body) {
  const t = (title + ' ' + (body || '').slice(0, 500)).toLowerCase();
  if (/컴백|comeback|신곡|새 앨범|발매|공개|티저|teaser|뮤비|mv|신보|음원|앨범|타이틀곡/.test(t)) return 'comeback';
  if (/무대|stage|공연|콘서트|concert|팬미팅|팬콘|뮤직뱅크|엠카|인기가요|음악방송|투어|tour|페스티벌/.test(t)) return 'stage';
  if (/팬|fan|논란|의혹|사과|논쟁|댓글|반응|화제|악플|루머|폭로|해명/.test(t)) return 'fan_comment';
  if (/패션|fashion|스타일|의상|레드카펫|룩|look|화보|메이크업/.test(t)) return 'fashion';
  if (/예능|variety|예능인|웃음|코미디|토크|아는|형님|라디오|프로그램/.test(t)) return 'variety';
  return 'official';
}

function extractArtists(title) {
  const found = ARTIST_LIST.filter((a) => title.includes(a));
  const unique = [...new Set(found.map((a) => {
    const idx = ARTIST_LIST.indexOf(a);
    return idx % 2 === 0 ? ARTIST_LIST[idx] : ARTIST_LIST[idx - 1];
  }))];
  return unique.slice(0, 5);
}

function extractImageUrl(html) {
  // og:image is most reliable for Naver News
  const ogMatch = html.match(/<meta\s+property="og:image"[^>]*content="([^"]+)"/i);
  if (ogMatch) return decodeHTMLEntities(ogMatch[1]);

  // Fallback: first img inside article body
  const articleMatch = html.match(/<article[^>]*>([\s\S]*?)<\/article>/i);
  if (articleMatch) {
    const imgMatch = articleMatch[1].match(/<img[^>]*src="([^"]+)"[^>]*>/i);
    if (imgMatch) return imgMatch[1];
  }

  return '';
}

function extractSourceName(html) {
  // Try to parse media name from Naver article metadata
  const metaMatch = html.match(/<meta\s+property="og:article:author"[^>]*content="([^"]*)"/i)
    || html.match(/<meta\s+name="author"[^>]*content="([^"]*)"/i);
  if (metaMatch) return metaMatch[1].trim();

  // Fallback: look for press logo alt text
  const pressMatch = html.match(/<img[^>]*alt="([^"]*)"[^>]*class="[^"]*media_logo[^"]*"/i)
    || html.match(/<img[^>]*class="[^"]*media_logo[^"]*"[^>]*alt="([^"]*)"/i);
  if (pressMatch) return pressMatch[1].trim();

  return '네이버뉴스';
}

function extractPublishedAt(html) {
  // Try og:article:published_time meta
  const ogMatch = html.match(/<meta\s+property="og:article:published_time"[^>]*content="([^"]*)"/i);
  if (ogMatch) {
    const ts = Date.parse(ogMatch[1]);
    if (!isNaN(ts)) return ts;
  }

  // Try article:published_time
  const artMatch = html.match(/<meta\s+property="article:published_time"[^>]*content="([^"]*)"/i);
  if (artMatch) {
    const ts = Date.parse(artMatch[1]);
    if (!isNaN(ts)) return ts;
  }

  // Try date in JSON-LD
  const jsonLdMatch = html.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/i);
  if (jsonLdMatch) {
    try {
      const ld = JSON.parse(jsonLdMatch[1]);
      const dateStr = ld.datePublished || ld.dateCreated;
      if (dateStr) {
        const ts = Date.parse(dateStr);
        if (!isNaN(ts)) return ts;
      }
    } catch { /* ignore */ }
  }

  // Fallback: try date patterns in text
  const dateMatch = html.match(/(\d{4})[.\-/](\d{1,2})[.\-/](\d{1,2})\s+(\d{1,2}):(\d{2})/);
  if (dateMatch) {
    const ts = new Date(+dateMatch[1], +dateMatch[2] - 1, +dateMatch[3], +dateMatch[4], +dateMatch[5]).getTime();
    if (!isNaN(ts)) return ts;
  }

  return null;
}

// ── 主流程 ──────────────────────────────────────────────────
async function main() {
  console.log('=== 韩娱热帖爬虫 (Naver 原文全文) ===\n');

  // Step 1: 从 Naver 搜索收集文章 URL
  console.log('[1/3] 搜索 Naver News 收集文章 URL...');
  const urlSet = new Set();
  for (const kw of SEARCH_KEYWORDS) {
    const urls = await searchNaverNews(kw);
    urls.forEach(u => urlSet.add(u));
    // 每次搜索之间稍等
    await new Promise(r => setTimeout(r, 500));
  }
  const allUrls = [...urlSet];
  console.log(`  -> 收集到 ${allUrls.length} 个唯一文章 URL`);

  if (allUrls.length === 0) {
    console.error('未找到任何 Naver 文章 URL，请检查网络或搜索参数');
    process.exit(1);
  }

  // Step 2: 并发抓取文章全文
  const toFetch = allUrls.slice(0, MAX_POSTS + 10); // 多抓几个以防部分失败
  console.log(`\n[2/3] 抓取 ${toFetch.length} 篇原文全文...`);
  const articles = [];
  for (let i = 0; i < toFetch.length; i += CONCURRENCY) {
    const batch = toFetch.slice(i, i + CONCURRENCY);
    const batchResults = await Promise.all(
      batch.map(async (url, bi) => {
        const idx = i + bi + 1;
        console.log(`  抓取 [${idx}/${toFetch.length}]: ${url.slice(0, 80)}...`);
        return await fetchArticle(url);
      })
    );
    articles.push(...batchResults);
    if (i + CONCURRENCY < toFetch.length) {
      await new Promise(r => setTimeout(r, 1000));
    }
  }

  // 筛选：正文≥200字 + 韩文≥100字 + K-pop相关
  const KPOP_TERMS = [
    '아이돌', '걸그룹', '보이그룹', 'K팝', 'KPOP', '컴백', '신곡', '앨범',
    '뮤비', '무대', '콘서트', '팬미팅', '음악방송', '댄스', '안무',
    '아이브', '뉴진스', '에스파', '블랙핑크', '방탄소년단', 'BTS',
    '세븐틴', '트와이스', '르세라핌', '스트레이키즈', '엔하이픈',
    'NCT', '제로베이스원', '라이즈', '아일릿', '소속사', '데뷔',
    '팬덤', '화보', '패션', '예능', '가요계', '엔터테인먼트',
  ];

  const EXCLUDE_TERMS = [
    // Politics
    '시장', '정치', '선거', '민주당', '국민의힘', '후보', '의원', '국회', '대통령', '장관',
    '지방선거', '총선', '대선', '보궐선거', '당선', '출마', '유세',
    // Business/commercial
    '주식', '숙박', '백화점', '팝업스토어', '입점', '매출', '마케팅', '광고주',
    '투자', '증권', '상장', 'IPO', '인수', '합병',
    // Legal
    '소송', '배상', '법원', '판결', '기소', '체포', '고발', '손배소',
    '항소심', '대법원', '검찰', '변호사', '무죄', '유죄',
    // Accidents/deaths/crime
    '사건', '사고', '사망', '부고', '마약', '음주', '폭행', '성추행',
    // Film/drama (non-KPOP)
    '영화', '감독', '배우', '시나리오', '개봉', '박스오피스',
    // General news/other
    '쿠팡', '인터뷰', '부동산', '코로나', '확진', '날씨',
    '과학', '의학', '연구', '논문', '특허',
  ];

  function isKpopRelated(text) {
    return KPOP_TERMS.some(term => text.includes(term));
  }

  function hasExcludeTerm(text) {
    return EXCLUDE_TERMS.some(term => text.includes(term));
  }

  const valid = articles.filter(a => {
    if (!a.body || a.body.length < 200) return false;
    const koreanCount = (a.body.match(/[가-힣]/g) || []).length;
    if (koreanCount < 100) return false;
    const checkText = a.title + ' ' + a.body.slice(0, 1000);
    if (!isKpopRelated(checkText)) return false;
    if (hasExcludeTerm(checkText)) return false;
    return true;
  });
  console.log(`  -> 有效文章 (≥200字 + 韩文≥100字 + K-pop相关): ${valid.length}/${articles.length}`);

  if (valid.length === 0) {
    console.error('所有文章正文均不足 200 字');
    process.exit(1);
  }

  // Step 3: 生成热帖
  console.log(`\n[3/3] 生成 ${Math.min(valid.length, MAX_POSTS)} 条热帖...`);
  const selected = valid.slice(0, MAX_POSTS);
  const now = Date.now();
  let totalSentences = 0;

  const posts = selected.map((article, i) => {
    const koreanSentences = extractKoreanSentences(article.body);
    totalSentences += koreanSentences.length;
    const artists = extractArtists(article.title);
    const category = inferCategory(article.title, article.body);

    const sentences = koreanSentences.length > 0
      ? koreanSentences.map((ko) => ({
          korean: ko,
          chinese: '',
          breakdown: tokenizeKorean(ko).map((token) => ({ token, meaning: '' })),
        }))
      : [{
          korean: article.title,
          chinese: '',
          breakdown: tokenizeKorean(article.title).map((token) => ({ token, meaning: '' })),
        }];

    return {
      id: `hot-${Date.now().toString(36)}-${i}`,
      titleZh: article.title.slice(0, 100),
      titleKo: '',
      summaryZh: article.body,
      category,
      imageUrl: article.imageUrl || '',
      sourceUrl: article.url,
      sourceName: article.sourceName || '네이버뉴스',
      publishedAt: article.publishedAt || now,
      artists,
      tags: [...artists.slice(0, 3), category],
      learningScore: 55 + Math.floor(Math.random() * 20), // Base learning score, not fake hotness
      publishStatus: 'draft',
      sentences,
    };
  });

  // 生成 TypeScript 文件
  const tsContent = `// 韩娱热帖数据 — AI 自动整理自公开来源
// 更新于 ${new Date().toISOString().slice(0, 19).replace('T', ' ')}
// 数据源: Naver News 搜索 + 原文全文提取
// 自动更新: node scripts/crawl-hot-posts.mjs

export interface HotSentence {
  korean: string;
  chinese: string;
  breakdown: { token: string; meaning: string; note?: string }[];
  expressionNote?: string;
}

export interface KpopHotPost {
  id: string;
  titleZh: string;
  titleKo?: string;
  summaryZh: string;
  category: 'comeback' | 'stage' | 'fan_comment' | 'official' | 'fashion' | 'variety';
  imageUrl?: string;
  sourceUrl: string;
  sourceName: string;
  publishedAt: number;
  artists: string[];
  tags: string[];
  learningScore: number;
  publishStatus: 'draft' | 'review' | 'published';
  sentences: HotSentence[];
}

export const kpopHotPosts: KpopHotPost[] = ${JSON.stringify(posts, null, 2)};
`;

  writeFileSync(DATA_FILE, tsContent, 'utf-8');
  writeFileSync('data/hot-posts.json', JSON.stringify(posts, null, 2), 'utf-8');
  console.log(`\n✅ 成功生成 ${posts.length} 条热帖 -> ${DATA_FILE} + data/hot-posts.json`);
  console.log(`   来源: Naver News 原文提取 | 含韩语学习句子 ${totalSentences} 条`);
  console.log(`   平均每篇句子: ${(totalSentences / posts.length).toFixed(1)} 条`);

  console.log('\n📋 热帖预览:');
  posts.slice(0, 5).forEach((p, i) => {
    console.log(`  ${i + 1}. [${p.category}] ${p.titleZh.slice(0, 60)}`);
    console.log(`     句子数: ${p.sentences.length} | 正文长度: ${selected[i].body.length} 字`);
    if (p.sentences[0]) console.log(`     韩文: ${p.sentences[0].korean.slice(0, 100)}`);
  });
}

main().catch((e) => {
  console.error('爬虫失败:', e);
  process.exit(1);
});
