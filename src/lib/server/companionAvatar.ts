import { promises as fs } from 'fs';
import path from 'path';

export const COMPANION_AVATAR_DIR = path.join(process.cwd(), 'data', 'uploads', 'companion');

// 删除某个陪练头像文件（换头像/删陪练时清理孤儿）。只接受本站上传路径，防目录穿越。
export async function deleteCompanionAvatarFile(avatarUrl: string): Promise<void> {
  const m = /^\/api\/companion\/avatar\/([a-zA-Z0-9-]+\.jpg)$/.exec(avatarUrl || '');
  if (!m) return;
  try {
    await fs.unlink(path.join(COMPANION_AVATAR_DIR, m[1]));
  } catch { /* 文件不存在忽略 */ }
}
