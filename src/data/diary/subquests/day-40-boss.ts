import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 40 · 2-5 Boss 战 · 🥢 水獭家族的饭桌 */
export const day40Boss: BossSubQuestData = {
  day: 10, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '식탁의 관문',
  subtitle: '🥢 第一次进韩国朋友的家',
  intro: '按门铃前你深呼吸了三次。门开了，Minji 妈妈围着围裙笑得眼睛弯成月牙。饭桌上摆满了菜：불고기 / 잡채 / 시금치나물 / 김치찌개。奶奶从卧室慢慢走出来，端起茶杯看了你一眼。"우리 민지" 三个字轻轻落下 —— 和你奶奶叫你 "我们兔莉" 是一样的口气。今天要用韩语说完这一顿饭的每一句致意、每一次致谢。',
  outroHook: '临走前 Minji 奶奶握着你的手，把一小包반찬塞进你怀里："혼자 있을 때 밥 잘 챙겨 먹어야 돼." (一个人的时候要好好吃饭啊。) 你出门时天已经黑了，但走廊灯下你的影子，好像多了一份重量。',

  tasks: [
    { type: 'choice',  label: '听句选意',   task: { id: 'd40-b5-t1', audioKo: '아, 우리 민지가 좋아하는 친구구나.',   choices: [{ text: '啊，原来是민지喜欢的朋友啊。',     correct: true }, { text: '请交민지这个朋友。',           correct: false }, { text: '我讨厌민지的朋友。',           correct: false }, { text: '민지不喜欢这个朋友。',              correct: false }], explain: '奶奶原句 · 亲和반말감탄' } },
    { type: 'choice',  label: '听句选意',   task: { id: 'd40-b5-t2', audioKo: '많이 먹어요. 학생이 밥 잘 먹어야 공부도 잘해요.', choices: [{ text: '多吃点。学生要吃得好才能学得好。', correct: true }, { text: '别吃太多。学生要专心学习。',            correct: false }, { text: '吃饭吧。学生成绩不好。',              correct: false }, { text: '学生不能吃饭。',                    correct: false }], explain: 'Minji 爸爸原句 · ~야 = 才能' } },
    { type: 'choice',  label: '收音判定',   task: { id: 'd40-b5-t3', promptZh: '"原来是学生啊"哪句正确？',                                                                                                          choices: [{ text: '학생구나.',                        correct: false }, { text: '학생이구나.',                correct: true }, { text: '학생는구나.',                    correct: false }, { text: '학생예구나.',                      correct: false }], explain: '학생 有收音 → **이구나**' } },
    { type: 'choice',  label: '词性接法',   task: { id: 'd40-b5-t4', promptZh: '"这个泡菜真的很辣啊"（自言自语）哪句正确？',                                                                                          choices: [{ text: '이 김치 진짜 맵는구나.',              correct: false }, { text: '이 김치 진짜 맵구나.',        correct: true }, { text: '이 김치 진짜 매운구나.',           correct: false }, { text: '이 김치 진짜 매워구나.',              correct: false }], explain: '形容词 맵다 → **맵구나**（不接 는）' } },
    { type: 'choice',  label: '认词',       task: { id: 'd40-b5-t5', promptKo: '다정하다', promptHangul: 'da-jeong-ha-da',                                                                                            choices: [{ text: '和蔼 / 亲切',              correct: true }, { text: '严厉',           correct: false }, { text: '冷漠',              correct: false }, { text: '陌生',                     correct: false }], explain: '多(다) + 情(정) + 하다' } },
    { type: 'compose', label: '组句',       task: { id: 'd40-b5-t6', zhHint: '原来是민지喜欢的朋友啊。',                                                                                                              audioKo: '우리 민지가 좋아하는 친구구나.',        answer: ['우리', '민지가', '좋아하는', '친구구나.'],               tokens: ['우리', '민지가', '좋아하는', '친구구나.', '친구이구나.', '친구는구나.', '친구예요.', '친구네요.'], explain: '奶奶原句 · 친구 无收音' } },
    { type: 'compose', label: '组句',       task: { id: 'd40-b5-t7', zhHint: '吃好了。真的很好吃。',                                                                                                                audioKo: '잘 먹었습니다. 정말 맛있었어요.',       answer: ['잘', '먹었습니다.', '정말', '맛있었어요.'],              tokens: ['잘', '먹었습니다.', '정말', '맛있었어요.', '먹겠습니다.', '먹어요.', '맛있어요.', '맛있구나.'],   explain: '饭后 잘 먹었습니다 敬语致谢' } },
    { type: 'choice',  label: '情景选回应', task: { id: 'd40-b5-t8', promptZh: 'Minji 奶奶温柔地说"原来是민지喜欢的朋友啊"。你想礼貌自我介绍，最自然的一句？',                                                        choices: [{ text: '안녕하세요, 할머니. 토리라고 해요.', correct: true }, { text: '안녕, 나 토리야.',              correct: false }, { text: '많이 드세요.',                    correct: false }, { text: '얼마예요?',                          correct: false }], explain: '~라고 하다 = 叫做～ · 对长辈敬语' } },
  ],
};
