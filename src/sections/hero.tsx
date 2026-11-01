import { motion } from 'motion/react'
import { ArrowRight, MessageCircle } from 'lucide-react'
import { Aurora } from '../components/ui/aurora'
import { BlurText } from '../components/ui/blur-text'
import { NumberTicker } from '../components/ui/number-ticker'
import { ShimmerButton } from '../components/ui/shimmer-button'
import { stages } from '../lib/content'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-36 pb-24 sm:pt-44 sm:pb-32">
      <Aurora />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <motion.div {...fadeUp(0)} className="flex justify-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1.5 text-xs font-medium text-muted backdrop-blur">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
            </span>
            Sai Charan Jogu · Product &amp; GTM
          </span>
        </motion.div>

        <h1 className="mx-auto mt-8 max-w-5xl text-center text-4xl leading-[1.05] font-semibold tracking-tight text-balance sm:text-6xl lg:text-7xl">
          <BlurText text="You Know the Funnel Is Leaking." />
          <br />
          <BlurText
            text="You Just Haven't Had Time to Fix It."
            delay={0.45}
            wordClassName={() => 'font-serif italic font-normal text-gradient pr-1'}
          />
        </h1>

        <motion.p {...fadeUp(1)} className="mx-auto mt-8 max-w-2xl text-center text-lg leading-relaxed text-pretty text-muted sm:text-xl">
          I own the GTM path from lead gen → demos → value engineering → paid POC, so your team can stop holding it together manually and
          start moving deals forward.
        </motion.p>

        <motion.div {...fadeUp(1.15)} className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ShimmerButton href="#own">
            See how I run the funnel <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </ShimmerButton>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-surface-2"
          >
            <MessageCircle className="size-4" /> Tell me where it's stuck
          </a>
        </motion.div>

        <motion.div {...fadeUp(1.35)} className="mx-auto mt-20 grid max-w-4xl items-center gap-6 rounded-3xl border border-line bg-surface/60 p-6 backdrop-blur sm:grid-cols-[auto_1fr] sm:p-8">
          <div className="flex items-baseline gap-1 text-6xl font-semibold tracking-tight text-leak sm:text-7xl">
            <NumberTicker value={80} delay={1.4} />
            <span>%</span>
          </div>
          <div>
            <p className="text-lg font-medium">of POCs stall before production.</p>
            <p className="mt-1 text-muted">I make sure yours don't.</p>
            <div className="mt-4 flex flex-wrap gap-1.5">
              {stages.map((s, i) => (
                <span key={s.key} className="inline-flex items-center gap-1.5 text-xs text-muted">
                  <span className="rounded-full border border-line bg-surface-2 px-2.5 py-1 font-medium text-fg">{s.title}</span>
                  {i < stages.length - 1 && <ArrowRight className="size-3" />}
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
