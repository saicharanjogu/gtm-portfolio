import type { CSSProperties, ReactNode } from 'react'

// Adapted from Magic UI "Orbiting Circles": items travel on concentric rings around a centre badge.
export type OrbitItem = { icon: ReactNode; label: string; ring: 0 | 1; angle: number }

const RADII = [110, 175]
const DURATION = [26, 40]

export function Orbit({ center, items }: { center: ReactNode; items: OrbitItem[] }) {
  return (
    <div className="relative mx-auto grid aspect-square w-full max-w-[420px] place-items-center">
      {RADII.map((r) => (
        <span key={r} aria-hidden className="absolute rounded-full border border-dashed border-brand-200" style={{ width: r * 2, height: r * 2 }} />
      ))}
      <div className="relative z-10">{center}</div>
      {items.map((it) => (
        <div
          key={it.label}
          className="absolute top-1/2 left-1/2 -mt-6 -ml-6 size-12"
          style={
            {
              '--angle': it.angle,
              '--r': `${RADII[it.ring]}px`,
              animation: `orbit ${DURATION[it.ring]}s linear infinite`,
              animationDirection: it.ring ? 'reverse' : 'normal',
            } as CSSProperties
          }
        >
          <div className="card-shadow group relative grid size-12 place-items-center rounded-full border border-line bg-white text-brand-600">
            {it.icon}
            <span className="pointer-events-none absolute top-full mt-1.5 rounded-full bg-ink px-2 py-0.5 text-[11px] whitespace-nowrap text-white opacity-0 transition-opacity group-hover:opacity-100">
              {it.label}
            </span>
          </div>
        </div>
      ))}
    </div>
  )
}
