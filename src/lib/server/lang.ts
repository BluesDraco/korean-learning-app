import { headers } from 'next/headers';
import type { Lang } from '@/lib/i18n';

// 服务端读取当前请求语言：proxy 在 rewrite /en/* 时注入 x-tori-lang header。
// 仅用于 SSR metadata / <html lang> / 初始 lang 注入，客户端不引用。
export async function getServerLang(): Promise<Lang> {
  const h = await headers();
  return h.get('x-tori-lang') === 'en' ? 'en' : 'zh';
}
