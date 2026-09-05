import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import type { Experience, Profile, ViewerAsset, Work } from '../lib/types'
import { mediaUrl } from '../lib/supabase'
import { detectKind } from '../lib/files'
import { MediaViewer } from './MediaViewer'
import { ContactForm } from './ContactForm'
import '../App.css'

type Props = {
  profile: Profile
  works: Work[]
  experience: Experience[]
  showStudioLink?: boolean
}

function workViewerAsset(work: Work): ViewerAsset | null {
  const imageUrl = mediaUrl(work.image_path)
  const fileUrl = mediaUrl(work.file_path)
  const linkUrl = work.link_url?.trim() || null

  if (!imageUrl && !fileUrl && !linkUrl) return null

  const kind = fileUrl
    ? detectKind(work.file_path)
    : imageUrl
      ? 'image'
      : linkUrl
        ? 'link'
        : 'unknown'

  return {
    title: work.title,
    subtitle: [work.role, work.year].filter(Boolean).join(' · ') || undefined,
    imageUrl,
    fileUrl: fileUrl ?? (kind === 'image' ? imageUrl : null),
    linkUrl,
    kind: kind === 'unknown' && imageUrl ? 'image' : kind,
  }
}

export function PortfolioView({
  profile,
  works,
  experience,
  showStudioLink = false,
}: Props) {
  const [viewer, setViewer] = useState<ViewerAsset | null>(null)
  const [contactOpen, setContactOpen] = useState(false)

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
  const ctaSecondary = profile.cta_secondary_label.trim() || 'Contact me'

  const resumeFileUrl = mediaUrl(profile.resume_file_path)
  const resumeKind = detectKind(profile.resume_file_path)

  const showWork = works.length > 0 || Boolean(workTitle || workBlurb)
  const showResume =
    experience.length > 0 || Boolean(resumeTitle || resumeBlurb || resumeFileUrl)
  const showContact = true

  const navItems = useMemo(() => {
    const items: { href: string; label: string }[] = []
    if (showWork) items.push({ href: '#work', label: workTitle || 'Work' })
    if (showResume) items.push({ href: '#resume', label: resumeTitle || 'Resume' })
    items.push({ href: '#contact', label: contactTitle || 'Contact' })
    return items
  }, [showWork, showResume, workTitle, resumeTitle, contactTitle])

  function openResume() {
    if (!resumeFileUrl) return
    setViewer({
      title: resumeTitle || 'Resume',
      fileUrl: resumeFileUrl,
      imageUrl: null,
      kind: resumeKind === 'unknown' ? 'pdf' : resumeKind,
    })
  }

  return (
    <div className="page">
      <header className="nav">
        <a className="nav-brand" href="#top">
          {brand || 'Portfolio'}
        </a>
        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => (
            <a key={item.href} href={item.href}>
              {item.label}
            </a>
          ))}
          {showStudioLink ? <Link to="/studio">Studio</Link> : null}
        </nav>
      </header>

      <main id="top">
        <section
          className={`hero ${hero ? 'hero-with-media' : 'hero-compact'}`}
          aria-label="Introduction"
        >
          {hero ? (
            <div className="hero-media" aria-hidden="true">
              <img className="hero-image" src={hero} alt="" width={2400} height={1600} />
              <div className="hero-veil" />
            </div>
          ) : null}

          <div className="hero-copy">
            {brand ? <h1 className="brand">{brand}</h1> : null}
            {headline ? <p className="hero-headline">{headline}</p> : null}
            {bio ? <p className="lede">{bio}</p> : null}
            <div className="cta-row">
              {ctaPrimary && showWork ? (
                <a className="cta primary" href="#work">
                  {ctaPrimary}
                </a>
              ) : null}
              <button
                type="button"
                className="cta ghost"
                onClick={() => setContactOpen(true)}
              >
                {ctaSecondary}
              </button>
            </div>
          </div>
        </section>

        {showWork ? (
          <section className="section work" id="work">
            {(workTitle || workBlurb) && (
              <div className="section-intro">
                {workTitle ? <h2>{workTitle}</h2> : null}
                {workBlurb ? <p>{workBlurb}</p> : null}
              </div>
            )}

            {works.length === 0 ? (
              <p className="empty-note">Nothing published in this section yet.</p>
            ) : (
              <ul className="work-list">
                {works.map((item, index) => {
                  const image = mediaUrl(item.image_path)
                  const asset = workViewerAsset(item)
                  return (
                    <li
                      key={item.id}
                      className={`work-item ${index % 2 === 1 ? 'offset' : ''}`}
                    >
                      <button
                        type="button"
                        className="work-open"
                        onClick={() => asset && setViewer(asset)}
                        disabled={!asset}
                      >
                        <figure className="work-figure">
                          {image ? (
                            <img
                              src={image}
                              alt={item.alt || item.title}
                              width={1600}
                              height={1067}
                              loading="lazy"
                              draggable={profile.allow_downloads}
                            />
                          ) : (
                            <div className="work-figure-fallback">
                              <span>{item.title}</span>
                            </div>
                          )}
                        </figure>
                        <div className="work-meta">
                          <h3>{item.title}</h3>
                          <p>{[item.role, item.year].filter(Boolean).join(' · ')}</p>
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
              <div className="section-intro">
                {resumeTitle ? <h2>{resumeTitle}</h2> : null}
                {resumeBlurb ? <p>{resumeBlurb}</p> : null}
              </div>
            )}

            {resumeFileUrl ? (
              <div className="resume-file-row">
                <button type="button" className="cta primary" onClick={openResume}>
                  View resume
                </button>
                {profile.allow_downloads ? (
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
                {experience.map((item) => (
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
            ) : null}
          </section>
        ) : null}

        {showContact ? (
          <section className="section contact" id="contact">
            <div className="contact-panel">
              <h2>{contactTitle || 'Contact'}</h2>
              {contactBlurb ? <p>{contactBlurb}</p> : null}
              <ContactForm ownerId={profile.id} ownerName={brand || 'me'} variant="panel" />
            </div>
          </section>
        ) : null}
      </main>

      <footer className="footer">
        <p>
          © {new Date().getFullYear()}
          {brand ? ` ${brand}` : ''}
        </p>
        {showStudioLink ? (
          <p>
            <Link to="/studio">Edit portfolio</Link>
          </p>
        ) : (
          <p />
        )}
      </footer>

      <MediaViewer
        asset={viewer}
        allowDownloads={profile.allow_downloads}
        onClose={() => setViewer(null)}
      />

      {contactOpen ? (
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
