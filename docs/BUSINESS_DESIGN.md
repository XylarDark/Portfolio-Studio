# For People, By People — Business Design

> Living product/business design.  
> Tagline / brand: **For People, By People**  
> Related codebase today: Portfolio Studio (`/workspace/Portfolio-Studio`) is an early slice of the **portfolio** pillar.

---

## 1. Overview

| | |
|---|---|
| **Name** | For People, By People |
| **One-liner** | For creatives and entrepreneurs: show your work, swipe into jobs & projects, level up, and find people to build with — so studios and startups can hire craft talent fast. |
| **Essence** | Get people employed ASAP · help businesses hire ASAP · help people level up · connect entrepreneurs with people. |
| **Core systems** | (1) Portfolio management (2) Entrepreneur incubation (3) Job openings advertised to seekers (API-fed listings) |
| **Signature UX idea** | Filtered Tinder-like swipe for jobs / projects — **not** an infinite social feed; rate-limited (interactive + timed) |

### Problem
Creatives and early founders live in a fragmented stack: Behance/Dribbble for proof, Indeed/LinkedIn for jobs that ignore craft, Skillshare/Coursera for skills, and Discord/Indie Hackers for finding people. Nothing connects **portfolio → opportunity → collaboration** at swipe speed.

### Solution (intended)
A hub **for creatives and entrepreneurs** that orchestrates those journeys — media portfolio as identity, API-fed jobs/projects biased to craft and early-stage work, light skills routing, and founder↔people matching — without owning the world’s job inventory or becoming a selective accelerator.

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
- **Not** an infinite social-style swipe/scroll feed — filtered decks with intentional pace

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

Specialize for **creatives** and **entrepreneurs** (not general mass-market job seekers).

| Persona | Who (examples) | What they need on FPBP | Why this differentiates |
|---------|----------------|------------------------|-------------------------|
| **Creatives** | Designers, filmmakers, photographers, illustrators, writers, musicians, 3D/game artists, creative technologists | Portfolio-first identity; gigs/roles that respect craft; media-rich proof | Behance/Dribbble don’t hire fast; Indeed doesn’t showcase work |
| **Entrepreneurs** | Solo founders, creative studio owners, indie makers, early startup teams | Show what’s building; find collaborators / early craft talent / project partners | YC is exclusive; LinkedIn is noisy; Indie Hackers isn’t a hiring loop |

### Overlap (the sweet spot)
Many users are **both**: a designer founding a studio, a filmmaker launching a brand, a maker hiring their first collaborator. FPBP should feel natural when someone switches modes (seek work ↔ post a project ↔ grow skills) without changing products.

### Employer / buyer ICP (who pays later)
- Creative studios and agencies needing freelancers or juniors who can *show* work
- Early startups hiring first designer / content / brand / product craft roles
- Founders seeking collaborators (equity/project) more than posting 500 warehouse jobs

### Still out of scope for v1
- Competing as a general-purpose job board for every industry
- Enterprise ATS replacement

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

Status: **Iteration 0 implementing** on `feat/fpbp-swipe-wedge` — filtered deck, pace limits, mocks only. Audit via [`docs/ITERATION-0.md`](./ITERATION-0.md).

---

## 10. Near-term roadmap
1. ~~Lock positioning / first wedge + creatives/entrepreneurs personas~~ **done**  
2. Finish Iteration 0 Find work loop (Cursor) — see [`ITERATION-0.md`](./ITERATION-0.md)  
3. Wire optional real jobs API via env (filter/bias to creative + startup sources) — **after** Iteration 0 audit  
4. Employer / founder “post a role or project” thin slice (studio + startup ICP)  
5. Skills: curated links → Skillshare / Coursera creative paths (no course hosting)  
6. Founder↔creative matching: swipe on projects/people  

---


## 11. Journeys (creatives & entrepreneurs)

### Creative seeker
1. Land → see elegant portfolio examples  
2. Create / claim media portfolio (proof first)  
3. Swipe **Find work** — craft roles, studio gigs, freelance briefs  
4. Save interested → apply via source link (deep-link)  
5. Later: skill gap hints from saved roles → curated courses → portfolio updates  

### Entrepreneur / studio founder
1. Portfolio shows the venture or studio body of work  
2. Post or swipe for **people & projects** (collaborators, first hire, co-maker)  
3. Review interested creatives via their portfolios (not résumés alone)  
4. Later: light incubation prompts (milestones, intros) — not a YC clone  

### Hiring studio / startup (buyer)
1. Advertise a craft role or project brief to FPBP audience  
2. Receive interest from people with real work attached  
3. Metric: time-to-first-qualified-interest, not impressions  

---

## 12. Opportunity taxonomy (what appears in swipe)

Prefer these categories in feeds and mocks:

| Type | Examples | Persona pull |
|------|----------|--------------|
| Craft employment | Product designer, motion, brand, content, creative producer | Creatives |
| Studio / freelance gigs | Short briefs, retainer creative, shoot days | Creatives |
| Project collabs | “Need a designer co-founder”, game jam, album art | Both |
| Early-stage startup roles | First designer, founding content, creative eng | Both |
| Entrepreneur asks | Looking for technical co-maker, studio partner | Entrepreneurs |

**Deprioritize / exclude from default feed:** generic high-volume non-craft roles (unless user opts into “broader jobs”).

---

## 13. Positioning & messaging

### Positioning statement
For **creatives and entrepreneurs** who are tired of juggling portfolio sites and soul-crushing job boards, **For People, By People** is the place where your work is your identity and opportunities (jobs, gigs, projects, people) show up at swipe speed — without pretending to be Indeed or Y Combinator.

