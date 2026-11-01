import { motion } from 'motion/react'
import { Code2, Handshake, LineChart } from 'lucide-react'
import { Reveal } from '../components/ui/reveal'

const speaks = [
  { icon: Code2, title: 'Enough product', body: 'to scope the data.' },
  { icon: LineChart, title: 'Enough value engineering', body: 'to build the business case.' },
  { icon: Handshake, title: 'Enough sales', body: 'to get the POC funded, scoped, and signed.' },
]

const causes = [
  'Leads that were never qualified against ICP',
  'Demos that never tested a buying decision',
  "Value cases that couldn't survive the CFO's second question",
  'POCs that started without a defined next step',
]

// Lamp header adapted from Aceternity "Lamp Effect".
function Lamp() {
  return (
    <div aria-hidden className="relative mx-auto flex h-40 w-full max-w-3xl items-start justify-center overflow-hidden">
      <motion.div
        initial={{ width: '8rem', opacity: 0.4 }}
        whileInView={{ width: '28rem', opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="absolute top-0 h-px bg-gradient-to-r from-transparent via-brand-2 to-transparent"
      />
      <motion.div
        initial={{ width: '8rem', opacity: 0 }}
        whileInView={{ width: '30rem', opacity: 0.6 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="absolute top-0 h-36 rounded-full bg-[radial-gradient(ellipse_at_top,rgba(34,211,238,0.35),transparent_70%)] blur-xl"
      />
      <motion.div
        initial={{ width: '6rem' }}
        whileInView={{ width: '16rem' }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: 'easeInOut' }}
        className="absolute top-0 h-24 rounded-full bg-brand/30 blur-2xl"
      />
    </div>
  )
}

export function About() {
  return (
    <section id="about" className="relative py-24 sm:py-32">
      <Lamp />
      <div className="mx-auto -mt-24 max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-3xl text-center">
          <span className="text-xs font-medium tracking-[0.18em] text-muted uppercase">About</span>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            I sit in the gap between <span className="font-serif font-normal italic text-gradient">pipeline</span> and{' '}
            <span className="font-serif font-normal italic text-gradient">production</span>.
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted">
              I've watched too many good POCs die in the handoff between <span className="text-fg">"the demo went well"</span> and{' '}
              <span className="text-fg">"the contract is signed."</span> The cause is rarely the product. It's the GTM system around it:
            </p>
            <ul className="mt-6 space-y-2.5">
              {causes.map((c) => (
                <li key={c} className="flex gap-3 text-muted">
                  <span className="mt-2.5 h-px w-4 shrink-0 bg-leak" />
                  {c}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-lg leading-relaxed text-muted">
              I know how discouraging that is, especially when the team is already working hard. So I built my career around that gap.
            </p>
          </Reveal>

          <div className="space-y-3">
            {speaks.map((s, i) => (
              <Reveal key={s.title} delay={i * 0.1}>
                <div className="group flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 transition-colors hover:border-brand/40">
                  <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-brand/15 to-brand-2/15 text-brand transition-transform group-hover:scale-105">
                    <s.icon className="size-5" />
                  </span>
                  <p className="text-lg">
                    I speak <span className="font-semibold">{s.title.toLowerCase()}</span> <span className="text-muted">{s.body}</span>
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mx-auto mt-20 max-w-3xl text-center">
          <p className="text-2xl leading-snug font-medium tracking-tight sm:text-3xl">
            I'm not here to run more demos. I'm here to make the demos <span className="text-gradient">convert</span>
            <span className="text-muted">, and to make the funnel feel a little more manageable for the people carrying it.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
