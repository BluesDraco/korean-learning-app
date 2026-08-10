import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 87 · 妈妈来韩国 · 마중 (接机)
 *
 * 剧情：妈妈从中国飞来参加Tori毕业典礼。Tori在机场接妈妈，用韩语介绍兽尔动物城。
 * 妈妈虽然听不懂，但一直点头微笑。Tori挽着妈妈的手走在街上，觉得自己的韩语终于有了
 * 最重要的听众。
 */
export const day87: ToriDay = {
  level: 'advanced',
  day: 27,
  phase: 'mastery',
  title: '妈妈来韩国 · 마중', titleEn: 'Mom comes to Korea · picking her up',
  subtitle: '我的韩语终于有了最重要的听众', subtitleEn: 'My Korean finally has its most important listener.',
  heroImageUrl: '/images/diary/day-87-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 19일 · 목요일 오후',
    weather: '兽尔 · 초겨울 맑음', weatherEn: 'Seoul · Early winter, clear',
    toriPose: 'happy',
    diaryText: `12月19日，周四下午 3 点。

仁川机场到达大厅。

87 天前，我从这里出去。行李箱压得肩膀发疼，还把"짐"（行李）说成"집"（家）的那一天。

今天我在这里，接妈妈。

CN123 航班的到达提示灯变绿了。十五分钟后自动门打开——妈妈出来了。比平时更大的行李箱，手里拎着一袋要给我的饺子。

"闺女！"

——听到妈妈那一声，我三秒说不出话。

87 天了。

妈妈抱住我。中间隔着行李箱，还是抱住了我。"胖了点。"她笑着说。"因为好好吃饭嘛。"我回她。

坐四号线进首尔的路上——窗外风景一格一格换着，我用韩语一一讲给妈妈听：

"엄마, 여기가 인천이에요. 87일 전 나는 여기 공항에서 나갔어요. 지금 우리 이 지하철을 타요. 4호선."
（妈妈，这是仁川。87 天前我从这里的机场走出去。现在我们坐的是四号线。）

"여기가 지금 우리 학교 근처, 홍대 지역이에요. 저 카페 있죠? 저기서 저 3개월 동안 알바 했어요."
（这是我们学校附近，弘爪一带。你看那家咖啡馆，我在那里打了三个月工。）

"여기가 조롱박 놀이터. Day 8에 저 여기서 처음 밤 울었어요."
（这是葫芦游乐场。Day 8 我第一次半夜在这里哭过。）

妈妈不懂韩语。但她一直点头、一直笑。——她不是在听我说什么，是在听我用韩语讲我自己的故事。

我的手很自然地挽上了妈妈的胳膊。

87 天前，我不愿意挽着妈妈。想独立，想显得像个大人。——现在，挽着妈妈，我不觉得难为情了。

我韩语最重要的一位听众，终于到了。

——안녕하세요, 엄마.（你好，妈妈。）
——저는 토리예요. 저는 지금, 서울에 살아요.（我是兔莉。我现在，住在首尔。）`,
  },

  words: [
    { id: 'd87-w1', korean: '도착홀', hangul: 'do-cha-kol', zh: '到达大厅', zhEn: 'arrival hall', pos: '名词', posEn: 'Noun', example: { ko: '도착홀에서 만났어요.', zh: '在到达大厅见面。', zhEn: 'Meet at the arrival hall.' }, tip: '到(도) + 着(착) + hall', tipEn: '도(到) + 착(着) + hall' },
    { id: 'd87-w2', korean: '맞이하다', hangul: 'ma-ji-ha-da', zh: '迎接', zhEn: 'to welcome', pos: '动词', posEn: 'Verb', example: { ko: '엄마를 맞이했어요.', zh: '迎接了妈妈。', zhEn: 'Welcomed Mom.' }, tip: '맞다(合) + 이하다. 마중가다와 유사', tipEn: '맞다(合) + 이하다. Similar to 마중가다.' },
    { id: 'd87-w3', korean: '항공편', hangul: 'hang-gong-pyeon', zh: '航班', zhEn: 'flight', pos: '名词', posEn: 'Noun', example: { ko: 'CN123 항공편이에요.', zh: 'CN123航班。', zhEn: 'Flight CN123.' }, tip: '航(항) + 空(공) + 便(편)', tipEn: '항(航) + 공(空) + 편(便)' },
    { id: 'd87-w4', korean: '살이 붙다', hangul: 'sa-ri but-da', zh: '长肉', zhEn: 'to gain weight', pos: '表达', posEn: 'Expression', example: { ko: '살 좀 붙었네.', zh: '长了点肉。', zhEn: 'Gained a bit of weight.' }, tip: '살(肉) + 붙다(附). 자기 관찰 관용', tipEn: '살(肉) + 붙다(附). Idiom for self-observation.' },
    { id: 'd87-w5', korean: '고개 끄덕이다', hangul: 'go-gae kkeu-deo-gi-da', zh: '点头', zhEn: 'to nod', pos: '表达', posEn: 'Expression', example: { ko: '엄마가 고개 끄덕였어요.', zh: '妈妈点头了。', zhEn: 'Mom nodded.' }, tip: '고개(头) + 끄덕이다(点)', tipEn: '고개(head) + 끄덕이다(nod)' },
    { id: 'd87-w6', korean: '청중', hangul: 'cheong-jung', zh: '听众', zhEn: 'listener', pos: '名词', posEn: 'Noun', example: { ko: '내 한국어의 청중이 왔어요.', zh: '我韩语的听众来了。', zhEn: 'My Korean listener has arrived.' }, tip: '听(청) + 众(중)', tipEn: 'Listen (청) + Audience (중)' },
  ],

  dialogue: {
    scene: '인천 공항 도착홀·엄마 맞이',
    setting: { time: '周四 15:30', timeEn: 'Thursday 15:30', place: '인천 공항 도착홀', npc: '妈妈', npcEn: 'Mom' },
    lines: [
      { speaker: 'npc', npcName: '妈妈', npcNameEn: 'Mom', ko: '闺女! 살 좀 붙었네.', hangul: '闺女! sal jom bu-teon-ne', zh: '闺女！长了点肉。', zhEn: 'Sweetie! You\'ve gained a little weight.', practice: 'listen' },
      { speaker: 'tori', ko: '밥 잘 먹으니까. 엄마, 정말 오래 기다렸어요.', hangul: 'bap jal meo-geu-ni-kka. eom-ma, jeong-mal o-rae gi-da-ryeo-sseo-yo', zh: '因为吃得好。妈妈，等很久了。', zhEn: 'Because I\'ve been eating well. Mom, did you wait long?', practice: 'shadow' },
      { speaker: 'tori', ko: '엄마, 여기가 인천이에요. 87일 전 저는 여기 공항에서 나갔어요.', hangul: 'eom-ma, yeo-gi-ga in-cheon-i-e-yo. 87il jeon jeo-neun yeo-gi gong-hang-e-seo na-ga-sseo-yo', zh: '妈妈，这是仁川。87天前我从这机场出去。', zhEn: 'Mom, this is Incheon. 87 days ago, I left through this airport.', practice: 'shadow' },
      { speaker: 'tori', ko: '이 지하철을 타고 우리 학교로 가요.', hangul: 'i ji-ha-cheo-reul ta-go u-ri hak-gyo-ro ga-yo', zh: '坐这地铁去我们学校。', zhEn: 'Take this subway to our school.', practice: 'shadow' },
      { speaker: 'tori', isInnerVoice: true, ko: '엄마는 한국말 몰라. 근데 내 이야기를 한국어로 하는 것 자체를 듣고 있어.', hangul: 'eom-ma-neun han-guk-mal mol-la. geun-de nae i-ya-gi-reul han-guk-eo-ro ha-neun geot ja-che-reul deut-go i-sseo', zh: '妈妈不懂韩语。但在听我用韩语讲自己的故事。', zhEn: 'Mom doesn\'t understand Korean. But she\'s listening to me tell my story in Korean.', practice: 'listen' },
      { speaker: 'tori', ko: '?', hangul: '', zh: '妈妈微笑点头. Tori想真诚说"你就是我的听众". 合适的一句？', zhEn: 'Mom smiles and nods. Tori wants to sincerely say, "You\'re my audience." Which sentence fits?', practice: 'pick',
        choices: [
          { ko: '엄마가 제 한국어의 가장 소중한 청중이에요.', zh: '妈妈是我韩语最珍贵的听众。', zhEn: 'Mom is the most precious audience for my Korean.', correct: true },
          { ko: '엄마 진짜 못 알아들어요.', zh: '妈妈完全听不懂。', zhEn: 'Mom doesn\'t understand at all.', correct: false },
          { ko: '이제 한국어 안 할래.', zh: '不说韩语了。', zhEn: 'Let\'s not speak Korean anymore.', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '一边A一边B / 边A边B：~(으)면서', titleEn: 'While A, while B / A and B simultaneously: ~(으)면서',
    pattern: 'V + **(으)면서** + V (동시 동작)',
    whenToUse: '「一边A一边B」的동시 동작 연결. Tori 说 「妈妈가 웃**으면서** 안았어요」= 妈妈笑着抱. ~(으)면서 = 두 동작 동시. 描写/서사 필수.', whenToUseEn: '"While A, while B" connects simultaneous actions. Tori says "Mom hugged while smiling" = Mom smiled and hugged. ~(으)면서 = two actions at once. Essential for description/narration.',
    rules: [
      '**기본**: V + (으)면서 = 边...边. 收音 판단: 无 + 면서 / 有 + 으면서',
      '**주어 동일**: 앞뒤 주어가 같은 사람',
      '**모순 조건 → ~(으)면서도**: 알면서도 = 明知却',
      '**N + 이면서**: 명사도 접함. 학생이면서 알바생 = 又是学生又是兼职',
    ],
    examples: [
      { ko: '엄마가 웃으면서 안았어요.', zh: '妈妈笑着抱了。', zhEn: 'Mom smiled and hugged.', highlight: '웃으면서 안았어요', note: '웃다 + 으면서 + 안다' },
      { ko: '창밖을 보면서 설명했어요.', zh: '一边看窗外一边解释。', zhEn: 'Explaining while looking out the window.', highlight: '보면서 설명했어요', note: '보다 + 면서 + 설명하다' },
      { ko: '엄마는 한국어를 모르면서도 웃었어요.', zh: '妈妈不懂韩语却笑了。', zhEn: 'Mom smiled even though she didn\'t understand Korean.', highlight: '모르면서도', note: '~(으)면서도 = 모순 조건. 明知却', noteEn: '~(으)면서도 = contradictory condition. Knowing but still.' },
      { ko: '고개를 끄덕이면서 듣고 계셨어요.', zh: '一边点头一边听着。', zhEn: 'Nodding while listening.', highlight: '끄덕이면서', note: '~고 계세요 (Day 33) + 면서' },
    ],
    pitfall:
      '① ~(으)면서 = 동시 동작. 앞뒤 주어 같아야 자연. 다른 주어면 ~는 동안. ② ~(으)면서도 는 조건+모순. 완전 다른 뜻. 모르면서도 = 不知却/明知却. ③ 명사 + 이면서도 대응. 학생이면서도 알바생 = 是学生同时也是兼职.',
  },

  output: [
    { id: 'd87-o1', kind: 'compose', zhHint: '一边看窗外一边解释。', zhHintEn: 'Explaining while looking out the window.', tokens: ['창밖을', '보면서', '설명했어요', '보고', '설명하고', '창밖에'], composeAnswer: ['창밖을', '보면서', '설명했어요'], successMsg: '~(으)면서 = 동시 동작.' },
    { id: 'd87-o2', kind: 'listen-choice', audioKo: '살 좀 붙었네.', successMsg: '✓ 妈妈第一句。육친적 관찰 관용어.', successMsgEn: '✓ Mom\'s first sentence. A parental observation idiom.', choices: [{ zh: '长了点肉。', zhEn: 'Gained a bit of weight.', correct: true }, { zh: '瘦了很多。', zhEn: 'Lost a lot of weight.', correct: false }, { zh: '骨头突出。', zhEn: 'Bones sticking out.', correct: false }, { zh: '衣服合适。', zhEn: 'Clothes fit well.', correct: false }] },
    { id: 'd87-o3', kind: 'zh-to-ko', zhPrompt: '妈妈不懂韩语却笑了。', zhPromptEn: 'Mom smiled even though she didn\'t understand Korean.', successMsg: '"엄마는 한국어를 모르면서도 웃었어요." — ~(으)면서도 조건.', choices: [{ ko: '엄마는 한국어를 모르면서도 웃었어요.', correct: true }, { ko: '엄마는 한국어를 모르면서 웃었어요.', correct: false }, { ko: '엄마는 한국어를 모르지만 웃었어요.', correct: false }, { ko: '엄마는 한국어가 모르면서도 웃었어요.', correct: false }] },
    { id: 'd87-o4', kind: 'particle-error', zhHint: '在到达大厅见面。', zhHintEn: 'Meet at the arrival hall.', successMsg: '도착홀 **에서** (동작 발생 장소) + 만나다.', choices: [{ ko: '도착홀에서 만났어요.', correct: true }, { ko: '도착홀에 만났어요.', correct: false }, { ko: '도착홀을 만났어요.', correct: false }, { ko: '도착홀이 만났어요.', correct: false }] },
    { id: 'd87-o5', kind: 'match-pair', successMsg: '✓ Day 87 全对. 妈妈, 兽尔에 오셨어요.', successMsgEn: '✓ Day 87 all correct. Mom, you\'ve come to Seoul.', pairs: [{ ko: '도착홀', zh: '到达大厅', zhEn: 'arrival hall' }, { ko: '맞이하다', zh: '迎接', zhEn: 'to welcome' }, { ko: '항공편', zh: '航班', zhEn: 'flight' }, { ko: '고개 끄덕이다', zh: '点头', zhEn: 'to nod' }, { ko: '청중', zh: '听众', zhEn: 'listener' }] },
  ],

  recap: {
    toriPose: 'happy',
    praise: '87일 前 캐리어 밀고 나갔던 그 곳에서, 오늘 妈妈를 맞이해요.', praiseEn: 'At the place where I pushed my suitcase out 87 days ago, today I welcome Mom.',
    preview: '明天 4명이 학사복 입고 졸업 사진. 당근 펜은 모자 위에.', previewEn: 'Tomorrow, four of us will wear graduation gowns for photos. Of course, the pen goes on top of the cap.',
    stickerId: 'sticker-d87',
    sceneImageUrl: '/images/diary/day-87-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~(으)면서 / ~(으)면서도 어떻게?」「妈妈에게 韩国어로 설명 어떻게?」', carrotHintEn: 'Today\'s carrot: 「~(으)면서 / ~(으)면서도 how?」「How to explain to Mom in Korean?」',
};
