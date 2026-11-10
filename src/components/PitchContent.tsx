import type { PitchBlock, PitchListItem, PitchLink, PitchProject, PitchShowcase } from '../lib/pitches'

const INLINE = /(\*\*[^*]+\*\*|`[^`]+`|\*[^*]+\*)/g

/** Minimal inline markdown: **bold**, *italic*, `code`. */
export function Inline({ text }: { text: string }) {
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

export function Blocks({ blocks }: { blocks: PitchBlock[] }) {
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

export function ProjectLinks({ links }: { links?: PitchProject['links'] }) {
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

export function CtaLink({ link, className }: { link: PitchLink; className: string }) {
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

export function ProjectCard({
  project,
  featured = false,
}: {
  project: PitchProject
  featured?: boolean
}) {
  const Heading = featured ? 'h3' : 'h4'
  return (
    <article className={`pitch-card${featured ? ' pitch-featured' : ''}`} data-reveal>
      {featured ? <p className="pitch-tag">Featured</p> : null}
      <Heading>{project.title}</Heading>
      <p className="pitch-meta">{project.meta}</p>
      <p>{project.summary}</p>
      {project.bullets?.length ? (
        <ul>
          {project.bullets.map((bullet) => (
            <li key={bullet}>{bullet}</li>
          ))}
        </ul>
      ) : null}
      {project.note ? <p className="pitch-note">{project.note}</p> : null}
      <ProjectLinks links={project.links} />
    </article>
  )
}

export function ShowcaseSection({ showcase }: { showcase: PitchShowcase }) {
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
