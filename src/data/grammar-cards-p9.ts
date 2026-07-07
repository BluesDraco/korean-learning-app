import type { GrammarCard } from '@/types';

export const grammarCardsP9: GrammarCard[] = [
  {
    id: 'card-p9-l01',
    partNumber: 9,
    lessonNumber: 1,
    title: '不定阶(1)：-겠-, -는/을 것 같다',
    whatItDoes: '表示推测和意向的两种核心句型',
    whatItDoesBody: '-겠- 有两种用法：表示说话人的意向（我要做…）或推测（看样子…）。\n-는/을 것 같다 是"感觉/好像"，比 -겠- 更柔和，常用于不确定的推测。\n两者都是中级必备，韩剧台词和日常对话里出现频率极高。',
    structureNote: '-겠- 插入动词词干和语尾之间。\n-는/을 것 같다 接在动词/形容词的冠词形后面。',
    rulesNote: '-겠- 第一人称=意向，第二三人称=推测。\n-는/을 것 같다 永远是推测，不分人称。',
    structures: [
      {
        ko: '내년에 합격하겠습니다',
        zh: '我明年一定会考上的。',
        tokens: [
          { text: '내년에', role: 'time' },
          { text: '합격하겠습니다', role: 'verb' },
        ],
      },
      {
        ko: '피곤하겠어요',
        zh: '你一定很累吧。',
        tokens: [
          { text: '피곤하겠어요', role: 'verb' },
        ],
      },
      {
        ko: '비가 올 것 같아요',
        zh: '好像要下雨了。',
        tokens: [
          { text: '비가', role: 'subject' },
          { text: '올 것 같아요', role: 'verb' },
        ],
      },
      {
        ko: '그 사람이 화가 난 것 같아요',
        zh: '那个人好像生气了。',
        tokens: [
          { text: '그 사람이', role: 'subject' },
          { text: '화가 난 것 같아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-겠- 变形：动词/形容词词干 + 겠 + 어요/습니다', examples: '가다→가겠어요 / 먹다→먹겠습니다 / 피곤하다→피곤하겠어요' },
      { type: 'rule', text: '-는 것 같다（现在）：动词词干 + 는 것 같다', examples: '가다→가는 것 같다 / 먹다→먹는 것 같다' },
      { type: 'rule', text: '-은/ㄴ 것 같다（过去/形容词）：有收音+은, 无收音+ㄴ', examples: '작다→작은 것 같다 / 크다→큰 것 같다 / 갔다→간 것 같다' },
      { type: 'rule', text: '-을/ㄹ 것 같다（将来）：有收音+을, 无收音+ㄹ', examples: '먹다→먹을 것 같다 / 가다→갈 것 같다' },
      { type: 'usage', text: '-겠- 第一人称=意向', examples: '제가 하겠습니다（我来做）/ 내일 일찍 오겠습니다（我明天早点来）' },
      { type: 'usage', text: '-겠- 第二三人称=推测', examples: '힘들겠어요（你一定很辛苦吧）/ 맛있겠다（看起来很好吃）' },
      { type: 'compare', text: '-겠- vs -는/을 것 같다', examples: '비가 오겠어요（推测，语气较肯定）vs 비가 올 것 같아요（推测，语气更柔和/不确定）' },
      { type: 'example', text: '알겠어요（我明白了）/ 모르겠어요（我不知道）— 日常超高频' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '내일', role: 'time' },
          { text: '비가', role: 'subject' },
          { text: '올 것 같아요', role: 'verb' },
        ],
        zh: '明天好像会下雨。',
        swapWords: ['올 것 같아요', '안 올 것 같아요', '많이 올 것 같아요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저도', role: 'subject' },
          { text: '같이', role: 'plain' },
          { text: '가겠어요', role: 'verb' },
        ],
        zh: '我也一起去。',
        swapWords: ['가겠어요', '도와드리겠어요', '연락하겠어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그 드라마가', role: 'subject' },
          { text: '재미있을 것 같아요', role: 'verb' },
        ],
        zh: '那部剧好像很有意思。',
        swapWords: ['재미있을 것 같아요', '재미없을 것 같아요', '인기 있을 것 같아요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🌧️', context: '天气推测', ko: '오늘 비가 올 것 같아요. 우산 가져가세요.', zh: '今天好像会下雨，带把伞吧。' },
      { icon: '💼', context: '职场表态', ko: '제가 먼저 확인해 보겠습니다.', zh: '我先去确认一下。' },
      { icon: '🎵', context: 'KPOP 追星', ko: '이번 앨범도 대박날 것 같아요!', zh: '这次专辑好像也会大卖！' },
      { icon: '😴', context: '关心朋友', ko: '많이 피곤하겠어요. 푹 쉬세요.', zh: '你一定很累了，好好休息吧。' },
      { icon: '🍽️', context: '餐厅点餐', ko: '저는 비빔밥으로 하겠습니다.', zh: '我要拌饭。' },
      { icon: '📱', context: '日常对话', ko: '모르겠어요. 나중에 알아볼게요.', zh: '我不太清楚，之后再查查吧。' },
    ],
    mistakes: [
      { wrong: '저는 피곤하겠어요', correct: '저는 피곤해요', note: '-겠- 第一人称推测自己的状态听起来很奇怪，自己的感受直接用 -아/어/여요。' },
      { wrong: '비가 오는 것 같겠어요', correct: '비가 올 것 같아요', note: '-는 것 같다 和 -겠- 不叠用，选一个表达推测即可。' },
      { wrong: '내일 갈 것 같습니다（正式场合表意向）', correct: '내일 가겠습니다', note: '正式场合表意向用 -겠습니다，-것 같다 是推测，不适合用于正式承诺。' },
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
    compareLabel: '-겠-（肯定/意向）vs -는/을 것 같다（柔和推测）',
    quickTable: {
      title: '-겠- vs -것 같다 接续速查',
      headers: ['语法', '接续', '语气', '例子'],
      rows: [
        [{ ko: '-겠-', zh: '意向/肯定推测' }, { ko: '词干 + 겠 + 어요', zh: '直接接词干' }, { ko: '较肯定', zh: '有把握' }, { ko: '가겠어요 / 피곤하겠어요', zh: '我去/你一定很累' }],
        [{ ko: '-는 것 같다', zh: '现在推测（动词）' }, { ko: '词干 + 는 것 같다', zh: '动词现在时' }, { ko: '柔和', zh: '不确定' }, { ko: '가는 것 같아요', zh: '好像在去' }],
        [{ ko: '-을/ㄹ 것 같다', zh: '将来推测' }, { ko: '有收音+을/无收音+ㄹ', zh: '将来冠词形' }, { ko: '柔和', zh: '不确定' }, { ko: '올 것 같아요', zh: '好像会来' }],
        [{ ko: '-은/ㄴ 것 같다', zh: '过去/形容词推测' }, { ko: '有收音+은/无收音+ㄴ', zh: '过去冠词形' }, { ko: '柔和', zh: '不确定' }, { ko: '간 것 같아요', zh: '好像去了' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-겠- 还是 -것 같다？',
      body: '根据语境选择正确的推测/意向表达。',
      questions: [
        { pre: '제가 먼저', post: '。（我先去确认——意向）', options: ['확인했겠어요', '확인할 것 같아요', '확인하겠습니다', '확인하는 것 같아요'], answer: 2, explanation: '正式场合表意向用 -겠습니다，不用 -것 같다' },
        { pre: '오늘 날씨가', post: '。（感觉天气好像很冷——柔和推测）', options: ['춥겠어요', '춥는 것 같아요', '추울겠어요', '추운 것 같아요'], answer: 3, explanation: '柔和推测用 -것 같다，形容词接 -은/ㄴ 것 같다 → 추운 것 같아요' },
        { pre: '', post: '（我明白了——日常表达）', options: ['아는 것 같아요', '알겠어요', '아는 것 같겠어요', '알 것 같아요'], answer: 1, explanation: '알겠어요 是固定表达"我明白了"，用 -겠-' },
        { pre: '그 영화가', post: '。（那部电影好像很有意思——推测）', options: ['재미있을 것 같아요', '재미있는 것 같겠어요', '재미있었겠어요', '재미있겠어요'], answer: 0, explanation: '对将来事物的柔和推测用 -을 것 같다 → 재미있을 것 같아요' },
      ],
    },
    linkedGrammarIds: ['g51', 'g69'],
  },
  {
    id: 'card-p9-l02',
    partNumber: 9,
    lessonNumber: 2,
    title: '不定阶(2)：-네요, -군요, -구나',
    whatItDoes: '表示"哦，原来如此"的感叹语气',
    whatItDoesBody: '这三个语尾都表示说话人对眼前情况的新发现或感叹。\n-네요：礼貌感叹，对话中最常用。\n-군요：稍正式，书面和对话均可。\n-구나：非正式，自言自语或对晚辈说话时用。',
    structureNote: '三者都接在动词/形容词词干后，规则相同。\n过去时：词干 + 았/었/였 + 네요/군요/구나。',
    rulesNote: '-네요 最安全，任何场合都能用。\n-구나 只对平辈或晚辈，对长辈用会显得失礼。',
    structures: [
      {
        ko: '한국어를 정말 잘하시네요',
        zh: '您韩语说得真好啊！',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '정말 잘하시네요', role: 'verb' },
        ],
      },
      {
        ko: '오늘 날씨가 좋군요',
        zh: '今天天气真好啊。',
        tokens: [
          { text: '오늘', role: 'time' },
          { text: '날씨가', role: 'subject' },
          { text: '좋군요', role: 'verb' },
        ],
      },
      {
        ko: '벌써 졸업했구나',
        zh: '你已经毕业了啊。',
        tokens: [
          { text: '벌써', role: 'time' },
          { text: '졸업했구나', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-네요 变形：动词/形容词词干 + 네요', examples: '가다→가네요 / 예쁘다→예쁘네요 / 학생이다→학생이네요' },
      { type: 'rule', text: '-군요 变形：动词词干 + 는군요 / 形容词词干 + 군요', examples: '먹다→먹는군요 / 크다→크군요 / 갔다→갔군요' },
      { type: 'rule', text: '-구나 变形：动词词干 + 는구나 / 形容词词干 + 구나', examples: '먹다→먹는구나 / 예쁘다→예쁘구나' },
      { type: 'rule', text: '过去时：词干 + 았/었/였 + 네요/군요/구나', examples: '갔네요 / 먹었군요 / 공부했구나' },
      { type: 'usage', text: '用于新发现：刚刚知道或看到某件事时的自然反应', examples: '아, 여기 있었네요!（啊，原来在这里！）/ 오늘 쉬는군요（今天休息啊）' },
      { type: 'note', text: '-구나 礼貌级别最低，只用于自言自语或对平辈/晚辈', examples: '혼자말：아, 이렇게 하는구나（哦，原来是这样做的）' },
      { type: 'compare', text: '-네요 vs -군요：内容一样，-군요 稍更书面', examples: '맛있네요 ≈ 맛있군요，日常对话首选 -네요' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '음식이', role: 'subject' },
          { text: '정말 맛있네요', role: 'verb' },
        ],
        zh: '食物真的很好吃啊！',
        swapWords: ['맛있네요', '맵네요', '달콤하네요', '신기하네요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '벌써', role: 'time' },
          { text: '10시가', role: 'subject' },
          { text: '됐군요', role: 'verb' },
        ],
        zh: '已经10点了啊。',
        swapWords: ['됐군요', '넘었군요', '지났군요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '여기', role: 'place' },
          { text: '카페가', role: 'subject' },
          { text: '생겼네요', role: 'verb' },
        ],
        zh: '这里开了家咖啡店啊。',
        swapWords: ['생겼네요', '없어졌네요', '바뀌었네요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🌸', context: '赞美对方', ko: '한국어를 정말 잘하시네요! 어디서 배우셨어요?', zh: '您韩语说得真好！在哪里学的？' },
      { icon: '🎵', context: 'KPOP 新歌', ko: '이 노래 정말 좋네요. 계속 듣고 싶어요.', zh: '这首歌真好听，想一直听。' },
      { icon: '😮', context: '惊喜发现', ko: '아, 여기가 그 유명한 곳이군요!', zh: '啊，原来这里就是那个有名的地方！' },
      { icon: '📚', context: '自学感悟', ko: '이렇게 공부하면 되는구나. 이제 알겠어.', zh: '原来这样学就行啊，现在明白了。' },
      { icon: '☕', context: '咖啡厅', ko: '오늘 사람이 많네요. 기다려야 할 것 같아요.', zh: '今天人好多啊，看来要等一下了。' },
      { icon: '✈️', context: '旅行韩国', ko: '서울이 생각보다 크군요!', zh: '首尔比想象中大啊！' },
    ],
    mistakes: [
      { wrong: '맛있는구나（形容词）', correct: '맛있구나', note: '形容词 + -구나 直接接词干，不需要加 -는。只有动词才用 -는구나。' },
      { wrong: '선생님께 "그렇구나"', correct: '그렇군요 / 그렇네요', note: '-구나 对长辈用是失礼的，必须换成 -군요 或 -네요。' },
      { wrong: '오늘 날씨가 좋는네요', correct: '오늘 날씨가 좋네요', note: '形容词接 -네요 直接接词干，不加 -는。' },
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
    compareLabel: '-네요（万能）vs -군요（正式）vs -구나（非正式）',
    quickTable: {
      title: '三种感叹语尾接续速查',
      headers: ['语尾', '动词现在', '形容词', '过去时', '适用场合'],
      rows: [
        [{ ko: '-네요', zh: '礼貌' }, { ko: '词干 + 네요', zh: '가네요' }, { ko: '词干 + 네요', zh: '좋네요' }, { ko: '았/었 + 네요', zh: '갔네요' }, { ko: '任何场合', zh: '最安全' }],
        [{ ko: '-군요', zh: '稍正式' }, { ko: '词干 + 는군요', zh: '가는군요' }, { ko: '词干 + 군요', zh: '좋군요' }, { ko: '았/었 + 군요', zh: '갔군요' }, { ko: '对话/书面', zh: '' }],
        [{ ko: '-구나', zh: '非正式' }, { ko: '词干 + 는구나', zh: '가는구나' }, { ko: '词干 + 구나', zh: '좋구나' }, { ko: '았/었 + 구나', zh: '갔구나' }, { ko: '自言自语/晚辈', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选择正确的感叹语尾',
      body: '根据场合和词性选择合适的语尾形式。',
      questions: [
        { pre: '对上司说：서울이 정말 크', post: '（首尔真大啊）', options: ['구나', '는구나', '구나요', '네요'], answer: 3, explanation: '对上司用礼貌语尾 -네요。구나요 是错误形式（구나 + 요 不能组合），-구나 对长辈失礼。' },
        { pre: '自言自语：아, 이게 정답이', post: '（哦，原来这是答案）', options: ['네요', '구나', '군요', '는구나'], answer: 1, explanation: '形容词/이다 + -구나，自言自语用非正式 -구나' },
        { pre: '形容词 맛있다 + -군요 →', post: '', options: ['맛있군요', '맛있는군요', '맛있었는군요', '맛있겠군요'], answer: 0, explanation: '形容词直接接 -군요，不加 -는' },
        { pre: '动词 먹다 + -는구나 →', post: '', options: ['먹는는구나', '먹구나', '먹는구나', '먹었는구나'], answer: 2, explanation: '动词现在 + -는구나 → 먹는구나' },
      ],
    },
    linkedGrammarIds: ['g16', 'g17'],
  },
  {
    id: 'card-p9-l03',
    partNumber: 9,
    lessonNumber: 3,
    title: '-는/은/ㄴ/을/ㄹ 것 같다',
    whatItDoes: '说"感觉/好像"，表达柔和的推测',
    whatItDoesBody: '-는/을 것 같다 是韩语表达推测最自然的方式，比直接断言更礼貌。\n时态通过冠词形变化体现：现在(-는/-은/ㄴ)、过去(-은/ㄴ)、将来(-을/ㄹ)。\n日常对话、韩剧、综艺里出现频率极高，必须熟练掌握。',
    structureNote: '变形规则取决于词性和时态。\n动词现在时 + 는 것 같다 / 形容词 + 은/ㄴ 것 같다 / 将来 + 을/ㄹ 것 같다。',
    rulesNote: '形容词现在时直接接 -은/ㄴ（不用 -는）。\n过去式：动词过去冠词形 -은/ㄴ 것 같다（간 것 같다）或 -았/었을 것 같다（갔을 것 같다），两种都自然。',
    structures: [
      {
        ko: '저 사람이 배우인 것 같아요',
        zh: '那个人好像是演员。',
        tokens: [
          { text: '저 사람이', role: 'subject' },
          { text: '배우인 것 같아요', role: 'verb' },
        ],
      },
      {
        ko: '날씨가 추운 것 같아요',
        zh: '天气好像很冷。',
        tokens: [
          { text: '날씨가', role: 'subject' },
          { text: '추운 것 같아요', role: 'verb' },
        ],
      },
      {
        ko: '그 영화가 재미있는 것 같아요',
        zh: '那部电影好像很有趣。',
        tokens: [
          { text: '그 영화가', role: 'subject' },
          { text: '재미있는 것 같아요', role: 'verb' },
        ],
      },
      {
        ko: '내일 눈이 올 것 같아요',
        zh: '明天好像会下雪。',
        tokens: [
          { text: '내일', role: 'time' },
          { text: '눈이', role: 'subject' },
          { text: '올 것 같아요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词 现在：词干 + 는 것 같다', examples: '먹다→먹는 것 같다 / 자다→자는 것 같다' },
      { type: 'rule', text: '形容词 现在：有收音+은/无收音+ㄴ 것 같다', examples: '작다→작은 것 같다 / 크다→큰 것 같다 / 예쁘다→예쁜 것 같다' },
      { type: 'rule', text: '名词+이다：名词+인 것 같다', examples: '학생이다→학생인 것 같다 / 배우이다→배우인 것 같다' },
      { type: 'rule', text: '过去推测：动词过去冠词形 -은/ㄴ 것 같다 / 또는 -았/었을 것 같다', examples: '간 것 같다 / 먹은 것 같다 / 갔을 것 같다 / 먹었을 것 같다' },
      { type: 'rule', text: '将来：有收音+을/无收音+ㄹ 것 같다', examples: '먹다→먹을 것 같다 / 가다→갈 것 같다 / 오다→올 것 같다' },
      { type: 'usage', text: '比直接断言更礼貌，适合表达不确定或谦虚的推测', examples: '비가 와요（确定）vs 비가 오는 것 같아요（感觉好像下雨了）' },
      { type: 'note', text: '口语中常缩略为 -는/은 것 같아 或 -ㄹ 것 같아', examples: '좀 어려운 것 같아（感觉有点难）/ 늦을 것 같아（好像要迟到了）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '오늘', role: 'time' },
          { text: '길이', role: 'subject' },
          { text: '막히는 것 같아요', role: 'verb' },
        ],
        zh: '今天好像堵车。',
        swapWords: ['막히는 것 같아요', '안 막히는 것 같아요', '좀 막히는 것 같아요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 옷이', role: 'subject' },
          { text: '저한테', role: 'plain' },
          { text: '어울리는 것 같아요', role: 'verb' },
        ],
        zh: '这件衣服好像挺适合我的。',
        swapWords: ['어울리는 것 같아요', '안 어울리는 것 같아요', '좀 큰 것 같아요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그 가수가', role: 'subject' },
          { text: '정말 인기 있는 것 같아요', role: 'verb' },
        ],
        zh: '那位歌手好像真的很受欢迎。',
        swapWords: ['인기 있는 것 같아요', '유명한 것 같아요', '실력이 좋은 것 같아요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🎬', context: '韩剧推测', ko: '주인공이 그 사람을 좋아하는 것 같아요.', zh: '主角好像喜欢那个人。' },
      { icon: '🌨️', context: '天气', ko: '오늘 많이 추운 것 같아요. 두껍게 입으세요.', zh: '今天好像挺冷的，多穿一点。' },
      { icon: '🍜', context: '餐厅', ko: '여기 음식이 맛있는 것 같아요. 사람이 많네요.', zh: '这里的食物好像很好吃，人很多啊。' },
      { icon: '✈️', context: '旅行', ko: '길을 잃은 것 같아요. 지도 볼게요.', zh: '好像迷路了，我看一下地图。' },
      { icon: '📱', context: '日常', ko: '배터리가 없는 것 같아요. 충전기 있어요?', zh: '好像没电了，有充电器吗？' },
      { icon: '🎵', context: 'KPOP', ko: '이 그룹이 곧 컴백할 것 같아요!', zh: '这个组合好像快要回归了！' },
    ],
    mistakes: [
      { wrong: '날씨가 춥는 것 같아요（形容词）', correct: '날씨가 추운 것 같아요', note: '形容词用 -은/ㄴ 것 같다，不加 -는。只有动词现在时才用 -는 것 같다。' },
      { wrong: '학생것 같다', correct: '학생인 것 같다', note: '名词后必须加 -인 것 같다，不能省略 -인。' },
      { wrong: '내일 비가 오는 것 같아요（将来）', correct: '내일 비가 올 것 같아요', note: '将来推测用 -을/ㄹ 것 같다，-는 것 같다 表示现在正在发生。' },
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
    compareLabel: '-것 같다 时态：现在/形容词/过去/将来 四种冠词形',
    quickTable: {
      title: '-것 같다 接续速查',
      headers: ['词性/时态', '接续规则', '예시'],
      rows: [
        [{ ko: '동사 현재', zh: '进行/现在' }, { ko: '词干 + 는 것 같다', zh: '' }, { ko: '자는 것 같다 / 먹는 것 같다', zh: '好像在睡/吃' }],
        [{ ko: '형용사', zh: '现在状态' }, { ko: '有收音+은/无收音+ㄴ 것 같다', zh: '' }, { ko: '추운 것 같다 / 바쁜 것 같다', zh: '好像很冷/忙' }],
        [{ ko: '명사+이다', zh: '' }, { ko: '명사 + 인 것 같다', zh: '' }, { ko: '학생인 것 같다', zh: '好像是学生' }],
        [{ ko: '과거', zh: '过去推测' }, { ko: '词干+은/ㄴ 것 같다 / -았/었을 것 같다', zh: '' }, { ko: '간 것 같다 / 갔을 것 같다', zh: '好像去了' }],
        [{ ko: '미래', zh: '将来推测' }, { ko: '有收音+을/无收音+ㄹ 것 같다', zh: '' }, { ko: '올 것 같다 / 먹을 것 같다', zh: '好像会来/吃' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选出正确的 -것 같다 形式',
      body: '根据词性和时态选择正确的接续形式。',
      questions: [
        { pre: '形容词 춥다 →', post: '（好像很冷）', options: ['춥은 것 같아요', '춥는 것 같아요', '추운 것 같아요', '출 것 같아요'], answer: 2, explanation: '形容词无收音+ㄴ 것 같다，춥다 ㅂ불규칙 → 추운 것 같아요' },
        { pre: '动词 가다 现在 →', post: '（好像在去）', options: ['갈 것 같아요', '가는 것 같아요', '간 것 같아요', '가은 것 같아요'], answer: 1, explanation: '动词 现在 + 는 것 같다 → 가는 것 같아요' },
        { pre: '动词 먹다 将来 →', post: '（好像要吃）', options: ['먹을 것 같아요', '먹은 것 같아요', '먹는 것 같아요', '먹인 것 같아요'], answer: 0, explanation: '将来는 有收音+을 것 같다 → 먹을 것 같아요' },
        { pre: '名词 학생이다 →', post: '（好像是学生）', options: ['학생은 것 같아요', '학생이는 것 같아요', '학생는 것 같아요', '학생인 것 같아요'], answer: 3, explanation: '名词+이다 → 名词+인 것 같다 → 학생인 것 같아요' },
      ],
    },
    linkedGrammarIds: ['g69'],
  },
  {
    id: 'card-p9-l04',
    partNumber: 9,
    lessonNumber: 4,
    title: '-동안, 마다, -을/ㄹ 때마다',
    whatItDoes: '表示"持续时间"和"每次/每…"',
    whatItDoesBody: '-동안 表示某个动作或状态持续的时间段，相当于"在……期间/……的时间里"。\n마다 接在名词后表示"每……"，-을/ㄹ 때마다 接在动词后表示"每当……的时候"。\n这三个表达在描述日常规律和习惯时非常好用。',
    structureNote: '-동안：时间名词 + 동안 / 动词 + 는 동안\n마다：名词 + 마다\n-을/ㄹ 때마다：动词词干 + 을/ㄹ 때마다',
    rulesNote: '时间名词 + 동안：3시간 동안（3小时之间）/ 일 년 동안（一年之间）\n-는 동안：동작이 진행되는 동안（在……进行期间）\n마다 常与时间词搭配：매일（每天）/ 매주（每周）/ 주말마다（每个周末）',
    structures: [
      {
        ko: '3시간 동안 공부했어요',
        zh: '学习了3个小时。',
        tokens: [
          { text: '3시간 동안', role: 'time' },
          { text: '공부했어요', role: 'verb' },
        ],
      },
      {
        ko: '제가 자는 동안 전화가 왔어요',
        zh: '我睡觉的时候来电话了。',
        tokens: [
          { text: '제가', role: 'subject' },
          { text: '자는 동안', role: 'time' },
          { text: '전화가 왔어요', role: 'verb' },
        ],
      },
      {
        ko: '주말마다 운동해요',
        zh: '每个周末都运动。',
        tokens: [
          { text: '주말마다', role: 'time' },
          { text: '운동해요', role: 'verb' },
        ],
      },
      {
        ko: '이 노래를 들을 때마다 생각나요',
        zh: '每次听这首歌都会想起来。',
        tokens: [
          { text: '이 노래를', role: 'object' },
          { text: '들을 때마다', role: 'time' },
          { text: '생각나요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '시간 + 동안：某段时间持续', examples: '한 시간 동안（1小时之间）/ 방학 동안（假期里）/ 여행 동안（旅行期间）' },
      { type: 'rule', text: '动词 + 는 동안：动作进行期间', examples: '기다리는 동안（等待的期间）/ 밥 먹는 동안（吃饭的时候）' },
      { type: 'rule', text: '名词 + 마다：每……', examples: '날마다（每天）/ 시간마다（每小时）/ 사람마다（每个人）/ 계절마다（每个季节）' },
      { type: 'rule', text: '动词 + 을/ㄹ 때마다：每当做……的时候', examples: '볼 때마다（每次看）/ 만날 때마다（每次见面）/ 먹을 때마다（每次吃）' },
      { type: 'usage', text: '-는 동안 vs -을/ㄹ 때：동안 强调持续时间段，때 强调时间点', examples: '공부하는 동안（学习期间，强调时段）vs 공부할 때（学习的时候，强调时间点）' },
      { type: 'note', text: 'KPOP/韩剧常用：그리울 때마다（每当想念的时候）', examples: '보고 싶을 때마다 이 노래 들어요（每次想念就听这首歌）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '한국에 있는 동안', role: 'time' },
          { text: '매일', role: 'plain' },
          { text: '김치를', role: 'object' },
          { text: '먹었어요', role: 'verb' },
        ],
        zh: '在韩国期间每天都吃泡菜。',
        swapWords: ['김치를', '삼겹살을', '떡볶이를', '비빔밥을'],
        swapRole: 'object',
      },
      {
        wordBlocks: [
          { text: '이 곡을', role: 'object' },
          { text: '들을 때마다', role: 'time' },
          { text: '기분이 좋아져요', role: 'verb' },
        ],
        zh: '每次听这首歌心情就会变好。',
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
        zh: '每个周末都在咖啡店学韩语。',
        swapWords: ['공부해요', '책을 읽어요', '드라마를 봐요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '✈️', context: '旅行韩国', ko: '서울에 있는 동안 정말 많이 걸었어요.', zh: '在首尔期间走了好多路。' },
      { icon: '🎵', context: 'KPOP 听歌', ko: '이 노래를 들을 때마다 그 시절이 생각나요.', zh: '每次听这首歌都会想起那段时光。' },
      { icon: '📚', context: '学习习惯', ko: '저는 밥 먹는 동안 한국어 유튜브를 봐요.', zh: '我吃饭的时候看韩语YouTube。' },
      { icon: '🏃', context: '运动习惯', ko: '날마다 30분씩 운동하려고 해요.', zh: '打算每天运动30分钟。' },
      { icon: '😊', context: '日常感受', ko: '이 드라마를 볼 때마다 행복해요.', zh: '每次看这部剧都很幸福。' },
      { icon: '🌙', context: '晚上习惯', ko: '자기 전 30분 동안 단어를 외워요.', zh: '睡前30分钟背单词。' },
    ],
    mistakes: [
      { wrong: '3시간 동안에 공부했어요', correct: '3시간 동안 공부했어요', note: '-동안 后不加 -에，直接接谓语。' },
      { wrong: '매일마다', correct: '매일 / 날마다', note: '매일 本身已有"每天"意思，再加마다是重复。用 날마다 或 매일 选一个。' },
      { wrong: '볼 때마다에', correct: '볼 때마다', note: '-을/ㄹ 때마다 后不加 -에，直接接谓语。' },
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
    compareLabel: '-동안（持续期间）vs 마다（每个）vs -을/ㄹ 때마다（每次）',
    quickTable: {
      title: '时间表达接续速查',
      headers: ['语法', '接续', '意思', '例子'],
      rows: [
        [{ ko: '명사 + 동안', zh: '' }, { ko: '直接接名词', zh: '' }, { ko: '在……期间', zh: '' }, { ko: '방학 동안 / 3년 동안', zh: '假期期间/3年间' }],
        [{ ko: '-는 동안', zh: '' }, { ko: '동사词干 + 는 동안', zh: '' }, { ko: '在……的同时/期间', zh: '' }, { ko: '자는 동안 / 기다리는 동안', zh: '睡觉时/等待时' }],
        [{ ko: '명사 + 마다', zh: '' }, { ko: '直接接名词', zh: '' }, { ko: '每个……', zh: '' }, { ko: '날마다 / 주말마다', zh: '每天/每个周末' }],
        [{ ko: '-을/ㄹ 때마다', zh: '' }, { ko: '有收音+을/无收音+ㄹ 때마다', zh: '' }, { ko: '每次……的时候', zh: '' }, { ko: '볼 때마다 / 먹을 때마다', zh: '每次见/每次吃' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '选择正确的时间表达',
      body: '根据语境选出 -동안/마다/-을 때마다 的正确用法。',
      questions: [
        { pre: '매일（每天）→ 날', post: '운동해요', options: ['동안', '때마다', '는 동안', '마다'], answer: 3, explanation: '名词 + 마다 = 每个……，날마다 = 每天' },
        { pre: '한국에 있', post: '한국어를 배웠어요（在韩国期间学了韩语）', options: ['동안', '는 동안', '마다', '을 때마다'], answer: 1, explanation: '-는 동안 = 在……的期间（动词接续）' },
        { pre: '이 노래를 듣', post: '기억나요（每次听这首歌都会想起）', options: ['는 동안', '는 마다', '을 때마다', '마다'], answer: 2, explanation: '듣다 有收音ㄷ → 들을 때마다（ㄷ불규칙）' },
        { pre: '주말', post: '쉬어요（每个周末休息）', options: ['마다', '동안', '때마다', '는 동안'], answer: 0, explanation: '名词 + 마다 = 每个……，주말마다 = 每个周末' },
      ],
    },
    linkedGrammarIds: ['g44'],
  },
  {
    id: 'card-p9-l05',
    partNumber: 9,
    lessonNumber: 5,
    title: '-기는요, -기는 하다',
    whatItDoes: '表示"哪里/哪儿啊"和"倒是……但是"',
    whatItDoesBody: '-기는요 用于谦虚地否定对方的夸奖或说法，相当于"哪里哪里"或"哪有啊"。\n-기는 하다 表示承认某事是真的，但暗示有转折，相当于"倒是……，但是……"。\n两者都是地道口语表达，韩剧里经常出现。',
    structureNote: '-기는요：动词/形容词词干 + 기는요\n-기는 하다：动词/形容词词干 + 기는 하다（后面常接 -지만/-(으)ㄴ데）',
    rulesNote: '-기는요 语气谦虚，常用于被夸奖时回应。\n-기는 하다 后面的转折部分才是重点，前半句是让步。',
    structures: [
      {
        ko: '잘하기는요',
        zh: '哪里，还差得远呢。',
        tokens: [
          { text: '잘하기는요', role: 'verb' },
        ],
      },
      {
        ko: '예쁘기는요',
        zh: '漂亮什么啊，今天看起来很疲惫。',
        tokens: [
          { text: '예쁘기는요', role: 'verb' },
        ],
      },
      {
        ko: '먹기는 하는데 별로 맛없어요',
        zh: '倒是吃，但不太好吃。',
        tokens: [
          { text: '먹기는 하는데', role: 'verb' },
          { text: '별로 맛없어요', role: 'plain' },
        ],
      },
      {
        ko: '가기는 했는데 별로 재미없었어요',
        zh: '倒是去了，但不太有趣。',
        tokens: [
          { text: '가기는 했는데', role: 'verb' },
          { text: '별로 재미없었어요', role: 'plain' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-기는요 变形：动词/形容词词干 + 기는요', examples: '잘하다→잘하기는요 / 예쁘다→예쁘기는요 / 열심히 하다→열심히 하기는요' },
      { type: 'rule', text: '-기는 하다 现在时：词干 + 기는 해요', examples: '먹기는 해요（倒是吃）/ 알기는 알아요（倒是知道）' },
      { type: 'rule', text: '-기는 하다 过去时：词干 + 기는 했어요', examples: '가기는 했어요（倒是去了）/ 보기는 봤어요（倒是看了）' },
      { type: 'usage', text: '-기는요 用于谦虚回应夸奖', examples: 'A: 한국어 잘하시네요！B: 잘하기는요. 배운 지 얼마 안 됐어요.' },
      { type: 'usage', text: '-기는 하다 后面常接转折', examples: '알기는 하는데 설명하기 어려워요（知道是知道，但很难解释）' },
      { type: 'note', text: '强调形：-기는커녕（别说……了，连……都）', examples: '밥 먹기는커녕 물도 못 마셨어요（别说吃饭了，连水都没喝到）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '잘하기는요', role: 'verb' },
        ],
        zh: '哪里哪里。（回应夸奖）',
        swapWords: ['잘하기는요', '예쁘기는요', '친절하기는요', '열심히 하기는요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '운동하기는', role: 'verb' },
          { text: '하는데', role: 'plain' },
          { text: '매일은 못 해요', role: 'plain' },
        ],
        zh: '倒是运动，但不能每天做。',
        swapWords: ['하는데', '했는데', '하지만'],
        swapRole: 'plain',
      },
      {
        wordBlocks: [
          { text: '알기는', role: 'verb' },
          { text: '아는데', role: 'plain' },
          { text: '설명하기가 어려워요', role: 'verb' },
        ],
        zh: '倒是知道，但很难解释。',
        swapWords: ['알기는 아는데', '이해하기는 하는데', '배우기는 했는데'],
      },
    ],
    scenarios: [
      { icon: '😊', context: '被夸奖时', ko: 'A: 한국어 진짜 잘하세요! B: 잘하기는요. 아직 멀었어요.', zh: 'A：你韩语真的很好！B：哪里，还差得远呢。' },
      { icon: '🎵', context: 'KPOP 追星', ko: '그 가수 좋아하기는 하는데 요즘 노래는 별로예요.', zh: '倒是喜欢那个歌手，但最近的歌不太行。' },
      { icon: '🍽️', context: '吃东西', ko: '매운 거 먹기는 하는데 많이는 못 먹어요.', zh: '辣的倒是吃，但吃不了太多。' },
      { icon: '📚', context: '学习', ko: '공부하기는 했는데 시험이 너무 어려웠어요.', zh: '倒是学了，但考试太难了。' },
      { icon: '✈️', context: '旅行', ko: '서울에 가기는 했는데 시간이 없어서 많이 못 봤어요.', zh: '倒是去了首尔，但没时间所以没看多少。' },
    ],
    mistakes: [
      { wrong: '잘 하기는요（띄어쓰기）', correct: '잘하기는요', note: '잘하다 是一个词，不要拆开写。' },
      { wrong: '-기는요 后面再解释（冗长）', correct: '잘하기는요（单独使用即可）', note: '-기는요 本身就完整，可以单独说，不一定要接后续解释。' },
      { wrong: '먹기는 하지만 맛없기는요', correct: '먹기는 하지만 맛없어요', note: '-기는요 和 -기는 하다 不在同一句里叠用。' },
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
    compareLabel: '-기는요（谦虚否定）vs -기는 하다（承认+转折）',
    quickTable: {
      title: '-기는요 / -기는 하다 接续速查',
      headers: ['语法', '接续', '功能', '例子'],
      rows: [
        [{ ko: '-기는요', zh: '谦虚回应' }, { ko: '词干 + 기는요', zh: '' }, { ko: '否定夸奖/谦虚', zh: '' }, { ko: '잘하기는요 / 예쁘기는요', zh: '哪里哪里' }],
        [{ ko: '-기는 해요', zh: '现在承认' }, { ko: '词干 + 기는 해요', zh: '' }, { ko: '承认现在状态', zh: '' }, { ko: '알기는 해요（倒是知道）', zh: '' }],
        [{ ko: '-기는 했어요', zh: '过去承认' }, { ko: '词干 + 기는 했어요', zh: '' }, { ko: '承认过去动作', zh: '' }, { ko: '먹기는 했어요（倒是吃了）', zh: '' }],
        [{ ko: '-기는 하는데', zh: '转折' }, { ko: '词干 + 기는 하는데', zh: '' }, { ko: '承认+但是', zh: '' }, { ko: '알기는 하는데 어려워요', zh: '倒是知道但很难' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-기는요 还是 -기는 하다？',
      body: '根据语境选择正确的表达。',
      questions: [
        { pre: 'A: 노래를 정말 잘하세요! B:', post: '（哪里哪里，还不行）', options: ['잘하기는 해요', '잘하기는 하는데요', '잘하기는요', '잘하는데요'], answer: 2, explanation: '谦虚否定夸奖用 -기는요' },
        { pre: '영화를 보기는 ', post: '재미없었어요（倒是看了，但没意思）', options: ['했는데', '하는데', '기는요', '봤는데'], answer: 0, explanation: '-기는 했는데 = 倒是（过去）+转折，보기는 했는데' },
        { pre: '운동을 하기는 ', post: '자주는 못 해요（倒是做运动，但不常做）', options: ['해요', '하는데', '했는데', '했어요'], answer: 1, explanation: '-기는 하는데 = 倒是（现在习惯）+转折' },
        { pre: 'A: 요리 잘하시죠? B:', post: '（哪里，我不太会做）', options: ['잘하기는 해요', '잘하는데요', '못하기는요', '잘하기는요'], answer: 3, explanation: '-기는요 谦虚回应，否定对方的夸奖' },
      ],
    },
    linkedGrammarIds: ['g13'],
  },
  {
    id: 'card-p9-l06',
    partNumber: 9,
    lessonNumber: 6,
    title: '-아/어/여지다, -게 되다',
    whatItDoes: '表示状态变化和自然转变',
    whatItDoesBody: '-아/어/여지다 接在形容词后，表示逐渐变成某种状态，相当于"变得……"。\n-게 되다 接在动词后，表示某种结果自然而然地发生，相当于"就……了/变成……了"。\n两者都强调变化的过程，不是主动行为，而是自然发生的结果。',
    structureNote: '-아/어/여지다：形容词词干 + 아/어/여지다\n-게 되다：动词词干 + 게 되다',
    rulesNote: '-아/어/여지다 用于形容词，描述状态渐变。\n-게 되다 用于动词，描述动作结果的自然达成。',
    structures: [
      {
        ko: '한국어가 점점 어려워져요',
        zh: '韩语变得越来越难了。',
        tokens: [
          { text: '한국어가', role: 'subject' },
          { text: '점점', role: 'plain' },
          { text: '어려워져요', role: 'verb' },
        ],
      },
      {
        ko: '날씨가 따뜻해졌어요',
        zh: '天气变暖和了。',
        tokens: [
          { text: '날씨가', role: 'subject' },
          { text: '따뜻해졌어요', role: 'verb' },
        ],
      },
      {
        ko: '한국 드라마를 좋아하게 됐어요',
        zh: '渐渐喜欢上了韩剧。',
        tokens: [
          { text: '한국 드라마를', role: 'object' },
          { text: '좋아하게 됐어요', role: 'verb' },
        ],
      },
      {
        ko: '내년에 한국에 가게 됐어요',
        zh: '明年就要去韩国了。',
        tokens: [
          { text: '내년에', role: 'time' },
          { text: '한국에', role: 'place' },
          { text: '가게 됐어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-아/어/여지다 变形：形容词词干末尾元音 ㅏ/ㅗ+아지다, 其他+어지다, 하다→해지다', examples: '좋다→좋아지다 / 크다→커지다 / 따뜻하다→따뜻해지다 / 예쁘다→예뻐지다' },
      { type: 'rule', text: '-게 되다 变形：动词词干 + 게 되다（时态变化加在 되다 上）', examples: '알다→알게 됐어요 / 가다→가게 됐어요 / 좋아하다→좋아하게 됐어요' },
      { type: 'usage', text: '-아/어/여지다 强调状态的渐变过程', examples: '점점 건강해지고 있어요（越来越健康了）/ 날씨가 더워졌어요（天气变热了）' },
      { type: 'usage', text: '-게 되다 表示自然而然的结果，常含"非主动"或"机缘巧合"语气', examples: '한국어를 배우게 됐어요（就这样开始学韩语了）/ 이 회사에 다니게 됐어요（就进了这家公司）' },
      { type: 'compare', text: '-게 됐다 vs -았/었다：-게 됐다 强调转变过程，-았/었다 只陈述结果', examples: '한국 음식을 좋아하게 됐어요（渐渐喜欢了）vs 한국 음식을 좋아했어요（过去喜欢）' },
      { type: 'note', text: '自我介绍常用 -게 됐습니다', examples: '오늘부터 함께 일하게 됐습니다. 잘 부탁드립니다.（从今天起一起共事了，请多关照。）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '요즘', role: 'time' },
          { text: '한국어가', role: 'subject' },
          { text: '재미있어졌어요', role: 'verb' },
        ],
        zh: '最近韩语变得有趣了。',
        swapWords: ['재미있어졌어요', '어려워졌어요', '쉬워졌어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 가수를', role: 'object' },
          { text: '좋아하게 됐어요', role: 'verb' },
        ],
        zh: '就这样喜欢上了这位歌手。',
        swapWords: ['좋아하게 됐어요', '알게 됐어요', '팬이 되게 됐어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '운동을 해서', role: 'plain' },
          { text: '건강해졌어요', role: 'verb' },
        ],
        zh: '因为运动变健康了。',
        swapWords: ['건강해졌어요', '날씬해졌어요', '피부가 좋아졌어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🎵', context: 'KPOP 入坑', ko: '이 노래를 듣고 그 가수를 좋아하게 됐어요.', zh: '听了这首歌就喜欢上了那位歌手。' },
      { icon: '🌱', context: '成长变化', ko: '한국어를 공부하면서 한국 문화에 관심이 생기게 됐어요.', zh: '学韩语的过程中就对韩国文化产生了兴趣。' },
      { icon: '☀️', context: '天气变化', ko: '봄이 되니까 날씨가 따뜻해졌어요.', zh: '春天到了天气变暖和了。' },
      { icon: '💪', context: '自我成长', ko: '매일 운동했더니 몸이 건강해졌어요.', zh: '每天运动身体变健康了。' },
      { icon: '💼', context: '职场介绍', ko: '오늘부터 이 팀에서 일하게 됐습니다.', zh: '从今天起在这个团队工作了。' },
      { icon: '📱', context: '日常变化', ko: '요즘 스마트폰을 덜 쓰게 됐어요.', zh: '最近手机用得少了。' },
    ],
    mistakes: [
      { wrong: '어렵아지다', correct: '어려워지다', note: '어렵다 是 ㅂ 不规则，ㅂ 脱落后变为 어려워지다，不是 어렵아지다。' },
      { wrong: '좋아하게 되다（用于形容词）', correct: '좋아지다', note: '-게 되다 用于动词，形容词变化用 -아/어/여지다。좋아하다（动词：喜欢）→좋아하게 되다；좋다（形容词：好）→좋아지다。' },
      { wrong: '한국어가 어려워지게 됐어요（叠用）', correct: '한국어가 어려워졌어요 / 한국어가 어렵게 됐어요', note: '-아/어/여지다 和 -게 되다 功能重叠，不叠用，选一个即可。' },
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
<div class="reminder-box">好记法：-아/어지다 = 状态"变了"（形容词首选）/ -게 되다 = 事情"发展成"（动사首选，说缘由和过程）</div>`,
    compareLabel: '-아/어지다（状态渐变）vs -게 되다（顺势结果）',
    quickTable: {
      title: '-아/어지다 vs -게 되다 接续速查',
      headers: ['语法', '接续', '常搭配', '例子'],
      rows: [
        [{ ko: '-아지다', zh: 'ㅏ/ㅗ结尾' }, { ko: '형용사词干 + 아지다', zh: '' }, { ko: '형용사（状态变化）', zh: '' }, { ko: '좋아지다 / 많아지다', zh: '变好/变多' }],
        [{ ko: '-어지다', zh: '其他结尾' }, { ko: '형용사词干 + 어지다', zh: '' }, { ko: '형용사（状态变化）', zh: '' }, { ko: '커지다 / 빨라지다', zh: '变大/变快' }],
        [{ ko: '-해지다', zh: '하다动词' }, { ko: '어간 하 → 해지다', zh: '' }, { ko: '하다형容词', zh: '' }, { ko: '따뜻해지다 / 건강해지다', zh: '变暖/变健康' }],
        [{ ko: '-게 되다', zh: '顺势结果' }, { ko: '동사词干 + 게 되다', zh: '' }, { ko: '동사（过程→결과）', zh: '' }, { ko: '알게 되다 / 살게 되다', zh: '得知/开始住' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: '-아/어지다 还是 -게 되다？',
      body: '根据语境选择正确的变化表达。',
      questions: [
        { pre: '날씨가 많이 따뜻', post: '（天气变暖了）', options: ['해지게 됐어요', '하게 됐어요', '하게 되었어요', '해졌어요'], answer: 3, explanation: '따뜻하다 → 따뜻해지다，形容词状态变化用 -아/어지다' },
        { pre: '한국어를 공부하', post: '（就开始学韩语了——顺其自然）', options: ['게 됐어요', '게 되어졌어요', '아졌어요', '어졌어요'], answer: 0, explanation: '动词 + -게 되다，表示顺势发展的结果' },
        { pre: '그 사람을 좋아하', post: '（慢慢喜欢上那个人了）', options: ['아졌어요', '게 되어졌어요', '게 됐어요', '어졌어요'], answer: 2, explanation: '좋아하다 是动词，顺势发展用 -게 되다' },
        { pre: '요즘 건강이 많이 좋', post: '（最近身体好多了）', options: ['아지게 됐어요', '아졌어요', '아하게 됐어요', '게 됐어요'], answer: 1, explanation: '좋다 ㅗ结尾形容词 → 좋아지다，状态变化用 -아지다' },
      ],
    },
    linkedGrammarIds: ['g83', 'g73'],
  },
  {
    id: 'card-p9-l07',
    partNumber: 9,
    lessonNumber: 7,
    title: '-는/은/ㄴ 편이다, 얼마나 -는/은/ㄴ 지',
    whatItDoes: '表示"偏向某一方"和感叹程度',
    whatItDoesBody: '-는/은/ㄴ 편이다 表示"比较……/偏……"，是一种相对委婉的说法，不是绝对的判断。\n얼마나 -는/은/ㄴ 지 用于感叹程度之深，相当于"有多么……啊"，后面常接 알다/모르다。\n两者都是韩剧和日常对话中出现频率很高的地道表达。',
    structureNote: '-는/은/ㄴ 편이다：动词+는 편이다 / 形容词有收音+은 편이다 / 无收音+ㄴ 편이다\n얼마나 -는/은/ㄴ 지：얼마나 + 动词/形容词 冠词形 + 지 알다/모르다',
    rulesNote: '-는/은/ㄴ 편이다 语气比直接断言更柔和，说话者在主观评估。\n얼마나 -는/은/ㄴ 지 后面不说出程度，而是让对方去想象，情感更强烈。',
    structures: [
      {
        ko: '저는 매운 음식을 좋아하는 편이에요',
        zh: '我比较喜欢辣的食物。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '매운 음식을', role: 'object' },
          { text: '좋아하는 편이에요', role: 'verb' },
        ],
      },
      {
        ko: '이 드라마는 좀 긴 편이에요',
        zh: '这部剧比较长。',
        tokens: [
          { text: '이 드라마는', role: 'subject' },
          { text: '좀 긴 편이에요', role: 'verb' },
        ],
      },
      {
        ko: '그 노래가 얼마나 좋은 지 몰라요',
        zh: '那首歌有多好听啊，真的难以形容。',
        tokens: [
          { text: '그 노래가', role: 'subject' },
          { text: '얼마나 좋은 지 몰라요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '动词 + 는 편이다：表示倾向于做某事', examples: '자주 먹는 편이에요（比较常吃）/ 빨리 걷는 편이에요（走路比较快）' },
      { type: 'rule', text: '形容词 有收音+은/无收音+ㄴ 편이다', examples: '작다→작은 편이에요 / 크다→큰 편이에요 / 바쁘다→바쁜 편이에요' },
      { type: 'rule', text: '얼마나 + 冠词形 + 지 알다/모르다', examples: '얼마나 맛있는 지 알아요?（知道有多好吃吗？）/ 얼마나 힘든 지 몰라요（不知道有多辛苦）' },
      { type: 'usage', text: '-는/은/ㄴ 편이다 用于主观、相对的评价，不是绝对事实', examples: '저는 키가 큰 편이에요（我身高偏高）— 说话者认为自己偏高，不是客观事实' },
      { type: 'usage', text: '얼마나 -는/은/ㄴ 지 用于感叹，越省略后半越有韵味', examples: '그 사람이 얼마나 친절한 지！（那个人多么亲切啊！）' },
      { type: 'note', text: 'KPOP/韩剧常用：얼마나 보고 싶은 지（有多想见你啊）', examples: '네가 얼마나 보고 싶은 지 알아?（你知道我有多想你吗？）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '커피를', role: 'object' },
          { text: '자주 마시는 편이에요', role: 'verb' },
        ],
        zh: '我比较常喝咖啡。',
        swapWords: ['자주 마시는 편이에요', '별로 안 마시는 편이에요', '하루에 두 잔 마시는 편이에요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '이 문제가', role: 'subject' },
          { text: '얼마나 어려운 지', role: 'plain' },
          { text: '알아요?', role: 'verb' },
        ],
        zh: '你知道这道题有多难吗？',
        swapWords: ['알아요?', '몰라요', '상상도 못 해요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '일찍 자는 편이에요', role: 'verb' },
        ],
        zh: '我比较早睡。',
        swapWords: ['일찍 자는 편이에요', '늦게 자는 편이에요', '잠을 많이 자는 편이에요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🍜', context: '饮食习惯', ko: '저는 아침을 잘 안 먹는 편이에요.', zh: '我比较不吃早饭。' },
      { icon: '🎵', context: 'KPOP 情感', ko: '이 노래가 얼마나 위로가 되는 지 몰라요.', zh: '这首歌给了我多大安慰啊，真的难以形容。' },
      { icon: '💬', context: '自我介绍', ko: '저는 조용한 편이지만 친해지면 말이 많아요.', zh: '我比较安静，但熟了之后话会很多。' },
      { icon: '📺', context: '韩剧推荐', ko: '이 드라마는 좀 슬픈 편이에요. 각오하세요.', zh: '这部剧比较悲，做好心理准备吧。' },
      { icon: '🏃', context: '生活习惯', ko: '저는 잠을 많이 자는 편이에요. 보통 9시간 자요.', zh: '我比较能睡，一般睡9个小时。' },
      { icon: '😭', context: '感叹', ko: '그 배우가 얼마나 잘생긴 지 알아요?', zh: '你知道那个演员有多帅吗？' },
    ],
    mistakes: [
      { wrong: '저는 키가 크는 편이에요（형容词）', correct: '저는 키가 큰 편이에요', note: '形容词用 -은/ㄴ 편이다，不加 -는。크다 → 큰 편이다。' },
      { wrong: '얼마나 좋은지를 몰라요', correct: '얼마나 좋은지 몰라요', note: '-는/은/ㄴ 지 后不加 를，直接接알다/모르다。' },
      { wrong: '좀 바쁜는 편이에요', correct: '좀 바쁜 편이에요', note: '바쁘다 → 바쁜 편이다，ㅡ 脱落后直接加 ㄴ，不加 -는。' },
    ],
    overviewHtml: `<div class="overview">
  <div class="ov-hero">
    <div class="ov-hero-label">P9 · 第7课</div>
    <div class="ov-hero-title">-는/은/ㄴ 편이다, 얼마나 -는/은/ㄴ 지</div>
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
      <div class="ko">얼마나 -는/은/ㄴ 지 알다/모르다</div>
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
얼마나 -는/은/ㄴ 지 后面不说出程度，而是让对方去想象，情感更强烈。</div>
`,
    compareLabel: '편이다 vs 얼마나 지',
    compareHtml: `
<div class="card-title">편이다 vs 얼마나 지</div>
<div class="card-body">-는/은/ㄴ 편이다 表示"比较……/偏……"，是一种相对委婉的说法，不是绝对的判断。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">저는 매운 음식을 좋아하는 편이에요</span><span style="font-size:16px;color:#5a4640">我比较喜欢辣的食物。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">그 노래가 얼마나 좋은 지 몰라요</span><span style="font-size:16px;color:#5a4640">那首歌有多好听啊，真的难以形容。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">이 드라마는 좀 긴 편이에요</span><span style="font-size:16px;color:#5a4640">这部剧比较长。</span></div>
  </div>
</div>
<div class="reminder-box">얼마나 -는/은/ㄴ 지 后面不说出程度，而是让对方去想象，情感更强烈。</div>
`,
    quickTable: {
      title: '-는/은/ㄴ 편이다 接续规则',
      headers: ['词性', '형태', '예시', '意思'],
      rows: [
        [{ ko: '동사', zh: '动词' }, { ko: '-는 편이다', zh: '' }, { ko: '자주 먹는 편이에요', zh: '' }, { ko: '比较常吃', zh: '' }],
        [{ ko: '형용사 (收音)', zh: '有尾音形容词' }, { ko: '-은 편이다', zh: '' }, { ko: '작은 편이에요', zh: '' }, { ko: '偏小', zh: '' }],
        [{ ko: '형용사 (无收音)', zh: '无尾音形容词' }, { ko: '-ㄴ 편이다', zh: '' }, { ko: '큰 편이에요', zh: '' }, { ko: '偏大', zh: '' }],
        [{ ko: 'ㅡ 탈락', zh: 'ㅡ 脱落' }, { ko: '-ㄴ 편이다', zh: '' }, { ko: '바쁜 편이에요', zh: '' }, { ko: '比较忙', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: "-는/은/ㄴ 편이다, 얼마나 -는/은/ㄴ 지",
      body: "测试对两个语法点的掌握",
      questions: [
        {
          prompt: '他比较内向。→ 그 사람은 ___',
          options: ['내향적으로 편이에요', '내향적인 편이에요', '내향적 편이에요', '내향적는 편이에요'],
          answer: 1 as 0|1|2|3,
          explanation: "形容词 + 은/ㄴ 편이다，내향적이다 → 내향적인 편이다",
        },
        {
          prompt: '你知道这首歌有多好听吗？→ 이 노래가 얼마나 ___',
          options: ['좋은 지 알아요?', '좋은지를 알아요?', '좋을 지 알아요?', '좋는 지 알아요?'],
          answer: 0 as 0|1|2|3,
          explanation: "얼마나 + 形容词冠词形 + 지 알다，좋다 → 좋은 지",
        },
        {
          prompt: '我走路比较快。→ 저는 걷는 속도가 ___',
          options: ['빠르은 편이에요', '빠르는 편이에요', '빠른 편이에요', '빠를 편이에요'],
          answer: 2 as 0|1|2|3,
          explanation: "빠르다 ㅡ 탈락 → 빠른 편이에요",
        },
        {
          prompt: '不知道那有多辛苦。→ 그게 얼마나 ___',
          options: ['힘들은 지 몰라요', '힘들지 몰라요', '힘드는 지 몰라요', '힘든 지 몰라요'],
          answer: 3 as 0|1|2|3,
          explanation: "힘들다 ㄹ 불규칙 → 힘든 지 몰라요",
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
    whatItDoes: '表示"一……就……"和"开始……"',
    whatItDoesBody: '-자마자 表示前一个动作刚结束，后一个动作立刻发生，相当于"一……就……"，强调时间紧接。\n-기 시작하다 表示某个动作或状态开始发生，相当于"开始……"。\n两者都是叙述事件顺序时的高频表达。',
    structureNote: '-자마자：动词词干 + 자마자（不受时态影响，时态体现在后半句）\n-기 시작하다：动词词干 + 기 시작하다（시작하다 变时态）',
    rulesNote: '-자마자 前半句不变时态，后半句决定整体时态。\n-기 시작하다 中 시작하다 可变时态：시작해요/시작했어요/시작할 거예요。',
    structures: [
      {
        ko: '집에 도착하자마자 잠이 들었어요',
        zh: '一到家就睡着了。',
        tokens: [
          { text: '집에', role: 'place' },
          { text: '도착하자마자', role: 'plain' },
          { text: '잠이 들었어요', role: 'verb' },
        ],
      },
      {
        ko: '알람이 울리자마자 일어났어요',
        zh: '闹钟一响就起来了。',
        tokens: [
          { text: '알람이', role: 'subject' },
          { text: '울리자마자', role: 'plain' },
          { text: '일어났어요', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 배우기 시작했어요',
        zh: '开始学韩语了。',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '배우기 시작했어요', role: 'verb' },
        ],
      },
      {
        ko: '봄이 되자마자 꽃이 피기 시작했어요',
        zh: '春天一到，花就开始开了。',
        tokens: [
          { text: '봄이 되자마자', role: 'plain' },
          { text: '꽃이', role: 'subject' },
          { text: '피기 시작했어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-자마자 变形：动词词干 + 자마자（无时态变化）', examples: '먹다→먹자마자 / 일어나다→일어나자마자 / 도착하다→도착하자마자' },
      { type: 'rule', text: '-기 시작하다 变形：动词词干 + 기 시작하다', examples: '먹다→먹기 시작해요 / 배우다→배우기 시작했어요 / 울다→울기 시작할 거예요' },
      { type: 'usage', text: '-자마자 强调两个动作紧密相连，几乎同时', examples: '문을 열자마자 고양이가 뛰어나왔어요（门一开猫就跑出来了）' },
      { type: 'usage', text: '-기 시작하다 强调某件事进入了开始的状态', examples: '비가 오기 시작했어요（开始下雨了）/ 아이가 걷기 시작했어요（孩子开始走路了）' },
      { type: 'compare', text: '-자마자 vs -고 나서：-자마자 强调立刻，-고 나서 是之后（有时间间隔）', examples: '먹자마자 달렸어요（吃完立刻跑）vs 먹고 나서 달렸어요（吃完后跑了）' },
      { type: 'note', text: 'KPOP 常用：눈을 뜨자마자 네 생각이 났어（一睁眼就想到你）', examples: '이 노래를 듣자마자 팬이 됐어요（一听这首歌就变成粉丝了）' },
    ],
    cardExamples: [
      {
        wordBlocks: [
          { text: '학교에서', role: 'place' },
          { text: '돌아오자마자', role: 'plain' },
          { text: '숙제를', role: 'object' },
          { text: '했어요', role: 'verb' },
        ],
        zh: '一从学校回来就做作业了。',
        swapWords: ['숙제를 했어요', '밥을 먹었어요', '게임을 했어요', '유튜브를 봤어요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '그 노래를', role: 'object' },
          { text: '좋아하기', role: 'plain' },
          { text: '시작했어요', role: 'verb' },
        ],
        zh: '开始喜欢上那首歌了。',
        swapWords: ['시작했어요', '시작했습니다', '시작할 것 같아요'],
        swapRole: 'verb',
      },
      {
        wordBlocks: [
          { text: '비가', role: 'subject' },
          { text: '오자마자', role: 'plain' },
          { text: '우산을 펼쳤어요', role: 'verb' },
        ],
        zh: '一下雨就撑开了伞。',
        swapWords: ['우산을 펼쳤어요', '집에 들어갔어요', '택시를 탔어요'],
        swapRole: 'verb',
      },
    ],
    scenarios: [
      { icon: '🌅', context: '早晨习惯', ko: '일어나자마자 핸드폰을 확인해요.', zh: '一起床就查手机。' },
      { icon: '🎵', context: 'KPOP 入坑', ko: '이 노래를 듣자마자 팬이 됐어요.', zh: '一听这首歌就变成粉丝了。' },
      { icon: '📚', context: '学习开始', ko: '작년부터 한국어를 배우기 시작했어요.', zh: '从去年开始学韩语了。' },
      { icon: '🌧️', context: '天气变化', ko: '오후가 되자마자 비가 오기 시작했어요.', zh: '一到下午就开始下雨了。' },
      { icon: '✈️', context: '旅行回忆', ko: '한국에 도착하자마자 치킨을 먹었어요.', zh: '一到韩国就吃炸鸡了。' },
      { icon: '😴', context: '疲惫', ko: '침대에 눕자마자 잠이 들었어요.', zh: '一躺到床上就睡着了。' },
    ],
    mistakes: [
      { wrong: '집에 도착했자마자', correct: '집에 도착하자마자', note: '-자마자 前半句不加过去时 -았/었，动词直接用词干形。' },
      { wrong: '먹기를 시작했어요', correct: '먹기 시작했어요', note: '-기 시작하다 中间不加 -를，直接连接。' },
      { wrong: '울자마자 웃었어요（逻辑矛盾但语法可以）', correct: '울다가 웃었어요', note: '-자마자 强调立刻转变，哭了就笑更自然用 -다가 表示中途转换。' },
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
    compareLabel: '자마자 vs 기 시작하다',
    compareHtml: `
<div class="card-title">자마자 vs 기 시작하다</div>
<div class="card-body">-자마자 表示前一个动作刚结束，后一个动作立刻发生，相当于"一……就……"，强调时间紧接。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">집에 도착하자마자 잠이 들었어요</span><span style="font-size:16px;color:#5a4640">一到家就睡着了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한국어를 배우기 시작했어요</span><span style="font-size:16px;color:#5a4640">开始学韩语了。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">알람이 울리자마자 일어났어요</span><span style="font-size:16px;color:#5a4640">闹钟一响就起来了。</span></div>
  </div>
</div>
<div class="reminder-box">-기 시작하다 中 시작하다 可变时态：시작해요/시작했어요/시작할 거예요。</div>
`,
    quickTable: {
      title: '-자마자 vs 기 시작하다 对比',
      headers: ['语法', '强调', '时态位置', '예시'],
      rows: [
        [{ ko: '-자마자', zh: '' }, { ko: '即刻性', zh: '前后无间隔' }, { ko: '后半句', zh: '' }, { ko: '도착하자마자 먹었어요', zh: '一到就吃了' }],
        [{ ko: '-기 시작하다', zh: '' }, { ko: '起点', zh: '动作开始' }, { ko: '시작하다 变形', zh: '' }, { ko: '먹기 시작했어요', zh: '开始吃了' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: "-자마자, -기 시작하다",
      body: "测试对两个语法点的掌握",
      questions: [
        {
          prompt: '一醒来就看手机。→ 눈을 뜨___ 핸드폰을 봐요',
          options: ['기 전에', '은 후에', '자마자', '기 시작하면'],
          answer: 2 as 0|1|2|3,
          explanation: "-자마자 接动词词干基本形",
        },
        {
          prompt: '开始学韩语了。→ 한국어를 배우___',
          options: ['자마자요', '기 때문이에요', '기 위해요', '기 시작했어요'],
          answer: 3 as 0|1|2|3,
          explanation: "动词 + 기 시작하다 = 开始……",
        },
        {
          prompt: '-자마자 前半句用什么时态？',
          options: ['现在时', '基本形（不变时态）', '将来时', '过去时'],
          answer: 1 as 0|1|2|3,
          explanation: "-자마자 前半句用基本形，后半句决定时态",
        },
        {
          prompt: '雨开始下了。→ 비가 오___',
          options: ['기 시작했어요', '기 싫어요', '기로 했어요', '자마자요'],
          answer: 0 as 0|1|2|3,
          explanation: "오다 无收音 → 오기 시작했어요",
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
    whatItDoes: '表达"多亏了"的感谢，以及"知不知道怎么做"的询问',
    whatItDoesBody: '-은/ㄴ 덕분에 用于表示因某人/某事获益，是正面的因果。\n-는/은/ㄴ 지 알다/모르다 用来询问或表达"会不会/知不知道"某件事的方法或状态。\n两个语法在日常生活和韩剧对话中都极为常见。',
    structures: [
      {
        ko: '선생님 덕분에 합격했어요',
        zh: '多亏了老师，我考上了。',
        tokens: [
          { text: '선생님', role: 'subject' },
          { text: '덕분에', role: 'plain' },
          { text: '합격했어요', role: 'verb' },
        ],
      },
      {
        ko: '여러분 덕분에 좋은 추억이 생겼어요',
        zh: '多亏大家，留下了美好的回忆。',
        tokens: [
          { text: '여러분', role: 'subject' },
          { text: '덕분에', role: 'plain' },
          { text: '좋은 추억이 생겼어요', role: 'verb' },
        ],
      },
      {
        ko: '한국어를 어떻게 공부하는지 알아요',
        zh: '你知道怎么学韩语吗？',
        tokens: [
          { text: '한국어를', role: 'object' },
          { text: '어떻게 공부하는지', role: 'verb' },
          { text: '알아요', role: 'verb' },
        ],
      },
      {
        ko: '버스가 몇 시에 오는지 몰라요',
        zh: '我不知道公交几点来。',
        tokens: [
          { text: '버스가', role: 'subject' },
          { text: '몇 시에', role: 'time' },
          { text: '오는지', role: 'verb' },
          { text: '몰라요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '名词 + 덕분에（名词直接接，无需冠词形）', examples: '친구 덕분에 / 선생님 덕분에 / 노력 덕분에' },
      { type: 'rule', text: '-은/ㄴ 덕분에 接在动词/形容词后：动词过去冠词形 + 덕분에', examples: '도와준 덕분에 / 열심히 한 덕분에 / 가르쳐 준 덕분에' },
      { type: 'usage', text: '-는/은/ㄴ 지 알다/모르다 ：动词现在时用 -는지，形容词/名词用 -은/ㄴ지', examples: '가는지 알아요 / 큰지 몰라요 / 학생인지 알아요' },
      { type: 'usage', text: '疑问词 + -는/은/ㄴ 지：어떻게/어디/언제/누가/얼마나 + -는지', examples: '어디에 가는지 알아요? / 얼마인지 몰라요' },
      { type: 'note', text: '덕분에 只用于正面结果，负面结果要用 때문에', examples: '× 늦잠 잔 덕분에 지각했어요 → ○ 늦잠 잔 때문에 지각했어요' },
      { type: 'compare', text: '-는/은/ㄴ 지 알다 vs -는/은/ㄴ 줄 알다：两者都是"知道"，但 -는 줄 알다 更强调主观认为/以为', examples: '비가 오는지 알아요（知道下雨吗）vs 비가 오는 줄 알았어요（以为下雨了）' },
      { type: 'example', text: '덕분에 常用于感谢语境，也可以做单独的回答', examples: 'A: 어떻게 좋아졌어요? B: 약 덕분에요 / 친구들 덕분이에요（托朋友的福）' },
    ],
    cardExamples: [
      {
        zh: '多亏了朋友，我才能学到韩语。',
        wordBlocks: [
          { text: '친구', role: 'subject' },
          { text: '덕분에', role: 'plain' },
          { text: '한국어를', role: 'object' },
          { text: '배울 수 있었어요', role: 'verb' },
        ],
        swapWords: ['선생님 덕분에', '부모님 덕분에', '여러분 덕분에'],
      },
      {
        zh: '你知道在哪里卖吗？',
        wordBlocks: [
          { text: '어디서 파는지', role: 'verb' },
          { text: '알아요', role: 'verb' },
        ],
        swapWords: ['사는지 알아요', '만드는지 알아요', '있는지 알아요'],
      },
      {
        zh: '多亏努力练习，在比赛中获得了第一名。',
        wordBlocks: [
          { text: '열심히 연습한', role: 'verb' },
          { text: '덕분에', role: 'plain' },
          { text: '대회에서', role: 'place' },
          { text: '1등을 했어요', role: 'verb' },
        ],
        swapWords: ['공부한 덕분에', '노력한 덕분에', '준비한 덕분에'],
      },
      {
        zh: '我不知道公交几点出发。',
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
      { icon: '🎓', context: '考试通过，感谢老师', ko: '선생님 덕분에 시험에 합격했어요. 정말 감사합니다.', zh: '多亏了老师，我考过了。真的非常感谢。', tip: '감사합니다 = 正式感谢' },
      { icon: '🎬', context: '韩剧台词：多亏你我才撑下来', ko: '네 덕분에 버텼어. 고마워.', zh: '多亏有你我才撑过来的。谢谢你。', tip: '버티다 = 坚持/撑住' },
      { icon: '🚻', context: '问路时询问地点', ko: '죄송한데요, 화장실이 어디 있는지 아세요?', zh: '不好意思，请问您知道洗手间在哪里吗？', tip: '-는지 아세요 = 礼貌地询问对方是否知道' },
      { icon: '🎵', context: 'KPOP 粉丝对爱豆表达感谢', ko: '오빠 덕분에 매일 행복해요. 항상 응원할게요.', zh: '多亏了欧巴，每天都很幸福。我会一直支持你的。', tip: '항상 응원할게요 = 我会一直应援' },
      { icon: '📱', context: '不确定某信息，向朋友确认', ko: '이 식당이 오늘 여는지 알아? 홈페이지에서 못 찾겠어.', zh: '你知道这家餐厅今天开不开吗？我在官网找不到。' },
      { icon: '🍱', context: '日常感谢家人的帮助', ko: '엄마 덕분에 맛있는 밥 잘 먹었어요.', zh: '多亏妈妈，吃到了好吃的饭。', tip: '덕분에 之后不一定要大事，日常小感谢也可以用' },
    ],
    mistakes: [
      {
        wrong: '늦잠 잔 덕분에 지각했어요',
        correct: '늦잠 잔 때문에 지각했어요',
        note: '덕분에 只用于正面/受益情境，负面结果一律用 때문에',
      },
      {
        wrong: '어디에 가지 알아요?',
        correct: '어디에 가는지 알아요?',
        note: '动词接 알다/모르다 时要用 -는지，不是 -지',
      },
      {
        wrong: '친구 덕분이에요 그래서 합격했어요',
        correct: '친구 덕분에 합격했어요',
        note: '덕분에 本身就是连接词，后面直接接结果句，不需要 그래서',
      },
      {
        wrong: '얼마인지를 알아요?',
        correct: '얼마인지 알아요?',
        note: '-는지/인지 后面不加 를，直接接 알다/모르다',
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
    compareLabel: '덕분에 vs 지 알다',
    compareHtml: `
<div class="card-title">덕분에 vs 지 알다</div>
<div class="card-body">-은/ㄴ 덕분에 用于表示因某人/某事获益，是正面的因果。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">선생님 덕분에 합격했어요</span><span style="font-size:16px;color:#5a4640">多亏了老师，我考上了。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">한국어를 어떻게 공부하는지 알아요</span><span style="font-size:16px;color:#5a4640">你知道怎么学韩语吗？</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">여러분 덕분에 좋은 추억이 생겼어요</span><span style="font-size:16px;color:#5a4640">多亏大家，留下了美好的回忆。</span></div>
  </div>
</div>
<div class="reminder-box">注意区分两种用法的核心差异。</div>
`,
    quickTable: {
      title: '덕분에 接续形式',
      headers: ['接在', '形式', '예시', '意思'],
      rows: [
        [{ ko: '동사', zh: '动词' }, { ko: '-은/ㄴ 덕분에', zh: '' }, { ko: '도와준 덕분에', zh: '' }, { ko: '多亏帮了我', zh: '' }],
        [{ ko: '형용사', zh: '形容词' }, { ko: '-은/ㄴ 덕분에', zh: '' }, { ko: '건강한 덕분에', zh: '' }, { ko: '多亏身体健康', zh: '' }],
        [{ ko: '명사', zh: '名词' }, { ko: '명사 + 덕분에', zh: '' }, { ko: '선생님 덕분에', zh: '' }, { ko: '多亏了老师', zh: '' }],
        [{ ko: '간접의문', zh: '间接疑问' }, { ko: '-는/은/ㄴ 지 알다', zh: '' }, { ko: '뭐 먹는 지 알아요?', zh: '' }, { ko: '知道吃什么吗？', zh: '' }],
      ],
    },
    specialQuiz: {
      type: 'fill',
      title: "-은/ㄴ 덕분에, -는/은/ㄴ 지 알다/모르다",
      body: "测试对两个语法点的掌握",
      questions: [
        {
          prompt: '多亏朋友帮忙，搬家顺利完成了。→ 친구가 ___ 이사를 잘 마쳤어요',
          options: ['도와준 덕분에', '도와주자마자', '도와주기 때문에', '도와주는 데다가'],
          answer: 0 as 0|1|2|3,
          explanation: "动词冠词形 + 덕분에 = 多亏……",
        },
        {
          prompt: '你知道他住哪里吗？→ 그 사람이 어디 사는 ___',
          options: ['지도 알아요?', '것 알아요?', '지 알아요?', '데 알아요?'],
          answer: 2 as 0|1|2|3,
          explanation: "-는/은/ㄴ 지 알다 = 间接疑问，知道……",
        },
        {
          prompt: '덕분에 表达的是什么语气？',
          options: ['顺序、然后', '感谢、正面结果', '让步、即使', '批评、负面原因'],
          answer: 1 as 0|1|2|3,
          explanation: "덕분에 = 感谢正面结果",
        },
        {
          prompt: '不知道要去哪里。→ 어디에 가야 하는 ___',
          options: ['데 몰라요', '것 몰라요', '지도 몰라요', '지 몰라요'],
          answer: 3 as 0|1|2|3,
          explanation: "-는/은/ㄴ 지 모르다 = 不知道……",
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
    whatItDoes: '用名词化表达难易程度，用"수 있다/없다"表示能力或可能性',
    whatItDoesBody: '-기(가) 쉽다/어렵다/힘들다 把动词变成名词，然后接形容词来描述难易。\n-을/ㄹ 수 있다 表示"能做/可以做"，-을/ㄹ 수 없다 表示"不能做/无法做"。\n两个结构都是日常高频，表达能力、可能性、难易程度缺一不可。',
    structures: [
      {
        ko: '한국어는 배우기가 어렵지 않아요',
        zh: '韩语学起来并不难。',
        tokens: [
          { text: '한국어는', role: 'subject' },
          { text: '배우기가', role: 'verb' },
          { text: '어렵지 않아요', role: 'verb' },
        ],
      },
      {
        ko: '이 음식은 먹기가 좀 힘들어요',
        zh: '这道菜吃起来有点难。',
        tokens: [
          { text: '이 음식은', role: 'subject' },
          { text: '먹기가', role: 'verb' },
          { text: '좀 힘들어요', role: 'verb' },
        ],
      },
      {
        ko: '저는 수영을 할 수 있어요',
        zh: '我会游泳。',
        tokens: [
          { text: '저는', role: 'subject' },
          { text: '수영을', role: 'object' },
          { text: '할 수 있어요', role: 'verb' },
        ],
      },
      {
        ko: '오늘은 바빠서 만날 수 없어요',
        zh: '今天太忙了，没办法见面。',
        tokens: [
          { text: '오늘은', role: 'time' },
          { text: '바빠서 만날 수 없어요', role: 'verb' },
        ],
      },
    ],
    connectionRules: [
      { type: 'rule', text: '-기(가) + 形容词：动词词干 + 기(가) + 쉽다/어렵다/힘들다/편하다', examples: '쓰기가 편해요 / 읽기가 쉬워요 / 발음하기가 어려워요' },
      { type: 'rule', text: '-을/ㄹ 수 있다：有收音词干 + 을 수 있다，无收音词干 + ㄹ 수 있다', examples: '먹을 수 있다 / 갈 수 있다 / 만들 수 있다' },
      { type: 'rule', text: '-을/ㄹ 수 없다：有收音词干 + 을 수 없다，无收音词干 + ㄹ 수 없다', examples: '먹을 수 없다 / 갈 수 없다 / 만들 수 없다' },
      { type: 'usage', text: '-기가 中的 가 可省略，가 存在时语气更正式/书面', examples: '먹기 쉬워요 = 먹기가 쉬워요（口语常省）' },
      { type: 'compare', text: '-을/ㄹ 수 없다 vs 못 + 动词：两者意思相近，못 更口语，수 없다 更正式', examples: '갈 수 없어요 = 못 가요（不能去）' },
      { type: 'note', text: '-을/ㄹ 수 있다 也可表示"有可能"，不仅仅是技能', examples: '비가 올 수 있어요（有可能下雨）/ 실수할 수 있어요（可能会出错）' },
      { type: 'example', text: '날씨 때문에 여행을 갈 수 없어요', examples: '因为天气，没办法去旅行。（外部原因导致不可能）' },
    ],
    cardExamples: [
      {
        zh: '这首歌唱起来太难了。',
        wordBlocks: [
          { text: '이 노래는', role: 'subject' },
          { text: '부르기가', role: 'verb' },
          { text: '너무 어려워요', role: 'verb' },
        ],
        swapWords: ['외우기가 어려워요', '연습하기가 힘들어요', '따라하기가 어려워요'],
      },
      {
        zh: '我能吃泡菜。',
        wordBlocks: [
          { text: '저는', role: 'subject' },
          { text: '김치를', role: 'object' },
          { text: '먹을 수 있어요', role: 'verb' },
        ],
        swapWords: ['매운 음식을', '생선을', '낙지를'],
      },
      {
        zh: '用韩语写日记越来越顺手了。',
        wordBlocks: [
          { text: '한국어로', role: 'plain' },
          { text: '일기를', role: 'object' },
          { text: '쓰기가', role: 'verb' },
          { text: '점점 편해졌어요', role: 'verb' },
        ],
        swapWords: ['편지를 쓰기가', '메시지를 쓰기가', '보고서를 쓰기가'],
      },
      {
        zh: '今天没时间，没办法去。',
        wordBlocks: [
          { text: '오늘은', role: 'time' },
          { text: '시간이 없어서', role: 'plain' },
          { text: '갈 수 없어요', role: 'verb' },
        ],
        swapWords: ['만날 수 없어요', '참석할 수 없어요', '도와줄 수 없어요'],
      },
    ],
    scenarios: [
      { icon: '🗣️', context: '介绍自己的语言能力', ko: '저는 한국어와 영어를 할 수 있어요. 일본어는 조금밖에 못 해요.', zh: '我会韩语和英语，日语只会一点点。', tip: '밖에 + 못 = 只能…（强调有限）' },
      { icon: '🎵', context: 'KPOP 粉丝聊唱歌', ko: '이 곡은 고음이 많아서 따라 부르기가 정말 힘들어요.', zh: '这首歌高音很多，跟着唱真的很难。', tip: '고음 = 高音；따라 부르다 = 跟唱' },
      { icon: '📅', context: '约朋友但有事无法赴约', ko: '이번 주말에는 약속이 있어서 같이 갈 수 없을 것 같아요.', zh: '这周末有约，好像没办法一起去了。', tip: '-을 것 같아요 = 好像……（推测/委婉拒绝）' },
      { icon: '🍽️', context: '点菜时询问饮食限制', ko: '저는 고수를 못 먹어요. 고수 빼고 만들 수 있어요?', zh: '我不能吃香菜。可以去掉香菜做吗？', tip: '빼다 = 去掉/排除' },
      { icon: '📱', context: '夸赞某事做起来容易', ko: '이 앱은 사용하기가 정말 쉬워요. 누구든지 할 수 있어요.', zh: '这个App用起来真的很简单，任何人都能用。', tip: '누구든지 = 无论谁/任何人' },
      { icon: '🎬', context: '韩剧台词：做不到某事', ko: '미안해. 나 더 이상 기다릴 수 없어.', zh: '对不起，我没办法再等下去了。', tip: '더 이상 + 수 없다 = 无法再……（放弃/绝望语气）' },
    ],
    mistakes: [
      {
        wrong: '저는 운전을 할 수 있을 수 있어요',
        correct: '저는 운전을 할 수 있어요',
        note: '-을 수 있다 不能叠加，只用一次即可',
      },
      {
        wrong: '이 문제는 어렵기',
        correct: '이 문제는 풀기가 어려워요',
        note: '-기가 之后 必须接形容词，不能单独结句',
      },
      {
        wrong: '갈 수를 없다',
        correct: '갈 수가 없다 / 갈 수 없다',
        note: '수 后面可以用 가 强调，但不能用 을/를。를 是宾格助词，수 不是宾语而是依存名词。',
      },
      {
        wrong: '쓰기는 어렵지 않지만 말하기는 어렵기 있어요',
        correct: '쓰기는 어렵지 않지만 말하기는 어려워요',
        note: '-기가 어렵다 不能说 어렵기 있다',
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
    compareLabel: '-기(가) vs 수 있다/없다',
    compareHtml: `
<div class="card-title">-기(가) vs 수 있다/없다</div>
<div class="card-body">-기(가) 쉽다/어렵다/힘들다 把动词变成名词，然后接形容词来描述难易。</div>
<div style="display:flex;flex-direction:column;gap:10px;margin:12px 0">
  <div class="tok-row" style="background:#fff0f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v">用法一</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">한국어는 배우기가 어렵지 않아요</span><span style="font-size:16px;color:#5a4640">韩语学起来并不难。</span></div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:4px"><span style="font-weight:700">저는 수영을 할 수 있어요</span><span style="font-size:16px;color:#5a4640">我会游泳。</span></div>
  </div>
  <div class="tok-row" style="background:#eaf8f5;border-radius:12px;padding:12px;flex-direction:column;align-items:flex-start">
    <div class="tok t-v" style="background:#aee3d8;color:#1a7a6a">用法二</div>
    <div style="display:flex;align-items:baseline;gap:10px;margin-top:8px"><span style="font-weight:700">이 음식은 먹기가 좀 힘들어요</span><span style="font-size:16px;color:#5a4640">这道菜吃起来有点难。</span></div>
  </div>
</div>
<div class="reminder-box">注意区分两种用法的核心差异。</div>
`,
    quickTable: {
      title: '-을/ㄹ 수 있다/없다 接续',
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
      title: "-기(가) + 形容词, -을/ㄹ 수 있다/없다",
      body: "测试对两个语法点的掌握",
      questions: [
        {
          prompt: '这道菜吃起来很辣。→ 이 음식은 먹기가 ___',
          options: ['매운 편이에요', '맵자마자요', '매워요', '매울 수 있어요'],
          answer: 2 as 0|1|2|3,
          explanation: "动词 + 기(가) + 形容词，感受评价",
        },
        {
          prompt: '我会游泳。→ 저는 수영을 ___',
          options: ['하기 있어요', '할 수 있어요', '할 수 있는 편이에요', '하기가 있어요'],
          answer: 1 as 0|1|2|3,
          explanation: "수영하다 → 수영을 할 수 있다",
        },
        {
          prompt: '今天没办法来。→ 오늘은 올 ___',
          options: ['기 없어요', '수 아니에요', '기 못해요', '수 없어요'],
          answer: 3 as 0|1|2|3,
          explanation: "-을/ㄹ 수 없다 = 不能",
        },
        {
          prompt: '-기(가) + 形容词 中，가 的作用是？',
          options: ['主格助词，可省略', '宾格助词，必须保留', '方向助词', '话题助词'],
          answer: 0 as 0|1|2|3,
          explanation: "-기(가) 中 가 是主格助词，可省略",
        },
      ],
    },
    linkedGrammarIds: ['g13', 'g67'],
  },

  {
    id: 'card-p9-l11',
    partNumber: 9,
    lessonNumber: 11,
    title: '综合练习⑨',
    isPractice: true,
    whatItDoes: 'P9 全部语法点综合复习',
    whatItDoesBody: '本课汇总 P9（第1–10课）所有语法点，通过情景对话和替换练习巩固掌握。',
    structures: [],
    connectionRules: [],
    cardExamples: [],
    scenarios: [],
    mistakes: [],
    specialQuiz: {
      type: 'fill',
      title: '综合练习⑨',
      body: '完成 P9 所有课程后，用以下题目检验掌握程度。',
      questions: [
        { prompt: '用 -겠- 表示推测：朋友看起来很累', options: ['피곤할 것 같아요', '피곤하겠어요', '피곤했어요', '피곤해요'], answer: 1, explanation: '-겠- 第二三人称表推测：피곤하다 + 겠 + 어요' },
        { prompt: '好像要下雨了，用 -을 것 같다', options: ['비가 오겠어요', '비가 왔어요', '비가 올 것 같아요', '비가 올게요'], answer: 2, explanation: '将来推测用 -을 것 같다：오다 → 올 것 같아요' },
        { prompt: '哇，好漂亮啊！用 -네요', options: ['예쁘겠어요', '예쁠 것 같아요', '예뻤어요', '예쁘네요'], answer: 3, explanation: '-네요 表示当下新发现的感叹：예쁘다 + 네요' },
        { prompt: '学了三年韩语，用 -동안', options: ['3년 동안 한국어를 배웠어요', '3년 마다 한국어를 배웠어요', '3년 때마다 배웠어요', '3년 후에 배웠어요'], answer: 0, explanation: '持续时间段用 N + 동안' },
        { prompt: '谦虚否认"你韩语真好"，用 -기는요', options: ['잘하기는 해요', '잘하기는요', '잘했기는요', '잘할 것 같아요'], answer: 1, explanation: '-기는요 接在动词词干后，表示谦虚否认' },
        { prompt: '天气变凉了，用 -아/어지다', options: ['시원하게 됐어요', '시원했어요', '시원해요', '시원해졌어요'], answer: 3, explanation: '시원하다 + 아지다 → 시원해졌어요（状态变化）' },
        { prompt: '我算是吃得少，用 -는 편이다', options: ['적게 먹기는 해요', '적게 먹는 편이에요', '적게 먹겠어요', '적게 먹을 것 같아요'], answer: 1, explanation: '动词 + 는 편이다 表示"算是/偏向于"' },
        { prompt: '一到家就洗澡了，用 -자마자', options: ['집에 오면서 샤워했어요', '집에 온 후에 샤워했어요', '집에 오자마자 샤워했어요', '집에 오고 나서 샤워했어요'], answer: 2, explanation: '-자마자 表示前一动作结束立刻进行后一动作' },
        { prompt: '多亏朋友找到了工作，用 덕분에', options: ['친구 때문에 취직했어요', '친구가 있어서 취직했어요', '친구한테서 취직했어요', '친구 덕분에 취직했어요'], answer: 3, explanation: 'N + 덕분에 表示正面受益因果' },
        { prompt: '你知道几点开始吗？用 -는지 알다', options: ['몇 시에 시작하는지 알아요', '몇 시에 시작하지 알아요', '몇 시에 시작할지 알아요', '몇 시 시작하는지 알아요'], answer: 0, explanation: '动词 + 는지 알다，疑问词 몇 시에 放前面' },
        { prompt: '我会弹吉他，用 -을 수 있다', options: ['기타를 치기가 있어요', '기타를 칠 수 있을게요', '기타를 칠 수 있어요', '기타를 칠 수 있겠어요'], answer: 2, explanation: '치다 → 칠 수 있어요（无收音 + ㄹ 수 있다）' },
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
