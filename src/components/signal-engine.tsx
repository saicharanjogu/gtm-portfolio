import { useCallback, useEffect, useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Banknote, CalendarCheck, MousePointerClick, Plug, Sparkles, Target, UserPlus, Users, X, type LucideIcon } from 'lucide-react'
import { cn } from '../lib/utils'
import { Logo } from './ui/logo'

// Hero animation: what a signal-based outbound system does. A radar picks up buying signals,
// each one travels Clay -> Happenstance -> ICP score -> Slack, non-fits drop out at scoring, fits become booked demos.
// Accounts and signals are illustrative examples of the kinds of events the system watches for.
//
// Smoothness rules: tokens move on transform (x/y) only, each token's keyframes are computed once when it spawns
// (so re-renders never restart an animation), and nothing re-renders on a clock, only on events.

type Signal = { account: string; signal: string; icon: LucideIcon; fit: boolean }

const SIGNALS: Signal[] = [
  { account: 'Fintech, Series B', signal: 'Raised a Series B', icon: Banknote, fit: true },
  { account: 'HR tech, 200 people', signal: 'Hiring 3 SDRs', icon: Users, fit: true },
  { account: 'Agency, 6 people', signal: 'Visited the blog', icon: MousePointerClick, fit: false },
  { account: 'Logistics SaaS', signal: 'New VP Sales', icon: UserPlus, fit: true },
  { account: 'Retail chain', signal: 'Installed a competitor', icon: Plug, fit: true },
  { account: 'Student project', signal: 'Signed up for the newsletter', icon: Sparkles, fit: false },
  { account: 'Healthtech, Series A', signal: 'Visited pricing twice', icon: MousePointerClick, fit: true },
]

const STEPS = [
  { tool: 'Clay', verb: 'Enrich' },
  { tool: 'Happenstance', verb: 'Research' },
  { tool: 'ICP', verb: 'Score', icon: Target },
  { tool: 'Slack', verb: 'Route to rep' },
]
const SCORE = 2
const EVERY_MS = 1600
const LAUNCH_MS = 450 // radar blip -> token leaves
const MOVE_MS = 460 // travel between two nodes
const DWELL_MS = 280 // pause while a node "works"
const DROP_MS = 420 // non-fit falls out at scoring
const EASE = [0.45, 0, 0.25, 1] as const

type Path = { x: number[]; y: number[]; opacity: number[]; times: number[]; ease: (typeof EASE | 'linear')[]; duration: number }
type Token = { id: number; s: Signal; path: Path }
type Blip = { id: number; x: number; y: number }
type Booked = { id: number; s: Signal }

// Constant keyframes, defined once so blips never restart on re-render.
const BLIP_ANIMATE = { scale: [0, 1.15, 1, 0.7], opacity: [0, 1, 1, 0] }
const BLIP_TRANSITION = { duration: 3.1, times: [0, 0.08, 0.75, 1], ease: 'easeOut' as const }

const nodeX = (i: number, w: number) => (w * (i + 1)) / (STEPS.length + 1)

// Move -> dwell at every node; non-fits drop after the score node, fits glide on past Slack and fade.
function buildPath(fit: boolean, w: number): Path {
  const stops = fit ? STEPS.length : SCORE + 1
  const x = [0]
  const y = [0]
  const opacity = [0]
  const at = [0]
  const ease: Path['ease'] = []
  let t = 0
  for (let i = 0; i < stops; i++) {
    t += MOVE_MS
    x.push(nodeX(i, w))
    y.push(0)
    opacity.push(1)
    at.push(t)
    ease.push(EASE)
    t += DWELL_MS
    x.push(nodeX(i, w))
    y.push(0)
    opacity.push(1)
    at.push(t)
    ease.push('linear')
  }
  t += DROP_MS
  x.push(fit ? w : nodeX(SCORE, w) + 6)
  y.push(fit ? 0 : 34)
  opacity.push(0)
  at.push(t)
  ease.push(EASE)
  return { x, y, opacity, times: at.map((v) => v / t), ease, duration: t / 1000 }
}

