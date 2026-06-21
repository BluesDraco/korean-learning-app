import type { GrammarCard } from '@/types';

export const grammarCardsP3: GrammarCard[] = [
  {
    id: 'card-p3-l01',
    partNumber: 3,
    lessonNumber: 1,
    title: '-고 있다, -고 있었다',
    whatItDoes: '说正在做、之前一直在做',
    whatItDoesBody: '-고 있어요 把动作拉成正在进行的状态；\n-고 있었어요 表达过去某个时候正在做。\n和中文"正在……"类似，但韩语还能用于"穿着/戴着/拿着"这类持续状态。',
    structureNote: '这节课只有一个核心结构：\n动词词干 + -고 있어요。\n现在进行用 있어요，过去进行用 있었어요。\n注意这个结构只接动词，不接形容词。',
    rulesNote: '-고 接续时不触发不规则变化（듣다→듣고 있어요，不变形）。\n特殊用法：\n입다/쓰다/들다 等穿戴动词 + -고 있어요 表示"穿着/戴着/拿着"的持续状态，不是进行中的动作。',
    scenarioNote: '-고 있어요 是 SNS 和聊天里最自然的表达"在听歌""在看剧""在等人"。\n穿戴用法（입고 있어요/쓰고 있어요）在描述人物外貌时也非常常用。',
    structures: [
      {
        ko: '지금 한국어를 공부하고 있어요',
        zh: '现在正在学习韩语。',
        tokens: [
          { text: '지금', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부하고 있어요', role: 'verb' },
        ],
      },
      {
        ko: '어제 드라마를 보고 있었어요',
        zh: '昨天正在看电视剧。',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '드라마를', role: 'object' },
          { text: '보고 있었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -고 있어요 — 正在做', examples: '공부하다→공부하고 있어요, 먹다→먹고 있어요, 보다→보고 있어요' },
      { type: 'rule', text: '动词词干 + -고 있었어요 — 过去某时正在做', examples: '어제 드라마를 보고 있었어요, 친구를 기다리고 있었어요' },
      { type: 'note', text: '接 -고 时 ㄷ 不规则不发生', examples: '듣다→듣고 있어요（✓）/ 들고 있어요（✗）' },
      { type: 'note', text: '-고 있다 只接动作动词，不接形容词', examples: '예쁘다→예뻐요（✓）/ 예쁘고 있어요（✗）' },
      { type: 'usage', text: '穿戴动词 + -고 있어요 — 穿戴持续状态', examples: '입다→입고 있어요（穿着）, 쓰다→쓰고 있어요（戴着）, 들다→들고 있어요（拿着）, 신다→신고 있어요（穿着鞋）' },
      { type: 'compare', text: '-아요/어요 vs -고 있어요', examples: '먹어요（平时吃/习惯）/ 먹고 있어요（现在正在吃，动作未结束）' },
      { type: 'example', text: '지금 한국어를 공부하고 있어요 / 친구를 기다리고 있었어요 / 모자를 쓰고 있어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '지금', role: 'time' },
          { text: '노래를', role: 'object' },
          { text: '듣고 있어요', role: 'verb' },
        ],
        zh: '现在正在听歌。',
        swapWords: ['공부하고 있어요', '먹고 있어요', '보고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어제 밤에', role: 'time' },
          { text: '드라마를', role: 'object' },
          { text: '보고 있었어요', role: 'verb' },
        ],
        zh: '昨晚正在看电视剧。',
        swapWords: ['공부하고 있었어요', '기다리고 있었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '안경을', role: 'object' },
          { text: '쓰고 있어요', role: 'verb' },
        ],
        zh: '戴着眼镜。',
        swapWords: ['입고 있어요', '들고 있어요', '신고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지금', role: 'time' },
          { text: '모자를', role: 'object' },
          { text: '쓰고 있어요', role: 'verb' },
        ],
        zh: '现在戴着帽子。',
        swapWords: ['입고 있어요', '들고 있어요', '신고 있어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习打卡', ko: '지금 한국어를 공부하고 있어요.', zh: '现在正在学习韩语。' },
      { icon: '🎵', context: 'KPOP 跟唱', ko: '이 노래를 듣고 있어요.', zh: '正在听这首歌。' },
      { icon: '📺', context: '影音跟读', ko: '드라마를 보고 있었어요.', zh: '刚才正在看电视剧。' },
      { icon: '👓', context: '穿戴持续', ko: '그는 안경을 쓰고 있어요. 어머니는 가방을 들고 있어요.', zh: '他戴着眼镜。妈妈拎着包。' },
      { icon: '🏥', context: '医院等待', ko: '지금 병원에서 기다리고 있어요. 의사 선생님이 곧 오실 거예요.', zh: '现在正在医院等待，医生马上会来。' },
      { icon: '🛒', context: '便利店', ko: '편의점에서 계산하고 있어요. 잠깐만 기다려 주세요.', zh: '正在便利店结账，请稍等一下。' },
    ],
    mistakes: [
      { wrong: '노래를 들고 있어요（想说正在听歌）', correct: '노래를 듣고 있어요', note: '听歌用 듣다，接 -고 时 ㄷ 不规则不发生 → 듣고 있어요。注意：들다（拿/举）接 -고 있어요 是正确的，如 가방을 들고 있어요（拎着包）。' },
      { wrong: '예쁘고 있어요（想说正在漂亮）', correct: '예뻐요', note: '-고 있다 只接动作动词，形容词直接用原形。' },
      { wrong: '먹고 있었어요 和 먹었어요 混用', correct: '먹고 있었어요（当时正在吃）/ 먹었어요（吃了）', note: '-고 있었어요 强调过去某个时间点正在进行，-었어요 只是过去完成。' },
      { wrong: '입고 있어요를 "正在穿"로만 이해', correct: '입고 있어요（穿着/正在穿）', note: '穿戴类动词（입다、쓰다、들다、신다）+ -고 있어요 既可表示动作进行，也可表示持续状态（穿着/戴着）。具体看语境。' },
    ],
        compareHtml: `<div class="card-title">"正在做"vs"之前一直在做"</div>
<div class="card-body">-고 있다 把动作拉成正在进行的状态；-고 있었다 表达过去某个时候正在做。和中文"正在……"类似，但韩语还能用于"穿着/戴着/拿着"这类持续状态。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">现在进行（-고 있다）</div><div style="font-size:16px;color:#89756e;margin-top:2px">动作正在进行</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">지금 공부하고 있어요.</span><span style="font-size:16px;color:#5a4640">正在学习。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">노래를 듣고 있어요.</span><span style="font-size:16px;color:#5a4640">正在听歌。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">过去进行（-고 있었다）</div><div style="font-size:16px;color:#89756e;margin-top:2px">过去某时正在做</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아까 공부하고 있었어요.</span><span style="font-size:16px;color:#5a4640">刚才正在学习。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">전화하고 있었어요.</span><span style="font-size:16px;color:#5a4640">刚才正在打电话。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">持续状态用法</div><div style="font-size:16px;color:#5a4640">韩语的 -고 있다 不仅表示"正在做动作"，还表示"穿着/戴着/拿着"等持续状态。中文里"穿着衣服"和"正在穿衣服"是两回事，韩语共用同一结构。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">例如：입고 있어요 = 正在穿 / 穿着。需要根据上下文判断是"进行中"还是"状态持续"。</div></div>
<div class="reminder-box">"穿着衣服"是 입고 있어요，"正在穿衣服"也是 입고 있어요！中文用不同词表达，韩语靠上下文区分。说清楚时间就能避免误会。</div>`,
    linkedGrammarIds: ['g49'],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-고 있어요 / -고 있었어요</h1>
<p style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">把动作变成"正在……"的持续状态，现在进行或过去进行。</p>
<div class="block">
  <div style="font-size:16px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">지금 한국어를 공부하고 있어요.</div>
    <div class="zh">现在正在学习韩语。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">어제 밤에 드라마를 보고 있었어요.</div>
    <div class="zh">昨晚正在看电视剧。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:16px">그는 안경을 쓰고 있어요.</div>
    <div class="zh">他戴着眼镜。（穿戴持续状态）</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心结构</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">动词词干</span>
      <span style="font-weight:800;color:#ff7fa8;font-size:16px">+ -고 있어요</span>
      <span style="font-size:16px;color:#89756e">现在正在做</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">动词词干</span>
      <span style="font-weight:800;color:#2db89b;font-size:16px">+ -고 있었어요</span>
      <span style="font-size:16px;color:#89756e">过去某时正在做</span>
    </div>
  </div>
</div>
<div class="reminder-box">-고 接续时不触发不规则变化：듣다 → 듣고 있어요（✓），不变形。-고 있다 只接动作动词，形容词不能用。</div>`,
    
    compareLabel: '먹어요 vs 먹고 있어요',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第1课</span>
  <div class="ov-title">-고 있어요 / -고 있었어요</div>
  <div class="ov-sub">把动作拉成进行状态，现在进行或过去进行</div>
  <div class="ov-sec">
    <h3>现在进行：-고 있어요</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      공부하<b style="color:#ff7fa8">고 있어요</b>（正在学习）&nbsp; 노래를 듣<b style="color:#ff7fa8">고 있어요</b>（正在听歌）<br>
      드라마를 보<b style="color:#ff7fa8">고 있어요</b>（正在看电视剧）
    </div>
  </div>
  <div class="ov-sec">
    <h3>过去进行：-고 있었어요</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      드라마를 보<b style="color:#2db89b">고 있었어요</b>（当时正在看）<br>
      친구를 기다리<b style="color:#2db89b">고 있었어요</b>（当时正在等朋友）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">들고 있어요</span> → <span style="color:#ff7fa8">듣고 있어요</span>（ㄷ 不规则接-고 不变）<br>
      <span style="color:#e05555;text-decoration:line-through">예쁘고 있어요</span> → <span style="color:#ff7fa8">예뻐요</span>（形容词不用-고 있다）
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l02',
    partNumber: 3,
    lessonNumber: 5,
    title: '-았었/었었/였었-',
    whatItDoes: '说以前曾经……现在不一样了',
    whatItDoesBody: '-았었/었었/였었어요 表达过去曾经有过的经历或状态，常带有"现在可能已经不同了"的感觉，比普通过去时多一层回忆感。\n中文里没有完全对应的形式，可以理解为"曾经……（但现在未必如此）"。',
    structureNote: '这节课在P1过去时基础上加一层：\n-았어요 是普通过去，-았었어요 是"回忆性过去"强调现在和过去已经不同了。\n结构是在过去时词尾上再加一个 -었어요。',
    rulesNote: '变形逻辑和普通过去时完全一样（看词干末尾元音选 았/었/였），只是再叠一层 었어요。\n注意：\n昨天发生的普通事件用 -았어요，不要用 -았었어요（어제 밥을 먹었어요 ✓，먹었었어요 ✗）。',
    scenarioNote: '"以前喜欢过这个歌手""小时候住过首尔""以前经常听这首歌"这类带着回忆和变化感的表达，正是 -았었어요 的主战场。\n追星、聊经历、回忆往事全都用得到。',
    structures: [
      {
        ko: '예전에 서울에 살았었어요',
        zh: '以前在首尔住过。',
        tokens: [
          { text: '예전에', role: 'time' },
          { text: '서울에', role: 'place' },
          { text: '살았었어요', role: 'verb' },
        ],
      },
      {
        ko: '예전에 이 가수를 좋아했었어요',
        zh: '以前喜欢过这位歌手。',
        tokens: [
          { text: '예전에', role: 'time' },
          { text: '이 가수를', role: 'object' },
          { text: '좋아했었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '词干末元音为 ㅏ/ㅗ → -았었어요', examples: '살다→살았었어요, 좋다→좋았었어요, 오다→왔었어요' },
      { type: 'rule', text: '词干末元音非 ㅏ/ㅗ → -었었어요', examples: '먹다→먹었었어요, 있다→있었었어요, 배우다→배웠었어요' },
      { type: 'rule', text: '하다 动词 → 했었어요', examples: '공부하다→공부했었어요, 좋아하다→좋아했었어요, 일하다→일했었어요' },
      { type: 'rule', text: '名词 + 이었었어요/였었어요', examples: '학생이었었어요（以前是学生）, 친구였었어요（以前是朋友）' },
      { type: 'compare', text: '-았어요 vs -았었어요', examples: '어제 먹었어요（昨天吃了，普通过去）/ 예전에 자주 먹었었어요（以前经常吃，现在未必）' },
      { type: 'note', text: '昨天发生的普通事件用 -았/었어요', examples: '어제 밥을 먹었어요 ✓ / 어제 밥을 먹었었어요 ✗' },
      { type: 'usage', text: '常与时间表达搭配使用', examples: '예전에 / 어렸을 때 / 몇 년 전에 → 살았었어요, 공부했었어요, 다녔었어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '예전에', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부했었어요', role: 'verb' },
        ],
        zh: '以前学过韩语。',
        swapWords: ['배웠었어요', '좋아했었어요', '들었었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '예전에', role: 'time' },
          { text: '서울에', role: 'place' },
          { text: '살았었어요', role: 'verb' },
        ],
        zh: '以前在首尔住过。',
        swapWords: ['있었었어요', '다녔었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '예전에', role: 'time' },
          { text: '이 노래를', role: 'object' },
          { text: '자주 들었었어요', role: 'verb' },
        ],
        zh: '以前经常听这首歌。',
        swapWords: ['봤었어요', '좋아했었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어렸을 때', role: 'time' },
          { text: '여기에', role: 'place' },
          { text: '살았었어요', role: 'verb' },
        ],
        zh: '小时候住在这里。',
        swapWords: ['다녔었어요', '있었었어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📖', context: '学习经历', ko: '예전에 한국어를 공부했었어요.', zh: '以前学过韩语。' },
      { icon: '🏙️', context: '居住经历', ko: '예전에 서울에 살았었어요.', zh: '以前在首尔住过。' },
      { icon: '🎤', context: '追星回忆', ko: '예전에 이 가수를 정말 좋아했었어요.', zh: '以前非常喜欢过这位歌手。' },
      { icon: '🎓', context: '身份变化', ko: '저도 오년 전에 한국어 학생이었었어요.', zh: '我五年前也曾是韩语学生。' },
      { icon: '🏫', context: '学校往事', ko: '어렸을 때 이 동네에 살았었어요. 지금은 다른 곳에 살아요.', zh: '小时候住在这个小区，现在住在别的地方了。' },
      { icon: '🍜', context: '饮食变化', ko: '예전에는 매운 음식을 잘 먹었었어요. 그런데 지금은 못 먹어요.', zh: '以前很能吃辣的食物，但现在不行了。' },
    ],
    mistakes: [
      { wrong: '어제 밥을 먹었었어요（昨天吃饭，普通过去）', correct: '어제 밥을 먹었어요', note: '昨天发生的普通事件用 -었어요，不需要 -었었어요 的回忆感。' },
      { wrong: '좋아했었어요 误解为"现在还喜欢"', correct: '좋아했었어요（以前喜欢过，现在未必）', note: '-았었어요 常暗示现在状态可能不同了，注意语气。' },
      { wrong: '어제 공부했었어요（昨天学习）', correct: '어제 공부했어요', note: '-았었어요 用于有时间距离的回忆，昨天的事直接用 -았어요。' },
      { wrong: '친구이었었어요', correct: '친구였었어요', note: '친구 以 모음 结尾，用 였었어요，不是 이었었어요。' },
    ],
        compareHtml: `<div class="card-title">"曾经……过"vs 普通过去时</div>
<div class="card-body">-았었/었었/였었어요 表达过去曾经有过的经历或状态，常带有"现在可能已经不同了"的感觉。中文里没有完全对应的形式，可以理解为"曾经……（但现在未必如此）"。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">普通过去时</div><div style="font-size:16px;color:#89756e;margin-top:2px">单纯叙述过去</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국어를 배웠어요.</span><span style="font-size:16px;color:#5a4640">学了韩语。（陈述事实）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">서울에 갔어요.</span><span style="font-size:16px;color:#5a4640">去了首尔。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">过去回想（-았었/었었）</div><div style="font-size:16px;color:#89756e;margin-top:2px">回忆过去，暗示变化</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국어를 배웠었어요.</span><span style="font-size:16px;color:#5a4640">学过韩语（但现在可能忘了）。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">서울에 갔었어요.</span><span style="font-size:16px;color:#5a4640">去过首尔（但现在不在了）。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">回忆感从何而来</div><div style="font-size:16px;color:#5a4640">中文说"学过韩语"和"学了韩语"差别不大，得靠上下文判断是否现在还在学。韩语直接用词尾 -았었 标明"曾经学过，现在可能不学了"——一个词尾代替了一整句背景说明。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">使用场景：聊过去的学校、前公司、以前住过的地方。</div></div>
<div class="reminder-box">回忆过去和普通过去看起来只差一个"었"，但语感完全不同。想问别人"以前是不是学过韩语？"用 배웠어요? 还是 배웠었어요?——后者更自然，因为你暗示了"现在不一定还在学"。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-았었/었었/였었어요</h1>
<p style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">以前曾经……，现在可能已经不同了。</p>
<div class="block">
  <div style="font-size:16px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">예전에 서울에 살았었어요.</div>
    <div class="zh">以前在首尔住过。（现在不住了）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">예전에 이 가수를 좋아했었어요.</div>
    <div class="zh">以前喜欢过这位歌手。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:16px">어렸을 때 여기에 살았었어요.</div>
    <div class="zh">小时候住在这里。</div>
  </div>
</div>
<div class="block">
  <div class="h2">三种变形规则</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">词干末 ㅏ/ㅗ</span>
      <span style="font-weight:800;color:#ff7fa8">→ -았었어요</span>
      <span style="font-size:16px;color:#89756e">살다→살았었어요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">其他元音</span>
      <span style="font-weight:800;color:#2db89b">→ -었었어요</span>
      <span style="font-size:16px;color:#89756e">먹다→먹었었어요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">하다 动词</span>
      <span style="font-weight:800;color:#6b7ff0">→ 했었어요</span>
      <span style="font-size:16px;color:#89756e">공부하다→공부했었어요</span>
    </div>
  </div>
</div>
<div class="reminder-box">昨天的普通事件用 -었어요 就够了，-았었어요 用于有时间距离的回忆或强调"现在已不同"。</div>`,
    
    compareLabel: '-었어요 vs -었었어요',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第2课</span>
  <div class="ov-title">-았었/었었/였었어요</div>
  <div class="ov-sub">以前曾经……，带有"现在可能已不同"的回忆感</div>
  <div class="ov-sec">
    <h3>变化规则</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      ㅏ/ㅗ → <b style="color:#ff7fa8">았었어요</b>：살았었어요（住过）, 좋았었어요（曾经好）<br>
      其他 → <b style="color:#2db89b">었었어요</b>：먹었었어요（吃过）, 있었었어요（有过）<br>
      하다 → <b style="color:#6b7ff0">했었어요</b>：공부했었어요（学习过）, 좋아했었어요（喜欢过）<br>
      名词 → <b style="color:#e8a87c">이었었어요/였었어요</b>：학생이었었어요（以前是学生）
    </div>
  </div>
  <div class="ov-sec">
    <h3>常用表达</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      예전에 서울에 <b style="color:#ff7fa8">살았었어요</b>（以前在首尔住过）<br>
      이 가수를 <b style="color:#6b7ff0">좋아했었어요</b>（以前喜欢过这位歌手）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      昨天普通事件 → 用 <span style="color:#ff7fa8">-었어요</span>，不用 -었었어요<br>
      <span style="color:#e05555;text-decoration:line-through">어제 먹었었어요</span> → <span style="color:#ff7fa8">어제 먹었어요</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l03',
    partNumber: 3,
    lessonNumber: 3,
    title: '-고 싶다, 그러면',
    whatItDoes: '说想做什么，以及"那样的话"',
    whatItDoesBody: '-고 싶어요 表达说话人自己的愿望；\n그러면 连接条件和结果，表示"那么/那样的话"。\n-고 싶어요 只能用于第一人称，说别人想做要换成 -고 싶어하다。\n和中文不同：\n中文"想做"不区分人称，韩语第一人称用 싶어요，第三人称要换成 싶어하다。',
    structureNote: '两块内容：①-고 싶어요（想做）动词词干直接加，非常规律；\n②그러면（那么）放句首连接两句话，口语常缩成 그럼。',
    rulesNote: '-고 싶어요 只接动词词干，不能直接接名词（커피고 싶어요 ✗）。\n说第三人称的愿望要用 -고 싶어하다（친구는 가고 싶어해요）。\n그러면 表示顺接条件，和转折用的 그렇지만 不同。',
    scenarioNote: '-고 싶어요 是表达愿望最自然的方式说学习目标、旅行计划、购物心愿都用它。\n加上 그러면/그럼，就能做出"如果……那就……"的建议句，对话立刻更流畅。',
    structures: [
      {
        ko: '한국에 가고 싶어요',
        zh: '想去韩国。',
        tokens: [
          { text: '한국에', role: 'place' },
          { text: '가고 싶어요', role: 'verb' },
        ],
      },
      {
        ko: '시간이 있어요? 그러면 같이 가요',
        zh: '有时间吗？那一起去吧。',
        tokens: [
          { text: '시간이', role: 'subject' },
          { text: '있어요?', role: 'verb' },
          { text: '그러면', role: 'plain' },
          { text: '같이 가요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -고 싶어요', examples: '가다→가고 싶어요, 먹다→먹고 싶어요, 배우다→배우고 싶어요, 마시다→마시고 싶어요' },
      { type: 'note', text: '-고 싶어요 只接动词词干，不能直接接名词', examples: '커피고 싶어요 ✗ → 커피를 마시고 싶어요 ✓' },
      { type: 'note', text: '-고 싶어요 表达说话人本人的愿望；第三人称用 -고 싶어하다', examples: '저는 가고 싶어요（我想去）/ 친구는 가고 싶어해요（朋友想去）' },
      { type: 'rule', text: '그러면 — 放句首连接条件与结果', examples: '시간이 있어요? 그러면 같이 가요.' },
      { type: 'compare', text: '그러면 ≠ 그렇지만', examples: '그러면（那么，条件顺接）/ 그렇지만（但是，明确转折）' },
      { type: 'usage', text: '口语中 그러면 常缩短为 그럼', examples: '그럼 같이 가요. / 그럼 내일 봐요.' },
      { type: 'example', text: '한국어를 잘하고 싶어요. / 뭐 먹고 싶어요? / 배가 고파요. 그러면 같이 밥을 먹어요.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '배우고 싶어요', role: 'verb' },
        ],
        zh: '想学韩语。',
        swapWords: ['가고 싶어요', '먹고 싶어요', '보고 싶어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '콘서트에', role: 'place' },
          { text: '가고 싶어요', role: 'verb' },
        ],
        zh: '想去演唱会。',
        swapWords: ['한국에 가고 싶어요', '이 노래를 배우고 싶어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '시간이 있어요.', role: 'plain' },
          { text: '그러면', role: 'plain' },
          { text: '같이 공부해요', role: 'verb' },
        ],
        zh: '有时间。那一起学习吧。',
        swapWords: ['같이 가요', '같이 먹어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '잘하고 싶어요.', role: 'verb' },
          { text: '그러면', role: 'plain' },
          { text: '매일 연습하세요', role: 'verb' },
        ],
        zh: '想把韩语学好。那就每天练习吧。',
        swapWords: ['그럼 같이 해요', '그럼 시작해요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🎯', context: '学习目标', ko: '한국어를 잘하고 싶어요.', zh: '想把韩语学好。' },
      { icon: '✈️', context: '旅行计划', ko: '한국에 가고 싶어요.', zh: '想去韩国。' },
      { icon: '🎤', context: 'KPOP 追星', ko: '이 가수의 콘서트에 가고 싶어요.', zh: '想去这位歌手的演唱会。' },
      { icon: '🍚', context: '日常对话', ko: '가: 배가 너무 고파요. 나: 그러면 같이 밥을 먹읍시다.', zh: '甲：肚子太饿了。乙：那一起去吃饭吧。' },
      { icon: '🛍️', context: '购物愿望', ko: '이 가방을 사고 싶어요. 그런데 좀 비싸요.', zh: '想买这个包，但有点贵。' },
      { icon: '🍣', context: '餐厅', ko: '오늘은 일식을 먹고 싶어요. 그러면 역 앞에 있는 식당에 가요.', zh: '今天想吃日料，那去车站前面那家餐厅吧。' },
    ],
    mistakes: [
      { wrong: '커피고 싶어요', correct: '커피를 마시고 싶어요', note: '-고 싶어요 接动词，不直接接名词，需要补出动词。' },
      { wrong: '그러면을 "但是"용', correct: '그러면 = 那么/那样的话（顺接条件）', note: '转折用 그렇지만，그러면 是条件推进，意思完全不同。' },
      { wrong: '한국어고 싶어요', correct: '한국어를 배우고 싶어요', note: '-고 싶어요 接动词词干，不能直接接名词。' },
      { wrong: '친구는 가고 싶어요（第三人称）', correct: '친구는 가고 싶어해요', note: '说话人本人用 -고 싶어요，第三人称换成 -고 싶어하다。' },
    ],
        compareHtml: `<div class="card-title">"想做"vs"那样的话"</div>
<div class="card-body">-고 싶어요 表达说话人自己的愿望；그러면 连接条件和结果，表示"那么/那样的话"。和中文不同：中文"想做"不区分人称，韩语第一人称用 싶어요，第三人称要换成 싶어하다。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-고 싶어요（我想做）</div><div style="font-size:16px;color:#89756e;margin-top:2px">第一人称"我想……"</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국에 가고 싶어요.</span><span style="font-size:16px;color:#5a4640">我想去韩国。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">이 노래를 듣고 싶어요.</span><span style="font-size:16px;color:#5a4640">我想听这首歌。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">그러면（那样的话）</div><div style="font-size:16px;color:#89756e;margin-top:2px">连接条件→结果</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">시간이 없어요. 그러면 다음에 만나요.</span><span style="font-size:16px;color:#5a4640">没时间。那下次见吧。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">배고파요? 그러면 먹어요.</span><span style="font-size:16px;color:#5a4640">饿了吗？那就吃吧。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">人称区分要牢记</div><div style="font-size:16px;color:#5a4640">中文"我想去"和"他/她想去"用的动词一样，韩语不一样。说别人想做什么，必须用 싶어하다（第三人称专用形式）。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">저는 가고 싶어요 ✓ / 친구가 가고 싶어해요 ✓ / 친구가 가고 싶어요 ✗</div></div>
<div class="reminder-box">-고 싶어요 是"我想"（自己说），说别人用 -고 싶어하다。中文"想去"一个词搞定所有人，韩语必须区分——这是最容易犯的错误之一。</div>`,
    linkedGrammarIds: ['g66'],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-고 싶어요 · 그러면</h1>
<p style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">表达心里想做的事，再用"那么"连接下一句。</p>
<div class="block">
  <div style="font-size:16px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">한국에 가고 싶어요.</div>
    <div class="zh">想去韩国。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">이 노래를 배우고 싶어요.</div>
    <div class="zh">想学这首歌。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:16px">시간이 있어요? 그러면 같이 가요.</div>
    <div class="zh">有时间吗？那一起去吧。</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心结构</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">动词词干</span>
      <span style="font-weight:800;color:#ff7fa8;font-size:16px">+ -고 싶어요</span>
      <span style="font-size:16px;color:#89756e">想做……</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#2db89b;font-size:16px">그러면 / 그럼</span>
      <span style="font-size:16px;color:#89756e">那么/那样的话（放句首）</span>
    </div>
  </div>
</div>
<div class="reminder-box">-고 싶어요 只接动词词干，不直接接名词。说第三人称愿望换成 -고 싶어하다：친구는 가고 싶어해요。</div>`,
    
    compareLabel: '-고 싶어요 vs -을/ㄹ래요',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第3课</span>
  <div class="ov-title">-고 싶어요 · 그러면</div>
  <div class="ov-sub">表达愿望，用条件连接下一句</div>
  <div class="ov-sec">
    <h3>-고 싶어요 变化</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      가다 → 가<b style="color:#ff7fa8">고 싶어요</b>（想去）<br>
      먹다 → 먹<b style="color:#ff7fa8">고 싶어요</b>（想吃）<br>
      배우다 → 배우<b style="color:#ff7fa8">고 싶어요</b>（想学）<br>
      공부하다 → 공부하<b style="color:#ff7fa8">고 싶어요</b>（想学习）
    </div>
  </div>
  <div class="ov-sec">
    <h3>그러면 用法</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      시간이 있어요? <b style="color:#2db89b">그러면</b> 같이 가요.（有时间？那一起去）<br>
      한국어를 배우고 싶어요? <b style="color:#2db89b">그러면</b> 매일 연습하세요.
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">커피고 싶어요</span> → <span style="color:#ff7fa8">커피를 마시고 싶어요</span><br>
      그러면 ≠ 但是 → 但是用 <span style="color:#ff7fa8">그렇지만</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l04',
    partNumber: 3,
    lessonNumber: 10,
    title: '"ㄹ"不规则音变',
    whatItDoes: '认识ㄹ收音词的特殊变形规律',
    whatItDoesBody: 'ㄹ 不规则不是永远变化，而是遇到 ㄴ/ㅂ/ㅅ 开头的语尾时 ㄹ 脱落。\n接 -아요/어요、-고 时保留。\n常见词：\n살다, 알다, 만들다, 놀다。\n中文没有类似规则，记住"遇 ㄴ/ㅂ/ㅅ 就脱落"这一条就够了。',
    structureNote: '这节课不是新句型，而是变形规则：\nㄹ 词干在接哪些语尾时会脱落 ㄹ，在哪些语尾前保留。\n把常用词（살다/알다/만들다）的几种形式对比记，比背规则快。',
    rulesNote: 'ㄹ 脱落触发条件：\n后接语尾首字母是 ㄴ/ㅂ/ㅅ（如 -(으)세요、正式体 -ㅂ니다/습니다、冠词形 -는）。\n接元音语尾（-아요/어요）或 -고 时 ㄹ 保留不变。\n口诀：\n살아요（保）/ 사세요（落）/ 삽니다（落）/ 사는（落）。',
    scenarioNote: '살다/알다/만들다 是极高频词问住哪、问认不认识、说自己做的。\n掌握 ㄹ 脱落，遇到这类词就不会写错形式，听力也更容易识别。',
    structures: [
      {
        ko: '어디에 살아요?',
        zh: '住在哪里？',
        tokens: [
          { text: '어디에', role: 'place' },
          { text: '살아요', role: 'verb' },
        ],
      },
      {
        ko: '이 단어를 아세요?',
        zh: '您知道这个单词吗？',
        tokens: [
          { text: '이 단어를', role: 'object' },
          { text: '아세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'ㄹ + -아요/어요 → ㄹ 保留', examples: '살다→살아요, 알다→알아요, 만들다→만들어요, 놀다→놀아요' },
      { type: 'rule', text: 'ㄹ + -고 → ㄹ 保留', examples: '살고 있어요, 알고 있어요, 만들고 싶어요' },
      { type: 'rule', text: 'ㄹ + -(으)세요 → ㄹ 脱落', examples: '살다→사세요, 알다→아세요, 만들다→만드세요, 놀다→노세요' },
      { type: 'rule', text: 'ㄹ + -ㅂ니다 → ㄹ 脱落', examples: '살다→삽니다, 알다→압니다, 만들다→만듭니다, 팔다→팝니다' },
      { type: 'note', text: '口诀：ㄹ 在 ㄴ/ㅂ/ㅅ 开头语尾前脱落，在元音开头语尾前保留', examples: '-(으)세요/ㅂ니다/는 前脱落；-아요/어요/-고 前保留' },
      { type: 'rule', text: 'ㄹ + -는 → ㄹ 脱落（冠词形）', examples: '살다→사는 사람（住的人）, 알다→아는 단어（认识的单词）, 만들다→만드는 방법' },
      { type: 'example', text: '살아요 / 사세요 / 삽니다 / 사는 — 살다 全形变一览; 알아요 / 아세요 / 압니다 — 알다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '어디에', role: 'place' },
          { text: '살아요', role: 'verb' },
        ],
        zh: '住在哪里？',
        swapWords: ['알아요', '만들어요', '놀아요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래를', role: 'object' },
          { text: '아세요', role: 'verb' },
        ],
        zh: '您知道这首歌吗？',
        swapWords: ['사세요', '만드세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '문장을', role: 'object' },
          { text: '만들어요', role: 'verb' },
        ],
        zh: '造句。',
        swapWords: ['만드세요', '만듭니다'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '요즘', role: 'time' },
          { text: '어디에', role: 'place' },
          { text: '살아요', role: 'verb' },
        ],
        zh: '最近住在哪里？',
        swapWords: ['알아요', '놀아요', '팔아요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🏠', context: '问住址', ko: '어디에 살아요?', zh: '住在哪里？' },
      { icon: '🎵', context: 'KPOP 互动', ko: '이 노래 아세요?', zh: '您知道这首歌吗？' },
      { icon: '✏️', context: '学习造句', ko: '문장을 만들어 보세요.', zh: '请试着造句。' },
      { icon: '😊', context: '日常对话', ko: '요즘 잘 지내고 있어요? 저는 잘 살고 있어요.', zh: '最近过得好吗？我过得很好。' },
      { icon: '🏡', context: '问住所', ko: '지금 어디에 살아요? 저는 서울에 살아요. 회사에서 가까워요.', zh: '现在住在哪里？我住在首尔，离公司很近。' },
      { icon: '🍳', context: '做饭', ko: '직접 만들어요? 네, 저는 요리하는 걸 좋아해요.', zh: '自己做吗？是的，我喜欢做饭。' },
    ],
    mistakes: [
      { wrong: '알세요?', correct: '아세요?', note: '알다 + -세요 → ㄹ 脱落 → 아세요。不要保留 ㄹ。' },
      { wrong: '사아요（살다→살아요의 误写）', correct: '살아요', note: '接 -아요 时 ㄹ 保留，살다 → 살아요，不是 사아요。' },
      { wrong: '만들세요', correct: '만드세요', note: '만들다 + -세요 → ㄹ 脱落 → 만드세요。' },
      { wrong: '놀세요（권유）', correct: '노세요', note: '놀다 + -세요 → ㄹ 脱落 → 노세요。-세요 前 ㄹ 总是脱落。' },
    ],
        compareHtml: `<div class="card-title">ㄹ收音词的特殊变形规律</div>
<div class="card-body">ㄹ 不规则不是永远变化，而是遇到 ㄴ/ㅂ/ㅅ 开头的语尾时 ㄹ 脱落。接 -아요/어요、-고 时保留。常见词：살다, 알다, 만들다, 놀다。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">保留 ㄹ 的情况</div><div style="font-size:16px;color:#89756e;margin-top:2px">接元音/고 时不变</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">살다 → 살아요（活着）</span><span style="font-size:16px;color:#5a4640">接 -아요，ㄹ 保留</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">알다 → 알고 있어요（知道）</span><span style="font-size:16px;color:#5a4640">接 -고，ㄹ 保留</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">ㄹ 脱落的情况</div><div style="font-size:16px;color:#89756e;margin-top:2px">接 ㄴ/ㅂ/ㅅ 时脱落</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">살다 → 삽니다（生活）</span><span style="font-size:16px;color:#5a4640">接 ㅂ→脱落</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">알다 → 아는 사람（认识的人）</span><span style="font-size:16px;color:#5a4640">接 ㄴ→脱落</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">中文没有的规则</div><div style="font-size:16px;color:#5a4640">中文没有类似的语音脱落现象。韩语里 ㄹ 在遇到 ㄴ/ㅂ/ㅅ 时"消失"，是因为发音器官冲突——舌边音 ㄹ 和鼻音/塞音连读不顺畅，韩语选择了简化。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">记住一句话："遇 ㄴ/ㅂ/ㅅ 就脱落"，其他情况保留。</div></div>
<div class="reminder-box">알다（知道）→ 아는（知道的）→ 알고（知道+고）→ 압니다（합니다 体）。"遇 ㄴ/ㅂ/ㅅ 脱落"——就这一条规则。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">"ㄹ" 不规则音变</h1>
<p style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">ㄹ 词干遇到特定语尾会脱落 ㄹ，规律很好记。</p>
<div class="block">
  <div style="font-size:16px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">어디에 살아요?</div>
    <div class="zh">住在哪里？（ㄹ 保留）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">이 노래 아세요?</div>
    <div class="zh">您知道这首歌吗？（ㄹ 脱落）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:16px">문장을 만들어 보세요.</div>
    <div class="zh">请试着造句。（만들다 → 만들어）</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心规则</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">接 -아요/어요/-고</span>
      <span style="font-weight:800;color:#2db89b">ㄹ 保留</span>
      <span style="font-size:16px;color:#89756e">살아요, 알고 있어요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">接 -(으)세요/-ㅂ니다/-는</span>
      <span style="font-weight:800;color:#ff7fa8">ㄹ 脱落</span>
      <span style="font-size:16px;color:#89756e">사세요, 삽니다, 사는</span>
    </div>
  </div>
</div>
<div class="reminder-box">口诀：遇 ㄴ/ㅂ/ㅅ 开头语尾就脱落，遇元音开头语尾就保留。살다 → 살아요（保）/ 사세요（落）。</div>`,
    
    compareLabel: 'ㄹ 保留 vs ㄹ 脱落',
    quickTable: {
      title: 'ㄹ 不规则高频词变形',
      headers: ['原形', '-아요/어요', '-(으)세요', '-ㅂ니다'],
      rows: [
        ['살다 住', '살아요', '사세요', '삽니다'],
        ['알다 知道', '알아요', '아세요', '압니다'],
        ['만들다 制作', '만들어요', '만드세요', '만듭니다'],
        ['놀다 玩', '놀아요', '노세요', '놉니다'],
        ['팔다 卖', '팔아요', '파세요', '팝니다'],
        ['길다 长', '길어요', '기세요', '깁니다'],
        ['달다 甜', '달아요', '다세요', '답니다'],
        ['들다 拿/花费', '들어요', '드세요', '듭니다'],
        ['멀다 远', '멀어요', '머세요', '멉니다'],
        ['힘들다 辛苦', '힘들어요', '힘드세요', '힘듭니다'],
      ],
    },
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第4课</span>
  <div class="ov-title">"ㄹ" 不规则音变</div>
  <div class="ov-sub">ㄹ 遇 ㄴ/ㅂ/ㅅ 脱落，遇元音保留</div>
  <div class="ov-sec">
    <h3>保留 ㄹ（接元音开头）</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      살<b style="color:#2db89b">아요</b> · 알<b style="color:#2db89b">아요</b> · 만들<b style="color:#2db89b">어요</b><br>
      살<b style="color:#2db89b">고</b> 있어요 · 알<b style="color:#2db89b">고</b> 있어요
    </div>
  </div>
  <div class="ov-sec">
    <h3>脱落 ㄹ（接 ㄴ/ㅂ/ㅅ 开头）</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      살다 → <b style="color:#ff7fa8">사세요</b> · <b style="color:#ff7fa8">삽니다</b><br>
      알다 → <b style="color:#ff7fa8">아세요</b> · <b style="color:#ff7fa8">압니다</b><br>
      만들다 → <b style="color:#ff7fa8">만드세요</b> · <b style="color:#ff7fa8">만듭니다</b>
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">알세요</span> → <span style="color:#ff7fa8">아세요</span><br>
      <span style="color:#e05555;text-decoration:line-through">만들세요</span> → <span style="color:#ff7fa8">만드세요</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l05',
    partNumber: 3,
    lessonNumber: 4,
    title: '-을/ㄹ래요, -겠-',
    whatItDoes: '说"好的我知道了"和做选择',
    whatItDoesBody: '-을/ㄹ래요 表达"我要……/要不要……"，比 -고 싶어요 更直接；\n-겠- 表达意志、推测或礼貌，最常见固定表达是 알겠어요（明白了）。\n-을/ㄹ래요 类似中文口语里"我要……"，-겠- 类似"我会/我来……"。',
    structureNote: '两块内容：①-을/ㄹ래요（要做/要不要）看词干有无收音选 을래요/ㄹ래요；\n②-겠-（意志/礼貌）初学阶段先掌握 알겠어요 这一个固定表达就够。',
    rulesNote: '-을/ㄹ래요 收音规则和之前完全一样：\n有收音接 을래요，无收音接 ㄹ래요。\n-겠- 直接加在词干后，不用考虑收音。\n注意区分：\n-고 싶어요 是内心愿望（柔和），-을/ㄹ래요 是直接表态（更口语）。',
    scenarioNote: '갈래요/먹을래요/볼래요 是朋友间最自然的邀约用语"要去吗？""要吃什么？"。\n알겠어요 则是课堂、服务场合里每天都会说的回应。\n这节课学完，日常对话的流畅度会明显提升。',
    structures: [
      {
        ko: '저는 커피 마실래요',
        zh: '我要喝咖啡。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '커피', role: 'object' },
          { text: '마실래요', role: 'verb' },
        ],
      },
      {
        ko: '알겠어요. 다시 해 볼게요',
        zh: '明白了。我再试一次。',
        tokens: [
          { text: '알겠어요', role: 'verb' },
          { text: '다시 해 볼게요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音动词词干 + ㄹ래요', examples: '가다→갈래요, 보다→볼래요, 마시다→마실래요, 공부하다→공부할래요' },
      { type: 'rule', text: '有收音动词词干 + 을래요', examples: '먹다→먹을래요, 읽다→읽을래요, 앉다→앉을래요' },
      { type: 'rule', text: '动词词干 + -겠어요', examples: '가겠어요, 먹겠어요, 알겠어요, 하겠어요' },
      { type: 'usage', text: '-겠- 表达意志/推测/礼貌', examples: '알겠어요（明白了）, 하겠어요（我来做）, 어떻게 하겠어요?（打算怎么做？）' },
      { type: 'note', text: '-겠- 不只表示将来；初学阶段先掌握 알겠어요', examples: '알겠어요（明白了）— 会话最高频固定表达' },
      { type: 'compare', text: '-고 싶어요 vs -을/ㄹ래요', examples: '커피 마시고 싶어요（内心愿望，柔和）/ 커피 마실래요（直接意愿选择，更自然口语）' },
      { type: 'example', text: '갈래요 / 먹을래요 / 볼래요 / 알겠어요 / 하겠어요 — 高频例句速记' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '같이', role: 'plain' },
          { text: '갈래요', role: 'verb' },
        ],
        zh: '要一起去吗？',
        swapWords: ['먹을래요', '볼래요', '할래요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '아이스 아메리카노', role: 'object' },
          { text: '마실래요', role: 'verb' },
        ],
        zh: '我要喝冰美式。',
        swapWords: ['먹을래요', '볼래요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '알겠어요', role: 'verb' },
        ],
        zh: '明白了。',
        swapWords: ['하겠어요', '가겠어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '뭐', role: 'object' },
          { text: '먹을래요', role: 'verb' },
        ],
        zh: '要吃什么？',
        swapWords: ['마실래요', '할래요', '볼래요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☕', context: '点餐', ko: '저는 아이스 아메리카노 마실래요.', zh: '我要喝冰美式。' },
      { icon: '👫', context: '朋友邀约', ko: '같이 갈래요?', zh: '要一起去吗？' },
      { icon: '📚', context: '学习回应', ko: '알겠어요. 다시 해 볼게요.', zh: '明白了，我再试一次。' },
      { icon: '🎵', context: 'KPOP', ko: '이 무대를 다시 볼래요.', zh: '我要再看这个舞台。' },
      { icon: '🍽️', context: '餐厅点单', ko: '뭐 드실래요? 저는 냉면 먹을래요.', zh: '您要吃什么？我要吃冷面。' },
      { icon: '🚌', context: '出行', ko: '거기까지 같이 갈래요? 알겠어요, 그럼 10분 후에 출발해요.', zh: '要一起去那里吗？明白了，那10分钟后出发。' },
    ],
    mistakes: [
      { wrong: '먹ㄹ래요', correct: '먹을래요', note: '有收音词干用 을래요，먹다 → 먹을래요。' },
      { wrong: '-겠어요 只理解成将来时', correct: '알겠어요（明白了），하겠어요（我来做）', note: '-겠- 语气多样，初学先记 알겠어요 这个高频固定表达。' },
      { wrong: '가ㄹ래요', correct: '갈래요', note: '无收音词干用 ㄹ래요：가다 → 갈래요，不单独写 ㄹ。' },
      { wrong: '알겠어요 = 알았어요（以为意思相同）', correct: '알겠어요（现在明白了，礼貌回应）/ 알았어요（知道了，随意口语）', note: '알겠어요 更礼貌，适合对上级或正式场合；알았어요 是朋友间用语。' },
    ],
        compareHtml: `<div class="card-title">"我要……"vs"好的我知道了"</div>
<div class="card-body">-을/ㄹ래요 表达"我要……/要不要……"，比 -고 싶어요 更直接；-겠- 表达意志、推测或礼貌，最常见固定表达是 알겠어요（明白了）。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-을/ㄹ래요（我要……）</div><div style="font-size:16px;color:#89756e;margin-top:2px">意愿+提议，口语常用</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">밥 먹을래요?</span><span style="font-size:16px;color:#5a4640">要吃饭吗？/ 我要吃饭。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">뭐 마실래요?</span><span style="font-size:16px;color:#5a4640">要喝什么？</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">-겠-（我知道了）</div><div style="font-size:16px;color:#89756e;margin-top:2px">意志/推测/礼貌</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">알겠어요.</span><span style="font-size:16px;color:#5a4640">明白了。（认知→承诺）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">내가 하겠어요.</span><span style="font-size:16px;color:#5a4640">我来做。（意志）</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">和中文的对应关系</div><div style="font-size:16px;color:#5a4640">-을/ㄹ래요 既是问句也是陈述句：뭐 먹을래요?（你要吃什么？）밥 먹을래요（我要吃饭）。中文需要语调区分，韩语靠上下文。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">-겠- 没有中文直接对应词，它嵌入在词尾里。알겠어요 直译是"会知道的"，实际意思是"我明白了/我知道了"。</div></div>
<div class="reminder-box">알겠어요 是你和韩国人对话时用得最多的词之一——对方说什么，回一句 알겠어요 表示"明白了/收到了"。类似中文"好的"或"明白了"。</div>`,
    linkedGrammarIds: ['g63', 'g51'],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-을/ㄹ래요 · -겠어요</h1>
<p style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">直接表达"我要……"，以及礼貌回应"明白了"。</p>
<div class="block">
  <div style="font-size:16px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">같이 갈래요?</div>
    <div class="zh">要一起去吗？</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">저는 아이스 아메리카노 마실래요.</div>
    <div class="zh">我要喝冰美式。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:16px">알겠어요. 다시 해 볼게요.</div>
    <div class="zh">明白了，我再试一次。</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心结构</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">无收音词干</span>
      <span style="font-weight:800;color:#ff7fa8">+ ㄹ래요</span>
      <span style="font-size:16px;color:#89756e">가다→갈래요, 보다→볼래요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">有收音词干</span>
      <span style="font-weight:800;color:#2db89b">+ 을래요</span>
      <span style="font-size:16px;color:#89756e">먹다→먹을래요, 읽다→읽을래요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">词干</span>
      <span style="font-weight:800;color:#6b7ff0">+ -겠어요</span>
      <span style="font-size:16px;color:#89756e">알겠어요（明白了）</span>
    </div>
  </div>
</div>
<div class="reminder-box">-겠- 不只表示将来，初学阶段先把 알겠어요（明白了）作为固定表达记住，会话立刻更自然。</div>`,
    
    compareLabel: '-고 싶어요 vs -을/ㄹ래요',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第5课</span>
  <div class="ov-title">-을/ㄹ래요 · -겠어요</div>
  <div class="ov-sub">意愿选择 + 알겠어요 礼貌回应</div>
  <div class="ov-sec">
    <h3>-을/ㄹ래요 变化</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      받침 없는 → <b style="color:#ff7fa8">ㄹ래요</b>：갈래요 · 볼래요 · 마실래요<br>
      받침 있는 → <b style="color:#2db89b">을래요</b>：먹을래요 · 읽을래요 · 앉을래요
    </div>
  </div>
  <div class="ov-sec">
    <h3>-겠어요 高频表达</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <b style="color:#6b7ff0">알겠어요</b>（明白了）&nbsp; 하겠어요（我来做）&nbsp; 가겠어요（我去）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">먹ㄹ래요</span> → <span style="color:#ff7fa8">먹을래요</span>（받침 있는 用 을래요）<br>
      -겠어요 不只是将来 → 先记 <span style="color:#6b7ff0">알겠어요</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l06',
    partNumber: 3,
    lessonNumber: 2,
    title: '무슨, 어느, 어떤',
    whatItDoes: '问什么、哪个、什么样的',
    whatItDoesBody: '三个疑问词都可译成"什么/哪"，但用法不同：\n무슨 问名称内容，어느 从选项中选哪个，어떤 问性质特点。\n中文"什么歌""哪首歌""什么风格的歌"对应的就是这三个词。',
    structureNote: '这节课三个疑问词都放在名词前面，结构一样，区别只在"问的是什么"。\n记住三个典型句：\n무슨 뜻이에요？/ 어느 나라 사람이에요？/ 어떤 음식을 좋아해요？',
    rulesNote: '어느 只用于疑问句，肯定句里不用（不说"어느 노래가 좋아요"来表达喜欢）。\n무슨 和 어떤 的区别：\n问"叫什么名字/是什么"用 무슨，问"属于哪种/什么特点"用 어떤。',
    scenarioNote: '这三个词是开启话题的万能钥匙"这是什么歌""你是哪国人""喜欢什么样的食物"。\n掌握这节课，你能问出更精准的问题，对话不再只靠"뭐예요？"。',
    structures: [
      {
        ko: '무슨 뜻이에요?',
        zh: '是什么意思？',
        tokens: [
          { text: '무슨', role: 'place' },
          { text: '뜻이에요', role: 'verb' },
        ],
      },
      {
        ko: '어떤 노래를 좋아해요?',
        zh: '喜欢什么样的歌？',
        tokens: [
          { text: '어떤', role: 'place' },
          { text: '노래를', role: 'object' },
          { text: '좋아해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '무슨 + 名词 — 问名称/内容/意思/属性', examples: '무슨 노래예요? 무슨 뜻이에요? 무슨 색을 좋아해요? 오늘 무슨 일이 있어요?' },
      { type: 'rule', text: '어느 + 名词 — 从选项中选哪一个（只用于疑问句）', examples: '어느 나라 사람이에요? 어느 카페에 갈래요? 어느 것이 좋아요?' },
      { type: 'rule', text: '어떤 + 名词 — 问性质/特征/类型', examples: '어떤 음식을 좋아해요? 어떤 사람이에요? 어떤 영화를 봐요?' },
      { type: 'compare', text: '区别方法：名称/属性→무슨，选项→어느，特征→어떤', examples: '무슨 노래예요?（名称）/ 어느 노래가 좋아요?（选项）/ 어떤 노래를 좋아해요?（特点偏好）' },
      { type: 'note', text: '어느 主要用于疑问句，肯定陈述句中一般不用', examples: '이 노래가 좋아요 ✓（肯定句不用 어느）/ 어느 노래가 좋아요?（疑问句 ✓）' },
      { type: 'usage', text: '무슨 일이에요? — 日常高频表达', examples: '무슨 일이에요?（什么事？）/ 무슨 생각을 해요?（在想什么？）/ 무슨 말이에요?（什么意思？）' },
      { type: 'example', text: '무슨 뜻이에요? / 어느 나라 사람이에요? / 어떤 음식을 좋아해요?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '무슨', role: 'plain' },
          { text: '노래예요', role: 'verb' },
        ],
        zh: '是什么歌？',
        swapWords: ['무슨 뜻이에요', '무슨 일이에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어느', role: 'plain' },
          { text: '나라', role: 'subject' },
          { text: '사람이에요', role: 'verb' },
        ],
        zh: '是哪国人？',
        swapWords: ['어느 노래가 좋아요', '어느 카페에 갈래요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어떤', role: 'plain' },
          { text: '음식을', role: 'object' },
          { text: '좋아해요', role: 'verb' },
        ],
        zh: '喜欢什么样的食物？',
        swapWords: ['어떤 노래를 좋아해요', '어떤 사람이에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어떤', role: 'plain' },
          { text: '일을', role: 'object' },
          { text: '하세요', role: 'verb' },
        ],
        zh: '您做什么工作？',
        swapWords: ['무슨 일을 하세요', '어떤 공부를 해요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🔍', context: '查词', ko: '무슨 뜻이에요?', zh: '是什么意思？' },
      { icon: '🎵', context: 'KPOP 问歌', ko: '무슨 노래예요?', zh: '是什么歌？' },
      { icon: '🌏', context: '认识新朋友', ko: '어느 나라 사람이에요?', zh: '是哪国人？' },
      { icon: '🎨', context: '问颜色/属性', ko: '무슨 색을 좋아해요? 오늘 무슨 일이 있어요?', zh: '喜欢什么颜色？今天有什么事？' },
      { icon: '🏪', context: '便利店/超市', ko: '어떤 음료를 좋아해요? 저는 차가운 것을 좋아해요.', zh: '喜欢什么饮料？我喜欢凉的。' },
      { icon: '🤝', context: '初次见面', ko: '어느 나라 사람이에요? 어떤 일을 하세요?', zh: '是哪国人？做什么工作？' },
    ],
    mistakes: [
      { wrong: '어느 뜻이에요?（问意思）', correct: '무슨 뜻이에요?', note: '问名称/内容用 무슨，어느 是从选项里选一个，不适合问意思。' },
      { wrong: '무슨/어떤 混用', correct: '무슨 노래예요?（问名称）/ 어떤 노래를 좋아해요?（问偏好）', note: '问这首歌叫什么名用 무슨，问喜欢什么类型用 어떤。' },
      { wrong: '어느 음식이 맛있어요（肯定陈述句）', correct: '이 음식이 맛있어요 / 어떤 음식이 맛있어요?', note: '어느 主要用于疑问句中选择选项，肯定陈述句里用感觉很奇怪。' },
      { wrong: '어떤 뜻이에요?', correct: '무슨 뜻이에요?', note: '问意思/名称用 무슨，어떤 是问性质和特征时用。' },
    ],
        compareHtml: `<div class="card-title">무슨 vs 어느 vs 어떤</div>
<div class="card-body">三个疑问词都可译成"什么/哪/什么样的"，但用法完全不同：무슨 问名称内容，어느 从选项中选哪个，어떤 问性质特点。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">무슨（什么名称）</div><div style="font-size:16px;color:#89756e;margin-top:2px">问名称/内容/种类</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">무슨 노래 좋아해요?</span><span style="font-size:16px;color:#5a4640">喜欢什么歌？</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">무슨 일 있어요?</span><span style="font-size:16px;color:#5a4640">有什么事吗？</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">어느（哪个）</div><div style="font-size:16px;color:#89756e;margin-top:2px">从有限选项中选一个</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">어느 나라 가고 싶어요?</span><span style="font-size:16px;color:#5a4640">想去哪个国家？</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">어느 쪽이 더 좋아요?</span><span style="font-size:16px;color:#5a4640">哪个更好？</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">中文三个词的区别</div><div style="font-size:16px;color:#5a4640">中文"什么歌""哪首歌""什么风格的歌"——正好对应 무슨/어느/어떤。무슨 노래（什么歌名），어느 노래（哪首歌，从列表选），어떤 노래（什么样的歌，问风格类型）。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">三个词不能互换，用错会让韩国人困惑。</div></div>
<div class="reminder-box">무슨（什么名字）→ 어느（选哪个）→ 어떤（什么样的）。中文都问"什么"，韩语需要精确区分你想问的是名字、选项还是特征。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">무슨 · 어느 · 어떤</h1>
<p style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">都能放名词前表示"什么/哪"，但问的内容不一样。</p>
<div class="block">
  <div style="font-size:16px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">무슨 뜻이에요?</div>
    <div class="zh">是什么意思？（问名称/内容）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">어느 나라 사람이에요?</div>
    <div class="zh">是哪国人？（从选项中选）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:16px">어떤 음식을 좋아해요?</div>
    <div class="zh">喜欢什么样的食物？（问特点/类型）</div>
  </div>
</div>
<div class="block">
  <div class="h2">三词核心区别</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#ff7fa8;font-size:16px">무슨</span>
      <span style="font-size:16px;color:#241917">问名称、内容、意思、属性</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#2db89b;font-size:16px">어느</span>
      <span style="font-size:16px;color:#241917">从多个选项里选哪一个</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#6b7ff0;font-size:16px">어떤</span>
      <span style="font-size:16px;color:#241917">问性质、特征、类型、偏好</span>
    </div>
  </div>
</div>
<div class="reminder-box">어느 只用于疑问句；肯定句里说喜欢哪首歌，直接用"이 노래가 좋아요"，不用 어느。</div>`,
    
    compareLabel: '무슨 / 어느 / 어떤 对比',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第6课</span>
  <div class="ov-title">무슨 · 어느 · 어떤</div>
  <div class="ov-sub">问名称用 무슨，选选项用 어느，问特点用 어떤</div>
  <div class="ov-sec">
    <h3>三词用法</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">무슨</b>：무슨 뜻이에요? · 무슨 노래예요?（名称/内容）<br>
      <b style="color:#2db89b">어느</b>：어느 나라 사람이에요? · 어느 노래가 좋아요?（选项）<br>
      <b style="color:#6b7ff0">어떤</b>：어떤 음식을 좋아해요? · 어떤 사람이에요?（特点）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">어느 뜻이에요</span> → <span style="color:#ff7fa8">무슨 뜻이에요</span><br>
      问歌名 → <span style="color:#ff7fa8">무슨 노래예요</span>，问偏好 → <span style="color:#6b7ff0">어떤 노래를 좋아해요</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l07',
    partNumber: 3,
    lessonNumber: 6,
    title: '그렇지만, 그런데',
    whatItDoes: '说"但是/不过"，转折话题',
    whatItDoesBody: '그렇지만 是明确转折"但是"；\n그런데 语气更口语，可以是轻转折"不过"，也可以用来推进话题或引入新信息。\n这节课和P2的 그렇지만 有重叠重点是新增 그런데，弄清楚两者的区别。\n中文"但是"和"不过"的区别类似：\n그렇지만 ≈ 但是（正式转折），그런데 ≈ 不过（口语，还能转换话题）。',
    structureNote: '两个连词都放在第二句句首，结构完全一样。\n区别在语气和功能：\n그렇지만 只能做转折，그런데 还能转换话题（"对了，这个词什么意思？"）。',
    rulesNote: '判断用哪个很简单：\n前后有明确对比关系用 그렇지만；\n想轻松转换话题或信息时用 그런데。\n口语里 그런데 远比 그렇지만 常见，可以覆盖大多数场合。',
    scenarioNote: '그런데 是韩语口语里出现最频繁的连词之一用来插入新话题、提出疑问、轻轻转折。\n学会 그런데，你的对话会更自然流畅，不再只有"但是"这一种过渡方式。',
    structures: [
      {
        ko: '이 노래는 좋아요. 그렇지만 어려워요',
        zh: '这首歌很好，但是很难。',
        tokens: [
          { text: '이 노래는', role: 'subject' },
          { text: '좋아요.', role: 'verb' },
          { text: '그렇지만', role: 'plain' },
          { text: '어려워요', role: 'verb' },
        ],
      },
      {
        ko: '그런데 이 단어는 무슨 뜻이에요?',
        zh: '不过这个单词是什么意思？',
        tokens: [
          { text: '그런데', role: 'plain' },
          { text: '이 단어는', role: 'subject' },
          { text: '무슨 뜻이에요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'compare', text: '그렇지만 — 明确转折，前后信息形成对比', examples: '한국어는 재미있어요. 그렇지만 어려워요.' },
      { type: 'compare', text: '그런데 — 轻转折/话题推进，口语高频', examples: '이 노래는 좋아요. 그런데 발음이 빨라요.' },
      { type: 'note', text: '그런데 有话题转换功能，그렇지만 没有', examples: '그런데 무슨 뜻이에요? — 不能换成 그렇지만' },
      { type: 'rule', text: '两个连词都放在第二句句首', examples: '문장1. 그렇지만/그런데 문장2.' },
      { type: 'compare', text: '그리고 vs 그렇지만', examples: '공부해요. 그리고 드라마도 봐요.（补充）/ 공부해요. 그렇지만 어려워요.（转折）' },
      { type: 'usage', text: '顺接与逆接区分', examples: '前后有对比 → 그렇지만/그런데；信息补充 → 그리고' },
      { type: 'example', text: '재미있어요. 그렇지만 어려워요. / 그런데 이 단어는 무슨 뜻이에요?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어는', role: 'subject' },
          { text: '재미있어요.', role: 'verb' },
          { text: '그렇지만', role: 'plain' },
          { text: '어려워요', role: 'verb' },
        ],
        zh: '韩语有意思，但是难。',
        swapWords: ['그런데 어려워요', '그런데 발음이 빨라요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 영상은', role: 'subject' },
          { text: '재미있어요.', role: 'verb' },
          { text: '그런데', role: 'plain' },
          { text: '조금 길어요', role: 'verb' },
        ],
        zh: '这个视频有意思，不过有点长。',
        swapWords: ['그렇지만 조금 길어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그런데', role: 'plain' },
          { text: '이 단어는', role: 'subject' },
          { text: '무슨 뜻이에요', role: 'verb' },
        ],
        zh: '不过这个单词是什么意思？',
        swapWords: ['그런데 이 노래 알아요', '그런데 시간 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '음식이', role: 'subject' },
          { text: '맛있어요.', role: 'verb' },
          { text: '그런데', role: 'plain' },
          { text: '좀 매워요', role: 'verb' },
        ],
        zh: '食物很好吃，不过有点辣。',
        swapWords: ['그렇지만 좀 매워요', '그런데 좀 비싸요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习反馈', ko: '한국어는 재미있어요. 그렇지만 문법은 어려워요.', zh: '韩语有意思，但是语法难。' },
      { icon: '🎵', context: 'KPOP 评论', ko: '이 노래는 좋아요. 그런데 발음이 빨라요.', zh: '这首歌很好，不过发音很快。' },
      { icon: '💬', context: '话题转换', ko: '그런데 이 단어는 무슨 뜻이에요?', zh: '话说，这个单词是什么意思？' },
      { icon: '🏃', context: '两者互换', ko: '선수들이 다 피곤해요. 그렇지만 열심히 훈련해요.', zh: '运动员们都很累，但是努力训练。' },
      { icon: '🍽️', context: '餐厅', ko: '이 식당은 맛있어요. 그런데 좀 비싸요.', zh: '这家餐厅很好吃，不过有点贵。' },
      { icon: '🌧️', context: '天气变化', ko: '오늘은 날씨가 좋아요. 그렇지만 내일은 비가 와요.', zh: '今天天气好，但是明天会下雨。' },
    ],
    mistakes: [
      { wrong: '顺接用了 그렇지만', correct: '공부해요. 그리고 드라마도 봐요.', note: '补充信息用 그리고，前后有对比才用 그렇지만/그런데。' },
      { wrong: '把 그런데 只理解成强转折', correct: '그런데 무슨 뜻이에요?（话题推进）', note: '그런데 在口语中很常见，不一定是强转折，也可以只是话题推进。' },
      { wrong: '用 그렇지만 推进话题', correct: '그런데 이거 알아요?（话题推进）', note: '话题推进/引入新信息只能用 그런데，그렇지만 只有转折功能。' },
      { wrong: '그리고 位置用了 그런데', correct: '공부해요. 그리고 운동도 해요.', note: '补充并列信息用 그리고，不是 그런데。' },
    ],
        compareHtml: `<div class="card-title">"但是"vs"不过"</div>
<div class="card-body">그렇지만 是明确转折"但是"；그런데 语气更口语，可以是轻转折"不过"，也可以用来推进话题或引入新信息。P2已经学过 그렇지만，这课重点是新增 그런데。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">그렇지만（但是）</div><div style="font-size:16px;color:#89756e;margin-top:2px">明确转折，正式</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">바빠요. 그렇지만 할게요.</span><span style="font-size:16px;color:#5a4640">很忙。但是我会做。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">어려워요. 그렇지만 재미있어요.</span><span style="font-size:16px;color:#5a4640">很难。但是很有趣。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">그런데（不过/话说）</div><div style="font-size:16px;color:#89756e;margin-top:2px">轻转折/引入新话题</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">공부했어요. 그런데 잘 모르겠어요.</span><span style="font-size:16px;color:#5a4640">学了。不过还是不太懂。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">그런데 내일 뭐 할 거예요?</span><span style="font-size:16px;color:#5a4640">话说，明天打算做什么？</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">中文对应关系</div><div style="font-size:16px;color:#5a4640">中文"但是"和"不过"的区别——但是更正式，不过更口语。韩语同理，그렇지만≈"但是"（正式/书面），그런데≈"不过"（口语/自然）。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">额外区别：그런데 还能引出新话题，类似中文"话说……"——这是 그렇지만 做不到的。</div></div>
<div class="reminder-box">그렇지만 = 但是（转折）<br>그런데 = 不过（轻转折）或"话说……"（引入新话题）。两个不要混用。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">그렇지만 · 그런데</h1>
<p style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">转折连接词，放第二句句首，语气强弱不同。</p>
<div class="block">
  <div style="font-size:16px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">한국어는 재미있어요. 그렇지만 어려워요.</div>
    <div class="zh">韩语很有意思，但是难。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">이 노래는 좋아요. 그런데 발음이 빨라요.</div>
    <div class="zh">这首歌很好，不过发音很快。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:16px">그런데 이 단어는 무슨 뜻이에요?</div>
    <div class="zh">话说，这个单词是什么意思？（话题推进）</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心区别</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#ff7fa8;font-size:16px">그렇지만</span>
      <span style="font-size:16px;color:#241917">明确转折"但是"（只能转折）</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#2db89b;font-size:16px">그런데</span>
      <span style="font-size:16px;color:#241917">轻转折"不过" + 可转换话题（口语更常用）</span>
    </div>
  </div>
</div>
<div class="reminder-box">그런데 比 그렇지만 用途更广——轻转折、话题推进都能用，口语里出现频率远高于 그렇지만。</div>`,
    
    compareLabel: '그리고 / 그렇지만 / 그런데',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第7课</span>
  <div class="ov-title">그렇지만 · 그런데</div>
  <div class="ov-sub">转折连接词，放在第二句句首</div>
  <div class="ov-sec">
    <h3>用法对比</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">그렇지만</b>：明确转折"但是" — 좋아요. 그렇지만 어려워요.<br>
      <b style="color:#2db89b">그런데</b>：轻转折/话题推进 — 재미있어요. 그런데 발음이 빨라요.<br>
      <b style="color:#6b7ff0">그리고</b>（已学）：顺接补充"而且"
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      顺接误用转折 → <span style="color:#ff7fa8">그리고</span>（补充）vs <span style="color:#2db89b">그런데</span>（转折）<br>
      그런데 不只是强转折，口语里也常用于转话题
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l08',
    partNumber: 3,
    lessonNumber: 7,
    title: '그래서, 그러니까',
    whatItDoes: '说"所以/因此"，连接原因结果',
    whatItDoesBody: '그래서 连接原因和自然结果；\n그러니까 也表示所以/因此，口语中常带总结、提醒或劝告的语气。\n两个都对应中文"所以"，区别在 그러니까 更像"所以说……"，语气更强调。',
    structureNote: '两个连词都放第二句句首，原因在前，结果在后，顺序不能反。\n区别：\n그래서 陈述自然结果，그러니까 常接建议或提醒（所以你该……）。',
    rulesNote: '原因-结果顺序固定，不能倒装（비가 와요. 그래서 집에 있어요. ✓）。\n그래서 和 그러니까 不用于转折转折用 그런데/그렇지만。\n两词区别：\n그래서=自然结果，그러니까=带劝告语气的总结。',
    scenarioNote: '日常生活中因为……所以……无处不在"因为下雨所以在家""因为太忙所以不能去"。\n掌握 그래서，你能解释原因、表达关联，让对话更有逻辑感。',
    structures: [
      {
        ko: '비가 와요. 그래서 집에 있어요',
        zh: '下雨。所以在家。',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '와요.', role: 'verb' },
          { text: '그래서', role: 'plain' },
          { text: '집에', role: 'place' },
          { text: '있어요', role: 'verb' },
        ],
      },
      {
        ko: '이 문법은 중요해요. 그러니까 복습하세요',
        zh: '这个语法很重要。所以请复习。',
        tokens: [
          { text: '이 문법은', role: 'subject' },
          { text: '중요해요.', role: 'verb' },
          { text: '그러니까', role: 'plain' },
          { text: '복습하세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '그래서 — 原因 + 그래서 + 自然结果', examples: '비가 와요. 그래서 집에 있어요.' },
      { type: 'rule', text: '그러니까 — 原因 + 그러니까 + 结果/建议（带提醒语气）', examples: '지금 길이 막힙니다. 그러니까 빨리 가세요.' },
      { type: 'example', text: '그러니까 推断：내일 주말이에요. 그러니까 사람이 많을 거예요.' },
      { type: 'note', text: '原因-结果顺序固定：原因在前，그래서/그러니까 + 结果', examples: '집에 있어요. 그래서 비가 와요. ✗ / 비가 와요. 그래서 집에 있어요. ✓' },
      { type: 'compare', text: '그래서/그러니까 vs 그런데', examples: '그래서（所以，原因结果）/ 그런데（不过，转折）' },
      { type: 'compare', text: '그래서 vs 그러니까', examples: '그래서（自然结果）/ 그러니까（带提醒/劝告语气，口语更强调）' },
      { type: 'usage', text: '高频模式：原因 + 그래서/그러니까 + 行动/建议', examples: '배가 고파요. 그래서 밥을 먹어요. / 피곤해요. 그러니까 좀 쉬세요.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘은', role: 'time' },
          { text: '바빠요.', role: 'verb' },
          { text: '그래서', role: 'plain' },
          { text: '공부 못 해요', role: 'verb' },
        ],
        zh: '今天很忙。所以不能学习。',
        swapWords: ['그래서 카페에 안 가요', '그래서 집에 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래는', role: 'subject' },
          { text: '발음이 빨라요.', role: 'verb' },
          { text: '그래서', role: 'plain' },
          { text: '따라 하기 어려워요', role: 'verb' },
        ],
        zh: '这首歌发音快。所以跟读难。',
        swapWords: ['그래서 외우기 어려워요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문법은', role: 'subject' },
          { text: '중요해요.', role: 'verb' },
          { text: '그러니까', role: 'plain' },
          { text: '꼭 복습하세요', role: 'verb' },
        ],
        zh: '这个语法很重要。所以一定要复习。',
        swapWords: ['그러니까 같이 공부해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '배가', role: 'subject' },
          { text: '고파요.', role: 'verb' },
          { text: '그래서', role: 'plain' },
          { text: '밥을 먹어요', role: 'verb' },
        ],
        zh: '肚子饿。所以吃饭。',
        swapWords: ['그래서 카페에 가요', '그러니까 빨리 가세요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🌧️', context: '天气原因', ko: '비가 와요. 그래서 집에 있어요.', zh: '下雨。所以在家。' },
      { icon: '📚', context: '学习反馈', ko: '이 문법은 어려워요. 그래서 다시 복습해요.', zh: '这个语法难。所以重新复习。' },
      { icon: '🚗', context: '交通推断', ko: '지금 길이 막힙니다. 그러니까 빨리 가세요.', zh: '现在堵车。所以快走吧。' },
      { icon: '📅', context: '周末推断', ko: '내일 주말이에요. 그러니까 사람이 많을 거예요.', zh: '明天是周末。所以人会很多。' },
      { icon: '😴', context: '疲倦原因', ko: '어제 많이 걸었어요. 그래서 오늘 다리가 아파요.', zh: '昨天走了很多路，所以今天腿疼。' },
      { icon: '🏥', context: '医院就诊', ko: '열이 나요. 그러니까 오늘은 쉬세요.', zh: '发烧了，所以今天休息吧。' },
    ],
    mistakes: [
      { wrong: '집에 있어요. 그래서 비가 와요.（原因结果反了）', correct: '비가 와요. 그래서 집에 있어요.', note: '原因在前，그래서 结果在后，顺序不能反。' },
      { wrong: '그래서와 그런데 混用', correct: '그래서（所以，原因结果）/ 그런데（不过，转折）', note: '两个词意思完全不同，原因结果用 그래서/그러니까。' },
      { wrong: '그래서 前后顺序弄反', correct: '피곤해요. 그래서 쉬어요.', note: '그래서 前是原因，后是结果，顺序不能换。' },
      { wrong: '그런데 位置用了 그래서', correct: '이 노래는 좋아요. 그런데 발음이 빨라요.', note: '转折用 그런데，그래서 只用于原因-结果关系。' },
    ],
        compareHtml: `<div class="card-title">"所以"vs"所以说"</div>
<div class="card-body">그래서 连接原因和自然结果；그러니까 也表示"所以/因此"，口语中常带总结、提醒或劝告的语气。两个都对应中文"所以"，区别在 그러니까 更像"所以说……"，语气更强调。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">그래서（所以→结果）</div><div style="font-size:16px;color:#89756e;margin-top:2px">原因→自然结果</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 왔어요. 그래서 집에 있었어요.</span><span style="font-size:16px;color:#5a4640">下雨了。所以在家待着。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">바빠요. 그래서 늦었어요.</span><span style="font-size:16px;color:#5a4640">很忙。所以迟到了。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">그러니까（所以说→总结）</div><div style="font-size:16px;color:#89756e;margin-top:2px">总结/提醒/劝告</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">시간이 없어요. 그러니까 빨리 가요.</span><span style="font-size:16px;color:#5a4640">没时间了。所以说快走吧。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">어려워요. 그러니까 연습해야 해요.</span><span style="font-size:16px;color:#5a4640">很难。所以说要多练习。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">两个"所以"的微妙区别</div><div style="font-size:16px;color:#5a4640">中文"所以"两个字涵盖所有情况，韩语分两种语气。그래서 单纯叙述因果关系（因→果），그러니까 带有"我刚才说了什么来着"的总结感。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">记住这个测试：如果能在"所以"前面加"所以说"，就用 그러니까；如果只是陈述结果，就用 그래서。</div></div>
<div class="reminder-box">그래서 = 所以（因果关系连接）<br>그러니까 = 所以说（总结/劝告/提醒）<br>代入中文"所以说"测试一下就知道该用哪个。</div>`,
    linkedGrammarIds: [],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">그래서 · 그러니까</h1>
<p style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">连接原因和结果，表达"所以/因此"。</p>
<div class="block">
  <div style="font-size:16px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">비가 와요. 그래서 집에 있어요.</div>
    <div class="zh">下雨。所以在家。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">이 문법은 중요해요. 그러니까 복습하세요.</div>
    <div class="zh">这个语法很重要。所以请复习。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:16px">배가 고파요. 그래서 밥을 먹어요.</div>
    <div class="zh">肚子饿。所以吃饭。</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心区别</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#ff7fa8;font-size:16px">그래서</span>
      <span style="font-size:16px;color:#241917">所以（陈述自然结果）</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span style="font-weight:800;color:#2db89b;font-size:16px">그러니까</span>
      <span style="font-size:16px;color:#241917">所以（带总结/劝告语气，口语强调感更强）</span>
    </div>
  </div>
</div>
<div class="reminder-box">原因一定在前，그래서/그러니까 + 结果在后，顺序不能反。转折用 그런데，不要混用。</div>`,
    
    compareLabel: '그래서 vs 그런데',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第8课</span>
  <div class="ov-title">그래서 · 그러니까</div>
  <div class="ov-sub">连接原因和结果，"所以/因此"</div>
  <div class="ov-sec">
    <h3>用法</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">그래서</b>：原因 → 自然结果<br>
      비가 와요. <b style="color:#ff7fa8">그래서</b> 집에 있어요.<br>
      <b style="color:#2db89b">그러니까</b>：原因 → 总结/劝告<br>
      중요해요. <b style="color:#2db89b">그러니까</b> 복습하세요.
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      原因结果顺序反了 → 先写原因，<span style="color:#ff7fa8">그래서</span> 再写结果<br>
      <span style="color:#e05555;text-decoration:line-through">그래서</span> 当转折用 → 转折用 <span style="color:#2db89b">그런데</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l09',
    partNumber: 3,
    lessonNumber: 8,
    title: '-(으)러 가다/오다, -을/ㄹ까요?',
    whatItDoes: '说"去做某事"，以及提议询问',
    whatItDoesBody: '-(으)러 가다/오다 表达"去/来做某事"的目的；\n-을/ㄹ까요? 用于提议或询问意见，表示"要不要……？"。\n中文"去吃饭"直接说，韩语需要目的助词 -(으)러 连接动词和去/来。',
    structureNote: '两块内容：①-(으)러 가다/오다（去做某事）目的动词加 러/으러，后接 가요/와요；\n②-을/ㄹ까요?（提议/询问）接在动词词干后，看有无收音选 을/ㄹ。',
    rulesNote: '-(으)러 的收音规则：\n有收音接 으러（먹으러），无收音接 러（보러）。\n注意区分 -(으)러 가요（去做）和 -고 가요（做了再走）前者是目的，后者是顺序。\n-을/ㄹ까요 形容词也能用（좋을까요？）。',
    scenarioNote: '뭐 먹으러 갈까요？这一句几乎是韩国人约饭时的标准开场白。\n-(으)러 가다 和 -을/ㄹ까요 配合使用，就能邀约、提议、表达目的，日常对话里会一直用到。',
    structures: [
      {
        ko: '카페에 공부하러 가요',
        zh: '去咖啡店学习。',
        tokens: [
          { text: '카페에', role: 'place' },
          { text: '공부하러', role: 'verb' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '밥 먹으러 갈까요?',
        zh: '要去吃饭吗？',
        tokens: [
          { text: '밥', role: 'object' },
          { text: '먹으러', role: 'verb' },
          { text: '갈까요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音动词 + 러 가다/오다', examples: '보다→보러 가요, 마시다→마시러 가요, 공부하다→공부하러 가요' },
      { type: 'rule', text: '有收音动词 + 으러 가다/오다', examples: '먹다→먹으러 가요, 읽다→읽으러 가요, 찾다→찾으러 가요' },
      { type: 'rule', text: '无收音动词 + ㄹ까요?', examples: '가다→갈까요?, 보다→볼까요?, 마시다→마실까요?' },
      { type: 'rule', text: '有收音动词 + 을까요?', examples: '먹다→먹을까요?, 읽다→읽을까요?' },
      { type: 'note', text: '-을/ㄹ까요? 形容词/名词也能接', examples: '얼마일까요?（多少钱呢？）, 좋을까요?（好吗？）' },
      { type: 'compare', text: '-(으)러 가요 vs -고 가요', examples: '먹으러 가요（去吃）/ 먹고 가요（吃了再走）— 目的 vs 先后顺序' },
      { type: 'usage', text: '日常高频模式', examples: '뭐 먹으러 갈까요? / 카페에 공부하러 가요. / 같이 볼까요?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '카페에', role: 'place' },
          { text: '공부하러', role: 'verb' },
          { text: '가요', role: 'verb' },
        ],
        zh: '去咖啡店学习。',
        swapWords: ['먹으러 가요', '보러 가요', '마시러 가요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '콘서트를', role: 'object' },
          { text: '보러', role: 'verb' },
          { text: '가요', role: 'verb' },
        ],
        zh: '去看演唱会。',
        swapWords: ['먹으러 가요', '공부하러 가요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '같이', role: 'plain' },
          { text: '갈까요', role: 'verb' },
        ],
        zh: '要一起去吗？',
        swapWords: ['먹을까요', '볼까요', '할까요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '도서관에', role: 'place' },
          { text: '책을', role: 'object' },
          { text: '빌리러 가요', role: 'verb' },
        ],
        zh: '去图书馆借书。',
        swapWords: ['공부하러 가요', '반납하러 가요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☕', context: '去咖啡店', ko: '카페에 공부하러 가요.', zh: '去咖啡店学习。' },
      { icon: '🍜', context: '约饭', ko: '밥 먹으러 갈까요?', zh: '要去吃饭吗？' },
      { icon: '🎤', context: 'KPOP', ko: '콘서트를 보러 가요.', zh: '去看演唱会。' },
      { icon: '📺', context: '提议', ko: '이 영상을 볼까요?', zh: '要看这个视频吗？' },
      { icon: '🏪', context: '便利店', ko: '편의점에 뭔가 사러 가요.', zh: '去便利店买东西。' },
      { icon: '🏋️', context: '健身房', ko: '운동하러 헬스장에 갈까요?', zh: '要去健身房运动吗？' },
    ],
    mistakes: [
      { wrong: '먹러 가요（有收音忘加 으）', correct: '먹으러 가요', note: '有收音用 으러，먹다 → 먹으러 가요。' },
      { wrong: '먹으러 가요 vs 먹고 가요 混用', correct: '먹으러 가요（去吃）/ 먹고 가요（吃了再走）', note: '-(으)러 是目的，-고 是先后顺序，意思不同。' },
      { wrong: '먹ㄹ까요', correct: '먹을까요', note: '有收音 + 을까요，먹다 → 먹을까요。' },
      { wrong: '가러 가요', correct: '가러 가요 ✗ → 가려고 가요 or 그냥 가요', note: '가다 + 러 가다 很奇怪，目的动词和移动动词相同时换用其他表达。' },
    ],
        compareHtml: `<div class="card-title">"去做某事"vs"要不要……？"</div>
<div class="card-body">-(으)러 가다/오다 表达"去/来做某事"的目的；-을/ㄹ까요? 用于提议或询问意见，表示"要不要……？"。中文"去吃饭"直接说，韩语需要目的助词 -(으)러 连接动词和去/来。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-(으)러 가다（去做……）</div><div style="font-size:16px;color:#89756e;margin-top:2px">目的连接+去/来</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">밥 먹으러 가요.</span><span style="font-size:16px;color:#5a4640">去吃饭。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">노래 들으러 왔어요.</span><span style="font-size:16px;color:#5a4640">来听歌。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">-을/ㄹ까요?（要不要？）</div><div style="font-size:16px;color:#89756e;margin-top:2px">提议/询问意见</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">같이 먹을까요?</span><span style="font-size:16px;color:#5a4640">一起吃吗？</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">뭐 마실까요?</span><span style="font-size:16px;color:#5a4640">喝点什么呢？</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">中文和韩语的结构差异</div><div style="font-size:16px;color:#5a4640">中文"去吃饭"——"去"和"吃"直接连用。韩语必须在中间插入 -(으)러：먹<u>으러</u> 가다。这个 -(으)러 告诉听者"去做某事"的目的是什么。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">-을/ㄹ까요? 类似中文"要不要……？"或"……怎么样？"，但中文用疑问句加上商量语气，韩语用专门词尾。</div></div>
<div class="reminder-box">-(으)러 表目的+去/来：말하다 → 말하러 가요（去说话）<br>注意：-(으)러 只能搭配 가다/오다/다니다，不能搭配其他动词。</div>`,
    linkedGrammarIds: ['g25', 'g14'],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-(으)러 가요 · -을/ㄹ까요?</h1>
<p style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">表达去做某事的目的，以及提议。</p>
<div class="block">
  <div style="font-size:16px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">카페에 공부하러 가요.</div>
    <div class="zh">去咖啡店学习。（目的）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">밥 먹으러 갈까요?</div>
    <div class="zh">要去吃饭吗？（目的+提议）</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:16px">콘서트를 보러 가요.</div>
    <div class="zh">去看演唱会。</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心结构</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">无收音</span>
      <span style="font-weight:800;color:#ff7fa8">+ 러 가요</span>
      <span style="font-size:16px;color:#89756e">보다→보러 가요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">有收音</span>
      <span style="font-weight:800;color:#2db89b">+ 으러 가요</span>
      <span style="font-size:16px;color:#89756e">먹다→먹으러 가요</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">提议</span>
      <span style="font-weight:800;color:#6b7ff0">-을/ㄹ까요?</span>
      <span style="font-size:16px;color:#89756e">갈까요? / 먹을까요?</span>
    </div>
  </div>
</div>
<div class="reminder-box">먹으러 가요（去吃）≠ 먹고 가요（吃了再走）。-(으)러 是目的，-고 是先后顺序，两者不能混用。</div>`,
    
    compareLabel: '-(으)러 가요 vs -고 가요',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第9课</span>
  <div class="ov-title">-(으)러 가요 · -을/ㄹ까요?</div>
  <div class="ov-sub">目的 + 提议，去做某事或邀约</div>
  <div class="ov-sec">
    <h3>-(으)러 가다/오다</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      받침 없는 → <b style="color:#ff7fa8">러</b>：공부하러 가요 · 보러 가요<br>
      받침 있는 → <b style="color:#2db89b">으러</b>：먹으러 가요 · 읽으러 가요
    </div>
  </div>
  <div class="ov-sec">
    <h3>-을/ㄹ까요?</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      받침 없는 → <b style="color:#6b7ff0">ㄹ까요</b>：갈까요? · 볼까요?<br>
      받침 있는 → <b style="color:#6b7ff0">을까요</b>：먹을까요? · 읽을까요?
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">먹러 가요</span> → <span style="color:#ff7fa8">먹으러 가요</span>（받침 있는 加 으）<br>
      먹으러 가요（去吃）≠ 먹<span style="color:#2db89b">고</span> 가요（吃了再走）
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l10',
    partNumber: 3,
    lessonNumber: 9,
    title: '-은/ㄴ 후에, -기 전에',
    whatItDoes: '说"做完之后"和"做之前"',
    whatItDoesBody: '-은/ㄴ 후에 表达"做完……之后"；\n-기 전에 表达"做……之前"。\n两者合用可以清晰表达时间顺序，适合写学习计划、日程和日记。\n注意：\n-기 전에 不管有没有收音都直接加 기，比 -은/ㄴ 후에 更简单。\n中文"之后/之前"直接放动词后面，韩语需要正确的词尾变形，尤其 -은/ㄴ 후에 的收音判断是中文没有的难点。',
    structureNote: '两个时间表达结构不同：\n-은/ㄴ 후에 接在动词变形后（要看收音），-기 전에 直接接词干+기，不需要考虑收音。\n先记住这个差异，变形就不会混乱。',
    rulesNote: '후에 接续：\n有收音→은 후에（먹은 후에），无收音→ㄴ 후에（본 후에）。\n전에 接续：\n一律 -기 전에，不看收音。\n易错：\n먹은 전에 ✗，必须说 먹기 전에。',
    scenarioNote: '日记、学习计划、日常习惯"吃饭后学习""睡觉前复习""听歌前看歌词"，这类时间顺序表达每天都用得到。\n掌握这节课，你的韩语日记能立刻写得更自然。',
    structures: [
      {
        ko: '밥을 먹은 후에 공부해요',
        zh: '吃饭后学习。',
        tokens: [
          { text: '밥을', role: 'object' },
          { text: '먹은 후에', role: 'time' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '자기 전에 복습해요',
        zh: '睡觉前复习。',
        tokens: [
          { text: '자기 전에', role: 'time' },
          { text: '복습해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音动词 + -은 후에', examples: '먹다→먹은 후에, 읽다→읽은 후에' },
      { type: 'rule', text: '无收音动词 + -ㄴ 후에', examples: '보다→본 후에, 공부하다→공부한 후에' },
      { type: 'rule', text: '动词词干 + -기 전에（不看收音）', examples: '먹다→먹기 전에, 보다→보기 전에, 자다→자기 전에' },
      { type: 'usage', text: '名词 + 후에/다음에', examples: '수업 후에, 점심 다음에；动词 + -ㄴ/은 다음에：수업이 끝난 다음에' },
      { type: 'example', text: '자기 전에 우유 한 잔을 마셔요 / 공부하기 전에 커피를 마셔요' },
      { type: 'note', text: '-기 전에 前不能用 -은/ㄴ 形式', examples: '먹은 전에 ✗ → 먹기 전에 ✓' },
      { type: 'compare', text: '-은/ㄴ 후에 vs -기 전에 接续区别', examples: '먹은 후에（之后，看收音）/ 먹기 전에（之前，不看收音，直接加 기）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '드라마를', role: 'object' },
          { text: '본 후에', role: 'time' },
          { text: '자요', role: 'verb' },
        ],
        zh: '看完电视剧后睡觉。',
        swapWords: ['공부한 후에 자요', '먹은 후에 공부해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '듣기 전에', role: 'time' },
          { text: '가사를 봐요', role: 'verb' },
        ],
        zh: '听歌前看歌词。',
        swapWords: ['자기 전에 복습해요', '먹기 전에 손을 씻어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '수업', role: 'object' },
          { text: '후에', role: 'time' },
          { text: '카페에 가요', role: 'verb' },
        ],
        zh: '课后去咖啡店。',
        swapWords: ['수업 다음에 공부해요', '점심 후에 산책해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '손을', role: 'object' },
          { text: '씻은 후에', role: 'time' },
          { text: '밥을 먹어요', role: 'verb' },
        ],
        zh: '洗手后吃饭。',
        swapWords: ['공부한 후에 쉬어요', '먹은 후에 산책해요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📖', context: '学习计划', ko: '수업 후에 복습해요.', zh: '课后复习。' },
      { icon: '🥛', context: '睡前习惯', ko: '자기 전에 우유 한 잔을 마셔요.', zh: '睡前喝一杯牛奶。' },
      { icon: '🎵', context: 'KPOP 学习', ko: '노래를 듣기 전에 가사를 봐요.', zh: '听歌前看歌词。' },
      { icon: '🍱', context: '日程顺序', ko: '수업이 끝난 다음에 같이 밥을 먹어요.', zh: '课结束后一起吃饭。' },
      { icon: '🛁', context: '日常习惯', ko: '샤워한 후에 보통 드라마를 봐요.', zh: '洗完澡后通常看电视剧。' },
      { icon: '🍱', context: '吃饭前后', ko: '밥을 먹기 전에 손을 씻어요.', zh: '吃饭前洗手。' },
    ],
    mistakes: [
      { wrong: '먹은 전에（후에 和 전에 接续混用）', correct: '먹기 전에', note: '전에 前用 -기 名词化，不用 -은/ㄴ。먹은 후에（之后）/ 먹기 전에（之前）。' },
      { wrong: '보은 후에（无收音接错）', correct: '본 후에', note: '보다 无收音，接 -ㄴ 후에 → 본 후에，不是 보은 후에。' },
      { wrong: '前后时间顺序写反', correct: '먹은 후에 공부해요（先吃，后学）', note: '-은/ㄴ 후에 前面的动作先发生，后面的动作后发生，不要写反。' },
      { wrong: '자은 후에', correct: '잔 후에', note: '자다 无收音 → ㄴ 후에 → 잔 후에。无收音动词接 -ㄴ 후에。' },
    ],
        compareHtml: `<div class="card-title">"做完……之后"vs"做……之前"</div>
<div class="card-body">-은/ㄴ 후에 表达"做完……之后"；-기 전에 表达"做……之前"。两者合用可以清晰表达时间顺序，适合写学习计划、日程和日记。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">-은/ㄴ 후에（……之后）</div><div style="font-size:16px;color:#89756e;margin-top:2px">做完A之后做B</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">밥 먹은 후에 커피 마셔요.</span><span style="font-size:16px;color:#5a4640">吃完饭之后喝咖啡。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">수업 끝난 후에 갈게요.</span><span style="font-size:16px;color:#5a4640">下课后去。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">-기 전에（……之前）</div><div style="font-size:16px;color:#89756e;margin-top:2px">在做A之前先做B</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">자기 전에 일기 써요.</span><span style="font-size:16px;color:#5a4640">睡觉前写日记。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">가기 전에 전화해 주세요.</span><span style="font-size:16px;color:#5a4640">去之前请打电话。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">接续规则对比</div><div style="font-size:16px;color:#5a4640">-은/ㄴ 후에 需要判断词干有无收音（먹다→먹은 후에，가다→간 후에），-기 전에 则固定加 기，不管什么动词都用同一形式。前者麻烦但表达更精确，后者简单但使用范围更广。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">中文"之后/之前"直接放动词后面，韩语需要正确的词尾变形——尤其是 -은/ㄴ 후에 的收音判断。</div></div>
<div class="reminder-box">-기 전에 没有变形烦恼：不管什么动词，都加 기 就行。<br>-은/ㄴ 후에 需判断收音：먹다→먹<span style="color:#ff7fa8">은</span> 후에，가다→가<span style="color:#2db89b">ㄴ</span> 후에。</div>`,
    linkedGrammarIds: ['g43', 'g42'],
    step0Html: `<h1 style="font-size:25px;font-weight:800;line-height:1.3;margin-bottom:8px;color:#241917">-은/ㄴ 후에 · -기 전에</h1>
<p style="font-size:16px;color:#89756e;margin-bottom:16px;line-height:1.6">表达时间顺序：做完之后，以及做之前。</p>
<div class="block">
  <div style="font-size:16px;font-weight:800;color:#ff7fa8;margin-bottom:10px">学完这节课，你能说：</div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">밥을 먹은 후에 공부해요.</div>
    <div class="zh">吃饭后学习。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px;margin-bottom:8px">
    <div class="ko" style="font-size:16px">자기 전에 단어를 외워요.</div>
    <div class="zh">睡前背单词。</div>
  </div>
  <div style="background:#fff8fb;border-radius:10px;padding:10px 12px">
    <div class="ko" style="font-size:16px">노래를 듣기 전에 가사를 봐요.</div>
    <div class="zh">听歌前看歌词。</div>
  </div>
</div>
<div class="block">
  <div class="h2">核心结构</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-top:6px">
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">有收音</span>
      <span style="font-weight:800;color:#ff7fa8">+ -은 후에</span>
      <span style="font-size:16px;color:#89756e">먹다→먹은 후에</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">无收音</span>
      <span style="font-weight:800;color:#2db89b">+ -ㄴ 후에</span>
      <span style="font-size:16px;color:#89756e">보다→본 후에，자다→잔 후에</span>
    </div>
    <div style="display:flex;align-items:center;gap:8px;flex-wrap:wrap">
      <span class="chip s" style="font-size:16px">不看收音</span>
      <span style="font-weight:800;color:#6b7ff0">+ -기 전에</span>
      <span style="font-size:16px;color:#89756e">먹기 전에，자기 전에</span>
    </div>
  </div>
</div>
<div class="reminder-box">-기 전에 不管有没有收音，都直接接词干+기，比 -은/ㄴ 후에 简单得多，不会出错。</div>`,
    
    compareLabel: '-은/ㄴ 후에 vs -기 전에',
    quickTable: {
      title: '후에 / 전에 변형 速记',
      headers: ['原形', '-은/ㄴ 후에', '-기 전에'],
      rows: [
        ['먹다 吃', '먹은 후에', '먹기 전에'],
        ['보다 看', '본 후에', '보기 전에'],
        ['자다 睡', '잔 후에', '자기 전에'],
        ['공부하다 学习', '공부한 후에', '공부하기 전에'],
        ['듣다 听', '들은 후에', '듣기 전에'],
      ],
    },
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第10课</span>
  <div class="ov-title">-은/ㄴ 후에 · -기 전에</div>
  <div class="ov-sub">之后用 -은/ㄴ 후에，之前用 -기 전에</div>
  <div class="ov-sec">
    <h3>变化规则</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      받침 있는 → <b style="color:#ff7fa8">은 후에</b>：먹은 후에 · 읽은 후에<br>
      받침 없는 → <b style="color:#2db89b">ㄴ 후에</b>：본 후에 · 공부한 후에<br>
      全部 → <b style="color:#6b7ff0">기 전에</b>：먹기 전에 · 자기 전에
    </div>
  </div>
  <div class="ov-sec">
    <h3>常用表达</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      수업 <b style="color:#ff7fa8">후에</b> 복습해요（课后复习）<br>
      자<b style="color:#6b7ff0">기 전에</b> 단어를 외워요（睡前背单词）<br>
      노래를 듣<b style="color:#6b7ff0">기 전에</b> 가사를 봐요
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">먹은 전에</span> → <span style="color:#6b7ff0">먹기 전에</span><br>
      <span style="color:#e05555;text-decoration:line-through">보은 후에</span> → <span style="color:#ff7fa8">본 후에</span>（받침 없는 用 ㄴ）
    </div>
  </div>
</div>`,
  },
];
