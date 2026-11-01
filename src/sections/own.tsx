import { useRef } from 'react'
import { BarChart3, Factory, FlaskConical, Presentation, Target } from 'lucide-react'
import { SectionHeading } from '../components/ui/section-heading'
import { SpotlightCard } from '../components/ui/spotlight-card'
import { AnimatedBeam } from '../components/ui/animated-beam'
import { Reveal } from '../components/ui/reveal'
import { stages } from '../lib/content'
import { cn } from '../lib/utils'

const icons = [Target, Presentation, BarChart3, FlaskConical, Factory]

export function Own() {
  const container = useRef<HTMLDivElement>(null)
  const n0 = useRef<HTMLDivElement>(null)
  const n1 = useRef<HTMLDivElement>(null)
  const n2 = useRef<HTMLDivElement>(null)
  const n3 = useRef<HTMLDivElement>(null)
  const n4 = useRef<HTMLDivElement>(null)
  const nodes = [n0, n1, n2, n3, n4]

  return (
    <section id="own" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="What I own" title="One connected system," muted="not a pile of activities." center>
          Lead gen → Demos → Value engineering → Paid POC → Production
        </SectionHeading>

        {/* Pipeline with animated beams (Magic UI) */}
        <Reveal className="mt-16">
          <div ref={container} className="relative flex flex-col items-center gap-8 md:flex-row md:justify-between md:gap-4">
            {stages.map((s, i) => {
              const Icon = icons[i]
              const last = i === stages.length - 1
              return (
                <div key={s.key} ref={nodes[i]} className="relative z-10 flex flex-col items-center gap-3">
                  <div
                    className={cn(
                      'card-shadow grid size-16 place-items-center rounded-2xl border',
                      last ? 'border-brand-600 bg-brand-600 text-white' : 'border-line bg-white text-brand-600',
                    )}
                  >
                    <Icon className="size-7" strokeWidth={1.6} />
                  </div>
                  <span className="text-[14px] font-medium">{s.title}</span>
                </div>
              )
            })}
            <div className="hidden md:contents">
              {nodes.slice(0, -1).map((n, i) => (
                <AnimatedBeam key={i} containerRef={container} fromRef={n} toRef={nodes[i + 1]} delay={i * 0.4} curvature={i % 2 ? 24 : -24} />
              ))}
            </div>
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-6">
          {stages.map((s, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={s.key} delay={i * 0.06} className={i < 2 ? 'md:col-span-3' : 'md:col-span-2'}>
                <SpotlightCard className="h-full p-7">
                  <div className="flex items-center justify-between">
                    <span className="grid size-11 place-items-center rounded-2xl bg-brand-50 text-brand-600">
                      <Icon className="size-5" strokeWidth={1.8} />
                    </span>
                    <span className="font-serif text-3xl text-brand-200">0{i + 1}</span>
                  </div>
                  <h3 className="mt-6 font-serif text-3xl">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mx-auto mt-16 max-w-4xl text-center">
          <p className="font-serif text-3xl leading-snug sm:text-4xl">
            Most GTM operators stop at the signed POC. <span className="text-blue-gradient italic">I stay for the part that decides whether it was worth signing</span>
            <span className="text-muted/70">, and I try to make that part feel less lonely for everyone involved.</span>
          </p>
        </Reveal>
      </div>
    </section>
  )
}
