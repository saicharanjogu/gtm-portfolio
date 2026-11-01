import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail, MessageCircle } from 'lucide-react'
import { ShimmerButton } from '../components/ui/shimmer-button'
import { Reveal } from '../components/ui/reveal'
import { profile, whatsappLink } from '../lib/content'

function Linkedin({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0z" />
    </svg>
  )
}

const pill =
  'inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-6 py-3.5 text-[15px] font-medium text-white backdrop-blur transition-colors hover:bg-white/20'

export function Contact() {
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
    <section id="contact" className="relative px-4 py-16 sm:px-6 sm:py-24">
      <Reveal className="mx-auto max-w-6xl">
        <div className="relative overflow-hidden rounded-[2.25rem] bg-brand-700 px-6 py-20 text-center text-white sm:px-12 sm:py-28">
          <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_80%_70%_at_50%_0%,var(--color-brand-500),transparent)]" />
          <div aria-hidden className="bg-grid absolute inset-0 opacity-[0.12] [--color-line:white] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
          <div aria-hidden className="absolute -bottom-40 left-1/2 h-80 w-[50rem] -translate-x-1/2 rounded-full bg-brand-950/50 blur-3xl" />

          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[13px] text-brand-100">
              <span className="size-1.5 rounded-full bg-white" /> Contact
            </span>
            <h2 className="mx-auto mt-6 max-w-4xl font-serif text-5xl leading-[1.02] text-balance sm:text-7xl">
              Need more demos on the calendar? <span className="text-brand-200 italic">Tell me your monthly target.</span>
            </h2>

            <div className="mt-11 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <ShimmerButton
                href={whatsappLink}
                target="_blank"
                rel="noreferrer"
                shimmerColor="#1f4fe0"
                background="#ffffff"
                className="text-brand-700 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.4)]"
              >
                <MessageCircle className="size-4" /> DM me on WhatsApp
              </ShimmerButton>
              <a href={`mailto:${profile.email}?subject=${encodeURIComponent('Our funnel is leaking')}`} className={pill}>
                <Mail className="size-4" /> Email me
              </a>
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className={pill}>
                  <Linkedin className="size-4" /> LinkedIn <ArrowUpRight className="size-3.5" />
                </a>
              )}
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-2 text-[14px] text-brand-100 sm:flex-row sm:gap-6">
              <button onClick={copy} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                {copied ? <Check className="size-4" /> : <Copy className="size-4" />}
                {copied ? 'Copied!' : profile.email}
              </button>
              <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                <MessageCircle className="size-4" /> {profile.whatsappDisplay}
              </a>
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  )
}
