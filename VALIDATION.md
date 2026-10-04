# Validation — October 3, 2026

## C# modules and practice labs — October 4

- Four modules partition all 14 lessons in teaching order. Module cards resume the first unfinished lesson within that module; end-of-module recaps connect ideas to the RPG project.
- Each lesson has an optional output-prediction lab, a hint, an explained answer, a small-change question, and locally saved notes. Labs do not count toward required course completion or change the full-course feedback gate.
- 33 automated tests pass, including module ordering, answer checking, saved lab drafts, navigation, and preservation of main lesson progress. Static build succeeds.
- All 14 new first-party C# lab programs compiled with warnings treated as errors against .NET 10.0.9 references using SDK 10.0.301. Every observed output matched its published answer.
- Browser-control initialization remains unavailable. The new UI needs visual and keyboard checks in a real browser; Claude has not reviewed this milestone. These pending checks do not invalidate the recorded automated or compiler results.

## Themed learning-path tabs — October 4

- Home roadmap now uses four accessible tabs: C# green, Unity gray, Krita pink-purple, Blender orange. Future courses remain explicitly planned. Keyboard support includes arrows, Home, and End.
- 30 automated tests pass; static build succeeds; the running preview serves the new module with HTTP 200. Graphify code map refreshed locally without LLM calls.
- Browser visual verification could not run because the browser-control runtime failed to initialize after the app restart. Appearance needs a manual check.

## Learning roadmap and full-course feedback

- 29 automated tests pass. The feedback review requires both exercises in every C# lesson; tests cover 13/14 completion, unlock at 14/14, reset/relock, malformed records, and changes from another tab.
- Static build succeeds. Browser verification confirms the roadmap appears in Overview and a direct feedback-page visit stays locked at 7/14 completed lessons.
- Feedback prompts cover the full foundations course and the optional RPG. Existing early-test notes retain their old storage key; new full-course notes use a separate key.
- Unity, Krita, Blender, and the combined project are planned paths, not implemented courses. No deployment was performed in this pass.

## Guided project and review pass

- Current suite: 27 passing tests. New checks cover project prerequisite links, while-loop ordering before input, singular search feedback, and preserving section artwork on reset.
- All 14 first-party lesson examples compiled with warnings as errors and matched their expected output. The new setup input sample also compiled with nullable analysis enabled; name input, an empty line, and end-of-input produced the expected results.
- Claude manually reviewed the supplied 14-lesson snapshot: code traces, outputs, quiz indices, feedback, blanks, prerequisite order, and spelling. A second manual review covered the six new guides, setup HTML, and app.js. Claude did not execute tests or inspect the entire website. No misspellings were reported in those supplied texts.
- Addressed review findings: earlier while-loop teaching, stale prerequisites, collection-initializer explanation, guided project setup, persistent enemy scope, counterattack conditions, explicit state-based quitting/end-of-input, and reproducible defeat/potion tests. Corrected singular snippet-search wording and reset artwork behavior.
- The project now has setup guidance and six expandable build guides with prerequisite navigation, implementation steps, test cases, and hints. Stable lesson/milestone IDs preserve existing saved progress.
- The accumulated visual changes include self-hosted VT323 with its license, ASCII section and lesson art, glass panels, answer feedback, and radio/hover spacing. Fonts are served from the same origin under the CSP.
- These checks are not a guarantee of zero defects. Human beginner testing and a complete cross-browser/accessibility audit remain outstanding. No public deployment is included.

## v0.2 test build

