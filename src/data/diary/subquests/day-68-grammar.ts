import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 68 · 3-3 문법 탐험 · ~아/어야 되다 / 하다 · 必须 / 应该 */
export const day68Grammar: GrammarSubQuestData = {
  day: 8, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '必须 / 应该：~아/어야 되다 · 하다',

  fix: [
    { id: 'd68-g3-f1', promptKo: '다시 가서 말하야 돼요.',        promptZh: '"必须回去说清楚"哪句正确？',                       choices: [{ text: '다시 가서 말하야 돼요.',             correct: false }, { text: '다시 가서 말해야 돼요.',              correct: true }, { text: '다시 가서 말하 돼요.',                     correct: false }, { text: '다시 가서 말하기 돼요.',                          correct: false }], explain: '말하 + 어 → **말해** + 야 되다 · 하다缩合' },
    { id: 'd68-g3-f2', promptKo: '이력서를 다시 보야 돼요.',        promptZh: '"简历必须再看一次"哪句正确？',                     choices: [{ text: '이력서를 다시 보야 돼요.',            correct: false }, { text: '이력서를 다시 봐야 돼요.',              correct: true }, { text: '이력서를 다시 봐서 돼요.',                   correct: false }, { text: '이력서를 다시 본 돼요.',                          correct: false }], explain: '보 + 아 → 봐 + 야 되다' },
    { id: 'd68-g3-f3', promptKo: '체력이 좋아야 되요.',              promptZh: '"体力必须好"哪句正确？',                            choices: [{ text: '체력이 좋아야 되요.',                 correct: false }, { text: '체력이 좋아야 돼요.',                correct: true }, { text: '체력이 좋는 야 돼요.',                     correct: false }, { text: '체력이 좋기 야 돼요.',                            correct: false }], explain: '되요 (X) / **돼요** (O) · 되어요 → 돼요' },
    { id: 'd68-g3-f4', promptKo: '용기를 내야 해요.',                promptZh: '"必须拿出勇气"（正式写法）哪句正确？',              choices: [{ text: '용기를 내야 해요.',                    correct: true }, { text: '용기를 내기 해요.',                correct: false }, { text: '용기를 내여 해요.',                        correct: false }, { text: '용기를 내는 해요.',                                correct: false }], explain: '내다 → 내 + 야 하다（야 前用词干 내，不是 내기/내여/내는）' },
    { id: 'd68-g3-f5', promptZh: '关于「~아/어야 되다 vs 하다」的差别，哪句最准确？',                                                                                                                                                                                                              choices: [{ text: '意思一样 · ~야 **되다** 更口语 / ~야 **하다** 更书面正式 · 混用不会错', correct: true }, { text: '两者完全不同',              correct: false }, { text: '~야 되다 是命令',        correct: false }, { text: '~야 하다 只用过去',            correct: false }], explain: '두 개 통용 · 语感差 = 口语 vs 书面' },
  ],

  compose: [
    { id: 'd68-g3-c1', zhHint: '我必须回去说清楚。',           audioKo: '다시 가서 말해야 돼요.',            answer: ['다시', '가서', '말해야 돼요.'],           tokens: ['다시', '가서', '말해야 돼요.', '말하야', '말하 돼요.', '말하기', '말했어요.'],                        explain: '말하 + 어 → 말해야 돼요' },
    { id: 'd68-g3-c2', zhHint: '简历必须再看一次。',           audioKo: '이력서를 다시 봐야 돼요.',           answer: ['이력서를', '다시', '봐야 돼요.'],          tokens: ['이력서를', '다시', '봐야 돼요.', '보야', '봐서', '본', '봤어요.'],                                     explain: '보 + 아 → 봐야 돼요' },
    { id: 'd68-g3-c3', zhHint: '必须拿出勇气。',                 audioKo: '용기를 내야 해요.',                  answer: ['용기를', '내야 해요.'],                    tokens: ['용기를', '내야 해요.', '내기', '내는', '내서', '냈어요.'],                                              explain: '내 + 야 하다（书面正式）' },
    { id: 'd68-g3-c4', zhHint: '现在必须回学校。',                audioKo: '지금 학교에 돌아가야 돼요.',         answer: ['지금', '학교에', '돌아가야 돼요.'],        tokens: ['지금', '학교에', '돌아가야 돼요.', '돌아가서', '돌아간', '돌아가기', '돌아갔어요.'],                     explain: '돌아가 + 아 → 돌아가야 돼요' },
  ],

  rule: [
    { id: 'd68-g3-r1', promptZh: '关于「~아/어야 되다 / 하다」的形态，哪句最准确？',                choices: [{ text: 'V/A 어/아 형 + **야 되다 / 하다** · 말하다 → 말해야 돼요 / 좋다 → 좋아야 돼요', correct: true }, { text: 'V 词干 + 야 되다',       correct: false }, { text: 'V + 서야 되다',          correct: false }, { text: 'V + 기야 되다',                 correct: false }], explain: '어/아 + 야 + 되다 / 하다' },
    { id: 'd68-g3-r2', promptZh: '关于「되다 vs 하다」的差别，哪句最准确？',                        choices: [{ text: '意思相同 · **되다** 更口语，**하다** 更书面正式 · 混用不会错', correct: true }, { text: '完全不同',       correct: false }, { text: '되다 是敬语',        correct: false }, { text: '하다 只用于过去',                 correct: false }], explain: '되다 = 口语 / 하다 = 书面' },
    { id: 'd68-g3-r3', promptZh: '关于「되요 vs 돼요」拼写，哪句最准确？',                            choices: [{ text: '되어요 → **돼요** · **되요 是错拼写** · 韩国人常写错，学习者更要写对', correct: true }, { text: '되요 是对的',       correct: false }, { text: '两者一样',            correct: false }, { text: '돼요 只用于过去',              correct: false }], explain: '되 + 어 = 돼（缩合）· 되요 (X)' },
    { id: 'd68-g3-r4', promptZh: '关于「过去时态」，哪句最准确？',                                    choices: [{ text: '过去形放在句尾：말해야 **됐어요** / 봐야 **했어요** · Day 68 直面故事回顾', correct: true }, { text: '过去用 ~았야 되다',       correct: false }, { text: '过去用 ~었야 하다',        correct: false }, { text: '不能用过去',                     correct: false }], explain: '됐어요 / 했어요 · 时态永远在句尾' },
  ],
};
