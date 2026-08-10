import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 55 · 2-5 Boss 战 · 📔 日记回顾 · 55 天 */
export const day55Boss: BossSubQuestData = {
  day: 25, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '회고의 관문',
  subtitle: '📔 书桌前 · 一本日记 · 两个自己',
  intro: '周日晚 8 点。Tori 从抽屉里翻出 Day 1 的日记本 —— 那时候连 "안녕하세요" 都紧张。往回翻页 Day 3 짐/집、Day 14 咖啡馆、Day 21 房东、Day 30 毕业、Day 42 讲台、Day 49 调解。今晚要用 ~던 / ~았/었던 回望自己，把成长写成完整一句话。',
  outroHook: '窗外雨里的兽尔。你合上日记本，胡萝卜笔别在耳朵上 —— 原来时间不是流走了，是变成我了。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd55-b5-t1', audioKo: '55일 전에는 안녕하세요도 어려웠던 나였어요.', choices: [{ text: '55 天前连"你好"都难说出口的我。',   correct: true }, { text: '55 天前会说很多韩语。',              correct: false }, { text: '55 天后要说韩语。',                    correct: false }, { text: '55 天前不认识 안녕하세요。',              correct: false }], explain: 'Tori 原句' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd55-b5-t2', audioKo: '많이 배웠고, 앞으로도 많이 배울 거야.',        choices: [{ text: '学了很多，以后也会学很多。',        correct: true }, { text: '不用再学了。',                          correct: false }, { text: '以后不学了。',                          correct: false }, { text: '现在没学好。',                          correct: false }], explain: 'Haru 原句' } },
    { type: 'choice',  label: '过去回想',     task: { id: 'd55-b5-t3', promptZh: '"常去的咖啡馆关门了"（反复经验）哪句最自然？',                                                                                            choices: [{ text: '자주 간 카페가 문 닫았어요.',                  correct: false }, { text: '자주 갔던 카페가 문 닫았어요.',         correct: true }, { text: '자주 가는 카페가 문 닫았어요.',                correct: false }, { text: '자주 갈 카페가 문 닫았어요.',                     correct: false }], explain: '反复过去 → **~던**' } },
    { type: 'choice',  label: '完全过去',     task: { id: 'd55-b5-t4', promptZh: '"重新听了那时候曾经喜欢的歌"哪句更自然？',                                                                                                  choices: [{ text: '그때 좋아하는 노래를 다시 들었어요.',            correct: false }, { text: '그때 좋아했던 노래를 다시 들었어요.',   correct: true }, { text: '그때 좋아한 노래를 다시 들었어요.',              correct: false }, { text: '그때 좋아하는 노래가 있었어요.',                 correct: false }], explain: '~았/었던 = 完全过去（已经不喜欢了）' } },
    { type: 'choice',  label: '认词',         task: { id: 'd55-b5-t5', promptKo: '흥정',  promptHangul: 'heung-jeong',                                                                                                     choices: [{ text: '讲价',              correct: true }, { text: '定价',              correct: false }, { text: '促销',              correct: false }, { text: '砍单',                     correct: false }], explain: 'Day 54 复习 · 흥정하다' } },
    { type: 'compose', label: '组句',         task: { id: 'd55-b5-t6', zhHint: '连"你好"都难说出口的曾经的我。',                                                                                                          audioKo: '안녕하세요도 어려웠던 나였어요.',             answer: ['안녕하세요도', '어려웠던', '나였어요.'],                  tokens: ['안녕하세요도', '어려웠던', '나였어요.', '어려운', '어려운데', '어렵는', '나이에요.'],                    explain: '~았/었던 回想' } },
    { type: 'compose', label: '组句',         task: { id: 'd55-b5-t7', zhHint: '常去的咖啡馆关门了。',                                                                                                                  audioKo: '자주 갔던 카페가 문 닫았어요.',               answer: ['자주', '갔던', '카페가', '문', '닫았어요.'],              tokens: ['자주', '갔던', '카페가', '문', '닫았어요.', '가는', '간', '갈', '카페에서'],                            explain: '~던 反复经验' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd55-b5-t8', promptZh: 'Haru 说 "많이 배웠고, 앞으로도 많이 배울 거야"。你想承诺"会继续更努力"，最自然的一句？',                                              choices: [{ text: '응, 계속 더 열심히 할래.',                    correct: true }, { text: '이제 그만할래.',                          correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                  correct: false }], explain: 'Tori 决心 · ~(으)ㄹ래요 意愿' } },
  ],
};
