export function MobilePageContainer({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return (
    <main className={`mx-auto w-full max-w-screen-sm px-4 pb-[calc(88px+env(safe-area-inset-bottom,0px))] ${className}`}>
      {children}
    </main>
  );
}
