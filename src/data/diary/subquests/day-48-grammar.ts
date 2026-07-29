import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 48 · 2-3 문법 탐험 · ~지만 vs ~는데 / (으)ㄴ데 */
export const day48Grammar: GrammarSubQuestData = {
  day: 18, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '虽然___但___：~지만 / ~는데 / ~(으)ㄴ데',

  fix: [
    { id: 'd48-g3-f1', promptKo: '영화가 재미있은데 자막이 없어요.',        promptZh: '"电影有意思，可惜没字幕"哪句正确？',            choices: [{ text: '영화가 재미있은데 자막이 없어요.',      correct: false }, { text: '영화가 재미있는데 자막이 없어요.',   correct: true }, { text: '영화가 재미있다는데 자막이 없어요.',    correct: false }, { text: '영화가 재미있지만 자막을 없어요.',        correct: false }], explain: '재미있다 (动词) → **재미있는데**（动词 + 는데）' },
    { id: 'd48-g3-f2', promptKo: '자막이 있으면 좋는데.',                   promptZh: '"有字幕就好了（可惜没有）"哪句正确？',            choices: [{ text: '자막이 있으면 좋는데.',                    correct: false }, { text: '자막이 있으면 좋은데.',                correct: true }, { text: '자막이 있으면 좋다는데.',                correct: false }, { text: '자막이 있어서 좋은데.',                    correct: false }], explain: '좋다 (형용사) → **좋은데**（형용사 + (으)ㄴ데）' },
    { id: 'd48-g3-f3', promptKo: '반은 이해했지만 감동은 못 느꼈어.',        promptZh: '"虽然一半没懂，但感动全懂了"哪句表达剧情正确？',   choices: [{ text: '반은 이해했지만 감동은 못 느꼈어.',       correct: false }, { text: '반은 이해 못 했지만 감동은 다 느꼈어.', correct: true }, { text: '반은 이해 못 했는데 감동은 못 느꼈어.',   correct: false }, { text: '반은 이해했는데 감동은 못 느꼈어.',        correct: false }], explain: 'Tori 原句 · ~지만 前后对比' },
    { id: 'd48-g3-f4', promptKo: '매워지만 맛있어요.',                       promptZh: '"虽然辣但好吃"哪句正确？',                        choices: [{ text: '매워지만 맛있어요.',                       correct: false }, { text: '맵지만 맛있어요.',                     correct: true }, { text: '매운지만 맛있어요.',                     correct: false }, { text: '매웠지만 맛있어요.',                        correct: false }], explain: '~지만 前接**词干**（不是 해요体）· 맵 + 지만' },
    { id: 'd48-g3-f5', promptKo: '오늘 여기 김치찌개 시켰지만 진짜 맛있어요.', promptZh: '关于 ~는데 的"铺垫"用法，哪句最自然？',           choices: [{ text: '오늘 여기 김치찌개 시켰지만 진짜 맛있어요.', correct: false }, { text: '오늘 여기 김치찌개 시켰는데 진짜 맛있어요.', correct: true }, { text: '오늘 여기 김치찌개 시켰기 때문에 맛있어요.', correct: false }, { text: '오늘 여기 김치찌개 시켰서 맛있어요.',        correct: false }], explain: '~는데 也表**铺垫**（不只是转折）· 母语者高频' },
  ],

  compose: [
    { id: 'd48-g3-c1', zhHint: '虽然一半没懂，但感动全懂了。',        audioKo: '반은 이해 못 했지만 감동은 다 느꼈어.',        answer: ['반은', '이해 못 했지만', '감동은', '다 느꼈어.'],        tokens: ['반은', '이해 못 했지만', '감동은', '다 느꼈어.', '이해했지만', '못 느꼈어.', '이해', '감동을'], explain: 'Tori 原句 · ~지만' },
    { id: 'd48-g3-c2', zhHint: '有字幕就好了，可惜没有。',            audioKo: '자막이 있으면 좋은데, 없어서 힘들었어.',      answer: ['자막이', '있으면', '좋은데,', '없어서', '힘들었어.'],   tokens: ['자막이', '있으면', '좋은데,', '없어서', '힘들었어.', '좋는데', '있어서', '없어서요', '있는데'], explain: '~(으)ㄴ데 铺垫 · 좋다 → 좋은데' },
    { id: 'd48-g3-c3', zhHint: '电影有意思，可惜没字幕。',            audioKo: '영화가 재미있는데 자막이 없어요.',              answer: ['영화가', '재미있는데', '자막이', '없어요.'],             tokens: ['영화가', '재미있는데', '자막이', '없어요.', '재미있은데', '재미있지만', '있어요.', '재미있다는데'], explain: '재미있다 (动词) → 재미있는데' },
    { id: 'd48-g3-c4', zhHint: '虽然辣但好吃。',                      audioKo: '맵지만 맛있어요.',                              answer: ['맵지만', '맛있어요.'],                                    tokens: ['맵지만', '맛있어요.', '매워지만', '매운지만', '매웠지만', '맛없어요.'],                             explain: '~지만 前接词干' },
  ],

  rule: [
    { id: 'd48-g3-r1', promptZh: '关于「~지만」的用法，哪句最准确？',        choices: [{ text: 'V/A 어간 + **지만** = 虽然但是（明确转折）· 前后语义对立', correct: true }, { text: '~지만 是过去时',   correct: false }, { text: '~지만 是敬语',      correct: false }, { text: '~지만 只用于名词', correct: false }], explain: '맵지만 / 좋지만 / 갔지만' },
    { id: 'd48-g3-r2', promptZh: '关于「~는데 vs ~(으)ㄴ데」的区别，哪句最准确？', choices: [{ text: '动词现在 + **는데**；形容词 + **(으)ㄴ데** · 名词句 + **인데**', correct: true }, { text: '所有词一律 + 는데',    correct: false }, { text: '所有词一律 + (으)ㄴ데', correct: false }, { text: '~는데 是过去时',          correct: false }], explain: '가는데 / 좋은데 / 학생인데' },
    { id: 'd48-g3-r3', promptZh: '关于「~지만 vs ~는데」的语感差别，哪句最准确？', choices: [{ text: '~지만 = 明确对立 / 正式；~는데 = 铺垫柔软 / 日常 · 母语者聊天高频用 ~는데', correct: true }, { text: '两者完全一样',      correct: false }, { text: '~지만 是敬语',    correct: false }, { text: '~는데 只用于书面语', correct: false }], explain: '写发表用 ~지만，聊天用 ~는데' },
    { id: 'd48-g3-r4', promptZh: '关于「~는데」的铺垫功能，哪句最准确？',    choices: [{ text: '~는데 除了转折还有**铺垫** · 김치찌개 시켰는데 진짜 맛있어요 = 我点了泡菜汤，超好吃', correct: true }, { text: '~는데 只表转折',       correct: false }, { text: '~는데 是命令形',        correct: false }, { text: '~는데 只用于过去',      correct: false }], explain: '母语者最常用法 · 讲事情前用 ~는데 做前置' },
  ],
};
