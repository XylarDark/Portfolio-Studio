import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import type { JobCraft, JobFilters, JobKind, JobListing } from '../lib/types'
import {
  ITERATION_0,
  buildDeck,
  clearInterestedIds,
  defaultFilters,
  fetchJobs,
  loadDailySwipeCount,
  loadInterestedIds,
  loadPortfolioPulse,
  saveDailySwipeCount,
  saveInterestedIds,
  savePortfolioPulse,
} from '../lib/jobs'
import '../App.css'
import './SwipeJobsPage.css'

type Phase = 'filters' | 'swipe' | 'cooldown' | 'unlock' | 'done'
type UnlockChoice = 'pulse' | 'filter' | null
type SwipeDir = 'left' | 'right' | null

const KIND_OPTIONS: { value: JobKind; label: string }[] = [
  { value: 'job', label: 'Job' },
  { value: 'gig', label: 'Gig' },
  { value: 'project', label: 'Project' },
]

const CRAFT_OPTIONS: { value: JobCraft; label: string }[] = [
  { value: 'design', label: 'Design' },
  { value: 'photo', label: 'Photo' },
  { value: 'film', label: 'Film / motion' },
  { value: 'writing', label: 'Writing' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'product', label: 'Product' },
  { value: 'founding', label: 'Founding' },
]

const REMOTE_OPTIONS: { value: JobListing['remote']; label: string }[] = [
  { value: 'remote', label: 'Remote' },
  { value: 'hybrid', label: 'Hybrid' },
  { value: 'onsite', label: 'On-site' },
]

function remoteLabel(remote: JobListing['remote']): string {
  if (remote === 'remote') return 'Remote'
  if (remote === 'hybrid') return 'Hybrid'
  return 'On-site'
}

function kindLabel(kind: JobListing['kind']): string {
  if (kind === 'gig') return 'Gig'
  if (kind === 'project') return 'Project'
  return 'Job'
}

function toggleIn<T extends string>(list: T[], value: T): T[] {
  return list.includes(value) ? list.filter((v) => v !== value) : [...list, value]
}

