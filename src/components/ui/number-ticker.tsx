import { useEffect, useRef } from 'react'
import { useInView, useMotionValue, useSpring } from 'motion/react'
import { cn } from '../../lib/utils'

// Adapted from Magic UI "Number Ticker".
export function NumberTicker({ value, className, delay = 0 }: { value: number; className?: string; delay?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const motionValue = useMotionValue(0)
  const spring = useSpring(motionValue, { damping: 60, stiffness: 100 })
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const t = setTimeout(() => motionValue.set(value), delay * 1000)
    return () => clearTimeout(t)
  }, [inView, value, delay, motionValue])

  useEffect(
    () =>
      spring.on('change', (latest) => {
        if (ref.current) ref.current.textContent = Intl.NumberFormat('en-US').format(Math.max(0, Math.round(latest)))
      }),
    [spring],
  )

  return (
    <span ref={ref} className={cn('inline-block tabular-nums tracking-tight', className)}>
      0
    </span>
  )
}
