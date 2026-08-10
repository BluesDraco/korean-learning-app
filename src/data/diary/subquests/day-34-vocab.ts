import type { VocabSubQuestData } from '@/types/tori-subquest';

/** Day 34 · Haru의 비밀 · 词汇子关卡 */
export const day34Vocab: VocabSubQuestData = {
  day: 4, level: 'intermediate', idx: 1, kind: 'vocab',
  koTitle: '단어 마스터',
  subtitle: '两杯麦茶 · 藏起来的秘密', subtitleEn: 'Two cups of barley tea · A hidden secret',

  encounter: [
    { id: 'd34-v1-e1', korean: '옛날',       hangul: 'yen-nal',        zh: '以前 / 往日', zhEn: 'Previously / In the past',    pos: '名词', posEn: 'Noun', example: { ko: '옛날 친구가 생각나요.',        zh: '想起以前的朋友。', zhEn: 'Reminds me of a friend from the past.' },     tip: '옛(旧) + 날(日)。发音 [옌날]', tipEn: '옛 (old) + 날 (day). Pronounced [옌날]',                              tier: 'core' },
    { id: 'd34-v1-e2', korean: '생각나다',   hangul: 'saeng-gang-na-da', zh: '想起 / 浮现', zhEn: 'Recall / Come to mind',    pos: '动词', posEn: 'Verb', example: { ko: '엄마가 생각나요.',              zh: '想起妈妈了。', zhEn: 'I thought of my mom.' },         tip: '생각 + 나다。**自动词**，主语用 이/가（不是 을/를）', tipEn: 'Think + come up. **Intransitive verb**, subject takes 이/가 (not 을/를)',       tier: 'core' },
    { id: 'd34-v1-e3', korean: '나중에',     hangul: 'na-jung-e',       zh: '以后 / 回头再', zhEn: 'Later / see you later',  pos: '副词', posEn: 'Adverb', example: { ko: '나중에 알려줄게.',              zh: '以后再告诉你。', zhEn: 'I\'ll tell you later.' },       tip: '나중(以后) + 에。承诺句的固定副词', tipEn: '나중 (later) + 에. Fixed adverb for promise sentences',                          tier: 'core' },
    { id: 'd34-v1-e4', korean: '비밀',       hangul: 'bi-mil',          zh: '秘密', zhEn: 'secret',            pos: '名词', posEn: 'Noun', example: { ko: '이건 비밀이에요.',              zh: '这是秘密。', zhEn: 'This is a secret.' },           tip: '汉字词秘(비) + 密(밀)。비밀을 지키다 = 保守秘密', tipEn: 'Sino-Korean word 비(secret) + 밀(dense). 비밀을 지키다 = to keep a secret',            tier: 'core' },
    { id: 'd34-v1-e5', korean: '닮다',       hangul: 'dam-da',          zh: '像 / 相似', zhEn: 'Resemble / be similar',       pos: '动词', posEn: 'Verb', example: { ko: '너 그 친구랑 닮았어.',          zh: '你和那朋友很像。', zhEn: 'You\'re very similar to that friend.' },     tip: '收音 ㄻ → [담따]。~을/를 닮다 = 长得像～', tipEn: 'Final consonant ㄻ → [담따]. ~을/를 닮다 = look like ~',                   tier: 'core' },
    { id: 'd34-v1-e6', korean: '알려주다',   hangul: 'al-lyeo-ju-da',   zh: '告知 / 让人知道', zhEn: 'Inform / let someone know', pos: '动词', posEn: 'Verb', example: { ko: '나중에 알려줄게.',              zh: '以后再告诉你。', zhEn: 'I\'ll tell you later.' },       tip: '알다 使动 → 알리다 → 알려주다。使别人知道', tipEn: '알다 causative → 알리다 → 알려주다. Make someone know',                 tier: 'core' },
    { id: 'd34-v1-e7', korean: '지키다',     hangul: 'ji-ki-da',        zh: '守护 / 保守', zhEn: 'Guard / keep',     pos: '动词', posEn: 'Verb', example: { ko: '비밀을 지킬게.',                zh: '会保守秘密。', zhEn: 'Will keep the secret.' },         tip: '비밀 / 약속 / 시간 都能 지키다', tipEn: '비밀 / 약속 / 시간 can all take 지키다',                             tier: 'ext' },
    { id: 'd34-v1-e8', korean: '갑자기',     hangul: 'gap-ja-gi',       zh: '突然', zhEn: 'Suddenly',            pos: '副词', posEn: 'Adverb', example: { ko: '엄마가 갑자기 생각났어요.',    zh: '突然想起妈妈了。', zhEn: 'Suddenly thought of mom.' },     tip: '与 생각나다 高频搭配 · 表触发', tipEn: 'Frequently pairs with 생각나다 · indicates a trigger',                              tier: 'ext' },
  ],

  recognize: [
    { id: 'd34-v1-r1', korean: '옛날',     hangul: 'yen-nal',        choices: [{ zh: '以前', zhEn: 'before',        correct: true }, { zh: '未来', zhEn: 'Future',        correct: false }, { zh: '现在', zhEn: 'Now',      correct: false }, { zh: '早晨', zhEn: 'morning',     correct: false }] },
    { id: 'd34-v1-r2', korean: '생각나다', hangul: 'saeng-gang-na-da', choices: [{ zh: '想起', zhEn: 'to recall',        correct: true }, { zh: '想（他动）', zhEn: 'Think (transitive)',   correct: false }, { zh: '忘记', zhEn: 'Forget',      correct: false }, { zh: '记得', zhEn: 'Remember',     correct: false }] },
    { id: 'd34-v1-r3', korean: '나중에',   hangul: 'na-jung-e',      choices: [{ zh: '以后', zhEn: 'after',        correct: true }, { zh: '之前', zhEn: 'before',        correct: false }, { zh: '一起', zhEn: 'together',      correct: false }, { zh: '立刻', zhEn: 'right away',     correct: false }] },
    { id: 'd34-v1-r4', korean: '비밀',     hangul: 'bi-mil',         choices: [{ zh: '秘密', zhEn: 'secret',        correct: true }, { zh: '悄悄话', zhEn: 'Whisper',      correct: false }, { zh: '密码', zhEn: 'PIN',      correct: false }, { zh: '亲密', zhEn: 'Close / intimate',     correct: false }] },
    { id: 'd34-v1-r5', korean: '닮다',     hangul: 'dam-da',         choices: [{ zh: '相像', zhEn: 'to resemble',        correct: true }, { zh: '不同', zhEn: 'Different',        correct: false }, { zh: '接触', zhEn: 'Contact',      correct: false }, { zh: '认识', zhEn: 'know',     correct: false }] },
    { id: 'd34-v1-r6', korean: '알려주다', hangul: 'al-lyeo-ju-da',  choices: [{ zh: '告知', zhEn: 'Inform',        correct: true }, { zh: '问', zhEn: 'Ask',          correct: false }, { zh: '教', zhEn: 'teach',        correct: false }, { zh: '知道', zhEn: 'Know',     correct: false }] },
  ],

  spell: [
    { id: 'd34-v1-s1', zhHint: '以前', zhHintEn: 'before',    answer: ['옛', '날'], syllables: ['옛', '날', '옐', '남'] },
    { id: 'd34-v1-s2', zhHint: '秘密', zhHintEn: 'secret',    answer: ['비', '밀'], syllables: ['비', '밀', '비', '민'] },
    { id: 'd34-v1-s3', zhHint: '以后', zhHintEn: 'after',    answer: ['나', '중'], syllables: ['나', '중', '나', '즈'] },
    { id: 'd34-v1-s4', zhHint: '守护', zhHintEn: 'Protect',    answer: ['지', '키'], syllables: ['지', '키', '지', '기'] },
  ],

  write: [
    { id: 'd34-v1-w1', korean: '옛', hangul: 'yet',    wordKorean: '옛날',     wordZh: '以前', wordZhEn: 'before' },
    { id: 'd34-v1-w2', korean: '날', hangul: 'nal',    wordKorean: '옛날',     wordZh: '以前', wordZhEn: 'before' },
    { id: 'd34-v1-w3', korean: '비', hangul: 'bi',     wordKorean: '비밀',     wordZh: '秘密', wordZhEn: 'secret' },
    { id: 'd34-v1-w4', korean: '밀', hangul: 'mil',    wordKorean: '비밀',     wordZh: '秘密', wordZhEn: 'secret' },
    { id: 'd34-v1-w5', korean: '나', hangul: 'na',     wordKorean: '나중에',   wordZh: '以后', wordZhEn: 'after' },
    { id: 'd34-v1-w6', korean: '중', hangul: 'jung',   wordKorean: '나중에',   wordZh: '以后', wordZhEn: 'after' },
    { id: 'd34-v1-w7', korean: '닮', hangul: 'dam',    wordKorean: '닮다',     wordZh: '相像', wordZhEn: 'to resemble' },
    { id: 'd34-v1-w8', korean: '지', hangul: 'ji',     wordKorean: '지키다',   wordZh: '守护', wordZhEn: 'Protect' },
  ],

  dictation: [
    { id: 'd34-v1-d1', korean: '생각났어요',        hangul: 'saeng-gang-na-sseo-yo',        syllables: ['생', '각', '났', '어', '요'],                zh: '想起来了', zhEn: 'I remember now' },
    { id: 'd34-v1-d2', korean: '나중에 알려줄게',    hangul: 'na-jung-e al-lyeo-jul-ge',      syllables: ['나', '중', '에', '알', '려', '줄', '게'],    zh: '以后再告诉你', zhEn: 'I\'ll tell you later' },
    { id: 'd34-v1-d3', korean: '비밀을 지킬게',      hangul: 'bi-mi-reul ji-kil-ge',           syllables: ['비', '밀', '을', '지', '킬', '게'],           zh: '会保守秘密', zhEn: 'Will keep the secret' },
  ],
};
