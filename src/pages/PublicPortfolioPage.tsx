import { useEffect, useMemo, useState, type KeyboardEvent } from 'react'
import { Link, Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ContactForm } from '../components/ContactForm'
import { MediaViewer } from '../components/MediaViewer'
import { CtaLink, FigureGallery, ProjectCard, ShowcaseSection } from '../components/PitchContent'
import { useAuth } from '../context/AuthContext'
import { fetchPortfolioBySlug } from '../lib/api'
import { detectKind } from '../lib/files'
import {
  HOMEWORLD_FIGURES,
  PORTFOLIO_TABS,
  PUBLIC_EXPERIENCE,
  PUBLIC_PORTFOLIO,
  PUBLIC_PORTFOLIO_SLUG,
  PUBLIC_PROJECTS,
  PUBLIC_RESUME_PATH,
  PUBLIC_SKILLS,
  PUBLIC_TOOLING_SHOWCASE,
  parsePortfolioTab,
  type PortfolioTabId,
} from '../lib/publicPortfolio'
import { isSupabaseConfigured, mediaUrl } from '../lib/supabase'
import { portfolioThemeStyle } from '../lib/theme'
import type { PortfolioBundle, Profile, ViewerAsset } from '../lib/types'
import { withBase } from '../lib/urls'
import '../App.css'

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

