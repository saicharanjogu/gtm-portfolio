import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

// Quota-style heading: Instrument Sans with one italic Instrument Serif accent, written as <em>.
export function H2({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <h2
      className={cn(
        'text-[1.85rem] leading-tight font-semibold tracking-tight text-balance sm:text-[2.15rem] [&_em]:pr-0.5 [&_em]:font-serif [&_em]:text-[1.12em] [&_em]:font-normal [&_em]:italic',
        className,
      )}
    >
      {children}
    </h2>
  )
}
