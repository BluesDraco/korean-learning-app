// ==========================================================================
// 동물 도시 라디오 — 방송 댓글（预制听众评论池）
// --------------------------------------------------------------------------
// 不是实时聊天，是每档节目的预制「节目评论」。播放器按 episode.id 种子
// 从对应档池子里固定取 3 条（同一期永远同 3 条，不同期抽到不同切片）。
// 评论者用世界观常驻听众，且避开当档主持角色（熊档不出现熊等）。
// 纯数据 + 类型，可安全进客户端 bundle。
// ==========================================================================

export interface RadioComment {
  emoji: string;
  name: string;
  level: '초급' | '중급' | '고급';
  ko: string;
  zh: string;
}

// 各档评论池（每档 8 条，声线贴合节目氛围）
const COMMENTS: Record<string, RadioComment[]> = {
  // 松鼠早安（초급）：暖萌、早安寒暄、初学者共鸣
  'squirrel-morning': [
    { emoji: '🐰', name: '토끼', level: '초급', ko: '좋은 아침이에요! 오늘도 힘내요.', zh: '早上好！今天也加油。' },
    { emoji: '🦊', name: '여우', level: '중급', ko: '아침마다 이거 들으면서 하루 시작해요.', zh: '每天早上听着这个开始一天。' },
    { emoji: '🐻', name: '곰', level: '초급', ko: '자막 천천히 보니까 다 알아들었어요!', zh: '慢慢看字幕，全都听懂了！' },
    { emoji: '🐺', name: '늑대', level: '중급', ko: '다람쥐 목소리 너무 상냥해요 ㅎㅎ', zh: '松鼠的声音太温柔了哈哈。' },
    { emoji: '🐰', name: '토끼', level: '초급', ko: '오늘 단어 세 개 외웠어요. 뿌듯!', zh: '今天记住三个单词，好有成就感！' },
    { emoji: '🦊', name: '여우', level: '초급', ko: '발음이 또렷해서 따라 하기 좋아요.', zh: '发音清楚，很好跟读。' },
    { emoji: '🐻', name: '곰', level: '초급', ko: '초급인데 부담 없이 들을 수 있어요.', zh: '虽然是初级，但听起来毫无压力。' },
    { emoji: '🐺', name: '늑대', level: '중급', ko: '아침 인사 들으니까 기분 좋아졌어요.', zh: '听了早安问候，心情变好了。' },
  ],

  // 动物城新闻（중급）：时事反应、有见解、稍正式
  'animal-news': [
    { emoji: '🐰', name: '토끼', level: '중급', ko: '오늘 뉴스 진짜 유익했어요!', zh: '今天的新闻真的很有用！' },
    { emoji: '🦊', name: '여우', level: '고급', ko: '이 소식 처음 들었는데 흥미롭네요.', zh: '这消息我第一次听说，挺有意思。' },
    { emoji: '🐻', name: '곰', level: '중급', ko: '뉴스로 단어 배우니까 실전 같아요.', zh: '用新闻学单词，感觉很实战。' },
    { emoji: '🐰', name: '토끼', level: '중급', ko: '앵커 발음 깔끔해서 받아쓰기 했어요.', zh: '主播发音干净，我做了听写。' },
    { emoji: '🦊', name: '여우', level: '중급', ko: '속도가 딱 적당해요. 중급에 좋아요.', zh: '语速刚刚好，很适合中级。' },
    { emoji: '🐿️', name: '다람쥐', level: '고급', ko: '동물시 소식 챙겨 듣는 재미가 있어요.', zh: '追听动物城新闻挺有意思的。' },
    { emoji: '🐰', name: '토끼', level: '중급', ko: '오늘 표현 하나 바로 써먹었어요 ㅋㅋ', zh: '今天学的一个表达马上用上了哈哈。' },
    { emoji: '🐻', name: '곰', level: '중급', ko: '뉴스라 그런지 문장이 야무져요.', zh: '可能因为是新闻，句子很扎实。' },
  ],

  // 晚安熊（초급）：睡前氛围、放松、困困的
  'bear-night': [
    { emoji: '🐰', name: '토끼', level: '초급', ko: '자기 전에 듣기 딱 좋아요. 잘 자요~', zh: '睡前听正合适。晚安~' },
    { emoji: '🦊', name: '여우', level: '중급', ko: '곰 아저씨 목소리 들으면 스르르 잠이 와요.', zh: '听着熊大叔的声音，慢慢就困了。' },
    { emoji: '🐰', name: '토끼', level: '초급', ko: '오늘 이야기 들으니까 마음이 따뜻해졌어요.', zh: '今天的故事听着听着，心里暖暖的。' },
    { emoji: '🦊', name: '여우', level: '초급', ko: '느린 속도라 눈 감고 들어도 이해돼요.', zh: '语速慢，闭着眼听也能懂。' },
    { emoji: '🐺', name: '늑대', level: '중급', ko: '하루 마무리로 이만한 게 없네요.', zh: '作为一天的收尾，没有比这更棒的了。' },
    { emoji: '🐰', name: '토끼', level: '초급', ko: '속담 이야기 재밌어요. 하나 배웠어요.', zh: '俗语故事很有趣，学到一个。' },
    { emoji: '🦊', name: '여우', level: '중급', ko: '조용한 밤에 듣기 좋은 목소리예요.', zh: '很适合安静夜晚听的声音。' },
    { emoji: '🐺', name: '늑대', level: '초급', ko: '내일도 들으러 올게요. 잘 자요.', zh: '明天也会来听的。晚安。' },
  ],

  // 狐狸咖啡（고급）：思辨、话题延伸、有深度
  'fox-cafe': [
    { emoji: '🐰', name: '토끼', level: '고급', ko: '이 주제 생각할 거리가 많네요.', zh: '这个话题很值得琢磨。' },
    { emoji: '🐻', name: '곰', level: '고급', ko: '여우 사장님 관점이 늘 신선해요.', zh: '狐狸老板的视角总是很新鲜。' },
    { emoji: '🐺', name: '늑대', level: '고급', ko: '한국 문화 이야기 흥미롭게 들었어요.', zh: '关于韩国文化的话很有意思。' },
    { emoji: '🐰', name: '토끼', level: '중급', ko: '고급이라 어렵지만 도전하는 맛이 있어요.', zh: '虽然是高级有点难，但有挑战的乐趣。' },
    { emoji: '🐻', name: '곰', level: '고급', ko: '표현이 세련돼서 받아 적었어요.', zh: '表达很地道，我抄下来了。' },
    { emoji: '🐺', name: '늑대', level: '고급', ko: '카페에서 수다 떠는 느낌이라 좋아요.', zh: '有种在咖啡馆闲聊的感觉，很喜欢。' },
    { emoji: '🐰', name: '토끼', level: '고급', ko: '오늘 얘기 듣고 생각이 바뀌었어요.', zh: '听了今天的话，想法都变了。' },
    { emoji: '🐻', name: '곰', level: '중급', ko: '어휘가 풍부해서 배울 게 많아요.', zh: '词汇很丰富，能学的东西很多。' },
  ],

  // 狐狸访谈（고급）：嘉宾话题、深度对谈反应
  'fox-interview': [
    { emoji: '🐰', name: '토끼', level: '고급', ko: '게스트 이야기가 정말 인상 깊었어요.', zh: '嘉宾的话真的令人印象深刻。' },
    { emoji: '🐻', name: '곰', level: '고급', ko: '인터뷰 깊이가 다르네요. 몰입했어요.', zh: '访谈的深度不一样，我完全入迷了。' },
    { emoji: '🐺', name: '늑대', level: '고급', ko: '두 분 대화 케미가 좋아요.', zh: '两位的对话很有默契。' },
    { emoji: '🐰', name: '토끼', level: '중급', ko: '고급이지만 이야기가 재밌어서 끝까지 들었어요.', zh: '虽然是高级，但故事有意思，听到了最后。' },
    { emoji: '🐻', name: '곰', level: '고급', ko: '질문이 날카로워서 듣는 맛이 있어요.', zh: '提问很犀利，听着很过瘾。' },
    { emoji: '🐺', name: '늑대', level: '고급', ko: '이런 진솔한 인터뷰 오랜만이에요.', zh: '好久没听到这么真挚的访谈了。' },
    { emoji: '🐰', name: '토끼', level: '고급', ko: '게스트 다음에 또 나왔으면 좋겠어요.', zh: '希望这位嘉宾下次再来。' },
    { emoji: '🐻', name: '곰', level: '중급', ko: '표현 하나하나가 배울 만해요.', zh: '每一个表达都值得学。' },
  ],
};

