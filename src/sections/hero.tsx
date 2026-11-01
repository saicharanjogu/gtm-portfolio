import { motion } from 'motion/react'
import { ArrowRight, Check, CircleDot, MessageCircle } from 'lucide-react'
import { Sky } from '../components/ui/sky'
import { BlurText } from '../components/ui/blur-text'
import { NumberTicker } from '../components/ui/number-ticker'
import { GhostButton, ShimmerButton } from '../components/ui/shimmer-button'
import { Marquee } from '../components/ui/marquee'
import { pocLocks } from '../lib/content'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const columns = [
  { title: 'Lead gen', count: '198+', deals: ['Qualified against ICP', 'Volume with fit'] },
  { title: 'Demos', count: '65+', deals: ['Success criteria agreed', 'Champion identified'] },
  { title: 'Value eng.', count: '', deals: ['ROI case the champion can defend'] },
  { title: 'Converted', count: '40+', deals: ['Commercial next step set'] },
]

const capabilities = [
  'ICP-qualified pipeline',
  'Buyer-agreed success criteria',
  'Champion-ready ROI cases',
  'Paid POCs',
  'Security & procurement mapped early',
  'Fotos CRM',
  'Prava CRM',
  'Production handoff',
]

// Product-style mockup, in the spirit of the Accrue / Zeno hero visuals.
function PipelineMockup() {
  return (
    <div className="panel-shadow relative overflow-hidden rounded-[1.75rem] border border-white bg-white/80 p-2 backdrop-blur-xl">
      <div className="rounded-[1.35rem] border border-line bg-white">
        <div className="flex items-center justify-between border-b border-line px-5 py-3.5">
          <div className="flex items-center gap-2.5">
            <span className="flex gap-1.5">
              <span className="size-2.5 rounded-full bg-brand-100" />
              <span className="size-2.5 rounded-full bg-brand-200" />
              <span className="size-2.5 rounded-full bg-brand-300" />
            </span>
            <span className="ml-2 text-[13px] font-medium">GTM pipeline</span>
            <span className="hidden rounded-full bg-brand-50 px-2 py-0.5 text-[11px] font-medium text-brand-700 sm:inline">Owned end to end</span>
          </div>
          <span className="text-[12px] text-muted">Lead → Production</span>
        </div>

        <div className="grid gap-px bg-line md:grid-cols-[1fr_280px]">
          <div className="grid grid-cols-2 gap-px bg-line sm:grid-cols-4">
            {columns.map((c, i) => (
              <div key={c.title} className="bg-white p-4">
                <div className="flex items-center justify-between">
                  <span className="text-[12px] font-medium text-muted">{c.title}</span>
                  <span className="text-[12px] font-semibold text-brand-700 tabular-nums">{c.count}</span>
                </div>
                <div className="mt-3 space-y-2">
                  {c.deals.map((d, j) => (
                    <motion.div
                      key={d}
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.4 + i * 0.12 + j * 0.08 }}
                      className="rounded-xl border border-line bg-surface px-2.5 py-2 text-left text-[11.5px] leading-snug"
                    >
                      <span className="mb-1 block h-1 w-8 rounded-full" style={{ background: `var(--color-brand-${300 + i * 100})` }} />
                      {d}
                    </motion.div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 text-left">
            <div className="flex items-center justify-between">
              <span className="text-[12px] font-medium text-muted">POC readiness</span>
              <span className="text-[12px] font-semibold text-brand-700">5/5</span>
            </div>
            <ul className="mt-3 space-y-2">
              {pocLocks.map((l, i) => (
                <motion.li
                  key={l.title}
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 1.6 + i * 0.1 }}
                  className="flex items-center gap-2 text-[12px]"
                >
                  <span className="grid size-4 shrink-0 place-items-center rounded-full bg-brand-600 text-white">
                    <Check className="size-2.5" strokeWidth={3} />
                  </span>
                  <span className="truncate">{l.title}</span>
                </motion.li>
              ))}
            </ul>
            <div className="mt-4 rounded-xl bg-brand-50 p-3">
              <div className="flex items-baseline gap-1 font-serif text-3xl text-brand-700">
                ~<NumberTicker value={20} delay={1.6} />%
              </div>
              <p className="text-[11.5px] text-brand-900/70">lead-to-conversion, kept honest in the CRM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-36 pb-20 sm:pt-44">
      <Sky />
      <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6">
        <motion.div {...fadeUp(0)} className="flex justify-center">
          <span className="card-shadow inline-flex items-center gap-2 rounded-full border border-line bg-white/80 py-1 pr-3 pl-1 text-[13px] text-muted backdrop-blur">
            <span className="relative grid size-5 place-items-center">
              <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-400" />
              <CircleDot className="relative size-4 text-brand-600" />
            </span>
            Sai Charan Jogu · Product &amp; GTM
          </span>
        </motion.div>

        <h1 className="mx-auto mt-8 max-w-5xl font-serif text-[3.1rem] leading-[0.98] text-balance sm:text-7xl lg:text-[5.6rem]">
          <BlurText text="You know the funnel is leaking." />{' '}
          <BlurText text="You just haven't had time to fix it." delay={0.4} wordClassName={() => 'italic text-blue-gradient pr-1'} />
        </h1>

        <motion.p {...fadeUp(0.9)} className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-pretty text-muted sm:text-xl">
          I own the GTM path from lead gen → demos → value engineering → paid POC, so your team can stop holding it together manually and
          start moving deals forward.
        </motion.p>

        <motion.div {...fadeUp(1.05)} className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ShimmerButton href="#own">
            See how I run the funnel <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </ShimmerButton>
          <GhostButton href="#contact">
            <MessageCircle className="size-4 text-brand-600" /> Tell me where it's stuck
          </GhostButton>
        </motion.div>

        <motion.p {...fadeUp(1.2)} className="mt-6 text-sm text-muted">
          <span className="font-semibold text-ink">80% of POCs stall before production.</span> I make sure yours don't.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1.25, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-16 max-w-5xl"
        >
          <PipelineMockup />
        </motion.div>

        <div className="mt-16">
          <p className="text-[13px] text-muted">What every handoff gets</p>
          <Marquee className="mt-5" duration="45s">
            {capabilities.map((t) => (
              <span key={t} className="font-serif text-2xl whitespace-nowrap text-ink/60">
                {t}
                <span className="ml-10 text-brand-300">✦</span>
              </span>
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  )
}
