import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import type { ActiveMission, CheckId, PlayerStats, Reading } from '../types'
import { FAULTS } from '../data/faults'
import { id as genId, sample } from '../lib/utils'

const DEFAULT_STATS: PlayerStats = {
  xp: 0,
  coins: 50,
  reputation: 80,
  missionsCompleted: 0,
  missionsFailed: 0,
  perfectDiagnoses: 0,
  unlockedTools: ['visual', 'multimeter', 'clamp_meter', 'megger', 'solargo', 'sems'],
  badges: [],
  missionHistory: [],
}

interface GameState {
  playerName: string
  stats: PlayerStats
  activeMission: ActiveMission | null

  setPlayerName: (name: string) => void
  startMission: () => void
  runCheck: (checkId: CheckId) => void
  submitDiagnosis: (faultId: string) => { correct: boolean }
  submitFix: (fixId: string) => void
  acknowledgeResult: () => void
  resetSave: () => void
}

const FALLBACK_READING: Reading = {
  value: 'Nominal',
  flag: 'normal',
  note: 'Nothing unusual detected with this check.',
}

export const useGameStore = create<GameState>()(
  persist(
    (set, get) => ({
      playerName: 'Installer',
      stats: DEFAULT_STATS,
      activeMission: null,

      setPlayerName: (name) => set({ playerName: name || 'Installer' }),

      startMission: () => {
        const fault = sample(FAULTS, 1)[0]
        const mission: ActiveMission = {
          id: genId(),
          fault,
          phase: 'diagnosing',
          log: [],
          satisfaction: 100,
          diagnosisAttempts: [],
          fixAttempts: [],
          startedAt: Date.now(),
        }
        set({ activeMission: mission })
      },

      runCheck: (checkId) => {
        const mission = get().activeMission
        if (!mission) return
        const reading = mission.fault.readings[checkId] ?? FALLBACK_READING
        const alreadyRan = mission.log.some((l) => l.checkId === checkId)
        const satisfactionDrop = alreadyRan ? 1 : 4
        set({
          activeMission: {
            ...mission,
            log: [...mission.log, { checkId, reading, timestamp: Date.now() }],
            satisfaction: Math.max(0, mission.satisfaction - satisfactionDrop),
          },
        })
      },

      submitDiagnosis: (faultId) => {
        const mission = get().activeMission
        if (!mission) return { correct: false }
        const correct = faultId === mission.fault.id
        set({
          activeMission: {
            ...mission,
            diagnosisAttempts: [...mission.diagnosisAttempts, faultId],
            phase: correct ? 'fix_select' : 'diagnosis_select',
            satisfaction: correct ? mission.satisfaction : Math.max(0, mission.satisfaction - 12),
          },
        })
        return { correct }
      },

      submitFix: (fixId) => {
        const mission = get().activeMission
        if (!mission) return
        const correct = fixId === mission.fault.correctFixId
        const attempts = [...mission.fixAttempts, fixId]

        if (!correct) {
          set({
            activeMission: {
              ...mission,
              fixAttempts: attempts,
              satisfaction: Math.max(0, mission.satisfaction - 12),
            },
          })
          return
        }

        const keyChecksHit = mission.fault.keyChecks.every((c) =>
          mission.log.some((l) => l.checkId === c),
        )
        const isPerfect =
          mission.diagnosisAttempts.length === 1 &&
          attempts.length === 1 &&
          keyChecksHit &&
          mission.satisfaction >= 85

        const satisfactionMultiplier = Math.max(0.5, mission.satisfaction / 100)
        const xpEarned = Math.round(mission.fault.xpReward * satisfactionMultiplier * (isPerfect ? 1.25 : 1))
        const coinsEarned = Math.round(mission.fault.coinReward * satisfactionMultiplier * (isPerfect ? 1.25 : 1))

        const stats = get().stats
        const newBadges = [...stats.badges]
        if (isPerfect && !newBadges.includes('perfect-diagnosis')) {
          newBadges.push('perfect-diagnosis')
        }
        if (stats.missionsCompleted + 1 >= 10 && !newBadges.includes('ten-installs')) {
          newBadges.push('ten-installs')
        }

        set({
          activeMission: {
            ...mission,
            fixAttempts: attempts,
            phase: 'result',
            outcome: {
              success: true,
              xpEarned,
              coinsEarned,
              message: isPerfect
                ? 'Textbook diagnosis — first try, right checks, fully satisfied customer.'
                : 'Fault resolved. The customer is satisfied with the repair.',
            },
          },
          stats: {
            ...stats,
            xp: stats.xp + xpEarned,
            coins: stats.coins + coinsEarned,
            missionsCompleted: stats.missionsCompleted + 1,
            perfectDiagnoses: stats.perfectDiagnoses + (isPerfect ? 1 : 0),
            reputation: Math.min(100, stats.reputation + (isPerfect ? 3 : 1)),
            badges: newBadges,
            missionHistory: [
              {
                faultId: mission.fault.id,
                faultCode: mission.fault.code,
                success: true,
                xpEarned,
                coinsEarned,
                completedAt: Date.now(),
              },
              ...stats.missionHistory,
            ].slice(0, 50),
          },
        })
      },

      acknowledgeResult: () => {
        set({ activeMission: null })
      },

      resetSave: () => {
        set({ stats: DEFAULT_STATS, activeMission: null, playerName: 'Installer' })
      },
    }),
    {
      name: 'goodwe-installer-sim-save',
      partialize: (state) => ({ playerName: state.playerName, stats: state.stats }),
    },
  ),
)
