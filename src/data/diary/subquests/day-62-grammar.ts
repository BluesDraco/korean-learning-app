import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 62 · 3-3 문법 탐험 · ~는/은 편이에요 · 面试自评 · 谦逊不失体面 */
export const day62Grammar: GrammarSubQuestData = {
  day: 2, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '算是 / 偏……：~는/은 편이에요',

  fix: [
    { id: 'd62-g3-f1', promptKo: '한국어를 잘하은 편이에요.',       promptZh: '"我韩语算说得可以"哪句正确？',            choices: [{ text: '한국어를 잘하은 편이에요.',           correct: false }, { text: '한국어를 잘하는 편이에요.',      correct: true }, { text: '한국어를 잘하ㄴ 편이에요.',             correct: false }, { text: '한국어를 잘한 편이에요.',                    correct: false }], explain: '**动词**用 ~**는** 편이에요（不用 ~은）· 잘하다 → 잘하는' },
    { id: 'd62-g3-f2', promptKo: '저는 조용하는 편이에요.',          promptZh: '"我算是安静的"哪句正确？',                choices: [{ text: '저는 조용하는 편이에요.',              correct: false }, { text: '저는 조용한 편이에요.',           correct: true }, { text: '저는 조용해서 편이에요.',                  correct: false }, { text: '저는 조용하고 편이에요.',                   correct: false }], explain: '**形容词**用 ~**ㄴ/은** 편이에요 · 조용하다 → 조용한' },
    { id: 'd62-g3-f3', promptKo: '어렸을 때 키가 작은 편이었어요.',   promptZh: '"小时候个子算矮"哪句正确？',              choices: [{ text: '어렸을 때 키가 작는 편이었어요.',     correct: false }, { text: '어렸을 때 키가 작은 편이었어요.', correct: true }, { text: '어렸을 때 키가 작아 편이었어요.',      correct: false }, { text: '어렸을 때 키가 작다 편이었어요.',           correct: false }], explain: '形容词 작다 (있)받침 → **작은** · 过去时放在 편이었어요' },
    { id: 'd62-g3-f4', promptKo: '한국어 못하는 편이지만 배우고 있어요.', promptZh: '"我韩语算不太好，但一直在学"哪句正确？',  choices: [{ text: '한국어 못하는 편이지만 배우고 있어요.', correct: true }, { text: '한국어 못한 편이지만 배우고 있어요.',   correct: false }, { text: '한국어 못하ㄴ 편이지만 배우고 있어요.',   correct: false }, { text: '한국어 못하고 편이지만 배우고 있어요.',      correct: false }], explain: '**못하다** 是动词 → ~는 편이에요' },
    { id: 'd62-g3-f5', promptZh: '关于「~는/은 편이에요」的语义，哪句最准确？', choices: [{ text: '客观自评"偏 X / 算是 X" · 比"我 X"更谦逊、更委婉 · 面试自我介绍高频',        correct: true }, { text: '~는 편이에요 = 我 100% X',       correct: false }, { text: '~는 편이에요 是命令形',         correct: false }, { text: '~는 편이에요 = 我不 X',              correct: false }], explain: '客观化 + 缓和语气 · 不绝对化' },
  ],

  compose: [
    { id: 'd62-g3-c1', zhHint: '我韩语算说得可以。',        audioKo: '한국어를 잘하는 편이에요.',              answer: ['한국어를', '잘하는 편이에요.'],           tokens: ['한국어를', '잘하는 편이에요.', '잘하은', '잘한', '잘 못하는 편이에요.', '잘해요.'],                    explain: 'V + 는 편이에요' },
    { id: 'd62-g3-c2', zhHint: '我算是安静的。',              audioKo: '저는 조용한 편이에요.',                    answer: ['저는', '조용한 편이에요.'],                tokens: ['저는', '조용한 편이에요.', '조용하는', '조용해서', '조용하고', '시끄러운 편이에요.'],                explain: 'A + ㄴ/은 편이에요 · 조용하다 → 조용한' },
    { id: 'd62-g3-c3', zhHint: '我早睡的一类。',              audioKo: '저는 일찍 자는 편이에요.',                 answer: ['저는', '일찍', '자는 편이에요.'],           tokens: ['저는', '일찍', '자는 편이에요.', '자은', '자서', '늦게', '늦게 자는 편이에요.'],                       explain: 'V + 는 편이에요 · 자다 → 자는' },
    { id: 'd62-g3-c4', zhHint: '简历看得算认真。',            audioKo: '이력서를 꼼꼼히 보는 편이에요.',            answer: ['이력서를', '꼼꼼히', '보는 편이에요.'],     tokens: ['이력서를', '꼼꼼히', '보는 편이에요.', '보은', '봐서', '대충', '안 보는 편이에요.'],                   explain: 'V + 는 편이에요 · 面试语境' },
  ],

  rule: [
    { id: 'd62-g3-r1', promptZh: '关于「动词 + 는 편이에요」，哪句最准确？',            choices: [{ text: 'V 词干 + **는** 편이에요 · 잘하다 → 잘하는 편이에요（算是……）', correct: true }, { text: 'V + **은** 편이에요',    correct: false }, { text: 'V + **을** 편이에요',     correct: false }, { text: 'V + **아서** 편이에요',   correct: false }], explain: '动词全部用 ~는（现在时）' },
    { id: 'd62-g3-r2', promptZh: '关于「形容词 + ㄴ/은 편이에요」，哪句最准确？',        choices: [{ text: '무 받침 → **ㄴ** / 有 받침 → **은** · 조용하다 → 조용한 / 작다 → 작은', correct: true }, { text: '一律用 는 편이에요',        correct: false }, { text: '一律用 을 편이에요',        correct: false }, { text: '形容词不能用 편이에요',    correct: false }], explain: '形容词按 받침 分 ㄴ / 은' },
    { id: 'd62-g3-r3', promptZh: '关于「~는/은 편이에요」的语用，哪句最准确？',          choices: [{ text: '**软化断言** · 比"저는 X예요"更谦逊委婉 · 面试自评 / 自我介绍高频', correct: true }, { text: '强调 100%',            correct: false }, { text: '强调否定',              correct: false }, { text: '用于命令',               correct: false }], explain: '委婉自评核心用法' },
    { id: 'd62-g3-r4', promptZh: '关于「过去时态」，哪句最准确？',                        choices: [{ text: '过去时放在句尾：~는/은 편이**었**어요 · 어렸을 때 조용한 편이었어요', correct: true }, { text: '过去放在 편 前面',         correct: false }, { text: '不能用过去',              correct: false }, { text: '过去用 ~았/었는 편',       correct: false }], explain: '时态永远在句尾 → 편이었어요' },
  ],
};
