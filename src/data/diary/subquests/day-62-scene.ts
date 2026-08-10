import type { SceneSubQuestData } from '@/types/tori-subquest';

/** Day 62 · 3-4 상황 속으로 · 곰다방 面试 */
export const day62Scene: SceneSubQuestData = {
  day: 2, level: 'advanced', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '곰다방 · 面试现场',

  tasks: [
    { type: 'situation', id: 'd62-sc-s1', scenario: '推门进店，想说"我来面试的"，最自然的一句？',                                choices: [{ ko: '안녕하세요, 면접 보러 왔어요.',                 zh: '您好，我来面试。',                correct: true }, { ko: '안녕하세요, 커피 주세요.',              zh: '您好，请给我咖啡。',          correct: false }, { ko: '얼마예요?',                              zh: '多少钱？',                 correct: false }, { ko: '내일 갈게요.',                       zh: '明天再来。',            correct: false }], explain: '正式打招呼 · ~러 왔어요 = 来做某事' },
    { type: 'situation', id: 'd62-sc-s2', scenario: '店长问韩语水平，想诚实说"一点点但一直在学"，最自然的一句？',                    choices: [{ ko: '조금요. 근데 계속 배우고 있어요.',              zh: '一点点。但一直在学。',         correct: true }, { ko: '완벽해요.',                              zh: '完美。',                correct: false }, { ko: '몰라요.',                                zh: '不知道。',                 correct: false }, { ko: '얼마예요?',                              zh: '多少钱？',                 correct: false }], explain: 'Day 62 主题句 · 诚实 + 承诺' },
    { type: 'situation', id: 'd62-sc-s3', scenario: '想一句话介绍性格，说"我算是安静的"，最自然的一句？',                              choices: [{ ko: '저는 조용한 편이에요.',                          zh: '我算是安静的。',              correct: true }, { ko: '저는 조용하는 편이에요.',              zh: '我算是安静的。',           correct: false }, { ko: '저는 시끄러워요.',                     zh: '我很吵。',                correct: false }, { ko: '몰라요.',                                zh: '不知道。',                 correct: false }], explain: 'A + ㄴ 편이에요 · 谦逊自评' },

    { type: 'dialogue', id: 'd62-sc-d1', lines: [{ speaker: '곰다방 사장', ko: '이력서 잘 봤어. 한국어는 얼마나 해?', zh: '简历看了。韩语说到什么水平？' }], blankSpeaker: '토리',   choices: [{ ko: '조금요. 근데 계속 배우고 있어요.',                          correct: true, zh: '一点点。但一直在学。' }, { ko: '완벽해요.',                    correct: false, zh: '完美。' }, { ko: '못해요.',              correct: false, zh: '不会。' }, { ko: '얼마예요?',            correct: false, zh: '多少钱？' }], explain: 'Tori 主题句 · 诚实 + 承诺' },
    { type: 'dialogue', id: 'd62-sc-d2', lines: [{ speaker: '곰다방 사장', ko: '자기 성격 한마디로 소개해봐.',            zh: '一句话介绍自己性格。' }], blankSpeaker: '토리', choices: [{ ko: '저는 조용한 편이에요.',                                       correct: true, zh: '我算是安静的。' }, { ko: '저는 조용하는 편이에요.',      correct: false, zh: '我算是安静的（错）。' }, { ko: '얼마예요?',       correct: false, zh: '多少钱？' }, { ko: '몰라요.',              correct: false, zh: '不知道。' }], explain: 'A + ㄴ 편이에요' },
    { type: 'dialogue', id: 'd62-sc-d3', lines: [{ speaker: '곰다방 사장', ko: '솔직해서 좋아. 내일부터 나오세요.',      zh: '你的诚实好，明天开始上班。' }], blankSpeaker: '토리', choices: [{ ko: '감사합니다. 열심히 하겠습니다.',                             correct: true, zh: '谢谢，会努力。' }, { ko: '싫어요, 안 갈래요.',       correct: false, zh: '不要，我不来。' }, { ko: '얼마예요?',      correct: false, zh: '多少钱？' }, { ko: '몰라요.',              correct: false, zh: '不知道。' }], explain: '正式感谢 · ~겠습니다' },

    { type: 'context', id: 'd62-sc-c1', ko: '조금요. 근데 계속 배우고 있어요.', promptZh: '这句话的场景意义，哪句最准确？', choices: [{ zh: '面试自评黄金句 · "有限承认 + 持续努力" · 比"잘해요/못해요"都更聪明的回答', correct: true }, { zh: '完全不会韩语',            correct: false }, { zh: '韩语学完了',              correct: false }, { zh: '不学韩语了',                correct: false }], explain: '面试策略 · 诚实 + ~고 있어요' },
    { type: 'context', id: 'd62-sc-c2', ko: '완벽한 사람 안 뽑아. 정직한 사람 뽑아.', promptZh: '店长这句话的意义，哪句最准确？',    choices: [{ zh: '"我不招完美的人，我招诚实的人" · Day 62 主题 · 诚实也是能力', correct: true }, { zh: '只招完美的人',              correct: false }, { zh: '不招人',                  correct: false }, { zh: '和诚实无关',              correct: false }], explain: 'Day 62 核心台词' },
  ],
};
