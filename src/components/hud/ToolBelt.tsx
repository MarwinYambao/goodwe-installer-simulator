import { motion } from 'framer-motion'
import { CHECKS } from '../../data/checks'
import { TOOLS } from '../../data/tools'
import { useGameStore } from '../../store/gameStore'
import type { CheckId } from '../../types'
import { cn } from '../../lib/utils'

export function ToolBelt({
  ranChecks,
  onRun,
}: {
  ranChecks: Set<CheckId>
  onRun: (id: CheckId) => void
}) {
  const unlockedTools = useGameStore((s) => s.stats.unlockedTools)
  const availableChecks = CHECKS.filter(
    (c) => unlockedTools.includes(c.toolId) && c.id !== 'visual_inspection',
  )

  return (
    <div>
      <div className="mb-2 font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-ink-faint)]">
        TOOL BELT
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {availableChecks.map((check) => {
          const tool = TOOLS.find((t) => t.id === check.toolId)
          const done = ranChecks.has(check.id)
          return (
            <motion.button
              key={check.id}
              whileTap={{ scale: 0.96 }}
              onClick={() => onRun(check.id)}
              title={tool?.description}
              className={cn(
                'group relative flex flex-col items-start gap-1 rounded-xl border px-3 py-2.5 text-left transition-colors',
                done
                  ? 'border-[color:var(--color-brand)]/50 bg-[color:var(--color-brand)]/10'
                  : 'border-[color:var(--color-panel-border)] bg-white/5 hover:border-[color:var(--color-brand)]/50 hover:bg-white/10',
              )}
            >
              <span className="font-mono text-[10px] text-[color:var(--color-ink-faint)] uppercase">
                {tool?.shortName}
              </span>
              <span className="text-sm font-medium leading-tight">
                {check.actionVerb} {check.label}
              </span>
              {done && (
                <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[color:var(--color-brand)]" />
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
