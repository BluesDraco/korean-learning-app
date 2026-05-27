import type { WordEntry } from '@/types';

// Intermediate vocabulary (TOPIK levels 3-4) — ~200 entries
export const intermediateEntries: WordEntry[] = [

  // ═══════════════════════════════════════════════════════════════
  // SOCIETY & DAILY LIFE 社会生活
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'soc-01', korean: '주민', romanization: 'jumin', baseForm: '주민', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🏘️',
    meanings: [{ chinese: '居民', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '이 동네 주민이에요.', chinese: '是这个社区的居民。', scene: '日常' },
      { korean: '주민등록증을 보여 주세요.', chinese: '请出示身份证。', scene: '行政' },
    ],
    tags: ['社会', '行政'], emotionTags: [], relatedWords: ['soc-02'],
  },
  {
    id: 'soc-02', korean: '이웃', romanization: 'iut', baseForm: '이웃', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '🏡',
    meanings: [{ chinese: '邻居', nuance: '温暖', register: '通用' }],
    examples: [
      { korean: '이웃과 사이좋게 지내요.', chinese: '和邻居相处得很好。', scene: '日常' },
      { korean: '새로 이사 온 이웃이에요.', chinese: '是新搬来的邻居。', scene: '日常' },
    ],
    tags: ['社会', '日常'], emotionTags: [], relatedWords: ['soc-01'],
  },
  {
    id: 'soc-03', korean: '모임', romanization: 'moim', baseForm: '모임', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '👥',
    meanings: [{ chinese: '聚会/集会', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '이번 주말에 모임 있어요.', chinese: '这周末有聚会。', scene: '社交' },
      { korean: '동호회 모임에 가입했어요.', chinese: '加入了同好会。', scene: '社交' },
    ],
    tags: ['社交', '日常'], emotionTags: ['开心'], relatedWords: ['soc-04'],
  },
  {
    id: 'soc-04', korean: '동아리', romanization: 'dongari', baseForm: '동아리', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🎯',
    meanings: [{ chinese: '社团/俱乐部', nuance: '校园常用', register: '通用' }],
    examples: [
      { korean: '학교 동아리에 들어갔어요.', chinese: '加入了学校社团。', scene: '校园' },
      { korean: '댄스 동아리에서 활동해요.', chinese: '在舞蹈社团活动。', scene: '校园' },
    ],
    tags: ['学校', '社交'], emotionTags: [], relatedWords: ['soc-03'],
  },
  {
    id: 'soc-05', korean: '봉사', romanization: 'bongsa', baseForm: '봉사', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '🤝',
    meanings: [{ chinese: '服务/志愿', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '주말에 봉사 활동 해요.', chinese: '周末做志愿活动。', scene: '社会' },
      { korean: '봉사 정신이 중요해요.', chinese: '服务精神很重要。', scene: '社会' },
    ],
    tags: ['社会', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'soc-06', korean: '소식', romanization: 'sosik', baseForm: '소식', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '📢',
    meanings: [{ chinese: '消息/音讯', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '좋은 소식 있어요!', chinese: '有好消息！', scene: '日常' },
      { korean: '소식 들었어요?', chinese: '听说消息了吗？', scene: '日常' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['soc-07'],
  },
  {
    id: 'soc-07', korean: '소문', romanization: 'somun', baseForm: '소문', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '🗣️',
    meanings: [{ chinese: '传闻/风声', nuance: '中性偏口语', register: '通用' }],
    examples: [
      { korean: '좋은 소문이 났어요.', chinese: '传出了好名声。', scene: '日常' },
      { korean: '그 소문 들었어요?', chinese: '你听说那个传闻了吗？', scene: '日常' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['soc-06'],
  },
  {
    id: 'soc-08', korean: '인상', romanization: 'insang', baseForm: '인상', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '😊',
    meanings: [{ chinese: '印象', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '첫인상이 정말 중요해요.', chinese: '第一印象真的很重要。', scene: '社交' },
      { korean: '좋은 인상을 남겼어요.', chinese: '留下了好印象。', scene: '社交' },
    ],
    tags: ['社交', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'soc-09', korean: '관계', romanization: 'gwangye', baseForm: '관계', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🔗',
    meanings: [{ chinese: '关系', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '인간관계가 중요해요.', chinese: '人际关系很重要。', scene: '社会' },
      { korean: '우리 어떤 관계예요?', chinese: '我们是什么关系？', scene: '表白情感' },
    ],
    tags: ['社会', '表白情感'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'soc-10', korean: '갈등', romanization: 'galdeung', baseForm: '갈등', partOfSpeech: '名词',
    level: '4', frequency: 2, emoji: '⚡',
    meanings: [{ chinese: '矛盾/冲突', nuance: '负面', register: '通用' }],
    examples: [
      { korean: '가족 간의 갈등이 생겼어요.', chinese: '家人之间产生了矛盾。', scene: '家庭' },
      { korean: '갈등을 해결해야 해요.', chinese: '必须解决冲突。', scene: '社会' },
    ],
    tags: ['社会', '家庭'], emotionTags: ['不满'], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // WORK & CAREER 职场发展
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'career-01', korean: '취직', romanization: 'chwijik', baseForm: '취직', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '💼',
    meanings: [{ chinese: '就业/找到工作', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '취직 준비 중이에요.', chinese: '正在准备就业。', scene: '职场' },
      { korean: '대기업에 취직했어요.', chinese: '在大企业找到了工作。', scene: '职场' },
    ],
    tags: ['职场', '学校'], emotionTags: [], relatedWords: ['career-02'],
  },
  {
    id: 'career-02', korean: '면접', romanization: 'myeonjeop', baseForm: '면접', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🎤',
    meanings: [{ chinese: '面试', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '내일 면접 있어요.', chinese: '明天有面试。', scene: '职场' },
      { korean: '면접 잘 봤어요?', chinese: '面试顺利吗？', scene: '职场' },
    ],
    tags: ['职场'], emotionTags: ['紧张'], relatedWords: ['career-01'],
  },
  {
    id: 'career-03', korean: '경력', romanization: 'gyeongnyeok', baseForm: '경력', partOfSpeech: '名词',
    level: '4', frequency: 3, emoji: '📋',
    meanings: [{ chinese: '经历/资历', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '경력이 많으시네요.', chinese: '经历很丰富啊。', scene: '职场' },
      { korean: '경력서를 제출해 주세요.', chinese: '请提交简历。', scene: '职场' },
    ],
    tags: ['职场'], emotionTags: [], relatedWords: ['career-04'],
  },
  {
    id: 'career-04', korean: '승진', romanization: 'seungjin', baseForm: '승진', partOfSpeech: '名词',
    level: '4', frequency: 2, emoji: '📈',
    meanings: [{ chinese: '晋升/升职', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '승진 축하해요!', chinese: '恭喜升职！', scene: '职场' },
      { korean: '열심히 해서 승진했어요.', chinese: '努力工作所以升职了。', scene: '职场' },
    ],
    tags: ['职场'], emotionTags: ['开心'], relatedWords: ['career-03'],
  },
  {
    id: 'career-05', korean: '퇴사', romanization: 'toesa', baseForm: '퇴사', partOfSpeech: '名词',
    level: '4', frequency: 2, emoji: '🚪',
    meanings: [{ chinese: '离职/辞职', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '다음 달에 퇴사해요.', chinese: '下个月离职。', scene: '职场' },
      { korean: '퇴사 사유가 뭐예요?', chinese: '离职原因是什么？', scene: '职场' },
    ],
    tags: ['职场'], emotionTags: [], relatedWords: ['career-01'],
  },
  {
    id: 'career-06', korean: '연봉', romanization: 'yeonbong', baseForm: '연봉', partOfSpeech: '名词',
    level: '4', frequency: 2, emoji: '💰',
    meanings: [{ chinese: '年薪', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '연봉이 얼마예요?', chinese: '年薪多少？', scene: '职场' },
      { korean: '연봉 협상 했어요.', chinese: '进行了年薪谈判。', scene: '职场' },
    ],
    tags: ['职场', '经济'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'career-07', korean: '야근', romanization: 'yageun', baseForm: '야근', partOfSpeech: '名词',
    level: '4', frequency: 3, emoji: '🌙',
    meanings: [{ chinese: '加班/夜班', nuance: '职场常用语', register: '通用' }],
    examples: [
      { korean: '오늘 야근해야 해요.', chinese: '今天要加班。', scene: '职场' },
      { korean: '야근 수당 나와요?', chinese: '有加班补贴吗？', scene: '职场' },
    ],
    tags: ['职场'], emotionTags: ['不满'], relatedWords: [],
  },
  {
    id: 'career-08', korean: '출장', romanization: 'chuljang', baseForm: '출장', partOfSpeech: '名词',
    level: '4', frequency: 2, emoji: '✈️',
    meanings: [{ chinese: '出差', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '다음 주에 출장 가요.', chinese: '下周去出差。', scene: '职场' },
      { korean: '출장 보고서 써야 해요.', chinese: '要写出差报告。', scene: '职场' },
    ],
    tags: ['职场', '旅行'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION 教育学习
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'edu-01', korean: '전공', romanization: 'jeongong', baseForm: '전공', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '📚',
    meanings: [{ chinese: '专业', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '전공이 뭐예요?', chinese: '专业是什么？', scene: '学校' },
      { korean: '경영학을 전공했어요.', chinese: '主修了经营学。', scene: '学校' },
    ],
    tags: ['学校', '职场'], emotionTags: [], relatedWords: ['edu-02'],
  },
  {
    id: 'edu-02', korean: '학점', romanization: 'hakjeom', baseForm: '학점', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '📊',
    meanings: [{ chinese: '学分/绩点', nuance: '校园常用', register: '通用' }],
    examples: [
      { korean: '이번 학기 학점이 잘 나왔어요.', chinese: '这学期学分不错。', scene: '学校' },
      { korean: '학점 관리 잘 해야 해요.', chinese: '要好好管理学分。', scene: '学校' },
    ],
    tags: ['学校'], emotionTags: [], relatedWords: ['edu-01'],
  },
  {
    id: 'edu-03', korean: '장학금', romanization: 'janghakgeum', baseForm: '장학금', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '🎓',
    meanings: [{ chinese: '奖学金', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '장학금 받았어요!', chinese: '拿到奖学金了！', scene: '学校' },
      { korean: '장학금 신청했어요.', chinese: '申请了奖学金。', scene: '学校' },
    ],
    tags: ['学校'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'edu-04', korean: '논문', romanization: 'nonmun', baseForm: '논문', partOfSpeech: '名词',
    level: '4', frequency: 2, emoji: '📝',
    meanings: [{ chinese: '论文', nuance: '正式/学术', register: '通用' }],
    examples: [
      { korean: '논문 쓰느라 바빠요.', chinese: '写论文忙得很。', scene: '学校' },
      { korean: '논문 주제 정했어요?', chinese: '论文主题定了吗？', scene: '学校' },
    ],
    tags: ['学校', '学术'], emotionTags: [], relatedWords: ['edu-05'],
  },
  {
    id: 'edu-05', korean: '연구', romanization: 'yeongu', baseForm: '연구', partOfSpeech: '名词',
    level: '4', frequency: 3, emoji: '🔬',
    meanings: [{ chinese: '研究', nuance: '正式/学术', register: '通用' }],
    examples: [
      { korean: '한국어 교육을 연구해요.', chinese: '研究韩国语教育。', scene: '学术' },
      { korean: '연구 결과가 나왔어요.', chinese: '研究结果出来了。', scene: '学术' },
    ],
    tags: ['学术', '学校'], emotionTags: [], relatedWords: ['edu-04'],
  },
  {
    id: 'edu-06', korean: '과목', romanization: 'gwamok', baseForm: '과목', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '📖',
    meanings: [{ chinese: '科目/课程', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '이번 학기에 몇 과목 들어요?', chinese: '这学期选几门课？', scene: '学校' },
      { korean: '선택 과목이 뭐예요?', chinese: '选修课是什么？', scene: '学校' },
    ],
    tags: ['学校'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'edu-07', korean: '졸업', romanization: 'joreop', baseForm: '졸업', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🎉',
    meanings: [{ chinese: '毕业', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '내년에 졸업해요.', chinese: '明年毕业。', scene: '学校' },
      { korean: '졸업하고 뭐 할 거예요?', chinese: '毕业后打算做什么？', scene: '学校' },
    ],
    tags: ['学校', '职场'], emotionTags: [], relatedWords: ['edu-08'],
  },
  {
    id: 'edu-08', korean: '입학', romanization: 'iphak', baseForm: '입학', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '🏫',
    meanings: [{ chinese: '入学', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '입학을 축하해요!', chinese: '恭喜入学！', scene: '学校' },
      { korean: '입학 시험이 어려워요.', chinese: '入学考试很难。', scene: '学校' },
    ],
    tags: ['学校'], emotionTags: [], relatedWords: ['edu-07'],
  },
  {
    id: 'edu-09', korean: '유학', romanization: 'yuhak', baseForm: '유학', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '🌏',
    meanings: [{ chinese: '留学', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '한국에 유학 왔어요.', chinese: '来韩国留学了。', scene: '学校' },
      { korean: '유학 생활이 힘들어요.', chinese: '留学生活很辛苦。', scene: '学校' },
    ],
    tags: ['学校', '旅行'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'edu-10', korean: '학원', romanization: 'hagwon', baseForm: '학원', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🏢',
    meanings: [{ chinese: '补习班/培训学校', nuance: '韩国文化特色词', register: '通用' }],
    examples: [
      { korean: '학원에 다니고 있어요.', chinese: '在上补习班。', scene: '学校' },
      { korean: '한국어 학원을 등록했어요.', chinese: '报名了韩语培训班。', scene: '学校' },
    ],
    tags: ['学校', '社会'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // MEDIA & COMMUNICATION 媒体通讯
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'media-01', korean: '뉴스', romanization: 'nyuseu', baseForm: '뉴스', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '📰',
    meanings: [{ chinese: '新闻', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '오늘 뉴스 봤어요?', chinese: '今天看新闻了吗？', scene: '日常' },
      { korean: '한국 뉴스를 이해할 수 있어요.', chinese: '能理解韩国新闻了。', scene: '日常' },
    ],
    tags: ['媒体', '日常'], emotionTags: [], relatedWords: ['media-02'],
  },
  {
    id: 'media-02', korean: '신문', romanization: 'sinmun', baseForm: '신문', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '📰',
    meanings: [{ chinese: '报纸', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '아침에 신문을 읽어요.', chinese: '早上读报纸。', scene: '日常' },
      { korean: '신문 기사 쓰는 거 어려워요.', chinese: '写新闻报道很难。', scene: '媒体' },
    ],
    tags: ['媒体', '日常'], emotionTags: [], relatedWords: ['media-01'],
  },
  {
    id: 'media-03', korean: '방송', romanization: 'bangsong', baseForm: '방송', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '📺',
    meanings: [{ chinese: '广播/播放', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '이 프로그램은 매주 방송돼요.', chinese: '这个节目每周播出。', scene: '媒体' },
      { korean: '생방송 중이에요.', chinese: '正在直播中。', scene: '媒体' },
    ],
    tags: ['媒体', '韩流'], emotionTags: [], relatedWords: ['media-04'],
  },
  {
    id: 'media-04', korean: '기사', romanization: 'gisa', baseForm: '기사', partOfSpeech: '名词',
    level: '4', frequency: 2, emoji: '✍️',
    meanings: [{ chinese: '文章/报道', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '이 기사 읽어 보세요.', chinese: '请读读这篇报道。', scene: '日常' },
      { korean: '기사에 따르면…', chinese: '据报道…', scene: '媒体' },
    ],
    tags: ['媒体'], emotionTags: [], relatedWords: ['media-01'],
  },
  {
    id: 'media-05', korean: '광고', romanization: 'gwanggo', baseForm: '광고', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '📢',
    meanings: [{ chinese: '广告', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '이 광고 너무 웃겨요.', chinese: '这个广告太好笑了。', scene: '日常' },
      { korean: '광고 없이 볼 수 있어요?', chinese: '可以没有广告观看吗？', scene: '日常' },
    ],
    tags: ['媒体', '消费'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'media-06', korean: '인터넷', romanization: 'inteonet', baseForm: '인터넷', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🌐',
    meanings: [{ chinese: '互联网', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '인터넷이 안 돼요.', chinese: '网络不行。', scene: '日常' },
      { korean: '인터넷으로 주문했어요.', chinese: '通过网络订购了。', scene: '购物' },
    ],
    tags: ['科技', '日常'], emotionTags: [], relatedWords: ['tech-01'],
  },
  {
    id: 'media-07', korean: 'SNS', romanization: 'SNS', baseForm: 'SNS', partOfSpeech: '名词',
    level: '4', frequency: 3, emoji: '📱',
    meanings: [{ chinese: '社交网络', nuance: '口语', register: '通用' }],
    examples: [
      { korean: 'SNS에 사진 올렸어요.', chinese: '在社交网络上发了照片。', scene: '日常' },
      { korean: 'SNS 중독이에요.', chinese: '沉迷社交网络。', scene: '日常' },
    ],
    tags: ['科技', '日常'], emotionTags: [], relatedWords: ['media-06'],
  },
  {
    id: 'media-08', korean: '문자', romanization: 'munja', baseForm: '문자', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '💬',
    meanings: [{ chinese: '短信/文字', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '문자 보내 주세요.', chinese: '请发短信。', scene: '日常' },
      { korean: '문자 확인했어요?', chinese: '看短信了吗？', scene: '日常' },
    ],
    tags: ['日常', '科技'], emotionTags: [], relatedWords: ['media-09'],
  },
  {
    id: 'media-09', korean: '연락', romanization: 'yeollak', baseForm: '연락', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '📞',
    meanings: [{ chinese: '联系/联络', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '연락 주세요!', chinese: '请联系我！', scene: '日常' },
      { korean: '연락이 안 돼요.', chinese: '联系不上。', scene: '日常' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['media-08'],
  },

  // ═══════════════════════════════════════════════════════════════
  // INTERMEDIATE VERBS 中级动词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'iverb-01', korean: '설명하다', romanization: 'seolmyeonghada', baseForm: '설명하다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '🗣️',
    meanings: [{ chinese: '说明/解释', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '다시 한번 설명해 주세요.', chinese: '请再说明一遍。', scene: '学校' },
      { korean: '설명하기 어려워요.', chinese: '很难解释。', scene: '日常' },
    ],
    tags: ['学校', '职场', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-02', korean: '결정하다', romanization: 'gyeoljeonghada', baseForm: '결정하다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '✅',
    meanings: [{ chinese: '决定', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '아직 결정 못 했어요.', chinese: '还没决定。', scene: '日常' },
      { korean: '빨리 결정해야 해요.', chinese: '得快点决定。', scene: '职场' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: ['iverb-03'],
  },
  {
    id: 'iverb-03', korean: '선택하다', romanization: 'seontaekhada', baseForm: '선택하다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '☑️',
    meanings: [{ chinese: '选择', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '뭘 선택할 거예요?', chinese: '会选哪个？', scene: '日常' },
      { korean: '어려운 선택이에요.', chinese: '是个困难的选择。', scene: '日常' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: ['iverb-02'],
  },
  {
    id: 'iverb-04', korean: '비교하다', romanization: 'bigyohada', baseForm: '비교하다', partOfSpeech: '动词',
    level: '3', frequency: 2, emoji: '⚖️',
    meanings: [{ chinese: '比较', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '가격을 비교해 보세요.', chinese: '请比较一下价格。', scene: '购物' },
      { korean: '비교할 수 없어요.', chinese: '无法比较。', scene: '日常' },
    ],
    tags: ['购物', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-05', korean: '준비하다', romanization: 'junbihada', baseForm: '준비하다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '🎒',
    meanings: [{ chinese: '准备', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '시험 준비하고 있어요.', chinese: '正在准备考试。', scene: '学校' },
      { korean: '준비 다 됐어요!', chinese: '准备好了！', scene: '日常' },
    ],
    tags: ['日常', '学校', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-06', korean: '노력하다', romanization: 'noryeokhada', baseForm: '노력하다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '💪',
    meanings: [{ chinese: '努力', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '열심히 노력하고 있어요.', chinese: '正在努力中。', scene: '日常' },
      { korean: '노력하면 꼭 성공할 거예요.', chinese: '努力就一定能成功。', scene: '日常' },
    ],
    tags: ['日常', '学校', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-07', korean: '경험하다', romanization: 'gyeongheomhada', baseForm: '경험하다', partOfSpeech: '动词',
    level: '4', frequency: 3, emoji: '🌟',
    meanings: [{ chinese: '体验/经历', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '한국 문화를 경험하고 싶어요.', chinese: '想体验韩国文化。', scene: '旅行' },
      { korean: '처음 경험해 봤어요.', chinese: '第一次体验了。', scene: '日常' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-08', korean: '이해하다', romanization: 'ihaehada', baseForm: '이해하다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '💡',
    meanings: [{ chinese: '理解/明白', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '이해가 안 돼요.', chinese: '不理解。', scene: '日常' },
      { korean: '이제 이해했어요.', chinese: '现在理解了。', scene: '学校' },
    ],
    tags: ['日常', '学校'], emotionTags: [], relatedWords: ['iverb-09'],
  },
  {
    id: 'iverb-09', korean: '기억하다', romanization: 'gieokhada', baseForm: '기억하다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '🧠',
    meanings: [{ chinese: '记住/记得', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '기억해 주세요.', chinese: '请记住。', scene: '日常' },
      { korean: '이름을 기억 못 해요.', chinese: '记不住名字。', scene: '社交' },
    ],
    tags: ['日常', '学校'], emotionTags: [], relatedWords: ['iverb-08'],
  },
  {
    id: 'iverb-10', korean: '포기하다', romanization: 'pogihada', baseForm: '포기하다', partOfSpeech: '动词',
    level: '4', frequency: 2, emoji: '🏳️',
    meanings: [{ chinese: '放弃', nuance: '负面', register: '通用' }],
    examples: [
      { korean: '포기하지 마세요!', chinese: '不要放弃！', scene: '日常' },
      { korean: '꿈을 포기했어요.', chinese: '放弃了梦想。', scene: '日常' },
    ],
    tags: ['日常', '表白情感'], emotionTags: ['伤心'], relatedWords: [],
  },
  {
    id: 'iverb-11', korean: '약속하다', romanization: 'yaksokhada', baseForm: '약속하다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '🤙',
    meanings: [{ chinese: '约定/承诺', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '약속할게요.', chinese: '我保证。', scene: '日常' },
      { korean: '내일 3시에 약속했어요.', chinese: '约好了明天三点。', scene: '社交' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['iverb-12'],
  },
  {
    id: 'iverb-12', korean: '취소하다', romanization: 'chwisohada', baseForm: '취소하다', partOfSpeech: '动词',
    level: '4', frequency: 2, emoji: '❌',
    meanings: [{ chinese: '取消', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '예약을 취소하고 싶어요.', chinese: '想取消预约。', scene: '日常' },
      { korean: '약속 취소됐어요.', chinese: '约定取消了。', scene: '社交' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['iverb-11'],
  },
  {
    id: 'iverb-13', korean: '신청하다', romanization: 'sincheonghada', baseForm: '신청하다', partOfSpeech: '动词',
    level: '3', frequency: 2, emoji: '📝',
    meanings: [{ chinese: '申请', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '비자 신청했어요.', chinese: '申请了签证。', scene: '行政' },
      { korean: '온라인으로 신청할 수 있어요.', chinese: '可以在线申请。', scene: '日常' },
    ],
    tags: ['行政', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-14', korean: '확인하다', romanization: 'hwaginhada', baseForm: '확인하다', partOfSpeech: '动词',
    level: '3', frequency: 3, emoji: '🔍',
    meanings: [{ chinese: '确认', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '다시 확인해 주세요.', chinese: '请再确认一下。', scene: '职场' },
      { korean: '메일 확인했어요.', chinese: '确认了邮件。', scene: '职场' },
    ],
    tags: ['职场', '日常'], emotionTags: [], relatedWords: ['iverb-15'],
  },
  {
    id: 'iverb-15', korean: '검색하다', romanization: 'geomsaekhada', baseForm: '검색하다', partOfSpeech: '动词',
    level: '3', frequency: 2, emoji: '🔎',
    meanings: [{ chinese: '搜索', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '인터넷으로 검색해 보세요.', chinese: '请上网搜索看看。', scene: '日常' },
      { korean: '검색 결과가 없어요.', chinese: '没有搜索结果。', scene: '日常' },
    ],
    tags: ['科技', '日常'], emotionTags: [], relatedWords: ['iverb-14'],
  },
  {
    id: 'iverb-16', korean: '발견하다', romanization: 'balgyeonhada', baseForm: '발견하다', partOfSpeech: '动词',
    level: '4', frequency: 2, emoji: '👀',
    meanings: [{ chinese: '发现', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '새로운 사실을 발견했어요.', chinese: '发现了新的事实。', scene: '学术' },
      { korean: '길을 잃었다가 발견했어요.', chinese: '迷路后找到了。', scene: '旅行' },
    ],
    tags: ['日常', '学术'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-17', korean: '포함하다', romanization: 'pohamhada', baseForm: '포함하다', partOfSpeech: '动词',
    level: '4', frequency: 2, emoji: '📦',
    meanings: [{ chinese: '包含/包括', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '세금이 포함됐어요.', chinese: '含税了。', scene: '购物' },
      { korean: '식사가 포함돼 있어요?', chinese: '包含餐食吗？', scene: '旅行' },
    ],
    tags: ['购物', '旅行'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-18', korean: '표현하다', romanization: 'pyohyeonhada', baseForm: '표현하다', partOfSpeech: '动词',
    level: '3', frequency: 2, emoji: '🎨',
    meanings: [{ chinese: '表达/表现', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '한국어로 표현하기 어려워요.', chinese: '用韩语表达很难。', scene: '学校' },
      { korean: '감정을 잘 표현하세요.', chinese: '请好好表达感情。', scene: '表白情感' },
    ],
    tags: ['学校', '表白情感'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-19', korean: '발전하다', romanization: 'baljeonhada', baseForm: '발전하다', partOfSpeech: '动词',
    level: '4', frequency: 2, emoji: '📈',
    meanings: [{ chinese: '发展', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '한국어 실력이 많이 발전했어요.', chinese: '韩语能力进步了很多。', scene: '学校' },
      { korean: '기술이 빠르게 발전하고 있어요.', chinese: '技术在快速发展。', scene: '科技' },
    ],
    tags: ['学校', '科技'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-20', korean: '유지하다', romanization: 'yujihada', baseForm: '유지하다', partOfSpeech: '动词',
    level: '4', frequency: 2, emoji: '🔄',
    meanings: [{ chinese: '维持/保持', nuance: '正式', register: '通用' }],
    examples: [
      { korean: '건강을 유지하세요.', chinese: '请保持健康。', scene: '健康' },
      { korean: '관계를 유지하기 어려워요.', chinese: '维持关系很难。', scene: '社交' },
    ],
    tags: ['健康', '社交'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // INTERMEDIATE ADJECTIVES 中级形容词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'iadj-01', korean: '편리하다', romanization: 'pyeollihada', baseForm: '편리하다', partOfSpeech: '形容词',
    level: '3', frequency: 3, emoji: '👍',
    meanings: [{ chinese: '方便/便利', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '교통이 정말 편리해요.', chinese: '交通真的很方便。', scene: '出行' },
      { korean: '이 앱은 사용하기 편리해요.', chinese: '这个应用使用起来很便利。', scene: '日常' },
    ],
    tags: ['日常', '出行'], emotionTags: ['开心'], relatedWords: ['iadj-02'],
  },
  {
    id: 'iadj-02', korean: '불편하다', romanization: 'bulpyeonhada', baseForm: '불편하다', partOfSpeech: '形容词',
    level: '3', frequency: 2, emoji: '😣',
    meanings: [{ chinese: '不方便/不舒服', nuance: '负面', register: '通用' }],
    examples: [
      { korean: '여기 좀 불편해요.', chinese: '这里有点不舒服。', scene: '日常' },
      { korean: '불편한 점이 있으면 말씀하세요.', chinese: '有不便之处请说。', scene: '职场' },
    ],
    tags: ['日常', '职场'], emotionTags: ['不满'], relatedWords: ['iadj-01'],
  },
  {
    id: 'iadj-03', korean: '복잡하다', romanization: 'bokjaphada', baseForm: '복잡하다', partOfSpeech: '形容词',
    level: '3', frequency: 3, emoji: '😵',
    meanings: [{ chinese: '复杂/拥挤', nuance: '偏负面', register: '通用' }],
    examples: [
      { korean: '길이 너무 복잡해요.', chinese: '路太复杂（拥挤）了。', scene: '出行' },
      { korean: '상황이 복잡해졌어요.', chinese: '情况变复杂了。', scene: '日常' },
    ],
    tags: ['日常', '出行'], emotionTags: ['紧张'], relatedWords: ['iadj-04'],
  },
  {
    id: 'iadj-04', korean: '간단하다', romanization: 'gandanhada', baseForm: '간단하다', partOfSpeech: '形容词',
    level: '3', frequency: 3, emoji: '✨',
    meanings: [{ chinese: '简单', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '설명이 간단하네요.', chinese: '说明很简单。', scene: '学校' },
      { korean: '간단하게 말해 주세요.', chinese: '请简单说一下。', scene: '日常' },
    ],
    tags: ['日常', '学校'], emotionTags: [], relatedWords: ['iadj-03'],
  },
  {
    id: 'iadj-05', korean: '특별하다', romanization: 'teukbyeolhada', baseForm: '특별하다', partOfSpeech: '形容词',
    level: '3', frequency: 3, emoji: '⭐',
    meanings: [{ chinese: '特别', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '오늘은 특별한 날이에요.', chinese: '今天是特别的日子。', scene: '日常' },
      { korean: '특별한 추억을 만들었어요.', chinese: '制造了特别的回忆。', scene: '表白情感' },
    ],
    tags: ['日常', '表白情感'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'iadj-06', korean: '소중하다', romanization: 'sojunghada', baseForm: '소중하다', partOfSpeech: '形容词',
    level: '4', frequency: 3, emoji: '💎',
    meanings: [{ chinese: '珍贵/宝贵', nuance: '正面/感性', register: '通用' }],
    examples: [
      { korean: '소중한 사람이에요.', chinese: '是珍贵的人。', scene: '表白情感' },
      { korean: '시간을 소중하게 쓰세요.', chinese: '请珍惜时间。', scene: '日常' },
    ],
    tags: ['表白情感', '日常'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'iadj-07', korean: '당연하다', romanization: 'dangyeonhada', baseForm: '당연하다', partOfSpeech: '形容词',
    level: '3', frequency: 3, emoji: '🤷',
    meanings: [{ chinese: '当然/理所当然', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '당연한 결과예요.', chinese: '是当然的结果。', scene: '日常' },
      { korean: '당연히 해야 하는 일이에요.', chinese: '是理所当然该做的事。', scene: '职场' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iadj-08', korean: '적당하다', romanization: 'jeokdanghada', baseForm: '적당하다', partOfSpeech: '形容词',
    level: '4', frequency: 2, emoji: '👌',
    meanings: [{ chinese: '适当/合适', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '적당한 가격이에요.', chinese: '价格合适。', scene: '购物' },
      { korean: '운동은 적당히 하세요.', chinese: '请适当运动。', scene: '健康' },
    ],
    tags: ['购物', '健康'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iadj-09', korean: '익숙하다', romanization: 'iksukhada', baseForm: '익숙하다', partOfSpeech: '形容词',
    level: '4', frequency: 3, emoji: '🏠',
    meanings: [{ chinese: '熟悉/习惯', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '이제 한국 생활에 익숙해졌어요.', chinese: '现在习惯了韩国生活。', scene: '日常' },
      { korean: '익숙한 얼굴이네요.', chinese: '是熟悉的面孔呢。', scene: '社交' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['iadj-10'],
  },
  {
    id: 'iadj-10', korean: '낯설다', romanization: 'natseolda', baseForm: '낯설다', partOfSpeech: '形容词',
    level: '4', frequency: 2, emoji: '🤔',
    meanings: [{ chinese: '陌生', nuance: '中性偏负面', register: '通用' }],
    examples: [
      { korean: '아직 모든 게 낯설어요.', chinese: '一切还很陌生。', scene: '日常' },
      { korean: '낯선 곳에서 길을 잃었어요.', chinese: '在陌生的地方迷路了。', scene: '旅行' },
    ],
    tags: ['旅行', '日常'], emotionTags: ['紧张'], relatedWords: ['iadj-09'],
  },
  {
    id: 'iadj-11', korean: '안전하다', romanization: 'anjeonhada', baseForm: '안전하다', partOfSpeech: '形容词',
    level: '3', frequency: 2, emoji: '🛡️',
    meanings: [{ chinese: '安全', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '한국은 밤에도 안전해요.', chinese: '韩国晚上也很安全。', scene: '日常' },
      { korean: '안전한 여행 되세요.', chinese: '祝旅行安全。', scene: '旅行' },
    ],
    tags: ['日常', '旅行'], emotionTags: ['安心'], relatedWords: ['iadj-12'],
  },
  {
    id: 'iadj-12', korean: '위험하다', romanization: 'wiheomhada', baseForm: '위험하다', partOfSpeech: '形容词',
    level: '3', frequency: 2, emoji: '⚠️',
    meanings: [{ chinese: '危险', nuance: '负面', register: '通用' }],
    examples: [
      { korean: '여기 위험해요!', chinese: '这里危险！', scene: '日常' },
      { korean: '위험한 행동 하지 마세요.', chinese: '请不要做危险的行为。', scene: '日常' },
    ],
    tags: ['日常', '旅行'], emotionTags: ['紧张'], relatedWords: ['iadj-11'],
  },
  {
    id: 'iadj-13', korean: '자연스럽다', romanization: 'jayeonseureopda', baseForm: '자연스럽다', partOfSpeech: '形容词',
    level: '4', frequency: 2, emoji: '🌿',
    meanings: [{ chinese: '自然', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '한국어가 자연스러워요.', chinese: '韩语很自然。', scene: '学校' },
      { korean: '자연스럽게 행동하세요.', chinese: '请自然地行动。', scene: '社交' },
    ],
    tags: ['社交', '学校'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iadj-14', korean: '비슷하다', romanization: 'biseuthada', baseForm: '비슷하다', partOfSpeech: '形容词',
    level: '3', frequency: 3, emoji: '👯',
    meanings: [{ chinese: '相似/差不多', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '발음이 비슷해요.', chinese: '发音很相似。', scene: '学校' },
      { korean: '둘이 정말 비슷하게 생겼어요.', chinese: '两个人长得很像。', scene: '日常' },
    ],
    tags: ['日常', '学校'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iadj-15', korean: '다양하다', romanization: 'dayanghada', baseForm: '다양하다', partOfSpeech: '形容词',
    level: '4', frequency: 3, emoji: '🎨',
    meanings: [{ chinese: '多样/各种', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '다양한 음식을 먹어 봤어요.', chinese: '尝了各种各样的食物。', scene: '餐厅' },
      { korean: '다양한 경험을 하고 싶어요.', chinese: '想有多样的体验。', scene: '日常' },
    ],
    tags: ['日常', '餐厅'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // HEALTH & BODY 健康身体
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'body-01', korean: '건강', romanization: 'geongang', baseForm: '건강', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '💪',
    meanings: [{ chinese: '健康', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '건강이 제일 중요해요.', chinese: '健康最重要。', scene: '日常' },
      { korean: '건강 조심하세요.', chinese: '请注意健康。', scene: '日常' },
    ],
    tags: ['健康', '日常'], emotionTags: [], relatedWords: ['body-02'],
  },
  {
    id: 'body-02', korean: '스트레스', romanization: 'seuteureseu', baseForm: '스트레스', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '😫',
    meanings: [{ chinese: '压力', nuance: '外来词（英语stress）', register: '通用' }],
    examples: [
      { korean: '스트레스 받아요.', chinese: '有压力。', scene: '日常' },
      { korean: '스트레스 풀러 가요.', chinese: '去解压吧。', scene: '日常' },
    ],
    tags: ['健康', '日常', '职场'], emotionTags: ['不满'], relatedWords: ['body-01'],
  },
  {
    id: 'body-03', korean: '체력', romanization: 'cheryeok', baseForm: '체력', partOfSpeech: '名词',
    level: '4', frequency: 2, emoji: '⚡',
    meanings: [{ chinese: '体力', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '체력이 딸려요.', chinese: '体力跟不上。', scene: '日常' },
      { korean: '체력을 키워야 해요.', chinese: '得增强体力。', scene: '健康' },
    ],
    tags: ['健康', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'body-04', korean: '다이어트', romanization: 'daieoteu', baseForm: '다이어트', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🥗',
    meanings: [{ chinese: '减肥/节食', nuance: '口语高频', register: '通用' }],
    examples: [
      { korean: '다이어트 중이에요.', chinese: '在减肥中。', scene: '日常' },
      { korean: '다이어트 식단 추천해 주세요.', chinese: '请推荐减肥餐。', scene: '健康' },
    ],
    tags: ['健康', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'body-05', korean: '피부', romanization: 'pibu', baseForm: '피부', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '✨',
    meanings: [{ chinese: '皮肤', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '피부가 좋아졌어요.', chinese: '皮肤变好了。', scene: '韩流' },
      { korean: '피부 관리 어떻게 해요?', chinese: '怎么护肤？', scene: '韩流' },
    ],
    tags: ['健康', '韩流'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // NATURE & ENVIRONMENT 自然环境
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'nature-01', korean: '자연', romanization: 'jayeon', baseForm: '자연', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🌳',
    meanings: [{ chinese: '自然', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '자연을 보호해야 해요.', chinese: '应该保护自然。', scene: '社会' },
      { korean: '자연 경관이 정말 아름다워요.', chinese: '自然景观真的很美。', scene: '旅行' },
    ],
    tags: ['自然', '旅行'], emotionTags: [], relatedWords: ['nature-02'],
  },
  {
    id: 'nature-02', korean: '환경', romanization: 'hwangyeong', baseForm: '환경', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🌍',
    meanings: [{ chinese: '环境', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '환경을 지켜야 해요.', chinese: '应该保护环境。', scene: '社会' },
      { korean: '근무 환경이 어때요?', chinese: '工作环境怎么样？', scene: '职场' },
    ],
    tags: ['自然', '社会', '职场'], emotionTags: [], relatedWords: ['nature-01'],
  },
  {
    id: 'nature-03', korean: '공기', romanization: 'gonggi', baseForm: '공기', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '🌬️',
    meanings: [{ chinese: '空气', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '공기가 좋아요.', chinese: '空气很好。', scene: '日常' },
      { korean: '공기가 나빠졌어요.', chinese: '空气变差了。', scene: '日常' },
    ],
    tags: ['自然', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'nature-04', korean: '하늘', romanization: 'haneul', baseForm: '하늘', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '☁️',
    meanings: [{ chinese: '天空', nuance: '中性/诗意', register: '通用' }],
    examples: [
      { korean: '하늘이 정말 예뻐요.', chinese: '天空真美。', scene: '日常' },
      { korean: '가을 하늘이 제일 좋아요.', chinese: '秋天的天空最美。', scene: '日常' },
    ],
    tags: ['自然', '日常'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'nature-05', korean: '바다', romanization: 'bada', baseForm: '바다', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '🌊',
    meanings: [{ chinese: '大海', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '바다 구경하러 가요.', chinese: '去看海吧。', scene: '旅行' },
      { korean: '부산은 바다가 예뻐요.', chinese: '釜山的海很美。', scene: '旅行' },
    ],
    tags: ['自然', '旅行'], emotionTags: ['开心'], relatedWords: ['nature-06'],
  },
  {
    id: 'nature-06', korean: '산', romanization: 'san', baseForm: '산', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '⛰️',
    meanings: [{ chinese: '山', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '주말에 산에 갈까요?', chinese: '周末去爬山吗？', scene: '日常' },
      { korean: '한국은 산이 많아요.', chinese: '韩国山很多。', scene: '旅行' },
    ],
    tags: ['自然', '旅行', '日常'], emotionTags: [], relatedWords: ['nature-05'],
  },
  {
    id: 'nature-07', korean: '쓰레기', romanization: 'sseuregi', baseForm: '쓰레기', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '🗑️',
    meanings: [{ chinese: '垃圾', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '쓰레기를 버리지 마세요.', chinese: '请不要扔垃圾。', scene: '日常' },
      { korean: '분리수거 잘해야 해요.', chinese: '要做好垃圾分类。', scene: '日常' },
    ],
    tags: ['日常', '自然'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // ARTS & ENTERTAINMENT 文化艺术
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'arts-01', korean: '전시회', romanization: 'jeonsihoe', baseForm: '전시회', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '🖼️',
    meanings: [{ chinese: '展览会', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '주말에 전시회 가요.', chinese: '周末去看展览。', scene: '日常' },
      { korean: '미술 전시회 정말 좋았어요.', chinese: '美术展真的很棒。', scene: '文化' },
    ],
    tags: ['文化', '日常'], emotionTags: [], relatedWords: ['arts-02'],
  },
  {
    id: 'arts-02', korean: '공연', romanization: 'gongyeon', baseForm: '공연', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '🎭',
    meanings: [{ chinese: '演出/公演', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '오늘 저녁에 공연 봐요.', chinese: '今晚看演出。', scene: '文化' },
      { korean: '이 공연 정말 유명해요.', chinese: '这个演出很有名。', scene: '媒体' },
    ],
    tags: ['文化', '韩流'], emotionTags: [], relatedWords: ['arts-01'],
  },
  {
    id: 'arts-03', korean: '연습', romanization: 'yeonseup', baseForm: '연습', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🎵',
    meanings: [{ chinese: '练习', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '매일 피아노 연습해요.', chinese: '每天练习钢琴。', scene: '日常' },
      { korean: '연습하면 늘 거예요.', chinese: '练习就会进步的。', scene: '学校' },
    ],
    tags: ['日常', '学校'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'arts-04', korean: '그림', romanization: 'geurim', baseForm: '그림', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🎨',
    meanings: [{ chinese: '画/图画', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '그림 그리는 걸 좋아해요.', chinese: '喜欢画画。', scene: '日常' },
      { korean: '이 그림 누가 그렸어요?', chinese: '这幅画是谁画的？', scene: '文化' },
    ],
    tags: ['文化', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'arts-05', korean: '취미', romanization: 'chwimi', baseForm: '취미', partOfSpeech: '名词',
    level: '3', frequency: 3, emoji: '🎯',
    meanings: [{ chinese: '爱好', nuance: '中性', register: '通用' }],
    examples: [
      { korean: '취미가 뭐예요?', chinese: '爱好是什么？', scene: '社交' },
      { korean: '새로운 취미를 찾았어요.', chinese: '找到了新的爱好。', scene: '日常' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'arts-06', korean: '전통', romanization: 'jeontong', baseForm: '전통', partOfSpeech: '名词',
    level: '3', frequency: 2, emoji: '🏯',
    meanings: [{ chinese: '传统', nuance: '正面', register: '通用' }],
    examples: [
      { korean: '한국 전통 문화를 배우고 있어요.', chinese: '在学习韩国传统文化。', scene: '文化' },
      { korean: '전통을 지키는 것이 중요해요.', chinese: '保持传统很重要。', scene: '社会' },
    ],
    tags: ['文化', '韩流'], emotionTags: [], relatedWords: [],
  },
];
