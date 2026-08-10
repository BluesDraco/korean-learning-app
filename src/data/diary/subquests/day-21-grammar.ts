import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 21 · 1-3 문법 탐험 · 语法关
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：签约四步流程语料 · 맞아요 / V면 되다 / 잘 부탁드립니다
 */
export const day21Grammar: GrammarSubQuestData = {
  day: 21, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握签约四步流程 · 확인→질문→사인→인사',

  fix: [
    {
      id: 'd21-g3-f1',
      promptKo: '보증금 500만. 맞아요요?',
      promptZh: '"押金500万，对吗？"哪句正确？',
      choices: [
        { text: '보증금 500만. 맞아요요?', correct: false },
        { text: '보증금 500만. 맞아요?', correct: true },
        { text: '보증금 500만. 맞은요?', correct: false },
        { text: '보증금 500만. 맞다요?', correct: false },
      ],
      explain: '맞다(对) + 아요 = 맞아요。疑问形式直接把陈述加"?"即可',
    },
    {
      id: 'd21-g3-f2',
      promptKo: '여기 사인하고 되죠?',
      promptZh: '"在这签名就行了吧？"哪句正确？',
      choices: [
        { text: '여기 사인하고 되죠?', correct: false },
        { text: '여기 사인하면 되죠?', correct: true },
        { text: '여기 사인해서 되죠?', correct: false },
        { text: '여기 사인해도 되죠?', correct: false },
      ],
      explain: '「V + 면 되다」= 做了就行 是固定句型。用면，不能用 고/서/도',
    },
    {
      id: 'd21-g3-f3',
      promptKo: '25일이 입금해 주세요.',
      promptZh: '"请在25号转账"哪句正确？',
      choices: [
        { text: '25일이 입금해 주세요.', correct: false },
        { text: '25일에 입금해 주세요.', correct: true },
        { text: '25일을 입금해 주세요.', correct: false },
        { text: '25일도 입금해 주세요.', correct: false },
      ],
      explain: '时间点用 에：25일 + 에。日期后固定接 에',
    },
    {
      id: 'd21-g3-f4',
      promptKo: '앞으로도 부탁드립니다.',
      promptZh: '"以后请多关照"哪句最标准？',
      choices: [
        { text: '앞으로도 부탁드립니다.', correct: false },
        { text: '앞으로 잘 부탁드립니다.', correct: true },
        { text: '앞으로에 잘 부탁드립니다.', correct: false },
        { text: '앞으로가 잘 부탁드립니다.', correct: false },
      ],
      explain: '固定搭配「앞으로 잘 부탁드립니다」。앞으로 后不加助词，잘 是必备副词',
    },
    {
      id: 'd21-g3-f5',
      promptKo: '계약 기간이 1년이에요.',
      promptZh: '"合同期限是1年"最自然的说法？',
      choices: [
        { text: '계약 기간이 1년이에요.', correct: false },
        { text: '계약 기간은 1년이에요.', correct: true },
        { text: '계약 기간을 1년이에요.', correct: false },
        { text: '계약 기간에 1년이에요.', correct: false },
      ],
      explain: '陈述某项的属性（"XX 是 ___"）→ 用主题助词 은/는。기간 有收音 ㄴ → 은',
    },
  ],

  compose: [
    {
      id: 'd21-g3-c1',
      zhHint: '押金500万，月租50万。对吗？',
      audioKo: '보증금 500만, 월세 50만. 맞아요?',
      answer: ['보증금', '500만,', '월세', '50만.', '맞아요?'],
      tokens: ['보증금', '500만,', '월세', '50만.', '맞아요?', '얼마예요?', '따로예요?', '들어 있어요?'],
      explain: '확인 步骤：复述数字 + 맞아요? 签约前必做',
    },
    {
      id: 'd21-g3-c2',
      zhHint: '在这签名就行了吧？',
      audioKo: '여기 사인하면 되죠?',
      answer: ['여기', '사인하면', '되죠?'],
      tokens: ['여기', '사인하면', '되죠?', '사인하고', '사인해서', '있어요?', '싶어요?'],
      explain: '「V + 면 되다」= 做了就行。签字前确认动作用这句',
    },
    {
      id: 'd21-g3-c3',
      zhHint: '请在25号转账。',
      audioKo: '25일에 입금해 주세요.',
      answer: ['25일에', '입금해', '주세요.'],
      tokens: ['25일에', '입금해', '주세요.', '25일이', '25일도', '해 주세요.', '있어요.'],
      explain: '时间 + 에 + 动作。房东通知交租的固定句',
    },
    {
      id: 'd21-g3-c4',
      zhHint: '谢谢。以后请多关照。',
      audioKo: '감사합니다. 앞으로 잘 부탁드립니다.',
      answer: ['감사합니다.', '앞으로', '잘', '부탁드립니다.'],
      tokens: ['감사합니다.', '앞으로', '잘', '부탁드립니다.', '반가워요.', '없어요.', '주세요.'],
      explain: '正式感谢 + 앞으로 잘 부탁드립니다。签约/入职标准结尾',
    },
  ],

  rule: [
    {
      id: 'd21-g3-r1',
      promptZh: '关于「V + 면 되다」的用法，哪句最准确？',
      choices: [
        { text: '「V + 면 되다」= 做了 V 就行。用于确认动作步骤', correct: true },
        { text: '「V + 면 되다」= 必须做 V', correct: false },
        { text: '「V + 면 되다」= 不做 V 也行', correct: false },
        { text: '「V + 면 되다」= 想做 V', correct: false },
      ],
      explain: '「사인하면 되죠?」= 签名就行了吧？「돈만 내면 돼요」= 只交钱就行',
    },
    {
      id: 'd21-g3-r2',
      promptZh: '关于「맞아요」和「알겠습니다」的区别，哪句最准确？',
      choices: [
        { text: '맞아요 = 确认对方内容对（"没错"）；알겠습니다 = 接受指令（"我知道了"）', correct: true },
        { text: '两者意思完全一样', correct: false },
        { text: '맞아요 是过去时', correct: false },
        { text: '알겠습니다 是반말', correct: false },
      ],
      explain: '被复述数字 → 「맞아요」；被给指令 → 「알겠습니다」。用法不能互换',
    },
    {
      id: 'd21-g3-r3',
      promptZh: '关于「잘 부탁드립니다」的用法，哪句最准确？',
      choices: [
        { text: '합쇼체最高级礼貌。只在"开始新关系"时用（签约/入职/初见）', correct: true },
        { text: '每次见面都要说', correct: false },
        { text: '朋友之间也常说', correct: false },
        { text: '和"感谢您"意思一样', correct: false },
      ],
      explain: '"多关照"这个概念只在**建立关系起点**说。之后见面用「안녕하세요」就好',
    },
    {
      id: 'd21-g3-r4',
      promptZh: '关于「당근」的用法，哪句最准确？',
      choices: [
        { text: '本义"胡萝卜"；因发音像 당연(当然)，年轻人当俚语用。正式场合别用', correct: true },
        { text: '「당근」只指俚语"当然"', correct: false },
        { text: '「당근」在合同里就是"当然"', correct: false },
        { text: '「당근」和 정말 意思一样', correct: false },
      ],
      explain: 'Tori 一开始以为合同里是俚语，但房东说 "진짜 당근"（真的胡萝卜）。语境不同意思不同',
    },
  ],
};
