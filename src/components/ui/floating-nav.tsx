import { useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Moon, Sun } from 'lucide-react'
import { cn } from '../../lib/utils'

// Adapted from Aceternity "Floating Navbar": hides on scroll down, returns on scroll up.
export function FloatingNav({ items, brand }: { items: { name: string; href: string }[]; brand: string }) {
  const { scrollY } = useScroll()
  const [visible, setVisible] = useState(true)
  const [scrolled, setScrolled] = useState(false)
  const [dark, setDark] = useState(() => document.documentElement.classList.contains('dark'))

  useMotionValueEvent(scrollY, 'change', (y) => {
    const prev = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setVisible(y < 120 || y < prev)
  })

  const toggleTheme = () => {
    const next = !dark
    setDark(next)
    document.documentElement.classList.toggle('dark', next)
    try {
      localStorage.setItem('theme', next ? 'dark' : 'light')
    } catch {
      // storage can be unavailable; the toggle still works for this visit
    }
  }

  return (
    <AnimatePresence>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: visible ? 0 : -100, opacity: visible ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className="fixed inset-x-0 top-4 z-50 mx-auto flex w-[calc(100%-2rem)] max-w-4xl items-center justify-between gap-2"
      >
        <div
          className={cn(
            'flex w-full items-center justify-between rounded-full border border-line px-3 py-2 backdrop-blur-xl transition-colors sm:px-4',
            scrolled ? 'bg-surface/80 shadow-lg shadow-black/5' : 'bg-surface/40',
          )}
        >
          <a href="#top" className="flex items-center gap-2 pl-1 text-sm font-semibold">
            <span className="grid size-7 place-items-center rounded-full bg-gradient-to-br from-brand to-brand-2 text-[11px] font-bold text-white">
              SJ
            </span>
            <span className="hidden sm:inline">{brand}</span>
          </a>
          <div className="hidden items-center gap-1 md:flex">
            {items.map((it) => (
              <a key={it.href} href={it.href} className="rounded-full px-3 py-1.5 text-sm text-muted transition-colors hover:bg-surface-2 hover:text-fg">
                {it.name}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-1.5">
            <button
              onClick={toggleTheme}
              aria-label={dark ? 'Switch to light mode' : 'Switch to dark mode'}
              className="grid size-9 place-items-center rounded-full text-muted transition-colors hover:bg-surface-2 hover:text-fg"
            >
              {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
            </button>
            <a href="#contact" className="rounded-full bg-fg px-4 py-2 text-sm font-medium text-bg transition-opacity hover:opacity-90">
              Let's talk
            </a>
          </div>
        </div>
      </motion.nav>
    </AnimatePresence>
  )
}
