import type { Pitch, PitchLink, PitchProject } from './pitches'
import { EVENICA, OUTFUSION, TRUCKSAIL } from './pitchWork'
import { HOMEWORLD_FIGURES } from './publicPortfolio'

/**
 * Pitch pages for the Nov 18, 2026 job packs (A Modern Arcade, IntuitionLabs,
 * Novara, Velora, Superbar, DistantJob). Copy mirrors
 * /workspace/apply_nov18/<slug>/cover_letter.md and resume_<slug>.md;
 * don't add claims here.
 */

export const TOOLS_WRITEUP: PitchLink = {
  label: 'Full tools write-up',
  href: 'https://xylardark.github.io/Portfolio-Studio/u/admin/portfolio#tools',
}

export const SHIFT: PitchProject = {
  title: 'Shift — playable shop & delivery game',
  meta: 'Aug – Sep 2026 · Independent · Phaser 3, TypeScript, Vite',
  summary:
    'A shipped TypeScript browser and PWA game with a fixed 60 Hz simulation and cached A* routing. The public repo has 83 Vitest test files.',
  links: [
    { label: 'Play Shift', href: 'https://xylardark.github.io/ShiftGame/' },
    { label: 'Source on GitHub', href: 'https://github.com/XylarDark/ShiftGame' },
  ],
}

