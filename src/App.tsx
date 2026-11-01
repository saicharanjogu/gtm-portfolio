import { FloatingNav } from './components/ui/floating-nav'
import { Hero } from './sections/hero'
import { Problem } from './sections/problem'
import { Own } from './sections/own'
import { Proof } from './sections/proof'
import { Poc } from './sections/poc'
import { About } from './sections/about'
import { Contact } from './sections/contact'
import { profile } from './lib/content'

const nav = [
  { name: 'Problem', href: '#problem' },
  { name: 'What I own', href: '#own' },
  { name: 'Proof', href: '#proof' },
  { name: 'POC', href: '#poc' },
  { name: 'About', href: '#about' },
]

export default function App() {
  return (
    <>
      <FloatingNav items={nav} brand={profile.name} />
      <main>
        <Hero />
        <Problem />
        <Own />
        <Proof />
        <Poc />
        <About />
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
        <p
          aria-hidden
          className="mt-8 text-center font-serif text-[18vw] leading-[0.8] wordmark whitespace-nowrap select-none"
        >
          Sai Charan
        </p>
      </footer>
    </>
  )
}
