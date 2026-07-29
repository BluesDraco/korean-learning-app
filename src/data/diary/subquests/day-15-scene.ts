import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 15 · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖泡面墙 · Haru 教做菜 · 朋友约饭
 */
export const day15Scene: SceneSubQuestData = {
  day: 15, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在 301 号房下决心，用韩语请朋友教做菜',

  tasks: [
    {
      type: 'situation',
      id: 'd15-sc-s1',
      scenario: 'Haru 盯着你床边的泡面墙看了三秒说「이거 벽이야」（这是墙）。你想承认并下决心不再只吃泡面，最自然的一句？',
      choices: [
        { ko: '응, 라면 그만 먹을래.', zh: '嗯，不再吃泡面了。（반말）', correct: true },
        { ko: '아니야, 이거 안 벽이야.', zh: '不，这不是墙。（否认加否定语法都错）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', correct: false },
      ],
      explain: 'Haru 반말 → Tori 也반말。응(嗯) + 라면 그만 먹을래(不再吃泡面·반말决心)',
    },
    {
      type: 'situation',
      id: 'd15-sc-s2',
      scenario: '你想让 Haru 教你做菜。用**반말**请求朋友帮忙最自然的说法？',
      choices: [
        { ko: '하루야, 요리 가르쳐 줘.', zh: 'Haru，教我做菜吧。', correct: true },
        { ko: '하루씨, 요리 가르쳐 주세요.', zh: 'Haru 女士，请教我做菜。（对朋友太生分）', correct: false },
        { ko: '요리 배우고 있어요.', zh: '正在学做菜。（陈述现状不是请求）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', correct: false },
      ],
      explain: '朋友间用반말请求：名字+야（呼语） + V + 어 줘（请给我做）。「가르쳐 줘」= 教我吧',
    },
    {
      type: 'situation',
      id: 'd15-sc-s3',
      scenario: 'Junho 반말问你「뭐 먹을래?」（你想吃什么？）你已经厌倦泡面，想表达"我要吃有营养的"，最自然的一句？',
      choices: [
        { ko: '몸에 좋은 거 먹을래.', zh: '想吃对身体好的。（반말意愿）', correct: true },
        { ko: '라면 먹을래요.', zh: '想吃泡面。（对朋友해요体生分且违反决心）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', correct: false },
        { ko: '없어요.', zh: '没有。（不对题）', correct: false },
      ],
      explain: '반말对반말：몸에 좋은 거(对身体好的东西·좋다 定语形 좋은 + 것 缩合 거) + 먹을래(반말意愿)',
    },

    {
      type: 'dialogue',
      id: 'd15-sc-d1',
      lines: [
        { speaker: 'Haru', ko: '토리… 이거 다 먹은 거야?', zh: '兔莉……这些都吃了？' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '편의점이 가까워서…', zh: '便利店很近所以……', correct: true },
        { ko: '아니요, 제 것이 아니에요.', zh: '不，不是我的。（撒谎，且해요体对朋友生分）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', correct: false },
      ],
      explain: '편의점이 가까워서(便利店近·因为) + …。「A/V + 아/어서」= 因为~，尾音拖长表懒得解释',
    },
    {
      type: 'dialogue',
      id: 'd15-sc-d2',
      lines: [
        { speaker: 'Haru', ko: '좋아. 다음 주부터.', zh: '好。从下周开始。' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '응, 진짜 고마워!', zh: '嗯，真的谢谢！（반말接受）', correct: true },
        { ko: '아니요, 안 배울래요.', zh: '不，不想学。（矛盾）', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（跟朋友学不收钱）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', correct: false },
      ],
      explain: 'Haru 반말 → Tori 반말。응(嗯) + 진짜(真的) + 고마워(谢谢·반말)',
    },
    {
      type: 'dialogue',
      id: 'd15-sc-d3',
      lines: [
        { speaker: 'Minji', ko: '토리야, 다음 주에 뭐 배울래?', zh: '兔莉，下周想学什么？' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '김치찌개 만들고 싶어.', zh: '想做泡菜汤。（반말愿望）', correct: true },
        { ko: '라면 그만 먹을래요.', zh: '不再吃泡面了。（对上文答非所问）', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', correct: false },
        { ko: '몰라요, 죄송해요.', zh: '不知道，对不起。（跟朋友太生分）', correct: false },
      ],
      explain: 'Minji 반말 → Tori 반말。김치찌개 + 만들다(做) + 고 싶어(想做·반말)',
    },

    {
      type: 'context',
      id: 'd15-sc-c1',
      ko: '요리 배우고 싶어요.',
      promptZh: '这句话最合适的使用场景是？',
      choices: [
        { zh: '想学做菜，向老师/朋友表达愿望时', correct: true },
        { zh: '正在做菜，被人问在干什么时', correct: false },
        { zh: '教别人做菜时', correct: false },
        { zh: '拒绝别人的邀请时', correct: false },
      ],
      explain: '「배우고 싶어요」= 想学（表愿望）。「배우고 있어요」才是"正在学"',
    },
    {
      type: 'context',
      id: 'd15-sc-c2',
      ko: '라면 그만 먹을래요.',
      promptZh: '关于「그만 + V을래요」的用法，哪个描述最准确？',
      choices: [
        { zh: '「그만」= 到此为止；配 을래요 表达"不再做~"的决心', correct: true },
        { zh: '正确说法是 「라면 안 먹을래요」', correct: false },
        { zh: '「그만」是"很多"的意思', correct: false },
        { zh: '「그만」和「이제」意思相反', correct: false },
      ],
      explain: '그만 = 停止/到此为止（副词）。「그만 + V을래요」是韩语表决心的固定搭配。也可说 「이제 그만 ~」加强',
    },
  ],
};
