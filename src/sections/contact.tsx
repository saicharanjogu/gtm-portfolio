import { useState } from 'react'
import { ArrowUpRight, Check, Copy, Mail, MessageCircle } from 'lucide-react'
import { Meteors } from '../components/ui/meteors'
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
    <section id="contact" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <Reveal>
          <div className="relative overflow-hidden rounded-[2rem] border border-line bg-zinc-950 px-6 py-16 text-center text-white sm:px-12 sm:py-24">
            <Meteors number={22} />
            <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(139,92,246,0.35),transparent_60%)]" />
            <div className="relative">
              <span className="text-xs font-medium tracking-[0.18em] text-zinc-400 uppercase">Contact</span>
              <h2 className="mx-auto mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-5xl">
                If your funnel leaks between demo and paid POC,{' '}
                <span className="font-serif font-normal italic text-gradient">you don't have to untangle it alone.</span>
              </h2>

              <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
                <ShimmerButton href={whatsappLink} target="_blank" rel="noreferrer" background="linear-gradient(110deg,#059669,#10b981 50%,#0d9488)">
                  <MessageCircle className="size-4" /> DM me on WhatsApp
                </ShimmerButton>
                <a
                  href={`mailto:${profile.email}?subject=${encodeURIComponent('Our funnel is leaking')}`}
                  className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/10"
                >
                  <Mail className="size-4" /> Email me
                </a>
                {profile.linkedin && (
                  <a
                    href={profile.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3.5 text-sm font-semibold backdrop-blur transition-colors hover:bg-white/10"
                  >
                    <Linkedin className="size-4" /> LinkedIn <ArrowUpRight className="size-3.5" />
                  </a>
                )}
              </div>

              <div className="mt-10 flex flex-col items-center justify-center gap-2 text-sm text-zinc-400 sm:flex-row sm:gap-6">
                <button onClick={copy} className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  {copied ? <Check className="size-4 text-emerald-400" /> : <Copy className="size-4" />}
                  {copied ? 'Copied!' : profile.email}
                </button>
                <a href={whatsappLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-white">
                  <MessageCircle className="size-4" /> {profile.whatsappDisplay}
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
