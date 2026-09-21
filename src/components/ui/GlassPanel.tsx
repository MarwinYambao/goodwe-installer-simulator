import type { ReactNode } from 'react'
import { cn } from '../../lib/utils'

export function GlassPanel({
  children,
  className,
  glow,
}: {
  children: ReactNode
  className?: string
  glow?: boolean
}) {
  return (
    <div
      className={cn(
        'glass rounded-2xl',
        glow && 'shadow-[0_0_40px_-12px_rgba(215,25,32,0.4)]',
        className,
      )}
    >
      {children}
    </div>
  )
}
