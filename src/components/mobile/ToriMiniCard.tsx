import Link from 'next/link';

interface Props {
  icon: React.ReactNode;
  label: string;
  detail: string;
  href: string;
  className?: string;
}

export function ToriMiniCard({ icon, label, detail, href, className = '' }: Props) {
  return (
    <Link
      href={href}
      className={`min-h-[96px] rounded-[22px] border border-[var(--border-color)] bg-[var(--bg-card)] p-[18px] shadow-[0_4px_12px_rgba(92,64,38,0.05)] active:scale-[0.98] transition-all ${className}`}
    >
      <div className="w-10 h-10 rounded-xl bg-[var(--bg-muted)] flex items-center justify-center mb-2">
        {icon}
      </div>
      <p className="text-[15px] font-bold text-[var(--text-primary)]">{label}</p>
      <p className="text-[12px] text-[var(--text-muted)] mt-0.5 leading-tight">{detail}</p>
    </Link>
  );
}
