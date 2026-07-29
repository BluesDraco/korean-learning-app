import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 42 · 讲台上的火锅 · 词汇子关卡 */
export const day42Vocab: VocabSubQuestData = {
  day: 12, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '讲台上的 8 个词',

  encounter: [
    { id: 'd42-v1-e1', korean: '강당',   hangul: 'gang-dang', zh: '大礼堂 / 讲堂', pos: '名词',   example: { ko: '강당에서 발표해요.',              zh: '在讲堂发表。' },     tip: '讲(강) + 堂(당)',                                            tier: 'core' },
    { id: 'd42-v1-e2', korean: '박수',   hangul: 'bak-su',    zh: '掌声',          pos: '名词',   example: { ko: '박수를 받았어요.',                zh: '得到掌声。' },       tip: '拍(박) + 手(수) · 박수를 치다 = 鼓掌',                        tier: 'core' },
    { id: 'd42-v1-e3', korean: '핵심',   hangul: 'haek-sim',  zh: '核心',          pos: '名词',   example: { ko: '훠궈의 핵심은 함께예요.',        zh: '火锅的核心是一起。' }, tip: '核(핵) + 心(심)',                                            tier: 'core' },
    { id: 'd42-v1-e4', korean: '바로',   hangul: 'ba-ro',     zh: '就是 / 正是',   pos: '副词',   example: { ko: '바로 함께예요.',                  zh: '就是"一起"。' },     tip: '强调答案的副词 · 바로 + N = 就是 N',                          tier: 'core' },
    { id: 'd42-v1-e5', korean: '음식',   hangul: 'eum-sik',   zh: '食物',          pos: '名词',   example: { ko: '중국 음식은 다양해요.',            zh: '中国食物多样。' },   tip: '饮(음) + 食(식) · 요리(成品) vs 음식(食物更广)',              tier: 'core' },
    { id: 'd42-v1-e6', korean: '음악',   hangul: 'eu-mak',    zh: '音乐',          pos: '名词',   example: { ko: '음악이 흐르면 마음이 편해요.',    zh: '音乐流淌心就安。' }, tip: '音(음) + 乐(악)',                                            tier: 'core' },
    { id: 'd42-v1-e7', korean: '응원',   hangul: 'eung-won',  zh: '应援 / 加油',   pos: '名词',   example: { ko: '함께 응원해요.',                    zh: '一起应援。' },       tip: '응원(应援) + 하다 = 应援 · KPOP 콘서트 关键词',                tier: 'ext' },
    { id: 'd42-v1-e8', korean: '공연',   hangul: 'gong-yeon', zh: '演出',          pos: '名词',   example: { ko: 'KPOP 공연을 봤어요.',              zh: '看了 KPOP 演出。' }, tip: '公(공) + 演(연) · 콘서트 = 공연',                             tier: 'ext' },
  ],

  recognize: [
    { id: 'd42-v1-r1', korean: '강당',   hangul: 'gang-dang', choices: [{ zh: '大礼堂',      correct: true }, { zh: '教室',      correct: false }, { zh: '走廊',    correct: false }, { zh: '操场',    correct: false }] },
    { id: 'd42-v1-r2', korean: '박수',   hangul: 'bak-su',    choices: [{ zh: '掌声',        correct: true }, { zh: '汗',        correct: false }, { zh: '票',      correct: false }, { zh: '灯',      correct: false }] },
    { id: 'd42-v1-r3', korean: '핵심',   hangul: 'haek-sim',  choices: [{ zh: '核心',        correct: true }, { zh: '边缘',      correct: false }, { zh: '错误',    correct: false }, { zh: '细节',    correct: false }] },
    { id: 'd42-v1-r4', korean: '바로',   hangul: 'ba-ro',     choices: [{ zh: '就是 / 正是', correct: true }, { zh: '慢慢',      correct: false }, { zh: '几乎',    correct: false }, { zh: '大概',    correct: false }] },
    { id: 'd42-v1-r5', korean: '음식',   hangul: 'eum-sik',   choices: [{ zh: '食物',        correct: true }, { zh: '声音',      correct: false }, { zh: '装饰',    correct: false }, { zh: '味道',    correct: false }] },
    { id: 'd42-v1-r6', korean: '음악',   hangul: 'eu-mak',    choices: [{ zh: '音乐',        correct: true }, { zh: '声音',      correct: false }, { zh: '演讲',    correct: false }, { zh: '语音',    correct: false }] },
  ],

  spell: [
    { id: 'd42-v1-s1', zhHint: '掌声',       answer: ['박', '수'], syllables: ['박', '수', '반', '수'] },
    { id: 'd42-v1-s2', zhHint: '核心',       answer: ['핵', '심'], syllables: ['핵', '심', '학', '심'] },
    { id: 'd42-v1-s3', zhHint: '食物',       answer: ['음', '식'], syllables: ['음', '식', '음', '심'] },
    { id: 'd42-v1-s4', zhHint: '音乐',       answer: ['음', '악'], syllables: ['음', '악', '음', '안'] },
  ],

  write: [
    { id: 'd42-v1-w1', korean: '강', hangul: 'gang',       wordKorean: '강당',    wordZh: '讲堂' },
    { id: 'd42-v1-w2', korean: '당', hangul: 'dang',       wordKorean: '강당',    wordZh: '讲堂' },
    { id: 'd42-v1-w3', korean: '박', hangul: 'bak',        wordKorean: '박수',    wordZh: '掌声' },
    { id: 'd42-v1-w4', korean: '수', hangul: 'su',         wordKorean: '박수',    wordZh: '掌声' },
    { id: 'd42-v1-w5', korean: '핵', hangul: 'haek',       wordKorean: '핵심',    wordZh: '核心' },
    { id: 'd42-v1-w6', korean: '심', hangul: 'sim',        wordKorean: '핵심',    wordZh: '核心' },
    { id: 'd42-v1-w7', korean: '바', hangul: 'ba',         wordKorean: '바로',    wordZh: '就是' },
    { id: 'd42-v1-w8', korean: '로', hangul: 'ro',         wordKorean: '바로',    wordZh: '就是' },
  ],

  dictation: [
    { id: 'd42-v1-d1', korean: '함께 먹으면 훠궈',    hangul: 'ham-kke meo-geu-myeon hwo-gwo',      syllables: ['함', '께', '먹', '으', '면', '훠', '궈'],   zh: '一起吃就是火锅' },
    { id: 'd42-v1-d2', korean: '박수를 받았어요',      hangul: 'bak-su-reul ba-da-sseo-yo',          syllables: ['박', '수', '를', '받', '았', '어', '요'],    zh: '得到了掌声' },
    { id: 'd42-v1-d3', korean: '들어주셔서 감사합니다', hangul: 'deu-reo-ju-syeo-seo gam-sa-ham-ni-da', syllables: ['들', '어', '주', '셔', '서', '감', '사', '합', '니', '다'], zh: '感谢大家聆听' },
  ],
};
