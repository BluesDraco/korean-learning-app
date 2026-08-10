import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 8 · 1-4 상황 속으로 · 情景关
 * 3 种题型：情景应答 3 + 对话填空 3 + 语境判断 2
 * 场景覆盖深夜独处 + 视频妈妈 + 隔墙 Haru 打气
 */
export const day8Scene: SceneSubQuestData = {
  day: 8, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '在 301 号房，用一整句韩语告诉妈妈"我过得很好"', subtitleEn: 'In room 301, tell your mom in a full Korean sentence, \'I\'m doing well.\'',

  tasks: [
    // ─── 情景应答 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd08-sc-s1',
      scenario: '深夜宿舍 301。你打开手机想给妈妈发消息，最想说的一句韩语是？', scenarioEn: 'Late night, dorm room 301. You open your phone to message your mom. What\'s the one Korean sentence you want to say most?',
      choices: [
        { ko: '엄마가 보고 싶어요.', zh: '我想妈妈。', zhEn: 'I miss my mom.', correct: true },
        { ko: '엄마는 학생이에요.', zh: '妈妈是学生。（不对题）', zhEn: 'Mom is a student. (Off-topic)', correct: false },
        { ko: '엄마 있어요?', zh: '妈妈在吗？（问陌生人的语气，不对妈妈说）', zhEn: 'Is mom there? (Tone for strangers, not for mom)', correct: false },
        { ko: '엄마 얼마예요?', zh: '妈妈多少钱？（严重错误）', zhEn: 'How much is mom? (Seriously wrong)', correct: false },
      ],
      explain: '「엄마가 보고 싶어요」= 我想妈妈。보고 싶다 的思念对象用主格 이/가', explainEn: '\'엄마가 보고 싶어요\' = I miss mom. The object of longing for 보고 싶다 takes the subject particle 이/가.',
    },
    {
      type: 'situation',
      id: 'd08-sc-s2',
      scenario: '你哭完擦干眼泪，对着镜子想给自己一句鼓励。最贴合"明天还要继续"的반말自励？', scenarioEn: 'After crying and wiping your tears, you look in the mirror and want to encourage yourself. What\'s the most fitting 반말 self-cheer for \'tomorrow continues\'?',
      choices: [
        { ko: '내일도 화이팅. 괜찮아질 거야.', zh: '明天也加油。会好起来的。', zhEn: 'Fighting tomorrow too. It\'ll get better.', correct: true },
        { ko: '내일 안 해요.', zh: '明天不做了。（放弃自己）', zhEn: 'Not doing it tomorrow. (Giving up on yourself)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（不对题）', zhEn: 'Nice to meet you. (Off-topic)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
      ],
      explain: '반말自励组合：내일도 화이팅（打气）+ 괜찮아질 거야（会好起来的·반말将来）。对自己说반말，是内心的"哥们你可以的"', explainEn: '반말 self-cheer combo: 내일도 화이팅 (cheer up) + 괜찮아질 거야 (it\'ll get better, 반말 future). Saying 반말 to yourself is like an inner \'you got this, buddy.\'',
    },
    {
      type: 'situation',
      id: 'd08-sc-s3',
      scenario: 'Haru 隔着墙敲了敲："토리, 자?"（兔莉，睡了吗？）。你还没睡想告诉她"睡不着"，반말最自然的答法？', scenarioEn: 'Haru knocks on the wall: \'토리, 자?\' (Tori, are you asleep?). You\'re not asleep and want to tell her \'can\'t sleep.\' What\'s the most natural 반말 answer?',
      choices: [
        { ko: '아니, 잠이 안 와.', zh: '没，睡不着。（반말对朋友）', zhEn: 'No, can\'t sleep. (반말 to a friend)', correct: true },
        { ko: '네, 잤어요.', zh: '嗯，睡了。（해요体，且矛盾）', zhEn: 'Yeah, I slept. (해요 form, but contradictory)', correct: false },
        { ko: '괜찮아요, 감사합니다.', zh: '没关系，谢谢。（不对题）', zhEn: 'It\'s okay, thanks. (Off-topic)', correct: false },
        { ko: '몰라요.', zh: '不知道。', zhEn: 'I don\'t know.', correct: false },
      ],
      explain: '반말 应对 반말 问句：아니(没·반말)+ 잠이 안 와(睡不着·반말)。「잠이 오다」= 犯困，否定 안 와', explainEn: 'Respond to a 반말 question with 반말: 아니 (no, 반말) + 잠이 안 와 (can\'t sleep, 반말). 「잠이 오다」 = to feel sleepy, negative form 안 와',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd08-sc-d1',
      lines: [
        { speaker: '엄마', ko: '오늘 어땠어?', zh: '今天怎么样？', zhEn: 'How is today?' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '엄마, 나 잘 지내고 있어.', zh: '妈妈，我过得很好。（반말·对妈妈）', zhEn: 'Mom, I\'m doing well. (반말, to mom)', correct: true },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（对妈妈太生分）', zhEn: 'Nice to meet you. (Too formal for mom)', correct: false },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '저는 중국 사람이에요.', zh: '我是中国人。（不对题）', zhEn: 'I\'m Chinese. (Off-topic)', correct: false },
      ],
      explain: '对妈妈用반말显亲近：잘 지내고 있어（过得很好·반말）。留学生对家人视频的经典开头句', explainEn: 'Using 반말 with mom shows closeness: 잘 지내고 있어 (doing well, 반말). A classic opening for students video-calling family',
    },
    {
      type: 'dialogue',
      id: 'd08-sc-d2',
      lines: [
        { speaker: 'Haru', ko: '오늘 힘들었지? 잘 자.', zh: '今天很累吧？晚安。', zhEn: 'You must be tired today? Good night.' },
        { speaker: '나', ko: '', zh: '' },
      ],
      blankSpeaker: '나',
      choices: [
        { ko: '응, 좀. 잘 자, 하루야.', zh: '嗯，有点。晚安，Haru。', zhEn: 'Yeah, a bit. Good night, Haru.', correct: true },
        { ko: '아니요, 저는 안 힘들어요.', zh: '不，我不累。（对朋友用해요体生分）', zhEn: 'No, I\'m not tired. (Using 해요 form with a friend is distant)', correct: false },
        { ko: '보고 싶어요.', zh: '我想你。（Haru 就在门口，说这个奇怪）', zhEn: 'I miss you. (Haru is right at the door, saying this is weird)', correct: false },
        { ko: '만나서 반가워요.', zh: '很高兴认识你。（初次见面用语）', zhEn: 'Nice to meet you. (First-meeting greeting.)', correct: false },
      ],
      explain: '반말对반말：응（嗯）+ 좀（有点·委婉）+ 잘 자, 하루야（晚安 + 呼语 야）。同龄朋友之间的睡前对话', explainEn: '반말 to 반말: 응 (yeah) + 좀 (a bit, softening) + 잘 자, 하루야 (good night + vocative 야). A bedtime chat between same-age friends',
    },
    {
      type: 'dialogue',
      id: 'd08-sc-d3',
      lines: [
        { speaker: '나', ko: '한국어 너무 어려워요.', zh: '韩语好难。', zhEn: 'Korean is so hard.' },
        { speaker: 'Haru', ko: '', zh: '' },
      ],
      blankSpeaker: 'Haru',
      choices: [
        { ko: '괜찮아. 나도 그랬어.', zh: '没事，我以前也是。（반말鼓励）', zhEn: 'It\'s okay, I used to be too. (반말 encouragement)', correct: true },
        { ko: '얼마예요?', zh: '多少钱？', zhEn: 'How much is it?', correct: false },
        { ko: '아니요, 저는 학생이에요.', zh: '不，我是学生。', zhEn: 'No, I\'m a student.', correct: false },
        { ko: '없어요.', zh: '没有。', zhEn: 'There isn\'t any.', correct: false },
      ],
      explain: 'Haru 반말安慰：괜찮아(没事·반말) + 나도 그랬어(我以前也那样·반말过去式)。"我以前也是"是同伴分享经验的固定句', explainEn: 'Haru\'s 반말 comfort: 괜찮아 (it\'s okay, 반말) + 나도 그랬어 (I was like that too, 반말 past tense). "I used to be too" is a set phrase for sharing experience with a peer',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd08-sc-c1',
      ko: '엄마가 보고 싶어요.',
      promptZh: '这句话最合适的使用场景是？', promptZhEn: 'What\'s the most appropriate situation for this phrase?',
      choices: [
        { zh: '一个人在外地生活，深夜想念妈妈时', zhEn: 'When living alone far from home, missing mom late at night', correct: true },
        { zh: '在便利店买东西问价格时', zhEn: 'When asking the price of something at a convenience store', correct: false },
        { zh: '进商店时向店员打招呼', zhEn: 'Greeting a store clerk when entering a shop', correct: false },
        { zh: '在电梯里对陌生人的寒暄', zhEn: 'Small talk with a stranger in an elevator', correct: false },
      ],
      explain: '「보고 싶어요」= 想念（想见）。留学生、异地恋、离家远的人最常用的一句', explainEn: '「보고 싶어요」 = to miss (want to see). The most common phrase for students abroad, long-distance couples, and those far from home',
    },
    {
      type: 'context',
      id: 'd08-sc-c2',
      ko: '괜찮아질 거예요.',
      promptZh: '关于「괜찮아질 거예요」的用法，哪个描述最准确？', promptZhEn: 'Which description of the usage of 「괜찮아질 거예요」 is most accurate?',
      choices: [
        { zh: '安慰自己或对方"会好起来的"，鼓励+推测将来', zhEn: 'Comforting oneself or the other that "things will get better," encouragement + future speculation', correct: true },
        { zh: '道谢的正式说法', zhEn: 'Formal way to say thanks', correct: false },
        { zh: '拒绝别人的委婉说法', zhEn: 'Polite way to decline someone', correct: false },
        { zh: '过去时"以前是没事的"', zhEn: 'Past tense "it used to be okay"', correct: false },
      ],
      explain: '괜찮다(没事) + 아지다(变得) + ㄹ 거예요(将会·推测)。"会变成没事" = 会好起来。困难时对自己/朋友说的温柔句', explainEn: '괜찮다 (okay) + 아지다 (to become) + ㄹ 거예요 (will, speculation). "Will become okay" = things will get better. A gentle phrase for oneself or a friend in hard times',
    },
  ],
};
