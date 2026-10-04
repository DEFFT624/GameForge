# Try GameForge

The home page is at http://127.0.0.1:4173/. The learning workspace is at http://127.0.0.1:4173/learn.html. Choose Start from the beginning to read the new First steps guide. Open a lesson glossary, trace its walkthrough, predict a tiny change, and reveal the reasoning. Try a wrong quiz answer: feedback should explain that specific choice. Going Home and back must retain saved progress. Leaving the workspace stops its music.

For local testing on Windows, open START-GAMEFORGE.cmd, leave that window running, and visit http://127.0.0.1:4173. Node.js 22 or newer must be installed. No package installation is required. Close the server with Ctrl+C when finished.

## Five-minute test

1. Choose Continue learning. Read lesson 1 and try an incorrect quiz answer, then the correct one. Feedback should explain the mistake and the lesson should show In progress. The completed-lesson count should increase only after both the quiz and code blank are passed.
2. Fill in the code blank. Try the Hint button. Check the answer, then refresh the page. Quiz and code-blank progress, your selected answer, and the exact text in the blank should remain saved. Try refreshing with an unfinished answer, then switching lessons and returning. The last viewed lesson should reopen.
3. Use Next and Previous. Open the inventory, character and game-state lessons from the learning path. All 22 lessons should be available.
4. Check a milestone under Dungeon of Three Rooms. Refresh and confirm it stays checked. Uncheck it if it was only a test.
5. Search starter snippets for health. Save a harmless local snippet draft, refresh, open the draft section, and delete it. Drafts never publish or run.
6. Try a narrow browser window. Text and controls should fit without horizontal scrolling.

Tell us which step failed, what you expected, what appeared instead, and which browser/device you used. Also tell us if a lesson feels too fast, too technical, or too easy.

Progress belongs to the browser and site address you use. A hosted version and localhost have separate progress. Clearing browser data removes saved progress and drafts. The Reset lesson progress button resets quizzes, code blanks, and saved answers but leaves drafts, optional lab notes, and project milestones intact.

## Current boundaries

There are no public accounts, file uploads, public submissions, or code execution. Code blanks use exact, trimmed text answers and are not a compiler. The capstone has a self-reported checklist and a complete first-party C# source reference. It runs locally in a console project, never in the browser. License selection is still pending before an open-source release.

Snippet editor: Tab inserts four spaces; select multiple lines to indent them together. Shift+Tab removes one indentation level. Press Escape then Tab to move to Save local draft. Indentation must remain in a saved draft after refresh.

Quest Radio: select two local audio files, press Play, switch lessons, and confirm playback continues. Check next/previous, playlist selection, volume, repeat, Clear, and collapsing the heading. Refresh should empty the playlist without affecting learning progress. Invalid or oversized selections should show feedback.

Expanded course: verify 22 lesson cards, including two small function lessons, class fields, and while/enum/switch introductions. Existing eight completions should show 8 / 22 after upgrade. Continue should select the first unfinished new lesson. The full-course feedback page stays locked until all 22 quizzes and code blanks are passed. Optional labs and RPG milestones do not affect that gate. Use a disposable browser profile for this test; complete all lessons, then type a disposable feedback note, refresh, verify persistence, copy the report, and remove the test note. No real beginner session has been conducted yet.

## Modules and optional labs

Check the five module cards in Overview. Each must show its own completion count and resume the first unfinished lesson in that module. At the end of a module, read the recap and the connection to the RPG. In an optional prediction lab, save an unfinished answer and experiment note, refresh, and check they return. Solving a lab must not complete the required quiz or blank.

## Run the reference locally

Open the RPG project guide and its complete source reference. Follow the setup instructions in a fresh project. Attack nine times: three rooms clear, victory prints once, and health ends at 52. Try invalid choices, full-health and empty-inventory potions, Quit, and end-of-input. Follow the documented 10-health experiment to check defeat, then restore the value.

