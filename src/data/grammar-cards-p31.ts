import type { GrammarCard } from '@/types';

export const grammarCardsP31: GrammarCard[] = [
  // ── 第1课：-답다/-스럽다/-롭다 派生形容词后缀 ──────────────────────────────────────
  {
    id: 'card-p31-l01',
    partNumber: 31,
    lessonNumber: 1,
    title: '-답다/-스럽다/-롭다 派生形容词',
    whatItDoes: '"像……样"',
    whatItDoesBody: '在名词后加 -답다/-스럽다/-롭다 生成形容词。三者语感有别：-답다 强调"符合该身份/角色的本质"；-스럽다 强调"看起来像/让人感到"；-롭다 用于抽象名词表"充满……的"。选错后缀语义天差地别。',
    structureNote: '名词 + -답다 / -스럽다 / -롭다 → 形容词',
    rulesNote: '-답다：本质符合（学生답다, 남자답다）｜-스럽다：外观/感受像（사랑스럽다, 걱정스럽다）｜-롭다：抽象状态（자유롭다, 평화롭다）',
    structures: [
      {
        ko: '민수는 정말 학생답게 열심히 공부해요.',
        zh: '民秀真的很有学生的样子，非常用功。',
        tokens: [
          { text: '민수는', role: 'subject' },
          { text: '정말', role: 'plain' },
          { text: '학생답게', role: 'plain' },
          { text: '열심히', role: 'plain' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '그 아기가 정말 사랑스러워요.',
        zh: '那个宝宝真的很招人喜欢。',
        tokens: [
          { text: '그 아기가', role: 'subject' },
          { text: '정말', role: 'plain' },
          { text: '사랑스러워요', role: 'verb' },
        ],
      },
      {
        ko: '이 마을은 언제나 평화로워요.',
        zh: '这个村庄总是很平和。',
        tokens: [
          { text: '이 마을은', role: 'subject' },
          { text: '언제나', role: 'time' },
          { text: '평화로워요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + -답다 → 符合该身份/角色的本质', examples: '학생답다（有学生的样子）/ 남자답다（有男子气概）/ 어른답다（成熟）' },
      { type: 'rule', text: '名词 + -스럽다 → 外观让人感到、看起来像', examples: '사랑스럽다（讨人喜欢）/ 걱정스럽다（令人担忧）/ 자연스럽다（自然）' },
      { type: 'rule', text: '名词（多为抽象概念） + -롭다 → 充满……的状态', examples: '자유롭다（自由）/ 평화롭다（和平）/ 향기롭다（芬芳）' },
      { type: 'usage', text: '-답다 常与副词 "정말 / 진짜" 搭配夸奖', examples: '정말 학생다워요.（真有学生的样子）' },
      { type: 'usage', text: '-스럽다 与情感/评价名词搭配', examples: '자랑스럽다 / 부끄럽다 / 실망스럽다' },
      { type: 'usage', text: '-롭다 词干后常见 ㅂ 不规则', examples: '자유롭다 → 자유로워요（ㅂ→우）' },
      { type: 'compare', text: '-답다 vs -스럽다 → 前者"本质符合"，后者"外观让人感到"', examples: '학생답다（真是学生的做派）/ 학생스럽다（看起来像学生 · 罕用，不地道）' },
      { type: 'note', text: '哪个名词接哪个后缀是习惯搭配，不能随意换', examples: '误：자유답다 / 정：자유롭다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '민수는', role: 'subject' },
          { text: '학생답게', role: 'plain' },
          { text: '공부해요', role: 'verb' },
        ],
        zh: '民秀有学生的样子。',
        swapWords: ['학생답다', '남자답다', '어른답다', '선배답다'],
      },
      {
        wordBlocks: [
          { text: '그 아기가', role: 'subject' },
          { text: '사랑스러워요', role: 'verb' },
        ],
        zh: '那宝宝讨人喜欢。',
        swapWords: ['사랑스럽다', '자랑스럽다', '걱정스럽다', '자연스럽다'],
      },
      {
        wordBlocks: [
          { text: '이 마을은', role: 'subject' },
          { text: '평화로워요', role: 'verb' },
        ],
        zh: '村庄和平。',
        swapWords: ['평화롭다', '자유롭다', '향기롭다', '신비롭다'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '本质符合', ko: '민수는 학생답게 공부해요.', zh: '民秀有学生样。' },
      { icon: '👶', context: '看起来像', ko: '아기가 사랑스러워요.', zh: '宝宝讨喜。' },
      { icon: '🕊️', context: '充满……', ko: '이 마을은 평화로워요.', zh: '村庄和平。' },
      { icon: '💪', context: '男子气', ko: '그 사람은 정말 남자다워요.', zh: '那人真爷们儿。' },
      { icon: '😰', context: '令人担忧', ko: '요즘 상황이 걱정스러워요.', zh: '最近情况令人担忧。' },
      { icon: '🌸', context: '芬芳', ko: '봄이라 꽃 향기가 향기로워요.', zh: '春天花香四溢。' },
    ],
    mistakes: [
      { wrong: '자유답다', correct: '자유롭다', note: '"자유"是抽象名词，用 -롭다 而非 -답다' },
      { wrong: '학생스럽다', correct: '학생답다', note: '"符合学生身份"用 -답다；-스럽다 用于外观感受' },
      { wrong: '자유로워요（ㅂ规则）', correct: '자유로워요', note: '자유롭다 ㅂ 不规则 → 자유로워요（提示规则本身正确）' },
      { wrong: '평화답다', correct: '평화롭다', note: '抽象概念名词用 -롭다' },
    ],
    quickTable: {
      title: '三个后缀速查',
      headers: ['后缀', '含义', '常见搭配'],
      rows: [
        ['-답다', '符合本质/身份', '학생답다 / 남자답다 / 어른답다'],
        ['-스럽다', '外观让人感到', '사랑스럽다 / 걱정스럽다 / 자연스럽다'],
        ['-롭다', '充满……状态', '자유롭다 / 평화롭다 / 향기롭다'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '派生形容词 练习',
      body: '选择正确后缀',
      questions: [
        {
          prompt: '"民秀真有学生的样子" 最合适？',
          options: ['학생스러워요', '학생답게 행동해요', '학생롭게', '학생하다'],
          answer: 1,
          explanation: '"符合身份/本质"用 -답다 → 학생답다。副词形 학생답게。',
        },
        {
          prompt: '"宝宝讨人喜欢" 最合适？',
          options: ['사랑답다', '사랑스러워요', '사랑롭다', '사랑해요'],
          answer: 1,
          explanation: '"讨人喜欢/让人感到爱"用 -스럽다 → 사랑스럽다。',
        },
        {
          prompt: '"这个村庄很和平" 最合适？',
          options: ['평화답다', '평화스러워요', '평화로워요', '평화해요'],
          answer: 2,
          explanation: '抽象名词"평화"用 -롭다 → 평화롭다（ㅂ不规则）→ 평화로워요。',
        },
        {
          prompt: '选出全部正确的搭配组合？',
          options: [
            '학생답다 / 사랑스럽다 / 자유롭다',
            '학생스럽다 / 사랑롭다 / 자유답다',
            '학생롭다 / 사랑답다 / 자유스럽다',
            '학생답다 / 사랑롭다 / 자유스럽다',
          ],
          answer: 0,
          explanation: '身份/本质 → -답다；外观感受 → -스럽다；抽象状态 → -롭다。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"有学生样""讨人喜欢""和平" —— 三种感觉，三个后缀：<br><b>-답다</b>（符合本质）· <b>-스럽다</b>（外观让人感到）· <b>-롭다</b>（抽象状态）。<br>用错就变韩语生手。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>三者对比</b><br>
    ・-답다：학생답다（真是学生的样子）<br>
    ・-스럽다：사랑스럽다（让人感到可爱）<br>
    ・-롭다：자유롭다（充满自由）
  </div>
</div>`,
    compareLabel: '-답다 vs -스럽다 vs -롭다',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">派生形容词后缀</div>
  <div style="font-size:14px;color:#89756e">-답다 · -스럽다 · -롭다</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">三大后缀</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -답다 → 本质符合<br>
      -스럽다 → 外观让人感到<br>
      -롭다 → 充满……的（多为抽象名词）
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">자유답다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">자유롭다</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생스럽다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생답다</span></div></div>
  </div>
</div>`,
  },

  // ── 第2课：-길래 ──────────────────────────────────────
  {
    id: 'card-p31-l02',
    partNumber: 31,
    lessonNumber: 2,
    title: '-길래',
    whatItDoes: '因为看到/听说，所以……',
    whatItDoesBody: '「-길래」表示"因为观察到某情境（或听到某消息），所以做了某事"。主语常是"我"（第一人称）；前句是直接观察/所闻的情境，后句是"我"的反应。语气偏口语，与书面的 -기 때문에 不同层次。',
    structureNote: '动词/形容词词干 + -길래｜前句：观察/所闻｜后句：说话人的反应',
    rulesNote: '不看받침（词干直接加）｜主语常为第一人称｜前句多为直接看到/听到；书面用 -기에',
    structures: [
      {
        ko: '친구가 배고파 보이길래 뭐 좀 사 줬어요.',
        zh: '看朋友饿了，就买了点吃的给他。',
        tokens: [
          { text: '친구가', role: 'subject' },
          { text: '배고파 보이길래', role: 'verb' },
          { text: '뭐 좀', role: 'plain' },
          { text: '사 줬어요', role: 'verb' },
        ],
      },
      {
        ko: '비가 오길래 우산을 챙겼어요.',
        zh: '看下雨了，就带上了伞。',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '오길래', role: 'verb' },
          { text: '우산을', role: 'object' },
          { text: '챙겼어요', role: 'verb' },
        ],
      },
      {
        ko: '카페가 조용하길래 공부하러 갔어요.',
        zh: '听说咖啡厅安静，就去学习了。',
        tokens: [
          { text: '카페가', role: 'subject' },
          { text: '조용하길래', role: 'verb' },
          { text: '공부하러', role: 'verb' },
          { text: '갔어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + -길래（不看받침）', examples: '보이다 → 보이길래 / 오다 → 오길래 / 조용하다 → 조용하길래' },
      { type: 'rule', text: '过去时 + 길래：-았/었길래', examples: '왔길래 / 좋았길래' },
      { type: 'rule', text: '名词 + (이)길래', examples: '학생이길래 / 친구길래' },
      { type: 'usage', text: '主语常为"我 저/나"，前句是我看到/听到的情境', examples: '(我看到) 배고파 보이길래 → (我做) 사 줬어요' },
      { type: 'compare', text: '-길래 vs -기에 → 前者口语，后者书面/正式', examples: '(口语) 오길래 / (书面) 오기에' },
      { type: 'compare', text: '-길래 vs -아/어서 → 前者"我做出反应的动机"，后者"客观因果"', examples: '비가 와서 길이 미끄러워요.（客观） / 비가 오길래 우산을 챙겼어요.（我的反应）' },
      { type: 'note', text: '后句主语必须是说话人自己，不能是他人', examples: '误：비가 오길래 친구가 우산을 챙겼어요.（他人反应）→ 用 비가 와서' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '친구가', role: 'subject' },
          { text: '배고파 보이길래', role: 'verb' },
          { text: '사 줬어요', role: 'verb' },
        ],
        zh: '看朋友饿就买给他。',
        swapWords: ['배고프다', '피곤하다', '심심하다', '아프다'],
      },
      {
        wordBlocks: [
          { text: '비가', role: 'subject' },
          { text: '오길래', role: 'verb' },
          { text: '우산을 챙겼어요', role: 'verb' },
        ],
        zh: '下雨就拿伞。',
        swapWords: ['비가 오다', '눈이 오다', '바람이 불다', '햇빛이 나다'],
      },
      {
        wordBlocks: [
          { text: '카페가', role: 'subject' },
          { text: '조용하길래', role: 'verb' },
          { text: '공부하러 갔어요', role: 'verb' },
        ],
        zh: '咖啡厅安静就去学习。',
        swapWords: ['조용하다', '한산하다', '분위기 좋다', '넓다'],
      },
    ],
    scenarios: [
      { icon: '🍔', context: '看到饿', ko: '친구가 배고파 보이길래 뭐 좀 사 줬어요.', zh: '看朋友饿就买。' },
      { icon: '🌧️', context: '看到下雨', ko: '비가 오길래 우산을 챙겼어요.', zh: '下雨拿伞。' },
      { icon: '☕', context: '听说安静', ko: '카페가 조용하길래 공부하러 갔어요.', zh: '咖啡厅静就去学。' },
      { icon: '💰', context: '看到便宜', ko: '싸길래 두 개나 샀어요.', zh: '便宜就买了两个。' },
      { icon: '📞', context: '听说迟到', ko: '늦는다길래 먼저 시작했어요.', zh: '听说迟到就先开始了。' },
      { icon: '🚗', context: '看到车少', ko: '길이 한산하길래 빨리 왔어요.', zh: '路空就快点开来。' },
    ],
    mistakes: [
      { wrong: '비가 오길래 친구가 우산을 챙겼어요', correct: '비가 오길래 (제가) 우산을 챙겼어요', note: '-길래 后句主语必须是说话人自己，不能是他人' },
      { wrong: '비가 왔길래 우산을 챙겼어요（过去+길래）', correct: '비가 오길래 우산을 챙겼어요', note: '当"看到就做"是同时反应时，用现在时词干 + -길래' },
      { wrong: '학생길래 도와줬어요', correct: '학생이길래 도와줬어요', note: '名词后需加系词 이 → 이길래' },
      { wrong: '(书面报告) 비가 오길래 취소되었습니다', correct: '비가 오기에 취소되었습니다', note: '书面/正式场合用 -기에；-길래 只用于口语' },
    ],
    quickTable: {
      title: '-길래 vs -기에 vs -아/어서',
      headers: ['形式', '语体', '主语'],
      rows: [
        ['-길래', '口语', '后句：说话人自己'],
        ['-기에', '书面/正式', '后句可为任何人'],
        ['-아/어서', '通用', '客观因果，任何主语'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '-길래 用法练习',
      body: '选择正确形式',
      questions: [
        {
          prompt: '"看下雨了就带伞" 最合适？',
          options: ['비가 와서 우산을 챙겼어요', '비가 오길래 우산을 챙겼어요', '비가 오면 우산을 챙겼어요', '비가 오니까 우산을 챙겼어요'],
          answer: 1,
          explanation: '"看到情境后我做反应"用 -길래，主语是"我"。',
        },
        {
          prompt: '"카페가 (조용하다) 공부하러 갔어요."',
          options: ['조용하니까', '조용해서', '조용하길래', '조용하려고'],
          answer: 2,
          explanation: '"听说/看到情境后自己做出反应"用 -길래 → 조용하길래。',
        },
        {
          prompt: '"학생 (이다) 도와줬어요."',
          options: ['이길래', '길래', '이니까', '라서'],
          answer: 0,
          explanation: '名词接 -길래 时需加系词 이 → 이길래。',
        },
        {
          prompt: '-길래 与 -기에 的核心区别？',
          options: [
            '完全相同',
            '-길래 口语；-기에 书面/正式',
            '-길래 只接动词，-기에 只接形容词',
            '-길래 表将来，-기에 表过去',
          ],
          answer: 1,
          explanation: '语体差异：-길래 口语，-기에 书面。语义相同。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"看下雨了就带伞""看朋友饿了就买东西" —— 韩语这种"我看到情境后自己做反应"用 <b>-길래</b>。<br>后句主语必须是"我"，语气偏口语。书面用 -기에。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>-길래 vs -아/어서</b><br>
    ・-길래 → 我的反应<br>
    <span style="color:#89756e">비가 오길래 우산을 챙겼어요.（我拿伞）</span><br>
    ・-아/어서 → 客观因果<br>
    <span style="color:#89756e">비가 와서 길이 미끄러워요.（路滑）</span>
  </div>
</div>`,
    compareLabel: '我做反应 vs 客观因果',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">-길래：看到情境的反应</div>
  <div style="font-size:14px;color:#89756e">口语专用 · 后句主语=我</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规则</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      前句：观察/所闻的情境<br>
      后句：说话人的反应（主语=我）<br>
      名词 → -(이)길래<br>
      书面对应：-기에
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비가 오길래 친구가 우산을 챙겼어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">비가 오길래 (제가) 우산을 챙겼어요</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생길래</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생이길래</span></div></div>
  </div>
</div>`,
  },

  // ── 第3课：-든지 vs -거나 vs (이)나 辨析 ──────────────────────────────────────
  {
    id: 'card-p31-l03',
    partNumber: 31,
    lessonNumber: 3,
    title: '-든지 vs -거나 vs (이)나',
    whatItDoes: '"或者" 三种表达',
    whatItDoesBody: '韩语表达"或者"有三种主力：（이）나（名词之间）、-거나（动词之间）、-든지（名词/动词都行，含"任选一"义）。前两个偏"客观列举"，-든지 偏"任意选择/无所谓"的语气。选错会让"我随便"变成"我犹豫"。',
    structureNote: '名词 + (이)나 + 名词｜动词/形容词 词干 + -거나｜名词/动词 + -든지（任选/无所谓）',
    rulesNote: '(이)나 只接名词｜-거나 只接动词/形容词｜-든지 都可接，且带"任选"语气',
    structures: [
      {
        ko: '커피나 차 드시겠어요?',
        zh: '您要咖啡还是茶？',
        tokens: [
          { text: '커피나', role: 'object' },
          { text: '차', role: 'object' },
          { text: '드시겠어요?', role: 'verb' },
        ],
      },
      {
        ko: '주말에는 영화를 보거나 책을 읽어요.',
        zh: '周末看电影或者读书。',
        tokens: [
          { text: '주말에는', role: 'time' },
          { text: '영화를 보거나', role: 'verb' },
          { text: '책을 읽어요', role: 'verb' },
        ],
      },
      {
        ko: '뭘 먹든지 상관없어요.',
        zh: '吃什么都无所谓。',
        tokens: [
          { text: '뭘 먹든지', role: 'verb' },
          { text: '상관없어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + (이)나 + 名词：客观列举，让对方选一', examples: '커피나 차 / 밥이나 국수 / 학생이나 회사원' },
      { type: 'rule', text: '动词/形容词 + -거나：并列两个动作或状态', examples: '보거나 읽다 / 크거나 작다' },
      { type: 'rule', text: '动词/名词 + -든지：任选一，都行，带"无所谓"义', examples: '가든지 오든지 / 뭘 먹든지' },
      { type: 'usage', text: '(이)나 后可接名词或动词', examples: '커피나 차 마셔요（名词间）/ 크거나 작아요（形容词间）' },
      { type: 'usage', text: '-든지 常与"상관없다 / 관계없다 / 마음대로"搭配', examples: '뭘 하든지 상관없어요.' },
      { type: 'compare', text: '(이)나 vs -든지 → 前者是"给出选项让对方选"，后者是"随便挑，都行"', examples: '(选择) 커피나 차? / (无所谓) 커피든지 차든지' },
      { type: 'compare', text: '-거나 vs -든지（动词间）→ 前者中性并列，后者含任选/无所谓', examples: '(中性) 보거나 읽어요 / (任选) 보든지 읽든지 마음대로' },
      { type: 'note', text: '受助词规则约束：(이)나 前有받침→이나，无받침→나', examples: '학생이나（有받침）/ 커피나（无받침）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '커피나', role: 'object' },
          { text: '차', role: 'object' },
          { text: '드시겠어요?', role: 'verb' },
        ],
        zh: '要咖啡还是茶？',
        swapWords: ['커피나 차', '주스나 물', '빵이나 밥', '고기나 생선'],
      },
      {
        wordBlocks: [
          { text: '주말에', role: 'time' },
          { text: '영화를 보거나', role: 'verb' },
          { text: '책을 읽어요', role: 'verb' },
        ],
        zh: '周末看电影或读书。',
        swapWords: ['보다', '읽다', '자다', '쉬다'],
      },
      {
        wordBlocks: [
          { text: '뭘 먹든지', role: 'verb' },
          { text: '상관없어요', role: 'verb' },
        ],
        zh: '吃什么都无所谓。',
        swapWords: ['먹다', '마시다', '하다', '보다'],
      },
    ],
    scenarios: [
      { icon: '☕', context: '点单选择', ko: '커피나 차 드시겠어요?', zh: '要咖啡还是茶？' },
      { icon: '🎬', context: '周末活动', ko: '주말에는 영화를 보거나 책을 읽어요.', zh: '周末看电影或读书。' },
      { icon: '🤷', context: '任意选择', ko: '뭘 먹든지 상관없어요.', zh: '吃什么都行。' },
      { icon: '🍔', context: '选餐', ko: '햄버거나 피자 어때요?', zh: '汉堡或披萨怎么样？' },
      { icon: '🚗', context: '并列爱好', ko: '음악을 듣거나 게임을 해요.', zh: '听音乐或玩游戏。' },
      { icon: '💯', context: '无所谓', ko: '언제 오든지 환영이에요.', zh: '什么时候来都欢迎。' },
    ],
    mistakes: [
      { wrong: '커피거나 차 드시겠어요?', correct: '커피나 차 드시겠어요?', note: '名词间用 (이)나，不用 -거나（-거나 只接动词/形容词）' },
      { wrong: '영화나 책을 읽어요', correct: '영화를 보거나 책을 읽어요', note: '两个动词并列用 -거나' },
      { wrong: '학생나 회사원', correct: '학생이나 회사원', note: '有받침名词接 이나' },
      { wrong: '뭐 먹거나 상관없어요', correct: '뭐 먹든지 상관없어요', note: '"任选/无所谓"用 -든지，-거나 缺"随便"语气' },
    ],
    quickTable: {
      title: '"或者"三种表达对照',
      headers: ['形式', '语义', '接续对象'],
      rows: [
        ['(이)나', '客观列举选项', '名词间'],
        ['-거나', '中性并列', '动词/形容词间'],
        ['-든지', '任选/无所谓', '名词/动词都可'],
      ],
    },
    specialQuiz: {
      type: 'morph',
      title: '"或者" 三种练习',
      body: '选择合适的形式',
      questions: [
        {
          prompt: '"要咖啡还是茶？" 最合适？',
          options: ['커피거나 차', '커피나 차', '커피든지 차', '커피고 차'],
          answer: 1,
          explanation: '名词间用 (이)나 → 커피나 차（无받침 → 나）。',
        },
        {
          prompt: '"周末看电影或读书" 最合适？',
          options: ['영화나 책을 읽어요', '영화를 보거나 책을 읽어요', '영화든지 책이든지', '영화하고 책을'],
          answer: 1,
          explanation: '两个动作并列 → -거나 → 영화를 보거나 책을 읽어요。',
        },
        {
          prompt: '"吃什么都无所谓" 最合适？',
          options: ['뭐 먹으나', '뭐 먹거나', '뭐 먹든지 상관없어요', '뭐 먹고요'],
          answer: 2,
          explanation: '"任选/无所谓"用 -든지 + 상관없다。',
        },
        {
          prompt: '(이)나 · -거나 · -든지 的核心分工？',
          options: [
            '完全相同',
            '(이)나 接名词；-거나 接动词/形容词；-든지 接两者且含"任选"义',
            '(이)나 表将来；-거나 表现在；-든지 表过去',
            '三者只能用于疑问句',
          ],
          answer: 1,
          explanation: '(이)나 接名词间；-거나 接动词/形容词间中性并列；-든지 接两者且含"任选/无所谓"义。',
        },
      ],
    },
    linkedGrammarIds: [],
    step0Html: `<div class="hook-box"><div style="font-size:15px;color:#241917;line-height:1.8">"咖啡还是茶""看电影或读书""吃什么都行" —— 韩语的"或者"有三种：<br><b>(이)나</b>（名词间）· <b>-거나</b>（动词间）· <b>-든지</b>（任选/无所谓）。<br>用错会让"我随便"变"我犹豫"。</div></div>`,
    compareHtml: `<div class="cmp-block">
  <div style="font-size:15px;color:#241917;line-height:1.8">
    <b>三者对比</b><br>
    ・(이)나 → 名词间列举<br>
    <span style="color:#89756e">커피나 차 드시겠어요?</span><br>
    ・-거나 → 动词间中性并列<br>
    <span style="color:#89756e">영화를 보거나 책을 읽어요.</span><br>
    ・-든지 → 任选/无所谓<br>
    <span style="color:#89756e">뭘 먹든지 상관없어요.</span>
  </div>
</div>`,
    compareLabel: '(이)나 · -거나 · -든지',
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">三种"或者"</div>
  <div style="font-size:14px;color:#89756e">选对助词/词尾</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">三大分工</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      (이)나 → 名词间列举<br>
      -거나 → 动词/形容词并列<br>
      -든지 → 任选/无所谓（都行）<br>
      -든지 常搭 상관없다 / 마음대로
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
  <div class="ov-block">
    <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">커피거나 차</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">커피나 차</span></div></div>
    <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">뭐 먹거나 상관없어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">뭐 먹든지 상관없어요</span></div></div>
  </div>
</div>`,
  },

  // ── 第4课：P31 综合练习 ──────────────────────────────────────
  {
    id: 'card-p31-l04',
    partNumber: 31,
    lessonNumber: 4,
    title: 'P31 综合练习',
    isPractice: true,
    whatItDoes: 'TOPIK 高频遗漏项综合',
    whatItDoesBody: '本课综合 P31 三大遗漏点：-답다/-스럽다/-롭다 派生形容词、-길래 因看到而做、(이)나 vs -거나 vs -든지 三种"或者"。',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    specialQuiz: {
      type: 'morph',
      title: 'P31 综合练习',
      body: '综合本章 TOPIK 高频遗漏语法',
      questions: [
        {
          prompt: '"民秀真有学生的样子" 最合适？',
          options: ['학생스러워요', '학생답게 행동해요', '학생롭게', '학생이에요'],
          answer: 1,
          explanation: '"符合身份/本质"用 -답다 → 학생답다。',
        },
        {
          prompt: '"宝宝讨人喜欢" 最合适？',
          options: ['사랑답다', '사랑스러워요', '사랑롭다', '사랑해요'],
          answer: 1,
          explanation: '"让人感到爱"用 -스럽다 → 사랑스럽다。',
        },
        {
          prompt: '"这个村庄很和平" 最合适？',
          options: ['평화답다', '평화스러워요', '평화로워요', '평화해요'],
          answer: 2,
          explanation: '抽象名词用 -롭다 → 평화롭다（ㅂ不规则）→ 평화로워요。',
        },
        {
          prompt: '"看下雨就带伞" 最合适？',
          options: ['비가 와서 우산을 챙겼어요', '비가 오길래 우산을 챙겼어요', '비가 오면 우산을 챙겼어요', '비가 오니까 우산을 챙겼어요'],
          answer: 1,
          explanation: '"看到情境后我做反应"用 -길래。',
        },
        {
          prompt: '"학생 (이다) 도와줬어요."',
          options: ['이길래', '길래', '이니까', '라서'],
          answer: 0,
          explanation: '名词接 -길래 需系词 이 → 이길래。',
        },
        {
          prompt: '"要咖啡还是茶？" 最合适？',
          options: ['커피거나 차', '커피나 차', '커피든지 차', '커피고 차'],
          answer: 1,
          explanation: '名词间用 (이)나 → 커피나 차。',
        },
        {
          prompt: '"周末看电影或读书" 最合适？',
          options: ['영화나 책을 읽어요', '영화를 보거나 책을 읽어요', '영화든지 책이든지', '영화와 책을'],
          answer: 1,
          explanation: '两个动作并列 → -거나。',
        },
        {
          prompt: '"吃什么都无所谓" 最合适？',
          options: ['뭐 먹으나', '뭐 먹거나', '뭐 먹든지 상관없어요', '뭐 먹고요'],
          answer: 2,
          explanation: '"任选/无所谓"用 -든지 + 상관없다。',
        },
        {
          prompt: '-답다 vs -스럽다 vs -롭다 分工？',
          options: [
            '完全相同',
            '-답다 本质符合 · -스럽다 外观让人感到 · -롭다 抽象状态',
            '-답다 用于动词，其他用于名词',
            '-롭다 只用于书面',
          ],
          answer: 1,
          explanation: '身份/本质→-답다；外观感受→-스럽다；抽象状态→-롭다。',
        },
        {
          prompt: '-길래 与 -기에 的核心区别？',
          options: [
            '完全相同',
            '-길래 口语，-기에 书面/正式',
            '-길래 只接动词，-기에 只接形容词',
            '意义相反',
          ],
          answer: 1,
          explanation: '语体差异，语义相同：-길래 口语，-기에 书面。',
        },
      ],
    },
    linkedGrammarIds: ['card-p31-l01', 'card-p31-l02', 'card-p31-l03'],
    overviewHtml: `<div class="ov-hero">
  <div style="font-size:20px;font-weight:700;color:#241917;margin-bottom:8px">P31 · TOPIK 高频遗漏总结</div>
  <div style="font-size:14px;color:#89756e">派生形容词 · -길래 · "或者"三选</div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">派生形容词三选</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      -답다 → 本质符合<br>
      -스럽다 → 外观让人感到<br>
      -롭다 → 抽象状态
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">-길래 反应句</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      前句：观察/所闻的情境<br>
      后句：说话人的反应（主语=我）<br>
      口语专用；书面 → -기에
    </div>
  </div>
</div>
<div class="ov-section">
  <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">"或者"三种</div></div>
  <div class="ov-block">
    <div style="font-size:16px;color:#241917;line-height:1.9">
      (이)나 → 名词间列举<br>
      -거나 → 动词/形容词并列<br>
      -든지 → 任选/无所谓
    </div>
  </div>
</div>`,
  },
];
