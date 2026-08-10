import type { GrammarCard } from '@/types';

export const grammarCardsP3: GrammarCard[] = [
  {
    id: 'card-p3-l01',
    partNumber: 3,
    lessonNumber: 1,
    title: '-고 있다, -고 있었다',
    whatItDoes: '说正在做、之前一直在做', whatItDoesEn: 'Saying what\'s happening now and what was happening before',
    whatItDoesBody: '-고 있어요 把动作拉成正在进行的状态；\n-고 있었어요 表达过去某个时候正在做。\n和中文"正在……"类似，但韩语还能用于"穿着/戴着/拿着"这类持续状态。', whatItDoesBodyEn: '-고 있어요 stretches an action into an ongoing state; -고 있었어요 expresses something that was ongoing at a past time. Similar to "currently doing..." in Chinese, but Korean also uses it for continuous states like "wearing/holding/carrying."',
    structureNote: '这节课只有一个核心结构：\n动词词干 + -고 있어요。\n现在进行用 있어요，过去进行用 있었어요。\n注意这个结构只接动词，不接形容词。', structureNoteEn: 'This lesson has one core structure: verb stem + -고 있어요. Use 있어요 for present progressive and 있었어요 for past progressive. Note this structure only attaches to verbs, not adjectives.',
    rulesNote: '-고 接续时不触发不规则变化（듣다→듣고 있어요，不变形）。\n特殊用法：\n입다/쓰다/들다 等穿戴动词 + -고 있어요 表示"穿着/戴着/拿着"的持续状态，不是进行中的动作。', rulesNoteEn: '-고 does not trigger irregular conjugations (듣다→듣고 있어요, no change). Special usage: wearing verbs like 입다/쓰다/들다 + -고 있어요 indicates a continuous state of "wearing/holding/carrying," not an action in progress.',
    scenarioNote: '-고 있어요 是 SNS 和聊天里最自然的表达"在听歌""在看剧""在等人"。\n穿戴用法（입고 있어요/쓰고 있어요）在描述人物外貌时也非常常用。', scenarioNoteEn: '-고 있어요 is the most natural way on SNS and in chats to say "listening to music," "watching a show," or "waiting for someone." The wearing usage (입고 있어요/쓰고 있어요) is also very common when describing someone\'s appearance.',
    structures: [
      {
        ko: '지금 한국어를 공부하고 있어요',
        zh: '现在正在学习韩语。', zhEn: 'I\'m studying Korean right now.',
        tokens: [
          { text: '지금', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부하고 있어요', role: 'verb' },
        ],
      },
      {
        ko: '어제 드라마를 보고 있었어요',
        zh: '昨天正在看电视剧。', zhEn: 'I was watching a drama yesterday.',
        tokens: [
          { text: '어제', role: 'time' },
          { text: '드라마를', role: 'object' },
          { text: '보고 있었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -고 있어요 — 正在做', textEn: 'Verb stem + -고 있어요 — currently doing', examples: '공부하다→공부하고 있어요, 먹다→먹고 있어요, 보다→보고 있어요' },
      { type: 'rule', text: '动词词干 + -고 있었어요 — 过去某时正在做', textEn: 'Verb stem + -고 있었어요 — was doing at some point in the past', examples: '어제 드라마를 보고 있었어요, 친구를 기다리고 있었어요（昨天在看电视剧、在等朋友。）', examplesEn: '어제 드라마를 보고 있었어요, 친구를 기다리고 있었어요 (I was watching a drama and waiting for a friend yesterday.)' },
      { type: 'note', text: '接 -고 时 ㄷ 不规则不发生', textEn: 'When -고 is attached, the ㄷ irregular does not occur.', examples: '듣다→듣고 있어요（✓）/ 들고 있어요（✗）' },
      { type: 'note', text: '-고 있다 只接动作动词，不接形容词', textEn: '-고 있다 only attaches to action verbs, not adjectives.', examples: '예쁘다→예뻐요（✓）/ 예쁘고 있어요（✗）' },
      { type: 'usage', text: '穿戴动词 + -고 있어요 — 穿戴持续状态', textEn: 'Wear/put-on verbs + -고 있어요 — ongoing state of wearing', examples: '입다→입고 있어요（穿着）, 쓰다→쓰고 있어요（戴着）, 들다→들고 있어요（拿着）, 신다→신고 있어요（穿着鞋）', examplesEn: '입다→입고 있어요 (wearing), 쓰다→쓰고 있어요 (wearing on head), 들다→들고 있어요 (holding), 신다→신고 있어요 (wearing shoes)' },
      { type: 'compare', text: '-아요/어요 vs -고 있어요', examples: '먹어요（平时吃/习惯）/ 먹고 있어요（现在正在吃，动作未结束）', examplesEn: '먹어요 (usually eat/habit) / 먹고 있어요 (eating right now, action not finished)' },
      { type: 'compare', text: '-고 있다（动作正在进行）vs -아/어 있다（结果状态·……着）', textEn: '-고 있다 (action in progress) vs -아/어 있다 (resultant state · ...ing/...ed)', examples: '앉고 있어요（想说"坐着"是错的）→ 앉아 있어요（坐着·状态）/ 서 있어요（站着）/ 문이 열려 있어요（门开着）。凳子上"坐着"、门"开着"这类是动作结束后的持续状态，用 -아/어 있다；-고 있다 是动作本身还在进行。', examplesEn: '앉고 있어요 (saying "sitting" this way is wrong) → 앉아 있어요 (sitting·state) / 서 있어요 (standing) / 문이 열려 있어요 (the door is open). Things like "sitting" on a chair or the door "being open" are states after the action is complete, so use -아/어 있다; -고 있다 means the action itself is still in progress.' },
      { type: 'note', text: '中文"在"的负迁移：表方位的"在"用 있다，不是 -고 있다', textEn: 'Negative transfer from Chinese "在": for location, use 있다, not -고 있다', examples: '在家 → 집에 있어요（✓）/ 집에 있고 있어요（✗）; 在学习 → 공부하고 있어요（✓）。中文"在"既表方位又表进行，韩语要分开：方位用 있다，动作进行才用 -고 있다。', examplesEn: 'At home → 집에 있어요 (✓) / 집에 있고 있어요 (✗); studying → 공부하고 있어요 (✓). In Chinese, "在" covers both location and ongoing action, but Korean distinguishes them: use 있다 for location and -고 있다 only for ongoing action.' },
      { type: 'note', text: '敬语连带：尊敬对象"正在做"用 -고 계시다（敬语在P15详解）', textEn: 'Honorific connection: for a respected subject "currently doing," use -고 계시다 (honorifics detailed in P15)', examples: '할머니께서 신문을 읽고 계세요（奶奶在看报纸）/ 선생님이 전화하고 계세요（老师在打电话）。主语是长辈或尊敬对象时 있다 换成 계시다。', examplesEn: '할머니께서 신문을 읽고 계세요 (Grandma is reading the newspaper) / 선생님이 전화하고 계세요 (The teacher is on the phone). When the subject is an elder or someone respected, change 있다 to 계시다.' },
      { type: 'example', text: '지금 한국어를 공부하고 있어요 / 친구를 기다리고 있었어요 / 모자를 쓰고 있어요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '지금', role: 'time' },
          { text: '노래를', role: 'object' },
          { text: '듣고 있어요', role: 'verb' },
        ],
        zh: '现在正在听歌。', zhEn: 'I\'m listening to music right now.',
        swapWords: ['공부하고 있어요', '먹고 있어요', '보고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어제 밤에', role: 'time' },
          { text: '드라마를', role: 'object' },
          { text: '보고 있었어요', role: 'verb' },
        ],
        zh: '昨晚正在看电视剧。', zhEn: 'I was watching a TV drama last night.',
        swapWords: ['공부하고 있었어요', '기다리고 있었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '안경을', role: 'object' },
          { text: '쓰고 있어요', role: 'verb' },
        ],
        zh: '戴着眼镜。', zhEn: 'I\'m wearing glasses.',
        swapWords: ['입고 있어요', '들고 있어요', '신고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '지금', role: 'time' },
          { text: '모자를', role: 'object' },
          { text: '쓰고 있어요', role: 'verb' },
        ],
        zh: '现在戴着帽子。', zhEn: 'I\'m wearing a hat now.',
        swapWords: ['입고 있어요', '들고 있어요', '신고 있어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习打卡', contextEn: 'Study check-in', ko: '지금 한국어를 공부하고 있어요.', zh: '现在正在学习韩语。', zhEn: 'I\'m studying Korean right now.' },
      { icon: '🎵', context: 'KPOP 跟唱', contextEn: 'KPOP Sing-Along', ko: '이 노래를 듣고 있어요.', zh: '正在听这首歌。', zhEn: 'I\'m listening to this song.' },
      { icon: '📺', context: '影音跟读', contextEn: 'Audio-Video Shadowing', ko: '드라마를 보고 있었어요.', zh: '刚才正在看电视剧。', zhEn: 'I was watching a TV drama just now.' },
      { icon: '👓', context: '穿戴持续', contextEn: 'Wearing & Continuous State', ko: '그는 안경을 쓰고 있어요. 어머니는 가방을 들고 있어요.', zh: '他戴着眼镜。妈妈拎着包。', zhEn: 'He\'s wearing glasses. Mom is carrying a bag.' },
      { icon: '🏥', context: '医院等待', contextEn: 'Waiting at the Hospital', ko: '지금 병원에서 기다리고 있어요. 의사 선생님이 곧 오실 거예요.', zh: '现在正在医院等待，医生马上会来。', zhEn: 'I\'m waiting at the hospital now; the doctor will be here soon.' },
      { icon: '🛒', context: '便利店', contextEn: 'Convenience store', ko: '편의점에서 계산하고 있어요. 잠깐만 기다려 주세요.', zh: '正在便利店结账，请稍等一下。', zhEn: 'I\'m checking out at the convenience store; please wait a moment.' },
    ],
    mistakes: [
      { wrong: '노래를 들고 있어요（想说正在听歌）', wrongEn: '노래를 들고 있어요 (meaning to say \'listening to music\')', correct: '노래를 듣고 있어요', note: '听歌用 듣다，接 -고 时 ㄷ 不规则不发生 → 듣고 있어요。注意：들다（拿/举）接 -고 있어요 是正确的，如 가방을 들고 있어요（拎着包）。', noteEn: 'For listening to music, use 듣다; when adding -고, the ㄷ irregular doesn\'t apply → 듣고 있어요. Note: 들다 (to carry/lift) with -고 있어요 is correct, e.g., 가방을 들고 있어요 (carrying a bag).' },
      { wrong: '예쁘고 있어요（想说正在漂亮）', wrongEn: '예쁘고 있어요 (meaning to say \'being pretty\')', correct: '예뻐요', note: '-고 있다 只接动作动词，形容词直接用原形。', noteEn: '-고 있다 only attaches to action verbs; adjectives use their base form directly.' },
      { wrong: '어제 책을 읽고 있어요', correct: '어제 책을 읽었어요', note: '过去某时正在进行用 읽고 있었어요，单纯过去用 -었어요。-고 있어요 描述当前进行。', noteEn: 'For an ongoing action at a past time, use 읽고 있었어요; for simple past, use -었어요. -고 있어요 describes current ongoing action.' },
      { wrong: '안경을 쓰어요', correct: '안경을 쓰고 있어요', note: '"戴着眼镜"是持续状态，用 -고 있어요。穿戴类动词（입다/쓰다/들다/신다）+ -고 있어요 既表动作也表状态。', noteEn: '\'Wearing glasses\' is a continuous state, so use -고 있어요. Verbs for wearing (입다/쓰다/들다/신다) + -고 있어요 express both the action and the state.' },
      { wrong: '의자에 앉고 있어요（想说"坐着"）', wrongEn: '의자에 앉고 있어요 (meaning to say \'sitting\')', correct: '의자에 앉아 있어요', note: '앉다/서다/눕다 这类动词，"坐着/站着/躺着"是动作结束后的结果状态，要用 -아/어 있다；-고 있어요 会变成"正在往下坐"的进行动作。这是中文母语者最常混的一对。', noteEn: 'For verbs like 앉다/서다/눕다, \'sitting/standing/lying\' is the resulting state after the action, so use -아/어 있다; -고 있어요 would mean the ongoing action of \'sitting down\'. This is the most commonly confused pair for Chinese speakers.' },
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
        specialQuiz: {
      type: 'judge',
      title: '判断对错：-고 있다 的用法', titleEn: 'True/False: Usage of -고 있다',
      body: '选出使用 -고 있다 正确的句子。', bodyEn: 'Choose the sentence that correctly uses -고 있다.',
      questions: [
        { options: ["노래를 듣고 있어요","노래를 들고 있어요"], answer: 0, explanation: '听歌用 듣다，接 -고 时 ㄷ 不规则不发生 → 듣고 있어요。들고 있어요 是"拿着"。', explanationEn: 'For listening to music, use 듣다; when adding -고, the ㄷ irregular doesn\'t apply → 듣고 있어요. 들고 있어요 means \'holding\'.' },
        { options: ["모자를 쓰고 있어요","모자를 써고 있어요"], answer: 0, explanation: '쓰다 + -고 있어요 = 쓰고 있어요（戴着帽子），词干 쓰 直接加 고。', explanationEn: '쓰다 + -고 있어요 = 쓰고 있어요 (wearing a hat); the stem 쓰 directly takes 고.' },
        { options: ["지금 예쁘고 있어요","지금 예뻐요"], answer: 1, explanation: '-고 있다 只接动作动词，形容词 예쁘다 不能用 -고 있다，直接用 예뻐요。', explanationEn: '-고 있다 only attaches to action verbs; the adjective 예쁘다 can\'t use -고 있다, so just use 예뻐요.' },
        { options: ["친구가 가방을 들고 있어요","친구가 가방을 듣고 있어요"], answer: 0, explanation: '들다+고 있어요 = 들고 있어요（拿着包），而 듣고 있어요 是"正在听"。', explanationEn: '들다 + -고 있어요 = 들고 있어요 (holding a bag), while 듣고 있어요 means \'listening\'.' },
      ],
    },

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
    lessonNumber: 2,
    title: '-았었/었었/였었-',
    whatItDoes: '说以前曾经……现在不一样了', whatItDoesEn: 'Saying what used to be... but is different now',
    whatItDoesBody: '-았었/었었/였었어요 表达过去曾经有过的经历或状态，常带有"现在可能已经不同了"的感觉，比普通过去时多一层回忆感。\n中文里没有完全对应的形式，可以理解为"曾经……（但现在未必如此）"。', whatItDoesBodyEn: '-았었/었었/였었어요 expresses past experiences or states, often implying "things may be different now," adding a layer of nostalgia compared to the simple past. There\'s no exact Chinese equivalent; think of it as "used to... (but not necessarily now)."',
    structureNote: '这节课在P1过去时基础上加一层：\n-았어요 是普通过去，-았었어요 是"回忆性过去"强调现在和过去已经不同了。\n结构是在过去时词尾上再加一个 -었어요。', structureNoteEn: 'This lesson builds on the P1 past tense: -았어요 is simple past, while -았었어요 is "recollective past" emphasizing that the present differs from the past. The structure adds another -었어요 to the past tense ending.',
    rulesNote: '变形逻辑和普通过去时完全一样（看词干末尾元音选 았/었/였），只是再叠一层 었어요。\n注意：\n昨天发生的普通事件用 -았어요，不要用 -았었어요（어제 밥을 먹었어요 ✓，먹었었어요 ✗）。', rulesNoteEn: 'The conjugation logic is identical to the simple past (choose 았/었/였 based on the final vowel of the stem), just with an extra 었어요 added. Note: use -았어요 for ordinary events that happened yesterday, not -았었어요 (어제 밥을 먹었어요 ✓, 먹었었어요 ✗).',
    scenarioNote: '"以前喜欢过这个歌手""小时候住过首尔""以前经常听这首歌"这类带着回忆和变化感的表达，正是 -았었어요 的主战场。\n追星、聊经历、回忆往事全都用得到。', scenarioNoteEn: 'Expressions like "used to like this singer," "lived in Seoul as a kid," or "used to listen to this song a lot"—full of nostalgia and change—are exactly where -았었어요 shines. It\'s used for fandom, sharing experiences, and reminiscing.',
    structures: [
      {
        ko: '예전에 서울에 살았었어요',
        zh: '以前在首尔住过。', zhEn: 'I used to live in Seoul.',
        tokens: [
          { text: '예전에', role: 'time' },
          { text: '서울에', role: 'place' },
          { text: '살았었어요', role: 'verb' },
        ],
      },
      {
        ko: '예전에 이 가수를 좋아했었어요',
        zh: '以前喜欢过这位歌手。', zhEn: 'I used to like this singer.',
        tokens: [
          { text: '예전에', role: 'time' },
          { text: '이 가수를', role: 'object' },
          { text: '좋아했었어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '词干末元音为 ㅏ/ㅗ → -았었어요', textEn: 'If the stem ends in ㅏ/ㅗ → -았었어요', examples: '살다→살았었어요, 좋다→좋았었어요, 오다→왔었어요' },
      { type: 'rule', text: '词干末元音非 ㅏ/ㅗ → -었었어요', textEn: 'If the stem doesn\'t end in ㅏ/ㅗ → -었었어요', examples: '먹다→먹었었어요, 있다→있었었어요, 배우다→배웠었어요' },
      { type: 'rule', text: '하다 动词 → 했었어요', textEn: '하다 verbs → 했었어요', examples: '공부하다→공부했었어요, 좋아하다→좋아했었어요, 일하다→일했었어요' },
      { type: 'rule', text: '名词 + 이었었어요/였었어요', textEn: 'Noun + 이었었어요/였었어요', examples: '학생이었었어요（以前是学生）, 친구였었어요（以前是朋友）', examplesEn: '학생이었었어요 (used to be a student), 친구였었어요 (used to be a friend)' },
      { type: 'compare', text: '-았어요 vs -았었어요', examples: '어제 먹었어요（昨天吃了，普通过去）/ 예전에 자주 먹었었어요（以前经常吃，现在未必）', examplesEn: '어제 먹었어요 (ate yesterday, simple past) / 예전에 자주 먹었었어요 (used to eat often, not necessarily now)' },
      { type: 'note', text: '昨天发生的普通事件用 -았/었어요', textEn: 'Use -았/었어요 for ordinary events that happened yesterday', examples: '어제 밥을 먹었어요 ✓ / 어제 밥을 먹었었어요 ✗' },
      { type: 'usage', text: '常与时间表达搭配使用', textEn: 'Often used with time expressions', examples: '예전에 / 어렸을 때 / 몇 년 전에 → 살았었어요, 공부했었어요, 다녔었어요' },
      { type: 'note', text: '-았었어요 强制暗示"现在已相反/中断"，现在还成立就不能用', textEn: '-았었어요 strongly implies \'now it\'s the opposite/discontinued\'; if it still holds true now, you can\'t use it', examples: '现在还住首尔 → 서울에 살아요（✓）不能说 살았었어요; 현재도 좋아하면 → 좋아해요（✓）。中文"曾经/以前"是中性的，韩语 -았었 却把"现在已经不是这样了"锁进词尾里。', examplesEn: 'Still living in Seoul → 서울에 살아요 (✓) can\'t say 살았었어요; if you still like it → 좋아해요 (✓). Chinese \'once/before\' is neutral, but Korean -았었 locks \'it\'s no longer the case now\' into the ending.' },
      { type: 'compare', text: '中文"过"的两种含义要拆开：经历"过" vs 中断"曾经……过"', textEn: 'Chinese \'guò\' has two meanings to separate: experience \'have done\' vs. discontinued \'used to do\'', examples: '"你去过韩国吗？"（问经历，人现在回来了）韩语更常用 가 봤어요; 而 갔었어요 侧重"当时去了那段时间、现已结束"。别把所有中文"过"都套成 -았었어요。', examplesEn: '\'Have you been to Korea?\' (asking about experience, the person is back now) Korean more commonly uses 가 봤어요; whereas 갔었어요 emphasizes \'went at that time, now over\'. Don\'t map all Chinese \'guò\' to -았었어요.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '예전에', role: 'time' },
          { text: '한국어를', role: 'object' },
          { text: '공부했었어요', role: 'verb' },
        ],
        zh: '以前学过韩语。', zhEn: 'I used to study Korean.',
        swapWords: ['배웠었어요', '좋아했었어요', '들었었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '예전에', role: 'time' },
          { text: '서울에', role: 'place' },
          { text: '살았었어요', role: 'verb' },
        ],
        zh: '以前在首尔住过。', zhEn: 'I used to live in Seoul.',
        swapWords: ['있었었어요', '다녔었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '예전에', role: 'time' },
          { text: '이 노래를', role: 'object' },
          { text: '자주 들었었어요', role: 'verb' },
        ],
        zh: '以前经常听这首歌。', zhEn: 'I used to listen to this song often.',
        swapWords: ['봤었어요', '좋아했었어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어렸을 때', role: 'time' },
          { text: '여기에', role: 'place' },
          { text: '살았었어요', role: 'verb' },
        ],
        zh: '小时候住在这里。', zhEn: 'I used to live here when I was little.',
        swapWords: ['다녔었어요', '있었었어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📖', context: '学习经历', contextEn: 'Learning experience', ko: '예전에 한국어를 공부했었어요.', zh: '以前学过韩语。', zhEn: 'I used to study Korean.' },
      { icon: '🏙️', context: '居住经历', contextEn: 'Living experience', ko: '예전에 서울에 살았었어요.', zh: '以前在首尔住过。', zhEn: 'I used to live in Seoul.' },
      { icon: '🎤', context: '追星回忆', contextEn: 'Fan memories', ko: '예전에 이 가수를 정말 좋아했었어요.', zh: '以前非常喜欢过这位歌手。', zhEn: 'I used to really like this singer.' },
      { icon: '🎓', context: '身份变化', contextEn: 'Identity change', ko: '저도 오년 전에 한국어 학생이었었어요.', zh: '我五年前也曾是韩语学生。', zhEn: 'I was also a Korean student five years ago.' },
      { icon: '🏫', context: '学校往事', contextEn: 'School memories', ko: '어렸을 때 이 동네에 살았었어요. 지금은 다른 곳에 살아요.', zh: '小时候住在这个小区，现在住在别的地方了。', zhEn: 'I used to live in this neighborhood as a kid, but now I live elsewhere.' },
      { icon: '🍜', context: '饮食变化', contextEn: 'Dietary changes', ko: '예전에는 매운 음식을 잘 먹었었어요. 그런데 지금은 못 먹어요.', zh: '以前很能吃辣的食物，但现在不行了。', zhEn: 'I used to handle spicy food well, but not anymore.' },
    ],
    mistakes: [
      { wrong: '어제 밥을 먹었었어요（昨天吃饭，普通过去）', wrongEn: 'Ate yesterday (plain past)', correct: '어제 밥을 먹었어요', note: '昨天发生的普通事件用 -었어요，不需要 -었었어요 的回忆感。', noteEn: 'For ordinary events yesterday, use -었어요; no need for the reminiscing feel of -었었어요.' },
      { wrong: '좋아했었어요 误解为"现在还喜欢"', wrongEn: 'Misunderstood as \'still likes now\'', correct: '좋아했었어요（以前喜欢过，现在未必）', correctEn: 'Liked before, may not now', note: '-았었어요 常暗示现在状态可能不同了，注意语气。', noteEn: '-았었어요 often implies the current state may differ; watch the tone.' },
      { wrong: '어제 공부했었어요（昨天学习）', wrongEn: 'Studied yesterday', correct: '어제 공부했어요', note: '-았었어요 用于有时间距离的回忆，昨天的事直接用 -았어요。', noteEn: '-았었어요 is for memories with time distance; for yesterday, just use -았어요.' },
      { wrong: '친구이었었어요', correct: '친구였었어요', note: '친구 以元音结尾，用 였었어요，不是 이었었어요。', noteEn: '친구 ends in a vowel, so use 였었어요, not 이었었어요.' },
      { wrong: '지금도 서울에 살았었어요（现在还住首尔）', wrongEn: 'Still lives in Seoul now', correct: '지금도 서울에 살아요', note: '想说"现在也还住"时不能用 -았었어요，它必然暗示"现在已经不住了"。现在仍成立的事直接用现在时。', noteEn: 'To say \'still lives there now,\' don\'t use -았었어요—it implies \'no longer lives there.\' Use present tense for things still true.' },
    ],
        compareHtml: `<div class="card-title">"曾经……过"vs 普通过去时</div>
<div class="card-body">-았었/었었/였었어요 表达过去曾经有过的经历或状态，常带有"现在可能已经不同了"的感觉。中文里没有完全对应的形式，可以理解为"曾经……（但现在未必如此）"。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">普通过去时</div><div style="font-size:16px;color:#89756e;margin-top:2px">单纯叙述过去</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국어를 배웠어요.</span><span style="font-size:16px;color:#5a4640">学了韩语。（陈述事实）</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">서울에 갔어요.</span><span style="font-size:16px;color:#5a4640">去了首尔。</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">过去回想（-았었/었었）</div><div style="font-size:16px;color:#89756e;margin-top:2px">回忆过去，暗示变化</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국어를 배웠었어요.</span><span style="font-size:16px;color:#5a4640">学过韩语（但现在可能忘了）。</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">서울에 갔었어요.</span><span style="font-size:16px;color:#5a4640">去过首尔（但现在不在了）。</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">回忆感从何而来</div><div style="font-size:16px;color:#5a4640">中文用'过'也能表达经历（'学过韩语'），但 -았었어요 将'经历+变化'两层含义压缩在一个词尾里，比中文更明确地暗示'现在已不同'。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">使用场景：聊过去的学校、前公司、以前住过的地方。</div></div>
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
        specialQuiz: {
      type: 'judge',
      title: '判断对错：-았었어요 的用法', titleEn: 'True/False: Usage of -았었어요',
      body: '选出使用 -았/었/였었어요 正确的句子。', bodyEn: 'Choose the sentence that correctly uses -았/었/였었어요.',
      questions: [
        { options: ["예전에 서울에 살았었어요","예전에 서울에 살았어요"], answer: 0, explanation: '-았었어요 强调过去经历、现在已不同。살았어요 是普通过去陈述。题目问"回忆感"表达。', explanationEn: '-았었어요 emphasizes a past experience that is now different. 살았어요 is a simple past statement. The question asks for the "nostalgic" expression.' },
        { options: ["어제 밥을 먹었었어요","어제 밥을 먹었어요"], answer: 1, explanation: '昨天普通事件用 -었어요，-었었어요 用于有时间距离的回忆，어제 太近了。', explanationEn: 'For ordinary events yesterday, use -었어요; -었었어요 is for distant memories—어제 is too recent.' },
        { options: ["예전에 학생이었었어요","예전에 학생이었어요"], answer: 0, explanation: '名词+이었었어요 表示"以前是学生（现在不是了）"，带回忆感。', explanationEn: 'Noun + 이었었어요 means "used to be a student (but not anymore)," with a nostalgic feel.' },
        { options: ["친구였었어요","친구이었었어요"], answer: 0, explanation: '친구 以元音结尾 → 였었어요，不是 이었었어요。', explanationEn: '친구 ends in a vowel → 였었어요, not 이었었어요.' },
      ],
    },

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
    whatItDoes: '说想做什么，以及"那样的话"', whatItDoesEn: 'Say what you want to do, and "in that case"',
    whatItDoesBody: '-고 싶어요 表达说话人自己的愿望；\n그러면 连接条件和结果，表示"那么/那样的话"。\n-고 싶어요 主要用于第一人称的愿望表达；说第三人称"想做"通常换成 -고 싶어하다。\n和中文不同：\n中文"想做"不区分人称，韩语第一人称用 싶어요，第三人称要换成 싶어하다。', whatItDoesBodyEn: '-고 싶어요 expresses the speaker\'s own wish; \\n그러면 connects condition and result, meaning "then/in that case." \\n-고 싶어요 is mainly used for first-person wishes; for third-person "wants to do," switch to -고 싶어하다. \\nUnlike Chinese: \\nChinese "wants to do" doesn\'t distinguish person, but Korean uses 싶어요 for first person and 싶어하다 for third person.',
    structureNote: '两块内容：①-고 싶어요（想做）动词词干直接加，非常规律；\n②그러면（那么）放句首连接两句话，口语常缩成 그럼。', structureNoteEn: 'Two parts: ① -고 싶어요 (want to do) attaches directly to the verb stem, very regular; \\n② 그러면 (then) goes at the start of a sentence to connect two clauses, often shortened to 그럼 in speech.',
    rulesNote: '-고 싶어요 只接动词词干，不能直接接名词（커피고 싶어요 ✗）。\n说第三人称的愿望要用 -고 싶어하다（친구는 가고 싶어해요）。\n그러면 表示顺接条件，和转折用的 그렇지만 不同。', rulesNoteEn: '-고 싶어요 only attaches to verb stems, not nouns (커피고 싶어요 ✗). \\nFor third-person wishes, use -고 싶어하다 (친구는 가고 싶어해요). \\n그러면 marks a conditional sequence, unlike 그렇지만 which is contrastive.',
    scenarioNote: '-고 싶어요 是表达愿望最自然的方式说学习目标、旅行计划、购物心愿都用它。\n加上 그러면/그럼，就能做出"如果……那就……"的建议句，对话立刻更流畅。', scenarioNoteEn: '-고 싶어요 is the most natural way to express wishes—use it for study goals, travel plans, and shopping desires. \\nAdd 그러면/그럼 to make "if... then..." suggestions, and your conversations flow instantly.',
    structures: [
      {
        ko: '한국에 가고 싶어요',
        zh: '想去韩国。', zhEn: 'I want to go to Korea.',
        tokens: [
          { text: '한국에', role: 'place' },
          { text: '가고 싶어요', role: 'verb' },
        ],
      },
      {
        ko: '시간이 있어요? 그러면 같이 가요',
        zh: '有时间吗？那一起去吧。', zhEn: 'Got time? Then let\'s go together.',
        tokens: [
          { text: '시간이', role: 'subject' },
          { text: '있어요?', role: 'verb' },
          { text: '그러면', role: 'plain' },
          { text: '같이 가요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词词干 + -고 싶어요', textEn: 'Verb stem + -고 싶어요', examples: '가다→가고 싶어요, 먹다→먹고 싶어요, 배우다→배우고 싶어요, 마시다→마시고 싶어요' },
      { type: 'note', text: '-고 싶어요 只接动词词干，不能直接接名词', textEn: '-고 싶어요 only attaches to verb stems, not nouns directly', examples: '커피고 싶어요 ✗ → 커피를 마시고 싶어요 ✓' },
      { type: 'note', text: '-고 싶어요 表达说话人本人的愿望；第三人称用 -고 싶어하다', textEn: '-고 싶어요 expresses the speaker\'s own wish; for third person, use -고 싶어하다', examples: '저는 가고 싶어요（我想去）/ 친구는 가고 싶어해요（朋友想去）', examplesEn: 'I want to go / My friend wants to go' },
      { type: 'rule', text: '그러면 — 放句首连接条件与结果', textEn: '그러면 — at sentence start to link condition and result', examples: '시간이 있어요? 그러면 같이 가요.（有时间吗？那就一起去吧。）', examplesEn: 'Got time? Then let\'s go together.' },
      { type: 'compare', text: '그러면 ≠ 그렇지만', examples: '그러면（那么，条件顺接）/ 그렇지만（但是，明确转折）', examplesEn: '그러면 (then, conditional) / 그렇지만 (but, clear contrast)' },
      { type: 'usage', text: '口语中 그러면 常缩短为 그럼', textEn: 'In speech, 그러면 often shortens to 그럼', examples: '그럼 같이 가요. / 그럼 내일 봐요.' },
      { type: 'note', text: '보고 싶다 有两个意思：想看 / 想念（想见）', textEn: '보고 싶다 has two meanings: want to see / miss (want to meet)', examples: '이 영화를 보고 싶어요（想看这部电影，宾语是事物）/ 엄마가 보고 싶어요（想妈妈·想念，对象是人）。看到"人 + 보고 싶어요"通常是"想念"，不是"想看那个人"。', examplesEn: '이 영화를 보고 싶어요 (want to watch this movie, object is a thing) / 엄마가 보고 싶어요 (miss mom, object is a person). When you see "person + 보고 싶어요," it usually means "miss," not "want to see that person."' },
      { type: 'compare', text: '그러면（那么·条件）vs 그래서（所以·因果）', textEn: '그러면 (then, conditional) vs 그래서 (so, cause and effect)', examples: '시간이 있어요? 그러면 같이 가요（有时间吗？那就一起去·假设条件）/ 시간이 없었어요. 그래서 못 갔어요（没时间，所以没去成·陈述因果）。中文都可说"那……"，但 그래서 讲已发生的因果，그러면 讲假设推进。', examplesEn: '시간이 있어요? 그러면 같이 가요 (Do you have time? Then let\'s go together, hypothetical condition) / 시간이 없었어요. 그래서 못 갔어요 (I didn\'t have time, so I couldn\'t go, stating cause and effect). Both can be "then..." in Chinese, but 그래서 is for past cause and effect, 그러면 is for hypothetical progression.' },
      { type: 'example', text: '한국어를 잘하고 싶어요. / 뭐 먹고 싶어요? / 배가 고파요. 그러면 같이 밥을 먹어요.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국어를', role: 'object' },
          { text: '배우고 싶어요', role: 'verb' },
        ],
        zh: '想学韩语。', zhEn: 'Want to learn Korean.',
        swapWords: ['가고 싶어요', '먹고 싶어요', '보고 싶어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '콘서트에', role: 'place' },
          { text: '가고 싶어요', role: 'verb' },
        ],
        zh: '想去演唱会。', zhEn: 'I want to go to the concert.',
        swapWords: ['한국에 가고 싶어요', '이 노래를 배우고 싶어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '시간이 있어요.', role: 'plain' },
          { text: '그러면', role: 'plain' },
          { text: '같이 공부해요', role: 'verb' },
        ],
        zh: '有时间。那一起学习吧。', zhEn: 'I have time. Then let\'s study together.',
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
        zh: '想把韩语学好。那就每天练习吧。', zhEn: 'I want to get good at Korean. Then practice every day.',
        swapWords: ['그럼 같이 해요', '그럼 시작해요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🎯', context: '学习目标', contextEn: 'Study goal', ko: '한국어를 잘하고 싶어요.', zh: '想把韩语学好。', zhEn: 'I want to get good at Korean.' },
      { icon: '✈️', context: '旅行计划', contextEn: 'Travel plans', ko: '한국에 가고 싶어요.', zh: '想去韩国。', zhEn: 'I want to go to Korea.' },
      { icon: '🎤', context: 'KPOP 追星', contextEn: 'KPOP fandom', ko: '이 가수의 콘서트에 가고 싶어요.', zh: '想去这位歌手的演唱会。', zhEn: 'I want to go to this singer\'s concert.' },
      { icon: '🍚', context: '日常对话', contextEn: 'Everyday conversation', ko: '가: 배가 너무 고파요. 나: 그러면 같이 밥을 먹읍시다.', zh: '甲：肚子太饿了。乙：那一起去吃饭吧。', zhEn: 'A: I\'m so hungry. B: Then let\'s go eat together.' },
      { icon: '🛍️', context: '购物愿望', contextEn: 'Shopping wish', ko: '이 가방을 사고 싶어요. 그런데 좀 비싸요.', zh: '想买这个包，但有点贵。', zhEn: 'I want to buy this bag, but it\'s a bit expensive.' },
      { icon: '🍣', context: '餐厅', contextEn: 'Restaurant', ko: '오늘은 일식을 먹고 싶어요. 그러면 역 앞에 있는 식당에 가요.', zh: '今天想吃日料，那去车站前面那家餐厅吧。', zhEn: 'I want to eat Japanese food today, then let\'s go to that restaurant in front of the station.' },
    ],
    mistakes: [
      { wrong: '커피고 싶어요', correct: '커피를 마시고 싶어요', note: '-고 싶어요 接动词，不直接接名词，需要补出动词。', noteEn: '-고 싶어요 attaches to verbs, not directly to nouns; you need to supply a verb.' },
      { wrong: '그러면（想表达"但是"）', wrongEn: '그러면 (when you want to say "but")', correct: '그렇지만 / 하지만（但是）', correctEn: '그렇지만 / 하지만 (but)', note: '그러면＝那么/那样的话（顺接条件），转折要用 그렇지만/하지만，意思完全不同。', noteEn: '그러면 means "then/in that case" (sequential condition); for contrast use 그렇지만/하지만, which have completely different meanings.' },
      { wrong: '한국어고 싶어요', correct: '한국어를 배우고 싶어요', note: '-고 싶어요 接动词词干，不能直接接名词。', noteEn: '-고 싶어요 attaches to verb stems, not directly to nouns.' },
      { wrong: '친구는 가고 싶어요（第三人称）', wrongEn: '친구는 가고 싶어요 (third person)', correct: '친구는 가고 싶어해요', note: '说话人本人用 -고 싶어요；第三人称通常换成 -고 싶어하다。疑问句\'뭐 먹고 싶어요?\'不受此限。', noteEn: 'Use -고 싶어요 for the speaker; for third person, switch to -고 싶어하다. Questions like \'뭐 먹고 싶어요?\' are exempt.' },
      { wrong: '너를 보고 싶어요（想说"想见你"却怕被理解成"想看你"）', wrongEn: '너를 보고 싶어요 (when you want to say "I miss you" but worry it\'ll be taken as "I want to see you")', correct: '너를 보고 싶어요 就是"想你/想见你"', correctEn: '너를 보고 싶어요 means "I miss you / I want to see you"', note: '对象是人时 보고 싶다 表示"想念、想见"，正是想要的意思，不用回避。想表达"想看某物"时宾语换成事物即可（영화를 보고 싶어요）。', noteEn: 'When the object is a person, 보고 싶다 means "miss, want to see," which is exactly what you want—no need to avoid it. To say "want to watch something," just change the object to a thing (영화를 보고 싶어요).' },
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
        specialQuiz: {
      type: 'fill',
      title: '选择正确的表达', titleEn: 'Choose the correct expression.',
      body: '根据句意选择正确的词或语法填入。', bodyEn: 'Choose the correct word or grammar based on the sentence meaning.',
      questions: [
        {
          pre: '한국어를',
          post: '싶어요.',
          options: ["배우", "공부", "배우고"],
          answer: 2,
          explanation: '-고 싶어요 接动词词干，배우다→배우고 싶어요（想学）。', explanationEn: '-고 싶어요 attaches to verb stems, 배우다→배우고 싶어요 (want to learn).',
        },
        {
          pre: '시간이 있어요.',
          post: ' 같이 가요.',
          options: ["그러면", "그렇지만", "그런데"],
          answer: 0,
          explanation: '그러면 表示"那/那么"，连接条件与结果。그렇지만 是转折。', explanationEn: '그러면 means "then/so," connecting conditions and results. 그렇지만 is a contrastive conjunction.',
        },
        {
          pre: '친구는 드라마를',
          post: '싶어해요.',
          options: ["보고", "봐", "보"],
          answer: 0,
          explanation: '第三人称愿望用 -고 싶어하다：친구는 보고 싶어해요。', explanationEn: 'For third-person wishes, use -고 싶어하다: 친구는 보고 싶어해요.',
        },
        {
          pre: '뭐',
          post: '싶어요?',
          options: ["먹어", "먹고", "먹"],
          answer: 1,
          explanation: '먹다 + -고 싶어요 = 먹고 싶어요（想吃）。', explanationEn: '먹다 + -고 싶어요 = 먹고 싶어요 (want to eat).',
        },
      ],
    },

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
    lessonNumber: 4,
    title: '"ㄹ"不规则音变', titleEn: 'The "ㄹ" irregular sound change',
    whatItDoes: '认识ㄹ收音词的特殊变形规律', whatItDoesEn: 'Learn the special conjugation rules for words ending in ㄹ',
    whatItDoesBody: 'ㄹ 不规则不是永远变化，而是遇到 ㄴ/ㅂ/ㅅ 开头的语尾时 ㄹ 脱落。\n接 -아요/어요、-고 时保留。\n常见词：\n살다, 알다, 만들다, 놀다。\n中文没有类似规则，记住"遇 ㄴ/ㅂ/ㅅ 就脱落"这一条就够了。', whatItDoesBodyEn: 'The ㄹ irregular isn\'t always changing—ㄹ drops only before endings starting with ㄴ/ㅂ/ㅅ. \\nIt\'s kept before -아요/어요 and -고. \\nCommon words: \\n살다, 알다, 만들다, 놀다. \\nChinese has no similar rule, so just remember "drops before ㄴ/ㅂ/ㅅ."',
    structureNote: '这节课不是新句型，而是变形规则：\nㄹ 词干在接哪些语尾时会脱落 ㄹ，在哪些语尾前保留。\n把常用词（살다/알다/만들다）的几种形式对比记，比背规则快。', structureNoteEn: 'This lesson isn\'t a new pattern but a conjugation rule: \\nwhich endings make ㄹ stems drop the ㄹ, and which keep it. \\nComparing forms of common words (살다/알다/만들다) is faster than memorizing rules.',
    rulesNote: 'ㄹ 脱落触发条件：\n后接语尾首字母是 ㄴ/ㅂ/ㅅ（如 -(으)세요、正式体 -ㅂ니다/습니다、冠词形 -는）。\n接元音语尾（-아요/어요）或 -고 时 ㄹ 保留不变。\n口诀：\n살아요（保）/ 사세요（落）/ 삽니다（落）/ 사는（落）。', rulesNoteEn: 'ㄹ drop triggers: \\nwhen the following ending starts with ㄴ/ㅂ/ㅅ (e.g., -(으)세요, formal -ㅂ니다/습니다, adnominal -는). \\nBefore vowel endings (-아요/어요) or -고, ㄹ stays. \\nMnemonic: \\n살아요 (keep) / 사세요 (drop) / 삽니다 (drop) / 사는 (drop).',
    scenarioNote: '살다/알다/만들다 是极高频词问住哪、问认不认识、说自己做的。\n掌握 ㄹ 脱落，遇到这类词就不会写错形式，听力也更容易识别。', scenarioNoteEn: '살다/알다/만들다 are super high-frequency—asking where someone lives, if they know something, or what they made. \\nMastering ㄹ drop means you won\'t misspell these forms and can recognize them more easily in listening.',
    structures: [
      {
        ko: '어디에 살아요?',
        zh: '住在哪里？', zhEn: 'Where do you live?',
        tokens: [
          { text: '어디에', role: 'place' },
          { text: '살아요', role: 'verb' },
        ],
      },
      {
        ko: '이 단어를 아세요?',
        zh: '您知道这个单词吗？', zhEn: 'Do you know this word?',
        tokens: [
          { text: '이 단어를', role: 'object' },
          { text: '아세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: 'ㄹ + -아요/어요 → ㄹ 保留', textEn: 'ㄹ + -아요/어요 → ㄹ is retained', examples: '살다→살아요, 알다→알아요, 만들다→만들어요, 놀다→놀아요' },
      { type: 'rule', text: 'ㄹ + -고 → ㄹ 保留', textEn: 'ㄹ + -고 → ㄹ is retained', examples: '살고 있어요, 알고 있어요, 만들고 싶어요（正住着、知道、想做）', examplesEn: '살고 있어요, 알고 있어요, 만들고 싶어요 (living, knowing, wanting to make)' },
      { type: 'rule', text: 'ㄹ + -(으)세요 → ㄹ 脱落', textEn: 'ㄹ + -(으)세요 → ㄹ is dropped', examples: '살다→사세요, 알다→아세요, 만들다→만드세요, 놀다→노세요' },
      { type: 'rule', text: 'ㄹ + -ㅂ니다 → ㄹ 脱落', textEn: 'ㄹ + -ㅂ니다 → ㄹ is dropped', examples: '살다→삽니다, 알다→압니다, 만들다→만듭니다, 팔다→팝니다' },
      { type: 'note', text: '口诀：ㄹ 在 ㄴ/ㅂ/ㅅ 开头语尾前脱落，在元音开头语尾前保留', textEn: 'Rule: ㄹ drops before endings starting with ㄴ/ㅂ/ㅅ, but is retained before vowel-initial endings.', examples: '-(으)세요/ㅂ니다/는 前脱落；-아요/어요/-고 前保留', examplesEn: 'Drops before -(으)세요/ㅂ니다/는; retained before -아요/어요/-고.' },
      { type: 'rule', text: 'ㄹ + -는 → ㄹ 脱落（冠词形）', textEn: 'ㄹ + -는 → ㄹ is dropped (adnominal form)', examples: '살다→사는 사람（住的人）, 알다→아는 단어（认识的单词）, 만들다→만드는 방법', examplesEn: '살다→사는 사람 (a person who lives), 알다→아는 단어 (a word you know), 만들다→만드는 방법 (how to make)' },
      { type: 'note', text: 'ㄹ 词干后面从不加 -으-（以后学 -(으)면 等语尾时用得到）', textEn: 'ㄹ stems never take -으- (useful later for endings like -(으)면).', examples: '살다→살면（✓）不是 살으면（✗）, 알다→알면, 만들다→만들면, 놀다→놀면。别的收音词接 -(으)면 要加 으（먹으면），但 ㄹ 词干直接省掉 으。', examplesEn: '살다→살면 (✓) not 살으면 (✗), 알다→알면, 만들다→만들면, 놀다→놀면. Other batchim words add 으 with -(으)면 (먹으면), but ㄹ stems drop 으 entirely.' },
      { type: 'note', text: 'ㄹ 不规则是"全员规则"，不用一个个背', textEn: 'The ㄹ irregularity is a "blanket rule" — no need to memorize word by word.', examples: '所有以 ㄹ 收音结尾的词干都这样脱落（살다/알다/만들다/놀다/팔다/멀다……），不像 ㅂ/ㄷ 不规则那样要记哪些词是不规则。只要末尾是 ㄹ，遇 ㄴ/ㅂ/ㅅ 就脱落。', examplesEn: 'All stems ending in ㄹ drop it (살다/알다/만들다/놀다/팔다/멀다…), unlike ㅂ/ㄷ irregulars where you memorize specific words. If it ends in ㄹ, it drops before ㄴ/ㅂ/ㅅ.' },
      { type: 'example', text: '살아요 / 사세요 / 삽니다 / 사는 — 살다 全形变一览; 알아요 / 아세요 / 압니다 — 알다', textEn: '살아요 / 사세요 / 삽니다 / 사는 — full conjugation of 살다; 알아요 / 아세요 / 압니다 — 알다' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '어디에', role: 'place' },
          { text: '살아요', role: 'verb' },
        ],
        zh: '住在哪里？', zhEn: 'Where do you live?',
        swapWords: ['알아요', '만들어요', '놀아요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 노래를', role: 'object' },
          { text: '아세요', role: 'verb' },
        ],
        zh: '您知道这首歌吗？', zhEn: 'Do you know this song?',
        swapWords: ['사세요', '만드세요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '문장을', role: 'object' },
          { text: '만들어요', role: 'verb' },
        ],
        zh: '造句。', zhEn: 'Make a sentence.',
        swapWords: ['만드세요', '만듭니다'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '요즘', role: 'time' },
          { text: '어디에', role: 'place' },
          { text: '살아요', role: 'verb' },
        ],
        zh: '最近住在哪里？', zhEn: 'Where have you been living lately?',
        swapWords: ['알아요', '놀아요', '팔아요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🏠', context: '问住址', contextEn: 'Asking for an address', ko: '어디에 살아요?', zh: '住在哪里？', zhEn: 'Where do you live?' },
      { icon: '🎵', context: 'KPOP 互动', contextEn: 'KPOP Interaction', ko: '이 노래 아세요?', zh: '您知道这首歌吗？', zhEn: 'Do you know this song?' },
      { icon: '✏️', context: '学习造句', contextEn: 'Practice Making Sentences', ko: '문장을 만들어 보세요.', zh: '请试着造句。', zhEn: 'Please try making a sentence.' },
      { icon: '😊', context: '日常对话', contextEn: 'Everyday conversation', ko: '요즘 잘 지내고 있어요? 저는 잘 살고 있어요.', zh: '最近过得好吗？我过得很好。', zhEn: 'How have you been lately? I\'ve been doing well.' },
      { icon: '🏡', context: '问住所', contextEn: 'Asking about residence', ko: '지금 어디에 살아요? 저는 서울에 살아요. 회사에서 가까워요.', zh: '现在住在哪里？我住在首尔，离公司很近。', zhEn: 'Where do you live now? I live in Seoul, close to my company.' },
      { icon: '🍳', context: '做饭', contextEn: 'cooking', ko: '직접 만들어요? 네, 저는 요리하는 걸 좋아해요.', zh: '自己做吗？是的，我喜欢做饭。', zhEn: 'Do you cook yourself? Yes, I like cooking.' },
    ],
    mistakes: [
      { wrong: '알세요?', correct: '아세요?', note: '알다 + -세요 → ㄹ 脱落 → 아세요。不要保留 ㄹ。', noteEn: '알다 + -세요 → ㄹ drops → 아세요. Don\'t keep the ㄹ.' },
      { wrong: '사아요（살다→살아요의 误写）', wrongEn: '사아요 (a misspelling of 살다→살아요)', correct: '살아요', note: '接 -아요 时 ㄹ 保留，살다 → 살아요，不是 사아요。', noteEn: 'When adding -아요, the ㄹ is kept: 살다 → 살아요, not 사아요.' },
      { wrong: '만들세요', correct: '만드세요', note: '만들다 + -세요 → ㄹ 脱落 → 만드세요。', noteEn: '만들다 + -세요 → ㄹ drops → 만드세요.' },
      { wrong: '놀세요（권유）', correct: '노세요', note: '놀다 + -세요 → ㄹ 脱落 → 노세요。-세요 前 ㄹ 总是脱落。', noteEn: '놀다 + -세요 → ㄹ drops → 노세요. The ㄹ always drops before -세요.' },
      { wrong: '서울에 살으면（想说"如果住首尔"）', wrongEn: '서울에 살으면 (if you mean "if I live in Seoul")', correct: '서울에 살면', note: 'ㄹ 词干接 -(으)면 时不加 으，直接 살면。这是 ㄹ 词干和普通收音词（먹으면）最容易混的一点。', noteEn: 'For ㄹ stems with -(으)면, don\'t add 으—just use 살면. This is the easiest point to confuse with regular final-consonant stems (먹으면).' },
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
        specialQuiz: {
      type: 'judge',
      title: '判断对错：ㄹ不规则音变', titleEn: 'True or false: the ㄹ irregular sound change',
      body: '选出变形正确的句子。', bodyEn: 'Choose the sentence with the correct conjugation.',
      questions: [
        { options: ["어디에 살아요?","어디에 사라요?"], answer: 0, explanation: '살다 → 词干 살，接 아요 时 ㄹ 保留 → 살+아요 = 살아요（✓）。사라요 是错误写法。', explanationEn: '살다 → stem 살, when adding 아요 the ㄹ is kept → 살+아요 = 살아요 (✓). 사라요 is incorrect.' },
        { options: ["이 단어를 알아요","이 단어를 알어요"], answer: 0, explanation: '알다 → 词干 알，接 아요 时 ㄹ 保留 → 알+아요 = 알아요。词干末元音是 ㅏ，接 아요 不接 어요，所以不是 알어요。', explanationEn: '알다 → stem 알, when adding 아요 the ㄹ is kept → 알+아요 = 알아요. The stem ends in ㅏ, so it takes 아요, not 어요—so it\'s not 알어요.' },
        { options: ["저 분을 아세요","저 분을 알으세요"], answer: 0, explanation: '알다 → 알+세요 = 아세요（ㄹ脱落），不是 알으세요。', explanationEn: '알다 → 알+세요 = 아세요 (ㄹ drops), not 알으세요.' },
        { options: ["날씨가 추워서 놀았어요","날씨가 추워서 놀었어요"], answer: 0, explanation: '놀다 词干 놀，ㅗ 阳性元音 → 接 았어요 = 놀았어요。놀었어요 错在 ㅗ 不能接 었。（ㄹ 不规则只看后续是不是 ㄴ/ㅂ/ㅅ/오，았/었 不触发脱落）', explanationEn: '놀다 stem 놀, ㅗ is a positive vowel → add 았어요 = 놀았어요. 놀었어요 is wrong because ㅗ can\'t take 었. (The ㄹ irregularity only applies before ㄴ/ㅂ/ㅅ/오; 았/었 doesn\'t trigger the drop.)' },
      ],
    },

    compareLabel: 'ㄹ 保留 vs ㄹ 脱落', compareLabelEn: 'Keeping ㄹ vs. dropping ㄹ',
    quickTable: {
      title: 'ㄹ 不规则高频词变形', titleEn: 'Conjugating high-frequency ㄹ irregular words',
      headers: ['原形', '-아요/어요', '-(으)세요', '-ㅂ니다'],
      rows: [
        ['살다 住', '살아요', '사세요', '삽니다'],
        ['알다 知道', '알아요', '아세요', '압니다'],
        ['만들다 制作', '만들어요', '만드세요', '만듭니다'],
        ['놀다 玩', '놀아요', '노세요', '놉니다'],
        ['팔다 卖', '팔아요', '파세요', '팝니다'],
        ['길다 长（形）', '길어요', '— (形容词不接命令)', '깁니다'],
        ['달다 甜（形）', '달아요', '— (形容词不接命令)', '답니다'],
        ['들다 拿/花费', '들어요', '드세요', '듭니다'],
        ['멀다 远（形）', '멀어요', '— (形容词不接命令)', '멉니다'],
        ['힘들다 辛苦（形）', '힘들어요', '— (敬语问候可用 힘드세요)', '힘듭니다'],
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
    lessonNumber: 5,
    title: '-을/ㄹ래요, -겠-',
    whatItDoes: '说"好的我知道了"和做选择', whatItDoesEn: 'Saying "okay, got it" and making choices',
    whatItDoesBody: '-을/ㄹ래요 表达"我要……/要不要……"，比 -고 싶어요 更直接；\n-겠- 表达意志、推测或礼貌，最常见固定表达是 알겠어요（明白了）。\n-을/ㄹ래요 类似中文口语里"我要……"，-겠- 类似"我会/我来……"。', whatItDoesBodyEn: '-을/ㄹ래요 expresses "I\'ll... / shall we...?", more direct than -고 싶어요; \\n-겠- marks intention, conjecture, or politeness, with the most common fixed phrase being 알겠어요 (got it). \\n-을/ㄹ래요 is like casual "I\'ll..." in Chinese, and -겠- is like "I will / let me..."',
    structureNote: '两块内容：①-을/ㄹ래요（要做/要不要）看词干有无收音选 을래요/ㄹ래요；\n②-겠-（意志/礼貌）初学阶段先掌握 알겠어요 这一个固定表达就够。', structureNoteEn: 'Two parts: ① -을/ㄹ래요 (will do / shall we) choose 을래요 or ㄹ래요 based on whether the stem ends in a consonant; \\n② -겠- (intention/politeness) at this stage, just master the fixed phrase 알겠어요.',
    rulesNote: '-을/ㄹ래요 收音规则和之前完全一样：\n有收音接 을래요，无收音接 ㄹ래요。\n-겠- 直接加在词干后，不用考虑收音。\n注意区分：\n-고 싶어요 是内心愿望（柔和），-을/ㄹ래요 是直接表态（更口语）。', rulesNoteEn: '-을/ㄹ래요 follows the same final-consonant rule as before: \\nwith a final consonant use 을래요, without use ㄹ래요. \\n-겠- attaches directly to the stem, no consonant check. \\nNote the difference: \\n-고 싶어요 is an inner wish (softer), -을/ㄹ래요 is a direct statement (more colloquial).',
    scenarioNote: '갈래요/먹을래요/볼래요 是朋友间最自然的邀约用语"要去吗？""要吃什么？"。\n알겠어요 则是课堂、服务场合里每天都会说的回应。\n这节课学完，日常对话的流畅度会明显提升。', scenarioNoteEn: '갈래요/먹을래요/볼래요 are the most natural ways to invite friends—"wanna go?" "what\'ll you eat?" \\n알겠어요 is a daily response in class and service settings. \\nAfter this lesson, your everyday conversations will flow much better.',
    structures: [
      {
        ko: '저는 커피 마실래요',
        zh: '我要喝咖啡。', zhEn: 'I\'ll have a coffee.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '커피', role: 'object' },
          { text: '마실래요', role: 'verb' },
        ],
      },
      {
        ko: '알겠어요. 다시 해 볼게요',
        zh: '明白了。我再试一次。', zhEn: 'Got it. I\'ll try again.',
        tokens: [
          { text: '알겠어요', role: 'verb' },
          { text: '다시 해 볼게요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音动词词干 + ㄹ래요', textEn: 'Verb stem without final consonant + ㄹ래요', examples: '가다→갈래요, 보다→볼래요, 마시다→마실래요, 공부하다→공부할래요' },
      { type: 'rule', text: '有收音动词词干 + 을래요', textEn: 'Verb stem with final consonant + 을래요', examples: '먹다→먹을래요, 읽다→읽을래요, 앉다→앉을래요' },
      { type: 'rule', text: '动词词干 + -겠어요', textEn: 'Verb stem + -겠어요', examples: '가겠어요, 먹겠어요, 알겠어요, 하겠어요（我要去、我要吃、我明白了、我来做）', examplesEn: '가겠어요, 먹겠어요, 알겠어요, 하겠어요 (I\'ll go, I\'ll eat, I understand, I\'ll do it)' },
      { type: 'usage', text: '-겠- 表达意志/推测/礼貌', textEn: '-겠- expresses intention/conjecture/politeness', examples: '알겠어요（明白了）, 하겠어요（我来做）, 어떻게 하겠어요?（打算怎么做？）', examplesEn: '알겠어요 (Got it), 하겠어요 (I\'ll do it), 어떻게 하겠어요? (What do you plan to do?)' },
      { type: 'note', text: '-겠- 不只表示将来；初学阶段先掌握 알겠어요', textEn: '-겠- isn\'t just future tense; for beginners, master 알겠어요 first', examples: '알겠어요（明白了）— 会话最高频固定表达', examplesEn: '알겠어요 (Got it) — the most frequent fixed expression in conversation' },
      { type: 'compare', text: '-고 싶어요 vs -을/ㄹ래요', examples: '커피 마시고 싶어요（内心愿望，柔和）/ 커피 마실래요（直接意愿选择，更自然口语）', examplesEn: '커피 마시고 싶어요 (inner desire, softer) / 커피 마실래요 (direct choice, more natural in speech)' },
      { type: 'note', text: '人称限制：-을/ㄹ래요 只能说"我"的意愿（陈述句）或问"你"的意愿（疑问句），不能替第三人转述意愿', textEn: 'Person restriction: -을/ㄹ래요 can only express "my" intention (in statements) or ask "your" intention (in questions); it can\'t relay a third person\'s intention', examples: '(나) 저는 갈래요 ✓ / (너) 갈래요? ✓ / (他) 그 사람은 갈래요 ✗ → 그 사람은 갈 거예요', examplesEn: '(I) 저는 갈래요 ✓ / (You) 갈래요? ✓ / (He) 그 사람은 갈래요 ✗ → 그 사람은 갈 거예요' },
      { type: 'note', text: '对长辈/上级别用 -을래요? 征询，显得随意；礼貌邀约改用 -으시겠어요?', textEn: 'Don\'t use -을래요? with elders/superiors; it sounds casual. For polite invitations, use -으시겠어요?', examples: '(朋友) 뭐 먹을래요? / (长辈) 뭐 드시겠어요?（您要吃点什么？）', examplesEn: '(Friend) 뭐 먹을래요? / (Elder) 뭐 드시겠어요? (What would you like to eat?)' },
      { type: 'example', text: '갈래요 / 먹을래요 / 볼래요 / 알겠어요 / 하겠어요 — 高频例句速记', textEn: '갈래요 / 먹을래요 / 볼래요 / 알겠어요 / 하겠어요 — quick memorization of high-frequency examples' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '같이', role: 'plain' },
          { text: '갈래요', role: 'verb' },
        ],
        zh: '要一起去吗？', zhEn: 'Want to go together?',
        swapWords: ['먹을래요', '볼래요', '할래요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '아이스 아메리카노', role: 'object' },
          { text: '마실래요', role: 'verb' },
        ],
        zh: '我要喝冰美式。', zhEn: 'I\'ll have an iced Americano.',
        swapWords: ['먹을래요', '볼래요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '알겠어요', role: 'verb' },
        ],
        zh: '明白了。', zhEn: 'Got it.',
        swapWords: ['하겠어요', '가겠어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '뭐', role: 'object' },
          { text: '먹을래요', role: 'verb' },
        ],
        zh: '要吃什么？', zhEn: 'What do you want to eat?',
        swapWords: ['마실래요', '할래요', '볼래요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☕', context: '点餐', contextEn: 'order', ko: '저는 아이스 아메리카노 마실래요.', zh: '我要喝冰美式。', zhEn: 'I\'ll have an iced Americano.' },
      { icon: '👫', context: '朋友邀约', contextEn: 'Friend\'s invitation', ko: '같이 갈래요?', zh: '要一起去吗？', zhEn: 'Want to go together?' },
      { icon: '📚', context: '学习回应', contextEn: 'Learning to respond', ko: '알겠어요. 다시 해 볼게요.', zh: '明白了，我再试一次。', zhEn: 'Got it, I\'ll try again.' },
      { icon: '🎵', context: 'KPOP', ko: '이 무대를 다시 볼래요.', zh: '我要再看这个舞台。', zhEn: 'I want to watch this stage again.' },
      { icon: '🍽️', context: '餐厅点单', contextEn: 'Ordering at a restaurant.', ko: '뭐 드실래요? 저는 냉면 먹을래요.', zh: '您要吃什么？我要吃冷面。', zhEn: 'What would you like to eat? I\'ll have cold noodles.' },
      { icon: '🚌', context: '出行', contextEn: 'Travel', ko: '거기까지 같이 갈래요? 알겠어요, 그럼 10분 후에 출발해요.', zh: '要一起去那里吗？明白了，那10分钟后出发。', zhEn: 'Want to go there together? Got it, let\'s leave in 10 minutes.' },
    ],
    mistakes: [
      { wrong: '먹ㄹ래요', correct: '먹을래요', note: '有收音词干用 을래요，먹다 → 먹을래요。', noteEn: 'For stems with a final consonant, use 을래요: 먹다 → 먹을래요.' },
      { wrong: '-겠어요 只理解成将来时', wrongEn: 'Understanding -겠어요 only as future tense', correct: '알겠어요（明白了），하겠어요（我来做）', correctEn: '알겠어요 (Got it), 하겠어요 (I\'ll do it)', note: '-겠- 语气多样，初学先记 알겠어요 这个高频固定表达。', noteEn: '-겠- has various nuances; for beginners, first memorize the high-frequency fixed expression 알겠어요.' },
      { wrong: '가ㄹ래요', correct: '갈래요', note: '无收音词干用 ㄹ래요：가다 → 갈래요，不单独写 ㄹ。', noteEn: 'For stems without a final consonant, use ㄹ래요: 가다 → 갈래요, don\'t write ㄹ separately.' },
      { wrong: '사장님, 알았어요.', correct: '사장님, 알겠습니다.', note: '对上级/正式场合用 알겠어요/알겠습니다 更礼貌。알았어요 是朋友间随意用语。', noteEn: 'Use 알겠어요/알겠습니다 for superiors/formal settings; it\'s more polite. 알았어요 is casual among friends.' },
      { wrong: '동생은 집에 갈래요.', correct: '동생은 집에 갈 거예요.', note: '中文"弟弟要回家"可直接说，但 -을/ㄹ래요 只表达"我"的意愿或问"你"，转述第三人意愿要用 -을 거예요。', noteEn: 'You can say "弟弟要回家" directly, but -을/ㄹ래요 only expresses "my" intention or asks "you"; to convey a third person\'s intention, use -을 거예요.' },
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
        specialQuiz: {
      type: 'fill',
      title: '选择正确的意志表达', titleEn: 'Choose the correct expression of intention',
      body: '根据句意选择合适的语法填入。', bodyEn: 'Choose the correct grammar based on the meaning of the sentence.',
      questions: [
        {
          pre: '저는 커피',
          post: '.',
          options: ["마실래요", "마셨어요", "마실 거예요"],
          answer: 0,
          explanation: '-을래요 表达说话人当下的意愿："我要喝咖啡"。마셨어요 是过去式。', explanationEn: '-을래요 expresses the speaker\'s current intention: "I want to drink coffee." 마셨어요 is past tense.',
        },
        {
          pre: '알',
          post: '. 다시 해 볼게요.',
          options: ["았어요", "을래요", "겠어요"],
          answer: 2,
          explanation: '알겠어요（明白了）是固定搭配，用 -겠- 表示认知确认。', explanationEn: '알겠어요 (I understand) is a fixed expression, using -겠- to indicate cognitive confirmation.',
        },
        {
          pre: '뭐',
          post: '?',
          options: ["먹어요", "먹을래요", "먹었어요"],
          answer: 1,
          explanation: '问对方意愿用 -을래요：뭐 먹을래요?（你要吃什么？）', explanationEn: 'To ask about the other person\'s intention, use -을래요: 뭐 먹을래요? (What do you want to eat?)',
        },
        {
          pre: '내일',
          post: '.',
          options: ["만났어요", "만나요", "만날래요"],
          answer: 2,
          explanation: '만날래요 表达意愿："明天见吧/明天要约吗"。', explanationEn: '만날래요 expresses intention: "Let\'s meet tomorrow / Do you want to meet tomorrow?"',
        },
      ],
    },

    compareLabel: '-고 싶어요 vs -을/ㄹ래요',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第5课</span>
  <div class="ov-title">-을/ㄹ래요 · -겠어요</div>
  <div class="ov-sub">意愿选择 + 알겠어요 礼貌回应</div>
  <div class="ov-sec">
    <h3>-을/ㄹ래요 变化</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      无收音 → <b style="color:#ff7fa8">ㄹ래요</b>：갈래요 · 볼래요 · 마실래요<br>
      有收音 → <b style="color:#2db89b">을래요</b>：먹을래요 · 읽을래요 · 앉을래요
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
      <span style="color:#e05555;text-decoration:line-through">먹ㄹ래요</span> → <span style="color:#ff7fa8">먹을래요</span>（有收音 用 을래요）<br>
      -겠어요 不只是将来 → 先记 <span style="color:#6b7ff0">알겠어요</span>
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l06',
    partNumber: 3,
    lessonNumber: 6,
    title: '무슨, 어느, 어떤',
    whatItDoes: '问什么、哪个、什么样的', whatItDoesEn: 'Asking what, which, and what kind',
    whatItDoesBody: '三个疑问词都可译成"什么/哪"，但用法不同：\n무슨 问名称内容，어느 从选项中选哪个，어떤 问性质特点。\n中文"什么歌""哪首歌""什么风格的歌"对应的就是这三个词。', whatItDoesBodyEn: 'All three question words can translate to "what/which," but they differ: \\n무슨 asks for name or content, 어느 picks one from options, 어떤 asks about nature or characteristics. \\nChinese "what song," "which song," and "what kind of song" map to these three.',
    structureNote: '这节课三个疑问词都放在名词前面，结构一样，区别只在"问的是什么"。\n记住三个典型句：\n무슨 뜻이에요？/ 어느 나라 사람이에요？/ 어떤 음식을 좋아해요？', structureNoteEn: 'This lesson puts all three question words before nouns—same structure, differing only in what they ask. \\nRemember three model sentences: \\n무슨 뜻이에요? / 어느 나라 사람이에요? / 어떤 음식을 좋아해요?',
    rulesNote: '어느 只用于疑问句，肯定句里不用（不说"어느 노래가 좋아요"来表达喜欢）。\n무슨 和 어떤 的区别：\n问"叫什么名字/是什么"用 무슨，问"属于哪种/什么特点"用 어떤。', rulesNoteEn: '어느 is only used in questions, not in statements (you don\'t say "어느 노래가 좋아요" to express liking). \\nThe difference between 무슨 and 어떤: \\nuse 무슨 to ask "what\'s it called/what is it," and 어떤 to ask "what kind/what characteristics."',
    scenarioNote: '这三个词是开启话题的万能钥匙"这是什么歌""你是哪国人""喜欢什么样的食物"。\n掌握这节课，你能问出更精准的问题，对话不再只靠"뭐예요？"。', scenarioNoteEn: 'These three words are the master key to starting topics—"what song is this," "which country are you from," "what food do you like." \\nMaster this lesson and you can ask sharper questions, no longer relying only on "뭐예요?"',
    structures: [
      {
        ko: '무슨 뜻이에요?',
        zh: '是什么意思？', zhEn: 'What does it mean?',
        tokens: [
          { text: '무슨', role: 'place' },
          { text: '뜻이에요', role: 'verb' },
        ],
      },
      {
        ko: '어떤 노래를 좋아해요?',
        zh: '喜欢什么样的歌？', zhEn: 'What kind of songs do you like?',
        tokens: [
          { text: '어떤', role: 'place' },
          { text: '노래를', role: 'object' },
          { text: '좋아해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '무슨 + 名词 — 问名称/内容/意思/属性', textEn: '무슨 + noun — asks about name/content/meaning/attribute', examples: '무슨 노래예요? 무슨 뜻이에요? 무슨 색을 좋아해요? 오늘 무슨 일이 있어요?' },
      { type: 'rule', text: '어느 + 名词 — 从选项中选哪一个（只用于疑问句）', textEn: '어느 + noun — which one from options (only used in questions)', examples: '어느 나라 사람이에요? 어느 카페에 갈래요? 어느 것이 좋아요?' },
      { type: 'rule', text: '어떤 + 名词 — 问性质/特征/类型', textEn: '어떤 + noun — asks about nature/characteristic/type', examples: '어떤 음식을 좋아해요? 어떤 사람이에요? 어떤 영화를 봐요?' },
      { type: 'compare', text: '区别方法：名称/属性→무슨，选项→어느，特征→어떤', textEn: 'How to distinguish: name/attribute→무슨, option→어느, characteristic→어떤', examples: '무슨 노래예요?（名称）/ 어느 노래가 좋아요?（选项）/ 어떤 노래를 좋아해요?（特点偏好）', examplesEn: '무슨 노래예요? (name) / 어느 노래가 좋아요? (option) / 어떤 노래를 좋아해요? (characteristic/preference)' },
      { type: 'note', text: '어느 主要用于疑问句，肯定陈述句中一般不用', textEn: '어느 is mainly used in questions, not typically in affirmative statements', examples: '이 노래가 좋아요 ✓（肯定句不用 어느）/ 어느 노래가 좋아요?（疑问句 ✓）', examplesEn: '이 노래가 좋아요 ✓ (no 어느 in affirmative) / 어느 노래가 좋아요? (question ✓)' },
      { type: 'usage', text: '무슨 일이에요? — 日常高频表达', textEn: '무슨 일이에요? — a common everyday expression', examples: '무슨 일이에요?（什么事？）/ 무슨 생각을 해요?（在想什么？）/ 무슨 말이에요?（什么意思？）', examplesEn: '무슨 일이에요? (What\'s up?) / 무슨 생각을 해요? (What are you thinking?) / 무슨 말이에요? (What do you mean?)' },
      { type: 'note', text: '三个都是冠词形，后面必须跟名词，不能单独成句；单独问"什么/哪个"要用代词 뭐·무엇·어느 것', textEn: 'All three are determiner forms, must be followed by a noun, cannot stand alone; to ask "what/which" alone, use pronouns 뭐·무엇·어느 것', examples: '무슨 노래예요? ✓（무슨+名词）/ 单独问"什么？"是 뭐예요? ✗무슨?　选哪个是 어느 거예요?', examplesEn: '무슨 노래예요? ✓ (무슨+noun) / asking "what?" alone is 뭐예요? ✗무슨? / asking "which one" is 어느 거예요?' },
      { type: 'note', text: '어떤 在陈述句里还能表"某个"（不定用法），不只是疑问', textEn: '어떤 can also mean "some/one" in statements (indefinite usage), not just in questions', examples: '어떤 사람이 왔어요.（有个人来了）/ 어떤 음식을 좋아해요?（喜欢什么样的食物？疑问）', examplesEn: '어떤 사람이 왔어요. (Someone came) / 어떤 음식을 좋아해요? (What kind of food do you like? question)' },
      { type: 'example', text: '무슨 뜻이에요? / 어느 나라 사람이에요? / 어떤 음식을 좋아해요?' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '무슨', role: 'plain' },
          { text: '노래예요', role: 'verb' },
        ],
        zh: '是什么歌？', zhEn: 'What song is it?',
        swapWords: ['무슨 뜻이에요', '무슨 일이에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어느', role: 'plain' },
          { text: '나라', role: 'subject' },
          { text: '사람이에요', role: 'verb' },
        ],
        zh: '是哪国人？', zhEn: 'What nationality?',
        swapWords: ['어느 노래가 좋아요', '어느 카페에 갈래요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어떤', role: 'plain' },
          { text: '음식을', role: 'object' },
          { text: '좋아해요', role: 'verb' },
        ],
        zh: '喜欢什么样的食物？', zhEn: 'What kind of food do you like?',
        swapWords: ['어떤 노래를 좋아해요', '어떤 사람이에요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '어떤', role: 'plain' },
          { text: '일을', role: 'object' },
          { text: '하세요', role: 'verb' },
        ],
        zh: '您做什么工作？', zhEn: 'What do you do for a living?',
        swapWords: ['무슨 일을 하세요', '어떤 공부를 해요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🔍', context: '查词', contextEn: 'Look up a word', ko: '무슨 뜻이에요?', zh: '是什么意思？', zhEn: 'What does it mean?' },
      { icon: '🎵', context: 'KPOP 问歌', contextEn: 'KPOP song quiz', ko: '무슨 노래예요?', zh: '是什么歌？', zhEn: 'What song is it?' },
      { icon: '🌏', context: '认识新朋友', contextEn: 'Meeting new friends', ko: '어느 나라 사람이에요?', zh: '是哪国人？', zhEn: 'What nationality?' },
      { icon: '🎨', context: '问颜色（名称）', contextEn: 'Asking about colors (names)', ko: '이거 무슨 색이에요? 오늘 무슨 일이 있어요?', zh: '这是什么颜色？今天有什么事？', zhEn: 'What color is this? What\'s going on today?' },
      { icon: '🏪', context: '便利店/超市', contextEn: 'Convenience store / supermarket', ko: '어떤 음료를 좋아해요? 저는 차가운 것을 좋아해요.', zh: '喜欢什么饮料？我喜欢凉的。', zhEn: 'What drink do you like? I like cold ones.' },
      { icon: '🤝', context: '初次见面', contextEn: 'first meeting', ko: '어느 나라 사람이에요? 어떤 일을 하세요?', zh: '是哪国人？做什么工作？', zhEn: 'What nationality are you? What do you do?' },
    ],
    mistakes: [
      { wrong: '어느 뜻이에요?（问意思）', wrongEn: '어느 뜻이에요? (asking meaning)', correct: '무슨 뜻이에요?', note: '问名称/内容用 무슨，어느 是从选项里选一个，不适合问意思。', noteEn: 'Use 무슨 for names/content; 어느 picks from options, not for meaning.' },
      { wrong: '무슨/어떤 混用', wrongEn: 'Mixing up 무슨/어떤', correct: '무슨 노래예요?（问名称）/ 어떤 노래를 좋아해요?（问偏好）', correctEn: '무슨 노래예요? (asking name) / 어떤 노래를 좋아해요? (asking preference)', note: '问这首歌叫什么名用 무슨，问喜欢什么类型用 어떤。', noteEn: 'Use 무슨 to ask the song\'s name, 어떤 to ask what type you like.' },
      { wrong: '어느 음식이 맛있어요（肯定陈述句）', wrongEn: '어느 음식이 맛있어요 (affirmative statement)', correct: '이 음식이 맛있어요 / 어떤 음식이 맛있어요?', note: '어느 主要用于疑问句中选择选项，肯定陈述句里用感觉很奇怪。', noteEn: '어느 is mainly for choosing options in questions; it sounds odd in affirmative statements.' },
      { wrong: '어떤 뜻이에요?', correct: '무슨 뜻이에요?', note: '问意思/名称用 무슨，어떤 是问性质和特征时用。', noteEn: 'Use 무슨 for meaning/name, 어떤 for qualities and characteristics.' },
      { wrong: '"什么颜色" 到底用哪个？', wrongEn: 'Which one for "what color"?', correct: '무슨 색이에요?（问名字）/ 어떤 색을 좋아해요?（问偏好、色调）/ 어느 색?（当面有几种可选时）', correctEn: '무슨 색이에요? (asking name) / 어떤 색을 좋아해요? (asking preference/shade) / 어느 색? (when options are present)', note: '同一个"什么颜色"随语境切换。问"是啥颜色"用 무슨；问"喜欢什么风格的色"用 어떤；面前有几块可挑时用 어느。', noteEn: 'The same "what color" shifts by context: 무슨 for what it is, 어떤 for what style you like, 어느 when picking from visible options.' },
      { wrong: '무슨?（想单独问"什么？"）', wrongEn: '무슨? (wanting to ask "what?" alone)', correct: '뭐예요?', note: '무슨 是冠词形必须带名词，不能单独问；单独问"什么？"用代词 뭐/무엇，别把中文能独立成句的"什么"直接套过来。', noteEn: '무슨 is an attributive form that needs a noun; for "what?" alone use 뭐/무엇, don\'t carry over Chinese\'s standalone "what."' },
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
        specialQuiz: {
      type: 'fill',
      title: '选择合适的疑问词', titleEn: 'Choose the right question word',
      body: '根据句意选择 무슨/어느/어떤 填入。', bodyEn: 'Choose 무슨/어느/어떤 based on the sentence meaning.',
      questions: [
        {
          pre: '이게',
          post: '뜻이에요?',
          options: ["어느", "무슨", "어떤"],
          answer: 1,
          explanation: '무슨 뜻이에요? 询问"什么意思"，무슨 问事物属性/类别。', explanationEn: '무슨 뜻이에요? asks "what does it mean"; 무슨 asks about attributes/categories.',
        },
        {
          pre: '두 개 중에',
          post: '노래를 더 좋아해요?',
          options: ["어느", "무슨", "어떤"],
          answer: 0,
          explanation: '어느 在有限选项中做选择："两个中更喜欢哪个？"', explanationEn: '어느 chooses among limited options: "which of the two do you prefer?"',
        },
        {
          pre: '너는',
          post: '음식을 좋아해?',
          options: ["무슨", "어느", "어떤"],
          answer: 2,
          explanation: '어떤 问"什么样的"，询问特征/类型，不是有限选项。', explanationEn: '어떤 asks "what kind of," about traits/types, not limited options.',
        },
        {
          pre: '',
          post: '나라에 가고 싶어요?',
          options: ["어느", "무슨", "어떤"],
          answer: 0,
          explanation: '어느 나라（哪个国家），在有限选项中选择。', explanationEn: 'Which country? Choose from the given options.',
        },
      ],
    },

    compareLabel: '무슨 / 어느 / 어떤 对比', compareLabelEn: 'Comparison of 무슨 / 어느 / 어떤',
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
    lessonNumber: 7,
    title: '그렇지만, 그런데',
    whatItDoes: '说"但是/不过"，转折话题', whatItDoesEn: 'Say "but/though" to shift topics',
    whatItDoesBody: '그렇지만 是明确转折"但是"；\n그런데 语气更口语，可以是轻转折"不过"，也可以用来推进话题或引入新信息。\n这节课和P2的 그렇지만 有重叠重点是新增 그런데，弄清楚两者的区别。\n中文"但是"和"不过"的区别类似：\n그렇지만 ≈ 但是（正式转折），그런데 ≈ 不过（口语，还能转换话题）。', whatItDoesBodyEn: '그렇지만 is a clear contrast "but"; \\n그런데 is more colloquial, a soft "though," and can also advance the topic or introduce new info. \\nThis lesson overlaps with P2\'s 그렇지만, but the focus is the new 그런데—clarify the difference. \\nIt\'s like Chinese "但是" vs "不过": \\n그렇지만 ≈ 但是 (formal contrast), 그런데 ≈ 不过 (colloquial, also shifts topics).',
    structureNote: '两个连词都放在第二句句首，结构完全一样。\n区别在语气和功能：\n그렇지만 只能做转折，그런데 还能转换话题（"对了，这个词什么意思？"）。', structureNoteEn: 'Both conjunctions go at the start of the second sentence, with identical structure. \\nThe difference is tone and function: \\n그렇지만 only contrasts, while 그런데 can also shift topics ("By the way, what does this word mean?").',
    rulesNote: '判断用哪个很简单：\n前后有明确对比关系用 그렇지만；\n想轻松转换话题或信息时用 그런데。\n口语里 그런데 远比 그렇지만 常见，可以覆盖大多数场合。', rulesNoteEn: 'Choosing is simple: \\nUse 그렇지만 for a clear contrast; \\nuse 그런데 to casually shift topics or info. \\nIn speech, 그런데 is far more common than 그렇지만 and covers most situations.',
    scenarioNote: '그런데 是韩语口语里出现最频繁的连词之一用来插入新话题、提出疑问、轻轻转折。\n学会 그런데，你的对话会更自然流畅，不再只有"但是"这一种过渡方式。', scenarioNoteEn: '그런데 is one of the most frequent conjunctions in spoken Korean, used to insert new topics, ask questions, or make soft transitions. \\nMastering 그런데 makes your conversations more natural and fluid—no longer stuck with just "but" as a transition.',
    structures: [
      {
        ko: '이 노래는 좋아요. 그렇지만 어려워요',
        zh: '这首歌很好，但是很难。', zhEn: 'This song is good, but it\'s hard.',
        tokens: [
          { text: '이 노래는', role: 'subject' },
          { text: '좋아요.', role: 'verb' },
          { text: '그렇지만', role: 'plain' },
          { text: '어려워요', role: 'verb' },
        ],
      },
      {
        ko: '그런데 이 단어는 무슨 뜻이에요?',
        zh: '不过这个单词是什么意思？', zhEn: 'But what does this word mean?',
        tokens: [
          { text: '그런데', role: 'plain' },
          { text: '이 단어는', role: 'subject' },
          { text: '무슨 뜻이에요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'compare', text: '그렇지만 — 明确转折，前后信息形成对比', textEn: '그렇지만 — clear contrast, the information before and after forms a comparison', examples: '한국어는 재미있어요. 그렇지만 어려워요.（韩语很有意思，但是难。）', examplesEn: 'Korean is fun. But it\'s hard.' },
      { type: 'compare', text: '그런데 — 轻转折/话题推进，口语高频', textEn: '그런데 — mild contrast/topic progression, common in spoken language', examples: '이 노래는 좋아요. 그런데 발음이 빨라요.（这首歌很好，不过发音很快。）', examplesEn: 'This song is good. But the pronunciation is fast.' },
      { type: 'note', text: '그런데 有话题转换功能，그렇지만 没有', textEn: '그런데 can shift topics, but 그렇지만 cannot.', examples: '그런데 무슨 뜻이에요? — 不能换成 그렇지만', examplesEn: '그런데 무슨 뜻이에요? — cannot be replaced with 그렇지만' },
      { type: 'rule', text: '两个连词都放在第二句句首', textEn: 'Both conjunctions go at the start of the second sentence.', examples: '문장1. 그렇지만/그런데 문장2.' },
      { type: 'compare', text: '그리고 vs 그렇지만', examples: '공부해요. 그리고 드라마도 봐요.（补充）/ 공부해요. 그렇지만 어려워요.（转折）', examplesEn: 'I study. And I also watch dramas. (addition) / I study. But it\'s hard. (contrast)' },
      { type: 'usage', text: '顺接与逆接区分', textEn: 'Distinguishing between sequential and contrastive connections', examples: '前后有对比 → 그렇지만/그런데；信息补充 → 그리고', examplesEn: 'Contrast between before and after → 그렇지만/그런데; adding information → 그리고' },
      { type: 'compare', text: '句首连词 그렇지만 vs 词尾 -지만：中文"但是"能在一句中间连接，韩语一句里连接要用词尾 -지만，그렇지만 必须另起一句（前句收尾）', textEn: 'Sentence-initial 그렇지만 vs. verb-ending -지만: In Chinese, "but" can connect within one sentence, but in Korean, to connect within a sentence you use the ending -지만; 그렇지만 must start a new sentence (the previous one ends).', examples: '한국어는 재미있지만 어려워요.（一句内，用 -지만）/ 한국어는 재미있어요. 그렇지만 어려워요.（两句，前句用句号收尾）', examplesEn: 'Korean is fun but hard. (one sentence, with -지만) / Korean is fun. But it\'s hard. (two sentences, previous ends with a period)' },
      { type: 'note', text: '口语里 그런데 常缩读成 근데，听力里高频出现，意思一样', textEn: 'In spoken Korean, 그런데 often shortens to 근데, which appears frequently in listening and means the same thing.', examples: '그런데 이거 알아요? = 근데 이거 알아요?（话说，你知道这个吗？）', examplesEn: '그런데 이거 알아요? = 근데 이거 알아요? (By the way, do you know this?)' },
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
        zh: '韩语有意思，但是难。', zhEn: 'Korean is interesting, but it\'s hard.',
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
        zh: '这个视频有意思，不过有点长。', zhEn: 'This video is interesting, but it\'s a bit long.',
        swapWords: ['그렇지만 조금 길어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그런데', role: 'plain' },
          { text: '이 단어는', role: 'subject' },
          { text: '무슨 뜻이에요', role: 'verb' },
        ],
        zh: '不过这个单词是什么意思？', zhEn: 'But what does this word mean?',
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
        zh: '食物很好吃，不过有点辣。', zhEn: 'The food is delicious, but it\'s a bit spicy.',
        swapWords: ['그렇지만 좀 매워요', '그런데 좀 비싸요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习反馈', contextEn: 'Study feedback', ko: '한국어는 재미있어요. 그렇지만 문법은 어려워요.', zh: '韩语有意思，但是语法难。', zhEn: 'Korean is interesting, but the grammar is hard.' },
      { icon: '🎵', context: 'KPOP 评论', contextEn: 'KPOP comment', ko: '이 노래는 좋아요. 그런데 발음이 빨라요.', zh: '这首歌很好，不过发音很快。', zhEn: 'This song is good, but the pronunciation is fast.' },
      { icon: '💬', context: '话题转换', contextEn: 'Topic shift', ko: '그런데 이 단어는 무슨 뜻이에요?', zh: '话说，这个单词是什么意思？', zhEn: 'By the way, what does this word mean?' },
      { icon: '🏃', context: '两者互换', contextEn: 'The two are interchangeable', ko: '선수들이 다 피곤해요. 그렇지만 열심히 훈련해요.', zh: '运动员们都很累，但是努力训练。', zhEn: 'The athletes are all tired, but they train hard.' },
      { icon: '🍽️', context: '餐厅', contextEn: 'Restaurant', ko: '이 식당은 맛있어요. 그런데 좀 비싸요.', zh: '这家餐厅很好吃，不过有点贵。', zhEn: 'This restaurant is delicious, but a bit pricey.' },
      { icon: '🌧️', context: '天气变化', contextEn: 'Weather changes', ko: '오늘은 날씨가 좋아요. 그렇지만 내일은 비가 와요.', zh: '今天天气好，但是明天会下雨。', zhEn: 'The weather is nice today, but it\'ll rain tomorrow.' },
    ],
    mistakes: [
      { wrong: '공부해요. 그렇지만 드라마도 봐요.', correct: '공부해요. 그리고 드라마도 봐요.', note: '补充信息用 그리고，前后有对比才用 그렇지만/그런데。', noteEn: 'Use 그리고 for adding information; use 그렇지만/그런데 only when there\'s a contrast.' },
      { wrong: '把 그런데 只理解成强转折', wrongEn: 'Understanding 그런데 only as a strong contrast', correct: '그런데 무슨 뜻이에요?（话题推进）', correctEn: '그런데 무슨 뜻이에요? (topic shift)', note: '그런데 在口语中很常见，不一定是强转折，也可以只是话题推进。', noteEn: '그런데 is very common in spoken Korean—it\'s not always a strong contrast; it can just shift the topic.' },
      { wrong: '用 그렇지만 推进话题', wrongEn: 'Using 그렇지만 to shift the topic', correct: '그런데 이거 알아요?（话题推进）', correctEn: '그런데 이거 알아요? (topic shift)', note: '话题推进/引入新信息只能用 그런데，그렇지만 只有转折功能。', noteEn: 'Only 그런데 can shift the topic or introduce new info; 그렇지만 is purely contrastive.' },
      { wrong: '그리고 位置用了 그런데', wrongEn: 'Used 그런데 where 그리고 should go', correct: '공부해요. 그리고 운동도 해요.', note: '补充并列信息用 그리고，不是 그런데。', noteEn: 'Use 그리고 to add parallel info, not 그런데.' },
      { wrong: '한국어는 재미있어요 그렇지만 어려워요.', correct: '한국어는 재미있어요. 그렇지만 어려워요.（或一句内：재미있지만 어려워요.）', correctEn: '한국어는 재미있어요. 그렇지만 어려워요. (or in one sentence: 재미있지만 어려워요.)', note: '中文"但是"能在一句中间连接，但 그렇지만 是句首连词，前面必须先用句号收尾；想一句内连接要改用词尾 -지만。', noteEn: 'In Chinese, "but" can connect within one sentence, but 그렇지만 is a sentence-initial conjunction—you need a period before it; to connect within a sentence, use the ending -지만.' },
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
        specialQuiz: {
      type: 'fill',
      title: '选择合适的连接词', titleEn: 'Choose the right conjunction',
      body: '根据前后句关系选择 그렇지만 或 그런데。', bodyEn: 'Choose 그렇지만 or 그런데 based on the relationship between the sentences.',
      questions: [
        {
          pre: '김치가 매워요.',
          post: '맛있어요.',
          options: ["그렇지만", "그런데", "그래서"],
          answer: 0,
          explanation: '前后有转折（辣→但好吃），用 그렇지만 表示对比转折。', explanationEn: 'When there\'s a contrast (spicy → but tasty), use 그렇지만 to show contrast.',
        },
        {
          pre: '어제 드라마를 봤어요.',
          post: '거기 나온 노래가 뭐예요?',
          options: ['그렇지만', '그런데', '그러면'],
          answer: 1,
          explanation: '转换话题/顺便提起："昨天看剧了。对了里面那首歌是什么？"用 그런데。', explanationEn: 'To shift the topic or bring something up: "I watched a show yesterday. By the way, what\'s that song in it?" Use 그런데.',
        },
        {
          pre: '날씨가 추웠어요.',
          post: '눈이 왔어요.',
          options: ["그렇지만", "그래서", "그런데"],
          answer: 2,
          explanation: '补充信息："天气很冷，而且下雪了。"그런데 也可表补充说明。', explanationEn: 'Adding info: "It\'s cold, and it\'s snowing." 그런데 can also add supplementary info.',
        },
        {
          pre: '이 노래는 좋아요.',
          post: '가사가 슬퍼요.',
          options: ["그러니까", "그런데", "그렇지만"],
          answer: 2,
          explanation: '明确转折：歌好但歌词悲伤 → 그렇지만。', explanationEn: 'Clear contrast: the song is good but the lyrics are sad → 그렇지만.',
        },
      ],
    },

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
    lessonNumber: 8,
    title: '그래서, 그러니까',
    whatItDoes: '说"所以/因此"，连接原因结果', whatItDoesEn: 'Say "so/therefore" to link cause and result',
    whatItDoesBody: '그래서 连接原因和自然结果；\n그러니까 也表示所以/因此，口语中常带总结、提醒或劝告的语气。\n两个都对应中文"所以"，区别在 그러니까 更像"所以说……"，语气更强调。', whatItDoesBodyEn: '그래서 links a cause to a natural result; \\n그러니까 also means so/therefore, often with a tone of summary, reminder, or advice in speech. \\nBoth match Chinese "所以," but 그러니까 is more like "so I\'m saying..." with stronger emphasis.',
    structureNote: '两个连词都放第二句句首，原因在前，结果在后，顺序不能反。\n区别：\n그래서 陈述自然结果，그러니까 常接建议或提醒（所以你该……）。', structureNoteEn: 'Both conjunctions go at the start of the second sentence, with cause first and result after—order can\'t be reversed. \\nDifference: \\n그래서 states a natural result, while 그러니까 often leads to advice or a reminder (so you should...).',
    rulesNote: '原因-结果顺序固定，不能倒装（비가 와요. 그래서 집에 있어요. ✓）。\n그래서 和 그러니까 不用于转折转折用 그런데/그렇지만。\n两词区别：\n그래서=自然结果，그러니까=带劝告语气的总结。', rulesNoteEn: 'Cause-result order is fixed and can\'t be inverted (비가 와요. 그래서 집에 있어요. ✓). \\n그래서 and 그러니까 aren\'t used for contrast—use 그런데/그렇지만 for that. \\nDifference: \\n그래서 = natural result, 그러니까 = summary with an advisory tone.',
    scenarioNote: '日常生活中因为……所以……无处不在"因为下雨所以在家""因为太忙所以不能去"。\n掌握 그래서，你能解释原因、表达关联，让对话更有逻辑感。', scenarioNoteEn: 'In daily life, "because... so..." is everywhere—"staying home because it\'s raining," "can\'t go because I\'m too busy." \\nMastering 그래서 lets you explain reasons and link ideas, making your conversations more logical.',
    structures: [
      {
        ko: '비가 와요. 그래서 집에 있어요',
        zh: '下雨。所以在家。', zhEn: 'It\'s raining. So I\'m staying home.',
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
        zh: '这个语法很重要。所以请复习。', zhEn: 'This grammar is important. So please review it.',
        tokens: [
          { text: '이 문법은', role: 'subject' },
          { text: '중요해요.', role: 'verb' },
          { text: '그러니까', role: 'plain' },
          { text: '복습하세요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '그래서 — 原因 + 그래서 + 自然结果', textEn: '그래서 — reason + 그래서 + natural result', examples: '비가 와요. 그래서 집에 있어요.（下雨了，所以待在家。）', examplesEn: '비가 와요. 그래서 집에 있어요. (It\'s raining, so I\'m staying home.)' },
      { type: 'rule', text: '그러니까 — 原因 + 그러니까 + 结果/建议（带提醒语气）', textEn: '그러니까 — reason + 그러니까 + result/suggestion (with a reminding tone)', examples: '지금 길이 막힙니다. 그러니까 빨리 가세요.（现在堵车，所以请快点走。）', examplesEn: 'The road is jammed now. So please hurry.' },
      { type: 'example', text: '그러니까 推断：내일 주말이에요. 그러니까 사람이 많을 거예요.', textEn: '그러니까 inference: Tomorrow is the weekend. So there will be a lot of people.' },
      { type: 'note', text: '原因-结果顺序固定：原因在前，그래서/그러니까 + 结果', textEn: 'Cause-effect order is fixed: cause first, then 그래서/그러니까 + result.', examples: '집에 있어요. 그래서 비가 와요. ✗ / 비가 와요. 그래서 집에 있어요. ✓' },
      { type: 'compare', text: '그래서/그러니까 vs 그런데', examples: '그래서（所以，原因结果）/ 그런데（不过，转折）', examplesEn: '그래서 (so, cause-result) / 그런데 (but, contrast)' },
      { type: 'compare', text: '그래서 vs 그러니까', examples: '그래서（自然结果）/ 그러니까（带提醒/劝告语气，口语更强调）', examplesEn: '그래서 (natural result) / 그러니까 (with a reminder/advice tone, more emphatic in speech)' },
      { type: 'note', text: '硬规则：想让对方"去做某事"（命令句/劝诱句"…하세요/…합시다"）只能用 그러니까，그래서 后面不能接命令或劝诱', textEn: 'Hard rule: To tell someone to do something (imperative/suggestive forms like …하세요/…합시다), only 그러니까 works; 그래서 cannot be followed by a command or suggestion.', examples: '비가 와요. 그러니까 우산을 가져가세요. ✓ / 비가 와요. 그래서 우산을 가져가세요. ✗（그래서 后不接命令）', examplesEn: 'It\'s raining. So take an umbrella. ✓ / It\'s raining. So take an umbrella. ✗ (그래서 can\'t be followed by a command)' },
      { type: 'usage', text: '高频模式：原因 + 그래서/그러니까 + 行动/建议', textEn: 'High-frequency pattern: cause + 그래서/그러니까 + action/suggestion', examples: '배가 고파요. 그래서 밥을 먹어요. / 피곤해요. 그러니까 좀 쉬세요.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘은', role: 'time' },
          { text: '바빠요.', role: 'verb' },
          { text: '그래서', role: 'plain' },
          { text: '공부 못 해요', role: 'verb' },
        ],
        zh: '今天很忙。所以不能学习。', zhEn: 'I\'m busy today. So I can\'t study.',
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
        zh: '这首歌发音快。所以跟读难。', zhEn: 'This song has fast pronunciation. So it\'s hard to repeat after.',
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
        zh: '这个语法很重要。所以一定要复习。', zhEn: 'This grammar is important. So you must review it.',
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
        zh: '肚子饿。所以吃饭。', zhEn: 'I\'m hungry. So I\'ll eat.',
        swapWords: ['그래서 카페에 가요', '그러니까 빨리 가세요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🌧️', context: '天气原因', contextEn: 'weather-related reason', ko: '비가 와요. 그래서 집에 있어요.', zh: '下雨。所以在家。', zhEn: 'It\'s raining. So I\'m staying home.' },
      { icon: '📚', context: '学习反馈', contextEn: 'Study feedback', ko: '이 문법은 어려워요. 그래서 다시 복습해요.', zh: '这个语法难。所以重新复习。', zhEn: 'This grammar is hard. So I\'ll review it again.' },
      { icon: '🚗', context: '交通推断', contextEn: 'Traffic inference', ko: '지금 길이 막힙니다. 그러니까 빨리 가세요.', zh: '现在堵车。所以快走吧。', zhEn: 'It\'s jammed now. So let\'s go quickly.' },
      { icon: '📅', context: '周末推断', contextEn: 'Weekend inference', ko: '내일 주말이에요. 그러니까 사람이 많을 거예요.', zh: '明天是周末。所以人会很多。', zhEn: 'Tomorrow is the weekend. So there will be many people.' },
      { icon: '😴', context: '疲倦原因', contextEn: 'Tiredness cause', ko: '어제 많이 걸었어요. 그래서 오늘 다리가 아파요.', zh: '昨天走了很多路，所以今天腿疼。', zhEn: 'I walked a lot yesterday, so my legs hurt today.' },
      { icon: '🏥', context: '医院就诊', contextEn: 'Hospital visit', ko: '열이 나요. 그러니까 오늘은 쉬세요.', zh: '发烧了，所以今天休息吧。', zhEn: 'I have a fever, so let\'s rest today.' },
    ],
    mistakes: [
      { wrong: '집에 있어요. 그래서 비가 와요.（原因结果反了）', wrongEn: 'I\'m at home. So it\'s raining. (Cause and effect reversed)', correct: '비가 와요. 그래서 집에 있어요.', note: '原因在前，그래서 结果在后，顺序不能反。', noteEn: 'Cause comes first, 그래서 result after; the order can\'t be reversed.' },
      { wrong: '그래서와 그런데 混用', wrongEn: 'Mixing up 그래서 and 그런데', correct: '그래서（所以，原因结果）/ 그런데（不过，转折）', correctEn: '그래서 (so, cause-result) / 그런데 (but, contrast)', note: '两个词意思完全不同，原因结果用 그래서/그러니까。', noteEn: 'The two words have completely different meanings; use 그래서/그러니까 for cause and result.' },
      { wrong: '그래서 前后顺序弄反', wrongEn: 'The order of 그래서 is reversed', correct: '피곤해요. 그래서 쉬어요.', note: '그래서 前是原因，后是结果，顺序不能换。', noteEn: 'With 그래서, the cause comes first and the result follows—the order can\'t be swapped.' },
      { wrong: '그런데 位置用了 그래서', wrongEn: 'Used 그래서 where 그런데 was needed', correct: '이 노래는 좋아요. 그런데 발음이 빨라요.', note: '转折用 그런데，그래서 只用于原因-结果关系。', noteEn: 'Use 그런데 for contrast; 그래서 is only for cause-result relationships.' },
      { wrong: '피곤해요. 그래서 좀 쉬세요.', correct: '피곤해요. 그러니까 좀 쉬세요.', note: '让对方去做（命令句/劝诱句）只能用 그러니까，그래서 后面不能接命令或劝诱。', noteEn: 'When telling someone to do something (commands/suggestions), only 그러니까 works—그래서 can\'t be followed by a command or suggestion.' },
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
        specialQuiz: {
      type: 'fill',
      title: '选择合适的因果连接词', titleEn: 'Choose the right cause-result conjunction',
      body: '根据前后句关系选择 그래서 或 그러니까。', bodyEn: 'Choose 그래서 or 그러니까 based on the relationship between the clauses.',
      questions: [
        {
          pre: '비가 와요.',
          post: '우산을 가져가세요.',
          options: ["그러니까", "그래서", "그렇지만"],
          answer: 0,
          explanation: '让对方"带伞"是命令句（가져가세요），그래서 后面不能接命令或劝诱，只能用 그러니까："下雨了，所以请带伞。"', explanationEn: 'Telling someone to "bring an umbrella" is a command (가져가세요), and 그래서 can\'t be followed by a command or suggestion—only 그러니까 works: "It\'s raining, so please bring an umbrella."',
        },
        {
          pre: '이 문법은 중요해요.',
          post: '꼭 복습하세요.',
          options: ["그러니까", "그래서", "그런데"],
          answer: 0,
          explanation: '그러니까 带有主观说服力："这语法很重要，所以一定要复习。"', explanationEn: '그러니까 carries subjective persuasion: "This grammar is important, so you must review it."',
        },
        {
          pre: '어제 많이 걸었어요.',
          post: '다리가 아파요.',
          options: ["그래서", "그러니까", "그렇지만"],
          answer: 0,
          explanation: '客观因果关系：走了很多路→所以腿疼。用 그래서。', explanationEn: 'Objective cause and effect: walked a lot → so legs hurt. Use 그래서.',
        },
        {
          pre: '내일 시험이에요.',
          post: '오늘 일찍 자요.',
          options: ["그런데", "그래서", "그러니까"],
          answer: 2,
          explanation: '带有推理/劝告："明天考试，所以今天早睡。"그러니까 语气更强。', explanationEn: 'With reasoning/advice: "The exam is tomorrow, so sleep early tonight." 그러니까 is stronger.',
        },
      ],
    },

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
    lessonNumber: 9,
    title: '-(으)러 가다/오다, -을/ㄹ까요?',
    whatItDoes: '说"去做某事"，以及提议询问', whatItDoesEn: 'Say "go to do something" and make suggestions',
    whatItDoesBody: '-(으)러 가다/오다 表达"去/来做某事"的目的；\n-을/ㄹ까요? 用于提议或询问意见，表示"要不要……？"。\n中文"去吃饭"直接说，韩语需要目的助词 -(으)러 连接动词和去/来。', whatItDoesBodyEn: '-(으)러 가다/오다 expresses the purpose of "going/coming to do something"; \\n-을/ㄹ까요? is for suggestions or asking opinions, meaning "shall we...?" \\nChinese says "go eat" directly, but Korean needs the purpose particle -(으)러 to link the verb with go/come.',
    structureNote: '两块内容：①-(으)러 가다/오다（去做某事）目的动词加 러/으러，后接 가요/와요；\n②-을/ㄹ까요?（提议/询问）接在动词词干后，看有无收音选 을/ㄹ。', structureNoteEn: 'Two parts: ① -(으)러 가다/오다 (go to do something)—add 러/으러 to the purpose verb, then 가요/와요; \\n② -을/ㄹ까요? (suggestion/question)—attach to the verb stem, choosing 을/ㄹ based on whether there\'s a final consonant.',
    rulesNote: '-(으)러 的收音规则：\n有收音接 으러（먹으러），无收音接 러（보러）。\n注意区分 -(으)러 가요（去做）和 -고 가요（做了再走）前者是目的，后者是顺序。\n-을/ㄹ까요 形容词也能用（좋을까요？）。', rulesNoteEn: '-(으)러 final consonant rule: \\nWith a final consonant, use 으러 (먹으러); without, use 러 (보러). \\nNote the difference between -(으)러 가요 (go to do) and -고 가요 (do and then go)—the former is purpose, the latter is sequence. \\n-을/ㄹ까요 also works with adjectives (좋을까요?).',
    scenarioNote: '뭐 먹으러 갈까요？这一句几乎是韩国人约饭时的标准开场白。\n-(으)러 가다 和 -을/ㄹ까요 配合使用，就能邀约、提议、表达目的，日常对话里会一直用到。', scenarioNoteEn: '뭐 먹으러 갈까요? is practically the standard opener for meal invitations in Korea. \\nCombining -(으)러 가다 and -을/ㄹ까요 lets you invite, suggest, and express purpose—you\'ll use it constantly in daily conversation.',
    structures: [
      {
        ko: '카페에 공부하러 가요',
        zh: '去咖啡店学习。', zhEn: 'Go to a café to study.',
        tokens: [
          { text: '카페에', role: 'place' },
          { text: '공부하러', role: 'verb' },
          { text: '가요', role: 'verb' },
        ],
      },
      {
        ko: '밥 먹으러 갈까요?',
        zh: '要去吃饭吗？', zhEn: 'Shall we go eat?',
        tokens: [
          { text: '밥', role: 'object' },
          { text: '먹으러', role: 'verb' },
          { text: '갈까요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '无收音动词 + 러 가다/오다', textEn: 'Verb without batchim + 러 가다/오다', examples: '보다→보러 가요, 마시다→마시러 가요, 공부하다→공부하러 가요' },
      { type: 'rule', text: '有收音动词 + 으러 가다/오다', textEn: 'Verb with batchim + 으러 가다/오다', examples: '먹다→먹으러 가요, 읽다→읽으러 가요, 찾다→찾으러 가요' },
      { type: 'rule', text: '无收音动词 + ㄹ까요?', textEn: 'Verb without batchim + ㄹ까요?', examples: '가다→갈까요?, 보다→볼까요?, 마시다→마실까요?' },
      { type: 'rule', text: '有收音动词 + 을까요?', textEn: 'Verb with batchim + 을까요?', examples: '먹다→먹을까요?, 읽다→읽을까요?' },
      { type: 'note', text: '-을/ㄹ까요? 形容词/名词也能接', textEn: '-을/ㄹ까요? can also attach to adjectives and nouns', examples: '얼마일까요?（多少钱呢？）, 좋을까요?（好吗？）', examplesEn: '얼마일까요? (How much is it?), 좋을까요? (Would it be good?)' },
      { type: 'compare', text: '-(으)러 가요 vs -고 가요', examples: '먹으러 가요（去吃）/ 먹고 가요（吃了再走）— 目的 vs 先后顺序', examplesEn: '먹으러 가요 (go to eat) / 먹고 가요 (eat and then go)—purpose vs. sequence' },
      { type: 'usage', text: '日常高频模式', textEn: 'High-frequency daily pattern', examples: '뭐 먹으러 갈까요? / 카페에 공부하러 가요. / 같이 볼까요?' },
      { type: 'note', text: '-(으)ㄹ까요? 有两种意思，靠主语区分：主语是"我们/我"时表提议(要不要…?)；主语是第三人称或不受自己控制的事时表推测(会…吗/…呢?)。别一律理解成"要不要"', textEn: '-(으)ㄹ까요? has two meanings, distinguished by the subject: when the subject is "we/I," it\'s a suggestion (shall we...?); when the subject is third person or something beyond your control, it\'s a guess (will it...? / I wonder...). Don\'t always read it as "shall we."', examples: '같이 갈까요?（我们要一起去吗？提议）/ 비가 올까요?（会下雨吗？推测）', examplesEn: '같이 갈까요? (Shall we go together?—suggestion) / 비가 올까요? (Will it rain?—guess)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '카페에', role: 'place' },
          { text: '공부하러', role: 'verb' },
          { text: '가요', role: 'verb' },
        ],
        zh: '去咖啡店学习。', zhEn: 'Go to a café to study.',
        swapWords: ['먹으러 가요', '보러 가요', '마시러 가요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '콘서트를', role: 'object' },
          { text: '보러', role: 'verb' },
          { text: '가요', role: 'verb' },
        ],
        zh: '去看演唱会。', zhEn: 'Go to see a concert.',
        swapWords: ['먹으러 가요', '공부하러 가요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '같이', role: 'plain' },
          { text: '갈까요', role: 'verb' },
        ],
        zh: '要一起去吗？', zhEn: 'Want to go together?',
        swapWords: ['먹을까요', '볼까요', '할까요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '도서관에', role: 'place' },
          { text: '책을', role: 'object' },
          { text: '빌리러 가요', role: 'verb' },
        ],
        zh: '去图书馆借书。', zhEn: 'Go to the library to borrow books.',
        swapWords: ['공부하러 가요', '반납하러 가요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '☕', context: '去咖啡店', contextEn: 'Go to a café', ko: '카페에 공부하러 가요.', zh: '去咖啡店学习。', zhEn: 'Go to a café to study.' },
      { icon: '🍜', context: '约饭', contextEn: 'Make plans to eat', ko: '밥 먹으러 갈까요?', zh: '要去吃饭吗？', zhEn: 'Shall we go eat?' },
      { icon: '🎤', context: 'KPOP', ko: '콘서트를 보러 가요.', zh: '去看演唱会。', zhEn: 'Go to see a concert.' },
      { icon: '📺', context: '提议', contextEn: 'Suggest', ko: '이 영상을 볼까요?', zh: '要看这个视频吗？', zhEn: 'Want to watch this video?' },
      { icon: '🏪', context: '便利店', contextEn: 'Convenience store', ko: '편의점에 뭔가 사러 가요.', zh: '去便利店买东西。', zhEn: 'Go to the convenience store to buy things.' },
      { icon: '🏋️', context: '健身房', contextEn: 'Gym', ko: '운동하러 헬스장에 갈까요?', zh: '要去健身房运动吗？', zhEn: 'Want to go work out at the gym?' },
    ],
    mistakes: [
      { wrong: '먹러 가요（有收音忘加 으）', wrongEn: '먹러 가요 (forgot to add 으 after a final consonant)', correct: '먹으러 가요', note: '有收音用 으러，먹다 → 먹으러 가요。', noteEn: 'Use 으러 after a final consonant: 먹다 → 먹으러 가요.' },
      { wrong: '먹으러 가요 vs 먹고 가요 混用', wrongEn: 'Mixing up 먹으러 가요 and 먹고 가요', correct: '먹으러 가요（去吃）/ 먹고 가요（吃了再走）', correctEn: '먹으러 가요 (go to eat) / 먹고 가요 (eat then go)', note: '-(으)러 是目的，-고 是先后顺序，意思不同。', noteEn: '-(으)러 indicates purpose, -고 indicates sequence; the meanings differ.' },
      { wrong: '먹ㄹ까요', correct: '먹을까요', note: '有收音 + 을까요，먹다 → 먹을까요。', noteEn: 'With a final consonant + 을까요: 먹다 → 먹을까요.' },
      { wrong: '집에 가러 가요', correct: '집에 가요', note: '目的动词和移动动词相同时不用 -(으)러 가다，直接说 가요 即可。', noteEn: 'When the purpose verb and movement verb are the same, don\'t use -(으)러 가다; just say 가요.' },
      { wrong: '카페에 가요 공부하러（照搬中文"去咖啡店学习"的语序）', wrongEn: '카페에 가요 공부하러 (copied the Chinese word order of "go to the café to study")', correct: '카페에 공부하러 가요', note: '中文"去+做某事"把"去"放前面，韩语相反：목적动词 -(으)러 放前、가요/와요 落在句末。', noteEn: 'In Chinese, "go + do something" puts "go" first, but Korean is the opposite: the purpose verb with -(으)러 comes first, and 가요/와요 falls at the end.' },
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
        specialQuiz: {
      type: 'judge',
      title: '判断对错：-(으)러 和 -을까요 的用法', titleEn: 'True or false: usage of -(으)러 and -을까요',
      body: '选出使用正确的句子。', bodyEn: 'Choose the sentence that uses it correctly.',
      questions: [
        { options: ["카페에 공부하러 가요","카페에 공부해러 가요"], answer: 0, explanation: '공부하다→공부하러 가요，-(으)러 接词干。공부해러 不存在。', explanationEn: '공부하다 → 공부하러 가요; -(으)러 attaches to the stem. 공부해러 doesn\'t exist.' },
        { options: ["같이 밥을 먹을까요?","같이 밥을 먹러 갈까요?"], answer: 0, explanation: '먹다 有收音 ㄱ，接 -(으)러 时必须加 으 → 먹으러。选项 2 的 먹러 少了 으，是错误的变形。', explanationEn: '먹다 has the final consonant ㄱ, so when attaching -(으)러 you must add 으 → 먹으러. Option 2\'s 먹러 is missing 으 and is an incorrect form.' },
        { options: ["영화를 보러 갈까요?","영화를 볼까러 가요?"], answer: 0, explanation: '-을까요 是提议："要不要去看电影？"。不能和 -러 叠用。', explanationEn: '-을까요 is a suggestion: "Want to go see a movie?" It can\'t be combined with -러.' },
        { options: ["친구를 만나러 왔어요","친구를 만날까 왔어요"], answer: 0, explanation: '-(으)러 오다 表示"来做某事"：만나러 왔어요（来见朋友）。만날까 왔어요 不存在。', explanationEn: '-(으)러 오다 means "come to do something": 만나러 왔어요 (came to see a friend). 만날까 왔어요 doesn\'t exist.' },
      ],
    },

    compareLabel: '-(으)러 가요 vs -고 가요',
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 第9课</span>
  <div class="ov-title">-(으)러 가요 · -을/ㄹ까요?</div>
  <div class="ov-sub">目的 + 提议，去做某事或邀约</div>
  <div class="ov-sec">
    <h3>-(으)러 가다/오다</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      无收音 → <b style="color:#ff7fa8">러</b>：공부하러 가요 · 보러 가요<br>
      有收音 → <b style="color:#2db89b">으러</b>：먹으러 가요 · 읽으러 가요
    </div>
  </div>
  <div class="ov-sec">
    <h3>-을/ㄹ까요?</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      无收音 → <b style="color:#6b7ff0">ㄹ까요</b>：갈까요? · 볼까요?<br>
      有收音 → <b style="color:#6b7ff0">을까요</b>：먹을까요? · 읽을까요?
    </div>
  </div>
  <div class="ov-sec">
    <h3>⚠️ 常见错误</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <span style="color:#e05555;text-decoration:line-through">먹러 가요</span> → <span style="color:#ff7fa8">먹으러 가요</span>（有收音 加 으）<br>
      먹으러 가요（去吃）≠ 먹<span style="color:#2db89b">고</span> 가요（吃了再走）
    </div>
  </div>
</div>`,
  },
  {
    id: 'card-p3-l10',
    partNumber: 3,
    lessonNumber: 10,
    title: '-은/ㄴ 후에, -기 전에',
    whatItDoes: '说"做完之后"和"做之前"', whatItDoesEn: 'Say "after doing" and "before doing"',
    whatItDoesBody: '-은/ㄴ 후에 表达"做完……之后"；\n-기 전에 表达"做……之前"。\n两者合用可以清晰表达时间顺序，适合写学习计划、日程和日记。\n注意：\n-기 전에 不管有没有收音都直接加 기，比 -은/ㄴ 후에 更简单。\n中文"之后/之前"直接放动词后面，韩语需要正确的词尾变形，尤其 -은/ㄴ 후에 的收音判断是中文没有的难点。', whatItDoesBodyEn: '-은/ㄴ 후에 means "after doing..."; \\n-기 전에 means "before doing...". \\nTogether, they clearly express time order, great for study plans, schedules, and diaries. \\nNote: \\n-기 전에 just adds 기 regardless of final consonants, simpler than -은/ㄴ 후에. \\nChinese puts "after/before" right after the verb, but Korean needs correct endings—especially the final consonant rule for -은/ㄴ 후에, which is tricky for Chinese speakers.',
    structureNote: '两个时间表达结构不同：\n-은/ㄴ 후에 接在动词变形后（要看收音），-기 전에 直接接词干+기，不需要考虑收音。\n先记住这个差异，变形就不会混乱。', structureNoteEn: 'The two time expressions differ in structure: \\n-은/ㄴ 후에 attaches to a conjugated verb (checking the final consonant), while -기 전에 just adds 기 to the stem, no final consonant needed. \\nRemember this difference and the conjugations won\'t confuse you.',
    rulesNote: '후에 接续：\n有收音→은 후에（먹은 후에），无收音→ㄴ 후에（본 후에）。\n전에 接续：\n一律 -기 전에，不看收音。\n易错：\n먹은 전에 ✗，必须说 먹기 전에。', rulesNoteEn: '후에 conjugation: \\nWith final consonant → 은 후에 (먹은 후에), without → ㄴ 후에 (본 후에). \\n전에 conjugation: \\nAlways -기 전에, regardless of final consonant. \\nCommon mistake: \\n먹은 전에 ✗, must say 먹기 전에.',
    scenarioNote: '日记、学习计划、日常习惯"吃饭后学习""睡觉前复习""听歌前看歌词"，这类时间顺序表达每天都用得到。\n掌握这节课，你的韩语日记能立刻写得更自然。', scenarioNoteEn: 'In diaries, study plans, and daily habits—"study after eating," "review before sleeping," "read lyrics before listening"—these time-order expressions come up every day. \\nMaster this lesson and your Korean diary will instantly sound more natural.',
    structures: [
      {
        ko: '밥을 먹은 후에 공부해요',
        zh: '吃饭后学习。', zhEn: 'Study after eating.',
        tokens: [
          { text: '밥을', role: 'object' },
          { text: '먹은 후에', role: 'time' },
          { text: '공부해요', role: 'verb' },
        ],
      },
      {
        ko: '자기 전에 복습해요',
        zh: '睡觉前复习。', zhEn: 'Review before sleeping.',
        tokens: [
          { text: '자기 전에', role: 'time' },
          { text: '복습해요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '有收音动词 + -은 후에', textEn: 'Verb with final consonant + -은 후에', examples: '먹다→먹은 후에, 읽다→읽은 후에' },
      { type: 'rule', text: '无收音动词 + -ㄴ 후에', textEn: 'Verb without final consonant + -ㄴ 후에', examples: '보다→본 후에, 공부하다→공부한 후에' },
      { type: 'rule', text: '动词词干 + -기 전에（不看收音）', textEn: 'Verb stem + -기 전에 (regardless of final consonant)', examples: '먹다→먹기 전에, 보다→보기 전에, 자다→자기 전에' },
      { type: 'usage', text: '名词 + 후에/다음에', textEn: 'Noun + 후에/다음에', examples: '수업 후에, 점심 다음에；动词 + -ㄴ/은 다음에：수업이 끝난 다음에', examplesEn: 'After class, after lunch; Verb + -ㄴ/은 다음에: after class ends' },
      { type: 'example', text: '자기 전에 우유 한 잔을 마셔요 / 공부하기 전에 커피를 마셔요' },
      { type: 'note', text: '-기 전에 前不能用 -은/ㄴ 形式', textEn: '-기 전에 cannot use the -은/ㄴ form before it', examples: '먹은 전에 ✗ → 먹기 전에 ✓' },
      { type: 'compare', text: '-은/ㄴ 후에 vs -기 전에 接续区别', textEn: 'Difference in conjugation between -은/ㄴ 후에 and -기 전에', examples: '먹은 후에（之后，看收音）/ 먹기 전에（之前，不看收音，直接加 기）', examplesEn: '먹은 후에 (after, depends on final consonant) / 먹기 전에 (before, no final consonant check, just add 기)' },
      { type: 'note', text: '-은/ㄴ 후에 的 -은/ㄴ 表"做完/完成"，不是过去时。哪怕整句在说习惯或将来，动词也用 -은/ㄴ，不要因为"事还没发生"就改成现在形 -는', textEn: 'The -은/ㄴ in -은/ㄴ 후에 indicates \'completed/done\', not past tense. Even if the whole sentence is about a habit or future, the verb still uses -은/ㄴ. Don\'t change it to the present form -는 just because the action hasn\'t happened yet.', examples: '내일 밥을 먹은 후에 갈 거예요（明天吃完饭后去，说的是将来，仍用 먹은）', examplesEn: '내일 밥을 먹은 후에 갈 거예요 (Going after eating tomorrow—it\'s about the future, but still uses 먹은)' },
      { type: 'note', text: '名词直接 + 전에/후에，不用变形，和动词形式对称', textEn: 'Nouns directly take 전에/후에 without conjugation, parallel to verb forms', examples: '수업 전에 / 식사 전에 / 방학 후에' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '드라마를', role: 'object' },
          { text: '본 후에', role: 'time' },
          { text: '자요', role: 'verb' },
        ],
        zh: '看完电视剧后睡觉。', zhEn: 'I sleep after watching the drama.',
        swapWords: ['공부한 후에 자요', '먹은 후에 공부해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '노래를', role: 'object' },
          { text: '듣기 전에', role: 'time' },
          { text: '가사를 봐요', role: 'verb' },
        ],
        zh: '听歌前看歌词。', zhEn: 'I read the lyrics before listening to the song.',
        swapWords: ['자기 전에 복습해요', '먹기 전에 손을 씻어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '수업', role: 'object' },
          { text: '후에', role: 'time' },
          { text: '카페에 가요', role: 'verb' },
        ],
        zh: '课后去咖啡店。', zhEn: 'I go to a café after class.',
        swapWords: ['수업 다음에 공부해요', '점심 후에 산책해요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '손을', role: 'object' },
          { text: '씻은 후에', role: 'time' },
          { text: '밥을 먹어요', role: 'verb' },
        ],
        zh: '洗手后吃饭。', zhEn: 'I eat after washing my hands.',
        swapWords: ['공부한 후에 쉬어요', '먹은 후에 산책해요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📖', context: '学习计划', contextEn: 'Study plan', ko: '수업 후에 복습해요.', zh: '课后复习。', zhEn: 'I review after class.' },
      { icon: '🥛', context: '睡前习惯', contextEn: 'Before-bed habits', ko: '자기 전에 우유 한 잔을 마셔요.', zh: '睡前喝一杯牛奶。', zhEn: 'I drink a glass of milk before bed.' },
      { icon: '🎵', context: 'KPOP 学习', contextEn: 'Learning KPOP', ko: '노래를 듣기 전에 가사를 봐요.', zh: '听歌前看歌词。', zhEn: 'I read the lyrics before listening to the song.' },
      { icon: '🍱', context: '日程顺序', contextEn: 'Schedule order', ko: '수업이 끝난 다음에 같이 밥을 먹어요.', zh: '课结束后一起吃饭。', zhEn: 'Let\'s eat together after class ends.' },
      { icon: '🛁', context: '日常习惯', contextEn: 'Daily habits', ko: '샤워한 후에 보통 드라마를 봐요.', zh: '洗完澡后通常看电视剧。', zhEn: 'I usually watch dramas after showering.' },
      { icon: '🍱', context: '吃饭前后', contextEn: 'Before and after meals', ko: '밥을 먹기 전에 손을 씻어요.', zh: '吃饭前洗手。', zhEn: 'I wash my hands before eating.' },
    ],
    mistakes: [
      { wrong: '먹은 전에（후에 和 전에 接续混用）', wrongEn: '먹은 전에 (mixing up conjugations for 후에 and 전에)', correct: '먹기 전에', note: '전에 前用 -기 名词化，不用 -은/ㄴ。먹은 후에（之后）/ 먹기 전에（之前）。', noteEn: 'Use -기 to nominalize before 전에, not -은/ㄴ. 먹은 후에 (after) / 먹기 전에 (before).' },
      { wrong: '보은 후에（无收音接错）', wrongEn: '보은 후에 (wrong conjugation when no final consonant)', correct: '본 후에', note: '보다 无收音，接 -ㄴ 후에 → 본 후에，不是 보은 후에。', noteEn: 'Verbs without a final consonant take -ㄴ 후에, so 보다 becomes 본 후에, not 보은 후에.' },
      { wrong: '前后时间顺序写反', wrongEn: 'The order of events is reversed.', correct: '먹은 후에 공부해요（先吃，后学）', correctEn: '먹은 후에 공부해요 (eat first, then study)', note: '-은/ㄴ 후에 前面的动作先发生，后面的动作后发生，不要写反。', noteEn: 'With -은/ㄴ 후에, the action before it happens first, and the one after it happens later—don\'t reverse the order.' },
      { wrong: '자은 후에', correct: '잔 후에', note: '자다 无收音 → ㄴ 후에 → 잔 후에。无收音动词接 -ㄴ 후에。', noteEn: '자다 has no final consonant → add ㄴ 후에 → 잔 후에. Verbs without a final consonant take -ㄴ 후에.' },
      { wrong: '먹는 후에（用现在形 -는）', wrongEn: '먹는 후에 (using the present tense -는)', correct: '먹은 후에', note: '후에 前要用表完成的 -은/ㄴ，不是现在形 -는。哪怕说的是将来或习惯，也用 먹은 후에。', noteEn: 'Before 후에, use the completed form -은/ㄴ, not the present tense -는. Even for future or habitual actions, use 먹은 후에.' },
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
        specialQuiz: {
      type: 'fill',
      title: '选择正确的时间顺序表达', titleEn: 'Choose the correct time-order expression',
      body: '根据句意选择 -은/ㄴ 후에 或 -기 전에。', bodyEn: 'Choose -은/ㄴ 후에 or -기 전에 based on the meaning of the sentence.',
      questions: [
        {
          pre: '밥을',
          post: '이를 닦아요.',
          options: ['먹을 때', '먹은 후에', '먹기 전에'],
          answer: 1,
          explanation: '먹은 후에 = 吃完饭后刷牙。-은 후에 表示"在……之后"。', explanationEn: '먹은 후에 = brush teeth after eating. -은 후에 means "after..."',
        },
        {
          pre: '',
          post: '손을 씻어요.',
          options: ['밥을 먹기 전에', '밥을 먹은 후에', '밥을 먹어서'],
          answer: 0,
          explanation: '먹기 전에 = 饭前洗手。-기 전에 表示"在……之前"。', explanationEn: '먹기 전에 = wash hands before eating. -기 전에 means "before..."',
        },
        {
          pre: '숙제를',
          post: 'TV를 봐요.',
          options: ['한 후에', '하는 중에', '하기 전에'],
          answer: 0,
          explanation: '한 후에 = 做完作业后看电视。하다→한 후에（ㄴ 후에 接词干）。', explanationEn: '한 후에 = watch TV after doing homework. 하다 → 한 후에 (ㄴ 후에 attaches to the stem).',
        },
        {
          pre: '자기',
          post: '한국어를 복습해요.',
          options: ["후에", "때", "전에"],
          answer: 2,
          explanation: '자기 전에 = 睡前复习韩语。-기 전에 前加动词词干。', explanationEn: '자기 전에 = review Korean before sleeping. Add -기 전에 to the verb stem.',
        },
      ],
    },

    compareLabel: '-은/ㄴ 후에 vs -기 전에',
    quickTable: {
      title: '후에 / 전에 변형 速记', titleEn: 'Quick Notes on 후에 / 전에 Transformations',
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
      有收音 → <b style="color:#ff7fa8">은 후에</b>：먹은 후에 · 읽은 후에<br>
      无收音 → <b style="color:#2db89b">ㄴ 후에</b>：본 후에 · 공부한 후에<br>
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
      <span style="color:#e05555;text-decoration:line-through">보은 후에</span> → <span style="color:#ff7fa8">본 후에</span>（无收音 用 ㄴ）
    </div>
  </div>
</div>`,
  },

  // ── 第三章 第11课：综合练习③ ─────────────────────────────
  {
    id: 'card-p3-l11',
    partNumber: 3,
    lessonNumber: 11,
    title: '综合练习③', titleEn: 'Comprehensive practice ③',
    whatItDoes: '第三章综合练习', whatItDoesEn: 'Chapter 3 Comprehensive Practice',
    whatItDoesBody: '完成这份练习，检验第三章前 10 课是否掌握。\n涵盖进行时、经历回顾、愿望、ㄹ 不规则、意愿选择、疑问词、连接词、目的表达、时间顺序等核心知识点。', whatItDoesBodyEn: 'Complete this practice to test your mastery of the first 10 lessons in Chapter 3.\\nIt covers key points like the progressive tense, past experiences, wishes, ㄹ irregular verbs, expressing intentions, question words, connectors, purpose expressions, and time sequences.',
    isPractice: true,
    structureNote: '这是第三章的总复习。\n第三章的核心是"时态扩展"和"句子连接"进行时、经历回顾、愿望、目的、顺序，都是让表达从单句变成复句的工具。\n做题时注意这条主线。', structureNoteEn: 'This is the overall review for Chapter 3.\\nThe core of Chapter 3 is "tense expansion" and "sentence connection"—the progressive, past experiences, wishes, purpose, and sequence are all tools that turn single sentences into complex ones.\\nKeep this main thread in mind as you work through the problems.',
    structures: [
      { ko: '지금 드라마를 보고 있어요', zh: '现在正在看电视剧。', zhEn: 'I\'m watching a drama right now.', tokens: [{ text: '지금', role: 'time' }, { text: '드라마를', role: 'object' }, { text: '보고 있어요', role: 'verb' }] },
      { ko: '예전에 서울에 살았었어요', zh: '以前在首尔住过。', zhEn: 'I used to live in Seoul.', tokens: [{ text: '예전에', role: 'time' }, { text: '서울에', role: 'place' }, { text: '살았었어요', role: 'verb' }] },
      { ko: '한국에 가고 싶어요', zh: '想去韩国。', zhEn: 'I want to go to Korea.', tokens: [{ text: '한국에', role: 'place' }, { text: '가고 싶어요', role: 'verb' }] },
      { ko: '카페에 공부하러 가요', zh: '去咖啡店学习。', zhEn: 'Go to a café to study.', tokens: [{ text: '카페에', role: 'place' }, { text: '공부하러', role: 'verb' }, { text: '가요', role: 'verb' }] },
      { ko: '밥을 먹은 후에 공부해요', zh: '吃饭后学习。', zhEn: 'Study after eating.', tokens: [{ text: '밥을', role: 'object' }, { text: '먹은 후에', role: 'time' }, { text: '공부해요', role: 'verb' }] },
    ],
    connectionRules: [
      { type: 'usage', text: '-고 있어요: 正在进行; 穿戴动词 + -고 있어요: 持续状态', textEn: '-고 있어요: ongoing action; wear/put-on verbs + -고 있어요: continuous state', examples: '공부하고 있어요 / 안경을 쓰고 있어요（戴着）', examplesEn: '공부하고 있어요 / 안경을 쓰고 있어요 (wearing)' },
      { type: 'usage', text: '-았었/었었어요: 以前曾经…（现在可能不同）', textEn: '-았었/었었어요: used to... (may be different now)', examples: '살았었어요 / 공부했었어요 / 학생이었었어요' },
      { type: 'usage', text: '-고 싶어요: 想做; 그러면/그럼: 那么（条件顺接）', textEn: '-고 싶어요: want to do; 그러면/그럼: then (conditional sequence)', examples: '가고 싶어요 / 배가 고파요. 그러면 같이 먹어요.' },
      { type: 'usage', text: 'ㄹ 不规则: -아요/고 앞 保留, -세요/-ㅂ니다/-는 앞 脱落', textEn: 'ㄹ irregular: kept before -아요/고, dropped before -세요/-ㅂ니다/-는', examples: '살아요 ✓ / 사세요 ✓ / 삽니다 ✓' },
      { type: 'usage', text: '-을/ㄹ래요: 意愿选择; -겠어요: 意志/礼貌（알겠어요）', textEn: '-을/ㄹ래요: intention/choice; -겠어요: will/politeness (알겠어요)', examples: '갈래요 / 먹을래요 / 알겠어요' },
      { type: 'usage', text: '무슨（名称）/ 어느（选项）/ 어떤（特点）', textEn: '무슨 (name/kind) / 어느 (choice) / 어떤 (characteristic)', examples: '무슨 노래예요? / 어느 나라? / 어떤 음식을 좋아해요?' },
      { type: 'usage', text: '그렇지만（明确转折）/ 그런데（轻转折/话题推进）', textEn: '그렇지만 (clear contrast) / 그런데 (mild contrast/topic shift)', examples: '재미있어요. 그렇지만 어려워요. / 그런데 이거 알아요?' },
      { type: 'usage', text: '그래서（所以，자연결과）/ 그러니까（所以，제안 어감）', textEn: '그래서 (so, natural result) / 그러니까 (so, suggesting tone)', examples: '비가 와요. 그래서 집에 있어요.（下雨了，所以待在家。）', examplesEn: '비가 와요. 그래서 집에 있어요. (It\'s raining, so I\'m staying home.)' },
      { type: 'usage', text: '-(으)러 가다: 去做某事目的; -을/ㄹ까요?: 提议/询问', textEn: '-(으)러 가다: go to do something; -을/ㄹ까요?: suggestion/question', examples: '먹으러 가요 / 같이 갈까요?' },
      { type: 'usage', text: '-은/ㄴ 후에（之后，看 收音）/ -기 전에（之前，直接加 기）', textEn: '-은/ㄴ 후에 (after, depends on final consonant) / -기 전에 (before, add 기 directly)', examples: '먹은 후에 / 본 후에 / 먹기 전에 / 자기 전에' },
    ],
    cardExamples: [
      {
        wordBlocks: [{ text: '지금', role: 'time' }, { text: '안경을', role: 'object' }, { text: '쓰고 있어요', role: 'verb' }],
        zh: '正戴着眼镜。', zhEn: 'I\'m wearing glasses.',
        swapWords: ['입고 있어요', '들고 있어요', '보고 있어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [{ text: '이 노래를', role: 'object' }, { text: '배우고 싶어요', role: 'verb' }],
        zh: '想学这首歌。', zhEn: 'I want to learn this song.',
        swapWords: ['가고 싶어요', '먹고 싶어요', '알고 싶어요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [{ text: '자기 전에', role: 'time' }, { text: '복습해요', role: 'verb' }],
        zh: '睡觉前复习。', zhEn: 'Review before sleeping.',
        swapWords: ['공부한 후에 자요', '먹은 후에 가요'],

        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '수업이 끝난', role: 'time' },
          { text: '다음에', role: 'plain' },
          { text: '카페에 가요', role: 'verb' },
        ],
        zh: '课结束后去咖啡店。', zhEn: 'After class, I\'m going to a café.',
        swapWords: ['공부하러 가요', '밥을 먹어요'],

        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '📚', context: '学习打卡', contextEn: 'Study check-in', ko: '지금 한국어를 공부하고 있어요. 자기 전에 꼭 복습해요.', zh: '现在正在学习韩语。睡前一定复习。', zhEn: 'I\'m studying Korean now. I always review before bed.' },
      { icon: '🎵', context: 'KPOP', ko: '이 노래를 배우고 싶어요. 그러면 같이 연습할까요?', zh: '想学这首歌。那要一起练习吗？', zhEn: 'I want to learn this song. Want to practice together?' },
      { icon: '✈️', context: '旅行愿望', contextEn: 'Travel Wish', ko: '한국에 가고 싶어요. 그래서 요즘 열심히 공부하고 있어요.', zh: '想去韩国，所以最近在努力学习。', zhEn: 'I want to go to Korea, so I\'ve been studying hard lately.' },
      { icon: '☕', context: '日程安排', contextEn: 'Schedule', ko: '수업이 끝난 다음에 카페에 공부하러 가요.', zh: '课结束后去咖啡店学习。', zhEn: 'After class, I go to a café to study.' },
      { icon: '💬', context: '对话练习', contextEn: 'Dialogue Practice', ko: '무슨 노래를 배우고 싶어요? 그런데 알겠어요, 같이 해 봐요!', zh: '想学什么歌？话说明白了，一起来试试吧！', zhEn: 'What song do you want to learn? Now that that\'s clear, let\'s give it a try!' },
      { icon: '🏠', context: '日常习惯', contextEn: 'Daily habits', ko: '샤워한 후에 드라마를 봐요. 그런데 요즘 너무 피곤해요. 그래서 일찍 자고 싶어요.', zh: '洗澡后看电视剧。但最近太累了，所以想早睡。', zhEn: 'After showering, I watch a drama. But lately I\'ve been so tired that I want to sleep early.' },
    ],
    mistakes: [
      { wrong: '노래를 들고 있어요（想说正在听歌）', wrongEn: '노래를 들고 있어요 (meaning to say \'listening to music\')', correct: '노래를 듣고 있어요', note: '-고 接续时 ㄷ 不规则不发生，듣다→듣고。', noteEn: 'When -고 is attached, the ㄷ irregular doesn\'t apply: 듣다 → 듣고.' },
      { wrong: '커피고 싶어요', correct: '커피를 마시고 싶어요', note: '-고 싶어요 接动词，不直接接名词，需补出动词。', noteEn: '-고 싶어요 attaches to verbs, not nouns directly; you need to add a verb.' },
      { wrong: '알세요?', correct: '아세요?', note: '알다 + -세요 → ㄹ 脱落 → 아세요。', noteEn: '알다 + -세요 → ㄹ drops → 아세요.' },
      { wrong: '먹러 가요', correct: '먹으러 가요', note: '收音 있는 + 으러，먹다→먹으러 가요。', noteEn: 'With a final consonant + 으러: 먹다 → 먹으러 가요.' },
      { wrong: '먹은 전에', correct: '먹기 전에', note: '-기 전에 前用名词化 -기，不用 -은/ㄴ。', noteEn: 'Use the nominalizer -기 before 전에, not -은/ㄴ.' },
      { wrong: '그러면을 "但是"로 사용', wrongEn: 'Using 그러면 as "but"', correct: '그러면（那么，条件顺接）/ 그렇지만（但是，转折）', correctEn: '그러면 (then, conditional) / 그렇지만 (but, contrast)', note: '두 词意思完全不同，不能混用。', noteEn: 'The two words have completely different meanings; don\'t mix them up.' },
    ],
        compareHtml: `<div class="card-title">第三章综合练习</div>
<div class="card-body">完成这份练习，检验第三章前 10 课是否掌握。涵盖进行时、经历回顾、愿望、ㄹ 不规则、意愿选择、疑问词、连接词、目的表达、时间顺序等核心知识点。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0"><div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px"><div class="tok t-v">本课复习</div><div style="font-size:16px;color:#89756e;margin-top:2px">一课一句核心</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">-고 있다</span><span style="font-size:16px;color:#5a4640">正在做</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">-았었/었었</span><span style="font-size:16px;color:#5a4640">曾经……过</span></div></div><div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px"><div class="tok t-v">核心知识点</div><div style="font-size:16px;color:#89756e;margin-top:2px">全章重点</div><div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">-고 싶다 / 그러면</span><span style="font-size:16px;color:#5a4640">想做 / 那样的话</span></div><div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">ㄹ不规则 / -을/ㄹ래요</span><span style="font-size:16px;color:#5a4640">变形 / 意愿选择</span></div></div>
</div>
<div style="background:#fff8fb;border-radius:12px;padding:12px 14px;margin:0 0 10px 0"><div style="font-size:16px;font-weight:700;color:#241917;margin-bottom:6px">综合练习建议</div><div style="font-size:16px;color:#5a4640">遇到不确定的题，先回想"这是哪节课的知识点"，再作答。第三章的核心是"时间"和"目的"——什么时候做、为什么做、做了什么之后发生什么。</div><div style="margin-top:4px;font-size:16px;color:#5a4640">如果大部分题都答对了，说明第三章掌握得不错，可以进入第四章。</div></div>
<div class="reminder-box">综合练习不计成绩，目的是帮你发现哪里还不熟练。答错了就回去复习对应的课次。</div>`,
    linkedGrammarIds: [],
    overviewHtml: `<div class="overview">
  <span class="badge">第3部分 · 综合练习</span>
  <div class="ov-title">综合练习③</div>
  <div class="ov-sub">第三章 10 课核心知识点总览</div>
  <div class="ov-sec">
    <h3>① 进行 & 经历</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      -고 <b style="color:#ff7fa8">있어요</b>（正在做）/ -고 <b style="color:#ff7fa8">있었어요</b>（过去正在做）<br>
      穿戴类：입고/쓰고/들고 <b style="color:#ff7fa8">있어요</b>（穿着/戴着/拿着）<br>
      -<b style="color:#2db89b">았었/었었어요</b>（以前曾经……）；하다→했었어요；名词→이었었어요
    </div>
  </div>
  <div class="ov-sec">
    <h3>② 愿望 & 意愿</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      -고 <b style="color:#ff7fa8">싶어요</b>（想做）；그러면/그럼（那么，条件顺接）<br>
      -을/ㄹ<b style="color:#2db89b">래요</b>（我要/要不要）；<b style="color:#6b7ff0">알겠어요</b>（明白了）
    </div>
  </div>
  <div class="ov-sec">
    <h3>③ ㄹ 不规则</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      接元音 → ㄹ <b style="color:#2db89b">保留</b>：살아요, 알아요, 만들어요<br>
      接 ㄴ/ㅂ/ㅅ → ㄹ <b style="color:#ff7fa8">脱落</b>：사세요, 삽니다, 아세요
    </div>
  </div>
  <div class="ov-sec">
    <h3>④ 疑问词 & 连接词</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      <b style="color:#ff7fa8">무슨</b>（名称/属性）/ <b style="color:#2db89b">어느</b>（选项）/ <b style="color:#6b7ff0">어떤</b>（特点）<br>
      <b style="color:#ff7fa8">그렇지만</b>（但是）/ <b style="color:#2db89b">그런데</b>（不过/话题转换）<br>
      <b style="color:#e8a87c">그래서</b>（所以）/ <b style="color:#6b7ff0">그러니까</b>（所以/因此，带劝告）
    </div>
  </div>
  <div class="ov-sec">
    <h3>⑤ 目的 & 时间顺序</h3>
    <div style="font-size:16px;color:#241917;line-height:2">
      -(으)러 가요（去做某事）；-을/ㄹ까요?（要不要……）<br>
      -은/ㄴ <b style="color:#ff7fa8">후에</b>（之后，看 收音）；-기 <b style="color:#2db89b">전에</b>（之前，不看 收音）
    </div>
  </div>
</div>`,
  },
];
