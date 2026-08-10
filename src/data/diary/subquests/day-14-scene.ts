import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 14 · 1-4 상황 속으로 · 情景关 · Chapter 2 收官
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖 하루카페 独立点单全程 · 口误纠正 · 堂食选择
 */
export const day14Scene: SceneSubQuestData = {
  day: 14, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在 하루카페 独立完成从进门到取餐的全过程',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd14-sc-s1',
      scenario: '你推门进 하루카페，金毛店员说「어서 오세요. 주문 도와드릴게요.」（欢迎光临。我帮您点单。）你想点热拿铁，应该？',
      choices: [
        { ko: '따뜻한 라떼 한 잔 주세요.', zh: '请给我一杯热拿铁。', correct: true },
        { ko: '따뜻한 아이스 라떼 주세요.', zh: '热的冰拿铁。（Day 14 兔莉的翻车句·矛盾）', correct: false },
        { ko: '얼마예요? 뜨거운 라떼 있어요?', zh: '多少钱？有热拿铁吗？（顺序反）', correct: false },
        { ko: '아니요, 없어요.', zh: '不，没有。（不对题）', correct: false },
      ],
      explain: '咖啡馆点单公式：温度形容词(定语) + 饮料 + 数量(한 잔) + 주세요。따뜻한 vs 아이스 是反义词，不能同时用',
    },
    {
      type: 'situation',
      id: 'd14-sc-s2',
      scenario: '你想让糖度是"甜的"（比正常多点糖）。想跟店员说"请做成甜的"，最标准的说法？',
      choices: [
        { ko: '달게 해 주세요.', zh: '请做成甜的。', correct: true },
        { ko: '짜게 해 주세요.', zh: '请做成咸的。（Day 14 兔莉的翻车句）', correct: false },
        { ko: '단 것 주세요.', zh: '请给我甜的东西。（用了名词化，不对场景）', correct: false },
        { ko: '설탕 없어요.', zh: '没有糖。（不对题）', correct: false },
      ],
      explain: '「형용사 + 게 + 해 주세요」= 请做成~的。달게(甜地) 不是 짜게(咸地)。Tori 说反了——你不要犯',
    },
    {
      type: 'situation',
      id: 'd14-sc-s3',
      scenario: '店员问「드시고 가세요, 포장이세요?」（堂食还是外带？）你想坐下来慢慢喝，应该？',
      choices: [
        { ko: '여기서 먹을게요.', zh: '在这里吃（堂食）。', correct: true },
        { ko: '포장이에요. 가져갈게요.', zh: '外带。带走。（想坐下却选外带，语境错）', correct: false },
        { ko: '따뜻한 아이스요.', zh: '热的冰。（刚才纠正过一次）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（早付过了）', correct: false },
      ],
      explain: '堂食最自然的答法：여기서 먹을게요（在这儿吃·意愿形）。也可说 「여기서 마실게요」（在这儿喝）',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd14-sc-d1',
      lines: [
        { speaker: '金毛 店员', ko: '따뜻한 아이스요?', zh: '热的冰吗？（憋笑）' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '아, 아니요! 따뜻한 라떼요!', zh: '啊，不是！热拿铁！', correct: true },
        { ko: '네, 맞아요. 따뜻한 아이스 라떼.', zh: '是，对。热的冰拿铁。（继续错下去）', correct: false },
        { ko: '아니요, 안 살게요.', zh: '不，不买了。（放弃点单？）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', correct: false },
      ],
      explain: '纠正口误开头：아, 아니요! + 正确说法。Tori 今天用了三次——都靠这句救场',
    },
    {
      type: 'dialogue',
      id: 'd14-sc-d2',
      lines: [
        { speaker: '金毛 店员', ko: '드시고 가세요, 포장이세요?', zh: '堂食还是外带？' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '여기서 먹을게요.', zh: '在这里吃。', correct: true },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', correct: false },
        { ko: '아니요, 안 사요.', zh: '不，不买。（跟场景冲突）', correct: false },
        { ko: '따뜻한 라떼요.', zh: '热拿铁。（前面已经点过）', correct: false },
      ],
      explain: '堂食/外带二选一——想坐下来喝 = 여기서 먹을게요',
    },
    {
      type: 'dialogue',
      id: 'd14-sc-d3',
      lines: [
        { speaker: '金毛 店员', ko: '라떼 나왔어요. 맛있게 드세요.', zh: '拿铁好了。请慢用。' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '감사합니다. 잘 먹을게요.', zh: '谢谢。我会好好享用。', correct: true },
        { ko: '얼마예요? 얼마예요?', zh: '多少钱？多少钱？（早付过了）', correct: false },
        { ko: '아니요, 없어요.', zh: '不，没有。（不对题）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', correct: false },
      ],
      explain: '取餐后 = 감사합니다 + 잘 먹을게요（我会好好享用·意愿形礼貌语）。「먹다」在韩语覆盖吃/喝，比 「마실게요」更常用',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd14-sc-c1',
      ko: '따뜻한 라떼 한 잔 주세요.',
      promptZh: '关于这个点单句的结构，哪个描述最准确？',
      choices: [
        { zh: '温度形容词定语(따뜻한) + 饮料(라떼) + 数量(한 잔) + 请给我(주세요)', correct: true },
        { zh: '副词(따뜻한) + 主语(라떼) + 一杯(한 잔) + 动词(주세요)', correct: false },
        { zh: '따뜻한 是名词', correct: false },
        { zh: '한 잔的한是汉字数一', correct: false },
      ],
      explain: '咖啡馆点单标准公式。따뜻한 是形容词定语形（修饰名词 라떼）。한 是固有数 하나 搭量词的变形',
    },
    {
      type: 'context',
      id: 'd14-sc-c2',
      ko: '달게 해 주세요.',
      promptZh: '关于「달게 해 주세요」，哪个描述最准确？',
      choices: [
        { zh: '副词形 달게(甜地) + 하다(做) + 아/어 주세요(请为我做) = 请做成甜的', correct: true },
        { zh: '「달게」是名词，「甜」的意思', correct: false },
        { zh: '正确写法是「단 해 주세요」', correct: false },
        { zh: '正确写法是「달다 해 주세요」', correct: false },
      ],
      explain: '味道定制万能句：형용사 + 게 + 해 주세요。同理 짜게(咸)、맵게(辣)、시게(酸)、쓰게(苦) 都用副词形 게',
    },
  ],
};
