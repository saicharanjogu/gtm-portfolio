import { useRef } from 'react'
import { useInView } from 'motion/react'
import { cn } from '../../lib/utils'

// Adapted from Tremor "BarList": horizontal bars that grow in when scrolled into view.
// The width is a CSS transition, so the final value shows even where animation doesn't run.
export function BarList({ items, className }: { items: { name: string; value: number; note?: string; tone: string }[]; className?: string }) {
  const ref = useRef<HTMLUListElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const max = Math.max(...items.map((i) => i.value))
  return (
    <ul ref={ref} className={cn('space-y-2', className)}>
      {items.map((it, i) => (
        <li key={it.name} className="flex items-center gap-3">
          <div className="relative h-10 flex-1 overflow-hidden rounded-lg bg-surface">
            <div
              className={cn('absolute inset-y-0 left-0 rounded-lg', it.tone)}
              style={{
                width: inView ? `${(it.value / max) * 100}%` : '0%',
                transition: `width 1.2s cubic-bezier(0.22,1,0.36,1) ${i * 0.15}s`,
              }}
            />
            <span className="relative flex h-full items-center px-3 text-[14px] font-medium whitespace-nowrap">{it.name}</span>
          </div>
          <span className="w-24 shrink-0 text-right">
            <span className="block text-[15px] font-semibold tabular-nums">{it.value}+</span>
            {it.note && <span className="block text-[11.5px] text-muted">{it.note}</span>}
          </span>
        </li>
      ))}
    </ul>
  )
}
