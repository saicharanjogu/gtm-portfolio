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
      <footer className="border-t border-line py-10">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted sm:flex-row sm:px-6">
          <p>
            © {new Date().getFullYear()} {profile.name} · {profile.role}
          </p>
          <div className="flex gap-5">
            {nav.map((n) => (
              <a key={n.href} href={n.href} className="transition-colors hover:text-fg">
                {n.name}
              </a>
            ))}
          </div>
        </div>
      </footer>
    </>
  )
}
