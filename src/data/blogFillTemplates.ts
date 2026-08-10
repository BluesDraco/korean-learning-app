// 填空模式句型库：按用户日记 Day 分三档难度，每档 5 个模板。
// {} 表示一个空格，用户只填关键词；grammar 作为 targetGrammar 传给评分器。
export interface FillTemplate {
  [k: string]: unknown;
  id: string;
  grammar: string;    // 目标句型标签（评分器据此判断有没有用上）
  template: string;   // 用 {} 标记空格，如 '오늘은 {}에 갔어요.'
  blanks: string[];   // 每个 {} 的中文提示（占位说明），个数须与 {} 相同
}

// Day 1-10：最简单的助词/基本句型
const BEGINNER: FillTemplate[] = [
  { id: 'b1', grammar: '~에 가다', template: '오늘은 {}에 갔어요.', blanks: ['地点'] },
  { id: 'b2', grammar: '~에서 ~을/를 먹다', template: '{}에서 {}을/를 먹었어요.', blanks: ['地点', '食物'] },
  { id: 'b3', grammar: '~을/를 좋아하다', template: '저는 {}을/를 좋아해요.', blanks: ['喜欢的东西'] },
  { id: 'b4', grammar: '날씨 표현', template: '오늘 날씨가 {}.', blanks: ['天气怎么样 (예: 좋아요)'] },
  { id: 'b5', grammar: '~와/과 함께', template: '{}와/과 함께 {}.', blanks: ['和谁', '做了什么'] },
];

// Day 11-30：意愿/决定/因果等中级句型
const INTERMEDIATE: FillTemplate[] = [
  { id: 'm1', grammar: '~고 싶다', template: '저는 {}고 싶어요.', blanks: ['想做的事 (동사)'] },
  { id: 'm2', grammar: '~기로 하다', template: '내일 {}기로 했어요.', blanks: ['决定做的事'] },
  { id: 'm3', grammar: '~아서/어서', template: '{}아서/어서 {}.', blanks: ['原因', '结果'] },
  { id: 'm4', grammar: '~는 것', template: '저는 {}는 것을 좋아해요.', blanks: ['喜欢做的事 (동사)'] },
  { id: 'm5', grammar: '~(으)면', template: '{}면 {}.', blanks: ['条件', '结果'] },
];

// Day 31+：转折/让步/书面语等高级句型
const ADVANCED: FillTemplate[] = [
  { id: 'a1', grammar: '~는데', template: '{}는데 {}.', blanks: ['铺垫/背景', '转折或结果'] },
  { id: 'a2', grammar: '~뿐만 아니라', template: '{}뿐만 아니라 {}.', blanks: ['不仅', '而且'] },
  { id: 'a3', grammar: '~기 때문에', template: '{}기 때문에 {}.', blanks: ['原因', '结果'] },
  { id: 'a4', grammar: '~더라도', template: '{}더라도 {}.', blanks: ['即使', '也要/也会'] },
  { id: 'a5', grammar: '~(으)ㄴ 편이다', template: '저는 {}(으)ㄴ 편이에요.', blanks: ['偏向于怎样'] },
];

// 按 Day 取对应难度的一组模板
export function templatesForDay(day: number): FillTemplate[] {
  if (day >= 31) return ADVANCED;
  if (day >= 11) return INTERMEDIATE;
  return BEGINNER;
}

// 把模板按 {} 切成文本片段：N 个空 → N+1 个文本片段（可能含空串）
export function splitTemplate(template: string): string[] {
  return template.split('{}');
}

// 用用户填的值拼回完整句子（空的地方留占位符号，供预览提示）
export function composeFilled(template: string, values: string[]): string {
  const parts = splitTemplate(template);
  let out = '';
  parts.forEach((p, i) => {
    out += p;
    if (i < parts.length - 1) out += values[i]?.trim() || '____';
  });
  return out;
}
