import type { CSSProperties, ReactNode } from 'react'
import { cn } from '../../lib/utils'

// Adapted from Magic UI "Marquee": two copies scroll in a seamless loop, edges fade, hover pauses.
export function Marquee({ children, reverse, duration = '40s', className }: { children: ReactNode; reverse?: boolean; duration?: string; className?: string }) {
  return (
    <div
      className={cn('group flex overflow-hidden [--gap:0.75rem] [gap:var(--gap)] [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]', className)}
      style={{ '--duration': duration } as CSSProperties}
    >
      {[0, 1].map((i) => (
        <div
          key={i}
          aria-hidden={i === 1 || undefined}
          className={cn(
            'flex shrink-0 items-center [gap:var(--gap)] [animation:marquee-x_var(--duration)_linear_infinite] group-hover:[animation-play-state:paused] motion-reduce:[animation:none]',
            reverse && '[animation-direction:reverse]',
          )}
        >
          {children}
        </div>
      ))}
    </div>
  )
}
