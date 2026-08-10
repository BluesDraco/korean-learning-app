import type { ListenSubQuestData } from '@/types/tori-subquest';

/**
 * Day 8 · 1-2 귀 트이기 · 听力子关卡
 * 素材来自 Day 8 主流程宿舍 301 独白 + 想念妈妈
 * 3 段：听句选意 5 → 听句填空 4 → 听对话选回应 3
 *
 * 教学核心：cloze 强化 ~고 싶어요 句型，reply 铺 반말自我鼓励
 */
export const day8Listen: ListenSubQuestData = {
  day: 8, level: 'beginner', idx: 2, kind: 'listen',
  koTitle: '귀 트이기',
  subtitle: '深夜 301 号房里，听清心里那句话', subtitleEn: 'In room 301 late at night, hear the words in your heart clearly',

  // ─── 听句选意：播整句 → 4 中文选项 ───
  meaning: [
    {
      id: 'd08-l2-m1',
      audioKo: '엄마가 보고 싶어요.',
      choices: [
        { text: '我想妈妈。', textEn: 'I miss my mom.', correct: true },
        { text: '我看见妈妈了。', textEn: 'I see Mom.', correct: false },
        { text: '妈妈想我。', textEn: 'Mom misses me.', correct: false },
        { text: '妈妈来了。', textEn: 'Mom is here.', correct: false },
      ],
      explain: '엄마(妈妈) + 가(主格) + 보고 싶어요(想见)。「보고 싶다」= 想见 = 想念——韩语"想念"就是"想见"', explainEn: '엄마 (mom) + 가 (subject) + 보고 싶어요 (want to see). \'보고 싶다\' = want to see = miss—in Korean, \'missing\' is \'wanting to see\'',
    },
    {
      id: 'd08-l2-m2',
      audioKo: '오늘 좀 외로워요.',
      choices: [
        { text: '今天心情好。', textEn: 'I\'m in a good mood today.', correct: false },
        { text: '今天有点孤独。', textEn: 'I feel a bit lonely today.', correct: true },
        { text: '今天很累。', textEn: 'I\'m really tired today.', correct: false },
        { text: '今天下雨。', textEn: 'It\'s raining today.', correct: false },
      ],
      explain: '오늘(今天) + 좀(有点·委婉副词) + 외로워요（孤独·해요体）。외로워요 是 외롭다 的해요体（ㅂ 不规则）', explainEn: '오늘 (today) + 좀 (a bit, softening adverb) + 외로워요 (lonely, 해요 form). 외로워요 is the 해요 form of 외롭다 (ㅂ irregular)',
    },
    {
      id: 'd08-l2-m3',
      audioKo: '한국어 너무 어려워요.',
      choices: [
        { text: '韩语很有趣。', textEn: 'Korean is fun.', correct: false },
        { text: '韩语太难了。', textEn: 'Korean is too hard.', correct: true },
        { text: '韩语很简单。', textEn: 'Korean is easy.', correct: false },
        { text: '韩国人很好。', textEn: 'Korean people are nice.', correct: false },
      ],
      explain: '한국어(韩语) + 너무(太·程度副词) + 어려워요(难·해요体)。어렵다 → 어려워요（ㅂ 不规则）', explainEn: '한국어 (Korean) + 너무 (too, degree adverb) + 어려워요 (hard, 해요 form). 어렵다 → 어려워요 (ㅂ irregular)',
    },
    {
      id: 'd08-l2-m4',
      audioKo: '내일 또 해야지.',
      choices: [
        { text: '明天再见。', textEn: 'See you tomorrow.', correct: false },
        { text: '昨天做过了。', textEn: 'I did it yesterday.', correct: false },
        { text: '明天还要继续做。（반말自励）', textEn: 'I\'ll keep doing it tomorrow. (casual self-encouragement)', correct: true },
        { text: '明天不做了。', textEn: 'I\'m not doing it tomorrow.', correct: false },
      ],
      explain: '내일(明天) + 또(再/又) + 해야지（应该做·반말自我鼓励）。「~해야지」= 得做，对自己下决心时用', explainEn: '내일 (tomorrow) + 또 (again) + 해야지 (should do, casual self-encouragement). \'~해야지\' = gotta do, used when making a resolution to yourself',
    },
    {
      id: 'd08-l2-m5',
      audioKo: '괜찮아질 거예요.',
      choices: [
        { text: '现在没事了。', textEn: 'It\'s okay now.', correct: false },
        { text: '会好起来的。', textEn: 'It\'ll get better.', correct: true },
        { text: '不好也没关系。', textEn: 'It\'s okay to not be okay.', correct: false },
        { text: '一直会好。', textEn: 'It will get better.', correct: false },
      ],
      explain: '괜찮다(没事) + 아지다(变得) + ㄹ 거예요(将会) = 会变没事 = 会好起来。安慰自己的固定句', explainEn: '괜찮다 (to be okay) + 아지다 (to become) + ㄹ 거예요 (will) = will become okay = will get better. A fixed phrase to comfort yourself.',
    },
  ],

  // ─── 听句填空：播完整句 → 挖一词，4 韩文选项 ───
  cloze: [
    {
      id: 'd08-l2-c1',
      audioKo: '엄마가 보고 싶어요.',
      clozeParts: ['엄마가 ', '.'],
      choices: [
        { text: '보고 싶어요', correct: true },
        { text: '만나요', correct: false },
        { text: '보여요', correct: false },
        { text: '있어요', correct: false },
      ],
      explain: '보고 싶어요 = 想见（想念）。「엄마 보고 싶어요」是留学生最常说的一句话', explainEn: '보고 싶어요 = to miss (someone). \'엄마 보고 싶어요\' is the most common phrase among international students.',
    },
    {
      id: 'd08-l2-c2',
      audioKo: '한국어 공부하고 싶어요.',
      clozeParts: ['한국어 ', '.'],
      choices: [
        { text: '공부하고 싶어요', correct: true },
        { text: '공부해요', correct: false },
        { text: '몰라요', correct: false },
        { text: '싫어요', correct: false },
      ],
      explain: '공부하다(学习) + 고 싶어요 = 想学。名词 + 하다 类动词加 고 싶어요 表意愿', explainEn: '공부하다 (to study) + 고 싶어요 = want to study. For nouns + 하다 verbs, add 고 싶어요 to express desire.',
    },
    {
      id: 'd08-l2-c3',
      audioKo: '집에 가고 싶어요.',
      clozeParts: ['', '에 가고 싶어요.'],
      choices: [
        { text: '집', correct: true },
        { text: '학교', correct: false },
        { text: '병원', correct: false },
        { text: '회사', correct: false },
      ],
      explain: '집(家) + 에(方向助词) + 가고 싶어요 = 想回家。想家时的核心句', explainEn: '집 (home) + 에 (direction particle) + 가고 싶어요 = want to go home. The key phrase when you miss home.',
    },
    {
      id: 'd08-l2-c4',
      audioKo: '잠이 안 와요.',
      clozeParts: ['잠이 ', '.'],
      choices: [
        { text: '안 와요', correct: true },
        { text: '와요', correct: false },
        { text: '없어요', correct: false },
        { text: '가요', correct: false },
      ],
      explain: '잠이 오다(犯困·困意来了) 的否定 → 잠이 안 와요 = 睡不着。「안」放动词前', explainEn: '잠이 오다 (to feel sleepy) negative → 잠이 안 와요 = can\'t sleep. \'안\' goes before the verb.',
    },
  ],

  // ─── 听对话选回应：播前一句 → 选正确韩文回应 ───
  reply: [
    {
      id: 'd08-l2-r1',
      audioKo: '토리야, 잘 자.',
      promptZh: 'Haru 关门前用반말说"晚安"。兔莉也想用반말回她，应该？', promptZhEn: 'Haru says \'good night\' in 반말 before closing the door. Tori wants to reply in 반말 too. What should she say?',
      choices: [
        { text: '안녕히 주무세요.', correct: false },
        { text: '잘 자, 하루야.', correct: true },
        { text: '만나서 반가워요.', correct: false },
        { text: '감사합니다.', correct: false },
      ],
      explain: '同龄朋友 → 반말对称回应：잘 자 + 名字+야。「안녕히 주무세요」是对长辈的敬语晚安', explainEn: 'Same-age friends → respond in 반말: 잘 자 + name + 야. \'안녕히 주무세요\' is the polite good night for elders.',
    },
    {
      id: 'd08-l2-r2',
      audioKo: '오늘 힘들었지?',
      promptZh: 'Haru 반말问"今天很累吧？"（体贴问句）。兔莉承认今天确实累，应该？', promptZhEn: 'Haru asks in 반말, \'Tired today, huh?\' (a caring question). Tori admits she is indeed tired. What should she say?',
      choices: [
        { text: '아니요, 안 힘들어요.', correct: false },
        { text: '응, 좀 힘들었어.', correct: true },
        { text: '괜찮아요, 감사합니다.', correct: false },
        { text: '만나서 반가워요.', correct: false },
      ],
      explain: '반말 힘들었지? 对应반말 응(嗯·반말"是的") + 좀 힘들었어。用해요体反而生分', explainEn: 'For 반말 \'힘들었지?\', respond in 반말: 응 (yeah, 반말 \'yes\') + 좀 힘들었어. Using 해요체 would feel distant.',
    },
    {
      id: 'd08-l2-r3',
      audioKo: '내일도 화이팅!',
      promptZh: 'Haru 给兔莉打气"明天也加油！"，兔莉想用반말回应她的鼓励，应该？', promptZhEn: 'Haru cheers Tori up, \'Fighting tomorrow too!\' Tori wants to respond in 반말. What should she say?',
      choices: [
        { text: '응, 내일도 화이팅!', correct: true },
        { text: '아니요, 힘들어요.', correct: false },
        { text: '괜찮아요.', correct: false },
        { text: '보고 싶어요.', correct: false },
      ],
      explain: '반말화이팅 对응 반말화이팅——朋友之间打气的固定回应。「내일도」= 明天也', explainEn: 'Respond to 반말 \'화이팅\' with 반말 \'화이팅\'—the fixed response for cheering between friends. \'내일도\' = tomorrow too.',
    },
  ],
};