export function SignalEngine() {
  const [tokens, setTokens] = useState<Token[]>([])
  const [blips, setBlips] = useState<Blip[]>([])
  const [latest, setLatest] = useState<{ id: number; s: Signal } | null>(null)
  const [booked, setBooked] = useState<Booked[]>(() => [SIGNALS[0], SIGNALS[1], SIGNALS[3]].map((s, i) => ({ id: -i - 1, s })))
  const [hot, setHot] = useState<boolean[]>(() => STEPS.map(() => false))

  const trackRef = useRef<HTMLDivElement>(null)
  const ids = useRef(0)
  const idx = useRef(0)
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>())

  const later = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(() => {
      timers.current.delete(t)
      fn()
    }, ms)
    timers.current.add(t)
  }, [])

  const setNode = useCallback((i: number, on: boolean) => setHot((h) => (h[i] === on ? h : h.map((v, j) => (j === i ? on : v)))), [])

  const fire = useCallback(() => {
    const w = trackRef.current?.clientWidth ?? 0
    if (!w) return
    const s = SIGNALS[idx.current++ % SIGNALS.length]
    const id = ++ids.current

    // Blip somewhere inside the radar's outer ring.
    const a = Math.random() * Math.PI * 2
    const r = 18 + Math.random() * 24
    setBlips((b) => [...b.slice(-5), { id, x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r }])
    later(() => setBlips((b) => b.filter((x) => x.id !== id)), 3200)
    setLatest({ id, s })

    const path = buildPath(s.fit, w)
    later(() => {
      setTokens((t) => [...t, { id, s, path }])
      const stops = s.fit ? STEPS.length : SCORE + 1
      for (let i = 0; i < stops; i++) {
        const arrive = i * (MOVE_MS + DWELL_MS) + MOVE_MS
        later(() => setNode(i, true), arrive)
        later(() => setNode(i, false), arrive + DWELL_MS + 120)
      }
      later(() => {
        setTokens((t) => t.filter((x) => x.id !== id))
        if (s.fit) setBooked((b) => [{ id, s }, ...b].slice(0, 3))
      }, path.duration * 1000)
    }, LAUNCH_MS)
  }, [later, setNode])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    fire()
    const iv = setInterval(fire, EVERY_MS)
    const set = timers.current
    return () => {
      clearInterval(iv)
      set.forEach(clearTimeout)
    }
  }, [fire])

  return (
    <div className="card-shadow overflow-hidden rounded-[1.5rem] border border-line bg-white text-left">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="flex items-center gap-2 text-[13px] font-medium">
          <span className="relative grid size-2.5 place-items-center">
            <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-400" />
            <span className="relative size-2 rounded-full bg-brand-600" />
          </span>
          Signal engine
        </span>
        <span className="text-[12px] text-muted">Live demo · illustrative accounts</span>
      </div>

      <div className="grid gap-6 p-5 sm:grid-cols-[180px_1fr] sm:items-center sm:gap-5">
        {/* Radar: buying signals appear as blips */}
        <div className="mx-auto w-full max-w-[200px]">
          <div className="relative aspect-square overflow-hidden rounded-full border border-brand-100 bg-brand-50/50">
            {[0.28, 0.56, 0.84].map((s) => (
              <span key={s} aria-hidden className="absolute top-1/2 left-1/2 -translate-1/2 rounded-full border border-brand-100" style={{ width: `${s * 100}%`, height: `${s * 100}%` }} />
            ))}
            <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-brand-100" />
            <span aria-hidden className="absolute inset-y-0 left-1/2 w-px bg-brand-100" />
            <span aria-hidden className="absolute inset-0 rounded-full will-change-transform [animation:radar-sweep_3.2s_linear_infinite] [background:conic-gradient(from_0deg,rgba(31,79,224,0.28),transparent_22%)]" />
            {/* Each blip fades on its own timeline and is unmounted by a timer, so nothing waits on exit animations. */}
            {blips.map((b) => (
              <motion.span
                key={b.id}
                className="absolute -mt-1.5 -ml-1.5 grid size-3 place-items-center"
                style={{ left: `${b.x}%`, top: `${b.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={BLIP_ANIMATE}
                transition={BLIP_TRANSITION}
              >
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-500" />
                <span className="relative size-2.5 rounded-full bg-brand-600 ring-2 ring-white" />
              </motion.span>
            ))}
            <span className="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full bg-ink" />
          </div>
          <div className="mt-3 h-11">
            {latest && (
              <motion.div key={latest.id} initial={{ opacity: 0, y: 6 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: EASE }} className="text-center">
                <p className="flex items-center justify-center gap-1.5 text-[13px] font-medium">
                  <latest.s.icon className="size-3.5 text-brand-600" /> {latest.s.signal}
                </p>
                <p className="text-[12px] text-muted">{latest.s.account}</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Pipeline: each signal travels through the stack */}
        <div>
          <div ref={trackRef} className="relative h-28">
            <span aria-hidden className="absolute top-[38%] right-0 left-0 h-0.5 rounded-full bg-brand-100" />
            <svg aria-hidden className="absolute top-[38%] left-0 h-0.5 w-full overflow-visible">
              <line x1="0" x2="100%" y1="1" y2="1" stroke="var(--color-brand-400)" strokeWidth={2} strokeDasharray="6 14" className="[animation:beam-flow_1s_linear_infinite]" />
            </svg>

            {STEPS.map((st, i) => {
              const Icon = st.icon
              return (
                <div
                  key={st.tool}
                  className="absolute top-[38%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{ left: `${((i + 1) / (STEPS.length + 1)) * 100}%` }}
                >
                  {/* CSS transitions for the highlight: no per-frame React work */}
                  <span
                    className={cn(
                      'grid size-11 place-items-center rounded-xl border font-serif text-[15px] transition-[transform,background-color,border-color,box-shadow,color] duration-300 ease-[cubic-bezier(0.45,0,0.25,1)] sm:size-12',
                      hot[i]
                        ? 'scale-110 border-brand-600 bg-brand-600 text-white shadow-[0_8px_20px_-6px_rgba(31,79,224,0.6)]'
                        : 'scale-100 border-line bg-white text-brand-700',
                    )}
                  >
                    {Icon ? (
                      <Icon className="size-5" />
                    ) : (
                      <span className="grid size-7 place-items-center rounded-lg bg-white">
                        <Logo name={st.tool} className="size-[18px] text-[15px]" />
                      </span>
                    )}
                  </span>
                  <span className="absolute top-full mt-1.5 text-center whitespace-nowrap">
                    <span className="block text-[11px] font-medium sm:text-[12px]">{st.tool}</span>
                    <span className="block text-[10.5px] text-muted sm:text-[11px]">{st.verb}</span>
                  </span>
                </div>
              )
            })}

            {/* Tokens: transform-only motion, keyframes fixed at spawn; non-fits drop at ICP score */}
            {tokens.map((t) => (
              <motion.span
                key={t.id}
                className="absolute top-[38%] left-0 z-10 -mt-3 -ml-3 grid size-6 place-items-center rounded-full bg-brand-600 text-white shadow-[0_0_0_4px_rgba(31,79,224,0.15)] will-change-transform"
                initial={{ x: 0, y: 0, opacity: 0 }}
                animate={{ x: t.path.x, y: t.path.y, opacity: t.path.opacity }}
                transition={{ duration: t.path.duration, times: t.path.times, ease: t.path.ease }}
              >
                {t.s.fit ? <t.s.icon className="size-3" /> : <X className="size-3" />}
              </motion.span>
            ))}
          </div>

          {/* Booked demos, in the style of Magic UI "Animated List" */}
          <div className="mt-6 border-t border-line pt-4">
            <p className="mb-2 text-[12px] font-medium text-muted">High-intent demos booked</p>
            <ul className="relative grid gap-2 overflow-hidden lg:h-[52px] lg:grid-cols-3">
              {/* Old cards unmount immediately; the new one slides in and the rest shift over (layout). */}
              {booked.map((b) => (
                <motion.li
                  layout
                  key={b.id}
                  initial={b.id > 0 ? { opacity: 0, y: 10, scale: 0.96 } : false}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="flex min-w-0 items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-2"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-600 text-white">
                    <CalendarCheck className="size-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12.5px] font-medium">{b.s.account}</span>
                    <span className="block truncate text-[11.5px] text-muted">via {b.s.signal.toLowerCase()}</span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
