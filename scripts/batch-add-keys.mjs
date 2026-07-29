// Batch add missing i18n keys to zh.ts using inferred + DeepSeek translations
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, '..');

// Read .env.local for DeepSeek key
const envContent = fs.readFileSync(path.resolve(projectRoot, '.env.local'), 'utf-8');
const keyMatch = envContent.match(/DEEPSEEK_LOOKUP_KEY=(\S+)/);
const DEEPSEEK_KEY = keyMatch ? keyMatch[1] : null;
if (!DEEPSEEK_KEY) { console.error('No DeepSeek key'); process.exit(1); }

const missingKeys = fs.readFileSync(path.resolve(__dirname, 'missing-keys.txt'), 'utf-8')
  .split('\n').filter(Boolean);
console.log(`Processing ${missingKeys.length} missing keys...`);

// All translations end up here
const trans = new Map();

// Fill from built-in patterns
const PATTERNS = {
  a11y: { breadcrumb: '面包屑导航', play_audio: '播放发音' },
  achcard: { card_brand: '韩语学习日记', card_stats: '复习 {reviews} 词 · 学习 {days} 天 · AI对话 {chats} 次', copied: '已复制', copyLink: '复制链接', goStudy: '去学习', modalLine1: '兔莉为你准备了一张纪念卡片', modalLine2: '可以保存分享给朋友！', msgLabel: '写一句话（选填，最多20字）', msgPlaceholder: '比如：兔莉，我们一起加油！', noneDesc: '继续学习，兔莉会在这里等你！', noneTitle: '还没有新的里程碑', pickColor: '选择配色', save: '保存图片', statChats: '对话 {n} 次', statDays: '学习 {n} 天', statReviews: '复习 {n} 词', title: '成就卡片', viewCard: '查看我的卡片', 'color.pink': '樱花粉', 'color.purple': '薰衣草紫', 'color.mint': '薄荷绿', 'ms.phonetics_complete.title': '韩文字母毕业', 'ms.phonetics_complete.subtitle': '兔莉和你一起学完了发音', 'ms.streak_7.title': '和兔莉一起坚持了7天', 'ms.streak_7.subtitle': '一周的陪伴刚刚开始', 'ms.streak_30.title': '和兔莉一起坚持了30天', 'ms.streak_30.subtitle': '一个月的成长看得见', 'ms.streak_100.title': '和兔莉一起坚持了100天', 'ms.streak_100.subtitle': '百天的坚持是奇迹', 'ms.reviews_100.title': '复习突破100词', 'ms.reviews_100.subtitle': '每次复习都在变强', 'ms.reviews_500.title': '复习突破500词', 'ms.reviews_500.subtitle': '脑海里都是韩语了', 'ms.first_picture_book.title': '第一本绘本完成', 'ms.first_picture_book.subtitle': '和兔莉读完第一个故事', 'ms.ai_chat_10.title': 'AI对话10轮达成', 'ms.ai_chat_10.subtitle': '勇敢开口就是进步', 'ms.topik_perfect.title': 'TOPIK首次满分', 'ms.topik_perfect.subtitle': '满分是对努力最好的回报', 'ms.days_100.title': '学习满100天', 'ms.days_100.subtitle': '和兔莉相伴走过百天' },
  achieve: { current_level: '当前等级', day_unit: '天', desktop_note: '每一枚徽章<br />都是和兔莉一起走过的路<br />继续加油呀', filter_all: '全部', go_login: '去登录', keep_going: '继续加油 →', login_prompt: '登录后查看你和兔莉的成就', mobile_note: '和兔莉的每一个里程碑，都值得被记住', my_achievements: '我的成就', next_unlock: '就快解锁：{title}', next_unlock_detail: '还差 {diff}，就能和兔莉一起解锁。', rarity_collection: '🏆 稀有度收藏', rarity_common: '普通', rarity_rare: '稀有', rarity_epic: '史诗', rarity_legendary: '传说', streak_label: '连续学习', subtitle: '和兔莉一起走过的路', unlocked_count: '已解锁 {n}/{total}', unlocked_suffix: '达成' },
  audio: { ai_failed: 'AI 回复失败，请重试', browser_unsupported: '此浏览器不支持录音', browser_unsupported_detail: '当前环境不支持录音功能，请使用最新版 Chrome 或 Edge 浏览器', http_required: '语音功能需要 HTTPS 或 localhost 环境', init_failed: '音频系统初始化失败，请刷新页面后重试', mic_access_error: '无法访问麦克风（{name}）', mic_busy: '麦克风被其他应用占用，请关闭后重试', mic_init_failed: '麦克风初始化失败，请检查权限或换用 Chrome', mic_interrupted: '麦克风打开被中断，请重试', mic_not_found: '未检测到麦克风设备', mic_permission_denied: '麦克风权限未开启：请到系统设置中允许麦克风权限后重试', no_audio_track: '录音未捕获到音频轨道', no_sound: '没有录到声音，请重新说一次。', not_clear: '没听清，请再说一遍', process_failed: '音频处理失败，请重试。', quota_exhausted: '今日语音额度已用完，请明天再试。', recognition_failed: '未能识别到语音，请重新说一次。', recognition_network_error: '语音识别失败，请检查网络后重试。', recording_start_failed: '启动录音失败（{name}）', too_short: '说话时间太短了', unsupported_format: '不支持的音频格式（{name}）' },
  blog: { aria_bookmark: '收藏', aria_comments: '查看评论', aria_like: '点赞', aria_menu: '菜单', aria_pause: '暂停', aria_play: '播放', aria_share: '分享', aria_switch_feed: '切换动态', bookmark_title: '🔖 我的收藏', composer_delete_image: '删除图片', composer_hint: '用韩语自由记录今天的故事吧。', composer_image_alt: '图片 {n}', composer_placeholder: '想聊点什么呢？', composer_textarea_placeholder: '今天过得怎么样…', date_format: '{month}月{day}日', desktop_back: '← 返回', desktop_brand: '兔莉的博客', desktop_home: '🏠 首页', desktop_my_learning: '我的学习', desktop_stat_bookmarks: '收藏', desktop_stat_likes: '获赞', empty_bookmark_sub: '帖子详情页点 🔖 就能收藏', empty_bookmark_title: '还没有收藏', empty_feed_sub: '这个分类还没有帖子，换个话题看看吧', empty_feed_title: '暂无动态', empty_following_btn: '去发现朋友', empty_following_sub: '关注动物朋友后，他们的帖子会出现在这里', empty_following_title: '还没有关注的朋友', empty_notice_sub: '点赞和评论会出现在这里', empty_notice_title: '暂无通知', empty_profile: '还没有档案', feed_header: '兔莉的博客', follow: '关注', following: '已关注', friend_rec_title: '✨ 推荐好友', friends_count: '{n} 位朋友', friends_title: '🐾 兔莉和朋友们', func_bookmark: '收藏', func_home: '动态', func_notice: '通知', func_profile: '我的', gallery_next: '下一张', gallery_prev: '上一张', hero_eyebrow: '兔莉的动物城', hero_sub: '五种毛色，一座城 · 今天也有新故事', hero_title: '闪闪发光的动物城', hot_empty: '今天还没有热门帖子', hot_title: '🏆 今日热门 TOP3', level_0: '新芽', level_1: '新手作者', level_2: '资深作者', level_3: '人气作者', level_4: '动物城之星', like_attribution: '<b>{name}</b> 等 <b>{count}人</b> 赞过', menu_hot: '🏆 今日热门', menu_title: '🐰 兔莉的菜单', nickname_default: '我', notice_title: '🔔 通知', onboarding_nickname_hint: '昵称（最多20字）', profile_day: '小镇探索第 {day} 天', radio_schedule_at: '每天 {time}', reader_bookmarked: '已收藏 ✓', reader_comments_count: '💬 评论 {n}', reader_followed: '关注成功 ✓', reader_ko_only: '只看韩语', reader_link_copied: '链接已复制 ✓', reader_my_comment: '我的评论', reader_new_reply: '收到新回复 💬', reader_read_aloud: '朗读', reader_read_time: '{min}分钟阅读', reader_save: '收藏', reader_saved: '已收藏', reader_send: '发送', reader_send_failed: '发送失败，请重试', reader_show_zh: '显示中文翻译', reader_unbookmarked: '已取消收藏', reader_unfollowed: '已取消关注', reader_vocab: '📚 本文生词', reader_word_count: '{n} 词', refresh: '刷新', stat_bookmarks: '收藏', stat_likes: '获赞', stat_posts: '帖子', status_online: '{n} 位小伙伴在线', status_pending: '未审核', tab_following: '关注', tab_recommend: '推荐', time_day_ago: '{n}天前', time_hr_ago: '{n}小时前', time_just_now: '刚刚', time_min_ago: '{n}分钟前', time_yesterday: '昨天', view_all_comments: '查看全部 {n} 条评论', xp_to_next: '距下一级', status_day: 'DAY {day}', author_filter_posts: '{name} 的帖子', blocked_hint: '请修改内容后再试。', blocked_title: '无法发布', ok_button: '确定' },
  carrot: { greeting_day1: '亲爱的，第一天来动物城吗？兔莉在等你呢！', greeting_return: '亲爱的，又见面了！今天想学点什么呢？', greeting_comeback: '亲爱的，好几天没见了！兔莉好想你呀！', greeting_bookmark: '亲爱的，你已经收藏了不少单词呢！继续加油！', greeting_week2: '亲爱的，第二周了！你已经很棒了！', greeting_support: '亲爱的，我在这儿呢。有什么想聊的？', greeting_default: '亲爱的，今天也要加油学韩语！', greeting_gone_days: '亲爱的，{n}天没见了！兔莉好想你呀！', greeting_week1_sentences: '亲爱的，第一周了！来练几个句子吧！' },
  companion: { default_opening: '你好！' },
  daily: { diary_alt: '兔莉的韩语日记 · 用有趣的内容学韩语', diary_empty: '从第一篇日记开始，慢慢把韩语写进日常。', diary_label: '韩语日记', greeting_fallback: '你好', membership_expiry: '会员将于 {days} 天后到期', renew_cta: '续费', renewal_prompt: '续费不中断，学习进度永久保留。', renewal_subtitle: '续费不中断学习', streak_congrats: '你已经连续学习 {streak} 天啦，화이팅!' },
  db: { default_book_name: '我的收藏', default_book_desc: '收藏的单词', favorites_name: '我的收藏', favorites_desc: '收藏的单词' },
  dict: { conj_adnominal_future: '定语形(将来)', conj_adnominal_past: '定语形(过去)', conj_adnominal_present: '定语形(现在)', conj_banmal: '半语', conj_connective: '接续形', conj_dict_form: '词典原形', conj_formal: '正式体', conj_future: '将来时', conj_honorific: '敬语体', conj_imperative: '命令/请诱', conj_nominalization: '名词化', conj_past: '过去时', conj_presumptive: '推测原形', conj_unknown: '未知变形', not_found: '该词不在数据库中', pos_adverb: '副词', pos_noun: '名词', pos_particle: '助词', pos_verb: '动词', pos_verb_adj: '动词/形容词', translate_failed: '[翻译失败] {text}' },
  email: { bind_email_body: '请输入以下验证码完成邮箱绑定，10 分钟内有效。', bind_email_subject: 'Tori · 绑定邮箱', not_you: '如果这不是你本人操作，忽略这封邮件即可。', reset_password_body: '请输入以下验证码重置密码，10 分钟内有效。', reset_password_not_you: '如果这不是你本人操作，忽略这封邮件即可。', reset_password_subject: 'Tori · 重置密码', verification_body: '请输入以下验证码完成验证，10 分钟内有效。', verification_subject: 'Tori · 你的验证码' },
  fctheme: { desc_dark: '深色护眼，薄荷点缀', desc_paper: '书卷温暖，橙棕强调', desc_pure: '全白留白，淡蓝例句', desc_warm: '暖白底色，青绿例句' },
  font: { desc_kai: '楷体中文 + 圆润韩文，手账手写感', desc_sans: '系统黑体，极简无衬线，干净利落', desc_serif: '衬线中文 + 韩文，温润典雅书卷气', size_l: '大', size_m: '中', size_s: '小', size_xl: '特大' },
  grammar: { all: '全部', card_hero_part_lesson: '第{n}课', card_part_lesson: '第{n}课', card_part_lesson_title: '{title}', cat_문형: '句型', cat_사동피동: '使动被动', cat_시제: '时态', cat_어미: '语尾', cat_연결: '连接', cat_인용: '引用', cat_조사: '助词', cat_존대: '尊待', category_nav: '语法分类', chapter_correct_sofar: '正确 {n}/{total}', chapter_covered: '已覆盖', chapter_score: '得分 {pct}%', chapter_title: '{title}', cheat_examples: '例句', cheat_in_context: '语境中', cheat_key_points: '要点', cheat_pattern: '句型', cheat_vocabulary: '词汇', cheat_watch_out: '注意', clear_search: '清除', cn_expression: '中文说法', cn_order: '中文顺序', compare_note: '对比说明', core: '核心', correct: '正确', def_conjugation: '接续', def_meaning: '释义', def_structure: '结构', def_usage: '用法', different: '不一样', favorites: '收藏', item_count: '{n} 个', ko_expression: '韩语说法', ko_order: '韩语顺序', lesson_count: '门课程', level_beginner: '初级', level_intermediate: '中级', level_advanced: '高级', library_stats: '共 {n} 条语法', load_error: '加载失败，请检查网络', login_required_toast: '请先登录，进度才能保存到你的账号', login_to_save: '登录后学习进度才会保存', mistake_right: '正确用法', mistake_wrong: '错误用法', nav_aria: '语法学习导航', library_nav_aria: '语法库导航', p1c_formal: '正式体', p1c_formal_sub: '합니다/습니다/입니까', p1c_object: '宾语', p1c_object_sub: '을/를', p1c_place: '地点', p1c_place_sub: '에서/에', p1c_polite: '礼貌体', p1c_polite_sub: '아요/어요/해요', p1c_tense: '时态', p1c_tense_sub: '过去/现在/将来', p1c_topic: '主题', p1c_topic_sub: '은/는', p1c_word_order: '语序', p1c_word_order_sub: 'SOV 主语-宾语-谓语', part_and_title: '第{part}部分 · {title}', part_coming_soon: '第 {n} 部分即将开放，敬请期待！', part_lesson_count: '{n} 课', part_lessons: '{n} 课', part_lessons_done: '已学 {done}/{total} 课', part_practice: '练习', pattern_count: '个语法点', pattern_label: '句式', practice_intro_note: '练习说明', progress: '学习进度', quick_ref: '本课速查', quiz_progress: '完成 {n}/{total} 题', recommended: '推荐', review_btn: '去复习', review_count: '{n} 个待复习', review_needed: '待复习', sample_sentences: '先看两个例子', save_error: '保存进度失败，请检查网络', save_progress_error: '本课进度保存失败，请检查网络后重试', search_empty: '换个关键词试试', search_no_results: '没有找到相关语法', search_placeholder: '搜索课程...', section_compare: '对比辨析', section_example: '教材例句', section_note: '注意事项', section_rule: '接续规则', section_usage: '使用场景', section_vocab: '词汇补充', sidebar_all_done: '全部完成！', sidebar_all_done_sub: '你已经学完了所有部分', sidebar_all_parts: '全部 {n} 部分', sidebar_coming_soon: '即将上线', sidebar_continue_btn: '继续学习', sidebar_continue_title: '继续学习', sidebar_lesson_count: '共 {n} 课', sidebar_progress_desc: '已掌握 {mastered}/{total} 个语法点', sidebar_progress_title: '学习进度', stat_difficult: '易错', stat_learning: '学习中', stat_mastered: '已掌握', step_purpose: '这一步在干什么', today_duration: '今日学习时长', today_learn: '今日目标', today_pattern: '今日语法', today_start: '开始学习', token_object: '宾语', token_place: '地点', token_subject: '主语', token_time: '时间', token_verb: '谓语', verb_end: '动词跑到最后面去了', what_learn: '本课要点', when_use: '什么时候用', why_rules: '为什么需要这些规则', word_order: '语序', word_order_note: '韩语不是按中文逐字翻译的，遇到长句先找动词——动词在句末，前面的内容都是补充说明。', wrap_up: '用综合练习把本章知识点串起来', wrong: '错误' },
  invite: { reward_days: '邀请奖励 {days} 天' },
  koreanDiff: { char_mismatch: '"{got}" 应为 "{expected}"', extra: '多余音节', extra_said: '多说了', missed: '漏读', missing: '缺失', phoneme_consonant: '辅音', phoneme_final: '收音', phoneme_none: '无', phoneme_vowel: '元音', should_be: '应为' },
  lang: { choose_prompt: '选择语言 · Choose your language' },
  membership: { tier_monthly: '月度会员', tier_yearly: '年度会员', tier_lifetime: '永久会员' },
  moderation: { pending_review: '内容待人工审核', non_compliant: '内容不合规' },
  review: { cloze_section: '在句子里', prev_word: '上一个词', read_better_way: '朗读地道说法', read_example: '朗读例句', read_your_sentence: '朗读你的句子', replay: '重新播放' },
  score: { fallback_comment: '写得不错！继续挑战吧！' },
  settings: { account_binding: '账号绑定', avatar_hint: 'JPG / PNG / WEBP，上传后自动压缩到 256×256', avatar_updated: '头像已更新', bind_email: '绑定邮箱', bind_email_placeholder: '输入邮箱地址', bind_hint: '绑定手机或邮箱，账号更安全，还能用来找回密码。', bind_phone: '手机号', binding: '绑定中...', change_avatar: '更换头像', change_bind: '更换', confirm_bind: '确认绑定', current_account: '当前账号', email: '邮箱', flashcard_theme: '闪卡', go_bind: '去绑定', go_login: '去登录', login_required: '请先登录后使用设置', logout_confirm: '确定退出登录？', motion_desc: '弹跳、呼吸等动画效果', not_bound: '未绑定', not_logged_in: '未登录', phone: '手机号', resend_code: '重新发送', select_image: '请选择图片文件', sound_desc: '轻量操作反馈音效', speed_fast: '快', speed_normal: '正常', speed_slow: '慢', speed_very_fast: '极快', speed_very_slow: '极慢', uploading: '上传中...', verify: '去验证', verify_code: '输入验证码' },
  srs: { level_1: '见过但不记得意思', level_2: '犹豫后勉强想起', level_3: '想起来了，有点慢', level_4: '比较顺利，偶有卡顿' },
  time: { just_now: '刚刚', min_ago: '{n}分钟前', hr_ago: '{n}小时前', day_ago: '{n}天前', date_format: '{year}年{month}月{day}日' },
  topik: { below_level: '未达 {level} 级', mine_daily_quota: '按你设定的每日题量', mine_sprint: '考前冲刺', mine_speedup: '考前提速', mine_steady: '稳步推进', mine_first_practice: '完成 1 次练习', mine_streak_3: '连续 3 天练习', mine_streak_7: '连续 7 天练习', mine_streak_30: '连续 30 天练习', mine_exam_1: '完成 1 套试卷', mine_exam_5: '完成 5 套试卷', mine_exam_10: '完成 10 套试卷', mine_mastery_5: '掌握 5 种题型', mine_mastery_15: '掌握 15 种题型', mine_exam_today: '今日完成 {n} 题' },
  vocab: { cat_hallyu: '韩流场景', cat_life: '生活场景', cat_life_adv: '生活进阶', cat_social: '社交表达', cat_travel: '旅行韩国', cat_work: '职场学习', cat_work_adv: '职场进阶', filter_all: '全部', load_failed_refresh: '加载失败，请刷新页面', pos_word: '单词', review_pool_title: '待复习词库', source_reading: '阅读文章词汇', level_name_: 'TOPIK {level}级' },
  phonetics: { stroke_format: '{label}{n}笔 {hint}', stroke_vowel_right: ' = 元音在右（ㅏ类）' },
  wordtap: { adding: '加入中…', addToBook: '加入单词本', baseForm: '原型', exEmpty: '该义项暂无可靠例句', exError: '生成失败，请重试', genExample: '为此义项生成例句', goLogin: '去登录', needLogin: '登录后才能查词', noBooks: '暂无单词本，请先创建', notFound: '未找到该词释义', queryFail: '查询失败，AI 可能繁忙或网络异常', querying: '查询中...', retry: '重试', savedToBook: '已加入单词本', selectBook: '选择单词本' },
  auth: { not_initialized: '未初始化', back_to_login: '返回登录', err_reset_fail: '重置失败，请重试', forgot_password: '忘记密码？', new_password: '新密码', reset_heading: '重置密码', reset_lead_code: '请输入发送到 {email} 的验证码', reset_lead_email: '输入注册邮箱，我们会发送验证码', reset_sub: '重置密码', reset_submit: '确认重置', reset_submitting: '重置中...', reset_title: '重置密码' },
};

