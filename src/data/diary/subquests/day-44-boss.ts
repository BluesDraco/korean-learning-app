import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 44 · 2-5 Boss 战 · 🍱 한강 소풍 */
export const day44Boss: BossSubQuestData = {
  day: 14, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '순간의 관문',
  subtitle: '🍱 秋日野餐 · 四人的毯子',
  intro: '兽尔江草坪上铺开一张毯子，紫菜包饭、草莓、麦茶。Minji 躺着看天，Junho 追鸽子，Haru 看书。你抬头看云，突然想 —— 这一刻要是能永远持续就好了。Haru 抬头看你："불가능하지만, 기억은 남아요." 那一句轻得像风，却把这天钉进了你心里。今天要用韩语说完 5 句温柔的希望。',
  outroHook: '太阳西斜。Minji 收毯子的时候小声哼歌，Junho 说下次还要再来兽尔江，Haru 帮你抖掉草莓叶。你把这一天塞进日记里 —— 已经是记忆了。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd44-b5-t1', audioKo: '이 하루가 영원히 계속됐으면 좋겠어.', choices: [{ text: '这一天要是能永远持续就好了。', correct: true }, { text: '这一天永远不会持续。',              correct: false }, { text: '希望明天早点来。',                    correct: false }, { text: '要一直忙下去。',                    correct: false }], explain: 'Tori 原句' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd44-b5-t2', audioKo: '이 순간도 이미 기억이 됐어요.',       choices: [{ text: '这一刻已经是记忆了。',            correct: true }, { text: '这个瞬间还在继续。',              correct: false }, { text: '这一刻会消失。',                    correct: false }, { text: '记忆已经没了。',                    correct: false }], explain: 'Haru 原句' } },
    { type: 'choice',  label: '愿望时态',      task: { id: 'd44-b5-t3', promptZh: '"要是家人健康就好了"（更温柔）哪句更自然？',                                                                                        choices: [{ text: '가족이 건강하면 좋겠어요.',           correct: false }, { text: '가족이 건강했으면 좋겠어요.',    correct: true }, { text: '가족이 건강해 좋겠어요.',            correct: false }, { text: '가족을 건강했으면 좋겠어요.',        correct: false }], explain: '母语者九成用 ~았/었으면' } },
    { type: 'choice',  label: '否定式',        task: { id: 'd44-b5-t4', promptZh: '"要是明天不下雨就好了"哪句正确？',                                                                                                   choices: [{ text: '내일 비가 안 오았으면 좋겠어요.',       correct: false }, { text: '내일 비가 안 왔으면 좋겠어요.',  correct: true }, { text: '내일 비가 안 오면 됐어요.',           correct: false }, { text: '내일 비를 안 왔으면 좋겠어요.',       correct: false }], explain: '오다 → 왔 + 으면' } },
    { type: 'choice',  label: '认词',         task: { id: 'd44-b5-t5', promptKo: '순간', promptHangul: 'sun-gan',                                                                                                       choices: [{ text: '瞬间',                    correct: true }, { text: '一年',            correct: false }, { text: '一天',              correct: false }, { text: '一小时',                     correct: false }], explain: '瞬(순) + 间(간)' } },
    { type: 'compose', label: '组句',         task: { id: 'd44-b5-t6', zhHint: '这一天要是能永远持续就好了。',                                                                                                          audioKo: '이 하루가 영원히 계속됐으면 좋겠어.',    answer: ['이 하루가', '영원히', '계속됐으면', '좋겠어.'],       tokens: ['이 하루가', '영원히', '계속됐으면', '좋겠어.', '계속되면', '계속돼서', '좋아요.', '됐으니까'],   explain: '~았/었으면 좋겠어' } },
    { type: 'compose', label: '组句',         task: { id: 'd44-b5-t7', zhHint: '要是能说好韩语就好了。',                                                                                                                audioKo: '한국어를 잘했으면 좋겠어요.',            answer: ['한국어를', '잘했으면', '좋겠어요.'],                   tokens: ['한국어를', '잘했으면', '좋겠어요.', '잘하면', '잘해서', '한국어가', '좋아요.'],                   explain: '잘하다 → 잘했 + 으면' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd44-b5-t8', promptZh: 'Haru 说 "이 순간도 이미 기억이 됐어요"。你想承诺好好记住，最自然的一句？',                                                            choices: [{ text: '그럼 잘 기억할게요.',                   correct: true }, { text: '그럼 잊어버릴게요.',                       correct: false }, { text: '기억은 필요 없어요.',                    correct: false }, { text: '얼마예요?',                          correct: false }], explain: 'Tori 原句 · 承诺形' } },
  ],
};
