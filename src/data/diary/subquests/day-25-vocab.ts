import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 25 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词（한강/응원/사랑해/따라 해/외쳐/응원봉）之外的 8 个新词。
 * - core: 무대 / 관객 / 노래하다 / 화이팅 / 힘내 / 최고（进认词考察）
 * - ext:  부끄럽다 / 함께（进拼写 / 听辨）
 *
 * 场景延展：舞台/观众/加油口号/情绪表达。
 */
export const day25Vocab: VocabSubQuestData = {
  day: 25,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '3000 人演唱会 · 现场跟着喊的 8 个词', subtitleEn: '8 words to chant along at a 3,000-person concert',

  encounter: [
    {
      id: 'd25-v1-e1',
      korean: '무대',
      hangul: 'mu-dae',
      zh: '舞台', zhEn: 'Stage',
      pos: '名词', posEn: 'Noun',
      example: { ko: '무대가 정말 커요.', zh: '舞台真大。', zhEn: 'The stage is really big.' },
      tip: '汉字词「舞台」。演唱会/戏剧/颁奖礼都用。搭配「무대에 오르다」= 登台', tipEn: 'Sino-Korean word for "stage." Used for concerts, plays, award ceremonies. Pair with 무대에 오르다 = to go on stage.',
      tier: 'core',
    },
    {
      id: 'd25-v1-e2',
      korean: '관객',
      hangul: 'gwan-gaek',
      zh: '观众', zhEn: 'audience',
      pos: '名词', posEn: 'Noun',
      example: { ko: '관객이 3000명이에요.', zh: '观众有3000人。', zhEn: 'There are 3,000 audience members.' },
      tip: '汉字词「观客」。演唱会/剧场/体育赛观众都叫 관객', tipEn: 'Sino-Korean word \'观客\'. Audience at concerts, theaters, and sports events is called 관객.',
      tier: 'core',
    },
    {
      id: 'd25-v1-e3',
      korean: '노래하다',
      hangul: 'no-rae-ha-da',
      zh: '唱歌', zhEn: 'sing',
      pos: '动词', posEn: 'Verb',
      example: { ko: '오빠가 노래해요.', zh: '哥哥在唱歌。', zhEn: 'My older brother is singing.' },
      tip: '노래(歌) + 하다 = 唱歌。해요体 = 노래해요；반말 = 노래해', tipEn: '노래 (song) + 하다 = to sing. 해요 form = 노래해요; casual = 노래해',
      tier: 'core',
    },
    {
      id: 'd25-v1-e4',
      korean: '화이팅',
      hangul: 'hwa-i-ting',
      zh: '加油', zhEn: 'You got this',
      pos: '感叹词', posEn: 'Interjection',
      example: { ko: '내일 시험 있어? 화이팅!', zh: '明天有考试？加油！', zhEn: 'Exam tomorrow? You got this!' },
      tip: '英语 fighting 的韩式变体。不分场合都用。파이팅 也可以', tipEn: 'Korean variant of English \'fighting\'. Used in all situations. 파이팅 also works.',
      tier: 'core',
    },
    {
      id: 'd25-v1-e5',
      korean: '힘내',
      hangul: 'him-nae',
      zh: '打起精神 / 加油', zhEn: 'Cheer up / You can do it',
      pos: '表达', posEn: 'Expression',
      example: { ko: '힘내! 넌 할 수 있어!', zh: '加油！你可以的！', zhEn: 'You can do it! You\'ve got this!', },
      tip: '힘(力) + 내다(拿出) → 힘내다 = 打起精神。반말命令。합쇼체 = 힘내세요', tipEn: '힘 (strength) + 내다 (to bring out) → 힘내다 = to cheer up. Casual command. Formal = 힘내세요',
      tier: 'core',
    },
    {
      id: 'd25-v1-e6',
      korean: '최고',
      hangul: 'choe-go',
      zh: '最棒 / 第一', zhEn: 'Best / Number one',
      pos: '名词', posEn: 'Noun',
      example: { ko: '오빠 최고!', zh: '哥哥最棒！', zhEn: 'You\'re the best, oppa!' },
      tip: '汉字词「最高」。称赞爱豆/朋友/食物"你最棒"的标准感叹', tipEn: 'Sino-Korean word \'最高\'. Standard exclamation to praise idols, friends, or food as \'you\'re the best\'.',
      tier: 'core',
    },
    {
      id: 'd25-v1-e7',
      korean: '부끄럽다',
      hangul: 'bu-kkeu-reop-da',
      zh: '害羞 / 尴尬', zhEn: 'Shy / Embarrassed',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '아, 부끄러워요.', zh: '啊，好害羞。', zhEn: 'Ah, so shy.' },
      tip: 'ㅂ 不规则：부끄럽 + 어요 → 부끄러워요。반말 = 부끄러워', tipEn: 'ㅂ irregular: 부끄럽 + 어요 → 부끄러워요. Casual = 부끄러워',
      tier: 'ext',
    },
    {
      id: 'd25-v1-e8',
      korean: '함께',
      hangul: 'ham-kke',
      zh: '一起（书面/正式）', zhEn: 'Together (written/formal)',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '다 함께 노래해요.', zh: '大家一起唱歌。', zhEn: 'Everyone sings together.' },
      tip: '함께 比 같이 更正式 / 更书面。演唱会主持词、正式邀请常用', tipEn: '함께 is more formal/written than 같이. Common in concert MC scripts and formal invitations.',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd25-v1-r1',
      korean: '무대',
      hangul: 'mu-dae',
      choices: [
        { zh: '舞台', zhEn: 'Stage', correct: true },
        { zh: '后台', zhEn: 'backstage', correct: false },
        { zh: '观众席', zhEn: 'audience seating', correct: false },
        { zh: '灯光', zhEn: 'lighting', correct: false },
      ],
    },
    {
      id: 'd25-v1-r2',
      korean: '관객',
      hangul: 'gwan-gaek',
      choices: [
        { zh: '观众', zhEn: 'audience', correct: true },
        { zh: '演员', zhEn: 'actor', correct: false },
        { zh: '主持人', zhEn: 'host', correct: false },
        { zh: '工作人员', zhEn: 'staff', correct: false },
      ],
    },
    {
      id: 'd25-v1-r3',
      korean: '노래하다',
      hangul: 'no-rae-ha-da',
      choices: [
        { zh: '唱歌', zhEn: 'sing', correct: true },
        { zh: '跳舞', zhEn: 'to dance', correct: false },
        { zh: '弹琴', zhEn: 'to play an instrument', correct: false },
        { zh: '听歌', zhEn: 'to listen to music', correct: false },
      ],
    },
    {
      id: 'd25-v1-r4',
      korean: '화이팅',
      hangul: 'hwa-i-ting',
      choices: [
        { zh: '加油', zhEn: 'You got this', correct: true },
        { zh: '打架', zhEn: 'Fight', correct: false },
        { zh: '战斗', zhEn: 'Battle', correct: false },
        { zh: '厉害', zhEn: 'awesome', correct: false },
      ],
    },
    {
      id: 'd25-v1-r5',
      korean: '힘내',
      hangul: 'him-nae',
      choices: [
        { zh: '打起精神 / 加油', zhEn: 'Cheer up / You can do it', correct: true },
        { zh: '好好休息', zhEn: 'rest well', correct: false },
        { zh: '快去', zhEn: 'go quickly', correct: false },
        { zh: '别哭', zhEn: 'don\'t cry', correct: false },
      ],
    },
    {
      id: 'd25-v1-r6',
      korean: '최고',
      hangul: 'choe-go',
      choices: [
        { zh: '最棒 / 第一', zhEn: 'Best / Number one', correct: true },
        { zh: '最差', zhEn: 'worst', correct: false },
        { zh: '最快', zhEn: 'fastest', correct: false },
        { zh: '最贵', zhEn: 'most expensive', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd25-v1-s1',
      zhHint: '爱你（반말）', zhHintEn: 'I love you (casual)',
      answer: ['사', '랑', '해'],
      // 干扰："싸"（초성 ㅆ→ㅅ 差别）；"항"（元音 ㅏ 相同、初声差别）
      syllables: ['사', '랑', '해', '싸', '항'],
    },
    {
      id: 'd25-v1-s2',
      zhHint: '应援棒', zhHintEn: 'light stick',
      answer: ['응', '원', '봉'],
      // 干扰："운"（초성 ㅇ 相同、元音差别）；"방"（元音 ㅗ→ㅏ）
      syllables: ['응', '원', '봉', '운', '방'],
    },
    {
      id: 'd25-v1-s3',
      zhHint: '加油', zhHintEn: 'You got this',
      answer: ['화', '이', '팅'],
      // 干扰："하"（与 화 形近，但 하이팅 不成词，避免 파이팅 双解）；"딩"（初声 ㅌ→ㄷ 差别）
      syllables: ['화', '이', '팅', '하', '딩'],
    },
    {
      id: 'd25-v1-s4',
      zhHint: '最棒', zhHintEn: 'best',
      answer: ['최', '고'],
      // 干扰："최"（同）；"조"（元音 ㅗ 相同、초성差别）；"제"（초성 ㅊ→ㅈ 差别）
      syllables: ['최', '고', '조', '제'],
    },
  ],

  write: [
    { id: 'd25-v1-w1', korean: '사', hangul: 'sa',       wordKorean: '사랑해',    wordZh: '爱你', wordZhEn: 'Love you' },
    { id: 'd25-v1-w2', korean: '응', hangul: 'eung',     wordKorean: '응원해',    wordZh: '支持你', wordZhEn: 'Support you' },
    { id: 'd25-v1-w3', korean: '따', hangul: 'tta',      wordKorean: '따라해',    wordZh: '跟着', wordZhEn: 'to follow' },
    { id: 'd25-v1-w4', korean: '외', hangul: 'oe',       wordKorean: '외쳐',      wordZh: '喊', wordZhEn: 'shout' },
    { id: 'd25-v1-w5', korean: '봉', hangul: 'bong',     wordKorean: '응원봉',    wordZh: '应援棒', wordZhEn: 'light stick' },
    { id: 'd25-v1-w6', korean: '무', hangul: 'mu',       wordKorean: '무대',      wordZh: '舞台', wordZhEn: 'Stage' },
    { id: 'd25-v1-w7', korean: '화', hangul: 'hwa',      wordKorean: '화이팅',    wordZh: '加油', wordZhEn: 'You got this' },
    { id: 'd25-v1-w8', korean: '최', hangul: 'choe',     wordKorean: '최고',      wordZh: '最棒', wordZhEn: 'best' },
  ],

  dictation: [
    { id: 'd25-v1-d1', korean: '사랑해',        hangul: 'sa-rang-hae',       syllables: ['사', '랑', '해'],           zh: '爱你', zhEn: 'Love you' },
    { id: 'd25-v1-d2', korean: '응원해',        hangul: 'eung-won-hae',      syllables: ['응', '원', '해'],           zh: '支持你', zhEn: 'Support you' },
    { id: 'd25-v1-d3', korean: '오빠 최고!',    hangul: 'o-ppa choe-go',     syllables: ['오', '빠', '최', '고'],     zh: '哥最棒！', zhEn: 'You\'re the best, oppa!' },
  ],
};
