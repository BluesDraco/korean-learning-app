export interface PhoneticLetter {
  id: string;
  letter: string;
  name: string;
  romanization: string;
  quizRomanization?: string; // unambiguous single value used in quiz options
  quizLetter?: string;       // representative letter for batchim groups in quiz
  type: 'vowel' | 'consonant' | 'double' | 'batchim';
  subtype: string;
  nameEn?: string;
  sound: string;
  soundEn?: string;
  mnemonic: string;
  mnemonicEn?: string;
  emoji: string;
  strokeOrder?: string[];
  strokeOrderEn?: string[];
  /** Multi-jamo batchim 组（如 ㄱ/ㄲ/ㅋ 都做ㄱ收音），UI 拆成多个按钮但共用同一录音 */
  members?: string[];
}

export const vowels: PhoneticLetter[] = [
  // Basic vowels (10)
  { id: 'v-01', letter: 'ㅏ', name: '아', romanization: 'a', type: 'vowel', subtype: 'basic', sound: '类似中文"啊"', mnemonic: '一个人站立，两臂展开', emoji: '🧍' },
  { id: 'v-02', letter: 'ㅑ', name: '야', romanization: 'ya', type: 'vowel', subtype: 'basic', sound: '类似中文"呀"', mnemonic: 'ㅏ+ㅣ=呀', emoji: '🙋' },
  { id: 'v-03', letter: 'ㅓ', name: '어', romanization: 'eo', type: 'vowel', subtype: 'basic', sound: '类似英语"aw"', mnemonic: '嘴型扁平，像发"哦"但嘴不圆', emoji: '😮' },
  { id: 'v-04', letter: 'ㅕ', name: '여', romanization: 'yeo', type: 'vowel', subtype: 'basic', sound: '类似中文"哟"但嘴不圆（扁嘴发哟）', mnemonic: 'ㅓ+ㅣ=哟(扁嘴)', emoji: '🤔' },
  { id: 'v-05', letter: 'ㅗ', name: '오', romanization: 'o', type: 'vowel', subtype: 'basic', sound: '类似中文"哦"', mnemonic: '像一个小圆圈，嘴型圆', emoji: '⭕' },
  { id: 'v-06', letter: 'ㅛ', name: '요', romanization: 'yo', type: 'vowel', subtype: 'basic', sound: '类似中文"哟"', mnemonic: 'ㅗ+ㅣ=哟', emoji: '👋' },
  { id: 'v-07', letter: 'ㅜ', name: '우', romanization: 'u', type: 'vowel', subtype: 'basic', sound: '类似中文"乌"', mnemonic: '像一个小横线，嘴型嘟起', emoji: '🫦' },
  { id: 'v-08', letter: 'ㅠ', name: '유', romanization: 'yu', type: 'vowel', subtype: 'basic', sound: '类似英语"you"', mnemonic: 'ㅜ+ㅣ=you', emoji: '👉' },
  { id: 'v-09', letter: 'ㅡ', name: '으', romanization: 'eu', type: 'vowel', subtype: 'basic', sound: '类似拼音"e"但嘴角向两边拉', mnemonic: '像一条横线，嘴型扁平', emoji: '😐' },
  { id: 'v-10', letter: 'ㅣ', name: '이', romanization: 'i', type: 'vowel', subtype: 'basic', sound: '类似中文"一"', mnemonic: '像一根竖线，嘴唇向两边拉', emoji: '📏' },
  // Compound vowels (11)
  { id: 'v-11', letter: 'ㅐ', name: '애', romanization: 'ae', type: 'vowel', subtype: 'compound', sound: '类似英语"apple"中的a', mnemonic: 'ㅏ+ㅣ→ae，嘴张得比ㅏ小', emoji: '🍎' },
  { id: 'v-12', letter: 'ㅒ', name: '얘', romanization: 'yae', type: 'vowel', subtype: 'compound', sound: '类似"也"的韵母', mnemonic: 'ㅑ+ㅣ→yae', emoji: '🗣️' },
  { id: 'v-13', letter: 'ㅔ', name: '에', romanization: 'e', type: 'vowel', subtype: 'compound', sound: '类似英语"bed"中的e', mnemonic: 'ㅓ+ㅣ→e，比ㅐ嘴型更小', emoji: '🛏️' },
  { id: 'v-14', letter: 'ㅖ', name: '예', romanization: 'ye', type: 'vowel', subtype: 'compound', sound: '类似中文"也"', mnemonic: 'ㅕ+ㅣ→ye', emoji: '✨' },
  { id: 'v-15', letter: 'ㅘ', name: '와', romanization: 'wa', type: 'vowel', subtype: 'compound', sound: '类似中文"哇"', mnemonic: 'ㅗ+ㅏ→wa', emoji: '😲' },
  { id: 'v-16', letter: 'ㅙ', name: '왜', romanization: 'wae', type: 'vowel', subtype: 'compound', sound: '类似英语"way"', mnemonic: 'ㅗ+ㅐ→wae', emoji: '🛤️' },
  { id: 'v-17', letter: 'ㅚ', name: '외', romanization: 'oe', type: 'vowel', subtype: 'compound', sound: '类似英语"way"但嘴更圆', mnemonic: 'ㅗ+ㅣ→oe', emoji: '🔄' },
  { id: 'v-18', letter: 'ㅝ', name: '워', romanization: 'wo', type: 'vowel', subtype: 'compound', sound: '类似中文"我"，ㅜ+ㅓ快速连读', mnemonic: 'ㅜ+ㅓ→wo', emoji: '🌊' },
  { id: 'v-19', letter: 'ㅞ', name: '웨', romanization: 'we', type: 'vowel', subtype: 'compound', sound: '类似英语"wet"中的we', mnemonic: 'ㅜ+ㅔ→we', emoji: '💧' },
  { id: 'v-20', letter: 'ㅟ', name: '위', romanization: 'wi', type: 'vowel', subtype: 'compound', sound: '类似英语"we"', mnemonic: 'ㅜ+ㅣ→wi', emoji: '⬆️' },
  { id: 'v-21', letter: 'ㅢ', name: '의', romanization: 'ui', type: 'vowel', subtype: 'compound', sound: '类似"额一"快速连读', mnemonic: 'ㅡ+ㅣ→ui', emoji: '🤝' },
];

