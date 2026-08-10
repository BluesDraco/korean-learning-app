import type { GrammarCard } from '@/types';

export const grammarCardsP8: GrammarCard[] = [
  {
    id: 'card-p8-l01', partNumber: 8, lessonNumber: 1, title: '-던, -았/었/였던',
    whatItDoes: '回忆过去曾经的状态或习惯', whatItDoesEn: 'Recalling past states or habits',
    whatItDoesBody: '-던 修饰名词，表示"曾经……的（某人/某物）"，强调过去反复或持续的状态，但现在已不同。\n-았/었/였던 表示过去某个已完成动作的回忆。\n和中文"曾经……的""以前那个……"对应，但韩语用冠词形式直接修饰名词。', whatItDoesBodyEn: '-던 modifies nouns to mean "the (person/thing) that used to..." emphasizing a repeated or ongoing past state that is now different. \\n-았/었/였던 recalls a completed action in the past. \\nIt corresponds to Chinese "曾经……的" or "以前那个……", but Korean uses an adnominal form to directly modify the noun.',
    structureNote: '下面展示 -던 和 -았던 修饰名词的句型框架。\n注意：-던 强调持续/反复，-았던 强调一次性完成的回忆。', structureNoteEn: 'Below shows the sentence patterns for -던 and -았던 modifying nouns. \\nNote: -던 emphasizes continuity/repetition, while -았던 emphasizes a one-time completed memory.',
    rulesNote: '-던：动词/形容词词干 + 던（不看收音）+ 名词。\n-았/었/였던：过去时 + 던 + 名词，强调已完成。\n이다 → 이었던（有收音名词）/ 였던（无收音名词）。\n-던 前的动词用原形（现在时词干），不用过去时。', rulesNoteEn: '-던: verb/adjective stem + 던 (regardless of final consonant) + noun. \\n-았/었/였던: past tense + 던 + noun, emphasizing completion. \\n이다 → 이었던 (noun with final consonant) / 였던 (noun without final consonant). \\nThe verb before -던 uses its base form (present tense stem), not past tense.',
    scenarioNote: '回忆往事、聊旧照片、想念某人某地时最常用。\n中文"以前常去的那家咖啡店"在韩语里是"자주 가던 카페"，用 -던 修饰。', scenarioNoteEn: 'Most commonly used when reminiscing, looking at old photos, or missing someone or a place. \\nThe Chinese "以前常去的那家咖啡店" is "자주 가던 카페" in Korean, using -던 to modify.',
    step0Html: `<div class="card-title">-던 · -았/었던</div>
<div class="card-body">两种"回忆过去"的冠词形：-던 修饰曾经持续的习惯，-았던 修饰已经完成的过去经历。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-던（过去习惯/持续）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">자주 가던 카페가 없어졌어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">以前常去的咖啡店消失了。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-았던（已完成的回忆）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">어릴 때 살았던 동네가 그리워요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">很想念小时候住过的那片街区。</div>
    </div>
  </div>
</div>
<div class="reminder-box">-던 前面的动词用现在时词干（가던 ✓），不用过去时（갔던 ✗ = 那是 -았던 的用法）。</div>`,
    compareHtml: `<div class="card-title">-던（习惯/持续）vs -았던（完成/回忆）</div>
<div class="card-body">两者都表示"以前……的"，区别在于：-던 强调过去反复发生但现在已不做，-았던 强调某件事已经完成了。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-던 → 过去反复/持续，现在已不同</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词词干 + 던 + 名词</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">자주 가던 카페</span><span style="font-size:16px;color:#5a4640">以前常去的咖啡店（现在不去了）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">좋아하던 노래</span><span style="font-size:16px;color:#5a4640">以前喜欢的歌（现在不那么喜欢了）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-았/었던 → 已完成的过去，回忆性</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词词干 + 았/었 + 던 + 名词</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한 번 갔던 카페</span><span style="font-size:16px;color:#5a4640">曾经去过一次的咖啡店</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">살았던 동네</span><span style="font-size:16px;color:#5a4640">曾经住过的街区（已离开）</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">一个例子看清区别</div>
  <div style="font-size:16px;color:#5a4640">자주 가던 카페（常去的）→ 强调习惯，现在不去了</div>
  <div style="margin-top:4px;font-size:16px;color:#5a4640">한 번 갔던 카페（去过一次的）→ 强调那次经历本身</div>
</div>
<div class="reminder-box">如果现在还在持续的习惯，用 -는（现在冠词形）：자주 가는 카페（我现在常去的咖啡店）。-던 暗示"现在已不同了"。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的回忆冠词形', titleEn: 'Choose the correct adnominal form for recalling',
      body: '根据句意选择 -던 或 -았/었던。', bodyEn: 'Choose -던 or -았/었던 based on the meaning.',
      questions: [
        {
          pre: '자주',
          post: '카페가 문을 닫았어요.',
          options: ["가던", "갔던", "가는"],
          answer: 0,
          explanation: '-던 表示过去习惯/反复："以前常去的咖啡店关了。"가던（习惯性去）。', explanationEn: '-던 indicates a past habit/repetition: \'The coffee shop I used to go to closed.\' 가던 (habitual going).',
        },
        {
          pre: '어릴 때',
          post: '동네가 그리워요.',
          options: ['살은', '살았던', '사는'],
          answer: 1,
          explanation: '-았던 表示已完成、已离开的过去经历：살았던 동네（住过的、现已离开的街区）。살은 是错误形（살다 是 ㄹ 词干），사는 是现在形（与"想念"矛盾）。', explanationEn: '-았던 indicates a completed past experience that\'s now left behind: 살았던 동네 (the neighborhood I lived in, but have since left). 살은 is incorrect (살다 is an ㄹ stem), and 사는 is present tense (contradicting \'miss\').',
        },
        {
          pre: '내가',
          post: '사람이에요.',
          options: ['좋아했던', '좋아하는', '좋아한'],
          answer: 0,
          explanation: '좋아했던 = "曾经喜欢过的（那个人）"，已完成的情感用 -았던。좋아하는 是现在形（现在喜欢），좋아한 不是 좋아하다 的正确冠形（现在用 좋아하는）。', explanationEn: '좋아했던 = \'the one I used to like,\' a completed feeling uses -았던. 좋아하는 is present tense (currently like), and 좋아한 is not the correct adnominal form of 좋아하다 (use 좋아하는 for present).',
        },
        {
          pre: '아까',
          post: '얘기 계속해요.',
          options: ['했던', '하는', '하던'],
          answer: 2,
          explanation: '-던 表示中断的持续动作："继续刚才在说的话题吧。"하던 얘기（刚才在说的）。', explanationEn: '-던 indicates an interrupted ongoing action: \'Let\'s continue the topic we were just talking about.\' 하던 얘기 (what I was saying).',
        },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 8 章 第 1 课 · 已完成</div>
    <div class="ov-hero-title">-던 · -았/었던</div>
    <div class="ov-hero-sub">回忆过去 · 习惯/持续 · 已完成经历</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心对比</div></div>
    <div class="ov-block">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div style="background:#fff0f5;border-radius:10px;padding:10px"><div style="font-size:16px;font-weight:800;color:#ff7fa8">-던</div><div style="font-size:11px;color:#89756e;margin-top:2px">过去习惯/持续</div><div style="font-size:16px;color:#241917;margin-top:4px">가던 카페</div></div>
        <div style="background:#eaf8f5;border-radius:10px;padding:10px"><div style="font-size:16px;font-weight:800;color:#2db89b">-았던</div><div style="font-size:11px;color:#89756e;margin-top:2px">已完成的回忆</div><div style="font-size:16px;color:#241917;margin-top:4px">살았던 동네</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">자주 가던 카페가 없어졌어요</span></div><div class="struct-zh">以前常去的咖啡店消失了。</div></div>
        <div><div class="tok-row"><span class="tok t-v">어렸을 때 좋아하던 노래예요</span></div><div class="struct-zh">是小时候喜欢的歌。</div></div>
        <div><div class="tok-row"><span class="tok t-v">어릴 때 살았던 동네가 그리워요</span></div><div class="struct-zh">很想念小时候住过的街区。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">어제 먹던 음식</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">어제 먹은 음식</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">지금도 사는 동네인데 살았던 동네라고 해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">지금 사는 동네예요</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '자주 가던 카페가 없어졌어요', zh: '以前常去的那家咖啡店消失了。', zhEn: 'The coffee shop I used to go to often is gone.', tokens: [{ text: '자주', role: 'plain' }, { text: '가던', role: 'plain' }, { text: '카페가', role: 'subject' }, { text: '없어졌어요', role: 'verb' }] },
      { ko: '어렸을 때 좋아하던 노래예요', zh: '是小时候喜欢的歌。', zhEn: 'It\'s a song I loved when I was little.', tokens: [{ text: '어렸을 때', role: 'time' }, { text: '좋아하던', role: 'plain' }, { text: '노래예요', role: 'verb' }] },
      { ko: '같이 다니던 친구를 오랜만에 만났어요', zh: '和以前常一起玩的朋友久别重逢了。', zhEn: 'I ran into an old friend I used to hang out with all the time.', tokens: [{ text: '같이 다니던', role: 'plain' }, { text: '친구를', role: 'object' }, { text: '오랜만에', role: 'time' }, { text: '만났어요', role: 'verb' }] },
      { ko: '어릴 때 살았던 동네가 그리워요', zh: '很想念小时候住过的那片街区。', zhEn: 'I really miss the neighborhood I lived in as a kid.', tokens: [{ text: '어릴 때', role: 'time' }, { text: '살았던', role: 'plain' }, { text: '동네가', role: 'subject' }, { text: '그리워요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + 던 + 名词 → 以前曾……的（习惯/持续）', textEn: 'Verb stem + 던 + noun → used to (habit/ongoing)', examples: '먹던 음식 / 듣던 노래 / 살던 동네' },
      { type: 'rule', text: '动词词干 + 았/었던 + 名词 → 以前曾经……过的（已完成）', textEn: 'Verb stem + 았/었던 + noun → had (completed)', examples: '먹었던 음식 / 갔던 곳 / 만났던 사람' },
      { type: 'compare', text: '-던 vs -았던：习惯/持续 vs 完成', textEn: '-던 vs -았던: habit/ongoing vs completed', examples: '자주 가던 카페（常去的）/ 한 번 갔던 카페（去过一次的）', examplesEn: '자주 가던 카페 (the one I went to often) / 한 번 갔던 카페 (the one I went to once)' },
      { type: 'usage', text: '常见搭配：어렸을 때 / 예전에 / 학생 때 + -던', textEn: 'Common combos: 어렸을 때 / 예전에 / 학생 때 + -던', examples: '어렸을 때 좋아하던 음식 / 학생 때 다니던 학교' },
      { type: 'note', text: '-던 前的动词用现在词干，不用过去时', textEn: 'Use the present stem before -던, not past tense.', examples: '✗ 갔던（完成）→ ✓ 가던（习惯/持续）', examplesEn: '✗ 갔던 (completed) → ✓ 가던 (habit/ongoing)' },
      { type: 'note', text: '-던 还有一层"做到一半、中断未完成、东西还在"的意思，中文"曾经的"看不出这层，别漏', textEn: '-던 also implies \'in the middle of, unfinished, still there\' — don\'t miss this nuance.', examples: '마시던 커피（喝了一半还在的咖啡）/ 하던 얘기（刚才没说完的话）→ 这时不含"现在已不同"，而是"没做完"', examplesEn: '마시던 커피 (coffee I was drinking, still there) / 하던 얘기 (what I was saying) → here it\'s \'unfinished,\' not \'different now.\'' },
      { type: 'vocab', text: '常搭配名词', textEn: 'Often pairs with nouns.', examples: '카페 / 노래 / 친구 / 동네 / 음식 / 학교 / 장소（地方）', examplesEn: '카페 / 노래 / 친구 / 동네 / 음식 / 학교 / 장소 (place)' },
      { type: 'example', text: '자주 가던 카페 / 좋아하던 노래 / 어릴 때 살았던 집' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '자주', role: 'plain' }, { text: '가던', role: 'plain' }, { text: '카페가', role: 'subject' }, { text: '없어졌어요', role: 'verb' }], zh: '以前常去的咖啡店消失了。', zhEn: 'The coffee shop I used to go to is gone.', swapRole: 'subject', swapWords: ['카페가', '식당이', '서점이'] },
      { wordBlocks: [{ text: '어렸을 때', role: 'time' }, { text: '좋아하던', role: 'plain' }, { text: '노래예요', role: 'verb' }], zh: '是小时候喜欢的歌。', zhEn: 'It\'s a song I loved when I was little.', swapRole: 'verb', swapWords: ['노래예요', '음식이에요', '장소예요'] },
      { wordBlocks: [{ text: '어릴 때', role: 'time' }, { text: '살았던', role: 'plain' }, { text: '동네가', role: 'subject' }, { text: '그리워요', role: 'verb' }], zh: '很想念小时候住过的街区。', zhEn: 'I really miss the neighborhood I lived in as a kid.', swapRole: 'subject', swapWords: ['동네가', '학교가', '집이'] },
      { wordBlocks: [{ text: '같이', role: 'plain' }, { text: '다니던', role: 'plain' }, { text: '친구를', role: 'object' }, { text: '만났어요', role: 'verb' }], zh: '见到了以前常一起玩的朋友。', zhEn: 'I met a friend I used to play with.', swapRole: 'object', swapWords: ['친구를', '동생을', '선배를'] },
    ],
    scenarios: [
      { icon: '☕', context: '老店不在了', contextEn: 'The old place is gone.', ko: '자주 가던 카페가 없어졌어요. 너무 아쉬워요.', zh: '以前常去的咖啡店消失了，真的很可惜。', zhEn: 'The coffee shop I used to go to is gone — such a shame.' },
      { icon: '🎵', context: '听到旧歌回忆', contextEn: 'Hearing an old song brings back memories.', ko: '이 노래 들어봤어요? 어렸을 때 진짜 좋아하던 노래예요.', zh: '你听过这首歌吗？是我小时候真的很喜欢的歌。', zhEn: 'Have you heard this song? I really loved it as a kid.' },
      { icon: '🏠', context: '想念家乡', contextEn: 'miss home', ko: '어릴 때 살았던 동네가 많이 그리워요.', zh: '很想念小时候住过的街区。', zhEn: 'I really miss the neighborhood I lived in as a kid.' },
      { icon: '👫', context: '久别重逢', contextEn: 'Reunion after a long time', ko: '같이 다니던 친구를 오랜만에 SNS에서 봤어요.', zh: '在社交媒体上看到了以前常一起玩的朋友。', zhEn: 'I saw a friend I used to hang out with on social media.' },
      { icon: '🍜', context: '想吃以前吃过的', contextEn: 'Craving what I used to eat.', ko: '예전에 자주 먹던 라면이 먹고 싶어요.', zh: '想吃以前常吃的那种拉面。', zhEn: 'I want to eat the ramen I used to have all the time.' },
      { icon: '📸', context: '看旧照片', contextEn: 'Looking at old photos', ko: '이 사진 봐요! 우리가 자주 놀던 곳이에요.', zh: '看这张照片！是我们以前常玩的地方。', zhEn: 'Look at this photo! It\'s the place we used to hang out.' },
    ],
    mistakes: [
      { wrong: '가던 카페에 가요（가던 表示过去习惯，但现在还去）', wrongEn: '가던 카페에 가요 (가던 indicates a past habit, but still going now)', correct: '자주 가는 카페에 가요（还在继续的习惯用 -는）', correctEn: '자주 가는 카페에 가요 (ongoing habits use -는)', note: '-던 暗示现在已不再持续，如果现在还在做，用 -는。', noteEn: '-던 implies it\'s no longer ongoing; if it\'s still happening, use -는.' },
      { wrong: '어제 먹던 음식', correct: '어제 먹은 음식 / 어제 먹었던 음식', note: '-던 强调习惯性/持续，昨天吃的一次性事件用 -은 或 -았던。', noteEn: '-던 emphasizes habitual/continuous actions; for a one-time event like eating yesterday, use -은 or -았던.' },
      { wrong: '지난주에 보던 영화', correct: '지난주에 본 영화 / 봤던 영화', note: '-던 强调过去反复/持续的行为，一次性完结的事件用 -은/ㄴ 或 -았/었던，不用 -던。', noteEn: '-던 emphasizes repeated/ongoing past actions; for one-off completed events, use -은/ㄴ or -았/었던, not -던.' },
      { wrong: '살았던 동네에서 살아요', correct: '지금 사는 동네에서 살아요', note: '-았던 暗示已经离开那里，如果现在还住，用 사는（现在时冠词形）。', noteEn: '-았던 implies you\'ve left that place; if you still live there, use 사는 (present tense modifier).' },
    ],
    linkedGrammarIds: ['g50'],
  },
  {
    id: 'card-p8-l02', partNumber: 8, lessonNumber: 2, title: '-아/어/여야(만), -아/어/여야겠다',
    whatItDoes: '表示"必须做"和"我得做了"的决心', whatItDoesEn: 'Expressing "must do" and the resolve of "I need to do it now"',
    whatItDoesBody: '-아/어/여야 하다/되다 表示客观必要性"必须……"（第4章已学）。\n本课重点：-아야만 强调"只有这样才行"，比 -아야 语气更强。\n-아/어/여야겠다 表示说话人自己下的决心："我得……了/我应该……"。\n和中文"只有……才行""我得……了"对应，야겠다 是说话人对自己说的，야 하다 是客观规则。', whatItDoesBodyEn: '-아/어/여야 하다/되다 expresses objective necessity "must..." (learned in Chapter 4). \\nThis lesson\'s focus: -아야만 emphasizes "only this way will work," stronger than -아야. \\n-아/어/여야겠다 expresses the speaker\'s own resolve: "I need to... / I should...". \\nIt corresponds to Chinese "只有……才行" and "我得……了"; 야겠다 is said to oneself, while 야 하다 is an objective rule.',
    structureNote: '下面展示 -아야만 和 -아야겠다 的基本句型。\n注意：야겠다 带有说话人主观决心，야만 强调条件的唯一性。', structureNoteEn: 'Below shows the basic sentence patterns for -아야만 and -아야겠다. \\nNote: 야겠다 carries the speaker\'s subjective resolve, while 야만 emphasizes the uniqueness of the condition.',
    rulesNote: '-아/어/여야만：末元音 ㅏ/ㅗ → 아야만，其他 → 어야만，하다 → 해야만。\n-아/어/여야겠다：末元音 ㅏ/ㅗ → 아야겠다，其他 → 어야겠다，하다 → 해야겠다。\n两者变形规则和 -아/어요 相同，只是词尾不同。', rulesNoteEn: '-아/어/여야만: final vowel ㅏ/ㅗ → 아야만, others → 어야만, 하다 → 해야만. \\n-아/어/여야겠다: final vowel ㅏ/ㅗ → 아야겠다, others → 어야겠다, 하다 → 해야겠다. \\nBoth follow the same conjugation rules as -아/어요, just with different endings.',
    scenarioNote: '定下新目标、看到现实后下决心改变时最常用 -아야겠다。\n看完健康节目说"我得运动了"，看完新闻说"我得学韩语了"，这种口语决心全用 -아야겠다。', scenarioNoteEn: '-아야겠다 is most used when setting new goals or resolving to change after seeing reality. \\nSaying "I need to exercise" after a health show, or "I need to study Korean" after the news—these spoken resolves all use -아야겠다.',
    step0Html: `<div class="card-title">-아야만 · -아야겠다</div>
<div class="card-body">-아야만 强调"只有这样才行"（唯一条件），-아야겠다 表达说话人的内心决心"我得……了"。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">两种必要性表达</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-아야만（唯一条件）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">열심히 해야만 성공해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">只有努力才能成功。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-아야겠다（主观决心）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">이제 운동을 시작해야겠어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我得开始运动了。</div>
    </div>
  </div>
</div>
<div class="reminder-box">-아야겠다 是说话人对自己下的决心，-아야 하다 是客观规则或外部要求——语气方向不同。</div>`,
    compareHtml: `<div class="card-title">-아야만 vs -아야겠다 vs -아야 하다</div>
<div class="card-body">三种"必须"的表达，强调点各不同：唯一条件 / 内心决心 / 客观规则。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아야만 → 只有……才行（唯一条件）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">强调这是达到目标的唯一途径</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">노력해야만 꿈을 이룰 수 있어요.</span><span style="font-size:16px;color:#5a4640">只有努力才能实现梦想。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아야겠다 → 我得……了（内心决心）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">说话人自己下的决心，带有"从现在起"的语感</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">이제 다이어트를 해야겠어요.</span><span style="font-size:16px;color:#5a4640">我得减肥了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">일찍 자야겠다고 생각했어요.</span><span style="font-size:16px;color:#5a4640">我想着得早睡了。</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-아야 하다 → 必须……（客观规则）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">外部规定或客观需要，不一定是自己想做</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">9시까지 와야 해요.</span><span style="font-size:16px;color:#5a4640">必须9点前来。（规定）</span></div>
  </div>
</div>
<div class="reminder-box">공부야겠어요 ✗ → 공부해야겠어요 ✓（공부 是名词，要先 +하다 再变形）。먹아야겠다 ✗ → 먹어야겠다 ✓（먹 末元音不是 ㅏ/ㅗ）。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的"必须/得"表达', titleEn: 'Choose the correct "must/have to" expression',
      body: '根据句意选择 -아/어야(만) 或 -아/어야겠다。', bodyEn: 'Choose -아/어야(만) or -아/어야겠다 based on the meaning.',
      questions: [
        {
          pre: '한국어를 잘하려면 매일',
          post: '.',
          options: ["공부해야겠어요", "공부해야 해요", "공부할 거예요"],
          answer: 1,
          explanation: '-아/어야 하다 = "必须"客观义务：想学好韩语必须每天学习。', explanationEn: '-아/어야 하다 = "must" objective obligation: To learn Korean well, you must study every day.',
        },
        {
          pre: '내일은 일찍',
          post: '.',
          options: ["일어나야 해요", "일어날 거예요", "일어나야겠어요"],
          answer: 2,
          explanation: '-아/어야겠다 = "我得……"主观决心："明天我得早起。"', explanationEn: '-아/어야겠다 = "I have to..." subjective resolve: "I have to get up early tomorrow."',
        },
        {
          pre: '한국에서는 밥을 먹을 때 젓가락',
          post: '.',
          options: ["만 써야 해요", "을 쓸 거예요", "을 써야겠어요"],
          answer: 0,
          explanation: '-아/어야 하다 客观规则："在韩国吃饭时必须用筷子。"', explanationEn: '-아/어야 하다 objective rule: "When eating in Korea, you must use chopsticks."',
        },
        {
          pre: '약속 시간이 다 됐어요. 이제',
          post: '.',
          options: ["가야겠어요", "가야 해요", "갈 거예요"],
          answer: 0,
          explanation: '-아/어야겠다 决意："约会时间快到了，我得走了。"', explanationEn: '-아/어야겠다 resolve: "The date is almost here, I have to go."',
        },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 8 章 第 2 课 · 已完成</div>
    <div class="ov-hero-title">-아야만 · -아야겠다</div>
    <div class="ov-hero-sub">唯一条件 · 内心决心 · 客观规则对比</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">变形规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">ㅏ/ㅗ</span>：가야만 / 가야겠다</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">其他</span>：먹어야만 / 먹어야겠다</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#6b7ff0">하다</span>：해야만 / 해야겠다</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">노력해야만 꿈을 이룰 수 있어요</span></div><div class="struct-zh">只有努力才能实现梦想。</div></div>
        <div><div class="tok-row"><span class="tok t-v">이제 운동을 시작해야겠어요</span></div><div class="struct-zh">我得开始运动了。</div></div>
        <div><div class="tok-row"><span class="tok t-v">한국어를 제대로 배워야겠다고 생각했어요</span></div><div class="struct-zh">我下定决心要好好学韩语。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">공부야겠어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">공부해야겠어요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹아야겠다</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹어야겠다</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '열심히 공부해야만 합격할 수 있어요', zh: '只有努力学习才能合格。', zhEn: 'Only by studying hard can you pass.', tokens: [{ text: '열심히', role: 'plain' }, { text: '공부해야만', role: 'plain' }, { text: '합격할 수 있어요', role: 'verb' }] },
      { ko: '이제 운동을 시작해야겠어요', zh: '我得开始运动了。', zhEn: 'I have to start exercising.', tokens: [{ text: '이제', role: 'time' }, { text: '운동을', role: 'object' }, { text: '시작해야겠어요', role: 'verb' }] },
      { ko: '일찍 자야겠다고 생각했어요', zh: '我想我得早睡了。', zhEn: 'I think I need to sleep early.', tokens: [{ text: '일찍', role: 'plain' }, { text: '자야겠다고', role: 'plain' }, { text: '생각했어요', role: 'verb' }] },
      { ko: '노력해야만 꿈을 이룰 수 있어요', zh: '只有努力才能实现梦想。', zhEn: 'Only through effort can you achieve your dreams.', tokens: [{ text: '노력해야만', role: 'plain' }, { text: '꿈을', role: 'object' }, { text: '이룰 수 있어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: 'ㅏ/ㅗ 结尾 → 아야만 / 아야겠다', textEn: 'Ending in ㅏ/ㅗ → 아야만 / 아야겠다', examples: '가다→가야만 / 오다→와야만 / 가야겠다 / 와야겠다' },
      { type: 'rule', text: '其他元音 → 어야만 / 어야겠다', textEn: 'Other vowels → 어야만 / 어야겠다', examples: '먹다→먹어야만 / 배우다→배워야만 / 먹어야겠다' },
      { type: 'rule', text: '하다 → 해야만 / 해야겠다', examples: '공부하다→공부해야만 / 공부해야겠다 / 운동해야겠다' },
      { type: 'compare', text: '-아야만 vs -아야겠다', examples: '-아야만：条件唯一性"只有……才行" / -아야겠다：说话人主观决心"我得……了"', examplesEn: '-아야만: unique condition "only if..." / -아야겠다: speaker\'s subjective resolve "I have to..."' },
      { type: 'usage', text: '-아야겠다 常见起始词', textEn: 'Common starters with -아야겠다', examples: '이제（现在该）/ 이번에는（这次要）/ 정말로（真的得）', examplesEn: '이제 (now it\'s time) / 이번에는 (this time) / 정말로 (really have to)' },
      { type: 'note', text: '-아야겠다 和 -아야 하다 区别', textEn: 'Difference between -아야겠다 and -아야 하다', examples: '-아야겠다：说话人自己决心 / -아야 하다：客观规则或他人要求', examplesEn: '-아야겠다: speaker\'s own resolve / -아야 하다: objective rule or others\' demands' },
      { type: 'example', text: '열심히 해야만 돼요 / 이제 다이어트를 해야겠어요 / 한국어를 배워야겠다고 생각했어요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '이제', role: 'time' }, { text: '운동을', role: 'object' }, { text: '시작해야겠어요', role: 'verb' }], zh: '我得开始运动了。', zhEn: 'I have to start exercising.', swapRole: 'object', swapWords: ['운동을', '한국어를', '다이어트를'] },
      { wordBlocks: [{ text: '열심히', role: 'plain' }, { text: '공부해야만', role: 'plain' }, { text: '합격해요', role: 'verb' }], zh: '只有努力学习才能合格。', zhEn: 'Only by studying hard can you pass.', swapRole: 'plain', swapWords: ['공부해야만', '노력해야만', '연습해야만'] },
      { wordBlocks: [{ text: '일찍', role: 'plain' }, { text: '자야겠어요', role: 'verb' }], zh: '我得早睡了。', zhEn: 'I have to sleep early.', swapRole: 'plain', swapWords: ['일찍', '오늘부터', '정말로'] },
      { wordBlocks: [{ text: '노력해야만', role: 'plain' }, { text: '꿈을', role: 'object' }, { text: '이룰 수 있어요', role: 'verb' }], zh: '只有努力才能实现梦想。', zhEn: 'Only through effort can you achieve your dreams.', swapRole: 'object', swapWords: ['꿈을', '목표를', '성공을'] },
    ],
    scenarios: [
      { icon: '💪', context: '新年决心', contextEn: 'New Year\'s Resolution', ko: '올해는 정말 운동을 해야겠어요. 작년엔 못 했거든요.', zh: '今年真的得运动了，去年没做到。', zhEn: 'I really need to exercise this year. I didn\'t do it last year.' },
      { icon: '📚', context: '下定决心学习', contextEn: 'Determined to Study', ko: '한국어를 제대로 배워야겠다고 생각했어요.', zh: '我下定决心要好好学韩语。', zhEn: 'I\'ve made up my mind to study Korean well.' },
      { icon: '😴', context: '健康作息', contextEn: 'Healthy Routine', ko: '내일 일찍 일어나야 하니까 오늘은 일찍 자야겠어요.', zh: '明天要早起，所以今天得早睡了。', zhEn: 'I need to wake up early tomorrow, so I have to sleep early tonight.' },
      { icon: '🏆', context: '强调唯一条件', contextEn: 'Emphasizing the Only Condition', ko: '열심히 연습해야만 무대에 설 수 있어요.', zh: '只有努力练习才能站上舞台。', zhEn: 'Only by practicing hard can you get on stage.' },
      { icon: '🥗', context: '看完节目的感想', contextEn: 'Thoughts After Watching the Show', ko: '건강 프로그램을 봤는데 식습관을 바꿔야겠다고 느꼈어요.', zh: '看了健康节目，感觉得改变饮食习惯了。', zhEn: 'After watching the health program, I feel I need to change my eating habits.' },
      { icon: '🇰🇷', context: '旅行准备', contextEn: 'Travel Preparation', ko: '한국에 가려면 비자를 신청해야만 해요.', zh: '要去韩国，必须申请签证才行。', zhEn: 'To go to Korea, you must apply for a visa.' },
    ],
    mistakes: [
      { wrong: '공부야겠어요', correct: '공부해야겠어요', note: '공부 是名词，要先加 하다 再变形为 해야겠다。', noteEn: '공부 is a noun, so you need to add 하다 first and then change it to 해야겠다.' },
      { wrong: '먹아야겠다', correct: '먹어야겠다', note: '먹다 词干元音是 ㅓ，不是 ㅏ/ㅗ，所以用 어야겠다，不是 아야겠다。', noteEn: 'The stem vowel of 먹다 is ㅓ, not ㅏ/ㅗ, so you use 어야겠다, not 아야겠다.' },
      { wrong: '해야겠다 하다', correct: '해야겠어요', note: '-야겠다 本身就是句尾词尾，后面不再加 하다，直接加敬语词尾 어요。', noteEn: '-야겠다 is already a sentence-ending ending, so you don\'t add 하다 after it; just add the polite ending 어요.' },
      { wrong: '자야만 해요（强调睡觉是唯一条件）', wrongEn: '자야만 해요 (emphasizing that sleeping is the only condition)', correct: '자야 해요（单纯必须睡）', correctEn: '자야 해요 (simply must sleep)', note: '-야만 强调"只有这个条件才行"，如果只是说"必须"，用 -아야 하다 就够了。', noteEn: '-야만 emphasizes \'only this condition works.\' If you just mean \'must,\' -아야 하다 is enough.' },
      { wrong: '동생이 일찍 자야겠어요', correct: '동생이 일찍 자야 해요', note: '-아야겠다 是说话人对自己下的决心，主语只能是"我"。说别人（弟弟）必须做，用客观的 -아야 하다。中文"弟弟得早睡了"能随便说，韩语不行。', noteEn: '-아야겠다 is a resolution the speaker makes for themselves, so the subject can only be \'I.\' To say someone else (like a younger brother) must do something, use the objective -아야 하다. In Chinese, you can casually say \'My brother has to sleep early,\' but not in Korean.' },
    ],
    linkedGrammarIds: ['g70'],
  },
  {
    id: 'card-p8-l03', partNumber: 8, lessonNumber: 3, title: '-을/ㄹ 뻔하다, -아/어/여서 죽을 것 같다',
    whatItDoes: '表示"差点"和夸张程度', whatItDoesEn: 'Expressing "almost" and exaggerated degree',
    whatItDoesBody: '-을/ㄹ 뻔하다 表示"差点就……（幸好没发生）"，描述险些发生的事。\n-아/어/여서 죽을 것 같다 是夸张说法"……得要死/累死了"，表示极度的程度。\n和中文"差点""累死了""饿死了"对应，是口语中表达情绪和夸张程度的常用表达。', whatItDoesBodyEn: '-을/ㄹ 뻔하다 means "almost... (luckily didn\'t happen)", describing something that nearly occurred. \\n-아/어/여서 죽을 것 같다 is an exaggeration "...to death / so tired I could die", indicating extreme degree. \\nIt corresponds to Chinese "差点", "累死了", "饿死了", and is a common spoken expression for emotions and exaggeration.',
    structureNote: '下面展示两种夸张/险情表达的句型。\n-을 뻔하다 通常用过去时，-아서 죽을 것 같다 用现在时表达当前状态。', structureNoteEn: 'Below shows the sentence patterns for both exaggerated/near-miss expressions. \\n-을 뻔하다 is usually in past tense, while -아서 죽을 것 같다 uses present tense to express a current state.',
    rulesNote: '-을/ㄹ 뻔하다：词干有收音 + 을 뻔했어요，无收音 + ㄹ 뻔했어요。\n实际已没发生（侥幸），所以多用过去时 뻔했어요。\n-아/어/여서 죽을 것 같다：变形规则和 -아/어/여서 相同 + 죽을 것 같아요。', rulesNoteEn: '-을/ㄹ 뻔하다: stem with final consonant + 을 뻔했어요, without + ㄹ 뻔했어요. \\nSince it didn\'t actually happen (fortunately), past tense 뻔했어요 is common. \\n-아/어/여서 죽을 것 같다: same conjugation as -아/어/여서 + 죽을 것 같아요.',
    scenarioNote: '追星聊天时夸张说"太帅了要死""差点晕过去"全靠这两个表达。\n中文"累死了""差点摔倒"在韩语里直接对应这两个句型。', scenarioNoteEn: 'When fangirling, exaggerating "so handsome I could die" or "almost fainted" relies on these two expressions. \\nChinese "累死了" and "差点摔倒" directly correspond to these two patterns in Korean.',
    step0Html: `<div class="card-title">-을 뻔했어요 · -아서 죽을 것 같아요</div>
<div class="card-body">-을 뻔했어요 说"差点发生了（幸好没有）"，-아서 죽을 것 같아요 是夸张表达"……死了"。两个都是情绪化口语必备。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-을 뻔했어요（差点发生）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">넘어질 뻔했어요!</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">差点摔倒了！（实际没摔）</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-아서 죽을 것 같아요（夸张程度）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">너무 배고파서 죽을 것 같아요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">饿得要死。</div>
    </div>
  </div>
</div>
<div class="reminder-box">-을 뻔했다 表示幸好没发生，用未来时冠词形（넘어질 뻔했어요），不加过去时（넘어졌을 뻔했어요 ✗）。</div>`,
    compareHtml: `<div class="card-title">-을 뻔했어요 vs -아서 죽을 것 같아요</div>
<div class="card-body">两者都表达极端情绪，但一个说"差点发生（没发生）"，一个是夸张程度"……得要死"。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 뻔했어요 → 险些发生（实际没发生）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">有收音→을 뻔했어요 / 无收音→ㄹ 뻔했어요</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">넘어질 뻔했어요.</span><span style="font-size:16px;color:#5a4640">差点摔倒了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">지각할 뻔했는데 다행이에요.</span><span style="font-size:16px;color:#5a4640">差点迟到，真幸运。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">잊을 뻔했어요.</span><span style="font-size:16px;color:#5a4640">差点忘了。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어서 죽을 것 같아요 → 夸张极度程度</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">形容词+아/어서+죽을 것 같아요</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">너무 배고파서 죽을 것 같아요.</span><span style="font-size:16px;color:#5a4640">饿得要死。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">너무 웃겨서 죽을 것 같았어요.</span><span style="font-size:16px;color:#5a4640">笑死了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">너무 더워서 죽을 것 같아요.</span><span style="font-size:16px;color:#5a4640">热死了。</span></div>
  </div>
</div>
<div class="reminder-box">배고프서 ✗ → 배고파서 ✓（배고프다 词干 ㅡ 脱落后 → 배고파서）。재미있어서 죽을 것이에요 ✗ → 죽을 것 같아요 ✓（夸张用 것 같다，不是 것이다）。</div>`,    specialQuiz: {
      type: 'judge',
      title: '判断对错：-을 뻔하다 和 -아/어서 죽을 것 같다', titleEn: 'True or false: -을 뻔하다 and -아/어서 죽을 것 같다',
      body: '选出使用正确的句子。', bodyEn: 'Choose the sentence that uses it correctly.',
      questions: [
        { options: ["길에서 넘어질 뻔했어요","길에서 넘어졌 뻔했어요"], answer: 0, explanation: '-을 뻔하다 接动词词干："差点在路上摔倒。"넘어지다→넘어질 뻔했어요。不能接过去时。', explanationEn: '-을 뻔하다 attaches to the verb stem: \'I almost fell on the road.\' 넘어지다→넘어질 뻔했어요. It can\'t attach to past tense.' },
        { options: ["놓칠 뻔했어요","놓쳤을 뻔했어요"], answer: 0, explanation: '놓치다→놓칠 뻔했어요（差点错过）。-을 뻔하다 接词干不接过去时。', explanationEn: '놓치다→놓칠 뻔했어요 (almost missed). -을 뻔하다 attaches to the stem, not past tense.' },
        { options: ["배고파서 죽을 것 같아요","배고파서 죽었어요"], answer: 0, explanation: '-아/어서 죽을 것 같다 = "……得快要死了"：饿死了（夸张）。不能真用 죽었어요。', explanationEn: '-아/어서 죽을 것 같다 = \'so ... that I could die\': e.g., starving to death (exaggeration). You can\'t actually use 죽었어요.' },
        { options: ["더워서 죽을 뻔했어요","더워서 죽을 뻔어요"], answer: 0, explanation: '-을 뻔하다 的过去时是 -을 뻔했어요，不能写成 뻔어요。选项 2 的过去时变形不完整。', explanationEn: 'The past tense of -을 뻔하다 is -을 뻔했어요, not 뻔어요. Option 2\'s past tense conjugation is incomplete.' },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 8 章 第 3 课 · 已完成</div>
    <div class="ov-hero-title">-을 뻔했어요 · -아서 죽을 것 같아요</div>
    <div class="ov-hero-sub">差点发生 · 夸张程度 · 口语情绪表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">结构速查</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">有收音+을 뻔했어요</span>：먹을 뻔했어요 / 잊을 뻔했어요</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">无收音+ㄹ 뻔했어요</span>：넘어질 뻔했어요 / 갈 뻔했어요</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">-아/어서 죽을 것 같아요</span>：배고파서 / 피곤해서 / 더워서</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">넘어질 뻔했어요</span></div><div class="struct-zh">差点摔倒了。</div></div>
        <div><div class="tok-row"><span class="tok t-v">너무 배고파서 죽을 것 같아요</span></div><div class="struct-zh">饿得要死。</div></div>
        <div><div class="tok-row"><span class="tok t-v">너무 웃겨서 죽을 것 같았어요</span></div><div class="struct-zh">笑死了。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">넘어졌을 뻔했어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">넘어질 뻔했어요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">배고프서 죽을 것 같아요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">배고파서 죽을 것 같아요</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '넘어질 뻔했어요', zh: '差点摔倒了。', zhEn: 'I almost fell.', tokens: [{ text: '넘어질', role: 'plain' }, { text: '뻔했어요', role: 'verb' }] },
      { ko: '늦을 뻔했는데 다행히 왔어요', zh: '差点迟到，幸好来了。', zhEn: 'I was almost late, but luckily I made it.', tokens: [{ text: '늦을 뻔했는데', role: 'plain' }, { text: '다행히', role: 'plain' }, { text: '왔어요', role: 'verb' }] },
      { ko: '너무 배가 고파서 죽을 것 같아요', zh: '饿得要死。', zhEn: 'I\'m starving to death.', tokens: [{ text: '너무', role: 'plain' }, { text: '배가', role: 'subject' }, { text: '고파서', role: 'plain' }, { text: '죽을 것 같아요', role: 'verb' }] },
      { ko: '너무 웃겨서 죽을 것 같았어요', zh: '笑死了。', zhEn: 'I\'m dying of laughter.', tokens: [{ text: '너무', role: 'plain' }, { text: '웃겨서', role: 'plain' }, { text: '죽을 것 같았어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 无收音 + ㄹ 뻔했어요', textEn: 'Verb stem (no final consonant) + ㄹ 뻔했어요', examples: '가다→갈 뻔했어요 / 넘어지다→넘어질 뻔했어요' },
      { type: 'rule', text: '动词词干 有收音 + 을 뻔했어요', textEn: 'Verb stem (with final consonant) + 을 뻔했어요', examples: '먹다→먹을 뻔했어요 / 잊다→잊을 뻔했어요 / 죽다→죽을 뻔했어요 / 늦다→늦을 뻔했어요' },
      { type: 'rule', text: '-아/어서 죽을 것 같다：形容词 + 아/어서 + 죽을 것 같아요', textEn: '-아/어서 죽을 것 같다: Adjective + 아/어서 + 죽을 것 같아요', examples: '배고파서 죽을 것 같아요 / 피곤해서 죽을 것 같아요 / 더워서 죽을 것 같아요' },
      { type: 'usage', text: '-을 뻔했다 = 幸好没发生，事实结果是没有发生', textEn: '-을 뻔했다 = Fortunately it didn\'t happen; the actual result is that it didn\'t occur.', examples: '✓ 넘어질 뻔했어요（没真的摔） vs ✗ 넘어졌을 뻔했어요（已经摔了就不用뻔）', examplesEn: '✓ 넘어질 뻔했어요 (didn\'t actually fall) vs ✗ 넘어졌을 뻔했어요 (if you already fell, don\'t use 뻔)' },
      { type: 'usage', text: '-아서 죽을 것 같다 = 夸张表达极度程度', textEn: '-아서 죽을 것 같다 = Exaggerated expression of extreme degree', examples: '너무 재미있어서 죽을 것 같아요 / 너무 추워서 죽을 것 같아요' },
      { type: 'note', text: '-을 뻔하다 不能用于真实已发生的事', textEn: '-을 뻔하다 cannot be used for things that actually happened', examples: '✗ 진짜 넘어졌을 뻔했어요 → ✓ 넘어질 뻔했어요（差点，实际没摔）', examplesEn: '✗ 진짜 넘어졌을 뻔했어요 → ✓ 넘어질 뻔했어요 (almost, but didn\'t actually fall)' },
      { type: 'example', text: '지각할 뻔했어요 / 깜빡할 뻔했어요 / 너무 더워서 죽을 것 같아요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '넘어질', role: 'plain' }, { text: '뻔했어요', role: 'verb' }], zh: '差点摔倒了。', zhEn: 'I almost fell.', swapRole: 'plain', swapWords: ['넘어질', '늦을', '잊을'] },
      { wordBlocks: [{ text: '지각할', role: 'plain' }, { text: '뻔했는데', role: 'plain' }, { text: '다행이에요', role: 'verb' }], zh: '差点迟到，真幸运。', zhEn: 'I almost got late—lucky!', swapRole: 'plain', swapWords: ['지각할', '놓칠', '까먹을'] },
      { wordBlocks: [{ text: '너무', role: 'plain' }, { text: '배고파서', role: 'plain' }, { text: '죽을 것 같아요', role: 'verb' }], zh: '饿得要死。', zhEn: 'I\'m starving to death.', swapRole: 'plain', swapWords: ['배고파서', '피곤해서', '더워서'] },
      { wordBlocks: [{ text: '너무', role: 'plain' }, { text: '웃겨서', role: 'plain' }, { text: '죽을 것 같았어요', role: 'verb' }], zh: '笑死了。', zhEn: 'I\'m dying of laughter.', swapRole: 'plain', swapWords: ['웃겨서', '재미있어서', '기뻐서'] },
    ],
    scenarios: [
      { icon: '😱', context: '险些出事', contextEn: 'It was a close call.', ko: '길을 걷다가 차에 치일 뻔했어요! 너무 무서웠어요.', zh: '走路的时候差点被车撞！太可怕了。', zhEn: 'I almost got hit by a car while walking! So scary.' },
      { icon: '⏰', context: '差点迟到', contextEn: 'Almost late', ko: '오늘 늦잠을 자서 지각할 뻔했어요.', zh: '今天睡懒觉，差点迟到。', zhEn: 'I slept in today and almost got late.' },
      { icon: '🍔', context: '超级饿', contextEn: 'Super hungry', ko: '점심을 못 먹었더니 배고파서 죽을 것 같아요.', zh: '没吃午饭，饿得要死。', zhEn: 'I didn\'t eat lunch, so I\'m starving.' },
      { icon: '😂', context: '太好笑了', contextEn: 'So funny', ko: '그 영상 진짜 웃겨서 죽을 것 같았어요.', zh: '那个视频真的笑死了。', zhEn: 'That video was hilarious—I\'m dying.' },
      { icon: '🥵', context: '天气太热', contextEn: 'The weather is too hot', ko: '오늘 날씨 너무 더워서 죽을 것 같아요.', zh: '今天天气热得要死。', zhEn: 'It\'s boiling hot today.' },
      { icon: '😴', context: '太累了', contextEn: 'So tired', ko: '오늘 너무 힘들어서 죽을 것 같아요. 빨리 집에 가고 싶어요.', zh: '今天累得要死，好想快点回家。', zhEn: 'I\'m exhausted today; I just want to go home ASAP.' },
    ],
    mistakes: [
      { wrong: '진짜 넘어졌을 뻔했어요', correct: '넘어질 뻔했어요', note: '-을 뻔했다 表示幸好没发生，用未来时冠词形，不加过去时。', noteEn: '-을 뻔했다 means it fortunately didn\'t happen; use the future adnominal form, don\'t add past tense.' },
      { wrong: '배고프서 죽을 것 같아요', correct: '배고파서 죽을 것 같아요', note: '배고프다 词干末元音是 ㅡ 脱落后为 배고프 → 배고파서。', noteEn: 'The stem-final vowel ㅡ in 배고프다 drops, giving 배고프 → 배고파서.' },
      { wrong: '늦을 뻔했어요 때문에 택시를 탔어요', correct: '늦을 뻔해서 택시를 탔어요', note: '-ㄹ 뻔하다 后面连接原因时，要用 -아/어서 连接，不能直接用 때문에 接在动词词干后。', noteEn: 'When connecting a reason after -ㄹ 뻔하다, use -아/어서, not 때문에 directly after the verb stem.' },
      { wrong: '재미있어서 죽을 것이에요', correct: '재미있어서 죽을 것 같아요', note: '夸张程度用 -을 것 같다，不是 -을 것이다（后者像在做预测）。', noteEn: 'For exaggeration, use -을 것 같다, not -을 것이다 (the latter sounds like a prediction).' },
      { wrong: '차를 안 놓칠 뻔했어요', correct: '차를 놓칠 뻔했어요', note: '中文"差点没赶上车"其实=赶上了，容易让人多加个"没(안)"。韩语不管中文说"差点"还是"差点没"，都直接用 놓칠 뻔했다（=险些错过、结果没错过），别塞 안。', noteEn: 'In Chinese, "差点没赶上车" actually means you caught the bus, which can make people add an extra "没(안)". In Korean, whether Chinese says "差点" or "差点没", just use 놓칠 뻔했다 (= almost missed, but didn\'t), don\'t add 안.' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p8-l04', partNumber: 8, lessonNumber: 4, title: '-고 싶어하다, -뿐만 아니라',
    whatItDoes: '描述他人的愿望，以及"不仅……而且……"的递进', whatItDoesEn: 'Describing others\' wishes and the progression of "not only... but also..."',
    whatItDoesBody: '-고 싶다 是第一人称的愿望（我想……）。\n-고 싶어하다 用于第三人称（他/她想……），因为别人内心无法直接感知，要用 -하다 形式。\n-뿐만 아니라 表示"不仅……而且……"，进一步强调递进关系。\n和中文"想要/想做"以及"不仅……还……"对应，但第三人称愿望用法是中文没有的特殊区分。', whatItDoesBodyEn: '-고 싶다 is a first-person wish (I want to...). \\n-고 싶어하다 is used for third person (he/she wants to...), because others\' inner feelings can\'t be directly perceived, so the -하다 form is used. \\n-뿐만 아니라 means "not only... but also...", further emphasizing a progressive relationship. \\nIt corresponds to Chinese "想要/想做" and "不仅……还……", but the third-person wish usage is a special distinction not found in Chinese.',
    structureNote: '下面展示两种表达的基本句型框架。\n注意：说自己用 -고 싶다，说别人用 -고 싶어하다。', structureNoteEn: 'Below shows the basic sentence patterns for both expressions. \\nNote: use -고 싶다 for yourself, -고 싶어하다 for others.',
    rulesNote: '-고 싶어하다：动词词干 + 고 싶어하다，可用各种时态。\n-뿐만 아니라：名词/动词 + 뿐만 아니라 + 补充信息。\n名词 + 뿐만 아니라（名词后直接加）。\n动词词干 + -(으)ㄹ 뿐만 아니라 / 动词词干 + -는 것뿐만 아니라。', rulesNoteEn: '-고 싶어하다: verb stem + 고 싶어하다, usable in various tenses. \\n-뿐만 아니라: noun/verb + 뿐만 아니라 + additional info. \\nNoun + 뿐만 아니라 (added directly after noun). \\nVerb stem + -(으)ㄹ 뿐만 아니라 / verb stem + -는 것뿐만 아니라.',
    scenarioNote: '聊朋友的心愿、偶像的喜好、递进补充信息时都会用到。\n"她不仅歌唱得好，舞也跳得好"这种递进夸奖全用 -뿐만 아니라。', scenarioNoteEn: 'Used when talking about friends\' wishes, idols\' preferences, or adding progressive info. \\nProgressive compliments like "she not only sings well but also dances well" all use -뿐만 아니라.',
    step0Html: `<div class="card-title">-고 싶어하다 · -뿐만 아니라</div>
<div class="card-body">-고 싶어하다 描述别人的愿望（说自己用 싶다），-뿐만 아니라 递进"不仅……而且……"。两个都是聊人聊事的常用表达。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-고 싶어하다（别人的愿望）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">친구가 한국에 가고 싶어해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">朋友想去韩国。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-뿐만 아니라（递进）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">노래뿐만 아니라 춤도 잘해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">不仅歌好，舞也跳得好。</div>
    </div>
  </div>
</div>
<div class="reminder-box">저는 가고 싶어해요 ✗ → 저는 가고 싶어요 ✓。说自己的愿望用 -고 싶다，-고 싶어하다 只用于第三人称。</div>`,
    compareHtml: `<div class="card-title">-고 싶다（第一人称）vs -고 싶어하다（第三人称）</div>
<div class="card-body">中文"想"只有一种说法，韩语根据说的是自己还是别人，用两套不同的形式。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-고 싶다 → 说话人自己的愿望（第一人称）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">저는 한국에 가고 싶어요.</span><span style="font-size:16px;color:#5a4640">我想去韩国。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">뭐 먹고 싶어요?</span><span style="font-size:16px;color:#5a4640">你想吃什么？（问对方时也可以用）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-고 싶어하다 → 第三人称的愿望</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구가 한국에 가고 싶어해요.</span><span style="font-size:16px;color:#5a4640">朋友想去韩国。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">동생이 강아지를 갖고 싶어해요.</span><span style="font-size:16px;color:#5a4640">弟弟想要一只狗。</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">-뿐만 아니라 结构</div>
  <div style="font-size:16px;color:#5a4640">名词+뿐만 아니라：노래뿐만 아니라 춤도 잘해요.</div>
  <div style="margin-top:4px;font-size:16px;color:#5a4640">后句必须用 도（也）来呼应：뿐만 아니라 + ……도……</div>
</div>
<div class="reminder-box">노래를 뿐만 아니라 ✗ → 노래뿐만 아니라 ✓（名词后直接接，不加助词）。뿐만 아니라 放句首 ✗（前面必须有名词/动词）。（뿐 아니라 省略 만 也正确。）</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的第三人称愿望/递进表达', titleEn: 'Choose the correct third-person wish/progressive expression',
      body: '根据句意选择 -고 싶어하다 或 -뿐만 아니라。', bodyEn: 'Choose -고 싶어하다 or -뿐만 아니라 based on the meaning.',
      questions: [
        {
          pre: '친구는 한국에',
          post: '.',
          options: ["갈 거예요", "가고 싶어해요", "가고 싶어요"],
          answer: 1,
          explanation: '第三人称愿望用 -고 싶어하다："朋友想去韩国。"说别人不能用 -고 싶어요。', explanationEn: 'For third-person wishes, use -고 싶어하다: "My friend wants to go to Korea." You can\'t use -고 싶어요 for others.',
        },
        {
          pre: '그 가수는 노래를 잘할',
          post: '춤도 잘 춰요.',
          options: ['것뿐만 아니라', '뿐이 아니라', '뿐만 아니라'],
          answer: 2,
          explanation: '-을 뿐만 아니라 = "不仅……而且……"：那歌手不仅歌唱得好，舞也跳得好。', explanationEn: '-을 뿐만 아니라 = "not only... but also...": That singer not only sings well, but also dances well.',
        },
        {
          pre: '동생이 아이스크림을',
          post: '.',
          options: ['먹고 싶어해요', '먹고 싶어요', '먹을래요'],
          answer: 0,
          explanation: '第三人称愿望：동생이 먹고 싶어해요（妹妹想吃冰淇淋）。', explanationEn: 'Third-person wish: 동생이 먹고 싶어해요 (My younger sibling wants to eat ice cream).',
        },
        {
          pre: '한국어는 재미있을',
          post: '유용해요.',
          options: ["뿐이 아니라", "뿐만 아니라", "것만 아니라"],
          answer: 1,
          explanation: '-을 뿐만 아니라 = "韩语不仅有趣，而且有用。"', explanationEn: '-을 뿐만 아니라 = "Korean is not only interesting, but also useful."',
        },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 8 章 第 4 课 · 已完成</div>
    <div class="ov-hero-title">-고 싶어하다 · -뿐만 아니라</div>
    <div class="ov-hero-sub">第三人称愿望 · 不仅而且 · 递进强调</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心对比</div></div>
    <div class="ov-block">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div style="background:#fff0f5;border-radius:10px;padding:10px"><div style="font-size:16px;font-weight:800;color:#ff7fa8">-고 싶다</div><div style="font-size:11px;color:#89756e;margin-top:2px">我想……（第一人称）</div></div>
        <div style="background:#eaf8f5;border-radius:10px;padding:10px"><div style="font-size:16px;font-weight:800;color:#2db89b">-고 싶어하다</div><div style="font-size:11px;color:#89756e;margin-top:2px">他/她想……（第三人称）</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">친구가 한국에 가고 싶어해요</span></div><div class="struct-zh">朋友想去韩国。</div></div>
        <div><div class="tok-row"><span class="tok t-v">노래뿐만 아니라 춤도 잘해요</span></div><div class="struct-zh">不仅歌好，舞也跳得好。</div></div>
        <div><div class="tok-row"><span class="tok t-v">한국어뿐만 아니라 일본어도 잘해요</span></div><div class="struct-zh">不仅韩语，日语也很好。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">저는 가고 싶어해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">저는 가고 싶어요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">노래를 뿐만 아니라 춤도</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">노래뿐만 아니라 춤도（名词后直接接，不加 를）</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '친구가 한국에 가고 싶어해요', zh: '朋友想去韩国。', zhEn: 'My friend wants to go to Korea.', tokens: [{ text: '친구가', role: 'subject' }, { text: '한국에', role: 'place' }, { text: '가고 싶어해요', role: 'verb' }] },
      { ko: '동생이 강아지를 갖고 싶어해요', zh: '弟弟/妹妹想要一只狗。', zhEn: 'My younger sibling wants a dog.', tokens: [{ text: '동생이', role: 'subject' }, { text: '강아지를', role: 'object' }, { text: '갖고 싶어해요', role: 'verb' }] },
      { ko: '이 아이돌은 노래뿐만 아니라 춤도 잘해요', zh: '这个爱豆不仅歌唱得好，舞也跳得好。', zhEn: 'This idol not only sings well, but also dances well.', tokens: [{ text: '이 아이돌은', role: 'subject' }, { text: '노래뿐만 아니라', role: 'plain' }, { text: '춤도', role: 'object' }, { text: '잘해요', role: 'verb' }] },
      { ko: '한국어뿐만 아니라 일본어도 배워요', zh: '不仅学韩语，也学日语。', zhEn: 'I study not only Korean, but also Japanese.', tokens: [{ text: '한국어뿐만 아니라', role: 'plain' }, { text: '일본어도', role: 'object' }, { text: '배워요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + 고 싶어하다 → 第三人称愿望', textEn: 'Verb stem + 고 싶어하다 → third-person wish', examples: '가고 싶어하다 / 먹고 싶어하다 / 만나고 싶어하다' },
      { type: 'compare', text: '-고 싶다（第一人称）vs -고 싶어하다（第三人称）', textEn: '-고 싶다 (first person) vs -고 싶어하다 (third person)', examples: '저는 가고 싶어요（我想去）/ 친구는 가고 싶어해요（朋友想去）', examplesEn: 'I want to go / My friend wants to go' },
      { type: 'rule', text: '名词 + 뿐만 아니라 + 也……', textEn: 'Noun + 뿐만 아니라 + also...', examples: '노래뿐만 아니라 춤도 / 한국어뿐만 아니라 영어도' },
      { type: 'usage', text: '뿐만 아니라 的后句常用 도（也）呼应', textEn: 'The following clause after 뿐만 아니라 often uses 도 (also) to match.', examples: '공부뿐만 아니라 운동도 해요 / 착할 뿐만 아니라 예쁘기도 해요' },
      { type: 'note', text: '-고 싶어하다 可用于疑问句询问他人意愿', textEn: '-고 싶어하다 can be used in questions to ask about others\' wishes.', examples: '언니가 뭘 먹고 싶어해요?（姐姐想吃什么？）', examplesEn: '언니가 뭘 먹고 싶어해요? (What does your older sister want to eat?)' },
      { type: 'vocab', text: '뿐만 아니라 常见搭配', textEn: 'Common collocations with 뿐만 아니라', examples: '그뿐만 아니라（不仅如此）/ 이것뿐만 아니라（不仅这个）/ 한국뿐만 아니라（不仅韩国）', examplesEn: '그뿐만 아니라 (not only that) / 이것뿐만 아니라 (not only this) / 한국뿐만 아니라 (not only Korea)' },
      { type: 'example', text: '친구가 한국 음식을 먹고 싶어해요 / 이 드라마는 재미있을 뿐만 아니라 감동적이에요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '친구가', role: 'subject' }, { text: '한국에', role: 'place' }, { text: '가고 싶어해요', role: 'verb' }], zh: '朋友想去韩国。', zhEn: 'My friend wants to go to Korea.', swapRole: 'subject', swapWords: ['친구가', '동생이', '남자친구가'] },
      { wordBlocks: [{ text: '동생이', role: 'subject' }, { text: '강아지를', role: 'object' }, { text: '갖고 싶어해요', role: 'verb' }], zh: '弟弟/妹妹想要一只狗。', zhEn: 'My younger sibling wants a dog.', swapRole: 'object', swapWords: ['강아지를', '자전거를', '스마트폰을'] },
      { wordBlocks: [{ text: '노래뿐만 아니라', role: 'plain' }, { text: '춤도', role: 'object' }, { text: '잘해요', role: 'verb' }], zh: '不仅歌唱得好，舞也跳得好。', zhEn: 'Not only sings well, but also dances well.', swapRole: 'plain', swapWords: ['노래뿐만 아니라', '한국어뿐만 아니라', '공부뿐만 아니라'] },
      { wordBlocks: [{ text: '한국어뿐만 아니라', role: 'plain' }, { text: '일본어도', role: 'object' }, { text: '잘해요', role: 'verb' }], zh: '不仅韩语，日语也很好。', zhEn: 'Not only Korean, but Japanese is also good.', swapRole: 'object', swapWords: ['일본어도', '영어도', '중국어도'] },
    ],
    scenarios: [
      { icon: '🌏', context: '聊朋友的心愿', contextEn: 'Talking about a friend\'s wishes', ko: '제 친구가 꼭 한국에 가고 싶어해요.', zh: '我的朋友一直想去韩国。', zhEn: 'My friend has always wanted to go to Korea.' },
      { icon: '🐶', context: '说家人的愿望', contextEn: 'Talking about family\'s wishes', ko: '동생이 강아지를 키우고 싶어해서 부모님께 말했어요.', zh: '弟弟/妹妹想养狗，告诉了父母。', zhEn: 'My younger sibling wants a dog and told our parents.' },
      { icon: '🎤', context: '夸爱豆多才多艺', contextEn: 'Praising an idol for being multi-talented', ko: '이 아이돌은 노래뿐만 아니라 춤도 연기도 다 잘해요.', zh: '这个爱豆不仅歌好，舞蹈和演技也都很好。', zhEn: 'This idol isn\'t just good at singing—their dancing and acting are great too.' },
      { icon: '📖', context: '夸朋友多语言', contextEn: 'Praising a friend for speaking multiple languages', ko: '제 친구는 한국어뿐만 아니라 영어도 일본어도 할 수 있어요.', zh: '我朋友不仅会韩语，还会英语和日语。', zhEn: 'My friend speaks not only Korean but also English and Japanese.' },
      { icon: '🍜', context: '问别人想吃什么', contextEn: 'Asking someone what they want to eat', ko: '남자친구가 오늘 뭐 먹고 싶어해요?', zh: '男朋友今天想吃什么？', zhEn: 'What does your boyfriend want to eat today?' },
      { icon: '✨', context: '夸城市', contextEn: 'Praising a city', ko: '서울은 볼 것뿐만 아니라 먹을 것도 정말 많아요.', zh: '首尔不仅有很多可看的，也有很多可吃的。', zhEn: 'Seoul has not only lots to see but also lots to eat.' },
    ],
    mistakes: [
      { wrong: '저는 가고 싶어해요', correct: '저는 가고 싶어요', note: '-고 싶어하다 用于第三人称，说自己的愿望用 -고 싶다。', noteEn: '-고 싶어하다 is used for the third person; use -고 싶다 for your own wishes.' },
      { wrong: '친구가 가고 싶어요', correct: '친구가 가고 싶어해요', note: '说别人的内心愿望用 -고 싶어하다，直说 싶어요 语法上不自然（像在代入别人视角说话）。', noteEn: 'Use -고 싶어하다 to express someone else\'s inner wishes; saying 싶어요 directly is grammatically unnatural (like speaking from their perspective).' },
      { wrong: '노래를 뿐만 아니라 춤도 잘해요', correct: '노래뿐만 아니라 춤도 잘해요', note: '뿐(만) 아니라 直接接在名词后，前面不加宾格 를 等助词：노래뿐만 아니라 ✓。（省略 만 的 뿐 아니라 也是正确形。）', noteEn: '뿐(만) 아니라 attaches directly to a noun without particles like 를: 노래뿐만 아니라 ✓. (Omitting 만 in 뿐 아니라 is also correct.)' },
      { wrong: '뿐만 아니라 춤도 잘해요', correct: '노래뿐만 아니라 춤도 잘해요', note: '뿐만 아니라 前面必须有明确的名词，不能单独放在句首。', noteEn: '뿐만 아니라 must follow a clear noun; it can\'t stand alone at the start of a sentence.' },
      { wrong: '너 뭐 먹고 싶어해?', correct: '너 뭐 먹고 싶어?', note: '싶어하다 只用来谈论"不在场的第三方"，直接问面前的听话人（你）时仍用 싶다。别因为"别人用 싶어하다"就连问对方也套上。', noteEn: '싶어하다 is only for talking about an absent third party; when directly asking the person in front of you, still use 싶다. Don\'t apply 싶어하다 to the listener just because it\'s used for others.' },
      { wrong: '이 드라마는 재미있어요 뿐만 아니라 감동적이에요', correct: '이 드라마는 재미있을 뿐만 아니라 감동적이에요', note: '뿐만 아니라 只能接名词或动/形词干的 -(으)ㄹ 形（재미있을），不能接已经收尾的 -어요。中文"不仅有趣"是完整小句，直译过来就会犯这个错。', noteEn: '뿐만 아니라 can only follow a noun or the -(으)ㄹ form of a verb/adjective stem (like 재미있을), not a finished -어요 ending. Chinese phrases like "not only fun" are full clauses, so translating literally causes this error.' },
    ],
    linkedGrammarIds: ['g38', 'g66'],
  },
  {
    id: 'card-p8-l05', partNumber: 8, lessonNumber: 5, title: '-아/어/여 보다, -은/ㄴ 적이 있다/없다',
    whatItDoes: '说"试着做"和"有没有……过的经历"', whatItDoesEn: 'Saying "try doing" and "have you ever..."',
    whatItDoesBody: '-아/어/여 보다 表示"试试看……""尝试一下……"，带有尝试或建议的语气。\n-은/ㄴ 적이 있다/없다 表示"有/没有做过……的经历"，用来交流人生经历。\n和中文"试试看""有没有……过"对应，是日常聊天中询问和分享经历最常用的句型。', whatItDoesBodyEn: '-아/어/여 보다 means "try doing..." or "give it a shot," with a tone of attempt or suggestion.\\n-은/ㄴ 적이 있다/없다 means "have/haven\'t had the experience of..." and is used to share life experiences.\\nThese correspond to Chinese "试试看" and "有没有……过," and are the most common patterns for asking about and sharing experiences in everyday conversation.',
    structureNote: '下面展示两种经历/尝试表达的基本句型。\n-아/어/여 보다 强调动作尝试，-은/ㄴ 적이 있다 强调经历有无。', structureNoteEn: 'Below are the basic sentence patterns for expressing experience/attempt.\\n-아/어/여 보다 emphasizes trying an action, while -은/ㄴ 적이 있다 emphasizes whether an experience has occurred.',
    rulesNote: '-아/어/여 보다：末元音 ㅏ/ㅗ → 아 보다，其他 → 어 보다，하다 → 해 보다。\n-은/ㄴ 적이 있다：动词词干 有收音 + 은 적이 있어요，无收音 + ㄴ 적이 있어요。\n没有经历 → -은/ㄴ 적이 없어요。\n过去曾有经历 → -은/ㄴ 적이 있어요（적 表示"那时候/那次"）。', rulesNoteEn: '-아/어/여 보다: If the last vowel is ㅏ/ㅗ, use 아 보다; otherwise, use 어 보다; 하다 becomes 해 보다.\\n-은/ㄴ 적이 있다: If the verb stem ends in a consonant, add 은 적이 있어요; if it ends in a vowel, add ㄴ 적이 있어요.\\nNo experience → -은/ㄴ 적이 없어요.\\nHad experience in the past → -은/ㄴ 적이 있어요 (적 means "that time/occasion").',
    scenarioNote: '旅游、饮食、运动、追星经历的交流，以及建议对方试试看，全靠这两个句型。\n"你有没有去过韩国？""试试这道菜吧"是最典型的使用场景。', scenarioNoteEn: 'These two patterns are essential for talking about travel, food, sports, and celebrity fandom experiences, as well as suggesting someone try something.\\n"Have you ever been to Korea?" and "Try this dish" are the most typical usage scenarios.',
    step0Html: `<div class="card-title">-아 봤어요 · -은 적이 있어요</div>
<div class="card-body">-아 봤어요 说"试过/尝过"，-은 적이 있어요 说"有过这个经历"。聊旅行、美食、追星经历全靠这两个。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-아/어 봤어요（尝试）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">이 음식 먹어 봤어요?</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">你试过这道菜吗？</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-은/ㄴ 적이 있어요（经历）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">한국에 간 적이 있어요?</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">你有去过韩国吗？</div>
    </div>
  </div>
</div>
<div class="reminder-box">-아 봐요 用于建议对方试试：한번 들어 봐요（试听一下吧）。-은 적이 있다 强调经历本身，不是当下动作。</div>`,
    compareHtml: `<div class="card-title">-아/어 보다（尝试）vs -은/ㄴ 적이 있다（经历）</div>
<div class="card-body">两者都和"做过某件事"有关，但 -아 보다 强调动作本身的尝试，-은 적이 있다 强调有无这段人生经历。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어 봤어요 → 尝试/试过（动作本身）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">ㅏ/ㅗ→아 봤어요 / 其他→어 봤어요 / 하다→해 봤어요</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">이 라면 먹어 봤어요?</span><span style="font-size:16px;color:#5a4640">你试过这个拉面吗？</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한번 들어 봐요.</span><span style="font-size:16px;color:#5a4640">试听一下吧。（建议）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-은/ㄴ 적이 있다 → 有过这段经历</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">有收音→은 적이 있어요 / 无收音→ㄴ 적이 있어요</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국에 간 적이 있어요?</span><span style="font-size:16px;color:#5a4640">你有去过韩国吗？</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">스키 탄 적이 없어요.</span><span style="font-size:16px;color:#5a4640">我没有滑过雪。</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">日常对话中的区别</div>
  <div style="font-size:16px;color:#5a4640">이 음식 먹어 봤어요?（你试过这道菜吗？→ 侧重"试没试"）</div>
  <div style="margin-top:4px;font-size:16px;color:#5a4640">이 음식 먹은 적이 있어요?（你吃过这道菜吗？→ 侧重"有没有这个经历"）</div>
</div>
<div class="reminder-box">먹은 봤어요 ✗ → 먹어 봤어요 ✓（要按末元音选 아/어，不能用 -은）。-은 적이 있다 描述已结束的过去经历，不用于当下进行中的动作。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的"尝试/经历"表达', titleEn: 'Choose the correct expression for "attempt/experience"',
      body: '根据句意选择 -아/어 보다 或 -은/ㄴ 적이 있다。', bodyEn: 'Choose -아/어 보다 or -은/ㄴ 적이 있다 based on the meaning.',
      questions: [
        {
          pre: '이 김치를 한번',
          post: '.',
          options: ['먹어 보세요', '먹은 적이 있어요', '먹을 거예요'],
          answer: 0,
          explanation: '-아/어 보다 = "试试看"："请尝尝这个泡菜。"', explanationEn: '-아/어 보다 = "try it": "Please try this kimchi."',
        },
        {
          pre: '한국에 한 번',
          post: '.',
          options: ['갈 거예요', '가고 싶어요', '가 본 적이 있어요'],
          answer: 2,
          explanation: '-은 적이 있다 强调"有过…的经历"：한 번 가 본 적이 있어요（去过一次）。갈 거예요（将要去）、가고 싶어요（想去）都不表已有的经历。', explanationEn: '-은 적이 있다 emphasizes "having the experience of...": 한 번 가 본 적이 있어요 (I\'ve been once). 갈 거예요 (will go) and 가고 싶어요 (want to go) don\'t express past experience.',
        },
        {
          pre: '이 옷을',
          post: '?',
          options: ['입은 적이 있어요', '입어 볼까요', '입을 거예요'],
          answer: 1,
          explanation: '-아/어 보다 尝试："要不要试穿这件衣服？"', explanationEn: '-아/어 보다 for trying: "Want to try on this outfit?"',
        },
        {
          pre: '저는 김치를',
          post: '.',
          options: ["먹어 봤어요", "먹어 본 적이 없어요", "먹을 거예요"],
          answer: 1,
          explanation: '-은 적이 없다 = "没做过……"：我没吃过泡菜。', explanationEn: '-은 적이 없다 = "have never done...": I\'ve never eaten kimchi.',
        },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 8 章 第 5 课 · 已完成</div>
    <div class="ov-hero-title">-아 봤어요 · -은 적이 있어요</div>
    <div class="ov-hero-sub">尝试体验 · 人生经历 · 建议对方试试</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">变形规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">ㅏ/ㅗ→아 봤어요</span>：가 봤어요 / 와 봤어요</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">其他→어 봤어요</span>：먹어 봤어요 / 들어 봤어요</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">有收音→은 적이</span>：먹은 적이 / 읽은 적이</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">无收音→ㄴ 적이</span>：간 적이 / 본 적이</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">이 음식 먹어 봤어요?</span></div><div class="struct-zh">你试过这道菜吗？</div></div>
        <div><div class="tok-row"><span class="tok t-v">한번 들어 봐요</span></div><div class="struct-zh">试听一下吧。</div></div>
        <div><div class="tok-row"><span class="tok t-v">한국에 간 적이 있어요?</span></div><div class="struct-zh">你有去过韩国吗？</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹은 봤어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹어 봤어요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">어제 간 적이 있어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">어제 가 봤어요</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '이 음식 먹어 봤어요?', zh: '你试过这道菜吗？', zhEn: 'Have you tried this dish?', tokens: [{ text: '이 음식', role: 'object' }, { text: '먹어 봤어요?', role: 'verb' }] },
      { ko: '한번 들어 보세요', zh: '试听一下吧。', zhEn: 'Give it a listen.', tokens: [{ text: '한번', role: 'plain' }, { text: '들어 보세요', role: 'verb' }] },
      { ko: '한국에 간 적이 있어요?', zh: '你有去过韩国吗？', zhEn: 'Have you ever been to Korea?', tokens: [{ text: '한국에', role: 'place' }, { text: '간 적이 있어요?', role: 'verb' }] },
      { ko: '김치찌개를 먹은 적이 없어요', zh: '我没有吃过泡菜汤。', zhEn: 'I\'ve never had kimchi stew.', tokens: [{ text: '김치찌개를', role: 'object' }, { text: '먹은 적이 없어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '末元音 ㅏ/ㅗ + 아 보다 / 아 봤어요', textEn: 'Final vowel ㅏ/ㅗ + 아 보다 / 아 봤어요', examples: '가다→가 봤어요 / 오다→와 봤어요 / 사다→사 봤어요' },
      { type: 'rule', text: '其他元音 + 어 보다 / 어 봤어요', textEn: 'Other vowels + 어 보다 / 어 봤어요', examples: '먹다→먹어 봤어요 / 입다→입어 봤어요 / 듣다→들어 봤어요' },
      { type: 'rule', text: '动词词干 无收音 + ㄴ 적이 있다/없다', textEn: 'Verb stem (no final consonant) + ㄴ 적이 있다/없다', examples: '가다→간 적이 / 오다→온 적이 / 보다→본 적이' },
      { type: 'rule', text: '动词词干 有收音 + 은 적이 있다/없다', textEn: 'Verb stem (with final consonant) + 은 적이 있다/없다', examples: '먹다→먹은 적이 / 읽다→읽은 적이 / 입다→입은 적이' },
      { type: 'compare', text: '-아 보다 vs -은 적이 있다', examples: '-아 보다：尝试/建议（动作本身）/ -은 적이 있다：有无经历（人生经历）', examplesEn: '-아 보다: try/suggest (the action itself) / -은 적이 있다: whether you\'ve had the experience (life experience)' },
      { type: 'usage', text: '-아 봐요 常用于建议对方尝试', textEn: '-아 봐요 is often used to suggest someone try something', examples: '이 노래 들어 봐요 / 김치 먹어 봐요 / 한번 해 봐요' },
      { type: 'example', text: '한국에 가 본 적이 있어요? / 이 영화 봐 봤어요? / 스키 탄 적이 없어요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '이 음식', role: 'object' }, { text: '먹어 봤어요?', role: 'verb' }], zh: '你试过这道菜吗？', zhEn: 'Have you tried this dish?', swapRole: 'object', swapWords: ['이 음식', '이 노래', '이 드라마'] },
      { wordBlocks: [{ text: '한번', role: 'plain' }, { text: '들어 보세요', role: 'verb' }], zh: '试听一下吧。', zhEn: 'Give it a listen.', swapRole: 'verb', swapWords: ['들어 보세요', '먹어 보세요', '해 보세요'] },
      { wordBlocks: [{ text: '한국에', role: 'place' }, { text: '간 적이 있어요?', role: 'verb' }], zh: '你有去过韩国吗？', zhEn: 'Have you ever been to Korea?', swapRole: 'place', swapWords: ['한국에', '일본에', '제주도에'] },
      { wordBlocks: [{ text: '김치찌개를', role: 'object' }, { text: '먹은 적이 없어요', role: 'verb' }], zh: '我没吃过泡菜汤。', zhEn: 'I\'ve never tried kimchi stew.', swapRole: 'object', swapWords: ['김치찌개를', '삼겹살을', '떡볶이를'] },
    ],
    scenarios: [
      { icon: '🍜', context: '推荐食物', contextEn: 'Recommending food', ko: '이 라면 먹어 봤어요? 진짜 맛있어요, 꼭 드셔 보세요!', zh: '你试过这个拉面吗？真的很好吃，一定要试试！', zhEn: 'Have you tried this ramen? It\'s really good—you\'ve got to try it!' },
      { icon: '🇰🇷', context: '聊旅行经历', contextEn: 'Talking about travel experiences', ko: '한국에 가 본 적 있어요? 저는 작년에 처음 갔어요.', zh: '你去过韩国吗？我去年第一次去的。', zhEn: 'Have you been to Korea? I went for the first time last year.' },
      { icon: '🎵', context: '推荐音乐', contextEn: 'Recommending music', ko: '이 노래 들어 봤어요? 요즘 너무 좋아해요.', zh: '你听过这首歌吗？最近超喜欢。', zhEn: 'Have you heard this song? I\'ve been loving it lately.' },
      { icon: '⛷️', context: '聊特殊经历', contextEn: 'Talking about unique experiences', ko: '스키 타 본 적 있어요? 저는 한 번도 없어요.', zh: '你滑过雪吗？我一次都没有。', zhEn: 'Have you ever been skiing? I haven\'t even once.' },
      { icon: '🎭', context: '推荐影视', contextEn: 'Recommending shows/movies', ko: '이 드라마 봐 봤어요? 진짜 재미있어서 추천해요.', zh: '你看过这部剧吗？真的很好看，推荐一下。', zhEn: 'Have you seen this show? It\'s really good—I recommend it.' },
      { icon: '🧘', context: '询问运动经历', contextEn: 'Asking about exercise experience', ko: '요가 해 본 적 있어요? 처음에는 어려웠지만 좋아요.', zh: '你练过瑜伽吗？一开始难，但挺好的。', zhEn: 'Have you tried yoga? It\'s hard at first, but it\'s great.' },
    ],
    mistakes: [
      { wrong: '가 본 적이 있어요 어제', correct: '어제 가 봤어요', note: '-은/ㄴ 적이 있다 强调人生经历，昨天的具体事件用 -아/어 봤어요 更自然。', noteEn: '-은/ㄴ 적이 있다 emphasizes life experience; for a specific event yesterday, -아/어 봤어요 is more natural.' },
      { wrong: '먹은 봤어요', correct: '먹어 봤어요', note: '-아/어 보다 的 아/어 不能和 -은 混用，要按末元音变形规则选 아/어。', noteEn: 'The 아/어 in -아/어 보다 can\'t be mixed with -은; choose 아/어 based on the final vowel rule.' },
      { wrong: '간 적이 있어요 지금', correct: '지금 가고 있어요 / 방금 갔어요', note: '-은/ㄴ 적이 있다 用于已结束的过去经历，不能描述当前进行中的动作。', noteEn: '-은/ㄴ 적이 있다 is for completed past experiences, not ongoing actions.' },
      { wrong: '한국에 가 본 적이 있어요 없어요', correct: '한국에 가 본 적이 있어요? / 없어요', note: '有经历和没经历是两个不同句子，不能在同一句里同时说有和没有。', noteEn: 'Having and not having an experience are two different sentences; you can\'t say both in one sentence.' },
    ],
    linkedGrammarIds: ['g65'],
  },
  {
    id: 'card-p8-l06', partNumber: 8, lessonNumber: 6, title: '-아/어/여도, -(이)라도, -아/어/여도 되다/괜찮다/좋다',
    whatItDoes: '表示"即使……也……"和"可以……吗"', whatItDoesEn: 'Expressing "even if..." and "may I..."',
    whatItDoesBody: '-아/어/여도 表示"即使……也……"，前后两个条件形成让步关系。\n-(이)라도 接在名词后，表示"就算……也好/……也行"，退而求其次的语气。\n-아/어/여도 되다/괜찮다/좋다 都表示"可以……"，用于请求或确认许可。\n되다/괜찮다/좋다 三者可互换，되다 最中性，괜찮다 带有"没问题"的语感，좋다 更口语化表示"好的可以"。\n和中文"即使……也""哪怕……也行""可以……吗"对应。', whatItDoesBodyEn: '-아/어/여도 means "even if..." and creates a concessive relationship between two conditions.\\n-(이)라도 attaches to nouns and means "even if it\'s just..." or "...will do," conveying a settling-for-less tone.\\n-아/어/여도 되다/괜찮다/좋다 all mean "may I..." and are used to request or confirm permission.\\n되다/괜찮다/좋다 are interchangeable; 되다 is the most neutral, 괜찮다 carries a nuance of "no problem," and 좋다 is more colloquial, meaning "sure, that\'s fine."\\nThese correspond to Chinese "即使……也," "哪怕……也行," and "可以……吗."',
    structureNote: '下面展示三种让步/允许表达的句型框架。\n注意：-아도 되다 请求许可，-아도 否定 是"即使……也不……"。', structureNoteEn: 'Below are the sentence patterns for three types of concession/permission expressions.\\nNote: -아도 되다 is used to request permission, while -아도 with a negative means "even if... don\'t..."',
    rulesNote: '-아/어/여도：末元音 ㅏ/ㅗ → 아도，其他 → 어도，하다 → 해도。\n-(이)라도：有收音名词 + 이라도，无收音名词 + 라도。\n-아/어/여도 되다：变形规则同 -아/어/여도，后接 되다/돼요/됩니다。', rulesNoteEn: '-아/어/여도: If the last vowel is ㅏ/ㅗ, use 아도; otherwise, use 어도; 하다 becomes 해도.\\n-(이)라도: If the noun ends in a consonant, add 이라도; if it ends in a vowel, add 라도.\\n-아/어/여도 되다: Follows the same conjugation rules as -아/어/여도, followed by 되다/돼요/됩니다.',
    scenarioNote: '请求许可（도 돼요?）是日常对话最高频句型之一。\n"可以拍照吗？""可以坐这里吗？"全用 -아도 돼요?。\n-(이)라도 表示将就接受，像"有水的话，水也行"这种退而求其次。', scenarioNoteEn: 'Asking for permission (도 돼요?) is one of the most frequent patterns in everyday conversation.\\n"Can I take a photo?" and "Can I sit here?" all use -아도 돼요?.\\n-(이)라도 expresses settling for something less, like "If there\'s water, water will do."',
    step0Html: `<div class="card-title">-아도 · -(이)라도 · -아도 돼요?</div>
<div class="card-body">三种让步/允许表达：即使也……/ 哪怕……也行 / 可以……吗。日常对话超高频，一节课全打通。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">三种用法一览</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-아도（即使也）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비가 와도 갈 거예요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">即使下雨也要去。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-(이)라도（哪怕也行）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">물이라도 마실래요?</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">喝点水也好？（退而求其次）</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">-아도 돼요?（可以吗）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">여기 앉아도 돼요?</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">可以坐这里吗？</div>
    </div>
  </div>
</div>
<div class="reminder-box">먹도 돼요? ✗ → 먹어도 돼요? ✓（必须先完成 -아/어 变形再加 도 되다）。</div>`,
    compareHtml: `<div class="card-title">-아도 / -(이)라도 / -아도 되다 三种用法对比</div>
<div class="card-body">三者形式相近但语义不同：让步关系 / 退而求其次 / 请求许可——用错了意思就变了。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어도 → 即使……也……（让步）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">ㅏ/ㅗ→아도 / 其他→어도 / 하다→해도</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 와도 괜찮아요.</span><span style="font-size:16px;color:#5a4640">即使下雨也没关系。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">힘들어도 포기 안 해요.</span><span style="font-size:16px;color:#5a4640">即使辛苦也不放弃。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(이)라도 → 哪怕……也行（退而求其次）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">有收音名词+이라도 / 无收音名词+라도</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">커피라도 마실까요?</span><span style="font-size:16px;color:#5a4640">喝杯咖啡也好？</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">버스라도 타요.</span><span style="font-size:16px;color:#5a4640">坐公交也行。</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어도 되다 → 可以……吗？（请求许可）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">变形同 -아/어도，后接 되다/돼요</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사진 찍어도 돼요?</span><span style="font-size:16px;color:#5a4640">可以拍照吗？</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">여기 앉아도 돼요?</span><span style="font-size:16px;color:#5a4640">可以坐这里吗？</span></div>
  </div>
</div>
<div class="reminder-box">물라도 ✗ → 물이라도 ✓（물 有收音 ㄹ，用 이라도）。-아도 돼요? 的回答：돼요（可以）/ 안 돼요（不可以）。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的让步/允许表达', titleEn: 'Choose the correct concession/permission expression',
      body: '根据句意选择 -아/어도, -(이)라도 或 -아/어도 되다。', bodyEn: 'Choose -아/어도, -(이)라도, or -아/어도 되다 based on the meaning.',
      questions: [
        {
          pre: '바빠',
          post: '운동은 꼭 하세요.',
          options: ["라도", "서", "도"],
          answer: 2,
          explanation: '-아/어도 = "即使……也"：即使忙也要运动。', explanationEn: '-아/어도 = "even if...": Even if you\'re busy, you should exercise.',
        },
        {
          pre: '시간이 없으면 물',
          post: '마셔요.',
          options: ["이나", "이라도", "어도"],
          answer: 1,
          explanation: '-(이)라도 = "至少/哪怕是"：没时间的话至少喝点水吧。', explanationEn: '-(이)라도 = "at least/even if it\'s": If you don\'t have time, at least drink some water.',
        },
        {
          pre: '여기 앉',
          post: '?',
          options: ["아도 돼요", "으면 돼요", "을까요"],
          answer: 0,
          explanation: '-아/어도 되다 = "可以……吗？"：可以坐这里吗？', explanationEn: '-아/어도 되다 = "may I...?": May I sit here?',
        },
        {
          pre: '피곤해',
          post: '숙제는 해야 해요.',
          options: ["라도", "서", "도"],
          answer: 2,
          explanation: '-아/어도 = "即使累也要做作业。"', explanationEn: '-아/어도 = "Even if tired, you still have to do homework."',
        },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 8 章 第 6 课 · 已完成</div>
    <div class="ov-hero-title">-아도 · -(이)라도 · -아도 돼요?</div>
    <div class="ov-hero-sub">即使也 · 退而求其次 · 请求许可</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">三种用法速查</div></div>
    <div class="ov-block">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
        <div style="background:#fff0f5;border-radius:10px;padding:10px;text-align:center"><div style="font-size:16px;font-weight:800;color:#ff7fa8">-아도</div><div style="font-size:11px;color:#89756e;margin-top:2px">即使……也</div></div>
        <div style="background:#eaf8f5;border-radius:10px;padding:10px;text-align:center"><div style="font-size:16px;font-weight:800;color:#2db89b">-(이)라도</div><div style="font-size:11px;color:#89756e;margin-top:2px">哪怕……也行</div></div>
        <div style="background:#f0f4ff;border-radius:10px;padding:10px;text-align:center"><div style="font-size:16px;font-weight:800;color:#6b7ff0">-아도 돼요?</div><div style="font-size:11px;color:#89756e;margin-top:2px">可以……吗</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">비가 와도 갈 거예요</span></div><div class="struct-zh">即使下雨也要去。</div></div>
        <div><div class="tok-row"><span class="tok t-v">물이라도 마실래요?</span></div><div class="struct-zh">喝点水也好？</div></div>
        <div><div class="tok-row"><span class="tok t-v">여기 앉아도 돼요?</span></div><div class="struct-zh">可以坐这里吗？</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹도 돼요?</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹어도 돼요?</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">물라도</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">물이라도</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '비가 와도 갈 거예요', zh: '即使下雨也要去。', zhEn: 'Even if it rains, I\'ll go.', tokens: [{ text: '비가', role: 'subject' }, { text: '와도', role: 'plain' }, { text: '갈 거예요', role: 'verb' }] },
      { ko: '여기 앉아도 돼요?', zh: '可以坐这里吗？', zhEn: 'Can I sit here?', tokens: [{ text: '여기', role: 'place' }, { text: '앉아도 돼요?', role: 'verb' }] },
      { ko: '물이라도 마실래요?', zh: '喝点水也好，要喝吗？', zhEn: 'Having some water is fine, want some?', tokens: [{ text: '물이라도', role: 'object' }, { text: '마실래요?', role: 'verb' }] },
      { ko: '늦어도 괜찮아요', zh: '即使迟到也没关系。', zhEn: 'It\'s okay even if you\'re late.', tokens: [{ text: '늦어도', role: 'plain' }, { text: '괜찮아요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: 'ㅏ/ㅗ 结尾 + 아도 / 其他 + 어도 / 하다 → 해도', textEn: 'Ends with ㅏ/ㅗ + 아도 / others + 어도 / 하다 → 해도', examples: '가다→가도 / 먹다→먹어도 / 공부하다→공부해도' },
      { type: 'rule', text: '有收音名词 + 이라도 / 无收音名词 + 라도', textEn: 'Noun with final consonant + 이라도 / no final consonant + 라도', examples: '물이라도 / 커피라도 / 버스라도 / 택시라도' },
      { type: 'rule', text: '-아/어도 되다/괜찮다/좋다：可以……（三者可互换）', textEn: '-아/어도 되다/괜찮다/좋다: can... (all three interchangeable)', examples: '사진 찍어도 돼요? / 사진 찍어도 괜찮아요? / 사진 찍어도 좋아요?' },
      { type: 'usage', text: '되다/괜찮다/좋다 语感差异', textEn: 'Nuance differences between 되다/괜찮다/좋다', examples: '돼요（中性"可以"）/ 괜찮아요（"没问题"的语感）/ 좋아요（口语"好的可以"）', examplesEn: '돼요 (neutral "can") / 괜찮아요 (feels like "no problem") / 좋아요 (colloquial "sure, okay")' },
      { type: 'usage', text: '-아/어도 안 되다：让步否定，"即使……也不行"', textEn: '-아/어도 안 되다: concessive negative, "even if... it\'s not allowed"', examples: '여기서 먹어도 안 돼요（即使在这里吃也不行）；禁止说法用 먹으면 안 돼요（不可以吃）', examplesEn: '여기서 먹어도 안 돼요 (not allowed even if you eat here); prohibition uses 먹으면 안 돼요 (can\'t eat)' },
      { type: 'usage', text: '-(이)라도：退而求其次，"哪怕……也行"', textEn: '-(이)라도: settling for less, "even... will do"', examples: '커피라도 마실까요? / 이거라도 먹어요' },
      { type: 'note', text: '-아도 돼요? 的回答：돼요（可以）/ 안 돼요（不可以）', textEn: 'Answer to -아도 돼요?: 돼요 (yes, can) / 안 돼요 (no, can\'t)', examples: '사진 찍어도 돼요? — 네, 돼요! / 아니요, 안 돼요.' },
      { type: 'example', text: '비가 와도 괜찮아요 / 여기 앉아도 돼요? / 물이라도 드릴까요?' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '비가', role: 'subject' }, { text: '와도', role: 'plain' }, { text: '갈 거예요', role: 'verb' }], zh: '即使下雨也要去。', zhEn: 'Even if it rains, I\'ll go.', swapRole: 'plain', swapWords: ['와도', '늦어도', '힘들어도'] },
      { wordBlocks: [{ text: '여기', role: 'place' }, { text: '앉아도 돼요?', role: 'verb' }], zh: '可以坐这里吗？', zhEn: 'Can I sit here?', swapRole: 'place', swapWords: ['여기', '저기', '이 자리에'] },
      { wordBlocks: [{ text: '물이라도', role: 'object' }, { text: '마실래요?', role: 'verb' }], zh: '喝点水也好？', zhEn: 'How about some water?', swapRole: 'object', swapWords: ['물이라도', '커피라도', '차라도'] },
      { wordBlocks: [{ text: '늦어도', role: 'plain' }, { text: '괜찮아요', role: 'verb' }], zh: '即使迟到也没关系。', zhEn: 'It\'s okay even if you\'re late.', swapRole: 'plain', swapWords: ['늦어도', '어려워도', '힘들어도'] },
    ],
    scenarios: [
      { icon: '📸', context: '拍照前请求许可', contextEn: 'Asking permission before taking a photo', ko: '이 곳에서 사진 찍어도 돼요?', zh: '在这里可以拍照吗？', zhEn: 'Can I take photos here?' },
      { icon: '🌧️', context: '表达坚定意志', contextEn: 'Expressing firm determination', ko: '비가 와도 콘서트에 갈 거예요! 절대 못 빠져요.', zh: '即使下雨也要去演唱会！绝对不会缺席。', zhEn: 'Even if it rains, I\'m going to the concert! I won\'t miss it for anything.' },
      { icon: '☕', context: '招待客人', contextEn: 'Hosting a guest', ko: '차라도 한 잔 드릴까요? 잠깐 기다려 주세요.', zh: '要喝杯茶吗？请稍等一下。', zhEn: 'Would you like some tea? Just a moment.' },
      { icon: '💺', context: '地铁或餐厅', contextEn: 'Subway or restaurant', ko: '여기 앉아도 돼요? 옆에 아무도 없어요?', zh: '可以坐这里吗？旁边没有人吧？', zhEn: 'Can I sit here? No one\'s next to me, right?' },
      { icon: '😤', context: '表达坚持', contextEn: 'Expressing persistence', ko: '힘들어도 포기하지 않을 거예요.', zh: '即使辛苦也不会放弃。', zhEn: 'Even if it\'s hard, I won\'t give up.' },
      { icon: '🍕', context: '将就一下', contextEn: 'Make do with it.', ko: '밥이 없으면 빵이라도 먹을까요?', zh: '如果没有饭，吃点面包也行吗？', zhEn: 'If there\'s no rice, is it okay to just have some bread?' },
    ],
    mistakes: [
      { wrong: '먹도 돼요?', correct: '먹어도 돼요?', note: '需要先完成 -아/어 变形，再加 도 되다，不能直接加 도。', noteEn: 'You need to first conjugate with -아/어, then add 도 되다; you can\'t just add 도 directly.' },
      { wrong: '물라도', correct: '물이라도', note: '물 有收音 ㄹ，所以用 이라도，不是直接加 라도。', noteEn: '물 has the final consonant ㄹ, so use 이라도, not just 라도.' },
      { wrong: '피곤해서 운동해요', correct: '피곤해도 운동해요', note: '-아서 表示原因，不能用于让步。"即使累也运动"要用 -아도，不是 -아서。', noteEn: '-아서 indicates cause, not concession. For \'even if tired, exercise,\' use -아도, not -아서.' },
      { wrong: '사진 찍어도 돼요 안 돼요?', correct: '사진 찍어도 돼요? — 네, 돼요 / 안 돼요', note: '请求许可是疑问句，回答是分开的 돼요 或 안 돼요，不能连在一个句子里问。', noteEn: 'Asking permission is a question; the answer is a separate 돼요 or 안 돼요, not combined in one sentence.' },
    ],
    linkedGrammarIds: ['g32', 'g68'],
  },
  {
    id: 'card-p8-l07', partNumber: 8, lessonNumber: 7, title: '-(으)면 안 되다, -(으)면 되다',
    whatItDoes: '表示"不可以做"和"只要做……就行"', whatItDoesEn: 'Expressing "can\'t do" and "just do... and it\'s fine"',
    whatItDoesBody: '-(으)면 안 되다 表示禁止"不可以……"，比 -지 말다 更正式，强调如果做了就不行。\n-(으)면 되다 表示"只要……就可以了""做……就行"，说明满足条件就够了。\n和中文"不可以……""只要……就行"对应，是规则说明和简单指引的核心句型。', whatItDoesBodyEn: '-(으)면 안 되다 means "can\'t..." and is more formal than -지 말다, emphasizing that doing it is not allowed.\\n-(으)면 되다 means "just do... and it\'s fine" or "all you need to do is...", indicating that meeting the condition is sufficient.\\nThese correspond to Chinese "不可以……" and "只要……就行," and are core patterns for explaining rules and giving simple instructions.',
    structureNote: '下面展示两种规则/条件表达的句型框架。\n注意两者都以 -(으)면 开头，但后接 안 되다 是禁止，接 되다 是充分条件。', structureNoteEn: 'Below are the sentence patterns for two types of rule/condition expressions.\\nNote that both start with -(으)면, but followed by 안 되다 it means prohibition, while followed by 되다 it indicates a sufficient condition.',
    rulesNote: '-(으)면 안 되다：词干有收音 + 으면 안 돼요，无收音 + 면 안 돼요。\n-(으)면 되다：词干有收音 + 으면 돼요，无收音 + 면 돼요。\nㄹ 词干：ㄹ 脱落，直接 + 면（알다→알면 안 돼요 / 알면 돼요）。', rulesNoteEn: '-(으)면 안 되다: If the stem ends in a consonant, add 으면 안 돼요; if it ends in a vowel, add 면 안 돼요.\\n-(으)면 되다: If the stem ends in a consonant, add 으면 돼요; if it ends in a vowel, add 면 돼요.\\nㄹ stems: Drop ㄹ and add 면 directly (알다→알면 안 돼요 / 알면 돼요).',
    scenarioNote: '场所规则、操作说明、解答疑惑时最常用。\n"这里不可以拍照""按这个按钮就行了"这类提示和指引全靠这两个句型。', scenarioNoteEn: 'These are most commonly used for place rules, operating instructions, and answering questions.\\nPhrases like "No photos here" and "Just press this button" rely entirely on these two patterns.',
    step0Html: `<div class="card-title">-(으)면 안 돼요 · -(으)면 돼요</div>
<div class="card-body">-(으)면 안 돼요 说"不可以做"，-(으)면 돼요 说"做这个就行了"。规则说明和操作指引必备。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">一词之差，意思相反</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-(으)면 안 돼요（禁止）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">여기서 담배를 피우면 안 돼요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">这里不可以抽烟。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-(으)면 돼요（充分条件）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">이 버튼을 누르면 돼요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">按这个按钮就行了。</div>
    </div>
  </div>
</div>
<div class="reminder-box">가면 안 돼요 = "不可以去"，不是"必须去"。必须去 = 가야 해요。两者意思完全相反，别搞混。</div>`,
    compareHtml: `<div class="card-title">-(으)면 안 되다 vs -(으)면 되다 vs -지 말다</div>
<div class="card-body">三种"禁止/许可/充分条件"的表达，用错了含义完全不同。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)면 안 되다 → 条件性禁止</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"如果做了就不行"，强调条件</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">여기서 먹으면 안 돼요.</span><span style="font-size:16px;color:#5a4640">这里不可以吃。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">늦으면 안 되니까 빨리 가요.</span><span style="font-size:16px;color:#5a4640">不可以迟到，快走吧。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)면 되다 → 充分条件（做这个就够了）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">"满足这个条件就可以了"，降低门槛</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">이름만 쓰면 돼요.</span><span style="font-size:16px;color:#5a4640">只写名字就行了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">버스 타면 돼요.</span><span style="font-size:16px;color:#5a4640">坐公交就行了。</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">-지 말다 → 直接命令禁止</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">更直接的禁止，命令语气</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹지 마세요.</span><span style="font-size:16px;color:#5a4640">请不要吃。</span></div>
  </div>
</div>
<div class="reminder-box">먹면 돼요 ✗ → 먹으면 돼요 ✓（먹 有收音 ㄱ，加 으）。늦면 안 돼요 ✗ → 늦으면 안 돼요 ✓（늦 有收音 ㅈ，加 으）。</div>`,    specialQuiz: {
      type: 'judge',
      title: '判断对错：-(으)면 안 되다 和 -(으)면 되다', titleEn: 'True or false: -(으)면 안 되다 and -(으)면 되다',
      body: '选出使用正确的句子。', bodyEn: 'Choose the sentence that uses it correctly.',
      questions: [
        { options: ["여기서 담배를 피우면 안 돼요","여기서 담배를 피우면 되지 않아요"], answer: 0, explanation: '-(으)면 안 되다 = "不可以……"：这里不可以抽烟。되지 않아요 是其他含义。', explanationEn: '-(으)면 안 되다 = \'must not...\': You can\'t smoke here. 되지 않아요 has a different meaning.' },
        { options: ["지금 가면 돼요","지금 가기면 돼요"], answer: 0, explanation: '-(으)면 되다 接动词词干：가다 → 가면 돼요。가기면 是错误形式，-기 和 -면 不能叠用。', explanationEn: '-(으)면 되다 attaches to verb stems: 가다 → 가면 돼요. 가기면 is wrong; -기 and -면 can\'t be stacked.' },
        { options: ["내일까지 내면 돼요","내일까지 내기면 돼요"], answer: 0, explanation: '내다 + 면 → 내면 돼요（交就行）。내기면 是错误形式，-기 和 -면 不能叠用。', explanationEn: '내다 + 면 → 내면 돼요 (just pay). 내기면 is wrong; -기 and -면 can\'t be stacked.' },
        { options: ["시험에서 컨닝하면 안 돼요","시험에서 컨닝하면 돼요"], answer: 0, explanation: '-(으)면 안 되다 = 禁止："考试不可以作弊。"', explanationEn: '-(으)면 안 되다 = prohibition: \'You must not cheat on the exam.\'' },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 8 章 第 7 课 · 已完成</div>
    <div class="ov-hero-title">-(으)면 안 돼요 · -(으)면 돼요</div>
    <div class="ov-hero-sub">条件性禁止 · 充分条件 · 规则指引</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">变形规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">无收音+면</span>：가면 안 돼요 / 가면 돼요</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">有收音+으면</span>：먹으면 안 돼요 / 앉으면 돼요</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#6b7ff0">ㄹ词干脱落</span>：알면 안 돼요 / 만들면 돼요</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">여기서 담배를 피우면 안 돼요</span></div><div class="struct-zh">这里不可以抽烟。</div></div>
        <div><div class="tok-row"><span class="tok t-v">이 버튼을 누르면 돼요</span></div><div class="struct-zh">按这个按钮就行了。</div></div>
        <div><div class="tok-row"><span class="tok t-v">이름만 쓰면 돼요</span></div><div class="struct-zh">只写名字就行了。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가면 안 돼요（想表示"必须去"）</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">가야 해요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">늦면 안 돼요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">늦으면 안 돼요</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '여기서 담배를 피우면 안 돼요', zh: '这里不可以抽烟。', zhEn: 'You can\'t smoke here.', tokens: [{ text: '여기서', role: 'place' }, { text: '담배를', role: 'object' }, { text: '피우면 안 돼요', role: 'verb' }] },
      { ko: '이 버튼을 누르면 돼요', zh: '按这个按钮就行了。', zhEn: 'Just press this button.', tokens: [{ text: '이 버튼을', role: 'object' }, { text: '누르면 돼요', role: 'verb' }] },
      { ko: '늦으면 안 되니까 빨리 가요', zh: '不可以迟到，所以快走吧。', zhEn: 'You can\'t be late, so let\'s hurry.', tokens: [{ text: '늦으면 안 되니까', role: 'plain' }, { text: '빨리', role: 'plain' }, { text: '가요', role: 'verb' }] },
      { ko: '이 양식을 작성하면 돼요', zh: '填这张表格就行了。', zhEn: 'Just fill out this form.', tokens: [{ text: '이 양식을', role: 'object' }, { text: '작성하면 돼요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '词干 无收音 + 면 안 돼요 / 면 돼요', textEn: 'Stem without final consonant + 면 안 돼요 / 면 돼요', examples: '가다→가면 안 돼요 / 하다→하면 돼요 / 쓰다→쓰면 안 돼요' },
      { type: 'rule', text: '词干 有收音 + 으면 안 돼요 / 으면 돼요', textEn: 'Stem with final consonant + 으면 안 돼요 / 으면 돼요', examples: '먹다→먹으면 안 돼요 / 앉다→앉으면 돼요 / 읽다→읽으면 돼요' },
      { type: 'compare', text: '-(으)면 안 되다 vs -지 말다', examples: '-(으)면 안 돼요：条件性禁止（如果做了就不行）/ -지 말아요：直接命令禁止', examplesEn: '-(으)면 안 돼요: conditional prohibition (if you do it, it\'s not okay) / -지 말아요: direct command prohibition' },
      { type: 'usage', text: '-(으)면 돼요 用于说明达到目标的充分条件', textEn: '-(으)면 돼요 is used to state the sufficient condition for achieving a goal.', examples: '여기에 이름만 쓰면 돼요 / 버스 타면 돼요 / 내일까지 내면 돼요' },
      { type: 'note', text: '-(으)면 안 되다 的口语缩写', textEn: 'Colloquial abbreviation of -(으)면 안 되다', examples: '면 안 돼요 → 말아요（命令）/ 둘 다 표준어', examplesEn: '면 안 돼요 → 말아요 (command) / both are standard' },
      { type: 'vocab', text: '常见禁止场景用语', textEn: 'Common phrases for prohibition scenarios', examples: '사진 찍으면 안 돼요 / 만지면 안 돼요 / 떠들면 안 돼요' },
      { type: 'example', text: '여기서 먹으면 안 돼요 / 이것만 하면 돼요 / 늦으면 안 되니까 서둘러요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '여기서', role: 'place' }, { text: '담배를', role: 'object' }, { text: '피우면 안 돼요', role: 'verb' }], zh: '这里不可以抽烟。', zhEn: 'You can\'t smoke here.', swapRole: 'verb', swapWords: ['피우면 안 돼요', '먹으면 안 돼요', '떠들면 안 돼요'] },
      { wordBlocks: [{ text: '이 버튼을', role: 'object' }, { text: '누르면 돼요', role: 'verb' }], zh: '按这个按钮就行了。', zhEn: 'Just press this button.', swapRole: 'object', swapWords: ['이 버튼을', '이 링크를', '이 양식을'] },
      { wordBlocks: [{ text: '늦으면 안 되니까', role: 'plain' }, { text: '빨리', role: 'plain' }, { text: '가요', role: 'verb' }], zh: '不可以迟到，所以快走吧。', zhEn: 'You can\'t be late, so let\'s hurry.', swapRole: 'plain', swapWords: ['늦으면 안 되니까', '포기하면 안 되니까', '잊으면 안 되니까'] },
      { wordBlocks: [{ text: '이름만', role: 'object' }, { text: '쓰면 돼요', role: 'verb' }], zh: '只写名字就行了。', zhEn: 'Just write your name.', swapRole: 'object', swapWords: ['이름만', '여기만', '이것만'] },
    ],
    scenarios: [
      { icon: '🚭', context: '告知禁止事项', contextEn: 'Informing about prohibitions', ko: '여기서 담배 피우면 안 돼요. 흡연구역에서만 피우세요.', zh: '这里不可以抽烟。请在吸烟区抽烟。', zhEn: 'You can\'t smoke here. Please smoke in the smoking area.' },
      { icon: '📋', context: '说明办理流程', contextEn: 'Explain the process', ko: '이 서류 작성하고 제출하면 돼요. 어렵지 않아요.', zh: '填写这份文件提交就行了，不难的。', zhEn: 'Just fill out this form and submit it—it\'s not hard.' },
      { icon: '⏰', context: '强调不能迟到', contextEn: 'Emphasizing that you can\'t be late', ko: '내일 회의에 늦으면 안 돼요. 10시까지 와야 해요.', zh: '明天的会议不可以迟到，要在10点前来。', zhEn: 'You can\'t be late for tomorrow\'s meeting—come before 10 o\'clock.' },
      { icon: '📱', context: '教人用手机', contextEn: 'Teaching someone how to use a phone', ko: '여기 누르면 돼요. 간단하죠?', zh: '按这里就行了，简单吧？', zhEn: 'Just press here—simple, right?' },
      { icon: '🤫', context: '图书馆规则', contextEn: 'Library rules', ko: '여기서 전화하면 안 돼요. 밖에서 받으세요.', zh: '这里不可以打电话，请去外面接。', zhEn: 'You can\'t make phone calls here—please take them outside.' },
      { icon: '✅', context: '简单解释条件', contextEn: 'Simply explaining conditions', ko: '이 쿠폰만 보여 주면 돼요. 따로 준비 안 해도 돼요.', zh: '只要出示这张优惠券就行了，不需要另外准备。', zhEn: 'Just show this coupon—no need to prepare anything else.' },
    ],
    mistakes: [
      { wrong: '가면 안 돼요→想表示"必须去"', wrongEn: '가면 안 돼요→To say "must go"', correct: '가야 해요 / 가야 돼요', note: '가면 안 돼요 是"不可以去"，"必须去"要用 가야 해요。别搞反了。', noteEn: '가면 안 돼요 means "can\'t go"; for "must go," use 가야 해요. Don\'t mix them up.' },
      { wrong: '먹면 돼요', correct: '먹으면 돼요', note: '먹 有收音 ㄱ，必须加 으 → 먹으면 돼요。', noteEn: '먹 has the final consonant ㄱ, so you must add 으 → 먹으면 돼요.' },
      { wrong: '이것 하면 됩니다 안 됩니다', correct: '이것 하면 돼요 / 하면 안 돼요', note: '充分条件（돼요）和禁止（안 돼요）是相反的两种表达，不能在同一句里同时说。', noteEn: 'Sufficient condition (돼요) and prohibition (안 돼요) are opposite expressions—you can\'t use both in the same sentence.' },
      { wrong: '늦면 안 돼요', correct: '늦으면 안 돼요', note: '늦다 有收音 ㅈ，必须加 으 → 늦으면 안 돼요。', noteEn: '늦다 has the final consonant ㅈ, so you must add 으 → 늦으면 안 돼요.' },
    ],
    linkedGrammarIds: ['g68'],
  },
  {
    id: 'card-p8-l08', partNumber: 8, lessonNumber: 8, isPractice: true, title: '综合练习⑧', titleEn: 'Comprehensive Practice ⑧',
    whatItDoes: '综合复习第八章：回忆、意志、经历与许可', whatItDoesEn: 'Comprehensive review of Chapter 8: Memories, intentions, experiences, and permission',
    whatItDoesBody: '本章围绕"说话人的内心世界"展开：如何回忆过去的习惯与状态（-던/-았던），如何表达自己的决心与必要（-아야겠다），如何描述险些发生的事或夸张的感受（-을 뻔하다/-아서 죽을 것 같다），如何谈论别人的愿望和自己的经历（-고 싶어하다/-은 적이 있다），以及在各种让步与许可场景中如何措辞（-아도/-아도 되다/-(으)면 안 되다/-(으)면 되다）。中文里这些表达往往靠语气词和语境区分，韩语则通过专用语法形式精确传达说话人的立场和态度。', whatItDoesBodyEn: 'This chapter revolves around "the speaker\'s inner world": how to recall past habits and states (-던/-았던), how to express determination and necessity (-아야겠다), how to describe near-misses or exaggerated feelings (-을 뻔하다/-아서 죽을 것 같다), how to talk about others\' wishes and one\'s own experiences (-고 싶어하다/-은 적이 있다), and how to phrase various concession and permission scenarios (-아도/-아도 되다/-(으)면 안 되다/-(으)면 되다). In Chinese, these expressions are often distinguished by particles and context, while Korean uses dedicated grammatical forms to precisely convey the speaker\'s stance and attitude.',
    structureNote: '第八章七个语法点的核心要点：\n① -던：修饰"过去反复发生但现在已不做"的行为；-았/었던 强调已完成的过去状态，带有回忆色彩\n② -아/어야(만) 하다 / -아야겠다：前者说"必须做"（外部要求），后者说"我决定要做"（内心决心）\n③ -을/ㄹ 뻔하다：险些发生但没发生；-아서 죽을 것 같다：夸张表达极限感受\n④ -고 싶어하다：描述第三人称的愿望（不能用 -고 싶다）；-뿐만 아니라：不仅……而且……\n⑤ -아/어 보다：尝试做某事；-은/ㄴ 적이 있다/없다：有/没有过某种经历\n⑥ -아/어도：即使……也……（让步）；-(이)라도：哪怕……也……（退而求其次）；-아/어도 되다：允许做某事\n⑦ -(으)면 안 되다：禁止/不可以；-(으)면 되다：只要……就可以（最低条件）', structureNoteEn: 'Key points of the seven grammar points in Chapter 8:\\n① -던: Modifies actions that "repeated in the past but are no longer done"; -았/었던 emphasizes a completed past state with a nostalgic tone\\n② -아/어야(만) 하다 / -아야겠다: The former means "must do" (external requirement), the latter means "I\'ve decided to do" (inner resolve)\\n③ -을/ㄹ 뻔하다: Almost happened but didn\'t; -아서 죽을 것 같다: Exaggerated expression of extreme feelings\\n④ -고 싶어하다: Describes a third person\'s wish (cannot use -고 싶다); -뿐만 아니라: Not only... but also...\\n⑤ -아/어 보다: Try doing something; -은/ㄴ 적이 있다/없다: Have/haven\'t had a certain experience\\n⑥ -아/어도: Even if... (concession); -(이)라도: Even if it\'s just... (settling for less); -아/어도 되다: Permission to do something\\n⑦ -(으)면 안 되다: Prohibition/can\'t; -(으)면 되다: Just do... and it\'s fine (minimum condition)',
    structures: [
      { ko: '자주 가던 카페가 없어졌어요', zh: '以前常去的咖啡店消失了。', zhEn: 'The coffee shop I used to go to is gone.', tokens: [{ text: '자주', role: 'plain' }, { text: '가던', role: 'plain' }, { text: '카페가', role: 'subject' }, { text: '없어졌어요', role: 'verb' }] },
      { ko: '이제 운동을 시작해야겠어요', zh: '我得开始运动了。', zhEn: 'I have to start exercising.', tokens: [{ text: '이제', role: 'time' }, { text: '운동을', role: 'object' }, { text: '시작해야겠어요', role: 'verb' }] },
      { ko: '넘어질 뻔했어요', zh: '差点摔倒了。', zhEn: 'I almost fell.', tokens: [{ text: '넘어질', role: 'plain' }, { text: '뻔했어요', role: 'verb' }] },
      { ko: '친구가 한국에 가고 싶어해요', zh: '朋友想去韩国。', zhEn: 'My friend wants to go to Korea.', tokens: [{ text: '친구가', role: 'subject' }, { text: '한국에', role: 'place' }, { text: '가고 싶어해요', role: 'verb' }] },
      { ko: '한국에 간 적이 있어요', zh: '我去过韩国。', zhEn: 'I\'ve been to Korea.', tokens: [{ text: '한국에', role: 'place' }, { text: '간 적이 있어요', role: 'verb' }] },
      { ko: '여기 앉아도 돼요?', zh: '可以坐这里吗？', zhEn: 'Can I sit here?', tokens: [{ text: '여기', role: 'place' }, { text: '앉아도 돼요?', role: 'verb' }] },
      { ko: '여기서 담배 피우면 안 돼요', zh: '这里不可以抽烟。', zhEn: 'You can\'t smoke here.', tokens: [{ text: '여기서', role: 'place' }, { text: '담배', role: 'object' }, { text: '피우면 안 돼요', role: 'verb' }] },
      { ko: '이 양식을 작성하면 돼요', zh: '填这张表格就行了。', zhEn: 'Just fill out this form.', tokens: [{ text: '이 양식을', role: 'object' }, { text: '작성하면 돼요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '-던：过去反复/持续，现在已不同；-았/었던：已完成的过去经历', textEn: '-던: past repetition/continuation, now different; -았/었던: completed past experience', examples: '자주 가던 카페 / 한 번 갔던 카페' },
      { type: 'rule', text: '-아/어야겠다：说话人内心的决心；-아/어야 하다：外部规则要求', textEn: '-아/어야겠다: the speaker\'s inner resolve; -아/어야 하다: external rule or requirement', examples: '운동해야겠어요（我得运动了） / 9시까지 와야 해요（必须9点到）', examplesEn: '운동해야겠어요 (I need to exercise) / 9시까지 와야 해요 (I must arrive by 9)' },
      { type: 'rule', text: '-을/ㄹ 뻔하다：险些发生但没发生（用过去时 뻔했어요）', textEn: '-을/ㄹ 뻔하다: almost happened but didn\'t (use past tense 뻔했어요)', examples: '넘어질 뻔했어요 / 잊을 뻔했어요' },
      { type: 'rule', text: '-아/어서 죽을 것 같다：夸张极度程度', textEn: '-아/어서 죽을 것 같다: exaggerating an extreme degree', examples: '배고파서 죽을 것 같아요 / 더워서 죽을 것 같아요' },
      { type: 'rule', text: '-고 싶어하다 用于第三人称，第一人称用 -고 싶다', textEn: '-고 싶어하다 is for third person; first person uses -고 싶다', examples: '저는 가고 싶어요 / 친구가 가고 싶어해요' },
      { type: 'rule', text: '名词 + 뿐만 아니라 → 不仅……而且……（后句常用 도 呼应）', textEn: 'Noun + 뿐만 아니라 → not only... but also... (often paired with 도 in the following clause)', examples: '노래뿐만 아니라 춤도 잘해요（不仅歌唱得好，舞也跳得好。）', examplesEn: '노래뿐만 아니라 춤도 잘해요 (Not only does she sing well, she dances well too.)' },
      { type: 'rule', text: '-아/어 보다 尝试；-은/ㄴ 적이 있다/없다 经历有无', textEn: '-아/어 보다: to try; -은/ㄴ 적이 있다/없다: whether one has experience', examples: '먹어 봤어요 / 간 적이 있어요' },
      { type: 'rule', text: '-아/어도 让步；-(이)라도 退而求其次；-아/어도 되다 请求许可', textEn: '-아/어도: concession; -(이)라도: settling for less; -아/어도 되다: asking for permission', examples: '비가 와도 가요 / 물이라도 마실래요? / 사진 찍어도 돼요?' },
      { type: 'rule', text: '-(으)면 안 되다 禁止；-(으)면 되다 充分条件', textEn: '-(으)면 안 되다 prohibition; -(으)면 되다 sufficient condition', examples: '담배 피우면 안 돼요 / 이름만 쓰면 돼요' },
      { type: 'compare', text: '-아야겠다 vs -아야 하다 — 主观决心 vs 客观规则', textEn: '-아야겠다 vs -아야 하다 — subjective resolve vs objective rule', examples: '운동해야겠어요（我决定要运动） / 운동해야 해요（医生说必须运动）', examplesEn: '운동해야겠어요 (I\'ve decided to exercise) / 운동해야 해요 (The doctor says I must exercise)' },
      { type: 'compare', text: '-아/어 보다 vs -은/ㄴ 적이 있다 — 尝试 vs 人生经历', textEn: '-아/어 보다 vs -은/ㄴ 적이 있다 — trying vs life experience', examples: '먹어 봤어요（试过） / 먹은 적이 있어요（有过这个经历）', examplesEn: '먹어 봤어요 (tried it) / 먹은 적이 있어요 (had that experience)' },
      { type: 'compare', text: '-(으)면 안 되다 vs -아/어야 하다 — 禁止 vs 必须', textEn: '-(으)면 안 되다 vs -아/어야 하다 — prohibition vs obligation', examples: '가면 안 돼요（不可以去） / 가야 해요（必须去）', examplesEn: '가면 안 돼요 (can\'t go) / 가야 해요 (must go)' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '자주', role: 'plain' }, { text: '가던', role: 'plain' }, { text: '카페가', role: 'subject' }, { text: '없어졌어요', role: 'verb' }], zh: '以前常去的咖啡店消失了。', zhEn: 'The coffee shop I used to go to is gone.', swapRole: 'subject', swapWords: ['카페가', '식당이', '서점이'] },
      { wordBlocks: [{ text: '넘어질', role: 'plain' }, { text: '뻔했어요', role: 'verb' }], zh: '差点摔倒了。', zhEn: 'I almost fell.', swapRole: 'plain', swapWords: ['넘어질', '늦을', '잊을'] },
      { wordBlocks: [{ text: '여기', role: 'place' }, { text: '앉아도 돼요?', role: 'verb' }], zh: '可以坐这里吗？', zhEn: 'Can I sit here?', swapRole: 'verb', swapWords: ['앉아도 돼요?', '사진 찍어도 돼요?', '들어가도 돼요?'] },
      { wordBlocks: [{ text: '한국에', role: 'place' }, { text: '간 적이 있어요', role: 'verb' }], zh: '我去过韩国。', zhEn: 'I\'ve been to Korea.', swapRole: 'place', swapWords: ['한국에', '일본에', '제주도에'] },
    ],
    scenarios: [
      { icon: '☕', context: '怀念老店', contextEn: 'Missing the old shop', ko: '학생 때 자주 가던 카페가 없어져서 너무 아쉬워요.', zh: '学生时代常去的咖啡店没了，真可惜。', zhEn: 'The café I used to go to in my student days is gone. What a shame.' },
      { icon: '💪', context: '下决心', contextEn: 'Make up one\'s mind', ko: '이제부터 진짜 운동을 시작해야겠어요.', zh: '从现在起真的得开始运动了。', zhEn: 'From now on, I really need to start exercising.' },
      { icon: '😱', context: '险些出事', contextEn: 'It was a close call.', ko: '길에서 차에 치일 뻔했어요. 너무 무서웠어요.', zh: '在路上差点被车撞，太可怕了。', zhEn: 'I almost got hit by a car on the road. It was terrifying.' },
      { icon: '🍜', context: '推荐美食', contextEn: 'Food recommendation', ko: '이 라면 먹어 봤어요? 진짜 맛있어요.', zh: '你试过这个拉面吗？真的很好吃。', zhEn: 'Have you tried this ramen? It\'s really delicious.' },
      { icon: '📸', context: '请求许可', contextEn: 'Asking for permission', ko: '여기서 사진 찍어도 돼요?', zh: '在这里可以拍照吗？', zhEn: 'Can I take photos here?' },
      { icon: '🚭', context: '提示禁止', contextEn: 'Indicating prohibition', ko: '죄송하지만 여기서 담배 피우면 안 돼요.', zh: '抱歉，这里不可以抽烟。', zhEn: 'Sorry, you can\'t smoke here.' },
    ],
    mistakes: [
      { wrong: '저는 가고 싶어해요', correct: '저는 가고 싶어요', note: '-고 싶어하다 用于第三人称，说自己用 -고 싶다。', noteEn: '-고 싶어하다 is used for third person; use -고 싶다 for yourself.' },
      { wrong: '먹은 봤어요', correct: '먹어 봤어요', note: '-아/어 보다 按末元音变形选 아/어，不能用 -은。', noteEn: '-아/어 보다 changes to 아/어 based on the final vowel; -은 can\'t be used.' },
      { wrong: '진짜 넘어졌을 뻔했어요', correct: '넘어질 뻔했어요', note: '-을 뻔하다 用未来时冠词形，表示没发生。', noteEn: '-을 뻔하다 uses the future adnominal form, indicating something didn\'t happen.' },
      { wrong: '먹면 돼요', correct: '먹으면 돼요', note: '먹 有收音 ㄱ，必须加 으。', noteEn: '먹 has the final consonant ㄱ, so 으 must be added.' },
      { wrong: '피곤하느라고 못 잤어요', correct: '피곤해서 못 잤어요', note: '-느라고 只接动词，形容词用 -아/어서。', noteEn: '-느라고 only attaches to verbs; for adjectives, use -아/어서.' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '第八章综合测试', titleEn: 'Chapter 8 Comprehensive Test',
      body: '从本章七个语法点中选择正确的形式。', bodyEn: 'Choose the correct form from the seven grammar points in this chapter.',
      questions: [
        {
          pre: '어릴 때',
          post: '동네가 그리워요.',
          options: ['살은', '살았던', '사는'],
          answer: 1,
          explanation: '-았던 表示已完成、已离开的过去经历：살았던 동네。살은 是错误形（살다 是 ㄹ 词干），사는 是现在形（与"想念"矛盾）。', explanationEn: '-았던 indicates a completed, past experience: 살았던 동네. 살은 is incorrect (살다 is a ㄹ stem), and 사는 is present tense (contradicting \'miss\').',
        },
        {
          pre: '이제 운동을',
          post: '.',
          options: ['시작할 거예요', '시작해야겠어요', '시작해야 해요'],
          answer: 1,
          explanation: '-아/어야겠다 表说话人的内心决心：我得开始运动了。', explanationEn: '-아/어야겠다 expresses the speaker\'s inner resolve: I need to start exercising.',
        },
        {
          pre: '너무 배고파서',
          post: '.',
          options: ['죽을 것이에요', '죽을 것 같아요', '죽었어요'],
          answer: 1,
          explanation: '夸张程度用 -을 것 같다，不是 -을 것이다：饿得要死。', explanationEn: 'Use -을 것 같다 for exaggerated degree, not -을 것이다: starving to death.',
        },
        {
          pre: '친구가 한국에',
          post: '.',
          options: ['가고 싶어요', '가고 싶어해요', '갈래요'],
          answer: 1,
          explanation: '第三人称愿望用 -고 싶어하다：朋友想去韩国。', explanationEn: 'Use -고 싶어하다 for third-person wishes: My friend wants to go to Korea.',
        },
        {
          pre: '저는 김치를',
          post: '.',
          options: ['먹어 봤어요', '먹은 적이 없어요', '먹을 거예요'],
          answer: 1,
          explanation: '-은 적이 없다：我没吃过泡菜。', explanationEn: '-은 적이 없다: I\'ve never eaten kimchi.',
        },
        {
          pre: '여기서 담배',
          post: '?',
          options: ['피우면 안 돼요', '피우면 돼요', '피워야 해요'],
          answer: 0,
          explanation: '-(으)면 안 되다 禁止：这里不可以抽烟。', explanationEn: '-(으)면 안 되다 (prohibition): You can\'t smoke here.',
        },
      ],
    },
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 8 章 · 综合练习</div>
    <div class="ov-hero-title">综合练习⑧</div>
    <div class="ov-hero-sub">回忆 · 决心 · 经历 · 让步 · 许可</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本章核心语法</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">过去回忆</span> -던（习惯） / -았/었던（已完成）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">必要决心</span> -아야겠다（决心） / -아야 하다（规则）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#6b7ff0">差点夸张</span> -을 뻔하다 / -아서 죽을 것 같다</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#e05555">愿望递进</span> -고 싶어하다（第三人称） / -뿐만 아니라</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#c89020">经历尝试</span> -아/어 보다 / -은 적이 있다/없다</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#b49ccf">让步许可</span> -아/어도 / -(이)라도 / -아/어도 돼요?</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#e8a87c">禁止条件</span> -(으)면 안 되다 / -(으)면 되다</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">자주 가던 카페가 없어졌어요</span></div><div class="struct-zh">以前常去的咖啡店消失了。</div></div>
        <div><div class="tok-row"><span class="tok t-v">넘어질 뻔했어요</span></div><div class="struct-zh">差点摔倒了。</div></div>
        <div><div class="tok-row"><span class="tok t-v">여기 앉아도 돼요?</span></div><div class="struct-zh">可以坐这里吗？</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">高频易错</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">저는 가고 싶어해요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">저는 가고 싶어요</span></div></div>
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹면 돼요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹으면 돼요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">진짜 넘어졌을 뻔했어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">넘어질 뻔했어요</span></div></div>
    </div>
  </div>
</div>`,
  },
];
