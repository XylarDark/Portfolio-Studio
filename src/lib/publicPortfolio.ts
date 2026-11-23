import type { Experience } from './types'
import type { PitchFigure, PitchProject, PitchShowcase } from './pitches'
import { HOMEWORLD_TOOLING_SHOWCASE } from './toolingShowcase'

/** Public, search-indexable game-dev portfolio at /u/admin/portfolio. */
export const PUBLIC_PORTFOLIO_SLUG = 'admin'

export const PUBLIC_RESUME_PATH = '/resumes/luke-thompson-gamedev.pdf'

export const PUBLIC_PORTFOLIO = {
  displayName: 'Luke Thompson',
  headline: 'Tools Engineer (AI & Games)',
  location: 'Hamilton, ON',
  lede:
    'I design tools, agent harnesses, and gameplay systems. I built and run DreamFlow, my agentic harness: every change is a small pull request, tests are written first and must fail before the code is written, and CI must pass before a change merges. I have also been developing HomeWorld (a private Unreal Engine 5.8 / C++ game, in development since February 2026), and I shipped Shift, a playable Phaser 3 shop-and-delivery game. Open to remote Unreal and tools work, or hybrid / on-site in the GTA–Hamilton area.',
  githubHref: 'https://github.com/XylarDark',
  githubLabel: 'github.com/XylarDark',
  linkedinHref: 'https://www.linkedin.com/in/stevenlthompson1/',
  linkedinLabel: 'LinkedIn',
  contactBlurb:
    'Hamilton, ON. Open to remote roles, or hybrid / on-site in the GTA–Hamilton area.',
  resumeBlurb: 'Tools engineer (AI & games) résumé, led by DreamStead’s DreamFlow.',
  availability: 'Available immediately · Remote · Eastern Time (Toronto)',
  roles:
    'Open to junior/entry, intermediate, and contract game developer roles — gameplay programming, Unreal/C++, tools, and QA.',
}

export const PUBLIC_SKILLS: { label: string; value: string }[] = [
  { label: 'AI & agents', value: 'Agent harnesses, coding agents I direct, test-first gates, CI merge gates' },
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
    src: '/media/homeworld-keyart-planetside.jpg',
    alt: 'Stylized key art split between a night-time homestead on a floating island and a daylight camp on the planet surface, with a large moon above.',
    caption: 'Key art of the homestead island and the planet-side camp. This is concept art, not a gameplay capture.',
    kind: 'keyart',
  },
  {
    src: '/media/homeworld-keyart-dusk.jpg',
    alt: 'Stylized key art of the homestead at dusk: a log cabin, purple flower beds, a stone shrine with a blue crystal, and a large moss-covered bear, with the player in the foreground.',
    caption: 'Key art of the homestead yard, shrine, and moss-bear at dusk. This is concept art, not a gameplay capture.',
    kind: 'keyart',
  },
  {
    src: '/media/homeworld-keyart-character.jpg',
    alt: 'Stylized key art of the player standing at the homestead at dusk, with the cabin, flower beds, and a stone shrine behind them.',
    caption: 'Key art of the player at the homestead. This is concept art, not a gameplay capture.',
    kind: 'keyart',
  },
  {
    src: '/media/homeworld-keyart-lair.jpg',
    alt: 'Stylized key art of a cave mouth at night: the player sits on a bull facing a stone figure bound by a serpent with a glowing eye.',
    caption: 'Key art of a cave-mouth encounter. This is concept art, not a gameplay capture.',
    kind: 'keyart',
  },
]

export const DREAMFLOW_PROJECT: PitchProject = {
  title: 'DreamFlow — agentic dev harness I built and run',
  meta: 'Nov 2026 – present · Independent (solo) · Python · dreamstead.ca/dreamflow',
  summary:
    'DreamFlow is the agentic development harness I built and run for my own work. It is not a product for sale, and it is not how I deliver client Unreal work today. I treat model output as a guess, never as proof, and I can walk through the work on request.',
  bullets: [
    'I built it to direct coding agents without taking “done” at their word. The harness is how I work, not something a client installs.',
    'A walkthrough is available on request. There is no public repository.',
  ],
  links: [{ label: 'DreamFlow at DreamStead', href: 'https://dreamstead.ca/dreamflow' }],
  note: 'Private repository — walkthrough available on request.',
  figures: [
    {
      src: '/media/dreamflow-six-steps.webp',
      fallbackSrc: '/media/dreamflow-six-steps.jpg',
      alt: 'DreamFlow: six steps from a rough request to a small, tested change.',
      caption: 'DreamFlow: six steps from a rough request to a small, tested change.',
      kind: 'diagram',
    },
  ],
}

export const PUBLIC_PROJECTS: { featured?: boolean; project: PitchProject }[] = [
  {
    featured: true,
    project: DREAMFLOW_PROJECT,
  },
  {
    featured: true,
    project: {
      title: 'HomeWorld — Unreal Engine 5.8 / C++ game',
      meta: 'Feb 2026 – present · Independent (solo) · Unreal Engine 5.8, C++, Python tools',
      summary:
        'HomeWorld is a private Unreal Engine 5.8 / C++ game, in development since February 2026. I built the C++ gameplay for an ARPG survival and family-sim aimed at PC: character and movement, Gameplay Ability System, inventory, time-of-day, and a homestead-to-planetoid loop (glider descent, shrine portal, gather, nurture, and interact).',
      bullets: [
        'Chapter 1’s feature walk — homestead, planting, backpack, gathering, rune unlock, camp, bed-to-spirit, nurture, and portal camp — is merged and covered by automated play-in-editor tests.',
        'Built planetoid world systems on a 5 km-radius planet, including a closed-mesh planet shell, PCG scatter, and data-driven zone placement and recipes rather than one-off baked maps.',
        'Implemented a versioned save system with per-system slices and migrations that refuse unknown newer saves; added C++ and Python tests around saves, a 7-axis sin/virtue system, and playtest beats.',
        'Editor tooling, build automation, and a Blender greybox pipeline are on the Tools tab.',
      ],
      note: 'Private repository — walkthrough available on request.',
      figures: HOMEWORLD_FIGURES,
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
      'Independent schedule while building a game-development portfolio in 2026 (DreamStead’s DreamFlow, HomeWorld, Shift, and Portfolio Studio). Reliable, accurate delivery in fast-paced retail settings; strong customer communication.',
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

