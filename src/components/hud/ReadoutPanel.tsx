import { AnimatePresence, motion } from 'framer-motion'
import type { MissionLogEntry } from '../../types'
import { CHECK_MAP } from '../../data/checks'
import { FlagBadge } from '../ui/Badge'
import { cn } from '../../lib/utils'

const FLAG_COLOR: Record<string, string> = {
  normal: 'var(--color-success)',
  warning: 'var(--color-warning)',
  fault: 'var(--color-fault)',
}

export function ReadoutPanel({ log }: { log: MissionLogEntry[] }) {
  const latest = log[log.length - 1]
  const activeColor = latest ? FLAG_COLOR[latest.reading.flag] : 'var(--color-brand)'

  return (
    <div className="relative overflow-hidden rounded-2xl border-2 border-[color:var(--color-panel-border)] bg-[#050810] shadow-[inset_0_0_40px_rgba(0,0,0,0.6)]">
      {/* bezel top label */}
      <div className="flex items-center justify-between border-b border-[color:var(--color-panel-border)] bg-white/[0.02] px-4 py-2">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-ink-faint)]">
          DIAGNOSTIC READOUT
        </span>
        <div className="flex items-center gap-1.5">
          <span
            className="h-1.5 w-1.5 rounded-full"
            style={{ backgroundColor: activeColor, boxShadow: `0 0 8px ${activeColor}` }}
          />
          <span className="font-mono text-[10px] text-[color:var(--color-ink-faint)]">LIVE</span>
        </div>
      </div>

      {/* scanline ambience */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.04]">
        <motion.div
          className="absolute inset-x-0 h-24 bg-gradient-to-b from-transparent via-[color:var(--color-brand)] to-transparent"
          animate={{ y: ['-100%', '400%'] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'linear' }}
        />
      </div>

      {/* main digit display */}
      <div className="relative px-5 py-6 text-center">
        <AnimatePresence mode="wait">
          {latest ? (
            <motion.div
              key={log.length}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              <div className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--color-ink-dim)]">
                {CHECK_MAP[latest.checkId]?.label}
              </div>
              <div
                className="mt-1 font-mono text-3xl sm:text-4xl font-semibold text-glow"
                style={{ color: activeColor }}
              >
                {latest.reading.value}
                {CHECK_MAP[latest.checkId]?.unit ? (
                  <span className="ml-1 text-lg align-top opacity-70">{CHECK_MAP[latest.checkId]?.unit}</span>
                ) : null}
              </div>
              <div className="mt-2 flex justify-center">
                <FlagBadge flag={latest.reading.flag} />
              </div>
              <p className="mt-3 text-sm text-[color:var(--color-ink-dim)] max-w-md mx-auto">
                {latest.reading.note}
              </p>
            </motion.div>
          ) : (
            <div className="py-6">
              <div className="font-mono text-2xl text-[color:var(--color-ink-faint)]">— — — —</div>
              <p className="mt-2 text-sm text-[color:var(--color-ink-faint)]">
                Run a check to see live readings here.
              </p>
            </div>
          )}
        </AnimatePresence>
      </div>

      {/* history strip */}
      {log.length > 1 && (
        <div className="relative border-t border-[color:var(--color-panel-border)] bg-white/[0.015] px-4 py-2">
          <div className="flex gap-2 overflow-x-auto">
            {log
              .slice(0, -1)
              .slice(-6)
              .reverse()
              .map((entry, i) => (
                <div
                  key={i}
                  className={cn(
                    'shrink-0 rounded-md border border-[color:var(--color-panel-border)] px-2 py-1 font-mono text-[10px] text-[color:var(--color-ink-faint)]',
                  )}
                >
                  {CHECK_MAP[entry.checkId]?.label}: {entry.reading.value}
                </div>
              ))}
          </div>
        </div>
      )}
    </div>
  )
}
