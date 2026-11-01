import { FloatingNav } from './components/ui/floating-nav'
import { Hero } from './sections/hero'
import { Engine } from './sections/engine'
import { Proof } from './sections/proof'
import { Role } from './sections/role'
import { After } from './sections/after'
import { Contact } from './sections/contact'
import { profile } from './lib/content'

const nav = [
  { name: 'What I own', href: '#engine' },
  { name: 'Proof', href: '#proof' },
  { name: 'Role', href: '#role' },
  { name: 'After the demo', href: '#after' },
]

export default function App() {
  return (
    <>
      <FloatingNav items={nav} brand={profile.name} />
      <main>
        <Hero />
        <Engine />
        <Proof />
        <Role />
        <After />
        <Contact />
      </main>
      <footer className="overflow-hidden pt-6">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-[14px] text-muted sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.role}
          </p>
          <div className="flex flex-wrap justify-center gap-5">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-brand-700">
                {n.name}
              </a>
            ))}
          </div>
        </div>
        {/* Oversized wordmark, a common Framer-template footer motif */}
        <p aria-hidden className="wordmark mt-8 text-center font-serif text-[18vw] leading-[0.8] whitespace-nowrap select-none">
          Sai Charan
        </p>
      </footer>
    </>
  )
}
