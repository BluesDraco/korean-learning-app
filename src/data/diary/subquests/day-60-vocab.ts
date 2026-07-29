import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 60 · 중급 졸업 · 词汇子关卡 */
export const day60Vocab: VocabSubQuestData = {
  day: 30, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '中级毕业的 8 个词',

  encounter: [
    { id: 'd60-v1-e1', korean: '졸업',       hangul: 'jo-reop',      zh: '毕业',       pos: '名词', example: { ko: '언어 학교를 졸업했어요.',       zh: '语言学校毕业了。' },   tip: '毕(졸) + 业(업) · 졸업식 = 毕业典礼',                            tier: 'core' },
    { id: 'd60-v1-e2', korean: '침묵',       hangul: 'chim-muk',     zh: '沉默',       pos: '名词', example: { ko: '3초 침묵 후에 박수.',           zh: '3 秒沉默后掌声。' },   tip: '沈(침) + 默(묵) · 침묵이 흐르다',                              tier: 'core' },
    { id: 'd60-v1-e3', korean: '헷갈리다',   hangul: 'het-gal-li-da', zh: '搞混',      pos: '动词', example: { ko: '집이랑 짐을 헷갈렸어요.',        zh: '把 집 和 짐 搞混了。' }, tip: 'Day 3 首犯 · Day 56 新生同犯',                                    tier: 'core' },
    { id: 'd60-v1-e4', korean: '입학',       hangul: 'i-pak',        zh: '入学',       pos: '名词', example: { ko: '대학 입학 준비반으로 올라갔어요.', zh: '升到大学入学准备班。' }, tip: '入(입) + 学(학) · 反 졸업',                                    tier: 'core' },
    { id: 'd60-v1-e5', korean: '가족',       hangul: 'ga-jok',       zh: '家人',       pos: '名词', example: { ko: '제 가족은 여기에 있어요.',       zh: '我的家人在这里。' },   tip: 'Day 40 复习 · Tori 重新定义家',                                  tier: 'core' },
    { id: 'd60-v1-e6', korean: '이야기',     hangul: 'i-ya-gi',      zh: '故事',       pos: '名词', example: { ko: '이 이야기는 이제 시작이야.',      zh: '这个故事现在才开始。' }, tip: '이야기하다 = 讲故事 · 얘기 缩略',                                tier: 'core' },
    { id: 'd60-v1-e7', korean: '박수',       hangul: 'bak-su',       zh: '掌声',       pos: '名词', example: { ko: '전체 박수.',                       zh: '全场掌声。' },         tip: 'Day 42 复习',                                                     tier: 'ext' },
    { id: 'd60-v1-e8', korean: '가져오다',   hangul: 'ga-jeo-o-da',   zh: '带来',       pos: '动词', example: { ko: '짐을 가져왔어요.',                 zh: '带了行李来。' },       tip: '가지다 + 오다 · 反义 가져가다',                                  tier: 'ext' },
  ],

  recognize: [
    { id: 'd60-v1-r1', korean: '졸업',      hangul: 'jo-reop',       choices: [{ zh: '毕业',      correct: true }, { zh: '入学',      correct: false }, { zh: '休学',      correct: false }, { zh: '转学',      correct: false }] },
    { id: 'd60-v1-r2', korean: '침묵',      hangul: 'chim-muk',      choices: [{ zh: '沉默',      correct: true }, { zh: '喧闹',      correct: false }, { zh: '掌声',      correct: false }, { zh: '欢呼',      correct: false }] },
    { id: 'd60-v1-r3', korean: '헷갈리다',  hangul: 'het-gal-li-da', choices: [{ zh: '搞混',      correct: true }, { zh: '分清',      correct: false }, { zh: '记住',      correct: false }, { zh: '想起',      correct: false }] },
    { id: 'd60-v1-r4', korean: '입학',      hangul: 'i-pak',         choices: [{ zh: '入学',      correct: true }, { zh: '毕业',      correct: false }, { zh: '毕业礼',    correct: false }, { zh: '考试',      correct: false }] },
    { id: 'd60-v1-r5', korean: '가족',      hangul: 'ga-jok',        choices: [{ zh: '家人',      correct: true }, { zh: '朋友',      correct: false }, { zh: '邻居',      correct: false }, { zh: '同事',      correct: false }] },
    { id: 'd60-v1-r6', korean: '이야기',    hangul: 'i-ya-gi',       choices: [{ zh: '故事',      correct: true }, { zh: '书',        correct: false }, { zh: '游戏',      correct: false }, { zh: '照片',      correct: false }] },
  ],

  spell: [
    { id: 'd60-v1-s1', zhHint: '毕业',      answer: ['졸', '업'], syllables: ['졸', '업', '졷', '엄'] },
    { id: 'd60-v1-s2', zhHint: '入学',      answer: ['입', '학'], syllables: ['입', '학', '읩', '학'] },
    { id: 'd60-v1-s3', zhHint: '故事',      answer: ['이', '야', '기'], syllables: ['이', '야', '기', '어'] },
    { id: 'd60-v1-s4', zhHint: '家人',      answer: ['가', '족'], syllables: ['가', '족', '가', '즉'] },
  ],

  write: [
    { id: 'd60-v1-w1', korean: '졸', hangul: 'jol',        wordKorean: '졸업',       wordZh: '毕业' },
    { id: 'd60-v1-w2', korean: '업', hangul: 'eop',        wordKorean: '졸업',       wordZh: '毕业' },
    { id: 'd60-v1-w3', korean: '입', hangul: 'ip',         wordKorean: '입학',       wordZh: '入学' },
    { id: 'd60-v1-w4', korean: '학', hangul: 'hak',        wordKorean: '입학',       wordZh: '入学' },
    { id: 'd60-v1-w5', korean: '가', hangul: 'ga',         wordKorean: '가족',       wordZh: '家人' },
    { id: 'd60-v1-w6', korean: '족', hangul: 'jok',        wordKorean: '가족',       wordZh: '家人' },
    { id: 'd60-v1-w7', korean: '이', hangul: 'i',          wordKorean: '이야기',     wordZh: '故事' },
    { id: 'd60-v1-w8', korean: '야', hangul: 'ya',         wordKorean: '이야기',     wordZh: '故事' },
  ],

  dictation: [
    { id: 'd60-v1-d1', korean: '짐을 가져왔지만',                hangul: 'ji-meul ga-jyeo-wat-ji-man',            syllables: ['짐', '을', '가', '져', '왔', '지', '만'], zh: '虽然带来了行李' },
    { id: 'd60-v1-d2', korean: '지금은 집이 있어요',              hangul: 'ji-geu-meun ji-bi i-sseo-yo',           syllables: ['지', '금', '은', '집', '이', '있', '어', '요'], zh: '现在有了家' },
    { id: 'd60-v1-d3', korean: '제 가족은 여기에 있어요',         hangul: 'je ga-jo-geun yeo-gi-e i-sseo-yo',      syllables: ['제', '가', '족', '은', '여', '기', '에', '있', '어', '요'], zh: '我的家人在这里' },
  ],
};
