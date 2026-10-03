# Gameforge project specification — v0.2

## Purpose

Help beginners learn game programming by reading short C# lessons, tracing game mechanics, completing small challenges, and learning from community source examples. Working name: Gameforge. Engine-neutral C# comes first; a Unity or Godot C# path can follow after the user chooses an engine.

## Implemented local MVP

- Dashboard: progress count, resume-first-unfinished lesson, and an eight-lesson path.
- Course: variables/types, conditionals, loops, methods, lists, classes, input validation, and game states. Each has a game example, explanation, multiple-choice trace challenge, retry hint, completion state, and a text-only code-blank exercise.
- Capstone: six self-reported milestones for a three-room console RPG, with browser-local persistence.
- Community preview: two first-party text examples, a title/source draft form, local persistence, and draft deletion. Drafts do not enter the public gallery.
- Accessible native controls, responsive layout, visible focus, labelled quiz choices, live feedback, reduced-motion CSS, and no external assets.

## Security invariants

No executable, archive, binary, project-folder, or arbitrary file uploads. No code execution or remote runner. Snippets are inert plain text rendered using textContent. No HTML or Markdown rendering for submissions. Client validation is only a usability check; it is not a future server security boundary. Reading a snippet safely does not mean it is safe to execute elsewhere.

## Next milestone: real community service

Design and review the backend before enabling submissions. Proposed records: User, Course, Lesson, Completion, Snippet, Review, Report. A snippet has author ID, title, C# source, license, timestamps and status: pending, approved, rejected, or removed. Ownership and moderator roles must be enforced on the server. All new or edited submissions require review before publication; editing an approved snippet creates a new pending revision.

Accept only a strict JSON title/source schema, with a 32 KB request-body limit, title max 80 characters, source max 8,000 characters, readable text validation, authenticated author, CSRF protection appropriate to the auth mechanism, and rate limiting. Reject multipart, binary and unknown fields. No user-selected filenames, attachments, URLs imported by the server, or user-provided HTML. Enforce these rules at ingress and application layers. Keep moderation logs and report/remove tools. Do not represent scanning or review as a guarantee of harmless code.

## Release gates

1. Repository is DEFFT624/GameForge (public). License selection remains pending. The test hosting project is owner-private; sensitive machine/account access requires explicit approval.
2. Independent review of auth, ownership, moderation, request limits, abuse prevention, data retention/deletion and secret handling.
3. End-to-end tests for learner progress, retries, malicious snippet markup, review transitions, cross-user authorization and rate limits.
4. Keyboard/mobile/browser QA and review of every lesson by a C# reader. Choose hosting and test equivalent CSP and security headers before publication.

## Acceptance checks for this starter

Correct answers mark a lesson complete; incorrect answers give a hint and do not complete it. Reload preserves progress when storage works. Resume selects the first unfinished lesson. Draft text displays literally, can be deleted, and never publishes. POST/PUT/PATCH/DELETE requests are rejected. The local server serves only six explicit asset routes (including the index alias); hosted deployment serves static assets only.

## Excluded for now

Unity project downloads, native installers, automatic project imports, chat, multiplayer, payments, executable grading, public accounts, and full game-engine integration.

## Source-text review policy

Reject explicit Unicode bidirectional control characters U+061C, U+200E-U+200F, U+202A-U+202E and U+2066-U+2069 in snippet titles and source, while allowing ordinary Unicode letters, including right-to-left languages. This reduces misleading visual reordering; it does not certify source as safe to execute. Enforce the same policy on the future server and moderation revisions. Length limits count UTF-16 code units, matching JavaScript string.length and browser maxlength.
