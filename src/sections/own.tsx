import { useRef, type RefObject } from 'react'
import { BarChart3, Factory, FlaskConical, Presentation, Target } from 'lucide-react'
import { SectionHeading } from '../components/ui/section-heading'
import { SpotlightCard } from '../components/ui/spotlight-card'
import { AnimatedBeam } from '../components/ui/animated-beam'
import { Reveal } from '../components/ui/reveal'
import { stages } from '../lib/content'

const icons = [Target, Presentation, BarChart3, FlaskConical, Factory]

export function Own() {
  const container = useRef<HTMLDivElement>(null)
  const nodes = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)]

  return (
    <section id="own" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="What I own" title="I run the GTM funnel as one connected system, not a pile of activities." center />

        {/* Pipeline with animated beams */}
        <Reveal className="mt-16">
          <div ref={container} className="relative flex flex-col items-center gap-10 md:flex-row md:justify-between md:gap-4">
            {stages.map((s, i) => {
              const Icon = icons[i]
              return (
                <div key={s.key} ref={nodes[i]} className="relative z-10 flex flex-col items-center gap-3">
                  <div className="grid size-16 place-items-center rounded-2xl border border-line bg-surface shadow-xl shadow-brand/10">
                    <Icon className="size-7 text-brand" />
                  </div>
                  <span className="text-sm font-semibold">{s.title}</span>
                </div>
              )
            })}
            <Beams container={container} nodes={nodes} />
          </div>
        </Reveal>

        <div className="mt-16 grid gap-4 md:grid-cols-6">
          {stages.map((s, i) => {
            const Icon = icons[i]
            return (
              <Reveal key={s.key} delay={i * 0.06} className={i < 2 ? 'md:col-span-3' : 'md:col-span-2'}>
                <SpotlightCard className="h-full p-6">
                  <div className="flex items-center gap-3">
                    <span className="grid size-10 place-items-center rounded-xl bg-gradient-to-br from-brand/15 to-brand-2/15 text-brand">
                      <Icon className="size-5" />
                    </span>
                    <span className="text-xs font-medium text-muted">Stage {i + 1}</span>
                  </div>
                  <h3 className="mt-5 text-xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted">{s.body}</p>
                </SpotlightCard>
              </Reveal>
            )
          })}
        </div>

        <Reveal className="mx-auto mt-16 max-w-3xl rounded-3xl border border-line bg-gradient-to-br from-brand/10 via-transparent to-brand-2/10 p-8 text-center">
          <p className="text-xl leading-relaxed font-medium sm:text-2xl">
            Most GTM operators stop at the signed POC.{' '}
            <span className="text-gradient">I stay for the part that decides whether it was worth signing</span>, and I try to make that
            part feel less lonely for everyone involved.
          </p>
        </Reveal>
      </div>
    </section>
  )
}

function Beams({ container, nodes }: { container: RefObject<HTMLDivElement | null>; nodes: RefObject<HTMLDivElement | null>[] }) {
  return (
    <>
      {nodes.slice(0, -1).map((n, i) => (
        <span key={i} className="contents">
          <span className="hidden md:contents">
            <AnimatedBeam containerRef={container} fromRef={n} toRef={nodes[i + 1]} delay={i * 0.4} curvature={i % 2 ? 30 : -30} />
          </span>
        </span>
      ))}
    </>
  )
}
