import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { PortfolioView } from '../components/PortfolioView'
import { useAuth } from '../context/AuthContext'
import { fetchPortfolioBySlug } from '../lib/api'
import { isSupabaseConfigured } from '../lib/supabase'
import type { PortfolioBundle } from '../lib/types'
import { works as demoWorks, experience as demoExperience } from '../data'

/** Offline demo only — not shown for real Supabase portfolios. */
function DemoPortfolio({ slug }: { slug: string }) {
  return (
    <PortfolioView
      profile={{
        id: 'demo',
        slug,
        display_name: 'Alex Rivera',
        headline: 'Director of photography',
        bio: 'Selected frames and finishing notes from recent collaborations.',
        contact_email: 'alex@example.com',
        hero_path: '/media/hero.jpg',
        work_section_title: 'Multimedia & External Links',
        work_section_blurb: 'Images, videos, embeds, and links.',
        resume_section_title: 'Experience',
        resume_section_blurb: '',
        contact_section_title: 'Contact',
        contact_section_blurb: 'Available for select collaborations.',
        cta_primary_label: 'View work',
        cta_secondary_label: 'Email me',
        allow_downloads: false,
        resume_file_path: null,
        is_admin: false,
        created_at: '',
        updated_at: '',
      }}
      works={demoWorks.map((w, i) => ({
        id: w.id,
        owner_id: 'demo',
        title: w.title,
        role: w.role,
        year: w.year,
        image_path: w.image,
        file_path: null,
        link_url: null,
        alt: w.alt,
        sort_order: i,
        created_at: '',
        updated_at: '',
      }))}
      experience={demoExperience.map((e, i) => ({
        id: e.id,
        owner_id: 'demo',
        role: e.role,
        org: e.org,
        period: e.period,
        detail: e.detail,
        sort_order: i,
        created_at: '',
        updated_at: '',
      }))}
    />
  )
}

export function PortfolioPage() {
  const { slug = '' } = useParams()
  const { profile: me } = useAuth()
  const [bundle, setBundle] = useState<PortfolioBundle | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!bundle?.profile.display_name) return
    const previous = document.title
    document.title = bundle.profile.display_name
    return () => {
      document.title = previous
    }
  }, [bundle])

  useEffect(() => {
    let cancelled = false
    setLoading(true)
    setError(null)

    if (!isSupabaseConfigured) {
      setLoading(false)
      return
    }

    ;(async () => {
      try {
        const data = await fetchPortfolioBySlug(slug)
        if (cancelled) return
        setBundle(data)
      } catch (err) {
        if (!cancelled) {
          setError(err instanceof Error ? err.message : 'Failed to load portfolio')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()

    return () => {
      cancelled = true
    }
  }, [slug])

  if (!isSupabaseConfigured) {
    return <DemoPortfolio slug={slug || 'demo'} />
  }

  if (loading) {
    return (
      <div className="shell-status">
        <p>Loading portfolio…</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="studio-shell">
        <h1>Something went wrong</h1>
        <p className="muted">{error}</p>
        <Link to="/">Home</Link>
      </div>
    )
  }

  if (!bundle) {
    return (
      <div className="studio-shell">
        <h1>Portfolio not found</h1>
        <p className="muted">No public portfolio at /u/{slug}.</p>
        <Link to="/">Home</Link>
      </div>
    )
  }

  return (
    <PortfolioView
      profile={bundle.profile}
      works={bundle.works}
      experience={bundle.experience}
      showStudioLink={me?.id === bundle.profile.id}
    />
  )
}
