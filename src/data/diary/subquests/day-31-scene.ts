import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 31 · 2-4 상황 속으로 · 情景关 · 中级班第一天
 * 3 种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：중급반 첫날 · 새 친구 자기소개 · Junho 悄悄话
 */
export const day31Scene: SceneSubQuestData = {
  day: 1, level: 'intermediate', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '中级班第一天 · 面对新同学的每一句', subtitleEn: 'First day of intermediate class · Every word with new classmates',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd31-sc-s1',
      scenario: 'Junho 拍你肩膀说 "토리도 인사해!"。第一次见 Danielle 自我介绍，最标准的一句？', scenarioEn: 'Junho taps your shoulder and says "토리도 인사해!" It\'s your first time meeting Danielle. What\'s the most standard self-introduction?',
      choices: [
        { ko: '안녕하세요, 저는 토리예요. 만나서 반가워요.', zh: '你好，我是兔莉。很高兴认识你。', zhEn: 'Hello, I\'m Tori. Nice to meet you.', correct: true },
        { ko: '야, 나 토리야.', zh: '嘿，我叫兔莉。（对新朋友太随意）', zhEn: 'Hey, I\'m Tori. (Too casual for a new friend)', correct: false },
        { ko: '다니엘씨, 한국 사람이에요?', zh: 'Danielle，你是韩国人吗？（跳过自我介绍）', zhEn: 'Danielle, are you Korean? (Skipping the self-introduction)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（语境错）', zhEn: 'How much is it? (Wrong context)', correct: false },
      ],
      explain: '第一次见面 → 姓名 + 만나서 반가워요（해요体礼貌介绍）', explainEn: 'First meeting → name + 만나서 반가워요 (polite 해요 style introduction)',
    },
    {
      type: 'situation',
      id: 'd31-sc-s2',
      scenario: '你听到 Danielle 说韩语超级流利，心里很惊讶想夸一句"水平真了不起呢"，最自然的一句？', scenarioEn: 'You hear Danielle speak Korean super fluently and are surprised. You want to compliment, "Your level is amazing." What\'s the most natural response?',
      choices: [
        { ko: '실력이 정말 대단하네요.', zh: '水平真了不起呢。', zhEn: 'Your level is really impressive.', correct: true },
        { ko: '실력이 대단해네요.', zh: '实力真了不起呢。', zhEn: 'Your skills are really amazing.', correct: false },
        { ko: '실력이 대단하다요.', zh: '实力真的很了不起。', zhEn: 'Your skills are truly amazing.', correct: false },
        { ko: '실력이 부러워요.', zh: '实力羡慕。(搭配奇怪)', zhEn: 'Envious of your skills. (Odd collocation)', correct: false },
      ],
      explain: '当下感叹 · V/A 词干 + 네요 = 「~了不起呢」', explainEn: 'Present exclamation · V/A stem + 네요 = "~amazing"',
    },
    {
      type: 'situation',
      id: 'd31-sc-s3',
      scenario: 'Junho 悄悄凑过来说 "와, 발음 진짜 유창하네요"，你想附和又不失礼，最合适的一句？', scenarioEn: 'Junho leans in quietly and says "와, 발음 진짜 유창하네요." You want to agree without being rude. What\'s the most suitable response?',
      choices: [
        { ko: '그러게요. 진짜 부럽네요.', zh: '就是啊。真羡慕呢。', zhEn: 'That\'s right. I\'m really envious.', correct: true },
        { ko: '아니요, 별로예요.', zh: '不是啊，一般般。（当事人在旁边太伤人）', zhEn: 'Not really, just so-so. (Too harsh with the person right there)', correct: false },
        { ko: '싫어요.', zh: '不要。（语境错）', zhEn: 'No. (Wrong context)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？（语境错）', zhEn: 'How much is it? (Wrong context)', correct: false },
      ],
      explain: '附和悄悄话 · 그러게요（就是嘛）+ 부럽네요（现场感受）', explainEn: 'Agreeing with a whisper · 그러게요 (right?) + 부럽네요 (expressing feeling in the moment)',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd31-sc-d1',
      lines: [
        { speaker: '홍학 선생님', ko: '여러분, 오늘부터 중급반이에요. 새 친구를 소개할게요.', zh: '各位，从今天起是中级班。给你们介绍新朋友。', zhEn: 'Everyone, starting today we\'re in the intermediate class. Let me introduce a new friend.' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '네, 잘 부탁드립니다.', zh: '好的，请多关照。', zhEn: 'Okay, please take care of me.', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '싫어요.', zh: '不要。', zhEn: 'No.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（对老师不合适）', zhEn: 'Nice to meet you. (Not appropriate for a teacher)', correct: false },
      ],
      explain: '正式宣布 → 네 + 잘 부탁드립니다（合格응답）', explainEn: 'Formal announcement → 네 + 잘 부탁드립니다 (acceptable response)',
    },
    {
      type: 'dialogue',
      id: 'd31-sc-d2',
      lines: [
        { speaker: '다니엘', ko: '안녕하세요, 다니엘이에요. 잘 부탁드립니다.', zh: '你好，我叫 Danielle。请多关照。', zhEn: 'Hi, I\'m Danielle. Nice to meet you.' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '안녕하세요, 저는 토리예요. 만나서 반가워요.', zh: '你好，我是兔莉。很高兴认识你。', zhEn: 'Hello, I\'m Tori. Nice to meet you.', correct: true },
        { ko: '야, 나 토리야.', zh: '嘿，我叫兔莉。（不合适）', zhEn: 'Hey, I\'m Tori. (Not appropriate)', correct: false },
        { ko: '한국 사람이세요?', zh: '你是韩国人吗？（跳过自我介绍）', zhEn: 'Are you Korean? (Skipping self-introduction)', correct: false },
        { ko: '몰라요.', zh: '不知道。', zhEn: 'I don\'t know.', correct: false },
      ],
      explain: '第一次见面对等回应 · 自我介绍 + 만나서 반가워요', explainEn: 'Equal response on first meeting · self-introduction + 만나서 반가워요',
    },
    {
      type: 'dialogue',
      id: 'd31-sc-d3',
      lines: [
        { speaker: '준호', ko: '와, 다니엘씨 발음 진짜 유창하네요.', zh: '哇，Danielle 发音真流利呢。', zhEn: 'Wow, Danielle\'s pronunciation is really fluent.' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '그러게요. 실력이 정말 대단하네요.', zh: '就是啊。水平真了不起呢。', zhEn: 'I know, right? Her level is amazing.', correct: true },
        { ko: '아직 저는 부족해요.', zh: '我还差得远。（转移话题）', zhEn: 'I\'ve got a long way to go. (Changing the subject)', correct: false },
        { ko: '싫어요.', zh: '不要。', zhEn: 'No.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（语境错）', zhEn: 'Nice to meet you. (Wrong context)', correct: false },
      ],
      explain: '附和感叹 · 그러게요 + 대단하네요 · 用 ~네요 保持"现场感受"', explainEn: 'Agreeing with exclamation · 그러게요 + 대단하네요 · use ~네요 to keep the "on-the-spot feeling"',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd31-sc-c1',
      ko: '유창하네요.',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '第一次听对方说韩语，当场感叹发音流利', zhEn: 'Hearing someone speak Korean for the first time, exclaiming on the spot about their fluent pronunciation', correct: true },
        { zh: '在字典里查到 유창하다 的意思时', zhEn: 'When looking up the meaning of 유창하다 in the dictionary', correct: false },
        { zh: '安慰韩语不好的朋友', zhEn: 'Comforting a friend who isn\'t good at Korean', correct: false },
        { zh: '拒绝对方的邀请', zhEn: 'Declining someone\'s invitation.', correct: false },
      ],
      explain: '~네요 = 当下发现 / 新信息的感叹。适合"第一次听到"这类情境', explainEn: '~네요 = exclamation of a current discovery / new information. Fits situations like "hearing something for the first time"',
    },
    {
      type: 'context',
      id: 'd31-sc-c2',
      ko: '부럽네요.',
      promptZh: '「부럽네요」和「부러워요」的差别，下列哪句最准确？', promptZhEn: 'What\'s the difference between 부럽네요 and 부러워요? Which sentence is most accurate?',
      choices: [
        { zh: '부럽네요 = 当下听到 / 看到后的感叹；부러워요 = 陈述"我羡慕"这件事', zhEn: '부럽네요 = exclamation upon hearing/seeing it now; 부러워요 = stating the fact "I\'m envious"', correct: true },
        { zh: '两者完全一样，可任意互换', zhEn: 'They\'re exactly the same and can be swapped freely', correct: false },
        { zh: '부럽네요 是过去时', zhEn: '부럽네요 is past tense', correct: false },
        { zh: '부러워요 是敬语，更正式', zhEn: '부러워요 is honorific, more formal', correct: false },
      ],
      explain: '~네요 前不发生 ㅂ 不规则 → 부럽네요（现场感叹）；해요体依然按不规则 → 부러워요（陈述）', explainEn: 'No ㅂ irregular before ~네요 → 부럽네요 (on-the-spot exclamation); 해요 form still follows the irregular → 부러워요 (statement)',
    },
  ],
};
