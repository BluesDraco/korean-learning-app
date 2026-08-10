import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 79 · 3-4 상황 속으로 · 제주도迷路·没信号 */
export const day79Scene: SceneSubQuestData = {
  day: 19, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '제주 돌담길 · 길 찾기 · Day 7과 다른 오늘',

  tasks: [
    { type: 'situation', id: 'd79-sc-s1', scenario: '在石墙路迷宫里手机没信号，看到长椅上的奶奶，想问茶博物馆怎么走，最合适的开场？',                                                     choices: [{ ko: '저기요, 죄송한데 티 뮤지엄이 어디예요?',                zh: '不好意思，请问茶博物馆在哪？', correct: true }, { ko: '티 뮤지엄 좋아요?',            zh: '茶博物馆好吗？（答非所问）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '问路 · 어디예요?' },
    { type: 'situation', id: 'd79-sc-s2', scenario: '想跟自己说"Day 7时哭了，但今天问了路"来对比成长，哪句最合适？',                                     choices: [{ ko: 'Day 7 때는 울었지만, 오늘은 물어봤어.',      zh: 'Day 7时哭了，但今天问了路。',              correct: true }, { ko: 'Day 7 때는 울지만, 오늘은 물어봤어.',                  zh: '错——回顾过去用 울었지만。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '回顾对比 ~았지만' },
    { type: 'situation', id: 'd79-sc-s3', scenario: '想感慨"那时（当初）有信号就好了"，哪句最合适？',                                                      choices: [{ ko: '신호가 있었으면 좋았을 텐데.',      zh: '（当时）有信号就好了。',              correct: true }, { ko: '신호가 있으면 좋을 텐데.',      zh: '错——反事实回顾要用 있었으면 좋았을 텐데。',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '반사실 ~았으면 + 좋았을 텐데' },

    { type: 'dialogue', id: 'd79-sc-d1', lines: [{ speaker: '할머니',   ko: '저기 쭉 가서, 큰 나무 지나면, 왼쪽으로 도세요.',                zh: '往那边直走，过大树，左转。' }], blankSpeaker: '토리', choices: [{ ko: '감사합니다, 할머니! 이제 알겠어요.',            correct: true, zh: '谢谢奶奶！我知道了。' }, { ko: '사투리로 말해 주세요.',       correct: false, zh: '错——奶奶已用标准语，跑题。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。（生硬）' }], explain: '听懂后致谢' },
    { type: 'dialogue', id: 'd79-sc-d2', lines: [{ speaker: 'Haru',   ko: '토리, 전화 왜 안 받아? 걱정했잖아.',              zh: '兔莉，为什么不接电话？担心死了。' }],   blankSpeaker: '토리', choices: [{ ko: '신호가 없었어. 근데 혼자 잘 찾아왔어.',            correct: true, zh: '没信号。但自己顺利找到了。' }, { ko: '전화 받기 싫었어.',    correct: false, zh: '不想接电话。（伤人）' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '싫어.',           correct: false, zh: '不要。' }], explain: '解释 + 让对方放心' },
    { type: 'dialogue', id: 'd79-sc-d3', lines: [{ speaker: '준호', ko: '토리, 진짜 컸다.',                       zh: '兔莉，真的长大了。' }], blankSpeaker: '토리', choices: [{ ko: '이제 길 잃어도 안 울거든.',        correct: true, zh: '现在即使迷路也不哭了呢。' }, { ko: '싫어, 저리 가.',      correct: false, zh: '走开。' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '~아/어도 + 안 울다' },

    { type: 'context', id: 'd79-sc-c1', ko: 'Day 7 때는 울었지만, 오늘은 물어봤어요.',   promptZh: '这句在济州迷路场景的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 79 成长对比框架 · "그때는 ~았지만 지금은 ~아요" · 同样迷路，Day 7 只会哭，今天会用韩语问路了',       correct: true }, { zh: '今天也哭了',          correct: false }, { zh: '命令别人问路',       correct: false }, { zh: 'Day 7 没迷路',                correct: false }], explain: '回顾对比 · 成长' },
    { type: 'context', id: 'd79-sc-c2', ko: '이제 길 잃어도 안 울어요.', promptZh: '这句的意义，哪句最准确？',                                                                     choices: [{ zh: '"现在即使迷路也不哭了" · ~아/어도 让步 · Tori 面对困境的心态变化，独立与从容',       correct: true }, { zh: '再也不会迷路',                correct: false }, { zh: '迷路就一定哭',                  correct: false }, { zh: '不敢一个人走',                correct: false }], explain: '~아/어도 · 让步 · 成长' },
  ],
};
