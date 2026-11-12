import type { Experience } from './types'
import type { PitchFigure, PitchProject, PitchShowcase } from './pitches'
import { HOMEWORLD_TOOLING_SHOWCASE } from './toolingShowcase'

/** Public, search-indexable game-dev portfolio at /u/admin/portfolio. */
export const PUBLIC_PORTFOLIO_SLUG = 'admin'

export const PUBLIC_RESUME_PATH = '/resumes/luke-thompson-gamedev.pdf'

export const PUBLIC_PORTFOLIO = {
  displayName: 'Luke Thompson',
  headline: 'Game Developer',
  location: 'Hamilton, ON',
  lede:
    'Game developer focused on gameplay, systems, and developer tools. Since February 2026 I have been developing HomeWorld solo, a private Unreal Engine 5.8 / C++ game set on a 5 km-radius planetoid, along with DreamEngine, a solo-dev automation harness, and Tether, a phone app for reviewing and answering work from a computer. I also shipped Shift, a playable Phaser 3 shop-and-delivery game. Earlier: game UI/UX in C# at OutFusion (2022), C++ ECU firmware at TruckSail (2020–21), and software development and QA at Evenica (2018–19). Open to remote roles, or hybrid / on-site in the GTA–Hamilton area.',
  githubHref: 'https://github.com/XylarDark',
  githubLabel: 'github.com/XylarDark',
  contactBlurb:
    'Hamilton, ON. Open to remote roles, or hybrid / on-site in the GTA–Hamilton area.',
  resumeBlurb: 'One-page game developer résumé.',
  availability: 'Available immediately · Remote · Eastern Time (Toronto)',
  roles:
    'Open to junior/entry, intermediate, and contract game developer roles — gameplay programming, Unreal/C++, tools, and QA.',
}

export const PUBLIC_SKILLS: { label: string; value: string }[] = [
  { label: 'Languages', value: 'C++, C#, TypeScript/JavaScript, Python, HTML/CSS' },
  { label: 'Game', value: 'Unreal Engine 5.8, Gameplay Ability System, PCG, Phaser 3, Unity' },
  { label: 'Web & data', value: 'React, Vite, ASP.NET, SQL, REST APIs' },
  { label: 'Workflow', value: 'Git/GitHub, Visual Studio, editor tooling, playtesting, cross-browser QA' },
]

