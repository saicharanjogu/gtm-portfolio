import { useEffect, useId, useState, type RefObject } from 'react'
import { motion } from 'motion/react'

// Adapted from Magic UI "Animated Beam": an SVG path between two elements with a travelling gradient.
export function AnimatedBeam({
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  duration = 3,
  delay = 0,
  vertical = false,
}: {
  containerRef: RefObject<HTMLElement | null>
  fromRef: RefObject<HTMLElement | null>
  toRef: RefObject<HTMLElement | null>
  curvature?: number
  duration?: number
  delay?: number
  vertical?: boolean
}) {
  const id = useId()
  const [path, setPath] = useState('')
  const [size, setSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    const update = () => {
      const c = containerRef.current
      const a = fromRef.current
      const b = toRef.current
      if (!c || !a || !b) return
      const cr = c.getBoundingClientRect()
      const ar = a.getBoundingClientRect()
      const br = b.getBoundingClientRect()
      setSize({ w: cr.width, h: cr.height })
      let sx, sy, ex, ey
      if (vertical) {
        sx = ar.left - cr.left + ar.width / 2
        sy = ar.bottom - cr.top
        ex = br.left - cr.left + br.width / 2
        ey = br.top - cr.top
      } else {
        sx = ar.right - cr.left
        sy = ar.top - cr.top + ar.height / 2
        ex = br.left - cr.left
        ey = br.top - cr.top + br.height / 2
      }
      const mx = (sx + ex) / 2
      const my = (sy + ey) / 2 - curvature
      setPath(`M ${sx},${sy} Q ${mx},${my} ${ex},${ey}`)
    }
    update()
    const ro = new ResizeObserver(update)
    if (containerRef.current) ro.observe(containerRef.current)
    return () => ro.disconnect()
  }, [containerRef, fromRef, toRef, curvature, vertical])

  const grad = vertical
    ? { y1: ['-20%', '120%'], y2: ['0%', '140%'], x1: ['0%', '0%'], x2: ['0%', '0%'] }
    : { x1: ['-20%', '120%'], x2: ['0%', '140%'], y1: ['0%', '0%'], y2: ['0%', '0%'] }

  return (
    <svg
      aria-hidden
      fill="none"
      width={size.w}
      height={size.h}
      viewBox={`0 0 ${size.w} ${size.h}`}
      className="pointer-events-none absolute top-0 left-0"
    >
      <path d={path} stroke="var(--line)" strokeWidth={2} strokeLinecap="round" />
      <path d={path} stroke={`url(#${id})`} strokeWidth={2.5} strokeLinecap="round" />
      <defs>
        <motion.linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          initial={{ x1: '0%', x2: '0%', y1: '0%', y2: '0%' }}
          animate={grad}
          transition={{ delay, duration, ease: [0.16, 1, 0.3, 1], repeat: Infinity, repeatDelay: 0.4 }}
        >
          <stop stopColor="#8b5cf6" stopOpacity="0" />
          <stop stopColor="#8b5cf6" />
          <stop offset="32.5%" stopColor="#22d3ee" />
          <stop offset="100%" stopColor="#22d3ee" stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  )
}
