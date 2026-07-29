import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 38 · 2-5 Boss 战 · 🍳 第一碗自己做的饭 */
export const day38Boss: BossSubQuestData = {
  day: 8, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '요리의 관문',
  subtitle: '🍳 泡菜炒饭 · 我也可以',
  intro: '案板上一颗鸡蛋。锅里滋啦一声，红油飞起来。Haru 站在旁边教："김치를 잘게 잘라. 팬에 기름 두르고, 김치 먼저 볶아." 你退了半步，然后向前一步。妈妈的味道从中国寄来了，现在你自己会煮了。今天要用韩语说清 "我能做" 三个字。',
  outroHook: 'Haru 尝了第二口，认真点头："이 정도면 진짜 잘한 거야." 你把碗端起来，拍照发给妈妈。三秒后，一张兔子竖大拇指的表情包跳出来。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd38-b5-t1', audioKo: '엄마, 나 요리할 수 있어요!',   choices: [{ text: '妈妈，我会做饭了！',       correct: true }, { text: '妈妈，我不会做饭。',   correct: false }, { text: '妈妈，帮我做饭。',       correct: false }, { text: '妈妈，教我做饭。',          correct: false }], explain: 'Tori 原句' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd38-b5-t2', audioKo: '매운 거는 잘 못 먹어요.',       choices: [{ text: '我不太能吃辣。',            correct: true }, { text: '我很爱吃辣。',           correct: false }, { text: '辣的东西不好吃。',       correct: false }, { text: '我没吃辣的。',              correct: false }], explain: '못 + 动词 · 口语能力否定' } },
    { type: 'choice',  label: '收音判定',     task: { id: 'd38-b5-t3', promptZh: '"能吃泡菜"哪句正确？',                                                                                                            choices: [{ text: '김치를 먹ㄹ 수 있어요.',       correct: false }, { text: '김치를 먹을 수 있어요.', correct: true }, { text: '김치를 먹수 있어요.',          correct: false }, { text: '김치를 먹을수 있어요.',        correct: false }], explain: '먹다 有收音 → **을 수 있어요**' } },
    { type: 'choice',  label: 'ㄹ 词干变化',   task: { id: 'd38-b5-t4', promptZh: '"能做泡菜炒饭"哪句正确？',                                                                                                        choices: [{ text: '김치볶음밥 만들ㄹ 수 있어요.',   correct: false }, { text: '김치볶음밥 만들 수 있어요.',correct: true }, { text: '김치볶음밥 만들을 수 있어요.',   correct: false }, { text: '김치볶음밥 만드ㄹ 수 있어요.',     correct: false }], explain: '만들다 ㄹ收音 → **ㄹ 수**（不重复）' } },
    { type: 'choice',  label: '认词',         task: { id: 'd38-b5-t5', promptKo: '볶다',  promptHangul: 'bok-da',                                                                                                    choices: [{ text: '炒',                    correct: true }, { text: '煮',            correct: false }, { text: '蒸',              correct: false }, { text: '烤',                     correct: false }], explain: '볶음밥 = 炒饭 · 볶다 → 볶아요' } },
    { type: 'compose', label: '组句',         task: { id: 'd38-b5-t6', zhHint: '妈妈，我会做饭了！',                                                                                                                audioKo: '엄마, 나 요리할 수 있어요!',              answer: ['엄마,', '나', '요리할 수 있어요!'],                      tokens: ['엄마,', '나', '요리할 수 있어요!', '요리해요!', '요리했어요!', '못 해요!', '요리하다요!'],        explain: 'Tori 给妈妈的原句' } },
    { type: 'compose', label: '组句',         task: { id: 'd38-b5-t7', zhHint: '能用韩语写信。',                                                                                                                    audioKo: '한국어로 편지 쓸 수 있어요.',            answer: ['한국어로', '편지', '쓸 수 있어요.'],                    tokens: ['한국어로', '편지', '쓸 수 있어요.', '쓰을 수 있어요.', '쓸수 있어요.', '쓸 수 없어요.', '한국어에서'], explain: '~로 用工具 · 쓰다 无收音 → ㄹ' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd38-b5-t8', promptZh: 'Haru 尝完饭说 "이 정도면 진짜 잘한 거야"。你想承诺"下次我做给你吃"，最自然的一句？',                                                choices: [{ text: '다음엔 내가 해줄게.',           correct: true }, { text: '다음엔 네가 해줘.',        correct: false }, { text: '내일 또 먹을래?',           correct: false }, { text: '싫어.',                       correct: false }], explain: '承诺形 ~해줄게' } },
  ],
};
