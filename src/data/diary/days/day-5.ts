import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 5 · 宿舍楼下 · 遇见 Haru 邻居
 *
 * 剧情：早上 8 点兔莉拎着分类好的垃圾下楼，走廊上一只小仓鼠正踮脚晾粉色袜子。
 * 她笑着跟兔莉打招呼，说自己是 302 房间的，叫 Haru。
 * 她还说听到隔壁昨晚一直在听 KPOP，问是兔莉吗。
 * 兔莉脸红了。"네... 맞아요."（是的…没错。）
 * Haru 邀请她一起去食堂吃早饭。第一个真正的"朋友"，就这样出现了。
 *
 * 学习目标：주제 助词 은/는 / 邻居/朋友/隔壁
 * 韩语自审：korean skill PASS
 */
export const day5: ToriDay = {
  level: 'beginner',
  day: 5,
  phase: 'foundation',
  title: '宿舍楼下 · 遇见 Haru',
  subtitle: '隔壁的仓鼠也是 KPOP 迷',
  heroImageUrl: '/images/diary/day-05-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '9월 5일 · 韩光宿舍走廊',
    weather: '兽尔 · 晴',
    toriPose: 'shy',
    diaryText: `9月 5日，早上 8 点。

我拎着分类好的垃圾，准备下楼。
走廊里，一只仓鼠正踮着脚晾粉色袜子。

她看见我，眼睛亮了起来：
"안녕하세요! 301호 새로 온 학생이에요?"
（你好！你是 301 新来的学生吗？）

我"네"了一声。她笑着说她是 302，叫 Haru。

然后她突然说：
"어제 밤에 KPOP 들었어요?"（你昨晚听 KPOP 了吗？）

…她从隔壁听到了。
我脸瞬间红了。"네... 맞아요."（是的…没错。）

Haru 笑得停不下来，
然后说："그럼 같이 아침 먹으러 갈래요?"
（那一起去吃早饭吗？）

我的第一个朋友，
就这样在垃圾桶旁边出现了。`,
  },

  words: [
    {
      id: 'd05-w1',
      korean: '이웃',
      hangul: 'i-ut',
      zh: '邻居',
      pos: '名词',
      example: { ko: '제 이웃이에요.', zh: '是我的邻居。' },
      tip: '받침 ㅅ → 이에요',
    },
    {
      id: 'd05-w2',
      korean: '친구',
      hangul: 'chin-gu',
      zh: '朋友',
      pos: '名词',
      example: { ko: '제 친구예요.', zh: '是我的朋友。' },
      tip: '친구 无收音(받침 없음) → 예요',
    },
    {
      id: 'd05-w3',
      korean: '맞아요',
      hangul: 'ma-ja-yo',
      zh: '对 / 没错',
      pos: '表达',
      example: { ko: '네, 맞아요.', zh: '是的，没错。' },
      tip: '韩国人确认事情最常用的回应。比单说「네」更暖',
    },
    {
      id: 'd05-w4',
      korean: '같이',
      hangul: 'ga-chi',
      zh: '一起',
      pos: '副词',
      example: { ko: '같이 가요.', zh: '一起走吧。' },
      tip: '邀请朋友的关键词。注意 ㅌ 在元音前发 ch 音，不是 ti',
    },
    {
      id: 'd05-w5',
      korean: '여기',
      hangul: 'yeo-gi',
      zh: '这里',
      pos: '代词',
      example: { ko: '여기는 제 방이에요.', zh: '这里是我的房间。' },
      tip: '配套：거기 (那里，对方那) / 저기 (那里，远处)',
    },
    {
      id: 'd05-w6',
      korean: '정말',
      hangul: 'jeong-mal',
      zh: '真的',
      pos: '副词',
      example: { ko: '정말 좋아요.', zh: '真的很喜欢。' },
      tip: '比「진짜」稍正式，发音更清晰',
    },
  ],

  dialogue: {
    scene: '宿舍走廊 · 早晨 8 点',
    setting: {
      time: '早晨',
      place: '3 楼走廊',
      npc: 'Haru 仓鼠',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '안녕하세요! 301호 새로 온 학생이에요?',
        hangul: 'an-nyeong-ha-se-yo! 301-ho sae-ro on hak-saeng-i-e-yo?',
        zh: '你好！你是 301 新来的学生吧？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '네, 맞아요. 저는 토리예요.',
        hangul: 'ne, ma-ja-yo. jeo-neun to-ri-ye-yo',
        zh: '是的，没错。我叫兔莉。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '저는 하루예요. 302호.',
        hangul: 'jeo-neun ha-ru-ye-yo. 302-ho',
        zh: '我叫 Haru，302 房。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '어디서 봤더라… 이 얼굴…',
        hangul: 'eo-di-seo bwat-deo-ra… i eol-gul…',
        zh: '在哪见过呢……这张脸……',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '같이 아침 먹으러 갈래요? 식당 어디 있는지 알아요?',
        hangul: 'ga-chi a-chim meo-geu-reo gal-lae-yo? sik-dang eo-di it-neun-ji a-ra-yo?',
        zh: '一起去吃早饭吗？你知道食堂在哪吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru 问"你知道食堂在哪吗"，兔莉完全不知道，应该怎么回答？',
        practice: 'pick',
        choices: [
          { ko: '아니요, 몰라요. 같이 가요!', zh: '不知道。一起去吧！', correct: true },
          { ko: '네, 알아요. 혼자 갈게요.', zh: '知道。我自己去。', correct: false },
          { ko: '저는 안 먹어요.', zh: '我不吃早饭。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '主题助词 은 / 는',
    pattern: 'N(有받침) + 은  /  N(无받침) + 는',
    whenToUse: '"至于___"、"___呢"——은/는 是韩语最常用的助词之一，用来标记一句话的话题。中文没有直接对应，但可以理解为"说到 X…"。Day 5 兔莉被 Haru 搭话时用 저는 做自我介绍。',
    rules: [
      '**基本公式**：名词 + 은/는。有收音(받침) → **은**（학생은、이름은、책은）。无收音 → **는**（저는、친구는、토리는）',
      '**收音判断**：看名词最后一个字有没有终声(받침)。只要带任何收音（单收音 ㄱㄴㄷㄹㅁㅂㅅㅇㅈㅊㅋㅌㅍㅎ、双写 ㄲㅆ、或复合收音 ㄳㄵㄶㄺㄻㄼㄽㄾㄿㅀㅄ）→ 用 은。最后一个字只有初声+中声、没收尾 → 用 는',
      '**核心功能①——提话题**："저는 토리예요"（我叫兔莉）= 把"저"设为话题，然后说关于这个话题的信息。等于"说到我，我是兔莉"',
      '**核心功能②——对比**："오늘은 추워요"（今天冷）= 隐含"别的天不一定，但今天冷"。"저는 좋아요"（我喜欢）= 隐含"别人可能不喜欢，但我喜欢"',
      '**核心功能③——旧信息标记**：第二次提到的东西用 은/는。"이 사람은 제 친구예요"（这个人是我朋友）= 这个"人"前面已经出现过了',
      '**은/는 vs 이/가 终极区别**：은/는 = 主题（"话题是什么"），이/가 = 主语（"谁做这个动作"）。저는 학생이에요（说到我，是学生）vs 제가 할게요（我来做——强调主语）。简单记：第一次提用 이/가，第二次提用 은/는',
      '**常用固定搭配**：저는（说到我…）、오늘은（今天呢…）、여기는（这里呢…）、이것은（这个呢…）、名字+은/는（某某呢…）',
      '**什么时候不能用 은/는**：疑问词（누구谁/뭐什么/어디哪里）后不加 은/는。누구는 왔어요? ❌ → 누가 왔어요? ✅',
    ],
    examples: [
      { ko: '저는 토리예요.', zh: '我是兔莉。（话题）', highlight: '저는', note: '저 无받침 → 는。自我介绍万能开场白' },
      { ko: '이름은 뭐예요?', zh: '名字是什么？', highlight: '이름은', note: '이름 有받침 ㅁ → 은。问名字的标准句式' },
      { ko: '여기는 한국이에요.', zh: '这里是韩国。', highlight: '여기는', note: '여기 无받침 → 는。介绍地点用 여기는' },
      { ko: '제 친구는 한국 사람이에요.', zh: '我的朋友是韩国人。', highlight: '친구는', note: '친구 无받침 → 는。对比隐含：我朋友是韩国人（别人可能不是）' },
      { ko: '오늘은 날씨가 좋아요.', zh: '今天天气好。', highlight: '오늘은', note: '오늘 有받침 ㄹ → 은。对比：今天天气好（昨天不一定）' },
      { ko: '저는 한국어를 공부해요.', zh: '我学习韩语。', highlight: '저는 + 을/를', note: '主题은/는 + 宾语을/를 同句出现。저는=话题，한국어를=具体动作对象' },
    ],
    pitfall:
      '① 别和 이/가 混：누가 왔어요?（✅ 谁来了，疑问词主语用 이/가）vs 저는 왔어요（✅ 我来了，话题用 은/는）。② 疑问词 누구/뭐/어디 后面只用 이/가，不用 은/는。③ 同一句里 은/는 和 이/가 可以共存：저는 사과가 좋아요（说到我，苹果好=我喜欢苹果）。',
  },

  output: [
    {
      id: 'd05-o1',
      kind: 'compose',
      zhHint: '我叫兔莉。（用主题助词）',
      tokens: ['저는', '토리예요', '이에요', '저', '친구예요', '맞아요'],
      composeAnswer: ['저는', '토리예요'],
      successMsg: 'Haru 听清你的名字了，眼睛笑成了一条缝。',
    },
    {
      id: 'd05-o2',
      kind: 'listen-choice',
      audioKo: '같이 아침 먹으러 갈래요?',
      successMsg: '✓ 「一起去吃早饭吗？」「같이」(一起) 是邀请的关键词。',
      choices: [
        { zh: '一起去吃早饭吗？', correct: true },
        { zh: '一起去看电影吗？', correct: false },
        { zh: '你住在哪里？', correct: false },
        { zh: '你是新来的学生吗？', correct: false },
      ],
    },
    {
      id: 'd05-o3',
      kind: 'zh-to-ko',
      zhPrompt: '是的，没错。我叫兔莉。',
      successMsg: '"맞아요" 比单说「네」更暖。「저는」用「는」表达话题。',
      choices: [
        { ko: '네, 맞아요. 저는 토리예요.', correct: true },
        { ko: '네, 맞아요. 저은 토리예요.', correct: false },
        { ko: '아니요, 맞아요. 저는 토리예요.', correct: false },
        { ko: '네, 정말. 저 토리이에요.', correct: false },
      ],
    },
    {
      id: 'd05-o4',
      kind: 'particle-error',
      zhHint: '我的朋友是中国人。',
      successMsg: '친구 (无收音(받침 없음)) → 는；사람 (받침 ㅁ) → 이에요。两条规则都到位。',
      choices: [
        { ko: '제 친구는 중국 사람이에요.', correct: true },
        { ko: '제 친구은 중국 사람이에요.', correct: false },
        { ko: '제 친구는 중국 사람예요.', correct: false },
        { ko: '제 친구가 중국 사람이에요.', correct: false },
      ],
    },
    {
      id: 'd05-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 5 核心词全部对上。Haru 的眼睛笑成了月牙，第一个朋友就是这样来的。',
      pairs: [
        { ko: '이웃', zh: '邻居' },
        { ko: '친구', zh: '朋友' },
        { ko: '맞아요', zh: '对 / 没错' },
        { ko: '같이', zh: '一起' },
        { ko: '정말', zh: '真的' },
      ],
    },
  ],

  recap: {
    toriPose: 'proud',
    praise: '今天交到了真正意义上的第一个朋友。토리, 멋졌어요!',
    preview: '明天去韩光语言学校第一天上课。听说班长是一只很凶的老虎…？',
    stickerId: 'sticker-d05',
    sceneImageUrl: '/images/diary/day-05-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「은和는有什么区别」「韩语怎么邀请朋友一起做事」「我的朋友怎么说」',
};
