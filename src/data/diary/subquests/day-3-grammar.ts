import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 3 · 1-3 语法关 · 主格助词 이/가
 * 3 段：改错 5 → 组句 4 → 规则理解 4
 *
 * 教学梯度：
 *   fix 逐条揪 짐가/집이/짐을 之类真实翻车（主格 vs 宾格 vs 收音判断）
 *   → compose 从「제 짐이 무거워요」这种 Day 3 主流程句型入手
 *   → rule 抽象出 有收音 이 / 无收音 가 / 이/가 vs 은/는 差别
 *
 * 承上（Day 2 을/를）启下（Day 5 은/는）：三大助词的对比在 Day 5 完整收束
 */
export const day3Grammar: GrammarSubQuestData = {
  day: 3, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '掌握主格助词 이/가 —— 谁怎么样/在哪', subtitleEn: 'Master the subject particles 이/가 — who is how/where.',

  // ─── 助词改错：给错句 → 选正确写法 ───
  fix: [
    {
      id: 'd03-g3-f1',
      promptKo: '제 짐가 무거워요.',
      promptZh: '下列哪个句子是正确的？', promptZhEn: 'Which of the following sentences is correct?',
      choices: [
        { text: '제 짐가 무거워요.', correct: false },
        { text: '제 짐이 무거워요.', correct: true },
        { text: '제 짐을 무거워요.', correct: false },
        { text: '제 짐는 무거워요.', correct: false },
      ],
      explain: '「짐」末字有收音 ㅁ → 主格助词用 이。무거워요 是形容词，前面用主格不用宾格', explainEn: '\'짐\' ends with ㅁ → use subject particle 이. \'무거워요\' is an adjective, so it takes the subject particle, not the object particle.',
    },
    {
      id: 'd03-g3-f2',
      promptKo: '가방이 어디예요?',
      promptZh: '哪句正确？', promptZhEn: 'Which sentence is correct?',
      choices: [
        { text: '가방은 어디예요?', correct: false },
        { text: '가방을 어디예요?', correct: false },
        { text: '가방이 어디예요?', correct: true },
        { text: '가방에 어디예요?', correct: false },
      ],
      explain: '问「东西在哪里」用主格 이/가。가방 末字有收音 ㅇ → 이。用 은 会变成主题助词，语感变了', explainEn: 'To ask \'where is something\', use the subject particle 이/가. 가방 ends with ㅇ → 이. Using 은 would make it a topic particle, changing the nuance.',
    },
    {
      id: 'd03-g3-f3',
      promptKo: '택시가 있어요.',
      promptZh: '"有出租车"哪句正确？', promptZhEn: 'Which sentence is correct for \'There\'s a taxi\'?',
      choices: [
        { text: '택시이 있어요.', correct: false },
        { text: '택시가 있어요.', correct: true },
        { text: '택시을 있어요.', correct: false },
        { text: '택시는 있어요.', correct: false },
      ],
      explain: '택시 末字 시 无收音 → 主格用 가。「있어요」前一律用主格 이/가，不用宾格 을/를', explainEn: '택시 ends with 시 (no final consonant) → use subject particle 가. \'있어요\' always takes the subject particle 이/가, not the object particle 을/를.',
    },
    {
      id: 'd03-g3-f4',
      promptKo: '집는 여기예요.',
      promptZh: '"家在这里"哪句最自然？', promptZhEn: 'Which sentence is most natural for \'The home is here\'?',
      choices: [
        { text: '집는 여기예요.', correct: false },
        { text: '집은 여기예요.', correct: true },
        { text: '집가 여기예요.', correct: false },
        { text: '집을 여기예요.', correct: false },
      ],
      explain: '집 末字有收音 ㅂ → 主题助词用 은（不是 는）。这里用主题助词强调"家（这个话题）"', explainEn: '집 ends with ㅂ → use topic particle 은 (not 는). Here the topic particle emphasizes \'home (as a topic)\'.',
    },
    {
      id: 'd03-g3-f5',
      promptKo: '언니가 도와주세요.',
      promptZh: '想请姐姐帮忙，最自然的说法是？', promptZhEn: 'What\'s the most natural way to ask your sister for help?',
      choices: [
        { text: '언니가 도와주세요.', correct: false },
        { text: '언니를 도와주세요.', correct: false },
        { text: '언니, 좀 도와주세요.', correct: true },
        { text: '언니는 도와주세요.', correct: false },
      ],
      explain: '「도와주세요」是请求对方帮我，主语是对方（隐藏）。直接呼语 언니 + 좀 도와주세요 最自然', explainEn: '\'도와주세요\' is asking the other person to help me, with the subject being the other person (implied). Using the direct address 언니 + 좀 도와주세요 is most natural.',
    },
  ],

  // ─── 组句：词块拼完整句 ───
  compose: [
    {
      id: 'd03-g3-c1',
      zhHint: '我的行李太重了。', zhHintEn: 'My luggage is too heavy.',
      audioKo: '제 짐이 너무 무거워요.',
      answer: ['제', '짐이', '너무', '무거워요.'],
      tokens: ['제', '짐이', '너무', '무거워요.', '집이', '가벼워요.'],
      explain: '짐(有收音 ㅁ) + 이(主格) + 너무(太) + 무거워요', explainEn: '짐 (has final consonant ㅁ) + 이 (subject particle) + 너무 (too) + 무거워요',
    },
    {
      id: 'd03-g3-c2',
      zhHint: '包在哪里？', zhHintEn: 'Where is the bag?',
      audioKo: '가방이 어디예요?',
      answer: ['가방이', '어디예요?'],
      tokens: ['가방이', '어디예요?', '가방을', '가방은', '뭐예요?'],
      explain: '가방(有收音 ㅇ) + 이。「어디예요?」前用主格。「가방을」是宾格（错），「가방은」变主题（语感变）', explainEn: '가방 (has final consonant ㅇ) + 이. Use the subject particle before \'어디예요?\'. \'가방을\' is the object particle (wrong), \'가방은\' changes to topic (nuance changes).',
    },
    {
      id: 'd03-g3-c3',
      zhHint: '不好意思，请帮个忙。', zhHintEn: 'Excuse me, could you help me?',
      audioKo: '저기요, 좀 도와주세요.',
      answer: ['저기요,', '좀', '도와주세요.'],
      tokens: ['저기요,', '좀', '도와주세요.', '주세요.', '감사합니다.', '언니'],
      explain: '저기요(开场) + 좀(缓和语气) + 도와주세요(请帮我)。留学生保命句公式', explainEn: '저기요 (opening) + 좀 (softens tone) + 도와주세요 (please help me). The survival phrase formula for international students.',
    },
    {
      id: 'd03-g3-c4',
      zhHint: '姐姐，真的非常感谢。', zhHintEn: 'Sister, thank you so much.',
      audioKo: '언니, 정말 감사합니다.',
      answer: ['언니,', '정말', '감사합니다.'],
      tokens: ['언니,', '정말', '감사합니다.', '괜찮아요.', '미안해요.', '오빠,'],
      explain: '언니(呼语) + 정말(真的) + 감사합니다。정말 加倍真诚度', explainEn: '언니 (address) + 정말 (really) + 감사합니다. 정말 doubles the sincerity.',
    },
  ],

  // ─── 规则理解选择 ───
  rule: [
    {
      id: 'd03-g3-r1',
      promptZh: '"짐"（末字有收音 ㅁ），做主语说"行李很重"应该加？', promptZhEn: '\'짐\' (last syllable has final consonant ㅁ), when used as the subject to say \'the luggage is heavy\', what should be added?',
      choices: [
        { text: '이（主格）', textEn: '이 (subject particle)', correct: true },
        { text: '가（主格）', textEn: '가 (subject particle)', correct: false },
        { text: '을（宾格）', textEn: '을 (object particle)', correct: false },
        { text: '는（主题）', textEn: '는 (topic particle)', correct: false },
      ],
      explain: '主格助词：有收音 → 이，无收音 → 가。「무거워요」这种形容词前用主格', explainEn: 'Subject particle: with final consonant → 이, without → 가. Use the subject particle before adjectives like \'무거워요\'.',
    },
    {
      id: 'd03-g3-r2',
      promptZh: '"택시"（末字无收音）做主语，应该加？', promptZhEn: '\'택시\' (last syllable has no final consonant) as the subject, what should be added?',
      choices: [
        { text: '이', correct: false },
        { text: '가', correct: true },
        { text: '은', correct: false },
        { text: '를', correct: false },
      ],
      explain: '무收音 → 主格 가。「택시가 있어요」= 有出租车', explainEn: 'No final consonant → subject particle 가. \'택시가 있어요\' = There\'s a taxi.',
    },
    {
      id: 'd03-g3-r3',
      promptZh: '关于「이/가」和「은/는」的区别，下面哪句是对的？', promptZhEn: 'Regarding the difference between \'이/가\' and \'은/는\', which statement is correct?',
      choices: [
        { text: '两个完全一样，随便用。', textEn: 'They\'re exactly the same, use either.', correct: false },
        { text: '이/가 用于"新信息 / 陈述客观状态"，은/는 用于"对比 / 强调主题"。', textEn: '이/가 is for \'new information / stating objective states\', 은/는 is for \'contrast / emphasizing the topic\'.', correct: true },
        { text: '이/가 只用于问句，은/는 只用于陈述句。', textEn: '이/가 is only for questions, 은/는 is only for statements.', correct: false },
        { text: '이/가 是宾格助词，은/는 是主格助词。', textEn: '이/가 is the object particle, 은/는 is the subject particle.', correct: false },
      ],
      explain: '이/가 用于"陈述新信息/焦点"（짐이 무거워요、택시가 있어요），은/는 用于"提出话题"（저는 학생이에요）。同一句里也能并存：저는 커피가 좋아요', explainEn: '이/가 is for \'stating new information/focus\' (짐이 무거워요, 택시가 있어요), 은/는 is for \'introducing a topic\' (저는 학생이에요). They can coexist in the same sentence: 저는 커피가 좋아요.',
    },
    {
      id: 'd03-g3-r4',
      promptZh: '"包在哪里？"哪句最自然？', promptZhEn: 'Which is the most natural way to say \'Where is the bag?\'',
      choices: [
        { text: '가방은 어디예요?', correct: false },
        { text: '가방을 어디예요?', correct: false },
        { text: '가방이 어디예요?', correct: true },
        { text: '가방에 어디예요?', correct: false },
      ],
      explain: '「어디예요?」问位置，主语用主格 이/가。가방 有收音 ㅇ → 이', explainEn: '\'어디예요?\' asks for location, the subject uses the subject particle 이/가. 가방 has final consonant ㅇ → 이.',
    },
  ],
};
