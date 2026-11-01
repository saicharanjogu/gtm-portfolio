import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { BarChart3, CheckCircle2, Factory, FlaskConical, Lock, Presentation, Target, TrendingDown, X } from 'lucide-react'
import { cn } from '../lib/utils'

// The hero's "aha": the same pipeline, with and without someone owning the handoffs.
// Deals flow along the track; at each handoff they either leak (with the real reason) or pass a lock.
// Rates are illustrative: unowned, ~20% of deals reach production, matching "80% of POCs stall".

type Mode = 'leaky' | 'owned'

const W = 1000
const H = 220
const TRACK_Y = 92
const stageX = [70, 285, 500, 715, 930]
const stages = [
  { name: 'Lead gen', icon: Target },
  { name: 'Demos', icon: Presentation },
  { name: 'Value eng.', icon: BarChart3 },
  { name: 'Paid POC', icon: FlaskConical },
  { name: 'Production', icon: Factory },
]
const gaps = [
  { leak: 'Not ICP-qualified', why: 'Lead never qualified against ICP', lock: 'ICP fit first' },
  { leak: 'No buying test', why: 'Demo never tested a buying decision', lock: 'Success criteria agreed' },
  { leak: "ROI didn't hold", why: "Value case failed the CFO's second question", lock: 'Champion-ready ROI' },
  { leak: 'Procurement came late', why: 'Security and procurement entered late', lock: 'Decision path mapped' },
]
const wins = [
  'Data scope agreed before day one',
  'Success criteria set with the buyer',
  'Champion walked in with a defensible ROI',
  'Security and procurement mapped early',
  'Next buying step defined before kickoff',
]
const gapX = gaps.map((_, i) => (stageX[i] + stageX[i + 1]) / 2)
const LEAK_P: Record<Mode, number> = { leaky: 0.33, owned: 0.04 }
const SPEED = 230 // viewBox units per second
const SPAWN_MS = 300
const WINDOW = 16

type Dot = { id: number; x: number; y: number; vy: number; o: number; next: number; state: 'flow' | 'leak' | 'done' }
type Event = { id: number; kind: 'leak' | 'win' | 'info'; text: string; sub?: string }

const pct = (o: boolean[]) => Math.round((o.filter(Boolean).length / o.length) * 100)

// Start mid-flow: a recent history at the unowned rate (3 of 16 ≈ 19%) and a pipeline already full of deals.
const SEED = Array.from({ length: WINDOW }, (_, i) => i % 5 === 2)
function seedDots(): Dot[] {
  const out: Dot[] = []
  const step = (SPEED * SPAWN_MS) / 1000
  for (let x = stageX[0] + step, id = -1; x < stageX[4]; x += step, id--) {
    out.push({ id, x, y: TRACK_Y, vy: 0, o: 1, next: gapX.filter((g) => g < x).length, state: 'flow' })
  }
  // Thin the seeded deals the way the leaky pipeline would, so later stages start sparser.
  return out.filter((d) => Math.random() < Math.pow(1 - LEAK_P.leaky, d.next))
}

