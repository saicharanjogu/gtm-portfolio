import { useMemo } from 'react'

// Adapted from Magic UI / Aceternity "Meteors".
export function Meteors({ number = 18 }: { number?: number }) {
  const meteors = useMemo(
    () =>
      Array.from({ length: number }, () => ({
        left: `${Math.floor(Math.random() * 110) - 5}%`,
        delay: `${(Math.random() * 3).toFixed(2)}s`,
        duration: `${Math.floor(Math.random() * 6 + 3)}s`,
      })),
    [number],
  )
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {meteors.map((m, i) => (
        <span
          key={i}
          className="absolute top-0 size-0.5 rotate-[215deg] animate-meteor rounded-full bg-zinc-400 shadow-[0_0_0_1px_#ffffff10]"
          style={{ left: m.left, animationDelay: m.delay, animationDuration: m.duration }}
        >
          <span className="absolute top-1/2 -z-10 h-px w-[60px] -translate-y-1/2 bg-gradient-to-r from-zinc-400 to-transparent" />
        </span>
      ))}
    </div>
  )
}
