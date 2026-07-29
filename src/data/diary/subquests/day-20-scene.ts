import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 20 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：원룸看房 · 从见房东、听费用、问明细到确认
 */
export const day20Scene: SceneSubQuestData = {
  day: 20, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在空房间里，把每一笔账问清楚',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd20-sc-s1',
      scenario: '海豹房东报完押金和月租，只说了「관리비 5만 따로」但没说包含什么。你想问清楚，最标准的一句？',
      choices: [
        { ko: '관리비에 뭐가 들어 있어요?', zh: '管理费包含什么？', correct: true },
        { ko: '관리비 얼마예요?', zh: '管理费多少？', correct: false },
        { ko: '관리비 없어요?', zh: '没有管理费吗？', correct: false },
        { ko: '월세 깎아 주세요.', zh: '请降月租。', correct: false },
      ],
      explain: '数字已经报完 → 该问明细。「N에 뭐가 들어 있어요?」是今天核心句',
    },
    {
      type: 'situation',
      id: 'd20-sc-s2',
      scenario: '房东说管理费只包含水费和清洁费，你想追问电费和网费是不是另算，最自然的一句？',
      choices: [
        { ko: '전기세랑 인터넷은 따로예요?', zh: '电费和网费另算吗？', correct: true },
        { ko: '전기세가 뭐예요?', zh: '电费是什么？', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '월세 깎아 주세요.', zh: '请降月租。', correct: false },
      ],
      explain: '追问其他项另算与否 → 「N은/는 따로예요?」。电费网费在韩国租房通常都是另算',
    },
    {
      type: 'situation',
      id: 'd20-sc-s3',
      scenario: '房东把合同递过来说「여기 사인해 주세요」，签之前你还有个数字想再核对，最合适的一句？',
      choices: [
        { ko: '잠깐만요, 한번 확인해도 될까요?', zh: '请稍等，能确认一下吗？', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '싫어요.', zh: '不要。', correct: false },
      ],
      explain: '签约前想再核对 → 「잠깐만요」（请稍等）+「확인해도 될까요?」（能确认一下吗）。礼貌争取时间',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd20-sc-d1',
      lines: [
        { speaker: '집주인', ko: '안녕하세요. 토리 학생이죠?', zh: '你好。是兔莉同学吧？' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 안녕하세요. 잘 부탁드려요.', zh: '是的，您好。请多关照。', correct: true },
        { ko: '아니요, 학생 아니에요.', zh: '不，我不是学生。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '집이 어디예요?', zh: '房子在哪？', correct: false },
      ],
      explain: '第一次见房东 → 承认身份 + 打招呼 + 「잘 부탁드려요」。租房关系从这一句开始',
    },
    {
      type: 'dialogue',
      id: 'd20-sc-d2',
      lines: [
        { speaker: '집주인', ko: '보증금 500만, 월세 50만, 관리비 5만 따로예요.', zh: '押金500万，月租50万，管理费5万另算。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '관리비에 뭐가 들어 있어요?', zh: '管理费包含什么？', correct: true },
        { ko: '월세 깎아 주세요.', zh: '请降月租。', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
      ],
      explain: '听完总数 → 立刻问明细。这一问显示你不是"随便签"的租户',
    },
    {
      type: 'dialogue',
      id: 'd20-sc-d3',
      lines: [
        { speaker: '집주인', ko: '수도세랑 청소비만 들어 있어요.', zh: '只包含水费和清洁费。' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '전기세는 따로예요?', zh: '电费另算吗？', correct: true },
        { ko: '수도세가 뭐예요?', zh: '水费是什么？', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', correct: false },
      ],
      explain: '房东说了包含项 → 追问未提及的项目。「N은/는 따로예요?」是配套追问句',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd20-sc-c1',
      ko: '관리비에 뭐가 들어 있어요?',
      promptZh: '这句话最适合在什么情境下说？',
      choices: [
        { zh: '看房时向房东询问管理费明细', correct: true },
        { zh: '在便利店问收银员', correct: false },
        { zh: '医院挂号时问护士', correct: false },
        { zh: '第一次见朋友的父母', correct: false },
      ],
      explain: '「관리비」是租房专用词。这句只在租房场景（对房东/中介）说',
    },
    {
      type: 'context',
      id: 'd20-sc-c2',
      ko: '전기세는 따로예요.',
      promptZh: '这句话最可能是谁说的？',
      choices: [
        { zh: '房东告诉租户：电费不包含在管理费里，需另交', correct: true },
        { zh: '朋友请客说：电费我一个人出', correct: false },
        { zh: '客服说：电费免费', correct: false },
        { zh: '同事说：电费我们平摊', correct: false },
      ],
      explain: '「따로」的租房语境 = "另算/另收"。房东向租户说明费用明细时用',
    },
  ],
};