// Populate from patterns
for (const [ns, items] of Object.entries(PATTERNS)) {
  for (const [suffix, zh] of Object.entries(items)) {
    trans.set(`${ns}.${suffix}`, zh);
  }
}

const inferred = missingKeys.filter(k => trans.has(k));
const needAI = missingKeys.filter(k => !trans.has(k));
console.log(`Inferred: ${inferred.length}, Need AI: ${needAI.length}`);

// Use DeepSeek for remaining keys
if (needAI.length > 0) {
  for (let i = 0; i < needAI.length; i += 50) {
    const batch = needAI.slice(i, i + 50);
    const prompt = `Translate these i18n key names to natural Simplified Chinese. These are UI labels for a Korean learning app.

Format: key=Chinese_value (one per line, concise)

${batch.join('\n')}

Return ONLY "key=value" lines.`;

    console.log(`AI batch ${Math.floor(i/50)+1}/${Math.ceil(needAI.length/50)}: ${batch.length} keys...`);
    try {
      const resp = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${DEEPSEEK_KEY}` },
        body: JSON.stringify({ model: 'deepseek-chat', messages: [{ role: 'user', content: prompt }], max_tokens: 3000, temperature: 0.3 }),
      });
      const data = await resp.json();
      if (!data.choices) { console.error(`  API error: ${JSON.stringify(data)}`); continue; }
      const text = data.choices[0].message.content;
      for (const line of text.split('\n')) {
        const eq = line.indexOf('=');
        if (eq > 0) {
          const k = line.slice(0, eq).trim();
          const v = line.slice(eq + 1).trim();
          if (k && v && needAI.includes(k)) {
            trans.set(k, v);
          }
        }
      }
    } catch (e) {
      console.error(`  Batch failed: ${e.message}`);
    }
  }
}

// Any remaining keys use the key name as fallback
for (const k of needAI) {
  if (!trans.has(k)) {
    console.warn(`  No translation for: ${k}`);
    trans.set(k, k);
  }
}

// Read zh.ts and insert
const zhPath = path.resolve(projectRoot, 'src/locales/zh.ts');
let zhContent = fs.readFileSync(zhPath, 'utf-8');
const closingIdx = zhContent.lastIndexOf('\n};\n');
if (closingIdx < 0) { console.error('Cannot find closing };'); process.exit(1); }

// Build insertion block, grouped by namespace
const nsMap = new Map();
for (const k of missingKeys) {
  const ns = k.split('.')[0];
  if (!nsMap.has(ns)) nsMap.set(ns, []);
  nsMap.get(ns).push(k);
}

let block = '';
for (const [ns, keys] of [...nsMap.entries()].sort()) {
  block += `\n  // ── ${ns} ──\n`;
  for (const k of keys) {
    const zh = (trans.get(k) || k).replace(/\\/g, '\\\\').replace(/'/g, "\\'");
    block += `  '${k}': '${zh}',\n`;
  }
}

zhContent = zhContent.slice(0, closingIdx) + block + '\n};\n';
fs.writeFileSync(zhPath, zhContent, 'utf-8');
console.log(`\nDone. zh.ts: ${zhContent.split('\n').length} lines, ${missingKeys.length} keys added.`);
console.log(`Translated: ${inferred.length} inferred + ${missingKeys.length - inferred.length - needAI.filter(k => !trans.has(k) || trans.get(k) === k).length} AI = ${[...new Set(missingKeys)].filter(k => trans.get(k) !== k).length} total`);