- Eight Node tests pass: all eight lessons have unique IDs, valid quiz answers and corresponding code blanks; code blanks reject hostile/non-string inputs; capstone IDs are stable; draft limits and text-direction controls are checked; literal rendering avoids HTML and execution sinks; local server rejects writes and private-file routes.
- All eight first-party C# samples compiled with warnings treated as errors using the installed .NET 10.0.301 Roslyn compiler and 10.0.9 reference assemblies. Each executable produced the expected output. Compilation used direct compiler calls with explicit references and System imports, without NuGet or access to user package settings. A normal SDK build was attempted first but could not read protected user NuGet settings; those settings were not accessed.
- Browser walkthrough completed all eight quizzes and code blanks, verified 8/8 completion and disabled final Next button, reload persistence, incorrect practice feedback, checklist persistence, snippet search including no-results feedback, and quiz/practice reset. Earlier focused testing verified literal HTML draft rendering, draft reload persistence and deletion.
- Desktop and 390-pixel layouts were visually inspected. At 390 pixels there was no horizontal page overflow. Keyboard focus moves to the selected lesson heading, and a skip-to-lessons link is available. This is not a full accessibility or cross-browser audit.

## Limits

No user-submitted code is compiled or run. Compilation above covers only our own eight curriculum examples. Code blanks are string comparisons. Public moderation, accounts, uploads, and server-side progress are not implemented. Local server header/write-rejection tests do not by themselves verify the private hosting platform; deployment verification is recorded separately.

## Answer persistence fix

Twelve automated checks pass, including fresh page initialization, per-lesson drafts, completed-answer migration, malformed storage, and reset behavior. Browser reload preserves the selected quiz answer, code-blank text, completion, and active lesson. Legacy completions display canonical correct answers because exact prior entries were not stored.

## Fourteen-lesson progression and friend test preparation
All 14 first-party C# samples compiled with warnings as errors and produced the guide output using installed Roslyn. Twenty-two automated checks pass, including ordering, completion migration, course content, and radio/security regressions. Browser completed all six new quizzes and code blanks and verified refresh persistence. Friend test notes survived refresh and Copy feedback succeeded. Human learner feedback remains pending. Sites currently reports zero versions and no live URL.

## Lesson layout and navigation
- Compact lesson picker; wider reading panel; introductory, project, and snippet content can be expanded on demand.
- Persistent Previous/Next controls show the next lesson title; switching lessons focuses and immediately scrolls to its heading.
- Browser verified desktop and 390px mobile navigation, no horizontal overflow, and final-lesson project reveal. Music does not overlap mobile lesson controls.
- Figma connection reported installed, but no Figma design tools were available during this change. This implementation is not a Figma-produced design.

## October 4: compiled tiny RPG reference

- `node --test tests/*.test.mjs`: 34 passing website tests.
- `node tests/rpg-behavior.mjs`: compiled .NET 10 reference and low-health experiment; victory, defeat, quit, EOF, invalid input, potion limits, room transitions passed. Warnings treated as errors.
- `node build.mjs`: approved static assets only, including source text.
- Preview reference endpoint returned HTTP 200 with text/plain and nosniff; POST and binary paths are rejected in server tests.
- Browser automation still fails during initialization with a missing kernel-assets path. Current visual inspection and Claude review remain pending; these are not claimed as passed.

## October 4: module debugging and repeatable curriculum validation

- Four module debugging challenges, saved per-module notes, hints, repairs, and follow-up tests. Optional, independent of required completion.
- `node tests/csharp-content.mjs`: all 36 samples compiled and their outputs matched; warnings treated as errors. This includes 14 lessons, 14 prediction labs, 4 bugs, and 4 repairs.
- Website tests include debugging persistence, module-end visibility, malformed notes, real-page control IDs, and all local navigation/asset targets. Browser rendering is still unverified.

## October 4: persistence review

A regression test reproduced two workspace tabs overwriting different lesson completions (1 / 14 instead of 2 / 14). Saves now merge the latest validated records for other lessons and modules. Required progress refreshes before a pass; storage events refresh completion counts and reset state. Snippet additions/deletions and project checks preserve unrelated changes from other tabs.

`node --test tests/*.test.mjs`: 44 tests pass, including multi-tab progress, notes, snippets, milestones, and storage-failure behavior. If saving fails, in-memory work remains usable for the visit and the existing warning explains that it cannot persist. Editing the same record concurrently still uses the latest save; this starter has no collaborative editing or accounts.

## October 4: automated check preparation

