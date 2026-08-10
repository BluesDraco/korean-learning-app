interface Props {
  title: string;
  subtitle?: string;
  className?: string;
}

export function ToriSectionHeader({ title, subtitle, className = '' }: Props) {
  return (
    <div className={`${className}`}>
      <h2 className="text-[16px] font-bold text-[var(--text-primary)]">{title}</h2>
      {subtitle && <p className="text-[12px] text-[var(--text-muted)] mt-0.5">{subtitle}</p>}
    </div>
  );
}
