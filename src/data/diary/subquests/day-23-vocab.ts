import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 23 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词（오빠/언니/팬/콘서트/진짜/정말）之外的 8 个新词。
 * - core: 생일카페 / 응원 / 굿즈 / 포토카드 / 노래 / 멋있다（进认词考察）
 * - ext:  사랑해요 / 대박（进拼写 / 听辨）
 *
 * 场景延展：从"生日咖啡"到"应援周边"到"粉丝感叹语"。
 */
export const day23Vocab: VocabSubQuestData = {
  day: 23,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '弘爪街学到的 8 个追星词', subtitleEn: '8 fan culture terms learned on Hongdae Street.',

  encounter: [
    {
      id: 'd23-v1-e1',
      korean: '생일카페',
      hangul: 'saeng-il-ka-pe',
      zh: '生日咖啡（爱豆生日应援活动）', zhEn: 'Birthday cafe (fan support event for an idol\'s birthday).',
      pos: '名词', posEn: 'Noun',
      example: { ko: '오늘 모찌 오빠 생일카페 가요.', zh: '今天去 Mochi 哥的生日咖啡。', zhEn: 'Today I\'m going to Mochi\'s birthday cafe.' },
      tip: '생일(生日) + 카페(咖啡)。粉丝租咖啡馆为爱豆庆生，缩写「생카」。首尔弘爪街最多', tipEn: '생일 (birthday) + 카페 (cafe). Fans rent a cafe to celebrate an idol\'s birthday, abbreviated as \'생카\'. Most common on Hongdae Street in Seoul.',
      tier: 'core',
    },
    {
      id: 'd23-v1-e2',
      korean: '응원',
      hangul: 'eung-won',
      zh: '应援', zhEn: 'fan support',
      pos: '名词', posEn: 'Noun',
      example: { ko: '응원 카드 받았어요.', zh: '拿到应援卡了。', zhEn: 'Got the support card.' },
      tip: '汉字词「应援」。搭配「응원하다」= 应援。粉丝支持爱豆的行为总称', tipEn: 'Sino-Korean word \'응원\'. Used with \'응원하다\' = to support. General term for fans supporting idols.',
      tier: 'core',
    },
    {
      id: 'd23-v1-e3',
      korean: '굿즈',
      hangul: 'gut-jeu',
      zh: '周边', zhEn: 'Merch.',
      pos: '名词', posEn: 'Noun',
      example: { ko: '굿즈 사고 싶어요.', zh: '想买周边。', zhEn: 'I want to buy merch.' },
      tip: '英语 goods 的韩式外来语。爱豆周边商品总称，包括 포토카드 / 응원봉 / 티셔츠 等', tipEn: 'Korean loanword from English \'goods\'. General term for idol merchandise, including 포토카드 / 응원봉 / 티셔츠, etc.',
      tier: 'core',
    },
    {
      id: 'd23-v1-e4',
      korean: '포토카드',
      hangul: 'po-to-ka-deu',
      zh: '小卡（爱豆照片卡）', zhEn: 'Photocard (idol photo card).',
      pos: '名词', posEn: 'Noun',
      example: { ko: '포토카드 뭐 나왔어요?', zh: '出的是哪张小卡？', zhEn: 'Which photocard is it?' },
      tip: '英语 photo card 的韩式外来语。K-POP 周边核心 · 缩写「포카」', tipEn: 'Korean loanword from English \'photo card\'. Core K-POP merch · abbreviated as \'포카\'.',
      tier: 'core',
    },
    {
      id: 'd23-v1-e5',
      korean: '노래',
      hangul: 'no-rae',
      zh: '歌 / 歌曲', zhEn: 'Song.',
      pos: '名词', posEn: 'Noun',
      example: { ko: '이 노래 진짜 좋아요.', zh: '这首歌真好听。', zhEn: 'This song is really good.' },
      tip: '固有词。搭配「노래하다」= 唱歌 / 「노래를 듣다」= 听歌', tipEn: 'Native Korean word. Used with \'노래하다\' = to sing / \'노래를 듣다\' = to listen to music.',
      tier: 'core',
    },
    {
      id: 'd23-v1-e6',
      korean: '멋있다',
      hangul: 'meo-sit-da',
      zh: '帅 / 酷', zhEn: 'Cool / Handsome',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '오빠 진짜 멋있어요!', zh: '哥真的好帅！', zhEn: 'He\'s really handsome!' },
      tip: '해요体：멋있어요（末元音 ㅣ→어요）。帅气/酷炫都用。爱豆/父辈/朋友都能形容', tipEn: '해요体: 멋있어요 (final vowel ㅣ→어요). Used for both handsome and cool. Can describe idols, elders, or friends.',
      tier: 'core',
    },
    {
      id: 'd23-v1-e7',
      korean: '사랑해요',
      hangul: 'sa-rang-hae-yo',
      zh: '我爱你', zhEn: 'I love you',
      pos: '表达', posEn: 'Expression',
      example: { ko: '오빠 사랑해요!', zh: '哥我爱你！', zhEn: 'I love you, oppa!' },
      tip: '사랑하다(爱) → 해요体。粉丝对爱豆/情侣间/家人间都用', tipEn: '사랑하다 (love) → 해요体. Used by fans to idols, between couples, and among family.',
      tier: 'ext',
    },
    {
      id: 'd23-v1-e8',
      korean: '대박',
      hangul: 'dae-bak',
      zh: '牛！好棒！（口语感叹）', zhEn: 'Awesome! Great! (casual exclamation)',
      pos: '感叹词', posEn: 'Interjection',
      example: { ko: '와, 대박!', zh: '哇，牛！', zhEn: 'Wow, awesome!' },
      tip: '大发(大 hit)。年轻人口语最爱用的感叹词。震惊、赞叹、佩服都能用', tipEn: 'Daebak (big hit). The most popular exclamation among young people. Used for shock, admiration, or awe.',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd23-v1-r1',
      korean: '생일카페',
      hangul: 'saeng-il-ka-pe',
      choices: [
        { zh: '爱豆生日应援咖啡馆', zhEn: 'Idol birthday support cafe', correct: true },
        { zh: '爱豆的家', zhEn: 'Idol\'s home', correct: false },
        { zh: '爱豆开的店', zhEn: 'A store opened by an idol', correct: false },
        { zh: '爱豆生日晚会', zhEn: 'Idol\'s birthday party', correct: false },
      ],
    },
    {
      id: 'd23-v1-r2',
      korean: '응원',
      hangul: 'eung-won',
      choices: [
        { zh: '应援', zhEn: 'fan support', correct: true },
        { zh: '演唱', zhEn: 'Singing', correct: false },
        { zh: '出道', zhEn: 'Debut', correct: false },
        { zh: '直播', zhEn: 'Live broadcast', correct: false },
      ],
    },
    {
      id: 'd23-v1-r3',
      korean: '굿즈',
      hangul: 'gut-jeu',
      choices: [
        { zh: '周边', zhEn: 'Merch.', correct: true },
        { zh: '票', zhEn: 'ticket', correct: false },
        { zh: '海报', zhEn: 'poster', correct: false },
        { zh: '专辑', zhEn: 'Album', correct: false },
      ],
    },
    {
      id: 'd23-v1-r4',
      korean: '포토카드',
      hangul: 'po-to-ka-deu',
      choices: [
        { zh: '小卡', zhEn: 'photocard', correct: true },
        { zh: '门票', zhEn: 'Ticket', correct: false },
        { zh: '签名照', zhEn: 'Signed photo', correct: false },
        { zh: '手写信', zhEn: 'Handwritten letter', correct: false },
      ],
    },
    {
      id: 'd23-v1-r5',
      korean: '노래',
      hangul: 'no-rae',
      choices: [
        { zh: '歌', zhEn: 'Song', correct: true },
        { zh: '舞', zhEn: 'Dance', correct: false },
        { zh: '声音', zhEn: 'Voice', correct: false },
        { zh: '乐器', zhEn: 'Instrument', correct: false },
      ],
    },
    {
      id: 'd23-v1-r6',
      korean: '멋있다',
      hangul: 'meo-sit-da',
      choices: [
        { zh: '帅 / 酷', zhEn: 'Cool / Handsome', correct: true },
        { zh: '好吃', zhEn: 'delicious', correct: false },
        { zh: '有趣', zhEn: 'Fun', correct: false },
        { zh: '安静', zhEn: 'Quiet', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd23-v1-s1',
      zhHint: '粉丝', zhHintEn: 'Fan',
      answer: ['팬'],
      // 干扰："펜"（元音 ㅐ→ㅔ 差）；"판"（元音 ㅐ→ㅏ 差）；"뺀"（초성 ㅍ→ㅃ 差）
      syllables: ['팬', '펜', '판', '뺀'],
    },
    {
      id: 'd23-v1-s2',
      zhHint: '演唱会', zhHintEn: 'Concert',
      answer: ['콘', '서', '트'],
      // 干扰："콘"（同）；"소"（元音 ㅓ→ㅗ 差）；"트"（同）；"드"（초성 ㅌ→ㄷ 差）
      syllables: ['콘', '서', '트', '소', '드'],
    },
    {
      id: 'd23-v1-s3',
      zhHint: '真的（口语）', zhHintEn: 'really (casual)',
      answer: ['진', '짜'],
      // 干扰："정"（意思相近的 정말 一部分）；"자"（초성 ㅉ→ㅈ 差）
      syllables: ['진', '짜', '정', '자'],
    },
    {
      id: 'd23-v1-s4',
      zhHint: '牛！', zhHintEn: 'Awesome!',
      answer: ['대', '박'],
      // 干扰："태"（초성 ㄷ→ㅌ 差）；"밖"（받침 ㄱ→ㄲ 差）
      syllables: ['대', '박', '태', '밖'],
    },
  ],

  write: [
    { id: 'd23-v1-w1', korean: '오', hangul: 'o',      wordKorean: '오빠',     wordZh: '哥', wordZhEn: 'Oppa' },
    { id: 'd23-v1-w2', korean: '언', hangul: 'eon',    wordKorean: '언니',     wordZh: '姐', wordZhEn: 'Older sister' },
    { id: 'd23-v1-w3', korean: '팬', hangul: 'paen',   wordKorean: '팬',       wordZh: '粉丝', wordZhEn: 'Fan' },
    { id: 'd23-v1-w4', korean: '진', hangul: 'jin',    wordKorean: '진짜',     wordZh: '真的', wordZhEn: 'really' },
    { id: 'd23-v1-w5', korean: '정', hangul: 'jeong',  wordKorean: '정말',     wordZh: '真的', wordZhEn: 'really' },
    { id: 'd23-v1-w6', korean: '응', hangul: 'eung',   wordKorean: '응원',     wordZh: '应援', wordZhEn: 'fan support' },
    { id: 'd23-v1-w7', korean: '노', hangul: 'no',     wordKorean: '노래',     wordZh: '歌', wordZhEn: 'Song' },
    { id: 'd23-v1-w8', korean: '멋', hangul: 'meot',   wordKorean: '멋있다',   wordZh: '帅', wordZhEn: 'handsome' },
  ],

  dictation: [
    { id: 'd23-v1-d1', korean: '진짜',        hangul: 'jin-jja',        syllables: ['진', '짜'],           zh: '真的', zhEn: 'really' },
    { id: 'd23-v1-d2', korean: '정말 좋아요', hangul: 'jeong-mal jo-a-yo', syllables: ['정', '말', '좋', '아', '요'], zh: '真的好', zhEn: 'Really good' },
    { id: 'd23-v1-d3', korean: '사랑해요',    hangul: 'sa-rang-hae-yo', syllables: ['사', '랑', '해', '요'], zh: '我爱你', zhEn: 'I love you' },
  ],
};
