import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 67 · 육식자 구역 미아 · 害怕
 *
 * 剧情：Tori在猎食者街区迷路了。天黑，路灯暗，周围动物都很大。她第一次在兽尔感到
 * 真正的害怕——不是语言不通，是体型差距带来的本能恐惧。她打电话给Haru，声音在抖。
 * Haru说"움직이지 마. 내가 갈게."
 *
 * 学习目标：긴급 상황 표현 / ~고 있어(진행형 강조) / 두려움 어휘
 * 语料层级：해요体 + 반말 (전화)
 */
export const day67: ToriDay = {
  level: 'advanced',
  day: 7,
  phase: 'mastery',
  title: '大型动物区迷路 · 害怕', titleEn: 'Lost in the big animal zone · scared',
  subtitle: '"움직이지 마. 내가 갈게." — Haru的一句让呼吸慢下来', subtitleEn: '"움직이지 마. 내가 갈게." — Haru\'s words slowed the breathing.',
  heroImageUrl: '/images/diary/day-67-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 23일 · 토요일 밤',
    weather: '兽尔 · 밤 · 흐림', weatherEn: 'Beast district · night · cloudy',
    toriPose: 'shy',
    diaryText: `11月23日，同一天，晚上 8 点。

从 Day 66 那家狮子超市出来，我没有直接回家，又在附近的巷子里绕了几条——气还没消。

等我回过神来，已经不知道自己在哪条巷子里了。

一盏路灯闪了闪，灭了。对面走过一个高大的影子，像是熊，又像别的什么大型动物，看不清。

我看了眼手机：晚上 8 点 15 分。地图 App 上写着"正在获取当前位置……信号弱"。电量 18%。

——和 Day 7 一模一样。不，更糟。那时候我害怕的是语言。现在我害怕的是体型——从我身边经过的一个影子，是我的三倍大。

呼吸变浅，心跳声在耳朵里回响。我把胡萝卜笔从包里摸出来，紧紧握在手心，用手指摩挲上面的"용기"两个字。

拨了 Haru 的电话。

"...하루야, 나 길 잃었어. 북구인데… 어디인지 모르겠어."
（Haru，我迷路了。在北区……不知道是哪里。）

"토리? 어디쯤? 사진 하나만 찍어서 보내."
（兔莉？大概在哪一带？拍张照发给我。）

我的声音在抖。"…太暗了，拍不出来。"

Haru 沉默了一秒。然后说：

"움직이지 마. 지금 위치 켜놔. 내가 지금 나갈게. 30분 안에 도착해."
（别动。打开定位。我这就出门，三十分钟到。）

挂了电话，我把背贴到暗巷的墙上。慢慢数了三次呼吸。

——Haru 来了。——Haru 来了。

我攥着那支胡萝卜笔，等着她来。`,
  },

  words: [
    {
      id: 'd67-w1',
      korean: '길을 잃다',
      hangul: 'gi-reul il-ta',
      zh: '迷路', zhEn: 'Lost',
      pos: '表达', posEn: 'Expression',
      example: { ko: '길을 잃었어요.', zh: '迷路了。', zhEn: 'I\'m lost.' },
      tip: '길(路) + 잃다(丢失). 관용 표현', tipEn: '길(road) + 잃다(lose). Idiomatic expression.',
    },
    {
      id: 'd67-w2',
      korean: '두렵다',
      hangul: 'du-ryeop-da',
      zh: '害怕', zhEn: 'be scared',
      pos: '形容词', posEn: 'Adjective.',
      example: { ko: '이번엔 진짜 두려웠어요.', zh: '这次真的害怕。', zhEn: 'I\'m really scared this time.' },
      tip: 'Day 58 学过. ㅂ 불규칙: 두렵다 → 두려워요', tipEn: 'Day 58 learned. ㅂ irregular: 두렵다 → 두려워요',
    },
    {
      id: 'd67-w3',
      korean: '그림자',
      hangul: 'geu-rim-ja',
      zh: '影子', zhEn: 'shadow',
      pos: '名词', posEn: 'Noun',
      example: { ko: '큰 그림자가 지나갔어요.', zh: '大影子经过。', zhEn: 'A big shadow passed by.' },
      tip: '그리다(画) + 자. 두려움의 이미지', tipEn: '그리다(draw) + 자. Image of fear.',
    },
    {
      id: 'd67-w4',
      korean: '심장',
      hangul: 'sim-jang',
      zh: '心脏', zhEn: 'heart',
      pos: '名词', posEn: 'Noun',
      example: { ko: '심장 소리가 들려요.', zh: '听得到心跳。', zhEn: 'I can hear my heartbeat.' },
      tip: '心(심) + 脏(장). 심장 소리 = 心跳', tipEn: '心(심) + 脏(장). 심장 소리 = heartbeat',
    },
    {
      id: 'd67-w5',
      korean: '움직이다',
      hangul: 'um-ji-gi-da',
      zh: '动/移动', zhEn: 'move',
      pos: '动词', posEn: 'Verb',
      example: { ko: '움직이지 마.', zh: '别动。', zhEn: 'Don\'t move.' },
      tip: '움직이다 → 움직여요. 긴급 상황에 자주 씀',
    },
    {
      id: 'd67-w6',
      korean: '위치',
      hangul: 'wi-chi',
      zh: '位置', zhEn: 'location',
      pos: '名词', posEn: 'Noun',
      example: { ko: '위치 켜놔.', zh: '把位置(共享)开着。', zhEn: 'Keep location (sharing) on.' },
      tip: '位(위) + 置(치). 위치 공유 = 位置共享', tipEn: '位(위) + 置(치). 위치 공유 = location sharing',
    },
  ],

  dialogue: {
    scene: '북구 어두운 골목·Haru한테 전화',
    setting: {
      time: '周六 20:15', timeEn: 'Saturday 20:15',
      place: '북구 이름 모르는 골목',
      npc: 'Haru (전화)',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '하루야, 나 길 잃었어. 북구인데 어디인지 모르겠어.',
        hangul: 'ha-ru-ya, na gi-reul i-reo-sseo. buk-gu-in-de eo-di-in-ji mo-reu-ge-sseo',
        zh: 'Haru，我迷路了。在北区，不知道哪儿。', zhEn: 'Haru, I\'m lost. In the north district, not sure where.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '토리? 어디쯤? 사진 하나만 찍어서 보내.',
        hangul: 'to-ri? eo-di-jjeum? sa-jin ha-na-man jji-geo-seo bo-nae',
        zh: '兔莉？在哪儿？拍张照发我。', zhEn: 'Tori? Where are you? Send me a photo.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '너무 어두워서 안 찍혀.',
        hangul: 'neo-mu eo-du-wo-seo an jji-kyeo',
        zh: '太暗了，拍不出来。', zhEn: 'It\'s too dark, can\'t take a photo.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '움직이지 마. 지금 위치 켜놔. 내가 지금 나갈게.',
        hangul: 'um-ji-gi-ji ma. ji-geum wi-chi kyeo-nwa. nae-ga ji-geum na-gal-ge',
        zh: '别动。把定位开着。我现在出门。', zhEn: 'Don\'t move. Keep your location on. I\'m heading out now.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '심장 소리가 귀 안에서 들려. 근데 하루가 온다.',
        hangul: 'sim-jang so-ri-ga gwi a-ne-seo deul-lyeo. geun-de ha-ru-ga on-da',
        zh: '心跳在耳朵里响。但Haru要来了。', zhEn: 'My heartbeat is ringing in my ears. But Haru is coming.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '전화 끊기 전에 Tori想让Haru放心自己会等。合适的一句？', zhEn: 'Before hanging up, Tori wants to reassure Haru she\'ll wait. Which is appropriate?',
        practice: 'pick',
        choices: [
          { ko: '알겠어. 여기서 안 움직이고 기다릴게.', zh: '好。就在这儿不动等你。', zhEn: 'Okay. I\'ll stay right here and wait for you.', correct: true },
          { ko: '아니야, 나 혼자 갈 수 있어.', zh: '不用，我自己能走。', zhEn: 'No need, I can walk by myself.', correct: false },
          { ko: '경찰 부를게.', zh: '我叫警察。', zhEn: 'I\'ll call the police.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '别动/别做___：~지 마 (Day 65 심화) + 진행 강조 ~고 있어', titleEn: 'Don\'t move/don\'t do ___ : ~지 마 (Day 65 advanced) + ongoing emphasis ~고 있어',
    pattern: 'V + **지 마** · **~고 있어(요)**',
    whenToUse: 'Day 65 学过 ~지 마세요 (禁止). Day 67 = **긴급 상황의 반말**. Haru 说 「움직이**지 마**. 내가 지금 나**갈게**」= 别动。我现在出门。긴급/근심할 때 반말 + ~지 마 + ~(으)ㄹ게 三件套。전화/문자/응급 상황 필수 조합.', whenToUseEn: 'Day 65 learned ~지 마세요 (prohibition). Day 67 = **casual speech in emergencies**. Haru says 「움직이**지 마**. 내가 지금 나**갈게**」= Don\'t move. I\'m heading out now. In urgent/worried situations, the trio: casual speech + ~지 마 + ~(으)ㄹ게. Essential combo for calls/texts/emergencies.',
    rules: [
      '**~지 마 (반말 禁止)**：움직이지 마 / 울지 마 / 걱정하지 마. Day 65 복습',
      '**~고 있어 (반말 진행)**：Day 16·33 배운 ~고 있어요의 반말. 위치 켜놓고 있어',
      '**~(으)ㄹ게 (반말 약속)**：Day 53 복습. 내가 갈게 = 我去',
      '**긴급 반말 3종**: ~지 마 (禁) + ~아/어 (명령) + ~(으)ㄹ게 (약속) = 응급 대화 프레임'
    ],
    examples: [
      { ko: '움직이지 마. 내가 갈게.', zh: '别动。我去。', zhEn: 'Don\'t move. I\'ll go.', highlight: '움직이지 마 ... 갈게', note: 'Haru 원문. ~지 마 + ~(으)ㄹ게. 응급 프레임' },
      { ko: '지금 위치 켜놔.', zh: '现在把定位开着。', zhEn: 'Keep your location on now.', highlight: '켜놔', note: '켜다 + 놓다 → 켜놔 (반말 명령). ~아/어 놓다 = 保持状态', noteEn: '켜다 + 놓다 → 켜놔 (casual command). ~아/어 놓다 = keep something in a state' },
      { ko: '걱정하지 마, 다 잘 될 거야.', zh: '别担心，都会好的。', zhEn: 'Don\'t worry, it\'ll all be fine.', highlight: '걱정하지 마', note: '걱정하다 → 걱정하지 마. 위로 반말 정석' },
      { ko: '기다리고 있어. 곧 갈게.', zh: '在等着。马上到。', zhEn: 'I\'m waiting. I\'ll be there soon.', highlight: '기다리고 있어 ... 갈게', note: '기다리다 → 기다리고 있어 (반말 진행) + 갈게 (약속)' },
    ],
    pitfall:
      '① 긴급 상황에서 반말 3종 조합 = Haru가 오늘 Tori에게 준 안심 프레임. 敬语보다 빠르고 직접적. ② **~지 마** = 반말, 长辈에게는 **~지 마세요**. Haru → Tori 는 친구 반말 관계. ③ **~아/어 놓다** vs **~아/어 두다** — 둘 다 保持 상태. 위치 켜놔 (지금 켜서 유지) / 위치 켜둬 (미리 켜두다) 뉘앙스 차이. 오늘은 켜놔가 자연.',
  },

  output: [
    {
      id: 'd67-o1',
      kind: 'compose',
      zhHint: '别动。我现在出门。', zhHintEn: 'Don\'t move. I\'m heading out now.',
      tokens: ['움직이지 마', '내가', '지금 나갈게', '기다릴게', '움직여', '움직이지 마세요'],
      composeAnswer: ['움직이지 마', '내가', '지금 나갈게'],
      successMsg: 'Haru 응급 프레임. Day 7의 재현.',
    },
    {
      id: 'd67-o2',
      kind: 'listen-choice',
      audioKo: '너무 어두워서 안 찍혀.',
      successMsg: '✓ ~아/어서 이유 + 안 찍히다 (자동사 부정).',
      choices: [
        { zh: '太暗了，拍不出来。', zhEn: 'It\'s too dark, can\'t take a photo.', correct: true },
        { zh: '不想拍。', zhEn: 'I don\'t want to take it.', correct: false },
        { zh: '太亮拍不出。', zhEn: 'It\'s too bright to get a good shot.', correct: false },
        { zh: '照片拍好了。', zhEn: 'The photo\'s taken.', correct: false },
      ],
    },
    {
      id: 'd67-o3',
      kind: 'zh-to-ko',
      zhPrompt: '别担心，都会好的。', zhPromptEn: 'Don\'t worry, it\'ll all be fine.',
      successMsg: '"걱정하지 마, 다 잘 될 거야." — ~지 마 + ~(으)ㄹ 거야.',
      choices: [
        { ko: '걱정하지 마, 다 잘 될 거야.', correct: true },
        { ko: '걱정하지 않아, 다 잘 될 거야.', correct: false },
        { ko: '걱정하지 마세요, 다 잘 될 거야.', correct: false },
        { ko: '걱정 마고, 다 잘 될 거야.', correct: false },
      ],
    },
    {
      id: 'd67-o4',
      kind: 'particle-error',
      zhHint: '现在把定位开着。', zhHintEn: 'Keep your location on now.',
      successMsg: '켜다 + 놓다 → **켜놔** (반말). ~아/어 놓다 = 保持状态.', successMsgEn: '켜다 + 놓다 → **켜놔** (casual). ~아/어 놓다 = keep something in a state.',
      choices: [
        { ko: '지금 위치 켜놔.', correct: true },
        { ko: '지금 위치 켜.', correct: false },
        { ko: '지금 위치 켜놓세요.', correct: false },
        { ko: '지금 위치 켰어.', correct: false },
      ],
    },
    {
      id: 'd67-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 67 全对. 벽에 등 붙이고, 하루를 기다렸어요.', successMsgEn: '✓ Day 67 all correct. I pressed my back against the wall and waited a day.',
      pairs: [
        { ko: '길을 잃다', zh: '迷路', zhEn: 'Lost' },
        { ko: '두렵다', zh: '害怕', zhEn: 'be scared' },
        { ko: '그림자', zh: '影子', zhEn: 'shadow' },
        { ko: '움직이다', zh: '动', zhEn: 'move' },
        { ko: '위치', zh: '位置', zhEn: 'location' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '30분 뒤 하루가 왔어요. 두려웠지만 도움 요청할 수 있게 됐어요.',
    preview: '明天 Tori 회복 후 다시 사자 마트로 돌아가 이야기를 마무리한다.', previewEn: 'Tomorrow, after Tori recovers, we\'ll go back to Saja Mart to wrap up the story.',
    stickerId: 'sticker-d67',
    sceneImageUrl: '/images/diary/day-67-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「긴급 상황 어떻게 도움 요청?」「~아/어 놓다 和 ~아/어 두다 有什么区别？」', carrotHintEn: 'Today\'s carrots: 「How to ask for help in an emergency?」「What\'s the difference between ~아/어 놓다 and ~아/어 두다?」',
};
