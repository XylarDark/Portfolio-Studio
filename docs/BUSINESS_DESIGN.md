# For People, By People — Business Design

> Living product/business design.  
> Tagline / brand: **For People, By People**  
> Related codebase today: Portfolio Studio (`/workspace/Portfolio-Studio`) is an early slice of the **portfolio** pillar.

---

## 1. Overview

| | |
|---|---|
| **Name** | For People, By People |
| **One-liner** | A place people come to look for jobs, level up skills, or create companies — and where businesses find people fast. |
| **Essence** | Get people employed ASAP · help businesses hire ASAP · help people level up · connect entrepreneurs with people. |
| **Core systems** | (1) Portfolio management (2) Entrepreneur incubation (3) Job openings advertised to seekers (API-fed listings) |
| **Signature UX idea** | Tinder-like swipe for jobs / projects |

### Problem
Job seeking, skill-building, portfolio proof, and founding are split across disconnected products. Speed to “employed / matched / shipping” is slow because people context-switch between boards, course sites, portfolio tools, and founder networks.

### Solution (intended)
One human-centered hub that **orchestrates** those journeys — pulling listings from existing APIs (e.g. Indeed and peers), showcasing work, guiding skill gaps, and connecting founders with collaborators — without trying to own every underlying marketplace.

---

## 2. Goals & non-goals

### Goals
- Time-to-employment for seekers (swipe → interest → apply/match)
- Time-to-hire for businesses (post / publish openings → qualified interest)
- Skill leveling tied to real opportunities (learn what the market needs)
- Entrepreneur ↔ people connections (collaborators, early hires, co-founders, customers)
- Portfolio as living proof of work, not a dead PDF

### Non-goals (how we avoid head-on competition)
- **Not** becoming the world’s largest job inventory (Indeed / LinkedIn already win volume)
- **Not** a top-tier equity accelerator (Y Combinator / Techstars own that brand)
- **Not** a full university/credential catalog (Coursera / edX own depth)
- **Not** scraping-as-core-IP if partner APIs / licensed feeds exist
- **Not** fancy UI for its own sake — simple, fast, human

---

## 3. Users & roles

| Role | Needs | Success looks like |
|------|--------|-------------------|
| Job seeker | Fast discovery, low friction decisions, clear next steps | Employed or in serious process quickly |
| Business / hiring | Reach motivated people; filter signal | Filled seats faster with better fits |
| Learner | Skills that map to openings / projects | Visible skill progress + portfolio proof |
| Entrepreneur | People (co-founders, early talent, collaborators) | Matches that unblock building |
| Portfolio creator | Elegant showcase of media / work | Shareable link that converts interest |

---



## 3b. Primary personas — **LOCKED** (2026-09-06)

Specialize the product for **creatives** and **entrepreneurs** (not general mass-market job seekers).

| Persona | What they need on FPBP | Why this differentiates |
|---------|------------------------|-------------------------|
| **Creatives** | Portfolio-first identity, project/gigs/jobs that respect craft, media-rich proof | Behance/Dribbble don’t hire fast; Indeed doesn’t showcase work |
| **Entrepreneurs** | Find collaborators / early talent / project partners; show what they’re building | YC is exclusive; LinkedIn is noisy; Indie Hackers isn’t a hiring loop |

### Implications for the wedge
- Swipe feed bias: creative roles, studio/gigs, project collabs, early-stage startup roles — not generic warehouse/office volume
- Portfolio is the **default identity** (media resume), not an optional CV attach
- “Projects” in swipe = briefs, collabs, founder asks — not only W-2 postings
- Later incubation + skills routing should serve these two personas first

### Still out of scope for v1
- Competing as a general-purpose job board for every industry

## 4. Product pillars

### A. Jobs & hiring (API-fed + swipe)
- Aggregate openings via APIs / licensed feeds (Indeed and peers; prefer normalized jobs APIs over brittle scrapers)
- Businesses can advertise openings to seekers on FPBP
- Swipe UX for jobs **and** projects (yes / no speed)
- Optimize for **speed to employed / speed to hire**, not endless browsing

### B. Portfolio management
- Media-resume / portfolio (images, video, YouTube, external links) — Portfolio Studio direction
- Proof of skills and projects that hiring + founding flows can reference

### C. Skills / leveling up
- Paths tied to market demand and portfolio outcomes
- Prefer **routing + curation** into best external learning (and light native modules) over rebuilding Coursera

### D. Entrepreneur incubation (lightweight)
- Connect founders with people (talent, collaborators, early community)
- Incubation as **matching + guidance + portfolio of progress**, not a selective cohort accelerator clone

---

## 5. Ecosystem map — examples by idea

