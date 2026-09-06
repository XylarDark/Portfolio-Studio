import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Experience, Profile, ViewerAsset, Work } from '../lib/types'
import { mediaUrl } from '../lib/supabase'
import { detectKind, getEmbedSrc } from '../lib/files'
import { portfolioThemeStyle } from '../lib/theme'
import { MediaViewer } from './MediaViewer'
import { ContactForm } from './ContactForm'
import '../App.css'

type Props = {
  profile: Profile
  works: Work[]
  experience: Experience[]
  showStudioLink?: boolean
  mode?: 'live' | 'preview'
}

function workKind(work: Work): ViewerAsset['kind'] {
  if (work.file_path) {
    const kind = detectKind(work.file_path)
    return kind === 'unknown' ? 'unknown' : kind
  }
  if (getEmbedSrc(work.link_url)) return 'embed'
  if (work.image_path) return 'image'
  if (work.link_url) return 'link'
  return 'unknown'
}

function workViewerAsset(work: Work): ViewerAsset | null {
  const imageUrl = mediaUrl(work.image_path)
  const fileUrl = mediaUrl(work.file_path)
  const linkUrl = work.link_url?.trim() || null
  const embedUrl = getEmbedSrc(linkUrl)

  if (!imageUrl && !fileUrl && !linkUrl) return null

  let kind: ViewerAsset['kind'] = 'unknown'
  if (fileUrl) kind = detectKind(work.file_path)
  else if (embedUrl) kind = 'embed'
  else if (imageUrl) kind = 'image'
  else if (linkUrl) kind = 'link'

  return {
    title: work.title,
    subtitle: [work.role, work.year].filter(Boolean).join(' · ') || undefined,
    imageUrl,
    fileUrl: fileUrl ?? (kind === 'image' ? imageUrl : null),
    linkUrl,
    embedUrl,
    kind,
  }
}

function workCardHint(work: Work): string {
  const kind = workKind(work)
  if (kind === 'video') return 'Video'
  if (kind === 'pdf') return 'Document'
  if (kind === 'embed') return 'Embed'
  if (work.link_url && work.image_path) return 'Image + link'
  if (kind === 'link') return 'External link'
  if (kind === 'image') return 'Image'
  return 'Media'
}

function useRevealOnScroll(enabled: boolean, deps: unknown[]) {
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!enabled) return
    const root = rootRef.current
    if (!root) return

    const nodes = root.querySelectorAll<HTMLElement>('[data-reveal]')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduce) {
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
      { rootMargin: '0px 0px -8% 0px', threshold: 0.12 },
    )

    nodes.forEach((node) => {
      node.classList.remove('is-revealed')
      observer.observe(node)
    })
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentional content-length deps
  }, [enabled, ...deps])

  return rootRef
}

