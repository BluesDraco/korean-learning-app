// TOPIK 自出卷结构校验器
// 用法: node scripts/topik-validate-e.mjs E11-I [E11-II ...]
//       node scripts/topik-validate-e.mjs --all        # 校验所有 E 卷
// 只读，不修改文件。检查结构不变量 + 与 exam-sets.json 对齐。

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.join(__dirname, '..');
const QDIR = path.join(ROOT, 'public/data/topik/questions');
const EXAM_SETS = path.join(ROOT, 'public/data/topik/exam-sets.json');

const REQUIRED_FIELDS = [
  'id', 'section', 'level', 'topic', 'number', 'type', 'difficulty',
  'testPoint', 'prompt', 'promptZh', 'options', 'correctIdx',
  'explanation', 'vocabulary', 'examRound', 'questionType', 'groupId',
];
const VALID_SECTIONS = new Set(['listening', 'reading']);
const VALID_LEVELS = new Set(['beginner', 'intermediate', 'advanced']);
const VALID_DIFF = new Set(['easy', 'medium', 'hard']);

// 从 E01 参考卷推导合法 questionType 集合（避免误拒新卷用到的正当类型）
function knownQuestionTypes(levelSuffix) {
  const ref = path.join(QDIR, `E01-${levelSuffix}.json`);
  const set = new Set();
  if (fs.existsSync(ref)) {
    for (const q of JSON.parse(fs.readFileSync(ref, 'utf8'))) set.add(q.questionType);
  }
  return set;
}

// 期望编号布局：I 卷 L1-30 + R31-70；II 卷 L1-50 + R1-50
function expectedLayout(levelSuffix) {
  if (levelSuffix === 'I') {
    return { listening: { count: 30, start: 1 }, reading: { count: 40, start: 31 } };
  }
  return { listening: { count: 50, start: 1 }, reading: { count: 50, start: 1 } };
}

function hasCjk(s) { return /[一-鿿]/.test(s); }
function hasHangul(s) { return /[가-힣]/.test(s); }