export function FunnelSimulator() {
  const [mode, setMode] = useState<Mode>('leaky')
  const [, setFrame] = useState(0)
  const [events, setEvents] = useState<Event[]>([])
  const [flash, setFlash] = useState<number[]>([0, 0, 0, 0])
  const [rate, setRate] = useState<number | null>(() => pct(SEED))

  const [initialDots] = useState(seedDots)
  const dots = useRef<Dot[]>(initialDots)
  const outcomes = useRef<boolean[]>(SEED)
  const modeRef = useRef<Mode>('leaky')
  const touched = useRef(false)
  const lastEvent = useRef(0)
  const ids = useRef(0)
  const winIdx = useRef(0)

  const pushEvent = (e: Omit<Event, 'id'>, force = false) => {
    const now = performance.now()
    if (!force && now - lastEvent.current < 900) return
    lastEvent.current = now
    const item = { ...e, id: ++ids.current }
    setEvents((prev) => [item, ...prev].slice(0, 3))
  }

  const switchMode = (m: Mode, auto = false) => {
    if (!auto) touched.current = true
    if (m === modeRef.current) return
    modeRef.current = m
    setMode(m)
    // Keep the outcome window so the counter visibly climbs (or drops) as new deals finish.
    pushEvent(
      m === 'owned'
        ? { kind: 'info', text: 'Handoffs owned end to end', sub: 'Watch the leaks stop' }
        : { kind: 'info', text: 'Nobody owns the handoffs', sub: 'Deals start slipping between stages' },
      true,
    )
  }

  // Auto-flip once so visitors who never click still get the before/after.
  useEffect(() => {
    const t = setTimeout(() => {
      if (!touched.current) switchMode('owned', true)
    }, 8000)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let raf = 0
    let last = performance.now()
    let spawnAcc = SPAWN_MS
    const record = (ok: boolean) => {
      outcomes.current = [...outcomes.current, ok].slice(-WINDOW)
      setRate(pct(outcomes.current))
    }
    const tick = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      spawnAcc += dt * 1000
      if (spawnAcc >= SPAWN_MS) {
        spawnAcc = 0
        dots.current.push({ id: ++ids.current, x: stageX[0], y: TRACK_Y, vy: 0, o: 1, next: 0, state: 'flow' })
      }
      for (const d of dots.current) {
        if (d.state === 'flow') {
          d.x += SPEED * dt
          if (d.next < gaps.length && d.x >= gapX[d.next]) {
            const g = d.next
            d.next++
            if (Math.random() < LEAK_P[modeRef.current]) {
              d.state = 'leak'
              setFlash((f) => f.map((v, i) => (i === g ? now : v)))
              pushEvent({ kind: 'leak', text: `Stalled: ${stages[g].name} → ${stages[g + 1].name}`, sub: gaps[g].why })
              record(false)
            }
          }
          if (d.state === 'flow' && d.x >= stageX[4]) {
            d.state = 'done'
            record(true)
            if (modeRef.current === 'owned') {
              pushEvent({ kind: 'win', text: 'Deal reached production', sub: wins[winIdx.current++ % wins.length] })
            }
          }
        } else if (d.state === 'leak') {
          d.x += SPEED * 0.25 * dt
          d.vy += 520 * dt
          d.y += d.vy * dt
          d.o -= 1.4 * dt
        } else {
          d.o -= 3 * dt
        }
      }
      dots.current = dots.current.filter((d) => d.o > 0 && d.y < H + 10)
      setFrame((f) => (f + 1) % 1e6)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const owned = mode === 'owned'
  const now = typeof performance !== 'undefined' ? performance.now() : 0

  return (
    <div className="panel-shadow relative overflow-hidden rounded-[1.75rem] border border-white bg-white/85 p-2 text-left backdrop-blur-xl">
      <div className="rounded-[1.35rem] border border-line bg-white">
        {/* Header: toggle + live stat */}
        <div className="flex flex-col gap-4 border-b border-line p-4 sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <div role="tablist" aria-label="Pipeline mode" className="relative inline-flex rounded-full bg-surface p-1">
            {(['leaky', 'owned'] as const).map((m) => (
              <button
                key={m}
                role="tab"
                aria-selected={mode === m}
                onClick={() => switchMode(m)}
                className={cn(
                  'relative z-10 rounded-full px-3.5 py-2 text-[13px] font-medium whitespace-nowrap transition-colors sm:px-4 sm:text-[14px]',
                  mode === m ? (m === 'owned' ? 'text-white' : 'text-ink') : 'text-muted hover:text-ink',
                )}
              >
                {mode === m && (
                  <motion.span
                    layoutId="mode-pill"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.5 }}
                    className={cn('absolute inset-0 -z-10 rounded-full', m === 'owned' ? 'bg-brand-600' : 'card-shadow bg-white')}
                  />
                )}
                {m === 'leaky' ? 'No one owns handoffs' : 'I own the handoffs'}
              </button>
            ))}
          </div>

          <div className="flex items-end gap-3">
            <div className="text-right">
              <p className="text-[12px] text-muted">Deals reaching production</p>
              <p className="text-[11px] text-muted/70">Illustrative, live</p>
            </div>
            <div className={cn('min-w-[4.5ch] text-right font-serif text-5xl leading-none tabular-nums transition-colors', owned ? 'text-brand-600' : 'text-ink')}>
              {rate === null ? '–' : `${rate}%`}
            </div>
          </div>
        </div>

        {/* Track */}
        <div className="relative px-2 pt-4 sm:px-4">
          <div className="relative w-full" style={{ aspectRatio: `${W} / ${H}` }}>
            <svg viewBox={`0 0 ${W} ${H}`} className="absolute inset-0 h-full w-full" aria-hidden>
              <defs>
                {/* userSpaceOnUse: a bounding-box gradient on a horizontal line has zero height and renders nothing */}
                <linearGradient id="beam" gradientUnits="userSpaceOnUse" x1={stageX[0]} x2={stageX[4]} y1={0} y2={0}>
                  <stop offset="0" stopColor="var(--color-brand-300)" />
                  <stop offset="1" stopColor="var(--color-brand-600)" />
                </linearGradient>
              </defs>
              {gaps.map((_, i) => {
                const x1 = stageX[i] + 36
                const x2 = stageX[i + 1] - 36
                const mid = gapX[i]
                return (
                  <g key={i}>
                    {owned ? (
                      <>
                        <line x1={x1} x2={x2} y1={TRACK_Y} y2={TRACK_Y} stroke="url(#beam)" strokeWidth={4} strokeLinecap="round" />
                        <line
                          x1={x1}
                          x2={x2}
                          y1={TRACK_Y}
                          y2={TRACK_Y}
                          stroke="white"
                          strokeOpacity={0.8}
                          strokeWidth={2}
                          strokeDasharray="10 30"
                          className="[animation:beam-flow_1.2s_linear_infinite]"
                        />
                      </>
                    ) : (
                      <>
                        <line x1={x1} x2={mid - 14} y1={TRACK_Y} y2={TRACK_Y} stroke="var(--color-line)" strokeWidth={4} strokeLinecap="round" />
                        <line x1={mid + 14} x2={x2} y1={TRACK_Y} y2={TRACK_Y} stroke="var(--color-line)" strokeWidth={4} strokeLinecap="round" />
                        <path d={`M ${mid - 8} ${TRACK_Y + 8} L ${mid} ${TRACK_Y + 30} L ${mid + 8} ${TRACK_Y + 8}`} fill="none" stroke="var(--color-brand-200)" strokeWidth={2} strokeDasharray="3 4" />
                      </>
                    )}
                  </g>
                )
              })}
              {dots.current.map((d) => (
                <circle
                  key={d.id}
                  cx={d.x}
                  cy={d.y}
                  r={d.state === 'leak' ? 6 : 7}
                  fill={d.state === 'leak' ? 'var(--color-brand-200)' : 'var(--color-brand-600)'}
                  opacity={Math.max(0, d.o)}
                />
              ))}
            </svg>

            {/* Stage nodes */}
            {stages.map((s, i) => {
              const Icon = s.icon
              const last = i === stages.length - 1
              return (
                <div
                  key={s.name}
                  className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{ left: `${(stageX[i] / W) * 100}%`, top: `${(TRACK_Y / H) * 100}%` }}
                >
                  <div
                    className={cn(
                      'card-shadow grid size-10 place-items-center rounded-xl border transition-colors duration-500 sm:size-14 sm:rounded-2xl',
                      last && owned ? 'border-brand-600 bg-brand-600 text-white' : 'border-line bg-white text-brand-600',
                    )}
                  >
                    <Icon className="size-4 sm:size-6" strokeWidth={1.7} />
                  </div>
                  <span className="absolute top-full mt-1.5 text-[10px] font-medium whitespace-nowrap sm:mt-2 sm:text-[13px]">{s.name}</span>
                </div>
              )
            })}

            {/* Gap chips: the reason deals leak, or the lock that stops it */}
            {gaps.map((g, i) => {
              const hot = !owned && now - flash[i] < 700
              return (
                <div
                  key={i}
                  className="absolute hidden -translate-x-1/2 lg:block"
                  style={{ left: `${(gapX[i] / W) * 100}%`, top: `${((TRACK_Y + 58) / H) * 100}%` }}
                >
                  <AnimatePresence mode="wait">
                    <motion.span
                      key={owned ? 'lock' : 'leak'}
                      initial={{ opacity: 0, y: 6, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: hot ? 1.06 : 1 }}
                      exit={{ opacity: 0, y: -6 }}
                      transition={{ duration: 0.3, delay: owned ? i * 0.12 : 0 }}
                      className={cn(
                        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[12px] font-medium whitespace-nowrap transition-colors',
                        owned
                          ? 'border-brand-200 bg-brand-50 text-brand-700'
                          : hot
                            ? 'border-brand-300 bg-brand-100 text-brand-900'
                            : 'border-line bg-white text-muted',
                      )}
                    >
                      {owned ? <Lock className="size-3" /> : <X className="size-3" />}
                      {owned ? g.lock : g.leak}
                    </motion.span>
                  </AnimatePresence>
                </div>
              )
            })}
          </div>
        </div>

        {/* Live feed, in the style of Magic UI "Animated List" */}
        <div className="border-t border-line p-4 sm:px-6">
          <ul className="relative flex h-[188px] flex-col gap-2 overflow-hidden lg:h-[60px] lg:flex-row">
            <AnimatePresence initial={false}>
              {events.map((e) => (
                <motion.li
                  layout
                  key={e.id}
                  initial={{ opacity: 0, y: 14, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ type: 'spring', bounce: 0.2, duration: 0.45 }}
                  className="flex min-w-0 flex-1 items-start gap-2.5 rounded-2xl border border-line bg-surface px-3 py-2.5 lg:max-w-[33%]"
                >
                  <span
                    className={cn(
                      'mt-0.5 grid size-6 shrink-0 place-items-center rounded-full',
                      e.kind === 'leak' ? 'bg-brand-100 text-brand-800' : e.kind === 'win' ? 'bg-brand-600 text-white' : 'bg-ink text-white',
                    )}
                  >
                    {e.kind === 'leak' ? <TrendingDown className="size-3.5" /> : e.kind === 'win' ? <CheckCircle2 className="size-3.5" /> : <Lock className="size-3" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[13px] font-medium">{e.text}</span>
                    {e.sub && <span className="block truncate text-[12px] text-muted">{e.sub}</span>}
                  </span>
                </motion.li>
              ))}
            </AnimatePresence>
            {events.length === 0 && <li className="self-center text-[13px] text-muted">Deals are entering the pipeline…</li>}
          </ul>
        </div>
      </div>
    </div>
  )
}
