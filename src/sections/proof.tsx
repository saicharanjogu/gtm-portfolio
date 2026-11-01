import { motion } from 'motion/react'
import { Database } from 'lucide-react'
import { SectionHeading } from '../components/ui/section-heading'
import { NumberTicker } from '../components/ui/number-ticker'
import { SpotlightCard } from '../components/ui/spotlight-card'
import { BorderBeam } from '../components/ui/border-beam'
import { Marquee } from '../components/ui/marquee'
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
    <div className="space-y-5">
      {bars.map((b, i) => (
        <div key={b.label}>
          <div className="mb-1.5 flex items-baseline justify-between text-sm">
            <span className="text-muted">{b.label}</span>
            <span className="font-semibold tabular-nums">
              {b.value}+
              {i > 0 && <span className="ml-2 text-xs font-normal text-muted">{Math.round((b.value / bars[i - 1].value) * 100)}% of prev</span>}
            </span>
          </div>
          <div className="h-3 overflow-hidden rounded-full bg-surface-2">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${(b.value / max) * 100}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.2 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="h-full rounded-full bg-gradient-to-r from-brand to-brand-2"
            />
          </div>
        </div>
      ))}
    </div>
  )
}

const tags = ['ICP-qualified pipeline', 'Buyer-agreed success criteria', 'Champion-ready ROI', 'Paid POCs', 'Clean CRM hygiene', 'Fotos CRM', 'Prava CRM', 'Production handoff']

export function Proof() {
  return (
    <section id="proof" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Proof" title="The funnel can hold, even when it's messy, fast-moving, and human.">
          Not vanity metrics. Evidence that someone stayed close to the handoffs and kept the CRM honest enough to trust the count.
        </SectionHeading>

        <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {proof.map((p, i) => (
            <Reveal key={p.label} delay={i * 0.08}>
              <SpotlightCard className="h-full p-6" color={i === 3 ? 'rgba(34,211,238,0.18)' : undefined}>
                <div className="text-4xl font-semibold tracking-tight sm:text-5xl">
                  {p.prefix}
                  <NumberTicker value={p.value} delay={0.1 * i} />
                  <span className="text-gradient">{p.suffix}</span>
                </div>
                <p className="mt-3 font-medium">{p.label}</p>
                <p className="mt-1 text-sm text-muted">{p.note}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-5">
          <Reveal className="lg:col-span-3">
            <div className="relative h-full overflow-hidden rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <BorderBeam duration={10} />
              <div className="flex items-center justify-between">
                <p className="font-semibold">Lead → demo → conversion</p>
                <span className="rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-500">~20% lead-to-conversion</span>
              </div>
              <div className="mt-8">
                <FunnelChart />
              </div>
            </div>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-2">
            <div className="flex h-full flex-col justify-between rounded-2xl border border-line bg-surface p-6 sm:p-8">
              <div className="flex items-center gap-2 text-sm text-muted">
                <Database className="size-4" /> CRMs run through
              </div>
              <div className="mt-6 flex gap-3">
                {['Fotos', 'Prava'].map((c) => (
                  <span key={c} className="flex-1 rounded-xl border border-line bg-surface-2 px-4 py-5 text-center text-xl font-semibold">
                    {c}
                  </span>
                ))}
              </div>
              <p className="mt-6 text-sm leading-relaxed text-muted">
                Took 198+ leads through 65+ demos to 40+ reported conversions across Fotos and Prava CRM, owning the lead-gen-to-POC handoff
                end to end.
              </p>
            </div>
          </Reveal>
        </div>

        <Marquee className="mt-14" duration="40s">
          {tags.map((t) => (
            <span key={t} className="text-lg font-medium whitespace-nowrap text-muted">
              <span className="mr-10 text-brand">✦</span>
              {t}
            </span>
          ))}
        </Marquee>
      </div>
    </section>
  )
}
