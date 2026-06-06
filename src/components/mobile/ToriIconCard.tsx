import Link from 'next/link';

interface Props {
  icon: React.ReactNode;
  label: string;
  desc?: string;
  href: string;
  className?: string;
}

export function ToriIconCard({ icon, label, desc, href, className = '' }: Props) {
  return (
    <Link
      href={href}
      className={`rounded-[20px] border border-[var(--border-color)] bg-[var(--bg-card)] p-4 text-center shadow-[0_4px_12px_rgba(92,64,38,0.04)] active:scale-[0.97] transition-all ${className}`}
    >
      <div className="w-12 h-12 rounded-[16px] bg-[var(--bg-muted)] flex items-center justify-center mx-auto mb-2">
        {icon}
      </div>
      <p className="text-[13px] font-bold text-[var(--text-primary)]">{label}</p>
      {desc && <p className="text-[11px] text-[var(--text-muted)] mt-0.5 leading-tight">{desc}</p>}
    </Link>
  );
}
