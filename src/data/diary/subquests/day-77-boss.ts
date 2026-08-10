import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 77 · 3-5 Boss 战 · 🎒 여행 계획 발표·最高分 · ~을/를 ~에 담다 */
export const day77Boss: BossSubQuestData = {
  day: 17, level: 'advanced', idx: 5, kind: 'boss',
  koTitle: '발표의 관문',
  subtitle: '🎒 한빛대 강의실 · 제주도 설계 · 100점',

  intro: '周二下午。한빛大学口语发表课，作业是设计一次虚拟旅行计划并展示5分钟。你选了济州岛三日游，把釜山旅行学到的"密度比速度更重要"落进设计里。PPT 一页页翻过，你用韩语讲每一部分。今天要用 ~을/를 ~에 담다 把设计说清楚：흐름을 3일에 담았습니다 → 추억을 여행에 담았어요 → 속도보다 밀도가 중요합니다。',
  outroHook: '"토리 씨, 이번 발표 100점입니다." 你的第一个满分。Danielle 走过来说结构真好、她也学到了——这比100分更让人心跳。明天，纸上的济州岛要变成真的了，四个人再次出发。（Day 78 · 제주도）',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd77-b5-t1', audioKo: '흐름을 3일에 담았어요.',                                            choices: [{ text: '把流程装进了3天。',                    correct: true }, { text: '3天太短了。',                  correct: false }, { text: '流程很乱。',              correct: false }, { text: '没有流程。',              correct: false }], explain: 'Day 77 设计句 · ~을/를 ~에 담다' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd77-b5-t2', audioKo: '속도보다 밀도가 중요합니다.',                                        choices: [{ text: '密度比速度重要。',                    correct: true }, { text: '速度比密度重要。',                  correct: false }, { text: '两个都重要。',                    correct: false }, { text: '都不重要。',                  correct: false }], explain: '~보다 + 밀도' } },
    { type: 'choice',  label: '~을/를 ~에 담다', task: { id: 'd77-b5-t3', promptZh: '"把心意装进信里"哪句正确？',                                                                                                                                    choices: [{ text: '마음을 편지가 담았어요.',                     correct: false }, { text: '마음을 편지에 담았어요.',        correct: true }, { text: '마음이 편지에 담았어요.',              correct: false }, { text: '마음에 편지를 담았어요.',                 correct: false }], explain: '内容 마음을 + 容器 편지에 담다' } },
    { type: 'choice',  label: '~을/를 ~에 담다', task: { id: 'd77-b5-t4', promptZh: '"装进3天的流程"（定语）哪句正确？',                                                                                                                                    choices: [{ text: '3일에 담기는 흐름',                          correct: false }, { text: '3일에 담긴 흐름',    correct: true }, { text: '3일에 담을 흐름',                    correct: false }, { text: '3일에 담는 흐름',                    correct: false }], explain: '被动完成定语 · 담긴 흐름' } },
    { type: 'choice',  label: '认词',         task: { id: 'd77-b5-t5', promptKo: '밀도',    promptHangul: 'mil-do',                                                                                                                             choices: [{ text: '密度',                    correct: true }, { text: '速度',                            correct: false }, { text: '温度',                            correct: false }, { text: '高度',                              correct: false }], explain: '密(밀) + 度(도)' } },
    { type: 'compose', label: '组句',         task: { id: 'd77-b5-t6', zhHint: '把流程装进3天。',                                                                                                                                            audioKo: '흐름을 3일에 담았어요.',                            answer: ['흐름을', '3일에', '담았어요.'],   tokens: ['흐름을', '3일에', '담았어요.', '흐름이', '3일이', '담아요.'],         explain: 'Day 77 设计句' } },
    { type: 'compose', label: '组句',         task: { id: 'd77-b5-t7', zhHint: '把妈妈的心意装进信里。',                                                                                                                                            audioKo: '엄마 마음을 편지에 담았어요.',                          answer: ['엄마 마음을', '편지에', '담았어요.'],                              tokens: ['엄마 마음을', '편지에', '담았어요.', '엄마 마음이', '편지가', '담았습니다요.'],           explain: '마음을 + 편지에 담다' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd77-b5-t8', promptZh: 'Danielle 说自己也学到了。你想谦逊回应、表示以后想互相学习，最自然的一句？',                                                                                            choices: [{ text: '고마워. 다음엔 다니엘 발표도 배우고 싶어.',       correct: true }, { text: '내가 항상 이길 거야.',                  correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라.',                                correct: false }], explain: '谦逊 + ~고 싶어' } },
  ],
};
