import { useState } from 'react'
import { motion } from 'framer-motion'
import type { InspectZone, LedState } from '../../types'
import { cn } from '../../lib/utils'

const LED_COLOR: Record<'power' | 'run' | 'fault', string> = {
  power: '#F5C542',
  run: 'var(--color-success)',
  fault: 'var(--color-fault)',
}

const LED_EXPLAINER: Record<'power' | 'run' | 'fault', (s: LedState) => string> = {
  power: (s) =>
    s === 'on'
      ? 'Power LED solid — inverter is electrified and network-configured.'
      : s === 'blink-slow'
        ? 'Power LED blinking slowly — Wi-Fi module not yet connected to the router.'
        : s === 'blink-fast'
          ? 'Power LED blinking fast — connected to the router but not syncing to the server.'
          : 'Power LED off — inverter has no supply.',
  run: (s) =>
    s === 'on'
      ? 'Run LED solid green — inverter is actively feeding power.'
      : 'Run LED off — inverter is not currently generating.',
  fault: (s) =>
    s === 'on'
      ? 'Fault LED solid red — an internal fault is flagged. Check SolarGo for the exact code.'
      : s === 'blink-slow' || s === 'blink-fast'
        ? 'Fault LED blinking — an intermittent or recurring fault is flagged. Check SolarGo for the exact code.'
        : 'Fault LED off — no fault currently flagged.',
}

function Led({ label, color, state }: { label: string; color: string; state: LedState }) {
  const on = state !== 'off'
  const duration = state === 'blink-fast' ? 0.5 : state === 'blink-slow' ? 1.6 : 0
  return (
    <div className="flex flex-col items-center gap-1">
      <motion.span
        className="h-2.5 w-2.5 rounded-full"
        style={{ backgroundColor: on ? color : '#2A3348', boxShadow: on ? `0 0 8px ${color}` : 'none' }}
        animate={duration ? { opacity: [1, 1, 0.15, 0.15, 1] } : { opacity: 1 }}
        transition={duration ? { duration, repeat: Infinity, times: [0, 0.4, 0.45, 0.9, 1] } : undefined}
      />
      <span className="font-mono text-[8px] tracking-wider text-[color:var(--color-ink-faint)]">{label}</span>
    </div>
  )
}

const ZONE_LABEL: Record<InspectZone, string> = {
  dc: 'DC INPUT BAY',
  ac: 'AC OUTPUT BAY',
  comms: 'COMMS BAY',
  internal: 'INTERNAL (COVER CLOSED)',
}

