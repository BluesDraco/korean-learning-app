import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 38 · 김치볶음밥 · 词汇子关卡 */
export const day38Vocab: VocabSubQuestData = {
  day: 8, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '第一次做饭的 8 个词', subtitleEn: '8 words for cooking for the first time',

  encounter: [
    { id: 'd38-v1-e1', korean: '요리',        hangul: 'yo-ri',           zh: '料理 / 做饭', zhEn: 'cooking / to cook', pos: '名词', posEn: 'Noun',   example: { ko: '요리를 배우고 있어요.',       zh: '正在学做饭。', zhEn: 'I\'m learning to cook.' },       tip: '料(요) + 理(리) · 요리하다 = 做饭 · 요리사 = 厨师', tipEn: '料(요) + 理(리) · 요리하다 = to cook · 요리사 = chef',            tier: 'core' },
    { id: 'd38-v1-e2', korean: '볶다',        hangul: 'bok-da',          zh: '炒', zhEn: 'to stir-fry',          pos: '动词', posEn: 'Verb',   example: { ko: '김치를 볶아요.',              zh: '炒泡菜。', zhEn: 'Stir-fry kimchi.' },           tip: '发音 [복따] · 볶음밥 = 炒饭', tipEn: 'Pronunciation [복따] · 볶음밥 = fried rice',                                    tier: 'core' },
    { id: 'd38-v1-e3', korean: '자르다',      hangul: 'ja-reu-da',       zh: '切', zhEn: 'Cut',          pos: '动词', posEn: 'Verb',   example: { ko: '김치를 잘게 잘라요.',        zh: '把泡菜切小块。', zhEn: 'Cut the kimchi into small pieces.' },    tip: '르 不规则 · 자르다 → 잘라요（不是 자르어요）', tipEn: '르 irregular · 자르다 → 잘라요 (not 자르어요)',                    tier: 'core' },
    { id: 'd38-v1-e4', korean: '재료',        hangul: 'jae-ryo',         zh: '材料 / 食材', zhEn: 'Ingredients', pos: '名词', posEn: 'Noun',   example: { ko: '재료가 다 있어요.',           zh: '食材都齐了。', zhEn: 'All the ingredients are ready.' },       tip: '材(재) + 料(료) · 요리 재료', tipEn: '材(재) + 料(료) · cooking ingredients',                                    tier: 'core' },
    { id: 'd38-v1-e5', korean: '팬',          hangul: 'paen',            zh: '平底锅', zhEn: 'Frying pan',      pos: '名词', posEn: 'Noun',   example: { ko: '팬에 기름을 둘러요.',        zh: '在平底锅里放油。', zhEn: 'Put oil in the frying pan.' },  tip: '英语 pan 外来语 · 냄비(炖锅) vs 팬(平底煎锅)', tipEn: 'English loanword \'pan\' · 냄비 (stew pot) vs 팬 (frying pan)',                    tier: 'core' },
    { id: 'd38-v1-e6', korean: '기름',        hangul: 'gi-reum',         zh: '油', zhEn: 'Oil',          pos: '名词', posEn: 'Noun',   example: { ko: '기름을 좀 둘러요.',          zh: '放一点油。', zhEn: 'Add a little oil.' },         tip: '기름을 두르다 = 放油 / 淋油 · 做菜必备', tipEn: '기름을 두르다 = to coat with oil / drizzle oil · essential for cooking',                          tier: 'core' },
    { id: 'd38-v1-e7', korean: '두르다',      hangul: 'du-reu-da',       zh: '淋 / 围', zhEn: 'drizzle / surround',     pos: '动词', posEn: 'Verb',   example: { ko: '기름을 두르세요.',            zh: '请淋一点油。', zhEn: 'Please drizzle a little oil.' },      tip: '르 不规则 · 두르다 → 둘러요', tipEn: '르 irregular · 두르다 → 둘러요',                                    tier: 'ext' },
    { id: 'd38-v1-e8', korean: '뜨겁다',      hangul: 'tteu-geop-da',    zh: '烫 / 热', zhEn: 'hot / scalding',     pos: '形容词', posEn: 'Adjective.', example: { ko: '팬이 뜨거워요.',              zh: '锅好烫。', zhEn: 'The pot is very hot.' },           tip: 'ㅂ 不规则 · 뜨겁다 → 뜨거워요', tipEn: 'ㅂ irregular · 뜨겁다 → 뜨거워요',                                   tier: 'ext' },
  ],

  recognize: [
    { id: 'd38-v1-r1', korean: '요리',      hangul: 'yo-ri',       choices: [{ zh: '料理', zhEn: 'cooking',       correct: true }, { zh: '洗菜', zhEn: 'wash vegetables',       correct: false }, { zh: '烘焙', zhEn: 'bake',       correct: false }, { zh: '摆盘', zhEn: 'plate (food)',        correct: false }] },
    { id: 'd38-v1-r2', korean: '볶다',      hangul: 'bok-da',      choices: [{ zh: '炒', zhEn: 'to stir-fry',         correct: true }, { zh: '煮', zhEn: 'boil',         correct: false }, { zh: '蒸', zhEn: 'steam',         correct: false }, { zh: '烤', zhEn: 'grill',          correct: false }] },
    { id: 'd38-v1-r3', korean: '자르다',    hangul: 'ja-reu-da',   choices: [{ zh: '切', zhEn: 'Cut',         correct: true }, { zh: '削', zhEn: 'peel',         correct: false }, { zh: '洗', zhEn: 'wash',         correct: false }, { zh: '拌', zhEn: 'mix',          correct: false }] },
    { id: 'd38-v1-r4', korean: '재료',      hangul: 'jae-ryo',     choices: [{ zh: '材料', zhEn: 'Ingredients',       correct: true }, { zh: '菜谱', zhEn: 'Recipe',       correct: false }, { zh: '调料', zhEn: 'Seasoning',       correct: false }, { zh: '厨具', zhEn: 'Cookware',        correct: false }] },
    { id: 'd38-v1-r5', korean: '팬',        hangul: 'paen',        choices: [{ zh: '平底锅', zhEn: 'Frying pan',     correct: true }, { zh: '砂锅', zhEn: 'earthenware pot',       correct: false }, { zh: '汤锅', zhEn: 'soup pot',       correct: false }, { zh: '碗', zhEn: 'bowl',          correct: false }] },
    { id: 'd38-v1-r6', korean: '기름',      hangul: 'gi-reum',     choices: [{ zh: '油', zhEn: 'Oil',         correct: true }, { zh: '水', zhEn: 'Water',         correct: false }, { zh: '盐', zhEn: 'Salt',         correct: false }, { zh: '糖', zhEn: 'Sugar',          correct: false }] },
  ],

  spell: [
    { id: 'd38-v1-s1', zhHint: '料理', zhHintEn: 'cooking',     answer: ['요', '리'], syllables: ['요', '리', '유', '리'] },
    { id: 'd38-v1-s2', zhHint: '材料', zhHintEn: 'Ingredients',     answer: ['재', '료'], syllables: ['재', '료', '제', '료'] },
    { id: 'd38-v1-s3', zhHint: '油', zhHintEn: 'Oil',        answer: ['기', '름'], syllables: ['기', '름', '기', '음'] },
    { id: 'd38-v1-s4', zhHint: '切（잘라）', zhHintEn: 'cut (잘라)', answer: ['잘', '라'], syllables: ['잘', '라', '자', '르'] },
  ],

  write: [
    { id: 'd38-v1-w1', korean: '요', hangul: 'yo',         wordKorean: '요리',    wordZh: '料理', wordZhEn: 'cooking' },
    { id: 'd38-v1-w2', korean: '리', hangul: 'ri',         wordKorean: '요리',    wordZh: '料理', wordZhEn: 'cooking' },
    { id: 'd38-v1-w3', korean: '볶', hangul: 'bok',        wordKorean: '볶다',    wordZh: '炒', wordZhEn: 'to stir-fry' },
    { id: 'd38-v1-w4', korean: '자', hangul: 'ja',         wordKorean: '자르다',  wordZh: '切', wordZhEn: 'Cut' },
    { id: 'd38-v1-w5', korean: '재', hangul: 'jae',        wordKorean: '재료',    wordZh: '食材', wordZhEn: 'ingredients' },
    { id: 'd38-v1-w6', korean: '료', hangul: 'ryo',        wordKorean: '재료',    wordZh: '食材', wordZhEn: 'ingredients' },
    { id: 'd38-v1-w7', korean: '기', hangul: 'gi',         wordKorean: '기름',    wordZh: '油', wordZhEn: 'Oil' },
    { id: 'd38-v1-w8', korean: '름', hangul: 'reum',       wordKorean: '기름',    wordZh: '油', wordZhEn: 'Oil' },
  ],

  dictation: [
    { id: 'd38-v1-d1', korean: '요리할 수 있어요',  hangul: 'yo-ri-hal su i-sseo-yo',   syllables: ['요', '리', '할', '수', '있', '어', '요'],   zh: '会做饭', zhEn: 'can cook' },
    { id: 'd38-v1-d2', korean: '기름을 둘러요',      hangul: 'gi-reu-meul dul-leo-yo',   syllables: ['기', '름', '을', '둘', '러', '요'],           zh: '淋油', zhEn: 'drizzle oil' },
    { id: 'd38-v1-d3', korean: '팬이 뜨거워요',      hangul: 'pae-ni tteu-geo-wo-yo',    syllables: ['팬', '이', '뜨', '거', '워', '요'],           zh: '锅很烫', zhEn: 'the pot is very hot' },
  ],
};
