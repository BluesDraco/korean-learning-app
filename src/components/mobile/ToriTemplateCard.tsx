import Link from 'next/link';

interface Props {
  icon: React.ReactNode;
  label: string;
  desc: string;
  href: string;
  progress?: number;
  className?: string;
}

export function ToriTemplateCard({ icon, label, desc, href, progress, className = '' }: Props) {
  return (
    <Link
      href={href}
      className={`rounded-[22px] border border-[var(--border-color)] bg-[var(--bg-card)] p-[18px] shadow-[0_4px_12px_rgba(92,64,38,0.05)] active:scale-[0.98] transition-all ${className}`}
    >
      <div className="w-11 h-11 rounded-2xl bg-[var(--bg-muted)] flex items-center justify-center mb-2.5">
        {icon}
      </div>
      <p className="text-[15px] font-bold text-[var(--text-primary)]">{label}</p>
      <p className="text-[12px] text-[var(--text-muted)] mt-0.5 leading-relaxed">{desc}</p>
      {progress !== undefined && (
        <div className="mt-2.5">
          <div className="flex items-center justify-between mb-1">
            <span className="text-[11px] text-[var(--text-muted)]">进度</span>
            <span className="text-[11px] text-[var(--text-muted)]">{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-[var(--border-color)] rounded-full h-1.5">
            <div
              className="h-1.5 rounded-full bg-gradient-to-r from-[var(--purple-soft)] to-[var(--pink-primary)] transition-all duration-500"
              style={{ width: `${Math.max(4, progress)}%` }}
            />
          </div>
        </div>
      )}
    </Link>
  );
}