export function SwipeJobsPage() {
  const allJobs = useMemo(() => fetchJobs(), [])
  const [filters, setFilters] = useState<JobFilters>(() => defaultFilters())
  const [deck, setDeck] = useState<JobListing[]>([])
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<Phase>('filters')
  const [interestedIds, setInterestedIds] = useState<string[]>(() => loadInterestedIds())
  const [dailyUsed, setDailyUsed] = useState(() => loadDailySwipeCount())
  const [cooldownLeft, setCooldownLeft] = useState(0)
  const [swipesSinceUnlock, setSwipesSinceUnlock] = useState(0)
  const [unlockChoice, setUnlockChoice] = useState<UnlockChoice>(null)
  const [pulseDraft, setPulseDraft] = useState(() => loadPortfolioPulse())
  const [swipeDir, setSwipeDir] = useState<SwipeDir>(null)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const dragXRef = useRef(0)
  const animating = useRef(false)
  const cooldownTimer = useRef<number | null>(null)

  useEffect(() => {
    saveInterestedIds(interestedIds)
  }, [interestedIds])

  useEffect(() => {
    return () => {
      if (cooldownTimer.current) window.clearInterval(cooldownTimer.current)
    }
  }, [])

  const current = deck[index] ?? null
  const deckRemaining = Math.max(deck.length - index, 0)
  const dailyLeft = Math.max(ITERATION_0.dailyBudget - dailyUsed, 0)
  const interestedJobs = useMemo(
    () => allJobs.filter((j) => interestedIds.includes(j.id)),
    [allJobs, interestedIds],
  )

  const startDeck = useCallback(
    (nextFilters: JobFilters) => {
      const next = buildDeck(allJobs, nextFilters)
      setFilters(nextFilters)
      setDeck(next)
      setIndex(0)
      setSwipesSinceUnlock(0)
      setUnlockChoice(null)
      setSwipeDir(null)
      dragXRef.current = 0
      setDragX(0)
      if (next.length === 0 || dailyLeft <= 0) {
        setPhase('done')
      } else {
        setPhase('swipe')
      }
    },
    [allJobs, dailyLeft],
  )

  const beginCooldownOrNext = useCallback(
    (nextIndex: number, nextSinceUnlock: number, nextDailyUsed: number) => {
      const budgetLeft = ITERATION_0.dailyBudget - nextDailyUsed
      const cardsLeft = deck.length - nextIndex

      if (budgetLeft <= 0 || cardsLeft <= 0) {
        setPhase('done')
        return
      }

      if (nextSinceUnlock >= ITERATION_0.unlockEvery) {
        setUnlockChoice(null)
        setPhase('unlock')
        return
      }

      setPhase('cooldown')
      setCooldownLeft(Math.ceil(ITERATION_0.cooldownMs / 1000))
      if (cooldownTimer.current) window.clearInterval(cooldownTimer.current)
      const started = Date.now()
      cooldownTimer.current = window.setInterval(() => {
        const elapsed = Date.now() - started
        const left = Math.max(0, Math.ceil((ITERATION_0.cooldownMs - elapsed) / 1000))
        setCooldownLeft(left)
        if (elapsed >= ITERATION_0.cooldownMs) {
          if (cooldownTimer.current) window.clearInterval(cooldownTimer.current)
          cooldownTimer.current = null
          setPhase('swipe')
        }
      }, 200)
    },
    [deck.length],
  )

  const advance = useCallback(
    (dir: 'left' | 'right', job: JobListing) => {
      if (animating.current || phase !== 'swipe') return
      if (dailyLeft <= 0) {
        setPhase('done')
        return
      }

      animating.current = true
      setSwipeDir(dir)
      if (dir === 'right') {
        setInterestedIds((prev) => (prev.includes(job.id) ? prev : [...prev, job.id]))
      }

      const nextDaily = dailyUsed + 1
      const nextSince = swipesSinceUnlock + 1
      setDailyUsed(nextDaily)
      saveDailySwipeCount(nextDaily)
      setSwipesSinceUnlock(nextSince)

      window.setTimeout(() => {
        const nextIndex = index + 1
        setIndex(nextIndex)
        setSwipeDir(null)
        dragXRef.current = 0
        setDragX(0)
        animating.current = false
        beginCooldownOrNext(nextIndex, nextSince, nextDaily)
      }, 280)
    },
    [beginCooldownOrNext, dailyLeft, dailyUsed, index, phase, swipesSinceUnlock],
  )

  const onPass = useCallback(() => {
    if (!current) return
    advance('left', current)
  }, [advance, current])

  const onInterested = useCallback(() => {
    if (!current) return
    advance('right', current)
  }, [advance, current])

  function onPointerDown(e: ReactPointerEvent<HTMLElement>) {
    if (!current || animating.current || phase !== 'swipe') return
    pointerStart.current = { x: e.clientX, y: e.clientY }
    setDragging(true)
    ;(e.currentTarget as HTMLElement).setPointerCapture(e.pointerId)
  }

  function onPointerMove(e: ReactPointerEvent<HTMLElement>) {
    if (!pointerStart.current || !dragging) return
    const dx = e.clientX - pointerStart.current.x
    dragXRef.current = dx
    setDragX(dx)
  }

  function onPointerUp() {
    if (!pointerStart.current || !current || phase !== 'swipe') {
      setDragging(false)
      dragXRef.current = 0
      setDragX(0)
      pointerStart.current = null
      return
    }
    const threshold = 90
    const dx = dragXRef.current
    if (dx > threshold) advance('right', current)
    else if (dx < -threshold) advance('left', current)
    else {
      dragXRef.current = 0
      setDragX(0)
    }
    setDragging(false)
    pointerStart.current = null
  }

  function clearInterested() {
    setInterestedIds([])
    clearInterestedIds()
  }

  function completeUnlockPulse() {
    const trimmed = pulseDraft.trim()
    if (!trimmed) return
    savePortfolioPulse(trimmed)
    setSwipesSinceUnlock(0)
    setUnlockChoice(null)
    setPhase('swipe')
  }

  function completeUnlockFilter() {
    const next = buildDeck(allJobs, filters)
    setDeck(next)
    setIndex(0)
    setSwipesSinceUnlock(0)
    setUnlockChoice(null)
    if (next.length === 0 || dailyLeft <= 0) setPhase('done')
    else setPhase('swipe')
  }

  const rotation = dragX * 0.04
  const cardStyle =
    swipeDir === 'left'
      ? { transform: 'translateX(-120%) rotate(-14deg)', opacity: 0 }
      : swipeDir === 'right'
        ? { transform: 'translateX(120%) rotate(14deg)', opacity: 0 }
        : {
            transform: `translateX(${dragX}px) rotate(${rotation}deg)`,
            transition: dragging ? 'none' : 'transform 0.25s var(--ease)',
          }

  const filtersValid =
    filters.kinds.length > 0 && filters.crafts.length > 0 && filters.remotes.length > 0

  return (
    <div className="swipe">
      <header className="swipe-nav">
        <Link to="/" className="swipe-brand">
          For People, By People
        </Link>
        <nav className="swipe-nav-links" aria-label="Primary">
          <Link to="/">Studio</Link>
          <span className="swipe-nav-current" aria-current="page">
            Find work
          </span>
        </nav>
      </header>

      <main className="swipe-main">
        <div className="swipe-intro">
          <p className="swipe-eyebrow">Iteration 0 · Creatives & entrepreneurs</p>
          <h1>Find work</h1>
          <p className="swipe-lede">
            Filtered one-card swipe — not a feed. Set filters, get up to {ITERATION_0.deckSize}{' '}
            openings, then Interested or Pass. Pace: {ITERATION_0.cooldownMs / 1000}s between cards,{' '}
            {ITERATION_0.dailyBudget} swipes/day, unlock every {ITERATION_0.unlockEvery}.
          </p>
        </div>

        {phase !== 'filters' ? (
          <p className="swipe-meters" aria-live="polite">
            Deck {deckRemaining}/{deck.length || ITERATION_0.deckSize}
            <span aria-hidden="true"> · </span>
            Today {dailyLeft}/{ITERATION_0.dailyBudget}
          </p>
        ) : null}

        {phase === 'filters' ? (
          <section className="swipe-filters" aria-label="Filters">
            <h2>Set filters</h2>
            <p className="swipe-filters-hint">Pick at least one in each group, then start a deck of up to 10.</p>

            <fieldset>
              <legend>Type</legend>
              <div className="swipe-chip-row">
                {KIND_OPTIONS.map((opt) => (
                  <label key={opt.value} className={`swipe-chip ${filters.kinds.includes(opt.value) ? 'is-on' : ''}`}>
                    <input
                      type="checkbox"
                      checked={filters.kinds.includes(opt.value)}
                      onChange={() =>
                        setFilters((f) => ({ ...f, kinds: toggleIn(f.kinds, opt.value) }))
                      }
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Craft</legend>
              <div className="swipe-chip-row">
                {CRAFT_OPTIONS.map((opt) => (
                  <label key={opt.value} className={`swipe-chip ${filters.crafts.includes(opt.value) ? 'is-on' : ''}`}>
                    <input
                      type="checkbox"
                      checked={filters.crafts.includes(opt.value)}
                      onChange={() =>
                        setFilters((f) => ({ ...f, crafts: toggleIn(f.crafts, opt.value) }))
                      }
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset>
              <legend>Where</legend>
              <div className="swipe-chip-row">
                {REMOTE_OPTIONS.map((opt) => (
                  <label
                    key={opt.value}
                    className={`swipe-chip ${filters.remotes.includes(opt.value) ? 'is-on' : ''}`}
                  >
                    <input
                      type="checkbox"
                      checked={filters.remotes.includes(opt.value)}
                      onChange={() =>
                        setFilters((f) => ({ ...f, remotes: toggleIn(f.remotes, opt.value) }))
                      }
                    />
                    {opt.label}
                  </label>
                ))}
              </div>
            </fieldset>

            <button
              type="button"
              className="cta primary"
              disabled={!filtersValid || dailyLeft <= 0}
              onClick={() => startDeck(filters)}
            >
              {dailyLeft <= 0 ? 'Daily budget used' : 'Start deck'}
            </button>
          </section>
        ) : null}

        {phase === 'cooldown' ? (
          <p className="swipe-status" aria-live="polite">
            Next card in {cooldownLeft}s…
          </p>
        ) : null}

        {phase === 'unlock' ? (
          <section className="swipe-unlock" aria-label="Unlock next cards">
            <h2>Unlock the next cards</h2>
            <p>Every {ITERATION_0.unlockEvery} swipes, pick one small action.</p>
            <div className="swipe-unlock-choices">
              <button
                type="button"
                className={`cta ghost ${unlockChoice === 'pulse' ? 'is-selected' : ''}`}
                onClick={() => setUnlockChoice('pulse')}
              >
                Portfolio pulse
              </button>
              <button
                type="button"
                className={`cta ghost ${unlockChoice === 'filter' ? 'is-selected' : ''}`}
                onClick={() => setUnlockChoice('filter')}
              >
                Tweak filters
              </button>
            </div>

            {unlockChoice === 'pulse' ? (
              <div className="swipe-unlock-panel">
                <label htmlFor="portfolio-pulse">One-line portfolio update</label>
                <textarea
                  id="portfolio-pulse"
                  rows={3}
                  value={pulseDraft}
                  onChange={(e) => setPulseDraft(e.target.value)}
                  placeholder="e.g. Shipping a short documentary stills set this month."
                />
                <button
                  type="button"
                  className="cta primary"
                  disabled={!pulseDraft.trim()}
                  onClick={completeUnlockPulse}
                >
                  Save pulse & continue
                </button>
              </div>
            ) : null}

            {unlockChoice === 'filter' ? (
              <div className="swipe-unlock-panel">
                <p className="swipe-filters-hint">Adjust filters, then rebuild the remaining deck.</p>
                <fieldset>
                  <legend>Type</legend>
                  <div className="swipe-chip-row">
                    {KIND_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={`swipe-chip ${filters.kinds.includes(opt.value) ? 'is-on' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={filters.kinds.includes(opt.value)}
                          onChange={() =>
                            setFilters((f) => ({ ...f, kinds: toggleIn(f.kinds, opt.value) }))
                          }
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Craft</legend>
                  <div className="swipe-chip-row">
                    {CRAFT_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={`swipe-chip ${filters.crafts.includes(opt.value) ? 'is-on' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={filters.crafts.includes(opt.value)}
                          onChange={() =>
                            setFilters((f) => ({ ...f, crafts: toggleIn(f.crafts, opt.value) }))
                          }
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <fieldset>
                  <legend>Where</legend>
                  <div className="swipe-chip-row">
                    {REMOTE_OPTIONS.map((opt) => (
                      <label
                        key={opt.value}
                        className={`swipe-chip ${filters.remotes.includes(opt.value) ? 'is-on' : ''}`}
                      >
                        <input
                          type="checkbox"
                          checked={filters.remotes.includes(opt.value)}
                          onChange={() =>
                            setFilters((f) => ({ ...f, remotes: toggleIn(f.remotes, opt.value) }))
                          }
                        />
                        {opt.label}
                      </label>
                    ))}
                  </div>
                </fieldset>
                <button
                  type="button"
                  className="cta primary"
                  disabled={!filtersValid}
                  onClick={completeUnlockFilter}
                >
                  Apply filters & continue
                </button>
              </div>
            ) : null}
          </section>
        ) : null}

        {phase === 'swipe' && current ? (
          <>
            <div className="swipe-stage">
              <article
                className={`swipe-card swipe-card-active ${swipeDir ? `is-exit-${swipeDir}` : ''} ${
                  dragX > 40 ? 'is-interested' : dragX < -40 ? 'is-pass' : ''
                }`}
                style={cardStyle}
                onPointerDown={onPointerDown}
                onPointerMove={onPointerMove}
                onPointerUp={onPointerUp}
                onPointerCancel={onPointerUp}
              >
                <div className="swipe-stamp swipe-stamp-yes" aria-hidden="true">
                  Interested
                </div>
                <div className="swipe-stamp swipe-stamp-no" aria-hidden="true">
                  Pass
                </div>

                <p className="swipe-card-source">
                  {kindLabel(current.kind)} · via {current.source}
                </p>
                <h2>{current.title}</h2>
                <p className="swipe-card-company">{current.company}</p>
                <p className="swipe-card-meta">
                  {current.location}
                  <span aria-hidden="true"> · </span>
                  {remoteLabel(current.remote)}
                </p>
                <p className="swipe-card-blurb">{current.blurb}</p>
                {current.tags?.length ? (
                  <ul className="swipe-tags">
                    {current.tags.map((tag) => (
                      <li key={tag}>{tag}</li>
                    ))}
                  </ul>
                ) : null}
                <a
                  className="swipe-apply"
                  href={current.applyUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={(e) => e.stopPropagation()}
                  onPointerDown={(e) => e.stopPropagation()}
                >
                  Apply at source
                </a>
              </article>
            </div>

            <div className="swipe-controls">
              <button type="button" className="swipe-btn swipe-btn-pass" onClick={onPass} aria-label="Pass">
                Pass
              </button>
              <p className="swipe-progress">
                {index + 1} / {deck.length}
              </p>
              <button
                type="button"
                className="swipe-btn swipe-btn-yes"
                onClick={onInterested}
                aria-label="Interested"
              >
                Interested
              </button>
            </div>
          </>
        ) : null}

        {phase === 'done' ? (
          <div className="swipe-done">
            <h2>
              {dailyLeft <= 0
                ? 'Daily swipe budget used'
                : deck.length === 0
                  ? 'No openings match these filters'
                  : "You've finished this deck"}
            </h2>
            <p>
              {interestedJobs.length
                ? `You marked ${interestedJobs.length} as interested.`
                : 'No interested roles yet.'}{' '}
              Come back tomorrow for a fresh budget, or start another filtered deck if you still have swipes.
            </p>
            <div className="swipe-done-actions">
              <button
                type="button"
                className="cta primary"
                disabled={dailyLeft <= 0}
                onClick={() => setPhase('filters')}
              >
                {dailyLeft <= 0 ? 'Budget empty' : 'New filters'}
              </button>
              {interestedJobs.length ? (
                <button type="button" className="cta ghost" onClick={clearInterested}>
                  Clear interested
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        {interestedJobs.length > 0 ? (
          <section className="swipe-saved" aria-label="Interested jobs">
            <div className="swipe-saved-head">
              <h2>Interested ({interestedJobs.length})</h2>
              <button type="button" className="text-btn" onClick={clearInterested}>
                Clear
              </button>
            </div>
            <ul className="swipe-saved-list">
              {interestedJobs.map((job) => (
                <li key={job.id}>
                  <div>
                    <strong>{job.title}</strong>
                    <span>
                      {job.company} · via {job.source}
                    </span>
                  </div>
                  <a href={job.applyUrl} target="_blank" rel="noopener noreferrer">
                    Apply
                  </a>
                </li>
              ))}
            </ul>
          </section>
        ) : null}
      </main>
    </div>
  )
}
