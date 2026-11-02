import { useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { BriefcaseBusiness, MapPin, Zap } from 'lucide-react'
import { Logo } from './ui/logo'
import { profile, whatsappLink } from '../lib/content'
import { NAV } from '../lib/nav'
import { cn } from '../lib/utils'

function ProfileCard() {
  return (
    <div className="liquid-glass rounded-2xl p-4 [--lg-tint:0.6]">
      <div className="flex items-center gap-3">
        <img
          src="/profile.jpg"
          alt="Sai Charan Jogu"
          width={48}
          height={48}
          className="size-12 shrink-0 rounded-xl object-cover shadow-[0_0_0_2px_white,0_4px_12px_-4px_rgba(15,28,69,0.35)]"
        />
        <div className="min-w-0">
          <p className="truncate text-[17px] leading-tight font-semibold">{profile.name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-muted">
            <span className="size-1.5 rounded-full bg-brand-600" /> {profile.role}
          </p>
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-snug text-muted">{profile.focus}</p>
      <p className="mt-2 font-hand text-[1.75rem] leading-none font-semibold text-ink">Sai Charan</p>
      <ul className="mt-3 space-y-2 border-t border-white/70 pt-3 text-[13px] text-ink/80">
        <li className="flex items-center gap-2">
          <MapPin className="size-3.5 text-muted" /> Hyderabad, India
        </li>
        <li className="flex items-center gap-2">
          <BriefcaseBusiness className="size-3.5 text-muted" /> 3 yrs in B2B GTM
        </li>
        <li className="flex items-center gap-2">
          <Zap className="size-3.5 text-brand-600" /> Open to full-time and fractional roles
        </li>
      </ul>
    </div>
  )
}

const PILL = { type: 'spring', stiffness: 420, damping: 36 } as const

export function Sidebar({ active }: { active: string }) {
  // Keep the active link in view inside the horizontally scrolling mobile nav.
  const mobileNav = useRef<HTMLElement>(null)
  useEffect(() => {
    const nav = mobileNav.current
    const el = nav?.querySelector<HTMLElement>(`[data-id="${active}"]`)
    if (nav && el) nav.scrollTo({ left: el.offsetLeft - nav.clientWidth / 2 + el.clientWidth / 2, behavior: 'smooth' })
  }, [active])

  return (
    <>
      {/* Desktop: sticky profile + nav, as in the Quota template */}
      <aside className="sticky top-3 hidden h-[calc(100vh-1.5rem)] w-[272px] shrink-0 flex-col lg:flex">
        <ProfileCard />
        <nav className="mt-5 space-y-0.5">
          {NAV.map((n) => (
            <a
              key={n.id}
              href={`#${n.id}`}
              className={cn(
                'relative isolate flex items-center gap-2.5 rounded-xl px-3 py-2 text-[14px] transition-colors',
                active === n.id ? 'font-medium text-ink' : 'text-ink/70 hover:text-ink',
              )}
            >
              {/* One glass pill that glides to the active section (Motion Primitives "Animated Background") */}
              {active === n.id && <motion.span layoutId="nav-pill" transition={PILL} className="liquid-glass absolute inset-0 -z-10 rounded-xl [--lg-tint:0.85]" />}
              <n.icon className={cn('size-4', active === n.id ? 'text-brand-600' : 'text-muted')} /> {n.name}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="btn-shimmer flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-[14px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(31,79,224,0.7)] transition-colors hover:bg-brand-700"
          >
            <Logo name="WhatsAppWhite" className="size-[18px]" /> Ping me
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="card-shadow grid w-12 place-items-center rounded-xl border border-line bg-white text-ink transition-colors hover:text-brand-600">
            <Logo name="Gmail" className="size-4" />
          </a>
        </div>
      </aside>

      {/* Mobile: profile card, then a sticky scrollable nav */}
      <div className="px-3 pt-3 lg:hidden">
        <ProfileCard />
      </div>
      <div className="sticky top-2 z-40 px-3 pt-2 lg:hidden">
        <nav ref={mobileNav} className="liquid-glass flex gap-1 overflow-x-auto rounded-full p-1 [scrollbar-width:none] [mask-image:linear-gradient(to_right,black_88%,transparent)]">
          {NAV.map((n) => (
            <a
              key={n.id}
              data-id={n.id}
              href={`#${n.id}`}
              className={cn('relative isolate shrink-0 rounded-full px-3.5 py-2 text-[13px] transition-colors', active === n.id ? 'font-medium text-white' : 'text-ink/75')}
            >
              {active === n.id && <motion.span layoutId="nav-pill-mobile" transition={PILL} className="absolute inset-0 -z-10 rounded-full bg-brand-600" />}
              {n.name}
            </a>
          ))}
        </nav>
      </div>
    </>
  )
}

// Mobile only: a floating glass dock with the main CTA, shown once the hero's own CTA has scrolled away.
export function MobileDock() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 640)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <motion.div
      initial={false}
      animate={show ? { y: 0, opacity: 1 } : { y: 90, opacity: 0 }}
      transition={{ type: 'spring', stiffness: 320, damping: 30 }}
      className="fixed inset-x-3 bottom-3 z-50 lg:hidden"
      aria-hidden={!show}
    >
      <div className="liquid-glass mx-auto flex max-w-md items-center gap-2 rounded-2xl p-2">
        <a
          href={whatsappLink}
          target="_blank"
          rel="noreferrer"
          tabIndex={show ? 0 : -1}
          className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-[14px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(31,79,224,0.7)]"
        >
          <Logo name="WhatsAppWhite" className="size-[18px]" />
          Ping me
        </a>
        <a href={`mailto:${profile.email}`} tabIndex={show ? 0 : -1} aria-label="Email" className="grid size-11 place-items-center rounded-xl bg-white/70">
          <Logo name="Gmail" className="size-4" />
        </a>
      </div>
    </motion.div>
  )
}
