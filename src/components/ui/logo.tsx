import { LOGOS } from '../../lib/logos'
import { cn } from '../../lib/utils'

// A tool's svgl logo, or its first letter when svgl doesn't carry it.
export function Logo({ name, className }: { name: string; className?: string }) {
  const src = LOGOS[name]
  if (!src) return <span className={cn('grid place-items-center font-serif leading-none text-brand-700', className)}>{name[0]}</span>
  return <img src={src} alt="" aria-hidden className={cn('object-contain', className)} loading="lazy" />
}
