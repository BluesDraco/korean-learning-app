import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 87 · 3-4 상황 속으로 · 妈妈来接机 */
export const day87Scene: SceneSubQuestData = {
  day: 27, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '인천 공항 · 4호선 · 엄마와 함께',

  tasks: [
    { type: 'situation', id: 'd87-sc-s1', scenario: '妈妈出关抱住你。你想笑着抱回去、说"妈妈我等你好久了"，最合适的一句？',                                          choices: [{ ko: '엄마! 웃으면서 안아 주는데 눈물 날 것 같아요. 오래 기다렸어요.',                zh: '妈妈！笑着抱我我都要哭了。等你好久了。', correct: true }, { ko: '왜 이렇게 늦게 왔어요?',            zh: '怎么这么晚才来？（生硬）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '웃으면서 + 재회' },
    { type: 'situation', id: 'd87-sc-s2', scenario: '坐四号线时妈妈问外面是哪。你想一边看窗外一边讲给她听，最合适的一句？',                                     choices: [{ ko: '엄마, 창밖 보면서 설명해 줄게요. 여기가 인천이에요.',                                        zh: '妈妈，我边看窗外边给你讲。这是仁川。',              correct: true }, { ko: '창밖 보고 나서 설명 안 해요.',                zh: '看完窗外就不讲了。（语义反）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '싫어요.',                       zh: '不要。',            correct: false }], explain: '보면서 · 边看边讲' },
    { type: 'situation', id: 'd87-sc-s3', scenario: '你想跟妈妈说"你就是我韩语最珍贵的听众"，最合适的一句？',                                                   choices: [{ ko: '엄마가 제 한국어의 가장 소중한 청중이에요.',                                        zh: '妈妈是我韩语最珍贵的听众。',              correct: true }, { ko: '엄마는 한국어 하나도 못 알아들어요.',                zh: '妈妈一句韩语都听不懂。（不体贴）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '청중 · 灵魂句' },

    { type: 'dialogue', id: 'd87-sc-d1', lines: [{ speaker: '엄마', ko: '우리 딸! 살 좀 붙었네.',                zh: '闺女！长了点肉。' }], blankSpeaker: '토리', choices: [{ ko: '밥 잘 먹으니까요. 엄마, 정말 오래 기다렸어요.',                     correct: true, zh: '因为吃得好嘛。妈妈，等你好久了。' }, { ko: '살 안 쪘어요.',       correct: false, zh: '我没胖。（生硬）' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '싫어요.',           correct: false, zh: '不要。' }], explain: '再会 · ~니까' },
    { type: 'dialogue', id: 'd87-sc-d2', lines: [{ speaker: '엄마', ko: '이게 다 뭐라고 하는 거야? 하나도 모르겠네.',   zh: '你说的这都是啥？我一句也听不懂。' }],  blankSpeaker: '토리', choices: [{ ko: '괜찮아요. 그냥 제 이야기를 한국어로 하는 거예요.',                     correct: true, zh: '没关系，我只是在用韩语讲我自己的故事。' }, { ko: '그럼 말 안 할래요.',        correct: false, zh: '那我不说了。（赌气）' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '괜찮아요 + 설명' },
    { type: 'dialogue', id: 'd87-sc-d3', lines: [{ speaker: '엄마',   ko: '팔짱 껴도 돼?',                    zh: '可以挽着你吗？' }], blankSpeaker: '토리', choices: [{ ko: '당연하죠. 엄마 손 잡고 걸으면서 구경해요.',    correct: true, zh: '当然啦。挽着妈妈边走边看。' }, { ko: '싫어요. 창피해요.',      correct: false, zh: '不要，好丢脸。（不体贴）' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '걸으면서 · 边走边看' },

    { type: 'context', id: 'd87-sc-c1', ko: '엄마가 제 한국어의 가장 소중한 청중이에요.',   promptZh: '这句在场景中的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 87 灵魂句 · 妈妈听不懂韩语,却是 Tori 最珍贵的听众——她听的不是内容,是女儿用韩语讲自己故事这件事本身',       correct: true }, { zh: '妈妈是韩语老师',          correct: false }, { zh: '妈妈会说韩语',       correct: false }, { zh: '妈妈不想听',                correct: false }], explain: '청중 · 情感高潮' },
    { type: 'context', id: 'd87-sc-c2', ko: '창밖을 보면서 설명했어요.', promptZh: '这句体现的 ~(으)면서 用法，哪句最准确？',                                                             choices: [{ zh: '~(으)면서 = 同时做两个动作 · Tori 一边看窗外一边给妈妈讲兽尔,同一主语两个动作并行',       correct: true }, { zh: '先看完再讲',                correct: false }, { zh: '因为看所以讲',                  correct: false }, { zh: '不看也不讲',                correct: false }], explain: '~(으)면서 · 同时动作' },
  ],
};
