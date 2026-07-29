/**
 * 每个 jamo 的高频拼字示例（韩语校对：常用、地道、初学者熟悉）
 * 用于字母详情抽屉里点示例可播放。
 */

export type JamoExample = { syl: string; roman: string; meaning: string; meaningEn?: string };

// 元音示例（用 ㅇ 开头单字呈现纯元音）
export const VOWEL_EXAMPLES: Record<string, JamoExample[]> = {
  'ㅏ': [
    { syl: '아이', roman: 'a-i', meaning: '小孩', meaningEn: 'child' },
    { syl: '나', roman: 'na', meaning: '我', meaningEn: 'I/me' },
    { syl: '바다', roman: 'ba-da', meaning: '海', meaningEn: 'sea' },
  ],
  'ㅑ': [
    { syl: '야구', roman: 'ya-gu', meaning: '棒球', meaningEn: 'baseball' },
    { syl: '약', roman: 'yak', meaning: '药', meaningEn: 'medicine' },
    { syl: '야시장', roman: 'ya-si-jang', meaning: '夜市', meaningEn: 'night market' },
  ],
  'ㅓ': [
    { syl: '어디', roman: 'eo-di', meaning: '哪里', meaningEn: 'where' },
    { syl: '머리', roman: 'meo-ri', meaning: '头', meaningEn: 'head' },
    { syl: '서울', roman: 'seo-ul', meaning: '首尔', meaningEn: 'Seoul' },
  ],
  'ㅕ': [
    { syl: '여자', roman: 'yeo-ja', meaning: '女子', meaningEn: 'woman' },
    { syl: '겨울', roman: 'gyeo-ul', meaning: '冬天', meaningEn: 'winter' },
    { syl: '며칠', roman: 'myeo-chil', meaning: '几天', meaningEn: 'how many days' },
  ],
  'ㅗ': [
    { syl: '오늘', roman: 'o-neul', meaning: '今天', meaningEn: 'today' },
    { syl: '고기', roman: 'go-gi', meaning: '肉', meaningEn: 'meat' },
    { syl: '보다', roman: 'bo-da', meaning: '看', meaningEn: 'to see' },
  ],
  'ㅛ': [
    { syl: '요리', roman: 'yo-ri', meaning: '料理', meaningEn: 'cooking/dish' },
    { syl: '교실', roman: 'gyo-sil', meaning: '教室', meaningEn: 'classroom' },
    { syl: '효과', roman: 'hyo-gwa', meaning: '效果', meaningEn: 'effect' },
  ],
  'ㅜ': [
    { syl: '우유', roman: 'u-yu', meaning: '牛奶', meaningEn: 'milk' },
    { syl: '구두', roman: 'gu-du', meaning: '皮鞋', meaningEn: 'leather shoes' },
    { syl: '눈물', roman: 'nun-mul', meaning: '眼泪', meaningEn: 'tears' },
  ],
  'ㅠ': [
    { syl: '유리', roman: 'yu-ri', meaning: '玻璃', meaningEn: 'glass' },
    { syl: '휴식', roman: 'hyu-sik', meaning: '休息', meaningEn: 'rest' },
    { syl: '규칙', roman: 'gyu-chik', meaning: '规则', meaningEn: 'rule' },
  ],
  'ㅡ': [
    { syl: '으뜸', roman: 'eu-tteum', meaning: '最佳', meaningEn: 'the best' },
    { syl: '그림', roman: 'geu-rim', meaning: '画', meaningEn: 'picture/drawing' },
    { syl: '느낌', roman: 'neu-kkim', meaning: '感觉', meaningEn: 'feeling' },
  ],
  'ㅣ': [
    { syl: '이름', roman: 'i-reum', meaning: '名字', meaningEn: 'name' },
    { syl: '기차', roman: 'gi-cha', meaning: '火车', meaningEn: 'train' },
    { syl: '시간', roman: 'si-gan', meaning: '时间', meaningEn: 'time' },
  ],
  'ㅐ': [
    { syl: '개', roman: 'gae', meaning: '狗', meaningEn: 'dog' },
    { syl: '내일', roman: 'nae-il', meaning: '明天', meaningEn: 'tomorrow' },
    { syl: '책', roman: 'chaek', meaning: '书', meaningEn: 'book' },
  ],
  'ㅒ': [
    { syl: '얘기', roman: 'yae-gi', meaning: '话/故事（이야기 缩略）', meaningEn: 'talk/story (contraction of 이야기)' },
    { syl: '걔', roman: 'gyae', meaning: '那孩子', meaningEn: 'that kid' },
    { syl: '쟤', roman: 'jyae', meaning: '那个人', meaningEn: 'that person' },
  ],
  'ㅔ': [
    { syl: '에어컨', roman: 'e-eo-keon', meaning: '空调', meaningEn: 'air conditioner' },
    { syl: '베개', roman: 'be-gae', meaning: '枕头', meaningEn: 'pillow' },
    { syl: '세상', roman: 'se-sang', meaning: '世界', meaningEn: 'world' },
  ],
  'ㅖ': [
    { syl: '예의', roman: 'ye-ui', meaning: '礼貌', meaningEn: 'manners/courtesy' },
    { syl: '계획', roman: 'gye-hoek', meaning: '计划', meaningEn: 'plan' },
    { syl: '시계', roman: 'si-gye', meaning: '钟表', meaningEn: 'clock/watch' },
  ],
  'ㅘ': [
    { syl: '와요', roman: 'wa-yo', meaning: '来', meaningEn: 'come' },
    { syl: '과일', roman: 'gwa-il', meaning: '水果', meaningEn: 'fruit' },
    { syl: '사과', roman: 'sa-gwa', meaning: '苹果', meaningEn: 'apple' },
  ],
  'ㅙ': [
    { syl: '왜', roman: 'wae', meaning: '为什么', meaningEn: 'why' },
    { syl: '돼지', roman: 'dwae-ji', meaning: '猪', meaningEn: 'pig' },
    { syl: '괜찮아', roman: 'gwaen-chan-a', meaning: '没关系', meaningEn: "it's okay" },
  ],
  'ㅚ': [
    { syl: '외국', roman: 'oe-guk', meaning: '外国', meaningEn: 'foreign country' },
    { syl: '회사', roman: 'hoe-sa', meaning: '公司', meaningEn: 'company' },
    { syl: '죄송해요', roman: 'joe-song-hae-yo', meaning: '抱歉', meaningEn: "I'm sorry" },
  ],
  'ㅝ': [
    { syl: '뭐', roman: 'mwo', meaning: '什么', meaningEn: 'what' },
    { syl: '권', roman: 'gwon', meaning: '本（量词，书）', meaningEn: 'volume (counter for books)' },
    { syl: '원숭이', roman: 'won-sung-i', meaning: '猴子', meaningEn: 'monkey' },
  ],
  'ㅞ': [
    { syl: '웨딩', roman: 'we-ding', meaning: '婚礼', meaningEn: 'wedding' },
    { syl: '궤도', roman: 'gwe-do', meaning: '轨道', meaningEn: 'orbit/track' },
    { syl: '스웨터', roman: 'seu-we-teo', meaning: '毛衣', meaningEn: 'sweater' },
  ],
  'ㅟ': [
    { syl: '위', roman: 'wi', meaning: '上', meaningEn: 'above/top' },
    { syl: '귀', roman: 'gwi', meaning: '耳朵', meaningEn: 'ear' },
    { syl: '쥐', roman: 'jwi', meaning: '老鼠', meaningEn: 'mouse/rat' },
  ],
  'ㅢ': [
    { syl: '의자', roman: 'ui-ja', meaning: '椅子', meaningEn: 'chair' },
    { syl: '의사', roman: 'ui-sa', meaning: '医生', meaningEn: 'doctor' },
    { syl: '회의', roman: 'hoe-ui', meaning: '会议', meaningEn: 'meeting' },
  ],
};

