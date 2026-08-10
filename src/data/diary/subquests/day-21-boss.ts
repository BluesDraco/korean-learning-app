import type { BossSubQuestData } from '@/types/tori-subquest';

/**
 * Day 21 · 1-5 Boss 战 · 签约综合大考 · 里程碑关（🏠 拿到第一把钥匙）
 * 8 题混合：听句选意×2 + 助词/形态改错×2 + 认词×1 + 组句×2 + 情景选回应×1
 * 核心：签约四步流程语料 · 맞아요 / V면 되다 / 잘 부탁드립니다
 */
export const day21Boss: BossSubQuestData = {
  day: 21, level: 'beginner', idx: 5, kind: 'boss',
  koTitle: '최후의 관문',
  subtitle: '🏠 拿到第一把钥匙', subtitleEn: '🏠 Getting the First Key',
  intro: '三张纸的合同摊在长桌上，笔递到 Tori 手里。老犬中介轻轻咳了一声，海豹房东金链子晃了一下。这一分钟里，你要用韩语把每一步走稳。', introEn: 'A three-page contract lies spread on the long table, and a pen is handed to Tori. The old dog agent clears his throat softly, and the seal landlord\'s gold chain sways. In this minute, you need to steady every step in Korean.',
  outroHook: '通过！钥匙扣上挂着一个橙色的小胡萝卜。Tori 在首尔真的有家了。下周，해요体动词变位——语言真正开始"用起来"的一周。', outroHookEn: 'Passed! A small orange carrot hangs on the keychain. Tori really has a home in Seoul now. Next week, 해요-style verb conjugation—the week the language truly starts to be "used."',

  tasks: [
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd21-b5-t1',
        audioKo: '보증금 500만, 월세 50만. 맞아요?',
        choices: [
          { text: '押金500万，月租50万。对吗？', textEn: 'Deposit 5 million won, monthly rent 500,000 won. Correct?', correct: true },
          { text: '押金500万，月租不确定。', textEn: 'Deposit is 5 million won, monthly rent uncertain.', correct: false },
          { text: '押金和月租一共550万。', textEn: 'Deposit and monthly rent total 5.5 million won.', correct: false },
          { text: '不能这样定价。', textEn: 'You can\'t price it like that.', correct: false },
        ],
        explain: '확인 步骤：复述数字 + 맞아요? 让对方核对', explainEn: '확인 step: repeat the numbers + 맞아요? to have the other person confirm',
      },
    },
    {
      type: 'choice',
      label: '听句选意', labelEn: 'Listen and choose the meaning',
      task: {
        id: 'd21-b5-t2',
        audioKo: '앞으로 잘 부탁드립니다.',
        choices: [
          { text: '以后请多关照。', textEn: 'Please take care of me from now on.', correct: true },
          { text: '请稍等一下。', textEn: 'Please wait a moment.', correct: false },
          { text: '以前谢谢您了。', textEn: 'Thank you for before.', correct: false },
          { text: '再见，我要走了。', textEn: 'Goodbye, I\'m leaving now.', correct: false },
        ],
        explain: '합쇼체最高级礼貌。用于**关系起点**（签约/入职/初见）', explainEn: '합쇼체 is the highest level of politeness. Used at the **start of a relationship** (signing a contract/starting a job/first meeting).',
      },
    },
    {
      type: 'choice',
      label: '助词改错', labelEn: 'Particle error correction',
      task: {
        id: 'd21-b5-t3',
        promptZh: '"请在25号转账"哪句正确？', promptZhEn: 'Which sentence is correct for "Please transfer on the 25th"?',
        choices: [
          { text: '25일이 입금해 주세요.', correct: false },
          { text: '25일에 입금해 주세요.', correct: true },
          { text: '25일을 입금해 주세요.', correct: false },
          { text: '25일도 입금해 주세요.', correct: false },
        ],
        explain: '时间点用 에：25일 + 에', explainEn: 'Time points use 에: 25일 + 에',
      },
    },
    {
      type: 'choice',
      label: '形态改错', labelEn: 'Fix the form',
      task: {
        id: 'd21-b5-t4',
        promptZh: '"在这签名就行了吧？"哪句正确？', promptZhEn: 'Which sentence is correct for "I can just sign here, right?"',
        choices: [
          { text: '여기 사인하고 되죠?', correct: false },
          { text: '여기 사인하면 되죠?', correct: true },
          { text: '여기 사인해서 되죠?', correct: false },
          { text: '여기 사인해도 되죠?', correct: false },
        ],
        explain: '「V + 면 되다」= 做了就行 是固定搭配', explainEn: '「V + 면 되다」= just do it and it\'s fine, is a fixed expression',
      },
    },
    {
      type: 'choice',
      label: '认词', labelEn: 'Word recognition',
      task: {
        id: 'd21-b5-t5',
        promptKo: '계약서',
        promptHangul: 'gye-yak-seo',
        choices: [
          { text: '合同 / 合同书', textEn: 'contract / contract document', correct: true },
          { text: '收据', textEn: 'receipt', correct: false },
          { text: '身份证', textEn: 'ID Card', correct: false },
          { text: '房产证', textEn: 'property deed', correct: false },
        ],
        explain: '계약(合同) + 서(文书) = 合同书', explainEn: '계약 (contract) + 서 (document) = contract document',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd21-b5-t6',
        zhHint: '押金500万，月租50万。对吗？', zhHintEn: 'Deposit 5 million won, monthly rent 500,000 won. Correct?',
        audioKo: '보증금 500만, 월세 50만. 맞아요?',
        answer: ['보증금', '500만,', '월세', '50만.', '맞아요?'],
        tokens: ['보증금', '500만,', '월세', '50만.', '맞아요?', '얼마예요?', '따로예요?'],
        explain: '확인 步骤：复述数字 + 맞아요?', explainEn: 'Confirmation step: repeat the number + 맞아요?',
      },
    },
    {
      type: 'compose',
      label: '组句', labelEn: 'Make a sentence',
      task: {
        id: 'd21-b5-t7',
        zhHint: '谢谢。以后请多关照。', zhHintEn: 'Thank you. Please take care of me from now on.',
        audioKo: '감사합니다. 앞으로 잘 부탁드립니다.',
        answer: ['감사합니다.', '앞으로', '잘', '부탁드립니다.'],
        tokens: ['감사합니다.', '앞으로', '잘', '부탁드립니다.', '반가워요.', '없어요.', '주세요.'],
        explain: '합쇼체感谢 + 앞으로 잘 부탁드립니다。签约标准结尾', explainEn: 'Formal thanks + 앞으로 잘 부탁드립니다. Standard closing for signing contracts.',
      },
    },
    {
      type: 'choice',
      label: '情景选回应', labelEn: 'Choose a response for the situation',
      task: {
        id: 'd21-b5-t8',
        promptZh: '合同第七条 "매주 당근 1개 제공"，你不确定是俚语还是真的胡萝卜，最合适的问法？', promptZhEn: 'Clause 7 says "매주 당근 1개 제공" — you\'re not sure if it\'s slang or literal carrots. What\'s the best way to ask?',
        choices: [
          { text: '이거 당근이죠? 당연히?', correct: true },
          { text: '당근이 뭐예요?', correct: false },
          { text: '얼마예요?', correct: false },
          { text: '싫어요.', correct: false },
        ],
        explain: '不懂就问 → 用「~죠?」软性确认。比"뭐예요?"更礼貌，也显得你有语感', explainEn: 'If you don\'t understand, ask — use 「~죠?」 for soft confirmation. It\'s more polite than "뭐예요?" and shows you have a feel for the language.',
      },
    },
  ],
};
