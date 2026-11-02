import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  Banknote,
  CalendarCheck,
  MousePointerClick,
  Plug,
  Sparkles,
  Target,
  UserPlus,
  Users,
  X,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../lib/utils";
import { Logo } from "./ui/logo";

// Hero animation: what a signal-based outbound system does. A radar picks up buying signals,
// each one travels Clay -> Claude -> ICP score -> Slack, non-fits drop out at scoring, fits become booked demos.
// Accounts and signals are illustrative examples of the kinds of events the system watches for.

type Signal = {
  account: string;
  signal: string;
  icon: LucideIcon;
  fit: boolean;
};

const SIGNALS: Signal[] = [
  {
    account: "Fintech, Series B",
    signal: "Raised a Series B",
    icon: Banknote,
    fit: true,
  },
  {
    account: "HR tech, 200 people",
    signal: "Hiring 3 SDRs",
    icon: Users,
    fit: true,
  },
  {
    account: "Agency, 6 people",
    signal: "Visited the blog",
    icon: MousePointerClick,
    fit: false,
  },
  {
    account: "Logistics SaaS",
    signal: "New VP Sales",
    icon: UserPlus,
    fit: true,
  },
  {
    account: "Retail chain",
    signal: "Installed a competitor",
    icon: Plug,
    fit: true,
  },
  {
    account: "Student project",
    signal: "Signed up for the newsletter",
    icon: Sparkles,
    fit: false,
  },
  {
    account: "Healthtech, Series A",
    signal: "Visited pricing twice",
    icon: MousePointerClick,
    fit: true,
  },
];

const STEPS = [
  { tool: "Clay", verb: "Enrich" },
  { tool: "Claude", verb: "Research" },
  { tool: "ICP", verb: "Score", icon: Target },
  { tool: "Slack", verb: "Route to rep" },
];
const SCORE = 2;
const EVERY_MS = 1500;
const TRAVEL_MS = 2800;

type Token = { id: number; s: Signal };
type Blip = { id: number; x: number; y: number };
type Booked = { id: number; s: Signal };

