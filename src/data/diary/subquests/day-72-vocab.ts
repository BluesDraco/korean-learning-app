import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 72 · 3-1 단어 마스터 · 해운대 */
export const day72Vocab: VocabSubQuestData = {
  day: 12, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '해운대 8 个词',

  encounter: [
    { id: 'd72-v1-e1', korean: '바다',       hangul: 'ba-da',         zh: '海',         pos: '名词',   example: { ko: '바다가 넓어요.',                    zh: '海很宽。' },              tip: '해운대 바다 · Day 71 KTX 收束',                                              tier: 'core' },
    { id: 'd72-v1-e2', korean: '파도',       hangul: 'pa-do',         zh: '海浪',       pos: '名词',   example: { ko: '파도 소리를 들어요.',              zh: '听海浪的声音。' },        tip: '波(파) + 涛(도) · 파도 소리 = 浪声',                                        tier: 'core' },
    { id: 'd72-v1-e3', korean: '모래',       hangul: 'mo-rae',        zh: '沙',         pos: '名词',   example: { ko: '모래가 따뜻해요.',                  zh: '沙子很暖。' },            tip: '해운대 모래사장 = 海云台沙滩',                                              tier: 'core' },
    { id: 'd72-v1-e4', korean: '갈매기',     hangul: 'gal-mae-gi',    zh: '海鸥',       pos: '名词',   example: { ko: '갈매기가 날아요.',                  zh: '海鸥飞。' },              tip: '해운대 갈매기 名场面 · 새우깡 = 虾条 · 喂海鸥',                              tier: 'core' },
    { id: 'd72-v1-e5', korean: '회',          hangul: 'hoe',           zh: '生鱼片',     pos: '名词',   example: { ko: '이 회는 신선해요.',                  zh: '这生鱼片很新鲜。' },      tip: '자갈치 시장 名物 · 회 한 접시 = 一盘生鱼片',                                tier: 'core' },
    { id: 'd72-v1-e6', korean: '만하다',     hangul: 'man-ha-da',     zh: '值得 / 可以…', pos: '语法动词', example: { ko: '가 볼 만해요.',                        zh: '值得去看看。' },          tip: 'Day 72 主题词 · V + (으)ㄹ 만하다',                                          tier: 'core' },
    { id: 'd72-v1-e7', korean: '풍경',       hangul: 'pung-gyeong',   zh: '风景',       pos: '名词',   example: { ko: '풍경이 정말 좋아요.',              zh: '风景真的很好。' },        tip: '风(풍) + 景(경) · 풍경 사진 = 风景照',                                       tier: 'ext' },
    { id: 'd72-v1-e8', korean: '추천하다',    hangul: 'chu-cheon-ha-da', zh: '推荐',    pos: '动词',   example: { ko: '해운대를 추천해요.',                zh: '推荐海云台。' },          tip: '推(추) + 荐(천) + 하다 · Day 72 场景高频',                                    tier: 'ext' },
  ],

  recognize: [
    { id: 'd72-v1-r1', korean: '바다',        hangul: 'ba-da',         choices: [{ zh: '海',       correct: true }, { zh: '河',         correct: false }, { zh: '湖',         correct: false }, { zh: '池塘',       correct: false }] },
    { id: 'd72-v1-r2', korean: '파도',        hangul: 'pa-do',         choices: [{ zh: '海浪',     correct: true }, { zh: '沙',         correct: false }, { zh: '风',         correct: false }, { zh: '水花',       correct: false }] },
    { id: 'd72-v1-r3', korean: '모래',        hangul: 'mo-rae',        choices: [{ zh: '沙',       correct: true }, { zh: '土',         correct: false }, { zh: '水',         correct: false }, { zh: '石头',       correct: false }] },
    { id: 'd72-v1-r4', korean: '갈매기',      hangul: 'gal-mae-gi',    choices: [{ zh: '海鸥',     correct: true }, { zh: '燕子',       correct: false }, { zh: '鸽子',       correct: false }, { zh: '乌鸦',       correct: false }] },
    { id: 'd72-v1-r5', korean: '회',           hangul: 'hoe',           choices: [{ zh: '生鱼片',   correct: true }, { zh: '烤肉',       correct: false }, { zh: '汤',         correct: false }, { zh: '面',         correct: false }] },
    { id: 'd72-v1-r6', korean: '추천하다',    hangul: 'chu-cheon-ha-da', choices: [{ zh: '推荐',   correct: true }, { zh: '选择',       correct: false }, { zh: '介绍',       correct: false }, { zh: '决定',       correct: false }] },
  ],

  spell: [
    { id: 'd72-v1-s1', zhHint: '海',      answer: ['바', '다'], syllables: ['바', '다', '파', '타'] },
    { id: 'd72-v1-s2', zhHint: '海浪',    answer: ['파', '도'], syllables: ['파', '도', '바', '토'] },
    { id: 'd72-v1-s3', zhHint: '海鸥',    answer: ['갈', '매', '기'], syllables: ['갈', '매', '기', '길', '메', '거'] },
    { id: 'd72-v1-s4', zhHint: '风景',    answer: ['풍', '경'], syllables: ['풍', '경', '풍', '경이'] },
  ],

  write: [
    { id: 'd72-v1-w1', korean: '바', hangul: 'ba',        wordKorean: '바다',      wordZh: '海' },
    { id: 'd72-v1-w2', korean: '다', hangul: 'da',        wordKorean: '바다',      wordZh: '海' },
    { id: 'd72-v1-w3', korean: '파', hangul: 'pa',        wordKorean: '파도',      wordZh: '海浪' },
    { id: 'd72-v1-w4', korean: '도', hangul: 'do',        wordKorean: '파도',      wordZh: '海浪' },
    { id: 'd72-v1-w5', korean: '모', hangul: 'mo',        wordKorean: '모래',      wordZh: '沙' },
    { id: 'd72-v1-w6', korean: '회', hangul: 'hoe',       wordKorean: '회',        wordZh: '生鱼片' },
    { id: 'd72-v1-w7', korean: '풍', hangul: 'pung',      wordKorean: '풍경',      wordZh: '风景' },
    { id: 'd72-v1-w8', korean: '추', hangul: 'chu',       wordKorean: '추천하다',  wordZh: '推荐' },
  ],

  dictation: [
    { id: 'd72-v1-d1', korean: '해운대는 한번 가 볼 만해요',                hangul: 'hae-un-dae-neun han-beon ga-bol ma-nae-yo',      syllables: ['해', '운', '대', '는', '한', '번', '가', '볼', '만', '해', '요'], zh: '海云台值得去一次看看' },
    { id: 'd72-v1-d2', korean: '이 회는 진짜 먹을 만해요',                    hangul: 'i hoe-neun jin-jja meo-geul ma-nae-yo',          syllables: ['이', '회', '는', '진', '짜', '먹', '을', '만', '해', '요'], zh: '这生鱼片真的值得吃' },
    { id: 'd72-v1-d3', korean: '갈매기가 새우깡을 먹어요',                    hangul: 'gal-mae-gi-ga sae-u-kkang-eul meo-geo-yo',       syllables: ['갈', '매', '기', '가', '새', '우', '깡', '을', '먹', '어', '요'],  zh: '海鸥吃虾条' },
  ],
};
