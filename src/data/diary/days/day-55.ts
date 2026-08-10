import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 55 · 일기 다시 읽기 · 55天的变化
 *
 * 剧情：Tori翻看日记本，对比55天前和现在的自己。55天前连안녕하세요都紧张，
 * 现在自己去咖啡馆、去市场、见朋友、调解矛盾。变化比想象中大。
 * 但她知道还有很多要学——会更努力。
 *
 * 学习目标：대조 ~던 (기억 회상) / 성장 표현 / 자기 반성 문장
 * 语料层级：해요体 · 회고 어투
 * 韩语自审：korean skill PASS
 */
export const day55: ToriDay = {
  level: 'intermediate',
  day: 25,
  phase: 'expansion',
  title: '写日记回顾 · 55天的变化', titleEn: 'Writing a diary to reflect · 55 days of change',
  subtitle: '一本日记，两个自己', subtitleEn: 'One diary, two versions of yourself',
  heroImageUrl: '/images/diary/day-55-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 27일 · 일요일 저녁',
    weather: '兽尔 · 阴', weatherEn: 'Soo-ah · Yin',
    toriPose: 'shy',
    diaryText: `10月27日，周日晚上。

写完 Day 54 的日记，
我翻回了 Day 1 那一页。

——那时的字歪歪扭扭。
——那时把"안녕하세요"写了三行练习。
——那时结尾写着"내일, 나 잘 할 수 있을까?"（明天，我能做好吗？）

翻到Day 3：
"기내에서 짐이라고 말한다는 걸 집이라고 말해버렸어요."
（应该说'行李'我却说了'家'。）

翻到Day 7：
"휴대폰이 1%였는데 하루가 왔어요."
（手机1%时Haru出现了。）

翻到Day 30：
初级毕业月考。85分。

翻到今天。
Day 54，我讲价买了外套。

同一本日记本。
两个自己。

我在Day 55的第一行写下：

"55일 전에는 안녕하세요를 말하는 것도 떨렸던 나였어요.
지금은 흥정도 하고, 친구 싸움도 말리는 사람이에요.
근데 아직 배울 게 많아요.
계속 더 열심히 할래요."

（55天前，连"你好"都紧张地说不出的我。
现在是能讲价、能调解朋友吵架的人。
但还有很多要学的。
会继续更努力。）

写完，
我看着窗外雨里的兽尔。

原来时间——
不是流走了，
是变成我了。`,
  },

  words: [
    {
      id: 'd55-w1',
      korean: '일기',
      hangul: 'il-gi',
      zh: '日记', zhEn: 'Diary',
      pos: '名词', posEn: 'Noun',
      example: { ko: '55일 전 일기를 다시 읽었어요.', zh: '重读了55天前的日记。', zhEn: 'Re-read the diary from 55 days ago.' },
      tip: '日(일) + 记(기). 일기를 쓰다 = 写日记', tipEn: '日(일) + 记(기). 일기를 쓰다 = to write a diary',
    },
    {
      id: 'd55-w2',
      korean: '떨리다',
      hangul: 'tteol-li-da',
      zh: '紧张/发抖', zhEn: 'nervous/trembling',
      pos: '动词', posEn: 'Verb',
      example: { ko: '너무 떨렸어요.', zh: '太紧张了。', zhEn: 'I was too nervous.' },
      tip: '떨다(抖) → 떨리다(自动). 발표 전 상황 자주 씀', tipEn: '떨다 (tremble) → 떨리다 (intransitive). Often used before presentations.',
    },
    {
      id: 'd55-w3',
      korean: '흥정',
      hangul: 'heung-jeong',
      zh: '讲价', zhEn: 'bargain',
      pos: '名词', posEn: 'Noun',
      example: { ko: '흥정도 잘해요.', zh: '也会讲价。', zhEn: 'I can bargain too.' },
      tip: 'Day 54 배운 깎다의 名词版. 흥정하다 = 讲价', tipEn: 'Day 54: Noun form of 깎다 learned. 흥정하다 = bargain.',
    },
    {
      id: 'd55-w4',
      korean: '말리다',
      hangul: 'mal-li-da',
      zh: '劝阻/调解', zhEn: 'dissuade/mediate',
      pos: '动词', posEn: 'Verb',
      example: { ko: '싸움을 말렸어요.', zh: '调解了争吵。', zhEn: 'I mediated a quarrel.' },
      tip: 'Day 49 조정 상황에 딱 맞는 동사',
    },
    {
      id: 'd55-w5',
      korean: '배우다',
      hangul: 'bae-u-da',
      zh: '学', zhEn: 'learn',
      pos: '动词', posEn: 'Verb',
      example: { ko: '아직 배울 게 많아요.', zh: '还有很多要学。', zhEn: 'There\'s still a lot to learn.' },
      tip: '배우다 → 배워요 / 배웠어요. 배울 것 = 要学的东西', tipEn: '배우다 → 배워요 / 배웠어요. 배울 것 = things to learn.',
    },
    {
      id: 'd55-w6',
      korean: '열심히',
      hangul: 'yeol-sim-hi',
      zh: '努力地', zhEn: 'diligently',
      pos: '副词', posEn: 'Adverb',
      example: { ko: '계속 더 열심히 할래요.', zh: '会继续更努力。', zhEn: 'I\'ll keep working harder.' },
      tip: '汉字词 热(열) + 心(심) + 히. 副词最刚需', tipEn: 'Sino-Korean: 热(열) + 心(심) + 히. Essential adverb.',
    },
  ],

  dialogue: {
    scene: '자기 방·일기장',
    setting: {
      time: '周日 20:00', timeEn: 'Sunday 20:00',
      place: 'Tori 宿舍 · 书桌', placeEn: 'Tori\'s dorm · Desk',
      npc: 'Haru（消息）', npcEn: 'Haru (Message)',
    },
    lines: [
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: 'Day 1 일기… 이때는 진짜 다 떨렸구나.',
        hangul: 'il-il il-gi… i-ttae-neun jin-jja da tteol-lyeot-gu-na',
        zh: 'Day 1 的日记……那时真是什么都紧张呢。', zhEn: 'Day 1 diary... I was nervous about everything back then.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '55일 전에는 안녕하세요도 어려웠던 나였어요.',
        hangul: 'o-si-bo-il jeo-ne-neun an-nyeong-ha-se-yo-do eo-ryeo-wot-deon na-yeo-sseo-yo',
        zh: '55天前连"你好"都难说出口的我。', zhEn: '55 days ago, I could barely say "hello."',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '지금은 흥정도 하고, 친구 싸움도 말리는 사람이에요.',
        hangul: 'ji-geu-meun heung-jeong-do ha-go, chin-gu ssa-um-do mal-li-neun sa-ra-mi-e-yo',
        zh: '现在是能讲价、能调解朋友吵架的人。', zhEn: 'Now I can bargain and mediate friends\' fights.',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '근데 아직 배울 게 많아요.',
        hangul: 'geun-de a-jik bae-ul ge ma-na-yo',
        zh: '但还有很多要学。', zhEn: 'But there\'s still a lot to learn.',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '많이 배웠고, 앞으로도 많이 배울 거야. 그게 성장이야.',
        hangul: 'ma-ni bae-wot-go, a-peu-ro-do ma-ni bae-ul geo-ya. geu-ge seong-jang-i-ya',
        zh: '学了很多，以后也会学很多。这就是成长。', zhEn: 'I\'ve learned a lot, and I\'ll keep learning. That\'s growth.',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '看着Haru的一句话，Tori想告诉自己"继续努力"。合适的一句？', zhEn: 'Looking at Haru\'s message, Tori wants to tell herself "keep going." Which fits?',
        practice: 'pick',
        choices: [
          { ko: '계속 더 열심히 할래요.', zh: '会继续更努力。', zhEn: 'I\'ll keep working harder.', correct: true },
          { ko: '이제 그만할래요.', zh: '现在停止吧。', zhEn: 'Stop now.', correct: false },
          { ko: '나 잘 안 해도 돼요.', zh: '我不用做好。', zhEn: 'I don\'t need to do well.', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '曾经/当时___的：~던', titleEn: 'Used to / at the time ___\'s: ~던',
    pattern: 'V/A + **던** + N (回想过去的状态/习惯)', patternEn: 'V/A + **던** + N (recalling a past state/habit)',
    whenToUse: '~던 = "曾经/以前___的"的回想形。Tori 说 「안녕하세요도 어려웠**던** 나」= 曾经连"你好"都难的我。~던 表**过去反复/持续的状态**，回望自己/去过的地方/爱过的人时用它。日记回顾/自传/回忆录高频。', whenToUseEn: '~던 = the retrospective form of "used to / previously ___". Tori says 「안녕하세요도 어려웠**던** 나」= the me who once found even "hello" hard. ~던 expresses a **past repeated/ongoing state**, used when looking back at yourself, places you\'ve been, or people you\'ve loved. High frequency in diary reflections, autobiographies, and memoirs.',
    rules: [
      '**基本公式**：V/A + 던 + N。어려웠던 나 = 曾经艰难的我。좋아하던 노래 = 曾经喜欢的歌',
      '**과거 강조 → ~았/었던**：완료된 과거를 명확히. 좋아**했던** 사람 = 曾经喜欢过的人（现在不喜欢了）',
      '**~던 vs ~(으)ㄴ**：~던 표시**반복/지속된 과거상태**； ~(으)ㄴ 표시 **단순 완료**. 갔던 곳 (去过多次) vs 간 곳 (去过)',
      '**감정·상태에 잘 붙음**：떨렸던 나 / 서툴렀던 시절 / 어렸던 나 = 자주 나오는 조합'
    ],
    examples: [
      { ko: '안녕하세요도 어려웠던 나였어요.', zh: '连"你好"都难说出口的曾经的我。', zhEn: 'The me who once couldn\'t even say "hello."', highlight: '어려웠던 나', note: '어렵다 → 어려웠던(과거+던). Day 1 회고' },
      { ko: '자주 갔던 카페가 문 닫았어요.', zh: '常去的咖啡馆关门了。', zhEn: 'The café I used to go to closed down.', highlight: '갔던 카페', note: '가다 + 았던 = 반복적으로 갔던 경험' },
      { ko: '그때 좋아했던 노래를 다시 들었어요.', zh: '重新听了那时候喜欢的歌。', zhEn: 'I listened again to the songs I liked back then.', highlight: '좋아했던 노래', note: '좋아하다 → 좋아했던. 감정 회상 표현' },
      { ko: '한국어를 몰랐던 때가 있었어요.', zh: '有过不懂韩语的时候。', zhEn: 'There was a time I didn\'t know Korean.', highlight: '몰랐던 때', note: '모르다 → 몰랐던. 자기 성장을 회고할 때' },
    ],
    pitfall:
      '① **~던 vs ~(으)ㄴ**：동사 과거 관형사는 두 가지 다 있음. ~던 은 **反复/持续** 뉘앙스, ~(으)ㄴ 은 **단순 완료**. 갔던 곳 (常去) vs 간 곳 (去了)。② ~았/었던 = 완전히 끝난 과거 (더 이상 그렇지 않음). 좋아**했던** = 已经不喜欢了 (뉘앙스)。③ 형용사도 자연스럽게 결합：어렵던 시절 / 어려웠던 나. 두 가지 다 통함。④ 会话보다 **문어/일기** 에 더 자주 등장.',
  },

  output: [
    {
      id: 'd55-o1',
      kind: 'compose',
      zhHint: '连"你好"都难说出口的曾经的我。', zhHintEn: 'The me who once couldn\'t even say "hello."',
      tokens: ['안녕하세요도', '어려웠던', '나였어요', '어려운', '나예요', '어렵던'],
      composeAnswer: ['안녕하세요도', '어려웠던', '나였어요'],
      successMsg: '~던 회고형. 日记体的关键句型.', successMsgEn: '~던 retrospective form. A key pattern for diary writing.',
    },
    {
      id: 'd55-o2',
      kind: 'listen-choice',
      audioKo: '많이 배웠고, 앞으로도 많이 배울 거야.',
      successMsg: '✓ Haru 的一句。~고 병렬 + ~(으)ㄹ 거야.', successMsgEn: '✓ One of Haru\'s lines. ~고 parallel + ~(으)ㄹ 거야.',
      choices: [
        { zh: '学了很多，以后也会学很多。', zhEn: 'I\'ve learned a lot, and I\'ll learn a lot more.', correct: true },
        { zh: '不学了，以后也不学。', zhEn: 'I won\'t study, and I won\'t in the future either.', correct: false },
        { zh: '学过一次，以后不学。', zhEn: 'I studied once, but won\'t again.', correct: false },
        { zh: '学多了没用。', zhEn: 'Studying too much is useless.', correct: false },
      ],
    },
    {
      id: 'd55-o3',
      kind: 'zh-to-ko',
      zhPrompt: '重新听了那时候喜欢的歌。', zhPromptEn: 'I listened again to the songs I liked back then.',
      successMsg: '"그때 좋아했던 노래를 다시 들었어요." — 좋아했던 = 曾经喜欢的.', successMsgEn: '"그때 좋아했던 노래를 다시 들었어요." — 좋아했던 = used to like.',
      choices: [
        { ko: '그때 좋아했던 노래를 다시 들었어요.', correct: true },
        { ko: '그때 좋아하는 노래를 다시 들었어요.', correct: false },
        { ko: '그때 좋아하던 노래가 다시 들었어요.', correct: false },
        { ko: '그때 좋아한 노래를 다시 듣었어요.', correct: false },
      ],
    },
    {
      id: 'd55-o4',
      kind: 'particle-error',
      zhHint: '还有很多要学。', zhHintEn: 'There\'s still a lot to learn.',
      successMsg: '~(으)ㄹ 게 많다 = 有很多要___. 게 = 것이 축약.', successMsgEn: '~(으)ㄹ 게 많다 = have a lot to ___. 게 is a contraction of 것이.',
      choices: [
        { ko: '아직 배울 게 많아요.', correct: true },
        { ko: '아직 배우는 게 많아요.', correct: false },
        { ko: '아직 배웠던 게 많아요.', correct: false },
        { ko: '아직 배운 것이 많이요.', correct: false },
      ],
    },
    {
      id: 'd55-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 55 全对。두 개의 나. 그 사이가 55일.', successMsgEn: '✓ Day 55 all correct. Two versions of me. 55 days apart.',
      pairs: [
        { ko: '일기', zh: '日记', zhEn: 'Diary' },
        { ko: '떨리다', zh: '紧张', zhEn: 'nervous' },
        { ko: '흥정', zh: '讲价', zhEn: 'bargain' },
        { ko: '말리다', zh: '调解', zhEn: 'mediate' },
        { ko: '열심히', zh: '努力地', zhEn: 'diligently' },
      ],
    },
  ],

  recap: {
    toriPose: 'shy',
    praise: 'Day 1 부터 Day 55 까지 다 읽었어요. 시간은 흘러간 게 아니라, 나로 변한 거였어요.',
    preview: '明天开学季——韩光宿舍来了一批新生。走廊里有一只兔子……', previewEn: 'Tomorrow is the start of the school season—a batch of new students arrives at Hangwang dorm. There\'s a rabbit in the hallway...',
    stickerId: 'sticker-d55',
    sceneImageUrl: '/images/diary/day-55-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~던 和 ~(으)ㄴ 什么时候用？」「일기 어떻게 쓰면 좋을까요?」',
};
