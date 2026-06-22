import type { GrammarCard } from '@/types';

export const grammarCardsP11: GrammarCard[] = [
  {
    id: 'card-p11-l01',
    partNumber: 11,
    lessonNumber: 1,
    title: '陈述句间接引语',
    whatItDoes: '转述别人说的话——"他说……"',
    whatItDoesBody: '间接引语是把别人的话或自己之前说的话转述出来的语法结构。陈述句间接引语根据谓词类型分为四种形式，统一用 -고 하다 收尾。\n口语中 -고 하다 常缩略为 -고 해요，更口语时直接用 -대요。',
    structureNote: '动词：词干 + -는다고/ㄴ다고 하다\n形容词：词干 + -다고 하다\n名词谓词：名词 + -(이)라고 하다\n过去时统一：-았/었다고 하다',
    rulesNote: '时态由被引语句本身决定：현재/과거/미래 均可出现。\n口语缩略：-는다고 해요 → -는대요，-다고 해요 → -대요，-(이)라고 해요 → -(이)래요。',
    structures: [
      {
        ko: '친구가 내일 온다고 했어요',
        zh: '朋友说明天会来。',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '내일', role: 'time' },
          { text: '온다고 했어요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 이 문제가 어렵다고 하셨어요',
        zh: '老师说这道题很难。',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '이 문제가', role: 'object' },
          { text: '어렵다고 하셨어요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람이 학생이라고 했어요',
        zh: '那个人说自己是学生。',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '학생이라고 했어요', role: 'verb' },
        ],
      },
      {
        ko: '뉴스에서 내일 비가 온다고 했어요',
        zh: '新闻说明天会下雨。',
        tokens: [
          { text: '뉴스에서', role: 'place' },
          { text: '내일', role: 'time' },
          { text: '비가', role: 'subject' },
          { text: '온다고 했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词（有收音）词干 + -는다고 하다', examples: '먹다→먹는다고 해요 / 읽다→읽는다고 해요' },
      { type: 'rule', text: '动词（无收音/ㄹ词干）词干 + -ㄴ다고 하다', examples: '가다→간다고 해요 / 만들다→만든다고 해요' },
      { type: 'rule', text: '形容词词干 + -다고 하다（所有形容词）', examples: '좋다→좋다고 해요 / 크다→크다고 해요 / 바쁘다→바쁘다고 해요' },
      { type: 'rule', text: '名词 + -이라고 하다（有收音） / -라고 하다（无收音）', examples: '학생이라고 해요 / 의사라고 해요' },
      { type: 'rule', text: '过去时统一用 -았/었다고 하다', examples: '먹었다고 해요 / 갔다고 해요 / 좋았다고 해요' },
      { type: 'usage', text: '口语缩略：-는다고 해요 → -는대요，-다고 해요 → -대요', examples: '온대요（他说会来）/ 바쁘대요（他说很忙）/ 학생이래요（他说是学生）' },
      { type: 'note', text: '转述主语（说话的人）通常是第三人称，原话中的我/你需要替换', examples: '원래 말: "나는 바빠요" → 전달: 친구가 자기는 바쁘다고 했어요' },
      { type: 'compare', text: '-고 하다 vs -고 했다：前者表示最近说过，后者表示较早之前说过', examples: '지금 뭐라고 해요?（他现在说什么？）vs 어제 뭐라고 했어요?（昨天说了什么？）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '밥이', role: 'subject' },
          { text: '맛있다고', role: 'plain' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '妈妈说饭很好吃。',
        swapWords: ['맛있다고 했어요', '맛없다고 했어요', '짜다고 했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '오늘', role: 'time' },
          { text: '바쁘다고', role: 'plain' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '朋友说今天很忙。',
        swapWords: ['바쁘다고 했어요', '피곤하다고 했어요', '시간이 없다고 했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '그 사람이', role: 'subject' },
          { text: '선생님이라고', role: 'plain' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '那个人说自己是老师。',
        swapWords: ['선생님이라고 했어요', '의사라고 했어요', '학생이라고 했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '뉴스에서', role: 'place' },
          { text: '내일 비가 온다고', role: 'plain' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '新闻说明天会下雨。',
        swapWords: ['내일 비가 온다고 했어요', '내일 눈이 온다고 했어요', '내일 춥다고 했어요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '📱', context: '转达消息', ko: '친구가 파티에 못 온다고 했어요.', zh: '朋友说不能来派对了。' },
      { icon: '📺', context: '转述新闻', ko: '뉴스에서 내일 눈이 온다고 했어요.', zh: '新闻说明天会下雪。' },
      { icon: '🎵', context: 'KPOP 歌词引用', ko: '그 가수가 이 노래는 팬들을 위한 거라고 했어요.', zh: '那位歌手说这首歌是为粉丝写的。' },
      { icon: '👨‍👩‍👧', context: '转述家人的话', ko: '아버지가 일찍 들어오라고 하셨어요.', zh: '爸爸说要早点回来。' },
      { icon: '🏥', context: '转述医生的话', ko: '의사가 일주일 동안 쉬어야 한다고 했어요.', zh: '医生说要休息一周。' },
      { icon: '💬', context: '口语缩略', ko: 'A: 민준 씨는요? B: 오늘 늦는대요.', zh: 'A：敏俊呢？B：他说今天会晚。' },
    ],
    mistakes: [
      { wrong: '친구가 바쁘는다고 했어요（形容词加 -는다고）', correct: '친구가 바쁘다고 했어요', note: '形容词用 -다고，不加 -는다고。只有动词才区分是否有收音。' },
      { wrong: '그 사람이 의사이라고 했어요（无收音名词加 이라고）', correct: '그 사람이 의사라고 했어요', note: '名词无收音时用 -라고，有收音才用 -이라고。의사 无收音 → 의사라고.' },
      { wrong: '어제 먹었는다고 했어요（过去时加 는다고）', correct: '어제 먹었다고 했어요', note: '过去时 -았/었- 后统一用 -다고，不分动词形容词。' },
      { wrong: '오늘 가는다고 해요（无收音动词加 -는다고）', correct: '오늘 간다고 해요', note: '가다 는 无收音词干 → -ㄴ다고：가다→간다고。-는다고 只用于有收音词干（먹다→먹는다고）。' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第1课</div>
    <div class="ov-hero-title">陈述句间接引语</div>
    <div class="ov-hero-sub">转述他人话语的核心语法</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">四种形式</div></div>
    <div class="ov-block">
      <div class="badge">动词（有收音）</div>
      <div class="ko">-는다고 하다</div>
      <div class="zh">먹다 → 먹는다고 해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">动词（无收音/ㄹ）</div>
      <div class="ko">-ㄴ다고 하다</div>
      <div class="zh">가다 → 간다고 해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">形容词</div>
      <div class="ko">-다고 하다</div>
      <div class="zh">좋다 → 좋다고 해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">名词谓词</div>
      <div class="ko">-(이)라고 하다</div>
      <div class="zh">학생이다 → 학생이라고 해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">过去时</div>
      <div class="ko">-았/었다고 하다</div>
      <div class="zh">먹었다 → 먹었다고 해요</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="step0-hook">
  <div class="hook-box">
    <div class="hook-sent"><span class="ko">친구가 내일 온다고 했어요.</span><span class="zh">朋友说明天会来。</span></div>
    <div class="hook-sent"><span class="ko">선생님이 이 책이 좋다고 하셨어요.</span><span class="zh">老师说这本书很好。</span></div>
  </div>
</div>`,
    compareLabel: '동사 vs 형용사 vs 명사',
    compareHtml: `<div class="compare">
  <div class="cmp-block" style="border-left:4px solid #ff7fa8">
    <div class="cmp-title">동사 간접인용</div>
    <div class="cmp-row"><span class="badge">有收音</span>词干 + -는다고</div>
    <div class="cmp-row"><span class="badge">无收音/ㄹ</span>词干 + -ㄴ다고</div>
    <div class="cmp-row"><span class="ko">먹는다고 해요</span><span class="zh">说（他）在吃</span></div>
    <div class="cmp-row"><span class="ko">간다고 해요</span><span class="zh">说（他）要去</span></div>
  </div>
  <div class="cmp-block" style="border-left:4px solid #aee3d8">
    <div class="cmp-title">형용사 / 명사 간접인용</div>
    <div class="cmp-row"><span class="badge">형용사</span>词干 + -다고</div>
    <div class="cmp-row"><span class="badge">명사(有收音)</span>명사 + -이라고</div>
    <div class="cmp-row"><span class="badge">명사(无收音)</span>명사 + -라고</div>
    <div class="cmp-row"><span class="ko">바쁘다고 해요</span><span class="zh">说（他）很忙</span></div>
    <div class="cmp-row"><span class="ko">학생이라고 해요</span><span class="zh">说（他）是学生</span></div>
  </div>
</div>`,
    quickTable: {
      title: '陈述句间接引语形式总览',
      headers: ['谓词类型', '接续', '예시', '缩略형'],
      rows: [
        [{ ko: '동사（有收音）', zh: '' }, { ko: '-는다고 하다', zh: '' }, { ko: '먹는다고 해요', zh: '说在吃' }, { ko: '-는대요', zh: '' }],
        [{ ko: '동사（无收音/ㄹ）', zh: '' }, { ko: '-ㄴ다고 하다', zh: '' }, { ko: '간다고 해요', zh: '说要去' }, { ko: '-ㄴ대요', zh: '' }],
        [{ ko: '형용사', zh: '形容词' }, { ko: '-다고 하다', zh: '' }, { ko: '좋다고 해요', zh: '说很好' }, { ko: '-대요', zh: '' }],
        [{ ko: '명사+이다', zh: '名词谓词' }, { ko: '-(이)라고 하다', zh: '' }, { ko: '학생이라고 해요', zh: '说是学生' }, { ko: '-(이)래요', zh: '' }],
        [{ ko: '과거시제', zh: '过去时' }, { ko: '-았/었다고 하다', zh: '' }, { ko: '먹었다고 해요', zh: '说吃了' }, { ko: '-았/었대요', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '陈述句间接引语',
      body: '测试对四种引语形式的掌握',
      questions: [
        {
          prompt: '朋友说很累。→ 친구가 ___',
          options: ['피곤한다고 했어요', '피곤이라고 했어요', '피곤하다고 했어요', '피곤는다고 했어요'],
          answer: 2 as 0|1|2|3,
          explanation: '형용사 → -다고 하다',
        },
        {
          prompt: '他说是医生。→ 의사___ 했어요',
          options: ['라고', '는다고', '이라고', '다고'],
          answer: 0 as 0|1|2|3,
          explanation: '의사 无收音 → -라고',
        },
        {
          prompt: '妈妈说吃了。→ 엄마가 먹___고 했어요',
          options: ['다', 'ㄴ다', '는다', '었다'],
          answer: 3 as 0|1|2|3,
          explanation: '过去时 → -았/었다고',
        },
        {
          prompt: '口语缩略：간다고 해요 → ___',
          options: ['간다요', '간대요', '가다요', '가래요'],
          answer: 1 as 0|1|2|3,
          explanation: '-ㄴ다고 해요 → -ㄴ대요',
        },
      ],
    },
    linkedGrammarIds: ['g78'],
  },

  {
    id: 'card-p11-l02',
    partNumber: 11,
    lessonNumber: 2,
    title: '疑问句间接引语',
    whatItDoes: '转述别人问的问题——"他问……"',
    whatItDoesBody: '疑问句间接引语把别人提问的内容转述出来，根据谓词类型有不同接续形式，统一用 -냐고 하다 收尾。\n口语中常用 -는지/은지/인지 代替 -냐고，与 알다/모르다 搭配更自然。\n含疑问词（뭐/어디/왜/언제/어떻게）时，疑问词保留在引语中。',
    structureNote: '动词：词干 + -느냐고/-냐고 하다\n形容词：词干 + -(으)냐고 하다\n名词谓词：名词 + -(이)냐고 하다\n过去时：-았/었냐고 하다',
    rulesNote: '口语 -냐고 比 -느냐고 更常用。\n与 알다/모르다 搭配时用 -는지/-은지/-인지，不用 -냐고。',
    structures: [
      {
        ko: '친구가 어디 사냐고 물었어요',
        zh: '朋友问住在哪里。',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '어디 사냐고', role: 'plain' },
          { text: '물었어요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 숙제를 했냐고 물어보셨어요',
        zh: '老师问作业做了吗。',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '숙제를', role: 'object' },
          { text: '했냐고 물어보셨어요', role: 'verb' },
        ],
      },
      {
        ko: '엄마가 배고프냐고 하셨어요',
        zh: '妈妈问饿不饿。',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '배고프냐고 하셨어요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람이 학생이냐고 물었어요',
        zh: '那个人问是不是学生。',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '학생이냐고 물었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词 + -느냐고/-냐고 하다（-냐고 更口语）', examples: '가다→가냐고 / 먹다→먹냐고' },
      { type: 'rule', text: '形容词 + -(으)냐고 하다', examples: '좋다→좋으냐고 / 바쁘다→바쁘냐고 / 크다→크냐고' },
      { type: 'rule', text: '名词+이다：-(이)냐고 하다（有收음：이냐고，无收음：냐고）', examples: '학생이냐고 / 의사냐고' },
      { type: 'rule', text: '过去时：-았/었냐고 하다', examples: '갔냐고 / 먹었냐고 / 좋았냐고' },
      { type: 'usage', text: '-는지/-은지/-인지 는 알다/모르다 와 결합할 때는 委婉한 간접의문', examples: '어디 사는지 알아요? / 바쁜지 몰라요' },
      { type: 'usage', text: '含疑问词时疑问词保留在引语中', examples: '왜 늦었냐고 물었어요 / 언제 오냐고 했어요 / 어떻게 했냐고 물었어요' },
      { type: 'note', text: '묻다/물어보다 是最常用的主动词，하다 也可以', examples: '뭐냐고 물었어요 / 뭐냐고 하던데요' },
      { type: 'compare', text: '-냐고 물었다 vs -는지 알다：前者转述提问，后者表示间接疑问', examples: '어디 사냐고 물었어요（他问住哪）vs 어디 사는지 알아요?（知道住哪吗？）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '왜 울었냐고', role: 'plain' },
          { text: '물었어요', role: 'verb' },
        ],
        zh: '朋友问为什么哭了。',
        swapWords: ['왜 울었냐고 물었어요', '언제 왔냐고 물었어요', '뭐 먹었냐고 물었어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '밥은 먹었냐고', role: 'plain' },
          { text: '하셨어요', role: 'verb' },
        ],
        zh: '妈妈问饭吃了没。',
        swapWords: ['밥은 먹었냐고 하셨어요', '숙제는 했냐고 하셨어요', '잘 잤냐고 하셨어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '그 사람이', role: 'subject' },
          { text: '한국 사람이냐고', role: 'plain' },
          { text: '물어봤어요', role: 'verb' },
        ],
        zh: '那个人问是不是韩国人。',
        swapWords: ['한국 사람이냐고 물어봤어요', '학생이냐고 물어봐요', '여기 처음이냐고 물어봤어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '언제', role: 'time' },
          { text: '오냐고', role: 'plain' },
          { text: '물었어요', role: 'verb' },
        ],
        zh: '问什么时候来。',
        swapWords: ['언제 오냐고 물었어요', '왜 늦었냐고 물었어요', '어떻게 갔냐고 물었어요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '💬', context: '转述提问', ko: '선생님이 숙제를 다 했냐고 물어보셨어요.', zh: '老师问作业都做完了吗。' },
      { icon: '📱', context: '日常对话', ko: 'A: 뭐라고 했어요? B: 몇 시에 만나냐고 했어요.', zh: 'A：说什么了？B：问几点见面。' },
      { icon: '🎵', context: 'KPOP', ko: '그 노래에서 "나를 좋아하냐고" 묻는 가사가 너무 좋아요.', zh: '那首歌里"喜不喜欢我"的歌词太好了。' },
      { icon: '🏥', context: '诊室场景', ko: '의사가 어디가 아프냐고 물어봤어요.', zh: '医生问哪里不舒服。' },
      { icon: '✈️', context: '旅行场景', ko: '호텔 직원이 몇 박을 할 거냐고 물었어요.', zh: '酒店员工问要住几晚。' },
      { icon: '🏫', context: '간접의문', ko: '그 사람이 어디 사는지 혹시 알아요?', zh: '你知道那个人住哪里吗？' },
    ],
    mistakes: [
      { wrong: '친구가 바쁘는냐고 물었어요（形容词加 -는냐고）', correct: '친구가 바쁘냐고 물었어요', note: '형용사는 -(으)냐고，不加 -는。바쁘다 → 바쁘냐고。' },
      { wrong: '의사이냐고 물었어요（无收音名词加 이냐고）', correct: '의사냐고 물었어요', note: '무받침 명사 + 냐고，유받침 명사 + 이냐고。의사 무받침 → 의사냐고。' },
      { wrong: '어디 가느냐고 알아요?（-느냐고 与 알다 搭配）', correct: '어디 가는지 알아요?', note: '与 알다/모르다 搭配用 -는지，不用 -냐고。' },
      { wrong: '먹었는냐고 물었어요（过去时加 는냐고）', correct: '먹었냐고 물었어요', note: '过去时 -았/었- 后直接加 -냐고，不加 -는。' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第2课</div>
    <div class="ov-hero-title">疑问句间接引语</div>
    <div class="ov-hero-sub">转述他人提问的表达方式</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">四种形式</div></div>
    <div class="ov-block">
      <div class="badge">동사</div>
      <div class="ko">-느냐고/-냐고 하다</div>
      <div class="zh">가냐고 물었어요</div>
    </div>
    <div class="ov-block">
      <div class="badge">형용사</div>
      <div class="ko">-(으)냐고 하다</div>
      <div class="zh">바쁘냐고 물었어요</div>
    </div>
    <div class="ov-block">
      <div class="badge">명사+이다</div>
      <div class="ko">-(이)냐고 하다</div>
      <div class="zh">학생이냐고 물었어요</div>
    </div>
    <div class="ov-block">
      <div class="badge">委婉간접의문</div>
      <div class="ko">-는지/-은지 알다/모르다</div>
      <div class="zh">어디 사는지 알아요?</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="step0-hook">
  <div class="hook-box">
    <div class="hook-sent"><span class="ko">친구가 어디 사냐고 물었어요.</span><span class="zh">朋友问住在哪里。</span></div>
    <div class="hook-sent"><span class="ko">엄마가 밥 먹었냐고 하셨어요.</span><span class="zh">妈妈问饭吃了没。</span></div>
  </div>
</div>`,
    compareLabel: '-냐고 vs -는지',
    compareHtml: `<div class="compare">
  <div class="cmp-block" style="border-left:4px solid #ff7fa8">
    <div class="cmp-title">-(느)냐고 하다</div>
    <div class="cmp-row"><span class="badge">意思</span>转述他人提问</div>
    <div class="cmp-row"><span class="badge">搭配</span>묻다 / 물어보다 / 하다</div>
    <div class="cmp-row"><span class="ko">왜 왔냐고 물었어요</span><span class="zh">问为什么来了</span></div>
    <div class="cmp-row"><span class="ko">학생이냐고 했어요</span><span class="zh">问是不是学生</span></div>
  </div>
  <div class="cmp-block" style="border-left:4px solid #aee3d8">
    <div class="cmp-title">-는지/-은지 알다/모르다</div>
    <div class="cmp-row"><span class="badge">意思</span>间接疑问，知不知道</div>
    <div class="cmp-row"><span class="badge">搭配</span>알다 / 모르다</div>
    <div class="cmp-row"><span class="ko">어디 사는지 알아요?</span><span class="zh">知道住哪里吗？</span></div>
    <div class="cmp-row"><span class="ko">바쁜지 몰라요</span><span class="zh">不知道忙不忙</span></div>
  </div>
</div>`,
    quickTable: {
      title: '疑问句间接引语形式总览',
      headers: ['谓词类型', '接续', '예시', '意思'],
      rows: [
        [{ ko: '동사', zh: '动词' }, { ko: '-느냐고/-냐고', zh: '' }, { ko: '가냐고 물었어요', zh: '问去不去' }, { ko: '', zh: '' }],
        [{ ko: '형용사', zh: '形容词' }, { ko: '-(으)냐고', zh: '' }, { ko: '바쁘냐고 물었어요', zh: '问忙不忙' }, { ko: '', zh: '' }],
        [{ ko: '명사+이다', zh: '名词谓词' }, { ko: '-(이)냐고', zh: '' }, { ko: '학생이냐고 물었어요', zh: '问是不是学生' }, { ko: '', zh: '' }],
        [{ ko: '과거시제', zh: '过去时' }, { ko: '-았/었냐고', zh: '' }, { ko: '먹었냐고 물었어요', zh: '问吃了没' }, { ko: '', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '疑问句间接引语',
      body: '测试对疑问句引语形式的掌握',
      questions: [
        {
          prompt: '朋友问累不累。→ 친구가 피곤___ 물었어요',
          options: ['하는냐고', '하냐고요', '이냐고', '하냐고'],
          answer: 3 as 0|1|2|3,
          explanation: '형용사 피곤하다 → 피곤하냐고',
        },
        {
          prompt: '老师问作业做了吗。→ 선생님이 숙제를 했___ 물어보셨어요',
          options: ['는냐고', '냐고', '다고', '라고'],
          answer: 1 as 0|1|2|3,
          explanation: '过去时 했다 → 했냐고',
        },
        {
          prompt: '问是不是医生。→ 의사___ 물었어요',
          options: ['냐고', '라고', '느냐고', '이냐고'],
          answer: 0 as 0|1|2|3,
          explanation: '의사 无收音 → 의사냐고',
        },
        {
          prompt: '知道他住哪里吗？→ 그 사람이 어디 사___ 알아요?',
          options: ['느냐고', '는다고', '는지', '냐고'],
          answer: 2 as 0|1|2|3,
          explanation: '与 알다 搭配用 -는지',
        },
      ],
    },
    linkedGrammarIds: ['g78', 'g80'],
  },

  {
    id: 'card-p11-l03',
    partNumber: 11,
    lessonNumber: 3,
    title: '命令句/共动句间接引语',
    whatItDoes: '转述"叫人做某事"或"叫人一起做某事"',
    whatItDoesBody: '命令句间接引语用 -(으)라고 하다 转述别人的命令或请求。\n共动句间接引语用 -자고 하다 转述别人的邀请或提议一起做某事。\n两者形式固定，不区分动词词干是否有收音。',
    structureNote: '命令句：动词词干 + -(으)라고 하다\n共动句：动词词干 + -자고 하다\n命令句否定：-지 말라고 하다',
    rulesNote: '-(으)라고 的으 在有收音词干后加，无收音词干直接 -라고。\n-자고 형태는 固定，不变。\n하다 자체도 해라체→하라고，하자체→하자고。',
    structures: [
      {
        ko: '선생님이 조용히 하라고 하셨어요',
        zh: '老师叫（大家）安静。',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '조용히 하라고', role: 'plain' },
          { text: '하셨어요', role: 'verb' },
        ],
      },
      {
        ko: '엄마가 빨리 일어나라고 하셨어요',
        zh: '妈妈叫快点起床。',
        tokens: [
          { text: '엄마가', role: 'subject' },
          { text: '빨리 일어나라고', role: 'plain' },
          { text: '하셨어요', role: 'verb' },
        ],
      },
      {
        ko: '친구가 같이 밥을 먹자고 했어요',
        zh: '朋友提议一起吃饭。',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '같이 밥을', role: 'object' },
          { text: '먹자고 했어요', role: 'verb' },
        ],
      },
      {
        ko: '의사가 술을 마시지 말라고 했어요',
        zh: '医生叫不要喝酒。',
        tokens: [
          { text: '의사가', role: 'subject' },
          { text: '술을', role: 'object' },
          { text: '마시지 말라고 했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '命令句：동사 词干 + -(으)라고 하다（有收音+으라고，无收音+라고）', examples: '먹다→먹으라고 / 가다→가라고 / 앉다→앉으라고 / 만들다→만들라고' },
      { type: 'rule', text: '命令句否定：동사 词干 + -지 말라고 하다', examples: '가지 말라고 했어요（叫不要去）/ 먹지 말라고 했어요（叫不要吃）' },
      { type: 'rule', text: '共动句：동사 词干 + -자고 하다（形式固定，不区分收音）', examples: '가다→가자고 / 먹다→먹자고 / 공부하다→공부하자고' },
      { type: 'usage', text: '命令句引语的主动词：하다/시키다/부탁하다/요청하다 等', examples: '가라고 했어요 / 앉으라고 시켰어요 / 도와달라고 부탁했어요' },
      { type: 'usage', text: '共动句引语的主动词：하다/제안하다/권하다 等', examples: '같이 가자고 했어요 / 같이 먹자고 제안했어요' },
      { type: 'note', text: '-아/어 주라고 하다 = 叫（帮忙）做某事（带请求语气）', examples: '도와주라고 했어요（叫帮忙）/ 가르쳐 주라고 했어요（叫教一下）' },
      { type: 'compare', text: '-(으)라고 vs -(으)세요：前者是转述，后者是直接命令/请求', examples: '직접: 앉으세요（请坐）→ 간접: 앉으라고 하셨어요（叫坐下）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '선생님이', role: 'subject' },
          { text: '책을', role: 'object' },
          { text: '읽으라고', role: 'plain' },
          { text: '하셨어요', role: 'verb' },
        ],
        zh: '老师叫读书。',
        swapWords: ['읽으라고 하셨어요', '읽지 말라고 하셨어요', '같이 읽자고 하셨어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '같이', role: 'plain' },
          { text: '운동하자고', role: 'plain' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '朋友提议一起运动。',
        swapWords: ['운동하자고 했어요', '공부하자고 했어요', '여행 가자고 했어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '엄마가', role: 'subject' },
          { text: '늦게 자지', role: 'plain' },
          { text: '말라고', role: 'plain' },
          { text: '하셨어요', role: 'verb' },
        ],
        zh: '妈妈叫不要晚睡。',
        swapWords: ['말라고 하셨어요', '말라고 했어요', '말라고 하시는데요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '선생님이', role: 'subject' },
          { text: '조용히 하라고', role: 'plain' },
          { text: '하셨어요', role: 'verb' },
        ],
        zh: '老师叫安静。',
        swapWords: ['조용히 하라고 하셨어요', '앉으라고 하셨어요', '나가지 말라고 하셨어요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🏫', context: '课堂场景', ko: '선생님이 교과서 10페이지를 펴라고 하셨어요.', zh: '老师叫打开教科书第10页。' },
      { icon: '👨‍👩‍👧', context: '家庭场景', ko: '엄마가 방 청소하라고 하셨어요.', zh: '妈妈叫打扫房间。' },
      { icon: '🎵', context: 'KPOP 演唱会', ko: '가수가 다 같이 노래하자고 했어요.', zh: '歌手提议大家一起唱歌。' },
      { icon: '🏥', context: '医疗建议', ko: '의사가 운동을 꾸준히 하라고 했어요.', zh: '医生叫坚持运动。' },
      { icon: '💬', context: '转述请求', ko: '그 사람이 문을 닫아 달라고 했어요.', zh: '那个人叫把门关上。' },
      { icon: '✈️', context: '旅行场景', ko: '가이드가 여기서 기다리라고 했어요.', zh: '导游叫在这里等。' },
    ],
    mistakes: [
      { wrong: '선생님이 앉으자고 했어요（命令句用 -자고）', correct: '선생님이 앉으라고 했어요', note: '-자고 是共动句（一起做），-(으)라고 才是命令句（叫别人做）。' },
      { wrong: '친구가 가자라고 했어요（-자라고 不存在）', correct: '친구가 가자고 했어요', note: '共动句引语固定用 -자고，不存在 -자라고 形式。' },
      { wrong: '가지 않으라고 했어요（否定命令用 않다）', correct: '가지 말라고 했어요', note: '命令句否定固定用 -지 말라고，不用 -지 않으라고。' },
      { wrong: '먹으라고 하라고 했어요（重复 하다）', correct: '먹으라고 했어요', note: '引语动词 하다 只用一次，不重复。' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第3课</div>
    <div class="ov-hero-title">命令句/共动句间接引语</div>
    <div class="ov-hero-sub">转述命令与邀请的表达方式</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">两种形式</div></div>
    <div class="ov-block">
      <div class="badge">命令句</div>
      <div class="ko">동사 词干 + -(으)라고 하다</div>
      <div class="zh">가라고 했어요 / 먹으라고 했어요</div>
    </div>
    <div class="ov-block">
      <div class="badge">命令否定</div>
      <div class="ko">동사 词干 + -지 말라고 하다</div>
      <div class="zh">가지 말라고 했어요</div>
    </div>
    <div class="ov-block">
      <div class="badge">共动句</div>
      <div class="ko">동사 词干 + -자고 하다</div>
      <div class="zh">같이 가자고 했어요</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="step0-hook">
  <div class="hook-box">
    <div class="hook-sent"><span class="ko">선생님이 조용히 하라고 하셨어요.</span><span class="zh">老师叫大家安静。</span></div>
    <div class="hook-sent"><span class="ko">친구가 같이 영화 보자고 했어요.</span><span class="zh">朋友提议一起看电影。</span></div>
  </div>
</div>`,
    compareLabel: '-(으)라고 vs -자고',
    compareHtml: `<div class="compare">
  <div class="cmp-block" style="border-left:4px solid #ff7fa8">
    <div class="cmp-title">-(으)라고 하다（命令）</div>
    <div class="cmp-row"><span class="badge">意思</span>叫（别人）做某事</div>
    <div class="cmp-row"><span class="badge">接续</span>동사 词干 + -(으)라고</div>
    <div class="cmp-row"><span class="badge">否定</span>-지 말라고 하다</div>
    <div class="cmp-row"><span class="ko">빨리 오라고 했어요</span><span class="zh">叫快点来</span></div>
    <div class="cmp-row"><span class="ko">떠들지 말라고 했어요</span><span class="zh">叫不要吵闹</span></div>
  </div>
  <div class="cmp-block" style="border-left:4px solid #aee3d8">
    <div class="cmp-title">-자고 하다（邀请/提议）</div>
    <div class="cmp-row"><span class="badge">意思</span>提议一起做某事</div>
    <div class="cmp-row"><span class="badge">接续</span>동사 词干 + -자고（固定）</div>
    <div class="cmp-row"><span class="badge">语感</span>邀请、商量语气</div>
    <div class="cmp-row"><span class="ko">같이 가자고 했어요</span><span class="zh">提议一起去</span></div>
    <div class="cmp-row"><span class="ko">같이 공부하자고 했어요</span><span class="zh">提议一起学习</span></div>
  </div>
</div>`,
    quickTable: {
      title: '命令/共动간접인용 형식',
      headers: ['类型', '形式', '예시', '意思'],
      rows: [
        [{ ko: '명령（有收音）', zh: '' }, { ko: '词干 + -으라고', zh: '' }, { ko: '먹으라고 했어요', zh: '叫吃' }, { ko: '', zh: '' }],
        [{ ko: '명령（无收音）', zh: '' }, { ko: '词干 + -라고', zh: '' }, { ko: '가라고 했어요', zh: '叫去' }, { ko: '', zh: '' }],
        [{ ko: '명령 否定', zh: '' }, { ko: '词干 + -지 말라고', zh: '' }, { ko: '가지 말라고 했어요', zh: '叫不要去' }, { ko: '', zh: '' }],
        [{ ko: '공동（邀请）', zh: '' }, { ko: '词干 + -자고', zh: '' }, { ko: '가자고 했어요', zh: '提议去' }, { ko: '', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '命令句/共动句间接引语',
      body: '测试对两种引语形式的掌握',
      questions: [
        {
          prompt: '老师叫坐下。→ 선생님이 앉___ 하셨어요',
          options: ['으라고', '으냐고', '는다고', '자고'],
          answer: 0 as 0|1|2|3,
          explanation: '命令句：앉다（有收音）→ 앉으라고',
        },
        {
          prompt: '朋友提议一起去旅行。→ 친구가 같이 여행 가___ 했어요',
          options: ['라고', '자고', '냐고', '다고'],
          answer: 1 as 0|1|2|3,
          explanation: '共动句：가다 → 가자고',
        },
        {
          prompt: '医生叫不要喝酒。→ 의사가 술을 마시지 ___ 했어요',
          options: ['않자고', '말자고', '않으라고', '말라고'],
          answer: 3 as 0|1|2|3,
          explanation: '命令否定：-지 말라고 하다',
        },
        {
          prompt: '妈妈叫快点回家。→ 엄마가 빨리 집에 오___ 하셨어요',
          options: ['으라고', '냐고', '라고', '자고'],
          answer: 2 as 0|1|2|3,
          explanation: '오다 无收音 → 오라고',
        },
      ],
    },
    linkedGrammarIds: ['g78'],
  },

  {
    id: 'card-p11-l04',
    partNumber: 11,
    lessonNumber: 4,
    title: '-(으)니까, -(으)니, -아/어/여 보니까',
    whatItDoes: '表示"因为……所以……"和"一……就发现……"',
    whatItDoesBody: '-(으)니까 表示原因或理由，比 -아/어서 更强调说话人的主观判断，后句可以接命令、建议、邀请。\n-(으)니 是 -(으)니까 的缩略，多用于口语或连接后续陈述。\n-아/어/여 보니까 表示"做了某事之后发现/才知道"，强调亲身体验后的发现。',
    structureNote: '-(으)니까：有收音+으니까，无收音+니까\n-(으)니：有收音+으니，无收音+니\n-아/어/여 보니까：동사 + 아/어/여 보니까',
    rulesNote: '-(으)니까 后面可以接命令（-세요）、提议（-ㅂ시다）等，-아/어서 不可以。\n-아/어/여 보니까 强调亲身做过后的新发现，前后主语通常相同。',
    structures: [
      {
        ko: '비가 오니까 우산을 가져가세요',
        zh: '因为下雨，带把伞去吧。',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '오니까', role: 'plain' },
          { text: '우산을', role: 'object' },
          { text: '가져가세요', role: 'verb' },
        ],
      },
      {
        ko: '피곤하니까 일찍 자는 게 좋겠어요',
        zh: '因为累，早点睡比较好。',
        tokens: [
          { text: '피곤하니까', role: 'plain' },
          { text: '일찍 자는 게', role: 'plain' },
          { text: '좋겠어요', role: 'verb' },
        ],
      },
      {
        ko: '직접 먹어 보니까 생각보다 맛있었어요',
        zh: '亲自吃了之后发现比想象中好吃。',
        tokens: [
          { text: '직접 먹어 보니까', role: 'plain' },
          { text: '생각보다', role: 'plain' },
          { text: '맛있었어요', role: 'verb' },
        ],
      },
      {
        ko: '한국에 살아 보니까 생각보다 살기 좋더라고요',
        zh: '在韩国住了之后发现比想象中好住。',
        tokens: [
          { text: '한국에', role: 'place' },
          { text: '살아 보니까', role: 'plain' },
          { text: '생각보다 살기 좋더라고요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-(으)니까：有收音词干 + -으니까，无收音词干 + -니까', examples: '먹다→먹으니까 / 가다→가니까 / 피곤하다→피곤하니까' },
      { type: 'rule', text: '-(으)니：-(으)니까 的缩略，后句更常是陈述或继续说明', examples: '보니 생각보다 어렵더라고요 / 들으니 재미있을 것 같아요' },
      { type: 'rule', text: '-아/어/여 보니까：동사 + 아/어/여 보니까（"尝试后发现"）', examples: '먹어 보니까 / 해 보니까 / 가 보니까 / 살아 보니까' },
      { type: 'usage', text: '-(으)니까 后可接命令/提议/禁止，这是与 -아/어서 的关键区别', examples: '늦으니까 빨리 가세요（因为晚了，快走）/ 바쁘니까 나중에 얘기해요（因为忙，等会儿说）' },
      { type: 'usage', text: '-아/어서 后不能接命令/提议，只能陈述结果', examples: '비가 와서 우산을 가져갔어요（OK）vs 비가 와서 우산을 가져가세요（×）' },
      { type: 'note', text: '-아/어/여 보니까 中的 보다 是补助动词"尝试"，不是"看"', examples: '살아 보니까（住了之后发现）/ 먹어 보니까（吃了之后发现）' },
      { type: 'compare', text: '-(으)니까 vs -아/어서：用法上最大区别是后句能否接命令/提议', examples: '피곤하니까 쉬세요（因为累，休息吧 ✓）vs 피곤해서 쉬세요（×）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '날씨가', role: 'subject' },
          { text: '춥니까', role: 'plain' },
          { text: '따뜻하게 입으세요', role: 'verb' },
        ],
        zh: '因为天气冷，穿暖和点吧。',
        swapWords: ['춥니까 따뜻하게 입으세요', '좋으니까 산책해요', '늦으니까 빨리 가요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '이 카페에', role: 'place' },
          { text: '와 보니까', role: 'plain' },
          { text: '분위기가 정말 좋아요', role: 'verb' },
        ],
        zh: '来了这家咖啡厅之后发现氛围真的很好。',
        swapWords: ['와 보니까 분위기가 좋아요', '와 보니까 생각보다 비싸요', '와 보니까 메뉴가 다양해요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '시간이', role: 'subject' },
          { text: '없으니까', role: 'plain' },
          { text: '나중에 이야기해요', role: 'verb' },
        ],
        zh: '因为没时间，等会儿再说吧。',
        swapWords: ['없으니까 나중에 이야기해요', '있으니까 지금 이야기해요', '없으니까 빨리 끝내요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '한번 해 보니까', role: 'plain' },
          { text: '생각보다', role: 'plain' },
          { text: '어렵지 않아요', role: 'verb' },
        ],
        zh: '试了一次之后发现没想象中难。',
        swapWords: ['생각보다 어렵지 않아요', '생각보다 재미있어요', '생각보다 쉬워요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🌧️', context: '日常建议', ko: '밖에 비가 오니까 우산 챙기는 거 잊지 마세요.', zh: '外面在下雨，别忘了带伞。' },
      { icon: '🍜', context: '饮食体验', ko: '직접 먹어 보니까 정말 맛있더라고요. 추천해요.', zh: '亲自吃了之后发现真的很好吃，推荐。' },
      { icon: '🇰🇷', context: '旅行发现', ko: '한국에 가 보니까 생각보다 물가가 높더라고요.', zh: '去了韩国之后发现物价比想象中高。' },
      { icon: '📚', context: '学习场景', ko: '공부해 보니까 이 책이 제일 도움이 됐어요.', zh: '学了之后发现这本书最有帮助。' },
      { icon: '🎵', context: 'KPOP', ko: '그 노래를 들어 보니까 왜 인기 있는지 알겠어요.', zh: '听了那首歌之后明白为什么那么受欢迎了。' },
      { icon: '💬', context: '-(으)니', ko: '보니 생각보다 간단하더라고요.', zh: '看了之后发现比想象中简单。' },
    ],
    mistakes: [
      { wrong: '피곤해서 쉬세요（-아/어서 接命令句）', correct: '피곤하니까 쉬세요', note: '-아/어서 후절에 명령/청유 불가。命令句前必须用 -(으)니까。' },
      { wrong: '먹어보니까（보니까 连写）', correct: '먹어 보니까', note: '-아/어/여 보니까 中 보다 是补助动词，与前面的 아/어 分开写。' },
      { wrong: '가니까서 늦었어요（混用两个原因语尾）', correct: '가니까 늦었어요 或 가서 늦었어요', note: '-니까 和 -아/어서 只能用一个，不能叠加。' },
      { wrong: '춥으니까（ㅂ불규칙 형용사 오류）', correct: '추우니까', note: '춥다는 ㅂ 불규칙：词干末 ㅂ + 으니까 → ㅂ→우 변환 → 추우니까。' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第4课</div>
    <div class="ov-hero-title">-(으)니까, -(으)니, -아/어/여 보니까</div>
    <div class="ov-hero-sub">原因陈述与亲身发现的表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">原因（可接命令）</div>
      <div class="ko">-(으)니까</div>
      <div class="zh">因为……（后可接命令/建议）</div>
    </div>
    <div class="ov-block">
      <div class="badge">缩略形</div>
      <div class="ko">-(으)니</div>
      <div class="zh">-(으)니까 의 口语缩略</div>
    </div>
    <div class="ov-block">
      <div class="badge">亲身发现</div>
      <div class="ko">-아/어/여 보니까</div>
      <div class="zh">做了之后发现……</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="step0-hook">
  <div class="hook-box">
    <div class="hook-sent"><span class="ko">비가 오니까 우산을 가져가세요.</span><span class="zh">因为下雨，带把伞去吧。</span></div>
    <div class="hook-sent"><span class="ko">직접 먹어 보니까 정말 맛있더라고요.</span><span class="zh">亲自吃了之后发现真的很好吃。</span></div>
  </div>
</div>`,
    compareLabel: '-(으)니까 vs -아/어서',
    compareHtml: `<div class="compare">
  <div class="cmp-block" style="border-left:4px solid #ff7fa8">
    <div class="cmp-title">-(으)니까</div>
    <div class="cmp-row"><span class="badge">后句</span>可接命令/提议/禁止</div>
    <div class="cmp-row"><span class="badge">语感</span>主观判断，强调理由</div>
    <div class="cmp-row"><span class="ko">피곤하니까 쉬세요</span><span class="zh">累了，休息吧 ✓</span></div>
    <div class="cmp-row"><span class="ko">늦으니까 빨리 가요</span><span class="zh">晚了，快走 ✓</span></div>
  </div>
  <div class="cmp-block" style="border-left:4px solid #aee3d8">
    <div class="cmp-title">-아/어서</div>
    <div class="cmp-row"><span class="badge">后句</span>只能接陈述/结果</div>
    <div class="cmp-row"><span class="badge">语感</span>客观原因，顺序关系</div>
    <div class="cmp-row"><span class="ko">피곤해서 쉬었어요</span><span class="zh">因为累，休息了 ✓</span></div>
    <div class="cmp-row"><span class="ko">피곤해서 쉬세요</span><span class="zh">× 不自然</span></div>
  </div>
</div>`,
    quickTable: {
      title: '-(으)니까 接续形式',
      headers: ['词干末音', '形式', '예시', '意思'],
      rows: [
        [{ ko: '有收音', zh: '' }, { ko: '-으니까', zh: '' }, { ko: '먹으니까', zh: '因为吃' }, { ko: '', zh: '' }],
        [{ ko: '无收音', zh: '' }, { ko: '-니까', zh: '' }, { ko: '가니까', zh: '因为去' }, { ko: '', zh: '' }],
        [{ ko: 'ㄹ 词干', zh: '' }, { ko: '-니까（ㄹ脱落）', zh: '' }, { ko: '만들다→만드니까', zh: '因为做' }, { ko: '', zh: '' }],
        [{ ko: 'ㅂ 불규칙', zh: 'ㅂ不规则' }, { ko: '-우니까', zh: '' }, { ko: '춥다→추우니까', zh: '因为冷' }, { ko: '', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-(으)니까, -아/어/여 보니까',
      body: '测试对两个语法点的掌握',
      questions: [
        {
          prompt: '因为天气好，去散步吧。→ 날씨가 좋___ 산책해요',
          options: ['니까', '아서', '으면', '으니까'],
          answer: 3 as 0|1|2|3,
          explanation: '좋다 有收音ㅎ → 좋으니까（有收音词干 + -으니까）',
        },
        {
          prompt: '亲自做了之后发现很简单。→ 직접 해 ___ 쉽더라고요',
          options: ['봤으니까', '보니까', '보면', '보다가'],
          answer: 1 as 0|1|2|3,
          explanation: '-아/어 보니까 = 尝试后发现',
        },
        {
          prompt: '-(으)니까 与 -아/어서 最关键的区别是？',
          options: ['两者都不能接命令句', '-아/어서 更正式', '-(으)니까 后可接命令句，-아/어서 不可以', '意思完全相同'],
          answer: 2 as 0|1|2|3,
          explanation: '-(으)니까 후절에 명령/청유 가능，-아/어서 불가',
        },
        {
          prompt: '去了之后发现很漂亮。→ 가 ___ 정말 예쁘더라고요',
          options: ['보니까', '보니까요', '봤더니', '봤으니까'],
          answer: 0 as 0|1|2|3,
          explanation: '가다 → 가 + 보니까',
        },
      ],
    },
    linkedGrammarIds: ['g24'],
  },

  {
    id: 'card-p11-l05',
    partNumber: 11,
    lessonNumber: 5,
    title: '(으)로 유명하다, 이/가 되다',
    whatItDoes: '表示"以……著名"和"成为……/变成……"',
    whatItDoesBody: '(으)로 유명하다 表示某人或某地"以某事物著名"，로 后接名词。\n-기로 유명하다 表示某人或某地"以做某事著名"，기로 后接动词名词化形式。\n이/가 되다 表示"成为……"，是描述身份、状态变化的核心表达。',
    structureNote: '(으)로 유명하다：名词 + (으)로 유명하다\n-기로 유명하다：动词词干 + 기로 유명하다\n이/가 되다：名词 + 이/가 되다',
    rulesNote: '(으)로：名词有收音 + 으로，无收音/ㄹ結尾 + 로。\n이/가 되다 中 되다 本身可变时态：돼요/됐어요/될 거예요。\n이/가 되다 前的名词根据收音选 이（有）或 가（无）。',
    structures: [
      {
        ko: '제주도는 경치로 유명해요',
        zh: '济州岛以风景著名。',
        tokens: [
          { text: '제주도는', role: 'subject' },
          { text: '경치로', role: 'plain' },
          { text: '유명해요', role: 'verb' },
        ],
      },
      {
        ko: '그 배우는 춤을 잘 추기로 유명해요',
        zh: '那个演员以擅长跳舞著名。',
        tokens: [
          { text: '그 배우는', role: 'subject' },
          { text: '춤을 잘 추기로', role: 'plain' },
          { text: '유명해요', role: 'verb' },
        ],
      },
      {
        ko: '저는 선생님이 되고 싶어요',
        zh: '我想成为老师。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '선생님이', role: 'plain' },
          { text: '되고 싶어요', role: 'verb' },
        ],
      },
      {
        ko: '드디어 봄이 됐어요',
        zh: '终于到春天了。',
        tokens: [
          { text: '드디어', role: 'plain' },
          { text: '봄이', role: 'plain' },
          { text: '됐어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '명사 + (으)로 유명하다：有收音+으로，无收音/ㄹ+로', examples: '음식으로 유명해요 / 경치로 유명해요 / K-pop으로 유명해요' },
      { type: 'rule', text: '동사 词干 + -기로 유명하다：以做某事著名', examples: '노래를 잘 하기로 유명해요 / 오래 걷기로 유명해요' },
      { type: 'rule', text: '명사 + 이/가 되다：有收音+이 되다，无收音+가 되다', examples: '의사가 됐어요 / 선생님이 됐어요 / 친구가 됐어요' },
      { type: 'usage', text: '이/가 되다 可表示身份变化、时间到来、状况变化', examples: '봄이 됐어요（到春天了）/ 어른이 됐어요（成大人了）/ 문제가 됐어요（成了问题）' },
      { type: 'usage', text: '유명하다 的否定：유명하지 않다 / 별로 안 유명해요', examples: '이 가수는 아직 별로 안 유명해요（这个歌手还不太出名）' },
      { type: 'note', text: '이/가 되다 vs 이/가 아니다：前者表变化结果，后者表否定存在', examples: '선생님이 됐어요（成为了老师）vs 선생님이 아니에요（不是老师）' },
      { type: 'compare', text: '(으)로 유명하다 vs -기로 유명하다：前者接名词，后者接动词', examples: '김치로 유명해요（名词：以泡菜著名）vs 김치를 잘 만들기로 유명해요（动词：以擅长做泡菜著名）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '서울은', role: 'subject' },
          { text: 'K-pop으로', role: 'plain' },
          { text: '유명해요', role: 'verb' },
        ],
        zh: '首尔以K-pop著名。',
        swapWords: ['K-pop으로 유명해요', '야경으로 유명해요', '쇼핑으로 유명해요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '나중에', role: 'time' },
          { text: '의사가', role: 'plain' },
          { text: '되고 싶어요', role: 'verb' },
        ],
        zh: '我以后想成为医生。',
        swapWords: ['의사가 되고 싶어요', '선생님이 되고 싶어요', '디자이너가 되고 싶어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '그 식당은', role: 'subject' },
          { text: '맛있기로', role: 'plain' },
          { text: '유명해요', role: 'verb' },
        ],
        zh: '那家餐厅以好吃著名。',
        swapWords: ['맛있기로 유명해요', '저렴하기로 유명해요', '줄이 길기로 유명해요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '드디어', role: 'plain' },
          { text: '대학생이', role: 'subject' },
          { text: '됐어요', role: 'verb' },
        ],
        zh: '终于成为大学生了。',
        swapWords: ['대학생이 됐어요', '직장인이 됐어요', '어른이 됐어요'],
        swapRole: 'subject',
      },
    ],
    scenarios: [
      { icon: '🇰🇷', context: '韩国文化', ko: '한국은 K-pop과 K-drama로 전 세계에 유명해요.', zh: '韩国以K-pop和K剧闻名全世界。' },
      { icon: '🎵', context: 'KPOP 偶像', ko: '그 그룹은 칼군무로 유명해요.', zh: '那个组合以整齐划一的舞蹈著名。' },
      { icon: '🍜', context: '美食推荐', ko: '이 식당은 냉면으로 유명한데 꼭 가 보세요.', zh: '这家餐厅以冷面著名，一定要去。' },
      { icon: '🎓', context: '职业愿望', ko: '어릴 때부터 선생님이 되고 싶었어요.', zh: '从小就想成为老师。' },
      { icon: '🌸', context: '季节变化', ko: '어느새 날씨가 따뜻해져서 봄이 된 것 같아요.', zh: '不知不觉天气变暖，好像到春天了。' },
      { icon: '📺', context: '韩剧场景', ko: '그 배우는 이 드라마로 유명해졌어요.', zh: '那个演员因为这部剧变得有名了。' },
    ],
    mistakes: [
      { wrong: '서울은 K-pop이로 유명해요（이로 不存在）', correct: '서울은 K-pop으로 유명해요', note: 'K-pop 以 p 收音结尾 → K-pop으로（有收音+으로）。' },
      { wrong: '의사이가 됐어요（이가 重复）', correct: '의사가 됐어요', note: '의사 无收音 → 의사가 되다，不加 이。이/가 只能选一个。' },
      { wrong: '그 사람은 노래로 유명해요（要表达"以唱歌好著名"）', correct: '그 사람은 노래를 잘 하기로 유명해요', note: '用动词表达"以做某事著名"时用 -기로 유명하다，用名词时用 (으)로 유명하다。' },
      { wrong: '됩니다 → 됬어요（됐의拼写错误）', correct: '됐어요', note: '되다 过去时：됐어요（되+었→됐），不是 됬어요。这是常见拼写错误。' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第5课</div>
    <div class="ov-hero-title">(으)로 유명하다, 이/가 되다</div>
    <div class="ov-hero-sub">著名理由与身份变化的表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">以名词著名</div>
      <div class="ko">명사 + (으)로 유명하다</div>
      <div class="zh">김치로 유명해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">以动作著名</div>
      <div class="ko">동사 词干 + -기로 유명하다</div>
      <div class="zh">노래를 잘 하기로 유명해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">成为/变成</div>
      <div class="ko">명사 + 이/가 되다</div>
      <div class="zh">선생님이 됐어요</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="step0-hook">
  <div class="hook-box">
    <div class="hook-sent"><span class="ko">제주도는 경치로 유명해요.</span><span class="zh">济州岛以风景著名。</span></div>
    <div class="hook-sent"><span class="ko">저는 나중에 선생님이 되고 싶어요.</span><span class="zh">我以后想成为老师。</span></div>
  </div>
</div>`,
    compareLabel: '(으)로 vs -기로 유명',
    compareHtml: `<div class="compare">
  <div class="cmp-block" style="border-left:4px solid #ff7fa8">
    <div class="cmp-title">(으)로 유명하다</div>
    <div class="cmp-row"><span class="badge">接续</span>名词 + (으)로</div>
    <div class="cmp-row"><span class="badge">意思</span>以某事物著名</div>
    <div class="cmp-row"><span class="ko">김치로 유명해요</span><span class="zh">以泡菜著名</span></div>
    <div class="cmp-row"><span class="ko">야경으로 유명해요</span><span class="zh">以夜景著名</span></div>
  </div>
  <div class="cmp-block" style="border-left:4px solid #aee3d8">
    <div class="cmp-title">-기로 유명하다</div>
    <div class="cmp-row"><span class="badge">接续</span>动词词干 + -기로</div>
    <div class="cmp-row"><span class="badge">意思</span>以做某事著名</div>
    <div class="cmp-row"><span class="ko">노래를 잘 하기로 유명해요</span><span class="zh">以唱歌好著名</span></div>
    <div class="cmp-row"><span class="ko">오래 걷기로 유명해요</span><span class="zh">以走路走得远著名</span></div>
  </div>
</div>`,
    quickTable: {
      title: '이/가 되다 접속 형식',
      headers: ['名词末音', '形式', '예시', '意思'],
      rows: [
        [{ ko: '无收音', zh: '' }, { ko: '명사 + 가 되다', zh: '' }, { ko: '의사가 됐어요', zh: '成为了医生' }, { ko: '', zh: '' }],
        [{ ko: '有收音', zh: '' }, { ko: '명사 + 이 되다', zh: '' }, { ko: '선생님이 됐어요', zh: '成为了老师' }, { ko: '', zh: '' }],
        [{ ko: '时间（有收音）', zh: '' }, { ko: '시간 + 이 되다', zh: '' }, { ko: '봄이 됐어요', zh: '到春天了' }, { ko: '', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '(으)로 유명하다, 이/가 되다',
      body: '测试对两个语法点的掌握',
      questions: [
        {
          prompt: '首尔以购物著名。→ 서울은 쇼핑___ 유명해요',
          options: ['으로', '로', '가로', '이로'],
          answer: 0 as 0|1|2|3,
          explanation: '쇼핑 末音节 핑 有收音（ㅇ）→ 쇼핑으로（有收音+으로）',
        },
        {
          prompt: '我想成为设计师。→ 저는 디자이너___ 되고 싶어요',
          options: ['로', '가', '이', '으로'],
          answer: 1 as 0|1|2|3,
          explanation: '디자이너 无收音 → 디자이너가 되다',
        },
        {
          prompt: '那个歌手以歌声好著名。→ 그 가수는 노래를 잘 하___ 유명해요',
          options: ['로', '으로', '기가', '기로'],
          answer: 3 as 0|1|2|3,
          explanation: '动词 하다 → 하기로 유명하다',
        },
        {
          prompt: '됐어요 的正确拼写是？',
          options: ['되요', '됬어요', '됐어요', '됬었어요'],
          answer: 2 as 0|1|2|3,
          explanation: '됐어요 = 되+었어요 의 축약형，됬어요/됬었어요는 오표기',
        },
      ],
    },
    linkedGrammarIds: ['g9', 'g73'],
  },

  {
    id: 'card-p11-l06',
    partNumber: 11,
    lessonNumber: 6,
    title: '-을/ㄹ 만하다, -는 게 좋겠다',
    whatItDoes: '表示"值得做某事"和"最好做某事"',
    whatItDoesBody: '-을/ㄹ 만하다 表示某事值得做、有意义，相当于"值得……"。\n-는 게 좋겠다 表示说话人的建议或婉转的劝告，相当于"最好……"或"还是……比较好"，比 -(으)세요 更委婉。',
    structureNote: '-을/ㄹ 만하다：동사 词干 + -을/ㄹ 만하다\n-는 게 좋겠다：동사 词干 + -는 게 좋겠다',
    rulesNote: '-을/ㄹ 만하다 中 만 是依存名词"价值"，前用冠词形 -을/ㄹ。\n-는 게 좋겠다 比 -는 게 좋아요 语气更委婉、更具建议性。겠 表示说话人的主观判断。',
    structures: [
      {
        ko: '이 영화는 볼 만해요',
        zh: '这部电影值得看。',
        tokens: [
          { text: '이 영화는', role: 'subject' },
          { text: '볼 만해요', role: 'verb' },
        ],
      },
      {
        ko: '이 식당은 한 번 가 볼 만해요',
        zh: '这家餐厅值得去一次。',
        tokens: [
          { text: '이 식당은', role: 'subject' },
          { text: '한 번 가 볼 만해요', role: 'verb' },
        ],
      },
      {
        ko: '지금 출발하는 게 좋겠어요',
        zh: '现在出发比较好。',
        tokens: [
          { text: '지금', role: 'time' },
          { text: '출발하는 게', role: 'plain' },
          { text: '좋겠어요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람한테 먼저 연락해 보는 게 좋겠어요',
        zh: '先联系那个人比较好。',
        tokens: [
          { text: '그 사람한테', role: 'plain' },
          { text: '먼저 연락해 보는 게', role: 'plain' },
          { text: '좋겠어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-을/ㄹ 만하다：有收音词干 + -을 만하다，无收音/ㄹ词干 + -ㄹ 만하다', examples: '먹다→먹을 만해요 / 가다→갈 만해요 / 볼 만해요 / 읽을 만해요' },
      { type: 'rule', text: '-는 게 좋겠다：동사 词干 + -는 게 좋겠어요（委婉建议）', examples: '쉬는 게 좋겠어요 / 먹는 게 좋겠어요 / 말하는 게 좋겠어요' },
      { type: 'usage', text: '-을/ㄹ 만하다 可与 -아/어 보다 结合：-아/어 볼 만하다', examples: '먹어 볼 만해요（值得尝尝）/ 가 볼 만한 곳이에요（值得去的地方）' },
      { type: 'usage', text: '-을/ㄹ 만하다 可作冠词形修饰名词：-을/ㄹ 만한 + 명사', examples: '볼 만한 영화（值得看的电影）/ 갈 만한 카페（值得去的咖啡厅）' },
      { type: 'note', text: '-는 게 좋겠다 의 겠 는 说话人主观推断，단순미래가 아닌 추측', examples: '병원에 가는 게 좋겠어요（建议你去医院）' },
      { type: 'compare', text: '-는 게 좋겠다 vs -(으)세요：建议语气从委婉到直接', examples: '쉬는 게 좋겠어요（委婉建议）< 쉬세요（直接命令）' },
      { type: 'compare', text: '-을/ㄹ 만하다 vs -을/ㄹ 것 같다：前者评价值得，后者推测', examples: '볼 만해요（值得看）vs 재미있을 것 같아요（感觉会很有趣）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 책은', role: 'subject' },
          { text: '읽을 만해요', role: 'verb' },
        ],
        zh: '这本书值得读。',
        swapWords: ['읽을 만해요', '사 볼 만해요', '선물할 만해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '감기에 걸렸으면', role: 'plain' },
          { text: '병원에 가는 게', role: 'plain' },
          { text: '좋겠어요', role: 'verb' },
        ],
        zh: '如果感冒了，最好去医院。',
        swapWords: ['가는 게 좋겠어요', '쉬는 게 좋겠어요', '약을 먹는 게 좋겠어요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '부산은', role: 'subject' },
          { text: '한 번 가 볼 만한', role: 'plain' },
          { text: '도시예요', role: 'verb' },
        ],
        zh: '釜山是值得去一次的城市。',
        swapWords: ['가 볼 만한 도시예요', '살아 볼 만한 도시예요', '여행할 만한 도시예요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '오늘은', role: 'time' },
          { text: '일찍 자는 게', role: 'plain' },
          { text: '좋겠어요', role: 'verb' },
        ],
        zh: '今天早点睡比较好。',
        swapWords: ['일찍 자는 게 좋겠어요', '집에서 쉬는 게 좋겠어요', '병원에 가는 게 좋겠어요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🎬', context: '电影推荐', ko: '이 영화 볼 만해요? 재미있어요?', zh: '这部电影值得看吗？好看吗？' },
      { icon: '🍜', context: '美食推荐', ko: '여기 음식 먹을 만해요. 한 번 와 보세요.', zh: '这里的食物值得吃，来试试吧。' },
      { icon: '💊', context: '健康建议', ko: '많이 피곤해 보이는데 오늘은 일찍 자는 게 좋겠어요.', zh: '看起来很累，今天早点睡比较好。' },
      { icon: '🎵', context: 'KPOP', ko: '이 앨범은 들을 만해요. 특히 타이틀곡이 좋아요.', zh: '这张专辑值得听，特别是主打曲很好。' },
      { icon: '📚', context: '学习建议', ko: '시험 전에 한 번 더 복습하는 게 좋겠어요.', zh: '考试前再复习一遍比较好。' },
      { icon: '✈️', context: '旅行建议', ko: '거기는 한 번쯤 가 볼 만한 곳이에요.', zh: '那里是值得去一次的地方。' },
    ],
    mistakes: [
      { wrong: '이 영화는 보는 만해요（-는 만하다 不存在）', correct: '이 영화는 볼 만해요', note: '-을/ㄹ 만하다 前必须用冠词形 -을/ㄹ，不用 -는。' },
      { wrong: '쉬겠는 게 좋겠어요（겠 位置错误）', correct: '쉬는 게 좋겠어요', note: '-는 게 좋겠다 中겠 在좋겠다 안에，动词部分用 -는，不겠 추가 금지。' },
      { wrong: '먹어 만해요（-아/어 만하다 不完整）', correct: '먹어 볼 만해요', note: '与 보다 结合时形式是 -아/어 볼 만하다，보다 不能省略。' },
      { wrong: '갈 만해서 가세요（-만하다 接命令）', correct: '갈 만하면 가세요 或 가 볼 만하니까 가세요', note: '-을/ㄹ 만하다 本身是形容词，其后不直接接命令，需加条件或因果连接。' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第6课</div>
    <div class="ov-hero-title">-을/ㄹ 만하다, -는 게 좋겠다</div>
    <div class="ov-hero-sub">值得推荐与委婉建议的表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">值得做</div>
      <div class="ko">동사 词干 + -을/ㄹ 만하다</div>
      <div class="zh">볼 만해요 / 먹을 만해요</div>
    </div>
    <div class="ov-block">
      <div class="badge">委婉建议</div>
      <div class="ko">동사 词干 + -는 게 좋겠다</div>
      <div class="zh">쉬는 게 좋겠어요</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="step0-hook">
  <div class="hook-box">
    <div class="hook-sent"><span class="ko">이 영화는 볼 만해요.</span><span class="zh">这部电影值得看。</span></div>
    <div class="hook-sent"><span class="ko">오늘은 일찍 자는 게 좋겠어요.</span><span class="zh">今天早点睡比较好。</span></div>
  </div>
</div>`,
    compareLabel: '-을 만하다 vs -는 게 좋겠다',
    compareHtml: `<div class="compare">
  <div class="cmp-block" style="border-left:4px solid #ff7fa8">
    <div class="cmp-title">-을/ㄹ 만하다</div>
    <div class="cmp-row"><span class="badge">意思</span>值得做……</div>
    <div class="cmp-row"><span class="badge">접속</span>动词词干 + -을/ㄹ 만하다</div>
    <div class="cmp-row"><span class="badge">用途</span>评价、推荐</div>
    <div class="cmp-row"><span class="ko">볼 만한 영화예요</span><span class="zh">是值得看的电影</span></div>
  </div>
  <div class="cmp-block" style="border-left:4px solid #aee3d8">
    <div class="cmp-title">-는 게 좋겠다</div>
    <div class="cmp-row"><span class="badge">意思</span>最好……，还是……比较好</div>
    <div class="cmp-row"><span class="badge">접속</span>动词词干 + -는 게 좋겠다</div>
    <div class="cmp-row"><span class="badge">用途</span>委婉建议</div>
    <div class="cmp-row"><span class="ko">병원에 가는 게 좋겠어요</span><span class="zh">最好去医院</span></div>
  </div>
</div>`,
    quickTable: {
      title: '-을/ㄹ 만하다 접속 형식',
      headers: ['词干末音', '形式', '예시', '意思'],
      rows: [
        [{ ko: '有收音', zh: '' }, { ko: '-을 만하다', zh: '' }, { ko: '먹을 만해요', zh: '值得吃' }, { ko: '', zh: '' }],
        [{ ko: '无收音/ㄹ', zh: '' }, { ko: '-ㄹ 만하다', zh: '' }, { ko: '볼 만해요', zh: '值得看' }, { ko: '', zh: '' }],
        [{ ko: '-아/어 보다 결합', zh: '' }, { ko: '-아/어 볼 만하다', zh: '' }, { ko: '먹어 볼 만해요', zh: '值得尝尝' }, { ko: '', zh: '' }],
        [{ ko: '冠词形修饰', zh: '' }, { ko: '-을/ㄹ 만한 + 명사', zh: '' }, { ko: '볼 만한 영화', zh: '值得看的电影' }, { ko: '', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-을/ㄹ 만하다, -는 게 좋겠다',
      body: '测试对两个语法点的掌握',
      questions: [
        {
          prompt: '这本书值得读。→ 이 책은 읽___ 만해요',
          options: ['ㄹ', '기', '을', '는'],
          answer: 2 as 0|1|2|3,
          explanation: '읽다 有收音 → 읽을 만하다',
        },
        {
          prompt: '还是先道歉比较好。→ 먼저 사과하___ 게 좋겠어요',
          options: ['는', '을', 'ㄹ', '기'],
          answer: 0 as 0|1|2|3,
          explanation: '-는 게 좋겠다：동사 词干 + -는',
        },
        {
          prompt: '"值得去一次的地方"韩语是？',
          options: ['한 번 갈 만하는 곳', '한 번 가는 만한 곳', '한 번 가기 만한 곳', '한 번 가 볼 만한 곳'],
          answer: 3 as 0|1|2|3,
          explanation: '-아/어 볼 만한 + 명사',
        },
        {
          prompt: '感冒了，最好去医院。→ 감기에 걸렸으니까 병원에 가___ 게 좋겠어요',
          options: ['을', '는', 'ㄹ', '기'],
          answer: 1 as 0|1|2|3,
          explanation: '-는 게 좋겠다：가다 → 가는 게 좋겠다',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p11-l07',
    partNumber: 11,
    lessonNumber: 7,
    title: '아니면, (이)나, -거나',
    whatItDoes: '表示"或者"——在两个选项中选一个',
    whatItDoesBody: '아니면 是连接两个句子或词组的"或者"，用于提供另一个选项。\n(이)나 接在名词后，表示"……或者……"，也可表示"至少"的语气。\n-거나 接在动词/形容词后，连接两个同等选项，表示"不管做哪个都行"。',
    structureNote: '아니면：独立连接词，接在句子或名词组后\n(이)나：名词 + (이)나（有收音+이나，无收音+나）\n-거나：动词/形容词词干 + -거나',
    rulesNote: '아니면 는 문장 接续中 사용，(이)나 는 명사에，-거나 는 用言（动词/形容词）에 사용。\n(이)나 는 "或者"외에 "大约/至少"의 의미도 있음：시간이 한 시간이나 걸려요（要花整整一小时）。',
    structures: [
      {
        ko: '커피 아니면 차를 마실게요',
        zh: '我喝咖啡或者茶。',
        tokens: [
          { text: '커피', role: 'plain' },
          { text: '아니면', role: 'plain' },
          { text: '차를', role: 'object' },
          { text: '마실게요', role: 'verb' },
        ],
      },
      {
        ko: '주말에 영화나 드라마를 봐요',
        zh: '周末看电影或者电视剧。',
        tokens: [
          { text: '주말에', role: 'time' },
          { text: '영화나 드라마를', role: 'object' },
          { text: '봐요', role: 'verb' },
        ],
      },
      {
        ko: '시간이 있거나 없거나 매일 운동해요',
        zh: '不管有没有时间，每天运动。',
        tokens: [
          { text: '시간이 있거나 없거나', role: 'plain' },
          { text: '매일', role: 'time' },
          { text: '운동해요', role: 'verb' },
        ],
      },
      {
        ko: '집에서 쉬거나 친구를 만나요',
        zh: '在家休息或者见朋友。',
        tokens: [
          { text: '집에서', role: 'place' },
          { text: '쉬거나', role: 'plain' },
          { text: '친구를', role: 'object' },
          { text: '만나요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '아니면：句子/名词组之间，"或者/要不然"', examples: '버스 아니면 지하철로 가요 / 오늘 아니면 내일 할게요' },
      { type: 'rule', text: '(이)나：명사 + 이나（有收音）/ 나（无收音），"……或者……"', examples: '사과나 바나나 / 책이나 잡지 / 커피나 주스' },
      { type: 'rule', text: '-거나：동사/형용사 词干 + -거나，连接两个同等选项', examples: '먹거나 마시거나 / 크거나 작거나 / 가거나 안 가거나' },
      { type: 'usage', text: '-거나 -거나：重复使用表示"无论哪个都……"', examples: '비가 오거나 안 오거나 갈 거예요（不管下雨不下雨都要去）' },
      { type: 'usage', text: '(이)나 表示"至少/大约"（强调数量多或时间长）', examples: '한 시간이나 기다렸어요（等了整整一小时）/ 열 명이나 왔어요（来了足足十个人）' },
      { type: 'note', text: '아니면 可在疑问句中用作"还是"：A 아니면 B？', examples: '커피 아니면 차? / 오늘 아니면 내일이에요?' },
      { type: 'compare', text: '(이)나 vs -거나：前者接名词，后者接动词/형용사', examples: '사과나 바나나（名词选择）vs 먹거나 마시거나（动词选择）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '집에서 쉬거나', role: 'plain' },
          { text: '친구를 만날 거예요', role: 'verb' },
        ],
        zh: '今天打算在家休息或者见朋友。',
        swapWords: ['집에서 쉬거나 친구를 만날 거예요', '영화를 보거나 책을 읽을 거예요', '요리하거나 청소할 거예요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '한국어나', role: 'plain' },
          { text: '영어로', role: 'plain' },
          { text: '써도 돼요', role: 'verb' },
        ],
        zh: '用韩语或英语写都可以。',
        swapWords: ['한국어나 영어로 써도 돼요', '한국어나 중국어로 써도 돼요', '한국어나 일본어로 써도 돼요'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '지하철', role: 'plain' },
          { text: '아니면', role: 'plain' },
          { text: '버스로 가요', role: 'verb' },
        ],
        zh: '坐地铁或者公交去。',
        swapWords: ['버스로 가요', '택시로 가요', '걸어서 가요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '주말에', role: 'time' },
          { text: '집에서 쉬거나', role: 'plain' },
          { text: '친구를 만나요', role: 'verb' },
        ],
        zh: '周末在家休息或者见朋友。',
        swapWords: ['집에서 쉬거나 친구를 만나요', '운동하거나 영화를 봐요', '공부하거나 책을 읽어요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🍽️', context: '点餐场景', ko: '비빔밥 아니면 불고기로 주세요.', zh: '请给我拌饭或者烤肉。' },
      { icon: '📅', context: '约时间', ko: '토요일이나 일요일에 만나요.', zh: '周六或者周日见面吧。' },
      { icon: '🎵', context: 'KPOP 歌词', ko: '행복하거나 슬프거나 이 노래를 들어요.', zh: '不管开心还是难过，都听这首歌。' },
      { icon: '🚌', context: '交通选择', ko: '버스 아니면 지하철, 어떻게 가는 게 빠를까요?', zh: '公交还是地铁，哪个更快？' },
      { icon: '💬', context: '강조 이나', ko: '그 가방이 얼마나 비싼지, 100만 원이나 해요!', zh: '那个包多贵啊，要100万韩元！' },
      { icon: '🏠', context: '休息日', ko: '주말에는 집에서 쉬거나 운동을 해요.', zh: '周末在家休息或者运动。' },
    ],
    mistakes: [
      { wrong: '사과이나 바나나（有收音名词用 나）', correct: '사과나 바나나', note: '사과 无收音 → 사과나。이나 用于有收音名词：책이나。' },
      { wrong: '먹거나이나 마셔요（-거나 + 이나 혼용）', correct: '먹거나 마셔요', note: '-거나 와 (이)나 는 같은 기능이므로 하나만 쓴다。동사에는 -거나，명사에는 (이)나。' },
      { wrong: '커피 아니면이나 차（아니면 + 이나 混用）', correct: '커피 아니면 차 或 커피나 차', note: '아니면 和 (이)나 작용이 같으니 하나만 쓸 것。' },
      { wrong: '한 시간나 기다렸어요（无收音名词用 이나）', correct: '한 시간이나 기다렸어요', note: '시간 有收音（간）→ 시간이나（강조 용법）。' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第7课</div>
    <div class="ov-hero-title">아니면, (이)나, -거나</div>
    <div class="ov-hero-sub">提供选项与"或者"的三种表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">句子/词组间</div>
      <div class="ko">아니면</div>
      <div class="zh">或者/要不然（连接句子）</div>
    </div>
    <div class="ov-block">
      <div class="badge">名词间</div>
      <div class="ko">명사 + (이)나</div>
      <div class="zh">……或者……（接名词）</div>
    </div>
    <div class="ov-block">
      <div class="badge">动词/形容词间</div>
      <div class="ko">동사/형용사 词干 + -거나</div>
      <div class="zh">……或者……（接用言）</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="step0-hook">
  <div class="hook-box">
    <div class="hook-sent"><span class="ko">커피 아니면 차를 마실게요.</span><span class="zh">我喝咖啡或者茶。</span></div>
    <div class="hook-sent"><span class="ko">주말에 집에서 쉬거나 친구를 만나요.</span><span class="zh">周末在家休息或者见朋友。</span></div>
  </div>
</div>`,
    compareLabel: '(이)나 vs -거나 vs 아니면',
    compareHtml: `<div class="compare">
  <div class="cmp-block" style="border-left:4px solid #ff7fa8">
    <div class="cmp-title">(이)나 / 아니면</div>
    <div class="cmp-row"><span class="badge">(이)나</span>名词 + 이나/나</div>
    <div class="cmp-row"><span class="badge">아니면</span>接句子或名词组</div>
    <div class="cmp-row"><span class="ko">사과나 바나나</span><span class="zh">苹果或香蕉</span></div>
    <div class="cmp-row"><span class="ko">오늘 아니면 내일</span><span class="zh">今天或明天</span></div>
  </div>
  <div class="cmp-block" style="border-left:4px solid #aee3d8">
    <div class="cmp-title">-거나</div>
    <div class="cmp-row"><span class="badge">接续</span>动词/형용사 词干 + -거나</div>
    <div class="cmp-row"><span class="badge">重复</span>-거나 -거나 = 无论哪个</div>
    <div class="cmp-row"><span class="ko">쉬거나 운동해요</span><span class="zh">休息或运动</span></div>
    <div class="cmp-row"><span class="ko">오거나 안 오거나</span><span class="zh">来不来都……</span></div>
  </div>
</div>`,
    quickTable: {
      title: '세 가지 "또는" 비교',
      headers: ['形式', '接续对象', '예시', '意思'],
      rows: [
        [{ ko: '아니면', zh: '' }, { ko: '句子/名词组', zh: '' }, { ko: '버스 아니면 지하철', zh: '公交或地铁' }, { ko: '', zh: '' }],
        [{ ko: '(이)나', zh: '' }, { ko: '名词', zh: '' }, { ko: '영화나 드라마', zh: '电影或电视剧' }, { ko: '', zh: '' }],
        [{ ko: '-거나', zh: '' }, { ko: '动词/형용사', zh: '' }, { ko: '먹거나 마시거나', zh: '吃或喝' }, { ko: '', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '아니면, (이)나, -거나',
      body: '测试对三种"或者"表达的掌握',
      questions: [
        {
          prompt: '周末看电影或者读书。→ 주말에 영화를 보___ 책을 읽어요',
          options: ['나', '이나', '거나', '아니면'],
          answer: 2 as 0|1|2|3,
          explanation: '连接两个动词 → -거나',
        },
        {
          prompt: '吃苹果或香蕉。→ 사과___ 바나나를 먹어요',
          options: ['나', '아니면', '거나', '이나'],
          answer: 0 as 0|1|2|3,
          explanation: '사과 无收音 → 사과나',
        },
        {
          prompt: '今天或明天来都可以。→ 오늘 ___ 내일 와도 돼요',
          options: ['거나', '아니면', '나', '이나'],
          answer: 1 as 0|1|2|3,
          explanation: '连接句子/时间词 → 아니면',
        },
        {
          prompt: '(이)나 的第二个用法（强调）是？',
          options: ['表示让步', '表示原因', '表示命令', '强调数量多或时间长'],
          answer: 3 as 0|1|2|3,
          explanation: '이나 강조 용법：한 시간이나 기다렸어요（等了整整一小时）',
        },
      ],
    },
    linkedGrammarIds: ['g12', 'g40'],
  },

  {
    id: 'card-p11-l08',
    partNumber: 11,
    lessonNumber: 8,
    title: '-아/어/여 보이다, -나 보다',
    whatItDoes: '表示"看起来……"和"好像……（推测）"',
    whatItDoesBody: '-아/어/여 보이다 表示根据外表或视觉印象判断"看起来……"，主要接形容词。\n-나 보다 表示根据某种迹象推测"好像……/看来……"，用于说话人自己推断出的结论。\n-는/은/ㄴ 가 보다 与 -나 보다 意思相近，形式略有不同。',
    structureNote: '-아/어/여 보이다：형용사 词干 + -아/어/여 보이다\n-나 보다：동사 词干 + -나 보다，형용사 词干 + -(으)나 보다\n-는/은/ㄴ 가 보다：동사 -는 가 보다，형용사 -은/ㄴ 가 보다',
    rulesNote: '-아/어/여 보이다 주로 形容词와 결합，동사와는 드물게 사용。\n-나 보다 와 -(으)ㄴ가 보다 는 거의 같은 의미로 교환 가능，후자가 조금 더 격식체。\n두 표현 모두 직접 확인하지 않은 추측임을 나타냄。',
    structures: [
      {
        ko: '오늘 좀 피곤해 보여요',
        zh: '今天看起来有点累。',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '좀 피곤해 보여요', role: 'verb' },
        ],
      },
      {
        ko: '이 음식 맛있어 보여요',
        zh: '这个食物看起来很好吃。',
        tokens: [
          { text: '이 음식', role: 'subject' },
          { text: '맛있어 보여요', role: 'verb' },
        ],
      },
      {
        ko: '밖에 비가 오나 봐요',
        zh: '外面好像在下雨。',
        tokens: [
          { text: '밖에', role: 'place' },
          { text: '비가', role: 'subject' },
          { text: '오나 봐요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람이 많이 바쁜가 봐요',
        zh: '那个人好像很忙。',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '많이 바쁜가 봐요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-아/어/여 보이다：형용사 + 아/어/여 보이다（視覚的 判断）', examples: '예쁘다→예뻐 보여요 / 힘들다→힘들어 보여요 / 행복하다→행복해 보여요' },
      { type: 'rule', text: '-나 보다：동사 词干 + -나 보다，过去 + -았/었나 보다', examples: '오다→오나 봐요 / 먹다→먹나 봐요 / 갔나 봐요（好像去了）' },
      { type: 'rule', text: '-(으)ㄴ가/는가 보다：형용사 词干 + -(으)ㄴ가 보다，동사 词干 + -는가 보다', examples: '바쁘다→바쁜가 봐요 / 크다→큰가 봐요 / 가다→가는가 봐요' },
      { type: 'usage', text: '-아/어 보이다 는 외모나 표정을 보고 판단할 때 주로 사용', examples: '어려 보여요（看起来年轻）/ 똑똑해 보여요（看起来聪明）/ 비싸 보여요（看起来很贵）' },
      { type: 'usage', text: '-나 보다 는 상황 증거나 간접 정보를 근거로 推测할 때 사용', examples: '불이 꺼진 것 보니 없나 봐요（灯灭了，好像不在）' },
      { type: 'note', text: 'KPOP/한국 드라마에서 -아/어 보이다 는 외모 칭찬에 자주 등장', examples: '오늘 진짜 예뻐 보여요 / 행복해 보여서 좋아요' },
      { type: 'compare', text: '-아/어 보이다 vs -나 보다：前者基于视觉外观，后者基于情境推测', examples: '피곤해 보여요（看起来累）vs 피곤한가 봐요（好像很累——基于行为推断）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '표정이', role: 'subject' },
          { text: '안 좋아 보여요', role: 'verb' },
        ],
        zh: '今天表情看起来不太好。',
        swapWords: ['안 좋아 보여요', '행복해 보여요', '피곤해 보여요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '연락이 없는 걸 보니', role: 'plain' },
          { text: '바쁜가 봐요', role: 'verb' },
        ],
        zh: '看他没有联系，好像很忙。',
        swapWords: ['바쁜가 봐요', '자고 있나 봐요', '잊어버린 것 같아요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 옷', role: 'subject' },
          { text: '너한테', role: 'plain' },
          { text: '잘 어울려 보여요', role: 'verb' },
        ],
        zh: '这件衣服看起来很适合你。',
        swapWords: ['잘 어울려 보여요', '좀 작아 보여요', '비싸 보여요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '연락이 없는 걸 보니', role: 'plain' },
          { text: '바쁜가', role: 'plain' },
          { text: '봐요', role: 'verb' },
        ],
        zh: '看他没联系，好像很忙。',
        swapWords: ['바쁜가 봐요', '자나 봐요', '외출했나 봐요'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '😊', context: '外貌评价', ko: '오늘 정말 행복해 보여요. 무슨 좋은 일 있어요?', zh: '今天看起来真的很开心，有什么好事吗？' },
      { icon: '🎵', context: 'KPOP 演唱会', ko: '저 가수, 무대에서 진짜 즐거워 보여요.', zh: '那个歌手，在舞台上看起来真的很开心。' },
      { icon: '🌧️', context: '天气推测', ko: '하늘이 흐린 걸 보니 비가 오나 봐요.', zh: '看天空阴沉，好像要下雨了。' },
      { icon: '📱', context: '情况推测', ko: 'A: 왜 전화를 안 받지? B: 자나 봐요.', zh: 'A：为什么不接电话？B：好像在睡觉。' },
      { icon: '🏠', context: '日常对话', ko: '불이 꺼진 걸 보니 아무도 없나 봐요.', zh: '看灯都灭了，好像没有人在。' },
      { icon: '💬', context: '外貌称赞', ko: '요즘 운동을 하는지 건강해 보여요.', zh: '最近好像在运动，看起来很健康。' },
    ],
    mistakes: [
      { wrong: '피곤하아 보여요（形容词+아 보이다 连接错误）', correct: '피곤해 보여요', note: '피곤하다 → 피곤해（하다 类用 여→해）보여요。注意 하다 类的 여/해 变化。' },
      { wrong: '행복하아 보여요（하다 类形容词连接错误）', correct: '행복해 보여요', note: '행복하다 → 행복해（하다류 여→해）보여요。모든 하다류 형용사는 해 보여요 형태。' },
      { wrong: '바쁘나 봐요（形容词+나 보다）', correct: '바쁜가 봐요', note: '형용사 + -(으)ㄴ가 보다 가 자연스럽다：바쁘다→바쁜가 봐요。-나 보다 는 주로 동사에 사용。' },
      { wrong: '예뻐 보입니다（-아/어 보이다 의 주어를 자신으로）', correct: '예뻐 보여요（他人外观）', note: '-아/어 보이다 는 타인이나 외부 사물에 사용하는 것이 자연스럽다. 자신에게는 어색。' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 第8课</div>
    <div class="ov-hero-title">-아/어/여 보이다, -나 보다</div>
    <div class="ov-hero-sub">视觉印象与情境推测的表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">视觉判断</div>
      <div class="ko">형용사 + -아/어/여 보이다</div>
      <div class="zh">피곤해 보여요（看起来累）</div>
    </div>
    <div class="ov-block">
      <div class="badge">情境推测（동사）</div>
      <div class="ko">동사 词干 + -나 보다</div>
      <div class="zh">오나 봐요（好像在来）</div>
    </div>
    <div class="ov-block">
      <div class="badge">情境推测（형용사）</div>
      <div class="ko">형용사 词干 + -(으)ㄴ가 보다</div>
      <div class="zh">바쁜가 봐요（好像很忙）</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="step0-hook">
  <div class="hook-box">
    <div class="hook-sent"><span class="ko">오늘 많이 피곤해 보여요.</span><span class="zh">今天看起来很累。</span></div>
    <div class="hook-sent"><span class="ko">연락이 없는 걸 보니 바쁜가 봐요.</span><span class="zh">看他没联系，好像很忙。</span></div>
  </div>
</div>`,
    compareLabel: '-아/어 보이다 vs -나 보다',
    compareHtml: `<div class="compare">
  <div class="cmp-block" style="border-left:4px solid #ff7fa8">
    <div class="cmp-title">-아/어/여 보이다</div>
    <div class="cmp-row"><span class="badge">依据</span>视觉、外观印象</div>
    <div class="cmp-row"><span class="badge">接续</span>주로 형용사 + 아/어/여 보이다</div>
    <div class="cmp-row"><span class="ko">행복해 보여요</span><span class="zh">看起来很幸福</span></div>
    <div class="cmp-row"><span class="ko">비싸 보여요</span><span class="zh">看起来很贵</span></div>
  </div>
  <div class="cmp-block" style="border-left:4px solid #aee3d8">
    <div class="cmp-title">-나 보다 / -(으)ㄴ가 보다</div>
    <div class="cmp-row"><span class="badge">依据</span>情境、间接证据推测</div>
    <div class="cmp-row"><span class="badge">동사</span>词干 + -나 보다</div>
    <div class="cmp-row"><span class="badge">형용사</span>词干 + -(으)ㄴ가 보다</div>
    <div class="cmp-row"><span class="ko">자나 봐요</span><span class="zh">好像在睡觉</span></div>
    <div class="cmp-row"><span class="ko">바쁜가 봐요</span><span class="zh">好像很忙</span></div>
  </div>
</div>`,
    quickTable: {
      title: '-아/어 보이다 접속 형식',
      headers: ['形容词类型', '变化', '예시', '意思'],
      rows: [
        [{ ko: '아 계열', zh: 'ㅏ/ㅗ结尾' }, { ko: '-아 보이다', zh: '' }, { ko: '작아 보여요', zh: '看起来小' }, { ko: '', zh: '' }],
        [{ ko: '어 계열', zh: '其他' }, { ko: '-어 보이다', zh: '' }, { ko: '힘들어 보여요', zh: '看起来辛苦' }, { ko: '', zh: '' }],
        [{ ko: '하다 계열', zh: '' }, { ko: '-해 보이다', zh: '' }, { ko: '행복해 보여요', zh: '看起来幸福' }, { ko: '', zh: '' }],
        [{ ko: 'ㅂ 불규칙', zh: 'ㅂ不规则' }, { ko: '우+어=워 보이다', zh: '' }, { ko: '어려워 보여요', zh: '看起来难' }, { ko: '', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-아/어/여 보이다, -나 보다',
      body: '测试对两个推测表达的掌握',
      questions: [
        {
          prompt: '今天看起来很开心。→ 오늘 기분이 좋___ 보여요',
          options: ['아', '어', '나', '해'],
          answer: 0 as 0|1|2|3,
          explanation: '좋다 ㅗ 양성모음 → 좋아 보여요（아 계열）',
        },
        {
          prompt: '外面好像在下雨。→ 밖에 비가 오___ 봐요',
          options: ['은가', '는가', '아', '나'],
          answer: 3 as 0|1|2|3,
          explanation: '동사 오다 → 오나 봐요',
        },
        {
          prompt: '好像很忙。→ 바쁜___ 봐요',
          options: ['어', '가', '나', '아'],
          answer: 1 as 0|1|2|3,
          explanation: '형용사 바쁘다 → 바쁜가 봐요（-(으)ㄴ가 보다）',
        },
        {
          prompt: '-아/어/여 보이다 主要与哪类词结合？',
          options: ['명사（名词）', '동사（动词）', '형용사（形容词）', '부사（副词）'],
          answer: 2 as 0|1|2|3,
          explanation: '-아/어 보이다 는 주로 형용사와 결합하여 시각적 인상을 표현',
        },
      ],
    },
    linkedGrammarIds: [],
  },

  {
    id: 'card-p11-l09',
    partNumber: 11,
    lessonNumber: 9,
    isPractice: true,
    title: '综合练习⑪',
    whatItDoes: '综合练习 P11——间接引语与进阶表达',
    whatItDoesBody: '本章围绕间接引语展开：陈述句（-는다고/-다고/-(이)라고 하다）、疑问句（-(느)냐고 하다）、命令句（-(으)라고 하다）、共动句（-자고 하다）四种引语形式，以及进阶表达 -(으)니까、-아/어 보니까、(으)로 유명하다、이/가 되다、-을/ㄹ 만하다、-는 게 좋겠다、아니면/(이)나/-거나、-아/어 보이다/-나 보다。',
    structures: [], connectionRules: [], cardExamples: [], scenarios: [], mistakes: [],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P11 · 综合练习</div>
    <div class="ov-hero-title">综合练习⑪</div>
    <div class="ov-hero-sub">间接引语与进阶表达综合复习</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本册复习要点</div></div>
    <div class="ov-block">
      <div class="badge">陈述句引语</div>
      <div class="ko">-는다고/-다고/-(이)라고 하다</div>
      <div class="zh">转述他人说的话</div>
    </div>
    <div class="ov-block">
      <div class="badge">疑问句引语</div>
      <div class="ko">-(느)냐고 하다 / -는지 알다</div>
      <div class="zh">转述他人的提问</div>
    </div>
    <div class="ov-block">
      <div class="badge">命令/共动引语</div>
      <div class="ko">-(으)라고 / -자고 하다</div>
      <div class="zh">转述命令与邀请</div>
    </div>
    <div class="ov-block">
      <div class="badge">原因/发现</div>
      <div class="ko">-(으)니까 / -아/어 보니까</div>
      <div class="zh">原因与亲身发现</div>
    </div>
    <div class="ov-block">
      <div class="badge">推测</div>
      <div class="ko">-아/어 보이다 / -나 보다</div>
      <div class="zh">视觉印象与情境推测</div>
    </div>
  </div>
</div>`,
    specialQuiz: {
      type: 'fill',
      title: '综合练习⑪',
      body: 'P11 간접인용 및 进阶 표현 종합 테스트',
      questions: [
        {
          prompt: '朋友说明天会来。→ 친구가 내일 온___ 했어요',
          options: ['다고', '는다고', '라고', '냐고'],
          answer: 0 as 0|1|2|3,
          explanation: '오다（无收音）→ -ㄴ다고：온+다고 = 온다고 했어요',
        },
        {
          prompt: '老师问作业做完了吗。→ 선생님이 숙제를 다 했___ 물으셨어요',
          options: ['자고', '다고', '냐고', '라고'],
          answer: 2 as 0|1|2|3,
          explanation: '疑问句引语 과거：했냐고',
        },
        {
          prompt: '妈妈叫不要晚睡。→ 엄마가 늦게 자지 ___ 하셨어요',
          options: ['않으라고', '자고', '라고', '말라고'],
          answer: 3 as 0|1|2|3,
          explanation: '命令否定：-지 말라고 하다',
        },
        {
          prompt: '今天看起来很幸福。→ 오늘 행복___ 보여요',
          options: ['해', '어', '아', '나'],
          answer: 0 as 0|1|2|3,
          explanation: '행복하다 → 행복해 보여요（하다 류→해）',
        },
        {
          prompt: '因为很晚了，快点走吧。→ 많이 늦었___ 빨리 가요',
          options: ['아서', '어서', '으면', '으니까'],
          answer: 3 as 0|1|2|3,
          explanation: '늦다（有收音）→ 늦었으니까（后接命令/제안 가능）',
        },
        {
          prompt: '外面好像在下雨。→ 밖에 비가 오___ 봐요',
          options: ['아', '나', '는다', '는가'],
          answer: 1 as 0|1|2|3,
          explanation: '동사 오다 → 오나 봐요',
        },
      ],
    },
    linkedGrammarIds: ['card-p11-l01', 'card-p11-l02', 'card-p11-l03', 'card-p11-l04', 'card-p11-l08'],
  },
];
