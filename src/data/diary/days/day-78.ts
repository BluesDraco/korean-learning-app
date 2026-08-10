import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 78 · 제주도 · 矮马和橘子
 *
 * 剧情：四人去제주도。Tori第一次看到济州矮马，吃橘子，看到石头爷爷。矮马很小但跑得快——
 * Tori觉得自己和矮马有点像。
 */
export const day78: ToriDay = {
  level: 'advanced',
  day: 18,
  phase: 'mastery',
  title: '제주도 · 矮马和橘子', titleEn: 'Jeju · ponies and tangerines',
  subtitle: '"작지만 빨라" — Tori感觉和矮马像', subtitleEn: '\'Small but fast\' — Tori feels like a pony',
  heroImageUrl: '/images/diary/day-78-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '12월 6일 · 금요일 오후',
    weather: '제주도 · 맑음 · 바람 强', weatherEn: 'Jeju · clear · strong wind',
    toriPose: 'happy',
    diaryText: `12月6日，周五下午。

济州岛，挟才海边前的一处小牧场。四面都是矮矮的石墙，石墙是黑色的火山石堆的。

牧场里——小小的马跑来跑去。Junho 说："제주 조랑말이야."（这是济州矮种马。）

个头——大概到我的肩膀。——真的是很小的马！

我扒在石墙边看着一匹。突然它跑了起来。

——快。——这么小，跑起来这么快。

Day 70 辩论赛上我说过的那句话，今天在眼前活生生地成立了：

"작지만 강하다."（小，也可以强。）

这只小马就是活的证据。

牧场外面的小卖部买了一袋橘子，一袋 3000 韩元。——在东京卖的话是一万块钱的大小。剥开皮，香气立刻散开。——酸甜，浓，又柔和。

Haru 笑着递给我一颗："토리, 이 귤 너 같아."（兔莉，这个橘子像你。）

"…我？"

"작고, 향 진하고, 달아."（小，香浓，甜。）

——我笑着，想不出该怎么回她。默默剥了一颗，递给了 Haru。`,
  },

  words: [
    { id: 'd78-w1', korean: '제주도', hangul: 'je-ju-do', zh: '济州岛', zhEn: 'Jeju Island', pos: '名词', posEn: 'Noun', example: { ko: '제주도에 처음 왔어요.', zh: '第一次来济州岛。', zhEn: 'First time in Jeju.' }, tip: '한국 남쪽 섬. 관광지 대표' },
    { id: 'd78-w2', korean: '조랑말', hangul: 'jo-rang-mal', zh: '矮马', zhEn: 'pony', pos: '名词', posEn: 'Noun', example: { ko: '제주 조랑말이에요.', zh: '济州矮马。', zhEn: 'Jeju pony.' }, tip: '제주도 대표 동물. 작지만 빠름' },
    { id: 'd78-w3', korean: '귤', hangul: 'gyul', zh: '橘子', zhEn: 'tangerine', pos: '名词', posEn: 'Noun', example: { ko: '제주 귤이 유명해요.', zh: '济州橘子有名。', zhEn: 'Jeju tangerines are famous.' }, tip: '한 글자 명사. 제주 특산' },
    { id: 'd78-w4', korean: '껍질', hangul: 'kkeop-jil', zh: '皮/壳', zhEn: 'peel/shell', pos: '名词', posEn: 'Noun', example: { ko: '귤 껍질을 벗겼어요.', zh: '剥了橘子皮。', zhEn: 'Peeled the tangerine.' }, tip: '껍질을 벗기다 = 剥皮', tipEn: '껍질을 벗기다 = to peel' },
    { id: 'd78-w5', korean: '새콤달콤', hangul: 'sae-kom-dal-kom', zh: '酸酸甜甜', zhEn: 'sweet and sour', pos: '副词', posEn: 'Adverb', example: { ko: '새콤달콤한 맛이에요.', zh: '酸酸甜甜的味。', zhEn: 'A sweet and sour taste.' }, tip: '고유어 음성 상징어. 감각 표현' },
    { id: 'd78-w6', korean: '증거', hangul: 'jeung-geo', zh: '证据', zhEn: 'evidence', pos: '名词', posEn: 'Noun', example: { ko: '살아있는 증거예요.', zh: '活的证据。', zhEn: 'Living proof.' }, tip: '证(증) + 据(거)', tipEn: '증 (proof) + 거 (basis)' },
  ],

  dialogue: {
    scene: '제주 목장·귤 매점',
    setting: { time: '周五 15:30', timeEn: 'Friday 15:30', place: '제주 협재 목장', npc: 'Junho / Haru' },
    lines: [
      { speaker: 'npc', npcName: 'Junho', ko: '토리, 저 말 봐. 제주 조랑말이야. 작지만 진짜 빨라.', hangul: 'to-ri, jeo mal bwa. je-ju jo-rang-ma-ri-ya. jak-ji-man jin-jja ppal-la', zh: '兔莉，看那匹马。济州矮马。虽小但真快。', zhEn: 'Tori, look at that horse. A Jeju pony. Small but really fast.', practice: 'listen' },
      { speaker: 'tori', isInnerVoice: true, ko: '작지만 빠르다… Day 70 명제가 여기 있네.', hangul: 'jak-ji-man ppa-reu-da… Day 70 myeong-je-ga yeo-gi in-ne', zh: '虽小但快……Day 70的命题在这里呢。', zhEn: 'Small but fast... Day 70\'s theme is right here.', practice: 'listen' },
      { speaker: 'tori', ko: '이 조랑말이 "작지만 강하다"의 살아있는 증거네.', hangul: 'i jo-rang-ma-ri jak-ji-man gang-ha-da-ui sa-ra-in-neun jeung-geo-ne', zh: '这矮马就是"虽小但强"的活证据呢。', zhEn: 'This pony is living proof of "small but strong."', practice: 'shadow' },
      { speaker: 'npc', npcName: 'Haru', ko: '토리, 이 귤 너 같아. 작고 향 진하고 달아.', hangul: 'to-ri, i gyul neo ga-ta. jak-go hyang jin-ha-go da-ra', zh: '兔莉，这橘子像你。小、香浓、甜。', zhEn: 'Tori, this tangerine is like you. Small, fragrant, and sweet.', practice: 'listen' },
      { speaker: 'tori', isInnerVoice: true, ko: '대답할 말이 없다. 대신 귤 하나 더 벗겨서 하루한테 건넸다.', hangul: 'dae-da-pal ma-ri eop-da. dae-sin gyul ha-na deo beot-gyeo-seo ha-ru-han-te geon-nyeot-da', zh: '想不出话。剥了颗橘子递给Haru。', zhEn: 'At a loss for words. Peeled a tangerine and handed it to Haru.', practice: 'listen' },
      { speaker: 'tori', ko: '?', hangul: '', zh: 'Haru说橘子像Tori. Tori想温柔回一句. 合适的一句？', zhEn: 'Haru says the tangerine is like Tori. Tori wants to reply gently. Which fits?', practice: 'pick',
        choices: [
          { ko: '고마워. 넌 이 귤보다 훨씬 달아.', zh: '谢谢。你比这橘子甜多了。', zhEn: 'Thanks. You\'re much sweeter than this tangerine.', correct: true },
          { ko: '나 귤 싫어해.', zh: '我讨厌橘子。', zhEn: 'I hate tangerines.', correct: false },
          { ko: '진짜? 나 그렇게 안 커.', zh: '真的？我没那么大。', zhEn: 'Really? I\'m not that big.', correct: false },
        ]},
    ],
  },

  grammar: {
    title: '虽小但快：~지만 + Adv (Day 70·76 종합)', titleEn: 'Small but fast: ~지만 + Adv (Day 70·76 combined)',
    pattern: 'A + **지만** + Adv/A/V',
    whenToUse: 'Day 70 「작지만 강하다」의 확장. Day 78 = 조랑말 관찰 → "작지만 빠르다". ~지만 + 대비 특성 = Tori 主题의 반복 등장 프레임.', whenToUseEn: 'Extension of Day 70\'s "작지만 강하다." Day 78 = pony observation → "작지만 빠르다." ~지만 + contrasting traits = recurring frame in Tori\'s theme.',
    rules: [
      '**~지만 대비 강화**：작지만 빠르다 / 작지만 강하다 / 작지만 향이 진하다',
      '**한 개체의 두 면 표현**：크기 vs 능력 / 형태 vs 향 등',
      '**Day 70 이후 Tori 인생 명제**: 반복 등장으로 성장 코드 완성',
    ],
    examples: [
      { ko: '작지만 빠르다.', zh: '虽小但快。', zhEn: 'Small but fast.', highlight: '작지만 빠르다', note: '조랑말 → Tori 자기 은유' },
      { ko: '작고 향 진하고 달아.', zh: '小又香浓又甜。', zhEn: 'Small, fragrant, and sweet.', highlight: '작고 ... 진하고', note: '~고 병렬 + 형용사 3연' },
      { ko: '이 귤은 작지만 향이 진해요.', zh: '这橘子虽小但香浓。', zhEn: 'This tangerine is small but fragrant.', highlight: '작지만 향이 진해요', note: '~지만 대비' },
      { ko: '한국은 좁지만 다양해요.', zh: '韩国虽窄但多样。', zhEn: 'Korea is small but diverse.', highlight: '좁지만 다양해요', note: 'Day 71 여행 감상' },
    ],
    pitfall:
      '① Day 70 은 논쟁, Day 78 은 관찰. 같은 문형이지만 감정 밀도 다름. ② ~지만 은 문학/시적 표현에 자연스러움. Tori 오늘 자기 은유 강함.',
  },

  output: [
    { id: 'd78-o1', kind: 'compose', zhHint: '虽小但快。', zhHintEn: 'Small but fast.', tokens: ['작지만', '빠르다', '작아서', '빨라요', '작고', '느리다'], composeAnswer: ['작지만', '빠르다'], successMsg: 'Tori 인생 명제의 확장.' },
    { id: 'd78-o2', kind: 'listen-choice', audioKo: '이 귤 너 같아. 작고 향 진하고 달아.', successMsg: '✓ Haru의 은유. 사람과 귤의 비유.', choices: [{ zh: '这橘子像你。小、香浓、甜。', zhEn: 'This tangerine is like you. Small, fragrant, and sweet.', correct: true }, { zh: '这橘子不像你。', zhEn: 'This tangerine isn\'t like you.', correct: false }, { zh: '你比橘子大。', zhEn: 'You\'re bigger than a tangerine.', correct: false }, { zh: '橘子甜，你不甜。', zhEn: 'Tangerines are sweet; you\'re not.', correct: false }] },
    { id: 'd78-o3', kind: 'zh-to-ko', zhPrompt: '这橘子虽小但香浓。', zhPromptEn: 'This tangerine is small but fragrant.', successMsg: '"이 귤은 작지만 향이 진해요." — ~지만.', choices: [{ ko: '이 귤은 작지만 향이 진해요.', correct: true }, { ko: '이 귤이 작지만 향은 진해요.', correct: false }, { ko: '이 귤은 작아서 향이 진해요.', correct: false }, { ko: '이 귤은 작은 향이 진해요.', correct: false }] },
    { id: 'd78-o4', kind: 'particle-error', zhHint: '剥了橘子皮。', zhHintEn: 'Peeled the tangerine.', successMsg: '귤 껍질 (橘子皮) + **을** + 벗기다.', successMsgEn: 'Peel the tangerine skin (귤 껍질) + **을** + 벗기다.', choices: [{ ko: '귤 껍질을 벗겼어요.', correct: true }, { ko: '귤 껍질이 벗겼어요.', correct: false }, { ko: '귤 껍질에 벗겼어요.', correct: false }, { ko: '귤의 껍질을 벗기었어요.', correct: false }] },
    { id: 'd78-o5', kind: 'match-pair', successMsg: '✓ Day 78 全对. 조랑말과 귤 — 오늘의 은유들.', successMsgEn: '✓ Day 78 all correct. Pony and tangerine — today\'s metaphors.', pairs: [{ ko: '조랑말', zh: '矮马', zhEn: 'pony' }, { ko: '귤', zh: '橘子', zhEn: 'tangerine' }, { ko: '껍질', zh: '皮', zhEn: 'skin' }, { ko: '새콤달콤', zh: '酸甜', zhEn: 'sweet and sour' }, { ko: '증거', zh: '证据', zhEn: 'evidence' }] },
  ],

  recap: {
    toriPose: 'happy',
    praise: '조랑말과 귤 — 오늘 Tori는 자기와 닮은 두 존재를 만났어요.',
    preview: '明天 제주에서 迷路되면 어떻게 될까? Day 79.', previewEn: 'What if I get lost in Jeju tomorrow? Day 79.',
    stickerId: 'sticker-d78',
    sceneImageUrl: '/images/diary/day-78-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「작지만 강하다 — 어디에 응용?」「제주 특산 뭐가 있어?」', carrotHintEn: 'Today\'s carrots: \'Small but strong — where to apply?\' \'What are Jeju\'s specialties?\'',
};
