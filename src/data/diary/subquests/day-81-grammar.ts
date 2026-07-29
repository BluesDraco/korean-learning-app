import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 81 · 3-3 문법 탐험 · N(이)면 / ~(으)면 · 如果是A就… */
export const day81Grammar: GrammarSubQuestData = {
  day: 21, level: 'advanced', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '（如果是A就…）：N(이)면 / V·A(으)면',

  fix: [
    { id: 'd81-g3-f1', promptKo: '진짜 친구이면 먼저 가.',       promptZh: '"真朋友的话先去"哪句最自然？',       choices: [{ text: '진짜 친구이면 먼저 가.',          correct: false }, { text: '진짜 친구면 먼저 가.',    correct: true }, { text: '진짜 친구으면 먼저 가.',            correct: false }, { text: '진짜 친구라면 가면.',                correct: false }], explain: '친구 无收音 → **친구면**（无받침加면，不加 이면/으면）' },
    { id: 'd81-g3-f2', promptKo: '학생면 공부해야 돼.',       promptZh: '"是学生的话就该学习"哪句正确？',       choices: [{ text: '학생면 공부해야 돼.',          correct: false }, { text: '학생이면 공부해야 돼.',    correct: true }, { text: '학생으면 공부해야 돼.',            correct: false }, { text: '학생이라서 공부해야 돼.',                correct: false }], explain: '학생 有收音 ㅇ → **학생이면**（有받침加 이면）' },
    { id: 'd81-g3-f3', promptKo: '오해으면 풀면 돼.',         promptZh: '"是误会的话解开就好"哪句正确？',   choices: [{ text: '오해으면 풀면 돼.',            correct: false }, { text: '오해면 풀면 돼.',    correct: true }, { text: '오해이면 풀으면 돼.',        correct: false }, { text: '오해서 풀면 돼.',              correct: false }], explain: '오해 无收音 → 오해면；풀다 → 풀면（ㄹ词干直接加면）' },
    { id: 'd81-g3-f4', promptKo: '자존심보다 우정이 크서 먼저 가.',      promptZh: '"友情比自尊大的话就先去"哪句正确？',   choices: [{ text: '자존심보다 우정이 크서 먼저 가.',         correct: false }, { text: '자존심보다 우정이 크면 먼저 가.',      correct: true }, { text: '자존심보다 우정이 큰면 먼저 가.',                correct: false }, { text: '자존심보다 우정이 크이면 먼저 가.',                correct: false }], explain: '크다 → **크면**（形容词词干 + 면；크서/큰면/크이면 都错）' },
    { id: 'd81-g3-f5', promptZh: '关于「N(이)면」的收音规则，哪句最准确？',                                                                                                                                                                    choices: [{ text: '**名词有收音 + 이면（학생이면）· 无收音 + 면（친구면）** · 动词/形容词词干 + (으)면', correct: true }, { text: '所有名词都加 이면',            correct: false }, { text: '所有名词都加 면',        correct: false }, { text: '(이)면 表因果',           correct: false }], explain: '有받침 이면 / 无받침 면' },
  ],

  compose: [
    { id: 'd81-g3-c1', zhHint: '真朋友的话先去。',                  audioKo: '진짜 친구면 먼저 가.',              answer: ['진짜', '친구면', '먼저', '가.'],                     tokens: ['진짜', '친구면', '먼저', '가.', '친구이면', '친구라서', '가세요.'],                                  explain: 'N(无받침) + 면 · 身份条件' },
    { id: 'd81-g3-c2', zhHint: '是学生的话就该学习。',              audioKo: '학생이면 공부해야 돼.',          answer: ['학생이면', '공부해야', '돼.'],                   tokens: ['학생이면', '공부해야', '돼.', '학생면', '학생으면', '공부해서'],                     explain: 'N(有받침) + 이면' },
    { id: 'd81-g3-c3', zhHint: '是误会的话解开就好。',              audioKo: '오해면 풀면 돼.',        answer: ['오해면', '풀면', '돼.'],                 tokens: ['오해면', '풀면', '돼.', '오해으면', '풀으면', '오해서'],                 explain: 'N면 + V(으)면 双重条件' },
    { id: 'd81-g3-c4', zhHint: '友情比自尊大的话就先去。',          audioKo: '우정이 자존심보다 크면 먼저 가.',            answer: ['우정이', '자존심보다', '크면', '먼저', '가.'],                  tokens: ['우정이', '자존심보다', '크면', '먼저', '가.', '크서', '큰면', '가겠어.'],                 explain: '~보다 + A(으)면' },
  ],

  rule: [
    { id: 'd81-g3-r1', promptZh: '关于「N(이)면」的用法，哪句最准确？',                                choices: [{ text: '**表身份/条件"如果是A的话"** · 진짜 친구면 = 是真朋友的话 · 학생이면 = 是学生的话', correct: true }, { text: '表因果"因为是A"',               correct: false }, { text: '表转折"虽然是A"',               correct: false }, { text: '表时间"当A时"',                    correct: false }], explain: '身份条件' },
    { id: 'd81-g3-r2', promptZh: '关于「N + (이)면 的收音规则」，哪句最准确？',                                  choices: [{ text: '**有收音 + 이면（학생이면）· 无收音 + 면（친구면 / 오해면）**', correct: true }, { text: '有收音 + 면，无收音 + 이면',    correct: false }, { text: '都加 으면',      correct: false }, { text: '都加 이면',                    correct: false }], explain: '有받침 이면 / 无받침 면' },
    { id: 'd81-g3-r3', promptZh: '关于「~(으)면 后能否接命令/提议」，哪句最准确？',                                    choices: [{ text: '**~(으)면 后可接命令/提议** · 친구면 먼저 가（去吧）· 오해면 풀면 돼（解开就好）', correct: true }, { text: '~(으)면 后不能接命令',            correct: false }, { text: '~(으)면 只能接过去时',    correct: false }, { text: '~(으)면 后只能接名词',           correct: false }], explain: '~(으)면 + 命令/提议 OK（与 ~아/어서 不同）' },
    { id: 'd81-g3-r4', promptZh: '关于「V/A + (으)면 的形态」，哪句最准确？',                              choices: [{ text: '**词干有收音 + 으면，无收音 + 면**（ㄹ词干直接加면：풀면/크면）', correct: true }, { text: '词干都加 이면',            correct: false }, { text: '词干都加 라면',        correct: false }, { text: '词干加 아서',                      correct: false }], explain: '动/形词干 + (으)면' },
  ],
};
