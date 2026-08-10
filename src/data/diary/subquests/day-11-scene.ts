import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 11 · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖 다이소 货架前指点 · 询价 · 结账追加
 */
export const day11Scene: SceneSubQuestData = {
  day: 11, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在 다이소 用韩语买齐生活套装', subtitleEn: 'Buy a full set of daily necessities in Korean at 다이소.',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd11-sc-s1',
      scenario: '你在 다이소洗漱区，想问店员"洗发水多少钱"。你手里已经拿着一瓶——最自然的问法？', scenarioEn: 'You\'re in the toiletries section at 다이소 and want to ask the clerk, "How much is the shampoo?" You\'re already holding a bottle—what\'s the most natural way to ask?',
      choices: [
        { ko: '이거 얼마예요?', zh: '这个（我手里）多少钱？', zhEn: 'How much is this (in my hand)?', correct: true },
        { ko: '저거 얼마예요?', zh: '那个（远处）多少钱？（跟手里的不对应）', zhEn: 'How much is that (far away)? (Doesn\'t match what\'s in your hand.)', correct: false },
        { ko: '얼마예요 이거?', zh: '多少钱这个？（语序不自然）', zhEn: 'How much is this? (Unnatural word order.)', correct: false },
        { ko: '샴푸 없어요?', zh: '没有洗发水吗？（不对题）', zhEn: 'Don\'t you have shampoo? (Off-topic.)', correct: false },
      ],
      explain: '手里的东西 = 我附近 → 이거。이(我) / 그(你) / 저(远) 空间三层的第一层', explainEn: 'What\'s in your hand = near me → 이거. 이 (me) / 그 (you) / 저 (far) is the first layer of the three spatial levels.',
    },
    {
      type: 'situation',
      id: 'd11-sc-s2',
      scenario: '羊店员说「저거요? 천 원이에요.」你算了一下，觉得便宜，想一次买三瓶——应该说？', scenarioEn: 'The sheep clerk says, 「저거요? 천 원이에요.」 You do the math, think it\'s cheap, and want to buy three bottles at once—what should you say?',
      choices: [
        { ko: '그럼 세 개 주세요.', zh: '那请给我三个。', zhEn: 'Then please give me three.', correct: true },
        { ko: '그럼 삼 개 주세요.', zh: '那请给我三个。（用了汉字数 삼，错）', zhEn: 'Then please give me three. (Used Sino-Korean number 삼, wrong.)', correct: false },
        { ko: '그럼 셋 개 주세요.', zh: '那请给我三个。（셋 没变形，错）', zhEn: 'Then please give me three. (셋 not changed, wrong.)', correct: false },
        { ko: '아니요, 안 살게요.', zh: '不，不买了。（不对题）', zhEn: 'No, I won\'t buy it. (Off-topic.)', correct: false },
      ],
      explain: '固有数 셋(3) 搭量词变 세 → 세 개。数东西用固有数，不用汉字数(삼)', explainEn: 'Native number 셋 (3) becomes 세 with counters → 세 개. Use native numbers for counting things, not Sino-Korean (삼).',
    },
    {
      type: 'situation',
      id: 'd11-sc-s3',
      scenario: '结账时你看到收银台旁的胡萝卜钥匙扣，Junho 也说很可爱。你想追加一起买，最自然的说法？', scenarioEn: 'At checkout, you see the carrot keychain by the register, and Junho says it\'s cute too. You want to add it to your purchase—what\'s the most natural way to say it?',
      choices: [
        { ko: '이것도 주세요.', zh: '这个也请给我。', zhEn: 'I\'ll take this too, please.', correct: true },
        { ko: '이거 없어요?', zh: '没有这个吗？（明显有）', zhEn: 'Don\'t you have this? (It\'s clearly there.)', correct: false },
        { ko: '저것도 얼마예요?', zh: '那个（远处）也多少钱？（收银台旁不算远）', zhEn: 'How much is that one over there? (Not too far from the counter)', correct: false },
        { ko: '몰라요, 죄송해요.', zh: '不知道，对不起。（不对题）', zhEn: 'I don\'t know, sorry. (Off-topic)', correct: false },
      ],
      explain: 'CU/다이소结账追加商品黄金句：이것도 주세요 = 这个也请给我。「도」= 也', explainEn: 'Golden phrase for adding items at CU/Daiso checkout: 이것도 주세요 = Please give me this too. 「도」= also',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd11-sc-d1',
      lines: [
        { speaker: '나', ko: '저기요, 저거 얼마예요?', zh: '请问，那个（远处）多少钱？', zhEn: 'Excuse me, how much is that one over there?' },
        { speaker: '羊 店员', speakerEn: 'Sheep clerk', ko: '', zh: '' },
      ],
      blankSpeaker: '羊 店员', blankSpeakerEn: 'Sheep clerk',
      choices: [
        { ko: '저거요? 천 원이에요.', zh: '那个吗？1000 元。（店员视角错——应该 그거）', zhEn: 'That one? 1,000 won. (Wrong clerk perspective—should be 그거)', correct: false },
        { ko: '그거요? 천 원이에요.', zh: '那个吗？1000 元。（店员视角"你指的那个"）', zhEn: 'That one? 1,000 won. (Clerk\'s perspective: "the one you\'re pointing at")', correct: true },
        { ko: '이거요? 천 원이에요.', zh: '这个吗？1000 元。（店员视角错——不是自己手边）', zhEn: 'This one? 1,000 won. (Wrong clerk perspective—not the one by your hand)', correct: false },
        { ko: '없어요, 죄송해요.', zh: '没有，对不起。（不对题）', zhEn: 'No, sorry. (Off-topic)', correct: false },
      ],
      explain: '客人 저거 → 店员 그거。空间指代要换视角——韩语三层空间的核心考点', explainEn: 'Customer says 저거 → clerk says 그거. Spatial reference shifts perspective—a core point of Korean\'s three-tier spatial system',
    },
    {
      type: 'dialogue',
      id: 'd11-sc-d2',
      lines: [
        { speaker: 'Junho', ko: '이거 봐! 당근 키링!', zh: '看！胡萝卜钥匙扣！', zhEn: 'Look! A carrot keychain!' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '와, 진짜 귀엽다! 나도 살래.', zh: '哇，好可爱！我也要买。（반말对朋友）', zhEn: 'Wow, so cute! I want to buy one too. (Casual speech to a friend)', correct: true },
        { ko: '아니요, 안 좋아요.', zh: '不，不好。（用해요体对朋友生分）', zhEn: 'No, not good. (Using 해요 style with a friend feels distant)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（不对题）', zhEn: 'Nice to meet you. (Off-topic)', correct: false },
        { ko: '얼마예요? 저거요?', zh: '多少钱？那个（远处）吗？（Junho 明显在指近处）', zhEn: 'How much? That one over there? (Junho is clearly pointing at something nearby)', correct: false },
      ],
      explain: '반말回应반말：와(哇·감탄) + 귀엽다(可爱·반말) + 나도 살래(我也要买·반말意愿形)', explainEn: 'Casual reply to casual: 와 (wow·exclamation) + 귀엽다 (cute·casual) + 나도 살래 (I want to buy too·casual volitional form)',
    },
    {
      type: 'dialogue',
      id: 'd11-sc-d3',
      lines: [
        { speaker: '羊 店员', speakerEn: 'Sheep clerk', ko: '이것도 필요하세요?', zh: '这个也需要吗？', zhEn: 'Do you need this too?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '네, 이것도 주세요.', zh: '是的，这个也请给我。', zhEn: 'Yes, please give me this too.', correct: true },
        { ko: '아니요, 없어요.', zh: '不，没有。（不对题）', zhEn: 'No, there isn\'t. (Off-topic)', correct: false },
        { ko: '얼마예요? 얼마예요?', zh: '多少钱？多少钱？（重复不对题）', zhEn: 'How much? How much? (Repeating, off-topic)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（不对场景）', zhEn: 'Nice to meet you. (Wrong for the situation)', correct: false },
      ],
      explain: '要就答 네, ~도 주세요。「이것도 주세요」是黄金追加句', explainEn: 'If yes, say 네, ~도 주세요. 「이것도 주세요」 is the golden add-on phrase',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd11-sc-c1',
      ko: '샴푸가 필요해요.',
      promptZh: '关于「필요해요」的助词用法，哪个描述最准确？', promptZhEn: 'Regarding the particle usage of 「필요해요」, which description is most accurate?',
      choices: [
        { zh: '前用主格 이/가（跟 있다/없다 一样是感受类动词）', zhEn: 'Takes subject particles 이/가 (like 있다/없다, it\'s a verb of perception)', correct: true },
        { zh: '前用宾格 을/를（跟"买"一样及物动词）', zhEn: 'Takes object particles 을/를 (transitive verb like "buy")', correct: false },
        { zh: '前用位置助词 에', zhEn: 'Takes the location particle 에', correct: false },
        { zh: '不加任何助词', zhEn: 'without any particle', correct: false },
      ],
      explain: '필요하다 前用**主格 이/가**——韩语把"需要"看作"存在感受"，跟 있다/없다 同类。샴푸 무받침 → 가',
    },
    {
      type: 'context',
      id: 'd11-sc-c2',
      ko: '이 당근 키링 좋아해.',
      promptZh: '关于「이 당근 키링 좋아해」，哪个描述最准确？', promptZhEn: 'Which description is most accurate about \'이 당근 키링 좋아해\'?',
      choices: [
        { zh: '「이 + 名词」是限定词"这~"（이 당근 키링 = 这个胡萝卜钥匙扣）+ 좋아해(喜欢·반말)', zhEn: '\'이 + noun\' is the determiner \'this~\' (이 당근 키링 = this carrot keyring) + 좋아해 (like·반말)', correct: true },
        { zh: '「이거 당근 키링」的错写', zhEn: '\'이거 당근 키링\' is a misspelling', correct: false },
        { zh: '「이」是感叹词，跟名词无关', zhEn: '\'이\' is an interjection, unrelated to nouns', correct: false },
        { zh: '「좋아해」是形容词"好"', zhEn: '\'좋아해\' is the adjective \'good\'', correct: false },
      ],
      explain: '이 是限定形容词后必接名词：이 사람(这人)/이 책(这书)。이거 = 이 + 것(代词独立用)。좋아하다 是动词"喜欢"', explainEn: '이 is a determiner that must precede a noun: 이 사람 (this person)/이 책 (this book). 이거 = 이 + 것 (used independently as a pronoun). 좋아하다 is the verb \'to like\'',
    },
  ],
};
