import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 21 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 21 主流程「签约现场·三人围坐」
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化 확인步骤 (맞아요? / 어떻게 돼요?) + 하면 되죠? 结构
 */
export const day21Listen: ListenSubQuestData = {
  day: 21, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在签约桌前，听清老犬中介和海豹房东的每一句', subtitleEn: 'At the signing table, listen carefully to every word from the old dog agent and the seal landlord.',

  meaning: [
    {
      id: 'd21-l2-m1',
      audioKo: '계약서 가져왔어요. 여기 사인해 주세요.',
      choices: [
        { text: '合同带来了。请在这里签名。', textEn: 'I\'ve brought the contract. Please sign here.', correct: true },
        { text: '合同弄丢了。请再写一份。', textEn: 'The contract is lost. Please write another one.', correct: false },
        { text: '合同没到期。请稍等。', textEn: 'The contract hasn\'t expired. Please wait.', correct: false },
        { text: '请把合同放在这里。', textEn: 'Please put the contract here.', correct: false },
      ],
      explain: '中介办正事的标准起手式：「계약서 가져왔어요」+「여기 사인해 주세요」', explainEn: 'The standard way an agent gets down to business: \'계약서 가져왔어요\' + \'여기 사인해 주세요.\'',
    },
    {
      id: 'd21-l2-m2',
      audioKo: '계약 기간은 1년이에요.',
      choices: [
        { text: '合同期限是1年。', textEn: 'The contract period is 1 year.', correct: true },
        { text: '合同要签1个月。', textEn: 'The contract is for 1 month.', correct: false },
        { text: '一年后合同结束。', textEn: 'The contract ends after one year.', correct: false },
        { text: '合同下周1号生效。', textEn: 'The contract takes effect on the 1st of next week.', correct: false },
      ],
      explain: '계약 기간 = 合同期限。韩国租房通常 1~2年', explainEn: '계약 기간 = contract period. In Korea, rental contracts are typically 1–2 years.',
    },
    {
      id: 'd21-l2-m3',
      audioKo: '네, 맞아요.',
      choices: [
        { text: '是的，没错。', textEn: 'Yes, that\'s right.', correct: true },
        { text: '好的，我知道了。', textEn: 'Okay, got it.', correct: false },
        { text: '没关系。', textEn: 'It\'s okay.', correct: false },
        { text: '请稍等。', textEn: 'Please wait a moment.', correct: false },
      ],
      explain: '맞다(对) + 아요 = 맞아요。确认对方说的内容"没错"', explainEn: '맞다 (correct) + 아요 = 맞아요. Confirming that what the other person said is "right."',
    },
    {
      id: 'd21-l2-m4',
      audioKo: '25일에 입금해 주세요.',
      choices: [
        { text: '请在25号转账。', textEn: 'Please transfer on the 25th.', correct: true },
        { text: '请交25万押金。', textEn: 'Please pay a deposit of 250,000 won.', correct: false },
        { text: '请等25天。', textEn: 'Please wait 25 days.', correct: false },
        { text: '25号我会转给你。', textEn: 'I\'ll transfer it to you on the 25th.', correct: false },
      ],
      explain: '「N일에 입금해 주세요」= 请在 N 号转账。租房时房东说的固定句', explainEn: '「N일에 입금해 주세요」= Please transfer on the N-th. A fixed phrase landlords use when renting.',
    },
    {
      id: 'd21-l2-m5',
      audioKo: '앞으로 잘 부탁드립니다.',
      choices: [
        { text: '以后请多关照。', textEn: 'Please take care of me from now on.', correct: true },
        { text: '以前谢谢您了。', textEn: 'Thank you for before.', correct: false },
        { text: '请再等一下。', textEn: 'Please wait a bit longer.', correct: false },
        { text: '拜托您帮个忙。', textEn: 'I\'d like to ask you a favor.', correct: false },
      ],
      explain: '앞으로(以后) + 잘 부탁드립니다(请多关照)。签约/入职/初见的标准句', explainEn: '앞으로 (from now on) + 잘 부탁드립니다 (please take care of me). A standard phrase for contracts, starting a job, or first meetings.',
    },
  ],

  cloze: [
    {
      id: 'd21-l2-c1',
      audioKo: '보증금 500만, 월세 50만. 맞아요?',
      clozeParts: ['보증금 500만, 월세 50만. ', '?'],
      choices: [
        { text: '맞아요', correct: true },
        { text: '있어요', correct: false },
        { text: '알겠어요', correct: false },
        { text: '들어 있어요', correct: false },
      ],
      explain: '확인 步骤：复述数字 + 맞아요? 让对方核对', explainEn: '확인 step: repeat the numbers + 맞아요? to have the other person confirm',
    },
    {
      id: 'd21-l2-c2',
      audioKo: '여기 사인하면 되죠?',
      clozeParts: ['여기 ', ' 되죠?'],
      choices: [
        { text: '사인하면', correct: true },
        { text: '사인하고', correct: false },
        { text: '사인해서', correct: false },
        { text: '사인할래', correct: false },
      ],
      explain: '「V + 면 되다」= 做了就行。사인하면 되죠? = 签名就行了吧？', explainEn: '「V + 면 되다」= Just do it and it\'s fine. 사인하면 되죠? = Just signing is enough, right?',
    },
    {
      id: 'd21-l2-c3',
      audioKo: '계약 기간은 1년이에요.',
      clozeParts: ['계약 기간', ' 1년이에요.'],
      choices: [
        { text: '은', correct: true },
        { text: '이', correct: false },
        { text: '를', correct: false },
        { text: '에', correct: false },
      ],
      explain: '기간(期间) 有收音 ㄴ → 主题助词用 은。「계약 기간은 = 关于合同期限」', explainEn: '기간 (period) ends with the final consonant ㄴ → use the topic particle 은. 「계약 기간은 = Regarding the contract period」',
    },
    {
      id: 'd21-l2-c4',
      audioKo: '25일에 입금해 주세요.',
      clozeParts: ['25일', ' 입금해 주세요.'],
      choices: [
        { text: '에', correct: true },
        { text: '이', correct: false },
        { text: '을', correct: false },
        { text: '가', correct: false },
      ],
      explain: '时间点用 에：25日 + 에 = 在25号。입금 = 转账', explainEn: 'Use 에 for points in time: 25일 + 에 = on the 25th. 입금 = transfer.',
    },
  ],

  reply: [
    {
      id: 'd21-l2-r1',
      audioKo: '계약서 가져왔어요. 여기 사인해 주세요.',
      promptZh: '中介让你签名，你想先复述数字确认，最标准的一句？', promptZhEn: 'The agent asks you to sign, and you want to repeat the numbers to confirm first. What\'s the most standard phrase?',
      choices: [
        { text: '보증금 500만, 월세 50만. 맞아요?', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
        { text: '싫어요.', correct: false },
      ],
      explain: '签字前必做 확인 → 复述数字 + 맞아요?。这一步能避免日后纠纷', explainEn: 'Before signing, you must do 확인 → repeat the numbers + 맞아요?. This step can prevent future disputes.',
    },
    {
      id: 'd21-l2-r2',
      audioKo: '계약 기간은 1년이에요.',
      promptZh: '房东说合同 1 年，你想在签之前先确认签名位置，最自然的一句？', promptZhEn: 'The landlord says the contract is for 1 year, and you want to confirm where to sign before signing. What\'s the most natural phrase?',
      choices: [
        { text: '네, 알겠습니다. 여기 사인하면 되죠?', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '아니요, 싫어요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '알겠습니다 表示了解 +「V면 되죠?」再次确认动作。합쇼체适合签约场合', explainEn: '알겠습니다 means "understood" + 「V면 되죠?」 to re-confirm the action. 합쇼체 is appropriate for contract situations.',
    },
    {
      id: 'd21-l2-r3',
      audioKo: '자, 열쇠 여기 있어요.',
      promptZh: '房东递给你钥匙，签约完成，最合适的道别？', promptZhEn: 'The landlord hands you the keys, the contract is done. What\'s the most appropriate farewell?',
      choices: [
        { text: '감사합니다. 앞으로 잘 부탁드립니다.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '당근 주세요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '签约结束 → 감사합니다 + 앞으로 잘 부탁드립니다（합쇼체最正式）', explainEn: 'Contract finished → 감사합니다 + 앞으로 잘 부탁드립니다 (합쇼체 is the most formal).',
    },
  ],
};
