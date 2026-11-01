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
    <section id="poc" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="How I run a POC" title="Most POC write-ups show features tested." muted="Mine show the buying decision designed.">
          Fewer surprises for your team and your buyer. Before kickoff, I lock five things.
        </SectionHeading>

        <div ref={ref} className="mt-16 grid gap-10 lg:grid-cols-2">
          <ol className="relative space-y-6 lg:space-y-40 lg:py-16">
            <span aria-hidden className="absolute top-0 bottom-0 left-5 w-px bg-brand-100" />
            {pocLocks.map((l, i) => (
              <li key={l.title} className="relative pl-16">
                <span
                  className={cn(
                    'absolute top-0 left-0 grid size-10 place-items-center rounded-full border font-serif text-lg transition-all duration-500',
                    i <= active ? 'border-brand-600 bg-brand-600 text-white' : 'border-line bg-white text-muted',
                  )}
                >
                  {i < active ? <Check className="size-4" /> : i + 1}
                </span>
                <h3 className={cn('font-serif text-3xl transition-colors duration-500', i === active ? 'text-ink' : 'text-ink lg:text-muted/60')}>{l.title}</h3>
                <p className={cn('mt-2 leading-relaxed text-muted transition-opacity duration-500', i === active ? 'opacity-100' : 'lg:opacity-50')}>{l.body}</p>
              </li>
            ))}
          </ol>

          <div className="hidden lg:block">
            <div className="panel-shadow sticky top-32 rounded-[1.75rem] border border-line bg-white p-8">
              <div className="flex items-center justify-between">
                <p className="text-[13px] font-medium text-muted">POC readiness</p>
                <span className="text-[13px] font-semibold text-brand-700 tabular-nums">
                  {active + 1}/{pocLocks.length} locked
                </span>
              </div>
              <div className="mt-4 h-2 overflow-hidden rounded-full bg-brand-50">
                <motion.div
                  animate={{ width: `${((active + 1) / pocLocks.length) * 100}%` }}
                  transition={{ duration: 0.5 }}
                  className="h-full rounded-full bg-brand-600"
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
                  <span className="grid size-12 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                    <Lock className="size-5" />
                  </span>
                  <p className="mt-5 font-serif text-4xl">{pocLocks[active].title}</p>
                  <p className="mt-2 text-muted">{pocLocks[active].body}</p>
                </motion.div>
              </AnimatePresence>
              <ul className="mt-8 space-y-2.5 border-t border-line pt-6">
                {pocLocks.map((l, i) => (
                  <li key={l.title} className="flex items-center gap-2.5 text-[14px]">
                    <span className={cn('grid size-5 place-items-center rounded-full transition-colors', i <= active ? 'bg-brand-600 text-white' : 'bg-brand-50')}>
                      {i <= active && <Check className="size-3" strokeWidth={3} />}
                    </span>
                    <span className={i <= active ? 'text-ink' : 'text-muted'}>{l.title}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Reveal className="mt-20 grid gap-4 sm:grid-cols-2">
          <div className="rounded-3xl border border-line bg-white p-7">
            <p className="text-[13px] font-medium text-muted">A typical POC</p>
            <p className="mt-3 font-serif text-3xl text-muted">Proves the product works.</p>
          </div>
          <div className="panel-shadow rounded-3xl border border-brand-200 bg-white p-7">
            <p className="text-[13px] font-medium text-brand-700">My POC</p>
            <p className="mt-3 font-serif text-3xl">
              Proves the <span className="text-blue-gradient italic">purchase</span> works.
            </p>
            <p className="mt-2 text-[14px] text-muted">Your champion walks into internal conversations with backup, not guesswork.</p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