Prepared `.github/workflows/checks.yml` for Linux/Node 22 and Windows/Node 24. Official actions checkout v7.0.1, setup-node v7.0.0, and setup-dotnet v6.0.0 release tags and action manifests were verified against their upstream GitHub repositories; uses are pinned to full commit SHAs. Workflow has contents:read only, no persisted checkout credentials, and no publishing step. `global.json` selects stable .NET 10 feature bands.

The website test launcher enumerates only .test.mjs files explicitly, avoiding shell glob differences and accidental execution of the browser feedback script by generic Node test discovery. Local launcher: 44 passing tests. Hosted workflow results are pending until GitHub executes the saved workflow.

## October 4: execution traces and hosted checks

Added optional execution traces for all 14 lesson examples. Rows distinguish values after a step from the new output during it. Traced output matches every lesson guide; changing lessons closes the trace. `npm test`: 46 pass. RPG tests and static build pass after aligning the source damage clamp with the Character lesson.

GitHub workflow runs 37193013438 and 37193012933 completed successfully at commit 073aaaab326f10a99f60b82696c966e44ec42090, including Linux/Node 22 and Windows/Node 24 checks, all 36 C# samples, RPG behavior, and static build. Later trace changes await their own hosted run. The workflow now triggers pull requests and pushes to main only, avoiding duplicate branch/PR runs for the same update.

## October 4: four prerequisite lessons

The foundations path now has 18 lessons: added strings, booleans, combined conditions, and foreach list iteration before their later applications. Each has a glossary, walkthrough, output, choice-specific feedback, code blank, optional prediction lab, and execution trace. The four existing modules retain their IDs and every earlier lesson retains its ID.

- `npm test`: 49 tests pass, including upgrade from 8 or all 14 earlier completions, with new lessons unfinished and direct review access locked until 18 / 18.
- `npm run test:csharp`: all 44 first-party samples compile with warnings treated as errors and match their outputs (18 lessons, 18 labs, 4 bugs, 4 repairs).
- `npm run build`: passes. New module endpoint returns HTTP 200 in the preview.
- Current home/workspace/review wording and roadmap now state 18 lessons. Browser rendering and Claude review remain pending.

## October 4: glossary and expansion checks

The expanded 18-lesson course passed hosted workflow 37193832704 at commit e0b389851195dba0101d5985f5d66820638ce524 on Linux/Node 22 and Windows/Node 24, including 44 compiled teaching samples, RPG behavior, and static build.

Added a searchable glossary under First steps, sourced from lesson definitions with direct buttons to their examples. Case-insensitive matching, literal hostile input, result limits, and unchanged completion counts are tested. `npm test`: 50 pass. Also clarified the string prediction prompt to change the first line, distinguished revisiting lessons from the feedback review, and made reset wording explicitly preserve optional notes.

## October 4: beginner troubleshooting

Added five first-party error/repair pairs under First steps. `npm run test:errors` compiles each deliberate mistake, checks its documented compiler diagnostic, runtime exception, or wrong output, then compiles and runs the repair. All five pass. A proposed missing-semicolon example actually produced CS1003 during verification; it was replaced with an unambiguous single printing statement that produces the documented CS1002. Source links were checked against Microsoft Learn.

`npm test`: 52 pass. Static build and the new preview module endpoint pass. Only approved source text is served; no execution or uploads were added. GitHub workflow 37194684582 passed for the earlier glossary commit 7228f6f1384b90bbcb5082e835552af16fe576d9. Current troubleshooting changes still need their hosted run and browser/Claude review.

## October 4: exact lesson links

Lesson links use validated stable IDs in the query string and open the requested lesson before falling back to saved progress. Lesson navigation updates the address; leaving another activity for a lesson creates a browser history entry, while Next/Previous replace the current lesson address. Browser navigation restores the requested activity/lesson. Reset removes stale lesson targeting without changing a non-lesson activity.

`npm test`: 54 pass, including direct-link selection, refresh, independent recipient progress, unknown/hostile IDs, history restoration, and reset. Real-HTML checks confirm the link control exists. Visual and actual browser history/keyboard review still need a functioning browser connection. Localhost remains local-only, with no publication.

