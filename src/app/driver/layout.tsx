export default function DriverLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-neutral-900 flex justify-center">
      <div className="w-full max-w-md bg-zinc-950 min-h-[100dvh] relative shadow-2xl overflow-x-hidden ring-1 ring-white/10 transform-gpu">
        {children}
      </div>
    </div>
  );
}
