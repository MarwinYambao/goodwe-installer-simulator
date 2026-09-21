import { useMemo, useState } from 'react'
import { FIXES } from '../../data/fixes'
import type { ActiveMission } from '../../types'
import { sample, shuffle } from '../../lib/utils'
import { GlassPanel } from '../ui/GlassPanel'
import { Button } from '../ui/Button'

export function FixPanel({
  mission,
  onSubmit,
}: {
  mission: ActiveMission
  onSubmit: (fixId: string) => void
}) {
  const [selected, setSelected] = useState<string | null>(null)
  const [wrongFlash, setWrongFlash] = useState<string | null>(null)

  const options = useMemo(() => {
    const correct = FIXES.find((f) => f.id === mission.fault.correctFixId)!
    const decoys = sample(
      FIXES.filter((f) => f.id !== correct.id),
      3,
    )
    return shuffle([correct, ...decoys])
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mission.id])

  return (
    <GlassPanel className="p-4 border-[color:var(--color-success)]/30" glow>
      <div className="mb-3">
        <div className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-success)]">
          DIAGNOSIS CONFIRMED — {mission.fault.code.toUpperCase()}
        </div>
        <div className="text-sm text-[color:var(--color-ink-dim)] mt-1">
          Now choose the correct fix to resolve it.
        </div>
      </div>

      <div className="space-y-2">
        {options.map((opt) => (
          <button
            key={opt.id}
            onClick={() => setSelected(opt.id)}
            className={`w-full rounded-xl border px-3 py-2.5 text-left text-sm transition-colors ${
              selected === opt.id
                ? 'border-[color:var(--color-brand)] bg-[color:var(--color-brand)]/15'
                : 'border-[color:var(--color-panel-border)] bg-white/5 hover:bg-white/10'
            } ${wrongFlash === opt.id ? 'border-[color:var(--color-fault)] bg-[color:var(--color-fault)]/10' : ''}`}
          >
            {opt.label}
          </button>
        ))}
      </div>

      <div className="mt-4 flex justify-end">
        <Button
          variant="success"
          size="sm"
          disabled={!selected}
          onClick={() => {
            if (!selected) return
            const wasCorrect = selected === mission.fault.correctFixId
            onSubmit(selected)
            if (!wasCorrect) {
              setWrongFlash(selected)
              setTimeout(() => setWrongFlash(null), 700)
            }
          }}
        >
          Apply fix
        </Button>
      </div>
    </GlassPanel>
  )
}