export const HOMEWORLD_FIGURES: PitchFigure[] = [
  {
    src: '/media/homeworld-keyart-night.jpg',
    alt: 'Stylized key art of a homestead on a cliff at night, with a bright moon and a planet curving below.',
    caption: 'Key art for HomeWorld’s homestead and planetoid. This is concept art, not a gameplay capture.',
    kind: 'keyart',
  },
  {
    src: '/media/homeworld-lookout.jpg',
    alt: 'In-engine greybox view from a homestead lookout at night, with a cabin, a path, and a large pale planet nearby.',
    caption: 'In-engine still: homestead lookout at night, looking toward the planet.',
    kind: 'screenshot',
  },
  {
    src: '/media/homeworld-cabin.jpg',
    alt: 'In-engine greybox still of a cabin porch and garden beds in warm window light.',
    caption: 'In-engine still: cabin and garden.',
    kind: 'screenshot',
  },
  {
    src: '/media/homeworld-glide.jpg',
    alt: 'In-engine greybox still looking back at the homestead island while gliding down stepping platforms toward the planet surface.',
    caption: 'In-engine still: gliding from the homestead toward the planet surface.',
    kind: 'screenshot',
  },
  {
    src: '/media/homeworld-landing.jpg',
    alt: 'In-engine greybox still of a daytime clearing with stylized trees and camp structures on the planet surface.',
    caption: 'In-engine still: daytime landing on the planet surface.',
    kind: 'screenshot',
  },
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
        'Chapter 1’s feature walk — homestead, planting, backpack, gathering, rune unlock, camp, bed-to-spirit, nurture, and portal camp — is merged and covered by automated play-in-editor tests.',
        'Built planetoid world systems on a 5 km-radius planet, including a closed-mesh planet shell, PCG scatter, and data-driven zone placement and recipes rather than one-off baked maps.',
        'Implemented a versioned save system with per-system slices and migrations that refuse unknown newer saves; added C++ and Python tests around saves, a 7-axis sin/virtue system, and playtest beats.',
        'Editor tooling, build automation, and a Blender greybox pipeline — plus DreamEngine, the automation harness in the next project — are on the Tools tab, each marked Built or Designed and in progress.',
      ],
      note: 'Private repository — walkthrough available on request.',
      figures: HOMEWORLD_FIGURES,
    },
  },
  {
    featured: true,
    project: {
      title: 'DreamEngine — solo-dev automation harness',
      meta: 'Nov 2026 – present · Independent (solo) · agent orchestration, scheduled automation, decision tooling',
      summary:
        'A solo-dev “company in a box”: one person steers while parallel agent lanes build in local coding-agent sessions. I design the rules, review the work, and treat an agent saying “done” as a claim that still has to be proven.',
      bullets: [
        'Five named lanes — HEALTH, P6, DREAM, BOOKEND, and TETHER — run in parallel, driven by a five-minute scheduled tick.',
        'A done-gate refuses to mark a lane done until a rebase, a test rerun, and a merge-ready check all pass. A merge train lands qualifying work one change at a time. Stalled or dead runs auto-resume. A PC status notifier and a tool index keep the loop visible. 123 merged pull requests as of 12 November 2026.',
        'Preference engine, Layer 1 (built): a deterministic take-rate counter may auto-default a decision type only at a 95% take rate over at least 20 evidenced answers, and only after a one-time yes for that type. Safety-sensitive types — including deletes, merges, installs, secrets, and art or taste decisions — never auto-default.',
        'Dream intake has a single front door. A first end-to-end dream run is in progress; it is not finished.',
      ],
      note: 'Private repository — walkthrough available on request.',
      figures: [
        {
          src: '/media/dreamengine-loop.svg',
          alt: 'Diagram of the DreamEngine loop: a person steers, a five-minute tick runs five parallel lanes, a done-gate checks rebase, tests, and merge readiness, then a merge train, with auto-resume, a status notifier, and a tool index.',
          caption: 'Diagram of the DreamEngine loop, drawn for this page. Not a product screenshot.',
          kind: 'diagram',
        },
        {
          src: '/media/preference-layer1.svg',
          alt: 'Diagram of preference-engine Layer 1: answers are counted by type, a 95 percent take-rate bar over at least 20 evidenced answers may allow an auto-default, and safety-sensitive types never auto-default.',
          caption: 'Diagram of preference-engine Layer 1, the layer that is built. Not a product screenshot.',
          kind: 'diagram',
        },
      ],
    },
  },
  {
    project: {
      title: 'Tether — phone app for reviewing computer work',
      meta: 'Nov 2026 – present · Independent (solo) · TypeScript, phone PWA · went live 11 November 2026',
      summary:
        'A phone app that connects to a computer so I can review work, run declared checks, and approve the actions that need a person.',
      bullets: [
        'The phone client is a PWA, with push notifications and actionable decision cards that write answers back to the computer and can run phone actions such as remind-later, undo, and attaching a photo from the library.',
        'The phone is for reading, approving, and running declared actions — not for editing code or opening a public port. Went live on 11 November 2026.',
      ],
      note: 'Private repository — walkthrough available on request. No product screenshots are published here; the figure below is a diagram of the flow.',
      figures: [
        {
          src: '/media/tether-flow.svg',
          alt: 'Diagram of Tether: a desktop and a phone PWA connect through Tether, which carries push notifications, decision cards, answer write-back, and phone actions.',
          caption: 'Diagram of the Tether flow, drawn for this page. Not a product screenshot — no UI capture is published here.',
          kind: 'diagram',
        },
      ],
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
        'Shipped a public media-résumé site with Studio editing and embeddable work cards.',
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
    role: 'Game Developer',
    org: 'OutFusion · Hamilton, ON',
    period: 'Feb 2022 – Dec 2022',
    detail:
      'Implemented game UI/UX from the design docs; integrated and tested game UI art assets across mobile and desktop; validated UX through iterative playtesting. Built and tested C# REST API integrations for player data; partnered on bug verification and release quality.',
    sort_order: 0,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'trucksail',
    owner_id: 'public',
    role: 'Software Developer',
    org: 'TruckSail · Ancaster, ON',
    period: 'Feb 2020 – Jan 2021',
    detail:
      'Wrote C++ firmware for truck ECU devices (STM32, CAN bus) with defect finding for reliability; built JS/Bootstrap UIs and optimized SQL. Maintained GitHub workflows; cross-browser QA and password-management security support.',
    sort_order: 1,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'evenica',
    owner_id: 'public',
    role: 'Software Developer & QA Tester',
    org: 'Evenica · Burlington, ON',
    period: 'May 2018 – Sep 2019',
    detail:
      'Built and tested software for clients including Andrew Peller, Young’s Market Company and MM Realty International, using T-SQL, C#, Linux, and Laravel (MySQL, PHP, JavaScript/jQuery, Vue.js).',
    sort_order: 2,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'delivery',
    owner_id: 'public',
    role: 'Delivery Driver',
    org: 'Uber, retail delivery · Hamilton, ON',
    period: 'Jun 2022 – present',
    detail:
      'Independent schedule while building a game-development portfolio in 2026 (HomeWorld, DreamEngine, Tether, Shift, and Portfolio Studio). Reliable, accurate delivery in fast-paced retail settings; strong customer communication.',
    sort_order: 3,
    created_at: '',
    updated_at: '',
  },
  {
    id: 'mohawk',
    owner_id: 'public',
    role: 'Diploma, Computer Systems Technology — Software Development',
    org: 'Mohawk College · Hamilton, ON',
    period: '2019',
    detail: 'Valid Ontario Class G licence. Open to remote, or hybrid / on-site in the GTA–Hamilton area.',
    sort_order: 4,
    created_at: '',
    updated_at: '',
  },
]

export const PUBLIC_TOOLING_SHOWCASE: PitchShowcase = HOMEWORLD_TOOLING_SHOWCASE

export const PORTFOLIO_TABS = [
  { id: 'overview', label: 'Overview', aliases: [] as string[] },
  { id: 'projects', label: 'Projects', aliases: ['work'] },
  { id: 'tools', label: 'Tools', aliases: [] },
  { id: 'experience', label: 'Experience', aliases: [] },
  { id: 'resume', label: 'Résumé', aliases: ['résumé', 'cv'] },
  { id: 'contact', label: 'Contact', aliases: [] },
] as const

export type PortfolioTabId = (typeof PORTFOLIO_TABS)[number]['id']

export function parsePortfolioTab(search: string, hash: string): PortfolioTabId {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search)
  const raw = (params.get('tab') || hash.replace(/^#/, '') || 'overview').trim().toLowerCase()
  const normalized = raw.normalize('NFD').replace(/\p{M}/gu, '')
  for (const item of PORTFOLIO_TABS) {
    if (item.id === raw || item.id === normalized) return item.id
    if (item.aliases.some((alias) => alias === raw || alias === normalized)) return item.id
  }
  return 'overview'
}

