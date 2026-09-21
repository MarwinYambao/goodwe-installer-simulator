import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useGameStore } from '../store/gameStore'
import { GlassPanel } from '../components/ui/GlassPanel'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { rankForLevel, xpProgress } from '../lib/utils'
import { ProgressBar } from '../components/ui/ProgressBar'

const BADGE_LABELS: Record<string, string> = {
  'perfect-diagnosis': '🏆 Textbook Diagnosis',
  'ten-installs': '🔧 10 Installations',
}

export function DashboardPage() {
  const navigate = useNavigate()
  const stats = useGameStore((s) => s.stats)
  const playerName = useGameStore((s) => s.playerName)
  const setPlayerName = useGameStore((s) => s.setPlayerName)
  const startMission = useGameStore((s) => s.startMission)
  const { level, current, needed } = xpProgress(stats.xp)
  const rank = rankForLevel(level)

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-6">
      {/* Hero */}
      <GlassPanel className="p-6 sm:p-8" glow>
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
          <div>
            <div className="font-mono text-[11px] tracking-[0.2em] text-[color:var(--color-brand)]">
              GOODWE INSTALLER ACADEMY
            </div>
            <h1 className="mt-1 font-display text-2xl sm:text-3xl font-semibold">
              Welcome back,{' '}
              <input
                value={playerName}
                onChange={(e) => setPlayerName(e.target.value)}
                className="bg-transparent border-b border-dashed border-[color:var(--color-brand)]/40 focus:border-[color:var(--color-brand)] outline-none w-40"
              />
            </h1>
            <p className="mt-2 text-sm text-[color:var(--color-ink-dim)]">
              {rank} · Level {level}
            </p>
            <div className="mt-3 max-w-xs">
              <ProgressBar value={current} max={needed} />
              <div className="mt-1 text-[11px] font-mono text-[color:var(--color-ink-faint)]">
                {current} / {needed} XP to next level
              </div>
            </div>
          </div>
          <motion.div whileHover={{ scale: 1.02 }}>
            <Button
              variant="brand"
              className="!px-6 !py-3 text-base"
              onClick={() => {
                startMission()
                navigate('/mission')
              }}
            >
              Start Next Job →
            </Button>
          </motion.div>
        </div>
      </GlassPanel>

      {/* Stats grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <StatCard label="Missions Completed" value={stats.missionsCompleted} />
        <StatCard label="Perfect Diagnoses" value={stats.perfectDiagnoses} accent="var(--color-success)" />
        <StatCard label="Reputation" value={`${stats.reputation}/100`} accent="var(--color-brand)" />
        <StatCard label="Coins" value={stats.coins} accent="var(--color-warning)" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Badges */}
        <GlassPanel className="p-4">
          <div className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-ink-faint)] mb-3">
            BADGES & CERTIFICATES
          </div>
          {stats.badges.length === 0 ? (
            <p className="text-sm text-[color:var(--color-ink-faint)]">
              No badges yet — complete missions to start earning them.
            </p>
          ) : (
            <div className="flex flex-wrap gap-2">
              {stats.badges.map((b) => (
                <Badge key={b}>{BADGE_LABELS[b] ?? b}</Badge>
              ))}
            </div>
          )}
        </GlassPanel>

        {/* Mission history */}
        <GlassPanel className="p-4">
          <div className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-ink-faint)] mb-3">
            RECENT JOB HISTORY
          </div>
          {stats.missionHistory.length === 0 ? (
            <p className="text-sm text-[color:var(--color-ink-faint)]">
              Your completed jobs will show up here.
            </p>
          ) : (
            <div className="space-y-1.5 max-h-48 overflow-y-auto pr-1">
              {stats.missionHistory.slice(0, 8).map((m, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between rounded-lg border border-[color:var(--color-panel-border)] bg-white/5 px-3 py-2 text-sm"
                >
                  <span className="truncate">{m.faultCode}</span>
                  <span className="font-mono text-xs text-[color:var(--color-brand)] shrink-0 ml-2">
                    +{m.xpEarned} XP
                  </span>
                </div>
              ))}
            </div>
          )}
        </GlassPanel>
      </div>

      <p className="text-center text-[11px] text-[color:var(--color-ink-faint)] font-mono">
        Troubleshooting Mode — v0.1 preview · more modes (Installation, Commissioning, Warranty) coming soon
      </p>
    </div>
  )
}

function StatCard({ label, value, accent }: { label: string; value: string | number; accent?: string }) {
  return (
    <GlassPanel className="p-4">
      <div className="font-mono text-2xl font-semibold" style={{ color: accent ?? 'var(--color-ink)' }}>
        {value}
      </div>
      <div className="mt-1 text-[11px] text-[color:var(--color-ink-faint)]">{label}</div>
    </GlassPanel>
  )
}
