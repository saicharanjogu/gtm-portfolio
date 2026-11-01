import { useRef, useState } from 'react'
import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { Check, Lock } from 'lucide-react'
import { SectionHeading } from '../components/ui/section-heading'
import { Reveal } from '../components/ui/reveal'
import { pocLocks } from '../lib/content'
import { cn } from '../lib/utils'

// Adapted from Aceternity "Sticky Scroll Reveal": the panel on the right follows the item in view.
export function Poc() {
  const ref = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(0)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.6', 'end 0.6'] })

  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    setActive(Math.min(pocLocks.length - 1, Math.max(0, Math.floor(v * pocLocks.length))))
  })

  return (
    <section id="poc" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="How I run a POC" title="Most POC write-ups show features tested. Mine show the buying decision designed.">
          Fewer surprises for your team and your buyer. Before kickoff, I lock five things.
        </SectionHeading>

        <div ref={ref} className="mt-16 grid gap-10 lg:grid-cols-2">
          <ol className="relative space-y-6 lg:space-y-40 lg:py-16">
            <span aria-hidden className="absolute top-0 bottom-0 left-5 w-px bg-line" />
            {pocLocks.map((l, i) => (
              <li key={l.title} className="relative pl-14">
                <span
                  className={cn(
                    'absolute top-0 left-0 grid size-10 place-items-center rounded-full border text-sm font-semibold transition-all duration-500',
                    i <= active ? 'border-transparent bg-gradient-to-br from-brand to-brand-2 text-white' : 'border-line bg-surface text-muted',
                  )}
                >
                  {i < active ? <Check className="size-4" /> : i + 1}
                </span>
                <h3 className={cn('text-xl font-semibold tracking-tight transition-colors duration-500 sm:text-2xl', i === active ? 'text-fg' : 'text-muted lg:opacity-50')}>
                  {l.title}
                </h3>
                <p className={cn('mt-2 leading-relaxed text-muted transition-opacity duration-500', i === active ? 'opacity-100' : 'lg:opacity-40')}>{l.body}</p>
              </li>
            ))}
          </ol>

          <div className="hidden lg:block">
            <div className="sticky top-32 rounded-3xl border border-line bg-surface p-8 shadow-2xl shadow-brand/5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">POC readiness</p>
                <span className="text-sm font-semibold tabular-nums">
                  {active + 1}/{pocLocks.length} locked
                </span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-surface-2">
                <motion.div
                  animate={{ width: `${((active + 1) / pocLocks.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
                />
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={active}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.35 }}
                  className="mt-8"
                >
                  <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-brand/15 to-brand-2/15 text-brand">
                    <Lock className="size-5" />
                  </span>
                  <p className="mt-5 text-2xl font-semibold tracking-tight">{pocLocks[active].title}</p>
                  <p className="mt-2 text-muted">{pocLocks[active].body}</p>
                </motion.div>
              </AnimatePresence>
              <ul className="mt-8 space-y-2 border-t border-line pt-6">
                {pocLocks.map((l, i) => (
                  <li key={l.title} className="flex items-center gap-2.5 text-sm">
                    <span className={cn('grid size-5 place-items-center rounded-full transition-colors', i <= active ? 'bg-emerald-500 text-white' : 'bg-surface-2')}>
                      {i <= active && <Check className="size-3" />}
                    </span>
                    <span className={i <= active ? 'text-fg' : 'text-muted'}>{l.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Reveal className="mt-20 grid gap-4 sm:grid-cols-2">
          <div className="rounded-2xl border border-line bg-surface p-6">
            <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Typical POC</p>
            <p className="mt-3 text-xl font-semibold">Proves the product works.</p>
          </div>
          <div className="rounded-2xl border border-brand/40 bg-gradient-to-br from-brand/10 to-brand-2/10 p-6">
            <p className="text-xs font-medium tracking-[0.18em] text-brand uppercase">My POC</p>
            <p className="mt-3 text-xl font-semibold">
              Proves the <span className="text-gradient">purchase</span> works.
            </p>
            <p className="mt-2 text-sm text-muted">Your champion walks into internal conversations with backup, not guesswork.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
