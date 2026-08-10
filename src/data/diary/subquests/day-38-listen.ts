import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 38 · 2-2 귀 트이기 · ~(으)ㄹ 수 있어요 / 못 */
export const day38Listen: ListenSubQuestData = {
  day: 8, level: 'intermediate', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '厨房小台 · 第一次自己做饭',

  meaning: [
    { id: 'd38-l2-m1', audioKo: '엄마, 나 요리할 수 있어요!',              choices: [{ text: '妈妈，我会做饭了！',       correct: true }, { text: '妈妈，我不会做饭。',            correct: false }, { text: '妈妈，帮我做饭。',              correct: false }, { text: '妈妈，教我做饭。',              correct: false }], explain: 'Tori 给妈妈发的原句 · 요리하다 → 요리할 수 있어요' },
    { id: 'd38-l2-m2', audioKo: '오늘부터 너도 김치볶음밥 할 수 있어.',    choices: [{ text: '从今天起，你也会做泡菜炒饭了。', correct: true }, { text: '今天你没做泡菜炒饭。',              correct: false }, { text: '你不用做泡菜炒饭。',                correct: false }, { text: '泡菜炒饭做不了。',                  correct: false }], explain: 'Haru 原句 · 하다 → 할 수 있어' },
    { id: 'd38-l2-m3', audioKo: '매운 거는 잘 못 먹어요.',                 choices: [{ text: '我不太能吃辣。',            correct: true }, { text: '我很爱吃辣。',                    correct: false }, { text: '辣的东西不好吃。',                  correct: false }, { text: '我没吃辣的。',                      correct: false }], explain: '못 + 动词 = 口语版"不能" · 잘 못 = 不太能' },
    { id: 'd38-l2-m4', audioKo: '팬에 기름을 둘러요.',                     choices: [{ text: '在平底锅里放油。',            correct: true }, { text: '把锅刷干净。',                    correct: false }, { text: '锅里没油。',                      correct: false }, { text: '锅在旁边。',                      correct: false }], explain: '기름을 두르다 = 淋油 · 做菜必备' },
    { id: 'd38-l2-m5', audioKo: '이 정도면 진짜 잘한 거야.',                choices: [{ text: '这个水准算真的做得不错了。', correct: true }, { text: '这个水准还差得远。',              correct: false }, { text: '这个不算做过。',                    correct: false }, { text: '这个水准很普通。',                  correct: false }], explain: 'Haru 尝完的评价 · ~ㄴ 거야 强调事实' },
  ],

  cloze: [
    { id: 'd38-l2-c1', audioKo: '나 요리할 수 있어요.',       clozeParts: ['나 요리', ' 수 있어요.'],       choices: [{ text: '할',    correct: true }, { text: '하ㄹ',    correct: false }, { text: '하을', correct: false }, { text: '해',   correct: false }], explain: '하다 无收音 → **ㄹ 수 있어요**' },
    { id: 'd38-l2-c2', audioKo: '매운 거 못 먹어요.',           clozeParts: ['매운 거 ', ' 먹어요.'],         choices: [{ text: '못',    correct: true }, { text: '안',      correct: false }, { text: '잘',   correct: false }, { text: '다',   correct: false }], explain: '~못 + V = 不能（能力否定）' },
    { id: 'd38-l2-c3', audioKo: '김치를 먹을 수 있어요.',       clozeParts: ['김치를 먹', ' 수 있어요.'],     choices: [{ text: '을',    correct: true }, { text: 'ㄹ',      correct: false }, { text: '을을',  correct: false }, { text: '어',   correct: false }], explain: '먹다 有收音 ㄱ → **을 수 있어요**' },
    { id: 'd38-l2-c4', audioKo: '김치볶음밥 만들 수 있어.',      clozeParts: ['김치볶음밥 ', ' 수 있어.'],     choices: [{ text: '만들',  correct: true }, { text: '만들ㄹ',  correct: false }, { text: '만드을',correct: false }, { text: '만들을', correct: false }], explain: '만들다 ㄹ收音特殊 · **ㄹ 수 있어**（不重复 ㄹ）' },
  ],

  reply: [
    { id: 'd38-l2-r1', audioKo: '토리, 오늘은 김치볶음밥 만들어 볼래?',            promptZh: 'Haru 提议今天做泡菜炒饭。你犹豫问"我做得来吗"，最自然的一句？',    choices: [{ text: '음… 나 할 수 있을까?',                            correct: true }, { text: '싫어, 안 할래.',                    correct: false }, { text: '얼마예요?',                    correct: false }, { text: '몰라, 저리 가.',                  correct: false }], explain: '~ㄹ 수 있을까? = 我能做吗（犹豫）' },
    { id: 'd38-l2-r2', audioKo: '나 할 수 있을까?',                                  promptZh: 'Tori 说"我做得来吗"。你想鼓励她"当然能"，最自然的一句？',           choices: [{ text: '당연히 할 수 있어. 재료 다 있어.',                correct: true }, { text: '음, 잘 모르겠어.',                    correct: false }, { text: '싫어.',                       correct: false }, { text: '얼마예요?',                    correct: false }], explain: 'Haru 原句 · 당연히 = 当然' },
    { id: 'd38-l2-r3', audioKo: '이 정도면 진짜 잘한 거야.',                          promptZh: 'Haru 尝完饭说"算真的做得不错"。你想承诺"下次我做给你吃"，最自然的一句？', choices: [{ text: '다음엔 내가 해줄게.',                              correct: true }, { text: '다음엔 네가 해줘.',                    correct: false }, { text: '내일 또 먹을래?',                   correct: false }, { text: '싫어.',                         correct: false }], explain: 'Tori 原句 · ~해줄게 承诺为对方做' },
  ],
};
