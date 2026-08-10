import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 14 · 1-4 상황 속으로 · 情景关 · Chapter 2 收官
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖 하루카페 独立点单全程 · 口误纠正 · 堂食选择
 */
export const day14Scene: SceneSubQuestData = {
  day: 14, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在 하루카페 独立完成从进门到取餐的全过程', subtitleEn: 'Complete the entire process from entering to picking up your order at 하루카페 on your own.',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd14-sc-s1',
      scenario: '你推门进 하루카페，金毛店员说「어서 오세요. 주문 도와드릴게요.」（欢迎光临。我帮您点单。）你想点热拿铁，应该？', scenarioEn: 'You push open the door to 하루카페, and the golden retriever staff says \'어서 오세요. 주문 도와드릴게요.\' (Welcome. I\'ll help you order.) You want a hot latte. What should you say?',
      choices: [
        { ko: '따뜻한 라떼 한 잔 주세요.', zh: '请给我一杯热拿铁。', zhEn: 'Please give me a hot latte.', correct: true },
        { ko: '따뜻한 아이스 라떼 주세요.', zh: '热的冰拿铁。（Day 14 兔莉的翻车句·矛盾）', zhEn: 'Hot iced latte. (Day 14 Tori\'s blunder sentence—contradictory.)', correct: false },
        { ko: '얼마예요? 뜨거운 라떼 있어요?', zh: '多少钱？有热拿铁吗？（顺序反）', zhEn: 'How much? Do you have hot latte? (Wrong order.)', correct: false },
        { ko: '아니요, 없어요.', zh: '不，没有。（不对题）', zhEn: 'No, there isn\'t. (Off-topic)', correct: false },
      ],
      explain: '咖啡馆点单公式：温度形容词(定语) + 饮料 + 数量(한 잔) + 주세요。따뜻한 vs 아이스 是反义词，不能同时用', explainEn: 'Cafe ordering formula: temperature adjective (modifier) + drink + quantity (한 잔) + 주세요. 따뜻한 vs 아이스 are opposites—can\'t be used together.',
    },
    {
      type: 'situation',
      id: 'd14-sc-s2',
      scenario: '你想让糖度是"甜的"（比正常多点糖）。想跟店员说"请做成甜的"，最标准的说法？', scenarioEn: 'You want your drink sweet (extra sugar). To tell the barista "make it sweet," what\'s the most standard phrase?',
      choices: [
        { ko: '달게 해 주세요.', zh: '请做成甜的。', zhEn: 'Please make it sweet.', correct: true },
        { ko: '짜게 해 주세요.', zh: '请做成咸的。（Day 14 兔莉的翻车句）', zhEn: 'Make it salty. (Day 14 Tori\'s blunder.)', correct: false },
        { ko: '단 것 주세요.', zh: '请给我甜的东西。（用了名词化，不对场景）', zhEn: 'Give me something sweet. (Used nominalization—wrong for this context.)', correct: false },
        { ko: '설탕 없어요.', zh: '没有糖。（不对题）', zhEn: 'No sugar. (Off-topic.)', correct: false },
      ],
      explain: '「형용사 + 게 + 해 주세요」= 请做成~的。달게(甜地) 不是 짜게(咸地)。Tori 说反了——你不要犯', explainEn: '「형용사 + 게 + 해 주세요」= "Make it ~." 달게 (sweetly) not 짜게 (salty). Tori got it backwards—don\'t make the same mistake.',
    },
    {
      type: 'situation',
      id: 'd14-sc-s3',
      scenario: '店员问「드시고 가세요, 포장이세요?」（堂食还是外带？）你想坐下来慢慢喝，应该？', scenarioEn: 'The barista asks 「드시고 가세요, 포장이세요?」 (For here or to go?) You want to sit and sip slowly—what should you say?',
      choices: [
        { ko: '여기서 먹을게요.', zh: '在这里吃（堂食）。', zhEn: 'Eat here. (For here.)', correct: true },
        { ko: '포장이에요. 가져갈게요.', zh: '外带。带走。（想坐下却选外带，语境错）', zhEn: 'To go. Takeout. (Wanted to sit but chose to go—wrong context.)', correct: false },
        { ko: '따뜻한 아이스요.', zh: '热的冰。（刚才纠正过一次）', zhEn: 'Hot ice. (We just corrected this.)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（早付过了）', zhEn: 'How much? (Already paid.)', correct: false },
      ],
      explain: '堂食最自然的答法：여기서 먹을게요（在这儿吃·意愿形）。也可说 「여기서 마실게요」（在这儿喝）', explainEn: 'Most natural for-here reply: 여기서 먹을게요 (eat here·volitional). You can also say 「여기서 마실게요」 (drink here).',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd14-sc-d1',
      lines: [
        { speaker: '金毛 店员', speakerEn: 'Golden retriever barista.', ko: '따뜻한 아이스요?', zh: '热的冰吗？（憋笑）', zhEn: 'Hot iced? (holding back a laugh)' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '아, 아니요! 따뜻한 라떼요!', zh: '啊，不是！热拿铁！', zhEn: 'Ah, no! Hot latte!', correct: true },
        { ko: '네, 맞아요. 따뜻한 아이스 라떼.', zh: '是，对。热的冰拿铁。（继续错下去）', zhEn: 'Yes, right. Hot iced latte. (Keeps messing up.)', correct: false },
        { ko: '아니요, 안 살게요.', zh: '不，不买了。（放弃点单？）', zhEn: 'No, never mind. (Giving up ordering?)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', zhEn: 'How much? (Off-topic.)', correct: false },
      ],
      explain: '纠正口误开头：아, 아니요! + 正确说法。Tori 今天用了三次——都靠这句救场', explainEn: 'To correct a slip: start with 아, 아니요! + the right phrase. Tori used it three times today—it saved her every time.',
    },
    {
      type: 'dialogue',
      id: 'd14-sc-d2',
      lines: [
        { speaker: '金毛 店员', speakerEn: 'Golden retriever barista.', ko: '드시고 가세요, 포장이세요?', zh: '堂食还是外带？', zhEn: 'For here or to go?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '여기서 먹을게요.', zh: '在这里吃。', zhEn: 'Eat here.', correct: true },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', zhEn: 'How much? (Off-topic.)', correct: false },
        { ko: '아니요, 안 사요.', zh: '不，不买。（跟场景冲突）', zhEn: 'No, not buying. (Conflicts with the situation.)', correct: false },
        { ko: '따뜻한 라떼요.', zh: '热拿铁。（前面已经点过）', zhEn: 'Hot latte. (Already ordered.)', correct: false },
      ],
      explain: '堂食/外带二选一——想坐下来喝 = 여기서 먹을게요', explainEn: 'For here or to go—if you want to sit and drink = 여기서 먹을게요.',
    },
    {
      type: 'dialogue',
      id: 'd14-sc-d3',
      lines: [
        { speaker: '金毛 店员', speakerEn: 'Golden retriever barista.', ko: '라떼 나왔어요. 맛있게 드세요.', zh: '拿铁好了。请慢用。', zhEn: 'Here\'s your latte. Enjoy.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '감사합니다. 잘 먹을게요.', zh: '谢谢。我会好好享用。', zhEn: 'Thanks. I\'ll enjoy it.', correct: true },
        { ko: '얼마예요? 얼마예요?', zh: '多少钱？多少钱？（早付过了）', zhEn: 'How much? How much? (Already paid.)', correct: false },
        { ko: '아니요, 없어요.', zh: '不，没有。（不对题）', zhEn: 'No, there isn\'t. (Off-topic)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
      ],
      explain: '取餐后 = 감사합니다 + 잘 먹을게요（我会好好享用·意愿形礼貌语）。「먹다」在韩语覆盖吃/喝，比 「마실게요」更常用', explainEn: 'After pickup = 감사합니다 + 잘 먹을게요 (I\'ll enjoy it·polite volitional). In Korean, 먹다 covers both eating and drinking, so it\'s more common than 마실게요.',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd14-sc-c1',
      ko: '따뜻한 라떼 한 잔 주세요.',
      promptZh: '关于这个点单句的结构，哪个描述最准确？', promptZhEn: 'Which description of the ordering sentence structure is most accurate?',
      choices: [
        { zh: '温度形容词定语(따뜻한) + 饮料(라떼) + 数量(한 잔) + 请给我(주세요)', zhEn: 'Temperature adjective modifier (따뜻한) + drink (라떼) + quantity (한 잔) + give me (주세요).', correct: true },
        { zh: '副词(따뜻한) + 主语(라떼) + 一杯(한 잔) + 动词(주세요)', zhEn: 'Adverb (따뜻한) + subject (라떼) + one cup (한 잔) + verb (주세요)', correct: false },
        { zh: '따뜻한 是名词', zhEn: '따뜻한 is a noun', correct: false },
        { zh: '한 잔的한是汉字数一', zhEn: 'The 한 in 한 잔 is the Sino-Korean number for one', correct: false },
      ],
      explain: '咖啡馆点单标准公式。따뜻한 是形容词定语形（修饰名词 라떼）。한 是固有数 하나 搭量词的变形', explainEn: 'Standard formula for ordering at a café. 따뜻한 is the adnominal form of the adjective (modifying the noun 라떼). 한 is the native number 하나 combined with a counter.',
    },
    {
      type: 'context',
      id: 'd14-sc-c2',
      ko: '달게 해 주세요.',
      promptZh: '关于「달게 해 주세요」，哪个描述最准确？', promptZhEn: 'Which description is most accurate about \'달게 해 주세요\'?',
      choices: [
        { zh: '副词形 달게(甜地) + 하다(做) + 아/어 주세요(请为我做) = 请做成甜的', zhEn: 'Adverbial form 달게 (sweetly) + 하다 (to do) + 아/어 주세요 (please do for me) = please make it sweet', correct: true },
        { zh: '「달게」是名词，「甜」的意思', zhEn: '\'달게\' is a noun meaning \'sweet\'', correct: false },
        { zh: '正确写法是「단 해 주세요」', zhEn: 'The correct spelling is \'단 해 주세요\'', correct: false },
        { zh: '正确写法是「달다 해 주세요」', zhEn: 'The correct spelling is \'달다 해 주세요\'', correct: false },
      ],
      explain: '味道定制万能句：형용사 + 게 + 해 주세요。同理 짜게(咸)、맵게(辣)、시게(酸)、쓰게(苦) 都用副词形 게', explainEn: 'Universal phrase for customizing taste: adjective + 게 + 해 주세요. Similarly, 짜게 (salty), 맵게 (spicy), 시게 (sour), 쓰게 (bitter) all use the adverbial form 게',
    },
  ],
};
