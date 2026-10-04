# Validation — October 3, 2026

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