export function SignalEngine() {
  const [tokens, setTokens] = useState<Token[]>([]);
  const [blips, setBlips] = useState<Blip[]>([]);
  const [latest, setLatest] = useState<{ id: number; s: Signal } | null>(null);
  const [booked, setBooked] = useState<Booked[]>(() =>
    [SIGNALS[0], SIGNALS[1], SIGNALS[3]].map((s, i) => ({ id: -i - 1, s })),
  );
  const [lit, setLit] = useState<number[]>([0, 0, 0, 0]);
  const [now, setNow] = useState(0);

  const ids = useRef(0);
  const idx = useRef(0);
  const timers = useRef(new Set<ReturnType<typeof setTimeout>>());

  const later = useCallback((fn: () => void, ms: number) => {
    const t = setTimeout(() => {
      timers.current.delete(t);
      fn();
    }, ms);
    timers.current.add(t);
  }, []);

  const fire = useCallback(() => {
    const s = SIGNALS[idx.current++ % SIGNALS.length];
    const id = ++ids.current;
    // Blip somewhere inside the radar's outer ring.
    const a = Math.random() * Math.PI * 2;
    const r = 18 + Math.random() * 24;
    setBlips((b) => [
      ...b.slice(-5),
      { id, x: 50 + Math.cos(a) * r, y: 50 + Math.sin(a) * r },
    ]);
    later(() => setBlips((b) => b.filter((x) => x.id !== id)), 3200);
    setLatest({ id, s });

    later(() => {
      setTokens((t) => [...t, { id, s }]);
      const last = s.fit ? STEPS.length - 1 : SCORE;
      for (let i = 0; i <= last; i++) {
        later(
          () => {
            setLit((l) => l.map((v, j) => (j === i ? performance.now() : v)));
            setNow(performance.now());
          },
          (TRAVEL_MS * (i + 1)) / (STEPS.length + 1),
        );
      }
      later(() => {
        setTokens((t) => t.filter((x) => x.id !== id));
        if (s.fit) setBooked((b) => [{ id, s }, ...b].slice(0, 3));
      }, TRAVEL_MS);
    }, 500);
  }, [later]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    fire();
    const iv = setInterval(fire, EVERY_MS);
    const tick = setInterval(() => setNow(performance.now()), 250);
    const set = timers.current;
    return () => {
      clearInterval(iv);
      clearInterval(tick);
      set.forEach(clearTimeout);
    };
  }, [fire]);

  const nodeLeft = (i: number) => `${((i + 1) / (STEPS.length + 1)) * 100}%`;

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
        <span className="text-[12px] text-muted">
          Live demo · illustrative accounts
        </span>
      </div>

      <div className="grid gap-6 p-5 sm:grid-cols-[180px_1fr] sm:items-center sm:gap-5">
        {/* Radar: buying signals appear as blips */}
        <div className="mx-auto w-full max-w-[200px]">
          <div className="relative aspect-square overflow-hidden rounded-full border border-brand-100 bg-brand-50/50">
            {[0.28, 0.56, 0.84].map((s) => (
              <span
                key={s}
                aria-hidden
                className="absolute top-1/2 left-1/2 -translate-1/2 rounded-full border border-brand-100"
                style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
              />
            ))}
            <span
              aria-hidden
              className="absolute inset-x-0 top-1/2 h-px bg-brand-100"
            />
            <span
              aria-hidden
              className="absolute inset-y-0 left-1/2 w-px bg-brand-100"
            />
            <span
              aria-hidden
              className="absolute inset-0 rounded-full [animation:radar-sweep_3.2s_linear_infinite] [background:conic-gradient(from_0deg,rgba(31,79,224,0.28),transparent_22%)]"
            />
            {/* Each blip fades on its own timeline and is unmounted by a timer, so nothing waits on exit animations. */}
            {blips.map((b) => (
              <motion.span
                key={b.id}
                className="absolute -mt-1.5 -ml-1.5 grid size-3 place-items-center"
                style={{ left: `${b.x}%`, top: `${b.y}%` }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: [0, 1.15, 1, 0.7], opacity: [0, 1, 1, 0] }}
                transition={{ duration: 3.1, times: [0, 0.08, 0.75, 1] }}
              >
                <span className="absolute inset-0 animate-pulse-ring rounded-full bg-brand-500" />
                <span className="relative size-2.5 rounded-full bg-brand-600 ring-2 ring-white" />
              </motion.span>
            ))}
            <span className="absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full bg-ink" />
          </div>
          <div className="mt-3 h-11">
            {latest && (
              <motion.div
                key={latest.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.25 }}
                className="text-center"
              >
                <p className="flex items-center justify-center gap-1.5 text-[13px] font-medium">
                  <latest.s.icon className="size-3.5 text-brand-600" />{" "}
                  {latest.s.signal}
                </p>
                <p className="text-[12px] text-muted">{latest.s.account}</p>
              </motion.div>
            )}
          </div>
        </div>

        {/* Pipeline: each signal travels through the stack */}
        <div>
          <div className="relative h-28">
            <span
              aria-hidden
              className="absolute top-[38%] right-[6%] left-0 h-0.5 rounded-full bg-brand-100"
            />
            <svg
              aria-hidden
              className="absolute top-[38%] right-[6%] left-0 h-0.5 w-[94%] overflow-visible"
            >
              <line
                x1="0"
                x2="100%"
                y1="1"
                y2="1"
                stroke="var(--color-brand-400)"
                strokeWidth={2}
                strokeDasharray="6 14"
                className="[animation:beam-flow_1s_linear_infinite]"
              />
            </svg>

            {STEPS.map((st, i) => {
              const hot = now - lit[i] < 450;
              const Icon = st.icon;
              return (
                <div
                  key={st.tool}
                  className="absolute top-[38%] flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
                  style={{ left: nodeLeft(i) }}
                >
                  <motion.span
                    animate={{ scale: hot ? 1.12 : 1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 15 }}
                    className={cn(
                      "grid size-11 place-items-center rounded-xl border font-serif text-[15px] transition-colors duration-300 sm:size-12",
                      hot
                        ? "border-brand-600 bg-brand-600 text-white shadow-[0_8px_20px_-6px_rgba(31,79,224,0.6)]"
                        : "border-line bg-white text-brand-700",
                    )}
                  >
                    {Icon ? (
                      <Icon className="size-5" />
                    ) : (
                      <span className="grid size-7 place-items-center rounded-lg bg-white">
                        <Logo
                          name={st.tool}
                          className="size-[18px] text-[15px]"
                        />
                      </span>
                    )}
                  </motion.span>
                  <span className="absolute top-full mt-1.5 text-center whitespace-nowrap">
                    <span className="block text-[12px] font-medium">
                      {st.tool}
                    </span>
                    <span className="block text-[11px] text-muted">
                      {st.verb}
                    </span>
                  </span>
                </div>
              );
            })}

            {/* Tokens: one per signal, pausing at each step; non-fits drop at ICP score */}
            {tokens.map((t) => {
              const stops = t.s.fit ? STEPS.length : SCORE + 1;
              const left = [
                "0%",
                ...Array.from({ length: stops }, (_, i) => nodeLeft(i)),
              ];
              const top = left.map((_, i) =>
                !t.s.fit && i === left.length - 1 ? "58%" : "38%",
              );
              const opacity = left.map((_, i) =>
                i === 0 ? 0 : !t.s.fit && i === left.length - 1 ? 0 : 1,
              );
              const dur = (TRAVEL_MS * stops) / (STEPS.length + 1) / 1000;
              return (
                <motion.span
                  key={t.id}
                  className="absolute z-10 -mt-3 -ml-3 grid size-6 place-items-center rounded-full bg-brand-600 text-white shadow-[0_0_0_4px_rgba(31,79,224,0.15)]"
                  initial={{ left: "0%", top: "38%", opacity: 0 }}
                  animate={{ left, top, opacity }}
                  transition={{ duration: dur, ease: "easeInOut" }}
                >
                  {t.s.fit ? (
                    <t.s.icon className="size-3" />
                  ) : (
                    <X className="size-3" />
                  )}
                </motion.span>
              );
            })}
          </div>

          {/* Booked demos, in the style of Magic UI "Animated List" */}
          <div className="mt-6 border-t border-line pt-4">
            <p className="mb-2 text-[12px] font-medium text-muted">
              High-intent demos booked
            </p>
            <ul className="relative grid gap-2 overflow-hidden lg:h-[52px] lg:grid-cols-3">
              {/* Old cards unmount immediately; the new one slides in and the rest shift over (layout). */}
              {booked.map((b) => (
                <motion.li
                  layout
                  key={b.id}
                  initial={
                    b.id > 0 ? { opacity: 0, y: 10, scale: 0.96 } : false
                  }
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  transition={{ type: "spring", bounce: 0.2, duration: 0.45 }}
                  className="flex min-w-0 items-center gap-2.5 rounded-xl border border-line bg-surface px-3 py-2"
                >
                  <span className="grid size-7 shrink-0 place-items-center rounded-lg bg-brand-600 text-white">
                    <CalendarCheck className="size-3.5" />
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate text-[12.5px] font-medium">
                      {b.s.account}
                    </span>
                    <span className="block truncate text-[11.5px] text-muted">
                      via {b.s.signal.toLowerCase()}
                    </span>
                  </span>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
