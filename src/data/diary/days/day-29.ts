import type { ToriDay } from '@/types/tori-diary';

/**
 * Day 29 · 关卡 5 · 给朋友写一封韩文信
 *
 * 剧情：周一晚上 9 点。明天就是 Day 30——最终考试。
 * Junho、Minji、Haru 三个朋友这几周一直陪着她。
 * 兔莉在书桌前坐下，铺开一张奶白色的信纸——
 * 决定给三个人各写一封感谢信。
 * 自我介绍 → 谢谢 → 一起的回忆 → 未来的约定 → 收尾。
 * 8 句以上 + 综合해요体 + 过去时 + 敬语。
 * AI 助手胡萝卜会评分 7/10 才算通过。
 *
 * 学习目标：综合 Week 4 全部 / 信件结构 / 친밀하게 + 정중하게
 * 韩语自审：korean skill PASS (편지체 + 감정 표현 + 종합)
 */
export const day29: ToriDay = {
  level: 'beginner',
  day: 29,
  phase: 'mastery',
  title: '💌 关卡 5 · 给朋友写信',
  subtitle: '8 句以上 + 자연스럽게 + 진심',
  isCheckpoint: 29,
  estimatedMin: 18,

  opening: {
    date: '10월 2일 월요일 저녁',
    weather: '首尔 · 晴',
    toriPose: 'shy',
    diaryText: `10월 2日，周一晚 9 点。

29 天了。
明天就是 Day 30——
最终考试。
5 分钟韩语口语自述，
全员到场。

但今天晚上，
胡萝卜悄悄告诉我一件事：

"토리, 내일 시험 보기 전에—
이 세 명에게 편지를 써."
（兔莉，明天考试之前——
给这三个人写信。）

Junho 🐯。
Minji 🦦。
Haru 🐹。

29 天里，
他们每一个人都救过我。
机场翻车那天 Minji 帮我拿行李，
宿舍报到那天 Junho 借我洗发水，
我感冒那天 Haru 拽我去药店。
昨天 Minji 还抢着付了 60,000 원。

我从抽屉里翻出三张奶白色信纸。
火鹤老师上周教过——
편지의 4 단계：
**자기소개 → 감사 → 추억 → 미래의 약속 → 끝인사.**

8 句以上，
综合 해요体 + 과거형 + 정중함。
AI 助手胡萝卜会打分。
7/10 才算通过。

我深呼吸。
笔握在手里，
笔尖落到纸上。

第一封 — Minji 언니。

"민지 언니에게,
안녕하세요. 토리예요.

처음 인천공항에서 만났을 때—
저는 짐도 잃어버리고, 한국어도 못해서 정말 힘들었어요.
근데 언니가 도와줬어요.
그날부터 언니는 저의 첫 번째 친구가 되었어요.

29일 동안 정말 많이 배웠어요.
어제 삼겹살 한턱 내줘서 진짜 고마웠어요.
다음에는 제가 살게요.

내일 시험 잘 볼게요.
앞으로도 잘 부탁드려요.

토리 드림."

写完最后一个字。
眼眶热了一下。

胡萝卜在桌角点头。
"7/10. 통과."
（7/10。通过。）

💌 关卡 5 通关。`,
  },

  words: [
    {
      id: 'd29-w1',
      korean: '편지',
      hangul: 'pyeon-ji',
      zh: '信 / 信件',
      pos: '名词',
      example: { ko: '편지를 썼어요.', zh: '写了信。' },
      tip: '받침 ㅣ → 「를」: 편지를. 写信用动词「쓰다」→ 썼어요',
    },
    {
      id: 'd29-w2',
      korean: '~에게',
      hangul: 'e-ge',
      zh: '给 (人)',
      pos: '助词',
      example: { ko: '민지에게 편지를 써요.', zh: '给 Minji 写信。' },
      tip: '人/动物 + 에게。事物用 「~에」: 학교에 가요',
    },
    {
      id: 'd29-w3',
      korean: '추억',
      hangul: 'chu-eok',
      zh: '回忆',
      pos: '名词',
      example: { ko: '좋은 추억이에요.', zh: '是美好的回忆。' },
      tip: '받침 ㄱ → 「을/이」: 추억을 / 추억이. 写信感谢段必备',
    },
    {
      id: 'd29-w4',
      korean: '고마웠어요',
      hangul: 'go-ma-wo-sseo-yo',
      zh: '谢了 (过去时)',
      pos: '形容词',
      example: { ko: '진짜 고마웠어요.', zh: '真的谢了。' },
      tip: '고맙다 ㅂ 불규칙 → 고마웠어요. 写信感谢专用',
    },
    {
      id: 'd29-w5',
      korean: '드림',
      hangul: 'deu-rim',
      zh: '敬献 (信末签名敬语)',
      pos: '表达',
      example: { ko: '토리 드림.', zh: '兔莉 敬上。' },
      tip: '动词「드리다」(给予敬语) 名词形。信末敬语签名标配',
    },
    {
      id: 'd29-w6',
      korean: '앞으로',
      hangul: 'a-peu-ro',
      zh: '今后 / 以后',
      pos: '副词',
      example: { ko: '앞으로 잘 부탁드려요.', zh: '今后请多关照。' },
      tip: '앞 (前) + 으로 (向)。和「잘 부탁드려요」是黄金搭档',
    },
  ],

  dialogue: {
    scene: '兔莉的书桌 · 写信中 (内心+胡萝卜对话)',
    setting: {
      time: '周一晚 9 点',
      place: '宿舍 301 · 书桌',
      npc: '胡萝卜 (AI 助手)',
    },
    lines: [
      {
        speaker: 'tori',
        ko: '민지 언니에게, 안녕하세요. 토리예요.',
        hangul: 'min-ji eon-ni-e-ge, an-nyeong-ha-se-yo. to-ri-ye-yo',
        zh: '给 Minji 姐姐，您好。我是兔莉。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '처음 공항에서 만났을 때 정말 힘들었어요. 근데 언니가 도와줬어요.',
        hangul: 'cheo-eum gong-hang-e-seo man-na-sseul ttae jeong-mal him-deu-reo-sseo-yo. geun-de eon-ni-ga do-wa-jwo-sseo-yo',
        zh: '在机场第一次见面时真的很辛苦。但你帮了我。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '29일 동안 정말 많이 배웠어요. 진짜 고마웠어요.',
        hangul: 'i-sip-gu-il dong-an jeong-mal man-i bae-wo-sseo-yo. jin-jja go-ma-wo-sseo-yo',
        zh: '29 天里真的学了很多。真的很感谢。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '다음에는 제가 살게요. 앞으로도 잘 부탁드려요.',
        hangul: 'da-eum-e-neun je-ga sal-ge-yo. a-peu-ro-do jal bu-tak-deu-ryeo-yo',
        zh: '下次我请。今后也请多关照。',
        practice: 'shadow',
      },
      {
        speaker: 'tori',
        ko: '?',
        hangul: '',
        zh: '信件最礼貌的敬语签名结尾应该是哪个？',
        practice: 'pick',
        choices: [
          { ko: '토리 드림.', zh: '兔莉 敬上。', correct: true },
          { ko: '토리야!', zh: '兔莉啦！', correct: false },
          { ko: '토리한테.', zh: '给兔莉。', correct: false },
        ],
      },
    ],
  },

  grammar: {
    title: '关卡 5 总结 · 韩文信件 5 段结构',
    pattern: '자기소개 → 감사 → 추억 → 미래의 약속 → 끝인사',
    whenToUse: '韩国正式信件、感谢卡、贺卡通用结构。8 句以上 + 综合 해요体 + 过거형 + 敬语。',
    rules: [
      '① 称呼 + 自我介绍："**N에게, 안녕하세요. 토리예요.**"',
      '② 感谢起源（过去时）："**처음 ___ 때 ___ 했어요. 근데 N가 도와줬어요.**"',
      '③ 共同回忆（过去时）："**N일 동안 ___ 했어요. 진짜 ___ 었어요.**"',
      '④ 未来约定（意志形）："**다음에는 제가 ___ 게요.**"',
      '⑤ 礼貌结尾："**앞으로도 잘 부탁드려요. / 토리 드림.**"',
    ],
    examples: [
      { ko: '민지에게, 안녕하세요. 토리예요.', zh: '给 Minji，您好。我是兔莉。' },
      { ko: '처음 공항에서 만났을 때 힘들었어요.', zh: '第一次在机场见面时很辛苦。' },
      { ko: '29일 동안 많이 배웠어요. 진짜 고마웠어요.', zh: '29 天里学了很多。真的很感谢。' },
      { ko: '앞으로도 잘 부탁드려요. 토리 드림.', zh: '今后也请多关照。兔莉 敬上。' },
    ],
    pitfall:
      '韩文信件**敬语等级要统一**——开头用「~에게 + 해요体」，中间过去时也保持해요体 (했어요/먹었어요)，最后签名用「드림」。最忌讳的是中途突然换成半语 (했어 / 먹었어)，会显得失礼。',
  },

  output: [
    {
      id: 'd29-o1',
      kind: 'compose',
      zhHint: '给 Minji，您好。我是兔莉。',
      tokens: ['민지에게', ',', '안녕하세요', '.', '토리예요', '민지를', '드림'],
      composeAnswer: ['민지에게', ',', '안녕하세요', '.', '토리예요'],
      successMsg: '✓ 第一段：称呼 + 自我介绍完成。',
    },
    {
      id: 'd29-o2',
      kind: 'compose',
      zhHint: '29 天里真的学了很多。真的很感谢。',
      tokens: ['29일 동안', '정말', '많이', '배웠어요', '진짜', '고마웠어요', '있어요', '배워요'],
      composeAnswer: ['29일 동안', '정말', '많이', '배웠어요', '진짜', '고마웠어요'],
      successMsg: '✓ 第二段：共同回忆 + 过去时完成。',
    },
    {
      id: 'd29-o3',
      kind: 'listen-choice',
      audioKo: '앞으로도 잘 부탁드려요.',
      successMsg: '✓ 「今后也请多关照」。「앞으로도」(앞으로 + 도) = 今后也；信件结尾必备。',
      choices: [
        { zh: '今后也请多关照。', correct: true },
        { zh: '过去也请多关照。', correct: false },
        { zh: '现在请多关照。', correct: false },
        { zh: '请慢走。', correct: false },
      ],
    },
    {
      id: 'd29-o4',
      kind: 'zh-to-ko',
      zhPrompt: '昨天和朋友吃了五花肉。真的很开心。',
      successMsg: '"먹었어요" + 「즐거웠어요」(ㅂ 不规则) — 综合过去时与情感表达。',
      choices: [
        { ko: '어제 친구랑 삼겹살을 먹었어요. 정말 즐거웠어요.', correct: true },
        { ko: '어제 친구랑 삼겹살을 먹어요. 정말 즐거웠어요.', correct: false },
        { ko: '어제 친구랑 삼겹살을 먹었어요. 정말 즐겁었어요.', correct: false },
        { ko: '어제 친구를 삼겹살을 먹었어요. 정말 즐거워요.', correct: false },
      ],
    },
    {
      id: 'd29-o5',
      kind: 'match-pair',
      successMsg: '🎉 关卡 5 通关！胡萝卜在桌角点头："7/10. 통과." 你的第一封韩文信送达。',
      pairs: [
        { ko: '편지', zh: '信 / 信件' },
        { ko: '~에게', zh: '给 (人)' },
        { ko: '추억', zh: '回忆' },
        { ko: '드림', zh: '敬献 (信末签名)' },
        { ko: '앞으로', zh: '今后 / 以后' },
      ],
    },
  ],

  recap: {
    toriPose: 'celebrate',
    praise: '🎉 关卡 5 通关！综合해요体+过去时+敬语+诚意。토리, 진짜 잘 썼어요!',
    preview: '明天 — 最终考试。Day 30。所有人都会到场。5 分钟口语自述。我准备好了…吧？',
    stickerId: 'sticker-d29',
  },

  carrotHint:
    '关卡 5 通关庆祝！可以问胡萝卜「韩文信件 5 段结构详解」「敬语等级如何统一」「Day 30 最终考准备」',
};
