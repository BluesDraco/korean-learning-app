import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 11 · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖 다이소 货架前指点 · 询价 · 结账追加
 */
export const day11Scene: SceneSubQuestData = {
  day: 11, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在 다이소 用韩语买齐生活套装',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd11-sc-s1',
      scenario: '你在 다이소洗漱区，想问店员"洗发水多少钱"。你手里已经拿着一瓶——最自然的问法？',
      choices: [
        { ko: '이거 얼마예요?', zh: '这个（我手里）多少钱？', correct: true },
        { ko: '저거 얼마예요?', zh: '那个（远处）多少钱？（跟手里的不对应）', correct: false },
        { ko: '얼마예요 이거?', zh: '多少钱这个？（语序不自然）', correct: false },
        { ko: '샴푸 없어요?', zh: '没有洗发水吗？（不对题）', correct: false },
      ],
      explain: '手里的东西 = 我附近 → 이거。이(我) / 그(你) / 저(远) 空间三层的第一层',
    },
    {
      type: 'situation',
      id: 'd11-sc-s2',
      scenario: '羊店员说「저거요? 천 원이에요.」你算了一下，觉得便宜，想一次买三瓶——应该说？',
      choices: [
        { ko: '그럼 세 개 주세요.', zh: '那请给我三个。', correct: true },
        { ko: '그럼 삼 개 주세요.', zh: '那请给我三个。（用了汉字数 삼，错）', correct: false },
        { ko: '그럼 셋 개 주세요.', zh: '那请给我三个。（셋 没变形，错）', correct: false },
        { ko: '아니요, 안 살게요.', zh: '不，不买了。（不对题）', correct: false },
      ],
      explain: '固有数 셋(3) 搭量词变 세 → 세 개。数东西用固有数，不用汉字数(삼)',
    },
    {
      type: 'situation',
      id: 'd11-sc-s3',
      scenario: '结账时你看到收银台旁的胡萝卜钥匙扣，Junho 也说很可爱。你想追加一起买，最自然的说法？',
      choices: [
        { ko: '이것도 주세요.', zh: '这个也请给我。', correct: true },
        { ko: '이거 없어요?', zh: '没有这个吗？（明显有）', correct: false },
        { ko: '저것도 얼마예요?', zh: '那个（远处）也多少钱？（收银台旁不算远）', correct: false },
        { ko: '몰라요, 죄송해요.', zh: '不知道，对不起。（不对题）', correct: false },
      ],
      explain: 'CU/다이소结账追加商品黄金句：이것도 주세요 = 这个也请给我。「도」= 也',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd11-sc-d1',
      lines: [
        { speaker: '나', ko: '저기요, 저거 얼마예요?', zh: '请问，那个（远处）多少钱？' },
        { speaker: '羊 店员', ko: '', zh: '' },
      ],
      blankSpeaker: '羊 店员',
      choices: [
        { ko: '저거요? 천 원이에요.', zh: '那个吗？1000 元。（店员视角错——应该 그거）', correct: false },
        { ko: '그거요? 천 원이에요.', zh: '那个吗？1000 元。（店员视角"你指的那个"）', correct: true },
        { ko: '이거요? 천 원이에요.', zh: '这个吗？1000 元。（店员视角错——不是自己手边）', correct: false },
        { ko: '없어요, 죄송해요.', zh: '没有，对不起。（不对题）', correct: false },
      ],
      explain: '客人 저거 → 店员 그거。空间指代要换视角——韩语三层空间的核心考点',
    },
    {
      type: 'dialogue',
      id: 'd11-sc-d2',
      lines: [
        { speaker: 'Junho', ko: '이거 봐! 당근 키링!', zh: '看！胡萝卜钥匙扣！' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '와, 진짜 귀엽다! 나도 살래.', zh: '哇，好可爱！我也要买。（반말对朋友）', correct: true },
        { ko: '아니요, 안 좋아요.', zh: '不，不好。（用해요体对朋友生分）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（不对题）', correct: false },
        { ko: '얼마예요? 저거요?', zh: '多少钱？那个（远处）吗？（Junho 明显在指近处）', correct: false },
      ],
      explain: '반말回应반말：와(哇·감탄) + 귀엽다(可爱·반말) + 나도 살래(我也要买·반말意愿形)',
    },
    {
      type: 'dialogue',
      id: 'd11-sc-d3',
      lines: [
        { speaker: '羊 店员', ko: '이것도 필요하세요?', zh: '这个也需要吗？' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '네, 이것도 주세요.', zh: '是的，这个也请给我。', correct: true },
        { ko: '아니요, 없어요.', zh: '不，没有。（不对题）', correct: false },
        { ko: '얼마예요? 얼마예요?', zh: '多少钱？多少钱？（重复不对题）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（不对场景）', correct: false },
      ],
      explain: '要就答 네, ~도 주세요。「이것도 주세요」是黄金追加句',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd11-sc-c1',
      ko: '샴푸가 필요해요.',
      promptZh: '关于「필요해요」的助词用法，哪个描述最准确？',
      choices: [
        { zh: '前用主格 이/가（跟 있다/없다 一样是感受类动词）', correct: true },
        { zh: '前用宾格 을/를（跟"买"一样及物动词）', correct: false },
        { zh: '前用位置助词 에', correct: false },
        { zh: '不加任何助词', correct: false },
      ],
      explain: '필요하다 前用**主格 이/가**——韩语把"需要"看作"存在感受"，跟 있다/없다 同类。샴푸 무받침 → 가',
    },
    {
      type: 'context',
      id: 'd11-sc-c2',
      ko: '이 당근 키링 좋아해.',
      promptZh: '关于「이 당근 키링 좋아해」，哪个描述最准确？',
      choices: [
        { zh: '「이 + 名词」是限定词"这~"（이 당근 키링 = 这个胡萝卜钥匙扣）+ 좋아해(喜欢·반말)', correct: true },
        { zh: '「이거 당근 키링」的错写', correct: false },
        { zh: '「이」是感叹词，跟名词无关', correct: false },
        { zh: '「좋아해」是形容词"好"', correct: false },
      ],
      explain: '이 是限定形容词后必接名词：이 사람(这人)/이 책(这书)。이거 = 이 + 것(代词独立用)。좋아하다 是动词"喜欢"',
    },
  ],
};
