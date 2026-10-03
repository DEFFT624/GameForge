# Security model

The starter is a loopback-only, read-only static server. Its route allowlist excludes the repository, environment files, and source server code. Non-read methods receive 405. There is no upload or execution endpoint. Snippets and stored drafts are rendered as text. CSP blocks external connections, inline scripts, plugins, framing and form submissions. No dependency installation or credentials are required.

This narrows the attack surface; it is not a full security audit. Local storage can be inspected or changed by the browser user. Do not use it for authentication, secrets, trusted grades or public moderation. The static header configuration must be recreated and verified if deployed elsewhere. A future backend must enforce the controls in SPEC.md independently of the browser.

For contributions: no binaries, archives, bundled project downloads, credential files, obfuscated payloads or automatic installation scripts. Check examples for filesystem, process, network and destructive behavior. Do not execute untrusted examples to review them. Have a human inspect workflow changes before merging; do not expose repository secrets to untrusted pull requests.

Before public release, configure GitHub private vulnerability reporting and a reporting contact. Until that exists, report suspected flaws directly to the project owner without posting credentials or exploit details publicly.
