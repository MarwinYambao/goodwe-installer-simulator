// ── Tools ──────────────────────────────────────────────────────────────────
export type ToolId =
  | 'multimeter'
  | 'clamp_meter'
  | 'megger'
  | 'solargo'
  | 'sems'
  | 'rs485_tester'
  | 'laptop'
  | 'visual'

export interface Tool {
  id: ToolId
  name: string
  shortName: string
  description: string
  unlockedByDefault: boolean
}

// ── Checks (diagnostic actions) ─────────────────────────────────────────────
export type CheckId =
  | 'visual_inspection'
  | 'multimeter_pv'
  | 'multimeter_ac'
  | 'clamp_meter_current'
  | 'megger_insulation'
  | 'solargo_status'
  | 'sems_portal'
  | 'rs485_test'

export interface Check {
  id: CheckId
  toolId: ToolId
  label: string
  actionVerb: string // e.g. "Measure", "Scan", "Inspect"
  unit?: string
}

export type ReadingFlag = 'normal' | 'warning' | 'fault'

export interface Reading {
  value: string
  flag: ReadingFlag
  note: string
}

// ── Knowledge base: faults ──────────────────────────────────────────────────
export type FaultCategory = 'dc' | 'ac' | 'grid' | 'battery' | 'comms' | 'safety' | 'config'

export type LedState = 'on' | 'off' | 'blink-slow' | 'blink-fast'
export type InspectZone = 'dc' | 'ac' | 'comms' | 'internal'

export interface FaultDefinition {
  id: string
  code: string // GoodWe-style fault code / name shown on inverter LED or SolarGo
  category: FaultCategory
  difficulty: 1 | 2 | 3 | 4 | 5
  weatherContext?: ('sunny' | 'rain' | 'cloudy' | 'night')[]
  customerComplaint: string
  followUpDialogue: { question: string; answer: string }[]
  readings: Partial<Record<CheckId, Reading>>
  keyChecks: CheckId[] // checks that must be run before a diagnosis can be submitted
  correctFixId: string
  xpReward: number
  coinReward: number
  hint: string
  /** Real GoodWe-style front-panel LED behaviour for this fault */
  ledState: { power: LedState; run: LedState; fault: LedState }
  /** What the inverter's own LCD/status line would show */
  screenText: string
  /** Which physical bay reveals the visible clue when opened */
  inspectZone: InspectZone
}

export interface FixOption {
  id: string
  label: string
}

// ── Mission runtime state ───────────────────────────────────────────────────
export type MissionPhase = 'briefing' | 'diagnosing' | 'diagnosis_select' | 'fix_select' | 'result'

export interface MissionLogEntry {
  checkId: CheckId
  reading: Reading
  timestamp: number
}

export interface ActiveMission {
  id: string
  fault: FaultDefinition
  phase: MissionPhase
  log: MissionLogEntry[]
  satisfaction: number // 0-100, decreases with time/wrong actions
  diagnosisAttempts: string[]
  fixAttempts: string[]
  startedAt: number
  outcome?: {
    success: boolean
    xpEarned: number
    coinsEarned: number
    message: string
  }
}

// ── Player ───────────────────────────────────────────────────────────────
export interface PlayerStats {
  xp: number
  coins: number
  reputation: number // 0-100
  missionsCompleted: number
  missionsFailed: number
  perfectDiagnoses: number
  unlockedTools: ToolId[]
  badges: string[]
  missionHistory: {
    faultId: string
    faultCode: string
    success: boolean
    xpEarned: number
    coinsEarned: number
    completedAt: number
  }[]
}

export const RANKS = [
  { title: 'Junior Installer', minLevel: 1 },
  { title: 'Field Installer', minLevel: 5 },
  { title: 'Senior Installer', minLevel: 10 },
  { title: 'Commissioning Specialist', minLevel: 18 },
  { title: 'Master GoodWe Engineer', minLevel: 30 },
] as const
