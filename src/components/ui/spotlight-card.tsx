import { useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

// Adapted from React Bits "Spotlight Card" / Magic UI "Magic Card".
export function SpotlightCard({
  children,
  className,
  color = 'rgba(139,92,246,0.18)',
}: {
  children: ReactNode
  className?: string
  color?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [hover, setHover] = useState(false)

  return (
    <div
      ref={ref}
      onMouseMove={(e) => {
        const r = ref.current!.getBoundingClientRect()
        setPos({ x: e.clientX - r.left, y: e.clientY - r.top })
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      className={cn('relative overflow-hidden rounded-2xl border border-line bg-surface', className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hover ? 1 : 0,
          background: `radial-gradient(420px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 45%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}
