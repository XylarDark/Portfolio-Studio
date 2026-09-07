# First wedge — Portfolio + Swipe jobs

**Brand:** For People, By People  
**Status:** Implementing **Iteration 0** on `feat/fpbp-swipe-wedge` — see [`ITERATION-0.md`](./ITERATION-0.md)  
**Codebase:** Portfolio Studio

## Scope (Iteration 0 only)

| In | Out |
|----|-----|
| Existing portfolio (`/u/:slug`, studio, invites) | Employer posting |
| Filtered one-card swipe at `/swipe` (`/find-work`) | Skills / leveling |
| Finite deck ≤10, daily budget 15, ~4s cooldown | Founder matching |
| Unlock every 5: portfolio pulse **or** filter tweak | Real jobs API / scrapers |
| Mocks biased to creatives & entrepreneurs | Auto-apply / infinite feed |

## Routes

| Path | Purpose |
|------|---------|
| `/swipe` | Iteration 0 Find work loop |
| `/find-work` | Alias |
| `/u/:slug` | Unchanged public portfolio |

Entry points: landing (“Find work” / “Swipe jobs”), portfolio header (“Find work”).

## Data

- `JobListing` + filters (`kind`, `craft`, `remote`) in `src/lib/types.ts`
- Mocks: `src/data/jobs.ts`
- `fetchJobs()` / `buildDeck()` in `src/lib/jobs.ts` — **mocks only**
- localStorage: interested IDs, daily swipe count, portfolio pulse

## Non-goals

Do not expand into incubation, skills routing, employer posting, or live APIs in this slice.
