import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 65 · 3-1 단어 마스터 · 北区食肉动物区 */
export const day65Vocab: VocabSubQuestData = {
  day: 5, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '북구 8 个词', subtitleEn: 'Buk-gu 8 words',

  encounter: [
    { id: 'd65-v1-e1', korean: '육식자',    hangul: 'yuk-sik-ja',      zh: '食肉动物', zhEn: 'Carnivore', pos: '名词', posEn: 'Noun',   example: { ko: '육식자 구역이에요.',            zh: '是食肉动物区。', zhEn: 'It\'s the carnivore zone.' },     tip: '肉(육) + 食(식) + 者(자) · 반의어 = 초식자', tipEn: 'Meat(육) + eat(식) + person(자) · antonym = 초식자',                          tier: 'core' },
    { id: 'd65-v1-e2', korean: '구역',       hangul: 'gu-yeok',         zh: '区域', zhEn: 'Zone',    pos: '名词', posEn: 'Noun',   example: { ko: '북구 3번 구역.',                  zh: '北区 3 号区域。', zhEn: 'North District, Zone 3.' },     tip: '区(구) + 域(역) · 육식자 구역 / 안전 구역', tipEn: 'District(구) + area(역) · carnivore zone / safe zone',                              tier: 'core' },
    { id: 'd65-v1-e3', korean: '낯설다',    hangul: 'nat-seol-da',     zh: '陌生', zhEn: 'Unfamiliar',    pos: '形容词', posEn: 'Adjective.', example: { ko: '여기 낯설어요.',                  zh: '这里陌生。', zhEn: 'This place is unfamiliar.' },         tip: 'ㄹ 词干 · 낯설어요 / 낯선 곳 = 陌生的地方', tipEn: 'ㄹ stem · 낯설어요 / 낯선 곳 = unfamiliar place',                              tier: 'core' },
    { id: 'd65-v1-e4', korean: '위험하다', hangul: 'wi-heom-ha-da',   zh: '危险', zhEn: 'Dangerous',    pos: '形容词', posEn: 'Adjective.', example: { ko: '여기 위험한 것 같아요.',         zh: '这里好像危险。', zhEn: 'It seems dangerous here.' },     tip: 'Day 65 主角形容词 · 위험한 것 같다 = 好像危险', tipEn: 'Day 65 key adjective · 위험한 것 같다 = seems dangerous',                          tier: 'core' },
    { id: 'd65-v1-e5', korean: '조심하다', hangul: 'jo-sim-ha-da',    zh: '小心', zhEn: 'be careful',    pos: '动词', posEn: 'Verb',   example: { ko: '조심해.',                          zh: '小心。', zhEn: 'Be careful.' },             tip: '조심 = 操心 + 하다 · 조심해 라는 반말 명령', tipEn: '조심 = care + 하다 · 조심해 is casual command',                             tier: 'core' },
    { id: 'd65-v1-e6', korean: '궁금하다', hangul: 'gung-geum-ha-da', zh: '好奇', zhEn: 'Curious',    pos: '形容词', posEn: 'Adjective.', example: { ko: '궁금해서 가 봤어요.',           zh: '好奇就去了。', zhEn: 'Got curious and went.' },       tip: '~해서 + V 볼래 组合 · Day 65 触发好奇的心情', tipEn: '~해서 + V 볼래 combo · Day 65 sparks curiosity',                          tier: 'core' },
    { id: 'd65-v1-e7', korean: '간판',       hangul: 'gan-pan',         zh: '招牌', zhEn: 'signboard',    pos: '名词', posEn: 'Noun',   example: { ko: '간판이 두꺼워요.',                zh: '招牌很粗。', zhEn: 'The sign is very thick.' },         tip: '看(간) + 板(판) · 街景常用词', tipEn: 'kan (간) + pan (판) · common street scene word',                                          tier: 'ext' },
    { id: 'd65-v1-e8', korean: '가로등',    hangul: 'ga-ro-deung',     zh: '路灯', zhEn: 'Streetlight',    pos: '名词', posEn: 'Noun',   example: { ko: '가로등이 어두워요.',              zh: '路灯很暗。', zhEn: 'The streetlights are dim.' },         tip: '街(가로) + 灯(등)', tipEn: 'street (가로) + light (등)',                                                       tier: 'ext' },
  ],

  recognize: [
    { id: 'd65-v1-r1', korean: '육식자',    hangul: 'yuk-sik-ja',      choices: [{ zh: '食肉动物', zhEn: 'Carnivore',    correct: true }, { zh: '草食动物', zhEn: 'Herbivore',    correct: false }, { zh: '杂食动物', zhEn: 'Omnivore',    correct: false }, { zh: '海洋动物', zhEn: 'Marine animal',    correct: false }] },
    { id: 'd65-v1-r2', korean: '구역',       hangul: 'gu-yeok',         choices: [{ zh: '区域', zhEn: 'Zone',        correct: true }, { zh: '出口', zhEn: 'exit',        correct: false }, { zh: '入口', zhEn: 'entrance',        correct: false }, { zh: '国界', zhEn: 'national border',        correct: false }] },
    { id: 'd65-v1-r3', korean: '낯설다',    hangul: 'nat-seol-da',     choices: [{ zh: '陌生', zhEn: 'Unfamiliar',        correct: true }, { zh: '熟悉', zhEn: 'familiar',        correct: false }, { zh: '安静', zhEn: 'Quiet',        correct: false }, { zh: '明亮', zhEn: 'bright',        correct: false }] },
    { id: 'd65-v1-r4', korean: '위험하다', hangul: 'wi-heom-ha-da',   choices: [{ zh: '危险', zhEn: 'Dangerous',        correct: true }, { zh: '安全', zhEn: 'safe',        correct: false }, { zh: '危机', zhEn: 'crisis',        correct: false }, { zh: '疑问', zhEn: 'doubt',        correct: false }] },
    { id: 'd65-v1-r5', korean: '조심하다', hangul: 'jo-sim-ha-da',    choices: [{ zh: '小心', zhEn: 'be careful',        correct: true }, { zh: '大意', zhEn: 'main idea',        correct: false }, { zh: '搜索', zhEn: 'search',        correct: false }, { zh: '休息', zhEn: 'to rest',        correct: false }] },
    { id: 'd65-v1-r6', korean: '궁금하다', hangul: 'gung-geum-ha-da', choices: [{ zh: '好奇', zhEn: 'Curious',        correct: true }, { zh: '疲惫', zhEn: 'exhausted',        correct: false }, { zh: '无聊', zhEn: 'boring',        correct: false }, { zh: '着急', zhEn: 'to be in a hurry',        correct: false }] },
  ],

  spell: [
    { id: 'd65-v1-s1', zhHint: '区域', zhHintEn: 'Zone',      answer: ['구', '역'], syllables: ['구', '역', '고', '엽'] },
    { id: 'd65-v1-s2', zhHint: '危险', zhHintEn: 'Dangerous',      answer: ['위', '험'], syllables: ['위', '험', '왜', '험'] },
    { id: 'd65-v1-s3', zhHint: '陌生', zhHintEn: 'Unfamiliar',      answer: ['낯', '설'], syllables: ['낯', '설', '낮', '설'] },
    { id: 'd65-v1-s4', zhHint: '招牌', zhHintEn: 'signboard',      answer: ['간', '판'], syllables: ['간', '판', '건', '반'] },
  ],

  write: [
    { id: 'd65-v1-w1', korean: '육', hangul: 'yuk',       wordKorean: '육식자',    wordZh: '食肉动物', wordZhEn: 'Carnivore' },
    { id: 'd65-v1-w2', korean: '식', hangul: 'sik',       wordKorean: '육식자',    wordZh: '食肉动物', wordZhEn: 'Carnivore' },
    { id: 'd65-v1-w3', korean: '구', hangul: 'gu',        wordKorean: '구역',      wordZh: '区域', wordZhEn: 'Zone' },
    { id: 'd65-v1-w4', korean: '역', hangul: 'yeok',      wordKorean: '구역',      wordZh: '区域', wordZhEn: 'Zone' },
    { id: 'd65-v1-w5', korean: '낯', hangul: 'nat',       wordKorean: '낯설다',    wordZh: '陌生', wordZhEn: 'Unfamiliar' },
    { id: 'd65-v1-w6', korean: '위', hangul: 'wi',        wordKorean: '위험하다', wordZh: '危险', wordZhEn: 'Dangerous' },
    { id: 'd65-v1-w7', korean: '조', hangul: 'jo',        wordKorean: '조심하다', wordZh: '小心', wordZhEn: 'be careful' },
    { id: 'd65-v1-w8', korean: '간', hangul: 'gan',       wordKorean: '간판',      wordZh: '招牌', wordZhEn: 'signboard' },
  ],

  dictation: [
    { id: 'd65-v1-d1', korean: '여기 낯설어요',            hangul: 'yeo-gi nat-seo-reo-yo',       syllables: ['여', '기', '낯', '설', '어', '요'],           zh: '这里陌生', zhEn: 'This place is unfamiliar.' },
    { id: 'd65-v1-d2', korean: '위험한 것 같아요',          hangul: 'wi-heom-han geot ga-ta-yo',    syllables: ['위', '험', '한', '것', '같', '아', '요'],     zh: '好像危险', zhEn: 'Seems dangerous.' },
    { id: 'd65-v1-d3', korean: '궁금해서 가 봤어요',       hangul: 'gung-geum-hae-seo ga bwa-sseo-yo', syllables: ['궁', '금', '해', '서', '가', '봤', '어', '요'], zh: '好奇就去了', zhEn: 'Curious, so I went.' },
  ],
};
