import { cn } from '../../lib/utils'

// Inspired by React Bits "Aurora" and Aceternity "Aurora Background".
export function Aurora({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute -top-1/3 left-1/2 h-[80vh] w-[120vw] -translate-x-1/2 animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(139,92,246,0.35),transparent)] blur-3xl" />
      <div className="absolute -top-1/4 left-[10%] h-[60vh] w-[60vw] animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(34,211,238,0.22),transparent)] blur-3xl [animation-delay:-6s]" />
      <div className="absolute top-[10%] right-[-10%] h-[50vh] w-[50vw] animate-aurora rounded-full bg-[radial-gradient(closest-side,rgba(245,158,11,0.12),transparent)] blur-3xl [animation-delay:-12s]" />
      <div className="bg-grid absolute inset-0 opacity-60 [mask-image:radial-gradient(ellipse_at_top,black_20%,transparent_70%)]" />
    </div>
  )
}
