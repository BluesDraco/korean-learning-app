import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 74 · 3-1 단어 마스터 · 부산 사투리 */
export const day74Vocab: VocabSubQuestData = {
  day: 14, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '부산 사투리 8 个词', subtitleEn: '8 Busan dialect words',

  encounter: [
    { id: 'd74-v1-e1', korean: '사투리',     hangul: 'sa-tu-ri',      zh: '方言', zhEn: 'dialect',       pos: '名词', posEn: 'Noun',   example: { ko: '부산 사투리는 어려워요.',          zh: '釜山方言难。', zhEn: 'Busan dialect is hard.' },          tip: 'Day 74 主题词 · 사투리 vs 표준어', tipEn: 'Day 74 Theme Vocabulary · 사투리 vs 표준어',                                            tier: 'core' },
    { id: 'd74-v1-e2', korean: '표준어',     hangul: 'pyo-jun-eo',    zh: '标准语', zhEn: 'Standard language',     pos: '名词', posEn: 'Noun',   example: { ko: '표준어로 말해요.',                  zh: '用标准语说。', zhEn: 'Speak in standard language.' },          tip: '标(표) + 准(준) + 语(어) · 首尔话 = 표준어', tipEn: '标(표) + 准(준) + 语(어) · Seoul speech = 표준어',                                  tier: 'core' },
    { id: 'd74-v1-e3', korean: '억양',       hangul: 'eok-yang',      zh: '语调', zhEn: 'Tone',       pos: '名词', posEn: 'Noun',   example: { ko: '억양이 달라요.',                    zh: '语调不同。', zhEn: 'The tone is different.' },            tip: '억양 [어걍] · 사투리 특징',                                                    tier: 'core' },
    { id: 'd74-v1-e4', korean: '단어',       hangul: 'da-neo',        zh: '单词', zhEn: 'Word',       pos: '名词', posEn: 'Noun',   example: { ko: '단어마다 뜻이 있어요.',              zh: '每个词都有意思。', zhEn: 'Every word has meaning.' },      tip: 'Day 1 复用 · 単(단) + 语(어)', tipEn: 'Day 1 Reuse · 単(단) + 语(어)',                                                tier: 'core' },
    { id: 'd74-v1-e5', korean: '마다',       hangul: 'ma-da',         zh: '每 / 每一', zhEn: 'every / each',   pos: '语法', posEn: 'Grammar',   example: { ko: '지역마다 사투리가 있어요.',        zh: '每个地区都有方言。', zhEn: 'Every region has its own dialect.' },    tip: 'Day 74 主题词 · N + 마다 = 每一 N', tipEn: 'Day 74 Theme Words · N + 마다 = Every N',                                            tier: 'core' },
    { id: 'd74-v1-e6', korean: '지역',       hangul: 'ji-yeok',       zh: '地区', zhEn: 'Region',       pos: '名词', posEn: 'Noun',   example: { ko: '지역마다 문화가 달라요.',          zh: '每个地区文化不同。', zhEn: 'Each region has a different culture.' },    tip: '地(지) + 域(역) · 지역 별로 = 按地区分', tipEn: '地(ji) + 域(yeok) · By region',                                       tier: 'core' },
    { id: 'd74-v1-e7', korean: '알아듣다',   hangul: 'a-ra-deut-da',  zh: '听懂', zhEn: 'Understand',       pos: '动词', posEn: 'Verb',   example: { ko: '반쯤은 알아들었어요.',              zh: '听懂了一半。', zhEn: 'I understood half of it.' },          tip: '알다 + 듣다 · ㄷ 不规则 → 알아들어요', tipEn: '알다 + 듣다 · ㄷ irregular → 알아들어요',                                          tier: 'ext' },
    { id: 'd74-v1-e8', korean: '헷갈리다',   hangul: 'het-gal-li-da', zh: '混淆 / 分不清', zhEn: 'Confuse / Can\'t tell apart', pos: '动词', posEn: 'Verb', example: { ko: '억양이 헷갈려요.',                  zh: '语调分不清。', zhEn: 'Can\'t tell the intonation apart.' },          tip: 'Day 74 情感词 · Tori 面对사투리的心情', tipEn: 'Day 74 Emotion Words · Tori\'s feelings about dialects',                                        tier: 'ext' },
  ],

  recognize: [
    { id: 'd74-v1-r1', korean: '사투리',     hangul: 'sa-tu-ri',       choices: [{ zh: '方言', zhEn: 'dialect',    correct: true }, { zh: '外语', zhEn: 'foreign language',       correct: false }, { zh: '古语', zhEn: 'archaic language',       correct: false }, { zh: '俗语', zhEn: 'colloquial expression',       correct: false }] },
    { id: 'd74-v1-r2', korean: '표준어',     hangul: 'pyo-jun-eo',     choices: [{ zh: '标准语', zhEn: 'Standard language',  correct: true }, { zh: '书面语', zhEn: 'Written language',     correct: false }, { zh: '口语', zhEn: 'Spoken language',       correct: false }, { zh: '外语', zhEn: 'foreign language',       correct: false }] },
    { id: 'd74-v1-r3', korean: '억양',       hangul: 'eok-yang',       choices: [{ zh: '语调', zhEn: 'Tone',    correct: true }, { zh: '发音', zhEn: 'pronunciation',       correct: false }, { zh: '声调', zhEn: 'Tone',       correct: false }, { zh: '语法', zhEn: 'Grammar',       correct: false }] },
    { id: 'd74-v1-r4', korean: '지역',       hangul: 'ji-yeok',        choices: [{ zh: '地区', zhEn: 'Region',    correct: true }, { zh: '国家', zhEn: 'Country',       correct: false }, { zh: '城市', zhEn: 'City',       correct: false }, { zh: '村庄', zhEn: 'Village',       correct: false }] },
    { id: 'd74-v1-r5', korean: '알아듣다',   hangul: 'a-ra-deut-da',   choices: [{ zh: '听懂', zhEn: 'Understand',    correct: true }, { zh: '听见', zhEn: 'Hear',       correct: false }, { zh: '听说', zhEn: 'Hear about',       correct: false }, { zh: '倾听', zhEn: 'Listen closely',       correct: false }] },
    { id: 'd74-v1-r6', korean: '헷갈리다',   hangul: 'het-gal-li-da',  choices: [{ zh: '混淆 / 分不清', zhEn: 'Confuse / Can\'t tell apart', correct: true }, { zh: '记住', zhEn: 'Remember.',   correct: false }, { zh: '分开', zhEn: 'Separate',       correct: false }, { zh: '理解', zhEn: 'understand',       correct: false }] },
  ],

  spell: [
    { id: 'd74-v1-s1', zhHint: '方言', zhHintEn: 'dialect',    answer: ['사', '투', '리'], syllables: ['사', '투', '리', '사', '토', '이'] },
    { id: 'd74-v1-s2', zhHint: '标准', zhHintEn: 'Standard',    answer: ['표', '준'], syllables: ['표', '준', '표', '주'] },
    { id: 'd74-v1-s3', zhHint: '语调', zhHintEn: 'Tone',    answer: ['억', '양'], syllables: ['억', '양', '억', '얀'] },
    { id: 'd74-v1-s4', zhHint: '地区', zhHintEn: 'Region',    answer: ['지', '역'], syllables: ['지', '역', '치', '연'] },
  ],

  write: [
    { id: 'd74-v1-w1', korean: '사', hangul: 'sa',        wordKorean: '사투리',    wordZh: '方言', wordZhEn: 'dialect' },
    { id: 'd74-v1-w2', korean: '투', hangul: 'tu',        wordKorean: '사투리',    wordZh: '方言', wordZhEn: 'dialect' },
    { id: 'd74-v1-w3', korean: '리', hangul: 'ri',        wordKorean: '사투리',    wordZh: '方言', wordZhEn: 'dialect' },
    { id: 'd74-v1-w4', korean: '표', hangul: 'pyo',       wordKorean: '표준어',    wordZh: '标准语', wordZhEn: 'Standard language' },
    { id: 'd74-v1-w5', korean: '억', hangul: 'eok',       wordKorean: '억양',      wordZh: '语调', wordZhEn: 'Tone' },
    { id: 'd74-v1-w6', korean: '양', hangul: 'yang',      wordKorean: '억양',      wordZh: '语调', wordZhEn: 'Tone' },
    { id: 'd74-v1-w7', korean: '지', hangul: 'ji',        wordKorean: '지역',      wordZh: '地区', wordZhEn: 'Region' },
    { id: 'd74-v1-w8', korean: '역', hangul: 'yeok',      wordKorean: '지역',      wordZh: '地区', wordZhEn: 'Region' },
  ],

  dictation: [
    { id: 'd74-v1-d1', korean: '지역마다 사투리가 있어요',            hangul: 'ji-yeong-ma-da sa-tu-ri-ga i-sseo-yo',         syllables: ['지', '역', '마', '다', '사', '투', '리', '가', '있', '어', '요'], zh: '每个地区都有方言', zhEn: 'Every region has its own dialect' },
    { id: 'd74-v1-d2', korean: '억양이 진짜 달라요',                    hangul: 'eo-gyang-i jin-jja dal-la-yo',                syllables: ['억', '양', '이', '진', '짜', '달', '라', '요'], zh: '语调真的不同', zhEn: 'The intonation is really different' },
    { id: 'd74-v1-d3', korean: '반쯤은 알아들었어요',                    hangul: 'ban-jjeu-meun a-ra-deu-reo-sseo-yo',          syllables: ['반', '쯤', '은', '알', '아', '들', '었', '어', '요'],  zh: '听懂了一半', zhEn: 'Understood half of it' },
  ],
};
