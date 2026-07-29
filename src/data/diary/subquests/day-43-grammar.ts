import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 43 · 2-3 문법 탐험 · ~아/어 보다 · 르 不规则 · ㄷ 不规则 */
export const day43Grammar: GrammarSubQuestData = {
  day: 13, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '试着做___：~아/어 보다',

  fix: [
    { id: 'd43-g3-f1', promptKo: '한번 부르어 봐.',              promptZh: '"试着唱一次吧"哪句正确？',                choices: [{ text: '한번 부르어 봐.',                  correct: false }, { text: '한번 불러 봐.',                correct: true }, { text: '한번 부르아 봐.',                correct: false }, { text: '한번 부러 봐.',                       correct: false }], explain: '르 不规则 · 부르다 → **불러**（ㅡ 脱落 + ㄹ 添加）' },
    { id: 'd43-g3-f2', promptKo: '이 노래를 듣어 보세요.',         promptZh: '"请试着听这首歌"哪句正确？',              choices: [{ text: '이 노래를 듣어 보세요.',            correct: false }, { text: '이 노래를 들어 보세요.',       correct: true }, { text: '이 노래를 듣 보세요.',             correct: false }, { text: '이 노래를 듣아 보세요.',                correct: false }], explain: 'ㄷ 不规则 · 듣다 → **들어**（ㄷ → ㄹ + 아/어）' },
    { id: 'd43-g3-f3', promptKo: '발표하 봤어요.',                 promptZh: '"试着发表了"哪句正确？',                  choices: [{ text: '발표하 봤어요.',                    correct: false }, { text: '발표해 봤어요.',              correct: true }, { text: '발표하아 봤어요.',                correct: false }, { text: '발표하고 봤어요.',                       correct: false }], explain: '하다 → **해** + 봤어요' },
    { id: 'd43-g3-f4', promptKo: '한번 노래를 부르 봐.',            promptZh: '~아/어 보다 中 부르다 的变形，哪句正确？', choices: [{ text: '부르 봐',                            correct: false }, { text: '불러 봐',                       correct: true }, { text: '부르어 봐',                        correct: false }, { text: '부러 봐',                                correct: false }], explain: '르 不规则 → **불러**' },
    { id: 'd43-g3-f5', promptKo: '용기를 내서 발표하고 봤어요.',     promptZh: '"鼓起勇气发表了"哪句正确？',              choices: [{ text: '용기를 내서 발표하고 봤어요.',       correct: false }, { text: '용기를 내서 발표해 봤어요.',   correct: true }, { text: '용기를 내서 발표하 봤어요.',        correct: false }, { text: '용기를 내서 발표를 봤어요.',              correct: false }], explain: '~아/어 보다 前接词干阴阳变形 · 하 + 여 → 해' },
  ],

  compose: [
    { id: 'd43-g3-c1', zhHint: '试着唱一首吧。',                  audioKo: '한번 노래를 불러 봐.',                 answer: ['한번', '노래를', '불러', '봐.'],                       tokens: ['한번', '노래를', '불러', '봐.', '불러요.', '부르어', '부르', '봤어'],                               explain: 'Haru 原句 · 르 不规则' },
    { id: 'd43-g3-c2', zhHint: '请试着听这首歌。',                audioKo: '이 노래를 들어 보세요.',                answer: ['이', '노래를', '들어', '보세요.'],                     tokens: ['이', '노래를', '들어', '보세요.', '듣어', '듣', '노래가', '봐요.'],                                 explain: 'ㄷ 不规则 · 듣다 → 들어' },
    { id: 'd43-g3-c3', zhHint: '试过韩国料理。',                  audioKo: '한국 음식을 먹어 봤어요.',              answer: ['한국', '음식을', '먹어', '봤어요.'],                  tokens: ['한국', '음식을', '먹어', '봤어요.', '먹아', '먹', '음식이', '봅니다.'],                             explain: '~아/어 봤어요 表尝试经验' },
    { id: 'd43-g3-c4', zhHint: '鼓起勇气试着发表了。',            audioKo: '용기를 내서 발표해 봤어요.',            answer: ['용기를', '내서', '발표해', '봤어요.'],                tokens: ['용기를', '내서', '발표해', '봤어요.', '발표하', '발표하고', '용기가', '내가'],                       explain: '하다 → 해 + 봤어요' },
  ],

  rule: [
    { id: 'd43-g3-r1', promptZh: '关于「~아/어 보다」的用法，哪句最准确？', choices: [{ text: 'V + 아/어 + 보다 = 试着做 · 语法化后**不是"看"**（尽管来自 보다）', correct: true }, { text: '意为"看着做"',       correct: false }, { text: '只用于命令形',    correct: false }, { text: '只用于过去时',  correct: false }], explain: '여기 앉아 봐 = 请坐坐看 · 不是看这里' },
    { id: 'd43-g3-r2', promptZh: '关于「~아/어 봤어요 vs ~았/었어요」的差别，哪句最准确？', choices: [{ text: '~아/어 봤어요 = 尝过 / 经验过；~았/었어요 = 单纯做了', correct: true }, { text: '两者完全一样',        correct: false }, { text: '~아/어 봤어요 是敬语',   correct: false }, { text: '~았/었어요 是命令形',   correct: false }], explain: '먹었어요 = 吃了 · 먹어 봤어요 = 尝过' },
    { id: 'd43-g3-r3', promptZh: '关于阴阳元音判定，哪句最准确？',                            choices: [{ text: '阳性元音(ㅏ/ㅗ) → 아 보다；其他 → 어 보다；하다 → 해 보다', correct: true }, { text: '所有词一律 + 아 보다',       correct: false }, { text: '所有词一律 + 어 보다',    correct: false }, { text: '过去时词干用 여 보다',  correct: false }], explain: '가다 → 가 봐 · 먹다 → 먹어 봐 · 하다 → 해 봐' },
    { id: 'd43-g3-r4', promptZh: '关于 ~아/어 보세요，哪句最准确？',                            choices: [{ text: '~아/어 보세요 = 建议 / 邀请"请试试" · 餐厅推荐 / 朋友邀约常用', correct: true }, { text: '~아/어 보세요 是过去时',       correct: false }, { text: '~아/어 보세요 是形容词',    correct: false }, { text: '~아/어 보세요 只用于书面语',  correct: false }], explain: '먹어 보세요 = 请尝尝 · 店员常用' },
  ],
};
