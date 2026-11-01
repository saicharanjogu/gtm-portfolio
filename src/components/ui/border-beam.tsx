import type { CSSProperties } from 'react'

// Adapted from Magic UI "Border Beam".
export function BorderBeam({ duration = 8, size = 220, delay = 0 }: { duration?: number; size?: number; delay?: number }) {
  return (
    <div
      aria-hidden
      style={{ '--size': size, '--duration': duration, '--delay': `-${delay}s` } as CSSProperties}
      className="pointer-events-none absolute inset-0 rounded-[inherit] [border:1.5px_solid_transparent] ![mask-clip:padding-box,border-box] ![mask-composite:intersect] [mask:linear-gradient(transparent,transparent),linear-gradient(white,white)]"
    >
      <div className="absolute aspect-square bg-gradient-to-l from-brand via-brand-2 to-transparent [animation:border-beam_calc(var(--duration)*1s)_infinite_linear] [animation-delay:var(--delay)] [offset-anchor:90%_50%] [offset-path:rect(0_auto_auto_0_round_16px)] [width:calc(var(--size)*1px)]" />
    </div>
  )
}