export const PORTFOLIO_STUDIO: PitchProject = {
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

export const HOMEWORLD_TOOLS: PitchProject = {
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

export const TETHER: PitchProject = {
  title: 'Tether — phone app for reviewing computer work',
  meta: 'Nov 2026 – present · Independent (solo) · TypeScript, phone PWA · went live 11 Nov 2026',
  summary:
    'A phone PWA with push notifications and actionable decision cards that write answers back and can run declared actions. The phone is for reading, approving, and running declared actions — not for editing code or opening a public port.',
  note: 'Private repository — code walkthrough available on request.',
}

const MCPTESTBRIDGE: PitchProject = {
  title: 'MCPTestBridge — Unreal MCP test and PIE plugin (in progress)',
  meta: 'Nov 2026 – present · Independent · Unreal Engine 5.8',
  summary:
    'Started a private Unreal Engine 5.8 code plugin for MCP-driven automation tests, PIE control, and rollback. The repository exists; the plugin is not shipped and should not be treated as a finished product.',
  links: [{ label: 'GitHub (private)', href: 'https://github.com/DreamStead/MCPTestBridge' }],
  note: 'Private repository — not shipped. Code walkthrough available on request.',
}

export const AMODERNARCADE_PITCH: Pitch = {
  slug: 'admin',
  key: 'amodernarcade',
  company: 'A Modern Arcade',
  role: 'Build Engineer / DevOps — remote',
  headline: 'Build engineer / DevOps — Unreal test and build automation',
  lede: 'A page made for A Modern Arcade’s Build Engineer / DevOps role: the Unreal test runner and build queue I already run, and the résumé.',
  letterHeading: 'Hi A Modern Arcade hiring team',
  letter: [
    'I’m applying for the Build Engineer / DevOps role. I live in Hamilton, Ontario, I am legally authorized to work in Canada without sponsorship, and I am available immediately. The posting is listed as full-time remote and does not state which countries you hire in. If you cannot hire in Canada, please say so and I will not take further time.',
    'You’re looking for someone who treats a broken pipeline as a tax on the whole team: CI/CD for a cross-platform Unreal project, automated testing in the build pipeline, source-control administration, and clear documentation. The closest work I can show is the Unreal build and test tooling I already run. On HomeWorld, a private Unreal Engine 5.8 / C++ project, I built a headless test runner that hard-fails on a false “done” (an unreadable report, the wrong engine, zero tests run, a stale report, or stale binaries), each with a regression test, and a build wrapper with one machine-wide queue so parallel agents can’t collide. On DreamStead I built a done-gate (rebase, test rerun, merge-ready check) and a merge train. I write Python and I use GitHub Actions to deploy Portfolio Studio.',
    'I want to be clear about gaps. I have not administered Perforce or designed Perforce streams as a job. I have not used Jenkins or TeamCity, owned AWS, Azure, or GCP infrastructure, or managed console certification and submission builds. I would expect to learn your source-control layout, build farm, and platform pipeline on the team. What I can offer on day one is Unreal-side test and build automation, and a habit of automating anything I have to do more than twice.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: HOMEWORLD_TOOLS,
  other: [DREAMSTEAD, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/amodernarcade.pdf',
  resumeBlurb: 'One-page résumé tailored for the A Modern Arcade Build Engineer / DevOps role.',
}

export const INTUITIONLABS_PITCH: Pitch = {
  slug: 'admin',
  key: 'intuitionlabs',
  company: 'IntuitionLabs',
  role: 'AI Integration Developer — remote, Canada',
  headline: 'AI integration developer — connectors, agents, and checks',
  lede: 'A page made for IntuitionLabs’s AI Integration Developer role: the agent harness and review habit I already use, and the résumé.',
  letterHeading: 'Hi IntuitionLabs hiring team',
  letter: [
    'I’m applying for the AI Integration Developer role (remote, Canada). I live in Hamilton, Ontario, I am legally authorized to work in Canada without sponsorship, and I am available immediately. I am on Eastern Time. My usual working hours today are 1:00–8:00 PM ET; I can discuss how that overlaps with your North American business hours.',
    'The posting is about connectors, MCP tools, tests, and documentation, and about using Claude Code, Codex, or Cursor every day and reviewing what they produce. That is close to how I already work. On DreamStead, a solo-dev agent harness, I built a done-gate (rebase, test rerun, merge-ready check), a merge train, auto-resume, a status notifier, and a tool index (123 merged pull requests as of 12 November 2026). I use Cursor and other coding agents daily and review their output before it is merged. On HomeWorld I built a JSON `{command, args}` automation bridge with structured results, and a headless test runner that hard-fails on a false “done.” I write Python and TypeScript, REST integrations (C# player-data APIs at OutFusion), and tests (pytest; 83 Vitest files on Shift). I have started MCPTestBridge, a private Unreal Engine 5.8 plugin for MCP test and PIE control; the repository exists, and the plugin is not shipped.',
    'I want to be clear about gaps. I have not built production connectors to Box, Benchling, SharePoint, or Microsoft 365, I have not automated user provisioning or audit-log reviews as a job, and I have not worked in life sciences, healthcare, or another regulated industry. I would expect to learn your clients’ systems, identity model, and MCP patterns on the team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMSTEAD,
  other: [HOMEWORLD_TOOLS, MCPTESTBRIDGE, PORTFOLIO_STUDIO, SHIFT, TETHER, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/intuitionlabs.pdf',
  resumeBlurb: 'One-page résumé tailored for the IntuitionLabs AI Integration Developer role.',
}

export const NOVARA_PITCH: Pitch = {
  slug: 'admin',
  key: 'novara',
  company: 'Novara',
  role: 'Software Engineer-AI Platforms — hybrid, North York Tuesdays',
  headline: 'Software engineer — TypeScript, agents, and verification',
  lede: 'A page made for Novara’s Software Engineer-AI Platforms role: the React/TypeScript work and agent checks I already run, and the résumé.',
  letterHeading: 'Hi Novara hiring team',
  letter: [
    'I’m applying for the Software Engineer-AI Platforms role on the Flex team. I live in Hamilton, Ontario, I am legally authorized to work in Canada without sponsorship, and I am available immediately. The role is remote-first with a required Tuesday in the North York office. I can make that commute if you want to proceed; it is a long trip from Hamilton, and I would rather be upfront about it than discover a problem later.',
    'You’re looking for someone who can own scoped full-stack features and who already works with LLMs, tools, agents, and evaluation. The closest work I can show is the TypeScript/React product work and the agent-verification tooling I already run. Portfolio Studio is a shipped React, TypeScript, Vite, and Supabase site with GitHub Actions deploys. I use Cursor and other coding agents daily and review their output before it is merged. On DreamStead I built a done-gate, a merge train, and a tool index (123 merged pull requests as of 12 November 2026). On HomeWorld I built a JSON automation bridge and a headless test runner that hard-fails on a false “done.” I write tests in TypeScript (83 Vitest files on Shift) and Python (pytest).',
    'I want to be clear about gaps. I have not shipped a production Node.js backend as a job. I have not built RAG, embeddings, or vector search, and I have not used AWS Bedrock, LangChain, LangGraph, Datadog, or CloudWatch. I do not have a bachelor’s degree; I have a diploma in Computer Systems Technology — Software Development from Mohawk College (2019). Combined employed software and QA work is about three years and three months (Evenica, TruckSail, OutFusion), plus independent work since February 2026, with delivery driving alongside since June 2022. I would expect to learn Flex, your evaluation standards, and your MCP patterns on the team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: PORTFOLIO_STUDIO,
  other: [DREAMSTEAD, HOMEWORLD_TOOLS, SHIFT, TETHER, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/novara.pdf',
  resumeBlurb: 'One-page résumé tailored for the Novara Software Engineer-AI Platforms role.',
}

export const VELORA_PITCH: Pitch = {
  slug: 'admin',
  key: 'velora',
  company: 'Velora',
  role: 'Software Engineer — remote, Ontario',
  headline: 'Software engineer — AI-native, tests included',
  lede: 'A page made for Velora’s Software Engineer role: directing coding agents, verifying their output, and the résumé.',
  letterHeading: 'Hi Velora hiring team',
  letter: [
    'I’m applying for the Software Engineer role. I live in Hamilton, Ontario, I am legally entitled to work in Canada without sponsorship, and I am available immediately.',
    'The posting is a full-stack role on an AI-native team: own scoped features end to end, direct coding agents in Cursor, review every output, and own quality without a QA handoff. That is already how I work. I use Cursor and other coding agents daily on my own features and I stay accountable for what ships. On DreamStead I built a done-gate (rebase, test rerun, merge-ready check), a merge train, and a tool index (123 merged pull requests as of 12 November 2026). On HomeWorld I built a headless test runner that hard-fails on a false “done,” so a pass has to be a real pass. Portfolio Studio is a shipped React, TypeScript, and Supabase product with GitHub Actions deploys. Shift is a shipped TypeScript game with 83 Vitest test files. I treat tests as part of finishing the work, not as a handoff.',
    'I want to be clear about gaps. I have not spent two to three years as a software engineer on a production nonprofit CRM or fundraising SaaS product. I have not used Kafka, MongoDB, or a feature-flag platform as a job, and I have not been the on-call owner of a high-traffic production service. I would expect to learn Velora’s products, data model, and production practices on the team.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMSTEAD,
  other: [PORTFOLIO_STUDIO, SHIFT, HOMEWORLD_TOOLS, TETHER, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/velora.pdf',
  resumeBlurb: 'One-page résumé tailored for the Velora Software Engineer role.',
}

export const SUPERBAR_PITCH: Pitch = {
  slug: 'admin',
  key: 'superbar',
  company: 'Superbar',
  role: 'AI Software Engineer (Entry Level) — remote, Toronto / GTA hiring',
  headline: 'AI software engineer — agents, tools, and checks',
  lede: 'A page made for Superbar’s entry-level AI Software Engineer role: the agent harness I already run, and the résumé.',
  letterHeading: 'Hi Superbar hiring team',
  letter: [
    'I’m applying for the AI Software Engineer (Entry Level) role. I live in Hamilton, Ontario, I am legally authorized to work in Canada without sponsorship, and I am available immediately. I need to be clear about location. Your posting says the role is fully remote with Toronto / GTA hiring, and that it is not a fit if the candidate lives outside Toronto and the GTA. Hamilton is in the Greater Toronto and Hamilton Area, but it is not inside the official GTA (the City of Toronto and the regional municipalities of Peel, York, Durham, and Halton). I can attend occasional meetups in the Toronto area. If Hamilton is outside the area you can hire from, please say so and I will not take further time.',
    'The posting is about building agents, internal AI tools, model integrations, rapid prototypes, and engineering tooling, reporting to the CTO, in TypeScript, APIs, and LLMs. That is close to how I already work. I use Cursor and other coding agents every day and I review their output. On DreamStead I built a solo-dev agent harness with a done-gate, a merge train, auto-resume, and a tool index (123 merged pull requests as of 12 November 2026). On HomeWorld I built a JSON automation bridge and a headless test runner that hard-fails on a false “done.” I ship public TypeScript projects: Portfolio Studio (React, Vite, Supabase) and Shift (Phaser 3, 83 Vitest test files).',
    'I want to be clear about gaps. I have not built production e-commerce answer-agents or outbound sales tooling as a job, and I have not worked on a small startup team in this exact setting. I would expect to learn Superbar’s product and internal rails quickly, and I already live in the habit of wiring things together and then checking that they actually work.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMSTEAD,
  other: [HOMEWORLD_TOOLS, PORTFOLIO_STUDIO, SHIFT, TETHER, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/superbar.pdf',
  resumeBlurb: 'One-page résumé tailored for the Superbar AI Software Engineer (Entry Level) role.',
}

export const DISTANTJOB_PITCH: Pitch = {
  slug: 'admin',
  key: 'distantjob',
  company: 'DistantJob',
  role: 'Applied AI Engineer — remote, client learning-technology company',
  headline: 'Applied AI engineer — agents, tools, and hard-fail checks',
  lede: 'A page made for DistantJob’s Applied AI Engineer role: the agent-verification work I already do, and the résumé.',
  letterHeading: 'Hi DistantJob hiring team',
  letter: [
    'I’m applying for the Applied AI Engineer role. I live in Hamilton, Ontario, I am legally authorized to work in Canada without sponsorship, and I am available immediately. The posting describes a fully remote, long-term role and does not list eligible countries. If you cannot place a candidate who lives and works in Canada, please say so and I will not take further time.',
    'You’re hiring someone who can turn scenario specs into reliable AI behavior, define how models connect to tools and data, and prove that behavior with tests — including when the system should say no, or hand off to a human. The closest work I can show is the agent-verification tooling I already run. On DreamStead I built a done-gate, a merge train, auto-resume, and a tool index (123 merged pull requests as of 12 November 2026), with human approval on a phone app (Tether) for declared actions. On HomeWorld I built a JSON `{command, args}` automation bridge with structured results, and a headless test runner that hard-fails on a false “done,” each failure mode covered by a regression test. I write Python and TypeScript, I keep this work under Git, and I use coding agents by default while reviewing their output.',
    'I want to be clear about gaps. I have not built production learner-facing simulations, assessment engines, or accreditation-controlled coaching products. I have not done formal RAG design (chunking, hybrid search, reranking, citation grounding), LLM-as-judge evaluation calibrated against human raters, or LLM-security work (prompt injection, jailbreaks, tool-action guardrails) as a job. I would expect to learn your client’s product, rubrics, and compliance controls on the team. I am not claiming expert-level depth in every skill on the posting.',
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMSTEAD,
  other: [HOMEWORLD_TOOLS, TETHER, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/distantjob.pdf',
  resumeBlurb: 'One-page résumé tailored for the DistantJob Applied AI Engineer role.',
}
