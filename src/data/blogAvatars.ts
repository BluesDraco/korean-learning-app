import type { BlogAvatar } from '@/types';

// 用户社媒身份可选的预制动物形象画廊。
// imageUrl 指向 public/images/blog-avatars/ 下的图（后补），空则前端用 emoji 占位。
export const BLOG_AVATARS: BlogAvatar[] = [
  { id: 'rabbit', name: '토끼',   emoji: '🐰', imageUrl: '/images/blog-avatars/rabbit.png' },
  { id: 'bear',   name: '곰',     emoji: '🐻', imageUrl: '/images/blog-avatars/bear.png' },
  { id: 'cat',    name: '고양이', emoji: '🐱', imageUrl: '/images/blog-avatars/cat.png' },
  { id: 'dog',    name: '강아지', emoji: '🐶', imageUrl: '/images/blog-avatars/dog.png' },
  { id: 'fox',    name: '여우',   emoji: '🦊', imageUrl: '/images/blog-avatars/fox.png' },
  { id: 'koala',  name: '코알라', emoji: '🐨', imageUrl: '/images/blog-avatars/koala.png' },
  { id: 'panda',  name: '판다',   emoji: '🐼', imageUrl: '/images/blog-avatars/panda.png' },
  { id: 'tiger',  name: '호랑이', emoji: '🐯', imageUrl: '/images/blog-avatars/tiger.png' },
  { id: 'hamster',name: '햄스터', emoji: '🐹', imageUrl: '/images/blog-avatars/hamster.png' },
  { id: 'penguin',name: '펭귄',   emoji: '🐧', imageUrl: '/images/blog-avatars/penguin.png' },
  { id: 'chick',  name: '병아리', emoji: '🐥', imageUrl: '/images/blog-avatars/chick.png' },
  { id: 'frog',   name: '개구리', emoji: '🐸', imageUrl: '/images/blog-avatars/frog.png' },
];

export const BLOG_AVATAR_BY_ID: Record<string, BlogAvatar> = Object.fromEntries(
  BLOG_AVATARS.map((a) => [a.id, a]),
);

export function getBlogAvatar(id: string): BlogAvatar | undefined {
  return BLOG_AVATAR_BY_ID[id];
}
