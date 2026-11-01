import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../lib/utils'

// Adapted from Magic UI "Marquee".
export function Marquee({ children, className, duration = '30s' }: { children: ReactNode; className?: string; duration?: string }) {
  return (
    <div
      className={cn(
        'group flex overflow-hidden [--gap:2.5rem] [gap:var(--gap)] [mask-image:linear-gradient(to_right,transparent,black_12%,black_88%,transparent)]',
        className,
      )}
      style={{ '--duration': duration } as CSSProperties}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1}
          className="flex shrink-0 animate-marquee items-center justify-around [gap:var(--gap)] group-hover:[animation-play-state:paused]"
        >
          {children}
        </div>
      ))}
    </div>
  )
}
