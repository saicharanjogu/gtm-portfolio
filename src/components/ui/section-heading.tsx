import type { ReactNode } from 'react'
import { Reveal } from './reveal'
import { cn } from '../../lib/utils'

export function SectionHeading({
  eyebrow,
  title,
  children,
  className,
  center,
}: {
  eyebrow: string
  title: ReactNode
  children?: ReactNode
  className?: string
  center?: boolean
}) {
  return (
    <Reveal className={cn('max-w-3xl', center && 'mx-auto text-center', className)}>
      <span className="inline-flex items-center gap-2 rounded-full border border-line bg-surface px-3 py-1 text-xs font-medium tracking-[0.18em] text-muted uppercase">
        <span className="size-1.5 rounded-full bg-gradient-to-r from-brand to-brand-2" />
        {eyebrow}
      </span>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-5xl">{title}</h2>
      {children && <div className="mt-5 text-lg leading-relaxed text-pretty text-muted">{children}</div>}
    </Reveal>
  )
}
