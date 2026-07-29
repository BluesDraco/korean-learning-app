import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 80 · 3-4 상황 속으로 · Haru生病·照顾朋友 */
export const day80Scene: SceneSubQuestData = {
  day: 20, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '302호 · 간병 · 역할 반전',

  tasks: [
    { type: 'situation', id: 'd80-sc-s1', scenario: 'Haru 发烧缩在被子里道歉，你想说"没事，我来照顾你"，哪句最合适？',                                                     choices: [{ ko: '괜찮아, 내가 챙겨줄게.',                zh: '没事，我来照顾你。', correct: true }, { ko: '괜찮아, 내가 챙겨줄래?',            zh: '错——"我来"的承诺用 줄게,不用 줄래。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '~아/어 줄게 · 承诺' },
    { type: 'situation', id: 'd80-sc-s2', scenario: '打医疗热线，想说"头疼、流鼻涕、发烧"，哪句最合适？',                                     choices: [{ ko: '머리가 아프고 콧물이 나고 열이 나요.',      zh: '头疼、流鼻涕、发烧。',              correct: true }, { ko: '머리가 아파고 콧물이 나고 열이 나요.',                  zh: '错——아프다→아프고,不是 아파고。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '~고 症状罗列 · 아프고' },
    { type: 'situation', id: 'd80-sc-s3', scenario: '叮嘱 Haru "吃药、多喝水"（반말），哪句最合适？',                                                      choices: [{ ko: '약 먹고 물 많이 마셔.',      zh: '吃药、多喝水。',              correct: true }, { ko: '약 먹서 물 많이 마셔.',      zh: '错——먹다→먹고,不是 먹서。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '~고 先后 + 반말 마셔' },

    { type: 'dialogue', id: 'd80-sc-d1', lines: [{ speaker: 'Haru',   ko: '너… 나 챙겨주는 거야?',                zh: '你……现在是在照顾我吗？' }], blankSpeaker: '토리', choices: [{ ko: '당연하지. Day 13에 네가 나 챙겨줬잖아.',            correct: true, zh: '当然。Day 13你就这样照顾我的呀。' }, { ko: '난 원래 잘해.',       correct: false, zh: '我本来就行。（跑题）' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。（生硬）' }], explain: '~잖아 · 呼应 Day 13' },
    { type: 'dialogue', id: 'd80-sc-d2', lines: [{ speaker: '상담 간호사',   ko: '어디가 아프세요?',              zh: '哪里不舒服？' }],   blankSpeaker: '토리', choices: [{ ko: '머리가 아프고 콧물이 나고 열이 나요.',            correct: true, zh: '头疼、流鼻涕、发烧。' }, { ko: '아무데도 안 아파요.',    correct: false, zh: '哪都不疼。（语义反）' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어요.',           correct: false, zh: '不要。' }], explain: '~고 症状罗列' },
    { type: 'dialogue', id: 'd80-sc-d3', lines: [{ speaker: 'Haru', ko: '토리, 고마워. 진짜 컸다.',                       zh: '兔莉，谢谢。真长大了。' }], blankSpeaker: '토리', choices: [{ ko: '너한테 배웠어. Day 13에 네가 그랬잖아.',        correct: true, zh: '跟你学的。Day 13你就这样。' }, { ko: '난 원래 잘해.',      correct: false, zh: '我本来就行。（跑题）' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '~잖아 · 温柔回应' },

    { type: 'context', id: 'd80-sc-c1', ko: '내가 챙겨줄게.',   promptZh: '这句在照顾场景的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 80 角色反转句 · ~아/어 줄게 = 我主动为你做的承诺 · Tori 第一次成为照顾别人的一方',       correct: true }, { zh: '让 Haru 照顾自己',          correct: false }, { zh: '命令 Haru',       correct: false }, { zh: '拒绝照顾',                correct: false }], explain: '~아/어 줄게 · 施惠承诺' },
    { type: 'context', id: 'd80-sc-c2', ko: 'Day 13에 네가 나 챙겨줬잖아.', promptZh: '这句的意义，哪句最准确？',                                                                     choices: [{ zh: '"Day 13你就这样照顾我的呀" · ~잖아 提起双方都知道的往事 · 照顾从 Haru→Tori 反转回来,情感闭环',       correct: true }, { zh: 'Day 13 什么都没发生',                correct: false }, { zh: '责怪 Haru',                  correct: false }, { zh: '在问路',                correct: false }], explain: '~잖아 · 呼应往事' },
  ],
};
