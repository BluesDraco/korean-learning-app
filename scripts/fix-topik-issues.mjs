import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');
const file = path.join(ROOT, 'public/data/topik/questions.json');
const data = JSON.parse(fs.readFileSync(file, 'utf8'));

const updates = [
  {
    id: 'T35II-R39',
    fields: {
      correctIdx: 0,
      explanation: '示例句首「이를 방지하기 위해」中「이를」指代前文出现的"야간 사고"，应紧接 ㉠ 位置（先讲事故→再讲使用反射涂料防止→然后 ㉡ 讲增强反射用 유리알 페인트）。放在 ㉡ 会把"使用普通反射涂料"倒置在"增强版 유리알 페인트"之后。',
    },
  },
  {
    id: 'AR10',
    fields: {
      promptZh: '在分析现象上 _____，洞察本质更重要。',
    },
  },
  {
    id: 'BR09',
    fields: {
      promptZh: '天气预报说今天阴天，_____ 的可能性很高。',
    },
  },
  {
    id: 'BR16',
    fields: {
      promptZh: '_____ 韩国，想把韩语说得更好。',
    },
  },
];

for (const u of updates) {
  const q = data.find(x => x.id === u.id);
  if (!q) { console.error('NOT FOUND:', u.id); continue; }
  for (const [k, v] of Object.entries(u.fields)) {
    console.log(`[${u.id}] ${k}: ${JSON.stringify(q[k]).slice(0, 80)} -> ${JSON.stringify(v).slice(0, 80)}`);
    q[k] = v;
  }
}

fs.writeFileSync(file, JSON.stringify(data, null, 2));
console.log('OK');