// 生词评论模板（引用本期真实生词，让评论跟当期内容绑定）。
// 词一律用引号包住，回避 조사 변격问题（"{word}"라는 / "{word}" 뒤接空格词）。
// {word}=韩语生词，{zh}=中文词义。各档一条，声线贴合。
// 用「표현」(涵盖单词+短语，避免把 "옛날 옛적에" 这类短语叫「단어」的错误)；
// 中文不加分类词，直接引用词义，规避同样问题。
const VOCAB_TEMPLATES: Record<string, { emoji: string; name: string; level: RadioComment['level']; ko: string; zh: string }> = {
  'squirrel-morning': { emoji: '🐰', name: '토끼', level: '초급', ko: '"{word}", 오늘 이 표현 배웠어요. 뿌듯!', zh: '学到了"{zh}"，好有成就感！' },
  'animal-news': { emoji: '🦊', name: '여우', level: '중급', ko: '"{word}" 표현, 뉴스에서 배웠어요. 메모 완료!', zh: '在新闻里学到了"{zh}"，记好了！' },
  'bear-night': { emoji: '🐰', name: '토끼', level: '초급', ko: '"{word}", 이 표현 오늘 처음 알았어요.', zh: '"{zh}"，今天第一次知道。' },
  'fox-cafe': { emoji: '🐺', name: '늑대', level: '고급', ko: '"{word}" 같은 표현, 정말 고급스럽네요.', zh: '"{zh}"这样的表达，真地道。' },
  'fox-interview': { emoji: '🐰', name: '토끼', level: '고급', ko: '"{word}" 이 표현, 인터뷰에서 확 와닿았어요.', zh: '"{zh}"这个说法，在访谈里特别有共鸣。' },
};

