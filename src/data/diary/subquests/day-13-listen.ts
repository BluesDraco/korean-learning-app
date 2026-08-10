import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 13 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 13 主流程 약국+Haru 陪同场景
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化"病名 걸렸어요"和"症状 나요"两句型，reply 铺 药剂师应对
 */
export const day13Listen: ListenSubQuestData = {
  day: 13, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '在 약국柜台，听清白鹭姐姐的每一句嘱咐',

  // ─── 听句选意 ───
  meaning: [
    {
      id: 'd13-l2-m1',
      audioKo: '감기 걸렸어요.',
      choices: [
        { text: '我感冒了。', correct: true },
        { text: '我发烧了。', correct: false },
        { text: '我头痛。', correct: false },
        { text: '我拉肚子了。', correct: false },
      ],
      explain: '감기(感冒) + 걸리다(得·过去式 걸렸어요)。得病用过去式——已经感染上了',
    },
    {
      id: 'd13-l2-m2',
      audioKo: '어디가 아파요?',
      choices: [
        { text: '哪里痛？', correct: true },
        { text: '哪里去？', correct: false },
        { text: '什么时候来？', correct: false },
        { text: '在哪里？', correct: false },
      ],
      explain: '어디(哪里) + 가(主格) + 아파요?（痛吗？）。医生/药师第一问',
    },
    {
      id: 'd13-l2-m3',
      audioKo: '콧물이 나요.',
      choices: [
        { text: '流鼻涕。', correct: true },
        { text: '流眼泪。', correct: false },
        { text: '发烧。', correct: false },
        { text: '咳嗽。', correct: false },
      ],
      explain: '콧물(鼻涕) + 이(主格) + 나요(出/流)。症状"出现"用 나다',
    },
    {
      id: 'd13-l2-m4',
      audioKo: '식후에 드세요.',
      choices: [
        { text: '请饭前服用。', correct: false },
        { text: '请饭后服用。', correct: true },
        { text: '请每 4 小时服用。', correct: false },
        { text: '请空腹服用。', correct: false },
      ],
      explain: '식후(饭后) + 에(时间助词) + 드세요(请服用·敬语)。药盒上必写',
    },
    {
      id: 'd13-l2-m5',
      audioKo: '따뜻한 물 많이 마셔요.',
      choices: [
        { text: '多喝热水。', correct: true },
        { text: '多吃热菜。', correct: false },
        { text: '多睡觉。', correct: false },
        { text: '多锻炼。', correct: false },
      ],
      explain: '따뜻한(热的·定语) + 물(水) + 많이(多) + 마셔요(喝)。感冒时的黄金嘱咐',
    },
  ],

  // ─── 听句填空 ───
  cloze: [
    {
      id: 'd13-l2-c1',
      audioKo: '감기 걸렸어요.',
      clozeParts: ['감기 ', '.'],
      choices: [
        { text: '걸렸어요', correct: true },
        { text: '있어요', correct: false },
        { text: '없어요', correct: false },
        { text: '왔어요', correct: false },
      ],
      explain: '감기 + 걸리다(得) 过去式 → 걸렸어요。得病固定搭配。不用 있어요 ❌',
    },
    {
      id: 'd13-l2-c2',
      audioKo: '열이 나요.',
      clozeParts: ['열이 ', '.'],
      choices: [
        { text: '나요', correct: true },
        { text: '아파요', correct: false },
        { text: '있어요', correct: false },
        { text: '없어요', correct: false },
      ],
      explain: '열(发烧) + 이 + 나다(出) → 나요。症状"出现"用 나다。不用 아파요 ❌',
    },
    {
      id: 'd13-l2-c3',
      audioKo: '머리가 아파요.',
      clozeParts: ['머리가 ', '.'],
      choices: [
        { text: '아파요', correct: true },
        { text: '나요', correct: false },
        { text: '걸렸어요', correct: false },
        { text: '있어요', correct: false },
      ],
      explain: '身体部位痛用 아프다。머리(头) + 가 + 아파요',
    },
    {
      id: 'd13-l2-c4',
      audioKo: '기침이 심해요.',
      clozeParts: ['기침이 ', '.'],
      choices: [
        { text: '심해요', correct: true },
        { text: '많아요', correct: false },
        { text: '커요', correct: false },
        { text: '길어요', correct: false },
      ],
      explain: '심하다(严重) → 심해요。症状严重程度用 심하다。「기침이 심해요」= 咳嗽严重',
    },
  ],

  // ─── 听对话选回应 ───
  reply: [
    {
      id: 'd13-l2-r1',
      audioKo: '어디가 불편하세요?',
      promptZh: '白鹭姐姐问"哪里不舒服？"你感冒了想描述症状，应该？',
      choices: [
        { text: '감기 걸렸어요. 콧물이 나요.', correct: true },
        { text: '아니요, 괜찮아요.', correct: false },
        { text: '얼마예요?', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '描述病情黄金公式：病名 + 걸렸어요 + 症状 + 이/가 + 나요',
    },
    {
      id: 'd13-l2-r2',
      audioKo: '기침도 하세요?',
      promptZh: '白鹭姐姐追问"也咳嗽吗？"你有点咳，应该？',
      choices: [
        { text: '네, 좀 해요.', correct: true },
        { text: '아니요, 없어요.', correct: false },
        { text: '기침이 아파요.', correct: false },
        { text: '모릅니다, 죄송해요.', correct: false },
      ],
      explain: '네(是的) + 좀(有点·委婉副词) + 해요(做)。「기침을 하다」= 咳嗽，回答用 해요',
    },
    {
      id: 'd13-l2-r3',
      audioKo: '식후에 드세요. 따뜻한 물 많이 마셔요.',
      promptZh: '白鹭姐姐嘱咐完，你想道谢+确认自己听懂了，最礼貌的一句应该？',
      choices: [
        { text: '네, 알겠습니다. 감사합니다.', correct: true },
        { text: '얼마예요?', correct: false },
        { text: '아니요, 괜찮아요.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '네, 알겠습니다（明白了·합쇼체）+ 감사합니다。药店/医院对专业人员用最高敬语',
    },
  ],
};
