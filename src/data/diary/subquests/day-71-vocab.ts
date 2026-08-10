import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 71 · 3-1 단어 마스터 · KTX 첫 여행 · 부산행 */
export const day71Vocab: VocabSubQuestData = {
  day: 11, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: 'KTX 부산행 8 个词',

  encounter: [
    { id: 'd71-v1-e1', korean: '기차',       hangul: 'gi-cha',        zh: '火车',       pos: '名词',   example: { ko: '기차를 타요.',                        zh: '坐火车。' },              tip: '汽(기) + 车(차) · 기차역 = 火车站',                                          tier: 'core' },
    { id: 'd71-v1-e2', korean: '표',          hangul: 'pyo',           zh: '票',         pos: '名词',   example: { ko: 'KTX 표를 샀어요.',                     zh: '买了 KTX 车票。' },       tip: '표를 사다 = 买票 / 표를 예매하다 = 订票',                                    tier: 'core' },
    { id: 'd71-v1-e3', korean: '역',          hangul: 'yeok',          zh: '站',         pos: '名词',   example: { ko: '서울역에서 만나요.',                  zh: '在首尔站见。' },          tip: '车站汉字词 · 서울역 [서울력] · 有 ㄴ 첨가',                                  tier: 'core' },
    { id: 'd71-v1-e4', korean: '여행',        hangul: 'yeo-haeng',     zh: '旅行',       pos: '名词',   example: { ko: '첫 여행이에요.',                       zh: '是第一次旅行。' },        tip: '旅(여) + 行(행) · 여행하다 · 여행 가다',                                    tier: 'core' },
    { id: 'd71-v1-e5', korean: '출발하다',    hangul: 'chul-bal-ha-da', zh: '出发',       pos: '动词',   example: { ko: '9시에 출발해요.',                      zh: '9 点出发。' },            tip: '出(출) + 发(발) + 하다 · 출발 시간 = 出发时间',                              tier: 'core' },
    { id: 'd71-v1-e6', korean: '도착하다',    hangul: 'do-chak-ha-da',  zh: '到达',       pos: '动词',   example: { ko: '2시간 만에 도착해요.',                zh: '2 小时后到达。' },        tip: '到(도) + 着(착) + 하다 · Day 71 主题动词',                                   tier: 'core' },
    { id: 'd71-v1-e7', korean: '만에',        hangul: 'ma-ne',          zh: '(时间)之后 / 隔了……', pos: '语法名词', example: { ko: '60일 만에 서울을 떠나요.',   zh: '60 天后离开首尔。' },     tip: 'Day 71 主题词 · N + 만에 = 隔了……才 · 语感 = 时隔',                          tier: 'core' },
    { id: 'd71-v1-e8', korean: '설레다',      hangul: 'seol-le-da',     zh: '心动 / 激动',pos: '动词',   example: { ko: '진짜 설레요.',                         zh: '真的很激动。' },          tip: '~아어요 · 설레요（不是 설레어요）· 여행 前的情绪',                            tier: 'ext' },
  ],

  recognize: [
    { id: 'd71-v1-r1', korean: '기차',        hangul: 'gi-cha',         choices: [{ zh: '火车',      correct: true }, { zh: '公交',       correct: false }, { zh: '飞机',       correct: false }, { zh: '地铁',       correct: false }] },
    { id: 'd71-v1-r2', korean: '표',           hangul: 'pyo',            choices: [{ zh: '票',        correct: true }, { zh: '钱',         correct: false }, { zh: '牌子',       correct: false }, { zh: '证件',       correct: false }] },
    { id: 'd71-v1-r3', korean: '역',           hangul: 'yeok',           choices: [{ zh: '站',        correct: true }, { zh: '路',         correct: false }, { zh: '入口',       correct: false }, { zh: '角',         correct: false }] },
    { id: 'd71-v1-r4', korean: '여행',         hangul: 'yeo-haeng',      choices: [{ zh: '旅行',      correct: true }, { zh: '出差',       correct: false }, { zh: '通勤',       correct: false }, { zh: '搬家',       correct: false }] },
    { id: 'd71-v1-r5', korean: '출발하다',     hangul: 'chul-bal-ha-da', choices: [{ zh: '出发',      correct: true }, { zh: '出门（离家）', correct: false }, { zh: '出席',       correct: false }, { zh: '出去',       correct: false }] },
    { id: 'd71-v1-r6', korean: '도착하다',     hangul: 'do-chak-ha-da',  choices: [{ zh: '到达',      correct: true }, { zh: '出发',       correct: false }, { zh: '路过',       correct: false }, { zh: '出席',       correct: false }] },
  ],

  spell: [
    { id: 'd71-v1-s1', zhHint: '火车',    answer: ['기', '차'], syllables: ['기', '차', '기', '자'] },
    { id: 'd71-v1-s2', zhHint: '车站',    answer: ['서', '울', '역'], syllables: ['서', '울', '역', '설', '을', '엽'] },
    { id: 'd71-v1-s3', zhHint: '旅行',    answer: ['여', '행'], syllables: ['여', '행', '요', '헝'] },
    { id: 'd71-v1-s4', zhHint: '出发',    answer: ['출', '발'], syllables: ['출', '발', '춘', '반'] },
  ],

  write: [
    { id: 'd71-v1-w1', korean: '기', hangul: 'gi',        wordKorean: '기차',      wordZh: '火车' },
    { id: 'd71-v1-w2', korean: '차', hangul: 'cha',       wordKorean: '기차',      wordZh: '火车' },
    { id: 'd71-v1-w3', korean: '표', hangul: 'pyo',       wordKorean: '표',        wordZh: '票' },
    { id: 'd71-v1-w4', korean: '역', hangul: 'yeok',      wordKorean: '서울역',    wordZh: '首尔站' },
    { id: 'd71-v1-w5', korean: '여', hangul: 'yeo',       wordKorean: '여행',      wordZh: '旅行' },
    { id: 'd71-v1-w6', korean: '행', hangul: 'haeng',     wordKorean: '여행',      wordZh: '旅行' },
    { id: 'd71-v1-w7', korean: '출', hangul: 'chul',      wordKorean: '출발하다',  wordZh: '出发' },
    { id: 'd71-v1-w8', korean: '도', hangul: 'do',        wordKorean: '도착하다',  wordZh: '到达' },
  ],

  dictation: [
    { id: 'd71-v1-d1', korean: '60일 만에 서울을 떠나요',            hangul: 'yuk-sip-il ma-ne seo-u-reul tteo-na-yo',       syllables: ['60', '일', '만', '에', '서', '울', '을', '떠', '나', '요'], zh: '时隔 60 天离开首尔' },
    { id: 'd71-v1-d2', korean: '2시간 만에 부산에 도착해요',          hangul: 'du-si-gan ma-ne bu-sa-ne do-cha-kae-yo',       syllables: ['2', '시', '간', '만', '에', '부', '산', '에', '도', '착', '해', '요'], zh: '2 小时后到达釜山' },
    { id: 'd71-v1-d3', korean: '첫 여행이라서 설레요',                 hangul: 'cheot yeo-haeng-i-ra-seo seol-le-yo',          syllables: ['첫', '여', '행', '이', '라', '서', '설', '레', '요'],  zh: '因为是第一次旅行，很激动' },
  ],
};
