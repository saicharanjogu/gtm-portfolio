import type { AnchorHTMLAttributes, CSSProperties } from 'react'
import { cn } from '../../lib/utils'

// Adapted from Magic UI "Shimmer Button".
type Props = AnchorHTMLAttributes<HTMLAnchorElement> & {
  shimmerColor?: string
  background?: string
}

export function ShimmerButton({
  shimmerColor = '#ffffff',
  background = 'linear-gradient(180deg,#3b6cf6,#1f4fe0)',
  className,
  children,
  ...props
}: Props) {
  return (
    <a
      style={{ '--spread': '90deg', '--shimmer-color': shimmerColor, '--speed': '3s', '--cut': '0.06em', '--bg': background } as CSSProperties}
      className={cn(
        'group relative z-0 inline-flex cursor-pointer items-center justify-center gap-2 overflow-hidden rounded-full px-6 py-3.5 text-[15px] font-medium whitespace-nowrap text-white [background:var(--bg)]',
        'shadow-[0_8px_24px_-8px_rgba(31,79,224,0.6)] transition-transform duration-300 hover:-translate-y-0.5 active:translate-y-px',
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
      <div className="absolute inset-0 rounded-full shadow-[inset_0_1px_0_#ffffff40,inset_0_-6px_10px_#ffffff14] transition-all duration-300 group-hover:shadow-[inset_0_1px_0_#ffffff60,inset_0_-6px_10px_#ffffff30]" />
      <div className="absolute -z-20 [background:var(--bg)] [border-radius:9999px] [inset:var(--cut)]" />
    </a>
  )
}

export function GhostButton({ className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      className={cn(
        'card-shadow inline-flex items-center justify-center gap-2 rounded-full border border-line bg-white px-6 py-3.5 text-[15px] font-medium text-ink transition-all hover:-translate-y-0.5 hover:border-brand-200',
        className,
      )}
      {...props}
    >
      {children}
    </a>
  )
}
