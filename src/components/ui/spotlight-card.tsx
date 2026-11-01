import { useRef, useState, type ReactNode } from 'react'
import { cn } from '../../lib/utils'

// Adapted from React Bits "Spotlight Card" / Magic UI "Magic Card".
export function SpotlightCard({
  children,
  className,
  color = 'rgba(59,108,246,0.10)',
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
      className={cn('card-shadow relative overflow-hidden rounded-3xl border border-line bg-white transition-colors hover:border-brand-200', className)}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-opacity duration-300"
        style={{
          opacity: hover ? 1 : 0,
          background: `radial-gradient(380px circle at ${pos.x}px ${pos.y}px, ${color}, transparent 50%)`,
        }}
      />
      <div className="relative h-full">{children}</div>
    </div>
  )
}