export const consonants: PhoneticLetter[] = [
  // Basic consonants (14)
  { id: 'c-01', letter: 'ㄱ', name: '기역', romanization: 'g/k', quizRomanization: 'g', type: 'consonant', subtype: 'basic', sound: '类似中文"哥"的声母，词首送气少', mnemonic: '像一把刀的形状', emoji: '🔪', strokeOrder: ['从左到右一横', '从上到下一竖'] },
  { id: 'c-02', letter: 'ㄴ', name: '니은', romanization: 'n', type: 'consonant', subtype: 'basic', sound: '类似中文"呢"的声母', mnemonic: '像鼻子的侧面轮廓', emoji: '👃', strokeOrder: ['从上到下写竖折'] },
  { id: 'c-03', letter: 'ㄷ', name: '디귿', romanization: 'd/t', quizRomanization: 'd', type: 'consonant', subtype: 'basic', sound: '类似中文"的"的声母', mnemonic: '像一扇门的形状 口', emoji: '🚪', strokeOrder: ['先写上面一横', '再写下面一横', '连接左边一竖'] },
  { id: 'c-04', letter: 'ㄹ', name: '리을', romanization: 'r/l', quizRomanization: 'r', type: 'consonant', subtype: 'basic', sound: '介于r和l之间，弹舌音', mnemonic: '像蜿蜒的小路', emoji: '🛤️', strokeOrder: ['从上到下写折线'] },
  { id: 'c-05', letter: 'ㅁ', name: '미음', romanization: 'm', type: 'consonant', subtype: 'basic', sound: '类似中文"么"的声母', mnemonic: '像嘴巴的形状 口', emoji: '👄', strokeOrder: ['先写上面一横', '再写左右两竖', '最后写下面一横'] },
  { id: 'c-06', letter: 'ㅂ', name: '비읍', romanization: 'b/p', quizRomanization: 'b', type: 'consonant', subtype: 'basic', sound: '类似中文"波"的声母', mnemonic: '像一个水桶的形状', emoji: '🪣', strokeOrder: ['先写左边一竖', '再写右边两横'] },
  { id: 'c-07', letter: 'ㅅ', name: '시옷', romanization: 's', quizRomanization: 's', type: 'consonant', subtype: 'basic', sound: '类似中文"丝"的声母（在ㅣ前发sh）', mnemonic: '像一座山的形状 人', emoji: '⛰️', strokeOrder: ['从左上向右下', '从右上向左下'] },
  { id: 'c-08', letter: 'ㅇ', name: '이응', romanization: '–/ng', quizRomanization: 'silent', type: 'consonant', subtype: 'basic', sound: '作初声时不发音，作终声时发ng', mnemonic: '像数字0，代表空/无', emoji: '⭕', strokeOrder: ['画一个圆圈'] },
  { id: 'c-09', letter: 'ㅈ', name: '지읒', romanization: 'j', quizRomanization: 'j', type: 'consonant', subtype: 'basic', sound: '类似中文"资"的声母', mnemonic: '像一个人伸出手臂', emoji: '🤸', strokeOrder: ['先写ㅅ', '再在上面加一横'] },
  { id: 'c-10', letter: 'ㅊ', name: '치읓', romanization: 'ch', type: 'consonant', subtype: 'basic', sound: '类似中文"吃"的声母（送气）', mnemonic: 'ㅈ+一横=更强的送气', emoji: '💨', strokeOrder: ['先写ㅈ', '再在上面加一横'] },
  { id: 'c-11', letter: 'ㅋ', name: '키읔', romanization: 'k', type: 'consonant', subtype: 'basic', sound: '类似中文"科"的声母（送气强）', mnemonic: 'ㄱ+一横=更强的送气', emoji: '🌬️', strokeOrder: ['先写ㄱ', '再在中间加一横'] },
  { id: 'c-12', letter: 'ㅌ', name: '티읕', romanization: 't', type: 'consonant', subtype: 'basic', sound: '类似中文"特"的声母（送气）', mnemonic: 'ㄷ+一横=更强的送气', emoji: '💥', strokeOrder: ['先写ㄷ', '再在中间加一横'] },
  { id: 'c-13', letter: 'ㅍ', name: '피읖', romanization: 'p', type: 'consonant', subtype: 'basic', sound: '类似中文"坡"的声母（送气）', mnemonic: 'ㅂ+一横=更强的送气', emoji: '🎈', strokeOrder: ['先写ㅂ', '再在中间加一横'] },
  { id: 'c-14', letter: 'ㅎ', name: '히읗', romanization: 'h', type: 'consonant', subtype: 'basic', sound: '类似中文"喝"的声母', mnemonic: '像一顶帽子的形状', emoji: '🎩', strokeOrder: ['先在上面画一个小圈', '再在下面画一个ㅇ'] },
  // Double/tensed consonants (5)
  { id: 'c-15', letter: 'ㄲ', name: '쌍기역', romanization: 'kk', type: 'consonant', subtype: 'double', sound: '不送气、声门收紧；用力发一个短促的"嘎"', soundEn: 'Unaspirated, with a tensed glottis; force out a short, sharp "嘎" (ga)', mnemonic: '两个ㄱ=加倍用力', mnemonicEn: 'two ㄱ = double the force', emoji: '💪' },
  { id: 'c-16', letter: 'ㄸ', name: '쌍디귿', romanization: 'tt', type: 'consonant', subtype: 'double', sound: '不送气、声门收紧；用力发一个短促的"哒"', soundEn: 'Unaspirated, with a tensed glottis; force out a short, sharp "哒" (da)', mnemonic: '两个ㄷ=加倍用力', mnemonicEn: 'two ㄷ = double the force', emoji: '🦾' },
  { id: 'c-17', letter: 'ㅃ', name: '쌍비읍', romanization: 'pp', type: 'consonant', subtype: 'double', sound: '不送气、声门收紧；用力发一个短促的"吧"', soundEn: 'Unaspirated, with a tensed glottis; force out a short, sharp "吧" (ba)', mnemonic: '两个ㅂ=加倍用力', mnemonicEn: 'two ㅂ = double the force', emoji: '🏋️' },
  { id: 'c-18', letter: 'ㅆ', name: '쌍시옷', romanization: 'ss', type: 'consonant', subtype: 'double', sound: '不送气、声门收紧；比ㅅ更紧、时长更长的"思"', soundEn: 'Unaspirated, with a tensed glottis; a "思" (s) tenser and longer than ㅅ', mnemonic: '两个ㅅ=加倍用力', mnemonicEn: 'two ㅅ = double the force', emoji: '🔥' },
  { id: 'c-19', letter: 'ㅉ', name: '쌍지읒', romanization: 'jj', type: 'consonant', subtype: 'double', sound: '不送气、声门收紧；用力发一个短促的"吱"（舌面音，不卷舌）', soundEn: 'Unaspirated, with a tensed glottis; force out a short, sharp "吱" (ji) (a laminal sound, no retroflexion)', mnemonic: '两个ㅈ=加倍用力', mnemonicEn: 'two ㅈ = double the force', emoji: '⚡' },
];

