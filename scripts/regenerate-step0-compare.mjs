// scripts/regenerate-step0-compare.mjs
// 自动重写 P9/P10/P11/P12 的简陋 step0Html + compareHtml
// 按 P11-L06 同款模板：card-title + card-body + hook-box(两条对比) + reminder-box

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');

// 待重写卡片清单
const TARGETS = [
  ['p9',  ['l07', 'l08', 'l09', 'l10']],
  ['p10', ['l01','l02','l03','l04','l05','l06','l07','l08','l09','l10']],
  ['p11', ['l01','l02','l03','l04','l05','l07','l08']],
  ['p12', ['l01','l02','l03','l04','l05','l06','l07']],
];

function esc(s){ return String(s).replace(/`/g,'\\`').replace(/\$/g,'\\$'); }

// 用 structures[0] / structures[1] 作为两条钩子句
function genStep0(card) {
  const s = card.structures || [];
  const ex1 = s[0] || { ko: '', zh: '' };
  const ex2 = s[1] || s[0] || { ko: '', zh: '' };
  const body = (card.whatItDoesBody || '').split('\n')[0].slice(0, 80);
  return `<div class="card-title">${esc(card.whatItDoes || card.title)}</div>
<div class="card-body">${esc(body)}</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">${esc(ex1.ko)}</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">${esc(ex1.zh)}</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">${esc(ex2.ko)}</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">${esc(ex2.zh)}</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>${card.rulesNote ? `\n<div class="reminder-box">${esc(card.rulesNote.split('\\n')[0])}</div>` : ''}`;
}

function genCompare(card) {
  const label = card.compareLabel || `${card.title} 对比`;
  const ex1 = card.structures?.[0] || { ko: '', zh: '' };
  const ex2 = card.structures?.[1] || ex1;
  const ex3 = card.structures?.[2] || null;
  // 用 rulesNote 第二行做 hint
  const note = card.rulesNote?.split('\n')[1] || card.scenarioNote?.split('\n')[0] || '注意区分两种用法的核心差异。';
  return `<div class="card-title">${esc(label)}</div>
<div class="card-body">${esc((card.whatItDoesBody || '').split('\n').slice(0,1).join(' ').slice(0, 120))}</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">${esc(ex1.ko)}</span><span style="font-size:16px;color:#5a4640">${esc(ex1.zh)}</span></div>
    ${ex3 ? `<div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">${esc(ex3.ko)}</span><span style="font-size:16px;color:#5a4640">${esc(ex3.zh)}</span></div>` : ''}
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">${esc(ex2.ko)}</span><span style="font-size:16px;color:#5a4640">${esc(ex2.zh)}</span></div>
  </div>
</div>
<div class="reminder-box">${esc(note)}</div>`;
}

// 用正则替换 ts 文件里某张卡的 step0Html / compareHtml 字段
function replaceCardField(src, cardId, field, newValue) {
  // 找 id: 'card-pX-lY' 后到下一张卡之间
  const cardStart = src.indexOf(`id: '${cardId}'`);
  if (cardStart === -1) return { src, changed: false, reason: 'card not found' };
  // 下一张卡的范围
  const nextCard = src.indexOf("\n  {\n    id: 'card-", cardStart + 1);
  const cardEnd = nextCard === -1 ? src.length : nextCard;
  const before = src.slice(0, cardStart);
  const cardBlock = src.slice(cardStart, cardEnd);
  const after = src.slice(cardEnd);

  // 在 cardBlock 里找 field: `...` 或 field: '...'
  // 用 `...` 反引号包裹的多行 HTML 字段
  const re = new RegExp(`(${field}:\\s*\`)([\\s\\S]*?)(\`,?)`);
  if (!re.test(cardBlock)) return { src, changed: false, reason: `${field} not found in ${cardId}` };
  const newBlock = cardBlock.replace(re, `$1\n${newValue}\n$3`);
  return { src: before + newBlock + after, changed: true };
}

// 主流程
for (const [part, lessons] of TARGETS) {
  const file = path.join(dataDir, `grammar-cards-${part}.ts`);
  let src = readFileSync(file, 'utf8');
  const mod = await import('file:///' + file.replace(/\\/g, '/'));
  const cards = mod[`grammarCardsP${part.slice(1)}`];

  let changedCount = 0;
  for (const ln of lessons) {
    const cardId = `card-${part}-${ln}`;
    const card = cards.find(c => c.id === cardId);
    if (!card) { console.log(`SKIP ${cardId}: not found`); continue; }

    const newStep0 = genStep0(card);
    const newCompare = genCompare(card);

    const r1 = replaceCardField(src, cardId, 'step0Html', newStep0);
    if (r1.changed) { src = r1.src; changedCount++; }
    else console.log(`SKIP ${cardId} step0Html: ${r1.reason}`);

    const r2 = replaceCardField(src, cardId, 'compareHtml', newCompare);
    if (r2.changed) { src = r2.src; changedCount++; }
    else console.log(`SKIP ${cardId} compareHtml: ${r2.reason}`);
  }

  writeFileSync(file, src);
  console.log(`${file}: ${changedCount} replacements`);
}

console.log('done');
