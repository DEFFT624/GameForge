# Gameforge

The home page introduces the course at `/`; `/learn.html` opens the learning workspace. A new First steps guide teaches instructions, output, execution order, and text variables. All thirty-nine lessons include goals, glossaries, walkthroughs, expected output, common mistakes, small prediction exercises, and answer-specific feedback. Existing saved answers and progress are preserved.

A beginner-friendly game development learning website. This first local MVP has a responsive dashboard, thirty-nine C# lessons with quizzes and code blanks, browser-local progress, two starter snippets, local text draft creation/deletion, snippet search, and a six-step RPG project checklist.

The C# path is organized into ten modules: values and control flow; reusable actions; inventory, characters, and input; game states; a game data toolbox; organization and errors; controlled data and rules; object relationships; saving and tests; and a finished console RPG. Each lesson also offers an optional output-prediction lab with hints, explained answers, a small-change exercise, and saved notes. Optional labs do not change the required quiz-and-code-blank completion rules. Home-page tabs introduce future Unity, Krita, and Blender paths with their own color themes; those courses are planned.

The initial ten-module C# foundations test build is complete. See [FOUNDATIONS-TEST-PLAN.md](FOUNDATIONS-TEST-PLAN.md) and open `/test-guide.html` for your initial test and the later friend session. This is console C# foundations, not all of C# or the planned Unity course.

See [TESTING.md](TESTING.md) for the short user test checklist. On Windows, you can also open START-GAMEFORGE.cmd.

## Run locally

Requires Node.js 22 or newer. No packages need installing.

```sh
npm start
```

Open http://127.0.0.1:4173. Run `npm test` for the security and content checks. Stop the server with Ctrl+C. The server binds only to this computer. Serve through this server to get the security headers; opening index.html directly is unsupported.

Build static assets with `node build.mjs`. The reviewed assets can be used for a future static deployment; no hosted build is live. License selection and release review are still pending. GitHub remains the source of truth.

## Honest boundaries

This is a browser-local learning prototype, not a public community service. Quizzes check selected answers; code blanks compare trimmed text. Neither compiles or runs learner code. There are no accounts, uploads, analytics, network integrations, public submissions, or remote execution. Drafts and progress use this browser's local storage and can be lost when browser data is cleared. Do not put secrets in drafts. Local progress is editable by the learner and is not a credential.

See [SPEC.md](SPEC.md), [SECURITY.md](SECURITY.md), and [CONTRIBUTING.md](CONTRIBUTING.md). Repository: https://github.com/DEFFT624/GameForge. The proposed license is MIT; owner and license approval are required before an open-source release. No release license has been granted yet.

## Quest Radio
Choose local audio files in the bottom-left player, then press Play. Playback continues between lessons. Use the playlist, previous/next, volume, repeat-song, and Clear controls. Click the Quest Radio heading to collapse it. Select up to 30 files, each at most 100 MB; browser format support varies. Files are not uploaded or stored by GameForge, and must be reselected after refresh.

## Friend feedback session
Open /beginner-test.html after finishing both required exercises in all thirty-nine C# lessons. The full-course review uses the same browser and website address as the saved progress; it includes locally saved notes and Copy feedback. No results are submitted automatically, and the RPG project is optional for the review. A hosted URL is required before a friend on another computer can use it. Existing completion IDs are preserved.

### Complete tiny RPG reference

The project guide now links to `public/rpg-reference.cs`, a first-party source-only example. Learners copy it into Program.cs in a new console project and use the guided reading passes and test checklist. No uploaded source or executable is accepted or run.

For maintainers, `dotnet run --project examples/tiny-rpg/GameForgeRpg.csproj` runs the reference with .NET 10. `npm run test:rpg` compiles it with warnings treated as errors and checks victory, quit, EOF, invalid input, potion limits, room transitions, and the documented low-health defeat experiment. Build outputs stay ignored and are not shipped. .NET 10 support: https://dotnet.microsoft.com/en-us/platform/support/policy.

### Optional module debugging

Each module ends with a small program that compiles but behaves incorrectly. Learners compare expected and actual output, write a saved explanation, reveal a hint or repair, and try two test cases. These challenges never change required completion. `npm run test:csharp` compiles lesson, lab, bug, repair, and suggested-experiment samples with .NET 10 and checks their documented behavior.

Every lesson also includes an optional execution trace table. It follows the current example and separates changing values from newly printed output. The trace opens on demand so the main lesson stays focused.

First steps also has a searchable glossary that links definitions to the lessons where they appear. Searching or opening a definition does not complete a lesson.

The troubleshooting guide distinguishes compiler errors, runtime errors, and logic mistakes using deliberate examples and repairs. `npm run test:errors` verifies the documented diagnostics and repaired outputs. These are first-party samples; learner code is never executed by the site or tests.

Each lesson has a direct link using its stable ID, such as `/learn.html?lesson=strings#lessons`. Opening a shared lesson does not share progress. Localhost addresses work only on the computer running the site; use a reviewed hosted address for a friend on another computer.

### Game data toolbox: lessons 19–22

A fifth module adds readable status messages, fixed room arrays, constructor inputs, and safe item-price lookups. Every lesson includes a walkthrough, trace, quiz, code blank, optional prediction lab, and saved notes. A debugging challenge distinguishes stored status text from a freshly built message. Previously completed lessons and saved answers remain intact; the course review now opens after all 39 required lesson pairs.

The language rules were checked against Microsoft documentation: [interpolation](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/tokens/interpolated), [arrays](https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/builtin-types/arrays), [constructors](https://learn.microsoft.com/en-us/dotnet/csharp/programming-guide/classes-and-structs/constructors), and [TryGetValue](https://learn.microsoft.com/en-us/dotnet/api/system.collections.generic.dictionary-2.trygetvalue?view=net-10.0). First-party teaching code is compiled in the validation suite; learner code remains text-only.

