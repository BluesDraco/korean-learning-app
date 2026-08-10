import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 47 · 2-3 문법 탐험 · ~다고 하다 간접인용 */
export const day47Grammar: GrammarSubQuestData = {
  day: 17, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '据说 / 说___：~다고 하다',

  fix: [
    { id: 'd47-g3-f1', promptKo: '준호가 발음이 좋는다고 했어요.',            promptZh: '"Junho 说发音好"哪句正确？',                choices: [{ text: '준호가 발음이 좋는다고 했어요.',    correct: false }, { text: '준호가 발음이 좋다고 했어요.',    correct: true }, { text: '준호가 발음이 좋았다고 하다.',        correct: false }, { text: '준호가 발음을 좋다고 했어요.',              correct: false }], explain: '形容词 좋다 → **다고**（不加는）' },
    { id: 'd47-g3-f2', promptKo: '엄마가 용기 낸다고 하셨어요.',                promptZh: '"妈妈说要有勇气"（命令 / 建议引用）哪句正确？', choices: [{ text: '엄마가 용기 낸다고 하셨어요.',       correct: false }, { text: '엄마가 용기 내라고 하셨어요.',   correct: true }, { text: '엄마가 용기 내다고 하셨어요.',        correct: false }, { text: '엄마가 용기 내고 하셨어요.',              correct: false }], explain: '命令 / 建议引用 → **~(으)라고 하다**（不用 ~다고）' },
    { id: 'd47-g3-f3', promptKo: '하루가 기억은 남다고 했어요.',                promptZh: '"Haru 说记忆会留下"哪句正确？',              choices: [{ text: '하루가 기억은 남다고 했어요.',        correct: false }, { text: '하루가 기억은 남는다고 했어요.',  correct: true }, { text: '하루가 기억은 남았다고 했어요.',      correct: false }, { text: '하루가 기억이 남는다고 하다.',           correct: false }], explain: '动词现在有收音 → **는다고**' },
    { id: 'd47-g3-f4', promptKo: '민지가 학생다고 했어요.',                     promptZh: '"Minji 说是学生"哪句正确？',                 choices: [{ text: '민지가 학생다고 했어요.',              correct: false }, { text: '민지가 학생이라고 했어요.',       correct: true }, { text: '민지가 학생는다고 했어요.',            correct: false }, { text: '민지가 학생라고 했어요.',                    correct: false }], explain: '名词有收音 → **이라고 하다**' },
    { id: 'd47-g3-f5', promptKo: '~다고 하다 는 직접인용이에요.',                promptZh: '关于「~다고 하다」的定义，哪句最准确？',    choices: [{ text: '~다고 하다 는 직접인용이에요.',         correct: false }, { text: '~다고 하다 = **간접인용** · 원래 말투를 정리해서 전달', correct: true }, { text: '~다고 하다 는 오직 미래에만 쓸 수 있어요.',     correct: false }, { text: '~다고 하다 는 반말이라 어른한테 못 써요.',       correct: false }], explain: '~다고 하다 = 间接引用 · 直接引用是"..."라고 하다' },
  ],

  compose: [
    { id: 'd47-g3-c1', zhHint: 'Haru 说记忆会留下。',                audioKo: '하루가 기억은 남는다고 했어요.',      answer: ['하루가', '기억은', '남는다고', '했어요.'],           tokens: ['하루가', '기억은', '남는다고', '했어요.', '남았다고', '남아요', '남는다', '기억이'],                     explain: '动词有收音 + **는다고**' },
    { id: 'd47-g3-c2', zhHint: '妈妈说要有勇气。',                    audioKo: '엄마가 용기 내라고 하셨어요.',         answer: ['엄마가', '용기', '내라고', '하셨어요.'],              tokens: ['엄마가', '용기', '내라고', '하셨어요.', '낸다고', '내고', '내다고', '내세요'],                             explain: '命令引用 · ~(으)라고 하다' },
    { id: 'd47-g3-c3', zhHint: 'Junho 说发音好。',                    audioKo: '준호가 발음이 좋다고 했어요.',         answer: ['준호가', '발음이', '좋다고', '했어요.'],              tokens: ['준호가', '발음이', '좋다고', '했어요.', '좋는다고', '좋았다고', '좋아요', '발음을'],                       explain: '形容词 → **다고**（不加는）' },
    { id: 'd47-g3-c4', zhHint: 'Minji 说今天忙。',                    audioKo: '민지가 오늘 바쁘다고 해요.',           answer: ['민지가', '오늘', '바쁘다고', '해요.'],                tokens: ['민지가', '오늘', '바쁘다고', '해요.', '바쁘는다고', '바빴다고', '바빠요', '오늘을'],                       explain: '形容词 바쁘다 → 바쁘다고' },
  ],

  rule: [
    { id: 'd47-g3-r1', promptZh: '关于「动词 + ~ㄴ/는다고 하다」的用法，哪句最准确？', choices: [{ text: '动词现在无收音 → **ㄴ다고**（가다→간다고）· 有收音 → **는다고**（먹다→먹는다고）', correct: true }, { text: '所有动词一律 + 다고',       correct: false }, { text: '所有动词一律 + 는다고',    correct: false }, { text: '动词直接接 라고',             correct: false }], explain: '가다 → 간다고 / 먹다 → 먹는다고' },
    { id: 'd47-g3-r2', promptZh: '关于形容词的接法，哪句最准确？',                      choices: [{ text: '形容词 → **다고 하다** · 不加 ㄴ/는', correct: true }, { text: '形容词 → 는다고 하다',   correct: false }, { text: '形容词 → 라고 하다',    correct: false }, { text: '形容词不能间接引用',        correct: false }], explain: '좋다고 / 예쁘다고 / 매웠다고' },
    { id: 'd47-g3-r3', promptZh: '关于名词的接法，哪句最准确？',                        choices: [{ text: '名词 → **(이)라고 하다** · 有收音加 이', correct: true }, { text: '名词 → 다고 하다',       correct: false }, { text: '名词 → 는다고 하다',      correct: false }, { text: '名词不能间接引用',           correct: false }], explain: '학생이라고 / 친구라고 / 하루라고' },
    { id: 'd47-g3-r4', promptZh: '关于「命令引用」，哪句最准确？',                        choices: [{ text: '命令 / 建议引用 → **~(으)라고 하다**（내라고 / 가라고）· 不用 ~다고', correct: true }, { text: '命令 → ~ㄴ다고',           correct: false }, { text: '命令 → ~라고 하다 · 无收音判定',  correct: false }, { text: '命令引用与陈述一样',           correct: false }], explain: '엄마가 오라고 했어요 vs 엄마가 온다고 했어요' },
  ],
};
