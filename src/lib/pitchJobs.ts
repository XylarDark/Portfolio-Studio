import type { Pitch, PitchLink, PitchProject } from './pitches'

/**
 * Pitch pages for the Nov 11, 2026 job packs (Sirion, Payment Source, Miovision).
 * Copy mirrors /workspace/<slug>/cover_letter.md and resume_<slug>.md; don't add claims here.
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

const TRUCKSAIL: PitchProject = {
  title: 'TruckSail — Software Developer (12-month contract)',
  meta: '2020 · Ancaster, ON · STM32, CAN, JavaScript, SQL',
  summary:
    'Implemented STM32/CAN firmware with defect finding for reliability; built JS/Bootstrap UIs and optimized SQL. Maintained GitHub workflows; cross-browser QA and password-management security support.',
}

const OUTFUSION: PitchProject = {
  title: 'OutFusion — Video Game Developer (contract)',
  meta: '2022 · Hamilton, ON · C#',
  summary:
    'Built and tested C# REST API integrations for player data, integrated and tested game UI across mobile and desktop, and partnered on bug verification and release quality.',
}

export const SIRION_PITCH: Pitch = {
  slug: 'admin',
  key: 'sirion',
  company: 'Sirion',
  role: 'AI Agent Builder – Junior Engineer (Toronto, hybrid)',
  headline: 'AI agent builder & automation developer',
  lede: 'A page made for Sirion’s AI Agent Builder – Junior Engineer role: how I build with AI agents and check their work, plus the résumé.',
  letterHeading: 'Hi Sirion team',
  letter: [
    'I’m applying for the AI Agent Builder – Junior Engineer role in Toronto. The posting asks for someone who designs agent logic, connects agents to tools and data, tests their reasoning, and measures whether they’re reliable. That’s what I’ve spent this year doing.',
    'Since February 2026 I’ve built HomeWorld, a solo Unreal Engine 5.8 / C++ game, with AI coding agents writing much of the code under my direction. Some examples:',
    {
      list: [
        '**A multi-agent workflow:** separate roles for research, design interviews, implementation and testing, with written handoff rules and merge gates. Docs-only changes merge after a passing test; source changes wait for my approval.',
        '**A tool bridge:** agents and scripts send a JSON `{command, args}` request and get a structured JSON response from the editor, and new command modules plug in.',
        '**Checks for a false “done”:** a test runner that refuses five kinds of fake pass, and a capability matrix in which every claim carries an evidence level.',
      ],
    },
    'Before that, I did contract work with APIs and databases: REST integrations in C# at OutFusion, and SQL plus STM32/CAN firmware at TruckSail. I have a Computer Systems Technology diploma from Mohawk College.',
    'I’m in Hamilton, available immediately, and can commute to Toronto for hybrid days.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: {
    title: 'HomeWorld — AI-agent workflow and verification tooling',
    meta: 'Feb 2026 – present · Independent (solo) · UE 5.8, C++, Python',
    summary:
      'A solo Unreal Engine 5.8 / C++ game built with AI coding agents under my direction. I design the tools and the rules they enforce, and every agent result is checked against real state before it counts.',
    bullets: [
      'Editor automation bridge: a JSON request/response protocol for actor lists, world info, Blueprint defaults, asset checks, and a per-row pass/fail probe.',
      'Headless test runner that hard-fails on an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries. Each of these once produced a fake pass.',
      'A build wrapper with one machine-wide queue, so parallel agents can’t start colliding builds.',
      'A tool-capability matrix with evidence levels from E0 (only claimed in a doc) to E5 (survived a fresh editor). Backed by 42 C++ automation test files and 150+ Python test files.',
    ],
    links: [TOOLS_WRITEUP],
    note: 'Private repository — code walkthrough available on request.',
  },
  other: [PORTFOLIO_STUDIO, TRUCKSAIL, OUTFUSION],
  resumePath: '/resumes/sirion.pdf',
  resumeBlurb: 'One-page résumé tailored for the Sirion AI Agent Builder – Junior Engineer role.',
}

export const PAYMENT_SOURCE_PITCH: Pitch = {
  slug: 'admin',
  key: 'paymentsource',
  company: 'Payment Source',
  role: 'Software Quality Assurance Tester (remote)',
  headline: 'Software QA tester & test automation',
  lede: 'A page made for Payment Source’s Software Quality Assurance Tester role: the tests I’ve built, where they came from, and the résumé.',
  letterHeading: 'Why I’m a fit',
  letter: [
    'Dear Payment Source hiring team,',
    'I’m applying for the Software Quality Assurance Tester role. Your setup, a small team with automated tests as the main focus, is close to how I already work. I build and test HomeWorld, my solo Unreal Engine 5.8 / C++ project, remotely and largely on my own.',
    'I came to testing through bugs that got past the checks. At OutFusion (2022) I tested game UI on mobile and desktop and helped verify bugs before release. At TruckSail (2020) I did defect finding on STM32/CAN firmware and cross-browser QA on the web side.',
    'On HomeWorld, the old test runner reported “0 passed, 0 failed” on every run. It had never tested anything, and nobody noticed because the result file looked clean. Later, a “19/19 passed” came from a build nine minutes older than the code. I rebuilt the runner so those cases are hard failures, each with a regression test. A passing test should mean something.',
    'I write tests in TypeScript with Vitest (Shift has 83 test files in its public repo) and in Python with pytest. This site is checked in headless Chrome with Playwright at desktop and phone sizes before merges; the AI agents I direct write those scripts and I review them. Owning a Playwright suite myself, and WCAG 2.0 AA testing, are the first things I’d get fluent in.',
  ],
  signoff: 'Sincerely — Luke Thompson',
  primaryCta: { label: 'Browse Shift’s tests', href: 'https://github.com/XylarDark/ShiftGame/tree/master/src/sim' },
  featured: {
    title: 'HomeWorld — test and verification tooling',
    meta: 'Feb 2026 – present · Independent (solo) · UE 5.8, C++, Python',
    summary:
      'Test tooling for my solo Unreal Engine 5.8 project, built around one rule: a pass has to be proven, not just reported.',
    bullets: [
      'The runner reads the engine’s UTF-8 report correctly (a byte-order mark had been silently breaking it), checks the engine version, and treats “zero tests ran” as an error.',
      'It clears old reports before each run and refuses to start when the binary is older than the newest source file.',
      'Five asset validators run on save and in whole-project batch runs; data sheets are schema-checked with readable errors before anything changes.',
      '42 C++ automation test files and 150+ Python test files.',
    ],
    links: [TOOLS_WRITEUP],
    note: 'Private repository — code walkthrough available on request.',
  },
  other: [SHIFT, PORTFOLIO_STUDIO, OUTFUSION, TRUCKSAIL],
  resumePath: '/resumes/paymentsource.pdf',
  resumeBlurb: 'One-page résumé tailored for the Payment Source Software QA Tester role.',
}

export const MIOVISION_PITCH: Pitch = {
  slug: 'admin',
  key: 'miovision',
  company: 'Miovision',
  role: 'Firmware Developer (Kitchener, hybrid)',
  headline: 'Firmware & embedded software developer',
  lede: 'A page made for Miovision’s Firmware Developer role: my STM32/CAN firmware background, my recent C++ and Python work, and the résumé.',
  letterHeading: 'Why I’m a fit',
  letter: [
    'Dear Miovision hiring team,',
    'I’m applying for the Firmware Developer role in Kitchener. My professional work started in embedded systems: during a 12-month contract at TruckSail (2020) I implemented STM32/CAN firmware and did defect finding for reliability, and I also worked on the product’s web UI and SQL. I hold a Computer Systems Technology diploma (Software Development) from Mohawk College (2019).',
    'This year I’ve been writing C++ and Python on HomeWorld, my solo Unreal Engine 5.8 project, including the test and build tooling around it. Its test runner hard-fails when a report can’t be read, the engine version is wrong, zero tests ran, a report is stale, or a binary is older than its source. Your posting’s focus on rigorous validation, test coverage across interfaces, unit testing and static analysis is the standard I hold my own work to.',
    'What I haven’t done yet: embedded Linux kernel builds, BSP work, Yocto or Buildroot, and oscilloscope-level hardware debugging. Those are what I’d want to learn alongside your Electrical Engineering and Device Software teams.',
    'I’m in Hamilton, available immediately, and can commute to Kitchener for hybrid days.',
  ],
  signoff: 'Thank you for your time — Luke Thompson',
  featured: {
    title: 'TruckSail — Software Developer (12-month contract)',
    meta: '2020 · Ancaster, ON · STM32, CAN bus, JavaScript, SQL',
    summary: 'Firmware and web work for TruckSail’s product.',
    bullets: [
      'Implemented STM32/CAN firmware with defect finding for reliability.',
      'Built JS/Bootstrap UIs and optimized SQL for the web side of the product.',
      'Maintained GitHub workflows; cross-browser QA and password-management security support.',
    ],
  },
  other: [
    {
      title: 'HomeWorld — Unreal Engine 5.8 / C++ game and tooling',
      meta: 'Feb 2026 – present · Solo · C++, Python',
      summary:
        'C++ systems (a versioned save system with migrations, an editor module with commandlets) and the test and build tooling around them: a runner that refuses fake passes, and a build wrapper that retries lock failures and queues builds. 42 C++ automation test files and 150+ Python test files.',
      links: [TOOLS_WRITEUP],
      note: 'Private repository — available on request.',
    },
    SHIFT,
    OUTFUSION,
  ],
  resumePath: '/resumes/miovision.pdf',
  resumeBlurb: 'One-page résumé tailored for the Miovision Firmware Developer role.',
}
