import type { BlogAuthor } from '@/types';

// 头像脸：有 imageUrl 渲染图片（铺满父级圆/圆角框），否则回落 emoji。
export function AvatarFace({ author }: { author: Pick<BlogAuthor, 'emoji' | 'name' | 'imageUrl'> }) {
  if (author.imageUrl) {
    // eslint-disable-next-line @next/next/no-img-element
    return <img className="blog-av-img" src={author.imageUrl} alt={author.name} loading="lazy" draggable={false} />;
  }
  return <>{author.emoji}</>;
}
