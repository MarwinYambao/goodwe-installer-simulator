import { motion } from 'framer-motion'
import type { ActiveMission } from '../../types'
import { GlassPanel } from '../ui/GlassPanel'
import { Button } from '../ui/Button'

export function MissionResult({
  mission,
  onContinue,
  onNextMission,
}: {
  mission: ActiveMission
  onContinue: () => void
  onNextMission: () => void
}) {
  const outcome = mission.outcome
  if (!outcome) return null

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mx-auto max-w-lg"
    >
      <GlassPanel className="p-6 text-center" glow>
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[color:var(--color-success)]/15 border border-[color:var(--color-success)]/40">
          <span className="text-2xl text-[color:var(--color-success)]">✓</span>
        </div>
        <h2 className="font-display text-xl font-semibold">Mission Complete</h2>
        <p className="mt-1 text-sm text-[color:var(--color-ink-dim)]">{outcome.message}</p>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <div className="rounded-xl border border-[color:var(--color-panel-border)] bg-white/5 py-3">
            <div className="font-mono text-2xl font-semibold text-[color:var(--color-brand)]">
              +{outcome.xpEarned}
            </div>
            <div className="text-[11px] text-[color:var(--color-ink-faint)] mt-1">XP EARNED</div>
          </div>
          <div className="rounded-xl border border-[color:var(--color-panel-border)] bg-white/5 py-3">
            <div className="font-mono text-2xl font-semibold text-[color:var(--color-warning)]">
              +{outcome.coinsEarned}
            </div>
            <div className="text-[11px] text-[color:var(--color-ink-faint)] mt-1">COINS EARNED</div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-3">
          <Button onClick={onContinue}>Back to dashboard</Button>
          <Button variant="brand" onClick={onNextMission}>
            Next mission →
          </Button>
        </div>
      </GlassPanel>
    </motion.div>
  )
}
