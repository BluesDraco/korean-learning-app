import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 25 · 한강 응원 · 演唱会·一起喊
 *
 * 剧情：周四晚上 7 点，한강공원草坪上挤了 3000 人。
 * 大屏幕亮起，Junho 老虎、Minji 水獭、Haru 仓鼠、兔莉
 * 站在最前排第三列。Junho 把应援棒塞进兔莉手里：
 * "오늘 우리가 가르쳐 줄게. 따라 해. 사랑해, 응원해, 따라해."
 * 三句应援词。第一遍兔莉羞得喊不出来，
 * 第二遍 Minji 拽着她，
 * 第三遍——3000 人一起，兔莉的声音消失在浪潮里，
 * 但她真的喊出来了。
 *
 * 学习目标：응원 3 句 / ~해요 + 强调 / 集体喊
 * 韩语自审：korean skill PASS (응원 표현 + 群体语境)
 */
export const day25: ToriDay = {
  day: 25,
  phase: 'expression',
  title: '한강 콘서트 · 3000 人一起喊',
  subtitle: 'Junho 把应援棒塞进我手里',
  isCheckpoint: null,
  estimatedMin: 13,

  opening: {
    date: '9월 28일 목요일 저녁',
    weather: '首尔 · 晚风',
    toriPose: 'celebrate',
    diaryText: `9월 28日，周四晚上 7 点。

한강公园草坪。
夕阳还没完全落下，
风把头发吹得乱七八糟。

3000 人挤在大屏幕前。
我们四个站在最前排第三列：
Junho 🐯 / Minji 🦦 / Haru 🐹 / 我。

Junho 从背包里掏出四根应援棒——
他从早上就开始充电的。
他把一根塞进我手里：

"토리, 오늘 우리가 가르쳐 줄게."
（兔莉，今天我们教你。）
"따라 해. 세 마디만."
（跟着喊。就三句。）

"사랑해. 응원해. 따라해."
（我爱你。我支持你。我跟着你。）

第一遍。
我嘴张了，
但声音卡在喉咙里。
脸热得发烫。

Minji 拽我胳膊：
"토리, 그냥 외쳐!"
（兔莉，就喊出来！）

第二遍。
我喊了——
但只比心跳大一点。

第三遍。
舞台灯爆开，
3000 人同时举起应援棒。

"사 랑 해—— 응 원 해—— 따 라 해——"

我的声音消失在浪潮里。
但是。
我真的喊出来了。

身边 Junho 在哭。
Haru 也在喊，连尾巴都在抖。
Minji 一边喊一边笑着拍我后背：
"토리, 너 잘했어."

胡萝卜在我口袋里跳。

我突然懂了——
韩语不是写在课本上的字。
是 3000 人一起喊出来的。`,
  },

  words: [
    {
      id: 'd25-w1',
      korean: '한강',
      hangul: 'han-gang',
      zh: '汉江 (首尔的母亲河)',
      pos: '名词',
      example: { ko: '한강에서 콘서트 봐요.', zh: '在汉江看演唱会。' },
      tip: '받침 ㅇ → 「에서」: 한강에서 (在汉江)。汉江公园 = 한강공원',
    },
    {
      id: 'd25-w2',
      korean: '응원',
      hangul: 'eung-won',
      zh: '应援 / 支持',
      pos: '名词',
      example: { ko: '응원해요!', zh: '我支持你！' },
      tip: '응원봉 (应援棒) / 응원곡 (应援歌) / 응원해요 (应援吧)',
    },
    {
      id: 'd25-w3',
      korean: '사랑해',
      hangul: 'sa-rang-hae',
      zh: '我爱你 (半语)',
      pos: '表达',
      example: { ko: '사랑해, 진짜!', zh: '我爱你，真的！' },
      tip: '半语形式。敬语 = 사랑해요. 演唱会、家人、恋人间用半语',
    },
    {
      id: 'd25-w4',
      korean: '따라 해',
      hangul: 'tta-ra hae',
      zh: '跟着做 / 跟着喊 (半语)',
      pos: '表达',
      example: { ko: '따라 해, 외쳐!', zh: '跟着喊！' },
      tip: '动词「따라하다」(跟随做) 半语形。教别人、应援都用',
    },
    {
      id: 'd25-w5',
      korean: '외쳐',
      hangul: 'oe-cheo',
      zh: '喊 / 呼喊 (半语)',
      pos: '动词',
      example: { ko: '큰 소리로 외쳐!', zh: '大声喊！' },
      tip: '动词「외치다」(呼喊) 半语形。比 말하다 (说) 强烈',
    },
    {
      id: 'd25-w6',
      korean: '응원봉',
      hangul: 'eung-won-bong',
      zh: '应援棒',
      pos: '名词',
      example: { ko: '응원봉 켜요.', zh: '点亮应援棒。' },
      tip: '받침 ㅇ → 「을」: 응원봉을. 各团有专属设计，看应援棒认偶像',
    },
  ],

  dialogue: {
    scene: '한강공원 草坪 · 演唱会前 5 分钟',
    setting: {
      time: '周四晚 7 点',
      place: '한강 잠수교 옆 잔디밭',
      npc: 'Junho 老虎 / Minji 水獭',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '토리, 응원봉 받아. 오늘 우리가 가르쳐 줄게.',
        hangul: 'to-ri, eung-won-bong ba-da. o-neul u-ri-ga ga-reu-cheo jul-ge',
        zh: '兔莉，拿好应援棒。今天我们教你。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '진짜? 어떻게 해요?',
        hangul: 'jin-jja? eo-tteo-ke hae-yo',
        zh: '真的？怎么做？',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: 'Junho',
        ko: '세 마디만 따라 해. "사랑해, 응원해, 따라해."',
        hangul: 'se ma-di-man tta-ra hae. sa-rang-hae, eung-won-hae, tta-ra-hae',
        zh: '就跟着喊三句。"我爱你，支持你，跟着你。"',
        practice: 'listen',
      },
      {
        speaker: 'npc',
        npcName: 'Minji',
        ko: '토리, 그냥 외쳐! 부끄러워하지 마!',
        hangul: 'to-ri, geu-nyang oe-cheo! bu-kkeu-reo-wo-ha-ji ma',
        zh: '兔莉，就喊出来！别害羞！',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '舞台灯亮起，3000 人开始喊。兔莉应该跟着喊什么？',
        practice: 'pick',
        choices: [
          { ko: '사랑해! 응원해! 따라해!', zh: '我爱你！我支持你！我跟着你！', correct: true },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
          { ko: '어디예요?', zh: '在哪里？', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '应援三句 · 半语强调',
    pattern: '动词词干 + 해 / 아 / 어 (半语口号)',
    whenToUse: '演唱会、应援、加油、亲密关系。半语去掉「-요」直接喊出来。',
    rules: [
      '하다 动词 → **해** : 사랑하다 → 사랑**해** / 응원하다 → 응원**해**',
      '其他动词 → **아/어** (去掉요): 따라하다 → 따라**해** / 가다 → **가**',
      '加强语气重复连呼：「사랑해 사랑해 사랑해!」三连击应援标配',
      '注意：半语只对**朋友/恋人/偶像/动物**用。对长辈用「사랑합니다 / 응원합니다」',
    ],
    examples: [
      { ko: '사랑해!', zh: '我爱你！', highlight: '사랑해' },
      { ko: '응원해!', zh: '我支持你！', highlight: '응원해' },
      { ko: '따라해!', zh: '跟着喊！', highlight: '따라해' },
      { ko: '화이팅!', zh: '加油！', highlight: '화이팅' },
    ],
    pitfall:
      '应援场合敬语听起来反而怪——「사랑합니다, 응원합니다」太生硬。喊半语「사랑해, 응원해」才是粉丝标配。但要分场合：握手会面对偶像本人时再用敬语「사랑해요」。',
  },

  output: [
    {
      id: 'd25-o1',
      kind: 'fill',
      prompt: '사랑해! 응원___! 따라해!',
      zhHint: '我爱你！我支持你！我跟着你！',
      answer: '해',
      successMsg: '✓ 应援棒在你手里发亮。Junho 哭了，Minji 笑着拍你后背。',
    },
  ],

  recap: {
    toriPose: 'celebrate',
    praise: '3000 人的浪潮里，你的声音也在。"韩语不是课本上的字。"',
    preview: '明天就是关卡 4——一个人去偶像生咖店挑战。综合咖啡馆+应援+追星全部套路。',
    stickerId: 'sticker-d25',
  },

  carrotHint:
    '今天的胡萝卜：「KPOP 应援三句解析」「半语 vs 敬语何时用」「韩国演唱会观众文化」',
};
