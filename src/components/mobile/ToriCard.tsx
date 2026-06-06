export function ToriCard({ children, className = '', ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={`rounded-[24px] border border-[var(--border-color)] bg-[var(--bg-card)] p-[18px] shadow-[0_8px_24px_rgba(92,64,38,0.08)] ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
