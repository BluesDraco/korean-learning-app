import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 66 · 3-1 단어 마스터 · 狮子超市被拒 · 편견 */
export const day66Vocab: VocabSubQuestData = {
  day: 6, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '狮子超市 8 个词',

  encounter: [
    { id: 'd66-v1-e1', korean: '편견',       hangul: 'pyeon-gyeon',     zh: '偏见',      pos: '名词',   example: { ko: '그건 편견이에요.',                zh: '那是偏见。' },           tip: '偏(편) + 见(견) · 편견이 있다 = 有偏见',                                    tier: 'core' },
    { id: 'd66-v1-e2', korean: '체형',       hangul: 'che-hyeong',      zh: '体型',      pos: '名词',   example: { ko: '체형은 능력이 아니에요.',        zh: '体型不代表能力。' },     tip: '体(체) + 形(형) · Day 66 冲突核心',                                          tier: 'core' },
    { id: 'd66-v1-e3', korean: '능력',       hangul: 'neung-nyeok',     zh: '能力',      pos: '名词',   example: { ko: '능력이 중요해요.',                zh: '能力重要。' },           tip: '能(능) + 力(력) · Day 61 실력 与 능력 差别：实力 vs 能力',                    tier: 'core' },
    { id: 'd66-v1-e4', korean: '겉모습',    hangul: 'geon-mo-seup',    zh: '外表',      pos: '名词',   example: { ko: '겉모습만 봐요.',                  zh: '光看外表。' },           tip: '겉(表) + 모습(样子)· Day 66 主题 · 반의어 = 속마음',                          tier: 'core' },
    { id: 'd66-v1-e5', korean: '지원하다', hangul: 'ji-won-ha-da',    zh: '申请 / 应聘', pos: '动词', example: { ko: '알바에 지원했어요.',              zh: '应聘了兼职。' },        tip: '志(지) + 願(원) + 하다 · 취업 지원 = 求职应聘',                              tier: 'core' },
    { id: 'd66-v1-e6', korean: '무시하다', hangul: 'mu-si-ha-da',     zh: '轻视 / 无视', pos: '动词', example: { ko: '저를 무시하지 마세요.',           zh: '请不要轻视我。' },       tip: '無(무) + 视(시) + 하다 · Day 66 Tori 内心 → Day 68 说出口',                    tier: 'core' },
    { id: 'd66-v1-e7', korean: '손잡이',    hangul: 'son-ja-bi',       zh: '门把手',    pos: '名词',   example: { ko: '문 손잡이가 높아요.',             zh: '门把手很高。' },         tip: '손(手) + 잡이(抓的东西) · Day 66 场景细节',                                  tier: 'ext' },
    { id: 'd66-v1-e8', korean: '떨리다',    hangul: 'tteol-li-da',     zh: '发抖',      pos: '动词',   example: { ko: '손이 떨렸어요.',                    zh: '手抖了。' },             tip: 'Day 63 复用 · 이 날은 화 때문',                                                tier: 'ext' },
  ],

  recognize: [
    { id: 'd66-v1-r1', korean: '편견',       hangul: 'pyeon-gyeon',     choices: [{ zh: '偏见',        correct: true }, { zh: '同情',        correct: false }, { zh: '意见',        correct: false }, { zh: '看法',        correct: false }] },
    { id: 'd66-v1-r2', korean: '체형',       hangul: 'che-hyeong',      choices: [{ zh: '体型',        correct: true }, { zh: '性格',        correct: false }, { zh: '心情',        correct: false }, { zh: '年龄',        correct: false }] },
    { id: 'd66-v1-r3', korean: '능력',       hangul: 'neung-nyeok',     choices: [{ zh: '能力',        correct: true }, { zh: '努力',        correct: false }, { zh: '实话',        correct: false }, { zh: '外表',        correct: false }] },
    { id: 'd66-v1-r4', korean: '겉모습',    hangul: 'geon-mo-seup',    choices: [{ zh: '外表',        correct: true }, { zh: '内心',        correct: false }, { zh: '声音',        correct: false }, { zh: '话语',        correct: false }] },
    { id: 'd66-v1-r5', korean: '지원하다', hangul: 'ji-won-ha-da',    choices: [{ zh: '申请 / 应聘', correct: true }, { zh: '推荐',        correct: false }, { zh: '介绍',        correct: false }, { zh: '拒绝',        correct: false }] },
    { id: 'd66-v1-r6', korean: '무시하다', hangul: 'mu-si-ha-da',     choices: [{ zh: '轻视 / 无视', correct: true }, { zh: '重视',        correct: false }, { zh: '感激',        correct: false }, { zh: '注意',        correct: false }] },
  ],

  spell: [
    { id: 'd66-v1-s1', zhHint: '偏见',      answer: ['편', '견'], syllables: ['편', '견', '편', '검'] },
    { id: 'd66-v1-s2', zhHint: '体型',      answer: ['체', '형'], syllables: ['체', '형', '치', '헝'] },
    { id: 'd66-v1-s3', zhHint: '能力',      answer: ['능', '력'], syllables: ['능', '력', '늠', '역'] },
    { id: 'd66-v1-s4', zhHint: '外表',      answer: ['겉', '모', '습'], syllables: ['겉', '모', '습', '곁'] },
  ],

  write: [
    { id: 'd66-v1-w1', korean: '편', hangul: 'pyeon',     wordKorean: '편견',        wordZh: '偏见' },
    { id: 'd66-v1-w2', korean: '견', hangul: 'gyeon',     wordKorean: '편견',        wordZh: '偏见' },
    { id: 'd66-v1-w3', korean: '체', hangul: 'che',       wordKorean: '체형',        wordZh: '体型' },
    { id: 'd66-v1-w4', korean: '형', hangul: 'hyeong',    wordKorean: '체형',        wordZh: '体型' },
    { id: 'd66-v1-w5', korean: '능', hangul: 'neung',     wordKorean: '능력',        wordZh: '能力' },
    { id: 'd66-v1-w6', korean: '력', hangul: 'lyeok',     wordKorean: '능력',        wordZh: '能力' },
    { id: 'd66-v1-w7', korean: '겉', hangul: 'geot',      wordKorean: '겉모습',      wordZh: '外表' },
    { id: 'd66-v1-w8', korean: '무', hangul: 'mu',        wordKorean: '무시하다',   wordZh: '轻视' },
  ],

  dictation: [
    { id: 'd66-v1-d1', korean: '체형은 능력이 아니에요',        hangul: 'che-hyeong-eun neung-nyeo-gi a-ni-e-yo',   syllables: ['체', '형', '은', '능', '력', '이', '아', '니', '에', '요'], zh: '体型不代表能力' },
    { id: 'd66-v1-d2', korean: '겉모습만 봐요',                    hangul: 'geon-mo-seum-man bwa-yo',                syllables: ['겉', '모', '습', '만', '봐', '요'],                              zh: '光看外表' },
    { id: 'd66-v1-d3', korean: '저를 무시하지 마세요',            hangul: 'jeo-reul mu-si-ha-ji ma-se-yo',           syllables: ['저', '를', '무', '시', '하', '지', '마', '세', '요'],           zh: '请不要轻视我' },
  ],
};
