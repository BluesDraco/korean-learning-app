import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 49 · 2-3 문법 탐험 · ~아/어야 하다 / 돼요 义务 */
export const day49Grammar: GrammarSubQuestData = {
  day: 19, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '应该 / 必须：~아/어야 하다 / 돼요',

  fix: [
    { id: 'd49-g3-f1', promptKo: '서로 사과하야 돼.',                     promptZh: '"应该互相道歉"哪句正确？',                     choices: [{ text: '서로 사과하야 돼.',                        correct: false }, { text: '서로 사과해야 돼.',                correct: true }, { text: '서로 사과하아 돼.',                     correct: false }, { text: '서로 사과하고 돼.',                     correct: false }], explain: '하다 → **해**야 돼' },
    { id: 'd49-g3-f2', promptKo: '지금 자야 되요.',                       promptZh: '"现在该睡了"哪句正确？',                       choices: [{ text: '지금 자야 되요.',                          correct: false }, { text: '지금 자야 돼요.',                   correct: true }, { text: '지금 자아야 돼요.',                    correct: false }, { text: '지금 잠야 돼요.',                        correct: false }], explain: '~아/어야 **돼요**（不是 되요）· 자다 无收音 → 자야' },
    { id: 'd49-g3-f3', promptKo: '한국어가 잘하려면 연습해야 돼요.',      promptZh: '"想说好韩语就得每天练"哪句正确？',              choices: [{ text: '한국어가 잘하려면 연습해야 돼요.',        correct: false }, { text: '한국어를 잘하려면 매일 연습해야 돼요.', correct: true }, { text: '한국어를 잘하면 매일 연습해야 돼요.',     correct: false }, { text: '한국어를 잘하려면 매일 연습하야 돼요.',    correct: false }], explain: '한국어**를** 잘하다 · ~려면 意愿假设' },
    { id: 'd49-g3-f4', promptKo: '싸우지 않아야 하는데.',                  promptZh: '关于否定表达，哪句最自然？',                    choices: [{ text: '싸우지 않아야 하는데.',                    correct: false }, { text: '싸우면 안 돼.',                        correct: true }, { text: '싸우기 안 돼.',                         correct: false }, { text: '싸우고 안 돼.',                          correct: false }], explain: '否定用 **~(으)면 안 돼요** 更自然' },
    { id: 'd49-g3-f5', promptKo: '~아/어야 돼요 은 미래 의무만 표현해요.',  promptZh: '关于「~아/어야 돼요」的用法，哪句最准确？',    choices: [{ text: '~아/어야 돼요 은 미래 의무만 표현해요.',    correct: false }, { text: 'V/A + **아/어야 돼요** = 应该 / 必须 · 현재·미래 의무 / 규칙 / 결심 모두 가능', correct: true }, { text: '~아/어야 돼요 는 명령형이에요.',              correct: false }, { text: '~아/어야 돼요 는 형용사에 못 붙어요.',          correct: false }], explain: '现在/未来义务通用 · 用 하다 版（해야 해요）也对' },
  ],

  compose: [
    { id: 'd49-g3-c1', zhHint: '既然是朋友就应该互相道歉。',            audioKo: '친구니까 서로 사과해야 돼.',                 answer: ['친구니까', '서로', '사과해야', '돼.'],                   tokens: ['친구니까', '서로', '사과해야', '돼.', '사과하고', '사과할래', '사과하야', '사과했어'],                     explain: 'Tori 调解原句 · 니까 + ~아/어야 돼' },
    { id: 'd49-g3-c2', zhHint: '学生应该努力学习。',                    audioKo: '학생은 열심히 공부해야 해요.',              answer: ['학생은', '열심히', '공부해야', '해요.'],                 tokens: ['학생은', '열심히', '공부해야', '해요.', '공부하야', '공부해서', '공부하고', '공부합니다'],                 explain: '~아/어야 하다 (문어체)' },
    { id: 'd49-g3-c3', zhHint: '现在该睡了。明天有考试。',              audioKo: '지금 자야 돼요. 내일 시험이에요.',           answer: ['지금', '자야', '돼요.', '내일', '시험이에요.'],         tokens: ['지금', '자야', '돼요.', '내일', '시험이에요.', '자아야', '되요.', '시험이있어요.'],                        explain: '자다 无收音 → 자야 돼요' },
    { id: 'd49-g3-c4', zhHint: '想说好韩语就得每天练。',                audioKo: '한국어를 잘하려면 매일 연습해야 돼요.',      answer: ['한국어를', '잘하려면', '매일', '연습해야', '돼요.'],   tokens: ['한국어를', '잘하려면', '매일', '연습해야', '돼요.', '잘하면', '연습해서', '연습하야', '한국어가'],           explain: '~(으)려면 + ~아/어야 돼요 = 想___就得___' },
  ],

  rule: [
    { id: 'd49-g3-r1', promptZh: '关于「~아/어야 하다 vs 돼요」的差别，哪句最准确？', choices: [{ text: '~아/어야 하다 = 书面 / 正式；~아/어야 **돼요** = 口语更自然 · 意思等同', correct: true }, { text: '~하다 是过去时',       correct: false }, { text: '~돼요 是命令形',      correct: false }, { text: '两者意思相反',            correct: false }], explain: '해야 해요 / 해야 돼요 都对' },
    { id: 'd49-g3-r2', promptZh: '关于阴阳元音判定，哪句最准确？',                       choices: [{ text: '阳性(ㅏ/ㅗ) → 아야；其他 → 어야；하다 → 해야', correct: true }, { text: '所有词一律 + 아야',       correct: false }, { text: '所有词一律 + 어야',    correct: false }, { text: '过去时词干用 여야',        correct: false }], explain: '가야 돼요 / 먹어야 돼요 / 해야 돼요' },
    { id: 'd49-g3-r3', promptZh: '关于否定表达，哪句最自然？',                             choices: [{ text: '否定 → **~(으)면 안 돼요**（不能）· 直接 안 ~아/어야 하다 不自然', correct: true }, { text: '否定 → ~아/어야 하지 않아요',    correct: false }, { text: '否定 → ~고 안 돼요',              correct: false }, { text: '~아/어야 돼요 没有否定',           correct: false }], explain: '싸우면 안 돼요 = 不能吵架' },
    { id: 'd49-g3-r4', promptZh: '关于 **돼요** vs **되요** 的拼写，哪句最准确？',        choices: [{ text: '正确写法是 **돼요** · 돼 = 되어의 축약형 · 母语者也常写错', correct: true }, { text: '两个都对',               correct: false }, { text: '되요 是敬语',           correct: false }, { text: '돼요 是过去时',          correct: false }], explain: '되어요 → 돼요 (缩略)' },
  ],
};
