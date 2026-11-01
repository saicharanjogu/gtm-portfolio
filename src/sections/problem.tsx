import { motion } from 'motion/react'
import { AlertTriangle } from 'lucide-react'
import { SectionHeading } from '../components/ui/section-heading'
import { TextReveal } from '../components/ui/text-reveal'
import { Reveal } from '../components/ui/reveal'
import { stallReasons } from '../lib/content'

const funnel = [
  { label: 'Leads in', w: 100 },
  { label: 'Demos booked', w: 78 },
  { label: 'Champion excited', w: 60 },
  { label: 'POC kicks off', w: 44 },
  { label: 'Production', w: 18 },
]

function LeakyFunnel() {
  return (
    <div className="relative rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <p className="text-xs font-medium tracking-[0.18em] text-muted uppercase">Where deals quietly slip</p>
      <div className="mt-6 space-y-3">
        {funnel.map((f, i) => (
          <div key={f.label} className="relative">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${f.w}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
              className="mx-auto flex h-11 items-center justify-center rounded-xl bg-gradient-to-r from-brand/80 to-brand-2/80 text-xs font-semibold whitespace-nowrap text-white shadow-lg shadow-brand/10"
            >
              {f.w > 30 && f.label}
            </motion.div>
            {f.w <= 30 && <p className="mt-1 text-center text-xs font-semibold">{f.label}</p>}
            {i > 0 && i < funnel.length && (
              <span aria-hidden className="absolute top-full -right-1 h-6 w-2 sm:right-2">
                <span className="absolute left-0 size-1.5 animate-drip rounded-full bg-leak" style={{ animationDelay: `${i * 0.4}s` }} />
              </span>
            )}
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-start gap-2 rounded-xl border border-leak/30 bg-leak/10 p-3 text-sm text-leak">
        <AlertTriangle className="mt-0.5 size-4 shrink-0" />
        <span>Every handoff is a place for momentum to drain out.</span>
      </div>
    </div>
  )
}

export function Problem() {
  return (
    <section id="problem" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading
          eyebrow="The GTM problem"
          title={
            <>
              It's not that your team isn't working hard enough.{' '}
              <span className="text-muted">It's that the funnel has too many handoffs and not enough hands.</span>
            </>
          }
        />

        <div className="mt-16 grid items-start gap-12 lg:grid-cols-2">
          <div>
            <TextReveal
              className="text-2xl leading-snug font-medium tracking-tight sm:text-3xl"
              text="Leads come in. Demos get booked. Your champion is excited. Then the POC stalls, and it rarely feels like anyone's fault."
            />
            <ul className="mt-10 space-y-3">
              {stallReasons.map((r, i) => (
                <Reveal key={r} delay={i * 0.08}>
                  <li className="flex items-start gap-3 rounded-xl border border-line bg-surface px-4 py-3 text-muted">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-leak" />
                    {r}
                  </li>
                </Reveal>
              ))}
            </ul>
            <Reveal delay={0.3}>
              <p className="mt-8 text-lg text-muted">
                Everyone meant well. <span className="font-medium text-fg">The deal still slipped.</span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <LeakyFunnel />
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-20 max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-muted">
            That's a heavy place to work from. You're managing buyers, champions, technical teams, and commercial next steps, often all at
            once. You don't need another dashboard. You need someone who understands the pressure and can take ownership of the handoffs that
            keep falling through.
          </p>
          <p className="mt-6 font-serif text-3xl italic sm:text-4xl">That's the work I do.</p>
        </Reveal>
      </div>
    </section>
  )
}
