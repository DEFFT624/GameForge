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
