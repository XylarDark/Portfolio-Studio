import { useEffect, useMemo, useState } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { PortfolioView } from '../components/PortfolioView'
import { CtaLink, ProjectCard, ShowcaseSection } from '../components/PitchContent'
import { useAuth } from '../context/AuthContext'
import { fetchPortfolioBySlug } from '../lib/api'
import {
  PUBLIC_EXPERIENCE,
  PUBLIC_PORTFOLIO,
  PUBLIC_PORTFOLIO_SLUG,
  PUBLIC_PROJECTS,
  PUBLIC_RESUME_PATH,
  PUBLIC_SKILLS,
  PUBLIC_TOOLING_SHOWCASE,
} from '../lib/publicPortfolio'
import { isSupabaseConfigured } from '../lib/supabase'
import type { PortfolioBundle, Profile } from '../lib/types'
import { withBase } from '../lib/urls'

function fallbackProfile(slug: string): Profile {
  return {
    id: 'offline',
    slug,
    display_name: PUBLIC_PORTFOLIO.displayName,
    headline: PUBLIC_PORTFOLIO.headline,
    bio: PUBLIC_PORTFOLIO.lede,
    contact_email: '',
    hero_path: null,
    work_section_title: '',
    work_section_blurb: '',
    resume_section_title: 'Experience',
    resume_section_blurb: PUBLIC_PORTFOLIO.resumeBlurb,
    contact_section_title: 'Contact',
    contact_section_blurb: PUBLIC_PORTFOLIO.contactBlurb,
    cta_primary_label: '',
    cta_secondary_label: 'Get in touch',
    allow_downloads: true,
    resume_file_path: null,
    accent_color: '',
    display_font: 'instrument',
    is_admin: false,
    created_at: '',
    updated_at: '',
  }
}

function WorkSection({ resumeUrl }: { resumeUrl: string }) {
  const featured = PUBLIC_PROJECTS.filter((row) => row.featured)
  const other = PUBLIC_PROJECTS.filter((row) => !row.featured)
  return (
    <section className="section pitch public-work" id="work" aria-label="Selected work">
      <div className="section-intro" data-reveal>
        <p className="pitch-eyebrow">Selected work</p>
        <h2>Projects</h2>
      </div>

      <div className="public-skills" data-reveal>
        <h3 className="public-skills-title">Core skills</h3>
        <dl className="public-skills-list">
          {PUBLIC_SKILLS.map((skill) => (
            <div key={skill.label} className="public-skill">
              <dt>{skill.label}</dt>
              <dd>{skill.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="public-featured">
        {featured.map((row) => (
          <ProjectCard key={row.project.title} project={row.project} featured />
        ))}
      </div>

      {other.length ? (
        <ul className="pitch-other-list public-other">
          {other.map((row) => (
            <li key={row.project.title}>
              <ProjectCard project={row.project} />
            </li>
          ))}
        </ul>
      ) : null}

      <div className="resume-file-row public-resume-row" data-reveal>
        <a className="cta primary" href={resumeUrl} download target="_blank" rel="noreferrer">
          Download résumé (PDF)
        </a>
        <a className="cta ghost" href={PUBLIC_PORTFOLIO.githubHref} target="_blank" rel="noreferrer">
          GitHub
        </a>
      </div>
    </section>
  )
}

export function PublicPortfolioPage() {
  const { slug = '' } = useParams()
  const { profile: me } = useAuth()
  const [bundle, setBundle] = useState<PortfolioBundle | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)

  const allowed = slug === PUBLIC_PORTFOLIO_SLUG
  const resumeUrl = withBase(PUBLIC_RESUME_PATH)

  useEffect(() => {
    if (!allowed) return
    const previous = document.title
    document.title = `${PUBLIC_PORTFOLIO.displayName} — ${PUBLIC_PORTFOLIO.headline}`
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.getAttribute('content') ?? null
    if (meta) {
      meta.setAttribute(
        'content',
        'Game developer portfolio for Luke Thompson: HomeWorld (Unreal Engine 5.8 / C++), Shift (Phaser), and Unreal tools and pipeline work.',
      )
    }
    return () => {
      document.title = previous
      if (meta && previousDescription !== null) meta.setAttribute('content', previousDescription)
    }
  }, [allowed])

  useEffect(() => {
    if (!allowed || !isSupabaseConfigured) return
    let cancelled = false
    setLoading(true)
    ;(async () => {
      try {
        const data = await fetchPortfolioBySlug(slug)
        if (!cancelled) setBundle(data)
      } catch {
        // Static content can still render if the live profile fails to load.
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [allowed, slug])

  const profile = useMemo(() => {
    const base = bundle?.profile ?? fallbackProfile(slug)
    return {
      ...base,
      display_name: PUBLIC_PORTFOLIO.displayName,
      headline: PUBLIC_PORTFOLIO.headline,
      bio: PUBLIC_PORTFOLIO.lede,
      work_section_title: '',
      work_section_blurb: '',
      resume_section_title: 'Experience',
      resume_section_blurb: PUBLIC_PORTFOLIO.resumeBlurb,
      contact_section_title: 'Contact',
      contact_section_blurb: PUBLIC_PORTFOLIO.contactBlurb,
      cta_primary_label: '',
      cta_secondary_label: 'Get in touch',
      allow_downloads: true,
      resume_file_path: resumeUrl,
    } satisfies Profile
  }, [bundle, resumeUrl, slug])

  if (!allowed) return <Navigate to={`/u/${slug}`} replace />

  if (loading) {
    return (
      <div className="shell-status">
        <p>Loading portfolio…</p>
      </div>
    )
  }

  return (
    <PortfolioView
      profile={profile}
      works={[]}
      experience={PUBLIC_EXPERIENCE}
      showStudioLink={Boolean(me && bundle && me.id === bundle.profile.id)}
      intro={
        <>
          <WorkSection resumeUrl={resumeUrl} />
          <ShowcaseSection showcase={PUBLIC_TOOLING_SHOWCASE} />
        </>
      }
      introNav={[
        { href: '#work', label: 'Work' },
        { href: `#${PUBLIC_TOOLING_SHOWCASE.id}`, label: PUBLIC_TOOLING_SHOWCASE.navLabel },
      ]}
      heroCtas={
        <>
          <CtaLink
            link={{ label: 'Play Shift', href: 'https://xylardark.github.io/ShiftGame/' }}
            className="cta primary"
          />
          <a className="cta ghost" href="#tools">
            See the tools
          </a>
          <a className="cta ghost" href={resumeUrl} download target="_blank" rel="noreferrer">
            Download résumé
          </a>
        </>
      }
    />
  )
}
