import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 14 · 关卡 2 · 独立咖啡馆点单完整流程
 *
 * 剧情：兔莉特意一个人来到学校附近一家从没去过的新店——「하루카페」。
 * 没有 Junho、没有 Haru、没有 Minji。
 * 推开门，一只大狗店员（金毛）站在收银台后。
 * 这是 Tori 一个人完成完整咖啡馆订单的真正考试。
 * 从打招呼到选规格到付款到道谢，6 句对话全程独立完成。
 *
 * 学习目标：综合 Week 2 全部 / 咖啡馆完整流程
 * 韩语自审：korean skill PASS（综合连贯）
 */
export const day14: ToriDay = {
  level: 'beginner',
  day: 14,
  phase: 'foundation',
  title: '关卡 2 · 一个人去咖啡馆点单',
  subtitle: '没有朋友帮忙，从打招呼到道谢全靠自己',
  isCheckpoint: 14,
  estimatedMin: 15,

  opening: {
    date: '9월 15일 금요일 오후',
    weather: '兽尔 · 晴',
    toriPose: 'cheer',
    diaryText: `9月 15日，周五下午。

我决定一个人去一家新咖啡馆。
不告诉 Junho、不喊 Haru、不发 Minji 微信。
这是我的"독립" (独立) 考试。

学校后门拐角的"하루카페"。
推开门——
金毛大狗店员从吧台后探出头：
"어서 오세요!"
（欢迎光临！）

我深呼吸。
胡萝卜在背包里。
我已经会买饭、会问价钱、会去药店、
会说"얼음 빼고"。

今天，要把它们全部用上。

📦 关卡 2 开始。`,
  },

  words: [
    {
      id: 'd14-w1',
      korean: '주문',
      hangul: 'ju-mun',
      zh: '订单 / 点单',
      pos: '名词',
      example: { ko: '주문 도와드릴게요.', zh: '我帮您点单。' },
      tip: '받침 ㄴ → 「을」: 주문을 / 주문은',
    },
    {
      id: 'd14-w2',
      korean: '사이즈',
      hangul: 'sa-i-jeu',
      zh: '尺寸',
      pos: '名词',
      example: { ko: '사이즈는요?', zh: '尺寸呢？' },
      tip: 'size 音译。咖啡：레귤러(reg) / 라지(large) 两档',
    },
    {
      id: 'd14-w3',
      korean: '드시고 가세요',
      hangul: 'deu-si-go ga-se-yo',
      zh: '堂食吗？',
      pos: '表达',
      example: { ko: '드시고 가세요, 포장이세요?', zh: '堂食还是外带？' },
      tip: '드시다(吃/喝敬语) + 가다(去) = 在这吃完再走 = 堂食',
    },
    {
      id: 'd14-w4',
      korean: '포장',
      hangul: 'po-jang',
      zh: '外带 / 打包',
      pos: '名词',
      example: { ko: '포장이에요.', zh: '是外带。' },
      tip: '받침 ㅇ → 이에요. 韩国咖啡馆必问句',
    },
    {
      id: 'd14-w5',
      korean: '결제',
      hangul: 'gyeol-je',
      zh: '结账',
      pos: '名词',
      example: { ko: '결제 어떻게 하실래요?', zh: '怎么付款？' },
      tip: '받침 ㄹ → 「를」: 결제를. 现金/卡 = 현금/카드',
    },
    {
      id: 'd14-w6',
      korean: '맛있게 드세요',
      hangul: 'ma-sit-ge deu-se-yo',
      zh: '请慢用',
      pos: '表达',
      example: { ko: '주문하신 라떼 나왔어요. 맛있게 드세요.', zh: '您点的拿铁好了，请慢用。' },
      tip: '韩国咖啡馆店员的标准送客语。可以学着说也可以回「감사합니다」',
    },
  ],

  dialogue: {
    scene: '하루카페 收银台 · 关卡 2 · 全程独立完成',
    setting: {
      time: '周五下午 3 点',
      place: '学校后门 하루카페',
      npc: '金毛狗店员',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '金毛店员',
        ko: '어서 오세요. 주문 도와드릴게요.',
        hangul: 'eo-seo o-se-yo. ju-mun do-wa-deu-ril-ge-yo',
        zh: '欢迎光临，我帮您点单。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '따뜻한 라떼 한 잔 주세요. 얼음 빼고요.',
        hangul: 'tta-tteu-tan ra-tte han jan ju-se-yo. eo-reum ppae-go-yo',
        zh: '请给我一杯热拿铁，不要冰。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '金毛店员',
        ko: '드시고 가세요, 포장이세요?',
        hangul: 'deu-si-go ga-se-yo, po-jang-i-se-yo',
        zh: '堂食还是外带？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '兔莉今天就想坐下来好好喝完，应该选哪个？',
        practice: 'pick',
        choices: [
          { ko: '드시고 가요. 여기서 먹어요.', zh: '堂食。在这里喝。', correct: true },
          { ko: '포장이에요.', zh: '外带。', correct: false },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
        ],
      },
      {
        speaker: 'npc',
        npcName: '金毛店员',
        ko: '4,500원이에요. 결제 도와드릴게요.',
        hangul: 'sa-cheon-o-baek won-i-e-yo. gyeol-je do-wa-deu-ril-ge-yo',
        zh: '4500 元。我帮您结账。',
        practice: 'listen',
      },
    ],
  },

  grammar: {
    title: '关卡 2 总结 · 咖啡馆 6 句模板',
    pattern: '点单完整链路 · 6 个关键节点',
    whenToUse: '韩国任何咖啡馆/餐厅都通用。背下这 6 句，独立点单稳了。',
    rules: [
      '① 进门听：「**어서 오세요**」(欢迎)',
      '② 点单说：「N + 주세요」+「얼음 빼고요 / 따뜻하게요」(可选定制)',
      '③ 堂食外带：店员问「드시고 가세요?」→ 答「드시고 가요」 or「포장이에요」',
      '④ 价格听：「N원이에요」',
      '⑤ 付款递卡或现金：「카드요」/「현금이요」',
      '⑥ 道谢：「감사합니다」店员回「맛있게 드세요」',
    ],
    examples: [
      { ko: '라떼 한 잔 주세요.', zh: '请给我一杯拿铁。' },
      { ko: '얼음 빼고요.', zh: '不要冰。' },
      { ko: '드시고 가요.', zh: '堂食。' },
      { ko: '감사합니다.', zh: '谢谢。' },
    ],
    pitfall:
      '关卡 2 的难点不在词汇，而在**连续应付 6 句问答不慌**。店员说快了听不清也别慌，礼貌问一句「다시 말씀해 주세요」(请再说一次) 即可。',
  },

  output: [
    {
      id: 'd14-o1',
      kind: 'compose',
      zhHint: '请给我一杯热拿铁，不要冰。',
      tokens: ['따뜻한', '라떼', '한 잔', '주세요', '얼음', '빼고요', '있어요', '포장'],
      composeAnswer: ['따뜻한', '라떼', '한 잔', '주세요', '얼음', '빼고요'],
      successMsg: '✓ 第一题：完整定制句拼对了。',
    },
    {
      id: 'd14-o2',
      kind: 'compose',
      zhHint: '堂食，不是外带。',
      tokens: ['드시고', '가요', '포장이', '아니에요', '주세요', '맞아요'],
      composeAnswer: ['드시고', '가요', '포장이', '아니에요'],
      successMsg: '✓ 第二题：堂食外带答案表达完整。',
    },
    {
      id: 'd14-o3',
      kind: 'listen-choice',
      audioKo: '드시고 가세요, 포장이세요?',
      successMsg: '✓ 「堂食还是外带？」韩国咖啡馆必问。',
      choices: [
        { zh: '堂食还是外带？', correct: true },
        { zh: '要不要加冰？', correct: false },
        { zh: '怎么付款？', correct: false },
        { zh: '尺寸要多大？', correct: false },
      ],
    },
    {
      id: 'd14-o4',
      kind: 'zh-to-ko',
      zhPrompt: '4500 元。我帮您结账。',
      successMsg: '"원이에요" 报价标准；「결제 도와드릴게요」是店员标准句。',
      choices: [
        { ko: '4,500원이에요. 결제 도와드릴게요.', correct: true },
        { ko: '4,500원예요. 결제 도와드릴게요.', correct: false },
        { ko: '4,500원이에요. 주문 도와드릴게요.', correct: false },
        { ko: '4,500원이예요. 결제 도와드려요.', correct: false },
      ],
    },
    {
      id: 'd14-o5',
      kind: 'match-pair',
      successMsg: '🎉 关卡 2 通关！金毛店员把热拿铁递到你手里。"맛있게 드세요!"',
      pairs: [
        { ko: '주문', zh: '点单' },
        { ko: '포장', zh: '外带' },
        { ko: '결제', zh: '结账' },
        { ko: '얼음 빼고요', zh: '不要冰' },
        { ko: '맛있게 드세요', zh: '请慢用' },
      ],
    },
  ],

  recap: {
    toriPose: 'celebrate',
    praise: '🎉 关卡 2 通关！第一次完全独立点单。토리, 진짜 자랑스러워요!',
    preview: '第三周开始：要学怎么看房子、办银行卡、看医生。"成年的留学生"才开始。',
    stickerId: 'sticker-d14',
  },

  carrotHint:
    '关卡 2 通关庆祝！可以问胡萝卜「韩国咖啡馆常用句完整版」「Week 3 大概要学什么」',
};
