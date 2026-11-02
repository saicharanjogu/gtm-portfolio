import { useState } from 'react'
import { Check, Copy } from 'lucide-react'
import { Logo } from '../components/ui/logo'
import { H2 } from '../components/ui/h2'
import { Reveal } from '../components/ui/reveal'
import { NumberTicker } from '../components/ui/number-ticker'
import { caseFiles, pocLocks, profile, proof, stack, whatsappLink } from '../lib/content'

function Section({ id, children }: { id?: string; children: React.ReactNode }) {
  return (
    <section id={id} className="border-t border-line py-16">
      {children}
    </section>
  )
}

export function Stack() {
  return (
    <Section>
      <Reveal>
        <p className="text-[13px] font-medium text-muted">What I build with</p>
        <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
          {stack.map((s) => (
            <div key={s.name} className="flex items-center gap-2.5 rounded-xl border border-line bg-white px-3 py-2.5 transition-colors hover:border-brand-200">
              <span className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-white"><Logo name={s.name} className="size-5 text-[17px]" /></span>
              <span className="min-w-0">
                <span className="block text-[13.5px] leading-tight font-medium">{s.name}</span>
                <span className="mt-0.5 block text-[12px] leading-tight text-muted">{s.role}</span>
              </span>
            </div>
          ))}
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
          <p>
            I&apos;ve watched too many good POCs die in the handoff between &ldquo;the demo went well&rdquo; and &ldquo;the contract is signed.&rdquo; The
            cause is rarely the product. It&apos;s <span className="text-brand-600">the system around it</span>: leads never qualified against ICP, demos
            that never tested a buying decision, value cases that couldn&apos;t survive the CFO&apos;s second question.
          </p>
          <p>
            So I build the system around that gap: signal-based outbound that reaches buyers already in-market, demos that test a buying decision,
            and value cases that get the POC <span className="font-serif text-[1.08em] text-brand-600 italic">funded and signed</span>.
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
  { value: proof.leadToConversion, prefix: '~', suffix: '%', label: 'Lead-to-conversion', note: 'Tracked across Fotos and Prava CRM' },
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
          <Reveal key={r.label} delay={i * 0.06} className="border-r border-b border-line p-5 sm:p-6">
            <p className="text-4xl font-semibold tracking-tight sm:text-5xl">
              {r.prefix}
              <NumberTicker value={r.value} />
              <span className="text-brand-600">{r.suffix}</span>
            </p>
            <p className="mt-2 text-[14px] font-medium">{r.label}</p>
            <p className="mt-0.5 text-[13px] text-muted">{r.note}</p>
          </Reveal>
        ))}
      </div>
    </Section>
  )
}

export function CaseFiles() {
  return (
    <Section id="cases">
      <Reveal>
        <H2>
          Three engines, and the numbers they <em>moved</em>.
        </H2>
        <p className="mt-3 text-[15px] text-muted">Built and run inside the client&apos;s own CRM. Every figure comes from the same 198 / 65 / 40 record.</p>
      </Reveal>
      <div className="mt-8 space-y-4">
        {caseFiles.map((c, i) => (
          <Reveal key={c.title} delay={i * 0.06}>
            <article className="card-shadow grid gap-5 rounded-2xl border border-line bg-white p-5 transition-colors hover:border-brand-200 sm:grid-cols-[1fr_190px] sm:p-6">
              <div>
                <p className="text-[12px] font-medium text-brand-600">Case file 0{i + 1}</p>
                <h3 className="mt-1 text-xl font-semibold tracking-tight">{c.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted">{c.body}</p>
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
  return (
    <Section id="playbook">
      <Reveal>
        <H2>
          How I run a <em>paid POC</em>.
        </H2>
        <p className="mt-3 text-[15px] text-muted">Five things locked before kickoff, so the POC proves the purchase, not just the product.</p>
      </Reveal>
      <ul className="mt-8 divide-y divide-line border-y border-line">
        {pocLocks.map((l, i) => (
          <Reveal key={l.title} delay={i * 0.05}>
            <li className="flex flex-col gap-1 py-3.5 sm:flex-row sm:items-center sm:gap-4">
              <span className="flex items-center gap-2.5 sm:w-56 sm:shrink-0">
                <span className="grid size-5 place-items-center rounded-full bg-brand-600 text-white">
                  <Check className="size-3" strokeWidth={3} />
                </span>
                <span className="text-[15px] font-medium">{l.title}</span>
              </span>
              <span className="pl-7.5 text-[14px] text-muted sm:pl-0">{l.body}</span>
            </li>
          </Reveal>
        ))}
      </ul>
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
          If your outbound books more <em>maybe-laters</em> than demos, let&apos;s fix that.
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
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-5 py-3 text-[15px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(31,79,224,0.7)] transition-colors hover:bg-brand-700"
          >
            <Logo name="WhatsAppWhite" className="size-[18px]" /> Ping me
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="card-shadow inline-flex items-center justify-center gap-2 rounded-xl border border-line bg-white px-5 py-3 text-[15px] font-medium transition-colors hover:border-brand-200"
          >
            <Logo name="Gmail" className="size-4" /> Email me
          </a>
          <button onClick={copy} className="inline-flex items-center justify-center gap-2 px-2 text-[14px] text-muted transition-colors hover:text-ink">
            {copied ? <Check className="size-4 text-brand-600" /> : <Copy className="size-4" />}
            {copied ? 'Copied!' : profile.email}
          </button>
        </div>
      </Reveal>
    </Section>
  )
}
