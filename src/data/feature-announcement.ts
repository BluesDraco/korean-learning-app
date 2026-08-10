// 平台功能升级弹窗配置 —— 独立于管理后台发的普通公告（announcements 表）
// 修改这里需要重新部署代码。ID 更新会让所有看过的用户重新弹一次。

export interface FeatureItem {
  [k: string]: unknown;
  emoji: string;
  title: string;
  desc: string;
  /** 可选：点击跳转目标。留空则渲染成不可点击的纯信息卡片 */
  link?: string;
  color: string;
}

export const FEATURE_ANNOUNCEMENT = {
  /** true = 对所有用户启用 · false = 全局隐藏（连没看过的也不再弹） */
  enabled: true,
  /** localStorage key 版本；改这里所有用户会重新弹一次 */
  version: '20260720-v1',
  eyebrow: '开服公告 · 2026.07.20', eyebrowEn: 'Launch Announcement · 2026.07.20',
  title: '兔莉的韩语日记 1.0 正式开放啦！', titleEn: 'Tori\'s Korean Diary 1.0 is now officially open!',
  items: [
    {
      emoji: '📓',
      title: '兔莉日记正片上线', titleEn: 'Tori\'s Diary Main Episodes Are Live',
      desc: '跟着兔莉搬进动物城留学，每天一集剧情，边看故事边学当天的单词、语法和地道表达。', descEn: 'Move into Animal City with Tori to study abroad—one episode a day, learning vocabulary, grammar, and natural expressions through the story.',
      color: '#ff7fa8',
    },
    {
      emoji: '🏙️',
      title: '动物城各场所全开放', titleEn: 'All Animal City Locations Now Open',
      desc: '图书馆读分级文章、火鹤教室学四十音·语法·备考、自习室练说写听打、电台听韩语播客、广场刷动物朋友圈，想去哪学去哪。', descEn: 'Read leveled articles at the library, learn Hangul, grammar, and test prep in the Flamingo Classroom, practice speaking, writing, listening, and typing in the study room, listen to Korean podcasts on the radio, and browse animal friends\' posts in the square—study wherever you want.',
      color: '#6b7fd4',
    },
    {
      emoji: '💻',
      title: '电脑 / 平板 / 手机三端适配', titleEn: 'Optimized for Desktop / Tablet / Mobile',
      desc: '全站 UI 统一升级，无论用哪个设备打开，排版和体验都跟着屏幕自动调整。', descEn: 'The entire site\'s UI has been upgraded, so no matter which device you use, the layout and experience automatically adjust to your screen.',
      color: '#7ec8a0',
    },
    {
      emoji: '👆',
      title: '全站点词查词 + 生词本', titleEn: 'Tap-to-Look-Up + Vocabulary Book Sitewide',
      desc: '任何韩语句子点一下就能查词、听发音，一键加进生词本，随时回来复习。', descEn: 'Tap any Korean sentence to look up words and hear pronunciation, add them to your vocabulary book with one tap, and review anytime.',
      color: '#e0a458',
    },
    {
      emoji: '🎉',
      title: '感谢一路陪伴', titleEn: 'Thank You for Being with Us',
      desc: '正式版内容还在持续加料，新功能会陆续和大家见面。想第一时间蹲到更新可加微信 13817498530。', descEn: 'The full version is still getting new content, and more features will roll out. To catch updates first, add us on WeChat: 13817498530.',
      color: '#c98bd6',
    },
  ] as FeatureItem[],
};
