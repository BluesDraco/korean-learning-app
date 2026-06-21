import type { GrammarCard } from '@/types';

export const grammarCardsP4: GrammarCard[] = [
  {
    id: 'card-p4-l01',
    partNumber: 4,
    lessonNumber: 1,
    title: '-고, -아/어/여서',
    whatItDoes: '连接两个动作，说原因和顺序',
    whatItDoesBody: '-고 把两个动作并列或按顺序连起来；\n-아/어/여서 表示原因、理由，或前后动作自然衔接。\n这节课是"复句"的起点学会这两个连接形式，就能把单句扩展成连贯的表达。\n中文"吃饭和喝水"直接用"和"连接，韩语用 -고 嵌入动词词干；\n中文"因为……所以"是独立词，韩语的 -아/어서 直接附在动词后，没有独立的"因为"词。',
    structureNote: '两个连接形式功能不同：\n-고 是中性连接（做A然后做B），-아/어/여서 是因果连接（因为A所以B）。\n结构上都是接在前一个动词词干后，后句正常说。',
    rulesNote: '-고 接续最简单直接去掉 다 加 고，大多数不规则在 -고 前不触发。\n-아/어/여서 变形和 -아요/어요 一样：\n词干末元音 ㅏ/ㅗ→아서，其他→어서，하다→해서。\n注意：\n-아/어/여서 原因句后面不适合接命令句。',
    scenarioNote: '这两个连接形式是韩语表达的骨架"喝完咖啡再学""因为发音快所以难""因为头疼所以休息"，几乎每句复句都用得到。\n掌握这节课，你的韩语表达会从"断句"变成"连贯句"。',
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-고 · -아/어/여서</h1>
<p style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">把两个动作连起来——顺序连接或原因连接。</p>
<div class="block">
  <div style="font-size:16px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">노래를 듣고 가사를 봐요.</div>
    <div class="zh">听歌，然后看歌词。（顺序连接）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">머리가 아파서 쉬어요.</div>
    <div class="zh">因为头疼，所以休息。（原因连接）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:16px">발음이 빨라서 어려워요.</div>
    <div class="zh">因为发音快，所以难。</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心区别</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#ff7fa8;font-size:16px">-고</span>
      <span style="font-size:16px;color:#241917">并列/顺序（中性连接，做A然后做B）</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#6b7ff0;font-size:16px">-아/어/여서</span>
      <span style="font-size:16px;color:#241917">原因/先后（因为A所以B，主语须一致）</span>
    </div>
  </div>
</div>
<div class="reminder-box">하다 + 아/어/여서 → 해서（不是 하서）。ㅡ 脱落：아프다 → 아파서。ㅂ 不规则：어렵다 → 어려워서。</div>`,
    compareHtml: `<div class="card-title">-고 vs -아/어/여서</div>
<div class="card-body">两者都能连接两个动作，但连接关系不同：-고 是中性顺序，-아/어/여서 是原因或自然先后。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v" style="background:#fff0f5;color:#ff7fa8">-고（顺序/并列）</div><div style="font-size:16px;color:#89756e;margin-top:2px">中性连接，前后无因果关系</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">노래를 듣고 가사를 봐요.</span><span style="font-size:16px;color:#5a4640">听歌，然后看歌词。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v" style="background:#f0f0ff;color:#6b7ff0">-아/어/여서（原因）</div><div style="font-size:16px;color:#89756e;margin-top:2px">前句是原因，后句是结果</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">머리가 아파서 쉬어요.</span><span style="font-size:16px;color:#5a4640">因为头疼，所以休息。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">-고 vs -아/어/여서 핵심 차이</div><div style="font-size:16px;color:#5a4640">-고（顺序/并列）：前后动作可以交换顺序，结果不变——학교에 가고 공부해요。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">-아/어/여서（原因）：前句是后句的原因，顺序固定——배가 고파서 밥을 먹어요（因为饿所以吃饭）。</div></div>
<div class="reminder-box">노래를 듣어서 가사를 봐요 ✗ — 顺序并列用 -고，不用 -아/어/여서。两者不能混用。</div>`,
    compareLabel: '-고 vs -아/어/여서',
    structures: [
      {
        ko: '동사/형용사 어간 + -고',
        zh: '动词/形容词词干 + -고',
        tokens: [
          { text: '동사/형용사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-고', role: 'plain' },
        ],
      },
      {
        ko: '동사/형용사 + -아/어/여서',
        zh: '动词/形容词 + -아/어/여서',
        tokens: [
          { text: '동사/형용사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-아/어/여서', role: 'plain' },
        ],
      },
      {
        ko: '커피를 마시고 공부해요.',
        zh: '喝咖啡，然后学习。',
        tokens: [
          { text: '커피를', role: 'object' },
          { text: '마시고', role: 'verb' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '머리가 아파서 쉬어요.',
        zh: '因为头疼，所以休息。',
        tokens: [
          { text: '머리가', role: 'subject' },
          { text: '아파서', role: 'verb' },
          { text: '쉬어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-고：去掉词典形的 다，直接加 고', examples: '듣다→듣고 / 걷다→걷고 / 쓰다→쓰고（接 -고 时多数不规则不触发变化）' },
      { type: 'rule', text: '名词 + -고：名词+(이)고', examples: '有收音→이고：학생이고 / 无收音→고：가수고（两者并列）' },
      { type: 'rule', text: '-아/어/여서 原因：词干末元音 ㅏ/ㅗ→아서；其他→어서；하다→해서', examples: '名词有收音→이라서；无收音→라서' },
      { type: 'usage', text: '-아/어/여서 先后动作：表示前后两个动作紧密连接，两个动作的主语必须一致', examples: '相当于"……然后……"连动结构' },
      { type: 'note', text: '하다 变形：하다→해서', examples: '不是 하서 或 공부하서' },
      { type: 'note', text: 'ㅡ 脱落', examples: '아프다→아파서 / 예쁘다→예뻐서' },
      { type: 'note', text: 'ㅂ 不规则', examples: '어렵다→어려워서 / 가볍다→가벼워서' },
      { type: 'note', text: '原因句注意：用 -아/어/여서 表原因时，后句不接命令式更自然' },
      { type: 'usage', text: '小贴士：可以拆分为两句话用 그래서 连接', examples: '감기에 걸렸어요. 그래서 학교에 안 가요.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '단어를', role: 'object' },
          { text: '외우고', role: 'verb' },
          { text: '문장을', role: 'object' },
          { text: '읽어요', role: 'verb' },
        ],
        zh: '背单词，然后读句子。',
        swapWords: ['단어를 외우고', '노래를 듣고', '커피를 마시고'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '머리가', role: 'subject' },
          { text: '아파서', role: 'verb' },
          { text: '쉬어요', role: 'verb' },
        ],
        zh: '因为头疼，所以休息。',
        swapRole: 'subject',
          swapWords: ['머리가 아파서', '시간이 없어서', '발음이 빨라서'],
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '듣고', role: 'verb' },
          { text: '가사를', role: 'object' },
          { text: '봐요', role: 'verb' },
        ],
        zh: '听歌，然后看歌词。',
        swapWords: ['노래를 듣고', '영상을 보고', '단어를 외우고'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '발음이', role: 'subject' },
          { text: '빨라서', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '因为发音快，所以难。',
        swapRole: 'subject',
          swapWords: ['발음이 빨라서', '단어가 많아서', '문법이 어려워서'],
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习流程', ko: '단어를 외우고 문장을 읽어요.', zh: '背单词，然后读句子。' },
      { icon: '🎵', context: 'KPOP 跟读', ko: '노래를 듣고 따라 해요.', zh: '听歌，然后跟读。' },
      { icon: '🤒', context: '身体状态', ko: '배가 아파서 병원에 가요.', zh: '因为肚子疼，去医院。' },
      { icon: '⏰', context: '无法赴约', ko: '시간이 없어서 못 가요.', zh: '因为没时间，所以不能去。' },
      { icon: '🎤', context: '跟唱困难', ko: '발음이 빨라서 따라 하기 어려워요.', zh: '因为发音快，跟读很难。' },
      { icon: '☕', context: '日常顺序', ko: '커피를 마시고 공부해요.', zh: '喝咖啡，然后学习。' },
    ],
    mistakes: [
      { wrong: '공부하서 피곤해요.', correct: '공부해서 피곤해요.', note: '하다 + 아/어/여서 → 해서，不是 하서' },
      { wrong: '아프어서 쉬어요.', correct: '아파서 쉬어요.', note: 'ㅡ 脱落规则：아프다 → 아파서' },
      { wrong: '발음이 빨라서 연습하세요.', correct: '발음이 빨라서 연습해요.', note: '原因句后接命令式不自然，初级用陈述句' },
      { wrong: '노래를 듣어서 가사를 봐요.', correct: '노래를 듣고 가사를 봐요.', note: '并列顺序用 -고，不用 -아/어/여서' },
    ],
    quickTable: {
      title: '변형표',
      headers: ['词典形', '-고', '-아/어/여서'],
      rows: [
        ['가다 去', '가고', '가서'],
        ['먹다 吃', '먹고', '먹어서'],
        ['하다 做', '하고', '해서'],
        ['아프다 疼/难受', '아프고', '아파서'],
        ['어렵다 难', '어렵고', '어려워서'],
        ['듣다 听', '듣고', '들어서'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-고 · -아/어/여서 完成！</div>
  <div class='ov-sub'>连接词让句子流畅起来</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>-고</span> 并列顺序：먹고 공부해요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>-아/어/여서</span> 原因先后：아파서 쉬어요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>하다 变形</span> 하다 → 해서（不是 하서）</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>ㅡ 脱落</span> 아프다 → 아파서</div>
</div>`,
    linkedGrammarIds: ['g21', 'g23'],
  },
  {
    id: 'card-p4-l02',
    partNumber: 4,
    lessonNumber: 3,
    title: '-아/어/여야 하다/되다, -지 말다',
    whatItDoes: '说必须做，或请别人别做',
    whatItDoesBody: '-아/어/여야 해요 / 돼요 表达"必须、应该、得……"；\n-지 마세요 表达"请不要……"。\n-아/어/여야 해요 对应中文"得……/必须……"，-지 마세요 对应"请不要……"，两者都是日常非常高频的表达。',
    structureNote: '两块内容：①必须做（-아/어/여야 해요/돼요）变形和 -아요/어요 一样，再加 야 해요/돼요；\n②请不要（-지 마세요）直接接词干加 지 마세요，不需要考虑收音。',
    rulesNote: '变形重点：\n하다 动词→해야 해요（공부해야 해요），不是 하야 해요。\nㄷ 不规则在 -아/어야 前触发（듣다→들어야 해요）。\n돼요 和 해요 意思相同，돼요 更口语化。\n-지 마세요 比 -지 않아요 多一层指令语气，不能混用。',
    scenarioNote: '必须做的事（复习、练习、准时到）和请求别人不要做（别担心、别忘了）这两种表达在学习打卡、日常沟通、服务场合都随处可见。\n学完这节课，你能发出请求也能表达义务。',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">-아/어/여야 해요 · -지 마세요</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">表达"必须做"和"请不要做"。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">오늘 단어를 복습해야 해요.</span> — 今天必须复习单词。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">아프면 쉬어야 돼요.</span> — 如果不舒服，就应该休息。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">녹음 중에는 나가지 마세요.</span> — 录音中请不要退出。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个核心结构</div>
  <div style="margin-bottom:6px">① <b>-아/어/여야 해요</b> — 必须做（义务）<br><span style="color:#89756e;font-size:16px">变形和 -아요/어요 一样，再加 야 해요/돼요</span></div>
  <div>② <b>-지 마세요</b> — 请不要做（指令）<br><span style="color:#89756e;font-size:16px">直接接词干 + 지 마세요，不需要考虑收音</span></div>
</div>
<div class="reminder-box">하다→해야 해요（不是 하야 해요）；ㄷ 不规则：듣다→들어야 해요；-지 마세요 直接接词干：가지 마세요 / 먹지 마세요。</div>`,
    compareHtml: `<div class="card-title">-아/어/여야 해요 vs -지 마세요</div>
<div class="card-body">两者都是对行为的态度表达，但方向相反：-아/어/여야 해요 是必须做（义务），-지 마세요 是请不要做（禁止/请求）。本课核心是掌握这两个语法的变形规则。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-아/어/여야 해요</div><div style="font-size:16px;color:#89756e;margin-top:2px">必须做（义务/要求）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">공부해야 해요.</span><span style="font-size:16px;color:#5a4640">必须学习。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">먹어야 해요.</span><span style="font-size:16px;color:#5a4640">必须吃。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">-지 마세요</div><div style="font-size:16px;color:#89756e;margin-top:2px">请不要做（禁止/请求）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">걱정하지 마세요.</span><span style="font-size:16px;color:#5a4640">请不要担心。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">늦지 마세요.</span><span style="font-size:16px;color:#5a4640">请不要迟到。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">变形规则</div><div style="font-size:16px;color:#5a4640">-아/어/여야 해요：词干末元音 ㅏ/ㅗ→아야 해요；其他→어야 해요；하다→해야 해요。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">-지 마세요：直接接词干，去掉 다 加 지 마세요，无需考虑收音。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">-아/어/여야 되다 和 -아/어/여야 하다 意思相同，都表示必须。</div><div style="margin-top:4px;font-size:16px;color:#e05555">注意 ㄷ 不规则：듣다→들어야 해요（不是 듣어야 해요）。</div></div>
<div class="reminder-box">공부해야 해요（必须学）vs 공부하지 마세요（请别学）— 义务和禁止方向相反，不能混用。하다 变形：하다→해야 해요（不是 하야 해요）。</div>`,
    compareLabel: '-아/어/여야 해요 vs -지 마세요',
    structures: [
      {
        ko: '동사 + -아/어/여야 해요',
        zh: '动词 + -아/어/여야 해요 = 必须……',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-아/어/여야 해요', role: 'plain' },
        ],
      },
      {
        ko: '동사 어간 + -지 마세요',
        zh: '动词词干 + -지 마세요 = 请不要……',
        tokens: [
          { text: '동사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-지 마세요', role: 'plain' },
        ],
      },
      {
        ko: '오늘 단어를 복습해야 해요.',
        zh: '今天必须复习单词。',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '단어를', role: 'object' },
          { text: '복습해야 해요', role: 'verb' },
        ],
      },
      {
        ko: '녹음 중에는 나가지 마세요.',
        zh: '录音中请不要退出。',
        tokens: [
          { text: '녹음 중에는', role: 'time' },
          { text: '나가지 마세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-아/어/여야 해요 变形规则：词干末音节元音是 ㅏ/ㅗ→아야 해요；其他→어야 해요；하다 结尾→해야 해요' },
      { type: 'note', text: '하다 动词：하다→해야 해요', examples: '공부하다→공부해야 해요，不是 공부하야 해요' },
      { type: 'note', text: 'ㄷ 不规则', examples: '듣다→들어야 해요 / 걷다→걸어야 해요' },
      { type: 'compare', text: '-아/어/여야 돼요：与 해야 해요 意思相同，更口语', examples: '복습해야 돼요 / 기다려야 돼요' },
      { type: 'vocab', text: '-지 말다 完整级别', examples: '-지 마세요（请不要）/ -지 마십시오（正式）/ -지 맙시다（共同，不要吧）/ -지 말고+句子（不要……而是）/ -지 말아요（不要）' },
      { type: 'rule', text: '-지 마세요：直接接词干', examples: '가지 마세요 / 먹지 마세요 / 걱정하지 마세요' },
      { type: 'compare', text: '注意区分：-지 않아요（不做，陈述）vs -지 마세요（请不要做，指令）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '단어를', role: 'object' },
          { text: '복습해야 해요', role: 'verb' },
        ],
        zh: '今天必须复习单词。',
        swapWords: ['복습해야 해요', '들어야 해요', '연습해야 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '먼저', role: 'time' },
          { text: '원곡을', role: 'object' },
          { text: '들어야 해요', role: 'verb' },
        ],
        zh: '首先要听原唱。',
        swapWords: ['들어야 해요', '봐야 해요', '외워야 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '걱정하지 마세요', role: 'verb' },
        ],
        zh: '请不要担心。',
        swapWords: ['걱정하지 마세요', '나가지 마세요', '늦지 마세요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '아프면', role: 'plain' },
          { text: '쉬어야 해요', role: 'verb' },
        ],
        zh: '如果不舒服，就应该休息。',
        swapWords: ['쉬어야 해요', '병원에 가야 해요', '약을 먹어야 해요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习任务', ko: '오늘 단어를 복습해야 해요.', zh: '今天必须复习单词。' },
      { icon: '🎵', context: 'KPOP 跟唱', ko: '먼저 원곡을 들어야 해요.', zh: '首先要听原唱。' },
      { icon: '🤒', context: '健康提醒', ko: '아프면 쉬어야 해요.', zh: '如果不舒服，就应该休息。' },
      { icon: '📱', context: 'App 提示', ko: '녹음 중에는 나가지 마세요.', zh: '录音中请不要退出。' },
      { icon: '⏰', context: '日程提醒', ko: '내일까지 제출해야 돼요.', zh: '明天之前必须提交。' },
      { icon: '🙏', context: '礼貌请求', ko: '여기서 사진을 찍지 마세요.', zh: '请不要在这里拍照。' },
    ],
    mistakes: [
      { wrong: '공부하야 해요.', correct: '공부해야 해요.', note: '하다 变形：하다 → 해야，不是 하야' },
      { wrong: '가요지 마세요.', correct: '가지 마세요.', note: '-지 마세요 直接接词干，不加 요 体' },
      { wrong: '먹지 않아요 (想表达请不要吃).', correct: '먹지 마세요.', note: '-지 않아요 是陈述"不吃"，-지 마세요 才是"请不要吃"' },
      { wrong: '들야 해요.', correct: '들어야 해요.', note: 'ㄷ 不规则：듣다 → 들어야 해요' },
    ],
    quickTable: {
      title: '변형표',
      headers: ['词典形', '-아/어/여야 해요', '-지 마세요'],
      rows: [
        ['가다 去', '가야 해요 必须去', '가지 마세요 请不要去'],
        ['먹다 吃', '먹어야 해요 必须吃', '먹지 마세요 请不要吃'],
        ['하다 做', '해야 해요 必须做', '하지 마세요 请不要做'],
        ['듣다 听', '들어야 해요 必须听', '듣지 마세요 请不要听'],
        ['복습하다 复习', '복습해야 해요 必须复习', '복습하지 마세요 请不要复习'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-야 해요 · -지 마세요 完成！</div>
  <div class='ov-sub'>说必须做，也说请不要做</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>-아/어/여야 해요</span> 必须：복습해야 해요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>-아/어/여야 돼요</span> 口语：복습해야 돼요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>-지 마세요</span> 请不要：걱정하지 마세요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>하다 变形</span> 하다 → 해야（不是 하야）</div>
</div>`,
    linkedGrammarIds: ['g70', 'g15'],
  },
  {
    id: 'card-p4-l03',
    partNumber: 4,
    lessonNumber: 4,
    title: '걸리다, -는 데(에) + 돈 + 들다',
    whatItDoes: '说花了多长时间、多少钱',
    whatItDoesBody: '걸려요 表示花费时间；\n-는 데 돈이 들어요 表示做某事花钱。\n和中文"花了三十分钟""很花钱"对应韩语要用专门的动词 걸리다（时间）和 들다（金钱），不能混用。',
    structureNote: '两块内容：①걸려요（花时间）时间词做主语，结构是"时间 + 걸려요"；\n②돈이 들어요（花钱）配合 -는 데 说"做某事花钱"。\n两者主语不同，걸려요 主语是时间，들어요 主语是 돈。',
    rulesNote: '걸리다 只用于时间，不能说花钱（花钱用 돈이 들어요）。\n-는 데 是动词的现在时修饰形 + 데，表示"做……这件事"。\n时间读法：\n分钟用汉字数词（삼십 분），小时用固有数词（두 시간）。',
    scenarioNote: '"从家到学校要多久""去演唱会很花钱"这类描述日常花费的表达，出行、购物、计划时都需要。\n掌握这节课，你能准确描述时间和金钱成本。',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">걸리다 · -는 데 들다</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">说花多少时间，或做某事要花多少钱。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">집에서 학교까지 삼십 분 걸려요.</span> — 从家到学校花三十分钟。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">콘서트에 가는 데 돈이 많이 들어요.</span> — 去演唱会很花钱。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">한국어를 배우는 데 시간이 걸려요.</span> — 学韩语很花时间。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个核心结构</div>
  <div style="margin-bottom:6px">① <b>时间 + 걸려요</b> — 花……时间<br><span style="color:#89756e;font-size:16px">主语是时间量，不是人</span></div>
  <div>② <b>动词 + -는 데 + 돈이 들어요</b> — 做某事花钱<br><span style="color:#89756e;font-size:16px">-는 데 = 做……这件事</span></div>
</div>
<div class="reminder-box">걸리다 只用于时间；花钱说 돈이 들어요，不能说 돈이 걸려요。分钟用汉字数词（삼십 분），小时用固有数词（두 시간）。</div>`,
    compareHtml: `<div class="card-title">걸려요（时间）vs 들어요（金钱）</div>
<div class="card-body">两个词都表示"花费"，但主语不同：걸려요 的主语是时间量，들어요 的主语通常是 돈（钱）。混用会造成语义错误。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">걸려요</div><div style="font-size:16px;color:#89756e;margin-top:2px">花时间（时间做主语）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한 시간이 걸려요.</span><span style="font-size:16px;color:#5a4640">花一个小时。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">서울까지 두 시간이 걸려요.</span><span style="font-size:16px;color:#5a4640">到首尔要花两个小时。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">돈이 들어요</div><div style="font-size:16px;color:#89756e;margin-top:2px">花钱（돈 做主语）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">돈이 많이 들어요.</span><span style="font-size:16px;color:#5a4640">很花钱。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">콘서트 티켓에 돈이 많이 들어요.</span><span style="font-size:16px;color:#5a4640">演唱会票很花钱。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">구조 비교</div><div style="font-size:16px;color:#5a4640">걸려요：시간 표현 + 이/가 걸려요（时间表达做主语）</div><div style="margin-top:4px;font-size:16px;color:#5a4640">들어요：돈이 들어요 / 비용이 들어요（돈/비용 做主语）</div><div style="margin-top:4px;font-size:16px;color:#5a4640">-는 데（에）걸려요/들어요：이 노래를 외우는 데 시간이 걸려요。</div></div>
<div class="reminder-box">콘서트에 가는 데 걸려요 ✗ — 去演唱会是花钱，要用 돈이 들어요，不用 걸려요。时间问句：얼마나 걸려요?（花多长时间？）/ 돈이 얼마나 들어요?（花多少钱？）</div>`,
    compareLabel: '걸려요（时间）vs 들어요（金钱）',
    structures: [
      {
        ko: '시간 + 걸려요',
        zh: '时间 + 걸려요 = 花……时间',
        tokens: [
          { text: '시간', role: 'time' },
          { text: '걸려요', role: 'verb' },
        ],
      },
      {
        ko: '장소에서 장소까지 + 시간 + 걸려요',
        zh: '从……到…… + 时间 + 걸려요',
        tokens: [
          { text: '장소에서', role: 'place' },
          { text: '장소까지', role: 'place' },
          { text: '시간', role: 'time' },
          { text: '걸려요', role: 'verb' },
        ],
      },
      {
        ko: '동사 + -는 데(에) + 돈이 들어요',
        zh: '动词 + -는 데 + 돈이 들어요 = 做……花钱',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '-는 데', role: 'plain' },
          { text: '돈이 들어요', role: 'verb' },
        ],
      },
      {
        ko: '집에서 학교까지 삼십 분 걸려요.',
        zh: '从家到学校花三十分钟。',
        tokens: [
          { text: '집에서', role: 'place' },
          { text: '학교까지', role: 'place' },
          { text: '삼십 분', role: 'time' },
          { text: '걸려요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '걸리다：主语是时间量', examples: '삼십 분 걸려요 / 두 시간 걸려요 / 일주일 걸려요' },
      { type: 'usage', text: '에서…까지：表示从某处到某处', examples: '집에서 학교까지 삼십 분 걸려요 / 베이징에서 한국까지 비행기로 두 시간 걸려요' },
      { type: 'rule', text: '동사 + -는 데：动词现在修饰形 + 데', examples: '가다→가는 데 / 배우다→배우는 데 / 공부하다→공부하는 데' },
      { type: 'rule', text: '돈이 들다：花钱说法', examples: '돈이 들어요 / 돈이 많이 들어요 / 돈이 안 들어요' },
      { type: 'note', text: '数字规则：分钟用汉字数词（삼십 분）；小时用固有数词（두 시간）' },
      { type: 'note', text: '걸리다 只用于时间，花钱要用 돈이 들어요' },
      { type: 'example', text: '교재 예문：이 책을 읽는 데 시간이 얼마나 걸렸어요?（하루 걸렸어요）/ 이 책을 쓰는 데 얼마나 걸렸어요?（꼬박 일년 걸렸어요）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '집에서', role: 'place' },
          { text: '학교까지', role: 'place' },
          { text: '삼십 분', role: 'time' },
          { text: '걸려요', role: 'verb' },
        ],
        zh: '从家到学校花三十分钟。',
        swapWords: ['삼십 분', '십 분', '한 시간'],
        swapRole: 'time',
      },
      {
        wordBlocks: [
          { text: '콘서트에', role: 'place' },
          { text: '가는 데', role: 'verb' },
          { text: '돈이', role: 'subject' },
          { text: '많이', role: 'plain' },
          { text: '들어요', role: 'verb' },
        ],
        zh: '去演唱会很花钱。',
        swapWords: ['돈이 많이 들어요', '돈이 안 들어요', '시간이 많이 걸려요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '배우는 데', role: 'verb' },
          { text: '시간이 많이', role: 'time' },
          { text: '걸려요', role: 'verb' },
        ],
        zh: '学韩语很花时间。',
        swapWords: ['시간이 많이 걸려요', '돈이 많이 들어요', '노력이 필요해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문장을', role: 'object' },
          { text: '이해하는 데', role: 'verb' },
          { text: '십 분', role: 'time' },
          { text: '걸렸어요', role: 'verb' },
        ],
        zh: '理解这个句子花了十分钟。',
        swapWords: ['십 분 걸렸어요', '오 분 걸렸어요', '한 시간 걸렸어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🚌', context: '通勤时间', ko: '집에서 학교까지 삼십 분 걸려요.', zh: '从家到学校花三十分钟。' },
      { icon: '📚', context: '学习时间', ko: '한국어를 배우는 데 시간이 많이 걸려요.', zh: '学韩语很花时间。' },
      { icon: '🎵', context: 'KPOP 演唱会', ko: '콘서트에 가는 데 돈이 많이 들어요.', zh: '去演唱会很花钱。' },
      { icon: '✈️', context: '旅行成本', ko: '한국에 가는 데 얼마나 들어요?', zh: '去韩国要花多少钱？' },
      { icon: '🧠', context: '理解难句', ko: '이 문장을 이해하는 데 십 분 걸렸어요.', zh: '理解这个句子花了十分钟。' },
      { icon: '💰', context: '免费学习', ko: '한국어를 배우는 데 돈이 안 들어요.', zh: '学韩语不花钱。' },
    ],
    mistakes: [
      { wrong: '콘서트에 가는 데 걸려요. (想说花钱)', correct: '콘서트에 가는 데 돈이 들어요.', note: '걸려요 只表示花时间，花钱要用 돈이 들어요' },
      { wrong: '한국어를 배우다 데 시간이 걸려요.', correct: '한국어를 배우는 데 시간이 걸려요.', note: '动词接 데 前要加 -는（现在修饰形）' },
      { wrong: '두 분 걸려요. (想说两分钟)', correct: '이 분 걸려요.', note: '分钟用汉字数词：이 분 / 삼십 분；小时用固有数词：두 시간' },
      { wrong: '학교에서 집에 삼십 분 걸려요.', correct: '학교에서 집까지 삼십 분 걸려요.', note: '终点用 까지，不用 에' },
    ],
    quickTable: {
      title: '시간 표현 속찰표',
      headers: ['说法', '例子', '中文'],
      rows: [
        ['N분 걸려요', '十分钟', '花十分钟'],
        ['N시간 걸려요', '两小时', '花两小时'],
        ['A에서 B까지 걸려요', '집에서 학교까지 삼십 분 걸려요', '从家到学校花30分钟'],
        ['-는 데 돈이 들어요', '가는 데 돈이 들어요', '去那里花钱'],
        ['-는 데 돈이 안 들어요', '배우는 데 돈이 안 들어요', '学习不花钱'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>걸려요 · 들어요 完成！</div>
  <div class='ov-sub'>说花多久，也说花多少钱</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>걸려요</span> 花时间：삼십 분 걸려요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>-는 데 들어요</span> 花钱：가는 데 돈이 들어요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>에서…까지</span> 从…到…：집에서 학교까지</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>数字规则</span> 분=汉字数词 / 시간=固有数词</div>
</div>`,
    linkedGrammarIds: [],
  },
  {
    id: 'card-p4-l04',
    partNumber: 4,
    lessonNumber: 5,
    title: '-은/ㄴ/는데요',
    whatItDoes: '说话时加自然的铺垫语气',
    whatItDoesBody: '-은/ㄴ/는데요 是口语常用的铺垫表达，带有"是这样，不过……"的语气，用于转折、说明、引出后文。\n中文没有完全对应的表达它更像是一种语气词，让句子听起来更柔和、更自然，不那么直接。',
    structureNote: '变形规则按词性分三类：\n动词→-는데요，形容词→-은/ㄴ데요（按받침），名词→인데요。\n本阶段的难点不在变形，而在理解这个语气词"在做什么"它是铺垫，不是转折词。',
    rulesNote: '形容词的变形：\n有받침→은데요（좋은데요），无받침→ㄴ데요（예쁜데요）。\nㅂ 不规则在此触发：\n어렵다→어려운데요。\n있다/없다 用 -는데요（和动词一样）。\n过去时统一用 았/었는데요。',
    scenarioNote: '-는데요 是让韩语听起来"像韩国人说的"的关键语气词"我在学习呢""这首歌挺好，不过……""我是学生……"。\n学会这个，你的表达会更柔和自然，不再只有干巴巴的陈述句。',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">-은/ㄴ/는데요</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">说话时加上自然的铺垫语气，让表达更柔和。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">이 노래는 좋은데요, 발음이 빨라요.</span> — 这首歌挺好，不过发音很快。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">저는 학생인데요.</span> — 我是学生，是这样的……</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">지금 공부하고 있는데요.</span> — 我现在正在学习呢……</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">变形规则（按词性）</div>
  <div style="margin-bottom:6px">① 动词 → <b>-는데요</b>：가다→가는데요 / 먹다→먹는데요</div>
  <div style="margin-bottom:6px">② 形容词有收音 → <b>-은데요</b>：좋다→좋은데요</div>
  <div style="margin-bottom:6px">③ 形容词无收音 → <b>-ㄴ데요</b>：예쁘다→예쁜데요</div>
  <div>④ 名词 → <b>인데요</b>：학생→학생인데요</div>
</div>
<div class="reminder-box">-는데요 不只是"但是"——更多时候是铺垫语气，引出话题或委婉说明。ㅂ 不规则：어렵다→어려운데요。있다/없다 和动词一样用 -는데요。</div>`,
    compareHtml: `<div class="card-title">动词 -는데요 vs 形容词 -은/ㄴ데요</div>
<div class="card-body">动词和形容词的变形规则不同：动词统一用 -는데요，形容词按有无收音用 -은데요/-ㄴ데요。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">动词 + -는데요</div><div style="font-size:16px;color:#89756e;margin-top:2px">动词现在时铺垫</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지금 공부하는데요.</span><span style="font-size:16px;color:#5a4640">我现在正在学习呢……</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">이 노래 아는데요.</span><span style="font-size:16px;color:#5a4640">这首歌我知道呢……</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">形容词 + -은/ㄴ데요</div><div style="font-size:16px;color:#89756e;margin-top:2px">按有无收音区分</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">좋은데요 / 예쁜데요</span><span style="font-size:16px;color:#5a4640">挺好的 / 挺漂亮的</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">어려운데요 / 바쁜데요</span><span style="font-size:16px;color:#5a4640">挺难的 / 挺忙的</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">变形规则总结</div><div style="font-size:16px;color:#5a4640">动词（현재）→ -는데요（统一，无需看收音）</div><div style="margin-top:4px;font-size:16px;color:#5a4640">形容词 有收音 → -은데요：좋다→좋은데요 / 많다→많은데요</div><div style="margin-top:4px;font-size:16px;color:#5a4640">形容词 无收音 → -ㄴ데요：예쁘다→예쁜데요 / 크다→큰데요</div><div style="margin-top:4px;font-size:16px;color:#5a4640">名词 → -인데요：학생인데요 / 가수인데요</div></div>
<div class="reminder-box">좋는데요 ✗ → 좋은데요 ✓（形容词 좋다 有收音，用 -은데요，不是 -는데요）。있다/없다 例外：동사 규칙 따라 -는데요（있는데요 / 없는데요）。</div>`,
    compareLabel: '动词 -는데요 vs 形容词 -은/ㄴ데요',
    structures: [
      {
        ko: '형용사 (받침 O) + -은데요',
        zh: '形容词有收音 + -은데요',
        tokens: [
          { text: '형용사(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-은데요', role: 'plain' },
        ],
      },
      {
        ko: '형용사 (받침 X) + -ㄴ데요',
        zh: '形容词无收音 + -ㄴ데요',
        tokens: [
          { text: '형용사(받침X)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-ㄴ데요', role: 'plain' },
        ],
      },
      {
        ko: '동사 + -는데요',
        zh: '动词 + -는데요',
        tokens: [
          { text: '동사', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-는데요', role: 'plain' },
        ],
      },
      {
        ko: '명사 + 인데요',
        zh: '名词 + 인데요',
        tokens: [
          { text: '명사', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '인데요', role: 'plain' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词现在时统一用 -는데요', examples: '가다→가는데요 / 먹다→먹는데요 / 공부하다→공부하는데요' },
      { type: 'rule', text: '形容词有收音 + -은데요', examples: '좋다→좋은데요 / 작다→작은데요 / 많다→많은데요' },
      { type: 'rule', text: '形容词无收音 + -ㄴ데요', examples: '예쁘다→예쁜데요 / 바쁘다→바쁜데요 / 크다→큰데요' },
      { type: 'note', text: 'ㅂ 不规则', examples: '어렵다→어려운데요（ㅂ→우+ㄴ데요）' },
      { type: 'note', text: '있다/없다 → -는데요', examples: '있는데요 / 없는데요（与动词相同）' },
      { type: 'rule', text: '名词用 인데요', examples: '학생인데요 / 가수인데요' },
      { type: 'rule', text: '过去时：동사/형용사 末音节元音是 ㅏ/ㅗ→았는데요；其他→었는데요；하다→했는데요', examples: '갔는데요 / 먹었는데요 / 했는데요' },
      { type: 'usage', text: '-는데요 不只是"但是"，更多时候是铺垫语气，常用于对话中做铺垫、引出话题、委婉说明' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '이 노래는', role: 'subject' },
          { text: '좋은데요,', role: 'verb' },
          { text: '발음이', role: 'subject' },
          { text: '빨라요', role: 'verb' },
        ],
        zh: '这首歌挺好，不过发音很快。',
        swapWords: ['좋은데요', '어려운데요', '재미있는데요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지금', role: 'time' },
          { text: '공부하고', role: 'verb' },
          { text: '있는데요', role: 'verb' },
        ],
        zh: '我现在正在学习呢……',
        swapWords: ['공부하고 있는데요', '기다리고 있는데요', '듣고 있는데요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '학생인데요', role: 'verb' },
        ],
        zh: '我是学生，是这样的……',
        swapWords: ['학생인데요', '초보자인데요', '한국어 공부 중인데요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문법은', role: 'subject' },
          { text: '어려운데요', role: 'verb' },
        ],
        zh: '这个语法有点难呢。',
        swapWords: ['어려운데요', '재미있는데요', '쉬운데요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🙏', context: '委婉拒绝', ko: '좋은데요, 오늘은 시간이 없어요.', zh: '挺好的，不过今天没时间。' },
      { icon: '📚', context: '学习反馈', ko: '이 문법은 어려운데요.', zh: '这个语法有点难呢。' },
      { icon: '🎵', context: 'KPOP 评论', ko: '이 노래는 좋은데요, 발음이 빨라요.', zh: '这首歌挺好，不过发音很快。' },
      { icon: '👤', context: '自我说明', ko: '저는 학생인데요.', zh: '我是学生，是这样的……' },
      { icon: '📱', context: '正在进行', ko: '지금 공부하고 있는데요.', zh: '我现在正在学习呢……' },
      { icon: '💬', context: '引出后文', ko: '사실 한국어를 배우고 있는데요, 어렵지 않아요.', zh: '其实我在学韩语，不过不难。' },
    ],
    mistakes: [
      { wrong: '좋는데요.', correct: '좋은데요.', note: '形容词 좋다 有收音 ㅎ，接 -은데요，不是 -는데요' },
      { wrong: '학생는데요.', correct: '학생인데요.', note: '名词后要用 인데요，不是直接加 는데요' },
      { wrong: '어렵은데요.', correct: '어려운데요.', note: 'ㅂ 不规则：어렵다 → 어려운데요（ㅂ→우）' },
      { wrong: '只翻成"但是"', correct: '根据上下文判断铺垫/转折/说明', note: '-는데요 不等于"但是"，更多是铺垫语气，含义取决于上下文' },
    ],
    quickTable: {
      title: '接续规则表',
      headers: ['词性', '接续规则', '例子'],
      rows: [
        ['动词', '词干 + -는데요', '가다→가는데요'],
        ['形容词（有收音）', '词干 + -은데요', '좋다→좋은데요'],
        ['形容词（无收音）', '词干 + -ㄴ데요', '예쁘다→예쁜데요'],
        ['名词', '名词 + 인데요', '학생→학생인데요'],
        ['ㅂ 不规则', 'ㅂ→우 + ㄴ데요', '어렵다→어려운데요'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-는데요 완성！</div>
  <div class='ov-sub'>让你的韩语更有铺垫感</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>동사</span> 가는데요 / 먹는데요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>형용사</span> 좋은데요 / 예쁜데요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>명사</span> 학생인데요</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>语气</span> 铺垫 / 转折 / 委婉说明</div>
</div>`,
    linkedGrammarIds: ['g26'],
  },
  {
    id: 'card-p4-l05',
    partNumber: 4,
    lessonNumber: 6,
    title: '체언 서술형, -는 것, -게',
    whatItDoes: '把动作变名词，把形容词变副词',
    whatItDoesBody: '名词+이다 做谓语；\n动词 + -는 것 把动作名词化；\n形容词 + -게 变成副词，表示方式。\n这节课是韩语表达的"变形工具"让动词能当主语用，让形容词能修饰动作。\n中文动词可以直接当主语（"学习很重要"），韩语必须用 -는 것 把动词名词化才能放在主语或宾语位置。',
    structureNote: '三块内容：①명사+이에요（是……，已学基础）；\n②-는 것（动作名词化，"学习这件事"）；\n③-게（形容词变副词，"简单地""快速地"）。\n重点是后两个它们让句子结构更灵活。',
    rulesNote: '-는 것 直接接动词词干，形容词名词化是 -ㄴ/은 것（后续课程）。\n-게 直接接形容词词干，但注意：\n빠르다、많다、높다 等有专属副词（빨리/많이/높이），优先用专属副词，不用 -게。',
    scenarioNote: '"学韩语这件事很有意思""把句子写得简单一点""快速读歌词"-는 것 和 -게 在学习打卡、追星、日常表达里都高频出现。\n掌握这两个工具，你的句子能说得更精确。',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">-는 것 · -게</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">把动作变成"这件事"，把形容词变成副词。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">한국어를 배우는 것은 재미있어요.</span> — 学韩语这件事很有意思。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">노래를 듣는 것이 좋아요.</span> — 听歌这件事很好。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">문장을 쉽게 써요.</span> — 把句子写得简单一点。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三个变形工具</div>
  <div style="margin-bottom:6px">① <b>名词 + 이에요/예요</b> — 是……（基础谓语）</div>
  <div style="margin-bottom:6px">② <b>动词词干 + -는 것</b> — 做某事这件事（名词化）</div>
  <div>③ <b>形容词词干 + -게</b> — ……地（副词化，表示方式）</div>
</div>
<div class="reminder-box">빠르다/많다/높다 有专属副词（빨리/많이/높이），优先用专属副词，不用 -게。-는 것 只接动作动词，形容词名词化用 -ㄴ/은 것。</div>`,
    compareHtml: `<div class="card-title">-는 것（名词化）vs -게（副词化）</div>
<div class="card-body">两者都是"变形工具"，但方向不同：-는 것 把动作变成名词（可以做主语/宾语），-게 把形容词变成副词（修饰后面的动作）。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">动词 + -는 것</div><div style="font-size:16px;color:#89756e;margin-top:2px">动作→名词（这件事）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">듣는 것이 좋아요.</span><span style="font-size:16px;color:#5a4640">听这件事很好。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한국어를 배우는 것은 재미있어요.</span><span style="font-size:16px;color:#5a4640">学韩语这件事很有意思。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">形容词 + -게</div><div style="font-size:16px;color:#89756e;margin-top:2px">形容词→副词（方式）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">쉽게 써요.</span><span style="font-size:16px;color:#5a4640">简单地写。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">천천히 말해 주세요.</span><span style="font-size:16px;color:#5a4640">请慢慢说。（专属副词优先）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">주의 사항</div><div style="font-size:16px;color:#5a4640">빠르다/많다/높다 有专属副词（빨리/많이/높이），优先用专属副词，不用 -게。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">-는 것 只接动作动词（현재형）；形容词名词化用 -ㄴ/은 것（后续课程）。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">-는 것 可充当句子各成分：主语（-는 것이）/ 宾语（-는 것을）/ 主题（-는 것은）。</div></div>
<div class="reminder-box">쉽고 써요 ✗ → 쉽게 써요 ✓ — -게 表示方式，-고 表示并列顺序，两者不能混用。빠르게 가요 可以说，但 빨리 가요 更自然——遇到有专属副词的词，优先用专属副词。</div>`,
    compareLabel: '-는 것（名词化）vs -게（副词化）',
    structures: [
      {
        ko: '명사 + 이에요/예요',
        zh: '名词 + 이에요/예요 = 是……',
        tokens: [
          { text: '명사', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '이에요/예요', role: 'plain' },
        ],
      },
      {
        ko: '동사 어간 + -는 것',
        zh: '动词词干 + -는 것 = 做某事这件事',
        tokens: [
          { text: '동사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-는 것', role: 'plain' },
        ],
      },
      {
        ko: '형용사 어간 + -게',
        zh: '形容词词干 + -게 = ……地',
        tokens: [
          { text: '형용사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-게', role: 'plain' },
        ],
      },
      {
        ko: '한국어를 배우는 것은 재미있어요.',
        zh: '学韩语这件事很有意思。',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '배우는 것은', role: 'verb' },
          { text: '재미있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '名词+이다：口语变成 이에요/예요', examples: '학생→학생이에요 / 가수→가수예요。아버지는 의사이고 어머니는 선생님이에요' },
      { type: 'rule', text: '동사+-는 것：接现在修饰 형', examples: '보다→보는 것 / 듣다→듣는 것 / 공부하다→공부하는 것。可充当多种句子成分' },
      { type: 'note', text: '形容词 + -게 注意事项：如果形容词有专属副词，优先用专属副词', examples: '높다→높이（高）/ 빠르다→빨리（快）/ 많다→많이（多）' },
      { type: 'rule', text: '无专属副词时用 -게', examples: '맛있다→맛있게 / 예쁘다→예쁘게' },
      { type: 'usage', text: '-게 表示方式，修饰后面的动词', examples: '쉽게 써요（简单地写）/ 빠르게 읽어요（快速地读）' },
      { type: 'note', text: '-는 것 只接动作动词（现在时）；形容词名词化用 -ㄴ/은 것（后续课程学）' },
      { type: 'compare', text: '注意区分：-게（方式）vs -고（并列顺序）', examples: '쉽게 써요 vs 쓰고 읽어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '배우는 것은', role: 'verb' },
          { text: '재미있어요', role: 'verb' },
        ],
        zh: '学韩语这件事很有意思。',
        swapWords: ['배우는 것', '듣는 것', '쓰는 것'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '듣는 것이', role: 'verb' },
          { text: '좋아요', role: 'verb' },
        ],
        zh: '听歌这件事很好。',
        swapWords: ['듣는 것', '부르는 것', '외우는 것'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '문장을', role: 'object' },
          { text: '쉽게', role: 'plain' },
          { text: '써요', role: 'verb' },
        ],
        zh: '把句子写得简单一点。',
        swapWords: ['쉽게', '빠르게', '천천히'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '이 사람은', role: 'subject' },
          { text: '가수예요', role: 'verb' },
        ],
        zh: '这个人是歌手。',
        swapWords: ['가수예요', '학생이에요', '선생님이에요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习感受', ko: '한국어를 배우는 것은 재미있어요.', zh: '学韩语这件事很有意思。' },
      { icon: '🎵', context: 'KPOP 学习', ko: '노래를 듣는 것이 좋아요.', zh: '听歌这件事很好。' },
      { icon: '✏️', context: '写作练习', ko: '문장을 쉽게 써요.', zh: '把句子写得简单一点。' },
      { icon: '🗣️', context: '发音提示', ko: '천천히 말해 주세요.', zh: '请慢慢说。' },
      { icon: '👤', context: '自我介绍', ko: '저는 한국어 공부 중인 학생이에요.', zh: '我是正在学韩语的学生。' },
      { icon: '🏃', context: '方式说明', ko: '빠르게 읽는 것이 어려워요.', zh: '快速读这件事很难。' },
    ],
    mistakes: [
      { wrong: '좋는 것이 좋아요. (想说听歌)', correct: '듣는 것이 좋아요.', note: '-는 것 接动作动词，不接形容词' },
      { wrong: '쉽고 써요. (想说简单地写)', correct: '쉽게 써요.', note: '-게 表示方式，不是 -고（-고 表示并列顺序）' },
      { wrong: '저는 학생. (省略谓语)', correct: '저는 학생이에요.', note: '名词做谓语必须加 이에요/예요，不能省略' },
      { wrong: '빠르는 것 (想说快速这件事)', correct: '빠른 것', note: '形容词名词化用 -ㄴ/은 것，不是 -는 것（-는 것 只接动作动词）' },
    ],
    quickTable: {
      title: '변형 속찰표',
      headers: ['原形', '-는 것 / -게', '中文'],
      rows: [
        ['공부하다 学习', '공부하는 것 学习这件事', '学习这件事'],
        ['듣다 听', '듣는 것 听这件事', '听这件事'],
        ['쉽다', '쉽게 简单地', '简单地'],
        ['빠르다', '빨리（速度副词）快', '快（优先用 빨리）'],
        ['느리다', '느리게 慢慢地', '慢慢地'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>-는 것 · -게 완성！</div>
  <div class='ov-sub'>动作变事情，形容词变方式</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>명사+이에요</span> 가수예요 / 학생이에요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>동사+-는 것</span> 배우는 것 / 듣는 것</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>형용사+-게</span> 쉽게 / 빠르게</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>구분</span> -게（方式）≠ -고（并列）</div>
</div>`,
    linkedGrammarIds: ['g20', 'g13'],
  },
  {
    id: 'card-p4-l06',
    partNumber: 4,
    lessonNumber: 7,
    title: '보다, 에 비하다',
    whatItDoes: '说"比……更……"和"和……相比"',
    whatItDoesBody: 'N보다 表示"比……"；\n에 비해서 表示"和……相比"（更书面）。\n和中文一样，韩语比较句也是"A比B更……"的结构，보다 相当于中文的"比"，直接贴在比较基准后面。',
    structureNote: '这节课两个比较结构：①보다（口语比较）直接接在名词后，配合 더 加强；\n②에 비해서（书面比较）更适合分析说明。\n两者都能说"比……"，区别是语体风格。',
    rulesNote: '보다 直接贴名词后，无需考虑받침。\n더 可加可不加，加了更强调"更"。\n注意 보다 的双重身份：\n보다 动词是"看"，비교조사 보다 是"比"，看句子位置区分。\n에 비해서/비하면/비하여 是同一词的三种形式。',
    scenarioNote: '比较两首歌、两个语言的难度、两个地方的特点보다 是日常表达里用频率最高的比较词。\n学会这节课，你能准确说出"比……更好听""比昨天更难"。',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">보다 · 에 비해서</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">说"比……更……"，或"和……相比"。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">한국어는 영어보다 어려워요.</span> — 韩语比英语难。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">어제보다 오늘 더 잘해요.</span> — 今天比昨天做得更好。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">초급에 비해서 중급 문법은 어려워요.</span> — 和初级相比，中级语法更难。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两个比较结构</div>
  <div style="margin-bottom:6px">① <b>A는 B보다 (더) + 형용사</b> — A比B更……（口语，直接）</div>
  <div>② <b>B에 비해서 A는 + 형용사</b> — 和B相比，A……（书面，分析用）</div>
</div>
<div class="reminder-box">보다 直接贴在被比较对象后，더 可加可不加；에 비해서/비하면/비하여 是同一词的三种形式。注意：보다 还是动词"看"，靠位置区分。</div>`,
    compareHtml: `<div class="card-title">보다（口语）vs 에 비해서（书面）</div>
<div class="card-body">两者都能表达"比较"，但语体不同：보다 简洁直接，日常对话首选；에 비해서 偏书面，适合分析说明或写作场合。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">N보다</div><div style="font-size:16px;color:#89756e;margin-top:2px">口语比较，简洁直接</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">이 노래는 저 노래보다 빨라요.</span><span style="font-size:16px;color:#5a4640">这首歌比那首歌快。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한국어가 영어보다 어려워요.</span><span style="font-size:16px;color:#5a4640">韩语比英语难。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">에 비해서</div><div style="font-size:16px;color:#89756e;margin-top:2px">书面比较，适合分析说明</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">초급에 비해서 중급이 어려워요.</span><span style="font-size:16px;color:#5a4640">和初级相比，中级更难。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">작년에 비해서 실력이 늘었어요.</span><span style="font-size:16px;color:#5a4640">和去年相比，实力提升了。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">비교 구조</div><div style="font-size:16px;color:#5a4640">A가/는 B보다 + 형용사：A比B更……（보다 贴在基准B后面）</div><div style="margin-top:4px;font-size:16px;color:#5a4640">더 可省略，加了更强调：한국어가 영어보다 더 어려워요。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">에 비해서 = 에 비하면 = 에 비하여（三种形式意思相同）</div></div>
<div class="reminder-box">보다 接在被比较对象（基准）后，不是主语后：한국어는 영어보다 어려워요（韩语比英语难）— 영어 是基准，贴 보다。보다 더 싸요（比……更便宜）— 보다 단독으로도 쓸 수 있어요。</div>`,
    compareLabel: 'N보다（口语）vs 에 비해서（书面）',
    structures: [
      {
        ko: 'A는 B보다 더 + 형용사',
        zh: 'A 比 B 更……',
        tokens: [
          { text: 'A는', role: 'subject' },
          { text: 'B보다', role: 'plain' },
          { text: '더', role: 'plain' },
          { text: '형용사', role: 'verb' },
        ],
      },
      {
        ko: 'B보다 A가 더 + 형용사',
        zh: '比起 B，A 更……',
        tokens: [
          { text: 'B보다', role: 'plain' },
          { text: 'A가', role: 'subject' },
          { text: '더', role: 'plain' },
          { text: '형용사', role: 'verb' },
        ],
      },
      {
        ko: 'B에 비해서 A는 + 형용사',
        zh: '和 B 相比，A……',
        tokens: [
          { text: 'B에 비해서', role: 'plain' },
          { text: 'A는', role: 'subject' },
          { text: '형용사', role: 'verb' },
        ],
      },
      {
        ko: '한국어는 영어보다 어려워요.',
        zh: '韩语比英语难。',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '영어보다', role: 'plain' },
          { text: '어려워요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '보다：直接接在比较基准名词后', examples: '영어보다 / 어제보다 / 이 노래보다' },
      { type: 'usage', text: '更：더 可以加在形容词前强调"更"', examples: '더 어려워요 / 더 좋아요 / 더 빨라요' },
      { type: 'usage', text: '语序：A는 B보다 더 형용사（A比B更）；或 B보다 A가 더 형용사（比B，A更）' },
      { type: 'vocab', text: '에 비하다 三种形式', examples: '에 비해서（和……相比）/ 에 비하면（如果和……相比）/ 에 비하여（书面，和……相比）' },
      { type: 'example', text: '교재 예문：중국이 한국보다 커요 / 남자가 여자보다 힘이 세요 / 저는 바다보다 산을 더 좋아해요' },
      { type: 'compare', text: '보다 双重身份：동사 보다（看）vs 비교조사 보다（比）', examples: '영화를 봐요（看电影）vs 영어보다（比英语）' },
      { type: 'usage', text: '口语优先用 보다；写内容分析时可以用 에 비해서' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '영어보다', role: 'plain' },
          { text: '더 어려워요', role: 'verb' },
        ],
        zh: '韩语比英语更难。',
        swapWords: ['더 어려워요', '더 재미있어요', '더 어렵지 않아요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래는', role: 'subject' },
          { text: '저 노래보다', role: 'plain' },
          { text: '빨라요', role: 'verb' },
        ],
        zh: '这首歌比那首歌快。',
        swapWords: ['빨라요', '어려워요', '좋아요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어제보다', role: 'plain' },
          { text: '오늘', role: 'time' },
          { text: '더 잘해요', role: 'verb' },
        ],
        zh: '今天比昨天做得更好。',
        swapWords: ['더 잘해요', '더 좋아요', '더 열심히 해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '초급에 비해서', role: 'plain' },
          { text: '중급 문법은', role: 'subject' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '和初级相比，中级语法更难。',
        swapWords: ['어려워요', '복잡해요', '재미있어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习难度', ko: '한국어 문법은 발음보다 어려워요.', zh: '韩语语法比发音难。' },
      { icon: '🎵', context: 'KPOP 比较', ko: '이 노래는 저 노래보다 빨라요.', zh: '这首歌比那首歌快。' },
      { icon: '📈', context: '学习进步', ko: '어제보다 오늘 더 잘해요.', zh: '今天比昨天做得更好。' },
      { icon: '🏫', context: '课程分析', ko: '초급에 비해서 중급 문법은 어려워요.', zh: '和初级相比，中级语法更难。' },
      { icon: '🌏', context: '语言比较', ko: '영어에 비해서 한국어는 발음이 어려워요.', zh: '和英语相比，韩语发音更难。' },
      { icon: '🍽️', context: '餐厅比较', ko: '이 식당은 저 식당보다 더 맛있어요.', zh: '这家餐厅比那家餐厅更好吃。' },
    ],
    mistakes: [
      { wrong: '영어는 한국어보다 어려워요. (想说韩语比英语难)', correct: '한국어는 영어보다 어려워요.', note: '보다 接在比较基准（被比较的那个）后面，不是主语后' },
      { wrong: '보다 쓸 때 항상 동사 "보다"라고 생각함', correct: '영어보다 어려워요（比较助词）vs 영화를 봐요（动词看）', note: '보다 有两个用法：比较助词（接名词后）和动词"看"（需要宾语）' },
      { wrong: '일상 대화에서 에 비해서 남발', correct: '일상에서는 보다를, 분석/설명에서는 에 비해서를 써요.', note: '에 비해서 语气偏书面，日常对话直接用 보다 更自然' },
      { wrong: '어제보다 더 잘했어요. (忘记加时间词)', correct: '어제보다 오늘 더 잘해요.', note: '用 보다 比较时，两个比较对象要都出现在句中' },
    ],
    quickTable: {
      title: '비교 표현 속찰표',
      headers: ['表达', '用法', '例子'],
      rows: [
        ['A는 B보다 더...', 'A比B更...', '한국어는 영어보다 더 어려워요.'],
        ['B보다 A가 더...', '比起B，A更...', '영어보다 한국어가 더 어려워요.'],
        ['B에 비해서 A는...', '和B相比，A...', '영어에 비해서 한국어는 어려워요.'],
        ['어제보다 오늘 더...', '今天比昨天更...', '어제보다 오늘 더 잘해요.'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>보다 · 에 비해서 완성！</div>
  <div class='ov-sub'>比较让表达更有层次</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>N보다</span> 口语比较：영어보다 어려워요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>에 비해서</span> 书面比较：초급에 비해서 어려워요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>더</span> 加强"更"：더 어려워요 / 더 좋아요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 보다 两个身份：比较助词 vs 动词"看"</div>
</div>`,
    linkedGrammarIds: ['g10'],
  },
  {
    id: 'card-p4-l07',
    partNumber: 4,
    lessonNumber: 8,
    title: '(으)로',
    whatItDoes: '说用什么工具、以什么身份',
    whatItDoesBody: '(으)로 是多义助词：\n表示工具/语言、方向、身份结果。\n有收音用 으로，无收音或 ㄹ 收音用 로。\n中文"用韩语说""往右走""用信用卡付"都靠 (으)로 来表达。',
    structureNote: '(으)로 有四种用法：\n方向（往哪走）、工具/语言（用什么说/做）、变化结果（变成什么）、身份（作为什么）。\n结构一样，都贴在名词后，靠语境区分意思。',
    rulesNote: '받침 规则有个特例：\nㄹ 받침不接 으로，直接接 로（지하철로/서울로）。\n区分 에 和 (으)로：\n에 是"到达目的地"，(으)로 是"朝着方向走"학교에 가요（去学校）vs 오른쪽으로 가요（往右走）。',
    scenarioNote: '"用韩语说""往右转""用相机拍""换大号"(으)로 是你在韩国问路、购物、沟通时绕不开的助词。\n掌握这节课，遇到"用/往/作为"这类表达就能自然说出来。',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">(으)로</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">说用什么工具、往哪个方向、以什么身份。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">한국어로 말해요.</span> — 用韩语说。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">오른쪽으로 가세요.</span> — 请往右走。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">지하철로 학교에 가요.</span> — 坐地铁去学校。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">收音选择规则</div>
  <div style="margin-bottom:6px">有收音（非ㄹ）→ <b>으로</b>：펜→펜으로 / 오른쪽→오른쪽으로</div>
  <div style="margin-bottom:6px">无收音 → <b>로</b>：한국어→한국어로 / 버스→버스로</div>
  <div>ㄹ 收音（特例）→ <b>로</b>：지하철→지하철로 / 서울→서울로</div>
</div>
<div class="reminder-box">四种用法：方向（오른쪽으로）、工具/语言（한국어로）、变化结果（큰 사이즈로 바꿔요）、身份（선생님으로 일해요）。靠语境区分。</div>`,
    compareHtml: `<div class="card-title">에（到达）vs (으)로（方向/工具）</div>
<div class="card-body">两者都能和移动动词搭配，但含义不同：에 表示"到达的目的地"，(으)로 表示"朝着某个方向走"或"使用某种工具/方式"。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">에</div><div style="font-size:16px;color:#89756e;margin-top:2px">到达地点（目的地）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">학교에 가요.</span><span style="font-size:16px;color:#5a4640">去学校。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">도서관에 있어요.</span><span style="font-size:16px;color:#5a4640">在图书馆。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">(으)로</div><div style="font-size:16px;color:#89756e;margin-top:2px">方向 / 工具 / 身份</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">오른쪽으로 가요.</span><span style="font-size:16px;color:#5a4640">往右走。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한국어로 말해요.</span><span style="font-size:16px;color:#5a4640">用韩语说。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">四种用法</div><div style="font-size:16px;color:#5a4640">① 方向：오른쪽으로 가세요（往右走）</div><div style="margin-top:4px;font-size:16px;color:#5a4640">② 工具/手段：한국어로 말해요 / 카메라로 사진을 찍어요</div><div style="margin-top:4px;font-size:16px;color:#5a4640">③ 变化结果：큰 사이즈로 바꿔 주세요（换成大号）</div><div style="margin-top:4px;font-size:16px;color:#5a4640">④ 身份/资格：모범학생으로 뽑혔어요（被选为模范学生）</div></div>
<div class="reminder-box">학교로 가요 ✗（想说去学校）→ 학교에 가요 ✓ — 到达目的地用 에，(으)로 不表示目的地。注意：ㄹ 收音名词后用 로，不加 으：지하철로 가요（不是 지하철으로）。</div>`,
    compareLabel: '에（到达）vs (으)로（方向/工具）',
    structures: [
      {
        ko: '명사 (받침 O) + 으로',
        zh: '有收音名词 + 으로',
        tokens: [
          { text: '명사(받침O)', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '으로', role: 'plain' },
        ],
      },
      {
        ko: '명사 (받침 X / ㄹ) + 로',
        zh: '无收音或ㄹ收音 + 로',
        tokens: [
          { text: '명사(받침X/ㄹ)', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '로', role: 'plain' },
        ],
      },
      {
        ko: '한국어로 말해요.',
        zh: '用韩语说。',
        tokens: [
          { text: '한국어로', role: 'plain' },
          { text: '말해요', role: 'verb' },
        ],
      },
      {
        ko: '오른쪽으로 가세요.',
        zh: '请往右走。',
        tokens: [
          { text: '오른쪽으로', role: 'place' },
          { text: '가세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音（非 ㄹ）→ 으로', examples: '펜→펜으로 / 책→책으로 / 오른쪽→오른쪽으로' },
      { type: 'rule', text: '无收音 → 로', examples: '한국어→한국어로 / 버스→버스로 / 왼쪽→왼쪽으로' },
      { type: 'rule', text: 'ㄹ 收音 → 로（特例）', examples: '지하철→지하철로 / 서울→서울로' },
      { type: 'usage', text: '四种用法：① 方向（오른쪽으로 가세요）② 工具/手段（한국어로 말해요 / 카메라로 사진을 찍어요）③ 变化结果（큰 사이즈로 바꿔 주세요）④ 身份/资格（저는 모범학생으로 뽑혔어요）' },
      { type: 'compare', text: '에 vs (으)로：에 是到达地点（학교에 가요）；(으)로 是方向/方式（오른쪽으로 가요）' },
      { type: 'example', text: '재료/방법 예문：피자는 밀가루로 만들어요（材料）/ 신용카드로 계산하겠습니다（支付方式）' },
      { type: 'compare', text: '펜으로 써요（工具助词）vs 펜을 써요（宾语助词），语气不同' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어로', role: 'plain' },
          { text: '말해요', role: 'verb' },
        ],
        zh: '用韩语说。',
        swapWords: ['한국어로', '영어로', '중국어로'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '펜으로', role: 'plain' },
          { text: '써요', role: 'verb' },
        ],
        zh: '用笔写。',
        swapWords: ['펜으로', '연필로', '핸드폰으로'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '오른쪽으로', role: 'place' },
          { text: '가세요', role: 'verb' },
        ],
        zh: '请往右走。',
        swapWords: ['오른쪽으로', '왼쪽으로', '앞으로'],
        swapRole: 'place',
      },
      {
        wordBlocks: [
          { text: '지하철로', role: 'plain' },
          { text: '학교에', role: 'place' },
          { text: '가요', role: 'verb' },
        ],
        zh: '坐地铁去学校。',
        swapWords: ['지하철로', '버스로', '걸어서'],
        swapRole: 'plain',
      },
    ],
    scenarios: [
      { icon: '🗣️', context: '语言工具', ko: '한국어로 말해요.', zh: '用韩语说。' },
      { icon: '✏️', context: '书写工具', ko: '펜으로 문장을 써요.', zh: '用笔写句子。' },
      { icon: '🚇', context: '交通方式', ko: '지하철로 학교에 가요.', zh: '坐地铁去学校。' },
      { icon: '↩️', context: '路线方向', ko: '오른쪽으로 가세요.', zh: '请往右走。' },
      { icon: '📝', context: 'KPOP 练习', ko: '이 문장을 한국어로 써요.', zh: '把这个句子用韩语写出来。' },
      { icon: '👩‍🏫', context: '身份说明', ko: '선생님으로 일해요.', zh: '作为老师工作。' },
    ],
    mistakes: [
      { wrong: '지하철으로 가요.', correct: '지하철로 가요.', note: 'ㄹ 收音后用 로，不是 으로' },
      { wrong: '학교로 가요. (想说去学校)', correct: '학교에 가요.', note: '到达目的地用 에，(으)로 表方向/方式，不是目的地' },
      { wrong: '펜으로를 써요.', correct: '펜으로 써요.', note: '(으)로 已经是助词，后面不再加 를' },
      { wrong: '영어으로 말해요.', correct: '영어로 말해요.', note: '영어 无收音，用 로，不是 으로' },
    ],
    quickTable: {
      title: '로/으로 선택표',
      headers: ['名词末音', '助词', '例子'],
      rows: [
        ['有收音（非ㄹ）', '으로', '펜→펜으로 / 책→책으로'],
        ['无收音', '로', '한국어→한국어로 / 버스→버스로'],
        ['ㄹ收音', '로（ㄹ收音用）', '지하철→지하철로 / 서울→서울로'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>(으)로 완성！</div>
  <div class='ov-sub'>一个助词，三种用途</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>도구/언어</span> 한국어로 / 펜으로</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>방향</span> 오른쪽으로 / 서울로</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>신분</span> 선생님으로 일해요</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>ㄹ주의</span> 지하철로（ㄹ 받침 뒤에 로）</div>
</div>`,
    linkedGrammarIds: ['g9'],
  },
  {
    id: 'card-p4-l08',
    partNumber: 4,
    lessonNumber: 9,
    title: '(이)나, -거나',
    whatItDoes: '说"或者""随便哪个""至少"',
    whatItDoesBody: '(이)나 连接名词表示"或者"；\n-거나 连接动作表示"或者做……"。\n中文"咖啡或者茶""听歌或者看剧"前者用 (이)나，后者用 -거나，按名词/动词分类就记住了。',
    structureNote: '两块内容：①(이)나（名词之间的或者）按받침选 이나/나；\n②-거나（动作之间的或者）直接接动词词干，不考虑받침。\n选择表达是日常沟通中最基础的需求之一。',
    rulesNote: '(이)나 的收音规则和 이/가 完全一样：\n有收音→이나（책이나），无收音→나（커피나）。\n-거나 直接加词干，规律统一。\n注意 (이)나 还有另一个用法：\n表示"至少/就算"（밥이나 먹어요=就吃点饭吧），语气柔和。',
    scenarioNote: '"休息日听歌或者看剧""喝咖啡还是茶""无聊就刷刷手机"(이)나/-거나 在描述日常选择和习惯时极为常用。\n掌握这节课，你能更自然地描述自己的日常。',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">(이)나 · -거나</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">说"或者"——名词之间用 (이)나，动作之间用 -거나。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">커피나 차를 마셔요.</span> — 喝咖啡或者茶。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">노래를 듣거나 드라마를 봐요.</span> — 听歌或者看电视剧。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">토요일이나 일요일에 만나요.</span> — 周六或者周日见。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">选哪个？按名词/动作分</div>
  <div style="margin-bottom:6px">名词 + 有收音 → <b>이나</b>：책이나 / 토요일이나</div>
  <div style="margin-bottom:6px">名词 + 无收音 → <b>나</b>：커피나 / 차나</div>
  <div>动词词干 → <b>-거나</b>：듣거나 / 보거나 / 공부하거나</div>
</div>
<div class="reminder-box">(이)나 还带"随便/至少"语气：커피나 마셔요（随便喝杯咖啡吧）。-거나 不考虑收音，统一接词干。</div>`,
    compareHtml: `<div class="card-title">(이)나（名词）vs -거나（动作）</div>
<div class="card-body">两者都表示"或者"，但适用范围不同：名词之间只能用 (이)나，动作/状态之间只能用 -거나，不能混用。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">(이)나</div><div style="font-size:16px;color:#89756e;margin-top:2px">名词之间的"或者"</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">커피나 차 / 책이나 노트</span><span style="font-size:16px;color:#5a4640">咖啡或茶 / 书或笔记本</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">서울이나 부산에 가고 싶어요.</span><span style="font-size:16px;color:#5a4640">想去首尔或釜山。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">-거나</div><div style="font-size:16px;color:#89756e;margin-top:2px">动作之间的"或者"</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">듣거나 봐요.</span><span style="font-size:16px;color:#5a4640">听或者看。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">집에 있거나 공부해요.</span><span style="font-size:16px;color:#5a4640">在家或者学习。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">变形规则</div><div style="font-size:16px;color:#5a4640">(이)나：有收音名词 + 이나 / 无收音名词 + 나</div><div style="margin-top:4px;font-size:16px;color:#5a4640">-거나：现在时：去掉 다 接 거나（不考虑收音）</div><div style="margin-top:4px;font-size:16px;color:#5a4640">-거나：过去时：词干末元音 ㅏ/ㅗ→았거나；其他→었거나；하다→했거나</div></div>
<div class="reminder-box">커피거나 차를 마셔요 ✗ → 커피나 차를 마셔요 ✓ — 名词之间不用 -거나。듣이나 봐요 ✗ → 듣거나 봐요 ✓ — 动作之间不用 (이)나。</div>`,
    compareLabel: '(이)나（名词）vs -거나（动作）',
    structures: [
      {
        ko: '명사 (받침 O) + 이나 + 명사',
        zh: '有收音名词 + 이나',
        tokens: [
          { text: '명사(받침O)', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '이나', role: 'plain' },
          { text: '명사', role: 'subject' },
        ],
      },
      {
        ko: '명사 (받침 X) + 나 + 명사',
        zh: '无收音名词 + 나',
        tokens: [
          { text: '명사(받침X)', role: 'subject' },
          { text: '+', role: 'plain' },
          { text: '나', role: 'plain' },
          { text: '명사', role: 'subject' },
        ],
      },
      {
        ko: '동사 어간 + -거나',
        zh: '动词词干 + -거나',
        tokens: [
          { text: '동사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-거나', role: 'plain' },
        ],
      },
      {
        ko: '노래를 듣거나 드라마를 봐요.',
        zh: '听歌或者看电视剧。',
        tokens: [
          { text: '노래를', role: 'object' },
          { text: '듣거나', role: 'verb' },
          { text: '드라마를', role: 'object' },
          { text: '봐요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音 → 이나', examples: '책→책이나 / 물→물이나 / 토요일→토요일이나' },
      { type: 'rule', text: '无收音 → 나', examples: '커피→커피나 / 차→차나 / 친구→친구나' },
      { type: 'rule', text: '-거나 现在时：去掉 다 接 거나', examples: '보다→보거나 / 먹다→먹거나 / 공부하다→공부하거나' },
      { type: 'rule', text: '-거나 过去时：词干末音节元音是 ㅏ/ㅗ→았거나；其他→었거나；하다→했거나', examples: '갔거나 / 먹었거나 / 했거나' },
      { type: 'example', text: '교재 예문：학교에 갔거나 친구를 만났을 거예요 / 집에서 쉬거나 쇼핑을 해요' },
      { type: 'compare', text: '(이)나 用于名词之间；-거나 用于动作/状态之间，不能混用' },
      { type: 'usage', text: '(이)나 还带"随便选一个/至少"语气', examples: '커피나 마셔요（随便喝杯咖啡吧）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '커피나', role: 'object' },
          { text: '차를', role: 'object' },
          { text: '마셔요', role: 'verb' },
        ],
        zh: '喝咖啡或者茶。',
        swapWords: ['커피나 차를', '주스나 물을', '라면이나 밥을'],

        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '토요일이나', role: 'time' },
          { text: '일요일에', role: 'time' },
          { text: '만나요', role: 'verb' },
        ],
        zh: '周六或者周日见。',
        swapWords: ['토요일이나 일요일에', '아침이나 저녁에', '오전이나 오후에'],
        swapRole: 'time',
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '듣거나', role: 'verb' },
          { text: '문장을', role: 'object' },
          { text: '읽어요', role: 'verb' },
        ],
        zh: '听歌或者读句子。',
        swapWords: ['듣거나', '보거나', '따라 하거나'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '뮤비를', role: 'object' },
          { text: '보거나', role: 'verb' },
          { text: '가사를', role: 'object' },
          { text: '봐요', role: 'verb' },
        ],
        zh: '看 MV 或者看歌词。',
        swapWords: ['보거나', '듣거나', '따라 하거나'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☕', context: '点饮品', ko: '커피나 차를 마셔요.', zh: '喝咖啡或者茶。' },
      { icon: '📅', context: '约时间', ko: '토요일이나 일요일에 만나요.', zh: '周六或者周日见。' },
      { icon: '📚', context: '学习方式', ko: '노래를 듣거나 문장을 읽어요.', zh: '听歌或者读句子。' },
      { icon: '🎵', context: 'KPOP 内容', ko: '뮤비를 보거나 가사를 봐요.', zh: '看 MV 或者看歌词。' },
      { icon: '😴', context: '休息选择', ko: '공부하거나 쉬어요.', zh: '学习或者休息。' },
      { icon: '🍜', context: '随便选', ko: '라면이나 먹어요.', zh: '随便吃碗拉面吧。' },
    ],
    mistakes: [
      { wrong: '책나 노트', correct: '책이나 노트', note: '책 有收音，用 이나' },
      { wrong: '듣이나 봐요. (想说听或者看)', correct: '듣거나 봐요.', note: '动作之间用 -거나，不是 (이)나' },
      { wrong: '커피거나 차를 마셔요.', correct: '커피나 차를 마셔요.', note: '名词之间用 (이)나，不用 -거나' },
      { wrong: '나를 커피나 차를 마셔요. (나=我)', correct: '커피나 차를 마셔요.', note: '커피나 的 나 是助词，和代词"我（나）"不同' },
    ],
    quickTable: {
      title: '이나/나/거나 선택표',
      headers: ['情况', '助词', '例子'],
      rows: [
        ['名词有收音', '이나', '책이나 / 물이나'],
        ['名词无收音', '나', '커피나 / 차나'],
        ['动词/形容词', '-거나', '듣거나 / 보거나'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>(이)나 · -거나 완성！</div>
  <div class='ov-sub'>说或者，让选择更自然</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>명사+이나</span> 책이나 / 커피나</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>동사+-거나</span> 듣거나 / 보거나</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>구분</span> 名词用 이나，动作用 거나</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>语气</span> (이)나 也有"随便/至少"的语气</div>
</div>`,
    linkedGrammarIds: ['g12', 'g40'],
  },
  {
    id: 'card-p4-l09',
    partNumber: 4,
    lessonNumber: 2,
    title: '에게서, 한테서, 씨, 짜리',
    whatItDoes: '说从谁那里得到，礼貌称呼人',
    whatItDoesBody: '에게서/한테서 表示"从谁那里"；\n씨 是人名后的礼貌称呼；\n짜리 表示价格/年龄/面额属性。\n这节课三个知识点各自独立，但都是日常韩语里非常实用的细节。\n中文"从朋友那里"一个结构搞定，韩语要区分语体：\n에게서（书面）和 한테서（口语）。',
    structureNote: '三块内容：①에게서/한테서（从谁那里收到/听说）和 에게/한테 方向相反；\n②씨（称呼用法）接在名字后，不接在姓后；\n③짜리（属性修饰）接在价格/数量后修饰名词。',
    rulesNote: '에게서/한테서 的方向逻辑：\n에게/한테=给出去，에게서/한테서=从那里收进来。\n씨 用法：\n김민준 씨（全名+씨）或 민준 씨（名+씨），不能直接说 김 씨（只用姓）。\n짜리 直接贴数字后。',
    scenarioNote: '"从朋友那里收到礼物""从老师那里学到的""买了一万韩元的票"这三个表达在购物、交流、介绍人物时都很常用。\n씨 则是韩国人日常称呼对方时最礼貌的方式。',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">에게서 · 씨 · 짜리</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">说从谁那里得到，礼貌称呼人，以及说多少钱的东西。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">친구한테서 선물을 받았어요.</span> — 从朋友那里收到了礼物。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">민수 씨, 안녕하세요?</span> — 民秀，你好。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">만원짜리 티켓을 샀어요.</span> — 买了一万韩元的票。</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">三个知识点</div>
  <div style="margin-bottom:6px">① <b>에게서/한테서</b> — 从谁那里（입방향，收进来）<br><span style="color:#89756e;font-size:16px">에게서 偏书面，한테서 更口语</span></div>
  <div style="margin-bottom:6px">② <b>씨</b> — 人名后的礼貌称呼<br><span style="color:#89756e;font-size:16px">민수 씨 / 지민 씨，不接职称</span></div>
  <div>③ <b>짜리</b> — 价格/数量属性修饰<br><span style="color:#89756e;font-size:16px">만원짜리 / 두 시간짜리，前面必须有数量</span></div>
</div>
<div class="reminder-box">方向逻辑：에게/한테 = 给出去（출방향）；에게서/한테서 = 从那里收进来（입방향）。씨 接在人名后，不接职称（선생님 씨 ✗）。</div>`,
    compareHtml: `<div class="card-title">에게（给/对）vs 에게서（从……那里）</div>
<div class="card-body">两者形式相近，但方向相反：에게/한테 是动作指向对方（给出去），에게서/한테서 是动作来自对方（收进来）。搞混方向会意思完全相反。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">에게/한테</div><div style="font-size:16px;color:#89756e;margin-top:2px">给谁 / 对谁（方向：出）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구한테 선물을 줘요.</span><span style="font-size:16px;color:#5a4640">给朋友礼物。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">선생님께 질문해요.</span><span style="font-size:16px;color:#5a4640">向老师提问。（께 是敬语形）</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">에게서/한테서</div><div style="font-size:16px;color:#89756e;margin-top:2px">从谁那里（方向：入）</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">친구한테서 선물을 받아요.</span><span style="font-size:16px;color:#5a4640">从朋友那里收到礼物。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">남자 친구에게서 연락이 왔어요.</span><span style="font-size:16px;color:#5a4640">收到了男友的联系。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">口语 vs 书面用法</div><div style="font-size:16px;color:#5a4640">에게/에게서：书面语，适合正式写作和正式场合。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">한테/한테서：口语，日常对话首选，两者意思完全相同。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">씨：接在名字后表示礼貌称呼：손창 씨（不能只说 씨）。짜리：接金额后表示价值……的：오천 원짜리。</div></div>
<div class="reminder-box">친구에게서 선물을 줘요 ✗ — 给出去要用 에게/한테，不是 에게서。记忆口诀：에게서/한테서 = "서" 是"from"的标记，有 서 就是"从……那里来"。</div>`,
    compareLabel: '에게（给/对）vs 에게서（从……那里）',
    structures: [
      {
        ko: '사람 + 에게서/한테서 + 받다/듣다/배우다',
        zh: '人 + 에게서/한테서 + 收到/听说/学',
        tokens: [
          { text: '사람', role: 'subject' },
          { text: '에게서/한테서', role: 'plain' },
          { text: '받다/듣다/배우다', role: 'verb' },
        ],
      },
      {
        ko: '이름 + 씨',
        zh: '人名 + 씨（礼貌称呼）',
        tokens: [
          { text: '이름', role: 'subject' },
          { text: '씨', role: 'plain' },
        ],
      },
      {
        ko: '가격/수량/나이 + 짜리 + 명사',
        zh: '价格/数量/年龄 + 짜리 + 名词',
        tokens: [
          { text: '가격/수량', role: 'plain' },
          { text: '짜리', role: 'plain' },
          { text: '명사', role: 'object' },
        ],
      },
      {
        ko: '친구한테서 선물을 받았어요.',
        zh: '从朋友那里收到了礼物。',
        tokens: [
          { text: '친구한테서', role: 'plain' },
          { text: '선물을', role: 'object' },
          { text: '받았어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'compare', text: '에게서 偏书面，한테서 更口语', examples: '선생님에게서 배워요 / 친구한테서 들었어요' },
      { type: 'note', text: '注意：名词+에게/한테 表示动作涉及的对象（给……）；名词+에게서/한테서 表示动作出发点（从……那里）' },
      { type: 'example', text: '教材例句：남자 친구에게서 선물을 받았어요 / 장 선생님에게서 배웠어요 / 남자 친구한테서 전화가 왔어요' },
      { type: 'usage', text: '씨：接在名字后', examples: '선우 씨 / 진주 씨。不用于职称（선생님 씨 ✗）' },
      { type: 'usage', text: '짜리：接在价格、时间、年龄等数量后表示面值/价值，在与同类商品比较时使用', examples: '만원짜리 / 800원짜리 배 / 5,000원짜리' },
      { type: 'vocab', text: '에게서/한테서 常与接收动词搭配', examples: '받다（收到）/ 듣다（听说）/ 배우다（学）/ 오다（来电话）' },
      { type: 'note', text: '짜리 前必须有数量信息，不能单独使用' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '친구한테서', role: 'plain' },
          { text: '선물을', role: 'object' },
          { text: '받았어요', role: 'verb' },
        ],
        zh: '从朋友那里收到了礼物。',
        swapWords: ['친구한테서', '선생님에게서', '부모님에게서'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '선생님에게서', role: 'plain' },
          { text: '한국어를', role: 'object' },
          { text: '배워요', role: 'verb' },
        ],
        zh: '向老师学习韩语。',
        swapWords: ['선생님에게서', '토리한테서', '유튜브에서'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '만원짜리', role: 'plain' },
          { text: '티켓을', role: 'object' },
          { text: '샀어요', role: 'verb' },
        ],
        zh: '买了一万韩元的票。',
        swapWords: ['만원짜리', '십만 원짜리', '이만 원짜리'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '민수 씨,', role: 'subject' },
          { text: '안녕하세요?', role: 'verb' },
        ],
        zh: '民秀，你好。',
        swapRole: 'subject',
          swapWords: ['민수 씨', '지민 씨', '토리 씨'],
      },
    ],
    scenarios: [
      { icon: '🎁', context: '收礼物', ko: '친구한테서 선물을 받았어요.', zh: '从朋友那里收到了礼物。' },
      { icon: '📚', context: '学习来源', ko: '선생님에게서 한국어를 배워요.', zh: '向老师学习韩语。' },
      { icon: '👋', context: '礼貌打招呼', ko: '민수 씨, 안녕하세요?', zh: '民秀，你好。' },
      { icon: '🎵', context: 'KPOP 票价', ko: '십만 원짜리 티켓을 샀어요.', zh: '买了十万韩元的票。' },
      { icon: '💬', context: '听说消息', ko: '친구한테서 들었어요.', zh: '从朋友那里听说了。' },
      { icon: '⏱️', context: '时长说明', ko: '두 시간짜리 영상이에요.', zh: '这是两个小时的视频。' },
    ],
    mistakes: [
      { wrong: '친구에게서 선물을 줘요. (想说给朋友)', correct: '친구한테 선물을 줘요.', note: '给出用 에게/한테；从那里收到用 에게서/한테서，方向相反' },
      { wrong: '선생님 씨, 안녕하세요?', correct: '선생님, 안녕하세요?', note: '씨 接人名，不接职称。선생님 本身就是称呼' },
      { wrong: '짜리 티켓을 샀어요. (没有数量)', correct: '만원짜리 티켓을 샀어요.', note: '짜리 前必须有价格/数量/年龄等信息' },
      { wrong: '친구에게서 선물을 받아요. (口语场合)', correct: '친구한테서 선물을 받아요.', note: '口语里更常用 한테서；에게서 偏书面/正式' },
    ],
    quickTable: {
      title: '방향 정리표',
      headers: ['助词', '方向', '例子'],
      rows: [
        ['에게/한테 给/对', '→ 给/对（出）', '친구한테 줘요 给朋友'],
        ['에게서/한테서 从……那里', '← 从……那里（入）', '친구한테서 받아요 从朋友那里收到'],
        ['씨 人名礼貌称呼', '人名称呼', '민수 씨'],
        ['짜리 属性限定', '属性限定', '만원짜리 티켓 一万元的票'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>에게서 · 씨 · 짜리 완성！</div>
  <div class='ov-sub'>来源、称呼、属性都会说了</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>한테서</span> 从朋友那里：친구한테서 받아요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>씨</span> 礼貌称呼：민수 씨</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>짜리</span> 属性：만원짜리 티켓</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>주의</span> 에게（给）↔ 에게서（从……那里）方向相反</div>
</div>`,
    linkedGrammarIds: ['g8'],
  },
  {
    id: 'card-p4-l10',
    partNumber: 4,
    lessonNumber: 10,
    title: '敬语',
    whatItDoes: '学会基本敬语，说话更有礼貌',
    whatItDoesBody: '-(으)세요 是最基础敬语请求形式；\n部分特殊敬语词（드세요/계세요/말씀하세요/주무세요）需要整词记忆。\n韩语敬语是文化必需见长辈、服务员、陌生人都需要用，不用会显得失礼。\n和中文不同：\n中文靠"请"字表达礼貌，韩语直接改变动词词尾形式，敬语是语法层面的要求，不是可选的礼貌词。',
    structureNote: '两块内容：①-(으)세요（敬语请求）已在P2学过，这节课补充更多用法和场景；\n②特殊敬语词먹다→드세요，있다→계세요，자다→주무세요，这几个需要整词背，不能从普通词变形。',
    rulesNote: '-(으)세요 变形和P2完全一样（有받침→으세요，无받침→세요）。\n特殊敬语词只有几个，全部记住：\n먹다/마시다→드세요，있다→계세요，자다→주무세요，말하다→말씀하세요。\n这类词无规律可循，只能背。',
    scenarioNote: '在韩国咖啡店、地铁、见朋友父母随处都需要用到敬语。\n드세요（请吃/请喝）和 계세요（在）是最高频的特殊敬语词。\n学会这节课，你能在礼貌场合自然说话，不会显得突兀。',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">敬语基础</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">学会 -(으)세요 和几个必须整词记忆的特殊敬语词。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">여기에 앉으세요.</span> — 请坐这里。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">많이 드세요.</span> — 请多吃。</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">선생님이 계세요?</span> — 老师在吗？</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">两块内容</div>
  <div style="margin-bottom:6px">① <b>-(으)세요</b>：有收音→으세요，无收音→세요，ㄹ 收音脱落→세요<br><span style="color:#89756e;font-size:16px">앉으세요 / 보세요 / 아세요（알다）</span></div>
  <div>② <b>特殊敬语词</b>（整词记忆）：<br><span style="color:#89756e;font-size:16px">먹다→드세요 / 있다→계세요 / 자다→주무세요 / 말하다→말씀하세요</span></div>
</div>
<div class="reminder-box">많이 먹으세요 ✗（对长辈）→ 많이 드세요 ✓ — 特殊敬语词不能用普通变形替代。선생님이 있으세요 ✗ → 선생님이 계세요 ✓。</div>`,
    compareHtml: `<div class="card-title">普通表达 vs 敬语表达</div>
<div class="card-body">韩语敬语不只是语气词，有几个动词必须换成完全不同的词才算正确敬语。这几个词需要整词记忆，不能靠规则推导。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">普通表达</div><div style="font-size:16px;color:#89756e;margin-top:2px">日常/非敬语</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹어요 / 있어요 / 자요</span><span style="font-size:16px;color:#5a4640">吃 / 在 / 睡</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">말해요 / 죽어요</span><span style="font-size:16px;color:#5a4640">说 / 死</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">敬语表达</div><div style="font-size:16px;color:#89756e;margin-top:2px">对长辈/陌生人</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">드세요 / 계세요 / 주무세요</span><span style="font-size:16px;color:#5a4640">请吃 / 在 / 请睡</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">말씀하세요 / 돌아가세요</span><span style="font-size:16px;color:#5a4640">请说 / 去世（委婉）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">特殊敬语词对照</div><div style="font-size:16px;color:#5a4640">먹다/마시다 → 드시다（드세요）：请吃/请喝</div><div style="margin-top:4px;font-size:16px;color:#5a4640">있다 → 계시다（계세요）：在/有（人）</div><div style="margin-top:4px;font-size:16px;color:#5a4640">자다 → 주무시다（주무세요）：请睡</div><div style="margin-top:4px;font-size:16px;color:#5a4640">말하다 → 말씀하시다（말씀하세요）：请说</div><div style="margin-top:4px;font-size:16px;color:#5a4640">일반 동사 → -(으)세요：가다→가세요 / 읽다→읽으세요</div></div>
<div class="reminder-box">알으세요 ✗ → 아세요 ✓ — ㄹ 收音脱落：알다→아세요。먹으세요 ✗ → 드세요 ✓ — 먹다 有专属敬语词 드시다，必须换词，不能只加 -(으)세요。</div>`,
    compareLabel: '普通表达 vs 敬语表达',
    structures: [
      {
        ko: '동사 어간 (받침 X) + -세요',
        zh: '无收音词干 + 세요',
        tokens: [
          { text: '동사 어간', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-세요', role: 'plain' },
        ],
      },
      {
        ko: '동사 어간 (받침 O) + -으세요',
        zh: '有收音词干 + 으세요',
        tokens: [
          { text: '동사 어간(받침O)', role: 'verb' },
          { text: '+', role: 'plain' },
          { text: '-으세요', role: 'plain' },
        ],
      },
      {
        ko: '여기에 앉으세요.',
        zh: '请坐这里。',
        tokens: [
          { text: '여기에', role: 'place' },
          { text: '앉으세요', role: 'verb' },
        ],
      },
      {
        ko: '선생님이 계세요.',
        zh: '老师在。（尊敬）',
        tokens: [
          { text: '선생님이', role: 'subject' },
          { text: '계세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音 → 세요', examples: '가다→가세요 / 보다→보세요 / 하다→하세요' },
      { type: 'rule', text: '有收音 → 으세요', examples: '앉다→앉으세요 / 읽다→읽으세요 / 받다→받으세요' },
      { type: 'rule', text: 'ㄹ 收音脱落', examples: '알다→아세요 / 살다→사세요 / 만들다→만드세요' },
      { type: 'vocab', text: '特殊敬语词 整词记忆', examples: '먹다→드시다/드세요 / 있다→계시다/계세요 / 말하다→말씀하시다/말씀하세요 / 자다→주무시다/주무세요 / 죽다→돌아가시다 / 아프다→편찮으시다 / 주다→드리다' },
      { type: 'vocab', text: '敬语名词', examples: '집→댁 / 이름→성함 / 생일→생신 / 말→말씀 / 나이→연세 / 아내→부인' },
      { type: 'note', text: '谦让语：当听话人是说话人的长辈或上级时使用', examples: '나→저 / 우리→저희 / 내가→제가 / 내→제' },
      { type: 'note', text: '助词变化：主语助词 은/는→께서는 / 이/가→께서；动作对象 에게/한테→께', examples: '선생님께 드려요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '여기에', role: 'place' },
          { text: '앉으세요', role: 'verb' },
        ],
        zh: '请坐这里。',
        swapWords: ['앉으세요', '기다리세요', '들어오세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '많이', role: 'plain' },
          { text: '드세요', role: 'verb' },
        ],
        zh: '请多吃。',
        swapWords: ['드세요', '마시세요', '드시고 가세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '선생님,', role: 'subject' },
          { text: '다시', role: 'plain' },
          { text: '말씀해 주세요', role: 'verb' },
        ],
        zh: '老师，请再说一遍。',
        swapWords: ['말씀해 주세요', '설명해 주세요', '천천히 말씀해 주세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '천천히', role: 'plain' },
          { text: '따라 하세요', role: 'verb' },
        ],
        zh: '请慢慢跟读。',
        swapWords: ['따라 하세요', '읽으세요', '말하세요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🏫', context: '课堂请求', ko: '선생님, 다시 말씀해 주세요.', zh: '老师，请再说一遍。' },
      { icon: '🪑', context: '接待服务', ko: '여기에 앉으세요.', zh: '请坐这里。' },
      { icon: '🍽️', context: '用餐招待', ko: '많이 드세요.', zh: '请多吃。' },
      { icon: '🌙', context: '晚安问候', ko: '안녕히 주무세요.', zh: '晚安。请好好休息。' },
      { icon: '📱', context: 'Tori 跟读提示', ko: '천천히 따라 하세요.', zh: '请慢慢跟读。' },
      { icon: '📞', context: '确认老师在', ko: '선생님이 계세요?', zh: '老师在吗？' },
    ],
    mistakes: [
      { wrong: '많이 먹으세요. (对长辈)', correct: '많이 드세요.', note: '对长辈/客人 먹다 更自然用特殊敬语词 드세요' },
      { wrong: '선생님이 있으세요. (老师在)', correct: '선생님이 계세요.', note: '尊敬对象"在"用 계세요，不是 있으세요' },
      { wrong: '알으세요? (알다+으세요)', correct: '아세요?', note: 'ㄹ 收音脱落：알다→아세요' },
      { wrong: '初级阶段就想学完整套敬语', correct: '初级先掌握高频固定表达', note: '敬语系统复杂，初级先掌握高频固定表达（앉으세요/드세요/계세요）' },
    ],
    quickTable: {
      title: '일반 → 경어 대조표',
      headers: ['普通表达', '敬语表达', '中文'],
      rows: [
        ['먹어요/마셔요 吃/喝', '드세요 请吃/请喝', '请吃/请喝'],
        ['있어요（人在）', '계세요 在（敬语）', '在（尊敬）'],
        ['말해요 说', '말씀하세요 请说', '请说'],
        ['자요 睡觉', '주무세요 请睡/晚安', '请睡/晚安'],
        ['가세요/오세요 请去/来', '가세요/오세요（同形）', '请去/请来（同形）'],
      ],
    },
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>경어 완성！</div>
  <div class='ov-sub'>礼貌表达让韩语更有温度</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>-(으)세요</span> 앉으세요 / 읽으세요</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>드세요</span> 먹다/마시다 的敬语</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>계세요</span> 있다（人在）的敬语</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>말씀/주무세요</span> 말하다/자다 的敬语</div>
</div>`,
    linkedGrammarIds: ['g56', 'g53', 'g61'],
  },

  {
    id: 'card-p4-l11',
    partNumber: 4,
    lessonNumber: 11,
    title: '综合练习④',
    whatItDoes: '第四章综合练习',
    whatItDoesBody: '综合运用第四章 L01-L10 所学语法：\n动作连接与原因（-고/-아서）、必须与禁止（-아야 해요/-지 마세요）、花时间/花钱（걸리다/들다）、铺垫语气（-는데요）、名词化与副词化（-는 것/-게）、比较（보다/에 비해서）、工具/方向/身份（(으)로）、选择（(이)나/-거나）、来源与称呼（에게서/씨）、敬语基础（-(으)세요）。',
    isPractice: true,
    structureNote: '这是第四章的总复习。\n第四章的主线是"表达更精细"怎么连句、怎么说义务、怎么比较、怎么礼貌说话。\n做题时想想每个语法点背后的"表达功能"，而不只是记形式。',
    step0Html: `<h1 style="font-size:25px;font-weight:800;margin:0 0 4px 0;color:#241917">第四章综合练习</h1>
<p style="font-size:16px;color:#89756e;margin:0 0 16px 0">连接句子、表达义务、比较、礼貌说话——全部整合在一起。</p>
<div class="block">
  <div style="font-size:16px;font-weight:700;color:#ff7fa8;margin-bottom:8px">这章学了什么：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">L01-L03</span> — 动作连接（-고/-아서）、必须与禁止（-아야 해요/-지 마세요）、花时间/花钱（걸리다/들다）</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:6px"><span style="font-weight:700">L04-L07</span> — 铺垫语气（-는데요）、名词化/副词化（-는 것/-게）、比较（보다/에 비해서）、工具方向身份（(으)로）</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px"><span style="font-weight:700">L08-L10</span> — 或者选择（(이)나/-거나）、来源称呼（에게서/씨/짜리）、敬语基础（-(으)세요/드세요/계세요）</div>
</div>
<div class="block">
  <div style="font-weight:700;margin-bottom:8px">综合例句</div>
  <div style="margin-bottom:6px">한국어를 배우는 데 시간이 걸리는데요, 재미있어요.</div>
  <div style="color:#89756e;font-size:16px">学韩语虽然花时间，不过很有意思。（L03+L04综合）</div>
</div>
<div class="reminder-box">综合练习会混合本章所有语法点出题。不确定时回到对应课次复习。</div>`,
    compareHtml: `<div class="card-title">第四章要点速览</div>
<div class="card-body">本章十节课的核心是"把句子说得更精细"——连接前后动作、表达义务、做比较、礼貌说话。每个语法点都有易混点，把对比记清楚就掌握了本章精髓。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-고 vs -아/어서</div><div style="font-size:16px;color:#89756e;margin-top:2px">顺序并列 vs 原因结果</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹고 공부해요 / 아파서 쉬어요</span><span style="font-size:16px;color:#5a4640">吃完再学 / 因为疼所以休息</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">걸려요 vs 들어요</div><div style="font-size:16px;color:#89756e;margin-top:2px">花时间 vs 花钱</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한 시간 걸려요 / 돈이 들어요</span><span style="font-size:16px;color:#5a4640">花一小时 / 花钱</span></div></div>
  <div class="tok-row"><div class="tok t-v">보다 vs 에 비해서</div><div style="font-size:16px;color:#89756e;margin-top:2px">口语比较 vs 书面比较</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">영어보다 어려워요 / 작년에 비해서</span><span style="font-size:16px;color:#5a4640">比英语难 / 和去年相比</span></div></div>
  <div class="tok-row"><div class="tok t-v">(이)나 vs -거나</div><div style="font-size:16px;color:#89756e;margin-top:2px">名词"或者" vs 动词"或者"</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">커피나 차 / 듣거나 봐요</span><span style="font-size:16px;color:#5a4640">咖啡或茶 / 听或者看</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">两个"必须"和"禁止"</div><div style="font-size:16px;color:#5a4640">-아/어야 해요（必须做）vs -지 마세요（请勿做）：방에 들어가야 해요（必须进去）/ 떠들지 마세요（请勿喧哗）。中文"必须"和"不要"是独立词，韩语嵌入词尾——一旦记住形式，任何动词都能套用。</div></div>
<div class="reminder-box">에게/한테（给出）vs 에게서/한테서（收入）方向相反；드세요/계세요/주무세요 是敬语特殊词，整词记忆。</div>`,
    compareLabel: '第四章要点速览',
    structures: [
      {
        ko: '복습 범위：L01-L10 핵심 문법',
        zh: '复习范围：L01-L10 核心语法',
        tokens: [
          { text: '복습', role: 'verb' },
          { text: 'L01–L10', role: 'plain' },
        ],
      },
      {
        ko: '한국어로 말하는 것은 어렵지만 재미있어요.',
        zh: '用韩语说话这件事虽然难，但很有意思。',
        tokens: [
          { text: '한국어로', role: 'plain' },
          { text: '말하는 것은', role: 'verb' },
          { text: '어렵지만', role: 'verb' },
          { text: '재미있어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'L01 -고：顺序连接"做A再做B"；-아/어/여서：原因连接"因为A所以B"', examples: '먹고 공부해요 / 피곤해서 쉬어요' },
      { type: 'rule', text: 'L02 -아/어/여야 해요：必须做；-지 마세요：请不要做', examples: '매일 복습해야 해요 / 늦지 마세요' },
      { type: 'rule', text: 'L03 걸리다：花时间；들다：花钱/花费', examples: '한 시간 걸려요 / 오만 원 들어요' },
      { type: 'rule', text: 'L04 -은/ㄴ/는데요：铺垫语气，引出话题或转折', examples: '날씨가 좋은데요 / 한국어를 배우는데요' },
      { type: 'rule', text: 'L05 -는 것：名词化（把动作变成"这件事"）；-게：副词化（把形容词变成"……地"）', examples: '공부하는 것이 어려워요 / 크게 말해요' },
      { type: 'rule', text: 'L06 보다：比……更……；에 비해서：和……相比', examples: '한국어는 영어보다 어려워요 / 작년에 비해서 실력이 늘었어요' },
      { type: 'rule', text: 'L07 (으)로：用……（工具）/ 往……（方向）/ 作为……（身份）', examples: '버스로 가요 / 왼쪽으로 가요 / 선생님으로 일해요' },
      { type: 'rule', text: 'L08 (이)나：或者（名词选一）；-거나：或者（动词选一）', examples: '커피나 차 주세요 / 노래하거나 춤춰요' },
      { type: 'rule', text: 'L09 에게서/한테서：从谁那里得到；씨：对人的礼貌称呼；짜리：……价值的东西', examples: '친구에게서 받았어요 / 김민준 씨 / 오천 원짜리' },
      { type: 'rule', text: 'L10 -(으)세요：尊敬请求；드세요：먹다/마시다 的敬语（请吃/请喝）；계세요：있다 尊敬体（在）', examples: '앉으세요 / 드세요 / 선생님이 계세요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '단어를', role: 'object' },
          { text: '외우고', role: 'verb' },
          { text: '문장을', role: 'object' },
          { text: '읽어야 해요', role: 'verb' },
        ],
        zh: '必须背单词，然后读句子。',
        swapWords: ['외우고', '듣고', '보고'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '영어보다', role: 'plain' },
          { text: '어려운데요', role: 'verb' },
        ],
        zh: '韩语比英语难呢……',
        swapWords: ['어려운데요', '재미있는데요', '발음이 빠른데요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어로', role: 'plain' },
          { text: '말하는 것이', role: 'verb' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '用韩语说话这件事很难。',
        swapWords: ['어려워요', '재미있어요', '쉽지 않아요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '선생님에게서', role: 'plain' },
          { text: '한국어를', role: 'object' },
          { text: '배우는 데', role: 'verb' },
          { text: '시간이 걸려요', role: 'verb' },
        ],
        zh: '向老师学韩语需要花时间。',
        swapWords: ['시간이 걸려요', '돈이 들어요', '노력이 필요해요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习计划', ko: '단어를 외우고 문장을 읽어야 해요.', zh: '必须背单词，然后读句子。' },
      { icon: '🎵', context: 'KPOP 跟唱', ko: '노래를 듣거나 가사를 봐요.', zh: '听歌或者看歌词。' },
      { icon: '⏰', context: '时间成本', ko: '한국어를 배우는 데 시간이 많이 걸려요.', zh: '学韩语很花时间。' },
      { icon: '🏫', context: '礼貌表达', ko: '선생님, 천천히 말씀해 주세요.', zh: '老师，请慢慢说。' },
      { icon: '💬', context: '铺垫说明', ko: '한국어가 어려운데요, 재미있어요.', zh: '韩语是有点难，不过很有意思。' },
      { icon: '🚇', context: '交通工具', ko: '지하철로 가는 데 삼십 분 걸려요.', zh: '坐地铁去要花三十分钟。' },
    ],
    mistakes: [
      { wrong: '공부하서 피곤해요.', correct: '공부해서 피곤해요.', note: 'L01：하다→해서' },
      { wrong: '공부하야 해요.', correct: '공부해야 해요.', note: 'L02：하다→해야' },
      { wrong: '이 책을 읽는다 데 시간이 걸려요.', correct: '이 책을 읽는 데 시간이 걸려요.', note: 'L03：动词+-는 데，不加 다' },
      { wrong: '학생는데요.', correct: '학생인데요.', note: 'L04：名词用 인데요' },
      { wrong: '빠르게 읽어요. (빠르다 有专属副词)', correct: '빨리 읽어요.', note: 'L05：빠르다 有专属副词 빨리，优先用 빨리' },
      { wrong: '영어는 한국어보다 어려워요. (想说韩语比英语难)', correct: '한국어는 영어보다 어려워요.', note: 'L06：보다 接在比较基准后' },
      { wrong: '지하철으로 가요.', correct: '지하철로 가요.', note: 'L07：ㄹ 받침 뒤에 로' },
      { wrong: '책거나 노트를 사요. (想说书或笔记本)', correct: '책이나 노트를 사요.', note: 'L08：名词之间用 이나，不用 거나' },
      { wrong: '친구에게서 선물을 줘요. (想说给朋友)', correct: '친구한테 선물을 줘요.', note: 'L09：에게서 是从那里收到，不是给出' },
      { wrong: '많이 먹으세요. (对长辈)', correct: '많이 드세요.', note: 'L10：对长辈用特殊敬语词 드세요' },
    ],
    overviewHtml: `<div class='overview'>
  <div class='ov-title'>제4장 종합 연습 완성！</div>
  <div class='ov-sub'>第四章 10 课全部完成</div>
  <div class='ov-sec'><span class='badge' style='background:#ff7fa8;color:white'>연결</span> -고 / -아/어서</div>
  <div class='ov-sec'><span class='badge' style='background:#6b7ff0;color:white'>의무</span> -야 해요 / -지 마세요</div>
  <div class='ov-sec'><span class='badge' style='background:#2db89b;color:white'>시간/돈</span> 걸려요 / 들어요</div>
  <div class='ov-sec'><span class='badge' style='background:#e8a87c;color:white'>비교</span> 보다 / 에 비해서</div>
  <div class='ov-sec'><span class='badge' style='background:#c89020;color:white'>(으)로</span> 工具/方向/身份</div>
  <div class='ov-sec'><span class='badge' style='background:#e05555;color:white'>경어</span> 드세요 / 계세요 / 말씀하세요</div>
</div>`,
    linkedGrammarIds: [],
  },
];
