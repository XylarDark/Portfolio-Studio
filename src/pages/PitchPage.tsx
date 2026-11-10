import { useEffect, useMemo, useState } from 'react'
import { Link, Navigate, useParams } from 'react-router-dom'
import { PortfolioView } from '../components/PortfolioView'
import { fetchPortfolioBySlug } from '../lib/api'
import {
  findPitch,
  type Pitch,
  type PitchBlock,
  type PitchLink,
  type PitchListItem,
  type PitchProject,
  type PitchShowcase,
} from '../lib/pitches'
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

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g

/** Minimal inline markdown: **bold**, *italic*, `code`. */
function Inline({ text }: { text: string }) {
  const parts = text.split(INLINE).filter(Boolean)
  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
          return <strong key={i}>{part.slice(2, -2)}</strong>
        }
        if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
          return <code key={i}>{part.slice(1, -1)}</code>
        }
        if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
          return <em key={i}>{part.slice(1, -1)}</em>
        }
        return <span key={i}>{part}</span>
      })}
    </>
  )
}

function ListItem({ item }: { item: PitchListItem }) {
  if (typeof item === 'string') {
    return (
      <li>
        <Inline text={item} />
      </li>
    )
  }
  const Sub = item.ordered ? 'ol' : 'ul'
  return (
    <li>
      <Inline text={item.text} />
      <Sub className={item.ordered ? 'pitch-ol' : undefined}>
        {item.children.map((child) => (
          <li key={child}>
            <Inline text={child} />
          </li>
        ))}
      </Sub>
    </li>
  )
}

function Blocks({ blocks }: { blocks: PitchBlock[] }) {
  return (
    <>
      {blocks.map((block, i) => {
        if (typeof block === 'string') {
          return (
            <p key={i}>
              <Inline text={block} />
            </p>
          )
        }
        const List = block.ordered ? 'ol' : 'ul'
        return (
          <List key={i} className={block.ordered ? 'pitch-ol' : 'pitch-ul'}>
            {block.list.map((item, j) => (
              <ListItem key={j} item={item} />
            ))}
          </List>
        )
      })}
    </>
  )
}

function ProjectLinks({ links }: { links?: PitchProject['links'] }) {
  if (!links?.length) return null
  return (
    <p className="pitch-links">
      {links.map((link) => (
        <a key={link.href} href={link.href} target="_blank" rel="noreferrer">
          {link.label} ↗
        </a>
      ))}
    </p>
  )
}

function CtaLink({ link, className }: { link: PitchLink; className: string }) {
  const external = /^https?:/.test(link.href)
  return (
    <a
      className={className}
      href={link.href}
      target={external ? '_blank' : undefined}
      rel={external ? 'noreferrer' : undefined}
    >
      {link.label}
    </a>
  )
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

        <article className="pitch-card pitch-featured" data-reveal>
          <p className="pitch-tag">Featured</p>
          <h3>{featured.title}</h3>
          <p className="pitch-meta">{featured.meta}</p>
          <p>{featured.summary}</p>
          {featured.bullets?.length ? (
            <ul>
              {featured.bullets.map((bullet) => (
                <li key={bullet}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          {featured.note ? <p className="pitch-note">{featured.note}</p> : null}
          <ProjectLinks links={featured.links} />
        </article>
      </div>

      {pitch.other.length ? (
        <div className="pitch-other">
          <h3 className="pitch-other-title" data-reveal>
            Also relevant
          </h3>
          <ul className="pitch-other-list">
            {pitch.other.map((project) => (
              <li key={project.title} className="pitch-card" data-reveal>
                <h4>{project.title}</h4>
                <p className="pitch-meta">{project.meta}</p>
                <p>{project.summary}</p>
                {project.note ? <p className="pitch-note">{project.note}</p> : null}
                <ProjectLinks links={project.links} />
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  )
}

function ShowcaseSection({ showcase }: { showcase: PitchShowcase }) {
  return (
    <section className="section showcase" id={showcase.id}>
      <div className="section-intro showcase-intro" data-reveal>
        <h2>{showcase.title}</h2>
        <Blocks blocks={showcase.intro} />
      </div>
      <ol className="showcase-list">
        {showcase.items.map((item, index) => (
          <li key={item.title} className="pitch-card showcase-item" data-reveal>
            <div className="showcase-head">
              <span className="showcase-num">{index + 1}</span>
              <h3>{item.title}</h3>
              <span className={`showcase-badge showcase-badge-${item.badgeTone}`}>{item.badge}</span>
            </div>
            <p className="showcase-status">
              <strong>Status:</strong> <Inline text={item.status} />
            </p>
            {item.problem ? (
              <div className="showcase-block">
                <h4>Problem</h4>
                <p>
                  <Inline text={item.problem} />
                </p>
              </div>
            ) : null}
            <div className="showcase-block">
              <h4>What I built</h4>
              <Blocks blocks={item.built} />
            </div>
            {item.tech ? (
              <p className="showcase-tech">
                <strong>Tech:</strong> <Inline text={item.tech} />
              </p>
            ) : null}
          </li>
        ))}
      </ol>
      {showcase.footnote ? (
        <p className="showcase-footnote" data-reveal>
          <Inline text={showcase.footnote} />
        </p>
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
    resume_section_title: 'Resume',
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
