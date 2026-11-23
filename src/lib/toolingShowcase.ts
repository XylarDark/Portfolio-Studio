import type { PitchShowcase } from './pitches'

/**
 * Generic HomeWorld tooling showcase (not employer-specific).
 * Results-only write-up for HomeWorld; do not add claims or internal filenames here.
 */
export const HOMEWORLD_TOOLING_SHOWCASE: PitchShowcase = {
  id: 'tools',
  navLabel: 'Tools',
  title: 'Tools & pipeline work',
  intro: [
    'HomeWorld, my private Unreal Engine 5.8 / C++ game (in development since February 2026), has editor tooling, build automation, and a Blender greybox pipeline. The repository is private; a walkthrough is available on request.',
    'How I work: I design each tool, write the rules it enforces, and review and test every change. A script or agent saying “done” is not evidence, so each tool checks real state and reports a verdict a person can trust.',
    'Status key: Built means it is in the repo, has tests, and has been run. In progress means it is built but has not passed end to end yet. Designed means there is a written spec, and the implementation is partial.',
  ],
  items: [
    {
      title: 'Asset validation on save',
      badge: 'Built',
      badgeTone: 'built',
      status: 'Built. Validators run in the editor on save and as a commandlet, with host-side tests around the rules.',
      problem:
        'Bad assets could enter the project quietly — wrong names, broken material slots, oversized textures, or unowned maps — and were often found late, by hand.',
      built: [
        {
          list: [
            'Editor validators run on save and through Unreal’s asset-validation commandlet, so naming, missing references, and oversized textures are caught before they spread.',
            'Each rule reports a clear pass or fail a person can review, rather than failing silently.',
          ],
        },
      ],
      tech: 'Unreal Data Validation, Python editor scripting, pytest.',
    },
    {
      title: 'A headless test runner that will not take a false “done”',
      badge: 'Built',
      badgeTone: 'built',
      status: 'Built. The runner has regression tests and is the project’s standard way to run Unreal tests from the command line.',
      problem:
        'A test run can look green when it never actually ran the tests, used the wrong engine, or reported a stale result.',
      built: [
        {
          list: [
            'The runner refuses a pass unless it ran the tests on the right engine and an up-to-date build.',
            'A build wrapper queues work so two runs cannot collide, and it reports a single, reviewable verdict.',
          ],
        },
      ],
      tech: 'Unreal automation tests, Python/PowerShell host runners, regression fixtures.',
    },
    {
      title: 'Data-driven placement with undo and a metrics gate',
      badge: 'Built',
      badgeTone: 'built',
      status: 'Built. Placement can be validated first, undone in one step, and measured against a written spec.',
      problem:
        'Placing greybox volumes and props by hand made it easy to drift from the written layout and hard to undo a bad pass.',
      built: [
        {
          list: [
            'Placement is checked against a written spec before it is committed, and a bad pass can be undone in one step.',
            'A metrics gate measures placed volumes against the spec so a layout is not treated as done on appearance alone.',
          ],
        },
      ],
      tech: 'Editor utilities, undoable transactions, spec-driven checks.',
    },
    {
      title: 'Measuring greybox meshes against a written spec',
      badge: 'Built',
      badgeTone: 'built',
      status: 'Built. A read-only measurer can be run from Blender and reports each volume against the spec.',
      problem:
        'Greybox meshes could look finished in the viewport while their size, origin, or naming no longer matched the layout document.',
      built: [
        {
          list: [
            'A read-only reader measures each specced volume in the live scene and checks it against the written spec.',
            'Results are reported as a structured verdict a person can review, without overwriting authored geometry.',
          ],
        },
      ],
      tech: 'Blender Python, written layout specs, structured reports.',
    },
  ],
}
