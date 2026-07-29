import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 51 · 2-5 Boss 战 · ☕ 一个人的下午 */
export const day51Boss: BossSubQuestData = {
  day: 21, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '자립의 관문',
  subtitle: '☕ 달빛카페 · 一个人推开门',
  intro: '달빛카페玻璃门推开的一瞬间你差点转身。Junho 上班，Minji 考试，今天没人陪。深吸一口气 —— Day 23 那次是 Junho 帮你点单，Day 51 你要一个人从点单到拿卡全走一遍。要用韩语说完"要一杯招牌"、"随机小卡一张"、"刷卡结账"。',
  outroHook: '你把 Mochi 正面卡拍照发群。Junho 三十几个感叹号，Minji 一个"공식팬 인증"，Haru 就两个字："예뻐." 桌上摊开日记本，胡萝卜笔写下第一行 —— "오늘, 나 진짜 팬이었어." 今天，是真正的粉丝了。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd51-b5-t1', audioKo: '오늘 시그니처 음료 하나 주세요.',      choices: [{ text: '来一杯今天的招牌饮品。',    correct: true }, { text: '今天没招牌饮品。',              correct: false }, { text: '请给我今天的赠品。',              correct: false }, { text: '请一起点。',                    correct: false }], explain: 'Tori 独立点单' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd51-b5-t2', audioKo: '나 혼자서 다 할 수 있어.',               choices: [{ text: '我一个人全能搞定。',        correct: true }, { text: '一个人不太行。',                  correct: false }, { text: '需要别人帮忙。',                  correct: false }, { text: '有人一起做。',                    correct: false }], explain: '자립 表达' } },
    { type: 'choice',  label: '收音判定',     task: { id: 'd51-b5-t3', promptZh: '"能抽到小卡"哪句正确？',                                                                                                              choices: [{ text: '포카를 뽑ㄹ 수 있어요.',        correct: false }, { text: '포카를 뽑을 수 있어요.',    correct: true }, { text: '포카를 뽑수 있어요.',              correct: false }, { text: '포카를 뽑을수 있어요.',              correct: false }], explain: '뽑다 有收音 → 을 수' } },
    { type: 'choice',  label: '助词判定',     task: { id: 'd51-b5-t4', promptZh: '"刷卡结账"哪句正确？',                                                                                                                choices: [{ text: '카드에서 결제할게요.',          correct: false }, { text: '카드로 결제할게요.',        correct: true }, { text: '카드에 결제할게요.',                correct: false }, { text: '카드까지 결제할게요.',              correct: false }], explain: '手段助词 ~로' } },
    { type: 'choice',  label: '认词',         task: { id: 'd51-b5-t5', promptKo: '혼자서', promptHangul: 'hon-ja-seo',                                                                                                  choices: [{ text: '独自地',              correct: true }, { text: '一起',            correct: false }, { text: '各自',              correct: false }, { text: '总是',                     correct: false }], explain: '~서 强调方式' } },
    { type: 'compose', label: '组句',         task: { id: 'd51-b5-t6', zhHint: '一个人全能搞定。',                                                                                                                    audioKo: '나 혼자서 다 할 수 있어.',                answer: ['나', '혼자서', '다', '할 수 있어.'],                    tokens: ['나', '혼자서', '다', '할 수 있어.', '혼자', '할수 있어.', '할 수 없어.', '못 해.'],                   explain: '主题句' } },
    { type: 'compose', label: '组句',         task: { id: 'd51-b5-t7', zhHint: 'Day 23 做不到，今天可以了。',                                                                                                          audioKo: 'Day 23에는 못 했지만, 오늘은 할 수 있어요.', answer: ['Day 23에는', '못 했지만,', '오늘은', '할 수 있어요.'], tokens: ['Day 23에는', '못 했지만,', '오늘은', '할 수 있어요.', '했으면,', '못 하니까,', '할 수 없어요.', 'Day 23에서'], explain: '~지만 成长对比' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd51-b5-t8', promptZh: '朋友问 "카페 어땠어?"。你想说"一个人全搞定 + 抽到正面卡"，最自然的一句？',                                                          choices: [{ text: '나 혼자서 다 할 수 있었어. 심지어 모찌 정면 뽑았어!',      correct: true }, { text: '아무것도 못 했어.',                          correct: false }, { text: '얼마예요?',                                  correct: false }, { text: '몰라.',                                      correct: false }], explain: 'Tori 兴奋分享' } },
  ],
};
