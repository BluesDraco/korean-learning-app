import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 90 · 3-4 상황 속으로 · 毕业演讲 */
export const day90Scene: SceneSubQuestData = {
  day: 30, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '한빛대 대강당 · 연단 · 마지막 연설',

  tasks: [
    { type: 'situation', id: 'd90-sc-s1', scenario: '毕业演讲的最后，你想说出那句灵魂句"我90天前带着行李来，但现在有了家"，最合适的一句？',                                          choices: [{ ko: '저는 짐을 가지고 왔지만, 지금은 집이 있어요.',                zh: '我带着行李来，但现在有了家。', correct: true }, { ko: '저는 집을 가지고 왔지만, 지금은 짐이 있어요.',            zh: '错——짐집说反了。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '짐→집 · Day 90 명제' },
    { type: 'situation', id: 'd90-sc-s2', scenario: '演讲中你想说"当初一句韩语都不会，但现在能站在这里说"，最合适的一句？',                                     choices: [{ ko: '한국어를 하나도 몰랐지만, 지금은 여기서 말할 수 있어요.',                                        zh: '当初一句韩语都不会，但现在能站在这里说。',              correct: true }, { ko: '한국어를 하나도 모르지만, 지금은 말할 수 있어요.',                zh: '错——当初的事用过去몰랐지만。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '몰랐지만 + 지금은' },
    { type: 'situation', id: 'd90-sc-s3', scenario: '全场起立鼓掌后，你在讲台上想真诚地感谢这90天，最合适的一句？',                                                   choices: [{ ko: '이 90일의 모든 순간에 진심으로 감사합니다.',                                        zh: '真心感谢这90天的每一个瞬间。',              correct: true }, { ko: '90일 별거 아니었어요.',                zh: '90天没什么。（不真诚）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '감사 · 真诚致谢' },

    { type: 'dialogue', id: 'd90-sc-d1', lines: [{ speaker: '다니엘',   ko: '토리, 마지막 한마디 부탁해요.',                zh: '兔莉，最后说一句吧。' }], blankSpeaker: '토리', choices: [{ ko: '저는 짐을 가지고 왔지만, 지금은 집이 있어요.',                     correct: true, zh: '我带着行李来，但现在有了家。' }, { ko: '몰라요.',       correct: false, zh: '不知道。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '할 말 없어요.',           correct: false, zh: '没什么可说的。（冷淡）' }], explain: 'Day 90 명제句' },
    { type: 'dialogue', id: 'd90-sc-d2', lines: [{ speaker: 'Minji',   ko: '연단에서 안 떨렸어?',                       zh: '在讲台上不紧张吗？' }],  blankSpeaker: '토리', choices: [{ ko: '예전엔 많이 떨렸지만, 지금은 안 떨려.',                     correct: true, zh: '以前很紧张，但现在不抖了。' }, { ko: '몰라.',        correct: false, zh: '不知道。' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: '떨렸지만 + 지금은' },
    { type: 'dialogue', id: 'd90-sc-d3', lines: [{ speaker: '엄마',   ko: '우리 딸, 자랑스러워.',                    zh: '闺女，我为你骄傲。' }], blankSpeaker: '토리', choices: [{ ko: '엄마 덕분이에요. 이 당근, 용기라는 뜻이었잖아요.',    correct: true, zh: '多亏了妈妈。这胡萝卜，就是勇气的意思啊。' }, { ko: '몰라요.',      correct: false, zh: '不知道。' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '별거 아니에요.',           correct: false, zh: '没什么。（回避）' }], explain: '回扣 Day 1 용기 · 감사' },

    { type: 'context', id: 'd90-sc-c1', ko: '짐을 가지고 왔지만, 지금은 집이 있어요.',   promptZh: '这句（Tori 演讲的最后一句）在90天终章的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 90 全系列核心句 · ~았/었지만 지금은 · 짐(行李)→집(家) 一音之差,道尽 Tori 从「拖着行李的外来者」到「在这里有了家」的 90 天成长',       correct: true }, { zh: '行李比家重要',          correct: false }, { zh: '家里全是行李',       correct: false }, { zh: '要搬家了',                correct: false }], explain: '짐→집 · 成长命题' },
    { type: 'context', id: 'd90-sc-c2', ko: '기립 박수가 나왔어요.', promptZh: '这句在Day 90的意义，哪句最准确？',                                                             choices: [{ zh: '"全场起立鼓掌" · 500 人为 Tori 的演讲起立 · 妈妈捂脸哭、四个朋友在台下笑——90 天旅程的情感顶点',       correct: true }, { zh: '大家提前离场',                correct: false }, { zh: '演讲失败了',                  correct: false }, { zh: '没人鼓掌',                correct: false }], explain: '起立鼓掌 · 情感顶点' },
  ],
};
