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
  subtitle: '看房时听到的 8 个费用词',

  encounter: [
    {
      id: 'd20-v1-e1',
      korean: '보증금',
      hangul: 'bo-jeung-geum',
      zh: '押金',
      pos: '名词',
      example: { ko: '보증금 500만이에요.', zh: '押金500万。' },
      tip: '汉字词「保证金」。韩国租房押金通常几百万到上亿韩元，退租时全退。跟中国「二押一」概念不同',
      tier: 'core',
    },
    {
      id: 'd20-v1-e2',
      korean: '월세',
      hangul: 'wol-se',
      zh: '月租',
      pos: '名词',
      example: { ko: '월세 50만이에요.', zh: '月租50万。' },
      tip: '汉字词「月贳」。「贳」是租借的意思。对应 전세（全额押租）—— 韩国特有的租房制度',
      tier: 'core',
    },
    {
      id: 'd20-v1-e3',
      korean: '원룸',
      hangul: 'won-rum',
      zh: '一居室',
      pos: '名词',
      example: { ko: '원룸에 살아요.', zh: '住一居室。' },
      tip: '英语外来语 one + room。留学生最常见的房型，一间房+独立卫浴+小厨',
      tier: 'core',
    },
    {
      id: 'd20-v1-e4',
      korean: '수도세',
      hangul: 'su-do-se',
      zh: '水费',
      pos: '名词',
      example: { ko: '수도세는 관리비에 들어 있어요.', zh: '水费包含在管理费里。' },
      tip: '수도(水道) + 세(税/费)。韩国房租通常不含水电费。「전기세」「가스비」和「수도세」是租房三大费用',
      tier: 'core',
    },
    {
      id: 'd20-v1-e5',
      korean: '전기세',
      hangul: 'jeon-gi-se',
      zh: '电费',
      pos: '名词',
      example: { ko: '전기세 따로예요.', zh: '电费另算。' },
      tip: '전기(电气) + 세。韩国夏天用空调电费飙升，是租房时必确认的项目',
      tier: 'core',
    },
    {
      id: 'd20-v1-e6',
      korean: '인터넷',
      hangul: 'in-teo-net',
      zh: '网 / 网络',
      pos: '名词',
      example: { ko: '인터넷은 관리비에 들어 있어요.', zh: '网费包含在管理费里。' },
      tip: '英语外来语 internet。租房时问"인터넷 포함이에요?"（含网费吗？）',
      tier: 'core',
    },
    {
      id: 'd20-v1-e7',
      korean: '청소비',
      hangul: 'cheong-so-bi',
      zh: '清洁费',
      pos: '名词',
      example: { ko: '청소비도 따로예요?', zh: '清洁费也另算吗？' },
      tip: '청소(清扫) + 비(费)。公寓公共区域清洁费，通常包含在管理费里',
      tier: 'ext',
    },
    {
      id: 'd20-v1-e8',
      korean: '확인',
      hangul: 'hwa-gin',
      zh: '确认',
      pos: '名词',
      example: { ko: '한번 확인해 주세요.', zh: '请再确认一次。' },
      tip: '汉字词「确认」。搭配 확인하다 = 确认。签约/收货/转账都用',
      tier: 'ext',
    },
  ],

  recognize: [
    {
      id: 'd20-v1-r1',
      korean: '보증금',
      hangul: 'bo-jeung-geum',
      choices: [
        { zh: '押金', correct: true },
        { zh: '月租', correct: false },
        { zh: '管理费', correct: false },
        { zh: '介绍费', correct: false },
      ],
    },
    {
      id: 'd20-v1-r2',
      korean: '월세',
      hangul: 'wol-se',
      choices: [
        { zh: '月租', correct: true },
        { zh: '押金', correct: false },
        { zh: '年费', correct: false },
        { zh: '房价', correct: false },
      ],
    },
    {
      id: 'd20-v1-r3',
      korean: '원룸',
      hangul: 'won-rum',
      choices: [
        { zh: '一居室', correct: true },
        { zh: '两居室', correct: false },
        { zh: '公寓大楼', correct: false },
        { zh: '别墅', correct: false },
      ],
    },
    {
      id: 'd20-v1-r4',
      korean: '수도세',
      hangul: 'su-do-se',
      choices: [
        { zh: '水费', correct: true },
        { zh: '电费', correct: false },
        { zh: '燃气费', correct: false },
        { zh: '暖气费', correct: false },
      ],
    },
    {
      id: 'd20-v1-r5',
      korean: '전기세',
      hangul: 'jeon-gi-se',
      choices: [
        { zh: '电费', correct: true },
        { zh: '水费', correct: false },
        { zh: '网费', correct: false },
        { zh: '燃气费', correct: false },
      ],
    },
    {
      id: 'd20-v1-r6',
      korean: '인터넷',
      hangul: 'in-teo-net',
      choices: [
        { zh: '网 / 网络', correct: true },
        { zh: '电话', correct: false },
        { zh: '电视', correct: false },
        { zh: '手机', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd20-v1-s1',
      zhHint: '房东',
      answer: ['집', '주', '인'],
      // 干扰："잡"（初声 ㅈ 相同、元音 ㅣ→ㅏ）；"준"（元音 ㅜ 相同）
      syllables: ['집', '주', '인', '잡', '준'],
    },
    {
      id: 'd20-v1-s2',
      zhHint: '管理费',
      answer: ['관', '리', '비'],
      // 干扰："간"（收音 ㄴ 相同）；"미"（元音 ㅣ 相同）
      syllables: ['관', '리', '비', '간', '미'],
    },
    {
      id: 'd20-v1-s3',
      zhHint: '合同',
      answer: ['계', '약'],
      // 干扰："제"（初声差别）；"악"（元音 ㅏ 相同）
      syllables: ['계', '약', '제', '악'],
    },
    {
      id: 'd20-v1-s4',
      zhHint: '清洁费',
      answer: ['청', '소', '비'],
      // 干扰："철"（初声 ㅊ 相同、元音差别）；"조"（元音 ㅗ 相同）
      syllables: ['청', '소', '비', '철', '조'],
    },
  ],

  write: [
    { id: 'd20-v1-w1', korean: '집', hangul: 'jip',       wordKorean: '집주인',  wordZh: '房东' },
    { id: 'd20-v1-w2', korean: '계', hangul: 'gye',       wordKorean: '계약',    wordZh: '合同' },
    { id: 'd20-v1-w3', korean: '관', hangul: 'gwan',      wordKorean: '관리비',  wordZh: '管理费' },
    { id: 'd20-v1-w4', korean: '보', hangul: 'bo',        wordKorean: '보증금',  wordZh: '押金' },
    { id: 'd20-v1-w5', korean: '월', hangul: 'wol',       wordKorean: '월세',    wordZh: '月租' },
    { id: 'd20-v1-w6', korean: '따', hangul: 'tta',       wordKorean: '따로',    wordZh: '另算' },
    { id: 'd20-v1-w7', korean: '질', hangul: 'jil',       wordKorean: '질문',    wordZh: '问题' },
    { id: 'd20-v1-w8', korean: '확', hangul: 'hwak',      wordKorean: '확인',    wordZh: '确认' },
  ],

  dictation: [
    { id: 'd20-v1-d1', korean: '보증금',   hangul: 'bo-jeung-geum',   syllables: ['보', '증', '금'],       zh: '押金' },
    { id: 'd20-v1-d2', korean: '월세',     hangul: 'wol-se',          syllables: ['월', '세'],             zh: '月租' },
    { id: 'd20-v1-d3', korean: '들어 있어요', hangul: 'deu-reo i-sseo-yo', syllables: ['들', '어', '있', '어', '요'], zh: '包含' },
  ],
};
