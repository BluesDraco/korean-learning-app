import type { GrammarSubQuestData } from '@/types/tori-subquest';

/**
 * Day 10 · 1-3 문법 탐험 · 语法关
 * 3 段：助词/形态改错 5 → 组句 4 → 规则理解 4
 *
 * 核心：있어요/없어요 + 이/가 主格助词
 * 教学梯度：
 *   fix 挑常见错误——用宾格/助词漏、계세요 vs 있어요
 *   → compose 从单句到过去时到复杂句
 *   → rule 抽象规则：네/아니요 逻辑、맛있다 派生、敬语层级
 */
export const day10Grammar: GrammarSubQuestData = {
  day: 10, level: 'beginner', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '있어요 / 없어요 · 韩语万能存在词', subtitleEn: '있어요 / 없어요 · Korean all-purpose existence words',

  // ─── 助词/形态改错 ───
  fix: [
    {
      id: 'd10-g3-f1',
      promptKo: '시간를 있어요?',
      promptZh: '"有时间吗？"哪句正确？', promptZhEn: 'Which is correct for "Do you have time?"',
      choices: [
        { text: '시간를 있어요?', correct: false },
        { text: '시간이 있어요?', correct: true },
        { text: '시간에 있어요?', correct: false },
        { text: '시간이 있다?', correct: false },
      ],
      explain: '있어요/없어요 前用**主格 이/가**，不是宾格 을/를。시간 有받침 ㄴ → 이。있어요 不是动作，是"存在"',
    },
    {
      id: 'd10-g3-f2',
      promptKo: '선생님 있어요?',
      promptZh: '"老师在吗？"（问对老师）最礼貌的说法是？', promptZhEn: '"Is the teacher here?" (asking about the teacher) — what\'s the most polite way to say it?',
      choices: [
        { text: '선생님 있어요?', correct: false },
        { text: '선생님 계세요?', correct: true },
        { text: '선생님 없어요?', correct: false },
        { text: '선생님 이에요?', correct: false },
      ],
      explain: '对老师/长辈用**계세요**（在·敬语），不用 있어요。있다 → 계시다 是尊敬形，专用于人。物用 있다', explainEn: 'Use 계세요 (to be, honorific) for teachers/elders, not 있어요. 있다 → 계시다 is the honorific form, used only for people. Use 있다 for objects',
    },
    {
      id: 'd10-g3-f3',
      promptKo: '오늘 없다요.',
      promptZh: '"今天没有"的礼貌形（해요体）应该是？', promptZhEn: 'What\'s the polite form (해요 style) of "not have today"?',
      choices: [
        { text: '오늘 없다요.', correct: false },
        { text: '오늘 없어요.', correct: true },
        { text: '오늘 없아요.', correct: false },
        { text: '오늘 안이에요.', correct: false },
      ],
      explain: '없다 词干 없 + 어요 → 없어요（词干母音 ㅓ 不合 아 → 어）。实际发音 [업써요]（ㅄ 双收音只发左边 ㅂ）', explainEn: '없다 stem 없 + 어요 → 없어요 (stem vowel ㅓ doesn\'t combine with 아 → 어). Actual pronunciation: [업써요] (the double final consonant ㅄ is pronounced only as the left ㅂ)',
    },
    {
      id: 'd10-g3-f4',
      promptKo: '어제 집에 있어요.',
      promptZh: '"昨天在家"用过去时怎么说？', promptZhEn: 'How do you say "was home yesterday" in the past tense?',
      choices: [
        { text: '어제 집에 있어요.', correct: false },
        { text: '어제 집에 있었어요.', correct: true },
        { text: '어제 집에 있었다.', correct: false },
        { text: '어제 집에 있았어요.', correct: false },
      ],
      explain: '있다 过去式 → 있었어요。있 + 었 + 어요。「어제」= 昨天，暗示过去时', explainEn: '있다 past tense → 있었어요. 있 + 었 + 어요. 어제 = yesterday, implying past tense',
    },
    {
      id: 'd10-g3-f5',
      promptKo: '맛있어요 → 맛없어요',
      promptZh: '关于「맛없어요」的发音，哪句正确？', promptZhEn: 'Regarding the pronunciation of 맛없어요, which statement is correct?',
      choices: [
        { text: '[마시써요]', correct: false },
        { text: '[마덥써요]', correct: true },
        { text: '[맛업써요]', correct: false },
        { text: '[마섭써요]', correct: false },
      ],
      explain: '맛있어요 = [마시써요]（ㅅ 直接连 이）。맛없어요 = [마덥써요]（ㅅ 遇下一字辅音 ㅇ 变 ㄷ 音再连 없）。两词发音不同！', explainEn: '맛있어요 = [마시써요] (ㅅ connects directly to 이). 맛없어요 = [마덥써요] (ㅅ becomes ㄷ before the next syllable\'s initial ㅇ, then links to 없). The two words are pronounced differently!',
    },
  ],

  // ─── 组句 ───
  compose: [
    {
      id: 'd10-g3-c1',
      zhHint: '有泡菜汤吗？', zhHintEn: 'Do you have kimchi stew?',
      audioKo: '김치찌개 있어요?',
      answer: ['김치찌개', '있어요?'],
      tokens: ['김치찌개', '있어요?', '없어요?', '있다?', '주세요.', '얼마예요?'],
      explain: '김치찌개(泡菜汤) + 있어요?（有吗·升调疑问）。是非疑问只靠语调', explainEn: '김치찌개 (kimchi stew) + 있어요? (is there? · rising intonation question). Yes/no questions rely only on intonation',
    },
    {
      id: 'd10-g3-c2',
      zhHint: '今天没有。对不起。', zhHintEn: 'Not today. Sorry.',
      audioKo: '오늘 없어요. 죄송합니다.',
      answer: ['오늘', '없어요.', '죄송합니다.'],
      tokens: ['오늘', '없어요.', '죄송합니다.', '있어요.', '없다.', '괜찮아요.'],
      explain: '店员卖完时的委婉说法：오늘 없어요 + 죄송합니다。죄송합니다 是最正式的道歉', explainEn: 'A polite way for staff to say something\'s sold out: 오늘 없어요 + 죄송합니다. 죄송합니다 is the most formal apology',
    },
    {
      id: 'd10-g3-c3',
      zhHint: '那，请给我大酱汤。', zhHintEn: 'Then, please give me soybean paste stew.',
      audioKo: '그럼 된장찌개 주세요.',
      answer: ['그럼', '된장찌개', '주세요.'],
      tokens: ['그럼', '된장찌개', '주세요.', '그래서', '김치찌개', '있어요?'],
      explain: '그럼 = 那(顺承)。听到对方建议后接受的转折句。「그럼 ~ 주세요」是餐厅万能替换句', explainEn: '그럼 = then (transition). A phrase used to accept after hearing someone\'s suggestion. "그럼 ~ 주세요" is the all-purpose restaurant substitution phrase',
    },
    {
      id: 'd10-g3-c4',
      zhHint: '真的好好吃！', zhHintEn: 'It\'s really delicious!',
      audioKo: '진짜 맛있어요!',
      answer: ['진짜', '맛있어요!'],
      tokens: ['진짜', '맛있어요!', '맛없어요!', '없어요!', '괜찮아요!', '고마워요!'],
      explain: '진짜(真的) + 맛있어요(好吃)。맛(味) + 있다(有) 合成词。加 진짜 加强感叹', explainEn: '진짜 (really) + 맛있어요 (delicious). A compound of 맛 (taste) + 있다 (to have). Adding 진짜 intensifies the exclamation',
    },
  ],

  // ─── 规则理解 ───
  rule: [
    {
      id: 'd10-g3-r1',
      promptZh: '关于「있어요」和「없어요」，哪句最准确？', promptZhEn: 'Regarding 있어요 and 없어요, which statement is most accurate?',
      choices: [
        { text: '있어요 = 有/在，없어요 = 没有/不在。同一个词既表"存在"也表"拥有"', textEn: '있어요 = have/exist, 없어요 = don\'t have/not exist. The same word expresses both "existence" and "possession"', correct: true },
        { text: '있어요 = 有，없어요 = 是，语义不同', textEn: '있어요 = have, 없어요 = be, different meanings', correct: false },
        { text: '两者可以互换使用', textEn: 'The two can be used interchangeably', correct: false },
        { text: '있어요 是动词，없어요 是形容词', textEn: '있어요 is a verb, 없어요 is an adjective', correct: false },
      ],
      explain: '韩语用同一对词表"存在"和"拥有"。「돈 있어요」可以是"有钱"也可以是"钱在这里"，靠上下文分', explainEn: 'Korean uses the same pair of words for "existence" and "possession." 「돈 있어요」 can mean "I have money" or "The money is here," depending on context.',
    },
    {
      id: 'd10-g3-r2',
      promptZh: '别人问「김치 없어요?」(没有泡菜吗？) 如果你确实没有，最标准的答法？', promptZhEn: 'If someone asks 「김치 없어요?」 (Is there no kimchi?) and you really don\'t have any, what\'s the most standard reply?',
      choices: [
        { text: '네, 없어요.（对，没有）', textEn: '네, 없어요. (Yes, there isn\'t.)', correct: true },
        { text: '아니요, 없어요.（不，没有）', textEn: '아니요, 없어요. (No, there isn\'t.)', correct: false },
        { text: '네, 있어요.（对，有）', textEn: '네, 있어요. (Yes, there is.)', correct: false },
        { text: '아니요, 있어요.（不，有）', textEn: '아니요, 있어요. (No, there is.)', correct: false },
      ],
      explain: '韩语的 네/아니요 逻辑：确认对方说的对不对。「没有吗？」+ 确实没有 → 「네, 없어요」（对，没有）。跟中文"对/不对"的逻辑相反', explainEn: 'Korean 네/아니요 logic: confirm whether what the other person said is right. "Is there none?" + indeed none → 「네, 없어요」 (Yes, there isn\'t). This is opposite to the Chinese "right/wrong" logic.',
    },
    {
      id: 'd10-g3-r3',
      promptZh: '关于「맛있다」，哪句是对的？', promptZhEn: 'Which statement about 「맛있다」 is correct?',
      choices: [
        { text: '맛있다 = 맛(味) + 있다(有) → 好吃', textEn: '맛있다 = 맛 (taste) + 있다 (to have) → delicious', correct: true },
        { text: '맛있다 是一个独立词，跟 맛 和 있다 无关', textEn: '맛있다 is an independent word, unrelated to 맛 and 있다.', correct: false },
        { text: '맛있다 = 맛(味) + 이다(是) → 是味道', textEn: '맛있다 = 맛 (taste) + 이다 (to be) → it\'s a taste', correct: false },
        { text: '맛있다 只能用于喝的，不能用于吃的', textEn: '맛있다 can only be used for drinks, not food.', correct: false },
      ],
      explain: '맛(味) + 있다(有) → 맛있다。同理 재미(乐趣) + 있다 → 재미있다(有趣)。反义都用 없다：맛없다(不好吃)/재미없다(无聊)', explainEn: '맛 (taste) + 있다 (to have) → 맛있다. Likewise, 재미 (fun) + 있다 → 재미있다 (interesting). The opposites use 없다: 맛없다 (not tasty) / 재미없다 (boring).',
    },
    {
      id: 'd10-g3-r4',
      promptZh: '关于对老师说「在吗？」的正确说法，哪句最对？', promptZhEn: 'Which is the most correct way to ask a teacher "Are you there?"',
      choices: [
        { text: '선생님 있어요?（普通询问）', textEn: '선생님 있어요? (casual inquiry)', correct: false },
        { text: '선생님 계세요?（계시다 是 있다 的敬语）', textEn: '선생님 계세요? (계시다 is the honorific form of 있다)', correct: true },
        { text: '선생님 있는가?（书面）', textEn: '선생님 있는가? (written)', correct: false },
        { text: '선생님 되세요?（되다 是"成为"，语义不对）', textEn: '선생님 되세요? (되다 means "to become," so it\'s semantically wrong)', correct: false },
      ],
      explain: '있다 的尊敬形是 계시다 → 계세요。用于人（老师、长辈、客户等）。物用 있다 不变，「책 계세요」❌ → 「책 있어요」✅', explainEn: 'The honorific form of 있다 is 계시다 → 계세요. Used for people (teachers, elders, clients, etc.). For objects, 있다 stays the same: 「책 계세요」❌ → 「책 있어요」✅',
    },
  ],
};
