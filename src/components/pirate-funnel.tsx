import { useCallback, useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { CalendarCheck, Calculator, Check, CircleDashed, Handshake, ShieldCheck, Target } from 'lucide-react'
import { cn } from '../lib/utils'

// The hero's "aha": a B2B SaaS pirate funnel (AARRR) with and without someone building it.
// Leads are glide paths sampled from one smooth curve, so motion is continuous (no per-frame React state).
// Built rates mirror my real record (198 leads -> 65 demos -> 40 conversions); the leaky ones are illustrative.

type Mode = 'leaky' | 'built'

const STAGES = [
  { letter: 'A', name: 'Acquisition', sub: 'Lead gen' },
  { letter: 'A', name: 'Activation', sub: 'Demo held' },
  { letter: 'R', name: 'Retention', sub: 'POC live' },
  { letter: 'R', name: 'Revenue', sub: 'Paid POC' },
  { letter: 'R', name: 'Referral', sub: 'Champion intro' },
] as const

const TOOLS: Record<Mode, { icon: typeof Target; text: string }[]> = {
  leaky: [
    { icon: CircleDashed, text: 'Ad hoc lists' },
    { icon: CircleDashed, text: 'Calendar ping-pong' },
    { icon: CircleDashed, text: 'Gut-feel next steps' },
    { icon: CircleDashed, text: 'Back-of-napkin ROI' },
    { icon: CircleDashed, text: 'Notes in DMs' },
  ],
  built: [
    { icon: Target, text: 'ICP lists + sequences' },
    { icon: CalendarCheck, text: 'Booking links + demo env' },
    { icon: ShieldCheck, text: 'Success criteria + data scope' },
    { icon: Calculator, text: 'ROI model + POC scope' },
    { icon: Handshake, text: 'CRM notes + champion intros' },
  ],
}

// How many of each 30 leads stop at each depth (0 = lost at the first gate, 4 = reached Referral).
// built: reach >= k is 33 / 30 / 27 / 20 % -> 65 demos / 198 leads and 40 conversions / 198 leads.
const DECK_COUNTS: Record<Mode, number[]> = { leaky: [25, 2, 1, 1, 1], built: [20, 1, 1, 2, 6] }
const reach = (mode: Mode, k: number) => (DECK_COUNTS[mode].slice(k).reduce((a, b) => a + b, 0) / 30) * 100

const INITIALS = ['AK', 'MR', 'JS', 'PL', 'TN', 'CD', 'EV', 'RB', 'HS', 'OM', 'LW', 'DG']
const SPAWN_MS = 220
const TRAVEL_S = 5
const BLUE = '#1f4fe0'
const WHITE = '#ffffff'

type Anim = { xs: number[]; ys: number[]; op: number[]; bg: string[]; fg: string[]; times: number[]; duration: number; mainMs: number; totalMs: number }
type Lead = { id: number; initials: string; depth: number; anim: Anim }

// Interleaved, not shuffled, so every short window keeps the true proportions and the live rates stay put
// instead of jittering. Same counts as DECK_COUNTS: built = 20/1/1/2/6, leaky = 25/2/1/1/1.
const PATTERN: Record<Mode, number[]> = {
  built: [4, 3, 4, 1, 4, 2, 4, 3, 4, 4].flatMap((x) => [0, 0, x]),
  leaky: [1, 2, 1, 3, 4].flatMap((x) => [0, 0, 0, 0, 0, x]),
}
const makeDeck = (mode: Mode) => {
  const p = PATTERN[mode]
  const r = Math.floor(Math.random() * p.length)
  return [...p.slice(r), ...p.slice(0, r)]
}

function funnelHeight(x: number, W: number, H: number) {
  const t = Math.min(1, Math.max(0, x / W))
  return H * 0.9 - H * 0.6 * Math.pow(t, 0.9)
}

// Leaky funnel: lost leads fall out through the gate. Built funnel: non-fits are filtered at the mouth
// (or at a later gate) and glide away upward, on purpose, instead of leaking.
function buildAnim(depth: number, lane: number, start: number, W: number, H: number, mode: Mode): Anim {
  const cy = H / 2
  const leak = depth < 4
  const glide = mode === 'built'
  const gate = glide && depth === 0 ? W * 0.075 : ((depth + 1) * W) / 5
  const xe = leak ? gate - 6 : W + 24
  const xStart = Math.min(-20 + start * (W + 20), xe - 30)
  const N = 28
  const xs: number[] = []
  const ys: number[] = []
  const op: number[] = []
  const bg: string[] = []
  const fg: string[] = []
  for (let i = 0; i < N; i++) {
    const x = xStart + ((xe - xStart) * i) / (N - 1)
    xs.push(x)
    ys.push(cy + lane * funnelHeight(x, W, H) * 0.8)
    op.push(i === 0 && start === 0 ? 0 : 1)
    const activated = x > W / 5
    bg.push(activated ? BLUE : WHITE)
    fg.push(activated ? WHITE : BLUE)
  }
  const mainMs = ((xe - xStart) / (W / TRAVEL_S)) * 1000
  const fallMs = leak ? (glide ? 900 : 750) : 0
  const totalMs = mainMs + fallMs
  const times = xs.map((_, i) => ((i / (N - 1)) * mainMs) / totalMs)
  if (leak) {
    const M = 10
    const yEnd = ys[N - 1]
    for (let j = 1; j <= M; j++) {
      const t = j / M
      if (glide) {
        xs.push(xe + t * 34)
        ys.push(yEnd - 80 * Math.pow(t, 1.3))
        op.push(Math.max(0, 1 - Math.pow(t, 1.1)))
      } else {
        xs.push(xe + t * 16)
        ys.push(yEnd + 170 * t * t + 14 * t)
        op.push(Math.max(0, 1 - Math.pow(t, 1.4)))
      }
      bg.push(bg[N - 1])
      fg.push(fg[N - 1])
      times.push((mainMs + t * fallMs) / totalMs)
    }
  }
  times[times.length - 1] = 1
  return { xs, ys, op, bg, fg, times, duration: totalMs / 1000, mainMs, totalMs }
}

export function PirateFunnel() {
  const [mode, setMode] = useState<Mode>('leaky')
  const [size, setSize] = useState({ w: 0, h: 0 })
  const [leads, setLeads] = useState<Lead[]>([])
  const [rates, setRates] = useState<number[]>(() => [0, 1, 2, 3, 4].map((k) => (k === 0 ? 100 : Math.round(reach('leaky', k)))))

  const boxRef = useRef<HTMLDivElement>(null)
  const sizeRef = useRef(size)
  const modeRef = useRef<Mode>('leaky')
  const deck = useRef<{ cards: number[]; i: number }>({ cards: makeDeck('leaky'), i: 0 })
  const ema = useRef<number[]>([100, ...[1, 2, 3, 4].map((k) => reach('leaky', k))])
  const touched = useRef(false)
  const ids = useRef(0)
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>())

  const later = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(() => {
      timers.current.delete(t)
      fn()
    }, ms)
    timers.current.add(t)
  }, [])

  const spawn = useCallback(
    (start: number, record: boolean) => {
      const { w, h } = sizeRef.current
      if (!w) return
      const d = deck.current
      if (d.i >= d.cards.length) deck.current = { cards: makeDeck(modeRef.current), i: 0 }
      const depth = deck.current.cards[deck.current.i++]
      const lead: Lead = {
        id: ++ids.current,
        initials: INITIALS[Math.floor(Math.random() * INITIALS.length)],
        depth,
        anim: buildAnim(depth, Math.random() - 0.5, start, w, h, modeRef.current),
      }
      setLeads((prev) => [...prev, lead])
      later(() => setLeads((prev) => prev.filter((l) => l.id !== lead.id)), lead.anim.totalMs + 120)
      if (record) {
        later(() => {
          ema.current = ema.current.map((v, k) => (k === 0 ? 100 : v * 0.92 + 0.08 * (lead.depth >= k ? 100 : 0)))
          setRates(ema.current.map((v) => Math.round(v)))
          // A fixed delay (not the flight time) keeps outcomes in spawn order, so the live rates don't lurch.
        }, 1200)
      }
    },
    [later],
  )

  const switchMode = (m: Mode, auto = false) => {
    if (!auto) touched.current = true
    if (m === modeRef.current) return
    modeRef.current = m
    setMode(m)
    deck.current = { cards: makeDeck(m), i: 0 }
  }

  // Measure the funnel box.
  useEffect(() => {
    const el = boxRef.current
    if (!el) return
    const ro = new ResizeObserver(() => {
      const next = { w: el.clientWidth, h: el.clientHeight }
      sizeRef.current = next
      setSize(next)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  // Seed a funnel already in flow, then keep feeding it.
  const measured = size.w > 0
  useEffect(() => {
    if (!measured || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    for (let i = 0; i < 18; i++) spawn(0.04 + (i / 18) * 0.86, false)
    const iv = setInterval(() => spawn(0, true), SPAWN_MS)
    return () => clearInterval(iv)
  }, [measured, spawn])

  // Auto-flip once so visitors who never click still see the before/after.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!touched.current) switchMode('built', true)
    }, 7000)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const set = timers.current
    return () => set.forEach(clearTimeout)
  }, [])

  const built = mode === 'built'
  const { w: W, h: H } = size
  const pts = (() => {
    if (!W) return ''
    const n = 40
    const top: string[] = []
    const bottom: string[] = []
    for (let i = 0; i <= n; i++) {
      const x = (W * i) / n
      const hh = funnelHeight(x, W, H)
      top.push(`${x},${H / 2 - hh / 2}`)
      bottom.unshift(`${x},${H / 2 + hh / 2}`)
    }
    return `M ${top.join(' L ')} L ${bottom.join(' L ')} Z`
  })()

  return (
    <div className="panel-shadow relative overflow-hidden rounded-[1.75rem] border border-white bg-white/85 p-2 text-left backdrop-blur-xl">
      <div className="rounded-[1.35rem] border border-line bg-white">
        {/* Header: toggle + live outcomes */}
        <div className="flex flex-col gap-4 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div role="tablist" aria-label="Funnel mode" className="relative inline-flex self-start rounded-full bg-surface p-1">
            {(['leaky', 'built'] as const).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => switchMode(m)}
                className={cn(
                  'relative z-10 rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors sm:px-4 sm:text-[14px]',
                  mode === m ? (m === 'built' ? 'text-white' : 'text-ink') : 'text-muted hover:text-ink',
                )}
              >
                {mode === m && (
                  <motion.span
                    layoutId="funnel-pill"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    className={cn('absolute inset-0 -z-10 rounded-full', m === 'built' ? 'bg-brand-600' : 'card-shadow bg-white')}
                  />
                )}
                {m === 'leaky' ? 'Funnel as is' : 'Funnel built by me'}
              </button>
            ))}
          </div>

          <div className="flex gap-6 sm:gap-8">
            {[
              { label: 'Leads → demos held', v: rates[1] },
              { label: 'Leads → paid POC', v: rates[3] },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-[12px] text-muted">{s.label}</p>
                <p className={cn('font-serif text-4xl leading-none tabular-nums transition-colors duration-500 sm:text-5xl', built ? 'text-brand-600' : 'text-ink')}>{s.v}%</p>
              </div>
            ))}
          </div>
        </div>

        <div className="px-3 pt-4 pb-4 sm:px-6">
          {/* What I own, bracketed over the stages */}
          <div className="grid grid-cols-5 gap-0">
            <div className="col-span-2 border-t-2 border-brand-600 pt-1.5 pr-2 text-[11px] font-medium text-brand-700 sm:text-[12px]">Demos per month: owned</div>
            <div className="col-span-3 border-t-2 border-brand-200 pt-1.5 pl-2 text-[11px] text-muted sm:text-[12px]">…and I stay through paid POC</div>
          </div>

          {/* Stage header */}
          <div className="mt-3 grid grid-cols-5">
            {STAGES.map((s, i) => (
              <div key={i} className="flex flex-col items-center text-center">
                <span className={cn('grid size-7 place-items-center rounded-full font-serif text-[15px] transition-colors duration-500', built ? 'bg-brand-600 text-white' : 'bg-brand-50 text-brand-700')}>{s.letter}</span>
                <span className="mt-1 text-[10px] font-medium sm:text-[13px]">{s.name}</span>
                <span className="hidden text-[11px] text-muted sm:block">{s.sub}</span>
              </div>
            ))}
          </div>

          {/* Funnel */}
          <div ref={boxRef} className="relative mt-2 h-[220px] sm:h-[270px]">
            {W > 0 && (
              <svg width={W} height={H} viewBox={`0 0 ${W} ${H}`} className="absolute inset-0" aria-hidden>
                <defs>
                  <linearGradient id="funnel-fill" x1="0" x2="1" y1="0" y2="0">
                    <stop offset="0" stopColor="var(--color-brand-50)" />
                    <stop offset="1" stopColor="var(--color-brand-100)" />
                  </linearGradient>
                </defs>
                {[1, 2, 3, 4].map((g) => (
                  <line key={g} x1={(W * g) / 5} x2={(W * g) / 5} y1={0} y2={H} stroke="var(--color-line)" strokeDasharray="3 5" />
                ))}
                <path d={pts} fill="white" fillOpacity={0.6} stroke="var(--color-brand-200)" strokeWidth={1.5} strokeDasharray="6 7" strokeLinejoin="round" />
                <AnimatePresence>
                  {built && (
                    <motion.g key="built" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.6 }}>
                      <motion.path d={pts} fill="url(#funnel-fill)" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.1, delay: 0.3 }} />
                      <motion.path
                        d={pts}
                        fill="none"
                        stroke="var(--color-brand-500)"
                        strokeWidth={2}
                        strokeLinejoin="round"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1] }}
                      />
                    </motion.g>
                  )}
                </AnimatePresence>
              </svg>
            )}

            {/* Leads */}
            <div className="pointer-events-none absolute inset-0 overflow-hidden">
              {leads.map((l) => (
                <motion.div
                  key={l.id}
                  className="absolute grid size-[26px] place-items-center rounded-full border border-brand-200 text-[9px] font-semibold shadow-sm"
                  style={{ left: -13, top: -13 }}
                  initial={{ x: l.anim.xs[0], y: l.anim.ys[0], opacity: l.anim.op[0], backgroundColor: l.anim.bg[0], color: l.anim.fg[0] }}
                  animate={{ x: l.anim.xs, y: l.anim.ys, opacity: l.anim.op, backgroundColor: l.anim.bg, color: l.anim.fg }}
                  transition={{ duration: l.anim.duration, times: l.anim.times, ease: 'linear' }}
                >
                  {l.initials}
                </motion.div>
              ))}
            </div>
          </div>

          {/* Rate under every stage */}
          <div className="grid grid-cols-5">
            {rates.map((r, i) => (
              <p key={i} className={cn('text-center font-serif text-2xl tabular-nums transition-colors duration-500 sm:text-3xl', i === 0 ? 'text-muted' : built ? 'text-brand-700' : 'text-ink')}>
                {r}%
              </p>
            ))}
          </div>

          {/* Tools: snap onto each stage when the funnel is built */}
          <div className="mt-4 hidden md:block">
            <AnimatePresence mode="wait">
              <motion.div key={mode} className="grid grid-cols-5 gap-2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
                {TOOLS[mode].map((t, i) => (
                  <motion.span
                    key={t.text}
                    initial={{ opacity: 0, y: built ? -14 : 6, scale: 0.94 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ type: 'spring', stiffness: 260, damping: 22, delay: built ? 0.3 + i * 0.12 : i * 0.04 }}
                    className={cn(
                      'flex items-center justify-center gap-1.5 rounded-xl border px-2 py-2 text-center text-[11.5px] leading-tight font-medium',
                      built ? 'border-brand-200 bg-brand-50 text-brand-800' : 'border-dashed border-line text-muted',
                    )}
                  >
                    {built ? <Check className="size-3 shrink-0" strokeWidth={3} /> : <t.icon className="size-3 shrink-0" />}
                    {t.text}
                  </motion.span>
                ))}
              </motion.div>
            </AnimatePresence>
          </div>

          <p className="mt-4 text-center text-[12px] text-muted">
            {built ? 'Fotos + Prava CRM track every lead end to end. ' : ''}Illustrative. Built-funnel rates mirror my real 198 leads → 65 demos → 40 conversions.
          </p>
        </div>
      </div>
    </div>
  )
}
