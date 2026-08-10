import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 16 · 1-5 Boss 战 · ~고 있어요 综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 17：티머니카드 · 交通卡 + ~아/어 주세요
 */
export const day16Boss: BossSubQuestData = {
  day: 16, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '房产中介通关 · 从"어떤 집 찾으세요?"到看房',
  intro: '幸福房产的门铃刚响过，橡果摆件安静地立在桌上。老犬翻册子的手指停在一页——"학교 근처, 3층 원룸"。你要用韩语完成从"我找什么"到"什么时候能看"的全对话。',
  outroHook: '通过！老犬中介约你周日实地看房。回宿舍路上你才想起——地铁卡快没钱了。明天要去补充：티머니카드。下一关，你要学会说「충전해 주세요」（请帮我充值）。',

  tasks: [
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd16-b5-t1',
        audioKo: '원룸 찾고 있어요.',
        choices: [
          { text: '正在找一居室。', correct: true },
          { text: '想找一居室。', correct: false },
          { text: '找到一居室了。', correct: false },
          { text: '要买一居室。', correct: false },
        ],
        explain: '~고 있어요 = 进行时。租房场景标准句',
      },
    },
    {
      type: 'choice',
      label: '听句选意',
      task: {
        id: 'd16-b5-t2',
        audioKo: '어떤 집 찾으세요?',
        choices: [
          { text: '您找什么样的房子？', correct: true },
          { text: '您住哪里？', correct: false },
          { text: '有什么房子？', correct: false },
          { text: '房子在哪里？', correct: false },
        ],
        explain: '어떤(什么样的) + 집 + 찾다 + 세요?（敬语疑问）',
      },
    },
    {
      type: 'choice',
      label: '语法改错',
      task: {
        id: 'd16-b5-t3',
        promptZh: '"正在学韩语"最标准的说法？',
        choices: [
          { text: '한국어 공부하고 싶어요.', correct: false },
          { text: '한국어 공부하고 있어요.', correct: true },
          { text: '한국어 공부해요.', correct: false },
          { text: '한국어 공부할래요.', correct: false },
        ],
        explain: '~고 있어요 强调"当下正在做"。~고 싶어요 是"想做"，~해요 是一般现在，~할래요 是"要做"',
      },
    },
    {
      type: 'choice',
      label: '认词',
      task: {
        id: 'd16-b5-t4',
        promptKo: '부동산',
        promptHangul: 'bu-dong-san',
        choices: [
          { text: '房产中介 / 不动产', correct: true },
          { text: '银行', correct: false },
          { text: '便利店', correct: false },
          { text: '文具店', correct: false },
        ],
        explain: '汉字词「不动产」。既指房产也指中介店',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd16-b5-t5',
        zhHint: '正在找学校附近的一居室。',
        audioKo: '학교 근처 원룸 찾고 있어요.',
        answer: ['학교', '근처', '원룸', '찾고', '있어요.'],
        tokens: ['학교', '근처', '원룸', '찾고', '있어요.', '찾아요.', '찾을래요.', '찾고 싶어요.'],
        explain: '학교 근처(学校附近) + 원룸(一居室) + 찾고 있어요(正在找)',
      },
    },
    {
      type: 'compose',
      label: '组句',
      task: {
        id: 'd16-b5-t6',
        zhHint: '押金500万，月租50万左右。',
        audioKo: '보증금은 500만, 월세는 50만 정도요.',
        answer: ['보증금은', '500만,', '월세는', '50만', '정도요.'],
        tokens: ['보증금은', '500만,', '월세는', '50만', '정도요.', '월세가', '보증금이', '이에요.'],
        explain: '押金 + 月租的标准预算表达。「정도요」= 左右',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应',
      task: {
        id: 'd16-b5-t7',
        audioKo: '지금 뭐 하고 있어요?',
        promptZh: '朋友打电话问"你现在在做什么？"你正在看房，最自然的回答？',
        choices: [
          { text: '집 보고 있어요.', correct: true },
          { text: '집 보고 싶어요.', correct: false },
          { text: '집 봤어요.', correct: false },
          { text: '집 볼래요.', correct: false },
        ],
        explain: '보다 + 고 있어요 = 正在看。跟问句时态对应',
      },
    },
    {
      type: 'choice',
      label: '情景选回应',
      task: {
        id: 'd16-b5-t8',
        promptZh: '中介推荐一间学校附近的房源。你想约看房——最自然的一句？',
        choices: [
          { text: '아, 진짜요? 언제 볼 수 있어요?', correct: true },
          { text: '없어요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '진짜요? 表兴趣 + 언제 볼 수 있어요? 约看房时间。看房必备黄金二连',
      },
    },
  ],
};
