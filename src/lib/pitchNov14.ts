import type { Pitch, PitchLink, PitchProject } from './pitches'
import { EVENICA, OUTFUSION, TRUCKSAIL } from './pitchWork'
import { HOMEWORLD_FIGURES } from './publicPortfolio'

/**
 * Pitch pages for the Nov 14, 2026 job packs (Method, Hootsuite, Miraterra,
 * PolicyMe, AssemblyAI, 1VALET). Copy mirrors /workspace/apply_nov14/<slug>/
 * cover_letter.md and resume_<slug>.md; don't add claims here.
 */

const TOOLS_WRITEUP: PitchLink = {
  label: 'Full tools write-up',
  href: 'https://xylardark.github.io/Portfolio-Studio/u/admin/portfolio#tools',
}

const SHIFT: PitchProject = {
  title: 'Shift — playable shop & delivery game',
  meta: 'Aug – Sep 2026 · Independent · Phaser 3, TypeScript, Vite',
  summary:
    'A shipped TypeScript browser and PWA game with a fixed 60 Hz simulation and cached A* routing. The public repo has 83 Vitest test files.',
  links: [
    { label: 'Play Shift', href: 'https://xylardark.github.io/ShiftGame/' },
    { label: 'Source on GitHub', href: 'https://github.com/XylarDark/ShiftGame' },
  ],
}

const PORTFOLIO_STUDIO: PitchProject = {
  title: 'Portfolio Studio',
  meta: 'Sep 2026 – present · React, TypeScript, Vite, Supabase',
  summary:
    'This site: a public media-résumé product with Studio editing, a Supabase backend, and per-employer pages like this one. Built with AI coding agents through pull requests I review, and deployed by GitHub Actions.',
  links: [
    { label: 'Live site', href: 'https://xylardark.github.io/Portfolio-Studio/u/admin/portfolio' },
    { label: 'Source on GitHub', href: 'https://github.com/XylarDark/Portfolio-Studio' },
  ],
}

const DREAMENGINE: PitchProject = {
  title: 'DreamEngine — solo-dev automation harness',
  meta: 'Nov 2026 – present · Independent (solo) · agent orchestration, scheduled automation',
  summary:
    'A solo-dev automation harness: one person steers while parallel agent lanes run in local coding-agent sessions on a five-minute scheduled tick.',
  bullets: [
    'Built a done-gate (rebase, test rerun, merge-ready check), a merge train, auto-resume, a status notifier, and a tool index (123 merged pull requests as of 12 November 2026).',
    'Preference-engine Layer 1 auto-defaults only at a 95% take rate over at least 20 evidenced answers; safety-sensitive types never auto-default. A first end-to-end dream is in progress.',
  ],
  links: [TOOLS_WRITEUP],
  note: 'Private repository — code walkthrough available on request.',
}

const HOMEWORLD_TOOLS: PitchProject = {
  title: 'HomeWorld — AI-agent tooling and verification',
  meta: 'Feb 2026 – present · Independent (solo) · UE 5.8, C++, Python',
  summary:
    'A solo Unreal Engine 5.8 / C++ project built with AI coding agents under my direction. I build the tools they use and the checks their output has to pass before it counts.',
  bullets: [
    'Editor automation bridge: a JSON request/response protocol (world info, asset checks, a per-row pass/fail probe) that new command modules plug into.',
    'Headless test runner that hard-fails on an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries, each with a regression test.',
    'A build wrapper with one machine-wide queue, so parallel agents can’t start colliding builds. Source changes wait for my review.',
  ],
  links: [TOOLS_WRITEUP],
  note: 'Private repository — code walkthrough available on request. The figures below are HomeWorld key art (concept art, not gameplay captures or greybox stills).',
  figures: HOMEWORLD_FIGURES,
}

const TETHER: PitchProject = {
  title: 'Tether — phone app for reviewing computer work',
  meta: 'Nov 2026 – present · Independent (solo) · TypeScript, phone PWA · went live 11 Nov 2026',
  summary:
    'A phone PWA with push notifications and actionable decision cards that write answers back and can run declared actions. The phone is for reading, approving, and running declared actions — not for editing code or opening a public port.',
  note: 'Private repository — code walkthrough available on request.',
}

