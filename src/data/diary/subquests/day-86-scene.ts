import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 86 · 3-4 상황 속으로 · 重走Day 1-7的路 */
export const day86Scene: SceneSubQuestData = {
  day: 26, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '弘爪 승강장 · 러시아 유학생 · 같은 길',

  tasks: [
    { type: 'situation', id: 'd86-sc-s1', scenario: '你重走当年的路，Haru 问你感受。你想说"路照旧，只有我变了"，最合适的一句？',                                          choices: [{ ko: '길은 그대로인데, 나만 달라졌어.',                zh: '路照旧，只有我变了。', correct: true }, { ko: '길이 다 변했어.',            zh: '路全变了。（语义反）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '은/는 그대로 + 나만 달라졌다' },
    { type: 'situation', id: 'd86-sc-s2', scenario: '站台上有个陌生的留学生在张望。你想像 Day 35 那样主动问他要找哪里，最合适的一句？',                                     choices: [{ ko: '어디 찾으세요? 도와드릴까요?',                                    zh: '您找哪里？需要帮忙吗？',              correct: true }, { ko: '왜 여기 서 있어요?',                zh: '你为什么站这？（生硬）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라요.',                       zh: '不知道。',            correct: false }], explain: '主动 · 어디 찾으세요 + 도와드릴까요' },
    { type: 'situation', id: 'd86-sc-s3', scenario: '你想在笔记本上写下今天的感悟——"风景照旧，只有心变了"，哪句最合适？',                                                   choices: [{ ko: '풍경은 그대로, 마음만 달라졌어.',                                        zh: '风景照旧，只有心变了。',              correct: true }, { ko: '풍경도 마음도 다 그대로야.',                zh: '风景和心都照旧。（语义反）',           correct: false }, { ko: '얼마예요?',                          zh: '多少钱？',                 correct: false }, { ko: '몰라.',                       zh: '不知道。',            correct: false }], explain: '은/는 그대로 + 마음만 달라졌다' },

    { type: 'dialogue', id: 'd86-sc-d1', lines: [{ speaker: '러시아 유학생',   ko: '저… 한빛 어학당 어떻게 가요?',                    zh: '那个……韩光语学堂怎么走？' }], blankSpeaker: '토리', choices: [{ ko: '2번 출구로 나가서 왼쪽으로 쭉 가세요.',                     correct: true, zh: '从2号出口出去，左转直走。' }, { ko: '몰라요.',       correct: false, zh: '不知道。（不帮忙）' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '싫어요.',           correct: false, zh: '不要。' }], explain: '指路 · 出口 + 方向' },
    { type: 'dialogue', id: 'd86-sc-d2', lines: [{ speaker: '러시아 유학생',   ko: '처음이라 너무 긴장돼요.',                  zh: '第一次来，好紧张。' }],  blankSpeaker: '토리', choices: [{ ko: '괜찮아요. 저도 처음엔 그랬어요.',                     correct: true, zh: '没事。我一开始也这样。' }, { ko: '긴장하면 안 돼요.',        correct: false, zh: '不许紧张。（生硬）' }, { ko: '얼마예요?',        correct: false, zh: '多少钱？' }, { ko: '몰라요.',           correct: false, zh: '不知道。' }], explain: '共感 · 저도 처음엔 그랬어요' },
    { type: 'dialogue', id: 'd86-sc-d3', lines: [{ speaker: '하루',   ko: '이제 이 길 마지막이네. 기분 어때?',                    zh: '这条路是最后一次了吧。什么感觉？' }], blankSpeaker: '토리', choices: [{ ko: '길은 그대로인데 나만 달라진 것 같아.',    correct: true, zh: '好像路照旧，只有我变了。' }, { ko: '길이 너무 변했어.',      correct: false, zh: '路变太多了。（语义反）' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라.',           correct: false, zh: '不知道。' }], explain: '은/는 그대로 + 나만' },

    { type: 'context', id: 'd86-sc-c1', ko: '길은 그대로, 사람만 달라졌다.',   promptZh: '这句（Tori 写在笔记本上的）在场景中的意义，哪句最准确？',                                                              choices: [{ zh: 'Day 86 명제 · 은/는 그대로 + ~만 달라졌다 · 同一条路第二次走，变的不是路，是走过它的人——Tori 的成长',       correct: true }, { zh: '路重修了',          correct: false }, { zh: '换了新路线',       correct: false }, { zh: '人没变',                correct: false }], explain: '不变 vs 变 · 成长' },
    { type: 'context', id: 'd86-sc-c2', ko: '저도 처음엔 그랬어요.', promptZh: '这句（Tori 对留学生说的）在场景中的意义，哪句最准确？',                                                             choices: [{ zh: 'Tori 曾是 Day 7 站台上害怕的那个人,如今换她安慰新来者——她从"被指路的人"变成"指路的人"',       correct: true }, { zh: 'Tori 从没紧张过',                correct: false }, { zh: 'Tori 不想帮忙',                  correct: false }, { zh: 'Tori 也迷路了',                correct: false }], explain: '角色的翻转 · 被帮助 → 帮助别人' },
  ],
};
