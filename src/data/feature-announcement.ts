// 平台功能升级弹窗配置 —— 独立于管理后台发的普通公告（announcements 表）
// 修改这里需要重新部署代码。ID 更新会让所有看过的用户重新弹一次。

export interface FeatureItem {
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
  eyebrow: '开服公告 · 2026.07.20',
  title: '兔莉的韩语日记 1.0 正式开放啦！',
  items: [
    {
      emoji: '📓',
      title: '兔莉日记正片上线',
      desc: '跟着兔莉搬进动物城留学，每天一集剧情，边看故事边学当天的单词、语法和地道表达。',
      color: '#ff7fa8',
    },
    {
      emoji: '🏙️',
      title: '动物城各场所全开放',
      desc: '图书馆读分级文章、火鹤教室学四十音·语法·备考、自习室练说写听打、电台听韩语播客、广场刷动物朋友圈，想去哪学去哪。',
      color: '#6b7fd4',
    },
    {
      emoji: '💻',
      title: '电脑 / 平板 / 手机三端适配',
      desc: '全站 UI 统一升级，无论用哪个设备打开，排版和体验都跟着屏幕自动调整。',
      color: '#7ec8a0',
    },
    {
      emoji: '👆',
      title: '全站点词查词 + 生词本',
      desc: '任何韩语句子点一下就能查词、听发音，一键加进生词本，随时回来复习。',
      color: '#e0a458',
    },
    {
      emoji: '🎉',
      title: '感谢一路陪伴',
      desc: '正式版内容还在持续加料，新功能会陆续和大家见面。想第一时间蹲到更新可加微信 13817498530。',
      color: '#c98bd6',
    },
  ] as FeatureItem[],
};
