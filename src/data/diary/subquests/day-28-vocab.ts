import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 28 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词（사인/앨범/응원해요/감동/떨려요/진심）之外的 8 个新词。
 * - core: 용기 / 부족하다 / 건강하다 / 잊다 / 평생 / 최애（进认词考察）
 * - ext:  팬사인회 / 항상（进拼写 / 听辨）
 *
 * 场景延展：签售会实战 · 从"抓紧勇气"到"永生难忘"。
 */
export const day28Vocab: VocabSubQuestData = {
  day: 28,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '签售会现场 · 说给爱豆听的 8 个词', subtitleEn: 'At a fan sign event · 8 phrases to say to your idol',

  encounter: [
    {
      id: 'd28-v1-e1',
      korean: '용기',
      hangul: 'yong-gi',
      zh: '勇气', zhEn: 'Courage',
      pos: '名词', posEn: 'Noun',
      example: { ko: '용기를 내요!', zh: '鼓起勇气！', zhEn: 'Gather your courage!' },
      tip: '汉字词「勇气」。搭配「용기를 내다」= 鼓起勇气。偶像给 Tori 的话正是这句', tipEn: 'Sino-Korean word \'courage.\' Used with \'용기를 내다\' = to muster courage. This is exactly what the idol says to Tori.',
      tier: 'core',
    },
    {
      id: 'd28-v1-e2',
      korean: '부족하다',
      hangul: 'bu-jo-ka-da',
      zh: '不够 / 不足', zhEn: 'Not enough / insufficient',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '아직 부족해요.', zh: '还不够。', zhEn: 'It\'s still not enough.' },
      tip: '汉字词「不足」+ 하다。被夸奖时的韩式谦虚回应 · 不是自我贬低', tipEn: 'Sino-Korean \'insufficient\' + 하다. A Korean-style humble response when praised · not self-deprecation.',
      tier: 'core',
    },
    {
      id: 'd28-v1-e3',
      korean: '건강하다',
      hangul: 'geon-gang-ha-da',
      zh: '健康', zhEn: 'health',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '건강하세요.', zh: '请保重身体。', zhEn: 'Please take care of your health.' },
      tip: '汉字词「健康」+ 하다。搭配「건강하세요」= 请保重（分别祝福）', tipEn: 'Sino-Korean \'health\' + 하다. Used with \'건강하세요\' = take care (parting blessing).',
      tier: 'core',
    },
    {
      id: 'd28-v1-e4',
      korean: '잊다',
      hangul: 'it-da',
      zh: '忘 / 忘记', zhEn: 'Forget / to forget',
      pos: '动词', posEn: 'Verb',
      example: { ko: '이 날을 잊지 못해요.', zh: '这一天忘不了。', zhEn: 'I can\'t forget this day.' },
      tip: '해요体：잊어요。搭配「잊지 못하다」= 忘不了；「잊어버리다」= 忘了', tipEn: '해요 form: 잊어요. Used with \'잊지 못하다\' = can\'t forget; \'잊어버리다\' = to forget.',
      tier: 'core',
    },
    {
      id: 'd28-v1-e5',
      korean: '평생',
      hangul: 'pyeong-saeng',
      zh: '一辈子 / 一生', zhEn: 'A lifetime / one\'s whole life',
      pos: '名词/副词', posEn: 'Noun/adverb',
      example: { ko: '평생 잊지 못할 거예요.', zh: '一辈子不会忘。', zhEn: 'I\'ll never forget this for the rest of my life.' },
      tip: '汉字词「平生」。搭配「평생 잊지 못하다」= 一辈子忘不了', tipEn: 'Sino-Korean \'lifetime.\' Used with \'평생 잊지 못하다\' = can\'t forget for a lifetime.',
      tier: 'core',
    },
    {
      id: 'd28-v1-e6',
      korean: '최애',
      hangul: 'choe-ae',
      zh: '本命 / 最爱', zhEn: 'Ultimate bias / favorite',
      pos: '名词', posEn: 'Noun',
      example: { ko: '이 오빠가 제 최애예요.', zh: '这个哥哥是我本命。', zhEn: 'This oppa is my ultimate bias.' },
      tip: '汉字词「最爱」。粉丝术语。搭配「최애곡」= 本命歌 / 「최애 팬」= 死忠粉', tipEn: 'Sino-Korean \'favorite.\' Fan term. Used with \'최애곡\' = favorite song / \'최애 팬\' = die-hard fan.',
      tier: 'core',
    },
    {
      id: 'd28-v1-e7',
      korean: '팬사인회',
      hangul: 'paen-sa-in-hoe',
      zh: '签售会', zhEn: 'Fan sign event',
      pos: '名词', posEn: 'Noun',
      example: { ko: '팬사인회 다녀왔어요.', zh: '去了签售会。', zhEn: 'Went to a fan signing event.' },
      tip: '팬(fan) + 사인(sign) + 회(会)。缩写「팬싸」。抽签制，一场限约 100 名', tipEn: '팬(fan) + 사인(sign) + 회(会). Abbreviated as \'팬싸\'. Lottery-based, limited to about 100 per session.',
      tier: 'ext',
    },
    {
      id: 'd28-v1-e8',
      korean: '항상',
      hangul: 'hang-sang',
      zh: '一直 / 总是', zhEn: 'Always / all the time',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '항상 응원해요.', zh: '一直支持你。', zhEn: 'I\'ll always support you.' },
      tip: '汉字词「恒常」。粉丝对偶像最常说「항상 응원해요」的固定句', tipEn: 'Sino-Korean word \'항상\'. A fixed phrase fans most often say to idols: \'항상 응원해요\' (I always support you).',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd28-v1-r1',
      korean: '용기',
      hangul: 'yong-gi',
      choices: [
        { zh: '勇气', zhEn: 'Courage', correct: true },
        { zh: '力气', zhEn: 'strength', correct: false },
        { zh: '能量', zhEn: 'Energy', correct: false },
        { zh: '心情', zhEn: 'mood', correct: false },
      ],
    },
    {
      id: 'd28-v1-r2',
      korean: '부족하다',
      hangul: 'bu-jo-ka-da',
      choices: [
        { zh: '不够 / 不足', zhEn: 'Not enough / insufficient', correct: true },
        { zh: '充分', zhEn: 'Sufficient', correct: false },
        { zh: '刚好', zhEn: 'Just right', correct: false },
        { zh: '多余', zhEn: 'Extra', correct: false },
      ],
    },
    {
      id: 'd28-v1-r3',
      korean: '건강하다',
      hangul: 'geon-gang-ha-da',
      choices: [
        { zh: '健康', zhEn: 'health', correct: true },
        { zh: '有钱', zhEn: 'Rich', correct: false },
        { zh: '幸福', zhEn: 'happiness', correct: false },
        { zh: '成功', zhEn: 'Success', correct: false },
      ],
    },
    {
      id: 'd28-v1-r4',
      korean: '잊다',
      hangul: 'it-da',
      choices: [
        { zh: '忘', zhEn: 'Forget', correct: true },
        { zh: '记住', zhEn: 'Remember.', correct: false },
        { zh: '知道', zhEn: 'Know', correct: false },
        { zh: '想念', zhEn: 'miss', correct: false },
      ],
    },
    {
      id: 'd28-v1-r5',
      korean: '평생',
      hangul: 'pyeong-saeng',
      choices: [
        { zh: '一辈子', zhEn: 'A lifetime', correct: true },
        { zh: '一年', zhEn: 'One year', correct: false },
        { zh: '一次', zhEn: 'Once', correct: false },
        { zh: '一天', zhEn: 'One day', correct: false },
      ],
    },
    {
      id: 'd28-v1-r6',
      korean: '최애',
      hangul: 'choe-ae',
      choices: [
        { zh: '本命 / 最爱', zhEn: 'Ultimate bias / favorite', correct: true },
        { zh: '前辈', zhEn: 'Senior', correct: false },
        { zh: '恩人', zhEn: 'Benefactor', correct: false },
        { zh: '老板', zhEn: 'Boss', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd28-v1-s1',
      zhHint: '签名', zhHintEn: 'Signature',
      answer: ['사', '인'],
      // 干扰："싸"（초성 ㅆ 差）；"입"（元음/받침 差别）
      syllables: ['사', '인', '싸', '입'],
    },
    {
      id: 'd28-v1-s2',
      zhHint: '专辑', zhHintEn: 'Album',
      answer: ['앨', '범'],
      // 干扰："앤"（元음 ㅐ 相同、받침 差）；"밤"（초성 ㅂ 相同、元음 ㅓ→ㅏ 差）
      syllables: ['앨', '범', '앤', '밤'],
    },
    {
      id: 'd28-v1-s3',
      zhHint: '感动', zhHintEn: 'Moved',
      answer: ['감', '동'],
      // 干扰："감"（同）；"당"（초성 ㄷ 相同、元음 ㅗ→ㅏ 差）
      syllables: ['감', '동', '갈', '당'],
    },
    {
      id: 'd28-v1-s4',
      zhHint: '真心', zhHintEn: 'Sincere heart',
      answer: ['진', '심'],
      // 干扰："정"（意思相关的 정말 一部分）；"삼"（초성/받침 相似）
      syllables: ['진', '심', '정', '삼'],
    },
  ],

  write: [
    { id: 'd28-v1-w1', korean: '사', hangul: 'sa',       wordKorean: '사인',        wordZh: '签名', wordZhEn: 'Signature' },
    { id: 'd28-v1-w2', korean: '앨', hangul: 'ael',      wordKorean: '앨범',        wordZh: '专辑', wordZhEn: 'Album' },
    { id: 'd28-v1-w3', korean: '응', hangul: 'eung',     wordKorean: '응원해요',    wordZh: '支持你', wordZhEn: 'Support you' },
    { id: 'd28-v1-w4', korean: '감', hangul: 'gam',      wordKorean: '감동',        wordZh: '感动', wordZhEn: 'Moved' },
    { id: 'd28-v1-w5', korean: '떨', hangul: 'tteol',    wordKorean: '떨려요',      wordZh: '紧张', wordZhEn: 'nervous' },
    { id: 'd28-v1-w6', korean: '진', hangul: 'jin',      wordKorean: '진심',        wordZh: '真心', wordZhEn: 'Sincere heart' },
    { id: 'd28-v1-w7', korean: '용', hangul: 'yong',     wordKorean: '용기',        wordZh: '勇气', wordZhEn: 'Courage' },
    { id: 'd28-v1-w8', korean: '평', hangul: 'pyeong',   wordKorean: '평생',        wordZh: '一辈子', wordZhEn: 'A lifetime' },
  ],

  dictation: [
    { id: 'd28-v1-d1', korean: '토리예요',        hangul: 'to-ri-ye-yo',            syllables: ['토', '리', '예', '요'],       zh: '我叫Tori', zhEn: 'My name is Tori' },
    { id: 'd28-v1-d2', korean: '응원해요',        hangul: 'eung-won-hae-yo',        syllables: ['응', '원', '해', '요'],       zh: '支持你', zhEn: 'Support you' },
    { id: 'd28-v1-d3', korean: '건강하세요',       hangul: 'geon-gang-ha-se-yo',    syllables: ['건', '강', '하', '세', '요'], zh: '请保重', zhEn: 'Take care' },
  ],
};
