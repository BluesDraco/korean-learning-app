import type { BossSubQuestData } from '@/types/tori-subquest';

/** Day 56 · 2-5 Boss 战 · 🎒 成为别人的 Haru */
export const day56Boss: BossSubQuestData = {
  day: 26, level: 'intermediate', idx: 5, kind: 'boss',
  koTitle: '전달의 관문',
  subtitle: '🎒 走廊里 · Day 3 反过来一遍',
  intro: '한빛 기숙사 3 층 복도。走出宿舍门看到一只新来的兔子拖着爆开的行李箱，衣服散落一地。"집이 진짜 너무 무거워요…" 你愣了一秒 —— 这不就是 Day 3 的自己吗？Day 3 Minji 蹲下来帮你捡；今天你蹲下来。要用韩语温柔纠错、经验安慰、陪伴收拾。~아/어 봤어요 是今天的核心 —— 我也是那样过来的。',
  outroHook: '把最后一件衣服叠好塞进箱子。新生红着眼睛说 "언니, 감사해요." 你笑了 —— 이제 내가 그 사람이 됐구나. Day 3 到 Day 56，你从被扶起的兔子，变成了扶别人起来的兔子。',

  tasks: [
    { type: 'choice',  label: '听句选意',     task: { id: 'd56-b5-t1', audioKo: '"집"이 아니라 "짐"이에요.',                       choices: [{ text: '不是"家"是"行李"。',                  correct: true }, { text: '不是"行李"是"家"。',                    correct: false }, { text: '"家"就是"行李"。',                      correct: false }, { text: '两个都不对。',                          correct: false }], explain: '辨析结构' } },
    { type: 'choice',  label: '听句选意',     task: { id: 'd56-b5-t2', audioKo: '나도 처음에 똑같이 실수해 봤어요.',                choices: [{ text: '我一开始也一样犯过错。',              correct: true }, { text: '我从来没犯错。',                      correct: false }, { text: '你不能犯错。',                          correct: false }, { text: '我第一次犯错。',                      correct: false }], explain: '~아/어 봤어요 经验安慰' } },
    { type: 'choice',  label: '经验语用',     task: { id: 'd56-b5-t3', promptZh: '"我尝过韩国料理"（有经验）哪句最贴切？',                                                                                                    choices: [{ text: '한국 음식을 먹었어요.',                        correct: false }, { text: '한국 음식을 먹어 봤어요.',                correct: true }, { text: '한국 음식을 먹고 있어요.',                    correct: false }, { text: '한국 음식을 먹을 거예요.',                    correct: false }], explain: '~아/어 봤어요 表尝试经验' } },
    { type: 'choice',  label: '辨析结构',     task: { id: 'd56-b5-t4', promptZh: '"不是"家"是"行李""哪句最自然？',                                                                                                        choices: [{ text: '"집"이 있으면 "짐"이에요.',                    correct: false }, { text: '"집"이 아니라 "짐"이에요.',                correct: true }, { text: '"집"라서 "짐"이에요.',                       correct: false }, { text: '"집" 아니고 "짐" 있어요.',                    correct: false }], explain: 'N 이 아니라 N' } },
    { type: 'choice',  label: '认词',         task: { id: 'd56-b5-t5', promptKo: '받침', promptHangul: 'bat-chim',                                                                                                       choices: [{ text: '收音',              correct: true }, { text: '元音',              correct: false }, { text: '发音',              correct: false }, { text: '声调',                     correct: false }], explain: '韩语字母下部' } },
    { type: 'compose', label: '组句',         task: { id: 'd56-b5-t6', zhHint: '我一开始也一样犯过错。',                                                                                                                  audioKo: '나도 처음에 똑같이 실수해 봤어요.',            answer: ['나도', '처음에', '똑같이', '실수해', '봤어요.'],       tokens: ['나도', '처음에', '똑같이', '실수해', '봤어요.', '실수했어요.', '실수하고', '봐요.'],                     explain: '~아/어 봤어요 经验安慰' } },
    { type: 'compose', label: '组句',         task: { id: 'd56-b5-t7', zhHint: '不是"家"是"行李"。只是差一个收音。',                                                                                                    audioKo: '"집"이 아니라 "짐"이에요. 받침 하나 차이예요.', answer: ['"집"이', '아니라', '"짐"이에요.', '받침', '하나', '차이예요.'], tokens: ['"집"이', '아니라', '"짐"이에요.', '받침', '하나', '차이예요.', '있으면', '없어요.', '있어요.'],       explain: '辨析 + 说明' } },
    { type: 'choice',  label: '情景选回应',   task: { id: 'd56-b5-t8', promptZh: '新生说 "진짜 너무 창피해요"。你想安慰"我也犯过"，最自然的一句？',                                                                    choices: [{ text: '괜찮아요. 나도 처음에 똑같이 실수해 봤어요.',            correct: true }, { text: '창피해할 만해요.',                        correct: false }, { text: '얼마예요?',                              correct: false }, { text: '싫어요.',                                correct: false }], explain: '安慰经验' } },
  ],
};
