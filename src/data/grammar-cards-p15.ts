import type { GrammarCard } from '@/types';

export const grammarCardsP15: GrammarCard[] = [
  // ── 第1课：주체높임법 -(으)시- ──────────────────────────────────────
  {
    id: 'card-p15-l01',
    partNumber: 15,
    lessonNumber: 1,
    title: '주체높임법 -(으)시-',
    whatItDoes: '主体尊敬', whatItDoesEn: 'Subject Honorifics',
    whatItDoesBody: '주체높임 是韩语敬语体系的核心：在动词/形容词词干加 -(으)시-，抬高句子主语（长辈/上司/客户）。有받침 -으시-，无받침 -시-。句尾时态与 -시- 融合：现재 -세요/-십니다，过去 -셨어요/-셨습니다。', whatItDoesBodyEn: '주체높임 is the core of Korean honorifics: add -(으)시- to verb/adjective stems to elevate the sentence subject (elders/superiors/clients). With 받침 → -으시-, without 받침 → -시-. Endings fuse with -시-: present -세요/-십니다, past -셨어요/-셨습니다.',
    structureNote: '动词/形容词词干 + -(으)시- + 语尾｜有받침 -으시- / 无받침 -시-', structureNoteEn: 'Verb/adjective stem + -(으)시- + ending | With 받침 -으시- / without 받침 -시-',
    rulesNote: '现在 -세요/-십니다｜过去 -셨어요/-셨습니다｜将来 -실 거예요｜请求 -(으)세요', rulesNoteEn: 'Present -세요/-십니다 | Past -셨어요/-셨습니다 | Future -실 거예요 | Request -(으)세요',
    structures: [
      {
        ko: '아버지는 지금 신문을 읽으세요.',
        zh: '父亲现在正在看报。', zhEn: 'Father is reading the newspaper right now.',
        tokens: [
          { text: '아버지는', role: 'subject' },
          { text: '지금', role: 'time' },
          { text: '신문을', role: 'object' },
          { text: '읽으세요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 어제 학교에 오셨어요.',
        zh: '老师昨天来学校了。', zhEn: 'The teacher came to school yesterday.',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '어제', role: 'time' },
          { text: '학교에', role: 'place' },
          { text: '오셨어요', role: 'verb' },
        ],
      },
      {
        ko: '할머니는 내일 병원에 가실 거예요.',
        zh: '奶奶明天要去医院。', zhEn: 'Grandma is going to the hospital tomorrow.',
        tokens: [
          { text: '할머니는', role: 'subject' },
          { text: '내일', role: 'time' },
          { text: '병원에', role: 'place' },
          { text: '가실 거예요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有받침词干 → -으시-', textEn: 'Stem with 받침 → -으시-', examples: '읽다 → 읽으시다 → 읽으세요' },
      { type: 'rule', text: '无받침词干 → -시-', textEn: 'Stem without 받침 → -시-', examples: '가다 → 가시다 → 가세요' },
      { type: 'rule', text: '过去时：-(으)시- + -었- → -(으)셨-', textEn: 'Past tense: -(으)시- + -었- → -(으)셨-', examples: '오다 → 오시다 → 오셨어요' },
      { type: 'rule', text: '将来时：-(으)실 거예요', textEn: 'Future tense: -(으)실 거예요', examples: '가다 → 가실 거예요' },
      { type: 'usage', text: '请求 -(으)세요 也是 -시- 的应用', textEn: 'The request form -(으)세요 is also an application of -시-', examples: '앉으세요 / 드세요' },
      { type: 'compare', text: '普通 vs 주체높임', textEn: 'Plain vs Subject Honorific', examples: '(普通) 아버지가 신문을 읽어요 / (높임) 아버지가 신문을 읽으세요', examplesEn: '(Plain) Father reads the newspaper / (Honorific) Father reads the newspaper' },
      { type: 'note', text: '不能对第一人称"我"用 -(으)시-', textEn: 'Cannot use -(으)시- with first person "I"', examples: '误：저는 갔으세요 / 正：저는 갔어요', examplesEn: 'Wrong: 저는 갔으세요 / Correct: 저는 갔어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '아버지는', role: 'subject' },
          { text: '지금', role: 'time' },
          { text: '신문을', role: 'object' },
          { text: '읽으세요', role: 'verb' },
        ],
        zh: '父亲在看报。', zhEn: 'Father is reading the newspaper.',
        swapWords: ['아버지', '어머니', '할아버지', '선생님'],
      },
      {
        wordBlocks: [
          { text: '선생님이', role: 'subject' },
          { text: '어제', role: 'time' },
          { text: '학교에', role: 'place' },
          { text: '오셨어요', role: 'verb' },
        ],
        zh: '老师昨天来学校。', zhEn: 'The teacher came to school yesterday.',
        swapWords: ['오다', '가다', '도착하다', '들어오다'],
      },
      {
        wordBlocks: [
          { text: '할머니는', role: 'subject' },
          { text: '내일', role: 'time' },
          { text: '병원에', role: 'place' },
          { text: '가실 거예요', role: 'verb' },
        ],
        zh: '奶奶明天去医院。', zhEn: 'Grandma is going to the hospital tomorrow.',
        swapWords: ['병원', '시장', '교회', '공원'],
      },
    ],
    scenarios: [
      { icon: '📰', context: '看报', contextEn: 'read the newspaper', ko: '아버지는 신문을 읽으세요.', zh: '父亲在读报。', zhEn: 'Father is reading the newspaper.' },
      { icon: '🏫', context: '到校', contextEn: 'arrive at school', ko: '선생님이 학교에 오셨어요.', zh: '老师到学校了。', zhEn: 'The teacher arrived at school.' },
      { icon: '🏥', context: '就医', contextEn: 'see a doctor', ko: '할머니는 병원에 가실 거예요.', zh: '奶奶要去医院。', zhEn: 'Grandma is going to the hospital.' },
      { icon: '🍚', context: '用餐', contextEn: 'have a meal', ko: '아버지가 밥을 드세요.', zh: '父亲在用餐。', zhEn: 'Father is having a meal.' },
      { icon: '📚', context: '教学', contextEn: 'teach', ko: '교수님이 강의를 하세요.', zh: '教授在讲课。', zhEn: 'The professor is giving a lecture.' },
      { icon: '💤', context: '就寝', contextEn: 'go to bed', ko: '할아버지는 벌써 주무세요.', zh: '爷爷已经就寝了。', zhEn: 'Grandpa has already gone to bed.' },
    ],
    mistakes: [
      { wrong: '아버지가 신문을 읽어요', correct: '아버지가 신문을 읽으세요', note: '对长辈需加 -(으)시-', noteEn: 'Add -(으)시- when speaking about elders' },
      { wrong: '선생님이 어제 왔어요', correct: '선생님이 어제 오셨어요', note: '过去时也要加 -(으)셨-', noteEn: 'Past tense also requires -(으)셨-' },
      { wrong: '저는 갔으세요', correct: '저는 갔어요', note: '不能对"我"自己用 -시-', noteEn: 'Cannot use -시- for "I" (myself)' },
    ],
    quickTable: {
      title: '주체높임 时态变化', titleEn: '주체높임 Tense Changes',
      headers: ['时态', '普通', '높임'],
      rows: [
        ['现在', '가요', '가세요'],
        ['现在', '읽어요', '읽으세요'],
        ['过去', '갔어요', '가셨어요'],
        ['过去', '읽었어요', '읽으셨어요'],
        ['将来', '갈 거예요', '가실 거예요'],
        ['请求', '가요', '가세요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '주체높임 -(으)시- 练习', titleEn: '주체높임 -(으)시- Practice',
      body: '选择正确形式', bodyEn: 'Choose the correct form',
      questions: [
        {
          prompt: '선생님이 어제 학교에 (오다) 어요.',
          options: ['왔어요', '오셨어요', '오세요', '오시었어요'],
          answer: 1,
          explanation: '오다 + -시- + -었어요 → 오셨어요。',
        },
        {
          prompt: '아버지는 신문을 (읽다) 세요.',
          options: ['읽으', '읽어', '읽으시', '읽'],
          answer: 0,
          explanation: '읽다（有받침）→ -으시- → 읽으세요。', explanationEn: '읽다 (with 받침) → -으시- → 읽으세요.',
        },
        {
          prompt: '할머니는 내일 병원에 (가다) 거예요.',
          options: ['갈', '가실', '가시는', '갔을'],
          answer: 1,
          explanation: '将来 -(으)ㄹ 거예요 → 高级 -(으)실 거예요 → 가실 거예요。', explanationEn: 'Future -(으)ㄹ 거예요 → advanced -(으)실 거예요 → 가실 거예요.',
        },
        {
          prompt: '下列句子哪个用错了 -(으)시-？', promptEn: 'Which sentence incorrectly uses -(으)시-?',
          options: [
            '아버지가 신문을 읽으세요.',
            '저는 학교에 가셨어요.',
            '선생님이 강의를 하세요.',
            '할머니는 주무세요.',
          ],
          answer: 1,
          explanation: '不能对"我 저"自己用 -(으)시-；应改为 저는 학교에 갔어요。', explanationEn: 'Cannot use -(으)시- for "I (저)" myself; should be changed to 저는 학교에 갔어요.',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l02', 'card-p15-l04'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">对长辈/上司/客户说话时，动词要"抬高"：加 <b>-(으)시-</b>。<br>有些词有专门的尊敬形（있다→계시다），下一课再学；本课先掌握万能通配公式：<b>词干 + -(으)시-</b>。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>普通 vs 주체높임</b><br>
    ・普通：<br>
    <span style="color:#89756e">아버지가 신문을 읽어요.</span><br>
    ・높임：<br>
    <span style="color:#89756e">아버지가 신문을 읽으세요.</span>
  </div>
</div>`,
    compareLabel: '普通 vs 높임', compareLabelEn: 'Plain vs Honorific',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">주체높임법 -(으)시-</div>
  <div style="font-size:14px;color:#89756e">抬高主语（长辈/上司/客户）</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">时态变化</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      现在 → <b>-(으)세요 / -십니다</b><br>
      过去 → <b>-(으)셨어요 / -(으)셨습니다</b><br>
      将来 → <b>-(으)실 거예요</b><br>
      请求 → <b>-(으)세요</b>
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">저는 갔으세요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">저는 갔어요（不对自己用）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아버지가 신문을 읽어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아버지가 신문을 읽으세요</span></div></div>
  </div>
</div>`,
  },

  // ── 第2课：주체높임 特殊词汇 ──────────────────────────────────────
  {
    id: 'card-p15-l02',
    partNumber: 15,
    lessonNumber: 2,
    title: '주체높임 特殊词汇', titleEn: '주체높임 Special Vocabulary',
    whatItDoes: '特殊尊敬词', whatItDoesEn: 'Special Honorific Words',
    whatItDoesBody: '一些高频动词/形容词的敬语形式不是加 -(으)시-，而是换成另一个词：있다→계시다（在）、먹다/마시다→드시다·잡수시다（用膳）、자다→주무시다（就寝）、죽다→돌아가시다（去世）、말하다→말씀하시다（讲话）、아프다→편찮으시다（欠安）。这些是必背清单。', whatItDoesBodyEn: 'Some high-frequency verbs/adjectives don\'t take -(으)시- but instead change to a different word: 있다→계시다 (to be), 먹다/마시다→드시다·잡수시다 (to eat/drink), 자다→주무시다 (to sleep), 죽다→돌아가시다 (to pass away), 말하다→말씀하시다 (to speak), 아프다→편찮으시다 (to be unwell). These are must-memorize items.',
    structureNote: '不加 -시-，直接换特殊词｜多为身体活动/生命状态相关动词', structureNoteEn: 'No -시- added; use a special word instead | Mostly verbs related to physical actions or life states',
    rulesNote: '있다→계시다/있으시다｜먹다→드시다｜자다→주무시다｜말하다→말씀하시다｜아프다→편찮으시다｜죽다→돌아가시다',
    structures: [
      {
        ko: '할아버지는 지금 방에 계세요.',
        zh: '爷爷现在在房间里。', zhEn: 'Grandfather is in the room now.',
        tokens: [
          { text: '할아버지는', role: 'subject' },
          { text: '지금', role: 'time' },
          { text: '방에', role: 'place' },
          { text: '계세요', role: 'verb' },
        ],
      },
      {
        ko: '어머니께서는 이미 저녁을 드셨어요.',
        zh: '母亲已经用过晚餐了。', zhEn: 'Mother has already had dinner.',
        tokens: [
          { text: '어머니께서는', role: 'subject' },
          { text: '이미', role: 'time' },
          { text: '저녁을', role: 'object' },
          { text: '드셨어요', role: 'verb' },
        ],
      },
      {
        ko: '아버지는 일찍 주무세요.',
        zh: '父亲很早就寝。', zhEn: 'Father went to bed early.',
        tokens: [
          { text: '아버지는', role: 'subject' },
          { text: '일찍', role: 'time' },
          { text: '주무세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '있다 → 계시다（在／人存在）｜있으시다（有／所有）', textEn: '있다 → 계시다 (to be present / for people) | 있으시다 (to have / possession)', examples: '할아버지가 계세요 / 시간이 있으세요?' },
      { type: 'rule', text: '먹다·마시다 → 드시다 / 잡수시다', examples: '어머니가 저녁을 드세요 / 할머니가 잡수세요' },
      { type: 'rule', text: '자다 → 주무시다', examples: '아버지는 일찍 주무세요（爸爸很早就睡。）', examplesEn: '아버지는 일찍 주무세요 (Father sleeps early.)' },
      { type: 'rule', text: '말하다 → 말씀하시다', examples: '선생님께서 말씀하세요（老师在说话。）', examplesEn: '선생님께서 말씀하세요 (The teacher is speaking.)' },
      { type: 'rule', text: '아프다 → 편찮으시다', examples: '어머니께서 편찮으세요（妈妈身体不舒服。）', examplesEn: '어머니께서 편찮으세요 (Mother is not feeling well.)' },
      { type: 'rule', text: '죽다 → 돌아가시다', examples: '할아버지께서 작년에 돌아가셨어요（爷爷去年去世了。）', examplesEn: '할아버지께서 작년에 돌아가셨어요 (Grandfather passed away last year.)' },
      { type: 'usage', text: '有些动词有"人높임（계시다）"和"物높임（있으시다）"两种', textEn: 'Some verbs have two honorific forms: for people (계시다) and for objects (있으시다)', examples: '(人在) 계시다 / (有钱) 돈이 있으시다', examplesEn: '(For a person being present) 계시다 / (having money) 돈이 있으시다' },
      { type: 'note', text: '存在动词区分：人 → 계시다，物 → 있으시다', textEn: 'Existential verbs distinguish: people → 계시다, objects → 있으시다', examples: '아버지가 계세요.（在） / 시간이 있으세요?（有）', examplesEn: '아버지가 계세요. (is present) / 시간이 있으세요? (do you have time?)' },
      { type: 'note', text: '말씀 一词两面：长辈"讲话"用尊敬的 말씀하시다；自己"向长辈说"用谦让的 말씀드리다（客体敬语章详学），别只记一半', textEn: 'The word 말씀 has two sides: when an elder "speaks," use the respectful 말씀하시다; when you "speak to an elder," use the humble 말씀드리다 (detailed in the object honorifics chapter) — don\'t just remember half of it', examples: '선생님께서 말씀하세요（老师在讲话）/ 제가 말씀드릴게요（我来向您说明）', examplesEn: '선생님께서 말씀하세요 (The teacher is speaking) / 제가 말씀드릴게요 (I will explain to you)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '할아버지는', role: 'subject' },
          { text: '방에', role: 'place' },
          { text: '계세요', role: 'verb' },
        ],
        zh: '爷爷在房间。', zhEn: 'Grandfather is in the room.',
        swapWords: ['방', '거실', '서재', '마당'],
      },
      {
        wordBlocks: [
          { text: '어머니께서는', role: 'subject' },
          { text: '저녁을', role: 'object' },
          { text: '드셨어요', role: 'verb' },
        ],
        zh: '母亲用晚餐了。', zhEn: 'Mother had dinner.',
        swapWords: ['저녁', '아침', '점심', '식사'],
      },
      {
        wordBlocks: [
          { text: '아버지는', role: 'subject' },
          { text: '일찍', role: 'time' },
          { text: '주무세요', role: 'verb' },
        ],
        zh: '父亲早就寝。', zhEn: 'Father went to bed early.',
        swapWords: ['일찍', '이미', '벌써', '늘'],
      },
    ],
    scenarios: [
      { icon: '🏠', context: '在家', contextEn: 'at home', ko: '할아버지는 방에 계세요.', zh: '爷爷在房间。', zhEn: 'Grandfather is in the room.' },
      { icon: '🍚', context: '用餐', contextEn: 'have a meal', ko: '어머니께서 저녁을 드세요.', zh: '母亲在用餐。', zhEn: 'Mother is eating.' },
      { icon: '💤', context: '就寝', contextEn: 'go to bed', ko: '아버지는 일찍 주무세요.', zh: '父亲早就寝。', zhEn: 'Father went to bed early.' },
      { icon: '🎤', context: '讲话', contextEn: 'speak', ko: '선생님이 말씀하세요.', zh: '老师在讲话。', zhEn: 'The teacher is speaking.' },
      { icon: '🤒', context: '欠安', contextEn: 'unwell', ko: '어머니가 편찮으세요.', zh: '母亲身体欠安。', zhEn: 'Mother is feeling unwell.' },
      { icon: '🕊️', context: '去世', contextEn: 'passed away', ko: '할아버지가 작년에 돌아가셨어요.', zh: '爷爷去年去世了。', zhEn: 'Grandfather passed away last year.' },
    ],
    mistakes: [
      { wrong: '할아버지가 방에 있으세요', correct: '할아버지가 방에 계세요', note: '"人在"用 계시다，不用 있으시다', noteEn: 'For \'person is (present)\', use 계시다, not 있으시다.' },
      { wrong: '어머니가 밥을 먹으세요', correct: '어머니가 밥을 드세요', note: '"用餐"是 드시다，不是 먹으시다', noteEn: 'For \'eat (honorific)\', use 드시다, not 먹으시다.' },
      { wrong: '아버지가 자세요', correct: '아버지가 주무세요', note: '"就寝"是 주무시다，不是 자시다', noteEn: 'For \'sleep (honorific)\', use 주무시다, not 자시다.' },
      { wrong: '어머니가 아프세요', correct: '어머니가 편찮으세요', note: '对长辈"欠安"用 편찮으시다', noteEn: 'For \'unwell\' regarding elders, use 편찮으시다.' },
      { wrong: '저는 지금 집에 계세요', correct: '저는 지금 집에 있어요', note: '这些特殊敬语词只抬别人，绝不能套在自己身上；说自己"在"用普通的 있어요', noteEn: 'These special honorifics only elevate others; never use them for yourself. Say \'I am (here)\' with the regular 있어요.' },
    ],
    quickTable: {
      title: '주체높임 特殊词汇速查', titleEn: 'Subject Honorific Special Vocabulary Quick Reference',
      headers: ['普通', '높임', '语义'],
      rows: [
        ['있다（人）', '계시다', '（人）在'],
        ['있다（物）', '있으시다', '（物）有'],
        ['먹다/마시다', '드시다 / 잡수시다', '用膳'],
        ['자다', '주무시다', '就寝'],
        ['말하다', '말씀하시다', '讲话'],
        ['아프다', '편찮으시다', '身体欠安'],
        ['죽다', '돌아가시다', '去世'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '주체높임 特殊词汇 练习', titleEn: 'Subject Honorific Special Vocabulary Practice',
      body: '选择正确的敬语', bodyEn: 'Choose the correct honorific.',
      questions: [
        {
          prompt: '할아버지는 지금 방에 (   ).',
          options: ['있어요', '있으세요', '계세요', '있어시요'],
          answer: 2,
          explanation: '"（人）在" → 계시다 → 계세요。있으시다 用于"（物/事）有"。', explanationEn: 'For \'person is (present)\' → 계시다 → 계세요. 있으시다 is used for \'has (object/thing)\'.',
        },
        {
          prompt: '어머니께서는 저녁을 (   ).',
          options: ['먹으세요', '먹어세요', '드셨어요', '잡숫어요'],
          answer: 2,
          explanation: '"用餐" → 드시다 / 잡수시다；过去 → 드셨어요。', explanationEn: 'For \'eat (honorific)\' → 드시다 / 잡수시다; past → 드셨어요.',
        },
        {
          prompt: '"父亲早睡" 最合适的敬语？', promptEn: 'What is the most appropriate honorific for \'Father sleeps early\'?',
          options: ['아버지가 일찍 자세요', '아버지가 일찍 주무세요', '아버지가 일찍 잠으세요', '아버지가 일찍 자시어요'],
          answer: 1,
          explanation: '"就寝"用 주무시다 → 주무세요。', explanationEn: 'For \'sleep (honorific)\', use 주무시다 → 주무세요.',
        },
        {
          prompt: '"人在"的敬语和"物/事有"的敬语分别是？', promptEn: 'What are the honorifics for \'person is (present)\' and \'has (object/thing)\' respectively?',
          options: [
            '계시다 / 계시다',
            '계시다 / 있으시다',
            '있으시다 / 계시다',
            '있으시다 / 있으시다',
          ],
          answer: 1,
          explanation: '人 → 계시다（存在）；物/事 → 있으시다（拥有）。', explanationEn: 'Person → 계시다 (existence); object/thing → 있으시다 (possession).',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l01', 'card-p15-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">高频动词的尊敬形不是加 -(으)시-，而是<b>换词</b>：<br>있다→계시다（在）· 먹다→드시다（用膳）· 자다→주무시다（就寝）· 말하다→말씀하시다· 아프다→편찮으시다· 죽다→돌아가시다。<br>这些是韩语敬语的"必背清单"。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>있다 → 계시다 / 있으시다</b><br>
    ・人存在 → 계시다<br>
    <span style="color:#89756e">할아버지가 방에 계세요.</span><br>
    ・物/事持有 → 있으시다<br>
    <span style="color:#89756e">시간이 있으세요?</span>
  </div>
</div>`,
    compareLabel: '계시다 vs 있으시다',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">주체높임 特殊词汇</div>
  <div style="font-size:14px;color:#89756e">6 大必背换词</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">必背清单</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      있다（人）→ 계시다<br>
      있다（物）→ 있으시다<br>
      먹다/마시다 → 드시다 / 잡수시다<br>
      자다 → 주무시다<br>
      말하다 → 말씀하시다<br>
      아프다 → 편찮으시다<br>
      죽다 → 돌아가시다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">할아버지가 있으세요（人）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">할아버지가 계세요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아버지가 자세요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아버지가 주무세요</span></div></div>
  </div>
</div>`,
  },

  // ── 第3课：객체높임 特殊动词 ──────────────────────────────────────
  {
    id: 'card-p15-l03',
    partNumber: 15,
    lessonNumber: 3,
    title: '객체높임 特殊动词', titleEn: 'Object Honorific Special Verbs',
    whatItDoes: '客体尊敬', whatItDoesEn: 'Object Honorifics',
    whatItDoesBody: '객체높임 抬高动作"接受者"（宾语/间接宾语）。这类动词多是"给/见/问/带"这些涉及"对方"的动词：주다→드리다（给长辈）、보다→뵙다（拜见）、묻다→여쭙다（请教）、데리다→모시다（陪同）。', whatItDoesBodyEn: 'Object honorifics elevate the "recipient" of the action (object/indirect object). These verbs are mostly ones involving the other person, like "give/see/ask/bring": 주다→드리다 (to give to elder), 보다→뵙다 (to meet respectfully), 묻다→여쭙다 (to ask respectfully), 데리다→모시다 (to accompany).',
    structureNote: '换成特殊动词｜受动者用 -께 助词｜多与 주체높임 -시- 一起用', structureNoteEn: 'Change to a special verb | Recipient takes -께 particle | Often used with subject honorific -시-',
    rulesNote: '주다→드리다｜보다/만나다→뵙다·뵈다｜묻다→여쭙다·여쭈다｜데리다→모시다',
    structures: [
      {
        ko: '선생님께 선물을 드렸어요.',
        zh: '给老师送了礼物。', zhEn: 'I gave a gift to the teacher.',
        tokens: [
          { text: '선생님께', role: 'plain' },
          { text: '선물을', role: 'object' },
          { text: '드렸어요', role: 'verb' },
        ],
      },
      {
        ko: '내일 부모님을 뵙기로 했어요.',
        zh: '明天要去拜见父母。', zhEn: 'I will go to visit my parents tomorrow.',
        tokens: [
          { text: '내일', role: 'time' },
          { text: '부모님을', role: 'object' },
          { text: '뵙기로 했어요', role: 'verb' },
        ],
      },
      {
        ko: '교수님께 궁금한 것을 여쭤봤어요.',
        zh: '向教授请教了不懂的地方。', zhEn: 'I asked the professor about what I didn\'t understand.',
        tokens: [
          { text: '교수님께', role: 'plain' },
          { text: '궁금한 것을', role: 'object' },
          { text: '여쭤봤어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '주다 → 드리다（给长辈/上级）', textEn: '주다 → 드리다 (to give to elders/superiors)', examples: '선생님께 선물을 드렸어요.（送了老师礼物。）', examplesEn: '선생님께 선물을 드렸어요. (I gave a gift to the teacher.)' },
      { type: 'rule', text: '보다/만나다 → 뵙다·뵈다（拜见）', textEn: '보다/만나다 → 뵙다·뵈다 (to visit/meet respectfully)', examples: '내일 부모님을 뵙기로 했어요.（明天要去见父母。）', examplesEn: 'I\'ve decided to meet my parents tomorrow.' },
      { type: 'rule', text: '묻다 → 여쭙다·여쭈다（请教）', textEn: 'ask → ask humbly (to elder)', examples: '교수님께 여쭤봤어요.（向教授请教了。）', examplesEn: 'I asked the professor.' },
      { type: 'rule', text: '데리다 → 모시다（陪同长辈）', textEn: 'bring/take → accompany (elder)', examples: '할머니를 병원에 모시고 갔어요.（陪奶奶去了医院。）', examplesEn: 'I accompanied my grandmother to the hospital.' },
      { type: 'usage', text: '客体接受者助词 -에게 → -께', textEn: 'object recipient particle -에게 → -께', examples: '친구에게 → 선생님께' },
      { type: 'compare', text: '주체높임 vs 객체높임', examples: '(주체) 아버지가 오세요.（主语被抬高）/ (객체) 아버지께 선물을 드렸어요.（宾语被抬高）', examplesEn: '(subject) Father comes. / (object) I gave a gift to Father.' },
      { type: 'note', text: '뵙다 是最正式的拜见（初次见面/正式场合）；뵈다 略随和', textEn: '뵙다 is the most formal \'to meet\' (first meeting/formal occasions); 뵈다 is slightly more casual.', examples: '처음 뵙겠습니다.（初次见面）', examplesEn: 'Nice to meet you. (formal first meeting)' },
      { type: 'note', text: '中文没有"抬高接受者"这一层：决定换不换词的是"收东西/被拜见的那个人"尊不尊贵，跟主语无关 —— 就算主语是"我"，只要对象是长辈就得换词', textEn: 'Chinese doesn\'t have this \'honoring the recipient\' layer: what determines whether to switch words is whether the person receiving/being met is respected, not the subject — even if the subject is \'I\', if the object is an elder, you must switch.', examples: '제가 선생님께 드렸어요（主语是我，但因对象是老师，用 드리다）', examplesEn: 'I gave it to the teacher (subject is I, but because the object is a teacher, use 드리다).' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '선생님께', role: 'plain' },
          { text: '선물을', role: 'object' },
          { text: '드렸어요', role: 'verb' },
        ],
        zh: '给老师送礼。', zhEn: 'Give a gift to the teacher.',
        swapWords: ['선물', '꽃', '편지', '음식'],
      },
      {
        wordBlocks: [
          { text: '내일', role: 'time' },
          { text: '부모님을', role: 'object' },
          { text: '뵙기로 했어요', role: 'verb' },
        ],
        zh: '明天拜见父母。', zhEn: 'Meet parents tomorrow.',
        swapWords: ['부모님', '조부모님', '스승님', '어른'],
      },
      {
        wordBlocks: [
          { text: '교수님께', role: 'plain' },
          { text: '궁금한 것을', role: 'object' },
          { text: '여쭤봤어요', role: 'verb' },
        ],
        zh: '向教授请教。', zhEn: 'Ask the professor.',
        swapWords: ['여쭈다', '물어보다', '문의하다', '질문하다'],
      },
    ],
    scenarios: [
      { icon: '🎁', context: '送礼', contextEn: 'give a gift', ko: '선생님께 선물을 드렸어요.', zh: '给老师送礼。', zhEn: 'Give a gift to the teacher.' },
      { icon: '🤝', context: '拜见', contextEn: 'meet (respectfully)', ko: '부모님을 뵙기로 했어요.', zh: '拜见父母。', zhEn: 'Meet parents.' },
      { icon: '❓', context: '请教', contextEn: 'ask (respectfully)', ko: '교수님께 여쭤봤어요.', zh: '向教授请教。', zhEn: 'Ask the professor.' },
      { icon: '🏥', context: '陪同', contextEn: 'accompany', ko: '할머니를 병원에 모시고 갔어요.', zh: '陪奶奶去医院。', zhEn: 'Accompany grandmother to the hospital.' },
      { icon: '💌', context: '致函', contextEn: 'send a letter', ko: '사장님께 이메일을 드렸어요.', zh: '给社长发邮件。', zhEn: 'Send an email to the boss.' },
      { icon: '🕊️', context: '首次拜见', contextEn: 'first meeting', ko: '처음 뵙겠습니다.', zh: '初次见面。', zhEn: 'Nice to meet you.' },
    ],
    mistakes: [
      { wrong: '선생님에게 선물을 주었어요', correct: '선생님께 선물을 드렸어요', note: '给长辈 → 드리다 + 助词 -께', noteEn: 'to elder → 드리다 + particle -께' },
      { wrong: '부모님을 봐요', correct: '부모님을 봬요 / 뵙겠습니다', note: '"拜见"是 뵙다 / 뵈다；뵈다+어요 缩合成 봬요（不是 뵈요）', noteEn: '"To visit (respectfully)" is 뵙다 / 뵈다; 뵈다 + 어요 contracts to 봬요 (not 뵈요).' },
      { wrong: '교수님에게 물어봤어요', correct: '교수님께 여쭤봤어요', note: '"请教"是 여쭙다 / 여쭈다 + 助词 -께', noteEn: '"To ask (respectfully)" is 여쭙다 / 여쭈다 + particle -께.' },
      { wrong: '할머니를 병원에 데려갔어요', correct: '할머니를 병원에 모시고 갔어요', note: '"陪同长辈"用 모시다', noteEn: '"To accompany an elder" uses 모시다.' },
      { wrong: '친구에게 선물을 드렸어요', correct: '친구에게 선물을 줬어요', note: '接受者是平辈朋友时不抬高，用普通的 주다 + -에게；객체높임 只对尊者用', noteEn: 'When the recipient is a peer friend, don\'t elevate; use plain 주다 + -에게; 객체높임 is only for respected people.' },
    ],
    quickTable: {
      title: '객체높임 特殊动词', titleEn: 'Object Honorific Special Verbs',
      headers: ['普通', '높임', '语义'],
      rows: [
        ['주다', '드리다', '给（长辈）'],
        ['보다·만나다', '뵙다·뵈다', '拜见'],
        ['묻다', '여쭙다·여쭈다', '请教'],
        ['데리다', '모시다', '陪同'],
        ['助词 -에게', '-께', '给（受尊者）'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '객체높임 特殊动词 练习', titleEn: 'Object Honorific Special Verbs Practice',
      body: '选择正确形式', bodyEn: 'Choose the correct form',
      questions: [
        {
          prompt: '선생님(   ) 선물을 (   ).',
          options: ['에게 / 주었어요', '께 / 드렸어요', '에 / 드렸어요', '한테 / 주셨어요'],
          answer: 1,
          explanation: '给长辈用 -께 + 드리다 → 선생님께 드렸어요。', explanationEn: 'For elders, use -께 + 드리다 → 선생님께 드렸어요.',
        },
        {
          prompt: '내일 부모님을 (   ).',
          options: ['봐요', '뵙기로 했어요', '보시기로 했어요', '보아 드려요'],
          answer: 1,
          explanation: '"拜见"是 뵙다 → 뵙기로 했어요。', explanationEn: '"To visit (respectfully)" is 뵙다 → 뵙기로 했어요.',
        },
        {
          prompt: '교수님(   ) 궁금한 것을 여쭤봤어요.',
          options: ['에게', '한테', '께', '한테서'],
          answer: 2,
          explanation: '"请教长辈"必须用 -께。', explanationEn: '"To ask an elder" must use -께.',
        },
        {
          prompt: '주체높임 与 객체높임 的核心区别？', promptEn: 'What\'s the core difference between 주체높임 and 객체높임?',
          options: [
            '完全相同',
            '주체높임 抬高主语（-시-）；객체높임 抬高宾语/间接宾语（换词+-께）',
            '주체높임 用于口语，객체높임 用于书面',
            '주체높임 是过去时，객체높임 是现在时',
          ],
          answer: 1,
          explanation: '주체（主语）+ -시-；객체（宾语/间接宾语）+ 特殊换词 + -께。', explanationEn: 'Subject + -시-; object/indirect object + special verb swap + -께.',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l01', 'card-p15-l04'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">주체높임抬高"主语"，객체높임抬高"接受者"。<br>주다→<b>드리다</b>（给长辈）· 보다→<b>뵙다</b>（拜见）· 묻다→<b>여쭙다</b>（请教）· 데리다→<b>모시다</b>（陪同）。<br>受尊敬的接受者助词从 -에게 变成 <b>-께</b>。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>주체 vs 객체</b><br>
    ・주체（主语）→ -(으)시-<br>
    <span style="color:#89756e">아버지가 오세요.</span><br>
    ・객체（受动者）→ 换词 + -께<br>
    <span style="color:#89756e">아버지께 선물을 드렸어요.</span>
  </div>
</div>`,
    compareLabel: '주체 vs 객체',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">객체높임 特殊动词</div>
  <div style="font-size:14px;color:#89756e">抬高接受者</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">必背换词</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      주다 → 드리다（给）<br>
      보다 → 뵙다·뵈다（拜见）<br>
      묻다 → 여쭙다·여쭈다（请教）<br>
      데리다 → 모시다（陪同）<br>
      助词 -에게 → -께
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">선생님에게 주었어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">선생님께 드렸어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">할머니를 데려갔어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">할머니를 모시고 갔어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第4课：높임 조사 -께서 · -께 · -님 ──────────────────────────────────────
  {
    id: 'card-p15-l04',
    partNumber: 15,
    lessonNumber: 4,
    title: '높임 조사 -께서·-께·-님',
    whatItDoes: '尊敬助词', whatItDoesEn: 'Honorific Particles',
    whatItDoesBody: '敬语系统的助词升级：主语的 -이/가 → -께서；给的对象 -에게 → -께；名词加 -님 表尊称。三者配合动词 -시- 或换词，构成完整敬语句。', whatItDoesBodyEn: 'Particle upgrades in the honorific system: subject -이/가 → -께서; recipient -에게 → -께; nouns take -님 for respect. These combine with verb -시- or special words to form complete honorific sentences.',
    structureNote: '主语 -이/가 → -께서｜给 -에게 → -께｜N + -님', structureNoteEn: 'Subject -이/가 → -께서 | To -에게 → -께 | N + -님',
    rulesNote: '-께서 与 -이/가 语法功能同（主语标记）｜-께 与 -에게 同（间接宾语）｜-님 加在人称名词后', rulesNoteEn: '-께서 has the same grammatical function as -이/가 (subject marker) | -께 same as -에게 (indirect object) | -님 attaches to person nouns',
    structures: [
      {
        ko: '선생님께서 학교에 오셨어요.',
        zh: '老师来学校了。', zhEn: 'The teacher came to school.',
        tokens: [
          { text: '선생님께서', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '오셨어요', role: 'verb' },
        ],
      },
      {
        ko: '사장님께 보고서를 드렸어요.',
        zh: '给社长交了报告。', zhEn: 'I submitted the report to the boss.',
        tokens: [
          { text: '사장님께', role: 'plain' },
          { text: '보고서를', role: 'object' },
          { text: '드렸어요', role: 'verb' },
        ],
      },
      {
        ko: '교수님께서는 항상 자상하세요.',
        zh: '教授总是那么细心亲切。', zhEn: 'The professor is always so careful and kind.',
        tokens: [
          { text: '교수님께서는', role: 'subject' },
          { text: '항상', role: 'time' },
          { text: '자상하세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '主语 -이/가 → -께서', textEn: 'Subject -이/가 → -께서', examples: '선생님이 오세요 → 선생님께서 오세요' },
      { type: 'rule', text: '话题 -은/는 → -께서는（可省 -는，只用 -께서）', textEn: 'Topic -은/는 → -께서는 (-는 can be omitted, just -께서)', examples: '교수님께서는 자상하세요（教授很和蔼。）', examplesEn: '교수님께서는 자상하세요 (The professor is very kind.)' },
      { type: 'rule', text: '间接宾语 -에게 → -께', textEn: 'Indirect object -에게 → -께', examples: '친구에게 → 선생님께' },
      { type: 'rule', text: '名词 + -님 表尊称', textEn: 'Noun + -님 for honorific', examples: '선생 → 선생님 / 사장 → 사장님 / 교수 → 교수님' },
      { type: 'usage', text: '-께서 常与 주체높임 -시- 搭配', textEn: '-께서 often pairs with 주체높임 -시-', examples: '선생님께서 오셨어요.（老师来了。）', examplesEn: '선생님께서 오셨어요. (The teacher came.)' },
      { type: 'usage', text: '-께 常与 객체높임 드리다/여쭙다 搭配', textEn: '-께 often pairs with 객체높임 드리다/여쭙다', examples: '선생님께 여쭤봤어요.（向老师请教了。）', examplesEn: '선생님께 여쭤봤어요. (I asked the teacher.)' },
      { type: 'compare', text: '普通 vs 敬语助词', textEn: 'Plain vs honorific particles', examples: '아버지가 오세요 → 아버지께서 오세요（更正式）', examplesEn: '아버지가 오세요 → 아버지께서 오세요 (more formal)' },
      { type: 'note', text: '日常口语中 -께서/-께 可省，用 -이/가/-에게 也可以，但正式场合必须用', textEn: 'In casual speech, -께서/-께 can be dropped; -이/가/-에게 is fine, but formal settings require them.', examples: '(口语) 선생님이 오셨어요 / (正式) 선생님께서 오셨어요', examplesEn: '(Casual) 선생님이 오셨어요 / (Formal) 선생님께서 오셨어요' },
      { type: 'compare', text: '只差一个"서"意思却相反：-께서 是"主语"（=이/가），-께 是"给的对象"（=에게）', textEn: 'Just one "서" changes the meaning completely: -께서 marks the subject (=이/가), while -께 marks the recipient (=에게).', examples: '선생님께서 오셨어요（老师来了，主语）/ 선생님께 드렸어요（给了老师，对象）', examplesEn: '선생님께서 오셨어요 (The teacher came—subject) / 선생님께 드렸어요 (I gave it to the teacher—recipient).' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '선생님께서', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '오셨어요', role: 'verb' },
        ],
        zh: '老师来学校。', zhEn: 'The teacher comes to school.',
        swapWords: ['선생님', '교수님', '사장님', '부장님'],
      },
      {
        wordBlocks: [
          { text: '사장님께', role: 'plain' },
          { text: '보고서를', role: 'object' },
          { text: '드렸어요', role: 'verb' },
        ],
        zh: '交报告给社长。', zhEn: 'Submit the report to the president.',
        swapWords: ['보고서', '문서', '자료', '기획서'],
      },
      {
        wordBlocks: [
          { text: '교수님께서는', role: 'subject' },
          { text: '항상', role: 'time' },
          { text: '자상하세요', role: 'verb' },
        ],
        zh: '教授一贯亲切。', zhEn: 'The professor is consistently kind.',
        swapWords: ['자상하다', '친절하다', '엄격하다', '유머러스하다'],
      },
    ],
    scenarios: [
      { icon: '👨‍🏫', context: '正式到访', contextEn: 'formal visit', ko: '선생님께서 학교에 오셨어요.', zh: '老师来学校。', zhEn: 'The teacher comes to school.' },
      { icon: '📋', context: '汇报', contextEn: 'report', ko: '사장님께 보고서를 드렸어요.', zh: '给社长报告。', zhEn: 'Report to the president.' },
      { icon: '💐', context: '性格描述', contextEn: 'personality description', ko: '교수님께서는 자상하세요.', zh: '教授亲切。', zhEn: 'The professor is kind.' },
      { icon: '🍽️', context: '用餐', contextEn: 'have a meal', ko: '아버님께서 식사를 하세요.', zh: '父亲用餐。', zhEn: 'Father is dining.' },
      { icon: '📧', context: '致函', contextEn: 'send a letter', ko: '팀장님께 이메일을 드렸어요.', zh: '给组长发邮件。', zhEn: 'Send an email to the team leader.' },
      { icon: '👨‍💼', context: '尊称', contextEn: 'honorific', ko: '박 사장님을 뵈러 왔습니다.', zh: '来拜见朴社长。', zhEn: 'I\'ve come to pay respects to President Park.' },
    ],
    mistakes: [
      { wrong: '선생님이 오셨어요', correct: '선생님께서 오셨어요', note: '正式敬语中主语用 -께서（-이/가 只用于口语）', noteEn: 'In formal honorifics, the subject takes -께서 (-이/가 is only used in casual speech).' },
      { wrong: '사장님에게 보고서를 드렸어요', correct: '사장님께 보고서를 드렸어요', note: '给尊者用 -께，不用 -에게', noteEn: 'Use -께 for respected people, not -에게.' },
      { wrong: '선생 오셨어요', correct: '선생님 오셨어요', note: '人称名词需加 -님', noteEn: 'Person nouns require -님.' },
      { wrong: '선생님께 오셨어요', correct: '선생님께서 오셨어요', note: '"老师来了"老师是主语，用 -께서（不是给的对象，别用 -께）', noteEn: '"The teacher came"—the teacher is the subject, so use -께서 (not the recipient, so don\'t use -께).' },
    ],
    quickTable: {
      title: '敬语助词对照', titleEn: 'Honorific Particle Comparison',
      headers: ['普通', '敬语', '用法'],
      rows: [
        ['-이/가', '-께서', '主语'],
        ['-은/는', '-께서는', '话题'],
        ['-에게 / 한테', '-께', '间接宾语'],
        ['N', 'N-님', '尊称'],
        ['이름', '성함', '姓名（尊称）'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '敬语助词 练习', titleEn: 'Honorific Particles Practice',
      body: '选择正确助词', bodyEn: 'Choose the correct particle.',
      questions: [
        {
          prompt: '선생님(   ) 학교에 오셨어요.',
          options: ['이', '가', '께서', '으로'],
          answer: 2,
          explanation: '正式敬语主语用 -께서。', explanationEn: 'Formal honorifics use -께서 for the subject.',
        },
        {
          prompt: '사장님(   ) 보고서를 드렸어요.',
          options: ['에게', '한테', '께', '으로'],
          answer: 2,
          explanation: '给尊者用 -께。', explanationEn: 'Use -께 for respected people.',
        },
        {
          prompt: '"教授总是很亲切" 最合适的敬语？', promptEn: 'What\'s the most appropriate honorific for "The professor is always very kind"?',
          options: [
            '교수는 항상 자상해요',
            '교수님은 항상 자상해요',
            '교수님께서는 항상 자상하세요',
            '교수님이 항상 자상하세요',
          ],
          answer: 2,
          explanation: '正式敬语：-님 + -께서는 + -시-；最完整最尊敬。', explanationEn: 'Formal honorific: -님 + -께서는 + -시-; the most complete and respectful.',
        },
        {
          prompt: '-께서 与 -이/가 的关系？', promptEn: 'What\'s the relationship between -께서 and -이/가?',
          options: [
            '完全不同的助词',
            '-께서 是 -이/가 的敬语版，主语标记',
            '-께서 是宾语标记',
            '-께서 只用于问句',
          ],
          answer: 1,
          explanation: '-께서 是 -이/가 的敬语替换，仍是主语标记。', explanationEn: '-께서 is the honorific replacement for -이/가 and still marks the subject.',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l01', 'card-p15-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">敬语不仅动词升级，助词也要升级：<br>主语 -이/가 → <b>-께서</b> · 给 -에게 → <b>-께</b> · 名词加 <b>-님</b>。<br>三者配合 -(으)시- 或换词，才是完整敬语句。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>普通 vs 敬语助词</b><br>
    ・普通：선생님이 친구에게 책을 주었어요.<br>
    ・敬语：선생님께서 친구에게 책을 주셨어요.<br>
    ・双敬语：선생님께서 학생에게 책을 주셨어요 / 학생이 선생님께 책을 드렸어요
  </div>
</div>`,
    compareLabel: '普通 vs 敬语', compareLabelEn: 'Plain vs Honorific',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">敬语助词 -께서 · -께 · -님</div>
  <div style="font-size:14px;color:#89756e">正式场合必备</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">对照表</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -이/가 → <b>-께서</b>（主语）<br>
      -은/는 → <b>-께서는</b>（话题）<br>
      -에게 → <b>-께</b>（间接宾语）<br>
      N → <b>N-님</b>（尊称）<br>
      이름 → <b>성함</b>（姓名尊称）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">사장님에게 드렸어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">사장님께 드렸어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">선생 오셨어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">선생님 오셨어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第5课：청자높임 语体切换 -습니다/-어요/-어 ──────────────────────────────────────
  {
    id: 'card-p15-l05',
    partNumber: 15,
    lessonNumber: 5,
    title: '청자높임 语体切换', titleEn: 'Listener Honorific Speech Level Switching',
    whatItDoes: '听者尊敬', whatItDoesEn: 'Listener Honorifics',
    whatItDoesBody: '청자높임 靠句尾语体表达对"听者"的尊敬程度，是韩语敬语的第三个维度。四大语体：하십시오체（最正式，-습니다）、해요체（正式亲切，-어요）、해체（半语，-어）、해라체（书面/命令）。选错语体就选错关系。', whatItDoesBodyEn: 'Listener honorifics express respect toward the "listener" through sentence endings — the third dimension of Korean honorifics. Four speech levels: 하십시오체 (most formal, -습니다), 해요체 (formal-friendly, -어요), 해체 (banmal, -어), 해라체 (written/imperative). Choosing the wrong level means choosing the wrong relationship.',
    structureNote: '句尾语体 → 하십시오체 / 해요체 / 해체 / 해라체｜按听者身份切换', structureNoteEn: 'Sentence endings → 하십시오체 / 해요체 / 해체 / 해라체 | Switch based on listener\'s status',
    rulesNote: '하십시오체（-습니다/-십니다） · 해요체（-어요/-으세요） · 해체（-어/-야 · 半语） · 해라체（-는다/-어라）', rulesNoteEn: '하십시오체 (-습니다/-십니다) · 해요체 (-어요/-으세요) · 해체 (-어/-야 · banmal) · 해라체 (-는다/-어라)',
    structures: [
      {
        ko: '안녕하십니까? 저는 김민수입니다.',
        zh: '您好，我是金民秀。（최正式）', zhEn: 'Hello, I\'m Kim Min-su. (Most formal)',
        tokens: [
          { text: '안녕하십니까?', role: 'verb' },
          { text: '저는', role: 'subject' },
          { text: '김민수입니다', role: 'verb' },
        ],
      },
      {
        ko: '안녕하세요? 저는 민수예요.',
        zh: '你好，我是民秀。（正式亲切）', zhEn: 'Hello, I\'m Min-su. (Formal and friendly)',
        tokens: [
          { text: '안녕하세요?', role: 'verb' },
          { text: '저는', role: 'subject' },
          { text: '민수예요', role: 'verb' },
        ],
      },
      {
        ko: '안녕? 나는 민수야.',
        zh: '嗨，我是民秀。（半语）', zhEn: 'Hi, I\'m Min-su. (Casual)',
        tokens: [
          { text: '안녕?', role: 'verb' },
          { text: '나는', role: 'subject' },
          { text: '민수야', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '하십시오체（최正式）→ -습니다 / -십니다 / -십니까?', textEn: 'Hasipsio-che (Most formal) → -seumnida / -simnida / -simnikka?', examples: '갑니다 / 가십니다 / 가십니까?' },
      { type: 'rule', text: '해요체（正式亲切）→ -어요 / -으세요', textEn: 'Haeyo-che (Formal and friendly) → -eoyo / -euseyo', examples: '가요 / 가세요' },
      { type: 'rule', text: '해체（半语）→ -어 / -야', textEn: 'Hae-che (Casual) → -eo / -ya', examples: '가 / 민수야' },
      { type: 'rule', text: '해라체（书面/命令）→ -는다 / -어라 / -자', textEn: 'Hae-ra-che (Written/Imperative) → -neunda / -eora / -ja', examples: '간다 / 가라 / 가자' },
      { type: 'usage', text: '正式场合（会议/演讲/客户）→ 하십시오체', textEn: 'Formal settings (meetings/speeches/clients) → Hasipsio-che', examples: '회의를 시작하겠습니다.（会议现在开始。）', examplesEn: 'We will now begin the meeting.' },
      { type: 'usage', text: '日常礼貌（对客气对象/工作）→ 해요체', textEn: 'Everyday politeness (to respectful people/at work) → Haeyo-che', examples: '주말에 뭐 하세요?' },
      { type: 'usage', text: '亲密关系（家人/朋友/晚辈）→ 해체', textEn: 'Close relationships (family/friends/juniors) → Hae-che', examples: '뭐 해? / 밥 먹었어?' },
      { type: 'compare', text: '两条独立的敬语轴，别混成一件事：语体（청자높임）尊的是"听你说话的人"，靠句尾 -요/-습니다 切换；-시-（주체높임，第1课）尊的是"句子里被谈到的人"。两者各自开关，可以只有其中一个。', textEn: 'Two separate axes of honorifics—don\'t mix them up: speech level (cheongja-nopim) honors the person you\'re speaking to, switched via sentence endings -yo/-seumnida; -si- (juche-nopim, Lesson 1) honors the person being talked about in the sentence. Each works independently; you can have just one.', examples: '할아버지께서 가세요（尊话题人物+尊听者，两轴都开）/ 저 가요（只尊听者，主语是自己不加 -시-）/ 할아버지 어디 가셔?（尊话题人物+对听者用半语）', examplesEn: 'Grandfather is going (honors topic person + listener, both axes on) / I\'m going (only honors listener, no -si- since subject is self) / Grandfather, where are you going? (honors topic person + casual to listener)' },
      { type: 'note', text: '해라체 -ㄴ다/-는다 是书面中性体（日记·新闻·说明文用），不等于对人没礼貌；只有面对面的随意口语才是 해체 -어。别把书面的 간다 当成失礼。', textEn: 'Hae-ra-che -nda/-neunda is a neutral written form (used in diaries, news, explanations), not impolite to people; only face-to-face casual speech is Hae-che -eo. Don\'t mistake written ganda for rudeness.', examples: '(新闻) 대통령이 오늘 방문한다.（书面中性，无失礼）/ (对朋友) 나 지금 가.（口语半语）', examplesEn: '(News) The president visits today. (Neutral written, not rude) / (To a friend) I\'m going now. (Casual speech)' },
      { type: 'note', text: '语体不匹配会显得失礼或过于生分', textEn: 'Mismatched speech levels can seem rude or overly distant', examples: '对老板用 해체 → 失礼 / 对家人用 하십시오체 → 生分', examplesEn: 'Using Hae-che with your boss → rude / Using Hasipsio-che with family → distant' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '안녕하십니까?', role: 'verb' },
          { text: '저는', role: 'subject' },
          { text: '김민수입니다', role: 'verb' },
        ],
        zh: '您好我是民秀（最正式）。', zhEn: 'Hello, I\'m Min-su (most formal).',
        swapWords: ['입니다', '입니까', '됩니다', '갑니다'],
      },
      {
        wordBlocks: [
          { text: '안녕하세요?', role: 'verb' },
          { text: '저는', role: 'subject' },
          { text: '민수예요', role: 'verb' },
        ],
        zh: '你好我是民秀（亲切）。', zhEn: 'Hello, I\'m Min-su (friendly).',
        swapWords: ['예요', '이에요', '이야', '입니다'],
      },
      {
        wordBlocks: [
          { text: '안녕?', role: 'verb' },
          { text: '나는', role: 'subject' },
          { text: '민수야', role: 'verb' },
        ],
        zh: '嗨我民秀（半语）。', zhEn: 'Hi, I\'m Min-su (casual).',
        swapWords: ['야', '이야', '이지', '이거든'],
      },
    ],
    scenarios: [
      { icon: '👔', context: '面试/演讲', contextEn: 'Interview/Speech', ko: '안녕하십니까? 지원자 김민수입니다.', zh: '您好我是应聘者。', zhEn: 'Hello, I\'m the applicant.' },
      { icon: '💼', context: '正式工作', contextEn: 'Formal work', ko: '주말에 뭐 하세요?', zh: '周末做什么？（正式亲切）', zhEn: 'What are you doing this weekend? (Formal and friendly)' },
      { icon: '☕', context: '朋友聊天', contextEn: 'Chatting with friends', ko: '주말에 뭐 해?', zh: '周末做什么？（半语）', zhEn: 'What are you doing this weekend? (casual)' },
      { icon: '📝', context: '书面报道', contextEn: 'Written report', ko: '민수는 오늘 도착한다.', zh: '民秀今天到达（书面）。', zhEn: 'Min-su arrived today. (written)' },
      { icon: '📞', context: '客户电话', contextEn: 'Client call', ko: '언제 도착하십니까?', zh: '您何时到达？（最正式）', zhEn: 'When will you arrive? (most formal)' },
      { icon: '👨‍👩‍👦', context: '家庭对话', contextEn: 'Family conversation', ko: '엄마, 밥 먹었어?', zh: '妈，吃饭了吗？（半语）', zhEn: 'Mom, have you eaten? (casual)' },
    ],
    mistakes: [
      { wrong: '(对老板) 사장님, 저 가.', wrongEn: '(To boss) Boss, I\'m going.', correct: '사장님, 저 갑니다 / 가겠습니다.', note: '对老板用 하십시오체 或 해요체，不用 해체', noteEn: 'Use 하십시오체 or 해요체 with your boss, not 해체' },
      { wrong: '(对家人) 어머니, 지금 어디에 계십니까?', wrongEn: '(To family) Mother, where are you now?', correct: '어머니, 지금 어디에 계세요?', note: '家人平常用 해요체 就够，하십시오체 显生分', noteEn: 'For family, 해요체 is usually enough; 하십시오체 feels distant' },
      { wrong: '(想对老板客气) 사장님, 저 지금 가십니다.', wrongEn: '(Wanting to be polite to boss) Boss, I\'m leaving now.', correct: '사장님, 저 지금 갑니다.', note: '对听者客气靠语体（-ㅂ니다），不是往自己动作上加 -시-；-시- 尊的是"话题里的人"，主语是自己时绝不能加', noteEn: 'Politeness to the listener comes from the speech level (-ㅂ니다), not by adding -시- to your own actions; -시- honors the topic\'s subject, never add it when the subject is yourself' },
    ],
    quickTable: {
      title: '四大语体对照', titleEn: 'Four Speech Levels Comparison',
      headers: ['语体', '结尾', '典型场景'],
      rows: [
        ['하십시오체', '-습니다 / -십니다', '面试 / 演讲 / 首次见客户'],
        ['해요체', '-어요 / -으세요', '日常礼貌 / 工作 / 陌生人'],
        ['해체', '-어 / -야', '朋友 / 家人 / 晚辈'],
        ['해라체', '-는다 / -어라', '书面 / 新闻 / 命令'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '语体切换 练习', titleEn: 'Speech Level Switching Practice',
      body: '判断哪种语体最合适', bodyEn: 'Decide which speech level is most appropriate',
      questions: [
        {
          prompt: '"求职面试时对面试官" 最合适的语体？', promptEn: 'What\'s the most appropriate speech level for a job interview with an interviewer?',
          options: ['해체', '해요체', '하십시오체', '해라체'],
          answer: 2,
          explanation: '面试是最正式场合 → 하십시오체（-습니다/-십니다）。', explanationEn: 'Interviews are the most formal setting → 하십시오체 (-습니다/-십니다).',
        },
        {
          prompt: '"和亲密朋友聊天" 最合适的语体？', promptEn: 'What\'s the most appropriate speech level for chatting with close friends?',
          options: ['하십시오체', '해요체', '해체', '해라체'],
          answer: 2,
          explanation: '亲密朋友用 해체（半语 -어/-야）。', explanationEn: 'Close friends use 해체 (casual -어/-야).',
        },
        {
          prompt: '"新闻稿书面报道" 最合适的语体？', promptEn: 'What\'s the most appropriate speech level for a news article or written report?',
          options: ['해요체', '해체', '해라체', '하십시오체'],
          answer: 2,
          explanation: '书面报道用 해라체（-는다/-었다）。', explanationEn: 'Written reports use 해라체 (-는다/-었다).',
        },
        {
          prompt: '"对家里妈妈说话" 最合适的语体？', promptEn: 'What\'s the most appropriate speech level for talking to your mom at home?',
          options: [
            '하십시오체（어머니, 뭐 하십니까?）',
            '해요체（어머니, 뭐 하세요?）',
            '해체（엄마, 뭐 해?）',
            '해라체（엄마 뭐 한다）',
          ],
          answer: 2,
          explanation: '家人日常用 해체（半语）；用 하십시오체 显得生分。（在部分家庭对妈妈也可用 해요체 表尊重）', explanationEn: 'Family members use 해체 (casual) daily; using 하십시오체 feels distant. (In some families, 해요체 can be used with mom to show respect)',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l01', 'card-p15-l06'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">韩语的敬语第三层是"对听者的礼貌"—— <b>语体切换</b>。<br>四层：<b>하십시오체</b>（最正式）· <b>해요체</b>（亲切正式）· <b>해체</b>（半语）· <b>해라체</b>（书面）。<br>选错语体就选错关系。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>同一意思，四种语体</b><br>
    ・하십시오체：갑니다.<br>
    ・해요체：가요.<br>
    ・해체：가.<br>
    ・해라체：간다.
  </div>
</div>`,
    compareLabel: '四大语体', compareLabelEn: 'The four speech levels',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">청자높임 语体切换</div>
  <div style="font-size:14px;color:#89756e">对听者的礼貌</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">四大语体</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      하십시오체 → 面试/演讲/客户<br>
      해요체 → 日常礼貌/工作/陌生人<br>
      해체 → 朋友/家人/晚辈<br>
      해라체 → 书面/新闻/命令
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">(对老板) 사장님, 저 가</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">사장님, 저 갑니다 / 가겠습니다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">(对家人) 어디에 계십니까?</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">어디에 계세요?</span></div></div>
  </div>
</div>`,
  },

  // ── 第6课：自己낮춤 저·저희·드리다 ──────────────────────────────────────
  {
    id: 'card-p15-l06',
    partNumber: 15,
    lessonNumber: 6,
    title: '자기낮춤 저·저희',
    whatItDoes: '自谦', whatItDoesEn: 'Self-effacing',
    whatItDoesBody: '韩语敬语系统的另一半是"自谦（낮춤）"：把自己/自己群体压低，也是尊敬对方的一种方式。第一人称 나→저、우리→저희、주다→드리다（给长辈）、말하다→말씀하다（自己说时也可）都是自谦形式。', whatItDoesBodyEn: 'The other half of Korean honorifics is "self-lowering (낮춤)": lowering yourself/your group is also a way to show respect. First person 나→저, 우리→저희, 주다→드리다 (to give to elder), 말하다→말씀하다 (also used when speaking about oneself) are all self-lowering forms.',
    structureNote: '나→저｜우리→저희｜주다→드리다｜말하다→말씀 드리다',
    rulesNote: '자기낮춤 用于面对长辈/正式场合时降低自己的位阶', rulesNoteEn: 'Self-lowering is used to lower your own status before elders or in formal settings',
    structures: [
      {
        ko: '저는 김민수라고 합니다.',
        zh: '我叫金民秀。（自谦）', zhEn: 'My name is Kim Min-su. (humble)',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '김민수라고 합니다', role: 'verb' },
        ],
      },
      {
        ko: '저희 회사에서는 새 제품을 출시했습니다.',
        zh: '我们公司发布了新产品。', zhEn: 'Our company released a new product.',
        tokens: [
          { text: '저희 회사에서는', role: 'place' },
          { text: '새 제품을', role: 'object' },
          { text: '출시했습니다', role: 'verb' },
        ],
      },
      {
        ko: '자세한 내용은 이메일로 말씀 드리겠습니다.',
        zh: '详细内容我会用邮件告诉您。', zhEn: 'I\'ll send you the details by email.',
        tokens: [
          { text: '자세한 내용은', role: 'subject' },
          { text: '이메일로', role: 'plain' },
          { text: '말씀 드리겠습니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '나 → 저（第一人称自谦）', textEn: '나 → 저 (humble first person)', examples: '나는 → 저는' },
      { type: 'rule', text: '우리 → 저희（复数自谦）', textEn: '우리 → 저희 (humble plural)', examples: '우리 회사 → 저희 회사' },
      { type: 'rule', text: '주다 → 드리다（给长辈时的自谦）', textEn: '주다 → 드리다 (humble form for giving to elders)', examples: '아버지께 드릴게요.（我拿给爸爸。）', examplesEn: '아버지께 드릴게요. (I\'ll give it to Dad.)' },
      { type: 'rule', text: '말하다 → 말씀 드리다（自己"讲"面对长辈时）', textEn: '말하다 → 말씀 드리다 (when speaking to elders)', examples: '자세히 말씀 드리겠습니다.（我会详细说明。）', examplesEn: '자세히 말씀 드리겠습니다. (I will explain in detail.)' },
      { type: 'usage', text: '正式场合演讲/自我介绍常用 저 / 저희', textEn: 'Use 저 / 저희 in formal speeches and self-introductions', examples: '저는 김민수입니다.（我是金民秀。）', examplesEn: '저는 김민수입니다. (I am Kim Min-su.)' },
      { type: 'usage', text: '与哪些人不能自谦：同龄朋友/晚辈/亲密关系', textEn: 'Don\'t use humble forms with: same-age friends, younger people, close relationships', examples: '和朋友说话用 나 / 우리 即可', examplesEn: 'Use 나 / 우리 when talking to friends' },
      { type: 'compare', text: '저 vs 나 → 前者对上/正式，后者对同辈以下', textEn: '저 vs 나 → the former is for superiors/formal, the latter for peers or below', examples: '(正式) 저는 학생입니다 / (亲密) 나는 학생이야', examplesEn: '(Formal) 저는 학생입니다 / (Casual) 나는 학생이야' },
      { type: 'rule', text: '저 遇到主语助词 -가 和所有格 -의 要缩合：저+가 说成/写成 제가（绝不是 저가），저+의 说成 제。这是硬变形规则，不能按原形硬拼。', textEn: '저 contracts with subject particle -가 and possessive -의: 저+가 becomes 제가 (never 저가), 저+의 becomes 제. This is a fixed rule—don\'t combine them as-is.', examples: '제가 하겠습니다.（我来做。✓，"저가" ✗）/ 제 이름은 민수입니다.（我的名字是民秀。）', examplesEn: '제가 하겠습니다. (I\'ll do it. ✓, "저가" ✗) / 제 이름은 민수입니다. (My name is Min-su.)' },
      { type: 'note', text: '저희 是"排除听者"的我方（我们公司、我们家，不含你）；对同一群体内部的"我们（含你）"要用 우리。别一律把 우리 换成 저희。', textEn: '저희 is \'we\' excluding the listener (our company, our home, not including you); for \'we\' including the listener within the same group, use 우리. Don\'t just replace 우리 with 저희.', examples: '(对外部客户) 저희 회사가 준비했습니다.（我方公司，不含客户）/ (对同事) 우리 같이 점심 먹어요.（我们一起，含对方）', examplesEn: '(To external clients) 저희 회사가 준비했습니다. (our company, not including the client) / (To colleagues) 우리 같이 점심 먹어요. (we, including the other person)' },
      { type: 'note', text: '저희 나라 vs 우리 나라 → 前者太谦，习惯用 우리 나라', textEn: '저희 나라 vs 우리 나라 → the former is too humble; 우리 나라 is customary', examples: '避免："저희 나라 사람들" → 用："우리 나라 사람들"', examplesEn: 'Avoid: "저희 나라 사람들" → Use: "우리 나라 사람들"' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '김민수라고 합니다', role: 'verb' },
        ],
        zh: '我叫金民秀。', zhEn: 'My name is Kim Min-su.',
        swapWords: ['라고 하다', '이다', '입니다', '라 부르다'],
      },
      {
        wordBlocks: [
          { text: '저희 회사에서는', role: 'place' },
          { text: '새 제품을', role: 'object' },
          { text: '출시했습니다', role: 'verb' },
        ],
        zh: '我们公司发布新产品。', zhEn: 'Our company launched a new product.',
        swapWords: ['회사', '팀', '부서', '단체'],
      },
      {
        wordBlocks: [
          { text: '자세한 내용은', role: 'subject' },
          { text: '이메일로', role: 'plain' },
          { text: '말씀 드리겠습니다', role: 'verb' },
        ],
        zh: '细节邮件告知。', zhEn: 'Details will be sent by email.',
        swapWords: ['이메일', '문자', '전화', '서면'],
      },
    ],
    scenarios: [
      { icon: '🎤', context: '自我介绍', contextEn: 'Self-introduction', ko: '저는 김민수라고 합니다.', zh: '我叫民秀。', zhEn: 'My name is Min-su.' },
      { icon: '🏢', context: '公司介绍', contextEn: 'Company Introduction', ko: '저희 회사에서 새 제품을 출시했습니다.', zh: '我公司发布新品。', zhEn: 'Our company launched a new product.' },
      { icon: '💌', context: '致函', contextEn: 'send a letter', ko: '자세히 말씀 드리겠습니다.', zh: '详情将告知。', zhEn: 'Details will be provided.' },
      { icon: '🎁', context: '送礼', contextEn: 'give a gift', ko: '이것은 제가 준비한 선물입니다.', zh: '这是我准备的礼物。', zhEn: 'This is a gift I prepared.' },
      { icon: '📞', context: '电话', contextEn: 'Phone call', ko: '저희 팀장님을 바꿔 드리겠습니다.', zh: '为您转组长。', zhEn: 'I\'ll transfer you to the team leader.' },
      { icon: '🌏', context: '国家称呼', contextEn: 'Country terms', ko: '우리 나라 문화입니다.', zh: '我国文化。', zhEn: 'Our country\'s culture.' },
    ],
    mistakes: [
      { wrong: '나는 김민수입니다', correct: '저는 김민수입니다', note: '正式自介用 저，不用 나', noteEn: 'Use 저 for formal self-introductions, not 나.' },
      { wrong: '우리 회사에서는（对客户）', wrongEn: '우리 회사에서는 (to clients)', correct: '저희 회사에서는', note: '对外/正式用 저희', noteEn: 'Use 저희 for external/formal contexts.' },
      { wrong: '저희 나라 사람들', correct: '우리 나라 사람들', note: '国家自称用 우리 나라（约定俗成）', noteEn: 'Use 우리 나라 for self-reference (by convention)' },
      { wrong: '자세히 말씀 하겠습니다', correct: '자세히 말씀 드리겠습니다', note: '对客/长辈自己讲要 말씀 드리다', noteEn: 'Use 말씀 드리다 when speaking to guests/elders' },
      { wrong: '저가 하겠습니다', correct: '제가 하겠습니다', note: '저 加主语助词 -가 必须缩合成 제가，没有"저가"这种形式', noteEn: '저 + subject particle -가 must contract to 제가; "저가" is not a form.' },
    ],
    quickTable: {
      title: '自谦对照', titleEn: 'Self-humbling comparison',
      headers: ['普通', '自谦', '使用场景'],
      rows: [
        ['나', '저', '对上/正式'],
        ['우리', '저희', '对外/正式（除"우리 나라"）'],
        ['주다', '드리다', '给长辈/客户'],
        ['말하다', '말씀 드리다', '自己讲(面对尊者)'],
        ['이름', '성함', '姓名（尊称对方）'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '자기낮춤 练习', titleEn: '자기낮춤 practice',
      body: '选择正确的自谦形式', bodyEn: 'Choose the correct humble form.',
      questions: [
        {
          prompt: '正式自我介绍："___는 김민수라고 합니다."', promptEn: 'Formal self-introduction: "___는 김민수라고 합니다."',
          options: ['나', '저', '내', '제'],
          answer: 1,
          explanation: '正式场合第一人称用 저。', explanationEn: 'Use 저 for first person in formal settings.',
        },
        {
          prompt: '对客户："___ 회사에서는 새 제품을 출시했습니다."', promptEn: 'To clients: "___ 회사에서는 새 제품을 출시했습니다."',
          options: ['우리', '저희', '내', '자기'],
          answer: 1,
          explanation: '对外/正式用 저희。', explanationEn: 'Use 저희 for external/formal contexts.',
        },
        {
          prompt: '"我们国家" 最自然的说法？', promptEn: 'What\'s the most natural way to say "our country"?',
          options: ['저희 나라', '우리 나라', '내 나라', '한 나라'],
          answer: 1,
          explanation: '国家自称习惯用 우리 나라（不用 저희 나라，这样反而不自然）。', explanationEn: 'For self-reference, 우리 나라 is customary (저희 나라 sounds unnatural).',
        },
        {
          prompt: '"我会详细告诉您" 最合适？', promptEn: 'What\'s the most appropriate way to say "I\'ll tell you in detail"?',
          options: [
            '자세히 얘기하겠습니다',
            '자세히 말씀 드리겠습니다',
            '자세히 말씀 하겠습니다',
            '자세히 말할 것입니다',
          ],
          answer: 1,
          explanation: '面对长辈/客户，自己"讲"用 말씀 드리다（自谦 + 客体高임）。', explanationEn: 'When speaking to elders/clients, use 말씀 드리다 (self-humbling + object honorific).',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l03', 'card-p15-l05'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">敬语的另一半是<b>自谦（낮춤）</b>：把自己压低。<br>나→<b>저</b> · 우리→<b>저희</b> · 주다→<b>드리다</b> · 말하다→<b>말씀 드리다</b>。<br>特殊：<b>우리 나라</b> 约定俗成，不用 저희 나라。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>普通 vs 自谦</b><br>
    ・普通：나는 김민수야.<br>
    <span style="color:#89756e">（朋友/晚辈）</span><br>
    ・自谦：저는 김민수라고 합니다.<br>
    <span style="color:#89756e">（正式场合）</span>
  </div>
</div>`,
    compareLabel: '나 vs 저',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">자기낮춤（自谦）</div>
  <div style="font-size:14px;color:#89756e">压低自己 · 尊重对方</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">对照表</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      나 → <b>저</b><br>
      우리 → <b>저희</b>（除"우리 나라"）<br>
      주다 → <b>드리다</b><br>
      말하다 → <b>말씀 드리다</b>
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">저희 나라</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">우리 나라</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">나는 김민수입니다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">저는 김민수입니다</span></div></div>
  </div>
</div>`,
  },

  // ── 第7课：간접높임 与身体/所有物 ──────────────────────────────────────
  {
    id: 'card-p15-l07',
    partNumber: 15,
    lessonNumber: 7,
    title: '간접높임（间接尊敬）', titleEn: '간접높임 (indirect honorific)',
    whatItDoes: '身体/所有物 간접높임', whatItDoesEn: 'Body/possessions 간접높임',
    whatItDoesBody: '当句子主语不是尊者本人，而是他"身体的一部分""所有物""所属"时，动词/形容词仍要加 -(으)시-。这叫 간접높임（间接尊敬）：抬高 A 的东西 = 抬高 A。', whatItDoesBodyEn: 'When the subject is not the honored person but their body part, possession, or belonging, the verb/adjective still takes -(으)시-. This is 간접높임 (indirect honorific): elevating A\'s things = elevating A.',
    structureNote: '尊者的身体/所有物/所属 + V-(으)시-｜通过间接对象抬高本人', structureNoteEn: 'Honored person\'s body/possession/belonging + V-(으)시-｜elevate the person via an indirect object',
    rulesNote: '주체는 사람 아닌 그 사람의 "무엇"｜典型：손, 눈, 마음, 성함, 연세, 말씀 등', rulesNoteEn: 'Subject is not the person but their "something"｜Typical: 손, 눈, 마음, 성함, 연세, 말씀, etc.',
    structures: [
      {
        ko: '아버지는 손이 크세요.',
        zh: '父亲手很大。（间接高임，抬高父亲）', zhEn: 'Father\'s hands are big. (Indirect honorific, elevating father)',
        tokens: [
          { text: '아버지는', role: 'subject' },
          { text: '손이', role: 'subject' },
          { text: '크세요', role: 'verb' },
        ],
      },
      {
        ko: '할아버지는 연세가 많으세요.',
        zh: '爷爷年岁大。', zhEn: 'Grandfather is old.',
        tokens: [
          { text: '할아버지는', role: 'subject' },
          { text: '연세가', role: 'subject' },
          { text: '많으세요', role: 'verb' },
        ],
      },
      {
        ko: '선생님, 성함이 어떻게 되세요?',
        zh: '老师，您贵姓？', zhEn: 'Teacher, what\'s your surname?',
        tokens: [
          { text: '선생님', role: 'subject' },
          { text: '성함이', role: 'subject' },
          { text: '어떻게 되세요?', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '身体部位 + 형용사 -(으)시-：손이 크세요 / 눈이 크세요', textEn: 'Body part + adjective -(으)시-: 손이 크세요 / 눈이 크세요', examples: '아버지는 눈이 크세요.（父亲眼睛大 — 尊者的身体部位也随之加 -시-）', examplesEn: 'Father has big eyes. (When the body part belongs to the respected person, add -시- as well.)' },
      { type: 'rule', text: '所有物 + 属性 -(으)시-：집이 넓으세요 / 옷이 예쁘세요', textEn: 'Possession + attribute -(으)시-: The house is spacious / The clothes are pretty.', examples: '어머니 집이 넓으세요.（妈妈家很宽敞。间接尊敬：主语虽是"家"，用-으세요表达对妈妈的尊敬）', examplesEn: 'Mother\'s house is spacious. (Indirect respect: even though the subject is "house," -으세요 shows respect for Mother.)' },
      { type: 'rule', text: '尊称化名词：나이 → 연세, 이름 → 성함, 밥 → 진지, 말 → 말씀, 있다 → 계시다', textEn: 'Honorific nouns: 나이 → 연세, 이름 → 성함, 밥 → 진지, 말 → 말씀, 있다 → 계시다', examples: '연세가 많으세요 / 성함이 어떻게 되세요' },
      { type: 'usage', text: '连尊者"话/意图"也间接高임', textEn: 'Even the respected person\'s "words/intentions" are elevated indirectly.', examples: '말씀 있으세요? / 어떤 뜻이신가요?' },
      { type: 'usage', text: '不能对完全无关的物体加 -(으)시-（如 물건이 예쁘세요 ✗）', textEn: 'Cannot add -(으)시- to completely unrelated objects (e.g., 물건이 예쁘세요 ✗).', examples: '误：커피가 나오셨습니다 → 应：커피 나왔습니다', examplesEn: 'Wrong: 커피가 나오셨습니다 → Correct: 커피 나왔습니다' },
      { type: 'compare', text: '直接高임 vs 间接高임', textEn: 'Direct honorifics vs. indirect honorifics', examples: '(直接) 아버지가 오세요 / (间接) 아버지 손이 크세요', examplesEn: '(Direct) Father comes / (Indirect) Father\'s hands are big.' },
      { type: 'compare', text: '있다 有两个敬语形，别一律用 계시다：尊者本人"在/存在"用 계시다（直接）；尊者"拥有"某物、某物属于尊者时用 있으시다（间接）。判断标准是谁在做主语——是人本人还是他的东西。', textEn: '있다 has two honorific forms; don\'t always use 계시다: use 계시다 (direct) when the respected person himself "is/exists"; use 있으시다 (indirect) when the respected person "possesses" something or something belongs to them. The criterion is who is the subject—the person himself or his belongings.', examples: '사장님은 사무실에 계세요.（老板在办公室=人本人在，直接→계시다）/ 사장님, 시간이 있으세요?（老板有时间吗=时间属于老板，间接→있으시다）', examplesEn: 'The boss is in the office. (The boss himself is there = direct → 계시다) / Boss, do you have time? (Time belongs to the boss = indirect → 있으시다)' },
      { type: 'note', text: '当代韩国常有"过度敬语"现象 → 커피 나오셨습니다 是错误', textEn: 'Over-honorifics are common in modern Korea → 커피 나오셨습니다 is wrong.', examples: '"物品"不能被"尊敬"', examplesEn: 'Objects cannot be "respected."' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '아버지는', role: 'subject' },
          { text: '손이', role: 'subject' },
          { text: '크세요', role: 'verb' },
        ],
        zh: '父亲手大（间接）。', zhEn: 'Father\'s hands are big (indirect).',
        swapWords: ['손', '발', '눈', '얼굴'],
      },
      {
        wordBlocks: [
          { text: '할아버지는', role: 'subject' },
          { text: '연세가', role: 'subject' },
          { text: '많으세요', role: 'verb' },
        ],
        zh: '爷爷年岁大。', zhEn: 'Grandfather is old.',
        swapWords: ['연세', '나이'],
      },
      {
        wordBlocks: [
          { text: '선생님', role: 'subject' },
          { text: '성함이', role: 'subject' },
          { text: '어떻게 되세요?', role: 'verb' },
        ],
        zh: '老师您贵姓？', zhEn: 'What is your surname, teacher?',
        swapWords: ['성함', '이름'],
      },
    ],
    scenarios: [
      { icon: '👋', context: '身体', contextEn: 'body', ko: '아버지는 손이 크세요.', zh: '父亲手大。', zhEn: 'Father\'s hands are big.' },
      { icon: '👴', context: '年岁', contextEn: 'Age (honorific)', ko: '할아버지는 연세가 많으세요.', zh: '爷爷高龄。', zhEn: 'Grandfather is advanced in age.' },
      { icon: '🎓', context: '询问姓名', contextEn: 'Asking for a name', ko: '성함이 어떻게 되세요?', zh: '您贵姓？', zhEn: 'What is your surname?' },
      { icon: '🏠', context: '所有物', contextEn: 'Belongings', ko: '교수님 집이 넓으세요.', zh: '教授家宽敞。', zhEn: 'The professor\'s house is spacious.' },
      { icon: '💬', context: '话语间接', contextEn: 'Indirect speech', ko: '무슨 말씀이신가요?', zh: '您指的什么？', zhEn: 'What do you mean?' },
      { icon: '☕', context: '禁忌', contextEn: 'taboo', ko: '커피 나왔습니다.', zh: '咖啡好了。（不用 나오셨습니다）', zhEn: 'The coffee is ready. (Don\'t use 나오셨습니다)' },
    ],
    mistakes: [
      { wrong: '아버지 손이 커요', correct: '아버지 손이 크세요', note: '尊者身体也要 -(으)시-（间接尊敬）', noteEn: 'The elder\'s body also takes -(으)시- (indirect honorifics)' },
      { wrong: '커피가 나오셨습니다', correct: '커피가 나왔습니다', note: '物品"咖啡"不能被尊敬（当代常见的"过度敬语"错误）', noteEn: 'Objects like \'coffee\' can\'t be honored (a common modern \'over-honorific\' mistake)' },
      { wrong: '할아버지 나이가 많아요', correct: '할아버지는 연세가 많으세요', note: '나이 → 연세（尊称化名词）+ 谓语加 -(으)시-', noteEn: '나이 → 연세 (honorific noun) + predicate takes -(으)시-' },
      { wrong: '사장님, 시간이 계세요?', correct: '사장님, 시간이 있으세요?', note: '"时间"是尊者拥有的东西（间接），用 있으세요；계시다 只用于尊者本人"在"（直接）', noteEn: '\'Time\' is something the elder possesses (indirect), so use 있으세요; 계시다 is only for the elder\'s own presence (direct)' },
    ],
    quickTable: {
      title: '尊称化名词', titleEn: 'Honorific nouns',
      headers: ['普通', '尊称', '语境'],
      rows: [
        ['나이', '연세', '年龄'],
        ['이름', '성함', '姓名'],
        ['밥', '진지', '饭食（对长辈）'],
        ['말', '말씀', '话语'],
        ['있다', '계시다', '（人）在'],
        ['생일', '생신', '生日'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '간접높임 练习', titleEn: '간접높임 practice',
      body: '选择正确表达', bodyEn: 'Choose the correct expression',
      questions: [
        {
          prompt: '아버지는 손이 (   ).',
          options: ['커요', '크세요', '커요세요', '크시어요'],
          answer: 1,
          explanation: '身体部位属于间接尊敬 → 크세요。', explanationEn: 'Body parts are indirect honorifics → 크세요.',
        },
        {
          prompt: '"教授家宽敞" 最合适？', promptEn: 'Which is most appropriate for \'The professor\'s house is spacious\'?',
          options: [
            '교수님 집이 넓어요',
            '교수님 집이 넓으세요',
            '교수님 집을 넓어요',
            '교수님이 집이 넓으셨어요',
          ],
          answer: 1,
          explanation: '所有物"집"通过形容词 -(으)세요 抬高教授。', explanationEn: 'The possession \'집\' is elevated via the adjective -(으)세요 to honor the professor.',
        },
        {
          prompt: '下列哪句是"过度敬语"错误？', promptEn: 'Which sentence is an \'over-honorific\' mistake?',
          options: [
            '아버지는 연세가 많으세요.',
            '커피가 나오셨습니다.',
            '어머니는 손이 크세요.',
            '선생님, 성함이 어떻게 되세요?',
          ],
          answer: 1,
          explanation: '커피（物品）不能被尊敬 → 应改为 커피 나왔습니다。', explanationEn: '커피 (an object) can\'t be honored → should be 커피 나왔습니다.',
        },
        {
          prompt: '간접높임（间接尊敬）的原理？', promptEn: 'What\'s the principle of 간접높임 (indirect honorifics)?',
          options: [
            '直接抬高主语',
            '通过抬高尊者的身体/所有物 间接尊敬本人',
            '只抬高动词',
            '只用于问句',
          ],
          answer: 1,
          explanation: '通过尊者的"东西"加 -(으)시- 间接抬高本人。物品不能滥用。', explanationEn: 'Elevate the person indirectly by adding -(으)시- to their \'belongings.\' Don\'t overuse it on objects.',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l01', 'card-p15-l02'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">尊者的<b>身体/所有物</b>也要 -(으)시-：아버지 <b>손이 크세요</b>。<br>但是"物品本身"不能被尊敬 → <b>커피 나왔습니다</b>（不是 나오셨습니다）。<br>这是当代韩语最常见的"过度敬语"错误。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>可以 vs 不可以</b><br>
    ・尊者身体/所有 ✓<br>
    <span style="color:#89756e">아버지 손이 크세요.</span><br>
    ・物品本身 ✗<br>
    <span style="color:#89756e">커피가 나오셨습니다 → 나왔습니다</span>
  </div>
</div>`,
    compareLabel: '间接 vs 过度', compareLabelEn: 'Indirect vs. Over-honorifics',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">간접높임（间接尊敬）</div>
  <div style="font-size:14px;color:#89756e">身体/所有物 → 抬高本人</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">尊称化名词</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      나이 → 연세<br>
      이름 → 성함<br>
      밥 → 진지<br>
      말 → 말씀<br>
      생일 → 생신
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">커피 나오셨습니다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">커피 나왔습니다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">할아버지 나이가 많아요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">할아버지는 연세가 많으세요</span></div></div>
  </div>
</div>`,
  },

  // ── 第8课：높임 误用禁忌与압존 ──────────────────────────────────────
  {
    id: 'card-p15-l08',
    partNumber: 15,
    lessonNumber: 8,
    title: '높임 误用禁忌与압존', titleEn: 'Honorific misuse taboos and 압존',
    whatItDoes: '禁忌与압존법', whatItDoesEn: 'Taboos and 압존법',
    whatItDoesBody: '本课系统整理韩语敬语最容易踩的坑：过度敬语（커피 나오셨습니다）、압존법（面对最高尊者时抬他下面的人是否降低）、对陌生人的默认语体、职场敬语的边界。这些是韩语高级学习者的必修。', whatItDoesBodyEn: 'This lesson systematically covers the most common honorific pitfalls: over-honorifics (커피 나오셨습니다), 압존법 (whether to lower someone below the highest authority), default speech level with strangers, and boundaries of workplace honorifics. Essential for advanced learners.',
    structureNote: '禁忌 · 压尊 · 默认语体｜四大常见错误', structureNoteEn: 'Taboos · 압존 · Default speech level｜Four common errors',
    rulesNote: '过度敬语｜압존법（对老板讲组长时"降"组长）｜第一人称不加 -시-｜物品不加 -시-', rulesNoteEn: 'Over-honorifics｜압존법 (lowering a team leader when speaking to the boss)｜No -시- for first person｜No -시- for objects',
    structures: [
      {
        ko: '주문하신 커피 나왔습니다.',
        zh: '您点的咖啡好了。', zhEn: 'Your coffee is ready.',
        tokens: [
          { text: '주문하신', role: 'plain' },
          { text: '커피', role: 'subject' },
          { text: '나왔습니다', role: 'verb' },
        ],
      },
      {
        ko: '(사장님께) 팀장이 조금 전에 나갔습니다.',
        zh: '（对社长）组长刚刚出去了。（압존）', zhEn: '(To the boss) The team leader just stepped out. (압존)',
        tokens: [
          { text: '팀장이', role: 'subject' },
          { text: '조금 전에', role: 'time' },
          { text: '나갔습니다', role: 'verb' },
        ],
      },
      {
        ko: '저는 학교에 갔어요.',
        zh: '我去了学校。（自己不用 -시-）', zhEn: 'I went to school. (No -시- for oneself)',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '갔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '禁忌 1：物品不加 -(으)시-（커피 / 사이즈 / 주문）', textEn: 'Taboo 1: Don\'t add -(으)시- to objects (커피 / 사이즈 / 주문)', examples: '(错) 커피 나오셨어요 → 나왔어요', examplesEn: '(Wrong) 커피 나오셨어요 → 나왔어요' },
      { type: 'rule', text: '禁忌 2：第一人称"我/我们"不加 -(으)시-', textEn: 'Taboo 2: Don\'t add -(으)시- to first-person \'I/we\'', examples: '(错) 제가 가시겠습니다 → 제가 가겠습니다', examplesEn: '(Wrong) 제가 가시겠습니다 → 제가 가겠습니다' },
      { type: 'rule', text: '禁忌 3：压尊法（압존법）— 对最高尊者时，抬中间层次是失礼', textEn: 'Taboo 3: 압존법 — When addressing the highest authority, elevating an intermediate level is rude', examples: '(对社长) 팀장님이 오셨습니다 → 팀장이 왔습니다（正式压尊；现代职场多已放宽）', examplesEn: '(To the boss) 팀장님이 오셨습니다 → 팀장이 왔습니다 (formal 압존; modern workplaces are more lenient)' },
      { type: 'rule', text: '禁忌 4：过度嵌套 -(으)시- + -어요 + -님 有时反而失礼', textEn: 'Taboo 4: Over-nesting -(으)시- + -어요 + -님 can sometimes be rude', examples: '需按听者/情境选合适的层级', examplesEn: 'Choose the appropriate level based on the listener and situation' },
      { type: 'usage', text: '现代韩国职场对압존법态度放宽 → 一般也可"팀장님이 오셨습니다"', textEn: 'Modern Korean workplaces are more relaxed about 압존법 → \'팀장님이 오셨습니다\' is generally acceptable too', examples: '大企业内规多允许 팀장님 加 님 + -시-', examplesEn: 'Large companies often allow 팀장님 with 님 + -시-' },
      { type: 'usage', text: '正式服务业错误："-님, 사이즈가 어떠세요?" → 사이즈 어떠십니까? / 어떠세요? 都好', textEn: 'Formal service industry error: "-님, 사이즈가 어떠세요?" → 사이즈 어떠십니까? / 어떠세요? Both are fine', examples: '避免："고객님 계산이 나오셨어요" → "계산 나왔어요"', examplesEn: 'Avoid: "고객님 계산이 나오셨어요" → "계산 나왔어요"' },
      { type: 'compare', text: '正确 vs 过度', textEn: 'Correct vs. Excessive', examples: '(错) 옷이 예쁘시네요 → (对) 옷이 예쁘네요 (物品) / 손님이 예쁘시네요 (人)', examplesEn: '(Wrong) 옷이 예쁘시네요 → (Right) 옷이 예쁘네요 (object) / 손님이 예쁘시네요 (person)' },
      { type: 'compare', text: '压尊法分两种场合、方向相反，别一概而论：家庭里对最高长辈提中间长辈，传统上"降"中间人（不加 -시-）；但职场里国立国语院的标准反而是"不实行压尊"，对社长提组长也照样抬（加 -시-）。', textEn: 'The honorific-lowering rule applies differently in two contexts with opposite directions—don\'t generalize. At home, when mentioning a middle elder to the highest elder, tradition "lowers" the middle person (no -시-). But in the workplace, the National Institute of Korean Language standard is actually "no lowering": you still elevate the team leader when speaking to the CEO (add -시-).', examples: '(家庭·传统) 할아버지, 아버지가 아직 안 왔습니다.（对爷爷时不抬爸爸）/ (职场·标准) 사장님, 김 팀장님이 안 계십니다.（对社长仍抬组长）', examplesEn: '(Home·Traditional) 할아버지, 아버지가 아직 안 왔습니다. (Don\'t elevate Dad when speaking to Grandpa) / (Workplace·Standard) 사장님, 김 팀장님이 안 계십니다. (Still elevate the team leader when speaking to the CEO)' },
      { type: 'note', text: '根源一句话：-(으)시- 只看"句子主语（주체）是不是该被尊敬的人"，不看"我正在跟谁说话"。物品不是人、第一人称是自己——都不是被尊敬的主语，所以禁忌 1、2 其实是同一条规则。别因为在跟长辈说话就整句乱加 -시-。', textEn: 'Root cause in one sentence: -(으)시- only looks at whether the sentence subject (주체) deserves respect, not "who I\'m talking to." Objects aren\'t people, and first person is yourself—neither is a respected subject, so Taboos 1 and 2 are actually the same rule. Don\'t sprinkle -시- throughout a sentence just because you\'re talking to an elder.', examples: '주어是物品→不加：커피 나왔습니다 / 주어是自己→不加：제가 하겠습니다 / 주어是长辈→才加：할아버지가 오셨습니다', examplesEn: 'Subject is an object → don\'t add: 커피 나왔습니다 / Subject is yourself → don\'t add: 제가 하겠습니다 / Subject is an elder → only then add: 할아버지가 오셨습니다' },
      { type: 'note', text: '"过度敬语"是当代韩国服务业普遍问题；正式考试/正确用语要区分', textEn: '"Excessive honorifics" is a common problem in modern Korean service industries; formal exams/correct usage require distinction', examples: '国立国어원 教材明确否定"物品 -시-"', examplesEn: 'National Institute of Korean Language textbooks explicitly reject "object -시-"' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '주문하신', role: 'plain' },
          { text: '커피', role: 'subject' },
          { text: '나왔습니다', role: 'verb' },
        ],
        zh: '您的咖啡好了。', zhEn: 'Your coffee is ready.',
        swapWords: ['커피', '음료', '주문', '음식'],
      },
      {
        wordBlocks: [
          { text: '팀장이', role: 'subject' },
          { text: '조금 전에', role: 'time' },
          { text: '나갔습니다', role: 'verb' },
        ],
        zh: '组长刚出去（对社长）。', zhEn: 'The team leader just stepped out (to the CEO).',
        swapWords: ['팀장', '과장', '차장', '부장'],
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학교에', role: 'place' },
          { text: '갔어요', role: 'verb' },
        ],
        zh: '我去学校。', zhEn: 'I go to school.',
        swapWords: ['학교', '회사', '집', '병원'],
      },
    ],
    scenarios: [
      { icon: '☕', context: '服务业禁忌', contextEn: 'Service industry taboo', ko: '주문하신 커피 나왔습니다.', zh: '您的咖啡好了。', zhEn: 'Your coffee is ready.' },
      { icon: '👔', context: '압존법', ko: '팀장이 조금 전에 나갔습니다.', zh: '组长刚出去了（面对社长时的压尊法）。', zhEn: 'The team leader just stepped out (honorific-lowering when facing the CEO).' },
      { icon: '🙋', context: '自己不用 -시-', contextEn: 'Don\'t use -시- for yourself', ko: '저는 학교에 갔어요.', zh: '我去学校。', zhEn: 'I go to school.' },
      { icon: '💰', context: '禁忌', contextEn: 'taboo', ko: '계산 도와드리겠습니다.', zh: '为您结账。', zhEn: 'I\'ll ring you up.' },
      { icon: '📏', context: '禁忌 2', contextEn: 'Taboo 2', ko: '사이즈 어떠세요?', zh: '尺寸如何？（不用 사이즈가 어떠십니까?）', zhEn: 'How\'s the size? (Don\'t use 사이즈가 어떠십니까?)' },
      { icon: '🎁', context: '正确嵌套', contextEn: 'Correct nesting', ko: '아버님, 이 선물이 마음에 드세요?', zh: '爸这礼物您喜欢吗？', zhEn: 'Dad, do you like this gift?' },
    ],
    mistakes: [
      { wrong: '커피가 나오셨습니다', correct: '커피 나왔습니다', note: '物品不能被尊敬', noteEn: 'Objects cannot be honored' },
      { wrong: '(对社长) 팀장님이 오셨습니다', wrongEn: '(To the CEO) 팀장님이 오셨습니다', correct: '(压尊) 팀장이 왔습니다 / (职场放宽) 팀장님이 오셨습니다', correctEn: '(Lowering) 팀장이 왔습니다 / (Workplace relaxed) 팀장님이 오셨습니다', note: '严格 압존法降尊；现代职场多已放宽', noteEn: 'Strict 압존법 lowers honorifics; modern workplaces have largely relaxed this' },
      { wrong: '제가 가시겠습니다', correct: '제가 가겠습니다', note: '第一人称不能加 -(으)시-', noteEn: 'First person can\'t take -(으)시-' },
      { wrong: '옷이 예쁘시네요（对客人时形容衣服）', wrongEn: '옷이 예쁘시네요 (describing clothes to a guest)', correct: '옷이 예쁘네요 / 손님이 예뻐 보이세요', note: '尊敬人本身，不尊敬"物品"', noteEn: 'Respect the person, not the object' },
    ],
    quickTable: {
      title: '常见误用与修正', titleEn: 'Common errors and corrections',
      headers: ['错误类型', '错', '正'],
      rows: [
        ['物品尊敬', '커피 나오셨어요', '커피 나왔어요'],
        ['第一人称', '제가 가시겠어요', '제가 가겠어요'],
        ['압존（严格）', '팀장님이 오셨습니다', '팀장이 왔습니다'],
        ['服务业过度', '사이즈가 어떠십니까?', '사이즈 어떠세요?'],
        ['所有物过度', '옷이 예쁘시네요', '옷이 예쁘네요'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '误用判断', titleEn: 'Error identification',
      body: '选出用得对的表达', bodyEn: 'Choose the correct expression',
      questions: [
        {
          prompt: '"顾客的咖啡好了" 最合适？', promptEn: 'Which is most appropriate for "The customer\'s coffee is ready"?',
          options: [
            '커피가 나오셨습니다',
            '커피 나왔습니다',
            '커피께서 나오셨습니다',
            '커피 나오셨어요',
          ],
          answer: 1,
          explanation: '物品（咖啡）不能被尊敬 → 커피 나왔습니다。', explanationEn: 'Objects (coffee) can\'t be honored → 커피 나왔습니다.',
        },
        {
          prompt: '"我要去" 最合适？', promptEn: 'Which is most appropriate for "I will go"?',
          options: [
            '제가 가시겠습니다',
            '제가 가겠습니다',
            '제가 가시어요',
            '제가 가세요',
          ],
          answer: 1,
          explanation: '第一人称不加 -(으)시- → 제가 가겠습니다。', explanationEn: 'First person doesn\'t take -(으)시- → 제가 가겠습니다.',
        },
        {
          prompt: '"（对社长）组长刚出去" 现代职场最普遍的说法？', promptEn: 'What\'s the most common modern workplace way to say "(to the boss) The team leader just stepped out"?',
          options: [
            '팀장이 나갔습니다（严格 압존）',
            '팀장님이 나가셨습니다（放宽后）',
            '팀장이 나가셨어요',
            '팀장님 나가셨어요',
          ],
          answer: 1,
          explanation: '严格 압존法要降尊；但现代韩国职场普遍已放宽，说 팀장님이 나가셨습니다 也可接受。', explanationEn: 'Strict 압존법 requires lowering; but modern Korean workplaces have relaxed it, so 팀장님이 나가셨습니다 is also acceptable.',
        },
        {
          prompt: '"这件衣服真漂亮"（对客人时）最合适？', promptEn: 'Which is most appropriate for "This outfit is really pretty" (to a guest)?',
          options: [
            '옷이 예쁘시네요',
            '옷이 예쁘네요',
            '옷께서 예쁘십니다',
            '옷이 예쁘십니다',
          ],
          answer: 1,
          explanation: '衣服是物品不能尊敬；说 옷이 예쁘네요 或转为 "손님이 예뻐 보이세요"。', explanationEn: 'Clothes are objects and can\'t be honored; say 옷이 예쁘네요 or switch to "손님이 예뻐 보이세요".',
        },
      ],
    },
    linkedGrammarIds: ['card-p15-l01', 'card-p15-l07'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">敬语误用四大常见：<br>1. 物品尊敬（<b>커피 나오셨어요</b>）· 2. 第一人称加 -시-（<b>제가 가시겠어요</b>）<br>3. 压尊法（对社长说组长要"降尊"）· 4. 过度嵌套。<br>掌握这些是韩语真正流利的一关。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>严格 vs 放宽压尊</b><br>
    ・严格 압존（教材标准）<br>
    <span style="color:#89756e">(对社长) 팀장이 왔습니다.</span><br>
    ・现代职场（放宽）<br>
    <span style="color:#89756e">(对社长) 팀장님이 오셨습니다.</span>
  </div>
</div>`,
    compareLabel: '严格 vs 放宽', compareLabelEn: 'Strict vs. relaxed',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">敬语误用禁忌</div>
  <div style="font-size:14px;color:#89756e">四大常见错误</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">四大禁忌</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. 物品不加 -(으)시-<br>
      2. 第一人称不加 -(으)시-<br>
      3. 압존法（对最高尊者时降中间尊者）<br>
      4. 服务业过度嵌套（사이즈 어떠십니까?）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">커피 나오셨습니다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">커피 나왔습니다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">제가 가시겠습니다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">제가 가겠습니다</span></div></div>
  </div>
</div>`,
  },

  // ── 第9课：P15 综合练习 ──────────────────────────────────────
  {
    id: 'card-p15-l09',
    partNumber: 15,
    lessonNumber: 9,
    title: 'P15 综合练习', titleEn: 'P15 Comprehensive Practice',
    isPractice: true,
    whatItDoes: '敬语综合', whatItDoesEn: 'Comprehensive honorifics',
    whatItDoesBody: '本课综合 P15 全部 8 类敬语内容：주체높임 -(으)시- / 特殊词汇 / 객체높임 换词 / 助词 -께서·-께·-님 / 语体切换 / 자기낮춤 / 간접높임 / 误用禁忌。', whatItDoesBodyEn: 'This lesson integrates all 8 honorific categories from P15: 주체높임 -(으)시- / special vocabulary / 객체높임 word substitution / particles -께서·-께·-님 / speech level switching / 자기낮춤 / 간접높임 / misuse taboos.',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    specialQuiz: {
      type: 'morph',
      title: 'P15 综合练习', titleEn: 'P15 Comprehensive Practice',
      body: '综合本章所有敬语内容', bodyEn: 'Comprehensive review of all honorifics in this chapter',
      questions: [
        {
          prompt: '선생님이 어제 학교에 (오다) 어요.',
          options: ['왔어요', '오셨어요', '오세요', '오시어요'],
          answer: 1,
          explanation: '过去 -(으)셨어요 → 오셨어요。', explanationEn: 'Past tense -(으)셨어요 → 오셨어요.',
        },
        {
          prompt: '할아버지는 지금 방에 (   ).',
          options: ['있어요', '있으세요', '계세요', '있어시요'],
          answer: 2,
          explanation: '"（人）在"用 계시다 → 계세요。', explanationEn: '"(Person) is here" uses 계시다 → 계세요.',
        },
        {
          prompt: '아버지는 일찍 (자다) 세요.',
          options: ['자', '주무', '주무시', '자시'],
          answer: 1,
          explanation: '"就寝"用 주무시다 → 주무세요（주무 + -세요）。', explanationEn: '"Sleep" uses 주무시다 → 주무세요 (주무 + -세요).',
        },
        {
          prompt: '선생님(   ) 선물을 (   ).',
          options: ['에게 / 주었어요', '께 / 드렸어요', '에 / 드렸어요', '한테 / 주셨어요'],
          answer: 1,
          explanation: '给尊者：-께 + 드리다 → 께 드렸어요。', explanationEn: 'Giving to a superior: -께 + 드리다 → 께 드렸어요.',
        },
        {
          prompt: '선생님(   ) 학교에 오셨어요.',
          options: ['이', '가', '께서', '으로'],
          answer: 2,
          explanation: '正式敬语主语用 -께서。', explanationEn: 'Formal honorifics use -께서 for the subject.',
        },
        {
          prompt: '"面试自我介绍" 最合适语体？', promptEn: 'What\'s the most appropriate speech level for a job interview self-introduction?',
          options: ['해체', '해요체', '하십시오체', '해라체'],
          answer: 2,
          explanation: '正式面试用 하십시오체。', explanationEn: 'Formal interviews use 하십시오체.',
        },
        {
          prompt: '正式自介："___는 김민수라고 합니다."', promptEn: 'Formal self-introduction: "___는 김민수라고 합니다."',
          options: ['나', '저', '내', '제'],
          answer: 1,
          explanation: '正式第一人称用 저。', explanationEn: 'Formal first person uses 저.',
        },
        {
          prompt: '아버지는 손이 (   ).',
          options: ['커요', '크세요', '커요세요', '크시어요'],
          answer: 1,
          explanation: '身体部位 → 간접높임 → 크세요。', explanationEn: 'Body parts → indirect honorific → 크세요.',
        },
        {
          prompt: '"顾客的咖啡好了" 最合适？', promptEn: 'Which is most appropriate for "The customer\'s coffee is ready"?',
          options: [
            '커피가 나오셨습니다',
            '커피 나왔습니다',
            '커피께서 나오셨습니다',
            '커피 나오셨어요',
          ],
          answer: 1,
          explanation: '物品不能被尊敬 → 커피 나왔습니다。', explanationEn: 'Objects can\'t be honored → 커피 나왔습니다.',
        },
        {
          prompt: '주체높임 与 객체높임 的核心区别？', promptEn: 'What\'s the core difference between 주체높임 and 객체높임?',
          options: [
            '完全相同',
            '주체 抬高主语（-시-）；객체 抬高宾语/接受者（换词+-께）',
            '주체 用于口语，객체 用于书面',
            '주체 是过去，객체 是现在',
          ],
          answer: 1,
          explanation: '주체（主语）+ -시-；객체（宾语/接受者）+ 特殊换词 + -께。', explanationEn: 'Subject + -시-; object (recipient) + special verb swap + -께.',
        },
      ],
    },
    linkedGrammarIds: [
      'card-p15-l01',
      'card-p15-l02',
      'card-p15-l03',
      'card-p15-l04',
      'card-p15-l05',
      'card-p15-l06',
      'card-p15-l07',
      'card-p15-l08',
    ],
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P15 敬语体系深化总结</div>
  <div style="font-size:14px;color:#89756e">3 大维度 · 助词 · 语体 · 自谦 · 禁忌</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">敬语 3 大维度</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. 주체높임 → 抬高主语（-(으)시-）<br>
      2. 객체높임 → 抬高宾语/接受者（换词 + -께）<br>
      3. 청자높임 → 语体切换（4 大语体）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">助词升级</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -이/가 → -께서<br>
      -은/는 → -께서는<br>
      -에게 → -께<br>
      N → N-님
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#6b7ff0"></div><div class="ov-section-title" style="color:#6b7ff0">特殊换词清单</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      있다 → 계시다 / 있으시다<br>
      먹다 → 드시다 / 잡수시다<br>
      자다 → 주무시다 / 말하다 → 말씀하시다<br>
      주다 → 드리다 / 보다 → 뵙다<br>
      묻다 → 여쭙다 / 데리다 → 모시다<br>
      나이 → 연세 / 이름 → 성함 / 밥 → 진지
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">四大误用禁忌</div></div>
  <div class="ov-block">
    <div style="font-size:15px;color:#241917;line-height:1.8">
      1. 物品不加 -(으)시-（커피 나왔습니다）<br>
      2. 第一人称不加 -(으)시-（제가 가겠습니다）<br>
      3. 압존法（正式场合注意抬中间层）<br>
      4. 语体不匹配（选对语体最重要）
    </div>
  </div>
</div>`,
  },
];
