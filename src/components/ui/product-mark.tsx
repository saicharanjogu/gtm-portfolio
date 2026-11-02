import { CalendarCheck } from 'lucide-react'
import type { ProductMarkKind } from '../../lib/content'
import { cn } from '../../lib/utils'

// Each product's own mark: PRAVA's icon from pravacrm.com, BookMore's calendar-check circle and Fotos's
// semibold wordmark, rebuilt from their sites (Fotos ships only the default Next.js favicon).
export function ProductMark({ mark, className }: { mark: ProductMarkKind; className?: string }) {
  if (mark === 'prava') {
    return (
      <span className={cn('grid place-items-center overflow-hidden rounded-lg border border-line bg-white', className)}>
        <img src="/logos/prava.png" alt="" aria-hidden className="size-[78%] object-contain" />
      </span>
    )
  }
  if (mark === 'bookmore') {
    return (
      <span className={cn('grid place-items-center rounded-full bg-ink text-white', className)}>
        <CalendarCheck className="size-[52%]" />
      </span>
    )
  }
  return <span className={cn('grid place-items-center rounded-lg bg-ink text-[0.95em] font-semibold tracking-tight text-white', className)}>F</span>
}
