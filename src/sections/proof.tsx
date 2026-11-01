import { motion } from 'motion/react'
import { Database } from 'lucide-react'
import { SectionHeading } from '../components/ui/section-heading'
import { NumberTicker } from '../components/ui/number-ticker'
import { Reveal } from '../components/ui/reveal'
import { proof } from '../lib/content'

const bars = [
  { label: 'Leads', value: 198 },
  { label: 'Demos', value: 65 },
  { label: 'Conversions', value: 40 },
]

// Tremor-style funnel bar chart.
function FunnelChart() {
  const max = bars[0].value
  return (
    <div className="space-y-6">
      {bars.map((b, i) => (
        <div key={b.label}>
          <div className="mb-2 flex items-baseline justify-between text-[14px]">
            <span className="text-muted">{b.label}</span>
            <span className="font-semibold tabular-nums">
              {b.value}+
              {i > 0 && <span className="ml-2 text-[12px] font-normal text-muted">{Math.round((b.value / bars[i - 1].value) * 100)}% of previous</span>}
            </span>
          </div>
          <div className="h-2.5 overflow-hidden rounded-full bg-brand-50">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(b.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full"
              style={{ background: `var(--color-brand-${700 - i * 150})` }}
            />
          </div>
        </div>
      ))}
    </div>
  )
}

export function Proof() {
  return (
    <section id="proof" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Proof" title="The funnel can hold," muted="even when it's messy, fast-moving, and human.">
          Not vanity metrics. Evidence that someone stayed close to the handoffs and kept the CRM honest enough to trust the count.
        </SectionHeading>

        {/* Big-number row, x.ai / Sarvam style */}
        <div className="mt-16 grid grid-cols-2 border-y border-line lg:grid-cols-4">
          {proof.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08} className={`px-2 py-8 sm:px-6 ${i % 2 ? 'border-l border-line' : ''} ${i === 2 ? 'border-t border-line lg:border-t-0 lg:border-l' : ''} ${i === 3 ? 'border-t lg:border-t-0' : ''}`}>
              <div className="font-serif text-6xl leading-none text-ink sm:text-7xl">
                {p.prefix}
                <NumberTicker value={p.value} delay={0.1 * i} />
                <span className="text-brand-600">{p.suffix}</span>
              </div>
              <p className="mt-4 text-[15px] font-medium">{p.label}</p>
              <p className="mt-1 text-[14px] text-muted">{p.note}</p>
            </Reveal>
          ))}
        </div>

        <div className="mt-6 grid gap-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="card-shadow h-full rounded-3xl border border-line bg-white p-7 sm:p-8">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <p className="font-serif text-2xl">Lead → demo → conversion</p>
                <span className="rounded-full bg-brand-50 px-3 py-1 text-[12px] font-medium text-brand-700">~20% lead-to-conversion</span>
              </div>
              <div className="mt-8">
                <FunnelChart />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="relative flex h-full flex-col justify-between overflow-hidden rounded-3xl bg-brand-600 p-7 text-white sm:p-8">
              <div className="bg-grid absolute inset-0 opacity-[0.12] [--color-line:white]" />
              <div className="relative flex items-center gap-2 text-[14px] text-brand-100">
                <Database className="size-4" /> CRMs run through
              </div>
              <div className="relative mt-6 flex gap-3">
                {['Fotos', 'Prava'].map((c) => (
                  <span key={c} className="flex-1 rounded-2xl border border-white/20 bg-white/10 px-4 py-5 text-center font-serif text-3xl backdrop-blur">
                    {c}
                  </span>
                ))}
              </div>
              <p className="relative mt-6 text-[14px] leading-relaxed text-brand-100">
                Took 198+ leads through 65+ demos to 40+ reported conversions across Fotos and Prava CRM, owning the lead-gen-to-POC handoff
                end to end.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
