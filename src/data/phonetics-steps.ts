import { vowels, consonants, batchimSounds, type PhoneticLetter } from '@/data/phonetics';

export interface ProgressiveStep {
  id: string;
  title: string;
  titleEn?: string;
  titleKo: string;
  emoji: string;
  description: string;
  descriptionEn?: string;
  letters: PhoneticLetter[];
  confusedPairs: { id: string; label: string; labelEn?: string; letters: PhoneticLetter[]; tip: string; tipEn?: string }[];
  isReadingStep?: boolean;
  readingWords?: { korean: string; pronunciation: string; meaning: string; meaningEn?: string }[];
}

export const progressiveSteps: ProgressiveStep[] = [
  {
    id: 'basic-vowels',
    title: '基础元音（10个）',
    titleEn: 'Basic Vowels (10)',
    titleKo: '단모음',
    emoji: '',
    description: '10个基础元音，是韩语的发音基石。每个元音都由天、地、人三个元素演化而来。',
    descriptionEn: 'The 10 basic vowels are the foundation of Korean pronunciation. Each vowel evolved from three elements: heaven, earth, and human.',
    letters: vowels.filter((v) => v.subtype === 'basic'),
    confusedPairs: [
      {
        id: 'cp-01', label: 'ㅓ vs ㅗ', labelEn: 'ㅓ vs ㅗ', tip: 'ㅓ嘴型扁平不圆唇，ㅗ嘴型圆拢像在吹小口哨', tipEn: 'ㅓ has flat, unrounded lips; ㅗ has rounded lips, as if whistling.',
        letters: [
          { ...vowels.find((v) => v.letter === 'ㅓ')!, id: 'cp-v-03', letter: 'ㅓ', name: '어', romanization: 'eo', type: 'vowel', subtype: 'basic', sound: '嘴型扁平，类似英语 but 中的 u', mnemonic: '嘴不圆，像惊讶时微微张嘴', emoji: '😮', soundEn: 'flat lips, like the u in English "but"', mnemonicEn: 'lips not rounded, like a small surprised open mouth' },
          { ...vowels.find((v) => v.letter === 'ㅗ')!, id: 'cp-v-05', letter: 'ㅗ', name: '오', romanization: 'o', type: 'vowel', subtype: 'basic', sound: '嘴型圆拢，类似中文"哦"', mnemonic: '嘴巴嘟圆，像在吹蜡烛', emoji: '⭕', soundEn: 'rounded lips, like Chinese "哦"', mnemonicEn: 'lips pursed round, like blowing out a candle' },
        ],
      },
      {
        id: 'cp-02', label: 'ㅡ vs ㅜ', labelEn: 'ㅡ vs ㅜ', tip: 'ㅡ嘴角向两边拉，ㅜ嘴唇向前嘟起', tipEn: 'ㅡ pulls the mouth corners sideways; ㅜ pushes the lips forward.',
        letters: [
          { ...vowels.find((v) => v.letter === 'ㅡ')!, id: 'cp-v-09', letter: 'ㅡ', name: '으', romanization: 'eu', type: 'vowel', subtype: 'basic', sound: '嘴角向两边拉，类似拼音"e"', mnemonic: '像在微笑，嘴唇平拉', emoji: '😐', soundEn: 'mouth corners pulled sideways, like pinyin "e"', mnemonicEn: 'like smiling, lips stretched flat' },
          { ...vowels.find((v) => v.letter === 'ㅜ')!, id: 'cp-v-07', letter: 'ㅜ', name: '우', romanization: 'u', type: 'vowel', subtype: 'basic', sound: '嘴唇向前嘟起，类似中文"乌"', mnemonic: '像在撒娇嘟嘴', emoji: '🫦', soundEn: 'lips pushed forward, like Chinese "乌"', mnemonicEn: 'like pouting lips coyly' },
        ],
      },
    ],
  },
  {
    id: 'compound-vowels',
    title: '合成元音（11个）',
    titleEn: 'Compound Vowels (11)',
    titleKo: '이중모음',
    emoji: '',
    description: '11个合成元音，由基础元音组合而成。掌握基础元音后，合成元音就是简单的拼合。',
    descriptionEn: 'The 11 compound vowels are formed by combining basic vowels. Once you master the basic vowels, compound vowels are just simple blends.',
    letters: vowels.filter((v) => v.subtype === 'compound'),
    confusedPairs: [
      {
        id: 'cp-03', label: 'ㅐ vs ㅔ', labelEn: 'ㅐ vs ㅔ', tip: '两者在现代韩语中发音几乎相同。ㅐ嘴张得稍大一点，但日常会话中基本不分', tipEn: 'The two sound almost identical in modern Korean. ㅐ opens the mouth slightly wider, but in everyday conversation they are basically indistinguishable.',
        letters: [
          { ...vowels.find((v) => v.letter === 'ㅐ')!, id: 'cp-v-11', letter: 'ㅐ', name: '애', romanization: 'ae', type: 'vowel', subtype: 'compound', sound: '类似英语"apple"的a，嘴稍大', mnemonic: 'ㅏ+ㅣ=ae，嘴比ㅔ稍大', emoji: '🍎', soundEn: 'like the a in English "apple", mouth slightly wider', mnemonicEn: 'ㅏ+ㅣ=ae, mouth slightly wider than ㅔ' },
          { ...vowels.find((v) => v.letter === 'ㅔ')!, id: 'cp-v-13', letter: 'ㅔ', name: '에', romanization: 'e', type: 'vowel', subtype: 'compound', sound: '类似英语"bed"的e，嘴稍小', mnemonic: 'ㅓ+ㅣ=e，嘴比ㅐ稍小', emoji: '🛏️', soundEn: 'like the e in English "bed", mouth slightly smaller', mnemonicEn: 'ㅓ+ㅣ=e, mouth slightly smaller than ㅐ' },
        ],
      },
      {
        id: 'cp-04', label: 'ㅚ vs ㅙ vs ㅞ', labelEn: 'ㅚ vs ㅙ vs ㅞ', tip: '三者发音非常接近，现代口语几乎相同。ㅚ=ㅗ+ㅣ，ㅙ=ㅗ+ㅐ，ㅞ=ㅜ+ㅔ（类似英语"wet"中的we）。', tipEn: 'All three are very close in sound and nearly identical in modern speech. ㅚ=ㅗ+ㅣ, ㅙ=ㅗ+ㅐ, ㅞ=ㅜ+ㅔ (like the we in English "wet").',
        letters: [
          { ...vowels.find((v) => v.letter === 'ㅚ')!, id: 'cp-v-17', letter: 'ㅚ', name: '외', romanization: 'oe', type: 'vowel', subtype: 'compound', sound: '现代口语读 [we]，与 ㅙ/ㅞ 几乎同音', mnemonic: 'ㅗ+ㅣ=oe', emoji: '🔄', soundEn: 'pronounced [we] in modern speech, nearly the same as ㅙ/ㅞ', mnemonicEn: 'ㅗ+ㅣ=oe' },
          { ...vowels.find((v) => v.letter === 'ㅙ')!, id: 'cp-v-16', letter: 'ㅙ', name: '왜', romanization: 'wae', type: 'vowel', subtype: 'compound', sound: '现代口语读 [we]，与 ㅚ/ㅞ 几乎同音', mnemonic: 'ㅗ+ㅐ=wae', emoji: '🛤️', soundEn: 'pronounced [we] in modern speech, nearly the same as ㅚ/ㅞ', mnemonicEn: 'ㅗ+ㅐ=wae' },
          { ...vowels.find((v) => v.letter === 'ㅞ')!, id: 'cp-v-19', letter: 'ㅞ', name: '웨', romanization: 'we', type: 'vowel', subtype: 'compound', sound: '现代口语读 [we]，与 ㅚ/ㅙ 几乎同音', mnemonic: 'ㅜ+ㅔ=we', emoji: '💧', soundEn: 'pronounced [we] in modern speech, nearly the same as ㅚ/ㅙ', mnemonicEn: 'ㅜ+ㅔ=we' },
        ],
      },
    ],
  },
  {
    id: 'basic-consonants',
    title: '基础辅音（14个）',
    titleEn: 'Basic Consonants (14)',
    titleKo: '기본 자음',
    emoji: '',
    description: '14个基础辅音（含5个送气音），模仿发音器官的形状创造。韩语辅音的关键是"松紧"和"送气"。',
    descriptionEn: 'The 14 basic consonants (including 5 aspirated sounds) were created to mimic the shapes of the speech organs. The keys to Korean consonants are "tension" and "aspiration".',
    letters: consonants.filter((c) => c.subtype === 'basic'),
    confusedPairs: [
      {
        id: 'cp-05', label: 'ㄱ vs ㅋ vs ㄲ', labelEn: 'ㄱ vs ㅋ vs ㄲ', tip: 'ㄱ=轻声g(松音)，ㅋ=强送气k，ㄲ=喉部用力不送气(紧音)', tipEn: 'ㄱ = soft g (lax), ㅋ = strongly aspirated k, ㄲ = tense, unaspirated with throat tension.',
        letters: consonants.filter((c) => ['ㄱ', 'ㅋ', 'ㄲ'].includes(c.letter)),
      },
      {
        id: 'cp-06', label: 'ㅂ vs ㅍ vs ㅃ', labelEn: 'ㅂ vs ㅍ vs ㅃ', tip: 'ㅂ=轻声b(松音)，ㅍ=强送气p，ㅃ=喉部用力不送气(紧音)', tipEn: 'ㅂ = soft b (lax), ㅍ = strongly aspirated p, ㅃ = tense, unaspirated with throat tension.',
        letters: consonants.filter((c) => ['ㅂ', 'ㅍ', 'ㅃ'].includes(c.letter)),
      },
      {
        id: 'cp-07', label: 'ㅈ vs ㅊ vs ㅉ', labelEn: 'ㅈ vs ㅊ vs ㅉ', tip: 'ㅈ=轻声j(松音)，ㅊ=强送气ch，ㅉ=喉部用力不送气(紧音)', tipEn: 'ㅈ = soft j (lax), ㅊ = strongly aspirated ch, ㅉ = tense, unaspirated with throat tension.',
        letters: consonants.filter((c) =>['ㅈ', 'ㅊ', 'ㅉ'].includes(c.letter)),
      },
      {
        id: 'cp-08', label: 'ㄷ vs ㅌ vs ㄸ', labelEn: 'ㄷ vs ㅌ vs ㄸ', tip: 'ㄷ=轻声d(松音)，ㅌ=强送气t，ㄸ=喉部用力不送气(紧音)', tipEn: 'ㄷ = soft d (lax), ㅌ = strongly aspirated t, ㄸ = tense, unaspirated with throat tension.',
        letters: consonants.filter((c) =>['ㄷ', 'ㅌ', 'ㄸ'].includes(c.letter)),
      },
    ],
  },
  {
    id: 'double-consonants',
    title: '紧音（5个）',
    titleEn: 'Tense Consonants (5)',
    titleKo: '된소리',
    emoji: '',
    description: '5个紧音（双写辅音），发音时喉部肌肉紧张、声带紧闭。想象你在用力搬重物时的感觉。',
    descriptionEn: 'The 5 tense consonants (doubled consonants) are pronounced with tight throat muscles and closed vocal cords. Imagine the feeling of straining to lift something heavy.',
    letters: consonants.filter((c) => c.subtype === 'double'),
    confusedPairs: [
      {
        id: 'cp-09', label: '松音 vs 紧音 全对比', labelEn: 'Lax vs Tense: Full Comparison', tip: '松音=放松、送气；紧音=用力、不送气。把手指放在喉结上感受震动差异', tipEn: 'Lax = relaxed, aspirated; tense = forceful, unaspirated. Put a finger on your Adam\'s apple to feel the difference in vibration.',
        letters: consonants.filter((c) =>['ㄱ', 'ㄲ', 'ㄷ', 'ㄸ', 'ㅂ', 'ㅃ', 'ㅅ', 'ㅆ', 'ㅈ', 'ㅉ'].includes(c.letter)),
      },
    ],
  },
  {
    id: 'batchim',
    title: '收音（终声）',
    titleEn: 'Final Consonants (Batchim)',
    titleKo: '받침',
    emoji: '',
    description: '7种收音发音，是韩语区别于中文的重要特征。一个音节末尾的辅音不发全、只做口型。',
    descriptionEn: 'The 7 final consonant sounds are an important feature that distinguishes Korean from Chinese. A consonant at the end of a syllable is not fully released, only the mouth shape is formed.',
    letters: batchimSounds,
    confusedPairs: [
      {
        id: 'cp-10', label: 'ㄱ系 vs ㄷ系 vs ㅂ系', labelEn: 'ㄱ-group vs ㄷ-group vs ㅂ-group', tip: 'ㄱ系收音=舌根堵住，ㄷ系收音=舌尖堵住，ㅂ系收音=双唇堵住。都是只做口型不爆破', tipEn: 'ㄱ-group final = blocked at the back of the tongue, ㄷ-group final = blocked at the tip of the tongue, ㅂ-group final = blocked at the lips. All form the mouth shape without releasing.',
        letters: batchimSounds.filter((b) => ['ㄱ/ㄲ/ㅋ', 'ㄷ/ㅅ/ㅆ/ㅈ/ㅊ/ㅌ/ㅎ', 'ㅂ/ㅍ'].includes(b.letter)),
      },
    ],
  },
  {
    id: 'reading',
    title: '综合拼读',
    titleEn: 'Reading Practice',
    titleKo: '읽기 연습',
    emoji: '',
    description: '把前面学的字母拼起来，读真正的韩文单词。看到词 → 试着读 → 听发音验证。读完这些你就真的能用韩文了！',
    descriptionEn: 'Put together the letters you have learned and read real Korean words. See the word → try to read it → listen to the audio to check. Once you finish these, you can really use Hangul!',
    letters: [],
    confusedPairs: [],
    isReadingStep: true,
    readingWords: [
      { korean: '네', pronunciation: 'ne', meaning: '是/好的', meaningEn: 'yes/okay' },
      { korean: '말', pronunciation: 'mal', meaning: '话/语言', meaningEn: 'speech/language' },
      { korean: '눈', pronunciation: 'nun', meaning: '眼睛/雪', meaningEn: 'eye/snow' },
      { korean: '문', pronunciation: 'mun', meaning: '门', meaningEn: 'door' },
      { korean: '집', pronunciation: 'jip', meaning: '家', meaningEn: 'house/home' },
      { korean: '책', pronunciation: 'chaek', meaning: '书', meaningEn: 'book' },
      { korean: '돈', pronunciation: 'don', meaning: '钱', meaningEn: 'money' },
      { korean: '산', pronunciation: 'san', meaning: '山', meaningEn: 'mountain' },
      { korean: '강', pronunciation: 'gang', meaning: '江', meaningEn: 'river' },
      { korean: '꽃', pronunciation: 'kkot', meaning: '花', meaningEn: 'flower' },
      { korean: '밥', pronunciation: 'bap', meaning: '饭', meaningEn: 'rice/meal' },
      { korean: '옷', pronunciation: 'ot', meaning: '衣服', meaningEn: 'clothes' },
      { korean: '가방', pronunciation: 'ga-bang', meaning: '包', meaningEn: 'bag' },
      { korean: '사람', pronunciation: 'sa-ram', meaning: '人', meaningEn: 'person' },
      { korean: '우유', pronunciation: 'u-yu', meaning: '牛奶', meaningEn: 'milk' },
      { korean: '학교', pronunciation: 'hak-gyo', meaning: '学校', meaningEn: 'school' },
      { korean: '친구', pronunciation: 'chin-gu', meaning: '朋友', meaningEn: 'friend' },
      { korean: '고기', pronunciation: 'go-gi', meaning: '肉', meaningEn: 'meat' },
      { korean: '나무', pronunciation: 'na-mu', meaning: '树', meaningEn: 'tree' },
      { korean: '바다', pronunciation: 'ba-da', meaning: '海', meaningEn: 'sea' },
      { korean: '지금', pronunciation: 'ji-geum', meaning: '现在', meaningEn: 'now' },
      { korean: '오늘', pronunciation: 'o-neul', meaning: '今天', meaningEn: 'today' },
      { korean: '내일', pronunciation: 'nae-il', meaning: '明天', meaningEn: 'tomorrow' },
      { korean: '마음', pronunciation: 'ma-eum', meaning: '心', meaningEn: 'heart/mind' },
      { korean: '한국어', pronunciation: 'han-gu-geo', meaning: '韩语', meaningEn: 'Korean (language)' },
      { korean: '안녕하세요', pronunciation: 'an-nyeong-ha-se-yo', meaning: '您好', meaningEn: 'hello' },
      { korean: '감사합니다', pronunciation: 'gam-sa-ham-ni-da', meaning: '谢谢', meaningEn: 'thank you' },
      { korean: '반갑습니다', pronunciation: 'ban-gap-sseum-ni-da', meaning: '很高兴见到你', meaningEn: 'nice to meet you' },
      { korean: '사랑해요', pronunciation: 'sa-rang-hae-yo', meaning: '我爱你', meaningEn: 'I love you' },
      { korean: '미안해요', pronunciation: 'mi-an-hae-yo', meaning: '对不起', meaningEn: 'sorry' },
    ],
  },
];
