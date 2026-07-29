import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 35 · 被问路 · 词汇子关卡 */
export const day35Vocab: VocabSubQuestData = {
  day: 5, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '给别人指路的 8 个词',

  encounter: [
    { id: 'd35-v1-e1', korean: '출구',      hangul: 'chul-gu',     zh: '出口',        pos: '名词',     example: { ko: '2번 출구로 나가세요.',      zh: '请从2号出口出去。' },   tip: '출(出) + 구(口)。입구 = 入口 · 反义',                           tier: 'core' },
    { id: 'd35-v1-e2', korean: '왼쪽',      hangul: 'oen-jjok',    zh: '左边',        pos: '名词',     example: { ko: '왼쪽으로 가세요.',           zh: '请往左走。' },           tip: '왼 + 쪽。方向 + 으로 = 往___',                                  tier: 'core' },
    { id: 'd35-v1-e3', korean: '오른쪽',    hangul: 'o-reun-jjok', zh: '右边',        pos: '名词',     example: { ko: '오른쪽 편의점 옆이에요.',   zh: '在右边便利店旁边。' },   tip: '오른 + 쪽。问路四件套之一',                                     tier: 'core' },
    { id: 'd35-v1-e4', korean: '쭉',        hangul: 'jjuk',        zh: '一直 / 笔直', pos: '副词',     example: { ko: '쭉 가세요.',                 zh: '请一直走。' },           tip: '拟态词。쭉 가다 = 直走 · 问路核心副词',                          tier: 'core' },
    { id: 'd35-v1-e5', korean: '걷다',      hangul: 'geot-da',     zh: '走（走路）',  pos: '动词',     example: { ko: '5분쯤 걸어요.',              zh: '走大概 5 分钟。' },      tip: 'ㄷ 不规则 · 걷다 → 걸어요',                                     tier: 'core' },
    { id: 'd35-v1-e6', korean: '어학당',    hangul: 'eo-hak-dang', zh: '语学堂',      pos: '名词',     example: { ko: '한빛 어학당은 여기서 5분이에요.', zh: '语学堂离这里 5 分钟。' }, tip: '어(语) + 학(学) + 당(堂) · 语言学校的正式称呼',                 tier: 'core' },
    { id: 'd35-v1-e7', korean: '옆',        hangul: 'yeop',        zh: '旁边',        pos: '名词',     example: { ko: '편의점 옆에 있어요.',        zh: '在便利店旁边。' },       tip: '位置助词 옆에 = 在旁边',                                        tier: 'ext' },
    { id: 'd35-v1-e8', korean: '돌다',      hangul: 'dol-da',      zh: '转 / 拐弯',   pos: '动词',     example: { ko: '오른쪽으로 도세요.',         zh: '请往右转。' },           tip: 'ㄹ 词干 · 도세요（敬语）/ 돌아요（해요体）',                    tier: 'ext' },
  ],

  recognize: [
    { id: 'd35-v1-r1', korean: '출구',     hangul: 'chul-gu',     choices: [{ zh: '出口',        correct: true }, { zh: '入口',      correct: false }, { zh: '通道',      correct: false }, { zh: '楼梯',      correct: false }] },
    { id: 'd35-v1-r2', korean: '왼쪽',     hangul: 'oen-jjok',    choices: [{ zh: '左边',        correct: true }, { zh: '右边',      correct: false }, { zh: '前面',      correct: false }, { zh: '后面',      correct: false }] },
    { id: 'd35-v1-r3', korean: '오른쪽',   hangul: 'o-reun-jjok', choices: [{ zh: '右边',        correct: true }, { zh: '左边',      correct: false }, { zh: '上面',      correct: false }, { zh: '下面',      correct: false }] },
    { id: 'd35-v1-r4', korean: '쭉',       hangul: 'jjuk',        choices: [{ zh: '一直',        correct: true }, { zh: '慢慢',      correct: false }, { zh: '有点',      correct: false }, { zh: '暂停',      correct: false }] },
    { id: 'd35-v1-r5', korean: '걷다',     hangul: 'geot-da',     choices: [{ zh: '走路',        correct: true }, { zh: '跑步',      correct: false }, { zh: '骑车',      correct: false }, { zh: '开车',      correct: false }] },
    { id: 'd35-v1-r6', korean: '어학당',   hangul: 'eo-hak-dang', choices: [{ zh: '语学堂',      correct: true }, { zh: '大学',      correct: false }, { zh: '中学',      correct: false }, { zh: '图书馆',    correct: false }] },
  ],

  spell: [
    { id: 'd35-v1-s1', zhHint: '出口',      answer: ['출', '구'], syllables: ['출', '구', '축', '군'] },
    { id: 'd35-v1-s2', zhHint: '左边',      answer: ['왼', '쪽'], syllables: ['왼', '쪽', '외', '족'] },
    { id: 'd35-v1-s3', zhHint: '语学',      answer: ['어', '학'], syllables: ['어', '학', '오', '한'] },
    { id: 'd35-v1-s4', zhHint: '一直',      answer: ['쭉'],       syllables: ['쭉', '축', '쩍', '족'] },
  ],

  write: [
    { id: 'd35-v1-w1', korean: '출', hangul: 'chul',        wordKorean: '출구',    wordZh: '出口' },
    { id: 'd35-v1-w2', korean: '구', hangul: 'gu',          wordKorean: '출구',    wordZh: '出口' },
    { id: 'd35-v1-w3', korean: '왼', hangul: 'oen',         wordKorean: '왼쪽',    wordZh: '左边' },
    { id: 'd35-v1-w4', korean: '쪽', hangul: 'jjok',        wordKorean: '왼쪽',    wordZh: '左边' },
    { id: 'd35-v1-w5', korean: '오', hangul: 'o',           wordKorean: '오른쪽',  wordZh: '右边' },
    { id: 'd35-v1-w6', korean: '른', hangul: 'reun',        wordKorean: '오른쪽',  wordZh: '右边' },
    { id: 'd35-v1-w7', korean: '어', hangul: 'eo',          wordKorean: '어학당',  wordZh: '语学堂' },
    { id: 'd35-v1-w8', korean: '학', hangul: 'hak',         wordKorean: '어학당',  wordZh: '语学堂' },
  ],

  dictation: [
    { id: 'd35-v1-d1', korean: '왼쪽으로',       hangul: 'oen-jjo-geu-ro',        syllables: ['왼', '쪽', '으', '로'],       zh: '往左' },
    { id: 'd35-v1-d2', korean: '쭉 가세요',       hangul: 'jjuk ga-se-yo',         syllables: ['쭉', '가', '세', '요'],       zh: '请一直走' },
    { id: 'd35-v1-d3', korean: '5분쯤 걸어요',    hangul: 'o-bun-jjeum geo-reo-yo', syllables: ['오', '분', '쯤', '걸', '어', '요'], zh: '走大概5分钟' },
  ],
};
