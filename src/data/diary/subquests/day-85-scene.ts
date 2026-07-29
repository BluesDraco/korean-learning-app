import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 85 · 3-4 상황 속으로 · 카운트다운·倒计时 */
export const day85Scene: SceneSubQuestData = {
  day: 25, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '고급반 교실 · 카운트다운 · 추억 나누기',

  tasks: [
    { type: 'situation', id: 'd85-sc-s1', scenario: 'Danielle 问今天谁来撕日历，你想主动说"我撕，想分享Day 42的故事"，哪句最合适？',                                                     choices: [{ ko: '제가 뜯을게요. Day 42 이야기 나눌게요.',                zh: '我来撕，想分享Day 42的故事。', correct: true }, { ko: '제가 뜯을래요? 이야기 있어요?',            zh: '错——主动承担用 뜯을게요,不是疑问 뜯을래요。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '~ㄹ게요 · 主动承担' },
    { type: 'situation', id: 'd85-sc-s2', scenario: '想诗意地说"每撕一张纸，一起的时间也少一张"，哪句最合适？',                                     choices: [{ ko: '종이를 뜯을 때마다 함께한 시간도 줄어요.',      zh: '每撕一张纸，一起的时间也少一点。',              correct: true }, { ko: '종이를 뜯 때마다 시간도 줄어요.',                  zh: '错——뜯다有收音要 뜯을 때마다。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '~(으)ㄹ 때마다 · 뜯을 때마다' },
    { type: 'situation', id: 'd85-sc-s3', scenario: '想跟大家说"剩下的几天，好好记住吧"，哪句最合适？',                                                      choices: [{ ko: '남은 며칠, 소중하게 기억해두자.',      zh: '剩下的几天，好好记住吧。',              correct: true }, { ko: '이제 지루해. 빨리 끝내자.',      zh: '好无聊，快结束吧。（跑题）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '기억해두다 · 珍惜' },

    { type: 'dialogue', id: 'd85-sc-d1', lines: [{ speaker: 'Danielle',   ko: '오늘의 이야기를 하나 나누고 뜯자.',                zh: '分享一个故事再撕吧。' }], blankSpeaker: '토리', choices: [{ ko: 'Day 42 발표 날 이야기 할게요. 처음 박수받은 날.',            correct: true, zh: '我讲Day 42发表那天，第一次被鼓掌。' }, { ko: '이야기 없어요. 그냥 뜯어요.',       correct: false, zh: '没故事，直接撕。（跑题）' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。（生硬）' }], explain: '分享回忆' },
    { type: 'dialogue', id: 'd85-sc-d2', lines: [{ speaker: 'Junho',   ko: '이 노래 들으니까 옛날 생각난다.',              zh: '听这歌就想起以前。' }],   blankSpeaker: '토리', choices: [{ ko: '맞아, 이 노래 들을 때마다 그때가 생각나.',            correct: true, zh: '对，每次听这歌都想起那时候。' }, { ko: '아니, 처음 듣는 노래야.',    correct: false, zh: '不，第一次听。（语义反）' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: '~(으)ㄹ 때마다 · 들을 때마다' },
    { type: 'dialogue', id: 'd85-sc-d3', lines: [{ speaker: 'Haru', ko: '이제 며칠 안 남았네.',                       zh: '没剩几天了。' }], blankSpeaker: '토리', choices: [{ ko: '응. 남은 시간 잘 기억해두고 싶어.',        correct: true, zh: '嗯，想把剩下的时间好好记住。' }, { ko: '빨리 끝났으면 좋겠어.',      correct: false, zh: '真希望快点结束。（不搭）' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '기억해두다 · 珍惜' },

    { type: 'context', id: 'd85-sc-c1', ko: '종이를 뜯을 때마다 함께한 시간도 줄어요.',   promptZh: '这句在倒计时场景的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 85 诗意句 · ~(으)ㄹ 때마다 每当 · 用"撕日历=时间流逝"的对应,写出临别的珍惜',       correct: true }, { zh: '嫌撕纸麻烦',          correct: false }, { zh: '命令别人撕纸',       correct: false }, { zh: '时间越来越多',                correct: false }], explain: '~(으)ㄹ 때마다 · 时间隐喻' },
    { type: 'context', id: 'd85-sc-c2', ko: '남은 며칠, 소중하게 기억해두자.', promptZh: '这句的意义，哪句最准确？',                                                                     choices: [{ zh: '"剩下的几天，好好记住吧" · 기억해두다 · Tori 提议珍惜临别前的时光',       correct: true }, { zh: '快点结束',                correct: false }, { zh: '别记住',                  correct: false }, { zh: '还早得很',                correct: false }], explain: '기억해두다 · 珍惜' },
  ],
};
