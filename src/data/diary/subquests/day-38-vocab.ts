import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 38 · 김치볶음밥 · 词汇子关卡 */
export const day38Vocab: VocabSubQuestData = {
  day: 8, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '第一次做饭的 8 个词',

  encounter: [
    { id: 'd38-v1-e1', korean: '요리',        hangul: 'yo-ri',           zh: '料理 / 做饭', pos: '名词',   example: { ko: '요리를 배우고 있어요.',       zh: '正在学做饭。' },       tip: '料(요) + 理(리) · 요리하다 = 做饭 · 요리사 = 厨师',            tier: 'core' },
    { id: 'd38-v1-e2', korean: '볶다',        hangul: 'bok-da',          zh: '炒',          pos: '动词',   example: { ko: '김치를 볶아요.',              zh: '炒泡菜。' },           tip: '发音 [복따] · 볶음밥 = 炒饭',                                    tier: 'core' },
    { id: 'd38-v1-e3', korean: '자르다',      hangul: 'ja-reu-da',       zh: '切',          pos: '动词',   example: { ko: '김치를 잘게 잘라요.',        zh: '把泡菜切小块。' },    tip: '르 不规则 · 자르다 → 잘라요（不是 자르어요）',                    tier: 'core' },
    { id: 'd38-v1-e4', korean: '재료',        hangul: 'jae-ryo',         zh: '材料 / 食材', pos: '名词',   example: { ko: '재료가 다 있어요.',           zh: '食材都齐了。' },       tip: '材(재) + 料(료) · 요리 재료',                                    tier: 'core' },
    { id: 'd38-v1-e5', korean: '팬',          hangul: 'paen',            zh: '平底锅',      pos: '名词',   example: { ko: '팬에 기름을 둘러요.',        zh: '在平底锅里放油。' },  tip: '英语 pan 外来语 · 냄비(炖锅) vs 팬(平底煎锅)',                    tier: 'core' },
    { id: 'd38-v1-e6', korean: '기름',        hangul: 'gi-reum',         zh: '油',          pos: '名词',   example: { ko: '기름을 좀 둘러요.',          zh: '放一点油。' },         tip: '기름을 두르다 = 放油 / 淋油 · 做菜必备',                          tier: 'core' },
    { id: 'd38-v1-e7', korean: '두르다',      hangul: 'du-reu-da',       zh: '淋 / 围',     pos: '动词',   example: { ko: '기름을 두르세요.',            zh: '请淋一点油。' },      tip: '르 不规则 · 두르다 → 둘러요',                                    tier: 'ext' },
    { id: 'd38-v1-e8', korean: '뜨겁다',      hangul: 'tteu-geop-da',    zh: '烫 / 热',     pos: '形容词', example: { ko: '팬이 뜨거워요.',              zh: '锅好烫。' },           tip: 'ㅂ 不规则 · 뜨겁다 → 뜨거워요',                                   tier: 'ext' },
  ],

  recognize: [
    { id: 'd38-v1-r1', korean: '요리',      hangul: 'yo-ri',       choices: [{ zh: '料理',       correct: true }, { zh: '洗菜',       correct: false }, { zh: '烘焙',       correct: false }, { zh: '摆盘',        correct: false }] },
    { id: 'd38-v1-r2', korean: '볶다',      hangul: 'bok-da',      choices: [{ zh: '炒',         correct: true }, { zh: '煮',         correct: false }, { zh: '蒸',         correct: false }, { zh: '烤',          correct: false }] },
    { id: 'd38-v1-r3', korean: '자르다',    hangul: 'ja-reu-da',   choices: [{ zh: '切',         correct: true }, { zh: '削',         correct: false }, { zh: '洗',         correct: false }, { zh: '拌',          correct: false }] },
    { id: 'd38-v1-r4', korean: '재료',      hangul: 'jae-ryo',     choices: [{ zh: '材料',       correct: true }, { zh: '菜谱',       correct: false }, { zh: '调料',       correct: false }, { zh: '厨具',        correct: false }] },
    { id: 'd38-v1-r5', korean: '팬',        hangul: 'paen',        choices: [{ zh: '平底锅',     correct: true }, { zh: '砂锅',       correct: false }, { zh: '汤锅',       correct: false }, { zh: '碗',          correct: false }] },
    { id: 'd38-v1-r6', korean: '기름',      hangul: 'gi-reum',     choices: [{ zh: '油',         correct: true }, { zh: '水',         correct: false }, { zh: '盐',         correct: false }, { zh: '糖',          correct: false }] },
  ],

  spell: [
    { id: 'd38-v1-s1', zhHint: '料理',     answer: ['요', '리'], syllables: ['요', '리', '유', '리'] },
    { id: 'd38-v1-s2', zhHint: '材料',     answer: ['재', '료'], syllables: ['재', '료', '제', '료'] },
    { id: 'd38-v1-s3', zhHint: '油',        answer: ['기', '름'], syllables: ['기', '름', '기', '음'] },
    { id: 'd38-v1-s4', zhHint: '切（잘라）', answer: ['잘', '라'], syllables: ['잘', '라', '자', '르'] },
  ],

  write: [
    { id: 'd38-v1-w1', korean: '요', hangul: 'yo',         wordKorean: '요리',    wordZh: '料理' },
    { id: 'd38-v1-w2', korean: '리', hangul: 'ri',         wordKorean: '요리',    wordZh: '料理' },
    { id: 'd38-v1-w3', korean: '볶', hangul: 'bok',        wordKorean: '볶다',    wordZh: '炒' },
    { id: 'd38-v1-w4', korean: '자', hangul: 'ja',         wordKorean: '자르다',  wordZh: '切' },
    { id: 'd38-v1-w5', korean: '재', hangul: 'jae',        wordKorean: '재료',    wordZh: '食材' },
    { id: 'd38-v1-w6', korean: '료', hangul: 'ryo',        wordKorean: '재료',    wordZh: '食材' },
    { id: 'd38-v1-w7', korean: '기', hangul: 'gi',         wordKorean: '기름',    wordZh: '油' },
    { id: 'd38-v1-w8', korean: '름', hangul: 'reum',       wordKorean: '기름',    wordZh: '油' },
  ],

  dictation: [
    { id: 'd38-v1-d1', korean: '요리할 수 있어요',  hangul: 'yo-ri-hal su i-sseo-yo',   syllables: ['요', '리', '할', '수', '있', '어', '요'],   zh: '会做饭' },
    { id: 'd38-v1-d2', korean: '기름을 둘러요',      hangul: 'gi-reu-meul dul-leo-yo',   syllables: ['기', '름', '을', '둘', '러', '요'],           zh: '淋油' },
    { id: 'd38-v1-d3', korean: '팬이 뜨거워요',      hangul: 'pae-ni tteu-geo-wo-yo',    syllables: ['팬', '이', '뜨', '거', '워', '요'],           zh: '锅很烫' },
  ],
};
