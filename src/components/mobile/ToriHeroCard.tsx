import Link from 'next/link';
import Image from 'next/image';

interface Props {
  icon?: React.ReactNode;
  emoji?: string;
  toriImage?: string;
  label: string;
  desc: string;
  href: string;
  actionLabel: string;
  className?: string;
  gradient?: string;
  ctaVariant?: 'black' | 'pill';
}

export function ToriHeroCard({
  icon,
  emoji,
  toriImage,
  label,
  desc,
  href,
  actionLabel,
  className = '',
  gradient = 'from-[#ffe4ec] to-[#eee7ff]',
  ctaVariant = 'black',
}: Props) {
  return (
    <Link
      href={href}
      className={`block relative overflow-visible rounded-[28px] bg-gradient-to-br ${gradient} p-5 shadow-[0_8px_24px_rgba(92,64,38,0.06)] active:scale-[0.98] transition-all group ${className}`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          {icon && (
            <div className="w-12 h-12 rounded-2xl bg-white/60 flex items-center justify-center mb-3 shrink-0 group-hover:scale-110 transition-transform">
              {icon}
            </div>
          )}
          <p className="text-[18px] font-bold text-[var(--text-primary)]">{label}</p>
          <p className="text-[14px] text-[var(--text-muted)] mt-1 leading-relaxed">{desc}</p>
        </div>
        {toriImage ? (
          <div className="absolute -right-2 -bottom-4 z-20 pointer-events-none select-none w-[110px] h-[110px]">
            <Image
              src={toriImage}
              alt=""
              width={110}
              height={110}
              className="object-contain opacity-90"
              draggable={false}
            />
          </div>
        ) : emoji ? (
          <div className="text-[56px] leading-none shrink-0 group-hover:scale-110 transition-transform">
            {emoji}
          </div>
        ) : null}
      </div>

      {ctaVariant === 'pill' ? (
        <div className="mt-3 inline-flex items-center rounded-full bg-white/70 px-5 py-2.5 text-[14px] font-bold text-[var(--text-primary)] group-hover:bg-white/90 transition-colors">
          {actionLabel}
        </div>
      ) : (
        <div className="mt-3 w-full rounded-[14px] h-[46px] bg-[var(--text-primary)] text-[15px] font-black text-white shadow-[0_8px_18px_rgba(47,42,38,0.16)] flex items-center justify-center group-hover:opacity-90 transition-opacity">
          {actionLabel}
        </div>
      )}
    </Link>
  );
}
