import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 23 · 1-3 문법 탐험 · 语法关
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：진짜 vs 정말 场景差 + 追星常用句 (팬이 되다 / V고 싶어요 复用)
 */
export const day23Grammar: GrammarSubQuestData = {
  day: 23, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握 진짜 vs 정말 · 追星表达框架', subtitleEn: 'Master 진짜 vs 정말 · fan expression framework',

  fix: [
    {
      id: 'd23-g3-f1',
      promptKo: '선생님, 진짜 감사합니다.',
      promptZh: '对老师说"真的非常感谢"，哪句最得体？', promptZhEn: 'Which is the most polite way to say "thank you very much" to a teacher?',
      choices: [
        { text: '선생님, 진짜 감사합니다.', correct: false },
        { text: '선생님, 정말 감사합니다.', correct: true },
        { text: '선생님, 진짜 고마워.', correct: false },
        { text: '선생님, 정말 고마워.', correct: false },
      ],
      explain: '对长辈/正式场合 → 정말 감사합니다 更得体。진짜 语感偏幼稚', explainEn: 'For elders/formal settings → 정말 감사합니다 is more appropriate. 진짜 sounds childish.',
    },
    {
      id: 'd23-g3-f2',
      promptKo: '이 가방 정말이에요?',
      promptZh: '"这包是真品吗？"哪句正确？', promptZhEn: 'Which is correct for "Is this bag authentic?"',
      choices: [
        { text: '이 가방 정말이에요?', correct: false },
        { text: '이 가방 진짜예요?', correct: true },
        { text: '이 가방 정말예요?', correct: false },
        { text: '이 가방 진짜이에요?', correct: false },
      ],
      explain: '진짜 当"真品"时是名词。정말 没有名词用法。진짜 无收音 → 예요', explainEn: '진짜 as \'authentic\' is a noun. 정말 has no noun usage. 진짜 has no final consonant → 예요',
    },
    {
      id: 'd23-g3-f3',
      promptKo: '저도 팬가 됐어요.',
      promptZh: '"我也成为粉丝了"哪句正确？', promptZhEn: 'Which is correct for "I became a fan too"?',
      choices: [
        { text: '저도 팬가 됐어요.', correct: false },
        { text: '저도 팬이 됐어요.', correct: true },
        { text: '저도 팬을 됐어요.', correct: false },
        { text: '저도 팬도 됐어요.', correct: false },
      ],
      explain: '「N이/가 되다」= 成为 N。팬 有收音 ㄴ → 이', explainEn: '「N이/가 되다」= to become N. 팬 has final consonant ㄴ → 이',
    },
    {
      id: 'd23-g3-f4',
      promptKo: '콘서트를 가고 싶어요.',
      promptZh: '"想去演唱会"哪句最标准？', promptZhEn: 'Which is the most standard way to say "I want to go to the concert"?',
      choices: [
        { text: '콘서트를 가고 싶어요.', correct: false },
        { text: '콘서트에 가고 싶어요.', correct: true },
        { text: '콘서트가 가고 싶어요.', correct: false },
        { text: '콘서트도 가고 싶어요.', correct: false },
      ],
      explain: '가다 用 에 表方向。콘서트에 가다 = 去演唱会', explainEn: '가다 uses 에 to indicate direction. 콘서트에 가다 = going to a concert',
    },
    {
      id: 'd23-g3-f5',
      promptKo: '이 노래 진짜 좋아해요.',
      promptZh: '"这首歌真的好听"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "this song is really good"?',
      choices: [
        { text: '이 노래 진짜 좋아해요.', correct: false },
        { text: '이 노래 진짜 좋아요.', correct: true },
        { text: '이 노래 진짜 있어요.', correct: false },
        { text: '이 노래 진짜 되어요.', correct: false },
      ],
      explain: '좋아요 = 好（形容词，评价客观好听）；좋아해요 = 喜欢（动词，评价主观喜好）。评价"好听"用 좋아요', explainEn: '좋아요 = good (adjective, objectively evaluating that it sounds nice); 좋아해요 = like (verb, subjectively expressing preference). To say "sounds good," use 좋아요',
    },
  ],

  compose: [
    {
      id: 'd23-g3-c1',
      zhHint: '真的吗？真的好想去！', zhHintEn: 'Really? I really want to go!',
      audioKo: '진짜? 정말 가고 싶어요!',
      answer: ['진짜?', '정말', '가고', '싶어요!'],
      tokens: ['진짜?', '정말', '가고', '싶어요!', '진짜예요?', '있어요?', '있어요.'],
      explain: '진짜?（口语惊喜）+ 정말 가고 싶어요（认真表达）', explainEn: '진짜? (casual surprise) + 정말 가고 싶어요 (serious expression)',
    },
    {
      id: 'd23-g3-c2',
      zhHint: '真的非常感谢。', zhHintEn: 'Thank you so much.',
      audioKo: '정말 감사합니다.',
      answer: ['정말', '감사합니다.'],
      tokens: ['정말', '감사합니다.', '진짜', '고마워.', '반가워요.'],
      explain: '합쇼체场合优先 정말。감사합니다 是합쇼체标准感谢', explainEn: 'In 합쇼체 situations, prioritize 정말. 감사합니다 is the standard formal thank-you',
    },
    {
      id: 'd23-g3-c3',
      zhHint: '我也成为粉丝了。', zhHintEn: 'I became a fan too.',
      audioKo: '저도 팬이 됐어요.',
      answer: ['저도', '팬이', '됐어요.'],
      tokens: ['저도', '팬이', '됐어요.', '팬가', '팬을', '있어요.', '해요.'],
      explain: '「N이/가 되다」= 成为 N。팬 有收音 → 이', explainEn: '「N이/가 되다」= to become N. 팬 has a final consonant → 이',
    },
    {
      id: 'd23-g3-c4',
      zhHint: '这首歌真好听。', zhHintEn: 'This song is really good.',
      audioKo: '이 노래 진짜 좋아요.',
      answer: ['이', '노래', '진짜', '좋아요.'],
      tokens: ['이', '노래', '진짜', '좋아요.', '정말요', '좋아해요.', '들어요.'],
      explain: '진짜 + 좋아요 = 加强"真的好"。좋아요（好听）≠ 좋아해요（喜欢）', explainEn: '진짜 + 좋아요 = emphasizes "really good." 좋아요 (sounds good) ≠ 좋아해요 (like)',
    },
  ],

  rule: [
    {
      id: 'd23-g3-r1',
      promptZh: '关于 진짜 vs 정말，哪句最准确？', promptZhEn: 'Which statement about 진짜 vs 정말 is most accurate?',
      choices: [
        { text: '진짜 口语更随意 / 정말 正式通用。对长辈/正式场合优先 정말', textEn: '진짜 is more casual in speech / 정말 is formal and general. For elders/formal settings, prioritize 정말', correct: true },
        { text: '两者完全一样', textEn: 'The two are exactly the same', correct: false },
        { text: '진짜 只指 "真品"', textEn: '진짜 only means "genuine item"', correct: false },
        { text: '정말 只用书面语', textEn: '정말 is only used in writing', correct: false },
      ],
      explain: '进阶用法：韩国年轻人对话里两个词都出现，但语感不同——用错会显得不合场合', explainEn: 'Advanced usage: both words appear in Korean young people\'s conversations, but the nuance differs—using the wrong one can seem out of place',
    },
    {
      id: 'd23-g3-r2',
      promptZh: '关于 진짜 当"真品"用法，哪句最准确？', promptZhEn: 'Which statement about 진짜 meaning "genuine item" is most accurate?',
      choices: [
        { text: '진짜 = 真的（副词）+ 真品（名词）。"이거 진짜예요?" = 这是真的吗？（问真伪）', textEn: '진짜 = really (adverb) + genuine item (noun). "이거 진짜예요?" = Is this real? (asking about authenticity)', correct: true },
        { text: '진짜 只能当副词', textEn: '진짜 can only be an adverb', correct: false },
        { text: '这种用法要用 정말', textEn: 'For this usage, you should use 정말', correct: false },
        { text: '这种用法要用 진짜의', textEn: 'For this usage, you should use 진짜의', correct: false },
      ],
      explain: '「진짜 가짜?」= 真的假的？年轻人聊天最爱说。정말가짜 是错的', explainEn: '「진짜 가짜?」= Real or fake? Young people love saying this in chats. 정말가짜 is wrong',
    },
    {
      id: 'd23-g3-r3',
      promptZh: '关于「N이/가 되다」，哪句最准确？', promptZhEn: 'Which statement about 「N이/가 되다」 is most accurate?',
      choices: [
        { text: '「N이/가 되다」= 成为 N。必须用主格，不用宾格。팬 → 팬이 되다', textEn: '「N이/가 되다」= become N. Must use the nominative case, not the accusative. 팬 → 팬이 되다', correct: true },
        { text: '되다 用宾格 을/를', textEn: '되다 uses the accusative 을/를', correct: false },
        { text: 'N 后面直接接 되다，不需要助词', textEn: 'N is directly followed by 되다, no particle needed', correct: false },
        { text: '되다 只在过去时使用', textEn: '되다 is only used in the past tense', correct: false },
      ],
      explain: '되다 是自动词。「成为~」的主体是"~"，用主格 이/가', explainEn: '되다 is an intransitive verb. The subject of "become ~" is "~", so use the nominative 이/가',
    },
    {
      id: 'd23-g3-r4',
      promptZh: '关于 좋아요 vs 좋아해요，哪句最准确？', promptZhEn: 'Which statement about 좋아요 vs 좋아해요 is most accurate?',
      choices: [
        { text: '좋아요 = 好（形容词，客观评价）；좋아해요 = 喜欢（动词，主观情感）', textEn: '좋아요 = good (adjective, objective evaluation); 좋아해요 = like (verb, subjective feeling)', correct: true },
        { text: '两者意思完全一样', textEn: 'Both mean exactly the same thing.', correct: false },
        { text: '좋아요 用于人，좋아해요 用于物', textEn: '좋아요 is for people, 좋아해요 is for things', correct: false },
        { text: '좋아해요 是过去时', textEn: '좋아해요 is past tense', correct: false },
      ],
      explain: '노래가 좋아요 = 歌好听；노래를 좋아해요 = 喜欢这首歌。前者用 이/가，后者用 을/를', explainEn: '노래가 좋아요 = the song is good; 노래를 좋아해요 = I like this song. The former uses 이/가, the latter uses 을/를',
    },
  ],
};
