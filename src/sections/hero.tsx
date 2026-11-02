import { motion } from 'motion/react'
import { ArrowRight, CircleDot, MessageCircle } from 'lucide-react'
import { Sky } from '../components/ui/sky'
import { BlurText } from '../components/ui/blur-text'
import { GhostButton, ShimmerButton } from '../components/ui/shimmer-button'
import { Marquee } from '../components/ui/marquee'
import { PirateFunnel } from '../components/pirate-funnel'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, delay, ease: [0.22, 1, 0.36, 1] as const },
})

const strip = ['ICP-fit lead gen', 'Qualified before booked', 'Product-led demos', 'Buyer-agreed success criteria', 'Clean CRM notes', 'Fotos CRM', 'Prava CRM', 'Next step on every demo']

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

        <h1 className="mx-auto mt-7 max-w-5xl font-serif text-[3rem] leading-[0.98] text-balance sm:text-7xl lg:text-[5.4rem]">
          <BlurText text="I own your demos per month." />{' '}
          <BlurText text="From first lead to demo day." delay={0.35} wordClassName={() => 'italic text-blue-gradient pr-1'} />
        </h1>

        <motion.p {...fadeUp(0.8)} className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-pretty text-muted">
          I'm the Product &amp; GTM operator who builds buttery-smooth B2B funnels, tools and handoffs included, so qualified leads slide from
          first touch to a demo on your calendar.
        </motion.p>

        <motion.div {...fadeUp(0.95)} className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <ShimmerButton href="#engine">
            See how I own the number <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </ShimmerButton>
          <GhostButton href="#contact">
            <MessageCircle className="size-4 text-brand-600" /> Tell me your monthly demo target
          </GhostButton>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.97 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1, delay: 1.05, ease: [0.22, 1, 0.36, 1] }}
          className="mx-auto mt-14 max-w-5xl"
        >
          <p className="mb-4 text-[15px] text-muted">
            <span className="font-medium text-ink">A B2B SaaS pirate funnel (AARRR), before and after.</span> Same leads, same team. Flip it to
            see what building the funnel does.
          </p>
          <PirateFunnel />
        </motion.div>

        <div className="mt-16">
          <Marquee duration="45s">
            {strip.map((t) => (
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
