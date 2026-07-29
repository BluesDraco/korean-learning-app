import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 71 · 부산 여행 · 고속열차
 *
 * 剧情：四人坐고속열차去부산。Tori第一次坐韩国高铁，兴奋地看窗外。2.5小时就到——
 * 韩语里"빠르다"这个词，她终于有了身体层面的理解。
 *
 * 学习目标：속도/시간 표현 / KTX·좌석 관련 어휘 / ~자 (반말 제안)
 * 语料层级：해요体 + 반말 (친구 사이)
 */
export const day71: ToriDay = {
  level: 'advanced',
  day: 11,
  phase: 'mastery',
  title: '出发부산 · 고속열차',
  subtitle: '2.5小时——韩语里"빠르다"有了体感',
  heroImageUrl: '/images/diary/day-71-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 29일 · 금요일 오전',
    weather: '兽尔 · 맑음 · 이동일',
    toriPose: 'happy',
    diaryText: `11月29日，周五上午 8 点 30 分。

首尔站，KTX 售票口前。

Junho：一号车厢 3-4 号，靠窗。
Minji：零食全带了，四条紫菜卷。
Haru：没带被子吧？车厢里不冷。
我：票拿好了。

第一次坐 KTX。

站在站台上等车进站——风先到，然后是那条蓝色的车身。

我们赶紧上车，我坐到了靠窗的位置。九点整发车。

列车开动的那一刻我脱口而出："진짜 빠르다!"（真的好快！）窗外的风景一直往后拉：楼房 → 村庄 → 农田 → 山 → 河 → 又一片村庄。

Junho 说"这就到大田了"的时候，我才发现——才过了 40 分钟。

到釜山两个半小时。——两个半小时？首尔到釜山就等于半天？

"빠르다"（快）这个词，今天我用身体记住了。

Minji 递过来一条紫菜卷："먹어. 한국 여행 첫 김밥, 창밖 보면서."（吃吧。韩国旅行的第一条紫菜卷，边看窗外边吃。）

我一边嚼一边看着窗外——韩国真的很小，也真的很近。近，让它变得格外亲切。`,
  },

  words: [
    {
      id: 'd71-w1',
      korean: '고속열차',
      hangul: 'go-sok-yeol-cha',
      zh: '高铁',
      pos: '名词',
      example: { ko: '고속열차로 부산에 갔어요.', zh: '坐高铁去了釜山。' },
      tip: 'KTX 정식 명칭. 高(고) + 速(속) + 列车(열차)',
    },
    {
      id: 'd71-w2',
      korean: '창가',
      hangul: 'chang-ga',
      zh: '窗边',
      pos: '名词',
      example: { ko: '창가 좌석이에요.', zh: '是窗边座位。' },
      tip: '窗(창) + 가(边). 창가 좌석 = 靠窗座位',
    },
    {
      id: 'd71-w3',
      korean: '풍경',
      hangul: 'pung-gyeong',
      zh: '风景',
      pos: '名词',
      example: { ko: '차창 밖 풍경이 예뻐요.', zh: '车窗外风景美。' },
      tip: '风(풍) + 景(경). 여행 필수어',
    },
    {
      id: 'd71-w4',
      korean: '빠르다',
      hangul: 'ppa-reu-da',
      zh: '快',
      pos: '形容词',
      example: { ko: '진짜 빠르다!', zh: '真快！' },
      tip: '르 불규칙: 빠르다 → 빨라요. 반의: 느리다',
    },
    {
      id: 'd71-w5',
      korean: '간식',
      hangul: 'gan-sik',
      zh: '零食',
      pos: '名词',
      example: { ko: '간식 챙겼어요.', zh: '带零食了。' },
      tip: '间(간) + 食(식). 여행/기차 필수',
    },
    {
      id: 'd71-w6',
      korean: '실질',
      hangul: 'sil-jjil',
      zh: '实际/实质',
      pos: '名词',
      example: { ko: '실질 반나절 거리예요.', zh: '实际半天路程。' },
      tip: '实(실) + 质(질). 실질적으로 = 实际上',
    },
  ],

  dialogue: {
    scene: 'KTX 1호차·좌석',
    setting: {
      time: '周五 09:00',
      place: '서울역 → 부산 열차',
      npc: 'Junho / Minji / Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '1호차 3-4번, 창가 쪽이야. 얼른 자리 잡자.',
        hangul: 'il-ho-cha sam-sa-beon, chang-ga jjo-gi-ya. eol-leun ja-ri jap-ja',
        zh: '1车厢3-4号，窗边。快占座。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '와, 창가로 앉을 수 있어? 최고야!',
        hangul: 'wa, chang-ga-ro an-jeul su i-sseo? choe-go-ya!',
        zh: '哇，能坐窗边？最棒了！',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '자, 김밥. 창밖 보면서 먹자.',
        hangul: 'ja, gim-bap. chang-bak bo-myeon-seo meok-ja',
        zh: '来，紫菜卷。看着窗外吃吧。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '진짜 빠르다! 풍경이 흘러가.',
        hangul: 'jin-jja ppa-reu-da! pung-gyeong-i heul-leo-ga',
        zh: '真快！风景在流过。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '이제 대전이야. 40분 지났어.',
        hangul: 'i-je dae-jeo-ni-ya. sa-sip-bun ji-na-sseo',
        zh: '现在到大田了。过了40分钟。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru 说40分钟到大田. Tori 想说"韩国真近!". 合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '한국 진짜 좁고 가깝다.', zh: '韩国真小又近。', correct: true },
          { ko: '진짜 멀다.', zh: '真远。', correct: false },
          { ko: '난 아직 안 도착했어.', zh: '我还没到。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '一起做___吧（반말 提议）：~자',
    pattern: 'V + **자** (반말 제안)',
    whenToUse: 'Day 37 学过 ~(으)ㄹ까요? / ~(으)ㄹ래요? (敬语提议). Day 71 = **반말 자연스러운 친구 제안**. Junho 说 「자리 **잡자**」= 占座吧. ~자 = 韩语最简短的"一起做___吧". 여행/친구 상황 필수.',
    rules: [
      '**基本公式**：V + 자 = 一起___吧. 가다 → 가자. 먹다 → 먹자',
      '**~자 vs ~(으)ㄹ래? vs ~(으)ㄹ까?**: ~자 = 直接提议. ~ㄹ래 = 问对方. ~ㄹ까 = 商量',
      '**부정 제안 → ~지 말자**: 가지 말자 = 别去了',
      '**격식 up → ~읍시다 / 해요体 ~아/어요**: 가요 (해요), 갑시다 (격식)'
    ],
    examples: [
      { ko: '얼른 자리 잡자.', zh: '快占座吧。', highlight: '잡자', note: '잡다 → 잡자. Junho 원문' },
      { ko: '창밖 보면서 먹자.', zh: '看窗外吃吧。', highlight: '먹자', note: '먹다 → 먹자. Minji 원문' },
      { ko: '오늘은 늦지 말자.', zh: '今天别晚了。', highlight: '늦지 말자', note: '늦다 → 늦지 말자 (부정 제안)' },
      { ko: '커피 마시러 가자.', zh: '去喝咖啡吧。', highlight: '가자', note: '가다 → 가자. 친구 사이의 즉흥 제안' },
    ],
    pitfall:
      '① **~자 = 반말**. 长辈에게는 절대 안 씀. 정중은 ~(으)ㄹ까요? / ~읍시다. ② ~자 는 아주 즉흥적/친밀한 뉘앙스. 심각한 상황엔 안 어울림. ③ Day 37의 ~(으)ㄹ까요? vs Day 71의 ~자 — 존댓말 vs 반말이 유일 차이지만 사용 상황 다름. 友谊 = ~자, 정중 = ~(으)ㄹ까요. ④ ~지 말자 = 부정 제안 (Day 65 ~지 마 + 자).',
  },

  output: [
    {
      id: 'd71-o1',
      kind: 'compose',
      zhHint: '看窗外吃吧。',
      tokens: ['창밖 보면서', '먹자', '먹어요', '먹을래', '창밖 보고', '먹었어'],
      composeAnswer: ['창밖 보면서', '먹자'],
      successMsg: 'Minji 원문. ~자 = 반말 제안.',
    },
    {
      id: 'd71-o2',
      kind: 'listen-choice',
      audioKo: '진짜 빠르다! 풍경이 흘러가.',
      successMsg: '✓ KTX 첫 감상. 빠르다 = 快.',
      choices: [
        { zh: '真快！风景在流过。', correct: true },
        { zh: '真慢！风景不动。', correct: false },
        { zh: '真远！风景没变。', correct: false },
        { zh: '快到了！', correct: false },
      ],
    },
    {
      id: 'd71-o3',
      kind: 'zh-to-ko',
      zhPrompt: '今天别晚了。',
      successMsg: '"오늘은 늦지 말자." — ~지 말자 (부정 제안).',
      choices: [
        { ko: '오늘은 늦지 말자.', correct: true },
        { ko: '오늘은 늦지 마자.', correct: false },
        { ko: '오늘은 늦지 안자.', correct: false },
        { ko: '오늘은 늦지 말아요.', correct: false },
      ],
    },
    {
      id: 'd71-o4',
      kind: 'particle-error',
      zhHint: '看窗外风景。',
      successMsg: '차창 (窗) + 밖 (外) = 차창 밖. 소유격 없이 관용.',
      choices: [
        { ko: '차창 밖 풍경이 예뻐요.', correct: true },
        { ko: '차창의 밖 풍경이 예뻐요.', correct: false },
        { ko: '차창 밖에서 풍경이 예뻐요.', correct: false },
        { ko: '차창 밖에 풍경을 예뻐요.', correct: false },
      ],
    },
    {
      id: 'd71-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 71 全对. 창가의 김밥, 흘러가는 풍경.',
      pairs: [
        { ko: '고속열차', zh: '高铁' },
        { ko: '창가', zh: '窗边' },
        { ko: '풍경', zh: '风景' },
        { ko: '빠르다', zh: '快' },
        { ko: '간식', zh: '零食' },
      ],
    },
  ],

  recap: {
    toriPose: 'happy',
    praise: 'KTX 첫 경험. "빠르다"의 몸감. 2시간 반의 거리감.',
    preview: '明天 부산 해운대 — 처음 보는 바다.',
    stickerId: 'sticker-d71',
    sceneImageUrl: '/images/diary/day-71-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~자 어떤 상황에 자연스러워?」「KTX vs 일반 열차 차이?」',
};
