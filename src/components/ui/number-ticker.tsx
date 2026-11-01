import { useEffect, useRef } from 'react'
import { animate, useInView } from 'motion/react'
import { cn } from '../../lib/utils'

const format = (n: number) => Intl.NumberFormat('en-US').format(Math.max(0, Math.round(n)))

// Adapted from Magic UI "Number Ticker". Renders the final value up front, so the real number
// shows even when animation frames never run (background tabs, crawlers, reduced motion).
export function NumberTicker({ value, className, delay = 0 }: { value: number; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const controls = animate(0, value, {
      duration: 1.6,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (v) => {
        if (ref.current) ref.current.textContent = format(v)
      },
    })
    return () => controls.stop()
  }, [inView, value, delay])

  return (
    <span ref={ref} className={cn('inline-block tabular-nums', className)}>
      {format(value)}
    </span>
  )
}
