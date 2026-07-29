import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 53 · 2-5 Boss 战 · 🍗 26 天后的偿还 */
export const day53Boss: BossSubQuestData = {
  day: 23, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '한턱의 관문',
  subtitle: '🍗 BBQ 치킨点 · 从被请到请人',
  intro: '弘爪街 BBQ 치킨点。四个人围着小桌，Junho 抢着说"이번엔 내가 살까?" 你摇头，笑："오늘은 내가 낼게. Day 27에 민지가 사줬으니까." 26 天前 Minji 请你吃泡菜汤，你说"다음엔 내가"。今天来了。用韩语说完点单、承诺、结账全套。',
  outroHook: 'Minji 抬头看你说 "토리, 진짜 성장했다." 你笑了，把卡递给阿姨："카드로 결제할게요." 走出店门风一吹 —— Day 27 到 Day 53，26 天。从被请客到请客，就是这么久。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd53-b5-t1', audioKo: '이모, 반반 한 마리랑 감튀 하나, 콜라 두 잔 주세요.', choices: [{ text: '阿姨，半半炸鸡一份、薯条一份、可乐两杯。', correct: true }, { text: '阿姨，可乐一份、薯条两杯。',       correct: false }, { text: '阿姨，请再等 5 分钟。',                    correct: false }, { text: '阿姨，我不吃了。',                        correct: false }], explain: 'Tori 独立点单' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd53-b5-t2', audioKo: '토리, 진짜 성장했다.',                              choices: [{ text: '兔莉，真的成长了。',                       correct: true }, { text: '兔莉，还没成长。',                        correct: false }, { text: '兔莉，长大点。',                          correct: false }, { text: '兔莉，没变。',                            correct: false }], explain: 'Minji 感叹 · 성장하다' } },
    { type: 'choice',  label: '主语规则',     task: { id: 'd53-b5-t3', promptZh: '~(으)ㄹ게요 的主语规则，哪句正确？',                                                                                                    choices: [{ text: '준호가 살게요.',                            correct: false }, { text: '주어는 반드시 나/저 · 자기 승낙만 표현', correct: true }, { text: '주어가 자유롭게 올 수 있어요.',                       correct: false }, { text: '~(으)ㄹ게요 는 형용사에도 붙어요.',                      correct: false }], explain: '~(으)ㄹ게요 只能主语 = 我' } },
    { type: 'choice',  label: '收音判定',     task: { id: 'd53-b5-t4', promptZh: '"我来吃"（有收音）哪句正确？',                                                                                                          choices: [{ text: '먹ㄹ게요.',                                correct: false }, { text: '먹을게요.',                        correct: true }, { text: '먹수 있게요.',                          correct: false }, { text: '먹을수요.',                              correct: false }], explain: '먹다 有收音 → 을게요' } },
    { type: 'choice',  label: '认词',         task: { id: 'd53-b5-t5', promptKo: '한턱 내다', promptHangul: 'han-teok nae-da',                                                                                              choices: [{ text: '请客',              correct: true }, { text: 'AA 制',          correct: false }, { text: '欠账',              correct: false }, { text: '打折',                     correct: false }], explain: 'Day 27 复习' } },
    { type: 'compose', label: '组句',         task: { id: 'd53-b5-t6', zhHint: '今天我请。Day 27 Minji 请过。',                                                                                                            audioKo: '오늘은 내가 낼게. Day 27에 민지가 사줬으니까.',   answer: ['오늘은', '내가', '낼게.', 'Day 27에', '민지가', '사줬으니까.'],  tokens: ['오늘은', '내가', '낼게.', 'Day 27에', '민지가', '사줬으니까.', '낼 거야.', 'Day 27에서', '사줬어서', '사줬지만'], explain: 'Tori 原句 · ~ㄹ게 + ~니까' } },
    { type: 'compose', label: '组句',         task: { id: 'd53-b5-t7', zhHint: '这个我帮你。',                                                                                                                          audioKo: '이건 내가 도와줄게.',                              answer: ['이건', '내가', '도와줄게.'],                                    tokens: ['이건', '내가', '도와줄게.', '도와줄 거야.', '도와줄까?', '도와줬어.', '네가'],                       explain: '반말 承诺' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd53-b5-t8', promptZh: 'Minji 说 "토리, 진짜 성장했다"。你想温柔承诺"下次真的换你们请"，最自然的一句？',                                                          choices: [{ text: '응, 다음엔 진짜 너희들이 사.',                    correct: true }, { text: '내가 계속 살게.',                          correct: false }, { text: '아니, 아직 성장 안 했어.',                  correct: false }, { text: '얼마예요?',                              correct: false }], explain: 'Tori 原句' } },
  ],
};