## October 4: suggested-experiment review

Expanded `npm run test:csharp` to 66 compiled cases: the 44 base teaching samples plus 22 small lab changes, including empty output, parsing boundaries, object independence, negative healing, and an intentionally invalid empty-list read. All pass; the empty-list case checks its documented ArgumentOutOfRangeException rather than expecting successful execution. Warnings remain errors for valid samples.

Review corrected an inaccurate claim that the healing example ignored negative amounts; it only caps the maximum. Replaced a remove-the-only-function-call experiment, which produced an unused-function warning, with a zero-iteration experiment that demonstrates the same distinction without that distraction. Prerequisite wording now matches the expanded course order. Common typo scanning and manual quiz/walkthrough review found no further specific corrections; this does not substitute for a human learner or Claude review.

Hosted workflow 37195601203 passed the troubleshooting commit 7e5674165e0fb3abfaa98e0470a439d45d44ce58, and 37195906746 passed exact-lesson links at aa48ad3b737391e5ff113bcdedfe8f066d50169b, on both configured platforms. The new experiment checks await their hosted run.

## October 4: visible answer synchronization and RPG walkthrough

Two regressions reproduced stale visible answers after a reset or a same-lesson edit in another tab. Storage events now update existing required-answer controls only when their saved value changes, preserving the control nodes, unrelated feedback, optional notes, and open optional work. `npm test`: 56 pass. Direct browser verification remains pending.

Added a collapsed fight walkthrough that follows invalid input, a full-health potion, two attacks, capped healing with a counterattack, and an enemy defeat. `npm run test:rpg` verifies the exact menu values, potion count, counterattack count, room transition, and quit for that sequence. The reference source is unchanged.

Hosted workflow 37196381286 passed all 66 teaching/experiment cases at commit de08d0aa6d49366c1ff2928e02cbbc32a9aeb36b on both platforms. The later synchronization and walkthrough changes await their next hosted run. Claude's handoff was consolidated around the current implementation and pending checks.

## October 4: scoped, repeatable static builds

Build regression fixtures reproduced stale generated files surviving a rebuild. The build now validates all required regular source assets, refuses linked source/output directories, verifies its resolved output stays in this project, and replaces only its generated dist directory. Tests use fresh project fixtures; the output-junction test confirms its target remains unchanged. A missing required font fails before replacing a previous build. Repeated builds have the same files and one CSP meta declaration per page. No unapproved source file is copied.

`npm test`: 59 pass. Local static build passes. This changes generated output only and does not add publishing or execution. The three new build checks are part of the existing website check command; hosted results remain pending until the saved branch runs them.

## October 4: complete code milestone verified

Workflow 37198210645 passed at ebe113c244102a7617846539e5da75ce023d709c on Linux/Node 22 and Windows/Node 24: 59 website checks, 66 C# teaching/experiment cases, five intentional-error/repair pairs, RPG behavior including its walkthrough, and static build. An exact Git blob hash comparison found all 50 checked project/repository files identical. The local home, lesson link, troubleshooting module, and reference-source endpoint returned HTTP 200 with the expected content types. Browser initialization still failed on the closing review attempt, so visual/keyboard/Claude checks remain unperformed.

## October 4 morning follow-up: game data toolbox

- 22 lessons / 5 modules; existing 18 lesson IDs and quiz/code-blank answers retained.
- node tests/run.mjs: 62 tests passed. New cases cover eighteen-completion upgrade/resume, each new lesson's required-answer and draft restoration, and the direct full-review gate.
- node tests/csharp-content.mjs: 80 first-party samples passed with real .NET compilation and expected outputs. Includes every lesson/lab, five module bugs and repairs, and all documented optional-lab change cases.
- node build.mjs passed; approved new asset included in the build and preview routes.
- Claude/browser visual review could not run: browser control initialization reports a missing kernel-assets path. This is an unperformed review, not a passed check.


