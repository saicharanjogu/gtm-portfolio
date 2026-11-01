import { Code2, Handshake, LineChart } from 'lucide-react'
import { Reveal } from '../components/ui/reveal'
import { Eyebrow } from '../components/ui/section-heading'
import { SpotlightCard } from '../components/ui/spotlight-card'

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

export function About() {
  return (
    <section id="about" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute top-0 left-1/2 h-80 w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,var(--color-brand-100),transparent)] blur-2xl" />
      <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
        <Reveal className="mx-auto max-w-4xl text-center">
          <Eyebrow>About</Eyebrow>
          <h2 className="mt-6 font-serif text-5xl leading-[1.02] text-balance sm:text-7xl">
            I sit in the gap between <span className="text-blue-gradient italic">pipeline</span> and{' '}
            <span className="text-blue-gradient italic">production.</span>
          </h2>
        </Reveal>

        <div className="mt-16 grid gap-10 lg:grid-cols-2">
          <Reveal>
            <p className="text-lg leading-relaxed text-muted">
              I've watched too many good POCs die in the handoff between <span className="text-ink">"the demo went well"</span> and{' '}
              <span className="text-ink">"the contract is signed."</span> The cause is rarely the product. It's the GTM system around it:
            </p>
            <ul className="mt-6 divide-y divide-line border-y border-line">
              {causes.map((c, i) => (
                <li key={c} className="flex items-baseline gap-4 py-3.5">
                  <span className="font-serif text-lg text-brand-400">0{i + 1}</span>
                  <span>{c}</span>
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
                <SpotlightCard className="rounded-2xl p-5">
                  <div className="flex items-center gap-4">
                    <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                      <s.icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <p className="text-lg">
                      I speak <span className="font-semibold">{s.title.toLowerCase()}</span> <span className="text-muted">{s.body}</span>
                    </p>
                  </div>
                </SpotlightCard>
              </Reveal>
            ))}
          </div>
        </div>

        <Reveal className="mx-auto mt-24 max-w-4xl text-center">
          <p className="font-serif text-4xl leading-tight sm:text-5xl">
            I'm not here to run more demos. I'm here to make the demos <span className="text-blue-gradient italic">convert</span>
            <span className="text-muted/70">, and to make the funnel feel a little more manageable for the people carrying it.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
