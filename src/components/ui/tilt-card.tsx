import { useRef, type ReactNode } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react'
import { cn } from '../../lib/utils'

// Adapted from Aceternity "3D Card Effect": the card tilts toward the cursor with a moving glare.
export function TiltCard({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const px = useMotionValue(0.5)
  const py = useMotionValue(0.5)
  const sx = useSpring(px, { stiffness: 200, damping: 20 })
  const sy = useSpring(py, { stiffness: 200, damping: 20 })
  const rotateY = useTransform(sx, [0, 1], [-7, 7])
  const rotateX = useTransform(sy, [0, 1], [7, -7])
  const glare = useTransform([sx, sy], ([x, y]) => `radial-gradient(320px circle at ${(x as number) * 100}% ${(y as number) * 100}%, rgba(59,108,246,0.12), transparent 60%)`)

  return (
    <div style={{ perspective: 1000 }} className="h-full">
      <motion.div
        ref={ref}
        onMouseMove={(e) => {
          const r = ref.current!.getBoundingClientRect()
          px.set((e.clientX - r.left) / r.width)
          py.set((e.clientY - r.top) / r.height)
        }}
        onMouseLeave={() => {
          px.set(0.5)
          py.set(0.5)
        }}
        style={{ rotateX, rotateY, transformStyle: 'preserve-3d' }}
        className={cn('card-shadow relative h-full overflow-hidden rounded-3xl border border-line bg-white', className)}
      >
        <motion.div aria-hidden className="pointer-events-none absolute inset-0" style={{ background: glare }} />
        <div className="relative h-full">{children}</div>
      </motion.div>
    </div>
  )
}
