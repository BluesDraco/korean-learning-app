import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 17 · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖售票窗口办卡 · 充值 · 支付方式 · 旅行拍照
 */
export const day17Scene: SceneSubQuestData = {
  day: 17, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在地铁站办 T-money 卡，独立完成办卡+充值+付款', subtitleEn: 'Get a T-money card at the subway station, completing card issuance + recharge + payment on your own.',

  tasks: [
    {
      type: 'situation',
      id: 'd17-sc-s1',
      scenario: '你走到售票窗口前。想办一张 T-money 卡——最自然的开场？', scenarioEn: 'You walk up to the ticket window. You want to get a T-money card—what\'s the most natural opener?',
      choices: [
        { ko: '티머니카드 하나 주세요.', zh: '请给我一张 T-money 卡。', zhEn: 'Please give me a T-money card.', correct: true },
        { ko: '티머니카드 있어요?', zh: '有 T-money 卡吗？（问库存而不是购买）', zhEn: 'Do you have T-money cards? (asking about stock, not buying)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（没说要什么就问价格）', zhEn: 'How much is it? (asking price without specifying what)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
      ],
      explain: '窗口办事直接说需求：物品 + 하나 + 주세요。「하나」= 一（个/张）', explainEn: 'At the window, state your need directly: item + 하나 + 주세요. \'하나\' = one (item/card).',
    },
    {
      type: 'situation',
      id: 'd17-sc-s2',
      scenario: '售票员说「카드는 4,000원이에요.」你想同时充一万元——最自然的一句？', scenarioEn: 'The clerk says, "The card is 4,000 won." You want to also charge 10,000 won—what\'s the most natural thing to say?',
      choices: [
        { ko: '만 원 충전 해 주세요.', zh: '请帮我充值一万元。', zhEn: 'Please charge 10,000 won for me.', correct: true },
        { ko: '충전 있어요?', zh: '有充值吗？（不通）', zhEn: 'Do you have recharging? (doesn\'t work)', correct: false },
        { ko: '만 원 주세요.', zh: '请给我一万元。（你在向售票员要一万元？）', zhEn: 'Please give me 10,000 won. (Are you asking the ticket seller for 10,000 won?)', correct: false },
        { ko: '카드 4000원이에요.', zh: '卡是 4000 元。（重复售票员的话）', zhEn: 'The card is 4,000 won. (Repeating what the ticket seller said)', correct: false },
      ],
      explain: '「金额 + 充值 + 해 주세요」= 请帮我充值~。「充值」是 하다 类 → 해 주세요', explainEn: '\'Amount + 충전 + 해 주세요\' = Please charge it for me. \'충전\' is a 하다 verb → 해 주세요',
    },
    {
      type: 'situation',
      id: 'd17-sc-s3',
      scenario: '售票员问「어떻게 결제하시겠어요?」（用什么支付？）你想用卡支付，最自然的一句？', scenarioEn: 'The ticket seller asks \'어떻게 결제하시겠어요?\' (How would you like to pay?) You want to pay by card—what\'s the most natural response?',
      choices: [
        { ko: '카드로 할게요.', zh: '我用卡付。', zhEn: 'I\'ll pay by card.', correct: true },
        { ko: '현금으로 할게요.', zh: '我用现金付。（跟条件矛盾）', zhEn: 'I\'ll pay with cash. (Contradicts the condition)', correct: false },
        { ko: '카드 있어요?', zh: '你有卡吗？（换问对方）', zhEn: 'Do you have a card? (Asking the other person instead)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（应该在问价前用）', zhEn: 'How much is it? (Should be used before asking for the price)', correct: false },
      ],
      explain: '「N + 로 할게요」= 我用 N（付）。로 是方式助词，할게요 表意愿', explainEn: '\'N + 로 할게요\' = I\'ll pay with N. 로 is a method particle, 할게요 expresses intention',
    },

    {
      type: 'dialogue',
      id: 'd17-sc-d1',
      lines: [
        { speaker: '猫头鹰 매표', speakerEn: 'Owl ticket booth', ko: '어떻게 도와드릴까요?', zh: '我能怎么帮您？', zhEn: 'How can I help you?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '티머니카드 하나 주세요. 그리고 만 원 충전 해 주세요.', zh: '请给我一张 T-money 卡。还请帮我充值一万元。', zhEn: 'Please give me a T-money card. And please charge it with 10,000 won.', correct: true },
        { ko: '얼마예요?', zh: '多少钱？（未说要什么）', zhEn: 'How much is it? (Without specifying what)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
        { ko: '없어요.', zh: '没有。（不对题）', zhEn: 'No. (Off-topic.)', correct: false },
      ],
      explain: '售票员敬语问 → 客户列需求：办卡 + 充值一次说清', explainEn: 'Ticket seller asks politely → Customer states needs: get card + charge in one go',
    },
    {
      type: 'dialogue',
      id: 'd17-sc-d2',
      lines: [
        { speaker: '猫头鹰 매표', speakerEn: 'Owl ticket booth', ko: '모두 14,000원이에요.', zh: '一共 14000 元。', zhEn: 'That\'s 14,000 won in total.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '카드로 할게요.', zh: '我用卡付。', zhEn: 'I\'ll pay by card.', correct: true },
        { ko: '너무 비싸요.', zh: '太贵了。（不礼貌）', zhEn: 'That\'s too expensive. (Rude)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（刚说过了）', zhEn: 'How much is it? (Already said)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
      ],
      explain: '收到总价 → 选择支付方式。「카드로 할게요」是标准回答', explainEn: 'Got the total → Choose payment method. \'카드로 할게요\' is the standard response',
    },
    {
      type: 'dialogue',
      id: 'd17-sc-d3',
      lines: [
        { speaker: '游客', speakerEn: 'Tourist', ko: '저기요, 잠깐 시간 있어요?', zh: '请问，稍微有点时间吗？', zhEn: 'Excuse me, do you have a moment?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '네, 사진 찍어 드릴까요?', zh: '好的，要我帮您拍照吗？', zhEn: 'Sure, would you like me to take a photo for you?', correct: true },
        { ko: '아니요, 없어요.', zh: '不，没有。（拒绝陌生游客的请求略生硬）', zhEn: 'No, I don\'t. (Refusing a stranger tourist\'s request is a bit blunt)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', zhEn: 'How much? (Off-topic.)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
      ],
      explain: '游客搭话通常想请人拍照。「찍어 드릴까요?」= 要我为您拍吗？（드리다 是 주다 的敬语）', explainEn: 'Tourists usually start a conversation to ask for a photo. \'찍어 드릴까요?\' = Shall I take one for you? (드리다 is the honorific of 주다)',
    },

    {
      type: 'context',
      id: 'd17-sc-c1',
      ko: '충전 해 주세요.',
      promptZh: '关于「해 주세요」，哪个描述最准确？', promptZhEn: 'Which description of \'해 주세요\' is most accurate?',
      choices: [
        { zh: '하다 类动词的"请帮我做"形式：하 + 여 → 해 + 주세요', zhEn: 'The \'please do it for me\' form of 하다 verbs: 하 + 여 → 해 + 주세요', correct: true },
        { zh: '正确说法是 「하아 주세요」', zhEn: 'The correct form is \'하아 주세요\'', correct: false },
        { zh: '「해 주세요」和「하세요」意思一样', zhEn: '\'해 주세요\' and \'하세요\' mean the same thing', correct: false },
        { zh: '「해 주세요」只能用于食物', zhEn: '\'해 주세요\' is only used for food', correct: false },
      ],
      explain: '所有 하다 类动词都变成 해 주세요：공부하다 → 공부해 주세요、청소하다 → 청소해 주세요', explainEn: 'All 하다 verbs become 해 주세요: 공부하다 → 공부해 주세요, 청소하다 → 청소해 주세요',
    },
    {
      type: 'context',
      id: 'd17-sc-c2',
      ko: '카드로 할게요.',
      promptZh: '关于「N + 로/으로」的用法，哪个描述最准确？', promptZhEn: 'Which description of \'N + 로/으로\' is most accurate?',
      choices: [
        { zh: '「로/으로」= 方式助词"用~"。无받침或 ㄹ → 로；有받침（ㄹ除外）→ 으로', correct: true },
        { zh: '「로/으로」= 主格助词', zhEn: '\'로/으로\' = subject particle', correct: false },
        { zh: '「로/으로」= 宾格助词', zhEn: '\'로/으로\' = object particle', correct: false },
        { zh: '「로/으로」= 时间助词', zhEn: '\'로/으로\' = time particle', correct: false },
      ],
      explain: '카드로（카드 무받침 → 로）、현금으로（현금 有받침 ㅁ → 으로）、지하철로（지하철 받침 ㄹ → 로）',
    },
  ],
};
