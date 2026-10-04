# GameForge: focused Claude review handoff

Review the current draft at https://github.com/DEFFT624/GameForge/pull/19, branch `guided-rpg-and-course-review`. Earlier reviews of the original course do not cover this expansion. Read SPEC.md and SECURITY.md first. Review only website-related code and content; do not access secrets, install packages, execute learner code, publish, or merge.

## Current scope

- 18 C# lessons in four modules. Four new prerequisites teach strings, booleans, combined conditions, and foreach before their applications.
- A glossary, walkthrough, output, choice-specific feedback, code blank, optional prediction lab, and execution trace for every lesson.
- Four optional module debugging challenges with saved notes and small repairs.
- First steps includes a searchable glossary and five deliberate compiler/runtime/logic mistakes with verified repairs.
- Six RPG build guides, a source-only complete console reference, and a turn-by-turn fight walkthrough.
- Exact lesson links, multi-tab saving, visible answer synchronization, and a session-only fallback if saving fails.

## Review questions

1. Can a complete beginner follow the prerequisite order and locate each suggested edit? Identify jargon, ambiguity, spelling mistakes, and explanations that advance too quickly.
2. Check boolean snapshot behavior, string joining, &&/||/!, loop boundaries, return versus printing, object aliasing, list indexes and foreach scope, parsing versus allowed range, and switch break versus while termination.
3. Check healing wording: the simple Heal function caps the maximum but does not ignore negative amounts. The reference uses fixed positive healing. Damage is clamped in the Character example and reference.
4. Trace the RPG's failed choices, full/empty potions, successful healing and counterattack, enemy defeat, room transitions, quit, EOF, and one ending. The default game cannot reach defeat; its guide/test uses the documented 10-health experiment.
5. Check persistence helpers and storage events. Other lesson changes must preserve active controls and feedback; a reset in another tab must clear required answers without closing optional work. Editing the same answer concurrently uses the latest save, not collaborative merging.
6. Confirm all earlier lesson IDs remain stable. Completion and the feedback gate require both exercises in all 18 lessons. Optional labs, notes, and self-reported RPG checks must not grant required completion. Local progress is not a credential.
7. Review exact lesson URL validation, browser navigation, reset targeting, focus, and mobile layout. Localhost links work only on the computer running the site.
8. Confirm dynamic content uses text/value properties, the server accepts no uploads, approved C# downloads remain source text, and the browser never executes C#.

## Evidence and commands

- `npm test`: 59 passing website/content/security/behavior/build checks.
- `npm run test:csharp`: 66 compiled lesson/lab/debug/repair/experiment cases. Valid samples treat warnings as errors; the empty-list experiment checks the documented exception.
- `npm run test:errors`: five deliberate error cases and their repaired outputs verified.
- `npm run test:rpg`: compiled reference behavior, defeat experiment, and the published fight walkthrough verified.
- `npm run build`: approved static assets and restrictive security policy only.

No application packages need installing. C# checks require the .NET 10 SDK. Only repository-owned programs are compiled. Workflow 37198210645 passed the complete code milestone ebe113c244102a7617846539e5da75ce023d709c on Linux/Node 22 and Windows/Node 24. Build fixtures verify stale output is removed, linked output is refused without touching its target, and a missing required asset fails before replacing a previous build. All 50 checked repository files matched the local project at that milestone.

## Unperformed checks

This brief has not been sent to Claude: browser control fails to initialize because its kernel-assets path is unavailable. Current visual rendering, actual browser Back/Forward, hover space, keyboard flow, and screen-reader review remain pending. Source contracts and behavior tests do not replace those checks. No human beginner session has happened. No deployment or merge is included; license selection remains pending.

Return a focused review with concrete corrections and remaining uncertainties. Coordinate file ownership before editing; do not claim an unperformed check passed.
