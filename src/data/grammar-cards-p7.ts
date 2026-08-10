import type { GrammarCard } from '@/types';

export const grammarCardsP7: GrammarCard[] = [
  {
    id: 'card-p7-l01', partNumber: 7, lessonNumber: 1, title: '처럼, 같이, 같은',
    whatItDoes: '说"像……一样"的三种方式', whatItDoesEn: 'Three ways to say "like..."',
    whatItDoesBody: '처럼·같이·같은 都表示比较，但用法位置不同。\n和中文"像……一样"对应：\n처럼/같이 接在名词后用作副词，같은 接在名词前用作定语。', whatItDoesBodyEn: '처럼, 같이, and 같은 all express comparison, but their usage positions differ. \\nCorresponding to "like..." in Chinese: \\n처럼/같이 attach after a noun and are used as adverbs, while 같은 attaches before a noun and is used as a determiner.',
    structureNote: '下面展示三种比较表达的位置。\n注意 같은 后面一定还有名词，처럼/같이 后面接谓语（动词或形容词）。', structureNoteEn: 'Below shows the positions of the three comparative expressions. \\nNote that 같은 must be followed by a noun, while 처럼/같이 are followed by a predicate (verb or adjective).',
    rulesNote: '처럼 和 같이 可以互换，只是 같이 口语更常见。\n같은 是形容词，后面必须接名词。\n三个都不看收音，直接加在名词后/前。', rulesNoteEn: '처럼 and 같이 are interchangeable, but 같이 is more common in spoken Korean. \\n같은 is an adjective and must be followed by a noun. \\nAll three ignore the final consonant and attach directly after/before the noun.',
    scenarioNote: '追星、比较外貌、描述相似程度时最常用。\n中文"她跳舞跳得像专业的一样"在韩语里就靠这三个词来表达。', scenarioNoteEn: 'These are most often used when fangirling, comparing appearances, or describing degrees of similarity. \\nThe Chinese phrase "she dances like a professional" is expressed in Korean using these three words.',
    step0Html: `<div class="card-title">처럼 · 같이 · 같은</div>
<div class="card-body">三个词都表示"像……一样"，但位置不同，用法各异。掌握这三个词，比较和夸人的句子就全通了。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">아이돌처럼 춤을 춰요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">跳舞像爱豆一样。（처럼 修饰动词）</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">언니같이 노래해요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">唱歌像姐姐一样。（같이 口语版）</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">같은 노래를 들어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">听同一首歌。（같은 修饰名词）</div>
    </div>
  </div>
</div>
<div class="reminder-box">같은 后面必须跟名词；처럼/같이 后面直接跟动词——这是这三个词最关键的区别。</div>`,
    compareHtml: `<div class="card-title">처럼/같이（副词）vs 같은（定语）</div>
<div class="card-body">中文"像……一样"只有一种说法，韩语根据修饰对象分两类：修饰动词用 처럼/같이，修饰名词用 같은。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">처럼 / 같이 → 修饰动词（副词用法）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">名词 + 처럼/같이 + 动词</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">모델처럼 걸어요.</span><span style="font-size:16px;color:#5a4640">走路像模特一样。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">아이돌같이 춤춰요.</span><span style="font-size:16px;color:#5a4640">跳舞像爱豆一样。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">같은 → 修饰名词（定语用法）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">같은 + 名词</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">같은 학교예요.</span><span style="font-size:16px;color:#5a4640">是同一所学校。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">같은 노래를 들어요.</span><span style="font-size:16px;color:#5a4640">听同一首歌。</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">처럼 vs 같이</div>
  <div style="font-size:16px;color:#5a4640">两者意思相同，可以互换。처럼 书面/口语均可，같이 口语更自然。</div>
  <div style="margin-top:4px;font-size:16px;color:#5a4640">모델처럼 = 모델같이（都是"像模特一样"）</div>
</div>
<div class="reminder-box">같이 还有"一起"的意思（같이 가요 = 一起去），不要和比较用法混淆。看后面是动词还是名词来判断：같이 걸어요（一起走）vs 모델같이 걸어요（像模特一样走）。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的"像……一样"表达', titleEn: 'Choose the correct "like..." expression',
      body: '根据句意选择 처럼, 같이 或 같은。', bodyEn: 'Choose 처럼, 같이, or 같은 based on the meaning.',
      questions: [
        {
          pre: '아이돌',
          post: '춤을 춰요.',
          options: ["처럼의", "처럼", "같은"],
          answer: 1,
          explanation: 'N처럼 = "像N一样"修饰动词：跳舞像爱豆一样。처럼의 是错误形式，처럼 不能接 의。', explanationEn: 'N처럼 = "like N" modifying verbs: dance like an idol. 처럼의 is wrong; 처럼 can\'t take 의.',
        },
        {
          pre: '언니',
          post: '노래해요.',
          options: ["같은", "처럼은", "같이"],
          answer: 2,
          explanation: 'N같이 = "像N一样"口语版：唱歌像姐姐一样。', explanationEn: 'N같이 = "like N" colloquial: sing like my sister.',
        },
        {
          pre: '우리는',
          post: '옷을 입었어요.',
          options: ["같은", "같이", "처럼"],
          answer: 0,
          explanation: '같은 + 名词 = "相同的……"：我们穿了同样的衣服。같은 后必须跟名词。', explanationEn: '같은 + noun = "same...": we wore the same clothes. 같은 must be followed by a noun.',
        },
        {
          pre: '가수',
          post: '노래를 잘하고 싶어요.',
          options: ["처럼의", "처럼", "같은"],
          answer: 1,
          explanation: 'N처럼 修饰动词："想像歌手一样唱得好。"', explanationEn: 'N처럼 modifies verbs: "want to sing as well as a singer."',
        },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 7 章 第 1 课 · 已完成</div>
    <div class="ov-hero-title">처럼 · 같이 · 같은</div>
    <div class="ov-hero-sub">像……一样 · 副词比较 · 定语比较</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">三词对比</div></div>
    <div class="ov-block">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
        <div style="background:#fff0f5;border-radius:10px;padding:10px;text-align:center"><div style="font-size:16px;font-weight:800;color:#ff7fa8">처럼</div><div style="font-size:11px;color:#89756e;margin-top:2px">书面/口语均可</div></div>
        <div style="background:#eaf8f5;border-radius:10px;padding:10px;text-align:center"><div style="font-size:16px;font-weight:800;color:#2db89b">같이</div><div style="font-size:11px;color:#89756e;margin-top:2px">口语更常用</div></div>
        <div style="background:#f0f4ff;border-radius:10px;padding:10px;text-align:center"><div style="font-size:16px;font-weight:800;color:#6b7ff0">같은</div><div style="font-size:11px;color:#89756e;margin-top:2px">修饰名词</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">모델처럼 걸어요</span></div><div class="struct-zh">走路像模特一样。</div></div>
        <div><div class="tok-row"><span class="tok t-v">아이돌같이 춤춰요</span></div><div class="struct-zh">跳舞像爱豆一样。</div></div>
        <div><div class="tok-row"><span class="tok t-v">같은 노래를 들어요</span></div><div class="struct-zh">听同一首歌。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">모델같은 걸어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">모델처럼 걸어요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">같이 학교예요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">같은 학교예요</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '모델처럼 걸어요', zh: '走路像模特一样。', zhEn: 'Walk like a model.', tokens: [{ text: '모델처럼', role: 'plain' }, { text: '걸어요', role: 'verb' }] },
      { ko: '언니같이 노래해요', zh: '唱歌像姐姐一样。', zhEn: 'Sing like an older sister.', tokens: [{ text: '언니같이', role: 'plain' }, { text: '노래해요', role: 'verb' }] },
      { ko: '같은 노래를 들어요', zh: '听同一首歌。', zhEn: 'Listen to the same song.', tokens: [{ text: '같은', role: 'plain' }, { text: '노래를', role: 'object' }, { text: '들어요', role: 'verb' }] },
      { ko: '아이돌처럼 춤을 춰요', zh: '跳舞跳得像爱豆一样。', zhEn: 'Dance like an idol.', tokens: [{ text: '아이돌처럼', role: 'plain' }, { text: '춤을', role: 'object' }, { text: '춰요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + 처럼 → 像……一样（书面/口语均可）', textEn: 'Noun + 처럼 → like... (both written and spoken)', examples: '모델처럼 / 친구처럼 / 한국 사람처럼' },
      { type: 'rule', text: '名词 + 같이 → 像……一样（口语更常用）', textEn: 'Noun + 같이 → like... (more common in spoken)', examples: '아이돌같이 / 언니같이 / 배우같이' },
      { type: 'rule', text: '같은 + 名词 → 相同的……/ 同一个……', textEn: '같은 + Noun → the same... / the same one...', examples: '같은 학교 / 같은 노래 / 같은 생각' },
      { type: 'note', text: '처럼 和 같이 可以互换，意思相同', textEn: '처럼 and 같이 are interchangeable with the same meaning.', examples: '모델처럼 = 모델같이（都是"像模特一样"）', examplesEn: '모델처럼 = 모델같이 (both mean "like a model")' },
      { type: 'compare', text: '처럼/같이 vs 같은', examples: '처럼/같이 是副词（修饰动词）/ 같은 是定语（修饰名词）', examplesEn: '처럼/같이 are adverbs (modify verbs) / 같은 is a determiner (modifies nouns)' },
      { type: 'vocab', text: '常见搭配场景', textEn: 'Common usage scenarios', examples: '춤이 아이돌같이 예뻐요 / 같은 꿈을 꿔요 / 선생님처럼 설명해요' },
      { type: 'example', text: '모델처럼 걸어요 / 친구같이 편해요 / 같은 반이에요' },
      { type: 'note', text: '中文一个"一样"其实藏了两层意思，韩语分得很清：表"相似/像……一样"用 처럼/같이；表"相同/同一个"用 같은。别把"想法一样、喜好一样"这种"相同"误说成 처럼。', textEn: 'The Chinese word "一样" actually has two meanings, and Korean distinguishes them clearly: use 처럼/같이 for "similar/like..." and 같은 for "the same/identical." Don\'t mistakenly use 처럼 for "same" as in "same thoughts" or "same preferences."', examples: '相似→친구처럼 놀아요（像朋友一样玩）/ 相同→같은 생각이에요（想法相同）', examplesEn: 'Similar → 친구처럼 놀아요 (play like a friend) / Same → 같은 생각이에요 (same thoughts)' },
      { type: 'note', text: '같은 是形容词 같다 的定语形，只能放名词前。想把"一样/相同"放到句尾当谓语，要用 N와/과 같다（后面章节详学）。', textEn: '같은 is the attributive form of the adjective 같다, and can only be placed before a noun. To put "same" at the end of a sentence as a predicate, use N와/과 같다 (covered in detail in a later chapter).', examples: '가격이 같아요（价格一样）/ 우리는 생각이 같아요（我们想法一样）', examplesEn: '가격이 같아요 (the price is the same) / 우리는 생각이 같아요 (we have the same thoughts)' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '모델처럼', role: 'plain' }, { text: '걸어요', role: 'verb' }], zh: '走路像模特一样。', zhEn: 'Walk like a model.', swapRole: 'plain', swapWords: ['모델처럼', '배우처럼', '언니처럼'] },
      { wordBlocks: [{ text: '아이돌같이', role: 'plain' }, { text: '춤을', role: 'object' }, { text: '춰요', role: 'verb' }], zh: '跳舞像爱豆一样。', zhEn: 'Dance like an idol.', swapRole: 'plain', swapWords: ['아이돌같이', '친구같이', '전문가같이'] },
      { wordBlocks: [{ text: '같은', role: 'plain' }, { text: '학교예요', role: 'verb' }], zh: '是同一所学校。', zhEn: 'It\'s the same school.', swapRole: 'plain', swapWords: ['같은 학교예요', '같은 반이에요', '같은 팀이에요'] },
      { wordBlocks: [{ text: '한국 사람처럼', role: 'plain' }, { text: '한국어를', role: 'object' }, { text: '해요', role: 'verb' }], zh: '说韩语像韩国人一样。', zhEn: 'Speak Korean like a Korean person.', swapRole: 'plain', swapWords: ['한국 사람처럼', '원어민처럼', '선생님처럼'] },
    ],
    scenarios: [
      { icon: '🎤', context: '夸朋友跳舞好', contextEn: 'Complimenting a friend\'s dancing', ko: '너 아이돌같이 춤춰! 진짜 잘한다.', zh: '你跳舞像爱豆一样！真的很厉害。', zhEn: 'You dance like an idol! You\'re really amazing.' },
      { icon: '🇰🇷', context: '夸韩语说得好', contextEn: 'Complimenting Korean skills', ko: '한국 사람처럼 한국어를 해요. 대단해요!', zh: '韩语说得像韩国人一样，太厉害了！', zhEn: 'You speak Korean like a Korean person, that\'s amazing!' },
      { icon: '👯', context: '同班同学相认', contextEn: 'Recognizing a classmate', ko: '저희 같은 반이에요? 반가워요!', zh: '我们是同一班的吗？很高兴认识！', zhEn: 'Are we in the same class? Nice to meet you!' },
      { icon: '☕', context: '描述口味相似', contextEn: 'Describing similar tastes', ko: '저는 언니같이 커피를 좋아해요.', zh: '我和姐姐一样喜欢咖啡。', zhEn: 'I like coffee just like my sister.' },
      { icon: '🎵', context: '发现共同喜好', contextEn: 'Discovering a Shared Interest', ko: '같은 노래 듣고 있었어요? 저도요!', zh: '你也在听同一首歌？我也是！', zhEn: 'You\'re listening to the same song too? Me too!' },
      { icon: '💬', context: '描述说话方式', contextEn: 'Describing How Someone Speaks', ko: '선생님처럼 설명해 줬어요. 이해가 잘 됐어요.', zh: '给我解释得像老师一样，理解得很好。', zhEn: 'Explain it to me like a teacher—I understood it well.' },
    ],
    mistakes: [
      { wrong: '모델같은 걸어요', correct: '모델처럼 걸어요', note: '같은 是定语，后面必须接名词。修饰动词要用 처럼 或 같이。', noteEn: '같은 is an attributive form and must be followed by a noun. To modify a verb, use 처럼 or 같이.' },
      { wrong: '같이 학교예요', correct: '같은 학교예요', note: '表示"同一个……"修饰名词时用 같은，不是 같이。', noteEn: 'To say \'the same...\' before a noun, use 같은, not 같이.' },
      { wrong: '저는 같이 생각이에요', correct: '저는 같은 생각이에요', note: '생각（想法）是名词，定语用 같은。', noteEn: '생각 (thought) is a noun, so the attributive form is 같은.' },
      { wrong: '아이돌처럼 춤이 춰요', correct: '아이돌처럼 춤을 춰요', note: '춤을 춰요 是固定搭配，춤 后面用 을，不用 이。', noteEn: '춤을 춰요 is a fixed expression—use 을 after 춤, not 이.' },
    ],
    linkedGrammarIds: ['g45'],
  },
  {
    id: 'card-p7-l02', partNumber: 7, lessonNumber: 2, title: '-은/ㄴ 지 지나다/되다/흐르다, 만에, 만이다',
    whatItDoes: '说"过了多长时间"和"时隔多久"', whatItDoesEn: 'Saying "how long has it been" and "after how long"',
    whatItDoesBody: '-은/ㄴ 지 나다/되다 表示从某事发生到现在已经过了多久。\n만에 表示时隔多久之后（再次）发生某事。\n和中文"已经……了"对应，但韩语要用动词过去时连接 지。', whatItDoesBodyEn: '-은/ㄴ 지 나다/되다 indicates how long it\'s been since something happened. \\n만에 indicates that something happens (again) after a certain period of time. \\nThis corresponds to "already..." in Chinese, but Korean connects with 지 using the past tense of the verb.',
    structureNote: '下面展示三种时间经过的句型框架。\n注意 -은/ㄴ 지 의 连接：动词词干 + 은/ㄴ 지 + 时间 + 됐어요/났어요。', structureNoteEn: 'Below are three sentence patterns for expressing the passage of time. \\nNote the -은/ㄴ 지 connection: verb stem + 은/ㄴ 지 + time + 됐어요/났어요.',
    rulesNote: '-은/ㄴ 지：动词词干有收音用 -은 지，无收音用 -ㄴ 지。\n만에：时间名词直接加 만에，表示经过该时间段后发生某事。\n됐어요 比 났어요 更常用，两者可以互换。', rulesNoteEn: '-은/ㄴ 지: use -은 지 if the verb stem ends in a consonant, -ㄴ 지 if it ends in a vowel. \\n만에: attach 만에 directly to a time noun to indicate something happens after that period. \\n됐어요 is more common than 났어요, but they\'re interchangeable.',
    scenarioNote: '学了韩语多久、认识多久、多久没见等日常话题都会用到。\n中文"我们认识三年了"在韩语里结构完全不同，要用 알게 된 지 3년이 됐어요。', scenarioNoteEn: 'These are used in everyday topics like how long you\'ve studied Korean, how long you\'ve known someone, or how long it\'s been since you\'ve seen someone. \\nThe Chinese "we\'ve known each other for three years" has a completely different structure in Korean, using 알게 된 지 3년이 됐어요.',
    step0Html: `<div class="card-title">-은/ㄴ 지 됐어요 · 만에 · 만이에요</div>
<div class="card-body">三种方式表达时间的流逝——已经过了多久、时隔多久再发生。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">한국어를 배운 지 1년이 됐어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">学韩语已经一年了。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">오랜만에 친구를 만났어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">时隔好久见到了朋友。</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">졸업한 지 3년 만이에요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">毕业已经三年了。</div>
    </div>
  </div>
</div>
<div class="reminder-box">-은/ㄴ 지 用过去时冠词形（배운），不是现在时（배우는）。됐어요 和 났어요 都对，됐어요 更常用。</div>`,
    compareHtml: `<div class="card-title">-은/ㄴ 지 됐어요 vs 만에 vs 만이에요</div>
<div class="card-body">三个表达都和时间流逝有关，但语义侧重不同，不能随意互换。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-은/ㄴ 지 됐어요 → 已经过了……</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">强调持续时间，"从那时到现在"</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">배운 지 1년이 됐어요.</span><span style="font-size:16px;color:#5a4640">学了一年了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">온 지 6개월이 됐어요.</span><span style="font-size:16px;color:#5a4640">来了六个月了。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">만에 → 时隔……之后（再次发生）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">强调间隔，常有"再次"含义</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">오랜만에 만났어요.</span><span style="font-size:16px;color:#5a4640">时隔好久见面了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">3일 만에 다시 왔어요.</span><span style="font-size:16px;color:#5a4640">时隔三天又来了。</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">만이에요 → 已经……了（回顾性）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">지 + 时间 + 만이에요，带感叹语气</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">졸업한 지 3년 만이에요.</span><span style="font-size:16px;color:#5a4640">毕业已经三年了。</span></div>
  </div>
</div>
<div class="reminder-box">됐어요 前加 이（1년이 됐어요），만이에요 前不加 이（3년 만이에요）——两者结构不同，不能混用。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的时间经过表达', titleEn: 'Choose the correct expression for the passage of time',
      body: '根据句意选择 -은/ㄴ 지 或 만에。', bodyEn: 'Choose -은/ㄴ 지 or 만에 based on the meaning of the sentence.',
      questions: [
        {
          pre: '한국어를 배운',
          post: '1년 됐어요.',
          options: ['후에', '지', '만에'],
          answer: 1,
          explanation: '-은 지 + 时间 + 되다 = "做……已经……时间了"：学韩语已经一年了。', explanationEn: '-은 지 + time + 되다 = \'It\'s been... since doing...\' — e.g., I\'ve been learning Korean for a year.',
        },
        {
          pre: '3년',
          post: '고향에 돌아왔어요.',
          options: ["만에", "동안", "지"],
          answer: 0,
          explanation: '时间 + 만에 = "时隔……"：时隔三年回到故乡。', explanationEn: 'time + 만에 = \'after...\' — e.g., I returned to my hometown after three years.',
        },
        {
          pre: '밥을 먹은',
          post: '한 시간이 지났어요.',
          options: ["지", "만에", "후에"],
          answer: 0,
          explanation: '-은 지 + 时间 + 지나다："吃饭后过了一小时。"', explanationEn: '-은 지 + time + 지나다: \'An hour has passed since eating.\'',
        },
        {
          pre: '일주일',
          post: '다시 만났어요.',
          options: ['동안', '지', '만에'],
          answer: 2,
          explanation: '时间 + 만에 = 时隔一周再见。', explanationEn: 'time + 만에 = meeting again after a week.',
        },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 7 章 第 2 课 · 已完成</div>
    <div class="ov-hero-title">-은/ㄴ 지 됐어요 · 만에</div>
    <div class="ov-hero-sub">时间经过 · 时隔重逢 · 回顾感叹</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心结构</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:8px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">动词 + 은/ㄴ 지</span> + 时间 + <span style="font-weight:700;color:#ff7fa8">됐어요</span> → 已经过了……</div>
        <div style="font-size:16px;color:#241917">时间 + <span style="font-weight:700;color:#2db89b">만에</span> → 时隔……之后</div>
        <div style="font-size:16px;color:#241917">动词 + 은/ㄴ 지 + 时间 + <span style="font-weight:700;color:#6b7ff0">만이에요</span> → 已经……了</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">한국어를 배운 지 1년이 됐어요</span></div><div class="struct-zh">学韩语已经一年了。</div></div>
        <div><div class="tok-row"><span class="tok t-v">오랜만에 친구를 만났어요</span></div><div class="struct-zh">时隔好久见到了朋友。</div></div>
        <div><div class="tok-row"><span class="tok t-v">졸업한 지 3년 만이에요</span></div><div class="struct-zh">毕业已经三年了。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">배우는 지 1년이 됐어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">배운 지 1년이 됐어요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">온 지 6개월이 만이에요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">온 지 6개월이 됐어요</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '한국어를 배운 지 1년이 됐어요', zh: '学韩语已经一年了。', zhEn: 'It\'s been a year since I started learning Korean.', tokens: [{ text: '한국어를', role: 'object' }, { text: '배운 지', role: 'plain' }, { text: '1년이 됐어요', role: 'verb' }] },
      { ko: '오랜만에 친구를 만났어요', zh: '时隔好久见到了朋友。', zhEn: 'I met a friend after a long time.', tokens: [{ text: '오랜만에', role: 'time' }, { text: '친구를', role: 'object' }, { text: '만났어요', role: 'verb' }] },
      { ko: '졸업한 지 3년 만이에요', zh: '毕业已经三年了。', zhEn: 'It\'s been three years since I graduated.', tokens: [{ text: '졸업한 지', role: 'plain' }, { text: '3년 만이에요', role: 'verb' }] },
      { ko: '서울에 온 지 6개월이 됐어요', zh: '来首尔已经六个月了。', zhEn: 'It\'s been six months since I came to Seoul.', tokens: [{ text: '서울에', role: 'place' }, { text: '온 지', role: 'plain' }, { text: '6개월이 됐어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干（无收音）+ -ㄴ 지 + 时间 + 됐어요', textEn: 'Verb stem (no batchim) + -ㄴ 지 + time + 됐어요', examples: '오다→온 지 / 배우다→배운 지 / 만나다→만난 지' },
      { type: 'rule', text: '动词词干（有收音）+ -은 지 + 时间 + 됐어요', textEn: 'Verb stem (with batchim) + -은 지 + time + 됐어요', examples: '먹다→먹은 지 / 읽다→읽은 지' },
      { type: 'usage', text: '만에：时间 + 만에 → 时隔……之后', textEn: '만에: time + 만에 → after... (e.g., after a long time)', examples: '1년 만에 / 오랜만에 / 3일 만에 다시 만났어요' },
      { type: 'usage', text: '만이다：지 + 时间 + 만이에요 → 已经过了……', textEn: '만이다: 지 + time + 만이에요 → it\'s been...', examples: '졸업한 지 2년 만이에요 / 결혼한 지 5년 만이에요' },
      { type: 'note', text: '됐어요 / 났어요 / 흘렀어요 三者均可替换', textEn: '됐어요 / 났어요 / 흘렀어요 are all interchangeable.', examples: '배운 지 1년이 됐어요 = 났어요 = 흘렀어요（흐르다 常用于强调时间"流逝"的感觉）', examplesEn: '배운 지 1년이 됐어요 = 났어요 = 흘렀어요 (흐르다 is often used to emphasize the feeling of time \'flowing\').' },
      { type: 'vocab', text: '常用时间词', textEn: 'Common Time Words', examples: '얼마나 됐어요?（过了多久了？）/ 오랜만이에요（好久不见）/ 며칠 만에（时隔几天）', examplesEn: 'How long has it been? / Long time no see / After a few days' },
      { type: 'example', text: '한국어를 배운 지 얼마나 됐어요? / 오랜만에 만났어요 / 세월이 많이 흘렀어요（岁月流逝了很多）', textEn: 'How long have you been learning Korean? / We met after a long time / A lot of time has passed' },
      { type: 'compare', text: '만에 vs 후에：中文"……之后"很多人默认套 후에，但两者不一样。후에＝单纯的"之后/多久以后"（中性）；만에＝"时隔……才/又"，强调隔了这么久终于又发生。', textEn: '\'만에\' vs \'후에\': Many people default to \'후에\' for the Chinese \'after...\', but they\'re different. \'후에\' = simply \'after / how much later\' (neutral); \'만에\' = \'after a gap of... finally/again\', emphasizing that something finally happens again after such a long time.', examples: '3일 후에 다시 올게요（三天后再来）/ 3일 만에 다시 왔어요（隔了三天才又来）', examplesEn: 'I\'ll come again in three days / I came again after three days' },
      { type: 'note', text: '这里的 지 是依存名词，要和前面动词分开写（배운 지，中间有空格）。别和以后会学到的连接词尾 -는지（"是否"）搞混，那个是连写的。', textEn: 'Here, \'지\' is a dependent noun and should be written separately from the preceding verb (배운 지, with a space in between). Don\'t confuse it with the connective ending \'-는지\' (\'whether\') you\'ll learn later, which is written attached.', examples: '배운 지（学了多久，分写）≠ 배우는지（是否学，连写）', examplesEn: '\'배운 지\' (how long since learning, spaced) ≠ \'배우는지\' (whether learning, attached)' },
      { type: 'note', text: '前面接的是过去时定语形（배운 지，不是 배우는 지）：因为算的是"从动作发生那一刻起"过了多久，即使现在还在做也照样用过去形。', textEn: 'The preceding part uses the past tense adnominal form (배운 지, not 배우는 지): because it counts how long has passed \'since the action occurred\', you use the past form even if it\'s still ongoing.', examples: '한국에 산 지 3년（在韩国住了三年，现在还住着，仍用 산 지）', examplesEn: '\'한국에 산 지 3년\' (lived in Korea for 3 years, still living there, still uses 산 지)' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '한국어를', role: 'object' }, { text: '배운 지', role: 'plain' }, { text: '1년이 됐어요', role: 'verb' }], zh: '学韩语已经一年了。', zhEn: 'It\'s been a year since I started learning Korean.', swapRole: 'verb', swapWords: ['1년이 됐어요', '6개월이 됐어요', '2년이 됐어요'] },
      { wordBlocks: [{ text: '오랜만에', role: 'time' }, { text: '친구를', role: 'object' }, { text: '만났어요', role: 'verb' }], zh: '时隔好久见到了朋友。', zhEn: 'I met a friend after a long time.', swapRole: 'object', swapWords: ['친구를', '가족을', '선생님을'] },
      { wordBlocks: [{ text: '서울에', role: 'place' }, { text: '온 지', role: 'plain' }, { text: '6개월이 됐어요', role: 'verb' }], zh: '来首尔已经六个月了。', zhEn: 'It\'s been six months since I came to Seoul.', swapRole: 'place', swapWords: ['서울에', '한국에', '이 회사에'] },
      { wordBlocks: [{ text: '졸업한 지', role: 'plain' }, { text: '3년 만이에요', role: 'verb' }], zh: '毕业已经三年了。', zhEn: 'It\'s been three years since I graduated.', swapRole: 'verb', swapWords: ['3년 만이에요', '5년 만이에요', '10년 만이에요'] },
    ],
    scenarios: [
      { icon: '📚', context: '聊学韩语多久了', contextEn: 'Talking about how long you\'ve been learning Korean', ko: '한국어를 배운 지 얼마나 됐어요? 저는 1년이 됐어요.', zh: '学韩语多久了？我已经一年了。', zhEn: 'How long have you been learning Korean? It\'s been a year for me.' },
      { icon: '👋', context: '久别重逢', contextEn: 'Reunion after a long time', ko: '오랜만이에요! 만난 지 1년이 넘었죠?', zh: '好久不见！见面已经超过一年了吧？', zhEn: 'Long time no see! It\'s been over a year since we met, right?' },
      { icon: '🇰🇷', context: '来韩国多久了', contextEn: 'How long have you been in Korea', ko: '한국에 온 지 얼마나 됐어요? 6개월 됐어요.', zh: '来韩国多久了？六个月了。', zhEn: 'How long have you been in Korea? Six months.' },
      { icon: '💼', context: '在公司工作年限', contextEn: 'Years at the company', ko: '이 회사에서 일한 지 3년이 됐어요.', zh: '在这家公司工作已经三年了。', zhEn: 'I\'ve been working at this company for three years.' },
      { icon: '🎵', context: '追星多年', contextEn: 'Being a fan for years', ko: '이 아이돌을 좋아한 지 5년 만이에요.', zh: '喜欢这个爱豆已经五年了。', zhEn: 'I\'ve liked this idol for five years.' },
      { icon: '☕', context: '多久没喝咖啡', contextEn: 'How long without coffee', ko: '커피를 안 마신 지 일주일이 됐어요.', zh: '不喝咖啡已经一周了。', zhEn: 'I haven\'t had coffee for a week.' },
    ],
    mistakes: [
      { wrong: '배우는 지 1년이 됐어요', correct: '배운 지 1년이 됐어요', note: '-은/ㄴ 지 用过去时冠词形（배운），不是现在时（배우는）。', noteEn: '\'-은/ㄴ 지\' uses the past tense adnominal form (배운), not the present tense (배우는).' },
      { wrong: '오랜만에 만나요', correct: '오랜만에 만났어요', note: '오랜만에 描述时隔很久后的事件，通常用过去时，除非当下正在发生。', noteEn: '오랜만에 describes an event that happens after a long time, usually in the past tense unless it\'s happening right now.' },
      { wrong: '1년 됐어요', correct: '배운 지 1년이 됐어요', note: '缺少 -은/ㄴ 지，必须说明是"做了什么事之后"过了多久。', noteEn: 'Missing \'-은/ㄴ 지\', you must specify how long it\'s been \'since doing something\'.' },
      { wrong: '온 지 6개월이 만이에요', correct: '온 지 6개월이 됐어요 또는 온 지 6개월 만이에요', note: '됐어요 和 만이에요 结构不同，不能混用。됐어요 前面加 이，만이에요 前面不加 이。', noteEn: '\'됐어요\' and \'만이에요\' have different structures and can\'t be mixed. \'됐어요\' takes \'이\' before it, \'만이에요\' doesn\'t.' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p7-l03', partNumber: 7, lessonNumber: 3, title: '-(으)ㄴ/는데',
    whatItDoes: '铺垫背景或表示转折', whatItDoesEn: 'Setting the background or expressing contrast',
    whatItDoesBody: '-(으)ㄴ/는데 是韩语最高频的连接词尾之一，用来引出背景、表示轻微转折，或铺垫下一句。\n和中文"……但是""……呢……""……的是……"都有对应，但一个词尾就能完成多种功能。', whatItDoesBodyEn: '-(으)ㄴ/는데 is one of the most frequent connective endings in Korean, used to introduce background, express slight contrast, or set up the next sentence. \\nIt corresponds to "...but," "...and..." or "the thing is..." in Chinese, but one ending covers multiple functions.',
    structureNote: '下面展示三种典型用法的句型框架。\n注意变形规则：动词现在时用 -는데，形容词用 -(으)ㄴ데，过去时用 -았/었는데。', structureNoteEn: 'Below are sentence patterns for three typical uses. \\nNote the conjugation rules: present tense verbs take -는데, adjectives take -(으)ㄴ데, and past tense takes -았/었는데.',
    rulesNote: '动词现在时词干 + 는데（不看收音）。\n形容词词干：有收音 + 은데，无收音 + ㄴ데。\n过去时（-았/었-）+ 는데。\n이다/아니다 → 인데/아닌데。', rulesNoteEn: 'Present tense verb stem + 는데 (regardless of final consonant). \\nAdjective stem: + 은데 if it ends in a consonant, + ㄴ데 if it ends in a vowel. \\nPast tense (-았/었-) + 는데. \\n이다/아니다 → 인데/아닌데.',
    scenarioNote: '日常对话中铺垫、转折、请求说明全靠 -는데。\n比如"我想去但是……""天气很好，要不要出去？"这类话全都用 -는데 来连接。', scenarioNoteEn: 'Everyday conversation relies on -는데 for setting up, contrasting, and asking for explanations. \\nFor example, "I want to go but..." or "The weather\'s nice, want to go out?" all use -는데 to connect.',
    step0Html: `<div class="card-title">-(으)ㄴ/는데</div>
<div class="card-body">韩语最高频的连接词尾，一个词尾能铺垫背景、引出转折、暗示等待回应。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">三种用法，一个词尾</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">① 铺垫背景</div>
      <div style="font-size:16px;font-weight:800;color:#241917">날씨가 좋은데 나갈까요?</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">天气很好，要出去吗？</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">② 轻微转折</div>
      <div style="font-size:16px;font-weight:800;color:#241917">한국어를 공부하는데 어려워요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">学韩语，（但是）很难。</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">③ 语气未完，等回应</div>
      <div style="font-size:16px;font-weight:800;color:#241917">저 오늘 좀 바쁜데……</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我今天有点忙……（暗示"所以不行"）</div>
    </div>
  </div>
</div>
<div class="reminder-box">形容词用 -(으)ㄴ데（좋은데），动词现在时用 -는데（가는데），过去时用 -았는데（갔는데）——三条变形规则记住就全通了。</div>`,
    compareHtml: `<div class="card-title">动词 -는데 vs 形容词 -(으)ㄴ데 vs 过去时 -았는데</div>
<div class="card-body">-는데 的变形规则是这节课最核心的内容。三种情况对应三套词尾，不能混用。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">动词 现在时 → 词干 + 는데</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">不看收音，直接加 -는데</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가다 → 가는데</span><span style="font-size:16px;color:#5a4640">먹다 → 먹는데</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">공부하는데 재미있어요.</span><span style="font-size:16px;color:#5a4640">学习，挺有趣的。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">形容词 → 有收音 + 은데 / 无收音 + ㄴ데</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">좋다→좋은데 / 크다→큰데 / 예쁘다→예쁜데</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">날씨가 좋은데 나갈까요?</span><span style="font-size:16px;color:#5a4640">天气好，要出去吗？</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">过去时 -았/었 → + 는데</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">过去时统一用 -았/었는데</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">갔는데 문이 닫혔어요.</span><span style="font-size:16px;color:#5a4640">去了，但门关着。</span></div>
  </div>
</div>
<div class="reminder-box">좋는데 ✗ → 좋은데 ✓（形容词用은데）；갔은데 ✗ → 갔는데 ✓（过去时用는데）——这两个是最常犯的错误。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的 -(으)ㄴ/는데 用法', titleEn: 'Choose the correct use of -(으)ㄴ/는데',
      body: '根据前后句关系选择正确的连接形式。', bodyEn: 'Choose the correct connective form based on the relationship between the sentences.',
      questions: [
        {
          pre: '날씨가 추운',
          post: '따뜻하게 입으세요.',
          options: ["지만", "대", "데"],
          answer: 2,
          explanation: '-(으)ㄴ/는데 提供背景："天气冷，请穿暖和。"', explanationEn: '-(으)ㄴ/는데 provides background: "It\'s cold, so dress warmly."',
        },
        {
          pre: '어제 영화를 봤',
          post: '정말 재미있었어요.',
          options: ["으니까", "는데", "지만"],
          answer: 1,
          explanation: '-는데 提供背景/铺垫："昨天看了电影，真的很有意思。"', explanationEn: '-는데 provides background/setup: "I watched a movie yesterday, it was really interesting."',
        },
        {
          pre: '배가 고픈',
          post: '먹을 게 없어요.',
          options: ["지만", "면", "데"],
          answer: 2,
          explanation: '-(으)ㄴ데 表轻微转折/对比："肚子饿，但没什么可吃的。"', explanationEn: '-(으)ㄴ데 indicates mild contrast: "I\'m hungry, but there\'s nothing to eat."',
        },
        {
          pre: '숙제는 다 했',
          post: '시험 공부는 못 했어요.',
          options: ["는데", "고", "으니까"],
          answer: 0,
          explanation: '-는데 铺垫对比："作业做完了，但考试复习没做。"고 只是平列（少了对比感），으니까 表原因（"因为做完作业"与后句逻辑不符）。', explanationEn: '-는데 sets up contrast: "I finished my homework, but I haven\'t studied for the exam." 고 just lists (lacks contrast), 으니까 indicates cause ("because I finished homework" doesn\'t logically fit the next clause).',
        },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 7 章 第 3 课 · 已完成</div>
    <div class="ov-hero-title">-(으)ㄴ/는데</div>
    <div class="ov-hero-sub">铺垫背景 · 轻微转折 · 语气未完</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">变形规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">动词现在时</span>：词干 + 는데（가는데 / 먹는데）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">形容词</span>：有收音 + 은데 / 无收音 + ㄴ데（좋은데 / 큰데）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#6b7ff0">过去时</span>：-았/었 + 는데（갔는데 / 먹었는데）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">三种用法</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">날씨가 좋은데 나갈까요?</span></div><div class="struct-zh">① 铺垫背景：天气好，要出去吗？</div></div>
        <div><div class="tok-row"><span class="tok t-v">공부하는데 어려워요</span></div><div class="struct-zh">② 轻微转折：学习，但是很难。</div></div>
        <div><div class="tok-row"><span class="tok t-v">저 오늘 바쁜데……</span></div><div class="struct-zh">③ 语气未完：我今天有点忙……</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">좋는데</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">좋은데</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">갔은데</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">갔는데</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '배고픈데 같이 밥 먹을래요?', zh: '我有点饿，要不要一起吃饭？', zhEn: 'I\'m a bit hungry, want to eat together?', tokens: [{ text: '배고픈데', role: 'plain' }, { text: '같이', role: 'plain' }, { text: '밥', role: 'object' }, { text: '먹을래요?', role: 'verb' }] },
      { ko: '날씨가 좋은데 산책해요', zh: '天气很好，去散步吧。', zhEn: 'The weather is nice, let\'s go for a walk.', tokens: [{ text: '날씨가', role: 'subject' }, { text: '좋은데', role: 'plain' }, { text: '산책해요', role: 'verb' }] },
      { ko: '한국어를 공부하는데 어려워요', zh: '学韩语，（但是）很难。', zhEn: 'Learning Korean is (but) hard.', tokens: [{ text: '한국어를', role: 'object' }, { text: '공부하는데', role: 'plain' }, { text: '어려워요', role: 'verb' }] },
      { ko: '어제 갔는데 문이 닫혔어요', zh: '昨天去了，但是门关着。', zhEn: 'I went yesterday, but the door was closed.', tokens: [{ text: '어제', role: 'time' }, { text: '갔는데', role: 'plain' }, { text: '문이', role: 'subject' }, { text: '닫혔어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + 는데（现在时，不看收音）', textEn: 'Verb stem + 는데 (present tense, regardless of final consonant)', examples: '가다→가는데 / 먹다→먹는데 / 공부하다→공부하는데' },
      { type: 'rule', text: '形容词词干 有收音 + 은데，无收音 + ㄴ데', textEn: 'Adjective stem: with final consonant + 은데, without + ㄴ데', examples: '작다→작은데 / 크다→큰데 / 좋다→좋은데 / 예쁘다→예쁜데' },
      { type: 'rule', text: '过去时 -았/었/였 + 는데', textEn: 'Past tense -았/었/였 + 는데', examples: '갔는데 / 먹었는데 / 봤는데' },
      { type: 'usage', text: '用法①：铺垫背景，引出后续', textEn: 'Usage ①: Set up background, lead into what follows', examples: '날씨가 좋은데 나갈까요?（天气好，要出去吗？）', examplesEn: '날씨가 좋은데 나갈까요? (The weather is nice, shall we go out?)' },
      { type: 'usage', text: '用法②：表示轻微转折', textEn: 'Usage ②: Indicate mild contrast', examples: '한국어를 공부하는데 어려워요（学韩语，但是难）', examplesEn: '한국어를 공부하는데 어려워요 (I\'m learning Korean, but it\'s hard)' },
      { type: 'note', text: '-는데 单独结尾 → 语气未完，等对方回应', textEn: '-는데 ending alone → tone is unfinished, waiting for the other person\'s response', examples: '저 오늘 좀 바쁜데……（我今天有点忙……）暗示"所以不行"', examplesEn: '저 오늘 좀 바쁜데…… (I\'m a bit busy today...) implying "so I can\'t"' },
      { type: 'note', text: '있다/없다 虽然中文像形容词（"有的/没有的"），在韩语里按动词接续：一律用 -는데（있는데/없는데），不是 -은데。', textEn: '있다/없다 may seem like adjectives in Chinese ("have/don\'t have"), but in Korean they conjugate as verbs: always use -는데 (있는데/없는데), not -은데.', examples: '시간이 있는데 같이 갈래요? / 돈이 없는데 어떡하죠?' },
      { type: 'compare', text: '-는데 vs -지만：中文都译"但是"，但语感不同。지만＝纯转折（前后明确对立）；는데＝铺垫背景、语气更软，尤其请求/提议/发问前几乎都用 는데，换成 지만 会显得生硬。', textEn: '-는데 vs -지만: both translate to "but" in Chinese, but the nuance differs. 지만 = pure contrast (clear opposition); 는데 = sets up background, softer tone, especially before requests/suggestions/questions — almost always use 는데, switching to 지만 sounds stiff.', examples: '커피가 없는데 물 드릴까요?（没咖啡，给您水好吗）自然 / 커피가 없지만 물 드릴까요? 生硬', examplesEn: '커피가 없는데 물 드릴까요? (No coffee, shall I get you water?) natural / 커피가 없지만 물 드릴까요? stiff' },
      { type: 'example', text: '배고픈데 뭐 먹을까요? / 비가 오는데 우산 있어요? / 어제 전화했는데 못 받았어요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '날씨가', role: 'subject' }, { text: '좋은데', role: 'plain' }, { text: '나갈까요?', role: 'verb' }], zh: '天气很好，要出去吗？', zhEn: 'The weather is nice, shall we go out?', swapRole: 'subject', swapWords: ['날씨가', '기분이', '시간이'] },
      { wordBlocks: [{ text: '한국어를', role: 'object' }, { text: '공부하는데', role: 'plain' }, { text: '재미있어요', role: 'verb' }], zh: '学韩语，很有意思。', zhEn: 'Learning Korean is really interesting.', swapRole: 'verb', swapWords: ['재미있어요', '어려워요', '즐거워요'] },
      { wordBlocks: [{ text: '배고픈데', role: 'plain' }, { text: '뭐', role: 'object' }, { text: '먹을까요?', role: 'verb' }], zh: '我饿了，吃点什么吧？', zhEn: 'I\'m hungry, let\'s eat something.', swapRole: 'plain', swapWords: ['배고픈데', '피곤한데', '심심한데'] },
      { wordBlocks: [{ text: '어제', role: 'time' }, { text: '전화했는데', role: 'plain' }, { text: '못 받았어요', role: 'verb' }], zh: '昨天打电话了，但是没接到。', zhEn: 'I called yesterday, but you didn\'t answer.', swapRole: 'time', swapWords: ['어제', '아까', '지난주에'] },
    ],
    scenarios: [
      { icon: '🌤️', context: '邀请出去玩', contextEn: 'Invite to hang out', ko: '날씨가 정말 좋은데 같이 산책할까요?', zh: '天气真的很好，要不要一起散步？', zhEn: 'The weather is really nice. Want to take a walk together?' },
      { icon: '😅', context: '婉拒邀请', contextEn: 'Politely decline an invitation', ko: '오늘은 좀 바쁜데 다음에 만나요.', zh: '今天有点忙，下次再见面吧。', zhEn: 'I\'m a bit busy today. Let\'s meet next time.' },
      { icon: '📱', context: '解释没接电话', contextEn: 'Explain not answering the phone', ko: '아까 전화했는데 못 받았어요? 미안해요.', zh: '刚才打电话了，没接到吗？对不起。', zhEn: 'I called earlier. Did you miss it? Sorry.' },
      { icon: '🍜', context: '提议吃饭', contextEn: 'Suggest eating', ko: '배고픈데 같이 밥 먹을래요?', zh: '我饿了，要一起吃饭吗？', zhEn: 'I\'m hungry. Want to eat together?' },
      { icon: '🎵', context: '聊音乐感受', contextEn: 'Talk about music feelings', ko: '이 노래 들어봤는데 진짜 좋더라고요.', zh: '我听了这首歌，真的很好听。', zhEn: 'I listened to this song. It\'s really good.' },
      { icon: '📚', context: '表达学习困难', contextEn: 'Express learning difficulties', ko: '한국어를 공부하는데 발음이 제일 어려워요.', zh: '学韩语，发音是最难的。', zhEn: 'In learning Korean, pronunciation is the hardest.' },
    ],
    mistakes: [
      { wrong: '좋는데', correct: '좋은데', note: '좋다 是形容词，用 -(으)ㄴ데，不是 -는데。', noteEn: '좋다 is an adjective, use -(으)ㄴ데, not -는데.' },
      { wrong: '갔은데', correct: '갔는데', note: '过去时 -았/었 后面用 -는데，不是 -은데。', noteEn: 'After past tense -았/었, use -는데, not -은데.' },
      { wrong: '저 오늘 밥 먹은데요', correct: '저 오늘 밥 먹는데요', note: '动词词干后接 -는데요，不是 -은데요。-은데요 是形容词/있다/없다/过去时后才用的形式。', noteEn: 'After a verb stem, use -는데요, not -은데요. -은데요 is used after adjectives/있다/없다/past tense.' },
      { wrong: '어제 날씨가 좋은데 오늘은 추워요', correct: '어제는 날씨가 좋았는데 오늘은 추워요', note: '-는데 连接两个时间不同的情况时，过去的部分要用过去时 -았/었는데，不能用现在时。', noteEn: 'When -는데 connects two situations at different times, the past part must use past tense -았/었는데, not present tense.' },
    ],
    linkedGrammarIds: ['g26'],
  },
  {
    id: 'card-p7-l04', partNumber: 7, lessonNumber: 4, title: '아무(名词)도, 하나도 + 否定', titleEn: '아무(noun)도, 하나도 + Negation',
    whatItDoes: '表示"什么都没有/谁都不"的全称否定', whatItDoesEn: 'Expressing total negation: "nothing" or "no one"',
    whatItDoesBody: '아무도/아무것도/아무데도 配合否定谓语，表示"谁都……不""什么都……不"。\n하나도 强调"一点都不/一个都没有"。\n和中文"一个都不""什么都没"对应，但韩语必须后接否定形式，不能用肯定动词。', whatItDoesBodyEn: '아무도/아무것도/아무데도 combine with negative predicates to mean "no one..." or "nothing...". \\n하나도 emphasizes "not even one." \\nThis corresponds to "not a single" or "nothing" in Chinese, but Korean requires a negative form after it—you can\'t use a positive verb.',
    structureNote: '下面展示几种全称否定的基本句型。\n注意：아무도/아무것도 后面必须接 안/못 或 -지 않다/못하다。', structureNoteEn: 'Below are basic sentence patterns for total negation. \\nNote: 아무도/아무것도 must be followed by 안/못 or -지 않다/못하다.',
    rulesNote: '아무도 + 없어요/안 해요（人：谁都不……）\n아무것도 + 안 먹어요/없어요（事物：什么都不……）\n아무데도 + 안 가요（地点：哪里都不……）\n하나도 + 안/못（强调程度：一点都不……）', rulesNoteEn: '아무도 + 없어요/안 해요 (people: no one...) \\n아무것도 + 안 먹어요/없어요 (things: nothing...) \\n아무데도 + 안 가요 (places: nowhere...) \\n하나도 + 안/못 (emphasis: not at all...)',
    scenarioNote: '表达极端否定、强调一无所有时最常用。\n中文"我什么都不想吃"直接说，韩语要用 아무것도 + 否定动词结构。', scenarioNoteEn: 'These are most common for expressing extreme negation or emphasizing having nothing. \\nChinese says "I don\'t want to eat anything" directly, but Korean uses the 아무것도 + negative verb structure.',
    step0Html: `<div class="card-title">아무도 · 아무것도 · 하나도 + 否定</div>
<div class="card-body">韩语全称否定：用专门的词搭配否定动词，表示"谁都不/什么都没/一点都不"。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">三个核心词</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">人 → 아무도</div>
      <div style="font-size:16px;font-weight:800;color:#241917">아무도 없어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">谁都没有。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">事物 → 아무것도</div>
      <div style="font-size:16px;font-weight:800;color:#241917">아무것도 안 먹었어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">什么都没吃。</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">程度强调 → 하나도</div>
      <div style="font-size:16px;font-weight:800;color:#241917">하나도 안 어려워요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">一点都不难。</div>
    </div>
  </div>
</div>
<div class="reminder-box">아무도/아무것도 后面必须跟否定动词——아무도 왔어요 ✗ → 아무도 안 왔어요 ✓。</div>`,
    compareHtml: `<div class="card-title">아무도 / 아무것도 / 아무데도 / 하나도</div>
<div class="card-body">四个词分别对应"人/事物/地点/程度"的全称否定，搭配对象不同，不能混用。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">아무도 → 谁都不……（人）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아무도 없어요.</span><span style="font-size:16px;color:#5a4640">谁都没有。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">아무도 안 왔어요.</span><span style="font-size:16px;color:#5a4640">谁都没来。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">아무것도 → 什么都不……（事物）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아무것도 안 먹었어요.</span><span style="font-size:16px;color:#5a4640">什么都没吃。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">아무것도 없어요.</span><span style="font-size:16px;color:#5a4640">什么都没有。</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">아무데도 → 哪里都不……（地点）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아무데도 안 갔어요.</span><span style="font-size:16px;color:#5a4640">哪里都没去。</span></div>
  </div>
  <div class="tok-row" style="background:#fffbe8;border-radius:12px;padding:12px">
    <div class="tok t-v">하나도 → 一点都不……（程度强调）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">하나도 안 어려워요.</span><span style="font-size:16px;color:#5a4640">一点都不难。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">하나도 못 먹었어요.</span><span style="font-size:16px;color:#5a4640">一口都没吃到。</span></div>
  </div>
</div>
<div class="reminder-box">아무 + 名词 + 도 → 아무 말도 안 했어요（什么话都没说）。这个扩展格式能覆盖更多场景。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的否定强调表达', titleEn: 'Choose the correct negative emphasis expression',
      body: '根据句意选择 아무도 或 하나도。', bodyEn: 'Choose 아무도 or 하나도 based on the sentence meaning.',
      questions: [
        {
          pre: '교실에',
          post: '없어요.',
          options: ["하나도", "아무도", "아무거나"],
          answer: 1,
          explanation: '아무도 + 否定 = "没有任何人"：教室里一个人都没有。', explanationEn: '아무도 + negative = "no one": There\'s no one in the classroom.',
        },
        {
          pre: '돈이',
          post: '없어요.',
          options: ["아무도", "아무데도", "하나도"],
          answer: 2,
          explanation: '하나도 + 否定 = "一点都……"：一分钱都没有，强调程度为零。아무도（谁都）指人、아무데도（哪里都）指地点，都不能修饰"钱"。', explanationEn: '하나도 + negative = "not at all...": I don\'t have a single penny, emphasizing zero degree. 아무도 (anyone) refers to people, 아무데도 (anywhere) refers to places, neither can modify "money".',
        },
        {
          pre: '그 사건에 대해서는',
          post: '몰라요.',
          options: ['아무것도', '아무도', '하나도'],
          answer: 0,
          explanation: '"关于那件事"什么都不知道→事物用 아무것도。아무도（谁都）指人，与"关于那件事"不搭；하나도 后多接 없다/못 하다 表程度，此处 아무것도 最贴。', explanationEn: '"About that matter" knowing nothing → for things use 아무것도. 아무도 (anyone) refers to people, doesn\'t fit with "about that matter"; 하나도 is often followed by 없다/못 하다 to indicate degree, here 아무것도 is most fitting.',
        },
        {
          pre: '그 이야기는',
          post: '못 들었어요.',
          options: ["절대로", "아무도", "하나도"],
          answer: 2,
          explanation: '하나도 + 否定："那件事一点都没听说。"强调零信息。', explanationEn: '하나도 + negative: "I haven\'t heard anything about that matter." Emphasizes zero information.',
        },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 7 章 第 4 课 · 已完成</div>
    <div class="ov-hero-title">아무도 · 아무것도 · 하나도</div>
    <div class="ov-hero-sub">全称否定 · 人/事物/地点/程度</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规则</div></div>
    <div class="ov-block">
      <div style="background:#fff8fb;border-radius:12px;padding:10px 12px;font-size:16px;color:#241917;font-weight:700">아무도/아무것도/아무데도/하나도 后面必须接否定动词</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">四词速查</div></div>
    <div class="ov-block">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div style="background:#fff0f5;border-radius:10px;padding:10px"><div style="font-size:16px;font-weight:800;color:#ff7fa8">아무도</div><div style="font-size:11px;color:#89756e;margin-top:2px">谁都不（人）</div></div>
        <div style="background:#eaf8f5;border-radius:10px;padding:10px"><div style="font-size:16px;font-weight:800;color:#2db89b">아무것도</div><div style="font-size:11px;color:#89756e;margin-top:2px">什么都不（事物）</div></div>
        <div style="background:#f0f4ff;border-radius:10px;padding:10px"><div style="font-size:16px;font-weight:800;color:#6b7ff0">아무데도</div><div style="font-size:11px;color:#89756e;margin-top:2px">哪里都不（地点）</div></div>
        <div style="background:#fffbe8;border-radius:10px;padding:10px"><div style="font-size:16px;font-weight:800;color:#c89020">하나도</div><div style="font-size:11px;color:#89756e;margin-top:2px">一点都不（程度）</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">아무도 왔어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">아무도 안 왔어요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">하나도 어려워요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">하나도 안 어려워요</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '아무도 없어요', zh: '谁都没有。/没有任何人。', zhEn: 'No one. / There\'s no one.', tokens: [{ text: '아무도', role: 'subject' }, { text: '없어요', role: 'verb' }] },
      { ko: '아무것도 먹고 싶지 않아요', zh: '什么都不想吃。', zhEn: 'I don\'t want to eat anything.', tokens: [{ text: '아무것도', role: 'object' }, { text: '먹고 싶지 않아요', role: 'verb' }] },
      { ko: '하나도 안 어려워요', zh: '一点都不难。', zhEn: 'It\'s not difficult at all.', tokens: [{ text: '하나도', role: 'plain' }, { text: '안 어려워요', role: 'verb' }] },
      { ko: '아무데도 가고 싶지 않아요', zh: '哪里都不想去。', zhEn: 'I don\'t want to go anywhere.', tokens: [{ text: '아무데도', role: 'plain' }, { text: '가고 싶지 않아요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '아무도 + 否定 → 谁都不……（人）', textEn: '아무도 + negative → no one... (people)', examples: '아무도 없어요 / 아무도 안 왔어요 / 아무도 몰라요' },
      { type: 'rule', text: '아무것도 + 否定 → 什么都不……（事物）', textEn: '아무것도 + negative → nothing... (thing)', examples: '아무것도 안 먹었어요 / 아무것도 없어요 / 아무것도 모르겠어요' },
      { type: 'rule', text: '아무데도 + 否定 → 哪里都不……（地点）', textEn: '아무데도 + negative → nowhere... (place)', examples: '아무데도 안 갔어요 / 아무데도 없어요' },
      { type: 'rule', text: '하나도 + 否定 → 一点都不……（强调程度）', textEn: '하나도 + negative → not at all... (emphasis)', examples: '하나도 안 어려워요 / 하나도 못 먹었어요 / 하나도 안 무서워요' },
      { type: 'note', text: '아무도/아무것도 不能接肯定动词', textEn: '아무도/아무것도 cannot be used with positive verbs', examples: '✗ 아무도 왔어요 → ✓ 아무도 안 왔어요' },
      { type: 'vocab', text: '아무 + 名词 + 도 → 什么……都不', textEn: '아무 + noun + 도 → nothing... (any... not)', examples: '아무 말도 안 했어요（什么话都没说）/ 아무 생각도 없어요（什么想法都没有）', examplesEn: '아무 말도 안 했어요 (didn\'t say anything) / 아무 생각도 없어요 (have no thoughts)' },
      { type: 'compare', text: '아무-도 vs 아무-나：中文"谁都/什么都"两种意思共用一套词，韩语靠 도/나 分开。아무+도＝配否定，"谁都不/什么都没"；아무+나＝配肯定，"随便谁/随便哪个都行"。选错助词意思会整个反过来。', textEn: '아무-도 vs 아무-나: In Chinese, "anyone/anything" covers both meanings with one set of words, but Korean separates them with 도/나. 아무+도 = with negatives, "no one/nothing"; 아무+나 = with positives, "anyone/anything is fine." Choosing the wrong particle flips the meaning entirely.', examples: '아무도 안 와요（没人来）↔ 아무나 와도 돼요（谁来都行）/ 아무것도 없어요（什么都没有）↔ 아무거나 주세요（随便给点什么）', examplesEn: '아무도 안 와요 (no one comes) ↔ 아무나 와도 돼요 (anyone can come) / 아무것도 없어요 (there\'s nothing) ↔ 아무거나 주세요 (give me anything)' },
      { type: 'example', text: '아무도 없어요 / 아무것도 안 먹었어요 / 하나도 안 피곤해요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '아무도', role: 'subject' }, { text: '없어요', role: 'verb' }], zh: '谁都没有。', zhEn: 'No one is there.', swapRole: 'verb', swapWords: ['없어요', '안 왔어요', '안 알아요'] },
      { wordBlocks: [{ text: '아무것도', role: 'object' }, { text: '안 먹었어요', role: 'verb' }], zh: '什么都没吃。', zhEn: 'I haven\'t eaten anything.', swapRole: 'verb', swapWords: ['안 먹었어요', '없어요', '안 했어요'] },
      { wordBlocks: [{ text: '하나도', role: 'plain' }, { text: '안 어려워요', role: 'verb' }], zh: '一点都不难。', zhEn: 'It\'s not difficult at all.', swapRole: 'verb', swapWords: ['안 어려워요', '안 무서워요', '안 피곤해요'] },
      { wordBlocks: [{ text: '아무데도', role: 'plain' }, { text: '안 갔어요', role: 'verb' }], zh: '哪里都没去。', zhEn: 'Didn\'t go anywhere.', swapRole: 'verb', swapWords: ['안 갔어요', '안 나갔어요', '못 갔어요'] },
    ],
    scenarios: [
      { icon: '😶', context: '说什么都不想说', contextEn: 'Don\'t want to say anything.', ko: '오늘은 아무 말도 하고 싶지 않아요.', zh: '今天什么都不想说。', zhEn: 'I don\'t want to say anything today.' },
      { icon: '🍽️', context: '没胃口', contextEn: 'No appetite.', ko: '배가 아파서 아무것도 못 먹었어요.', zh: '肚子疼所以什么都没吃。', zhEn: 'My stomach hurt, so I didn\'t eat anything.' },
      { icon: '😌', context: '测试一点都不难', contextEn: 'The test isn\'t hard at all.', ko: '이 시험은 하나도 안 어려웠어요!', zh: '这个考试一点都不难！', zhEn: 'This exam isn\'t hard at all!' },
      { icon: '🏠', context: '一个人在家', contextEn: 'Alone at home.', ko: '집에 아무도 없어서 혼자 있었어요.', zh: '家里没有任何人，所以一个人待着。', zhEn: 'There\'s no one at home, so I\'m staying alone.' },
      { icon: '🚶', context: '哪里都不想去', contextEn: 'Don\'t want to go anywhere.', ko: '오늘은 피곤해서 아무데도 가고 싶지 않아요.', zh: '今天累了，哪里都不想去。', zhEn: 'I\'m tired today, so I don\'t want to go anywhere.' },
      { icon: '🤷', context: '什么都不知道', contextEn: 'Know nothing.', ko: '저는 그 일에 대해 아무것도 몰라요.', zh: '关于那件事我什么都不知道。', zhEn: 'I know nothing about that.' },
    ],
    mistakes: [
      { wrong: '아무도 왔어요', correct: '아무도 안 왔어요', note: '아무도 必须配否定谓语，不能接肯定动词。', noteEn: '아무도 must be paired with a negative predicate; it can\'t take a positive verb.' },
      { wrong: '아무것도 조금 있어요', correct: '아무것도 없어요', note: '아무것도 强调"什么都没有"，不能说"什么都有一点"，逻辑矛盾。', noteEn: '아무것도 emphasizes "there\'s nothing"; you can\'t say "there\'s a little of everything"—it\'s logically contradictory.' },
      { wrong: '하나도 어려워요', correct: '하나도 안 어려워요', note: '하나도 必须配否定形式，表示"一点都不……"。', noteEn: '하나도 must be used with a negative form, meaning "not at all..."' },
      { wrong: '아무 사람도 없어요', correct: '아무도 없어요', note: '아무도 本身已包含"人"的含义，不需要再加 사람。', noteEn: '아무도 already includes the meaning of "person," so you don\'t need to add 사람.' },
      { wrong: '아무것도를 안 먹었어요', correct: '아무것도 안 먹었어요', note: '这里的 도 已经替代了宾格助词，后面不能再加 을/를；同理 아무도 也不再加 이/가。', noteEn: 'Here, 도 has replaced the object particle, so you can\'t add 을/를 after it; likewise, 아무도 doesn\'t take 이/가 either.' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p7-l05', partNumber: 7, lessonNumber: 5, title: '에다(가), 에',
    whatItDoes: '表示"在……上加/写/放"的附加动作', whatItDoesEn: 'Expressing an additional action: "add/write/put on..."',
    whatItDoesBody: '에다(가) 表示在某处添加、附着或施加动作，强调动作的目标位置。\n和단순 위치 助词 에 不同：에다가 强调"在……这个地方（进行添加/操作）"，带有方向感和附着感。\n和中文"在……上""往……里"对应，但比中文更精准地表示目标。', whatItDoesBodyEn: '에다(가) indicates adding, attaching, or applying an action to a place, emphasizing the target location of the action. \\nUnlike the simple location particle 에, 에다가 emphasizes "at this place (doing an addition/operation)" with a sense of direction and attachment. \\nIt corresponds to "on..." or "into..." in Chinese, but more precisely indicates the target.',
    structureNote: '下面展示 에다가 的基本句型。\n에다가 可以缩写为 에다 或 에，但完整形式最清晰。', structureNoteEn: 'Below are basic sentence patterns for 에다가. \\n에다가 can be shortened to 에다 or 에, but the full form is clearest.',
    rulesNote: '名词 + 에다가（完整）/ 에다（略）/ 에（最简）。\n三者意思相同，에다가 最正式，에 最口语。\n主要搭配：쓰다（写）、붙이다（贴）、넣다（放入）、바르다（涂）、두다（放置）。', rulesNoteEn: 'Noun + 에다가 (full) / 에다 (abbrev.) / 에 (simplest).\\nAll three mean the same; 에다가 is most formal, 에 is most colloquial.\\nCommon collocations: 쓰다 (write), 붙이다 (stick), 넣다 (put in), 바르다 (apply), 두다 (place).',
    scenarioNote: '写便条、贴标签、往包里放东西等日常动作全靠这个助词。\n和简单的位置助词 에 区别在于：에다가 强调"在这个地方对它做了什么"，有操作感。', scenarioNoteEn: 'This particle is essential for everyday actions like writing notes, sticking labels, or putting things in bags.\\nUnlike the simple location particle 에, 에다가 emphasizes "doing something to it at this place," giving a sense of action.',
    step0Html: `<div class="card-title">에다가 · 에다 · 에</div>
<div class="card-body">强调"在某个地方进行操作/附着"的助词。贴海报、往包里放东西、在本子上写——这些动作都用 에다가。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">三种形式，同一意思</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">完整形式</div>
      <div style="font-size:16px;font-weight:800;color:#241917">노트에다가 메모했어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">在笔记本上记了备忘录。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">缩略形式</div>
      <div style="font-size:16px;font-weight:800;color:#241917">가방에다 책을 넣었어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">把书放进包里了。</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">最简形式（口语）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">벽에 포스터를 붙였어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">在墙上贴了海报。</div>
    </div>
  </div>
</div>
<div class="reminder-box">에다가 只用于"附着/操作"动词，不用于移动方向。학교에다가 가요 ✗ → 학교에 가요 ✓。</div>`,
    compareHtml: `<div class="card-title">에다가（附着操作）vs 에（位置/方向）</div>
<div class="card-body">两者都是位置助词，但 에다가 强调"在这里做了什么操作"，에 只是说明位置或方向。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">에다가 → 附着 / 操作目标</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">强调"在这个地方做了什么"，有操作感</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">노트에다가 써요.</span><span style="font-size:16px;color:#5a4640">在笔记本上写。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">벽에다가 붙여요.</span><span style="font-size:16px;color:#5a4640">贴在墙上。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">얼굴에다 크림을 발라요.</span><span style="font-size:16px;color:#5a4640">在脸上涂面霜。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">에 → 位置 / 方向 / 存在</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">单纯说明在哪里，或往哪个方向</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">학교에 가요.</span><span style="font-size:16px;color:#5a4640">去学校。（方向）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">가방에 있어요.</span><span style="font-size:16px;color:#5a4640">在包里。（存在）</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">常见搭配动词</div>
  <div style="font-size:16px;color:#5a4640">쓰다（写）／붙이다（贴）／넣다（放入）／바르다（涂）／두다（放置）／그리다（画）</div>
</div>
<div class="reminder-box">있다/없다（存在动词）用 에，不用 에다가：가방에다가 있어요 ✗ → 가방에 있어요 ✓。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的 에다(가) 表达', titleEn: 'Choose the correct 에다(가) expression',
      body: '根据语境选择正确的助词。', bodyEn: 'Choose the correct particle based on the context.',
      questions: [
        {
          pre: '책상',
          post: '책을 올려놓으세요.',
          options: ['에다', '에서', '를'],
          answer: 0,
          explanation: '放置的目标位置用 에다(가)（也可用 에）："把书放在桌上。"에서 表动作发生地/来源，를 是宾格，都不能标放置目标。', explanationEn: 'Use 에다(가) (or 에) for the target location of placing: "Put the book on the desk." Here, 에서 marks where the action happens/origin, and 를 is the object particle—neither can mark the placement target.',
        },
        {
          pre: '이 종이',
          post: '이름을 써 주세요.',
          options: ['에', '에서', '로'],
          answer: 0,
          explanation: '写字的目标位置用 에（也可用 에다）："请在这张纸上写名字。"에서 表动作发生地，로 表方向/工具，都不合。', explanationEn: 'Use 에 (or 에다) for the target location of writing: "Please write your name on this paper." Here, 에서 marks where the action happens, and 로 marks direction/tool—neither fits.',
        },
        {
          pre: '냉장고',
          post: '넣어 두었어요.',
          options: ["를", "에서", "에다"],
          answer: 2,
          explanation: '放进冰箱的目标位置用 에다(가)（也可用 에）："放进了冰箱里。"에서 表动作发生地，를 是宾格，都不能标放入目标。', explanationEn: 'Use 에다(가) (or 에) for the target location of putting into: "Put it in the fridge." Here, 에서 marks where the action happens, and 를 is the object particle—neither can mark the target of putting in.',
        },
        {
          pre: '여기',
          post: '전화번호를 적어 주세요.',
          options: ['에', '에서', '를'],
          answer: 0,
          explanation: '写电话号码的目标位置用 에（也可用 에다）：여기에 적어 주세요（请在这里写电话号码）。에서 表动作发生地，를 是宾格，都不合。', explanationEn: 'Use 에 (or 에다) for the target location of writing a phone number: 여기에 적어 주세요 (Please write the phone number here). Here, 에서 marks where the action happens, and 를 is the object particle—neither fits.',
        },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 7 章 第 5 课 · 已完成</div>
    <div class="ov-hero-title">에다가 · 에다 · 에</div>
    <div class="ov-hero-sub">附着操作 · 三种形式 · 与位置 에 的区别</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">三种形式对比</div></div>
    <div class="ov-block">
      <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:8px">
        <div style="background:#fff0f5;border-radius:10px;padding:10px;text-align:center"><div style="font-size:16px;font-weight:800;color:#ff7fa8">에다가</div><div style="font-size:11px;color:#89756e;margin-top:2px">完整·正式</div></div>
        <div style="background:#eaf8f5;border-radius:10px;padding:10px;text-align:center"><div style="font-size:16px;font-weight:800;color:#2db89b">에다</div><div style="font-size:11px;color:#89756e;margin-top:2px">缩略·口语</div></div>
        <div style="background:#f0f4ff;border-radius:10px;padding:10px;text-align:center"><div style="font-size:16px;font-weight:800;color:#6b7ff0">에</div><div style="font-size:11px;color:#89756e;margin-top:2px">最简·通用</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">노트에다가 메모했어요</span></div><div class="struct-zh">在笔记本上记了备忘录。</div></div>
        <div><div class="tok-row"><span class="tok t-v">가방에다 책을 넣었어요</span></div><div class="struct-zh">把书放进包里了。</div></div>
        <div><div class="tok-row"><span class="tok t-v">벽에다가 포스터를 붙였어요</span></div><div class="struct-zh">在墙上贴了海报。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학교에다가 가요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학교에 가요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">가방에다가 있어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">가방에 있어요</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '노트에다가 메모했어요', zh: '在笔记本上记了备忘录。', zhEn: 'I jotted down a memo in my notebook.', tokens: [{ text: '노트에다가', role: 'place' }, { text: '메모했어요', role: 'verb' }] },
      { ko: '가방에다 책을 넣었어요', zh: '把书放进包里了。', zhEn: 'I put the book in my bag.', tokens: [{ text: '가방에다', role: 'place' }, { text: '책을', role: 'object' }, { text: '넣었어요', role: 'verb' }] },
      { ko: '냉장고에 음식을 넣어요', zh: '把食物放进冰箱里。', zhEn: 'I put the food in the fridge.', tokens: [{ text: '냉장고에', role: 'place' }, { text: '음식을', role: 'object' }, { text: '넣어요', role: 'verb' }] },
      { ko: '벽에다가 포스터를 붙였어요', zh: '在墙上贴了海报。', zhEn: 'I put up a poster on the wall.', tokens: [{ text: '벽에다가', role: 'place' }, { text: '포스터를', role: 'object' }, { text: '붙였어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + 에다가 → 在……上/里（完整口语形式）', textEn: 'Noun + 에다가 → on/in... (full colloquial form)', examples: '노트에다가 써요 / 가방에다가 넣어요 / 벽에다가 붙여요' },
      { type: 'rule', text: '名词 + 에다 → 缩略形，意思相同', textEn: 'Noun + 에다 → shortened form, same meaning', examples: '노트에다 써요 / 얼굴에다 바르다' },
      { type: 'compare', text: '에다가 vs 에：强调程度不同', textEn: '에다가 vs 에: different levels of emphasis', examples: '에다가 强调"在这个地方操作" / 에 只说明位置', examplesEn: '에다가 emphasizes "operating at this spot" / 에 just states the location' },
      { type: 'usage', text: '常见搭配动词', textEn: 'Common paired verbs', examples: '쓰다（写）/ 붙이다（贴）/ 넣다（放入）/ 바르다（涂）/ 두다（放置）/ 그리다（画）', examplesEn: '쓰다 (write) / 붙이다 (stick) / 넣다 (put in) / 바르다 (apply) / 두다 (place) / 그리다 (draw)' },
      { type: 'note', text: '初学阶段用 에 永远不会错：에다가 只是口语里加强"往这个地方"的语感，可以省略。纠结"到底该不该用 에다가"时，直接用 에 最稳。', textEn: 'At the beginner level, using 에 is never wrong: 에다가 just adds a colloquial sense of "toward this place" and can be omitted. When you\'re unsure whether to use 에다가, sticking with 에 is the safest bet.' },
      { type: 'compare', text: '中文一个"在"，韩语要分两组：往某处"放/写/贴"用 에다가·에（目标）；在某场所"做某动作"用 에서（场所）。别拿"在"硬套。', textEn: 'Chinese has one "at," but Korean splits it into two groups: use 에다가·에 (target) for "put/write/stick" onto somewhere, and 에서 (place) for "doing an action" at a location. Don\'t force the Chinese "at" onto it.', examples: '책상에다가 놓다（放到桌上·目标）✓ / 카페에서 공부하다（在咖啡厅学习·动作场所）✓', examplesEn: '책상에다가 놓다 (put on the desk·target) ✓ / 카페에서 공부하다 (study at a cafe·action place) ✓' },
      { type: 'note', text: '에다가 不用于方向移动，只用于附着/操作', textEn: '에다가 isn\'t used for directional movement, only for attaching/operating', examples: '✗ 학교에다가 가요 → ✓ 학교에 가요（去学校用 에，不用 에다가）', examplesEn: '✗ 학교에다가 가요 → ✓ 학교에 가요 (use 에 for going to school, not 에다가)' },
      { type: 'vocab', text: '常见目标名词', textEn: 'Common target nouns', examples: '노트 / 벽 / 가방 / 냉장고 / 얼굴 / 종이 / 핸드폰' },
      { type: 'example', text: '노트에다가 메모했어요 / 얼굴에다 크림을 발랐어요 / 가방에 책을 넣었어요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '노트에다가', role: 'place' }, { text: '메모했어요', role: 'verb' }], zh: '在笔记本上记了备忘录。', zhEn: 'I jotted down a memo in my notebook.', swapRole: 'place', swapWords: ['노트에다가', '종이에다가', '핸드폰에다가'] },
      { wordBlocks: [{ text: '가방에다', role: 'place' }, { text: '책을', role: 'object' }, { text: '넣었어요', role: 'verb' }], zh: '把书放进包里了。', zhEn: 'I put the book in my bag.', swapRole: 'object', swapWords: ['책을', '물을', '지갑을'] },
      { wordBlocks: [{ text: '벽에다가', role: 'place' }, { text: '포스터를', role: 'object' }, { text: '붙였어요', role: 'verb' }], zh: '在墙上贴了海报。', zhEn: 'I put up a poster on the wall.', swapRole: 'object', swapWords: ['포스터를', '사진을', '메모지를'] },
      { wordBlocks: [{ text: '얼굴에다', role: 'place' }, { text: '크림을', role: 'object' }, { text: '발랐어요', role: 'verb' }], zh: '在脸上涂了面霜。', zhEn: 'I applied face cream on my face.', swapRole: 'place', swapWords: ['얼굴에다', '손에다', '팔에다'] },
    ],
    scenarios: [
      { icon: '📝', context: '记下重要内容', contextEn: 'Jot down important content', ko: '중요한 내용은 노트에다가 꼭 메모해요.', zh: '重要的内容一定要在笔记本上记下来。', zhEn: 'Be sure to write down important things in your notebook.' },
      { icon: '🎒', context: '出门准备', contextEn: 'Getting Ready to Go Out', ko: '가방에다가 물이랑 지갑을 넣었어요.', zh: '把水和钱包放进包里了。', zhEn: 'I put water and my wallet in my bag.' },
      { icon: '🖼️', context: '装饰房间', contextEn: 'Decorating the Room', ko: '방 벽에다가 좋아하는 포스터를 붙였어요.', zh: '在房间墙上贴了喜欢的海报。', zhEn: 'I put up a poster I like on the wall of my room.' },
      { icon: '🧴', context: '护肤步骤', contextEn: 'Skincare Routine', ko: '세수하고 얼굴에다 로션을 발라요.', zh: '洗脸后在脸上涂乳液。', zhEn: 'After washing my face, I apply lotion.' },
      { icon: '🍱', context: '收纳食物', contextEn: 'Storing Food', ko: '남은 음식을 냉장고에다 넣어 두세요.', zh: '把剩下的食物放进冰箱里保存吧。', zhEn: 'Let\'s put the leftover food in the fridge to keep it.' },
      { icon: '✏️', context: '写备注', contextEn: 'Writing Notes', ko: '여기에다가 이름을 써 주세요.', zh: '请在这里写上名字。', zhEn: 'Please write your name here.' },
    ],
    mistakes: [
      { wrong: '학교에다가 가요', correct: '학교에 가요', note: '에다가 不用于移动方向，去某地用 에 就够了。', noteEn: '에다가 is not used for direction of movement; to go somewhere, just use 에.' },
      { wrong: '노트에다가 공부해요', correct: '노트로 공부해요', note: '공부하다 不是"往笔记本上做"的动作，应用 로 表示工具/方式。', noteEn: '공부하다 is not an action of \'doing onto a notebook\'; use 로 to indicate the tool/method.' },
      { wrong: '가방에다가 있어요', correct: '가방에 있어요', note: '存在（있다/없다）用位置助词 에，不用 에다가。', noteEn: 'For existence (있다/없다), use the location particle 에, not 에다가.' },
      { wrong: '벽에다가 가요', correct: '벽으로 가요 또는 벽 쪽으로 가요', note: '에다가 表示附着操作，不表示移动方向。', noteEn: '에다가 indicates an attachment action, not direction of movement.' },
      { wrong: '카페에다가 공부해요', correct: '카페에서 공부해요', note: '中文都说"在咖啡厅"，但"在某场所做动作"必须用 에서；에다가 只用于往某处放/写/贴东西。这是"在"负迁移最常栽的地方。', noteEn: 'In Chinese, we say \'at the café,\' but for \'doing an action at a place,\' you must use 에서; 에다가 is only for putting/writing/sticking something somewhere. This is where negative transfer from \'在\' most often trips people up.' },
    ],
    linkedGrammarIds: ['g4'],
  },
  {
    id: 'card-p7-l06', partNumber: 7, lessonNumber: 6, title: '-지만, -는/은/ㄴ데',
    whatItDoes: '表示"虽然……但是……"的对比转折', whatItDoesEn: 'Expressing contrast: "although... but..."',
    whatItDoesBody: '-지만 是明确的转折连词，相当于"虽然……但是……"。\n-는/은/ㄴ데 语气更柔和，可以是背景铺垫也可以是转折。\n和中文"虽然……但是"对应，-지만 更直接，-는데 更委婉。\n两者都能连接两个句子，但 -지만 转折感更强。', whatItDoesBodyEn: '-지만 is a clear contrastive conjunction, equivalent to "although... but...".\\n-는/은/ㄴ데 is softer; it can set background or show contrast.\\nCorresponding to Chinese "although... but," -지만 is more direct, -는데 is more euphemistic.\\nBoth connect two clauses, but -지만 has a stronger contrastive feel.',
    structureNote: '下面展示两种转折的典型句型。\n-지만 直接加在动词/形容词词干后，不看收音。\n-는/은/ㄴ데 的变形规则参考第3课。', structureNoteEn: 'Below are typical patterns for both types of contrast.\\n-지만 attaches directly to verb/adjective stems, regardless of final consonant.\\nFor -는/은/ㄴ데 conjugation rules, refer to Lesson 3.',
    rulesNote: '-지만：所有动词/形容词词干 + 지만（不看收音）。\n이다 → 이지만 / 아니다 → 아니지만。\n-지만 语气明确，两个分句形成直接对比。\n-는데 语气柔和，更适合日常对话。', rulesNoteEn: '-지만: all verb/adjective stems + 지만 (regardless of final consonant).\\n이다 → 이지만 / 아니다 → 아니지만.\\n-지만 is clear-cut, forming a direct contrast between clauses.\\n-는데 is softer, better for everyday conversation.',
    scenarioNote: '表达矛盾心理、做对比评价时必用。\n"喜欢但贵""好吃但辣"这类日常表达全靠 -지만 或 -는데。', scenarioNoteEn: 'Essential for expressing mixed feelings or comparative judgments.\\nEveryday phrases like "like it but it\'s expensive" or "tasty but spicy" rely on -지만 or -는데.',
    step0Html: `<div class="card-title">-지만 · -는/은/ㄴ데</div>
<div class="card-body">两种转折表达：-지만 直接明确，-는데 柔和委婉。一个句子里"虽然……但是"，选哪个取决于你想传递的语气。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">同一个意思，两种语气</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-지만（明确转折）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비싸지만 사고 싶어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">虽然贵，但是想买。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-는데（柔和铺垫）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">피곤한데 잠이 안 와요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">虽然累，但是睡不着。</div>
    </div>
  </div>
</div>
<div class="reminder-box">-지만 词干直接加，不看收音。名词后用 이지만：학생이지만 ✓，학생지만 ✗。</div>`,
    compareHtml: `<div class="card-title">-지만（强转折）vs -는/은/ㄴ데（柔和转折）</div>
<div class="card-body">两者都能表示转折，但 -지만 对比感强，-는데 语气轻，还可以只是铺垫背景。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-지만 → 明确转折，强对比</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词/形容词词干 + 지만（不看收音）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비싸지만 좋아요.</span><span style="font-size:16px;color:#5a4640">虽然贵，但好。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">어렵지만 재미있어요.</span><span style="font-size:16px;color:#5a4640">虽然难，但有趣。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">학생이지만 일해요.</span><span style="font-size:16px;color:#5a4640">虽然是学生，但在工作。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는/은/ㄴ데 → 柔和转折 / 背景铺垫</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词→-는데 / 形容词→-(으)ㄴ데 / 过去→-았는데</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">맛있는데 매워요.</span><span style="font-size:16px;color:#5a4640">好吃，但是辣。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">피곤한데 잠이 안 와요.</span><span style="font-size:16px;color:#5a4640">虽然累，但睡不着。</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">选哪个？</div>
  <div style="font-size:16px;color:#5a4640">写作、正式表达 → 用 -지만（对比明确）</div>
  <div style="margin-top:4px;font-size:16px;color:#5a4640">日常聊天、委婉表达 → 用 -는데（语气轻）</div>
</div>
<div class="reminder-box">两个分句主语可以不同：저는 좋지만 친구는 싫어해요（我喜欢但朋友不喜欢）。-지만 不限制主语是否相同。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的转折/背景连接词', titleEn: 'Choose the correct contrast/background connector',
      body: '根据前后句关系选择 -지만 或 -는/은/ㄴ데。', bodyEn: 'Choose -지만 or -는/은/ㄴ데 based on the relationship between the clauses.',
      questions: [
        {
          pre: '한국어는 어렵',
          post: '재미있어요.',
          options: ['아서', '지만', '은데'],
          answer: 1,
          explanation: '-지만 表示明确转折："韩语虽然难，但有趣。"', explanationEn: '-지만 indicates a clear contrast: \'Korean is hard, but it\'s fun.\'',
        },
        {
          pre: '밖에 비가 오',
          post: '우산을 가져가세요.',
          options: ['는데', '면', '지만'],
          answer: 0,
          explanation: '-는데 提供背景信息："外面在下雨，请带伞。"', explanationEn: '-는데 provides background info: \'It\'s raining outside, so take an umbrella.\'',
        },
        {
          pre: '값은 비싸',
          post: '품질이 좋아요.',
          options: ['서', '니까', '지만'],
          answer: 2,
          explanation: '-지만 表转折："价格虽然贵，但质量好。"서/니까 都表原因（"因为贵所以质量好"逻辑不通）。', explanationEn: '-지만 shows contrast: \'The price is high, but the quality is good.\' 서/니까 both indicate cause (\'because it\'s expensive, the quality is good\' doesn\'t make sense).',
        },
        {
          pre: '생각해 봤',
          post: '좋은 생각인 것 같아요.',
          options: ["지만", "는데", "어서"],
          answer: 1,
          explanation: '-는데 提供背景："我想了想，觉得是个好主意。"', explanationEn: '-는데 provides background: \'I thought about it, and I think it\'s a good idea.\'',
        },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 7 章 第 6 课 · 已完成</div>
    <div class="ov-hero-title">-지만 · -는/은/ㄴ데</div>
    <div class="ov-hero-sub">明确转折 · 柔和铺垫 · 虽然但是</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">变形速查</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">-지만</span>：词干 + 지만（가지만 / 먹지만 / 좋지만 / 학생이지만）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">-는/은/ㄴ데</span>：动词→-는데 / 形容词→-(으)ㄴ데 / 过去→-았는데</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">비싸지만 사고 싶어요</span></div><div class="struct-zh">虽然贵，但想买。</div></div>
        <div><div class="tok-row"><span class="tok t-v">맛있지만 매워요</span></div><div class="struct-zh">虽然好吃，但是辣。</div></div>
        <div><div class="tok-row"><span class="tok t-v">피곤한데 잠이 안 와요</span></div><div class="struct-zh">虽然累，但睡不着。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">비싸이지만</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">비싸지만</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학생지만</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학생이지만</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '비싸지만 사고 싶어요', zh: '虽然贵，但是想买。', zhEn: 'It\'s expensive, but I want to buy it.', tokens: [{ text: '비싸지만', role: 'plain' }, { text: '사고 싶어요', role: 'verb' }] },
      { ko: '맛있지만 매워요', zh: '虽然好吃，但是辣。', zhEn: 'It\'s delicious, but it\'s spicy.', tokens: [{ text: '맛있지만', role: 'plain' }, { text: '매워요', role: 'verb' }] },
      { ko: '한국어는 어렵지만 재미있어요', zh: '韩语虽然难，但是有趣。', zhEn: 'Korean is hard, but it\'s fun.', tokens: [{ text: '한국어는', role: 'subject' }, { text: '어렵지만', role: 'plain' }, { text: '재미있어요', role: 'verb' }] },
      { ko: '피곤한데 잠이 안 와요', zh: '虽然累，但是睡不着。', zhEn: 'I\'m tired, but I can\'t sleep.', tokens: [{ text: '피곤한데', role: 'plain' }, { text: '잠이', role: 'subject' }, { text: '안 와요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + 지만（不看收音）', textEn: 'Verb/adjective stem + 지만 (regardless of the final consonant).', examples: '가다→가지만 / 먹다→먹지만 / 크다→크지만 / 좋다→좋지만' },
      { type: 'rule', text: '이다 → 이지만 / 명사 + 이지만', examples: '학생이지만 / 한국 사람이지만' },
      { type: 'rule', text: '-지만 过去时：词干末元音 ㅏ/ㅗ + 았지만 / 其他 + 었지만 / 하다 → 했지만', textEn: '-지만 past tense: stem ending in ㅏ/ㅗ + 았지만 / others + 었지만 / 하다 → 했지만', examples: '갔지만 / 먹었지만 / 공부했지만' },
      { type: 'rule', text: '-는/은/ㄴ데 变形：动词词干 + 는데 / 形容词有收音 + 은데 / 无收音 + ㄴ데 / 名词 + 인데', textEn: '-는/은/ㄴ데 conjugation: verb stem + 는데 / adjective with final consonant + 은데 / without final consonant + ㄴ데 / noun + 인데', examples: '가다→가는데 / 먹다→먹는데 / 작다→작은데 / 크다→큰데 / 학생→학생인데' },
      { type: 'rule', text: '-는/은/ㄴ데 过去时：词干末元音 ㅏ/ㅗ + 았는데 / 其他 + 었는데 / 하다 → 했는데', textEn: '-는/은/ㄴ데 past tense: stem ending in ㅏ/ㅗ + 았는데 / others + 었는데 / 하다 → 했는데', examples: '갔는데 / 먹었는데 / 공부했는데' },
      { type: 'compare', text: '-지만 vs -는데：转折强度不同', textEn: '-지만 vs -는데: different levels of contrast', examples: '-지만：明确转折，强对比 / -는데：柔和铺垫，可转折可背景', examplesEn: '-지만: clear contrast, strong opposition / -는데: soft setup, can contrast or provide background' },
      { type: 'usage', text: '-지만 常见句型：A하지만 B', textEn: '-지만 common pattern: A하지만 B', examples: '비싸지만 좋아요 / 작지만 귀여워요 / 힘들지만 즐거워요' },
      { type: 'usage', text: '-는/은/ㄴ데 用于委婉转折（参考第3课变形规则）', textEn: '-는/은/ㄴ데 for polite contrast (see Lesson 3 conjugation rules)', examples: '맛있는데 매워요 / 좋은데 비싸요 / 갔는데 없었어요' },
      { type: 'note', text: '两个分句主语可以相同也可以不同', textEn: 'The subjects of the two clauses can be the same or different', examples: '저는 좋지만 친구는 싫어해요（主语不同）', examplesEn: '저는 좋지만 친구는 싫어해요 (different subjects)' },
      { type: 'note', text: '-는데 很多时候根本不是"但是"，而是先给个背景再提问/请求，中文没有对应词，往往整句不译出来。这种句子换成 -지만 会很别扭。', textEn: '-는데 often isn\'t \'but\' at all—it gives background before a question/request. Chinese has no equivalent, so it\'s often left untranslated. Replacing it with -지만 would sound awkward.', examples: '지금 시간 있는데 커피 한잔 할래요?（现在有空，要不要喝杯咖啡？）/ 여기 처음 왔는데 뭐가 맛있어요?（第一次来这儿，什么好吃？）', examplesEn: '지금 시간 있는데 커피 한잔 할래요? (Got time now, want to grab a coffee?) / 여기 처음 왔는데 뭐가 맛있어요? (First time here, what\'s good?)' },
      { type: 'compare', text: '想不出"但是"该用哪个时：真·对比矛盾（贵却想买）→ 지만；只是铺个背景/引出下文 → 는데。', textEn: 'When unsure which to use: real contrast/contradiction (expensive but want to buy) → 지만; just setting background/leading in → 는데.', examples: '비싸지만 샀어요（矛盾对比）/ 백화점에 갔는데 문을 닫았어요（先说去了，再说结果·铺背景）', examplesEn: '비싸지만 샀어요 (contradictory contrast) / 백화점에 갔는데 문을 닫았어요 (first say went, then result·background)' },
      { type: 'example', text: '비싸지만 사고 싶어요 / 맛있는데 너무 매워요 / 한국어가 어렵지만 재미있어요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '비싸지만', role: 'plain' }, { text: '사고 싶어요', role: 'verb' }], zh: '虽然贵，但是想买。', zhEn: 'It\'s expensive, but I want to buy it.', swapRole: 'plain', swapWords: ['비싸지만', '작지만', '어렵지만'] },
      { wordBlocks: [{ text: '맛있지만', role: 'plain' }, { text: '매워요', role: 'verb' }], zh: '虽然好吃，但是辣。', zhEn: 'It\'s delicious, but it\'s spicy.', swapRole: 'verb', swapWords: ['매워요', '비싸요', '양이 적어요'] },
      { wordBlocks: [{ text: '한국어는', role: 'subject' }, { text: '어렵지만', role: 'plain' }, { text: '재미있어요', role: 'verb' }], zh: '韩语虽然难，但是有趣。', zhEn: 'Korean is hard, but it\'s fun.', swapRole: 'subject', swapWords: ['한국어는', '이 드라마는', '이 노래는'] },
      { wordBlocks: [{ text: '피곤한데', role: 'plain' }, { text: '잠이', role: 'subject' }, { text: '안 와요', role: 'verb' }], zh: '虽然累，但是睡不着。', zhEn: 'I\'m tired, but I can\'t sleep.', swapRole: 'plain', swapWords: ['피곤한데', '배고픈데', '바쁜데'] },
    ],
    scenarios: [
      { icon: '🛍️', context: '纠结要不要买', contextEn: 'Torn over whether to buy', ko: '이 옷 너무 비싸지만 정말 갖고 싶어요.', zh: '这件衣服虽然很贵，但真的很想要。', zhEn: 'This outfit is expensive, but I really want it.' },
      { icon: '🍜', context: '推荐但有提醒', contextEn: 'Recommendation with a warning', ko: '이 라면은 맛있지만 많이 매우니까 조심하세요.', zh: '这个拉面好吃，但是很辣，请小心。', zhEn: 'This ramen is tasty, but it\'s spicy—be careful.' },
      { icon: '📚', context: '学习感受', contextEn: 'Learning experience', ko: '한국어가 어렵지만 포기하고 싶지 않아요.', zh: '韩语虽然难，但是不想放弃。', zhEn: 'Korean is hard, but I don\'t want to give up.' },
      { icon: '😴', context: '失眠烦恼', contextEn: 'Insomnia troubles', ko: '피곤한데 잠이 안 와요. 스트레스 때문인 것 같아요.', zh: '虽然累，但睡不着。好像是压力的原因。', zhEn: 'I\'m tired but can\'t sleep. Probably stress.' },
      { icon: '🎵', context: '评价一首歌', contextEn: 'Reviewing a song', ko: '이 노래는 좋은데 가사가 너무 슬퍼요.', zh: '这首歌很好，但是歌词太悲伤了。', zhEn: 'This song is great, but the lyrics are too sad.' },
      { icon: '🏃', context: '运动矛盾', contextEn: 'Exercise dilemma', ko: '운동하기 싫지만 건강을 위해서 해요.', zh: '虽然不想运动，但为了健康还是做。', zhEn: 'I don\'t want to exercise, but I do it for my health.' },
    ],
    mistakes: [
      { wrong: '비싸이지만', correct: '비싸지만', note: '形容词/动词词干直接加 -지만，不需要插入 이。', noteEn: 'Add -지만 directly to the adjective/verb stem—no need to insert 이.' },
      { wrong: '학생지만', correct: '학생이지만', note: '名词后面需要 이지만（이다 的词干是 이）。', noteEn: 'After a noun, use 이지만 (the stem of 이다 is 이).' },
      { wrong: '맛있지만, 매워요', correct: '맛있지만 매워요', note: '-지만 连接两个分句，中间不需要逗号，是一个连续的句子。', noteEn: '-지만 connects two clauses into one continuous sentence without a comma.' },
      { wrong: '좋지만 사요', correct: '좋지만 안 사요 / 좋아서 사요', note: '转折的两个分句要有逻辑对比，"好但买"不构成转折，应改为因果（좋아서）或换后半句。', noteEn: 'The two clauses in a contrast must have a logical opposition; "good but buy" isn\'t a contrast—use a cause (좋아서) or change the second clause.' },
      { wrong: '여기 처음 왔지만 뭐가 맛있어요?', correct: '여기 처음 왔는데 뭐가 맛있어요?', note: '这里不是转折，是"先铺背景再提问"，必须用 -는데。凡是后半句要提问或请求的铺垫句，几乎都用 -는데 而不是 -지만。', noteEn: 'This isn\'t a contrast but "setting the scene before asking," so you must use -는데. Almost any lead-in clause followed by a question or request uses -는데, not -지만.' },
    ],
    linkedGrammarIds: ['g22', 'g26'],
  },
  {
    id: 'card-p7-l07', partNumber: 7, lessonNumber: 7, title: '-(으)니까, -느라고',
    whatItDoes: '说明原因——"因为……所以……"的两种方式', whatItDoesEn: 'Explaining reasons: two ways to say "because... so..."',
    whatItDoesBody: '-(으)니까 是最常用的原因连词，后句可以是命令、建议、请求。\n-느라고 强调"因为忙于做A，所以B受影响"，带有轻微的遗憾或解释意味。\n和中文"因为"对应，但 -느라고 只用于说明为何没能做另一件事，有负面结果含义。', whatItDoesBodyEn: '-(으)니까 is the most common reason connector; the following clause can be a command, suggestion, or request.\\n-느라고 emphasizes "because I was busy doing A, B was affected," with a slight sense of regret or explanation.\\nCorresponding to Chinese "because," but -느라고 is only used to explain why one couldn\'t do something else, implying a negative outcome.',
    structureNote: '下面展示两种原因表达的句型框架。\n注意：-느라고 的后句通常是负面结果或遗憾，不能用命令/建议句。', structureNoteEn: 'Below are the sentence patterns for both reason expressions.\\nNote: the clause after -느라고 is usually a negative result or regret; it cannot be a command or suggestion.',
    rulesNote: '-(으)니까：词干有收音 + 으니까，无收音 + 니까。\nㄹ 词干脱落 ㄹ 后加 니까（알다→아니까）。\n-느라고：只接动词词干（形容词不能用）+ 느라고，不看收音。\n-느라고 的主语前后句必须一致。', rulesNoteEn: '-(으)니까: stem with final consonant + 으니까, without + 니까.\\nㄹ stems drop ㄹ and add 니까 (알다→아니까).\\n-느라고: only verb stems (not adjectives) + 느라고, regardless of final consonant.\\nThe subject must be the same in both clauses with -느라고.',
    scenarioNote: '解释为什么迟到、为什么没做作业、为什么没接电话——全都用 -(으)니까 或 -느라고。\n-느라고 特别适合解释"忙于某事导致忘了/没能做另一件事"的场景。', scenarioNoteEn: 'Explaining why you were late, didn\'t do homework, or didn\'t answer the phone—all use -(으)니까 or -느라고.\\n-느라고 is especially suited for explaining "I was busy with something, so I forgot/couldn\'t do another thing."',
    step0Html: `<div class="card-title">-(으)니까 · -느라고</div>
<div class="card-body">两种"因为"：-(으)니까 最通用，后面可接命令建议；-느라고 专门解释"忙于A导致B没能做"。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">两种原因，用法不同</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-(으)니까（通用原因）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비가 오니까 우산을 챙겨요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">因为下雨，所以带伞。（可接建议）</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-느라고（忙于A导致B）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">공부하느라고 전화를 못 받았어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">因为在学习，没能接电话。（负面结果）</div>
    </div>
  </div>
</div>
<div class="reminder-box">-느라고 后面不能接命令句：공부하느라고 공부하세요 ✗。-느라고 前后句主语必须相同。</div>`,
    compareHtml: `<div class="card-title">-(으)니까 vs -느라고</div>
<div class="card-body">同样说"因为"，但两者有严格的使用限制。搞清楚三个关键差异就不会用错。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)니까 → 通用原因，后句无限制</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词/形容词词干 + (으)니까</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">배고프니까 먹어요.</span><span style="font-size:16px;color:#5a4640">因为饿，所以吃。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">피곤하니까 일찍 자세요.</span><span style="font-size:16px;color:#5a4640">因为累，请早睡。（可接命令）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-느라고 → 忙于A，导致B受影响</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词词干 + 느라고（不接形容词，主语必须相同）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">공부하느라고 못 잤어요.</span><span style="font-size:16px;color:#5a4640">因为在学习，没能睡觉。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">일하느라고 많이 피곤해요.</span><span style="font-size:16px;color:#5a4640">因为工作，很累。</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">三个关键差异</div>
  <div style="font-size:16px;color:#5a4640">① 后句类型：-(으)니까 可接命令/建议，-느라고 只接陈述（负面结果）</div>
  <div style="margin-top:4px;font-size:16px;color:#5a4640">② 词性：-느라고 只接动词，形容词不能用</div>
  <div style="margin-top:4px;font-size:16px;color:#5a4640">③ 主语：-느라고 前后句主语必须相同</div>
</div>
<div class="reminder-box">피곤하느라고 ✗（피곤하다 是形容词）→ 피곤하니까 ✓。먹으느라고 ✗ → 먹느라고 ✓（느라고 直接加词干，不加 으）。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的原因表达', titleEn: 'Choose the correct reason expression',
      body: '根据句意选择 -(으)니까 或 -느라고。', bodyEn: 'Choose -(으)니까 or -느라고 based on the meaning.',
      questions: [
        {
          pre: '날씨가 추우',
          post: '코트를 입으세요.',
          options: ["니까", "느라고", "면"],
          answer: 0,
          explanation: '-(으)니까 表原因/命令依据："天气冷，请穿大衣。"', explanationEn: '-(으)니까 expresses reason/basis for a command: "It\'s cold, so please wear a coat."',
        },
        {
          pre: '시험 공부하',
          post: '잠을 못 잤어요.',
          options: ["니까", "면", "느라고"],
          answer: 2,
          explanation: '-느라고 表示"因为忙于……（导致负面结果）"：因为忙着复习考试，没睡好。', explanationEn: '-느라고 means "because busy doing... (leading to a negative result)": Because I was busy studying for the exam, I didn\'t sleep well.',
        },
        {
          pre: '배가 고프',
          post: '먹으러 가요.',
          options: ["니까", "느라고", "면서"],
          answer: 0,
          explanation: '-(으)니까 原因："肚子饿了，去吃饭吧。"', explanationEn: '-(으)니까 reason: "I\'m hungry, so let\'s go eat."',
        },
        {
          pre: '아침에 늦잠을 자',
          post: '지각했어요.',
          options: ["려고", "느라고", "거나"],
          answer: 1,
          explanation: '-느라고 表示"忙于做某事（睡懒觉）导致负面结果（迟到）"。려고（为了）表目的、거나（或者）表选择，都不合此处的因果。', explanationEn: '-느라고 means "busy doing something (sleeping in) leading to a negative result (being late)." 려고 (in order to) shows purpose and 거나 (or) shows choice—neither fits the cause here.',
        },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 7 章 第 7 课 · 已完成</div>
    <div class="ov-hero-title">-(으)니까 · -느라고</div>
    <div class="ov-hero-sub">通用原因 · 忙于A导致B · 三个关键差异</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">变形规则</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">-(으)니까</span>：有收音+으니까 / 无收音+니까 / ㄹ词干脱落后+니까</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">-느라고</span>：动词词干+느라고（不看收音，不接形容词）</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">비가 오니까 우산을 챙겨요</span></div><div class="struct-zh">因为下雨，带伞吧。</div></div>
        <div><div class="tok-row"><span class="tok t-v">공부하느라고 전화를 못 받았어요</span></div><div class="struct-zh">因为在学习，没能接电话。</div></div>
        <div><div class="tok-row"><span class="tok t-v">게임하느라고 숙제를 못 했어요</span></div><div class="struct-zh">因为在玩游戏，没做作业。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">피곤하느라고 못 잤어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">피곤하니까 못 잤어요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">먹으느라고</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">먹느라고</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '배가 고프니까 밥을 먹어요', zh: '因为饿，所以吃饭。', zhEn: 'Because I\'m hungry, I eat.', tokens: [{ text: '배가', role: 'subject' }, { text: '고프니까', role: 'plain' }, { text: '밥을', role: 'object' }, { text: '먹어요', role: 'verb' }] },
      { ko: '비가 오니까 우산을 챙겨요', zh: '因为下雨，所以带伞。', zhEn: 'Because it\'s raining, I bring an umbrella.', tokens: [{ text: '비가', role: 'subject' }, { text: '오니까', role: 'plain' }, { text: '우산을', role: 'object' }, { text: '챙겨요', role: 'verb' }] },
      { ko: '공부하느라고 전화를 못 받았어요', zh: '因为在学习，所以没能接电话。', zhEn: 'Because I was studying, I couldn\'t answer the phone.', tokens: [{ text: '공부하느라고', role: 'plain' }, { text: '전화를', role: 'object' }, { text: '못 받았어요', role: 'verb' }] },
      { ko: '아르바이트하느라고 많이 피곤해요', zh: '因为在打工，所以很累。', zhEn: 'Because I was working part-time, I\'m very tired.', tokens: [{ text: '아르바이트하느라고', role: 'plain' }, { text: '많이', role: 'plain' }, { text: '피곤해요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '词干 无收音 + 니까 / 有收音 + 으니까', textEn: 'Stem without batchim + 니까 / with batchim + 으니까', examples: '가다→가니까 / 먹다→먹으니까 / 좋다→좋으니까' },
      { type: 'rule', text: '名词 有收音 + 이니까 / 名词 无收音 + 니까', textEn: 'Noun with batchim + 이니까 / noun without batchim + 니까', examples: '학생이니까 / 의사이니까 / 친구니까 / 선생님이니까' },
      { type: 'rule', text: '未来时：词干 有收音 + 을 거니까 / 无收音 + ㄹ 거니까', textEn: 'Future: stem with batchim + 을 거니까 / without batchim + ㄹ 거니까', examples: '먹을 거니까 / 갈 거니까 / 바쁠 거니까' },
      { type: 'rule', text: '过去时：词干末元音 ㅏ/ㅗ + 았으니까 / 其他 + 었으니까 / 하다 → 했으니까', textEn: 'Past: stem ending in ㅏ/ㅗ + 았으니까 / others + 었으니까 / 하다 → 했으니까', examples: '갔으니까 / 먹었으니까 / 공부했으니까' },
      { type: 'rule', text: 'ㄹ 词干：脱落 ㄹ 后 + 니까', textEn: 'ㄹ stems: drop ㄹ then add 니까', examples: '알다→아니까 / 만들다→만드니까 / 멀다→머니까' },
      { type: 'rule', text: '动词词干 + 느라고（不看收音，只接动词）', textEn: 'Verb stem + 느라고 (no batchim rule, only attaches to verbs)', examples: '공부하다→공부하느라고 / 일하다→일하느라고 / 먹다→먹느라고' },
      { type: 'compare', text: '-(으)니까 vs -느라고', examples: '-(으)니까：可接命令/建议 / -느라고：后句是负面结果，不接命令/建议', examplesEn: '-(으)니까: can be followed by commands/suggestions / -느라고: the following clause is a negative result, no commands/suggestions' },
      { type: 'compare', text: '-(으)니까 vs -아/어서（都译"因为"，中文分不出）：想让对方去做某事（命令/建议/请求）时只能用 -(으)니까，-아/어서 后句只能是陈述，不能接命令。', textEn: '-(으)니까 vs -아/어서 (both translate as "because," indistinguishable in Chinese): when you want the other person to do something (command/suggestion/request), only -(으)니까 works; -아/어서 can only be followed by a statement, not a command.', examples: '비가 오니까 우산을 챙기세요 ✓（劝对方带伞）/ 비가 와서 우산을 챙기세요 ✗（아/어서 不能接命令）', examplesEn: '비가 오니까 우산을 챙기세요 ✓ (advising someone to bring an umbrella) / 비가 와서 우산을 챙기세요 ✗ (아/어서 can\'t be followed by a command)' },
      { type: 'usage', text: '-느라고 的后句特征：못 하다 / 늦다 / 피곤하다 등 负面结果', textEn: '-느라고\'s following clause features: 못 하다 / 늦다 / 피곤하다 etc.—negative results', examples: '자느라고 못 일어났어요 / 공부하느라고 늦었어요' },
      { type: 'note', text: '-느라고 前后句主语必须相同', textEn: 'The subject of both clauses with -느라고 must be the same.', examples: '✗ 내가 바쁘느라고 친구가 기다렸어요 → ✓ 내가 바빠서 친구가 기다렸어요' },
      { type: 'example', text: '피곤하니까 일찍 자요 / 늦었으니까 빨리 가요 / 청소하느라고 못 봤어요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '배가', role: 'subject' }, { text: '고프니까', role: 'plain' }, { text: '먹어요', role: 'verb' }], zh: '因为饿，所以吃。', zhEn: 'Because I\'m hungry, I eat.', swapRole: 'plain', swapWords: ['고프니까', '아프니까', '피곤하니까'] },
      { wordBlocks: [{ text: '비가', role: 'subject' }, { text: '오니까', role: 'plain' }, { text: '집에 있어요', role: 'verb' }], zh: '因为下雨，所以在家。', zhEn: 'Because it\'s raining, I\'m staying home.', swapRole: 'verb', swapWords: ['집에 있어요', '우산을 챙겨요', '나가지 마세요'] },
      { wordBlocks: [{ text: '공부하느라고', role: 'plain' }, { text: '전화를', role: 'object' }, { text: '못 받았어요', role: 'verb' }], zh: '因为在学习，没能接电话。', zhEn: 'I couldn\'t answer the phone because I was studying.', swapRole: 'plain', swapWords: ['공부하느라고', '일하느라고', '자느라고'] },
      { wordBlocks: [{ text: '게임하느라고', role: 'plain' }, { text: '숙제를', role: 'object' }, { text: '못 했어요', role: 'verb' }], zh: '因为在玩游戏，没做作业。', zhEn: 'I didn\'t do my homework because I was playing games.', swapRole: 'plain', swapWords: ['게임하느라고', '요리하느라고', '청소하느라고'] },
    ],
    scenarios: [
      { icon: '☔', context: '建议带伞', contextEn: 'Suggest bringing an umbrella', ko: '비가 오니까 우산을 꼭 챙기세요.', zh: '因为下雨，一定要带伞。', zhEn: 'Because it\'s raining, you must bring an umbrella.' },
      { icon: '😴', context: '解释没接电话', contextEn: 'Explain not answering the phone', ko: '자느라고 전화를 못 받았어요. 미안해요.', zh: '因为在睡觉，没能接电话。对不起。', zhEn: 'I couldn\'t answer the phone because I was sleeping. Sorry.' },
      { icon: '⏰', context: '解释迟到', contextEn: 'Explain being late', ko: '길이 막히니까 조금 늦을 것 같아요.', zh: '因为堵车，好像会晚一点到。', zhEn: 'Because of traffic, I might arrive a bit late.' },
      { icon: '📚', context: '解释没做作业', contextEn: 'Explain not doing homework', ko: '아르바이트하느라고 숙제를 못 했어요.', zh: '因为在打工，没能做作业。', zhEn: 'I couldn\'t do my homework because I was working part-time.' },
      { icon: '🍽️', context: '建议吃饭', contextEn: 'Suggest eating', ko: '배고프니까 밥 먼저 먹어요.', zh: '因为饿了，先吃饭吧。', zhEn: 'Since I\'m hungry, let\'s eat first.' },
      { icon: '💪', context: '解释很累', contextEn: 'Explain being tired', ko: '운동하느라고 많이 피곤해요.', zh: '因为在运动，很累。', zhEn: 'I\'m tired because I was exercising.' },
    ],
    mistakes: [
      { wrong: '피곤하느라고 못 잤어요', correct: '피곤하니까 못 잤어요', note: '-느라고 只接动词，피곤하다 是形容词，要用 -(으)니까。', noteEn: '-느라고 only attaches to verbs; 피곤하다 is an adjective, so use -(으)니까.' },
      { wrong: '공부하느라고 공부하세요', correct: '공부하니까 집중하세요', note: '-느라고 后句不能是命令句，要换成 -(으)니까。', noteEn: 'The second clause after -느라고 can\'t be a command; switch to -(으)니까.' },
      { wrong: '내가 바쁘느라고 친구가 기다렸어요', correct: '내가 바빠서 친구가 기다렸어요', note: '-느라고 前后句主语必须相同，主语不同时用 -아/어서。', noteEn: 'The subjects before and after -느라고 must be the same; if different, use -아/어서.' },
      { wrong: '먹으느라고', correct: '먹느라고', note: '-느라고 直接加在动词词干后，不需要加 으。', noteEn: '-느라고 attaches directly to the verb stem without adding 으.' },
      { wrong: '늦어서 빨리 오세요', correct: '늦으니까 빨리 오세요', note: '后句是命令/请求（빨리 오세요）时，"因为"只能用 -(으)니까，不能用 -아/어서。这是中文"因为"最容易带偏的地方。', noteEn: 'When the second clause is a command/request (like 빨리 오세요), "because" can only use -(으)니까, not -아/어서. This is where Chinese "because" most easily leads you astray.' },
    ],
    linkedGrammarIds: ['g24'],
  },
  {
    id: 'card-p7-l08', partNumber: 7, lessonNumber: 8, title: '때문에, -거든요',
    whatItDoes: '说明原因或给出解释性补充', whatItDoesEn: 'Explaining reasons or giving explanatory additions',
    whatItDoesBody: '때문에 接在名词或动词后，表示"因为……的缘故"，语气较正式。\n-거든요 用在句尾，给对方提供解释或补充说明，语气轻松，像在说"其实是因为……"。\n和中文"是因为……""其实啊……"对应，-거든요 带有轻微的解释语气，常用于口语。', whatItDoesBodyEn: '때문에 attaches to nouns or verbs, meaning "because of," and is more formal.\\n-거든요 is used at the end of a sentence to provide an explanation or additional info, with a light tone, like saying "actually, it\'s because...".\\nCorresponding to Chinese "it\'s because..." or "actually...", -거든요 has a slight explanatory nuance and is common in speech.',
    structureNote: '下面展示两种原因说明的句型框架。\n때문에 可接名词（名词 + 때문에）或动词（-기 때문에），-거든요 直接加在句尾。', structureNoteEn: 'Below are the sentence patterns for both reason explanations.\\n때문에 can follow a noun (noun + 때문에) or a verb (-기 때문에); -거든요 attaches directly to the end of a sentence.',
    rulesNote: '名词 + 때문에（因为某事物）。\n动词/形容词 词干 + 기 때문에（因为做某事/某状态）。\n-거든요：词干 + 거든요，不看收音，陈述解释理由。\n-거든요 语气轻，不适合正式场合。', rulesNoteEn: 'Noun + 때문에 (because of something).\\nVerb/adjective stem + 기 때문에 (because of doing something/being in a state).\\n-거든요: stem + 거든요, regardless of final consonant, states a reason.\\n-거든요 is light and not suitable for formal situations.',
    scenarioNote: '때문에 适合写作和正式解释，-거든요 适合日常聊天中的轻松说明。\n对方问你为什么迟到，口语回答用 -거든요；写请假条用 때문에。', scenarioNoteEn: '때문에 suits writing and formal explanations; -거든요 suits casual explanations in everyday chat.\\nIf someone asks why you\'re late, answer with -거든요 in speech; use 때문에 in a written leave note.',
    step0Html: `<div class="card-title">때문에 · -거든요</div>
<div class="card-body">两种"原因说明"：때문에 正式书面，-거든요 口语轻松补充。一个用于写作，一个用于聊天。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">同样说原因，语气不同</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">때문에（正式）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">스트레스 때문에 잠을 못 자요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">因为压力睡不着觉。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-거든요（口语补充）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">사실 피곤하거든요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">其实是因为很累。（轻松解释）</div>
    </div>
  </div>
</div>
<div class="reminder-box">-거든요 是解释补充，后面不能接命令句：피곤하거든요 쉬세요 ✗ → 피곤하니까 쉬세요 ✓。</div>`,
    compareHtml: `<div class="card-title">때문에 vs -거든요</div>
<div class="card-body">两者都说"因为/原因"，但使用场合和语气完全不同。写作用 때문에，聊天用 -거든요。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">때문에 → 正式原因说明</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">名词+때문에 / 动词+기 때문에</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">날씨 때문에 못 갔어요.</span><span style="font-size:16px;color:#5a4640">因为天气没能去。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">바쁘기 때문에 못 해요.</span><span style="font-size:16px;color:#5a4640">因为忙没办法做。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-거든요 → 口语补充解释</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词/形容词词干 + 거든요（放句尾）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사실 그 노래 알거든요.</span><span style="font-size:16px;color:#5a4640">其实我知道那首歌呢。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">저 한국어 배우거든요.</span><span style="font-size:16px;color:#5a4640">我在学韩语呢。</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0">
  <div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">-거든요 的语感</div>
  <div style="font-size:16px;color:#5a4640">-거든요 常与 사실（其实）搭配，带有"我来告诉你一个你可能不知道的理由"的语感。</div>
  <div style="margin-top:4px;font-size:16px;color:#5a4640">사실 저 그 사람 알거든요. → "其实我认识那个人，（所以我知道……）"</div>
</div>
<div class="reminder-box">때문에 需要前有名词或 -기：때문에 가요 ✗ → 그것 때문에 가요 ✓。-거든요 不能后接命令句，需换成 -(으)니까。</div>`,    specialQuiz: {
      type: 'fill',
      title: '选择正确的原因/说明表达', titleEn: 'Choose the correct reason/explanatory expression',
      body: '根据句意选择 때문에 或 -거든요。', bodyEn: 'Choose 때문에 or -거든요 based on the meaning.',
      questions: [
        {
          pre: '비',
          post: '소풍이 취소됐어요.',
          options: ['라서', '때문에', '거든요'],
          answer: 1,
          explanation: 'N 때문에 = "因为……"：因为下雨，郊游取消了。', explanationEn: 'N 때문에 = "because of...": The picnic was canceled because of the rain.',
        },
        {
          pre: '왜 한국어를 공부해요? — 케이팝을 좋아하',
          post: '.',
          options: ['거든요', '때문이에요', '려고요'],
          answer: 0,
          explanation: '-거든요 句末说明原因："因为我喜欢K-pop啊。"때문이에요 前面要名词（动词干 좋아하 不能直接接），려고요 表打算（答非所问）。', explanationEn: '-거든요 at the end of a sentence explains a reason: "Because I like K-pop." 때문이에요 needs a noun before it (the verb stem 좋아하 can\'t attach directly), and 려고요 indicates intention (doesn\'t answer the question).',
        },
        {
          pre: '감기',
          post: '학교에 못 갔어요.',
          options: ['거든요', '라서', '때문에'],
          answer: 2,
          explanation: 'N 때문에 = "因为感冒没去学校。"', explanationEn: 'N 때문에 = "I didn\'t go to school because of a cold."',
        },
        {
          pre: '시간이 없어요. 내일 시험이',
          post: '.',
          options: ["있거든요", "있을거든요", "있다거든요"],
          answer: 0,
          explanation: '-거든요 直接接词干说明原因：시험이 있거든요（因为明天有考试啊）。있을거든요 混入将来时、있다거든요 叠加了间接引用，都不对。', explanationEn: '-거든요 attaches directly to the stem to explain a reason: 시험이 있거든요 (because there\'s an exam tomorrow). 있을거든요 mixes in future tense, and 있다거든요 adds indirect quotation—both are wrong.',
        },
      ],
    },

    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 7 章 第 8 课 · 已完成</div>
    <div class="ov-hero-title">때문에 · -거든요</div>
    <div class="ov-hero-sub">正式原因 · 口语解释 · 常与"其实"搭配</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">结构速查</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">名词+때문에</span>：날씨 때문에 / 스트레스 때문에</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">动词+기 때문에</span>：바쁘기 때문에 / 오기 때문에</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">-거든요</span>：피곤하거든요 / 알거든요 / 배우거든요</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">교통 때문에 늦었어요</span></div><div class="struct-zh">因为交通堵塞迟到了。</div></div>
        <div><div class="tok-row"><span class="tok t-v">사실 피곤하거든요</span></div><div class="struct-zh">其实是因为很累。</div></div>
        <div><div class="tok-row"><span class="tok t-v">사실 그 노래 알거든요</span></div><div class="struct-zh">其实我知道那首歌呢。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">别踩的坑</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">피곤하거든요 쉬세요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">피곤하니까 쉬세요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">때문에 가요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">그것 때문에 가요</span></div></div>
    </div>
  </div>
</div>`,
    structures: [
      { ko: '스트레스 때문에 잠을 못 자요', zh: '因为压力睡不着觉。', zhEn: 'I can\'t sleep because of stress.', tokens: [{ text: '스트레스', role: 'subject' }, { text: '때문에', role: 'plain' }, { text: '잠을', role: 'object' }, { text: '못 자요', role: 'verb' }] },
      { ko: '비가 오기 때문에 못 가요', zh: '因为下雨，所以不能去。', zhEn: 'Because it\'s raining, I can\'t go.', tokens: [{ text: '비가', role: 'subject' }, { text: '오기 때문에', role: 'plain' }, { text: '못 가요', role: 'verb' }] },
      { ko: '사실 피곤하거든요', zh: '其实是因为很累。', zhEn: 'Actually, it\'s because I\'m really tired.', tokens: [{ text: '사실', role: 'plain' }, { text: '피곤하거든요', role: 'verb' }] },
      { ko: '저 한국어를 배우거든요', zh: '我在学韩语呢。（所以…）', zhEn: 'I\'m learning Korean. (So... )', tokens: [{ text: '저', role: 'subject' }, { text: '한국어를', role: 'object' }, { text: '배우거든요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + 때문에 → 因为（名词）', textEn: 'Noun + 때문에 → because of (noun)', examples: '날씨 때문에 / 스트레스 때문에 / 너 때문에' },
      { type: 'rule', text: '动词/形容词 词干 + 기 때문에 → 因为（动作/状态）', textEn: 'Verb/Adjective stem + 기 때문에 → because (action/state)', examples: '비가 오기 때문에 / 바쁘기 때문에 / 좋아하기 때문에' },
      { type: 'rule', text: '动词/形容词 词干 + 거든요 → 解释说明（口语）', textEn: 'Verb/Adjective stem + 거든요 → explanation (casual)', examples: '피곤하거든요 / 배우거든요 / 알거든요' },
      { type: 'compare', text: '때문에 vs 거든요', examples: '때문에：正式/书面原因说明 / 거든요：口语轻松补充解释', examplesEn: '때문에: formal/written reason / 거든요: casual supplementary explanation' },
      { type: 'note', text: '때문에 常带负面/怪罪语气（"都怪……"）。中文"多亏你、托您的福"这种正面原因不能用 때문에，要用 덕분에（后面章节详学）。', textEn: '때문에 often carries a negative/blaming tone ("all because of..."). For positive reasons like "thanks to you," use 덕분에 instead (detailed in a later chapter).', examples: '너 때문에 늦었어（都怪你迟到了·责怪）/ 선생님 덕분에 합격했어요（多亏老师才考上·感谢）', examplesEn: '너 때문에 늦었어 (You made me late—blaming) / 선생님 덕분에 합격했어요 (I passed thanks to my teacher—grateful)' },
      { type: 'note', text: '-거든요 语气随意，对长辈或正式场合慎用；语调不当时会带"我早说过了/我就这样啊"的顶嘴感，只对平辈或熟人用最稳。', textEn: '-거든요 is casual; use cautiously with elders or in formal settings. With the wrong tone, it can sound like "I told you so" or "that\'s just how I am," so it\'s safest with peers or close acquaintances.' },
      { type: 'usage', text: '-거든요 常与 사실（其实）搭配', textEn: '-거든요 often pairs with 사실 (actually)', examples: '사실 저 그 노래 좋아하거든요（其实我喜欢那首歌）', examplesEn: '사실 저 그 노래 좋아하거든요 (Actually, I like that song)' },
      { type: 'note', text: '-거든요 不用于命令或建议句', textEn: '-거든요 is not used in commands or suggestions', examples: '✗ 피곤하거든요 쉬세요 → ✓ 피곤하니까 쉬세요' },
      { type: 'example', text: '교통 때문에 늦었어요 / 공부하기 때문에 바빠요 / 사실 그 사람 알거든요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '스트레스', role: 'subject' }, { text: '때문에', role: 'plain' }, { text: '못 자요', role: 'verb' }], zh: '因为压力睡不着。', zhEn: 'I can\'t sleep because of stress.', swapRole: 'subject', swapWords: ['스트레스', '날씨', '교통'] },
      { wordBlocks: [{ text: '비가', role: 'subject' }, { text: '오기 때문에', role: 'plain' }, { text: '못 가요', role: 'verb' }], zh: '因为下雨不能去。', zhEn: 'I can\'t go because it\'s raining.', swapRole: 'subject', swapWords: ['비가', '눈이', '바람이'] },
      { wordBlocks: [{ text: '사실', role: 'plain' }, { text: '피곤하거든요', role: 'verb' }], zh: '其实是因为很累。', zhEn: 'Actually, it\'s because I\'m really tired.', swapRole: 'verb', swapWords: ['피곤하거든요', '바쁘거든요', '아프거든요'] },
      { wordBlocks: [{ text: '저', role: 'subject' }, { text: '그 노래', role: 'object' }, { text: '좋아하거든요', role: 'verb' }], zh: '我喜欢那首歌呢。', zhEn: 'I like that song.', swapRole: 'object', swapWords: ['그 노래', '그 드라마', '그 아이돌'] },
    ],
    scenarios: [
      { icon: '😩', context: '解释睡不好', contextEn: 'Explain why you can\'t sleep well', ko: '요즘 스트레스 때문에 잠을 못 자고 있어요.', zh: '最近因为压力睡不着觉。', zhEn: 'Lately, I can\'t sleep because of stress.' },
      { icon: '🚗', context: '解释迟到', contextEn: 'Explain being late', ko: '교통 때문에 늦었어요. 죄송해요.', zh: '因为交通堵塞迟到了。对不起。', zhEn: 'I was late because of traffic. Sorry.' },
      { icon: '🎵', context: '解释为什么知道', contextEn: 'Explain why you know', ko: '사실 저 그 노래 알거든요. 진짜 좋아해요.', zh: '其实我知道那首歌，真的很喜欢。', zhEn: 'Actually, I know that song, and I really like it.' },
      { icon: '📖', context: '解释为什么忙', contextEn: 'Explain why you\'re busy', ko: '요즘 시험 공부하기 때문에 바빠요.', zh: '最近因为要备考，所以很忙。', zhEn: 'I\'ve been busy lately because I\'m studying for exams.' },
      { icon: '🤫', context: '告诉朋友秘密', contextEn: 'Tell a friend a secret', ko: '사실 저 한국어를 배우거든요. 아무한테도 말 안 했어요.', zh: '其实我在学韩语，没告诉任何人。', zhEn: 'Actually, I\'m learning Korean—I haven\'t told anyone.' },
      { icon: '☔', context: '解释不出门', contextEn: 'Explain why you\'re not going out', ko: '비가 오기 때문에 오늘은 집에 있을 거예요.', zh: '因为下雨，今天打算待在家里。', zhEn: 'It\'s raining, so I plan to stay home today.' },
    ],
    mistakes: [
      { wrong: '때문에 가요', correct: '그 때문에 가요 / 그래서 가요', note: '때문에 需要前面有明确的名词或动词 기，不能单独开头。', noteEn: '때문에 needs a clear noun or verb 기 before it; it can\'t start a sentence alone.' },
      { wrong: '피곤하거든요 쉬세요', correct: '피곤하니까 쉬세요', note: '-거든요 是解释补充，后面不能接命令句，要换成 -(으)니까。', noteEn: '-거든요 adds an explanation; it can\'t be followed by a command, so use -(으)니까 instead.' },
      { wrong: '비가 때문에 못 갔어요', correct: '비 때문에 못 갔어요', note: '때문에 直接接名词，前面的名词不加主格助词 이/가：비가 때문에 ✗ → 비 때문에 ✓。', noteEn: '때문에 attaches directly to a noun without the subject particle 이/가: 비가 때문에 ✗ → 비 때문에 ✓.' },
      { wrong: '너무 바빴거든요 못 갔어요', correct: '너무 바빠서 못 갔어요', note: '-거든요 不能用作分句连接两件事，要表示因果关系应该用 -아/어서。', noteEn: '-거든요 can\'t connect two clauses; use -아/어서 to show cause and effect.' },
      { wrong: '선생님 때문에 합격했어요', correct: '선생님 덕분에 합격했어요', note: '感谢、正面原因（"多亏……"）要用 덕분에；때문에 带责怪语气，说成 "선생님 때문에" 像在怪老师。', noteEn: 'For gratitude or positive reasons ("thanks to..."), use 덕분에; 때문에 has a blaming tone, so "선생님 때문에" sounds like blaming the teacher.' },
    ],
    linkedGrammarIds: ['g29', 'g19'],
  },
  {
    id: 'card-p7-l09', partNumber: 7, lessonNumber: 9, isPractice: true, title: '综合练习⑦', titleEn: 'Comprehensive Practice ⑦',
    whatItDoes: '综合练习第七章所有语法点', whatItDoesEn: 'Comprehensive practice of all grammar points in Chapter 7',
    whatItDoesBody: '本章学习了比较（처럼/같이/같은）、时间经过（-은/ㄴ 지 되다）、背景转折（-(으)ㄴ/는데）、全称否定（아무도/하나도）、附加助词（에다가）、对比转折（-지만）、原因（-(으)니까/-느라고）、原因说明（때문에/-거든요）。\n通过综合练习巩固这些语法点的用法和辨析。', whatItDoesBodyEn: 'This chapter covered comparison (처럼/같이/같은), time elapsed (-은/ㄴ 지 되다), background/contrast (-(으)ㄴ/는데), full negation (아무도/하나도), additive particle (에다가), contrastive conjunction (-지만), reasons (-(으)니까/-느라고), and reason explanations (때문에/-거든요).\\nConsolidate these grammar points through comprehensive practice and discrimination.',
    structureNote: '本章八个语法点的核心要点：\n① 처럼/같이 修饰动词，같은 修饰名词\n② -은/ㄴ 지 됐어요 说经过时间\n③ -는데 铺垫转折\n④ 아무도/아무것도 + 否定\n⑤ 에다가 强调附着操作\n⑥ -지만 明确转折\n⑦ -(으)니까 可接命令建议，-느라고 后接负面结果\n⑧ 때문에 正式原因，-거든요 口语补充', structureNoteEn: 'Key points of the eight grammar points in this chapter:\\n① 처럼/같이 modify verbs, 같은 modifies nouns\\n② -은/ㄴ 지 됐어요 for elapsed time\\n③ -는데 for background/contrast\\n④ 아무도/아무것도 + negation\\n⑤ 에다가 emphasizes attachment/action\\n⑥ -지만 for clear contrast\\n⑦ -(으)니까 can be followed by commands/suggestions, -느라고 is followed by negative results\\n⑧ 때문에 for formal reasons, -거든요 for colloquial additions',
    structures: [
      { ko: '아이돌처럼 춤을 춰요', zh: '跳舞像爱豆一样。', zhEn: 'Dance like an idol.', tokens: [{ text: '아이돌처럼', role: 'plain' }, { text: '춤을', role: 'object' }, { text: '춰요', role: 'verb' }] },
      { ko: '한국어를 배운 지 1년이 됐어요', zh: '学韩语已经一年了。', zhEn: 'It\'s been a year since I started learning Korean.', tokens: [{ text: '한국어를', role: 'object' }, { text: '배운 지', role: 'plain' }, { text: '1년이 됐어요', role: 'verb' }] },
      { ko: '비가 오는데 우산을 가져가세요', zh: '在下雨，请带伞。', zhEn: 'It\'s raining, so bring an umbrella.', tokens: [{ text: '비가', role: 'subject' }, { text: '오는데', role: 'plain' }, { text: '우산을', role: 'object' }, { text: '가져가세요', role: 'verb' }] },
      { ko: '아무것도 안 먹었어요', zh: '什么都没吃。', zhEn: 'I haven\'t eaten anything.', tokens: [{ text: '아무것도', role: 'object' }, { text: '안 먹었어요', role: 'verb' }] },
      { ko: '벽에다가 포스터를 붙였어요', zh: '在墙上贴了海报。', zhEn: 'I put up a poster on the wall.', tokens: [{ text: '벽에다가', role: 'place' }, { text: '포스터를', role: 'object' }, { text: '붙였어요', role: 'verb' }] },
      { ko: '비싸지만 사고 싶어요', zh: '虽然贵，但想买。', zhEn: 'It\'s expensive, but I want to buy it.', tokens: [{ text: '비싸지만', role: 'plain' }, { text: '사고 싶어요', role: 'verb' }] },
      { ko: '공부하느라고 전화를 못 받았어요', zh: '因为在学习，没接到电话。', zhEn: 'I was studying, so I missed the call.', tokens: [{ text: '공부하느라고', role: 'plain' }, { text: '전화를', role: 'object' }, { text: '못 받았어요', role: 'verb' }] },
      { ko: '사실 그 노래 알거든요', zh: '其实我知道那首歌呢。', zhEn: 'Actually, I know that song.', tokens: [{ text: '사실', role: 'plain' }, { text: '그 노래', role: 'object' }, { text: '알거든요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '처럼/같이 修饰动词（副词用法），같은 修饰名词（定语用法）', textEn: '처럼/같이 modify verbs (adverb use), 같은 modifies nouns (attributive use)', examples: '모델처럼 걸어요 / 같은 학교예요' },
      { type: 'rule', text: '-은/ㄴ 지 + 时间 + 됐어요：表示从某事到现在已经过了多久', textEn: '-은/ㄴ 지 + time + 됐어요: indicates how long it\'s been since something happened', examples: '배운 지 1년이 됐어요 / 온 지 6개월이 됐어요' },
      { type: 'rule', text: '动词现在时词干 + 는데 / 形容词有收音 + 은데 / 无收音 + ㄴ데 / 过去时 + 았는데', textEn: 'Verb present stem + 는데 / adjective with final consonant + 은데 / without + ㄴ데 / past + 았는데', examples: '가는데 / 좋은데 / 큰데 / 갔는데' },
      { type: 'rule', text: '아무도/아무것도/아무데도/하나도 + 否定形式', textEn: '아무도/아무것도/아무데도/하나도 + negative form', examples: '아무도 안 왔어요 / 하나도 안 어려워요' },
      { type: 'rule', text: '名词 + 에다가 → 在……上/里做某事（附着操作），方向移动用 에', textEn: 'Noun + 에다가 → do something on/in (attachment action); use 에 for directional movement', examples: '노트에다가 써요 / 학교에 가요' },
      { type: 'rule', text: '动词/形容词词干 + 지만 → 虽然……但是（直接转折）', textEn: 'Verb/adjective stem + 지만 → although...but (direct contrast)', examples: '비싸지만 좋아요 / 어렵지만 재미있어요' },
      { type: 'rule', text: '-(으)니까：通用原因，可接命令/建议；-느라고：忙于A导致B（仅接动词）', textEn: '-(으)니까: general reason, can be followed by commands/suggestions; -느라고: busy with A causing B (verbs only)', examples: '비가 오니까 우산을 챙겨요 / 자느라고 못 들었어요' },
      { type: 'rule', text: '名词 + 때문에（正式）；动词/形容词 + 기 때문에；-거든요 句尾解释（口语）', textEn: 'Noun + 때문에 (formal); verb/adjective + 기 때문에; -거든요 sentence-final explanation (colloquial)', examples: '교통 때문에 늦었어요 / 사실 피곤하거든요' },
      { type: 'compare', text: '처럼/같이 vs 같은 — 副词 vs 定语', textEn: '처럼/같이 vs 같은 — adverb vs attributive', examples: '모델처럼 걸어요（修饰动词） / 같은 학교예요（修饰名词）', examplesEn: '모델처럼 걸어요 (modifies verb) / 같은 학교예요 (modifies noun)' },
      { type: 'compare', text: '-지만 vs -는데 — 强对比 vs 柔和铺垫', textEn: '-지만 vs -는데 — strong contrast vs soft setup', examples: '어렵지만 재미있어요 / 어려운데 재미있어요' },
      { type: 'compare', text: '-(으)니까 vs -느라고 — 通用原因 vs 负面结果', textEn: '-(으)니까 vs -느라고 — general reason vs negative result', examples: '늦었으니까 빨리 가요 / 게임하느라고 못 했어요' },
      { type: 'compare', text: '때문에 vs -거든요 — 正式 vs 口语', textEn: '때문에 vs -거든요 — formal vs colloquial', examples: '비 때문에 못 갔어요 / 비가 와서 못 갔거든요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '아이돌처럼', role: 'plain' }, { text: '춤을', role: 'object' }, { text: '춰요', role: 'verb' }], zh: '跳舞像爱豆一样。', zhEn: 'Dance like an idol.', swapRole: 'plain', swapWords: ['아이돌처럼', '모델같이', '한국 사람처럼'] },
      { wordBlocks: [{ text: '비가', role: 'subject' }, { text: '오는데', role: 'plain' }, { text: '우산을', role: 'object' }, { text: '가져가세요', role: 'verb' }], zh: '在下雨，请带伞。', zhEn: 'It\'s raining, so bring an umbrella.', swapRole: 'subject', swapWords: ['비가', '눈이', '바람이'] },
      { wordBlocks: [{ text: '비싸지만', role: 'plain' }, { text: '사고 싶어요', role: 'verb' }], zh: '虽然贵，但想买。', zhEn: 'It\'s expensive, but I want to buy it.', swapRole: 'plain', swapWords: ['비싸지만', '어렵지만', '힘들지만'] },
      { wordBlocks: [{ text: '공부하느라고', role: 'plain' }, { text: '전화를', role: 'object' }, { text: '못 받았어요', role: 'verb' }], zh: '因为在学习，没接到电话。', zhEn: 'I was studying, so I missed the call.', swapRole: 'plain', swapWords: ['공부하느라고', '일하느라고', '자느라고'] },
    ],
    scenarios: [
      { icon: '🎤', context: '夸朋友跳舞', contextEn: 'Praise a friend\'s dancing', ko: '너 아이돌처럼 춤춰! 진짜 잘한다.', zh: '你跳舞像爱豆一样！真的很厉害。', zhEn: 'You dance like an idol! You\'re really amazing.' },
      { icon: '📚', context: '介绍学习经历', contextEn: 'Introduce your learning experience', ko: '한국어를 배운 지 2년이 됐는데 아직도 어려워요.', zh: '学韩语已经两年了，但还是很难。', zhEn: 'I\'ve been learning Korean for two years, but it\'s still hard.' },
      { icon: '🍽️', context: '解释为什么不饿', contextEn: 'Explain why you\'re not hungry', ko: '아까 많이 먹어서 아무것도 안 먹고 싶어요.', zh: '刚才吃太多，什么都不想吃。', zhEn: 'I ate too much earlier, so I don\'t feel like eating anything.' },
      { icon: '☔', context: '婉拒邀请', contextEn: 'Politely decline an invitation', ko: '비가 오는데 오늘은 그냥 집에 있을래요.', zh: '在下雨呢，今天就待在家里吧。', zhEn: 'It\'s raining, so let\'s just stay home today.' },
      { icon: '😴', context: '解释迟到', contextEn: 'Explain being late', ko: '늦잠 자느라고 지각했어요. 죄송합니다.', zh: '因为睡懒觉迟到了，对不起。', zhEn: 'I\'m sorry I was late because I overslept.' },
      { icon: '🎵', context: '聊喜欢的歌', contextEn: 'Talk about a song you like', ko: '사실 저 그 가수 진짜 좋아하거든요.', zh: '其实我真的很喜欢那个歌手。', zhEn: 'Actually, I really like that singer.' },
    ],
    mistakes: [
      { wrong: '같이 학교예요', correct: '같은 학교예요', note: '修饰名词用 같은，같이 是副词修饰动词。', noteEn: 'Use 같은 to modify nouns; 같이 is an adverb that modifies verbs.' },
      { wrong: '아무도 왔어요', correct: '아무도 안 왔어요', note: '아무도 必须配否定谓语。', noteEn: '아무도 must be paired with a negative predicate.' },
      { wrong: '피곤하느라고 못 잤어요', correct: '피곤해서 못 잤어요', note: '-느라고 只接动词，形容词用 -아/어서。', noteEn: '-느라고 only attaches to verbs; for adjectives, use -아/어서.' },
      { wrong: '학교에다가 가요', correct: '학교에 가요', note: '에다가 表附着操作，移动方向用 에。', noteEn: '에다가 indicates attachment; use 에 for direction of movement.' },
      { wrong: '피곤하거든요 쉬세요', correct: '피곤하니까 쉬세요', note: '-거든요 后不接命令句，换成 -(으)니까。', noteEn: '-거든요 is not used with imperative sentences; use -(으)니까 instead.' },
    ],
    specialQuiz: {
      type: 'fill',
      title: '第七章综合测试', titleEn: 'Chapter 7 Comprehensive Test',
      body: '从本章八个语法点中选择正确的形式。', bodyEn: 'Choose the correct form from the eight grammar points in this chapter.',
      questions: [
        {
          pre: '한국 사람',
          post: '한국어를 잘해요.',
          options: ['같은', '같은의', '처럼'],
          answer: 2,
          explanation: 'N처럼 修饰动词 잘해요：说韩语像韩国人一样。같은의 是错误形式（같은 不是名词，不能加 의）。', explanationEn: 'N처럼 modifies the verb 잘해요: speak Korean like a Korean person. 같은의 is incorrect (같은 is not a noun, so it can\'t take 의).',
        },
        {
          pre: '서울에 온',
          post: '6개월이 됐어요.',
          options: ['지', '만에', '후에'],
          answer: 0,
          explanation: '-(으)ㄴ 지 + 时间 + 됐어요：来首尔已经六个月了。', explanationEn: '-(으)ㄴ 지 + time + 됐어요: It\'s been six months since I came to Seoul.',
        },
        {
          pre: '교실에 사람이',
          post: '없어요.',
          options: ['하나도', '아무도', '아무거나'],
          answer: 1,
          explanation: '"教室里一个人都没有"，指人用 아무도。하나도 多修饰程度而非直接指人，아무거나（随便哪个）不接否定，都不合。', explanationEn: 'For \'there\'s no one in the classroom,\' use 아무도 for people. 하나도 usually modifies degree rather than directly referring to people, and 아무거나 (any one) doesn\'t take negation, so neither fits.',
        },
        {
          pre: '비가 오',
          post: '우산을 가져가세요.',
          options: ['니까', '느라고', '면서'],
          answer: 0,
          explanation: '-(으)니까 表原因，后可接命令/建议：因为下雨，请带伞。', explanationEn: '-(으)니까 indicates reason and can be followed by commands/suggestions: Since it\'s raining, please bring an umbrella.',
        },
        {
          pre: '게임하',
          post: '숙제를 못 했어요.',
          options: ['니까', '느라고', '거든요'],
          answer: 1,
          explanation: '-느라고 表"忙于A导致负面结果"：因为玩游戏，没做作业。', explanationEn: '-느라고 means \'busy doing A, resulting in a negative outcome\': Because I was playing games, I didn\'t do my homework.',
        },
        {
          pre: '교통',
          post: '늦었어요.',
          options: ['거든요', '라서', '때문에'],
          answer: 2,
          explanation: 'N + 때문에：因为交通堵塞迟到了。', explanationEn: 'N + 때문에: I was late because of traffic.',
        },
      ],
    },
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 7 章 · 综合练习</div>
    <div class="ov-hero-title">综合练习⑦</div>
    <div class="ov-hero-sub">比较 · 时间经过 · 转折铺垫 · 全称否定 · 原因 · 解释</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">本章核心语法</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#ff7fa8">比较</span> 처럼/같이（副词）/ 같은（定语）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#2db89b">时间经过</span> -은/ㄴ 지 + 时间 + 됐어요</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#6b7ff0">背景转折</span> -(으)ㄴ/는데（柔和）/ -지만（强烈）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#e05555">全称否定</span> 아무도/아무것도/아무데도/하나도 + 否定</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#c89020">附着助词</span> 에다가（操作）vs 에（方向/存在）</div>
        <div style="font-size:16px;color:#241917"><span style="font-weight:700;color:#b49ccf">原因</span> -(으)니까 / -느라고 / 때문에 / -거든요</div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">常用例句</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:10px">
        <div><div class="tok-row"><span class="tok t-v">한국어를 배운 지 1년이 됐어요</span></div><div class="struct-zh">学韩语已经一年了。</div></div>
        <div><div class="tok-row"><span class="tok t-v">비가 오는데 우산 있어요?</span></div><div class="struct-zh">在下雨，有伞吗？</div></div>
        <div><div class="tok-row"><span class="tok t-v">자느라고 전화를 못 받았어요</span></div><div class="struct-zh">因为在睡觉，没接到电话。</div></div>
      </div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#e05555"></div><div class="ov-section-title" style="color:#e05555">高频易错</div></div>
    <div class="ov-block">
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">같이 학교예요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">같은 학교예요</span></div></div>
      <div class="mistake" style="margin-bottom:8px"><div class="m-w"><span class="bx">✗</span><span class="m-txt">피곤하느라고 못 잤어요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">피곤해서 못 잤어요</span></div></div>
      <div class="mistake"><div class="m-w"><span class="bx">✗</span><span class="m-txt">학교에다가 가요</span></div><div class="m-r"><span class="bo">✓</span><span class="m-txt">학교에 가요</span></div></div>
    </div>
  </div>
</div>`,
  },
];
