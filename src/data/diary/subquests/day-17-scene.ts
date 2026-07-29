import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 17 · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖售票窗口办卡 · 充值 · 支付方式 · 旅行拍照
 */
export const day17Scene: SceneSubQuestData = {
  day: 17, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在地铁站办 T-money 卡，独立完成办卡+充值+付款',

  tasks: [
    {
      type: 'situation',
      id: 'd17-sc-s1',
      scenario: '你走到售票窗口前。想办一张 T-money 卡——最自然的开场？',
      choices: [
        { ko: '티머니카드 하나 주세요.', zh: '请给我一张 T-money 卡。', correct: true },
        { ko: '티머니카드 있어요?', zh: '有 T-money 卡吗？（问库存而不是购买）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（没说要什么就问价格）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', correct: false },
      ],
      explain: '窗口办事直接说需求：物品 + 하나 + 주세요。「하나」= 一（个/张）',
    },
    {
      type: 'situation',
      id: 'd17-sc-s2',
      scenario: '售票员说「카드는 4,000원이에요.」你想同时充一万元——最自然的一句？',
      choices: [
        { ko: '만 원 충전 해 주세요.', zh: '请帮我充值一万元。', correct: true },
        { ko: '충전 있어요?', zh: '有充值吗？（不通）', correct: false },
        { ko: '만 원 주세요.', zh: '请给我一万元。（你在向售票员要一万元？）', correct: false },
        { ko: '카드 4000원이에요.', zh: '卡是 4000 元。（重复售票员的话）', correct: false },
      ],
      explain: '「金额 + 充值 + 해 주세요」= 请帮我充值~。「充值」是 하다 类 → 해 주세요',
    },
    {
      type: 'situation',
      id: 'd17-sc-s3',
      scenario: '售票员问「어떻게 결제하시겠어요?」（用什么支付？）你想用卡支付，最自然的一句？',
      choices: [
        { ko: '카드로 할게요.', zh: '我用卡付。', correct: true },
        { ko: '현금으로 할게요.', zh: '我用现金付。（跟条件矛盾）', correct: false },
        { ko: '카드 있어요?', zh: '你有卡吗？（换问对方）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（应该在问价前用）', correct: false },
      ],
      explain: '「N + 로 할게요」= 我用 N（付）。로 是方式助词，할게요 表意愿',
    },

    {
      type: 'dialogue',
      id: 'd17-sc-d1',
      lines: [
        { speaker: '猫头鹰 매표', ko: '어떻게 도와드릴까요?', zh: '我能怎么帮您？' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '티머니카드 하나 주세요. 그리고 만 원 충전 해 주세요.', zh: '请给我一张 T-money 卡。还请帮我充值一万元。', correct: true },
        { ko: '얼마예요?', zh: '多少钱？（未说要什么）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', correct: false },
        { ko: '없어요.', zh: '没有。（不对题）', correct: false },
      ],
      explain: '售票员敬语问 → 客户列需求：办卡 + 充值一次说清',
    },
    {
      type: 'dialogue',
      id: 'd17-sc-d2',
      lines: [
        { speaker: '猫头鹰 매표', ko: '모두 14,000원이에요.', zh: '一共 14000 元。' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '카드로 할게요.', zh: '我用卡付。', correct: true },
        { ko: '너무 비싸요.', zh: '太贵了。（不礼貌）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（刚说过了）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', correct: false },
      ],
      explain: '收到总价 → 选择支付方式。「카드로 할게요」是标准回答',
    },
    {
      type: 'dialogue',
      id: 'd17-sc-d3',
      lines: [
        { speaker: '游客', ko: '저기요, 잠깐 시간 있어요?', zh: '请问，稍微有点时间吗？' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '네, 사진 찍어 드릴까요?', zh: '好的，要我帮您拍照吗？', correct: true },
        { ko: '아니요, 없어요.', zh: '不，没有。（拒绝陌生游客的请求略生硬）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', correct: false },
      ],
      explain: '游客搭话通常想请人拍照。「찍어 드릴까요?」= 要我为您拍吗？（드리다 是 주다 的敬语）',
    },

    {
      type: 'context',
      id: 'd17-sc-c1',
      ko: '충전 해 주세요.',
      promptZh: '关于「해 주세요」，哪个描述最准确？',
      choices: [
        { zh: '하다 类动词的"请帮我做"形式：하 + 여 → 해 + 주세요', correct: true },
        { zh: '正确说法是 「하아 주세요」', correct: false },
        { zh: '「해 주세요」和「하세요」意思一样', correct: false },
        { zh: '「해 주세요」只能用于食物', correct: false },
      ],
      explain: '所有 하다 类动词都变成 해 주세요：공부하다 → 공부해 주세요、청소하다 → 청소해 주세요',
    },
    {
      type: 'context',
      id: 'd17-sc-c2',
      ko: '카드로 할게요.',
      promptZh: '关于「N + 로/으로」的用法，哪个描述最准确？',
      choices: [
        { zh: '「로/으로」= 方式助词"用~"。无받침或 ㄹ → 로；有받침（ㄹ除外）→ 으로', correct: true },
        { zh: '「로/으로」= 主格助词', correct: false },
        { zh: '「로/으로」= 宾格助词', correct: false },
        { zh: '「로/으로」= 时间助词', correct: false },
      ],
      explain: '카드로（카드 무받침 → 로）、현금으로（현금 有받침 ㅁ → 으로）、지하철로（지하철 받침 ㄹ → 로）',
    },
  ],
};
