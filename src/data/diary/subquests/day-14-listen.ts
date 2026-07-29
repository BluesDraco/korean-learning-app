import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 14 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 14 主流程 하루카페 场景
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化形容词定语形，reply 铺 堂食/外带选择
 */
export const day14Listen: ListenSubQuestData = {
  day: 14, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在咖啡馆听清点单每一步 · Chapter 2 收官',

  // ─── 听句选意 ───
  meaning: [
    {
      id: 'd14-l2-m1',
      audioKo: '어서 오세요. 주문 도와드릴게요.',
      choices: [
        { text: '欢迎光临。我帮您点单。', correct: true },
        { text: '请慢走。有需要吗？', correct: false },
        { text: '要不要点单？', correct: false },
        { text: '欢迎再来。', correct: false },
      ],
      explain: '咖啡馆/餐厅进门套语：어서 오세요 + 주문 도와드릴게요',
    },
    {
      id: 'd14-l2-m2',
      audioKo: '따뜻한 라떼 한 잔 주세요.',
      choices: [
        { text: '请给我一杯热拿铁。', correct: true },
        { text: '请给我一杯冰拿铁。', correct: false },
        { text: '请给我一杯热美式。', correct: false },
        { text: '请给我两杯拿铁。', correct: false },
      ],
      explain: '따뜻한(热的·定语) + 라떼 + 한 잔(1杯) + 주세요',
    },
    {
      id: 'd14-l2-m3',
      audioKo: '드시고 가세요, 포장이세요?',
      choices: [
        { text: '堂食还是外带？', correct: true },
        { text: '需要袋子吗？', correct: false },
        { text: '还需要点什么？', correct: false },
        { text: '好了，请慢用。', correct: false },
      ],
      explain: '드시고 가세요(堂食·敬语) + 포장이세요?（外带吗？）。店员必问',
    },
    {
      id: 'd14-l2-m4',
      audioKo: '라떼 나왔어요. 맛있게 드세요.',
      choices: [
        { text: '拿铁好了，请慢用。', correct: true },
        { text: '拿铁没了。', correct: false },
        { text: '还有拿铁吗？', correct: false },
        { text: '喝完了吗？', correct: false },
      ],
      explain: '나왔어요(出来了·取餐信号) + 맛있게 드세요(请慢用·递餐结束语)',
    },
    {
      id: 'd14-l2-m5',
      audioKo: '뜨거우니까 조심하세요.',
      choices: [
        { text: '因为烫，请小心。', correct: true },
        { text: '因为冰，请小心。', correct: false },
        { text: '因为贵，请小心。', correct: false },
        { text: '很热，请喝快点。', correct: false },
      ],
      explain: '뜨거우니까(因为烫·ㅂ不规则) + 조심하세요(请小心)。店员递热饮时说',
    },
  ],

  // ─── 听句填空 ───
  cloze: [
    {
      id: 'd14-l2-c1',
      audioKo: '따뜻한 라떼 주세요.',
      clozeParts: ['', '라떼 주세요.'],
      choices: [
        { text: '따뜻한', correct: true },
        { text: '따뜻하다', correct: false },
        { text: '따뜻하게', correct: false },
        { text: '따뜻하고', correct: false },
      ],
      explain: '形容词定语形（修饰名词）→ 따뜻한。따뜻하다 → 따뜻한 라떼 = 热拿铁',
    },
    {
      id: 'd14-l2-c2',
      audioKo: '아이스 아메리카노 주세요.',
      clozeParts: ['', '아메리카노 주세요.'],
      choices: [
        { text: '아이스', correct: true },
        { text: '차갑은', correct: false },
        { text: '뜨겁은', correct: false },
        { text: '차게', correct: false },
      ],
      explain: '冰咖啡母语者固定说「아이스 아메리카노」（缩写"아아"）。「차가운」语法对但咖啡场景几乎不用——冰饮料专用外来词 아이스',
    },
    {
      id: 'd14-l2-c3',
      audioKo: '달게 해 주세요.',
      clozeParts: ['', '해 주세요.'],
      choices: [
        { text: '달게', correct: true },
        { text: '달다', correct: false },
        { text: '단', correct: false },
        { text: '달아', correct: false },
      ],
      explain: '形容词副词形（修饰动词）→ 달게。달다 + 게 = 甜地。「달게 해 주세요」= 请做成甜的',
    },
    {
      id: 'd14-l2-c4',
      audioKo: '라떼 한 잔 주세요.',
      clozeParts: ['라떼 ', '주세요.'],
      choices: [
        { text: '한 잔', correct: true },
        { text: '일 잔', correct: false },
        { text: '하나 잔', correct: false },
        { text: '한 개', correct: false },
      ],
      explain: '固有数 하나 → 한 + 잔(杯·量词)。咖啡装杯用 잔，不用 개',
    },
  ],

  // ─── 听对话选回应 ───
  reply: [
    {
      id: 'd14-l2-r1',
      audioKo: '어서 오세요. 주문 도와드릴게요.',
      promptZh: '店员迎宾。你想点一杯热拿铁，应该？',
      choices: [
        { text: '따뜻한 라떼 한 잔 주세요.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '아니요, 괜찮아요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '进店后直接点单 = 温度形容词 + 饮料 + 一杯 + 주세요',
    },
    {
      id: 'd14-l2-r2',
      audioKo: '드시고 가세요, 포장이세요?',
      promptZh: '店员问"堂食还是外带？"你想坐下来慢慢喝，应该？',
      choices: [
        { text: '여기서 먹을게요.', correct: true },
        { text: '포장이에요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '없어요.', correct: false },
      ],
      explain: '여기서(在这儿) + 먹을게요(要吃·意愿形)。堂食最自然的回应',
    },
    {
      id: 'd14-l2-r3',
      audioKo: '라떼 나왔어요. 맛있게 드세요.',
      promptZh: '店员递咖啡说"好了，请慢用"。你想道谢，最自然的一句？',
      choices: [
        { text: '감사합니다.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '아니요, 없어요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '取餐后 = 감사합니다。简短礼貌。也可加 「잘 먹겠습니다」(开动)',
    },
  ],
};
