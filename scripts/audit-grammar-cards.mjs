// scripts/audit-grammar-cards.mjs
// 扫 P1-P14 所有语法卡，找视觉问题：
// 1) HTML 字段用了未定义 CSS 类（孤儿类，渲染无样式）
// 2) quickTable 单元格空白
// 3) 缺关键模板要素（card-title / hook-box / reminder-box）

import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');

// 从 src/app/grammar/page.tsx 提取已定义的 CSS 类
const pageTsx = readFileSync(path.join(__dirname, '..', 'src', 'app', 'grammar', 'page.tsx'), 'utf8');
const stylesMatch = pageTsx.match(/const GRAMMAR_STYLES = `([\s\S]*?)`;/);
const stylesBlock = stylesMatch ? stylesMatch[1] : '';
const definedClassesSet = new Set();
for (const m of stylesBlock.matchAll(/\.([a-zA-Z][a-zA-Z0-9-]*)/g)) {
  definedClassesSet.add(m[1]);
}

// 工具类常用的 utility 类，不需要在 GRAMMAR_STYLES 里定义
const utilityWhitelist = new Set(['hd', 'badge', 'overview', 'ov-hero', 'ov-hero-label', 'ov-hero-title', 'ov-hero-sub', 'ov-section', 'ov-section-hd', 'ov-section-line', 'ov-section-title', 'ov-block', 'ov-sec', 'ov-title', 'ov-sub', 'overview-desktop']);

function extractClassNames(html) {
  const out = new Set();
  for (const m of html.matchAll(/class\s*=\s*["']([^"']+)["']/g)) {
    for (const c of m[1].split(/\s+/).filter(Boolean)) {
      out.add(c);
    }
  }
  return out;
}

async function loadPart(partNum) {
  const file = path.join(dataDir, `grammar-cards-p${partNum}.ts`);
  const url = 'file:///' + file.replace(/\\/g, '/');
  // 用 tsx loader 跑 ts 文件
  const mod = await import(url);
  return mod[`grammarCardsP${partNum}`];
}

const findings = [];
function add(cardId, kind, detail) {
  findings.push({ cardId, kind, detail });
}

const HTML_FIELDS = ['step0Html', 'compareHtml', 'overviewHtml'];
const REQUIRED_IN_STEP0 = ['card-title', 'hook-box']; // 至少要有标题和钩子盒
const REQUIRED_IN_COMPARE = ['card-title', 'tok-row']; // 至少标题 + 对比块

for (let p = 1; p <= 14; p++) {
  let cards;
  try {
    cards = await loadPart(p);
  } catch (e) {
    console.error(`P${p} load fail:`, e.message);
    continue;
  }
  for (const card of cards) {
    const cardId = card.id;

    // ---- 1) HTML 字段用了未定义 CSS 类 ----
    for (const field of HTML_FIELDS) {
      const html = card[field];
      if (!html) continue;
      const usedClasses = extractClassNames(html);
      for (const cls of usedClasses) {
        if (!definedClassesSet.has(cls) && !utilityWhitelist.has(cls)) {
          add(cardId, 'orphan-class', `${field} uses .${cls} (not in GRAMMAR_STYLES)`);
        }
      }
    }

    // ---- 2) quickTable 单元格空白 / 列数不一致 ----
    if (card.quickTable) {
      const { headers, rows, title } = card.quickTable;
      if (!title || !title.trim()) add(cardId, 'quicktable-empty-title', '');
      if (!Array.isArray(rows) || rows.length === 0) {
        add(cardId, 'quicktable-no-rows', '');
      } else {
        rows.forEach((row, ri) => {
          if (row.length !== headers.length) {
            add(cardId, 'quicktable-row-mismatch', `row ${ri}: ${row.length} cells vs ${headers.length} headers`);
          }
          row.forEach((cell, ci) => {
            if (typeof cell === 'string') {
              if (!cell.trim()) add(cardId, 'quicktable-empty-cell', `row ${ri} col ${ci} ("${headers[ci]}")`);
            } else if (cell && typeof cell === 'object') {
              if (!cell.ko || !cell.ko.trim()) {
                add(cardId, 'quicktable-empty-cell', `row ${ri} col ${ci} ("${headers[ci]}") - ko empty`);
              }
            } else {
              add(cardId, 'quicktable-empty-cell', `row ${ri} col ${ci} ("${headers[ci]}") - missing`);
            }
          });
        });
      }
    }

    // ---- 3) 真正简陋的 step0Html（.step0-hook + .hook-sent 骨架，无 card-title 也无 h1） ----
    if (card.step0Html) {
      const html = card.step0Html;
      const hasTitle = html.includes('class="card-title"') || /<h[12]/i.test(html);
      const hasBlock = html.includes('class="hook-box"') || html.includes('class="block"');
      if (!hasTitle || !hasBlock) {
        add(cardId, 'step0-too-simple', `${!hasTitle ? '无标题' : ''}${!hasBlock ? ' 无内容块' : ''}`.trim());
      }
    }
    if (card.compareHtml) {
      const html = card.compareHtml;
      const hasTitle = html.includes('class="card-title"') || /<h[12]/i.test(html);
      const hasContent = html.includes('class="tok-row"') || html.includes('class="block"') || html.includes('class="cmp-block"') || html.includes('class="compare-grid"');
      if (!hasTitle || !hasContent) {
        add(cardId, 'compare-too-simple', `${!hasTitle ? '无标题' : ''}${!hasContent ? ' 无内容块' : ''}`.trim());
      }
    }
  }
}

// 输出
console.log('\n==== 审查结果 ====\n');
console.log(`总问题数：${findings.length}`);

const byKind = {};
for (const f of findings) {
  (byKind[f.kind] ||= []).push(f);
}

for (const [kind, items] of Object.entries(byKind)) {
  console.log(`\n[${kind}] (${items.length})`);
  for (const f of items) {
    console.log(`  ${f.cardId}: ${f.detail}`);
  }
}
