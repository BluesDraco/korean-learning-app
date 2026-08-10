import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 20 · 1-5 Boss 战 · 见房东综合大考
 * 8 题混合：听句选意×2 + 助词改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：N에 뭐가 들어 있어요? / 만 / 따로예요 / 租房费用词汇
 */
export const day20Boss: BossSubQuestData = {
  day: 20, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '把海豹房东的每一笔账问清楚', subtitleEn: 'Ask the seal landlord about every single charge.',
  intro: '空房间的地板反着阳光。海豹房东摊开文件夹，皮鞋磨得发亮。他抬眼看你，一副"看你能问出什么"的表情。今天学过的每一个词都要用上。', introEn: 'The empty room\'s floor reflects the sunlight. The seal landlord spreads out a folder, his shoes polished to a shine. He looks up at you with a "let\'s see what you can ask" expression. Use every word you learned today.',
  outroHook: '通过！租金、管理费都问清楚了。明天，海豹房东会摊开三页合同正式签约——每一个条款、每一句당근俚语，都要听懂再落笔。', outroHookEn: 'Passed! You\'ve clarified the rent and management fees. Tomorrow, the seal landlord will spread out a three-page contract for official signing—understand every clause and every piece of 당근 slang before you put pen to paper.',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd20-b5-t1',
        audioKo: '관리비에 뭐가 들어 있어요?',
        choices: [
          { text: '管理费包含什么？', textEn: 'What does the maintenance fee include?', correct: true },
          { text: '管理费多少？', textEn: 'How much is the management fee?', correct: false },
          { text: '管理费怎么交？', textEn: 'How do I pay the management fee?', correct: false },
          { text: '管理费另算吗？', textEn: 'Is the management fee separate?', correct: false },
        ],
        explain: 'N에 뭐가 들어 있어요? = N 里包含什么', explainEn: 'N에 뭐가 들어 있어요? = What does N include?',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd20-b5-t2',
        audioKo: '전기세는 따로예요.',
        choices: [
          { text: '电费另算。', textEn: 'Electricity is extra.', correct: true },
          { text: '电费很贵。', textEn: 'Electricity is expensive.', correct: false },
          { text: '电费包含在里面。', textEn: 'Electricity is included.', correct: false },
          { text: '电费免费。', textEn: 'Electricity is free.', correct: false },
        ],
        explain: '「N은/는 따로예요」= N 另算', explainEn: '「N은/는 따로예요」= N is separate',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd20-b5-t3',
        promptZh: '"管理费包含什么？"哪句正确？', promptZhEn: 'Which sentence is correct for "What does the management fee include?"',
        choices: [
          { text: '관리비 뭐가 들어 있어요?', correct: false },
          { text: '관리비에 뭐가 들어 있어요?', correct: true },
          { text: '관리비가 뭐 들어 있어요?', correct: false },
          { text: '관리비를 뭐가 들어 있어요?', correct: false },
        ],
        explain: 'N에 中的 에 不能省 → 관리비 + 에', explainEn: 'The 에 in N에 can\'t be omitted → 관리비 + 에',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd20-b5-t4',
        promptZh: '"只包含网费"哪句正确？', promptZhEn: 'Which sentence is correct for "Only internet is included"?',
        choices: [
          { text: '인터넷은 들어 있어요.', correct: false },
          { text: '인터넷만 들어 있어요.', correct: true },
          { text: '인터넷도 들어 있어요.', correct: false },
          { text: '인터넷을 들어 있어요.', correct: false },
        ],
        explain: '「만」= 只（限定）。要表达"只包含"必须用 만', explainEn: '「만」= only (limiting). To express "only includes," you must use 만',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd20-b5-t5',
        promptKo: '보증금',
        promptHangul: 'bo-jeung-geum',
        choices: [
          { text: '押金', textEn: 'deposit', correct: true },
          { text: '月租', textEn: 'monthly rent', correct: false },
          { text: '管理费', textEn: 'maintenance fee', correct: false },
          { text: '中介费', textEn: 'brokerage fee', correct: false },
        ],
        explain: '보(保) + 증(证) + 금(金) = 押金。韩国租房制度中的核心词', explainEn: '보(保) + 증(证) + 금(金) = deposit. A key term in Korea\'s rental system.',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd20-b5-t6',
        zhHint: '管理费包含什么？', zhHintEn: 'What does the maintenance fee include?',
        audioKo: '관리비에 뭐가 들어 있어요?',
        answer: ['관리비에', '뭐가', '들어', '있어요?'],
        tokens: ['관리비에', '뭐가', '들어', '있어요?', '관리비', '뭐를', '갔어요?'],
        explain: '租房必问句：N에 + 뭐가 + 들어 있어요?', explainEn: 'Essential rental question: N에 + 뭐가 + 들어 있어요?',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd20-b5-t7',
        zhHint: '电费另算。', zhHintEn: 'Electricity is extra.',
        audioKo: '전기세는 따로예요.',
        answer: ['전기세는', '따로예요.'],
        tokens: ['전기세는', '따로예요.', '전기세가', '전기세를', '따로 있어요.', '아니에요.'],
        explain: '陈述"某项另算"用「N은/는 따로예요」', explainEn: 'To say something is billed separately, use 「N은/는 따로예요」',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd20-b5-t8',
        promptZh: '房东确认身份说「토리 학생이죠?」，第一次见面最合适的一句？', promptZhEn: 'The landlord confirms your identity with 「토리 학생이죠?」—what\'s the best first-meeting response?',
        choices: [
          { text: '네, 안녕하세요. 잘 부탁드려요.', correct: true },
          { text: '아니요.', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '만나서 반가워요만 하고요.', correct: false },
        ],
        explain: '第一次见房东 → 承认身份 + 打招呼 + 잘 부탁드려요（请多关照）', explainEn: 'First meeting with the landlord → confirm identity + greet + 잘 부탁드려요 (please take care of me)',
      },
    },
  ],
};
