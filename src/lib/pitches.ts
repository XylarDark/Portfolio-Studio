/**
 * Tailored employer pages ("pitches"), served at /u/:slug/:pitch.
 *
 * Static, bundled content: no Supabase schema changes. Each pitch layers a
 * tailored intro, featured project, and résumé PDF (under public/resumes/)
 * on top of the owner's live portfolio data.
 */

export type PitchLink = {
  label: string
  href: string
}

export type PitchProject = {
  title: string
  meta: string
  summary: string
  bullets?: string[]
  links?: PitchLink[]
  note?: string
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

import { AIRSHIP_PITCH } from './pitchAirship'
import { CITI_PITCH, PAYMENT_SOURCE_PITCH, SIRION_PITCH } from './pitchJobs'
import { L3HARRIS_PITCH, MARS_PITCH, WONDERBRANDS_PITCH } from './pitchNov12'
import {
  APPLIED_SYSTEMS_PITCH,
  POINTCLICKCARE_PITCH,
  PRICELINE_PITCH,
  ROSE_ROCKET_PITCH,
  VERTMIX_PITCH,
  ZYNGA_PITCH,
} from './pitchNov12b'
import { WORK_HISTORY } from './pitchWork'

export const PITCHES: Pitch[] = [
  {
    slug: 'admin',
    key: 'artofplay',
    company: 'Art of Play',
    role: 'HTML5 (Phaser) Developer — freelance',
    headline: 'HTML5 / Phaser game developer',
    lede: 'A page made for Art of Play’s freelance HTML5 (Phaser) Developer role: play Shift first, then grab the résumé.',
    letter: [
      'Hi Art of Play team,',
      'I’m applying for the freelance HTML5 (Phaser) Developer role. The closest thing I’ve built to the short series of 2D web games in your posting is Shift — a complete Phaser 3 / TypeScript shop-and-delivery game that runs in the browser and installs as a PWA. Please play it first.',
      'Shift is a full playable loop: counter sales, pickups, and ID-checked deliveries on a handmade city map, then a results card at close of day. I built the scene graph (boot, title, shop, drive, door, and HUD), a landscape-first mobile shell, runtime texture atlases, and a render budget so the game stays smooth on phones.',
      'I’m self-directed, used to shipping to a deadline, and solid in JavaScript and TypeScript. I also build web products in React and Supabase (including this site, Portfolio Studio), and built game UI/UX in C# at OutFusion (2022).',
      'I’m in Hamilton, Ontario, on Eastern Time. I can overlap UK afternoons in my morning and Melbourne mornings in my evening, and I’m happy to work to whatever cadence you need. If the current series has already wrapped, I’d still love to be considered for future HTML5 work.',
    ],
    signoff: 'Thanks for your time — Luke Thompson',
    featured: {
      title: 'Shift — playable shop & delivery game',
      meta: 'Aug – Sep 2026 · Independent · Phaser 3, TypeScript, Vite',
      summary:
        'A landscape-first browser and PWA game with a complete shift loop: counter sales, pickups, and ID-checked deliveries on a handmade city map, plus a results card at close of day.',
      bullets: [
        'Multi-scene Phaser 3.90 architecture (Boot, Title, Shop, Drive, Door, HUD) with deferred loading of world scenes and runtime texture atlases.',
        'Custom sim on a fixed 60 Hz timestep with render interpolation, cached A* routes and auto-drive, keyboard nudge and multi-pointer tap input.',
        '16:9 mobile shell (rotate gate, landscape lock, visualViewport and safe-area handling) and a high/mid/low render budget with a 30 fps cap on touch devices.',
        'Service-worker updates wait until the player is idle, so a reload never interrupts a shift. Ships a one-click portfolio embed.',
      ],
      links: [
        { label: 'Play Shift', href: 'https://xylardark.github.io/ShiftGame/' },
        { label: 'Source on GitHub', href: 'https://github.com/XylarDark/ShiftGame' },
      ],
    },
    featuredWorkTitle: 'Shift',
    other: [
      {
        title: 'Portfolio Studio',
        meta: 'Sep 2026 – present · React, TypeScript, Vite, Supabase',
        summary:
          'This site: a public media-résumé product with Studio editing, embeddable work cards, and per-employer pages like this one.',
        links: [
          { label: 'Live site', href: 'https://xylardark.github.io/Portfolio-Studio/' },
          { label: 'Source on GitHub', href: 'https://github.com/XylarDark/Portfolio-Studio' },
        ],
      },
      {
        title: 'HomeWorld',
        meta: 'Feb 2026 – present · Solo · Unreal Engine 5.8, C++',
        summary:
          'C++ gameplay and data-driven world systems for an ARPG survival and family sim, with a versioned save system, migrations, and tests.',
        note: 'Private repository — available on request.',
      },
      ...WORK_HISTORY,
    ],
    resumePath: '/resumes/artofplay.pdf',
    resumeBlurb: 'One-page résumé tailored for the Art of Play HTML5 (Phaser) role.',
  },
  AIRSHIP_PITCH,
  SIRION_PITCH,
  PAYMENT_SOURCE_PITCH,
  CITI_PITCH,
  L3HARRIS_PITCH,
  MARS_PITCH,
  WONDERBRANDS_PITCH,
  VERTMIX_PITCH,
  ROSE_ROCKET_PITCH,
  POINTCLICKCARE_PITCH,
  ZYNGA_PITCH,
  PRICELINE_PITCH,
  APPLIED_SYSTEMS_PITCH,
]

export function findPitch(slug: string, key: string): Pitch | null {
  const normalized = key.trim().toLowerCase()
  return PITCHES.find((p) => p.slug === slug && p.key === normalized) ?? null
}
