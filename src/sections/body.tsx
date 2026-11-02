import { useRef, useState } from 'react'
import { motion, useScroll, useSpring } from 'motion/react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { Logo } from '../components/ui/logo'
import { ProductMark } from '../components/ui/product-mark'
import { H2 } from '../components/ui/h2'
import { Reveal } from '../components/ui/reveal'
import { NumberTicker } from '../components/ui/number-ticker'
import { Marquee } from '../components/ui/marquee'
import { TextReveal } from '../components/ui/text-reveal'
import { BarList } from '../components/ui/bar-list'
import { caseFiles, pocLocks, products, profile, proof, stack, whatsappLink } from '../lib/content'

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-line py-12 sm:py-16">
      {children}
    </section>
  )
}

const CAPABILITIES = ['Buying-signal detection', 'Enrichment waterfalls', 'ICP scoring', 'Lead routing', 'Signal-based sequences', 'Value engineering', 'Paid POC scoping', 'CRM hygiene']

export function Stack() {
  return (
    <Section>
      <Reveal>
        <p className="text-[13px] font-medium text-muted">What I build with</p>
        <div className="mt-4 -mx-5 space-y-3 sm:-mx-8">
          <Marquee duration="45s">
            {stack.map((s) => (
              <div key={s.name} className="flex items-center gap-2.5 rounded-xl border border-line bg-white py-2 pr-4 pl-2 transition-colors hover:border-brand-200">
                <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white">
                  <Logo name={s.name} className="size-5 text-[17px]" />
                </span>
                <span className="whitespace-nowrap">
                  <span className="block text-[13.5px] leading-tight font-medium">{s.name}</span>
                  <span className="mt-0.5 block text-[12px] leading-tight text-muted">{s.role}</span>
                </span>
              </div>
            ))}
          </Marquee>
          <Marquee reverse duration="55s">
            {CAPABILITIES.map((c) => (
              <span key={c} className="inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3.5 py-2 text-[13px] font-medium whitespace-nowrap text-brand-800">
                <Check className="size-3.5" strokeWidth={3} /> {c}
              </span>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </Section>
  )
}

export function Note() {
  return (
    <Section>
      <Reveal>
        <H2>
          A <em>short note</em>, before the numbers.
        </H2>
        <div className="mt-6 space-y-4 text-[17px] leading-relaxed text-ink/80">
          <TextReveal
            className="text-[19px] leading-relaxed font-medium text-ink sm:text-[21px]"
            highlight={['system', 'around', 'it']}
            text="I’ve watched too many good POCs die in the handoff between “the demo went well” and “the contract is signed.” The cause is rarely the product. It’s the system around it: leads never qualified against ICP, demos that never tested a buying decision, value cases that couldn’t survive the CFO’s second question."
          />
          <p>
            So I build the system around that gap: signal-based outbound that reaches buyers already in-market, demos that test a buying decision,
            and value cases that get the POC <span className="font-serif text-[1.08em] text-brand-600 italic">funded and signed</span>. Most recently I&apos;ve
            done it for SaaS products:{' '}
            {products.map((p, i) => (
              <span key={p.mark}>
                <a href={p.url} target="_blank" rel="noreferrer" className="font-medium text-ink underline decoration-brand-200 underline-offset-4 transition-colors hover:decoration-brand-600">
                  {p.name}
                </a>
                {i < products.length - 2 ? ', ' : i === products.length - 2 ? ' and ' : '.'}
              </span>
            ))}
          </p>
        </div>
        <p className="mt-7 flex items-baseline gap-3">
          <span className="font-hand text-[2rem] leading-none font-semibold text-ink/85">Sai Charan</span>
          <span className="text-[12px] text-muted">
            {profile.name}, {profile.role}
          </span>
        </p>
      </Reveal>
    </Section>
  )
}

const receipts = [
  { value: proof.leads, suffix: '+', label: 'Leads generated', note: 'Qualified against ICP, not a volume list' },
  { value: proof.demos, suffix: '+', label: 'High-intent demos', note: `${proof.leadToDemo}% of leads became a held demo` },
  { value: proof.conversions, suffix: '+', label: 'Reported conversions', note: `${proof.demoToConversion}% of demos moved to a next step` },
  { value: proof.leadToConversion, prefix: '~', suffix: '%', label: 'Lead-to-conversion', note: 'Across PRAVA CRM and Fotos' },
]

export function Receipts() {
  return (
    <Section id="receipts">
      <Reveal>
        <H2>
          The <em>receipts</em>.
        </H2>
      </Reveal>
      <div className="mt-8 grid grid-cols-2 border-t border-l border-line">
        {receipts.map((r, i) => (
          <Reveal key={r.label} delay={i * 0.06} className="border-r border-b border-line p-4 sm:p-6">
            <p className="text-[2rem] leading-none font-semibold tracking-tight sm:text-5xl">
              {r.prefix}
              <NumberTicker value={r.value} />
              <span className="text-brand-600">{r.suffix}</span>
            </p>
            <p className="mt-2 text-[14px] font-medium">{r.label}</p>
            <p className="mt-0.5 text-[13px] text-muted">{r.note}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-8">
        <p className="mb-3 text-[13px] font-medium text-muted">The funnel behind the numbers</p>
        <BarList
          items={[
            { name: 'Leads generated', value: proof.leads, note: 'qualified vs ICP', tone: 'bg-brand-100' },
            { name: 'High-intent demos', value: proof.demos, note: `${proof.leadToDemo}% of leads`, tone: 'bg-brand-200' },
            { name: 'Conversions', value: proof.conversions, note: `${proof.demoToConversion}% of demos`, tone: 'bg-brand-300' },
          ]}
        />
      </Reveal>
    </Section>
  )
}

export function CaseFiles() {
  return (
    <Section id="cases">
      <Reveal>
        <H2>
          Three products, and the numbers they <em>moved</em>.
        </H2>
        <p className="mt-3 text-[15px] text-muted">Products I took to market, and what each one proves for startups and enterprise teams. The 198 / 65 / 40 record comes from PRAVA CRM and Fotos; BookMore is in beta.</p>
      </Reveal>
      <div className="mt-8 space-y-4">
        {caseFiles.map((c, i) => (
          <Reveal key={c.product.mark} delay={i * 0.06}>
            <article
              onPointerMove={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`)
                e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`)
              }}
              className="spotlight card-shadow grid gap-5 rounded-2xl border border-line bg-white p-4 transition-colors hover:border-brand-200 sm:grid-cols-[1fr_190px] sm:p-6"
            >
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <ProductMark mark={c.product.mark} className="size-8 text-[15px]" />
                  <span className="text-[15px] font-semibold">{c.product.name}</span>
                  <a
                    href={c.product.url}
                    target="_blank"
                    rel="noreferrer"
                    className="-my-2 inline-flex items-center gap-0.5 py-2 text-[12px] text-muted transition-colors hover:text-brand-600"
                  >
                    {c.product.host} <ArrowUpRight className="size-3" />
                  </a>
                  <span className="ml-auto hidden text-[12px] font-medium text-brand-600 sm:inline">Case file 0{i + 1}</span>
                </div>
                <h3 className="mt-3 text-lg leading-snug font-semibold tracking-tight sm:text-xl">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.body}</p>
                <p className="mt-3 rounded-lg bg-brand-50 px-3 py-2 text-[13.5px] leading-snug text-brand-900">
                  <span className="font-semibold">For startups and enterprises:</span> {c.applies}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-4 rounded-xl bg-surface p-4 sm:grid-cols-1 sm:gap-0 sm:divide-y sm:divide-line">
                {c.stats.map((s) => (
                  <div key={s.label} className="sm:py-2.5 sm:first:pt-0 sm:last:pb-0">
                    <p className="text-2xl font-semibold tracking-tight">{s.value}</p>
                    <p className="text-[12px] text-muted">{s.label}</p>
                  </div>
                ))}
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function Playbook() {
  const timeline = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: timeline, offset: ['start 0.8', 'end 0.55'] })
  const fill = useSpring(scrollYProgress, { stiffness: 160, damping: 30 })
  return (
    <Section id="playbook">
      <Reveal>
        <H2>
          How I run a <em>paid POC</em>.
        </H2>
        <p className="mt-3 text-[15px] text-muted">Five things locked before kickoff, so the POC proves the purchase, not just the product.</p>
      </Reveal>
      <ol ref={timeline} className="relative mt-8 space-y-6 pl-10">
        <span aria-hidden className="absolute top-3 bottom-3 left-[11px] w-0.5 rounded-full bg-brand-100" />
        <motion.span aria-hidden style={{ scaleY: fill }} className="absolute top-3 bottom-3 left-[11px] w-0.5 origin-top rounded-full bg-brand-600" />
        {pocLocks.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.05}>
            <li className="relative">
              <span className="absolute top-0.5 -left-10 grid size-6 place-items-center rounded-full bg-brand-600 text-[11px] font-semibold text-white ring-4 ring-white">
                {i + 1}
              </span>
              <p className="text-[16px] font-semibold tracking-tight">{l.title}</p>
              <p className="mt-0.5 text-[14.5px] text-muted">{l.body}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  )
}

export function PS() {
  const [copied, setCopied] = useState(false)
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      window.location.href = `mailto:${profile.email}`
    }
  }
  return (
    <Section id="contact">
      <Reveal>
        <p className="font-serif text-3xl text-brand-600 italic">P.S.</p>
        <H2 className="mt-2">
          If your outbound books more <em className="whitespace-nowrap">maybe-laters</em> than demos, let&apos;s fix that.
        </H2>
        <p className="mt-4 max-w-xl text-[17px] leading-relaxed text-muted">
          Twenty minutes, no deck. Tell me your ICP and demo target and I&apos;ll tell you which signals I&apos;d wire up first, even if we never work
          together.
        </p>
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="btn-shimmer inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-[15px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(31,79,224,0.7)] transition-colors hover:bg-brand-700"
          >
            <Logo name="WhatsAppWhite" className="size-[18px]" /> Ping me
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="card-shadow inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-[15px] font-medium transition-colors hover:border-brand-200"
          >
            <Logo name="Gmail" className="size-4" /> Email me
          </a>
          <button onClick={copy} className="inline-flex items-center justify-center gap-2 px-2 py-2.5 text-[14px] text-muted transition-colors hover:text-ink">
            {copied ? <Check className="size-4 text-brand-600" /> : <Copy className="size-4" />}
            {copied ? 'Copied!' : profile.email}
          </button>
        </div>
      </Reveal>
    </Section>
  )
}
