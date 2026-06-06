import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

interface Props {
  label: string;
  desc: string;
  href: string;
  emoji?: string;
  className?: string;
}

export function ToriFeedCard({ label, desc, href, emoji, className = '' }: Props) {
  return (
    <Link
      href={href}
      className={`flex items-center gap-3 rounded-[18px] border border-[var(--border-color)] bg-[var(--bg-card)] px-[18px] py-4 shadow-[0_2px_8px_rgba(92,64,38,0.03)] active:bg-[var(--bg-muted)] transition-all ${className}`}
    >
      {emoji && (
        <div className="w-10 h-10 rounded-[14px] bg-[var(--bg-muted)] flex items-center justify-center text-lg shrink-0">
          {emoji}
        </div>
      )}
      <div className="flex-1 min-w-0">
        <p className="text-[15px] font-medium text-[var(--text-primary)]">{label}</p>
        <p className="text-[12px] text-[var(--text-muted)] mt-0.5">{desc}</p>
      </div>
      <ChevronRight size={16} className="text-[var(--border-color)] shrink-0" />
    </Link>
  );
}
