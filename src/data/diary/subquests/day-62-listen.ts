import type { ListenSubQuestData } from '@/types/tori-subquest';

/** Day 62 · 3-2 귀 트이기 · ~는/은 편이에요 · 곰다방 面试 */
export const day62Listen: ListenSubQuestData = {
  day: 2, level: 'advanced', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '곰다방 · 面试 · 诚实也是能力',

  meaning: [
    { id: 'd62-l2-m1', audioKo: '이력서 잘 봤어. 한국어는 얼마나 해?',      choices: [{ text: '简历看了。韩语说到什么水平？',    correct: true }, { text: '简历没看。',                  correct: false }, { text: '韩语教教我。',                correct: false }, { text: '简历再交一份。',              correct: false }], explain: '店长面试开场 · 얼마나 + V' },
    { id: 'd62-l2-m2', audioKo: '조금요. 근데 계속 배우고 있어요.',          choices: [{ text: '一点点。但一直在学。',            correct: true }, { text: '很多。已经会了。',            correct: false }, { text: '不会。也不想学。',            correct: false }, { text: '教你一点。',                    correct: false }], explain: 'Tori 主题句 · 조금 + 근데 + ~고 있어요' },
    { id: 'd62-l2-m3', audioKo: '솔직해서 좋아. 완벽한 사람 안 뽑아. 정직한 사람 뽑아.', choices: [{ text: '诚实好。不招完美的人，招诚实的人。',    correct: true }, { text: '完美的人才招。',                 correct: false }, { text: '诚实不好。',                     correct: false }, { text: '谁都不招。',                     correct: false }], explain: '店长 · Day 62 关键台词' },
    { id: 'd62-l2-m4', audioKo: '내일부터 나오세요.',                          choices: [{ text: '明天开始上班。',                    correct: true }, { text: '明天不用来。',                  correct: false }, { text: '内天再考虑。',                  correct: false }, { text: '今天下班。',                    correct: false }], explain: '录取通知 · ~부터 + ~세요' },
    { id: 'd62-l2-m5', audioKo: '한국어 잘하는 편이에요.',                    choices: [{ text: '韩语算说得可以。',                  correct: true }, { text: '韩语完全不行。',                correct: false }, { text: '韩语说得最好。',                correct: false }, { text: '不学韩语。',                    correct: false }], explain: '~는 편이에요 · 谦逊自评' },
  ],

  cloze: [
    { id: 'd62-l2-c1', audioKo: '한국어를 잘하는 편이에요.',   clozeParts: ['한국어를 잘하', ' 편이에요.'],     choices: [{ text: '는',   correct: true }, { text: '은',    correct: false }, { text: '을',    correct: false }, { text: '아서', correct: false }], explain: '**动词** + 는 편이에요 · 잘하다 → 잘하는' },
    { id: 'd62-l2-c2', audioKo: '저는 조용한 편이에요.',         clozeParts: ['저는 조용', ' 편이에요.'],         choices: [{ text: '한',   correct: true }, { text: '는',    correct: false }, { text: '을',    correct: false }, { text: '해서', correct: false }], explain: '**形容词** + ㄴ/은 편이에요 · 조용하다 → 조용한' },
    { id: 'd62-l2-c3', audioKo: '이력서를 꼼꼼히 보는 편이에요.', clozeParts: ['이력서를 꼼꼼히 ', ' 편이에요.'], choices: [{ text: '보는',   correct: true }, { text: '본',    correct: false }, { text: '봐서',   correct: false }, { text: '보고',   correct: false }], explain: 'V + 는 편이에요 · 보다 → 보는' },
    { id: 'd62-l2-c4', audioKo: '어렸을 때 키가 작은 편이었어요.', clozeParts: ['어렸을 때 키가 작은 ', '.'],       choices: [{ text: '편이었어요', correct: true }, { text: '편이에요', correct: false }, { text: '편이야', correct: false }, { text: '편이라서', correct: false }], explain: '过去时放句尾 · 편이었어요' },
  ],

  reply: [
    { id: 'd62-l2-r1', audioKo: '한국어는 얼마나 해?',                     promptZh: '店长面试问你韩语水平。你想诚实说"一点点但一直在学"，最自然的一句？',       choices: [{ text: '조금요. 근데 계속 배우고 있어요.',                     correct: true }, { text: '완벽해요.',                       correct: false }, { text: '몰라요.',                              correct: false }, { text: '얼마예요?',                            correct: false }], explain: 'Tori 主题句 · 诚实 + 承诺' },
    { id: 'd62-l2-r2', audioKo: '자기 성격 한마디로 소개해봐.',             promptZh: '店长让你一句话介绍性格。你想说"我算是安静的"，最自然的一句？',          choices: [{ text: '저는 조용한 편이에요.',                                  correct: true }, { text: '저는 조용하는 편이에요.',        correct: false }, { text: '저는 조용해요, 얼마예요?',           correct: false }, { text: '저는 몰라요.',                          correct: false }], explain: 'A + ㄴ 편이에요 · 谦逊自评' },
    { id: 'd62-l2-r3', audioKo: '내일부터 나오세요.',                        promptZh: '店长录取你了。你想正式感谢并承诺认真做，最自然的一句？',                     choices: [{ text: '감사합니다. 열심히 하겠습니다.',                          correct: true }, { text: '싫어요, 안 갈래요.',              correct: false }, { text: '얼마예요?',                              correct: false }, { text: '몰라요.',                                correct: false }], explain: '正式感谢 + ~겠습니다' },
  ],
};
