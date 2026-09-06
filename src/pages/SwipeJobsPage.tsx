import { useCallback, useEffect, useMemo, useRef, useState, type PointerEvent as ReactPointerEvent } from 'react'
import { Link } from 'react-router-dom'
import type { JobListing } from '../lib/types'
import {
  clearInterestedIds,
  fetchJobs,
  loadInterestedIds,
  saveInterestedIds,
} from '../lib/jobs'
import '../App.css'
import './SwipeJobsPage.css'

type SwipeDir = 'left' | 'right' | null

function remoteLabel(remote: JobListing['remote']): string {
  if (remote === 'remote') return 'Remote'
  if (remote === 'hybrid') return 'Hybrid'
  return 'On-site'
}

export function SwipeJobsPage() {
  const [jobs, setJobs] = useState<JobListing[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [index, setIndex] = useState(0)
  const [interestedIds, setInterestedIds] = useState<string[]>(() => loadInterestedIds())
  const [swipeDir, setSwipeDir] = useState<SwipeDir>(null)
  const [dragX, setDragX] = useState(0)
  const [dragging, setDragging] = useState(false)
  const pointerStart = useRef<{ x: number; y: number } | null>(null)
  const dragXRef = useRef(0)
  const animating = useRef(false)

  useEffect(() => {
    let cancelled = false
    void (async () => {
      try {
        const list = await fetchJobs()
        if (!cancelled) {
          setJobs(list)
          setLoading(false)
        }
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load jobs')
          setLoading(false)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    saveInterestedIds(interestedIds)
  }, [interestedIds])

  const remaining = useMemo(() => jobs.slice(index), [jobs, index])
  const current = remaining[0] ?? null
  const next = remaining[1] ?? null
  const interestedJobs = useMemo(
    () => jobs.filter((j) => interestedIds.includes(j.id)),
    [jobs, interestedIds],
  )
  const done = !loading && !error && jobs.length > 0 && index >= jobs.length

  const advance = useCallback((dir: 'left' | 'right', job: JobListing) => {
    if (animating.current) return
    animating.current = true
    setSwipeDir(dir)
    if (dir === 'right') {
      setInterestedIds((prev) => (prev.includes(job.id) ? prev : [...prev, job.id]))
    }
    window.setTimeout(() => {
      setIndex((i) => i + 1)
      setSwipeDir(null)
      dragXRef.current = 0
      setDragX(0)
      animating.current = false
    }, 280)
  }, [])

  const onPass = useCallback(() => {
    if (!current) return
    advance('left', current)
  }, [advance, current])

  const onInterested = useCallback(() => {
    if (!current) return
    advance('right', current)
  }, [advance, current])

  function onPointerDown(e: ReactPointerEvent<HTMLElement>) {
    if (!current || animating.current) return
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
    if (!pointerStart.current || !current) {
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

  function resetDeck() {
    setJobs((prev) => {
      const next = [...prev]
      for (let i = next.length - 1; i > 0; i -= 1) {
        const j = Math.floor(Math.random() * (i + 1))
        ;[next[i], next[j]] = [next[j], next[i]]
      }
      return next
    })
    setIndex(0)
    setSwipeDir(null)
    dragXRef.current = 0
    setDragX(0)
  }

  function clearInterested() {
    setInterestedIds([])
    clearInterestedIds()
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
          <p className="swipe-eyebrow">Swipe jobs</p>
          <h1>Find work</h1>
          <p className="swipe-lede">
            Swipe right if you&apos;re interested, left to pass. Interested roles are saved in
            this browser so you can apply when ready.
          </p>
        </div>

        {loading ? <p className="swipe-status">Loading openings…</p> : null}
        {error ? <p className="swipe-status swipe-error">{error}</p> : null}

        {!loading && !error && jobs.length === 0 ? (
          <p className="swipe-status">No openings right now. Check back soon.</p>
        ) : null}

        {current ? (
          <div className="swipe-stage">
            {next ? (
              <article className="swipe-card swipe-card-next" aria-hidden="true">
                <p className="swipe-card-source">{next.source}</p>
                <h2>{next.title}</h2>
                <p className="swipe-card-company">{next.company}</p>
              </article>
            ) : null}

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

              <p className="swipe-card-source">{current.source}</p>
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
        ) : null}

        {done ? (
          <div className="swipe-done">
            <h2>You&apos;ve seen every opening</h2>
            <p>
              {interestedJobs.length
                ? `You marked ${interestedJobs.length} as interested.`
                : 'No interested roles yet — you can reshuffle and try again.'}
            </p>
            <div className="swipe-done-actions">
              <button type="button" className="cta primary" onClick={resetDeck}>
                Swipe again
              </button>
              {interestedJobs.length ? (
                <button type="button" className="cta ghost" onClick={clearInterested}>
                  Clear interested
                </button>
              ) : null}
            </div>
          </div>
        ) : null}

        {current ? (
          <div className="swipe-controls">
            <button
              type="button"
              className="swipe-btn swipe-btn-pass"
              onClick={onPass}
              aria-label="Pass"
            >
              Pass
            </button>
            <p className="swipe-progress">
              {Math.min(index + 1, jobs.length)} / {jobs.length}
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
                      {job.company} · {job.source}
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
