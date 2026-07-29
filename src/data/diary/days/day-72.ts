import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 72 · 해운대 · 大海
 *
 * 剧情：四人去해운대海滩。Tori第一次在韩国看海。파도的声音、모래的触感、바람的味道——
 * 这些不需要韩语就能懂。Junho说釜山的海最漂亮，Tori觉得可能是对的。
 *
 * 学习目标：자연 어휘 / 감각 표현 / ~네요 (Day 31 深化 · 감탄)
 * 语料层级：해요体 · 감성 서술
 */
export const day72: ToriDay = {
  level: 'advanced',
  day: 12,
  phase: 'mastery',
  title: '해운대 · 大海',
  subtitle: '不需要韩语，海就是海',
  heroImageUrl: '/images/diary/day-72-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '11월 29일 · 금요일 오후',
    weather: '부산 · 맑음 · 초겨울 바다',
    toriPose: 'happy',
    diaryText: `11月29日，同一天，下午。

到釜山了。行李放进酒店，立刻直奔海云台。

——海。

在中国内陆长大的我，很少见到海。眼前这一片——蓝到天际的天空、银色的浪花、白色的沙滩。

浪声一层一层扑过来，철석—— 철석——中间夹着海鸥的叫声。

我在沙滩上坐下。沙子是暖的，被太阳晒过。抓一把在手心里——软的，也是沉的。

风迎面扑来。海的味道。咸味混着海带的味道。——和中国海边的气味有一点点不一样。

Junho 在旁边说："부산 바다가 한국에서 제일 예뻐."（釜山的海是韩国最美的。）

我想接话，最后还是没说。——不用说什么，我懂。

浪、沙、风。这是不需要韩语就能听懂的语言。

Haru 悄悄坐到我旁边。她也没说话。

Minji 在拍照。Junho 追着浪跑。

我——只是看着。就这样过了三十分钟。`,
  },

  words: [
    {
      id: 'd72-w1',
      korean: '바다',
      hangul: 'ba-da',
      zh: '大海',
      pos: '名词',
      example: { ko: '바다 처음 봤어요.', zh: '第一次看到大海。' },
      tip: '한국어 최기초 명사. 바닷가 = 海边',
    },
    {
      id: 'd72-w2',
      korean: '파도',
      hangul: 'pa-do',
      zh: '海浪',
      pos: '名词',
      example: { ko: '파도 소리가 들려요.', zh: '听得到海浪声。' },
      tip: '波(파) + 涛(도). 파도가 치다 = 海浪拍打',
    },
    {
      id: 'd72-w3',
      korean: '모래',
      hangul: 'mo-rae',
      zh: '沙子',
      pos: '名词',
      example: { ko: '모래가 따뜻해요.', zh: '沙子很温暖。' },
      tip: '해변의 필수. 모래사장 = 沙滩',
    },
    {
      id: 'd72-w4',
      korean: '수평선',
      hangul: 'su-pyeong-seon',
      zh: '地平线/水平线',
      pos: '名词',
      example: { ko: '수평선 끝까지 파랬어요.', zh: '直到水平线都是蓝的。' },
      tip: '水(수) + 平(평) + 线(선). 시적 표현',
    },
    {
      id: 'd72-w5',
      korean: '갈매기',
      hangul: 'gal-mae-gi',
      zh: '海鸥',
      pos: '名词',
      example: { ko: '갈매기 소리가 들려요.', zh: '听得到海鸥声。' },
      tip: '고유어. 해안 대표 새',
    },
    {
      id: 'd72-w6',
      korean: '냄새',
      hangul: 'naem-sae',
      zh: '气味',
      pos: '名词',
      example: { ko: '바다 냄새가 나요.', zh: '有海的味道。' },
      tip: 'Day 37 学过. 냄새가 나다 = 有...味',
    },
  ],

  dialogue: {
    scene: '해운대 해변·조용한 오후',
    setting: {
      time: '周五 15:00',
      place: '부산 해운대 해변',
      npc: 'Junho / Haru / Minji',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '토리, 이게 부산 바다야. 한국에서 제일 예뻐.',
        hangul: 'to-ri, i-ge bu-san ba-da-ya. han-gu-ge-seo je-il ye-ppeo',
        zh: '兔莉，这就是釜山的海。韩国最美。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '와… 진짜 예쁘네요.',
        hangul: 'wa… jin-jja ye-ppeu-ne-yo',
        zh: '哇……真美。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        isInnerVoice: true,
        ko: '말 안 해도 알겠어. 이건 한국어가 없어도 이해되는 언어야.',
        hangul: 'mal an hae-do al-ge-sseo. i-geon han-gu-geo-ga eop-seo-do i-hae-doe-neun eon-eo-ya',
        zh: '不说话也懂。这是不需要韩语的语言。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '파도 소리가 노래 같네요.',
        hangul: 'pa-do so-ri-ga no-rae gan-ne-yo',
        zh: '海浪声像歌一样。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '조용히 앉아 있어도 괜찮아. 바다는 그런 곳이야.',
        hangul: 'jo-yong-hi an-ja i-sseo-do gwaen-cha-na. ba-da-neun geu-reon go-si-ya',
        zh: '静静坐着也可以。海就是这样的地方。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: 'Haru 说"静坐也行". Tori 想同意并加一句"感觉真好". 合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '응, 아무 말 안 해도 마음이 편해져.', zh: '嗯，不说话也心里舒服。', correct: true },
          { ko: '아니, 계속 말해야 돼.', zh: '不行，一直得说话。', correct: false },
          { ko: '이제 돌아가자.', zh: '现在回去吧。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '真___呢 (现场감탄)：~네요 (Day 31 深化)',
    pattern: 'V/A + **네요** · N + **(이)네요**',
    whenToUse: 'Day 31 学过 ~네요 基础. Day 72 = **자연/감정 감탄** 상황의 활용. Tori 说 「진짜 예쁘**네요**」= 真美呢. 파도 소리가 노래 **같네요** = 海浪声像歌呢. 자연 감상/음식/공연 등 现場发现 순간의 최적 句尾.',
    rules: [
      '**基本公式**：V/A + 네요 = 现場발견의 감탄',
      '**~것 같네요** = 好像/似乎: 노래 같네요 = 像歌呢. Day 39 ~는 것 같아요와 다름 (감탄 vs 추측)',
      '**ㄹ 어간 → 삭제**: 살다 → 사네요 (ㄹ + ㄴ = ㄹ 삭제)',
      '**과거 감탄 → ~았/었네요**: 왔네요 = 来了呢. 상대의 도착 발견 시'
    ],
    examples: [
      { ko: '진짜 예쁘네요.', zh: '真美呢。', highlight: '예쁘네요', note: '예쁘다 → 예쁘네요. 감탄 정석' },
      { ko: '파도 소리가 노래 같네요.', zh: '海浪声像歌呢。', highlight: '같네요', note: '같다 → 같네요. 비유 감탄' },
      { ko: '한국 바다가 진짜 다양하네요.', zh: '韩国海真多样呢。', highlight: '다양하네요', note: '다양하다 → 다양하네요. 여행 발견' },
      { ko: '벌써 3시가 됐네요.', zh: '已经3点了呢。', highlight: '됐네요', note: '되다 → 됐네요 (과거). 시간 발견' },
    ],
    pitfall:
      '① Day 31 기본 ~네요. Day 72 는 **자연/공연/여행 감상** 특화. 발견 순간 첫 반응. ② ~네요 vs ~구나 (Day 40): ~네요 = 敬语 통용. ~구나 = 반말 独语/长辈에게 只. 오늘 관광객 감탄은 ~네요가 자연. ③ ~같네요 (같+네요) = 비유 감탄. ~같아요 = 비유 平叙. 뉘앙스 미묘 차. ④ ㅂ/ㄷ 불규칙 동사는 규칙 따름: 춥다 → 춥네요, 걷다 → 걷네요.',
  },

  output: [
    {
      id: 'd72-o1',
      kind: 'compose',
      zhHint: '海浪声像歌呢。',
      tokens: ['파도 소리가', '노래 같네요', '노래이네요', '노래를', '노래 같아요', '노래 있네요'],
      composeAnswer: ['파도 소리가', '노래 같네요'],
      successMsg: '~같네요 = 比喻感叹. 바다 앞의 한 문장.',
    },
    {
      id: 'd72-o2',
      kind: 'listen-choice',
      audioKo: '조용히 앉아 있어도 괜찮아. 바다는 그런 곳이야.',
      successMsg: '✓ Haru의 한 마디. 침묵도 대화.',
      choices: [
        { zh: '静静坐着也可以。海就是这样的地方。', correct: true },
        { zh: '安静地坐着不行。', correct: false },
        { zh: '海很吵。', correct: false },
        { zh: '不能坐在这里。', correct: false },
      ],
    },
    {
      id: 'd72-o3',
      kind: 'zh-to-ko',
      zhPrompt: '已经3点了呢。',
      successMsg: '"벌써 3시가 됐네요." — 되다 → 됐네요 (과거 감탄).',
      choices: [
        { ko: '벌써 3시가 됐네요.', correct: true },
        { ko: '벌써 3시가 되네요.', correct: false },
        { ko: '벌써 3시가 된 것 같아요.', correct: false },
        { ko: '벌써 3시가 있네요.', correct: false },
      ],
    },
    {
      id: 'd72-o4',
      kind: 'particle-error',
      zhHint: '有海的味道。',
      successMsg: '냄새 + 이/가 + 나다. Day 37 复习. 바다 냄새 = 修饰.',
      choices: [
        { ko: '바다 냄새가 나요.', correct: true },
        { ko: '바다 냄새를 나요.', correct: false },
        { ko: '바다 냄새가 있어요 나요.', correct: false },
        { ko: '바다의 냄새를 있어요.', correct: false },
      ],
    },
    {
      id: 'd72-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 72 全对. 파도, 모래, 바람 — 오늘의 언어.',
      pairs: [
        { ko: '바다', zh: '大海' },
        { ko: '파도', zh: '海浪' },
        { ko: '모래', zh: '沙子' },
        { ko: '수평선', zh: '地平线' },
        { ko: '갈매기', zh: '海鸥' },
      ],
    },
  ],

  recap: {
    toriPose: 'happy',
    praise: '한국의 첫 바다. 말 안 해도 이해되는 언어를 만났어요.',
    preview: '明天 부산 해산물 시장 — 살아있는 낙지가 기다린다.',
    stickerId: 'sticker-d72',
    sceneImageUrl: '/images/diary/day-72-scene.jpg',
  },

  carrotHint: '今天的胡萝卜: 「~네요 감탄 어떻게 자연스럽게?」「해운대 왜 유명?」',
};
