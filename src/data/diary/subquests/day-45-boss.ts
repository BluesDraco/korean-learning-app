import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 45 · 2-5 Boss 战 · 📄 中级月考 */
export const day45Boss: BossSubQuestData = {
  day: 15, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '중간의 관문',
  subtitle: '📄 305 号教室 · 期中考试',
  intro: '早上 10 点，试卷发下来。你翻开第一页 —— 咦？都会。第二页 —— 也会。第三页作文题 "당신은 30일 동안 무엇이 변했습니까?"（这 30 天你有什么变化？）你合上笔，深吸一口气，开始写。今天要用 ~보다 说清 "现在的自己"和"30 天前的自己"之间的距离。',
  outroHook: '85 점, 합격. 火鹤老师在你试卷上画了个笑脸。走出教室，兽尔的秋风灌进衣领。心里默默说了一句 —— 저 진짜 많이 늘었어요.',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd45-b5-t1', audioKo: '저는 30일 전보다 한국어를 더 잘해요.', choices: [{ text: '我比 30 天前韩语更好。',        correct: true }, { text: '我 30 天前韩语更好。',              correct: false }, { text: '30 天前不会韩语。',                    correct: false }, { text: '30 天后不会说韩语。',                    correct: false }], explain: 'Tori 试卷原句' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd45-b5-t2', audioKo: '토리, 진짜 많이 늘었네요.',            choices: [{ text: '兔莉，真的进步很多呢。',        correct: true }, { text: '兔莉，好好加油。',                  correct: false }, { text: '兔莉，考试很难。',                      correct: false }, { text: '兔莉，没进步。',                        correct: false }], explain: '火鹤老师 ~네요 感叹' } },
    { type: 'choice',  label: '主语位置',     task: { id: 'd45-b5-t3', promptZh: '"我比 Junho 韩语更好"哪句正确？',                                                                                                    choices: [{ text: '저보다 준호가 한국어를 더 잘해요.',   correct: false }, { text: '저는 준호보다 한국어를 더 잘해요.', correct: true }, { text: '준호보다 제가 한국어에 더 잘해요.',  correct: false }, { text: '저는 준호에서 한국어를 더 잘해요.',       correct: false }], explain: '主语 + 比较对象 보다 · 位置不能反' } },
    { type: 'choice',  label: 'ㅂ 不规则',    task: { id: 'd45-b5-t4', promptZh: '"今天比昨天更冷"哪句正确？',                                                                                                          choices: [{ text: '오늘이 어제보다 더 춥어요.',        correct: false }, { text: '오늘이 어제보다 더 추워요.',        correct: true }, { text: '오늘이 어제에 더 추워요.',             correct: false }, { text: '오늘은 어제에서 더 추워요.',              correct: false }], explain: '춥다 → 추워요' } },
    { type: 'choice',  label: '认词',         task: { id: 'd45-b5-t5', promptKo: '합격', promptHangul: 'hap-gyeok',                                                                                                    choices: [{ text: '合格',                    correct: true }, { text: '及格线',            correct: false }, { text: '不合格',            correct: false }, { text: '重考',                     correct: false }], explain: '合(합) + 格(격)' } },
    { type: 'compose', label: '组句',         task: { id: 'd45-b5-t6', zhHint: '我比 30 天前韩语更好。',                                                                                                                audioKo: '저는 30일 전보다 한국어를 더 잘해요.',      answer: ['저는', '30일 전보다', '한국어를', '더 잘해요.'],       tokens: ['저는', '30일 전보다', '한국어를', '더 잘해요.', '더 못해요.', '한국어가', '30일 전에', '30일 전을'], explain: 'Tori 试卷原句' } },
    { type: 'compose', label: '组句',         task: { id: 'd45-b5-t7', zhHint: '比起咖啡，更喜欢茶。',                                                                                                                  audioKo: '차가 커피보다 더 좋아요.',                   answer: ['차가', '커피보다', '더', '좋아요.'],                    tokens: ['차가', '커피보다', '더', '좋아요.', '커피가', '차보다', '커피에서', '싫어요.'],                       explain: '主语 = 更喜欢的对象' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd45-b5-t8', promptZh: '火鹤老师夸你 "진짜 많이 늘었네요"。你想谦虚道谢并承诺继续努力，最自然的一句？',                                                    choices: [{ text: '감사합니다. 계속 열심히 할게요.',      correct: true }, { text: '아니에요, 별로 안 늘었어요.',                  correct: false }, { text: '저 원래 잘해요.',                            correct: false }, { text: '얼마예요?',                              correct: false }], explain: '谦虚 + 承诺形' } },
  ],
};
