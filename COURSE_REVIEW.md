# Course review follow-up

Claude manually traced all four quiz answers: 75, Game over, three iterations, and 100. Codex independently checked those simple traces. At the time, neither review compiled the examples. The later v0.2 verification compiled and ran all eight examples using the installed .NET compiler; see VALIDATION.md.

Applied improvements: remove unused variables from the first executable example while preserving its answer; explain the console-project context, loop-variable scope, function parameters and return values, and the healing example's supported input range. Correct the proposed static explanation: static local functions cannot capture enclosing local variables; static does not mean a function can only use its parameters or guarantees purity.

Reference: https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/keywords/static

Snippet drafts now reject explicit bidirectional control characters in titles and source. Normal Unicode, including Arabic and Hebrew letters, remains accepted. Length limits explicitly use UTF-16 code units. These checks complement literal text rendering; they do not prove that a snippet is safe to run.

## Course expansion

1. Lists and inventory, including zero-based indexing.
2. Classes and separate character instances.
3. Validated menu input (implemented); dice rolls remain a future extension.
4. Enums and game-state transitions.
5. A three-room console RPG project checklist with health, inventory, combat, and clean endings. The full game is for the learner to build.

No site-side code runner or executable uploads are part of this roadmap.
