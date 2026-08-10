import type { WordEntry } from '@/types';

// Intermediate vocabulary (TOPIK levels 3-4) — ~200 entries
export const intermediateEntries: WordEntry[] = [

  // ═══════════════════════════════════════════════════════════════
  // SOCIETY & DAILY LIFE 社会生活
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'soc-01', korean: '주민', romanization: 'jumin', baseForm: '주민', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '居民', chineseEn: 'residents', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이 동네 주민이에요.', chinese: '是这个社区的居民。', chineseEn: 'They\'re a resident of this community.', scene: '日常', sceneEn: 'Daily' },
      { korean: '주민등록증을 보여 주세요.', chinese: '请出示身份证。', chineseEn: 'Please show your ID.', scene: '行政', sceneEn: 'administrative' },
    ],
    tags: ['社会', '行政'], emotionTags: [], relatedWords: ['soc-02'],
  },
  {
    id: 'soc-02', korean: '이웃', romanization: 'iut', baseForm: '이웃', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '邻居', chineseEn: 'neighbor', nuance: '温暖', nuanceEn: 'Warm', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이웃과 사이좋게 지내요.', chinese: '和邻居相处得很好。', chineseEn: 'I get along well with my neighbors.', scene: '日常', sceneEn: 'Daily' },
      { korean: '새로 이사 온 이웃이에요.', chinese: '是新搬来的邻居。', chineseEn: 'They\'re a newly moved-in neighbor.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['社会', '日常'], emotionTags: [], relatedWords: ['soc-01'],
  },
  {
    id: 'soc-03', korean: '모임', romanization: 'moim', baseForm: '모임', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '聚会/集会', chineseEn: 'gathering / meeting', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이번 주말에 모임 있어요.', chinese: '这周末有聚会。', chineseEn: 'There\'s a gathering this weekend.', scene: '社交', sceneEn: 'Social' },
      { korean: '동호회 모임에 가입했어요.', chinese: '加入了同好会。', chineseEn: 'I joined a hobby club.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['社交', '日常'], emotionTags: ['开心'], relatedWords: ['soc-04'],
  },
  {
    id: 'soc-04', korean: '동아리', romanization: 'dongari', baseForm: '동아리', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '社团/俱乐部', chineseEn: 'club / society', nuance: '校园常用', nuanceEn: 'Common on Campus', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '학교 동아리에 들어갔어요.', chinese: '加入了学校社团。', chineseEn: 'I joined a school club.', scene: '校园', sceneEn: 'Campus' },
      { korean: '댄스 동아리에서 활동해요.', chinese: '在舞蹈社团活动。', chineseEn: 'I\'m active in the dance club.', scene: '校园', sceneEn: 'Campus' },
    ],
    tags: ['学校', '社交'], emotionTags: [], relatedWords: ['soc-03'],
  },
  {
    id: 'soc-05', korean: '봉사', romanization: 'bongsa', baseForm: '봉사', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '服务/志愿', chineseEn: 'service / volunteer', nuance: '正面', nuanceEn: 'positive', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '주말에 봉사 활동 해요.', chinese: '周末做志愿活动。', chineseEn: 'I do volunteer work on weekends.', scene: '社会', sceneEn: 'Society' },
      { korean: '봉사 정신이 중요해요.', chinese: '服务精神很重要。', chineseEn: 'A spirit of service is important.', scene: '社会', sceneEn: 'Society' },
    ],
    tags: ['社会', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'soc-06', korean: '소식', romanization: 'sosik', baseForm: '소식', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '消息/音讯', chineseEn: 'news / message', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '좋은 소식 있어요!', chinese: '有好消息！', chineseEn: 'I have good news!', scene: '日常', sceneEn: 'Daily' },
      { korean: '소식 들었어요?', chinese: '听说消息了吗？', chineseEn: 'Have you heard the news?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['soc-07'],
  },
  {
    id: 'soc-07', korean: '소문', romanization: 'somun', baseForm: '소문', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '传闻/风声', chineseEn: 'rumor / word', nuance: '中性偏口语', nuanceEn: 'Neutral, Casual', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '좋은 소문이 났어요.', chinese: '传出了好名声。', chineseEn: 'Word of a good reputation spread.', scene: '日常', sceneEn: 'Daily' },
      { korean: '그 소문 들었어요?', chinese: '你听说那个传闻了吗？', chineseEn: 'Have you heard that rumor?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['soc-06'],
  },
  {
    id: 'soc-08', korean: '인상', romanization: 'insang', baseForm: '인상', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '印象', chineseEn: 'impression', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '첫인상이 정말 중요해요.', chinese: '第一印象真的很重要。', chineseEn: 'First impressions really matter.', scene: '社交', sceneEn: 'Social' },
      { korean: '좋은 인상을 남겼어요.', chinese: '留下了好印象。', chineseEn: 'I made a good impression.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['社交', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'soc-09', korean: '관계', romanization: 'gwangye', baseForm: '관계', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '关系', chineseEn: 'Relationships', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '인간관계가 중요해요.', chinese: '人际关系很重要。', chineseEn: 'Interpersonal relationships are important.', scene: '社会', sceneEn: 'Society' },
      { korean: '우리 어떤 관계예요?', chinese: '我们是什么关系？', chineseEn: 'What\'s our relationship?', scene: '表白情感', sceneEn: 'expressing emotions' },
    ],
    tags: ['社会', '表白情感'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'soc-10', korean: '갈등', romanization: 'galdeung', baseForm: '갈등', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '矛盾/冲突', chineseEn: 'conflict/contradiction', nuance: '负面', nuanceEn: 'negative', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '가족 간의 갈등이 생겼어요.', chinese: '家人之间产生了矛盾。', chineseEn: 'A conflict arose among family members.', scene: '家庭', sceneEn: 'Family' },
      { korean: '갈등을 해결해야 해요.', chinese: '必须解决冲突。', chineseEn: 'The conflict must be resolved.', scene: '社会', sceneEn: 'Society' },
    ],
    tags: ['社会', '家庭'], emotionTags: ['不满'], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // WORK & CAREER 职场发展
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'career-01', korean: '취직', romanization: 'chwijik', baseForm: '취직', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '就业/找到工作', chineseEn: 'Employment / Finding a job', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '취직 준비 중이에요.', chinese: '正在准备就业。', chineseEn: 'I\'m preparing for employment.', scene: '职场', sceneEn: 'workplace' },
      { korean: '대기업에 취직했어요.', chinese: '在大企业找到了工作。', chineseEn: 'I found a job at a large company.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['职场', '学校'], emotionTags: [], relatedWords: ['career-02'],
  },
  {
    id: 'career-02', korean: '면접', romanization: 'myeonjeop', baseForm: '면접', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '面试', chineseEn: 'interview', nuance: '正式', nuanceEn: 'formal', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '내일 면접 있어요.', chinese: '明天有面试。', chineseEn: 'I have an interview tomorrow.', scene: '职场', sceneEn: 'workplace' },
      { korean: '면접 잘 봤어요?', chinese: '面试顺利吗？', chineseEn: 'Did the interview go well?', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['职场'], emotionTags: ['紧张'], relatedWords: ['career-01'],
  },
  {
    id: 'career-03', korean: '경력', romanization: 'gyeongnyeok', baseForm: '경력', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '经历/资历', chineseEn: 'Experience / Qualifications', nuance: '正式', nuanceEn: 'formal', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '경력이 많으시네요.', chinese: '经历很丰富啊。', chineseEn: 'You have a lot of experience.', scene: '职场', sceneEn: 'workplace' },
      { korean: '경력서를 제출해 주세요.', chinese: '请提交简历。', chineseEn: 'Please submit your resume.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['职场'], emotionTags: [], relatedWords: ['career-04'],
  },
  {
    id: 'career-04', korean: '승진', romanization: 'seungjin', baseForm: '승진', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '晋升/升职', chineseEn: 'promotion', nuance: '正式', nuanceEn: 'formal', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '승진 축하해요!', chinese: '恭喜升职！', chineseEn: 'Congratulations on your promotion!', scene: '职场', sceneEn: 'workplace' },
      { korean: '열심히 해서 승진했어요.', chinese: '努力工作所以升职了。', chineseEn: 'I got promoted because I worked hard.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['职场'], emotionTags: ['开心'], relatedWords: ['career-03'],
  },
  {
    id: 'career-05', korean: '퇴사', romanization: 'toesa', baseForm: '퇴사', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '离职/辞职', chineseEn: 'Resignation / Quitting', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '다음 달에 퇴사해요.', chinese: '下个月离职。', chineseEn: 'I\'m leaving next month.', scene: '职场', sceneEn: 'workplace' },
      { korean: '퇴사 사유가 뭐예요?', chinese: '离职原因是什么？', chineseEn: 'What\'s the reason for leaving?', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['职场'], emotionTags: [], relatedWords: ['career-01'],
  },
  {
    id: 'career-06', korean: '연봉', romanization: 'yeonbong', baseForm: '연봉', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '年薪', chineseEn: 'Annual salary', nuance: '正式', nuanceEn: 'formal', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '연봉이 얼마예요?', chinese: '年薪多少？', chineseEn: 'What\'s the annual salary?', scene: '职场', sceneEn: 'workplace' },
      { korean: '연봉 협상 했어요.', chinese: '进行了年薪谈判。', chineseEn: 'I negotiated my salary.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['职场', '经济'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'career-07', korean: '야근', romanization: 'yageun', baseForm: '야근', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '加班/夜班', chineseEn: 'Overtime / Night shift', nuance: '职场常用语', nuanceEn: 'Common in the Workplace', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '오늘 야근해야 해요.', chinese: '今天要加班。', chineseEn: 'I have to work overtime today.', scene: '职场', sceneEn: 'workplace' },
      { korean: '야근 수당 나와요?', chinese: '有加班补贴吗？', chineseEn: 'Is there overtime pay?', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['职场'], emotionTags: ['不满'], relatedWords: [],
  },
  {
    id: 'career-08', korean: '출장', romanization: 'chuljang', baseForm: '출장', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '出差', chineseEn: 'business trip', nuance: '正式', nuanceEn: 'formal', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '다음 주에 출장 가요.', chinese: '下周去出差。', chineseEn: 'I\'m going on a business trip next week.', scene: '职场', sceneEn: 'workplace' },
      { korean: '출장 보고서 써야 해요.', chinese: '要写出差报告。', chineseEn: 'I need to write a business trip report.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['职场', '旅行'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // EDUCATION 教育学习
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'edu-01', korean: '전공', romanization: 'jeongong', baseForm: '전공', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '专业', chineseEn: 'Major', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '전공이 뭐예요?', chinese: '专业是什么？', chineseEn: 'What\'s your major?', scene: '学校', sceneEn: 'School' },
      { korean: '경영학을 전공했어요.', chinese: '主修了经营学。', chineseEn: 'I majored in business administration.', scene: '学校', sceneEn: 'School' },
    ],
    tags: ['学校', '职场'], emotionTags: [], relatedWords: ['edu-02'],
  },
  {
    id: 'edu-02', korean: '학점', romanization: 'hakjeom', baseForm: '학점', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '学分/绩点', chineseEn: 'credits/GPA', nuance: '校园常用', nuanceEn: 'Common on Campus', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이번 학기 학점이 잘 나왔어요.', chinese: '这学期学分不错。', chineseEn: 'My credits this semester are good.', scene: '学校', sceneEn: 'School' },
      { korean: '학점 관리 잘 해야 해요.', chinese: '要好好管理学分。', chineseEn: 'I need to manage my credits well.', scene: '学校', sceneEn: 'School' },
    ],
    tags: ['学校'], emotionTags: [], relatedWords: ['edu-01'],
  },
  {
    id: 'edu-03', korean: '장학금', romanization: 'janghakgeum', baseForm: '장학금', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '奖学金', chineseEn: 'Scholarship', nuance: '正面', nuanceEn: 'positive', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '장학금 받았어요!', chinese: '拿到奖学金了！', chineseEn: 'I got the scholarship!', scene: '学校', sceneEn: 'School' },
      { korean: '장학금 신청했어요.', chinese: '申请了奖学金。', chineseEn: 'I applied for a scholarship.', scene: '学校', sceneEn: 'School' },
    ],
    tags: ['学校'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'edu-04', korean: '논문', romanization: 'nonmun', baseForm: '논문', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '论文', chineseEn: 'Thesis', nuance: '正式/学术', nuanceEn: 'formal/academic', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '논문 쓰느라 바빠요.', chinese: '写论文忙得很。', chineseEn: 'I\'m so busy writing my thesis.', scene: '学校', sceneEn: 'School' },
      { korean: '논문 주제 정했어요?', chinese: '论文主题定了吗？', chineseEn: 'Have you decided on your thesis topic?', scene: '学校', sceneEn: 'School' },
    ],
    tags: ['学校', '学术'], emotionTags: [], relatedWords: ['edu-05'],
  },
  {
    id: 'edu-05', korean: '연구', romanization: 'yeongu', baseForm: '연구', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '研究', chineseEn: 'research', nuance: '正式/学术', nuanceEn: 'formal/academic', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국어 교육을 연구해요.', chinese: '研究韩国语教育。', chineseEn: 'I research Korean language education.', scene: '学术', sceneEn: 'academic' },
      { korean: '연구 결과가 나왔어요.', chinese: '研究结果出来了。', chineseEn: 'The research results are out.', scene: '学术', sceneEn: 'academic' },
    ],
    tags: ['学术', '学校'], emotionTags: [], relatedWords: ['edu-04'],
  },
  {
    id: 'edu-06', korean: '과목', romanization: 'gwamok', baseForm: '과목', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '科目/课程', chineseEn: 'subject/course', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이번 학기에 몇 과목 들어요?', chinese: '这学期选几门课？', chineseEn: 'How many courses are you taking this semester?', scene: '学校', sceneEn: 'School' },
      { korean: '선택 과목이 뭐예요?', chinese: '选修课是什么？', chineseEn: 'What are your electives?', scene: '学校', sceneEn: 'School' },
    ],
    tags: ['学校'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'edu-07', korean: '졸업', romanization: 'joreop', baseForm: '졸업', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '毕业', chineseEn: 'graduation', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '내년에 졸업해요.', chinese: '明年毕业。', chineseEn: 'I will graduate next year.', scene: '学校', sceneEn: 'School' },
      { korean: '졸업하고 뭐 할 거예요?', chinese: '毕业后打算做什么？', chineseEn: 'What do you plan to do after graduation?', scene: '学校', sceneEn: 'School' },
    ],
    tags: ['学校', '职场'], emotionTags: [], relatedWords: ['edu-08'],
  },
  {
    id: 'edu-08', korean: '입학', romanization: 'iphak', baseForm: '입학', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '入学', chineseEn: 'enrollment', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '입학을 축하해요!', chinese: '恭喜入学！', chineseEn: 'Congratulations on your admission!', scene: '学校', sceneEn: 'School' },
      { korean: '입학 시험이 어려워요.', chinese: '入学考试很难。', chineseEn: 'The entrance exam is very hard.', scene: '学校', sceneEn: 'School' },
    ],
    tags: ['学校'], emotionTags: [], relatedWords: ['edu-07'],
  },
  {
    id: 'edu-09', korean: '유학', romanization: 'yuhak', baseForm: '유학', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '留学', chineseEn: 'study abroad', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국에 유학 왔어요.', chinese: '来韩国留学了。', chineseEn: 'I came to Korea to study abroad.', scene: '学校', sceneEn: 'School' },
      { korean: '유학 생활이 힘들어요.', chinese: '留学生活很辛苦。', chineseEn: 'Life as an international student is tough.', scene: '学校', sceneEn: 'School' },
    ],
    tags: ['学校', '旅行'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'edu-10', korean: '학원', romanization: 'hagwon', baseForm: '학원', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '补习班/培训学校', chineseEn: 'cram school / training institute', nuance: '韩国文化特色词', nuanceEn: 'Korean Cultural Terms', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '학원에 다니고 있어요.', chinese: '在上补习班。', chineseEn: 'I\'m attending a cram school.', scene: '学校', sceneEn: 'School' },
      { korean: '한국어 학원을 등록했어요.', chinese: '报名了韩语培训班。', chineseEn: 'I signed up for a Korean language course.', scene: '学校', sceneEn: 'School' },
    ],
    tags: ['学校', '社会'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // MEDIA & COMMUNICATION 媒体通讯
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'media-01', korean: '뉴스', romanization: 'nyuseu', baseForm: '뉴스', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '新闻', chineseEn: 'news', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '오늘 뉴스 봤어요?', chinese: '今天看新闻了吗？', chineseEn: 'Did you watch the news today?', scene: '日常', sceneEn: 'Daily' },
      { korean: '한국 뉴스를 이해할 수 있어요.', chinese: '能理解韩国新闻了。', chineseEn: 'I can understand Korean news now.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['媒体', '日常'], emotionTags: [], relatedWords: ['media-02'],
  },
  {
    id: 'media-02', korean: '신문', romanization: 'sinmun', baseForm: '신문', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '报纸', chineseEn: 'Newspaper', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '아침에 신문을 읽어요.', chinese: '早上读报纸。', chineseEn: 'I read the newspaper in the morning.', scene: '日常', sceneEn: 'Daily' },
      { korean: '신문 기사 쓰는 거 어려워요.', chinese: '写新闻报道很难。', chineseEn: 'Writing news reports is hard.', scene: '媒体', sceneEn: 'Media' },
    ],
    tags: ['媒体', '日常'], emotionTags: [], relatedWords: ['media-01'],
  },
  {
    id: 'media-03', korean: '방송', romanization: 'bangsong', baseForm: '방송', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '广播/播放', chineseEn: 'broadcast / airing', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이 프로그램은 매주 방송돼요.', chinese: '这个节目每周播出。', chineseEn: 'This show airs weekly.', scene: '媒体', sceneEn: 'Media' },
      { korean: '생방송 중이에요.', chinese: '正在直播中。', chineseEn: 'It\'s live right now.', scene: '媒体', sceneEn: 'Media' },
    ],
    tags: ['媒体', '韩流'], emotionTags: [], relatedWords: ['media-04'],
  },
  {
    id: 'media-04', korean: '기사', romanization: 'gisa', baseForm: '기사', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '文章/报道', chineseEn: 'article / report', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이 기사 읽어 보세요.', chinese: '请读读这篇报道。', chineseEn: 'Please read this report.', scene: '日常', sceneEn: 'Daily' },
      { korean: '기사에 따르면…', chinese: '据报道…', chineseEn: 'According to the report...', scene: '媒体', sceneEn: 'Media' },
    ],
    tags: ['媒体'], emotionTags: [], relatedWords: ['media-01'],
  },
  {
    id: 'media-05', korean: '광고', romanization: 'gwanggo', baseForm: '광고', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '广告', chineseEn: 'advertisement', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이 광고 너무 웃겨요.', chinese: '这个广告太好笑了。', chineseEn: 'This ad is hilarious.', scene: '日常', sceneEn: 'Daily' },
      { korean: '광고 없이 볼 수 있어요?', chinese: '可以没有广告观看吗？', chineseEn: 'Can I watch without ads?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['媒体', '消费'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'media-06', korean: '인터넷', romanization: 'inteonet', baseForm: '인터넷', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '互联网', chineseEn: 'internet', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '인터넷이 안 돼요.', chinese: '网络不行。', chineseEn: 'The internet isn\'t working.', scene: '日常', sceneEn: 'Daily' },
      { korean: '인터넷으로 주문했어요.', chinese: '通过网络订购了。', chineseEn: 'I ordered it online.', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['科技', '日常'], emotionTags: [], relatedWords: ['tech-01'],
  },
  {
    id: 'media-07', korean: 'SNS', romanization: 'SNS', baseForm: 'SNS', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '社交网络', chineseEn: 'social network', nuance: '口语', nuanceEn: 'Spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: 'SNS에 사진 올렸어요.', chinese: '在社交网络上发了照片。', chineseEn: 'I posted a photo on social media.', scene: '日常', sceneEn: 'Daily' },
      { korean: 'SNS 중독이에요.', chinese: '沉迷社交网络。', chineseEn: 'I\'m addicted to social media.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['科技', '日常'], emotionTags: [], relatedWords: ['media-06'],
  },
  {
    id: 'media-08', korean: '문자', romanization: 'munja', baseForm: '문자', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '短信/文字', chineseEn: 'text message', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '문자 보내 주세요.', chinese: '请发短信。', chineseEn: 'Please send a text.', scene: '日常', sceneEn: 'Daily' },
      { korean: '문자 확인했어요?', chinese: '看短信了吗？', chineseEn: 'Did you see the text?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '科技'], emotionTags: [], relatedWords: ['media-09'],
  },
  {
    id: 'media-09', korean: '연락', romanization: 'yeollak', baseForm: '연락', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '联系/联络', chineseEn: 'contact', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '연락 주세요!', chinese: '请联系我！', chineseEn: 'Please contact me!', scene: '日常', sceneEn: 'Daily' },
      { korean: '연락이 안 돼요.', chinese: '联系不上。', chineseEn: 'I can\'t get in touch.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['media-08'],
  },
  {
    id: 'media-10', korean: '팔로우', romanization: 'pallou', baseForm: '팔로우하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '关注/跟随', chineseEn: 'follow', nuance: '外来词（英语follow），社交媒体用语', nuanceEn: 'Loanword (English \'follow\'), social media term', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '인스타 팔로우했어요!', chinese: '关注ins了！', chineseEn: 'I followed on Instagram!', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '팔로우 수가 10만을 넘었어요.', chinese: '关注者超过了10万。', chineseEn: 'Followers exceeded 100,000.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '科技'], emotionTags: [], relatedWords: ['media-27', 'media-11'],
  },
  {
    id: 'media-11', korean: '구독', romanization: 'gudok', baseForm: '구독하다', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '订阅', chineseEn: 'Subscribe', nuance: '中性，YouTube等平台常用', nuanceEn: 'Neutral, common on platforms like YouTube', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '유튜브 채널 구독해 주세요!', chinese: '请订阅YouTube频道！', chineseEn: 'Please subscribe to the YouTube channel!', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '구독자 수가 늘었어요.', chinese: '订阅者数量增加了。', chineseEn: 'The number of subscribers increased.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '科技'], emotionTags: [], relatedWords: ['media-35', 'media-21'],
  },
  {
    id: 'media-12', korean: '좋아요', romanization: 'joayo', baseForm: '좋아요', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: '点赞/喜欢', chineseEn: 'like', nuance: '名词时指"赞"，也是形容词"好的"的口语形', nuanceEn: 'As a noun means \'like\'; also casual form of \'good\'', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '좋아요 눌러 주세요!', chinese: '请点赞！', chineseEn: 'Please like it!', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '좋아요가 1만 개 넘었어요.', chinese: '点赞超过了一万个。', chineseEn: 'Likes exceeded 10,000.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '日常'], emotionTags: ['开心'], relatedWords: ['media-13'],
  },
  {
    id: 'media-13', korean: '댓글', romanization: 'daetgeul', baseForm: '댓글', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '评论/留言', chineseEn: 'comment', nuance: '网络用语', nuanceEn: 'Internet slang', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '댓글 남겨 주세요.', chinese: '请留下评论。', chineseEn: 'Please leave a comment.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '댓글 읽는 게 재미있어요.', chinese: '读评论很有趣。', chineseEn: 'Reading comments is fun.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '网络用语'], emotionTags: [], relatedWords: ['media-12', 'media-17'],
  },
  {
    id: 'media-14', korean: '공유', romanization: 'gongyu', baseForm: '공유하다', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '分享', chineseEn: 'share', nuance: '中性，线上线下都可用', nuanceEn: 'Neutral, usable online and offline', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이 영상 공유해도 돼요?', chinese: '可以分享这个视频吗？', chineseEn: 'Can I share this video?', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '친구한테 공유했어요.', chinese: '分享给朋友了。', chineseEn: 'I shared it with a friend.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '日常'], emotionTags: [], relatedWords: ['media-17'],
  },
  {
    id: 'media-15', korean: '업로드', romanization: 'eomnoladeu', baseForm: '업로드하다', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '上传', chineseEn: 'Upload', nuance: '外来词（英语upload）', nuanceEn: 'Loanword (English \'upload\')', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '사진을 업로드했어요.', chinese: '上传了照片。', chineseEn: 'I uploaded a photo.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '영상 업로드하는 데 시간이 걸려요.', chinese: '上传视频需要时间。', chineseEn: 'Uploading a video takes time.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '科技'], emotionTags: [], relatedWords: ['media-16'],
  },
  {
    id: 'media-16', korean: '다운로드', romanization: 'daunlodeu', baseForm: '다운로드하다', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '下载', chineseEn: 'Download', nuance: '外来词（英语download）', nuanceEn: 'Loanword (English \'download\')', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '앱을 다운로드하세요.', chinese: '请下载这个应用。', chineseEn: 'Please download this app.', scene: '科技', sceneEn: 'Technology' },
      { korean: '노래를 다운로드해서 들어요.', chinese: '下载了歌曲来听。', chineseEn: 'I downloaded a song to listen to.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['科技', '日常'], emotionTags: [], relatedWords: ['media-15'],
  },
  {
    id: 'media-17', korean: '게시물', romanization: 'gesimul', baseForm: '게시물', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '帖子/发帖内容', chineseEn: 'Post', nuance: '中性，SNS上发布的内容', nuanceEn: 'Neutral, content posted on SNS', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '게시물을 올렸어요.', chinese: '发帖了。', chineseEn: 'I posted.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '게시물 삭제했어요.', chinese: '删除了帖子。', chineseEn: 'I deleted the post.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体'], emotionTags: [], relatedWords: ['media-13', 'media-14'],
  },
  {
    id: 'media-18', korean: '피드', romanization: 'pideu', baseForm: '피드', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '信息流/动态页', chineseEn: 'Feed', nuance: '外来词（英语feed），指SNS主页的内容流', nuanceEn: 'Loanword (English \'feed\'), refers to the content stream on an SNS homepage', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '피드에 올렸어요.', chinese: '发到信息流上了。', chineseEn: 'I posted it to the feed.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '피드 분위기가 너무 예뻐요.', chinese: '主页风格太好看了。', chineseEn: 'The profile page style is so pretty.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '网络用语'], emotionTags: [], relatedWords: ['media-19', 'media-17'],
  },
  {
    id: 'media-19', korean: '스토리', romanization: 'seutori', baseForm: '스토리', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: 'Stories/限时动态', chineseEn: 'Stories', nuance: '外来词，指Instagram等平台24小时限时内容', nuanceEn: 'Loanword, refers to 24-hour temporary content on platforms like Instagram', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '스토리에 올렸어요.', chinese: '发到限时动态上了。', chineseEn: 'I posted it to Stories.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '스토리 봤어요?', chinese: '看到动态了吗？', chineseEn: 'Did you see the story?', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '网络用语'], emotionTags: [], relatedWords: ['media-18'],
  },
  {
    id: 'media-20', korean: '라이브', romanization: 'laibeu', baseForm: '라이브', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '直播', chineseEn: 'Live broadcast', nuance: '外来词（英语live）', nuanceEn: 'Loanword (English \'live\')', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '오늘 라이브 해요?', chinese: '今天直播吗？', chineseEn: 'Are you going live today?', scene: '追星', sceneEn: 'to be a fan / follow idols' },
      { korean: '라이브 방송 보러 왔어요.', chinese: '来看直播了。', chineseEn: 'I came to watch the live stream.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '追星', '韩流'], emotionTags: [], relatedWords: ['media-22'],
  },
  {
    id: 'media-21', korean: '유튜브', romanization: 'yutyubeu', baseForm: '유튜브', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: 'YouTube', nuance: '固有名词音译', nuanceEn: 'Transliteration of a proper noun', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '유튜브에서 봤어요.', chinese: '在YouTube上看到的。', chineseEn: 'I saw it on YouTube.', scene: '日常', sceneEn: 'Daily' },
      { korean: '유튜브 채널 만들었어요.', chinese: '创建了YouTube频道。', chineseEn: 'I created a YouTube channel.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '科技'], emotionTags: [], relatedWords: ['media-11', 'media-34'],
  },
  {
    id: 'media-22', korean: '인스타그램', romanization: 'inseutageulaem', baseForm: '인스타그램', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: 'Instagram/ins', nuance: '常简称 인스타', nuanceEn: 'Often shortened to \'인스타\'', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '인스타그램 계정 있어요?', chinese: '有Instagram账号吗？', chineseEn: 'Do you have an Instagram account?', scene: '社交', sceneEn: 'Social' },
      { korean: '인스타에 사진 올렸어요.', chinese: '在ins上发了照片。', chineseEn: 'I posted a photo on Instagram.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体'], emotionTags: [], relatedWords: ['media-10', 'media-19'],
  },
  {
    id: 'media-23', korean: '틱톡', romanization: 'tikatok', baseForm: '틱톡', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: 'TikTok/抖音', chineseEn: 'TikTok', nuance: '固有名词音译', nuanceEn: 'Transliteration of a proper noun', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '틱톡에서 바이럴됐어요.', chinese: '在TikTok上爆红了。', chineseEn: 'It went viral on TikTok.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '틱톡 영상 찍어 봤어요.', chinese: '拍了TikTok视频。', chineseEn: 'I made a TikTok video.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体'], emotionTags: [], relatedWords: ['media-30'],
  },
  {
    id: 'media-24', korean: '해시태그', romanization: 'haesitaegeu', baseForm: '해시태그', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '话题标签/#标签', chineseEn: 'Hashtag', nuance: '外来词（英语hashtag）', nuanceEn: 'Loanword (English \'hashtag\')', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '해시태그 달았어요.', chinese: '加了话题标签。', chineseEn: 'I added a hashtag.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '인기 해시태그가 뭐예요?', chinese: '热门话题标签是什么？', chineseEn: 'What\'s a trending hashtag?', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '网络用语'], emotionTags: [], relatedWords: ['media-31'],
  },
  {
    id: 'media-25', korean: '알림', romanization: 'allim', baseForm: '알림', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '通知/提醒', chineseEn: 'Notification/Alert', nuance: '中性，手机通知常用', nuanceEn: 'Neutral, common in phone notifications', register: '통용' }],
    examples: [
      { korean: '알림이 왔어요.', chinese: '收到通知了。', chineseEn: 'I got a notification.', scene: '日常', sceneEn: 'Daily' },
      { korean: '알림 설정 켜 주세요.', chinese: '请打开通知设置。', chineseEn: 'Please turn on notification settings.', scene: '科技', sceneEn: 'Technology' },
    ],
    tags: ['科技', '日常'], emotionTags: [], relatedWords: ['media-20'],
  },
  {
    id: 'media-26', korean: '차단', romanization: 'chadam', baseForm: '차단하다', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '拉黑/封锁', chineseEn: 'Block', nuance: '中性，屏蔽某人或某内容', nuanceEn: 'Neutral, to block someone or content', register: '통용' }],
    examples: [
      { korean: '그 계정을 차단했어요.', chinese: '拉黑了那个账号。', chineseEn: 'I blocked that account.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '광고 차단 앱 써요.', chinese: '用广告拦截应用。', chineseEn: 'Use an ad-blocking app.', scene: '科技', sceneEn: 'Technology' },
    ],
    tags: ['社交媒体', '科技'], emotionTags: [], relatedWords: ['media-10'],
  },
  {
    id: 'media-27', korean: '맞팔', romanization: 'matpal', baseForm: '맞팔', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 2,
    meanings: [{ chinese: '互相关注/互粉', chineseEn: 'Mutual follow', nuance: '맞(互相)+팔(follow)，网络造词', nuanceEn: '맞 (mutual) + 팔 (follow), internet coinage', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '맞팔해요!', chinese: '互相关注吧！', chineseEn: 'Let\'s follow each other!', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '맞팔 신청했어요.', chinese: '发了互粉申请。', chineseEn: 'I sent a mutual follow request.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '网络用语'], emotionTags: [], relatedWords: ['media-10'],
  },
  {
    id: 'media-28', korean: '인플루언서', romanization: 'inpeullueonseo', baseForm: '인플루언서', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '网红/意见领袖', chineseEn: 'Influencer', nuance: '外来词（英语influencer）', nuanceEn: 'Loanword (English: influencer)', register: '통용' }],
    examples: [
      { korean: '유명한 인플루언서예요.', chinese: '是有名的网红。', chineseEn: 'They\'re a famous influencer.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '인플루언서 마케팅을 해요.', chinese: '做网红营销。', chineseEn: 'Do influencer marketing.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['社交媒体', '职场'], emotionTags: [], relatedWords: ['media-35'],
  },
  {
    id: 'media-29', korean: '콘텐츠', romanization: 'kontencheu', baseForm: '콘텐츠', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '内容/创作内容', chineseEn: 'Content/Creating content', nuance: '外来词（英语content），指创作的媒体内容', nuanceEn: 'Loanword (English: content), referring to created media content', register: '통용' }],
    examples: [
      { korean: '재미있는 콘텐츠를 만들어요.', chinese: '制作有趣的内容。', chineseEn: 'Create interesting content.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '콘텐츠 기획이 중요해요.', chinese: '内容策划很重要。', chineseEn: 'Content planning is important.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['社交媒体', '职场'], emotionTags: [], relatedWords: ['media-17'],
  },
  {
    id: 'media-30', korean: '바이럴', romanization: 'baireol', baseForm: '바이럴', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '5', frequency: 2,
    meanings: [{ chinese: '病毒式传播的/爆红的', chineseEn: 'Viral', nuance: '外来词（英语viral），指内容迅速扩散', nuanceEn: 'Loanword (English: viral), referring to content spreading quickly', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '이 영상이 바이럴됐어요.', chinese: '这个视频爆红了。', chineseEn: 'This video went viral.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '바이럴 마케팅 전략이에요.', chinese: '这是病毒式营销策略。', chineseEn: 'This is a viral marketing strategy.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['社交媒体', '网络用语'], emotionTags: [], relatedWords: ['media-31'],
  },
  {
    id: 'media-31', korean: '트렌드', romanization: 'teurendeu', baseForm: '트렌드', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '潮流/趋势', chineseEn: 'Trend', nuance: '外来词（英语trend）', nuanceEn: 'Loanword (English: trend)', register: '통용' }],
    examples: [
      { korean: '요즘 트렌드가 뭐예요?', chinese: '最近的潮流是什么？', chineseEn: 'What\'s the latest trend?', scene: '日常', sceneEn: 'Daily' },
      { korean: '트렌드를 빠르게 따라가요.', chinese: '紧跟潮流趋势。', chineseEn: 'Keep up with the trends.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '日常'], emotionTags: [], relatedWords: ['media-24', 'media-30'],
  },
  {
    id: 'media-32', korean: '리뷰', romanization: 'ribyu', baseForm: '리뷰', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '评测/评价', chineseEn: 'Review/Evaluation', nuance: '外来词（英语review）', nuanceEn: 'Loanword (English: review)', register: '통용' }],
    examples: [
      { korean: '리뷰 영상 올렸어요.', chinese: '上传了评测视频。', chineseEn: 'Uploaded a review video.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '리뷰 보고 샀어요.', chinese: '看了评价之后买的。', chineseEn: 'Bought it after reading the reviews.', scene: '购物', sceneEn: 'Shopping' },
    ],
    tags: ['社交媒体', '购物'], emotionTags: [], relatedWords: ['media-33'],
  },
  {
    id: 'media-33', korean: '썸네일', romanization: 'sseomneeil', baseForm: '썸네일', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '封面图/缩略图', chineseEn: 'Thumbnail/Cover image', nuance: '外来词（英语thumbnail），指视频的封面图', nuanceEn: 'Loanword (English: thumbnail), referring to a video\'s cover image', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '썸네일이 눈에 띄어요.', chinese: '封面图很抢眼。', chineseEn: 'The thumbnail is eye-catching.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '썸네일 디자인이 중요해요.', chinese: '封面图设计很重要。', chineseEn: 'Thumbnail design is important.', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体'], emotionTags: [], relatedWords: ['media-21', 'media-29'],
  },
  {
    id: 'media-34', korean: '조회수', romanization: 'johoesu', baseForm: '조회수', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '播放量/浏览量', chineseEn: 'Views/Play count', nuance: '조회(查看)+수(数)，视频平台常用', nuanceEn: '조회 (view) + 수 (count), commonly used on video platforms', register: '통용' }],
    examples: [
      { korean: '조회수가 100만을 넘었어요.', chinese: '播放量超过了100万。', chineseEn: 'The views exceeded 1 million.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '조회수가 왜 안 올라요?', chinese: '为什么播放量不涨？', chineseEn: 'Why aren\'t the views increasing?', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体', '科技'], emotionTags: [], relatedWords: ['media-21'],
  },
  {
    id: 'media-35', korean: '구독자', romanization: 'gudokja', baseForm: '구독자', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '订阅者/粉丝', chineseEn: 'Subscribers/Fans', nuance: '구독(订阅)+자(者)，指频道订阅者', nuanceEn: '구독 (subscribe) + 자 (person), referring to a channel subscriber', register: '통용' }],
    examples: [
      { korean: '구독자가 50만 명이에요.', chinese: '订阅者有50万人。', chineseEn: 'There are 500,000 subscribers.', scene: '社交媒体', sceneEn: 'social media' },
      { korean: '구독자 감사합니다!', chinese: '感谢订阅者们！', chineseEn: 'Thanks to all the subscribers!', scene: '社交媒体', sceneEn: 'social media' },
    ],
    tags: ['社交媒体'], emotionTags: [], relatedWords: ['media-11', 'media-28'],
  },

  // ═══════════════════════════════════════════════════════════════
  // FESTIVALS 韩国节日
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'festival-01', korean: '명절', romanization: 'myeongjeol', baseForm: '명절', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '传统节日', chineseEn: 'traditional holiday', nuance: '指설날、추석等韩国传统节日', nuanceEn: 'Refers to Korean traditional holidays like 설날 and 추석', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '명절에 고향에 가요.', chinese: '过节时回老家。', chineseEn: 'Go back to hometown during holidays.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '명절 연휴 잘 보내세요.', chinese: '节日长假过得愉快。', chineseEn: 'Enjoyed the long holiday.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['节日', '韩国文化'], emotionTags: ['开心'], relatedWords: ['festival-02', 'festival-03'],
  },
  {
    id: 'festival-02', korean: '설날', romanization: 'seollal', baseForm: '설날', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '韩国农历新年', chineseEn: 'Korean Lunar New Year', nuance: '正月初一，最重要的传统节日之一', nuanceEn: 'Lunar New Year\'s Day, one of the most important traditional holidays', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '설날에 세배를 해요.', chinese: '春节时行拜年礼。', chineseEn: 'Do a New Year\'s bow during Seollal.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '설날 잘 보내세요!', chinese: '新年快乐！', chineseEn: 'Happy New Year!', scene: '节日', sceneEn: 'Holiday' },
    ],
    tags: ['节日', '韩国文化', '传统'], emotionTags: ['开心'], relatedWords: ['festival-04', 'festival-07'],
  },
  {
    id: 'festival-03', korean: '추석', romanization: 'chuseok', baseForm: '추석', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '中秋节/韩国感恩节', chineseEn: 'Chuseok/Korean Thanksgiving', nuance: '农历八月十五，秋收感恩节', nuanceEn: 'The 15th day of the 8th lunar month, a harvest thanksgiving holiday', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '추석에 송편을 먹어요.', chinese: '中秋节吃松饼。', chineseEn: 'Eat songpyeon on Chuseok.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '추석 연휴에 여행 가요.', chinese: '中秋长假去旅行。', chineseEn: 'Travel during the Chuseok holiday.', scene: '节日', sceneEn: 'Holiday' },
    ],
    tags: ['节日', '韩国文化', '传统'], emotionTags: ['开心'], relatedWords: ['festival-08', 'festival-09'],
  },
  {
    id: 'festival-04', korean: '세배', romanization: 'sebae', baseForm: '세배', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '拜年礼/新年叩头', chineseEn: 'New Year\'s bow/Deep bow', nuance: '설날时晚辈向长辈行的大礼', nuanceEn: 'The deep bow juniors give to elders during 설날', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '할머니께 세배를 드렸어요.', chinese: '向奶奶行了拜年礼。', chineseEn: 'Did a New Year\'s bow to grandma.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '세배 후에 세뱃돈을 받아요.', chinese: '行礼后收到压岁钱。', chineseEn: 'Received New Year\'s money after bowing.', scene: '节日', sceneEn: 'Holiday' },
    ],
    tags: ['节日', '韩国文化', '传统'], emotionTags: [], relatedWords: ['festival-05', 'festival-02'],
  },
  {
    id: 'festival-05', korean: '세뱃돈', romanization: 'sebaetdon', baseForm: '세뱃돈', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '压岁钱', chineseEn: 'New Year\'s money (pressed money)', nuance: '세배(拜年礼)+돈(钱)，설날长辈给晚辈的压岁钱', nuanceEn: '세배 (New Year\'s bow) + 돈 (money), New Year\'s money given by elders to juniors during 설날', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '세뱃돈 받았어요!', chinese: '收到压岁钱了！', chineseEn: 'Got New Year\'s money!', scene: '节日', sceneEn: 'Holiday' },
      { korean: '세뱃돈을 저금할 거예요.', chinese: '要把压岁钱存起来。', chineseEn: 'Need to save the New Year\'s money.', scene: '节日', sceneEn: 'Holiday' },
    ],
    tags: ['节日', '韩国文化', '传统'], emotionTags: ['开心'], relatedWords: ['festival-04'],
  },
  {
    id: 'festival-06', korean: '한복', romanization: 'hanbok', baseForm: '한복', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '韩服/韩国传统服饰', chineseEn: 'Hanbok / Korean traditional clothing', nuance: '한(韩)+복(服饰)，节日和特殊场合穿着', nuanceEn: '한 (Korean) + 복 (clothing), worn on holidays and special occasions', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '설날에 한복을 입었어요.', chinese: '春节穿了韩服。', chineseEn: 'I wore hanbok during Seollal.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '한복이 정말 예뻐요.', chinese: '韩服真的很漂亮。', chineseEn: 'Hanbok is really beautiful.', scene: '文化体验', sceneEn: 'Cultural experience' },
    ],
    tags: ['节日', '韩国文化', '传统', '服装'], emotionTags: ['开心'], relatedWords: ['festival-02'],
  },
  {
    id: 'festival-07', korean: '떡국', romanization: 'tteokguk', baseForm: '떡국', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '年糕汤', chineseEn: 'Rice cake soup', nuance: '설날必吃的传统食品，吃了就长一岁', nuanceEn: 'Traditional food eaten on 설날; eating it makes you a year older', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '설날에 떡국을 먹어야 나이를 먹어요.', chinese: '春节吃了年糕汤才算长一岁。', chineseEn: 'You only turn a year older after eating tteokguk on Seollal.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '떡국이 따뜻하고 맛있어요.', chinese: '年糕汤又暖又好吃。', chineseEn: 'Tteokguk is warm and delicious.', scene: '饮食', sceneEn: 'Food and drink' },
    ],
    tags: ['节日', '饮食', '传统'], emotionTags: [], relatedWords: ['festival-02'],
  },
  {
    id: 'festival-08', korean: '송편', romanization: 'songpyeon', baseForm: '송편', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '松饼/半月形米糕', chineseEn: 'Songpyeon / Half-moon rice cake', nuance: '추석传统食品，半月形，内有芝麻、豆沙等馅', nuanceEn: 'Traditional 추석 food, half-moon shaped, filled with sesame, red bean paste, etc.', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '추석에 온 가족이 함께 송편을 만들어요.', chinese: '中秋节全家一起做松饼。', chineseEn: 'We make songpyeon together as a family on Chuseok.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '송편을 예쁘게 빚었어요.', chinese: '把松饼做得很漂亮。', chineseEn: 'We made the songpyeon really pretty.', scene: '节日', sceneEn: 'Holiday' },
    ],
    tags: ['节日', '饮食', '传统'], emotionTags: ['开心'], relatedWords: ['festival-03'],
  },
  {
    id: 'festival-09', korean: '차례', romanization: 'chare', baseForm: '차례', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 1,
    meanings: [{ chinese: '祭祀/祭拜祖先', chineseEn: 'Jesa / Ancestral rite', nuance: '명절时供奉祖先的仪式', nuanceEn: 'A ritual to honor ancestors during 명절', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '아침에 차례를 지내요.', chinese: '早晨举行祭祀仪式。', chineseEn: 'We hold the ancestral rite in the morning.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '차례 음식을 준비했어요.', chinese: '准备了祭祀食物。', chineseEn: 'We prepared food for the ancestral rite.', scene: '节日', sceneEn: 'Holiday' },
    ],
    tags: ['节日', '传统', '韩国文化'], emotionTags: [], relatedWords: ['festival-10'],
  },
  {
    id: 'festival-10', korean: '성묘', romanization: 'seongmyo', baseForm: '성묘', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '5', frequency: 1,
    meanings: [{ chinese: '扫墓/上坟', chineseEn: 'Visiting the grave / Seongmyo', nuance: '성묘하다(扫墓)，추석时去祭扫祖先墓地', nuanceEn: '성묘하다 (visit ancestral graves), visiting ancestors\' graves during 추석', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '추석에 성묘하러 갔어요.', chinese: '中秋节去扫墓了。', chineseEn: 'We visited the grave on Chuseok.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '성묘 후에 가족이 함께 식사해요.', chinese: '扫墓后全家一起吃饭。', chineseEn: 'After visiting the grave, the whole family eats together.', scene: '节日', sceneEn: 'Holiday' },
    ],
    tags: ['节日', '传统', '韩国文化'], emotionTags: [], relatedWords: ['festival-09'],
  },
  {
    id: 'festival-11', korean: '어버이날', romanization: 'eobeoinall', baseForm: '어버이날', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '父母节', chineseEn: 'Parents\' Day', nuance: '5月8日，向父母感恩的节日', nuanceEn: 'May 8th, a holiday to show gratitude to parents', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '어버이날에 카네이션을 드렸어요.', chinese: '父母节送了康乃馨。', chineseEn: 'I gave carnations on Parents\' Day.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '어버이날 선물 샀어요.', chinese: '买了父母节礼物。', chineseEn: 'I bought a gift for Parents\' Day.', scene: '节日', sceneEn: 'Holiday' },
    ],
    tags: ['节日', '家庭'], emotionTags: ['感谢'], relatedWords: ['festival-12'],
  },
  {
    id: 'festival-12', korean: '어린이날', romanization: 'eorininal', baseForm: '어린이날', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 2,
    meanings: [{ chinese: '儿童节', chineseEn: 'Children\'s Day', nuance: '5月5日，专为儿童设立的节日', nuanceEn: 'May 5th, a holiday dedicated to children', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '어린이날에 놀이공원에 가요.', chinese: '儿童节去游乐园。', chineseEn: 'We go to the amusement park on Children\'s Day.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '어린이날 선물로 뭐 받고 싶어요?', chinese: '儿童节想收到什么礼物？', chineseEn: 'What gift do you want for Children\'s Day?', scene: '节日', sceneEn: 'Holiday' },
    ],
    tags: ['节日', '家庭'], emotionTags: ['开心'], relatedWords: ['festival-11'],
  },
  {
    id: 'festival-13', korean: '빼빼로데이', romanization: 'ppaeppaerodei', baseForm: '빼빼로데이', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: 'pepero节/巧克力棒节', chineseEn: 'Pepero Day / Chocolate stick day', nuance: '11月11日，互赠빼빼로饼干的商业节日', nuanceEn: 'November 11th, a commercial holiday where people exchange 빼빼로 sticks', register: '口语', registerEn: 'Spoken language' }],
    examples: [
      { korean: '빼빼로데이에 빼빼로 선물했어요.', chinese: 'Pepero节送了饼干礼物。', chineseEn: 'I gave cookie gifts on Pepero Day.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '빼빼로데이가 11월 11일이에요.', chinese: 'Pepero节是11月11日。', chineseEn: 'Pepero Day is November 11th.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['节日', '韩国文化'], emotionTags: ['开心'], relatedWords: ['festival-18'],
  },
  {
    id: 'festival-14', korean: '크리스마스', romanization: 'keuriseumaseu', baseForm: '크리스마스', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: '圣诞节', chineseEn: 'Christmas', nuance: '外来词，韩国是公共假日', nuanceEn: 'Loanword, a public holiday in Korea', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '크리스마스에 뭐 해요?', chinese: '圣诞节做什么？', chineseEn: 'What are you doing for Christmas?', scene: '节日', sceneEn: 'Holiday' },
      { korean: '크리스마스 선물 받았어요.', chinese: '收到圣诞礼物了。', chineseEn: 'I received a Christmas gift.', scene: '节日', sceneEn: 'Holiday' },
    ],
    tags: ['节日', '日常'], emotionTags: ['开心'], relatedWords: ['festival-18', 'festival-20'],
  },
  {
    id: 'festival-15', korean: '생일', romanization: 'saengil', baseForm: '생일', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '1', frequency: 3,
    meanings: [{ chinese: '生日', chineseEn: 'birthday', nuance: '中性，日常高频词', nuanceEn: 'Neutral, high-frequency in daily use', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '생일 축하해요!', chinese: '生日快乐！', chineseEn: 'Happy birthday!', scene: '节日', sceneEn: 'Holiday' },
      { korean: '오늘 제 생일이에요.', chinese: '今天是我的生日。', chineseEn: 'Today is my birthday.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['节日', '日常', '社交'], emotionTags: ['开心'], relatedWords: ['festival-17', 'festival-18'],
  },
  {
    id: 'festival-16', korean: '기념일', romanization: 'ginyeomil', baseForm: '기념일', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '纪念日/周年纪念', chineseEn: 'anniversary', nuance: '中性，情侣、结婚纪念日等', nuanceEn: 'Neutral, used for couples, wedding anniversaries, etc.', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '오늘 결혼 기념일이에요.', chinese: '今天是结婚纪念日。', chineseEn: 'Today is our wedding anniversary.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '기념일에 뭐 할 거예요?', chinese: '纪念日打算做什么？', chineseEn: 'What are you planning to do for the anniversary?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['节日', '日常'], emotionTags: ['开心'], relatedWords: ['festival-15'],
  },
  {
    id: 'festival-17', korean: '축하', romanization: 'chukha', baseForm: '축하하다', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: '祝贺/庆祝', chineseEn: 'congratulations/celebration', nuance: '中性，常用축하해요/축하드려요', nuanceEn: 'Neutral, commonly used as 축하해요/축하드려요', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '합격 축하해요!', chinese: '恭喜通过了！', chineseEn: 'Congratulations on passing!', scene: '日常', sceneEn: 'Daily' },
      { korean: '졸업 축하드려요.', chinese: '恭喜毕业。', chineseEn: 'Congratulations on graduating.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['节日', '社交', '日常'], emotionTags: ['开心'], relatedWords: ['festival-15', 'festival-18'],
  },
  {
    id: 'festival-18', korean: '선물', romanization: 'seonmul', baseForm: '선물', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: '礼物/礼品', chineseEn: 'gift/present', nuance: '中性，日常高频', nuanceEn: 'Neutral, high-frequency in daily use', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '선물 준비했어요.', chinese: '准备了礼物。', chineseEn: 'I prepared a gift.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '어떤 선물이 좋아요?', chinese: '什么礼物好？', chineseEn: 'What would be a good gift?', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['节日', '日常', '社交'], emotionTags: ['开心'], relatedWords: ['festival-17'],
  },
  {
    id: 'festival-19', korean: '파티', romanization: 'pati', baseForm: '파티', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: '派对/聚会', chineseEn: 'party/gathering', nuance: '外来词（英语party）', nuanceEn: 'Loanword (English: party)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '생일 파티에 초대받았어요.', chinese: '被邀请参加生日派对了。', chineseEn: 'I was invited to a birthday party.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '파티 준비가 다 됐어요.', chinese: '派对准备好了。', chineseEn: 'The party is ready.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['节日', '社交'], emotionTags: ['开心'], relatedWords: ['festival-20'],
  },
  {
    id: 'festival-20', korean: '케이크', romanization: 'keikeu', baseForm: '케이크', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '2', frequency: 3,
    meanings: [{ chinese: '蛋糕', chineseEn: 'cake', nuance: '外来词（英语cake）', nuanceEn: 'Loanword (English: cake)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '생일 케이크 불었어요?', chinese: '吹生日蜡烛了吗？', chineseEn: 'Did you blow out the birthday candles?', scene: '节日', sceneEn: 'Holiday' },
      { korean: '케이크 어떤 맛이에요?', chinese: '蛋糕是什么口味的？', chineseEn: 'What flavor is the cake?', scene: '饮食', sceneEn: 'Food and drink' },
    ],
    tags: ['节日', '饮食'], emotionTags: ['开心'], relatedWords: ['festival-19', 'festival-15'],
  },
  {
    id: 'festival-21', korean: '불꽃놀이', romanization: 'bulkkotnori', baseForm: '불꽃놀이', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '烟花/放烟火', chineseEn: 'fireworks', nuance: '불꽃(烟花)+놀이(游戏/观赏)，节庆活动', nuanceEn: '불꽃 (fireworks) + 놀이 (play/viewing), festive event', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한강에서 불꽃놀이 봤어요.', chinese: '在汉江看了烟花。', chineseEn: 'I watched fireworks at the Han River.', scene: '节日', sceneEn: 'Holiday' },
      { korean: '불꽃놀이가 너무 아름다워요.', chinese: '烟花太美了。', chineseEn: 'The fireworks were so beautiful.', scene: '节日', sceneEn: 'Holiday' },
    ],
    tags: ['节日', '旅行'], emotionTags: ['感动', '开心'], relatedWords: ['festival-22'],
  },
  {
    id: 'festival-22', korean: '연휴', romanization: 'yeonhyu', baseForm: '연휴', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 3,
    meanings: [{ chinese: '长假/连续假期', chineseEn: 'long holiday', nuance: '연속(连续)+휴일(假日)，指连续多天的节假日', nuanceEn: '연속 (consecutive) + 휴일 (holiday), refers to a multi-day holiday period', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '추석 연휴가 얼마나 돼요?', chinese: '中秋长假有几天？', chineseEn: 'How many days is the Chuseok holiday?', scene: '节日', sceneEn: 'Holiday' },
      { korean: '연휴에 여행 가려고 해요.', chinese: '打算长假去旅行。', chineseEn: 'I\'m planning to travel during the long holiday.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['节日', '日常'], emotionTags: ['开心'], relatedWords: ['festival-01'],
  },

  // ═══════════════════════════════════════════════════════════════
  // INTERMEDIATE VERBS 中级动词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'iverb-01', korean: '설명하다', romanization: 'seolmyeonghada', baseForm: '설명하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '说明/解释', chineseEn: 'explanation', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '다시 한번 설명해 주세요.', chinese: '请再说明一遍。', chineseEn: 'Please explain it again.', scene: '学校', sceneEn: 'School' },
      { korean: '설명하기 어려워요.', chinese: '很难解释。', chineseEn: 'It\'s hard to explain.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['学校', '职场', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-02', korean: '결정하다', romanization: 'gyeoljeonghada', baseForm: '결정하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '决定', chineseEn: 'Decision', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '아직 결정 못 했어요.', chinese: '还没决定。', chineseEn: 'I haven\'t decided yet.', scene: '日常', sceneEn: 'Daily' },
      { korean: '빨리 결정해야 해요.', chinese: '得快点决定。', chineseEn: 'I need to decide quickly.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: ['iverb-03'],
  },
  {
    id: 'iverb-03', korean: '선택하다', romanization: 'seontaekhada', baseForm: '선택하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '选择', chineseEn: 'choice', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '뭘 선택할 거예요?', chinese: '会选哪个？', chineseEn: 'Which one will you choose?', scene: '日常', sceneEn: 'Daily' },
      { korean: '어려운 선택이에요.', chinese: '是个困难的选择。', chineseEn: 'It\'s a difficult choice.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: ['iverb-02'],
  },
  {
    id: 'iverb-04', korean: '비교하다', romanization: 'bigyohada', baseForm: '비교하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [{ chinese: '比较', chineseEn: 'Comparison', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '가격을 비교해 보세요.', chinese: '请比较一下价格。', chineseEn: 'Please compare the prices.', scene: '购物', sceneEn: 'Shopping' },
      { korean: '비교할 수 없어요.', chinese: '无法比较。', chineseEn: 'They can\'t be compared.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['购物', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-05', korean: '준비하다', romanization: 'junbihada', baseForm: '준비하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '准备', chineseEn: 'preparation', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '시험 준비하고 있어요.', chinese: '正在准备考试。', chineseEn: 'I\'m preparing for the exam.', scene: '学校', sceneEn: 'School' },
      { korean: '준비 다 됐어요!', chinese: '准备好了！', chineseEn: 'Ready!', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '学校', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-06', korean: '노력하다', romanization: 'noryeokhada', baseForm: '노력하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '努力', chineseEn: 'effort', nuance: '正面', nuanceEn: 'positive', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '열심히 노력하고 있어요.', chinese: '正在努力中。', chineseEn: 'I\'m working hard.', scene: '日常', sceneEn: 'Daily' },
      { korean: '노력하면 꼭 성공할 거예요.', chinese: '努力就一定能成功。', chineseEn: 'If you work hard, you\'ll surely succeed.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '学校', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-07', korean: '경험하다', romanization: 'gyeongheomhada', baseForm: '경험하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 3,
    meanings: [{ chinese: '体验/经历', chineseEn: 'experience', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국 문화를 경험하고 싶어요.', chinese: '想体验韩国文化。', chineseEn: 'I want to experience Korean culture.', scene: '旅行', sceneEn: 'Travel' },
      { korean: '처음 경험해 봤어요.', chinese: '第一次体验了。', chineseEn: 'I experienced it for the first time.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '旅行'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-08', korean: '이해하다', romanization: 'ihaehada', baseForm: '이해하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '理解/明白', chineseEn: 'understand', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이해가 안 돼요.', chinese: '不理解。', chineseEn: 'I don\'t understand.', scene: '日常', sceneEn: 'Daily' },
      { korean: '이제 이해했어요.', chinese: '现在理解了。', chineseEn: 'Now I understand.', scene: '学校', sceneEn: 'School' },
    ],
    tags: ['日常', '学校'], emotionTags: [], relatedWords: ['iverb-09'],
  },
  {
    id: 'iverb-09', korean: '기억하다', romanization: 'gieokhada', baseForm: '기억하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '记住/记得', chineseEn: 'remember', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '기억해 주세요.', chinese: '请记住。', chineseEn: 'Please remember.', scene: '日常', sceneEn: 'Daily' },
      { korean: '이름을 기억 못 해요.', chinese: '记不住名字。', chineseEn: 'I can\'t remember the name.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['日常', '学校'], emotionTags: [], relatedWords: ['iverb-08'],
  },
  {
    id: 'iverb-10', korean: '포기하다', romanization: 'pogihada', baseForm: '포기하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [{ chinese: '放弃', chineseEn: 'Give up', nuance: '负面', nuanceEn: 'negative', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '포기하지 마세요!', chinese: '不要放弃！', chineseEn: 'Don\'t give up!', scene: '日常', sceneEn: 'Daily' },
      { korean: '꿈을 포기했어요.', chinese: '放弃了梦想。', chineseEn: 'I gave up on my dream.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '表白情感'], emotionTags: ['伤心'], relatedWords: [],
  },
  {
    id: 'iverb-11', korean: '약속하다', romanization: 'yaksokhada', baseForm: '약속하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '约定/承诺', chineseEn: 'promise', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '약속할게요.', chinese: '我保证。', chineseEn: 'I promise.', scene: '日常', sceneEn: 'Daily' },
      { korean: '내일 3시에 약속했어요.', chinese: '约好了明天三点。', chineseEn: 'We agreed to meet at 3 tomorrow.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['iverb-12'],
  },
  {
    id: 'iverb-12', korean: '취소하다', romanization: 'chwisohada', baseForm: '취소하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [{ chinese: '取消', chineseEn: 'cancel', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '예약을 취소하고 싶어요.', chinese: '想取消预约。', chineseEn: 'I want to cancel the reservation.', scene: '日常', sceneEn: 'Daily' },
      { korean: '약속 취소됐어요.', chinese: '约定取消了。', chineseEn: 'The appointment was canceled.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['iverb-11'],
  },
  {
    id: 'iverb-13', korean: '신청하다', romanization: 'sincheonghada', baseForm: '신청하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [{ chinese: '申请', chineseEn: 'Application', nuance: '正式', nuanceEn: 'formal', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '비자 신청했어요.', chinese: '申请了签证。', chineseEn: 'I applied for a visa.', scene: '行政', sceneEn: 'administrative' },
      { korean: '온라인으로 신청할 수 있어요.', chinese: '可以在线申请。', chineseEn: 'You can apply online.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['行政', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-14', korean: '확인하다', romanization: 'hwaginhada', baseForm: '확인하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 3,
    meanings: [{ chinese: '确认', chineseEn: 'Confirm', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '다시 확인해 주세요.', chinese: '请再确认一下。', chineseEn: 'Please double-check.', scene: '职场', sceneEn: 'workplace' },
      { korean: '메일 확인했어요.', chinese: '确认了邮件。', chineseEn: 'I confirmed the email.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['职场', '日常'], emotionTags: [], relatedWords: ['iverb-15'],
  },
  {
    id: 'iverb-15', korean: '검색하다', romanization: 'geomsaekhada', baseForm: '검색하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [{ chinese: '搜索', chineseEn: 'search', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '인터넷으로 검색해 보세요.', chinese: '请上网搜索看看。', chineseEn: 'Please search online.', scene: '日常', sceneEn: 'Daily' },
      { korean: '검색 결과가 없어요.', chinese: '没有搜索结果。', chineseEn: 'No search results found.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['科技', '日常'], emotionTags: [], relatedWords: ['iverb-14'],
  },
  {
    id: 'iverb-16', korean: '발견하다', romanization: 'balgyeonhada', baseForm: '발견하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [{ chinese: '发现', chineseEn: 'to discover', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '새로운 사실을 발견했어요.', chinese: '发现了新的事实。', chineseEn: 'I discovered a new fact.', scene: '学术', sceneEn: 'academic' },
      { korean: '길을 잃었다가 발견했어요.', chinese: '迷路后找到了。', chineseEn: 'I found it after getting lost.', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['日常', '学术'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-17', korean: '포함하다', romanization: 'pohamhada', baseForm: '포함하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [{ chinese: '包含/包括', chineseEn: 'include/contain', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '세금이 포함됐어요.', chinese: '含税了。', chineseEn: 'It includes tax.', scene: '购物', sceneEn: 'Shopping' },
      { korean: '식사가 포함돼 있어요?', chinese: '包含餐食吗？', chineseEn: 'Does it include meals?', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['购物', '旅行'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-18', korean: '표현하다', romanization: 'pyohyeonhada', baseForm: '표현하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '3', frequency: 2,
    meanings: [{ chinese: '表达/表现', chineseEn: 'express/expression', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국어로 표현하기 어려워요.', chinese: '用韩语表达很难。', chineseEn: 'It\'s hard to express in Korean.', scene: '学校', sceneEn: 'School' },
      { korean: '감정을 잘 표현하세요.', chinese: '请好好表达感情。', chineseEn: 'Please express your feelings well.', scene: '表白情感', sceneEn: 'expressing emotions' },
    ],
    tags: ['学校', '表白情感'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-19', korean: '발전하다', romanization: 'baljeonhada', baseForm: '발전하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [{ chinese: '发展', chineseEn: 'Development', nuance: '正面', nuanceEn: 'positive', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국어 실력이 많이 발전했어요.', chinese: '韩语能力进步了很多。', chineseEn: 'My Korean skills have improved a lot.', scene: '学校', sceneEn: 'School' },
      { korean: '기술이 빠르게 발전하고 있어요.', chinese: '技术在快速发展。', chineseEn: 'Technology is advancing rapidly.', scene: '科技', sceneEn: 'Technology' },
    ],
    tags: ['学校', '科技'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iverb-20', korean: '유지하다', romanization: 'yujihada', baseForm: '유지하다', partOfSpeech: '动词', partOfSpeechEn: 'Verb',
    level: '4', frequency: 2,
    meanings: [{ chinese: '维持/保持', chineseEn: 'maintain/keep', nuance: '正式', nuanceEn: 'formal', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '건강을 유지하세요.', chinese: '请保持健康。', chineseEn: 'Please stay healthy.', scene: '健康', sceneEn: 'health' },
      { korean: '관계를 유지하기 어려워요.', chinese: '维持关系很难。', chineseEn: 'It\'s hard to maintain a relationship.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['健康', '社交'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // INTERMEDIATE ADJECTIVES 中级形容词
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'iadj-01', korean: '편리하다', romanization: 'pyeollihada', baseForm: '편리하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 3,
    meanings: [{ chinese: '方便/便利', chineseEn: 'convenient', nuance: '正面', nuanceEn: 'positive', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '교통이 정말 편리해요.', chinese: '交通真的很方便。', chineseEn: 'Transportation is really convenient.', scene: '出行', sceneEn: 'Travel' },
      { korean: '이 앱은 사용하기 편리해요.', chinese: '这个应用使用起来很便利。', chineseEn: 'This app is convenient to use.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '出行'], emotionTags: ['开心'], relatedWords: ['iadj-02'],
  },
  {
    id: 'iadj-02', korean: '불편하다', romanization: 'bulpyeonhada', baseForm: '불편하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 2,
    meanings: [{ chinese: '不方便/不舒服', chineseEn: 'inconvenient/uncomfortable', nuance: '负面', nuanceEn: 'negative', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '여기 좀 불편해요.', chinese: '这里有点不舒服。', chineseEn: 'It\'s a bit uncomfortable here.', scene: '日常', sceneEn: 'Daily' },
      { korean: '불편한 점이 있으면 말씀하세요.', chinese: '有不便之处请说。', chineseEn: 'Please let me know if there\'s any inconvenience.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['日常', '职场'], emotionTags: ['不满'], relatedWords: ['iadj-01'],
  },
  {
    id: 'iadj-03', korean: '복잡하다', romanization: 'bokjaphada', baseForm: '복잡하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 3,
    meanings: [{ chinese: '复杂/拥挤', chineseEn: 'complex/crowded', nuance: '偏负面', nuanceEn: 'somewhat negative', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '길이 너무 복잡해요.', chinese: '路太复杂（拥挤）了。', chineseEn: 'The road is too complex (crowded).', scene: '出行', sceneEn: 'Travel' },
      { korean: '상황이 복잡해졌어요.', chinese: '情况变复杂了。', chineseEn: 'The situation has become complicated.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '出行'], emotionTags: ['紧张'], relatedWords: ['iadj-04'],
  },
  {
    id: 'iadj-04', korean: '간단하다', romanization: 'gandanhada', baseForm: '간단하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 3,
    meanings: [{ chinese: '简单', chineseEn: 'simple', nuance: '正面', nuanceEn: 'positive', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '설명이 간단하네요.', chinese: '说明很简单。', chineseEn: 'The explanation is very simple.', scene: '学校', sceneEn: 'School' },
      { korean: '간단하게 말해 주세요.', chinese: '请简单说一下。', chineseEn: 'Please say it simply.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '学校'], emotionTags: [], relatedWords: ['iadj-03'],
  },
  {
    id: 'iadj-05', korean: '특별하다', romanization: 'teukbyeolhada', baseForm: '특별하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 3,
    meanings: [{ chinese: '特别', chineseEn: 'special', nuance: '正面', nuanceEn: 'positive', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '오늘은 특별한 날이에요.', chinese: '今天是特别的日子。', chineseEn: 'Today is a special day.', scene: '日常', sceneEn: 'Daily' },
      { korean: '특별한 추억을 만들었어요.', chinese: '制造了特别的回忆。', chineseEn: 'We made special memories.', scene: '表白情感', sceneEn: 'expressing emotions' },
    ],
    tags: ['日常', '表白情感'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'iadj-06', korean: '소중하다', romanization: 'sojunghada', baseForm: '소중하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '4', frequency: 3,
    meanings: [{ chinese: '珍贵/宝贵', chineseEn: 'precious/valuable', nuance: '正面/感性', nuanceEn: 'Positive/emotional', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '소중한 사람이에요.', chinese: '是珍贵的人。', chineseEn: 'They are a precious person.', scene: '表白情感', sceneEn: 'expressing emotions' },
      { korean: '시간을 소중하게 쓰세요.', chinese: '请珍惜时间。', chineseEn: 'Please cherish your time.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['表白情感', '日常'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'iadj-07', korean: '당연하다', romanization: 'dangyeonhada', baseForm: '당연하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 3,
    meanings: [{ chinese: '当然/理所当然', chineseEn: 'of course/naturally', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '당연한 결과예요.', chinese: '是当然的结果。', chineseEn: 'It\'s a natural result.', scene: '日常', sceneEn: 'Daily' },
      { korean: '당연히 해야 하는 일이에요.', chinese: '是理所当然该做的事。', chineseEn: 'It\'s something that should be done as a matter of course.', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['日常', '职场'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iadj-08', korean: '적당하다', romanization: 'jeokdanghada', baseForm: '적당하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '4', frequency: 2,
    meanings: [{ chinese: '适当/合适', chineseEn: 'appropriate/suitable', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '적당한 가격이에요.', chinese: '价格合适。', chineseEn: 'The price is reasonable.', scene: '购物', sceneEn: 'Shopping' },
      { korean: '운동은 적당히 하세요.', chinese: '请适当运动。', chineseEn: 'Please exercise moderately.', scene: '健康', sceneEn: 'health' },
    ],
    tags: ['购物', '健康'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iadj-09', korean: '익숙하다', romanization: 'iksukhada', baseForm: '익숙하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '4', frequency: 3,
    meanings: [{ chinese: '熟悉/习惯', chineseEn: 'familiar/used to', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '이제 한국 생활에 익숙해졌어요.', chinese: '现在习惯了韩国生活。', chineseEn: 'I\'m used to life in Korea now.', scene: '日常', sceneEn: 'Daily' },
      { korean: '익숙한 얼굴이네요.', chinese: '是熟悉的面孔呢。', chineseEn: 'That\'s a familiar face.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: ['iadj-10'],
  },
  {
    id: 'iadj-10', korean: '낯설다', romanization: 'natseolda', baseForm: '낯설다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '4', frequency: 2,
    meanings: [{ chinese: '陌生', chineseEn: 'Unfamiliar', nuance: '中性偏负面', nuanceEn: 'neutral to slightly negative', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '아직 모든 게 낯설어요.', chinese: '一切还很陌生。', chineseEn: 'Everything is still unfamiliar.', scene: '日常', sceneEn: 'Daily' },
      { korean: '낯선 곳에서 길을 잃었어요.', chinese: '在陌生的地方迷路了。', chineseEn: 'I got lost in an unfamiliar place.', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['旅行', '日常'], emotionTags: ['紧张'], relatedWords: ['iadj-09'],
  },
  {
    id: 'iadj-11', korean: '안전하다', romanization: 'anjeonhada', baseForm: '안전하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 2,
    meanings: [{ chinese: '安全', chineseEn: 'safe', nuance: '正面', nuanceEn: 'positive', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국은 밤에도 안전해요.', chinese: '韩国晚上也很安全。', chineseEn: 'Korea is safe at night too.', scene: '日常', sceneEn: 'Daily' },
      { korean: '안전한 여행 되세요.', chinese: '祝旅行安全。', chineseEn: 'Have a safe trip.', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['日常', '旅行'], emotionTags: ['安心'], relatedWords: ['iadj-12'],
  },
  {
    id: 'iadj-12', korean: '위험하다', romanization: 'wiheomhada', baseForm: '위험하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 2,
    meanings: [{ chinese: '危险', chineseEn: 'Dangerous', nuance: '负面', nuanceEn: 'negative', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '여기 위험해요!', chinese: '这里危险！', chineseEn: 'It\'s dangerous here!', scene: '日常', sceneEn: 'Daily' },
      { korean: '위험한 행동 하지 마세요.', chinese: '请不要做危险的行为。', chineseEn: 'Please don\'t do anything dangerous.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '旅行'], emotionTags: ['紧张'], relatedWords: ['iadj-11'],
  },
  {
    id: 'iadj-13', korean: '자연스럽다', romanization: 'jayeonseureopda', baseForm: '자연스럽다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '4', frequency: 2,
    meanings: [{ chinese: '自然', chineseEn: 'natural', nuance: '正面', nuanceEn: 'positive', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국어가 자연스러워요.', chinese: '韩语很自然。', chineseEn: 'Your Korean sounds very natural.', scene: '学校', sceneEn: 'School' },
      { korean: '자연스럽게 행동하세요.', chinese: '请自然地行动。', chineseEn: 'Please act naturally.', scene: '社交', sceneEn: 'Social' },
    ],
    tags: ['社交', '学校'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iadj-14', korean: '비슷하다', romanization: 'biseuthada', baseForm: '비슷하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '3', frequency: 3,
    meanings: [{ chinese: '相似/差不多', chineseEn: 'similar/about the same', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '발음이 비슷해요.', chinese: '发音很相似。', chineseEn: 'The pronunciation is very similar.', scene: '学校', sceneEn: 'School' },
      { korean: '둘이 정말 비슷하게 생겼어요.', chinese: '两个人长得很像。', chineseEn: 'The two look very similar.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '学校'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'iadj-15', korean: '다양하다', romanization: 'dayanghada', baseForm: '다양하다', partOfSpeech: '形容词', partOfSpeechEn: 'Adjective.',
    level: '4', frequency: 3,
    meanings: [{ chinese: '多样/各种', chineseEn: 'diverse/various', nuance: '正面', nuanceEn: 'positive', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '다양한 음식을 먹어 봤어요.', chinese: '尝了各种各样的食物。', chineseEn: 'I tried all kinds of food.', scene: '餐厅', sceneEn: 'Restaurant' },
      { korean: '다양한 경험을 하고 싶어요.', chinese: '想有多样的体验。', chineseEn: 'I want to have diverse experiences.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '餐厅'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // HEALTH & BODY 健康身体
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'body-01', korean: '건강', romanization: 'geongang', baseForm: '건강', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '健康', chineseEn: 'health', nuance: '正面', nuanceEn: 'positive', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '건강이 제일 중요해요.', chinese: '健康最重要。', chineseEn: 'Health is the most important thing.', scene: '日常', sceneEn: 'Daily' },
      { korean: '건강 조심하세요.', chinese: '请注意健康。', chineseEn: 'Please take care of your health.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['健康', '日常'], emotionTags: [], relatedWords: ['body-02'],
  },
  {
    id: 'body-02', korean: '스트레스', romanization: 'seuteureseu', baseForm: '스트레스', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '压力', chineseEn: 'pressure', nuance: '外来词（英语stress）', nuanceEn: 'Loanword (English: stress)', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '스트레스 받아요.', chinese: '有压力。', chineseEn: 'I\'m stressed.', scene: '日常', sceneEn: 'Daily' },
      { korean: '스트레스 풀러 가요.', chinese: '去解压吧。', chineseEn: 'Let\'s relieve stress.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['健康', '日常', '职场'], emotionTags: ['不满'], relatedWords: ['body-01'],
  },
  {
    id: 'body-03', korean: '체력', romanization: 'cheryeok', baseForm: '체력', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '4', frequency: 2,
    meanings: [{ chinese: '体力', chineseEn: 'Physical strength', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '체력이 딸려요.', chinese: '体力跟不上。', chineseEn: 'My stamina can\'t keep up.', scene: '日常', sceneEn: 'Daily' },
      { korean: '체력을 키워야 해요.', chinese: '得增强体力。', chineseEn: 'I need to build up my stamina.', scene: '健康', sceneEn: 'health' },
    ],
    tags: ['健康', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'body-04', korean: '다이어트', romanization: 'daieoteu', baseForm: '다이어트', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '减肥/节食', chineseEn: 'weight loss/dieting', nuance: '口语高频', nuanceEn: 'high-frequency in spoken language', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '다이어트 중이에요.', chinese: '在减肥中。', chineseEn: 'I\'m on a diet.', scene: '日常', sceneEn: 'Daily' },
      { korean: '다이어트 식단 추천해 주세요.', chinese: '请推荐减肥餐。', chineseEn: 'Please recommend diet meals.', scene: '健康', sceneEn: 'health' },
    ],
    tags: ['健康', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'body-05', korean: '피부', romanization: 'pibu', baseForm: '피부', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '皮肤', chineseEn: 'skin', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '피부가 좋아졌어요.', chinese: '皮肤变好了。', chineseEn: 'My skin has improved.', scene: '韩流', sceneEn: 'Hallyu' },
      { korean: '피부 관리 어떻게 해요?', chinese: '怎么护肤？', chineseEn: 'How do you take care of your skin?', scene: '韩流', sceneEn: 'Hallyu' },
    ],
    tags: ['健康', '韩流'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // NATURE & ENVIRONMENT 自然环境
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'nature-01', korean: '자연', romanization: 'jayeon', baseForm: '자연', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '自然', chineseEn: 'natural', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '자연을 보호해야 해요.', chinese: '应该保护自然。', chineseEn: 'We should protect nature.', scene: '社会', sceneEn: 'Society' },
      { korean: '자연 경관이 정말 아름다워요.', chinese: '自然景观真的很美。', chineseEn: 'The natural scenery is really beautiful.', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['自然', '旅行'], emotionTags: [], relatedWords: ['nature-02'],
  },
  {
    id: 'nature-02', korean: '환경', romanization: 'hwangyeong', baseForm: '환경', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '环境', chineseEn: 'Environment', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '환경을 지켜야 해요.', chinese: '应该保护环境。', chineseEn: 'We should protect the environment.', scene: '社会', sceneEn: 'Society' },
      { korean: '근무 환경이 어때요?', chinese: '工作环境怎么样？', chineseEn: 'How\'s the work environment?', scene: '职场', sceneEn: 'workplace' },
    ],
    tags: ['自然', '社会', '职场'], emotionTags: [], relatedWords: ['nature-01'],
  },
  {
    id: 'nature-03', korean: '공기', romanization: 'gonggi', baseForm: '공기', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '空气', chineseEn: 'Air', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '공기가 좋아요.', chinese: '空气很好。', chineseEn: 'The air is good.', scene: '日常', sceneEn: 'Daily' },
      { korean: '공기가 나빠졌어요.', chinese: '空气变差了。', chineseEn: 'The air quality has gotten worse.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['自然', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'nature-04', korean: '하늘', romanization: 'haneul', baseForm: '하늘', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '天空', chineseEn: 'sky', nuance: '中性/诗意', nuanceEn: 'Neutral/poetic', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '하늘이 정말 예뻐요.', chinese: '天空真美。', chineseEn: 'The sky is really beautiful.', scene: '日常', sceneEn: 'Daily' },
      { korean: '가을 하늘이 제일 좋아요.', chinese: '秋天的天空最美。', chineseEn: 'The autumn sky is the most beautiful.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['自然', '日常'], emotionTags: ['开心'], relatedWords: [],
  },
  {
    id: 'nature-05', korean: '바다', romanization: 'bada', baseForm: '바다', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '大海', chineseEn: 'big sea', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '바다 구경하러 가요.', chinese: '去看海吧。', chineseEn: 'Let\'s go see the sea.', scene: '旅行', sceneEn: 'Travel' },
      { korean: '부산은 바다가 예뻐요.', chinese: '釜山的海很美。', chineseEn: 'Busan\'s sea is beautiful.', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['自然', '旅行'], emotionTags: ['开心'], relatedWords: ['nature-06'],
  },
  {
    id: 'nature-06', korean: '산', romanization: 'san', baseForm: '산', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '山', chineseEn: 'mountain', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '주말에 산에 갈까요?', chinese: '周末去爬山吗？', chineseEn: 'Are you going hiking this weekend?', scene: '日常', sceneEn: 'Daily' },
      { korean: '한국은 산이 많아요.', chinese: '韩国山很多。', chineseEn: 'Korea has many mountains.', scene: '旅行', sceneEn: 'Travel' },
    ],
    tags: ['自然', '旅行', '日常'], emotionTags: [], relatedWords: ['nature-05'],
  },
  {
    id: 'nature-07', korean: '쓰레기', romanization: 'sseuregi', baseForm: '쓰레기', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '垃圾', chineseEn: 'trash', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '쓰레기를 버리지 마세요.', chinese: '请不要扔垃圾。', chineseEn: 'Please don\'t litter.', scene: '日常', sceneEn: 'Daily' },
      { korean: '분리수거 잘해야 해요.', chinese: '要做好垃圾分类。', chineseEn: 'We should sort our trash properly.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '自然'], emotionTags: [], relatedWords: [],
  },

  // ═══════════════════════════════════════════════════════════════
  // ARTS & ENTERTAINMENT 文化艺术
  // ═══════════════════════════════════════════════════════════════
  {
    id: 'arts-01', korean: '전시회', romanization: 'jeonsihoe', baseForm: '전시회', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '展览会', chineseEn: 'exhibition', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '주말에 전시회 가요.', chinese: '周末去看展览。', chineseEn: 'Let\'s go see an exhibition this weekend.', scene: '日常', sceneEn: 'Daily' },
      { korean: '미술 전시회 정말 좋았어요.', chinese: '美术展真的很棒。', chineseEn: 'The art exhibition was really amazing.', scene: '文化', sceneEn: 'culture' },
    ],
    tags: ['文化', '日常'], emotionTags: [], relatedWords: ['arts-02'],
  },
  {
    id: 'arts-02', korean: '공연', romanization: 'gongyeon', baseForm: '공연', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '演出/公演', chineseEn: 'performance/show', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '오늘 저녁에 공연 봐요.', chinese: '今晚看演出。', chineseEn: 'Let\'s watch a show tonight.', scene: '文化', sceneEn: 'culture' },
      { korean: '이 공연 정말 유명해요.', chinese: '这个演出很有名。', chineseEn: 'This performance is very famous.', scene: '媒体', sceneEn: 'Media' },
    ],
    tags: ['文化', '韩流'], emotionTags: [], relatedWords: ['arts-01'],
  },
  {
    id: 'arts-03', korean: '연습', romanization: 'yeonseup', baseForm: '연습', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '练习', chineseEn: 'practice', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '매일 피아노 연습해요.', chinese: '每天练习钢琴。', chineseEn: 'Practice the piano every day.', scene: '日常', sceneEn: 'Daily' },
      { korean: '연습하면 늘 거예요.', chinese: '练习就会进步的。', chineseEn: 'You\'ll improve with practice.', scene: '学校', sceneEn: 'School' },
    ],
    tags: ['日常', '学校'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'arts-04', korean: '그림', romanization: 'geurim', baseForm: '그림', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '画/图画', chineseEn: 'painting/drawing', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '그림 그리는 걸 좋아해요.', chinese: '喜欢画画。', chineseEn: 'I like drawing.', scene: '日常', sceneEn: 'Daily' },
      { korean: '이 그림 누가 그렸어요?', chinese: '这幅画是谁画的？', chineseEn: 'Who painted this picture?', scene: '文化', sceneEn: 'culture' },
    ],
    tags: ['文化', '日常'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'arts-05', korean: '취미', romanization: 'chwimi', baseForm: '취미', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 3,
    meanings: [{ chinese: '爱好', chineseEn: 'hobby', nuance: '中性', nuanceEn: 'Neutral', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '취미가 뭐예요?', chinese: '爱好是什么？', chineseEn: 'What\'s your hobby?', scene: '社交', sceneEn: 'Social' },
      { korean: '새로운 취미를 찾았어요.', chinese: '找到了新的爱好。', chineseEn: 'I found a new hobby.', scene: '日常', sceneEn: 'Daily' },
    ],
    tags: ['日常', '社交'], emotionTags: [], relatedWords: [],
  },
  {
    id: 'arts-06', korean: '전통', romanization: 'jeontong', baseForm: '전통', partOfSpeech: '名词', partOfSpeechEn: 'Noun',
    level: '3', frequency: 2,
    meanings: [{ chinese: '传统', chineseEn: 'tradition', nuance: '正面', nuanceEn: 'positive', register: '通用', registerEn: 'General' }],
    examples: [
      { korean: '한국 전통 문화를 배우고 있어요.', chinese: '在学习韩国传统文化。', chineseEn: 'I\'m learning about traditional Korean culture.', scene: '文化', sceneEn: 'culture' },
      { korean: '전통을 지키는 것이 중요해요.', chinese: '保持传统很重要。', chineseEn: 'It\'s important to preserve traditions.', scene: '社会', sceneEn: 'Society' },
    ],
    tags: ['文化', '韩流'], emotionTags: [], relatedWords: [],
  },
];
