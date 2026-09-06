import type { JobListing } from './types'
import { MOCK_JOBS } from '../data/jobs'

/**
 * Fetch job listings for the swipe UX.
 *
 * Default: returns curated mocks from `src/data/jobs.ts`.
 * Optional: set `VITE_JOBS_API_URL` to a JSON endpoint that returns
 * `{ jobs: JobListing[] }` or a bare `JobListing[]`. No scrapers.
 */
export async function fetchJobs(): Promise<JobListing[]> {
  const apiUrl = (import.meta.env.VITE_JOBS_API_URL as string | undefined)?.trim()

  if (!apiUrl) {
    return MOCK_JOBS
  }

  try {
    const res = await fetch(apiUrl)
    if (!res.ok) {
      console.warn(`[jobs] API ${res.status}; falling back to mocks`)
      return MOCK_JOBS
    }
    const data: unknown = await res.json()
    const jobs = normalizeJobsPayload(data)
    if (!jobs.length) {
      console.warn('[jobs] API returned no jobs; falling back to mocks')
      return MOCK_JOBS
    }
    return jobs
  } catch (err) {
    console.warn('[jobs] API fetch failed; falling back to mocks', err)
    return MOCK_JOBS
  }
}

function normalizeJobsPayload(data: unknown): JobListing[] {
  if (Array.isArray(data)) {
    return data.filter(isJobListing)
  }
  if (data && typeof data === 'object' && 'jobs' in data) {
    const jobs = (data as { jobs: unknown }).jobs
    if (Array.isArray(jobs)) return jobs.filter(isJobListing)
  }
  return []
}

function isJobListing(row: unknown): row is JobListing {
  if (!row || typeof row !== 'object') return false
  const j = row as Record<string, unknown>
  const remoteOk = j.remote === 'remote' || j.remote === 'hybrid' || j.remote === 'onsite'
  const tagsOk =
    j.tags === undefined ||
    (Array.isArray(j.tags) && j.tags.every((t): t is string => typeof t === 'string'))
  return (
    typeof j.id === 'string' &&
    typeof j.title === 'string' &&
    typeof j.company === 'string' &&
    typeof j.location === 'string' &&
    typeof j.blurb === 'string' &&
    typeof j.source === 'string' &&
    typeof j.applyUrl === 'string' &&
    remoteOk &&
    tagsOk
  )
}

const INTERESTED_KEY = 'fpbp.interestedJobs'

export function loadInterestedIds(): string[] {
  try {
    const raw = localStorage.getItem(INTERESTED_KEY)
    if (!raw) return []
    const parsed: unknown = JSON.parse(raw)
    return Array.isArray(parsed) ? parsed.filter((id): id is string => typeof id === 'string') : []
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
