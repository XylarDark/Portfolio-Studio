import type { Pitch, PitchLink, PitchProject } from './pitches'
import { EVENICA, OUTFUSION, TRUCKSAIL } from './pitchWork'

/**
 * Pitch pages for the Nov 11, 2026 job packs (Sirion, Payment Source, Citi).
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
    'Before that, I worked with APIs and databases: game UI/UX and C# REST integrations at OutFusion (2022), SQL and C++ firmware for truck ECU devices at TruckSail (2020–21), and T-SQL, C# and Laravel client software as a developer and QA tester at Evenica (2018–19). I have a Computer Systems Technology diploma from Mohawk College.',
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
  other: [PORTFOLIO_STUDIO, OUTFUSION, TRUCKSAIL, EVENICA],
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
    'My first QA title was at Evenica (2018–19), where I was a Software Developer & QA Tester building and testing client software in T-SQL, C# and Laravel. At TruckSail (Feb 2020 – Jan 2021) I did defect finding on C++ firmware for truck ECU devices and cross-browser QA on the web side. At OutFusion (Feb–Dec 2022) I implemented game UI/UX from the design docs, tested it on mobile and desktop, and helped verify bugs before release.',
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
  other: [SHIFT, PORTFOLIO_STUDIO, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/paymentsource.pdf',
  resumeBlurb: 'One-page résumé tailored for the Payment Source Software QA Tester role.',
}

export const CITI_PITCH: Pitch = {
  slug: 'admin',
  key: 'citi',
  company: 'Citi',
  role: 'Software Engineer, Design Systems & AI Tooling (Mississauga, hybrid)',
  headline: 'Software engineer — AI tooling & verification',
  lede: 'A page made for Citi’s Software Engineer, Design Systems & AI Tooling role: the AI tooling I build, the checks that keep it honest, my React/TypeScript work, and the résumé.',
  letterHeading: 'Hi Citi hiring team',
  letter: [
    'I’m applying for the Software Engineer, Design Systems & AI Tooling role in Mississauga. Your team is building a design agent and MCP server and needs people who use AI coding tools every day and also build the harnesses that check what those tools produce. That’s how I’ve worked all year, and Track 3 (Quality, Reliability & Verification) is where I’d start.',
    'Since February 2026 I’ve built HomeWorld, a solo Unreal Engine 5.8 / C++ game, with AI coding agents writing much of the code under my direction. The part I’m proudest of is the verification around them:',
    {
      list: [
        '**A JSON tool bridge:** agents and scripts send a `{command, args}` request to the editor and get structured JSON back, and new command modules plug in.',
        '**A test runner that refuses fake passes:** it hard-fails on an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries. Each of those once produced a “pass”, and each now has a regression test.',
        '**Evidence levels for every claim:** a capability matrix from E0 (only claimed in a doc) to E5 (survived a fresh editor), backed by 42 C++ automation test files and 150+ Python test files.',
      ],
    },
    'On the web side, I build in React and TypeScript. Portfolio Studio, this site, has a Supabase (Postgres) backend and goes through pull requests I review, with headless-Chrome checks at desktop and phone sizes before merge. Shift, my TypeScript browser game, has 83 Vitest test files. Earlier, I built game UI/UX and C# REST integrations at OutFusion (2022), JS/SQL web and C++ ECU firmware at TruckSail (2020–21), and T-SQL, C# and Laravel/Vue.js client software as a developer and QA tester at Evenica (2018–19). I have a Computer Systems Technology diploma (Software Development) from Mohawk College.',
    'I haven’t worked with Figma’s APIs, Swift or Kotlin, or WCAG auditing yet, and I’d expect to learn those on your team.',
    'I’m in Hamilton, legally authorized to work in Canada, available immediately, and can commute to Mississauga for hybrid days.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: {
    title: 'HomeWorld — AI-agent tooling and verification',
    meta: 'Feb 2026 – present · Independent (solo) · UE 5.8, C++, Python',
    summary:
      'A solo Unreal Engine 5.8 / C++ game built with AI coding agents under my direction. I build the tools they use and the checks their output has to pass before it counts.',
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
  resumePath: '/resumes/citi.pdf',
  resumeBlurb: 'One-page résumé tailored for the Citi Software Engineer, Design Systems & AI Tooling role.',
}
