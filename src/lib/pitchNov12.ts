import type { Pitch, PitchLink, PitchProject } from './pitches'
import { EVENICA, OUTFUSION, TRUCKSAIL } from './pitchWork'

/**
 * Pitch pages for the Nov 12, 2026 job packs (L3Harris WESCAM, MaRS IAF, Wonderbrands).
 * Copy mirrors /workspace/apply_nov12/<slug>/cover_letter.md and resume_<slug>.md; don't add claims here.
 */

const TOOLS_WRITEUP: PitchLink = {
  label: 'Full tools write-up',
  href: 'https://xylardark.github.io/Portfolio-Studio/u/admin/portfolio#tools',
}

const SHIFT: PitchProject = {
  title: 'Shift — playable shop & delivery game',
  meta: 'Aug – Sep 2026 · Independent · Phaser 3, TypeScript, Vite',
  summary:
    'A browser and PWA game with a fixed 60 Hz simulation, cached A* routing, and a mobile shell for phones. The public repo has 83 Vitest test files.',
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

const HOMEWORLD_CPP: PitchProject = {
  title: 'HomeWorld — C++ game, test and build automation',
  meta: 'Feb 2026 – present · Independent (solo) · UE 5.8, C++, Python',
  summary:
    'A solo Unreal Engine 5.8 / C++ project. Alongside the game code I built Python tooling, a headless test runner that refuses false passes, and a build wrapper with a machine-wide queue. Some code is written by AI coding agents under my direction; source changes wait for my review.',
  note: 'Private repository — code walkthrough available on request.',
}

export const L3HARRIS_PITCH: Pitch = {
  slug: 'admin',
  key: 'l3harris',
  company: 'L3Harris WESCAM',
  role: 'Associate, Embedded Software Developer (Waterdown, on-site)',
  headline: 'Associate embedded software developer',
  lede: 'A page made for L3Harris WESCAM’s Associate, Embedded Software Developer role in Waterdown: the C++ firmware I’ve shipped, the test tooling I build now, and the résumé.',
  letterHeading: 'Hi L3Harris WESCAM hiring team',
  letter: [
    'I’m applying for the Associate, Embedded Software Developer role in Waterdown (Req 47506). I live in Hamilton, so Waterdown is a short commute, and I’m available immediately.',
    'The closest professional match I have is TruckSail (Feb 2020 – Jan 2021), where I wrote C++ firmware for truck ECU devices on STM32 (Arm) with CAN bus, and did defect finding for reliability. That work sits next to several of the preferred capabilities on the posting: embedded C/C++, Arm processors, and interfaces such as CAN.',
    'Since February 2026 I’ve been building HomeWorld, a solo Unreal Engine 5.8 / C++ project. Alongside the game code I built Python tooling and a headless test runner that refuses a false “pass” — it hard-fails on an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries, each with a regression test — and a build wrapper with one machine-wide queue so parallel jobs can’t collide. I also use Git, compilation toolchains, and both Windows and Linux as host systems. Some HomeWorld code is written by AI coding agents under my direction; source changes wait for my review.',
    'I have a Computer Systems Technology diploma (Software Development) from Mohawk College (2019), not a bachelor’s degree. The posting allows four years of prior related experience in lieu of a degree. My employed software work is Evenica (2018 – Sep 2019), TruckSail (Feb 2020 – Jan 2021), and OutFusion (Feb – Dec 2022), plus the HomeWorld C++ and tooling work since February 2026. I would rather put that record in front of you than overstate it.',
    'I have not worked with ThreadX or vxWorks, FPGA-based systems, MATLAB, or camera, laser, or avionics applications, and I’d expect to learn those on your team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: {
    title: 'HomeWorld — C++ game, test and build automation',
    meta: 'Feb 2026 – present · Independent (solo) · UE 5.8, C++, Python',
    summary:
      'A solo Unreal Engine 5.8 / C++ project with Python tooling built around one rule: a pass has to be proven, not just reported.',
    bullets: [
      'C++ gameplay and engine-side code, plus Python tooling that drives the editor and checks results against real state.',
      'Headless test runner that hard-fails on an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries, each with a regression test.',
      'A build wrapper with one machine-wide queue, so parallel jobs can’t start colliding builds.',
      '42 C++ automation test files and 150+ Python test files. Source changes wait for my review.',
    ],
    links: [TOOLS_WRITEUP],
    note: 'Private repository — code walkthrough available on request.',
  },
  other: [TRUCKSAIL, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, EVENICA],
  resumePath: '/resumes/l3harris.pdf',
  resumeBlurb: 'One-page résumé tailored for the L3Harris WESCAM Associate, Embedded Software Developer role.',
}

export const MARS_PITCH: Pitch = {
  slug: 'admin',
  key: 'mars',
  company: 'MaRS IAF',
  role: 'Developer, AI & Automation (Toronto, hybrid, 3 days / week)',
  headline: 'AI & automation developer — internal tools',
  lede: 'A page made for MaRS IAF’s Developer, AI & Automation role: the internal tools and checks I build, my Python, SQL and TypeScript work, and the résumé.',
  letterHeading: 'Hi MaRS IAF hiring team',
  letter: [
    'I’m applying for the Developer, AI & Automation role on the Investment Accelerator Fund team. I’m in Hamilton, legally authorized to work in Canada, available immediately, and can work from 101 College Street three days a week.',
    'The posting is for someone who builds internal tools, automates repetitive work, and uses AI in a practical way, with a foundation in Python, SQL, APIs and Git. That’s the work I’ve been doing this year.',
    'Since February 2026 I’ve built HomeWorld, a solo Unreal Engine 5.8 / C++ project, with AI coding agents writing much of the code under my direction. The part I own is the tooling and the checks:',
    {
      list: [
        '**A JSON tool bridge:** agents and scripts send a `{command, args}` request and get structured JSON back, and new command modules plug in.',
        '**A test runner that refuses fake passes:** it hard-fails on an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries. Each of those once produced a “pass”, and each now has a regression test.',
        '**Written handoff rules and merge gates,** so a claim is not treated as done until it has evidence.',
      ],
    },
    'On the web and data side, I build in TypeScript and SQL. Portfolio Studio, this site, is a React/TypeScript product with a Supabase (Postgres) backend, pull requests I review, and headless-Chrome checks before merge. Earlier, I built C# REST integrations at OutFusion (2022), JS/SQL web and C++ firmware at TruckSail (2020–21), and T-SQL, C# and Laravel/Vue.js client software as a developer and QA tester at Evenica (2018–19). I have a Computer Systems Technology diploma (Software Development) from Mohawk College.',
    'I have not used Attio, Zapier or n8n, and I have not worked in venture capital. I would expect to learn those on your team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: {
    title: 'HomeWorld — AI-agent tooling and verification',
    meta: 'Feb 2026 – present · Independent (solo) · UE 5.8, C++, Python',
    summary:
      'A solo Unreal Engine 5.8 / C++ project built with AI coding agents under my direction. I build the tools they use and the checks their output has to pass before it counts.',
    bullets: [
      'Editor automation bridge: a JSON request/response protocol (world info, asset checks, a per-row pass/fail probe) that new command modules plug into.',
      'Headless test runner that hard-fails on an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries, each with a regression test.',
      'A build wrapper with one machine-wide queue, so parallel agents can’t start colliding builds.',
      'A multi-agent workflow with written handoff rules and merge gates; source changes wait for my review.',
    ],
    links: [TOOLS_WRITEUP],
    note: 'Private repository — code walkthrough available on request.',
  },
  other: [PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/mars.pdf',
  resumeBlurb: 'One-page résumé tailored for the MaRS IAF Developer, AI & Automation role.',
}

export const WONDERBRANDS_PITCH: Pitch = {
  slug: 'admin',
  key: 'wonderbrands',
  company: 'Wonderbrands',
  role: 'Fullstack Software Developer (Open to New Grads) — Etobicoke, hybrid',
  headline: 'Full-stack software developer',
  lede: 'A page made for Wonderbrands’ Fullstack Software Developer (Open to New Grads) role: my C#, SQL and React/TypeScript work, and the résumé.',
  letterHeading: 'Hi Wonderbrands hiring team',
  letter: [
    'I’m applying for the Fullstack Software Developer (Open to New Grads) role in Etobicoke. I’m in Hamilton, legally authorized to work in Canada, available immediately, and can commute to Etobicoke for hybrid days.',
    'The posting asks for post-secondary education in software development and working knowledge of C# / .NET, modern web (HTML, CSS, JavaScript/TypeScript, and a framework such as React), and SQL Server / T-SQL, plus API integration. That matches the work I’ve already done, including a few years of professional software jobs after my diploma.',
    'I have a Computer Systems Technology diploma (Software Development) from Mohawk College (2019). At Evenica (2018 – Sep 2019) I was a Software Developer & QA Tester building and testing client software in T-SQL, C#, and Laravel (MySQL, PHP, JavaScript/jQuery, Vue.js), including work for Andrew Peller, Young’s Market Company and MM Realty International. At OutFusion (Feb – Dec 2022) I built and tested C# REST API integrations for player data and implemented game UI/UX from the design docs.',
    'More recently I shipped Portfolio Studio, a React/TypeScript site with a Supabase (Postgres) backend, Studio editing, and per-employer pages. It’s built through pull requests I review, with headless-Chrome checks at desktop and phone sizes and GitHub Actions on each merge. Shift, my TypeScript browser game, has 83 Vitest test files in its public repo.',
    'I have not built production systems on Microsoft Azure, and I have not implemented SSO or data-level access controls in a production app. I would expect to learn those on your team. I also want to be clear that I graduated in 2019, not this year; I am applying because the posting is open to new graduates and the skills line up, not because I am a 2026 graduate.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: {
    label: 'Open Portfolio Studio',
    href: 'https://xylardark.github.io/Portfolio-Studio/u/admin/portfolio',
  },
  featured: {
    title: 'Portfolio Studio',
    meta: 'Sep 2026 – present · React, TypeScript, Vite, Supabase',
    summary:
      'This site: a public media-résumé product with Studio editing, a Supabase (Postgres) backend, and per-employer pages like this one.',
    bullets: [
      'React/TypeScript front end with a Postgres-backed Studio and per-employer pages.',
      'Built with AI coding agents through pull requests I review; GitHub Actions deploys each merge.',
      'Headless-Chrome checks at desktop and phone sizes before a change goes out.',
    ],
    links: [
      { label: 'Live site', href: 'https://xylardark.github.io/Portfolio-Studio/u/admin/portfolio' },
      { label: 'Source on GitHub', href: 'https://github.com/XylarDark/Portfolio-Studio' },
    ],
  },
  other: [SHIFT, HOMEWORLD_CPP, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/wonderbrands.pdf',
  resumeBlurb: 'One-page résumé tailored for the Wonderbrands Fullstack Software Developer role.',
}