type MiniVocab = { ko: string; zh: string };

// 字符串稳定哈希（同一输入永远同结果，用于按 id 固定选取）
function hash(s: string): number {
  let h = 0;
  for (let i = 0; i < s.length; i++) {
    h = (h * 31 + s.charCodeAt(i)) | 0;
  }
  return Math.abs(h);
}

// 取某期的评论：2 条档池通用 + 1 条引用本期生词（都按 id 种子固定，顺序稳定）。
// 无生词时全部回退到档池通用，凑满 count 条。
export function getComments(
  program: string,
  id: string,
  vocab: MiniVocab[] = [],
  count = 3,
): RadioComment[] {
  const pool = COMMENTS[program] || COMMENTS['squirrel-morning'];
  const seed = hash(id);
  const tpl = VOCAB_TEMPLATES[program];

  // 生词评论（放中间位，夹在通用评论之间更自然）
  let vocabComment: RadioComment | null = null;
  if (tpl && vocab.length > 0) {
    const v = vocab[seed % vocab.length];
    vocabComment = {
      emoji: tpl.emoji,
      name: tpl.name,
      level: tpl.level,
      ko: tpl.ko.replace('{word}', v.ko),
      zh: tpl.zh.replace('{zh}', v.zh),
    };
  }

  const genericNeeded = vocabComment ? count - 1 : count;
  const start = seed % pool.length;
  const generic: RadioComment[] = [];
  for (let i = 0; i < Math.min(genericNeeded, pool.length); i++) {
    generic.push(pool[(start + i) % pool.length]);
  }

  if (!vocabComment) return generic;
  // 插在第 2 位：通用 → 生词 → 通用
  return [generic[0], vocabComment, ...generic.slice(1)];
}
