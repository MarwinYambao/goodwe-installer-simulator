import { motion } from 'framer-motion'
import { cn } from '../../lib/utils'

export function ProgressBar({
  value,
  max,
  colorVar = 'var(--color-brand)',
  className,
  height = 8,
}: {
  value: number
  max: number
  colorVar?: string
  className?: string
  height?: number
}) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100))
  return (
    <div
      className={cn('w-full rounded-full bg-white/5 overflow-hidden border border-white/5', className)}
      style={{ height }}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: colorVar, boxShadow: `0 0 12px -2px ${colorVar}` }}
        initial={{ width: 0 }}
        animate={{ width: `${pct}%` }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
      />
    </div>
  )
}
