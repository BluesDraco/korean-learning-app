import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Props {
  [k: string]: unknown;
  icon?: React.ReactNode;
  label: string;
  desc?: string;
  href: string;
  rightContent?: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ToriListRow({ icon, label, desc, href, rightContent, className = '', onClick }: Props) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={`flex items-center gap-3 rounded-[18px] bg-[var(--bg-card)] border border-[var(--border-color)] px-[18px] py-4 shadow-[0_2px_8px_rgba(92,64,38,0.03)] active:bg-[var(--bg-muted)] transition-all ${className}`}
    >
      {icon && (
        <div className="w-10 h-10 rounded-[14px] bg-[var(--bg-muted)] flex items-center justify-center shrink-0">
          {icon}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-[var(--text-primary)]">{label}</p>
        {desc && <p className="text-[12px] text-[var(--text-muted)] mt-0.5">{desc}</p>}
      </div>
      {rightContent}
      <ChevronRight size={16} className="text-[var(--border-color)] shrink-0" />
    </Link>
  );
}
