/**
 * 全代码审查 v7 — 修复 TOPIK 数组定位
 */
import { readFileSync } from 'fs';
import { join } from 'path';

const DIR = "C:\\Users\\Administrator\\Desktop\\korean-learning-app\\src\\data";
const read = f => { try { return readFileSync(f, 'utf-8'); } catch { return null; } };

const GC = ['grammar-cards.ts','grammar-cards-p1.ts','grammar-cards-p2.ts',
  'grammar-cards-p3.ts','grammar-cards-p4.ts','grammar-cards-p5.ts',
  'grammar-cards-p6.ts','grammar-cards-p7.ts','grammar-cards-p8.ts',
  'grammar-cards-p9.ts','grammar-cards-p10.ts','grammar-cards-p11.ts',
  'grammar-cards-p12.ts','grammar-cards-p13.ts','grammar-cards-p14.ts'];

function extractOpts(text) {
  const m = text.match(/options:\s*\[/);
  if (!m) return null;
  const start = m.index + m[0].length - 1;
  let depth = 1, i = start + 1;
  while (depth > 0 && i < text.length) {
    if (text[i] === '[') depth++;
    else if (text[i] === ']') depth--;
    i++;
  }
  return text.slice(start, i);
}

function countOpts(str) {
  const inner = str.slice(1, -1).trim();
  if (!inner) return 0;
  let count = 0, inStr = false, q = '';
  for (const ch of inner) {
    if (inStr) { if (ch === q) { inStr = false; count++; } }
    else if (ch === "'" || ch === '"') { inStr = true; q = ch; }
  }
  return count;
}

function hasStandaloneDash(str) {
  // Check if any option value is JUST '—' (placeholder), not part of longer text
  const inner = str.slice(1, -1);
  const options = [];
  let current = '', inStr = false, q = '';
  for (const ch of inner) {
    if (inStr) {
      current += ch;
      if (ch === q) { inStr = false; options.push(current); current = ''; }
    } else {
      if (ch === "'" || ch === '"') { inStr = true; q = ch; current = ch; }
    }
  }
  return options.some(o => o.replace(/['"]/g, '').trim() === '—');
}

function extractBlock(s, pos) {
  if (s[pos] !== '{') return null;
  let d = 1, i = pos + 1;
  while (d > 0 && i < s.length) {
    if (s[i] === '{') d++;
    else if (s[i] === '}') d--;
    i++;
  }
  return s.slice(pos, i);
}

function extractArr(s, pos) {
  if (s[pos] !== '[') return null;
  let d = 1, i = pos + 1;
  while (d > 0 && i < s.length) {
    if (s[i] === '[') d++;
    else if (s[i] === ']') d--;
    i++;
  }
  return s.slice(pos, i);
}

function scanGC(c, fn) {
  const issues = [], allA = [];
  let total = 0;
  const cardRegex = /id:\s*'(card-p?\d+-l?\d*)'/g;
  let m;
  while ((m = cardRegex.exec(c)) !== null) {
    const cardId = m[1];
    const afterId = c.slice(m.index + m[0].length);
    const sq = afterId.indexOf('specialQuiz:');
    if (sq === -1) continue;

    const typeM = afterId.slice(sq, sq + 100).match(/type:\s*'(morph|judge|fill)'/);
    const qa = afterId.indexOf('questions: [', sq);
    if (qa === -1) continue;

    const bs = afterId.indexOf('[', qa);
    const arr = extractArr(afterId, bs);
    if (!arr) continue;

    let qi = 0;
    while (qi < arr.length) {
      const qs = arr.indexOf('{', qi);
      if (qs === -1) break;
      const q = extractBlock(arr, qs);
      if (!q) { qi = qs + 1; continue; }
      qi = qs + q.length;
      total++;

      const ans = parseInt((q.match(/answer:\s*(\d+)/) || [, '-1'])[1]);
      const optStr = extractOpts(q);
      const opts = optStr ? countOpts(optStr) : 0;
      allA.push(ans);

      if (ans >= opts && opts > 0)
        issues.push(`${fn} [${cardId}] answer=${ans} 越界 options=${opts}`);
      if (optStr && hasStandaloneDash(optStr))
        issues.push(`${fn} [${cardId}] options 包含占位符 —`);
    }
  }
  return { issues, count: total, answers: allA };
}

function scanReading(c, fn) {
  const issues = [], allA = [];
  let total = 0;

  let idx = 0;
  while (idx < c.length) {
    const qa = c.indexOf('questions: [', idx);
    if (qa === -1) break;
    const bs = c.indexOf('[', qa);
    const arr = extractArr(c, bs);
    if (!arr) { idx = bs + 1; continue; }
    idx = bs + arr.length;

    let qi = 0;
    while (qi < arr.length) {
      const qs = arr.indexOf('{', qi);
      if (qs === -1) break;
      const q = extractBlock(arr, qs);
      if (!q) { qi = qs + 1; continue; }
      qi = qs + q.length;
      total++;

      const ty = (q.match(/type:\s*'([^']+)'/) || [, '?'])[1];
      const ans = parseInt((q.match(/answer:\s*(\d+)/) || [, '-1'])[1]);
      const optStr = extractOpts(q);
      const opts = optStr ? countOpts(optStr) : 0;
      const promptM = q.match(/prompt:\s*'([^']*)'/);
      allA.push(ans);

      if (ans >= opts && opts > 0)
        issues.push(`${fn} [${ty}] answer=${ans} 越界 options=${opts}`);
      if (optStr && hasStandaloneDash(optStr))
        issues.push(`${fn} [${ty}] options 包含 —`);
      if (!promptM || !promptM[1].trim())
        issues.push(`${fn} [${ty}] prompt 为空`);
    }
  }
  return { issues, count: total, answers: allA };
}

function scanTOPIK(c, fn) {
  const issues = [];
  let total = 0;

  // Find: export const topikQuestions: TopikQuestion[] = [
  // The = [ is what we want, not the type annotation []
  const decl = c.indexOf('export const topikQuestions');
  if (decl === -1) return { issues, count: 0 };

  const eqBracket = c.indexOf('= [', decl);
  if (eqBracket === -1) return { issues, count: 0 };
  const bracket = eqBracket + 2; // position of [ after =

  const arr = extractArr(c, bracket);
  if (!arr) return { issues, count: 0 };

  let qi = 0;
  while (qi < arr.length) {
    const qs = arr.indexOf('{', qi);
    if (qs === -1) break;
    const q = extractBlock(arr, qs);
    if (!q) { qi = qs + 1; continue; }
    qi = qs + q.length;
    total++;

    const idM = q.match(/id:\s*'([^']+)'/);
    const ci = parseInt((q.match(/correctIdx:\s*(\d+)/) || [, '-1'])[1]);
    const optStr = extractOpts(q);
    const opts = optStr ? countOpts(optStr) : 0;
    const promptM = q.match(/prompt:\s*'(.*?)'/);
    const promptZhM = q.match(/promptZh:\s*'(.*?)'/);

    if (ci >= opts && opts > 0)
      issues.push(`${fn} [${idM?.[1]||'?'}] correctIdx=${ci} 越界 options=${opts}`);
    if (!promptM || !promptM[1].trim())
      issues.push(`${fn} [${idM?.[1]||'?'}] prompt 为空`);
    if (!promptZhM || !promptZhM[1].trim())
      issues.push(`${fn} [${idM?.[1]||'?'}] promptZh 为空`);
  }
  return { issues, count: total };
}

function scanWriting(c, fn) {
  const issues = [], ac = [];
  const decl = c.indexOf('export const clozeExercises');
  if (decl === -1) return { issues, count: 0 };
  const eqBracket = c.indexOf('= [', decl);
  if (eqBracket === -1) return { issues, count: 0 };
  const bracket = eqBracket + 2;
  const arr = extractArr(c, bracket);
  if (!arr) return { issues, count: 0 };

  let qi = 0;
  while (qi < arr.length) {
    const qs = arr.indexOf('{', qi);
    if (qs === -1) break;
    const q = extractBlock(arr, qs);
    if (!q) { qi = qs + 1; continue; }
    qi = qs + q.length;

    const ci = parseInt((q.match(/correct:\s*(\d+)/) || [, '0'])[1]);
    const optStr = extractOpts(q);
    const opts = optStr ? countOpts(optStr) : 0;
    ac.push(ci);
    if (ci >= opts && opts > 0)
      issues.push(`${fn} correct=${ci} 越界 options=${opts}`);
  }
  if (ac.length >= 8 && new Set(ac).size === 1)
    issues.push(`${fn} [ALL] 所有 ${ac.length} 题答案都是 index ${ac[0]} — 需要随机化`);
  return { issues, count: ac.length };
}

function scanArticleL(c, fn) {
  const issues = [], ac = [];
  let idx = 0;
  while (idx < c.length) {
    const qs = c.indexOf('{', idx);
    if (qs === -1) break;
    const snippet = c.slice(qs, qs + 120);
    if (!snippet.includes('question:') || !snippet.includes('correct:')) { idx = qs + 1; continue; }
    const q = extractBlock(c, qs);
    if (!q) { idx = qs + 1; continue; }
    idx = qs + q.length;
    const ci = parseInt((q.match(/correct:\s*(\d+)/) || [, '0'])[1]);
    const optStr = extractOpts(q);
    const opts = optStr ? countOpts(optStr) : 0;
    ac.push(ci);
    if (ci >= opts && opts > 0)
      issues.push(`${fn} correct=${ci} 越界 options=${opts}`);
  }
  if (ac.length >= 8 && new Set(ac).size === 1)
    issues.push(`${fn} [ALL] 所有 ${ac.length} 题答案都是 index ${ac[0]} — 需要随机化`);
  return { issues, count: ac.length };
}

// ═══════ Main ═══════
console.log('='.repeat(70));
console.log('全代码审查 — 练习题扫描报告 v7 (终版)');
console.log('='.repeat(70));

console.log('\n【语法卡片 specialQuiz】');
let gIssues = 0, gTotal = 0;
for (const f of GC) {
  const c = read(join(DIR, f));
  if (!c) { console.log(`  ${f}: 无法读取`); continue; }
  const r = scanGC(c, f);
  gIssues += r.issues.length;
  gTotal += r.count;
  if (r.issues.length) {
    console.log(`  ⚠️  ${f} (${r.count}题):`);
    r.issues.forEach(x => console.log('    ' + x));
  } else console.log(`  ✅ ${f} (${r.count}题)`);
}
console.log(`  ---\n  总计: ${gTotal} 题, ${gIssues} 个问题`);

console.log('\n【阅读文章题 reading-new.ts】');
{ const c = read(join(DIR, 'reading-new.ts')); if (c) {
  const r = scanReading(c, 'reading-new.ts');
  r.issues.length ? (console.log('  ⚠️  ('+r.count+'题):\n    '+r.issues.join('\n    ')))
    : console.log(`  ✅ ${r.count} 题`);
}}

console.log('\n【TOPIK 真题 topik-questions.ts】');
{ const c = read(join(DIR, 'topik-questions.ts')); if (c) {
  const r = scanTOPIK(c, 'topik-questions.ts');
  r.issues.length ? (console.log('  ⚠️  ('+r.count+'题):\n    '+r.issues.join('\n    ')))
    : console.log(`  ✅ ${r.count} 题`);
}}

console.log('\n【写作练习 writingExercises.ts】');
{ const c = read(join(DIR, 'writingExercises.ts')); if (c) {
  const r = scanWriting(c, 'writingExercises.ts');
  r.issues.length ? (console.log('  ⚠️  ('+r.count+'题):\n    '+r.issues.join('\n    ')))
    : console.log(`  ✅ ${r.count} 题`);
}}

console.log('\n【文化小测验 articleLearning.ts】');
{ const c = read(join(DIR, 'articleLearning.ts')); if (c) {
  const r = scanArticleL(c, 'articleLearning.ts');
  r.issues.length ? (console.log('  ⚠️  ('+r.count+'题):\n    '+r.issues.join('\n    ')))
    : console.log(`  ✅ ${r.count} 题`);
}}

console.log('\n' + '='.repeat(70));
