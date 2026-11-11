import type { Pitch } from './pitches'
import { WORK_HISTORY } from './pitchWork'
import { HOMEWORLD_TOOLING_SHOWCASE } from './toolingShowcase'

/**
 * Airship — Programmer (Unreal 5 Tools freelance pool).
 * `showcase` mirrors tooling_showcase.md verbatim; don't add claims here.
 */
export const AIRSHIP_PITCH: Pitch = {
  "slug": "admin",
  "key": "airship",
  "company": "Airship",
  "role": "Programmer — Unreal 5 Tools freelance pool",
  "headline": "Unreal 5 tools & pipeline programmer",
  "lede": "A page made for Airship’s Unreal 5 Tools Programmer freelance pool: six tooling items from HomeWorld, each with its status, plus the résumé.",
  "letterHeading": "Hi Airship team",
  "letter": [
    "I’m applying to join your Unreal 5 tools programming freelance pool.",
    "Since February I’ve built the tooling behind HomeWorld, my solo UE 5.8 / C++ project. A few examples:",
    {
      "list": [
        "Python validators in Epic’s Data Validation plugin that check naming, missing references, texture limits, and map ownership on save.",
        "A headless test runner that won’t report a pass unless it actually ran the tests on the right engine and an up-to-date build.",
        "Undoable, schema-checked placement scripts with a metrics gate.",
        "A Blender greybox pipeline that measures meshes against their specs without overwriting authored work."
      ]
    },
    "I design each tool and its rules, and I direct and review AI-assisted implementation behind tests. I read your page on governed AI, and I’d only use AI on client work if the client had approved it in writing.",
    "A write-up of each tool is below. The HomeWorld repo is private, and I’m happy to share code or screen-share a walkthrough. I’m remote in Hamilton, Canada, on Eastern Time, comfortable working across time zones, and available for freelance work."
  ],
  "signoff": "Thanks for your time — Luke Thompson",
  "primaryCta": {
    "label": "See the tools",
    "href": "#tools"
  },
  "featured": {
    "title": "HomeWorld — Unreal Engine 5.8 / C++ game",
    "meta": "Feb 2026 – present · Independent (solo) · UE 5.8, C++, Python",
    "summary": "Unreal Engine 5.8 editor tooling, build automation, and a Blender greybox pipeline, built for my solo UE 5.8 / C++ project — a third-person ARPG survival and family-sim.",
    "bullets": [
      "Asset validation on save, a headless test runner that refuses false greens, undoable data-driven placement with a metrics gate, a Blender greybox pipeline, and an editor automation bridge with C++ commandlets.",
      "Backed by 42 C++ automation test files and 150+ Python test files for the tooling."
    ],
    "note": "Private repository — code walkthrough available on request."
  },
  "other": [
    {
      "title": "Shift — playable shop & delivery game",
      "meta": "Aug – Sep 2026 · Independent · Phaser 3, TypeScript, Vite",
      "summary": "Shipped a browser/PWA game loop: fixed 60 Hz simulation, render interpolation, cached A* routing, and a tiered render budget for phones.",
      "links": [
        {
          "label": "Play Shift",
          "href": "https://xylardark.github.io/ShiftGame/"
        },
        {
          "label": "Source on GitHub",
          "href": "https://github.com/XylarDark/ShiftGame"
        }
      ]
    },
    {
      "title": "Portfolio Studio",
      "meta": "Sep 2026 – present · React, TypeScript, Vite, Supabase",
      "summary": "This site: a public media-résumé product with Studio editing, embeddable work cards, and per-employer pages like this one.",
      "links": [
        {
          "label": "Live site",
          "href": "https://xylardark.github.io/Portfolio-Studio/"
        },
        {
          "label": "Source on GitHub",
          "href": "https://github.com/XylarDark/Portfolio-Studio"
        }
      ]
    },
    ...WORK_HISTORY,
  ],
  "resumePath": "/resumes/airship.pdf",
  "resumeBlurb": "One-page résumé tailored for the Airship Unreal 5 Tools Programmer pool.",
  showcase: HOMEWORLD_TOOLING_SHOWCASE,
}
