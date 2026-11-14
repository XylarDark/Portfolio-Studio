import type { Pitch, PitchLink, PitchProject } from './pitches'
import { EVENICA, OUTFUSION, TRUCKSAIL } from './pitchWork'

/**
 * Pitch pages for the Nov 13, 2026 job packs (Affirm, DataVisor, Fable).
 * Copy mirrors /workspace/apply_nov13/<slug>/cover_letter.md and resume_<slug>.md; don't add claims here.
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
  note: 'Private repository — code walkthrough available on request.',
}

const TETHER: PitchProject = {
  title: 'Tether — phone app for reviewing computer work',
  meta: 'Nov 2026 – present · Independent (solo) · TypeScript, phone PWA · went live 11 Nov 2026',
  summary:
    'A phone PWA with push notifications and actionable decision cards that write answers back and can run declared actions. The phone is for reading, approving, and running declared actions — not for editing code or opening a public port.',
  note: 'Private repository — code walkthrough available on request.',
}

export const AFFIRM_PITCH: Pitch = {
  slug: 'admin',
  key: 'affirm',
  company: 'Affirm',
  role: 'Software Engineer I, Backend (Continuous Delivery) — Remote Canada',
  headline: 'Software engineer — developer tools & delivery',
  lede: 'A page made for Affirm’s Software Engineer I, Backend (Continuous Delivery) role: the checks, queues and done-gates I build, and the résumé.',
  letterHeading: 'Hi Affirm hiring team',
  letter: [
    'I’m applying for the Software Engineer I, Backend (Continuous Delivery) role on the Developer Productivity team (remote Canada). I’m in Hamilton, Ontario, legally authorized to work in Canada without sponsorship, and available immediately.',
    'The posting is about making the path from a laptop to production safer and less manual: CI/CD, test automation, release workflows, and guardrails in an AI-enhanced development lifecycle. That is the kind of work I already do on my own projects. On HomeWorld I built a headless test runner that hard-fails on a false “done” (an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries), each with a regression test, and a build wrapper with one machine-wide queue so parallel agents can’t collide. On DreamEngine I built a done-gate (rebase, test rerun, merge-ready check), a merge train, and a tool index (123 merged pull requests as of 12 November 2026). I write tests in Python and TypeScript, and I use GitHub Actions.',
    'I want to be clear about gaps. I have not designed or launched backend systems at Affirm’s scale. I have not used Kotlin. I have not used AWS or Kubernetes in production. My production web and data work is C#, JavaScript, Python, SQL, MySQL and SQL Server from employed roles at OutFusion, TruckSail and Evenica, plus React and GitHub Actions on Portfolio Studio. I would expect to learn your stack, and the continuous-delivery platform, on the team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMENGINE,
  other: [HOMEWORLD_TOOLS, TETHER, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/affirm.pdf',
  resumeBlurb: 'One-page résumé tailored for the Affirm Software Engineer I, Backend (Continuous Delivery) role.',
}

export const DATAVISOR_PITCH: Pitch = {
  slug: 'admin',
  key: 'datavisor',
  company: 'DataVisor',
  role: 'Infrastructure Engineer, Junior / New Grad (Toronto) — Remote Canada',
  headline: 'Junior infrastructure engineer — automation & CI',
  lede: 'A page made for DataVisor’s Junior / New Grad Infrastructure Engineer role: the internal tools and CI checks I build, and the résumé.',
  letterHeading: 'Hi DataVisor hiring team',
  letter: [
    'I’m applying for the Infrastructure Engineer, Junior / New Grad role (remote, Toronto / Canada). I’m in Hamilton, Ontario, legally authorized to work in Canada without sponsorship, and available immediately.',
    'The posting splits time between operating infrastructure and writing code: automation, internal tools, CI/CD, and Python (or Go, Java or Bash). The part I can already show is the tooling. On HomeWorld I built a headless test runner that hard-fails on a false “done,” and a build wrapper with one machine-wide queue so parallel agents can’t collide. On DreamEngine I built a done-gate (rebase, test rerun, merge-ready check), a merge train, and a tool index (123 merged pull requests as of 12 November 2026). I write Python and TypeScript, use Git and GitHub Actions, and worked on Linux at Evenica.',
    'I want to be clear about gaps. I have a Computer Systems Technology diploma (Software Development) from Mohawk College (2019), not a bachelor’s in computer science, computer engineering, or electrical engineering. I have not used Kubernetes, Helm, Terraform, or AWS in production, and I have not been on a production on-call rotation. I would expect to learn those on the team, including joining on-call once I was ramped up.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMENGINE,
  other: [HOMEWORLD_TOOLS, TETHER, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/datavisor.pdf',
  resumeBlurb: 'One-page résumé tailored for the DataVisor Junior Infrastructure Engineer role.',
}

export const FABLE_PITCH: Pitch = {
  slug: 'admin',
  key: 'fable',
  company: 'Fable',
  role: 'Software Engineer (4-month contract) — Remote Canada, GTA preferred',
  headline: 'Software engineer — TypeScript agent tooling',
  lede: 'A page made for Fable’s Software Engineer (4-month contract) role: the agent tools and checks I build, and the résumé.',
  letterHeading: 'Hi Fable hiring team',
  letter: [
    'I’m applying for the Software Engineer (4-month contract) role. I’m in Hamilton, Ontario, legally authorized to work in Canada without sponsorship, and available immediately. I can work Eastern Time hours, Monday to Friday, and I can travel to the Toronto office for occasional in-person collaboration.',
    'The posting is about MCP servers, agent tools, evaluations, and documentation in TypeScript. I have not yet shipped a production MCP server with the official TypeScript MCP SDK. The closest work is the agent tooling I already run: a JSON command/response bridge and a headless test runner on HomeWorld that hard-fails on a false “done”; DreamEngine’s done-gate, merge train and tool index (123 merged pull requests as of 12 November 2026); and Tether, a TypeScript phone PWA that went live on 11 November 2026, where I approve work and run only declared actions. I write tests, use Git and GitHub Actions, and have built and tested REST APIs in C# at OutFusion and Evenica.',
    'Gaps I want to name: I do not have three years of professional backend work running Node.js services and APIs in production, and I have not deployed services on AWS. My employed API work is C# / REST (OutFusion, Evenica). I would expect to learn the official MCP TypeScript SDK, OAuth, and your AWS stack on the contract.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: TETHER,
  other: [DREAMENGINE, HOMEWORLD_TOOLS, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/fable.pdf',
  resumeBlurb: 'One-page résumé tailored for the Fable Software Engineer (4-month contract) role.',
}