export const METHOD_PITCH: Pitch = {
  slug: 'admin',
  key: 'method',
  company: 'Method',
  role: 'Junior Quality Engineer — hybrid, downtown Toronto',
  headline: 'Junior quality engineer — automated checks & CI',
  lede: 'A page made for Method’s Junior Quality Engineer role: the tests, done-gates and agent checks I build, and the résumé.',
  letterHeading: 'Hi Method hiring team',
  letter: [
    'I’m applying for the Junior Quality Engineer role on the Vertical App Experience team (hybrid, downtown Toronto). I’m in Hamilton, Ontario, legally authorized to work in Canada without sponsorship, and available immediately.',
    'The posting is about eliminating manual testing through automation, AI coding agents, Playwright suites, and stronger CI/CD — with only a small, deliberate amount of exploratory and edge-case testing left for a person. That is close to how I already work. On HomeWorld I built a headless test runner that hard-fails on a false “done” (an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries), each with a regression test, and a build wrapper with one machine-wide queue so parallel agents can’t collide. On DreamEngine I built a done-gate (rebase, test rerun, merge-ready check), a merge train, and a tool index (123 merged pull requests as of 12 November 2026). I write tests in TypeScript and Python, use GitHub Actions, and treat agent output as untrusted until tests and a review say otherwise. In employed roles I did QA testing at Evenica, cross-browser QA and firmware defect finding at TruckSail, and bug verification and release quality work at OutFusion.',
    'I want to be clear about gaps. I have not used Playwright or Selenium in a formal test-automation role, and I have not spent a year writing API-level integration tests as my job. I have not used Java, Gatling, or Postman. I would expect to learn Method’s Playwright framework, API testing, and product on the team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: HOMEWORLD_TOOLS,
  other: [DREAMENGINE, TETHER, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/method.pdf',
  resumeBlurb: 'One-page résumé tailored for the Method Junior Quality Engineer role.',
}

export const HOOTSUITE_PITCH: Pitch = {
  slug: 'admin',
  key: 'hootsuite',
  company: 'Hootsuite',
  role: 'Junior Software Developer — Remote Canada',
  headline: 'Junior software developer — tests, CI, and shipping',
  lede: 'A page made for Hootsuite’s Junior Software Developer role: the software I ship, the checks I build, and the résumé.',
  letterHeading: 'Hi Hootsuite hiring team',
  letter: [
    'I’m applying for the Junior Software Developer role (remote Canada). I’m in Hamilton, Ontario, legally authorized to work in Canada without sponsorship, and available immediately.',
    'The posting is about designing, building, testing, and shipping software on a small team, following existing patterns, writing tests, and owning the delivery lifecycle for lower-complexity work. That is the kind of work I already do. I write TypeScript, JavaScript, C#, Python and C++. On HomeWorld I built a headless test runner that hard-fails on a false “done,” and a build wrapper with one machine-wide queue so parallel agents can’t collide. On DreamEngine I built a done-gate (rebase, test rerun, merge-ready check), a merge train, and a tool index (123 merged pull requests as of 12 November 2026). Portfolio Studio is a shipped React/TypeScript site with GitHub Actions deploys, and Shift is a shipped TypeScript game with 83 Vitest test files. In employed roles I built and tested C# REST integrations and game UI at OutFusion, JS/SQL tooling and C++ firmware at TruckSail, and client software in T-SQL, C# and JavaScript at Evenica.',
    'I want to be clear about gaps. I have a Computer Systems Technology diploma (Software Development) from Mohawk College (2019), not a computer science or engineering degree; the posting also accepts an equivalent level of education or work experience. I have not used Java or a functional programming language. I would expect to learn your language, architecture, and delivery practices on the team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMENGINE,
  other: [HOMEWORLD_TOOLS, TETHER, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/hootsuite.pdf',
  resumeBlurb: 'One-page résumé tailored for the Hootsuite Junior Software Developer role.',
}

export const MIRATERRA_PITCH: Pitch = {
  slug: 'admin',
  key: 'miraterra',
  company: 'Miraterra',
  role: 'Associate Software Developer — hybrid, Toronto or Vancouver',
  headline: 'Associate software developer — AI tools & hardware-adjacent work',
  lede: 'A page made for Miraterra’s Associate Software Developer role: daily AI-tool use, hardware-adjacent firmware work, and the résumé.',
  letterHeading: 'Hi Miraterra hiring team',
  letter: [
    'I’m applying for the Associate Software Developer role (hybrid, based in Toronto or Vancouver). I’m in Hamilton, Ontario, legally authorized to work in Canada without sponsorship, and available immediately.',
    'The posting is about building software that connects AI, instruments, and real-world data — front end, back end, hardware integration, daily AI coding tools, and tests that check what AI-powered features produce. I already use coding agents every day on HomeWorld, DreamEngine, Tether, and Portfolio Studio, and I do not accept their output as finished work. On HomeWorld I built a headless test runner that hard-fails on a false “done,” and a JSON command/response bridge for editor automation. On DreamEngine I built a done-gate, a merge train, and a tool index (123 merged pull requests as of 12 November 2026). I write JavaScript/TypeScript and Python, use Git and GitHub Actions, and shipped a React/TypeScript site (Portfolio Studio) with a Supabase (Postgres) backend. At TruckSail I wrote C++ firmware for truck ECU devices (STM32, CAN bus), which is the closest thing I have to the hardware and instrument interest in the posting.',
    'I want to be clear about gaps. I have a Computer Systems Technology diploma (Software Development) from Mohawk College (2019), not a computer science or engineering degree; the posting also accepts equivalent experience. I have not worked on lab instruments, soil or geospatial platforms, or instrument-control software, and I have not used your lab processes or PPE training. I would expect to learn those on the team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: HOMEWORLD_TOOLS,
  other: [DREAMENGINE, TETHER, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/miraterra.pdf',
  resumeBlurb: 'One-page résumé tailored for the Miraterra Associate Software Developer role.',
}

export const POLICYME_PITCH: Pitch = {
  slug: 'admin',
  key: 'policyme',
  company: 'PolicyMe',
  role: 'Junior Software Engineer — Remote Canada',
  headline: 'Junior software engineer — React and AI tooling',
  lede: 'A page made for PolicyMe’s Junior Software Engineer role: the React work I ship, the agent checks I run, and the résumé.',
  letterHeading: 'Hi PolicyMe hiring team',
  letter: [
    'I’m applying for the Junior Software Engineer role (remote Canada). I’m in Hamilton, Ontario, legally authorized to work in Canada without sponsorship, and available immediately.',
    'The posting is full-stack work on an AI-powered web application — Python, React, PostgreSQL, and AWS — plus integrating models and building reliable backend services. The parts I can already show are React and AI-tooling discipline. Portfolio Studio is a shipped React/TypeScript site with a Supabase (Postgres) backend and GitHub Actions deploys. I use coding agents every day on HomeWorld, DreamEngine, Tether, and Portfolio Studio, and I review their diffs; merge gates and tests have to pass first. On HomeWorld I built a headless test runner that hard-fails on a false “done.” On DreamEngine I built a done-gate, a merge train, and a tool index (123 merged pull requests as of 12 November 2026). I write Python tests (pytest) and TypeScript tests (83 Vitest files on Shift).',
    'I want to be clear about gaps. I have not used Django or Flask. I have not built a production Node.js backend. I have not used AWS, Redux, or LangChain/LangGraph in production. My Postgres experience is Supabase on Portfolio Studio, not a self-managed AWS data store. I would expect to learn your stack on the team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: {
    label: 'Open Portfolio Studio',
    href: 'https://xylardark.github.io/Portfolio-Studio/u/admin/portfolio',
  },
  featured: PORTFOLIO_STUDIO,
  other: [HOMEWORLD_TOOLS, DREAMENGINE, TETHER, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/policyme.pdf',
  resumeBlurb: 'One-page résumé tailored for the PolicyMe Junior Software Engineer role.',
}

export const ASSEMBLYAI_PITCH: Pitch = {
  slug: 'admin',
  key: 'assemblyai',
  company: 'AssemblyAI',
  role: 'Software Engineer, Agent Experience — Remote, North America',
  headline: 'Software engineer — agent experience & tool checks',
  lede: 'A page made for AssemblyAI’s Software Engineer, Agent Experience role: the agent tools and eval-style checks I build, and the résumé.',
  letterHeading: 'Hi AssemblyAI hiring team',
  letter: [
    'I’m applying for the Software Engineer, Agent Experience role (remote, North America). I’m in Hamilton, Ontario, legally authorized to work in Canada without sponsorship, and available immediately.',
    'The posting is about making coding agents a first-class user of AssemblyAI: MCP, agent skills, machine-readable docs, and evals so an agent can get to a working integration on the first try. That is the kind of problem I already work on, on my own projects. I use coding agents every day on HomeWorld, DreamEngine, Tether, and Portfolio Studio, and I do not accept their output as finished work. On HomeWorld I built a JSON command/response bridge for editor automation, and a headless test runner that hard-fails on a false “done” (an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries), each with a regression test. On DreamEngine I built a done-gate, a merge train, and a tool index (123 merged pull requests as of 12 November 2026). Tether is a TypeScript phone app that can only run declared actions — not edit code or open a public port.',
    'I want to be clear about gaps. This is not a junior title, and I have not shipped a production MCP server, an official agent-skill library, or Voice AI work. I have not worked in developer relations or SDK engineering at an API-first company. My employed software roles are Game Developer at OutFusion (2022), Software Developer at TruckSail (2020–21), and Software Developer & QA Tester at Evenica (2018–19), plus independent tooling work since February 2026. I would expect to learn your MCP server, APIs, and evals on the team, and I understand this is a reach relative to the posted Canada pay band.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: HOMEWORLD_TOOLS,
  other: [DREAMENGINE, TETHER, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/assemblyai.pdf',
  resumeBlurb: 'One-page résumé tailored for the AssemblyAI Software Engineer, Agent Experience role.',
}

export const VALET_PITCH: Pitch = {
  slug: 'admin',
  key: '1valet',
  company: '1VALET',
  role: 'Junior QA Engineer — Remote',
  headline: 'Junior QA engineer — hardware-adjacent testing',
  lede: 'A page made for 1VALET’s Junior QA Engineer role: employed QA, ECU firmware defect finding, and the résumé.',
  letterHeading: 'Hi 1VALET hiring team',
  letter: [
    'I’m applying for the Junior QA Engineer role (remote). I’m in Hamilton, Ontario, legally authorized to work in Canada without sponsorship, and available immediately.',
    'The posting is hands-on QA for hardware, firmware, software, and connected IoT systems — test plans, reproducing field issues, and working with physical devices. The closest employed work I have is QA testing of client software at Evenica (May 2018 – September 2019), cross-browser QA and defect finding on C++ truck ECU firmware (STM32, CAN bus) at TruckSail, and bug verification and release quality work at OutFusion. On my own projects I write automated tests (pytest on HomeWorld, 83 Vitest files on Shift) and built a headless runner that hard-fails on a false “done,” so a pass has to be a real pass.',
    'I want to be clear about gaps. I have not done formal QA on smart-building, access-control, or third-party IoT products (smart locks, thermostats, readers). I have not used TestRail, and I have not worked in a hardware bring-up lab for building-entry systems. I would expect to learn 1VALET’s devices, lab process, and tools on the team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: HOMEWORLD_TOOLS,
  other: [DREAMENGINE, TETHER, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/1valet.pdf',
  resumeBlurb: 'One-page résumé tailored for the 1VALET Junior QA Engineer role.',
}
