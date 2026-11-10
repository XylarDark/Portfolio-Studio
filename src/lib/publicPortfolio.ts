import type { Experience } from './types'
import type { PitchProject, PitchShowcase } from './pitches'
import { HOMEWORLD_TOOLING_SHOWCASE } from './toolingShowcase'

/** Public, search-indexable game-dev portfolio at /u/admin/portfolio. */
export const PUBLIC_PORTFOLIO_SLUG = 'admin'

export const PUBLIC_RESUME_PATH = '/resumes/luke-thompson-gamedev.pdf'

export const PUBLIC_PORTFOLIO = {
  displayName: 'Luke Thompson',
  headline: 'Game Developer',
  location: 'Hamilton, ON',
  lede:
    'Game developer focused on gameplay and systems work. Since February 2026 I have been developing HomeWorld solo, a private Unreal Engine 5.8 / C++ project, and I shipped Shift, a playable Phaser 3 shop-and-delivery game. Earlier contract work includes C# game and UI development at OutFusion. Open to hybrid or on-site roles in the GTA–Hamilton area.',
  githubHref: 'https://github.com/XylarDark',
  githubLabel: 'github.com/XylarDark',
  contactBlurb:
    'Hamilton, ON. Open to hybrid or on-site roles in the GTA–Hamilton area.',
  resumeBlurb: 'One-page game developer résumé.',
}

export const PUBLIC_SKILLS: { label: string; value: string }[] = [
  { label: 'Languages', value: 'C++, C#, TypeScript/JavaScript, Python, HTML/CSS' },
  { label: 'Game', value: 'Unreal Engine 5.8, Gameplay Ability System, PCG, Phaser 3, Unity' },
  { label: 'Web & data', value: 'React, Vite, ASP.NET, SQL, REST APIs' },
  { label: 'Workflow', value: 'Git/GitHub, Visual Studio, playtesting, cross-browser QA' },
]

export const PUBLIC_PROJECTS: { featured?: boolean; project: PitchProject }[] = [
  {
    featured: true,
    project: {
      title: 'HomeWorld — Unreal Engine 5.8 / C++ game',
      meta: 'Feb 2026 – present · Independent (solo) · Unreal Engine 5.8, C++, Python tools',
      summary:
        'Built the C++ gameplay for an ARPG survival and family-sim aimed at PC: character and movement, Gameplay Ability System, inventory, time-of-day, and a homestead-to-planetoid loop (glider descent, shrine portal, gather, nurture, and interact).',
      bullets: [
        'Built planetoid world systems, including a closed-mesh planet shell, PCG scatter, and data-driven zone placement and recipes rather than one-off baked maps.',
        'Implemented a versioned save system with per-system slices and migrations that refuse unknown newer saves; added C++ and Python tests around saves, a 7-axis sin/virtue system, and playtest beats.',
        'Editor tooling, build automation, and a Blender greybox pipeline — six items in the tools section below, each marked Built or Designed and in progress.',
      ],
      note: 'Private repository — code walkthrough available on request.',
    },
  },
  {
    project: {
      title: 'Shift — playable shop & delivery game',
      meta: 'Aug – Sep 2026 · Independent · Phaser 3, TypeScript, Vite',
      summary:
        'Shipped a landscape-first browser/PWA game with a full shift loop: counter sales, pickups, and ID-checked deliveries on a handmade city map, plus a results card at close of day.',
      bullets: [
        'Packaged a one-click portfolio embed and iterated pixel UI and player-facing copy for recruiter-ready play without an install.',
      ],
      links: [
        { label: 'Play Shift', href: 'https://xylardark.github.io/ShiftGame/' },
        { label: 'Source on GitHub', href: 'https://github.com/XylarDark/ShiftGame' },
      ],
    },
  },
  {
    project: {
      title: 'Portfolio Studio',
      meta: 'Sep 2026 – present · Independent · React, TypeScript, Vite, Supabase',
      summary:
        'Shipped a public media-resume site with Studio editing and embeddable work cards.',
      links: [
        { label: 'Live site', href: 'https://xylardark.github.io/Portfolio-Studio/' },
        { label: 'Source on GitHub', href: 'https://github.com/XylarDark/Portfolio-Studio' },
      ],
    },
  },
]

/** Résumé experience and education, in the same order as the PDF. */
export const PUBLIC_EXPERIENCE: Experience[] = [
  {
    id: 'outfusion',
    owner_id: 'public',
    role: 'Video Game Developer · Contract',
    org: 'OutFusion · Hamilton, ON',
    period: '2022',
    detail:
      'Integrated and tested game UI art assets across mobile and desktop; validated UX through iterative playtesting. Built and tested C# REST API integrations for player data; partnered on bug verification and release quality.',
    sort_order: 0,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'trucksail',
    owner_id: 'public',
    role: 'Software Developer · 12-Month Contract',
    org: 'TruckSail · Ancaster, ON',
    period: '2020',
    detail:
      'Implemented STM32/CAN firmware with defect finding for reliability; built JS/Bootstrap UIs and optimized SQL. Maintained GitHub workflows; cross-browser QA and password-management security support.',
    sort_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'delivery',
    owner_id: 'public',
    role: 'Delivery Driver',
    org: 'Uber; Kindling Cannabis · Hamilton, ON',
    period: '2022 – 2026',
    detail:
      'Independent schedule while building a game-development portfolio in 2026 (HomeWorld, Shift, and Portfolio Studio). Reliable, accurate delivery in fast-paced and regulated retail settings; strong customer communication.',
    sort_order: 2,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'mohawk',
    owner_id: 'public',
    role: 'Diploma, Computer Systems Technology — Software Development',
    org: 'Mohawk College · Hamilton, ON',
    period: '2019',
    detail: 'Valid Ontario Class G licence. Open to hybrid / on-site in the GTA–Hamilton area.',
    sort_order: 3,
    created_at: '',
    updated_at: '',
  },
]

export const PUBLIC_TOOLING_SHOWCASE: PitchShowcase = HOMEWORLD_TOOLING_SHOWCASE
