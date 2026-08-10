import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 10 · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖学校食堂点单 · 卖完转购 · 餐后道谢
 */
export const day10Scene: SceneSubQuestData = {
  day: 10, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在学校식당完成第一顿正式午餐',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd10-sc-s1',
      scenario: '轮到你了。袋鼠阿姨抬头问「오늘 뭐 드릴까요?」(今天给您什么？) 你想点泡菜汤，但不确定有没有——最有礼貌的问法？',
      choices: [
        { ko: '김치찌개 있어요?', zh: '有泡菜汤吗？', correct: true },
        { ko: '김치찌개 얼마예요?', zh: '泡菜汤多少钱？（学校식당通常刷卡不问价）', correct: false },
        { ko: '김치찌개 주세요.', zh: '请给我泡菜汤。（如果没有就翻车）', correct: false },
        { ko: '김치찌개 뭐예요?', zh: '泡菜汤是什么？（明显不合逻辑）', correct: false },
      ],
      explain: '先确认有没有再点单——问「있어요?」是韩国餐厅点单的礼貌顺序',
    },
    {
      type: 'situation',
      id: 'd10-sc-s2',
      scenario: '阿姨说「오늘 없어요. 된장찌개 있어요.」(今天没有。有大酱汤。) 你不知道 된장 是什么但愿意尝试，应该？',
      choices: [
        { ko: '그럼 된장찌개 주세요.', zh: '那请给我大酱汤。', correct: true },
        { ko: '아니요, 안 먹을게요.', zh: '不，不吃了。（放弃午餐？）', correct: false },
        { ko: '김치찌개 있어요?', zh: '有泡菜汤吗？（阿姨已经说了没有）', correct: false },
        { ko: '얼마예요? 얼마예요?', zh: '多少钱？多少钱？（重复且不对题）', correct: false },
      ],
      explain: '그럼 = 那(顺承·接受对方建议)。「그럼 ~ 주세요」是餐厅万能替换句',
    },
    {
      type: 'situation',
      id: 'd10-sc-s3',
      scenario: '你把餐盘还回去，想跟阿姨表示"我吃好了"（比一般"谢谢"更贴合韩国餐桌礼仪）。最合适的一句？',
      choices: [
        { ko: '잘 먹었습니다.', zh: '我吃好了 / 谢谢款待。', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（早付过了）', correct: false },
        { ko: '없어요.', zh: '没有。（不对题）', correct: false },
      ],
      explain: '「잘 먹었습니다」直译"我吃得很好"——韩国餐后必说的仪式感表达。跟餐前 「잘 먹겠습니다」一对',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd10-sc-d1',
      lines: [
        { speaker: '袋鼠 아줌마', ko: '오늘 뭐 드릴까요?', zh: '今天给您什么？' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '김치찌개 있어요?', zh: '有泡菜汤吗？', correct: true },
        { ko: '괜찮아요.', zh: '没关系。（放弃点单？）', correct: false },
        { ko: '몰라요.', zh: '不知道。（对阿姨太不礼貌）', correct: false },
        { ko: '없어요.', zh: '没有。（不对题）', correct: false },
      ],
      explain: '阿姨问"要什么"你反问"有xx吗"——礼貌又实用的点单法',
    },
    {
      type: 'dialogue',
      id: 'd10-sc-d2',
      lines: [
        { speaker: '袋鼠 아줌마', ko: '오늘 없어요. 된장찌개 있어요.', zh: '今天没有。有大酱汤。' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '그럼 된장찌개 주세요.', zh: '那请给我大酱汤。', correct: true },
        { ko: '김치찌개 있어요?', zh: '有泡菜汤吗？（阿姨刚说了没有）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', correct: false },
      ],
      explain: '「그럼 + 替代品 + 주세요」是餐厅万能句：既接受对方建议，又完成点单',
    },
    {
      type: 'dialogue',
      id: 'd10-sc-d3',
      lines: [
        { speaker: 'Junho', ko: '토리야, 밥 먹었어?', zh: '兔莉，吃饭了吗？' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '응, 방금 먹었어. 된장찌개.', zh: '嗯，刚吃了。大酱汤。（반말·对朋友）', correct: true },
        { ko: '아니요, 안 먹었어요.', zh: '不，没吃。（해요体，对朋友生分）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
      ],
      explain: '朋友之间用반말：응(嗯·반말"是") + 방금(刚) + 먹었어(吃过了·반말过去式)。「밥 먹었어?」是韩国招呼语',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd10-sc-c1',
      ko: '잘 먹겠습니다.',
      promptZh: '这句话最合适的使用场景是？',
      choices: [
        { zh: '开始吃饭前（餐前礼貌语）', correct: true },
        { zh: '结账时', correct: false },
        { zh: '初次见面自我介绍', correct: false },
        { zh: '道别时', correct: false },
      ],
      explain: '「잘 먹겠습니다」直译"我会好好吃的"——餐前对做饭/请客的人表达尊重。餐后是 「잘 먹었습니다」',
    },
    {
      type: 'context',
      id: 'd10-sc-c2',
      ko: '선생님 계세요?',
      promptZh: '关于「선생님 계세요?」的用法，哪个描述最准确？',
      choices: [
        { zh: '「계세요」是「있어요」的敬语，专用于人（老师/长辈/客户）', correct: true },
        { zh: '「계세요」和「있어요」意思完全相同，随便用', correct: false },
        { zh: '「계세요」只用于问物品在不在', correct: false },
        { zh: '「계세요」是「가세요」的错写', correct: false },
      ],
      explain: '있다 → 계시다（敬语形）→ 계세요。对老师说 「선생님 있어요?」失礼——用 「선생님 계세요?」才礼貌',
    },
  ],
};
