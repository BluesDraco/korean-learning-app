import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 15 · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖泡面墙 · Haru 教做菜 · 朋友约饭
 */
export const day15Scene: SceneSubQuestData = {
  day: 15, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在 301 号房下决心，用韩语请朋友教做菜', subtitleEn: 'In room 301, make a resolution and ask a friend in Korean to teach you cooking',

  tasks: [
    {
      type: 'situation',
      id: 'd15-sc-s1',
      scenario: 'Haru 盯着你床边的泡面墙看了三秒说「이거 벽이야」（这是墙）。你想承认并下决心不再只吃泡面，最自然的一句？', scenarioEn: 'Haru stares at the ramen wall by your bed for three seconds and says, "igeo byeogiya" (this is a wall). You want to admit it and resolve to stop eating only ramen. What\'s the most natural thing to say?',
      choices: [
        { ko: '응, 라면 그만 먹을래.', zh: '嗯，不再吃泡面了。（반말）', zhEn: 'Yeah, I\'ll stop eating ramen. (casual)', correct: true },
        { ko: '아니야, 이거 안 벽이야.', zh: '不，这不是墙。（否认加否定语法都错）', zhEn: 'No, this isn\'t a wall. (both denial and negative grammar are wrong)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', zhEn: 'How much? (Off-topic.)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
      ],
      explain: 'Haru 반말 → Tori 也반말。응(嗯) + 라면 그만 먹을래(不再吃泡面·반말决心)', explainEn: 'Haru speaks casually → Tori speaks casually too. eung (yeah) + ramyeon geuman meogeullae (I\'ll stop eating ramen, casual resolution)',
    },
    {
      type: 'situation',
      id: 'd15-sc-s2',
      scenario: '你想让 Haru 教你做菜。用**반말**请求朋友帮忙最自然的说法？', scenarioEn: 'You want Haru to teach you cooking. What\'s the most natural way to ask a friend for help using **casual speech**?',
      choices: [
        { ko: '하루야, 요리 가르쳐 줘.', zh: 'Haru，教我做菜吧。', zhEn: 'Haru, teach me to cook.', correct: true },
        { ko: '하루씨, 요리 가르쳐 주세요.', zh: 'Haru 女士，请教我做菜。（对朋友太生分）', zhEn: 'Miss Haru, please teach me to cook. (too formal for a friend)', correct: false },
        { ko: '요리 배우고 있어요.', zh: '正在学做菜。（陈述现状不是请求）', zhEn: 'I\'m learning to cook. (stating a fact, not a request)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
      ],
      explain: '朋友间用반말请求：名字+야（呼语） + V + 어 줘（请给我做）。「가르쳐 줘」= 教我吧', explainEn: 'Casual request between friends: name + ya (vocative) + V + eo jwo (please do for me). "gareuchyeo jwo" = teach me',
    },
    {
      type: 'situation',
      id: 'd15-sc-s3',
      scenario: 'Junho 반말问你「뭐 먹을래?」（你想吃什么？）你已经厌倦泡面，想表达"我要吃有营养的"，最自然的一句？', scenarioEn: 'Junho asks casually, "mwo meogeullae?" (what do you want to eat?) You\'re tired of ramen and want to say "I want to eat something nutritious." What\'s the most natural response?',
      choices: [
        { ko: '몸에 좋은 거 먹을래.', zh: '想吃对身体好的。（반말意愿）', zhEn: 'I want to eat something good for my body. (casual intent)', correct: true },
        { ko: '라면 먹을래요.', zh: '想吃泡面。（对朋友해요体生分且违反决心）', zhEn: 'I want to eat ramen. (using 해요体 with a friend feels distant and breaks the resolution)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', zhEn: 'How much? (Off-topic.)', correct: false },
        { ko: '없어요.', zh: '没有。（不对题）', zhEn: 'No. (Off-topic.)', correct: false },
      ],
      explain: '반말对반말：몸에 좋은 거(对身体好的东西·좋다 定语形 좋은 + 것 缩合 거) + 먹을래(반말意愿)', explainEn: 'Casual to casual: 몸에 좋은 거 (something good for the body; 좋다 attributive form 좋은 + 것 contracted to 거) + 먹을래 (casual intent)',
    },

    {
      type: 'dialogue',
      id: 'd15-sc-d1',
      lines: [
        { speaker: 'Haru', ko: '토리… 이거 다 먹은 거야?', zh: '兔莉……这些都吃了？', zhEn: 'Tori... you ate all of these?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '편의점이 가까워서…', zh: '便利店很近所以……', zhEn: 'The convenience store is so close, so...', correct: true },
        { ko: '아니요, 제 것이 아니에요.', zh: '不，不是我的。（撒谎，且해요体对朋友生分）', zhEn: 'No, it\'s not mine. (lying, and using 해요体 with a friend feels distant)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（不对题）', zhEn: 'How much? (Off-topic.)', correct: false },
      ],
      explain: '편의점이 가까워서(便利店近·因为) + …。「A/V + 아/어서」= 因为~，尾音拖长表懒得解释', explainEn: 'The convenience store is close (because it\'s close) + … 「A/V + 아/어서」 = because~, dragging the ending shows you can\'t be bothered to explain',
    },
    {
      type: 'dialogue',
      id: 'd15-sc-d2',
      lines: [
        { speaker: 'Haru', ko: '좋아. 다음 주부터.', zh: '好。从下周开始。', zhEn: 'Okay. Starting next week.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '응, 진짜 고마워!', zh: '嗯，真的谢谢！（반말接受）', zhEn: 'Yeah, thanks a lot! (casual acceptance)', correct: true },
        { ko: '아니요, 안 배울래요.', zh: '不，不想学。（矛盾）', zhEn: 'No, I don\'t want to learn. (contradictory)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（跟朋友学不收钱）', zhEn: 'How much is it? (learning from a friend is free)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
      ],
      explain: 'Haru 반말 → Tori 반말。응(嗯) + 진짜(真的) + 고마워(谢谢·반말)', explainEn: 'Haru casual → Tori casual. 응 (yeah) + 진짜 (really) + 고마워 (thanks, casual)',
    },
    {
      type: 'dialogue',
      id: 'd15-sc-d3',
      lines: [
        { speaker: 'Minji', ko: '토리야, 다음 주에 뭐 배울래?', zh: '兔莉，下周想学什么？', zhEn: 'Tori, what do you want to learn next week?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '김치찌개 만들고 싶어.', zh: '想做泡菜汤。（반말愿望）', zhEn: 'I want to make kimchi stew. (casual wish)', correct: true },
        { ko: '라면 그만 먹을래요.', zh: '不再吃泡面了。（对上文答非所问）', zhEn: 'I\'m not eating ramen anymore. (doesn\'t answer the previous question)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
        { ko: '몰라요, 죄송해요.', zh: '不知道，对不起。（跟朋友太生分）', zhEn: 'I don\'t know, sorry. (too distant with a friend)', correct: false },
      ],
      explain: 'Minji 반말 → Tori 반말。김치찌개 + 만들다(做) + 고 싶어(想做·반말)', explainEn: 'Minji casual → Tori casual. 김치찌개 + 만들다 (make) + 고 싶어 (want to, casual)',
    },

    {
      type: 'context',
      id: 'd15-sc-c1',
      ko: '요리 배우고 싶어요.',
      promptZh: '这句话最合适的使用场景是？', promptZhEn: 'What\'s the most appropriate situation for this phrase?',
      choices: [
        { zh: '想学做菜，向老师/朋友表达愿望时', zhEn: 'When you want to learn cooking and express your wish to a teacher/friend', correct: true },
        { zh: '正在做菜，被人问在干什么时', zhEn: 'When you\'re cooking and someone asks what you\'re doing', correct: false },
        { zh: '教别人做菜时', zhEn: 'When teaching someone to cook', correct: false },
        { zh: '拒绝别人的邀请时', zhEn: 'When declining someone\'s invitation', correct: false },
      ],
      explain: '「배우고 싶어요」= 想学（表愿望）。「배우고 있어요」才是"正在学"', explainEn: '「배우고 싶어요」 = want to learn (expresses a wish). 「배우고 있어요」 is the one that means "currently learning"',
    },
    {
      type: 'context',
      id: 'd15-sc-c2',
      ko: '라면 그만 먹을래요.',
      promptZh: '关于「그만 + V을래요」的用法，哪个描述最准确？', promptZhEn: 'Regarding the usage of 「그만 + V을래요」, which description is most accurate?',
      choices: [
        { zh: '「그만」= 到此为止；配 을래요 表达"不再做~"的决心', zhEn: '「그만」 = stop here; paired with 을래요 it expresses the resolve to "not do ~ anymore"', correct: true },
        { zh: '正确说法是 「라면 안 먹을래요」', zhEn: 'The correct phrasing is 「라면 안 먹을래요」', correct: false },
        { zh: '「그만」是"很多"的意思', zhEn: '「그만」 means "a lot"', correct: false },
        { zh: '「그만」和「이제」意思相反', zhEn: '「그만」 and 「이제」 have opposite meanings', correct: false },
      ],
      explain: '그만 = 停止/到此为止（副词）。「그만 + V을래요」是韩语表决心的固定搭配。也可说 「이제 그만 ~」加强', explainEn: '그만 = stop/up to here (adverb). 「그만 + V을래요」 is a fixed Korean expression for resolve. You can also say 「이제 그만 ~」 to emphasize',
    },
  ],
};
