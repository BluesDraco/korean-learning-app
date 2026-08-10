import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 9 · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖 CU 便利店选商品 → 结账 → 撒钱救场
 */
export const day9Scene: SceneSubQuestData = {
  day: 9, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在 CU 便利店独立完成第一次购物', subtitleEn: 'Complete your first solo shopping trip at CU convenience store',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd09-sc-s1',
      scenario: 'CU 便利店，你手里已经挑好一个金枪鱼三角饭团，想再加一瓶香蕉牛奶。在收银台你应该说？', scenarioEn: 'At CU, you\'ve picked out a tuna triangle kimbap and want to add a banana milk. At the counter, what should you say?',
      choices: [
        { ko: '이거 주세요. 그리고 이것도요.', zh: '请给我这个。还有这个也是。', zhEn: 'I\'ll take this one. And this too, please.', correct: true },
        { ko: '저거 없어요.', zh: '那个没有。（否认，语境不对）', zhEn: 'We don\'t have that. (Denial, wrong context)', correct: false },
        { ko: '이거 얼마예요? 저거 얼마예요?', zh: '这个多少钱？那个多少钱？（只问价，未点单）', zhEn: 'How much is this? How much is that? (Only asking prices, not ordering)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '第一样 이거 주세요 + 第二样 이것도요（"这个也"·省略 주세요 的口语形）。CU 结账添商品的黄金组合', explainEn: 'First item 이거 주세요 + second item 이것도요 ("this too" · casual form omitting 주세요). The golden combo for adding items at CU checkout',
    },
    {
      type: 'situation',
      id: 'd09-sc-s2',
      scenario: '你指着收银台后面高处货架上的一款零食（离你和店员都远），想问价格。最准确的问法？', scenarioEn: 'You point at a snack on a high shelf behind the counter (far from both you and the clerk) and want to ask the price. What\'s the most accurate way?',
      choices: [
        { ko: '이거 얼마예요?', zh: '这个（我手边）多少钱？', zhEn: 'How much is this (by my hand)?', correct: false },
        { ko: '그거 얼마예요?', zh: '那个（你手边）多少钱？', zhEn: 'How much is that (by your hand)?', correct: false },
        { ko: '저거 얼마예요?', zh: '那个（远处高架）多少钱？', zhEn: 'How much is that (far high shelf)?', correct: true },
        { ko: '얼마 이거요?', zh: '多少这个（错误语序）', zhEn: 'How much this (wrong word order)', correct: false },
      ],
      explain: '远处货架 = 저(远) → 저거。이(我) / 그(你) / 저(远) 三层空间要用对——店员身后高架属"两人都远的第三方"', explainEn: 'Distant shelf = 저 (far) → 저거. The three spatial levels 이 (me) / 그 (you) / 저 (far) must be used correctly — the high shelf behind the clerk is a "third party far from both"',
    },
    {
      type: 'situation',
      id: 'd09-sc-s3',
      scenario: '结账时你手一抖，零钱撒了一地，考拉哥哥没笑，只淡淡说「천천히 하세요」（慢慢来）。你想道歉+道谢，应该？', scenarioEn: 'At checkout, your hand slips and change scatters everywhere. Koala oppa doesn\'t laugh, just calmly says \'천천히 하세요\' (Take your time). You want to apologize + thank him. What should you say?',
      choices: [
        { ko: '감사합니다. 죄송해요.', zh: '谢谢。对不起。（韩国人的黄金组合）', zhEn: 'Thank you. I\'m sorry. (The Korean golden combo)', correct: true },
        { ko: '아니요, 없어요.', zh: '不，没有。（否定语，语境不对）', zhEn: 'No, I don\'t. (Negation, wrong context)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（刚才已经知道了）', zhEn: 'How much? (You already know from before)', correct: false },
        { ko: '이거 주세요.', zh: '请给我这个。（重复动作）', zhEn: 'Please give me this. (Repeating the action)', correct: false },
      ],
      explain: '韩国给别人添麻烦时道谢+道歉一起说：감사합니다（谢您耐心）+ 죄송해요（抱歉打扰）。是最有礼貌的回應', explainEn: 'When causing trouble in Korea, say thanks + apology together: 감사합니다 (thank you for your patience) + 죄송해요 (sorry for the bother). It\'s the most polite response.',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd09-sc-d1',
      lines: [
        { speaker: '考拉店员', speakerEn: 'Koala barista', ko: '안녕하세요. 계산 도와드릴게요.', zh: '你好，我帮您结账。', zhEn: 'Hello, I\'ll ring you up.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '이거 주세요. 그리고 이것도요.', zh: '请给我这个。还有这个也是。', zhEn: 'I\'ll take this one. And this too, please.', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（不对结账场景）', zhEn: 'Nice to meet you. (Not for a checkout scenario)', correct: false },
        { ko: '얼마예요? 얼마예요?', zh: '多少钱？多少钱？（连问两遍反常）', zhEn: 'How much? How much? (Asking twice is odd)', correct: false },
        { ko: '엄마가 보고 싶어요.', zh: '我想妈妈。（不对题）', zhEn: 'I miss my mom. (Off-topic)', correct: false },
      ],
      explain: '店员打招呼+提供服务后，第一句就是提交商品：이거 주세요 + 이것도요', explainEn: 'After the clerk greets and offers service, the first thing is to present the item: 이거 주세요 + 이것도요',
    },
    {
      type: 'dialogue',
      id: 'd09-sc-d2',
      lines: [
        { speaker: '考拉店员', speakerEn: 'Koala barista', ko: '봉투 필요하세요?', zh: '需要袋子吗？', zhEn: 'Do you need a bag?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '네, 봉투 주세요.', zh: '是的，请给我袋子。', zhEn: 'Yes, please give me a bag.', correct: true },
        { ko: '아니요, 몰라요.', zh: '不，不知道。（答非所问）', zhEn: 'No, I don\'t know. (Not answering the question)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题，虽然袋子确实要钱）', zhEn: 'How much? (Off-topic, though the bag does cost money)', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。（这句在这里是"不用了"，语义模糊）', zhEn: 'It\'s okay, thanks. (Here it means "no thanks," which is ambiguous)', correct: false },
      ],
      explain: '要袋子直答：네, 봉투 주세요。不要就 아니요, 괜찮아요。这里假设你要买袋子', explainEn: 'If you want a bag, answer directly: 네, 봉투 주세요. If not, say 아니요, 괜찮아요. Here, assume you want to buy a bag.',
    },
    {
      type: 'dialogue',
      id: 'd09-sc-d3',
      lines: [
        { speaker: '考拉店员', speakerEn: 'Koala barista', ko: '2,800원이에요.', zh: '2800 元。', zhEn: '2,800 won.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '여기 있어요.', zh: '这儿，给您。（递钱时说）', zhEn: 'Here you go. (Said when handing over money)', correct: true },
        { ko: '얼마예요?', zh: '多少钱？（刚说过了）', zhEn: 'How much is it? (Already said)', correct: false },
        { ko: '이거 없어요.', zh: '这个没有。（不对题）', zhEn: 'This doesn\'t have it. (Off-topic)', correct: false },
        { ko: '보고 싶어요.', zh: '想念。', zhEn: 'Miss.', correct: false },
      ],
      explain: '递钱场景：「여기 있어요」= 这儿，给您（"这里有〔钱〕"引申）。比裸说 「여기요」更完整自然', explainEn: 'Handing money: 「여기 있어요」 = Here you go (extended from "here\'s the money"). More complete and natural than just saying 「여기요」',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd09-sc-c1',
      ko: '천천히 하세요.',
      promptZh: '这句话最合适的使用场景是？', promptZhEn: 'What\'s the most appropriate situation for this phrase?',
      choices: [
        { zh: '别人手忙脚乱、紧张时的温柔安慰', zhEn: 'A gentle comfort for someone flustered or nervous', correct: true },
        { zh: '在餐厅点单', zhEn: 'Ordering at a restaurant', correct: false },
        { zh: '道别时的祝福', zhEn: 'A blessing when saying goodbye', correct: false },
        { zh: '进门时的问候', zhEn: 'A greeting when entering', correct: false },
      ],
      explain: '천천히(慢慢地) + 하세요(请做)。对手忙脚乱、找钱、说话结巴的人说的温柔话。也用于「천천히 드세요」(慢慢吃)', explainEn: '천천히 (slowly) + 하세요 (please do). A gentle word for someone flustered, counting change, or stammering. Also used in 「천천히 드세요」 (eat slowly)',
    },
    {
      type: 'context',
      id: 'd09-sc-c2',
      ko: '이것도 주세요.',
      promptZh: '关于「이것도 주세요」的用法，哪个描述最准确？', promptZhEn: 'Regarding the usage of 「이것도 주세요」, which description is most accurate?',
      choices: [
        { zh: '在已经点了一样东西后，追加"这个也"要', zhEn: 'After already ordering one thing, adding "this too"', correct: true },
        { zh: '"这里也有"，指出商品位置', zhEn: '"It\'s here too," pointing out the item\'s location', correct: false },
        { zh: '"这个不要"的委婉说法', zhEn: 'A euphemistic way to say "not this one"', correct: false },
        { zh: '打招呼时的问候语', zhEn: 'A greeting when saying hello', correct: false },
      ],
      explain: '도 = 也。이것도 주세요 = 这个也请给我。已经有一样再追加第二样时的连接句', explainEn: '도 = also. 이것도 주세요 = Please give me this too. A connector when adding a second item after already having one.',
    },
  ],
};
