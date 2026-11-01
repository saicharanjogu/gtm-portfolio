import { ArrowRight } from 'lucide-react'
import { SectionHeading } from '../components/ui/section-heading'
import { NumberTicker } from '../components/ui/number-ticker'
import { CircularProgress } from '../components/ui/circular-progress'
import { Reveal } from '../components/ui/reveal'
import { proof } from '../lib/content'

function Big({ value, label }: { value: number; label: string }) {
  return (
    <div className="text-center">
      <p className="font-serif text-7xl leading-none sm:text-8xl">
        <NumberTicker value={value} />
        <span className="text-brand-600">+</span>
      </p>
      <p className="mt-3 text-[15px] font-medium">{label}</p>
    </div>
  )
}

function Rate({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-2">
      <CircularProgress value={value} size={116} stroke={9}>
        <span className="font-serif text-3xl text-brand-700">{value}%</span>
      </CircularProgress>
      <span className="flex items-center gap-1 text-[12px] text-muted">
        {label} <ArrowRight className="size-3" />
      </span>
    </div>
  )
}

export function Proof() {
  return (
    <section id="proof" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Proof" title="Receipts for the number I own." muted="Real counts from the Fotos and Prava CRMs." center />

        <Reveal className="card-shadow mt-14 rounded-[2rem] border border-line bg-white px-6 py-12 sm:px-10">
          <div className="grid items-center gap-10 md:grid-cols-[1fr_auto_1fr_auto_1fr] md:gap-6">
            <Big value={proof.leads} label="Leads generated" />
            <Rate value={proof.leadToDemo} label="became demos" />
            <Big value={proof.demos} label="Demos delivered" />
            <Rate value={proof.demoToConversion} label="converted" />
            <Big value={proof.conversions} label="Reported conversions" />
          </div>
          <p className="mx-auto mt-10 max-w-xl border-t border-line pt-6 text-center text-[15px] text-muted">
            <span className="font-medium text-ink">~{proof.leadToConversion}% lead-to-conversion</span> across both CRMs, with the CRM kept clean enough to trust the count.
          </p>
        </Reveal>
      </div>
    </section>
  )
}