GitHub follow-up: commit a0dbaf6d1b558dc0c3e35ea1b5f92cdf567d8c25 passed workflow 37204113539 on both Windows / Node 24 and Linux / Node 22. Both jobs passed website tests, C# teaching examples, RPG behavior, deliberate-error repairs, and the static build. All 21 uploaded files matched the verified local file hashes. Draft PR: https://github.com/DEFFT624/GameForge/pull/19.

Browser access recovered after restarting Codex. The local preview was restarted, and real browser inspection confirmed lessons 19–22, Next navigation, the 22-item chooser, the fifth module, the final project link, and Quest Radio opening/closing. No browser console errors were reported during this check. Corrected misleading constructor wording and a stale four-module dashboard heading. Saved answers were not edited during inspection; automated persistence checks still cover them.

Claude milestone review completed in the existing conversation after browser access recovered. Claude manually reviewed the pasted four-lesson/module/debug snapshot, not the whole repository, and executed no code. It found no incorrect answers, outputs, practice blanks, lab variations, traces, or spelling mistakes. Incorporated constructor-argument migration guidance, exact dictionary key matching, complete array index bounds, array initializer reassignment syntax, literal interpolation braces, and an optional purpose for the price table. Its uncertainty about prior string joining was checked against the existing strings lesson, which already teaches +.

## Completed initial foundations test build
- Expanded from 5 modules/22 lessons to 10 modules/39 lessons. Added organization and errors, controlled object data, inheritance/interfaces/composition, JSON and files, deterministic rule tests, and final RPG integration/playtesting. Every new lesson has a guide, glossary, trace, aligned quiz feedback, code blank, optional lab, and verified lab variation. Each new module has a recap and debug/repair challenge.
- All 67 website checks and the static build pass. Original 22-lesson progress survives but does not prematurely unlock the expanded review. Both exercises in all 39 lessons are required; labs/RPG remain optional.
- Full compiler run passed 141 first-party samples. After review changes to properties and file handling, 16 focused samples passed: all changed lessons/labs/variations plus seven healing, failed-read, malformed-JSON, null, and property-case checks. The default CI catalog now contains 148 samples; this record distinguishes the full run from the focused rerun. RPG checks pass for victory, defeat, quit, end-of-input, invalid input, potions, and room transitions; five troubleshooting failures/repairs pass.
- Browser verified module 9 validation, module 10 final lesson (39/39), its project link, updated home course links/counts, and the initial test guide. No console errors observed. Learner answers were not modified by inspection.
- Claude manually reviewed the pasted 17-lesson/5-module snapshot, without execution or unseen repo claims. It found outputs, answers, traces, blanks, and variations correct and no misspellings, and flagged teaching gaps. Addressed new quiz-position balance and aligned feedback, private-setter potion adaptation, equality-blank wording, concrete app-owned save location, field serialization, JSON defaults/case matching, exception/file handling, and terminology. String joining already appears in the earlier strings lesson; the RPG reference is executable-tested.
- /test-guide.html prepares the initial test and later friend call. Human comprehension feedback is pending. No deployment, merge, release, accounts, executable uploads, or browser C# execution. Preview remains local.

## Sidebar and character validation

77 website tests pass, including derived XP, required exercise pairs, duplicate/unknown IDs, full-course XP boundaries, reset, malformed/denied storage, character cross-tab refresh and resume links, remembered sidebar preferences, storage clearing, mobile defaults/navigation/outside/Escape close, and skip-link insertion. New scripts retain text-only rendering, explicit asset routes, and restrictive CSP in generated Character HTML. Static build passes.

Browser inspection verified persistent navigation between Home, lessons and Character; collapsed and expanded views; keyboard skip link first; focus-visible rail labels; no clipped labels in the expanded sidebar; and initial character rendering. Phone viewport override was ineffective in this in-app browser; narrow-screen behavior was unit-tested, with visual mobile testing deferred. No browser console errors observed. Foundations commit 2f6118e completed GitHub CI successfully on both platforms, including all 148 default C# compiler cases.
