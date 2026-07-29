import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 34 · Haru의 비밀 · 词汇子关卡 */
export const day34Vocab: VocabSubQuestData = {
  day: 4, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '两杯麦茶 · 藏起来的秘密',

  encounter: [
    { id: 'd34-v1-e1', korean: '옛날',       hangul: 'yen-nal',        zh: '以前 / 往日',    pos: '名词', example: { ko: '옛날 친구가 생각나요.',        zh: '想起以前的朋友。' },     tip: '옛(旧) + 날(日)。发音 [옌날]',                              tier: 'core' },
    { id: 'd34-v1-e2', korean: '생각나다',   hangul: 'saeng-gang-na-da', zh: '想起 / 浮现',    pos: '动词', example: { ko: '엄마가 생각나요.',              zh: '想起妈妈了。' },         tip: '생각 + 나다。**自动词**，主语用 이/가（不是 을/를）',       tier: 'core' },
    { id: 'd34-v1-e3', korean: '나중에',     hangul: 'na-jung-e',       zh: '以后 / 回头再',  pos: '副词', example: { ko: '나중에 알려줄게.',              zh: '以后再告诉你。' },       tip: '나중(以后) + 에。承诺句的固定副词',                          tier: 'core' },
    { id: 'd34-v1-e4', korean: '비밀',       hangul: 'bi-mil',          zh: '秘密',            pos: '名词', example: { ko: '이건 비밀이에요.',              zh: '这是秘密。' },           tip: '汉字词秘(비) + 密(밀)。비밀을 지키다 = 保守秘密',            tier: 'core' },
    { id: 'd34-v1-e5', korean: '닮다',       hangul: 'dam-da',          zh: '像 / 相似',       pos: '动词', example: { ko: '너 그 친구랑 닮았어.',          zh: '你和那朋友很像。' },     tip: '收音 ㄻ → [담따]。~을/를 닮다 = 长得像～',                   tier: 'core' },
    { id: 'd34-v1-e6', korean: '알려주다',   hangul: 'al-lyeo-ju-da',   zh: '告知 / 让人知道', pos: '动词', example: { ko: '나중에 알려줄게.',              zh: '以后再告诉你。' },       tip: '알다 使动 → 알리다 → 알려주다。使别人知道',                 tier: 'core' },
    { id: 'd34-v1-e7', korean: '지키다',     hangul: 'ji-ki-da',        zh: '守护 / 保守',     pos: '动词', example: { ko: '비밀을 지킬게.',                zh: '会保守秘密。' },         tip: '비밀 / 약속 / 시간 都能 지키다',                             tier: 'ext' },
    { id: 'd34-v1-e8', korean: '갑자기',     hangul: 'gap-ja-gi',       zh: '突然',            pos: '副词', example: { ko: '엄마가 갑자기 생각났어요.',    zh: '突然想起妈妈了。' },     tip: '与 생각나다 高频搭配 · 表触发',                              tier: 'ext' },
  ],

  recognize: [
    { id: 'd34-v1-r1', korean: '옛날',     hangul: 'yen-nal',        choices: [{ zh: '以前',        correct: true }, { zh: '未来',        correct: false }, { zh: '现在',      correct: false }, { zh: '早晨',     correct: false }] },
    { id: 'd34-v1-r2', korean: '생각나다', hangul: 'saeng-gang-na-da', choices: [{ zh: '想起',        correct: true }, { zh: '想（他动）',   correct: false }, { zh: '忘记',      correct: false }, { zh: '记得',     correct: false }] },
    { id: 'd34-v1-r3', korean: '나중에',   hangul: 'na-jung-e',      choices: [{ zh: '以后',        correct: true }, { zh: '之前',        correct: false }, { zh: '一起',      correct: false }, { zh: '立刻',     correct: false }] },
    { id: 'd34-v1-r4', korean: '비밀',     hangul: 'bi-mil',         choices: [{ zh: '秘密',        correct: true }, { zh: '悄悄话',      correct: false }, { zh: '密码',      correct: false }, { zh: '亲密',     correct: false }] },
    { id: 'd34-v1-r5', korean: '닮다',     hangul: 'dam-da',         choices: [{ zh: '相像',        correct: true }, { zh: '不同',        correct: false }, { zh: '接触',      correct: false }, { zh: '认识',     correct: false }] },
    { id: 'd34-v1-r6', korean: '알려주다', hangul: 'al-lyeo-ju-da',  choices: [{ zh: '告知',        correct: true }, { zh: '问',          correct: false }, { zh: '教',        correct: false }, { zh: '知道',     correct: false }] },
  ],

  spell: [
    { id: 'd34-v1-s1', zhHint: '以前',    answer: ['옛', '날'], syllables: ['옛', '날', '옐', '남'] },
    { id: 'd34-v1-s2', zhHint: '秘密',    answer: ['비', '밀'], syllables: ['비', '밀', '비', '민'] },
    { id: 'd34-v1-s3', zhHint: '以后',    answer: ['나', '중'], syllables: ['나', '중', '나', '즈'] },
    { id: 'd34-v1-s4', zhHint: '守护',    answer: ['지', '키'], syllables: ['지', '키', '지', '기'] },
  ],

  write: [
    { id: 'd34-v1-w1', korean: '옛', hangul: 'yet',    wordKorean: '옛날',     wordZh: '以前' },
    { id: 'd34-v1-w2', korean: '날', hangul: 'nal',    wordKorean: '옛날',     wordZh: '以前' },
    { id: 'd34-v1-w3', korean: '비', hangul: 'bi',     wordKorean: '비밀',     wordZh: '秘密' },
    { id: 'd34-v1-w4', korean: '밀', hangul: 'mil',    wordKorean: '비밀',     wordZh: '秘密' },
    { id: 'd34-v1-w5', korean: '나', hangul: 'na',     wordKorean: '나중에',   wordZh: '以后' },
    { id: 'd34-v1-w6', korean: '중', hangul: 'jung',   wordKorean: '나중에',   wordZh: '以后' },
    { id: 'd34-v1-w7', korean: '닮', hangul: 'dam',    wordKorean: '닮다',     wordZh: '相像' },
    { id: 'd34-v1-w8', korean: '지', hangul: 'ji',     wordKorean: '지키다',   wordZh: '守护' },
  ],

  dictation: [
    { id: 'd34-v1-d1', korean: '생각났어요',        hangul: 'saeng-gang-na-sseo-yo',        syllables: ['생', '각', '났', '어', '요'],                zh: '想起来了' },
    { id: 'd34-v1-d2', korean: '나중에 알려줄게',    hangul: 'na-jung-e al-lyeo-jul-ge',      syllables: ['나', '중', '에', '알', '려', '줄', '게'],    zh: '以后再告诉你' },
    { id: 'd34-v1-d3', korean: '비밀을 지킬게',      hangul: 'bi-mi-reul ji-kil-ge',           syllables: ['비', '밀', '을', '지', '킬', '게'],           zh: '会保守秘密' },
  ],
};
