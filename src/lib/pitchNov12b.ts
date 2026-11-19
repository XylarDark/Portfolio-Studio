import type { Pitch, PitchLink, PitchProject } from './pitches'
import { EVENICA, OUTFUSION, TRUCKSAIL } from './pitchWork'

/**
 * Pitch pages for the Nov 12, 2026 afternoon job packs (Vertmix, Rose Rocket,
 * PointClickCare, Zynga, Priceline, Applied Systems).
 * Copy mirrors /workspace/apply_nov12b/<slug>/cover_letter.md and resume_<slug>.md; don't add claims here.
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

const HOMEWORLD_TOOLS: PitchProject = {
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
}

const HOMEWORLD_CPP: PitchProject = {
  title: 'HomeWorld — C++ game, test and build automation',
  meta: 'Feb 2026 – present · Independent (solo) · UE 5.8, C++, Python',
  summary:
    'A solo Unreal Engine 5.8 / C++ project. Alongside the game code I built Python tooling, a headless test runner that refuses false passes, and a build wrapper with a machine-wide queue. Some code is written by AI coding agents under my direction; source changes wait for my review.',
  note: 'Private repository — code walkthrough available on request.',
}

export const VERTMIX_PITCH: Pitch = {
  slug: 'admin',
  key: 'vertmix',
  company: 'Vertmix',
  role: 'Junior Software Developer (Remote, Canada)',
  headline: 'Junior software developer — internal tools & AI automation',
  lede: 'A page made for Vertmix’s Junior Software Developer role: the TypeScript, React and Python work I ship, the internal tools and checks I build, and the résumé.',
  letterHeading: 'Hi Vertmix hiring team',
  letter: [
    'I’m applying for the Junior Software Developer role. I’m in Hamilton, legally authorized to work in Canada, and available immediately. Remote-first work from anywhere in Canada is a good fit for me.',
    'The posting is for someone who will build TypeScript, Next.js and React applications, Python and Node APIs, AI-powered automations, and internal developer tooling. Personal projects count, and years of experience matter less than being able to learn and ship. That matches the work I’ve been doing this year.',
    'Since February 2026 I’ve built HomeWorld, a solo Unreal Engine 5.8 / C++ project, with AI coding agents writing much of the code under my direction. The part I own is the tooling and the checks: a JSON tool bridge where agents send a `{command, args}` request and get structured JSON back; a headless test runner that hard-fails on an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries, each with a regression test; and written merge gates so a claim is not treated as done until it has evidence. I also shipped Portfolio Studio, this React/TypeScript site with a Supabase (Postgres) backend, pull requests I review, headless-Chrome checks, and GitHub Actions on each merge. Shift, a TypeScript browser game, has 83 Vitest test files in its public repo.',
    'I have a Computer Systems Technology diploma (Software Development) from Mohawk College (2019), and earlier professional work in JavaScript, SQL, C#, Python, and C++ at OutFusion, TruckSail and Evenica.',
    'I have not shipped a production Next.js app (Portfolio Studio and Shift use Vite), and I have not used Azure, AWS or GCP in production. I would expect to learn those on your team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: HOMEWORLD_TOOLS,
  other: [PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/vertmix.pdf',
  resumeBlurb: 'One-page résumé tailored for the Vertmix Junior Software Developer role.',
}

export const ROSE_ROCKET_PITCH: Pitch = {
  slug: 'admin',
  key: 'roserocket',
  company: 'Rose Rocket',
  role: 'Junior Software Engineer (Toronto, hybrid, Mon / Tue / Thu in office)',
  headline: 'Junior software engineer — AI-native product work',
  lede: 'A page made for Rose Rocket’s Junior Software Engineer role: how I direct AI coding agents, check their output, and ship React/TypeScript, plus the résumé.',
  letterHeading: 'Hi Rose Rocket hiring team',
  letter: [
    'I’m applying for the Junior Software Engineer role. I’m in Hamilton, legally authorized to work in Canada, available immediately, and can work from the downtown Toronto office on Mondays, Tuesdays and Thursdays.',
    'The posting asks for someone who already builds with AI coding agents, can show a project where an agent wrote most of the code, and can explain how they planned the work, checked the output, and what they changed. That is the way I have been building HomeWorld since February 2026.',
    'HomeWorld is a solo Unreal Engine 5.8 / C++ project. Agents write much of the code under my direction. I planned the work as a multi-agent workflow with written handoff rules, and I check output with tools I built: a JSON `{command, args}` bridge that returns structured results from the editor; a headless test runner that hard-fails on an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries, each with a regression test; and merge gates so a claim is not done until it has evidence. Source changes wait for my review. I also shipped Portfolio Studio in React, TypeScript and Postgres (Supabase), through pull requests I review, with GitHub Actions and headless-Chrome checks.',
    'I have a Computer Systems Technology diploma (Software Development) from Mohawk College (2019), not a bachelor’s degree in computer or software engineering. I would rather put that on the table than leave it implicit. I also have not used NestJS, AWS, Docker or Kubernetes in production; I would expect to learn that stack on your team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: HOMEWORLD_TOOLS,
  other: [PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/roserocket.pdf',
  resumeBlurb: 'One-page résumé tailored for the Rose Rocket Junior Software Engineer role.',
}

export const POINTCLICKCARE_PITCH: Pitch = {
  slug: 'admin',
  key: 'pointclickcare',
  company: 'PointClickCare',
  role: 'Jr Software Engineer (SRE) — Remote or Mississauga, hybrid',
  headline: 'Junior software engineer — SRE & operational tooling',
  lede: 'A page made for PointClickCare’s Junior Site Reliability Engineer role: the automation and verification tooling I build, and the résumé.',
  letterHeading: 'Hi PointClickCare hiring team',
  letter: [
    'I’m applying for the Junior Site Reliability Engineer role (Canada- Jr Software Engineer (SRE)). I’m in Hamilton, legally authorized to work in Canada, and available immediately. I’m open to the Mississauga hybrid option or remote, as the posting lists both.',
    'The posting is designed for 0–2 years of experience, accepts a diploma or equivalent experience, and involves automation, troubleshooting, and contributing to internally developed AI-powered operational tools. That is the closest match to the tooling I’ve been building this year.',
    'On HomeWorld, my solo Unreal Engine 5.8 / C++ project, I built a headless test runner that hard-fails on five causes of a fake pass (unreadable report, wrong engine, zero tests run, stale report, or stale binaries), each with a regression test, and a build wrapper with one machine-wide queue so parallel jobs can’t collide. I also built a JSON tool bridge that returns structured editor state, and I use AI coding agents under written review gates. I write scripts and tests in Python and TypeScript, and I have professional QA experience from Evenica (May 2018 – Sep 2019).',
    'I have not worked as an SRE, I have not been on a production on-call rotation, and I have not used Azure, Kubernetes, or observability platforms such as Datadog, Grafana or Prometheus in production. I would expect to learn those on your team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: HOMEWORLD_TOOLS,
  other: [PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/pointclickcare.pdf',
  resumeBlurb: 'One-page résumé tailored for the PointClickCare Junior Site Reliability Engineer role.',
}

export const ZYNGA_PITCH: Pitch = {
  slug: 'admin',
  key: 'zynga',
  company: 'Zynga',
  role: 'Software Developer 1 — Ad Tech (Toronto)',
  headline: 'Software developer — C# / C++',
  lede: 'A page made for Zynga’s Software Developer 1 (Ad Tech) role: my C# and C++ work, tests, and how I use AI coding agents, plus the résumé.',
  letterHeading: 'Hi Zynga hiring team',
  letter: [
    'I’m applying for the Software Developer 1 role on the Ad Tech team in Toronto. I’m in Hamilton, legally authorized to work in Canada, available immediately, and can commute to Toronto.',
    'The posting asks for 1–2 years of software development in Java or C# / C++, basic SQL, CS fundamentals, and comfort using AI and agentic development to ship software. I have professional C# (OutFusion, Evenica) and C++ (TruckSail, and HomeWorld since February 2026), plus SQL in production web work at TruckSail and Evenica.',
    'I want to be clear that this role is Ad Tech platform work, not a gameplay role, and I don’t have advertising-technology experience. What I can bring is C# and C++ development, tests, and the way I already use AI coding agents: they write much of the HomeWorld code under my direction, and I built a JSON tool bridge and a headless test runner that hard-fails on fake passes before a change is treated as done.',
    'I have a Computer Systems Technology diploma (Software Development) from Mohawk College (2019), which I take as the posting’s “related technical discipline (or equivalent)”, not a bachelor’s in computer science. I have not built mobile SDKs, Unity, Swift or Kotlin, or AWS ad-tech systems, and I would expect to learn those on your team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: {
    label: 'Open Portfolio Studio',
    href: 'https://xylardark.github.io/Portfolio-Studio/u/admin/portfolio',
  },
  featured: HOMEWORLD_CPP,
  other: [PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/zynga.pdf',
  resumeBlurb: 'One-page résumé tailored for the Zynga Software Developer 1 (Ad Tech) role.',
}

export const PRICELINE_PITCH: Pitch = {
  slug: 'admin',
  key: 'priceline',
  company: 'Priceline',
  role: 'Associate Software Developer — Itinerary Generation, Flights (Toronto, hybrid, two days in-office)',
  headline: 'Associate software developer',
  lede: 'A page made for Priceline’s Associate Software Developer role: my C#, JavaScript, Python, SQL and testing work, and the résumé.',
  letterHeading: 'Hi Priceline hiring team',
  letter: [
    'I’m applying for the Associate Software Developer role on the Itinerary Generation team in Flights (Req R5914). I’m in Hamilton, legally authorized to work in Canada, available immediately, and can work the two in-office days in Toronto.',
    'The posting asks for a bachelor’s or equivalent practical experience, 1+ years of software engineering, hands-on work in one or more of Elixir, Go, JavaScript, Python, Java or C#, SQL, Git, automated testing, and comfort using AI tooling. I have professional C#, JavaScript, Python and SQL, and more than a year of employed software work at Evenica, TruckSail and OutFusion.',
    'I write tests alongside my code: Shift, a TypeScript browser game, has 83 Vitest files in a public repo, and on HomeWorld I built a headless test runner that hard-fails on a false pass. I use Git and GitHub, including GitHub Actions, and I already use AI coding agents with review gates rather than trusting their output blindly.',
    'I have a Computer Systems Technology diploma (Software Development) from Mohawk College (2019), not a bachelor’s in computer science. I have not built low-latency, high-throughput flight-search services, and I have not used Elixir or Go professionally. I would expect to learn your stack and the flights domain on the team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: {
    label: 'Open Portfolio Studio',
    href: 'https://xylardark.github.io/Portfolio-Studio/u/admin/portfolio',
  },
  featured: PORTFOLIO_STUDIO,
  other: [SHIFT, HOMEWORLD_TOOLS, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/priceline.pdf',
  resumeBlurb: 'One-page résumé tailored for the Priceline Associate Software Developer role.',
}

export const APPLIED_SYSTEMS_PITCH: Pitch = {
  slug: 'admin',
  key: 'appliedsystems',
  company: 'Applied Systems',
  role: 'Associate Software Engineer / Software Engineer (Toronto, hybrid)',
  headline: 'Associate software engineer',
  lede: 'A page made for Applied Systems’ Associate Software Engineer role: my C#, React/TypeScript, Python, SQL and testing work, and the résumé.',
  letterHeading: 'Hi Applied Systems hiring team',
  letter: [
    'I’m applying for the Associate Software Engineer / Software Engineer role, for the Toronto location. I’m in Hamilton, legally authorized to work in Canada, available immediately, and can work hybrid from the Toronto office.',
    'The posting is for an associate who will contribute to modernizing a codebase, reducing technical debt, writing tests, and learning modern tools, including AI tools, with mentorship. Preferred experience includes C#, React, Python, SQL and REST APIs, plus basic knowledge of CI/CD and automated testing. That is the work I already have.',
    'At Evenica (May 2018 – Sep 2019) I was a Software Developer and QA Tester building and testing client software in C# and T-SQL. At OutFusion (Feb – Dec 2022) I built and tested C# REST API integrations. More recently I shipped Portfolio Studio in React and TypeScript with a Postgres backend, pull requests I review, headless-Chrome checks, and GitHub Actions, and I use AI coding agents under review gates on HomeWorld.',
    'I have a Computer Systems Technology diploma (Software Development) from Mohawk College (2019), which I take as the posting’s equivalent combination of education and experience, not a bachelor’s in computer science. I have not used Go, gRPC, Google Cloud, Kubernetes or Terraform, and I would expect to learn those on your team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: {
    label: 'Open Portfolio Studio',
    href: 'https://xylardark.github.io/Portfolio-Studio/u/admin/portfolio',
  },
  featured: PORTFOLIO_STUDIO,
  other: [SHIFT, HOMEWORLD_TOOLS, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/appliedsystems.pdf',
  resumeBlurb: 'One-page résumé tailored for the Applied Systems Associate Software Engineer role.',
}