export function InverterUnit({
  screenText,
  ledState,
  inspectZone,
  zoneClue,
  onInspectLed,
  onInspectZone,
}: {
  screenText: string
  ledState: { power: LedState; run: LedState; fault: LedState }
  inspectZone: InspectZone
  zoneClue: string | undefined
  onInspectLed: (label: string, note: string) => void
  onInspectZone: (zone: InspectZone) => void
}) {
  const [openedZone, setOpenedZone] = useState<InspectZone | null>(null)
  const [ledNote, setLedNote] = useState<string | null>(null)

  const zones: InspectZone[] = ['dc', 'ac', 'comms']

  return (
    <div className="rounded-2xl border-2 border-[color:var(--color-panel-border)] bg-gradient-to-b from-[#171f30] to-[#0c111c] p-4 sm:p-5">
      <div className="mb-3 flex items-center justify-between">
        <span className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-ink-faint)]">
          PHYSICAL UNIT — GW SERIES
        </span>
        <span className="font-mono text-[10px] text-[color:var(--color-ink-faint)]">
          Tap the LEDs or open a bay to inspect
        </span>
      </div>

      {/* Housing */}
      <div className="mx-auto max-w-sm rounded-xl border border-[color:var(--color-panel-border)] bg-[#11161f] p-4 shadow-[inset_0_2px_12px_rgba(0,0,0,0.5)]">
        {/* Logo strip */}
        <div className="mb-3 flex items-center justify-center gap-1.5">
          <div className="flex h-5 w-5 items-center justify-center rounded bg-[color:var(--color-brand)]">
            <span className="font-display text-[9px] font-bold text-white">GW</span>
          </div>
          <span className="font-display text-xs font-semibold tracking-wide text-[color:var(--color-ink-dim)]">
            GoodWe
          </span>
        </div>

        {/* Screen */}
        <div className="mb-4 rounded-md border border-[color:var(--color-panel-border)] bg-[#050a12] px-3 py-3 text-center">
          <div className="font-mono text-[9px] text-[color:var(--color-ink-faint)] mb-1">STATUS</div>
          <div
            className={cn(
              'font-mono text-sm font-semibold',
              screenText === 'Normal' ? 'text-[color:var(--color-success)]' : 'text-[color:var(--color-warning)]',
            )}
          >
            {screenText}
          </div>
        </div>

        {/* LEDs */}
        <div className="mb-4 flex justify-center gap-6 rounded-md border border-[color:var(--color-panel-border)] bg-white/[0.02] py-3">
          {(['power', 'run', 'fault'] as const).map((k) => (
            <button
              key={k}
              onClick={() => {
                const note = LED_EXPLAINER[k](ledState[k])
                setLedNote(note)
                onInspectLed(k.toUpperCase(), note)
              }}
              className="transition-transform active:scale-90"
            >
              <Led label={k.toUpperCase()} color={LED_COLOR[k]} state={ledState[k]} />
            </button>
          ))}
        </div>

        {/* DC switch */}
        <div className="flex items-center justify-center gap-2 mb-1">
          <span className="font-mono text-[8px] text-[color:var(--color-ink-faint)]">DC SWITCH</span>
          <div className="h-3 w-6 rounded-full border border-[color:var(--color-panel-border)] bg-[color:var(--color-success)]/20 relative">
            <span className="absolute right-0.5 top-0.5 h-2 w-2 rounded-full bg-[color:var(--color-success)]" />
          </div>
        </div>
      </div>

      {ledNote && (
        <motion.div
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-3 rounded-lg border border-[color:var(--color-panel-border)] bg-white/5 px-3 py-2 text-xs text-[color:var(--color-ink-dim)]"
        >
          {ledNote}
        </motion.div>
      )}

      {/* Terminal bays */}
      <div className="mt-4 grid grid-cols-3 gap-2">
        {zones.map((z) => (
          <button
            key={z}
            onClick={() => {
              setOpenedZone(z)
              onInspectZone(z)
            }}
            className={cn(
              'rounded-lg border px-2 py-2 text-center transition-colors',
              openedZone === z
                ? 'border-[color:var(--color-brand)]/60 bg-[color:var(--color-brand)]/10'
                : 'border-[color:var(--color-panel-border)] bg-white/5 hover:bg-white/10',
            )}
          >
            <span className="font-mono text-[9px] tracking-wide text-[color:var(--color-ink-dim)]">
              {ZONE_LABEL[z]}
            </span>
          </button>
        ))}
      </div>

      {openedZone && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          className="mt-3 overflow-hidden rounded-lg border border-[color:var(--color-panel-border)] bg-white/[0.03] px-3 py-3"
        >
          {openedZone === inspectZone ? (
            <div className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-fault)]" style={{ boxShadow: '0 0 6px var(--color-fault)' }} />
              <p className="text-xs text-[color:var(--color-ink)]">{zoneClue ?? 'Something looks off here.'}</p>
            </div>
          ) : (
            <div className="flex items-start gap-2">
              <span className="mt-0.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[color:var(--color-success)]" />
              <p className="text-xs text-[color:var(--color-ink-dim)]">Nothing unusual here — looks factory normal.</p>
            </div>
          )}
        </motion.div>
      )}
    </div>
  )
}
