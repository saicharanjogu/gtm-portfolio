import type { AnchorHTMLAttributes, CSSProperties } from 'react'
import { cn } from '../../lib/utils'

// Adapted from Magic UI "Shimmer Button".
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  shimmerColor?: string
  background?: string
}

export function ShimmerButton({
  shimmerColor = '#ffffff',
  background = 'linear-gradient(110deg,#6d28d9,#4f46e5 45%,#0891b2)',
  className,
  children,
  ...props
}: Props) {
  return (
    <a
      style={{ '--spread': '90deg', '--shimmer-color': shimmerColor, '--speed': '3s', '--cut': '0.08em', '--bg': background } as CSSProperties}
      className={cn(
        'group relative z-0 inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden whitespace-nowrap rounded-full border border-white/15 px-6 py-3.5 text-sm font-semibold text-white [background:var(--bg)]',
        'transition-transform duration-300 hover:scale-[1.02] active:translate-y-px',
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 -z-30 overflow-visible blur-[2px] [container-type:size]">
        <div className="absolute inset-0 h-[100cqh] animate-shimmer-slide [aspect-ratio:1] [border-radius:0] [mask:none]">
          <div className="absolute -inset-full w-auto rotate-0 animate-spin-around [background:conic-gradient(from_calc(270deg-(var(--spread)*0.5)),transparent_0,var(--shimmer-color)_var(--spread),transparent_var(--spread))] [translate:0_0]" />
        </div>
      </div>
      {children}
      <div className="absolute inset-0 rounded-full shadow-[inset_0_-8px_10px_#ffffff1f] transition-all duration-300 group-hover:shadow-[inset_0_-6px_10px_#ffffff3f]" />
      <div className="absolute -z-20 [background:var(--bg)] [border-radius:9999px] [inset:var(--cut)]" />
    </a>
  )
}
