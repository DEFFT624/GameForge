# Gameforge

A beginner-friendly game development learning website. This first local MVP has a responsive dashboard, eight C# lessons with quizzes and code blanks, browser-local progress, two starter snippets, local text draft creation/deletion, snippet search, and a six-step RPG project checklist.

See [TESTING.md](TESTING.md) for the short user test checklist. On Windows, you can also open START-GAMEFORGE.cmd.

## Run locally

Requires Node.js 22 or newer. No packages need installing.

```sh
npm start
```

Open http://127.0.0.1:4173. Run `npm test` for the security and content checks. Stop the server with Ctrl+C. The server binds only to this computer. Serve through this server to get the security headers; opening index.html directly is unsupported.

Build static assets with `node build.mjs`. A future private Sites deployment can use those assets; publishing is currently blocked and no hosted build is live. GitHub remains the source of truth.

## Honest boundaries

This is a browser-local learning prototype, not a public community service. Quizzes check selected answers; code blanks compare trimmed text. Neither compiles or runs learner code. There are no accounts, uploads, analytics, network integrations, public submissions, or remote execution. Drafts and progress use this browser's local storage and can be lost when browser data is cleared. Do not put secrets in drafts. Local progress is editable by the learner and is not a credential.

See [SPEC.md](SPEC.md), [SECURITY.md](SECURITY.md), and [CONTRIBUTING.md](CONTRIBUTING.md). Repository: https://github.com/DEFFT624/GameForge. The proposed license is MIT; owner and license approval are required before an open-source release. No release license has been granted yet.
