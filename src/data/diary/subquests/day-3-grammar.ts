import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 3 · 1-3 语法关 · 主格助词 이/가
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 教学梯度：
 *   fix 逐条揪 짐가/집이/짐을 之类真实翻车（主格 vs 宾格 vs 收音判断）
 *   → compose 从「제 짐이 무거워요」这种 Day 3 主流程句型入手
 *   → rule 抽象出 有收音 이 / 无收音 가 / 이/가 vs 은/는 差别
 *
 * 承上（Day 2 을/를）启下（Day 5 은/는）：三大助词的对比在 Day 5 完整收束
 */
export const day3Grammar: GrammarSubQuestData = {
  day: 3, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握主格助词 이/가 —— 谁怎么样/在哪',

  // ─── 助词改错：给错句 → 选正确写法 ───
  fix: [
    {
      id: 'd03-g3-f1',
      promptKo: '제 짐가 무거워요.',
      promptZh: '下列哪个句子是正确的？',
      choices: [
        { text: '제 짐가 무거워요.', correct: false },
        { text: '제 짐이 무거워요.', correct: true },
        { text: '제 짐을 무거워요.', correct: false },
        { text: '제 짐는 무거워요.', correct: false },
      ],
      explain: '「짐」末字有收音 ㅁ → 主格助词用 이。무거워요 是形容词，前面用主格不用宾格',
    },
    {
      id: 'd03-g3-f2',
      promptKo: '가방이 어디예요?',
      promptZh: '哪句正确？',
      choices: [
        { text: '가방은 어디예요?', correct: false },
        { text: '가방을 어디예요?', correct: false },
        { text: '가방이 어디예요?', correct: true },
        { text: '가방에 어디예요?', correct: false },
      ],
      explain: '问「东西在哪里」用主格 이/가。가방 末字有收音 ㅇ → 이。用 은 会变成主题助词，语感变了',
    },
    {
      id: 'd03-g3-f3',
      promptKo: '택시가 있어요.',
      promptZh: '"有出租车"哪句正确？',
      choices: [
        { text: '택시이 있어요.', correct: false },
        { text: '택시가 있어요.', correct: true },
        { text: '택시을 있어요.', correct: false },
        { text: '택시는 있어요.', correct: false },
      ],
      explain: '택시 末字 시 无收音 → 主格用 가。「있어요」前一律用主格 이/가，不用宾格 을/를',
    },
    {
      id: 'd03-g3-f4',
      promptKo: '집는 여기예요.',
      promptZh: '"家在这里"哪句最自然？',
      choices: [
        { text: '집는 여기예요.', correct: false },
        { text: '집은 여기예요.', correct: true },
        { text: '집가 여기예요.', correct: false },
        { text: '집을 여기예요.', correct: false },
      ],
      explain: '집 末字有收音 ㅂ → 主题助词用 은（不是 는）。这里用主题助词强调"家（这个话题）"',
    },
    {
      id: 'd03-g3-f5',
      promptKo: '언니가 도와주세요.',
      promptZh: '想请姐姐帮忙，最自然的说法是？',
      choices: [
        { text: '언니가 도와주세요.', correct: false },
        { text: '언니를 도와주세요.', correct: false },
        { text: '언니, 좀 도와주세요.', correct: true },
        { text: '언니는 도와주세요.', correct: false },
      ],
      explain: '「도와주세요」是请求对方帮我，主语是对方（隐藏）。直接呼语 언니 + 좀 도와주세요 最自然',
    },
  ],

  // ─── 组句：词块拼完整句 ───
  compose: [
    {
      id: 'd03-g3-c1',
      zhHint: '我的行李太重了。',
      audioKo: '제 짐이 너무 무거워요.',
      answer: ['제', '짐이', '너무', '무거워요.'],
      tokens: ['제', '짐이', '너무', '무거워요.', '집이', '가벼워요.'],
      explain: '짐(有收音 ㅁ) + 이(主格) + 너무(太) + 무거워요',
    },
    {
      id: 'd03-g3-c2',
      zhHint: '包在哪里？',
      audioKo: '가방이 어디예요?',
      answer: ['가방이', '어디예요?'],
      tokens: ['가방이', '어디예요?', '가방을', '가방은', '뭐예요?'],
      explain: '가방(有收音 ㅇ) + 이。「어디예요?」前用主格。「가방을」是宾格（错），「가방은」变主题（语感变）',
    },
    {
      id: 'd03-g3-c3',
      zhHint: '不好意思，请帮个忙。',
      audioKo: '저기요, 좀 도와주세요.',
      answer: ['저기요,', '좀', '도와주세요.'],
      tokens: ['저기요,', '좀', '도와주세요.', '주세요.', '감사합니다.', '언니'],
      explain: '저기요(开场) + 좀(缓和语气) + 도와주세요(请帮我)。留学生保命句公式',
    },
    {
      id: 'd03-g3-c4',
      zhHint: '姐姐，真的非常感谢。',
      audioKo: '언니, 정말 감사합니다.',
      answer: ['언니,', '정말', '감사합니다.'],
      tokens: ['언니,', '정말', '감사합니다.', '괜찮아요.', '미안해요.', '오빠,'],
      explain: '언니(呼语) + 정말(真的) + 감사합니다。정말 加倍真诚度',
    },
  ],

  // ─── 规则理解选择 ───
  rule: [
    {
      id: 'd03-g3-r1',
      promptZh: '"짐"（末字有收音 ㅁ），做主语说"行李很重"应该加？',
      choices: [
        { text: '이（主格）', correct: true },
        { text: '가（主格）', correct: false },
        { text: '을（宾格）', correct: false },
        { text: '는（主题）', correct: false },
      ],
      explain: '主格助词：有收音 → 이，无收音 → 가。「무거워요」这种形容词前用主格',
    },
    {
      id: 'd03-g3-r2',
      promptZh: '"택시"（末字无收音）做主语，应该加？',
      choices: [
        { text: '이', correct: false },
        { text: '가', correct: true },
        { text: '은', correct: false },
        { text: '를', correct: false },
      ],
      explain: '무收音 → 主格 가。「택시가 있어요」= 有出租车',
    },
    {
      id: 'd03-g3-r3',
      promptZh: '关于「이/가」和「은/는」的区别，下面哪句是对的？',
      choices: [
        { text: '两个完全一样，随便用。', correct: false },
        { text: '이/가 用于"新信息 / 陈述客观状态"，은/는 用于"对比 / 强调主题"。', correct: true },
        { text: '이/가 只用于问句，은/는 只用于陈述句。', correct: false },
        { text: '이/가 是宾格助词，은/는 是主格助词。', correct: false },
      ],
      explain: '이/가 用于"陈述新信息/焦点"（짐이 무거워요、택시가 있어요），은/는 用于"提出话题"（저는 학생이에요）。同一句里也能并存：저는 커피가 좋아요',
    },
    {
      id: 'd03-g3-r4',
      promptZh: '"包在哪里？"哪句最自然？',
      choices: [
        { text: '가방은 어디예요?', correct: false },
        { text: '가방을 어디예요?', correct: false },
        { text: '가방이 어디예요?', correct: true },
        { text: '가방에 어디예요?', correct: false },
      ],
      explain: '「어디예요?」问位置，主语用主格 이/가。가방 有收音 ㅇ → 이',
    },
  ],
};
