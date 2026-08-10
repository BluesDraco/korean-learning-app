import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 3 · 仁爪机场 · 짐 vs 집 翻车 · Minji 登场
 *
 * 剧情：兔莉拖着爆炸的行李箱出仁爪机场，行李太重抬不动。
 * 她想请旁边等出租车的水獭姐姐帮忙抬「행李」（韩语是 짐 jim），
 * 结果说成了「집」（jip = 家），变成"我的家太重了"。
 * 水獭愣住了一秒，没笑，只是把行李帮她抬上了出租车。
 * 她叫 Minji。这是 Tori 在兽尔的第一个朋友。
 *
 * 学习目标：辅音 ㅂ/ㅈ 区别 / 짐 vs 집 / 道歉与回应
 * 韩语自审：korean skill PASS
 */
export const day3: ToriDay = {
  level: 'beginner',
  day: 3,
  phase: 'foundation',
  title: '仁爪机场 · 行李 vs 家 翻车', titleEn: 'Incheon Airport · luggage vs. house mix-up',
  subtitle: 'Minji水獭登场，行李vs家经典翻车', subtitleEn: 'Minji the otter appears, classic luggage vs. house mix-up',
  heroImageUrl: '/images/diary/day-03-hero.jpg',
  estimatedMin: 13,

  opening: {
    date: '9월 3일 · 인천공항',
    weather: '仁爪机场 · 多云', weatherEn: 'Incheon Airport · cloudy',
    toriPose: 'shy',
    diaryText: `9月 3日，仁爪机场出口。

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

我的"家"在兽尔的第一天，
就是被一个韩国朋友救场的。`,
  },

  words: [
    {
      id: 'd03-w1',
      korean: '짐',
      hangul: 'jim',
      zh: '行李', zhEn: 'luggage',
      pos: '名词', posEn: 'Noun',
      example: { ko: '짐이 무거워요.', zh: '行李很重。', zhEn: 'The luggage is heavy.' },
      tip: '注意是 ㅁ 收音（jim），不是 ㅂ 收音（jip = 집 是"家"）', tipEn: 'Note it ends with ㅁ (jim), not ㅂ (jip = 집 means "house")',
    },
    {
      id: 'd03-w2',
      korean: '집',
      hangul: 'jip',
      zh: '家', zhEn: 'house',
      pos: '名词', posEn: 'Noun',
      example: { ko: '집에 가요.', zh: '我回家。', zhEn: 'I go home.' },
      tip: '韩语初学者最容易和「짐」混的词。一个字母不同，意思天差地别', tipEn: 'The word Korean beginners most often confuse with 짐. One letter difference, totally different meaning.',
    },
    {
      id: 'd03-w3',
      korean: '무거워요',
      hangul: 'mu-geo-wo-yo',
      zh: '重', zhEn: 'heavy',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '가방이 너무 무거워요.', zh: '包太重了。', zhEn: 'The bag is too heavy.' },
      tip: '反义词「가벼워요」(轻)', tipEn: 'Antonym: 가벼워요 (light)',
    },
    {
      id: 'd03-w4',
      korean: '죄송해요',
      hangul: 'joe-song-hae-yo',
      zh: '对不起', zhEn: 'sorry',
      pos: '表达', posEn: 'Expression',
      example: { ko: '늦어서 죄송해요.', zh: '抱歉我迟到了。', zhEn: 'Sorry I\'m late.' },
      tip: '比「미안해요」更礼貌。对陌生人用「죄송」', tipEn: 'More polite than 미안해요. Use 죄송 with strangers.',
    },
    {
      id: 'd03-w5',
      korean: '괜찮아요',
      hangul: 'gwaen-cha-na-yo',
      zh: '没关系', zhEn: 'it\'s okay',
      pos: '表达', posEn: 'Expression',
      example: { ko: '괜찮아요, 천천히 하세요.', zh: '没关系，慢慢来。', zhEn: 'It\'s okay, take your time.' },
      tip: '韩国人说话最温柔的一句话。Minji 就是这样说的', tipEn: 'The gentlest phrase Koreans say. That\'s how Minji says it.',
    },
    {
      id: 'd03-w6',
      korean: '저기요',
      hangul: 'jeo-gi-yo',
      zh: '请问 / 不好意思', zhEn: 'Excuse me / Sorry',
      pos: '感叹词', posEn: 'Interjection',
      example: { ko: '저기요, 길 좀 물을게요.', zh: '不好意思，想问个路。', zhEn: 'Excuse me, I\'d like to ask for directions.' },
      tip: '叫陌生人最常用的开场白。比直接说「당신」（你）礼貌多了', tipEn: 'The most common way to address a stranger. Much more polite than directly saying \'당신\' (you).',
    },
  ],

  dialogue: {
    scene: '仁爪机场 · 出租车候车区', sceneEn: 'Incheon Airport · Taxi Stand',
    setting: {
      time: '落地 30 分钟后', timeEn: '30 minutes after landing',
      place: '机场出口', placeEn: 'Airport Exit',
      npc: 'Minji 水獭', npcEn: 'Minji the Otter',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '저기요...',
        hangul: 'jeo-gi-yo',
        zh: '不好意思…', zhEn: 'Excuse me...',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '제 집이 너무 무거워요.',
        hangul: 'je jip-i neo-mu mu-geo-wo-yo',
        zh: '我的「家」太重了。（兔莉说错了，本来想说"行李"）', zhEn: 'My \'home\' is too heavy. (Tori misspoke—she meant to say \'luggage\'.)',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '...집이요?',
        hangul: 'jip-i-yo',
        zh: '…家吗？', zhEn: '...Home?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '아, 죄송해요. 짐이요.',
        hangul: 'a, joe-song-hae-yo. jim-i-yo',
        zh: '啊，对不起。是行李。', zhEn: 'Oh, sorry. I meant luggage.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '짐하고 집… 발음이 너무 비슷해!',
        hangul: 'jim-ha-go jip… bal-eum-i neo-mu bi-seut-hae!',
        zh: '行李和家……发音太像了！', zhEn: 'Luggage and home... they sound so similar!',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Minji 把箱子抬起来后，兔莉应该说什么？', zhEn: 'After Minji lifts the suitcase, what should Tori say?',
        practice: 'pick',
        choices: [
          { ko: '정말 감사합니다.', zh: '真的非常感谢。', zhEn: 'Thank you so much.', correct: true },
          { ko: '죄송합니다, 무거워요.', zh: '对不起，很重。', zhEn: 'Sorry, it\'s heavy.', correct: false },
          { ko: '안녕히 가세요.', zh: '再见。', zhEn: 'Goodbye.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '韩文辅音 · ㅂ vs ㅈ 怎么分',
    pattern: 'ㅁ 받침 → 鼻音 m（짐 [jim]） / ㅂ 받침 → 闭唇 p（집 [jip]）',
    whenToUse: '辨认音节末尾的收音（받침），避免「짐（行李）/ 집（家）」这种只差一个收音的致命混淆。Day 3 机场丢行李场景的实战发音课。', whenToUseEn: 'Identify the batchim at the end of syllables to avoid fatal confusion like \'짐 (luggage) / 집 (home)\' which differ by just one batchim. A practical pronunciation lesson from the Day 3 airport luggage scene.',
    rules: [
      '**字形记忆**：ㅂ 像"日"字少一横，想象嘴巴抿紧发 b。ㅈ 像"人"字上加一横，想象舌尖顶上颚发 j',
      '**초성（音节开头）发音**：ㅂ = b/p（双唇碰一下），ㅈ = j（舌尖顶上齿龈）。짐(jim)=行李 vs 집(jip)=家，只差收尾音一个辅音',
      '**받침（音节末尾）变音规则**：ㅂ 做받침 → 不爆破，双唇闭合收 p 音（밥=[bap]，집=[jip]）。ㅁ 做받침 → 双唇闭合鼻腔出气 m 音（짐=[jim]，이름=[i-reum]）',
      '**연음（连音）现象**：받침 + 元音开头助词 → 辅音滑到下一音节。집이 → [지비]（ㅂ滑到이前），짐이 → [지미]（ㅁ滑到이前）',
      '**常见混淆对**：짐(行李)↔집(家) 差받침 ㅁ/ㅂ；밤(晚上)↔잠(睡觉)、방(房间)↔장(张) 差초성 ㅂ/ㅈ。多写多念，嘴形成肌肉记忆',
      '**送气音对比**：ㅂ(b) vs ㅍ(p,送气)，ㅈ(j) vs ㅊ(ch,送气)。送气=多一股气流。밥(饭) vs 팔(手臂)，잠(睡觉) vs 참(真的)',
      '**紧音对比**：ㅂ(b) vs ㅃ(pp,紧喉)，ㅈ(j) vs ㅉ(jj,紧喉)。紧音=喉咙绷紧不送气。발(脚) vs 빨리(快点)，자다(睡觉) vs 짜다(咸)',
      '**实战口诀**：짐은 무겁고, 집은 따뜻해（行李很重，家很暖和）— 两个词念十遍，ㅈ/ㅂ 一辈子分得清',
    ],
    examples: [
      { ko: '짐', zh: '行李', zhEn: 'luggage', highlight: 'ㅈ + ㅁ', note: '초성 ㅈ(j) + 받침 ㅁ(m)。연음: 짐이→[지미]。무거운 짐(重的行李)' },
      { ko: '집', zh: '家', zhEn: 'house', highlight: 'ㅈ + ㅂ', note: '초성 ㅈ(j) + 받침 ㅂ(p)。연음: 집이→[지비]。따뜻한 집(温暖的家)' },
      { ko: '밥', zh: '饭', zhEn: 'rice', highlight: 'ㅂ + ㅂ', note: '초성 ㅂ(b) + 받침 ㅂ(p)。밥 먹었어요?(吃饭了吗) 是最常见的问候' },
      { ko: '잡다', zh: '抓住', zhEn: 'To grab', highlight: 'ㅈ + ㅂ', note: '초성 ㅈ(j) + 받침 ㅂ(p)。잡아→[자바]（연음）。손을 잡다(牵手)' },
      { ko: '밤', zh: '晚上', zhEn: 'Night', highlight: 'ㅂ + ㅁ', note: '초성 ㅂ(b) + 받침 ㅁ(m)。대비 잠(睡觉): 초성만 ㅂ↔ㅈ 差一笔。밤에 자요(晚上睡觉)' },
      { ko: '잠', zh: '睡觉', zhEn: 'sleep', highlight: 'ㅈ + ㅁ', note: '초성 ㅈ(j) + 받침 ㅁ(m)。대비 밤(晚上): 받침都是 ㅁ，只有 초성 ㅂ↔ㅈ 不同。잠이 와요(困了)' },
    ],
    pitfall:
      '① 送气/紧音/松音是韩语发音三大维度——ㅂ/ㅍ/ㅃ 三个不同音，不能混。② 받침 ㅈ→t 的变化是规则性的，所有 ㅈ 做받침都一样。③ 书写时 ㅂ(两笔: 竖+横竖) vs ㅈ(两笔: 横+倒V)，笔顺不同。④ 多写：짐 집 밥 잡 各写 10 遍，7 天忘不掉。',
  },

  output: [
    {
      id: 'd03-o1',
      kind: 'compose',
      zhHint: '我的行李太重了。', zhHintEn: 'My luggage is too heavy.',
      tokens: ['제', '짐이', '너무', '무거워요', '집이', '가벼워요'],
      composeAnswer: ['제', '짐이', '너무', '무거워요'],
      successMsg: 'Minji 在副驾驶位回头笑了一下。第一个朋友，就这样有了。', successMsgEn: 'Minji turned back from the passenger seat and smiled. Just like that, I had my first friend.',
    },
    {
      id: 'd03-o2',
      kind: 'listen-choice',
      audioKo: '집이 어디예요?',
      successMsg: '✓ 「집」(jip) 是「家」。注意 ㅂ 收音，跟「짐」(jim) 的 ㅁ 完全不同。', successMsgEn: '✓ 집 (jip) means \'house\'. Note the ㅂ final, completely different from 짐 (jim)\'s ㅁ.',
      choices: [
        { zh: '你家在哪里？', zhEn: 'Where is your house?', correct: true },
        { zh: '行李在哪里？', zhEn: 'Where is the luggage?', correct: false },
        { zh: '你叫什么名字？', zhEn: 'What\'s your name?', correct: false },
        { zh: '今天怎么样？', zhEn: 'How is today?', correct: false },
      ],
    },
    {
      id: 'd03-o3',
      kind: 'zh-to-ko',
      zhPrompt: '不好意思，行李很重。', zhPromptEn: 'Excuse me, the luggage is heavy.',
      successMsg: '"저기요" 是叫陌生人的标准开场；「짐」(行李) 用「이」因为「짐」有收音(받침) ㅁ。', successMsgEn: '\'저기요\' is the standard way to call a stranger; 짐 (luggage) takes \'이\' because 짐 has a final consonant (받침) ㅁ.',
      choices: [
        { ko: '저기요, 짐이 무거워요.', correct: true },
        { ko: '저기요, 집이 무거워요.', correct: false },
        { ko: '저기요, 짐을 무거워요.', correct: false },
        { ko: '죄송해요, 짐이 가벼워요.', correct: false },
      ],
    },
    {
      id: 'd03-o4',
      kind: 'particle-error',
      zhHint: '我的行李太重了。', zhHintEn: 'My luggage is too heavy.',
      successMsg: '「짐」末字「짐」有收音(받침) ㅁ → 主语助词用「이」。「제」是「我的」固定形态。', successMsgEn: 'The last syllable of 짐 has a final consonant (받침) ㅁ → so the subject particle is \'이\'. \'제\' is the fixed form for \'my\'.',
      choices: [
        { ko: '제 짐이 너무 무거워요.', correct: true },
        { ko: '제 짐가 너무 무거워요.', correct: false },
        { ko: '저 짐이 너무 무거워요.', correct: false },
        { ko: '제의 짐이 너무 무거워요.', correct: false },
      ],
    },
    {
      id: 'd03-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 3 核心词全部对上。Minji 把行李抬上了出租车，兔莉终于喘了口气。', successMsgEn: '✓ All Day 3 core words matched. Minji loaded the luggage into the taxi, and Tori finally caught her breath.',
      pairs: [
        { ko: '짐', zh: '行李', zhEn: 'luggage' },
        { ko: '집', zh: '家', zhEn: 'house' },
        { ko: '무거워요', zh: '重', zhEn: 'heavy' },
        { ko: '죄송해요', zh: '对不起', zhEn: 'sorry' },
        { ko: '괜찮아요', zh: '没关系', zhEn: 'it\'s okay' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '第一个翻车不要紧。重要的是你后面说对了。토리, 잘했어요!', praiseEn: 'It\'s okay to mess up the first one. What matters is you got it right after. Tori, well done!',
    preview: '明天到韩光宿舍报到。浣熊宿管阿姨说话好快，我能听懂吗？', previewEn: 'Tomorrow I report to Hangwang Dorm. The raccoon dorm manager speaks so fast—will I understand?',
    stickerId: 'sticker-d03',
    sceneImageUrl: '/images/diary/day-03-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「짐和집怎么区分发音」「韩语字母 ㅂ和ㅈ的写法」「叫陌生人用什么词」',
};
