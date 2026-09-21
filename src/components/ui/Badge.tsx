import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'
import type { ReadingFlag } from '../../types'

const FLAG_STYLES: Record<ReadingFlag, string> = {
  normal: 'text-[color:var(--color-success)] border-[color:var(--color-success)]/40 bg-[color:var(--color-success)]/10',
  warning: 'text-[color:var(--color-warning)] border-[color:var(--color-warning)]/40 bg-[color:var(--color-warning)]/10',
  fault: 'text-[color:var(--color-fault)] border-[color:var(--color-fault)]/40 bg-[color:var(--color-fault)]/10',
}

export function FlagBadge({ flag }: { flag: ReadingFlag }) {
  const label = flag === 'normal' ? 'NOMINAL' : flag === 'warning' ? 'WARNING' : 'FAULT'
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border px-2 py-0.5 text-[10px] font-mono font-semibold tracking-wider',
        FLAG_STYLES[flag],
      )}
    >
      {label}
    </span>
  )
}

export function Badge({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md border border-[color:var(--color-panel-border)] bg-white/5 px-2 py-0.5 text-[11px] font-mono text-[color:var(--color-ink-dim)]',
        className,
      )}
    >
      {children}
    </span>
  )
}
