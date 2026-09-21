import { useMemo, useState } from 'react'
import { FAULTS } from '../../data/faults'
import type { ActiveMission } from '../../types'
import { sample, shuffle } from '../../lib/utils'
import { GlassPanel } from '../ui/GlassPanel'
import { Button } from '../ui/Button'

export function DiagnosisPanel({
  mission,
  onSubmit,
}: {
  mission: ActiveMission
  onSubmit: (faultId: string) => { correct: boolean }
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [wrongFlash, setWrongFlash] = useState<string | null>(null)

  const options = useMemo(() => {
    const decoys = sample(
      FAULTS.filter((f) => f.id !== mission.fault.id),
      4,
    )
    return shuffle([mission.fault, ...decoys])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mission.id])

  const checksRun = mission.log.length
  const missingKeyChecks = mission.fault.keyChecks.filter(
    (c) => !mission.log.some((l) => l.checkId === c),
  )
  const canSubmit = missingKeyChecks.length === 0

  return (
    <GlassPanel className="p-4">
      <div className="mb-3">
        <div className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-ink-faint)]">
          DIAGNOSIS
        </div>
        <div className="text-sm text-[color:var(--color-ink-dim)] mt-1">
          What&apos;s actually wrong? Choose the fault that matches your readings.
        </div>
      </div>

      {!canSubmit && (
        <div className="mb-3 rounded-lg border border-[color:var(--color-warning)]/40 bg-[color:var(--color-warning)]/10 px-3 py-2 text-xs text-[color:var(--color-warning)]">
          Run a few more checks before you diagnose — {mission.fault.hint}
        </div>
      )}

      <div className="space-y-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            disabled={!canSubmit}
            onClick={() => setSelected(opt.id)}
            className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
              selected === opt.id
                ? 'border-[color:var(--color-brand)] bg-[color:var(--color-brand)]/15'
                : 'border-[color:var(--color-panel-border)] bg-white/5 hover:bg-white/10'
            } ${wrongFlash === opt.id ? 'border-[color:var(--color-fault)] bg-[color:var(--color-fault)]/10' : ''}`}
          >
            {opt.code}
          </button>
        ))}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span className="text-[11px] font-mono text-[color:var(--color-ink-faint)]">
          {checksRun} check{checksRun === 1 ? '' : 's'} logged
        </span>
        <Button
          variant="brand"
          size="sm"
          disabled={!selected || !canSubmit}
          onClick={() => {
            if (!selected) return
            const { correct } = onSubmit(selected)
            if (!correct) {
              setWrongFlash(selected)
              setTimeout(() => setWrongFlash(null), 700)
            }
          }}
        >
          Confirm diagnosis
        </Button>
      </div>
    </GlassPanel>
  )
}
