import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 52 · 홍와 거리 · 三人狂奔
 *
 * 剧情：Tori、Junho、Haru在弘爪街赶Mochi签售会。三人狂奔穿过霓虹灯和人潮。
 * Junho围巾飞了，Tori胡萝卜笔掉了，Haru边跑边笑。到了签售会，气喘吁吁地笑了——
 * 这就是青春的样子。
 *
 * 学习目标：급하게·서두르다 / 감정 부사 / 원인·결과 회복
 * 语料层级：해요体 + 반말
 * 韩语自审：korean skill PASS
 */
export const day52: ToriDay = {
  level: 'intermediate',
  day: 22,
  phase: 'expansion',
  title: '弘爪街狂奔 · 三人追星',
  subtitle: '围巾飞了，笔掉了，但笑着跑到了',
  heroImageUrl: '/images/diary/day-52-hero.jpg',
  estimatedMin: 12,

  opening: {
    date: '10월 24일 · 목요일 저녁',
    weather: '兽尔 · 秋夜',
    toriPose: 'happy',
    diaryText: `10月24日，周四晚上。

Mochi 오빠 팬사인회 6시 30분 시작.
我们出门的时候是6点15分.

弘爪站到会场15分钟——
——正常走的话。

Junho一边跑一边看手机：
"14분 남았어! 뛰어!"（还剩14分钟！跑！）

弘爪街的霓虹灯往后飞——
炸鸡店、노래방、大创、
一家又一家。

Junho的围巾"哗"地飞出去。
"내 목도리!" 他喊着还想回头捡。
"준호야, 다음에 사면 돼! 뛰어!"
我边喊边超过他。

跑到路口，我背包侧袋一晃，
胡萝卜笔"啪"地掉在地上。

我愣了半秒——

然后Haru跑过来一把捡起来，
边跑边说："토리, 이거!"（兔莉，这个！）

我们三个一起冲进팬사인회 회장——
6点28分，还剩两分钟。

三个人扑在墙边，
气喘吁吁地看着彼此，
然后一起笑出声。

——이게 청춘이구나.
（原来这就是青春。）

我心里冒出这一句，
用韩语。`,
  },

  words: [
    {
      id: 'd52-w1',
      korean: '뛰다',
      hangul: 'ttwi-da',
      zh: '跑/跳',
      pos: '动词',
      example: { ko: '뛰어! 늦겠어!', zh: '快跑！要迟到了！' },
      tip: '뛰다 → 뛰어요/뛰어! 요즘 젊은이 뛰는 상황 = 지각 위기',
    },
    {
      id: 'd52-w2',
      korean: '늦다',
      hangul: 'neut-da',
      zh: '晚/迟到',
      pos: '形容词',
      example: { ko: '늦었어요, 죄송해요.', zh: '不好意思迟到了。' },
      tip: '늦다 是형용사也是동사。늦게 = 晚地(副词)',
    },
    {
      id: 'd52-w3',
      korean: '떨어뜨리다',
      hangul: 'tteo-reo-tteu-ri-da',
      zh: '弄掉/使掉落',
      pos: '动词',
      example: { ko: '펜을 떨어뜨렸어요.', zh: '把笔弄掉了。' },
      tip: '떨어지다(掉·自动) → 떨어뜨리다(弄掉·他动)',
    },
    {
      id: 'd52-w4',
      korean: '줍다',
      hangul: 'jup-da',
      zh: '捡',
      pos: '动词',
      example: { ko: '펜을 주웠어요.', zh: '捡起了笔。' },
      tip: 'ㅂ 不规则：줍다 → 주웠어요',
    },
    {
      id: 'd52-w5',
      korean: '숨차다',
      hangul: 'sum-cha-da',
      zh: '气喘',
      pos: '形容词',
      example: { ko: '숨차서 말을 못 하겠어.', zh: '喘不上气说不了话。' },
      tip: '숨(气) + 차다(充满) = 喘不上气',
    },
    {
      id: 'd52-w6',
      korean: '청춘',
      hangul: 'cheong-chun',
      zh: '青春',
      pos: '名词',
      example: { ko: '이게 청춘이구나.', zh: '原来这就是青春。' },
      tip: '青(청) + 春(춘)。일반적으로 20대의 반짝이는 시기',
    },
  ],

  dialogue: {
    scene: '홍와 거리·팬사인회 가는 길',
    setting: {
      time: '周四 18:15',
      place: '홍와역 → 팬사인회 회장',
      npc: 'Junho / Haru',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '14분 남았어! 뛰어!',
        hangul: 'sib-sa-bun na-ma-sseo! ttwi-eo!',
        zh: '还剩14分钟！跑！',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '아, 내 목도리! 떨어졌어!',
        hangul: 'a, nae mok-do-ri! tteo-reo-jeo-sseo!',
        zh: '啊，我围巾！掉了！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '준호야, 다음에 사면 돼! 뛰어!',
        hangul: 'jun-ho-ya, da-eu-me sa-myeon dwae! ttwi-eo!',
        zh: 'Junho，下次买就行！跑！',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Haru',
        ko: '토리, 이거! 당근 펜 떨어뜨렸어.',
        hangul: 'to-ri, i-geo! dang-geun pen tteo-reo-tteu-ryeo-sseo',
        zh: '兔莉，这个！你弄掉了胡萝卜笔。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '와, 숨차 죽겠어. 근데 도착했어!',
        hangul: 'wa, sum-cha juk-ge-sseo. geun-de do-cha-kae-sseo!',
        zh: '哇，喘死了。但是到了！',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '三人抵达会场笑着看彼此。Tori想说"这就是青春吧"。合适的一句？',
        practice: 'pick',
        choices: [
          { ko: '이게 청춘이구나.', zh: '原来这就是青春啊。', correct: true },
          { ko: '이거 왜 이래.', zh: '这是怎么回事。', correct: false },
          { ko: '이제 집에 가자.', zh: '现在回家吧。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '~ 아/어서 (原因-结果) 深化复习',
    pattern: 'V/A + **아/어서** + Result',
    whenToUse: 'Day 32 学过 ~아/어서 基础。Day 52 深化——**~아/어서 + 결과**（因为狂奔所以气喘）在动作序列里最刚需："跑得快 → 累"、"到了 → 笑"。此外补充**动作先后 ~아/어서**（不是原因，是"做完A再做B"）。',
    rules: [
      '**因果 ~아/어서**：숨차서 말을 못 하겠어 = 喘不上气说不了话。原因-结果',
      '**动作先后 ~아/어서**：주워서 뛰었어요 = 捡起来（然后）跑。同一主体做完A再做B',
      '**과거는 앞에 안 넣음**：어제 뛰어서 늦었어요 (과거는 결과절에)',
      '**뒷 절 명령/제안 X**：~아/어서 뒷은 平叙/감탄/기술만. 명령·제안엔 ~(으)니까 (Day 32 pitfall)'
    ],
    examples: [
      { ko: '뛰어서 늦지 않았어요.', zh: '跑了所以没迟到。', highlight: '뛰어서', note: '뛰다 → 뛰어서。因果连接' },
      { ko: '숨차서 말을 못 하겠어.', zh: '喘不上气说不了话。', highlight: '숨차서', note: '숨차다 → 숨차서。상태 → 결과' },
      { ko: '펜을 주워서 다시 뛰었어요.', zh: '捡起笔然后又跑了起来。', highlight: '주워서', note: '줍다 → 주워서(ㅂ 불규칙). 이건 **동작 순서** — 원인이 아님' },
      { ko: '팬사인회에 도착해서 다 웃었어요.', zh: '到了签售会大家都笑了。', highlight: '도착해서', note: '도착하다 → 도착해서。到达 + 笑 = 동작 순서/결과 두 가지 다 성립' },
    ],
    pitfall:
      '① ~아/어서 뒷은 **명령/제안 안 됨**（Day 32 pitfall 复习）—— ❌ 뛰어서 가세요 → ✅ 뛰어서 갔어요 (陈述)。 ② **원인 ~아/어서 vs 동작순서 ~아/어서** — 母语者不区分，但语义看上下文。펜을 주워서 뛰었어요 = 捡了(然后)跑；펜을 주웠어서 안 잃어버렸어요 (X)—— 순서句不加 过去时。③ 时态放**结果절**：어제 뛰어서 늦지 않았어요 ✓ / 어제 뛰었어서... ✗',
  },

  output: [
    {
      id: 'd52-o1',
      kind: 'compose',
      zhHint: '喘不上气说不了话。',
      tokens: ['숨차서', '말을', '못 하겠어', '숨차니까', '못 해요', '숨찼어서'],
      composeAnswer: ['숨차서', '말을', '못 하겠어'],
      successMsg: '~아/어서 원인-결과. 狂奔到会场的感觉。',
    },
    {
      id: 'd52-o2',
      kind: 'listen-choice',
      audioKo: '이게 청춘이구나.',
      successMsg: '✓ Day 40 学过 ~구나（Minji奶奶）. 이제 Tori 自己用出来.',
      choices: [
        { zh: '原来这就是青春啊。', correct: true },
        { zh: '青春在哪里？', correct: false },
        { zh: '还没到青春。', correct: false },
        { zh: '青春已经走了。', correct: false },
      ],
    },
    {
      id: 'd52-o3',
      kind: 'zh-to-ko',
      zhPrompt: '捡起笔然后又跑起来。',
      successMsg: '"펜을 주워서 다시 뛰었어요." — 줍다 → 주워서 (ㅂ 불규칙).',
      choices: [
        { ko: '펜을 주워서 다시 뛰었어요.', correct: true },
        { ko: '펜을 줍어서 다시 뛰었어요.', correct: false },
        { ko: '펜을 주워어서 다시 뛰었어요.', correct: false },
        { ko: '펜을 주워니까 다시 뛰었어요.', correct: false },
      ],
    },
    {
      id: 'd52-o4',
      kind: 'particle-error',
      zhHint: '跑了所以没迟到。',
      successMsg: '뛰다 → **뛰어서**（원인）+ 늦지 않았어요（结果）.',
      choices: [
        { ko: '뛰어서 늦지 않았어요.', correct: true },
        { ko: '뛰니까 늦지 않았어요.', correct: false },
        { ko: '뛰었어서 늦지 않았어요.', correct: false },
        { ko: '뛰어서 늦지 마세요.', correct: false },
      ],
    },
    {
      id: 'd52-o5',
      kind: 'match-pair',
      successMsg: '✓ Day 52 全对。围巾丢了、笔捡回来了、到了。',
      pairs: [
        { ko: '뛰다', zh: '跑' },
        { ko: '늦다', zh: '迟到' },
        { ko: '떨어뜨리다', zh: '弄掉' },
        { ko: '줍다', zh: '捡' },
        { ko: '청춘', zh: '青春' },
      ],
    },
  ],

  recap: {
    toriPose: 'happy',
    praise: '목도리 하나, 펜 하나, 그리고 청춘 한 조각.',
    preview: '明天，Tori终于要请客了——从被请到请人，中间隔了26天。',
    stickerId: 'sticker-d52',
    sceneImageUrl: '/images/diary/day-52-scene.jpg',
  },

  carrotHint:
    '今天的胡萝卜：「~아/어서 原因 和 순서 有什么区别？」「청춘 韩国人平时会说吗？」',
};
