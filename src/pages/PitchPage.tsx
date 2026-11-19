import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PortfolioView } from '../components/PortfolioView'
import { fetchPortfolioBySlug } from '../lib/api'
import { findPitch, type Pitch } from '../lib/pitches'
import { Blocks, CtaLink, ProjectCard, ShowcaseSection } from '../components/PitchContent'
import { isSupabaseConfigured } from '../lib/supabase'
import type { PortfolioBundle, Profile, Work } from '../lib/types'
import { withBase } from '../lib/urls'

/** Keep tailored pages out of search results; they are shared by direct link. */
function useNoIndex() {
  useEffect(() => {
    const meta = document.createElement('meta')
    meta.name = 'robots'
    meta.content = 'noindex, nofollow'
    document.head.appendChild(meta)
    return () => {
      meta.remove()
    }
  }, [])
}


function PitchSection({ pitch, resumeUrl }: { pitch: Pitch; resumeUrl: string }) {
  const { featured } = pitch
  const primary = pitch.primaryCta ?? featured.links?.[0]
  return (
    <section className="section pitch" id="pitch" aria-label={`For ${pitch.company}`}>
      <div className="section-intro" data-reveal>
        <p className="pitch-eyebrow">
          For {pitch.company} · {pitch.role}
        </p>
        <h2>{pitch.letterHeading ?? 'Why I’m a fit'}</h2>
      </div>

      <div className="pitch-grid">
        <div className="pitch-letter" data-reveal>
          <Blocks blocks={pitch.letter} />
          <p className="pitch-signoff">{pitch.signoff}</p>
          <div className="cta-row pitch-ctas">
            {primary ? <CtaLink link={primary} className="cta primary" /> : null}
            <a className="cta ghost" href={resumeUrl} download target="_blank" rel="noreferrer">
              Download résumé (PDF)
            </a>
            <a className="cta ghost" href="#contact">
              Get in touch
            </a>
          </div>
        </div>

        <ProjectCard project={featured} featured />
      </div>

      {pitch.other.length ? (
        <div className="pitch-other">
          <h3 className="pitch-other-title" data-reveal>
            Also relevant
          </h3>
          <ul className="pitch-other-list">
            {pitch.other.map((project) => (
              <li key={project.title}>
                <ProjectCard project={project} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}

function featuredFirst(works: Work[], title?: string): Work[] {
  if (!title) return works
  const wanted = title.trim().toLowerCase()
  const hit = works.filter((w) => w.title.trim().toLowerCase() === wanted)
  const rest = works.filter((w) => w.title.trim().toLowerCase() !== wanted)
  return [...hit, ...rest]
}

/** Used when Supabase isn't configured (local dev without env). */
function offlineProfile(slug: string): Profile {
  return {
    id: 'offline',
    slug,
    display_name: 'Luke Thompson',
    headline: '',
    bio: '',
    contact_email: '',
    hero_path: null,
    work_section_title: '',
    work_section_blurb: '',
    resume_section_title: 'Résumé',
    resume_section_blurb: '',
    contact_section_title: 'Contact',
    contact_section_blurb: '',
    cta_primary_label: '',
    cta_secondary_label: 'Contact me',
    allow_downloads: false,
    resume_file_path: null,
    accent_color: '',
    display_font: 'instrument',
    is_admin: false,
    created_at: '',
    updated_at: '',
  }
}

const PITCH_NAV = { href: '#pitch', label: 'Why me' }

export function PitchPage() {
  const { slug = '', pitch: pitchKey = '' } = useParams()
  const pitch = findPitch(slug, pitchKey)
  const [bundle, setBundle] = useState<PortfolioBundle | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  useNoIndex()

  useEffect(() => {
    if (!pitch) return
    const previous = document.title
    const name = bundle?.profile.display_name || 'Portfolio'
    document.title = `${name} — for ${pitch.company}`
    return () => {
      document.title = previous
    }
  }, [bundle, pitch])

  useEffect(() => {
    if (!pitch || !isSupabaseConfigured) return
    let cancelled = false
    setLoading(true)
    setError(null)
    ;(async () => {
      try {
        const data = await fetchPortfolioBySlug(slug)
        if (!cancelled) setBundle(data)
      } catch (err) {
        if (!cancelled) setError(err instanceof Error ? err.message : 'Failed to load portfolio')
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug, pitch])

  const resumeUrl = pitch ? withBase(pitch.resumePath) : ''

  const navItems = useMemo(
    () =>
      pitch?.showcase
        ? [PITCH_NAV, { href: `#${pitch.showcase.id}`, label: pitch.showcase.navLabel }]
        : [PITCH_NAV],
    [pitch],
  )

  const view = useMemo(() => {
    if (!pitch) return null
    const base = bundle?.profile ?? offlineProfile(slug)
    const profile: Profile = {
      ...base,
      headline: pitch.headline,
      bio: pitch.lede,
      resume_file_path: resumeUrl,
      resume_section_title: 'Résumé',
      resume_section_blurb: pitch.resumeBlurb,
    }
    return {
      profile,
      works: featuredFirst(bundle?.works ?? [], pitch.featuredWorkTitle),
      experience: bundle?.experience ?? [],
    }
  }, [bundle, pitch, resumeUrl, slug])

  if (!pitch) return <Navigate to={`/u/${slug}`} replace />

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
        <Link to={`/u/${slug}`}>Back to portfolio</Link>
      </div>
    )
  }

  if (isSupabaseConfigured && !bundle) {
    return <Navigate to={`/u/${slug}`} replace />
  }

  return (
    <PortfolioView
      profile={view!.profile}
      works={view!.works}
      experience={view!.experience}
      intro={
        <>
          <PitchSection pitch={pitch} resumeUrl={resumeUrl} />
          {pitch.showcase ? <ShowcaseSection showcase={pitch.showcase} /> : null}
        </>
      }
      introNav={navItems}
    />
  )
}
