import type { VocabSubQuestData } from '@/types/tori-subquest';

/**
 * Day 18 · 1-1 단어 마스터 · 词汇子关卡
 *
 * 银行开户场景 8 个新词：
 * - core: 여권 / 서류 / 입력 / 자리 / 개설 / 학생증
 * - ext:  만들다 / 부탁드립니다
 */
export const day18Vocab: VocabSubQuestData = {
  day: 18,
  level: 'beginner',
  idx: 1,
  kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '兽民银行柜台前学会的 8 个词',

  encounter: [
    {
      id: 'd18-v1-e1',
      korean: '여권',
      hangul: 'yeo-gwon',
      zh: '护照',
      pos: '名词',
      example: { ko: '여권 여기 있어요.', zh: '护照在这里。' },
      tip: '汉字词「旅券」。开户/入住酒店必备。搭配「여권 번호」= 护照号',
      tier: 'core',
    },
    {
      id: 'd18-v1-e2',
      korean: '서류',
      hangul: 'seo-ryu',
      zh: '文件 / 材料',
      pos: '名词',
      example: { ko: '서류 다 준비했어요.', zh: '文件都准备好了。' },
      tip: '汉字词「书类」。搭配 「서류를 작성하다」= 填写文件。银行/机关的标准用词',
      tier: 'core',
    },
    {
      id: 'd18-v1-e3',
      korean: '입력',
      hangul: 'im-ryeok',
      zh: '输入',
      pos: '名词',
      example: { ko: '비밀번호를 입력해 주세요.', zh: '请输入密码。' },
      tip: '汉字词「入力」。搭配 「입력하다」= 输入。数字/文字 输入都用。反义 「출력」= 输出',
      tier: 'core',
    },
    {
      id: 'd18-v1-e4',
      korean: '자리',
      hangul: 'ja-ri',
      zh: '位 / 位置',
      pos: '名词',
      example: { ko: '비밀번호 네 자리요.', zh: '密码四位。' },
      tip: '固有词。「네 자리」= 四位数（密码）；「자리에 앉다」= 就座。多义词',
      tier: 'core',
    },
    {
      id: 'd18-v1-e5',
      korean: '개설',
      hangul: 'gae-seol',
      zh: '开设 / 开通',
      pos: '名词',
      example: { ko: '계좌 개설하고 싶어요.', zh: '我想开账户。' },
      tip: '汉字词「开设」。「계좌 개설」= 开账户（比 「통장 만들다」更正式）',
      tier: 'core',
    },
    {
      id: 'd18-v1-e6',
      korean: '학생증',
      hangul: 'hak-saeng-jeung',
      zh: '学生证',
      pos: '名词',
      example: { ko: '학생증도 필요해요?', zh: '也需要学生证吗？' },
      tip: '汉字词「学生证」。学校/学生优惠时必用。搭配 「학생증을 보여 주세요」= 请出示学生证',
      tier: 'core',
    },
    {
      id: 'd18-v1-e7',
      korean: '만들다',
      hangul: 'man-deul-da',
      zh: '做 / 制作 / 办理',
      pos: '动词',
      example: { ko: '통장 만들고 싶어요.', zh: '想开存折。' },
      tip: 'ㄹ 词干动词。「~을/를 만들다」= 做~。银行"办卡/办账户"都用。ㄹ 收音在 고 前保留',
      tier: 'ext',
    },
    {
      id: 'd18-v1-e8',
      korean: '부탁드립니다',
      hangul: 'bu-tak-deu-rim-ni-da',
      zh: '拜托您 / 请',
      pos: '表达',
      example: { ko: '여권 부탁드립니다.', zh: '请给我护照。' },
      tip: '부탁하다(拜托) 的敬语 → 부탁드리다 + 합쇼체 → 부탁드립니다。银行/公文场合最礼貌',
      tier: 'ext',
    },
  ],

  write: [
    { id: 'd18-v1-w1', korean: '여',  hangul: 'yeo',     wordKorean: '여권',       wordZh: '护照' },
    { id: 'd18-v1-w2', korean: '서',  hangul: 'seo',     wordKorean: '서류',       wordZh: '文件' },
    { id: 'd18-v1-w3', korean: '입',  hangul: 'ip',      wordKorean: '입력',       wordZh: '输入' },
    { id: 'd18-v1-w4', korean: '자',  hangul: 'ja',      wordKorean: '자리',       wordZh: '位' },
    { id: 'd18-v1-w5', korean: '개',  hangul: 'gae',     wordKorean: '개설',       wordZh: '开设' },
    { id: 'd18-v1-w6', korean: '증',  hangul: 'jeung',   wordKorean: '학생증',     wordZh: '学生证' },
    { id: 'd18-v1-w7', korean: '들',  hangul: 'deul',    wordKorean: '만들다',     wordZh: '做/办' },
    { id: 'd18-v1-w8', korean: '부',  hangul: 'bu',      wordKorean: '부탁드립니다', wordZh: '拜托您' },
  ],

  recognize: [
    {
      id: 'd18-v1-r1',
      korean: '여권',
      hangul: 'yeo-gwon',
      choices: [
        { zh: '护照', correct: true },
        { zh: '存折', correct: false },
        { zh: '身份证', correct: false },
        { zh: '登录证', correct: false },
      ],
    },
    {
      id: 'd18-v1-r2',
      korean: '서류',
      hangul: 'seo-ryu',
      choices: [
        { zh: '文件 / 材料', correct: true },
        { zh: '书本', correct: false },
        { zh: '笔记', correct: false },
        { zh: '合同', correct: false },
      ],
    },
    {
      id: 'd18-v1-r3',
      korean: '입력',
      hangul: 'im-ryeok',
      choices: [
        { zh: '输入', correct: true },
        { zh: '输出', correct: false },
        { zh: '删除', correct: false },
        { zh: '确认', correct: false },
      ],
    },
    {
      id: 'd18-v1-r4',
      korean: '자리',
      hangul: 'ja-ri',
      choices: [
        { zh: '位 / 位置', correct: true },
        { zh: '房间', correct: false },
        { zh: '楼层', correct: false },
        { zh: '门', correct: false },
      ],
    },
    {
      id: 'd18-v1-r5',
      korean: '개설',
      hangul: 'gae-seol',
      choices: [
        { zh: '开设 / 开通', correct: true },
        { zh: '关闭', correct: false },
        { zh: '取消', correct: false },
        { zh: '恢复', correct: false },
      ],
    },
    {
      id: 'd18-v1-r6',
      korean: '학생증',
      hangul: 'hak-saeng-jeung',
      choices: [
        { zh: '学生证', correct: true },
        { zh: '身份证', correct: false },
        { zh: '驾照', correct: false },
        { zh: '护照', correct: false },
      ],
    },
  ],

  spell: [
    {
      id: 'd18-v1-s1',
      zhHint: '存折',
      answer: ['통', '장'],
      // 干扰："동"（초성 ㅌ→ㄷ 送气差别）；"창"（초성 ㅈ→ㅊ 送气差别）
      syllables: ['통', '장', '동', '창'],
    },
    {
      id: 'd18-v1-s2',
      zhHint: '密码',
      answer: ['비', '밀', '번', '호'],
      // 干扰："피"（초성 ㅂ→ㅍ 送气差别）；"본"（元음 ㅓ→ㅗ 混）
      syllables: ['비', '밀', '번', '호', '피', '본'],
    },
    {
      id: 'd18-v1-s3',
      zhHint: '银行',
      answer: ['은', '행'],
      // 干扰："운"（초성 ㅇ 相同、元음差别）；"항"（元음 ㅐ→ㅏ 混）
      syllables: ['은', '행', '운', '항'],
    },
    {
      id: 'd18-v1-s4',
      zhHint: '签名',
      answer: ['사', '인'],
      // 干扰："서"（元음 ㅏ→ㅓ 混）；"응"（초성 ㅇ 相同、元음 ㅣ→ㅡ 混）
      syllables: ['사', '인', '서', '응'],
    },
  ],

  dictation: [
    { id: 'd18-v1-d1', korean: '통장',      hangul: 'tong-jang',       syllables: ['통', '장'],           zh: '存折' },
    { id: 'd18-v1-d2', korean: '만들고 싶어요', hangul: 'man-deul-go si-peo-yo', syllables: ['만', '들', '고', '싶', '어', '요'], zh: '想开/办' },
    { id: 'd18-v1-d3', korean: '여기 있어요', hangul: 'yeo-gi i-sseo-yo', syllables: ['여', '기', '있', '어', '요'], zh: '在这里' },
  ],
};
