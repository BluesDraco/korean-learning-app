import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 12 · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖文具店选笔 · Minji 教韩币 · 结账付款
 */
export const day12Scene: SceneSubQuestData = {
  day: 12, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在文具店独立完成价格对话', subtitleEn: 'Complete a price conversation independently at a stationery store.',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd12-sc-s1',
      scenario: '你想问文具店老板"这支笔多少钱"，你手里拿着这支笔。最标准的问法？', scenarioEn: 'You want to ask the stationery store owner "How much is this pen?" while holding it. What\'s the most standard way to ask?',
      choices: [
        { ko: '이거 얼마예요?', zh: '这个多少钱？', zhEn: 'How much is this?', correct: true },
        { ko: '이거 몇 개예요?', zh: '这个有几个？（问数量不问价）', zhEn: 'How many of these are there? (Asking quantity, not price)', correct: false },
        { ko: '이거 뭐예요?', zh: '这个是什么？（问身份不问价）', zhEn: 'What is this? (Asking what it is, not price)', correct: false },
        { ko: '얼마 이거 있어요?', zh: '多少这个有？（语序错）', zhEn: 'How much this has? (Wrong word order)', correct: false },
      ],
      explain: '얼마 = 多少钱（用于价格）。「이거 얼마예요?」是购物万能问价句', explainEn: '얼마 = how much (for price). "이거 얼마예요?" is the go-to phrase for asking prices while shopping.',
    },
    {
      type: 'situation',
      id: 'd12-sc-s2',
      scenario: '店员说「그거 만 이천원이에요.」你听到万舌头打了个结，想반말问 Minji"是 12000 元吗？"确认，应该？', scenarioEn: 'The clerk says "그거 만 이천원이에요." You hear "만" and get tangled up, wanting to confirm with Minji in 반말, "Is it 12,000 won?" What should you say?',
      choices: [
        { ko: '만 이천원이야?', zh: '是 12000 元吗？（반말·对朋友）', zhEn: 'Is it 12,000 won? (Casual, to a friend)', correct: true },
        { ko: '십이천원이에요?', zh: '是 12000 元吗？（数字读法错）', zhEn: 'Is it 12,000 won? (Wrong number reading)', correct: false },
        { ko: '얼마예요? 다시요!', zh: '多少钱？再说一次！（对店员反问，语气生硬）', zhEn: 'How much? Say it again! (Bluntly asking the clerk)', correct: false },
        { ko: '이거 없어요.', zh: '这个没有。（不对题）', zhEn: 'This doesn\'t have it. (Off-topic)', correct: false },
      ],
      explain: '반말 이에요 → 이야。问朋友数字用반말确认更自然。数字读法：만 이천（不是 십이천）', explainEn: '반말 이에요 → 이야. Confirming numbers with a friend in 반말 is more natural. Number reading: 만 이천 (not 십이천).',
    },
    {
      type: 'situation',
      id: 'd12-sc-s3',
      scenario: '你付完 12000 元，店员把笔装袋递过来。你想道谢+祝她愉快，最礼貌的一句？', scenarioEn: 'You\'ve paid 12,000 won, and the clerk bags the pen and hands it over. You want to thank her and wish her well. What\'s the most polite thing to say?',
      choices: [
        { ko: '감사합니다. 좋은 하루 보내세요.', zh: '谢谢。祝您愉快。', zhEn: 'Thank you. Have a nice day.', correct: true },
        { ko: '만 원만 받으세요.', zh: '只收一万吧。（砍价？韩国不常见）', zhEn: 'Just take 10,000. (Haggling? Not common in Korea)', correct: false },
        { ko: '너무 비싸요.', zh: '太贵了。（付完钱说这个不礼貌）', zhEn: 'Too expensive. (Rude to say after paying)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
      ],
      explain: '감사합니다 + 좋은 하루 보내세요（祝您有个好日子）。店铺结束时的礼貌套语', explainEn: '감사합니다 + 좋은 하루 보내세요 (Have a nice day). A polite closing phrase at a store.',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd12-sc-d1',
      lines: [
        { speaker: 'Minji', ko: '토리야, 너 한국 돈 봤어?', zh: '兔莉，你看过韩币吗？', zhEn: 'Tori, have you seen Korean money?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '아니, 처음 봐.', zh: '没，第一次看。（반말回반말·真实回应）', zhEn: 'No, first time seeing it. (Casual reply to casual, honest)', correct: true },
        { ko: '네, 봤어요.', zh: '是的，看过。（对朋友用해요体生分且不真诚）', zhEn: 'Yes, I have. (Using 해요체 with a friend is distant and insincere)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', zhEn: 'How much? (Off-topic.)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '반말对반말：아니(没·반말"不") + 처음(第一次) + 봐(看·반말现在时)', explainEn: '반말 to 반말: 아니 (no, casual "not") + 처음 (first time) + 봐 (see, casual present tense)',
    },
    {
      type: 'dialogue',
      id: 'd12-sc-d2',
      lines: [
        { speaker: '店员', speakerEn: 'Store clerk', ko: '이거 만 이천원이에요.', zh: '这个 12000 元。', zhEn: 'This is 12,000 won.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '만…이천…원이에요?', zh: '一万……两千……元吗？（练念+确认）', zhEn: 'Ten... thousand... two thousand won? (Practice reading + confirming)', correct: true },
        { ko: '얼마예요?', zh: '多少钱？（刚说过）', zhEn: 'How much is it? (Just said)', correct: false },
        { ko: '너무 비싸요, 안 살게요.', zh: '太贵了，不买了。（笔一般不砍价）', zhEn: 'Too expensive, I won\'t buy it. (Pens usually aren\'t haggled over)', correct: false },
        { ko: '없어요.', zh: '没有。（不对题）', zhEn: 'No. (Off-topic.)', correct: false },
      ],
      explain: '重复确认价格是初学者的自然反应，也帮自己练念数字。语气升调 = 确认疑问', explainEn: 'Repeating to confirm the price is a natural beginner reaction, and it also helps practice numbers. Rising tone = confirming question',
    },
    {
      type: 'dialogue',
      id: 'd12-sc-d3',
      lines: [
        { speaker: 'Minji', ko: '만 원, 알겠어?', zh: '一万元，明白了吗？', zhEn: 'Ten thousand won, got it?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '응, 알았어. 만 원… 만 원…', zh: '嗯，明白了。万元……万元……（반말+练念）', zhEn: 'Yeah, got it. Ten thousand... ten thousand... (casual + practice reading)', correct: true },
        { ko: '네, 알겠습니다.', zh: '是的，明白了。（对朋友用합쇼체过于生硬）', zhEn: 'Yes, understood. (Using formal speech with a friend is too stiff)', correct: false },
        { ko: '몰라요.', zh: '不知道。（Minji 刚教完就说不知道，不合逻辑）', zhEn: 'I don\'t know. (Minji just taught it, so saying you don\'t know doesn\'t make sense)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', zhEn: 'How much? (Off-topic.)', correct: false },
      ],
      explain: '반말"知道了" → 알았어。반말对반말。「만 원」重复念是自然反应', explainEn: 'Casual "got it" → 알았어. Casual to casual. Repeating "만 원" is a natural reaction',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd12-sc-c1',
      ko: '이거 얼마예요?',
      promptZh: '这句话最合适的使用场景是？', promptZhEn: 'What\'s the most appropriate situation for this phrase?',
      choices: [
        { zh: '在便利店、文具店、다이소 等场所问价格', zhEn: 'Asking prices at convenience stores, stationery stores, Daiso, etc.', correct: true },
        { zh: '在食堂点单', zhEn: 'Ordering at a cafeteria', correct: false },
        { zh: '打招呼', zhEn: 'Greeting', correct: false },
        { zh: '道别', zhEn: 'Saying goodbye', correct: false },
      ],
      explain: '얼마 = 多少钱。「이거 얼마예요?」是韩国购物场景 No.1 万能句', explainEn: '얼마 = how much. "이거 얼마예요?" is the #1 all-purpose phrase for shopping in Korea',
    },
    {
      type: 'context',
      id: 'd12-sc-c2',
      ko: '만 이천원이에요.',
      promptZh: '关于 「만 이천원」 的读法，哪个描述最准确？', promptZhEn: 'Regarding the reading of "만 이천원", which description is most accurate?',
      choices: [
        { zh: '韩语以万为基准拆分——12000 = 만(1万) + 이천(2千)。中间不加 일', zhEn: 'Korean splits by ten-thousand units—12000 = 만 (10,000) + 이천 (2,000). No 일 in between', correct: true },
        { zh: '正确写法是 「십이천원」（十二千元）', zhEn: 'The correct form is "십이천원" (twelve thousand won)', correct: false },
        { zh: '正确写法是 「일만 이천원」（加 일 更正式）', zhEn: 'The correct form is "일만 이천원" (adding 일 is more formal)', correct: false },
        { zh: '正确写法是 「만이천 원」（数字连读，不隔开）', zhEn: 'The correct form is "만이천 원" (numbers read together, no space)', correct: false },
      ],
      explain: '韩语的数字拆分逻辑跟中文不同——以万为基准，不用"十二千"。前面也不加 일（万/千/百前都不加）', explainEn: 'Korean number grouping differs from Chinese—it\'s based on ten-thousand units, not "twelve thousand". Also, no 일 before 만/천/백',
    },
  ],
};
