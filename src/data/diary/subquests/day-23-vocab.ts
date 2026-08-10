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
  subtitle: '弘爪街学到的 8 个追星词',

  encounter: [
    {
      id: 'd23-v1-e1',
      korean: '생일카페',
      hangul: 'saeng-il-ka-pe',
      zh: '生日咖啡（爱豆生日应援活动）',
      pos: '名词',
      example: { ko: '오늘 모찌 오빠 생일카페 가요.', zh: '今天去 Mochi 哥的生日咖啡。' },
      tip: '생일(生日) + 카페(咖啡)。粉丝租咖啡馆为爱豆庆生，缩写「생카」。首尔弘爪街最多',
      tier: 'core',
    },
    {
      id: 'd23-v1-e2',
      korean: '응원',
      hangul: 'eung-won',
      zh: '应援',
      pos: '名词',
      example: { ko: '응원 카드 받았어요.', zh: '拿到应援卡了。' },
      tip: '汉字词「应援」。搭配「응원하다」= 应援。粉丝支持爱豆的行为总称',
      tier: 'core',
    },
    {
      id: 'd23-v1-e3',
      korean: '굿즈',
      hangul: 'gut-jeu',
      zh: '周边',
      pos: '名词',
      example: { ko: '굿즈 사고 싶어요.', zh: '想买周边。' },
      tip: '英语 goods 的韩式外来语。爱豆周边商品总称，包括 포토카드 / 응원봉 / 티셔츠 等',
      tier: 'core',
    },
    {
      id: 'd23-v1-e4',
      korean: '포토카드',
      hangul: 'po-to-ka-deu',
      zh: '小卡（爱豆照片卡）',
      pos: '名词',
      example: { ko: '포토카드 뭐 나왔어요?', zh: '出的是哪张小卡？' },
      tip: '英语 photo card 的韩式外来语。K-POP 周边核心 · 缩写「포카」',
      tier: 'core',
    },
    {
      id: 'd23-v1-e5',
      korean: '노래',
      hangul: 'no-rae',
      zh: '歌 / 歌曲',
      pos: '名词',
      example: { ko: '이 노래 진짜 좋아요.', zh: '这首歌真好听。' },
      tip: '固有词。搭配「노래하다」= 唱歌 / 「노래를 듣다」= 听歌',
      tier: 'core',
    },
    {
      id: 'd23-v1-e6',
      korean: '멋있다',
      hangul: 'meo-sit-da',
      zh: '帅 / 酷',
      pos: '形容词',
      example: { ko: '오빠 진짜 멋있어요!', zh: '哥真的好帅！' },
      tip: '해요体：멋있어요（末元音 ㅣ→어요）。帅气/酷炫都用。爱豆/父辈/朋友都能形容',
      tier: 'core',
    },
    {
      id: 'd23-v1-e7',
      korean: '사랑해요',
      hangul: 'sa-rang-hae-yo',
      zh: '我爱你',
      pos: '表达',
      example: { ko: '오빠 사랑해요!', zh: '哥我爱你！' },
      tip: '사랑하다(爱) → 해요体。粉丝对爱豆/情侣间/家人间都用',
      tier: 'ext',
    },
    {
      id: 'd23-v1-e8',
      korean: '대박',
      hangul: 'dae-bak',
      zh: '牛！好棒！（口语感叹）',
      pos: '感叹词',
      example: { ko: '와, 대박!', zh: '哇，牛！' },
      tip: '大发(大 hit)。年轻人口语最爱用的感叹词。震惊、赞叹、佩服都能用',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd23-v1-r1',
      korean: '생일카페',
      hangul: 'saeng-il-ka-pe',
      choices: [
        { zh: '爱豆生日应援咖啡馆', correct: true },
        { zh: '爱豆的家', correct: false },
        { zh: '爱豆开的店', correct: false },
        { zh: '爱豆生日晚会', correct: false },
      ],
    },
    {
      id: 'd23-v1-r2',
      korean: '응원',
      hangul: 'eung-won',
      choices: [
        { zh: '应援', correct: true },
        { zh: '演唱', correct: false },
        { zh: '出道', correct: false },
        { zh: '直播', correct: false },
      ],
    },
    {
      id: 'd23-v1-r3',
      korean: '굿즈',
      hangul: 'gut-jeu',
      choices: [
        { zh: '周边', correct: true },
        { zh: '票', correct: false },
        { zh: '海报', correct: false },
        { zh: '专辑', correct: false },
      ],
    },
    {
      id: 'd23-v1-r4',
      korean: '포토카드',
      hangul: 'po-to-ka-deu',
      choices: [
        { zh: '小卡', correct: true },
        { zh: '门票', correct: false },
        { zh: '签名照', correct: false },
        { zh: '手写信', correct: false },
      ],
    },
    {
      id: 'd23-v1-r5',
      korean: '노래',
      hangul: 'no-rae',
      choices: [
        { zh: '歌', correct: true },
        { zh: '舞', correct: false },
        { zh: '声音', correct: false },
        { zh: '乐器', correct: false },
      ],
    },
    {
      id: 'd23-v1-r6',
      korean: '멋있다',
      hangul: 'meo-sit-da',
      choices: [
        { zh: '帅 / 酷', correct: true },
        { zh: '好吃', correct: false },
        { zh: '有趣', correct: false },
        { zh: '安静', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd23-v1-s1',
      zhHint: '粉丝',
      answer: ['팬'],
      // 干扰："펜"（元音 ㅐ→ㅔ 差）；"판"（元音 ㅐ→ㅏ 差）；"뺀"（초성 ㅍ→ㅃ 差）
      syllables: ['팬', '펜', '판', '뺀'],
    },
    {
      id: 'd23-v1-s2',
      zhHint: '演唱会',
      answer: ['콘', '서', '트'],
      // 干扰："콘"（同）；"소"（元音 ㅓ→ㅗ 差）；"트"（同）；"드"（초성 ㅌ→ㄷ 差）
      syllables: ['콘', '서', '트', '소', '드'],
    },
    {
      id: 'd23-v1-s3',
      zhHint: '真的（口语）',
      answer: ['진', '짜'],
      // 干扰："정"（意思相近的 정말 一部分）；"자"（초성 ㅉ→ㅈ 差）
      syllables: ['진', '짜', '정', '자'],
    },
    {
      id: 'd23-v1-s4',
      zhHint: '牛！',
      answer: ['대', '박'],
      // 干扰："태"（초성 ㄷ→ㅌ 差）；"밖"（받침 ㄱ→ㄲ 差）
      syllables: ['대', '박', '태', '밖'],
    },
  ],

  write: [
    { id: 'd23-v1-w1', korean: '오', hangul: 'o',      wordKorean: '오빠',     wordZh: '哥' },
    { id: 'd23-v1-w2', korean: '언', hangul: 'eon',    wordKorean: '언니',     wordZh: '姐' },
    { id: 'd23-v1-w3', korean: '팬', hangul: 'paen',   wordKorean: '팬',       wordZh: '粉丝' },
    { id: 'd23-v1-w4', korean: '진', hangul: 'jin',    wordKorean: '진짜',     wordZh: '真的' },
    { id: 'd23-v1-w5', korean: '정', hangul: 'jeong',  wordKorean: '정말',     wordZh: '真的' },
    { id: 'd23-v1-w6', korean: '응', hangul: 'eung',   wordKorean: '응원',     wordZh: '应援' },
    { id: 'd23-v1-w7', korean: '노', hangul: 'no',     wordKorean: '노래',     wordZh: '歌' },
    { id: 'd23-v1-w8', korean: '멋', hangul: 'meot',   wordKorean: '멋있다',   wordZh: '帅' },
  ],

  dictation: [
    { id: 'd23-v1-d1', korean: '진짜',        hangul: 'jin-jja',        syllables: ['진', '짜'],           zh: '真的' },
    { id: 'd23-v1-d2', korean: '정말 좋아요', hangul: 'jeong-mal jo-a-yo', syllables: ['정', '말', '좋', '아', '요'], zh: '真的好' },
    { id: 'd23-v1-d3', korean: '사랑해요',    hangul: 'sa-rang-hae-yo', syllables: ['사', '랑', '해', '요'], zh: '我爱你' },
  ],
};
