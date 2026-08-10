import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 35 · 被问路 · 词汇子关卡 */
export const day35Vocab: VocabSubQuestData = {
  day: 5, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '给别人指路的 8 个词', subtitleEn: '8 words for giving directions to others',

  encounter: [
    { id: 'd35-v1-e1', korean: '출구',      hangul: 'chul-gu',     zh: '出口', zhEn: 'exit',        pos: '名词', posEn: 'Noun',     example: { ko: '2번 출구로 나가세요.',      zh: '请从2号出口出去。', zhEn: 'Please exit through Exit 2.' },   tip: '출(出) + 구(口)。입구 = 入口 · 反义', tipEn: '출(出) + 구(口). 입구 = entrance · antonym',                           tier: 'core' },
    { id: 'd35-v1-e2', korean: '왼쪽',      hangul: 'oen-jjok',    zh: '左边', zhEn: 'left side',        pos: '名词', posEn: 'Noun',     example: { ko: '왼쪽으로 가세요.',           zh: '请往左走。', zhEn: 'Please go left.' },           tip: '왼 + 쪽。方向 + 으로 = 往___', tipEn: '왼 + 쪽. Direction + 으로 = toward ___',                                  tier: 'core' },
    { id: 'd35-v1-e3', korean: '오른쪽',    hangul: 'o-reun-jjok', zh: '右边', zhEn: 'right side',        pos: '名词', posEn: 'Noun',     example: { ko: '오른쪽 편의점 옆이에요.',   zh: '在右边便利店旁边。', zhEn: 'It\'s next to the convenience store on the right.' },   tip: '오른 + 쪽。问路四件套之一', tipEn: '오른 + 쪽. One of the four essentials for asking directions',                                     tier: 'core' },
    { id: 'd35-v1-e4', korean: '쭉',        hangul: 'jjuk',        zh: '一直 / 笔直', zhEn: 'straight / directly', pos: '副词', posEn: 'Adverb',     example: { ko: '쭉 가세요.',                 zh: '请一直走。', zhEn: 'Please go straight.' },           tip: '拟态词。쭉 가다 = 直走 · 问路核心副词', tipEn: 'Onomatopoeic word. 쭉 가다 = go straight · key adverb for asking directions',                          tier: 'core' },
    { id: 'd35-v1-e5', korean: '걷다',      hangul: 'geot-da',     zh: '走（走路）', zhEn: 'to walk',  pos: '动词', posEn: 'Verb',     example: { ko: '5분쯤 걸어요.',              zh: '走大概 5 分钟。', zhEn: 'Walk about 5 minutes.' },      tip: 'ㄷ 不规则 · 걷다 → 걸어요', tipEn: 'ㄷ irregular · 걷다 → 걸어요',                                     tier: 'core' },
    { id: 'd35-v1-e6', korean: '어학당',    hangul: 'eo-hak-dang', zh: '语学堂', zhEn: 'language school',      pos: '名词', posEn: 'Noun',     example: { ko: '한빛 어학당은 여기서 5분이에요.', zh: '语学堂离这里 5 分钟。', zhEn: 'The language school is 5 minutes from here.' }, tip: '어(语) + 학(学) + 당(堂) · 语言学校的正式称呼', tipEn: '어(语) + 학(学) + 당(堂) · formal term for language school',                 tier: 'core' },
    { id: 'd35-v1-e7', korean: '옆',        hangul: 'yeop',        zh: '旁边', zhEn: 'next to',        pos: '名词', posEn: 'Noun',     example: { ko: '편의점 옆에 있어요.',        zh: '在便利店旁边。', zhEn: 'It\'s next to the convenience store.' },       tip: '位置助词 옆에 = 在旁边', tipEn: 'Location particle 옆에 = next to',                                        tier: 'ext' },
    { id: 'd35-v1-e8', korean: '돌다',      hangul: 'dol-da',      zh: '转 / 拐弯', zhEn: 'turn / turn a corner',   pos: '动词', posEn: 'Verb',     example: { ko: '오른쪽으로 도세요.',         zh: '请往右转。', zhEn: 'Please turn right.' },           tip: 'ㄹ 词干 · 도세요（敬语）/ 돌아요（해요体）', tipEn: 'ㄹ stem · 도세요 (polite) / 돌아요 (해요 form)',                    tier: 'ext' },
  ],

  recognize: [
    { id: 'd35-v1-r1', korean: '출구',     hangul: 'chul-gu',     choices: [{ zh: '出口', zhEn: 'exit',        correct: true }, { zh: '入口', zhEn: 'entrance',      correct: false }, { zh: '通道', zhEn: 'passage',      correct: false }, { zh: '楼梯', zhEn: 'stairs',      correct: false }] },
    { id: 'd35-v1-r2', korean: '왼쪽',     hangul: 'oen-jjok',    choices: [{ zh: '左边', zhEn: 'left side',        correct: true }, { zh: '右边', zhEn: 'right side',      correct: false }, { zh: '前面', zhEn: 'Front',      correct: false }, { zh: '后面', zhEn: 'behind',      correct: false }] },
    { id: 'd35-v1-r3', korean: '오른쪽',   hangul: 'o-reun-jjok', choices: [{ zh: '右边', zhEn: 'right side',        correct: true }, { zh: '左边', zhEn: 'left side',      correct: false }, { zh: '上面', zhEn: 'above',      correct: false }, { zh: '下面', zhEn: 'below',      correct: false }] },
    { id: 'd35-v1-r4', korean: '쭉',       hangul: 'jjuk',        choices: [{ zh: '一直', zhEn: 'straight / all the way',        correct: true }, { zh: '慢慢', zhEn: 'Slowly',      correct: false }, { zh: '有点', zhEn: 'a little',      correct: false }, { zh: '暂停', zhEn: 'pause',      correct: false }] },
    { id: 'd35-v1-r5', korean: '걷다',     hangul: 'geot-da',     choices: [{ zh: '走路', zhEn: 'walk / on foot',        correct: true }, { zh: '跑步', zhEn: 'running',      correct: false }, { zh: '骑车', zhEn: 'cycling',      correct: false }, { zh: '开车', zhEn: 'driving',      correct: false }] },
    { id: 'd35-v1-r6', korean: '어학당',   hangul: 'eo-hak-dang', choices: [{ zh: '语学堂', zhEn: 'language school',      correct: true }, { zh: '大学', zhEn: 'university',      correct: false }, { zh: '中学', zhEn: 'middle school',      correct: false }, { zh: '图书馆', zhEn: 'library',    correct: false }] },
  ],

  spell: [
    { id: 'd35-v1-s1', zhHint: '出口', zhHintEn: 'exit',      answer: ['출', '구'], syllables: ['출', '구', '축', '군'] },
    { id: 'd35-v1-s2', zhHint: '左边', zhHintEn: 'left side',      answer: ['왼', '쪽'], syllables: ['왼', '쪽', '외', '족'] },
    { id: 'd35-v1-s3', zhHint: '语学', zhHintEn: 'language studies',      answer: ['어', '학'], syllables: ['어', '학', '오', '한'] },
    { id: 'd35-v1-s4', zhHint: '一直', zhHintEn: 'straight / all the way',      answer: ['쭉'],       syllables: ['쭉', '축', '쩍', '족'] },
  ],

  write: [
    { id: 'd35-v1-w1', korean: '출', hangul: 'chul',        wordKorean: '출구',    wordZh: '出口', wordZhEn: 'exit' },
    { id: 'd35-v1-w2', korean: '구', hangul: 'gu',          wordKorean: '출구',    wordZh: '出口', wordZhEn: 'exit' },
    { id: 'd35-v1-w3', korean: '왼', hangul: 'oen',         wordKorean: '왼쪽',    wordZh: '左边', wordZhEn: 'left side' },
    { id: 'd35-v1-w4', korean: '쪽', hangul: 'jjok',        wordKorean: '왼쪽',    wordZh: '左边', wordZhEn: 'left side' },
    { id: 'd35-v1-w5', korean: '오', hangul: 'o',           wordKorean: '오른쪽',  wordZh: '右边', wordZhEn: 'right side' },
    { id: 'd35-v1-w6', korean: '른', hangul: 'reun',        wordKorean: '오른쪽',  wordZh: '右边', wordZhEn: 'right side' },
    { id: 'd35-v1-w7', korean: '어', hangul: 'eo',          wordKorean: '어학당',  wordZh: '语学堂', wordZhEn: 'language school' },
    { id: 'd35-v1-w8', korean: '학', hangul: 'hak',         wordKorean: '어학당',  wordZh: '语学堂', wordZhEn: 'language school' },
  ],

  dictation: [
    { id: 'd35-v1-d1', korean: '왼쪽으로',       hangul: 'oen-jjo-geu-ro',        syllables: ['왼', '쪽', '으', '로'],       zh: '往左', zhEn: 'Turn left' },
    { id: 'd35-v1-d2', korean: '쭉 가세요',       hangul: 'jjuk ga-se-yo',         syllables: ['쭉', '가', '세', '요'],       zh: '请一直走', zhEn: 'Keep going straight' },
    { id: 'd35-v1-d3', korean: '5분쯤 걸어요',    hangul: 'o-bun-jjeum geo-reo-yo', syllables: ['오', '분', '쯤', '걸', '어', '요'], zh: '走大概5分钟', zhEn: 'Walk about 5 minutes' },
  ],
};
