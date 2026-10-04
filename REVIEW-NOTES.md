# C# modules and practice labs: milestone review

## Ready for review

Review `public/course-plan.js`, `public/app.js`, and the new module/lab sections of `public/index.html`. The milestone adds four modules and fourteen optional practice labs. All original lesson IDs and required completion rules stay stable.

Check explanations for beginner vocabulary, ambiguous phrasing, spelling, and whether each lab can be understood using the preceding lessons. Check object aliasing, loop boundaries, return versus print, parsing versus range validation, and switch break scope especially carefully.

## Evidence

33 Node tests pass. Every new lab sample was compiled and run locally with its output checked against the answer. The browser does not execute code: prediction checks compare strings, and user notes render through text/value properties.

## Pending checks

- Claude milestone review: not sent because browser controls failed to initialize. Review the current branch snapshot rather than the older main branch.
- Desktop/mobile appearance, hover space, and keyboard navigation through the optional lab.
- Refresh a partially typed lab answer and notes; switch lessons and return.
- Complete only an optional lab and confirm main completion remains unchanged.
- Open each module card and confirm it resumes the first unfinished lesson in that module.

Do not claim these pending checks have passed. No deployment is included.

## Pending review: source-only RPG reference

Check `public/rpg-reference.cs`, its beginner reading guide in the capstone page, and `tests/rpg-behavior.mjs`. Focus on continue vs switch break, preserving health between rooms, failed potions consuming no turn, EOF/quit preventing counterattacks, and one ending only. The normal settings cannot reach defeat; the guide and compiled test deliberately use the documented 10-health experiment. There are no packages or executable uploads. Browser connection is unavailable; this handoff has not yet been sent to Claude.

## Pending review: optional module debugging

Four challenges in `course-plan.js` pair observed behavior with a minimal repair. Check beginner wording, the distinction between compile errors and logic mistakes, int argument/result handling, object references, and loop conditions. Saved explanations are optional; no automatic completion is granted. `npm run test:csharp` verifies all 36 first-party samples, while real-HTML contract tests catch missing controls and broken local links. Claude review remains pending because browser initialization still fails.

## Pending review: persistence merge

The two-tab regression failed before the fix and passes now. Review `recordMap`, `saveRecord`, `refreshRequiredProgress`, and storage event handling in app.js. Saves merge only known IDs and sanitized records; failure switches the visit to in-memory behavior so navigation does not discard unsaved work. Tests cover completions, drafts, optional notes, snippets, milestones, cross-tab reset, and failed storage. Same-record concurrent editing uses the latest save.
