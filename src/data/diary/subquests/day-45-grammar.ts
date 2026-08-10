import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 45 · 2-3 문법 탐험 · ~보다 (더) 比较 */
export const day45Grammar: GrammarSubQuestData = {
  day: 15, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '比___更___：~보다 (더)',

  fix: [
    { id: 'd45-g3-f1', promptKo: '저보다 준호가 한국어를 더 잘해요.',    promptZh: '"我比 Junho 韩语更好"哪句正确？',                     choices: [{ text: '저보다 준호가 한국어를 더 잘해요.',   correct: false }, { text: '저는 준호보다 한국어를 더 잘해요.', correct: true }, { text: '준호보다 제가 한국어에 더 잘해요.',  correct: false }, { text: '저는 준호에서 한국어를 더 잘해요.',      correct: false }], explain: '主语 은/는 + 比较对象 보다（不要反）' },
    { id: 'd45-g3-f2', promptKo: '오늘이 어제보다 더 춥어요.',            promptZh: '"今天比昨天更冷"哪句正确？',                          choices: [{ text: '오늘이 어제보다 더 춥어요.',           correct: false }, { text: '오늘이 어제보다 더 추워요.',        correct: true }, { text: '오늘이 어제에 더 추워요.',             correct: false }, { text: '오늘은 어제보다 더 춥아요.',           correct: false }], explain: '춥다 ㅂ 不规则 → **추워요**' },
    { id: 'd45-g3-f3', promptKo: '중간고사가 초급 시험에 어려웠어요.',    promptZh: '"期中考比初级更难"哪句正确？',                      choices: [{ text: '중간고사가 초급 시험에 어려웠어요.',    correct: false }, { text: '중간고사가 초급 시험보다 어려웠어요.', correct: true }, { text: '중간고사보다 초급 시험이 어려웠어요.',  correct: false }, { text: '중간고사는 초급 시험이 어려웠어요.',     correct: false }], explain: '比较对象 + **보다**（不用 에）' },
    { id: 'd45-g3-f4', promptKo: '커피가 차보다 더 좋아요.',              promptZh: '"比起咖啡，更喜欢茶"哪句正确？',                      choices: [{ text: '커피가 차보다 더 좋아요.',              correct: false }, { text: '차가 커피보다 더 좋아요.',           correct: true }, { text: '커피에서 차가 더 좋아요.',             correct: false }, { text: '커피는 차가 더 좋아요.',                 correct: false }], explain: '喜欢的对象 → 主语 이/가 · 被比较对象 → 보다' },
    { id: 'd45-g3-f5', promptKo: '한국어가 30일 전보다 늘고 있어요.',      promptZh: '~보다 前面能不能接动词？下列哪句最准确？',              choices: [{ text: '~보다 앞에 동사가 직접 올 수 있어요.',   correct: false }, { text: '~보다 앞에 **명사만** 올 수 있어요 · 동사는 ~는 것보다 형식',   correct: true }, { text: '~보다 只用于形容词句',                      correct: false }, { text: '~보다 只用于过去时',                     correct: false }], explain: '노래를 부르는 것보다 듣는 게 좋아요 · 动词转 ~는 것' },
  ],

  compose: [
    { id: 'd45-g3-c1', zhHint: '我比 30 天前韩语更好。',              audioKo: '저는 30일 전보다 한국어를 더 잘해요.',      answer: ['저는', '30일 전보다', '한국어를', '더 잘해요.'],       tokens: ['저는', '30일 전보다', '한국어를', '더 잘해요.', '더 못해요.', '한국어가', '30일 전에', '30일 전을'], explain: 'Tori 试卷原句' },
    { id: 'd45-g3-c2', zhHint: '今天比昨天更冷。',                    audioKo: '오늘이 어제보다 더 추워요.',                 answer: ['오늘이', '어제보다', '더', '추워요.'],                  tokens: ['오늘이', '어제보다', '더', '추워요.', '오늘보다', '어제가', '춥어요.', '많이'],                         explain: '주어 + 비교대상 + 더 + 형용사' },
    { id: 'd45-g3-c3', zhHint: '比起咖啡，更喜欢茶。',                audioKo: '차가 커피보다 더 좋아요.',                   answer: ['차가', '커피보다', '더', '좋아요.'],                    tokens: ['차가', '커피보다', '더', '좋아요.', '커피가', '차보다', '커피에서', '싫어요.'],                       explain: '主语 = 更喜欢的对象' },
    { id: 'd45-g3-c4', zhHint: '期中考比初级考试更难。',            audioKo: '중간고사가 초급 시험보다 어려웠어요.',       answer: ['중간고사가', '초급 시험보다', '어려웠어요.'],           tokens: ['중간고사가', '초급 시험보다', '어려웠어요.', '초급 시험이', '중간고사보다', '어려웠', '더', '쉬웠어요.'], explain: '~보다 后可接过去时' },
  ],

  rule: [
    { id: 'd45-g3-r1', promptZh: '关于「~보다 (더)」的用法，哪句最准确？', choices: [{ text: '主语 이/가 (은/는) + 比较对象 + **보다** + (더) + 형용사/동사', correct: true }, { text: '主语用 보다',       correct: false }, { text: '~보다 只用于形容词', correct: false }, { text: '~보다 是过去时',   correct: false }], explain: '저는 준호보다 커요 = 我比 Junho 高' },
    { id: 'd45-g3-r2', promptZh: '关于「더」的省略，哪句最准确？',        choices: [{ text: '~보다 本身已含"比"意 · **더 可省** · 加了更强调', correct: true }, { text: '더 是必需的',         correct: false }, { text: '더 是敬语',         correct: false }, { text: '더 是过去时',        correct: false }], explain: '커피보다 차가 좋아요（더 省）也对' },
    { id: 'd45-g3-r3', promptZh: '关于「主语 vs 比较对象」的位置，哪句最准确？', choices: [{ text: '主语 = 更 XX 的对象；比较对象 = 被拿来比的 · 位置**不能反**', correct: true }, { text: '主语和比较对象可任意',      correct: false }, { text: '~보다 必须放句首',         correct: false }, { text: '主语必须是名词短语',           correct: false }], explain: '저는 준호보다 커요 vs 저보다 준호가 커요 = 意思相反' },
    { id: 'd45-g3-r4', promptZh: '关于「~보다」前接动词，哪句最准确？',   choices: [{ text: '~보다 前只接名词；动词需转 **~는 것보다** 形式', correct: true }, { text: '~보다 前可直接接动词',      correct: false }, { text: '~보다 前只能接形容词',       correct: false }, { text: '~보다 前必须接过去时',         correct: false }], explain: '노래를 부르는 것보다 듣는 게 좋아 = 比起唱更喜欢听' },
  ],
};
