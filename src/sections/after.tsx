import { SectionHeading } from '../components/ui/section-heading'
import { SpotlightCard } from '../components/ui/spotlight-card'
import { Reveal } from '../components/ui/reveal'
import { pocLocks } from '../lib/content'

export function After() {
  return (
    <section id="after" className="relative bg-surface py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="After the demo" title="Most POCs stall before production." muted="So I lock five things before kickoff." center />
        <div className="mt-14 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
          {pocLocks.map((l, i) => (
            <Reveal key={l.title} delay={i * 0.06}>
              <SpotlightCard className="h-full rounded-2xl p-5">
                <span className="font-serif text-2xl text-brand-300">0{i + 1}</span>
                <p className="mt-3 font-serif text-2xl leading-tight">{l.title}</p>
                <p className="mt-2 text-[14px] leading-relaxed text-muted">{l.body}</p>
              </SpotlightCard>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
