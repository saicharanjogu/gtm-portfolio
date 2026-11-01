import { useState } from 'react'
import { motion, useMotionValueEvent, useScroll } from 'motion/react'
import { cn } from '../../lib/utils'

// Adapted from Aceternity "Floating Navbar": hides on scroll down, returns on scroll up.
export function FloatingNav({ items, brand }: { items: { name: string; href: string }[]; brand: string }) {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setVisible(y < 120 || y < prev)
  })

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-x-0 top-4 z-50 mx-auto w-[calc(100%-2rem)] max-w-5xl"
    >
      <div
        className={cn(
          'flex items-center justify-between rounded-full border px-3 py-2 backdrop-blur-xl transition-all sm:px-4',
          scrolled ? 'card-shadow border-line bg-white/85' : 'border-transparent bg-white/50',
        )}
      >
        <a href="#top" className="flex items-center gap-2.5 pl-1">
          <span className="grid size-8 place-items-center rounded-full bg-brand-600 font-serif text-[15px] text-white">S</span>
          <span className="text-[15px] font-semibold tracking-tight">{brand}</span>
        </a>
        <div className="hidden items-center gap-1 md:flex">
          {items.map((it) => (
            <a key={it.href} href={it.href} className="rounded-full px-3 py-1.5 text-[14px] text-muted transition-colors hover:bg-brand-50 hover:text-brand-700">
              {it.name}
            </a>
          ))}
        </div>
        <a href="#contact" className="rounded-full bg-ink px-4 py-2 text-[14px] font-medium text-white transition-colors hover:bg-brand-700">
          Let's talk
        </a>
      </div>
    </motion.nav>
  )
}
