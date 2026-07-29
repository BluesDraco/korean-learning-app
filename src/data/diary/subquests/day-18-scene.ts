import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 18 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：수민은행（兽民银行）开户全流程 + ~고 싶어요 实战
 */
export const day18Scene: SceneSubQuestData = {
  day: 18, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在兽民银行完成第一次开户',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd18-sc-s1',
      scenario: '刚踏进兽民银行，乌龟柜员抬头慢慢问「어떻게 오셨어요?（您要办什么？）」你想开存折，应该说？',
      choices: [
        { ko: '통장 만들고 싶어요.', zh: '我想开存折。', correct: true },
        { ko: '통장 있어요?', zh: '有存折吗？', correct: false },
        { ko: '통장 얼마예요?', zh: '存折多少钱？', correct: false },
        { ko: '통장 어디예요?', zh: '存折在哪里？', correct: false },
      ],
      explain: '被问"来办什么" → 说目的：X 만들고 싶어요（想办 X）。这是银行开户第一句必备',
    },
    {
      type: 'situation',
      id: 'd18-sc-s2',
      scenario: '柜员说「외국인등록증이랑 여권 부탁드립니다」，你把两份证件从钱包拿出来递过去，应该说？',
      choices: [
        { ko: '여기 있어요.', zh: '在这里。', correct: true },
        { ko: '뭐예요?', zh: '这是什么？', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '없어요.', zh: '没有。', correct: false },
      ],
      explain: '递东西给对方时的标准句：「여기 있어요」= 在这里/给您。母语者递证件、递笔、递钱都用这句',
    },
    {
      type: 'situation',
      id: 'd18-sc-s3',
      scenario: '密码机屏幕亮起，柜员说「비밀번호 네 자리 입력해 주세요」，你听懂了要输 4 位密码，最礼貌的回应？',
      choices: [
        { ko: '네, 알겠습니다.', zh: '好的，我知道了。', correct: true },
        { ko: '응, 알았어.', zh: '嗯，知道了。', correct: false },
        { ko: '비밀번호가 뭐예요?', zh: '密码是什么？', correct: false },
        { ko: '통장 주세요.', zh: '请给我存折。', correct: false },
      ],
      explain: '银行/公文场合用합쇼체（알겠습니다）最合适。「응, 알았어」是반말（对朋友），此处失礼',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd18-sc-d1',
      lines: [
        { speaker: '거북이 은행원', ko: '어떻게 오셨어요?', zh: '您要办什么？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '통장 만들고 싶어요. 학생이에요.', zh: '我想开存折。我是学生。', correct: true },
        { ko: '통장이 뭐예요?', zh: '存折是什么？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
        { ko: '한국에 가요.', zh: '我要去韩国。', correct: false },
      ],
      explain: '开户第一轮：说清目的（통장 만들고 싶어요）+ 补充身份（학생이에요）。柜员就知道要给哪种账户',
    },
    {
      type: 'dialogue',
      id: 'd18-sc-d2',
      lines: [
        { speaker: '거북이 은행원', ko: '외국인등록증이랑 여권 부탁드립니다.', zh: '请给我登录证和护照。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 여기 있어요.', zh: '好的，在这里。', correct: true },
        { ko: '없어요.', zh: '没有。', correct: false },
        { ko: '학생증도 필요해요?', zh: '也需要学生证吗？', correct: false },
        { ko: '여권이 뭐예요?', zh: '护照是什么？', correct: false },
      ],
      explain: '柜员说「부탁드립니다（拜托您）」= 请给，你把证件递过去说「여기 있어요」是最自然的搭配',
    },
    {
      type: 'dialogue',
      id: 'd18-sc-d3',
      lines: [
        { speaker: '거북이 은행원', ko: '여기에 사인해 주세요.', zh: '请在这里签名。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 알겠습니다.', zh: '好的，我知道了。', correct: true },
        { ko: '사인이 뭐예요?', zh: '签名是什么？', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '收到指令 → 「네, 알겠습니다」（합쇼체）最合适。银行场合用最高级礼貌',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd18-sc-c1',
      ko: '부탁드립니다.',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '在银行/政府等正式场合，请求对方帮忙时（"拜托您"）', correct: true },
        { zh: '朋友生日时祝福', correct: false },
        { zh: '被别人踩到脚，道歉', correct: false },
        { zh: '第一次见面，打招呼', correct: false },
      ],
      explain: '「부탁드립니다」= 부탁하다(拜托) → 드리다(敬语) + 합쇼체。用于银行/公文等最正式场合',
    },
    {
      type: 'context',
      id: 'd18-sc-c2',
      ko: '통장 만들고 싶어요.',
      promptZh: '这句话最可能出现在什么场景？',
      choices: [
        { zh: '在银行柜台，跟柜员说明来办什么', correct: true },
        { zh: '在餐厅点菜', correct: false },
        { zh: '在药店买感冒药', correct: false },
        { zh: '在便利店找收银台', correct: false },
      ],
      explain: '통장(存折) + 만들고 싶어요(想办) — 只在银行开户场景使用',
    },
  ],
};
