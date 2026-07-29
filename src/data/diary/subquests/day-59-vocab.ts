import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 59 · 예행연습 · 词汇子关卡 */
export const day59Vocab: VocabSubQuestData = {
  day: 29, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '毕业典礼预演的 8 个词',

  encounter: [
    { id: 'd59-v1-e1', korean: '예행연습',   hangul: 'ye-haeng-yeon-seup', zh: '预演',    pos: '名词',   example: { ko: '내일 졸업식 예행연습이에요.', zh: '明天毕业典礼预演。' }, tip: '예행(预行) + 연습(练习)',                                        tier: 'core' },
    { id: 'd59-v1-e2', korean: '원고',       hangul: 'won-go',            zh: '稿子',    pos: '名词',   example: { ko: '원고를 여덟 번 고쳤어요.',    zh: '改了 8 遍稿子。' },   tip: '原(원) + 稿(고)',                                              tier: 'core' },
    { id: 'd59-v1-e3', korean: '고치다',     hangul: 'go-chi-da',         zh: '修改',    pos: '动词',   example: { ko: '원고를 여러 번 고쳤어요.',    zh: '稿子改了好几遍。' },   tip: '고치다 → 고쳤어요',                                             tier: 'core' },
    { id: 'd59-v1-e4', korean: '화이팅',     hangul: 'hwa-i-ting',        zh: '加油',    pos: '感叹词', example: { ko: '토리, 화이팅!',                zh: '兔莉，加油！' },       tip: 'fighting 外来 · 韩国最日常加油词',                              tier: 'core' },
    { id: 'd59-v1-e5', korean: '거울',       hangul: 'geo-ul',            zh: '镜子',    pos: '名词',   example: { ko: '거울 앞에서 연습했어요.',      zh: '在镜子前练习了。' },   tip: '거울 보다 = 照镜子',                                            tier: 'core' },
    { id: 'd59-v1-e6', korean: '살다',       hangul: 'sal-da',            zh: '生活 / 住', pos: '动词',   example: { ko: '이제 정말 여기서 살아요.',    zh: '现在真的住在这里了。' }, tip: 'ㄹ 词干 · 살다 → 살아요',                                       tier: 'core' },
    { id: 'd59-v1-e7', korean: '마음',       hangul: 'ma-eum',            zh: '心',      pos: '名词',   example: { ko: '아직 마음에 안 들어.',          zh: '还不满意。' },         tip: '마음에 안 들다 = 不满意 (惯用)',                                tier: 'ext' },
    { id: 'd59-v1-e8', korean: '떨리다',     hangul: 'tteol-li-da',       zh: '紧张 / 抖', pos: '动词',   example: { ko: '손이 떨렸어요.',              zh: '手抖了。' },           tip: 'Day 43 复习 · 감정 상태',                                       tier: 'ext' },
  ],

  recognize: [
    { id: 'd59-v1-r1', korean: '예행연습',   hangul: 'ye-haeng-yeon-seup', choices: [{ zh: '预演',        correct: true }, { zh: '正式演出',    correct: false }, { zh: '总结',        correct: false }, { zh: '休息',        correct: false }] },
    { id: 'd59-v1-r2', korean: '원고',       hangul: 'won-go',             choices: [{ zh: '稿子',        correct: true }, { zh: '书',          correct: false }, { zh: '信',          correct: false }, { zh: '海报',        correct: false }] },
    { id: 'd59-v1-r3', korean: '고치다',     hangul: 'go-chi-da',          choices: [{ zh: '修改',        correct: true }, { zh: '删除',        correct: false }, { zh: '完成',        correct: false }, { zh: '打印',        correct: false }] },
    { id: 'd59-v1-r4', korean: '화이팅',     hangul: 'hwa-i-ting',         choices: [{ zh: '加油',        correct: true }, { zh: '再见',        correct: false }, { zh: '你好',        correct: false }, { zh: '晚安',        correct: false }] },
    { id: 'd59-v1-r5', korean: '거울',       hangul: 'geo-ul',             choices: [{ zh: '镜子',        correct: true }, { zh: '玻璃',        correct: false }, { zh: '窗户',        correct: false }, { zh: '相框',        correct: false }] },
    { id: 'd59-v1-r6', korean: '살다',       hangul: 'sal-da',             choices: [{ zh: '生活 / 住',   correct: true }, { zh: '死',          correct: false }, { zh: '来',          correct: false }, { zh: '离开',        correct: false }] },
  ],

  spell: [
    { id: 'd59-v1-s1', zhHint: '预演（예행）', answer: ['예', '행'], syllables: ['예', '행', '예', '항'] },
    { id: 'd59-v1-s2', zhHint: '稿子',        answer: ['원', '고'], syllables: ['원', '고', '원', '구'] },
    { id: 'd59-v1-s3', zhHint: '修改（고쳐）', answer: ['고', '쳐'], syllables: ['고', '쳐', '고', '쳤'] },
    { id: 'd59-v1-s4', zhHint: '镜子',        answer: ['거', '울'], syllables: ['거', '울', '겨', '울'] },
  ],

  write: [
    { id: 'd59-v1-w1', korean: '예', hangul: 'ye',         wordKorean: '예행연습',   wordZh: '预演' },
    { id: 'd59-v1-w2', korean: '행', hangul: 'haeng',      wordKorean: '예행연습',   wordZh: '预演' },
    { id: 'd59-v1-w3', korean: '원', hangul: 'won',        wordKorean: '원고',       wordZh: '稿子' },
    { id: 'd59-v1-w4', korean: '고', hangul: 'go',         wordKorean: '원고',       wordZh: '稿子' },
    { id: 'd59-v1-w5', korean: '거', hangul: 'geo',        wordKorean: '거울',       wordZh: '镜子' },
    { id: 'd59-v1-w6', korean: '울', hangul: 'ul',         wordKorean: '거울',       wordZh: '镜子' },
    { id: 'd59-v1-w7', korean: '살', hangul: 'sal',        wordKorean: '살다',       wordZh: '住' },
    { id: 'd59-v1-w8', korean: '마', hangul: 'ma',         wordKorean: '마음',       wordZh: '心' },
  ],

  dictation: [
    { id: 'd59-v1-d1', korean: '할 수 있어',                hangul: 'hal su i-sseo',                  syllables: ['할', '수', '있', '어'],                   zh: '能做到' },
    { id: 'd59-v1-d2', korean: '화이팅',                    hangul: 'hwa-i-ting',                     syllables: ['화', '이', '팅'],                         zh: '加油' },
    { id: 'd59-v1-d3', korean: '마음에 안 들어',              hangul: 'ma-eu-me an deu-reo',            syllables: ['마', '음', '에', '안', '들', '어'],       zh: '不满意' },
  ],
};
