export default function Loading() {
  return (
    <div className="flex items-center justify-center py-24">
      <div className="flex flex-col items-center gap-3">
        <div className="w-10 h-10 border-3 border-[var(--pink-pale)] border-t-[var(--pink-primary)] rounded-full animate-spin" />
        <span className="text-sm text-[var(--text-muted)]">加载中...</span>
      </div>
    </div>
  );
}