// 辅音示例（音节首位）
export const CONSONANT_EXAMPLES: Record<string, JamoExample[]> = {
  'ㄱ': [{ syl: '가방', roman: 'ga-bang', meaning: '包', meaningEn: 'bag' }, { syl: '고기', roman: 'go-gi', meaning: '肉', meaningEn: 'meat' }, { syl: '김치', roman: 'gim-chi', meaning: '泡菜', meaningEn: 'kimchi' }],
  'ㄴ': [{ syl: '나무', roman: 'na-mu', meaning: '树', meaningEn: 'tree' }, { syl: '눈', roman: 'nun', meaning: '雪/眼', meaningEn: 'snow/eye' }, { syl: '누나', roman: 'nu-na', meaning: '姐姐', meaningEn: 'older sister (of a male)' }],
  'ㄷ': [{ syl: '다리', roman: 'da-ri', meaning: '桥/腿', meaningEn: 'bridge/leg' }, { syl: '도서관', roman: 'do-seo-gwan', meaning: '图书馆', meaningEn: 'library' }, { syl: '돈', roman: 'don', meaning: '钱', meaningEn: 'money' }],
  'ㄹ': [{ syl: '라면', roman: 'ra-myeon', meaning: '拉面', meaningEn: 'ramen' }, { syl: '노래', roman: 'no-rae', meaning: '歌', meaningEn: 'song' }, { syl: '서울', roman: 'seo-ul', meaning: '首尔', meaningEn: 'Seoul' }],
  'ㅁ': [{ syl: '물', roman: 'mul', meaning: '水', meaningEn: 'water' }, { syl: '문', roman: 'mun', meaning: '门', meaningEn: 'door' }, { syl: '맛있다', roman: 'ma-sit-da', meaning: '好吃', meaningEn: 'delicious' }],
  'ㅂ': [{ syl: '밥', roman: 'bap', meaning: '饭', meaningEn: 'rice/meal' }, { syl: '바다', roman: 'ba-da', meaning: '海', meaningEn: 'sea' }, { syl: '병원', roman: 'byeong-won', meaning: '医院', meaningEn: 'hospital' }],
  'ㅅ': [{ syl: '사람', roman: 'sa-ram', meaning: '人', meaningEn: 'person' }, { syl: '시간', roman: 'si-gan', meaning: '时间', meaningEn: 'time' }, { syl: '사랑', roman: 'sa-rang', meaning: '爱', meaningEn: 'love' }],
  'ㅇ': [{ syl: '아이', roman: 'a-i', meaning: '孩子', meaningEn: 'child' }, { syl: '오늘', roman: 'o-neul', meaning: '今天', meaningEn: 'today' }, { syl: '우유', roman: 'u-yu', meaning: '牛奶', meaningEn: 'milk' }],
  'ㅈ': [{ syl: '집', roman: 'jip', meaning: '家', meaningEn: 'home/house' }, { syl: '자전거', roman: 'ja-jeon-geo', meaning: '自行车', meaningEn: 'bicycle' }, { syl: '주말', roman: 'ju-mal', meaning: '周末', meaningEn: 'weekend' }],
  'ㅊ': [{ syl: '책', roman: 'chaek', meaning: '书', meaningEn: 'book' }, { syl: '친구', roman: 'chin-gu', meaning: '朋友', meaningEn: 'friend' }, { syl: '차', roman: 'cha', meaning: '茶/车', meaningEn: 'tea/car' }],
  'ㅋ': [{ syl: '커피', roman: 'keo-pi', meaning: '咖啡', meaningEn: 'coffee' }, { syl: '카드', roman: 'ka-deu', meaning: '卡', meaningEn: 'card' }, { syl: '컴퓨터', roman: 'keom-pyu-teo', meaning: '电脑', meaningEn: 'computer' }],
  'ㅌ': [{ syl: '토끼', roman: 'to-kki', meaning: '兔子', meaningEn: 'rabbit' }, { syl: '택시', roman: 'taek-si', meaning: '出租车', meaningEn: 'taxi' }, { syl: '티셔츠', roman: 'ti-syeo-cheu', meaning: 'T恤', meaningEn: 'T-shirt' }],
  'ㅍ': [{ syl: '피자', roman: 'pi-ja', meaning: '披萨', meaningEn: 'pizza' }, { syl: '편지', roman: 'pyeon-ji', meaning: '信', meaningEn: 'letter' }, { syl: '포도', roman: 'po-do', meaning: '葡萄', meaningEn: 'grape' }],
  'ㅎ': [{ syl: '학교', roman: 'hak-gyo', meaning: '学校', meaningEn: 'school' }, { syl: '하늘', roman: 'ha-neul', meaning: '天', meaningEn: 'sky' }, { syl: '한국', roman: 'han-guk', meaning: '韩国', meaningEn: 'Korea' }],
  'ㄲ': [{ syl: '까치', roman: 'kka-chi', meaning: '喜鹊', meaningEn: 'magpie' }, { syl: '꿈', roman: 'kkum', meaning: '梦', meaningEn: 'dream' }, { syl: '꽃', roman: 'kkot', meaning: '花', meaningEn: 'flower' }],
  'ㄸ': [{ syl: '딸기', roman: 'ttal-gi', meaning: '草莓', meaningEn: 'strawberry' }, { syl: '땅', roman: 'ttang', meaning: '土地', meaningEn: 'land/ground' }, { syl: '또', roman: 'tto', meaning: '又/还', meaningEn: 'again/also' }],
  'ㅃ': [{ syl: '빵', roman: 'ppang', meaning: '面包', meaningEn: 'bread' }, { syl: '뽀뽀', roman: 'ppo-ppo', meaning: '亲吻', meaningEn: 'kiss' }, { syl: '오빠', roman: 'o-ppa', meaning: '哥哥', meaningEn: 'older brother (of a female)' }],
  'ㅆ': [{ syl: '쌀', roman: 'ssal', meaning: '大米', meaningEn: 'rice (uncooked)' }, { syl: '싸다', roman: 'ssa-da', meaning: '便宜', meaningEn: 'cheap' }, { syl: '있다', roman: 'it-da', meaning: '有/在', meaningEn: 'to have/to exist' }],
  'ㅉ': [{ syl: '짜다', roman: 'jja-da', meaning: '咸', meaningEn: 'salty' }, { syl: '찌개', roman: 'jji-gae', meaning: '炖菜', meaningEn: 'stew' }, { syl: '진짜', roman: 'jin-jja', meaning: '真的', meaningEn: 'really' }],
};

