import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 9 · 1-5 Boss 战 · 이거/그거/저거 + 量词 综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 10：学校食堂 · 있어요/없어요
 */
export const day9Boss: BossSubQuestData = {
  day: 9, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: 'CU 便利店独立通关 · 从"이거"到结账',
  intro: '早上 8:30。收银台后考拉哥哥打了个哈欠。你手里已经抓了一个金枪鱼饭团和一瓶香蕉牛奶。没有 Haru、没有 Junho，只有你和一整套韩语。开始结账。',
  outroHook: '通过！你把胡萝卜饭团（不是，是金枪鱼饭团）塞进书包。中午 Junho 会拉你去学校식당——袋鼠阿姨要问你"오늘 뭐 드릴까요?"。下一关，你要学会 있어요/없어요——"有没有"这两个万能词。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd09-b5-t1',
        audioKo: '이거 주세요.',
        choices: [
          { text: '请给我那个。', correct: false },
          { text: '请给我这个。', correct: true },
          { text: '这是我的。', correct: false },
          { text: '给你这个。', correct: false },
        ],
        explain: '이거(我手边这个) + 주세요(请给我)。便利店点单核心句',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd09-b5-t2',
        audioKo: '천천히 하세요.',
        choices: [
          { text: '请快点。', correct: false },
          { text: '请慢慢来。', correct: true },
          { text: '请等一下。', correct: false },
          { text: '请打包。', correct: false },
        ],
        explain: '천천히(慢慢地) + 하세요(请做)。韩国人的温柔安慰句',
      },
    },
    {
      type: 'choice',
      label: '助词/形态改错',
      task: {
        id: 'd09-b5-t3',
        promptZh: '"两杯咖啡"最标准的说法？',
        choices: [
          { text: '커피 이 잔 주세요.', correct: false },
          { text: '커피 두 잔 주세요.', correct: true },
          { text: '커피 둘 잔 주세요.', correct: false },
          { text: '커피 두 개 주세요.', correct: false },
        ],
        explain: '固有数 둘 搭量词变 두。咖啡装杯用「잔」量词。数东西用固有数不用汉字数',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd09-b5-t4',
        promptKo: '봉투',
        promptHangul: 'bong-tu',
        choices: [
          { text: '袋子', correct: true },
          { text: '收据', correct: false },
          { text: '吸管', correct: false },
          { text: '钱包', correct: false },
        ],
        explain: '汉字词「封套」。韩国便利店塑料袋 100 원收费，店员必问「봉투 필요하세요?」',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd09-b5-t5',
        zhHint: '请给我这个。还有这个也是。',
        audioKo: '이거 주세요. 그리고 이것도요.',
        answer: ['이거', '주세요.', '그리고', '이것도요.'],
        tokens: ['이거', '주세요.', '그리고', '이것도요.', '이거를', '이것이', '그것'],
        explain: '第一样 이거 주세요 + 第二样 이것도요（省略 주세요）。CU 结账添商品黄金组合',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd09-b5-t6',
        zhHint: '请给我一瓶香蕉牛奶。',
        audioKo: '바나나우유 한 병 주세요.',
        answer: ['바나나우유', '한', '병', '주세요.'],
        tokens: ['바나나우유', '한', '병', '주세요.', '하나', '일', '개'],
        explain: '固有数 하나 → 한 + 병(瓶量词) + 주세요。饮料用 병 量词',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应',
      task: {
        id: 'd09-b5-t7',
        audioKo: '봉투 필요하세요?',
        promptZh: '店员问"需要袋子吗？"你自带环保袋不需要，应该？',
        choices: [
          { text: '네, 주세요.', correct: false },
          { text: '아니요, 괜찮아요.', correct: true },
          { text: '얼마예요?', correct: false },
          { text: '몰라요.', correct: false },
        ],
        explain: '婉拒袋子：아니요, 괜찮아요。「괜찮아요」在这里 = 不用了，谢谢',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd09-b5-t8',
        promptZh: '结账时零钱撒了一地，考拉哥哥说「천천히 하세요」。你想道歉+道谢，应该？',
        choices: [
          { text: '감사합니다. 죄송해요.', correct: true },
          { text: '아니요, 없어요.', correct: false },
          { text: '만나서 반가워요.', correct: false },
          { text: '얼마예요?', correct: false },
        ],
        explain: '给别人添麻烦时韩国人道谢+道歉一起说：감사합니다 + 죄송해요。是最礼貌的回应',
      },
    },
  ],
};
