import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 1 · 1-3 语法关 · 이에요/예요 + 은/는
 * 3 段：助词改错 5 → 组句 4 → 规则理解选择 4
 */
export const day1Grammar: GrammarSubQuestData = {
  day: 1, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握이에요/예요和은/는的用法规律', subtitleEn: 'Master the rules for using 이에요/예요 and 은/는',

  // ─── 助词改错：给含错句 → 选正确写法 ───
  fix: [
    {
      id: 'd01-g3-f1',
      promptKo: '저은 토리예요.',
      promptZh: '下列哪个句子是正确的？', promptZhEn: 'Which of the following sentences is correct?',
      choices: [
        { text: '저은 토리예요.', correct: false },
        { text: '저가 토리예요.', correct: false },
        { text: '저는 토리예요.', correct: true },
        { text: '저이 토리예요.', correct: false },
      ],
      explain: '저(我)无收音 → 主题助词用는，有收音才用은', explainEn: '저 (I) ends in a vowel → topic particle is 는; use 은 only after a consonant',
    },
    {
      id: 'd01-g3-f2',
      promptKo: '제 이름는 토리예요.',
      promptZh: '哪句正确？', promptZhEn: 'Which sentence is correct?',
      choices: [
        { text: '제 이름는 토리예요.', correct: false },
        { text: '제 이름은 토리예요.', correct: true },
        { text: '제 이름가 토리예요.', correct: false },
        { text: '제 이름을 토리예요.', correct: false },
      ],
      explain: '이름(名字)末字름有收音 ㅁ → 主题助词用은（이름는❌ 无收音才用는；이름가❌ 主格也得用이；이름을❌ 是宾格不合此句）', explainEn: '이름 (name) ends in ㅁ (consonant) → topic particle is 은 (이름는❌ use 는 only after a vowel; 이름가❌ the subject particle would be 이; 이름을❌ is the object particle, not suitable here)',
    },
    {
      id: 'd01-g3-f3',
      promptKo: '저는 학생이예요.',
      promptZh: '哪句正确？', promptZhEn: 'Which sentence is correct?',
      choices: [
        { text: '저는 학생이예요.', correct: false },
        { text: '저는 학생예요.', correct: false },
        { text: '저는 학생에요.', correct: false },
        { text: '저는 학생이에요.', correct: true },
      ],
      explain: '학생末字생有收音 ㅇ → 이에요（이예요是常见错误写法）', explainEn: '학생 ends in ㅇ (consonant) → 이에요 (이예요 is a common mistake)',
    },
    {
      id: 'd01-g3-f4',
      promptKo: '저는 친구이에요.',
      promptZh: '哪句正确？', promptZhEn: 'Which sentence is correct?',
      choices: [
        { text: '저는 친구이에요.', correct: false },
        { text: '저는 친구예요.', correct: true },
        { text: '저는 친구에요.', correct: false },
        { text: '저는 친구이요.', correct: false },
      ],
      explain: '친구末字구无收音 → 예요（加이에요是多余的）', explainEn: '친구 ends in a vowel → 예요 (adding 이에요 is redundant)',
    },
    {
      id: 'd01-g3-f5',
      promptKo: '한국는 좋아요.',
      promptZh: '哪句正确？', promptZhEn: 'Which sentence is correct?',
      choices: [
        { text: '한국는 좋아요.', correct: false },
        { text: '한국가 좋아요.', correct: false },
        { text: '한국은 좋아요.', correct: true },
        { text: '한국을 좋아요.', correct: false },
      ],
      explain: '한국末字국有收音 ㄱ → 主题助词用은（한국는❌ 无收音才用는；한국가❌ 主格也得用이；한국을❌ 是宾格不合此句）', explainEn: '한국 ends in ㄱ (consonant) → topic particle is 은 (한국는❌ use 는 only after a vowel; 한국가❌ the subject particle would be 이; 한국을❌ is the object particle, not suitable here)',
    },
  ],

  // ─── 组句：词块拼完整句 ───
  compose: [
    {
      id: 'd01-g3-c1',
      zhHint: '我是兔莉。', zhHintEn: 'I am Tori.',
      audioKo: '저는 토리예요.',
      answer: ['저는', '토리예요.'],
      tokens: ['저는', '토리예요.', '학생이에요.', '친구예요.'],
      explain: '저(我)+는(主题) → 토리(兔莉)+예요(无收音是系词)', explainEn: '저 (I) + 는 (topic) → 토리 (Tori) + 예요 (copula after a vowel)',
    },
    {
      id: 'd01-g3-c2',
      zhHint: '我是学生。', zhHintEn: 'I am a student.',
      audioKo: '저는 학생이에요.',
      answer: ['저는', '학생이에요.'],
      tokens: ['저는', '학생이에요.', '친구예요.', '이름은'],
      explain: '학생有收音ㅇ → 이에요', explainEn: '학생 ends in ㅇ (consonant) → 이에요',
    },
    {
      id: 'd01-g3-c3',
      zhHint: '我的名字是兔莉。', zhHintEn: 'My name is Tori.',
      audioKo: '제 이름은 토리예요.',
      answer: ['제', '이름은', '토리예요.'],
      tokens: ['제', '이름은', '토리예요.', '저는', '친구예요.'],
      explain: '제=我的，이름末字有收音→은，토리无收音→예요', explainEn: '제 = my; 이름 ends in a consonant → 은; 토리 ends in a vowel → 예요',
    },
    {
      id: 'd01-g3-c4',
      zhHint: '我是韩国人。', zhHintEn: 'I am Korean.',
      audioKo: '저는 한국 사람이에요.',
      answer: ['저는', '한국', '사람이에요.'],
      tokens: ['저는', '한국', '사람이에요.', '중국', '학생이에요.'],
      explain: '사람末字람有收音ㅁ → 이에요', explainEn: '사람 ends in ㅁ (consonant) → 이에요',
    },
  ],

  // ─── 规则理解选择 ───
  rule: [
    {
      id: 'd01-g3-r1',
      promptZh: '韩文"学生"（학생）末字有收音，介绍自己是学生应该说？', promptZhEn: 'In Korean, 학생 (student) ends in a consonant. How should you introduce yourself as a student?',
      choices: [
        { text: '저는 학생예요.', correct: false },
        { text: '저는 학생이요.', correct: false },
        { text: '저는 학생이에요.', correct: true },
        { text: '저는 학생에요.', correct: false },
      ],
      explain: '有收音末字 → 이에요；无收音 → 예요', explainEn: 'Ends in a consonant → 이에요; ends in a vowel → 예요',
    },
    {
      id: 'd01-g3-r2',
      promptZh: '韩文"朋友"（친구）末字无收音，介绍自己是朋友应该说？', promptZhEn: 'In Korean, 친구 (friend) ends in a vowel. How should you introduce yourself as a friend?',
      choices: [
        { text: '저는 친구이에요.', correct: false },
        { text: '저는 친구에요.', correct: false },
        { text: '저는 친구요.', correct: false },
        { text: '저는 친구예요.', correct: true },
      ],
      explain: '친구末字구无收音 → 예요', explainEn: '친구 ends in a vowel → 예요',
    },
    {
      id: 'd01-g3-r3',
      promptZh: '"이름"（名字）末字有收音，做主题时助词用？', promptZhEn: 'When the last syllable of "이름" (name) has a final consonant, what particle is used as the topic marker?',
      choices: [
        { text: '은', correct: true },
        { text: '는', correct: false },
        { text: '이', correct: false },
        { text: '가', correct: false },
      ],
      explain: '末字有收音 → 主题助词用은；无收音 → 는', explainEn: 'Final consonant present → topic particle 은; no final consonant → 는',
    },
    {
      id: 'd01-g3-r4',
      promptZh: '"저"（我）末字无收音，做主题时助词用？', promptZhEn: 'When the last syllable of "저" (I) has no final consonant, what particle is used as the topic marker?',
      choices: [
        { text: '은', correct: false },
        { text: '는', correct: true },
        { text: '이', correct: false },
        { text: '가', correct: false },
      ],
      explain: '저无收音 → 는；如果要强调"是我（而不是别人）"做主语，会说 제가（이/가 主格）', explainEn: '저 has no final consonant → 는; to emphasize "it\'s me (not someone else)" as the subject, use 제가 (이/가 nominative)',
    },
  ],
};
