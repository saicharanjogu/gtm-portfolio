import { BarChart3, Code2, Database, Presentation, Target, Handshake } from 'lucide-react'
import { SectionHeading } from '../components/ui/section-heading'
import { Orbit, type OrbitItem } from '../components/ui/orbit'
import { TiltCard } from '../components/ui/tilt-card'
import { Reveal } from '../components/ui/reveal'

const ic = 'size-5'
const items: OrbitItem[] = [
  { icon: <Target className={ic} />, label: 'ICP & lead gen', ring: 0, angle: 0 },
  { icon: <Presentation className={ic} />, label: 'Demos', ring: 0, angle: 120 },
  { icon: <Database className={ic} />, label: 'CRM hygiene', ring: 0, angle: 240 },
  { icon: <Code2 className={ic} />, label: 'Product depth', ring: 1, angle: 60 },
  { icon: <BarChart3 className={ic} />, label: 'ROI case', ring: 1, angle: 180 },
  { icon: <Handshake className={ic} />, label: 'Closing the next step', ring: 1, angle: 300 },
]

const hats = [
  {
    tag: 'Product',
    title: 'I can answer the hard question live.',
    body: 'I know the product well enough to demo it, scope the data and speak to the technical buyer.',
    icon: Code2,
  },
  {
    tag: 'GTM',
    title: 'I make sure there is a buyer behind it.',
    body: 'I run lead gen, qualification, the value case and the CRM, so every demo has a reason to exist.',
    icon: Target,
  },
]

export function Role() {
  return (
    <section id="role" className="relative overflow-hidden py-24 sm:py-32">
      <div aria-hidden className="absolute top-1/2 left-0 h-[34rem] w-[34rem] -translate-x-1/3 -translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,var(--color-brand-100),transparent)] blur-2xl" />
      <div className="relative mx-auto grid max-w-6xl items-center gap-14 px-4 sm:px-6 lg:grid-cols-2">
        <Reveal>
          <Orbit
            center={
              <div className="grid size-28 place-items-center rounded-full bg-brand-600 text-center text-white shadow-[0_20px_50px_-12px_rgba(31,79,224,0.6)]">
                <span className="font-serif text-[1.35rem] leading-[1.05]">
                  Demos
                  <br />
                  <span className="italic">per month</span>
                </span>
              </div>
            }
            items={items}
          />
        </Reveal>

        <div>
          <SectionHeading eyebrow="The role" title="Product and GTM in one seat," muted="so demos are accurate and convert." />
          <div className="mt-10 grid gap-4 sm:grid-cols-2">
            {hats.map((h) => (
              <Reveal key={h.tag}>
                <TiltCard className="p-6">
                  <span className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1 text-[12px] font-medium text-brand-700">
                    <h.icon className="size-3.5" /> {h.tag}
                  </span>
                  <p className="mt-4 font-serif text-2xl leading-tight">{h.title}</p>
                  <p className="mt-2 text-[14px] leading-relaxed text-muted">{h.body}</p>
                </TiltCard>
              </Reveal>
            ))}
          </div>
          <Reveal>
            <p className="mt-6 text-[15px] text-muted">No handoff between the person who books the demo and the person who can answer for it.</p>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
