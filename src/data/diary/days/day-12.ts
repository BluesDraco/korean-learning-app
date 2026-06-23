import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 12 · Haru 推荐的独立咖啡馆 · 第一杯拿铁
 *
 * 剧情：Haru 给兔莉发地址："토리야, 여기 카페 진짜 예뻐. 너 좋아할 거야."
 * 兔莉一个人按导航走了 15 分钟，找到一家挂着粉色招牌的小咖啡馆。
 * 进门一只白猫店员在擦杯子，问："아이스 아메리카노 드릴까요?"
 * 兔莉慌了——她要的是拿铁。鼓起勇气："라떼 주세요. 그리고 얼음 빼고요."
 * 猫店员笑了："따뜻한 라떼 한 잔이요." 兔莉拿到第一杯首尔的拿铁。
 *
 * 学习目标：~빼고 / 따뜻하게 / 咖啡词汇 / 量词 잔
 * 韩语自审：korean skill PASS
 */
export const day12: ToriDay = {
  day: 12,
  phase: 'foundation',
  title: '粉色咖啡馆 · 第一杯首尔拿铁',
  subtitle: '我要拿铁，不要冰',
  isCheckpoint: null,
  estimatedMin: 12,

  opening: {
    date: '9月 13일 수요일 오후',
    weather: '首尔 · 晴',
    toriPose: 'shy',
    diaryText: `9月 13日，周三 14:00。

Haru 给我发了一个地址：
"토리야, 여기 카페 진짜 예뻐. 너 좋아할 거야."
（兔莉，这家咖啡馆真的很美。你会喜欢。）

按导航走了 15 分钟。
拐过一个小巷子，看到一块粉色招牌：
"바나나 토끼"（香蕉兔兔）。

天哪，这名字就是为我开的。

推门进去，一只白猫店员正在擦杯子。
她抬头："어서 오세요. 아이스 아메리카노 드릴까요?"
（欢迎光临，要冰美式吗？）

我慌了。我想要拿铁。
我紧紧握住背包里的胡萝卜，鼓起勇气说：

"라떼 주세요. 그리고 얼음 빼고요."
（请给我拿铁。不要冰。）

猫店员愣了一下，然后笑了：
"따뜻한 라떼 한 잔이요. 4,500원이에요."
（热拿铁一杯，4500 元。）

拿到杯子那一刻，
我对着它说了一句："잘 부탁드려요."
拿铁没有回答，但是好喝得想哭。`,
  },

  words: [
    {
      id: 'd12-w1',
      korean: '카페',
      hangul: 'ka-pe',
      zh: '咖啡馆',
      pos: '名词',
      example: { ko: '카페 가요.', zh: '去咖啡馆。' },
      tip: 'cafe 音译。比「커피숍」更日常',
    },
    {
      id: 'd12-w2',
      korean: '라떼',
      hangul: 'ra-tte',
      zh: '拿铁',
      pos: '名词',
      example: { ko: '라떼 주세요.', zh: '请给我拿铁。' },
      tip: 'latte 音译。和「커피」(咖啡) / 「아메리카노」(美式) 一起记',
    },
    {
      id: 'd12-w3',
      korean: '얼음',
      hangul: 'eo-reum',
      zh: '冰块',
      pos: '名词',
      example: { ko: '얼음 빼주세요.', zh: '请去冰。' },
      tip: 'Day 2 飞机上也出现过。韩国夏天咖啡默认加冰',
    },
    {
      id: 'd12-w4',
      korean: '빼고',
      hangul: 'ppae-go',
      zh: '不要 / 除去',
      pos: '副词',
      example: { ko: '얼음 빼고요.', zh: '不要冰。' },
      tip: '动词「빼다」(除去) + 「-고」连接。点单减项必备',
    },
    {
      id: 'd12-w5',
      korean: '따뜻하게',
      hangul: 'tta-tteu-ta-ge',
      zh: '热的（副词形）',
      pos: '副词',
      example: { ko: '따뜻하게 주세요.', zh: '请给我热的。' },
      tip: '形容词「따뜻하다」(暖) + 「-게」副词化',
    },
    {
      id: 'd12-w6',
      korean: '잔',
      hangul: 'jan',
      zh: '杯（量词）',
      pos: '名词',
      example: { ko: '한 잔 주세요.', zh: '请给我一杯。' },
      tip: '韩语量词：잔(杯) / 개(个) / 명(人) / 권(本)',
    },
  ],

  dialogue: {
    scene: '바나나 토끼 카페 收银台',
    setting: {
      time: '下午 2 点',
      place: '弘大街 粉色咖啡馆',
      npc: '猫店员',
    },
    lines: [
      {
        speaker: 'npc',
        npcName: '猫店员',
        ko: '어서 오세요. 아이스 아메리카노 드릴까요?',
        hangul: 'eo-seo o-se-yo. a-i-seu a-me-ri-ka-no deu-ril-kka-yo',
        zh: '欢迎光临，要冰美式吗？',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '라떼 주세요. 그리고 얼음 빼고요.',
        hangul: 'ra-tte ju-se-yo. geu-ri-go eo-reum ppae-go-yo',
        zh: '请给我拿铁。不要冰。',
        practice: 'shadow',
      },
      {
        speaker: 'npc',
        npcName: '猫店员',
        ko: '따뜻한 라떼 한 잔이요. 4,500원이에요.',
        hangul: 'tta-tteu-tan ra-tte han jan-i-yo. sa-cheon-o-baek won-i-e-yo',
        zh: '热拿铁一杯，4500 元。',
        practice: 'listen',
      },
      {
        speaker: 'tori',
        ko: '여기 카드요.',
        hangul: 'yeo-gi ka-deu-yo',
        zh: '这是卡。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '拿到拿铁后兔莉应该对店员说什么？',
        practice: 'pick',
        choices: [
          { ko: '감사합니다.', zh: '谢谢。', correct: true },
          { ko: '얼마예요?', zh: '多少钱？', correct: false },
          { ko: '없어요.', zh: '没有。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '点单减项 · ~ 빼고 / 따뜻하게',
    pattern: '名词 + 빼고 (不要) · 形容词词干 + 게 (副词形)',
    whenToUse: '点单时定制：不要某个、要热的 / 凉的 / 多冰 / 少糖。',
    rules: [
      '**N + 빼고** = 不要 N : 얼음 빼고 / 시럽 빼고',
      '**A + 게** = 把形容词变成副词 : 따뜻하다 → 따뜻하게',
      '完整句式：「N + 빼고**요**」末加「요」更礼貌',
    ],
    examples: [
      { ko: '얼음 빼고요.', zh: '不要冰。', highlight: '빼고' },
      { ko: '시럽 빼고요.', zh: '不要糖浆。', highlight: '빼고' },
      { ko: '따뜻하게 주세요.', zh: '请给我热的。', highlight: '따뜻하게' },
      { ko: '차갑게 주세요.', zh: '请给我冰的。', highlight: '차갑게' },
    ],
    pitfall:
      '「얼음 빼고」(不要冰) vs「따뜻하게」(热的) — 前者是减项，后者是改属性。点去冰热饮完整说「따뜻하게, 얼음 빼고 주세요」。',
  },

  output: [
    {
      id: 'd12-o1',
      kind: 'fill',
      prompt: '라떼 주세요. 얼음 ___.',
      zhHint: '请给我拿铁，不要冰。',
      answer: '빼고요',
      successMsg: '猫店员对着你眨了一下眼："알겠습니다 ☕" ✓',
    },
  ],

  recap: {
    toriPose: 'happy',
    praise: '第一次完整定制了一杯咖啡。下次能更自信地说"덜 달게" (少糖)了。',
    preview: '明天我嗓子有点痒。Haru 说"같이 약국 가자"。第一次去韩国药店…',
    stickerId: 'sticker-d12',
  },

  carrotHint:
    '今天的胡萝卜：「韩国咖啡馆点单流程」「얼음 빼고怎么用」「热饮/冷饮怎么说」',
};
