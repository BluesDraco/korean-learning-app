import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 3 · 仁川机场 · 짐 vs 집 翻车 · Minji 登场
 *
 * 剧情：兔莉拖着爆炸的行李箱出仁川机场，行李太重抬不动。
 * 她想请旁边等出租车的水獭姐姐帮忙抬「행李」（韩语是 짐 jim），
 * 结果说成了「집」（jip = 家），变成"我的家太重了"。
 * 水獭愣住了一秒，没笑，只是把行李帮她抬上了出租车。
 * 她叫 Minji。这是 Tori 在首尔的第一个朋友。
 *
 * 学习目标：辅音 ㅂ/ㅈ 区别 / 짐 vs 집 / 道歉与回应
 * 韩语自审：korean skill PASS
 */
export const day3: ToriDay = {
  day: 3,
  phase: 'foundation',
  title: '仁川机场 · 짐 vs 집 翻车',
  subtitle: '把"行李"说成了"家"',
  isCheckpoint: null,
  estimatedMin: 13,

  opening: {
    date: '9月 3日 인천공항',
    weather: '韩国 仁川 · 多云',
    toriPose: 'shy',
    diaryText: `9月 3日，仁川机场出口。

行李箱在落地传送带上转了三圈，
我才认出那个被妈妈贴满胡萝卜贴纸的粉色箱子。
它真的，比出发前更重了。

出租车候车区，我用尽全身力气拖它。
旁边站着一只水獭姐姐，看起来很温柔。
我鼓起勇气走过去：

"저기요, 제 ___ 너무 무거워요..."（我的___太重了）

我本来想说"짐"（行李）。
但紧张过头，嘴巴抢先说出了"집"（家）。
水獭愣了一秒。

然后她没笑，只是走过来帮我把箱子抬上了出租车。
她说她叫 Minji。她加了我的微信。

我的"家"在首尔的第一天，
就是被一个韩国朋友救场的。`,
  },

  words: [
    {
      id: 'd03-w1',
      korean: '짐',
      hangul: 'jim',
      zh: '行李',
      pos: '名词',
      example: { ko: '짐이 무거워요.', zh: '行李很重。' },
      tip: '注意是 ㅈ（j）开头，不是 ㅂ（j i p = 집 是"家"）',
    },
    {
      id: 'd03-w2',
      korean: '집',
      hangul: 'jip',
      zh: '家',
      pos: '名词',
      example: { ko: '집에 가요.', zh: '我回家。' },
      tip: '韩语初学者最容易和「짐」混的词。一个字母不同，意思天差地别',
    },
    {
      id: 'd03-w3',
      korean: '무거워요',
      hangul: 'mu-geo-wo-yo',
      zh: '重',
      pos: '形容词',
      example: { ko: '가방이 너무 무거워요.', zh: '包太重了。' },
      tip: '反义词「가벼워요」(轻)',
    },
    {
      id: 'd03-w4',
      korean: '죄송해요',
      hangul: 'joe-song-hae-yo',
      zh: '对不起',
      pos: '表达',
      example: { ko: '늦어서 죄송해요.', zh: '抱歉我迟到了。' },
      tip: '比「미안해요」更礼貌。对陌生人用「죄송」',
    },
    {
      id: 'd03-w5',
      korean: '괜찮아요',
      hangul: 'gwaen-cha-na-yo',
      zh: '没关系',
      pos: '表达',
      example: { ko: '괜찮아요, 천천히 하세요.', zh: '没关系，慢慢来。' },
      tip: '韩国人说话最温柔的一句话。Minji 就是这样说的',
    },
    {
      id: 'd03-w6',
      korean: '저기요',
      hangul: 'jeo-gi-yo',
      zh: '请问 / 不好意思',
      pos: '感叹词',
      example: { ko: '저기요, 길 좀 물을게요.', zh: '不好意思，想问个路。' },
      tip: '叫陌生人最常用的开场白。比直接说「당신」（你）礼貌多了',
    },
  ],

  dialogue: {
    scene: '仁川机场 · 出租车候车区',
    setting: {
      time: '落地 30 分钟后',
      place: '机场出口',
      npc: 'Minji 水獭',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '저기요...',
        hangul: 'jeo-gi-yo',
        zh: '不好意思…',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '제 집이 너무 무거워요.',
        hangul: 'je jip-i neo-mu mu-geo-wo-yo',
        zh: '我的「家」太重了。（兔莉说错了，本来想说"行李"）',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '...집이요?',
        hangul: 'jip-i-yo',
        zh: '…家吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '아, 죄송해요. 짐이요.',
        hangul: 'a, joe-song-hae-yo. jim-i-yo',
        zh: '啊，对不起。是行李。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Minji 把箱子抬起来后，兔莉应该说什么？',
        practice: 'pick',
        choices: [
          { ko: '정말 감사합니다.', zh: '真的非常感谢。', correct: true },
          { ko: '괜찮아요.', zh: '没关系。', correct: false },
          { ko: '안녕히 가세요.', zh: '再见。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '韩文辅音 · ㅂ vs ㅈ 怎么分',
    pattern: 'ㅂ → b/p · ㅈ → j',
    whenToUse: '辨认音节开头辅音，避免「짐 / 집」「밥 / 잡」这种致命混淆。',
    rules: [
      'ㅂ 长得像「日」少一横，发**b/p**音：밥（饭）/ 비（雨）',
      'ㅈ 长得像「ㅅ」加一笔，发**j**音：집（家）/ 자다（睡觉）',
      '받침（音节末辅音）位置时：ㅂ → **p** 音，ㅈ → **t** 音（如「잡」「잦」）',
    ],
    examples: [
      { ko: '짐 (jim)', zh: '行李', highlight: '짐' },
      { ko: '집 (jip)', zh: '家', highlight: '집' },
      { ko: '밥 (bap)', zh: '饭' },
      { ko: '잡다 (jap-da)', zh: '抓住' },
    ],
    pitfall:
      '只差一笔的辅音对初学者最危险：ㄱ/ㅋ（g/k）、ㄷ/ㅌ（d/t）、ㅂ/ㅍ（b/p）。多写几遍，把「짐 / 집」反复念出声，自然就分得清。',
  },

  output: [
    {
      id: 'd03-o1',
      kind: 'fill',
      prompt: '제 ___ 너무 무거워요.',
      zhHint: '我的行李太重了。',
      answer: '짐이',
      successMsg: 'Minji 在副驾驶位回头笑了一下。第一个朋友，就这样有了。',
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '第一个翻车不要紧。重要的是你后面说对了。토리, 잘했어요!',
    preview: '明天到한빛宿舍报到。浣熊宿管阿姨说话好快，我能听懂吗？',
    stickerId: 'sticker-d03',
  },

  carrotHint:
    '今天的胡萝卜：「짐和집怎么区分发音」「韩语字母 ㅂ和ㅈ的写法」「叫陌生人用什么词」',
};