export function PortfolioView({
  profile,
  works,
  experience,
  showStudioLink = false,
  mode = 'live',
}: Props) {
  const [viewerIndex, setViewerIndex] = useState<number | null>(null)
  const [resumeViewer, setResumeViewer] = useState<ViewerAsset | null>(null)
  const [contactOpen, setContactOpen] = useState(false)
  const preview = mode === 'preview'
  const rootRef = useRevealOnScroll(!preview, [works.length, experience.length])

  const hero = mediaUrl(profile.hero_path)
  const brand = profile.display_name.trim()
  const headline = profile.headline.trim()
  const bio = profile.bio.trim()

  const workTitle = profile.work_section_title.trim()
  const workBlurb = profile.work_section_blurb.trim()
  const resumeTitle = profile.resume_section_title.trim()
  const resumeBlurb = profile.resume_section_blurb.trim()
  const contactTitle = profile.contact_section_title.trim()
  const contactBlurb = profile.contact_section_blurb.trim()
  const ctaPrimary = profile.cta_primary_label.trim()
  const ctaSecondary = profile.cta_secondary_label.trim()
  const showHeroCtas = Boolean(ctaPrimary || ctaSecondary)

  const resumeFileUrl = mediaUrl(profile.resume_file_path)
  const resumeKind = detectKind(profile.resume_file_path)

  const showWork = works.length > 0 || Boolean(workTitle || workBlurb)
  const showResume =
    experience.length > 0 || Boolean(resumeTitle || resumeBlurb || resumeFileUrl)
  const showContact = true

  const indexedAssets = useMemo(
    () =>
      works
        .map((item) => ({ id: item.id, asset: workViewerAsset(item) }))
        .filter((row): row is { id: string; asset: ViewerAsset } => Boolean(row.asset)),
    [works],
  )
  const workAssets = useMemo(() => indexedAssets.map((row) => row.asset), [indexedAssets])

  const navItems = useMemo(() => {
    const items: { href: string; label: string }[] = []
    if (showWork) items.push({ href: '#work', label: workTitle || 'Work' })
    if (showResume) items.push({ href: '#resume', label: resumeTitle || 'Resume' })
    items.push({ href: '#contact', label: contactTitle || 'Contact' })
    return items
  }, [showWork, showResume, workTitle, resumeTitle, contactTitle])

  function openWork(work: Work) {
    if (preview) return
    const index = indexedAssets.findIndex((row) => row.id === work.id)
    if (index < 0) return
    setResumeViewer(null)
    setViewerIndex(index)
  }

  function openResume() {
    if (preview || !resumeFileUrl) return
    setViewerIndex(null)
    setResumeViewer({
      title: resumeTitle || 'Resume',
      fileUrl: resumeFileUrl,
      imageUrl: null,
      kind: resumeKind === 'unknown' ? 'pdf' : resumeKind,
    })
  }

  return (
    <div
      className={`page ${preview ? 'page-preview' : ''}`}
      style={portfolioThemeStyle(profile)}
      ref={rootRef}
    >
      <header className="nav">
        <a className="nav-brand" href={preview ? undefined : '#top'} onClick={(e) => preview && e.preventDefault()}>
          {brand || 'Portfolio'}
        </a>
        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={preview ? undefined : item.href}
              onClick={(e) => preview && e.preventDefault()}
            >
              {item.label}
            </a>
          ))}
          {!preview ? <Link to="/swipe">Find work</Link> : null}
          {showStudioLink && !preview ? <Link to="/studio">Studio</Link> : null}
        </nav>
      </header>

      <main id="top">
        <section
          className={`hero ${hero ? 'hero-with-media' : 'hero-atmosphere'}`}
          aria-label="Introduction"
        >
          {hero ? (
            <div className="hero-media" aria-hidden="true">
              <img className="hero-image" src={hero} alt="" width={2400} height={1600} />
              <div className="hero-veil" />
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

          <div className="hero-copy">
            {brand ? <h1 className="brand">{brand}</h1> : null}
            {headline ? <p className="hero-headline">{headline}</p> : null}
            {bio ? <p className="lede">{bio}</p> : null}
            {showHeroCtas ? (
              <div className="cta-row">
                {ctaPrimary && showWork ? (
                  <a
                    className="cta primary"
                    href={preview ? undefined : '#work'}
                    onClick={(e) => preview && e.preventDefault()}
                  >
                    {ctaPrimary}
                  </a>
                ) : null}
                {ctaSecondary ? (
                  <button
                    type="button"
                    className="cta ghost"
                    onClick={() => !preview && setContactOpen(true)}
                    disabled={preview}
                  >
                    {ctaSecondary}
                  </button>
                ) : null}
              </div>
            ) : null}
          </div>
        </section>

        {showWork ? (
          <section className="section work" id="work">
            {(workTitle || workBlurb) && (
              <div className="section-intro" data-reveal>
                {workTitle ? <h2>{workTitle}</h2> : null}
                {workBlurb ? <p>{workBlurb}</p> : null}
              </div>
            )}

            {works.length === 0 ? (
              <p className="empty-note">
                Add images, videos, files, embeds, or external links from Studio.
              </p>
            ) : (
              <ul className="work-list">
                {works.map((item, index) => {
                  const image = mediaUrl(item.image_path)
                  const asset = workViewerAsset(item)
                  const hint = workCardHint(item)
                  const kind = workKind(item)
                  return (
                    <li
                      key={item.id}
                      className={`work-item ${index % 2 === 1 ? 'offset' : ''}`}
                      data-reveal
                      style={{ ['--reveal-delay' as string]: `${Math.min(index, 4) * 70}ms` }}
                    >
                      <button
                        type="button"
                        className="work-open"
                        onClick={() => openWork(item)}
                        disabled={!asset || preview}
                      >
                        <figure className="work-figure">
                          {image ? (
                            <>
                              <img
                                src={image}
                                alt={item.alt || item.title}
                                width={1600}
                                height={1067}
                                loading="lazy"
                                draggable={profile.allow_downloads}
                              />
                              <span className={`work-type-badge work-type-${kind}`}>{hint}</span>
                            </>
                          ) : (
                            <div className={`work-figure-fallback work-kind-${kind}`}>
                              <span className="work-kind-mark" aria-hidden="true" />
                              <strong>{item.title}</strong>
                              <span className="work-kind-label">{hint}</span>
                            </div>
                          )}
                        </figure>
                        <div className="work-meta">
                          <h3>{item.title}</h3>
                          <p>
                            {[hint, item.role, item.year].filter(Boolean).join(' · ')}
                          </p>
                        </div>
                      </button>
                    </li>
                  )
                })}
              </ul>
            )}
          </section>
        ) : null}

        {showResume ? (
          <section className="section resume" id="resume">
            {(resumeTitle || resumeBlurb) && (
              <div className="section-intro" data-reveal>
                {resumeTitle ? <h2>{resumeTitle}</h2> : null}
                {resumeBlurb ? <p>{resumeBlurb}</p> : null}
              </div>
            )}

            {resumeFileUrl ? (
              <div className="resume-file-row" data-reveal>
                <button type="button" className="cta primary" onClick={openResume} disabled={preview}>
                  View resume
                </button>
                {profile.allow_downloads && !preview ? (
                  <a
                    className="cta ghost"
                    href={resumeFileUrl}
                    download
                    target="_blank"
                    rel="noreferrer"
                  >
                    Download resume
                  </a>
                ) : null}
              </div>
            ) : null}

            {experience.length === 0 && !resumeFileUrl ? (
              <p className="empty-note">Nothing published in this section yet.</p>
            ) : experience.length > 0 ? (
              <ol className="resume-list">
                {experience.map((item, index) => (
                  <li
                    key={item.id}
                    className="resume-item"
                    data-reveal
                    style={{ ['--reveal-delay' as string]: `${Math.min(index, 5) * 60}ms` }}
                  >
                    <div className="resume-head">
                      <h3>{item.role}</h3>
                      {item.period ? <span>{item.period}</span> : null}
                    </div>
                    {item.org ? <p className="resume-org">{item.org}</p> : null}
                    {item.detail ? <p className="resume-detail">{item.detail}</p> : null}
                  </li>
                ))}
              </ol>
            ) : null}
          </section>
        ) : null}

        {showContact ? (
          <section className="section contact" id="contact" data-reveal>
            <div className="section-intro contact-intro">
              <h2>{contactTitle || 'Contact'}</h2>
              {contactBlurb ? <p>{contactBlurb}</p> : null}
            </div>
            {preview ? (
              <p className="empty-note">Contact form hidden in preview.</p>
            ) : (
              <ContactForm ownerId={profile.id} ownerName={brand || 'me'} variant="panel" />
            )}
          </section>
        ) : null}
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()}
          {brand ? ` ${brand}` : ''}
        </p>
        {showStudioLink && !preview ? (
          <p>
            <Link to="/studio">Edit portfolio</Link>
          </p>
        ) : (
          <p />
        )}
      </footer>

      {!preview ? (
        <MediaViewer
          asset={
            resumeViewer ??
            (viewerIndex !== null ? workAssets[viewerIndex] ?? null : null)
          }
          assets={resumeViewer ? undefined : workAssets}
          assetIndex={resumeViewer ? undefined : viewerIndex}
          allowDownloads={profile.allow_downloads}
          onClose={() => {
            setViewerIndex(null)
            setResumeViewer(null)
          }}
          onNavigate={
            resumeViewer
              ? undefined
              : (next) => {
                  setViewerIndex(next)
                }
          }
        />
      ) : null}

      {contactOpen && !preview ? (
        <ContactForm
          ownerId={profile.id}
          ownerName={brand || 'me'}
          variant="modal"
          onClose={() => setContactOpen(false)}
        />
      ) : null}
    </div>
  )
}
