import { useState } from 'react'
import { motion } from 'framer-motion'
import type { FaultDefinition } from '../../types'
import { GlassPanel } from '../ui/GlassPanel'

export function CustomerBrief({ fault }: { fault: FaultDefinition }) {
  const [revealed, setRevealed] = useState<number[]>([])

  return (
    <GlassPanel className="p-4">
      <div className="mb-3 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[color:var(--color-brand)]/15 border border-[color:var(--color-brand)]/30 font-display text-xs font-semibold text-[color:var(--color-brand)]">
          C
        </div>
        <div>
          <div className="text-sm font-medium">Customer</div>
          <div className="text-[11px] text-[color:var(--color-ink-dim)] font-mono">Live chat</div>
        </div>
      </div>

      <div className="space-y-2">
        <motion.div
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl rounded-tl-sm bg-white/5 border border-[color:var(--color-panel-border)] px-3 py-2 text-sm"
        >
          {fault.customerComplaint}
        </motion.div>

        {fault.followUpDialogue.map((qa, i) => (
          <div key={i} className="space-y-2">
            <button
              onClick={() => setRevealed((r) => (r.includes(i) ? r : [...r, i]))}
              className="w-full rounded-xl rounded-tr-sm border border-[color:var(--color-brand)]/30 bg-[color:var(--color-brand)]/10 px-3 py-2 text-left text-sm text-[color:var(--color-brand)] hover:bg-[color:var(--color-brand)]/20 transition-colors"
            >
              Ask: “{qa.question}”
            </button>
            {revealed.includes(i) && (
              <motion.div
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-xl rounded-tl-sm bg-white/5 border border-[color:var(--color-panel-border)] px-3 py-2 text-sm"
              >
                {qa.answer}
              </motion.div>
            )}
          </div>
        ))}
      </div>

      {revealed.length < fault.followUpDialogue.length && fault.followUpDialogue.length > 0 && (
        <div className="mt-2 text-[11px] text-[color:var(--color-ink-faint)]">
          Tap a question to ask the customer for more detail.
        </div>
      )}
    </GlassPanel>
  )
}

