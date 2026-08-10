/**
 * 修正 scenePreview 文件中：
 * 1. tags: [] → 从 group context 推导有意义的标签
 * 2. pos: 'noun' → 根据 ko 字段修正为 verb/adj/expr/adv
 */
const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../src/data/scenePreview');

// 从 context 字符串提取核心标签（4字以内）
function ctxToTag(ctx) {
  if (!ctx) return null;
  // 直接是短语 + 时 → 保留
  const trimmed = ctx.endsWith('时') ? ctx.slice(0, -1) : ctx;
  // 常见动作关键词提取
  const keywords = [
    '点单','购药','结账','描述症状','询问症状','说症状','购物','砍价','换汇','挂号','借书',
    '换乘','办理','试穿','预约','点餐','找路','问路','入住','购票','使用时机','日常对话',
    '告知','问价','要求','购买','付款','申报','说明','询问','确认','找寻',
    '就诊','看病','入店','入场','问候','互动','应援','感谢','介绍','表达',
    '乘坐','使用','考试','演讲','辩论','谈判','交涉',
  ];
  for (const kw of keywords) {
    if (trimmed.includes(kw)) return kw + '时';
  }
  // fallback: 取最后3-4个字
  if (trimmed.length <= 4) return trimmed + '时';
  return trimmed.slice(-4) + '时';
}

// 根据韩语 ko 字段判断词性
function inferPos(ko) {
  if (!ko) return 'noun';
  const k = ko.trim();

  // 多词表达（含空格或多个词）→ expr
  if (k.includes(' ') && k.length > 4) return 'expr';

  // 以 다 结尾 → 动词或形容词
  if (k.endsWith('다')) {
    // 形容词（状态/性质）
    const adjRoots = ['크', '작', '맵', '달', '짜', '쓰', '시', '좋', '나쁘', '비싸', '싸',
      '높', '낮', '많', '적', '길', '짧', '넓', '좁', '무겁', '가볍', '따뜻하', '뜨겁',
      '차갑', '시원하', '빠르', '느리', '어지럽', '피곤하', '바삭하', '부드럽', '짭짤하'];
    if (adjRoots.some(r => k.startsWith(r) || k.slice(0, -1).endsWith(r.replace('하', '')))) return 'adj';
    // 형용사 하다 파생어 (e.g. 심하다, 필요하다, 중요하다)
    if (k.endsWith('하다') && k.length > 3) {
      const adjHada = ['심','필요','중요','안전','불편','편','자유','감사','행복','슬','기쁘'];
      const stem = k.slice(0, -2);
      if (adjHada.includes(stem)) return 'adj';
    }
    return 'verb';
  }

  // 명사 파생 표현（주세요, 해요, 돼요 등 포함 안 됨）
  return 'noun';
}

let totalChanged = 0;
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

for (const file of files) {
  const slug = file.replace('.ts', '');
  if (slug === 'haru-cafe') continue; // skip — fully enriched

  const fp = path.join(dir, file);
  const txt = fs.readFileSync(fp, 'utf8');
  const orig = txt;

  // 提取每个 group 的 context，然后为该 group 的每个 tags: [] 添加标签
  // 策略：按 context 行位置顺序处理
  const lines = txt.split('\n');
  const outLines = [];
  let currentGroupTag = null;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // 捕获 group context
    const ctxMatch = line.match(/^\s+context: '([^']+)',/);
    if (ctxMatch) {
      currentGroupTag = ctxToTag(ctxMatch[1]);
    }

    // 修正 tags: []
    const tagsMatch = line.match(/^(\s+)(pos: 'noun', tier: 'core', tags: \[\],)$/);
    if (tagsMatch && currentGroupTag) {
      // 提取当前行缩进 + ko 值（从前几行找）
      let koVal = '';
      for (let back = i - 1; back >= Math.max(0, i - 5); back--) {
        const koLine = lines[back].match(/ko: '([^']+)'/);
        if (koLine) { koVal = koLine[1]; break; }
      }
      const detectedPos = inferPos(koVal);
      const tagStr = `[\'${currentGroupTag}\']`;
      outLines.push(line
        .replace("pos: 'noun'", `pos: '${detectedPos}'`)
        .replace('tags: []', `tags: ${tagStr}`)
      );
      continue;
    }

    outLines.push(line);
  }

  const newTxt = outLines.join('\n');
  if (newTxt !== orig) {
    fs.writeFileSync(fp, newTxt, 'utf8');
    totalChanged++;
    console.log('✅ ' + file);
  }
}

console.log(`\nDone: ${totalChanged} files updated`);
