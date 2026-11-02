import { motion } from 'motion/react'
import { ArrowRight, CornerLeftDown } from 'lucide-react'
import { Logo } from '../components/ui/logo'
import { SignalEngine } from '../components/signal-engine'
import { ProductMark } from '../components/ui/product-mark'
import { products, whatsappLink } from '../lib/content'

const fadeUp = (delay: number) => ({
  initial: { opacity: 0, y: 14 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] as const },
})

export function Hero() {
  return (
    <>
      <section id="top" className="relative pt-8 pb-10 sm:pt-20 sm:pb-12">
        <motion.span {...fadeUp(0)} className="liquid-glass inline-flex max-w-full items-center gap-2 rounded-full py-1 pr-3 pl-1.5 text-[12.5px] text-ink/80 sm:text-[13px]">
          <span className="flex shrink-0 -space-x-1.5">
            {['Clay', 'n8n', 'Claude'].map((n) => (
              <span key={n} className="grid size-5 place-items-center rounded-full border border-line bg-white">
                <Logo name={n} className="size-3" />
              </span>
            ))}
          </span>
          <span>
            Signal-based outbound<span className="hidden min-[400px]:inline"> with Clay, n8n and Claude</span>
          </span>
        </motion.span>

        <motion.h1 {...fadeUp(0.08)} className="relative mt-6 text-[2.15rem] leading-[1.06] min-[380px]:text-[2.5rem] sm:mt-7 sm:leading-[1.05] font-semibold tracking-tight text-balance sm:text-[3.4rem]">
          I build signal-based outbound systems that book{' '}
          <span className="font-serif font-normal whitespace-nowrap text-brand-600 italic">high-intent demos.</span>
          <span aria-hidden className="absolute -top-9 right-0 hidden rotate-[-4deg] items-center gap-1.5 font-hand text-[22px] leading-none font-semibold text-brand-600 sm:flex">
            <CornerLeftDown className="size-4" /> then I build the value case
          </span>
        </motion.h1>

        <motion.p {...fadeUp(0.16)} className="mt-5 max-w-xl text-[16px] leading-relaxed text-muted sm:mt-6 sm:text-[17px]">
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
            <Logo name="WhatsAppWhite" className="size-[18px]" /> Ping me
          </a>
          <a
            href="#cases"
            className="group liquid-glass inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 text-[15px] font-medium transition-transform hover:-translate-y-0.5"
          >
            Read the case files <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
          </a>
        </motion.div>

        {/* The real products behind the numbers, linked */}
        <motion.div {...fadeUp(0.3)} className="mt-8 flex flex-wrap items-center gap-2">
          <span className="mr-1 w-full text-[12px] text-muted sm:w-auto">Recently took to market</span>
          {products.map((p) => (
            <a
              key={p.mark}
              href={p.url}
              target="_blank"
              rel="noreferrer"
              title={p.what}
              className="liquid-glass inline-flex items-center gap-2 rounded-full py-1 pr-3 pl-1 text-[13px] font-medium transition-transform hover:-translate-y-0.5"
            >
              <ProductMark mark={p.mark} className="size-6 text-[12px]" />
              {p.name}
            </a>
          ))}
        </motion.div>
      </section>

      <motion.section id="engine" {...fadeUp(0.36)} className="pb-12 sm:pb-16">
        <p className="mb-3 text-[13px] text-muted">
          <span className="font-medium text-ink">How a buying signal becomes a booked demo.</span> Detected, enriched, researched, scored and
          routed, with non-fits dropped before they reach a rep.
        </p>
        <SignalEngine />
      </motion.section>
    </>
  )
}
