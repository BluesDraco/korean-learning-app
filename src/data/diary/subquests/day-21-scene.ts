import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 21 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：签约现场 · 从确认数字到发现俚语条款到拿钥匙
 */
export const day21Scene: SceneSubQuestData = {
  day: 21, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在长桌前把每一步走完，把钥匙拿到手', subtitleEn: 'Walk through every step at the long table and get the keys in hand.',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd21-sc-s1',
      scenario: '中介把合同推到你面前说「여기 사인해 주세요」，签之前你想先复述数字让房东确认，最标准的一句？', scenarioEn: 'The agent pushes the contract to you and says 「여기 사인해 주세요」. Before signing, you want to repeat the numbers for the landlord to confirm. What\'s the most standard phrase?',
      choices: [
        { ko: '보증금 500만, 월세 50만. 맞아요?', zh: '押金500万，月租50万。对吗？', zhEn: 'Deposit 5 million won, monthly rent 500,000 won. Correct?', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '싫어요.', zh: '不签。', zhEn: 'I won\'t sign.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '확인 步骤：复述数字 + 맞아요? 这是签约前最重要的动作', explainEn: '확인 step: repeat the numbers + 맞아요? This is the most important action before signing.',
    },
    {
      type: 'situation',
      id: 'd21-sc-s2',
      scenario: '合同第七条写着 "매주 당근 1개 제공"（每周提供一根胡萝卜）。你以为是俚语但不确定，最合适的问法？', scenarioEn: 'The contract\'s clause 7 says "매주 당근 1개 제공" (providing one carrot per week). You think it might be slang but aren\'t sure. What\'s the most appropriate way to ask?',
      choices: [
        { ko: '이거 당근이죠? 당연히?', zh: '这是"当然"的意思吧？', zhEn: 'This means "of course," right?', correct: true },
        { ko: '당근이 뭐예요?', zh: '胡萝卜是什么？', zhEn: 'What is a carrot?', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '싫어요.', zh: '我不要。', zhEn: 'I don\'t want it.', correct: false },
      ],
      explain: '不懂就问 = 질문 步骤。用「~죠?」软性确认，比直接猜礼貌', explainEn: 'If you don\'t understand, ask = question step. Use 「~죠?」 for soft confirmation, more polite than guessing directly.',
    },
    {
      type: 'situation',
      id: 'd21-sc-s3',
      scenario: '签完字，房东把钥匙递给你说「자, 열쇠 여기 있어요」，最合适的道谢+关系起点？', scenarioEn: 'After signing, the landlord hands you the keys and says 「자, 열쇠 여기 있어요」. What\'s the most appropriate thanks + relationship starter?',
      choices: [
        { ko: '감사합니다. 앞으로 잘 부탁드립니다.', zh: '谢谢。以后请多关照。', zhEn: 'Thank you. Please take care of me from now on.', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        { ko: '당근 주세요.', zh: '请给胡萝卜。', zhEn: 'Please give me a carrot.', correct: false },
        { ko: '안녕히 계세요.', zh: '请留步。', zhEn: 'Please stay.', correct: false },
      ],
      explain: '인사 步骤：합쇼체感谢 + 앞으로 잘 부탁드립니다。租客-房东关系从这句开始', explainEn: 'Greeting step: 합쇼체 thanks + 앞으로 잘 부탁드립니다. The tenant-landlord relationship starts with this phrase.',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd21-sc-d1',
      lines: [
        { speaker: '중개인 아저씨', ko: '계약서 가져왔어요. 여기 사인해 주세요.', zh: '合同带来了。请在这里签名。', zhEn: 'I\'ve brought the contract. Please sign here.' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 알겠습니다. 여기 사인하면 되죠?', zh: '好的，我知道了。在这签名就行了吧？', zhEn: 'Okay, got it. I just sign here, right?', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        { ko: '싫어요.', zh: '不签。', zhEn: 'I won\'t sign.', correct: false },
      ],
      explain: '收到指令 → 알겠습니다 +「사인하면 되죠?」再次确认动作。합쇼체适合签约', explainEn: 'Received instruction → 알겠습니다 + 「사인하면 되죠?」 to confirm the action again. 합쇼체 suits signing contracts.',
    },
    {
      type: 'dialogue',
      id: 'd21-sc-d2',
      lines: [
        { speaker: '집주인', ko: '"매주 당근 1개 제공." 있어요.', zh: '有一条"每周提供1根胡萝卜"。', zhEn: 'There\'s a clause saying "provide 1 carrot per week."' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '이거 당근이죠? 당연히?', zh: '这是"当然"的意思吧？', zhEn: 'This means "of course," right?', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '싫어요.', zh: '不要。', zhEn: 'No.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '看到奇怪条款 → 用「~죠?」软性确认，比"뭐예요?"更礼貌', explainEn: 'Seeing a strange clause → use 「~죠?」 for soft confirmation, more polite than "뭐예요?".',
    },
    {
      type: 'dialogue',
      id: 'd21-sc-d3',
      lines: [
        { speaker: '집주인', ko: '자, 열쇠 여기 있어요.', zh: '来，钥匙在这里。', zhEn: 'Here, the keys are here.' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '감사합니다. 앞으로 잘 부탁드립니다.', zh: '谢谢。以后请多关照。', zhEn: 'Thank you. Please take care of me from now on.', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '없어요.', zh: '没有。', zhEn: 'There isn\'t any.', correct: false },
      ],
      explain: '拿到钥匙 = 签约结束 → 합쇼체道谢 + 关系起点句', explainEn: 'Getting the keys = contract done → 합쇼체 thanks + relationship starter phrase.',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd21-sc-c1',
      ko: '맞아요?',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '复述对方说的信息，请对方确认', zhEn: 'Repeat what the other person said and ask for confirmation.', correct: true },
        { zh: '第一次见面打招呼', zhEn: 'Greeting someone for the first time', correct: false },
        { zh: '收到指令后回应"知道了"', zhEn: 'Respond with "understood" after receiving an instruction.', correct: false },
        { zh: '感谢对方帮忙', zhEn: 'Thank the other person for their help.', correct: false },
      ],
      explain: '「맞아요?」= 我说的对吗？确认信息用。不能和「알겠습니다」混淆——那是回应指令', explainEn: '「맞아요?」= Am I right? Used to confirm information. Don\'t confuse it with 「알겠습니다」— that\'s for responding to instructions.',
    },
    {
      type: 'context',
      id: 'd21-sc-c2',
      ko: '앞으로 잘 부탁드립니다.',
      promptZh: '这句话最可能是谁说的？', promptZhEn: 'Who is most likely to say this?',
      choices: [
        { zh: '刚签合同的租客对房东 / 新员工对同事的入职寒暄', zhEn: 'A tenant who just signed a contract to the landlord / a new employee\'s greeting to coworkers.', correct: true },
        { zh: '老朋友之间每次见面的问候', zhEn: 'A greeting between old friends every time they meet.', correct: false },
        { zh: '客人在餐厅点菜时', zhEn: 'When a customer orders at a restaurant.', correct: false },
        { zh: '医生对患者的问诊', zhEn: 'A doctor\'s consultation with a patient.', correct: false },
      ],
      explain: '「앞으로 잘 부탁드립니다」只在**关系起点**说。日后见面用「안녕하세요」就好', explainEn: '「앞으로 잘 부탁드립니다」 is only said at the **start of a relationship**. For later meetings, just use 「안녕하세요」.',
    },
  ],
};
