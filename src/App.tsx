import { useEffect, useState } from 'react'
import { Sidebar } from './components/sidebar'
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
    <div className="min-h-screen bg-page lg:flex lg:items-start lg:gap-3 lg:p-3">
      <Sidebar active={active} />
      <main className="min-w-0 flex-1 bg-white lg:rounded-3xl lg:border lg:border-line">
        <div className="mx-auto max-w-[780px] px-5 sm:px-8">
          <Hero />
          <Stack />
          <Note />
          <Receipts />
          <CaseFiles />
          <Playbook />
          <PS />
          <footer className="flex items-center justify-between border-t border-line py-8 text-[13px] text-muted">
            <span>
              © {new Date().getFullYear()} {profile.name}
            </span>
            <a href="#top" className="transition-colors hover:text-ink">
              Back to top ↑
            </a>
          </footer>
        </div>
      </main>
    </div>
  )
}
