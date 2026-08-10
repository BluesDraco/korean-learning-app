import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 2 · 1-4 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖飞机点单全流程 + 婉拒 + 道谢
 */
export const day2Scene: SceneSubQuestData = {
  day: 2, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在飞机餐车前用出今天学的韩语', subtitleEn: 'Use today\'s Korean at the airplane meal cart',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd02-sc-s1',
      scenario: '飞机上，空乘推着餐车过来，问你要不要饮料。你想要一杯咖啡，应该说？', scenarioEn: 'On the plane, the flight attendant pushes the cart and asks if you want a drink. You want a coffee. What should you say?',
      choices: [
        { ko: '커피 한 잔 주세요.', zh: '请给我一杯咖啡。', zhEn: 'Please give me a coffee.', correct: true },
        { ko: '커피예요.', zh: '是咖啡。', zhEn: 'It\'s coffee.', correct: false },
        { ko: '커피 안 주세요.', zh: '不要咖啡。', zhEn: 'No coffee.', correct: false },
        { ko: '저는 커피예요.', zh: '我是咖啡。', zhEn: 'I am coffee.', correct: false },
      ],
      explain: '点单公式：名词 + (数量) + 주세요。「안 주세요」不是韩语说法', explainEn: 'Ordering formula: noun + (quantity) + 주세요. "안 주세요" is not proper Korean',
    },
    {
      type: 'situation',
      id: 'd02-sc-s2',
      scenario: '空乘问「얼음 드릴까요?」（要冰吗？），你不想要冰，应该说？', scenarioEn: 'The flight attendant asks "얼음 드릴까요?" (Want ice?). You don\'t want ice. What should you say?',
      choices: [
        { ko: '네, 얼음 주세요.', zh: '好的，请给我冰。', zhEn: 'Okay, give me ice, please.', correct: false },
        { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。', zhEn: 'No need, it\'s fine.', correct: true },
        { ko: '죄송합니다.', zh: '对不起。', zhEn: 'I\'m sorry.', correct: false },
        { ko: '얼음이에요.', zh: '是冰块。', zhEn: 'It\'s an ice cube.', correct: false },
      ],
      explain: '婉拒黄金搭档：아니요, 괜찮아요。「죄송합니다」用来拒绝好意会显得太严重', explainEn: 'The golden combo for polite refusal: 아니요, 괜찮아요. Using 죄송합니다 to refuse kindness sounds too serious',
    },
    {
      type: 'situation',
      id: 'd02-sc-s3',
      scenario: '想让空乘拿一份菜单来看看，用最礼貌的方式，应该说？', scenarioEn: 'You want the flight attendant to bring a menu. What\'s the most polite way to say it?',
      choices: [
        { ko: '메뉴!', zh: '菜单！', zhEn: 'Menu!', correct: false },
        { ko: '메뉴 뭐예요?', zh: '菜单是什么？', zhEn: 'What is a menu?', correct: false },
        { ko: '메뉴 부탁드립니다.', zh: '麻烦给我菜单。', zhEn: 'Please give me the menu.', correct: true },
        { ko: '메뉴는 어디예요?', zh: '菜单在哪里？', zhEn: 'Where is the menu?', correct: false },
      ],
      explain: '부탁드립니다 是 주세요 的敬语升级，对空乘/长辈用最得体', explainEn: '부탁드립니다 is the honorific upgrade of 주세요, most appropriate for flight attendants/elders',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd02-sc-d1',
      lines: [
        { speaker: '승무원', ko: '음료수 드릴까요?', zh: '要饮料吗？', zhEn: 'Would you like a drink?' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '네, 콜라 한 잔 주세요.', zh: '好，请给我一杯可乐。', zhEn: 'Okay, give me a cola, please.', correct: true },
        { ko: '저는 학생이에요.', zh: '我是学生。', zhEn: 'I am a student.', correct: false },
        { ko: '안녕히 계세요.', zh: '再见（请留步）。', zhEn: 'Goodbye (please stay).', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '"要饮料吗？"→ 想要就 네 + 具体饮料 + 주세요', explainEn: '"Want a drink?" → If you want, say 네 + specific drink + 주세요',
    },
    {
      type: 'dialogue',
      id: 'd02-sc-d2',
      lines: [
        { speaker: '승무원', ko: '여기 콜라입니다.', zh: '（把可乐递过来）您的可乐。', zhEn: '(Handing over the cola) Your cola.' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。', zhEn: 'No need, it\'s fine.', correct: false },
        { ko: '감사합니다.', zh: '谢谢。', zhEn: 'Thank you.', correct: true },
        { ko: '저기요.', zh: '请问。', zhEn: 'Excuse me.', correct: false },
        { ko: '메뉴 주세요.', zh: '请给我菜单。', zhEn: 'Please give me the menu.', correct: false },
      ],
      explain: '收到东西一律道谢 감사합니다。用 괜찮아요 会变成"不用了"，语义相反', explainEn: 'Always thank with 감사합니다 when receiving something. Using 괜찮아요 becomes "no thanks," which is the opposite meaning',
    },
    {
      type: 'dialogue',
      id: 'd02-sc-d3',
      lines: [
        { speaker: '승무원', ko: '더 필요하신 거 있으세요?', zh: '还需要别的吗？', zhEn: 'Anything else?' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '아니요, 괜찮아요. 감사합니다.', zh: '不用了，谢谢。', zhEn: 'No, thank you.', correct: true },
        { ko: '네, 저는 토리예요.', zh: '是的，我是兔莉。', zhEn: 'Yes, I\'m Tori.', correct: false },
        { ko: '아니요, 저는 중국 사람이에요.', zh: '不，我是中国人。', zhEn: 'No, I\'m Chinese.', correct: false },
        { ko: '이름이 뭐예요?', zh: '你叫什么名字？', zhEn: 'What\'s your name?', correct: false },
      ],
      explain: '不需要更多东西时：아니요, 괜찮아요 + 감사합니다 = 一整套礼貌婉拒', explainEn: 'When you don\'t need anything more: 아니요, 괜찮아요 + 감사합니다 = a complete polite refusal',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd02-sc-c1',
      ko: '메뉴 부탁드립니다.',
      promptZh: '这句话最可能出现在什么场景？', promptZhEn: 'In what situation is this sentence most likely used?',
      choices: [
        { zh: '在餐厅或飞机上，礼貌地请店员/空乘给菜单', zhEn: 'Politely asking a server or flight attendant for the menu at a restaurant or on a plane', correct: true },
        { zh: '和朋友吃饭，想问朋友想吃什么', zhEn: 'Eating with friends, asking what they\'d like to order', correct: false },
        { zh: '在图书馆想借一本书', zhEn: 'Wanting to borrow a book at the library', correct: false },
        { zh: '在商店买菜时', zhEn: 'When buying groceries at a store', correct: false },
      ],
      explain: '메뉴 = 菜单，부탁드립니다 是敬语升级版，适合对店员/空乘', explainEn: '메뉴 = menu, 부탁드립니다 is the upgraded honorific, suitable for staff/flight attendants',
    },
    {
      type: 'context',
      id: 'd02-sc-c2',
      ko: '아니요, 괜찮아요.',
      promptZh: '这句话最合适的场景是？', promptZhEn: 'What\'s the most fitting scenario for this sentence?',
      choices: [
        { zh: '别人问你要不要什么，你想婉拒', zhEn: 'When someone offers you something and you want to politely decline', correct: true },
        { zh: '别人向你道歉，你想说"没事"', zhEn: 'When someone apologizes and you want to say "it\'s fine"', correct: false },
        { zh: '别人问你名字，你在回答', zhEn: 'When someone asks your name and you\'re answering', correct: false },
        { zh: '别人跟你打招呼，你在回应', zhEn: 'When someone greets you and you\'re responding', correct: false },
      ],
      explain: '아니요 = 不，괜찮아요 = 没关系。合起来是婉拒好意，比单独 아니요 更缓和', explainEn: '아니요 = no, 괜찮아요 = it\'s okay. Together they politely decline kindness, softer than just 아니요',
    },
  ],
};
