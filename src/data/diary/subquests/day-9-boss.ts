import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 9 · 1-5 Boss 战 · 이거/그거/저거 + 量词 综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 10：学校食堂 · 있어요/없어요
 */
export const day9Boss: BossSubQuestData = {
  day: 9, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: 'CU 便利店独立通关 · 从"이거"到结账', subtitleEn: 'CU Convenience Store Solo Run · From "이거" to Checkout',
  intro: '早上 8:30。收银台后考拉哥哥打了个哈欠。你手里已经抓了一个金枪鱼饭团和一瓶香蕉牛奶。没有 Haru、没有 Junho，只有你和一整套韩语。开始结账。', introEn: '8:30 AM. The koala guy behind the counter yawns. You\'ve already grabbed a tuna rice ball and a banana milk. No Haru, no Junho—just you and a full set of Korean. Time to check out.',
  outroHook: '通过！你把胡萝卜饭团（不是，是金枪鱼饭团）塞进书包。中午 Junho 会拉你去学校식당——袋鼠阿姨要问你"오늘 뭐 드릴까요?"。下一关，你要学会 있어요/없어요——"有没有"这两个万能词。', outroHookEn: 'Pass! You stuff the carrot rice ball (no, the tuna one) into your bag. At noon, Junho will drag you to the school cafeteria—Auntie Kangaroo will ask you "오늘 뭐 드릴까요?" Next level: master 있어요/없어요—the two all-purpose words for "have" and "don\'t have."',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd09-b5-t1',
        audioKo: '이거 주세요.',
        choices: [
          { text: '请给我那个。', textEn: 'Please give me that one.', correct: false },
          { text: '请给我这个。', textEn: 'Please give me this.', correct: true },
          { text: '这是我的。', textEn: 'This is mine.', correct: false },
          { text: '给你这个。', textEn: 'Here, take this.', correct: false },
        ],
        explain: '이거(我手边这个) + 주세요(请给我)。便利店点单核心句', explainEn: '이거 (this one by me) + 주세요 (please give me). The core convenience store ordering phrase.',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd09-b5-t2',
        audioKo: '천천히 하세요.',
        choices: [
          { text: '请快点。', textEn: 'Please hurry.', correct: false },
          { text: '请慢慢来。', textEn: 'Take your time.', correct: true },
          { text: '请等一下。', textEn: 'Please wait a moment.', correct: false },
          { text: '请打包。', textEn: 'Please pack it up.', correct: false },
        ],
        explain: '천천히(慢慢地) + 하세요(请做)。韩国人的温柔安慰句', explainEn: '천천히 (slowly) + 하세요 (please do). A gentle Korean reassurance phrase.',
      },
    },
    {
      type: 'choice',
      label: '助词/形态改错', labelEn: 'Particle/Form Correction',
      task: {
        id: 'd09-b5-t3',
        promptZh: '"两杯咖啡"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "two coffees"?',
        choices: [
          { text: '커피 이 잔 주세요.', correct: false },
          { text: '커피 두 잔 주세요.', correct: true },
          { text: '커피 둘 잔 주세요.', correct: false },
          { text: '커피 두 개 주세요.', correct: false },
        ],
        explain: '固有数 둘 搭量词变 두。咖啡装杯用「잔」量词。数东西用固有数不用汉字数', explainEn: 'Native number 둘 becomes 두 with a counter. Coffee in cups uses the counter 잔. Count things with native numbers, not Sino-Korean.',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd09-b5-t4',
        promptKo: '봉투',
        promptHangul: 'bong-tu',
        choices: [
          { text: '袋子', textEn: 'bag', correct: true },
          { text: '收据', textEn: 'receipt', correct: false },
          { text: '吸管', textEn: 'straw', correct: false },
          { text: '钱包', textEn: 'Wallet', correct: false },
        ],
        explain: '汉字词「封套」。韩国便利店塑料袋 100 원收费，店员必问「봉투 필요하세요?」', explainEn: 'Sino-Korean for "envelope." Korean convenience stores charge 100 won for plastic bags, so staff always ask "봉투 필요하세요?" (Do you need a bag?)',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd09-b5-t5',
        zhHint: '请给我这个。还有这个也是。', zhHintEn: 'I\'ll take this one. And this too, please.',
        audioKo: '이거 주세요. 그리고 이것도요.',
        answer: ['이거', '주세요.', '그리고', '이것도요.'],
        tokens: ['이거', '주세요.', '그리고', '이것도요.', '이거를', '이것이', '그것'],
        explain: '第一样 이거 주세요 + 第二样 이것도요（省略 주세요）。CU 结账添商品黄金组合', explainEn: 'First item: 이거 주세요 + second item: 이것도요 (주세요 omitted). The golden combo for adding items at CU checkout',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd09-b5-t6',
        zhHint: '请给我一瓶香蕉牛奶。', zhHintEn: 'Please give me a bottle of banana milk.',
        audioKo: '바나나우유 한 병 주세요.',
        answer: ['바나나우유', '한', '병', '주세요.'],
        tokens: ['바나나우유', '한', '병', '주세요.', '하나', '일', '개'],
        explain: '固有数 하나 → 한 + 병(瓶量词) + 주세요。饮料用 병 量词', explainEn: 'Native number 하나 → 한 + 병 (bottle counter) + 주세요. Use 병 for drinks',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应', labelEn: 'Listen to the dialogue and choose a response',
      task: {
        id: 'd09-b5-t7',
        audioKo: '봉투 필요하세요?',
        promptZh: '店员问"需要袋子吗？"你自带环保袋不需要，应该？', promptZhEn: 'The clerk asks "Need a bag?" You brought your own eco-bag and don\'t need one. What should you say?',
        choices: [
          { text: '네, 주세요.', correct: false },
          { text: '아니요, 괜찮아요.', correct: true },
          { text: '얼마예요?', correct: false },
          { text: '몰라요.', correct: false },
        ],
        explain: '婉拒袋子：아니요, 괜찮아요。「괜찮아요」在这里 = 不用了，谢谢', explainEn: 'Politely decline the bag: 아니요, 괜찮아요. Here 괜찮아요 = No thanks',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd09-b5-t8',
        promptZh: '结账时零钱撒了一地，考拉哥哥说「천천히 하세요」。你想道歉+道谢，应该？', promptZhEn: 'Change spills all over the floor while paying, and Koala oppa says "천천히 하세요." You want to apologize and thank him. What should you say?',
        choices: [
          { text: '감사합니다. 죄송해요.', correct: true },
          { text: '아니요, 없어요.', correct: false },
          { text: '만나서 반가워요.', correct: false },
          { text: '얼마예요?', correct: false },
        ],
        explain: '给别人添麻烦时韩国人道谢+道歉一起说：감사합니다 + 죄송해요。是最礼貌的回应', explainEn: 'When causing trouble, Koreans say thanks and sorry together: 감사합니다 + 죄송해요. It\'s the most polite response',
      },
    },
  ],
};
