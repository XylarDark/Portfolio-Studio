import type { Pitch, PitchLink, PitchProject } from './pitches'
import { EVENICA, OUTFUSION, TRUCKSAIL } from './pitchWork'
import { HOMEWORLD_FIGURES } from './publicPortfolio'

/**
 * Pitch pages for the Nov 16, 2026 job packs (thatgamecompany, Providius,
 * SadServers, Gastronomous, Mercor, CSC Generation). Copy mirrors
 * /workspace/apply_nov16/<slug>/cover_letter.md and resume_<slug>.md;
 * don't add claims here.
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

const DREAMSTEAD: PitchProject = {
  title: 'DreamStead — solo-dev automation harness',
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

const HOMEWORLD_GAME: PitchProject = {
  title: 'HomeWorld — Unreal Engine 5.8 / C++ game',
  meta: 'Feb 2026 – present · Independent (solo) · Unreal Engine 5.8, C++, Python tools',
  summary:
    'C++ gameplay for an ARPG survival and family-sim aimed at PC, set on a 5 km-radius planetoid: character and movement, Gameplay Ability System, inventory, time-of-day, and a homestead-to-planetoid loop.',
  bullets: [
    'Chapter 1’s feature walk (homestead, planting, backpack, gathering, rune unlock, camp, bed-to-spirit, nurture, and portal camp) is merged and covered by automated play-in-editor tests.',
    'Planetoid systems use a 5 km-radius closed-mesh shell, PCG scatter, and data-driven zone placement.',
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

const TRUCKSAIL_FEATURED: PitchProject = {
  title: 'TruckSail — C++ ECU firmware',
  meta: 'Feb 2020 – Jan 2021 · Ancaster, ON · C++, STM32, CAN bus',
  summary:
    'Wrote C++ firmware for truck ECU devices on STM32, communicating over CAN bus, and did defect finding when the hardware did not behave. Also built JS/Bootstrap UIs, optimized SQL, and maintained GitHub workflows.',
  note: 'This is about one year of professional embedded C++ — the closest employed work I have to software that controls physical hardware. I have not written production motor-control, camera, or actuator software for robots.',
}

export const THATGAMECOMPANY_PITCH: Pitch = {
  slug: 'admin',
  key: 'thatgamecompany',
  company: 'thatgamecompany',
  role: 'Build Engineer (Associate to Mid-Level) — remote, US & Canada',
  headline: 'Build engineer — queues, checks, and release tools',
  lede: 'A page made for thatgamecompany’s Build Engineer role: the build queue, hard-fail runner, and résumé.',
  letterHeading: 'Hi thatgamecompany hiring team',
  letter: [
    'I’m applying for the Build Engineer (Associate to Mid-Level) role. I’m in Hamilton, Ontario, legally authorized to work in Canada without sponsorship, and available immediately. I can work to 10 am–5 pm Pacific (1 pm–8 pm Eastern).',
    'The posting is about maintaining the app build and release process across mobile, consoles, and PC, improving CI, writing tools for other teams, and helping with rapid testing — with a C++ background and Python automation. That is close to how I already work. On HomeWorld, a private Unreal Engine 5.8 / C++ game, I built a headless test runner that hard-fails on a false “done” (an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries), each with a regression test, and a build wrapper with one machine-wide queue so parallel agents can’t collide. On DreamStead I built a done-gate (rebase, test rerun, merge-ready check), a merge train, and a tool index (123 merged pull requests as of 12 November 2026). I write Python and C++, use Git and GitHub Actions, and I treat agent output as untrusted until tests and a review say otherwise. At TruckSail I wrote C++ firmware for truck ECU devices (STM32, CAN bus).',
    'I want to be clear about gaps and about work authorization. I have not used Perforce or Jenkins as part of a job, and I have not managed Google Play or App Store releases or Ansible provisioning. I would expect to learn your source control, CI, and storefront process on the team. I am authorized to work in Canada without sponsorship. I am not authorized to work in the United States, and I would need authorization if this role can only be hired as US employment. The posting body says “Remote US & Canada,” while the Ashby location field is “Remote - US” and the posting footer says applicants must be authorized to work for any employer in the U.S.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: HOMEWORLD_TOOLS,
  other: [DREAMSTEAD, TETHER, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/thatgamecompany.pdf',
  resumeBlurb: 'One-page résumé tailored for the thatgamecompany Build Engineer role.',
}

export const PROVIDIUS_PITCH: Pitch = {
  slug: 'admin',
  key: 'providius',
  company: 'Providius',
  role: 'Software Engineer, Test — on-site, Hamilton',
  headline: 'Software engineer, test — automation and tooling',
  lede: 'A page made for Providius’s Software Engineer, Test role: the tests and checks I build, and the résumé.',
  letterHeading: 'Hi Providius hiring team',
  letter: [
    'I’m applying for the Software Engineer, Test role (on-site, Hamilton). I live in Hamilton, Ontario, I am legally authorized to work in Canada without sponsorship, and I am available immediately.',
    'The posting is a hands-on engineering role: writing automated tests, building reusable fixtures and mocks, adding CI smoke checks, investigating failures across application and environment, and testing REST APIs. That is close to how I already work. I write tests in Python (pytest on HomeWorld) and TypeScript (83 Vitest test files on Shift). On HomeWorld I built a headless test runner that hard-fails on a false “done” (an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries), each with a regression test. On DreamStead I built a done-gate (rebase, test rerun, merge-ready check), a merge train, and a tool index (123 merged pull requests as of 12 November 2026). In employed roles I did QA testing of client software at Evenica (including Linux), tested C# REST integrations for player data at OutFusion, and did cross-browser QA and defect finding on C++ ECU firmware at TruckSail.',
    'I want to be clear about gaps. I have not used Playwright, Cypress, or JUnit in a formal test-automation role. I have not built Linux/Docker test labs around captured network traffic, syslog, SNMP, or TimescaleDB, and I have not done formal performance or soak testing as a job. I would expect to learn Providius’s product, fixtures, and toolchain on the team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: HOMEWORLD_TOOLS,
  other: [DREAMSTEAD, TETHER, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/providius.pdf',
  resumeBlurb: 'One-page résumé tailored for the Providius Software Engineer, Test role.',
}

export const SADSERVERS_PITCH: Pitch = {
  slug: 'admin',
  key: 'sadservers',
  company: 'SadServers',
  role: 'SRE AI Developer — remote Canada, part-time or contract',
  headline: 'Software engineer — tools that verify AI-agent work',
  lede: 'A page made for SadServers’ SRE AI Developer role: the agent-verification work I already do, and the résumé.',
  letterHeading: 'Hi SadServers hiring team',
  letter: [
    'I’m applying for the SRE AI Developer role (remote Canada, part-time or contract), as advertised in the November 2026 Hacker News hiring thread. I’m in Hamilton, Ontario, legally authorized to work in Canada without sponsorship, and available immediately.',
    'You’re looking for a software engineer to develop the part of SadServers that companies use to evaluate and train SRE AI agents, including work like the SREBattle benchmark, on a stack of Django REST, Python runners, and Node/React/Vite. The closest work I can show is the verification tooling I already build around coding agents. On DreamStead, a solo-dev automation harness, I built a done-gate (rebase, test rerun, merge-ready check), a merge train, auto-resume, a status notifier, and a tool index (123 merged pull requests as of 12 November 2026). On HomeWorld I built a headless test runner that hard-fails on a false “done,” so a pass has to be a real pass. I write Python and TypeScript. Portfolio Studio is a shipped React/TypeScript/Vite site, and Shift is a shipped Vite/TypeScript game with 83 Vitest test files.',
    'I want to be clear about gaps. I have not used Django REST as part of a job, and I have not built a production Linux/SRE training platform or a VM-challenge product. I would expect to learn your stack, runners, and customer workflow on the contract. I’m glad the process is a video call and a paid mini-project; I would be happy to do both.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMSTEAD,
  other: [HOMEWORLD_TOOLS, TETHER, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/sadservers.pdf',
  resumeBlurb: 'One-page résumé tailored for the SadServers SRE AI Developer role.',
}

export const GASTRONOMOUS_PITCH: Pitch = {
  slug: 'admin',
  key: 'gastronomous',
  company: 'Gastronomous',
  role: 'Robotics Software Developer (Embedded) — on-site, Oakville',
  headline: 'Embedded C++ developer — firmware on physical hardware',
  lede: 'A page made for Gastronomous’s Robotics Software Developer (Embedded) role: the TruckSail ECU work, current C++, and the résumé.',
  letterHeading: 'Hi Gastronomous hiring team',
  letter: [
    'I’m applying for the Robotics Software Developer (Embedded) role (on-site, Oakville). I live in Hamilton, Ontario, I can commute to 2212 Wyecroft Road, I am legally authorized to work in Canada without sponsorship, and I am available immediately.',
    'The posting is about writing the embedded C++ and firmware that drive motors, sensors, actuators, and cameras on machines that already cook for customers, and about bringing up new hardware. The closest employed work I have is at TruckSail (February 2020 – January 2021), where I wrote C++ firmware for truck ECU devices on STM32, talking over CAN bus, and did defect finding when the hardware did not behave. That is about one year of professional embedded C++, which is less than two. I still write C++ every day on HomeWorld, a private Unreal Engine 5.8 game, including a headless test runner that hard-fails on a false “done” and a build wrapper with one machine-wide queue — that is game C++, not firmware, but it is current C++ I can walk through.',
    'I want to be clear about gaps. I have not written production software for motors, cameras, heaters, pumps, or kitchen robots. I have not used ROS 2, OpenCV, OAK/DepthAI, or Jetson, and I have not done architecture work that other embedded engineers adopted. I would expect to learn your machines, lab process, and software structure on the team. What I can offer is that I have already written C++ that talked to real hardware, and I stay with a problem until it works.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: TRUCKSAIL_FEATURED,
  other: [HOMEWORLD_TOOLS, DREAMSTEAD, TETHER, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, EVENICA],
  resumePath: '/resumes/gastronomous.pdf',
  resumeBlurb: 'One-page résumé tailored for the Gastronomous Robotics Software Developer (Embedded) role.',
}

export const MERCOR_PITCH: Pitch = {
  slug: 'admin',
  key: 'mercor',
  company: 'Mercor',
  role: 'Application Users: Unreal Engine on Windows — remote contract',
  headline: 'Unreal Engine 5.8 / C++ — application user',
  lede: 'A page made for Mercor’s Unreal Engine on Windows contract: HomeWorld, and the résumé.',
  letterHeading: 'Hi Mercor hiring team',
  letter: [
    'I’m applying for the Application Users — Unreal Engine on Windows — Generalist contract. I’m in Hamilton, Ontario, available immediately, and I can work as an independent contractor.',
    'The posting wants people who already have Unreal Engine installed and who can use it in real work, not a tutorial walkthrough. Since February 2026 I have been developing HomeWorld solo in Unreal Engine 5.8 / C++: character and movement, Gameplay Ability System, inventory, time-of-day, PCG scatter, and a homestead-to-planetoid loop on a 5 km-radius closed-mesh shell. Chapter 1’s feature walk is merged and covered by automated play-in-editor tests. I also built a JSON editor-automation bridge and a headless test runner that hard-fails on a false “done.” Earlier I built game UI/UX in C# at OutFusion (February–December 2022).',
    'I want to be clear about two things. First, I will confirm on the form whether my current Windows setup and display can capture screenshots over 2.5 megapixels, as the posting requires; I am not treating that as already verified from here. Second, the public listing’s structured data lists applicant location as the US, while the body describes a remote contractor role paid weekly on Stripe or Wise and only rules out H-1B and STEM OPT. I live in Canada. If you cannot engage Canadian contractors, please say so and I will not take further time.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: HOMEWORLD_GAME,
  other: [HOMEWORLD_TOOLS, DREAMSTEAD, TETHER, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/mercor.pdf',
  resumeBlurb: 'One-page résumé tailored for the Mercor Unreal Engine on Windows contract.',
}

export const CSCGENERATION_PITCH: Pitch = {
  slug: 'admin',
  key: 'cscgeneration',
  company: 'CSC Generation',
  role: 'Junior Software Engineer — remote, US or Canada',
  headline: 'Junior software engineer — React, TypeScript, and tests',
  lede: 'A page made for CSC Generation’s Junior Software Engineer role: the React work I ship, the checks I run, and the résumé.',
  letterHeading: 'Hi CSC Generation hiring team',
  letter: [
    'I’m applying for the Junior Software Engineer role (remote, US or Canada) on the platform team at One Kings Lane. I’m in Hamilton, Ontario, legally authorized to work in Canada without sponsorship, and available immediately. I can attend the mandatory in-person interview in Toronto.',
    'The posting is full-stack work on shared tooling used across e-commerce brands — React and TypeScript on the front end, Node on the back end, small pull requests, tests, and disciplined use of AI coding tools. The parts I can already show are React, TypeScript, tests, and that discipline. Portfolio Studio is a shipped React/TypeScript/Vite site with a Supabase (Postgres) backend and GitHub Actions deploys. Shift is a shipped TypeScript game with 83 Vitest test files. I use coding agents every day — Cursor, Grok, and OpenCode with DeepSeek — and I review their diffs; merge gates and tests have to pass first. On DreamStead I built a done-gate, a merge train, and a tool index (123 merged pull requests as of 12 November 2026). In employed roles I built and tested C# REST integrations at OutFusion and JS/SQL tooling at TruckSail.',
    'I want to be clear about gaps. I have not built a production Node.js backend, and I have not used Express, Next.js, or Claude Code. I have not worked on e-commerce storefronts or a shared component library as a job. I would expect to learn your Node services, design system, and review practices on the team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: {
    label: 'Open Portfolio Studio',
    href: 'https://xylardark.github.io/Portfolio-Studio/u/admin/portfolio',
  },
  featured: PORTFOLIO_STUDIO,
  other: [SHIFT, DREAMSTEAD, HOMEWORLD_TOOLS, TETHER, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/cscgeneration.pdf',
  resumeBlurb: 'One-page résumé tailored for the CSC Generation Junior Software Engineer role.',
}
