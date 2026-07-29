import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 9 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 9 主流程 CU 便利店场景
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化 이거/그거/저거，reply 铺 계산할게요 结账场景
 */
export const day9Listen: ListenSubQuestData = {
  day: 9, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在 CU 收银台前，听清考拉哥哥的每一句话',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd09-l2-m1',
      audioKo: '이거 주세요.',
      choices: [
        { text: '请给我这个。', correct: true },
        { text: '请给我那个。', correct: false },
        { text: '这是我的。', correct: false },
        { text: '给你这个。', correct: false },
      ],
      explain: '이거(这个) + 주세요(请给我)。便利店指着东西点单最基础的一句',
    },
    {
      id: 'd09-l2-m2',
      audioKo: '2,800원이에요.',
      choices: [
        { text: '280 元。', correct: false },
        { text: '2800 元。', correct: true },
        { text: '28000 元。', correct: false },
        { text: '820 元。', correct: false },
      ],
      explain: '이천팔백원 = 2000 + 800 = 2800원。汉字数词从高位读，价格用汉字数',
    },
    {
      id: 'd09-l2-m3',
      audioKo: '천천히 하세요.',
      choices: [
        { text: '请快点。', correct: false },
        { text: '请慢慢来。', correct: true },
        { text: '请等一下。', correct: false },
        { text: '请打包。', correct: false },
      ],
      explain: '천천히(慢慢地·副词) + 하세요(请做)。「천천히 하세요」是韩国人最温柔的一句——考拉哥哥今天说的',
    },
    {
      id: 'd09-l2-m4',
      audioKo: '봉투 필요하세요?',
      choices: [
        { text: '需要袋子吗？', correct: true },
        { text: '需要收据吗？', correct: false },
        { text: '需要吸管吗？', correct: false },
        { text: '需要打包吗？', correct: false },
      ],
      explain: '봉투(袋子) + 필요하세요?(需要吗·敬语)。韩国便利店塑料袋收费 100 원，店员必问',
    },
    {
      id: 'd09-l2-m5',
      audioKo: '이것도 주세요.',
      choices: [
        { text: '这个不要。', correct: false },
        { text: '这个也请给我。', correct: true },
        { text: '这个多少钱？', correct: false },
        { text: '这个是我的。', correct: false },
      ],
      explain: '이것(这个) + 도(也) + 주세요。两个东西都要时的黄金衔接句',
    },
  ],

  // ─── 听句填空：播完整句 → 挖一词，4 韩文选项 ───
  cloze: [
    {
      id: 'd09-l2-c1',
      audioKo: '이거 얼마예요?',
      clozeParts: ['', '얼마예요?'],
      choices: [
        { text: '이거', correct: true },
        { text: '저는', correct: false },
        { text: '오늘', correct: false },
        { text: '엄마', correct: false },
      ],
      explain: '이거(我手边的这个) + 얼마예요?（多少钱？）。购物问价核心句',
    },
    {
      id: 'd09-l2-c2',
      audioKo: '저거 뭐예요?',
      clozeParts: ['', '뭐예요?'],
      choices: [
        { text: '저거', correct: true },
        { text: '이거', correct: false },
        { text: '엄마', correct: false },
        { text: '핸드폰', correct: false },
      ],
      explain: '저거(远处那个) + 뭐예요?(是什么？)。指着远处货架上不认识的东西问',
    },
    {
      id: 'd09-l2-c3',
      audioKo: '삼각김밥 두 개 주세요.',
      clozeParts: ['삼각김밥 ', '주세요.'],
      choices: [
        { text: '두 개', correct: true },
        { text: '이 개', correct: false },
        { text: '두 병', correct: false },
        { text: '둘 개', correct: false },
      ],
      explain: '固有数 「둘」搭配量词时变「두」→ 두 개(2个)。价格用汉字数，数东西用固有数',
    },
    {
      id: 'd09-l2-c4',
      audioKo: '바나나우유 한 병 주세요.',
      clozeParts: ['바나나우유 ', '주세요.'],
      choices: [
        { text: '한 병', correct: true },
        { text: '일 병', correct: false },
        { text: '하나 병', correct: false },
        { text: '한 개', correct: false },
      ],
      explain: '固有数 「하나」搭配量词时变「한」→ 한 병(1瓶)。饮料用 병，饭团/大部分东西用 개',
    },
  ],

  // ─── 听对话选回应：播前一句 → 选正确韩文回应 ───
  reply: [
    {
      id: 'd09-l2-r1',
      audioKo: '봉투 필요하세요?',
      promptZh: '店员问"需要袋子吗？"你不需要（自带环保袋），应该？',
      choices: [
        { text: '네, 주세요.', correct: false },
        { text: '아니요, 괜찮아요.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '몰라요.', correct: false },
      ],
      explain: '婉拒袋子：아니요, 괜찮아요(不用了，没关系)。「괜찮아요」在这里是"不必了"的委婉表达',
    },
    {
      id: 'd09-l2-r2',
      audioKo: '2,800원이에요.',
      promptZh: '店员告诉你金额，你要付款，最自然的一句应该？',
      choices: [
        { text: '여기 있어요.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '몰라요.', correct: false },
        { text: '보고 싶어요.', correct: false },
      ],
      explain: '「여기 있어요」= 这儿，给您。递钱时最自然的完整句。裸说 「여기요」偏口语，「여기 있어요」更礼貌',
    },
    {
      id: 'd09-l2-r3',
      audioKo: '천천히 하세요.',
      promptZh: '你零钱撒了一地，考拉哥哥说"慢慢来"。你想道谢+承认自己弄乱了，应该？',
      choices: [
        { text: '감사합니다. 죄송해요.', correct: true },
        { text: '아니요, 없어요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
        { text: '얼마예요?', correct: false },
      ],
      explain: '道谢 감사합니다 + 抱歉 죄송해요 组合——韩国人道谢和道歉常同时用，尤其是给别人添麻烦时',
    },
  ],
};
