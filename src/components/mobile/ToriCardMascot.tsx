import Image from 'next/image';

export type ToriPose = 'peek' | 'side' | 'sit' | 'hot' | 'empty' | 'celebrate';

interface Props {
  [k: string]: unknown;
  pose?: ToriPose;
  customSrc?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const POSE_MAP: Record<ToriPose, { src: string; w: number; h: number; posClass: string }> = {
  peek:   { src: '/images/tori-poses/tori-pose-01.webp', w: 100, h: 100, posClass: '-top-10 right-5' },
  side:   { src: '/images/tori-poses/tori-pose-04.webp', w: 90,  h: 90,  posClass: '-right-3 top-3' },
  sit:    { src: '/images/tori-poses/tori-pose-05.webp', w: 90,  h: 90,  posClass: '-right-1 -bottom-4' },
  hot:    { src: '/images/tori-poses/tori-pose-07.webp', w: 90,  h: 90,  posClass: '-right-3 top-2' },
  empty:  { src: '/images/tori-poses/tori-pose-08.webp', w: 100, h: 100, posClass: '-right-1 -bottom-6' },
  celebrate: { src: '/images/tori-poses/tori-pose-09.webp', w: 95, h: 95, posClass: '-top-8 right-2' },
};

const SIZE_DIM: Record<string, { w: number; h: number }> = {
  sm: { w: 64, h: 64 },
  md: { w: 90, h: 90 },
  lg: { w: 110, h: 110 },
};

export function ToriCardMascot({ pose, customSrc, size = 'md', className = '' }: Props) {
  const src = customSrc || (pose ? POSE_MAP[pose].src : '');
  const posClass = pose ? POSE_MAP[pose].posClass : '-right-2 -bottom-4';
  const dim = SIZE_DIM[size];

  return (
    <div
      className={`absolute z-20 pointer-events-none select-none ${posClass} ${className}`}
      aria-hidden="true"
    >
      <Image
        src={src}
        alt=""
        width={dim.w}
        height={dim.h}
        className="object-contain opacity-90"
        draggable={false}
      />
    </div>
  );
}
