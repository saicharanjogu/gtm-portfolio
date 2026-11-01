import type { ReactNode } from 'react'
import { Reveal } from './reveal'
import { cn } from '../../lib/utils'

export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-2 rounded-full border border-brand-100 bg-brand-50 px-3 py-1 text-[13px] font-medium text-brand-700', className)}>
      <span className="size-1.5 rounded-full bg-brand-600" />
      {children}
    </span>
  )
}

// Two-tone serif heading in the style of Accrue / Superhuman: ink lead, muted follow-through.
export function SectionHeading({
  eyebrow,
  title,
  muted,
  children,
  className,
  center,
}: {
  eyebrow: string
  title: ReactNode
  muted?: ReactNode
  children?: ReactNode
  className?: string
  center?: boolean
}) {
  return (
    <Reveal className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="mt-6 font-serif text-[2.6rem] leading-[1.02] text-balance sm:text-6xl">
        {title}
        {muted && <span className="text-muted/70"> {muted}</span>}
      </h2>
      {children && <div className="mt-6 text-lg leading-relaxed text-pretty text-muted">{children}</div>}
    </Reveal>
  )
}
