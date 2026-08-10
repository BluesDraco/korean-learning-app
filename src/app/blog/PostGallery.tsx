'use client';

import { useRef, useState, useCallback } from 'react';
import Link from 'next/link';
import type { ReactNode, CSSProperties, MouseEvent as ReactMouseEvent, PointerEvent as ReactPointerEvent } from 'react';
import type { BlogImage, BlogCoverTheme } from '@/types';
import { useLang } from '@/components/LangProvider';
import { t } from '@/lib/i18n';

// ins 式比例边界：竖图最高 4:5、横图最宽 1.91:1，区间内按原图比例，超出裁切。
// 单图不夹比例——容器按原图等比，配合 object-fit:contain 零裁切。
const PORTRAIT_MIN = 0.8;   // 4:5
const LANDSCAPE_MAX = 1.91; // 1.91:1
const TAP_SLOP = 10;

function coverRatio(images: BlogImage[]): number {
  const first = images[0];
  if (!first || !first.w || !first.h) return 1;
  const raw = first.w / first.h;
  if (images.length === 1) return raw;
  return Math.min(LANDSCAPE_MAX, Math.max(PORTRAIT_MIN, raw));
}

// 自适应图片轮播。
// 列表页传 href → 渲染成 <Link>（保留 prefetch/新标签打开/键盘可达），滑动时阻断导航。
// 详情页传 onTap → 渲染成 <div>（双击点赞爆心）。
export default function PostGallery({
  images,
  theme,
  alt,
  href,
  onTap,
  children,
}: {
  images: BlogImage[];
  theme: BlogCoverTheme;
  alt: string;
  href?: string;
  onTap?: () => void;
  children?: ReactNode;
}) {
  const [idx, setIdx] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const downX = useRef(0);
  const moved = useRef(false);
  const multi = images.length > 1;
  const ar = coverRatio(images);
  const { lang } = useLang();

  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el) return;
    const i = Math.round(el.scrollLeft / el.clientWidth);
    setIdx((prev) => (prev === i ? prev : i));
  }, []);

  const goTo = (i: number) => {
    const el = trackRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: 'smooth' });
  };

  const stopArrow = (e: ReactMouseEvent, i: number) => {
    e.preventDefault();
    e.stopPropagation();
    goTo(i);
  };

  // 点按/滑动判定：按下记起点，移动超阈值标记为滑动。
  const onPointerDown = (e: ReactPointerEvent) => {
    downX.current = e.clientX;
    moved.current = false;
  };
  const onPointerMove = (e: ReactPointerEvent) => {
    if (Math.abs(e.clientX - downX.current) > TAP_SLOP) moved.current = true;
  };

  const style = { aspectRatio: String(ar) } as CSSProperties;
  const className = `blog-cover blog-gallery theme-${theme}${multi ? '' : ' single'}`;

  const inner = (
    <>
      <div
        className="blog-gallery-track"
        ref={trackRef}
        onScroll={multi ? onScroll : undefined}
      >
        {images.map((img, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={`${img.url}-${i}`} className="blog-gallery-img" src={img.url} alt={alt} draggable={false} />
        ))}
      </div>

      {multi && (
        <>
          <span className="blog-gallery-count">{idx + 1}/{images.length}</span>
          <div className="blog-gallery-dots">
            {images.map((img, i) => (
              <span key={`${img.url}-${i}`} className={`blog-gallery-dot${idx === i ? ' on' : ''}`} />
            ))}
          </div>
          <span
            role="button"
            tabIndex={idx === 0 ? -1 : 0}
            className="blog-gallery-arrow left"
            aria-label={t('blog.gallery_prev', lang)}
            aria-disabled={idx === 0}
            onClick={(e) => { if (idx > 0) stopArrow(e, idx - 1); }}
            onKeyDown={(e) => { if (e.key === ' ') e.preventDefault(); }}
          >
            ‹
          </span>
          <span
            role="button"
            tabIndex={idx === images.length - 1 ? -1 : 0}
            className="blog-gallery-arrow right"
            aria-label={t('blog.gallery_next', lang)}
            aria-disabled={idx === images.length - 1}
            onClick={(e) => { if (idx < images.length - 1) stopArrow(e, idx + 1); }}
            onKeyDown={(e) => { if (e.key === ' ') e.preventDefault(); }}
          >
            ›
          </span>
        </>
      )}

      {children}
    </>
  );

  // 列表模式：真 <Link>（原生可聚焦、可 Cmd/中键打开、会 prefetch）。滑动过则阻断这次导航。
  if (href) {
    return (
      <Link
        href={href}
        className={className}
        style={style}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onClick={(e) => { if (moved.current) e.preventDefault(); }}
      >
        {inner}
      </Link>
    );
  }

  // 详情模式：div + 双击点赞（onTap 内部按 tap 间隔判定双击）。
  return (
    <div
      className={className}
      style={style}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onClick={() => { if (!moved.current) onTap?.(); }}
    >
      {inner}
    </div>
  );
}
