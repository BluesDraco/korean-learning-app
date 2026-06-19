import type { GrammarCard } from '@/types';

export const grammarCardsP7: GrammarCard[] = [
  {
    id: 'card-p7-l01', partNumber: 7, lessonNumber: 1, title: '처럼, 같이, 같은',
    whatItDoes: '说"像……一样"的三种方式',
    whatItDoesBody: '처럼·같이·같은 都表示比较，但用法位置不同。\n和中文"像……一样"对应：\n처럼/같이 接在名词后用作副词，같은 接在名词前用作定语。',
    structureNote: '下面展示三种比较表达的位置。\n注意 같은 后面一定还有名词，처럼/같이 后面直接接动词。',
    rulesNote: '처럼 和 같이 可以互换，只是 같이 口语更常见。\n같은 是形容词，后面必须接名词。\n三个都不看收音，直接加在名词后/前。',
    scenarioNote: '追星、比较外貌、描述相似程度时最常用。\n中文"她跳舞跳得像专业的一样"在韩语里就靠这三个词来表达。',
    step0Html: `<div class="card-title">처럼 · 같이 · 같은</div>
<div class="card-body">三个词都表示"像……一样"，但位置不同，用法各异。掌握这三个词，比较和夸人的句子就全通了。</div>
<div class="hook-box">
  <div style="font-size:12px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">아이돌처럼 춤을 춰요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">跳舞像爱豆一样。（처럼 修饰动词）</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">언니같이 노래해요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">唱歌像姐姐一样。（같이 口语版）</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">같은 노래를 들어요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">听同一首歌。（같은 修饰名词）</div>
    </div>
  </div>
</div>
<div class="reminder-box">같은 后面必须跟名词；처럼/같이 后面直接跟动词——这是这三个词最关键的区别。</div>`,
    compareHtml: `<div class="card-title">처럼/같이（副词）vs 같은（定语）</div>
<div class="card-body">中文"像……一样"只有一种说法，韩语根据修饰对象分两类：修饰动词用 처럼/같이，修饰名词用 같은。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">처럼 / 같이 → 修饰动词（副词用法）</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">名词 + 처럼/같이 + 动词</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">모델처럼 걸어요.</span><span style="font-size:14px;color:#5a4640">走路像模特一样。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">아이돌같이 춤춰요.</span><span style="font-size:14px;color:#5a4640">跳舞像爱豆一样。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">같은 → 修饰名词（定语用法）</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">같은 + 名词</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">같은 학교예요.</span><span style="font-size:14px;color:#5a4640">是同一所学校。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">같은 노래를 들어요.</span><span style="font-size:14px;color:#5a4640">听同一首歌。</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0">
  <div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">처럼 vs 같이</div>
  <div style="font-size:15px;color:#5a4640">两者意思相同，可以互换。처럼 书面/口语均可，같이 口语更自然。</div>
  <div style="margin-top:4px;font-size:15px;color:#5a4640">모델처럼 = 모델같이（都是"像模特一样"）</div>
</div>
<div class="reminder-box">같이 还有"一起"的意思（같이 가요 = 一起去），不要和比较用法混淆。看后面是动词还是名词来判断：같이 걸어요（一起走）vs 모델같이 걸어요（像模特一样走）。</div>`,
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
        <div style="background:#fff0f5;border-radius:10px;padding:10px;text-align:center"><div style="font-size:14px;font-weight:800;color:#ff7fa8">처럼</div><div style="font-size:11px;color:#89756e;margin-top:2px">书面/口语均可</div></div>
        <div style="background:#eaf8f5;border-radius:10px;padding:10px;text-align:center"><div style="font-size:14px;font-weight:800;color:#2db89b">같이</div><div style="font-size:11px;color:#89756e;margin-top:2px">口语更常用</div></div>
        <div style="background:#f0f4ff;border-radius:10px;padding:10px;text-align:center"><div style="font-size:14px;font-weight:800;color:#6b7ff0">같은</div><div style="font-size:11px;color:#89756e;margin-top:2px">修饰名词</div></div>
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
      { ko: '모델처럼 걸어요', zh: '走路像模特一样。', tokens: [{ text: '모델처럼', role: 'plain' }, { text: '걸어요', role: 'verb' }] },
      { ko: '언니같이 노래해요', zh: '唱歌像姐姐一样。', tokens: [{ text: '언니같이', role: 'plain' }, { text: '노래해요', role: 'verb' }] },
      { ko: '같은 노래를 들어요', zh: '听同一首歌。', tokens: [{ text: '같은', role: 'plain' }, { text: '노래를', role: 'object' }, { text: '들어요', role: 'verb' }] },
      { ko: '아이돌처럼 춤을 춰요', zh: '跳舞跳得像爱豆一样。', tokens: [{ text: '아이돌처럼', role: 'plain' }, { text: '춤을', role: 'object' }, { text: '춰요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + 처럼 → 像……一样（书面/口语均可）', examples: '모델처럼 / 친구처럼 / 한국 사람처럼' },
      { type: 'rule', text: '名词 + 같이 → 像……一样（口语更常用）', examples: '아이돌같이 / 언니같이 / 배우같이' },
      { type: 'rule', text: '같은 + 名词 → 相同的……/ 同一个……', examples: '같은 학교 / 같은 노래 / 같은 생각' },
      { type: 'note', text: '처럼 和 같이 可以互换，意思相同', examples: '모델처럼 = 모델같이（都是"像模特一样"）' },
      { type: 'compare', text: '처럼/같이 vs 같은', examples: '처럼/같이 是副词（修饰动词）/ 같은 是定语（修饰名词）' },
      { type: 'vocab', text: '常见搭配场景', examples: '춤이 아이돌같이 예뻐요 / 같은 꿈을 꿔요 / 선생님처럼 설명해요' },
      { type: 'example', text: '모델처럼 걸어요 / 친구같이 편해요 / 같은 반이에요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '모델처럼', role: 'plain' }, { text: '걸어요', role: 'verb' }], zh: '走路像模特一样。', swapRole: 'plain', swapWords: ['모델처럼', '배우처럼', '언니처럼'] },
      { wordBlocks: [{ text: '아이돌같이', role: 'plain' }, { text: '춤을', role: 'object' }, { text: '춰요', role: 'verb' }], zh: '跳舞像爱豆一样。', swapRole: 'plain', swapWords: ['아이돌같이', '친구같이', '전문가같이'] },
      { wordBlocks: [{ text: '같은', role: 'plain' }, { text: '학교예요', role: 'verb' }], zh: '是同一所学校。', swapRole: 'plain', swapWords: ['같은 학교예요', '같은 반이에요', '같은 팀이에요'] },
      { wordBlocks: [{ text: '한국 사람처럼', role: 'plain' }, { text: '한국어를', role: 'object' }, { text: '해요', role: 'verb' }], zh: '说韩语像韩国人一样。', swapRole: 'plain', swapWords: ['한국 사람처럼', '원어민처럼', '선생님처럼'] },
    ],
    scenarios: [
      { icon: '🎤', context: '夸朋友跳舞好', ko: '너 아이돌같이 춤춰! 진짜 잘한다.', zh: '你跳舞像爱豆一样！真的很厉害。' },
      { icon: '🇰🇷', context: '夸韩语说得好', ko: '한국 사람처럼 한국어를 해요. 대단해요!', zh: '韩语说得像韩国人一样，太厉害了！' },
      { icon: '👯', context: '同班同学相认', ko: '저희 같은 반이에요? 반가워요!', zh: '我们是同一班的吗？很高兴认识！' },
      { icon: '☕', context: '描述口味相似', ko: '저는 언니같이 커피를 좋아해요.', zh: '我和姐姐一样喜欢咖啡。' },
      { icon: '🎵', context: '发现共同喜好', ko: '같은 노래 듣고 있었어요? 저도요!', zh: '你也在听同一首歌？我也是！' },
      { icon: '💬', context: '描述说话方式', ko: '선생님처럼 설명해 줬어요. 이해가 잘 됐어요.', zh: '给我解释得像老师一样，理解得很好。' },
    ],
    mistakes: [
      { wrong: '모델같은 걸어요', correct: '모델처럼 걸어요', note: '같은 是定语，后面必须接名词。修饰动词要用 처럼 或 같이。' },
      { wrong: '같이 학교예요', correct: '같은 학교예요', note: '表示"同一个……"修饰名词时用 같은，不是 같이。' },
      { wrong: '저는 같이 생각이에요', correct: '저는 같은 생각이에요', note: '생각（想法）是名词，定语用 같은。' },
      { wrong: '아이돌처럼 춤이 춰요', correct: '아이돌처럼 춤을 춰요', note: '춤을 춰요 是固定搭配，춤 后面用 을，不用 이。' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p7-l02', partNumber: 7, lessonNumber: 2, title: '-은/ㄴ 지 지나다/되다/흐르다, 만에, 만이다',
    whatItDoes: '说"过了多长时间"和"时隔多久"',
    whatItDoesBody: '-은/ㄴ 지 나다/되다 表示从某事发生到现在已经过了多久。\n만에 表示时隔多久之后（再次）发生某事。\n和中文"已经……了"对应，但韩语要用动词过去时连接 지。',
    structureNote: '下面展示三种时间经过的句型框架。\n注意 -은/ㄴ 지 의 连接：动词词干 + 은/ㄴ 지 + 时间 + 됐어요/났어요。',
    rulesNote: '-은/ㄴ 지：动词词干有收音用 -은 지，无收音用 -ㄴ 지。\n만에：时间名词直接加 만에，表示经过该时间段后发生某事。\n됐어요 比 났어요 更常用，两者可以互换。',
    scenarioNote: '学了韩语多久、认识多久、多久没见等日常话题都会用到。\n中文"我们认识三年了"在韩语里结构完全不同，要用 알게 된 지 3년이 됐어요。',
    step0Html: `<div class="card-title">-은/ㄴ 지 됐어요 · 만에 · 만이에요</div>
<div class="card-body">三种方式表达时间的流逝——已经过了多久、时隔多久再发生。</div>
<div class="hook-box">
  <div style="font-size:12px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">한국어를 배운 지 1년이 됐어요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">学韩语已经一年了。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">오랜만에 친구를 만났어요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">时隔好久见到了朋友。</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">졸업한 지 3년 만이에요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">毕业已经三年了。</div>
    </div>
  </div>
</div>
<div class="reminder-box">-은/ㄴ 지 用过去时冠词形（배운），不是现在时（배우는）。됐어요 和 났어요 都对，됐어요 更常用。</div>`,
    compareHtml: `<div class="card-title">-은/ㄴ 지 됐어요 vs 만에 vs 만이에요</div>
<div class="card-body">三个表达都和时间流逝有关，但语义侧重不同，不能随意互换。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-은/ㄴ 지 됐어요 → 已经过了……</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">强调持续时间，"从那时到现在"</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">배운 지 1년이 됐어요.</span><span style="font-size:14px;color:#5a4640">学了一年了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">온 지 6개월이 됐어요.</span><span style="font-size:14px;color:#5a4640">来了六个月了。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">만에 → 时隔……之后（再次发生）</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">强调间隔，常有"再次"含义</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">오랜만에 만났어요.</span><span style="font-size:14px;color:#5a4640">时隔好久见面了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">3일 만에 다시 왔어요.</span><span style="font-size:14px;color:#5a4640">时隔三天又来了。</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">만이에요 → 已经……了（回顾性）</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">지 + 时间 + 만이에요，带感叹语气</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">졸업한 지 3년 만이에요.</span><span style="font-size:14px;color:#5a4640">毕业已经三年了。</span></div>
  </div>
</div>
<div class="reminder-box">됐어요 前加 이（1년이 됐어요），만이에요 前不加 이（3년 만이에요）——两者结构不同，不能混用。</div>`,
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
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">动词 + 은/ㄴ 지</span> + 时间 + <span style="font-weight:700;color:#ff7fa8">됐어요</span> → 已经过了……</div>
        <div style="font-size:13px;color:#241917">时间 + <span style="font-weight:700;color:#2db89b">만에</span> → 时隔……之后</div>
        <div style="font-size:13px;color:#241917">动词 + 은/ㄴ 지 + 时间 + <span style="font-weight:700;color:#6b7ff0">만이에요</span> → 已经……了</div>
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
      { ko: '한국어를 배운 지 1년이 됐어요', zh: '学韩语已经一年了。', tokens: [{ text: '한국어를', role: 'object' }, { text: '배운 지', role: 'plain' }, { text: '1년이 됐어요', role: 'verb' }] },
      { ko: '오랜만에 친구를 만났어요', zh: '时隔好久见到了朋友。', tokens: [{ text: '오랜만에', role: 'time' }, { text: '친구를', role: 'object' }, { text: '만났어요', role: 'verb' }] },
      { ko: '졸업한 지 3년 만이에요', zh: '毕业已经三年了。', tokens: [{ text: '졸업한 지', role: 'plain' }, { text: '3년 만이에요', role: 'verb' }] },
      { ko: '서울에 온 지 6개월이 됐어요', zh: '来首尔已经六个月了。', tokens: [{ text: '서울에', role: 'place' }, { text: '온 지', role: 'plain' }, { text: '6개월이 됐어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干（无收音）+ -ㄴ 지 + 时间 + 됐어요', examples: '오다→온 지 / 배우다→배운 지 / 만나다→만난 지' },
      { type: 'rule', text: '动词词干（有收音）+ -은 지 + 时间 + 됐어요', examples: '먹다→먹은 지 / 읽다→읽은 지' },
      { type: 'usage', text: '만에：时间 + 만에 → 时隔……之后', examples: '1년 만에 / 오랜만에 / 3일 만에 다시 만났어요' },
      { type: 'usage', text: '만이다：지 + 时间 + 만이에요 → 已经过了……', examples: '졸업한 지 2년 만이에요 / 결혼한 지 5년 만이에요' },
      { type: 'note', text: '됐어요 / 났어요 / 흘렀어요 三者均可替换', examples: '배운 지 1년이 됐어요 = 났어요 = 흘렀어요（흐르다 常用于强调时间"流逝"的感觉）' },
      { type: 'vocab', text: '常用时间词', examples: '얼마나 됐어요?（过了多久了？）/ 오랜만이에요（好久不见）/ 며칠 만에（时隔几天）' },
      { type: 'example', text: '한국어를 배운 지 얼마나 됐어요? / 오랜만에 만났어요 / 세월이 많이 흘렀어요（岁月流逝了很多）' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '한국어를', role: 'object' }, { text: '배운 지', role: 'plain' }, { text: '1년이 됐어요', role: 'verb' }], zh: '学韩语已经一年了。', swapRole: 'verb', swapWords: ['1년이 됐어요', '6개월이 됐어요', '2년이 됐어요'] },
      { wordBlocks: [{ text: '오랜만에', role: 'time' }, { text: '친구를', role: 'object' }, { text: '만났어요', role: 'verb' }], zh: '时隔好久见到了朋友。', swapRole: 'object', swapWords: ['친구를', '가족을', '선생님을'] },
      { wordBlocks: [{ text: '서울에', role: 'place' }, { text: '온 지', role: 'plain' }, { text: '6개월이 됐어요', role: 'verb' }], zh: '来首尔已经六个月了。', swapRole: 'place', swapWords: ['서울에', '한국에', '이 회사에'] },
      { wordBlocks: [{ text: '졸업한 지', role: 'plain' }, { text: '3년 만이에요', role: 'verb' }], zh: '毕业已经三年了。', swapRole: 'verb', swapWords: ['3년 만이에요', '5년 만이에요', '10년 만이에요'] },
    ],
    scenarios: [
      { icon: '📚', context: '聊学韩语多久了', ko: '한국어를 배운 지 얼마나 됐어요? 저는 1년이 됐어요.', zh: '学韩语多久了？我已经一年了。' },
      { icon: '👋', context: '久别重逢', ko: '오랜만이에요! 만난 지 1년이 넘었죠?', zh: '好久不见！见面已经超过一年了吧？' },
      { icon: '🇰🇷', context: '来韩国多久了', ko: '한국에 온 지 얼마나 됐어요? 6개월 됐어요.', zh: '来韩国多久了？六个月了。' },
      { icon: '💼', context: '在公司工作年限', ko: '이 회사에서 일한 지 3년이 됐어요.', zh: '在这家公司工作已经三年了。' },
      { icon: '🎵', context: '追星多年', ko: '이 아이돌을 좋아한 지 5년 만이에요.', zh: '喜欢这个爱豆已经五年了。' },
      { icon: '☕', context: '多久没喝咖啡', ko: '커피를 안 마신 지 일주일이 됐어요.', zh: '不喝咖啡已经一周了。' },
    ],
    mistakes: [
      { wrong: '배우는 지 1년이 됐어요', correct: '배운 지 1년이 됐어요', note: '-은/ㄴ 지 用过去时冠词形（배운），不是现在时（배우는）。' },
      { wrong: '오랜만에 만나요', correct: '오랜만에 만났어요', note: '오랜만에 描述时隔很久后的事件，通常用过去时，除非当下正在发生。' },
      { wrong: '1년 됐어요', correct: '배운 지 1년이 됐어요', note: '缺少 -은/ㄴ 지，必须说明是"做了什么事之后"过了多久。' },
      { wrong: '온 지 6개월이 만이에요', correct: '온 지 6개월이 됐어요 또는 온 지 6개월 만이에요', note: '됐어요 和 만이에요 结构不同，不能混用。됐어요 前面加 이，만이에요 前面不加 이。' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p7-l03', partNumber: 7, lessonNumber: 3, title: '-(으)ㄴ/는데',
    whatItDoes: '铺垫背景或表示转折',
    whatItDoesBody: '-(으)ㄴ/는데 是韩语最高频的连接词尾之一，用来引出背景、表示轻微转折，或铺垫下一句。\n和中文"……但是""……呢……""……的是……"都有对应，但一个词尾就能完成多种功能。',
    structureNote: '下面展示三种典型用法的句型框架。\n注意变形规则：动词现在时用 -는데，形容词和过去时用 -(으)ㄴ데。',
    rulesNote: '动词现在时词干 + 는데（不看收音）。\n形容词词干：有收音 + 은데，无收음 + ㄴ데。\n过去时（-았/었-）+ 는데。\n이다/아니다 → 인데/아닌데。',
    scenarioNote: '日常对话中铺垫、转折、请求说明全靠 -는데。\n比如"我想去但是……""天气很好，要不要出去？"这类话全都用 -는데 来连接。',
    step0Html: `<div class="card-title">-(으)ㄴ/는데</div>
<div class="card-body">韩语最高频的连接词尾，一个词尾能铺垫背景、引出转折、暗示等待回应。</div>
<div class="hook-box">
  <div style="font-size:12px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">三种用法，一个词尾</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">① 铺垫背景</div>
      <div style="font-size:16px;font-weight:800;color:#241917">날씨가 좋은데 나갈까요?</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">天气很好，要出去吗？</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">② 轻微转折</div>
      <div style="font-size:16px;font-weight:800;color:#241917">한국어를 공부하는데 어려워요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">学韩语，（但是）很难。</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">③ 语气未完，等回应</div>
      <div style="font-size:16px;font-weight:800;color:#241917">저 오늘 좀 바쁜데……</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">我今天有点忙……（暗示"所以不行"）</div>
    </div>
  </div>
</div>
<div class="reminder-box">形容词用 -(으)ㄴ데（좋은데），动词现在时用 -는데（가는데），过去时用 -았는데（갔는데）——三条变形规则记住就全通了。</div>`,
    compareHtml: `<div class="card-title">动词 -는데 vs 形容词 -(으)ㄴ데 vs 过去时 -았는데</div>
<div class="card-body">-는데 的变形规则是这节课最核心的内容。三种情况对应三套词尾，不能混用。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">动词 现在时 → 词干 + 는데</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">不看收音，直接加 -는데</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가다 → 가는데</span><span style="font-size:14px;color:#5a4640">먹다 → 먹는데</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">공부하는데 재미있어요.</span><span style="font-size:14px;color:#5a4640">学习，挺有趣的。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">形容词 → 有收音 + 은데 / 无收音 + ㄴ데</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">좋다→좋은데 / 크다→큰데 / 예쁘다→예쁜데</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">날씨가 좋은데 나갈까요?</span><span style="font-size:14px;color:#5a4640">天气好，要出去吗？</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">过去时 -았/었 → + 는데</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">过去时统一用 -았/었는데</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">갔는데 문이 닫혔어요.</span><span style="font-size:14px;color:#5a4640">去了，但门关着。</span></div>
  </div>
</div>
<div class="reminder-box">좋는데 ✗ → 좋은데 ✓（形容词用은데）；갔은데 ✗ → 갔는데 ✓（过去时用는데）——这两个是最常犯的错误。</div>`,
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
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">动词现在时</span>：词干 + 는데（가는데 / 먹는데）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">形容词</span>：有收音 + 은데 / 无收音 + ㄴ데（좋은데 / 큰데）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#6b7ff0">过去时</span>：-았/었 + 는데（갔는데 / 먹었는데）</div>
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
      { ko: '배고픈데 같이 밥 먹을래요?', zh: '我有点饿，要不要一起吃饭？', tokens: [{ text: '배고픈데', role: 'plain' }, { text: '같이', role: 'plain' }, { text: '밥', role: 'object' }, { text: '먹을래요?', role: 'verb' }] },
      { ko: '날씨가 좋은데 산책해요', zh: '天气很好，去散步吧。', tokens: [{ text: '날씨가', role: 'subject' }, { text: '좋은데', role: 'plain' }, { text: '산책해요', role: 'verb' }] },
      { ko: '한국어를 공부하는데 어려워요', zh: '学韩语，（但是）很难。', tokens: [{ text: '한국어를', role: 'object' }, { text: '공부하는데', role: 'plain' }, { text: '어려워요', role: 'verb' }] },
      { ko: '어제 갔는데 문이 닫혔어요', zh: '昨天去了，但是门关着。', tokens: [{ text: '어제', role: 'time' }, { text: '갔는데', role: 'plain' }, { text: '문이', role: 'subject' }, { text: '닫혔어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + 는데（现在时，不看收音）', examples: '가다→가는데 / 먹다→먹는데 / 공부하다→공부하는데' },
      { type: 'rule', text: '形容词词干 有收음 + 은데，无收음 + ㄴ데', examples: '작다→작은데 / 크다→큰데 / 좋다→좋은데 / 예쁘다→예쁜데' },
      { type: 'rule', text: '过去时 -았/었/였 + 는데', examples: '갔는데 / 먹었는데 / 봤는데' },
      { type: 'usage', text: '用法①：铺垫背景，引出后续', examples: '날씨가 좋은데 나갈까요?（天气好，要出去吗？）' },
      { type: 'usage', text: '用法②：表示轻微转折', examples: '한국어를 공부하는데 어려워요（学韩语，但是难）' },
      { type: 'note', text: '-는데 单独结尾 → 语气未完，等对方回应', examples: '저 오늘 좀 바쁜데……（我今天有点忙……）暗示"所以不行"' },
      { type: 'example', text: '배고픈데 뭐 먹을까요? / 비가 오는데 우산 있어요? / 어제 전화했는데 못 받았어요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '날씨가', role: 'subject' }, { text: '좋은데', role: 'plain' }, { text: '나갈까요?', role: 'verb' }], zh: '天气很好，要出去吗？', swapRole: 'subject', swapWords: ['날씨가', '기분이', '시간이'] },
      { wordBlocks: [{ text: '한국어를', role: 'object' }, { text: '공부하는데', role: 'plain' }, { text: '재미있어요', role: 'verb' }], zh: '学韩语，很有意思。', swapRole: 'verb', swapWords: ['재미있어요', '어려워요', '즐거워요'] },
      { wordBlocks: [{ text: '배고픈데', role: 'plain' }, { text: '뭐', role: 'object' }, { text: '먹을까요?', role: 'verb' }], zh: '我饿了，吃点什么吧？', swapRole: 'plain', swapWords: ['배고픈데', '피곤한데', '심심한데'] },
      { wordBlocks: [{ text: '어제', role: 'time' }, { text: '전화했는데', role: 'plain' }, { text: '못 받았어요', role: 'verb' }], zh: '昨天打电话了，但是没接到。', swapRole: 'time', swapWords: ['어제', '아까', '지난주에'] },
    ],
    scenarios: [
      { icon: '🌤️', context: '邀请出去玩', ko: '날씨가 정말 좋은데 같이 산책할까요?', zh: '天气真的很好，要不要一起散步？' },
      { icon: '😅', context: '婉拒邀请', ko: '오늘은 좀 바쁜데 다음에 만나요.', zh: '今天有点忙，下次再见面吧。' },
      { icon: '📱', context: '解释没接电话', ko: '아까 전화했는데 못 받았어요? 미안해요.', zh: '刚才打电话了，没接到吗？对不起。' },
      { icon: '🍜', context: '提议吃饭', ko: '배고픈데 같이 밥 먹을래요?', zh: '我饿了，要一起吃饭吗？' },
      { icon: '🎵', context: '聊音乐感受', ko: '이 노래 들어봤는데 진짜 좋더라고요.', zh: '我听了这首歌，真的很好听。' },
      { icon: '📚', context: '表达学习困难', ko: '한국어를 공부하는데 발음이 제일 어려워요.', zh: '学韩语，发音是最难的。' },
    ],
    mistakes: [
      { wrong: '좋는데', correct: '좋은데', note: '좋다 是形容词，用 -(으)ㄴ데，不是 -는데。' },
      { wrong: '갔은데', correct: '갔는데', note: '过去时 -았/었 后面用 -는데，不是 -은데。' },
      { wrong: '저 오늘 밥 먹는데요.（当普通陈述用）', correct: '저 오늘 밥 먹는데요……（语气未完，等待回应）', note: '-는데요 单独结尾时语气未完结，暗示后续说明或等待对方反应，不是单纯陈述句。' },
      { wrong: '어제 날씨가 좋은데 오늘은 추워요', correct: '어제는 날씨가 좋았는데 오늘은 추워요', note: '-는데 连接两个时间不同的情况时，过去的部分要用过去时 -았/었는데，不能用现在时。' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p7-l04', partNumber: 7, lessonNumber: 4, title: '아무(名词)도, 하나도 + 否定',
    whatItDoes: '表示"什么都没有/谁都不"的全称否定',
    whatItDoesBody: '아무도/아무것도/아무데도 配合否定谓语，表示"谁都……不""什么都……不"。\n하나도 强调"一点都不/一个都没有"。\n和中文"一个都不""什么都没"对应，但韩语必须后接否定形式，不能用肯定动词。',
    structureNote: '下面展示几种全称否定的基本句型。\n注意：아무도/아무것도 后面必须接 안/못 或 -지 않다/못하다。',
    rulesNote: '아무도 + 없어요/안 해요（人：谁都不……）\n아무것도 + 안 먹어요/없어요（事物：什么都不……）\n아무데도 + 안 가요（地点：哪里都不……）\n하나도 + 안/못（强调程度：一点都不……）',
    scenarioNote: '表达极端否定、强调一无所有时最常用。\n中文"我什么都不想吃"直接说，韩语要用 아무것도 + 否定动词结构。',
    step0Html: `<div class="card-title">아무도 · 아무것도 · 하나도 + 否定</div>
<div class="card-body">韩语全称否定：用专门的词搭配否定动词，表示"谁都不/什么都没/一点都不"。</div>
<div class="hook-box">
  <div style="font-size:12px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">三个核心词</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">人 → 아무도</div>
      <div style="font-size:16px;font-weight:800;color:#241917">아무도 없어요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">谁都没有。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">事物 → 아무것도</div>
      <div style="font-size:16px;font-weight:800;color:#241917">아무것도 안 먹었어요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">什么都没吃。</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">程度强调 → 하나도</div>
      <div style="font-size:16px;font-weight:800;color:#241917">하나도 안 어려워요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">一点都不难。</div>
    </div>
  </div>
</div>
<div class="reminder-box">아무도/아무것도 后面必须跟否定动词——아무도 왔어요 ✗ → 아무도 안 왔어요 ✓。</div>`,
    compareHtml: `<div class="card-title">아무도 / 아무것도 / 아무데도 / 하나도</div>
<div class="card-body">四个词分别对应"人/事物/地点/程度"的全称否定，搭配对象不同，不能混用。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">아무도 → 谁都不……（人）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아무도 없어요.</span><span style="font-size:14px;color:#5a4640">谁都没有。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">아무도 안 왔어요.</span><span style="font-size:14px;color:#5a4640">谁都没来。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">아무것도 → 什么都不……（事物）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아무것도 안 먹었어요.</span><span style="font-size:14px;color:#5a4640">什么都没吃。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">아무것도 없어요.</span><span style="font-size:14px;color:#5a4640">什么都没有。</span></div>
  </div>
  <div class="tok-row" style="background:#f0f4ff;border-radius:12px;padding:12px">
    <div class="tok t-v">아무데도 → 哪里都不……（地点）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아무데도 안 갔어요.</span><span style="font-size:14px;color:#5a4640">哪里都没去。</span></div>
  </div>
  <div class="tok-row" style="background:#fffbe8;border-radius:12px;padding:12px">
    <div class="tok t-v">하나도 → 一点都不……（程度强调）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">하나도 안 어려워요.</span><span style="font-size:14px;color:#5a4640">一点都不难。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">하나도 못 먹었어요.</span><span style="font-size:14px;color:#5a4640">一口都没吃到。</span></div>
  </div>
</div>
<div class="reminder-box">아무 + 名词 + 도 → 아무 말도 안 했어요（什么话都没说）。这个扩展格式能覆盖更多场景。</div>`,
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 7 章 第 4 课 · 已完成</div>
    <div class="ov-hero-title">아무도 · 아무것도 · 하나도</div>
    <div class="ov-hero-sub">全称否定 · 人/事物/地点/程度</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">核心规则</div></div>
    <div class="ov-block">
      <div style="background:#fff8fb;border-radius:12px;padding:10px 12px;font-size:13px;color:#241917;font-weight:700">아무도/아무것도/아무데도/하나도 后面必须接否定动词</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#b49ccf"></div><div class="ov-section-title" style="color:#b49ccf">四词速查</div></div>
    <div class="ov-block">
      <div style="display:grid;grid-template-columns:1fr 1fr;gap:8px">
        <div style="background:#fff0f5;border-radius:10px;padding:10px"><div style="font-size:14px;font-weight:800;color:#ff7fa8">아무도</div><div style="font-size:11px;color:#89756e;margin-top:2px">谁都不（人）</div></div>
        <div style="background:#eaf8f5;border-radius:10px;padding:10px"><div style="font-size:14px;font-weight:800;color:#2db89b">아무것도</div><div style="font-size:11px;color:#89756e;margin-top:2px">什么都不（事物）</div></div>
        <div style="background:#f0f4ff;border-radius:10px;padding:10px"><div style="font-size:14px;font-weight:800;color:#6b7ff0">아무데도</div><div style="font-size:11px;color:#89756e;margin-top:2px">哪里都不（地点）</div></div>
        <div style="background:#fffbe8;border-radius:10px;padding:10px"><div style="font-size:14px;font-weight:800;color:#c89020">하나도</div><div style="font-size:11px;color:#89756e;margin-top:2px">一点都不（程度）</div></div>
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
      { ko: '아무도 없어요', zh: '谁都没有。/没有任何人。', tokens: [{ text: '아무도', role: 'subject' }, { text: '없어요', role: 'verb' }] },
      { ko: '아무것도 먹고 싶지 않아요', zh: '什么都不想吃。', tokens: [{ text: '아무것도', role: 'object' }, { text: '먹고 싶지 않아요', role: 'verb' }] },
      { ko: '하나도 안 어려워요', zh: '一点都不难。', tokens: [{ text: '하나도', role: 'plain' }, { text: '안 어려워요', role: 'verb' }] },
      { ko: '아무데도 가고 싶지 않아요', zh: '哪里都不想去。', tokens: [{ text: '아무데도', role: 'plain' }, { text: '가고 싶지 않아요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '아무도 + 否定 → 谁都不……（人）', examples: '아무도 없어요 / 아무도 안 왔어요 / 아무도 몰라요' },
      { type: 'rule', text: '아무것도 + 否定 → 什么都不……（事物）', examples: '아무것도 안 먹었어요 / 아무것도 없어요 / 아무것도 모르겠어요' },
      { type: 'rule', text: '아무데도 + 否定 → 哪里都不……（地点）', examples: '아무데도 안 갔어요 / 아무데도 없어요' },
      { type: 'rule', text: '하나도 + 否定 → 一点都不……（强调程度）', examples: '하나도 안 어려워요 / 하나도 못 먹었어요 / 하나도 안 무서워요' },
      { type: 'note', text: '아무도/아무것도 不能接肯定动词', examples: '✗ 아무도 왔어요 → ✓ 아무도 안 왔어요' },
      { type: 'vocab', text: '아무 + 名词 + 도 → 什么……都不', examples: '아무 말도 안 했어요（什么话都没说）/ 아무 생각도 없어요（什么想法都没有）' },
      { type: 'example', text: '아무도 없어요 / 아무것도 안 먹었어요 / 하나도 안 피곤해요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '아무도', role: 'subject' }, { text: '없어요', role: 'verb' }], zh: '谁都没有。', swapRole: 'verb', swapWords: ['없어요', '안 왔어요', '안 알아요'] },
      { wordBlocks: [{ text: '아무것도', role: 'object' }, { text: '안 먹었어요', role: 'verb' }], zh: '什么都没吃。', swapRole: 'verb', swapWords: ['안 먹었어요', '없어요', '안 했어요'] },
      { wordBlocks: [{ text: '하나도', role: 'plain' }, { text: '안 어려워요', role: 'verb' }], zh: '一点都不难。', swapRole: 'verb', swapWords: ['안 어려워요', '안 무서워요', '안 피곤해요'] },
      { wordBlocks: [{ text: '아무데도', role: 'plain' }, { text: '안 갔어요', role: 'verb' }], zh: '哪里都没去。', swapRole: 'verb', swapWords: ['안 갔어요', '안 나갔어요', '못 갔어요'] },
    ],
    scenarios: [
      { icon: '😶', context: '说什么都不想说', ko: '오늘은 아무 말도 하고 싶지 않아요.', zh: '今天什么都不想说。' },
      { icon: '🍽️', context: '没胃口', ko: '배가 아파서 아무것도 못 먹었어요.', zh: '肚子疼所以什么都没吃。' },
      { icon: '😌', context: '测试一点都不难', ko: '이 시험은 하나도 안 어려웠어요!', zh: '这个考试一点都不难！' },
      { icon: '🏠', context: '一个人在家', ko: '집에 아무도 없어서 혼자 있었어요.', zh: '家里没有任何人，所以一个人待着。' },
      { icon: '🚶', context: '哪里都不想去', ko: '오늘은 피곤해서 아무데도 가고 싶지 않아요.', zh: '今天累了，哪里都不想去。' },
      { icon: '🤷', context: '什么都不知道', ko: '저는 그 일에 대해 아무것도 몰라요.', zh: '关于那件事我什么都不知道。' },
    ],
    mistakes: [
      { wrong: '아무도 왔어요', correct: '아무도 안 왔어요', note: '아무도 必须配否定谓语，不能接肯定动词。' },
      { wrong: '아무것도 조금 있어요', correct: '아무것도 없어요', note: '아무것도 强调"什么都没有"，不能说"什么都有一点"，逻辑矛盾。' },
      { wrong: '하나도 어려워요', correct: '하나도 안 어려워요', note: '하나도 必须配否定形式，表示"一点都不……"。' },
      { wrong: '아무 사람도 없어요', correct: '아무도 없어요', note: '아무도 本身已包含"人"的含义，不需要再加 사람。' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p7-l05', partNumber: 7, lessonNumber: 5, title: '에다(가), 에',
    whatItDoes: '表示"在……上加/写/放"的附加动作',
    whatItDoesBody: '에다(가) 表示在某处添加、附着或施加动作，强调动作的目标位置。\n和단순 위치 助词 에 不同：에다가 强调"在……这个地方（进行添加/操作）"，带有方向感和附着感。\n和中文"在……上""往……里"对应，但比中文更精准地表示目标。',
    structureNote: '下面展示 에다가 的基本句型。\n에다가 可以缩写为 에다 或 에，但完整形式最清晰。',
    rulesNote: '名词 + 에다가（完整）/ 에다（略）/ 에（最简）。\n三者意思相同，에다가 最正式，에 最口语。\n主要搭配：쓰다（写）、붙이다（贴）、넣다（放入）、바르다（涂）、두다（放置）。',
    scenarioNote: '写便条、贴标签、往包里放东西等日常动作全靠这个助词。\n和简单的位置助词 에 区别在于：에다가 强调"在这个地方对它做了什么"，有操作感。',
    step0Html: `<div class="card-title">에다가 · 에다 · 에</div>
<div class="card-body">强调"在某个地方进行操作/附着"的助词。贴海报、往包里放东西、在本子上写——这些动作都用 에다가。</div>
<div class="hook-box">
  <div style="font-size:12px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">三种形式，同一意思</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">完整形式</div>
      <div style="font-size:16px;font-weight:800;color:#241917">노트에다가 메모했어요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">在笔记本上记了备忘录。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">缩略形式</div>
      <div style="font-size:16px;font-weight:800;color:#241917">가방에다 책을 넣었어요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">把书放进包里了。</div>
    </div>
    <div style="background:#f0f4ff;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#6b7ff0;margin-bottom:4px">最简形式（口语）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">벽에 포스터를 붙였어요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">在墙上贴了海报。</div>
    </div>
  </div>
</div>
<div class="reminder-box">에다가 只用于"附着/操作"动词，不用于移动方向。학교에다가 가요 ✗ → 학교에 가요 ✓。</div>`,
    compareHtml: `<div class="card-title">에다가（附着操作）vs 에（位置/方向）</div>
<div class="card-body">两者都是位置助词，但 에다가 强调"在这里做了什么操作"，에 只是说明位置或方向。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">에다가 → 附着 / 操作目标</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">强调"在这个地方做了什么"，有操作感</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">노트에다가 써요.</span><span style="font-size:14px;color:#5a4640">在笔记本上写。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">벽에다가 붙여요.</span><span style="font-size:14px;color:#5a4640">贴在墙上。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">얼굴에다 크림을 발라요.</span><span style="font-size:14px;color:#5a4640">在脸上涂面霜。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">에 → 位置 / 方向 / 存在</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">单纯说明在哪里，或往哪个方向</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">학교에 가요.</span><span style="font-size:14px;color:#5a4640">去学校。（方向）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">가방에 있어요.</span><span style="font-size:14px;color:#5a4640">在包里。（存在）</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0">
  <div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">常见搭配动词</div>
  <div style="font-size:15px;color:#5a4640">쓰다（写）／붙이다（贴）／넣다（放入）／바르다（涂）／두다（放置）／그리다（画）</div>
</div>
<div class="reminder-box">있다/없다（存在动词）用 에，不用 에다가：가방에다가 있어요 ✗ → 가방에 있어요 ✓。</div>`,
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
        <div style="background:#fff0f5;border-radius:10px;padding:10px;text-align:center"><div style="font-size:14px;font-weight:800;color:#ff7fa8">에다가</div><div style="font-size:11px;color:#89756e;margin-top:2px">完整·正式</div></div>
        <div style="background:#eaf8f5;border-radius:10px;padding:10px;text-align:center"><div style="font-size:14px;font-weight:800;color:#2db89b">에다</div><div style="font-size:11px;color:#89756e;margin-top:2px">缩略·口语</div></div>
        <div style="background:#f0f4ff;border-radius:10px;padding:10px;text-align:center"><div style="font-size:14px;font-weight:800;color:#6b7ff0">에</div><div style="font-size:11px;color:#89756e;margin-top:2px">最简·通用</div></div>
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
      { ko: '노트에다가 메모했어요', zh: '在笔记本上记了备忘录。', tokens: [{ text: '노트에다가', role: 'place' }, { text: '메모했어요', role: 'verb' }] },
      { ko: '가방에다 책을 넣었어요', zh: '把书放进包里了。', tokens: [{ text: '가방에다', role: 'place' }, { text: '책을', role: 'object' }, { text: '넣었어요', role: 'verb' }] },
      { ko: '냉장고에 음식을 넣어요', zh: '把食物放进冰箱里。', tokens: [{ text: '냉장고에', role: 'place' }, { text: '음식을', role: 'object' }, { text: '넣어요', role: 'verb' }] },
      { ko: '벽에다가 포스터를 붙였어요', zh: '在墙上贴了海报。', tokens: [{ text: '벽에다가', role: 'place' }, { text: '포스터를', role: 'object' }, { text: '붙였어요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + 에다가 → 在……上/里（完整口语形式）', examples: '노트에다가 써요 / 가방에다가 넣어요 / 벽에다가 붙여요' },
      { type: 'rule', text: '名词 + 에다 → 缩略形，意思相同', examples: '노트에다 써요 / 얼굴에다 바르다' },
      { type: 'compare', text: '에다가 vs 에：强调程度不同', examples: '에다가 强调"在这个地方操作" / 에 只说明位置' },
      { type: 'usage', text: '常见搭配动词', examples: '쓰다（写）/ 붙이다（贴）/ 넣다（放入）/ 바르다（涂）/ 두다（放置）/ 그리다（画）' },
      { type: 'note', text: '에다가 不用于方向移动，只用于附着/操作', examples: '✗ 학교에다가 가요 → ✓ 학교에 가요（去学校用 에，不用 에다가）' },
      { type: 'vocab', text: '常见目标名词', examples: '노트 / 벽 / 가방 / 냉장고 / 얼굴 / 종이 / 핸드폰' },
      { type: 'example', text: '노트에다가 메모했어요 / 얼굴에다 크림을 발랐어요 / 가방에 책을 넣었어요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '노트에다가', role: 'place' }, { text: '메모했어요', role: 'verb' }], zh: '在笔记本上记了备忘录。', swapRole: 'place', swapWords: ['노트에다가', '종이에다가', '핸드폰에다가'] },
      { wordBlocks: [{ text: '가방에다', role: 'place' }, { text: '책을', role: 'object' }, { text: '넣었어요', role: 'verb' }], zh: '把书放进包里了。', swapRole: 'object', swapWords: ['책을', '물을', '지갑을'] },
      { wordBlocks: [{ text: '벽에다가', role: 'place' }, { text: '포스터를', role: 'object' }, { text: '붙였어요', role: 'verb' }], zh: '在墙上贴了海报。', swapRole: 'object', swapWords: ['포스터를', '사진을', '메모지를'] },
      { wordBlocks: [{ text: '얼굴에다', role: 'place' }, { text: '크림을', role: 'object' }, { text: '발랐어요', role: 'verb' }], zh: '在脸上涂了面霜。', swapRole: 'place', swapWords: ['얼굴에다', '손에다', '팔에다'] },
    ],
    scenarios: [
      { icon: '📝', context: '记下重要内容', ko: '중요한 내용은 노트에다가 꼭 메모해요.', zh: '重要的内容一定要在笔记本上记下来。' },
      { icon: '🎒', context: '出门准备', ko: '가방에다가 물이랑 지갑을 넣었어요.', zh: '把水和钱包放进包里了。' },
      { icon: '🖼️', context: '装饰房间', ko: '방 벽에다가 좋아하는 포스터를 붙였어요.', zh: '在房间墙上贴了喜欢的海报。' },
      { icon: '🧴', context: '护肤步骤', ko: '세수하고 얼굴에다 로션을 발라요.', zh: '洗脸后在脸上涂乳液。' },
      { icon: '🍱', context: '收纳食物', ko: '남은 음식을 냉장고에다 넣어 두세요.', zh: '把剩下的食物放进冰箱里保存吧。' },
      { icon: '✏️', context: '写备注', ko: '여기에다가 이름을 써 주세요.', zh: '请在这里写上名字。' },
    ],
    mistakes: [
      { wrong: '학교에다가 가요', correct: '학교에 가요', note: '에다가 不用于移动方向，去某地用 에 就够了。' },
      { wrong: '노트에다가 공부해요', correct: '노트로 공부해요', note: '공부하다 不是"往笔记本上做"的动作，应用 로 表示工具/方式。' },
      { wrong: '가방에다가 있어요', correct: '가방에 있어요', note: '存在（있다/없다）用位置助词 에，不用 에다가。' },
      { wrong: '벽에다가 가요', correct: '벽으로 가요 또는 벽 쪽으로 가요', note: '에다가 表示附着操作，不表示移动方向。' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p7-l06', partNumber: 7, lessonNumber: 6, title: '-지만, -는/은/ㄴ데',
    whatItDoes: '表示"虽然……但是……"的对比转折',
    whatItDoesBody: '-지만 是明确的转折连词，相当于"虽然……但是……"。\n-는/은/ㄴ데 语气更柔和，可以是背景铺垫也可以是转折。\n和中文"虽然……但是"对应，-지만 更直接，-는데 更委婉。\n两者都能连接两个句子，但 -지만 转折感更强。',
    structureNote: '下面展示两种转折的典型句型。\n-지만 直接加在动词/形容词词干后，不看收音。\n-는/은/ㄴ데 的变形规则参考第3课。',
    rulesNote: '-지만：所有动词/形容词词干 + 지만（不看收음）。\n이다 → 이지만 / 아니다 → 아니지만。\n-지만 语气明确，两个分句形成直接对比。\n-는데 语气柔和，更适合日常对话。',
    scenarioNote: '表达矛盾心理、做对比评价时必用。\n"喜欢但贵""好吃但辣"这类日常表达全靠 -지만 或 -는데。',
    step0Html: `<div class="card-title">-지만 · -는/은/ㄴ데</div>
<div class="card-body">两种转折表达：-지만 直接明确，-는데 柔和委婉。一个句子里"虽然……但是"，选哪个取决于你想传递的语气。</div>
<div class="hook-box">
  <div style="font-size:12px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">同一个意思，两种语气</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-지만（明确转折）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비싸지만 사고 싶어요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">虽然贵，但是想买。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-는데（柔和铺垫）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">피곤한데 잠이 안 와요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">虽然累，但是睡不着。</div>
    </div>
  </div>
</div>
<div class="reminder-box">-지만 词干直接加，不看收音。名词后用 이지만：학생이지만 ✓，학생지만 ✗。</div>`,
    compareHtml: `<div class="card-title">-지만（强转折）vs -는/은/ㄴ데（柔和转折）</div>
<div class="card-body">两者都能表示转折，但 -지만 对比感强，-는데 语气轻，还可以只是铺垫背景。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-지만 → 明确转折，强对比</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">动词/形容词词干 + 지만（不看收音）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비싸지만 좋아요.</span><span style="font-size:14px;color:#5a4640">虽然贵，但好。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">어렵지만 재미있어요.</span><span style="font-size:14px;color:#5a4640">虽然难，但有趣。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">학생이지만 일해요.</span><span style="font-size:14px;color:#5a4640">虽然是学生，但在工作。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는/은/ㄴ데 → 柔和转折 / 背景铺垫</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">动词→-는데 / 形容词→-(으)ㄴ데 / 过去→-았는데</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">맛있는데 매워요.</span><span style="font-size:14px;color:#5a4640">好吃，但是辣。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">피곤한데 잠이 안 와요.</span><span style="font-size:14px;color:#5a4640">虽然累，但睡不着。</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0">
  <div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">选哪个？</div>
  <div style="font-size:15px;color:#5a4640">写作、正式表达 → 用 -지만（对比明确）</div>
  <div style="margin-top:4px;font-size:15px;color:#5a4640">日常聊天、委婉表达 → 用 -는데（语气轻）</div>
</div>
<div class="reminder-box">两个分句主语可以不同：저는 좋지만 친구는 싫어해요（我喜欢但朋友不喜欢）。-지만 不限制主语是否相同。</div>`,
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
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">-지만</span>：词干 + 지만（가지만 / 먹지만 / 좋지만 / 학생이지만）</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">-는/은/ㄴ데</span>：动词→-는데 / 形容词→-(으)ㄴ데 / 过去→-았는데</div>
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
      { ko: '비싸지만 사고 싶어요', zh: '虽然贵，但是想买。', tokens: [{ text: '비싸지만', role: 'plain' }, { text: '사고 싶어요', role: 'verb' }] },
      { ko: '맛있지만 매워요', zh: '虽然好吃，但是辣。', tokens: [{ text: '맛있지만', role: 'plain' }, { text: '매워요', role: 'verb' }] },
      { ko: '한국어는 어렵지만 재미있어요', zh: '韩语虽然难，但是有趣。', tokens: [{ text: '한국어는', role: 'subject' }, { text: '어렵지만', role: 'plain' }, { text: '재미있어요', role: 'verb' }] },
      { ko: '피곤한데 잠이 안 와요', zh: '虽然累，但是睡不着。', tokens: [{ text: '피곤한데', role: 'plain' }, { text: '잠이', role: 'subject' }, { text: '안 와요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '动词/形容词词干 + 지만（不看收音）', examples: '가다→가지만 / 먹다→먹지만 / 크다→크지만 / 좋다→좋지만' },
      { type: 'rule', text: '이다 → 이지만 / 명사 + 이지만', examples: '학생이지만 / 한국 사람이지만' },
      { type: 'rule', text: '-지만 过去时：词干末元음 ㅏ/ㅗ + 았지만 / 其他 + 었지만 / 하다 → 했지만', examples: '갔지만 / 먹었지만 / 공부했지만' },
      { type: 'rule', text: '-는/은/ㄴ데 变形：动词词干 + 는데 / 形容词有收음 + 은데 / 无收음 + ㄴ데 / 名词 + 인데', examples: '가다→가는데 / 먹다→먹는데 / 작다→작은데 / 크다→큰데 / 학생→학생인데' },
      { type: 'rule', text: '-는/은/ㄴ데 过去时：词干末元음 ㅏ/ㅗ + 았는데 / 其他 + 었는데 / 하다 → 했는데', examples: '갔는데 / 먹었는데 / 공부했는데' },
      { type: 'compare', text: '-지만 vs -는데：转折强度不同', examples: '-지만：明确转折，强对比 / -는데：柔和铺垫，可转折可背景' },
      { type: 'usage', text: '-지만 常见句型：A하지만 B', examples: '비싸지만 좋아요 / 작지만 귀여워요 / 힘들지만 즐거워요' },
      { type: 'usage', text: '-는/은/ㄴ데 用于委婉转折（参考第3课变形规则）', examples: '맛있는데 매워요 / 좋은데 비싸요 / 갔는데 없었어요' },
      { type: 'note', text: '两个分句主语可以相同也可以不同', examples: '저는 좋지만 친구는 싫어해요（主语不同）' },
      { type: 'example', text: '비싸지만 사고 싶어요 / 맛있는데 너무 매워요 / 한국어가 어렵지만 재미있어요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '비싸지만', role: 'plain' }, { text: '사고 싶어요', role: 'verb' }], zh: '虽然贵，但是想买。', swapRole: 'plain', swapWords: ['비싸지만', '작지만', '어렵지만'] },
      { wordBlocks: [{ text: '맛있지만', role: 'plain' }, { text: '매워요', role: 'verb' }], zh: '虽然好吃，但是辣。', swapRole: 'verb', swapWords: ['매워요', '비싸요', '양이 적어요'] },
      { wordBlocks: [{ text: '한국어는', role: 'subject' }, { text: '어렵지만', role: 'plain' }, { text: '재미있어요', role: 'verb' }], zh: '韩语虽然难，但是有趣。', swapRole: 'subject', swapWords: ['한국어는', '이 드라마는', '이 노래는'] },
      { wordBlocks: [{ text: '피곤한데', role: 'plain' }, { text: '잠이', role: 'subject' }, { text: '안 와요', role: 'verb' }], zh: '虽然累，但是睡不着。', swapRole: 'plain', swapWords: ['피곤한데', '배고픈데', '바쁜데'] },
    ],
    scenarios: [
      { icon: '🛍️', context: '纠结要不要买', ko: '이 옷 너무 비싸지만 정말 갖고 싶어요.', zh: '这件衣服虽然很贵，但真的很想要。' },
      { icon: '🍜', context: '推荐但有提醒', ko: '이 라면은 맛있지만 많이 매우니까 조심하세요.', zh: '这个拉面好吃，但是很辣，请小心。' },
      { icon: '📚', context: '学习感受', ko: '한국어가 어렵지만 포기하고 싶지 않아요.', zh: '韩语虽然难，但是不想放弃。' },
      { icon: '😴', context: '失眠烦恼', ko: '피곤한데 잠이 안 와요. 스트레스 때문인 것 같아요.', zh: '虽然累，但睡不着。好像是压力的原因。' },
      { icon: '🎵', context: '评价一首歌', ko: '이 노래는 좋은데 가사가 너무 슬퍼요.', zh: '这首歌很好，但是歌词太悲伤了。' },
      { icon: '🏃', context: '运动矛盾', ko: '운동하기 싫지만 건강을 위해서 해요.', zh: '虽然不想运动，但为了健康还是做。' },
    ],
    mistakes: [
      { wrong: '비싸이지만', correct: '비싸지만', note: '形容词/动词词干直接加 -지만，不需要插入 이。' },
      { wrong: '학생지만', correct: '학생이지만', note: '名词后面需要 이지만（이다 的词干是 이）。' },
      { wrong: '맛있지만, 매워요', correct: '맛있지만 매워요', note: '-지만 连接两个分句，中间不需要逗号，是一个连续的句子。' },
      { wrong: '좋지만 사요', correct: '좋지만 안 사요 / 좋아서 사요', note: '转折的两个分句要有逻辑对比，"好但买"不构成转折，应改为因果（좋아서）或换后半句。' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p7-l07', partNumber: 7, lessonNumber: 7, title: '-(으)니까, -느라고',
    whatItDoes: '说明原因——"因为……所以……"的两种方式',
    whatItDoesBody: '-(으)니까 是最常用的原因连词，后句可以是命令、建议、请求。\n-느라고 强调"因为忙于做A，所以B受影响"，带有轻微的遗憾或解释意味。\n和中文"因为"对应，但 -느라고 只用于说明为何没能做另一件事，有负面结果含义。',
    structureNote: '下面展示两种原因表达的句型框架。\n注意：-느라고 的后句通常是负面结果或遗憾，不能用命令/建议句。',
    rulesNote: '-(으)니까：词干有收音 + 으니까，无收음 + 니까。\nㄹ 词干脱落 ㄹ 后加 니까（알다→아니까）。\n-느라고：只接动词词干（형용词不能用）+ 느라고，不看收音。\n-느라고 的主语前后句必须一致。',
    scenarioNote: '解释为什么迟到、为什么没做作业、为什么没接电话——全都用 -(으)니까 或 -느라고。\n-느라고 特别适合解释"忙于某事导致忘了/没能做另一件事"的场景。',
    step0Html: `<div class="card-title">-(으)니까 · -느라고</div>
<div class="card-body">两种"因为"：-(으)니까 最通用，后面可接命令建议；-느라고 专门解释"忙于A导致B没能做"。</div>
<div class="hook-box">
  <div style="font-size:12px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">两种原因，用法不同</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-(으)니까（通用原因）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비가 오니까 우산을 챙겨요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">因为下雨，所以带伞。（可接建议）</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-느라고（忙于A导致B）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">공부하느라고 전화를 못 받았어요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">因为在学习，没能接电话。（负面结果）</div>
    </div>
  </div>
</div>
<div class="reminder-box">-느라고 后面不能接命令句：공부하느라고 공부하세요 ✗。-느라고 前后句主语必须相同。</div>`,
    compareHtml: `<div class="card-title">-(으)니까 vs -느라고</div>
<div class="card-body">同样说"因为"，但两者有严格的使用限制。搞清楚三个关键差异就不会用错。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-(으)니까 → 通用原因，后句无限制</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">动词/形容词词干 + (으)니까</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">배고프니까 먹어요.</span><span style="font-size:14px;color:#5a4640">因为饿，所以吃。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">피곤하니까 일찍 자세요.</span><span style="font-size:14px;color:#5a4640">因为累，请早睡。（可接命令）</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-느라고 → 忙于A，导致B受影响</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">动词词干 + 느라고（不接形容词，主语必须相同）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">공부하느라고 못 잤어요.</span><span style="font-size:14px;color:#5a4640">因为在学习，没能睡觉。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">일하느라고 많이 피곤해요.</span><span style="font-size:14px;color:#5a4640">因为工作，很累。</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0">
  <div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">三个关键差异</div>
  <div style="font-size:15px;color:#5a4640">① 后句类型：-(으)니까 可接命令/建议，-느라고 只接陈述（负面结果）</div>
  <div style="margin-top:4px;font-size:15px;color:#5a4640">② 词性：-느라고 只接动词，形容词不能用</div>
  <div style="margin-top:4px;font-size:15px;color:#5a4640">③ 主语：-느라고 前后句主语必须相同</div>
</div>
<div class="reminder-box">피곤하느라고 ✗（피곤하다 是形容词）→ 피곤하니까 ✓。먹으느라고 ✗ → 먹느라고 ✓（느라고 直接加词干，不加 으）。</div>`,
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
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">-(으)니까</span>：有收音+으니까 / 无收音+니까 / ㄹ词干脱落后+니까</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">-느라고</span>：动词词干+느라고（不看收音，不接形容词）</div>
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
      { ko: '배가 고프니까 밥을 먹어요', zh: '因为饿，所以吃饭。', tokens: [{ text: '배가', role: 'subject' }, { text: '고프니까', role: 'plain' }, { text: '밥을', role: 'object' }, { text: '먹어요', role: 'verb' }] },
      { ko: '비가 오니까 우산을 챙겨요', zh: '因为下雨，所以带伞。', tokens: [{ text: '비가', role: 'subject' }, { text: '오니까', role: 'plain' }, { text: '우산을', role: 'object' }, { text: '챙겨요', role: 'verb' }] },
      { ko: '공부하느라고 전화를 못 받았어요', zh: '因为在学习，所以没能接电话。', tokens: [{ text: '공부하느라고', role: 'plain' }, { text: '전화를', role: 'object' }, { text: '못 받았어요', role: 'verb' }] },
      { ko: '아르바이트하느라고 많이 피곤해요', zh: '因为在打工，所以很累。', tokens: [{ text: '아르바이트하느라고', role: 'plain' }, { text: '많이', role: 'plain' }, { text: '피곤해요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '词干 无收음 + 니까 / 有收음 + 으니까', examples: '가다→가니까 / 먹다→먹으니까 / 좋다→좋으니까' },
      { type: 'rule', text: '名词 有收음 + 이니까 / 名词 无收음 + 니까', examples: '학생이니까 / 의사이니까 / 친구니까 / 선생님이니까' },
      { type: 'rule', text: '未来时：词干 有收음 + 을 거니까 / 无收음 + ㄹ 거니까', examples: '먹을 거니까 / 갈 거니까 / 바쁠 거니까' },
      { type: 'rule', text: '过去时：词干末元음 ㅏ/ㅗ + 았으니까 / 其他 + 었으니까 / 하다 → 했으니까', examples: '갔으니까 / 먹었으니까 / 공부했으니까' },
      { type: 'rule', text: 'ㄹ 词干：脱落 ㄹ 후 + 니까', examples: '알다→아니까 / 만들다→만드니까 / 멀다→머니까' },
      { type: 'rule', text: '动词词干 + 느라고（不看收음，只接动词）', examples: '공부하다→공부하느라고 / 일하다→일하느라고 / 먹다→먹느라고' },
      { type: 'compare', text: '-(으)니까 vs -느라고', examples: '-(으)니까：可接命令/建议 / -느라고：后句是负面结果，不接命令/建议' },
      { type: 'usage', text: '-느라고 的后句特征：못 하다 / 늦다 / 피곤하다 등 负面结果', examples: '자느라고 못 일어났어요 / 공부하느라고 늦었어요' },
      { type: 'note', text: '-느라고 前后句主语必须相同', examples: '✗ 내가 바쁘느라고 친구가 기다렸어요 → ✓ 내가 바빠서 친구가 기다렸어요' },
      { type: 'example', text: '피곤하니까 일찍 자요 / 늦었으니까 빨리 가요 / 청소하느라고 못 봤어요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '배가', role: 'subject' }, { text: '고프니까', role: 'plain' }, { text: '먹어요', role: 'verb' }], zh: '因为饿，所以吃。', swapRole: 'plain', swapWords: ['고프니까', '아프니까', '피곤하니까'] },
      { wordBlocks: [{ text: '비가', role: 'subject' }, { text: '오니까', role: 'plain' }, { text: '집에 있어요', role: 'verb' }], zh: '因为下雨，所以在家。', swapRole: 'verb', swapWords: ['집에 있어요', '우산을 챙겨요', '나가지 마세요'] },
      { wordBlocks: [{ text: '공부하느라고', role: 'plain' }, { text: '전화를', role: 'object' }, { text: '못 받았어요', role: 'verb' }], zh: '因为在学习，没能接电话。', swapRole: 'plain', swapWords: ['공부하느라고', '일하느라고', '자느라고'] },
      { wordBlocks: [{ text: '게임하느라고', role: 'plain' }, { text: '숙제를', role: 'object' }, { text: '못 했어요', role: 'verb' }], zh: '因为在玩游戏，没做作业。', swapRole: 'plain', swapWords: ['게임하느라고', '요리하느라고', '청소하느라고'] },
    ],
    scenarios: [
      { icon: '☔', context: '建议带伞', ko: '비가 오니까 우산을 꼭 챙기세요.', zh: '因为下雨，一定要带伞。' },
      { icon: '😴', context: '解释没接电话', ko: '자느라고 전화를 못 받았어요. 미안해요.', zh: '因为在睡觉，没能接电话。对不起。' },
      { icon: '⏰', context: '解释迟到', ko: '길이 막히니까 조금 늦을 것 같아요.', zh: '因为堵车，好像会晚一点到。' },
      { icon: '📚', context: '解释没做作业', ko: '아르바이트하느라고 숙제를 못 했어요.', zh: '因为在打工，没能做作业。' },
      { icon: '🍽️', context: '建议吃饭', ko: '배고프니까 밥 먼저 먹어요.', zh: '因为饿了，先吃饭吧。' },
      { icon: '💪', context: '解释很累', ko: '운동하느라고 많이 피곤해요.', zh: '因为在运动，很累。' },
    ],
    mistakes: [
      { wrong: '피곤하느라고 못 잤어요', correct: '피곤하니까 못 잤어요', note: '-느라고 只接动词，피곤하다 是形容词，要用 -(으)니까。' },
      { wrong: '공부하느라고 공부하세요', correct: '공부하니까 집중하세요', note: '-느라고 后句不能是命令句，要换成 -(으)니까。' },
      { wrong: '내가 바쁘느라고 친구가 기다렸어요', correct: '내가 바빠서 친구가 기다렸어요', note: '-느라고 前后句主语必须相同，主语不同时用 -아/어서。' },
      { wrong: '먹으느라고', correct: '먹느라고', note: '-느라고 直接加在动词词干后，不需要加 으。' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p7-l08', partNumber: 7, lessonNumber: 8, title: '때문에, -거든요',
    whatItDoes: '说明原因或给出解释性补充',
    whatItDoesBody: '때문에 接在名词或动词后，表示"因为……的缘故"，语气较正式。\n-거든요 用在句尾，给对方提供解释或补充说明，语气轻松，像在说"其实是因为……"。\n和中文"是因为……""其实啊……"对应，-거든요 带有轻微的解释语气，常用于口语。',
    structureNote: '下面展示两种原因说明的句型框架。\n때문에 可接名词（名词 + 때문에）或动词（-기 때문에），-거든요 直接加在句尾。',
    rulesNote: '名词 + 때문에（因为某事物）。\n动词/形容词 词干 + 기 때문에（因为做某事/某状态）。\n-거든요：词干 + 거든요，不看收음，陈述解释理由。\n-거든요 语气轻，不适合正式场合。',
    scenarioNote: '때문에 适合写作和正式解释，-거든요 适合日常聊天中的轻松说明。\n对方问你为什么迟到，口语回答用 -거든요；写请假条用 때문에。',
    step0Html: `<div class="card-title">때문에 · -거든요</div>
<div class="card-body">两种"原因说明"：때문에 正式书面，-거든요 口语轻松补充。一个用于写作，一个用于聊天。</div>
<div class="hook-box">
  <div style="font-size:12px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">同样说原因，语气不同</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">때문에（正式）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">스트레스 때문에 잠을 못 자요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">因为压力睡不着觉。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-거든요（口语补充）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">사실 피곤하거든요.</div>
      <div style="font-size:12px;color:#89756e;margin-top:2px">其实是因为很累。（轻松解释）</div>
    </div>
  </div>
</div>
<div class="reminder-box">-거든요 是解释补充，后面不能接命令句：피곤하거든요 쉬세요 ✗ → 피곤하니까 쉬세요 ✓。</div>`,
    compareHtml: `<div class="card-title">때문에 vs -거든요</div>
<div class="card-body">两者都说"因为/原因"，但使用场合和语气完全不同。写作用 때문에，聊天用 -거든요。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">때문에 → 正式原因说明</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">名词+때문에 / 动词+기 때문에</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">날씨 때문에 못 갔어요.</span><span style="font-size:14px;color:#5a4640">因为天气没能去。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">바쁘기 때문에 못 해요.</span><span style="font-size:14px;color:#5a4640">因为忙没办法做。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-거든요 → 口语补充解释</div>
    <div style="font-size:14px;color:#89756e;margin-top:2px">动词/形容词词干 + 거든요（放句尾）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">사실 그 노래 알거든요.</span><span style="font-size:14px;color:#5a4640">其实我知道那首歌呢。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">저 한국어 배우거든요.</span><span style="font-size:14px;color:#5a4640">我在学韩语呢。</span></div>
  </div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0">
  <div style="font-size:15px;font-weight:700;color:#241917;margin-bottom:6px">-거든요 的语感</div>
  <div style="font-size:15px;color:#5a4640">-거든요 常与 사실（其实）搭配，带有"我来告诉你一个你可能不知道的理由"的语感。</div>
  <div style="margin-top:4px;font-size:15px;color:#5a4640">사실 저 그 사람 알거든요. → "其实我认识那个人，（所以我知道……）"</div>
</div>
<div class="reminder-box">때문에 需要前有名词或 -기：때문에 가요 ✗ → 그것 때문에 가요 ✓。-거든요 不能后接命令句，需换成 -(으)니까。</div>`,
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">第 7 章 第 8 课 · 已完成</div>
    <div class="ov-hero-title">때문에 · -거든요</div>
    <div class="ov-hero-sub">正式原因 · 口语解释 · 사실과 함께</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title" style="color:#ff7fa8">结构速查</div></div>
    <div class="ov-block">
      <div style="display:flex;flex-direction:column;gap:6px">
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">名词+때문에</span>：날씨 때문에 / 스트레스 때문에</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#ff7fa8">动词+기 때문에</span>：바쁘기 때문에 / 오기 때문에</div>
        <div style="font-size:13px;color:#241917"><span style="font-weight:700;color:#2db89b">-거든요</span>：피곤하거든요 / 알거든요 / 배우거든요</div>
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
      { ko: '스트레스 때문에 잠을 못 자요', zh: '因为压力睡不着觉。', tokens: [{ text: '스트레스', role: 'subject' }, { text: '때문에', role: 'plain' }, { text: '잠을', role: 'object' }, { text: '못 자요', role: 'verb' }] },
      { ko: '비가 오기 때문에 못 가요', zh: '因为下雨，所以不能去。', tokens: [{ text: '비가', role: 'subject' }, { text: '오기 때문에', role: 'plain' }, { text: '못 가요', role: 'verb' }] },
      { ko: '사실 피곤하거든요', zh: '其实是因为很累。', tokens: [{ text: '사실', role: 'plain' }, { text: '피곤하거든요', role: 'verb' }] },
      { ko: '저 한국어를 배우거든요', zh: '我在学韩语呢。（所以…）', tokens: [{ text: '저', role: 'subject' }, { text: '한국어를', role: 'object' }, { text: '배우거든요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + 때문에 → 因为（名词）', examples: '날씨 때문에 / 스트레스 때문에 / 너 때문에' },
      { type: 'rule', text: '动词/形容词 词干 + 기 때문에 → 因为（动作/状态）', examples: '비가 오기 때문에 / 바쁘기 때문에 / 좋아하기 때문에' },
      { type: 'rule', text: '动词/形容词 词干 + 거든요 → 解释说明（口语）', examples: '피곤하거든요 / 배우거든요 / 알거든요' },
      { type: 'compare', text: '때문에 vs 거든요', examples: '때문에：正式/书面原因说明 / 거든요：口语轻松补充解释' },
      { type: 'usage', text: '-거든요 常与 사실（其实）搭配', examples: '사실 저 그 노래 좋아하거든요（其实我喜欢那首歌）' },
      { type: 'note', text: '-거든요 不用于命令或建议句', examples: '✗ 피곤하거든요 쉬세요 → ✓ 피곤하니까 쉬세요' },
      { type: 'example', text: '교통 때문에 늦었어요 / 공부하기 때문에 바빠요 / 사실 그 사람 알거든요' },
    ],
    cardExamples: [
      { wordBlocks: [{ text: '스트레스', role: 'subject' }, { text: '때문에', role: 'plain' }, { text: '못 자요', role: 'verb' }], zh: '因为压力睡不着。', swapRole: 'subject', swapWords: ['스트레스', '날씨', '교통'] },
      { wordBlocks: [{ text: '비가', role: 'subject' }, { text: '오기 때문에', role: 'plain' }, { text: '못 가요', role: 'verb' }], zh: '因为下雨不能去。', swapRole: 'subject', swapWords: ['비가', '눈이', '바람이'] },
      { wordBlocks: [{ text: '사실', role: 'plain' }, { text: '피곤하거든요', role: 'verb' }], zh: '其实是因为很累。', swapRole: 'verb', swapWords: ['피곤하거든요', '바쁘거든요', '아프거든요'] },
      { wordBlocks: [{ text: '저', role: 'subject' }, { text: '그 노래', role: 'object' }, { text: '좋아하거든요', role: 'verb' }], zh: '我喜欢那首歌呢。', swapRole: 'object', swapWords: ['그 노래', '그 드라마', '그 아이돌'] },
    ],
    scenarios: [
      { icon: '😩', context: '解释睡不好', ko: '요즘 스트레스 때문에 잠을 못 자고 있어요.', zh: '最近因为压力睡不着觉。' },
      { icon: '🚗', context: '解释迟到', ko: '교통 때문에 늦었어요. 죄송해요.', zh: '因为交通堵塞迟到了。对不起。' },
      { icon: '🎵', context: '解释为什么知道', ko: '사실 저 그 노래 알거든요. 진짜 좋아해요.', zh: '其实我知道那首歌，真的很喜欢。' },
      { icon: '📖', context: '解释为什么忙', ko: '요즘 시험 공부하기 때문에 바빠요.', zh: '最近因为要备考，所以很忙。' },
      { icon: '🤫', context: '告诉朋友秘密', ko: '사실 저 한국어를 배우거든요. 아무한테도 말 안 했어요.', zh: '其实我在学韩语，没告诉任何人。' },
      { icon: '☔', context: '解释不出门', ko: '비가 오기 때문에 오늘은 집에 있을 거예요.', zh: '因为下雨，今天打算待在家里。' },
    ],
    mistakes: [
      { wrong: '때문에 가요', correct: '그 때문에 가요 / 그래서 가요', note: '때문에 需要前面有明确的名词或动词 기，不能单独开头。' },
      { wrong: '피곤하거든요 쉬세요', correct: '피곤하니까 쉬세요', note: '-거든요 是解释补充，后面不能接命令句，要换成 -(으)니까。' },
      { wrong: '날씨가 추워서 집에 있어요. 거든요.', correct: '날씨가 춥거든요. 그래서 집에 있어요.', note: '-거든요 是解释理由的语尾，放在陈述句末尾，不能单独成句放在后面。' },
      { wrong: '너무 바빴거든요 못 갔어요', correct: '너무 바빴거든요. 못 갔어요.', note: '-거든요 放在句尾作解释，不能直接连接后续动词句，需要断句。' },
    ],
    linkedGrammarIds: [],
  },
  {
    id: 'card-p7-l09', partNumber: 7, lessonNumber: 9, isPractice: true, title: '综合练习⑦',
    whatItDoes: '综合练习第七章所有语法点',
    whatItDoesBody: '本章学习了比较（처럼/같이/같은）、时间经过（-은/ㄴ 지 되다）、背景转折（-(으)ㄴ/는데）、全称否定（아무도/하나도）、附加助词（에다가）、对比转折（-지만）、原因（-(으)니까/-느라고）、原因说明（때문에/-거든요）。\n通过综合练习巩固这些语法点的用法和辨析。',
    structureNote: '本章八个语法点的核心要点：\n① 처럼/같이 修饰动词，같은 修饰名词\n② -은/ㄴ 지 됐어요 说经过时间\n③ -는데 铺垫转折\n④ 아무도/아무것도 + 否定\n⑤ 에다가 强调附着操作\n⑥ -지만 明确转折\n⑦ -(으)니까 可接命令建议，-느라고 后接负面结果\n⑧ 때문에 正式原因，-거든요 口语补充',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    linkedGrammarIds: [],
  },
];
