# Gameforge project specification — v0.1

## Purpose

Help beginners learn game programming by reading short C# lessons, tracing game mechanics, completing small challenges, and learning from community source examples. Working name: Gameforge. Engine-neutral C# comes first; a Unity or Godot C# path can follow after the user chooses an engine.

## Implemented local MVP

- Dashboard: progress count, resume-first-unfinished lesson, and a four-lesson path.
- Course: variables/types, conditionals, loops, methods. Each has a game example, explanation, multiple-choice trace challenge, retry hint, and completion state.
- Community preview: two first-party text examples, a title/source draft form, local persistence, and draft deletion. Drafts do not enter the public gallery.
- Accessible native controls, responsive layout, visible focus, labelled quiz choices, live feedback, reduced-motion CSS, and no external assets.

## Security invariants

No executable, archive, binary, project-folder, or arbitrary file uploads. No code execution or remote runner. Snippets are inert plain text rendered using textContent. No HTML or Markdown rendering for submissions. Client validation is only a usability check; it is not a future server security boundary. Reading a snippet safely does not mean it is safe to execute elsewhere.

## Next milestone: real community service

Design and review the backend before enabling submissions. Proposed records: User, Course, Lesson, Completion, Snippet, Review, Report. A snippet has author ID, title, C# source, license, timestamps and status: pending, approved, rejected, or removed. Ownership and moderator roles must be enforced on the server. All new or edited submissions require review before publication; editing an approved snippet creates a new pending revision.

Accept only a strict JSON title/source schema, with a 32 KB request-body limit, title max 80 characters, source max 8,000 characters, readable text validation, authenticated author, CSRF protection appropriate to the auth mechanism, and rate limiting. Reject multipart, binary and unknown fields. No user-selected filenames, attachments, URLs imported by the server, or user-provided HTML. Enforce these rules at ingress and application layers. Keep moderation logs and report/remove tools. Do not represent scanning or review as a guarantee of harmless code.

## Release gates

1. Owner selects repository, public/private visibility, and license; sensitive machine/account access requires explicit approval.
2. Independent review of auth, ownership, moderation, request limits, abuse prevention, data retention/deletion and secret handling.
3. End-to-end tests for learner progress, retries, malicious snippet markup, review transitions, cross-user authorization and rate limits.
4. Keyboard/mobile/browser QA and review of every lesson by a C# reader. Choose hosting and test equivalent CSP and security headers before publication.

## Acceptance checks for this starter

Correct answers mark a lesson complete; incorrect answers give a hint and do not complete it. Reload preserves progress when storage works. Resume selects the first unfinished lesson. Draft text displays literally, can be deleted, and never publishes. POST/PUT/PATCH/DELETE requests are rejected. Only five explicit public asset routes are served.

## Excluded for now

Unity project downloads, native installers, automatic project imports, chat, multiplayer, payments, executable grading, public accounts, and full game-engine integration.
