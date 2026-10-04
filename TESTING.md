# Try GameForge

The home page is at http://127.0.0.1:4173/. The learning workspace is at http://127.0.0.1:4173/learn.html. Choose Start from the beginning to read the new First steps guide. Open a lesson glossary, trace its walkthrough, predict a tiny change, and reveal the reasoning. Try a wrong quiz answer: feedback should explain that specific choice. Going Home and back must retain saved progress. Leaving the workspace stops its music.

For local testing on Windows, open START-GAMEFORGE.cmd, leave that window running, and visit http://127.0.0.1:4173. Node.js 22 or newer must be installed. No package installation is required. Close the server with Ctrl+C when finished.

## Five-minute test

1. Choose Continue learning. Read lesson 1 and try an incorrect quiz answer, then the correct one. Feedback should explain the mistake and the lesson should show In progress. The completed-lesson count should increase only after both the quiz and code blank are passed.
2. Fill in the code blank. Try the Hint button. Check the answer, then refresh the page. Quiz and code-blank progress, your selected answer, and the exact text in the blank should remain saved. Try refreshing with an unfinished answer, then switching lessons and returning. The last viewed lesson should reopen.
3. Use Next and Previous. Open the inventory, character and game-state lessons from the learning path. All 14 lessons should be available.
4. Check a milestone under Dungeon of Three Rooms. Refresh and confirm it stays checked. Uncheck it if it was only a test.
5. Search starter snippets for health. Save a harmless local snippet draft, refresh, open the draft section, and delete it. Drafts never publish or run.
6. Try a narrow browser window. Text and controls should fit without horizontal scrolling.

Tell us which step failed, what you expected, what appeared instead, and which browser/device you used. Also tell us if a lesson feels too fast, too technical, or too easy.

Progress belongs to the browser and site address you use. A hosted version and localhost have separate progress. Clearing browser data removes saved progress and drafts. The Reset lesson progress button resets quizzes, code blanks, and saved answers but leaves drafts, optional lab notes, and project milestones intact.

## Current boundaries

There are no public accounts, file uploads, public submissions, or code execution. Code blanks use exact, trimmed text answers and are not a compiler. The capstone has a self-reported checklist and a complete first-party C# source reference. It runs locally in a console project, never in the browser. License selection is still pending before an open-source release.

Snippet editor: Tab inserts four spaces; select multiple lines to indent them together. Shift+Tab removes one indentation level. Press Escape then Tab to move to Save local draft. Indentation must remain in a saved draft after refresh.

Quest Radio: select two local audio files, press Play, switch lessons, and confirm playback continues. Check next/previous, playlist selection, volume, repeat, Clear, and collapsing the heading. Refresh should empty the playlist without affecting learning progress. Invalid or oversized selections should show feedback.

Expanded course: verify 14 lesson cards, including two small function lessons, class fields, and while/enum/switch introductions. Existing eight completions should show 8 / 14 after upgrade. Continue should select the first unfinished new lesson. The full-course feedback page stays locked until all 14 quizzes and code blanks are passed. Optional labs and RPG milestones do not affect that gate. Use a disposable browser profile for this test; complete all lessons, then type a disposable feedback note, refresh, verify persistence, copy the report, and remove the test note. No real beginner session has been conducted yet.

## Modules and optional labs

Check the four module cards in Overview. Each must show its own completion count and resume the first unfinished lesson in that module. At the end of a module, read the recap and the connection to the RPG. In an optional prediction lab, save an unfinished answer and experiment note, refresh, and check they return. Solving a lab must not complete the required quiz or blank.

## Run the reference locally

Open the RPG project guide and its complete source reference. Follow the setup instructions in a fresh project. Attack nine times: three rooms clear, victory prints once, and health ends at 52. Try invalid choices, full-health and empty-inventory potions, Quit, and end-of-input. Follow the documented 10-health experiment to check defeat, then restore the value.

Maintainers with the .NET 10 SDK can run `npm run test:rpg` for compiled behavior tests; `npm test` covers the website and does not need .NET. `npm run build` copies only approved static assets, including the C# source file. No compiled game binaries are published.

## Module debugging

At the last lesson of each module, open Find and repair a bug. Compare the expected and actual output, write a repair note, and refresh. The note must return. Switch modules: notes should remain separate. Returning to a challenge closes its hint and repair so you can try again. Verify the lesson count remains unchanged. Maintainers can run `npm run test:csharp` with .NET 10 to check all lesson, lab, bug, and repair outputs.

## Two-tab persistence

Open two learning workspaces at the same address. Complete different lessons in each; refreshing must keep both completions. Write lab or debugging notes in different lessons/modules and confirm they both remain. Add a different snippet in each tab, then delete one: the other must remain. Check different RPG milestones and uncheck one; both tabs should show the latest checklist. Editing the same answer or note in both tabs uses the most recent save.
