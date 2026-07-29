// P0 修复：10 处硬错
// 输入：public/data/topik/questions.json
// 输出：同上（原地修改），改动统计打印

import fs from 'fs';
const path = 'C:/Users/Administrator/Desktop/korean-learning-app/public/data/topik/questions.json';
const arr = JSON.parse(fs.readFileSync(path, 'utf8'));
const src = Array.isArray(arr) ? arr : Object.values(arr);
const byId = Object.fromEntries(src.map(q => [q.id, q]));

const swap = (a, i, j) => { const t = a[i]; a[i] = a[j]; a[j] = t; };

const log = [];

// ============ A5 图片题错位（3处）============
// T37I-L15: options[0]↔options[3], imageDescriptions[0]↔imageDescriptions[3]
// 保留编号前缀 "①"、"④"，交换内容
{
  const q = byId['T37I-L15'];
  q.options = [
    '①女子和男子在收银台结账',
    '②男子拿着菜单递给女子，向女子推荐',
    '③女子和男子各自吃自己面前的菜',
    '④女子拿着菜单递给男子，向男子推荐',
  ];
  q.imageDescriptions = [
    '两人在柜台前付款',
    '男子手持菜单向女子推荐',
    '两人各自低头吃饭，无互动',
    '女子手持菜单指着某道菜，向男子推荐',
  ];
  log.push('T37I-L15: options/imageDescriptions [0]↔[3] 交换内容（保留编号）');
}

// T37I-L16: options[0]↔options[2], imageDescriptions[0]↔imageDescriptions[2]
{
  const q = byId['T37I-L16'];
  q.options = [
    '①女子和男子一起买衣服试穿',
    '②男子在试戴眼镜，女子在旁边',
    '③女子在试戴眼镜，男子（店员）在旁边',
    '④女子在镜子前化妆',
  ];
  q.imageDescriptions = [
    '两人在试穿衣服',
    '男子戴眼镜照镜子，女子在旁边',
    '女子戴着眼镜照镜子，店员男子在旁边',
    '女子化妆',
  ];
  log.push('T37I-L16: options/imageDescriptions [0]↔[2] 交换内容（保留编号）');
}

// T41I-L16: options[0]↔options[2], imageDescriptions[0]↔imageDescriptions[2]
{
  const q = byId['T41I-L16'];
  q.options = [
    '①两人一起合唱',
    '②男子在台上弹吉他演出',
    '③女子拿着吉他求男子教她，男子拍椅子让她坐下',
    '④女子在练琴，男子在旁边听',
  ];
  q.imageDescriptions = [
    '两人合唱',
    '男子在舞台演出',
    '女子拿着吉他向男子求教，男子让她坐下',
    '女子练琴，男子旁听',
  ];
  log.push('T41I-L16: options/imageDescriptions [0]↔[2] 交换内容（保留编号）');
}

// ============ A2 段落截断（1处）============
// T52I-R61: prompt 补末句 「여권을 안 가져온 사람들에게 여권을 만들어 주기도 합니다.」
{
  const q = byId['T52I-R61'];
  const oldPrompt = q.prompt;
  // 在 "겨울옷을 맡아 주는 곳도 있습니다." 之后加句
  const insertAfter = '겨울옷을 맡아 주는 곳도 있습니다.';
  const insertText = ' 여권을 안 가져온 사람들에게 여권을 만들어 주기도 합니다.';
  if (!oldPrompt.includes(insertAfter)) throw new Error('T52I-R61 未找到插入锚点');
  q.prompt = oldPrompt.replace(insertAfter, insertAfter + insertText);
  log.push('T52I-R61: prompt 补入여권句子');
}

// ============ B4 vocabulary（6处）============
// T37I-R47: 취업 → 일하다
{
  const q = byId['T37I-R47'];
  q.vocabulary = q.vocabulary.map(w => w === '취업' ? '일하다' : w);
  log.push('T37I-R47: vocabulary 취업 → 일하다');
}

// T37I-R67: 수분 → 막다
{
  const q = byId['T37I-R67'];
  q.vocabulary = q.vocabulary.map(w => w === '수분' ? '막다' : w);
  log.push('T37I-R67: vocabulary 수분 → 막다');
}

// T41I-R40: 온도 → 덥다
{
  const q = byId['T41I-R40'];
  q.vocabulary = q.vocabulary.map(w => w === '온도' ? '덥다' : w);
  log.push('T41I-R40: vocabulary 온도 → 덥다');
}

// T41I-R42: 가격 → 값
{
  const q = byId['T41I-R42'];
  q.vocabulary = q.vocabulary.map(w => w === '가격' ? '값' : w);
  log.push('T41I-R42: vocabulary 가격 → 값');
}

// T41I-R49: 운동방 → 운동하는 방
{
  const q = byId['T41I-R49'];
  q.vocabulary = q.vocabulary.map(w => w === '운동방' ? '운동하는 방' : w);
  log.push('T41I-R49: vocabulary 운동방 → 운동하는 방');
}

// T52I-L04: 직업 → 멋있다
{
  const q = byId['T52I-L04'];
  q.vocabulary = q.vocabulary.map(w => w === '직업' ? '멋있다' : w);
  log.push('T52I-L04: vocabulary 직업 → 멋있다');
}

// ============ 写回 ============
fs.writeFileSync(path, JSON.stringify(src, null, 2), 'utf8');
console.log('修改条目:');
log.forEach((l,i)=>console.log(' ',(i+1)+'.',l));
console.log('\n总计:',log.length,'处');
