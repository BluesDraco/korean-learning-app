import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 36 · 엄마의 소포 · 火锅底料
 *
 * 剧情：Tori收到妈妈从中国寄来的包裹，火锅底料+干辣椒+一封信。信里妈妈写"想家的时候就煮一锅"。
 * Tori抱着火锅底料哭了。Haru敲门问她是不是在哭，Tori说没有，这是在笑。
 *
 * 学习目标：~아/어 주다 敬语过去时 / 소포·택배 어휘
 * 语料层级：해요体 + 敬语 주셨어요
 * 韩语自审：korean skill PASS
 */
export const day36: ToriDay = {
  level: 'intermediate',
  day: 6,
  phase: 'expansion',
  title: '收到包裹 · 妈妈寄来火锅底料', titleEn: 'Package received · Mom sent hotpot base',
  subtitle: '"想家的时候就煮一锅"', subtitleEn: '"When you miss home, cook a pot"',
  heroImageUrl: '/images/diary/day-36-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 9일 · 수요일 오후',
    weather: '兽尔 · 阴', weatherEn: 'Soo-ah · Yin',
    toriPose: 'shy',
    diaryText: `10月9日，周三下午。

宿舍门口贴了张纸条——
"301호 소포 있어요. 경비실에서 찾아가세요."
（301号有包裹，请到值班室领取。）

我下楼，浣熊阿姨从柜子后面搬出一个箱子。
上面写着中文：中国→韩国·易碎小心。

"엄마가 보내주셨어요!"（妈妈寄来的！）

回房间打开——
火锅底料两袋、干辣椒一大包、
花椒、香菜种子、一封手写的信。

信只有三行：

"闺女，
想家的时候就煮一锅。
辣一点没关系，妈妈的味道就在里面。"

我抱着那袋红彤彤的火锅底料，
坐在地板上，哭了。

Haru敲门："토리, 우는 거야?"
（兔莉，你在哭吗？）

我擦掉眼泪，打开门笑着说：
"아니야, 웃는 거야."
（没有，我在笑。）

Haru看看我，看看地板上的火锅底料，
然后什么都没问，坐下来跟我一起看那三行信。`,
  },

  words: [
    {
      id: 'd36-w1',
      korean: '소포',
      hangul: 'so-po',
      zh: '包裹', zhEn: 'package / parcel',
      pos: '名词', posEn: 'Noun',
      example: { ko: '엄마가 소포를 보냈어요.', zh: '妈妈寄了包裹。', zhEn: 'Mom sent a package.' },
      tip: '小(소) + 包(포)。汉字词。택배 = 快递（国内更常用）', tipEn: '소 (small) + 포 (bundle). Sino-Korean word. 택배 = express delivery (more common domestically)',
    },
    {
      id: 'd36-w2',
      korean: '보내다',
      hangul: 'bo-nae-da',
      zh: '寄/送', zhEn: 'to send / to ship',
      pos: '动词', posEn: 'Verb',
      example: { ko: '엄마가 편지를 보내주셨어요.', zh: '妈妈给我寄了信。', zhEn: 'Mom sent me a letter.' },
      tip: '보내다(寄) → 보내요 / 보냈어요 / 보내주다(为我寄)', tipEn: '보내다 (to send) → 보내요 / 보냈어요 / 보내주다 (to send for me)',
    },
    {
      id: 'd36-w3',
      korean: '경비실',
      hangul: 'gyeong-bi-sil',
      zh: '值班室/保安室', zhEn: 'Duty room / Security office',
      pos: '名词', posEn: 'Noun',
      example: { ko: '경비실에서 소포를 찾았어요.', zh: '在值班室拿到了包裹。', zhEn: 'I picked up the package at the security office.' },
      tip: '警备(경비) + 室(실)。宿舍/公寓一楼收快递的地方', tipEn: '경비 (security) + 실 (room). The place on the first floor of a dormitory/apartment where packages are received.',
    },
    {
      id: 'd36-w4',
      korean: '고춧가루',
      hangul: 'go-chut-ga-ru',
      zh: '辣椒粉', zhEn: 'chili powder',
      pos: '名词', posEn: 'Noun',
      example: { ko: '엄마가 고춧가루도 보냈어요.', zh: '妈妈还寄了辣椒粉。', zhEn: 'Mom also sent chili powder.' },
      tip: '고추(辣椒) + 가루(粉)。韩国厨房必备', tipEn: '고추 (chili) + 가루 (powder). A must-have in Korean kitchens.',
    },
    {
      id: 'd36-w5',
      korean: '눈물이 나다',
      hangul: 'nun-mu-ri na-da',
      zh: '流眼泪', zhEn: 'Tears streaming down',
      pos: '表达', posEn: 'Expression',
      example: { ko: '갑자기 눈물이 났어요.', zh: '突然流眼泪了。', zhEn: 'Suddenly tears came.' },
      tip: '눈물(眼泪) + 나다(出现) = 流泪。主语用 이/가', tipEn: '눈물(tears) + 나다(appear) = to cry. Subject uses 이/가.',
    },
    {
      id: 'd36-w6',
      korean: '그리워하다',
      hangul: 'geu-ri-wo-ha-da',
      zh: '想念/思念', zhEn: 'to miss / longing',
      pos: '动词', posEn: 'Verb',
      example: { ko: '엄마를 그리워하고 있어요.', zh: '想念着妈妈。', zhEn: 'I miss my mom.' },
      tip: '比 보고 싶다 更深沉。多用于长期分离的情感', tipEn: 'Deeper than 보고 싶다. Used for long-term separation.',
    },
  ],

  dialogue: {
    scene: '301号房门口·包裹', sceneEn: 'In front of Room 301 · Package',
    setting: {
      time: '周三下午', timeEn: 'Wednesday afternoon',
      place: '韩光宿舍301', placeEn: 'Hangwang Dorm 301',
      npc: '浣熊阿姨 / Haru', npcEn: 'Auntie Raccoon / Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '浣熊阿姨', npcNameEn: 'Auntie Raccoon',
        ko: '301호, 중국에서 소포 왔어요.',
        hangul: 'sam-baek-il-ho, jung-gu-ge-seo so-po wa-sseo-yo',
        zh: '301号，中国来的包裹到了。', zhEn: 'Room 301, a package from China has arrived.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '아, 엄마가 보내주셨어요! 감사합니다.',
        hangul: 'a, eom-ma-ga bo-nae-ju-syeo-sseo-yo! gam-sa-ham-ni-da',
        zh: '啊，是妈妈寄来的！谢谢您。', zhEn: 'Oh, it\'s from Mom! Thank you.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '고춧가루랑 훠궈 재료… 엄마가 다 챙겨주셨네.',
        hangul: 'go-chut-ga-ru-rang hwo-gwo jae-ryo… eom-ma-ga da chaeng-gyeo-ju-syeon-ne',
        zh: '辣椒粉、火锅底料……妈妈全都装进去了呢。', zhEn: 'Chili powder, hotpot base... Mom packed everything in.',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '토리, 우는 거야?',
        hangul: 'to-ri, u-neun geo-ya?',
        zh: '兔莉，你在哭吗？', zhEn: 'Tori, are you crying?',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '아니야, 웃는 거야.',
        hangul: 'a-ni-ya, un-neun geo-ya',
        zh: '没有，我在笑。', zhEn: 'No, I\'m smiling.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru看着地板上的火锅底料。Tori想告诉Haru"这是妈妈寄来的"。合适的一句？', zhEn: 'Haru looks at the hotpot base on the floor. Tori wants to tell Haru, "This is from my mom." Which is the right sentence?',
        practice: 'pick',
        choices: [
          { ko: '엄마가 중국에서 보내주셨어.', zh: '妈妈从中国寄来的。', zhEn: 'My mom sent it from China.', correct: true },
          { ko: '엄마가 여기 왔어.', zh: '妈妈来这里了。', zhEn: 'My mom came here.', correct: false },
          { ko: '내가 엄마한테 보냈어.', zh: '我寄给妈妈了。', zhEn: 'I sent it to my mom.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '为我做了___：~아/어 주셨어요', titleEn: 'Did ___ for me: ~아/어 주셨어요',
    pattern: 'V 어간 + **아/어 주셨어요** (敬语过去时)', patternEn: 'V stem + **아/어 주셨어요** (honorific past tense)',
    whenToUse: '「(长辈) 为我做了___」的过去时敬语。妈妈给我寄包裹 = 엄마가 보내**주셨어요**。~아/어 주다(为我做) + ~시(敬语) + ~었(过去) = 아/어 주셨어요。写家书、说长辈善意时用这一个句型就够。', whenToUseEn: 'Honorific past tense for "(elder) did ___ for me." Mom sent me a package = 엄마가 보내**주셨어요**. ~아/어 주다 (do for me) + ~시 (honorific) + ~었 (past) = 아/어 주셨어요. Use this one pattern when writing letters home or talking about elders\' kindness.',
    rules: [
      '**基本公式**：V + 아/어 주다 → 别人为我做。加敬语 시 → 아/어 주시다。过去时 → 아/어 주셨어요',
      '**层级差**：보내요(我寄) / 보내줘요(为我寄) / 보내주세요(请为我寄) / 보내주셨어요(长辈为我寄了) — 4 个层级递进',
      '**주다 vs 드리다**：주다 = 别人给我；드리다 = 我给长辈。엄마가 소포를 보내주셨어요（妈妈寄给我） vs 엄마한테 소포를 보내드렸어요（我寄给妈妈）',
      '**朋友版 → ~아/어 줬어**：반말过去时。엄마가 보내줬어（妈妈寄的）— 只用于同辈/晚辈，绝不对长辈用'
    ],
    examples: [
      { ko: '엄마가 소포를 보내주셨어요.', zh: '妈妈给我寄了包裹。', zhEn: 'Mom sent me a package.', highlight: '보내주셨어요', note: '보내다 + 주시다 + 었어요 = 妈妈(敬语)为我做的过去时。核心句型', noteEn: '보내다 + 주시다 + 었어요 = past tense of what Mom (honorific) did for me. Core pattern.' },
      { ko: '엄마가 편지도 써주셨어요.', zh: '妈妈还给我写了信。', zhEn: 'Mom also wrote me a letter.', highlight: '써주셨어요', note: '쓰다 → 써 + 주셨어요。ㅡ 脱落变为 어。妈妈手写信', noteEn: '쓰다 → 써 + 주셨어요. ㅡ drops and becomes 어. Mom\'s handwritten letter.' },
      { ko: '아빠가 카드를 보내주셨어요.', zh: '爸爸给我寄了卡片。', zhEn: 'Dad sent me a card.', highlight: '보내주셨어요', note: '아빠(爸爸) 也用 주셨어요。父母长辈同规格', noteEn: 'Dad also uses 주셨어요. Same form for parents and elders.' },
      { ko: '하루가 송편을 나눠줬어.', zh: 'Haru给了我一些松片糕。', zhEn: 'Haru gave me some songpyeon rice cakes.', highlight: '나눠줬어', note: '同辈朋友用 반말过去时。나누다(分) + 어 주다 → 나눠주다 → 나눠줬어', noteEn: 'For same-age friends, use 반말 past tense. 나누다(share) + 어 주다 → 나눠주다 → 나눠줬어' },
    ],
    pitfall:
      '① 长辈善意必须加 시：❌ 엄마가 보내줬어요 → ✅ 엄마가 보내주셨어요。写家书时用错 = 失礼。② 주다(给我) vs 드리다(我给)：给妈妈钱：돈을 드렸어요，妈妈给我钱：돈을 주셨어요。③ 아/어 주다 前面动词要变아/어，不是直接接原形。보내다 → 보내(元音已ㅐ) + 주다 = 보내주다。',
  },

  output: [
    {
      id: 'd36-o1',
      kind: 'compose',
      zhHint: '妈妈给我寄了包裹。', zhHintEn: 'Mom sent me a package.',
      tokens: ['엄마가', '소포를', '보내주셨어요', '보내줬어요', '보냈어요', '보내요'],
      composeAnswer: ['엄마가', '소포를', '보내주셨어요'],
      successMsg: '엄마 + 주셨어요，敬语过去时。今天最重要的一句。', successMsgEn: '엄마 + 주셨어요, honorific past tense. The most important sentence today.',
    },
    {
      id: 'd36-o2',
      kind: 'listen-choice',
      audioKo: '엄마가 고춧가루도 보내주셨어요.',
      successMsg: '✓ 妈妈连辣椒粉都装进包裹了。', successMsgEn: '✓ Mom even packed gochugaru into the package.',
      choices: [
        { zh: '妈妈还给我寄了辣椒粉。', zhEn: 'Mom also sent me gochugaru.', correct: true },
        { zh: '妈妈买了辣椒粉。', zhEn: 'Mom bought gochugaru.', correct: false },
        { zh: '妈妈吃了辣椒粉。', zhEn: 'Mom ate gochugaru.', correct: false },
        { zh: '妈妈给辣椒粉寄东西。', zhEn: 'Mom sent something to gochugaru.', correct: false },
      ],
    },
    {
      id: 'd36-o3',
      kind: 'zh-to-ko',
      zhPrompt: '爸爸给我写了卡片。', zhPromptEn: 'Dad wrote me a card.',
      successMsg: '"아빠가 카드를 써주셨어요." — 아빠도 주셨어요 사용.',
      choices: [
        { ko: '아빠가 카드를 써주셨어요.', correct: true },
        { ko: '아빠가 카드를 써줬어요.', correct: false },
        { ko: '아빠에게 카드를 써주셨어요.', correct: false },
        { ko: '아빠가 카드를 쓰셨어요.', correct: false },
      ],
    },
    {
      id: 'd36-o4',
      kind: 'particle-error',
      zhHint: '在值班室拿到了包裹。', zhHintEn: 'I picked up the package at the security office.',
      successMsg: '경비실 有收音 → **에서**（动作发生地点）；소포 无收音 → **를**。', successMsgEn: '경비실 ends in a consonant → **에서** (place of action); 소포 ends in a vowel → **를**.',
      choices: [
        { ko: '경비실에서 소포를 찾았어요.', correct: true },
        { ko: '경비실에 소포를 찾았어요.', correct: false },
        { ko: '경비실에서 소포가 찾았어요.', correct: false },
        { ko: '경비실로 소포를 찾았어요.', correct: false },
      ],
    },
    {
      id: 'd36-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 36 全对。红色的火锅底料，红色的思念。', successMsgEn: '✓ Day 36 all correct. Red hotpot base, red longing.',
      pairs: [
        { ko: '소포', zh: '包裹', zhEn: 'package / parcel' },
        { ko: '보내다', zh: '寄', zhEn: 'send' },
        { ko: '경비실', zh: '值班室', zhEn: 'security office' },
        { ko: '고춧가루', zh: '辣椒粉', zhEn: 'chili powder' },
        { ko: '그리워하다', zh: '想念', zhEn: 'miss' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: '엄마의 마음이 상자 안에 다 들어 있어요. 토리, 오늘도 잘 견뎠어요.',
    preview: '明天，Tori用火锅底料请朋友吃火锅——他们受得了辣吗？', previewEn: 'Tomorrow, Tori will treat friends to hotpot with the hotpot base — can they handle the spice?',
    stickerId: 'sticker-d36',
    sceneImageUrl: '/images/diary/day-36-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「주셨어요 和 줬어요 什么时候用？」「소포 和 택배 有什么区别？」',
};
