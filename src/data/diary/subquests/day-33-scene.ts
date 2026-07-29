import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 33 · 2-4 상황 속으로 · 第一封家书 */
export const day33Scene: SceneSubQuestData = {
  day: 3, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '深夜写给妈妈的信 · 每一笔',

  tasks: [
    { type: 'situation', id: 'd33-sc-s1', scenario: '你要写信的第一句给妈妈报平安，最标准的一句？',                                                                       choices: [{ ko: '엄마, 저 잘 지내고 있어요.',   zh: '妈妈，我过得很好。',           correct: true }, { ko: '엄마, 저 잘 지내네요.',             zh: '妈妈，我过得挺好的呢。',        correct: false }, { ko: '엄마, 저 잘 지내다요.',          zh: '妈妈，我过得很好。',              correct: false }, { ko: '엄마, 저 잘 지냈어요.',           zh: '过得好过。（时态偏移）',   correct: false }], explain: '写信第一句 · V + 고 있어요 表持续状态' },
    { type: 'situation', id: 'd33-sc-s2', scenario: '你想问妈妈"现在在做什么"，用敬语。最合适的一句？',                                                                    choices: [{ ko: '엄마는 지금 뭐 하고 계세요?',   zh: '妈妈现在在做什么？',           correct: true }, { ko: '엄마는 지금 뭐 하고 있어요?',       zh: '妈妈现在在做什么？',              correct: false }, { ko: '엄마는 지금 뭐 하고 있으세요?',    zh: '妈妈现在正在做什么呢？',          correct: false }, { ko: '엄마는 지금 뭐 하시니까요?',        zh: '妈妈现在在做什么呢？',            correct: false }], explain: '对长辈进行时 → ~고 계세요' },
    { type: 'situation', id: 'd33-sc-s3', scenario: '信末落款想写"兔莉敬上"，最标准的写法？',                                                                              choices: [{ ko: '토리 올림.',                    zh: '兔莉敬上。',                    correct: true }, { ko: '토리 예요.',                          zh: '是兔莉。',                        correct: false }, { ko: '토리 만나서 반가워요.',              zh: '兔莉，很高兴认识你。',            correct: false }, { ko: '안녕히 가세요.',                    zh: '再见。',                          correct: false }], explain: '올림 = 올리다(呈上)的名词化，信末专用' },

    { type: 'dialogue', id: 'd33-sc-d1', lines: [{ speaker: '엄마', ko: '토리, 요즘 어떻게 지내?', zh: '兔莉，最近过得怎么样？' }], blankSpeaker: '토리', choices: [{ ko: '엄마, 저 잘 지내고 있어요.',                     zh: '妈妈，我过得很好。',                        correct: true }, { ko: '얼마예요?',                       zh: '多少钱？',                    correct: false }, { ko: '몰라요.',                zh: '不知道。',                    correct: false }, { ko: '만나서 반가워요.',   zh: '很高兴认识你。',       correct: false }], explain: '~고 있어요 报平安' },
    { type: 'dialogue', id: 'd33-sc-d2', lines: [{ speaker: '엄마', ko: '한국에서 뭐 하고 있어?',   zh: '在韩国干什么呢？' }],       blankSpeaker: '토리', choices: [{ ko: '한국어 공부 열심히 하고 있어요.',                 zh: '我在努力学韩语。',                          correct: true }, { ko: '한국어 공부 안 해요.',           zh: '我不学韩语。',                correct: false }, { ko: '한국어 공부 잘 몰라요.',    zh: '韩语学习不太懂。',              correct: false }, { ko: '만나서 반가워요.',     zh: '很高兴认识你。',       correct: false }], explain: 'V + 고 있어요 · 报近况' },
    { type: 'dialogue', id: 'd33-sc-d3', lines: [{ speaker: '토리', ko: '엄마는 지금 뭐 하고 계세요?', zh: '妈妈现在在做什么？' }], blankSpeaker: '엄마', choices: [{ ko: '지금 저녁 준비하고 있어. 곧 먹을 거야.',           zh: '在做晚饭，马上就吃。',                       correct: true }, { ko: '지금 저녁 준비하시고 계세요.',   zh: '现在正在准备晚饭呢。',       correct: false }, { ko: '지금 저녁 준비했어요.',       zh: '晚饭做过了。',   correct: false }, { ko: '지금 저녁 안 먹었어요.',     zh: '现在还没吃晚饭。',              correct: false }], explain: '妈妈对孩子用반말 · 하고 있어' },

    { type: 'context', id: 'd33-sc-c1', ko: '엄마는 지금 뭐 하고 계세요?', promptZh: '这句话最适合在什么情境下说？',                                                                choices: [{ zh: '对妈妈 / 老师 / 长辈问"现在正在做什么"（敬语）', correct: true }, { zh: '对同龄朋友问近况',        correct: false }, { zh: '对小孩问玩什么',       correct: false }, { zh: '自言自语',              correct: false }], explain: '~고 계세요 = 있어요 的敬语形 · 只对长辈' },
    { type: 'context', id: 'd33-sc-c2', ko: '잘 지내고 있어요.',            promptZh: '这句话最适合在什么情境下说？',                                                                choices: [{ zh: '写信 / 打电话 / 见面时回答"最近怎么样"的报平安句', correct: true }, { zh: '第一次见面自我介绍',      correct: false }, { zh: '拒绝对方的邀请',         correct: false }, { zh: '道歉自己迟到',          correct: false }], explain: '进行时表持续状态 · 报平安固定句' },
  ],
};
