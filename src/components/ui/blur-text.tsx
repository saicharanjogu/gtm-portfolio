import { motion } from 'motion/react'
import { cn } from '../../lib/utils'

// Adapted from React Bits "Blur Text" / Aceternity "Text Generate Effect".
export function BlurText({
  text,
  className,
  wordClassName,
  delay = 0,
  stagger = 0.06,
}: {
  text: string
  className?: string
  wordClassName?: (word: string, i: number) => string | undefined
  delay?: number
  stagger?: number
}) {
  const words = text.split(' ')
  return (
    <span className={cn('inline', className)}>
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, filter: 'blur(10px)', y: 12 }}
          animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
          transition={{ duration: 0.6, delay: delay + i * stagger, ease: [0.22, 1, 0.36, 1] }}
          className={cn('inline-block will-change-transform', wordClassName?.(w, i))}
        >
          {w}
          {i < words.length - 1 && ' '}
        </motion.span>
      ))}
    </span>
  )
}
