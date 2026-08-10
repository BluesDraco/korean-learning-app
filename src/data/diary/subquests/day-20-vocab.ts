import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 20 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 主流程 6 词（집주인/계약/관리비/따로/들어 있어요/질문）之外的 8 个新词。
 * - core: 보증금 / 월세 / 원룸 / 수도세 / 전기세 / 인터넷（进认词考察）
 * - ext:  청소비 / 확인（进拼写 / 听辨）
 *
 * 场景延展：从"押金/月租"到"具体费用项"到"签合同前的确认"。
 */
export const day20Vocab: VocabSubQuestData = {
  day: 20,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '看房时听到的 8 个费用词', subtitleEn: '8 Cost Terms You\'ll Hear When Viewing a Place',

  encounter: [
    {
      id: 'd20-v1-e1',
      korean: '보증금',
      hangul: 'bo-jeung-geum',
      zh: '押金', zhEn: 'deposit',
      pos: '名词', posEn: 'Noun',
      example: { ko: '보증금 500만이에요.', zh: '押金500万。', zhEn: 'Deposit is 5 million won.' },
      tip: '汉字词「保证金」。韩国租房押金通常几百万到上亿韩元，退租时全退。跟中国「二押一」概念不同', tipEn: 'Sino-Korean word for \'deposit.\' In Korea, rental deposits usually range from a few million to hundreds of millions of won, fully refunded when you move out. Unlike China\'s \'two months deposit, one month rent\' concept.',
      tier: 'core',
    },
    {
      id: 'd20-v1-e2',
      korean: '월세',
      hangul: 'wol-se',
      zh: '月租', zhEn: 'monthly rent',
      pos: '名词', posEn: 'Noun',
      example: { ko: '월세 50만이에요.', zh: '月租50万。', zhEn: 'Monthly rent is 500,000 won.' },
      tip: '汉字词「月贳」。「贳」是租借的意思。对应 전세（全额押租）—— 韩国特有的租房制度', tipEn: 'Sino-Korean word for \'monthly rent.\' \'贳\' means to lease. Corresponds to jeonse (full deposit rent) — Korea\'s unique rental system.',
      tier: 'core',
    },
    {
      id: 'd20-v1-e3',
      korean: '원룸',
      hangul: 'won-rum',
      zh: '一居室', zhEn: 'studio',
      pos: '名词', posEn: 'Noun',
      example: { ko: '원룸에 살아요.', zh: '住一居室。', zhEn: 'I live in a one-room.' },
      tip: '英语外来语 one + room。留学生最常见的房型，一间房+独立卫浴+小厨', tipEn: 'English loanword one + room. The most common housing type for international students: one room + private bathroom + small kitchen.',
      tier: 'core',
    },
    {
      id: 'd20-v1-e4',
      korean: '수도세',
      hangul: 'su-do-se',
      zh: '水费', zhEn: 'Water bill',
      pos: '名词', posEn: 'Noun',
      example: { ko: '수도세는 관리비에 들어 있어요.', zh: '水费包含在管理费里。', zhEn: 'Water bill is included in the maintenance fee.' },
      tip: '수도(水道) + 세(税/费)。韩国房租通常不含水电费。「전기세」「가스비」和「수도세」是租房三大费用', tipEn: 'Sino-Korean \'water\' + \'tax/fee.\' In Korea, rent usually doesn\'t include utilities. Electricity, gas, and water bills are the three main rental costs.',
      tier: 'core',
    },
    {
      id: 'd20-v1-e5',
      korean: '전기세',
      hangul: 'jeon-gi-se',
      zh: '电费', zhEn: 'Electricity bill',
      pos: '名词', posEn: 'Noun',
      example: { ko: '전기세 따로예요.', zh: '电费另算。', zhEn: 'Electricity is extra.' },
      tip: '전기(电气) + 세。韩国夏天用空调电费飙升，是租房时必确认的项目', tipEn: 'Sino-Korean \'electricity\' + \'tax.\' In Korea, AC usage in summer spikes electricity bills — a must-check when renting.',
      tier: 'core',
    },
    {
      id: 'd20-v1-e6',
      korean: '인터넷',
      hangul: 'in-teo-net',
      zh: '网 / 网络', zhEn: 'Internet',
      pos: '名词', posEn: 'Noun',
      example: { ko: '인터넷은 관리비에 들어 있어요.', zh: '网费包含在管理费里。', zhEn: 'Internet fee is included in the maintenance fee.' },
      tip: '英语外来语 internet。租房时问"인터넷 포함이에요?"（含网费吗？）', tipEn: 'English loanword \'internet.\' When renting, ask "인터넷 포함이에요?" (Is internet included?).',
      tier: 'core',
    },
    {
      id: 'd20-v1-e7',
      korean: '청소비',
      hangul: 'cheong-so-bi',
      zh: '清洁费', zhEn: 'Cleaning fee',
      pos: '名词', posEn: 'Noun',
      example: { ko: '청소비도 따로예요?', zh: '清洁费也另算吗？', zhEn: 'Is the cleaning fee also separate?' },
      tip: '청소(清扫) + 비(费)。公寓公共区域清洁费，通常包含在管理费里', tipEn: 'Sino-Korean \'cleaning\' + \'fee.\' Cleaning fee for common areas in apartments, usually included in the maintenance fee.',
      tier: 'ext',
    },
    {
      id: 'd20-v1-e8',
      korean: '확인',
      hangul: 'hwa-gin',
      zh: '确认', zhEn: 'Confirm',
      pos: '名词', posEn: 'Noun',
      example: { ko: '한번 확인해 주세요.', zh: '请再确认一次。', zhEn: 'Please check once more.' },
      tip: '汉字词「确认」。搭配 확인하다 = 确认。签约/收货/转账都用', tipEn: 'Sino-Korean word for \'confirm.\' Used with 확인하다 = to confirm. Used for contracts, deliveries, and transfers.',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd20-v1-r1',
      korean: '보증금',
      hangul: 'bo-jeung-geum',
      choices: [
        { zh: '押金', zhEn: 'deposit', correct: true },
        { zh: '月租', zhEn: 'monthly rent', correct: false },
        { zh: '管理费', zhEn: 'maintenance fee', correct: false },
        { zh: '介绍费', zhEn: 'Brokerage fee', correct: false },
      ],
    },
    {
      id: 'd20-v1-r2',
      korean: '월세',
      hangul: 'wol-se',
      choices: [
        { zh: '月租', zhEn: 'monthly rent', correct: true },
        { zh: '押金', zhEn: 'deposit', correct: false },
        { zh: '年费', zhEn: 'Annual fee', correct: false },
        { zh: '房价', zhEn: 'Housing price', correct: false },
      ],
    },
    {
      id: 'd20-v1-r3',
      korean: '원룸',
      hangul: 'won-rum',
      choices: [
        { zh: '一居室', zhEn: 'studio', correct: true },
        { zh: '两居室', zhEn: 'Two-room', correct: false },
        { zh: '公寓大楼', zhEn: 'Apartment building', correct: false },
        { zh: '别墅', zhEn: 'villa', correct: false },
      ],
    },
    {
      id: 'd20-v1-r4',
      korean: '수도세',
      hangul: 'su-do-se',
      choices: [
        { zh: '水费', zhEn: 'Water bill', correct: true },
        { zh: '电费', zhEn: 'Electricity bill', correct: false },
        { zh: '燃气费', zhEn: 'gas bill', correct: false },
        { zh: '暖气费', zhEn: 'heating bill', correct: false },
      ],
    },
    {
      id: 'd20-v1-r5',
      korean: '전기세',
      hangul: 'jeon-gi-se',
      choices: [
        { zh: '电费', zhEn: 'Electricity bill', correct: true },
        { zh: '水费', zhEn: 'Water bill', correct: false },
        { zh: '网费', zhEn: 'internet bill', correct: false },
        { zh: '燃气费', zhEn: 'gas bill', correct: false },
      ],
    },
    {
      id: 'd20-v1-r6',
      korean: '인터넷',
      hangul: 'in-teo-net',
      choices: [
        { zh: '网 / 网络', zhEn: 'Internet', correct: true },
        { zh: '电话', zhEn: 'Phone call', correct: false },
        { zh: '电视', zhEn: 'TV', correct: false },
        { zh: '手机', zhEn: 'phone', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd20-v1-s1',
      zhHint: '房东', zhHintEn: 'landlord',
      answer: ['집', '주', '인'],
      // 干扰："잡"（初声 ㅈ 相同、元音 ㅣ→ㅏ）；"준"（元音 ㅜ 相同）
      syllables: ['집', '주', '인', '잡', '준'],
    },
    {
      id: 'd20-v1-s2',
      zhHint: '管理费', zhHintEn: 'maintenance fee',
      answer: ['관', '리', '비'],
      // 干扰："간"（收音 ㄴ 相同）；"미"（元音 ㅣ 相同）
      syllables: ['관', '리', '비', '간', '미'],
    },
    {
      id: 'd20-v1-s3',
      zhHint: '合同', zhHintEn: 'contract',
      answer: ['계', '약'],
      // 干扰："제"（初声差别）；"악"（元音 ㅏ 相同）
      syllables: ['계', '약', '제', '악'],
    },
    {
      id: 'd20-v1-s4',
      zhHint: '清洁费', zhHintEn: 'Cleaning fee',
      answer: ['청', '소', '비'],
      // 干扰："철"（初声 ㅊ 相同、元音差别）；"조"（元音 ㅗ 相同）
      syllables: ['청', '소', '비', '철', '조'],
    },
  ],

  write: [
    { id: 'd20-v1-w1', korean: '집', hangul: 'jip',       wordKorean: '집주인',  wordZh: '房东', wordZhEn: 'landlord' },
    { id: 'd20-v1-w2', korean: '계', hangul: 'gye',       wordKorean: '계약',    wordZh: '合同', wordZhEn: 'contract' },
    { id: 'd20-v1-w3', korean: '관', hangul: 'gwan',      wordKorean: '관리비',  wordZh: '管理费', wordZhEn: 'maintenance fee' },
    { id: 'd20-v1-w4', korean: '보', hangul: 'bo',        wordKorean: '보증금',  wordZh: '押金', wordZhEn: 'deposit' },
    { id: 'd20-v1-w5', korean: '월', hangul: 'wol',       wordKorean: '월세',    wordZh: '月租', wordZhEn: 'monthly rent' },
    { id: 'd20-v1-w6', korean: '따', hangul: 'tta',       wordKorean: '따로',    wordZh: '另算', wordZhEn: 'Separate' },
    { id: 'd20-v1-w7', korean: '질', hangul: 'jil',       wordKorean: '질문',    wordZh: '问题', wordZhEn: 'question' },
    { id: 'd20-v1-w8', korean: '확', hangul: 'hwak',      wordKorean: '확인',    wordZh: '确认', wordZhEn: 'Confirm' },
  ],

  dictation: [
    { id: 'd20-v1-d1', korean: '보증금',   hangul: 'bo-jeung-geum',   syllables: ['보', '증', '금'],       zh: '押金', zhEn: 'deposit' },
    { id: 'd20-v1-d2', korean: '월세',     hangul: 'wol-se',          syllables: ['월', '세'],             zh: '月租', zhEn: 'monthly rent' },
    { id: 'd20-v1-d3', korean: '들어 있어요', hangul: 'deu-reo i-sseo-yo', syllables: ['들', '어', '있', '어', '요'], zh: '包含', zhEn: 'include' },
  ],
};
