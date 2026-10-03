# Gameforge

A beginner-friendly game development learning website. This first local MVP has a responsive dashboard, four C# lessons with knowledge challenges, browser-local progress, two starter snippets, and local text draft creation/deletion.

## Run locally

Requires Node.js 22 or newer. No packages need installing.

```sh
npm start
```

Open http://127.0.0.1:4173. Run `npm test` for the security and content checks. Stop the server with Ctrl+C. The server binds only to this computer. Serve through this server to get the security headers; opening index.html directly is unsupported.

## Honest boundaries

This is a local prototype, not a deployed community platform. Quizzes check selected answers; they do not compile or grade C#. There are no accounts, uploads, analytics, network integrations, public submissions, or remote execution. Drafts and progress use this browser's local storage and can be lost when browser data is cleared. Do not put secrets in drafts. Local progress is editable by the learner and is not a credential.

See [SPEC.md](SPEC.md), [SECURITY.md](SECURITY.md), and [CONTRIBUTING.md](CONTRIBUTING.md). Repository: https://github.com/DEFFT624/GameForge. The proposed license is MIT; owner and license approval are required before an open-source release. No release license has been granted yet.
