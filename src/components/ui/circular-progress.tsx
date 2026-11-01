import { useRef, type ReactNode } from 'react'
import { useInView } from 'motion/react'

// Adapted from Magic UI "Animated Circular Progress Bar". The ring is a CSS transition, so it still lands
// on the right value where animation frames don't run.
export function CircularProgress({ value, size = 128, stroke = 10, children }: { value: number; size?: number; stroke?: number; children?: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true })
  const r = (size - stroke) / 2
  const c = 2 * Math.PI * r
  return (
    <div ref={ref} className="relative grid place-items-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="-rotate-90" aria-hidden>
        <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="var(--color-brand-100)" strokeWidth={stroke} />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-brand-600)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          style={{ strokeDashoffset: inView ? c * (1 - value / 100) : c, transition: 'stroke-dashoffset 1.6s cubic-bezier(0.16,1,0.3,1)' }}
        />
      </svg>
      <div className="absolute inset-0 grid place-items-center">{children}</div>
    </div>
  )
}
