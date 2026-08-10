import type { GrammarCard } from '@/types';

export const grammarCardsP9: GrammarCard[] = [
  {
    id: 'card-p9-l01',
    partNumber: 9,
    lessonNumber: 1,
    title: '不定阶(1)：-겠-, -는/을 것 같다', titleEn: 'Deferential Level (1): -겠-, -는/을 것 같다',
    whatItDoes: '表示推测和意向的两种核心句型', whatItDoesEn: 'Two core patterns for expressing speculation and intention',
    whatItDoesBody: '-겠- 有两种用法：表示说话人的意向（我要做…）或推测（看样子…）。\n-는/을 것 같다 是"感觉/好像"，比 -겠- 更柔和，常用于不确定的推测。\n两者都是中级必备，韩剧台词和日常对话里出现频率极高。', whatItDoesBodyEn: '-겠- has two uses: expressing the speaker\'s intention (I will do...) or speculation (it seems...).\\n-는/을 것 같다 means "feel like/seems like" and is softer than -겠-, often used for uncertain speculation.\\nBoth are essential for intermediate learners and appear frequently in K-drama lines and everyday conversation.',
    structureNote: '-겠- 插入动词词干和语尾之间。\n-는/을 것 같다 接在动词/形容词的冠词形后面。', structureNoteEn: '-겠- is inserted between the verb stem and the ending.\\n-는/을 것 같다 attaches to the adnominal form of verbs/adjectives.',
    rulesNote: '-겠- 第一人称=意向，第二三人称=推测。\n-는/을 것 같다 永远是推测，不分人称。', rulesNoteEn: '-겠- with first person = intention, with second/third person = speculation.\\n-는/을 것 같다 is always speculation, regardless of person.',
    structures: [
      {
        ko: '내년에 합격하겠습니다',
        zh: '我明年一定会考上的。', zhEn: 'I\'ll definitely pass the exam next year.',
        tokens: [
          { text: '내년에', role: 'time' },
          { text: '합격하겠습니다', role: 'verb' },
        ],
      },
      {
        ko: '피곤하겠어요',
        zh: '你一定很累吧。', zhEn: 'You must be really tired.',
        tokens: [
          { text: '피곤하겠어요', role: 'verb' },
        ],
      },
      {
        ko: '비가 올 것 같아요',
        zh: '好像要下雨了。', zhEn: 'It looks like it\'s going to rain.',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '올 것 같아요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람이 화가 난 것 같아요',
        zh: '那个人好像生气了。', zhEn: 'That person seems angry.',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '화가 난 것 같아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-겠- 变形：动词/形容词词干 + 겠 + 어요/습니다', textEn: '-겠- conjugation: verb/adjective stem + 겠 + 어요/습니다', examples: '가다→가겠어요 / 먹다→먹겠습니다 / 피곤하다→피곤하겠어요' },
      { type: 'rule', text: '-는 것 같다（现在）：动词词干 + 는 것 같다', textEn: '-는 것 같다 (present): verb stem + 는 것 같다', examples: '가다→가는 것 같다 / 먹다→먹는 것 같다' },
      { type: 'rule', text: '-은/ㄴ 것 같다（过去/形容词）：有收音+은, 无收音+ㄴ', textEn: '-은/ㄴ 것 같다 (past/adjective): +은 if batchim, +ㄴ if no batchim', examples: '작다→작은 것 같다 / 크다→큰 것 같다 / 갔다→간 것 같다' },
      { type: 'rule', text: '-을/ㄹ 것 같다（将来）：有收音+을, 无收音+ㄹ', textEn: '-을/ㄹ 것 같다 (future): +을 if batchim, +ㄹ if no batchim', examples: '먹다→먹을 것 같다 / 가다→갈 것 같다' },
      { type: 'usage', text: '-겠- 第一人称=意向', textEn: '-겠- first person = intention', examples: '제가 하겠습니다（我来做）/ 내일 일찍 오겠습니다（我明天早点来）', examplesEn: '제가 하겠습니다 (I\'ll do it) / 내일 일찍 오겠습니다 (I\'ll come early tomorrow)' },
      { type: 'usage', text: '-겠- 第二三人称=推测', textEn: '-겠- second/third person = speculation', examples: '힘들겠어요（你一定很辛苦吧）/ 맛있겠다（看起来很好吃）', examplesEn: '힘들겠어요 (You must be tired) / 맛있겠다 (Looks delicious)' },
      { type: 'compare', text: '-겠- vs -는/을 것 같다', examples: '비가 오겠어요（推测，语气较肯定）vs 비가 올 것 같아요（推测，语气更柔和/不确定）', examplesEn: '비가 오겠어요 (speculation, more certain) vs 비가 올 것 같아요 (speculation, softer/less certain)' },
      { type: 'note', text: '别把中文的"会"一律套进 -겠-：-겠- 的将来带"有依据的推测"(내일 비가 오겠어요) 或"我要/我一定"的意志(제가 하겠습니다)；中性的计划"我明天会去"用 -을 거예요（后面章节详学），说成 내일 가겠어요 会带上强烈意志/承诺的味道。', textEn: 'Don\'t always map Chinese "will" onto -겠-: -겠- future carries "informed speculation" (내일 비가 오겠어요) or "I will/I must" intention (제가 하겠습니다); neutral plans like "I\'ll go tomorrow" use -을 거예요 (detailed later), as 내일 가겠어요 sounds strongly willful/committal.' },
      { type: 'compare', text: '-을 것 같다 vs -은 것 같다：推测的时间点不同', textEn: '-을 것 같다 vs -은 것 같다: different time points of speculation', examples: '비가 올 것 같아요（还没下，推测将要下）vs 비가 온 것 같아요（地是湿的，推测已经下过了）', examplesEn: '비가 올 것 같아요 (hasn\'t rained yet, speculating it will) vs 비가 온 것 같아요 (ground is wet, speculating it already rained)' },
      { type: 'example', text: '알겠어요（我明白了）/ 모르겠어요（我不知道）— 日常超高频', textEn: '알겠어요 (I understand) / 모르겠어요 (I don\'t know) — super common in daily life' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '내일', role: 'time' },
          { text: '비가', role: 'subject' },
          { text: '올 것 같아요', role: 'verb' },
        ],
        zh: '明天好像会下雨。', zhEn: 'It seems like it will rain tomorrow.',
        swapWords: ['올 것 같아요', '안 올 것 같아요', '많이 올 것 같아요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저도', role: 'subject' },
          { text: '같이', role: 'plain' },
          { text: '가겠어요', role: 'verb' },
        ],
        zh: '我也一起去。', zhEn: 'I\'ll go too.',
        swapWords: ['가겠어요', '도와드리겠어요', '연락하겠어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그 드라마가', role: 'subject' },
          { text: '재미있을 것 같아요', role: 'verb' },
        ],
        zh: '那部剧好像很有意思。', zhEn: 'That drama seems really interesting.',
        swapWords: ['재미있을 것 같아요', '재미없을 것 같아요', '인기 있을 것 같아요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🌧️', context: '天气推测', contextEn: 'Weather Inference', ko: '오늘 비가 올 것 같아요. 우산 가져가세요.', zh: '今天好像会下雨，带把伞吧。', zhEn: 'It looks like it\'ll rain today, bring an umbrella.' },
      { icon: '💼', context: '职场表态', contextEn: 'Workplace statements', ko: '제가 먼저 확인해 보겠습니다.', zh: '我先去确认一下。', zhEn: 'Let me go check first.' },
      { icon: '🎵', context: 'KPOP 追星', contextEn: 'KPOP fandom', ko: '이번 앨범도 대박날 것 같아요!', zh: '这次专辑好像也会大卖！', zhEn: 'This album seems like it\'ll be a big hit too!' },
      { icon: '😴', context: '关心朋友', contextEn: 'Caring for friends', ko: '많이 피곤하겠어요. 푹 쉬세요.', zh: '你一定很累了，好好休息吧。', zhEn: 'You must be really tired. Get some rest.' },
      { icon: '🍽️', context: '餐厅点餐', contextEn: 'Ordering at a restaurant', ko: '저는 비빔밥으로 하겠습니다.', zh: '我要拌饭。', zhEn: 'I\'ll have bibimbap.' },
      { icon: '📱', context: '日常对话', contextEn: 'Everyday conversation', ko: '모르겠어요. 나중에 알아볼게요.', zh: '我不太清楚，之后再查查吧。', zhEn: 'I\'m not sure. Let me look it up later.' },
    ],
    mistakes: [
      { wrong: '저는 피곤하겠어요', correct: '저는 피곤해요', note: '-겠- 第一人称推测自己的状态听起来很奇怪，自己的感受直接用 -아/어/여요。', noteEn: 'Using -겠- to guess your own state sounds odd; for your own feelings, just use -아/어/여요.' },
      { wrong: '비가 오는 것 같겠어요', correct: '비가 올 것 같아요', note: '-는 것 같다 和 -겠- 不叠用，选一个表达推测即可。', noteEn: 'Don\'t stack -는 것 같다 with -겠-; pick one to express conjecture.' },
      { wrong: '내일 갈 것 같습니다（正式场合表意向）', wrongEn: '내일 갈 것 같습니다 (formal intention)', correct: '내일 가겠습니다', note: '正式场合表意向用 -겠습니다，-것 같다 是推测，不适合用于正式承诺。', noteEn: 'For formal intention, use -겠습니다; -것 같다 is conjecture and doesn\'t fit formal promises.' },
      { wrong: '그 옷이 예쁘는 것 같아요', correct: '그 옷이 예쁜 것 같아요', note: '形容词的现在推测用 -은/ㄴ 것 같다（예쁘다→예쁜），只有动词现在才是 -는 것 같다。别把动词的 -는 套到形容词上。', noteEn: 'For adjectives, present conjecture uses -은/ㄴ 것 같다 (예쁘다→예쁜); only verbs use -는 것 같다 in the present. Don\'t apply the verb -는 to adjectives.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P9 · 第1课</div>
    <div class="ov-hero-title">不定阶(1)：-겠-, -는/을 것 같다</div>
    <div class="ov-hero-sub">推测与意向的两大核心句型，韩剧高频必备</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">意向/推测</div>
      <div class="ko">-겠-</div>
      <div class="zh">第一人称=意向（我要/我打算），第二三人称=推测（一定/看样子）</div>
    </div>
    <div class="ov-block">
      <div class="badge">推测</div>
      <div class="ko">-는/은/ㄴ/을/ㄹ 것 같다</div>
      <div class="zh">感觉/好像……，语气比 -겠- 更柔和</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#aee3d8"></div><div class="ov-section-title">超高频句型</div></div>
    <div class="ov-block">
      <div class="ko">알겠어요 / 모르겠어요</div>
      <div class="zh">我明白了 / 我不知道 — 日常万用</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">-겠- · -는/을 것 같다</div>
<div class="card-body">两种表达推测的方式：-겠- 更肯定，-것 같다 更柔和。-겠- 第一人称还能表示意向"我要做"。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-겠-（意向/肯定推测）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">제가 하겠습니다!</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我来做！（意向，正式场合）</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-는/을 것 같다（柔和推测）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비가 올 것 같아요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">好像要下雨了。</div>
    </div>
  </div>
</div>
<div class="reminder-box">알겠어요（明白了）/ 모르겠어요（不太清楚）— 这两句日常万用，先记住。</div>`,
    compareHtml: `<div class="card-title">-겠- vs -는/을 것 같다</div>
<div class="card-body">两者都能表推测，但语气不同。-겠- 更肯定，说话人有把握；-것 같다 更柔和，表示不确定的感觉。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-겠- → 较肯定的推测 / 第一人称意向</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词/形容词词干 + 겠 + 어요/습니다</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">힘들겠어요.</span><span style="font-size:16px;color:#5a4640">你一定很辛苦吧。（较肯定）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">제가 하겠습니다.</span><span style="font-size:16px;color:#5a4640">我来做。（意向）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">알겠어요 / 모르겠어요</span><span style="font-size:16px;color:#5a4640">明白了 / 不太清楚</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-는/을 것 같다 → 柔和推测，语气不确定</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词现在 -는 것 같다 / 将来 -을/ㄹ 것 같다 / 形容词 -은/ㄴ 것 같다</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">비가 올 것 같아요.</span><span style="font-size:16px;color:#5a4640">好像要下雨了。（不确定）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">피곤한 것 같아요.</span><span style="font-size:16px;color:#5a4640">好像很累的样子。</span></div>
  </div>
</div>
<div class="reminder-box">저는 피곤하겠어요 ✗ — -겠- 第一人称推测自己的感受很奇怪，说自己的状态直接用 피곤해요。</div>`,
    compareLabel: '-겠-（肯定/意向）vs -는/을 것 같다（柔和推测）', compareLabelEn: '-겠- (certainty/intention) vs -는/을 것 같다 (soft conjecture)',
    quickTable: {
      title: '-겠- vs -것 같다 接续速查', titleEn: '-겠- vs -것 같다 Conjugation Quick Reference',
      headers: ['语法', '接续', '语气', '例子'],
      rows: [
        [{ ko: '-겠-', zh: '意向/肯定推测', zhEn: 'Intention/certain conjecture' }, { ko: '词干 + 겠 + 어요', zh: '直接接词干', zhEn: 'Attach directly to the stem' }, { ko: '较肯定', zh: '有把握', zhEn: 'Certain' }, { ko: '가겠어요 / 피곤하겠어요', zh: '我去/你一定很累', zhEn: 'I\'ll go / You must be really tired' }],
        [{ ko: '-는 것 같다', zh: '现在推测（动词）', zhEn: 'Present conjecture (verbs)' }, { ko: '词干 + 는 것 같다', zh: '动词现在时', zhEn: 'Verb present tense' }, { ko: '柔和', zh: '不确定', zhEn: 'Uncertain' }, { ko: '가는 것 같아요', zh: '好像在去', zhEn: 'Seems to be going' }],
        [{ ko: '-을/ㄹ 것 같다', zh: '将来推测', zhEn: 'Future conjecture' }, { ko: '有收音+을/无收音+ㄹ', zh: '将来冠词形', zhEn: 'Future adnominal form' }, { ko: '柔和', zh: '不确定', zhEn: 'Uncertain' }, { ko: '올 것 같아요', zh: '好像会来', zhEn: 'seems like it will come' }],
        [{ ko: '-은/ㄴ 것 같다', zh: '过去/形容词推测', zhEn: 'Past/adjective conjecture' }, { ko: '有收音+은/无收音+ㄴ', zh: '过去冠词形', zhEn: 'Past adnominal form' }, { ko: '柔和', zh: '不确定', zhEn: 'Uncertain' }, { ko: '간 것 같아요', zh: '好像去了', zhEn: 'Seems like (someone) went' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-겠- 还是 -것 같다？', titleEn: '-겠- or -것 같다?',
      body: '根据语境选择正确的推测/意向表达。', bodyEn: 'Choose the correct expression of conjecture or intention based on the context.',
      questions: [
        { pre: '제가 먼저', post: '。（我先去确认——意向）', postEn: '(I\'ll go check first — intention)', options: ['확인했겠어요', '확인할 것 같아요', '확인하겠습니다', '확인하는 것 같아요'], answer: 2, explanation: '正式场合表意向用 -겠습니다，不用 -것 같다', explanationEn: 'In formal settings, use -겠습니다 for intention, not -것 같다' },
        { pre: '오늘 날씨가', post: '。（感觉天气好像很冷——柔和推测）', postEn: '(It feels like the weather is cold — soft conjecture)', options: ['춥겠어요', '춥는 것 같아요', '추울겠어요', '추운 것 같아요'], answer: 3, explanation: '柔和推测用 -것 같다，形容词接 -은/ㄴ 것 같다 → 추운 것 같아요', explanationEn: 'For soft conjecture, use -것 같다; with adjectives, attach -은/ㄴ 것 같다 → 추운 것 같아요' },
        { pre: '', post: '（我明白了——日常表达）', postEn: '(I understand — everyday expression)', options: ['아는 것 같아요', '알겠어요', '아는 것 같겠어요', '알 것 같아요'], answer: 1, explanation: '알겠어요 是固定表达"我明白了"，用 -겠-', explanationEn: '알겠어요 is a fixed expression meaning "I understand," using -겠-' },
        { pre: '그 영화가', post: '。（那部电影好像很有意思——推测）', postEn: '(That movie seems interesting — conjecture)', options: ['재미있을 것 같아요', '재미있는 것 같겠어요', '재미있었겠어요', '재미있겠어요'], answer: 0, explanation: '对将来事物的柔和推测用 -을 것 같다 → 재미있을 것 같아요', explanationEn: 'For soft conjecture about future things, use -을 것 같다 → 재미있을 것 같아요' },
      ],
    },
    linkedGrammarIds: ['g51', 'g69'],
  },
  {
    id: 'card-p9-l02',
    partNumber: 9,
    lessonNumber: 2,
    title: '不定阶(2)：-네요, -군요, -구나', titleEn: 'Deferential Level (2): -네요, -군요, -구나',
    whatItDoes: '表示"哦，原来如此"的感叹语气', whatItDoesEn: 'Expressing "Oh, I see" — Exclamatory Tone',
    whatItDoesBody: '这三个语尾都表示说话人对眼前情况的新发现或感叹。\n-네요：礼貌感叹，对话中最常用。\n-군요：稍正式，书面和对话均可。\n-구나：非正式，自言自语或对晚辈说话时用。', whatItDoesBodyEn: 'These three endings express the speaker\'s realization or exclamation about what they see.\\n-네요: Polite exclamation, most common in conversation.\\n-군요: Slightly formal, used in both writing and speech.\\n-구나: Informal, used when talking to oneself or to someone younger.',
    structureNote: '三者都接在动词/形容词词干后，规则相同。\n过去时：词干 + 았/었/였 + 네요/군요/구나。', structureNoteEn: 'All three attach to verb/adjective stems with the same rules.\\nPast tense: stem + 았/었/였 + 네요/군요/구나.',
    rulesNote: '-네요 最安全，任何场合都能用。\n-구나 只对平辈或晚辈，对长辈用会显得失礼。', rulesNoteEn: '-네요 is the safest, usable in any situation.\\n-구나 is only for peers or those younger; using it with elders is rude.',
    structures: [
      {
        ko: '한국어를 정말 잘하시네요',
        zh: '您韩语说得真好啊！', zhEn: 'You speak Korean so well!',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '정말 잘하시네요', role: 'verb' },
        ],
      },
      {
        ko: '오늘 날씨가 좋군요',
        zh: '今天天气真好啊。', zhEn: 'The weather is really nice today.',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '날씨가', role: 'subject' },
          { text: '좋군요', role: 'verb' },
        ],
      },
      {
        ko: '벌써 졸업했구나',
        zh: '你已经毕业了啊。', zhEn: 'You\'ve already graduated, huh.',
        tokens: [
          { text: '벌써', role: 'time' },
          { text: '졸업했구나', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-네요 变形：动词/形容词词干 + 네요', textEn: '-네요 conjugation: verb/adjective stem + 네요', examples: '가다→가네요 / 예쁘다→예쁘네요 / 학생이다→학생이네요' },
      { type: 'rule', text: '-군요 变形：动词词干 + 는군요 / 形容词词干 + 군요', textEn: '-군요 conjugation: verb stem + 는군요 / adjective stem + 군요', examples: '먹다→먹는군요 / 크다→크군요 / 갔다→갔군요' },
      { type: 'rule', text: '-구나 变形：动词词干 + 는구나 / 形容词词干 + 구나', textEn: '-구나 conjugation: verb stem + 는구나 / adjective stem + 구나', examples: '먹다→먹는구나 / 예쁘다→예쁘구나' },
      { type: 'rule', text: '过去时：词干 + 았/었/였 + 네요/군요/구나', textEn: 'Past tense: stem + 았/었/였 + 네요/군요/구나', examples: '갔네요 / 먹었군요 / 공부했구나' },
      { type: 'usage', text: '用于新发现：刚刚知道或看到某件事时的自然反应', textEn: 'Used for new discoveries: a natural reaction when you\'ve just learned or seen something', examples: '아, 여기 있었네요!（啊，原来在这里！）/ 오늘 쉬는군요（今天休息啊）', examplesEn: '아, 여기 있었네요! (Oh, it was here!) / 오늘 쉬는군요 (Taking a break today, huh)' },
      { type: 'note', text: '-구나 礼貌级别最低，只用于自言自语或对平辈/晚辈', textEn: '-구나 has the lowest politeness level; only used for self-talk or with peers/juniors', examples: '혼잣말：아, 이렇게 하는구나（哦，原来是这样做的）', examplesEn: 'Self-talk: 아, 이렇게 하는구나 (Oh, so that\'s how you do it)' },
      { type: 'compare', text: '-네요 vs -군요：内容一样，-군요 稍更书面', textEn: '-네요 vs -군요: same meaning, but -군요 is slightly more formal/written', examples: '맛있네요 ≈ 맛있군요，日常对话首选 -네요', examplesEn: '맛있네요 ≈ 맛있군요; in everyday conversation, -네요 is preferred' },
      { type: 'note', text: '中文没有对应的语法标记：这三个都是"当场才发现、才领会到"的专用感叹，中文靠"啊/呀/原来"等语气词表达。关键限制——只用于刚知道的新信息，早就知道的事实要用普通陈述 -아/어요，不能套 -네요。', textEn: 'Chinese has no equivalent grammatical marker: these three are exclamations for "just realizing or understanding on the spot," expressed in Chinese with particles like "啊/呀/原来." Key restriction — only for newly learned information; for facts you already knew, use the plain statement -아/어요, not -네요.' },
      { type: 'compare', text: '-네요 vs -군요 的语感差别', textEn: 'The nuance difference between -네요 and -군요', examples: '-네요 偏"亲眼看到、亲耳听到"的直接感受(음식이 맛있네요)；-군요 偏"听说或想通后"的领会(아, 그래서 안 왔군요＝原来因此没来啊)', examplesEn: '-네요 leans toward direct feelings from seeing or hearing firsthand (음식이 맛있네요); -군요 leans toward realization from hearing or figuring something out (아, 그래서 안 왔군요 = Ah, so that\'s why you didn\'t come).' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '음식이', role: 'subject' },
          { text: '정말 맛있네요', role: 'verb' },
        ],
        zh: '食物真的很好吃啊！', zhEn: 'The food is really delicious!',
        swapWords: ['맛있네요', '맵네요', '달콤하네요', '신기하네요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '벌써', role: 'time' },
          { text: '10시가', role: 'subject' },
          { text: '됐군요', role: 'verb' },
        ],
        zh: '已经10点了啊。', zhEn: 'It\'s already 10 o\'clock.',
        swapWords: ['됐군요', '넘었군요', '지났군요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '여기', role: 'place' },
          { text: '카페가', role: 'subject' },
          { text: '생겼네요', role: 'verb' },
        ],
        zh: '这里开了家咖啡店啊。', zhEn: 'A coffee shop opened here.',
        swapWords: ['생겼네요', '없어졌네요', '바뀌었네요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🌸', context: '赞美对方', contextEn: 'Complimenting the other person', ko: '한국어를 정말 잘하시네요! 어디서 배우셨어요?', zh: '您韩语说得真好！在哪里学的？', zhEn: 'You speak Korean so well! Where did you learn?' },
      { icon: '🎵', context: 'KPOP 新歌', contextEn: 'New KPOP song', ko: '이 노래 정말 좋네요. 계속 듣고 싶어요.', zh: '这首歌真好听，想一直听。', zhEn: 'This song is so good, I want to keep listening.' },
      { icon: '😮', context: '惊喜发现', contextEn: 'Surprise discovery', ko: '아, 여기가 그 유명한 곳이군요!', zh: '啊，原来这里就是那个有名的地方！', zhEn: 'Oh, so this is that famous place!' },
      { icon: '📚', context: '自学感悟', contextEn: 'Self-study insight', ko: '이렇게 공부하면 되는구나. 이제 알겠어.', zh: '原来这样学就行啊，现在明白了。', zhEn: 'So this is how you study—now I get it.' },
      { icon: '☕', context: '咖啡厅', contextEn: 'Café', ko: '오늘 사람이 많네요. 기다려야 할 것 같아요.', zh: '今天人好多啊，看来要等一下了。', zhEn: 'There are so many people today—looks like we\'ll have to wait.' },
      { icon: '✈️', context: '旅行韩国', contextEn: 'Traveling in Korea', ko: '서울이 생각보다 크군요!', zh: '首尔比想象中大啊！', zhEn: 'Seoul is bigger than I imagined!' },
    ],
    mistakes: [
      { wrong: '맛있는구나（形容词）', wrongEn: '맛있는구나 (adjective)', correct: '맛있구나', note: '形容词 + -구나 直接接词干，不需要加 -는。只有动词才用 -는구나。', noteEn: 'Adjective + -구나 attaches directly to the stem without -는. Only verbs use -는구나.' },
      { wrong: '선생님께 "그렇구나"', correct: '그렇군요 / 그렇네요', note: '-구나 对长辈用是失礼的，必须换成 -군요 或 -네요。', noteEn: 'Using -구나 with elders is rude—you must switch to -군요 or -네요.' },
      { wrong: '오늘 날씨가 좋는네요', correct: '오늘 날씨가 좋네요', note: '形容词接 -네요 直接接词干，不加 -는。', noteEn: 'Adjectives take -네요 directly on the stem, without -는.' },
      { wrong: '（介绍早就认识的朋友时）제 친구예요. 키가 크네요', wrongEn: '(When introducing a friend you\'ve known for a while) 제 친구예요. 키가 크네요', correct: '제 친구예요. 키가 커요', note: '-네요 是"当场新发现"的感叹。陈述自己早就知道的事实（朋友很高）要用 -아/어요；用 -네요 会像刚刚才注意到，不自然。', noteEn: '-네요 expresses a discovery made on the spot. To state a fact you already knew (like your friend being tall), use -아/어요; using -네요 sounds like you just noticed, which is unnatural.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P9 · 第2课</div>
    <div class="ov-hero-title">不定阶(2)：-네요, -군요, -구나</div>
    <div class="ov-hero-sub">新发现和感叹的三种表达，对话中超自然</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">三者对比</div></div>
    <div class="ov-block">
      <div class="tbl-row hd"><div class="tc">语尾</div><div class="tc">礼貌度</div><div class="tc">适用场合</div></div>
      <div class="tbl-row"><div class="tc">-네요</div><div class="tc">礼貌</div><div class="tc">任何场合，最安全</div></div>
      <div class="tbl-row"><div class="tc">-군요</div><div class="tc">礼貌（稍正式）</div><div class="tc">对话/书面均可</div></div>
      <div class="tbl-row"><div class="tc">-구나</div><div class="tc">非正式</div><div class="tc">自言自语/对晚辈</div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">-네요 · -군요 · -구나</div>
<div class="card-body">三个感叹语尾都表示"哦原来如此"，区别只在礼貌程度。-네요 最安全，任何场合都能用。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-네요（礼貌感叹，万能）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">한국어를 정말 잘하시네요!</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">您韩语说得真好啊！</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-구나（自言自语/对晚辈）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">아, 이렇게 하는구나.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">哦，原来是这样做的。</div>
    </div>
  </div>
</div>
<div class="reminder-box">对长辈绝对不用 -구나，会显得失礼。不确定就用 -네요，永远安全。</div>`,
    compareHtml: `<div class="card-title">-네요 vs -군요 vs -구나</div>
<div class="card-body">三者意思相同，区别在礼貌程度和使用场合。日常首选 -네요，-구나 只对自己或晚辈用。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-네요 → 最安全，任何场合</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词/形容词词干 + 네요</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">맛있네요!</span><span style="font-size:16px;color:#5a4640">真好吃啊！（对任何人都可）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">많이 바뀌었네요.</span><span style="font-size:16px;color:#5a4640">变化好大啊。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-군요 → 稍正式，书面/对话均可</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词词干 + 는군요 / 形容词词干 + 군요</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">서울이 정말 크군요.</span><span style="font-size:16px;color:#5a4640">首尔真大啊。（稍正式）</span></div>
  </div>
  <div class="tok-row" style="background:#f5f0fb;border-radius:12px;padding:12px">
    <div class="tok t-v">-구나 → 非正式，自言自语/晚辈</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词词干 + 는구나 / 形容词词干 + 구나</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">아, 그렇구나.</span><span style="font-size:16px;color:#5a4640">哦，原来如此。（自言自语）</span></div>
  </div>
</div>
<div class="reminder-box">形容词 + -네요/-군요/-구나 直接接词干，不加 -는。只有动词才用 -는네요/-는군요/-는구나。</div>`,
    compareLabel: '-네요（万能）vs -군요（正式）vs -구나（非正式）', compareLabelEn: '-네요 (all-purpose) vs -군요 (formal) vs -구나 (informal)',
    quickTable: {
      title: '三种感叹语尾接续速查', titleEn: 'Three Exclamatory Endings — Conjugation Quick Reference',
      headers: ['语尾', '动词现在', '形容词', '过去时', '适用场合'],
      rows: [
        [{ ko: '-네요', zh: '礼貌', zhEn: 'politeness' }, { ko: '词干 + 네요', zh: '가네요' }, { ko: '词干 + 네요', zh: '좋네요' }, { ko: '았/었 + 네요', zh: '갔네요' }, { ko: '任何场合', zh: '最安全', zhEn: 'Safest' }],
        [{ ko: '-군요', zh: '稍正式', zhEn: 'Slightly formal' }, { ko: '词干 + 는군요', zh: '가는군요' }, { ko: '词干 + 군요', zh: '좋군요' }, { ko: '았/었 + 군요', zh: '갔군요' }, { ko: '对话/书面', zh: '' }],
        [{ ko: '-구나', zh: '非正式', zhEn: 'Informal' }, { ko: '词干 + 는구나', zh: '가는구나' }, { ko: '词干 + 구나', zh: '좋구나' }, { ko: '았/었 + 구나', zh: '갔구나' }, { ko: '自言自语/晚辈', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选择正确的感叹语尾', titleEn: 'Choose the Correct Exclamatory Ending',
      body: '根据场合和词性选择合适的语尾形式。', bodyEn: 'Choose the appropriate ending based on the situation and part of speech.',
      questions: [
        { pre: '对上司说：서울이 정말 크', preEn: 'To a superior: 서울이 정말 크', post: '（首尔真大啊）', postEn: '(Seoul is really big)', options: ['구나', '는구나', '구나요', '네요'], answer: 3, explanation: '对上司用礼貌语尾 -네요。구나요 是错误形式（구나 + 요 不能组合），-구나 对长辈失礼。', explanationEn: 'Use polite ending -네요 with superiors. 구나요 is incorrect (구나 + 요 can\'t combine), and -구나 is rude to elders.' },
        { pre: '自言自语：아, 이게 정답이', preEn: 'Self-talk: 아, 이게 정답이', post: '（哦，原来这是答案）', postEn: '(Oh, so this is the answer)', options: ['네요', '구나', '군요', '는구나'], answer: 1, explanation: '形容词/이다 + -구나，自言自语用非正式 -구나', explanationEn: 'Adjective/이다 + -구나, use informal -구나 for self-talk' },
        { pre: '形容词 맛있다 + -군요 →', preEn: 'Adjective 맛있다 + -군요 →', post: '', options: ['맛있군요', '맛있는군요', '맛있었는군요', '맛있겠군요'], answer: 0, explanation: '形容词直接接 -군요，不加 -는', explanationEn: 'Adjectives directly take -군요, no -는 added' },
        { pre: '动词 먹다 + -는구나 →', preEn: 'Verb 먹다 + -는구나 →', post: '', options: ['먹는는구나', '먹구나', '먹는구나', '먹었는구나'], answer: 2, explanation: '动词现在 + -는구나 → 먹는구나', explanationEn: 'Verb present + -는구나 → 먹는구나' },
      ],
    },
    linkedGrammarIds: ['g16', 'g17'],
  },
  {
    id: 'card-p9-l03',
    partNumber: 9,
    lessonNumber: 3,
    title: '-는/은/ㄴ/을/ㄹ 것 같다',
    whatItDoes: '说"感觉/好像"，表达柔和的推测', whatItDoesEn: 'Saying "feel like/seem" — Expressing Soft Guesses',
    whatItDoesBody: '-는/을 것 같다 是韩语表达推测最自然的方式，比直接断言更礼貌。\n时态通过冠词形变化体现：现在(-는/-은/ㄴ)、过去(-은/ㄴ)、将来(-을/ㄹ)。\n日常对话、韩剧、综艺里出现频率极高，必须熟练掌握。', whatItDoesBodyEn: '-는/을 것 같다 is the most natural way to express guesses in Korean, more polite than direct assertions.\\nTense is shown through the adnominal form: present (-는/-은/ㄴ), past (-은/ㄴ), future (-을/ㄹ).\\nIt appears constantly in daily conversation, K-dramas, and variety shows — you must master it.',
    structureNote: '变形规则取决于词性和时态。\n动词现在时 + 는 것 같다 / 形容词 + 은/ㄴ 것 같다 / 将来 + 을/ㄹ 것 같다。', structureNoteEn: 'The conjugation rules depend on the part of speech and tense.\\nVerb present + 는 것 같다 / Adjective + 은/ㄴ 것 같다 / Future + 을/ㄹ 것 같다.',
    rulesNote: '形容词现在时直接接 -은/ㄴ（不用 -는）。\n过去式：动词过去冠词形 -은/ㄴ 것 같다（간 것 같다）或 -았/었을 것 같다（갔을 것 같다），两种都自然。', rulesNoteEn: 'For adjectives in the present tense, attach -은/ㄴ directly (not -는).\\nPast tense: verb past adnominal -은/ㄴ 것 같다 (간 것 같다) or -았/었을 것 같다 (갔을 것 같다) — both are natural.',
    structures: [
      {
        ko: '저 사람이 배우인 것 같아요',
        zh: '那个人好像是演员。', zhEn: 'That person seems to be an actor.',
        tokens: [
          { text: '저 사람이', role: 'subject' },
          { text: '배우인 것 같아요', role: 'verb' },
        ],
      },
      {
        ko: '날씨가 추운 것 같아요',
        zh: '天气好像很冷。', zhEn: 'The weather seems very cold.',
        tokens: [
          { text: '날씨가', role: 'subject' },
          { text: '추운 것 같아요', role: 'verb' },
        ],
      },
      {
        ko: '그 영화가 재미있는 것 같아요',
        zh: '那部电影好像很有趣。', zhEn: 'That movie seems interesting.',
        tokens: [
          { text: '그 영화가', role: 'subject' },
          { text: '재미있는 것 같아요', role: 'verb' },
        ],
      },
      {
        ko: '내일 눈이 올 것 같아요',
        zh: '明天好像会下雪。', zhEn: 'It seems like it will snow tomorrow.',
        tokens: [
          { text: '내일', role: 'time' },
          { text: '눈이', role: 'subject' },
          { text: '올 것 같아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词 现在：词干 + 는 것 같다', textEn: 'Verb present: stem + 는 것 같다', examples: '먹다→먹는 것 같다 / 자다→자는 것 같다' },
      { type: 'rule', text: '形容词 现在：有收音+은/无收音+ㄴ 것 같다', textEn: 'Adjectives, present tense: with batchim +은 / without batchim +ㄴ 것 같다', examples: '작다→작은 것 같다 / 크다→큰 것 같다 / 예쁘다→예쁜 것 같다' },
      { type: 'rule', text: '名词+이다：名词+인 것 같다', textEn: 'Noun + 이다: noun + 인 것 같다', examples: '학생이다→학생인 것 같다 / 배우이다→배우인 것 같다' },
      { type: 'rule', text: '过去推测：动词过去冠词形 -은/ㄴ 것 같다 / 또는 -았/었을 것 같다', textEn: 'Past speculation: verb past adnominal form -은/ㄴ 것 같다 / or -았/었을 것 같다', examples: '간 것 같다 / 먹은 것 같다 / 갔을 것 같다 / 먹었을 것 같다' },
      { type: 'rule', text: '将来：有收音+을/无收音+ㄹ 것 같다', textEn: 'Future: with batchim +을 / without batchim +ㄹ 것 같다', examples: '먹다→먹을 것 같다 / 가다→갈 것 같다 / 오다→올 것 같다' },
      { type: 'usage', text: '比直接断言更礼貌，适合表达不确定或谦虚的推测', textEn: 'More polite than direct assertion; suitable for uncertain or humble speculation', examples: '비가 와요（确定）vs 비가 오는 것 같아요（感觉好像下雨了）', examplesEn: '비가 와요 (certain) vs 비가 오는 것 같아요 (feels like it\'s raining)' },
      { type: 'note', text: '口语中常缩略为 -는/은 것 같아 或 -ㄹ 것 같아', textEn: 'In speech, often shortened to -는/은 것 같아 or -ㄹ 것 같아', examples: '좀 어려운 것 같아（感觉有点难）/ 늦을 것 같아（好像要迟到了）', examplesEn: '좀 어려운 것 같아 (feels a bit hard) / 늦을 것 같아 (seems like I\'ll be late)' },
      { type: 'note', text: '例外：있다/없다 结尾的形容词现在时用 -는 것 같다（跟动词一样），不是 -은。这类词形式上带 있다/없다，所以走动词的接法。', textEn: 'Exception: adjectives ending in 있다/없다 use -는 것 같다 in present tense (like verbs), not -은. These words formally contain 있다/없다, so they follow verb conjugation.', examples: '재미있다→재미있는 것 같다 / 맛있다→맛있는 것 같다 / 없다→없는 것 같다' },
      { type: 'compare', text: '过去两种形式的语感：간 것 같다 vs 갔을 것 같다', textEn: 'Nuance of the two past forms: 간 것 같다 vs 갔을 것 같다', examples: '간 것 같다＝有眼前证据的推断（鞋不见了，好像已经走了）；갔을 것 같다＝纯靠推理、更不确定（这个点，他大概已经走了吧）', examplesEn: '간 것 같다 = inference with visible evidence (shoes are gone, seems he\'s already left); 갔을 것 같다 = pure reasoning, more uncertain (at this hour, he\'s probably already gone)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '길이', role: 'subject' },
          { text: '막히는 것 같아요', role: 'verb' },
        ],
        zh: '今天好像堵车。', zhEn: 'It seems like there\'s traffic today.',
        swapWords: ['막히는 것 같아요', '안 막히는 것 같아요', '좀 막히는 것 같아요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 옷이', role: 'subject' },
          { text: '저한테', role: 'plain' },
          { text: '어울리는 것 같아요', role: 'verb' },
        ],
        zh: '这件衣服好像挺适合我的。', zhEn: 'This outfit seems to suit me well.',
        swapWords: ['어울리는 것 같아요', '안 어울리는 것 같아요', '좀 큰 것 같아요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그 가수가', role: 'subject' },
          { text: '정말 인기 있는 것 같아요', role: 'verb' },
        ],
        zh: '那位歌手好像真的很受欢迎。', zhEn: 'That singer seems really popular.',
        swapWords: ['인기 있는 것 같아요', '유명한 것 같아요', '실력이 좋은 것 같아요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🎬', context: '韩剧推测', contextEn: 'K-drama speculation', ko: '주인공이 그 사람을 좋아하는 것 같아요.', zh: '主角好像喜欢那个人。', zhEn: 'The main character seems to like that person.' },
      { icon: '🌨️', context: '天气', contextEn: 'weather', ko: '오늘 많이 추운 것 같아요. 두껍게 입으세요.', zh: '今天好像挺冷的，多穿一点。', zhEn: 'It seems pretty cold today; dress warmly.' },
      { icon: '🍜', context: '餐厅', contextEn: 'Restaurant', ko: '여기 음식이 맛있는 것 같아요. 사람이 많네요.', zh: '这里的食物好像很好吃，人很多啊。', zhEn: 'The food here seems delicious—there are so many people.' },
      { icon: '✈️', context: '旅行', contextEn: 'Travel', ko: '길을 잃은 것 같아요. 지도 볼게요.', zh: '好像迷路了，我看一下地图。', zhEn: 'I think I\'m lost; let me check the map.' },
      { icon: '📱', context: '日常', contextEn: 'Daily', ko: '배터리가 없는 것 같아요. 충전기 있어요?', zh: '好像没电了，有充电器吗？', zhEn: 'It seems the battery\'s dead; do you have a charger?' },
      { icon: '🎵', context: 'KPOP', ko: '이 그룹이 곧 컴백할 것 같아요!', zh: '这个组合好像快要回归了！', zhEn: 'This group seems about to make a comeback!' },
    ],
    mistakes: [
      { wrong: '날씨가 춥는 것 같아요（形容词）', wrongEn: '날씨가 춥는 것 같아요 (adjective)', correct: '날씨가 추운 것 같아요', note: '形容词用 -은/ㄴ 것 같다，不加 -는。只有动词现在时才用 -는 것 같다。', noteEn: 'Adjectives use -은/ㄴ 것 같다, not -는. Only verbs in present tense use -는 것 같다.' },
      { wrong: '학생것 같다', correct: '학생인 것 같다', note: '名词后必须加 -인 것 같다，不能省略 -인。', noteEn: 'After a noun, you must add -인 것 같다; you can\'t omit -인.' },
      { wrong: '내일 비가 오는 것 같아요（将来）', wrongEn: '내일 비가 오는 것 같아요 (future)', correct: '내일 비가 올 것 같아요', note: '将来推测用 -을/ㄹ 것 같다，-는 것 같다 表示现在正在发生。', noteEn: 'For future speculation use -을/ㄹ 것 같다; -는 것 같다 indicates something happening now.' },
      { wrong: '이 영화 재미있은 것 같아요', correct: '이 영화 재미있는 것 같아요', note: '재미있다/맛있다/없다 这类带 있다·없다 的形容词是例外，现在时用 -는 것 같다 而不是 -은。别因为"它是形容词"就套 -은。', noteEn: 'Adjectives like 재미있다/맛있다/없다 that contain 있다·없다 are exceptions: use -는 것 같다 for present tense, not -은. Don\'t just apply -은 because it\'s an adjective.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P9 · 第3课</div>
    <div class="ov-hero-title">-는/은/ㄴ/을/ㄹ 것 같다</div>
    <div class="ov-hero-sub">柔和推测的万能句型，时态由冠词形决定</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">变形速查</div></div>
    <div class="ov-block">
      <div class="tbl-row hd"><div class="tc">时态/词性</div><div class="tc">变形</div><div class="tc">例子</div></div>
      <div class="tbl-row"><div class="tc">动词 现在</div><div class="tc">词干+는 것 같다</div><div class="tc">먹는 것 같다</div></div>
      <div class="tbl-row"><div class="tc">形容词</div><div class="tc">词干+은/ㄴ 것 같다</div><div class="tc">추운 것 같다</div></div>
      <div class="tbl-row"><div class="tc">名词</div><div class="tc">名词+인 것 같다</div><div class="tc">학생인 것 같다</div></div>
      <div class="tbl-row"><div class="tc">将来</div><div class="tc">词干+을/ㄹ 것 같다</div><div class="tc">올 것 같다</div></div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">-는/은/ㄴ/을/ㄹ 것 같다</div>
<div class="card-body">说"好像/感觉"，是韩语最常用的推测句型。时态靠冠词形变化体现，一个模板走遍所有场景。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">现在推测（动词）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">지금 자는 것 같아요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">好像现在在睡觉。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">将来推测</div>
      <div style="font-size:16px;font-weight:800;color:#241917">비가 올 것 같아요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">好像要下雨了。</div>
    </div>
  </div>
</div>
<div class="reminder-box">形容词 + -는 것 같다 ✗ — 形容词는 -은/ㄴ 것 같다，不用 -는。</div>`,
    compareHtml: `<div class="card-title">-것 같다 时态变化总览</div>
<div class="card-body">-것 같다 本身不变，时态信息全靠前面的冠词形传递。记住4种冠词形就能说所有推测。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">动词 现在：词干 + 는 것 같다</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">가는 것 같아요</span><span style="font-size:16px;color:#5a4640">好像在去</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">먹는 것 같아요</span><span style="font-size:16px;color:#5a4640">好像在吃</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">形容词：词干 + 은/ㄴ 것 같다</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">추운 것 같아요</span><span style="font-size:16px;color:#5a4640">好像很冷</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">바쁜 것 같아요</span><span style="font-size:16px;color:#5a4640">好像很忙</span></div>
  </div>
  <div class="tok-row" style="background:#f0eef8;border-radius:12px;padding:12px">
    <div class="tok t-v">过去：动词 词干 + 은/ㄴ 것 같다 / -았/었을 것 같다</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">간 것 같아요</span><span style="font-size:16px;color:#5a4640">好像去了</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">갔을 것 같아요</span><span style="font-size:16px;color:#5a4640">大概去了</span></div>
  </div>
  <div class="tok-row" style="background:#fff8f0;border-radius:12px;padding:12px">
    <div class="tok t-v">将来：词干 + 을/ㄹ 것 같다</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">올 것 같아요</span><span style="font-size:16px;color:#5a4640">好像会来</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">비가 올 것 같아요</span><span style="font-size:16px;color:#5a4640">好像要下雨</span></div>
  </div>
</div>
<div class="reminder-box">形容词 + -는 것 같다 ✗ → 形容词는 -은/ㄴ 것 같다 ✓（추운 것 같아요，not 춥는 것 같아요）</div>`,
    compareLabel: '-것 같다 时态：现在/形容词/过去/将来 四种冠词形', compareLabelEn: '-것 같다 tenses: four adnominal forms for present/adjective/past/future',
    quickTable: {
      title: '-것 같다 接续速查', titleEn: '-것 같다 Conjugation Quick Reference',
      headers: ['词性/时态', '接续规则', '예시'],
      rows: [
        [{ ko: '동사 현재', zh: '进行/现在', zhEn: 'Progressive/Present' }, { ko: '词干 + 는 것 같다', zh: '' }, { ko: '자는 것 같다 / 먹는 것 같다', zh: '好像在睡/吃', zhEn: 'Seems to be sleeping/eating' }],
        [{ ko: '형용사', zh: '现在状态', zhEn: 'Present state' }, { ko: '有收音+은/无收音+ㄴ 것 같다', zh: '' }, { ko: '추운 것 같다 / 바쁜 것 같다', zh: '好像很冷/忙', zhEn: 'Seems cold/busy' }],
        [{ ko: '명사+이다', zh: '' }, { ko: '명사 + 인 것 같다', zh: '' }, { ko: '학생인 것 같다', zh: '好像是学生', zhEn: 'Seems to be a student' }],
        [{ ko: '과거', zh: '过去推测', zhEn: 'Past speculation' }, { ko: '词干+은/ㄴ 것 같다 / -았/었을 것 같다', zh: '' }, { ko: '간 것 같다 / 갔을 것 같다', zh: '好像去了', zhEn: 'Seems like (someone) went' }],
        [{ ko: '미래', zh: '将来推测', zhEn: 'Future conjecture' }, { ko: '有收音+을/无收音+ㄹ 것 같다', zh: '' }, { ko: '올 것 같다 / 먹을 것 같다', zh: '好像会来/吃', zhEn: 'Seems like (he/she) will come/eat' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选出正确的 -것 같다 形式', titleEn: 'Choose the Correct -것 같다 Form',
      body: '根据词性和时态选择正确的接续形式。', bodyEn: 'Choose the correct connective form based on part of speech and tense.',
      questions: [
        { pre: '形容词 춥다 →', preEn: 'Adjective 춥다 →', post: '（好像很冷）', postEn: '(Seems cold)', options: ['춥은 것 같아요', '춥는 것 같아요', '추운 것 같아요', '출 것 같아요'], answer: 2, explanation: '形容词无收音+ㄴ 것 같다，춥다 ㅂ불규칙 → 추운 것 같아요', explanationEn: 'Adjective without final consonant +ㄴ 것 같다; 춥다 is ㅂ-irregular → 추운 것 같아요' },
        { pre: '动词 가다 现在 →', preEn: 'Verb 가다 present →', post: '（好像在去）', postEn: '(Seems to be going)', options: ['갈 것 같아요', '가는 것 같아요', '간 것 같아요', '가은 것 같아요'], answer: 1, explanation: '动词 现在 + 는 것 같다 → 가는 것 같아요', explanationEn: 'Verb present + 는 것 같다 → 가는 것 같아요' },
        { pre: '动词 먹다 将来 →', preEn: 'Verb 먹다 future →', post: '（好像要吃）', postEn: '(Seems like (he/she) will eat)', options: ['먹을 것 같아요', '먹은 것 같아요', '먹는 것 같아요', '먹인 것 같아요'], answer: 0, explanation: '将来는 有收音+을 것 같다 → 먹을 것 같아요', explanationEn: 'Future: with final consonant +을 것 같다 → 먹을 것 같아요' },
        { pre: '名词 학생이다 →', preEn: 'Noun 학생이다 →', post: '（好像是学生）', postEn: '(Seems to be a student)', options: ['학생은 것 같아요', '학생이는 것 같아요', '학생는 것 같아요', '학생인 것 같아요'], answer: 3, explanation: '名词+이다 → 名词+인 것 같다 → 학생인 것 같아요', explanationEn: 'Noun + 이다 → Noun + 인 것 같다 → 학생인 것 같아요' },
      ],
    },
    linkedGrammarIds: ['g69'],
  },
  {
    id: 'card-p9-l04',
    partNumber: 9,
    lessonNumber: 4,
    title: '-동안, 마다, -을/ㄹ 때마다',
    whatItDoes: '表示"持续时间"和"每次/每…"', whatItDoesEn: 'Expressing "Duration" and "Every/Each..."',
    whatItDoesBody: '-동안 表示某个动作或状态持续的时间段，相当于"在……期间/……的时间里"。\n마다 接在名词后表示"每……"，-을/ㄹ 때마다 接在动词后表示"每当……的时候"。\n这三个表达在描述日常规律和习惯时非常好用。', whatItDoesBodyEn: '-동안 indicates the time period during which an action or state lasts, like "during.../in the time of...".\\n마다 attaches to nouns to mean "every...", and -을/ㄹ 때마다 attaches to verbs to mean "every time...".\\nThese three expressions are great for describing daily routines and habits.',
    structureNote: '-동안：时间名词 + 동안 / 动词 + 는 동안\n마다：名词 + 마다\n-을/ㄹ 때마다：动词词干 + 을/ㄹ 때마다', structureNoteEn: '-동안: time noun + 동안 / verb + 는 동안\\n마다: noun + 마다\\n-을/ㄹ 때마다: verb stem + 을/ㄹ 때마다',
    rulesNote: '时间名词 + 동안：3시간 동안（3小时之间）/ 일 년 동안（一年之间）\n-는 동안：동작이 진행되는 동안（在……进行期间）\n마다 常与时间词搭配：매일（每天）/ 매주（每周）/ 주말마다（每个周末）', rulesNoteEn: 'Time noun + 동안: 3시간 동안 (for 3 hours) / 일 년 동안 (for a year)\\n-는 동안: 동작이 진행되는 동안 (during the action\'s progress)\\n마다 often pairs with time words: 매일 (every day) / 매주 (every week) / 주말마다 (every weekend)',
    structures: [
      {
        ko: '3시간 동안 공부했어요',
        zh: '学习了3个小时。', zhEn: 'I studied for 3 hours.',
        tokens: [
          { text: '3시간 동안', role: 'time' },
          { text: '공부했어요', role: 'verb' },
        ],
      },
      {
        ko: '제가 자는 동안 전화가 왔어요',
        zh: '我睡觉的时候来电话了。', zhEn: 'I got a call while I was sleeping.',
        tokens: [
          { text: '제가', role: 'subject' },
          { text: '자는 동안', role: 'time' },
          { text: '전화가 왔어요', role: 'verb' },
        ],
      },
      {
        ko: '주말마다 운동해요',
        zh: '每个周末都运动。', zhEn: 'I exercise every weekend.',
        tokens: [
          { text: '주말마다', role: 'time' },
          { text: '운동해요', role: 'verb' },
        ],
      },
      {
        ko: '이 노래를 들을 때마다 생각나요',
        zh: '每次听这首歌都会想起来。', zhEn: 'Every time I hear this song, I remember.',
        tokens: [
          { text: '이 노래를', role: 'object' },
          { text: '들을 때마다', role: 'time' },
          { text: '생각나요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '시간 + 동안：某段时间持续', textEn: '시간 + 동안: duration of a certain time period', examples: '한 시간 동안（1小时之间）/ 방학 동안（假期里）/ 여행 동안（旅行期间）', examplesEn: '한 시간 동안 (for an hour) / 방학 동안 (during vacation) / 여행 동안 (during the trip)' },
      { type: 'rule', text: '动词 + 는 동안：动作进行期间', textEn: 'Verb + 는 동안: during the action', examples: '기다리는 동안（等待的期间）/ 밥 먹는 동안（吃饭的时候）', examplesEn: '기다리는 동안 (while waiting) / 밥 먹는 동안 (while eating)' },
      { type: 'rule', text: '名词 + 마다：每……', textEn: 'Noun + 마다: every...', examples: '날마다（每天）/ 시간마다（每小时）/ 사람마다（每个人）/ 계절마다（每个季节）', examplesEn: '날마다 (every day) / 시간마다 (every hour) / 사람마다 (every person) / 계절마다 (every season)' },
      { type: 'rule', text: '动词 + 을/ㄹ 때마다：每当做……的时候', textEn: 'Verb + 을/ㄹ 때마다: every time you do...', examples: '볼 때마다（每次看）/ 만날 때마다（每次见面）/ 먹을 때마다（每次吃）', examplesEn: '볼 때마다 (every time I see) / 만날 때마다 (every time we meet) / 먹을 때마다 (every time I eat)' },
      { type: 'usage', text: '-는 동안 vs -을/ㄹ 때：동안 强调持续时间段，때 强调时间点', textEn: '-는 동안 vs -을/ㄹ 때: 동안 emphasizes the duration, 때 emphasizes the point in time', examples: '공부하는 동안（学习期间，强调时段）vs 공부할 때（学习的时候，强调时间点）', examplesEn: '공부하는 동안 (during studying, emphasizes period) vs 공부할 때 (when studying, emphasizes point)' },
      { type: 'note', text: 'KPOP/韩剧常用：그리울 때마다（每当想念的时候）', textEn: 'Common in KPOP/K-dramas: 그리울 때마다 (every time I miss you)', examples: '보고 싶을 때마다 이 노래 들어요（每次想念就听这首歌）', examplesEn: '보고 싶을 때마다 이 노래 들어요 (Every time I miss you, I listen to this song)' },
      { type: 'note', text: '中文一个"每"字，韩语要分两套：数量/时间名词用 名词+마다；"每当做某个动作"要用 动词+을/ㄹ 때마다。别把 마다 直接贴到动词上。', textEn: 'In Chinese, one \'every\' covers both, but Korean splits it: for quantity/time nouns use noun+마다; for \'every time you do an action\' use verb+을/ㄹ 때마다. Don\'t attach 마다 directly to verbs.', examples: '주말마다（每个周末，名词）/ 만날 때마다（每次见面，动作）', examplesEn: '주말마다 (every weekend, noun) / 만날 때마다 (every time we meet, action)' },
      { type: 'note', text: '마다 不止表示"每隔"，还表示"各自不同"，常跟 다르다 一起出现。读到 사람마다 别理解成"每次人"，而是"每个人各不相同"。', textEn: '마다 doesn\'t just mean \'every\'—it also means \'each different\' and often pairs with 다르다. When you see 사람마다, don\'t read it as \'every time person\' but as \'each person is different.\'', examples: '사람마다 성격이 달라요（每个人性格都不同）/ 나라마다 문화가 달라요（各国文化各异）', examplesEn: '사람마다 성격이 달라요 (Each person\'s personality is different) / 나라마다 문화가 달라요 (Each country\'s culture is different)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국에 있는 동안', role: 'time' },
          { text: '매일', role: 'plain' },
          { text: '김치를', role: 'object' },
          { text: '먹었어요', role: 'verb' },
        ],
        zh: '在韩国期间每天都吃泡菜。', zhEn: 'I ate kimchi every day during my time in Korea.',
        swapWords: ['김치를', '삼겹살을', '떡볶이를', '비빔밥을'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '이 곡을', role: 'object' },
          { text: '들을 때마다', role: 'time' },
          { text: '기분이 좋아져요', role: 'verb' },
        ],
        zh: '每次听这首歌心情就会变好。', zhEn: 'Every time I hear this song, my mood gets better.',
        swapWords: ['기분이 좋아져요', '눈물이 나요', '힘이 나요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '주말마다', role: 'time' },
          { text: '카페에서', role: 'place' },
          { text: '한국어를', role: 'object' },
          { text: '공부해요', role: 'verb' },
        ],
        zh: '每个周末都在咖啡店学韩语。', zhEn: 'I study Korean at a café every weekend.',
        swapWords: ['공부해요', '책을 읽어요', '드라마를 봐요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '✈️', context: '旅行韩国', contextEn: 'Traveling in Korea', ko: '서울에 있는 동안 정말 많이 걸었어요.', zh: '在首尔期间走了好多路。', zhEn: 'I walked a lot during my time in Seoul.' },
      { icon: '🎵', context: 'KPOP 听歌', contextEn: 'Listening to K-POP', ko: '이 노래를 들을 때마다 그 시절이 생각나요.', zh: '每次听这首歌都会想起那段时光。', zhEn: 'Every time I hear this song, I think of those times.' },
      { icon: '📚', context: '学习习惯', contextEn: 'Study Habits', ko: '저는 밥 먹는 동안 한국어 유튜브를 봐요.', zh: '我吃饭的时候看韩语YouTube。', zhEn: 'I watch Korean YouTube while eating.' },
      { icon: '🏃', context: '运动习惯', contextEn: 'Exercise Habits', ko: '날마다 30분씩 운동하려고 해요.', zh: '打算每天运动30分钟。', zhEn: 'I plan to exercise for 30 minutes every day.' },
      { icon: '😊', context: '日常感受', contextEn: 'Daily Feelings', ko: '이 드라마를 볼 때마다 행복해요.', zh: '每次看这部剧都很幸福。', zhEn: 'Every time I watch this show, I feel happy.' },
      { icon: '🌙', context: '晚上习惯', contextEn: 'Evening Habits', ko: '자기 전 30분 동안 단어를 외워요.', zh: '睡前30分钟背单词。', zhEn: 'I memorize vocabulary for 30 minutes before bed.' },
    ],
    mistakes: [
      { wrong: '3시간 동안에 공부했어요', correct: '3시간 동안 공부했어요', note: '-동안 后不加 -에，直接接谓语。', noteEn: '-동안 is followed directly by the predicate, without adding -에.' },
      { wrong: '매일마다', correct: '매일 / 날마다', note: '매일 本身已有"每天"意思，再加마다是重复。用 날마다 或 매일 选一个。', noteEn: '매일 already means \'every day,\' so adding 마다 is redundant. Use either 날마다 or 매일.' },
      { wrong: '볼 때마다에', correct: '볼 때마다', note: '-을/ㄹ 때마다 后不加 -에，直接接谓语。', noteEn: '-을/ㄹ 때마다 is followed directly by the predicate, without adding -에.' },
      { wrong: '이 노래를 들으마다 생각나요', correct: '이 노래를 들을 때마다 생각나요', note: '마다 不能直接接动词。"每次做某动作"必须用 动词+을/ㄹ 때마다，中间的 때 不能省。', noteEn: '마다 cannot directly follow a verb. To say \'every time you do an action,\' you must use verb + 을/ㄹ 때마다, and the 때 in between cannot be omitted.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P9 · 第4课</div>
    <div class="ov-hero-title">-동안, 마다, -을/ㄹ 때마다</div>
    <div class="ov-hero-sub">描述持续时间和规律习惯的三种句型</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">持续</div>
      <div class="ko">시간 + 동안 / 动词 + 는 동안</div>
      <div class="zh">在……期间，持续了……</div>
    </div>
    <div class="ov-block">
      <div class="badge">每……</div>
      <div class="ko">名词 + 마다</div>
      <div class="zh">每个……（날마다/주말마다/사람마다）</div>
    </div>
    <div class="ov-block">
      <div class="badge">每当</div>
      <div class="ko">动词 + 을/ㄹ 때마다</div>
      <div class="zh">每次做……的时候</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">-동안 · 마다 · -을/ㄹ 때마다</div>
<div class="card-body">三个时间表达：-동안（在……期间）、마다（每个……）、-을/ㄹ 때마다（每次……的时候）。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-동안（期间）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">방학 동안 한국어를 공부했어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">假期期间学了韩语。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-을 때마다（每次）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">이 노래를 들을 때마다 생각나요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">每次听这首歌都会想起你。</div>
    </div>
  </div>
</div>
<div class="reminder-box">-동안 前接名词直接加，接动词用 -는 동안（하는 동안）。마다 只接名词，不接动词词干。</div>`,
    compareHtml: `<div class="card-title">-동안 vs 마다 vs -을/ㄹ 때마다</div>
<div class="card-body">三者都和时间有关，但意思不同：-동안 说"持续多久"，마다 说"每个"，-때마다 说"每次发生时"。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-동안 → 持续一段时间</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">名词 + 동안 / 动词词干 + 는 동안</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">3년 동안 살았어요.</span><span style="font-size:16px;color:#5a4640">住了3年。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">자는 동안 전화가 왔어요.</span><span style="font-size:16px;color:#5a4640">睡觉期间来了电话。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">마다 → 每一个（无例外）</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">名词 + 마다</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">날마다 운동해요.</span><span style="font-size:16px;color:#5a4640">每天运动。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">사람마다 달라요.</span><span style="font-size:16px;color:#5a4640">每个人都不一样。</span></div>
  </div>
  <div class="tok-row" style="background:#f0eef8;border-radius:12px;padding:12px">
    <div class="tok t-v">-을/ㄹ 때마다 → 每次做……的时候</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">有收音+을 때마다 / 无收音+ㄹ 때마다</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">볼 때마다 반가워요.</span><span style="font-size:16px;color:#5a4640">每次见面都很高兴。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">먹을 때마다 생각나요.</span><span style="font-size:16px;color:#5a4640">每次吃都会想起。</span></div>
  </div>
</div>
<div class="reminder-box">마다 + 动词词干 ✗（먹마다 ✗）— 마다 只接名词。动词用 -을 때마다。</div>`,
    compareLabel: '-동안（持续期间）vs 마다（每个）vs -을/ㄹ 때마다（每次）', compareLabelEn: '-동안 (duration) vs 마다 (each) vs -을/ㄹ 때마다 (every time)',
    quickTable: {
      title: '时间表达接续速查', titleEn: 'Time Expressions — Conjugation Quick Reference',
      headers: ['语法', '接续', '意思', '例子'],
      rows: [
        [{ ko: '명사 + 동안', zh: '' }, { ko: '直接接名词', zh: '' }, { ko: '在……期间', zh: '' }, { ko: '방학 동안 / 3년 동안', zh: '假期期间/3年间', zhEn: 'During vacation / over 3 years' }],
        [{ ko: '-는 동안', zh: '' }, { ko: '동사词干 + 는 동안', zh: '' }, { ko: '在……的同时/期间', zh: '' }, { ko: '자는 동안 / 기다리는 동안', zh: '睡觉时/等待时', zhEn: 'While sleeping / while waiting' }],
        [{ ko: '명사 + 마다', zh: '' }, { ko: '直接接名词', zh: '' }, { ko: '每个……', zh: '' }, { ko: '날마다 / 주말마다', zh: '每天/每个周末', zhEn: 'Every day / every weekend' }],
        [{ ko: '-을/ㄹ 때마다', zh: '' }, { ko: '有收音+을/无收音+ㄹ 때마다', zh: '' }, { ko: '每次……的时候', zh: '' }, { ko: '볼 때마다 / 먹을 때마다', zh: '每次见/每次吃', zhEn: 'Every time I see / every time I eat' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选择正确的时间表达', titleEn: 'Choose the Correct Time Expression',
      body: '根据语境选出 -동안/마다/-을 때마다 的正确用法。', bodyEn: 'Choose the correct usage of -동안/마다/-을 때마다 based on context.',
      questions: [
        { pre: '매일（每天）→ 날', preEn: 'Every day → day', post: '운동해요', options: ['동안', '때마다', '는 동안', '마다'], answer: 3, explanation: '名词 + 마다 = 每个……，날마다 = 每天', explanationEn: 'Noun + 마다 = every..., 날마다 = every day' },
        { pre: '한국에 있', post: '한국어를 배웠어요（在韩国期间学了韩语）', postEn: 'Learned Korean (during my time in Korea)', options: ['동안', '는 동안', '마다', '을 때마다'], answer: 1, explanation: '-는 동안 = 在……的期间（动词接续）', explanationEn: '-는 동안 = during... (attached to verbs)' },
        { pre: '이 노래를 들', post: '기억나요（每次听这首歌都会想起）', postEn: 'I remember (every time I hear this song, it comes to mind)', options: ['는 동안', '는 마다', '을 때마다', '마다'], answer: 2, explanation: '듣다 有收音ㄷ → 들을 때마다（ㄷ 不规则）', explanationEn: '듣다 has final consonant ㄷ → 들을 때마다 (ㄷ irregular)' },
        { pre: '주말', post: '쉬어요（每个周末休息）', postEn: 'Rest (every weekend)', options: ['마다', '동안', '때마다', '는 동안'], answer: 0, explanation: '名词 + 마다 = 每个……，주말마다 = 每个周末', explanationEn: 'Noun + 마다 = every..., 주말마다 = every weekend' },
      ],
    },
    linkedGrammarIds: ['g44'],
  },
  {
    id: 'card-p9-l05',
    partNumber: 9,
    lessonNumber: 5,
    title: '-기는요, -기는 하다',
    whatItDoes: '表示"哪里/哪儿啊"和"倒是……但是"', whatItDoesEn: 'Expressing "Not at all" and "It\'s true, but..."',
    whatItDoesBody: '-기는요 用于谦虚地否定对方的夸奖或说法，相当于"哪里哪里"或"哪有啊"。\n-기는 하다 表示承认某事是真的，但暗示有转折，相当于"倒是……，但是……"。\n两者都是地道口语表达，韩剧里经常出现。', whatItDoesBodyEn: '-기는요 is used to humbly deny someone\'s compliment or statement, like "not at all" or "no way".\\n-기는 하다 acknowledges something is true but hints at a turn, like "it\'s true, but...".\\nBoth are natural spoken expressions, common in K-dramas.',
    structureNote: '-기는요：动词/形容词词干 + 기는요\n-기는 하다：动词/形容词词干 + 기는 하다（后面常接 -지만/-(으)ㄴ데）', structureNoteEn: '-기는요: verb/adjective stem + 기는요\\n-기는 하다: verb/adjective stem + 기는 하다 (often followed by -지만/-(으)ㄴ데)',
    rulesNote: '-기는요 语气谦虚，常用于被夸奖时回应。\n-기는 하다 后面的转折部分才是重点，前半句是让步。', rulesNoteEn: '-기는요 has a humble tone, often used when responding to compliments.\\nWith -기는 하다, the turning point after it is the main point; the first half is a concession.',
    structures: [
      {
        ko: '잘하기는요',
        zh: '哪里，还差得远呢。', zhEn: 'Not at all, I still have a long way to go.',
        tokens: [
          { text: '잘하기는요', role: 'verb' },
        ],
      },
      {
        ko: '예쁘기는요',
        zh: '漂亮什么啊，今天看起来很疲惫。', zhEn: 'Pretty? No way, I look tired today.',
        tokens: [
          { text: '예쁘기는요', role: 'verb' },
        ],
      },
      {
        ko: '먹기는 하는데 별로 맛없어요',
        zh: '倒是吃，但不太好吃。', zhEn: 'I do eat it, but it\'s not that tasty.',
        tokens: [
          { text: '먹기는 하는데', role: 'verb' },
          { text: '별로 맛없어요', role: 'plain' },
        ],
      },
      {
        ko: '가기는 했는데 별로 재미없었어요',
        zh: '倒是去了，但不太有趣。', zhEn: 'I did go, but it wasn\'t that fun.',
        tokens: [
          { text: '가기는 했는데', role: 'verb' },
          { text: '별로 재미없었어요', role: 'plain' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-기는요 变形：动词/形容词词干 + 기는요', textEn: '-기는요 conjugation: verb/adjective stem + 기는요', examples: '잘하다→잘하기는요 / 예쁘다→예쁘기는요 / 열심히 하다→열심히 하기는요' },
      { type: 'rule', text: '-기는 하다 现在时：词干 + 기는 해요', textEn: '-기는 하다 present tense: stem + 기는 해요', examples: '먹기는 해요（倒是吃）/ 알기는 알아요（倒是知道）', examplesEn: '먹기는 해요 (I do eat) / 알기는 알아요 (I do know)' },
      { type: 'rule', text: '-기는 하다 过去时：词干 + 기는 했어요', textEn: '-기는 하다 past tense: stem + 기는 했어요', examples: '가기는 했어요（倒是去了）/ 보기는 봤어요（倒是看了）', examplesEn: '가기는 했어요 (I did go) / 보기는 봤어요 (I did see)' },
      { type: 'usage', text: '-기는요 用于谦虚回应夸奖', textEn: '-기는요 used to humbly respond to compliments', examples: 'A: 한국어 잘하시네요！B: 잘하기는요. 배운 지 얼마 안 됐어요.（A：你韩语说得真好！B：哪里哪里，才学没多久。）', examplesEn: 'A: You speak Korean really well! B: Not at all, I\'ve only been learning for a short time.' },
      { type: 'usage', text: '-기는 하다 后面常接转折', textEn: '-기는 하다 is often followed by a contrast', examples: '알기는 하는데 설명하기 어려워요（知道是知道，但很难解释）', examplesEn: 'I do know it, but it\'s hard to explain' },
      { type: 'note', text: '强调形：-기는커녕（别说……了，连……都）', textEn: 'Emphatic form: -기는커녕 (let alone..., not even...)', examples: '밥 먹기는커녕 물도 못 마셨어요（别说吃饭了，连水都没喝到）', examplesEn: 'I couldn\'t even drink water, let alone eat' },
      { type: 'note', text: '-기는요 是"反语否定"：句子里没有任何否定词，却表达"哪有/才不是"。不只用来谦虚回应夸奖，也能反驳对方的猜测，中文的"哪里哪里"望文生义看不出这层否定，要靠语气记', textEn: '-기는요 is an \'ironic negation\': the sentence has no negative word, yet it expresses \'no way/not at all\'. It\'s not just for humbly responding to compliments, but also for refuting the other person\'s guess. The Chinese \'哪里哪里\' doesn\'t show this negation from its literal meaning; you have to remember it through tone.', examples: 'A: 너 화났어?（你生气了？）B: 화나기는요.（哪有生气）', examplesEn: 'A: Are you angry? B: Not at all (I\'m not angry).' },
      { type: 'note', text: '地道变体：-기는 하다 口语里常把 하다 换成"重复本动词"，语气更自然。结构是"동사+기는+同一个동사"', textEn: 'Natural variant: -기는 하다 — in speech, 하다 is often replaced with the repeated verb itself for a more natural tone. The structure is "verb + 기는 + same verb."', examples: '먹기는 먹어요（吃是吃）/ 가기는 갔어요（去是去了）/ 알기는 알아요（知道是知道）—— 前后同一个词，中间夹 -기는', examplesEn: '먹기는 먹어요 (eating is eating) / 가기는 갔어요 (going is going) / 알기는 알아요 (knowing is knowing) — same word on both sides, with -기는 in between.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '잘하기는요', role: 'verb' },
        ],
        zh: '哪里哪里。（回应夸奖）', zhEn: 'Not at all. (Response to a compliment)',
        swapWords: ['잘하기는요', '예쁘기는요', '친절하기는요', '열심히 하기는요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '운동하기는', role: 'verb' },
          { text: '하는데', role: 'plain' },
          { text: '매일은 못 해요', role: 'plain' },
        ],
        zh: '倒是运动，但不能每天做。', zhEn: 'I do exercise, but I can\'t do it every day.',
        swapWords: ['하는데', '했는데', '하지만'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '알기는', role: 'verb' },
          { text: '아는데', role: 'plain' },
          { text: '설명하기가 어려워요', role: 'verb' },
        ],
        zh: '倒是知道，但很难解释。', zhEn: 'I do know it, but it\'s hard to explain.',
        swapWords: ['알기는 아는데', '이해하기는 하는데', '배우기는 했는데'],
      },
    ],
    scenarios: [
      { icon: '😊', context: '被夸奖时', contextEn: 'When receiving a compliment', ko: 'A: 한국어 진짜 잘하세요! B: 잘하기는요. 아직 멀었어요.', zh: 'A：你韩语真的很好！B：哪里，还差得远呢。', zhEn: 'A: Your Korean is really good! B: Not at all, I still have a long way to go.' },
      { icon: '🎵', context: 'KPOP 追星', contextEn: 'KPOP fandom', ko: '그 가수 좋아하기는 하는데 요즘 노래는 별로예요.', zh: '倒是喜欢那个歌手，但最近的歌不太行。', zhEn: 'I do like that singer, but their recent songs aren\'t great.' },
      { icon: '🍽️', context: '吃东西', contextEn: 'Eating', ko: '매운 거 먹기는 하는데 많이는 못 먹어요.', zh: '辣的倒是吃，但吃不了太多。', zhEn: 'I do eat spicy food, but I can\'t handle too much.' },
      { icon: '📚', context: '学习', contextEn: 'to study', ko: '공부하기는 했는데 시험이 너무 어려웠어요.', zh: '倒是学了，但考试太难了。', zhEn: 'I did study, but the exam was too hard.' },
      { icon: '✈️', context: '旅行', contextEn: 'Travel', ko: '서울에 가기는 했는데 시간이 없어서 많이 못 봤어요.', zh: '倒是去了首尔，但没时间所以没看多少。', zhEn: 'I did go to Seoul, but I didn\'t have time so I didn\'t see much.' },
    ],
    mistakes: [
      { wrong: '잘 하기는요（띄어쓰기）', correct: '잘하기는요', note: '잘하다 是一个词，不要拆开写。', noteEn: '잘하다 is one word — don\'t split it.' },
      { wrong: '-기는요 后面再解释（冗长）', wrongEn: '-기는요 — explanation follows (lengthy)', correct: '잘하기는요（单独使用即可）', correctEn: '잘하기는요 (can be used alone)', note: '-기는요 本身就完整，可以单独说，不一定要接后续解释。', noteEn: '-기는요 is complete on its own — you can say it alone without adding an explanation.' },
      { wrong: '먹기는 하지만 맛없기는요', correct: '먹기는 하지만 맛없어요', note: '-기는요 和 -기는 하다 不在同一句里叠用。', noteEn: '-기는요 and -기는 하다 are not stacked in the same sentence.' },
      { wrong: '갔기는 해요', correct: '가기는 했어요', note: '过去时要加在后面的 하다 上（했어요），不是加在前面的主动词上。前面的动词永远保持原形 + 기는。', noteEn: 'Past tense goes on the 하다 at the end (했어요), not on the main verb before it. The front verb always stays in its base form + 기는.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P9 · 第5课</div>
    <div class="ov-hero-title">-기는요, -기는 하다</div>
    <div class="ov-hero-sub">谦虚回应和承认让步的地道口语表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">谦虚否定</div>
      <div class="ko">-기는요</div>
      <div class="zh">哪里哪里，哪有啊——回应夸奖</div>
    </div>
    <div class="ov-block">
      <div class="badge">让步转折</div>
      <div class="ko">-기는 하다</div>
      <div class="zh">倒是……，但是……——前半承认，后半转折</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">-기는요 · -기는 하다</div>
<div class="card-body">两个用 -기 构成的口语表达：-기는요 谦虚回应夸奖，-기는 하다 承认但转折"倒是……不过……"。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-기는요（谦虚回应）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">잘하기는요, 아직 멀었어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">哪里哪里，还差得远呢。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-기는 하다（承认但转折）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">알기는 하는데 설명하기 어려워요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">倒是知道，但很难解释。</div>
    </div>
  </div>
</div>
<div class="reminder-box">-기는요 后面常跟解释说明，-기는 하다 后面必须接转折（-는데/-지만）才完整。</div>`,
    compareHtml: `<div class="card-title">-기는요 vs -기는 하다</div>
<div class="card-body">两者都用 -기는，但功能不同：-기는요 是礼貌谦虚的回应，-기는 하다 是承认事实后接转折。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-기는요 → 谦虚否定夸奖</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词/形容词词干 + 기는요</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">A: 한국어 잘하시네요! B: 잘하기는요.</span><span style="font-size:16px;color:#5a4640">哪里，哪有。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">예쁘기는요, 그냥 평범해요.</span><span style="font-size:16px;color:#5a4640">哪里漂亮，很普通。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-기는 하다 → 承认 + 转折</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词/形容词词干 + 기는 해요/했어요 + 转折</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">먹기는 했는데 맛없었어요.</span><span style="font-size:16px;color:#5a4640">倒是吃了，但不好吃。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">보기는 봤어요, 근데 잘 모르겠어요.</span><span style="font-size:16px;color:#5a4640">倒是看了，但不太明白。</span></div>
  </div>
</div>
<div class="reminder-box">-기는요 单独用作回应，-기는 하다 后面要跟 -는데/-지만 才完整，不能单独结束句子。</div>`,
    compareLabel: '-기는요（谦虚否定）vs -기는 하다（承认+转折）', compareLabelEn: '-기는요 (humble denial) vs -기는 하다 (admission + contrast)',
    quickTable: {
      title: '-기는요 / -기는 하다 接续速查', titleEn: '-기는요 / -기는 하다 Conjugation Quick Reference',
      headers: ['语法', '接续', '功能', '例子'],
      rows: [
        [{ ko: '-기는요', zh: '谦虚回应', zhEn: 'Humble response' }, { ko: '词干 + 기는요', zh: '' }, { ko: '否定夸奖/谦虚', zh: '' }, { ko: '잘하기는요 / 예쁘기는요', zh: '哪里哪里', zhEn: 'Not at all' }],
        [{ ko: '-기는 해요', zh: '现在承认', zhEn: 'Admitting the present state' }, { ko: '词干 + 기는 해요', zh: '' }, { ko: '承认现在状态', zh: '' }, { ko: '알기는 해요（倒是知道）', zh: '' }],
        [{ ko: '-기는 했어요', zh: '过去承认', zhEn: 'Past acknowledgment' }, { ko: '词干 + 기는 했어요', zh: '' }, { ko: '承认过去动作', zh: '' }, { ko: '먹기는 했어요（倒是吃了）', zh: '' }],
        [{ ko: '-기는 하는데', zh: '转折', zhEn: 'Contrast' }, { ko: '词干 + 기는 하는데', zh: '' }, { ko: '承认+但是', zh: '' }, { ko: '알기는 하는데 어려워요', zh: '倒是知道但很难', zhEn: 'I do know it, but it\'s hard' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-기는요 还是 -기는 하다？', titleEn: '-기는요 or -기는 하다?',
      body: '根据语境选择正确的表达。', bodyEn: 'Choose the correct expression based on the context.',
      questions: [
        { pre: 'A: 노래를 정말 잘하세요! B:', post: '（哪里哪里，还不行）', postEn: '(Oh no, not really)', options: ['잘하기는 해요', '잘하기는 하는데요', '잘하기는요', '잘하는데요'], answer: 2, explanation: '谦虚否定夸奖用 -기는요', explanationEn: 'Use -기는요 to humbly deny a compliment' },
        { pre: '영화를 보기는 ', post: '재미없었어요（倒是看了，但没意思）', postEn: 'It wasn\'t fun (I did watch it, but it wasn\'t interesting)', options: ['했는데', '하는데', '기는요', '보겠는데'], answer: 0, explanation: '-기는 했는데 = 倒是（过去）+转折：보기는 했는데。하는데 是现在时（与过去的 재미없었어요 不符），기는요、보겠는데 都不合。', explanationEn: '-기는 했는데 = did (past) + contrast: 보기는 했는데. 하는데 is present tense (doesn\'t match past 재미없었어요); 기는요 and 보겠는데 are incorrect.' },
        { pre: '운동을 하기는 ', post: '자주는 못 해요（倒是做运动，但不常做）', postEn: 'I can\'t do it often (I do exercise, but not frequently)', options: ['해요', '하는데', '했는데', '했어요'], answer: 1, explanation: '-기는 하는데 = 倒是（现在习惯）+转折', explanationEn: '-기는 하는데 = do (current habit) + contrast' },
        { pre: 'A: 요리 잘하시죠? B:', post: '（哪里，我不太会做）', postEn: '(Oh no, I\'m not very good at it)', options: ['잘하기는 해요', '잘하는데요', '못하기는요', '잘하기는요'], answer: 3, explanation: '-기는요 谦虚回应，否定对方的夸奖', explanationEn: '-기는요 is a humble response, denying the other person\'s compliment' },
      ],
    },
    linkedGrammarIds: ['g13'],
  },
  {
    id: 'card-p9-l06',
    partNumber: 9,
    lessonNumber: 6,
    title: '-아/어/여지다, -게 되다',
    whatItDoes: '表示状态变化和自然转变', whatItDoesEn: 'Expressing state changes and natural transitions',
    whatItDoesBody: '-아/어/여지다 接在形容词后，表示逐渐变成某种状态，相当于"变得……"。\n-게 되다 接在动词后，表示某种结果自然而然地发生，相当于"就……了/变成……了"。\n两者都强调变化的过程，不是主动行为，而是自然发生的结果。', whatItDoesBodyEn: '-아/어/여지다 attaches to adjectives to indicate gradually becoming a certain state, equivalent to "become...".\\n-게 되다 attaches to verbs to indicate a result that happens naturally, equivalent to "it turned out that.../became...".\\nBoth emphasize the process of change, not an active action, but a naturally occurring result.',
    structureNote: '-아/어/여지다：形容词词干 + 아/어/여지다\n-게 되다：动词词干 + 게 되다', structureNoteEn: '-아/어/여지다: adjective stem + 아/어/여지다\\n-게 되다: verb stem + 게 되다',
    rulesNote: '-아/어/여지다 用于形容词，描述状态渐变。\n-게 되다 用于动词，描述动作结果的自然达成。', rulesNoteEn: '-아/어/여지다 is used with adjectives to describe gradual state changes.\\n-게 되다 is used with verbs to describe the natural achievement of an action\'s result.',
    structures: [
      {
        ko: '한국어가 점점 어려워져요',
        zh: '韩语变得越来越难了。', zhEn: 'Korean is getting harder and harder.',
        tokens: [
          { text: '한국어가', role: 'subject' },
          { text: '점점', role: 'plain' },
          { text: '어려워져요', role: 'verb' },
        ],
      },
      {
        ko: '날씨가 따뜻해졌어요',
        zh: '天气变暖和了。', zhEn: 'The weather is getting warmer.',
        tokens: [
          { text: '날씨가', role: 'subject' },
          { text: '따뜻해졌어요', role: 'verb' },
        ],
      },
      {
        ko: '한국 드라마를 좋아하게 됐어요',
        zh: '渐渐喜欢上了韩剧。', zhEn: 'I\'ve gradually come to like K-dramas.',
        tokens: [
          { text: '한국 드라마를', role: 'object' },
          { text: '좋아하게 됐어요', role: 'verb' },
        ],
      },
      {
        ko: '내년에 한국에 가게 됐어요',
        zh: '明年就要去韩国了。', zhEn: 'I\'m going to Korea next year.',
        tokens: [
          { text: '내년에', role: 'time' },
          { text: '한국에', role: 'place' },
          { text: '가게 됐어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-아/어/여지다 变形：形容词词干末尾元音 ㅏ/ㅗ+아지다, 其他+어지다, 하다→해지다', textEn: '-아/어/여지다 conjugation: adjective stem ending in ㅏ/ㅗ + 아지다, others + 어지다, 하다 → 해지다', examples: '좋다→좋아지다 / 크다→커지다 / 따뜻하다→따뜻해지다 / 예쁘다→예뻐지다' },
      { type: 'rule', text: '-게 되다 变形：动词词干 + 게 되다（时态变化加在 되다 上）', textEn: '-게 되다 conjugation: verb stem + 게 되다 (tense changes go on 되다)', examples: '알다→알게 됐어요 / 가다→가게 됐어요 / 좋아하다→좋아하게 됐어요' },
      { type: 'usage', text: '-아/어/여지다 强调状态的渐变过程', textEn: '-아/어/여지다 emphasizes the gradual change of a state', examples: '점점 건강해지고 있어요（越来越健康了）/ 날씨가 더워졌어요（天气变热了）', examplesEn: 'Getting healthier gradually / The weather got hotter' },
      { type: 'usage', text: '-게 되다 表示自然而然的结果，常含"非主动"或"机缘巧合"语气', textEn: '-게 되다 indicates a natural result, often with a nuance of "not by choice" or "by chance"', examples: '한국어를 배우게 됐어요（就这样开始学韩语了）/ 이 회사에 다니게 됐어요（就进了这家公司）', examplesEn: 'I ended up learning Korean / I ended up working at this company' },
      { type: 'compare', text: '-게 됐다 vs -았/었다：-게 됐다 强调转变过程，-았/었다 只陈述结果', textEn: '-게 됐다 vs -았/었다: -게 됐다 emphasizes the process of change, -았/었다 just states the result', examples: '한국 음식을 좋아하게 됐어요（渐渐喜欢了）vs 한국 음식을 좋아했어요（过去喜欢）', examplesEn: 'I came to like Korean food vs I liked Korean food (in the past)' },
      { type: 'note', text: '自我介绍常用 -게 됐습니다', textEn: '-게 됐습니다 is commonly used in self-introductions', examples: '오늘부터 함께 일하게 됐습니다. 잘 부탁드립니다.（从今天起一起共事了，请多关照。）', examplesEn: 'I\'ll be working with you from today. Please take care of me.' },
      { type: 'note', text: '选哪个的判断法：中文一个"变"字不分词性，韩语要先看变的是"形容词还是动词"。变的是性质/状态（好、大、漂亮）→形容词，用 -아/어/여지다；变的是做不做某个动作、结果如何（去、喜欢、住）→动词，用 -게 되다。先想中文原词是"形容词还是动词"再选', textEn: 'How to choose: In Chinese, "变" doesn\'t distinguish parts of speech, but in Korean you need to check if what changes is an adjective or verb. If it\'s a quality/state (good, big, pretty) → adjective, use -아/어/여지다; if it\'s whether you do an action or its result (go, like, live) → verb, use -게 되다. First think about whether the Chinese word is an adjective or verb, then choose.', examples: '天气变热了=날씨가 더워졌어요（형용사 덥다）/ 变得爱吃辣了=매운 걸 좋아하게 됐어요（동사 좋아하다）', examplesEn: 'The weather got hot = 날씨가 더워졌어요 (adjective 덥다) / I came to like spicy food = 매운 걸 좋아하게 됐어요 (verb 좋아하다)' },
      { type: 'note', text: '边界：少数动词也能接 -아/어지다，表示"被做成/被完成"的被动结果（不是形容词渐变），属于被动用法，后面章节详学', textEn: 'Boundary: A few verbs can also take -아/어지다, meaning a passive result of "being made/done" (not gradual adjective change). This is passive usage, covered in later chapters.', examples: '만들다→만들어지다（被制作出来）/ 이 책은 쉽게 읽어져요（这本书读起来很容易）—— 这类是动词被动，暂只需认得，别和形容词状态渐变混', examplesEn: '만들다→만들어지다 (to be made) / 이 책은 쉽게 읽어져요 (This book reads easily) — these are verb passives, just recognize them for now, don\'t confuse with adjective state changes.' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '요즘', role: 'time' },
          { text: '한국어가', role: 'subject' },
          { text: '재미있어졌어요', role: 'verb' },
        ],
        zh: '最近韩语变得有趣了。', zhEn: 'Korean has become fun lately.',
        swapWords: ['재미있어졌어요', '어려워졌어요', '쉬워졌어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 가수를', role: 'object' },
          { text: '좋아하게 됐어요', role: 'verb' },
        ],
        zh: '就这样喜欢上了这位歌手。', zhEn: 'I ended up liking this singer.',
        swapWords: ['좋아하게 됐어요', '알게 됐어요', '팬이 되게 됐어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '운동을 해서', role: 'plain' },
          { text: '건강해졌어요', role: 'verb' },
        ],
        zh: '因为运动变健康了。', zhEn: 'I got healthier from exercising.',
        swapWords: ['건강해졌어요', '날씬해졌어요', '피부가 좋아졌어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🎵', context: 'KPOP 入坑', contextEn: 'Falling into KPOP', ko: '이 노래를 듣고 그 가수를 좋아하게 됐어요.', zh: '听了这首歌就喜欢上了那位歌手。', zhEn: 'After hearing this song, I came to like that singer.' },
      { icon: '🌱', context: '成长变化', contextEn: 'Growth and change', ko: '한국어를 공부하면서 한국 문화에 관심이 생기게 됐어요.', zh: '学韩语的过程中就对韩国文化产生了兴趣。', zhEn: 'While learning Korean, I became interested in Korean culture.' },
      { icon: '☀️', context: '天气变化', contextEn: 'Weather changes', ko: '봄이 되니까 날씨가 따뜻해졌어요.', zh: '春天到了天气变暖和了。', zhEn: 'Spring came and the weather got warmer.' },
      { icon: '💪', context: '自我成长', contextEn: 'Self-growth', ko: '매일 운동했더니 몸이 건강해졌어요.', zh: '每天运动身体变健康了。', zhEn: 'Exercising every day made my body healthier.' },
      { icon: '💼', context: '职场介绍', contextEn: 'Workplace introduction', ko: '오늘부터 이 팀에서 일하게 됐습니다.', zh: '从今天起在这个团队工作了。', zhEn: 'I\'m working with this team from today.' },
      { icon: '📱', context: '日常变化', contextEn: 'Daily changes', ko: '요즘 스마트폰을 덜 쓰게 됐어요.', zh: '最近手机用得少了。', zhEn: 'I\'ve been using my phone less lately.' },
    ],
    mistakes: [
      { wrong: '어렵아지다', correct: '어려워지다', note: '어렵다 是 ㅂ 不规则，ㅂ 脱落后变为 어려워지다，不是 어렵아지다。', noteEn: '어렵다 is an irregular ㅂ verb; after dropping ㅂ, it becomes 어려워지다, not 어렵아지다.' },
      { wrong: '좋아하게 되다（用于形容词）', wrongEn: '좋아하게 되다 (used for adjectives)', correct: '좋아지다', note: '-게 되다 用于动词，形容词变化用 -아/어/여지다。좋아하다（动词：喜欢）→좋아하게 되다；좋다（形容词：好）→좋아지다。', noteEn: '-게 되다 is used with verbs; for adjectives, use -아/어/여지다. 좋아하다 (verb: to like) → 좋아하게 되다; 좋다 (adjective: good) → 좋아지다.' },
      { wrong: '한국어가 어려워지게 됐어요（叠用）', wrongEn: '한국어가 어려워지게 됐어요 (stacked)', correct: '한국어가 어려워졌어요 / 한국어가 어렵게 됐어요', note: '-아/어/여지다 和 -게 되다 功能重叠，不叠用，选一个即可。', noteEn: '-아/어/여지다 and -게 되다 overlap in function; don\'t stack them—pick one.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P9 · 第6课</div>
    <div class="ov-hero-title">-아/어/여지다, -게 되다</div>
    <div class="ov-hero-sub">状态变化与自然转变的两种核心表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">状态渐变</div>
      <div class="ko">形容词 + 아/어/여지다</div>
      <div class="zh">变得……（날씨가 따뜻해졌어요）</div>
    </div>
    <div class="ov-block">
      <div class="badge">自然结果</div>
      <div class="ko">动词 + 게 되다</div>
      <div class="zh">就……了（한국어를 좋아하게 됐어요）</div>
    </div>
  </div>
</div>`,
    step0Html: `<div class="card-title">-아/어/여지다 · -게 되다</div>
<div class="card-body">两种表示变化的句型：-아/어지다 说状态自然变了，-게 되다 说事情顺势发展到某个结果。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说：</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#ff7fa8;margin-bottom:4px">-아/어지다（状态变化）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">요즘 한국어 실력이 점점 좋아지고 있어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">最近韩语在慢慢进步。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:9px;font-weight:800;color:#2db89b;margin-bottom:4px">-게 되다（结果形成）</div>
      <div style="font-size:16px;font-weight:800;color:#241917">한국어를 좋아하게 됐어요.</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">慢慢喜欢上韩语了。</div>
    </div>
  </div>
</div>
<div class="reminder-box">-아/어지다 接形容词最自然（예뻐지다/좋아지다），-게 되다 接动词说"顺势发展"（알게 되다/만나게 되다）。</div>`,
    compareHtml: `<div class="card-title">-아/어지다 vs -게 되다</div>
<div class="card-body">两者都表示变化，但侧重不同：-아/어지다 强调状态本身的渐变，-게 되다 强调由于某种过程或经历而达到的结果。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-아/어지다 → 状态渐变</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">形容词词干 + 아/어지다（ㅏ/ㅗ→아지다，其他→어지다，하다→해지다）</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">날씨가 따뜻해졌어요.</span><span style="font-size:16px;color:#5a4640">天气变暖了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한국어 실력이 좋아졌어요.</span><span style="font-size:16px;color:#5a4640">韩语水平提高了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">커지다 / 작아지다 / 빨라지다</span><span style="font-size:16px;color:#5a4640">变大/变小/变快</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px">
    <div class="tok t-v">-게 되다 → 顺势达到某结果</div>
    <div style="font-size:16px;color:#89756e;margin-top:2px">动词词干 + 게 되다</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:6px"><span style="font-weight:700">한국어를 배우게 됐어요.</span><span style="font-size:16px;color:#5a4640">就开始学韩语了。（顺其自然）</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한국 드라마를 좋아하게 됐어요.</span><span style="font-size:16px;color:#5a4640">慢慢喜欢上韩剧了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">알게 되다 / 만나게 되다</span><span style="font-size:16px;color:#5a4640">得知/相识</span></div>
  </div>
</div>
<div class="reminder-box">好记法：-아/어지다 = 状态"变了"（形容词首选）/ -게 되다 = 事情"发展成"（动词首选，说缘由和过程）</div>`,
    compareLabel: '-아/어지다（状态渐变）vs -게 되다（顺势结果）', compareLabelEn: '-아/어지다 (gradual state change) vs -게 되다 (natural result)',
    quickTable: {
      title: '-아/어지다 vs -게 되다 接续速查', titleEn: '-아/어지다 vs -게 되다 conjugation quick reference',
      headers: ['语法', '接续', '常搭配', '例子'],
      rows: [
        [{ ko: '-아지다', zh: 'ㅏ/ㅗ结尾', zhEn: 'Ends in ㅏ/ㅗ' }, { ko: '형용사词干 + 아지다', zh: '' }, { ko: '형용사（状态变化）', zh: '' }, { ko: '좋아지다 / 많아지다', zh: '变好/变多', zhEn: 'become good / become many' }],
        [{ ko: '-어지다', zh: '其他结尾', zhEn: 'Other endings' }, { ko: '형용사词干 + 어지다', zh: '' }, { ko: '형용사（状态变化）', zh: '' }, { ko: '커지다 / 빨라지다', zh: '变大/变快', zhEn: 'become big / become fast' }],
        [{ ko: '-해지다', zh: '하다结尾', zhEn: '하다 endings' }, { ko: '어간 하 → 해지다', zh: '' }, { ko: '하다 형용사', zh: '' }, { ko: '따뜻해지다 / 건강해지다', zh: '变暖/变健康', zhEn: 'become warm / become healthy' }],
        [{ ko: '-게 되다', zh: '顺势结果', zhEn: 'Natural result' }, { ko: '동사词干 + 게 되다', zh: '' }, { ko: '동사（过程→결과）', zh: '' }, { ko: '알게 되다 / 살게 되다', zh: '得知/开始住', zhEn: 'come to know / come to live' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-아/어지다 还是 -게 되다？', titleEn: '-아/어지다 or -게 되다?',
      body: '根据语境选择正确的变化表达。', bodyEn: 'Choose the correct change expression based on context.',
      questions: [
        { pre: '날씨가 많이 따뜻', post: '（天气变暖了）', postEn: '(The weather got warmer)', options: ['해지게 됐어요', '하게 됐어요', '하게 되었어요', '해졌어요'], answer: 3, explanation: '따뜻하다 → 따뜻해지다，形容词状态变化用 -아/어지다', explanationEn: '따뜻하다 → 따뜻해지다; for adjective state changes, use -아/어지다' },
        { pre: '한국어를 공부하', post: '（就开始学韩语了——顺其自然）', postEn: '(Then I started learning Korean—it just happened naturally)', options: ['게 됐어요', '게 되어졌어요', '아졌어요', '어졌어요'], answer: 0, explanation: '动词 + -게 되다，表示顺势发展的结果', explanationEn: 'Verb + -게 되다 indicates a result that develops naturally' },
        { pre: '그 사람을 좋아하', post: '（慢慢喜欢上那个人了）', postEn: '(I gradually came to like that person)', options: ['아졌어요', '게 되어졌어요', '게 됐어요', '어졌어요'], answer: 2, explanation: '좋아하다 是动词，顺势发展用 -게 되다', explanationEn: '좋아하다 is a verb; for natural development, use -게 되다' },
        { pre: '요즘 건강이 많이 좋', post: '（最近身体好多了）', postEn: '(I\'ve been feeling much better lately)', options: ['아지게 됐어요', '아졌어요', '아하게 됐어요', '게 됐어요'], answer: 1, explanation: '좋다 ㅗ结尾形容词 → 좋아지다，状态变化用 -아지다', explanationEn: '좋다 (ends in ㅗ) → 좋아지다; use -아지다 for state changes' },
      ],
    },
    linkedGrammarIds: ['g83', 'g73'],
  },
  {
    id: 'card-p9-l07',
    partNumber: 9,
    lessonNumber: 7,
    title: '-는/은/ㄴ 편이다, 얼마나 -는/은/ㄴ지',
    whatItDoes: '表示"偏向某一方"和感叹程度', whatItDoesEn: 'Expressing "leaning toward one side" and exclaiming degree',
    whatItDoesBody: '-는/은/ㄴ 편이다 表示"比较……/偏……"，是一种相对委婉的说法，不是绝对的判断。\n얼마나 -는/은/ㄴ지 用于感叹程度之深，相当于"有多么……啊"，后面常接 알다/모르다。\n两者都是韩剧和日常对话中出现频率很高的地道表达。', whatItDoesBodyEn: '-는/은/ㄴ 편이다 means "rather.../tends to...", a relatively euphemistic way of speaking, not an absolute judgment.\\n얼마나 -는/은/ㄴ지 is used to exclaim about the depth of a degree, equivalent to "how...!", often followed by 알다/모르다.\\nBoth are authentic expressions that appear frequently in Korean dramas and everyday conversation.',
    structureNote: '-는/은/ㄴ 편이다：动词+는 편이다 / 形容词有收音+은 편이다 / 无收音+ㄴ 편이다\n얼마나 -는/은/ㄴ지：얼마나 + 动词/形容词 冠词形 + 지（连写）알다/모르다', structureNoteEn: '-는/은/ㄴ 편이다: verb + 는 편이다 / adjective with final consonant + 은 편이다 / without final consonant + ㄴ 편이다\\n얼마나 -는/은/ㄴ지: 얼마나 + verb/adjective adnominal form + 지 (attached) 알다/모르다',
    rulesNote: '-는/은/ㄴ 편이다 语气比直接断言更柔和，说话者在主观评估。\n얼마나 -는/은/ㄴ지 后面不说出程度，而是让对方去想象，情感更强烈。', rulesNoteEn: '-는/은/ㄴ 편이다 is softer than a direct assertion, with the speaker making a subjective assessment.\\n얼마나 -는/은/ㄴ지 doesn\'t state the degree explicitly, letting the listener imagine it, making the emotion stronger.',
    structures: [
      {
        ko: '저는 매운 음식을 좋아하는 편이에요',
        zh: '我比较喜欢辣的食物。', zhEn: 'I prefer spicy food.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '매운 음식을', role: 'object' },
          { text: '좋아하는 편이에요', role: 'verb' },
        ],
      },
      {
        ko: '이 드라마는 좀 긴 편이에요',
        zh: '这部剧比较长。', zhEn: 'This drama is relatively long.',
        tokens: [
          { text: '이 드라마는', role: 'subject' },
          { text: '좀 긴 편이에요', role: 'verb' },
        ],
      },
      {
        ko: '그 노래가 얼마나 좋은지 몰라요',
        zh: '那首歌有多好听啊，真的难以形容。', zhEn: 'That song is so good, I can\'t even describe it.',
        tokens: [
          { text: '그 노래가', role: 'subject' },
          { text: '얼마나 좋은지 몰라요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词 + 는 편이다：表示倾向于做某事', textEn: 'Verb + 는 편이다: indicates a tendency to do something', examples: '자주 먹는 편이에요（比较常吃）/ 빨리 걷는 편이에요（走路比较快）', examplesEn: '자주 먹는 편이에요 (I eat it fairly often) / 빨리 걷는 편이에요 (I walk fairly fast)' },
      { type: 'rule', text: '形容词 有收音+은/无收音+ㄴ 편이다', textEn: 'Adjective: with batchim + 은 / without batchim + ㄴ + 편이다', examples: '작다→작은 편이에요 / 크다→큰 편이에요 / 바쁘다→바쁜 편이에요' },
      { type: 'rule', text: '얼마나 + 冠词形 + 지 알다/모르다（지 与冠词形连写）', textEn: '얼마나 + adnominal form + 지 알다/모르다 (지 is written attached to the adnominal form)', examples: '얼마나 맛있는지 알아요?（知道有多好吃吗？）/ 얼마나 힘든지 몰라요（不知道有多辛苦）', examplesEn: '얼마나 맛있는지 알아요? (Do you know how delicious it is?) / 얼마나 힘든지 몰라요 (You don\'t know how hard it is)' },
      { type: 'usage', text: '-는/은/ㄴ 편이다 用于主观、相对的评价，不是绝对事实', textEn: '-는/은/ㄴ 편이다 is used for subjective, relative evaluations, not absolute facts', examples: '저는 키가 큰 편이에요（我身高偏高）— 说话者认为自己偏高，不是客观事实', examplesEn: '저는 키가 큰 편이에요 (I\'m on the taller side) — the speaker thinks they\'re tall, not an objective fact' },
      { type: 'usage', text: '얼마나 -는/은/ㄴ지 用于感叹，越省略后半越有韵味', textEn: '얼마나 -는/은/ㄴ지 is used for exclamations; the more you omit the latter part, the more expressive it becomes', examples: '그 사람이 얼마나 친절한지！（那个人多么亲切啊！）', examplesEn: '그 사람이 얼마나 친절한지! (That person is so kind!)' },
      { type: 'note', text: 'KPOP/韩剧常用：얼마나 보고 싶은지（有多想见你啊）', textEn: 'Common in KPOP/K-dramas: 얼마나 보고 싶은지 (How much I miss you)', examples: '네가 얼마나 보고 싶은지 알아?（你知道我有多想你吗？）', examplesEn: '네가 얼마나 보고 싶은지 알아? (Do you know how much I miss you?)' },
      { type: 'note', text: '正字法陷阱：这里的 -는지/-(으)ㄴ지 是一个整体词尾，必须和前面连写（좋은지、힘든지、친절한지），不能拆成"좋은 지"。分写的 -(으)ㄴ 지 是另一个语法，表示"自从……过了多久"，两者长得几乎一样，靠连写/分写和语境区分', textEn: 'Spelling trap: Here, -는지/-(으)ㄴ지 is a single ending and must be written attached to the preceding word (좋은지, 힘든지, 친절한지), not as "좋은 지". The spaced -(으)ㄴ 지 is a different grammar meaning "it\'s been... since", and they look almost identical—distinguished by spacing and context', examples: '感叹程度（连写）：얼마나 좋은지 몰라요（不知道有多好）/ 时间经过（分写）：한국에 온 지 3년 됐어요（来韩国已经三年了），后面章节详学', examplesEn: 'Degree of exclamation (attached): 얼마나 좋은지 몰라요 (You don\'t know how good it is) / Time elapsed (spaced): 한국에 온 지 3년 됐어요 (It\'s been 3 years since I came to Korea), covered in detail later' },
      { type: 'note', text: '-는/은/ㄴ 편이다 讲的是一贯的倾向、习惯或性质，不用于描述某一次具体发生的事。中文"比较"能修饰任何情况，但这个句型只搭配可评价倾向的谓语', textEn: '-는/은/ㄴ 편이다 describes a consistent tendency, habit, or quality, not a one-time event. Chinese "比较" can modify anything, but this pattern only pairs with predicates that can be evaluated as a tendency', examples: '一贯习惯：저는 매운 걸 잘 먹는 편이에요（我算比较能吃辣的）/ 一次性事件不用편이다，直接说：어제 매운 걸 많이 먹었어요（昨天吃了很多辣的）', examplesEn: 'Consistent habit: 저는 매운 걸 잘 먹는 편이에요 (I\'m pretty good at eating spicy food) / For one-time events, don\'t use 편이다, just say: 어제 매운 걸 많이 먹었어요 (I ate a lot of spicy food yesterday)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '커피를', role: 'object' },
          { text: '자주 마시는 편이에요', role: 'verb' },
        ],
        zh: '我比较常喝咖啡。', zhEn: 'I drink coffee fairly often.',
        swapWords: ['자주 마시는 편이에요', '별로 안 마시는 편이에요', '하루에 두 잔 마시는 편이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문제가', role: 'subject' },
          { text: '얼마나 어려운지', role: 'plain' },
          { text: '알아요?', role: 'verb' },
        ],
        zh: '你知道这道题有多难吗？', zhEn: 'Do you know how hard this problem is?',
        swapWords: ['알아요?', '몰라요', '상상도 못 해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '일찍 자는 편이에요', role: 'verb' },
        ],
        zh: '我比较早睡。', zhEn: 'I go to bed fairly early.',
        swapWords: ['일찍 자는 편이에요', '늦게 자는 편이에요', '잠을 많이 자는 편이에요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🍜', context: '饮食习惯', contextEn: 'Eating habits', ko: '저는 아침을 잘 안 먹는 편이에요.', zh: '我比较不吃早饭。', zhEn: 'I tend to skip breakfast.' },
      { icon: '🎵', context: 'KPOP 情感', contextEn: 'KPOP Feelings', ko: '이 노래가 얼마나 위로가 되는지 몰라요.', zh: '这首歌给了我多大安慰啊，真的难以形容。', zhEn: 'This song has given me so much comfort, I can hardly describe it.' },
      { icon: '💬', context: '自我介绍', contextEn: 'Self-introduction', ko: '저는 조용한 편이지만 친해지면 말이 많아요.', zh: '我比较安静，但熟了之后话会很多。', zhEn: 'I\'m pretty quiet, but once I get to know someone, I talk a lot.' },
      { icon: '📺', context: '韩剧推荐', contextEn: 'K-Drama Recommendations', ko: '이 드라마는 좀 슬픈 편이에요. 각오하세요.', zh: '这部剧比较悲，做好心理准备吧。', zhEn: 'This drama is pretty sad, so be prepared.' },
      { icon: '🏃', context: '生活习惯', contextEn: 'Lifestyle Habits', ko: '저는 잠을 많이 자는 편이에요. 보통 9시간 자요.', zh: '我比较能睡，一般睡9个小时。', zhEn: 'I can sleep a lot, usually about 9 hours.' },
      { icon: '😭', context: '感叹', contextEn: 'Exclamation', ko: '그 배우가 얼마나 잘생긴지 알아요?', zh: '你知道那个演员有多帅吗？', zhEn: 'Do you know how handsome that actor is?' },
    ],
    mistakes: [
      { wrong: '저는 키가 크는 편이에요（形容词误用）', wrongEn: '저는 키가 크는 편이에요 (adjective misuse)', correct: '저는 키가 큰 편이에요', note: '形容词用 -은/ㄴ 편이다，不加 -는。크다 → 큰 편이다。', noteEn: 'Adjectives use -은/ㄴ 편이다, not -는. 크다 → 큰 편이다.' },
      { wrong: '얼마나 좋은지를 몰라요', correct: '얼마나 좋은지 몰라요', note: '-는/은/ㄴ지 后不加 를，直接接알다/모르다。', noteEn: '-는/은/ㄴ지 is not followed by 를; directly attach 알다/모르다.' },
      { wrong: '좀 바쁜는 편이에요', correct: '좀 바쁜 편이에요', note: '바쁘다 → 바쁜 편이다，ㅡ 脱落后直接加 ㄴ，不加 -는。', noteEn: '바쁘다 → 바쁜 편이다, after dropping ㅡ, add ㄴ directly, not -는.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P9 · 第7课</div>
    <div class="ov-hero-title">-는/은/ㄴ 편이다, 얼마나 -는/은/ㄴ지</div>
    <div class="ov-hero-sub">相对评价与强烈感叹的地道表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">相对评价</div>
      <div class="ko">-는/은/ㄴ 편이다</div>
      <div class="zh">比较……/偏……（主观，柔和判断）</div>
    </div>
    <div class="ov-block">
      <div class="badge">感叹程度</div>
      <div class="ko">얼마나 -는/은/ㄴ지 알다/모르다</div>
      <div class="zh">有多……啊——强烈感叹，难以言说</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表示"偏向某一方"和感叹程度</div>
<div class="card-body">-는/은/ㄴ 편이다 表示"比较……/偏……"，是一种相对委婉的说法，不是绝对的判断。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">저는 매운 음식을 좋아하는 편이에요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">我比较喜欢辣的食物。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">이 드라마는 좀 긴 편이에요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">这部剧比较长。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">-는/은/ㄴ 편이다 语气比直接断言更柔和，说话者在主观评估。
얼마나 -는/은/ㄴ지 后面不说出程度，而是让对方去想象，情感更强烈。</div>
`,
    compareLabel: '-는/은/ㄴ 편이다（相对评价）vs 얼마나 -는/은/ㄴ지（程度感叹）', compareLabelEn: '-는/은/ㄴ 편이다 (relative evaluation) vs 얼마나 -는/은/ㄴ지 (degree exclamation)',
    compareHtml: `
<div class="card-title">-는/은/ㄴ 편이다 vs 얼마나 -는/은/ㄴ지</div>
<div class="card-body">本课两个句型语气正相反：<b>편이다</b> 是把话说柔和的"偏……"，<b>얼마나 …지</b> 是把程度说到极致的"有多么……啊"。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">-는/은/ㄴ 편이다</div>
    <div class="cmp-row"><span class="badge">语气</span><span class="zh">相对、委婉，"比较…/偏…"（主观评估）</span></div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">动词+는 / 形容词 有收音+은·无收音+ㄴ</span></div>
    <div class="cmp-row"><span class="ko">저는 매운 음식을 좋아하는 편이에요</span></div>
    <div class="cmp-row"><span class="zh">我算是比较能吃辣的（留有余地）</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">얼마나 -는/은/ㄴ지</div>
    <div class="cmp-row"><span class="badge">语气</span><span class="zh">强烈感叹，"有多么…啊"（后接 알다/모르다）</span></div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">얼마나 + 冠词形 + 지（连写）+ 알다/모르다</span></div>
    <div class="cmp-row"><span class="ko">그 노래가 얼마나 좋은지 몰라요</span></div>
    <div class="cmp-row"><span class="zh">那首歌好听得没法形容（程度拉满）</span></div>
  </div>
</div>
<div class="reminder-box">一句话记：<b>편이다</b> 把话说小（偏、比较）；<b>얼마나 …지</b> 把话说大（多么、说不尽），后面常接 알다/모르다。</div>
`,
    quickTable: {
      title: '-는/은/ㄴ 편이다 接续规则', titleEn: '-는/은/ㄴ 편이다 conjugation rules',
      headers: ['词性', '형태', '예시', '意思'],
      rows: [
        [{ ko: '동사', zh: '动词', zhEn: 'Verb' }, { ko: '-는 편이다', zh: '' }, { ko: '자주 먹는 편이에요', zh: '' }, { ko: '比较常吃', zh: '' }],
        [{ ko: '형용사 (收音)', zh: '有尾音形容词', zhEn: 'Adjective with final consonant' }, { ko: '-은 편이다', zh: '' }, { ko: '작은 편이에요', zh: '' }, { ko: '偏小', zh: '' }],
        [{ ko: '형용사 (无收音)', zh: '无尾音形容词', zhEn: 'Adjective without final consonant' }, { ko: '-ㄴ 편이다', zh: '' }, { ko: '큰 편이에요', zh: '' }, { ko: '偏大', zh: '' }],
        [{ ko: 'ㅡ 탈락', zh: 'ㅡ 脱落', zhEn: 'ㅡ drops out' }, { ko: '-ㄴ 편이다', zh: '' }, { ko: '바쁜 편이에요', zh: '' }, { ko: '比较忙', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: "-는/은/ㄴ 편이다, 얼마나 -는/은/ㄴ지",
      body: "测试对两个语法点的掌握", bodyEn: 'Tests mastery of two grammar points',
      questions: [
        {
          prompt: '他比较内向。→ 그 사람은 ___', promptEn: 'He\'s fairly introverted. → 그 사람은 ___',
          options: ['내향적으로 편이에요', '내향적인 편이에요', '내향적 편이에요', '내향적는 편이에요'],
          answer: 1 as 0|1|2|3,
          explanation: "形容词 + 은/ㄴ 편이다，내향적이다 → 내향적인 편이다", explanationEn: 'Adjective + 은/ㄴ 편이다, 내향적이다 → 내향적인 편이다',
        },
        {
          prompt: '你知道这首歌有多好听吗？→ 이 노래가 얼마나 ___', promptEn: 'Do you know how good this song is? → 이 노래가 얼마나 ___',
          options: ['좋은지 알아요?', '좋은지를 알아요?', '좋을 지 알아요?', '좋는지 알아요?'],
          answer: 0 as 0|1|2|3,
          explanation: "얼마나 + 形容词冠词形 + 지（连写）알다，좋다 → 좋은지 알아요? 后面不加 를。", explanationEn: '얼마나 + adjective adnominal form + 지 (written together) 알다, 좋다 → 좋은지 알아요? No 를 after it.',
        },
        {
          prompt: '我走路比较快。→ 저는 걷는 속도가 ___', promptEn: 'I walk pretty fast. → 저는 걷는 속도가 ___',
          options: ['빠르은 편이에요', '빠르는 편이에요', '빠른 편이에요', '빠를 편이에요'],
          answer: 2 as 0|1|2|3,
          explanation: "빠르다 ㅡ 탈락 → 빠른 편이에요",
        },
        {
          prompt: '不知道那有多辛苦。→ 그게 얼마나 ___', promptEn: 'I don\'t know how hard that is. → 그게 얼마나 ___',
          options: ['힘들은지 몰라요', '힘들지 몰라요', '힘드는지 몰라요', '힘든지 몰라요'],
          answer: 3 as 0|1|2|3,
          explanation: "힘들다 ㄹ 脱落 → 힘든지 몰라요（지 与冠词形连写）", explanationEn: '힘들다 ㄹ drop → 힘든지 몰라요 (지 combined with adnominal form)',
        },
      ],
    },
    linkedGrammarIds: ['g72', 'g80'],
  },
  {
    id: 'card-p9-l08',
    partNumber: 9,
    lessonNumber: 8,
    title: '-자마자, -기 시작하다',
    whatItDoes: '表示"一……就……"和"开始……"', whatItDoesEn: 'Expressing "as soon as..." and "begin to..."',
    whatItDoesBody: '-자마자 表示前一个动作刚结束，后一个动作立刻发生，相当于"一……就……"，强调时间紧接。\n-기 시작하다 表示某个动作或状态开始发生，相当于"开始……"。\n两者都是叙述事件顺序时的高频表达。', whatItDoesBodyEn: '-자마자 indicates that the moment the first action ends, the second action immediately occurs, equivalent to "as soon as...", emphasizing immediacy.\\n-기 시작하다 indicates that an action or state begins to occur, equivalent to "begin to...".\\nBoth are high-frequency expressions for narrating the sequence of events.',
    structureNote: '-자마자：动词词干 + 자마자（不受时态影响，时态体现在后半句）\n-기 시작하다：动词词干 + 기 시작하다（시작하다 变时态）', structureNoteEn: '-자마자: verb stem + 자마자 (not affected by tense; tense is shown in the second clause)\\n-기 시작하다: verb stem + 기 시작하다 (시작하다 changes tense)',
    rulesNote: '-자마자 前半句不变时态，后半句决定整体时态。\n-기 시작하다 中 시작하다 可变时态：시작해요/시작했어요/시작할 거예요。', rulesNoteEn: '-자마자: the first clause doesn\'t change tense; the second clause determines the overall tense.\\n-기 시작하다: 시작하다 can change tense: 시작해요/시작했어요/시작할 거예요.',
    structures: [
      {
        ko: '집에 도착하자마자 잠이 들었어요',
        zh: '一到家就睡着了。', zhEn: 'I fell asleep as soon as I got home.',
        tokens: [
          { text: '집에', role: 'place' },
          { text: '도착하자마자', role: 'plain' },
          { text: '잠이 들었어요', role: 'verb' },
        ],
      },
      {
        ko: '알람이 울리자마자 일어났어요',
        zh: '闹钟一响就起来了。', zhEn: 'I got up as soon as the alarm went off.',
        tokens: [
          { text: '알람이', role: 'subject' },
          { text: '울리자마자', role: 'plain' },
          { text: '일어났어요', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 배우기 시작했어요',
        zh: '开始学韩语了。', zhEn: 'I started learning Korean.',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '배우기 시작했어요', role: 'verb' },
        ],
      },
      {
        ko: '봄이 되자마자 꽃이 피기 시작했어요',
        zh: '春天一到，花就开始开了。', zhEn: 'As soon as spring comes, the flowers start blooming.',
        tokens: [
          { text: '봄이 되자마자', role: 'plain' },
          { text: '꽃이', role: 'subject' },
          { text: '피기 시작했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-자마자 变形：动词词干 + 자마자（无时态变化）', textEn: '-자마자 conjugation: verb stem + 자마자 (no tense change)', examples: '먹다→먹자마자 / 일어나다→일어나자마자 / 도착하다→도착하자마자' },
      { type: 'rule', text: '-기 시작하다 变形：动词词干 + 기 시작하다', textEn: '-기 시작하다 conjugation: verb stem + 기 시작하다', examples: '먹다→먹기 시작해요 / 배우다→배우기 시작했어요 / 울다→울기 시작할 거예요' },
      { type: 'usage', text: '-자마자 强调两个动作紧密相连，几乎同时', textEn: '-자마자 emphasizes two actions are closely connected, almost simultaneous', examples: '문을 열자마자 고양이가 뛰어나왔어요（门一开猫就跑出来了）', examplesEn: '문을 열자마자 고양이가 뛰어나왔어요 (As soon as I opened the door, the cat ran out)' },
      { type: 'usage', text: '-기 시작하다 强调某件事进入了开始的状态', textEn: '-기 시작하다 emphasizes that something has entered a state of beginning', examples: '비가 오기 시작했어요（开始下雨了）/ 아이가 걷기 시작했어요（孩子开始走路了）', examplesEn: '비가 오기 시작했어요 (It started raining) / 아이가 걷기 시작했어요 (The child started walking)' },
      { type: 'compare', text: '-자마자 vs -고 나서：-자마자 强调立刻，-고 나서 是之后（有时间间隔）', textEn: '-자마자 vs -고 나서: -자마자 emphasizes immediacy, -고 나서 means \'after\' (with a time gap)', examples: '먹자마자 달렸어요（吃完立刻跑）vs 먹고 나서 달렸어요（吃完后跑了）', examplesEn: '먹자마자 달렸어요 (Ran right after eating) vs 먹고 나서 달렸어요 (Ran after eating)' },
      { type: 'note', text: 'KPOP 常用：눈을 뜨자마자 네 생각이 났어（一睁眼就想到你）', textEn: 'Common in K-pop: 눈을 뜨자마자 네 생각이 났어 (Thought of you the moment I opened my eyes)', examples: '이 노래를 듣자마자 팬이 됐어요（一听这首歌就变成粉丝了）', examplesEn: '이 노래를 듣자마자 팬이 됐어요 (Became a fan as soon as I heard this song)' },
      { type: 'note', text: '中文"一……就……"有两种：单次的"这一次刚做完就……"用 -자마자；重复/条件的"每次一……就总是……"要用 -(으)면。别一律套 -자마자', textEn: 'Chinese \'一……就……\' has two types: for a single instance \'as soon as this one time is done\' use -자마자; for repeated/conditional \'every time... always...\' use -(으)면. Don\'t just use -자마자 for everything.', examples: '집에 도착하자마자 잤어요（这次一到家就睡了·单次）vs 피곤하면 자요（一累就睡·习惯性→用 -면）', examplesEn: '집에 도착하자마자 잤어요 (Slept as soon as I got home this time·single) vs 피곤하면 자요 (Sleep when tired·habitual→use -면)' },
      { type: 'note', text: '-자마자 后句是自然发生的既成结果，一般不接命令/请求（하세요/합시다）。要表达"一……就马上去做某事"的指令，用 -는 대로（后面章节详学）', textEn: 'With -자마자, the following clause is a naturally occurring result; it doesn\'t usually take commands/requests (하세요/합시다). To express an instruction \'as soon as... go do something\', use -는 대로 (covered in detail in a later chapter).', examples: '× 도착하자마자 연락하세요 → ○ 도착하는 대로 연락하세요（一到就联系我）', examplesEn: '× 도착하자마자 연락하세요 → ○ 도착하는 대로 연락하세요 (Contact me as soon as you arrive)' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '학교에서', role: 'place' },
          { text: '돌아오자마자', role: 'plain' },
          { text: '숙제를', role: 'object' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '一从学校回来就做作业了。', zhEn: 'I did my homework as soon as I got back from school.',
        swapWords: ['숙제를 했어요', '밥을 먹었어요', '게임을 했어요', '유튜브를 봤어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그 노래를', role: 'object' },
          { text: '좋아하기', role: 'plain' },
          { text: '시작했어요', role: 'verb' },
        ],
        zh: '开始喜欢上那首歌了。', zhEn: 'I started liking that song.',
        swapWords: ['시작했어요', '시작했습니다', '시작할 것 같아요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '비가', role: 'subject' },
          { text: '오자마자', role: 'plain' },
          { text: '우산을 펼쳤어요', role: 'verb' },
        ],
        zh: '一下雨就撑开了伞。', zhEn: 'I opened my umbrella as soon as it started raining.',
        swapWords: ['우산을 펼쳤어요', '집에 들어갔어요', '택시를 탔어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🌅', context: '早晨习惯', contextEn: 'Morning habits', ko: '일어나자마자 핸드폰을 확인해요.', zh: '一起床就查手机。', zhEn: 'I check my phone as soon as I get up.' },
      { icon: '🎵', context: 'KPOP 入坑', contextEn: 'Falling into KPOP', ko: '이 노래를 듣자마자 팬이 됐어요.', zh: '一听这首歌就变成粉丝了。', zhEn: 'I became a fan as soon as I heard this song.' },
      { icon: '📚', context: '学习开始', contextEn: 'Start learning', ko: '작년부터 한국어를 배우기 시작했어요.', zh: '从去年开始学韩语了。', zhEn: 'I started learning Korean last year.' },
      { icon: '🌧️', context: '天气变化', contextEn: 'Weather changes', ko: '오후가 되자마자 비가 오기 시작했어요.', zh: '一到下午就开始下雨了。', zhEn: 'It started raining as soon as afternoon came.' },
      { icon: '✈️', context: '旅行回忆', contextEn: 'Travel memories', ko: '한국에 도착하자마자 치킨을 먹었어요.', zh: '一到韩国就吃炸鸡了。', zhEn: 'I ate fried chicken as soon as I arrived in Korea.' },
      { icon: '😴', context: '疲惫', contextEn: 'exhausted', ko: '침대에 눕자마자 잠이 들었어요.', zh: '一躺到床上就睡着了。', zhEn: 'I fell asleep as soon as I lay down on the bed.' },
    ],
    mistakes: [
      { wrong: '집에 도착했자마자', correct: '집에 도착하자마자', note: '-자마자 前半句不加过去时 -았/었，动词直接用词干形。', noteEn: 'With -자마자, the first clause doesn\'t take past tense -았/었; the verb uses its stem form directly.' },
      { wrong: '먹기를 시작했어요', correct: '먹기 시작했어요', note: '-기 시작하다 中间不加 -를，直接连接。', noteEn: 'With -기 시작하다, don\'t add -를 in between; connect directly.' },
      { wrong: '울자마자 웃었어요（逻辑矛盾但语法可以）', wrongEn: '울자마자 웃었어요 (logically contradictory but grammatically fine)', correct: '울다가 웃었어요', note: '-자마자 强调立刻转变，哭了就笑更自然用 -다가 表示中途转换。', noteEn: '-자마자 emphasizes an immediate switch; for crying then laughing, -다가 is more natural to show a mid-action change.' },
      { wrong: '스트레스를 받자마자 단 것을 먹어요', correct: '스트레스를 받으면 단 것을 먹어요', note: '想说"一有压力就（总会）吃甜食"这种习惯性反应，用 -(으)면；-자마자 只表示某一次刚发生后紧接的单次动作。', noteEn: 'For habitual reactions like "whenever I\'m stressed, I eat sweets," use -(으)면; -자마자 only expresses a single action right after another single event.' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P9 · 第8课</div>
    <div class="ov-hero-title">-자마자, -기 시작하다</div>
    <div class="ov-hero-sub">紧接发生与开始的两种时间表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">立刻</div>
      <div class="ko">动词 어간 + 자마자</div>
      <div class="zh">一……就……（前后紧接，无时间间隔）</div>
    </div>
    <div class="ov-block">
      <div class="badge">开始</div>
      <div class="ko">动词 어간 + 기 시작하다</div>
      <div class="zh">开始……（进入某状态的起点）</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表示"一……就……"和"开始……"</div>
<div class="card-body">-자마자 表示前一个动作刚结束，后一个动作立刻发生，相当于"一……就……"，强调时间紧接。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">집에 도착하자마자 잠이 들었어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">一到家就睡着了。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">알람이 울리자마자 일어났어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">闹钟一响就起来了。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
<div class="reminder-box">-자마자 前半句不变时态，后半句决定整体时态。
-기 시작하다 中 시작하다 可变时态：시작해요/시작했어요/시작할 거예요。</div>
`,
    compareLabel: '-자마자（一…就…）vs -기 시작하다（开始…）', compareLabelEn: '-자마자 (as soon as) vs -기 시작하다 (start doing)',
    compareHtml: `
<div class="card-title">-자마자 vs -기 시작하다</div>
<div class="card-body">两者都讲动作的时间点，但 <b>-자마자</b> 说"前一件刚完、后一件立刻发生"，<b>-기 시작하다</b> 说"某事进入了开始的状态"。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">-자마자</div>
    <div class="cmp-row"><span class="badge">重点</span><span class="zh">前后两个动作紧接、几乎同时</span></div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">动词词干直接+자마자（不变时态）</span></div>
    <div class="cmp-row"><span class="ko">집에 도착하자마자 잠이 들었어요</span></div>
    <div class="cmp-row"><span class="zh">一到家就睡着了（刚到→立刻睡）</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">-기 시작하다</div>
    <div class="cmp-row"><span class="badge">重点</span><span class="zh">一个动作/状态的起点（开始做…）</span></div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">动词词干+기 시작하다（시작하다 变时态）</span></div>
    <div class="cmp-row"><span class="ko">한국어를 배우기 시작했어요</span></div>
    <div class="cmp-row"><span class="zh">开始学韩语了（进入"开始"状态）</span></div>
  </div>
</div>
<div class="reminder-box">一句话记：<b>-자마자</b> 连接两件事（一…就…）；<b>-기 시작하다</b> 只标记一件事的开头（开始…）。</div>
`,
    quickTable: {
      title: '-자마자 vs 기 시작하다 对比', titleEn: '-자마자 vs 기 시작하다 comparison',
      headers: ['语法', '强调', '时态位置', '예시'],
      rows: [
        [{ ko: '-자마자', zh: '' }, { ko: '即刻性', zh: '前后无间隔', zhEn: 'No gap between events' }, { ko: '后半句', zh: '' }, { ko: '도착하자마자 먹었어요', zh: '一到就吃了', zhEn: 'Ate as soon as arrived' }],
        [{ ko: '-기 시작하다', zh: '' }, { ko: '起点', zh: '动作开始', zhEn: 'Action begins' }, { ko: '시작하다 变形', zh: '' }, { ko: '먹기 시작했어요', zh: '开始吃了', zhEn: 'Started eating' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: "-자마자, -기 시작하다",
      body: "测试对两个语法点的掌握", bodyEn: 'Tests mastery of two grammar points',
      questions: [
        {
          prompt: '一醒来就看手机。→ 눈을 뜨___ 핸드폰을 봐요', promptEn: 'I check my phone as soon as I wake up. → 눈을 뜨___ 핸드폰을 봐요',
          options: ['기 전에', '은 후에', '자마자', '기 시작하면'],
          answer: 2 as 0|1|2|3,
          explanation: "-자마자 接动词词干基本形", explanationEn: '-자마자 attaches to the verb stem base form',
        },
        {
          prompt: '开始学韩语了。→ 한국어를 배우___', promptEn: 'I started learning Korean. → 한국어를 배우___',
          options: ['자마자요', '기 때문이에요', '기 위해요', '기 시작했어요'],
          answer: 3 as 0|1|2|3,
          explanation: "动词 + 기 시작하다 = 开始……", explanationEn: 'Verb + 기 시작하다 = start doing...',
        },
        {
          prompt: '-자마자 前半句用什么时态？', promptEn: 'What tense is used in the first clause with -자마자?',
          options: ['现在时', '基本形（不变时态）', '将来时', '过去时'],
          answer: 1 as 0|1|2|3,
          explanation: "-자마자 前半句用基本形，后半句决定时态", explanationEn: '-자마자: first clause in basic form, second clause determines tense',
        },
        {
          prompt: '雨开始下了。→ 비가 오___', promptEn: 'It started raining. → 비가 오___',
          options: ['기 시작했어요', '기 싫어요', '기로 했어요', '자마자요'],
          answer: 0 as 0|1|2|3,
          explanation: "오다 无收音 → 오기 시작했어요", explanationEn: '오다 (no batchim) → 오기 시작했어요',
        },
      ],
    },
    linkedGrammarIds: ['g39'],
  },

  {
    id: 'card-p9-l09',
    partNumber: 9,
    lessonNumber: 9,
    title: '-은/ㄴ 덕분에, -는/은/ㄴ 지 알다/모르다',
    whatItDoes: '表达"多亏了"的感谢，以及"知不知道怎么做"的询问', whatItDoesEn: 'Expressing gratitude with "thanks to" and asking "do you know how to"',
    whatItDoesBody: '-은/ㄴ 덕분에 用于表示因某人/某事获益，是正面的因果。\n-는/은/ㄴ 지 알다/모르다 用来询问或表达"会不会/知不知道"某件事的方法或状态。\n两个语法在日常生活和韩剧对话中都极为常见。', whatItDoesBodyEn: '-은/ㄴ 덕분에 is used to express benefiting from someone/something, a positive cause-and-effect.\\n-는/은/ㄴ 지 알다/모르다 is used to ask or express "do you know how to/whether" something is done or its state.\\nBoth grammar points are extremely common in daily life and Korean drama dialogue.',
    structures: [
      {
        ko: '선생님 덕분에 합격했어요',
        zh: '多亏了老师，我考上了。', zhEn: 'Thanks to my teacher, I passed.',
        tokens: [
          { text: '선생님', role: 'subject' },
          { text: '덕분에', role: 'plain' },
          { text: '합격했어요', role: 'verb' },
        ],
      },
      {
        ko: '여러분 덕분에 좋은 추억이 생겼어요',
        zh: '多亏大家，留下了美好的回忆。', zhEn: 'Thanks to everyone, we made great memories.',
        tokens: [
          { text: '여러분', role: 'subject' },
          { text: '덕분에', role: 'plain' },
          { text: '좋은 추억이 생겼어요', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 어떻게 공부하는지 알아요',
        zh: '你知道怎么学韩语吗？', zhEn: 'Do you know how to study Korean?',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '어떻게 공부하는지', role: 'verb' },
          { text: '알아요', role: 'verb' },
        ],
      },
      {
        ko: '버스가 몇 시에 오는지 몰라요',
        zh: '我不知道公交几点来。', zhEn: 'I don\'t know when the bus comes.',
        tokens: [
          { text: '버스가', role: 'subject' },
          { text: '몇 시에', role: 'time' },
          { text: '오는지', role: 'verb' },
          { text: '몰라요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + 덕분에（名词直接接，无需冠词形）', textEn: 'Noun + 덕분에 (attach directly to noun, no particle needed)', examples: '친구 덕분에 / 선생님 덕분에 / 노력 덕분에' },
      { type: 'rule', text: '-은/ㄴ 덕분에 接在动词/形容词后：动词过去冠词形 + 덕분에', textEn: '-은/ㄴ 덕분에 after verbs/adjectives: past adnominal form + 덕분에', examples: '도와준 덕분에 / 열심히 한 덕분에 / 가르쳐 준 덕분에' },
      { type: 'usage', text: '-는/은/ㄴ지 알다/모르다：动词现在时用 -는지，形容词/名词用 -은/ㄴ지', textEn: '-는/은/ㄴ지 알다/모르다: use -는지 for present tense verbs, -은/ㄴ지 for adjectives/nouns', examples: '가는지 알아요 / 큰지 몰라요 / 학생인지 알아요' },
      { type: 'usage', text: '疑问词 + -는/은/ㄴ지：어떻게/어디/언제/누가/얼마나 + -는지', textEn: 'Question word + -는/은/ㄴ지: 어떻게/어디/언제/누가/얼마나 + -는지', examples: '어디에 가는지 알아요? / 얼마인지 몰라요' },
      { type: 'note', text: '덕분에 只用于正面结果，负面结果要用 때문에', textEn: '덕분에 is only for positive results; use 때문에 for negative ones', examples: '× 늦잠 잔 덕분에 지각했어요 → ○ 늦잠을 잤기 때문에 지각했어요' },
      { type: 'compare', text: '-는/은/ㄴ 지 알다 vs -는/은/ㄴ 줄 알다：两者都是"知道"，但 -는 줄 알다 更强调主观认为/以为', textEn: '-는/은/ㄴ 지 알다 vs -는/은/ㄴ 줄 알다: both mean \'know\', but -는 줄 알다 emphasizes subjective assumption', examples: '비가 오는지 알아요（知道下雨吗）vs 비가 오는 줄 알았어요（以为下雨了）', examplesEn: '비가 오는지 알아요 (do you know it\'s raining?) vs 비가 오는 줄 알았어요 (I thought it was raining)' },
      { type: 'example', text: '덕분에 常用于感谢语境，也可以做单独的回答', textEn: '덕분에 is often used in gratitude contexts, and can be a standalone answer', examples: 'A: 어떻게 좋아졌어요? B: 약 덕분에요 / 친구들 덕분이에요（托朋友的福）', examplesEn: 'A: 어떻게 좋아졌어요? B: 약 덕분에요 / 친구들 덕분이에요 (thanks to my friends)' },
      { type: 'compare', text: '中文一个"因为"分成三个：덕분에=多亏（受益·褒）/ 때문에=因为（中性）/ 탓에=都怪（怪罪·贬）。选错情感就跑偏', textEn: 'Chinese \'because\' splits into three: 덕분에 = thanks to (beneficial, positive) / 때문에 = because (neutral) / 탓에 = blame (negative). Choosing wrong changes the emotion', examples: '친구 덕분에 붙었어요（多亏朋友考上了）/ 비 때문에 늦었어요（因为下雨迟到了·中性）/ 내 탓에 졌어요（都怪我输了·自责）', examplesEn: '친구 덕분에 붙었어요 (passed thanks to friend) / 비 때문에 늦었어요 (late because of rain, neutral) / 내 탓에 졌어요 (lost because of me, self-blame)' },
      { type: 'note', text: '-는지 要跟着时态变，不是永远 -는지：过去 -았/었는지，推测/将来 -(으)ㄹ지', textEn: '-는지 changes with tense, not always -는지: past -았/었는지, conjecture/future -(으)ㄹ지', examples: '어제 왔는지 몰라요（不知道昨天来没来）/ 내일 올지 몰라요（不知道明天会不会来）', examplesEn: '어제 왔는지 몰라요 (don\'t know if came yesterday) / 내일 올지 몰라요 (don\'t know if will come tomorrow)' },
    ],
    cardExamples: [
      {
        zh: '多亏了朋友，我才能学到韩语。', zhEn: 'Thanks to my friend, I was able to learn Korean.',
        wordBlocks: [
          { text: '친구', role: 'subject' },
          { text: '덕분에', role: 'plain' },
          { text: '한국어를', role: 'object' },
          { text: '배울 수 있었어요', role: 'verb' },
        ],
        swapWords: ['선생님 덕분에', '부모님 덕분에', '여러분 덕분에'],
      },
      {
        zh: '你知道在哪里卖吗？', zhEn: 'Do you know where it\'s sold?',
        wordBlocks: [
          { text: '어디서 파는지', role: 'verb' },
          { text: '알아요', role: 'verb' },
        ],
        swapWords: ['사는지 알아요', '만드는지 알아요', '있는지 알아요'],
      },
      {
        zh: '多亏努力练习，在比赛中获得了第一名。', zhEn: 'Thanks to practicing hard, I got first place in the competition.',
        wordBlocks: [
          { text: '열심히 연습한', role: 'verb' },
          { text: '덕분에', role: 'plain' },
          { text: '대회에서', role: 'place' },
          { text: '1등을 했어요', role: 'verb' },
        ],
        swapWords: ['공부한 덕분에', '노력한 덕분에', '준비한 덕분에'],
      },
      {
        zh: '我不知道公交几点出发。', zhEn: 'I don\'t know when the bus departs.',
        wordBlocks: [
          { text: '버스가', role: 'subject' },
          { text: '몇 시에', role: 'time' },
          { text: '출발하는지', role: 'verb' },
          { text: '몰라요', role: 'verb' },
        ],
        swapWords: ['오는지 몰라요', '끝나는지 몰라요', '있는지 몰라요'],
      },
    ],
    scenarios: [
      { icon: '🎓', context: '考试通过，感谢老师', contextEn: 'Passed the exam, thanks to my teacher', ko: '선생님 덕분에 시험에 합격했어요. 정말 감사합니다.', zh: '多亏了老师，我考过了。真的非常感谢。', zhEn: 'Thanks to my teacher, I passed the exam. I\'m really grateful.', tip: '감사합니다 = 正式感谢', tipEn: '감사합니다 = formal thanks' },
      { icon: '🎬', context: '韩剧台词：多亏你我才撑下来', contextEn: 'K-drama line: Thanks to you, I managed to hold on.', ko: '네 덕분에 버텼어. 고마워.', zh: '多亏有你我才撑过来的。谢谢你。', zhEn: 'Thanks to you, I got through it. Thank you.', tip: '버티다 = 坚持/撑住', tipEn: '버티다 = to endure/hold on' },
      { icon: '🚻', context: '问路时询问地点', contextEn: 'Asking for directions', ko: '죄송한데요, 화장실이 어디 있는지 아세요?', zh: '不好意思，请问您知道洗手间在哪里吗？', zhEn: 'Excuse me, do you know where the restroom is?', tip: '-는지 아세요 = 礼貌地询问对方是否知道', tipEn: '-는지 아세요 = politely asking if someone knows' },
      { icon: '🎵', context: 'KPOP 粉丝对爱豆表达感谢', contextEn: 'KPOP fans expressing gratitude to their idols', ko: '오빠 덕분에 매일 행복해요. 항상 응원할게요.', zh: '多亏了欧巴，每天都很幸福。我会一直支持你的。', zhEn: 'Thanks to oppa, I\'m happy every day. I\'ll always support you.', tip: '항상 응원할게요 = 我会一直应援', tipEn: '항상 응원할게요 = I\'ll always cheer you on' },
      { icon: '📱', context: '不确定某信息，向朋友确认', contextEn: 'Confirming uncertain info with a friend', ko: '이 식당이 오늘 여는지 알아? 홈페이지에서 못 찾겠어.', zh: '你知道这家餐厅今天开不开吗？我在官网找不到。', zhEn: 'Do you know if this restaurant is open today? I can\'t find it on their website.' },
      { icon: '🍱', context: '日常感谢家人的帮助', contextEn: 'Everyday thanks for family\'s help', ko: '엄마 덕분에 맛있는 밥 잘 먹었어요.', zh: '多亏妈妈，吃到了好吃的饭。', zhEn: 'Thanks to Mom, I got to eat a delicious meal.', tip: '덕분에 之后不一定要大事，日常小感谢也可以用', tipEn: '덕분에 doesn\'t have to follow a big event; it can be used for small daily thanks too.' },
    ],
    mistakes: [
      {
        wrong: '늦잠 잔 덕분에 지각했어요',
        correct: '늦잠을 잤기 때문에 지각했어요',
        note: '덕분에 只用于正面/受益情境，负面结果一律用 때문에', noteEn: '덕분에 is only used for positive/beneficial situations; for negative results, always use 때문에.',
      },
      {
        wrong: '어디에 가지 알아요?',
        correct: '어디에 가는지 알아요?',
        note: '动词接 알다/모르다 时要用 -는지，不是 -지', noteEn: 'When a verb is followed by 알다/모르다, use -는지, not -지.',
      },
      {
        wrong: '친구 덕분이에요 그래서 합격했어요',
        correct: '친구 덕분에 합격했어요',
        note: '덕분에 本身就是连接词，后面直接接结果句，不需要 그래서', noteEn: '덕분에 is itself a connector; it directly links to the result clause, so 그래서 isn\'t needed.',
      },
      {
        wrong: '얼마인지를 알아요?',
        correct: '얼마인지 알아요?',
        note: '-는지/인지 后面不加 를，直接接 알다/모르다', noteEn: '-는지/인지 is not followed by 를; it directly connects to 알다/모르다.',
      },
      {
        wrong: '어제 밥을 먹는지 몰라요',
        correct: '어제 밥을 먹었는지 몰라요',
        note: '问过去的事要用 -았/었는지，不能freeze成 -는지；-는지 只表现在。', noteEn: 'For past events, use -았/었는지, not -는지; -는지 only indicates the present.',
      },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P9 · 第9课</div>
    <div class="ov-hero-title">-은/ㄴ 덕분에, -는/은/ㄴ 지 알다/모르다</div>
    <div class="ov-hero-sub">感谢因果 与 知道/不知道 的表达</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">感谢</div>
      <div class="ko">名词/动词 过去 冠词形 + 덕분에</div>
      <div class="zh">多亏……（只用于正面结果）</div>
    </div>
    <div class="ov-block">
      <div class="badge">询问</div>
      <div class="ko">动词 어간 + 는/은/ㄴ 지 알다/모르다</div>
      <div class="zh">知不知道……怎么/在哪/是否……</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#aee3d8"></div><div class="ov-section-title">对比提示</div></div>
    <div class="ov-block">
      <div class="ko">덕분에 vs 때문에</div>
      <div class="zh">덕분에 = 正面 / 때문에 = 中性或负面</div>
    </div>
    <div class="ov-block">
      <div class="ko">-는지 알다 vs -는 줄 알다</div>
      <div class="zh">-는지 알다 = 客观知道 / -는 줄 알다 = 主观以为</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">表达"多亏了"的感谢，以及"知不知道怎么做"的询问</div>
<div class="card-body">-은/ㄴ 덕분에 用于表示因某人/某事获益，是正面的因果。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">선생님 덕분에 합격했어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">多亏了老师，我考上了。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">여러분 덕분에 좋은 추억이 생겼어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">多亏大家，留下了美好的回忆。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
`,
    compareLabel: '-은/ㄴ 덕분에（多亏…）vs -는/은/ㄴ 지 알다/모르다（知不知道…）', compareLabelEn: '-은/ㄴ 덕분에 (thanks to...) vs -는/은/ㄴ 지 알다/모르다 (know whether...)',
    compareHtml: `
<div class="card-title">-은/ㄴ 덕분에 vs -는/은/ㄴ 지 알다/모르다</div>
<div class="card-body">本课两个句型作用完全不同：<b>덕분에</b> 讲正面的因果（多亏…），<b>-는지 알다/모르다</b> 讲对某事知不知道（间接疑问）。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">-은/ㄴ 덕분에</div>
    <div class="cmp-row"><span class="badge">作用</span><span class="zh">因某人/某事获益的正面因果（只用于好结果）</span></div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">名词+덕분에 / 动词过去冠词形+덕분에</span></div>
    <div class="cmp-row"><span class="ko">선생님 덕분에 합격했어요</span></div>
    <div class="cmp-row"><span class="zh">多亏了老师，我考上了（负面结果要用 때문에）</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">-는/은/ㄴ 지 알다/모르다</div>
    <div class="cmp-row"><span class="badge">作用</span><span class="zh">间接疑问，知不知道…怎样/在哪/是否</span></div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">动词+는지 / 形容词+은·ㄴ지 + 알다/모르다</span></div>
    <div class="cmp-row"><span class="ko">한국어를 어떻게 공부하는지 알아요?</span></div>
    <div class="cmp-row"><span class="zh">你知道怎么学韩语吗？</span></div>
  </div>
</div>
<div class="reminder-box">一句话记：<b>덕분에</b>=多亏（表感谢，接名词/冠词形）；<b>-는지 알다/모르다</b>=知不知道（间接疑问，后不加 를）。</div>
`,
    quickTable: {
      title: '덕분에 接续形式', titleEn: '덕분에 conjugation forms',
      headers: ['接在', '形式', '예시', '意思'],
      rows: [
        [{ ko: '동사', zh: '动词', zhEn: 'Verb' }, { ko: '-은/ㄴ 덕분에', zh: '' }, { ko: '도와준 덕분에', zh: '' }, { ko: '多亏帮了我', zh: '' }],
        [{ ko: '형용사', zh: '形容词', zhEn: 'Adjective.' }, { ko: '-은/ㄴ 덕분에', zh: '' }, { ko: '건강한 덕분에', zh: '' }, { ko: '多亏身体健康', zh: '' }],
        [{ ko: '명사', zh: '名词', zhEn: 'Noun' }, { ko: '명사 + 덕분에', zh: '' }, { ko: '선생님 덕분에', zh: '' }, { ko: '多亏了老师', zh: '' }],
        [{ ko: '간접의문', zh: '间接疑问', zhEn: 'Indirect questions' }, { ko: '-는/은/ㄴ지 알다', zh: '' }, { ko: '뭐 먹는지 알아요?', zh: '' }, { ko: '知道吃什么吗？', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: "-은/ㄴ 덕분에, -는/은/ㄴ 지 알다/모르다",
      body: "测试对两个语法点的掌握", bodyEn: 'Tests mastery of two grammar points',
      questions: [
        {
          prompt: '多亏朋友帮忙，搬家顺利完成了。→ 친구가 ___ 이사를 잘 마쳤어요', promptEn: 'Thanks to my friend\'s help, the move went smoothly. → 친구가 ___ 이사를 잘 마쳤어요',
          options: ['도와준 덕분에', '도와주자마자', '도와주기 때문에', '도와주는 데다가'],
          answer: 0 as 0|1|2|3,
          explanation: "动词冠词形 + 덕분에 = 多亏……", explanationEn: 'Verb modifier form + 덕분에 = thanks to...',
        },
        {
          prompt: '你知道他住哪里吗？→ 그 사람이 어디 사는 ___', promptEn: 'Do you know where he lives? → 그 사람이 어디 사는 ___',
          options: ['지도 알아요?', '것 알아요?', '지 알아요?', '데 알아요?'],
          answer: 2 as 0|1|2|3,
          explanation: "-는/은/ㄴ 지 알다 = 间接疑问，知道……", explanationEn: '-는/은/ㄴ 지 알다 = indirect question, know...',
        },
        {
          prompt: '덕분에 表达的是什么语气？', promptEn: 'What tone does 덕분에 express?',
          options: ['顺序、然后', '感谢、正面结果', '让步、即使', '批评、负面原因'],
          answer: 1 as 0|1|2|3,
          explanation: "덕분에 = 感谢正面结果", explanationEn: '덕분에 = grateful for a positive outcome',
        },
        {
          prompt: '不知道要去哪里。→ 어디에 가야 하는 ___', promptEn: 'I don\'t know where to go. → 어디에 가야 하는 ___',
          options: ['데 몰라요', '것 몰라요', '지도 몰라요', '지 몰라요'],
          answer: 3 as 0|1|2|3,
          explanation: "-는/은/ㄴ 지 모르다 = 不知道……", explanationEn: '-는/은/ㄴ 지 모르다 = don\'t know...',
        },
      ],
    },
    linkedGrammarIds: ['g80', 'g75'],
  },

  {
    id: 'card-p9-l10',
    partNumber: 9,
    lessonNumber: 10,
    title: '-기(가), -을/ㄹ 수 있다/없다',
    whatItDoes: '用名词化表达难易程度，用"수 있다/없다"表示能力或可能性', whatItDoesEn: 'Expressing difficulty with nominalization, and ability/possibility with "수 있다/없다"',
    whatItDoesBody: '-기(가) 쉽다/어렵다/힘들다 把动词变成名词，然后接形容词来描述难易。\n-을/ㄹ 수 있다 表示"能做/可以做"，-을/ㄹ 수 없다 表示"不能做/无法做"。\n两个结构都是日常高频，表达能力、可能性、难易程度缺一不可。', whatItDoesBodyEn: '-기(가) 쉽다/어렵다/힘들다 turns a verb into a noun and then attaches an adjective to describe difficulty.\\n-을/ㄹ 수 있다 means "can do/be able to do", -을/ㄹ 수 없다 means "cannot do/be unable to do".\\nBoth structures are high-frequency in daily use, essential for expressing ability, possibility, and difficulty.',
    structures: [
      {
        ko: '한국어는 배우기가 어렵지 않아요',
        zh: '韩语学起来并不难。', zhEn: 'Korean isn\'t hard to learn.',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '배우기가', role: 'verb' },
          { text: '어렵지 않아요', role: 'verb' },
        ],
      },
      {
        ko: '이 음식은 먹기가 좀 힘들어요',
        zh: '这道菜吃起来有点难。', zhEn: 'This dish is a bit hard to eat.',
        tokens: [
          { text: '이 음식은', role: 'subject' },
          { text: '먹기가', role: 'verb' },
          { text: '좀 힘들어요', role: 'verb' },
        ],
      },
      {
        ko: '저는 수영을 할 수 있어요',
        zh: '我会游泳。', zhEn: 'I can swim.',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '수영을', role: 'object' },
          { text: '할 수 있어요', role: 'verb' },
        ],
      },
      {
        ko: '오늘은 바빠서 만날 수 없어요',
        zh: '今天太忙了，没办法见面。', zhEn: 'I\'m too busy today to meet up.',
        tokens: [
          { text: '오늘은', role: 'time' },
          { text: '바빠서 만날 수 없어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-기(가) + 形容词：动词词干 + 기(가) + 쉽다/어렵다/힘들다/편하다', textEn: '-기(가) + adjective: verb stem + 기(가) + 쉽다/어렵다/힘들다/편하다', examples: '쓰기가 편해요 / 읽기가 쉬워요 / 발음하기가 어려워요' },
      { type: 'rule', text: '-을/ㄹ 수 있다：有收音词干 + 을 수 있다，无收音词干 + ㄹ 수 있다', textEn: '-을/ㄹ 수 있다: stem with final consonant + 을 수 있다, stem without final consonant + ㄹ 수 있다', examples: '먹을 수 있다 / 갈 수 있다 / 만들 수 있다' },
      { type: 'rule', text: '-을/ㄹ 수 없다：有收音词干 + 을 수 없다，无收音词干 + ㄹ 수 없다', textEn: '-을/ㄹ 수 없다: stem with final consonant + 을 수 없다, stem without final consonant + ㄹ 수 없다', examples: '먹을 수 없다 / 갈 수 없다 / 만들 수 없다' },
      { type: 'usage', text: '-기가 中的 가 可省略，가 存在时语气更正式/书面', textEn: 'The 가 in -기가 can be omitted; with 가, the tone is more formal/written', examples: '먹기 쉬워요 = 먹기가 쉬워요（口语常省）', examplesEn: '먹기 쉬워요 = 먹기가 쉬워요 (often omitted in speech)' },
      { type: 'compare', text: '-을/ㄹ 수 없다 vs 못 + 动词：两者意思相近，못 更口语，수 없다 更正式', textEn: '-을/ㄹ 수 없다 vs 못 + verb: similar meaning, 못 is more colloquial, 수 없다 is more formal', examples: '갈 수 없어요 = 못 가요（不能去）', examplesEn: '갈 수 없어요 = 못 가요 (can\'t go)' },
      { type: 'note', text: '-을/ㄹ 수 있다 也可表示"有可能"，不仅仅是技能', textEn: '-을/ㄹ 수 있다 can also mean "possible," not just ability', examples: '비가 올 수 있어요（有可能下雨）/ 실수할 수 있어요（可能会出错）', examplesEn: '비가 올 수 있어요 (it might rain) / 실수할 수 있어요 (might make a mistake)' },
      { type: 'example', text: '날씨 때문에 여행을 갈 수 없어요', examples: '因为天气，没办法去旅行。（外部原因导致不可能）', examplesEn: 'Because of the weather, I can\'t go on a trip. (impossible due to external reasons)' },
      { type: 'note', text: '中文"会"有两个意思：表能力/学会了的"会"用 수 있다；表意愿/打算的"我会去"要用 -(으)ㄹ게요/-(으)ㄹ 거예요，别套 수 있다', textEn: 'Chinese "会" has two meanings: for ability/learned skill, use 수 있다; for intention/plan like "I will go," use -(으)ㄹ게요/-(으)ㄹ 거예요, not 수 있다', examples: '수영할 수 있어요（我会游泳·能力）vs 내일 갈게요（我会去的·意愿承诺）', examplesEn: '수영할 수 있어요 (I can swim·ability) vs 내일 갈게요 (I\'ll go tomorrow·intention/promise)' },
      { type: 'note', text: '-기가 后面只接难易/好恶这类评价形容词（쉽다/어렵다/힘들다/편하다/좋다/싫다），不接一般描述形容词', textEn: '-기가 only attaches to evaluative adjectives of difficulty/preference (쉽다/어렵다/힘들다/편하다/좋다/싫다), not general descriptive adjectives', examples: '○ 읽기가 쉬워요 / ○ 보기가 좋아요（× 읽기가 예뻐요·不能接 예쁘다）', examplesEn: '○ 읽기가 쉬워요 / ○ 보기가 좋아요 (× 읽기가 예뻐요 — can\'t use 예쁘다)' },
    ],
    cardExamples: [
      {
        zh: '这首歌唱起来太难了。', zhEn: 'This song is too hard to sing.',
        wordBlocks: [
          { text: '이 노래는', role: 'subject' },
          { text: '부르기가', role: 'verb' },
          { text: '너무 어려워요', role: 'verb' },
        ],
        swapWords: ['외우기가 어려워요', '연습하기가 힘들어요', '따라하기가 어려워요'],
      },
      {
        zh: '我能吃泡菜。', zhEn: 'I can eat kimchi.',
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '김치를', role: 'object' },
          { text: '먹을 수 있어요', role: 'verb' },
        ],
        swapWords: ['매운 음식을', '생선을', '낙지를'],
      },
      {
        zh: '用韩语写日记越来越顺手了。', zhEn: 'Writing a diary in Korean is getting easier and easier.',
        wordBlocks: [
          { text: '한국어로', role: 'plain' },
          { text: '일기를', role: 'object' },
          { text: '쓰기가', role: 'verb' },
          { text: '점점 편해졌어요', role: 'verb' },
        ],
        swapWords: ['편지를 쓰기가', '메시지를 쓰기가', '보고서를 쓰기가'],
      },
      {
        zh: '今天没时间，没办法去。', zhEn: 'I don\'t have time today, so I can\'t go.',
        wordBlocks: [
          { text: '오늘은', role: 'time' },
          { text: '시간이 없어서', role: 'plain' },
          { text: '갈 수 없어요', role: 'verb' },
        ],
        swapWords: ['만날 수 없어요', '참석할 수 없어요', '도와줄 수 없어요'],
      },
    ],
    scenarios: [
      { icon: '🗣️', context: '介绍自己的语言能力', contextEn: 'Introducing your language skills', ko: '저는 한국어와 영어를 할 수 있어요. 일본어는 조금밖에 못 해요.', zh: '我会韩语和英语，日语只会一点点。', zhEn: 'I know Korean and English, and only a little Japanese.', tip: '밖에 + 못 = 只能…（强调有限）', tipEn: '밖에 + 못 = can only… (emphasizes limitation)' },
      { icon: '🎵', context: 'KPOP 粉丝聊唱歌', contextEn: 'KPOP fans talking about singing', ko: '이 곡은 고음이 많아서 따라 부르기가 정말 힘들어요.', zh: '这首歌高音很多，跟着唱真的很难。', zhEn: 'This song has a lot of high notes, so it\'s really hard to sing along.', tip: '고음 = 高音；따라 부르다 = 跟唱', tipEn: '고음 = high note; 따라 부르다 = sing along' },
      { icon: '📅', context: '约朋友但有事无法赴约', contextEn: 'Making plans with a friend but can\'t make it', ko: '이번 주말에는 약속이 있어서 같이 갈 수 없을 것 같아요.', zh: '这周末有约，好像没办法一起去了。', zhEn: 'I have plans this weekend, so it seems I can\'t go together.', tip: '-을 것 같아요 = 好像……（推测/委婉拒绝）', tipEn: '-을 것 같아요 = seems like… (guess/polite refusal)' },
      { icon: '🍽️', context: '点菜时询问饮食限制', contextEn: 'Asking about dietary restrictions when ordering', ko: '저는 고수를 못 먹어요. 고수 빼고 만들 수 있어요?', zh: '我不能吃香菜。可以去掉香菜做吗？', zhEn: 'I can\'t eat cilantro. Can you make it without cilantro?', tip: '빼다 = 去掉/排除', tipEn: '빼다 = to remove/exclude' },
      { icon: '📱', context: '夸赞某事做起来容易', contextEn: 'Praising something as easy to do', ko: '이 앱은 사용하기가 정말 쉬워요. 누구든지 할 수 있어요.', zh: '这个App用起来真的很简单，任何人都能用。', zhEn: 'This app is really simple to use — anyone can use it.', tip: '누구든지 = 无论谁/任何人', tipEn: '누구든지 = anyone/whoever' },
      { icon: '🎬', context: '韩剧台词：做不到某事', contextEn: 'K-drama line: can\'t do something', ko: '미안해. 나 더 이상 기다릴 수 없어.', zh: '对不起，我没办法再等下去了。', zhEn: 'I\'m sorry, I can\'t wait any longer.', tip: '더 이상 + 수 없다 = 无法再……（放弃/绝望语气）', tipEn: '더 이상 + 수 없다 = can\'t anymore… (giving up/despair)' },
    ],
    mistakes: [
      {
        wrong: '저는 운전을 할 수 있을 수 있어요',
        correct: '저는 운전을 할 수 있어요',
        note: '-을 수 있다 不能叠加，只用一次即可', noteEn: '-을 수 있다 can\'t be stacked — use it only once',
      },
      {
        wrong: '이 문제는 어렵기',
        correct: '이 문제는 풀기가 어려워요',
        note: '-기가 之后 必须接形容词，不能单独结句', noteEn: 'After -기가, an adjective must follow; it cannot end a sentence alone.',
      },
      {
        wrong: '갈 수를 없다',
        correct: '갈 수가 없다 / 갈 수 없다',
        note: '수 后面可以用 가 强调，但不能用 을/를。를 是宾格助词，수 不是宾语而是依存名词。', noteEn: 'After 수, 가 can be used for emphasis, but not 을/를. 를 is an object particle; 수 is not an object but a dependent noun.',
      },
      {
        wrong: '쓰기는 어렵지 않지만 말하기는 어렵기 있어요',
        correct: '쓰기는 어렵지 않지만 말하기는 어려워요',
        note: '-기가 어렵다 不能说 어렵기 있다', noteEn: '-기가 어렵다 is correct; you can\'t say 어렵기 있다.',
      },
      {
        wrong: '내일 꼭 갈 수 있어요',
        correct: '내일 꼭 갈게요 / 내일 꼭 갈 거예요',
        note: '想表达"我一定会去"这种意愿承诺，用 -(으)ㄹ게요/-(으)ㄹ 거예요；갈 수 있어요 只是说"能去/有条件去"，不含决心。', noteEn: 'To express a promise or intention like "I will definitely go," use -(으)ㄹ게요/-(으)ㄹ 거예요. 갈 수 있어요 only means "can go" or "have the conditions to go," without commitment.',
      },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P9 · 第10课</div>
    <div class="ov-hero-title">-기(가), -을/ㄹ 수 있다/없다</div>
    <div class="ov-hero-sub">名词化难易度 与 能力可能性</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">本课语法点</div></div>
    <div class="ov-block">
      <div class="badge">难易</div>
      <div class="ko">动词 어간 + 기(가) + 쉽다/어렵다/힘들다</div>
      <div class="zh">做……容易/难/累（名词化后接形容词）</div>
    </div>
    <div class="ov-block">
      <div class="badge">能力</div>
      <div class="ko">动词 어간 + 을/ㄹ 수 있다/없다</div>
      <div class="zh">能/不能做……（能力、可能性）</div>
    </div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#aee3d8"></div><div class="ov-section-title">核心对比</div></div>
    <div class="ov-block">
      <div class="ko">갈 수 없어요 vs 못 가요</div>
      <div class="zh">수 없다 = 较正式 / 못 = 口语常用</div>
    </div>
  </div>
</div>`,
    step0Html: `
<div class="card-title">用名词化表达难易程度，用"수 있다/없다"表示能力或可能性</div>
<div class="card-body">-기(가) 쉽다/어렵다/힘들다 把动词变成名词，然后接形容词来描述难易。</div>
<div class="hook-box">
  <div style="font-size:16px;font-weight:800;color:#89756e;letter-spacing:.06em;margin-bottom:12px">学完这节课，你能说</div>
  <div style="display:flex;flex-direction:column;gap:8px;margin-bottom:14px">
    <div style="background:#fff0f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">한국어는 배우기가 어렵지 않아요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">韩语学起来并不难。</div>
    </div>
    <div style="background:#eaf8f5;border-radius:12px;padding:10px 14px">
      <div style="font-size:16px;font-weight:800;color:#241917">이 음식은 먹기가 좀 힘들어요</div>
      <div style="font-size:16px;color:#89756e;margin-top:2px">这道菜吃起来有点难。</div>
    </div>
  </div>
  <div style="font-size:16px;color:#ff7fa8;font-weight:700">👆 这两句典型用法记住，本课基本就掌握了</div>
</div>
`,
    compareLabel: '-기(가) 쉽다/어렵다（难易）vs -을/ㄹ 수 있다/없다（能否）', compareLabelEn: '-기(가) 쉽다/어렵다 (difficulty) vs -을/ㄹ 수 있다/없다 (ability)',
    compareHtml: `
<div class="card-title">-기(가) 쉽다/어렵다 vs -을/ㄹ 수 있다/없다</div>
<div class="card-body">两个句型都评价一件事，但角度不同：<b>-기(가)</b> 说做起来<b>难还是易</b>，<b>-을/ㄹ 수 있다/없다</b> 说<b>能不能做</b>（能力/可能性）。</div>
<div class="compare-grid">
  <div class="cmp-block">
    <div class="cmp-title">-기(가) 쉽다/어렵다/힘들다</div>
    <div class="cmp-row"><span class="badge">评价</span><span class="zh">难易程度（把动词名词化后接形容词）</span></div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">动词词干+기(가) + 쉽다/어렵다/힘들다</span></div>
    <div class="cmp-row"><span class="ko">한국어는 배우기가 어렵지 않아요</span></div>
    <div class="cmp-row"><span class="zh">韩语学起来不难（评价难易）</span></div>
  </div>
  <div class="cmp-block">
    <div class="cmp-title">-을/ㄹ 수 있다/없다</div>
    <div class="cmp-row"><span class="badge">评价</span><span class="zh">能力或可能性（会不会、能不能）</span></div>
    <div class="cmp-row"><span class="badge">接续</span><span class="zh">有收音+을 / 无收音·ㄹ+ㄹ 수 있다/없다</span></div>
    <div class="cmp-row"><span class="ko">저는 수영을 할 수 있어요</span></div>
    <div class="cmp-row"><span class="zh">我会游泳（表能力，反义 못/수 없다）</span></div>
  </div>
</div>
<div class="reminder-box">一句话记：<b>-기가 어렵다/쉽다</b>=难或易；<b>-을 수 있다/없다</b>=能或不能。前者评难易，后者论能力。</div>
`,
    quickTable: {
      title: '-을/ㄹ 수 있다/없다 接续', titleEn: '-을/ㄹ 수 있다/없다 conjugation',
      headers: ['词干末音', '形式', '예시', '意思'],
      rows: [
        [{ ko: '有收音', zh: '' }, { ko: '-을 수 있다', zh: '' }, { ko: '먹을 수 있어요', zh: '' }, { ko: '能吃', zh: '' }],
        [{ ko: '无收音/ㄹ', zh: '' }, { ko: '-ㄹ 수 있다', zh: '' }, { ko: '갈 수 있어요', zh: '' }, { ko: '能去', zh: '' }],
        [{ ko: '有收音', zh: '' }, { ko: '-을 수 없다', zh: '' }, { ko: '읽을 수 없어요', zh: '' }, { ko: '不能读', zh: '' }],
        [{ ko: '无收音/ㄹ', zh: '' }, { ko: '-ㄹ 수 없다', zh: '' }, { ko: '볼 수 없어요', zh: '' }, { ko: '不能看', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: "-기(가) + 形容词, -을/ㄹ 수 있다/없다", titleEn: '-기(가) + adjective, -을/ㄹ 수 있다/없다',
      body: "测试对两个语法点的掌握", bodyEn: 'Tests mastery of two grammar points',
      questions: [
        {
          prompt: '这道菜吃起来很费劲。→ 이 음식은 먹기가 ___', promptEn: 'This dish is hard to eat. → 이 음식은 먹기가 ___',
          options: ['매운 편이에요', '맵자마자요', '힘들어요', '매울 수 있어요'],
          answer: 2 as 0|1|2|3,
          explanation: "-기(가) 接 쉽다/어렵다/힘들다 这类难易形容词，매워요 不能接 -기가", explanationEn: '-기(가) attaches to difficulty adjectives like 쉽다/어렵다/힘들다; 매워요 can\'t take -기가.',
        },
        {
          prompt: '我会游泳。→ 저는 수영을 ___', promptEn: 'I can swim. → 저는 수영을 ___',
          options: ['하기 있어요', '할 수 있어요', '할 수 있는 편이에요', '하기가 있어요'],
          answer: 1 as 0|1|2|3,
          explanation: "수영하다 → 수영을 할 수 있다",
        },
        {
          prompt: '今天没办法来。→ 오늘은 올 ___', promptEn: 'I can\'t come today. → 오늘은 올 ___',
          options: ['기 없어요', '수 아니에요', '기 못해요', '수 없어요'],
          answer: 3 as 0|1|2|3,
          explanation: "-을/ㄹ 수 없다 = 不能", explanationEn: '-을/ㄹ 수 없다 = cannot',
        },
        {
          prompt: '-기(가) + 形容词 中，가 的作用是？', promptEn: 'In -기(가) + adjective, what is the role of 가?',
          options: ['主格助词，可省略', '宾格助词，必须保留', '方向助词', '话题助词'],
          answer: 0 as 0|1|2|3,
          explanation: "-기(가) 中 가 是主格助词，可省略", explanationEn: 'In -기(가), 가 is a subject particle and can be omitted.',
        },
      ],
    },
    linkedGrammarIds: ['g13', 'g67'],
  },

  {
    id: 'card-p9-l11',
    partNumber: 9,
    lessonNumber: 11,
    title: '综合练习⑨', titleEn: 'Comprehensive Practice ⑨',
    isPractice: true,
    whatItDoes: 'P9 全部语法点综合复习', whatItDoesEn: 'P9 comprehensive review of all grammar points',
    whatItDoesBody: '本课汇总 P9（第1–10课）所有语法点，通过情景对话和替换练习巩固掌握。', whatItDoesBodyEn: 'This lesson summarizes all grammar points from P9 (Lessons 1–10), reinforcing mastery through situational dialogues and substitution drills.',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    specialQuiz: {
      type: 'fill',
      title: '综合练习⑨', titleEn: 'Comprehensive Practice ⑨',
      body: '完成 P9 所有课程后，用以下题目检验掌握程度。', bodyEn: 'After completing all P9 lessons, use the following questions to test your understanding.',
      questions: [
        { prompt: '用 -겠- 表示推测：朋友看起来很累', promptEn: 'Use -겠- to express a guess: the friend looks tired.', options: ['피곤할 것 같아요', '피곤하겠어요', '피곤했어요', '피곤해요'], answer: 1, explanation: '-겠- 第二三人称表推测：피곤하다 + 겠 + 어요', explanationEn: '-겠- for second/third person speculation: 피곤하다 + 겠 + 어요' },
        { prompt: '好像要下雨了，用 -을 것 같다', promptEn: 'It seems like it\'s going to rain; use -을 것 같다.', options: ['비가 오겠어요', '비가 왔어요', '비가 올 것 같아요', '비가 올게요'], answer: 2, explanation: '将来推测用 -을 것 같다：오다 → 올 것 같아요', explanationEn: 'Future speculation uses -을 것 같다: 오다 → 올 것 같아요' },
        { prompt: '哇，好漂亮啊！用 -네요', promptEn: 'Wow, it\'s so pretty! Use -네요.', options: ['예쁘겠어요', '예쁠 것 같아요', '예뻤어요', '예쁘네요'], answer: 3, explanation: '-네요 表示当下新发现的感叹：예쁘다 + 네요', explanationEn: '-네요 expresses a sudden realization or exclamation: 예쁘다 + 네요' },
        { prompt: '学了三年韩语，用 -동안', promptEn: 'I\'ve studied Korean for three years; use -동안.', options: ['3년 동안 한국어를 배웠어요', '3년 마다 한국어를 배웠어요', '3년 때마다 배웠어요', '3년 후에 배웠어요'], answer: 0, explanation: '持续时间段用 N + 동안', explanationEn: 'Use N + 동안 for duration' },
        { prompt: '谦虚否认"你韩语真好"，用 -기는요', promptEn: 'Humbly deny "your Korean is great" with -기는요', options: ['잘하기는 해요', '잘하기는요', '잘했기는요', '잘할 것 같아요'], answer: 1, explanation: '-기는요 接在动词词干后，表示谦虚否认', explanationEn: '-기는요 attaches to a verb stem to humbly deny a compliment' },
        { prompt: '天气变凉了，用 -아/어지다', promptEn: 'The weather got cooler, use -아/어지다', options: ['시원하게 됐어요', '시원했어요', '시원해요', '시원해졌어요'], answer: 3, explanation: '시원하다 + 아지다 → 시원해졌어요（状态变化）', explanationEn: '시원하다 + 아지다 → 시원해졌어요 (state change)' },
        { prompt: '我算是吃得少，用 -는 편이다', promptEn: 'I eat on the lighter side, use -는 편이다', options: ['적게 먹기는 해요', '적게 먹는 편이에요', '적게 먹겠어요', '적게 먹을 것 같아요'], answer: 1, explanation: '动词 + 는 편이다 表示"算是/偏向于"', explanationEn: 'Verb + 는 편이다 means "tends to / rather"' },
        { prompt: '一到家就洗澡了，用 -자마자', promptEn: 'I showered as soon as I got home, use -자마자', options: ['집에 오면서 샤워했어요', '집에 온 후에 샤워했어요', '집에 오자마자 샤워했어요', '집에 오고 나서 샤워했어요'], answer: 2, explanation: '-자마자 表示前一动作结束立刻进行后一动作', explanationEn: '-자마자 means the second action happens right after the first ends' },
        { prompt: '多亏朋友找到了工作，用 덕분에', promptEn: 'Thanks to a friend, I found a job, use 덕분에', options: ['친구 때문에 취직했어요', '친구가 있어서 취직했어요', '친구한테서 취직했어요', '친구 덕분에 취직했어요'], answer: 3, explanation: 'N + 덕분에 表示正面受益因果', explanationEn: 'N + 덕분에 expresses positive cause-and-effect' },
        { prompt: '你知道几点开始吗？用 -는지 알다', promptEn: 'Do you know what time it starts? Use -는지 알다', options: ['몇 시에 시작하는지 알아요', '몇 시에 시작하지 알아요', '몇 시에 시작할지 알아요', '몇 시 시작하는지 알아요'], answer: 0, explanation: '动词 + 는지 알다，疑问词 몇 시에 放前面', explanationEn: 'Verb + 는지 알다, with question word 몇 시에 placed before' },
        { prompt: '我会弹吉他，用 -을 수 있다', promptEn: 'I can play guitar, use -을 수 있다', options: ['기타를 치기가 있어요', '기타를 칠 수 있을게요', '기타를 칠 수 있어요', '기타를 칠 수 있겠어요'], answer: 2, explanation: '치다 → 칠 수 있어요（无收音 + ㄹ 수 있다）', explanationEn: '치다 → 칠 수 있어요 (no batchim + ㄹ 수 있다)' },
      ],
    },
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P9 · 综合练习</div>
    <div class="ov-hero-title">综合练习⑨</div>
    <div class="ov-hero-sub">不定阶及中级口语表达·上 全部语法点回顾</div>
  </div>
  <div class="ov-section">
    <div class="ov-section-hd"><div class="ov-section-line" style="background:#ff7fa8"></div><div class="ov-section-title">P9 语法清单</div></div>
    <div class="ov-block"><div class="badge">第1课</div><div class="ko">-겠-, -는/을 것 같다</div><div class="zh">推测与意向</div></div>
    <div class="ov-block"><div class="badge">第2课</div><div class="ko">-네요, -군요, -구나</div><div class="zh">感叹与发现</div></div>
    <div class="ov-block"><div class="badge">第3课</div><div class="ko">-는/은/ㄴ/을/ㄹ 것 같다</div><div class="zh">各时态推测</div></div>
    <div class="ov-block"><div class="badge">第4课</div><div class="ko">-동안, 마다, -을/ㄹ 때마다</div><div class="zh">持续期间与频率</div></div>
    <div class="ov-block"><div class="badge">第5课</div><div class="ko">-기는요, -기는 하다</div><div class="zh">谦虚否认与转折认可</div></div>
    <div class="ov-block"><div class="badge">第6课</div><div class="ko">-아/어/여지다, -게 되다</div><div class="zh">状态变化与结果转变</div></div>
    <div class="ov-block"><div class="badge">第7课</div><div class="ko">-는/은/ㄴ 편이다, 얼마나 -는/은/ㄴ 지</div><div class="zh">倾向描述与程度感叹</div></div>
    <div class="ov-block"><div class="badge">第8课</div><div class="ko">-자마자, -기 시작하다</div><div class="zh">紧接发生与开始</div></div>
    <div class="ov-block"><div class="badge">第9课</div><div class="ko">-은/ㄴ 덕분에, -는/은/ㄴ 지 알다/모르다</div><div class="zh">感谢因果与知道与否</div></div>
    <div class="ov-block"><div class="badge">第10课</div><div class="ko">-기(가), -을/ㄹ 수 있다/없다</div><div class="zh">难易度与能力可能性</div></div>
  </div>
</div>`,
    linkedGrammarIds: [],
  },
];
