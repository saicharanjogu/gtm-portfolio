import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { cn } from '../../lib/utils'

// Adapted from Magic UI "Text Reveal": each word brightens as the paragraph scrolls through the viewport.
// `highlight` words end in brand blue. Reduced-motion users get the finished paragraph.
export function TextReveal({ text, highlight = [], className }: { text: string; highlight?: string[]; className?: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const reduce = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.55'] })
  const words = text.split(' ')
  return (
    <p ref={ref} className={cn('flex flex-wrap', className)}>
      {words.map((w, i) => {
        const hl = highlight.some((h) => w.toLowerCase().replace(/[^a-z-]/g, '') === h)
        return reduce ? (
          <span key={i} className={cn('mr-[0.27em]', hl && 'text-brand-600')}>
            {w}
          </span>
        ) : (
          <Word key={i} progress={scrollYProgress} range={[i / words.length, (i + 1) / words.length]} className={hl ? 'text-brand-600' : undefined}>
            {w}
          </Word>
        )
      })}
    </p>
  )
}

function Word({ children, progress, range, className }: { children: string; progress: MotionValue<number>; range: [number, number]; className?: string }) {
  const opacity = useTransform(progress, range, [0.18, 1])
  return (
    <motion.span style={{ opacity }} className={cn('mr-[0.27em]', className)}>
      {children}
    </motion.span>
  )
}
