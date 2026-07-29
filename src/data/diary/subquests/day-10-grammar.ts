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
  subtitle: '있어요 / 없어요 · 韩语万能存在词',

  // ─── 助词/形态改错 ───
  fix: [
    {
      id: 'd10-g3-f1',
      promptKo: '시간를 있어요?',
      promptZh: '"有时间吗？"哪句正确？',
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
      promptZh: '"老师在吗？"（问对老师）最礼貌的说法是？',
      choices: [
        { text: '선생님 있어요?', correct: false },
        { text: '선생님 계세요?', correct: true },
        { text: '선생님 없어요?', correct: false },
        { text: '선생님 이에요?', correct: false },
      ],
      explain: '对老师/长辈用**계세요**（在·敬语），不用 있어요。있다 → 계시다 是尊敬形，专用于人。物用 있다',
    },
    {
      id: 'd10-g3-f3',
      promptKo: '오늘 없다요.',
      promptZh: '"今天没有"的礼貌形（해요体）应该是？',
      choices: [
        { text: '오늘 없다요.', correct: false },
        { text: '오늘 없어요.', correct: true },
        { text: '오늘 없아요.', correct: false },
        { text: '오늘 안이에요.', correct: false },
      ],
      explain: '없다 词干 없 + 어요 → 없어요（词干母音 ㅓ 不合 아 → 어）。实际发音 [업써요]（ㅄ 双收音只发左边 ㅂ）',
    },
    {
      id: 'd10-g3-f4',
      promptKo: '어제 집에 있어요.',
      promptZh: '"昨天在家"用过去时怎么说？',
      choices: [
        { text: '어제 집에 있어요.', correct: false },
        { text: '어제 집에 있었어요.', correct: true },
        { text: '어제 집에 있었다.', correct: false },
        { text: '어제 집에 있았어요.', correct: false },
      ],
      explain: '있다 过去式 → 있었어요。있 + 었 + 어요。「어제」= 昨天，暗示过去时',
    },
    {
      id: 'd10-g3-f5',
      promptKo: '맛있어요 → 맛없어요',
      promptZh: '关于「맛없어요」的发音，哪句正确？',
      choices: [
        { text: '[마시써요]', correct: false },
        { text: '[마덥써요]', correct: true },
        { text: '[맛업써요]', correct: false },
        { text: '[마섭써요]', correct: false },
      ],
      explain: '맛있어요 = [마시써요]（ㅅ 直接连 이）。맛없어요 = [마덥써요]（ㅅ 遇下一字辅音 ㅇ 变 ㄷ 音再连 없）。两词发音不同！',
    },
  ],

  // ─── 组句 ───
  compose: [
    {
      id: 'd10-g3-c1',
      zhHint: '有泡菜汤吗？',
      audioKo: '김치찌개 있어요?',
      answer: ['김치찌개', '있어요?'],
      tokens: ['김치찌개', '있어요?', '없어요?', '있다?', '주세요.', '얼마예요?'],
      explain: '김치찌개(泡菜汤) + 있어요?（有吗·升调疑问）。是非疑问只靠语调',
    },
    {
      id: 'd10-g3-c2',
      zhHint: '今天没有。对不起。',
      audioKo: '오늘 없어요. 죄송합니다.',
      answer: ['오늘', '없어요.', '죄송합니다.'],
      tokens: ['오늘', '없어요.', '죄송합니다.', '있어요.', '없다.', '괜찮아요.'],
      explain: '店员卖完时的委婉说法：오늘 없어요 + 죄송합니다。죄송합니다 是最正式的道歉',
    },
    {
      id: 'd10-g3-c3',
      zhHint: '那，请给我大酱汤。',
      audioKo: '그럼 된장찌개 주세요.',
      answer: ['그럼', '된장찌개', '주세요.'],
      tokens: ['그럼', '된장찌개', '주세요.', '그래서', '김치찌개', '있어요?'],
      explain: '그럼 = 那(顺承)。听到对方建议后接受的转折句。「그럼 ~ 주세요」是餐厅万能替换句',
    },
    {
      id: 'd10-g3-c4',
      zhHint: '真的好好吃！',
      audioKo: '진짜 맛있어요!',
      answer: ['진짜', '맛있어요!'],
      tokens: ['진짜', '맛있어요!', '맛없어요!', '없어요!', '괜찮아요!', '고마워요!'],
      explain: '진짜(真的) + 맛있어요(好吃)。맛(味) + 있다(有) 合成词。加 진짜 加强感叹',
    },
  ],

  // ─── 规则理解 ───
  rule: [
    {
      id: 'd10-g3-r1',
      promptZh: '关于「있어요」和「없어요」，哪句最准确？',
      choices: [
        { text: '있어요 = 有/在，없어요 = 没有/不在。同一个词既表"存在"也表"拥有"', correct: true },
        { text: '있어요 = 有，없어요 = 是，语义不同', correct: false },
        { text: '两者可以互换使用', correct: false },
        { text: '있어요 是动词，없어요 是形容词', correct: false },
      ],
      explain: '韩语用同一对词表"存在"和"拥有"。「돈 있어요」可以是"有钱"也可以是"钱在这里"，靠上下文分',
    },
    {
      id: 'd10-g3-r2',
      promptZh: '别人问「김치 없어요?」(没有泡菜吗？) 如果你确实没有，最标准的答法？',
      choices: [
        { text: '네, 없어요.（对，没有）', correct: true },
        { text: '아니요, 없어요.（不，没有）', correct: false },
        { text: '네, 있어요.（对，有）', correct: false },
        { text: '아니요, 있어요.（不，有）', correct: false },
      ],
      explain: '韩语的 네/아니요 逻辑：确认对方说的对不对。「没有吗？」+ 确实没有 → 「네, 없어요」（对，没有）。跟中文"对/不对"的逻辑相反',
    },
    {
      id: 'd10-g3-r3',
      promptZh: '关于「맛있다」，哪句是对的？',
      choices: [
        { text: '맛있다 = 맛(味) + 있다(有) → 好吃', correct: true },
        { text: '맛있다 是一个独立词，跟 맛 和 있다 无关', correct: false },
        { text: '맛있다 = 맛(味) + 이다(是) → 是味道', correct: false },
        { text: '맛있다 只能用于喝的，不能用于吃的', correct: false },
      ],
      explain: '맛(味) + 있다(有) → 맛있다。同理 재미(乐趣) + 있다 → 재미있다(有趣)。反义都用 없다：맛없다(不好吃)/재미없다(无聊)',
    },
    {
      id: 'd10-g3-r4',
      promptZh: '关于对老师说「在吗？」的正确说法，哪句最对？',
      choices: [
        { text: '선생님 있어요?（普通询问）', correct: false },
        { text: '선생님 계세요?（계시다 是 있다 的敬语）', correct: true },
        { text: '선생님 있는가?（书面）', correct: false },
        { text: '선생님 되세요?（되다 是"成为"，语义不对）', correct: false },
      ],
      explain: '있다 的尊敬形是 계시다 → 계세요。用于人（老师、长辈、客户等）。物用 있다 不变，「책 계세요」❌ → 「책 있어요」✅',
    },
  ],
};
