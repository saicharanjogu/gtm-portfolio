import { motion } from 'motion/react'
import { ArrowRight, CircleDot, MessageCircle } from 'lucide-react'
import { Sky } from '../components/ui/sky'
import { BlurText } from '../components/ui/blur-text'
import { GhostButton, ShimmerButton } from '../components/ui/shimmer-button'
import { Marquee } from '../components/ui/marquee'
import { FunnelSimulator } from '../components/funnel-simulator'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
})

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

export function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden pt-32 pb-20 sm:pt-36">
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

        <h1 className="mx-auto mt-7 max-w-5xl font-serif text-[2.9rem] leading-[0.98] text-balance sm:text-7xl lg:text-[5.2rem]">
          <BlurText text="You know the funnel is leaking." />{' '}
          <BlurText text="You just haven't had time to fix it." delay={0.4} wordClassName={() => 'italic text-blue-gradient pr-1'} />
        </h1>

        <motion.p {...fadeUp(0.9)} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">
          I own the GTM path from lead gen → demos → value engineering → paid POC, so your team can stop holding it together manually and
          start moving deals forward.
        </motion.p>

        <motion.div {...fadeUp(1.05)} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ShimmerButton href="#own">
            See how I run the funnel <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </ShimmerButton>
          <GhostButton href="#contact">
            <MessageCircle className="size-4 text-brand-600" /> Tell me where it's stuck
          </GhostButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 max-w-5xl"
        >
          <p className="mb-4 text-[15px] text-muted">
            <span className="font-medium text-ink">80% of POCs stall before production.</span> Same pipeline, same team. Watch what changes
            when someone owns the handoffs.
          </p>
          <FunnelSimulator />
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