export const batchimSounds: PhoneticLetter[] = [
  { id: 'b-01', letter: 'ㄱ/ㄲ/ㅋ', quizLetter: 'ㄱ', name: 'ㄱ系收音', romanization: '-k', type: 'batchim', subtype: 'stop', sound: '所有ㄱ系收音都发ㄱ[k̚]音，舌根抵软腭不爆破', mnemonic: '舌根堵住气流，不释放', emoji: '🛑' },
  { id: 'b-02', letter: 'ㄴ', name: 'ㄴ收音', romanization: '-n', type: 'batchim', subtype: 'nasal', sound: '发[n]音，舌尖抵上齿龈', mnemonic: '舌尖抵上颚，气流从鼻子出', emoji: '👃' },
  { id: 'b-03', letter: 'ㄷ/ㅅ/ㅆ/ㅈ/ㅊ/ㅌ/ㅎ', quizLetter: 'ㄷ', name: 'ㄷ系收音', romanization: '-t', type: 'batchim', subtype: 'stop', sound: '所有ㄷ系收音都发ㄷ[t̚]音，舌尖抵上齿龈不爆破', mnemonic: '舌尖堵住气流，不释放', emoji: '🛑' },
  { id: 'b-04', letter: 'ㄹ', name: 'ㄹ收音', romanization: '-l', type: 'batchim', subtype: 'liquid', sound: '发[l]音，舌尖弹上齿龈', mnemonic: '舌尖弹一下上颚', emoji: '👅' },
  { id: 'b-05', letter: 'ㅁ', name: 'ㅁ收音', romanization: '-m', type: 'batchim', subtype: 'nasal', sound: '发[m]音，双唇闭合', mnemonic: '闭上嘴巴，气流从鼻子出', emoji: '🤐' },
  { id: 'b-06', letter: 'ㅂ/ㅍ', quizLetter: 'ㅂ', name: 'ㅂ系收音', romanization: '-p', type: 'batchim', subtype: 'stop', sound: '所有ㅂ系收音都发ㅂ[p̚]音，双唇闭合不爆破', mnemonic: '闭上嘴巴，堵住气流', emoji: '🛑' },
  { id: 'b-07', letter: 'ㅇ', name: 'ㅇ收音', romanization: '-ng', type: 'batchim', subtype: 'nasal', sound: '发[ŋ]音，舌根抵软腭，气流从鼻子出', mnemonic: '像英语si"ng"的结尾', emoji: '🎵' },
];
