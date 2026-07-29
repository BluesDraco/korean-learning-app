import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 1 · 1-3 语法关 · 이에요/예요 + 은/는
 * 3 段：助词改错 5 → 组句 4 → 规则理解选择 4
 */
export const day1Grammar: GrammarSubQuestData = {
  day: 1, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握이에요/예요和은/는的用法规律',

  // ─── 助词改错：给含错句 → 选正确写法 ───
  fix: [
    {
      id: 'd01-g3-f1',
      promptKo: '저은 토리예요.',
      promptZh: '下列哪个句子是正确的？',
      choices: [
        { text: '저은 토리예요.', correct: false },
        { text: '저가 토리예요.', correct: false },
        { text: '저는 토리예요.', correct: true },
        { text: '저이 토리예요.', correct: false },
      ],
      explain: '저(我)无收音 → 主题助词用는，有收音才用은',
    },
    {
      id: 'd01-g3-f2',
      promptKo: '제 이름는 토리예요.',
      promptZh: '哪句正确？',
      choices: [
        { text: '제 이름는 토리예요.', correct: false },
        { text: '제 이름은 토리예요.', correct: true },
        { text: '제 이름가 토리예요.', correct: false },
        { text: '제 이름을 토리예요.', correct: false },
      ],
      explain: '이름(名字)末字름有收音 ㅁ → 主题助词用은（이름는❌ 无收音才用는；이름가❌ 主格也得用이；이름을❌ 是宾格不合此句）',
    },
    {
      id: 'd01-g3-f3',
      promptKo: '저는 학생이예요.',
      promptZh: '哪句正确？',
      choices: [
        { text: '저는 학생이예요.', correct: false },
        { text: '저는 학생예요.', correct: false },
        { text: '저는 학생에요.', correct: false },
        { text: '저는 학생이에요.', correct: true },
      ],
      explain: '학생末字생有收音 ㅇ → 이에요（이예요是常见错误写法）',
    },
    {
      id: 'd01-g3-f4',
      promptKo: '저는 친구이에요.',
      promptZh: '哪句正确？',
      choices: [
        { text: '저는 친구이에요.', correct: false },
        { text: '저는 친구예요.', correct: true },
        { text: '저는 친구에요.', correct: false },
        { text: '저는 친구이요.', correct: false },
      ],
      explain: '친구末字구无收音 → 예요（加이에요是多余的）',
    },
    {
      id: 'd01-g3-f5',
      promptKo: '한국는 좋아요.',
      promptZh: '哪句正确？',
      choices: [
        { text: '한국는 좋아요.', correct: false },
        { text: '한국가 좋아요.', correct: false },
        { text: '한국은 좋아요.', correct: true },
        { text: '한국을 좋아요.', correct: false },
      ],
      explain: '한국末字국有收音 ㄱ → 主题助词用은（한국는❌ 无收音才用는；한국가❌ 主格也得用이；한국을❌ 是宾格不合此句）',
    },
  ],

  // ─── 组句：词块拼完整句 ───
  compose: [
    {
      id: 'd01-g3-c1',
      zhHint: '我是兔莉。',
      audioKo: '저는 토리예요.',
      answer: ['저는', '토리예요.'],
      tokens: ['저는', '토리예요.', '학생이에요.', '친구예요.'],
      explain: '저(我)+는(主题) → 토리(兔莉)+예요(无收音是系词)',
    },
    {
      id: 'd01-g3-c2',
      zhHint: '我是学生。',
      audioKo: '저는 학생이에요.',
      answer: ['저는', '학생이에요.'],
      tokens: ['저는', '학생이에요.', '친구예요.', '이름은'],
      explain: '학생有收音ㅇ → 이에요',
    },
    {
      id: 'd01-g3-c3',
      zhHint: '我的名字是兔莉。',
      audioKo: '제 이름은 토리예요.',
      answer: ['제', '이름은', '토리예요.'],
      tokens: ['제', '이름은', '토리예요.', '저는', '친구예요.'],
      explain: '제=我的，이름末字有收音→은，토리无收音→예요',
    },
    {
      id: 'd01-g3-c4',
      zhHint: '我是韩国人。',
      audioKo: '저는 한국 사람이에요.',
      answer: ['저는', '한국', '사람이에요.'],
      tokens: ['저는', '한국', '사람이에요.', '중국', '학생이에요.'],
      explain: '사람末字람有收音ㅁ → 이에요',
    },
  ],

  // ─── 规则理解选择 ───
  rule: [
    {
      id: 'd01-g3-r1',
      promptZh: '韩文"学生"（학생）末字有收音，介绍自己是学生应该说？',
      choices: [
        { text: '저는 학생예요.', correct: false },
        { text: '저는 학생이요.', correct: false },
        { text: '저는 학생이에요.', correct: true },
        { text: '저는 학생에요.', correct: false },
      ],
      explain: '有收音末字 → 이에요；无收音 → 예요',
    },
    {
      id: 'd01-g3-r2',
      promptZh: '韩文"朋友"（친구）末字无收音，介绍自己是朋友应该说？',
      choices: [
        { text: '저는 친구이에요.', correct: false },
        { text: '저는 친구에요.', correct: false },
        { text: '저는 친구요.', correct: false },
        { text: '저는 친구예요.', correct: true },
      ],
      explain: '친구末字구无收音 → 예요',
    },
    {
      id: 'd01-g3-r3',
      promptZh: '"이름"（名字）末字有收音，做主题时助词用？',
      choices: [
        { text: '은', correct: true },
        { text: '는', correct: false },
        { text: '이', correct: false },
        { text: '가', correct: false },
      ],
      explain: '末字有收音 → 主题助词用은；无收音 → 는',
    },
    {
      id: 'd01-g3-r4',
      promptZh: '"저"（我）末字无收音，做主题时助词用？',
      choices: [
        { text: '은', correct: false },
        { text: '는', correct: true },
        { text: '이', correct: false },
        { text: '가', correct: false },
      ],
      explain: '저无收音 → 는；如果要强调"是我（而不是别人）"做主语，会说 제가（이/가 主格）',
    },
  ],
};
