import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 90 · 3-1 단어 마스터 · 毕业演讲 짐→집 · ~았/었지만 지금은 */
export const day90Vocab: VocabSubQuestData = {
  day: 30, level: 'advanced', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '졸업 연설 8 个词', subtitleEn: '졸업 연설 8 words',

  encounter: [
    { id: 'd90-v1-e1', korean: '졸업식',     hangul: 'jo-reop-sik',   zh: '毕业典礼', zhEn: 'Graduation ceremony',   pos: '名词', posEn: 'Noun',   example: { ko: '오늘이 졸업식이에요.',          zh: '今天是毕业典礼。', zhEn: 'Today is the graduation ceremony.' },    tip: 'Day 90 主题词 · 卒(졸) + 業(업) + 式(식)', tipEn: 'Day 90 theme word · 卒(졸) + 業(업) + 式(식)',                          tier: 'core' },
    { id: 'd90-v1-e2', korean: '연단',       hangul: 'yeon-dan',      zh: '讲台', zhEn: 'podium',       pos: '名词', posEn: 'Noun',   example: { ko: '연단에 올라갔어요.',            zh: '登上了讲台。', zhEn: 'I stepped onto the podium.' },        tip: '演(연) + 坛(단) · 연단에 서다', tipEn: 'Stage (yeon) + platform (dan) · 연단에 서다',                                      tier: 'core' },
    { id: 'd90-v1-e3', korean: '짐',         hangul: 'jim',           zh: '行李', zhEn: 'luggage',       pos: '名词', posEn: 'Noun',   example: { ko: '이 짐을 가지고 왔어요.',         zh: '带来了这行李。', zhEn: 'Brought this luggage.' },      tip: 'Day 90 关键词 · 与 집(家) 一音之差 · Day 3 谐音梗', tipEn: 'Day 90 keyword · one-sound difference from 집(home) · Day 3 pun',                  tier: 'core' },
    { id: 'd90-v1-e4', korean: '집',         hangul: 'jip',           zh: '家', zhEn: 'house',         pos: '名词', posEn: 'Noun',   example: { ko: '지금은 집이 있어요.',           zh: '现在有家了。', zhEn: 'Now I have a home.' },        tip: 'Day 90 灵魂词 · 与 짐(行李) 一音之差 · 心里的家', tipEn: 'Day 90 soul word · one-sound difference from 짐(luggage) · home in the heart',                    tier: 'core' },
    { id: 'd90-v1-e5', korean: '주인공',     hangul: 'ju-in-gong',    zh: '主人公', zhEn: 'protagonist',     pos: '名词', posEn: 'Noun',   example: { ko: '오늘의 주인공은 이 두 글자예요.', zh: '今天的主人公是这两个字。', zhEn: 'Today\'s protagonist is these two characters.' }, tip: '主(주) + 人(인) + 公(공)', tipEn: 'Main (주) + Character (인) + 公 (공)',                                          tier: 'core' },
    { id: 'd90-v1-e6', korean: '안정감',     hangul: 'an-jeong-gam',  zh: '安定感 / 踏实', zhEn: 'Stability / groundedness', pos: '名词', posEn: 'Noun', example: { ko: '완전한 안정감을 느꼈어요.',      zh: '感到完全的踏实。', zhEn: 'Feel completely grounded.' },    tip: '安(안) + 定(정) + 感(감)', tipEn: 'Stable (안) + Settled (정) + Feeling (감)',                                          tier: 'core' },
    { id: 'd90-v1-e7', korean: '기립 박수',   hangul: 'gi-rip bak-su', zh: '起立鼓掌', zhEn: 'Standing ovation',   pos: '名词', posEn: 'Noun',   example: { ko: '기립 박수가 나왔어요.',          zh: '全场起立鼓掌。', zhEn: 'The whole audience stood up and applauded.' },      tip: '起(기) + 立(립) + 박수(掌声)', tipEn: '起(기) + 立(립) + 박수(applause)',                                       tier: 'ext' },
    { id: 'd90-v1-e8', korean: '삶',         hangul: 'sam',           zh: '生活 / 人生', zhEn: 'Life / life', pos: '名词', posEn: 'Noun',   example: { ko: '이야기는 끝나도 삶은 계속돼요.', zh: '故事结束但生活继续。', zhEn: 'The story ends, but life goes on.' }, tip: '한 글자 명사 · 살다 → 삶',                                          tier: 'ext' },
  ],

  recognize: [
    { id: 'd90-v1-r1', korean: '졸업식',     hangul: 'jo-reop-sik',   choices: [{ zh: '毕业典礼', zhEn: 'Graduation ceremony',   correct: true }, { zh: '开学礼', zhEn: 'Opening ceremony',  correct: false }, { zh: '入职礼', zhEn: 'Entrance ceremony',  correct: false }, { zh: '婚礼', zhEn: 'wedding',    correct: false }] },
    { id: 'd90-v1-r2', korean: '연단',       hangul: 'yeon-dan',      choices: [{ zh: '讲台', zhEn: 'podium',       correct: true }, { zh: '观众席', zhEn: 'audience seating',  correct: false }, { zh: '后台', zhEn: 'backstage',    correct: false }, { zh: '走廊', zhEn: 'Hallway',    correct: false }] },
    { id: 'd90-v1-r3', korean: '짐',         hangul: 'jim',           choices: [{ zh: '行李', zhEn: 'luggage',       correct: true }, { zh: '家', zhEn: 'house',      correct: false }, { zh: '钱', zhEn: 'money',      correct: false }, { zh: '钥匙', zhEn: 'Key',    correct: false }] },
    { id: 'd90-v1-r4', korean: '집',         hangul: 'jip',           choices: [{ zh: '家', zhEn: 'house',         correct: true }, { zh: '行李', zhEn: 'luggage',    correct: false }, { zh: '学校', zhEn: 'School',    correct: false }, { zh: '公司', zhEn: 'company',    correct: false }] },
    { id: 'd90-v1-r5', korean: '안정감',     hangul: 'an-jeong-gam',  choices: [{ zh: '安定感 / 踏实', zhEn: 'Stability / groundedness', correct: true }, { zh: '不安', zhEn: 'Uneasy',  correct: false }, { zh: '兴奋', zhEn: 'excited',    correct: false }, { zh: '疲惫', zhEn: 'exhausted',    correct: false }] },
    { id: 'd90-v1-r6', korean: '기립 박수',   hangul: 'gi-rip bak-su', choices: [{ zh: '起立鼓掌', zhEn: 'Standing ovation',   correct: true }, { zh: '嘘声', zhEn: 'Booing',    correct: false }, { zh: '沉默', zhEn: 'Silence',    correct: false }, { zh: '退场', zhEn: 'Exit',    correct: false }] },
  ],

  spell: [
    { id: 'd90-v1-s1', zhHint: '毕业典礼', zhHintEn: 'Graduation ceremony',  answer: ['졸', '업', '식'], syllables: ['졸', '업', '식', '좀', '엄', '싱'] },
    { id: 'd90-v1-s2', zhHint: '讲台', zhHintEn: 'podium',    answer: ['연', '단'],       syllables: ['연', '단', '염', '답'] },
    { id: 'd90-v1-s3', zhHint: '行李', zhHintEn: 'luggage',    answer: ['짐'],             syllables: ['짐', '집', '점', '짚'] },
    { id: 'd90-v1-s4', zhHint: '家', zhHintEn: 'house',      answer: ['집'],             syllables: ['집', '짐', '짚', '접'] },
  ],

  write: [
    { id: 'd90-v1-w1', korean: '졸', hangul: 'jol',    wordKorean: '졸업식', wordZh: '毕业典礼', wordZhEn: 'Graduation ceremony' },
    { id: 'd90-v1-w2', korean: '업', hangul: 'eop',    wordKorean: '졸업식', wordZh: '毕业典礼', wordZhEn: 'Graduation ceremony' },
    { id: 'd90-v1-w3', korean: '연', hangul: 'yeon',   wordKorean: '연단',   wordZh: '讲台', wordZhEn: 'podium' },
    { id: 'd90-v1-w4', korean: '단', hangul: 'dan',    wordKorean: '연단',   wordZh: '讲台', wordZhEn: 'podium' },
    { id: 'd90-v1-w5', korean: '짐', hangul: 'jim',    wordKorean: '짐',     wordZh: '行李', wordZhEn: 'luggage' },
    { id: 'd90-v1-w6', korean: '집', hangul: 'jip',    wordKorean: '집',     wordZh: '家', wordZhEn: 'house' },
    { id: 'd90-v1-w7', korean: '삶', hangul: 'sam',    wordKorean: '삶',     wordZh: '人生', wordZhEn: 'Life' },
    { id: 'd90-v1-w8', korean: '삶', hangul: 'sam',    wordKorean: '삶',     wordZh: '人生', wordZhEn: 'Life' },
  ],

  dictation: [
    { id: 'd90-v1-d1', korean: '짐을 가지고 왔어요',            hangul: 'ji-meul ga-ji-go wa-sseo-yo',           syllables: ['짐', '을', '가', '지', '고', '왔', '어', '요'], zh: '带来了行李', zhEn: 'Brought luggage' },
    { id: 'd90-v1-d2', korean: '지금은 집이 있어요',            hangul: 'ji-geu-meun ji-bi i-sseo-yo',           syllables: ['지', '금', '은', '집', '이', '있', '어', '요'], zh: '现在有家了', zhEn: 'Now I have a home' },
    { id: 'd90-v1-d3', korean: '연단에 올라갔어요',            hangul: 'yeon-dan-e ol-la-ga-sseo-yo',           syllables: ['연', '단', '에', '올', '라', '갔', '어', '요'], zh: '登上了讲台', zhEn: 'Stepped onto the podium' },
  ],
};
