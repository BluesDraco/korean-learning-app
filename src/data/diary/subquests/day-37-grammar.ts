import type { GrammarSubQuestData } from '@/types/tori-subquest';

/** Day 37 · 2-3 문법 탐험 · ~(으)ㄹ래요? / ~(으)ㄹ까요? */
export const day37Grammar: GrammarSubQuestData = {
  day: 7, level: 'intermediate', idx: 3, kind: 'grammar',
  koTitle: '문법 탐험',
  subtitle: '要不要 / 一起吧：~(으)ㄹ래 / ~(으)ㄹ까',

  fix: [
    { id: 'd37-g3-f1', promptKo: '뭐 먹ㄹ래요?',              promptZh: '"要吃什么？"哪句正确？',                    choices: [{ text: '뭐 먹ㄹ래요?',                    correct: false }, { text: '뭐 먹을래요?',                    correct: true }, { text: '뭐 먹까요?',                      correct: false }, { text: '뭐 먹래요?',                        correct: false }], explain: '먹다 有收音 ㄱ → **을래요**' },
    { id: 'd37-g3-f2', promptKo: '같이 갈을까?',              promptZh: '"一起去吧？"哪句正确？',                    choices: [{ text: '같이 갈을까?',                    correct: false }, { text: '같이 갈까?',                       correct: true }, { text: '같이 가ㄹ까?',                    correct: false }, { text: '같이 가까?',                        correct: false }], explain: '가다 无收音 → **ㄹ까** · 提议共同行动' },
    { id: 'd37-g3-f3', promptKo: '같이 산책하까요?',           promptZh: '"一起散步吗？"哪句正确？',                  choices: [{ text: '같이 산책하까요?',               correct: false }, { text: '같이 산책할까요?',                 correct: true }, { text: '같이 산책하ㄹ까요?',             correct: false }, { text: '같이 산책하니까?',                    correct: false }], explain: '산책하다 → **산책할까요** · 하다 直接 + ㄹ까' },
    { id: 'd37-g3-f4', promptZh: '关于「~(으)ㄹ까요?」的主语，哪句最准确？', choices: [{ text: '**提议**时隐含 우리（같이 갈까요?）；**推测**时可用第三人称（그 사람 언제 올까요?）', correct: true }, { text: '主语只能是"你 / 我 / 我们"，不能是第三人称', correct: false }, { text: '只能用于"他 / 她"，不能说自己', correct: false }, { text: '~ㄹ까요? 只用于长辈', correct: false }], explain: '~(으)ㄹ까요? 两个功能：提议(우리 같이 ___할까요?) + 推측(그 사람/내일 날씨…에 대한 추측)。推측时第三人称完全自然' },
    { id: 'd37-g3-f5', promptKo: '오늘 밤 훠궈 먹래?',          promptZh: '"今晚要吃火锅吗？"哪句正确？',              choices: [{ text: '오늘 밤 훠궈 먹래?',              correct: false }, { text: '오늘 밤 훠궈 먹을래?',             correct: true }, { text: '오늘 밤 훠궈 먹은래?',            correct: false }, { text: '오늘 밤 훠궈 먹래요?',                correct: false }], explain: '먹다 有收音 → **을래** · 반말去 요' },
  ],

  compose: [
    { id: 'd37-g3-c1', zhHint: '今晚要来我家吃火锅吗？',        audioKo: '오늘 밤에 우리 집에서 훠궈 먹을래?', answer: ['오늘 밤에', '우리 집에서', '훠궈', '먹을래?'],           tokens: ['오늘 밤에', '우리 집에서', '훠궈', '먹을래?', '먹을까?', '먹었어?', '먹어요?'],                       explain: 'Tori 邀约原句 · 询问对方意愿' },
    { id: 'd37-g3-c2', zhHint: '一起散步吗？',                  audioKo: '같이 산책할까요?',                     answer: ['같이', '산책할까요?'],                                   tokens: ['같이', '산책할까요?', '산책하까요?', '산책할래요?', '혼자', '산책해요?'],                             explain: '共同提议 · ~할까요' },
    { id: 'd37-g3-c3', zhHint: '你想喝什么？',                  audioKo: '뭐 마실래요?',                          answer: ['뭐', '마실래요?'],                                       tokens: ['뭐', '마실래요?', '마실까요?', '마실을래요?', '마셨어요?', '마시다요?'],                             explain: '询问客人偏好 · ~ㄹ래요' },
    { id: 'd37-g3-c4', zhHint: '几点去啊？',                    audioKo: '몇 시에 갈까?',                        answer: ['몇 시에', '갈까?'],                                     tokens: ['몇 시에', '갈까?', '갈래?', '가을까?', '가까?', '갔어?'],                                             explain: '提议共同时间 · ~ㄹ까' },
  ],

  rule: [
    { id: 'd37-g3-r1', promptZh: '关于「~(으)ㄹ래요?」的用法，哪句最准确？',    choices: [{ text: '询问**对方意愿** · "你要不要___" · 主语一般是"你 / 我"', correct: true }, { text: '提议共同行动',                     correct: false }, { text: '只能问过去',                     correct: false }, { text: '只能用于长辈',                      correct: false }], explain: '뭐 먹을래? = 你要吃什么' },
    { id: 'd37-g3-r2', promptZh: '关于「~(으)ㄹ까요?」的用法，哪句最准确？',    choices: [{ text: '**提议共同行动** · "我们要不要___" · 隐含 우리',   correct: true }, { text: '询问对方过去',                     correct: false }, { text: '只用于名词',                     correct: false }, { text: '主语必须第三人称',                  correct: false }], explain: '같이 갈까? = 我们一起去吧？' },
    { id: 'd37-g3-r3', promptZh: '关于收音判定，哪句最准确？',                    choices: [{ text: '无收音 → ㄹ래요/ㄹ까요；有收音 → 을래요/을까요；ㄹ 收音特殊直接 + ㄹ래/ㄹ까', correct: true }, { text: '所有词一律 + ㄹ',                  correct: false }, { text: '所有词一律 + 을',                  correct: false }, { text: '有收音 → ㄹ；无收音 → 을',         correct: false }], explain: '먹을래 / 갈래 / 만들래（ㄹ收音不重复）' },
    { id: 'd37-g3-r4', promptZh: '关于「~ㄹ래? vs ~ㄹ까?」的差别，哪句最准确？', choices: [{ text: '~ㄹ래? 强调**对方**意愿；~ㄹ까? 强调**共同**行动', correct: true }, { text: '两者完全一样',                     correct: false }, { text: '~ㄹ래? 是过去时',                   correct: false }, { text: '~ㄹ까? 是敬语',                     correct: false }], explain: '约饭多用 먹을래 · 商量方案多用 할까' },
  ],
};
