import { cn } from '../../lib/utils'

// Soft blue sky backdrop, a light take on React Bits "Aurora" / Verity's atmospheric hero.
export function Sky({ className }: { className?: string }) {
  return (
    <div aria-hidden className={cn('pointer-events-none absolute inset-0 overflow-hidden', className)}>
      <div className="absolute inset-0 bg-gradient-to-b from-brand-50 via-white to-white" />
      <div className="absolute -top-[30%] left-1/2 h-[70vh] w-[110vw] -translate-x-1/2 animate-drift rounded-full bg-[radial-gradient(closest-side,rgba(96,144,250,0.35),transparent)] blur-3xl" />
      <div className="absolute top-[5%] -left-[15%] h-[50vh] w-[55vw] animate-drift rounded-full bg-[radial-gradient(closest-side,rgba(191,211,254,0.7),transparent)] blur-3xl [animation-delay:-8s]" />
      <div className="absolute top-[0%] -right-[10%] h-[45vh] w-[45vw] animate-drift rounded-full bg-[radial-gradient(closest-side,rgba(147,180,253,0.45),transparent)] blur-3xl [animation-delay:-14s]" />
      <div className="bg-grid absolute inset-0 opacity-50 [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,black,transparent)]" />
    </div>
  )
}
