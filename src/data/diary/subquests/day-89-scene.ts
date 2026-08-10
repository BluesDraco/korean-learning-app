import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 89 · 3-4 상황 속으로 · 毕业前夜聊天到天亮 */
export const day89Scene: SceneSubQuestData = {
  day: 29, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '301호 · 밤샘 대화 · 새벽 6시',

  tasks: [
    { type: 'situation', id: 'd89-sc-s1', scenario: '天快亮了，你想柔声向大家确认"我们……这不是告别吧？"，最合适的一句？',                                          choices: [{ ko: '우리… 이별은 아니지?',                zh: '我们……不是告别吧？', correct: true }, { ko: '우리… 이별이 아니지?',            zh: '错——柔和确认用 은/는。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '이별은 아니지? · 柔和确认' },
    { type: 'situation', id: 'd89-sc-s2', scenario: 'Junho 讲完 Day 6 的回忆问你当时是不是被吓到了。你想笑着承认，最合适的一句？',                                     choices: [{ ko: '맞아. 그때 진짜 겁먹은 거 맞지.',                                        zh: '对，那时候真的被吓到了。',              correct: true }, { ko: '아니야, 하나도 안 무서웠어.',                zh: '不，一点都不怕。（不真诚）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '坦诚 · 回忆' },
    { type: 'situation', id: 'd89-sc-s3', scenario: '你想跟大家说"对我最重要的那些瞬间，都在这里，包括今晚这个房间"，最合适的一句？',                                                   choices: [{ ko: '제일 소중한 순간들, 다 여기 있어. 오늘 밤 이 방까지.',                                        zh: '最珍贵的瞬间，都在这里，包括今晚这个房间。',              correct: true }, { ko: '별로 기억 안 나.',                zh: '不太记得。（冷淡）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '순간 · 珍惜' },

    { type: 'dialogue', id: 'd89-sc-d1', lines: [{ speaker: 'Minji',   ko: '기억나? Day 3 인천공항. 네가 "제 집이 너무 무거워요"라고 했잖아.',                zh: '记得吗？Day 3仁川机场，你说"我家太重了"。' }], blankSpeaker: '토리', choices: [{ ko: '그때 진짜 창피했어. 근데 지금은 웃겨.',                     correct: true, zh: '那时候真尴尬。可现在觉得好笑。' }, { ko: '몰라.',       correct: false, zh: '不知道。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '그런 적 없어.',           correct: false, zh: '没有那回事。（否认）' }], explain: '回忆 · 坦诚' },
    { type: 'dialogue', id: 'd89-sc-d2', lines: [{ speaker: 'Haru',   ko: '지하철. 배터리 1%. 당근이 굴러 나오는 순간.',                  zh: '地铁。电量1%。胡萝卜滚出来的瞬间。' }],  blankSpeaker: '토리', choices: [{ ko: '그 순간이 우리 넷의 뼈대 같아.',                     correct: true, zh: '那个瞬间像是我们四个的骨架。' }, { ko: '기억 안 나.',        correct: false, zh: '不记得了。（冷淡）' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '뼈대 · 隐喻' },
    { type: 'dialogue', id: 'd89-sc-d3', lines: [{ speaker: 'Haru',   ko: '이별은 없어. 우리 넷은 계속 이어져 있을 거야. 한국어로.',                    zh: '没有离别。我们四个会一直相连。用韩语。' }], blankSpeaker: '토리', choices: [{ ko: '응. 나도 그렇게 믿어. 계속 한국어로 이어지자.',    correct: true, zh: '嗯。我也这样相信。用韩语继续下去。' }, { ko: '아니야, 이제 안 만날 거야.',      correct: false, zh: '不，以后不见了。（语义反）' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '너 잠 좀 자.',           correct: false, zh: '你睡吧。（跑题）' }], explain: '이어지자 · 约定' },

    { type: 'context', id: 'd89-sc-c1', ko: '우리, 이별은 아니지?',   promptZh: '这句在场景中的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 89 主题句 · ~은/는 아니지? = 不是…吧?(柔和确认) · Tori 天亮时怕这是告别,轻声问出来,心里希望听到"不是"',       correct: true }, { zh: '宣布分手',          correct: false }, { zh: '命令大家离开',       correct: false }, { zh: '确定要告别',                correct: false }], explain: '柔和确认否定' },
    { type: 'context', id: 'd89-sc-c2', ko: '이별은 없어. 계속 이어져 있을 거야.', promptZh: '这句（Haru 说的）在Day 89的意义，哪句最准确？',                                                             choices: [{ zh: 'Haru 凌晨的承诺 · "没有离别,我们会一直连着——用韩语" · 四个人的羁绊不因毕业断裂,韩语成了永远的纽带',       correct: true }, { zh: '大家要各奔东西',                correct: false }, { zh: '不再联系',                  correct: false }, { zh: '韩语学不下去了',                correct: false }], explain: '羁绊延续 · 韩语为纽带' },
  ],
};
