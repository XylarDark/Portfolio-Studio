# First wedge — Portfolio + Swipe jobs

**Brand:** For People, By People  
**Status:** Shipped on `feat/fpbp-swipe-wedge` (2026-09-06)  
**Codebase:** Portfolio Studio

## Scope (ship)

| In | Out (later) |
|----|-------------|
| Existing portfolio flows (`/u/:slug`, studio, invites) | Employer job posting UI |
| Swipe jobs UX at `/swipe` (alias `/find-work`) | Skills / leveling paths |
| `JobListing` + `fetchJobs()` with mock data by default | Founder / incubation matching |
| Session “Interested” list via `localStorage` | Scrapers or brittle HTML harvest |
| Optional `VITE_JOBS_API_URL` for a future JSON feed | Auto-apply bots |

## Routes

| Path | Purpose |
|------|---------|
| `/swipe` | Mobile-friendly card swipe for openings |
| `/find-work` | Same page (friendly alias) |
| `/u/:slug` | Unchanged public portfolio |

Entry points: landing nav / CTA (“Find work” / “Swipe jobs”), portfolio header (“Find work”).

## Job data layer

- Type: `JobListing` in `src/lib/types.ts`
- Mocks: `src/data/jobs.ts` (16 realistic listings)
- Fetch: `src/lib/jobs.ts` → `fetchJobs()`
  - Default: return mocks
  - If `VITE_JOBS_API_URL` is set: `GET` that URL, expect `JobListing[]` or `{ jobs: JobListing[] }`, fall back to mocks on error
- Interested IDs: `localStorage` key `fpbp.interestedJobs`

## UX notes

- Swipe / drag right or **Interested** = save + advance
- Swipe / drag left or **Pass** = advance
- Card shows title, company, location + remote, blurb, source label, external apply URL
- After the deck: reshuffle or clear interested; saved list links out to apply

## Non-goals for this wedge

Do not expand into incubation, skills routing, or employer posting in this slice. Keep the CSS simple and aligned with Portfolio Studio.

## Personas (locked)
Primary: **creatives** and **entrepreneurs**. Swipe feed and copy should bias to craft roles, gigs, project collabs, and early-stage founding — not mass-market general jobs.
