import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useGameStore } from '../store/gameStore'
import { CustomerBrief } from '../components/mission/CustomerBrief'
import { ToolBelt } from '../components/hud/ToolBelt'
import { ReadoutPanel } from '../components/hud/ReadoutPanel'
import { InverterUnit } from '../components/hud/InverterUnit'
import { DiagnosisPanel } from '../components/mission/DiagnosisPanel'
import { FixPanel } from '../components/mission/FixPanel'
import { MissionResult } from '../components/mission/MissionResult'
import { GlassPanel } from '../components/ui/GlassPanel'
import { ProgressBar } from '../components/ui/ProgressBar'
import { Button } from '../components/ui/Button'

export function MissionPage() {
  const navigate = useNavigate()
  const mission = useGameStore((s) => s.activeMission)
  const runCheck = useGameStore((s) => s.runCheck)
  const submitDiagnosis = useGameStore((s) => s.submitDiagnosis)
  const submitFix = useGameStore((s) => s.submitFix)
  const acknowledgeResult = useGameStore((s) => s.acknowledgeResult)
  const startMission = useGameStore((s) => s.startMission)

  useEffect(() => {
    if (!mission) navigate('/', { replace: true })
  }, [mission, navigate])

  if (!mission) return null

  const ranChecks = new Set(mission.log.map((l) => l.checkId))
  const satisfactionColor =
    mission.satisfaction > 60
      ? 'var(--color-success)'
      : mission.satisfaction > 30
        ? 'var(--color-warning)'
        : 'var(--color-fault)'

  if (mission.phase === 'result') {
    return (
      <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <MissionResult
          mission={mission}
          onContinue={() => {
            acknowledgeResult()
            navigate('/')
          }}
          onNextMission={() => {
            acknowledgeResult()
            startMission()
          }}
        />
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 space-y-4">
      {/* Job header */}
      <GlassPanel className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div>
          <div className="font-mono text-[10px] tracking-[0.2em] text-[color:var(--color-brand)]">
            ACTIVE JOB
          </div>
          <div className="font-display text-lg font-semibold">{mission.fault.code}</div>
        </div>
        <div className="w-full sm:w-56">
          <div className="flex justify-between text-[11px] font-mono text-[color:var(--color-ink-faint)] mb-1">
            <span>CUSTOMER SATISFACTION</span>
            <span>{mission.satisfaction}%</span>
          </div>
          <ProgressBar value={mission.satisfaction} max={100} colorVar={satisfactionColor} />
        </div>
      </GlassPanel>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Left: customer chat */}
        <div className="lg:col-span-1">
          <CustomerBrief fault={mission.fault} />
        </div>

        {/* Center + right: readout, tools, diagnosis/fix */}
        <div className="lg:col-span-2 space-y-4">
          {(mission.phase === 'diagnosing' || mission.phase === 'diagnosis_select') && (
            <InverterUnit
              screenText={mission.fault.screenText}
              ledState={mission.fault.ledState}
              inspectZone={mission.fault.inspectZone}
              zoneClue={mission.fault.readings.visual_inspection?.note}
              onInspectLed={() => {}}
              onInspectZone={(zone) => {
                if (zone === mission.fault.inspectZone) runCheck('visual_inspection')
              }}
            />
          )}

          <ReadoutPanel log={mission.log} />

          {(mission.phase === 'diagnosing' || mission.phase === 'diagnosis_select') && (
            <GlassPanel className="p-4">
              <ToolBelt ranChecks={ranChecks} onRun={runCheck} />
            </GlassPanel>
          )}

          {(mission.phase === 'diagnosing' || mission.phase === 'diagnosis_select') && (
            <DiagnosisPanel mission={mission} onSubmit={submitDiagnosis} />
          )}

          {mission.phase === 'fix_select' && <FixPanel mission={mission} onSubmit={submitFix} />}
        </div>
      </div>

      <div className="flex justify-start">
        <Button size="sm" onClick={() => navigate('/')}>
          ← Leave job (progress kept)
        </Button>
      </div>
    </div>
  )
}
