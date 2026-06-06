import Image from 'next/image';

const iconMap: Record<string, string> = {
  // Headers
  'header-daily': '/images/tori-icons/headers/今日.webp',
  'header-mine': '/images/tori-icons/headers/我的.webp',
  'header-tools': '/images/tori-icons/headers/工具.webp',
  'header-learning': '/images/tori-icons/headers/学习.webp',
  'header-explore': '/images/tori-icons/headers/探索.webp',

  // Functional
  'task': '/images/tori-icons/functional/任务.webp',
  'vip': '/images/tori-icons/functional/会员.webp',
  'mail': '/images/tori-icons/functional/信件.webp',
  'speaking': '/images/tori-icons/functional/口语.webp',
  'speaking2': '/images/tori-icons/functional/口语2.webp',
  'speaking3': '/images/tori-icons/functional/口语3.webp',
  'listening': '/images/tori-icons/functional/听力.webp',
  'singing': '/images/tori-icons/functional/听歌.webp',
  'dictionary': '/images/tori-icons/functional/字典.webp',
  'learning': '/images/tori-icons/functional/学习.webp',
  'learning2': '/images/tori-icons/functional/学习2.webp',
  'learning3': '/images/tori-icons/functional/学习3.webp',
  'learning4': '/images/tori-icons/functional/学习4.webp',
  'tools': '/images/tori-icons/functional/工具.webp',
  'achievement': '/images/tori-icons/functional/成就.webp',
  'phone': '/images/tori-icons/functional/手机.webp',
  'checkin': '/images/tori-icons/functional/打卡.webp',
  'bookmark': '/images/tori-icons/functional/收藏.webp',
  'file': '/images/tori-icons/functional/文件.webp',
  'file2': '/images/tori-icons/functional/文件2.webp',
  'research': '/images/tori-icons/functional/研究.webp',
  'continue': '/images/tori-icons/functional/继续.webp',
  'settings': '/images/tori-icons/functional/设置.webp',
  'progress': '/images/tori-icons/functional/进步.webp',
  'flashcard': '/images/tori-icons/functional/闪卡.webp',
};

interface Props {
  name: keyof typeof iconMap;
  size?: number;
  className?: string;
}

export function ToriIcon({ name, size = 24, className = '' }: Props) {
  const src = iconMap[name];
  if (!src) return null;

  return (
    <Image
      src={src}
      alt=""
      width={size}
      height={size}
      className={`shrink-0 select-none pointer-events-none ${className}`}
      unoptimized
      style={{ objectFit: 'contain' }}
    />
  );
}

export { iconMap };
