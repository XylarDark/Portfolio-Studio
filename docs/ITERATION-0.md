# Iteration 0 — audit this first

**Goal:** Smallest clear slice of the FPBP wedge for creatives & entrepreneurs.  
**Rule:** Ship/design simple → Luke audits → only then expand.

---

## What this iteration is

A **filtered one-card swipe** for jobs/projects — not a social feed — with two pace limits:

1. **Timed:** short wait between cards + a daily swipe budget  
2. **Interactive:** after a few swipes, do one small meaningful action to continue  

Portfolio (`/u/:slug`) already exists; this iteration only defines the **Find work** loop.

---

## User flow (minimum)

1. Set 2–3 filters (e.g. type: job/gig/project, craft, remote/on-site)  
2. Get a **small finite deck** (e.g. up to 10 cards this iteration — not 25 yet)  
3. See **one card**  
4. Interested or Pass  
5. **~4s cooldown** before next card  
6. Every **5 swipes** (half of later “every 10”): unlock via **one** action — update portfolio blurb *or* tweak a filter  
7. Deck empty or daily budget done → stop (no infinite load)

---

## Numbers for Iteration 0 (deliberately small)

| Knob | Iteration 0 | Later (if audit OK) |
|------|-------------|---------------------|
| Deck size | 10 | ~25 |
| Daily budget | 15 | ~25 |
| Cooldown | 4s | tune |
| Interactive every | 5 swipes | ~10 |
| Unlock options | 2 only (portfolio pulse / filter tweak) | add reflect |

---

## Explicitly out of Iteration 0

- Infinite scroll / social feed  
- Auto-apply  
- Employer posting UI  
- Skills paths  
- Founder matching  
- Real jobs API (mocks only)  
- Fancy energy-bar metaphors (simple counters are enough)

---

## Success for this audit

Luke can say yes/no to:

- [ ] Filtered deck, not feed  
- [ ] Timed + interactive limiters as the pace model  
- [ ] These Iteration 0 numbers (or change them)  
- [x] Implemented on `feat/fpbp-swipe-wedge` for live audit (`npm run dev` → `/swipe`)

---

## Next after audit

If approved → Cursor Agent implements Iteration 0 only on `feat/fpbp-swipe-wedge` (or a clean follow-up).  
If changes → revise this page, still keep it one iteration.
