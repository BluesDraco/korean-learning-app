import type { SceneSubQuestData } from '@/types/tori-subquest';

/**
 * Day 29 · 1-4 상황 속으로 · 情景关
 * 3种题型：情景选择 3 / 对话填空 3 / 语境判断 2
 * 场景：日记本前 · 用过去时回顾过去 28 天
 */
export const day29Scene: SceneSubQuestData = {
  day: 29, level: 'beginner', idx: 4, kind: 'scene',
  koTitle: '상황 속으로',
  subtitle: '把 28 天写进第一页韩语日记', subtitleEn: 'Write 28 days into the first page of your Korean diary',

  tasks: [
    // ─── 情景选择 ───────────────────────────────────────────
    {
      type: 'situation',
      id: 'd29-sc-s1',
      scenario: '你要开始写日记的第一句 · 今天天气不错但下过雨。最自然的一句？', scenarioEn: 'You\'re starting your diary with the first sentence: \'The weather was nice today, but it rained.\' Which is the most natural?',
      choices: [
        { ko: '오늘은 비가 왔어요.', zh: '今天下雨了。', zhEn: 'It rained today.', correct: true },
        { ko: '오늘은 비가 오아요.', zh: '(错误变位)', zhEn: '(incorrect conjugation)', correct: false },
        { ko: '내일은 비가 왔어요.', zh: '(时间词矛盾)', zhEn: '(Time word contradiction)', correct: false },
        { ko: '오늘은 비 오다.', zh: '(书面终结·非日记体)', zhEn: '(Written ending, not diary style)', correct: false },
      ],
      explain: '오다 → 왔어요 · 日记开头讲天气最自然', explainEn: '오다 → 왔어요 · Starting a diary with weather is most natural',
    },
    {
      type: 'situation',
      id: 'd29-sc-s2',
      scenario: '回顾 28 天前刚下飞机的紧张感 · 用过去时最自然的一句？', scenarioEn: 'Looking back at the nervousness of getting off the plane 28 days ago. Which is the most natural in past tense?',
      choices: [
        { ko: '28일 전 비행기에서 떨었어요.', zh: '28天前在飞机上紧张了。', zhEn: 'I was nervous on the plane 28 days ago.', correct: true },
        { ko: '28일 전 비행기에서 떨어요.', zh: '(现在时错时态)', zhEn: '(Wrong tense: present)', correct: false },
        { ko: '28일 후 비행기에서 떨었어요.', zh: '(时间词矛盾)', zhEn: '(Time word contradiction)', correct: false },
        { ko: '28일 전 비행기에서 떨을 거예요.', zh: '(将来时错)', zhEn: '(Wrong tense: future)', correct: false },
      ],
      explain: '「N일 전」+ 过去时 · 逻辑一致 · 떨다 → 떨었어요', explainEn: '\'N일 전\' + past tense · logically consistent · 떨다 → 떨었어요',
    },
    {
      type: 'situation',
      id: 'd29-sc-s3',
      scenario: '日记最后一句 · 想为自己 28 天的成长做个总结。最有分量的一句？', scenarioEn: 'The last line of your diary, wanting to summarize your 28 days of growth. Which has the most weight?',
      choices: [
        { ko: '저는 용기를 냈어요.', zh: '我鼓起了勇气。', zhEn: 'I gathered my courage.', correct: true },
        { ko: '저는 용기를 내요.', zh: '(现在时错)', zhEn: '(Wrong tense: present)', correct: false },
        { ko: '저는 용기가 없어요.', zh: '(意思相反)', zhEn: '(Opposite meaning)', correct: false },
        { ko: '저는 용기를 낼게요.', zh: '(将来承诺 · 语境错)', zhEn: '(Future promise, wrong context)', correct: false },
      ],
      explain: '「내다 → 냈어요」= 已经鼓起（完成态）· 回顾必用', explainEn: '\'내다 → 냈어요\' = already mustered (completed) · must use for reflection',
    },

    // ─── 对话填空 ───────────────────────────────────────────
    {
      type: 'dialogue',
      id: 'd29-sc-d1',
      lines: [
        { speaker: '엄마 (전화)', ko: '오늘 뭐 했어?', zh: '今天做什么了？', zhEn: 'What did you do today?' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '한국어 일기 썼어요.', zh: '写了韩语日记。', zhEn: 'I wrote a Korean diary.', correct: true },
        { ko: '한국어 일기 써요.', zh: '(现在时错)', zhEn: '(Wrong tense: present)', correct: false },
        { ko: '한국어 일기 쓸게요.', zh: '(将来承诺 · 妈问过去)', zhEn: '(Future promise, mom asked about past)', correct: false },
        { ko: '한국어 일기가 뭐예요?', zh: '(误解问题)', zhEn: '(Misunderstood the question)', correct: false },
      ],
      explain: '妈用过去问 → 答用过去 · 쓰다 → 썼어요（ㅡ 脱落 + 었）', explainEn: 'Mom asks in past → answer in past · 쓰다 → 썼어요 (ㅡ drop + 었)',
    },
    {
      type: 'dialogue',
      id: 'd29-sc-d2',
      lines: [
        { speaker: '민지', ko: '어제 삼겹살 어땠어?', zh: '昨天五花肉怎么样？', zhEn: 'How was the pork belly yesterday?' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '정말 즐거웠어요.', zh: '真的很开心。', zhEn: 'I was really happy.', correct: true },
        { ko: '정말 즐거워요.', zh: '(现在时错)', zhEn: '(Wrong tense: present)', correct: false },
        { ko: '정말 즐거울 거예요.', zh: '(将来时错)', zhEn: '(Wrong tense: future)', correct: false },
        { ko: '즐겁다.', zh: '(书面终结·非对话)', zhEn: '(Written ending, not conversation)', correct: false },
      ],
      explain: '어땠어?（过去问）→ 즐거웠어요（过去答）· ㅂ 不规则', explainEn: '어땠어? (past question) → 즐거웠어요 (past answer) · ㅂ irregular',
    },
    {
      type: 'dialogue',
      id: 'd29-sc-d3',
      lines: [
        { speaker: '준호', ko: '한 달 동안 뭐가 제일 좋았어?', zh: '这一个月最喜欢什么？', zhEn: 'What did you like most this month?' },
      ],
      blankSpeaker: '토리',
      choices: [
        { ko: '너희들 만난 게 제일 좋았어.', zh: '认识你们最好。', zhEn: 'Getting to know you all was the best.', correct: true },
        { ko: '너희들 만나요.', zh: '(现在时错)', zhEn: '(Wrong tense: present)', correct: false },
        { ko: '만나서 반가워요.', zh: '(套话 · 语境错)', zhEn: '(set phrase · wrong context)', correct: false },
        { ko: '싫었어.', zh: '(意思相反)', zhEn: '(Opposite meaning)', correct: false },
      ],
      explain: '过去时问 → 过去时答 · 「만난 게 좋았어」= 认识（那事）好', explainEn: 'Past tense question → past tense answer · 「만난 게 좋았어」= It was good to have met (that)',
    },

    // ─── 语境判断 ───────────────────────────────────────────
    {
      type: 'context',
      id: 'd29-sc-c1',
      ko: '어제 학교에 갔어요.',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '讲述已经发生的事（回忆昨日 / 汇报 / 日记）', zhEn: 'Talking about things that already happened (recalling yesterday / reporting / diary)', correct: true },
        { zh: '安排明天的行程', zhEn: 'Planning tomorrow\'s schedule', correct: false },
        { zh: '正在去学校的路上', zhEn: 'On the way to school', correct: false },
        { zh: '拒绝上学', zhEn: 'Refusing to go to school', correct: false },
      ],
      explain: '어제 + 갔어요 · 时间词 + 过去时 = 讲述过去', explainEn: '어제 + 갔어요 · time word + past tense = talking about the past',
    },
    {
      type: 'context',
      id: 'd29-sc-c2',
      ko: '정말 즐거웠어요.',
      promptZh: '这句话最适合在什么情境下说？', promptZhEn: 'In what situation is this phrase most appropriate?',
      choices: [
        { zh: '刚经历完一件开心的事，回顾感想', zhEn: 'Just finished something fun, reflecting on it', correct: true },
        { zh: '在开心的事进行中', zhEn: 'In the middle of something fun', correct: false },
        { zh: '一件事还没开始', zhEn: 'Something hasn\'t started yet', correct: false },
        { zh: '拒绝参加活动', zhEn: 'Refusing to join an activity', correct: false },
      ],
      explain: '过去时 웠어요 = 已经开心过 · 回顾用', explainEn: 'Past tense 웠어요 = already had fun · for reflecting',
    },
  ],
};
