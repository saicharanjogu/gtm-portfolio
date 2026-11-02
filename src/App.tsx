import { useEffect, useState } from 'react'
import { MobileDock, Sidebar } from './components/sidebar'
import { LiquidGlassFilter } from './components/ui/liquid-glass'
import { ScrollProgress } from './components/ui/scroll-progress'
import { NAV } from './lib/nav'
import { Hero } from './sections/hero'
import { CaseFiles, Note, Playbook, PS, Receipts, Stack } from './sections/body'
import { profile } from './lib/content'

// Highlights the nav item for the section currently in the middle of the viewport.
function useActiveSection(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter((el): el is HTMLElement => !!el)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-35% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

const IDS = NAV.map((n) => n.id)

export default function App() {
  const active = useActiveSection(IDS)
  return (
    <div className="relative isolate min-h-screen bg-page lg:flex lg:items-start lg:gap-3 lg:p-3">
      {/* One soft glow behind the profile card, so its glass has something to frost */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        <span className="absolute -top-28 -left-28 size-[30rem] rounded-full bg-[radial-gradient(closest-side,var(--color-brand-200),transparent)] opacity-90" />
      </div>
      <LiquidGlassFilter />
      <ScrollProgress />
      <Sidebar active={active} />
      <main className="relative isolate min-w-0 flex-1 overflow-hidden bg-white lg:rounded-3xl lg:border lg:border-line">
        {/* A single wash of light across the top of the whole panel, fading out: no clipped edges */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[820px] [mask-image:linear-gradient(to_bottom,black_35%,transparent)]">
          <span className="absolute -top-40 left-[8%] h-[34rem] w-[46rem] animate-drift rounded-full bg-[radial-gradient(closest-side,var(--color-brand-100),transparent)]" />
          <span className="absolute -top-24 right-[-8rem] h-[30rem] w-[34rem] animate-drift rounded-full bg-[radial-gradient(closest-side,rgba(147,180,253,0.45),transparent)] [animation-delay:-9s]" />
        </div>
        <div className="mx-auto max-w-[780px] px-5 sm:px-8">
          <Hero />
          <Stack />
          <Note />
          <Receipts />
          <CaseFiles />
          <Playbook />
          <PS />
          <footer className="flex items-center justify-between border-t border-line pt-8 pb-28 text-[13px] text-muted lg:pb-8">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <a href="#top" className="-my-2.5 py-2.5 transition-colors hover:text-ink">
              Back to top ↑
            </a>
          </footer>
        </div>
      </main>
      <MobileDock />
    </div>
  )
}