// 收音示例
export const BATCHIM_EXAMPLES: Record<string, JamoExample[]> = {
  'ㄱ/ㄲ/ㅋ': [{ syl: '책', roman: 'chaek', meaning: '书', meaningEn: 'book' }, { syl: '학교', roman: 'hak-gyo', meaning: '学校', meaningEn: 'school' }, { syl: '부엌', roman: 'bu-eok', meaning: '厨房', meaningEn: 'kitchen' }],
  'ㄴ': [{ syl: '눈', roman: 'nun', meaning: '雪/眼', meaningEn: 'snow/eye' }, { syl: '문', roman: 'mun', meaning: '门', meaningEn: 'door' }, { syl: '한국', roman: 'han-guk', meaning: '韩国', meaningEn: 'Korea' }],
  'ㄷ/ㅅ/ㅆ/ㅈ/ㅊ/ㅌ/ㅎ': [{ syl: '옷', roman: 'ot', meaning: '衣服', meaningEn: 'clothes' }, { syl: '꽃', roman: 'kkot', meaning: '花', meaningEn: 'flower' }, { syl: '있다', roman: 'it-da', meaning: '有', meaningEn: 'to have/to exist' }],
  'ㄹ': [{ syl: '말', roman: 'mal', meaning: '话/马', meaningEn: 'speech/horse' }, { syl: '물', roman: 'mul', meaning: '水', meaningEn: 'water' }, { syl: '서울', roman: 'seo-ul', meaning: '首尔', meaningEn: 'Seoul' }],
  'ㅁ': [{ syl: '밤', roman: 'bam', meaning: '夜', meaningEn: 'night' }, { syl: '엄마', roman: 'eom-ma', meaning: '妈妈', meaningEn: 'mom' }, { syl: '김치', roman: 'gim-chi', meaning: '泡菜', meaningEn: 'kimchi' }],
  'ㅂ/ㅍ': [{ syl: '밥', roman: 'bap', meaning: '饭', meaningEn: 'rice/meal' }, { syl: '집', roman: 'jip', meaning: '家', meaningEn: 'home/house' }, { syl: '앞', roman: 'ap', meaning: '前面', meaningEn: 'front' }],
  'ㅇ': [{ syl: '강', roman: 'gang', meaning: '江', meaningEn: 'river' }, { syl: '공', roman: 'gong', meaning: '球', meaningEn: 'ball' }, { syl: '사랑', roman: 'sa-rang', meaning: '爱', meaningEn: 'love' }],
};

export function getExamplesForLetter(letter: string): JamoExample[] {
  return VOWEL_EXAMPLES[letter] ?? CONSONANT_EXAMPLES[letter] ?? BATCHIM_EXAMPLES[letter] ?? [];
}
