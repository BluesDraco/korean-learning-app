import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 61 · 3-1 단어 마스터 · 高级班第一天 · Danielle 完美得不真实 */
export const day61Vocab: VocabSubQuestData = {
  day: 1, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '高级班第一天的 8 个词', subtitleEn: '8 words from the first day of the advanced class',

  encounter: [
    { id: 'd61-v1-e1', korean: '고급반',      hangul: 'go-geup-ban',      zh: '高级班', zhEn: 'Advanced class',    pos: '名词', posEn: 'Noun',   example: { ko: '오늘부터 고급반이에요.',           zh: '从今天起是高级班。', zhEn: 'Starting today, it\'s the advanced class.' },       tip: '高(고) + 级(급) + 班(반) · 초급반 → 중급반 → 고급반', tipEn: '고(high) + 급(level) + 반(class) · beginner class → intermediate class → advanced class',                          tier: 'core' },
    { id: 'd61-v1-e2', korean: '원어민',      hangul: 'won-eo-min',       zh: '母语者', zhEn: 'native speaker',    pos: '名词', posEn: 'Noun',   example: { ko: '다니엘은 원어민처럼 발음해요.',      zh: 'Danielle 发音像母语者。', zhEn: 'Danielle\'s pronunciation is like a native speaker\'s.' },   tip: '原(원) + 语(어) + 民(민) · 学韩语最想变成的对象', tipEn: '원(native) + 어(language) + 민(person) · Who every Korean learner wants to become',                              tier: 'core' },
    { id: 'd61-v1-e3', korean: '자신감',      hangul: 'ja-sin-gam',       zh: '自信', zhEn: 'confidence',       pos: '名词', posEn: 'Noun',   example: { ko: '자신감이 떨어졌어요.',              zh: '自信心低落。', zhEn: 'Low self-confidence.' },             tip: '자신(自信) + 感(감) · 자신감이 떨어지다 / 자신감이 생기다', tipEn: '자신(self-confidence) + 감(feeling) · self-confidence drops / self-confidence grows',                     tier: 'core' },
    { id: 'd61-v1-e4', korean: '차이',         hangul: 'cha-i',            zh: '差别 / 差距', zhEn: 'Difference / gap', pos: '名词', posEn: 'Noun', example: { ko: '실력 차이가 커요.',                 zh: '实力差距很大。', zhEn: 'The skill gap is huge.' },           tip: 'Day 56 学过 · 이 날은 实力 差距', tipEn: 'Learned on Day 56 · That day was about the skill gap',                                              tier: 'core' },
    { id: 'd61-v1-e5', korean: '틀리다',      hangul: 'teul-li-da',       zh: '错 / 答错', zhEn: 'Wrong / answered incorrectly',  pos: '动词', posEn: 'Verb',   example: { ko: '문법 하나도 안 틀렸어요.',          zh: '语法一处都没错。', zhEn: 'Not a single grammar mistake.' },         tip: '반의어 = 맞다（对）· 시험 / 답변 자주 씀', tipEn: 'Antonym = 맞다 (correct) · Commonly used in tests / responses',                                     tier: 'core' },
    { id: 'd61-v1-e6', korean: '실력',         hangul: 'sil-lyeok',        zh: '实力', zhEn: 'skill',       pos: '名词', posEn: 'Noun',   example: { ko: '실력 차이가 커요.',                 zh: '实力差距大。', zhEn: 'The gap in skill is big.' },             tip: 'Day 31 · 43 学过 · 이 날은 自己를 낮게 봄', tipEn: 'Day 31 · 43 learned · This day, I see myself lowly',                                    tier: 'core' },
    { id: 'd61-v1-e7', korean: '별',           hangul: 'byeol',            zh: '星星', zhEn: 'star',       pos: '名词', posEn: 'Noun',   example: { ko: '눈이 별처럼 빛나요.',              zh: '眼睛像星星一样闪。', zhEn: 'Eyes sparkle like stars.' },       tip: '무 받침 → 별처럼（比喻高频）· 별빛 = 星光',                                    tier: 'ext' },
    { id: 'd61-v1-e8', korean: '뉴스',         hangul: 'nyu-seu',          zh: '新闻', zhEn: 'news',       pos: '名词', posEn: 'Noun',   example: { ko: '어휘가 뉴스 기자 수준이에요.',      zh: '词汇是新闻记者水平。', zhEn: 'Vocabulary is at a news reporter\'s level.' },     tip: '外来语 news · 뉴스 앵커 / 뉴스 기자', tipEn: 'Loanword news · news anchor / news reporter',                                          tier: 'ext' },
  ],

  recognize: [
    { id: 'd61-v1-r1', korean: '고급반',   hangul: 'go-geup-ban',      choices: [{ zh: '高级班', zhEn: 'Advanced class',      correct: true }, { zh: '中级班', zhEn: 'Intermediate class',      correct: false }, { zh: '初级班', zhEn: 'beginner class',      correct: false }, { zh: '会话班', zhEn: 'conversation class',      correct: false }] },
    { id: 'd61-v1-r2', korean: '원어민',   hangul: 'won-eo-min',       choices: [{ zh: '母语者', zhEn: 'native speaker',      correct: true }, { zh: '外国人', zhEn: 'foreigner',      correct: false }, { zh: '留学生', zhEn: 'international student',      correct: false }, { zh: '语言老师', zhEn: 'language teacher',    correct: false }] },
    { id: 'd61-v1-r3', korean: '자신감',   hangul: 'ja-sin-gam',       choices: [{ zh: '自信', zhEn: 'confidence',        correct: true }, { zh: '骄傲', zhEn: 'pride',        correct: false }, { zh: '努力', zhEn: 'effort',        correct: false }, { zh: '灵感', zhEn: 'inspiration',        correct: false }] },
    { id: 'd61-v1-r4', korean: '차이',      hangul: 'cha-i',            choices: [{ zh: '差别 / 差距', zhEn: 'Difference / gap', correct: true }, { zh: '相同', zhEn: 'same',        correct: false }, { zh: '距离', zhEn: 'Distance',        correct: false }, { zh: '选择', zhEn: 'choice',        correct: false }] },
    { id: 'd61-v1-r5', korean: '틀리다',   hangul: 'teul-li-da',       choices: [{ zh: '错 / 答错', zhEn: 'Wrong / answered incorrectly',   correct: true }, { zh: '对', zhEn: 'Correct',          correct: false }, { zh: '掉落', zhEn: 'fall',        correct: false }, { zh: '换掉', zhEn: 'replace',        correct: false }] },
    { id: 'd61-v1-r6', korean: '실력',      hangul: 'sil-lyeok',        choices: [{ zh: '实力', zhEn: 'skill',        correct: true }, { zh: '努力', zhEn: 'effort',        correct: false }, { zh: '压力', zhEn: 'pressure',        correct: false }, { zh: '实话', zhEn: 'truth',        correct: false }] },
  ],

  spell: [
    { id: 'd61-v1-s1', zhHint: '高级', zhHintEn: 'Advanced',      answer: ['고', '급'], syllables: ['고', '급', '거', '금'] },
    { id: 'd61-v1-s2', zhHint: '母语', zhHintEn: 'native language',      answer: ['원', '어'], syllables: ['원', '어', '완', '오'] },
    { id: 'd61-v1-s3', zhHint: '自信', zhHintEn: 'confidence',      answer: ['자', '신'], syllables: ['자', '신', '주', '심'] },
    { id: 'd61-v1-s4', zhHint: '实力', zhHintEn: 'skill',      answer: ['실', '력'], syllables: ['실', '력', '신', '역'] },
  ],

  write: [
    { id: 'd61-v1-w1', korean: '고', hangul: 'go',       wordKorean: '고급반', wordZh: '高级班', wordZhEn: 'Advanced class' },
    { id: 'd61-v1-w2', korean: '급', hangul: 'geup',     wordKorean: '고급반', wordZh: '高级班', wordZhEn: 'Advanced class' },
    { id: 'd61-v1-w3', korean: '원', hangul: 'won',      wordKorean: '원어민', wordZh: '母语者', wordZhEn: 'native speaker' },
    { id: 'd61-v1-w4', korean: '어', hangul: 'eo',       wordKorean: '원어민', wordZh: '母语者', wordZhEn: 'native speaker' },
    { id: 'd61-v1-w5', korean: '민', hangul: 'min',      wordKorean: '원어민', wordZh: '母语者', wordZhEn: 'native speaker' },
    { id: 'd61-v1-w6', korean: '자', hangul: 'ja',       wordKorean: '자신감', wordZh: '自信', wordZhEn: 'confidence' },
    { id: 'd61-v1-w7', korean: '차', hangul: 'cha',      wordKorean: '차이',   wordZh: '差距', wordZhEn: 'gap' },
    { id: 'd61-v1-w8', korean: '별', hangul: 'byeol',    wordKorean: '별',     wordZh: '星星', wordZhEn: 'star' },
  ],

  dictation: [
    { id: 'd61-v1-d1', korean: '원어민처럼 발음해요',    hangul: 'won-eo-min-cheo-reom ba-reu-mae-yo', syllables: ['원', '어', '민', '처', '럼', '발', '음', '해', '요'], zh: '发音像母语者', zhEn: 'Pronunciation sounds like a native speaker.' },
    { id: 'd61-v1-d2', korean: '실력 차이가 커요',        hangul: 'sil-lyeok cha-i-ga keo-yo',           syllables: ['실', '력', '차', '이', '가', '커', '요'],           zh: '实力差距很大', zhEn: 'The gap in skill is huge.' },
    { id: 'd61-v1-d3', korean: '눈이 별처럼 빛나요',      hangul: 'nu-ni byeol-cheo-reom bin-na-yo',     syllables: ['눈', '이', '별', '처', '럼', '빛', '나', '요'],     zh: '眼睛像星星一样闪', zhEn: 'Eyes sparkle like stars.' },
  ],
};