Maintainers with the .NET 10 SDK can run `npm run test:rpg` for compiled behavior tests; `npm test` covers the website and does not need .NET. `npm run build` copies only approved static assets, including the C# source file. No compiled game binaries are published.

## Module debugging

At the last lesson of each module, open Find and repair a bug. Compare the expected and actual output, write a repair note, and refresh. The note must return. Switch modules: notes should remain separate. Returning to a challenge closes its hint and repair so you can try again. Verify the lesson count remains unchanged. Maintainers can run `npm run test:csharp` with .NET 10 to check all lesson, lab, bug, and repair outputs.

## Two-tab persistence

Open two learning workspaces at the same address. Complete different lessons in each; refreshing must keep both completions. Write lab or debugging notes in different lessons/modules and confirm they both remain. Add a different snippet in each tab, then delete one: the other must remain. Check different RPG milestones and uncheck one; both tabs should show the latest checklist. Editing the same answer or note in both tabs uses the most recent save.

Keep the same lesson open in both tabs. Reset required progress in one tab: the other should immediately clear its quiz choice and code blank while retaining optional notes and open labs. Change a different lesson in another tab: the active input and its feedback should remain intact.

In the complete-reference section of the project guide, open Trace one fight before playing. Run its abc, 2, 1, 1, 2, 1 sequence in a fresh game and compare every value. Healing should print 100 before the counterattack, then the next menu should show 92. Defeating the enemy should advance to room 2 without losing health; one potion should remain. Type 3 to quit.

## Execution traces

In Understand it, open Trace the values one step at a time. Compare the values after each row with the code; New output shows only the line printed during that step. Try the for and while loops, function return, inventory removal, and game-state loop. At narrow widths the table can scroll within its own box; focus the table region to scroll with the keyboard. Changing lessons closes the trace and replaces its caption and rows.

Upgrade check: if you previously completed all 14 earlier lessons, the dashboard now shows 14 / 22 and Continue opens Give your hero a text greeting. Existing answers remain saved. Finish all remaining lessons to reopen the full-course review.

In First steps, search the glossary for concatenation, bool, &&, or return. Open a matching lesson and check that progress did not change. A broad search shows at most 12 entries and asks you to narrow it. Clearing the search should remove results and show the instructions.

## Troubleshooting a console project

Open When a program goes wrong under First steps. Distinguish a compiler error, a runtime exception, and a logic mistake. Expand a deliberate example, predict the problem, then open its repair. None of this runs in the website or changes lesson completion. In a fresh local console project, verify the before/after behavior with `dotnet run`; do not replace your working RPG. Maintainers can run `npm run test:errors` to check all documented diagnostics and repaired outputs.

## Returning to a specific lesson

Use Link to this lesson near the lesson heading, or copy the browser address while reading a lesson. A URL such as `http://127.0.0.1:4173/learn.html?lesson=strings#lessons` should open the greeting lesson, even if a different lesson was last saved. It must not change completed exercises. Next and Previous should update that lesson ID, and refresh should keep the intended lesson. A recipient keeps their own progress.

Localhost links work only on the computer running the site. To send a working link to a friend on another computer, first publish the reviewed static site and use its hosted address. Publication and license selection are still pending. Try browser Back after opening a glossary result or project prerequisite: it should return to the previous activity. Reset on a lesson should leave its URL pointing to lesson 1; reset from another activity should keep that activity open.

## New game data toolbox (lessons 19–22)

If all 18 earlier lessons were complete, expect 18 / 22 and Continue to open Build a readable status message. Earlier answers must still be visible. Complete both required exercises in the four new lessons to unlock the full-course review again.

Open each new lesson, enter an unfinished quiz/code-blank/lab answer, refresh, and check that its own draft restores. Check that the new ASCII scenery changes while the book at the top stays the lessons icon. At the dictionary lesson, open the optional module debugging challenge; its note should persist separately. Optional work never grants required completion.

The homepage's lessons 19–22 link should open interpolation directly even if a different lesson was last used. Next and Previous should cross the old/new module boundary correctly. The final lesson should link to the RPG project.

