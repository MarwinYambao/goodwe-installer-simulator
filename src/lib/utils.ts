import { RANKS } from '../types'

export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(' ')
}

export function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function sample<T>(arr: T[], n: number): T[] {
  return shuffle(arr).slice(0, n)
}

export function levelFromXp(xp: number): number {
  // Level thresholds grow gradually — 100 XP for level 2, scaling up.
  let level = 1
  let required = 100
  let remaining = xp
  while (remaining >= required) {
    remaining -= required
    level += 1
    required = Math.round(required * 1.18)
  }
  return level
}

export function xpProgress(xp: number): { level: number; current: number; needed: number } {
  let level = 1
  let required = 100
  let remaining = xp
  while (remaining >= required) {
    remaining -= required
    level += 1
    required = Math.round(required * 1.18)
  }
  return { level, current: remaining, needed: required }
}

export function rankForLevel(level: number): string {
  let rank: string = RANKS[0].title
  for (const r of RANKS) {
    if (level >= r.minLevel) rank = r.title
  }
  return rank
}

export function id(): string {
  return Math.random().toString(36).slice(2, 10)
}
