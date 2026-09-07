import type { JobFilters, JobListing } from './types'
import { ITERATION_0 } from './types'
import { MOCK_JOBS } from '../data/jobs'

/** Iteration 0: mocks only — no live API. */
export function fetchJobs(): JobListing[] {
  return MOCK_JOBS
}

export function defaultFilters(): JobFilters {
  return {
    kinds: ['job', 'gig', 'project'],
    crafts: ['design', 'photo', 'film', 'writing', 'illustration', 'product', 'founding'],
    remotes: ['remote', 'hybrid', 'onsite'],
  }
}

/** Build a finite filtered deck (Iteration 0: max 10). */
export function buildDeck(all: JobListing[], filters: JobFilters, size = ITERATION_0.deckSize): JobListing[] {
  const kinds = new Set(filters.kinds)
  const crafts = new Set(filters.crafts)
  const remotes = new Set(filters.remotes)

  const matched = all.filter(
    (j) => kinds.has(j.kind) && crafts.has(j.craft) && remotes.has(j.remote),
  )

  const shuffled = [...matched]
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, size)
}

const INTERESTED_KEY = 'fpbp.interestedJobs'
const DAILY_KEY = 'fpbp.dailySwipes'
const PULSE_KEY = 'fpbp.portfolioPulse'

export function loadInterestedIds(): string[] {
  try {
    const raw = localStorage.getItem(INTERESTED_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string' && id.length > 0) : []
  } catch {
    return []
  }
}

export function saveInterestedIds(ids: string[]): void {
  try {
    localStorage.setItem(INTERESTED_KEY, JSON.stringify(ids))
  } catch {
    // ignore quota / private mode
  }
}

export function clearInterestedIds(): void {
  try {
    localStorage.removeItem(INTERESTED_KEY)
  } catch {
    // ignore
  }
}

function todayKey(): string {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export function loadDailySwipeCount(): number {
  try {
    const raw = localStorage.getItem(DAILY_KEY)
    if (!raw) return 0
    const parsed: unknown = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return 0
    const row = parsed as { date?: unknown; count?: unknown }
    if (row.date !== todayKey()) return 0
    return typeof row.count === 'number' && row.count >= 0 ? row.count : 0
  } catch {
    return 0
  }
}

export function saveDailySwipeCount(count: number): void {
  try {
    localStorage.setItem(DAILY_KEY, JSON.stringify({ date: todayKey(), count }))
  } catch {
    // ignore
  }
}

export function loadPortfolioPulse(): string {
  try {
    return localStorage.getItem(PULSE_KEY) ?? ''
  } catch {
    return ''
  }
}

export function savePortfolioPulse(text: string): void {
  try {
    localStorage.setItem(PULSE_KEY, text)
  } catch {
    // ignore
  }
}

export { ITERATION_0 }
