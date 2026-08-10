import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 72 · 3-3 문법 탐험 · ~(으)ㄹ 만하다 · 值得 / 可以尝试 */
export const day72Grammar: GrammarSubQuestData = {
  day: 12, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '值得……：~(으)ㄹ 만하다',

  fix: [
    { id: 'd72-g3-f1', promptKo: '해운대는 가는 만해요.',            promptZh: '"海云台值得去"哪句正确？',                    choices: [{ text: '해운대는 가는 만해요.',              correct: false }, { text: '해운대는 가 볼 만해요.',              correct: true }, { text: '해운대는 간 만해요.',                     correct: false }, { text: '해운대는 가서 만해요.',                        correct: false }], explain: 'V + **(으)ㄹ** 만하다 · 가 보다 → 가 볼' },
    { id: 'd72-g3-f2', promptKo: '이 회는 먹는 만해요.',              promptZh: '"这生鱼片值得吃"哪句正确？',                    choices: [{ text: '이 회는 먹는 만해요.',                correct: false }, { text: '이 회는 먹을 만해요.',                correct: true }, { text: '이 회는 먹은 만해요.',                    correct: false }, { text: '이 회는 먹어서 만해요.',                        correct: false }], explain: '먹다 → 먹을 만하다 · 有받침 → 을' },
    { id: 'd72-g3-f3', promptKo: '사진 찍은 만한 카페예요.',         promptZh: '"是值得拍照的咖啡厅"哪句正确？',                choices: [{ text: '사진 찍은 만한 카페예요.',            correct: false }, { text: '사진 찍을 만한 카페예요.',            correct: true }, { text: '사진 찍는 만한 카페예요.',                correct: false }, { text: '사진 찍어서 만한 카페예요.',                    correct: false }], explain: '定语形 · ~(으)ㄹ **만한** + N' },
    { id: 'd72-g3-f4', promptKo: '이 책은 볼 만해요.',                promptZh: '"这本书值得看"哪句正确？',                       choices: [{ text: '이 책은 봐 만해요.',                    correct: false }, { text: '이 책은 볼 만해요.',                    correct: true }, { text: '이 책은 본 만해요.',                        correct: false }, { text: '이 책은 보는 만해요.',                            correct: false }], explain: '보다 → 볼 만하다 · 无받침 → ㄹ' },
    { id: 'd72-g3-f5', promptZh: '关于「~(으)ㄹ 만하다 vs ~아/어 볼 만하다」的差别，哪句最准确？',                                                                                                                                                          choices: [{ text: '~(으)ㄹ 만하다 = 客观**值得** · ~아/어 볼 만하다 = **值得尝试一下**（含 시도 语感）· 两者可互换但语感略不同', correct: true }, { text: '两者完全一样',            correct: false }, { text: '~ㄹ 만하다 是命令',        correct: false }, { text: '~아 볼 만하다 是敬语',       correct: false }], explain: '가 볼 만하다 = 值得去一趟' },
  ],

  compose: [
    { id: 'd72-g3-c1', zhHint: '海云台值得去一次看看。',                    audioKo: '해운대는 한번 가 볼 만해요.',            answer: ['해운대는', '한번', '가 볼 만해요.'],           tokens: ['해운대는', '한번', '가 볼 만해요.', '가는 만해요.', '간 만해요.', '가서', '갔어요.'],                     explain: '가 보다 → 가 볼 만하다' },
    { id: 'd72-g3-c2', zhHint: '这生鱼片真的值得吃。',                      audioKo: '이 회는 진짜 먹을 만해요.',              answer: ['이 회는', '진짜', '먹을 만해요.'],              tokens: ['이 회는', '진짜', '먹을 만해요.', '먹는 만해요.', '먹은 만해요.', '먹어서', '먹었어요.'],                     explain: '먹다 → 먹을 만하다' },
    { id: 'd72-g3-c3', zhHint: '是值得拍照的咖啡厅。',                       audioKo: '사진 찍을 만한 카페예요.',              answer: ['사진', '찍을 만한', '카페예요.'],              tokens: ['사진', '찍을 만한', '카페예요.', '찍은 만한', '찍는 만한', '찍어서', '아니에요.'],                     explain: '定语形 + N' },
    { id: 'd72-g3-c4', zhHint: '这本书值得看。',                              audioKo: '이 책은 볼 만해요.',                     answer: ['이 책은', '볼 만해요.'],                        tokens: ['이 책은', '볼 만해요.', '본 만해요.', '보는 만해요.', '봐서', '봤어요.'],                     explain: '보다 → 볼 만하다' },
  ],

  rule: [
    { id: 'd72-g3-r1', promptZh: '关于「V + (으)ㄹ 만하다」的形态，哪句最准确？',                    choices: [{ text: '**动词词干 + (으)ㄹ 만하다** · 有받침 + 을 · 无받침 + ㄹ · 意为"值得 / 可以尝试"', correct: true }, { text: 'V + 는 만하다',               correct: false }, { text: 'V + 은 만하다',               correct: false }, { text: 'V + 아 만하다',                    correct: false }], explain: '먹을 / 볼 / 갈' },
    { id: 'd72-g3-r2', promptZh: '关于「定语形」，哪句最准确？',                                    choices: [{ text: '**~(으)ㄹ 만한 + N** · 찍을 만한 카페 = 值得拍照的咖啡厅', correct: true }, { text: '~(으)ㄴ 만한',           correct: false }, { text: '~는 만한',             correct: false }, { text: '~아 만한',                         correct: false }], explain: '만한 = 만하다 的定语形' },
    { id: 'd72-g3-r3', promptZh: '关于「~(으)ㄹ 만하다 vs ~아/어 볼 만하다」，哪句最准确？',        choices: [{ text: '**~(으)ㄹ 만하다** = 值得 · **~아/어 볼 만하다** = 值得尝试一下（含 试的语感）', correct: true }, { text: '两者完全一样',            correct: false }, { text: '~아 볼 만하다 是敬语',    correct: false }, { text: '~ㄹ 만하다 是命令',           correct: false }], explain: '가 볼 만하다 = 值得去一次' },
    { id: 'd72-g3-r4', promptZh: '关于「~(으)ㄹ 만하다」的意义，哪句最准确？',                       choices: [{ text: '**客观推荐 · 值得 / 尚可** · 语感比"很棒"更克制 · Day 72 推荐句型', correct: true }, { text: '强烈感叹',            correct: false }, { text: '强制命令',        correct: false }, { text: '否定拒绝',                      correct: false }], explain: '克制推荐 · Tori 语气' },
  ],
};
