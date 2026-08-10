import type { GrammarCard } from '@/types';

export const grammarCardsP26: GrammarCard[] = [
  // ── 第1课：-더라도 ──────────────────────────────────────
  {
    id: 'card-p26-l01',
    partNumber: 26,
    lessonNumber: 1,
    title: '-더라도',
    whatItDoes: '即使/纵使', english: 'Even if / Even though',
    whatItDoesBody: '「-더라도」表示强让步，"就算……也……""即使……也……"。用于假设的情况，强调不管前提如何，后面的动作/状态不变。语气比 -아/어도 更强、更书面。', english: '「-더라도」 expresses strong concession, meaning "even if..." or "even though...". It is used for hypothetical situations, emphasizing that regardless of the premise, the following action/state remains unchanged. The tone is stronger and more formal than -아/어도.',
    structureNote: '动词/形容词词干 + -더라도 · 名词 + -(이)라 하더라도', english: 'Verb/Adjective stem + -더라도 · Noun + -(이)라 하더라도',
    rulesNote: '直接连接词干，不看收音；过去 -았/었더라도；名词用 -(이)라 하더라도', english: 'Attach directly to the stem regardless of final consonant; past tense -았/었더라도; for nouns use -(이)라 하더라도',
    structures: [
      {
        ko: '비가 오더라도 저는 갈 거예요.',
        zh: '就算下雨，我也要去。',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '오더라도', role: 'verb' },
          { text: '저는', role: 'subject' },
          { text: '갈 거예요', role: 'verb' },
        ],
      },
      {
        ko: '아무리 힘들더라도 포기하지 마세요.',
        zh: '不管多辛苦也不要放弃。',
        tokens: [
          { text: '아무리', role: 'plain' },
          { text: '힘들더라도', role: 'verb' },
          { text: '포기하지 마세요', role: 'verb' },
        ],
      },
      {
        ko: '학생이라 하더라도 규칙은 지켜야 해요.',
        zh: '即使是学生，也要遵守规则。',
        tokens: [
          { text: '학생이라 하더라도', role: 'plain' },
          { text: '규칙은', role: 'object' },
          { text: '지켜야 해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词：词干 + -더라도，不看收音', examples: '가다 → 가더라도 / 먹다 → 먹더라도 / 좋다 → 좋더라도' },
      { type: 'rule', text: '过去时：-았/었더라도', examples: '갔더라도, 먹었더라도, 좋았더라도' },
      { type: 'rule', text: '名词：-(이)라 하더라도 或 -(이)더라도', examples: '학생이라 하더라도, 친구라 하더라도' },
      { type: 'usage', text: '常与 아무리、비록 搭配，加强让步语气', examples: '아무리 바쁘더라도, 비록 어렵더라도' },
      { type: 'usage', text: '后句多为强意志/主张/命令/义务', examples: '가더라도 조심해서 가세요.（即使去也要小心。）' },
      { type: 'compare', text: '-더라도 vs -아/어도 → -더라도 更强、更假设、书面；-아/어도 更口语', examples: '비가 와도 갈 거예요.(口语) / 비가 오더라도 갈 거예요.(强调)' },
      { type: 'note', text: '主语可省略，主语一致时不重复', examples: '(제가) 힘들더라도 (제가) 계속할게요.（即使辛苦我也会坚持。）' },
      { type: 'compare', text: '假设让步 vs 既成事实：-더라도 说的是还没成立的假设"就算…也"；对已经发生的既定事实，中文虽也说"即使/明明"，韩语却要用 -는데도，别硬套 -더라도', examples: '비가 오더라도 갈 거예요.（假设：还没下，也照去） / 비가 오는데도 갔어요.（事实：真下了还是去了）' },
      { type: 'note', text: '-더라도 里的 -더- 是让步词尾的固定部件，不是"回想"的 -더-（더라고요 那个）；整体当一个词尾记，它本身不表示过去经验或亲历', examples: '가더라도 = 就算去（不含"我回想/亲眼所见"的语气）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '비가', role: 'subject' },
          { text: '오더라도', role: 'verb' },
          { text: '갈', role: 'verb' },
          { text: '거예요', role: 'verb' },
        ],
        zh: '就算下雨也要去。',
        swapWords: ['오다', '내리다', '쏟아지다', '그치다'],
      },
      {
        wordBlocks: [
          { text: '아무리', role: 'plain' },
          { text: '힘들더라도', role: 'verb' },
          { text: '포기하지', role: 'verb' },
          { text: '마세요', role: 'verb' },
        ],
        zh: '不管多辛苦也别放弃。',
        swapWords: ['힘들다', '어렵다', '피곤하다', '바쁘다'],
      },
      {
        wordBlocks: [
          { text: '실패하더라도', role: 'verb' },
          { text: '다시', role: 'plain' },
          { text: '도전할', role: 'verb' },
          { text: '거예요', role: 'verb' },
        ],
        zh: '就算失败也要再挑战一次。',
        swapWords: ['실패하다', '지다', '틀리다', '떨어지다'],
      },
    ],
    scenarios: [
      { icon: '☔', context: '天气', ko: '비가 오더라도 소풍은 예정대로 진행됩니다.', zh: '即使下雨，郊游也照常进行。' },
      { icon: '💪', context: '意志', ko: '아무리 힘들더라도 끝까지 해내겠습니다.', zh: '不管多难都要做到最后。' },
      { icon: '❌', context: '失败', ko: '실패하더라도 다시 시작할 수 있어요.', zh: '即使失败也能重新开始。' },
      { icon: '⏰', context: '时间紧', ko: '늦더라도 꼭 오세요.', zh: '就算晚也一定要来。' },
      { icon: '💰', context: '价格', ko: '비싸더라도 좋은 것을 사고 싶어요.', zh: '就算贵也想买好的。' },
      { icon: '🎓', context: '身份', ko: '학생이라 하더라도 예의는 지켜야 해요.', zh: '就算是学生也要有礼貌。' },
    ],
    mistakes: [
      { wrong: '갔더라도 가요', correct: '가더라도 가요', note: '前后动作若同一事，前用现在词干；不要为强调而加过去时' },
      { wrong: '학생더라도', correct: '학생이라 하더라도', note: '名词用 -(이)라 하더라도，不能直接加 -더라도' },
      { wrong: '아무리 힘들었더라도 참았어요', correct: '아무리 힘들더라도 참을 거예요', note: '假设让步搭配未来/意志，不是过去描述' },
    ],
    quickTable: {
      title: '-더라도 形态一览', english: '-더라도 Form Overview',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['动词', '词干 + -더라도', '가더라도, 먹더라도'],
        ['形容词', '词干 + -더라도', '좋더라도, 예쁘더라도'],
        ['过去', '-았/었더라도', '갔더라도'],
        ['名词', '-(이)라 하더라도', '학생이라 하더라도'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-더라도 变形练习', english: '-더라도 Conjugation Practice',
      body: '选择正确的 -더라도 形式',
      questions: [
        {
          prompt: '비가 (오다) 저는 갈 거예요.',
          options: ['오면', '오더라도', '왔더라도', '오라도'],
          answer: 1,
          explanation: '强让步"就算……也……"用 -더라도，动词 오다 → 오더라도。',
        },
        {
          prompt: '아무리 (힘들다) 포기하지 마세요.',
          options: ['힘들라도', '힘드라도', '힘들더라도', '힘든더라도'],
          answer: 2,
          explanation: '힘들다 是形容词，词干 힘들 + -더라도 → 힘들더라도。',
        },
        {
          prompt: '(학생) 규칙은 지켜야 해요.',
          options: ['학생더라도', '학생이더라도', '학생이라 하더라도', '학생라도'],
          answer: 2,
          explanation: '名词让步用 -(이)라 하더라도 → 학생이라 하더라도。',
        },
        {
          prompt: '어제 (가다) 결과는 같았을 거예요.',
          options: ['가더라도', '갔더라도', '가라도', '갈더라도'],
          answer: 1,
          explanation: '"昨天就算去了"是过去假设，用 -았/었더라도 → 갔더라도。',
        },
      ],
    },
    linkedGrammarIds: ['card-p26-l02'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">「就算下雨，我也要去」——韩语里最强的让步语气用 <b>-더라도</b>。<br>它比 -아/어도 更强，语感更书面，常和 아무리、비록 搭配。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-더라도 vs -아/어도</b><br>
    ・-아/어도 → 口语常用，事实/假设都可<br>
    <span style="color:#89756e">비가 와도 갈 거예요.（下雨也去）</span><br>
    ・-더라도 → 强让步，多用于假设，书面/正式<br>
    <span style="color:#89756e">비가 오더라도 갈 거예요.（就算下雨也去）</span>
  </div>
</div>`,
    compareLabel: '-더라도 vs -아/어도',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-더라도：即使/就算</div>
  <div style="font-size:14px;color:#89756e">强让步 · 假设 · 书面语气</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心形态</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词/形容词 → 词干 + <b>-더라도</b><br>
      过去 → <b>-았/었더라도</b><br>
      名词 → <b>-(이)라 하더라도</b>
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常见搭配</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      아무리 -더라도<br>
      비록 -더라도<br>
      后句多为意志/命令/义务
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생더라도</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생이라 하더라도</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">힘들었더라도 참을 거예요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">힘들더라도 참을 거예요</span></div></div>
  </div>
</div>`,
  },

  // ── 第2课：-을/ㄹ지라도 ──────────────────────────────────────
  {
    id: 'card-p26-l02',
    partNumber: 26,
    lessonNumber: 2,
    title: '-을/ㄹ지라도',
    whatItDoes: '即使/纵然', english: 'Even if / Even though',
    whatItDoesBody: '「-을/ㄹ지라도」是最书面、最强的让步表达，"即使……也……""纵然……也……"。多用于文学、演讲、正式书面语。语感比 -더라도 更古典、更正式。', english: '「-을/ㄹ지라도」 is the most formal and strongest concessive expression, meaning "even if..." or "even though...". It is commonly used in literature, speeches, and formal writing. Its nuance is more classical and formal than -더라도.',
    structureNote: '动词/形容词词干：有收音 + -을지라도 / 无收音 + -ㄹ지라도 · 名词 -(이)ㄹ지라도', english: 'Verb/Adjective stem: with final consonant + -을지라도 / without final consonant + -ㄹ지라도 · Noun + -(이)ㄹ지라도',
    rulesNote: '受收音影响：有收音 -을지라도，无收音 -ㄹ지라도；过去 -았/었을지라도；名词 -(이)ㄹ지라도', english: 'Affected by final consonant: with final consonant -을지라도, without final consonant -ㄹ지라도; past tense -았/었을지라도; for nouns use -(이)ㄹ지라도',
    structures: [
      {
        ko: '비록 실패할지라도 도전하겠습니다.',
        zh: '纵然失败也要挑战。',
        tokens: [
          { text: '비록', role: 'plain' },
          { text: '실패할지라도', role: 'verb' },
          { text: '도전하겠습니다', role: 'verb' },
        ],
      },
      {
        ko: '어려움이 있을지라도 끝까지 갈 거예요.',
        zh: '纵有困难也要走到最后。',
        tokens: [
          { text: '어려움이', role: 'subject' },
          { text: '있을지라도', role: 'verb' },
          { text: '끝까지', role: 'plain' },
          { text: '갈 거예요', role: 'verb' },
        ],
      },
      {
        ko: '가난할지라도 꿈은 잃지 않아요.',
        zh: '纵然贫穷也不失去梦想。',
        tokens: [
          { text: '가난할지라도', role: 'plain' },
          { text: '꿈은', role: 'object' },
          { text: '잃지 않아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音 → -을지라도', examples: '먹다 → 먹을지라도 / 있다 → 있을지라도 / 좋다 → 좋을지라도' },
      { type: 'rule', text: '无收音 → -ㄹ지라도', examples: '가다 → 갈지라도 / 하다 → 할지라도 / 크다 → 클지라도' },
      { type: 'rule', text: '过去时：-았/었을지라도', examples: '갔을지라도, 먹었을지라도' },
      { type: 'rule', text: '名词：有收音 -이ㄹ지라도 / 无收音 -ㄹ지라도', examples: '학생일지라도, 친구일지라도' },
      { type: 'usage', text: '常与 비록、설령、설사 搭配', examples: '비록 어릴지라도 / 설령 실패할지라도' },
      { type: 'usage', text: '语气最书面正式，多见于演讲/文学/新闻/宗教文本', examples: '비록 죽을지라도 진리를 지키겠다.（哪怕死也要坚守真理。）' },
      { type: 'compare', text: '语气强度：-아/어도 < -더라도 < -을/ㄹ지라도', examples: '가도 → 가더라도 → 갈지라도' },
      { type: 'compare', text: '与下一课 -을/ㄹ지언정 长得几乎一样，别混：本课 -지라도 是纯让步"纵然A也照样B"，后句能肯定；-지언정 带对比取舍"宁可A也绝不B"，后句必是否定/拒绝（第3课详学）', examples: '실패할지라도 도전하겠습니다.（纵然失败也挑战） vs 굶을지언정 도움은 안 받아요.（宁可挨饿也不受助）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '비록', role: 'plain' },
          { text: '실패할지라도', role: 'verb' },
          { text: '도전하겠습니다', role: 'verb' },
        ],
        zh: '纵然失败也要挑战。',
        swapWords: ['실패하다', '지다', '넘어지다', '떨어지다'],
      },
      {
        wordBlocks: [
          { text: '어려움이', role: 'subject' },
          { text: '있을지라도', role: 'verb' },
          { text: '끝까지', role: 'plain' },
          { text: '갈 거예요', role: 'verb' },
        ],
        zh: '纵有困难也要走到最后。',
        swapWords: ['어려움', '문제', '고통', '시련'],
      },
      {
        wordBlocks: [
          { text: '가난할지라도', role: 'plain' },
          { text: '꿈은', role: 'object' },
          { text: '잃지 않아요', role: 'verb' },
        ],
        zh: '纵然贫穷也不失去梦想。',
        swapWords: ['가난하다', '힘들다', '어렵다', '외롭다'],
      },
    ],
    scenarios: [
      { icon: '🎯', context: '决心', ko: '비록 실패할지라도 최선을 다하겠습니다.', zh: '纵然失败也要竭尽全力。' },
      { icon: '🏋️', context: '困难', ko: '어려움이 있을지라도 끝까지 갈 거예요.', zh: '纵有困难也走到最后。' },
      { icon: '💰', context: '贫穷', ko: '가난할지라도 정직하게 살고 싶어요.', zh: '纵然贫穷也想诚实地活。' },
      { icon: '📖', context: '文学', ko: '세상이 변할지라도 사랑은 영원해요.', zh: '纵然世界变化，爱情也永恒。' },
      { icon: '⚖️', context: '正义', ko: '진실이 밝혀지지 않을지라도 진실은 존재해요.', zh: '纵然真相未被揭示，真相也存在。' },
      { icon: '🌱', context: '希望', ko: '희망이 작을지라도 꺼지지 않아요.', zh: '纵然希望微小也不熄灭。' },
    ],
    mistakes: [
      { wrong: '가을지라도', correct: '갈지라도', note: '가다 无收音，用 -ㄹ지라도' },
      { wrong: '먹ㄹ지라도', correct: '먹을지라도', note: '먹다 有收音，用 -을지라도' },
      { wrong: '학생지라도', correct: '학생일지라도', note: '名词需加系词 이 后再变形' },
    ],
    quickTable: {
      title: '-을/ㄹ지라도 形态一览', english: '-을/ㄹ지라도 Form Overview',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['动词/形容词有收音', '-을지라도', '먹을지라도, 좋을지라도'],
        ['动词/形容词无收音', '-ㄹ지라도', '갈지라도, 클지라도'],
        ['过去', '-았/었을지라도', '갔을지라도'],
        ['名词有收音', '-이ㄹ지라도', '학생일지라도'],
        ['名词无收音', '-ㄹ지라도', '친구일지라도'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ지라도 变形', english: '-을/ㄹ지라도 Conjugation',
      body: '根据收音和词类选择正确形式',
      questions: [
        {
          prompt: '비록 (실패하다) 도전하겠습니다.',
          options: ['실패하을지라도', '실패할지라도', '실패했을지라도', '실패하지라도'],
          answer: 1,
          explanation: '실패하다 词干 실패하 无收音，用 -ㄹ지라도 → 실패할지라도。',
        },
        {
          prompt: '어려움이 (있다) 끝까지 갈 거예요.',
          options: ['있ㄹ지라도', '있을지라도', '있았을지라도', '있는지라도'],
          answer: 1,
          explanation: '있다 词干 있 有收音，用 -을지라도 → 있을지라도。',
        },
        {
          prompt: '(학생) 규칙은 지켜야 해요.',
          options: ['학생지라도', '학생을지라도', '학생일지라도', '학생라지라도'],
          answer: 2,
          explanation: '名词有收音加 이 变形 → 학생이 + ㄹ지라도 = 학생일지라도。',
        },
        {
          prompt: '아무리 (좋다) 저는 안 살 거예요.',
          options: ['좋ㄹ지라도', '좋을지라도', '좋았을지라도', '좋라지라도'],
          answer: 1,
          explanation: '좋다 词干 좋 有收音，用 -을지라도 → 좋을지라도。',
        },
      ],
    },
    linkedGrammarIds: ['card-p26-l01', 'card-p26-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"纵然失败也要挑战"——韩语最书面的让步表达是 <b>-을/ㄹ지라도</b>。<br>常出现在演讲、文学、新闻标题里，语气比 -더라도 更古典正式。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>让步语气强度阶梯</b><br>
    -아/어도 → 口语最常用<br>
    -더라도 → 强让步，日常/正式都可<br>
    -을/ㄹ지라도 → 最书面、演讲/文学感<br>
    三者都可互换，语感依次递增。
  </div>
</div>`,
    compareLabel: '让步三阶梯',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-을/ㄹ지라도：纵然</div>
  <div style="font-size:14px;color:#89756e">最书面/演讲式让步</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心形态</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      有收音 → <b>-을지라도</b>：먹을지라도<br>
      无收音 → <b>-ㄹ지라도</b>：갈지라도<br>
      过去 → <b>-았/었을지라도</b>：갔을지라도<br>
      名词 → <b>-(이)ㄹ지라도</b>：학생일지라도
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常见搭配</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      비록 -을/ㄹ지라도<br>
      설령 -을/ㄹ지라도<br>
      설사 -을/ㄹ지라도
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가을지라도</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈지라도（无收音加 -ㄹ지라도）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생지라도</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생일지라도</span></div></div>
  </div>
</div>`,
  },

  // ── 第3课：-을/ㄹ지언정 ──────────────────────────────────────
  {
    id: 'card-p26-l03',
    partNumber: 26,
    lessonNumber: 3,
    title: '-을/ㄹ지언정',
    whatItDoes: '宁可/宁愿', english: 'Rather / Prefer',
    whatItDoesBody: '「-을/ㄹ지언정」表达强烈的"宁可A也不B""哪怕A也不做B"，前句是宁愿接受的负面情况，后句是绝不做的事。语气非常坚决、正式，多见书面语。', english: '「-을/ㄹ지언정」 expresses a strong sense of "rather A than B" or "even if A, never B." The first clause presents a negative situation one is willing to accept, while the second clause states something one absolutely refuses to do. The tone is very firm and formal, commonly found in written language.',
    structureNote: '词干：有收音 + -을지언정 / 无收音 + -ㄹ지언정 · 名词 -(이)ㄹ지언정', english: 'Verb stem: with final consonant + -을지언정 / without final consonant + -ㄹ지언정 · Noun + -(이)ㄹ지언정',
    rulesNote: '与 -을/ㄹ지라도 结构相同，但语义不同：前者纯让步"纵然"，后者带对比"宁可"', english: 'It has the same structure as -을/ㄹ지라도, but the meaning differs: the former is purely concessive ("even if"), while the latter carries contrast ("rather").',
    structures: [
      {
        ko: '굶을지언정 남의 도움은 받지 않겠어요.',
        zh: '宁可挨饿也不接受别人的帮助。',
        tokens: [
          { text: '굶을지언정', role: 'verb' },
          { text: '남의', role: 'plain' },
          { text: '도움은', role: 'object' },
          { text: '받지 않겠어요', role: 'verb' },
        ],
      },
      {
        ko: '죽을지언정 거짓말은 하지 않아요.',
        zh: '宁死也不撒谎。',
        tokens: [
          { text: '죽을지언정', role: 'verb' },
          { text: '거짓말은', role: 'object' },
          { text: '하지 않아요', role: 'verb' },
        ],
      },
      {
        ko: '늦을지언정 대충하지는 마세요.',
        zh: '宁可晚点也不要马虎。',
        tokens: [
          { text: '늦을지언정', role: 'verb' },
          { text: '대충하지는', role: 'verb' },
          { text: '마세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音 → -을지언정', examples: '먹다 → 먹을지언정 / 죽다 → 죽을지언정' },
      { type: 'rule', text: '无收音 → -ㄹ지언정', examples: '가다 → 갈지언정 / 하다 → 할지언정' },
      { type: 'rule', text: '名词：-(이)ㄹ지언정', examples: '거지일지언정, 학생일지언정' },
      { type: 'usage', text: '语义核心：宁可 A（前句负面/极端），也不 B（后句拒绝）', examples: '죽을지언정 배신은 안 해요.（宁死不背叛）' },
      { type: 'usage', text: '后句多为否定：-지 않다、-지 못하다、안 -', examples: '굶을지언정 도움은 안 받아요.（宁可挨饿也不接受帮助。）' },
      { type: 'compare', text: '-을지언정 vs -을지라도 → 前者含拒绝/对比，后者纯让步', examples: '죽을지라도 갈 거예요.(纵死也去) / 죽을지언정 안 갈 거예요.(宁死不去)' },
      { type: 'note', text: '不能用于日常口语，只用于书面/演讲/文学', examples: '(书面) 굶을지언정 굴하지 않겠다.' },
      { type: 'note', text: '看清两个格子：前句（-을지언정）放的是"愿意承受的代价、牺牲"，通常很惨很极端；不要把想要的好结果塞进前句。想要的立场/坚持放在后句', examples: '굶을지언정(愿受的苦) 도움은 받지 않겠어요(坚持).' },
      { type: 'usage', text: '常和副词 차라리（宁可）连用，"宁可…也决不…"的决绝感更足', examples: '차라리 굶을지언정 남의 도움은 받지 않겠어요.（宁可挨饿也决不受人帮助。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '굶을지언정', role: 'verb' },
          { text: '도움은', role: 'object' },
          { text: '받지', role: 'verb' },
          { text: '않겠어요', role: 'verb' },
        ],
        zh: '宁可挨饿也不接受帮助。',
        swapWords: ['굶다', '고생하다', '가난하다', '고통받다'],
      },
      {
        wordBlocks: [
          { text: '죽을지언정', role: 'verb' },
          { text: '거짓말은', role: 'object' },
          { text: '하지', role: 'verb' },
          { text: '않아요', role: 'verb' },
        ],
        zh: '宁死也不撒谎。',
        swapWords: ['거짓말', '배신', '포기', '항복'],
      },
      {
        wordBlocks: [
          { text: '늦을지언정', role: 'verb' },
          { text: '대충하지는', role: 'verb' },
          { text: '마세요', role: 'verb' },
        ],
        zh: '宁可晚也不要马虎。',
        swapWords: ['늦다', '오래 걸리다', '어렵다', '힘들다'],
      },
    ],
    scenarios: [
      { icon: '🍚', context: '骨气', ko: '굶을지언정 남의 도움은 받지 않겠어요.', zh: '宁可挨饿也不接受帮助。' },
      { icon: '⚔️', context: '气节', ko: '죽을지언정 굴복하지 않겠습니다.', zh: '宁死也不屈服。' },
      { icon: '⏰', context: '慢工出细活', ko: '늦을지언정 대충하지 마세요.', zh: '宁可晚也不要马虎。' },
      { icon: '🚫', context: '拒绝', ko: '헤어질지언정 거짓은 못 해요.', zh: '宁可分手也做不出假的。' },
      { icon: '💰', context: '拒钱', ko: '가난할지언정 부정한 돈은 안 받아요.', zh: '宁可穷也不收黑钱。' },
      { icon: '📖', context: '书面', ko: '패할지언정 정정당당하게 싸우겠다.', zh: '宁可败也要堂堂正正地打。' },
    ],
    mistakes: [
      { wrong: '죽을지언정 갈 거예요', correct: '죽을지언정 안 갈 거예요', note: '-을지언정 后句必须是否定/拒绝，不是肯定' },
      { wrong: '가을지언정', correct: '갈지언정', note: '가다 无收音，用 -ㄹ지언정' },
      { wrong: '학생지언정', correct: '학생일지언정', note: '名词需加 이 变形' },
    ],
    quickTable: {
      title: '-을/ㄹ지언정 形态一览', english: '-을/ㄹ지언정 Form Overview',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['有收音', '-을지언정', '먹을지언정, 죽을지언정'],
        ['无收音', '-ㄹ지언정', '갈지언정, 할지언정'],
        ['名词有收音', '-이ㄹ지언정', '학생일지언정'],
        ['名词无收音', '-ㄹ지언정', '거지일지언정'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ지언정 综合练习', english: '-을/ㄹ지언정 Comprehensive Practice',
      body: '选择正确形式',
      questions: [
        {
          prompt: '(굶다) 남의 도움은 받지 않겠어요.',
          options: ['굶ㄹ지언정', '굶을지언정', '굶었을지언정', '굶는지언정'],
          answer: 1,
          explanation: '굶다 有收音，用 -을지언정 → 굶을지언정。',
        },
        {
          prompt: '(죽다) 거짓말은 하지 않아요.',
          options: ['죽ㄹ지언정', '죽을지언정', '죽는지언정', '죽라지언정'],
          answer: 1,
          explanation: '죽다 有收音，用 -을지언정 → 죽을지언정。',
        },
        {
          prompt: '(늦다) 대충하지는 마세요.',
          options: ['늦지언정', '늦ㄹ지언정', '늦을지언정', '늦었지언정'],
          answer: 2,
          explanation: '늦다 有收音，用 -을지언정 → 늦을지언정。',
        },
        {
          prompt: '-을지언정 语义是……',
          options: ['纵然……也……（纯让步）', '宁可……也不……（对比拒绝）', '如果……的话', '因为……所以……'],
          answer: 1,
          explanation: '-을지언정 表"宁可A也不B"，后句必否定/拒绝，与 -을지라도 语义不同。',
        },
      ],
    },
    linkedGrammarIds: ['card-p26-l02', 'card-p26-l04'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"宁可挨饿也不接受帮助" —— 这种"宁可A也不B"的强气节表达，韩语用 <b>-을/ㄹ지언정</b>。<br>结构和 -을지라도 很像，但语义完全不同：这里后句必须是否定/拒绝。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-을지언정 vs -을지라도</b><br>
    ・-을지라도 → 纯让步「纵然……也……」，后句可肯定<br>
    <span style="color:#89756e">죽을지라도 진리를 지키겠다.（纵死也守真理）</span><br>
    ・-을지언정 → 对比「宁可……也不……」，后句必否定<br>
    <span style="color:#89756e">죽을지언정 배신은 안 하겠다.（宁死不背叛）</span>
  </div>
</div>`,
    compareLabel: '-을지언정 vs -을지라도',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-을/ㄹ지언정：宁可</div>
  <div style="font-size:14px;color:#89756e">"宁可A也不B" 的强对比拒绝</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心形态</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      有收音 → <b>-을지언정</b>：굶을지언정<br>
      无收音 → <b>-ㄹ지언정</b>：갈지언정<br>
      名词 → <b>-(이)ㄹ지언정</b>：학생일지언정
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心语义</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      前句：宁愿接受的极端/负面情况<br>
      后句：绝对拒绝的事（必否定）<br>
      句式：A-을지언정 B 안/못/-지 않다
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">죽을지언정 갈 거예요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">죽을지언정 안 갈 거예요（后句必否定）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가을지언정</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈지언정</span></div></div>
  </div>
</div>`,
  },

  // ── 第4课：-을/ㄹ망정 ──────────────────────────────────────
  {
    id: 'card-p26-l04',
    partNumber: 26,
    lessonNumber: 4,
    title: '-을/ㄹ망정',
    whatItDoes: '即使/宁可', english: 'Even if / Rather',
    whatItDoesBody: '「-을/ㄹ망정」表达"就算……也……""哪怕……也……"，含有"退一步也可以，但底线不变"的语气。前句是最低限度的让步，后句强调不能突破的底线。', english: '「-을/ㄹ망정」 expresses "even if... still..." or "even if... at least...", carrying a nuance of "conceding a step, but the bottom line remains unchanged." The first clause is a minimal concession, while the second clause emphasizes a boundary that cannot be crossed.',
    structureNote: '词干：有收音 -을망정 / 无收音 -ㄹ망정 · 名词 -(이)ㄹ망정', english: 'Verb stem: with final consonant -을망정 / without final consonant -ㄹ망정 · Noun + -(이)ㄹ망정',
    rulesNote: '结构类似 -을지언정，但语气比 -을지언정 稍弱，更常用；后句常为消极/否定/义务表达', english: 'The structure is similar to -을지언정, but the tone is slightly weaker and more commonly used; the following clause often expresses a negative, negative, or obligatory meaning.',
    structures: [
      {
        ko: '가난할망정 자존심은 잃지 않아요.',
        zh: '就算贫穷也不失自尊。',
        tokens: [
          { text: '가난할망정', role: 'plain' },
          { text: '자존심은', role: 'object' },
          { text: '잃지 않아요', role: 'verb' },
        ],
      },
      {
        ko: '늦게 갈망정 꼭 가겠습니다.',
        zh: '就算晚点去也一定去。',
        tokens: [
          { text: '늦게', role: 'plain' },
          { text: '갈망정', role: 'verb' },
          { text: '꼭', role: 'plain' },
          { text: '가겠습니다', role: 'verb' },
        ],
      },
      {
        ko: '작을망정 우리 집이에요.',
        zh: '虽然小也是我们的家。',
        tokens: [
          { text: '작을망정', role: 'plain' },
          { text: '우리 집이에요', role: 'plain' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音 → -을망정', examples: '먹다 → 먹을망정 / 작다 → 작을망정' },
      { type: 'rule', text: '无收音 → -ㄹ망정', examples: '가다 → 갈망정 / 크다 → 클망정' },
      { type: 'rule', text: '名词：-(이)ㄹ망정', examples: '거지일망정, 학생일망정' },
      { type: 'usage', text: '语义：前句退让/负面，后句坚持底线', examples: '가난할망정 정직해요.（穷但诚实）' },
      { type: 'usage', text: '后句常带 -지 않다、안 -、잃지 않다、-어야 하다', examples: '가난할망정 잃지 않아요.（哪怕贫穷也不失去〔尊严〕。）' },
      { type: 'compare', text: '-을망정 vs -을지언정 → 语气强度：-을지언정 更强、更正式，-을망정 更常用', examples: '죽을지언정（宁死）> 죽을망정（就算死）' },
      { type: 'note', text: '常出现于书面语和演讲，也可用于稍正式对话', examples: '작을망정 소중해요.（虽然小却珍贵。）' },
      { type: 'note', text: '语感偏"退一步先认下不足，再守住价值"：前句常是承认自己/自家东西差一点，后句为它辩护或坚持底线。这层"知足/自辩"的味道正是它区别于 -지언정（决绝拒绝）之处', examples: '작을망정 우리 집이에요.（虽小，也是我们的家。）' },
      { type: 'note', text: '别和另一个长得像的 -기에 망정이지 / -니 망정이지 混：那是"幸好…否则就…"的固定结构，表庆幸，跟本课让步的 -을/ㄹ망정 毫无关系', examples: '일찍 왔기에 망정이지, 큰일 날 뻔했어요.（幸好来得早，不然差点出大事。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '가난할망정', role: 'plain' },
          { text: '자존심은', role: 'object' },
          { text: '잃지', role: 'verb' },
          { text: '않아요', role: 'verb' },
        ],
        zh: '就算贫穷也不失自尊。',
        swapWords: ['가난하다', '힘들다', '어렵다', '고달프다'],
      },
      {
        wordBlocks: [
          { text: '늦게', role: 'plain' },
          { text: '갈망정', role: 'verb' },
          { text: '꼭', role: 'plain' },
          { text: '가겠습니다', role: 'verb' },
        ],
        zh: '就算晚点去也一定去。',
        swapWords: ['가다', '오다', '도착하다', '들르다'],
      },
      {
        wordBlocks: [
          { text: '작을망정', role: 'plain' },
          { text: '우리', role: 'plain' },
          { text: '집이에요', role: 'plain' },
        ],
        zh: '虽然小也是我们的家。',
        swapWords: ['작다', '낡다', '초라하다', '좁다'],
      },
    ],
    scenarios: [
      { icon: '💰', context: '骨气', ko: '가난할망정 자존심은 잃지 않아요.', zh: '就算贫穷也不失自尊。' },
      { icon: '⏰', context: '延迟', ko: '늦게 갈망정 꼭 가겠습니다.', zh: '就算晚也一定去。' },
      { icon: '🏠', context: '知足', ko: '작을망정 우리 집이에요.', zh: '虽小也是我们的家。' },
      { icon: '💼', context: '尊严', ko: '망할망정 원칙은 지키겠어요.', zh: '就算破产也要守原则。' },
      { icon: '🍚', context: '生活', ko: '못 먹을망정 훔치지는 않아요.', zh: '就算吃不上也不偷。' },
      { icon: '⚔️', context: '正义', ko: '질망정 정정당당하게 싸울 거예요.', zh: '就算输也要堂堂正正打。' },
    ],
    mistakes: [
      { wrong: '가망정', correct: '갈망정', note: '无收音 加 -ㄹ망정（词干+ㄹ）' },
      { wrong: '먹ㄹ망정', correct: '먹을망정', note: '有收音 加 -을망정' },
      { wrong: '학생망정', correct: '학생일망정', note: '名词需加系词 이 后变形' },
    ],
    quickTable: {
      title: '-을/ㄹ망정 形态一览', english: '-을/ㄹ망정 Form Overview',
      headers: ['词类', '规则', '例子'],
      rows: [
        ['有收音', '-을망정', '먹을망정, 작을망정'],
        ['无收音', '-ㄹ망정', '갈망정, 클망정'],
        ['名词有收音', '-이ㄹ망정', '학생일망정'],
        ['名词无收音', '-ㄹ망정', '거지일망정'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-을/ㄹ망정 变形练习', english: '-을/ㄹ망정 Conjugation Practice',
      body: '根据收音选择',
      questions: [
        {
          prompt: '(가난하다) 자존심은 잃지 않아요.',
          options: ['가난하망정', '가난할망정', '가난했을망정', '가난하는망정'],
          answer: 1,
          explanation: '가난하다 词干 가난하 无收音，加 -ㄹ망정 → 가난할망정。',
        },
        {
          prompt: '(먹다) 훔치지는 않아요.',
          options: ['먹ㄹ망정', '먹을망정', '먹었을망정', '먹는망정'],
          answer: 1,
          explanation: '먹다 有收音，用 -을망정 → 먹을망정。',
        },
        {
          prompt: '(작다) 우리 집이에요.',
          options: ['작망정', '작을망정', '작ㄹ망정', '작았망정'],
          answer: 1,
          explanation: '작다 有收音，用 -을망정 → 작을망정。',
        },
        {
          prompt: '-을망정 后句一般是……',
          options: ['肯定意愿的最好情况', '守底线/否定/义务', '疑问句', '未来推测'],
          answer: 1,
          explanation: '-을망정 表退让接受前句负面，但后句坚持底线，多为否定/义务表达。',
        },
      ],
    },
    linkedGrammarIds: ['card-p26-l03'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"就算贫穷，自尊也不能丢" —— 这种"退一步但守底线"的表达用 <b>-을/ㄹ망정</b>。<br>结构和 -을지언정 类似，但语气稍弱，更常用。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-을망정 vs -을지언정</b><br>
    结构相同，语义都是"就算/宁可"，但——<br>
    ・-을지언정 → 语气最强，多用于书面、演讲<br>
    ・-을망정 → 语气稍弱，日常/书面均可<br>
    翻译时都可作"就算……也……"。
  </div>
</div>`,
    compareLabel: '-을망정 vs -을지언정',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-을/ㄹ망정：就算</div>
  <div style="font-size:14px;color:#89756e">退让让步 · 守底线</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心形态</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      有收音 → <b>-을망정</b>：먹을망정<br>
      无收音 → <b>-ㄹ망정</b>：갈망정<br>
      名词 → <b>-(이)ㄹ망정</b>：학생일망정
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">语义核心</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      前句：退让接受<br>
      后句：坚持底线（多否定/义务）<br>
      如：가난할망정 부정한 돈은 안 받아요.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가망정</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갈망정（无收音加 -ㄹ망정）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생망정</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생일망정</span></div></div>
  </div>
</div>`,
  },

  // ── 第5课：-는 한이 있어도 ──────────────────────────────────────
  {
    id: 'card-p26-l05',
    partNumber: 26,
    lessonNumber: 5,
    title: '-는 한이 있어도',
    whatItDoes: '即便到……的地步', english: 'Even if it comes to the point of...',
    whatItDoesBody: '「-는 한이 있어도 / -는 한이 있더라도」表示"即便到了……的地步也……"，前句是最极端/最坏的结果，后句表达坚决意志。语气很强，多用于书面语和坚定表态。', english: '「-는 한이 있어도 / -는 한이 있더라도」means "even if it comes to the point of..." The preceding clause presents the most extreme/worst outcome, and the following clause expresses a firm determination. The tone is strong and is mainly used in written language and firm statements.',
    structureNote: '动词词干 + -는 한이 있어도 / -는 한이 있더라도', english: 'Verb stem + -는 한이 있어도 / -는 한이 있더라도',
    rulesNote: '固定搭配 "N + 한이 있어도" 或直接接动词 -는 한이 있어도；名词用 -(이)라는 한이 있어도', english: 'Fixed expression "N + 한이 있어도" or directly attach to verbs as -는 한이 있어도; for nouns, use -(이)라는 한이 있어도',
    structures: [
      {
        ko: '실패하는 한이 있어도 도전해 보고 싶어요.',
        zh: '即便失败也想挑战一下。',
        tokens: [
          { text: '실패하는 한이 있어도', role: 'verb' },
          { text: '도전해 보고 싶어요', role: 'verb' },
        ],
      },
      {
        ko: '밤을 새우는 한이 있더라도 내일까지 끝낼게요.',
        zh: '即便熬夜也要在明天之前完成。',
        tokens: [
          { text: '밤을', role: 'object' },
          { text: '새우는 한이 있더라도', role: 'verb' },
          { text: '내일까지', role: 'time' },
          { text: '끝낼게요', role: 'verb' },
        ],
      },
      {
        ko: '회사를 그만두는 한이 있어도 이 프로젝트는 꼭 할 거예요.',
        zh: '就算辞职也要做完这个项目。',
        tokens: [
          { text: '회사를', role: 'object' },
          { text: '그만두는 한이 있어도', role: 'verb' },
          { text: '이 프로젝트는', role: 'object' },
          { text: '꼭', role: 'plain' },
          { text: '할 거예요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -는 한이 있어도 / -는 한이 있더라도', examples: '실패하다 → 실패하는 한이 있어도' },
      { type: 'rule', text: '不与形容词直接连用；用形容词时改说 "그런 한이 있어도"', examples: '(避免) 예쁜 한이 있어도 → (改说) 어렵게 되는 한이 있어도' },
      { type: 'usage', text: '前句是最坏假设，后句是坚决意志（-겠다/-을 거예요/-어야 하다）', examples: '지는 한이 있어도 끝까지 싸울게요.（哪怕会输也要战斗到底。）' },
      { type: 'usage', text: '常见搭配：실패하다 / 그만두다 / 늦다 / 새우다 / 지다 / 죽다', examples: '죽는 한이 있어도 안 팔아요.（哪怕死也不卖。）' },
      { type: 'note', text: '「-는 한이 있어도」比「-더라도」语气更极端，专用于"到那种地步也……"', examples: '늦더라도 갈게요（即使晚也会去）vs 늦는 한이 있어도 갈게요.（哪怕会迟到也要去〔语气更强〕）' },
      { type: 'compare', text: '与 -을지언정 相似，但前者强调"到达那种极端结果"', examples: '지는 한이 있어도 = 지더라도, 지는 상황이 되어도' },
      { type: 'note', text: '别把结构看成黑箱：한 是名词"限度/地步"，한이 있어도 字面是"即使有落到那种地步的情况也"。理解这个字面就不会记错语序', examples: '실패하는 한이 있어도 = 即使有落到失败那一步的情况，也……' },
      { type: 'note', text: '前句必须是"不愿发生的坏结果假设"，不能套已成事实或中性状态。中文"就算"能接"就算现在很累"（当下事实），但此结构不行——它要的是"会……的地步"这种未来风险', examples: '(✗) 지금 피곤한 한이 있어도 → (✓) 회사를 그만두는 한이 있어도（要的是坏结果假设）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '실패하는 한이', role: 'verb' },
          { text: '있어도', role: 'verb' },
          { text: '도전할', role: 'verb' },
          { text: '거예요', role: 'verb' },
        ],
        zh: '即便失败也要挑战。',
        swapWords: ['실패하다', '넘어지다', '지다', '떨어지다'],
      },
      {
        wordBlocks: [
          { text: '밤을', role: 'object' },
          { text: '새우는 한이', role: 'verb' },
          { text: '있더라도', role: 'verb' },
          { text: '끝낼게요', role: 'verb' },
        ],
        zh: '即便熬夜也要做完。',
        swapWords: ['새우다', '고생하다', '늦다', '무리하다'],
      },
      {
        wordBlocks: [
          { text: '회사를', role: 'object' },
          { text: '그만두는 한이', role: 'verb' },
          { text: '있어도', role: 'verb' },
          { text: '할 거예요', role: 'verb' },
        ],
        zh: '就算辞职也要做。',
        swapWords: ['그만두다', '나오다', '떠나다', '포기하다'],
      },
    ],
    scenarios: [
      { icon: '🎯', context: '决心', ko: '실패하는 한이 있어도 도전해 보고 싶어요.', zh: '就算失败也想挑战。' },
      { icon: '🌙', context: '熬夜', ko: '밤을 새우는 한이 있더라도 끝낼게요.', zh: '就算熬夜也要做完。' },
      { icon: '💼', context: '辞职', ko: '회사를 그만두는 한이 있어도 이 일은 해야 해요.', zh: '就算辞职也要做这件事。' },
      { icon: '🥊', context: '拼到底', ko: '지는 한이 있어도 끝까지 싸울 거예요.', zh: '就算输也要打到底。' },
      { icon: '💰', context: '倾家', ko: '재산을 잃는 한이 있어도 약속은 지킬게요.', zh: '就算失去财产也守约。' },
      { icon: '⚕️', context: '身体', ko: '앓아눕는 한이 있어도 오늘은 갈 거예요.', zh: '哪怕病倒也要去。' },
    ],
    mistakes: [
      { wrong: '실패한 한이 있어도', correct: '실패하는 한이 있어도', note: '固定形态是 -는 한이 있어도，动词现在形不用 -은/ㄴ' },
      { wrong: '예쁜 한이 있어도', correct: '실패하는 한이 있어도', note: '此结构与动词搭配（-는 한이 있어도），形容词罕用；例句应改用动词句' },
      { wrong: '실패하는 한이 있으면', correct: '실패하는 한이 있어도', note: '固定为 -어도/-더라도 让步，不用 -으면 条件' },
    ],
    quickTable: {
      title: '-는 한이 있어도 结构一览', english: '-는 한이 있어도 Structure Overview',
      headers: ['要点', '规则', '例子'],
      rows: [
        ['结构', '动词 + -는 한이 있어도', '실패하는 한이 있어도'],
        ['变体', '-는 한이 있더라도', '지는 한이 있더라도'],
        ['与形容词', '一般避免', '(不用) 예쁜 한이 있어도'],
        ['后句', '强意志/义务', '-겠다, -을 거예요, -어야 하다'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-는 한이 있어도 练习', english: '-는 한이 있어도 Practice',
      body: '选择正确形式',
      questions: [
        {
          prompt: '(실패하다) 도전해 보고 싶어요.',
          options: ['실패한 한이 있어도', '실패하는 한이 있어도', '실패할 한이 있어도', '실패했는 한이 있어도'],
          answer: 1,
          explanation: '固定形态是"动词现在-는 한이 있어도"，不是过去/未来。',
        },
        {
          prompt: '(밤을 새우다) 내일까지 끝낼게요.',
          options: ['새운 한이 있어도', '새우는 한이 있어도', '새울 한이 있어도', '새웠는 한이 있어도'],
          answer: 1,
          explanation: '固定"-는 한이 있어도" → 새우는 한이 있어도。',
        },
        {
          prompt: '-는 한이 있어도 后句应该是……',
          options: ['疑问/推测', '强意志或必须做的事', '否定条件', '过去经验'],
          answer: 1,
          explanation: '此结构强调"即便到那种极端地步也……"，后接强意志/义务。',
        },
        {
          prompt: '(회사를 그만두다) 이 프로젝트는 할 거예요.',
          options: ['그만둔 한이 있어도', '그만두는 한이 있어도', '그만둘 한이 있어도', '그만두었는 한이 있어도'],
          answer: 1,
          explanation: '固定"-는 한이 있어도" → 그만두는 한이 있어도。',
        },
      ],
    },
    linkedGrammarIds: ['card-p26-l01', 'card-p26-l03', 'card-p26-l04'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"就算熬夜也要做完" —— 韩语用固定表达 <b>-는 한이 있어도</b>。<br>它比 -더라도 更极端，强调"哪怕落到那种地步也……"。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-더라도 vs -는 한이 있어도</b><br>
    ・-더라도 → 一般让步，"就算……也"<br>
    <span style="color:#89756e">늦더라도 갈게요.（就算晚点也去）</span><br>
    ・-는 한이 있어도 → 到极端地步的让步<br>
    <span style="color:#89756e">밤을 새우는 한이 있어도 끝낼게요.（就算熬夜也做完）</span>
  </div>
</div>`,
    compareLabel: '一般让步 vs 极端让步',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-는 한이 있어도：即便到……地步</div>
  <div style="font-size:14px;color:#89756e">极端让步 · 强意志</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">固定结构</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      动词 + <b>-는 한이 있어도</b><br>
      动词 + <b>-는 한이 있더라도</b><br>
      前句极端 → 后句坚决意志
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常见搭配</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      실패하는 한이 있어도<br>
      그만두는 한이 있어도<br>
      밤을 새우는 한이 있어도<br>
      지는 한이 있어도
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">실패한 한이 있어도</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">실패하는 한이 있어도</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">실패하는 한이 있으면</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">실패하는 한이 있어도</span></div></div>
  </div>
</div>`,
  },

  // ── 第6课：-고자 / -고자 하다 ──────────────────────────────────────
  {
    id: 'card-p26-l06',
    partNumber: 26,
    lessonNumber: 6,
    title: '-고자 / -고자 하다',
    whatItDoes: '意图/打算（正式）', english: 'Intention/Plan (Formal)',
    whatItDoesBody: '「-고자 / -고자 하다」表示意图、目的、打算，"想……""打算……""为了……"。语气正式，多用于书面语、演讲、新闻、正式文件。相当于口语中的 -(으)려고 / -(으)려고 하다 的正式版。', english: '「-고자 / -고자 하다」 expresses intention, purpose, or plan, meaning "want to..." "plan to..." "in order to...". The tone is formal and is mainly used in written language, speeches, news, and official documents. It is the formal equivalent of the colloquial -(으)려고 / -(으)려고 하다.',
    structureNote: '动词词干 + -고자（连接） · 动词词干 + -고자 하다（做谓语）', english: 'Verb stem + -고자 (connective) · Verb stem + -고자 하다 (as predicate)',
    rulesNote: '主语必须一致；不与形容词/名词连用；-고자 直接接词干，不看收音', english: 'The subject must be consistent; cannot be used with adjectives or nouns; -고자 attaches directly to the stem regardless of the final consonant.',
    structures: [
      {
        ko: '한국어를 배우고자 왔어요.',
        zh: '为了学韩语而来。',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '배우고자', role: 'verb' },
          { text: '왔어요', role: 'verb' },
        ],
      },
      {
        ko: '오늘은 이 문제에 대해 말씀드리고자 합니다.',
        zh: '今天想就这个问题谈一谈。',
        tokens: [
          { text: '오늘은', role: 'time' },
          { text: '이 문제에 대해', role: 'plain' },
          { text: '말씀드리고자 합니다', role: 'verb' },
        ],
      },
      {
        ko: '더 나은 미래를 만들고자 노력하고 있습니다.',
        zh: '为了创造更好的未来而努力。',
        tokens: [
          { text: '더 나은', role: 'plain' },
          { text: '미래를', role: 'object' },
          { text: '만들고자', role: 'verb' },
          { text: '노력하고 있습니다', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -고자，不看收音', examples: '가다 → 가고자 / 먹다 → 먹고자 / 만들다 → 만들고자' },
      { type: 'rule', text: '-고자 하다 用作谓语，"打算……"', examples: '말씀드리고자 합니다.（我想向您说明。）' },
      { type: 'usage', text: '不与形容词、名词、있다/없다 连用', examples: '(✗) 예쁘고자 → 只能用动词' },
      { type: 'usage', text: '主语必须一致：前后主语必须是同一人', examples: '(제가) 배우고자 (제가) 왔어요.（我为了学习而来。）' },
      { type: 'usage', text: '语气正式，多用于书面、演讲、公文', examples: '국민 여러분께 알려드리고자 합니다.（谨向各位国民告知。）' },
      { type: 'compare', text: '-고자 vs -(으)려고 → 语义相同，前者正式书面，后者日常口语', examples: '먹으려고 왔어요.(口语) / 먹고자 왔어요.(正式)' },
      { type: 'note', text: '后句一般是动作，不能接命令/建议', examples: '(✗) 배우고자 오세요 → (✓) 배우려고 오세요' },
      { type: 'note', text: '语体要前后一致：고자 是正式书面感，搭配 합니다体才自然；配 해요/했어요 这种日常口语尾会有违和感', examples: '(违和) 말씀드리고자 해요 → (自然) 말씀드리고자 합니다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '배우고자', role: 'verb' },
          { text: '왔어요', role: 'verb' },
        ],
        zh: '为了学韩语而来。',
        swapWords: ['한국어', '영어', '중국어', '일본어'],
      },
      {
        wordBlocks: [
          { text: '이 문제에', role: 'plain' },
          { text: '대해', role: 'plain' },
          { text: '말씀드리고자', role: 'verb' },
          { text: '합니다', role: 'verb' },
        ],
        zh: '想就这个问题谈一谈。',
        swapWords: ['말씀드리다', '설명하다', '알리다', '전하다'],
      },
      {
        wordBlocks: [
          { text: '미래를', role: 'object' },
          { text: '만들고자', role: 'verb' },
          { text: '노력하고', role: 'verb' },
          { text: '있습니다', role: 'verb' },
        ],
        zh: '为了创造未来而努力着。',
        swapWords: ['만들다', '창조하다', '이루다', '지키다'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '目的', ko: '한국어를 배우고자 유학을 왔어요.', zh: '为了学韩语而来留学。' },
      { icon: '🎤', context: '演讲', ko: '오늘 말씀드리고자 하는 것은 환경 문제입니다.', zh: '今天想谈的是环境问题。' },
      { icon: '📰', context: '新闻', ko: '정부는 새 정책을 추진하고자 합니다.', zh: '政府打算推进新政策。' },
      { icon: '🎯', context: '意图', ko: '더 나은 사회를 만들고자 노력합니다.', zh: '为创造更好的社会而努力。' },
      { icon: '📝', context: '书面', ko: '이 자료를 통해 이해하고자 합니다.', zh: '想通过这份资料来理解。' },
      { icon: '🤝', context: '正式', ko: '여러분께 감사의 말씀을 드리고자 합니다.', zh: '想向各位表达感谢。' },
    ],
    mistakes: [
      { wrong: '예쁘고자 화장해요', correct: '예뻐지려고 화장해요', note: '-고자 不与形容词连用，用 -(으)려고' },
      { wrong: '가고자 하세요', correct: '가려고 하세요', note: '-고자 后句不能是命令/建议' },
      { wrong: '엄마가 요리하고자 제가 먹어요', correct: '엄마가 요리하려고 해요 / 저는 먹고자 왔어요', note: '前后主语必须一致' },
    ],
    quickTable: {
      title: '-고자 使用要点', english: 'Key Points for Using -고자',
      headers: ['要点', '规则', '例子'],
      rows: [
        ['连接', '动词词干 + -고자', '가고자, 배우고자'],
        ['做谓语', '-고자 하다', '말씀드리고자 합니다'],
        ['主语', '前后必须一致', '제가 배우고자 (제가) 왔어요'],
        ['语气', '书面/正式', '演讲、新闻、公文'],
        ['禁用', '形容词/命令句', '(✗) 예쁘고자 오세요'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-고자 / -고자 하다 综合', english: '-고자 / -고자 하다 Overview',
      body: '选出正确表达',
      questions: [
        {
          prompt: '한국어를 (배우다) 왔어요.',
          options: ['배우려', '배우고자', '배우면서', '배우도록'],
          answer: 1,
          explanation: '"为了学习而来"的正式书面表达用 -고자 → 배우고자。',
        },
        {
          prompt: '오늘 이 문제에 대해 (말씀드리다).',
          options: ['말씀드립니다', '말씀드리고자 합니다', '말씀드리도록 하겠습니다', '말씀드리려 합니다'],
          answer: 1,
          explanation: '演讲开场"想就……谈一谈"的正式表达用 -고자 하다 → 말씀드리고자 합니다。',
        },
        {
          prompt: '哪个句子正确？',
          options: ['예쁘고자 화장해요', '가고자 하세요', '한국어를 배우고자 왔어요', '엄마가 요리하고자 제가 먹어요'],
          answer: 2,
          explanation: '-고자 只与动词、主语一致、非命令句连用，只有第3个符合。',
        },
        {
          prompt: '-고자 vs -(으)려고 的区别是……',
          options: ['语义完全不同', '-고자 更正式书面，-(으)려고 更口语', '-고자 只用于过去，-(으)려고 只用于未来', '-고자 表结果，-(으)려고 表原因'],
          answer: 1,
          explanation: '两者语义相同，但 -고자 更正式，多用书面/演讲；-(으)려고 更口语。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">演讲开场："今天想跟大家谈……" —— 韩语正式说法是 <b>말씀드리고자 합니다</b>。<br>-고자 就是 -(으)려고 的正式版，专用于书面、演讲、新闻。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-고자 vs -(으)려고</b><br>
    语义完全相同："想……""为了……"<br>
    ・-(으)려고 → 日常口语常用<br>
    <span style="color:#89756e">한국어를 배우려고 왔어요.（来学韩语）</span><br>
    ・-고자 → 书面、演讲、正式场合<br>
    <span style="color:#89756e">한국어를 배우고자 왔습니다.（同上，正式版）</span>
  </div>
</div>`,
    compareLabel: '-고자 vs -(으)려고',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-고자 / -고자 하다：正式意图</div>
  <div style="font-size:14px;color:#89756e">-(으)려고 的书面/演讲版</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心用法</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      连接 → 动词 + <b>-고자</b><br>
      作谓 → 动词 + <b>-고자 하다</b><br>
      主语前后必须一致
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">使用场合</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      演讲开场：말씀드리고자 합니다.<br>
      公文/新闻：추진하고자 합니다.<br>
      书面表意图：만들고자 노력합니다.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">예쁘고자 화장해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">예뻐지려고 화장해요（不与形容词连用）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가고자 하세요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">가려고 하세요（后句不能命令）</span></div></div>
  </div>
</div>`,
  },

  // ── 第7课：-도록 ──────────────────────────────────────
  {
    id: 'card-p26-l07',
    partNumber: 26,
    lessonNumber: 7,
    title: '-도록',
    whatItDoes: '为了/使得', english: 'In order to / so that',
    whatItDoesBody: '「-도록」有多义：① 目的"为了……""让……"，② 程度"到……地步"，③ 命令/建议的委婉表达（-도록 하다）。核心语义是"引导某种结果或状态"。', english: '「-도록」 has multiple meanings: ① purpose "in order to..." "so that...", ② degree "to the point of...", ③ euphemistic command/suggestion (-도록 하다). The core meaning is "to lead to a certain result or state".',
    structureNote: '动词/形容词词干 + -도록（不看收音） · -도록 하다 委婉命令', english: 'Verb/Adjective stem + -도록 (regardless of final consonant) · -도록 하다 for euphemistic commands',
    rulesNote: '语义1：目的（다치지 않도록）；语义2：程度（밤이 새도록）；语义3：委婉命令（시간을 지키도록 하세요）', english: 'Meaning 1: purpose (다치지 않도록); Meaning 2: degree (밤이 새도록); Meaning 3: euphemistic command (시간을 지키도록 하세요)',
    structures: [
      {
        ko: '다치지 않도록 조심하세요.',
        zh: '为了不受伤，请小心。',
        tokens: [
          { text: '다치지 않도록', role: 'verb' },
          { text: '조심하세요', role: 'verb' },
        ],
      },
      {
        ko: '밤이 새도록 이야기했어요.',
        zh: '一直聊到天亮。',
        tokens: [
          { text: '밤이', role: 'subject' },
          { text: '새도록', role: 'verb' },
          { text: '이야기했어요', role: 'verb' },
        ],
      },
      {
        ko: '내일까지 자료를 제출하도록 하세요.',
        zh: '请在明天之前提交资料。',
        tokens: [
          { text: '내일까지', role: 'time' },
          { text: '자료를', role: 'object' },
          { text: '제출하도록 하세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + -도록，不看收音', examples: '먹다 → 먹도록 / 가다 → 가도록 / 좋다 → 좋도록' },
      { type: 'usage', text: '语义1 目的："为了让……"，后句多为动作/命令', examples: '다치지 않도록 조심하세요.（为不受伤而小心）' },
      { type: 'usage', text: '语义2 程度/时间："到……地步/一直到"', examples: '밤이 새도록 공부했어요.（学到天亮）' },
      { type: 'usage', text: '语义3 -도록 하다：委婉命令/建议', examples: '늦지 않도록 하세요.（请不要迟到）' },
      { type: 'compare', text: '-도록 vs -기 위해서 → 前者更自然，含"让……"结果导向；后者纯目的', examples: '이해하도록 설명했어요.(让理解而说) / 이해하기 위해 설명했어요.(为理解而说)' },
      { type: 'note', text: '目的用法主语可不同，与 -기 위해서 不同（后者主语须一致）', examples: '아이가 잘 자도록 조용히 하세요.（主语不同）' },
      { type: 'note', text: '-도록 하겠습니다 是正式承诺"我会做到……"', examples: '노력하도록 하겠습니다.（我会努力的。）' },
      { type: 'note', text: '否定用 "-지 않도록"（为了不……）是最高频形态，因为叮嘱/提醒场景多。别用命令否定 말다 去接', examples: '(标准) 늦지 않도록 하세요 / (勿写) 늦지 말도록 하세요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '다치지', role: 'verb' },
          { text: '않도록', role: 'verb' },
          { text: '조심하세요', role: 'verb' },
        ],
        zh: '为了不受伤请小心。',
        swapWords: ['다치다', '넘어지다', '떨어지다', '실수하다'],
      },
      {
        wordBlocks: [
          { text: '밤이', role: 'subject' },
          { text: '새도록', role: 'verb' },
          { text: '이야기했어요', role: 'verb' },
        ],
        zh: '一直聊到天亮。',
        swapWords: ['새다', '깊다', '지나다', '오다'],
      },
      {
        wordBlocks: [
          { text: '자료를', role: 'object' },
          { text: '제출하도록', role: 'verb' },
          { text: '하세요', role: 'verb' },
        ],
        zh: '请提交资料。',
        swapWords: ['제출하다', '작성하다', '준비하다', '보내다'],
      },
    ],
    scenarios: [
      { icon: '⚠️', context: '安全', ko: '다치지 않도록 조심하세요.', zh: '为不受伤请小心。' },
      { icon: '🌙', context: '通宵', ko: '밤이 새도록 이야기했어요.', zh: '一直聊到天亮。' },
      { icon: '📝', context: '委婉命令', ko: '내일까지 자료를 제출하도록 하세요.', zh: '请明天之前提交。' },
      { icon: '🔊', context: '让别人做', ko: '아이가 잘 자도록 조용히 하세요.', zh: '为让孩子睡好请安静。' },
      { icon: '📢', context: '承诺', ko: '다시는 늦지 않도록 하겠습니다.', zh: '一定不再迟到。' },
      { icon: '🎯', context: '目的', ko: '실수하지 않도록 준비했어요.', zh: '为了不出错做了准备。' },
    ],
    mistakes: [
      { wrong: '다치지 않게 조심하세요', correct: '다치지 않도록 조심하세요', note: '两者意思接近，但 -도록 更书面正式；-게 更口语' },
      { wrong: '내가 이해하기 위해 그가 설명했어요', correct: '내가 이해하도록 그가 설명했어요', note: '-기 위해서 主语必须一致，主语不同时用 -도록' },
      { wrong: '먹도록 오세요', correct: '먹으러 오세요', note: '"为了吃而来"这种直接目的用 -(으)러，不用 -도록' },
    ],
    quickTable: {
      title: '-도록 三大用法', english: 'Three Main Uses of -도록',
      headers: ['用法', '含义', '例子'],
      rows: [
        ['目的', '为了/使得', '다치지 않도록 조심하세요'],
        ['程度/时间', '到……地步', '밤이 새도록 이야기했어요'],
        ['委婉命令', '-도록 하다', '늦지 않도록 하세요'],
        ['承诺', '-도록 하겠습니다', '노력하도록 하겠습니다'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '-도록 用法辨析', english: 'Distinguishing the Uses of -도록',
      body: '选择正确的表达',
      questions: [
        {
          prompt: '"为了不受伤请小心" 韩语说……',
          options: ['다치지 위해 조심하세요', '다치지 않도록 조심하세요', '다치지 않으러 조심하세요', '다치지 않고자 조심하세요'],
          answer: 1,
          explanation: '"为了不……" 表目的用 -도록，且需否定 → 다치지 않도록。',
        },
        {
          prompt: '"一直聊到天亮" 韩语说……',
          options: ['밤이 새는 동안 이야기했어요', '밤이 새도록 이야기했어요', '밤이 새면 이야기했어요', '밤이 새서 이야기했어요'],
          answer: 1,
          explanation: '"到……地步/时间"用 -도록 → 밤이 새도록。',
        },
        {
          prompt: '"请明天之前提交" 委婉命令……',
          options: ['제출하세요', '제출하도록 하세요', '제출하고자 하세요', '제출하려고 하세요'],
          answer: 1,
          explanation: '-도록 하다 是委婉命令 → 제출하도록 하세요。',
        },
        {
          prompt: '"孩子睡觉，我们安静" 主语不同，用……',
          options: ['아이가 자기 위해 조용히 해요', '아이가 자도록 조용히 해요', '아이가 자고자 조용히 해요', '아이가 자러 조용히 해요'],
          answer: 1,
          explanation: '主语不同的目的用 -도록（-기 위해서 主语须一致）。',
        },
      ],
    },
    linkedGrammarIds: ['card-p26-l06'],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"为了不受伤请小心" —— 韩语这里最自然的是 <b>-도록</b>。<br>-도록 有三个用法：目的、程度、委婉命令，一个搞定三种语境。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-도록 vs -기 위해서</b><br>
    ・-기 위해서 → 主语必须一致<br>
    <span style="color:#89756e">제가 시험을 잘 보기 위해 공부해요.</span><br>
    ・-도록 → 主语可不同，含"让……"结果导向<br>
    <span style="color:#89756e">아이가 잘 자도록 조용히 하세요.</span>
  </div>
</div>`,
    compareLabel: '-도록 vs -기 위해서',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-도록：目的/程度/委婉</div>
  <div style="font-size:14px;color:#89756e">一形三义</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">三大用法</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      ① 目的 → <b>-도록</b>：다치지 않도록<br>
      ② 程度 → <b>-도록</b>：밤이 새도록<br>
      ③ 委婉命令 → <b>-도록 하다</b>：제출하도록 하세요
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">承诺表达</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -도록 하겠습니다 = "一定/我会做到……"<br>
      다시는 늦지 않도록 하겠습니다.<br>
      최선을 다하도록 하겠습니다.
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹도록 오세요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹으러 오세요（直接目的用 -(으)러）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">내가 이해하기 위해 그가 설명했어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">내가 이해하도록 그가 설명했어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第8课：-치고 ──────────────────────────────────────
  {
    id: 'card-p26-l08',
    partNumber: 26,
    lessonNumber: 8,
    title: '-치고',
    whatItDoes: '说到……都', english: 'Speaking of... all / As for...',
    whatItDoesBody: '「N + 치고」有两种用法：① 全称"说到……没有例外/都是……"，② 例外/例外让步"作为……来说，(意外地)……"。语义靠语境判断。', english: '「N + 치고」has two usages: ① Universal statement "Speaking of..., there is no exception / all are...", ② Exception or concessive "As for..., (surprisingly)...". The meaning is determined by context.',
    structureNote: '名词 + 치고 · 常见搭配 "N 치고 -지 않은/없는 것이 없다"（全称） 或 "N 치고 意外结果"（例外）', english: 'Noun + 치고 · Common collocations "N 치고 -지 않은/없는 것이 없다" (universal) or "N 치고 unexpected result" (exception)',
    rulesNote: '语义1 全称：后接双否定"没有不……的"；语义2 例外：后接与常识相反的结果', english: 'Meaning 1 (universal): followed by double negation "there is none that is not..."; Meaning 2 (exception): followed by a result contrary to common sense',
    structures: [
      {
        ko: '한국 사람치고 김치를 안 먹는 사람은 없어요.',
        zh: '说到韩国人，没有不吃泡菜的。',
        tokens: [
          { text: '한국 사람치고', role: 'plain' },
          { text: '김치를', role: 'object' },
          { text: '안 먹는 사람은', role: 'subject' },
          { text: '없어요', role: 'verb' },
        ],
      },
      {
        ko: '봄치고 날씨가 너무 추워요.',
        zh: '作为春天，天气太冷了。',
        tokens: [
          { text: '봄치고', role: 'plain' },
          { text: '날씨가', role: 'subject' },
          { text: '너무 추워요', role: 'verb' },
        ],
      },
      {
        ko: '외국인치고 한국어를 잘하시네요.',
        zh: '作为外国人，韩语说得真好。',
        tokens: [
          { text: '외국인치고', role: 'plain' },
          { text: '한국어를', role: 'object' },
          { text: '잘하시네요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + 치고（不看收音，直接接）', examples: '학생치고, 봄치고, 외국인치고' },
      { type: 'usage', text: '语义1 全称：N 치고 -지 않은/없는 것이 없다 = "没有一个不……"', examples: '한국 사람치고 김치를 모르는 사람은 없어요.（凡是韩国人没有不知道泡菜的。）' },
      { type: 'usage', text: '语义2 例外：N 치고 + 意外结果 = "作为……却……"', examples: '봄치고 날씨가 너무 추워요.（作为春天却很冷）' },
      { type: 'usage', text: '语义2 常用来称赞：外国人韩语好、老人身手灵活等', examples: '외국인치고 한국어를 잘하시네요.（作为外国人，您韩语说得真好。）' },
      { type: 'compare', text: '-치고 vs -(이)라면 → 前者带评价语气，后者是纯条件', examples: '학생이라면(如果是学生) / 학생치고(说到学生/作为学生)' },
      { type: 'note', text: '两种语义靠后句判断：后句双否 → 全称；后句意外 → 例外', examples: '한국 사람치고 김치 안 먹는 사람 없다.(全) / 학생치고 잘 사네요.(意外)' },
      { type: 'compare', text: '加 는 说成 치고는，会明确锁定"例外/评价"那一层（作为……却/倒是……），基本不用于全称；想表意外反差时说 치고는 更清楚', examples: '봄치고는 날씨가 춥다.（作为春天倒是挺冷）/ 외국인치고는 발음이 좋다.（作为外国人发音倒好）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국 사람치고', role: 'plain' },
          { text: '김치를', role: 'object' },
          { text: '안 먹는 사람은', role: 'subject' },
          { text: '없어요', role: 'verb' },
        ],
        zh: '说到韩国人，没有不吃泡菜的。',
        swapWords: ['한국 사람', '학생', '아이', '어른'],
      },
      {
        wordBlocks: [
          { text: '봄치고', role: 'plain' },
          { text: '날씨가', role: 'subject' },
          { text: '너무', role: 'plain' },
          { text: '추워요', role: 'verb' },
        ],
        zh: '作为春天却很冷。',
        swapWords: ['봄', '여름', '가을', '겨울'],
      },
      {
        wordBlocks: [
          { text: '외국인치고', role: 'plain' },
          { text: '한국어를', role: 'object' },
          { text: '잘하시네요', role: 'verb' },
        ],
        zh: '作为外国人韩语说得真好。',
        swapWords: ['외국인', '초보자', '학생', '어린이'],
      },
    ],
    scenarios: [
      { icon: '🥬', context: '全称', ko: '한국 사람치고 김치를 안 먹는 사람은 없어요.', zh: '说到韩国人没有不吃泡菜的。' },
      { icon: '🌸', context: '意外冷', ko: '봄치고 날씨가 너무 추워요.', zh: '作为春天却很冷。' },
      { icon: '🇰🇷', context: '称赞', ko: '외국인치고 한국어를 잘하시네요.', zh: '作为外国人韩语说得好。' },
      { icon: '👴', context: '硬朗', ko: '노인치고 정말 건강하세요.', zh: '作为老人身体真硬朗。' },
      { icon: '💰', context: '性价比', ko: '이 가격치고 품질이 좋네요.', zh: '这个价位质量算好的。' },
      { icon: '📚', context: '难度', ko: '초급 책치고 내용이 어려워요.', zh: '作为初级书内容偏难。' },
    ],
    mistakes: [
      { wrong: '학생치고를', correct: '학생치고', note: '치고 是助词，后面不再加조사' },
      { wrong: '한국 사람치고 김치 좋아요', correct: '한국 사람치고 김치 안 먹는 사람 없어요', note: '全称语义后句需双否/否定形式' },
      { wrong: '외국인 치고 한국어 잘하네', correct: '외국인치고 한국어를 잘하시네요', note: '치고 直接连名词，中间不能空格；对方能力用敬语' },
    ],
    quickTable: {
      title: '-치고 两大语义', english: '-치고 Two Main Meanings',
      headers: ['语义', '句式', '例子'],
      rows: [
        ['全称', 'N 치고 -지 않은/없는 없다', '한국 사람치고 김치 안 먹는 사람 없어요'],
        ['例外', 'N 치고 (意外结果)', '봄치고 날씨가 추워요'],
        ['例外+称赞', 'N 치고 잘/좋/훌륭', '외국인치고 한국어를 잘해요'],
      ],
    },
    specialQuiz: {
      type: 'judge',
      title: '-치고 用法辨析', english: '-치고 Usage Distinction',
      body: '选择正确的句子',
      questions: [
        {
          prompt: '"说到韩国人没有不吃泡菜的" 韩语说……',
          options: ['한국 사람이면 김치 안 먹는 사람 없어요', '한국 사람치고 김치를 안 먹는 사람은 없어요', '한국 사람에게 김치 안 먹는 사람 없어요', '한국 사람보다 김치 안 먹는 사람 없어요'],
          answer: 1,
          explanation: '全称"N 치고 -지 않는 사람은 없다"结构 → 한국 사람치고 김치를 안 먹는 사람은 없어요。',
        },
        {
          prompt: '"作为春天却很冷" 韩语说……',
          options: ['봄이면 날씨가 추워요', '봄치고 날씨가 추워요', '봄이라서 날씨가 추워요', '봄까지 날씨가 추워요'],
          answer: 1,
          explanation: '例外语义 "作为……却……" 用 N치고 → 봄치고 날씨가 추워요。',
        },
        {
          prompt: '"外国人韩语很好" 称赞语气用……',
          options: ['외국인이면 한국어를 잘하네요', '외국인이니까 한국어를 잘하네요', '외국인치고 한국어를 잘하시네요', '외국인만 한국어를 잘하시네요'],
          answer: 2,
          explanation: '"作为……(意外地)好"用 N치고 → 외국인치고 한국어를 잘하시네요。',
        },
        {
          prompt: '-치고 有几种主要语义？',
          options: ['一种：只表全称', '两种：全称 + 例外', '一种：只表例外', '三种：条件+因果+让步'],
          answer: 1,
          explanation: '-치고 有两大语义：① 全称"N 치고 -지 않은 것 없다"，② 例外"作为N却……"。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"作为外国人，韩语说得真好" —— 这种"作为……(意外)……"的评价语气用 <b>N + 치고</b>。<br>-치고 有两种截然不同的用法：① 全称"都是这样" ② 例外"作为N却……"。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-치고 两大语义</b><br>
    ・全称 → 后句双否/否定<br>
    <span style="color:#89756e">한국 사람치고 김치 안 먹는 사람 없다.</span><br>
    ・例外 → 后句与常识相反<br>
    <span style="color:#89756e">봄치고 날씨가 너무 추워요.</span>
  </div>
</div>`,
    compareLabel: '全称 vs 例外',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-치고：说到/作为</div>
  <div style="font-size:14px;color:#89756e">全称与例外的双面助词</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">核心用法</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      ① 全称：N치고 -지 않은/없는 없다<br>
      → "说到N没有不……的"<br>
      ② 例外：N치고 + 意外结果<br>
      → "作为N却……(意外)"
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">高频搭配</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      한국 사람치고 · 학생치고<br>
      외국인치고 · 노인치고<br>
      봄치고 · 초보치고 · 이 가격치고
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생치고를</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생치고（치고后不加조사）</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">한국 사람치고 김치 좋아요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">한국 사람치고 김치 안 먹는 사람 없어요（全称需双否）</span></div></div>
  </div>
</div>`,
  },

  // ── 第9课：综合练习 ──────────────────────────────────────
  {
    id: 'card-p26-l09',
    partNumber: 26,
    lessonNumber: 9,
    title: 'P26 综合练习', english: 'P26 Comprehensive Practice',
    whatItDoes: 'P26 综合复习', english: 'P26 Comprehensive Review',
    whatItDoesBody: '本练习综合复习 P26 让步与意图强化章节的 8 个语法点：-더라도、-을/ㄹ지라도、-을/ㄹ지언정、-을/ㄹ망정、-는 한이 있어도、-고자、-도록、-치고。', english: 'This exercise comprehensively reviews the 8 grammar points from the P26 concession and intention reinforcement chapter: -더라도, -을/ㄹ지라도, -을/ㄹ지언정, -을/ㄹ망정, -는 한이 있어도, -고자, -도록, -치고.',
    structureNote: '综合本 Part 所有语法', english: 'Comprehensive review of all grammar points in this Part',
    rulesNote: '重点在让步语气强度阶梯和意图/目的三种表达的辨析', english: 'Focus on the intensity hierarchy of concessive tones and the distinction among the three expressions of intention/purpose',
    isPractice: true,
    structures: [
      {
        ko: '비가 오더라도 저는 갈 거예요.',
        zh: '就算下雨我也去。',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '오더라도', role: 'verb' },
          { text: '저는', role: 'subject' },
          { text: '갈 거예요', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 배우고자 왔어요.',
        zh: '为了学韩语而来。',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '배우고자', role: 'verb' },
          { text: '왔어요', role: 'verb' },
        ],
      },
      {
        ko: '다치지 않도록 조심하세요.',
        zh: '为了不受伤请小心。',
        tokens: [
          { text: '다치지 않도록', role: 'verb' },
          { text: '조심하세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '让步强度：-아/어도 < -더라도 < -을/ㄹ지라도' },
      { type: 'rule', text: '-을/ㄹ지언정 = 宁可A也不B（后句必否）' },
      { type: 'rule', text: '-을/ㄹ망정 = 就算A也守底线（较 -을지언정 弱）' },
      { type: 'rule', text: '-는 한이 있어도 = 即便到极端地步' },
      { type: 'usage', text: '-고자 / -고자 하다 = -(으)려고 的正式版' },
      { type: 'usage', text: '-도록 = 目的/程度/委婉命令（三义）' },
      { type: 'usage', text: '-치고 = 全称"没有不……" or 例外"作为N却……"' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '실패하는', role: 'verb' },
          { text: '한이', role: 'plain' },
          { text: '있어도', role: 'verb' },
          { text: '도전할 거예요', role: 'verb' },
        ],
        zh: '即使失败也要挑战。',
        swapWords: ['실패하다', '지다', '넘어지다', '떨어지다'],
      },
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '배우고자', role: 'verb' },
          { text: '왔어요', role: 'verb' },
        ],
        zh: '为了学韩语而来。',
        swapWords: ['한국어', '영어', '중국어', '일본어'],
      },
      {
        wordBlocks: [
          { text: '외국인치고', role: 'plain' },
          { text: '한국어를', role: 'object' },
          { text: '잘하시네요', role: 'verb' },
        ],
        zh: '作为外国人韩语说得好。',
        swapWords: ['외국인', '초보자', '아이', '학생'],
      },
    ],
    scenarios: [
      { icon: '💪', context: '强让步', ko: '아무리 힘들더라도 포기하지 않을 거예요.', zh: '不管多难都不放弃。' },
      { icon: '⚔️', context: '宁死', ko: '죽을지언정 배신은 하지 않아요.', zh: '宁死也不背叛。' },
      { icon: '🌙', context: '熬夜', ko: '밤을 새우는 한이 있더라도 끝낼게요.', zh: '就算熬夜也做完。' },
      { icon: '🎤', context: '正式意图', ko: '오늘 말씀드리고자 합니다.', zh: '今天想跟大家谈。' },
      { icon: '⚠️', context: '目的', ko: '다치지 않도록 조심하세요.', zh: '为不受伤请小心。' },
      { icon: '🌸', context: '例外', ko: '봄치고 날씨가 너무 추워요.', zh: '作为春天却很冷。' },
    ],
    mistakes: [
      { wrong: '죽을지언정 갈 거예요', correct: '죽을지언정 안 갈 거예요', note: '-을지언정 后句必否定' },
      { wrong: '예쁘고자 화장해요', correct: '예뻐지려고 화장해요', note: '-고자 不与形容词连用' },
      { wrong: '한국 사람치고 김치 좋아요', correct: '한국 사람치고 김치 안 먹는 사람 없어요', note: '-치고 全称需双否' },
    ],
    linkedGrammarIds: ['card-p26-l01', 'card-p26-l02', 'card-p26-l03', 'card-p26-l04', 'card-p26-l05', 'card-p26-l06', 'card-p26-l07', 'card-p26-l08'],
    specialQuiz: {
      type: 'judge',
      title: 'P26 综合练习', english: 'P26 Comprehensive Practice',
      body: '选择正确的表达',
      questions: [
        {
          prompt: '"就算下雨我也要去"（强让步）',
          options: ['비가 오면 갈 거예요', '비가 오더라도 갈 거예요', '비가 와서 갈 거예요', '비가 오지만 갈 거예요'],
          answer: 1,
          explanation: '强让步"就算……也……"用 -더라도 → 오더라도。',
        },
        {
          prompt: '"宁死也不背叛"（对比拒绝）',
          options: ['죽어도 배신을 해요', '죽을지언정 배신은 하지 않아요', '죽으면 배신하지 않아요', '죽으니까 배신 안 해요'],
          answer: 1,
          explanation: '-을지언정 表"宁可A也不B"，后句必否 → 죽을지언정 배신은 하지 않아요。',
        },
        {
          prompt: '演讲开场"想跟大家谈……"（正式）',
          options: ['말씀드리려고 합니다', '말씀드리고자 합니다', '말씀드리도록 합니다', '말씀드리려면 합니다'],
          answer: 1,
          explanation: '演讲/书面/正式意图用 -고자 하다 → 말씀드리고자 합니다。',
        },
        {
          prompt: '"作为外国人韩语说得好"（例外称赞）',
          options: ['외국인이면 한국어를 잘하시네요', '외국인이라서 한국어를 잘하시네요', '외국인치고 한국어를 잘하시네요', '외국인이지만 한국어를 잘하시네요'],
          answer: 2,
          explanation: '"作为N却/意外地……"用 N치고 → 외국인치고 잘하시네요。',
        },
      ],
    },
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P26 总结：让步与意图强化</div>
  <div style="font-size:14px;color:#89756e">TOPIK 高级表现体系</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">让步强度阶梯</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -아/어도 → 日常口语<br>
      <b>-더라도</b> → 强让步（假设）<br>
      <b>-을/ㄹ지라도</b> → 书面/演讲最强<br>
      <b>-을/ㄹ지언정</b> → "宁可A也不B"<br>
      <b>-을/ㄹ망정</b> → 退让守底线<br>
      <b>-는 한이 있어도</b> → 极端让步
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">意图/目的三兄弟</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      <b>-고자 / -고자 하다</b> → 正式意图<br>
      <b>-도록</b> → 目的/程度/委婉命令<br>
      <b>N치고</b> → 全称 or 例外评价
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">核心易错</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      1. -을지언정 后句必否定<br>
      2. -고자 不与形容词/命令连用<br>
      3. -는 한이 있어도 是固定形，只用 -는<br>
      4. -치고 全称需双否，例外需意外结果
    </div>
  </div>
</div>`,
  },

];
