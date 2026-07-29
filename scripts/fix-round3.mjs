// scripts/fix-round3.mjs
// 修复第三轮发现的：
// 1) scenarios.context 韩文术语 → 中文
// 2) mistakes.note "动词는/名词에"等 → 韩文 동사/명사 + 助词

import { readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dataDir = path.resolve(__dirname, '..', 'src', 'data');

// 韩文术语 → 中文（在 context 字段）
const KO_TO_CN_TERM = [
  ['시간', '时间'],
  ['조건', '条件'],
  ['정보', '信息'],
  ['도움', '帮助'],
  ['준비', '准备'],
  ['주의', '注意'],
  ['이동', '移动'],
  ['결과', '结果'],
  ['공간', '空间'],
  ['생각', '想法'],
  ['사실', '事实'],
];

// 中文术语+助词 → 韩文术语+助词（在 note 字段）
const CN_TO_KO_PARTICLE = [
  ['动词는', '동사는'],
  ['动词에', '동사에'],
  ['动词를', '동사를'],
  ['动词이', '동사이'],
  ['动词을', '동사를'],  // 动词+을 -> 동사+를（一般 동사 无받침）
  ['形容词는', '형용사는'],
  ['形容词이', '형용사가'],  // 형용사 + 가
  ['形容词에', '형용사에'],
  ['形容词를', '형용사를'],
  ['名词만', '명사만'],
  ['名词에', '명사에'],
  ['名词이', '명사이'],
  ['名词는', '명사는'],
  ['名词을', '명사을'],
  ['副词는', '부사는'],
  ['主语는', '주어는'],
  ['主语에', '주어에'],
  ['宾语에', '목적어에'],
  ['谓语에', '서술어에'],
];

const files = ['p1','p2','p3','p4','p5','p6','p7','p8','p9','p10','p11','p12','p13','p14'];
let total = 0;

for (const p of files) {
  const file = path.join(dataDir, `grammar-cards-${p}.ts`);
  let src = readFileSync(file, 'utf8');
  let count = 0;

  // 1) 改 context 字段
  // 形如 context: '约시간' / context: 'KPOP 굿즈'
  src = src.replace(/(context:\s*')([^']*)(')/g, (m, pre, val, suf) => {
    let nv = val;
    for (const [ko, cn] of KO_TO_CN_TERM) {
      nv = nv.split(ko).join(cn);
    }
    // 全韩文场景标签也转为中文（如"KPOP 굿즈"→"KPOP 周边"等）
    const KO_SCENE_TO_CN = {
      'KPOP 굿즈': 'KPOP 周边',
      'KPOP 가사': 'KPOP 歌词',
      'KPOP 앨범': 'KPOP 专辑',
      '시험 준비': '考试准备',
      '일상 대화': '日常对话',
      '강조 이나': '强调用法 이나',
    };
    if (KO_SCENE_TO_CN[nv]) nv = KO_SCENE_TO_CN[nv];
    if (nv !== val) count++;
    return pre + nv + suf;
  });

  // 2) 改 note/wrong/correct 内的 "中文术语+韩文助词"
  src = src.replace(/(note:\s*'|wrong:\s*'|correct:\s*')([^']*)(')/g, (m, pre, val, suf) => {
    let nv = val;
    for (const [cn, ko] of CN_TO_KO_PARTICLE) {
      nv = nv.split(cn).join(ko);
    }
    if (nv !== val) count++;
    return pre + nv + suf;
  });

  // 3) 改 connectionRules text/examples / specialQuiz explanation 内的 中文术语+助词
  src = src.replace(/(text:\s*'|examples:\s*'|explanation:\s*')([^']*)(')/g, (m, pre, val, suf) => {
    let nv = val;
    for (const [cn, ko] of CN_TO_KO_PARTICLE) {
      nv = nv.split(cn).join(ko);
    }
    if (nv !== val) count++;
    return pre + nv + suf;
  });

  if (count > 0) {
    writeFileSync(file, src);
    console.log(`${p}: ${count} fixes`);
    total += count;
  }
}

console.log(`\nTotal: ${total}`);