### 5.1 Job boards & aggregators (inventory / advertising)
| Player | Role in ecosystem | Inspiration / note |
|--------|-------------------|--------------------|
| [Indeed](https://www.indeed.com) | Dominant volume board + employer ads | Supply of listings; partner carefully |
| [LinkedIn](https://www.linkedin.com) | Professional graph + jobs | Network effects we won’t replicate |
| [ZipRecruiter](https://www.ziprecruiter.com) | Employer-side distribution | Fast employer UX |
| [Glassdoor](https://www.glassdoor.com) | Jobs + company ratings | Trust / culture signal |
| [Wellfound (AngelList)](https://wellfound.com) | Startup jobs | Startup-flavored openings |
| Unified jobs APIs e.g. [JobsPipe](https://jobspipe.dev/jobs-api), [Jobo](https://jobo.world/) | Normalized multi-source feeds | Practical path for “fetch via APIs” |

**Consolidate (most popular to watch):** Indeed, LinkedIn, ZipRecruiter, Glassdoor (+ Wellfound for startups).

### 5.2 Swipe / fast-match job UX
| Player | Role | Inspiration / note |
|--------|------|--------------------|
| [Sorce](https://www.sorce.jobs/download) | Swipe + AI apply; large swipe volume claimed | Closest “Tinder for jobs” reference |
| [Ace](https://aceapp.ai/) | Match + swipe + auto-apply | Speed + matching |
| [Jobloo](https://jobloo.co/) | Swipe + tailored CV + apply | EU / ATS-page apply angle |
| [SwipeApply](https://www.swipeapply.io/) | Swipe → AI applies | Pure swipe-to-apply loop |

**Consolidate:** Sorce, Ace, Jobloo (swipe UX + apply automation). FPBP should **not** only race auto-apply bots — differentiate with portfolio + skills + founder matching in the same loop.

### 5.3 Portfolio management
| Player | Role | Inspiration / note |
|--------|------|--------------------|
| [Behance](https://www.behance.net) | Creative discovery + portfolios | Visibility / community |
| [Dribbble](https://dribbble.com) | Design community + leads | Inbound for designers |
| [Contra](https://contra.com/portfolios) | Freelance portfolio + hire + pay | Portfolio tied to work |
| [Format](https://www.format.com/) / [Pixpa](https://www.pixpa.com/) / [Cargo](https://cargo.site) | Owned portfolio sites | Aesthetic control |
| [Read.cv](https://read.cv) (and peers) | Lightweight professional CV sites | Simple professional presence |

**Consolidate:** Behance/Dribbble (discovery), Contra (work + portfolio), Format/Cargo/Pixpa (owned site beauty). FPBP portfolio = **employability + founder-ready proof**, not only creative social.

### 5.4 Entrepreneur incubation / founder networks
| Player | Role | Inspiration / note |
|--------|------|--------------------|
| [Y Combinator](https://www.ycombinator.com) | Top accelerator + co-founder matching | Brand we don’t fight; learn matching patterns |
| [Techstars](https://www.techstars.com) | Mentorship accelerators | Structured support |
| [Founder Institute](https://fi.co) | Earlier / broader founder programs | Pre-accelerator shape |
| [Indie Hackers](https://www.indiehackers.com) | Bootstrap community | Peer learning, no equity gate |
| On Deck / similar fellowships | Network-first founder communities | People connections over capital |

**Consolidate:** YC/Techstars (prestige accelerators), Indie Hackers (open community). FPBP incubation = **open matching layer** (people ↔ founders), not a 1% acceptance bootcamp.

### 5.5 Skills / leveling up
| Player | Role | Inspiration / note |
|--------|------|--------------------|
| [Coursera](https://www.coursera.org) | Credentials + career certificates | Employer-recognized paths |
| [LinkedIn Learning](https://www.linkedin.com/learning) | Workplace skills + profile | Proximity to jobs graph |
| [Udacity](https://www.udacity.com) | Project Nanodegrees | Portfolio-of-projects learning |
| [Udemy](https://www.udemy.com) / [Skillshare](https://www.skillshare.com) | Practical / creative skills | Breadth vs creative projects |
| Google Career Certificates (via Coursera et al.) | Job-ready credentials | Direct job-market signaling |

**Consolidate:** Coursera + LinkedIn Learning + Udacity. FPBP should **link skill gaps → courses → portfolio proof → swipe matches**, not host the world’s courses.

---

## 6. Where we fit (non-compete positioning)

### Crowded zones (don’t try to win by cloning)
1. **Raw job inventory** — Indeed / LinkedIn  
2. **Swipe + AI auto-apply only** — Sorce / Ace / Jobloo  
3. **Creative social portfolios** — Behance / Dribbble  
4. **Selective accelerators** — YC / Techstars  
5. **Credential catalogs** — Coursera  

### White space / wedge for For People, By People
**Orchestration hub for “get people working”** — one product that connects:

`Portfolio proof → Skill gaps → Swipe jobs/projects (API-fed) → Employer reach → Founder ↔ people matching`

Differentiation principles:
1. **Aggregate, don’t own the ocean** — licensed/API listings; deep-link apply to source when needed  
2. **Swipe as decision UI**, not the whole product — same gesture for jobs *and* projects/collaborations  
3. **Portfolio is the identity layer** — hiring and founding both read the same living work  
4. **Incubation without exclusivity** — matching + light guidance, not equity cohorts  
5. **Speed metrics as north star** — days-to-employed, days-to-filled, matches-made — not ad impressions alone  

### Competitive stance (friendly coexistence)
- **Indeed/LinkedIn:** customers and data partners / traffic sources, not enemies  
- **Swipe apps:** we may look similar on day-1 UX but win on **multi-path outcomes** (job *or* skill *or* company)  
- **Portfolio builders:** we start closer to Portfolio Studio elegance, then wire portfolios into matching  
- **Accelerators:** refer ambitious founders upward; we serve the long tail of people starting  

---

## 7. Monetization (hypotheses — TBD)
- Employer job ads / featured openings  
- Seeker premium (more swipes, insights, apply tools) — careful vs. “pay to get hired” optics  
- Business tools (applicant packs tied to portfolios)  
- Optional incubation services (office hours, matching boosts)  
- Affiliate / referral to learning partners (transparent)

---

## 8. Success metrics
- Median days from signup → employed / contracted  
- Median days from job post → first qualified swipe interest  
- % users who complete a portfolio section  
- Skill-path starts → portfolio updates  
- Founder↔people matches that convert to ongoing collaboration  

---

## 9. Risks & open questions
- API access / ToS for Indeed & peers (prefer official or aggregator APIs; scrapers are fragile/legal risk) — see e.g. JobsPipe notes on Indeed/LinkedIn partner constraints  
- Auto-apply ethics and spam reputation  
- Scope creep across four pillars — ship one loop first  
- Brand: “For People, By People” vs product name Portfolio Studio  
- Which first wedge: **portfolio+jobs swipe**, **skills+jobs**, or **founder matching**?

### Recommended first wedge — **LOCKED** (2026-09-06)
**Portfolio + swipe jobs (API-fed)** for **creatives and entrepreneurs** (primary personas).
Prove speed-to-interest, then add skills routing and founder matching.

Status: **shipped** in Portfolio Studio (`/swipe` + `/find-work`, mock job feed + `fetchJobs()`, existing `/u/:slug` portfolio). See [`docs/WEDGE.md`](./WEDGE.md).

---

## 10. Near-term roadmap
1. ~~Lock positioning / first wedge~~ **done**  
2. ~~Ship swipe jobs UX + mock/API abstraction on Portfolio Studio~~ **done**  
3. Wire optional real jobs API via env (no scrapers)  
4. Employer “post an opening” thin slice  
5. Skills: curated links from gap analysis → Coursera/LinkedIn Learning (no course hosting yet)  
6. Founder matching: lightweight profiles + swipe on projects/people  

---

## Appendix A — Source dump (Luke, 2026-09-06)
- Brand: For People, By People  
- Systems: portfolio management · entrepreneur incubation · businesses advertise jobs to seekers  
- Premise: look for jobs, level up skills, or create companies  
- Listings via APIs (Indeed etc.)  
- Idea: Tinder-like swipe for jobs or projects  
- Essence: employ people fast · businesses find employees fast · level up skills · connect entrepreneurs with people  
- Ask: examples of websites for each idea · consolidate popular inspirations · fit in ecosystem without competing  

## Appendix B — Research notes (2026-09-06)
Web scan used for ecosystem examples (not exhaustive). Key references:
- Jobs aggregation / APIs: [JobsPipe](https://jobspipe.dev/jobs-api), [Jobo](https://jobo.world/), [SilentFlow All Jobs Scraper guide](https://silentflow.dev/blog/all-jobs-scraper-guide/)
- Swipe jobs: [Sorce](https://www.sorce.jobs/articles/swipe-jobs), [Ace](https://aceapp.ai/), [Jobloo](https://jobloo.co/), [SwipeApply](https://www.swipeapply.io/)
- Portfolios: [Contra vs Behance vs Dribbble](https://ruul.io/blog/contra-vs-dribbble-vs-behance), [Behance alternatives 2026](https://framekit.ai/blog/best-behance-alternatives-2026), [Format](https://www.format.com/), [Pixpa](https://www.pixpa.com/)
- Incubation: [HBS incubator vs accelerator](https://online.hbs.edu/blog/post/startup-incubator-vs-accelerator), [Stripe accelerator vs incubator](https://stripe.com/en-sg/resources/more/startup-accelerator-vs-incubator-the-differences-businesses-need-to-know)
- Skills: [Skills Couter 2026 platforms](https://skillscouter.com/best-online-learning-platforms/), [IntelligentHQ learning apps](https://www.intelligenthq.com/best-learning-apps-for-adults/)

