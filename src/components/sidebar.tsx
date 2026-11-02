import { BarChart3, Database, Mail, MessageCircle } from 'lucide-react'
import { profile, proof, whatsappLink } from '../lib/content'
import { NAV } from '../lib/nav'
import { cn } from '../lib/utils'

function ProfileCard() {
  return (
    <div className="card-shadow rounded-2xl border border-line bg-white p-4">
      <div className="flex items-center gap-3">
        <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-600 font-serif text-xl text-white">SJ</span>
        <div className="min-w-0">
          <p className="truncate text-[17px] leading-tight font-semibold">{profile.name}</p>
          <p className="mt-0.5 flex items-center gap-1.5 text-[13px] text-muted">
            <span className="size-1.5 rounded-full bg-brand-600" /> {profile.role}
          </p>
        </div>
      </div>
      <p className="mt-3 text-[13px] leading-snug text-muted">{profile.focus}</p>
      <p className="mt-2 font-serif text-[1.6rem] leading-none text-ink italic">Sai Charan</p>
      <ul className="mt-3 space-y-2 border-t border-line pt-3 text-[13px] text-ink/80">
        <li className="flex items-center gap-2">
          <BarChart3 className="size-3.5 text-muted" /> {proof.leads}+ leads → {proof.demos}+ demos
        </li>
        <li className="flex items-center gap-2">
          <Database className="size-3.5 text-muted" /> Fotos + Prava CRM
        </li>
        <li className="flex items-center gap-2">
          <MessageCircle className="size-3.5 text-brand-600" /> Replies fastest on WhatsApp
        </li>
      </ul>
    </div>
  )
}

export function Sidebar({ active }: { active: string }) {
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
                'flex items-center gap-2.5 rounded-xl px-3 py-2 text-[14px] transition-colors',
                active === n.id ? 'card-shadow bg-white font-medium text-ink' : 'text-ink/70 hover:bg-white/60 hover:text-ink',
              )}
            >
              <n.icon className={cn('size-4', active === n.id ? 'text-brand-600' : 'text-muted')} /> {n.name}
            </a>
          ))}
        </nav>
        <div className="mt-auto flex gap-2">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noreferrer"
            className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-brand-600 py-3 text-[14px] font-medium text-white shadow-[0_8px_20px_-8px_rgba(31,79,224,0.7)] transition-colors hover:bg-brand-700"
          >
            <MessageCircle className="size-4" /> Book a 20-min call
          </a>
          <a href={`mailto:${profile.email}`} aria-label="Email" className="card-shadow grid w-12 place-items-center rounded-xl border border-line bg-white text-ink transition-colors hover:text-brand-600">
            <Mail className="size-4" />
          </a>
        </div>
      </aside>

      {/* Mobile: profile card, then a sticky scrollable nav */}
      <div className="px-3 pt-3 lg:hidden">
        <ProfileCard />
      </div>
      <nav className="sticky top-0 z-40 -mb-px flex gap-1 overflow-x-auto bg-page/90 px-3 py-2 backdrop-blur lg:hidden">
        {NAV.map((n) => (
          <a
            key={n.id}
            href={`#${n.id}`}
            className={cn('shrink-0 rounded-full px-3 py-1.5 text-[13px] transition-colors', active === n.id ? 'card-shadow bg-white font-medium text-ink' : 'text-ink/70')}
          >
            {n.name}
          </a>
        ))}
      </nav>
    </>
  )
}
