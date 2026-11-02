import { motion } from 'motion/react'
import { ArrowRight, CornerLeftDown } from 'lucide-react'
import { Logo } from '../components/ui/logo'
import { SignalEngine } from '../components/signal-engine'
import { whatsappLink } from '../lib/content'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  return (
    <>
      <section id="top" className="pt-14 pb-12 sm:pt-20">
        <motion.span {...fadeUp(0)} className="inline-flex items-center gap-2 rounded-full border border-line bg-surface py-1 pr-3 pl-1.5 text-[13px] text-muted">
          <span className="flex -space-x-1.5">
            {['Clay', 'n8n', 'Claude'].map((n) => (
              <span key={n} className="grid size-5 place-items-center rounded-full border border-line bg-white">
                <Logo name={n} className="size-3" />
              </span>
            ))}
          </span>
          Signal-based outbound with Clay, n8n and Claude
        </motion.span>

        <motion.h1 {...fadeUp(0.08)} className="relative mt-7 text-[2.5rem] leading-[1.05] font-semibold tracking-tight text-balance sm:text-[3.4rem]">
          I build signal-based outbound systems that book{' '}
          <span className="font-serif font-normal text-brand-600 italic">high-intent demos.</span>
          <span aria-hidden className="absolute -top-9 right-0 hidden rotate-[-4deg] items-center gap-1.5 font-hand text-[16px] leading-none text-brand-600 sm:flex">
            <CornerLeftDown className="size-4" /> then I build the value case
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.16)} className="mt-6 max-w-xl text-[17px] leading-relaxed text-muted">
          Buying signals, enrichment and ICP scoring wired into your CRM, so outbound reaches buyers already in-market. Every demo it books comes
          with a value case your champion can defend.
        </motion.p>

        <motion.div {...fadeUp(0.24)} className="mt-8 flex flex-col gap-3 sm:flex-row">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-[15px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(31,79,224,0.7)] transition-colors hover:bg-brand-700"
          >
            <span className="grid size-5 place-items-center rounded-full bg-white"><Logo name="WhatsApp" className="size-3.5" /></span> Book a 20-min call
          </a>
          <a
            href="#cases"
            className="group card-shadow inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-[15px] font-medium transition-colors hover:border-brand-200"
          >
            Read the case files <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>
      </section>

      <motion.section id="engine" {...fadeUp(0.36)} className="pb-16">
        <p className="mb-3 text-[13px] text-muted">
          <span className="font-medium text-ink">How a buying signal becomes a booked demo.</span> Detected, enriched, researched, scored and
          routed, with non-fits dropped before they reach a rep.
        </p>
        <SignalEngine />
      </motion.section>
    </>
  )
}
