import { useGameStore } from '../../store/gameStore'
import { rankForLevel, xpProgress } from '../../lib/utils'
import { ProgressBar } from '../ui/ProgressBar'

export function StatusBar() {
  const stats = useGameStore((s) => s.stats)
  const playerName = useGameStore((s) => s.playerName)
  const { level, current, needed } = xpProgress(stats.xp)
  const rank = rankForLevel(level)

  return (
    <header className="sticky top-0 z-30 border-b border-[color:var(--color-panel-border)] bg-[color:var(--color-base)]/80 backdrop-blur-xl">
      <div className="mx-auto flex max-w-7xl items-center gap-4 px-4 py-3 sm:px-6">
        <div className="flex items-center gap-2 shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--color-brand)]/15 border border-[color:var(--color-brand)]/40">
            <span className="font-display font-bold text-[color:var(--color-brand)] text-glow text-sm">GW</span>
          </div>
          <div className="hidden sm:block leading-tight">
            <div className="font-display font-semibold text-sm">Installer Academy</div>
            <div className="text-[11px] text-[color:var(--color-ink-dim)] font-mono">SIM v0.1</div>
          </div>
        </div>

        <div className="flex-1 min-w-0 flex items-center gap-3">
          <div className="min-w-0">
            <div className="flex items-baseline gap-2">
              <span className="font-display font-semibold text-sm truncate">{playerName}</span>
              <span className="text-[11px] text-[color:var(--color-brand)] font-mono shrink-0">
                LVL {level}
              </span>
            </div>
            <div className="text-[11px] text-[color:var(--color-ink-dim)] truncate">{rank}</div>
          </div>
          <div className="hidden md:block w-40">
            <ProgressBar value={current} max={needed} />
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0 font-mono text-sm">
          <div className="flex items-center gap-1.5 rounded-lg border border-[color:var(--color-panel-border)] bg-white/5 px-2.5 py-1.5">
            <span className="text-[color:var(--color-warning)]">◈</span>
            <span>{stats.coins}</span>
          </div>
          <div className="hidden sm:flex items-center gap-1.5 rounded-lg border border-[color:var(--color-panel-border)] bg-white/5 px-2.5 py-1.5">
            <span className="text-[color:var(--color-success)]">REP</span>
            <span>{stats.reputation}</span>
          </div>
        </div>
      </div>
    </header>
  )
}
