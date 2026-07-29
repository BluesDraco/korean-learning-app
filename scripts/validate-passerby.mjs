import { readFileSync } from 'node:fs';

const P = (mon, day, hour) => Date.UTC(2026, mon - 1, day, hour - 9, 0, 0);

const src = readFileSync(new URL('./seed-blog-passerby.mjs', import.meta.url), 'utf-8');
const start = src.indexOf('const posts = [');
const end = src.indexOf('\n];', start);
const arrText = src.slice(src.indexOf('[', start), end + 2);
const posts = eval(arrText);

const CAST = ['tori','news','minji','haru','junho','darami','gomdori','yowoo','nabi','choco','koal'];
const PASS = ['gapyeong','busan','nightowl','slow','seolgi','daegu','jeju','granny','salaryman','student','runner','florist',
  'taxi','firefighter','coder','nurse','rider','actor','baker','newmom','founder','retiree','cook1','carpenter'];
const KNOWN = new Set([...CAST, ...PASS]);

const hasHangul = (s) => /[가-힣]/.test(s);
const errs = [];
const ids = new Set(), slugs = new Set();

for (const p of posts) {
  const tag = p.id;
  if (ids.has(p.id)) errs.push(`DUP id: ${p.id}`);
  ids.add(p.id);
  if (slugs.has(p.slug)) errs.push(`DUP slug: ${p.slug} [${tag}]`);
  slugs.add(p.slug);
  if (p.unlock_day !== 0) errs.push(`unlock_day != 0 [${tag}]`);

  const joined = p.content.sentences.map((s) => s.ko).join(' ');
  for (const v of p.content.vocab) {
    if (!joined.includes(v.word)) errs.push(`VOCAB MISS [${tag}]: ${v.word}`);
    if (hasHangul(v.meaning)) errs.push(`VOCAB meaning has hangul [${tag}]: ${v.word}`);
  }
  for (const s of p.content.sentences) {
    if (hasHangul(s.zh)) errs.push(`sentence.zh has hangul [${tag}]: ${s.zh}`);
  }
  for (const q of p.content.quiz) {
    if (q.answerIndex < 0 || q.answerIndex >= q.options.length) errs.push(`bad answerIndex [${tag}]`);
    if (hasHangul(q.explanation) && !/[가-힣].*（|「/.test(q.explanation)) {
      // explanation 允许引用韩语词，仅提示
    }
  }
  for (const c of p.content.comments) {
    if (!KNOWN.has(c.animalId)) errs.push(`unknown commenter [${tag}]: ${c.animalId}`);
    if (c.animalId === p.author_id) errs.push(`SELF comment [${tag}]: ${c.animalId}`);
    if (hasHangul(c.zh)) errs.push(`comment.zh has hangul [${tag}]: ${c.zh}`);
  }
  const seenC = new Set();
  for (const c of p.content.comments) {
    if (seenC.has(c.animalId)) errs.push(`DUP commenter [${tag}]: ${c.animalId}`);
    seenC.add(c.animalId);
  }
  for (const l of p.content.likedBy) {
    if (!KNOWN.has(l)) errs.push(`unknown liker [${tag}]: ${l}`);
    if (l === p.author_id) errs.push(`SELF like [${tag}]: ${l}`);
  }
}

// 分布统计
const byAuthor = {}, byLevel = {};
for (const p of posts) {
  byAuthor[p.author_id] = (byAuthor[p.author_id] || 0) + 1;
  byLevel[p.level] = (byLevel[p.level] || 0) + 1;
}

console.log(`总帖数: ${posts.length}`);
console.log('作者分布:', JSON.stringify(byAuthor));
console.log('等级分布:', JSON.stringify(byLevel));
console.log(`封面图非空: ${posts.filter((p) => p.cover_image_url).length}`);
if (errs.length === 0) {
  console.log('RED LINES: PASS (0 violations)');
} else {
  console.log(`RED LINES: ${errs.length} violations`);
  for (const e of errs) console.log('  - ' + e);
  process.exit(1);
}
