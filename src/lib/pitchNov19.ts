import type { Pitch } from './pitches'
import { EVENICA, OUTFUSION, TRUCKSAIL } from './pitchWork'
import { DREAMFLOW_PROJECT } from './publicPortfolio'
import { HOMEWORLD_TOOLS, PORTFOLIO_STUDIO, SHIFT, TOOLS_WRITEUP } from './pitchNov18'

/**
 * Pitch pages for the Nov 19, 2026 job packs (BCMR Group, SOTI DevOps, Euna,
 * Clera, SOTI SDET, Accuro/QHR). DreamStead’s DreamFlow leads every page.
 * Copy mirrors /workspace/apply_nov19/<slug>/cover_letter.md and resume_<slug>.md;
 * don't add claims here.
 */

export const BCMR_PITCH: Pitch = {
  slug: 'admin',
  key: "bcmr",
  company: "BCMR Group",
  role: "Junior AI Engineer — remote, Ontario",
  headline: 'Tools Engineer (AI & Games)',
  lede: "A page made for BCMR Group’s Junior AI Engineer role: the agent harness I build, and the résumé.",
  letterHeading: "Hi BCMR team",
  letter: [
    "I’m applying for the Junior AI Engineer role. I live in Hamilton, Ontario, I am legally authorized to work in Canada without sponsorship, and I am available immediately for remote work.",
    "The agent I’d point you to is DreamStead’s DreamFlow, a harness I have built since 15 November 2026 that turns a queued idea into a small, tested pull request. If I started over, I’d build the proof gate before the parallel lanes. My earlier harness, DreamStead, started with parallel agent lanes on a five-minute tick, and I rebuilt it as DreamFlow around frozen tests and the merge gate.",
    "Your posting splits the work the way I already work: the owner sets the architecture and prompts, and the builder turns specifications into agents people use every day. I have not built in Copilot Studio or Power Automate, and I have not wired agents into SharePoint, Planner, or Microsoft Graph. I’d expect to learn that stack quickly on your architecture.",
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMFLOW_PROJECT,
  other: [HOMEWORLD_TOOLS, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/bcmr.pdf',
  resumeBlurb: "One-page résumé tailored for the BCMR Group Junior AI Engineer role, led by DreamStead’s DreamFlow.",
}

export const SOTI_DEVOPS_PITCH: Pitch = {
  slug: 'admin',
  key: "soti_devops",
  company: "SOTI",
  role: "Software Developer (DevOps) — hybrid, Mississauga (Mon/Wed/Fri)",
  headline: 'Tools Engineer (AI & Games)',
  lede: "A page made for SOTI’s Software Developer (DevOps) role: the CI gates and build tooling I run, and the résumé.",
  letterHeading: "Hi SOTI hiring team",
  letter: [
    "I’m applying for the Software Developer (DevOps) role. I live in Hamilton, Ontario, I am legally authorized to work in Canada without sponsorship, I am available immediately, and I can be in the Meadowvale office Monday, Wednesday, and Friday.",
    "The posting is about tools and automation that make CI/CD faster and more reliable for developers. My most relevant work is DreamStead’s DreamFlow, a test-first agentic dev harness I have built since 15 November 2026. On HomeWorld, an Unreal Engine 5.8 / C++ project, I built a headless test runner that hard-fails on fake passes and a build wrapper with one machine-wide queue. I’ve written C# professionally at Evenica and OutFusion.",
    "My gaps for this posting: I have not used Jenkins, Angular, PowerShell or Groovy, Docker or Kubernetes, or Artifactory, SonarQube, Packer, or Chef as a job, and I have not run cloud infrastructure in production. I’d expect to learn SOTI’s pipeline stack on the team.",
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMFLOW_PROJECT,
  other: [HOMEWORLD_TOOLS, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/soti_devops.pdf',
  resumeBlurb: "One-page résumé tailored for the SOTI Software Developer (DevOps) role, led by DreamStead’s DreamFlow.",
}

export const EUNA_PITCH: Pitch = {
  slug: 'admin',
  key: "euna",
  company: "Euna Solutions",
  role: "DevOps Developer, Euna Grants — hybrid, Oakville (3 days)",
  headline: 'Tools Engineer (AI & Games)',
  lede: "A page made for Euna’s DevOps Developer role: the pipelines and merge gates I run with AI coding agents, and the résumé.",
  letterHeading: "Hi Euna hiring team",
  letter: [
    "I’m applying for the DevOps Developer role on Euna Grants. I live in Hamilton, Ontario, I am legally authorized to work in Canada without sponsorship, I am available immediately, and I can be in the Oakville office three days a week.",
    "You’re looking for someone who runs CI/CD pipelines, handles branching and merge conflicts, and is curious about applying AI tooling to delivery. My most relevant work is DreamStead’s DreamFlow, a test-first agentic dev harness I have built since 15 November 2026. Earlier I wrote T-SQL and C# at Evenica and optimized SQL and maintained GitHub workflows at TruckSail.",
    "My gaps for this posting: I do not have three years of Azure or Azure DevOps, I have not worked in SAFe, and I have not used Ansible, Vagrant, or VirtualBox as a job. I’d expect to learn Euna’s Azure pipelines quickly.",
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMFLOW_PROJECT,
  other: [HOMEWORLD_TOOLS, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/euna.pdf',
  resumeBlurb: "One-page résumé tailored for the Euna Solutions DevOps Developer, Euna Grants role, led by DreamStead’s DreamFlow.",
}

export const CLERA_PITCH: Pitch = {
  slug: 'admin',
  key: "clera",
  company: "Clera",
  role: "Expert Talent Pool, Agents and Reinforcement Learning (Associate) — remote",
  headline: 'Tools Engineer (AI & Games)',
  lede: "A page made for Clera’s Agents and RL talent pool: the agent tasks, checks, and traces I already build, and the résumé.",
  letterHeading: "Hi Clera team",
  letter: [
    "I’m applying to the Agents and Reinforcement Learning talent pool. I live in Hamilton, Ontario, Canada, I am legally authorized to work in Canada, and I am available immediately for remote project work.",
    "The work you describe, writing tasks, connecting tools, verifying agent actions, and debugging failed trajectories, is what I do every day on DreamStead’s DreamFlow, a test-first agentic dev harness I have built since 15 November 2026.",
    "My gaps: I have not built Gymnasium-style RL environments, I have not used Docker, Playwright, or Selenium as a job, and I have not modelled ERP or CRM workflows. My Python and test-writing are strong, and I’d pick those up on a project.",
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMFLOW_PROJECT,
  other: [HOMEWORLD_TOOLS, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/clera.pdf',
  resumeBlurb: "One-page résumé tailored for the Clera Expert Talent Pool, Agents and Reinforcement Learning (Associate) role, led by DreamStead’s DreamFlow.",
}

export const SOTI_SDET_PITCH: Pitch = {
  slug: 'admin',
  key: "soti_sdet",
  company: "SOTI",
  role: "Software Developer in Test — hybrid, Mississauga",
  headline: 'Tools Engineer (AI & Games)',
  lede: "A page made for SOTI’s Software Developer in Test role: the test gates and automation I build, and the résumé.",
  letterHeading: "Hi SOTI hiring team",
  letter: [
    "I’m applying for the Software Developer in Test role. I live in Hamilton, Ontario, I am legally authorized to work in Canada without sponsorship, I am available immediately, and I can commute to the Mississauga office on your hybrid schedule.",
    "My most relevant work is DreamStead’s DreamFlow, a test-first agentic dev harness I have built since 15 November 2026. CI on GitHub Actions runs pytest, ruff, pyright, and gitleaks. On HomeWorld I built a headless test runner that hard-fails on fake passes, with a regression test for each failure mode. I started as a developer and QA tester at Evenica.",
    "My gaps: I have a diploma rather than a bachelor’s degree, and I have not used Selenium, Cypress, Playwright, RestAssured, or Jenkins as a job, or tested in AWS or Azure. I’d expect to learn SOTI’s frameworks on the team.",
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMFLOW_PROJECT,
  other: [HOMEWORLD_TOOLS, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/soti_sdet.pdf',
  resumeBlurb: "One-page résumé tailored for the SOTI Software Developer in Test role, led by DreamStead’s DreamFlow.",
}

export const QHR_PITCH: Pitch = {
  slug: 'admin',
  key: "qhr",
  company: "Accuro (QHR Technologies)",
  role: "Junior QA Specialist — remote, Ontario",
  headline: 'Tools Engineer (AI & Games)',
  lede: "A page made for Accuro’s Junior QA Specialist role: the test-first work I do, and the résumé.",
  letterHeading: "Hi Accuro hiring team",
  letter: [
    "I’m applying for the Junior QA Specialist role. I live in Hamilton, Ontario, I am legally authorized to work in Canada without sponsorship, and I am available immediately.",
    "My most relevant work is DreamStead’s DreamFlow, a test-first agentic dev harness I have built since 15 November 2026. Every change starts with acceptance tests recorded failing and frozen before any code is written, and a merge gate refuses anything that edits a test after it goes red. On HomeWorld I built a headless test runner that hard-fails on fake passes. Before that I was a software developer and QA tester at Evenica, writing T-SQL and testing client software, and I did bug verification and release QA at OutFusion.",
    "My gaps: I have not used Selenium, Cypress, Playwright, Postman, Jira, or AIO Tests as a job, and I have not worked in healthcare software. I’d expect to pick up your tools and Accuro’s domain quickly.",
  ],
  signoff: 'Thanks for your time — Luke Thompson',
  primaryCta: TOOLS_WRITEUP,
  featured: DREAMFLOW_PROJECT,
  other: [HOMEWORLD_TOOLS, PORTFOLIO_STUDIO, SHIFT, OUTFUSION, TRUCKSAIL, EVENICA],
  resumePath: '/resumes/qhr.pdf',
  resumeBlurb: "One-page résumé tailored for the Accuro (QHR Technologies) Junior QA Specialist role, led by DreamStead’s DreamFlow.",
}
