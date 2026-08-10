interface Props {
  value: number | string;
  label: string;
  className?: string;
}

export function ToriStatCard({ value, label, className = '' }: Props) {
  return (
    <div
      className={`rounded-[20px] bg-[var(--bg-card)] border border-[var(--border-color)] px-4 py-3.5 text-center shadow-[0_2px_8px_rgba(92,64,38,0.04)] ${className}`}
    >
      <p className="text-[22px] font-extrabold text-[var(--text-primary)]">{value}</p>
      <p className="text-[12px] text-[var(--text-muted)] mt-0.5">{label}</p>
    </div>
  );
}