function validateFile(fileBase, examSets) {
  const errors = [];
  const warns = [];
  const file = path.join(QDIR, `${fileBase}.json`);
  if (!fs.existsSync(file)) return { errors: [`文件不存在: ${fileBase}.json`], warns };

  const levelSuffix = fileBase.split('-')[1]; // 'I' | 'II'
  const layout = expectedLayout(levelSuffix);
  const knownTypes = knownQuestionTypes(levelSuffix);

  let data;
  try { data = JSON.parse(fs.readFileSync(file, 'utf8')); }
  catch (e) { return { errors: [`JSON 解析失败: ${e.message}`], warns }; }
  if (!Array.isArray(data)) return { errors: ['顶层不是数组'], warns };

  // 唯一性
  const ids = new Set();
  const groups = new Map(); // groupId -> [q]

  for (const q of data) {
    const tag = q.id || '(无id)';
    // 必填字段
    for (const f of REQUIRED_FIELDS) {
      if (!(f in q)) errors.push(`${tag}: 缺字段 ${f}`);
    }
    // id 唯一
    if (q.id) {
      if (ids.has(q.id)) errors.push(`${tag}: id 重复`);
      ids.add(q.id);
    }
    // 枚举
    if (!VALID_SECTIONS.has(q.section)) errors.push(`${tag}: section 非法 "${q.section}"`);
    if (!VALID_LEVELS.has(q.level)) errors.push(`${tag}: level 非法 "${q.level}"`);
    if (!VALID_DIFF.has(q.difficulty)) errors.push(`${tag}: difficulty 非法 "${q.difficulty}"`);
    if (q.type !== 'multiple-choice') errors.push(`${tag}: type 应为 multiple-choice`);
    if (q.questionType && !knownTypes.has(q.questionType)) {
      warns.push(`${tag}: questionType "${q.questionType}" 不在 E01-${levelSuffix} 已知集合中（可能是新类型，请人工确认）`);
    }
    // 选项 & 答案
    if (!Array.isArray(q.options) || q.options.length !== 4) {
      errors.push(`${tag}: options 必须恰 4 项（当前 ${Array.isArray(q.options) ? q.options.length : '非数组'}）`);
    } else {
      if (q.options.some(o => typeof o !== 'string' || o.trim() === '')) errors.push(`${tag}: 存在空选项`);
      if (new Set(q.options).size !== 4) warns.push(`${tag}: 存在重复选项`);
    }
    if (typeof q.correctIdx !== 'number' || q.correctIdx < 0 || q.correctIdx > 3) {
      errors.push(`${tag}: correctIdx 必须 0..3（当前 ${q.correctIdx}）`);
    }
    // 非空文本
    for (const f of ['topic', 'testPoint', 'prompt', 'promptZh', 'explanation']) {
      if (typeof q[f] === 'string' && q[f].trim() === '') errors.push(`${tag}: ${f} 为空串`);
    }
    if (!Array.isArray(q.vocabulary)) errors.push(`${tag}: vocabulary 必须是数组`);
    // 听力题应带 audioText
    if (q.section === 'listening' && (!q.audioText || !q.audioText.trim())) {
      errors.push(`${tag}: 听力题缺 audioText`);
    }
    // promptZh 应为中文；explanation 主体应含中文
    if (typeof q.promptZh === 'string' && !hasCjk(q.promptZh)) {
      warns.push(`${tag}: promptZh 不含中文（应为中文翻译）`);
    }
    if (typeof q.explanation === 'string' && !hasCjk(q.explanation)) {
      warns.push(`${tag}: explanation 不含中文`);
    }
    // groupId 收集
    if (q.groupId) {
      if (!groups.has(q.groupId)) groups.set(q.groupId, []);
      groups.get(q.groupId).push(q);
    }
  }

  // 分段编号校验
  for (const sec of ['listening', 'reading']) {
    const qs = data.filter(q => q.section === sec).sort((a, b) => a.number - b.number);
    const exp = layout[sec];
    if (qs.length !== exp.count) {
      errors.push(`[${sec}] 题量应为 ${exp.count}，实为 ${qs.length}`);
    }
    for (let i = 0; i < qs.length; i++) {
      const wantNum = exp.start + i;
      if (qs[i].number !== wantNum) {
        errors.push(`[${sec}] 第 ${i + 1} 题 number 应为 ${wantNum}，实为 ${qs[i].number}（${qs[i].id}）`);
      }
      // id 前缀与 number 后缀应一致：E11I-L05 / E11I-R31
      const secLetter = sec === 'listening' ? 'L' : 'R';
      const wantId = `${fileBase.replace('-', '')}-${secLetter}${String(wantNum).padStart(2, '0')}`;
      if (qs[i].id !== wantId) {
        errors.push(`[${sec}] number ${wantNum} 的 id 应为 ${wantId}，实为 ${qs[i].id}`);
      }
    }
  }

  // 短文题组：组内 prompt 里的短文正文应一致（取到第一个换行前若无则整体）— 只做弱校验：组内 ≥2 题
  for (const [gid, qs] of groups) {
    if (qs.length < 2) warns.push(`groupId ${gid} 只有 1 题（题组一般 ≥2）`);
    const sections = new Set(qs.map(q => q.section));
    if (sections.size > 1) errors.push(`groupId ${gid} 跨 section`);
  }

  // 答案位置分布：应接近均匀（每档约 n/4）。偏斜是泄题漏洞。
  const dist = [0, 0, 0, 0];
  for (const q of data) if (typeof q.correctIdx === 'number' && q.correctIdx >= 0 && q.correctIdx < 4) dist[q.correctIdx]++;
  const per = data.length / 4;
  const lo = Math.floor(per * 0.55);   // 允许 ±45% 波动
  const hi = Math.ceil(per * 1.45);
  const skew = dist.some(c => c < lo || c > hi);
  if (skew) {
    errors.push(`答案位置分布失衡 [①②③④]=${dist.join('/')}（每档应约 ${Math.round(per)}，允许 ${lo}~${hi}）——跑 topik-rebalance-answers.mjs 修复`);
  }

  // 与 exam-sets.json 对齐
  const suffix = levelSuffix; // I | II
  const num = fileBase.split('-')[0].slice(1); // E11 -> 11
  const setId = `topik-e${num}-${suffix}`;
  const es = examSets.find(e => e.id === setId);
  if (!es) {
    warns.push(`exam-sets.json 尚无条目 ${setId}（生成完 10 份后统一写入）`);
  } else {
    const declared = es.sections.flatMap(s => s.questionIds);
    const actual = data.map(q => q.id);
    const declaredSet = new Set(declared);
    const actualSet = new Set(actual);
    for (const id of declared) if (!actualSet.has(id)) errors.push(`exam-sets 声明的 ${id} 在题库文件中缺失`);
    for (const id of actual) if (!declaredSet.has(id)) errors.push(`题库文件中的 ${id} 未在 exam-sets 声明`);
  }

  return { errors, warns };
}

function main() {
  const args = process.argv.slice(2);
  let targets = args;
  if (args.includes('--all')) {
    targets = fs.readdirSync(QDIR).filter(f => /^E\d+-I{1,2}\.json$/.test(f)).map(f => f.replace('.json', ''));
  }
  if (targets.length === 0) {
    console.error('用法: node scripts/topik-validate-e.mjs E11-I [E11-II ...] | --all');
    process.exit(2);
  }
  const examSets = JSON.parse(fs.readFileSync(EXAM_SETS, 'utf8'));

  let totalErr = 0, totalWarn = 0;
  for (const t of targets) {
    const { errors, warns } = validateFile(t, examSets);
    totalErr += errors.length;
    totalWarn += warns.length;
    if (errors.length === 0 && warns.length === 0) {
      console.log(`✅ ${t}: PASS`);
    } else {
      console.log(`\n${errors.length ? '❌' : '⚠️ '} ${t}: ${errors.length} 错 / ${warns.length} 警`);
      errors.forEach(e => console.log('   ERR  ' + e));
      warns.forEach(w => console.log('   warn ' + w));
    }
  }
  console.log(`\n=== 汇总: ${targets.length} 卷, ${totalErr} 错, ${totalWarn} 警 ===`);
  process.exit(totalErr > 0 ? 1 : 0);
}

main();
