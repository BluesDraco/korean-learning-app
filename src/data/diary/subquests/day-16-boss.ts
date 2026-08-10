import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 16 · 1-5 Boss 战 · ~고 있어요 综合大考
 * 8 题混合：听句选意×2 + 助词/形态改错×1 + 认词×1 + 组句×2 + 听对话选回应×1 + 情景选回应×1
 * outroHook 衔接 Day 17：티머니카드 · 交通卡 + ~아/어 주세요
 */
export const day16Boss: BossSubQuestData = {
  day: 16, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '房产中介通关 · 从"어떤 집 찾으세요?"到看房', subtitleEn: 'Real Estate Agent Pass · From "어떤 집 찾으세요?" to Viewing',
  intro: '幸福房产的门铃刚响过，橡果摆件安静地立在桌上。老犬翻册子的手指停在一页——"학교 근처, 3층 원룸"。你要用韩语完成从"我找什么"到"什么时候能看"的全对话。', introEn: 'The doorbell at Happy Realty just rang, and an acorn ornament sits quietly on the table. The old dog\'s finger stops on a page of the brochure—"학교 근처, 3층 원룸". You need to complete the entire conversation in Korean, from "what I\'m looking for" to "when can I see it."',
  outroHook: '通过！老犬中介约你周日实地看房。回宿舍路上你才想起——地铁卡快没钱了。明天要去补充：티머니카드。下一关，你要学会说「충전해 주세요」（请帮我充值）。', outroHookEn: 'Pass! The old dog agent schedules a viewing for Sunday. On your way back to the dorm, you remember—your subway card is almost out of money. Tomorrow you need to top it up: 티머니카드. Next level, you\'ll learn to say 「충전해 주세요」 (Please charge it for me).',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd16-b5-t1',
        audioKo: '원룸 찾고 있어요.',
        choices: [
          { text: '正在找一居室。', textEn: 'I\'m looking for a studio.', correct: true },
          { text: '想找一居室。', textEn: 'Looking for a studio.', correct: false },
          { text: '找到一居室了。', textEn: 'Found a studio.', correct: false },
          { text: '要买一居室。', textEn: 'Want to buy a studio.', correct: false },
        ],
        explain: '~고 있어요 = 进行时。租房场景标准句', explainEn: '~고 있어요 = present progressive. Standard sentence for rental scenarios.',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd16-b5-t2',
        audioKo: '어떤 집 찾으세요?',
        choices: [
          { text: '您找什么样的房子？', textEn: 'What kind of house are you looking for?', correct: true },
          { text: '您住哪里？', textEn: 'Where do you live?', correct: false },
          { text: '有什么房子？', textEn: 'What housing is available?', correct: false },
          { text: '房子在哪里？', textEn: 'Where is the house?', correct: false },
        ],
        explain: '어떤(什么样的) + 집 + 찾다 + 세요?（敬语疑问）', explainEn: '어떤 (what kind of) + 집 (house) + 찾다 (to look for) + 세요? (polite question)',
      },
    },
    {
      type: 'choice',
      label: '语法改错', labelEn: 'Grammar Correction',
      task: {
        id: 'd16-b5-t3',
        promptZh: '"正在学韩语"最标准的说法？', promptZhEn: 'What\'s the most standard way to say "I\'m learning Korean"?',
        choices: [
          { text: '한국어 공부하고 싶어요.', correct: false },
          { text: '한국어 공부하고 있어요.', correct: true },
          { text: '한국어 공부해요.', correct: false },
          { text: '한국어 공부할래요.', correct: false },
        ],
        explain: '~고 있어요 强调"当下正在做"。~고 싶어요 是"想做"，~해요 是一般现在，~할래요 是"要做"', explainEn: '~고 있어요 emphasizes "doing right now." ~고 싶어요 means "want to do," ~해요 is simple present, ~할래요 means "going to do."',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd16-b5-t4',
        promptKo: '부동산',
        promptHangul: 'bu-dong-san',
        choices: [
          { text: '房产中介 / 不动产', textEn: 'Real estate agent / real estate', correct: true },
          { text: '银行', textEn: 'bank', correct: false },
          { text: '便利店', textEn: 'Convenience store', correct: false },
          { text: '文具店', textEn: 'Stationery store', correct: false },
        ],
        explain: '汉字词「不动产」。既指房产也指中介店', explainEn: 'Sino-Korean word for "real estate." Refers to both property and the agency.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd16-b5-t5',
        zhHint: '正在找学校附近的一居室。', zhHintEn: 'I\'m looking for a studio near school.',
        audioKo: '학교 근처 원룸 찾고 있어요.',
        answer: ['학교', '근처', '원룸', '찾고', '있어요.'],
        tokens: ['학교', '근처', '원룸', '찾고', '있어요.', '찾아요.', '찾을래요.', '찾고 싶어요.'],
        explain: '학교 근처(学校附近) + 원룸(一居室) + 찾고 있어요(正在找)', explainEn: '학교 근처 (near school) + 원룸 (studio) + 찾고 있어요 (am looking for)',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd16-b5-t6',
        zhHint: '押金500万，月租50万左右。', zhHintEn: 'Deposit is 5 million won, and monthly rent is around 500,000 won.',
        audioKo: '보증금은 500만, 월세는 50만 정도요.',
        answer: ['보증금은', '500만,', '월세는', '50만', '정도요.'],
        tokens: ['보증금은', '500만,', '월세는', '50만', '정도요.', '월세가', '보증금이', '이에요.'],
        explain: '押金 + 月租的标准预算表达。「정도요」= 左右', explainEn: 'Standard budget expression for deposit + monthly rent. 정도요 = about/around.',
      },
    },
    {
      type: 'choice',
      label: '听对话选回应', labelEn: 'Listen to the dialogue and choose a response',
      task: {
        id: 'd16-b5-t7',
        audioKo: '지금 뭐 하고 있어요?',
        promptZh: '朋友打电话问"你现在在做什么？"你正在看房，最自然的回答？', promptZhEn: 'Your friend calls and asks, "What are you doing right now?" You\'re looking at a house. What\'s the most natural answer?',
        choices: [
          { text: '집 보고 있어요.', correct: true },
          { text: '집 보고 싶어요.', correct: false },
          { text: '집 봤어요.', correct: false },
          { text: '집 볼래요.', correct: false },
        ],
        explain: '보다 + 고 있어요 = 正在看。跟问句时态对应', explainEn: '보다 + 고 있어요 = am looking. Matches the tense of the question.',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd16-b5-t8',
        promptZh: '中介推荐一间学校附近的房源。你想约看房——最自然的一句？', promptZhEn: 'The agent recommends a place near school. You want to schedule a viewing—what\'s the most natural thing to say?',
        choices: [
          { text: '아, 진짜요? 언제 볼 수 있어요?', correct: true },
          { text: '없어요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '만나서 반가워요.', correct: false },
        ],
        explain: '진짜요? 表兴趣 + 언제 볼 수 있어요? 约看房时间。看房必备黄金二连', explainEn: '진짜요? shows interest + 언제 볼 수 있어요? to set a viewing time. The golden combo for house viewings.',
      },
    },
  ],
};
