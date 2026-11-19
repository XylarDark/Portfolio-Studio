/**
 * Shared types for the public portfolio and (archived) employer pitch pages.
 *
 * Company-specific pitch *data* lives in the private repo
 * https://github.com/XylarDark/Application-Packs (pitch-src/).
 * It must not be bundled into this public app: GitHub Pages deploys from main.
 */

export type PitchLink = {
  label: string
  href: string
}

export type PitchFigureKind = 'screenshot' | 'keyart' | 'diagram'

export type PitchFigure = {
  src: string
  alt: string
  caption: string
  kind: PitchFigureKind
}

export type PitchProject = {
  title: string
  meta: string
  summary: string
  bullets?: string[]
  links?: PitchLink[]
  note?: string
  figures?: PitchFigure[]
}

/** A paragraph, or a bullet / numbered list. Supports **bold**, *italic* and `code`. */
export type PitchListItem = string | { text: string; children: string[]; ordered?: boolean }
export type PitchBlock = string | { list: PitchListItem[]; ordered?: boolean }

export type ShowcaseItem = {
  title: string
  /** Short badge text, e.g. "Built". */
  badge: string
  badgeTone: 'built' | 'designed'
  /** Full status line, shown verbatim. */
  status: string
  problem?: string
  built: PitchBlock[]
  tech?: string
}

export type PitchShowcase = {
  id: string
  navLabel: string
  title: string
  intro: PitchBlock[]
  items: ShowcaseItem[]
  footnote?: string
}

export type Pitch = {
  /** Portfolio slug this pitch belongs to (profiles.slug). */
  slug: string
  /** URL segment: /u/:slug/:key */
  key: string
  company: string
  role: string
  /** Replaces the profile headline on this page. */
  headline: string
  /** Short hero line under the headline. */
  lede: string
  /** Letter-style intro, one string per paragraph. */
  letter: PitchBlock[]
  signoff: string
  /** Heading above the letter. Defaults to "Why I’m a fit". */
  letterHeading?: string
  /** First hero/letter button. Defaults to the featured project's first link. */
  primaryCta?: PitchLink
  /** Primary project, shown first. */
  featured: PitchProject
  /** Work title (works.title) to move to the front of the work list. */
  featuredWorkTitle?: string
  other: PitchProject[]
  /** Path under public/, e.g. /resumes/artofplay.pdf */
  resumePath: string
  resumeBlurb: string
  /** Optional long-form section (e.g. a tools write-up) shown after the pitch. */
  showcase?: PitchShowcase
}