### Message pillars
1. **Your work first** — portfolio is the profile  
2. **Decide fast** — swipe jobs *and* projects  
3. **Build with people** — founders and creatives in one loop  
4. **We don’t own the ocean** — we orchestrate; apply where the job lives  

### Names (open)
- Brand: For People, By People  
- Current codebase: Portfolio Studio (portfolio pillar)  
- Consider: keep Portfolio Studio as the portfolio product name under the FPBP brand, or converge naming later  

---

## 14. Design refinement log

| Date | Decision |
|------|----------|
| 2026-09-06 | First wedge = portfolio + API-fed swipe jobs |
| 2026-09-06 | Primary personas = creatives + entrepreneurs |
| 2026-09-06 | Pause Cursor Agent coding; refine business design |
| 2026-09-06 | Journeys, taxonomy, messaging added (this section) |
| 2026-09-06 | Swipe = filtered deck + timed + interactive rate limiters (not social feed) |
| 2026-09-06 | Process: start with simple iteration for Luke audit — see [`ITERATION-0.md`](./ITERATION-0.md) |

### Open decisions for Luke
1. Default feed: craft-only vs craft-first with optional “broader”?  
2. Should entrepreneurs post **projects** before we support classic job ads?  
3. Geographic focus (local / remote-first / global) for v1?  
4. Monetize employers first or seekers first?  

---

## 15. Swipe interaction model — **LOCKED direction** (2026-09-06)

### Anti-pattern (explicitly rejected)
This is **not** a social media feed. No infinite scroll, no endless card stack for dopamine browsing, no “keep scrolling for more.”

### Pattern (intended)
1. User sets **filters** (role/craft, location/remote, type: job vs gig vs project, seniority, etc.)
2. System builds a **finite deck** matching those filters (API-fed + ranked)
3. User **swipes one card at a time** through that deck
4. **Rate limits** slow the loop so each decision is intentional
5. When the deck is done (or daily allowance is spent): pause, refine filters, or come back later — don’t auto-load infinite more

### Why limiters
- Protects seekers from burnout / mindless left-swiping
- Protects employers from low-quality spray interest
- Reinforces brand: *for people, by people* — human pace, not slot-machine jobs
- Differentiates from Sorce-style high-volume swipe+auto-apply

---

### A. Timed limiter (clock / recharge)
**Idea:** You only get a certain number of swipes (or “decisions”) per time window; after that, the deck locks until recharge.

| Option | Mechanic | Pros | Cons |
|--------|----------|------|------|
| **Daily allowance** | e.g. 20–40 intentional swipes / day | Simple to understand | Feels gamey if too low |
| **Cooldown between swipes** | e.g. 3–8s before next card unlocks | Forces a breath on every card | Can feel laggy if too long |
| **Session energy** | Energy bar drains per swipe; refills over hours | Visible pacing | Needs clear UI metaphor |
| **Hybrid (proposed default)** | Small daily allowance **plus** short inter-swipe cooldown | Stops both spray and rush | Two concepts to teach |

**Proposed default (for design lock later):**
- **Daily allowance:** ~25 swipes/day (interested + pass both count)
- **Inter-swipe cooldown:** ~4 seconds before the next card can be acted on
- Interested/pass still instant to *commit*; cooldown gates *the next* card reveal

---

### B. Interactive limiter (do something meaningful to continue)
**Idea:** After N swipes (or when timed energy is empty), unlock more capacity only by a short intentional action — not watching an ad.

| Option | Mechanic | Fits creatives/entrepreneurs? |
|--------|----------|-------------------------------|
| **Portfolio pulse** | Add/update one portfolio item or caption before more swipes | Strong — reinforces work-first identity |
| **Filter refine** | Tighten or rethink filters (“what are you actually looking for?”) | Strong — keeps deck quality high |
| **Reflect prompt** | One-line: why did you pass the last 5? / what must a yes have? | Medium — thoughtful, optional skip later |
| **Show your ask** | Entrepreneurs: clarify project brief; creatives: clarify role seek | Strong for dual persona |
| **Match quality gate** | Review 1 saved “interested” and confirm still yes | Medium — reduces regret saves |

**Proposed default (for design lock later):**
- After every **10 swipes**, require one **interactive unlock**:
  1. Prefer **Portfolio pulse** if portfolio is thin  
  2. Else **Filter refine** or **Reflect prompt** (rotate lightly)  
- After **daily allowance** exhausted: only **timed recharge** (next day / hours) — interactive unlocks cannot bypass the daily cap (prevents grinding)

---

### C. Combined loop (how it feels)
```
Set filters → Get finite deck (e.g. up to 25)
  → Card shown
  → Decide (interested / pass)   [immediate]
  → Cooldown 4s + optional microcopy on the card’s craft fit
  → Next card
  → Every 10: interactive unlock (portfolio / filters / reflect)
  → Daily cap hit: “Come back when you’ve rested — or improve your portfolio”
```

### D. Product implications
- UI: progress “deck remaining” + “swipes left today” + cooldown ring — never an infinite scrollbar
- Analytics: decisions/hour capped; optimize for **interested→apply** quality, not swipe count
- Anti-abuse: interested spam still rate-limited; employers see fewer but better signals
- Copy: never “keep scrolling”; use “your filtered matches” / “today’s intentional deck”

### E. Open tweakables (not blocking design direction)
- Exact numbers (25/day, 4s, every 10) — tune in prototype
- Whether “interested” costs more than “pass” (e.g. interested = 2 energy)
- Soft vs hard lock on cooldown (can queue but not reveal)

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

## Appendix C — Persona lock (Luke, 2026-09-06)
Specialize the app for **creatives and entrepreneurs** as the differentiating factor. Confirmed; business design refined accordingly. Coding paused in favor of design refinement.
