import { motion } from 'motion/react'
import { Check, ShieldCheck } from 'lucide-react'
import { SectionHeading } from '../components/ui/section-heading'
import { SpotlightCard } from '../components/ui/spotlight-card'
import { Reveal } from '../components/ui/reveal'
import { NumberTicker } from '../components/ui/number-ticker'
import { proof } from '../lib/content'

const fit = ['Right role', 'Right company size', 'Real pain', 'Budget owner']
const booked = new Set([1, 4, 6, 9, 11, 13, 16, 18, 21, 23, 25, 27])
const criteria = ['Success criteria agreed', 'Data scope confirmed', 'Champion identified']

function Tile({ step, title, children, visual, className }: { step: string; title: string; children: string; visual: React.ReactNode; className?: string }) {
  return (
    <SpotlightCard className={`flex h-full flex-col p-7 ${className ?? ''}`}>
      <span className="font-serif text-3xl text-brand-200">{step}</span>
      <h3 className="mt-2 font-serif text-3xl">{title}</h3>
      <p className="mt-2 max-w-sm leading-relaxed text-muted">{children}</p>
      <div className="mt-6 flex-1">{visual}</div>
    </SpotlightCard>
  )
}

export function Engine() {
  return (
    <section id="engine" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="What I own" title="One number, owned end to end:" muted="demos per month." center>
          I run every step between a cold lead and a demo that happened.
        </SectionHeading>

        <div className="mt-16 grid gap-4 md:grid-cols-6">
          <Reveal className="md:col-span-3">
            <Tile
              step="01"
              title="Lead gen"
              visual={
                <div className="flex h-full flex-col justify-between gap-8">
                 <div className="flex flex-wrap gap-2">
                  {fit.map((f, i) => (
                    <motion.span
                      key={f}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.1 }}
                      className="inline-flex items-center gap-1.5 rounded-full border border-brand-100 bg-brand-50 px-3 py-1.5 text-[13px] font-medium text-brand-700"
                    >
                      <Check className="size-3.5" strokeWidth={3} /> {f}
                    </motion.span>
                  ))}
                 </div>
                 <div>
                  <p className="font-serif text-6xl leading-none">
                    <NumberTicker value={proof.leads} />
                    <span className="text-brand-600">+</span>
                  </p>
                  <p className="mt-1 text-[14px] text-muted">leads generated against ICP</p>
                 </div>
                </div>
              }
            >
              Pipeline built against your ICP, not a volume target.
            </Tile>
          </Reveal>

          <Reveal delay={0.08} className="md:col-span-3">
            <Tile
              step="02"
              title="Qualify and book"
              visual={
                <div>
                  <div className="grid grid-cols-7 gap-1.5">
                    {Array.from({ length: 28 }, (_, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0.4, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.15 + i * 0.03 }}
                        className={`aspect-square rounded-md ${booked.has(i) ? 'bg-brand-600' : 'bg-brand-50'}`}
                      />
                    ))}
                  </div>
                  <p className="mt-2 text-[12px] text-muted">A month of demo slots, filled (illustrative)</p>
                </div>
              }
            >
              Every lead is checked for fit and a reason to meet before it takes a slot.
            </Tile>
          </Reveal>

          <Reveal delay={0.16} className="md:col-span-4">
            <Tile
              step="03"
              title="Run the demo"
              visual={
                <ul className="space-y-2">
                  {criteria.map((c, i) => (
                    <motion.li
                      key={c}
                      initial={{ opacity: 0, x: -10 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.2 + i * 0.12 }}
                      className="flex items-center gap-3 rounded-xl border border-line bg-surface px-3 py-2.5 text-[14px]"
                    >
                      <span className="grid size-5 place-items-center rounded-full bg-brand-600 text-white">
                        <Check className="size-3" strokeWidth={3} />
                      </span>
                      {c}
                    </motion.li>
                  ))}
                </ul>
              }
            >
              Product-led demos that test buyer-agreed success criteria, not feature tours.
            </Tile>
          </Reveal>

          <Reveal delay={0.24} className="md:col-span-2">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-brand-600 p-7 text-white">
              <div className="bg-grid absolute inset-0 opacity-[0.12] [--color-line:white]" />
              <div className="relative">
                <ShieldCheck className="size-6 text-brand-200" />
                <p className="mt-4 font-serif text-3xl leading-tight">Every demo ends with a next step.</p>
              </div>
              <div className="relative mt-8">
                <p className="font-serif text-6xl leading-none">
                  <NumberTicker value={proof.demos} />+
                </p>
                <p className="mt-1 text-[14px] text-brand-100">demos delivered, logged in Fotos and Prava CRM</p>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
