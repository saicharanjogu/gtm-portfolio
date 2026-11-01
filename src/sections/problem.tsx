import { motion } from 'motion/react'
import { ClipboardX, Database, ShieldAlert, UserX } from 'lucide-react'
import { SectionHeading } from '../components/ui/section-heading'
import { TextReveal } from '../components/ui/text-reveal'
import { Reveal } from '../components/ui/reveal'
import { SpotlightCard } from '../components/ui/spotlight-card'
import { stallReasons } from '../lib/content'

const reasonIcons = [Database, ClipboardX, UserX, ShieldAlert]

const funnel = [
  { label: 'Leads in', w: 100 },
  { label: 'Demos booked', w: 80 },
  { label: 'Champion excited', w: 62 },
  { label: 'POC kicks off', w: 46 },
  { label: 'Production', w: 20 },
]

function LeakyFunnel() {
  return (
    <div className="card-shadow relative h-full overflow-hidden rounded-3xl border border-line bg-white p-6 sm:p-8">
      <div className="bg-dots absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="relative">
        <p className="text-[13px] font-medium text-muted">Where deals quietly slip</p>
        <div className="mt-6 space-y-3">
          {funnel.map((f, i) => (
            <div key={f.label} className="relative">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${f.w}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                className="mx-auto flex h-11 items-center justify-center rounded-xl text-[13px] font-medium whitespace-nowrap text-white"
                style={{ background: `var(--color-brand-${800 - i * 100})` }}
              >
                {f.w > 30 && f.label}
              </motion.div>
              {f.w <= 30 && <p className="mt-1.5 text-center text-[13px] font-medium">{f.label}</p>}
              {i > 0 && (
                <span aria-hidden className="absolute top-full right-[8%] h-6 w-2">
                  <span className="absolute left-0 size-1.5 animate-drip rounded-full bg-brand-300" style={{ animationDelay: `${i * 0.45}s` }} />
                </span>
              )}
            </div>
          ))}
        </div>
        <p className="mt-6 rounded-2xl bg-brand-50 px-4 py-3 text-[14px] text-brand-900">Every handoff is a place for momentum to drain out.</p>
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
          title="It's not that your team isn't working hard enough."
          muted="It's that the funnel has too many handoffs and not enough hands."
        />

        <div className="mt-16 grid items-stretch gap-5 lg:grid-cols-[1.1fr_1fr]">
          <div className="flex flex-col">
            <TextReveal
              className="font-serif text-3xl leading-tight sm:text-4xl"
              text="Leads come in. Demos get booked. Your champion is excited. Then the POC stalls, and it rarely feels like anyone's fault."
            />
            <div className="mt-10 grid gap-3 sm:grid-cols-2">
              {stallReasons.map((r, i) => {
                const Icon = reasonIcons[i]
                return (
                  <Reveal key={r} delay={i * 0.08}>
                    <SpotlightCard className="h-full rounded-2xl p-5">
                      <Icon className="size-5 text-brand-600" />
                      <p className="mt-3 text-[15px] leading-snug">{r}</p>
                    </SpotlightCard>
                  </Reveal>
                )
              })}
            </div>
            <Reveal delay={0.3}>
              <p className="mt-8 text-lg text-muted">
                Everyone meant well. <span className="font-semibold text-ink">The deal still slipped.</span>
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <LeakyFunnel />
          </Reveal>
        </div>

        <Reveal className="mx-auto mt-24 max-w-3xl text-center">
          <p className="text-lg leading-relaxed text-muted">
            That's a heavy place to work from. You're managing buyers, champions, technical teams, and commercial next steps, often all at
            once. You don't need another dashboard. You need someone who understands the pressure and can take ownership of the handoffs that
            keep falling through.
          </p>
          <p className="mt-8 font-serif text-4xl italic sm:text-5xl">
            That's the work <span className="text-blue-gradient">I do.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