function OverviewPanel({
  resumeUrl,
  onOpenTab,
}: {
  resumeUrl: string
  onOpenTab: (tab: PortfolioTabId) => void
}) {
  return (
    <div className="public-panel">
      <p className="lede public-overview-lede">{PUBLIC_PORTFOLIO.lede}</p>
      <div className="cta-row">
        <CtaLink
          link={{ label: 'Play Shift', href: 'https://xylardark.github.io/ShiftGame/' }}
          className="cta primary"
        />
        <button type="button" className="cta ghost" onClick={() => onOpenTab('tools')}>
          See the tools
        </button>
        <button type="button" className="cta ghost" onClick={() => onOpenTab('projects')}>
          View projects
        </button>
        <a className="cta ghost" href={resumeUrl} download target="_blank" rel="noreferrer">
          Download résumé
        </a>
        <button type="button" className="cta ghost" onClick={() => onOpenTab('contact')}>
          Get in touch
        </button>
      </div>
      <div className="overview-visuals">
        <FigureGallery figures={HOMEWORLD_FIGURES} layout="hero-plus" />
      </div>
      <div className="public-skills public-skills-condensed">
        <h2 className="public-skills-title">Core skills</h2>
        <dl className="public-skills-list">
          {PUBLIC_SKILLS.map((skill) => (
            <div key={skill.label} className="public-skill">
              <dt>{skill.label}</dt>
              <dd>{skill.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </div>
  )
}

function ProjectsPanel() {
  const featured = PUBLIC_PROJECTS.filter((row) => row.featured)
  const other = PUBLIC_PROJECTS.filter((row) => !row.featured)
  return (
    <section className="public-panel public-work" aria-label="Selected work">
      <div className="section-intro">
        <p className="pitch-eyebrow">Selected work</p>
        <h2>Projects</h2>
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
    </section>
  )
}

function ExperiencePanel() {
  return (
    <section className="public-panel public-experience" aria-label="Experience">
      <div className="section-intro">
        <h2>Experience</h2>
      </div>
      <ol className="resume-list">
        {PUBLIC_EXPERIENCE.map((item) => (
          <li key={item.id} className="resume-item">
            <div className="resume-head">
              <h3>{item.role}</h3>
              {item.period ? <span>{item.period}</span> : null}
            </div>
            {item.org ? <p className="resume-org">{item.org}</p> : null}
            {item.detail ? <p className="resume-detail">{item.detail}</p> : null}
          </li>
        ))}
      </ol>
    </section>
  )
}

function ResumePanel({
  resumeUrl,
  onView,
}: {
  resumeUrl: string
  onView: () => void
}) {
  return (
    <section className="public-panel public-resume-tab" aria-label="Résumé">
      <div className="section-intro">
        <h2>Résumé</h2>
        <p>{PUBLIC_PORTFOLIO.resumeBlurb}</p>
      </div>
      <div className="resume-file-row public-resume-row">
        <button type="button" className="cta primary" onClick={onView}>
          View résumé
        </button>
        <a className="cta ghost" href={resumeUrl} download target="_blank" rel="noreferrer">
          Download résumé (PDF)
        </a>
        <a className="cta ghost" href={PUBLIC_PORTFOLIO.githubHref} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a
          className="cta ghost"
          href={PUBLIC_PORTFOLIO.linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {PUBLIC_PORTFOLIO.linkedinLabel}
        </a>
      </div>
    </section>
  )
}

function ContactPanel({
  resumeUrl,
  ownerId,
  ownerName,
}: {
  resumeUrl: string
  ownerId: string
  ownerName: string
}) {
  return (
    <section className="public-panel public-contact-tab" aria-label="Contact">
      <div className="section-intro">
        <h2>Contact</h2>
        <p className="public-availability">{PUBLIC_PORTFOLIO.availability}</p>
        <p>{PUBLIC_PORTFOLIO.roles}</p>
      </div>
      <div className="resume-file-row public-resume-row">
        <a className="cta ghost" href={PUBLIC_PORTFOLIO.githubHref} target="_blank" rel="noreferrer">
          GitHub
        </a>
        <a
          className="cta ghost"
          href={PUBLIC_PORTFOLIO.linkedinHref}
          target="_blank"
          rel="noopener noreferrer"
        >
          {PUBLIC_PORTFOLIO.linkedinLabel}
        </a>
        <a className="cta ghost" href={resumeUrl} download target="_blank" rel="noreferrer">
          Download résumé (PDF)
        </a>
      </div>
      <div className="public-contact-form">
        <ContactForm ownerId={ownerId} ownerName={ownerName} variant="panel" />
      </div>
    </section>
  )
}

export function PublicPortfolioPage() {
  const { slug = '' } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { profile: me } = useAuth()
  const [bundle, setBundle] = useState<PortfolioBundle | null>(null)
  const [loading, setLoading] = useState(isSupabaseConfigured)
  const [resumeViewer, setResumeViewer] = useState<ViewerAsset | null>(null)

  const allowed = slug === PUBLIC_PORTFOLIO_SLUG
  const resumeUrl = withBase(PUBLIC_RESUME_PATH)
  const tab = parsePortfolioTab(location.search, location.hash)

  function openTab(next: PortfolioTabId, replace = true) {
    const hash = next === 'overview' ? '' : next
    navigate({ search: '', hash }, { replace, preventScrollReset: true })
    // Start each tab at the top so a switch from far down the page never lands past the content.
    window.scrollTo({ top: 0, behavior: 'auto' })
  }

  useEffect(() => {
    if (!allowed) return
    const previous = document.title
    document.title = `${PUBLIC_PORTFOLIO.displayName} — ${PUBLIC_PORTFOLIO.headline}`
    const meta = document.querySelector('meta[name="description"]')
    const previousDescription = meta?.getAttribute('content') ?? null
    if (meta) {
      meta.setAttribute(
        'content',
        'Game developer portfolio for Luke Thompson: HomeWorld (Unreal Engine 5.8 / C++), DreamEngine, Tether, Shift (Phaser), and tools and pipeline work.',
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

  useEffect(() => {
    document.getElementById(`tab-${tab}`)?.scrollIntoView({ inline: 'nearest', block: 'nearest' })
  }, [tab])

  // Cards from PitchContent fade in via [data-reveal]; reveal them whenever a tab mounts new content.
  useEffect(() => {
    if (loading) return
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('.public-main [data-reveal]'))
    if (nodes.length === 0) return
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce || typeof IntersectionObserver === 'undefined') {
      nodes.forEach((node) => node.classList.add('is-revealed'))
      return
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed')
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.05 },
    )
    nodes.forEach((node) => observer.observe(node))
    // Safety net: never leave content hidden if the observer does not fire.
    const fallback = window.setTimeout(() => nodes.forEach((node) => node.classList.add('is-revealed')), 1500)
    return () => {
      observer.disconnect()
      window.clearTimeout(fallback)
    }
  }, [tab, loading])

  // Canonicalize ?tab=tools to #tools so both deep-link forms work.
  useEffect(() => {
    if (!allowed) return
    const params = new URLSearchParams(location.search)
    if (!params.get('tab')) return
    openTab(tab, true)
    // eslint-disable-next-line react-hooks/exhaustive-deps -- run when the query string is present
  }, [allowed, location.search])

  const profile = useMemo(() => {
    const base = bundle?.profile ?? fallbackProfile(slug)
    return {
      ...base,
      display_name: PUBLIC_PORTFOLIO.displayName,
      headline: PUBLIC_PORTFOLIO.headline,
      bio: PUBLIC_PORTFOLIO.lede,
      allow_downloads: true,
      resume_file_path: resumeUrl,
    } satisfies Profile
  }, [bundle, resumeUrl, slug])

  const hero = mediaUrl(profile.hero_path)
  const brand = PUBLIC_PORTFOLIO.displayName
  const showStudioLink = Boolean(me && bundle && me.id === bundle.profile.id)

  function onTabKey(event: KeyboardEvent<HTMLDivElement>) {
    const keys = ['ArrowLeft', 'ArrowRight', 'Home', 'End']
    if (!keys.includes(event.key)) return
    event.preventDefault()
    const ids = PORTFOLIO_TABS.map((item) => item.id)
    const index = ids.indexOf(tab)
    let next = index
    if (event.key === 'ArrowLeft') next = (index - 1 + ids.length) % ids.length
    if (event.key === 'ArrowRight') next = (index + 1) % ids.length
    if (event.key === 'Home') next = 0
    if (event.key === 'End') next = ids.length - 1
    const id = ids[next]
    openTab(id)
    document.getElementById(`tab-${id}`)?.focus()
  }

  function openResume() {
    setResumeViewer({
      title: 'Résumé',
      fileUrl: resumeUrl,
      imageUrl: null,
      kind: detectKind(resumeUrl) === 'unknown' ? 'pdf' : detectKind(resumeUrl),
    })
  }

  if (!allowed) return <Navigate to={`/u/${slug}`} replace />

  if (loading) {
    return (
      <div className="shell-status">
        <p>Loading portfolio…</p>
      </div>
    )
  }

  return (
    <div className="page public-portfolio" style={portfolioThemeStyle(profile)}>
      <header className="nav public-nav">
        <div className="public-nav-row">
          <button type="button" className="nav-brand" onClick={() => openTab('overview')}>
            {brand}
          </button>
          <nav className="nav-links" aria-label="Primary">
            <button type="button" className="nav-text-btn" onClick={() => openTab('contact', false)}>
              Get in touch
            </button>
            {showStudioLink ? <Link to="/studio">Studio</Link> : null}
          </nav>
        </div>
        <div
          className="portfolio-tabbar"
          role="tablist"
          aria-label="Portfolio sections"
          onKeyDown={onTabKey}
        >
          {PORTFOLIO_TABS.map((item) => {
            const selected = item.id === tab
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                className="portfolio-tab"
                aria-selected={selected}
                aria-controls={`panel-${item.id}`}
                tabIndex={selected ? 0 : -1}
                onClick={() => openTab(item.id, false)}
              >
                {item.label}
              </button>
            )
          })}
        </div>
      </header>

      <main id="top" className="public-main">
        {tab === 'overview' ? (
          <div
            role="tabpanel"
            id="panel-overview"
            aria-labelledby="tab-overview"
            className={`hero ${hero ? 'hero-with-media' : 'hero-atmosphere'} public-overview-hero`}
            aria-label="Introduction"
          >
            <div className="hero-copy">
              <h1 className="brand">{brand}</h1>
              <p className="hero-headline">{PUBLIC_PORTFOLIO.headline}</p>
              <OverviewPanel resumeUrl={resumeUrl} onOpenTab={openTab} />
            </div>
            {hero ? (
              <div className="hero-media" aria-hidden="true">
                <img className="hero-image" src={hero} alt="" width={2400} height={1600} />
              </div>
            ) : (
              <div className="hero-media hero-media-empty" aria-hidden="true">
                <div className="hero-atmosphere-marks">
                  <span />
                  <span />
                  <span />
                </div>
                <div className="hero-veil" />
              </div>
            )}
          </div>
        ) : null}

        {tab === 'projects' ? (
          <div role="tabpanel" id="panel-projects" aria-labelledby="tab-projects" className="section public-tab-wrap">
            <ProjectsPanel />
          </div>
        ) : null}

        {tab === 'tools' ? (
          <div role="tabpanel" id="panel-tools" aria-labelledby="tab-tools" className="section public-tab-wrap">
            <ShowcaseSection showcase={PUBLIC_TOOLING_SHOWCASE} />
          </div>
        ) : null}

        {tab === 'experience' ? (
          <div role="tabpanel" id="panel-experience" aria-labelledby="tab-experience" className="section public-tab-wrap">
            <ExperiencePanel />
          </div>
        ) : null}

        {tab === 'resume' ? (
          <div role="tabpanel" id="panel-resume" aria-labelledby="tab-resume" className="section public-tab-wrap">
            <ResumePanel resumeUrl={resumeUrl} onView={openResume} />
          </div>
        ) : null}

        {tab === 'contact' ? (
          <div role="tabpanel" id="panel-contact" aria-labelledby="tab-contact" className="section public-tab-wrap">
            <ContactPanel resumeUrl={resumeUrl} ownerId={profile.id} ownerName={brand} />
          </div>
        ) : null}
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()} {brand}
        </p>
        <p>
          <button type="button" className="nav-text-btn" onClick={() => openTab('contact', false)}>
            Get in touch
          </button>
        </p>
      </footer>

      <MediaViewer
        asset={resumeViewer}
        allowDownloads
        onClose={() => setResumeViewer(null)}
      />

    </div>
  )
}
