import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 18 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：수민은행（兽民银行）开户全流程 + ~고 싶어요 实战
 */
export const day18Scene: SceneSubQuestData = {
  day: 18, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在兽民银行完成第一次开户', subtitleEn: 'Completed your first account opening at Beast People Bank.',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd18-sc-s1',
      scenario: '刚踏进兽民银行，乌龟柜员抬头慢慢问「어떻게 오셨어요?（您要办什么？）」你想开存折，应该说？', scenarioEn: 'You\'ve just stepped into Beast People Bank, and the turtle teller slowly looks up and asks 「어떻게 오셨어요? (What can I do for you?)」 You want to open a passbook. What should you say?',
      choices: [
        { ko: '통장 만들고 싶어요.', zh: '我想开存折。', zhEn: 'I\'d like to open a bankbook.', correct: true },
        { ko: '통장 있어요?', zh: '有存折吗？', zhEn: 'Do you have a bankbook?', correct: false },
        { ko: '통장 얼마예요?', zh: '存折多少钱？', zhEn: 'How much is a passbook?', correct: false },
        { ko: '통장 어디예요?', zh: '存折在哪里？', zhEn: 'Where is the passbook?', correct: false },
      ],
      explain: '被问"来办什么" → 说目的：X 만들고 싶어요（想办 X）。这是银行开户第一句必备', explainEn: 'When asked "What are you here for?" → state your purpose: X 만들고 싶어요 (I want to get X). This is the essential first phrase for opening an account.',
    },
    {
      type: 'situation',
      id: 'd18-sc-s2',
      scenario: '柜员说「외국인등록증이랑 여권 부탁드립니다」，你把两份证件从钱包拿出来递过去，应该说？', scenarioEn: 'The teller says 「외국인등록증이랑 여권 부탁드립니다」. You take out both IDs from your wallet and hand them over. What should you say?',
      choices: [
        { ko: '여기 있어요.', zh: '在这里。', zhEn: 'Here it is.', correct: true },
        { ko: '뭐예요?', zh: '这是什么？', zhEn: 'What is this?', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '없어요.', zh: '没有。', zhEn: 'There isn\'t any.', correct: false },
      ],
      explain: '递东西给对方时的标准句：「여기 있어요」= 在这里/给您。母语者递证件、递笔、递钱都用这句', explainEn: 'The standard phrase when handing something to someone: 「여기 있어요」= Here it is/Here you go. Native speakers use this when handing over IDs, pens, or money.',
    },
    {
      type: 'situation',
      id: 'd18-sc-s3',
      scenario: '密码机屏幕亮起，柜员说「비밀번호 네 자리 입력해 주세요」，你听懂了要输 4 位密码，最礼貌的回应？', scenarioEn: 'The PIN pad lights up, and the teller says 「비밀번호 네 자리 입력해 주세요」. You understand you need to enter a 4-digit PIN. What\'s the most polite response?',
      choices: [
        { ko: '네, 알겠습니다.', zh: '好的，我知道了。', zhEn: 'Okay, got it.', correct: true },
        { ko: '응, 알았어.', zh: '嗯，知道了。', zhEn: 'Okay, got it.', correct: false },
        { ko: '비밀번호가 뭐예요?', zh: '密码是什么？', zhEn: 'What\'s the PIN?', correct: false },
        { ko: '통장 주세요.', zh: '请给我存折。', zhEn: 'Please give me a passbook.', correct: false },
      ],
      explain: '银行/公文场合用합쇼체（알겠습니다）最合适。「응, 알았어」是반말（对朋友），此处失礼', explainEn: 'Use 합쇼체 (알겠습니다) in bank/official settings. 「응, 알았어」 is 반말 (for friends) and would be rude here.',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd18-sc-d1',
      lines: [
        { speaker: '거북이 은행원', ko: '어떻게 오셨어요?', zh: '您要办什么？', zhEn: 'What would you like to do?' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '통장 만들고 싶어요. 학생이에요.', zh: '我想开存折。我是学生。', zhEn: 'I want to open a passbook. I\'m a student.', correct: true },
        { ko: '통장이 뭐예요?', zh: '存折是什么？', zhEn: 'What is a bankbook?', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        { ko: '한국에 가요.', zh: '我要去韩国。', zhEn: 'I\'m going to Korea.', correct: false },
      ],
      explain: '开户第一轮：说清目的（통장 만들고 싶어요）+ 补充身份（학생이에요）。柜员就知道要给哪种账户', explainEn: 'First round of opening an account: state your purpose (통장 만들고 싶어요) + add your status (학생이에요). The teller will know which account to give you.',
    },
    {
      type: 'dialogue',
      id: 'd18-sc-d2',
      lines: [
        { speaker: '거북이 은행원', ko: '외국인등록증이랑 여권 부탁드립니다.', zh: '请给我登录证和护照。', zhEn: 'Please give me your alien registration card and passport.' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 여기 있어요.', zh: '好的，在这里。', zhEn: 'Okay, here it is.', correct: true },
        { ko: '없어요.', zh: '没有。', zhEn: 'There isn\'t any.', correct: false },
        { ko: '학생증도 필요해요?', zh: '也需要学生证吗？', zhEn: 'Do you also need a student ID?', correct: false },
        { ko: '여권이 뭐예요?', zh: '护照是什么？', zhEn: 'What is a passport?', correct: false },
      ],
      explain: '柜员说「부탁드립니다（拜托您）」= 请给，你把证件递过去说「여기 있어요」是最自然的搭配', explainEn: 'When the teller says \'부탁드립니다\' (please), meaning \'please give it,\' the most natural response is to hand over your ID and say \'여기 있어요.\'',
    },
    {
      type: 'dialogue',
      id: 'd18-sc-d3',
      lines: [
        { speaker: '거북이 은행원', ko: '여기에 사인해 주세요.', zh: '请在这里签名。', zhEn: 'Please sign here.' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 알겠습니다.', zh: '好的，我知道了。', zhEn: 'Okay, got it.', correct: true },
        { ko: '사인이 뭐예요?', zh: '签名是什么？', zhEn: 'What is a signature?', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '收到指令 → 「네, 알겠습니다」（합쇼체）最合适。银行场合用最高级礼貌', explainEn: 'When receiving an instruction, \'네, 알겠습니다\' (합쇼체) is most appropriate. Use the highest level of politeness in banking contexts.',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd18-sc-c1',
      ko: '부탁드립니다.',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '在银行/政府等正式场合，请求对方帮忙时（"拜托您"）', zhEn: 'In formal settings like banks or government offices, when asking someone for a favor (\'please\').', correct: true },
        { zh: '朋友生日时祝福', zhEn: 'Wishing a friend on their birthday.', correct: false },
        { zh: '被别人踩到脚，道歉', zhEn: 'Apologizing when someone steps on your foot.', correct: false },
        { zh: '第一次见面，打招呼', zhEn: 'Greeting someone for the first time.', correct: false },
      ],
      explain: '「부탁드립니다」= 부탁하다(拜托) → 드리다(敬语) + 합쇼체。用于银行/公文等最正式场合', explainEn: '\'부탁드립니다\' = 부탁하다 (to request) → 드리다 (honorific) + 합쇼체. Used in the most formal settings like banks or official documents.',
    },
    {
      type: 'context',
      id: 'd18-sc-c2',
      ko: '통장 만들고 싶어요.',
      promptZh: '这句话最可能出现在什么场景？', promptZhEn: 'In what situation is this sentence most likely used?',
      choices: [
        { zh: '在银行柜台，跟柜员说明来办什么', zhEn: 'At the bank counter, telling the teller what you\'re there to do.', correct: true },
        { zh: '在餐厅点菜', zhEn: 'Ordering food at a restaurant.', correct: false },
        { zh: '在药店买感冒药', zhEn: 'Buying cold medicine at a pharmacy.', correct: false },
        { zh: '在便利店找收银台', zhEn: 'Looking for the cashier at a convenience store.', correct: false },
      ],
      explain: '통장(存折) + 만들고 싶어요(想办) — 只在银行开户场景使用', explainEn: '통장 (bankbook) + 만들고 싶어요 (want to open) — used only when opening a bank account.',
    },
  ],
};
