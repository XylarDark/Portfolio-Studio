import type { PitchShowcase } from './pitches'

/**
 * Generic HomeWorld tooling showcase (not employer-specific).
 * Generic tooling write-up for HomeWorld; do not add claims here.
 */
export const HOMEWORLD_TOOLING_SHOWCASE: PitchShowcase = {
  "id": "tools",
  "navLabel": "Tools",
  "title": "Tools & pipeline work",
  "intro": [
    "Two strands of tooling. **DreamEngine** is the automation harness I built to run my solo work: one person steers, parallel agent lanes build, and a five-minute tick keeps the loop moving. **HomeWorld**, my solo Unreal Engine 5.8 / C++ game (Feb 2026 to now), also has editor tooling, build automation, and a Blender greybox pipeline. Both are private repositories; a walkthrough is available on request.",
    "**How I work:** I design each tool, write the rules it enforces, and review and test every change. A lot of the code is written by AI coding agents that I direct. That's why most of these tools are about *proof*: an agent or a script saying \"done\" isn't evidence, so each tool checks real state and reports a verdict a person can trust.",
    "Status key: **Built** means it's in the repo, has tests, and has been run. **In progress** means it's built but hasn't passed end to end yet. **Designed** means there's a written spec or schema but the implementation is partial."
  ],
  "items": [
    {
      "title": "DreamEngine loop: lanes, tick, done-gate, and merge train",
      "badge": "Built",
      "badgeTone": "built",
      "status": "Built (November 2026). 123 merged pull requests as of 12 November 2026. In daily use on my solo work.",
      "problem": "A single person directing several coding agents needs a loop that keeps moving when a session dies, that will not take an agent’s “done” at its word, and that can land work without constant babysitting.",
      "built": [
        {
          "list": [
            "Five named lanes — HEALTH, P6, DREAM, BOOKEND, and TETHER — run in parallel on local coding-agent sessions. A five-minute scheduled tick is the heartbeat of the loop.",
            "A done-gate refuses to mark a lane done until a rebase, a test rerun, and a merge-ready check all pass. A merge train then lands qualifying work one change at a time.",
            "Stalled or dead runs auto-resume. A PC status notifier and a tool index keep the state of the loop visible."
          ]
        }
      ],
      "tech": "Scheduled automation, merge orchestration, status notification, and a tool index."
    },
    {
      "title": "Preference engine, Layer 1",
      "badge": "Built",
      "badgeTone": "built",
      "status": "Built (November 2026). Layer 1 is in the repo and covered by tests. No live decision type had met the bar as of 12 November 2026, so auto-default is not turned on for any type yet.",
      "problem": "Repeated decisions should be allowed to default only when the record is strong, and never in safety-sensitive cases.",
      "built": [
        {
          "list": [
            "A deterministic take-rate counter by decision type. A type may auto-default only at a 95% take rate over at least 20 evidenced answers, and only after a one-time yes for that type.",
            "Safety-sensitive types never auto-default, even at a 100% take rate. That includes deletes, merges, installs, secrets, and art or taste decisions.",
            "This is Layer 1 only — the layer that is built. Further layers are not claimed here."
          ]
        }
      ],
      "tech": "Answer log, take-rate report, and guarded auto-default with tests."
    },
    {
      "title": "Dream intake, one front door",
      "badge": "Built",
      "badgeTone": "built",
      "status": "Built (November 2026). The single front door is in place. A first end-to-end dream run is in progress; it is not finished.",
      "problem": "New ideas were entering through more than one path, which made it harder to turn a dream into a tight brief and into work a lane could actually run.",
      "built": [
        {
          "list": [
            "One intake door turns a dream into questions and a tight brief, and is the path new ideas go through.",
            "A walking-test baseline for an end-to-end run has been recorded. A first live end-to-end dream is in progress, not done."
          ]
        }
      ],
      "tech": "Single intake path, questions-to-brief flow, and a recorded walking-test baseline."
    },
    {
      "title": "Asset validation on save (Data Validation plugin)",
      "badge": "Built",
      "badgeTone": "built",
      "status": "Built (Oct 2026). Five validators register at editor start (confirmed in a headless editor run), and the rule module has host-side pytest coverage.",
      "problem": "Bad assets got into the project quietly: missing prefixes, meshes whose materials had been deleted, oversized textures, maps nobody owned, and references into personal `/Game/Developers` folders. Each one was found late, by hand.",
      "built": [
        {
          "list": [
            {
              "text": "Five Python validators that subclass `EditorValidatorBase` and plug into Epic's stock **Data Validation** plugin, so they run on save, on *Asset Actions › Validate Assets*, and through the DataValidation commandlet. Each validator checks one rule:",
              "children": [
                "**Naming:** Epic's prefix table per asset class (`SM_`, `M_`, `MI_`, `T_`, `BP_`, `ABP_` …). Known old strays sit in a baseline file as warnings until they're renamed. Any *new* unprefixed name fails.",
                "**References:** no hard reference to a `/Game` package that no longer exists, and no empty material slot on a static or skeletal mesh (read through the Asset Registry).",
                "**Textures:** power-of-two sides, and no bigger than a configurable maximum (4096 for now).",
                "**Map ownership:** every map under `/Game/HomeWorld/Maps` has to be listed in `map_owners.json`.",
                "**Developer folders:** nothing references `/Game/Developers`."
              ],
              "ordered": true
            },
            "Python validators don't register themselves the way C++ and Blueprint ones do, so `init_unreal.py` registers them through `EditorValidatorSubsystem.add_validator` when the editor starts, and skips that in `-game` sessions.",
            "The rules live in a **pure-Python module with no `import unreal`**, so the same checks run in CI without an editor. `validate_assets.py` is a batch pass over the whole project that writes a JSON report."
          ]
        }
      ],
      "tech": "UE 5.8 Editor Python, Data Validation plugin, Asset Registry dependency queries, pytest."
    },
    {
      "title": "A headless test runner that refuses false greens, plus a safe build wrapper",
      "badge": "Built",
      "badgeTone": "built",
      "status": "Built. The runner has regression tests (including a real UTF-8 BOM fixture). The build wrapper is the project's standard build entry point for unattended runs.",
      "problem": "The old automation runner reported \"0 passed, 0 failed\" on every run, so it had never actually measured anything, and nobody noticed because the result file looked clean.",
      "built": [
        "`run_ue_automation.py` attaches to an open editor, or launches a fresh headless one (`-ExecCmds \"Automation RunTests <prefix>; Quit\" -Unattended -NullRHI`), then parses the report. Each of these five bugs could have produced a fake pass, and each is now a hard error:",
        {
          "list": [
            "UE writes `index.json` with a **UTF-8 BOM**. `json.load` threw, the exception was swallowed, and every run reported 0 passed / 0 failed. The runner now reads it as `utf-8-sig`, with a regression test.",
            "**Wrong engine.** `UE_EDITOR` pointed at UE 5.7 while the project is locked to 5.8. The runner now reads `EngineAssociation` from the `.uproject` and refuses a mismatch.",
            "**A filter that matches nothing counted as a pass.** `Group:` filters UE test groups, not name prefixes. A run that completes zero tests is now an error.",
            "**Stale reports.** The report folder is now cleared before each run.",
            "**Stale binaries.** If the editor DLL is older than the newest source file, the runner exits before starting UE. This came from a real \"19/19 passed\" result produced by a DLL nine minutes older than the code it claimed to test."
          ],
          "ordered": true
        },
        "`Safe-Build.ps1` closes the editor if it's open, builds the Editor or Game target, retries once on editor-lock failures, and joins one machine-wide build queue so parallel agents can't start colliding compiles. A Live Coding path handles body-only C++ changes."
      ],
      "tech": "Python, PowerShell, UnrealEditor command line, UBT, UE Automation framework."
    },
    {
      "title": "Data-driven placement: validate first, undo in one step, then measure",
      "badge": "Built",
      "badgeTone": "built",
      "status": "Built. The placement metrics gate is marked \"gate ready\" and still needs my final sign-off on a desktop run.",
      "problem": "Scripted placers moved dozens of actors from a metrics sheet. A malformed sheet failed halfway through, after some actors had already moved, and there was no clean way back. Checking placement quality from screenshots was slow and subjective.",
      "built": [
        {
          "list": [
            "**Schema check before anything moves** (`placement_schema.py`): validates the sheet's JSON (required `player`, `pad`, and `homestead` blocks, finite numbers, required keys) and returns readable errors, so a bad sheet fails before the first actor moves. It's stdlib only, with host tests.",
            "**One-step undo** (`hw_undo.py`): placers wrap their work in `unreal.ScopedEditorTransaction`, so one Ctrl+Z reverts a whole scripted placement. Two engine details matter here. Calling `set_actor_location` on an existing actor doesn't call `Modify()`, so a helper calls `modify()` on the actor and its root component first. And `load_level` resets the transaction buffer, so the level has to load before the transaction opens. A test guards both.",
            "**Placement metrics gate** (`ps_placement_prove.py`): measures each placed actor in the loaded level against thresholds. Distance to ground must be 8 uu or less. The air gap under a prop must be 4 uu or less (12 uu on cliffs). The actor must sit inside the dress bounds with a 50 uu margin. Overlap between neighbouring props is flagged above 2 uu. Each check scores pass, soft fail, or closed fail, and the results go into one JSON gate file. Stills are captured only for confirmation."
          ]
        }
      ],
      "tech": "UE Editor Python (`EditorLevelLibrary`, transactions, bounds), JSON data sheets, pytest."
    },
    {
      "title": "Blender greybox pipeline: spec reader and recipe builder",
      "badge": "Built",
      "badgeTone": "built",
      "status": "Built. The spec reader went through 10 revisions in Oct 2026, four part recipes are written, and the recipe checker has tests.",
      "problem": "Greybox meshes drifted from their written specs (size, pivot, poly budget, material), and nothing checked them before they reached Unreal. A tool that simply re-created primitives would have overwritten hand-modelled work.",
      "built": [
        {
          "list": [
            "**Spec reader** (`graybox_spec_reader.py`): runs inside Blender, from the Blender MCP bridge or the Scripting tab. It measures every specced volume in the live scene (name, world origin, bounds, pivot Z, poly count, material binding), checks each against the spec, and writes the results as both a dict and Markdown. It's **read-only by default**. An optional `place` mode is check-before-create, so it never overwrites authored geometry.",
            "**Recipe builder** (`Recipe-Build.py` + `recipe_check.py`): a JSON recipe made only from a locked vocabulary of part types (lathe, tube, blade, arc, box, prism, array) becomes a mesh in headless Blender (`blender -b -P`). The export step creates a `UCX_` collision box from the mesh's own bounds and writes a checklist JSON with the mesh's sha256, its axes, and the declared master material. The checker refuses a malformed recipe with a one-line reason and exit code 1."
          ]
        }
      ],
      "tech": "Blender Python (`bpy`), Blender MCP, JSON schemas, UE static mesh conventions (UCX collision, `SM_` naming, master materials)."
    },
    {
      "title": "Editor automation bridge and C++ commandlets",
      "badge": "Built",
      "badgeTone": "built",
      "status": "Built. The bridge is in daily use (latest changes Nov 2026). The two commandlets were written in March 2026 and are worth re-running before a demo.",
      "problem": "Agents and scripts needed to query and drive the editor safely, without someone writing a new one-off script for every question.",
      "built": [
        {
          "list": [
            "**Request/response bridge** (`mcp_harness.py`): a caller writes `Saved/mcp_request.json` with `{command, args}`, the harness runs inside the editor, and it writes a structured JSON response. Built-in commands include actor lists, world info, pawn info, Blueprint defaults, and asset-exists checks, and new command modules can be registered. A per-row PIE probe added in Nov 2026 returns a pass/fail expectation for each test row, not just a list.",
            "**Blueprint inspector** (`blueprint_inspector.py`): exports a Blueprint's parent class, variables, components, and CDO properties to JSON, so it can be diffed and reviewed.",
            "**C++ editor module with commandlets** (`HomeWorldEditor`): `ApplyPCGSetup` finds the level's PCG component and assigns a graph from `GraphPath=`. Node-level settings are logged, not applied, because the PCG node API isn't stable to edit from code. `CreateMEC` creates or updates a Mass Entity Config asset, adds standard traits by class path (skipping any that are missing), and saves the package.",
            "**Tool capability audit** (`TOOL_SURFACE.md`): a matrix of what each editor, MCP, and build tool can actually do on each host. Every claim carries an evidence level, from E0 (only claimed in a doc) to E5 (survived a fresh editor)."
          ]
        }
      ],
      "tech": "UE Editor Python, C++ (`UCommandlet`, `UPackage::Save`, PCG and MassEntity APIs), JSON IPC, MCP."
    },
    {
      "title": "Designed: math-first prop arrange gate and a nightly package verdict",
      "badge": "Designed and in progress",
      "badgeTone": "designed",
      "status": "Designed and in progress. These are labelled honestly, not shipped.",
      "built": [
        {
          "list": [
            "**Prop arrange gate (designed, schema frozen).** A written spec and two JSON schemas (`prop_inventory`, `prop_arrange_gate`) define how to score whether a scene is \"arranged\" with **math rather than screenshots**. Every prop label to be checked must exist both in the inventory and in the loaded world. Each prop has a golden transform with tolerances, plus AABB, overlap, and ground checks. If labels are missing, the gate blocks the step instead of guessing. Screenshots only confirm a pass, and a PNG that merely exists never counts as one. The placement metrics gate in item 3 is the first implemented piece.",
            "**Nightly package with one verdict line (in progress).** `Package-Nightly.ps1` runs BuildCookRun and a boot smoke test, then prints exactly one `PACKAGE_NIGHTLY PASS|FAIL <reason>` line. It reads every input from its source (the `.uproject`, the engine version, the default map in `DefaultEngine.ini`) and refuses to run if one is missing. It won't run while another engine process is open. **It hasn't passed yet**: the last run cooked successfully but failed when copying the archive into its own staging folder. Finding that kind of problem is exactly why the script exists.",
            "**Idea, not started:** a Horde job template and a minimal BuildGraph script are drafted for building and running the Smoke test group on CI agents. They haven't been run."
          ]
        }
      ]
    }
  ],
  "footnote": "Code samples or a screen-share walkthrough of any item are available on request. The HomeWorld repository is private."
}
