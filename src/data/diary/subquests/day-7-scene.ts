import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 7 · 1-4 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖地铁迷路 + 求助 + Haru 救场 + 반말切换
 */
export const day7Scene: SceneSubQuestData = {
  day: 7, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在雨夜地铁站独立求助 + 分辨敬语层级', subtitleEn: 'Asking for help independently at a subway station on a rainy night + distinguishing speech levels.',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd07-sc-s1',
      scenario: '兽尔地铁站台，手机只剩 1%，你彻底迷路了。看到一位阿姨走过来，最有效的求助方式是？', scenarioEn: 'Seoul subway platform, phone at 1%, you\'re completely lost. You see an ajumma walking over. What\'s the most effective way to ask for help?',
      choices: [
        { ko: '저기요, 도와주세요. 길을 잃었어요.', zh: '请问，帮帮我。我迷路了。', zhEn: 'Excuse me, please help me. I\'m lost.', correct: true },
        { ko: '안녕하세요. 저는 학생이에요.', zh: '你好，我是学生。', zhEn: 'Hello, I am a student.', correct: false },
        { ko: '아니요, 괜찮아요.', zh: '不用了，没关系。', zhEn: 'No need, it\'s fine.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '求助三段：저기요（叫住）+ 도와주세요（请求）+ 길을 잃었어요（说明情况）。留学生保命公式', explainEn: 'Three-step request: 저기요 (get attention) + 도와주세요 (ask for help) + 길을 잃었어요 (explain situation). Survival formula for international students.',
    },
    {
      type: 'situation',
      id: 'd07-sc-s2',
      scenario: 'Haru 突然出现，用반말问「토리, 괜찮아?」你既感动又想哭，也想用반말回她（朋友之间），应该？', scenarioEn: 'Haru suddenly appears and asks in 반말, "토리, 괜찮아?" You\'re touched and want to cry, and you also want to reply in 반말 (between friends). What should you do?',
      choices: [
        { ko: '아니요, 괜찮아요. 감사합니다.', zh: '不用了，谢谢。（太客气）', zhEn: 'No, thank you. (Too formal)', correct: false },
        { ko: '고마워. 나 좀 무서웠어.', zh: '谢了。我有点害怕了。（对朋友说真心话）', zhEn: 'Thanks. I was a bit scared. (Being honest with a friend)', correct: true },
        { ko: '저는 중국 사람이에요.', zh: '我是中国人。', zhEn: 'I am Chinese.', correct: false },
        { ko: '괜찮아요, 저기요.', zh: '没关系，请问。', zhEn: 'It\'s okay, go ahead.', correct: false },
      ],
      explain: 'Haru 用반말，Tori 也用반말对称回应：고마워 + 나 좀 무서웠어（我有点害怕）。用해요体反而生分', explainEn: 'Haru uses 반말, Tori responds in 반말 to match: 고마워 + 나 좀 무서웠어 (I was a bit scared). Using 해요체 would feel distant.',
    },
    {
      type: 'situation',
      id: 'd07-sc-s3',
      scenario: '雨越下越大，你没伞。Haru 有一把伞，说要一起走。你想接受她的好意，应该？', scenarioEn: 'The rain is getting heavier, and you have no umbrella. Haru has one and offers to walk together. You want to accept her kindness. What should you do?',
      choices: [
        { ko: '아니요, 저는 안 가요.', zh: '不，我不去。', zhEn: 'No, I won\'t go.', correct: false },
        { ko: '응, 같이 가자!', zh: '嗯，一起走吧！（반말）', zhEn: 'Okay, let\'s go! (반말)', correct: true },
        { ko: '괜찮아요, 저는 우산 있어요.', zh: '没关系，我有伞。（不实话）', zhEn: 'It\'s fine, I have an umbrella. (not telling the truth)', correct: false },
        { ko: '죄송해요, 몰라요.', zh: '对不起，不知道。', zhEn: 'Sorry, I don\'t know.', correct: false },
      ],
      explain: '朋友间接受邀请用반말：응（嗯）+ 같이 가자（一起走吧·반말청유形）。「같이 가요」是해요体版', explainEn: 'When accepting an invitation between friends, use 반말: 응 (yeah) + 같이 가자 (let\'s go together·반말 propositive form). 「같이 가요」 is the 해요体 version.',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd07-sc-d1',
      lines: [
        { speaker: '아저씨', ko: '우산 있어요?', zh: '有伞吗？', zhEn: 'Do you have an umbrella?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '아니요, 없어요.', zh: '不，没有。', zhEn: 'No, there isn\'t.', correct: true },
        { ko: '아니요, 안 좋아요.', zh: '不，不好。', zhEn: 'No, not good.', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。', zhEn: 'It\'s okay, thank you.', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
      ],
      explain: '是非疑问 있어요? 对应 네, 있어요 / 아니요, 없어요。这是 Day 10 있어요/없어요 语法的先修', explainEn: 'Yes/no question 있어요? corresponds to 네, 있어요 / 아니요, 없어요. This is a prerequisite for the Day 10 있어요/없어요 grammar.',
    },
    {
      type: 'dialogue',
      id: 'd07-sc-d2',
      lines: [
        { speaker: 'Haru', ko: '여기. 토리, 괜찮아?', zh: '给你。兔莉，没事吧？', zhEn: 'Here you go. Tori, are you okay?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '아니요, 저는 괜찮아요.', zh: '不，我没事。（对朋友太生分）', zhEn: 'No, I\'m fine. (too formal for a friend)', correct: false },
        { ko: '고마워, 하루야. 정말 무서웠어.', zh: '谢了，Haru。真的很害怕。', zhEn: 'Thanks, Haru. I was really scared.', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。', zhEn: 'Nice to meet you.', correct: false },
        { ko: '저는 학생이에요.', zh: '我是学生。', zhEn: 'I am a student.', correct: false },
      ],
      explain: 'Haru 반말 → Tori 也用반말：고마워 + 名字+야（呼语）+ 무서웠어（怕过·반말过去式）', explainEn: 'Haru uses 반말 → Tori also uses 반말: 고마워 + name+야 (vocative) + 무서웠어 (was scared·반말 past tense)',
    },
    {
      type: 'dialogue',
      id: 'd07-sc-d3',
      lines: [
        { speaker: 'Haru', ko: '우연히. 같이 가자.', zh: '偶然路过。一起走吧。', zhEn: 'Just happened to pass by. Let\'s go together.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '응, 같이 가자!', zh: '嗯，一起走吧！', zhEn: 'Okay, let\'s go!', correct: true },
        { ko: '아니요, 안 가요.', zh: '不，我不去。', zhEn: 'No, I won\'t go.', correct: false },
        { ko: '죄송해요, 몰라요.', zh: '对不起，不知道。', zhEn: 'Sorry, I don\'t know.', correct: false },
        { ko: '괜찮아요, 저는 우산 있어요.', zh: '没关系，我有伞。', zhEn: 'It\'s fine, I have an umbrella.', correct: false },
      ],
      explain: 'Haru 用반말 청유형 가자，Tori 对称回应 응（好/OK·반말）+ 가자。「응」在这里是"好啊"的意思，不只是嗯', explainEn: 'Haru uses the 반말 propositive form 가자, and Tori responds symmetrically with 응 (okay/OK·반말) + 가자. Here, 「응」 means "sure," not just "mm."',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd07-sc-c1',
      ko: '도와주세요! 길을 잃었어요.',
      promptZh: '这句话最合适的使用场景是？', promptZhEn: 'What\'s the most appropriate situation for this phrase?',
      choices: [
        { zh: '在陌生城市迷路，向路人求助', zhEn: 'Lost in an unfamiliar city, asking a passerby for help', correct: true },
        { zh: '朋友问你在哪，你在回答', zhEn: 'A friend asks where you are, and you\'re answering', correct: false },
        { zh: '进商店时打招呼', zhEn: 'Greeting when entering a store', correct: false },
        { zh: '收到礼物时道谢', zhEn: 'Thanking someone when you receive a gift', correct: false },
      ],
      explain: '도와주세요（请帮帮我）+ 길을 잃었어요（迷路了）= 迷路求助黄金公式', explainEn: '도와주세요 (please help me) + 길을 잃었어요 (I\'m lost) = the golden formula for asking for help when lost',
    },
    {
      type: 'context',
      id: 'd07-sc-c2',
      ko: '고마워, 하루야.',
      promptZh: '关于「고마워」的用法，哪个描述最准确？', promptZhEn: 'Which description of the usage of 「고마워」 is most accurate?',
      choices: [
        { zh: '반말（对朋友/同龄人的"谢了"），日常亲近场合用', zhEn: '반말 ("thanks" to friends/peers), used in casual, close settings', correct: true },
        { zh: '最正式的敬语，对长辈用', zhEn: 'The most formal honorific, used for elders', correct: false },
        { zh: '道歉用语，跟 미안해 一样', zhEn: 'An apology expression, same as 미안해', correct: false },
        { zh: '过去式，表示"曾经谢过"', zhEn: 'Past tense, meaning "thanked before"', correct: false },
      ],
      explain: '道谢阶梯：합쇼체 감사합니다（最正式）> 해요体 고마워요/감사해요（日常）> 반말 고마워（朋友间）', explainEn: 'The gratitude ladder: 합쇼체 감사합니다 (most formal) > 해요体 고마워요/감사해요 (everyday) > 반말 고마워 (between friends)',
    },
  ],
};
