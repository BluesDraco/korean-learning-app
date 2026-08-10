import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 13 · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖 Haru 陪去 약국 · 描述症状 · 药师嘱咐
 */
export const day13Scene: SceneSubQuestData = {
  day: 13, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在 약국用韩语完整描述感冒症状', subtitleEn: 'Describe cold symptoms fully in Korean at the pharmacy',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd13-sc-s1',
      scenario: '你推门进入약국，白鹭姐姐抬头问「어디가 불편하세요?」（哪里不舒服？）你想说"感冒了，流鼻涕"，最标准的一句？', scenarioEn: 'You enter the pharmacy, Sister Egret asks "어디가 불편하세요?" You want to say "I have a cold and a runny nose." What\'s the most standard response?',
      choices: [
        { ko: '감기 걸렸어요. 콧물이 나요.', zh: '感冒了。流鼻涕。', zhEn: 'I have a cold. I have a runny nose.', correct: true },
        { ko: '감기 있어요. 콧물 아파요.', zh: '有感冒。鼻涕痛。（三动词混用错）', zhEn: 'I have a cold. My nose hurts. (Mixing three verbs incorrectly)', correct: false },
        { ko: '아니요, 괜찮아요.', zh: '不，没关系。（放弃描述症状？）', zhEn: 'No, it\'s fine. (Giving up on describing symptoms?)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', zhEn: 'How much? (Off-topic.)', correct: false },
      ],
      explain: '感冒 + 걸렸어요（得病·过去式）+ 鼻涕 + 이/가 + 나요（症状出现）。三动词各司其职', explainEn: 'Cold + 걸렸어요 (getting sick·past tense) + runny nose + 이/가 + 나요 (symptom appears). Each of the three verbs has its own role.',
    },
    {
      type: 'situation',
      id: 'd13-sc-s2',
      scenario: '白鹭姐姐追问「기침도 하세요?」（也咳嗽吗？）你确实咳但只有一点点，应该？', scenarioEn: 'Sister Egret asks, "기침도 하세요?" (Do you cough too?) You do cough, but just a little. What should you say?',
      choices: [
        { ko: '네, 좀 해요.', zh: '是的，有点。', zhEn: 'Yes, a little.', correct: true },
        { ko: '아니요, 기침 없어요.', zh: '不，没有咳嗽。（虚假回答）', zhEn: 'No, I don\'t cough. (False answer)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', zhEn: 'How much? (Off-topic.)', correct: false },
        { ko: '기침이 아파요.', zh: '咳嗽痛。（症状 + 아프다 错）', zhEn: 'My cough hurts. (Symptom + 아프다 error)', correct: false },
      ],
      explain: '네(是的) + 좀(有点·委婉) + 해요(做)。「기침을 하다」= 咳嗽 → 回答用 해요', explainEn: '네 (yes) + 좀 (a little·softening) + 해요 (do). "기침을 하다" = to cough → answer with 해요.',
    },
    {
      type: 'situation',
      id: 'd13-sc-s3',
      scenario: '白鹭姐姐拿了三盒药，嘱咐「식후에 드세요. 따뜻한 물 많이 마셔요.」（饭后服用，多喝热水。）你想道谢+确认自己听懂，应该？', scenarioEn: 'Sister Egret hands you three boxes of medicine and says, "식후에 드세요. 따뜻한 물 많이 마셔요." (Take after meals. Drink lots of warm water.) You want to thank her and confirm you understood. What should you say?',
      choices: [
        { ko: '네, 알겠습니다. 감사합니다.', zh: '是的，明白了。谢谢。', zhEn: 'Yes, I understand. Thank you.', correct: true },
        { ko: '얼마예요?', zh: '多少钱？（已经付过了）', zhEn: 'How much is it? (Already paid)', correct: false },
        { ko: '아니요, 괜찮아요.', zh: '不，没关系。（不对题）', zhEn: 'No, it\'s fine. (Off-topic)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
      ],
      explain: '네, 알겠습니다（明白了·합쇼체）+ 감사합니다。对专业人员（药师/医生）用最高敬语', explainEn: '네, 알겠습니다 (understood·합쇼체) + 감사합니다. Use the highest honorific with professionals (pharmacist/doctor).',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd13-sc-d1',
      lines: [
        { speaker: 'Haru', ko: '토리, 너 얼굴이 너무 안 좋아. 어디 아파?', zh: '兔莉，你脸色太差了。哪里不舒服？', zhEn: 'Tori, you look terrible. Where does it hurt?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '응, 감기 걸렸어. 목이 아파.', zh: '嗯，感冒了。嗓子痛。（반말对朋友）', zhEn: 'Yeah, I caught a cold. My throat hurts. (반말 to a friend)', correct: true },
        { ko: '아니요, 저는 괜찮아요.', zh: '不，我没事。（해요体对朋友生分，且否认真实）', zhEn: 'No, I\'m fine. (해요 style is too formal for a friend, and denies the truth)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（不对题）', zhEn: 'Nice to meet you. (Off-topic)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', zhEn: 'How much? (Off-topic.)', correct: false },
      ],
      explain: '반말对반말：응(嗯) + 감기 걸렸어(반말过去式) + 목이 아파(반말现在时)', explainEn: '반말 to 반말: 응 (yeah) + 감기 걸렸어 (반말 past tense) + 목이 아파 (반말 present tense)',
    },
    {
      type: 'dialogue',
      id: 'd13-sc-d2',
      lines: [
        { speaker: '白鹭 药剂师', speakerEn: 'Egret the Pharmacist', ko: '어디가 불편하세요?', zh: '哪里不舒服？', zhEn: 'Where does it hurt?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '감기 걸렸어요. 콧물이 나요.', zh: '感冒了。流鼻涕。', zhEn: 'I have a cold. I have a runny nose.', correct: true },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。（对药师问诊放弃描述）', zhEn: 'It\'s fine, thanks. (Giving up on describing symptoms to the pharmacist)', correct: false },
        { ko: '얼마예요? 처방전 있어요.', zh: '多少钱？有处方。（未描述症状就问价）', zhEn: 'How much? I have a prescription. (Asking price without describing symptoms)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
      ],
      explain: '药店问诊必答"病名 + 걸렸어요 + 症状 + 이/가 + 나요"公式', explainEn: 'At the pharmacy, always answer with the formula: "illness + 걸렸어요 + symptom + 이/가 + 나요"',
    },
    {
      type: 'dialogue',
      id: 'd13-sc-d3',
      lines: [
        { speaker: '白鹭 药剂师', speakerEn: 'Egret the Pharmacist', ko: '감기약, 콧물약, 기침약. 식후에 드세요.', zh: '感冒药、鼻涕药、咳嗽药。请饭后服用。', zhEn: 'Cold medicine, runny nose medicine, cough medicine. Please take after meals.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '네, 알겠습니다. 감사합니다.', zh: '是的，明白了。谢谢。', zhEn: 'Yes, I understand. Thank you.', correct: true },
        { ko: '얼마예요? 얼마예요?', zh: '多少钱？多少钱？（重复且不礼貌）', zhEn: 'How much? How much? (Repeated and rude)', correct: false },
        { ko: '아니요, 괜찮아요.', zh: '不，没关系。（拒绝对方好意？）', zhEn: 'No, it\'s fine. (Rejecting their kindness?)', correct: false },
        { ko: '감기 걸렸어요.', zh: '感冒了。（前面已经说过）', zhEn: 'I have a cold. (Already said earlier)', correct: false },
      ],
      explain: '收到嘱咐后 = 네, 알겠습니다 + 감사합니다。对专业人员用합쇼체（最高敬语）', explainEn: 'After receiving instructions = 네, 알겠습니다 + 감사합니다. Use 합쇼체 (highest honorific) with professionals.',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd13-sc-c1',
      ko: '감기 걸렸어요.',
      promptZh: '关于「감기 걸렸어요」，哪个描述最准确？', promptZhEn: 'Which description is most accurate about \'감기 걸렸어요\'?',
      choices: [
        { zh: '感冒用 걸리다（得病）+ 过去式 → 걸렸어요。得病用过去式强调"结果状态"', zhEn: 'For a cold, use 걸리다 (to catch) + past tense → 걸렸어요. Using the past tense for catching an illness emphasizes the \'result state.\'', correct: true },
        { zh: '正确说法应该是 「감기 있어요」', zhEn: 'The correct expression should be \'감기 있어요.\'', correct: false },
        { zh: '正确说法应该是 「감기 아파요」', zhEn: 'The correct expression should be \'감기 아파요.\'', correct: false },
        { zh: '「걸렸어요」是"迟到了"的意思', zhEn: '\'걸렸어요\' means \'was late.\'', correct: false },
      ],
      explain: '感冒/流感/新冠都用 걸리다 + 过去式。跟 「길을 잃었어요」（迷路了）一样，得病用过去时强调"已经~"', explainEn: 'Colds, flu, and COVID all use 걸리다 + past tense. Like \'길을 잃었어요\' (got lost), using the past tense for illnesses emphasizes \'already ~.\'',
    },
    {
      type: 'context',
      id: 'd13-sc-c2',
      ko: '따뜻한 물 많이 마셔요.',
      promptZh: '这句话最合适的使用场景是？', promptZhEn: 'What\'s the most appropriate situation for this phrase?',
      choices: [
        { zh: '感冒时医生/药师/家人的关心嘱咐', zhEn: 'Words of care from a doctor, pharmacist, or family when you have a cold.', correct: true },
        { zh: '餐厅点单', zhEn: 'Ordering at a restaurant.', correct: false },
        { zh: '打招呼', zhEn: 'Greeting', correct: false },
        { zh: '结账后道别', zhEn: 'Saying goodbye after paying the bill.', correct: false },
      ],
      explain: '따뜻한(热的·定语) + 물(水) + 많이 마셔요(多喝)。感冒时的黄金嘱咐——韩国和中国一样信"多喝热水"', explainEn: '따뜻한 (hot, attributive) + 물 (water) + 많이 마셔요 (drink a lot). The golden advice for a cold—Korea, like China, believes in \'drink plenty of hot water.\'',
    },
  ],
};
